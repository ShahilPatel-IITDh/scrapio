var SITE_DETAILS={};

var checkSiteDetailsExist = function() {
    var siteDetailsStr = $('meta[name="fivestar.sitedetails"]').attr("content"),
        valid = false;
    if (siteDetailsStr && siteDetailsStr.trim()) {
        var siteDetailsArr = siteDetailsStr.split('|');
        for (var i = 0; i < siteDetailsArr.length; i++) {
            var objValues = siteDetailsArr[i].split(':');
            SITE_DETAILS[objValues[0]] = objValues[1];
        }
        if (SITE_DETAILS.segment && SITE_DETAILS.locale) {
            valid = true;
        }
    }
    return valid;
}

$(function() {
    var valid=checkSiteDetailsExist();

    window.sessionStorage.setItem('channel', 'PWEB')
    window.sessionStorage.setItem('pageName', location.href)

    if ( valid ) {
        window.sessionStorage.setItem('segment', SITE_DETAILS.segment);
        window.sessionStorage.setItem('country', SITE_DETAILS.country);
        window.sessionStorage.setItem('language', SITE_DETAILS.locale);
    }
    else {
        window.sessionStorage.setItem('segment', "personal"); // Hardcoding as default if we do not get SITE_DETAILS in meta tag
        window.sessionStorage.setItem('country', 'SG');
        window.sessionStorage.setItem('language', 'en');
    }

    window.sessionStorage.setItem('entryPoint', 'PWEB');
    window.sessionStorage.setItem('pageTagging', 'sg:en:pweb:dbs:home');
    window.sessionStorage.setItem('brandIndicator', 'DBS');
    window.sessionStorage.setItem('pageId', 'sg:en:pweb:dbs:home');
    window.sessionStorage.setItem('chatComm', "");

    function stylesheet(url) {
        var s = document.createElement('link');
        s.type = 'text/css';
        s.async = true;
        s.href = url;
        s.rel = "stylesheet"
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(s);
    }

    function script(url) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(s);
    }

    var html = '<div id="chat-launcher" class="chat-launcher">';
    html += '<div class="chat-spinner">';
    html += '  <div class="chat-intro chat-bounce">May I help you?</div>';
    html += '  <div id="chat-icon" class="chat-slideup">';
    html += '    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSI1NHB4IiBoZWlnaHQ9IjU0cHgiIHZpZXdCb3g9IjAgMCA1NCA1NCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4gICAgICAgIDx0aXRsZT5BcnRib2FyZCAyPC90aXRsZT4gICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+ICAgIDxkZWZzPjwvZGVmcz4gICAgPGcgaWQ9IkFydGJvYXJkLTIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPiAgICAgICAgPGcgaWQ9InNtaWxleSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEuMDAwMDAwLCAxNS4wMDAwMDApIiBmaWxsPSIjRkFGN0YzIiBmaWxsLXJ1bGU9Im5vbnplcm8iPiAgICAgICAgICAgIDxwYXRoIGQ9Ik01Ljc1MTUxNTE1LDAuMDM3MTQyODU3MSBMMjUuMTczMzMzMywwLjAzNzE0Mjg1NzEgQzI3LjkzNDc1NzEsMC4wMzcxNDI4NTcxIDMwLjE3MzMzMzMsMi4yNzU3MTkxMSAzMC4xNzMzMzMzLDUuMDM3MTQyODYgTDMwLjE3MzMzMzMsMTcuMSBDMzAuMTczMzMzMywxOS44NjE0MjM3IDI3LjkzNDc1NzEsMjIuMSAyNS4xNzMzMzMzLDIyLjEgTDUuNzUxNTE1MTUsMjIuMSBDMi45OTAwOTE0LDIyLjEgMC43NTE1MTUxNTIsMTkuODYxNDIzNyAwLjc1MTUxNTE1MiwxNy4xIEwwLjc1MTUxNTE1Miw1LjAzNzE0Mjg2IEMwLjc1MTUxNTE1MiwyLjI3NTcxOTExIDIuOTkwMDkxNCwwLjAzNzE0Mjg1NzEgNS43NTE1MTUxNSwwLjAzNzE0Mjg1NzEgWiBNMTAuMzg5Njk3LDkuMDYyODU3MTQgQzExLjIzMDE3MzksOS4wNjI4NTcxNCAxMS45MTE1MTUyLDguMzg5MzY1NDkgMTEuOTExNTE1Miw3LjU1ODU3MTQzIEMxMS45MTE1MTUyLDYuNzI3Nzc3MzcgMTEuMjMwMTczOSw2LjA1NDI4NTcxIDEwLjM4OTY5Nyw2LjA1NDI4NTcxIEM5LjU0OTIyLDYuMDU0Mjg1NzEgOC44Njc4Nzg3OSw2LjcyNzc3NzM3IDguODY3ODc4NzksNy41NTg1NzE0MyBDOC44Njc4Nzg3OSw4LjM4OTM2NTQ5IDkuNTQ5MjIsOS4wNjI4NTcxNCAxMC4zODk2OTcsOS4wNjI4NTcxNCBaIE0yMS41NDk2OTcsOS4wNjI4NTcxNCBDMjIuMzkwMTczOSw5LjA2Mjg1NzE0IDIzLjA3MTUxNTIsOC4zODkzNjU0OSAyMy4wNzE1MTUyLDcuNTU4NTcxNDMgQzIzLjA3MTUxNTIsNi43Mjc3NzczNyAyMi4zOTAxNzM5LDYuMDU0Mjg1NzEgMjEuNTQ5Njk3LDYuMDU0Mjg1NzEgQzIwLjcwOTIyLDYuMDU0Mjg1NzEgMjAuMDI3ODc4OCw2LjcyNzc3NzM3IDIwLjAyNzg3ODgsNy41NTg1NzE0MyBDMjAuMDI3ODc4OCw4LjM4OTM2NTQ5IDIwLjcwOTIyLDkuMDYyODU3MTQgMjEuNTQ5Njk3LDkuMDYyODU3MTQgWiBNMTUuOTY5Njk3LDE2LjA4Mjg1NzEgQzE4LjIxMTg0MjQsMTYuMDgyODU3MSAyMS4wNDI0MjQyLDE0LjA3NzE0MjkgMjAuMDI3ODc4OCwxMy41NzU3MTQzIEMxOS4wMTMzMzMzLDEzLjA3NDI4NTcgMTguMjExODQyNCwxNC4xOTk0OTE0IDE1Ljk2OTY5NywxNC4xOTk0OTE0IEMxMy43Mjc1NTE1LDE0LjE5OTQ5MTQgMTIuOTI2MDYwNiwxMi45NTE5MzcxIDExLjkxMTUxNTIsMTMuNTc1NzE0MyBDMTAuODk2OTY5NywxNC4xOTk0OTE0IDEzLjcyNzU1MTUsMTYuMDgyODU3MSAxNS45Njk2OTcsMTYuMDgyODU3MSBaIiBpZD0iQ29tYmluZWQtU2hhcGUiPjwvcGF0aD4gICAgICAgICAgICA8cGF0aCBkPSJNMjEuMDY2NzczMywyNC4zNDk0MDg2IEMyMS42MTQ2Mjc5LDI1LjMyMjE4IDIyLjQ5ODI5NywyNS4zMjYxOTE0IDIzLjA0NzE2NjEsMjQuMzQ5NDA4NiBMMjcuMTI5Njk3LDE3LjA4NTcxNDMgTDE2Ljk4NDI0MjQsMTcuMDg1NzE0MyBMMjEuMDY2NzczMywyNC4zNDk0MDg2IFoiIGlkPSJTaGFwZSI+PC9wYXRoPiAgICAgICAgPC9nPiAgICA8L2c+PC9zdmc+" alt="Launch Chat">';
    html += '  </div>';
    html += '</div>';
    html += '</div>';
    html += '<div id="chat-canvas"></div>';
	var isChatEnabled = $('meta[name="chat.enabled"]');
    if ((isChatEnabled && isChatEnabled.attr('content') === "true" )) {
        if ( window.location.href.indexOf(".html") != -1 ) {
          // On the day of LV, chatbot was not working in html pages because the html was included inside body and body was blocking the click events to reach chatbot.
          // It worked after we added the html outside the body i.e. used after method
          // Since LV was going on, we limit this change only to .html pages using this if clause
          $('body').after(html);
        } else {
          $('body').append(html);
        }
    	stylesheet('//chatbanking.dbs.com/cbg/pweb/css/chat.css');
    	script('//chatbanking.dbs.com/cbg/pweb/js/chat.js');

        setTimeout(function() {
          if ( $('meta[name="chat.open"]') && $('meta[name="chat.open"]').attr("content") === "true" && $("#chat-icon") )  {
            $("#chat-icon").trigger("click");
          }
        }, 3000);
    }

    var TIMER_BOUNCE = 60;
    var TIMER_OPEN = 120 - TIMER_BOUNCE;


    var firstBounce = function() {
        $(document).idle({
            idle: TIMER_BOUNCE * 1000,
            onIdle: function () {
                window.dispatchEvent( new Event('CBInactivityBounceRq') );
                $(document).trigger('idle:stop');
                secondBounce();
                window.sessionStorage.setItem('firstBounce', 'DONE')
            }
        })
    }

    var secondBounce = function() {
        $(document).idle({
            idle: TIMER_OPEN * 1000,
            onIdle: function () {
                window.dispatchEvent( new Event('CBInactivityMessageRq') );
                $(document).trigger('idle:stop');
                window.sessionStorage.setItem('secondBounce', 'DONE')
            }
        })
    }

    if (window.sessionStorage.getItem('firstBounce') === 'DONE') {
        if (window.sessionStorage.getItem('secondBounce') !== 'DONE') {
            secondBounce();        
        } 
    } else {
        firstBounce();
    }

    
});

function goToState(id , sessionID, type) {
    if (type === 'AuthenticateMeLiveChat') {
        var width = 781;
        var height = window.innerHeight < 700 ? window.innerHeight : 700;
        var left = (window.screen.width / 2) - ((width / 2) + 10);
        var top = (window.screen.height / 2) - ((height / 2) + 50);
        window.sessionStorage.removeItem('chatStatus')    
        window.sessionStorage.removeItem('chatComm')
        window.localStorage.removeItem("LAST_AUTH_CODE")
        var CAPI_AUTH_URL = "/iwov-resources/cb/livechat/CIP.html?PWEB=true";
        var LOGIN_POPUP = window.open(CAPI_AUTH_URL, '', "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + left + ",top=" + top + ",screenX=" + left + ",screenY=" + top + ",toolbar=no,menubar=no,scrollbars=yes,location=no,directories=no", '_self');
 
        LOGIN_POPUP_TIMER = setInterval(function () {
            if (LOGIN_POPUP != null && LOGIN_POPUP.closed) {
                clearInterval(LOGIN_POPUP_TIMER);
                var authStatus = localStorage.getItem("LAST_AUTH_CODE");
                if (authStatus === null) {
                	window.sessionStorage.setItem('chatStatus', 'Cancel');
        			window.sessionStorage.setItem('chatComm', '')  
            	} else if (authStatus === 'false') {
                	window.sessionStorage.setItem('chatStatus', 'Fail');
        			window.sessionStorage.removeItem('chatComm')  
                } else {
                	window.sessionStorage.setItem('chatStatus', 'Success');
            		window.sessionStorage.setItem('chatComm', authStatus);
                }
                localStorage.removeItem("AUTH_STATUS");
            }
        }, 1000);
    }
}
(function ($) {
    'use strict';

    $.fn.idle = function (options) {
        var defaults = {
                idle: 60000, //idle time in ms
                events: 'click.idle', //events that will trigger the idle resetter
                onIdle: function () {
                },
                onActive: function () {
                }, //callback function to be executed after back from idleness
                onHide: function () {
                }, //callback function to be executed when window is hidden
                onShow: function () {
                }, //callback function to be executed when window is visible
                keepTracking: true, //set it to false if you want to track only the first time
                startAtIdle: false,
                recurIdleCall: false
            },
            idle = options.startAtIdle || false,
            visible = !options.startAtIdle || true,
            settings = $.extend({}, defaults, options),
            lastId = null,
            resetTimeout,
            timeout;

        //event to clear all idle events
        $(this).on("idle:stop", {}, function (event) {
            $(this).off(settings.events);
            settings.keepTracking = false;
            resetTimeout(lastId, settings);
        });

        resetTimeout = function (id, settings) {
            if (idle) {
                idle = false;
                settings.onActive.call();
            }
            clearTimeout(id);
            if (settings.keepTracking) {
                return timeout(settings);
            }
        };

        timeout = function (settings) {
            var timer = (settings.recurIdleCall ? setInterval : setTimeout), id;
            id = timer(function () {
                idle = true;
                settings.onIdle.call();
            }, settings.idle);
            return id;
        };

        return this.each(function () {
            lastId = timeout(settings);
            $(this).on(settings.events, function (e) {
                lastId = resetTimeout(lastId, settings);
            });
            if (settings.onShow || settings.onHide) {
                $(document).on("visibilitychange webkitvisibilitychange mozvisibilitychange msvisibilitychange", function () {
                    if (document.hidden || document.webkitHidden || document.mozHidden || document.msHidden) {
                        if (visible) {
                            visible = false;
                            settings.onHide.call();
                        }
                    } else {
                        if (!visible) {
                            visible = true;
                            settings.onShow.call();
                        }
                    }
                });
            }
        });

    };
}(jQuery));
