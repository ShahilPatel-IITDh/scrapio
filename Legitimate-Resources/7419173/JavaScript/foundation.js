/*
HelloSign Modifications:

We downloaded Foundation and then concatenated:

 - foundation.js
 - foundation.reveal.js
 - foundation.equalizer.js

together into this file.

*/


/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2014, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function ($, window, document, undefined) {
    'use strict';

    var header_helpers = function (class_array) {
        var i = class_array.length;
        var head = $('head');

        while (i--) {
            if(head.has('.' + class_array[i]).length === 0) {
                head.append('<meta class="' + class_array[i] + '" />');
            }
        }
    };

    header_helpers([
        'foundation-mq-small',
        'foundation-mq-medium',
        'foundation-mq-large',
        'foundation-mq-xlarge',
        'foundation-mq-xxlarge',
        'foundation-data-attribute-namespace']);

    // Enable FastClick if present

    $(function() {
        if (typeof FastClick !== 'undefined') {
            // Don't attach to body if undefined
            if (typeof document.body !== 'undefined') {
                FastClick.attach(document.body);
            }
        }
    });

    // private Fast Selector wrapper,
    // returns jQuery object. Only use where
    // getElementById is not available.
    var S = function (selector, context) {
        if (typeof selector === 'string') {
            if (context) {
                var cont;
                if (context.jquery) {
                    cont = context[0];
                    if (!cont) return context;
                } else {
                    cont = context;
                }
                return $(cont.querySelectorAll(selector));
            }

            return $(document.querySelectorAll(selector));
        }

        return $(selector, context);
    };

    // Namespace functions.

    var attr_name = function (init) {
        var arr = [];
        if (!init) arr.push('data');
        if (this.namespace.length > 0) arr.push(this.namespace);
        arr.push(this.name);

        return arr.join('-');
    };

    var add_namespace = function (str) {
        var parts = str.split('-'),
            i = parts.length,
            arr = [];

        while (i--) {
            if (i !== 0) {
                arr.push(parts[i]);
            } else {
                if (this.namespace.length > 0) {
                    arr.push(this.namespace, parts[i]);
                } else {
                    arr.push(parts[i]);
                }
            }
        }

        return arr.reverse().join('-');
    };

    // Event binding and data-options updating.

    var bindings = function (method, options) {
        var self = this,
            should_bind_events = !S(this).data(this.attr_name(true));


        if (S(this.scope).is('[' + this.attr_name() +']')) {
            S(this.scope).data(this.attr_name(true) + '-init', $.extend({}, this.settings, (options || method), this.data_options(S(this.scope))));

            if (should_bind_events) {
                this.events(this.scope);
            }

        } else {
            S('[' + this.attr_name() +']', this.scope).each(function () {
                var should_bind_events = !S(this).data(self.attr_name(true) + '-init');
                S(this).data(self.attr_name(true) + '-init', $.extend({}, self.settings, (options || method), self.data_options(S(this))));

                if (should_bind_events) {
                    self.events(this);
                }
            });
        }
        // # Patch to fix #5043 to move this *after* the if/else clause in order for Backbone and similar frameworks to have improved control over event binding and data-options updating.
        if (typeof method === 'string') {
            return this[method].call(this, options);
        }

    };

    var single_image_loaded = function (image, callback) {
        function loaded () {
            callback(image[0]);
        }

        function bindLoad () {
            this.one('load', loaded);

            if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                var src = this.attr( 'src' ),
                    param = src.match( /\?/ ) ? '&' : '?';

                param += 'random=' + (new Date()).getTime();
                this.attr('src', src + param);
            }
        }

        if (!image.attr('src')) {
            loaded();
            return;
        }

        if (image[0].complete || image[0].readyState === 4) {
            loaded();
        } else {
            bindLoad.call(image);
        }
    };

    /*
     https://github.com/paulirish/matchMedia.js
     */

    window.matchMedia = window.matchMedia || (function( doc ) {

        "use strict";

        var bool,
            docElem = doc.documentElement,
            refNode = docElem.firstElementChild || docElem.firstChild,
        // fakeBody required for <FF4 when executed in <head>
            fakeBody = doc.createElement( "body" ),
            div = doc.createElement( "div" );

        div.id = "mq-test-1";
        div.style.cssText = "position:absolute;top:-100em";
        fakeBody.style.background = "none";
        fakeBody.appendChild(div);

        return function (q) {

            div.innerHTML = "&shy;<style media=\"" + q + "\"> #mq-test-1 { width: 42px; }</style>";

            docElem.insertBefore( fakeBody, refNode );
            bool = div.offsetWidth === 42;
            docElem.removeChild( fakeBody );

            return {
                matches: bool,
                media: q
            };

        };

    }( document ));

    /*
     * jquery.requestAnimationFrame
     * https://github.com/gnarf37/jquery-requestAnimationFrame
     * Requires jQuery 1.8+
     *
     * Copyright (c) 2012 Corey Frang
     * Licensed under the MIT license.
     */

    (function($) {

        // requestAnimationFrame polyfill adapted from Erik MÃ¶ller
        // fixes from Paul Irish and Tino Zijdel
        // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
        // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

        var animating,
            lastTime = 0,
            vendors = ['webkit', 'moz'],
            requestAnimationFrame = window.requestAnimationFrame,
            cancelAnimationFrame = window.cancelAnimationFrame,
            jqueryFxAvailable = 'undefined' !== typeof jQuery.fx;

        for (; lastTime < vendors.length && !requestAnimationFrame; lastTime++) {
            requestAnimationFrame = window[ vendors[lastTime] + "RequestAnimationFrame" ];
            cancelAnimationFrame = cancelAnimationFrame ||
                window[ vendors[lastTime] + "CancelAnimationFrame" ] ||
                window[ vendors[lastTime] + "CancelRequestAnimationFrame" ];
        }

        function raf() {
            if (animating) {
                requestAnimationFrame(raf);

                if (jqueryFxAvailable) {
                    jQuery.fx.tick();
                }
            }
        }

        if (requestAnimationFrame) {
            // use rAF
            window.requestAnimationFrame = requestAnimationFrame;
            window.cancelAnimationFrame = cancelAnimationFrame;

            if (jqueryFxAvailable) {
                jQuery.fx.timer = function (timer) {
                    if (timer() && jQuery.timers.push(timer) && !animating) {
                        animating = true;
                        raf();
                    }
                };

                jQuery.fx.stop = function () {
                    animating = false;
                };
            }
        } else {
            // polyfill
            window.requestAnimationFrame = function (callback) {
                var currTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                    id = window.setTimeout(function () {
                        callback(currTime + timeToCall);
                    }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };

        }

    }( jQuery ));


    function removeQuotes (string) {
        if (typeof string === 'string' || string instanceof String) {
            string = string.replace(/^['\\/"]+|(;\s?})+|['\\/"]+$/g, '');
        }

        return string;
    }

    window.Foundation = {
        name : 'Foundation',

        version : '5.3.0',

        media_queries : {
            small : S('.foundation-mq-small').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            medium : S('.foundation-mq-medium').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            large : S('.foundation-mq-large').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xlarge: S('.foundation-mq-xlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ''),
            xxlarge: S('.foundation-mq-xxlarge').css('font-family').replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, '')
        },

        stylesheet : $('<style></style>').appendTo('head')[0].sheet,

        global: {
            namespace: undefined
        },

        init : function (scope, libraries, method, options, response) {
            var args = [scope, method, options, response],
                responses = [];

            // check RTL
            this.rtl = /rtl/i.test(S('html').attr('dir'));

            // set foundation global scope
            this.scope = scope || this.scope;

            this.set_namespace();

            if (libraries && typeof libraries === 'string' && !/reflow/i.test(libraries)) {
                if (this.libs.hasOwnProperty(libraries)) {
                    responses.push(this.init_lib(libraries, args));
                }
            } else {
                for (var lib in this.libs) {
                    responses.push(this.init_lib(lib, libraries));
                }
            }

            return scope;
        },

        init_lib : function (lib, args) {
            if (this.libs.hasOwnProperty(lib)) {
                this.patch(this.libs[lib]);

                if (args && args.hasOwnProperty(lib)) {
                    if (typeof this.libs[lib].settings !== 'undefined') {
                        $.extend(true, this.libs[lib].settings, args[lib]);
                    }
                    else if (typeof this.libs[lib].defaults !== 'undefined') {
                        $.extend(true, this.libs[lib].defaults, args[lib]);
                    }
                    return this.libs[lib].init.apply(this.libs[lib], [this.scope, args[lib]]);
                }

                args = args instanceof Array ? args : new Array(args);    // PATCH: added this line
                return this.libs[lib].init.apply(this.libs[lib], args);
            }

            return function () {};
        },

        patch : function (lib) {
            lib.scope = this.scope;
            lib.namespace = this.global.namespace;
            lib.rtl = this.rtl;
            lib['data_options'] = this.utils.data_options;
            lib['attr_name'] = attr_name;
            lib['add_namespace'] = add_namespace;
            lib['bindings'] = bindings;
            lib['S'] = this.utils.S;
        },

        inherit : function (scope, methods) {
            var methods_arr = methods.split(' '),
                i = methods_arr.length;

            while (i--) {
                if (this.utils.hasOwnProperty(methods_arr[i])) {
                    scope[methods_arr[i]] = this.utils[methods_arr[i]];
                }
            }
        },

        set_namespace: function () {

            // Description:
            //    Don't bother reading the namespace out of the meta tag
            //    if the namespace has been set globally in javascript
            //
            // Example:
            //    Foundation.global.namespace = 'my-namespace';
            // or make it an empty string:
            //    Foundation.global.namespace = '';
            //
            //

            // If the namespace has not been set (is undefined), try to read it out of the meta element.
            // Otherwise use the globally defined namespace, even if it's empty ('')
            var namespace = ( this.global.namespace === undefined ) ? $('.foundation-data-attribute-namespace').css('font-family') : this.global.namespace;

            // Finally, if the namsepace is either undefined or false, set it to an empty string.
            // Otherwise use the namespace value.
            this.global.namespace = ( namespace === undefined || /false/i.test(namespace) ) ? '' : namespace;
        },

        libs : {},

        // methods that can be inherited in libraries
        utils : {

            // Description:
            //    Fast Selector wrapper returns jQuery object. Only use where getElementById
            //    is not available.
            //
            // Arguments:
            //    Selector (String): CSS selector describing the element(s) to be
            //    returned as a jQuery object.
            //
            //    Scope (String): CSS selector describing the area to be searched. Default
            //    is document.
            //
            // Returns:
            //    Element (jQuery Object): jQuery object containing elements matching the
            //    selector within the scope.
            S : S,

            // Description:
            //    Executes a function a max of once every n milliseconds
            //
            // Arguments:
            //    Func (Function): Function to be throttled.
            //
            //    Delay (Integer): Function execution threshold in milliseconds.
            //
            // Returns:
            //    Lazy_function (Function): Function with throttling applied.
            throttle : function (func, delay) {
                var timer = null;

                return function () {
                    var context = this, args = arguments;

                    if (timer == null) {
                        timer = setTimeout(function () {
                            func.apply(context, args);
                            timer = null;
                        }, delay);
                    }
                };
            },

            // Description:
            //    Executes a function when it stops being invoked for n seconds
            //    Modified version of _.debounce() http://underscorejs.org
            //
            // Arguments:
            //    Func (Function): Function to be debounced.
            //
            //    Delay (Integer): Function execution threshold in milliseconds.
            //
            //    Immediate (Bool): Whether the function should be called at the beginning
            //    of the delay instead of the end. Default is false.
            //
            // Returns:
            //    Lazy_function (Function): Function with debouncing applied.
            debounce : function (func, delay, immediate) {
                var timeout, result;
                return function () {
                    var context = this, args = arguments;
                    var later = function () {
                        timeout = null;
                        if (!immediate) result = func.apply(context, args);
                    };
                    var callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, delay);
                    if (callNow) result = func.apply(context, args);
                    return result;
                };
            },

            // Description:
            //    Parses data-options attribute
            //
            // Arguments:
            //    El (jQuery Object): Element to be parsed.
            //
            // Returns:
            //    Options (Javascript Object): Contents of the element's data-options
            //    attribute.
            data_options : function (el, data_attr_name) {
                data_attr_name = data_attr_name || 'options';
                var opts = {}, ii, p, opts_arr,
                    data_options = function (el) {
                        var namespace = Foundation.global.namespace;

                        if (namespace.length > 0) {
                            return el.data(namespace + '-' + data_attr_name);
                        }

                        return el.data(data_attr_name);
                    };

                var cached_options = data_options(el);

                if (typeof cached_options === 'object') {
                    return cached_options;
                }

                opts_arr = (cached_options || ':').split(';');
                ii = opts_arr.length;

                function isNumber (o) {
                    return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
                }

                function trim (str) {
                    if (typeof str === 'string') return $.trim(str);
                    return str;
                }

                while (ii--) {
                    p = opts_arr[ii].split(':');
                    p = [p[0], p.slice(1).join(':')];

                    if (/true/i.test(p[1])) p[1] = true;
                    if (/false/i.test(p[1])) p[1] = false;
                    if (isNumber(p[1])) {
                        if (p[1].indexOf('.') === -1) {
                            p[1] = parseInt(p[1], 10);
                        } else {
                            p[1] = parseFloat(p[1]);
                        }
                    }

                    if (p.length === 2 && p[0].length > 0) {
                        opts[trim(p[0])] = trim(p[1]);
                    }
                }

                return opts;
            },

            // Description:
            //    Adds JS-recognizable media queries
            //
            // Arguments:
            //    Media (String): Key string for the media query to be stored as in
            //    Foundation.media_queries
            //
            //    Class (String): Class name for the generated <meta> tag
            register_media : function (media, media_class) {
                if(Foundation.media_queries[media] === undefined) {
                    $('head').append('<meta class="' + media_class + '"/>');
                    Foundation.media_queries[media] = removeQuotes($('.' + media_class).css('font-family'));
                }
            },

            // Description:
            //    Add custom CSS within a JS-defined media query
            //
            // Arguments:
            //    Rule (String): CSS rule to be appended to the document.
            //
            //    Media (String): Optional media query string for the CSS rule to be
            //    nested under.
            add_custom_rule : function (rule, media) {
                if (media === undefined && Foundation.stylesheet) {
                    Foundation.stylesheet.insertRule(rule, Foundation.stylesheet.cssRules.length);
                } else {
                    var query = Foundation.media_queries[media];

                    if (query !== undefined) {
                        Foundation.stylesheet.insertRule('@media ' +
                            Foundation.media_queries[media] + '{ ' + rule + ' }');
                    }
                }
            },

            // Description:
            //    Performs a callback function when an image is fully loaded
            //
            // Arguments:
            //    Image (jQuery Object): Image(s) to check if loaded.
            //
            //    Callback (Function): Function to execute when image is fully loaded.
            image_loaded : function (images, callback) {
                var self = this,
                    unloaded = images.length;

                if (unloaded === 0) {
                    callback(images);
                }

                images.each(function () {
                    single_image_loaded(self.S(this), function () {
                        unloaded -= 1;
                        if (unloaded === 0) {
                            callback(images);
                        }
                    });
                });
            },

            // Description:
            //    Returns a random, alphanumeric string
            //
            // Arguments:
            //    Length (Integer): Length of string to be generated. Defaults to random
            //    integer.
            //
            // Returns:
            //    Rand (String): Pseudo-random, alphanumeric string.
            random_str : function () {
                if (!this.fidx) this.fidx = 0;
                this.prefix = this.prefix || [(this.name || 'F'), (+new Date).toString(36)].join('-');

                return this.prefix + (this.fidx++).toString(36);
            }
        }
    };

    $.fn.foundation = function () {
        var args = Array.prototype.slice.call(arguments, 0);

        return this.each(function () {
            Foundation.init.apply(Foundation, [this].concat(args));
            return this;
        });
    };

}(jQuery, window, window.document));






;(function ($, window, document, undefined) {
    'use strict';

    Foundation.libs.reveal = {
        name : 'reveal',

        version : '5.3.0',

        locked : false,

        settings : {
            animation: 'fadeAndPop',
            animation_speed: 250,
            close_on_background_click: true,
            close_on_esc: true,
            dismiss_modal_class: 'close-reveal-modal',
            bg_class: 'reveal-modal-bg',
            root_element: 'body',
            open: function(){},
            opened: function(){},
            close: function(){},
            closed: function(){},
            bg : $('.reveal-modal-bg'),
            css : {
                open : {
                    'opacity': 0,
                    'visibility': 'visible',
                    'display' : 'block'
                },
                close : {
                    'opacity': 1,
                    'visibility': 'hidden',
                    'display': 'none'
                }
            }
        },

        init : function (scope, method, options) {
            $.extend(true, this.settings, method, options);
            this.bindings(method, options);
        },

        events : function (scope) {
            var self = this,
                S = self.S;

            S(this.scope)
                .off('.reveal')
                .on('click.fndtn.reveal', '[' + this.add_namespace('data-reveal-id') + ']:not([disabled])', function (e) {
                    e.preventDefault();

                    if (!self.locked) {
                        var element = S(this),
                            ajax = element.data(self.data_attr('reveal-ajax'));

                        self.locked = true;

                        if (typeof ajax === 'undefined') {
                            self.open.call(self, element);
                        } else {
                            var url = ajax === true ? element.attr('href') : ajax;

                            self.open.call(self, element, {url: url});
                        }
                    }
                });

            S(document)
                .on('touchend.fndtn.reveal click.fndtn.reveal', this.close_targets(), function (e) {

                    e.preventDefault();

                    if (!self.locked) {
                        var settings = S('[' + self.attr_name() + '].open').data(self.attr_name(true) + '-init'),
                            bg_clicked = S(e.target)[0] === S('.' + settings.bg_class)[0];

                        if (bg_clicked) {
                            if (settings.close_on_background_click) {
                                e.stopPropagation();
                            } else {
                                return;
                            }
                        }

                        self.locked = true;
                        self.close.call(self, bg_clicked ? S('[' + self.attr_name() + '].open') : S(this).closest('[' + self.attr_name() + ']'));
                    }
                });

            if(S('[' + self.attr_name() + ']', this.scope).length > 0) {
                S(this.scope)
                    // .off('.reveal')
                    .on('open.fndtn.reveal', this.settings.open)
                    .on('opened.fndtn.reveal', this.settings.opened)
                    .on('opened.fndtn.reveal', this.open_video)
                    .on('close.fndtn.reveal', this.settings.close)
                    .on('closed.fndtn.reveal', this.settings.closed)
                    .on('closed.fndtn.reveal', this.close_video);
            } else {
                S(this.scope)
                    // .off('.reveal')
                    .on('open.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.open)
                    .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.opened)
                    .on('opened.fndtn.reveal', '[' + self.attr_name() + ']', this.open_video)
                    .on('close.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.close)
                    .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.settings.closed)
                    .on('closed.fndtn.reveal', '[' + self.attr_name() + ']', this.close_video);
            }

            return true;
        },

        // PATCH #3: turning on key up capture only when a reveal window is open
        key_up_on : function (scope) {
            var self = this;

            // PATCH #1: fixing multiple keyup event trigger from single key press
            self.S('body').off('keyup.fndtn.reveal').on('keyup.fndtn.reveal', function ( event ) {
                var open_modal = self.S('[' + self.attr_name() + '].open'),
                    settings = open_modal.data(self.attr_name(true) + '-init');
                // PATCH #2: making sure that the close event can be called only while unlocked,
                //           so that multiple keyup.fndtn.reveal events don't prevent clean closing of the reveal window.
                if ( settings && event.which === 27  && settings.close_on_esc && !self.locked) { // 27 is the keycode for the Escape key
                    self.close.call(self, open_modal);
                }
            });

            return true;
        },

        // PATCH #3: turning on key up capture only when a reveal window is open
        key_up_off : function (scope) {
            this.S('body').off('keyup.fndtn.reveal');
            return true;
        },

        open : function (target, ajax_settings) {
            var self = this,
                modal;

            if (target) {
                if (typeof target.selector !== 'undefined') {
                    // Find the named node; only use the first one found, since the rest of the code assumes there's only one node
                    modal = self.S('#' + target.data(self.data_attr('reveal-id'))).first();
                } else {
                    modal = self.S(this.scope);

                    ajax_settings = target;
                }
            } else {
                modal = self.S(this.scope);
            }

            var settings = modal.data(self.attr_name(true) + '-init');
            settings = settings || this.settings;

            if (!modal.hasClass('open')) {
                var open_modal = self.S('[' + self.attr_name() + '].open');

                if (typeof modal.data('css-top') === 'undefined') {
                    modal.data('css-top', parseInt(modal.css('top'), 10))
                        .data('offset', this.cache_offset(modal));
                }

                this.key_up_on(modal);    // PATCH #3: turning on key up capture only when a reveal window is open
                modal.trigger('open').trigger('open.fndtn.reveal');

                if (open_modal.length < 1) {
                    this.toggle_bg(modal, true);
                }

                if (typeof ajax_settings === 'string') {
                    ajax_settings = {
                        url: ajax_settings
                    };
                }

                if (typeof ajax_settings === 'undefined' || !ajax_settings.url) {
                    if (open_modal.length > 0) {
                        this.hide(open_modal, settings.css.close);
                    }

                    this.show(modal, settings.css.open);
                } else {
                    var old_success = typeof ajax_settings.success !== 'undefined' ? ajax_settings.success : null;

                    $.extend(ajax_settings, {
                        success: function (data, textStatus, jqXHR) {
                            if ( $.isFunction(old_success) ) {
                                old_success(data, textStatus, jqXHR);
                            }

                            modal.html(data);
                            self.S(modal).foundation('section', 'reflow');
                            self.S(modal).children().foundation();

                            if (open_modal.length > 0) {
                                self.hide(open_modal, settings.css.close);
                            }
                            self.show(modal, settings.css.open);
                        }
                    });

                    $.ajax(ajax_settings);
                }
            }
        },

        close : function (modal) {
            var modal = modal && modal.length ? modal : this.S(this.scope),
                open_modals = this.S('[' + this.attr_name() + '].open'),
                settings = modal.data(this.attr_name(true) + '-init') || this.settings;

            if (open_modals.length > 0) {
                this.locked = true;
                this.key_up_off(modal);   // PATCH #3: turning on key up capture only when a reveal window is open
                modal.trigger('close').trigger('close.fndtn.reveal');
                this.toggle_bg(modal, false);
                this.hide(open_modals, settings.css.close, settings);
            }
        },

        close_targets : function () {
            var base = '.' + this.settings.dismiss_modal_class;

            if (this.settings.close_on_background_click) {
                return base + ', .' + this.settings.bg_class;
            }

            return base;
        },

        toggle_bg : function (modal, state) {
            if (this.S('.' + this.settings.bg_class).length === 0) {
                this.settings.bg = $('<div />', {'class': this.settings.bg_class})
                    .appendTo('body').hide();
            }

            var visible = this.settings.bg.filter(':visible').length > 0;
            if ( state != visible ) {
                if ( state == undefined ? visible : !state ) {
                    this.hide(this.settings.bg);
                } else {
                    this.show(this.settings.bg);
                }
            }
        },

        show : function (el, css) {
            // is modal
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init') || this.settings,
                    root_element = settings.root_element;

                if (el.parent(root_element).length === 0) {
                    var placeholder = el.wrap('<div style="display: none;" />').parent();

                    el.on('closed.fndtn.reveal.wrapped', function() {
                        el.detach().appendTo(placeholder);
                        el.unwrap().unbind('closed.fndtn.reveal.wrapped');
                    });

                    el.detach().appendTo(root_element);
                }

                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    css.top = $(window).scrollTop() - el.data('offset') + 'px';
                    var end_css = {
                        top: $(window).scrollTop() + el.data('css-top') + 'px',
                        opacity: 1
                    };

                    return setTimeout(function () {
                        return el
                            .css(css)
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                                this.locked = false;
                                el.trigger('opened').trigger('opened.fndtn.reveal');
                            }.bind(this))
                            .addClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }

                if (animData.fade) {
                    css.top = $(window).scrollTop() + el.data('css-top') + 'px';
                    var end_css = {opacity: 1};

                    return setTimeout(function () {
                        return el
                            .css(css)
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                                this.locked = false;
                                el.trigger('opened').trigger('opened.fndtn.reveal');
                            }.bind(this))
                            .addClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }

                return el.css(css).show().css({opacity: 1}).addClass('open').trigger('opened').trigger('opened.fndtn.reveal');
            }

            var settings = this.settings;

            // should we animate the background?
            if (getAnimationData(settings.animation).fade) {
                return el.fadeIn(settings.animation_speed / 2);
            }

            this.locked = false;

            return el.show();
        },

        hide : function (el, css) {
            // is modal
            if (css) {
                var settings = el.data(this.attr_name(true) + '-init');
                settings = settings || this.settings;

                var animData = getAnimationData(settings.animation);
                if (!animData.animate) {
                    this.locked = false;
                }
                if (animData.pop) {
                    var end_css = {
                        top: - $(window).scrollTop() - el.data('offset') + 'px',
                        opacity: 0
                    };

                    return setTimeout(function () {
                        return el
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                                this.locked = false;
                                el.css(css).trigger('closed').trigger('closed.fndtn.reveal');
                            }.bind(this))
                            .removeClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }

                if (animData.fade) {
                    var end_css = {opacity: 0};

                    return setTimeout(function () {
                        return el
                            .animate(end_css, settings.animation_speed, 'linear', function () {
                                this.locked = false;
                                el.css(css).trigger('closed').trigger('closed.fndtn.reveal');
                            }.bind(this))
                            .removeClass('open');
                    }.bind(this), settings.animation_speed / 2);
                }

                return el.hide().css(css).removeClass('open').trigger('closed').trigger('closed.fndtn.reveal');
            }

            var settings = this.settings;

            // should we animate the background?
            if (getAnimationData(settings.animation).fade) {
                return el.fadeOut(settings.animation_speed / 2);
            }

            return el.hide();
        },

        close_video : function (e) {
            var video = $('.flex-video', e.target),
                iframe = $('iframe', video);

            if (iframe.length > 0) {
                iframe.attr('data-src', iframe[0].src);
                iframe.attr('src', 'about:blank');
                video.hide();
            }
        },

        open_video : function (e) {
            var video = $('.flex-video', e.target),
                iframe = video.find('iframe');

            if (iframe.length > 0) {
                var data_src = iframe.attr('data-src');
                if (typeof data_src === 'string') {
                    iframe[0].src = iframe.attr('data-src');
                } else {
                    var src = iframe[0].src;
                    iframe[0].src = undefined;
                    iframe[0].src = src;
                }
                video.show();
            }
        },

        data_attr: function (str) {
            if (this.namespace.length > 0) {
                return this.namespace + '-' + str;
            }

            return str;
        },

        cache_offset : function (modal) {
            var offset = modal.show().height() + parseInt(modal.css('top'), 10);

            modal.hide();

            return offset;
        },

        off : function () {
            $(this.scope).off('.fndtn.reveal');
        },

        reflow : function () {}
    };

    /*
     * getAnimationData('popAndFade') // {animate: true,  pop: true,  fade: true}
     * getAnimationData('fade')       // {animate: true,  pop: false, fade: true}
     * getAnimationData('pop')        // {animate: true,  pop: true,  fade: false}
     * getAnimationData('foo')        // {animate: false, pop: false, fade: false}
     * getAnimationData(null)         // {animate: false, pop: false, fade: false}
     */
    function getAnimationData(str) {
        var fade = /fade/i.test(str);
        var pop = /pop/i.test(str);
        return {
            animate: fade || pop,
            pop: pop,
            fade: fade
        };
    }
}(jQuery, window, window.document));


;(function ($, window, document, undefined) {
    'use strict';

    Foundation.libs.equalizer = {
        name : 'equalizer',

        version : '5.2.3',

        settings : {
            use_tallest: true,
            before_height_change: $.noop,
            after_height_change: $.noop,
            equalize_on_stack: false
        },

        init : function (scope, method, options) {
            Foundation.inherit(this, 'image_loaded');
            this.bindings(method, options);
            this.reflow();
        },

        events : function () {
            this.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e){
                this.reflow();
            }.bind(this));
        },

        equalize: function(equalizer) {
            var isStacked = false,
                vals = equalizer.find('[' + this.attr_name() + '-watch]:visible'),
                settings = equalizer.data(this.attr_name(true)+'-init');

            if (vals.length === 0) return;
            var firstTopOffset = vals.first().offset().top;
            settings.before_height_change();
            equalizer.trigger('before-height-change');
            vals.height('inherit');
            vals.each(function(){
                var el = $(this);
                if (el.offset().top !== firstTopOffset) {
                    isStacked = true;
                }
            });

            if (settings.equalize_on_stack === false) {
                if (isStacked) return;
            };

            var heights = vals.map(function(){ return $(this).outerHeight(false) }).get();

            if (settings.use_tallest) {
                var max = Math.max.apply(null, heights);
                vals.css('height', max);
            } else {
                var min = Math.min.apply(null, heights);
                vals.css('height', min);
            }
            settings.after_height_change();
            equalizer.trigger('after-height-change');
        },

        reflow : function () {
            var self = this;

            this.S('[' + this.attr_name() + ']', this.scope).each(function(){
                var $eq_target = $(this);
                self.image_loaded(self.S('img', this), function(){
                    self.equalize($eq_target)
                });
            });
        }
    };
})(jQuery, window, window.document);