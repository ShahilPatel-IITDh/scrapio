(function() {

  //if ( 'undefined' === Cookies ) { throw( "Cookies.js is required" ); }
  if ('undefined' === typeof jQuery) {
    throw ("jQuery is required");
  }
  var $ = jQuery;

  var Peatix = {};

  Peatix.Util = {
    isMobileAgent: function () {
      // based on https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
      var ua = navigator.userAgent;
      if (
           ua.match(/Android/i)
        || ua.match(/iPhone/i)
        || ua.match(/iPad/i)
        || ua.match(/iPod/i)
        || ua.match(/Windows Phone/i)
      ) {
        return true;
      }
      return false;
    },
    legacy_ie: function(version) {
      if (!version) version = 7;
      var legacy = false;
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) legacy = (new Number(RegExp.$1)) <= version;
      return legacy;
    },

    canSupportCS: function() {
      return 'undefined' !== typeof WebSocket && 'undefined' !== typeof localStorage;
    },

    canSupportHTML5Scanner: function () {
      return 'undefined' !== typeof window.navigator.getUserMedia
        &&   'undefined' !== typeof window.AudioContext;
    },

    distanceBetween: function ( lat1, lng1, lat2, lng2 ) {
      var R = 6371;
      var dLat = Math.PI * (lat2-lat1) / 180;
      var dLng = Math.PI * (lng2-lng1) / 180;
      var lat1 = Math.PI * lat1 / 180;
      var lat2 = Math.PI * lat2 / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    },

    hasGeoLocationSupport: function () {
      return 'undefined' !== typeof navigator && 'undefined' !== typeof navigator.geolocation;
    },

    deviceDistanceFor: function ( lat, lng, cb, error_cb, locationManager ) {
      var retryCount = 1;
      var done = function ( e, lat, lng, cb ) {
          var d = Peatix.Util.distanceBetween( lat, lng, e.coords.latitude, e.coords.longitude );
          cb(d,e);
      };
      var fail = function ( error, error_cb ) {
        // NOTE #66481006
        // Besides, often you can't get your location because navigator.geolocation.getCurrentPosition get "POSITION_UNAVAILABLE:2" error.
        //     => Retry navigator.geolocation.getCurrentPosition if it get the error above.
        if(2 == error.code && retryCount < 3) {
          retryCount++;
          getPosition( lat, lng, cb, error_cb );
        }
        else {
          error_cb(error);
        }
      };
      var getPosition = function ( lat, lng, cb, error_cb ) {
        if( 'undefined' !== typeof locationManager &&
            'undefined' !== typeof locationManager.getKnownLocation ) {
          var jsonString = locationManager.getKnownLocation();
          if(null != jsonString) {
            var location = JSON.parse(jsonString);
            done(location, lat, lng, cb);
            return;
          }
        }
        navigator.geolocation.getCurrentPosition(function (e) {
          done(e, lat, lng, cb);
        }
        , function (error) {
          fail(error, error_cb);
        }
        ,{
          // NOTE #66481006
          // You can't get your location by GPS, not Wifi, on azuki-android and each browsers, on Android.
          //     => navigator.geolocation.getCurrentPosition use "enableHighAccuracy : true".
          enableHighAccuracy : true,
          // NOTE #66481006
          // ColorSync retry before navigator.geolocation.getCurrentPosition has finished.
          //     => Set a timeout value which should be small than the timeout value in checkColorsyncReady.
          timeout : 1000 * 25,
        });
      };
      getPosition( lat, lng, cb, error_cb );
    },

    formatNumber: function( num, opt ) {
      if (num === 0)
          return "0";
      var defaultOpt = {
        "decimalPrecision": 2,
        "decimalSeparator": ".",
        "thousandSeparator": ","
      };
      if (typeof opt === "undefined")
        opt = defaultOpt;
      else {
        if (typeof opt["decimalPrecision"] === "undefined")
          opt["decimalPrecision"] = defaultOpt.decimalPrecision;
        if (typeof opt["decimalSeparator"] === "undefined")
          opt["decimalSeparator"] = defaultOpt.decimalSeparator;
        if (typeof opt["thousandSeparator"] === "undefined")
          opt["thousandSeparator"] = defaultOpt.thousandSeparator;
      }

      var negate = false;
      if (num < 0) {
        negate = true;
        num = Math.abs(num);
      }
      var numStr = num.toFixed(opt.decimalPrecision);
      if (numStr === "0")
          return "0";
      var numParts = numStr.split("."); // this is always "." according to ECMA
      var integerPart = numParts[0];
      if (integerPart.length % 3 === 1)
        integerPart = "00" + integerPart;
      else if (integerPart.length % 3 === 2)
        integerPart = "0" + integerPart;
      var thousands = integerPart.split(/(.{3})/).filter(Boolean);
      integerPart = thousands.join(opt.thousandSeparator);
      integerPart = integerPart.replace(/^0+/, "");
      numParts[0] = integerPart;
      if (negate)
        numParts[0] = '-' + numParts[0];
      var localNumStr = numParts.join(opt.decimalSeparator);
      return localNumStr;
    },
    isDateInputAvailable: function() {
      var input = document.createElement('input');
      input.setAttribute('type','date');
      var val = 'not-valid-date-value';
      input.setAttribute('value', val);
      return (input.value !== val);
    }
  };

  var waitings = {};
  Peatix.UI = {
    open_modal_window: function(event, popID, popURL, opts) {
      var DefaultOptions = {
        closeButton: true,      // TODO: more better name e.g. exclusive mode...?
      };
      opts = $.extend(DefaultOptions, opts);
      if (!popID) popID = $(this).attr('rel'); //Get Popup Name
      if (!popURL) popURL = $(this).attr('href'); //Get Popup href to define size

      var query = popURL.split('?');
      var dim;
      if (2 < query.length) dim = query[2].split('&');
      else dim = query[1].split('&');
      var popWidth = dim[0].split('=')[1]; //Gets the first query string value

      //Fade in the Popup and add close button
      var closeButtonHtml = '<a href="javascript:void(0)" rel="' + popID + '" class="close">Close</a>';
      if ($(this).is('.popreload')) closeButtonHtml = '<a href="javascript:void(0)" rel="' + popID + '"  class="close popreload">Close</a>';

      if (legacy_ie(8)) {
        $('a.close').remove();
        $('.popup_block').hide();
        if (legacy_ie(6)) $('#wrap').css({
          'width': Number(popWidth)
        });
        var popDiv = $('#' + popID).detach();
        popDiv.css({
          'position': 'absolute',
          'top': $(window).scrollTop() + 'px',
          'left': (document.body.scrollWidth / 2 - popWidth / 2) + 'px',
          'width': Number(popWidth),
          'background-color': '#FFF',
          'border': '5px solid #666'
        });
        $('#wrap').prepend(popDiv);
        popDiv.stop().fadeIn(function() {
          if ( opts.closeButton ) {
            $(this).prepend(closeButtonHtml);
          }
        });
        if ( !opts.closeButton ) {
          window.Config.__popupIsExclusive = true;
        };
      } else {
        $('#' + popID).css({
          'width': Number(popWidth)
        })
        .stop()
        .fadeIn(function() {
          if ( opts.closeButton ) {
            $(this).prepend(closeButtonHtml);
          }
        });

        $('#fade').stop().fadeIn(function() {
          $('body').css({
            'width': document.body.scrollWidth
          });
          $(this).css({
            'overflow-y': 'scroll'
          });
        });
        if ( !opts.closeButton ) {
          window.__popupIsExclusive = true;
        };
      }

      // prevent dismiss if opts.dismiss = false;
      if (opts.hasOwnProperty('dismiss') && !opts.dismiss) {
        $('a.close').remove();
        $('#fade').on('click', function (e) {
          e.stopPropagation();
        });
      }

      var iframe = document.getElementById('ifr-' + popID);
      if (iframe) {
        if (legacy_ie()) resize_iframe(popID, iframe.contentWindow.document.body.scrollHeight);
        else {
          $(iframe).css({
            width: (popWidth - 40)
          });
          iframe.contentWindow.postMessage('popup_opened::' + popID, iframe.getAttribute('src'));
        }
      }
      $('body').trigger('popupOpened', [popID]);
      return false;
    },

    close_modal_window: function(e) {
      var element;
      if (e) element = e.target;
      else element = this;

      if ( window.__popupIsExclusive === true ) {
        if ( $(element).is('#fade') ) {
          return true;
        }
      }
      window.__popupIsExclusive = false;

      var ids = new Array();
      $('.popup_block:visible').each(function(k, v) {
        ids.push($(this).attr('id'));
      });
      // Reset these styles to normal
      $('body').css({
        'width': '100%'
      });
      $('#fade').css({
        'overflow-y': 'hidden'
      }).stop().fadeOut(function() {
        $('.popup_block').hide();
        $('body').css({
          'width': '100%'
        });
      });
      if ($(element).is('.popreload')) window.location.reload();
      if (!legacy_ie()) {
        var popID = $(element).attr('rel');
        var iframe = document.getElementById('ifr-' + popID);
        if (iframe) iframe.contentWindow.postMessage('popup_closed::' + popID, iframe.getAttribute('src'));
        $.each(ids, function(i, v) {
          $('body').trigger('popupClosed', [v]);
        });
      }
      return false;
    },
    /**
     * @param dismiss boolean, prevent dismiss when click outside
     * **/
    confirm: function(opts) {
      var DefaultOptions = {
      };
      opts = $.extend(DefaultOptions, opts);

      function fadeout () {
        $('#fade').css({
          'overflow-y': 'hidden'
        }).stop().fadeOut(function() {
          $('.popup_block').hide();
          $('body').css({
            'overflow': 'auto',
            'width': '100%'
          });
        });
      }
      var $popup = $(opts.popupSelector);

      $popup.find(opts.confirmSelector)
        .off('click')
        .on('click', function () {
          opts.confirm();
          fadeout();
        });

      $popup.find(opts.cancelSelector)
        .off('click')
        .on('click', function () {
          opts.cancel();
          fadeout();
        });

      $('#fade').stop().fadeIn(function() {
        $('body').css({
          'width': document.body.scrollWidth
        });
        $(this).css({
          'overflow-y': 'scroll'
        });
      });
      $popup.stop().fadeIn();

      // prevent dismiss if opts.dismiss = false;
      if (opts.hasOwnProperty('dismiss') && !opts.dismiss) {
        $('a.close').remove();
        $('#fade').on('click', function (e) {
          e.stopPropagation();
        });
      }
    },

    add_global_message: function(message, type, ttl) {
      var opts = {
        type: type,
        container: $('#global-message').empty(),
        ttl: ttl
      };
      if ( type === 'success' && 'undefined' === ttl ) {
        opts.ttl = 2000;
      }
      Peatix.Notification.notify( message, opts );
    },

    close_message: function(anchor) {
      $(anchor).parent('.msg-error,.msg-info,.msg-success').stop().fadeOut('fast');
    },

    clear_global_messages: function() {
      $('#global-message div').remove();
    },

    clear_errors: function() {
      $('.error.txt-field,select.error').removeClass('error');
    },

    resize_iframe: function(id, height) {
      if (!id) id = document.body.id;
      if (!id) return;
      try {
        height = parseInt(height);
        var my_frame = document.getElementById('ifr-' + id);
        var current_height = parseInt($(my_frame).css('height').replace(/\D/, ''));
        if (current_height < height) {
          if (/Firefox/.test(navigator.userAgent)) $(my_frame).css({
            height: height + 10
          });
          else $(my_frame).animate({
            height: height + 10
          });
        } else if ((current_height > height) && (current_height > 360)) {
          if (/Firefox/.test(navigator.userAgent)) {
            my_frame.style.height = '0px';
            my_frame.style.height = (Math.max(height + 10, 360)) + 'px';
          } else $(my_frame).animate({
            height: Math.max(height + 10, 360)
          });
        }
      } catch (ex) {}
    },

    add_chromeless_message: function(type, id, message, parent_id) {
      return Peatix.Notification.notify(message, {
        type: type,
        id: id,
        container: parent_id ? $( '#' + parent_id ) : $('.window-message')
      });
    },

    clear_chromeless_messages: function(duration) {
      $('.window-message div').stop().fadeOut(duration);
    },

    update_view: function(json_data) {
      if (json_data) {
        for (var idx in json_data) {
          if (!json_data.hasOwnProperty(idx)) continue;

          var element = $('#field-event-' + idx);
          var parent = element.parent();
          if (element) {
            parent.hide();
            var html = json_data[idx].html;
            if ($(html).is('.add-link')) {
              element.parents('.editable').addClass('empty-field');
            } else {
              element.parents('.editable').removeClass('empty-field');
            }
            element.parents('.editable').removeClass('no-highlight');
            element.replaceWith(html);
            parent.fadeIn();
          }
          $('#event-' + idx).find('.event-required').remove();
        }
      }
    },

    pop_load_iframe: function(pop_id, url, callback) {
      $('#ifr-' + pop_id).load(function() {
        if (typeof callback == 'function') callback();
        open_modal_window(undefined, pop_id, '#?w=520');
      });
      $('#ifr-' + pop_id)[0].contentWindow.location.href = url;
      $('#ifr-' + pop_id).attr('src', url);
    },

    email_alert: function(frame_id) {
      $('input[type=email]').blur(function() {
        var email_address = $(this).val();
        if (!email_address) return;
        var email_parts = email_address.split('@');
        var email_domain = email_parts[email_parts.length - 1];
        email_domain = $.trim(email_domain);
        var warning_message;
        var warning_accepted = '';
        if (legacy_ie(8)) warning_accepted = '<a href="#" id="email-alert-accepted">内容を確認しました</a>';
        if ($.inArray(email_domain, ['yahoo.co.jp', 'ybb.ne.jp']) >= 0) {
          warning_message =
            '<div class="msg-info email-alert"><p class="msg-title icon-warning">お申込み前に必ずご確認ください！</p><p><strong><strong>Yahoo!メール</strong></strong>をご利用のお客様はPeatixからのメールが<strong><strong>迷惑メールフォルダ</strong></strong>に受信される可能性がございます。</p>';
          warning_message += warning_accepted;
          warning_message += '</div>';
        } else if ($.inArray(email_domain, ['docomo.ne.jp', 'softbank.ne.jp', 'i.softbank.jp', 'disney.ne.jp', 'disneymobile.ne.jp', 'pdx.ne.jp', 'di.pdx.ne.jp', 'dj.pdx.ne.jp', 'dk.pdx.ne.jp', 'wm.pdx.ne.jp', 'willcom.com', 'emnet.ne.jp', 'd.vodafone.ne.jp', 'h.vodafone.ne.jp', 't.vodafone.ne.jp', 'c.vodafone.ne.jp', 'r.vodafone.ne.jp', 'k.vodafone.ne.jp', 'n.vodafone.ne.jp', 's.vodafone.ne.jp', 'q.vodafone.ne.jp']) >= 0) {
          warning_message =
            '<div class="email-alert"><p class="msg-title icon-warning">お申込み前に必ずご確認ください！</p><p><strong><strong>迷惑メール対策</strong></strong>などのために<strong><strong>ドメイン指定受信</strong></strong>を利用されているお客様は、お持ちの携帯電話にて「<strong>＠peatix.com</strong>」を受信できるように設定してください。</p>';
          if (email_domain == 'docomo.ne.jp' || email_domain == 'disneymobile.ne.jp') warning_message += '<p><a href="https://www.nttdocomo.co.jp/info/spam_mail/imode/domain/" target="_blank">設定方法</a></p>'
          else if (email_domain == 'softbank.ne.jp' || email_domain == 'disney.ne.jp' || email_domain.match(/vodafone\.ne\.jp/)) warning_message += '<p><a href="https://www.softbank.jp/mobile/support/iphone/antispam/email_i/white/" target="_blank">設定方法</a></p><p><strong>iPhone</strong>をご利用のお客様は「<strong class="important">@i.softbank.jp</strong>」のメールアドレスを<strong>上のEメール欄</strong>に入力してください。</p>'
          warning_message += '<div class="msg-warning"><p>受信設定を行わずにお申込みいただいたくと、お申込み詳細メールをお届けすることができません。</p></div>';
          warning_message += warning_accepted;
          warning_message += '</div>';
        } else if ($.inArray(email_domain, ['ezweb.ne.jp']) >= 0) {
          warning_message = 
           '<div class="email-alert"><p class="msg-title icon-warning">「 @ezweb.ne.jp」のメールアドレス宛にPeatixから送ったメールは本文が表示されない場合があります。</p><p>Gmailなど他のメールアドレスを登録してください。</p></div>';
        } else if ($.inArray(email_domain, ['au.com']) >= 0) {
          warning_message = 
           '<div class="email-alert"><p class="msg-title icon-warning">「 @au.com」のメールアドレス宛にPeatixから送ったメールは本文が表示されない場合があります。</p><p>Gmailなど他のメールアドレスを登録してください。</p></div>';
        } else if ($('.email-alert').length > 0) {
          $('.email-alert').stop().fadeOut(function() {
            $(this).remove();
          });
          return;
        }

        if ($('.email-alert').length == 0) {
          $(this).parent()
            .append(warning_message);
          $('.email-alert').stop().fadeIn(function() {
            if (frame_id && $('body').is('.window')) $.fn.post_resize_message(frame_id);
            $('#email-alert-accepted').click(function(e) {
              $('div.email-alert').remove();
            });
          });
        } else {
          $('.email-alert').val(warning_message);
        }
      });
    },

    //http://javascriptly.com/examples/jquery-grab-bag/autogrow-textarea.html
    autogrow: function(selector) {
      $(selector).each(function() {
        var minHeight = $(this).height();
        var width = $(this).width();
        var shadow = $('<div></div>').css({
          position: 'absolute',
          top: -10000,
          left: -10000,
          width: width,
          fontSize: $(this).css('fontSize'),
          fontFamily: $(this).css('fontFamily'),
          lineHeight: $(this).css('lineHeight'),
          resize: 'none'
        }).appendTo(document.body);

        var that = $(this);
        var update = function(e) {
          if (!width) {
            width = that.width();
            shadow.css({
              'width': width
            });
          }
          if (minHeight == 0 && that.height() > 0) minHeight = that.height();
          var val = that.val()
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/&/g, '&amp;')
            .replace(/\n/g, '<br/>');
          shadow.html(val);
          var currentHeight = that.height();
          if (e && minHeight) that.css('height', Math.max(shadow.height() + 20, minHeight));
          if (that.height() > currentHeight) that.trigger('expanded');
        };

        $(this).change(update)
          .keyup(update)
        //                 .keydown( update )
        ;
        update.apply(this);
      });
    },

    wait_for: function(pop_id, f) {
      waitings[pop_id] = f;
    },

    exec_for: function(pop_id) {
      var f = waitings[pop_id];
      if (f) {
        f();
        delete waitings.pop_id;
      }
    }
  };

  if ('undefined' === typeof $.fn.post_resize_message) {
    $.fn.post_resize_message = function() {};
  }

  /** Peatix.Trans
   */
  Peatix.Trans = {
    __lexicon: {}
    , lang: 'ja_JP'
    , addLexicon: function(lexicon) {
      for (var lang in lexicon) {
        var current = this.__lexicon[lang] || (this.__lexicon[lang] = {});
        for (var term in lexicon[lang]) {
          current[term] = lexicon[lang][term];
        }
      }
    }
    , trans: function() {
      var params = Array.prototype.slice.call(arguments);
      var lang = this.lang || "en_US";
      if (lang.match(/^ja/))
        lang = "ja_JP";
      else if (lang === "en_GB" || lang === "en_MY" || lang === "en_HK" || lang === "en_SG")
        lang = "en_GB";
      else if (lang.match(/^en/))
        lang = "en_US";
      else if (lang.match(/^zh/))
        lang = "zh_TW";
      else if (lang === "zh_CN" || lang === "zh_SG")
        lang = "zh_CN";
      var phrase = params[0];
      if (this.__lexicon[lang] && this.__lexicon[lang][phrase]) {
        phrase = this.__lexicon[lang][phrase];
      }

      var out = phrase.replace(/%(\d+)(?:\$(\w))?/g, function(match, $1) {
        var place = $1;
        var n = parseInt(place);
        return 'undefined' !== typeof params[n] ? params[n] : '';
      });

      // Apply quant/numf special functions
      var that = this;

      out = out.replace(/%quant\(([^\)]*)\)/g, function(match, $1) {
        var args = $1.split(',');
        return that.quant.apply(that, args);
      });
      out = out.replace(/%numf\(([^\)]*)\)/g, function(match, $1) {
        var args = $1.split(',');
        return that.numf.apply(that, args);
      });
      return out;
    }
    , quant: function (num, singular, plural, zerostate) {
      num = parseInt(num);
      if ( !singular ) return num;
      if ( zerostate && num === 0 ) return zerostate;
      if ( !plural ) plural = singular + 's';
      return this.numf(num) + ' ' + ( num === 1 ? singular : plural );
    }
    , numf: function (num) {
      var s = '' + num;
      while ( s.match(/^([-+]?\d+)(\d{3})/) ) {
        s = s.replace(/^([-+]?\d+)(\d{3})/,"$1,$2");
      }
      return s;
    }
  };

  // Short hand
  Peatix.loc = function() {
    return Peatix.Trans.trans.apply(Peatix.Trans, arguments);
  };

  const escapeHTML = (str) => {
    // It does not able to escape alert()
    // e.g. </textarea><img src=x onerror=alert(document.domain)>
    //var div = document.createElement('div');
    //div.innerHTML = str;
    //return div.textContent || div.innerText || "";

    var p = document.createElement("p");
    p.appendChild(document.createTextNode(str));
    return p.innerHTML || "";
  }

  Peatix.Notification = {
    notify: function (msg, opts) {
      opts = $.extend({type: 'error'}, opts);
      var msg_html = escapeHTML( msg )
        .replace(/\r?\n/g,'<br />');

      // <a href is escaped in escapeHTML()
      // Instead, use <link></link> then replace with <a href></a>
      if ( msg_html.match(/\&lt\;link/) ) {
        msg_html = msg_html.replace(/\&lt\;link/, '<a href' );
        msg_html = msg_html.replace(/link\&gt\;/, 'a>' );
        msg_html = msg_html.replace(/\&gt\;/, '>' );
        msg_html = msg_html.replace(/\&lt\;/, '<' );
      }

      // nasty... should use some template instead
      var $container = opts.container || $('#global-message');
      $container.show();
      var $div = $('<div />')
        .addClass( 'js-notification msg msg-' + opts.type )
        .append(
          $('<p />')
            .html(msg_html)
        )
        .append(
          $('<a />')
            .attr( 'title', 'Close' )
            .addClass('remove-x')
            .click( function () {
              $div
                .stop()
                .fadeOut('fast', function () {
                  $(this).remove(); } );
            })
        )
        .hide()
      ;

      if ( opts.id ) {
        $div.attr('id', opts.id);
        var $existing = $('#' + opts.id);
        if ( $existing.length ) {
          $existing.replaceWith($div);
        }
        else {
          $div.appendTo($container);
        }
      }
      else {
        $div.appendTo($container);
      }

      $div
        .stop()
        .fadeIn('slow', function () {
          if ( opts.ttl ) {
            $(this)
              .delay( opts.ttl )
              .fadeOut('fast', function(){
                $(this).remove(); } );
          }
        })
      ;
    }
    , clearAll: function () {
      $('.js-notification')
        .stop()
        .fadeOut('fast', function () {
          $(this).remove(); } );
    }
  };

  Peatix.Pref = {
    setValue: function ( key, value ) {
      if ( 'undefined' !== typeof localStorage )
        localStorage[key] = value;
      else
        document.cookie = key + '=' + value + ';max-age=' + (60 * 60 * 24 * 365);
    }
    , getValue: function ( key ) {
      if ( 'undefined' !== typeof localStorage )
        return localStorage[key];
      else {
        var re = new RegExp('(?:(?:^|.*;\\s*)' + key + '\\s*\\=\\s*([^;]*).*$)|^.*$');
        return document.cookie.replace( re, '$1');
      }
    }
    , deleteKey: function ( key ) {
      if ( 'undefined' !== typeof localStorage )
        delete localStorage[key];
      else
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  };


  // jQuery functions
  // TODO: merge this into Peatix.UI
  $.fn.modelessDialog = function (opts) {
    var Defaults = {
      container: '.js-modeless-dialog-container',
      content: '.js-modeless-dialog-content',
      fade: 200
    };
    opts = $.extend({}, Defaults, opts);
    var $container = $(this).parents(opts.container);
    if ( ! $container.length ) return false;
    var $content = $container.find( opts.content );
    if ( ! $content.length ) return false;

    var closeTasks = function () {
      $content.data('modeless-dialog-status', 'close');
      $(window).off('mousedown.modelessdialog');
      $content.stop().fadeOut(opts.fade);
    };

    // close  when list-pop_trigger clicked
    $(window).on('mousedown.modelessdialog', function (e) {
      var $clicked = $(e.target);
      if ($clicked.parents(opts.container).length) {
        // close when items on nav drawer clicked
        if (($clicked.parents(opts.container)).hasClass('nav-row_item')) {
          closeTasks()
        }
          return true;
      }
      // close pop-up when outside of list-pop_trigger clicked
      closeTasks();
      return true;
    });

    if ($content.data('modeless-dialog-status') === 'open') {
      closeTasks();
      return false;
    } else {
      // close other pop-up if it's open
      if ($('.list-pop_content:visible').length !== 0) {
        $('.list-pop_content:visible').not( $content )
        .data('modeless-dialog-status', 'close')
        .off('mousedown.modelessdialog')
        .hide();
      };
      // open pop-up
      $content.data('modeless-dialog-status', 'open');
      $content.stop().fadeIn(opts.fade);
    }
    return false;
  };

  // Export it!
  if ('undefined' !== typeof module) {
    module.exports = Peatix;
  }

  if ('undefined' !== typeof window) {
    window.Peatix = window.P = Peatix;
    if (! window.NoLegacyPeatixJS ) {
      var instl;
      if ( window.FindLegacyPeatixJS ) {
        instl = function (cls, func) {
          window[func] = function () {
            console.log( 'Legacy function ' + func + ' has called!' );
            console.trace();
            Peatix[cls][func].apply( window, arguments );
          };
        };
      }
      else {
        instl = function (cls, func) {
          window[func] = Peatix[cls][func];
        };
      }
      instl('Util', 'legacy_ie' );
      instl('Util', 'canSupportCS' );
      instl('UI', 'open_modal_window' );
      instl('UI', 'close_modal_window' );
      instl('UI', 'add_global_message' );
      instl('UI', 'close_message' );
      instl('UI', 'clear_global_messages' );
      instl('UI', 'clear_errors' );
      instl('UI', 'resize_iframe' );
      instl('UI', 'add_chromeless_message' );
      instl('UI', 'clear_chromeless_messages' );
      instl('UI', 'update_view' );
      instl('UI', 'pop_load_iframe' );
      instl('UI', 'email_alert');
      instl('UI', 'autogrow');
      instl('UI', 'wait_for');
      instl('UI', 'exec_for');
    }
  }

  //FOOTER
  $('.lang-selected').click(function() {
    $(this)
      .toggleClass('selected-highlight')
      .children('a')
        .toggleClass('icon icon-checkmark icon-after');
    $(this)
      .parent()
        .toggleClass('lang-active');
    $(this)
      .siblings('.lang-option')
        .toggle()
    ;
  });

})();

(function($) {
  $.fn.hideInSmallScreen = function(active) {
    return this.each(function() {
      if ( !active )
        return;
      var selected = this;
      $(selected).hide();
      $(active).on('blur',function(){
        $(selected).show();
        $(this).off('blur');
      });
    });
  };
})(jQuery);
