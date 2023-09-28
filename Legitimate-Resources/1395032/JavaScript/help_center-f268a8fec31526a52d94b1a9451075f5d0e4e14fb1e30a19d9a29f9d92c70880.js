// This is a subsest of the functionality from https://github.com/rails/jquery-ujs
// Only the link_to support is included
(function($, undefined) {

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data,
        crossDomain = element.data('cross-domain') || null,
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType),
        options;

      if (rails.fire(element, 'ajax:before')) {

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = element.attr('href');
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType, crossDomain: crossDomain,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          }
        };
        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = link.attr('href'),
        method = link.data('method'),
        target = link.attr('target'),
        csrf_token = $('meta[name=csrf-token]').attr('content'),
        csrf_param = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadata_input = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrf_param !== undefined && csrf_token !== undefined) {
        metadata_input += '<input name="' + csrf_param + '" value="' + csrf_token + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadata_input).appendTo('body');
      form.submit();
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e)
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        // this should be element.removeData('ujs:enable-with')
        // but, there is currently a bug in jquery which makes hyphenated data attributes not get removed
        element.data('ujs:enable-with', false); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    },

    // Make sure that every Ajax request sends the CSRF token
    // stolen from rails 3
    CSRFProtection: function(xhr) {
      var token = this.CSRFToken();
      if(token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Zendesk-custom
    CSRFHeaders: function(headers){
      var token = this.CSRFToken()
      if(token) headers['X-CSRF-Token'] = token;
      return headers;
    },

    // Zendesk-custom
    CSRFToken: function(){
      return $('meta[name="csrf-token"]').attr('content');
    }
  };

  $(document).delegate(rails.linkDisableSelector, 'ajax:complete', function() {
      rails.enableElement($(this));
  });

  $(document).delegate(rails.linkClickSelector, 'click.rails', function(e) {
    var link = $(this), method = link.data('method'), data = link.data('params');
    if (!rails.allowAction(link)) return rails.stopEverything(e);

    if (link.is(rails.linkDisableSelector)) rails.disableElement(link);

    if (link.data('remote') !== undefined) {
      if ( (e.metaKey || e.ctrlKey) && (!method || method === 'GET') && !data ) { return true; }

      if (rails.handleRemote(link) === false) { rails.enableElement(link); }
      return false;

    } else if (link.data('method')) {
      rails.handleMethod(link);
      return false;
    }
  });

  $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});
})( jQuery );


// Let's add authenticity token to all non-crossDomain Prototype Ajax requests (crossDomain has to be set by hand)
// (not necessary in chat -> Prototype/Ajax are not defined)
// extracted from https://github.com/grosser/remote_forgery_protection
if(typeof(Ajax) != "undefined") {
  Ajax.Base.prototype.initialize = Ajax.Base.prototype.initialize.wrap(function() {
    var args = $A(arguments), proceed = args.shift();
    args[0] = args[0] || {};
    var options = args[0];
    if (!options.crossDomain) {
      options.requestHeaders = jQuery.rails.CSRFHeaders(options.requestHeaders || {})
    }
    proceed.apply(null, args);
  });
}
;
(function($, exports) {
  if (!exports.Zendesk) { exports.Zendesk = {}; }
  var Zendesk = exports.Zendesk;
  if (!!Zendesk.NS) { return; }

  var slice = Array.prototype.slice;

  function applyFunctionIfApplicable(namespace, additionalArgs) {
    if (additionalArgs.length > 0) {
      // pull off the function from the end:
      var fn = additionalArgs.pop();

      if ($.isFunction(fn)) {
        fn.apply(namespace, additionalArgs);
      } else if (!!fn) {
        throw new Error(fn + ' is not a function');
      }
    }
  }

  Zendesk.NS = function(namespaceString) {
    var nesting   = namespaceString.split("."),
        currentNS = Zendesk,
        i;

    for(i = 0; i < nesting.length; i++) {
      var namespace = nesting[i];
      if(typeof(currentNS[namespace]) === 'undefined') {
        currentNS[namespace] = {};
      }
      currentNS = currentNS[namespace];
    }

    applyFunctionIfApplicable(currentNS, slice.call(arguments, 1, arguments.length));

    return currentNS;
  };

  Zendesk.NS.extend = function(namespaceString, addIn) {
    $.extend(Zendesk.NS(namespaceString), addIn);
  };

}(this.jQuery, this));



(function($) {

  $(function() {
    // Dismiss notifications

    $(".notification-dismiss").click(function() {
      $(this).closest(".notification").hide();
    });

    // Language Selector Dropdown

    function dismiss() {
      $(".dropdown").removeClass("dropdown_open");
    }

    function toggle() {
      $(this)
        .closest(".dropdown")
        .toggleClass("dropdown_open");

      return false;
    }

    $(document)
      .on("click", dismiss)
      .on("click", ".dropdown_toggle", toggle);

  });

})(jQuery);
