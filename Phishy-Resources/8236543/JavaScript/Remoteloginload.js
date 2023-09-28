"use strict";

var EBC = EBC || {};

EBC.RemoteLogin = function (args) {
    var _this = this;

    if (!args.applicationPath) { return; }
    if (!args.formId) { return; }
    if (!args.passwordId) { return; }
    if (!args.routingTransit) { return; }
    if (!args.usernameId) { return; }

    _this._applicationPath = args.applicationPath;
    if (args.applicationPath.substr(args.applicationPath.length - 1) !== "/") {
        _this._applicationPath += "/";
    }

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.language = "javascript";
    script.src = _this._applicationPath + "js/remoteLoginPost";

    script.addEventListener('load', function () {
        if (typeof EBC.RemoteLoginPost !== "function") { return; }

        new EBC.RemoteLoginPost(args);
    });

    document.head.appendChild(script);
};
