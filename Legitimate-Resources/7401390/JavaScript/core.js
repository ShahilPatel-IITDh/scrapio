//get All Query Params
var urlParams = new URLSearchParams(window.location.search);
//Get the OKTA Specific Request context - only exists in flows
var requestContext = window.OktaUtil !== undefined ? window.OktaUtil.getRequestContext() : undefined;
//Reload handler
try {
  if (urlParams.has("reset")) {
    window.sessionStorage.removeItem("requestQS");
  } else if (location.href.indexOf("reset-password") === -1) {
    if (requestContext !== undefined) {
      // store to sessionStorage to hydrate on a potential refresh
      //sessionStorage.setItem("oktaRequestContext", JSON.stringify(requestContext));
      var requestQS = requestContext.authentication.issuer.uri + "/v1/authorize" + window.location.search;
      window.sessionStorage.setItem("requestQS", requestQS);
    } else {
      // hydrate from sessionStorage and redirect to kick off flow
      var existingQS = window.sessionStorage.getItem("requestQS");
      if (existingQS) {
        location.href = existingQS;
      }
    }
  }
} catch (error) {
  console.warn("window.sessionStorage not available", error);
}

//Parameters
var defAssetsSubDomain = "idassets";
var stateFieldJson = "";

//set Language
var defaultLang = "en";
var defaultRegion = null;

function setDefaultLanguage() {
  const browserLang = window.navigator.language;
  if (browserLang.length == 2) {
    defaultLang = browserLang.toLowerCase();
  } else if (browserLang.length == 5 && browserLang.indexOf("-") == 2) {
    const langParts = browserLang.split("-");
    defaultLang = langParts[0];
    defaultRegion = langParts[1];
  }
}
setDefaultLanguage();

function findSonosLang() {
  const cookieValue = window.document.cookie;
  const cookieName = "SonosLang=";
  if (cookieValue.indexOf(cookieName) >= 0) {
    const sonosLang = cookieValue
      .split("; ")
      .find((row) => row.startsWith(cookieName))
      .split("=")[1];

    const langParts = sonosLang.split("_");
    defaultLang = langParts[0];
    defaultRegion = langParts[1];
  }
}
findSonosLang();
const lang = "lang";
const region = "region";

window.lang = urlParams.has(lang) ? urlParams.get(lang) : (getContextStateField(lang) == "" ? undefined : getContextStateField(lang)) || defaultLang;
window.lang = window.lang.toLowerCase();

window.region = urlParams.has(region) ? urlParams.get(region) : (getContextStateField(region) == "" ? undefined : getContextStateField(region)) || defaultRegion;
window.region = window.region ? window.region.toUpperCase() : defaultRegion;

function getSonosLang() {
  const regionLanguages = ["fr", "es", "nl", "de", "it"];
  if (regionLanguages.find((regionLanguage) => regionLanguage == window.lang)) {
    if (window.region) {
      return window.lang + "-" + window.region.toLowerCase();
    } else {
      return window.lang + "-" + window.lang;
    }
  }

  if (window.lang == "zh") {
    if (window.region) {
      return window.lang + "-" + window.region.toLowerCase();
    } else {
      return window.lang + "-cn";
    }
  }

  if (window.lang == "no" || window.lang == "nn") {
    return "nb";
  }

  return window.lang;
}

function getOktaLang() {
  if (window.lang == "nl") {
    return window.lang + "-" + window.lang;
  }

  if (window.lang == "zh") {
    if (!window.region || window.region == "HK") {
      return window.lang + "-CN";
    } else {
      return window.lang + "-" + window.region;
    }
  }

  if (window.lang == "no" || window.lang == "nn") {
    return "nb";
  }

  return window.lang;
}

//main widget object
window.updateObj = window.updateObj || {};
window.variantVars = window.variantVars || {};
//order is important here! keep the variant and fallback up top, just in case they change. If setting boolean here, use true|false, but if coming from JSON, set it "true"|"false"
//DEFAULTS - if you change these, you have to check ALL JSON files.
var thisvariantVars = {
  variant: "app", //variant that drives CSS and JSON file - Controller "app" is default
  variantfallback: "core", //fallback or default variant that CSS and JSON file
  showLogo: false, //should we show the sonos logo? {true|false}
  showBizLogo: false, //should we show the sonos pro logo? {true|false}
  showHeader: true, //should we show the built in Widget Header  {true|false}
  bodyclass: "", //specify an override CSS here
  rememberme: false, //should we show the rememberme checkbox
  reg: true, //DO NOT EVER SET THIS IN JSON - this uses the built in! DO NOT SET this elsewhere. Use showNav instead
  showNav: true, //this hides but doesn't remove the registration links so we can still programatically click on them.
  social: false, //should we show social login
  sonosLang: getSonosLang(),
  oktaLang: getOktaLang(), //set the language
};
//Do merge
window.variantVars = Object.assign(window.variantVars, thisvariantVars);
//VARIANTS
/* TODO: NOT BEING USED - REMOVE
var jsonvariant = ""; //main variant
var jsonvariant_def = ""; //default language variant
var jsonvariant_base = ""; //fallback variant
var jsonvariant_base_def = ""; //fallback default language variant
*/
//GET VARIANT
var contextVariant = getContextStateField("variantName");
if (contextVariant !== "") {
  window.variantVars.variant = contextVariant;
}
//Override Variant
if (urlParams.has("www")) {
  window.variantVars.variant = "www";
} else if (urlParams.has("beta")) {
  window.variantVars.variant = "beta";
} else if (urlParams.has("ci")) {
  window.variantVars.variant = "ci";
} else if (urlParams.has("app")) {
  window.variantVars.variant = "app";
} else if (urlParams.has("sbiz")) {
  window.variantVars.variant = "sbiz";
}

var appUrl = getContextStateField("appUrl");
//set cookie for continue link
if (appUrl !== "") {
  var date = new Date();
  var cookieExpirationTimeInMins = 5;
  date.setTime(date.getTime() + cookieExpirationTimeInMins * 60 * 1000);
  var cookie = "appUrl=" + appUrl + "; expires=" + date.toGMTString() + "; domain=.sonos.com; path=/";
  document.cookie = cookie;
}

// Add language to html element
var htmlElement = document.querySelector("html");
htmlElement.setAttribute("lang", window.variantVars.sonosLang);

//Create our own style element in the header
var sheet = (function () {
  // Create the <style> tag
  var style = document.createElement("style");

  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")

  // WebKit hack :(
  style.appendChild(document.createTextNode(""));

  // Add the <style> element to the page
  document.head.appendChild(style);

  return style.sheet;
})();

// eslint-disable-next-line no-unused-vars
function addCSSRule(selector, rules, index) {
  if ("insertRule" in sheet) {
    sheet.insertRule(selector + "{" + rules + "}", index);
  } else if ("addRule" in sheet) {
    sheet.addRule(selector, rules, index);
  }
}

function getJSON(path) {
  var finaljson = "";
  var xmlhttp = new XMLHttpRequest();
  var url = "https://" + defAssetsSubDomain + ".sonos.com/content/" + path;
  xmlhttp.onreadystatechange = function () {
    //console.log('json get: ' + this.status + ',' + this.readyState);
    if (this.readyState == 4) {
      if (this.status == 200) {
        //console.log(this.responseText);
        finaljson = JSON.parse(this.responseText);
        //console.log(finaljson);
      }
    }
  };
  try {
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
    return finaljson;
  } catch (error) {
    console.log("failed to load file", error);
    return {};
  }
}

function getVariant(thisvariant) {
  return thisvariant == null || thisvariant.length <= 0 ? "core" : thisvariant;
}

function loadSettings(thisvariant) {
  const path = getVariant(thisvariant) + "/" + "settings.json";
  return getJSON(path);
}

/***************START LOCALIZATION*****************/
function loadLocalization(thisvariant, forcelang) {
  const thislang = forcelang || defaultLang;
  const path = getVariant(thisvariant) + "/" + thislang + ".json";
  return getJSON(path);
}

//get content for section
/* PECKING ORDER = Variant in Specified Language -> FALLBACK in Specified Language -> Variant in Default EN -> FALLBACK in Default EN   (Fallback is by default CORE)
 * Path = json path
 * pvariant = variant
 * defvariant = default variant if specified
 * inlang = language to display
 * useDefaultLang = should we use the default language - usually en - if the specified language cant be found
 * isFallbackLang = is the current call of this function a default language call. Always set this to false outside the recursion
 * isFallbackVariant - is the current call of this function a default variant call. Always set this to false outside the recursion
 */

/*
 * Chose to merge two object with a shallow merge instead of using the spread operator because spread operator
 * is not supported in IE 11.
 * Chose the shallow merge instead of a deep merge because the configurations don't currently need deep merging.
 */
function shallowMerge(firstObj, secondObj) {
  let target = {};

  let merger = function (obj) {
    for (let prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        target[prop] = obj[prop];
      }
    }
  };

  merger(firstObj);
  merger(secondObj);

  return target;
}

function getContent(path, pvariant, defvariant, inLang, useDefaultLang, isFallbackLang, isFallbackVariant, isWidgetProperty) {
  var finalContent;
  var englishLang = "en";
  var jsObjName = "jsonvariant";
  if (isFallbackVariant) {
    jsObjName += "_base";
  }
  if (isFallbackLang) {
    jsObjName += "_def";
  }
  var jsObj = window[jsObjName];
  var thisVariant = isFallbackVariant ? defvariant : pvariant;
  var thisLang = isFallbackLang ? englishLang : inLang === "" ? englishLang : inLang;
  //check to see if obj is loaded!
  if (jsObj === undefined || jsObj == "") {
    const locale = loadLocalization(thisVariant, thisLang);
    const settings = loadSettings(thisVariant);
    jsObj = shallowMerge(locale, settings);
    window[jsObjName] = jsObj !== undefined && jsObj != "" ? jsObj : "{}"; //load empty if needed so it is not reloaded later
  }
  //content exists, now see if we can find a match
  if (jsObj !== undefined && jsObj != "") {
    useDefaultLang = useDefaultLang || false;
    //requested Language
    finalContent = getContentEle(jsObj, path, isWidgetProperty);
  }

  //console.log("finalContent for path: " + path + ", variant: " + pvariant + ", defvariant: " + defvariant + ", isFallbackVariant: " + isFallbackVariant + ", isFallbackLang: " + isFallbackLang);
  //console.log("finalContent : " + finalContent);

  //Recursive call
  if (finalContent === undefined && ((!isFallbackVariant && defvariant !== "" && window.variantVars.variant != window.variantVars.variantfallback) || (!isFallbackLang && useDefaultLang && defaultLang != inLang))) {
    var thisisFallbacklang = (!isFallbackLang && isFallbackVariant) || (isFallbackLang && !isFallbackVariant);
    var thisisFallbackVariant = (!isFallbackLang && !isFallbackVariant) || (isFallbackLang && !isFallbackVariant);
    finalContent = getContent(path, window.variantVars.variant, window.variantVars.variantfallback, inLang, useDefaultLang, thisisFallbacklang, thisisFallbackVariant);
  }
  finalContent = finalContent === undefined ? "" : finalContent;
  return finalContent;
}

//loop through element path to get object value if it exists!
function getContentEle(ele, fullpath, isWidgetProperty) {
  if (isWidgetProperty) {
    return getContentFromWidget(ele, fullpath);
  } else {
    return getDeepContent(ele, fullpath);
  }
}

function getDeepContent(ele, fullpath) {
  var parts = fullpath.split(".");
  var object = ele;
  for (let i = 0; i < parts.length; i++) {
    object = object[parts[i]];
    if (object === undefined) {
      break;
    }
  }
  //return ((typeof object) == 'string') ? object : undefined;
  return object;
}

function getContentFromWidget(ele, widgetPath) {
  return ele.widget == null ? "" : ele.widget[widgetPath];
}
/***************END LOCALIZATION*****************/

/****************START Core Functions******************/

//allow for overriding the variantVars object
/* TODO: NOT BEING USED - REMOVE
function overrideVariantVars(object) {
  window.variantVars = Object.assign(window.variantVars, object);
}
*/
//get context state field and return values passed in
function getContextStateField(fieldName) {
  var result = "";
  if (requestContext != undefined && requestContext.authentication !== undefined && requestContext.authentication.request !== undefined && requestContext.authentication.request.state !== undefined) {
    if (stateFieldJson == "") {
      //Not all clients sends a state field that is in this format
      try {
        var encodedString = requestContext.authentication.request.state;
        var decodedString = atob(encodedString);
        stateFieldJson = JSON.parse(decodedString);
      } catch (err) {
        // ignore error
      }
    }
    result = stateFieldJson[fieldName] || "";
  }
  return result;
}

//Individual Tasks related to the built in supported widget okta-login-container. These are variables and settings that come native out-of-the-box
var populateCoreContent = function () {
  //determine variant vars
  var thisvariant = window.variantVars.variant == "" ? window.variantVars.variantfallback : window.variantVars.variant;
  //Set VariantVars from JSON file
  for (let thisKey in thisvariantVars) {
    if (!urlParams.has(thisKey)) {
      var thisval = getContent("variables." + thisKey, thisvariant, window.variantVars.variantfallback, window.variantVars.sonosLang, true, false, false);
      if (thisval != null && thisval !== "") {
        //boolean
        if (thisval == "true" || thisval == "false") {
          window.variantVars[thisKey] = thisval == "true";
        }
        //string
        else {
          window.variantVars[thisKey] = thisval;
        }
        //case specific
        /* // TODO: NOT BEING USED
        if (thisKey == "variant") {
          //clear the contents to force a reload. This allows us to use the JSON file to override the variant. Make sure this is at the top of the JSON file section
          jsonvariant = jsonvariant_def = "";
        } else if (thisKey == "variantfallback") {
          //clear the contents to force a reload. This allows us to use the JSON file to override the variantfallback. Make sure this is at the top of the JSON file section
          jsonvariant_base_def = jsonvariant_base = "";
        }
        */
      }
    }
  }

  //console.log('variantVars.variant:' + variantVars.variant + ', variantVars.variantfallback:' + variantVars.variantfallback);

  //START WIDGET NATIVE LANGUAGE CONTENT
  var jsonWidgetPath = "widget";
  var rootObj = {};
  var langObj = {}; //"primaryauth.title": "Sign in to Acme"
  //populate from fallback first
  if (window.variantVars.variantfallback != window.variantVars.variant) {
    var jsonCoreFallback = loadLocalization(window.variantVars.variantfallback, window.variantVars.sonosLang);
    //loop over json and put it in the config
    for (let prop in jsonCoreFallback[jsonWidgetPath]) {
      langObj[prop] = jsonCoreFallback[jsonWidgetPath][prop];
    }
  }
  //loop over json and put it in the config, any dupes from corefallback will get overridden
  var jsonCore = loadLocalization(window.variantVars.variant, window.variantVars.lang);
  for (let prop in jsonCore[jsonWidgetPath]) {
    langObj[prop] = jsonCore[jsonWidgetPath][prop];
  }
  rootObj[window.variantVars.oktaLang] = langObj;
  window.updateObj["i18n"] = rootObj;
  //END WIDGET NATIVE LANGUAGE CONTENT

  //SET OTHER VARIABLES
  //set logo to blank - we will use our own here!
  window.updateObj["logo"] = "";

  //add Language only if it is specified!
  if (window.variantVars.oktaLang !== "") {
    window.updateObj["language"] = window.variantVars.oktaLang;
  }

  //Prefil Username
  if (urlParams.has("user")) {
    var user = urlParams.get("user");
    window.updateObj["username"] = user;
  }

  //ANY OVERRIDES - this only happens once on SPA Load
  //Override showNav
  const showNavParam = "showNav";
  const showNavProp = urlParams.has(showNavParam) ? urlParams.get(showNavParam) : getContextStateField(showNavParam) == "" ? "true" : getContextStateField(showNavParam);
  window.variantVars.showNav = showNavProp == "true";

  return true;
};
populateCoreContent();

//Based on variants, set and load some CSS files
function loadBodyClassAndCSS() {
  if (window.variantVars.variant !== "" || window.variantVars.bodyclass !== "") {
    var className = window.variantVars.bodyclass !== "" ? window.variantVars.bodyclass : window.variantVars.variant;
    //load the specific stylesheet
    var url = "//" + defAssetsSubDomain + ".sonos.com/css/" + className + ".css";
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    element.setAttribute("type", "text/css");
    element.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(element);
    //set the body class
    var body = document.body;
    body.classList.add(className);

    if (window.variantVars.showLogo) {
      body.classList.add("with-logo");
    }
  }
  return true;
}
loadBodyClassAndCSS();

/****************END Core Functions******************/
