
            (function() {
                var w = window;
                w.iMDS = w.iMDS || {};
                w.iMDS.Device = "desktop";
                w.iMDS.Env = "production";
				
                function loadScript(u,l,e) {
                    var s = document.createElement('script');
                    if(l)s.onload=l;
                    if(e)s.onerror=e;
                    document.head.appendChild(s);
                    s.src = u;
                }
                function trackError(e) {
                    w.console.error(e);
                    var img = new Image();
                    img.src = "/images/track/track.gif?track=cube-error&track-error=" + encodeURIComponent(e);
                }
                function loadTesseractScript() {
                    loadScript('https:\/\/tesseract.imds-cdn.com/tesseract.js', function() {
                    w.tesseract['default']({ client: "centurylink" })
                        .then(t => {
                            t.renderComponent("singlecube.Home", {"startContentServiceOrigin":"https://scs.imds-api.com","tvDataServiceOrigin":"https://tvdata.imds-api.com","trovaServiceOrigin":"https://trova.imds-api.com","weatherServiceOrigin":"https://weather.imds-api.com","locationServiceOrigin":"https://location.imds-api.com","portalStaticOrigin":"https://portal-static.imds-cdn.com"},
                            document.getElementById('SingleCube-Pages-Root'));
                        });
                    });
                }
                if (!('fetch'in w && ('Promise'in w && 'any'in w.Promise) && 'URL'in w && 'includes'in Array.prototype && 'assign'in Object && 'entries'in Object && 'keys'in Object)) {
                    loadScript('https:\/\/tesseract.imds-cdn.com/polyfills.js', loadTesseractScript, loadTesseractScript);
                } else {
                    loadTesseractScript();
                }
            }());
        