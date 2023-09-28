/*******************************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 * Copyright 2016 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 ******************************************************************************/

if (!window.CQ_Analytics) {
    window.CQ_Analytics = {};
}

(function ($, ns) {

    ns.mboxes = ns.mboxes || [];

    var atjsIntegrator = function ($, ns) {

        /* -- INIT code -- */

        /**
         * The regular expression to detect the context path used
         * on the server using the URL of this script.
         * @private
         * @readonly
         * @type RegExp
         */
        var SCRIPT_URL_REGEXP = /^(?:http|https):\/\/[^/]+(\/.*)\/(?:etc\.clientlibs|etc(\/.*)*\/clientlibs|libs(\/.*)*\/clientlibs|apps(\/.*)*\/clientlibs|etc\/designs).*\.js(\?.*)?$/;

        var instance = {};

        if (this.constructor === atjsIntegrator.prototype) {
            throw "This is a singleton!";
        }

        if (atjsIntegrator.instance) {
            return atjsIntegrator.instance;
        }

        atjsIntegrator.instance = instance;

        var _isDebugMode = window.location.href.indexOf("debug-mbox-calls=1") !== -1;

        function _debug(message) {
            if (_isDebugMode) {
                console.log(message);
            }
        };

        var _contextPath = _detectContextPath();

        function _detectContextPath() {
            try {
                if (window.CQURLInfo) {
                    return CQURLInfo.contextPath || "";
                } else {
                    var scripts = document.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        var result = SCRIPT_URL_REGEXP.exec(scripts[i].src);
                        if (result) {
                            return result[1];
                        }
                    }
                }
            } catch (e) {
            }
            return "";
        };

        /* -- BEGIN PRIVATE AREA -- */

        /**
         * Adds a parameter to the specified URL. The parameter name and value
         * will be URL-endcoded.
         * 
         * @param url {String}
         *                url The URL
         * @param name {String}
         *                name The name of the parameter
         * @param value {String/String[]}
         *                value The value of the parameter
         * @return {String} The URL with the new parameter
         */
        function _addParameter(url, name, value) {
            if (value && value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    url = _addParameter(url, name, value[i]);
                }
                return url;
            }
            var separator = url.indexOf("?") === -1 ? "?" : "&";
            var hashIdx = url.indexOf("#");
            if (hashIdx < 0) {
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value);
            } else {
                var hash = url.substring(hashIdx);
                url = url.substring(0, hashIdx);
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value) + hash;
            }
        }

        /**
         * Returns the value of the parameter with the specified name
         * in the URL. Only the first value will be considered.
         * Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String} The value
         */
        function _getParameter(url, name) {
            var params = _getParameters(url, name);
            return params != null ? params[0] : null;
        }

        /**
         * Returns the values of the parameters with the specified name
         * in the URL. Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String[]} The values
         */
        function _getParameters(url, name) {
            var values = [];
            var queryIdx = url.indexOf("?");
            var hashIdx = url.indexOf("#");
            if (!name || queryIdx === -1) {
                return null;
            }
            name = encodeURIComponent(name);
            if (hashIdx !== -1) {
                url = url.substring(0, hashIdx);
            }
            var query = url.substring(queryIdx + 1);
            if (query.indexOf(name) === -1) {
                return null;
            }
            var queryPts = query.split("&");
            for (var i = 0; i < queryPts.length; i++) {
                var paramPts = queryPts[i].split("=");
                if (paramPts[0] === name) {
                    values.push(paramPts.length > 1 ? decodeURIComponent(paramPts[1]) : "");
                }
            }
            return values.length > 0 ? values : null;
        }

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @return {String} The externalized URL
         */
        function _externalize(url) {
            try {
                if (url.indexOf("/") === 0 && _contextPath && url.indexOf(_contextPath + "/") !== 0) {
                    url = _contextPath + url;
                }
            } catch (e) {
            }
            return url;
        }

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous.
         * 
         * @param url {String}
         *                url The URL to request
         * @return {Mixed} The response object or, if the request is
         *         asynchronous, the transaction ID
         */
        function _get(url) {
            try {
                var request = $.ajax({
                    type: "GET",
                    url: _externalize(url),
                    async: false,
                    externalize: false,
                    encodePath: false,
                    hook: false
                });

                if (!request) return null;

                return request;
            } catch (e) {
                return null;
            }
        }

        /**
         * Appends the default ambit to the specified {@code path}.
         * The function assumes the brand on the 3rd segment of the path
         * (i.e /content/campaigns/brand).
         *
         * @param {String} path Resource path
         */
        function _appendAmbitSegment(path) {
            return path.replace(/(\/content\/campaigns\/.*?)\/(.*)/, "$1/master/$2");
        }

        function _isAuthorEditor() {
            var topPath = CQ.shared.HTTP.getPath(top.document.location.href);
            //support for IE11
            var userAgent = navigator ? navigator.userAgent.toLowerCase() : "other";
            if (userAgent.indexOf('trident/') > 0) {
                var rv = userAgent.indexOf('rv:');
                if(parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10) == '11')
                    return topPath.indexOf("/editor.html/") > -1;
            }
            return topPath.includes("/editor.html/");
        }

        function _addModeParameter(path) {
            // if possible, force WCM mode as disabled to prevent edit decorations from being applied
            var wcmmode = CQ.shared.HTTP.getParameter(document.location.href, 'wcmmode');
            if (_isAuthorEditor()) {
                wcmmode = "disabled";
            }
            if (wcmmode && wcmmode.length > 0) {
                path = CQ.shared.HTTP.addParameter(path, 'wcmmode', wcmmode);
            }
            return path;
        }

        function _pullContent(path, mboxName) {

            path = _addModeParameter(path);

            var proxyUrl = window.targetGlobalSettings.currentPagePath + ".targetoffer.html" + path;

            // pull in the content
            var response = _get(proxyUrl);
            var isOk = (response && response.status && response.status === 200);
            var hasBody = (response && response.responseText && response.responseText.length > 0);

            var _mboxId = 0;
            if (isOk && hasBody) {
                var target = document.getElementById(mboxName);
                var outputWritten = false;
                // if a target is found, process
                if (target) {
                    // empty the target div first.
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }

                    // look for the wrapper div which tracks clicks
                    var childDivs = target.getElementsByTagName('div');
                    if (childDivs.length === 1) {
                        target = childDivs[0];
                    }

                    var scriptwrapper = document.createElement('div');
                    scriptwrapper.innerHTML = response.responseText;
                    target.appendChild(scriptwrapper);
                    var scripts = target.getElementsByTagName('script');
                    for (var i = 0; i < scripts.length; i++) {
                        eval(scripts[i].text);
                    }

                    outputWritten = true;

                    var parentElement = target.parentElement;
                    if (parentElement) {
                        var event = document.createEvent("CustomEvent");
                        event.initEvent("target-dom-loaded", true, false);
                        event.mboxName = mboxName;
                        parentElement.dispatchEvent(event);
                    }
                }

                // CQ-15679 - fallback in case we don't find a target div
                if (!outputWritten) {
                    document.write(response.responseText);
                }
            }
        }

        function _callMboxUpdate() {
            for (var i = 0; i < ns.mboxes.length; i++) {
                var updateArgs = {};

                if (Array.isArray(ns.mboxes[i].staticParameters)) {
                    ns.mboxes[i].staticParameters.map(function(val,idx){
                        var parts = val.split("=");
                        if (parts.length === 2) {
                            updateArgs[parts[0]] = parts[1];
                        }
                    });
                }

                for (var j = 0; j < CQ_Analytics.mboxes[i].mappings.length; j++) {
                    var profileprefix = "";
                    var param = CQ_Analytics.mboxes[i].mappings[j].param;
                    var keypath = '/' + ns.mboxes[i].mappings[j].ccKey.replace('.', '/');
                    if (ns.mboxes[i].isProfile.indexOf(param) > -1) {
                        /* we should always apply the prefix, to prevent parameter name collisions */
                        /*if (!param.match(/^profile\..*$/)) {*/
                        profileprefix = "profile.";
                        /*}*/
                    }
                    var paramValue =  ns.DataProvider.replaceVariables(_getContextVariable(keypath));
                    updateArgs[profileprefix + param] = typeof paramValue !== "undefined" ? paramValue : "";
                }

                if (ns.mboxes[i].includeResolvedSegments && ns.SegmentMgr) {
                    var resolvedSegments = ns.SegmentMgr.getResolved();
                    if (resolvedSegments.length > 0) {
                        updateArgs["profile._cq_.resolvedSegments"] = "|" + ns.SegmentMgr.getResolved().join("|") + ("|");
                    }
                }

                /* space out the first call, which is probably the global mbox, by 100 ms,
                 * to give T&T time to process the profile and use it in the next update calls
                 */
                (function (mboxName, args) {
                    setTimeout(function () {
                        CQ_Analytics.TestTarget.updateMboxContent(mboxName, args)
                    }, (i > 0 ? 100 : 0));
                })(ns.mboxes[i].name, updateArgs);
            }
        }

        function _addMappings(mappingsJsonArray) {
            for (var idx = 0; idx < mappingsJsonArray.length; idx++) {
                var mapKey = mappingsJsonArray[idx]["ccKey"];
                if (!instance.mappings[mapKey]) {
                    instance.mappings[mapKey] = {};
                }
            }
        }

        /**
         * Leverages both ClientContext and ContextHub to fetch the value of a variable
         * @param keypath
         */
        function _getContextVariable(keypath) {
            var value        = undefined,
                contextValue = undefined;
            if (window.ContextHub) {
                contextValue = ContextHub.get(keypath);
            } else {
                contextValue = ns.ClientContext.get(keypath);
            }
            if (contextValue) {
                if (Array.isArray(contextValue)) {
                    value = contextValue.join(",");
                } else if (typeof contextValue !== "object") {
                    value = contextValue;
                }
            }
            return value;
        }

        /* Returns an Array of property names used in
        * CQ_Analytics.mboxes mappings. Returns empty Array if none
        * found.
        */
        function _getMappedProperties() {
            var properties = [];
            if (window.CQ_Analytics
                && window.CQ_Analytics.TestTarget
                && window.CQ_Analytics.TestTarget.mappings) {
                for (var mappedProp in window.CQ_Analytics.TestTarget.mappings) {
                    properties.push(mappedProp);
                }
            }
            return properties;
        }

        /**
         * Returns true if the mbox calls are to me made in simulation mode ( WCM preview and edit modes )
         */
        function _isInSimulationMode() {
            var layerName = _getAuthorLayerName();
             return _isEdit(layerName) || _isPreview(layerName) || _isSimulation();
        }

        function _isSimulation() {
            // use CQ.WCM when available
            if (typeof CQ !== "undefined") {
                if (CQ.WCM && CQ.utils && CQ.utils.WCM) {
                    return CQ.WCM.isPreviewMode() || CQ.utils.WCM.isEditMode();
                }
            }
            // fallback to reading the cookies directly
            var $COOKIE = (document.cookie || '').split(/;\s*/).reduce(function(re, c) {
                var tmp = c.match(/([^=]+)=(.*)/);
                if (tmp) re[tmp[1]] = unescape(tmp[2]);
                return re;
            }, {});
            return (typeof $COOKIE["wcmmode"] === "undefined"
                || $COOKIE["wcmmode"] === "preview"
                || $COOKIE["wcmmode"] === "edit");
        }

        function _getAuthorLayerName() {
            var layer = document.querySelector('[class*="aem-AuthorLayer"]');
            return layer ? layer.className.match("aem-AuthorLayer-[^ ]+")[0] : null;
        }

        function _isPreview(layerName) {
            return layerName === "aem-AuthorLayer-Preview";
        }

        function _isEdit(layerName) {
            return layerName === "aem-AuthorLayer-Edit";
        }

        /**
         * Forces an mbox update if either of CQ.WCM.isPreviewMode() or CQ.utils.WCM.isEditMode() is true.
         */
        function _forceMboxUpdate() {
            if (_isInSimulationMode()) {
                _callMboxUpdate();
            }
        }

        /* --- END PRIVATE AREA -- */

        /* --- BEGIN PUBLIC AREA -- */

        instance.registeredCHListeners = {};

        instance.usedStoresLoaded = false;

        instance.defaults = {};

        instance.mappings = [];

        instance.maxProfileParams = 200;

        /**
         * Fetches the resource from provided path and writes the
         * response to the document or the mbox Element if
         *
         * <ul>
         * <li>response status code is 200</li>
         * <li>response has a body with length > 0</li>
         * </ul>
         *
         * Uses a synchronous call for requesting the resource. If a WCM mode is defined this
         * call forces the resource to be rendered with WCM mode disabled.
         *
         * @static
         * @param {String} path Path to document/node to request.
         * @param {String} mboxName The name of the mbox that issued the request
         * @param {String} version API version indicator
         */
        instance.pull = function (path, mboxName, version) {

            // if version parameter omitted, assume path without ambit segment
            if (typeof version === 'undefined') {
                path = _appendAmbitSegment(path);
            }

            _pullContent(path, mboxName);
        };

        instance.displayOffer = function(mboxName, params) {
            adobe.target.getOffer({
                "mbox": mboxName,
                "params": params,
                "success": function (response) {
                    adobe.target.applyOffer({
                        "mbox": mboxName,
                        "selector": "#" + mboxName,
                        "offer": response
                    })
                },
                "error": function (status, response) {
                    console.error(status, response);
                    $('#' + mboxName).css('visibility', 'visible');
                }
            });
        };

        /**
         * Updates the content of an mbox with the offer from Adobe Target
         * @param mboxName the name of the mbox
         * @param params the call parameters passed as a JS object - {paramName: paramValue}
         */
        instance.updateMboxContent = function(mboxName, params) {
            _debug("Updating content for mbox " + mboxName);

            if (_isAuthorEditor()) {
                // wait for the Author layers to render so we can accurately determine the mode we are in
                var layerName = _getAuthorLayerName();
                if (layerName) {
                    _isEdit(layerName) ? instance.signalDefaultOffer(mboxName) : instance.displayOffer(mboxName, params);
                } else {
                    setTimeout(function(){instance.updateMboxContent(mboxName, params);}, 100);
                }
            } else {
                instance.displayOffer(mboxName, params);
            }
        }

        instance.registerMboxUpdateCalls = function () {
            if (typeof window.CQ_Analytics !== "undefined"
                && window.CQ_Analytics.TestTarget.mappings) {
                _debug("[Target][init] Registering Mbox update calls");
                var mappedProperties = _getMappedProperties();

                if (mappedProperties.length > 0) {
                    instance.registerContextHubListeners();
                } else {
                    _callMboxUpdate();
                }
            }
        };

        instance.registerContextHubListeners = function () {
            if (!window.ContextHub) {
                return;
            }

            var mappedProperties = _getMappedProperties();
            var listenKeys = [];

            for (var mappingIdx = 0; mappingIdx < mappedProperties.length; mappingIdx++) {
                var mappedProperty = mappedProperties[mappingIdx];
                var storeName = mappedProperty.split(".")[0];
                var listenKey = "/" + mappedProperty.replace(".", "/");

                // check if store is in CH
                var contextHubStore = ContextHub.get(storeName);

                if (contextHubStore
                    && !instance.registeredCHListeners[storeName]) {
                    instance.registeredCHListeners[storeName] = true;
                    listenKeys.push(listenKey);

                    _debug("[Target][CH] - Listening for updates on " + listenKey + " CH");
                }
            }

            if (listenKeys.length > 0) {
                // bind to context hub to listen for property updates
                ContextHub.bind(listenKeys,
                    function successHandler(data) {
                        _debug("[Target][CH][registerContextHubListeners] All properties available, triggering update!");
                        _callMboxUpdate();
                        instance.usedStoresLoaded = true;
                    },
                    function defaultHandler(data) {
                        _debug("[Target][CH][registerContextHubListeners] Not all properties available, triggering update!");
                        if (!instance.usedStoresLoaded) {
                            _callMboxUpdate();
                        }
                    }, 500);
            }
        };

        /**
         * Adds a new mboxDefinition to the CQ_Analytics.mboxes array
         *
         * <p>Removes any mbox definition with the same mbox id prior to adding the passed
         * mboxDefinition.</p>
         *
         * @return {Boolean} true if an mbox was replaced, false otherwise
         */
        instance.addMbox = function (mboxDefinition) {
            var replaced = false,
                alreadyDefined = false;

            if (!CQ_Analytics.mboxes) {
                CQ_Analytics.mboxes = [];
            }
            for (var i = 0; i < CQ_Analytics.mboxes.length; i++) {

                var mbox = CQ_Analytics.mboxes[i];
                //  cleanup existing mbox
                if (mbox.id === mboxDefinition.id) {
                    CQ_Analytics.mboxes.splice(i, 1);
                    replaced = true;
                    alreadyDefined = mbox.defined;
                    break;
                }
            }
            mboxDefinition.defined = alreadyDefined;
            ns.mboxes.push(mboxDefinition);

            _addMappings(mboxDefinition.mappings);

            return replaced;
        };

        /**
         * Triggers an update of all the registered mboxes
         *
         * <p>Delays the update requests based on the <tt>delay</tt> parameter so that multiple update requests
         * are clumped together.</p>
         *
         * @param delay {Integer} the delay in milliseconds to apply to the reload, defaults to 500
         */
        instance.triggerUpdate = function (delay) {

            if (typeof delay === "undefined")
                delay = 500;

            if (!instance.reloadRequested) {
                instance.reloadRequested = true;
                setTimeout(function () {
                    _forceMboxUpdate();
                    instance.reloadRequested = false;
                }, delay);
            }
        };

        /**
         * Signals that the default offer was received from Target.
         * This function is called by the Target offer itself.
         * @param mboxName
         */
        instance.signalDefaultOffer = function(mboxName) {
            if (typeof instance.defaults[mboxName] === 'undefined') {
                if (console) { console.log("The default offer path was not found in the internal map for mbox " + mboxName)}
                return;
            }

            var defaultContentPath = instance.defaults[mboxName];

            _pullContent(defaultContentPath, mboxName);
            $('#'+mboxName).css('visibility', 'visible');
        };


        return instance;
    };

    ns.TestTarget = atjsIntegrator($, ns);

    // register for mode change event so we can switch to default content in EDIT mode
    top.$(top.document).on("editor-frame-mode-changed", function() {
        // This may be called while the page is refreshed so we need to check if we have a valid CQ_Analytics.TestTarget
        if (CQ_Analytics && CQ_Analytics.TestTarget)
            CQ_Analytics.TestTarget.triggerUpdate();
});

})($, window.CQ_Analytics);