(function () {
    var _bkvisit = {
        track: function () {
            var request = this.createRequest(),
                payload = this.getPayload();
            var cookieWarningEnabled = window.bk_cookie_warning_enabled && window.bk_cookie_warning_enabled === true;
            var hasOptedIn = window.localStorage && window.localStorage.getItem('bk-cookie-warning') === '1';

            if (!cookieWarningEnabled || hasOptedIn) {
                this.send(request, payload);
            } else {
                var eventHandler = function() {
                    this.send(request, payload);
                };
                var eventHandlerBind = eventHandler.bind(this);

                document.getElementById('js-cookie-consent-event').addEventListener(
                    'cookieConsentEvent', eventHandlerBind
                );
            }
        },

        createRequest: function () {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
            return new ActiveXObject("Microsoft.XMLHTTP");
        },

        getPayload: function () {
            var p = [
                'siteRef=' + encodeURIComponent(App.session.get('siteRef')),
                'timestamp=' + encodeURIComponent(Math.floor(this.getTimestamp() / 1000)),
                'path=' + encodeURIComponent(window.location.pathname),
                'referrer=' + encodeURIComponent(document.referrer),
                'userAgent=' + encodeURIComponent(navigator.userAgent)
            ];
            return p.join('&');
        },

        getTimestamp: function () {
            if (!Date.now) {
                return new Date().getTime();
            }
            return Date.now();
        },

        send: function (request, payload) {
            request.open('POST', '/_bk/track', true);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.send(payload);
        }
    };
    _bkvisit.track();
})();
