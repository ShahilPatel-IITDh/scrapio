var hasInterceptLoaded = false;
        window.addEventListener("qsi_js_loaded", interceptLoaded, false);

        //window.addEventListener('DOMContentLoaded', function(ev) {  });

        function interceptLoaded() {
            if (QSI.API) {
                console.log("Qualtrics Loaded")
                hasInterceptLoaded = true;
                //console.log(QSI);
                /*QSI.API.getIntercept('testFicohsa').then(function (interceptAPI) {
                    console.log(interceptAPI);
                });*/
            } else {
                console.log("Qualtrics not Loaded")
            }
        }

        function runIntercept() {
            if (hasInterceptLoaded) {
                QSI.API.run();
            }
        }
        function profileClicked() {
            if (hasInterceptLoaded) {
                QSI.API.unload();
                QSI.API.load().done(runIntercept);
            }
        }