
    document.addEventListener('DOMContentLoaded', function(){
        let wWNamespace = window.WWNamespace;
        let modules = [
            window[wWNamespace.LOAD_MODULE_SERVICE].addListener(window[wWNamespace.MODULES].JQUERY),
        ];
        window[WWNamespace.LOAD_MODULE_SERVICE].waitForAll(modules, function() {
            let script = document.createElement('script');
            let scriptTemplate = document.getElementById('ww-objects-js-scripts_template');
            script.id = 'ww-objects-js-scripts';
            script.type = "text/javascript";
            script.innerHTML = scriptTemplate.innerHTML;
            scriptTemplate.parentNode.removeChild(scriptTemplate)
            window.document.body.appendChild(script);
        });
    });
