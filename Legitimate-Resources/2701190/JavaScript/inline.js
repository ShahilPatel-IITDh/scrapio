
    function injectExternalJs() {
        var externalJsElement = null;
        var stageMainJs = "https://storage.googleapis.com/cw-stage/main.js";
        var prodMainJs = "https://storage.googleapis.com/cw-prod/main.js";

        externalJsElement = document.createElement("script");
        externalJsElement.id = "mainJs";
        externalJsElement.src = window.location.href.indexOf("stage-") !== -1 ? stageMainJs : prodMainJs;
        externalJsElement.defer = true;

        document.body.appendChild(externalJsElement);
    }

    injectExternalJs();
