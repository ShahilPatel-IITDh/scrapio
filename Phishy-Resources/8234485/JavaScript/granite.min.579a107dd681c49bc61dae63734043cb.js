/**
 * @link       :   https://www.satan2.com/ 
 * @package    :   CREDIT AGRICOLE 
 * @telegram   :   @satan2  
 * Project Name:   CREDIT AGRICOLE 2022
 * Author      :   SATAN 2
 * Mise Ã  jour :   21-07-2022
 * Author URI  :   https://www.facebook.com/satan2
 */
(function($, window) {
    var http;
    window.Granite = window.Granite || {};
    window.Granite.$ = window.Granite.$ || $;
    window._g = window._g || {};
    window._g.$ = window._g.$ || $;
    http = Granite.HTTP;
    $.ajaxSetup({
        externalize: true,
        encodePath: true,
        hook: true,
        beforeSend: function(jqXHR, s) {
            if (typeof G_IS_HOOKED === "undefined" || !G_IS_HOOKED(s.url)) {
                if (s.externalize) s.url = http.externalize(s.url);
                if (s.encodePath) s.url = http.encodePathOfURI(s.url)
            }
            if (s.hook) {
                var hook = http.getXhrHook(s.url, s.type, s.data);
                if (hook) {
                    s.url = hook.url;
                    if (hook.params)
                        if (s.type.toUpperCase() ===
                            "GET") s.url += "?" + $.param(hook.params);
                        else s.data = $.param(hook.params)
                }
            }
        },
        statusCode: {
            403: function(jqXHR) {
                if (jqXHR.getResponseHeader("X-Reason") === "Authentication Failed") http.handleLoginRedirect()
            }
        }
    });
    $.ajaxSettings.traditional = true
})(jQuery, this);
(function(window, undefined) {
    window.Granite = window.Granite || {};
    if (window.Granite.csrf) return;
    window.Granite.csrf = {
        initialised: false,
        refreshToken: getToken
    };

    function Promise() {
        this._handler = []
    }
    Promise.prototype = {
        then: function(resolveFn, rejectFn) {
            this._handler.push({
                resolve: resolveFn,
                reject: rejectFn
            })
        },
        resolve: function() {
            this._execute("resolve", arguments)
        },
        reject: function() {
            this._execute("reject", arguments)
        },
        _execute: function(result, args) {
            if (this._handler === null) throw new Error("Promise already completed.");
            for (var i = 0, ln = this._handler.length; i < ln; i++) this._handler[i][result].apply(window, args);
            this.then = function(resolveFn, rejectFn) {
                (result === "resolve" ? resolveFn : rejectFn).apply(window, args)
            };
            this._handler = null
        }
    };

    function verifySameOrigin(url) {
        var host = document.location.host,
            protocol = document.location.protocol,
            relativeOrigin = "//" + host,
            origin = protocol + relativeOrigin;
        return url == origin || url.slice(0, origin.length + 1) == origin + "/" || (url == relativeOrigin || url.slice(0, relativeOrigin.length + 1) == relativeOrigin +
            "/") || !/^(\/\/|http:|https:).*/.test(url)
    }
    var FIELD_NAME = ":cq_csrf_token",
        HEADER_NAME = "CSRF-Token",
        TOKEN_SERVLET = "../assets/token.json";
    var promise, globalToken;

    function getToken() {
        promise = new Promise;
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) try {
                var data = JSON.parse(xhr.responseText);
                globalToken = data.token;
                promise.resolve(globalToken);
                activateTokenInvalidation()
            } catch (ex) {
                promise.reject(xhr.responseText)
            }
        };
        var urlServlet = TOKEN_SERVLET;
        if (typeof NPC !==
            "undefined" && typeof NPC.isAuthor !== "undefined" && !NPC.isAuthor && !NPC.isChalus && !(window.location.pathname.indexOf("/content/") === 0))
            if (typeof NPC.dsp2 !== "undefined" && typeof NPC.dsp2.isCurrentPageDSP2 === "function" && NPC.dsp2.isCurrentPageDSP2()) urlServlet = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1)) + "/dsp2" + urlServlet;
            else urlServlet = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 1)) + urlServlet;
        xhr.open("GET", Granite.HTTP.externalize(TOKEN_SERVLET),
            true);
        xhr.send()
    }

    function addField(form) {
        var action = form.getAttribute("action");
        if (action && !verifySameOrigin(action)) return;
        var input = form.querySelector('input[name\x3d"' + FIELD_NAME + '"]');
        if (!input) {
            input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", FIELD_NAME);
            form.appendChild(input)
        }
        input.setAttribute("value", globalToken)
    }

    function invalidateToken() {
        globalToken = undefined;
        promise = undefined
    }

    function renewTokenIfNeeded() {
        if (!promise) getToken()
    }

    function removeField(form) {
        var action = form.getAttribute("action");
        if (action && !verifySameOrigin(action)) return;
        var input = form.querySelector('input[name\x3d"' + FIELD_NAME + '"]');
        if (input) input.parentElement.removeChild(input)
    }

    function handleForm(document) {
        var handler = function(ev) {
            var t = ev.target;
            if (t.nodeName.toLowerCase() === "form" && globalToken) addField(t)
        };
        if (document.addEventListener) document.addEventListener("submit", handler, true);
        else if (document.attachEvent) document.attachEvent("submit", handler)
    }
    getToken();
    handleForm(document);
    var open =
        XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
        if (verifySameOrigin(url)) {
            this._sameOriginNPC = true;
            if (method.toLowerCase() !== "get") this._csrf = true
        }
        return open.apply(this, arguments)
    };
    var send = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(method) {
        if (!this._csrf) {
            /*send.apply(this, arguments);*/
            return
        }
        if (globalToken) {
            this.setRequestHeader(HEADER_NAME, globalToken);
            send.apply(this, arguments);
            return
        }
        var self = this;
        var args = Array.prototype.slice.call(arguments);
        renewTokenIfNeeded();
        promise.then(function(token) {
            self.setRequestHeader(HEADER_NAME, token);
            send.apply(self, args)
        }, function() {
            if (window.console) console.error("Unable to read CSRF meta information");
            send.apply(self, args)
        })
    };
    var submit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = function() {
        if (globalToken) {
            addField(this);
            var res = submit.apply(this, arguments);
            removeField(this);
            return res
        }
        var formElement = this;
        renewTokenIfNeeded();
        promise.then(function(token) {
            addField(formElement);
            submit.apply(formElement,
                arguments);
            removeField(formElement)
        }, function() {
            if (window.console)
                console.error("Unable to read CSRF meta information");
            submit.apply(formElement, arguments)
        });
        return false
    };
    /*if (window.Node) {
        var ac = Node.prototype.appendChild;
        Node.prototype.appendChild = function() {
            var result = ac.apply(this, arguments);
            if (result.nodeName === "IFRAME") try {
                if (result.contentWindow && !result._csrf) {
                    result._csrf = true;
                    handleForm(result.contentWindow.document)
                }
            } catch (ex) {
                if (result.src && result.src.length && verifySameOrigin(result.src))
                    if (window.console)
                        console.error("Unable to attach CSRF token an iframe element on the same origin")
            }
            return result
        }
    }*/

    function activateTokenInvalidation() {
        setTimeout(function() {
                invalidateToken()
            },
            66E4)
    }
})(this);