//uFACTS JS library
function ufactsLog() { if (location.search.indexOf('jsdebug=true') > 0) console.log.call(this, arguments); } ufactsLog('ufacts.js loading...');
_ufacts = (typeof ufacts === 'undefined') ? {} : ufacts;
var ufacts = (function ($) {

    var obj = {}; //container for all publicly exposed API

    //COLLAPSIBLE SECTIONS FUNCTIONALITY
    (function () {
        //open/close toggling
        var isOpen = function (triggerElement) { return !$(triggerElement).parents('.section').hasClass('collapsed'); };
        var open = function (triggerElement) {
            if (!isOpen(triggerElement))
                $(triggerElement).parents('.section').removeClass('collapsed').find('.sectCont').slideToggle();
        };
        var close = function (triggerElement) {
            if (isOpen(triggerElement))
                $(triggerElement).parents('.section').addClass('collapsed').find('.sectCont').slideToggle();
            if (isHelpOpen(triggerElement))
                toggleHelp(triggerElement);
        };
        var toggle = function (triggerElement) { isOpen(triggerElement) ? close(triggerElement) : open(triggerElement); }

        //help toggling
        var isHelpOpen = function (triggerElement) { return $(triggerElement).parents('.section').find('.sectHelp').is(':visible'); };
        var toggleHelp = function (triggerElement) { $(triggerElement).parents('.section').find('.sectHelp').slideToggle(); }

        //INIT
        $(function () {
            $('.section.collapsed').find('.sectCont').hide(); //immediately hide sections that should be collapsed
            $('.section .trigger').click(function () { toggle(this); }); //expand/collapse trigger
            $('.section').each(function () { //help trigger
                var $trigger = $(this).find('.sectHeader .help');
                if (!!$(this).find('.sectHelp').length) { $trigger.click(function () { open(this); toggleHelp(this); }); } //attach click event to show/hide
                else { $trigger.hide(); } //hide trigger if there's no help content
            });
        });

        //PUBLIC API
        obj.section = {
            expand: function (el) { open(el); },
            collapse: function (el) { close(el); },
            showHelp: function (el) { toggleHelp(el); }
        }
    }());

    //NEED HELP FUNCTIONALITY
    (function () {
        var $nh = $('#needHelp');
        var isOpen = function () { return !$nh.hasClass('collapsed'); };
        var show = function (focus) { $nh.removeClass('collapsed'); $(document).on('click.needHelp', function () { $('#needHelp').addClass('collapsed') }); if (focus) $nh[0].scrollIntoView(); };
        var hide = function () { $nh.addClass('collapsed'); $(document).off('click.needHelp'); };
        var toggle = function () { isOpen() ? hide() : show(); }

        //INIT
        $(function () {
            //need help options
            $nh.click(function (e) { e.stopPropagation(); }); //clicks inside #needHelp container should not be propagated beyond it
            $nh.find('.helpTrigger').click(toggle);
        });

        //PUBLIC API
        obj.needHelp = {
            show: function (focus) { show(focus); },
            hide: function () { hide(); }
        }
    }());

    //POPUP WINDOW HANDLING
    (function () {
        var open = function (url, target, options) {
            if (!url) url = '';
            if (!target) target = $('#__pfsid').val() || 'ufacts-popup';
            if (!options) options = {};
            var features = getPopupFeatures(options);
            var winRef = window.open(url, target, features.asString);
            setTimeout(function () {
                if (!winRef) alert("Your browser may have blocked our popup window.\nPlease allow popups in order to view the requested document.");
                else {
                    if (!getSettings(winRef)) setSettings(features.flags, winRef); //set settings once and avoid overwriting them when URL changes
                    if (!url) writeTempContent(winRef, "Please wait...");
                }
            }, 100);

            return winRef;
        };
        var setSettings = function (settings, windowReference) {
            if (!windowReference) windowReference = window;
            windowReference.sessionStorage.setItem('ufacts.popup', JSON.stringify(settings));
        }
        var getSettings = function (windowReference) {
            if (!windowReference) windowReference = window;
            var settings = JSON.parse(windowReference.sessionStorage.getItem('ufacts.popup'));
            return settings;
        }
        var getPopupFeatures = function (options) {
            var features = {
                flags: {
                    closeOnDownload: isSaveAsDetachedFromTab()
                }
            }
            if (options.width || options.height || (options.flags && options.flags.openAsPopup)) {
                features = {
                    flags: {
                        closeOnDownload: false //"save as" dialog gets dismissed as soon as our popup window is closed
                    },
                    width: 800,
                    height: 450,
                    resizable: 'yes',
                    scrollbars: 'yes'
                };
            }
            $.extend(true, features, options);

            var result = '';
            for (var key in features)
                if (key != 'flags')
                    result += key + '=' + features[key] + ',';
            features.asString = result.slice(0, -1);
            return features;
        };
        var isSaveAsDetachedFromTab = function () {
            //return true if "save as" prompt and download notification in this browser will remain visible even after our tab is closed.
            //some browsers display "save as" prompt and download notification in the tab itself, so closing the tab removes the prompt and notification.
            var isFirefox = typeof InstallTrigger !== 'undefined';
            var isChromium = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
            return isFirefox || isChromium || isSafari;
        }
        var writeTempContent = function (winRef, text) {
            var html = winRef.document.querySelectorAll('html#temp');
            if (html && html.remove) html.remove();
            winRef.document.write('<html id="temp"><body style="padding: 0; margin: 0; font-size: 16px; font-family: Arial;"><img src="/images/core/main_logo.gif" style="padding-left: 10px;"/><br/><div style="background-color:#6b78a2; line-height:15px; font-size:80%;">&nbsp;</div><div style="background-color:#ccc;">&nbsp;</div><div id="loadmsg" style="border-top: 2px solid #6b78a2; padding: 1em;">' + text + '</div></body></html>');
            setTimeout(function () {
                if (winRef && winRef.document.querySelectorAll('html#temp'))
                    winRef.document.getElementById('loadmsg').innerHTML += "<br/><br/>This operation is taking longer than expected. You may want to <a href='javascript:close()'>close</a> this window and try again.";
            }, 5000);
        }

        //PUBLIC API
        obj.popup = {
            open: function (url, target, options) { return open(url, target, options); },
            getSettings: function (windowReference) { return getSettings(windowReference); }
        }
    }());

    //API/AJAX METHODS
    (function () {
        var callApi = function (url, dataObj, onComplete, options) {
            var defaults = {
                url: url,
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: onComplete,
                error: onComplete
            };
            var settings = $.extend(true, {}, defaults, options);
            if (dataObj != null) settings.data = JSON.stringify(dataObj);
            return $.ajax(settings);
        };
        var callPageMethod = function (method, dataObj, onComplete, options) {
            var defaults = {
                url: window.location.pathname + "/" + method,
                headers: { "X-uFACTS-SSB": "ReadOnly" } //sets Session State Behavior to ReadOnly and prevents this ajax request from blocking other ASP.NET calls
            };
            var settings = $.extend(true, {}, defaults, options);
            return callApi(settings.url, dataObj, onComplete, settings);
        };

        //PUBLIC API
        obj.api = {
            call: function (url, dataObj, onComplete, options) { return callApi(url, dataObj, onComplete, options); },
            callPM: function (method, dataObj, onComplete, options) { return callPageMethod(method, dataObj, onComplete, options); }
        }
    }());

    //INIT OTHER COMMON FUNCTIONALITY
    $(function () {
        //left nav "menu" button
        $('#leftNavTrigger').click(function () { $('#leftNavColumn').toggleClass('alwaysShow'); });

        //closeable boxes
        $('<span class="closeBoxBtn" tabindex="0" title="Close"></span>').click(function () { $(this).parent().slideUp(); }).appendTo('.closeableBox');

        //equate "Enter" key to a mouse click on all span elements
        $('span').keypress(function (e) { if (e.which == 13) { $(this).click(); } });

        //bind click event for popups
        $('form').on('click', '*[data-popup-url], *[data-popup-target]', function () {
            try { var options = JSON.parse(this.getAttribute('data-popup-options')); } catch (error) { console && console.error && console.error('Invalid "data-popup-options" value.', error, this.outerHTML.replace(this.innerHTML || '', '')); }
            ufacts.popup.open(this.getAttribute('data-popup-url'), this.getAttribute('data-popup-target'), options);
        });
    });

    return obj;
}(jQuery));
jQuery.extend(true, ufacts, _ufacts); delete _ufacts;
jQuery(document).on('ufactsload', function () { ufactsLog("'ufactsload' event fired"); }).triggerHandler('ufactsload');