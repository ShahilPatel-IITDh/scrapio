/* Init */

var prmOm = {};
if (typeof kaspersky != 'object') var kaspersky = {};

/* TODO MANUALLY SET THESE DEFAULTS */

prmOm.defaultPlatformName = 'NextGen';
prmOm.sCodeName = 's_code_single_suite.js';

/* SAME CODE BELOW THIS LINE */

prmOm.sCodeVersion = '20230522';
prmOm.sCodeBuild = '307';

/* prmOm settings */

if (/^www\.kaspersky\.(cz|ua|gr|ro|hu|rs|bg)$/i.test(document.location.hostname)) prmOm.defaultPlatformName = 'Avangate Websites';
prmOm.isStaging = (kaspersky.isStaging === 0 || kaspersky.isStaging === "0" || kaspersky.testmode === 0 || kaspersky.testmode === "0") ? prmOm.isStaging = 0 : prmOm.isStaging = 1;
prmOm.pageCharset = kaspersky.pageCharset || kaspersky.pagecharset || 'UTF-8';
prmOm.platformName = kaspersky.platformName || prmOm.defaultPlatformName;
// Why do we not track Micro Sites?
//if (kaspersky.platformName == 'Micro Site') kaspersky.trackPageViewOnLoad = 0;

var omPlatformsSettings = {
	'NextGen': 'ng',
	'corpSites': 'ng',
	'CorpSites': 'ng',
	'Landing Pages': 'ng',
	'Avangate Websites': 'aw',
	'Digital River': 'dr',
	'Avangate': 'av',
	'Nexway': 'nw',
	'Cleverbridge': 'cb',
	'Element5': 'ef',
	'Allsoft': 'as',
	'Partner Portal': 'pp',
	'Avangate Partner Control Panel': 'ap',
	'Kaspersky Daily Blog': 'bl',
	'Kaspersky Motorsport': 'ms',
	'Earth 2050': 'ea',
	'OldGen': 'og',
	'OldGen Proxied': 'po',
	'Micro Site': 'mi',
	'Press Center': 'pc',
	'Marketo': 'ma',
	'Kaba365': 'kb',
	'Cloud': 'ng',
	'Other': 'ot'
};

if (prmOm.platformName == 'NextGen' || prmOm.platformName == 'corpSites'  || prmOm.platformName == 'CorpSites') {
	prmOm.siteClass = 'Websites';
} else if (prmOm.platformName == 'Landing Pages') {
	prmOm.siteClass = 'Landing Pages';
} else if (prmOm.platformName == 'Avangate Websites') {
	prmOm.siteClass = 'Websites';
} else if (prmOm.platformName == 'Digital River') {
	prmOm.isECommProvider = true;
	prmOm.eCommProviderChars = 'DR';
	prmOm.eCommProvider = 'Digital River';
	prmOm.siteClass = 'Shopping Cart';
} else if (prmOm.platformName == 'Avangate') {
	prmOm.isECommProvider = true;
	prmOm.eCommProviderChars = 'AV';
	prmOm.eCommProvider = 'Avangate';
	prmOm.siteClass = 'Shopping Cart';
} else if (prmOm.platformName == 'Nexway') {
	prmOm.isECommProvider = true;
	prmOm.eCommProviderChars = 'NW';
	prmOm.eCommProvider = 'Nexway';
	prmOm.siteClass = 'Shopping Cart';
} else if (prmOm.platformName == 'Cleverbridge') {
	prmOm.isECommProvider = true;
	prmOm.eCommProviderChars = 'CB';
	prmOm.eCommProvider = 'Cleverbridge';
	prmOm.siteClass = 'Shopping Cart';
} else if (prmOm.platformName == 'Element5') {
	prmOm.isECommProvider = true;
	prmOm.eCommProviderChars = 'EF';
	prmOm.eCommProvider = 'Element5';
	prmOm.siteClass = 'Shopping Cart';
} else if (prmOm.platformName == 'Allsoft') {
	prmOm.isECommProvider = true;
	prmOm.eCommProviderChars = 'AS';
	prmOm.eCommProvider = 'Allsoft';
	prmOm.siteClass = 'Shopping Cart';
} else if (prmOm.platformName == 'Partner Portal') {
	prmOm.siteClass = 'Partner Portal';
} else if (prmOm.platformName == 'Avangate Partner Control Panel') {
	prmOm.isECommProvider = true;
	prmOm.eCommProviderChars = 'AP';
	prmOm.eCommProvider = 'Avangate Partner Control Panel';
	prmOm.siteClass = 'Avangate Partner Control Panel';
} else if (prmOm.platformName == 'Kaspersky Daily Blog') {
	prmOm.siteClass = prmOm.platformName;
} else if (prmOm.platformName == 'Kaspersky Motorsport') {
	prmOm.siteClass = prmOm.platformName;
	prmOm.siteRegexp = /kms\.racing|kasperskymotorsport\.com/i;
} else if (prmOm.platformName == 'Earth 2050') {
	prmOm.siteClass = prmOm.platformName;
	prmOm.siteRegexp = /2050\.earth/i;
	prmOm.siteRegion = '[N/A]';
} else if (prmOm.platformName == 'OldGen') {
	prmOm.siteClass = kaspersky.siteClass || 'Websites';
} else if (prmOm.platformName == 'OldGen Proxied') {
	prmOm.siteClass = kaspersky.siteClass || 'Websites';
} else if (prmOm.platformName == 'Micro Site') {
	prmOm.siteClass = kaspersky.siteClass || 'Micro Sites';
} else if (prmOm.platformName == 'Press Center') {
	prmOm.siteClass = kaspersky.siteClass || 'Press Center';
} else if (prmOm.platformName == 'Marketo') {
	prmOm.siteClass = kaspersky.siteClass || 'Marketo';
} else if (prmOm.platformName == 'Kaba365') {
	prmOm.siteClass = kaspersky.siteClass || 'Kaba365';
} else if (prmOm.platformName == 'Cloud') {
	prmOm.siteClass = kaspersky.siteClass || 'Kes Cloud';
} else if (prmOm.platformName == 'Default') {
	prmOm.siteClass = kaspersky.siteClass || 'Other';
} else {
	prmOm.pn = ''; // Traffic will be dropped completely for unknown platform
}
// redefining siteClass by Page Path
if (document.location.pathname.toLowerCase().indexOf('/lp/') != -1 || document.location.pathname.toLowerCase().indexOf('/acq/') != -1) {
    prmOm.siteClass = 'Landing Pages';
}
prmOm.isECommProvider = prmOm.isECommProvider || false;
prmOm.eCommProviderChars = prmOm.eCommProviderChars || 'XX';
prmOm.eCommProvider = prmOm.eCommProvider || '[NULL]';
prmOm.pn = omPlatformsSettings[prmOm.platformName] || '';
prmOm.trackPageViewOnLoadCalled = prmOm.trackPageViewOnLoadCalled || false; 

if (prmOm.pn == '') {
	prmOm.sAccountLive = 'kaspersky-single-suite';
	prmOm.sAccountStaging = 'kaspersky-single-suite-dev';
} else if (prmOm.pn != 'pp' && prmOm.pn != 'ap') {
	if (prmOm.pn != 'ea' && prmOm.pn != 'ms') {
		prmOm.siteRegexp = /kaspersky|mysecuritycloud|securelist|digitalriver|klstore|kas\.pr|klamericas\.secure\.footprint\.net|secure\.avangate\.com|secure\.element5\.com|ccc\.element5\.com|esd\.element5\.com|klcolombia\.nexway\.com|bnlitaly\.nexway\.com|shop\.allsoft\.ru|kaba365\.com|kl-racing\.com|klracing\.co\.za/i;
	}
	prmOm.downloadRegexp = /.+\.kaspersky-labs\.com|klamericas\.secure\.footprint\.net|media\.kaspersky\.com|(download|lm)\.kaba365\.com|data\.kaspersky\.co\.jp|(^|lim|(pdc[1-6]\.(fra5|trt|pa2)))(\.)?pdc\.kaspersky\.com/i;
	prmOm.downloadHrefRegexp = /^(https?:\/\/(go|usa)\.kaspersky\.com\/files\/.+)|(https?:\/\/advanced\.kaspersky\.ru\/files\/.+)|(^|lim|(pdc[1-6]\.(fra5|trt|pa2)))(\.)?pdc\.kaspersky\.com/i;
	prmOm.saleButtonRegexp = /^(https?:\/\/((((((store\.kaspersky\.([^\/]+))|(gc\.digitalriver\.com)|(home\.kaspersky\.co\.jp))\/store\/kasper.+\/buy\/.+)|((store|secure|carrello)\.([a-z]{2,3}\.)?(kaspersky|avangate|2checkout)\.([^\/]+)\/order\/checkout\.php\?(.+\&))|(carrello\.kaspersky\.[a-z]{2}\/order\/trial\.php))\?PRODS(\[[^]]+\]|\d*)\=.+)|((boutique|eloja|store|tienda)(-ipp)?.kaspersky.([^\/]+)\/qte(_mvt)?.html\?(.+\&)?R\=.+)|(allsoft\.kaspersky\.[a-z]{2}\/basket\/add\/.+)|(softkey\.kaspersky\.[a-z]{2}\/\?(.+\&)?prodid\=.+)|((esd|secure)\.element5\.com\/(esales\/)?cart\.html\?(.+\&)?PRODUCT(\[|%5b)[^]]+(\]|%5d)\=.+)|(order\.shareit\.com\/cart\/add\?(.+\&)?PRODUCT\[[^]]+\]\=.+)|(kasperskystore\.pl\/addtocart\?(.+\&)?sku\=.+)))|(\/_svc\/price\.svc\/..-..\/route\.axd\?d\=.+)|(kaba365\.com\/mod\/(buy|cart)\.asp\?(parID|act)\=.+)|(\/mod\/(buy|cart)\.asp\?(parID|act)\=.+)|(kasperskyestore\.co\.kr\/mall\/products\/.+)|((shop|cart)\.kaspersky\.(.*))|(shop\.(usa|sea|me|africa|afrique)\.kaspersky\.com)|((shop-lt|shop-mx).latam.kaspersky.com)|(shop\.xtraining\.kaspersky\.(.*)|(store\.kaspersky\.(.*)))/i;
	prmOm.scRegexp = /(store|boutique|tienda|eloja)\.kaspersky\.com?\..{2}|(store|boutique|tienda|eloja)\.kaspersky\..{2,3}|(store|boutique|tienda|eloja)(-ipp)?\.[a-z]{2,3}\.kaspersky\.com|secure\.avangate\.com|store\.digitalriver\.com|gc\.digitalriver\.com|secure\.element5\.com|ccc\.element5\.com|esd\.element5\.com|kaspersky\.nexway\.ch|klcolombia\.nexway\.com|bnlitaly\.nexway\.com|kaspersky\.softk\.kz|kaspersky\.softkey\.ru|kaspersky\.softkey\.ua|kaspersky\.allsoft\.ru|shop\.allsoft\.ru|sh\.kaba365\.com|passport\.pcstars\.com|kasperskyestore\.co\.kr|shop\.kaspersky\.([^\/]+)/i;
	if (kaspersky.ipp == 1 || kaspersky.sectiontype == 'IPP' || kaspersky.sectionType == 'IPP' || kaspersky.sectiontype == 'ipp' || kaspersky.sectionType == 'ipp'){ // Legacy
		prmOm.siteType = 'IPP';
	} else if (kaspersky.theme == '29825400' || kaspersky.theme == '30272800' || kaspersky.sectiontype == 'mobile') {
		prmOm.siteType = 'Mobile';
	} else if (kaspersky.section == 'IFrame') {
		prmOm.siteType = 'IFrame';
	} else {
		prmOm.siteType = kaspersky.siteType || kaspersky.sitetype || 'Default';
	}
	prmOm.sAccountLive = 'kaspersky-single-suite';
	prmOm.sAccountStaging = 'kaspersky-single-suite-dev';
} else if (prmOm.pn == 'pp' || prmOm.pn == 'ap') {
	prmOm.downloadRegexp = /.{10000}/i;
	prmOm.downloadHrefRegexp = /.{10000}/i;
	prmOm.siteRegexp = /kasperskyhub\.com|kaspersky-partners\.ru|kasperskypartner\.de|kasperskypartners\.eu|portal\.kasperskyamericas\.com|kaspersky\.portal\.relayware\.com|kasperskypartners\.com|kasperskypartners\.ru|empartner\.kaspersky\.com|kasperskylab\.portal\.relayware\.com|secure\.avangate\.com/i;
	prmOm.siteType = 'Default';
	prmOm.saleButtonRegexp = /.{10000}/i;
	prmOm.scRegexp = /secure\.avangate\.com/i;
	prmOm.sAccountLive = 'kaspersky-single-suite,kaspersky-partnerportal';
	prmOm.sAccountStaging = 'kaspersky-single-suite-dev';
} else {
	prmOm.sAccountLive = 'kaspersky-single-suite';
	prmOm.sAccountStaging = 'kaspersky-single-suite-dev';
}

prmOm.storeRegexp = /app\.appsflyer\.com|itunes\.apple\.com|play\.google\.com|go\.onelink\.me|windowsphone\.com|softonic\.com/i;
prmOm.stagingRegexp = /master-|staging|developer([-\d])|drhadmin|hqcms|stg-|drh-|msk\d-|fr\d-|tridi|appdev|ws\.us|upaldev|stage\.|stage-|legacy-|\.kaspersky-labs\.com|\.drextenv\.net|\inactive\.digit|dev-|gc2-/i;

prmOm.cookieDomain = omChooseCookieDomain();
prmOm.cookieDomainPeriods = prmOm.cookieDomain.split('.').length - 1;

prmOm.prevUrl = omGetQueryParam('maxymiserref') || document.location.href.toLowerCase();

if (((typeof kaspersky.isStaging == 'undefined' && typeof kaspersky.testmode == 'undefined') || ((typeof kaspersky.isStaging != 'undefined' || typeof kaspersky.testmode != 'undefined') && prmOm.isStaging == 0) || (typeof kaspersky.hotfixLrcProxy != 'undefined' && kaspersky.hotfixLrcProxy == 1)) && document.location.hostname && document.location.hostname.search(prmOm.stagingRegexp) == -1) {
	prmOm.account = prmOm.sAccountLive; // TODO Safe condition
} else {
	prmOm.account = prmOm.sAccountStaging;
}

prmOm.formsInitialized = ':';
prmOm.paymentErrorFunctionCount = 0;
prmOm.isWindowLoaded = false;
prmOm.isTrackPageViewCalled = false;

// property to check current url is kaspersky web-dev site
prmOm.webdevSites = /(www|usa|latam|africa|me|me-en|free|kaspersky)\.kaspersky\.(com.(tr|au|br|cn))|com$|ru|de|fr|it|es|nl|be|se|dk|no|fi|(co\.(za|jp|in|uk))/i;

// gtm S2S mapping
prmOm.hostToS2Sgtm = {
	".kaspersky.com": "sgtm.kaspersky.com",
	".kaspersky.com.au": "sgtm.kaspersky.com.au",
        ".kaspersky.es": "sgtm.kaspersky.es",
	".kaspersky.co.jp": "sgtm.kaspersky.co.jp",
	".kaspersky.co.uk": "sgtm.kaspersky.co.uk",
	".kaspersky.de": "sgtm.kaspersky.de",
	".kaspersky.com.br": "sgtm.kaspersky.com.br",
	".kaspersky.fr": "sgtm.kaspersky.fr",
	".kaspersky.it": "sgtm.kaspersky.it",
	".kaspersky.ru": "sgtm.kaspersky.ru",
	".kaspersky.com.tr": "sgtm.kaspersky.com.tr",
	".kaspersky.co.za": "sgtm.kaspersky.co.za",
	".kaspersky.nl": "sgtm.kaspersky.nl",
	".kaspersky.ca": "sgtm.kaspersky.ca",
	".kaspersky.pt": "sgtm.kaspersky.pt",
	".kaspersky.se": "sgtm.kaspersky.se"
}

prmOm.hostToCNAME = {
        ".kaspersky.com": "otr.kaspersky.com", 
        ".kaspersky.es": "otr.kaspersky.es",
	".kaspersky.com.au": "otr.kaspersky.com.au",
	".kaspersky.com.br": "otr.kaspersky.com.br",
	".kaspersky.de": "otr.kaspersky.de",
	".kaspersky.fr": "otr.kaspersky.fr",
	".kaspersky.it": "otr.kaspersky.it",
	".kaspersky.co.jp": "otr.kaspersky.co.jp",
	".kaspersky.co.uk": "otr.kaspersky.co.uk",
        ".kaspersky.com.tr": "otr.kaspersky.com.tr",
        ".kaspersky.co.za": "otr.kaspersky.co.za",
        ".kaspersky.nl": "otr.kaspersky.nl",
        ".kaspersky.ca": "otr.kaspersky.ca",
        ".kaspersky.pt": "otr.kaspersky.pt", 
        ".kaspersky.se": "otr.kaspersky.se"
}

// trackingServer
if (prmOm.cookieDomain in prmOm.hostToCNAME) {
    prmOm.trackingServer = prmOm.hostToCNAME[prmOm.cookieDomain];
    prmOm.trackingServerSecure = prmOm.hostToCNAME[prmOm.cookieDomain];
} else {
    prmOm.trackingServer = 'kaspersky.d3.sc.omtrdc.net';
    prmOm.trackingServerSecure = 'kaspersky.d3.sc.omtrdc.net';
}

// erros log
prmOm.errorsLog = "[NULL]";

/* Legacy Tracking */
function trackKLReferrer() {}
function trackTrialSubmit() {}
function trackFraud() {}
function getFilename(url) {}
function trackFile() {}
function trackTrial() {}
function trackTrialKMS() {}
function trackPU() {}
function trackPU2() {}
function trackDoc() {}
function trackBeta() {}
function trackDBUpdate() {}
function trackDRFile() {}
function trackLink() {}
function trackCountrySelector() {}
function trackLRC() {}

function trackIPP(screen) {
	var tmpOm = {};
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackIPP', ' > ', 0);
	trackPage(screen);
}

function trackPage(screen) {
	var tmpOm = {};
	var tmppagename;
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackPage', ' > ', 0);
	tmppagename = kaspersky.pages[screen] ? kaspersky.pages[screen] : screen;
	trackPageView(tmppagename);
}

// LRC Fallback Verdict
function trackLRCFallback() {
    var tmpOm = {};
    var omIframe = {};
    tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackLRCFallback', ' > ', 0);
    var tmpContext = omSetContext(omIframe);
    tmpOm = omSetOmnitureParameters(tmpOm, 'p', tmpContext);
    omPushTrackingObjectToDataLayer('lrc_fallback', tmpOm);
    sng.tl(true, 'o', 'LRC Fallback Event', tmpOm);
}

// Maximiser
function trackMaxymiser(t) {
	var tmpOm = {};
	var omIframe = {};
	tmpOm.eVar37 = t;
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackMaxymiser', ' > ', 0);
	var tmpContext = omSetContext(omIframe);
	tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
	tmpOm.referrer = omGetQueryParam('maxymiserref') || tmpContext.referrer || document.referrer;
	tmpOm.campaign = tmpContext.campaign;
	omPushTrackingObjectToDataLayer('maxymiser_event', tmpOm);
	sng.tl(true, 'o', 'Maxymiser Event', tmpOm);
}

/* Tracking */

function trackAuditories(vendorName, groups) {
	var tmpOm = {};
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackAuditories', ' > ', 0);
	tmpOm.eVar78 = vendorName + ':' + groups;
	trackEvent('Set User Auditories', null, tmpOm);
}

function trackCroSegment(segmentName) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = {};
		tmpOm.eVar37 = segmentName;
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackCroSegment', ' > ', 0);
		trackEvent('CRO Segment', null, tmpOm);
	}
}

function trackCta(ctaHref, ctaName, clickType, tmpOm, omIframe) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		clickType = clickType || '[NULL]';
		tmpOm.prop68 = ctaName;
		tmpOm.eVar68 = 'D=c68';
		tmpOm.eVar71 = 'v1:CTA:{"ct":' + clickType + '}';
		tmpOm.eVar80 = omRemoveUrlParameter(ctaHref, '_ga');
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackCta', ' > ', 0);
		tmpContext = omSetContext(omIframe);
		tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
		omPushTrackingObjectToDataLayer('call_to_action_click', tmpOm);
		sng.tl(true, 'o', 'CTA Click', tmpOm);
	} else {
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			var omPostMessage = {};
			var myKasperskyId = '';
			if (typeof window.dataLayer != 'undefined' && typeof window.dataLayer[0] != 'undefined' && typeof window.dataLayer[0].userID != 'undefined') myKasperskyId = window.dataLayer[0].userID;
			omPostMessage.pageName = omGetPageNameFromPath();
			omPostMessage.ctaHref = ctaHref || '[NULL]';
			omPostMessage.ctaName = ctaName || '[NULL]';
			omPostMessage.clickType = clickType || '[NULL]';
			omPostMessage.myKasperskyId = kaspersky.myKasperskyId || myKasperskyId || '';
			omPostMessage.sender = 'Omniture';
			omPostMessage.eventKey = 'trackCta';
			omPostMessage.debugTrace = 'trackCta';
			top.postMessage(JSON.stringify(omPostMessage), '*');
		}
	}
}

function trackDownload(downloadHref, downloadType, clickType, tmpOm, omIframe, appIds) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		downloadHref = removeHashFromString(omRemoveAllUrlParametersForDownloads(downloadHref));
		clickType = clickType || '[NULL]';
		downloadType = downloadType || '[NULL]';
		tmpOm.eVar7 = downloadHref;
                tmpOm.eVar6 = appIds;
		tmpOm.eVar71 = 'v1:Download:{"ct":' + clickType + '}{"dt":' + downloadType + '}';
		tmpOm.eVar80 = downloadHref;
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackDownload', ' > ', 0);
		tmpContext = omSetContext(omIframe);
		tmpOm = omSetOmnitureParameters(tmpOm, 'd', tmpContext);
		omPushTrackingObjectToDataLayer('download_click', tmpOm);
		sng.tl(true, 'd', downloadHref, tmpOm);
	} else {
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			var omPostMessage = {};
			var myKasperskyId = '';
			if (typeof window.dataLayer != 'undefined' && typeof window.dataLayer[0] != 'undefined' && typeof window.dataLayer[0].userID != 'undefined') myKasperskyId = window.dataLayer[0].userID;
			omPostMessage.pageName = omGetPageNameFromPath();
			omPostMessage.downloadHref = downloadHref || '[NULL]';
			omPostMessage.downloadType = downloadType || '[NULL]';
			omPostMessage.clickType = clickType || '[NULL]';
			omPostMessage.myKasperskyId = kaspersky.myKasperskyId || myKasperskyId || '';
			omPostMessage.sender = 'Omniture';
			omPostMessage.eventKey = 'trackDownload';
			omPostMessage.debugTrace = 'trackDownload';
			top.postMessage(JSON.stringify(omPostMessage), '*');
		}
	}
}

function trackEvent(name, parametersObj, tmpOm, omIframe) {
	if (prmOm.paymentErrorFunctionCount != 0) {
		return;
	}
	if (name == 'Payment Error') {
		prmOm.paymentErrorFunctionCount = prmOm.paymentErrorFunctionCount + 1;
	}	
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		parametersObj = parametersObj || {};
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			tmpOm.eVar71 = 'v1:' + name + ':' + JSON.stringify(parametersObj);
		} else {
			tmpOm.eVar71 = 'v1:' + name + ':[ERROR]';
		}
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackEvent', ' > ', 0);
		tmpContext = omSetContext(omIframe);
		tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
		if ('eventCategory' in parametersObj) {
			var eventParams = omCreateEventParamsObj(parametersObj.eventCategory, parametersObj.eventAction, parametersObj.eventLabel);
			omPushEventToDataLayer('autoEvent', eventParams);
			tmpOm.eVar109 = name + ':' + parametersObj.eventCategory + ':' + parametersObj.eventAction + ':' + parametersObj.eventLabel;
		}
		omPushTrackingObjectToDataLayer('custom_event', tmpOm);
		sng.tl(true, 'o', 'Custom Event', tmpOm);
	} else {
		// TODO
	}
}

function trackExit(exitHref, clickType, tmpOm, omIframe) {
	if (prmOm.siteType != 'IFrame') {
		if (typeof exitHref != 'object') {
			var tmpOm = tmpOm || {};
			var omIframe = omIframe || {};
			var tmpContext = {};
			var processedHref = '';
			var exitHost = omGetHostName(exitHref);
			clickType = clickType || '[NULL]';
			tmpOm.eVar71 = 'v1:Exit:{"ct":' + clickType + '}';
			tmpOm.eVar80 = omRemoveUrlParameter(exitHref, '_ga');
			if (exitHost && exitHost.search(prmOm.siteRegexp) == -1 && exitHost.search(prmOm.storeRegexp) != -1) {
				processedHref = removeHashFromString(omRemoveUrlParameter(omRemoveUrlParameter(omRemoveUrlParameter(exitHref, 'pid'), 'c'), '_ga'));
				tmpOm.productName = tmpOm.dataOmnitureProductName || processedHref || '[NULL]';
			}
			tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackExit', ' > ', 0);
			tmpContext = omSetContext(omIframe);
			tmpOm = omSetOmnitureParameters(tmpOm, 'e', tmpContext);
			omPushTrackingObjectToDataLayer('outbound_click', tmpOm);
			sng.tl(true, 'e', exitHref, tmpOm);
		}
	} else {
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			var omPostMessage = {};
			var myKasperskyId = '';
			if (typeof window.dataLayer != 'undefined' && typeof window.dataLayer[0] != 'undefined' && typeof window.dataLayer[0].userID != 'undefined') myKasperskyId = window.dataLayer[0].userID;
			omPostMessage.pageName = omGetPageNameFromPath();
			omPostMessage.exitHref = exitHref || '[NULL]';
			omPostMessage.clickType = clickType || '[NULL]';
			omPostMessage.myKasperskyId = kaspersky.myKasperskyId || myKasperskyId || '';
			omPostMessage.sender = 'Omniture';
			omPostMessage.eventKey = 'trackExit';
			omPostMessage.debugTrace = 'trackExit';
			top.postMessage(JSON.stringify(omPostMessage), '*');
		}
	}
}

function trackForm(formName, eventName, inputName) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		if (eventName.toLowerCase() == 'input') {
			if (prmOm.formsInitialized.indexOf(':' + formName + ':') == -1) {
				prmOm.formsInitialized = prmOm.formsInitialized + formName + ':';
				trackForm(formName, 'Initialization');
			}
		}
		tmpOm.eVar71 = 'v1:Forms > ' + (eventName || '[NULL]') + ':[NULL]';
		tmpOm.eVar110 = formName || '[NULL]';
		tmpOm.eVar111 = eventName || '[NULL]';
		tmpOm.eVar112 = inputName || '[NULL]';
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackForm', ' > ', 0);
		tmpContext = omSetContext(omIframe);
		tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
		omPushTrackingObjectToDataLayer('checkout_form_interaction', tmpOm);
		sng.tl(true, 'o', 'Form Event', tmpOm);
	} else {
		// TODO
	}
}

function trackGoToPayment(paymentMethod) {
	var tmpOm = {};
	var paymentMethod = paymentMethod || '[NULL]';
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackGoToPayment', ' > ', 0);
	trackEvent('Go To Payment', {"pm": paymentMethod}, tmpOm);
}

function trackChangePaymentMethod(paymentMethod) {
	var tmpOm = {};
	paymentMethod = paymentMethod ? paymentMethod : '[NULL]';
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackChangePaymentMethod', ' > ', 0);
	trackEvent('Change Payment Method', {"pm": paymentMethod}, tmpOm);
}

function trackLena(type, value) {
	var tmpOm = {};
	if (type == 'open') {
		tmpOm.eVar58 = value;
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackLena', ' > ', 0);
		trackEvent('Virtual Agent > Lena Chat Open', null, tmpOm);
	} else if (type == 'maximize') {
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackLena', ' > ', 0);
		trackEvent('Virtual Agent > Lena Chat Maximize', null, tmpOm);
	} else if (type == 'question') {
		if (sng.getValOnce(1, 'event37', 1) == '1') {
			// sng.events = 'event37'; // TODO CHECK
			tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackLena', ' > ', 0);
			trackEvent('Virtual Agent > Lena Chat Asking', null, tmpOm);
		}
	}
}

function trackMarketLincGroup(value) {
	var tmpOm = {};
	tmpOm.eVar50 = value;
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackMarketLincGroup', ' > ', 0);
	trackEvent('MarketLinc > Set Group', null, tmpOm);
}

function trackMarketLincVisitor(value) {
	var tmpOm = {};
	tmpOm.eVar49 = value;
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackMarketLincVisitor', ' > ', 0);
	trackEvent('MarketLinc > Set Visitor', null, tmpOm);
}

function trackPageView(pageName) {
	// the function supports the legacy scenarious with outer web dev calls and outer calls in iframe from mykaspersky
	if (prmOm.siteType != 'IFrame') {
		if (prmOm.isWindowLoaded) {
			if (prmOm.isTrackPageViewCalled) {
				console.log('outer trackPageView call');
			} else {
				trackPageViewOnLoad(pageName);
			}
		}
	} else { // the outer call in iframe from mykaspersky
		trackPageViewOnLoad(pageName);
	}
}

function trackPageViewOnLoad(pageName, tmpOm, omIframe) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		//if (pageName == null || pageName == '') pageName = '[NULL]';
		// tmpOm.trackPageViewPageName = pageName;
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackPageView', ' > ', 0);
		tmpContext = omSetContext(omIframe);
		tmpOm = omSetOmnitureParameters(tmpOm, 'p', tmpContext);
		omPushTrackingObjectToDataLayer('page_view', tmpOm);
		if (prmOm.trackPageViewOnLoadCalled == false){
		    sng.t(tmpOm);
		    prmOm.trackPageViewOnLoadCalled = true;
		}
		if (tmpContext.orderId && tmpContext.omNewOrders != tmpContext.omCurrentOrders) {
			omSetCookie('omOrders', tmpContext.omNewOrders, 1000);
			omSetCookie('omAdobeTriggers', 'yes', 3);
		}
	} else {
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			var omPostMessage = {};
			var myKasperskyId = '';
			if (typeof window.dataLayer != 'undefined' && typeof window.dataLayer[0] != 'undefined' && typeof window.dataLayer[0].userID != 'undefined') myKasperskyId = window.dataLayer[0].userID;
			omPostMessage.trackPageViewPageName = omGetPageNameFromPath();
			omPostMessage.myKasperskyId = kaspersky.myKasperskyId || myKasperskyId || '';
			omPostMessage.sender = 'Omniture';
			omPostMessage.eventKey = 'trackPageView';
			omPostMessage.debugTrace = 'trackPageView';
			top.postMessage(JSON.stringify(omPostMessage), '*');
		}
	}
}

function trackPartnerLocatorSearchEvent(gaEventObj, appliedFiltersArray) {
	var tmpOm = {};
	tmpOm.list1 = appliedFiltersArray.join();
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackPartnerLocatorSearchEvent', ' > ', 0);
	trackEvent('Partner Locator Search', gaEventObj, tmpOm);
}

function trackProductView(productData) {
	var tmpOm = {};
	var omIframe = omIframe || {};		
	tmpOm.products = omPrepareProductsString(productData.sku);
	tmpOm.events = 'prodView';
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackProductView', ' > ', 0);
	var tmpContext = omSetContext(omIframe);
	tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
	// passing data to Google Tag Manager
	var gtmEventObj = {};
	gtmEventObj.productDataViewed = productData;
	gtmEventObj.tmpOm = tmpOm;
	omPushEventToDataLayer('product_view', gtmEventObj);	
	// passing data to Adobe Analytics
	sng.tl(true, 'o', 'Product View', tmpOm);
}

function trackRegistration(type, tmpOm, omIframe) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		tmpOm.eVar71 = 'v1:Registration:{"st":' + type + '}';
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackRegistration', ' > ', 0);
		tmpContext = omSetContext(omIframe);
		tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
		omPushTrackingObjectToDataLayer('registration', tmpOm);
		sng.tl(true, 'o', 'Registration', tmpOm);
	} else {
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			var omPostMessage = {};
			var myKasperskyId = '';
			if (typeof window.dataLayer != 'undefined' && typeof window.dataLayer[0] != 'undefined' && typeof window.dataLayer[0].userID != 'undefined') myKasperskyId = window.dataLayer[0].userID;
			omPostMessage.pageName = omGetPageNameFromPath();
			omPostMessage.type = type || '[NULL]';
			omPostMessage.myKasperskyId = kaspersky.myKasperskyId || myKasperskyId || '';
			omPostMessage.sender = 'Omniture';
			omPostMessage.eventKey = 'trackRegistration';
			omPostMessage.debugTrace = 'trackRegistration';
			top.postMessage(JSON.stringify(omPostMessage), '*');
		}
	}
}

function trackSaleButton(saleButtonHref, saleButtonName, clickType, tmpOm) {
	// to avoid function calls on cart pages
	if (kaspersky.cartId || kaspersky.cartid) {
		return;
	}
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		var saleButtonHost = omGetHostName(saleButtonHref);
		clickType = clickType || '[NULL]';
		saleButtonHref = omRemoveUrlParameter(saleButtonHref, '_ga');
		if (saleButtonName || (saleButtonHref && saleButtonHost && saleButtonHref.search(prmOm.saleButtonRegexp) != -1)) {
			if (saleButtonName == '') saleButtonName = '[NULL]';
			tmpOm.eVar71 = 'v1:Transition To Shopping Cart:{"ct":' + clickType + '}{"sbt":' + saleButtonName + '}';
			tmpOm.eVar80 = saleButtonHref || '[NULL]';
			tmpOm.productName = tmpOm.dataOmnitureProductName || '[NULL]';
			tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackSaleButton', ' > ', 0);
			tmpContext = omSetContext(omIframe);
			tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
			omPushTrackingObjectToDataLayer('sale_button_click', tmpOm);
			sng.tl(true, 'o', 'Transition To Shopping Cart', tmpOm);
		}
	} else {
		// TODO
	}
}

function trackSignin(type) { // TODO Remove legacy
	trackSignIn(type);
}

function trackSignIn(type, tmpOm, omIframe) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = tmpOm || {};
		var omIframe = omIframe || {};
		var tmpContext = {};
		tmpOm.eVar71 = 'v1:Sign In:{"st":' + type + '}';
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackSignIn', ' > ', 0);
		tmpContext = omSetContext(omIframe);
		tmpOm = omSetOmnitureParameters(tmpOm, 'o', tmpContext);
		omPushTrackingObjectToDataLayer('sign_in', tmpOm);
		sng.tl(true, 'o', 'SignIn', tmpOm);
	} else {
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			var omPostMessage = {};
			var myKasperskyId = '';
			if (typeof window.dataLayer != 'undefined' && typeof window.dataLayer[0] != 'undefined' && typeof window.dataLayer[0].userID != 'undefined') myKasperskyId = window.dataLayer[0].userID;
			omPostMessage.pageName = omGetPageNameFromPath();
			omPostMessage.type = type || '[NULL]';
			omPostMessage.myKasperskyId = kaspersky.myKasperskyId || myKasperskyId || '';
			omPostMessage.sender = 'Omniture';
			omPostMessage.eventKey = 'trackSignIn';
			omPostMessage.debugTrace = 'trackSignIn';
			top.postMessage(JSON.stringify(omPostMessage), '*');
		}
	}
}

function trackUpsellPage(upsellValue) {
	if (prmOm.siteType != 'IFrame') {
		var tmpOm = {};
		tmpOm.prop12 = upsellValue;
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'trackUpsellPage', ' > ', 0);
		trackEvent('Upsell > Accepted', '{ups:' + upsellValue + '}', null, tmpOm);
	} else {
		// TODO Not need?
	}
}

/* Object */

function omSetContext(omIframe) {
		
	var object = {};
	var productsOnlyArray = [];
	var productsArrayParsed = [];
	var productsArrayFixed = [];
	var productsString = '';
	var omIframe = omIframe || {};
	var tmpCampaign;
	var tmpCampaignArray;

	object.omIframeSender = omIframe.sender || '';
	
	// Init
	
	if (kaspersky._isProxying) {
		object._isProxying = true;
		kaspersky._isProxying = false;
	}
	
	object.account = kaspersky.account || '';
	object.cartId = kaspersky.cartId || kaspersky.cartid || '';
	object.couponCode = kaspersky.couponCode || kaspersky.couponcode || '';
	object.currencyCode = kaspersky.currency || 'USD';
	object.errorCode = kaspersky.errorCode || kaspersky.error || '';
	object.events = kaspersky.events || '';
	object.hmcTool = kaspersky.hmcTool || '';
	object.locale = kaspersky.locale || ''; // TODO Remove Legacy
	object.microStore = kaspersky.microStore || kaspersky.microstore || '';
	object.myKasperskyId = omIframe.myKasperskyId || kaspersky.myKasperskyId || '';
	object.offerId = kaspersky.offerId || kaspersky.offerid || '';
	object.orderId = kaspersky.orderId || kaspersky.orderid || '';
	object.orderLevelDiscount = kaspersky.orderLevelDiscount || kaspersky.orderleveldiscount || '';
	// object.pageName = kaspersky.pageName || kaspersky.pagename || '[NULL]';
	object.pageCharset = kaspersky.pageCharset || kaspersky.pagecharset || '[NULL]';
	object.pageLocale = kaspersky.pageLocale || '';
	object.pageType = kaspersky.pageType || '';
	object.partnerId = kaspersky.partnerId || '';
	object.paymentMethod = kaspersky.paymentMethod || kaspersky.paymentmethod || '';
	object.platformVersion = (kaspersky.version && kaspersky.version.rev) ? kaspersky.version.rev || '[NULL]' : kaspersky.version || kaspersky.platformVersion || '[NULL]';
	
	// products and events (at Japan Cart only)	
	if (typeof kaspersky.products == 'string' && kaspersky.products != '') {
		object.productsString = kaspersky.products || '';
	} else if (typeof kaspersky.products == 'object' && kaspersky.products[0] && kaspersky.products[0].id) {
		object.productsArray = kaspersky.products || '';
	} else {
		object.products = '';
	}
		
	object.serialNumber = kaspersky.serialNumber || '';
	object.verdictLicenseProduct = kaspersky.verdictLicenseProduct || '';
	object.verdictLicenseType = kaspersky.verdictLicenseType || '[NULL]';
	object.verdictSite = kaspersky.verdictSite || '';
	object.verdictString = kaspersky.verdictString || '';
	object.searchQuery = kaspersky.searchQuery || '';
	if (kaspersky.searchTotalResults === 0) {
		object.searchTotalResults = 'No results';
	} else if (object.searchQuery != '') {
		object.searchTotalResults = kaspersky.searchTotalResults || '[NULL]';
	} else {
		object.searchTotalResults = '';
	}
	object.siteLocale = (kaspersky.siteLocale || '').toLowerCase();
	object.siteRegion = prmOm.siteRegion || kaspersky.siteRegion || '';
	object.state = kaspersky.state || '';
	object.themeId = kaspersky.themeId || kaspersky.theme || kaspersky.designtemplate || '';
	object.totalOrderAmountWoVat = kaspersky.totalorderamountwovat || '';
	object.totalOrderAmount = kaspersky.totalorderamount || '';
	object.vatAmount = kaspersky.vatamount || '';
	object.referrer = kaspersky.referrer || ''; // TODO Add parsing of the URL
	object.zip = kaspersky.zip || '';
	
	// eComm
	
	if (prmOm.isECommProvider) {
		object.account = kaspersky.account || '[NULL]';
		if (object.cartId != '') {
			object.cartId = prmOm.eCommProviderChars + '-' + object.cartId;
		} else {
			object.cartId = '[NULL]';
		}
	}
	
	// Purchase fixes and deduplication (at Japan Cart only)
	
	object.timestamp = kaspersky.timestamp || '[NULL]';
	object.isDuplicatedOrder = (kaspersky.isDuplicatedOrder == 1 || kaspersky.isDuplicatedOrder == '1') ? true : false;
	
	if (object.orderId || object.events == 'purchase') {
		object.isOrder = true;
		object.omCurrentOrders = omReadCookie('omOrders') || '';
		if (object.orderId != '') {
			object.orderId = prmOm.eCommProviderChars + '-' + object.orderId;
		} else {
			object.orderId = prmOm.eCommProviderChars + '-[NULL]';
		}
		if (object.orderId) object.omNewOrders = sng.apl(object.omCurrentOrders, object.orderId, ',', 1);
		if (object.omNewOrders != object.omCurrentOrders) {
			object.isDuplicatedOrder = false;
			if (object.events != 'purchase') object.prop20 = '[ERROR] events is not equal to "purchase"';
			object.offerId = kaspersky.offerId || kaspersky.offerid || '';
			object.paymentMethod = kaspersky.paymentMethod || kaspersky.paymentmethod || '[NULL]';
		} else {
			object.isOrder = false;
			object.cartId = '';
			object.isDuplicatedOrder = true;
			object.events = '';
			object.orderId = '';
			object.paymentMethod = '';
			object.products = '';
			object.offerId = '';
			object.couponCode = '';
			object.zip = '';
			object.state = '';
		}
	} else {
		object.isOrder = false;
	}
	
	if (prmOm.pn == 'dr' || prmOm.pn == 'nw') {
		object.siteLocale = object.siteLocale || object.locale.replace('_', '-') || '[NULL]'; // TODO Legacy
	} else if (prmOm.pn == 'av' || prmOm.pn == 'aw') {
		object.siteLocale = object.siteLocale || object.locale || '[NULL]'; // TODO Legacy;
	} else if (prmOm.pn == 'as') {
		object.siteLocale = object.locale || '[NULL]'; // TODO Legacy;
	} else {
		object.siteLocale = object.siteLocale || '[NULL]';
	}
	
	if (prmOm.isECommProvider) {
		object.themeId = object.themeId || '[NULL]';
	}
	
	// Products on Japanese Cart Pages and Product Pages
	
	if (object.productsString) {
		// FIX FOR OLD IMPLEMENTATIONS
		object.productsString = object.productsString.replace(' ', '');
		productsArrayParsed = object.productsString.split(',');
		for (var i = 0; i < productsArrayParsed.length; i++) {
			productsOnlyArray.push(productsArrayParsed[i].replace(/^[^;]*;([^;]+);.+$/, prmOm.eCommProviderChars + '-$1'));
			productsArrayFixed.push(productsArrayParsed[i].replace(/^([^;]*);([^;]+);(.+)$/, '$1;' + prmOm.eCommProviderChars + '-$2;$3'));
		}
		object.productsOnlyString = productsOnlyArray.join(',');
		object.productsString = productsArrayFixed.join(',');
		object.products = object.productsString;
	} else if (object.productsArray) {
		for (var i = 0; i < object.productsArray.length; i++) {
			object.productsOnlyString = ',' + object.productsArray[i].id;
			productsString += ',' + ';' + prmOm.eCommProviderChars + '-' + object.productsArray[i].id + ';' + object.productsArray[i].quantity;
			if (object.isOrder) {
				productsString += ';' + object.productsArray[i].sumWoVat + ';event58=' + object.productsArray[i].sum;
			}
		}
		object.productsOnlyString = object.productsOnlyString.substr(1);
		object.products = productsString.substr(1);
	} else if ((kaspersky.pageType == 'Product' || kaspersky.pageType == 'product') && kaspersky.sku != undefined) { // product pages scenario
		object.products = omPrepareProductsString(kaspersky.sku);
		object.events = 'prodView';
	} else {
		object.productsOnlyString = '';
		object.products = '';
	}
	
	// Get Parameters

	object.inpev = omGetQueryParam('inpev') || '';
	
	object.prevInp = decodeURIComponent(omGetQueryParam('prev-inp') || '');
	
	object.bid = decodeURIComponent(omGetQueryParam('bid') || '');
	object.aid = decodeURIComponent(omGetQueryParam('aid') || '');
	object.pid = decodeURIComponent(omGetQueryParam('pid') || '');
	
	object.gpWithSpage = (decodeURIComponent(omGetQueryParam('spage') || omGetQueryParam('ADDITIONAL_spage') || omGetQueryParam('referer6') || '')) ? true : false;
		
	tmpCampaign = omGetQueryParam('campaign') || omGetQueryParam('affiliate') || omGetQueryParam('reseller') || omGetQueryParam('typnews') || omGetQueryParam('ADDITIONAL_reseller') || omGetQueryParam('cid') || omGetQueryParam('c_id') || omGetQueryParam('referer2') || omGetQueryParam('salesFlag') || '';
		
	object.isTcidCampaign = tmpCampaign.indexOf('tcid_') == 0 ? true : false;
	
	if (tmpCampaign != '') {
		omSetCookie('omCampaign', tmpCampaign, 1000);
	}
	// do not define campaign if 'spage' param in url, because in this case we can rewrite the origin campaign value which was defined when user came to site
	if (!object.gpWithSpage) {
		
		object.campaign = tmpCampaign;
		object.campaignArray = object.campaign.split('_');
		
		if (object.campaign == '') {
			object.kenshooProfileId = decodeURIComponent(omGetQueryParam('ksprof_id') || '');
			object.kenshooKeyword = decodeURIComponent(omGetQueryParam('ksaffcode') || '');
			object.kenshooDevice = decodeURIComponent(omGetQueryParam('ksdevice') || '');
			object.kenshooClickId = decodeURIComponent(omGetQueryParam('ksid') || '');
			object.kenshooAdId = decodeURIComponent(omGetQueryParam('kschadid') || '');
			object.kenshooChannelName = decodeURIComponent(omGetQueryParam('kschname') || '');
			if (object.kenshooProfileId != '' || object.kenshooKeyword != '' || object.kenshooDevice != '' || object.kenshooClickId != '' || object.kenshooAdId != '' || object.kenshooChannelName != '') {
				object.campaign = 'KSHOO_' + object.kenshooProfileId + '_' + object.kenshooKeyword + '_' + object.kenshooDevice + '_' + object.kenshooAdId + '_' + object.kenshooChannelName;
			}
		}
	
		object.gpAffiliate = omGetQueryParam('affiliate') || '';
		object.gpReseller = omGetQueryParam('reseller') || '';
		object.gpTypnews = omGetQueryParam('typnews') || '';
		object.gpCjPid = decodeURIComponent(omGetQueryParam('CJ_PID') || '');
		object.gpOndAffiliateId = decodeURIComponent(omGetQueryParam('ond_affiliate_id') || '');
		object.gpAvgAffiliate = decodeURIComponent(omGetQueryParam('avgaffiliate') || '');
		
		if (object.isTcidCampaign) {
			if (object.campaign.search(/tcid_(admitad|actionpay|vivnetworks|conversant)_/) == 0) {
				object.isAffiliate = true;
			}
		} else if (object.gpAffiliate == 'oND_NAM' || object.gpAffiliate == 'oND' || object.gpReseller == 'oND_NAM' || object.gpReseller == 'oND' || object.gpAffiliate.indexOf('DRaff_oND_') == 0 || object.gpReseller.indexOf('DRaff_oND_') == 0) {
			object.isAffiliate = true;
			object.affiliateName = 'oND';
			object.aid = object.gpOndAffiliateId || object.aid || '[NULL]';
			object.pid = object.pid || '[NULL]';
		} else if (object.gpReseller.indexOf('Affiliation_CJ_') == 0 || object.gpTypnews.indexOf('Affiliation_CJ_') == 0 || object.gpReseller.indexOf('DRAff_CJ_') == 0 || object.gpAffiliate.indexOf('DRAff_CJ_') == 0 || object.gpAffiliate == 'CJ_COM' || object.gpAffiliate == 'CJ_NAM' || object.gpTypnews == 'CJ_COM' || object.gpTypnews == 'CJ_NAM' || object.gpCjPid != '') {
			object.isAffiliate = true;
			object.affiliateName = 'CJ';
			object.pid = object.pid || object.gpCjPid || '[NULL]';
		} else if (object.gpAvgAffiliate != '') {
			object.isAffiliate = true;
			object.affiliateName = 'Avangate';
			object.pid = object.gpAvgAffiliate;
		} else {
			object.isAffiliate = false;
		}
		
	} else {
		object.campaign = '';
		object.isAffiliate = false;
	}

	object.gpUtmSource = decodeURIComponent(omGetQueryParam('utm_source') || '');
	object.gpUtmMedium = decodeURIComponent(omGetQueryParam('utm_medium') || '');
	object.gpUtmCampaign = decodeURIComponent(omGetQueryParam('utm_campaign') || '');
	object.gpUtmTerm = decodeURIComponent(omGetQueryParam('utm_term') || '');
	object.gpUtmContent = omGetQueryParam('utm_content') || '';
	
	if (object.gpUtmSource || object.gpUtmMedium || object.gpUtmCampaign || object.gpUtmTerm || object.gpUtmContent) {
		object.hasUtm = true;
		object.gpUtmSource = object.gpUtmSource || '[NULL]';
		object.gpUtmMedium = object.gpUtmMedium || '[NULL]';
		object.gpUtmCampaign = object.gpUtmCampaign || '[NULL]';
		object.gpUtmTerm = object.gpUtmTerm || '[NULL]';
		object.gpUtmContent = object.gpUtmContent || '[NULL]';
	} else {
		object.hasUtm = false;
	}
	
	object.croSegmentStr = decodeURIComponent(object.croSegment1 || omGetQueryParam('klab1') || '') + ':' + decodeURIComponent(object.croSegment2 || omGetQueryParam('klab2') || '') + ':' + decodeURIComponent(object.croSegment3 || omGetQueryParam('klab3') || '') + ':' + decodeURIComponent(object.croSegment4 || omGetQueryParam('klab4') || '') + ':' + decodeURIComponent(object.croSegment5 || omGetQueryParam('klab5') || '');
	
	// LRC
	
	if (kaspersky.hotfixLrcProxy == 1 && kaspersky.verdictString == '' && kaspersky.serialNumber != '') {
		object.isLrcOrAtt = true;
		object.verdict = '[NULL]';
		object.prop20 = 'hotfixLrcProxy';
		object.verdictSite = 'LRC';
	} else if (kaspersky.hotfixLrcProxy == 1 && kaspersky.verdictString != '') {
		object.isLrcOrAtt = true;
		var verdictUsaArray = /^([^_]+)_([^_]+)_([^_]+)_([^_]+)_([^_]+)_([0-9]+)[^_]+_([0-9]+)[^_]+_([^_]+)$/ig.exec(kaspersky.verdictString);
		object.verdictRegion = verdictUsaArray[1];
		object.verdictSite = verdictUsaArray[2];
		if (verdictUsaArray[4].indexOf('Undefined') != -1) {
			object.verdictPartner = '[NULL]';
		} else {
			object.verdictPartner = verdictUsaArray[4];
		}
		if (verdictUsaArray[3].indexOf('Undefined') != -1) {
			object.verdictChannel = '[NULL]';
		} else {
			object.verdictChannel = verdictUsaArray[3];
		}
		if (verdictUsaArray[5].indexOf('Undefined') != -1) {
			object.verdictLicenseProduct = '[NULL]';
		} else {
			object.verdictLicenseProduct = verdictUsaArray[5];
		}
		object.verdictDevices = verdictUsaArray[6];
		object.verdictTerm = verdictUsaArray[7];
		object.verdictSourceCase = (decodeURIComponent(omGetQueryParam('uni') || '') == '') ? 'REGULAR' : 'UNINSTALL';
		object.verdictLicenseStatus = verdictUsaArray[8].toUpperCase();
		object.eCommProvider = 'Digital River';
		object.serialNumber = object.serialNumber || omGetQueryParam('serial') || '[NULL]';
		object.serialNumber = object.serialNumber.toUpperCase() || '[NULL]';
		object.verdict = (object.verdictRegion + '_' + object.verdictSite + '_' + object.verdictPartner + '_' + object.verdictChannel + '_' + object.verdictLicenseProduct + '_' + object.verdictDevices + '_' + object.verdictTerm + '_' + object.verdictLicenseStatus + '_' + object.verdictSourceCase).toUpperCase();
		object.prop20 = 'hotfixLrcProxy';
	} else if (object.verdictLicenseProduct && object.verdictLicenseProduct != '' && object.verdictLicenseProduct != '[NULL]') {
		object.isLrcOrAtt = true;
		object.serialNumber = object.serialNumber || omGetQueryParam('serial') || '[NULL]';
		object.serialNumber = object.serialNumber.toUpperCase() || '[NULL]';
		if (object.verdictLicenseType.toUpperCase().indexOf('TRIAL') == -1 && object.verdictLicenseProduct.search(/^.+_T$/i) == -1) {
        	object.verdictSite = kaspersky.verdictSite || 'LRC';
		} else {
			object.verdictSite = 'ATT';
		}
		object.verdictPartNumber = kaspersky.verdictPartNumber || '[NULL]';
		if (typeof kaspersky.verdictRegion != 'undefined' && kaspersky.verdictRegion != '' && kaspersky.verdictRegion != '[NULL]') {
			object.verdictRegion = kaspersky.verdictRegion;
			object.prop20 = object.prop20 + '[verdictRegion exists]';
		} else if (object.siteLocale == 'en-global') {
			object.verdictRegion = 'GL';
		} else if (object.siteLocale == 'ru-ru') {
			object.verdictRegion = 'RU';
		} else if (object.siteLocale == 'en-us') {
			object.verdictRegion = 'US';
		} else if (object.siteLocale == 'en-gb') {
			object.verdictRegion = 'UK';
		} else if (object.siteLocale == 'pt-br') {
			object.verdictRegion = 'BR';
		} else if (object.siteLocale == 'fr-fr') {
			object.verdictRegion = 'FR';
		} else if (object.siteLocale == 'de-de') {
			object.verdictRegion = 'DE';
		} else if (object.siteLocale == 'it-it') {
			object.verdictRegion = 'IT';
		} else if (object.siteLocale == 'es-es') {
			object.verdictRegion = 'ES';
		} else if (object.siteLocale == 'nl-nl') {
			object.verdictRegion = 'NL';
		} else if (object.siteLocale == 'en-au') {
			object.verdictRegion = 'AU';
		} else if (object.siteLocale == 'en-ae') {
			object.verdictRegion = 'ME';
		} else if (object.siteLocale == 'ar-ae') {
			object.verdictRegion = 'ME';
		} else if (object.siteLocale == 'ja-jp') {
			object.verdictRegion = 'JP';
		} else if (object.siteLocale == 'en-in') {
			object.verdictRegion = 'IN';
		} else if (object.siteLocale == 'en-za') {
			object.verdictRegion = 'ZA';
		} else if (object.siteLocale == 'zh-cn') {
			object.verdictRegion = 'CN';
		} else if (object.siteLocale == 'tr-tr') {
			object.verdictRegion = 'TR';
		} else if (object.siteLocale == 'es-mx') {
			object.verdictRegion = 'LA';
		} else if (object.siteLocale == 'sv-se') {
			object.verdictRegion = 'SE';
		} else if (object.siteLocale == 'da-dk') {
			object.verdictRegion = 'DK';
		} else if (object.siteLocale == 'nb-no') {
			object.verdictRegion = 'NO';
		} else if (object.siteLocale == 'pl-pl') {
			object.verdictRegion = 'PL';
		} else if (typeof(object.siteLocale) == 'string') {
			object.verdictRegion = object.siteLocale.split('-')[0];
		} else {
			object.verdictRegion = '[NULL]';
		}
		object.verdictRegion = object.verdictRegion || '[NULL]';
		object.verdictChannel = kaspersky.verdictChannel || '[NULL]';
		// if (object.verdictChannel != 'Online' && object.verdictChannel != 'Retail') object.verdictChannel = '[NULL]';
		object.verdictPartner = kaspersky.verdictPartner || kaspersky.verdictPartnerId || '[NULL]';
		// lrc fallback verdict case
		if (typeof(kaspersky.verdictLicenseProduct) == 'string' && kaspersky.verdictLicenseProduct.toLowerCase().indexOf('fallback') !== -1) {
		    object.verdictLicenseProduct = 'FALLBACK';
		} else {
		    object.verdictLicenseProduct = kaspersky.verdictLicenseProduct.split('_')[0] || '[NULL]';
		}
		object.verdictDevices = kaspersky.verdictDevices || '[NULL]';
		object.verdictTerm = kaspersky.verdictTerm === 0 ? 0 : (kaspersky.verdictTerm || '[NULL]');
		object.verdictSourceCase = (decodeURIComponent(omGetQueryParam('uni') || '') == '') ? 'REGULAR' : 'UNINSTALL';
		object.verdictDaysExpired = kaspersky.verdictDaysExpired || '[NULL]';
        if (kaspersky.verdictDaysExpired <= 0) {
			object.verdictLicenseStatus = 'ACTIVE';
		} else {
			object.verdictLicenseStatus = 'EXPIRED';
		}
		object.verdictLicenseStatus = kaspersky.verdictLicenseStatus || object.verdictLicenseStatus;
		object.verdict = (object.verdictRegion + '_' + object.verdictSite + '_' + object.verdictPartner + '_' + object.verdictChannel + '_' + object.verdictLicenseProduct + '_' + object.verdictDevices + '_' + object.verdictTerm + '_' + object.verdictLicenseStatus + '_' + object.verdictSourceCase + '_' + object.verdictDaysExpired + '_' + object.verdictLicenseType + '_' + object.verdictPartNumber).toUpperCase();
    }
	
	// Other Legacy & Hotfixes
	
	object.eVar37 = window.kaspersky_testid || kaspersky.eVar37 || '';
	
	if (prmOm.pn == 'pp' || prmOm.pn == 'ap') {
		object.siteRegion = object.siteRegion || '[NULL]';
	}
	
	return object;
	
}
	
function omSetOmnitureParameters(tmpOm, instanceType, tmpContext) {
		
	sng.linkTrackVars = ''; // HOTFIX
	if (tmpContext._isProxying) tmpOm.debugTrace = 'sng.t Proxied > ' + tmpOm.debugTrace; // HOTFIX Proxying
	
	tmpOm.currencyCode = tmpContext.currencyCode;
		
	tmpOm.pageNameReal = omGetPageNameFromPath();
	// HOTFIX
	if (prmOm.pn == 'dr' || prmOm.pn == 'av' || prmOm.pn == 'nw') {
		if (kaspersky.ipp == 1 || kaspersky.sectiontype == 'IPP' || kaspersky.sectionType == 'IPP' || kaspersky.sectiontype == 'ipp' || kaspersky.sectionType == 'ipp') {
			tmpOm.pageNameReal = 'IPP > ' + tmpOm.pageNameReal;
		} else {
			if ((prmOm.pn == 'dr' && kaspersky.account != 'kasper' && kaspersky.account != 'kasperin') || prmOm.pn == 'av') tmpOm.pageNameReal = 'Shopping Cart > ' + tmpOm.pageNameReal;
		}
		if (tmpOm.pageNameReal == 'ThreePgCheckoutAddressPaymentInfoPage') tmpOm.pageNameReal = 'Shopping Cart > Billing Details';
		if (kaspersky.sectiontype && kaspersky.sectiontype == 'marketplace') {
			// tmpOm.pageNameReal = 'Private Store > ' + tmpOm.pageNameReal.replace(/([a-z])([A-Z])/g, '$1 $2');
			tmpOm.pageNameReal = 'Private Store > ' + tmpOm.pageNameReal;
		}
		// if (prmOm.pn == 'dr' && kaspersky.account != 'kasper' && kaspersky.account != 'kasperin') tmpOm.pageNameReal = omAddSpaces(tmpOm.pageNameReal);
	}
	tmpOm.pageNameReal = tmpOm.pageNameReal.replace('Shopping Cart > Shopping Cart > ', 'Shopping Cart > ');
	tmpOm.pageNameReal = tmpOm.pageNameReal.replace('Shopping Cart > IPP > ', 'IPP > ');
	// /HOTFIX
	if ((tmpOm.pageNameReal.indexOf('Error') != -1 && tmpOm.pageNameReal.indexOf('404') != -1) || tmpContext.pageType == 'errorPage' || tmpContext.errorCode == 404) {
		tmpOm.pageName = '';
		tmpOm.pageType = 'errorPage';
		tmpOm.pageNameReal = (tmpOm.pageNameReal != '[NULL]') ? tmpOm.pageNameReal : 'Error Pages > 404';
	} else if (tmpContext.errorCode) {
		tmpOm.pageNameReal = 'Error Pages > ' + tmpContext.errorCode;
	} else {
		tmpOm.pageName = tmpOm.pageNameReal;
	}
	tmpOm.pageNameArray = tmpOm.pageNameReal.split(' > ');
	tmpOm.channel = tmpOm.pageNameArray[0];
	
	tmpOm.pageURL = document.location.href;
	if (/o|e|d/.test(instanceType)) {
		// Current instance is sng.tl
		if (tmpOm.isSalePage) tmpOm.eVar59 = tmpOm.pageNameReal;
		tmpOm.instanceType = instanceType;
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'sng.tl', ' > ', 0);
	} else if (instanceType == 'p') {
		// Current instance is sng.t or Click Map (not in use)
		tmpOm.products = tmpContext.products || '';
		if (tmpOm.pageURL.toLowerCase() != prmOm.prevUrl) {
			tmpOm.referrer = prmOm.prevUrl || tmpContext.referrer || document.referrer;
			prmOm.prevUrl = tmpOm.pageURL.toLowerCase();
		} else {
			tmpOm.referrer = tmpContext.referrer || document.referrer;
		}
		tmpOm.campaign = tmpContext.campaign;
		tmpOm.prop5 = tmpContext.searchQuery;
		tmpOm.prop6 = tmpContext.searchTotalResults;
		if (tmpContext.isLrcOrAtt && tmpContext.verdictSite == 'LRC') {
			tmpOm.prop14 = tmpContext.verdict;
			tmpOm.prop15 = tmpContext.serialNumber;
			tmpOm.prop16 = 'D=c14+": "+c15';
		}
		if (tmpOm.campaign) tmpOm.prop17 = 'D=v0';
		if (tmpContext.isLrcOrAtt && tmpContext.verdictSite == 'ATT') {
			tmpOm.prop55 = tmpContext.verdict;
			tmpOm.prop61 = tmpContext.serialNumber;
		}
		tmpOm.eVar4 = omGetQueryParam('icid');
		if (tmpOm.prop5) tmpOm.eVar5 = 'D=c5';
		tmpOm.eVar8 = omGetQueryParam('bid') || '';
		if (tmpContext.isAffiliate) {
			if (tmpContext.isTcidCampaign) {
				tmpOm.eVar13 = 'D=v0';
			} else {
				tmpOm.eVar13 = '{"af":' + tmpContext.affiliateName + '}';
				if (tmpContext.pid) tmpOm.eVar13 = tmpOm.eVar13 + '{"pid":' + tmpContext.pid + '}';
				if (tmpContext.aid) tmpOm.eVar13 = tmpOm.eVar13 + '{"aid":' + tmpContext.aid + '}';
			}
		}
		if (tmpContext.isLrcOrAtt && tmpContext.verdictSite == 'LRC') {
			tmpOm.eVar14 = 'D=c14';
			tmpOm.eVar15 = 'D=c15';
			tmpOm.eVar16 = 'D=c14+": "+c15';
		}
		if (tmpOm.prop12) tmpOm.eVar18 = 'D=c12';
		if (!tmpOm.gpHasSpage) {
			tmpOm.eVar23 = decodeURIComponent((kaspersky['qs'] && kaspersky['qs']['aclid']) || omGetQueryParam('aclid') || '');
			tmpOm.eVar24 = decodeURIComponent((kaspersky['qs'] && kaspersky['qs']['acregion']) || omGetQueryParam('acregion') || '');
			tmpOm.eVar25 = decodeURIComponent((kaspersky['qs'] && kaspersky['qs']['acaid']) || omGetQueryParam('acaid') || '');
			tmpOm.eVar26 = decodeURIComponent((kaspersky['qs'] && kaspersky['qs']['acipmccid']) || omGetQueryParam('acipmccid') || '');
			tmpOm.eVar27 = decodeURIComponent((kaspersky['qs'] && kaspersky['qs']['acaiid']) || omGetQueryParam('acaiid') || '');
		}
		tmpOm.eVar35 = omRemoveUrlParameter(omRemoveUrlParameter(decodeURIComponent(tmpOm.referrer), '_ga'), 'mkt_tok'); // Due to filtering Referrer by internal filters
		tmpOm.eVar44 = 'D=v3';
		// tmpOm.eVar49
		// tmpOm.eVar50
		if (tmpContext.isLrcOrAtt && tmpContext.verdictSite == 'ATT') {
			tmpOm.eVar55 = 'D=c55';
			tmpOm.eVar61 = 'D=c61';
		}
		tmpOm.eVar64 = tmpContext.hmcTool;
		if (typeof ClickTaleGetUID == 'function') {
			tmpOm.eVar60 = ClickTaleGetUID();
		}
		tmpOm.eVar67 = tmpContext.microStore;
		if (!tmpOm.gpHasSpage) {
			tmpOm.eVar69 = decodeURIComponent((kaspersky['qs'] && kaspersky['qs']['acmid']) || omGetQueryParam('acmid') || '');
			tmpOm.eVar70 = decodeURIComponent((kaspersky['qs'] && kaspersky['qs']['acbid']) || omGetQueryParam('acbid') || '');
		}
		tmpOm.eVar71 = 'v1:Page View:[NULL]';
		if (tmpOm.campaign) tmpOm.eVar73 = 'D=v0';
		if (tmpOm.campaign) tmpOm.eVar74 = 'D=v0';
		if (tmpContext.hasUtm) tmpOm.eVar86 = 'v1:' + tmpContext.gpUtmSource + ':' + tmpContext.gpUtmMedium + ':' + tmpContext.gpUtmCampaign + ':' + tmpContext.gpUtmTerm + ':' + tmpContext.gpUtmContent;
		tmpOm.instanceType = instanceType;
		tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'sng.t', ' > ', 0);
		tmpOm = omSetInp(tmpOm);
		tmpOm.eVar117 = omGetQueryParam('leeloo_account_id');
		tmpOm.eVar118 = omGetQueryParam('act-insttype');
		tmpOm.eVar119 = omGetQueryParam('tracking-id');
		tmpOm.eVar120 = omGetQueryParam('sn');
		tmpOm.eVar123 = omGetQueryParam('ltsid');
		tmpOm.eVar124 = tmpOm.campaign;
		tmpOm.eVar126 = tmpOm.campaign;
		tmpOm.eVar128 = omGetQueryParam('emcSubmissionId');
		
		// events (at Japan Cart and Product Pages only)
		sng.events = tmpContext.events;
		sng.events = sng.getCartOpen('scOpen');
		tmpOm.events = sng.resetGetCartOpen('scOpen');
		sng.events = '';
		// purchaseID
		if (tmpContext.orderId) {
			tmpOm.purchaseID = tmpContext.orderId;
		}
		if (tmpContext.orderId && tmpContext.omIframeSender != 'Omniture') { // Exclude commercial data from iFrame instances due to allocating revenue to each hit so multiplying it
			tmpOm.eVar2 = tmpContext.paymentMethod;
			tmpOm.eVar12 = tmpContext.orderId;
			tmpOm.eVar53 = tmpContext.couponCode;
			tmpOm.eVar54 = tmpContext.offerId;
			tmpOm.eVar85 = tmpContext.currencyCode;
			tmpOm.state = tmpContext.state;
			tmpOm.zip = tmpContext.zip;
			tmpOm.events = sng.apl(tmpOm.events, 'event58', ',', 1);
		} else if (tmpContext.orderId && tmpContext.omIframeSender == 'Omniture') {
			tmpOm.events = '';
			tmpOm.eVar2 = '';
			tmpOm.eVar12 = '';
			tmpOm.eVar53 = '';
			tmpOm.eVar54 = '';
			tmpOm.eVar85 = '';
			tmpOm.state = '';
			tmpOm.zip = '';
		}
	} else {
		tmpOm.instanceType = '[NULL]';
	}

	tmpOm.server = window.location.hostname;
	if (tmpContext.cartId) tmpOm.prop1 = tmpContext.cartId;
	// tmpOm.prop20
	tmpOm.prop29 = 'v1:' + prmOm.sCodeName + ':' + tmpOm.debugTrace + ':' + tmpOm.instanceType;
	tmpOm.prop30 = 'v1:' + prmOm.sCodeVersion + ':' + prmOm.sCodeBuild + ':' + prmOm.platformName + ':' + tmpContext.platformVersion;
	tmpOm.prop31 = removeHashFromString(omRemoveAllUrlParameters(document.location.href));
	tmpOm.prop37 = tmpOm.eVar37 || tmpContext.eVar37;
	tmpOm.prop47 = prmOm.siteType;
	if (prmOm.isECommProvider) {
		tmpOm.prop48 = 'v1:' + prmOm.eCommProvider + ':' + tmpContext.account + ':' + tmpContext.themeId;
	}
	if (tmpOm.pageNameArray[0] == 'Landing Pages' || (tmpOm.pageNameArray[0] == 'Other Pages' && tmpOm.pageNameArray[1] == 'Custom HTML')) {
		tmpOm.prop51 = 'Landing Pages'; // TODO Hotifx
	} else {
		tmpOm.prop51 = prmOm.siteClass;
	}
	tmpOm.prop56 = tmpContext.pageLocale;
	if (prmOm.pn == 'pp' || prmOm.pn == 'ap' || prmOm.pn == 'ea') {
		tmpOm.prop57 = tmpContext.siteRegion || '[NULL]';
	} else if (prmOm.pn == 'ng' || prmOm.pn == 'bl' || prmOm.pn == 'ms' || prmOm.pn == 'og' || prmOm.pn == 'po' || prmOm.pn == 'mi' || prmOm.pn == 'pc' || prmOm.pn == 'ma' || prmOm.pn == 'kb' || prmOm.pn == 'ot') {
		tmpOm.prop57 = tmpContext.siteLocale;
	} else if (prmOm.isECommProvider || prmOm.pn == 'aw') {
		tmpOm.prop57 = tmpContext.siteLocale + ':' + tmpContext.account;
	} else {
		tmpOm.prop57 = tmpContext.siteLocale || '[NULL]';
	}
	tmpOm.prop58 = document.title;
	if (prmOm.pn == 'pp' || prmOm.pn == 'ap') tmpOm.prop59 = tmpContext.partnerId;
	if (prmOm.pn == 'dr' && tmpContext.myKasperskyId) tmpOm.prop75 = tmpContext.myKasperskyId;
	if (tmpContext.cartId) tmpOm.eVar1 = 'D=c1';
	tmpOm.eVar3 = tmpOm.pageNameReal;
	tmpOm.eVar9 = omRemoveUrlParameter(omRemoveUrlParameter(document.location.href, '_ga'), 'mkt_tok');
	if (tmpOm.prop37) tmpOm.eVar37 = 'D=c37';
	tmpOm.eVar45 = tmpContext.prevInp;
	tmpOm.eVar47 = 'D=c47';
	if (prmOm.isECommProvider) {
		tmpOm.eVar48 = 'D=c48';
	}
	tmpOm.eVar57 = 'D=c57';
	// save locale in global prop
	prmOm.siteLocale = tmpOm.prop57;
	// TODO tmpOm.eVar72
	if ((prmOm.pn != 'pp' || prmOm.pn == 'ap') && tmpContext.myKasperskyId) tmpOm.eVar75 = 'D=c75';
	tmpOm.eVar77 = tmpOm.customProperties;
	// tmpOm.eVar78
	//get visitor ID's
	tmpOm.eVar113 = sng.visitor._fields.MCMID || '[NULL]';
	tmpOm.eVar116 = omGetGoogleAnalyticsClientId() || '[NULL]';
	//ab test NexWay parameter
	tmpOm.eVar121 = omGetQueryParam('abtest');
	// tmpOm.list2 = tmpOm.eVar7 || tmpContext.productsOnlyString || tmpContext.productName || tmpOm.productName;
	tmpOm.list2 = decodeURIComponent(window.location.href).split("&");
	if (tmpContext.croSegmentStr != '::::') tmpOm.eVar79 = 'v1:' + tmpContext.croSegmentStr;
	
	if (tmpContext.inpev == 'inst') {
		tmpOm.events = sng.apl(tmpOm.events, 'event26', ',', 1);
	} else if (tmpContext.inpev == 'uninst') {
		tmpOm.events = sng.apl(tmpOm.events, 'event27', ',', 1);
	}
	// businessType and pageType
	tmpOm.prop2 = String(kaspersky.pageType || 'default').toLowerCase();
	var businessValues = omGetBusinessType();
	tmpOm.prop3 = businessValues[0];
	tmpOm.prop20 = prmOm.errorsLog;
	
	return tmpOm;

}

/* Plugins */

/*
function omAddSpaces(inputStr) {
	var previousChar = '';
	var currentChar = '';
	var resultStr = '';
	for (var i = 0; i < inputStr.length; i++) {
		currentChar = inputStr.charAt(i);
		if (previousChar != '' && currentChar == currentChar.toUpperCase() && previousChar != previousChar.toUpperCase()) {
			resultStr = resultStr + ' ' + currentChar;
		} else if (previousChar != '' && currentChar == '_') {
			resultStr = resultStr + ' ' + currentChar;
		} else {
			resultStr = resultStr + currentChar;
		}
	}
	return resultStr;
}
*/

function omChooseCookieDomain() {
	var domain = document.location.hostname.replace(/^www\./i, '');
	domain = domain.replace(/^(.*)(\.kaspersky.*)$/i, '$2');
	if (domain[0] != '.') domain = '.' + domain;
	return domain;
}

function omGetAbsoluteUrl(url) {
	var origin = omGetOrigin(url) || '';
	if (!url) {
		return '';
	} else if (url.indexOf(origin) == 0) {
		return url;
	} else {
		if (url[0] != '/') url = '/' + url;
		return origin + url;
	}
}

function omGetBusinessType() {
	if (kaspersky.products) { // first check products
		var products = kaspersky.products;
		if (typeof products == 'object' && Array.isArray(products)) {
			for (i = 0; i < products.length; i++) {
				if (products[i] && typeof products[i].business != 'string') { // new tagging error
					return ['b2c', 'business undefined in product'];
				} else if (products[i] && products[i].business.toLowerCase() == 'b2b') {
					return ['b2b', 'product'];
				} else if (products[i] && products[i].business.toLowerCase() != 'b2c') {
					return [products[i].business.toLowerCase(), 'strange business value in product'];
				} else if (typeof products[i] == 'undefined') {
					return ['b2c', 'product undefined'];
				}
			}
			return ['b2c', 'product'];
		} else { // old tagging shopping carts
			return ['b2c', 'legacy shopping cart'];
		}
	} else if (typeof kaspersky.businessType == 'string' && kaspersky.businessType != '') { // then ckeck dataLayer
			return [kaspersky.businessType.toLowerCase(), 'dataLayer'];
	} else { // finally check url
		if (window.location.href.indexOf("small-business-security") > -1 || window.location.href.indexOf("small-to-medium-business-security") > - 1 || window.location.href.indexOf("enterprise-security") > -1 || window.location.href.indexOf("small-office-security") > -1) {
			return ['b2b', 'url'];
		} else {
			return ['b2c', 'url'];
		}
	}
}

function omGetGoogleAnalyticsClientId () {
	var gaCookie = omReadCookie('_ga');
	if (gaCookie) {
		var gaCookieArray = gaCookie.split('.');
		var clienId = gaCookieArray[2] + '.' + gaCookieArray[3];
		return clienId;
	} else {
		return null;
	}
}

function omGetHostName(href) {
	var l = document.createElement('a');
	l.href = href;
	return l.hostname || '';
}

function omGetOrigin(href) {
	var l = document.createElement('a');
	l.href = href;
	return l.origin || '';
}

function omGetPageNameFromPath() {
	try {
		var prefix;
		var path = document.location.pathname || '/';
		var siteClass = prmOm.siteClass || 'Websites';
		var pageType = kaspersky.pageType || '';
		if (pageType && typeof(pageType) == 'string') {
			prefix = pageType.toLowerCase();
		} else {
			prefix = siteClass.toLowerCase();
		}
		if (path == '/') {
			return prefix + ' > home';
		} else {
			path = path.split('.')[0];
			if (path.endsWith('/')) {
				path = path.slice(0, path.length - 1);
			}
			if (path.startsWith('/')) {
				path = path.slice(1);
			}
			if (path) {
				return prefix + ' > ' + path;
			} else {
				return prefix + ' > home';
			}
		}
	} catch(err) {
		prmOm.errorsLog = err.name + ";" + err.message;
		return document.location.pathname;
	}
}

function omGetQueryParam(param, url) {
	var paramValue = '';
	var url = url || document.location.href || '';
	var a = url.split('#')[0] || '';
	var b = a.split('?')[1] || '';
	var vars = b.split('&');
	param = param.toLowerCase();
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		if (decodeURIComponent(pair[0]).toLowerCase() == param) {
			try {
				return decodeURIComponent(pair[1]);
			} catch (err) {
				return pair[1];
			}
		}
	}
}

function omReadCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function omRemoveAllUrlParameters(inputURL, inputParam) {
	var outputURL = inputURL.split('?')[0];
	if (inputParam === undefined || inputURL.indexOf('?') == -1) {
		return outputURL;
	} else {
		var param,
			params_arr = [],
			queryString = (inputURL.indexOf('?') !== -1) ? inputURL.split('?')[1] : '';
		if (queryString !== '') {
			params_arr = queryString.split('&');
			for (var i = 0; i < params_arr.length; i++) {
				param = params_arr[i].split('=')[0];
				if (param === inputParam) {
					params_arr.splice(i, 1);
					i = i - 1;
				}
			}
		}
		if (params_arr.length) {
			outputURL += "?" + params_arr.join('&');
		}
		return outputURL;
	}
}

function omRemoveAllUrlParametersForDownloads(inputURL) {
	if (omGetHostName(inputURL).search(/data\.kaspersky\.co\.jp/i) != -1) {
		return omRemoveUrlParameter(inputURL, '_ga');
	} else {
		var outputURL = inputURL.split('?')[0];
		if (inputURL.indexOf('?') == -1) {
			return outputURL;
		} else {
			var param,
				params_arr = [],
				queryString = inputURL.split('?')[1];
			if (queryString !== '') {
				params_arr = queryString.split('&');
				for (var i = 0; i < params_arr.length; i++) {
					param = params_arr[i].split('=')[0];
					if (param != 'file' && param != 'lang' && param != 'track' && param != 'program') {
						params_arr.splice(i, 1);
						i = i - 1;
					}
				}
			}
			if (params_arr.length) {
				outputURL += "?" + params_arr.join('&');
			}
			return outputURL;
		}
	}
}

function omRemoveUrlParameter(url, parameter) {
	if (typeof url == 'string' && url != '') {
		var urlparts = url.split('?');   
		if (urlparts.length >= 2) {
			var prefix;
			var pars = urlparts[1].split(/[&;]/g);
			for (var i = pars.length; i-- > 0;) {
				prefix = pars[i].split(/[=;]/g)[0];
				if (prefix == parameter) {
					pars.splice(i, 1);
				}
			}
			url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
			return url;
		} else {
			return url;
		}
	} else {
		return '';
	}
}

function omRemoveCookie(name) {
	omSetCookie(name, '', -1);
}
	
function omSafeParseJson(json) {
	var data;
	try {
		data = JSON.parse(json);
		return data;
	} catch (e) {
		return json;
	}
}

function omSetCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = '; expires=' + date.toGMTString();
	}
	document.cookie = name + '=' + value + expires + '; path=/; domain=' + prmOm.cookieDomain + ';';
}

function omSetInp(tmpOm) {
	var inp, inp_arr, inp_err = 0;
	if (inp = omGetQueryParam('inpkss')) {
		inp = inp.replace('%3A', ':');
		inp = inp.replace('%3a', ':'); // fix for encoded colon
		inp_arr = inp.split(':');
		if (inp_arr.length == 8) {
			//build
			if (inp_arr[0].length > 0 && inp_arr[1] && inp_arr[2] && inp_arr[3]) {
				tmpOm.eVar28 = inp_arr[0]+':'+inp_arr[1]+':'+inp_arr[2]+':'+inp_arr[3];
			} else {
				inp_err = 1;
			}
			//scenario
			if (inp_arr[4] && inp_arr[5] && inp_arr[6]) {
				tmpOm.eVar46 = inp_arr[4]+':'+inp_arr[5]+':'+inp_arr[6];
			} else {
				inp_err = 1;
			}
			//item
			if (inp_arr[7]) {
				tmpOm.eVar31 = inp_arr[7];
			}
		} else {
			inp_err = 1;
		}
		if (inp_err) {
			tmpOm.prop20 = '[ERROR] inpkss = '+inp;
		}
	} else if (inp = omGetQueryParam('inp')) {
		inp = inp.replace('%3A', ':'); // Fix
		inp = inp.replace('%3a', ':'); // Fix
		inp = inp.replace(':0:0:0:0::', ':0:0:0:0:0:'); // Fix for v2014
		if (inp.substring(inp.length - 3) == 'cwd') { // Fix for cwd
			inp = inp.replace('::', ':0:');
		}
		inp_arr = inp.split(':');
		if (inp_arr.length == 10 || (inp_arr.length == 9 && inp.substring(inp.length-1) == ':')) {
			//b
			if ( inp_arr[0].length > 0 && inp_arr[1] && inp_arr[2] && inp_arr[3] ) {
				tmpOm.eVar28 = inp_arr[0]+':'+inp_arr[1]+':'+inp_arr[2]+':'+inp_arr[3];
			} else {
				inp_err = 'b';
			}
			//l
			if (inp_arr[4].length > 0 && inp_arr[5].length > 0 && inp_arr[6].length > 0 && inp_arr[7].length > 0 && inp_arr[8].length > 0) {
				tmpOm.eVar32 = inp_arr[4]+':'+inp_arr[5]+':'+inp_arr[6]+':'+inp_arr[7]+':'+inp_arr[8];
			} else {
				inp_err = 'l';
			}
			//i
			if (inp_arr[9]) {
				tmpOm.eVar31 = inp_arr[9].replace(/\([^()]+\)/g,'()');
			}
		} else {
			inp_err = 1;
		}
		if (inp_err) {
			tmpOm.prop20 = '[ERROR] inp = ' + inp + (inp_err == 1 ? '' : ' | ' + inp_err);
		}
	}
	return tmpOm;
}

function removeHashFromString(str) {
	str = str.split('#')[0];
	return str;
}

// GTM connection functions
function omPushEventToDataLayer(eventName, eventObj) {
	window.dataLayer = window.dataLayer || [];
	var eventObj = eventObj || {};
	eventObj.event = eventName || '';
	window.dataLayer.push(eventObj);
}

function omCreateEventParamsObj(eventCategory, eventAction, eventLabel, nonInter) {
	eventParams = {};
	eventParams.eventCategory = eventCategory;
	eventParams.eventAction = eventAction;
	eventParams.eventLabel = eventLabel;
	eventParams.nonInter = nonInter || false;
	return eventParams;
}

function omPushTrackingObjectToDataLayer(eventName, tmpOm) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({'event': eventName, 'tmpOm': tmpOm});
}

function omPrepareProductsString(sku) {
	if (!sku) return;
	var skuArray = sku.split(',');
	var productsArray = [];
	var qty;
	var productsItem;
	for (var i = 0; i < skuArray.length; i++) {
		qty = '1';
		productsItem = ';' + skuArray[i] + ';' + qty;
		productsArray.push(productsItem);
	}
	return productsArray.join(',');
}

/* Handlers */

if (window.addEventListener) {
	console.log("This is documemt.readyState: " + document.readyState);
    // Auto Tracking Page View On Load
	window.addEventListener('load', function(e) {
		prmOm.isWindowLoaded = true;
		if (prmOm.siteType != 'IFrame') {
			prmOm.isTrackPageViewCalled = true;
			if (document.location.href.toLowerCase().indexOf('/renewal-center/') != -1 && omGetQueryParam('serial')) {
				setTimeout(trackPageViewOnLoad, 1000);
			} else {
				setTimeout(trackPageViewOnLoad, 300);
			}
		}
	}, true);
	window.addEventListener('click', function(e) {
		omHandleClick(e, 'click');
	}, true);
	window.addEventListener('message', function(e) {
		omHandleMessage(e);
	}, true);
} else if (window.attachEvent) {
    // Auto Tracking Page View On Load
	window.attachEvent('onload', function(e) {
		prmOm.isWindowLoaded = true;
		if (prmOm.siteType != 'IFrame') {
			prmOm.isTrackPageViewCalled = true;
			if (document.location.href.toLowerCase().indexOf('/renewal-center/') != -1 && omGetQueryParam('serial')) {
				setTimeout(trackPageViewOnLoad, 1000);
			} else {
				setTimeout(trackPageViewOnLoad, 300);
			}
		}
	});
	window.attachEvent('onclick', function(e) {
		omHandleClick(e, 'click');
	});
	window.attachEvent('onmessage', function(e) {
		omHandleMessage(e);
	});
}

function omHandleClick(e, clickType) {
	var tmpOm = {};
	var objEvent = e || event || window.event;
	var target = objEvent.target || objEvent.srcElement;
	var elementNode;
	var saleButtonUrl;
	var saleButtonName;
	var saleButtonDetected = false;
	var ctaHref;
	var ctaName;
	var ctaDetected = false;
	var download = {
		detected: false
	};
	var exitDetected = false;
	var exitHref;
	var exitHost;
	var mailSendDetected = false;
	var phoneCallDetected = false;
	var bubbling;
	if (target.nodeName == 'HTML') {
		bubbling = false;
	} else {
		bubbling = true;
	}
	while (bubbling && target) {
		if (saleButtonDetected == false) {
			saleButtonUrl = omGetAbsoluteUrl(target.getAttribute('data-omniture-buy-url') || target.href || '');
			saleButtonName = target.getAttribute('data-omniture-sale-button-type') || '';
			if (saleButtonName || (saleButtonUrl && saleButtonUrl.search(prmOm.saleButtonRegexp) != -1)) {
				saleButtonDetected = true;
				tmpOm.dataOmnitureProductName = target.getAttribute('data-omniture-product-name') || '';
				tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'omHandleClick', ' > ', 0);
				tmpOm.isSalePage = true;
				trackSaleButton(saleButtonUrl, saleButtonName, clickType, tmpOm);
			}
		}
		if (download.detected == false) {
			elementNode = target.shadowRoot ? target.shadowRoot.querySelector('a[data-omniture-download-button-type]') : target;
			if (elementNode) {
				download.url = omGetAbsoluteUrl(elementNode.getAttribute('data-omniture-download-url') || elementNode.href || '');
				download.host = omGetHostName(download.url);
				if (download.url && download.host && (clickType == 'contextmenu' || !target.shadowRoot) && (download.host.search(prmOm.downloadRegexp) != -1 || download.url.search(prmOm.downloadHrefRegexp) != -1)) {
					if (document.location.hostname.search(prmOm.webdevSites) == -1) {
						download.detected = true;
						download.buttonType = elementNode.getAttribute('data-omniture-download-button-type') || '';
						tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'omHandleClick', ' > ', 0);
						tmpOm.prop20 = target.shadowRoot ? 'Is Shadow Root' : 'Is Not Shadow Root';
						trackDownload(download.url || download.shadowUrl, download.buttonType, clickType, tmpOm);
					}
				}
			}
		}
		if (ctaDetected == false) {
			elementNode = target.shadowRoot ? target.shadowRoot && target.shadowRoot.querySelector('a[data-omniture-cta-name]') : target;
			if (elementNode) {
				ctaName = elementNode.getAttribute('data-omniture-cta-name');
				if (ctaName) {
					ctaDetected = true;
					ctaHref = target.getAttribute('href');
					tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'omHandleClick', ' > ', 0);
					trackCta(ctaHref, ctaName, clickType, tmpOm);
				}
			}
		}
		if (exitDetected == false) {
			elementNode = target.shadowRoot ? target.shadowRoot && target.shadowRoot.querySelector('a[href][class="button"]') : target;
			if (elementNode) {
				exitHref = elementNode.getAttribute('href');
				exitHost = elementNode.hostname;
				if (exitHref && exitHost && exitHost.search(prmOm.siteRegexp) == -1 && exitHref.search(/^http.*/) == 0) {
					exitDetected = true;
					tmpOm.dataOmnitureProductName = elementNode.getAttribute('data-omniture-product-name') || '';
					tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'omHandleClick', ' > ', 0);
					trackExit(exitHref, clickType, tmpOm);
				}
			}
		}
		if (mailSendDetected == false) {
			var mailHref = target.href || '';
			if (mailHref.match(/^mailto\:/i)) {
				mailSendDetected = true;
				var eventParams = omCreateEventParamsObj('email', 'click', mailHref);
				omPushEventToDataLayer('email_click', eventParams);
			}
		}
		if (phoneCallDetected == false) {
			var phoneHref = target.href || '';
			if (phoneHref.match(/^tel\:/i)) {
				phoneCallDetected = true;
				var eventParams = omCreateEventParamsObj('telephone', 'click', phoneHref);
				omPushEventToDataLayer('phone_click', eventParams);
			}
		}
		if (target.nodeName == 'A') {
			bubbling = false;
		} else if (target != document.body && target != document) {
			target = target.parentNode;
		} else  {
			bubbling = false;
		}
	}
}

function omHandleMessage(e) {
	var omMessage = e.data || '';
	var omOrigin = e.origin || '';
	var tmpOm = {};
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, omMessage.debugTrace || '[NULL]', ' > ', 0);
	tmpOm.debugTrace = sng.apl(tmpOm.debugTrace, 'omHandleMessage', ' > ', 0);
	if (typeof e.data == 'string') {
		if (typeof JSON == 'object' && typeof JSON.stringify == 'function') {
			omMessage = omSafeParseJson(e.data);
		}
	}
	if (omMessage.sender == 'Omniture' && omMessage.eventKey != '') {
		if (omMessage.eventKey == 'trackCta') {
			trackCta(omMessage.ctaHref, omMessage.ctaName, omMessage.clickType, tmpOm, omMessage);
		} else if (omMessage.eventKey == 'trackDownload') {
			trackDownload(omMessage.downloadHref, omMessage.downloadType, omMessage.clickType, tmpOm, omMessage);
		} else if (omMessage.eventKey == 'exitHref') {
			trackExit(omMessage.exitHref, omMessage.clickType, tmpOm, omMessage);
		} else if (omMessage.eventKey == 'trackPageView') {
			//tracking for KSOS purchasing flow only
			//why is trackPageView in use instead of trackEvent?
			//trackPageView(kaspersky.pageName + ' > ' + omMessage.trackPageViewPageName, tmpOm, omMessage);
			trackEvent('KSOS Flow > ' + omMessage.trackPageViewPageName, null, tmpOm, omMessage);
		} else if (omMessage.eventKey == 'trackRegistration') {
			trackRegistration(omMessage.type, tmpOm, omMessage);
		} else if (omMessage.eventKey == 'trackSignIn') {
			trackSignIn(omMessage.type, tmpOm, omMessage);
		}
	} else if (omMessage == 'formSubmitted' && omOrigin == 'https://kaspersky-mkt-prod1-m.adobe-campaign.com') {
		trackEvent('Adobe Campaign form submitted', null, tmpOm);
	}
}

/**
 * @license
 * Adobe Visitor API for JavaScript version: 4.4.0
 * Copyright 2019 Adobe, Inc. All Rights Reserved
 * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
 */
var e=function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function n(){return{callbacks:{},add:function(e,t){this.callbacks[e]=this.callbacks[e]||[];var n=this.callbacks[e].push(t)-1,i=this;return function(){i.callbacks[e].splice(n,1)}},execute:function(e,t){if(this.callbacks[e]){t=void 0===t?[]:t,t=t instanceof Array?t:[t];try{for(;this.callbacks[e].length;){var n=this.callbacks[e].shift();"function"==typeof n?n.apply(null,t):n instanceof Array&&n[1].apply(n[0],t)}delete this.callbacks[e]}catch(e){}}},executeAll:function(e,t){(t||e&&!j.isObjectEmpty(e))&&Object.keys(this.callbacks).forEach(function(t){var n=void 0!==e[t]?e[t]:"";this.execute(t,n)},this)},hasCallbacks:function(){return Boolean(Object.keys(this.callbacks).length)}}}function i(e,t,n){var i=null==e?void 0:e[t];return void 0===i?n:i}function r(e){for(var t=/^\d+$/,n=0,i=e.length;n<i;n++)if(!t.test(e[n]))return!1;return!0}function a(e,t){for(;e.length<t.length;)e.push("0");for(;t.length<e.length;)t.push("0")}function o(e,t){for(var n=0;n<e.length;n++){var i=parseInt(e[n],10),r=parseInt(t[n],10);if(i>r)return 1;if(r>i)return-1}return 0}function s(e,t){if(e===t)return 0;var n=e.toString().split("."),i=t.toString().split(".");return r(n.concat(i))?(a(n,i),o(n,i)):NaN}function l(e){return e===Object(e)&&0===Object.keys(e).length}function c(e){return"function"==typeof e||e instanceof Array&&e.length}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){return!0};this.log=_e("log",e,t),this.warn=_e("warn",e,t),this.error=_e("error",e,t)}function d(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.isEnabled,n=e.cookieName,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.cookies;return t&&n&&r?{remove:function(){r.remove(n)},get:function(){var e=r.get(n),t={};try{t=JSON.parse(e)}catch(e){t={}}return t},set:function(e,t){t=t||{},r.set(n,JSON.stringify(e),{domain:t.optInCookieDomain||"",cookieLifetime:t.optInStorageExpiry||3419e4,expires:!0})}}:{get:Le,set:Le,remove:Le}}function f(e){this.name=this.constructor.name,this.message=e,"function"==typeof Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error(e).stack}function p(){function e(e,t){var n=Se(e);return n.length?n.every(function(e){return!!t[e]}):De(t)}function t(){M(b),O(ce.COMPLETE),_(h.status,h.permissions),m.set(h.permissions,{optInCookieDomain:l,optInStorageExpiry:c}),C.execute(xe)}function n(e){return function(n,i){if(!Ae(n))throw new Error("[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum.");return O(ce.CHANGED),Object.assign(b,ye(Se(n),e)),i||t(),h}}var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=i.doesOptInApply,a=i.previousPermissions,o=i.preOptInApprovals,s=i.isOptInStorageEnabled,l=i.optInCookieDomain,c=i.optInStorageExpiry,u=i.isIabContext,f=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},p=f.cookies,g=Pe(a);Re(g,"Invalid `previousPermissions`!"),Re(o,"Invalid `preOptInApprovals`!");var m=d({isEnabled:!!s,cookieName:"adobeujs-optin"},{cookies:p}),h=this,_=le(h),C=ge(),I=Me(g),v=Me(o),S=m.get(),D={},A=function(e,t){return ke(e)||t&&ke(t)?ce.COMPLETE:ce.PENDING}(I,S),y=function(e,t,n){var i=ye(pe,!r);return r?Object.assign({},i,e,t,n):i}(v,I,S),b=be(y),O=function(e){return A=e},M=function(e){return y=e};h.deny=n(!1),h.approve=n(!0),h.denyAll=h.deny.bind(h,pe),h.approveAll=h.approve.bind(h,pe),h.isApproved=function(t){return e(t,h.permissions)},h.isPreApproved=function(t){return e(t,v)},h.fetchPermissions=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=t?h.on(ce.COMPLETE,e):Le;return!r||r&&h.isComplete||!!o?e(h.permissions):t||C.add(xe,function(){return e(h.permissions)}),n},h.complete=function(){h.status===ce.CHANGED&&t()},h.registerPlugin=function(e){if(!e||!e.name||"function"!=typeof e.onRegister)throw new Error(je);D[e.name]||(D[e.name]=e,e.onRegister.call(e,h))},h.execute=Ne(D),Object.defineProperties(h,{permissions:{get:function(){return y}},status:{get:function(){return A}},Categories:{get:function(){return ue}},doesOptInApply:{get:function(){return!!r}},isPending:{get:function(){return h.status===ce.PENDING}},isComplete:{get:function(){return h.status===ce.COMPLETE}},__plugins:{get:function(){return Object.keys(D)}},isIabContext:{get:function(){return u}}})}function g(e,t){function n(){r=null,e.call(e,new f("The call took longer than you wanted!"))}function i(){r&&(clearTimeout(r),e.apply(e,arguments))}if(void 0===t)return e;var r=setTimeout(n,t);return i}function m(){if(window.__cmp)return window.__cmp;var e=window;if(e===window.top)return void Ie.error("__cmp not found");for(var t;!t;){e=e.parent;try{e.frames.__cmpLocator&&(t=e)}catch(e){}if(e===window.top)break}if(!t)return void Ie.error("__cmp not found");var n={};return window.__cmp=function(e,i,r){var a=Math.random()+"",o={__cmpCall:{command:e,parameter:i,callId:a}};n[a]=r,t.postMessage(o,"*")},window.addEventListener("message",function(e){var t=e.data;if("string"==typeof t)try{t=JSON.parse(e.data)}catch(e){}if(t.__cmpReturn){var i=t.__cmpReturn;n[i.callId]&&(n[i.callId](i.returnValue,i.success),delete n[i.callId])}},!1),window.__cmp}function h(){var e=this;e.name="iabPlugin",e.version="0.0.1";var t=ge(),n={allConsentData:null},i=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n[e]=t};e.fetchConsentData=function(e){var t=e.callback,n=e.timeout,i=g(t,n);r({callback:i})},e.isApproved=function(e){var t=e.callback,i=e.category,a=e.timeout;if(n.allConsentData)return t(null,s(i,n.allConsentData.vendorConsents,n.allConsentData.purposeConsents));var o=g(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.vendorConsents,a=n.purposeConsents;t(e,s(i,r,a))},a);r({category:i,callback:o})},e.onRegister=function(t){var n=Object.keys(de),i=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=i.purposeConsents,a=i.gdprApplies,o=i.vendorConsents;!e&&a&&o&&r&&(n.forEach(function(e){var n=s(e,o,r);t[n?"approve":"deny"](e,!0)}),t.complete())};e.fetchConsentData({callback:i})};var r=function(e){var r=e.callback;if(n.allConsentData)return r(null,n.allConsentData);t.add("FETCH_CONSENT_DATA",r);var s={};o(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=e.purposeConsents,o=e.gdprApplies,l=e.vendorConsents;(arguments.length>1?arguments[1]:void 0)&&(s={purposeConsents:r,gdprApplies:o,vendorConsents:l},i("allConsentData",s)),a(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(arguments.length>1?arguments[1]:void 0)&&(s.consentString=e.consentData,i("allConsentData",s)),t.execute("FETCH_CONSENT_DATA",[null,n.allConsentData])})})},a=function(e){var t=m();t&&t("getConsentData",null,e)},o=function(e){var t=Fe(de),n=m();n&&n("getVendorConsents",t,e)},s=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=!!t[de[e]];return i&&function(){return fe[e].every(function(e){return n[e]})}()}}var _="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};Object.assign=Object.assign||function(e){for(var t,n,i=1;i<arguments.length;++i){n=arguments[i];for(t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e};var C,I,v={HANDSHAKE:"HANDSHAKE",GETSTATE:"GETSTATE",PARENTSTATE:"PARENTSTATE"},S={MCMID:"MCMID",MCAID:"MCAID",MCAAMB:"MCAAMB",MCAAMLH:"MCAAMLH",MCOPTOUT:"MCOPTOUT",CUSTOMERIDS:"CUSTOMERIDS"},D={MCMID:"getMarketingCloudVisitorID",MCAID:"getAnalyticsVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",ALLFIELDS:"getVisitorValues"},A={CUSTOMERIDS:"getCustomerIDs"},y={MCMID:"getMarketingCloudVisitorID",MCAAMB:"getAudienceManagerBlob",MCAAMLH:"getAudienceManagerLocationHint",MCOPTOUT:"isOptedOut",MCAID:"getAnalyticsVisitorID",CUSTOMERIDS:"getCustomerIDs",ALLFIELDS:"getVisitorValues"},b={MC:"MCMID",A:"MCAID",AAM:"MCAAMB"},O={MCMID:"MCMID",MCOPTOUT:"MCOPTOUT",MCAID:"MCAID",MCAAMLH:"MCAAMLH",MCAAMB:"MCAAMB"},M={UNKNOWN:0,AUTHENTICATED:1,LOGGED_OUT:2},k={GLOBAL:"global"},E={MESSAGES:v,STATE_KEYS_MAP:S,ASYNC_API_MAP:D,SYNC_API_MAP:A,ALL_APIS:y,FIELDGROUP_TO_FIELD:b,FIELDS:O,AUTH_STATE:M,OPT_OUT:k},T=E.STATE_KEYS_MAP,L=function(e){function t(){}function n(t,n){var i=this;return function(){var r=e(0,t),a={};return a[t]=r,i.setStateAndPublish(a),n(r),r}}this.getMarketingCloudVisitorID=function(e){e=e||t;var i=this.findField(T.MCMID,e),r=n.call(this,T.MCMID,e);return void 0!==i?i:r()},this.getVisitorValues=function(e){this.getMarketingCloudVisitorID(function(t){e({MCMID:t})})}},P=E.MESSAGES,R=E.ASYNC_API_MAP,w=E.SYNC_API_MAP,F=function(){function e(){}function t(e,t){var n=this;return function(){return n.callbackRegistry.add(e,t),n.messageParent(P.GETSTATE),""}}function n(n){this[R[n]]=function(i){i=i||e;var r=this.findField(n,i),a=t.call(this,n,i);return void 0!==r?r:a()}}function i(t){this[w[t]]=function(){return this.findField(t,e)||{}}}Object.keys(R).forEach(n,this),Object.keys(w).forEach(i,this)},N=E.ASYNC_API_MAP,x=function(){Object.keys(N).forEach(function(e){this[N[e]]=function(t){this.callbackRegistry.add(e,t)}},this)},j=function(e,t){return t={exports:{}},e(t,t.exports),t.exports}(function(t,n){n.isObjectEmpty=function(e){return e===Object(e)&&0===Object.keys(e).length},n.isValueEmpty=function(e){return""===e||n.isObjectEmpty(e)},n.getIeVersion=function(){if(document.documentMode)return document.documentMode;for(var e=7;e>4;e--){var t=document.createElement("div");if(t.innerHTML="\x3c!--[if IE "+e+"]><span></span><![endif]--\x3e",t.getElementsByTagName("span").length)return t=null,e;t=null}return null},n.encodeAndBuildRequest=function(e,t){return e.map(encodeURIComponent).join(t)},n.isObject=function(t){return null!==t&&"object"===e(t)&&!1===Array.isArray(t)},n.defineGlobalNamespace=function(){return window.adobe=n.isObject(window.adobe)?window.adobe:{},window.adobe},n.pluck=function(e,t){return t.reduce(function(t,n){return e[n]&&(t[n]=e[n]),t},Object.create(null))},n.parseOptOut=function(e,t,n){t||(t=n,e.d_optout&&e.d_optout instanceof Array&&(t=e.d_optout.join(",")));var i=parseInt(e.d_ottl,10);return isNaN(i)&&(i=7200),{optOut:t,d_ottl:i}},n.normalizeBoolean=function(e){var t=e;return"true"===e?t=!0:"false"===e&&(t=!1),t}}),V=(j.isObjectEmpty,j.isValueEmpty,j.getIeVersion,j.encodeAndBuildRequest,j.isObject,j.defineGlobalNamespace,j.pluck,j.parseOptOut,j.normalizeBoolean,n),H=E.MESSAGES,U={0:"prefix",1:"orgID",2:"state"},B=function(e,t){this.parse=function(e){try{var t={};return e.data.split("|").forEach(function(e,n){if(void 0!==e){t[U[n]]=2!==n?e:JSON.parse(e)}}),t}catch(e){}},this.isInvalid=function(n){var i=this.parse(n);if(!i||Object.keys(i).length<2)return!0;var r=e!==i.orgID,a=!t||n.origin!==t,o=-1===Object.keys(H).indexOf(i.prefix);return r||a||o},this.send=function(n,i,r){var a=i+"|"+e;r&&r===Object(r)&&(a+="|"+JSON.stringify(r));try{n.postMessage(a,t)}catch(e){}}},G=E.MESSAGES,Y=function(e,t,n,i){function r(e){Object.assign(p,e)}function a(e){Object.assign(p.state,e),Object.assign(p.state.ALLFIELDS,e),p.callbackRegistry.executeAll(p.state)}function o(e){if(!h.isInvalid(e)){m=!1;var t=h.parse(e);p.setStateAndPublish(t.state)}}function s(e){!m&&g&&(m=!0,h.send(i,e))}function l(){r(new L(n._generateID)),p.getMarketingCloudVisitorID(),p.callbackRegistry.executeAll(p.state,!0),_.removeEventListener("message",c)}function c(e){if(!h.isInvalid(e)){var t=h.parse(e);m=!1,_.clearTimeout(p._handshakeTimeout),_.removeEventListener("message",c),r(new F(p)),_.addEventListener("message",o),p.setStateAndPublish(t.state),p.callbackRegistry.hasCallbacks()&&s(G.GETSTATE)}}function u(){g&&postMessage?(_.addEventListener("message",c),s(G.HANDSHAKE),p._handshakeTimeout=setTimeout(l,250)):l()}function d(){_.s_c_in||(_.s_c_il=[],_.s_c_in=0),p._c="Visitor",p._il=_.s_c_il,p._in=_.s_c_in,p._il[p._in]=p,_.s_c_in++}function f(){function e(e){0!==e.indexOf("_")&&"function"==typeof n[e]&&(p[e]=function(){})}Object.keys(n).forEach(e),p.getSupplementalDataID=n.getSupplementalDataID,p.isAllowed=function(){return!0}}var p=this,g=t.whitelistParentDomain;p.state={ALLFIELDS:{}},p.version=n.version,p.marketingCloudOrgID=e,p.cookieDomain=n.cookieDomain||"",p._instanceType="child";var m=!1,h=new B(e,g);p.callbackRegistry=V(),p.init=function(){d(),f(),r(new x(p)),u()},p.findField=function(e,t){if(void 0!==p.state[e])return t(p.state[e]),p.state[e]},p.messageParent=s,p.setStateAndPublish=a},q=E.MESSAGES,X=E.ALL_APIS,W=E.ASYNC_API_MAP,J=E.FIELDGROUP_TO_FIELD,K=function(e,t){function n(){var t={};return Object.keys(X).forEach(function(n){var i=X[n],r=e[i]();j.isValueEmpty(r)||(t[n]=r)}),t}function i(){var t=[];return e._loading&&Object.keys(e._loading).forEach(function(n){if(e._loading[n]){var i=J[n];t.push(i)}}),t.length?t:null}function r(t){return function n(r){var a=i();if(a){var o=W[a[0]];e[o](n,!0)}else t()}}function a(e,i){var r=n();t.send(e,i,r)}function o(e){l(e),a(e,q.HANDSHAKE)}function s(e){r(function(){a(e,q.PARENTSTATE)})()}function l(n){function i(i){r.call(e,i),t.send(n,q.PARENTSTATE,{CUSTOMERIDS:e.getCustomerIDs()})}var r=e.setCustomerIDs;e.setCustomerIDs=i}return function(e){if(!t.isInvalid(e)){(t.parse(e).prefix===q.HANDSHAKE?o:s)(e.source)}}},z=function(e,t){function n(e){return function(n){i[e]=n,r++,r===a&&t(i)}}var i={},r=0,a=Object.keys(e).length;Object.keys(e).forEach(function(t){var i=e[t];if(i.fn){var r=i.args||[];r.unshift(n(t)),i.fn.apply(i.context||null,r)}})},Q={get:function(e){e=encodeURIComponent(e);var t=(";"+document.cookie).split(" ").join(";"),n=t.indexOf(";"+e+"="),i=n<0?n:t.indexOf(";",n+1);return n<0?"":decodeURIComponent(t.substring(n+2+e.length,i<0?t.length:i))},set:function(e,t,n){var r=i(n,"cookieLifetime"),a=i(n,"expires"),o=i(n,"domain"),s=i(n,"secure"),l=s?"Secure":"";if(a&&"SESSION"!==r&&"NONE"!==r){var c=""!==t?parseInt(r||0,10):-60;if(c)a=new Date,a.setTime(a.getTime()+1e3*c);else if(1===a){a=new Date;var u=a.getYear();a.setYear(u+2+(u<1900?1900:0))}}else a=0;return e&&"NONE"!==r?(document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+"; path=/;"+(a?" expires="+a.toGMTString()+";":"")+(o?" domain="+o+";":"")+l,this.get(e)===t):0},remove:function(e,t){var n=i(t,"domain");n=n?" domain="+n+";":"",document.cookie=encodeURIComponent(e)+"=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"+n}},$=function(e){var t;!e&&_.location&&(e=_.location.hostname),t=e;var n,i=t.split(".");for(n=i.length-2;n>=0;n--)if(t=i.slice(n).join("."),Q.set("test","cookie",{domain:t}))return Q.remove("test",{domain:t}),t;return""},Z={compare:s,isLessThan:function(e,t){return s(e,t)<0},areVersionsDifferent:function(e,t){return 0!==s(e,t)},isGreaterThan:function(e,t){return s(e,t)>0},isEqual:function(e,t){return 0===s(e,t)}},ee=!!_.postMessage,te={postMessage:function(e,t,n){var i=1;t&&(ee?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+i+++"&"+e))},receiveMessage:function(e,t){var n;try{ee&&(e&&(n=function(n){if("string"==typeof t&&n.origin!==t||"[object Function]"===Object.prototype.toString.call(t)&&!1===t(n.origin))return!1;e(n)}),_.addEventListener?_[e?"addEventListener":"removeEventListener"]("message",n):_[e?"attachEvent":"detachEvent"]("onmessage",n))}catch(e){}}},ne=function(e){var t,n,i="0123456789",r="",a="",o=8,s=10,l=10;if(1==e){for(i+="ABCDEF",t=0;16>t;t++)n=Math.floor(Math.random()*o),r+=i.substring(n,n+1),n=Math.floor(Math.random()*o),a+=i.substring(n,n+1),o=16;return r+"-"+a}for(t=0;19>t;t++)n=Math.floor(Math.random()*s),r+=i.substring(n,n+1),0===t&&9==n?s=3:(1==t||2==t)&&10!=s&&2>n?s=10:2<t&&(s=10),n=Math.floor(Math.random()*l),a+=i.substring(n,n+1),0===t&&9==n?l=3:(1==t||2==t)&&10!=l&&2>n?l=10:2<t&&(l=10);return r+a},ie=function(e,t){return{corsMetadata:function(){var e="none",t=!0;return"undefined"!=typeof XMLHttpRequest&&XMLHttpRequest===Object(XMLHttpRequest)&&("withCredentials"in new XMLHttpRequest?e="XMLHttpRequest":"undefined"!=typeof XDomainRequest&&XDomainRequest===Object(XDomainRequest)&&(t=!1),Object.prototype.toString.call(_.HTMLElement).indexOf("Constructor")>0&&(t=!1)),{corsType:e,corsCookiesEnabled:t}}(),getCORSInstance:function(){return"none"===this.corsMetadata.corsType?null:new _[this.corsMetadata.corsType]},fireCORS:function(t,n,i){function r(e){var n;try{if((n=JSON.parse(e))!==Object(n))return void a.handleCORSError(t,null,"Response is not JSON")}catch(e){return void a.handleCORSError(t,e,"Error parsing response as JSON")}try{for(var i=t.callback,r=_,o=0;o<i.length;o++)r=r[i[o]];r(n)}catch(e){a.handleCORSError(t,e,"Error forming callback function")}}var a=this;n&&(t.loadErrorHandler=n);try{var o=this.getCORSInstance();o.open("get",t.corsUrl+"&ts="+(new Date).getTime(),!0),"XMLHttpRequest"===this.corsMetadata.corsType&&(o.withCredentials=!0,o.timeout=e.loadTimeout,o.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),o.onreadystatechange=function(){4===this.readyState&&200===this.status&&r(this.responseText)}),o.onerror=function(e){a.handleCORSError(t,e,"onerror")},o.ontimeout=function(e){a.handleCORSError(t,e,"ontimeout")},o.send(),e._log.requests.push(t.corsUrl)}catch(e){this.handleCORSError(t,e,"try-catch")}},handleCORSError:function(t,n,i){e.CORSErrors.push({corsData:t,error:n,description:i}),t.loadErrorHandler&&("ontimeout"===i?t.loadErrorHandler(!0):t.loadErrorHandler(!1))}}},re={POST_MESSAGE_ENABLED:!!_.postMessage,DAYS_BETWEEN_SYNC_ID_CALLS:1,MILLIS_PER_DAY:864e5,ADOBE_MC:"adobe_mc",ADOBE_MC_SDID:"adobe_mc_sdid",VALID_VISITOR_ID_REGEX:/^[0-9a-fA-F\-]+$/,ADOBE_MC_TTL_IN_MIN:5,VERSION_REGEX:/vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,FIRST_PARTY_SERVER_COOKIE:"s_ecid"},ae=function(e,t){var n=_.document;return{THROTTLE_START:3e4,MAX_SYNCS_LENGTH:649,throttleTimerSet:!1,id:null,onPagePixels:[],iframeHost:null,getIframeHost:function(e){if("string"==typeof e){var t=e.split("/");return t[0]+"//"+t[2]}},subdomain:null,url:null,getUrl:function(){var t,i="http://fast.",r="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.origin);return this.subdomain||(this.subdomain="nosubdomainreturned"),e.loadSSL&&(i=e.idSyncSSLUseAkamai?"https://fast.":"https://"),t=i+this.subdomain+".demdex.net/dest5.html"+r,this.iframeHost=this.getIframeHost(t),this.id="destination_publishing_iframe_"+this.subdomain+"_"+e.idSyncContainerID,t},checkDPIframeSrc:function(){var t="?d_nsid="+e.idSyncContainerID+"#"+encodeURIComponent(n.location.href);"string"==typeof e.dpIframeSrc&&e.dpIframeSrc.length&&(this.id="destination_publishing_iframe_"+(e._subdomain||this.subdomain||(new Date).getTime())+"_"+e.idSyncContainerID,this.iframeHost=this.getIframeHost(e.dpIframeSrc),this.url=e.dpIframeSrc+t)},idCallNotProcesssed:null,doAttachIframe:!1,startedAttachingIframe:!1,iframeHasLoaded:null,iframeIdChanged:null,newIframeCreated:null,originalIframeHasLoadedAlready:null,iframeLoadedCallbacks:[],regionChanged:!1,timesRegionChanged:0,sendingMessages:!1,messages:[],messagesPosted:[],messagesReceived:[],messageSendingInterval:re.POST_MESSAGE_ENABLED?null:100,onPageDestinationsFired:[],jsonForComparison:[],jsonDuplicates:[],jsonWaiting:[],jsonProcessed:[],canSetThirdPartyCookies:!0,receivedThirdPartyCookiesNotification:!1,readyToAttachIframePreliminary:function(){return!(e.idSyncDisableSyncs||e.disableIdSyncs||e.idSyncDisable3rdPartySyncing||e.disableThirdPartyCookies||e.disableThirdPartyCalls)},readyToAttachIframe:function(){return this.readyToAttachIframePreliminary()&&(this.doAttachIframe||e._doAttachIframe)&&(this.subdomain&&"nosubdomainreturned"!==this.subdomain||e._subdomain)&&this.url&&!this.startedAttachingIframe},attachIframe:function(){function e(){r=n.createElement("iframe"),r.sandbox="allow-scripts allow-same-origin",r.title="Adobe ID Syncing iFrame",r.id=i.id,r.name=i.id+"_name",r.style.cssText="display: none; width: 0; height: 0;",r.src=i.url,i.newIframeCreated=!0,t(),n.body.appendChild(r)}function t(e){r.addEventListener("load",function(){r.className="aamIframeLoaded",i.iframeHasLoaded=!0,i.fireIframeLoadedCallbacks(e),i.requestToProcess()})}this.startedAttachingIframe=!0;var i=this,r=n.getElementById(this.id);r?"IFRAME"!==r.nodeName?(this.id+="_2",this.iframeIdChanged=!0,e()):(this.newIframeCreated=!1,"aamIframeLoaded"!==r.className?(this.originalIframeHasLoadedAlready=!1,t("The destination publishing iframe already exists from a different library, but hadn't loaded yet.")):(this.originalIframeHasLoadedAlready=!0,this.iframeHasLoaded=!0,this.iframe=r,this.fireIframeLoadedCallbacks("The destination publishing iframe already exists from a different library, and had loaded alresady."),this.requestToProcess())):e(),this.iframe=r},fireIframeLoadedCallbacks:function(e){this.iframeLoadedCallbacks.forEach(function(t){"function"==typeof t&&t({message:e||"The destination publishing iframe was attached and loaded successfully."})}),this.iframeLoadedCallbacks=[]},requestToProcess:function(t){function n(){r.jsonForComparison.push(t),r.jsonWaiting.push(t),r.processSyncOnPage(t)}var i,r=this;if(t===Object(t)&&t.ibs)if(i=JSON.stringify(t.ibs||[]),this.jsonForComparison.length){var a,o,s,l=!1;for(a=0,o=this.jsonForComparison.length;a<o;a++)if(s=this.jsonForComparison[a],i===JSON.stringify(s.ibs||[])){l=!0;break}l?this.jsonDuplicates.push(t):n()}else n();if((this.receivedThirdPartyCookiesNotification||!re.POST_MESSAGE_ENABLED||this.iframeHasLoaded)&&this.jsonWaiting.length){var c=this.jsonWaiting.shift();this.process(c),this.requestToProcess()}e.idSyncDisableSyncs||e.disableIdSyncs||!this.iframeHasLoaded||!this.messages.length||this.sendingMessages||(this.throttleTimerSet||(this.throttleTimerSet=!0,setTimeout(function(){r.messageSendingInterval=re.POST_MESSAGE_ENABLED?null:150},this.THROTTLE_START)),this.sendingMessages=!0,this.sendMessages())},getRegionAndCheckIfChanged:function(t,n){var i=e._getField("MCAAMLH"),r=t.d_region||t.dcs_region;return i?r&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",r),parseInt(i,10)!==r&&(this.regionChanged=!0,this.timesRegionChanged++,e._setField("MCSYNCSOP",""),e._setField("MCSYNCS",""),i=r)):(i=r)&&(e._setFieldExpire("MCAAMLH",n),e._setField("MCAAMLH",i)),i||(i=""),i},processSyncOnPage:function(e){var t,n,i,r;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(i=0;i<n;i++)r=t[i],r.syncOnPage&&this.checkFirstPartyCookie(r,"","syncOnPage")},process:function(e){var t,n,i,r,a,o=encodeURIComponent,s=!1;if((t=e.ibs)&&t instanceof Array&&(n=t.length))for(s=!0,i=0;i<n;i++)r=t[i],a=[o("ibs"),o(r.id||""),o(r.tag||""),j.encodeAndBuildRequest(r.url||[],","),o(r.ttl||""),"","",r.fireURLSync?"true":"false"],r.syncOnPage||(this.canSetThirdPartyCookies?this.addMessage(a.join("|")):r.fireURLSync&&this.checkFirstPartyCookie(r,a.join("|")));s&&this.jsonProcessed.push(e)},checkFirstPartyCookie:function(t,n,i){var r="syncOnPage"===i,a=r?"MCSYNCSOP":"MCSYNCS";e._readVisitor();var o,s,l=e._getField(a),c=!1,u=!1,d=Math.ceil((new Date).getTime()/re.MILLIS_PER_DAY);l?(o=l.split("*"),s=this.pruneSyncData(o,t.id,d),c=s.dataPresent,u=s.dataValid,c&&u||this.fireSync(r,t,n,o,a,d)):(o=[],this.fireSync(r,t,n,o,a,d))},pruneSyncData:function(e,t,n){var i,r,a,o=!1,s=!1;for(r=0;r<e.length;r++)i=e[r],a=parseInt(i.split("-")[1],10),i.match("^"+t+"-")?(o=!0,n<a?s=!0:(e.splice(r,1),r--)):n>=a&&(e.splice(r,1),r--);return{dataPresent:o,dataValid:s}},manageSyncsSize:function(e){if(e.join("*").length>this.MAX_SYNCS_LENGTH)for(e.sort(function(e,t){return parseInt(e.split("-")[1],10)-parseInt(t.split("-")[1],10)});e.join("*").length>this.MAX_SYNCS_LENGTH;)e.shift()},fireSync:function(t,n,i,r,a,o){var s=this;if(t){if("img"===n.tag){var l,c,u,d,f=n.url,p=e.loadSSL?"https:":"http:";for(l=0,c=f.length;l<c;l++){u=f[l],d=/^\/\//.test(u);var g=new Image;g.addEventListener("load",function(t,n,i,r){return function(){s.onPagePixels[t]=null,e._readVisitor();var o,l=e._getField(a),c=[];if(l){o=l.split("*");var u,d,f;for(u=0,d=o.length;u<d;u++)f=o[u],f.match("^"+n.id+"-")||c.push(f)}s.setSyncTrackingData(c,n,i,r)}}(this.onPagePixels.length,n,a,o)),g.src=(d?p:"")+u,this.onPagePixels.push(g)}}}else this.addMessage(i),this.setSyncTrackingData(r,n,a,o)},addMessage:function(t){var n=encodeURIComponent,i=n(e._enableErrorReporting?"---destpub-debug---":"---destpub---");this.messages.push((re.POST_MESSAGE_ENABLED?"":i)+t)},setSyncTrackingData:function(t,n,i,r){t.push(n.id+"-"+(r+Math.ceil(n.ttl/60/24))),this.manageSyncsSize(t),e._setField(i,t.join("*"))},sendMessages:function(){var e,t=this,n="",i=encodeURIComponent;this.regionChanged&&(n=i("---destpub-clear-dextp---"),this.regionChanged=!1),this.messages.length?re.POST_MESSAGE_ENABLED?(e=n+i("---destpub-combined---")+this.messages.join("%01"),this.postMessage(e),this.messages=[],this.sendingMessages=!1):(e=this.messages.shift(),this.postMessage(n+e),setTimeout(function(){t.sendMessages()},this.messageSendingInterval)):this.sendingMessages=!1},postMessage:function(e){te.postMessage(e,this.url,this.iframe.contentWindow),this.messagesPosted.push(e)},receiveMessage:function(e){var t,n=/^---destpub-to-parent---/;"string"==typeof e&&n.test(e)&&(t=e.replace(n,"").split("|"),"canSetThirdPartyCookies"===t[0]&&(this.canSetThirdPartyCookies="true"===t[1],this.receivedThirdPartyCookiesNotification=!0,this.requestToProcess()),this.messagesReceived.push(e))},processIDCallData:function(i){(null==this.url||i.subdomain&&"nosubdomainreturned"===this.subdomain)&&("string"==typeof e._subdomain&&e._subdomain.length?this.subdomain=e._subdomain:this.subdomain=i.subdomain||"",this.url=this.getUrl()),i.ibs instanceof Array&&i.ibs.length&&(this.doAttachIframe=!0),this.readyToAttachIframe()&&(e.idSyncAttachIframeOnWindowLoad?(t.windowLoaded||"complete"===n.readyState||"loaded"===n.readyState)&&this.attachIframe():this.attachIframeASAP()),"function"==typeof e.idSyncIDCallResult?e.idSyncIDCallResult(i):this.requestToProcess(i),"function"==typeof e.idSyncAfterIDCallResult&&e.idSyncAfterIDCallResult(i)},canMakeSyncIDCall:function(t,n){return e._forceSyncIDCall||!t||n-t>re.DAYS_BETWEEN_SYNC_ID_CALLS},attachIframeASAP:function(){function e(){t.startedAttachingIframe||(n.body?t.attachIframe():setTimeout(e,30))}var t=this;e()}}},oe={audienceManagerServer:{},audienceManagerServerSecure:{},cookieDomain:{},cookieLifetime:{},cookieName:{},doesOptInApply:{},disableThirdPartyCalls:{},discardTrackingServerECID:{},idSyncAfterIDCallResult:{},idSyncAttachIframeOnWindowLoad:{},idSyncContainerID:{},idSyncDisable3rdPartySyncing:{},disableThirdPartyCookies:{},idSyncDisableSyncs:{},disableIdSyncs:{},idSyncIDCallResult:{},idSyncSSLUseAkamai:{},isCoopSafe:{},isIabContext:{},isOptInStorageEnabled:{},loadSSL:{},loadTimeout:{},marketingCloudServer:{},marketingCloudServerSecure:{},optInCookieDomain:{},optInStorageExpiry:{},overwriteCrossDomainMCIDAndAID:{},preOptInApprovals:{},previousPermissions:{},resetBeforeVersion:{},sdidParamExpiry:{},serverState:{},sessionCookieName:{},secureCookie:{},takeTimeoutMetrics:{},trackingServer:{},trackingServerSecure:{},whitelistIframeDomains:{},whitelistParentDomain:{}},se={getConfigNames:function(){return Object.keys(oe)},getConfigs:function(){return oe},normalizeConfig:function(e){return"function"!=typeof e?e:e()}},le=function(e){var t={};return e.on=function(e,n,i){if(!n||"function"!=typeof n)throw new Error("[ON] Callback should be a function.");t.hasOwnProperty(e)||(t[e]=[]);var r=t[e].push({callback:n,context:i})-1;return function(){t[e].splice(r,1),t[e].length||delete t[e]}},e.off=function(e,n){t.hasOwnProperty(e)&&(t[e]=t[e].filter(function(e){if(e.callback!==n)return e}))},e.publish=function(e){if(t.hasOwnProperty(e)){var n=[].slice.call(arguments,1);t[e].slice(0).forEach(function(e){e.callback.apply(e.context,n)})}},e.publish},ce={PENDING:"pending",CHANGED:"changed",COMPLETE:"complete"},ue={AAM:"aam",ADCLOUD:"adcloud",ANALYTICS:"aa",CAMPAIGN:"campaign",ECID:"ecid",LIVEFYRE:"livefyre",TARGET:"target",VIDEO_ANALYTICS:"videoaa"},de=(C={},t(C,ue.AAM,565),t(C,ue.ECID,565),C),fe=(I={},t(I,ue.AAM,[1,2,5]),t(I,ue.ECID,[1,2,5]),I),pe=function(e){return Object.keys(e).map(function(t){return e[t]})}(ue),ge=function(){var e={};return e.callbacks=Object.create(null),e.add=function(t,n){if(!c(n))throw new Error("[callbackRegistryFactory] Make sure callback is a function or an array of functions.");e.callbacks[t]=e.callbacks[t]||[];var i=e.callbacks[t].push(n)-1;return function(){e.callbacks[t].splice(i,1)}},e.execute=function(t,n){if(e.callbacks[t]){n=void 0===n?[]:n,n=n instanceof Array?n:[n];try{for(;e.callbacks[t].length;){var i=e.callbacks[t].shift();"function"==typeof i?i.apply(null,n):i instanceof Array&&i[1].apply(i[0],n)}delete e.callbacks[t]}catch(e){}}},e.executeAll=function(t,n){(n||t&&!l(t))&&Object.keys(e.callbacks).forEach(function(n){var i=void 0!==t[n]?t[n]:"";e.execute(n,i)},e)},e.hasCallbacks=function(){return Boolean(Object.keys(e.callbacks).length)},e},me=function(){},he=function(e){var t=window,n=t.console;return!!n&&"function"==typeof n[e]},_e=function(e,t,n){return n()?function(){if(he(e)){for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];console[e].apply(console,[t].concat(i))}}:me},Ce=u,Ie=new Ce("[ADOBE OPT-IN]"),ve=function(t,n){return e(t)===n},Se=function(e,t){return e instanceof Array?e:ve(e,"string")?[e]:t||[]},De=function(e){var t=Object.keys(e);return!!t.length&&t.every(function(t){return!0===e[t]})},Ae=function(e){return!(!e||Oe(e))&&Se(e).every(function(e){return pe.indexOf(e)>-1})},ye=function(e,t){return e.reduce(function(e,n){return e[n]=t,e},{})},be=function(e){return JSON.parse(JSON.stringify(e))},Oe=function(e){return"[object Array]"===Object.prototype.toString.call(e)&&!e.length},Me=function(e){if(Te(e))return e;try{return JSON.parse(e)}catch(e){return{}}},ke=function(e){return void 0===e||(Te(e)?Ae(Object.keys(e)):Ee(e))},Ee=function(e){try{var t=JSON.parse(e);return!!e&&ve(e,"string")&&Ae(Object.keys(t))}catch(e){return!1}},Te=function(e){return null!==e&&ve(e,"object")&&!1===Array.isArray(e)},Le=function(){},Pe=function(e){return ve(e,"function")?e():e},Re=function(e,t){ke(e)||Ie.error("".concat(t))},we=function(e){return Object.keys(e).map(function(t){return e[t]})},Fe=function(e){return we(e).filter(function(e,t,n){return n.indexOf(e)===t})},Ne=function(e){return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=t.command,i=t.params,r=void 0===i?{}:i,a=t.callback,o=void 0===a?Le:a;if(!n||-1===n.indexOf("."))throw new Error("[OptIn.execute] Please provide a valid command.");try{var s=n.split("."),l=e[s[0]],c=s[1];if(!l||"function"!=typeof l[c])throw new Error("Make sure the plugin and API name exist.");var u=Object.assign(r,{callback:o});l[c].call(l,u)}catch(e){Ie.error("[execute] Something went wrong: "+e.message)}}};f.prototype=Object.create(Error.prototype),f.prototype.constructor=f;var xe="fetchPermissions",je="[OptIn#registerPlugin] Plugin is invalid.";p.Categories=ue,p.TimeoutError=f;var Ve=Object.freeze({OptIn:p,IabPlugin:h}),He=function(e,t){e.publishDestinations=function(n){var i=arguments[1],r=arguments[2];try{r="function"==typeof r?r:n.callback}catch(e){r=function(){}}var a=t;if(!a.readyToAttachIframePreliminary())return void r({error:"The destination publishing iframe is disabled in the Visitor library."});if("string"==typeof n){if(!n.length)return void r({error:"subdomain is not a populated string."});if(!(i instanceof Array&&i.length))return void r({error:"messages is not a populated array."});var o=!1;if(i.forEach(function(e){
"string"==typeof e&&e.length&&(a.addMessage(e),o=!0)}),!o)return void r({error:"None of the messages are populated strings."})}else{if(!j.isObject(n))return void r({error:"Invalid parameters passed."});var s=n;if("string"!=typeof(n=s.subdomain)||!n.length)return void r({error:"config.subdomain is not a populated string."});var l=s.urlDestinations;if(!(l instanceof Array&&l.length))return void r({error:"config.urlDestinations is not a populated array."});var c=[];l.forEach(function(e){j.isObject(e)&&(e.hideReferrer?e.message&&a.addMessage(e.message):c.push(e))});!function e(){c.length&&setTimeout(function(){var t=new Image,n=c.shift();t.src=n.url,a.onPageDestinationsFired.push(n),e()},100)}()}a.iframe?(r({message:"The destination publishing iframe is already attached and loaded."}),a.requestToProcess()):!e.subdomain&&e._getField("MCMID")?(a.subdomain=n,a.doAttachIframe=!0,a.url=a.getUrl(),a.readyToAttachIframe()?(a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through this API call. Result: "+(e.message||"no result")})}),a.attachIframe()):r({error:"Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."})):a.iframeLoadedCallbacks.push(function(e){r({message:"Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: "+(e.message||"no result")})})}},Ue=function e(t){function n(e,t){return e>>>t|e<<32-t}for(var i,r,a=Math.pow,o=a(2,32),s="",l=[],c=8*t.length,u=e.h=e.h||[],d=e.k=e.k||[],f=d.length,p={},g=2;f<64;g++)if(!p[g]){for(i=0;i<313;i+=g)p[i]=g;u[f]=a(g,.5)*o|0,d[f++]=a(g,1/3)*o|0}for(t+="ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã¢â‚¬Å“ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â²ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¹ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â²ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â½ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚ÂÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¾ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬ ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â‚¬Å¾Ã‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬ ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Â¦Ãƒâ€šÃ‚Â¡ÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€¦Ã‚Â¡ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¬";t.length%64-56;)t+="\0";for(i=0;i<t.length;i++){if((r=t.charCodeAt(i))>>8)return;l[i>>2]|=r<<(3-i)%4*8}for(l[l.length]=c/o|0,l[l.length]=c,r=0;r<l.length;){var m=l.slice(r,r+=16),h=u;for(u=u.slice(0,8),i=0;i<64;i++){var _=m[i-15],C=m[i-2],I=u[0],v=u[4],S=u[7]+(n(v,6)^n(v,11)^n(v,25))+(v&u[5]^~v&u[6])+d[i]+(m[i]=i<16?m[i]:m[i-16]+(n(_,7)^n(_,18)^_>>>3)+m[i-7]+(n(C,17)^n(C,19)^C>>>10)|0);u=[S+((n(I,2)^n(I,13)^n(I,22))+(I&u[1]^I&u[2]^u[1]&u[2]))|0].concat(u),u[4]=u[4]+S|0}for(i=0;i<8;i++)u[i]=u[i]+h[i]|0}for(i=0;i<8;i++)for(r=3;r+1;r--){var D=u[i]>>8*r&255;s+=(D<16?0:"")+D.toString(16)}return s},Be=function(e,t){return"SHA-256"!==t&&"SHA256"!==t&&"sha256"!==t&&"sha-256"!==t||(e=Ue(e)),e},Ge=function(e){return String(e).trim().toLowerCase()},Ye=Ve.OptIn;j.defineGlobalNamespace(),window.adobe.OptInCategories=Ye.Categories;var qe=function(t,n,i){function r(e){var t=e;return function(e){var n=e||v.location.href;try{var i=g._extractParamFromUri(n,t);if(i)return w.parsePipeDelimetedKeyValues(i)}catch(e){}}}function a(e){function t(e,t,n){e&&e.match(re.VALID_VISITOR_ID_REGEX)&&(n===A&&(I=!0),t(e))}t(e[A],g.setMarketingCloudVisitorID,A),g._setFieldExpire(k,-1),t(e[O],g.setAnalyticsVisitorID)}function o(e){e=e||{},g._supplementalDataIDCurrent=e.supplementalDataIDCurrent||"",g._supplementalDataIDCurrentConsumed=e.supplementalDataIDCurrentConsumed||{},g._supplementalDataIDLast=e.supplementalDataIDLast||"",g._supplementalDataIDLastConsumed=e.supplementalDataIDLastConsumed||{}}function s(e){function t(e,t,n){return n=n?n+="|":n,n+=e+"="+encodeURIComponent(t)}function n(e,n){var i=n[0],r=n[1];return null!=r&&r!==T&&(e=t(i,r,e)),e}var i=e.reduce(n,"");return function(e){var t=w.getTimestampInSeconds();return e=e?e+="|":e,e+="TS="+t}(i)}function l(e){var t=e.minutesToLive,n="";return(g.idSyncDisableSyncs||g.disableIdSyncs)&&(n=n||"Error: id syncs have been disabled"),"string"==typeof e.dpid&&e.dpid.length||(n=n||"Error: config.dpid is empty"),"string"==typeof e.url&&e.url.length||(n=n||"Error: config.url is empty"),void 0===t?t=20160:(t=parseInt(t,10),(isNaN(t)||t<=0)&&(n=n||"Error: config.minutesToLive needs to be a positive number")),{error:n,ttl:t}}function c(){return!!g.configs.doesOptInApply&&!(m.optIn.isComplete&&u())}function u(){return g.configs.isIabContext?m.optIn.isApproved(m.optIn.Categories.ECID)&&C:m.optIn.isApproved(m.optIn.Categories.ECID)}function d(e,t){if(C=!0,e)throw new Error("[IAB plugin] : "+e);t.gdprApplies&&(h=t.consentString),g.init(),p()}function f(){m.optIn.isApproved(m.optIn.Categories.ECID)&&(g.configs.isIabContext?m.optIn.execute({command:"iabPlugin.fetchConsentData",callback:d}):(g.init(),p()))}function p(){m.optIn.off("complete",f)}if(!i||i.split("").reverse().join("")!==t)throw new Error("Please use `Visitor.getInstance` to instantiate Visitor.");var g=this,m=window.adobe,h="",C=!1,I=!1;g.version="4.4.0";var v=_,S=v.Visitor;S.version=g.version,S.AuthState=E.AUTH_STATE,S.OptOut=E.OPT_OUT,v.s_c_in||(v.s_c_il=[],v.s_c_in=0),g._c="Visitor",g._il=v.s_c_il,g._in=v.s_c_in,g._il[g._in]=g,v.s_c_in++,g._instanceType="regular",g._log={requests:[]},g.marketingCloudOrgID=t,g.cookieName="AMCV_"+t,g.sessionCookieName="AMCVS_"+t,g.cookieDomain=$(),g.loadSSL=v.location.protocol.toLowerCase().indexOf("https")>=0,g.loadTimeout=3e4,g.CORSErrors=[],g.marketingCloudServer=g.audienceManagerServer="dpm.demdex.net",g.sdidParamExpiry=30;var D=null,A="MCMID",y="MCIDTS",b="A",O="MCAID",M="AAM",k="MCAAMB",T="NONE",L=function(e){return!Object.prototype[e]},P=ie(g);g.FIELDS=E.FIELDS,g.cookieRead=function(e){return Q.get(e)},g.cookieWrite=function(e,t,n){var i=g.cookieLifetime?(""+g.cookieLifetime).toUpperCase():"",r=!1;return g.configs&&g.configs.secureCookie&&"https:"===location.protocol&&(r=!0),Q.set(e,""+t,{expires:n,domain:g.cookieDomain,cookieLifetime:i,secure:r})},g.resetState=function(e){e?g._mergeServerState(e):o()},g._isAllowedDone=!1,g._isAllowedFlag=!1,g.isAllowed=function(){return g._isAllowedDone||(g._isAllowedDone=!0,(g.cookieRead(g.cookieName)||g.cookieWrite(g.cookieName,"T",1))&&(g._isAllowedFlag=!0)),"T"===g.cookieRead(g.cookieName)&&g._helpers.removeCookie(g.cookieName),g._isAllowedFlag},g.setMarketingCloudVisitorID=function(e){g._setMarketingCloudFields(e)},g._use1stPartyMarketingCloudServer=!1,g.getMarketingCloudVisitorID=function(e,t){g.marketingCloudServer&&g.marketingCloudServer.indexOf(".demdex.net")<0&&(g._use1stPartyMarketingCloudServer=!0);var n=g._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;return g._getRemoteField(A,i,e,t,n)},g.getVisitorValues=function(e,t){var n={MCMID:{fn:g.getMarketingCloudVisitorID,args:[!0],context:g},MCOPTOUT:{fn:g.isOptedOut,args:[void 0,!0],context:g},MCAID:{fn:g.getAnalyticsVisitorID,args:[!0],context:g},MCAAMLH:{fn:g.getAudienceManagerLocationHint,args:[!0],context:g},MCAAMB:{fn:g.getAudienceManagerBlob,args:[!0],context:g}},i=t&&t.length?j.pluck(n,t):n;z(i,e)},g._currentCustomerIDs={},g._customerIDsHashChanged=!1,g._newCustomerIDsHash="",g.setCustomerIDs=function(t,n){function i(){g._customerIDsHashChanged=!1}if(!g.isOptedOut()&&t){if(!j.isObject(t)||j.isObjectEmpty(t))return!1;g._readVisitor();var r,a,o;for(r in t)if(L(r)&&(a=t[r],n=a.hasOwnProperty("hashType")?a.hashType:n,a))if("object"===e(a)){var s={};if(a.id){if(n){if(!(o=Be(Ge(a.id),n)))return;a.id=o,s.hashType=n}s.id=a.id}void 0!=a.authState&&(s.authState=a.authState),g._currentCustomerIDs[r]=s}else if(n){if(!(o=Be(Ge(a),n)))return;g._currentCustomerIDs[r]={id:o,hashType:n}}else g._currentCustomerIDs[r]={id:a};var l=g.getCustomerIDs(),c=g._getField("MCCIDH"),u="";c||(c=0);for(r in l)L(r)&&(a=l[r],u+=(u?"|":"")+r+"|"+(a.id?a.id:"")+(a.authState?a.authState:""));g._newCustomerIDsHash=String(g._hash(u)),g._newCustomerIDsHash!==c&&(g._customerIDsHashChanged=!0,g._mapCustomerIDs(i))}},g.getCustomerIDs=function(){g._readVisitor();var e,t,n={};for(e in g._currentCustomerIDs)L(e)&&(t=g._currentCustomerIDs[e],n[e]||(n[e]={}),t.id&&(n[e].id=t.id),void 0!=t.authState?n[e].authState=t.authState:n[e].authState=S.AuthState.UNKNOWN,t.hashType&&(n[e].hashType=t.hashType));return n},g.setAnalyticsVisitorID=function(e){g._setAnalyticsFields(e)},g.getAnalyticsVisitorID=function(e,t,n){if(!w.isTrackingServerPopulated()&&!n)return g._callCallback(e,[""]),"";var i="";if(n||(i=g.getMarketingCloudVisitorID(function(t){g.getAnalyticsVisitorID(e,!0)})),i||n){var r=n?g.marketingCloudServer:g.trackingServer,a="";g.loadSSL&&(n?g.marketingCloudServerSecure&&(r=g.marketingCloudServerSecure):g.trackingServerSecure&&(r=g.trackingServerSecure));var o={};if(r){var s="http"+(g.loadSSL?"s":"")+"://"+r+"/id",l="d_visid_ver="+g.version+"&mcorgid="+encodeURIComponent(g.marketingCloudOrgID)+(i?"&mid="+encodeURIComponent(i):"")+(g.idSyncDisable3rdPartySyncing||g.disableThirdPartyCookies?"&d_coppa=true":""),c=["s_c_il",g._in,"_set"+(n?"MarketingCloud":"Analytics")+"Fields"];a=s+"?"+l+"&callback=s_c_il%5B"+g._in+"%5D._set"+(n?"MarketingCloud":"Analytics")+"Fields",o.corsUrl=s+"?"+l,o.callback=c}return o.url=a,g._getRemoteField(n?A:O,a,e,t,o)}return""},g.getAudienceManagerLocationHint=function(e,t){if(g.getMarketingCloudVisitorID(function(t){g.getAudienceManagerLocationHint(e,!0)})){var n=g._getField(O);if(!n&&w.isTrackingServerPopulated()&&(n=g.getAnalyticsVisitorID(function(t){g.getAudienceManagerLocationHint(e,!0)})),n||!w.isTrackingServerPopulated()){var i=g._getAudienceManagerURLData(),r=i.url;return g._getRemoteField("MCAAMLH",r,e,t,i)}}return""},g.getLocationHint=g.getAudienceManagerLocationHint,g.getAudienceManagerBlob=function(e,t){if(g.getMarketingCloudVisitorID(function(t){g.getAudienceManagerBlob(e,!0)})){var n=g._getField(O);if(!n&&w.isTrackingServerPopulated()&&(n=g.getAnalyticsVisitorID(function(t){g.getAudienceManagerBlob(e,!0)})),n||!w.isTrackingServerPopulated()){var i=g._getAudienceManagerURLData(),r=i.url;return g._customerIDsHashChanged&&g._setFieldExpire(k,-1),g._getRemoteField(k,r,e,t,i)}}return""},g._supplementalDataIDCurrent="",g._supplementalDataIDCurrentConsumed={},g._supplementalDataIDLast="",g._supplementalDataIDLastConsumed={},g.getSupplementalDataID=function(e,t){g._supplementalDataIDCurrent||t||(g._supplementalDataIDCurrent=g._generateID(1));var n=g._supplementalDataIDCurrent;return g._supplementalDataIDLast&&!g._supplementalDataIDLastConsumed[e]?(n=g._supplementalDataIDLast,g._supplementalDataIDLastConsumed[e]=!0):n&&(g._supplementalDataIDCurrentConsumed[e]&&(g._supplementalDataIDLast=g._supplementalDataIDCurrent,g._supplementalDataIDLastConsumed=g._supplementalDataIDCurrentConsumed,g._supplementalDataIDCurrent=n=t?"":g._generateID(1),g._supplementalDataIDCurrentConsumed={}),n&&(g._supplementalDataIDCurrentConsumed[e]=!0)),n};var R=!1;g._liberatedOptOut=null,g.getOptOut=function(e,t){var n=g._getAudienceManagerURLData("_setMarketingCloudFields"),i=n.url;if(u())return g._getRemoteField("MCOPTOUT",i,e,t,n);if(g._registerCallback("liberatedOptOut",e),null!==g._liberatedOptOut)return g._callAllCallbacks("liberatedOptOut",[g._liberatedOptOut]),R=!1,g._liberatedOptOut;if(R)return null;R=!0;var r="liberatedGetOptOut";return n.corsUrl=n.corsUrl.replace(/dpm\.demdex\.net\/id\?/,"dpm.demdex.net/optOutStatus?"),n.callback=[r],_[r]=function(e){if(e===Object(e)){var t,n,i=j.parseOptOut(e,t,T);t=i.optOut,n=1e3*i.d_ottl,g._liberatedOptOut=t,setTimeout(function(){g._liberatedOptOut=null},n)}g._callAllCallbacks("liberatedOptOut",[t]),R=!1},P.fireCORS(n),null},g.isOptedOut=function(e,t,n){t||(t=S.OptOut.GLOBAL);var i=g.getOptOut(function(n){var i=n===S.OptOut.GLOBAL||n.indexOf(t)>=0;g._callCallback(e,[i])},n);return i?i===S.OptOut.GLOBAL||i.indexOf(t)>=0:null},g._fields=null,g._fieldsExpired=null,g._hash=function(e){var t,n,i=0;if(e)for(t=0;t<e.length;t++)n=e.charCodeAt(t),i=(i<<5)-i+n,i&=i;return i},g._generateID=ne,g._generateLocalMID=function(){var e=g._generateID(0);return N.isClientSideMarketingCloudVisitorID=!0,e},g._callbackList=null,g._callCallback=function(e,t){try{"function"==typeof e?e.apply(v,t):e[1].apply(e[0],t)}catch(e){}},g._registerCallback=function(e,t){t&&(null==g._callbackList&&(g._callbackList={}),void 0==g._callbackList[e]&&(g._callbackList[e]=[]),g._callbackList[e].push(t))},g._callAllCallbacks=function(e,t){if(null!=g._callbackList){var n=g._callbackList[e];if(n)for(;n.length>0;)g._callCallback(n.shift(),t)}},g._addQuerystringParam=function(e,t,n,i){var r=encodeURIComponent(t)+"="+encodeURIComponent(n),a=w.parseHash(e),o=w.hashlessUrl(e);if(-1===o.indexOf("?"))return o+"?"+r+a;var s=o.split("?"),l=s[0]+"?",c=s[1];return l+w.addQueryParamAtLocation(c,r,i)+a},g._extractParamFromUri=function(e,t){var n=new RegExp("[\\?&#]"+t+"=([^&#]*)"),i=n.exec(e);if(i&&i.length)return decodeURIComponent(i[1])},g._parseAdobeMcFromUrl=r(re.ADOBE_MC),g._parseAdobeMcSdidFromUrl=r(re.ADOBE_MC_SDID),g._attemptToPopulateSdidFromUrl=function(e){var n=g._parseAdobeMcSdidFromUrl(e),i=1e9;n&&n.TS&&(i=w.getTimestampInSeconds()-n.TS),n&&n.SDID&&n.MCORGID===t&&i<g.sdidParamExpiry&&(g._supplementalDataIDCurrent=n.SDID,g._supplementalDataIDCurrentConsumed.SDID_URL_PARAM=!0)},g._attemptToPopulateIdsFromUrl=function(){var e=g._parseAdobeMcFromUrl();if(e&&e.TS){var n=w.getTimestampInSeconds(),i=n-e.TS;if(Math.floor(i/60)>re.ADOBE_MC_TTL_IN_MIN||e.MCORGID!==t)return;a(e)}},g._mergeServerState=function(e){if(e)try{if(e=function(e){return w.isObject(e)?e:JSON.parse(e)}(e),e[g.marketingCloudOrgID]){var t=e[g.marketingCloudOrgID];!function(e){w.isObject(e)&&g.setCustomerIDs(e)}(t.customerIDs),o(t.sdid)}}catch(e){throw new Error("`serverState` has an invalid format.")}},g._timeout=null,g._loadData=function(e,t,n,i){t=g._addQuerystringParam(t,"d_fieldgroup",e,1),i.url=g._addQuerystringParam(i.url,"d_fieldgroup",e,1),i.corsUrl=g._addQuerystringParam(i.corsUrl,"d_fieldgroup",e,1),N.fieldGroupObj[e]=!0,i===Object(i)&&i.corsUrl&&"XMLHttpRequest"===P.corsMetadata.corsType&&P.fireCORS(i,n,e)},g._clearTimeout=function(e){null!=g._timeout&&g._timeout[e]&&(clearTimeout(g._timeout[e]),g._timeout[e]=0)},g._settingsDigest=0,g._getSettingsDigest=function(){if(!g._settingsDigest){var e=g.version;g.audienceManagerServer&&(e+="|"+g.audienceManagerServer),g.audienceManagerServerSecure&&(e+="|"+g.audienceManagerServerSecure),g._settingsDigest=g._hash(e)}return g._settingsDigest},g._readVisitorDone=!1,g._readVisitor=function(){if(!g._readVisitorDone){g._readVisitorDone=!0;var e,t,n,i,r,a,o=g._getSettingsDigest(),s=!1,l=g.cookieRead(g.cookieName),c=new Date;if(l||I||g.discardTrackingServerECID||(l=g.cookieRead(re.FIRST_PARTY_SERVER_COOKIE)),null==g._fields&&(g._fields={}),l&&"T"!==l)for(l=l.split("|"),l[0].match(/^[\-0-9]+$/)&&(parseInt(l[0],10)!==o&&(s=!0),l.shift()),l.length%2==1&&l.pop(),e=0;e<l.length;e+=2)t=l[e].split("-"),n=t[0],i=l[e+1],t.length>1?(r=parseInt(t[1],10),a=t[1].indexOf("s")>0):(r=0,a=!1),s&&("MCCIDH"===n&&(i=""),r>0&&(r=c.getTime()/1e3-60)),n&&i&&(g._setField(n,i,1),r>0&&(g._fields["expire"+n]=r+(a?"s":""),(c.getTime()>=1e3*r||a&&!g.cookieRead(g.sessionCookieName))&&(g._fieldsExpired||(g._fieldsExpired={}),g._fieldsExpired[n]=!0)));!g._getField(O)&&w.isTrackingServerPopulated()&&(l=g.cookieRead("s_vi"))&&(l=l.split("|"),l.length>1&&l[0].indexOf("v1")>=0&&(i=l[1],e=i.indexOf("["),e>=0&&(i=i.substring(0,e)),i&&i.match(re.VALID_VISITOR_ID_REGEX)&&g._setField(O,i)))}},g._appendVersionTo=function(e){var t="vVersion|"+g.version,n=e?g._getCookieVersion(e):null;return n?Z.areVersionsDifferent(n,g.version)&&(e=e.replace(re.VERSION_REGEX,t)):e+=(e?"|":"")+t,e},g._writeVisitor=function(){var e,t,n=g._getSettingsDigest();for(e in g._fields)L(e)&&g._fields[e]&&"expire"!==e.substring(0,6)&&(t=g._fields[e],n+=(n?"|":"")+e+(g._fields["expire"+e]?"-"+g._fields["expire"+e]:"")+"|"+t);n=g._appendVersionTo(n),g.cookieWrite(g.cookieName,n,1)},g._getField=function(e,t){return null==g._fields||!t&&g._fieldsExpired&&g._fieldsExpired[e]?null:g._fields[e]},g._setField=function(e,t,n){null==g._fields&&(g._fields={}),g._fields[e]=t,n||g._writeVisitor()},g._getFieldList=function(e,t){var n=g._getField(e,t);return n?n.split("*"):null},g._setFieldList=function(e,t,n){g._setField(e,t?t.join("*"):"",n)},g._getFieldMap=function(e,t){var n=g._getFieldList(e,t);if(n){var i,r={};for(i=0;i<n.length;i+=2)r[n[i]]=n[i+1];return r}return null},g._setFieldMap=function(e,t,n){var i,r=null;if(t){r=[];for(i in t)L(i)&&(r.push(i),r.push(t[i]))}g._setFieldList(e,r,n)},g._setFieldExpire=function(e,t,n){var i=new Date;i.setTime(i.getTime()+1e3*t),null==g._fields&&(g._fields={}),g._fields["expire"+e]=Math.floor(i.getTime()/1e3)+(n?"s":""),t<0?(g._fieldsExpired||(g._fieldsExpired={}),g._fieldsExpired[e]=!0):g._fieldsExpired&&(g._fieldsExpired[e]=!1),n&&(g.cookieRead(g.sessionCookieName)||g.cookieWrite(g.sessionCookieName,"1"))},g._findVisitorID=function(t){return t&&("object"===e(t)&&(t=t.d_mid?t.d_mid:t.visitorID?t.visitorID:t.id?t.id:t.uuid?t.uuid:""+t),t&&"NOTARGET"===(t=t.toUpperCase())&&(t=T),t&&(t===T||t.match(re.VALID_VISITOR_ID_REGEX))||(t="")),t},g._setFields=function(t,n){if(g._clearTimeout(t),null!=g._loading&&(g._loading[t]=!1),N.fieldGroupObj[t]&&N.setState(t,!1),"MC"===t){!0!==N.isClientSideMarketingCloudVisitorID&&(N.isClientSideMarketingCloudVisitorID=!1);var i=g._getField(A);if(!i||g.overwriteCrossDomainMCIDAndAID){if(!(i="object"===e(n)&&n.mid?n.mid:g._findVisitorID(n))){if(g._use1stPartyMarketingCloudServer&&!g.tried1stPartyMarketingCloudServer)return g.tried1stPartyMarketingCloudServer=!0,void g.getAnalyticsVisitorID(null,!1,!0);i=g._generateLocalMID()}g._setField(A,i)}i&&i!==T||(i=""),"object"===e(n)&&((n.d_region||n.dcs_region||n.d_blob||n.blob)&&g._setFields(M,n),g._use1stPartyMarketingCloudServer&&n.mid&&g._setFields(b,{id:n.id})),g._callAllCallbacks(A,[i])}if(t===M&&"object"===e(n)){var r=604800;void 0!=n.id_sync_ttl&&n.id_sync_ttl&&(r=parseInt(n.id_sync_ttl,10));var a=F.getRegionAndCheckIfChanged(n,r);g._callAllCallbacks("MCAAMLH",[a]);var o=g._getField(k);(n.d_blob||n.blob)&&(o=n.d_blob,o||(o=n.blob),g._setFieldExpire(k,r),g._setField(k,o)),o||(o=""),g._callAllCallbacks(k,[o]),!n.error_msg&&g._newCustomerIDsHash&&g._setField("MCCIDH",g._newCustomerIDsHash)}if(t===b){var s=g._getField(O);s&&!g.overwriteCrossDomainMCIDAndAID||(s=g._findVisitorID(n),s?s!==T&&g._setFieldExpire(k,-1):s=T,g._setField(O,s)),s&&s!==T||(s=""),g._callAllCallbacks(O,[s])}if(g.idSyncDisableSyncs||g.disableIdSyncs)F.idCallNotProcesssed=!0;else{F.idCallNotProcesssed=!1;var l={};l.ibs=n.ibs,l.subdomain=n.subdomain,F.processIDCallData(l)}if(n===Object(n)){var c,d;u()&&g.isAllowed()&&(c=g._getField("MCOPTOUT"));var f=j.parseOptOut(n,c,T);c=f.optOut,d=f.d_ottl,g._setFieldExpire("MCOPTOUT",d,!0),g._setField("MCOPTOUT",c),g._callAllCallbacks("MCOPTOUT",[c])}},g._loading=null,g._getRemoteField=function(e,t,n,i,r){var a,o="",s=w.isFirstPartyAnalyticsVisitorIDCall(e),l={MCAAMLH:!0,MCAAMB:!0};if(u()&&g.isAllowed()){g._readVisitor(),o=g._getField(e,!0===l[e]);if(function(){return(!o||g._fieldsExpired&&g._fieldsExpired[e])&&(!g.disableThirdPartyCalls||s)}()){if(e===A||"MCOPTOUT"===e?a="MC":"MCAAMLH"===e||e===k?a=M:e===O&&(a=b),a)return!t||null!=g._loading&&g._loading[a]||(null==g._loading&&(g._loading={}),g._loading[a]=!0,g._loadData(a,t,function(t){if(!g._getField(e)){t&&N.setState(a,!0);var n="";e===A?n=g._generateLocalMID():a===M&&(n={error_msg:"timeout"}),g._setFields(a,n)}},r)),g._registerCallback(e,n),o||(t||g._setFields(a,{id:T}),"")}else o||(e===A?(g._registerCallback(e,n),o=g._generateLocalMID(),g.setMarketingCloudVisitorID(o)):e===O?(g._registerCallback(e,n),o="",g.setAnalyticsVisitorID(o)):(o="",i=!0))}return e!==A&&e!==O||o!==T||(o="",i=!0),n&&i&&g._callCallback(n,[o]),o},g._setMarketingCloudFields=function(e){g._readVisitor(),g._setFields("MC",e)},g._mapCustomerIDs=function(e){g.getAudienceManagerBlob(e,!0)},g._setAnalyticsFields=function(e){g._readVisitor(),g._setFields(b,e)},g._setAudienceManagerFields=function(e){g._readVisitor(),g._setFields(M,e)},g._getAudienceManagerURLData=function(e){var t=g.audienceManagerServer,n="",i=g._getField(A),r=g._getField(k,!0),a=g._getField(O),o=a&&a!==T?"&d_cid_ic=AVID%01"+encodeURIComponent(a):"";if(g.loadSSL&&g.audienceManagerServerSecure&&(t=g.audienceManagerServerSecure),t){var s,l,c=g.getCustomerIDs();if(c)for(s in c)L(s)&&(l=c[s],o+="&d_cid_ic="+encodeURIComponent(s)+"%01"+encodeURIComponent(l.id?l.id:"")+(l.authState?"%01"+l.authState:""));e||(e="_setAudienceManagerFields");var u="http"+(g.loadSSL?"s":"")+"://"+t+"/id",d="d_visid_ver="+g.version+(h&&-1!==u.indexOf("demdex.net")?"&gdpr=1&gdpr_force=1&gdpr_consent="+h:"")+"&d_rtbd=json&d_ver=2"+(!i&&g._use1stPartyMarketingCloudServer?"&d_verify=1":"")+"&d_orgid="+encodeURIComponent(g.marketingCloudOrgID)+"&d_nsid="+(g.idSyncContainerID||0)+(i?"&d_mid="+encodeURIComponent(i):"")+(g.idSyncDisable3rdPartySyncing||g.disableThirdPartyCookies?"&d_coppa=true":"")+(!0===D?"&d_coop_safe=1":!1===D?"&d_coop_unsafe=1":"")+(r?"&d_blob="+encodeURIComponent(r):"")+o,f=["s_c_il",g._in,e];return n=u+"?"+d+"&d_cb=s_c_il%5B"+g._in+"%5D."+e,{url:n,corsUrl:u+"?"+d,callback:f}}return{url:n}},g.appendVisitorIDsTo=function(e){try{var t=[[A,g._getField(A)],[O,g._getField(O)],["MCORGID",g.marketingCloudOrgID]];return g._addQuerystringParam(e,re.ADOBE_MC,s(t))}catch(t){return e}},g.appendSupplementalDataIDTo=function(e,t){if(!(t=t||g.getSupplementalDataID(w.generateRandomString(),!0)))return e;try{var n=s([["SDID",t],["MCORGID",g.marketingCloudOrgID]]);return g._addQuerystringParam(e,re.ADOBE_MC_SDID,n)}catch(t){return e}};var w={parseHash:function(e){var t=e.indexOf("#");return t>0?e.substr(t):""},hashlessUrl:function(e){var t=e.indexOf("#");return t>0?e.substr(0,t):e},addQueryParamAtLocation:function(e,t,n){var i=e.split("&");return n=null!=n?n:i.length,i.splice(n,0,t),i.join("&")},isFirstPartyAnalyticsVisitorIDCall:function(e,t,n){if(e!==O)return!1;var i;return t||(t=g.trackingServer),n||(n=g.trackingServerSecure),!("string"!=typeof(i=g.loadSSL?n:t)||!i.length)&&(i.indexOf("2o7.net")<0&&i.indexOf("omtrdc.net")<0)},isObject:function(e){return Boolean(e&&e===Object(e))},removeCookie:function(e){Q.remove(e,{domain:g.cookieDomain})},isTrackingServerPopulated:function(){return!!g.trackingServer||!!g.trackingServerSecure},getTimestampInSeconds:function(){return Math.round((new Date).getTime()/1e3)},parsePipeDelimetedKeyValues:function(e){return e.split("|").reduce(function(e,t){var n=t.split("=");return e[n[0]]=decodeURIComponent(n[1]),e},{})},generateRandomString:function(e){e=e||5;for(var t="",n="abcdefghijklmnopqrstuvwxyz0123456789";e--;)t+=n[Math.floor(Math.random()*n.length)];return t},normalizeBoolean:function(e){return"true"===e||"false"!==e&&e},parseBoolean:function(e){return"true"===e||"false"!==e&&null},replaceMethodsWithFunction:function(e,t){for(var n in e)e.hasOwnProperty(n)&&"function"==typeof e[n]&&(e[n]=t);return e}};g._helpers=w;var F=ae(g,S);g._destinationPublishing=F,g.timeoutMetricsLog=[];var N={isClientSideMarketingCloudVisitorID:null,MCIDCallTimedOut:null,AnalyticsIDCallTimedOut:null,AAMIDCallTimedOut:null,fieldGroupObj:{},setState:function(e,t){switch(e){case"MC":!1===t?!0!==this.MCIDCallTimedOut&&(this.MCIDCallTimedOut=!1):this.MCIDCallTimedOut=t;break;case b:!1===t?!0!==this.AnalyticsIDCallTimedOut&&(this.AnalyticsIDCallTimedOut=!1):this.AnalyticsIDCallTimedOut=t;break;case M:!1===t?!0!==this.AAMIDCallTimedOut&&(this.AAMIDCallTimedOut=!1):this.AAMIDCallTimedOut=t}}};g.isClientSideMarketingCloudVisitorID=function(){return N.isClientSideMarketingCloudVisitorID},g.MCIDCallTimedOut=function(){return N.MCIDCallTimedOut},g.AnalyticsIDCallTimedOut=function(){return N.AnalyticsIDCallTimedOut},g.AAMIDCallTimedOut=function(){return N.AAMIDCallTimedOut},g.idSyncGetOnPageSyncInfo=function(){return g._readVisitor(),g._getField("MCSYNCSOP")},g.idSyncByURL=function(e){if(!g.isOptedOut()){var t=l(e||{});if(t.error)return t.error;var n,i,r=e.url,a=encodeURIComponent,o=F;return r=r.replace(/^https:/,"").replace(/^http:/,""),n=j.encodeAndBuildRequest(["",e.dpid,e.dpuuid||""],","),i=["ibs",a(e.dpid),"img",a(r),t.ttl,"",n],o.addMessage(i.join("|")),o.requestToProcess(),"Successfully queued"}},g.idSyncByDataSource=function(e){if(!g.isOptedOut())return e===Object(e)&&"string"==typeof e.dpuuid&&e.dpuuid.length?(e.url="//dpm.demdex.net/ibs:dpid="+e.dpid+"&dpuuid="+e.dpuuid,g.idSyncByURL(e)):"Error: config or config.dpuuid is empty"},He(g,F),g._getCookieVersion=function(e){e=e||g.cookieRead(g.cookieName);var t=re.VERSION_REGEX.exec(e);return t&&t.length>1?t[1]:null},g._resetAmcvCookie=function(e){var t=g._getCookieVersion();t&&!Z.isLessThan(t,e)||w.removeCookie(g.cookieName)},g.setAsCoopSafe=function(){D=!0},g.setAsCoopUnsafe=function(){D=!1},function(){if(g.configs=Object.create(null),w.isObject(n))for(var e in n)L(e)&&(g[e]=n[e],g.configs[e]=n[e])}(),function(){[["getMarketingCloudVisitorID"],["setCustomerIDs",void 0],["getAnalyticsVisitorID"],["getAudienceManagerLocationHint"],["getLocationHint"],["getAudienceManagerBlob"]].forEach(function(e){var t=e[0],n=2===e.length?e[1]:"",i=g[t];g[t]=function(e){return u()&&g.isAllowed()?i.apply(g,arguments):("function"==typeof e&&g._callCallback(e,[n]),n)}})}(),g.init=function(){if(c())return m.optIn.fetchPermissions(f,!0);!function(){if(w.isObject(n)){g.idSyncContainerID=g.idSyncContainerID||0,D="boolean"==typeof g.isCoopSafe?g.isCoopSafe:w.parseBoolean(g.isCoopSafe),g.resetBeforeVersion&&g._resetAmcvCookie(g.resetBeforeVersion),g._attemptToPopulateIdsFromUrl(),g._attemptToPopulateSdidFromUrl(),g._readVisitor();var e=g._getField(y),t=Math.ceil((new Date).getTime()/re.MILLIS_PER_DAY);g.idSyncDisableSyncs||g.disableIdSyncs||!F.canMakeSyncIDCall(e,t)||(g._setFieldExpire(k,-1),g._setField(y,t)),g.getMarketingCloudVisitorID(),g.getAudienceManagerLocationHint(),g.getAudienceManagerBlob(),g._mergeServerState(g.serverState)}else g._attemptToPopulateIdsFromUrl(),g._attemptToPopulateSdidFromUrl()}(),function(){if(!g.idSyncDisableSyncs&&!g.disableIdSyncs){F.checkDPIframeSrc();var e=function(){var e=F;e.readyToAttachIframe()&&e.attachIframe()};v.addEventListener("load",function(){S.windowLoaded=!0,e()});try{te.receiveMessage(function(e){F.receiveMessage(e.data)},F.iframeHost)}catch(e){}}}(),function(){g.whitelistIframeDomains&&re.POST_MESSAGE_ENABLED&&(g.whitelistIframeDomains=g.whitelistIframeDomains instanceof Array?g.whitelistIframeDomains:[g.whitelistIframeDomains],g.whitelistIframeDomains.forEach(function(e){var n=new B(t,e),i=K(g,n);te.receiveMessage(i,e)}))}()}};qe.config=se,_.Visitor=qe;var Xe=qe,We=function(e){if(j.isObject(e))return Object.keys(e).filter(function(t){return""!==e[t]}).reduce(function(t,n){var i="doesOptInApply"!==n?e[n]:se.normalizeConfig(e[n]),r=j.normalizeBoolean(i);return t[n]=r,t},Object.create(null))},Je=Ve.OptIn,Ke=Ve.IabPlugin;return Xe.getInstance=function(e,t){if(!e)throw new Error("Visitor requires Adobe Marketing Cloud Org ID.");e.indexOf("@")<0&&(e+="@AdobeOrg");var n=function(){var t=_.s_c_il;if(t)for(var n=0;n<t.length;n++){var i=t[n];if(i&&"Visitor"===i._c&&i.marketingCloudOrgID===e)return i}}();if(n)return n;var i=We(t);!function(e){_.adobe.optIn=_.adobe.optIn||function(){var t=j.pluck(e,["doesOptInApply","previousPermissions","preOptInApprovals","isOptInStorageEnabled","optInStorageExpiry","isIabContext"]),n=e.optInCookieDomain||e.cookieDomain;n=n||$(),n=n===window.location.hostname?"":n,t.optInCookieDomain=n;var i=new Je(t,{cookies:Q});if(t.isIabContext){var r=new Ke(window.__cmp);i.registerPlugin(r)}return i}()}(i||{});var r=e,a=r.split("").reverse().join(""),o=new Xe(e,null,a);j.isObject(i)&&i.cookieDomain&&(o.cookieDomain=i.cookieDomain),function(){_.s_c_il.splice(--_.s_c_in,1)}();var s=j.getIeVersion();if("number"==typeof s&&s<10)return o._helpers.replaceMethodsWithFunction(o,function(){});var l=function(){try{return _.self!==_.parent}catch(e){return!0}}()&&!function(e){return e.cookieWrite("TEST_AMCV_COOKIE","T",1),"T"===e.cookieRead("TEST_AMCV_COOKIE")&&(e._helpers.removeCookie("TEST_AMCV_COOKIE"),!0)}(o)&&_.parent?new Y(e,i,o,_.parent):new Xe(e,i,a);return o=null,l.init(),l},function(){function e(){Xe.windowLoaded=!0}_.addEventListener?_.addEventListener("load",e):_.attachEvent&&_.attachEvent("onload",e),Xe.codeLoadEnd=(new Date).getTime()}(),Xe}();

/* s init */

var sng = s_gi(prmOm.account);

if ('pn' != 'Avangate' && typeof s != 'object') var s = sng;

// visitor
var visitorConfigObj = {};
if (prmOm.cookieDomain in prmOm.hostToS2Sgtm) {
	// configure ID service calls
	visitorConfigObj.audienceManagerServer = prmOm.hostToS2Sgtm[prmOm.cookieDomain];
	visitorConfigObj.audienceManagerServerSecure = prmOm.hostToS2Sgtm[prmOm.cookieDomain];
	visitorConfigObj.disableIdSyncs = true;
}
visitorConfigObj.trackingServer = prmOm.trackingServer;
visitorConfigObj.trackingServerSecure = prmOm.trackingServerSecure;
visitorConfigObj.cookieDomain = prmOm.cookieDomain;
sng.cookieDomainPeriods = prmOm.cookieDomainPeriods;
sng.visitor = Visitor.getInstance('983502BE532960BE0A490D4C@AdobeOrg', visitorConfigObj);
// other settings
sng.charSet = prmOm.pageCharset;
sng.trackInlineStats = false;
sng.linkLeaveQueryString = true;
sng.trackDownloadLinks = false;
sng.trackExternalLinks = false;
sng.linkInternalFilters = '';
sng.linkTrackVars = '';
sng.linkTrackEvents = '';
sng.useForcedLinkTracking = true;
sng.forcedLinkTrackingTimeout = 250;
sng.visitorNamespace = 'kaspersky';
sng.dc = 122;
sng.trackingServer = prmOm.trackingServer;
sng.trackingServerSecure = prmOm.trackingServerSecure;
sng.usePlugins = true;
sng.doPlugins = (function () {

    function callback() {
        if (!disableCallback) {
            disableCallback = true;

            if (window.CS_CONF) {
                CS_CONF.integrations = CS_CONF.integrations || [];
                CS_CONF.integrations.push("Adobe Analytics");
            }
        }
    }

    var disableCallback = false;

    window._uxa = window._uxa || [];
    _uxa.push(["afterPageView", callback]);

    var cn1 = "_cs_mk";
    var cn2 = "_cs_id";

    var cookies = "; " + document.cookie;
    if (cookies) {

        var getCookie1 = cookies.split("; " + cn1 + "=");
        var getCookie2 = cookies.split("; " + cn2 + "=");

        if (getCookie1.length > 1 && getCookie2.length > 1) {
            return;
        }

        function init(cookieValue) {
            var cmk = Math.random() + "_" + Date.now();

            if (cookieValue) {
                cmk = cookieValue;
            }

            sng.eVar125 = cmk;

            var tld = (function () {
                var i = 0,
                    domain = document.domain,
                    p = domain.split('.'),
                    s = '_gd' + (new Date()).getTime();
                while (i < (p.length - 1) && document.cookie.indexOf(s + '=' + s) == -1) {
                    domain = p.slice(-1 - (++i)).join('.');
                    document.cookie = s + "=" + s + ";domain=" + domain + ";";
                }
                document.cookie = s + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=" + domain + ";";
                return domain;
            })();

            var now = new Date();
            var time = now.getTime();
            time += 30 * 60 * 1000;
            now.setTime(time);

            document.cookie = cn1 + "=" + cmk + "; expires=" + now.toUTCString() + ";path=/;domain=" + tld;

            _uxa.push(['trackDynamicVariable', {
                key: 'csMatchingKey',
                value: cmk
            }]);
        }

        if (getCookie1.length == 1) {
            init();
        } else {
            var getCookieValue = "";
            if (getCookie1) {
                getCookieValue = getCookie1[1].split(";")[0];
            }
            init(getCookieValue);
        }

    }
})();

/*
 * Plugin: getQueryParam 2.3
 */
sng.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
sng.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
sng.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
* Plugin Utility: apl v1.1
*/
sng.apl=new Function("L","v","d","u",""
+"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
sng.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Utility Function: join
 */
sng.join = new Function("v","p",""
+"var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+"se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
 * Plugin Utility: Replace v1.0
 */
sng.repl=new Function("x","o","n",""
+"var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+"substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
 * Plugins: getCartOpen, resetGetCartOpen, getCheckout
 */
sng.getCartOpen=new Function("c",""
+"var s=this,t=new Date,e=s.events?s.events:'',i=0;t.setTime(t.getTim"
+"e()+1800000);if(s.Util.cookieRead(c)||e.indexOf('scOpen')>-1){if(!s.Util.cookieWrite(c,1,t))"
+"{s.Util.cookieWrite(c,1,0)}}else{if(e.indexOf('scAdd')>-1){if(s.Util.cookieWrite(c,1,t)){i=1}"
+"else if(s.Util.cookieWrite(c,1,0)){i=1}}}if(i){e=e+',scOpen'}return e");
sng.resetGetCartOpen=new Function("c",""
+"var s=this,t=new Date,e=s.events?s.events:'';t.setTime(t.getTime()+"
+"10000);if(e.indexOf('purchase')>-1){if(s.Util.cookieRead(c)||e.indexOf('scOpen'"
+")>-1){if(!s.Util.cookieWrite(c,'',t)){s.Util.cookieWrite(c,'',0);}}}return e");
sng.getCheckout=new Function("c",""
+"var s=this,t=new Date,e=s.events?s.events:'';t.setTime(t.getTime()+"
+"1800000);if(e.indexOf('scCheckout')>-1){if(s.Util.cookieRead(c)){e=s.repl(s.rep"
+"l(e,'scCheckout',''),',,',',')}if(!s.Util.cookieWrite(c,1,t)){s.Util.cookieWrite(c,1,0)}}t.se"
+"tTime(t.getTime()+10000);if(s.Util.cookieRead(c)&&e.indexOf('purchase')>-1){if("
+"!s.Util.cookieWrite(c,'',t)){s.Util.cookieWrite(c,'',0);}}return e");

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 2.22.3
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement(r){var a=this;a.version="2.22.3";var h=window;h.s_c_in||(h.s_c_il=[],h.s_c_in=0);a._il=h.s_c_il;a._in=h.s_c_in;a._il[a._in]=a;h.s_c_in++;a._c="s_c";var q=h.AppMeasurement.ic;q||(q=null);var p=h,m,s;try{for(m=p.parent,s=p.location;m&&m.location&&s&&""+m.location!==""+s&&p.location&&""+m.location!==""+p.location&&m.location.host===s.host;)p=m,m=p.parent}catch(u){}a.C=function(a){try{console.log(a)}catch(b){}};a.Ra=function(a){return""+parseInt(a)==""+a};a.replace=function(a,
b,d){return!a||0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.Nb=function(){var c=h.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);
if(c&&!a.Ka&&!/^[0-9.]+$/.test(c)&&(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ka=0<d?c.substring(d):c}return a.Ka};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.Nb(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=
e&&((g=""!=b?parseInt(e?e:0):-60)?(d=new Date,d.setTime(d.getTime()+1E3*g)):1===d&&(d=new Date,g=d.getYear(),d.setYear(g+2+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":"")+(a.writeSecureCookies?" secure;":""),a.cookieRead(c)==b):0};a.Kb=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.xb(a,function(){}))};a.ya=function(){var a=
navigator.userAgent;return"Microsoft Internet Explorer"===navigator.appName||0<=a.indexOf("MSIE ")||0<=a.indexOf("Trident/")&&0<=a.indexOf("Windows NT 6")?!0:!1};a.xb=function(a,b){for(var d in a)Object.prototype.hasOwnProperty.call(a,d)&&"function"===typeof a[d]&&(a[d]=b)};a.K=[];a.fa=function(c,b,d){if(a.La)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,k=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==
g){if(!a.ga)for(a.ga=1,d=0;d<k.length;d++)a.d.addEventListener(k[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ga=0,a.delayReady())});f=1;e=0}else d||a.u("_d")&&(f=1);f&&(a.K.push({m:c,a:b,t:e}),a.ga||setTimeout(a.delayReady,a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.u("_d")?b=1:a.Aa();0<a.K.length;){d=a.K.shift();if(b&&!d.t&&d.t>c){a.K.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.La=1;a[d.m].apply(a,
d.a);a.La=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.fa("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,k="";e=f="";if(a.lightProfileID)d=a.O,(k=a.lightTrackVars)&&(k=","+k+","+a.la.join(",")+",");else{d=a.g;if(a.pe||a.linkType)k=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,
1).toUpperCase()+a.pe.substring(1),a[e]&&(k=a[e].ec,f=a[e].cc));k&&(k=","+k+","+a.F.join(",")+",");f&&k&&(k+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!k||0<=k.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.o=function(c,b,d,f,e){var g="",k,l,h,n,m=0;"contextData"==c&&(c="c");if(b){for(k in b)if(!(Object.prototype[k]||e&&k.substring(0,e.length)!=e)&&b[k]&&(!d||0<=d.indexOf(","+(f?f+".":"")+k+","))){h=!1;if(m)for(l=0;l<m.length;l++)if(k.substring(0,m[l].length)==
m[l]){h=!0;break}if(!h&&(""==g&&(g+="&"+c+"."),l=b[k],e&&(k=k.substring(e.length)),0<k.length))if(h=k.indexOf("."),0<h)l=k.substring(0,h),h=(e?e:"")+l+".",m||(m=[]),m.push(h),g+=a.o(l,b,d,f,h);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==f&&0>e.indexOf(".contextData."))switch(h=k.substring(0,4),n=k.substring(4),k){case "transactionID":k="xact";break;case "channel":k="ch";break;case "campaign":k="v0";break;default:a.Ra(n)&&("prop"==h?k="c"+n:"eVar"==h?k="v"+n:"list"==
h?k="l"+n:"hier"==h&&(k="h"+n,l=l.substring(0,255)))}g+="&"+a.escape(k)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Qb=function(){var c="",b,d,f,e,g,k,l,h,n="",m="",p=e="",r=a.T();if(a.lightProfileID)b=a.O,(n=a.lightTrackVars)&&(n=","+n+","+a.la.join(",")+",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].ec,m=a[e].cc));n&&(n=","+n+","+a.F.join(",")+",");m&&(m=","+m+",",n&&(n+=",events,"));
a.events2&&(p+=(""!=p?",":"")+a.events2)}if(r&&r.getCustomerIDs){e=q;if(g=r.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.o("cid",e))}a.AudienceManagement&&a.AudienceManagement.isReady()&&(c+=a.o("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);k=e.substring(4);g||("events"==e&&p?(g=p,p=""):"marketingCloudOrgID"==e&&r&&a.V("ECID")&&
(g=r.marketingCloudOrgID));if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e="D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";
break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e=
"cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e=
"hp";break;case "events":p&&(g+=(""!=g?",":"")+p);if(m)for(k=g.split(","),g="",f=0;f<k.length;f++)l=k[f],h=l.indexOf("="),0<=h&&(l=l.substring(0,h)),h=l.indexOf(":"),0<=h&&(l=l.substring(0,h)),0<=m.indexOf(","+l+",")&&(g+=(g?",":"")+k[f]);break;case "events2":g="";break;case "contextData":c+=a.o("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e=
"mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.o("mts",a[e],n,e));g="";break;default:a.Ra(k)&&("prop"==f?e="c"+k:"eVar"==f?e="v"+k:"list"==f?e="l"+k:"hier"==f&&(e="h"+k,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.ka&&(c+="&lrt="+a.ka,a.ka=null);return c};a.B=function(a){var b=a.tagName;if("undefined"!=""+a.lc||"undefined"!=""+a.Zb&&"HTML"!=(""+a.Zb).toUpperCase())return"";
b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.Na=function(a){var b=h.location,d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,
0>f?0:f)+"/":"")+d);return d};a.L=function(c){var b=a.B(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.Na(c),e)?{id:e.substring(0,100),type:g}:0};a.jc=function(c){for(var b=a.B(c),d=a.L(c);c&&
!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.B(c),d=a.L(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Yb=function(){var c,b,d=a.linkObject,f=a.linkType,e=a.linkURL,g,k;a.ma=1;d||(a.ma=0,d=a.clickObject);if(d){c=a.B(d);for(b=a.L(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.B(d),b=a.L(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||
0<=l.indexOf(".trackLink("))d=0}}else a.ma=1;!e&&d&&(e=a.Na(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,n=0,p;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),g=l.indexOf("?"),k=l.indexOf("#"),0<=g?0<=k&&k<g&&(g=k):g=k,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),k=0;k<g.length;k++)(p=g[k])&&l.substring(l.length-(p.length+1))=="."+p&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Qa(l)&&
(a.linkInternalFilters||(a.linkInternalFilters=h.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(k=0;k<g.length;k++)p=g[k],0<=l.indexOf(p)&&(n=1);n?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),h.s_objectID&&(b.id=h.s_objectID,d=b.type=1),f&&b&&
b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Rb=function(){var c=a.ma,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.Ub()){var b={},d=0,e=a.rb(),g=e?e.split("&"):0,k,l,h,e=0;if(g)for(k=0;k<g.length;k++)l=g[k].split("="),
f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");k={};for(h in a.contextData)h&&!Object.prototype[h]&&"a.activitymap."==h.substring(0,14)&&(k[h]=a.contextData[h],a.contextData[h]="");a.e=a.o("c",k)+(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(h=0;h<f.length;h++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),k=0;k<b[l].length;k++)g=b[l][k],g==f[h]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":
"")+l+"&u=0"),b[l].splice(k,1),d=1);c||(d=1);if(d){e="";k=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),k=1);for(l in b)!Object.prototype[l]&&0<k&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),k--);a.zb(e)}}}return c};a.rb=function(){if(a.useLinkTrackSessionStorage){if(a.Ea())return h.sessionStorage.getItem(a.P)}else return a.cookieRead(a.P)};a.Ea=function(){return h.sessionStorage?!0:!1};a.zb=function(c){a.useLinkTrackSessionStorage?a.Ea()&&h.sessionStorage.setItem(a.P,
c):a.cookieWrite(a.P,c)};a.Sb=function(){if(!a.bc){var c=new Date,b=p.location,d,f,e=f=d="",g="",k="",l="1.2",h=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",q="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l="1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;
g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;k=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.kc(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),q=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=h;a.browserWidth=g;a.browserHeight=k;a.connectionType=q;a.homepage=m;a.bc=1}};a.Q={};a.loadModule=function(c,b){var d=a.Q[c];if(!d){d=h["AppMeasurement_Module_"+
c]?new h["AppMeasurement_Module_"+c](a):{};a.Q[c]=a[c]=d;d.kb=function(){return d.ub};d.Ab=function(b){if(d.ub=b)a[c+"_onLoad"]=b,a.fa(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",{get:d.kb,set:d.Ab}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.fa(c+"_onLoad",[a,d],1)||b(a,d))};a.u=function(c){var b,d;for(b in a.Q)if(!Object.prototype[b]&&(d=a.Q[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Ub=function(){return a.ActivityMap&&
a.ActivityMap._c?!0:!1};a.Vb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.S=function(c,b){var d,f,e,g,k,h,m;m={};for(d=0;2>d;d++)for(f=0<d?a.Ga:a.g,e=0;e<f.length;e++)if(g=f[e],(k=c[g])||c["!"+g]){if(k&&!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(h in a[g])k[h]||
(k[h]=a[g][h]);a[g]||(m["!"+g]=1);m[g]=a[g];a[g]=k}return m};a.hc=function(c){var b,d,f,e;for(b=0;2>b;b++)for(d=0<b?a.Ga:a.g,f=0;f<d.length;f++)e=d[f],c[e]=a[e],c[e]||"prop"!==e.substring(0,4)&&"eVar"!==e.substring(0,4)&&"hier"!==e.substring(0,4)&&"list"!==e.substring(0,4)&&"channel"!==e&&"events"!==e&&"eventList"!==e&&"products"!==e&&"productList"!==e&&"purchaseID"!==e&&"transactionID"!==e&&"state"!==e&&"zip"!==e&&"campaign"!==e&&"events2"!==e&&"latitude"!==e&&"longitude"!==e&&"ms_a"!==e&&"contextData"!==
e&&"supplementalDataID"!==e&&"tnt"!==e&&"timestamp"!==e&&"abort"!==e&&"useBeacon"!==e&&"linkObject"!==e&&"clickObject"!==e&&"linkType"!==e&&"linkName"!==e&&"linkURL"!==e&&"bodyClickTarget"!==e&&"bodyClickFunction"!==e||(c["!"+e]=1)};a.Mb=function(a){var b,d,f,e,g,k=0,h,m="",n="";if(a&&255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(h=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,
d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?k=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")?k=",p,ei,":0<=e.indexOf("baidu.")&&(k=",wd,word,"),k&&h)))){if((a=h.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=k.indexOf(","+e.substring(0,d)+",")?m+=(m?"&":"")+e:n+=(n?"&":"")+e;m&&n?h=m+"&"+n:n=""}d=253-(h.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+h}return a};a.eb=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange",
"visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ca=!1;a.H=!1;a.Cb=function(){a.H=!0;a.p()};a.I=!1;a.Db=function(c){a.marketingCloudVisitorID=c.MCMID;a.visitorOptedOut=c.MCOPTOUT;a.analyticsVisitorID=c.MCAID;a.audienceManagerLocationHint=c.MCAAMLH;a.audienceManagerBlob=c.MCAAMB;a.I=!1;a.p()};a.cb=function(c){a.maxDelay||
(a.maxDelay=250);return a.u("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.aa=!1;a.G=!1;a.Aa=function(){a.G=!0;a.p()};a.isReadyToTrack=function(){var c=!0;if(!a.ob()||!a.mb())return!1;a.qb()||(c=!1);a.tb()||(c=!1);return c};a.ob=function(){a.ca||a.H||(a.eb(a.Cb)?a.H=!0:a.ca=!0);return a.ca&&!a.H?!1:!0};a.mb=function(){var c=a.wa();if(c)if(a.ta||a.ba)if(a.ta){if(!c.isApproved(c.Categories.ANALYTICS))return!1}else return!1;else return c.fetchPermissions(a.vb,!0),a.ba=!0,!1;return!0};a.V=
function(c){var b=a.wa();return b&&!b.isApproved(b.Categories[c])?!1:!0};a.wa=function(){return h.adobe&&h.adobe.optIn?h.adobe.optIn:null};a.Y=!0;a.qb=function(){var c=a.T();if(!c||!c.getVisitorValues)return!0;a.Y&&(a.Y=!1,a.I||(a.I=!0,c.getVisitorValues(a.Db)));return!a.I};a.T=function(){var c=a.visitor;c&&!c.isAllowed()&&(c=null);return c};a.tb=function(){a.aa||a.G||(a.cb(a.Aa)?a.G=!0:a.aa=!0);return a.aa&&!a.G?!1:!0};a.ba=!1;a.vb=function(){a.ba=!1;a.ta=!0};a.j=q;a.q=0;a.callbackWhenReadyToTrack=
function(c,b,d){var f;f={};f.Hb=c;f.Gb=b;f.Eb=d;a.j==q&&(a.j=[]);a.j.push(f);0==a.q&&(a.q=setInterval(a.p,100))};a.p=function(){var c;if(a.isReadyToTrack()&&(a.Bb(),a.j!=q))for(;0<a.j.length;)c=a.j.shift(),c.Gb.apply(c.Hb,c.Eb)};a.Bb=function(){a.q&&(clearInterval(a.q),a.q=0)};a.ua=function(c){var b,d={};a.hc(d);if(c!=q)for(b in c)d[b]=c[b];a.callbackWhenReadyToTrack(a,a.Fa,[d]);a.Da()};a.Ob=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=
Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.Fa=function(c){var b=new Date,d="s"+Math.floor(b.getTime()/108E5)%10+Math.floor(1E13*Math.random()),f=b.getYear(),f="t="+a.escape(b.getDate()+"/"+b.getMonth()+"/"+(1900>f?f+1900:f)+" "+b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()+" "+b.getDay()+" "+b.getTimezoneOffset()),e=a.T(),g;c&&(g=a.S(c,1));
a.Vb()&&!a.visitorOptedOut&&(a.xa()||(a.fid=a.Ob()),a.Yb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(b.getTime()/1E3)),c=h.location,a.pageURL||(a.pageURL=c.href?c.href:c),a.referrer||a.$a||(c=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=c||void 0===c?void 0===c?"":c:p.document.referrer),a.$a=1,!a.referrer&&a.Z&&(a.referrer=a.Z),a.Z=0,a.referrer=a.Mb(a.referrer),a.u("_g")),a.Rb()&&!a.abort&&(e&&a.V("TARGET")&&
!a.supplementalDataID&&e.getSupplementalDataID&&(a.supplementalDataID=e.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.V("AAM")||(a.contextData["cm.ssf"]=1),a.Sb(),a.wb(),f+=a.Qb(),a.sb(d,f),a.u("_t"),a.referrer="")));a.referrer&&(a.Z=a.referrer);a.Da();g&&a.S(g,1)};a.t=a.track=function(c,b){b&&a.S(b);a.Y=!0;a.isReadyToTrack()?null!=a.j&&0<a.j.length?(a.ua(c),a.p()):a.Fa(c):a.ua(c)};a.wb=function(){a.writeSecureCookies&&!a.ssl&&a.ab()};a.ab=function(){a.contextData.excCodes=
a.contextData.excCodes?a.contextData.excCodes:[];a.contextData.excCodes.push(1)};a.Da=function(){a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=h.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=a.useBeacon=a.referrer=0;a.contextData&&a.contextData.excCodes&&(a.contextData.excCodes=0)};a.Ca=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Ca.push([c,
b]):a.debugTracking&&a.C("DEBUG: Non function type passed to registerPreTrackCallback")};a.hb=function(c){a.va(a.Ca,c)};a.Ba=[];a.registerPostTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Ba.push([c,b]):a.debugTracking&&a.C("DEBUG: Non function type passed to registerPostTrackCallback")};a.gb=function(c){a.va(a.Ba,c)};a.va=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1].slice();e.unshift(b);if("function"==
typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.C(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.bodyClickTarget=c,a.bodyClickFunction=e);return a.track(f)};a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||
"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.sb=function(c,b){var d=a.ib()+"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.za()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.hb(d);a.fb(d);a.U()};a.ib=function(){var c=a.jb();return"http"+(a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(a.za()?"10":"1")+"/JS-"+a.version+(a.ac?"T":"")+(a.tagContainerMarker?
"-"+a.tagContainerMarker:"")};a.za=function(){return a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks};a.jb=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.lb()+"."+c+".2o7.net");return b};a.lb=function(){var c=a.visitorNamespace;c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,""));return c};a.Za=/{(%?)(.*?)(%?)}/;a.gc=RegExp(a.Za.source,"g");a.Lb=
function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.gc),e=0;e<f.length;++e){var g=f[e],k=g.match(a.Za),h="";"%"==k[1]&&"timezone_offset"==k[2]?h=(new Date).getTimezoneOffset():"%"==k[1]&&"timestampz"==k[2]&&(h=a.Pb());d.c=d.c.replace(g,a.escape(h))}}};a.Pb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.k(4,c.getFullYear())+"-"+a.k(2,c.getMonth()+1)+"-"+
a.k(2,c.getDate())+"T"+a.k(2,c.getHours())+":"+a.k(2,c.getMinutes())+":"+a.k(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.k(2,b.getUTCHours())+":"+a.k(2,b.getUTCMinutes())};a.k=function(a,b){return(Array(a+1).join(0)+b).slice(-a)};a.qa={};a.doPostbacks=function(c){if("object"==typeof c)if(a.Lb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);
else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.qa[d.id]=new Image,a.qa[d.id].alt="",a.qa[d.id].src=d.c)}};a.fb=function(c){a.i||a.Tb();a.i.push(c);a.ja=a.A();a.Ya()};a.Tb=function(){a.i=a.Wb();a.i||(a.i=[])};a.Wb=function(){var c,b;if(a.pa()){try{(b=h.localStorage.getItem(a.na()))&&(c=h.JSON.parse(b))}catch(d){}return c}};a.pa=function(){var c=!0;a.trackOffline&&
a.offlineFilename&&h.localStorage&&h.JSON||(c=!1);return c};a.Oa=function(){var c=0;a.i&&(c=a.i.length);a.l&&c++;return c};a.U=function(){if(a.l&&(a.v&&a.v.complete&&a.v.D&&a.v.R(),a.l))return;a.Pa=q;if(a.oa)a.ja>a.N&&a.Wa(a.i),a.ra(500);else{var c=a.Fb();if(0<c)a.ra(c);else if(c=a.Ma())a.l=1,a.Xb(c),a.$b(c)}};a.ra=function(c){a.Pa||(c||(c=0),a.Pa=setTimeout(a.U,c))};a.Fb=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.A()-a.Ua;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-
c};a.Ma=function(){if(0<a.i.length)return a.i.shift()};a.Xb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.C(b)}};a.xa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.X=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(v){t=null}t&&"y"==t.x?(a.X=!0,a.W=function(a){return JSON.parse(a)}):h.$&&h.$.parseJSON?(a.W=function(a){return h.$.parseJSON(a)},a.X=!0):a.W=function(){return null};a.$b=function(c){var b,
d,f;a.nb(c)&&(d=1,b={send:function(c){a.useBeacon=!1;navigator.sendBeacon(c)?b.R():b.ha()}});!b&&a.xa()&&2047<c.length&&(a.bb()&&(d=2,b=new XMLHttpRequest),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.X?b.Ha=!0:b=0));!b&&a.fc&&(c=c.substring(0,2047));!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type=
"text/javascript",b.setAttribute("async","async"),d=3):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof h.InstallTrigger||(b.abort=function(){b.src=q}));b.Va=Date.now();b.Ja=function(){try{b.D&&(clearTimeout(b.D),b.D=0)}catch(a){}};b.onload=b.R=function(){b.Va&&(a.ka=Date.now()-b.Va);a.gb(c);b.Ja();a.Jb();a.da();a.l=0;a.U();if(b.Ha){b.Ha=!1;try{a.doPostbacks(a.W(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.ha=function(){b.Ja();(a.trackOffline||a.oa)&&a.l&&a.i.unshift(a.Ib);a.l=0;
a.ja>a.N&&a.Wa(a.i);a.da();a.ra(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.R():b.ha())};a.Ua=a.A();if(1===d)b.send(c);else if(2===d)f=c.indexOf("?"),d=c.substring(0,f),f=c.substring(f+1),f=f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,""),b.open("POST",d,!0),b.withCredentials=!0,b.send(f);else if(b.src=c,3===d){if(a.Sa)try{f.removeChild(a.Sa)}catch(e){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Sa=a.v}b.D=setTimeout(function(){b.D&&(b.complete?b.R():(a.trackOffline&&
b.abort&&b.abort(),b.ha()))},5E3);a.Ib=c;a.v=h["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.J||a.bodyClickFunction)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ea=setTimeout(a.da,a.forcedLinkTrackingTimeout)};a.nb=function(c){var b=!1;navigator.sendBeacon&&(a.pb(c)?b=!0:a.useBeacon&&(b=!0));a.yb(c)&&(b=!1);return b};a.pb=function(a){return a&&0<a.indexOf("pe=lnk_e")?!0:!1};a.yb=function(a){return 64E3<=a.length};a.bb=function(){return"undefined"!==typeof XMLHttpRequest&&
"withCredentials"in new XMLHttpRequest?!0:!1};a.Jb=function(){if(a.pa()&&!(a.Ta>a.N))try{h.localStorage.removeItem(a.na()),a.Ta=a.A()}catch(c){}};a.Wa=function(c){if(a.pa()){a.Ya();try{h.localStorage.setItem(a.na(),h.JSON.stringify(c)),a.N=a.A()}catch(b){}}};a.Ya=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ma()}};a.forceOffline=function(){a.oa=!0};a.forceOnline=function(){a.oa=!1};a.na=function(){return a.offlineFilename+
"-"+a.visitorNamespace+a.account};a.A=function(){return(new Date).getTime()};a.Qa=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.ac=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.S(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=
typeof f[b]||0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:h.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>
e)return g;b=d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){return document.documentMode?document.documentMode:a.ya()?7:null}};a.F="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData contextData.cm.ssf contextData.opt.dmp contextData.opt.sell currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.F.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.la="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.O=a.la.slice(0);a.Ga="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout writeSecureCookies useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData useBeacon usePostbacks registerPreTrackCallback registerPostTrackCallback bodyClickTarget bodyClickFunction AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.O.push("prop"+m)),a.g.push("eVar"+m),a.O.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");a.g=a.g.concat(m);a.F=a.F.concat(m);a.ssl=0<=h.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.writeSecureCookies=
!1;a.offlineThrottleDelay=0;a.offlineFilename="AppMeasurement.offline";a.P="s_sq";a.Ua=0;a.ja=0;a.N=0;a.Ta=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=h;a.d=h.document;a.da=function(){a.ea&&(h.clearTimeout(a.ea),a.ea=q);a.bodyClickTarget&&a.J&&a.bodyClickTarget.dispatchEvent(a.J);a.bodyClickFunction&&("function"==typeof a.bodyClickFunction?a.bodyClickFunction():a.bodyClickTarget&&a.bodyClickTarget.href&&(a.d.location=a.bodyClickTarget.href));a.bodyClickTarget=
a.J=a.bodyClickFunction=0};a.Xa=function(){a.b=a.d.body;a.b?(a.r=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Ia)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.r,!1);else{a.b.removeEventListener("click",a.r,!0);a.Ia=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.M&&a.M==a.clickObject||!(a.clickObject.tagName||a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=
0;else{var k=a.M=a.clickObject;a.ia&&(clearTimeout(a.ia),a.ia=0);a.ia=setTimeout(function(){a.M==k&&(a.M=0)},1E4);f=a.Oa();a.track();if(f<a.Oa()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Qa(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||h.name&&d==h.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=new h.MouseEvent}if(b){try{b.initMouseEvent("click",
c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.bodyClickTarget=c.target,a.J=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.r):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&a.d.createEvent||
0<=navigator.userAgent.indexOf("Firefox/2")&&h.MouseEvent)&&(a.Ia=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.r,!0)),a.b.addEventListener("click",a.r,!1))):setTimeout(a.Xa,30)};a.fc=a.ya();a.Kb();a.mc||(r?a.setAccount(r):a.C("Error, missing Report Suite ID in AppMeasurement initialization"),a.Xa(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,h=window.s_c_il,q,p,m=r.split(","),s,u,t=0;if(h)for(q=0;!t&&q<h.length;){a=h[q];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(p=a.account?a.account:a.oun,p=a.allAccounts?a.allAccounts:p.split(","),s=0;s<m.length;s++)for(u=0;u<p.length;u++)m[s]==p[u]&&(t=1);q++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,h,q,p;if(a)for(h=0;h<a.length;h++)q=a[h],p=s_gi(q.oun),p.setAccount(q.un),p.setTagContainer(q.tagContainerName);r.s_giq=0}s_pgicq();