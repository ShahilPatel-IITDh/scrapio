/** ctm-core.js
    This script loads the core modules/features as below that are handled by CTM team.
    - OneTrust Script initiation
    TO-DO:
    - Initiate data layer object - utag_data / ctm_data
    - Define trackEventQueue API
    - 
*/
if (typeof ctm === "undefined") ctm = {};
//Function encapsulates all GDPR releated features and attributes
ctm.gdpr = (function() {
    //Event Queue for call backs if not defined
    var eventqueue = [];
    //Optanon Wrapper Function Counter
    var owCount = 0;
    //Log Message Queue
    var gdprLogQueue =[];
    //Utility to display log messages, that could help in debugging
    var consoleLog = function(msg){
        var msg = msg || "";
        if(msg !==""){gdprLogQueue.push(msg)}
        var qParams = document.location.search;
        var regGdprLog = /(\?|\&)gdprLog\=true/ig;
        // if log enabled through local storage setting or query param
        if((typeof localStorage ==="object" && typeof localStorage["gdprLog"] !=="undefined") || (regGdprLog.test(qParams))){
            console.log(msg);
        }
    };
    const OTConfig = [{
        "%.cisco.com": {
            "prod": "01303338-a875-43c5-b896-ad191297169b",
            "uat": "c1b166fc-3fc0-4735-8ae7-9ff92ed0d80e"
        }
    }, {
        "%.webex.com": {
            "prod": "90edb953-2d93-48ae-a39a-d917d0175155",
            "uat": "83eb6e18-08fa-4b3c-a83d-f4af4397498b"
        }
    }, {
        "%.ciscolive.com": {
            "prod": "a1132643-ac67-4a0f-b609-b47f6a127a02",
            "uat": "47b35bcc-12c5-4ac1-bd18-653a5695e660"
        }
    }, {
        "%.appdynamics.com": {
            "prod": "5a1d4de3-0218-4afb-b874-a4c844e6f858",
            "uat": "7268f734-0ea9-41dc-a8e1-1238f4b57c8c"
        }
    }, {
        "%.meraki-go.com": {
            "prod": "92a8ccec-7f50-4725-9390-16544602d821",
            "uat": "493c90d9-32b3-4574-b07f-34198d16cf2a"
        }
    }, {
        "%.meraki.com": {
            "prod": "d9a28b5b-d617-4378-8b68-854e88c974fb",
            "uat": "a036ec80-9b6c-48fe-a2d5-b977becc0b31"
        }
    }, {
        "%.meraki.io": {
            "prod": "29864c6a-bdbf-45c3-b9d3-50b0504b5333",
            "uat": "14988c5c-5474-490d-80cf-a220796bb92b"
        }
    }, {
        "%.opendns.com": {
            "prod": "b20cb202-48c5-42c6-beb4-2a58aa4bc424",
            "uat": "623f8d69-d0a0-4d0e-9b3d-350bb42f5bda"
        }
    }, {
        "%.umbrella.com": {
            "prod": "b5501784-8158-49ab-a4c4-095fcee63872",
            "uat": "e149524c-9278-4472-be9f-7ff25dc156f0"
        }
    }, {
        "%.netacad.com": {
            "prod": "ca0e91c4-0869-4722-8809-bcd347258569",
            "uat": "40080155-b0eb-479a-8182-f9f504d4145d"
        }
    }, {
        "%duo.com": {
            "prod": "9e0aae48-2403-41a9-8a52-892faec23a4f",
            "uat": "caf6c3b1-c545-44f5-ba62-f015d675d056"
        }

    }, {
        "%.veh.events": {
            "prod": "8791247f-1193-47b7-99ac-8a32d59d9541",
            "uat": "68147324-85d8-4cc9-9978-a982d03d9aec"
        }
    
    }, {
        "%skillsforall.com": {
            "prod": "513057e7-39f2-4ff2-a522-ec53b098ca07",
            "uat": "8d5b0777-d3b3-42c8-9438-4038f4dff5f3"
        }
    }, {
        "%acacia-inc.com": {
            "prod": "22f9bf62-4326-47b8-b330-3ad28c183672",
            "uat": "2c9173e3-1119-420d-a863-abf9f526c2ba"
        }
    }, {
        "%services-exchange.com": {
            "prod": "09592896-043b-4127-a423-daca82ad2340",
            "uat": "f2bb4823-26f7-4a90-82fa-08c152a1f98e" 
        }
    }, {
        "%socio.events": {
            "prod": "e73f54c3-70bb-41d8-9fa0-ac1401651c9e",
            "uat": "be88cc61-7355-4f95-942a-b498502a16c4" 
        }
    }, {
        "%kennasecurity.com": {
            "prod": "426dc083-56ab-4334-b04d-12d3422700f6",
            "uat": "00d701f9-59ac-4a29-a79f-257ba80795e9" 
        }
    }, {
        "%netlify.app": {
            "prod": "0678beb7-48a5-4af6-afc2-cef7897f6801",
            "uat": "24001f7f-da35-4075-9128-e30d21381956" 
        }
    }, {
        "%portshift.io": {
            "prod": "bc9970a9-dace-4e83-9cb2-ab257dd25b0b",
            "uat": "bbaa7c02-ba1a-4daa-8f03-69b2309f4594" 
        }
    }, {
        "%involvio.com": {
            "prod": "ceff6719-b3d3-436c-8b63-63520d3cf1fe",
            "uat": "eb4bafa4-3e35-49ef-b9b5-ab4fc0abd8d4" 
        }
    }, {
        "%eticloud.io": {
            "prod": "2f08384f-c2f9-4fac-b791-25706c93a4ad",
            "uat": "dc97e650-0ef2-448b-805f-41bd04c708f9" 
        }
    }, {
        "%iroh.site": {
            "prod": "58082fd2-d428-49ab-9812-a2894a388319",
            "uat": "5293f575-90ec-4eff-91b6-f579e469685e" 
        }
    }, {
        "%netacad.cn": {
            "prod": "e10f29e3-1b17-4351-b202-a22d79684013",
            "uat": "4e557781-d26a-45a9-80ee-07f04aa1f1d2" 
        }
    }, {
        "%.webexone.com": {
            "prod": "6cc480f6-2843-467f-a24f-0eec75712106",
            "uat": "9bfe2bbb-718f-4829-b90f-09075f9b28b0" 
        }
    }, {
        "%multiplydiversity.com": {
            "prod": "16d640cb-a05c-482e-8d15-c8012409329c",
            "uat": "fb1aa549-98f8-4534-8e82-035f22351bb2" 
        }
    }, {
        "%calisti.app": {
            "prod": "7e1bbda0-ffdc-4dd3-9cfe-2edf585c698c",
            "uat": "fb1aa549-98f8-4534-8e82-035f22351bb2" 
        }
    }, {
        "%panoptica.app": {
            "prod": "ac2bd039-b682-44db-93f6-5bb5b016fb91",
            "uat": "9c9a82c7-42bf-4e98-b9df-ecd5950d60a8" 
        }
    },{
        "%imimobile.com": {
            "prod": "dbeb190c-c02e-45e4-92de-e7ef7b445312",
            "uat": "4daff8cc-ed0f-49e6-b3fb-cde252f2854d" 
        }
    },
    {
        "%vidcast.io": {
            "prod": "ee8660a6-39e8-4de2-b30c-1457258bc8aa",
            "uat": "d58fc830-d63e-4146-b3eb-4c3e96f47d5f" 
        }
    }
];
    const OTExcludeList = [
        "security.umbrella.com/cmd",
        "security.umbrella.com/lp=492",
        "security.umbrella.com/lp=495",
        "security.umbrella.com/lp=500"
    ];
    const OTIncludeList = [
        "www.cisco.com/", 
        "fdk-devint.cisco.com/", 
        "fdk-stage.cisco.com/",
        "engage2demand.cisco.com/",        
        "umbrella.cisco.com/",
        "meraki.cisco.com/",
        "www.meraki-go.com/",
        "community-staging.meraki.com/",
        "community.meraki.com/",
        "video.cisco.com/",
        "video-dev.cisco.com/",
        "video-backup.cisco.com/",
        "blogs-np.cisco.com/",
        "bcsroi.cisco.com/go/cisco/cxbcs", 
        "origin-webex-%.cisco.com/", //WebEx Configurations        
        "www-qa3-webex.cisco.com",
        "webex-cn-lt.cisco.com",
        "www.webex.com/",
        "www3.webex.com/",
        "cart-int.webex.com/",
        "cart.webex.com/",
        "help.webex.com/",
        "essentials.webex.com/",
        "purchase-int.webex.com",
        "purchase.webex.com",
        "origin-webex-stg.webex.com/",
        "blog-origin.webex.com/",
        "blog.webex.com/", //End of WebEx Configurations     
        "www.appdynamics.com/",
        "docs.appdynamics.com/",
        "brandstore.appdynamics.com/",
        "marketplace.appdynamics.com/",
        "accounts.appdynamics.com/",
        "www.ciscolive.com/",
        "worldofsolutions.ciscolive.com/",
        "www.opendns.com/",
        "security.umbrella.com/",
        "blogs.cisco.com/",
        "supportforums-dev2.cisco.com/",
        "social-tools-uat.cisco.com/home",
        "newsroom.cisco.com/",
        "community%.cisco.com/",
        "tools-dev.cisco.com/",
        "tools.cisco.com/",
        //"hardware.webex.com/",
        "partnersuccess.cisco.com/",
        "merakiresources.cisco.com/",
        "cdcsearch-stage.cisco.com",
        "search.cisco.com",
        "bst-stage.cloudapps.cisco.com/bugsearch/",
        "bst.cloudapps.cisco.com/",
        "bst.cisco.com/",
        "bst-stg.cisco.com/",
        "software-stage.cisco.com/",
        "software-stage2.cisco.com/",
        "software.cisco.com",
        "mycase1-stage.cloudapps.cisco.com/",
        "mycase.cloudapps.cisco.com",
        "mycase-beta.cloudapps.cisco.com",
        "cway.cisco.com",
        "quickview.cloudapps.cisco.com",
        "www-dev-cloud.cisco.com",
        "www-stage-cloud.cisco.com",
        "www-cloud.cisco.com",
        "dcloud-docs.cisco.com",
        "cxappcenter.cisco.com",
        "bazaar-stage.cisco.com",
        "ccrc.cisco.com",
        "ccwr-stg1.cisco.com",
        "webinars.cisco.com",
        "tmgmatrix-stage.cisco.com",
        "tmgmatrix.cisco.com",
        "mce-stage.cisco.com",
        "gni-test.netacad.com",
        "gni-test-lms.netacad.com",
        "rni-test.netacad.com",
        "rni-test-portal.netacad.com",
        "www.netacad.com",
        "lms.netacad.com",
        "cn.netacad.com",
        ".veh.events",
        "duo.com",
        "skillsforall.com",
        "qa.skillsforall.com",
        "cloudsecurity.cisco.com",
        "learn-cloudsecurity.cisco.com",
        "cloudsecurity-staging.marketops.umbrella.com",
        "hardware.webex.com",
        "admin.sse.itd.cisco.com",
        "admin.eu.sse.itd.cisco.com",
        "admin.apj.sse.itd.cisco.com",
        "devcd-portal.sse.itd.cisco.com",
        "stage-portal.sse.itd.cisco.com",
        "cigateway.cisco.com",
        "analystconnect.cisco.com",
        "analystconnect-admin.cisco.com",
        "copi.cisco.com",
        "dpi-%.cisco.com",
        "partnersummit.cisco.com",
        "partnersummit-stage.cisco.com",
        "trustportal-nprd.cisco.com",
        "learningnetwork.cisco.com",
        "abm.cisco.com",
        "review.lca.cisco.com",
        "review-%.lca.cisco.com",
        "owb%.cloudapps.cisco.com",
        "offer.cloudapps.cisco.com",
        "theacademy.cisco.com",
        "hybridworkerportal.cisco.com",
        "hwbp-%.cisco.com",
        "trustportal.cisco.com",
        "commerce.cisco.com",
        "commerce-test.cisco.com",
        "acacia-inc.com",
        "onetrust.acacia-inc.com",
        "gcab%.cisco.com",
        "ccw-cstg.cisco.com",
        "ccw-wstg.cisco.com",
        "eaccw-cstg.cisco.com",
        "eaccw-wstg.cisco.com",
        "eaccw.cloudapps.cisco.com",
        "cortn-cstg.cloudapps.cisco.com",
        "cortn-wstg.cloudapps.cisco.com",
        "cortn.cloudapps.cisco.com",
        "lpc-cstg.cisco.com",
        "lpc-wstg.cisco.com",
        "ccwr-stg3.cisco.com",
        "ccwr-stg1.cisco.com",
        "owb-cstg.cloudapps.cisco.com",
        "owb-wstg.cloudapps.cisco.com",
        "ccwdir-cstg.cloudapps.cisco.com",
        "ccwdir.cloudapps.cisco.com",
        "pwbng-cstg.cisco.com",
        "prpub.cloudapps.cisco.com",
        "pwbenchng.cloudapps.cisco.com",
        "purchase.cisco.com",
        "education.appdynamics.com",
        "university.appdynamics.com",
        "spokesperson%.cisco.com",
        "analystconnect%.cisco.com",
        "cll-courses%.cisco.com",
        "apps.cisco.com",
        "id.cisco.com",
        "salesconnect.cisco.com",
        "salesconnect.cloudapps.cisco.com",
        ".services-exchange.com",
        "insideradvocates.cisco.com",
        "%socio.events",
        "digitalshowcase.ciscolive.com",
        "www.kennasecurity.com",
        "kenna-staging.netlify.app",
        "jobs.cisco.com",
        "portshift.io",
        "www.involvio.com",
        "smm-docs.eticloud.io",
        "smm-docs.eticloud.io/",
        "security.test.iroh.site",
        "security.int.iroh.site",
        "apphub.webex.com",
        "developer.webex.com",
        "security.cisco.com",
        "netacad.cn",
        "portal.netacad.cn",
        "lms.netacad.cn",
        "postlogin-perf.netacad.cn",
        "prelogin-perf.netacad.cn",
        "lms-perf.netacad.cn",
        "ondemandelearning.cisco.com",
        "sales-comp%.cisco.com",
        "www.webexone.com/",
        "www.multiplydiversity.com",
        "preprod.multiplydiversity.com",
        "estore-newhire.cisco.com",
        "gsa%.cloudapps.cisco.com",
        "%panoptica.app",
        "%calisti.app",
        "watercooler%.cisco.com",
        "stage.webex.com",
        "signup%.webex.com",
        "imimobile.com",
        "techblog.cisco.com",
        "apps.meraki.io",
        "pepews.cisco.com",
        "support.umbrella.com",
        "fdk-dev.cisco.com",
        "www-idev-cloud.cisco.com",
        "fdk-pstage.cisco.com",
        "xpert%.cisco.com",
        "dcloud%.cisco.com",
        "%vidcast.io",
        "%-lite%.cisco.com"
        //"dev-acacia-inccom.pantheonsite.io",
        //"acacia-inc.com"
        //"signup.duo.com",
        //"community.duo.com",
        //"help.duo.com",
        //"guide.duo.com",
        
    ];

    const OTCSSIncludeList = [
        "essentials.webex.com",
        "social-tools-uat.cisco.com",
        "newsroom.cisco.com",
        "tools-dev.cisco.com",
        "tools.cisco.com",
    //    "hardware.webex.com",
        "blog.webex.com",
        "sales-comp.cisco.com",
        "sales-comp-dev.cisco.com"
    ];
    var getOTDataDomainConfig = function(url) {
        let dataDomainConfig = "";
        let loc = (typeof url == "undefined") ? window.location.href : url; // "http://www.cisco.com";
        loc = loc.toLowerCase();
        for (let i = 0; i < OTConfig.length; i++) {
            let f = Object.keys(OTConfig[i])[0];
            // check for data domain config before checking url
            if (OTConfig[i][f] !== "") {
                let pattern = f;
                pattern = pattern.replace(new RegExp("\\.", "g"), "\\."); //convert all "."s in url to non-special using escape char
                pattern = pattern.replace(new RegExp("%", "g"), ".*?"); //Replace the wildcard "%" with ".*?" to match anything including blank("")
                let re = new RegExp(pattern, "i");
                //console.log(re+ "created with"+pattern);
                if (re.test(loc)) {
                    dataDomainConfig = OTConfig[i][f]['prod']; //default map to Prod;
                    if(typeof localStorage ==="object" && typeof localStorage["OneTrustEnv"] !=="undefined"){
                        switch(localStorage["OneTrustEnv"]){
                            case "test":
                            dataDomainConfig = OTConfig[i][f]['prod']+"-test";
                            break;
                            case "uat":
                            dataDomainConfig = OTConfig[i][f]['uat'];
                            break;
                            case "uat-test":
                            dataDomainConfig = OTConfig[i][f]['uat']+"-test";
                            break;
                        }

                    }
                    //dataDomainConfig = (typeof localStorage ==="object" && localStorage["OneTrustEnv"] ==="test")? (OTConfig[i][f]+"-test"):OTConfig[i][f];
                    break; // only one config can be used per-match.
                }
            }
        }
        return dataDomainConfig;
    };
    /**
        Utility for current URL match for the given array of URL patterns
        ## signature ##   isUrlPatternMatch(url,patternArr)
        @param args : 
        url --> current url
        patternArr --> list of patterns to which current url need to be matched
    **/
    var isUrlPatternMatch =function (url,patternArr){
        var url = url || document.URL;        
        for (var i = 0; i < patternArr.length; i++) {
            var pattern = patternArr[i];
            pattern = pattern.replace(new RegExp("\\.", "g"), "\\."); //convert all "."s in url to non-special using escape char
            pattern = pattern.replace(new RegExp("%", "g"), ".*?"); //Replace the wildcard "%" with ".*?" to match anything including blank("")
            var re = new RegExp(pattern, "i");
            //console.log(re+ "created with"+pattern);
            if (re.test(url)) {
                //console.log(url+" matched to: "+re);
                return true;
            }
        }
        return false

    };
    /**
        Cookie reading and writing utility copied implemenation from 'cdc.cookie.js'
        sets a cookie. days and msecs are days and milliceconds from now,
        respectively. if neither days or msecs are given, defaults to
        expire at end of browser session.
        @param args {
            cookieName: string
            cookieValue: string
            days: int (optional)
            msecs: int (optional, overrides days)
            path: string (optional) (default=/)
            domain: string (optional)
        }
        */
    var setCookie = function(args) {
        // LEGACY - support old signature (string, string[, int])
        if (!args.cookieName) {
            args = {
                cookieName: args,
                cookieValue: arguments[1]
            };
            if (arguments.length > 2) {
                args.days = arguments[2];
            }
        }

        var expireStr = '';
        var pathStr = '';
        var domainStr = '';
        var msecs = parseInt(args.msecs);
        if (isNaN(msecs) && args.days) {
            msecs = args.days * 24 * 60 * 60 * 1000;
        }

        if (!isNaN(msecs)) {
            var ex = new Date();
            ex.setTime(ex.getTime() + msecs);
            expireStr = "; expires=" + ex.toUTCString();
        }
        if (args.path) {
            pathStr = "; path=" + args.path + ";";
        } else {
            pathStr = "; path=/;";
        }
        if (args.domain) {
            domainStr = "; domain=" + args.domain;
        }
        try {
            document.cookie = args.cookieName + "=" + escape(args.cookieValue) + expireStr + pathStr + domainStr;
        } catch (e) {
            return false;
        }
        return true;
    };
    /**
    gets requested cookie.
    @param args { cookieName: string }
    */
    var getCookie = function(args) {
        // LEGACY - if args is a string and not an object
        if (!args.cookieName) {
            args = {
                cookieName: args
            };
        }

        var dict = unpackParamString(document.cookie, /\s*;\s*/);
        return dict[args.cookieName] || "";
    };
    /**
    deletes requested cookie.
    args are identical to setCookie, except that expiry is forced
    to a negative number, effectively deleting the cookie.
    */
    var deleteCookie = function(args) {
        // mutating args obj might mess things up
        // if caller reuses it for other things
        var dArgs = {},
            name;
        for (name in args) {
            if (args.hasOwnProperty(name)) {
                dArgs[name] = args[name];
            }
        }
        dArgs.msecs = dArgs.days = -1;
        dArgs.cookieValue = '';
        return setCookie(dArgs);
    };
    /**
    takes a dictionary, returns a string
    e.g. {"foo":"bar","foo 2":"bar 2"} => "foo=bar&foo%202=bar%202"
    @param sep optional separator, defaults to "&" 
    */
    var packParamString = function(dict, sep) {
        sep = sep || '&';
        var frags = [],
            name;
        for (name in dict) {
            if (!dict.hasOwnProperty(name)) {
                continue;
            }
            frags.push(escape(name) + '=' + escape(dict[name]));
        }
        return frags.join(sep);
    };
    /**
    takes a string, returns a dictionary
    e.g. "foo=bar&foo%202=bar%202" => {"foo":"bar","foo 2":"bar 2"}
    @param sep optional separator, defaults to "&" (can be string or regexp)
    */
    var unpackParamString = function(str, sep) {
        sep = sep || '&';
        var frags = str.split(sep),
            dict = {},
            frag,
            ioe,
            name,
            val,
            i;
        for (i = 0; i < frags.length && (frag = frags[i]); i++) {
            ioe = frag.indexOf('='); // expecting "foo=bar"
            if (ioe < 0) {
                continue;
            }
            name = unescape(frag.substring(0, ioe));
            val = unescape(frag.substring(ioe + 1));
            dict[name] = val;
        }
        return dict;
    };
    // Function returns Performance flag
    var getPerformanceFlag = function() {
        var optCk = getCookie("OptanonConsent");
        var patternPerf = /(\=|\,)[2]\:[0]/g;
        if (optCk != "" && patternPerf.test(optCk)) {
            return "false";
        }
        return "true";
    };
    // Function returns Targeting flag
    var getTargetingFlag = function() {
        var optCk = getCookie("OptanonConsent");
        var patternTgt = /(\=|\,)[4]\:[0]/g;
        if (optCk != "" && patternTgt.test(optCk)) {
            return "false";
        }
        return "true";
    };
    //Function to validate subsequent visit
    var isOneTrustLoadedPrior = function() {
        var patternGroups = /\&groups\=/g;
        var optCk = getCookie("OptanonConsent");
        if ((getCookie("OptanonAlertBoxClosed") !== "") || ( optCk!== "" && patternGroups.test(optCk))) {
            return "true";
        }
        return "false";
    };
    //Function to check if OT cookie available to read
    var isOTCookieAvailable = function() {
        if ((eventqueue.length > 0) || (isOneTrustLoadedPrior()==="true")) {
            return true;
        }
        return false;
    }
    // Flag to detect users first visit
    const isFirstVisit = (function() {
        consoleLog("isOneTrustLoadedPrior: "+isOneTrustLoadedPrior());
        var flag = (isOneTrustLoadedPrior() === "false") ? true : false;
        return flag;
    })();

    // Function to check, whether current URL is a Privacy page or not
    const isPrivacyPage = (function(url) {
        var url = url || document.URL;
        var privUrls = ["www.cisco.com/c/en/us/about/legal/privacy-full.html"];
        return isUrlPatternMatch(url,privUrls);        
    })();
    //Function to detect, whether Tealium Consent is shown earlier
    /*
    //US#462422: Decommission Tealium Consent Across all Profiles 
    var isTealiumConsentLoaded = function() {
        var value = "; " + document.cookie;
        var parts = value.split("; CONSENTMGR=");
        if (parts.length == 2) {
            return true;
        }
        return false;
    };*/
    var isEU = function(cCode) {
        var euCountryList = {            
            "AT":"Austria",
            "BE":"Belgium",
            "BG":"Bulgaria",
            "HR":"Croatia",
            "CY":"Cyprus",
            "CZ":"Czech Republic",
            "DK":"Denmark",
            "EE":"Estonia",
            "FI":"Finland",
            "FR":"France",
            "DE":"Germany",
            "GR":"Greece",
            "HU":"Hungary",
            "IE":"Ireland",
            "IS":"Iceland",
            "IT":"Italy",
            "LV":"Latvia",
            "LI":"Liechtenstein",
            "LT":"Lithuania",
            "LU":"Luxembourg",
            "MA":"Malta",
            "NL":"Netherlands",
            "NO":"Norway",
            "PL":"Poland",
            "PT":"Portugal",
            "RO":"Romania",
            "SK":"Slovakia",
            "SI":"Slovenia",
            "ES":"Spain",
            "SE":"Sweden",
            "CH":"Switzerland",
            "TR":"Turkey",
            "UK":"United Kingdom",
            "GB":"England",
            "CN":"China", // Added CN temporarily to stop targeter from loading in China
            "JP":"Japan",
            "VN":"Vietnam"
        };
        var geoLocObj= (typeof Optanon ==="object" && typeof Optanon.getGeolocationData ==="function")?Optanon.getGeolocationData():null;
        var cCode = cCode || (geoLocObj !==null)?geoLocObj["country"]:"" ;
        if(cCode in euCountryList){
            return true;
        }else{
            return false;
        }
    };
    // Function to check, whether OT is enabled for given URL
    var isOTEnabled = function(url) {
        var url = url || document.URL;
        //var otUrls = [".cisco.com/c/en/us/solutions/enterprise-networks/sd-wan/index.html", ".cisco.com/c/en/us/products/products-sanity-test/palkesh/index.html"];
        var otUrls = OTIncludeList;
        var otExclUrls = OTExcludeList;
        //if((!isUrlPatternMatch(url,otExclUrls)) && isUrlPatternMatch(url,otUrls) && (!isTealiumConsentLoaded())){
        if((!isUrlPatternMatch(url,otExclUrls)) && isUrlPatternMatch(url,otUrls)){
            return true;
        }        
        //console.log("OT not enabled...");
        return false
    };  

    //Checks to see if domain needs css stylesheet to override subdomain styling
    const isOTCSSOverride = (function() {
        var urls = OTCSSIncludeList;
        var currentDomain = document.location.host;
        for(var i = 0; i < urls.length; i++) {
            if (currentDomain == urls[i]) {
                return true;
                consoleLog("isOTCSS");
            }
        }
        return false;
    })();
    
    //adds css stylesheet to override styling from the subdomain
    function addOTCSSOverride(domain) {
        var csspath = "https://www.cisco.com/c/dam/cdc/t/ot/css/";
        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        //modifies domain name to match naming convention in dam assets (eg: blog.webex.com --> blog-webex-com)
        const filename = domain.toString().replace(/\./g,"-");
        link.href = csspath + filename + ".css";
        link.media = 'all';
        head.appendChild(link);
        consoleLog("### OT CSS Override added ###" +link.href);
    }


    // function to initiate One Trust Service
    var loadOnetrust = function(url) {
        var headTag = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        let ddScriptConfig = getOTDataDomainConfig();
        consoleLog("data-domain-script: "+ddScriptConfig);
        script.setAttribute("data-domain-script", ddScriptConfig);
        script.type = "text/javascript";
        script.src = "https://cdn.cookielaw.org/scripttemplates/otSDKStub.js";
        script.async = true;
        headTag.appendChild(script);
    };
    // initialize GDPR
    var init = function() {
        try {
            consoleLog("Initiating GDPR");
            //Load OneTrust Script
            if (isOTEnabled(document.URL)) {
                consoleLog("### Loading One Trust ####");
                if (isOTCSSOverride) {
                    addOTCSSOverride(document.location.host);
                }
                loadOnetrust();
            } else {
                consoleLog("OneTrust not enabled on this page!");
            }
        } catch (e) {
            console.log("ctm-core initiation error:", e);
        }
    };

    //initiate Tealium Call Back Function will be overridden in ctm.js
    var initiateTealium = function(obj) {
        eventqueue.push(obj);
    };
    // initiate Adobe Targeter Call Back Function will be overridden in pzn-init.js
    var initiatePznLib = function(obj) {
        eventqueue.push(obj);
    };
    return {
        isFirstVisit: isFirstVisit,
        isPrivacyPage:isPrivacyPage,
        isEU:isEU,
        owCount: owCount,
        init: init,
        isOTEnabled: isOTEnabled,
        //isTealiumConsentLoaded: isTealiumConsentLoaded,
        eventqueue: eventqueue,
        getPerformanceFlag: getPerformanceFlag,
        getTargetingFlag: getTargetingFlag,
        isOneTrustLoadedPrior: isOneTrustLoadedPrior,
        isOTCookieAvailable: isOTCookieAvailable,
        initiateTealium: initiateTealium,
        initiatePznLib:initiatePznLib,
        consoleLog:consoleLog,
        gdprLogQueue:gdprLogQueue
    }
})();
// End of gdpr function
//Call back function triggered by OT
function OptanonWrapper() {
    //window.dataLayer.push({ event: 'OneTrustGroupsUpdated' }) ;
    try {
        ctm.gdpr.consoleLog("OptanonWrapper called: "+ctm.gdpr.owCount);
        if (ctm.gdpr.owCount === 0) {
            var acceptBtn = document.querySelector("#onetrust-accept-btn-handler");
            var allowAllBtn = document.querySelector("#accept-recommended-btn-handler");
            //var saveBtn = document.querySelector("button[aria-label='Save Settings']");
            var saveBtn = document.querySelector("button.save-preference-btn-handler");
            var isEU = ctm.gdpr.isEU().toString();
            ctm.gdpr.consoleLog("EU: "+isEU);
            //Binding Consent Manger to 'Cookies' link in Footer and Footer Web Component
            //CWPC-19456 : Cookie Link integration to OT Consent Manager for new CDC Footer Template
            if (typeof cdc !== " undefined" && typeof cdc.elements !== "undefined" && typeof cdc.elements.footer !== "undefined" && typeof cdc.elements.footer.self !== "undefined") {
                var footer = cdc.elements.footer.self;
            }
            var ftCkLink = ((typeof footer !== "undefined") && footer.querySelector('#privacy-manager')) || document.querySelector("footer #privacy-manager") || (document.querySelector('cdc-footer') && document.querySelector('cdc-footer').renderRoot && document.querySelector('cdc-footer').renderRoot.querySelector('#privacy-manager'));
            if (typeof ftCkLink !== "undefined" && ftCkLink !== null && ftCkLink.tagName === "A") {
                if (ftCkLink.hasAttribute("data-config-metrics-group") && (ftCkLink.getAttribute("data-config-metrics-group").toLowerCase() === "footer")) {
                    ftCkLink.setAttribute("data-config-metrics-title", "Consent Preferences - Footer");
                    ftCkLink.addEventListener("click", function(evt) {
                        if ((typeof Optanon !== "undefined") && (typeof Optanon.ToggleInfoDisplay === "function")) {
                            Optanon.ToggleInfoDisplay();
                        }
                    });
                }

            }
            //End of Cookies link in Footer
            
            if(ctm.gdpr.isEU()) {//only for EU
                //Dispatching Custom Event, so that associate event handlers can be configured for tags loading outside Tealium
                 var evBtn = new CustomEvent("OTEuButton", {
                    detail: {
                        OTEuButton: true
                    }
                });
                window.dispatchEvent(evBtn);
                //Binding Event Handler to accept button EU
                if (typeof acceptBtn !== "undefined" && acceptBtn !==null) {
                    acceptBtn.addEventListener("click", function() {
                        ctm.gdpr.initiateTealium({
                            "event": "OTAcceptBtn"
                        });
                    });
                }
                // Binding event handler for Save Settings button (Consent Manager) only for EU
                if (typeof saveBtn !== "undefined" && saveBtn !== null) {
                    saveBtn.addEventListener("click", function() {
                        ctm.gdpr.initiateTealium({
                            "event": "OTSaveBtn"
                        });
                    });
                }
                //Binding event handler for Allow All button (Consent Manager) only for EU
                if (typeof allowAllBtn !== "undefined" && allowAllBtn !== null) {
                    allowAllBtn.addEventListener("click", function() {
                        ctm.gdpr.initiateTealium({
                            "event": "OTAllowAllBtn"
                        });
                    });
                }
            } else{ // Non-EU
                try{
                    //For 'X' Icon on the Consent Banner (US519162)
                    var cbCloseIcon=document.querySelector("#onetrust-close-btn-container .ot-close-icon");
                    var cbCloseIconDataAttr ={
                        "data-config-metrics-group":"non-eu consent banner", //lpos
                        "data-config-metrics-title":"consent banner close icon",//lid
                        "data-config-metrics-item":"close the consent banner" // linktext
                    };
                    if (typeof cbCloseIcon !== "undefined" && cbCloseIcon !== null) {
                        for (const key in cbCloseIconDataAttr) {
                            if (cbCloseIconDataAttr.hasOwnProperty(key)){
                               cbCloseIcon.setAttribute(key,cbCloseIconDataAttr[key]); 
                           }                            
                        }
                    }
                    //For 'X' Icon on the Consent Manager
                    var cmCloseIcon=document.querySelector("div[aria-label='Consent Manager'] button.ot-close-icon");
                    var cmCloseIconDataAttr ={
                        "data-config-metrics-group":"consent manager window", //lpos
                        "data-config-metrics-title":"consent manager close icon",//lid
                        "data-config-metrics-item":"close the consent manager" // linktext
                    };
                    if (typeof cmCloseIcon !== "undefined" && cmCloseIcon !== null) {
                        for (const key in cmCloseIconDataAttr) {
                            if (cmCloseIconDataAttr.hasOwnProperty(key)){
                               cmCloseIcon.setAttribute(key,cmCloseIconDataAttr[key]); 
                           }                            
                        }
                    }

                } catch(e){
                    console.log("exception in adding metrics attributes to close icon");
                }

            }
            /**
            * Scenario 1:This function is executed with overridden definition in util/utagLoader.js, if this OT callback happens post ctm.js
            * Scenario 2: This function is executed with definition to push event obj to array, if OT callback happens before ctm.js
            **/
            if (ctm.gdpr.isFirstVisit) {
                ctm.gdpr.consoleLog("### First Visit ####");
                //Code to dispatch OTFirstVist Custom Event
                var ev = new CustomEvent("OTFirstVisit", {
                    detail: {
                        OTFirstVisit: true
                    }
                });
                window.dispatchEvent(ev);
                ctm.gdpr.isFirstVisitEventTriggered = true;
                //end of code for custom event
                ctm.gdpr.initiatePznLib({
                    "event": "PznInitialLoad",
                    "isEU":isEU
                });
                ctm.gdpr.initiateTealium({
                    "event": "OTInitialLoad"
                });                
            }
            
        }
        // Counter to signify first OT load
        ctm.gdpr.owCount++;
    } catch (e) {
        console.log("exception in OptanonWrapper function", e);
    }
}

// Initialize GDPR
ctm.gdpr.init();
