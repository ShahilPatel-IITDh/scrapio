
    (function () {
        var currentScript = document.currentScript;
        var currentScriptDataset = currentScript.dataset;
        var lastCheckStatusKey = currentScriptDataset.lastCheckStatusKey;
        var lastCheckTimestampKey = currentScriptDataset.lastCheckTimestampKey;
        var refreshIntervalMs = parseInt(currentScriptDataset.refreshIntervalMs, 10);
        var scriptSrc = currentScriptDataset.scriptSrc;

        if (lastCheckStatusKey && lastCheckTimestampKey && refreshIntervalMs && scriptSrc && !isNaN(refreshIntervalMs)) {
            if (localStorage.getItem(lastCheckStatusKey) === null) {
                localStorage.setItem(lastCheckStatusKey, String(false));
            }
            
            if (localStorage.getItem(lastCheckTimestampKey) === null){
                localStorage.setItem(lastCheckTimestampKey, String(0));
            }

            var locationHref = document.location.href;
            var now = Date.now();
            var lastCheckStatus = String(localStorage.getItem(lastCheckStatusKey)).toLowerCase() === 'true';
            var lastCheckTimestamp = parseInt(localStorage.getItem(lastCheckTimestampKey), 10);

            if (!isNaN(lastCheckTimestamp)) {
                var needRefreshByInterval = now - lastCheckTimestamp > refreshIntervalMs;

                if (needRefreshByInterval || lastCheckStatus) {
                    var LOAD = 'load';
                    var ERROR = 'error';
                    var script = document.createElement('script');

                    function scriptEventHandler(evt) {
                        var target = evt.target;
                        var evtType = evt.type;

                        var currentCheckStatus = false;
                        var currentCheckTimestamp = Date.now();

                        if (evtType === LOAD) {
                            currentCheckStatus = true;
                        }

                        localStorage.setItem(lastCheckStatusKey, String(currentCheckStatus));
                        localStorage.setItem(lastCheckTimestampKey, String(currentCheckTimestamp));

                        target.removeEventListener(LOAD, scriptEventHandler);
                        target.removeEventListener(ERROR, scriptEventHandler);
                    }

                    if (!locationHref.match(/(\/checkouts\/|\/thank_you)/gi)) {
                        script.defer = true;
                    }

                    script.addEventListener(LOAD, scriptEventHandler);
                    script.addEventListener(ERROR, scriptEventHandler);

                    script.src = scriptSrc;

                    document.head.insertBefore(script, currentScript);
                }
            }
        } else {
            console.error('wrapper is not right configured');
        }
    })();
