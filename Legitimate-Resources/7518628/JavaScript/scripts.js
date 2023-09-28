var $$ = {
    trim: function (s) {
        return s.replace(/^\s+|\s+$/g, '');
    },
    random: function (min, max, exact) {
        if (arguments.length === 0) {
            return Math.random();
        } else if (arguments.length === 1) {
            max = min;
            min = 0;
        }
        var range = min + (Math.random() * (max - min));
        return exact === void(0) ? Math.round(range) : range.toFixed(exact);
    },
    popup: function (u, n, w, h) {
        var left = screen.width / 2 - w / 2;
        var top = screen.height / 2 - h / 2;
        return window.open(u, n, 'toolbar=no,status=no,menubar=no,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left)
    },
    setUrlParam: function (url, param, value, encode) {
        var reg = new RegExp("([?&]" + param + "=).*?(&|$)");
        if (encode) {
            value = encodeURIComponent(value);
        }
        if (reg.test(url)) {
            url = url.replace(reg, "$1" + value + "$2");
        } else {
            url = [url, param + "=" + value].join(~url.indexOf('?') ? '&' : '?');
        }
        return url;
    },
    setUrlParams: function (url, params, encode) {
        for (var param in params) {
            if (params.hasOwnProperty(param)) {
                url = $$.setUrlParam(url, param, params[param], encode);
            }
        }
        return url;
    },
    initPage: function () {
        $("img.lazy").lazyload({
            threshold: 200
        });
        $('.loadmore').each(function () {
            (function (_this) {
                //pbegin psize purl pcallid
                _this.click(function () {
                    if (_this.text() == 'loading...') {
                        return;
                    }
                    var purl = _this.attr("href");
                    var pcallid = _this.attr("data-callbackid");
                    var ppage = Number(_this.attr("data-page"));
                    var maxpage = Number(_this.attr("data-maxpage"));
                    _this.text('loading...');
                    var url = $$.setUrlParams(purl, {ajax: 1});
                    $.ajax({
                        url: url,
                        type: 'get',
                        success: function (data) {
                            _this.text('Show More');
                            if (ppage >= maxpage) {
                                _this.hide();
                            }
                            if (data) {
                                try {
                                    ga('send', 'pageview', $$.setUrlParams(purl, {page: ppage}));
                                } catch (e) {
                                }
                                ppage++;
                                _this.attr("data-page", ppage);
                                _this.attr('href', $$.setUrlParams(purl, {page: ppage}));
                                $('#' + pcallid).append(data);
                                $("img.lazy").lazyload({
                                    threshold: 200
                                });
                            } else {
                                _this.hide();
                            }
                        }
                    });
                    return false;
                });
            })($(this));
        });
    },
    initDisqus: function () {
        var disqus_shortname = 'apkpure';
        (function () {
            var dsq = document.createElement('script');
            dsq.type = 'text/javascript';
            dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    },
    gaEvent: function (str) {
        var arr = str.split('|');
        if (arr.length == 3) {
            try {
                ga('send', 'event', arr[0], arr[1], arr[2]);
            } catch (e) {
            }
            //$$.analytics.send('event', str);
        }
    },
    hostnames: {
        'localhost': 1,
        '167.114.64.102': 1,
        'www.apkpure.com': 1,
        'apkpure.com': 1,
        'm.apkpure.com': 1
    },
    gaReferrer: function (tag) {
        //if (document.referrer && typeof(document.referrer) === "string") {
        //    var a = document.createElement('a');
        //    a.href = document.referrer;
        //    if (a && a.host) {
        //        var host = a.host.split(':')[0];
        //        if (host) {
        //            if (!$$.hostnames[host.toLowerCase()]) {
        //                $$.gaEvent('referrer|' + document.referrer + '|' + tag);
        //            }
        //        }
        //    }
        //}
    },
    
    initScrollList: function () {
        $('.box-scroll').each(function () {
            var $obj = $(this);
            var scroll = new IScroll($obj.get(0), {eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false});
            scroll.on('scrollEnd', function () {
                $obj.trigger('scroll');
            });
        });
    },
    initIndex: function () {
        $$.initScrollList();
    },
    initDetails: function () {
        var si_screen = setInterval(function () {
            var imgs = $('#screen img');
            var downCount = 0;
            imgs.each(function () {
                //console.log($(this).attr('src'));
                if ($(this).width() > 0) {
                    downCount++;
                }
                if (downCount == imgs.length) {
                    clearInterval(si_screen);
                    var myScroll = new IScroll('#screen', {eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false});
                    $('#screenloading').hide();
                }
            });
        }, 150);
        $('#show-more').click(function () {
            $('#describe').css('height', 'auto');
            $(this).parent().remove();
            return false;
        });
        $('#show-more-version').click(function () {
            $('.more-version').show();
            $(this).parent().remove();
            return false;
        });
        $('.versions dt').click(function () {
            var elem = $(this);
            elem.children('span').toggleClass('open');
            elem.next('dd').toggle();
        });
        $$.initScrollList();
    },
    initSearch: function (total) {
        $('.advanced').click(function () {
            $('.advanced i').toggleClass('hover');
            $('.regions').toggle();
        });
        $('.regions .r').click(function () {
            $('#hidregion').val($(this).attr('r'));
            $('.formsearch').submit();
        });
        var loadmore = $('.loadmore');
        $('#search-page').submit(function () {
            if (loadmore.text() == 'loading...') {
                return;
            }
            loadmore.text('loading...');
            $.ajax({
                url: $(this).attr('action'),
                data: $(this).serialize(),
                type: 'post',
                success: function (data) {
                    $('#search-res').append(data);
                    $(".lazy").lazyload();
                    loadmore.text('Show More');
                    var begin = parseInt($('#search-page-begin').val()) + 15;
                    $('#search-page-begin').val(begin);
                    if (begin >= total) {
                        loadmore.remove();
                    }
                }
            });
            return false;
        });

        loadmore.click(function () {
            $('#search-page').submit();
        });
    },
    initDown: function () {
        $('#select-region').click(function () {
            $('#select-region i').toggleClass('hover');
            $('.flags').toggle();
        });
        var isStartDown = false;
        $('#region-form').submit(function () {
            if (isStartDown) {
                return false;
            }
            $('#region-package').val($$.trim($('#region-package').val()));
            isStartDown = true;
            hideError();
            $('#region-submit').addClass('ing');
            $('#down-info').text('Downloading, please wait...');
            $.ajax({
                url: $(this).attr('action'),
                data: $(this).serialize(),
                type: 'post',
                success: function (data) {
                    if (data && data.error == 0) {
                        location.href = data.down_url;
                        //$('#region-submit').removeClass('ing');
                        ga('send', 'event', 'region', data.package_name, $('#region-hid').val());
                        $$.gaEvent('download|' + data.package_name + '|region_APK');
                    } else {
                        switch (data.error) {
                            case 1:
                                showError('Package name or region error , try again');
                                $('#region-submit').removeClass('ing');
                                break;
                            case 2:
                                location.href = 'search?q=' + $('#region-package').val() + '&region=' + $('#region-hid').val();
                                break;
                            case 3:
                                showError('Invalid app package name, <a target="_blank" href="search?q=' + $('#region-package').val() + '&region=' + $('#region-hid').val() + '">Check all "' + $('#region-package').val() + '" search results here.</a>');
                                $('#region-submit').removeClass('ing');
                                break;
                        }
                        $('#down-info').text('');
                    }
                    isStartDown = false;
                }
            });
            return false;
        });
        function hideError() {
            //$.removeCookie('download_error', {path: '/'});
            //$.removeCookie('download_error_lr', {path: '/'});
            $('.banner-search-bg').removeClass('error');
            $('#region-package').removeClass('error');
            $('.region-down-err').hide();
        }

        function showError(e) {
            $('.banner-search-bg').addClass('error');
            $('#region-package').addClass('error');
            $('.region-down-err span').html(e);
            $('.region-down-err').show();
        }

        $('.region-down-err .close').click(function () {
            hideError();
            return false;
        });
        $$.initDisqus();
    },
    setFlag: function (obj) {
        var $obj = $(obj);
        $('#region-hid').val($obj.attr('title'));
        $('#select-region').attr('title', $obj.attr('title')).html($obj.find('span').clone()).append($obj.attr('title') + '<i></i>');
        $('#flags').hide();
        return false;
    }
};



function mloadmore(type,value)
{
	var p=$('.loadmore').attr ('title');
    $.ajax({
    type: 'POST',
    url: 'http://localhost/ma/wp-admin/admin-ajax.php',
    data: {
		action: 'mloadmore',
		type: type,
		value: value,
		p: p,
		sort:$("#sortselect option:selected").val(),
	},
	success:function(data, textStatus, XMLHttpRequest){
		p++;
		if (p<=30){
			$('#pagedata').append(data);
			$('.loadmore').prop('title', p);
			if (data==''){
				$('.loadmore').hide();
			}
		} else {
			$('.loadmore').hide();
		}
	},
	error: function(MLHttpRequest, textStatus, errorThrown){
		alert(errorThrown);
	}
	});
}

(function ($) {
    $.fn.clearInput = function (options) {
        var settings = $.extend({
            'focus': true
        }, options);
        return this.each(function () {
            var $this = $(this);
            var $clear = $(settings.clear);
            $clear.click(function () {
                $this.val('').change();
                $clear.hide();
                if (settings.focus) {
                    $this.focus();
                }
            });
            function trigger() {
                if ($this.val().length > 0) {
                    $clear.show();
                } else {
                    $clear.hide();
                }
            }

            $this.on('keyup keydown change focus', function () {
                trigger();
            });
            trigger();
        });
    };
})(Zepto);

$(function () {
    var $nav = $('.nav');
    var $backtop = $('#backtop');
    var nonav = $nav.is(':hidden');
    var headHeight = $('.header').height() - 45;
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            if ($backtop.is(':hidden')) {
                $backtop.show();
            }
        } else {
            if ($backtop.is(':visible')) {
                $backtop.hide();
            }
        }
        if (nonav) {
            if ($(this).scrollTop() > headHeight) {
                if ($nav.is(':hidden')) {
                    $nav.show();
                    $('#nav').addClass('anim');
                }
            } else {
                if ($nav.is(':visible')) {
                    $nav.hide();
                    $('#nav').removeClass('anim');
                }
            }
        }
    });
    $('#backtop').click(function () {
        $('html, body').scrollTop(0);
    });
    $('#btnShowSo').click(function () {
        $('#nav').toggle();
        $('#so').toggle();

    });
    $('#btnHideSo').click(function () {
        $('#nav').toggle();
        $('#so').toggle();
    });
    var isUC = navigator.userAgent.indexOf('UCBrowser') > -1;
    $('.formsearch').submit(function () {
        if (!isUC) {
            //$(this).find('.search-button').addClass('search-load');
        }
    });
    $('.ga').click(function () {
        $$.gaEvent($(this).attr('ga'));
        return true;
    });
});
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));