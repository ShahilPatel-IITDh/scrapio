$(function () {
        var cssFiles = [];
        var jsFiles = ["js\/stApp-core.js?v=69.18701774027338319405"];

        window.requestIdleCallback =
            window.requestIdleCallback ||
            function (cb) {
                var start = Date.now();
                return setTimeout(function () {
                    cb({
                        didTimeout: false,
                        timeRemaining: function () {
                            return Math.max(0, 50 - (Date.now() - start));
                        }
                    });
                }, 1);
            }

        window.cancelIdleCallback =
            window.cancelIdleCallback ||
            function (id) {
                clearTimeout(id);
            }

        window.requestIdleCallback(function () {
            cssFiles.forEach(function (cssFile) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.media = 'all';
                link.href = cssFile;

                document.getElementsByTagName("head")[0].appendChild(link);
            });
        });

        window.requestIdleCallback(function () {
            jsFiles.forEach(function (jsFile) {
                if (jsFile != '') {
                    var script = document.createElement('script');
                    script.src = jsFile;
                    script.async = true;
                    script.defer = true;
                    script.type = 'text/javascript';

                    window.requestAnimationFrame(function () {
                        document.getElementById("lazyload_js_container").appendChild(script);
                    });
                }
            })
        });
    });