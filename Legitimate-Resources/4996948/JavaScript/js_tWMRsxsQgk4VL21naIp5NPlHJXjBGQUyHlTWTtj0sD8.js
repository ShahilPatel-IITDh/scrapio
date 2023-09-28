/**
 * Beacon Error Handler
 * 
 * This module creates a public method to be used by other applications for the purpose of reporting error and debugging info.
 * 
 * Example usage:
 * var errorHandler = window.schwab.utilities.errorHandler;
 * try {
 *  //code to test
 * } catch (errorObject) {
 *   if(typeof errorHandler !== 'undefined') {
 *     errorHandler.reportException(errorObject);
 *     // or
 *     errorHandler.reportException(errorObject, {
 *       'component': 'bcn-pinned-nav',
 *       'type': 'error',
 *       'message': 'Error message describing issue to callout.'
 *     });
 *   }
 * }
 * 
 * Example usage:
 * var errorHandler = window.schwab.utilities.errorhandler;
 * if(condition) {
 *    // code
 * } else {
 *   if(typeof errorHandler !== 'undefined') {
 *     errorHandler.logMessage('message to log');
 *     // or
 *     errorHandler.logMessage('message to log', {
 *       'component': 'bcn-pinned-nav',
 *       'type': 'warning'
 *     });
 *   }
 * }
 * 
 */

(function (window, drupalSettings) {
  'use strict';

  var VALID_ENVIRONMENTS = ['local', 'dev', 'test'];
  var DEBUG_HASH = '#debug';
  var ENVIRONMENT = drupalSettings.schwab_utilities.environment;

  (function init() {
    _validateNamespace(['schwab', 'utilities', 'errorHandler']);

    window.schwab.utilities.errorHandler = {
      'report': reportException,
      'log': logMessage,
    };
  })();

  /**
   * Public method to be used by other JS files to report debugging info
   *
   * @param   {Error Object}  errorEvent            An error object describing the error incurred. 
   * @param   {object}        details               Optional details to further describe the error being reported.
   * @param   {string}          details.type        Logging method type to use: [error, warning, log]
   * @param   {string}          details.component   Component name that error occurred in. Default value: sch_beacon
   * @param   {string}          details.message     Message further describing the error.
   */
  function reportException(errorEvent, details) {
    var details = (arguments.length > 1 && arguments[1] !== undefined) ? arguments[1] : {};

    var shouldDebug = _shouldDebug();
    var message = _generateMessage(details);

    if (shouldDebug) {
      _getReportMethod((details.type || 'error'), message, errorEvent);
    }
  }

  /**
   * Public method for use by other JS files to log messages to the console
   *
   * @param   {string}  message               Message to be output to the console
   * @param   {object}  details               Optional details to further describe the error being reported.
   * @param   {string}    details.type        Logging method type to use: [error, warning, log]
   * @param   {string}    details.component   Component name that error occurred in. Default value: sch_beacon
   */
  function logMessage(message) {
    var details = (arguments.length > 1 && arguments[1] !== undefined) ? arguments[1] : {};

    details.message = message;
    var shouldDebug = _shouldDebug();
    var message = _generateMessage(details);

    if (shouldDebug) {
      _getReportMethod((details.type || 'warning'), message);
    }
  }

  /**
   * Determines if debugging should be allowed in the current environment
   *
   * @return  {boolean}  whether debugging info should be logged
   */
  function _shouldDebug() {
    var isValidEnvironment = VALID_ENVIRONMENTS.indexOf(ENVIRONMENT) > -1;
    var isDebugEnabled = decodeURI(window.location.hash) === DEBUG_HASH;

    return isDebugEnabled || isValidEnvironment;
  }

  /**
   * Sequentially checks if namespace path exists within window, creates path if it does not
   *
   * @param   {Array}  pathArray  Array of pathNames to validate
   */
  function _validateNamespace(pathArray) {
    pathArray.reduce(function (path, property) {
      if (!(property in path)) {
        path[property] = {};
      }
      return path[property];
    }, window);
  }

  /**
   * Gets the method intended for reporting errors
   *
   * @param   {string} type  Name of the method to use for reporting
   * @param   {string} message  Message to report
   * @param   {object} errorEvent  Error event data object
   */
  function _getReportMethod(type, message, errorEvent) {
    switch (type) {
      case 'warning':
        console.warn(message);
        if (errorEvent) {
          console.warn(errorEvent);
        }
        break;
      case 'error':
        console.error(message);
        if (errorEvent) {
          console.error(errorEvent);
        }
        break;
      case 'log':
      default:
        console.log(message);
        if (errorEvent) {
          console.log(errorEvent);
        }
        break;
    }
  }

  /**
   * Generates a message describing the error being reported
   *
   * @param   {object}        details               Optional details to further describe the error being reported.
   * @param   {string}          details.component   Component name that error occurred in. Default value: sch_beacon
   * @param   {string}          details.message     Message further describing the error.
   *
   * @return  {String}                              The message describing the reported error.
   */
  function _generateMessage(details) {
    var prefix = '[' + ('component' in details ? details.component : 'Schwab') + ']';
    var message = 'message' in details ? details.message : '';

    return [prefix, message].join(' ');
  }
})(window, drupalSettings);
;
/**
 * @file
 * The Lazy-load behavior.
 */

(function (Drupal) {

  'use strict';

  Drupal.behaviors.lazy = {
    attach: function (context, settings) {
      var utils = {
        extend: function (obj, src) {
          Object.keys(src).forEach(function (key) {
            obj[key] = src[key];
          });
          return obj;
        },
        once: function (selector, context) {
          return (context || document).querySelector(selector);
        },
        loadScript: function (url) {
          if (document.querySelectorAll('script[src="' + url + '"]').length == 0) {
            var script = document.createElement('script'),
              scripts = document.getElementsByTagName('script')[0];
            script.src = url;
            script.async = true;
            scripts.parentNode.insertBefore(script, scripts);
          }
        }
      };

      if (utils.once('body', context)) {
        var lazysizes = settings.lazy.lazysizes || {};

        if (!settings.lazy.preferNative) {
          // 1. Lazysizes configuration.
          window.lazySizesConfig = window.lazySizesConfig || {};
          window.lazySizesConfig = utils.extend(window.lazySizesConfig, lazysizes);
          // 2. Load all selected lazysizes plugins.
          if (!Object.entries) {
            Object.entries = function (obj) {
              var ownProps = Object.keys(obj),
                i = ownProps.length,
                resArray = new Array(i);
              while (i--) {
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
              }
              return resArray;
            };
          }
          var min = settings.lazy.minified ? '.min' : '';
          Object.entries(lazysizes.plugins).forEach(function (path) {
            utils.loadScript(settings.lazy.libraryPath + '/plugins/' + path[1] + min + '.js');
          });
          // 3. Load the lazysizes library.
          utils.loadScript(settings.lazy.libraryPath + '/lazysizes' + min + '.js');
        }
      }
    }
  };

})(Drupal);
;
/*! js-cookie v3.0.1 | MIT */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self,function(){var n=e.Cookies,o=e.Cookies=t();o.noConflict=function(){return e.Cookies=n,o}}())}(this,(function(){"use strict";function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)e[o]=n[o]}return e}return function t(n,o){function r(t,r,i){if("undefined"!=typeof document){"number"==typeof(i=e({},o,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var c="";for(var u in i)i[u]&&(c+="; "+u,!0!==i[u]&&(c+="="+i[u].split(";")[0]));return document.cookie=t+"="+n.write(r,t)+c}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],o={},r=0;r<t.length;r++){var i=t[r].split("="),c=i.slice(1).join("=");try{var u=decodeURIComponent(i[0]);if(o[u]=n.read(c,u),e===u)break}catch(e){}}return e?o[e]:o}},remove:function(t,n){r(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(o)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}));
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function ($, Drupal, cookies) {
  var deprecatedMessageSuffix = "is deprecated in Drupal 9.0.0 and will be removed in Drupal 10.0.0. Use the core/js-cookie library instead. See https://www.drupal.org/node/3104677";

  var isFunction = function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  var parseCookieValue = function parseCookieValue(value, parseJson) {
    if (value.indexOf('"') === 0) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      value = decodeURIComponent(value.replace(/\+/g, ' '));
      return parseJson ? JSON.parse(value) : value;
    } catch (e) {}
  };

  var reader = function reader(cookieValue, cookieName, converter, readUnsanitized, parseJson) {
    var value = readUnsanitized ? cookieValue : parseCookieValue(cookieValue, parseJson);

    if (converter !== undefined && isFunction(converter)) {
      return converter(value, cookieName);
    }

    return value;
  };

  $.cookie = function (key) {
    var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    Drupal.deprecationError({
      message: "jQuery.cookie() ".concat(deprecatedMessageSuffix)
    });

    if (value !== undefined && !isFunction(value)) {
      var attributes = _objectSpread(_objectSpread({}, $.cookie.defaults), options);

      if (typeof attributes.expires === 'string' && attributes.expires !== '') {
        attributes.expires = new Date(attributes.expires);
      }

      var cookieSetter = cookies.withConverter({
        write: function write(cookieValue) {
          return encodeURIComponent(cookieValue);
        }
      });
      value = $.cookie.json && !$.cookie.raw ? JSON.stringify(value) : String(value);
      return cookieSetter.set(key, value, attributes);
    }

    var userProvidedConverter = value;
    var cookiesShim = cookies.withConverter({
      read: function read(cookieValue, cookieName) {
        return reader(cookieValue, cookieName, userProvidedConverter, $.cookie.raw, $.cookie.json);
      }
    });

    if (key !== undefined) {
      return cookiesShim.get(key);
    }

    var results = cookiesShim.get();
    Object.keys(results).forEach(function (resultKey) {
      if (results[resultKey] === undefined) {
        delete results[resultKey];
      }
    });
    return results;
  };

  $.cookie.defaults = _objectSpread({
    path: ''
  }, cookies.defaults);
  $.cookie.json = false;
  $.cookie.raw = false;

  $.removeCookie = function (key, options) {
    Drupal.deprecationError({
      message: "jQuery.removeCookie() ".concat(deprecatedMessageSuffix)
    });
    cookies.remove(key, _objectSpread(_objectSpread({}, $.cookie.defaults), options));
    return !cookies.get(key);
  };
})(jQuery, Drupal, window.Cookies);;
(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.moderated_content_bulk_publish = {
        attach: function (context, settings) {
            $('#edit-submit').unbind('click.moderated_content_bulk_publish');
        }
    };
})(jQuery, Drupal, drupalSettings);;
(function (drupalSettings, $, document ) {
  'use strict';

  if (drupalSettings.schwabPrivacy) {

    var PrivacyCheck = {
      
      /**
       * Creates a button in the footer nav for One Trust to do the privacy check.
       *
       * @param {string} linkText The text for the link.
       */
      createLink : function (linkText) {
        var footerMenu = document.querySelector('.menu--footer-information-links .menu');

        if (!footerMenu) {
          footerMenu = document.querySelector('.menu--footer-alternate .menu');
        }

        if (footerMenu) {
          var oneTrustLink = document.createElement('a');
          var listItem = document.createElement('li');
          oneTrustLink.classList.add('ot-sdk-show-settings');
          oneTrustLink.textContent = linkText;
          oneTrustLink.href = "javascript:void(0)";
          listItem.appendChild(oneTrustLink);
          footerMenu.appendChild(listItem);
        }
      },
      
      /**
       * Sets up the button and One Trust libraries if in a configured state
       */
      init : function () {
        // Adding closure here to ensure the correct context of "this" is passed to the asynchonous function below.
        var thisPrivacy = this;

        setTimeout(function(){ 
          if ((typeof visitor_location !== 'undefined') && (drupalSettings.schwabPrivacy.states[visitor_location.state.toUpperCase()]) ) {
            var linkText = drupalSettings.schwabPrivacy.states[visitor_location.state]['link_text'];
            
            thisPrivacy.createLink(linkText);
          }
        }, 0);
      }
    };
    
    PrivacyCheck.init(); 
  }
})(drupalSettings, jQuery, document);
;
/**
 * @file
 * Adds titles to the spans that are generated by the ShareThis module.
 */

(function ($, Drupal, window, document) {
  'use strict';

  Drupal.behaviors.share_this_tooltips = {
    attach: function (context, settings) {
    	$('.sharethis-wrapper span').once('st_titles').each(function(i, obj){
    		var labelMap = {
    			googleplus: 'Google+',
					twitter: 'Twitter',
					facebook: 'Facebook',
					linkedin: 'LinkedIn',
    		};

    		var ele = $(obj);

    		var title = Drupal.t('Share on ' + labelMap[ele.attr('displaytext')]);

    		ele.attr('title', title);

    	});
    }
  };

})(jQuery, Drupal, this, document);;
(function ($, Drupal, window) {
  Drupal.behaviors.doubleclick_clickevents = {
    attach: function (context, settings) {
      var elements = {
        video_play: $('.video-embed-field-responsive-video iframe'),
        podcast_play: $('.jp-play'),
        podcast_dl: $('.podcast-download__button'),
        podcast_sub: $('.podcast-subscribe__button'),
        taxonomy_items: $('.categorization a'),
        related_items: $('.schwab-related a'),
        slide_items: $('.swiper-slide .views-field a, .swiper-slide .slide-title a'),
        cta_items: $('.block-contact__wrapper a, .call-to-action__link a, .schwab-inline-cta a'),
        slideshow_buttons: $('.swiper-button-prev, .swiper-button-next'),
        share_items: $('.sharethis-wrapper > span')
      };
      var pagehalf = $(document).height()/2;
      var scrollfire = false;
      var dcData = {
        "dcId": "reii",
        "articles": {
          "personal finance": {
            "landing": "pfplp",
            "nav": "pfpnav",
            "cta": "pfpcta",
            "scroll": "pfpst"
          },
          "market commentary": {
            "landing": "mclp",
            "nav": "mcnav",
            "cta": "mccta",
            "scroll": "mcst"
          },
          "stocks": {
            "landing": "stoclp",
            "nav": "stocnav",
            "cta": "stoccta",
            "scroll": "stocst"
          },
          "fixed income": {
            "landing": "filp",
            "nav": "finav",
            "cta": "ficta",
            "scroll": "fist"
          },
          "mutual funds": {
            "landing": "mflp",
            "nav": "mfnav",
            "cta": "mfcta",
            "scroll": "mfst"
          },
          "etfs": {
            "landing": "etflp",
            "nav": "etfnav",
            "cta": "etfcta",
            "scroll": "etfst"
          },
          "international": {
            "landing": "ilp",
            "nav": "inav",
            "cta": "icta",
            "scroll": "ist"
          },
          "portfolio management": {
            "landing": "pmlp",
            "nav": "pmnav",
            "cta": "pmcta",
            "scroll": "pmst"
          },
          "retirement planning": {
            "landing": "rplp",
            "nav": "rpnav",
            "cta": "rpcta",
            "scroll": "rpst"
          },
          "retirment income": {
            "landing": "rilp",
            "nav": "rinav",
            "cta": "ricta",
            "scroll": "rist"
          },
          "taxes": {
            "landing": "taxlp",
            "nav": "taxnav",
            "cta": "taxcta",
            "scroll": "taxst"
          },
          "behavioral finance": {
            "landing": "bflp",
            "nav": "bfnav",
            "cta": "bfcta",
            "scroll": "bfst"
          },
          "trading": {
            "landing": "tlp",
            "nav": "tnav",
            "cta": "tcta",
            "scroll": "tst"
          }
        },
        "infographic": {
          "personal finance": {
            "landing": "pfplp",
            "nav": "pfpnav",
            "cta": "pfpcta" 
          },
          "market commentary": {
            "landing": "mclp",
            "nav": "mcnav",
            "cta": "mccta" 
          },
          "stocks": {
            "landing": "stoclp",
            "nav": "stocnav",
            "cta": "stoccta" 
          },
          "fixed income": {
            "landing": "filp",
            "nav": "finav",
            "cta": "ficta" 
          },
          "mutual funds": {
            "landing": "mflp",
            "nav": "mfnav",
            "cta": "mfcta" 
          },
          "etfs": {
            "landing": "etflp",
            "nav": "etfnav",
            "cta": "etfcta" 
          },
          "international": {
            "landing": "ilp",
            "nav": "inav",
            "cta": "icta" 
          },
          "portfolio management": {
            "landing": "pmlp",
            "nav": "pmnav",
            "cta": "pmcta" 
          },
          "retirement planning": {
            "landing": "rplp",
            "nav": "rpnav",
            "cta": "rpcta" 
          },
          "retirment income": {
            "landing": "rilp",
            "nav": "rinav",
            "cta": "ricta" 
          },
          "taxes": {
            "landing": "taxlp",
            "nav": "taxnav",
            "cta": "taxcta" 
          },
          "behavioral finance": {
            "landing": "bflp",
            "nav": "bfnav",
            "cta": "bfcta" 
          },
          "trading": {
            "landing": "tlp",
            "nav": "tnav",
            "cta": "tcta" 
          }
        },
        "slideshow": {
          "personal finance": {
            "landing": "pfplp",
            "nav": "pfpnav",
            "cta": "pfpcta" 
          },
          "market commentary": {
            "landing": "mclp",
            "nav": "mcnav",
            "cta": "mccta" 
          },
          "stocks": {
            "landing": "stoclp",
            "nav": "stocnav",
            "cta": "stoccta" 
          },
          "fixed income": {
            "landing": "filp",
            "nav": "finav",
            "cta": "ficta" 
          },
          "mutual funds": {
            "landing": "mflp",
            "nav": "mfnav",
            "cta": "mfcta" 
          },
          "etfs": {
            "landing": "etflp",
            "nav": "etfnav",
            "cta": "etfcta" 
          },
          "international": {
            "landing": "ilp",
            "nav": "inav",
            "cta": "icta" 
          },
          "portfolio management": {
            "landing": "pmlp",
            "nav": "pmnav",
            "cta": "pmcta" 
          },
          "retirement planning": {
            "landing": "rplp",
            "nav": "rpnav",
            "cta": "rpcta" 
          },
          "retirment income": {
            "landing": "rilp",
            "nav": "rinav",
            "cta": "ricta" 
          },
          "taxes": {
            "landing": "taxlp",
            "nav": "taxnav",
            "cta": "taxcta" 
          },
          "behavioral finance": {
            "landing": "bflp",
            "nav": "bfnav",
            "cta": "bfcta" 
          },
          "trading": {
            "landing": "tlp",
            "nav": "tnav",
            "cta": "tcta" 
          }
        },
        "video": {
          "personal finance": {
            "landing": "pfplp",
            "nav": "pfpnav",
            "cta": "pfpcta", 
            "play": "pfpvp",
            "complete": "pfpvc"
          },
          "market commentary": {
            "landing": "mclp",
            "nav": "mcnav",
            "cta": "mccta", 
            "play": "mcvp",
            "complete": "mcvc"
          },
          "stocks": {
            "landing": "stoclp",
            "nav": "stocnav",
            "cta": "stoccta", 
            "play": "stocvp",
            "complete": "stocvc"
          },
          "fixed income": {
            "landing": "filp",
            "nav": "finav",
            "cta": "ficta", 
            "play": "fivp",
            "complete": "fivc"
          },
          "mutual funds": {
            "landing": "mflp",
            "nav": "mfnav",
            "cta": "mfcta", 
            "play": "mfvp",
            "complete": "mfvc"
          },
          "etfs": {
            "landing": "etflp",
            "nav": "etfnav",
            "cta": "etfcta", 
            "play": "mfvp",
            "complete": "mfvc"
          },
          "international": {
            "landing": "ilp",
            "nav": "inav",
            "cta": "icta", 
            "video play": "ivp",
            "video complete": "ivc"
          },
          "portfolio management": {
            "landing": "pmlp",
            "nav": "pmnav",
            "cta": "pmcta", 
            "play": "pmvp",
            "complete": "pmvc"
          },
          "retirement planning": {
            "landing": "rplp",
            "nav": "rpnav",
            "cta": "rpcta", 
            "play": "rpvp",
            "complete": "rpvc"
          },
          "retirment income": {
            "landing": "rilp",
            "nav": "rinav",
            "cta": "ricta", 
            "play": "rivp",
            "complete": "rivc"
          },
          "taxes": {
            "landing": "taxlp",
            "nav": "taxnav",
            "cta": "taxcta", 
            "play": "rivp",
            "complete": "rivc"
          },
          "behavioral finance": {
            "landing": "bflp",
            "nav": "bfnav",
            "cta": "bfcta", 
            "play": "bfvp",
            "complete": "bfvc"
          },
          "trading": {
            "landing": "tlp",
            "nav": "tnav",
            "cta": "tcta", 
            "play": "tvp",
            "complete": "tvc"
          }
        },
        "podcast": {
          "personal finance": {
            "landing": "pfplp",
            "nav": "pfpnav",
            "cta": "pfpcta",
            "play": "pfppp",
            "subscribe": "pfpps"
          },
          "market commentary": {
            "landing": "mclp",
            "nav": "mcnav",
            "cta": "mccta",
            "play": "mcpp",
            "subscribe": "mcps"
          },
          "stocks": {
            "landing": "stoclp",
            "nav": "stocnav",
            "cta": "stoccta",
            "play": "stocpp",
            "subscribe": "stocps"
          },
          "fixed income": {
            "landing": "filp",
            "nav": "finav",
            "cta": "ficta",
            "play": "fipp",
            "subscribe": "fips"
          },
          "mutual funds": {
            "landing": "mflp",
            "nav": "mfnav",
            "cta": "mfcta",
            "play": "mfpp",
            "subscribe": "mfps"
          },
          "etfs": {
            "landing": "etflp",
            "nav": "etfnav",
            "cta": "etfcta",
            "play": "etfpp",
            "subscribe": "etfps"
          },
          "international": {
            "landing": "ilp",
            "nav": "inav",
            "cta": "icta",
            "play": "ipp",
            "subscribe": "ips"
          },
          "portfolio management": {
            "landing": "pmlp",
            "nav": "pmnav",
            "cta": "pmcta",
            "play": "pmpp",
            "subscribe": "pmps"
          },
          "retirement planning": {
            "landing": "rplp",
            "nav": "rpnav",
            "cta": "rpcta",
            "play": "rppp",
            "subscribe": "rpps"
          },
          "retirment income": {
            "landing": "rilp",
            "nav": "rinav",
            "cta": "ricta",
            "play": "ripp",
            "subscribe": "rips"
          },
          "taxes": {
            "landing": "taxlp",
            "nav": "taxnav",
            "cta": "taxcta",
            "play": "taxpp",
            "subscribe": "taxps"
          },
          "behavioral finance": {
            "landing": "bflp",
            "nav": "bfnav",
            "cta": "bfcta",
            "play": "bfpp",
            "subscribe": "bfps"
          },
          "trading": {
            "landing": "tlp",
            "nav": "tnav",
            "cta": "tcta",
            "play": "tpp",
            "subscribe": "tps"
          }
        },
        "home": {
          "landing": "homelp",
          "nav": "homenav"
        },
        "index": {
          "landing": "indexlp",
          "nav": "indexnav"
        }
      };

      if (window.waScContentType) {
        var contentType = window.waScContentType.toLowerCase();
      }
      if (window.waPrimaryCat) {
        var primaryCat = window.waPrimaryCat.toLowerCase();
        // Temporary until we get sub categories for Retirement
        if(primaryCat == "retirement") {
          primaryCat = "retirement planning";
        }
      }
      
      function attachDcEventHandlers(data) {
        // ATTACH NAV HANDLER -  .section-categories .categorization--primary-category field a
        elements.taxonomy_items.on('click touch', function(e) {
          DcOnClickTracking(data.dcId, data.articles[primaryCat].nav);
        });

        elements.related_items.on('click touch', function(e) {
          DcOnClickTracking(data.dcId, data.articles[primaryCat].nav);
        });

        elements.slide_items.on('click touch', function(e) {
          DcOnClickTracking(data.dcId, data.articles[primaryCat].nav);
        });

        elements.slideshow_buttons.on('click touch', function(e) {
          DcOnClickTracking(data.dcId, data.articles[primaryCat].nav);
        });

        elements.share_items.on('click touch', function(e) {
          DcOnClickTracking('reii','ss');
        });

        // ATTACH CTA HANDLER - ID contains CTA

        elements.cta_items.on('click touch', function(e) {
          DcOnClickTracking(data.dcId, data.articles[primaryCat].cta);
        });

        if(contentType && contentType.indexOf("article") > -1) {
          $(window).on('scroll', function() {
            if(($(this).scrollTop() > pagehalf) && scrollfire == false) {
              DcOnClickTracking(data.dcId, data.articles[primaryCat].scroll);
              scrollfire = true;
            }
          });
        }
        //ATTACH VIDEO TAGS IF TYPE IS VIDEO
        if(contentType && contentType.indexOf("video") > -1) {
          elements.video_play.on('click touch', function() {
            DcOnClickTracking(data.dcId, data.video[primaryCat].play);
          });
        }

        //ATTACH PODCAST TAGES IF TYPE IS PODCAST
        if(contentType && contentType.indexOf("podcast") > -1) {
          elements.podcast_play.on('click touch', function() {
            DcOnClickTracking(data.dcId, data.podcast[primaryCat].play);
          });
          elements.podcast_dl.on('click touch', function() {
            DcOnClickTracking(data.dcId, data.podcast[primaryCat].play);
          });
          elements.podcast_sub.on('click touch', function() {
            DcOnClickTracking(data.dcId, data.podcast[primaryCat].subscribe);
          });
        }
      }

      if (primaryCat) {
        attachDcEventHandlers(dcData);
      }
   
    }
  };
})(jQuery, Drupal, window);
;
/*!
 * @preserve
 * jquery.scrolldepth.js | v1.0
 * Copyright (c) 2016 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){"use strict";var n,t,r,o,i={minHeight:0,elements:[],percentage:!0,userTiming:!0,pixelDepth:!0,nonInteraction:!0,gaGlobal:!1,gtmOverride:!1,trackerName:!1,dataLayer:"dataLayer"},a=e(window),l=[],c=!1,u=0;return e.scrollDepth=function(p){function s(e,i,a,l){var c=p.trackerName?p.trackerName+".send":"send";o?(o({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:e,eventLabel:i,eventValue:1,eventNonInteraction:p.nonInteraction}),p.pixelDepth&&arguments.length>2&&a>u&&(u=a,o({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:"Pixel Depth",eventLabel:d(a),eventValue:1,eventNonInteraction:p.nonInteraction})),p.userTiming&&arguments.length>3&&o({event:"ScrollTiming",eventCategory:"Scroll Depth",eventAction:e,eventLabel:i,eventTiming:l})):(n&&(window[r](c,"event","Scroll Depth",e,i,1,{nonInteraction:p.nonInteraction}),p.pixelDepth&&arguments.length>2&&a>u&&(u=a,window[r](c,"event","Scroll Depth","Pixel Depth",d(a),1,{nonInteraction:p.nonInteraction})),p.userTiming&&arguments.length>3&&window[r](c,"timing","Scroll Depth",e,l,i)),t&&(_gaq.push(["_trackEvent","Scroll Depth",e,i,1,p.nonInteraction]),p.pixelDepth&&arguments.length>2&&a>u&&(u=a,_gaq.push(["_trackEvent","Scroll Depth","Pixel Depth",d(a),1,p.nonInteraction])),p.userTiming&&arguments.length>3&&_gaq.push(["_trackTiming","Scroll Depth",e,l,i,100])))}function h(e){return{"25%":parseInt(.25*e,10),"50%":parseInt(.5*e,10),"75%":parseInt(.75*e,10),"100%":e-5}}function g(n,t,r){e.each(n,function(n,o){-1===e.inArray(n,l)&&t>=o&&(s("Percentage",n,t,r),l.push(n))})}function f(n,t,r){e.each(n,function(n,o){-1===e.inArray(o,l)&&e(o).length&&t>=e(o).offset().top&&(s("Elements",o,t,r),l.push(o))})}function d(e){return(250*Math.floor(e/250)).toString()}function m(){y()}function v(e,n){var t,r,o,i=null,a=0,l=function(){a=new Date,i=null,o=e.apply(t,r)};return function(){var c=new Date;a||(a=c);var u=n-(c-a);return t=this,r=arguments,0>=u?(clearTimeout(i),i=null,a=c,o=e.apply(t,r)):i||(i=setTimeout(l,u)),o}}function y(){c=!0,a.on("scroll.scrollDepth",v(function(){var n=e(document).height(),t=window.innerHeight?window.innerHeight:a.height(),r=a.scrollTop()+t,o=h(n),i=+new Date-D;return l.length>=p.elements.length+(p.percentage?4:0)?(a.off("scroll.scrollDepth"),void(c=!1)):(p.elements&&f(p.elements,r,i),void(p.percentage&&g(o,r,i)))},500))}var D=+new Date;p=e.extend({},i,p),e(document).height()<p.minHeight||(p.gaGlobal?(n=!0,r=p.gaGlobal):"function"==typeof ga?(n=!0,r="ga"):"function"==typeof __gaTracker&&(n=!0,r="__gaTracker"),"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&(t=!0),"function"==typeof p.eventHandler?o=p.eventHandler:"undefined"==typeof window[p.dataLayer]||"function"!=typeof window[p.dataLayer].push||p.gtmOverride||(o=function(e){window[p.dataLayer].push(e)}),e.scrollDepth.reset=function(){l=[],u=0,a.off("scroll.scrollDepth"),y()},e.scrollDepth.addElements=function(n){"undefined"!=typeof n&&e.isArray(n)&&(e.merge(p.elements,n),c||y())},e.scrollDepth.removeElements=function(n){"undefined"!=typeof n&&e.isArray(n)&&e.each(n,function(n,t){var r=e.inArray(t,p.elements),o=e.inArray(t,l);-1!=r&&p.elements.splice(r,1),-1!=o&&l.splice(o,1)})},m())},e.scrollDepth});;
// This file was modified to be wrapped inside a Drupal behavior,
// and global varables were explicitly attached to the window.
(function (Drupal, window) {
  Drupal.behaviors.schwab_tealium_ps_tag_header = {
    attach: function (context, settings) {
      // Global switch
      window.wa_enable = true;

      window.hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
      window.b64pad = "="; /* base-64 pad character. "=" for strict RFC compliance   */
      window.chrsz = 8; /* bits per input character. 8 - ASCII; 16 - Unicode      */
      window.sendBid = "";
      window.wa_global_disable = false;
      /* Method for SHA 256 encryption. */
      function SHA256(s) {

        var chrsz = 8;
        var hexcase = 0;

        function safe_add(x, y) {
          var lsw = (x & 0xFFFF) + (y & 0xFFFF);
          var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xFFFF);
        }

        function S(X, n) {
          return (X >>> n) | (X << (32 - n));
        }

        function R(X, n) {
          return (X >>> n);
        }

        function Ch(x, y, z) {
          return ((x & y) ^ ((~x) & z));
        }

        function Maj(x, y, z) {
          return ((x & y) ^ (x & z) ^ (y & z));
        }

        function Sigma0256(x) {
          return (S(x, 2) ^ S(x, 13) ^ S(x, 22));
        }

        function Sigma1256(x) {
          return (S(x, 6) ^ S(x, 11) ^ S(x, 25));
        }

        function Gamma0256(x) {
          return (S(x, 7) ^ S(x, 18) ^ R(x, 3));
        }

        function Gamma1256(x) {
          return (S(x, 17) ^ S(x, 19) ^ R(x, 10));
        }

        function core_sha256(m, l) {
          var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
          var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
          var W = new Array(64);
          var a, b, c, d, e, f, g, h, i, j;
          var T1, T2;

          m[l >> 5] |= 0x80 << (24 - l % 32);
          m[((l + 64 >> 9) << 4) + 15] = l;

          for (var i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (var j = 0; j < 64; j++) {
              if (j < 16) W[j] = m[j + i];
              else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

              T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
              T2 = safe_add(Sigma0256(a), Maj(a, b, c));

              h = g;
              g = f;
              f = e;
              e = safe_add(d, T1);
              d = c;
              c = b;
              b = a;
              a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
          }
          return HASH;
        }

        function str2binb(str) {
          var bin = Array();
          var mask = (1 << chrsz) - 1;
          for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
          }
          return bin;
        }


          /*
           * Convert an binary array to a string
           */
           function binb2str(input) {
            var output = "";
            for (var i = 0; i < input.length * 32; i += 8)
              output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
            return output;
          }

          /*
           * Convert a raw string to a base-64 string
           */
           function str2b64(input) {
            try {
              b64pad
            } catch (e) {
              b64pad = '';
            }
            var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var output = "";
            var len = input.length;
            for (var i = 0; i < len; i += 3) {
              var triplet = (input.charCodeAt(i) << 16) |
              (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) |
              (i + 2 < len ? input.charCodeAt(i + 2) : 0);
              for (var j = 0; j < 4; j++) {
                if (i * 8 + j * 6 > input.length * 8) output += b64pad;
                else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
              }
            }
            return output;
          }

          return str2b64(binb2str(core_sha256(str2binb(s), s.length * chrsz)));

        }


        function getCookie(c_name) {
          var i, x, y, cookies = document.cookie.split(";");
          for (i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf("="));
            y = cookies[i].substr(cookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == c_name) {
              return unescape(y);
            }
          }
        }


        function fetchBrowserId(cbidInd) {
          var cbid;
          var np2 = getCookie("NP2");
          if (np2 != null && np2.indexOf("|") != -1) {
            var val = np2.split("|");
            if (val.length > 2) {
                  cbid = cbidInd + SHA256(cbidInd + val[1]); //Browser ID
                  sendBid = val[1];
                }
              } else {
                var browserId = base64ToAscii(bin2String(str2ab(createGuid()))).replace(/(^=+|=+$)/mg, "");
                var np2Cookie = "|" + browserId + "|||||||||||||";
                mkTmsCookie("NP2", np2Cookie, 6000, "/", ".schwab.com");
                cbid = cbidInd + SHA256(cbidInd + browserId);
                sendBid = browserId;
              }
              return cbid;
            }

            function base64ToAscii(text) {
              var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
              i = 0,
              cur, prev, byteNum,
              result = [];

              while (i < text.length) {

                cur = text.charCodeAt(i);
                byteNum = i % 3;

                switch (byteNum) {
                  case 0: //first byte
                  result.push(digits.charAt(cur >> 2));
                  break;

                  case 1: //second byte
                  result.push(digits.charAt((prev & 3) << 4 | (cur >> 4)));
                  break;

                  case 2: //third byte
                  result.push(digits.charAt((prev & 0x0f) << 2 | (cur >> 6)));
                  result.push(digits.charAt(cur & 0x3f));
                  break;
                }

                prev = cur;
                i++;
              }
              return result.join("");
            }

      // NP2 Cookie Initialization for Akamai Pages
      function mkTmsCookie(name, value, expires, path, domain) {
        var cookie = name + "=" + value + ";";

        if (expires) {
              // If it's a date
              if (expires instanceof Date) {
                  // If it isn't a valid date
                  if (isNaN(expires.getTime()))
                    expires = new Date();
                } else
                expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

                cookie += "expires=" + expires.toGMTString() + ";";
              }

              if (path)
                cookie += "path=" + path + ";";
              if (domain)
                cookie += "domain=" + domain + ";";

              document.cookie = cookie;
            }

            function str2ab(str) {
              var res = str.split('-');
              var bufView = new Array(16);
              var k = 0;
          // Convert every two chars of each portion
          // of res from hex to int.
          for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < res[i].length; j += 2) {
              var hex = res[i][j] + res[i][j + 1];
              bufView[k++] = parseInt(hex, 16);
            }
          }
          return bufView;
        }

        function bin2String(array) {
          var result = "";
          for (var i = 0; i < array.length; i++) {
            result += String.fromCharCode(parseInt(array[i]));
          }
          return result;
        }

        function createGuid() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        }

      // UTAG Data Object
      window.utag_data = {
        sc_report_suite: typeof(tealium_report_suite) == "undefined" ? "" : tealium_report_suite,
        sc_server: typeof(metric_server) == "undefined" ? "" : metric_server,
        sc_serversecure: typeof(metric_secure_server) == "undefined" ? "" : metric_secure_server,
        env_id: typeof(waEnvId) == "undefined" ? "DEV" : waEnvId,
        page_name: typeof(waPageName) == "undefined" ? "DEFAULT_PAGE_NAME" : waPageName,
        page_path: typeof(waUri) == "undefined" ? location.pathname : waUri,
        page_category: typeof(waCategoryName) == "undefined" ? "prospects" : waCategoryName,
        page_multi_level_category: typeof(waMultiLevelCategory) == "undefined" ? "" : waMultiLevelCategory,
        page_use_default_name: typeof(waUseDefaultPageName) == "undefined" ? false : waUseDefaultPageName,

        campaign_id: typeof(waCampaign) == "undefined" ? "" : waCampaign,
        link_tracking: typeof (waLinkTracking) == "undefined" ? false : waLinkTracking,
        entry_tracking: typeof(waEntryTracking) == "undefined" ? false : waEntryTracking,
        segment: typeof(waSegment) == "undefined" ? "" : waSegment,
        segment_code: typeof(waSegmentCode) == "undefined" ? "" : waSegmentCode,
        user_id: typeof(waUserId) == "undefined" ? "" : waUserId,
        page_disabled: typeof(waDisabled) == "undefined" ? false : waDisabled,
        application_name: typeof(waAppName) == "undefined" ? "" : waAppName,
        success_event_id: typeof(waSuccessEventId) == "undefined" ? "" : waSuccessEventId,
        application_id: typeof(waApplicationId) == "undefined" ? "" : waApplicationId,
        account_type: typeof(waAccountType) == "undefined" ? "" : waAccountType,
        lead_type: typeof(waLeadType) == "undefined" ? "" : waLeadType,
        transaction_id: typeof(waCeid) == "undefined" ? "" : waCeid,
        correlated_browser_id: fetchBrowserId("A"),
        application_detail: typeof(waApplicationDetail1) == "undefined" ? "" : waApplicationDetail1,
        tool_name: typeof(waToolName) == "undefined" ? "" : waToolName,
        tool_success_action: typeof(waToolSuccessAction) == "undefined" ? "" : waToolSuccessAction,
        tool_error_desc: typeof(waToolErrorDescription) == "undefined" ? "" : waToolErrorDescription,
        language_code: typeof(waLanguage) == "undefined" ? "en-US" : waLanguage,
        moxie_chat_type: typeof(waChatType) == "undefined" ? "" : waChatType,
        moxie_service_line_id: typeof(waServiceLineId) == "undefined" ? "" : waServiceLineId,
        expert_insights_content_type: typeof(waScContentType) == "undefined" ? "" : waScContentType,
        apt_load: typeof(waAptLoad) == "undefined" ? "false" : waAptLoad,
        platform: typeof(waPlatform) == "undefined" ? "" : waPlatform,
        user_agent_string: navigator.userAgent,
        content_cta: typeof(waContentCTA) == "undefined" ? "" : waContentCTA,
        corp_customer_id: typeof(waCorpCustId) == "undefined" ? "" : waCorpCustId,
        firm_name: typeof(waFirmName) == "undefined" ? "" : waFirmName,
        audience_type: typeof(waAudienceType) == "undefined" ? "" : waAudienceType,


        dc_acct_type: typeof(waDcAcctType) == "undefined" ? "" : waDcAcctType,
        dc_src: typeof(waDcSrc) == "undefined" ? "" : waDcSrc,
        dc_type: typeof(waDcType) == "undefined" ? "" : waDcType,
        dc_cat: typeof(waDcCat) == "undefined" ? "" : waDcCat,
        dc_ceidg: typeof(waDcCeidG) == "undefined" ? "" : waDcCeidG,
        dc_browser_id: fetchBrowserId("G"),
        dc_tag_set: typeof(waDcTagSet) == "undefined" ? "" : waDcTagSet,

        marketo_acct_id: typeof(marketo_acct) == "undefined" ? "" : marketo_acct,
        marketo_enable: typeof (waMktoEnable) == "undefined" ? 0 : waMktoEnable,

        sz_id: typeof (waSzId) == "undefined" ? "" : waSzId,
        sz_redirect: typeof (waSzRedirect) == "undefined" ? null : waSzRedirect,
        sz_target: typeof (waSzTarget) == "undefined" ? null : waSzTarget,
        sz_params: typeof (waSzParams) == "undefined" ? null : waSzParams,

        quantcast_enable: typeof (waQuantcastEnable) == "undefined" ? null : waQuantcastEnable,

        user_agent_string: navigator.userAgent,

        site_subsection2: "",
        site_subsection3: "",
        search_keyword: typeof(waSearchParameter) == "undefined" ? "" : waSearchParameter,
        search_count: typeof(waSearchCount) == "undefined" ? "" : waSearchCount,

        custom_evar05: typeof (waCustEventVar5) == "undefined" ? "" : waCustEventVar5,
        custom_evar06: typeof (waCustEventVar6) == "undefined" ? "" : waCustEventVar6,
        custom_evar07: typeof (waCustEventVar7) == "undefined" ? "" : waCustEventVar7,
        custom_evar08: typeof (waCustEventVar8) == "undefined" ? "" : waCustEventVar8,
        custom_evar09: typeof (waCustEventVar9) == "undefined" ? "" : waCustEventVar9,
        custom_evar10: typeof (waCustEventVar10) == "undefined" ? "" : waCustEventVar10,
        custom_evar13: typeof (waCustEventVar13) == "undefined" ? "" : waCustEventVar13,
        custom_evar19: typeof (waCustEventVar19) == "undefined" ? "" : waCustEventVar19,
        custom_evar24: typeof (waCustEventVar24) == "undefined" ? "" : waCustEventVar24,
        custom_evar59: typeof (waCustEventVar59) == "undefined" ? "" : waCustEventVar59,
        custom_evar60: typeof (waCustEventVar60) == "undefined" ? "" : waCustEventVar60,
        custom_evar61: typeof (waCustEventVar61) == "undefined" ? "" : waCustEventVar61,
        custom_evar62: typeof (waCustEventVar62) == "undefined" ? "" : waCustEventVar62,
        custom_evar63: typeof (waCustEventVar63) == "undefined" ? "" : waCustEventVar63,
        custom_evar64: typeof (waCustEventVar64) == "undefined" ? "" : waCustEventVar64,
        custom_evar65: typeof (waCustEventVar65) == "undefined" ? "" : waCustEventVar65,
        custom_evar68: typeof (waCustEventVar68) == "undefined" ? "" : waCustEventVar68,
        custom_evar70: typeof (waCustEventVar70) == "undefined" ? "" : waCustEventVar70,

        taxonomy_author: typeof(document.getElementsByName("author")[0]) == "undefined" ? "" : document.getElementsByName("author")[0].content,
        taxonomy_business_line: typeof(document.getElementsByName("businessline")[0]) == "undefined" ? "" : document.getElementsByName("businessline")[0].content,
        taxonomy_detailed_subject: typeof(document.getElementsByName("subject-lvl2")[0]) == "undefined" ? "" : document.getElementsByName("subject-lvl2")[0].content,
        taxonomy_experience_level: typeof(document.getElementsByName("experiencelevel")[0]) == "undefined" ? "" : document.getElementsByName("experiencelevel")[0].content,
        taxonomy_format_type: typeof(document.getElementsByName("formattype")[0]) == "undefined" ? "" : document.getElementsByName("formattype")[0].content,
        taxonomy_general_subject: typeof(document.getElementsByName("subject-lvl1")[0]) == "undefined" ? "" : document.getElementsByName("subject-lvl1")[0].content,
        taxonomy_keyword_category: typeof(document.getElementsByName("category")[0]) == "undefined" ? "" : document.getElementsByName("category")[0].content,
        taxonomy_life_event: typeof(document.getElementsByName("lifeevent")[0]) == "undefined" ? "" : document.getElementsByName("lifeevent")[0].content,
        taxonomy_page_segment: typeof(document.getElementsByName("segment")[0]) == "undefined" ? "" : document.getElementsByName("segment")[0].content,

        d8_node_id: typeof(waD8NodeId) == "undefined" ? "" : waD8NodeId,
        d8_compliance_id: typeof(waD8ComplianceId) == "undefined" ? "" : waD8ComplianceId,
        d8_section_id: typeof (waD8SectionPageId) == "undefined" ? "" : waD8SectionPageId
      };

      if (window.ad_hoc_tags) {
          jQuery.each(window.ad_hoc_tags, function (key, value) {
              window.utag_data[key] = value;
          });
      }

      if (window.global_param_tags) {
          jQuery.each(window.global_param_tags, function (key, value) {
              window.utag_data[key] = value;
          });
      }

      // Correct common formatting errors due to CMS-format URLs and Assign the Multi Level Category value for secure site site 
      // And other post-processing of the data
      (function() {
        utag_data.page_path.replace(/secure\/.*?\//, "").replace(/\/index.html|\/$/, "").match(/(.*\/)(.*)/);
        if (utag_data.page_name.indexOf("/") > -1 && utag_data.page_name.length > 1) {
          utag_data.page_name.match(/(.*\/)(.*)/);
          utag_data.page_path = RegExp.$1;
          utag_data.page_name = RegExp.$2;
        } else if (utag_data.page_name.indexOf("/") > -1 && utag_data.page_name == "/") {
          utag_data.page_path = utag_data.page_name;
          utag_data.page_name = RegExp.$2;
        } else {
          utag_data.page_path = RegExp.$1;
          utag_data.page_name = (utag_data.page_name == "" ? RegExp.$2 : utag_data.page_name);
        }

        if (utag_data.page_category != null && utag_data.page_category.length > 0 && utag_data.page_category.substring(0, 1) != "/") {
          utag_data.page_category = "/" + utag_data.page_category;
        }

        if (utag_data.page_use_default_name == true) {
          utag_data.page_name = typeof(utag_data.page_name) == "undefined" ? "" : utag_data.page_category + "/" + utag_data.page_name;
        } else {
          utag_data.page_name = typeof(utag_data.page_name) == "undefined" ? "" : utag_data.page_category + "/" + utag_data.page_path + "/" + utag_data.page_name;
        }

        utag_data.page_name = utag_data.page_name.replace(/\/\/+/gi, "/");

        var mlc = utag_data.page_category + "/" + utag_data.page_path;
        mlc = mlc.replace(/\/\/+/gi, "/");
        utag_data.page_multi_level_category = typeof(utag_data.page_multi_level_category) == "undefined" ? "No_MultiLevelCategory" : (utag_data.page_multi_level_category != "" ? utag_data.page_multi_level_category : mlc);

        utag_data.custom_evar19 = typeof(utag_data.custom_evar19) == "undefined" ? (typeof(tmp) == "undefined" || tmp == null ? "" : tmp[1]) : utag_data.custom_evar19;
      })();


      window.TagParameters = {
        compatibilityflag: 1,
        Optional: {
          SuccessEventId: ""
        },
        Vendor: {
          SiteCatalyst: {
            S: {
              prop17: ""
            }
          }
        }
      };

      if (typeof(TagParameters.Optional.SuccessEventId) != "undefined" && TagParameters.Optional.SuccessEventId) {
        utag_data.success_event_id = TagParameters.Optional.SuccessEventId;
      }
    }
  };
})(Drupal, window);;
// This file was modified to be wrapped inside a Drupal behavior,
// and global varables were explicitly attached to the window.
(function (Drupal, window) {
  Drupal.behaviors.schwab_tealium_ps_tag_footer = {
    attach: function (context, settings) {

      if (typeof(tealium_lib) == "undefined") return;

        /* Preventing multiple utag.js loads */
        if (typeof(utag_loaded) === "boolean" && utag_loaded === true) return;
        
        if (typeof(TagParameters.Optional.SuccessEventId) != "undefined" && TagParameters.Optional.SuccessEventId) {
        utag_data.success_event_id = TagParameters.Optional.SuccessEventId;
      }
      window.utagLibPath = "";
      utagLibPath = "//tags.tiqcdn.com/utag/schwab/" + tealium_lib + "/prod/utag.js";

      (function(a,b,c,d){
        a=utagLibPath;
        b=document;
        c='script';
        d=b.createElement(c);
        d.src=a;
        d.type='text/java'+c;
        d.async=false;
        a=b.getElementsByTagName(c)[0];
        a.parentNode.insertBefore(d,a);
      })();

        /* Preventing multiple utag.js loads */
        utag_loaded = true;
        
      if (typeof(s) != "undefined" && s.prop17) {
        TagParameters.Vendor.SiteCatalyst.S.prop17 = s.prop17;
      }
      if (typeof(sendBid) != "undefined" && sendBid != "") {
        if (window.location.hostname == "content.schwab.com" || window.location.hostname == "activetrader.schwab.com" || window.location.hostname == "intelligent.schwab.com" || window.location.hostname == "intelligent-pre.schwab.com") {
          var bcon1 = document.createElement("img");
          var refUrl = encodeURIComponent(window.location.href);
          var protocol = window.location.protocol == 'https:' ? 'https:' : 'http:';
          bcon1.src = protocol + "//www.schwab.com/public/file?cmsid=P-684894&filename=ClrPix.gif" + "&bid=" + sendBid + "&refurl=" + refUrl;
          bcon1.style.display = 'none';
          document.body.appendChild(bcon1);
          var bcon2 = document.createElement("script");
          bcon2.src = protocol + "//www.schwab.com/public/schwab/page?cmsid=P-7212235" + "&bid=" + sendBid + "&refurl=" + refUrl;
          document.body.appendChild(bcon2);
        }
      }
    }
  };
})(Drupal, window);;
(function ($, Drupal, drupalSettings) {
    Drupal.behaviors.views_feed_icon = {
        attach: function (context, settings) {
            $('.view-id-token_list .feed-icon').removeClass('feed-icon').addClass('button');
        }
    };
})(jQuery, Drupal, drupalSettings);;
'use strict';

(function () {
  /* eslint vars-on-top: "off" */
  var AppendQueryString = function () {
    // Converts the query string into an object for easier cataloging
    var getQueryObjectFromString = function getQueryObjectFromString(queryString) {
      var queryObject = {};
      if (queryString) {
        var keyValue;
        var parameterArray = queryString.split('&');
        parameterArray.forEach(function (parameter) {
          keyValue = parameter.split('=');
          queryObject[keyValue[0]] = keyValue[1];
        });
      }
      return queryObject;
    };

    // Converts the query object into the query string to be added to href
    var getQueryString = function getQueryString(queryObj) {
      var returnString = "";
      var queryKeysArray = Object.keys(queryObj);
      queryKeysArray.forEach(function (key, index) {
        returnString += key + '=' + queryObj[key];
        if (index < queryKeysArray.length - 1) {
          returnString += '&';
        }
      });
      return returnString;
    };

    // combines the given query strings with defaults
    var getCombinedQueryObjects = function getCombinedQueryObjects(queryObj1, queryObj2, override) {
      var returnQueryObj = {};
      Object.keys(queryObj1).forEach(function (key) {
        returnQueryObj[key] = queryObj1[key];
      });
      if (override) {
        Object.keys(queryObj2).forEach(function (key) {
          returnQueryObj[key] = queryObj2[key];
        });
      } else {
        // add only if key doesn't exist
        Object.keys(queryObj2).forEach(function (key) {
          if (!returnQueryObj[key]) {
            returnQueryObj[key] = queryObj2[key];
          }
        });
      }
      return returnQueryObj;
    };

    // adds the query strings to the href of links
    var processLinkParamters = function processLinkParameters(links, queryObj, override) {
      var href;
      var defaultParameterString;
      var defaultParameterObject = {};
      var parameterObject = {};
      [].forEach.call(links, function (link) {
        href = link.href;
        defaultParameterString = link.getAttribute('data-default-query-parameters');
        defaultParameterObject = getQueryObjectFromString(defaultParameterString);
        parameterObject = getCombinedQueryObjects(queryObj, defaultParameterObject, override);
        if (href.indexOf('?') > -1) {
          href += '&';
        } else {
          href += '?';
        }
        href += getQueryString(parameterObject);
        link.href = href;
      });
    };
    var init = function init() {
      var appendLinks = document.getElementsByClassName('appendquerystring');
      var overrideLinks = document.getElementsByClassName('overridequerystring');
      if (appendLinks.length > 0 || overrideLinks.length > 0) {
        var queryString = window.location.search.substr(1);
        var queryObj = getQueryObjectFromString(queryString);
        var override = false;
        processLinkParamters(appendLinks, queryObj, override);
        override = true;
        processLinkParamters(overrideLinks, queryObj, override);
      }
    };
    return {
      init: init
    };
  }();
  AppendQueryString.init();
})();;
"use strict";

/* eslint-disable no-param-reassign */
// ****************  PSR UTILITY LIBRARY ***********************

(function ($) {
  'use strict';

  // Caches jquery selected element (same as assigning a
  // jquery selected element to a var and then using that var)
  $.selectorCache = function (selector) {
    if (!$.selectorCache[selector]) {
      $.selectorCache[selector] = $(selector);
    }
    return $.selectorCache[selector];
  };

  // Debouncer for adding a delay to the execution of a function
  $.debounce = function (func, wait, immediate) {
    var timeout;
    var args;
    var context;
    var timestamp;
    var result;
    var later = function later() {
      var now = new Date().getTime();
      var last = now - timestamp;
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) {
            context = null;
            args = null;
          }
        }
      }
    };
    return function () {
      context = this;
      args = arguments;
      timestamp = new Date().getTime();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = null;
        args = null;
      }
      return result;
    };
  };
})(jQuery);;
(function () {

  var BeaconCallbackCache = function () {
    /**
     * Creates the namespace path for the callbacks on window.
     *
     * @param {array} pathArray
     *   An array of the paths to the callback destination.
     *
     * @returns {object}
     *   Returns the object that contains the location for the callback array.
     */
    var createPath = function createPath(pathArray) {
      var targetPath = window;

      // creates the path
      pathArray.forEach(function(path) {
        if (!(path in targetPath)) {
          targetPath[path] = {};
        }
        targetPath = targetPath[path];
      });

      return targetPath;

    };

    /**
     * Creates a namespaced path for the callbacks on window.
     *
     * @param {string} callbackPath
     *   A string that will name the path of where the callbacks lives.  The
     *   general structure should be '<component name>.<behavior to listen to>'.
     *
     * @returns {object}
     *   Returns the object that contains the location for the callback array.
     */
    var getCallbackLocationFromPath = function getCallbackLocationFromPath(callbackPath) {
      var pathArray = ['schwab_beacon'].concat(callbackPath.split('.'));
      var path = createPath(pathArray);

      // sets the callbacks array if it doesn't exist
      if (!('callbacks' in path)) {
        path['callbacks'] = [];
      }

      return path;
    };

    /**
     * Sets a callback to a particular behavior.
     *
     * @param {string} callbackPath
     *   A string that will name the path of where the callbacks will be saved.
     *   The general structure should be
     *   '<component name>.<behavior to set callback>'.
     *
     * @param {function} callback
     *   A function that will be attached as a callback to the provided behavior.
     *
     * @example
     *
     *   window.setCallbackListeners('beacon_carousel.onSlideUpdate', myUpdateHandler);
     */
    var setCallbackListeners = function setCallbackListeners(callbackPath, callback) {
      // TODO expand this to allow callbacks to fire only once or callbacks that have
      // requirements (must fire first or last, etc.).
      var target = getCallbackLocationFromPath(callbackPath);
      target['callbacks'].push(callback);
    };

    /**
     * Gets all callbacks to a particular behavior.
     *
     * @param {string} callbackPath
     *   A string that will name the path of where the callbacks lives.  The
     *   general structure should be '<component name>.<behavior to listen to>'.
     *
     * @param {object} paramsObject
     *   A string that will name the path of where the callbacks lives.  The
     *   general structure should be '<component name>.<behavior to listen to>'.
     *
     * @example
     *   glide.on(['run.after'], window.executeCallbackListeners.bind(this, 'bcn_glide_carousel.onActivePanelUpdate'));
     *   link.addEventListener('click', window.executeCallbackListeners.bind(this, 'bcn_glide_carousel.onActivePanelUpdate'));
     */
    var executeCallbackListeners = function executeCallbackListeners(callbackPath, paramsObject) {
      var target = getCallbackLocationFromPath(callbackPath);
      var callbackArray = target['callbacks'];

      callbackArray.forEach(function(callback) {
        callback(paramsObject);
      });
    };

    var init = function init() {
      if (!window.schwab_beacon) {
        window.schwab_beacon = {};
      }
      window.schwab_beacon.setCallbackListeners = setCallbackListeners;
      window.schwab_beacon.executeCallbackListeners = executeCallbackListeners;
    };
    return {
      init: init
    };
  }();

  BeaconCallbackCache.init();
})();
;
'use strict';

(function ($, Drupal) {
  Drupal.behaviors.svgAnimated = {
    attach: function attach() {
      var panelComponent = 'bcn-panel__visual-container';
      var visualContainerComponent = 'visual-container';
      var objElement;
      var svgElement;
      var svgReplay;
      var counter = 0;
      var checkIfElementExist;
      var motionQuery = matchMedia('(prefers-reduced-motion)');
      function isInViewport(svgAnimationElement) {
        var rect = svgAnimationElement.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;
        var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
        return isVisible;
      }
      function result(className, imgSource) {
        if (className === panelComponent) {
          var SVG = "<object type=\"image/svg+xml\" data=\"".concat(imgSource, "\" id=\"svg-object-wrapper\"></object>");
          document.querySelector('.bcn-panel__visual-container img').remove();
          document.querySelector('.bcn-panel__visual-container').innerHTML = SVG;
          return;
        } else {
          var _SVG = "<object type=\"image/svg+xml\" data=\"".concat(imgSource, "\" id=\"svg-object-wrapper\"></object>");
          document.querySelector('.visual-container img').remove();
          document.querySelector('.visual-container').innerHTML = _SVG;
          return;
        }
      }
      function triggerSVGAnimation() {
        svgElement.getElementById('Stage').classList.remove('svg-wrapper');
        setTimeout(function () {
          svgElement.getElementById('Stage').classList.add('svg-wrapper');
        }, 500);
      }
      function reducedMotionCheck() {
        if (motionQuery.matches) {
          return false;
        } else {
          return true;
        }
      }
      function checkForSVGOnly(imageSource) {
        if (imageSource.endsWith('.svg')) {
          return true;
        } else {
          return false;
        }
      }
      function animatedSVGChanges() {
        if (document.getElementById('svg-object-wrapper').contentDocument) {
          /* Check if the reduce motion is checked */
          if (!reducedMotionCheck()) {
            svgElement = document.getElementById('svg-object-wrapper').contentDocument;
            svgReplay = svgElement.getElementById("Stage").querySelector('#replay-svg');
            svgReplay.style.display = "none";
          }
        }
        window.addEventListener('scroll', function () {
          objElement = document.getElementById('svg-object-wrapper');
          /* Check if the component is in viewport on scroll and reduce motion is not checked */
          if (isInViewport(objElement) && reducedMotionCheck()) {
            svgElement = document.getElementById('svg-object-wrapper').contentDocument;
            if (counter === 0) {
              triggerSVGAnimation();
              counter += 1;
            }
            svgElement.getElementById("replay-svg").addEventListener("click", triggerSVGAnimation);
          }
        }, false);
      }
      $('.bcn-panel__visual-container').ready(function () {
        if (document.querySelector('.bcn-panel__visual-container img')) {
          var animatedSVGURL = document.querySelector('.bcn-panel__visual-container img').getAttribute('src');
          if (checkForSVGOnly(animatedSVGURL)) {
            document.querySelector('.bcn-panel__visual-container img').removeAttribute('src');
            document.addEventListener('DOMContentLoaded', result(panelComponent, animatedSVGURL));
          }
        }
      });
      $('.visual-container').ready(function () {
        if (document.querySelector('.visual-container img')) {
          var animatedSVGURL = document.querySelector('.visual-container img').getAttribute('src');
          if (checkForSVGOnly(animatedSVGURL)) {
            document.querySelector('.visual-container img').removeAttribute('src');
            document.addEventListener('DOMContentLoaded', result(visualContainerComponent, animatedSVGURL));
          }
        }
      });
      checkIfElementExist = setInterval(function () {
        if (document.getElementById('svg-object-wrapper')) {
          animatedSVGChanges();
          clearInterval(checkIfElementExist);
        }
      }, 600);
    }
  };
})(jQuery, Drupal);;
'use strict';

/* eslint-disable camelcase */
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function getImg(src) {
  /* eslint-disable no-param-reassign, no-underscore-dangle */
  return src.split(",").reduce(function (acc, item) {
    var _item$trim$split = item.trim().split(" "),
      _item$trim$split2 = _slicedToArray(_item$trim$split, 2),
      url = _item$trim$split2[0],
      width = _item$trim$split2[1];
    width = parseInt(width, 10);
    if (width > acc.width) {
      return {
        width: width,
        url: url
      };
    }
    return acc;
  }, {
    width: 0,
    url: ""
  }).url;
}
function setImg() {
  /*eslint no-underscore-dangle: "error"*/
  var _img = document.querySelectorAll(".lazyload");
  var _removed = 0;
  _img.forEach(function (e) {
    if (2 > _removed) {
      if (e.tagName.toUpperCase() === "DIV") {
        e.classList.remove("lazyload");
        e.classList.remove("lazyautosizes");
        e.classList.add("js-preload");
        /* @typescript-eslint/camelcase: ["error", { "properties": "always" }] */
        var _img_src = e.getAttribute('data-bgset');
        e.style.backgroundImage = "url(" + getImg(_img_src) + ")";
      } else if (e.tagName.toUpperCase() === "IMG") {
        e.classList.add("js-preload");
        e.classList.remove("lazyload");
        e.classList.remove("lazyautosizes");
        /* @typescript-eslint/camelcase: ["error", { "properties": "always" }] */
        var _img_src2 = e.getAttribute('data-srcset');
        e.setAttribute("src", getImg(_img_src2));
      }
      _removed += 1;
    }
  });
}
setImg();;
"use strict";!function($,Drupal){Drupal.behaviors.customChatLinkBehavior={attach:function(context,settings){$(".chat-popup",context).on("click",function(e){e.preventDefault(),$("#chatGlobalHeader").click(),e.stopPropagation()})}}}(jQuery,Drupal);;
"use strict";function browserWidth(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0}if("undefined"!=typeof proactiveChatFlag&&!0===proactiveChatFlag){var proactiveHost="undefined"!=typeof proactiveChatHost&&proactiveChatHost?proactiveChatHost:"cempa.schwab.com",proactiveSrc="https://"+proactiveHost+"/netagent/proactive/proactive.aspx";$(document).ready(function(){if(browserWidth()>480){var addScript=document.createElement("script");addScript.setAttribute("type","text/javascript"),addScript.setAttribute("src",proactiveSrc),addScript.setAttribute("defer","defer"),document.body.appendChild(addScript)}})};
"use strict";!function($){$.debug=function(description,valueToOut){window.location.href.indexOf("localhost")>0&&(console.log("-------- "+description),console.log(valueToOut),console.log("\n\n"))},$.selectorCache=function(selector){return $.selectorCache[selector]||($.selectorCache[selector]=$(selector)),$.selectorCache[selector]},$.getCookieByName=function(cookieName){for(var name=cookieName+"=",ca=decodeURIComponent(document.cookie).split(";"),i=0;i<ca.length;i++){for(var c=ca[i];" "===c.charAt(0);)c=c.substring(1);if(0===c.indexOf(name))return c.substring(name.length,c.length)}return!1},$.loggedInPast90Days=function(){var np2Cookie=$.getCookieByName("NP2"),lastLoginDate=!!np2Cookie&&new Date(np2Cookie.split("|")[2]);if(lastLoginDate&&lastLoginDate>new Date((new Date).setDate((new Date).getDate()-90)))return!0;return!1},$.debounce=function(func,wait,immediate){var timeout,args,context,timestamp,result,later=function later(){var last=(new Date).getTime()-timestamp;last<wait&&last>=0?timeout=setTimeout(later,wait-last):(timeout=null,immediate||(result=func.apply(context,args),timeout||(context=args=null)))};return function(){context=this,args=arguments,timestamp=(new Date).getTime();var callNow=immediate&&!timeout;return timeout||(timeout=setTimeout(later,wait)),callNow&&(result=func.apply(context,args),context=args=null),result}}}(jQuery);;
"use strict";!function($,Drupal,window,document){Drupal.behaviors.transcript={attach:function(context,settings){$('.transcript-container a[data-toggle="collapse"]').off("click").on("click",function(event){event.preventDefault();var target=$(this).attr("href");$(this).toggleClass("active"),$(target).toggleClass("in")})}},Drupal.behaviors.taxonomy_feature={attach:function(context,settings){function featuredTaxItemsEqualHeight(){var top_height=0;$(".featured-top--section").each(function(){$(this).height("")}),$(".featured-top--section").each(function(){$(this).height()>top_height&&(top_height=$(this).height())}),$(".featured-top--section").each(function(){$(this).height(top_height)});var summary_height=0;$(".featured-top--summary").each(function(){$(this).height("")}),$(".featured-top--summary").each(function(){$(this).height()>summary_height&&(summary_height=$(this).height())}),$(".featured-top--summary").each(function(){$(this).height(summary_height)})}$(".taxonomy-landing-page--featured .featured-taxonomy-items__item").length&&(new Swiper(".featured-taxonomy-items",{direction:"horizontal",loop:!0,preventClicks:!1,preventClicksPropagation:!1,nextButton:".swiper-button-next",prevButton:".swiper-button-prev",slidesPerView:4}),featuredTaxItemsEqualHeight(),$(window).resize(function(){featuredTaxItemsEqualHeight()}))}},Drupal.behaviors.slideshow={attach:function(context,settings){$(".main-slideshow .swiper-container--field-slideshow-slides").length&&$("body").once("schwab_slideshow").each(function(){var mySwiper,swiperVariation,isMobile=$(window).width()<=979,isSmallDesktop=$(window).width()>979&&$(window).width()<=1270,isLargeDesktop=$(window).width()>1270;function swiperSlideshowInit(mySwiper,swiperVariation,sliderIndex){var swiperOpts,vDepth,vStretch,titleImageHeight,slideshowLength=parseInt($(".main-slideshow .swiper-slide").length);if("small"===swiperVariation?slideshowLength>6?(vDepth=125,vStretch=377):(vDepth=150,vStretch=295):"large"===swiperVariation&&(slideshowLength>6?(vDepth=125,vStretch=470):(vDepth=170,vStretch=350)),swiperOpts="mobile"===swiperVariation?{initialSlide:sliderIndex,loop:!1,pagination:".pagination",paginationType:"fraction",nextButton:".main-slideshow .swiper-button-next",prevButton:".main-slideshow .swiper-button-prev",centeredSlides:!0,slidesPerView:1,watchSlidesVisibility:!0,watchSlidesProgress:!0,effect:"slide",slide:{depth:0,stretch:0,modifier:0}}:{initialSlide:sliderIndex,loop:!0,pagination:".pagination",paginationType:"fraction",nextButton:".main-slideshow .swiper-button-next",prevButton:".main-slideshow .swiper-button-prev",centeredSlides:!0,slidesPerView:1.65,loopAdditionalSlides:3,loopedSlides:slideshowLength-2,watchSlidesVisibility:!0,watchSlidesProgress:!0,effect:"coverflow",coverflow:{rotate:0,stretch:vStretch,depth:vDepth,modifier:1,slideShadows:!1}},isMobile=parseInt($(window).width())<=979,0!==(mySwiper=new Swiper(".main-slideshow .swiper-container--field-slideshow-slides",swiperOpts)).container.length)return mySwiper.on("onInit",function(){"mobile"!==swiperVariation&&(mySwiper.swiper.param.slidesPerView=2,mySwiper.swiper.param.loopAdditionalSlides=3),$(".main-slideshow .pagination").html(parseInt(mySwiper.realIndex)+1+" / "+slideshowLength),titleImageHeight=parseInt($(".main-slideshow .current-slide .slide-image").height())+parseInt($(".main-slideshow .current-slide .slide-title").height()),$(".main-slideshow .swiper-button-prev, .main-slideshow .swiper-button-next").css("top",titleImageHeight/2+"px"),$(".main-slideshow .swiper-button-prev, .main-slideshow .swiper-button-next").css("visibility","visible")}),mySwiper.on("onTransitionStart",function(swiper){$(".main-slideshow .swiper-slide").removeClass("current-slide"),$(".main-slideshow .pagination").html(parseInt(mySwiper.realIndex)+1+" / "+slideshowLength)}),mySwiper.on("onTransitionEnd",function(swiper){$(".main-slideshow .swiper-slide-active").addClass("current-slide"),$(".main-slideshow").css("padding-bottom",parseInt($(".main-slideshow .current-slide .slide-text").height())+30+"px")}),$(".main-slideshow .swiper-slide-active").addClass("current-slide"),$(".main-slideshow").css("padding-bottom",parseInt($(".main-slideshow .current-slide .slide-text").height())+30+"px"),$(".main-slideshow .pagination-navigation .button-prev").off("click").click(function(event){mySwiper.slidePrev()}),$(".main-slideshow .pagination-navigation .button-next").off("click").click(function(event){mySwiper.slideNext()}),$(".main-slideshow .current-slide .slide-text").on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",function(){titleImageHeight=parseInt($(".main-slideshow .current-slide .slide-image").height())+parseInt($(".main-slideshow .current-slide .slide-title").height()),$(".main-slideshow .swiper-button-prev, .main-slideshow .swiper-button-next").css("top",titleImageHeight/2+"px"),$(".main-slideshow .swiper-button-prev, .main-slideshow .swiper-button-next").css("visibility","visible")}),mySwiper}$(window).width()<980&&(swiperVariation="mobile"),$(window).width()>980&&$(window).width()<1270&&(swiperVariation="small"),$(window).width()>=1270&&(swiperVariation="large"),mySwiper=swiperSlideshowInit(mySwiper,swiperVariation,0),$(window).resize(function(){if(void 0!==mySwiper&&0!==mySwiper.container.length){var newMobile=$(window).width()<=980,newSmallDesktop=$(window).width()>980&&$(window).width()<1270,newLargeDesktop=$(window).width()>=1270,sliderIndex=parseInt(mySwiper.realIndex);"mobile"===swiperVariation&&(sliderIndex=parseInt(mySwiper.activeIndex)),newMobile&&!isMobile&&(isMobile=newMobile,newMobile=!1,isSmallDesktop=!1,isLargeDesktop=!1,swiperVariation="mobile",$(".main-slideshow .swiper-slide").removeClass("current-slide"),mySwiper.destroy(!0,!0),mySwiper=swiperSlideshowInit(mySwiper,swiperVariation,sliderIndex)),newSmallDesktop&&!isSmallDesktop&&(isSmallDesktop=newSmallDesktop,newSmallDesktop=!1,isMobile=!1,isLargeDesktop=!1,swiperVariation="small",$(".main-slideshow .swiper-slide").removeClass("current-slide"),mySwiper.destroy(!0,!0),mySwiper=swiperSlideshowInit(mySwiper,swiperVariation,sliderIndex)),newLargeDesktop&&!isLargeDesktop&&(isLargeDesktop=newLargeDesktop,newLargeDesktop=!1,isMobile=!1,isSmallDesktop=!1,swiperVariation="large",$(".main-slideshow .swiper-slide").removeClass("current-slide"),mySwiper.destroy(!0,!0),mySwiper=swiperSlideshowInit(mySwiper,swiperVariation,sliderIndex))}})})}},Drupal.behaviors.mainMenu={attach:function(context,settings){$(".main-menu__link").once("mainMenu").keydown(function(event){var $parentItem=$(this).parent(".main-menu__item"),$nextLink=$parentItem.next().children(".main-menu__link"),$prevLink=$parentItem.prev().children(".main-menu__link");switch(event.which){case 39:event.preventDefault(),$nextLink.focus();break;case 37:event.preventDefault(),$prevLink.focus()}})}},Drupal.behaviors.mobileMenu={attach:function(context,settings){var $menuButton=$(".mobile-menu__icon"),$mobileMenuLinks=$(".mobile-menu__link"),$pageWrapper=$("#pg__c");function toggleMenu(restriction){$pageWrapper.hasClass("mobile-menu__show")?"openOnly"!==restriction&&($pageWrapper.removeClass("mobile-menu__show"),$menuButton.focus()):"closeOnly"!==restriction&&($pageWrapper.addClass("mobile-menu__show"),$mobileMenuLinks.first().focus())}$menuButton.once("mobileMenu").click(function(event){event.preventDefault(),$pageWrapper.toggleClass("mobile-menu__show")}).keydown(function(event){switch(event.which){case 13:case 32:event.preventDefault(),toggleMenu();break;case 39:case 40:event.preventDefault(),toggleMenu("openOnly");break;case 27:case 37:event.preventDefault(),toggleMenu("closeOnly")}}),$mobileMenuLinks.once("mobileMenu").click(function(event){var $parentItem=$(this).parent(".mobile-menu__item--parent");$parentItem.length>0&&(event.preventDefault(),$parentItem.toggleClass("mobile-menu__item--expanded"))}).keydown(function(event){var $parentItem=$(this).parent(".mobile-menu__item"),$grandParentItem=$parentItem.parent().closest(".mobile-menu__item"),$grandParentLink=$grandParentItem.children(".mobile-menu__link"),$nextLink=$parentItem.next().children(".mobile-menu__link"),$prevLink=$parentItem.prev().children(".mobile-menu__link"),$firstChildLink=$parentItem.children(".mobile-menu__list").find(".mobile-menu__link").first();switch(event.which){case 13:case 32:case 39:event.preventDefault(),$parentItem.hasClass("mobile-menu__item--parent")?($parentItem.toggleClass("mobile-menu__item--expanded"),$firstChildLink.focus()):13===event.which&&(window.location=this.href);break;case 40:event.preventDefault(),$nextLink.focus();break;case 38:event.preventDefault(),$prevLink.focus();break;case 27:case 37:event.preventDefault(),$grandParentItem.hasClass("mobile-menu__item--parent")?$grandParentItem.hasClass("mobile-menu__item--expanded")&&($grandParentItem.removeClass("mobile-menu__item--expanded"),$grandParentLink.focus()):toggleMenu("closeOnly");break;case 9:$parentItem.hasClass("mobile-menu__item--top")&&(0===$nextLink.length||event.shiftKey&&0===$prevLink.length)&&toggleMenu("closeOnly")}})}},Drupal.behaviors.contactUs={attach:function(context,settings){var $contactLink=$("#contact__link"),$contactModal=$("#contact__modal");function contactClose(){$contactLink.attr("aria-expanded","false"),$contactModal.attr("aria-hidden","true")}$("html").once("contactUs").click(function(e){$(e.target).closest("#contact").length||contactClose()}),$contactLink.once("contactUs").click(function(e){e.preventDefault(),"true"===$(this).attr("aria-expanded")?contactClose():($contactLink.attr("aria-expanded","true"),$contactModal.attr("aria-hidden","false"))})}},Drupal.behaviors.logInMenu={attach:function(context,settings){var $logInLink=$(".js-log-in");if(0!==$logInLink.length){var $logInMenu=$("#block-login"),$window=$(window);$logInLink.once("logInMenu").click(function(e){e.preventDefault(),isOpen()?logInMenuClose():(placeMenu(),$logInMenu.addClass("block-login--visible"),$window.trigger("resize")),e.stopPropagation()}),$("html").once("logInMenu").click(function(e){var $target=$(e.target);isOpen()&&!$target.closest("#block-login").length&&logInMenuClose()}),$window.once("logInMenu").resize(function(e){placeMenu()})}function logInMenuClose(){$logInMenu.removeClass("block-login--visible")}function isOpen(){return $logInMenu.hasClass("block-login--visible")}function placeMenu(){var linkOffset=$logInLink.offset(),linkHeight=$logInLink.height(),menuCss={top:linkOffset.top+linkHeight+10+"px",left:linkOffset.left+"px",right:""},windowWidth=document.body.clientWidth;linkOffset.left+$logInMenu.width()>windowWidth?(menuCss.left="",menuCss.right=windowWidth-(linkOffset.left+$logInLink.width())+"px",$logInMenu.addClass("block-login--right-aligned")):$logInMenu.removeClass("block-login--right-aligned"),$logInMenu.css(menuCss)}}},Drupal.behaviors.seeAll={nextPage:1,appendSlides:function(slides){this.mySwiper.appendSlide(slides)},requestAndAppend:function(){var self=this,path=window.location.pathname+"?page="+self.nextPage;$.get({url:path,success:function(obj){0===(obj=$(obj).find("li.swiper-slide")).length?self.nextPage=-1:(self.appendSlides(obj),self.nextPage+=1)},error:function(obj){self.nextPage=-1},dataType:"html"})},attach:function(context,settings){var self=this;$("body").once("schwab_carousel").each(function(){$(".swiper-container--carousel").length>0&&(self.mySwiper=new Swiper(".swiper-container--carousel",{loop:!1,slidesPerView:4,loopedSlides:0,slidesPerGroup:4,grabCursor:!0,spaceBetween:10,setWrapperSize:!0,nopeek:!0,preventClicks:!1,preventClicksPropagation:!1,breakpoints:{600:{slidesPerView:2,slidesPerGroup:2}},nextButton:".swiper-nav--carousel .swiper-button-next",prevButton:".swiper-nav--carousel .swiper-button-prev",onInit:self.requestAndAppend()}),self.mySwiper.on("slideChangeStart",function(swiper){self.nextPage>0&&self.requestAndAppend()}))})}},Drupal.behaviors.scrollShareIcons={attach:function(context,settings){$(".share-content-print").length>0&&$(".share-content-print").is(":visible")&&setTimeout(function(){$("#main").stickem()},250)}}}(jQuery,Drupal,void 0,document);;
