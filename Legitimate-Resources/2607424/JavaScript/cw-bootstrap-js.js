// check if cn domain and display cn domain toolbar logo
if (window.location.host.endsWith(".com.cn")) {
    document.getElementById("apple-logo").style.display = "none";
    document.getElementById("gcbd-logo").style.display = "block";
}

// If we fail on creating a new URL, we need to immediately redirect to the /browser_unsupported/ page.
try {
    // eslint-disable-next-line @icloudweb/safe/no-new-url, no-new, no-restricted-globals -- grandfathered legacy code
    new URL(window.location.origin);
} catch (e) {
    window.location.replace(`${origin}/unsupported_browser/`);
}

// #region rtl detection

/** From @apple/localization to support RTL tagging. */
const rtlLocales = [
    "ar", // Arabic
    "iw", // Legacy code for Hebrew
    "he", // New code for Hebrew
    "ur", // Urdu
    "fa", // Persian
    "sd", // Sindhi
];

/** Get whether the given locale is an RTL language. */
const isRTL = (locale) => rtlLocales.some((l) => locale.startsWith(l));

/** Get HTML `dir` attribute value for directionality of the given locale. */
const getDir = (localeId) => (isRTL(localeId) ? "rtl" : "ltr");

// #endregion

(function () {
    const { performance } = window;
    if (performance && performance.mark) {
        performance.mark("chunk-main-dom-creation");
    }

    const docEl = document.documentElement;
    const currentLocale = docEl.getAttribute("lang") || "en-us";
    docEl.setAttribute("dir", getDir(currentLocale));

    // #region Early validate

    function uuidString() {
        if (crypto.randomUUID) return crypto.randomUUID();

        const bytes = crypto.getRandomValues(new Uint8Array(16));

        // Set the appropriate bits
        // Set time_hi_and_version field to 0100 (13th hex digit -> 4)
        bytes[6] = (bytes[6] & 0xf) | 0x40;
        // Tweak clock_seq_hi_and_reserved field (17th hex digit -> 8, 9, a or b)
        bytes[8] = (bytes[8] & 0x3f) | 0x80;

        let ret = "";
        for (let i = 0; i < 16; ++i) {
            ret += bytes[i].toString(16).padStart(2, "0");
            // Add the appropriate dashes.
            if (i === 3 || i === 5 || i === 7 || i === 9) {
                ret += "-";
            }
        }
        return ret;
    }

    async function earlyFetchAuthenticationDetails(clientId) {
        const hostname = window.location.hostname;
        /** Note: if changing this, keep [ALL_ICLOUD_ENV_NAMES](src/Utils/envs.ts) in sync! */
        const validHostnames = [
            "www.icloud.com",
            "www.icloud.com.cn",
            "beta.icloud.com",
            "future.icloud.com",
            "carry.icloud.com",
            "sprinkles.icloud.com",
        ];
        if (!validHostnames.includes(hostname)) return null;

        // ssoRedirect skipping validate call in order to call fetchCentralizedWebToken() in 1FA mode.
        const pathname = window.location.pathname;
        const invalidPathnames = ["/ssoRedirect"];
        if (invalidPathnames.includes(pathname)) return null;

        const servicesDomain =
            hostname === "www.icloud.com.cn" ? "icloud.com.cn" : "icloud.com";

        const url = `https://setup.${servicesDomain}/setup/ws/1/validate?clientBuildNumber=${window.__CW_BUILD_INFO.buildNumber}&clientMasteringNumber=${window.__CW_BUILD_INFO.masteringNumber}&clientId=${clientId}`;
        const response = await (async () => {
            try {
                // eslint-disable-next-line no-restricted-syntax -- init.js is too soon to have apiRequest
                return await window.fetch(url, {
                    method: "POST",
                    credentials: "include",
                });
            } catch (e) {
                return null;
            }
        })();
        if (!response) return null;

        if (
            response.status !== 200 &&
            response.status !== 401 &&
            response.status !== 421 &&
            response.status !== 403
        ) {
            return [response, null];
        }

        const jsonBody = await (async () => {
            try {
                return await response.json();
            } catch (e) {
                return null;
            }
        })();

        if (performance && performance.measure) {
            performance.measure("Early Validation");
        }
        return [response, jsonBody];
    }
    window.__earlyClientId = uuidString();
    window.__earlyValidationPromise = earlyFetchAuthenticationDetails(
        window.__earlyClientId
    );

    // #endregion
    // #region Preconnect and DNS prefetch

    const fullHostname = window.location.hostname;
    const validHostnames = [
        "www.icloud.com",
        "www.icloud.com.cn",
        "beta.icloud.com",
        "future.icloud.com",
        "carry.icloud.com",
        "sprinkles.icloud.com",
    ];
    if (!validHostnames.includes(fullHostname)) return;

    ["gateway", "ckdatabasews", "cvws.icloud-content"].forEach((host) => {
        const preconnectLinkTag = document.createElement("link");
        const dnsPreFetchLinkTag = document.createElement("link");

        let href = "";
        if (host.includes(".")) {
            // if it has a "." from the list above we are assuming
            // only the TLD stays the same (e.g. ".com" or ".com.cn")
            const topLevelDomain = fullHostname.slice(
                fullHostname.indexOf(".com") + 1
            );
            href = `https://${host}.${topLevelDomain}`;
        } else {
            // Remove the subdomain from the host e.g 'www'.
            const domain = fullHostname.slice(fullHostname.indexOf(".") + 1);
            href = `https://${host}.${domain}`;
        }

        preconnectLinkTag.href = href;
        preconnectLinkTag.rel = "preconnect";
        preconnectLinkTag.setAttribute("crossorigin", "");

        dnsPreFetchLinkTag.href = href;
        dnsPreFetchLinkTag.rel = "dns-prefetch";

        document.head.appendChild(preconnectLinkTag);
        document.head.appendChild(dnsPreFetchLinkTag);
    });

    // #endregion
    // #region Home page wallpaper prefetch

    const elem = document.createElement("canvas");
    const type =
        // Detect webp support (https://stackoverflow.com/a/27232658)
        elem.getContext &&
        elem.getContext("2d") &&
        elem.toDataURL("image/webp").startsWith("data:image/webp")
            ? (document.documentElement.setAttribute("data-supports-webp", ""),
              "webp")
            : "jpeg";
    const linkElement = document.createElement("link");
    linkElement.rel = "preload";
    linkElement.as = "image";
    linkElement.href = `/system/icloud.com/current/static/wallpaper.${type}`;
    linkElement.type = `image/${type}`;
    document.head.append(linkElement);

    // #endregion
    // #region Early iframe mount
    // If we're directly launching an app, load the child app in parallel with CloudOS.
    early_iframe_mount: {
        const els = document.getElementsByClassName("root-component");
        const iframeRoot = els[0];
        // Only a few apps have been verified to support this behavior so far.
        // At the moment, eligible apps need to always run from the same
        // hostname as CloudOS, support all locales that CloudOS supports
        // (including ar-sa and iw-il), and be manually verified to work with
        // this optimization.
        const eligibleApps = ["iclouddrive"];
        let match = eligibleApps.find(function (app) {
            // Match things like:
            // "/iclouddrive" "/iclouddrive/"
            return new RegExp("^/" + app.replace(/\d$/, "") + "(?:/|$)").test(
                window.location.pathname
            );
        });
        if (!match) {
            break early_iframe_mount;
        }
        // The markup for the iframe must exactly match what
        // ChildApplicationRemoteViewController expects.
        const iframe = document.createElement("iframe");
        iframe.id = "early-child";
        iframe.src =
            "https://" +
            window.location.hostname +
            "/applications/" +
            match +
            "/current/" +
            currentLocale +
            "/index.html?rootDomain=" +
            window.location.hostname.substring(
                0,
                window.location.hostname.indexOf(".")
            );
        iframe.classList.add("child-application", "unclaimed");
        iframe.setAttribute("data-name", match);
        // Keep track of the iframe state until the React app "hydrates" this
        // iframe.
        let loadHandler, messageHandler;
        iframe.__data = {
            loaded: false,
            ready: false,
            claimed: false,
            onHydrate: function () {
                iframe.removeEventListener("load", loadHandler);
                removeEventListener("message", messageHandler);
            },
        };
        loadHandler = function () {
            iframe.__data.loaded = true;
        };
        iframe.addEventListener("load", loadHandler);
        iframeRoot.append(iframe);
        // The message we're anticipating is fired by ProcessSupport:start in
        // @icloudweb/process-kit from the child application. Since the early
        // mounted app may (but won't always) load before CloudOS, we must
        // emulate CloudOS's ProcessKit response until ProcessKit is ready.
        messageHandler = function (event) {
            if (!event.isTrusted) {
                return;
            }
            if (event.source !== iframe.contentWindow) {
                return;
            }
            if (typeof event.data !== "string") {
                return;
            }
            // eslint-disable-next-line @icloudweb/safe/no-json-parse -- we don't have imports here
            const data = JSON.parse(event.data);
            if (!data || typeof data !== "object") {
                return;
            }
            if (data.jsonrpc !== "2.0") {
                return;
            }
            if (typeof data.id !== "string") {
                return;
            }
            if (
                data.method !==
                "MessagingFromChildProtocol-isReadyToReceiveMessages"
            ) {
                return;
            }
            iframe.__data.ready = true;
            removeEventListener("message", messageHandler);
            // eslint-disable-next-line @icloudweb/process-kit/no-post-message -- we don't have imports here
            event.source.postMessage(
                JSON.stringify({
                    jsonrpc: "2.0",
                    id: data.id,
                    result: { status: "OK" },
                })
            );
        };
        addEventListener("message", messageHandler);
    }
    // #endregion
})();
