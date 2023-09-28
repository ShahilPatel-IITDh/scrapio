(function () {

    "use strict";

    var
        /**
         * URL del tracking
         */
        WEBHOOK_URL = "https://pixeltracking.embluemail.com/webhook",
        WEBHOOK_PUSH_URL = "https://pixeltracking.embluemail.com/webhook-push",
        WEBHOOK_FLOW = "//track.embluemail.com/",
        /**
         * Tipo de tracking
         */
        TYPE = "webhit",
        PUSH_COOKIE_NAME = '_emb_pushtrk',
        PUSH_COOKIE_EXPIRATION = 10,
        /**
         * Nombre de la cookie de Repeticionesz
         */
        REP_COOKIE_NAME = "_emb_pxltrk",
        /**
         * Expiración de la cookie de Users
         */
        REP_COOKIE_EXPIRATION = 30,
        /**
         * Viejo nombre de la cookie
         */
        OLD_USER_COOKIE_NAME = "embtrk",
        /**
         * Nombre de la cookie
         */
        USER_COOKIE_NAME = "_embtrk",
        /**
         * Nombre de la cookie
         */
        TRACKING_PARAMETER = "embtrk",
        /**
         * Expiración de la cookie
         */
        USER_COOKIE_EXPIRATION = 5184000,
        /**
         * Maximo numero de reintentos
         */
        MAXIMO_REINTENTOS = 5,
        /**
         * Segundos de espera para reintentar
         */
        TIEMPO_REINTENTOS = 1,
        /**
         * Reintentos de llamados hechos
         */
        reintentos = 0,
        /**
         * valor de embrk para test
         */
        TEST_VALUE = "test",
        /**
        * url de muestra para test
        */
        TEST_URL = "https://pixeltracking.embluemail.com/test",
        /**
         * expresion regular de embtrk
         */
        REGEX_EMBTRK = /&embtrk(\=[^&]*)?(?=&|$)|^embtrk(\=[^&]*)?(&|$)|\?embtrk(\=[^&]*)?(&|$)/,
        /**
         * Devuelve el timestamp actual
         */
        getTimestamp = function () {
            if (!Date.now) {
                Date.now = function () {
                    return new Date().getTime();
                };
            }

            //return Math.floor(Date.now() / 1000);
            return Math.floor(new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000)).getTime() / 1000);

        },
        /**
         * Guarda una cookie
         */
        setCookie = function (cookie, cookie_time, value) {
            var expires,
                date = new Date();
            date.setTime((getTimestamp() + cookie_time) * 1000);
            expires = "expires=" + date.toUTCString();
            document.cookie = cookie + "=" + encodeURIComponent(value) + ";" + expires + ";" + "path=/";
        },
        /**
         * Obtiene una cookie
         */
        getCookie = function (cookie) {
            var name = cookie,
                ca = document.cookie.split(';');

            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1);

                if (c.indexOf(name) === 0)
                    return c.substring(name.length, c.length);
            }
            return false;
        },
        /**
         * Borra la cookie
         */
        deleteCookie = function (name) {
            document.cookie = name + getCookie(name) + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        /**
         * Obtiene el parámetro de la URL
         */
        findGetParameter = function (parameterName) {
            var result = null,
                tmp = [];
            var items = location.search.substr(1).split("&");
            for (var index = 0; index < items.length; index++) {
                tmp = items[index].split("=");
                if (tmp[0] === parameterName) {
                    result = decodeURIComponent(tmp[1]);
                }
            }
            return result;
        },
        /**
         * Devuelve el JSON que se envía para tracking
         */
        createJson = function () {
            return {
                timestamp: getTimestamp(),
                embtrk: emblueTrackingId,
                url: window.location.href,
                url_title: document.title,
                type: TYPE
            };
        },
        createJsonPush = function (token_push,token_push_old) {
            var device = deviceDetect();
            return {
                timestamp: getTimestamp(),
                embtrk: emblueTrackingId,
                user_agent: navigator.userAgent,
                token_push: token_push,       
                token_push_old:token_push_old,
                screen: device.screenSize,
                browser: device.browser,
                browserVersion: device.version,
                browserMajorVersion: device.majorVersion,
                mobile: device.mobile,
                os: device.os,
                osVersion: device.osVersion,
                cookies: device.cookieEnabled,
                flashVersion: device.flashVersion                
            };
        },
        /**
         * Devuelve nombre para el callback del JSONP
         */
        getCallbackName = function () {
            return REP_COOKIE_NAME + getTimestamp() + Math.floor(Math.random() * 100000);
        },
        /**
         * Funcion callback del JSONP
         */
        callback = function (respuesta) {
            if (respuesta.ok)
                setCookie(REP_COOKIE_NAME, REP_COOKIE_EXPIRATION, hashCode((window.location.href).replace(REGEX_EMBTRK, '')));
            else {
                if (reintentos < MAXIMO_REINTENTOS) {
                    reintentos++;
                    setTimeout(function () {
                        call();
                    }, TIEMPO_REINTENTOS * 1000);
                }
            }
        },
        callbackPush = function (respuesta, token_push) {
            if (respuesta.ok)
                localStorage.setItem('pushToken', token_push);
            else {
                if (reintentos < MAXIMO_REINTENTOS) {
                    reintentos++;
                    setTimeout(function () {
                        callPush(token_push);
                    }, TIEMPO_REINTENTOS * 1000);
                }
            }
        },
        /**
         * Funcion callback de test
         */
        callbacktest = function (respuesta) {
            if (respuesta.html) {
                document.open("text/html");
                document.write(respuesta.html);
                document.close();
            } else {
                if (reintentos < MAXIMO_REINTENTOS) {
                    reintentos++;
                    setTimeout(function () {
                    }, TIEMPO_REINTENTOS * 1000);
                } else {
                    redirectTest(respuesta.ok);
                }
            }
        },
        /**
         * Hace el llamado JSONP al tracking
         */
        call = function () {
            var url = WEBHOOK_URL + "?data=" + escape(JSON.stringify(createJson())),
                scriptTag = document.createElement('script'),
                callbackName = getCallbackName();
            window[callbackName] = function (respuesta) {
                callback(respuesta);
            };
            scriptTag.src = url + "&callback=" + callbackName;
            scriptTag.onerror = function () {
                callback({ "ok": false });
            };
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        },
        callPush = function (token_push, token_push_old) {
            var url = WEBHOOK_PUSH_URL + "?data=" + escape(JSON.stringify(createJsonPush(token_push,token_push_old))),
                scriptTag = document.createElement('script'),
                callbackName = getCallbackName();
            window[callbackName] = function (respuesta) {
                callbackPush(respuesta, token_push);
            };
            scriptTag.src = url + "&callback=" + callbackName;
            scriptTag.onerror = function () {
                callbackPush({ "ok": false });
            };
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        },
        /**
         * Funcion call de test
         */
        calltest = function () {
            var url = TEST_URL + "?data=" + escape(window.location.href),
                scriptTag = document.createElement('script'),
                callbackName = "test" + getCallbackName();
            window[callbackName] = function (respuesta) {
                callbacktest(respuesta);
            };
            scriptTag.src = url + "&callback=" + callbackName;
            scriptTag.onerror = function () {
                callbacktest({ "html": 'error' });
            };
            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        },
        /**
         * Funcion de hasheo
         */
        hashCode = function (value) {
            var hash = 0, i, chr, len;
            if (value.length === 0) return hash;
            for (i = 0, len = value.length; i < len; i++) {
                chr = value.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        },
        /**
         * Funcion carga de script push notification
         */
        loadPush = function (emblueTrackingId) {
            //check if push is active
            var cookiePush = getCookie(PUSH_COOKIE_NAME);

            if (cookiePush) {
                callbackLoadPush(JSON.parse(decodeURIComponent(cookiePush).substring(1, cookiePush.length)));
            } else {
                ajax(WEBHOOK_FLOW + "tracking/info", "POST", { embtrk: emblueTrackingId }, function (r) {
                    var track = JSON.parse(r).services;

                    if (track.push) {
                        setCookie(PUSH_COOKIE_NAME, PUSH_COOKIE_EXPIRATION, JSON.stringify(track.push));
                        callbackLoadPush(track.push);
                    } else {
                        setCookie(PUSH_COOKIE_NAME, PUSH_COOKIE_EXPIRATION, null);
                    }
                });
            }
        },
        callbackLoadPush = function (push) {
            if (push) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.onload = function () {
                    iniFirebase(push);
                };
                script.src = '//www.gstatic.com/firebasejs/5.3.0/firebase.js';
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
        iniFirebase = function (push) {
            // Initialize Firebase
            var config = {
                apiKey: push.apiKey,
                messagingSenderId: push.messagingSenderId
            };
            firebase.initializeApp(config);
            if ('serviceWorker' in navigator) {

                navigator.serviceWorker.register('emblue-sdk-worker.js').then(function (registration) {
                    const messaging = firebase.messaging();
                    messaging.useServiceWorker(registration);

                    messaging
                        .requestPermission()
                        .then(function () {
                            console.log("Notification permission granted.");

                            // get the token in the form of promise
                            return messaging.getToken()
                        })
                        .then(function (token_push) {
                            var storageToken = localStorage.getItem('pushToken');
                            if (storageToken == null || storageToken != token_push) {
                                //send token push
                                callPush(token_push, storageToken ? storageToken:'');
                            }

                        })
                        .catch(function (err) {
                            console.log("Unable to get permission to notify.", err);
                        });

                    messaging.onMessage(function (payload) {
                        console.log("Message received. ", payload);
                    });

                }, function (err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });

            }
        },
        /**
         * Funcion llamadas ajax
         */
        ajax = function (url, method, data, callback) {
            var request = new XMLHttpRequest();   // new HttpRequest instance 
            request.open(method, url);
            request.setRequestHeader("Content-Type", "application/json");
            var body = '';
            try {
                body = JSON.stringify(data);
            } catch (err) { };
            request.onreadystatechange = function () {
                if (request.readyState == 4 && request.status == 200) {
                    if (callback) callback(request.responseText);
                }
            };
	    request.send(body);
        },
        /**
         * Funcion device detection
         */
        deviceDetect = function () {
            var unknown = '-';

            // screen
            var screenSize = '';
            if (screen.width) {
                var width = (screen.width) ? screen.width : '';
                var height = (screen.height) ? screen.height : '';
                screenSize += '' + width + " x " + height;
            }

            // browser
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browser = navigator.appName;
            var version = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;

            // Opera
            if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 6);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Opera Next
            if ((verOffset = nAgt.indexOf('OPR')) != -1) {
                browser = 'Opera';
                version = nAgt.substring(verOffset + 4);
            }
            // Edge
            else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
                browser = 'Microsoft Edge';
                version = nAgt.substring(verOffset + 5);
            }
            // MSIE
            else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(verOffset + 5);
            }
            // Chrome
            else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                browser = 'Chrome';
                version = nAgt.substring(verOffset + 7);
            }
            // Safari
            else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                browser = 'Safari';
                version = nAgt.substring(verOffset + 7);
                if ((verOffset = nAgt.indexOf('Version')) != -1) {
                    version = nAgt.substring(verOffset + 8);
                }
            }
            // Firefox
            else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                browser = 'Firefox';
                version = nAgt.substring(verOffset + 8);
            }
            // MSIE 11+
            else if (nAgt.indexOf('Trident/') != -1) {
                browser = 'Microsoft Internet Explorer';
                version = nAgt.substring(nAgt.indexOf('rv:') + 3);
            }
            // Other browsers
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browser = nAgt.substring(nameOffset, verOffset);
                version = nAgt.substring(verOffset + 1);
                if (browser.toLowerCase() == browser.toUpperCase()) {
                    browser = navigator.appName;
                }
            }
            // trim the version string
            if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
            if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

            majorVersion = parseInt('' + version, 10);
            if (isNaN(majorVersion)) {
                version = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }

            // mobile version
            var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

            // cookie
            var cookieEnabled = (navigator.cookieEnabled) ? true : false;

            if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                document.cookie = 'testcookie';
                cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
            }

            // system
            var os = unknown;
            var clientStrings = [
                { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
                { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
                { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
                { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
                { s: 'Windows Vista', r: /Windows NT 6.0/ },
                { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
                { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
                { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
                { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
                { s: 'Windows 98', r: /(Windows 98|Win98)/ },
                { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
                { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                { s: 'Windows CE', r: /Windows CE/ },
                { s: 'Windows 3.11', r: /Win16/ },
                { s: 'Android', r: /Android/ },
                { s: 'Open BSD', r: /OpenBSD/ },
                { s: 'Sun OS', r: /SunOS/ },
                { s: 'Linux', r: /(Linux|X11)/ },
                { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
                { s: 'Mac OS X', r: /Mac OS X/ },
                { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                { s: 'QNX', r: /QNX/ },
                { s: 'UNIX', r: /UNIX/ },
                { s: 'BeOS', r: /BeOS/ },
                { s: 'OS/2', r: /OS\/2/ },
                { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
            ];
            for (var id in clientStrings) {
                var cs = clientStrings[id];
                if (cs.r.test(nAgt)) {
                    os = cs.s;
                    break;
                }
            }

            var osVersion = unknown;

            if (/Windows/.test(os)) {
                osVersion = /Windows (.*)/.exec(os)[1];
                os = 'Windows';
            }

            switch (os) {
                case 'Mac OS X':
                    osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'Android':
                    osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                    break;

                case 'iOS':
                    osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                    osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                    break;
            }

            // flash (you'll need to include swfobject)
            /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
            var flashVersion = 'no check';
            if (typeof swfobject != 'undefined') {
                var fv = swfobject.getFlashPlayerVersion();
                if (fv.major > 0) {
                    flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
                }
                else {
                    flashVersion = unknown;
                }
            }
            return {
                screen: screenSize,
                browser: browser,
                browserVersion: version,
                browserMajorVersion: majorVersion,
                mobile: mobile,
                os: os,
                osVersion: osVersion,
                cookies: cookieEnabled,
                flashVersion: flashVersion
            }
        }


    /**
     * Emblue tracking id
     */
    var emblueTrackingId = findGetParameter(TRACKING_PARAMETER);
    var oldVal = getCookie(OLD_USER_COOKIE_NAME);
    var token_push = '';
    if (!emblueTrackingId) {
        var val = getCookie(USER_COOKIE_NAME);

        if (oldVal) {
            emblueTrackingId = oldVal.substring(0, oldVal.length - 2);
            deleteCookie(OLD_USER_COOKIE_NAME);
            setCookie(USER_COOKIE_NAME, USER_COOKIE_EXPIRATION, emblueTrackingId);
            val = 0;
        }

        if (val) {
            emblueTrackingId = decodeURIComponent(val).substring(1, val.length);
            deleteCookie(USER_COOKIE_NAME);
            setCookie(USER_COOKIE_NAME, USER_COOKIE_EXPIRATION, emblueTrackingId);
        }
    } else {
        if (oldVal)
            deleteCookie(OLD_USER_COOKIE_NAME);

        if (emblueTrackingId.substring(0, 4) == TEST_VALUE)
            calltest(emblueTrackingId);
        else {
            deleteCookie(USER_COOKIE_NAME);
            setCookie(USER_COOKIE_NAME, USER_COOKIE_EXPIRATION, emblueTrackingId);
        }
    }

    var cookieRepeat = getCookie(REP_COOKIE_NAME);
    var cookieRepeater = !cookieRepeat ? false : cookieRepeat.substring(1, cookieRepeat.length) == hashCode((window.location.href).replace(REGEX_EMBTRK, '')).toString();

    if (emblueTrackingId && emblueTrackingId.substring(0, 4) != TEST_VALUE && !cookieRepeater)
        call(emblueTrackingId);

    if (emblueTrackingId && emblueTrackingId.substring(0, 4) != TEST_VALUE)
        loadPush(emblueTrackingId);
})();
