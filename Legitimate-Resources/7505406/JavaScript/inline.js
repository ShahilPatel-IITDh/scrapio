

    const callChat = async (intentos = 0) => {
        try {
            let ifExistIframe = document.getElementById("iFrameResizer")
            let ifFnIframe = await handleMessage;
            if (!ifExistIframe || !ifFnIframe) {
                throw new Error();
            }
            if (ifExistIframe && ifFnIframe) {
                onActiveWidget("iFrameResizer");
            }
            return "";
        } catch (e) {
            if (intentos > 5) {
                return "";
            }
            setTimeout(() => {
                return callChat(intentos + 1);
            }, 3000);
        }
    };

    function onActiveWidget(getId) {
        let idIframe = document.getElementById(getId);
        var source_ = getUrlParams().source;
        if (typeof source_ != "undefined" && source_.toLowerCase() === "app") {
            idIframe.contentWindow.postMessage("CHAT", "*");
        }
        if (
            typeof source_ != "undefined" &&
            source_.toLowerCase() === "app-call"
        ) {
            idIframe.contentWindow.postMessage("CB", "*");
        }
        if (
            typeof source_ != "undefined" &&
            source_.toLowerCase() === "app-to-call"
        ) {
            idIframe.contentWindow.postMessage("C2C", "*");
        }
    }

    function getUrlParams(prop) {
        var params = {};
        var search = decodeURIComponent(
            window.location.href.slice(window.location.href.indexOf("?") + 1)
        );
        var definitions = search.split("&");
        definitions.forEach(function (val, key) {
            var parts = val.split("=", 2);
            params[parts[0]] = parts[1];
        });
        return prop && prop in params ? params[prop] : params;
    }
    window.addEventListener('load', callChat(0));
