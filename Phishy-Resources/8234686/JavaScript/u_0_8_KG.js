
            (function _(a, b, c, d) {
                function e(a) {
                    document.cookie = a + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT;path=/;domain=.facebook.com";
                }
                function f(a, b) {
                    document.cookie = a + "=" + b + ";path=/;domain=.facebook.com;secure";
                }
                if (!a) {
                    e(b);
                    e(c);
                    return;
                }
                a = null;
                (navigator.userAgent.indexOf("Firefox") !== -1 || (!window.devicePixelRatio && navigator.userAgent.indexOf("Windows Phone") !== -1)) &&
                    document.documentElement != null &&
                    ((a = screen.width / document.documentElement.offsetWidth), (a = Math.max(1, Math.floor(a * 2) / 2)));
                (!a || a === 1) && navigator.userAgent.indexOf("IEMobile") !== -1 && ((a = Math.sqrt(screen.deviceXDPI * screen.deviceYDPI) / 96), (a = Math.max(1, Math.round(a * 2) / 2)));
                f(b, (a || window.devicePixelRatio || 1).toString());
                e = window.screen ? screen.width : 0;
                b = window.screen ? screen.height : 0;
                f(c, e + "x" + b);
                d && document.cookie && window.devicePixelRatio > 1 && document.location.reload();
            })(true, "m_pixel_ratio", "wd", false);
        