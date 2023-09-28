(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("config-bb-module-loader", [], factory);
	else if(typeof exports === 'object')
		exports["config-bb-module-loader"] = factory();
	else
		root["config-bb-module-loader"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _page = __webpack_require__(3);
	
	var _page2 = _interopRequireDefault(_page);
	
	var _system = __webpack_require__(5);
	
	var _system2 = _interopRequireDefault(_system);
	
	var _bundle = __webpack_require__(7);
	
	var _bundle2 = _interopRequireDefault(_bundle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var systemConfig = (0, _system2.default)((0, _page2.default)(), _bundle2.default); /**
	                                                                                    * @module config-bb-module-loader
	                                                                                    *
	                                                                                    * @description
	                                                                                    * Configuration module for the SystemJS module loader
	                                                                                    *
	                                                                                    * This configuration module is intended to be replaced and overwritten per project. It is used
	                                                                                    * to customize the SystemJS Module loader, which can be used to both lazy-load modules demand and
	                                                                                    * to locate modules within optimized bundles.
	                                                                                    *
	                                                                                    * The full power of SystemJS is available and the documentation on its configuration can be found
	                                                                                    * on the project's page, specifically
	                                                                                    * https://github.com/systemjs/systemjs/blob/0.19.38/docs/config-api.md
	                                                                                    *
	                                                                                    * The default implementation in this module lazy-loads all modules based on the naming convention
	                                                                                    * that is compatible with other tooling (`bb-package`) and the default CXP file structure.
	                                                                                    *
	                                                                                    * E.g.
	                                                                                    * Loading `lib-bb-i18n-ng`
	                                                                                    * -> `<RESOURCE_ROOT>/static/features/[BBHOST]/lib-bb-i18n-ng/scripts/lib-bb-i18n-ng.js`
	                                                                                    *
	                                                                                    * Loading `widget-bb-sample-ng`
	                                                                                    * -> `<RESOURCE_ROOT>/static/widgets/[BBHOST]/widget-bb-example-ng/scripts/widget-bb-sample-ng.js`
	                                                                                    *
	                                                                                    * Loading `config-bb-locale/assets/custom-locale.json`
	                                                                                    * -> `<RESOURCE_ROOT>/static/features/[BBHOST]/config-bb-locale/assets/custom-locale.json`
	                                                                                    *
	                                                                                    * Where `RESOURCE_ROOT` is configured on the portal server
	                                                                                    *
	                                                                                    * The default implementation is generated by the [@bb-cli/bb-bundle](http://npmjs.com/package/@bb-cli/bb-bundle)
	                                                                                    * tool. It's recommended that you also use this tool to generate your own config as it will
	                                                                                    * allow you to create concatted and minified JS bundles.
	                                                                                    */
	
	System.config(systemConfig);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(4);
	
	var configUndefined = function configUndefined() {
	  return undefined;
	}; /* global System window */
	
	var detectVersion = function detectVersion() {
	  return window.portalClient ? '6' : '5';
	};
	
	var globalConfig = window.BB && window.BB.config ? function (param) {
	  return window.BB.config[param];
	} : configUndefined;
	
	var b$Config = function b$Config(b$Portal) {
	  return function (param) {
	    if (param === 'contextRoot') {
	      return b$Portal.config.resourceRoot;
	    }
	    return b$Portal[param];
	  };
	};
	
	var cx5Config = window.b$ && window.b$.portal ? b$Config(window.b$.portal) : configUndefined;
	
	var cx6Config = window.portalClient && window.portalClient.getFeature ? function (param) {
	  return window.portalClient.getFeature('cxp').config.get(param);
	} : configUndefined;
	
	var config = function config(param, version) {
	  var globalVar = globalConfig(param);
	  if (globalVar !== undefined) {
	    return globalVar;
	  }
	  return (0, _util.isCx5)(version) ? cx5Config(param) : cx6Config(param);
	};
	
	var fallbackStaticResourcesRoot = function fallbackStaticResourcesRoot(version) {
	  var contextRoot = (0, _util.trimSlash)(config('contextRoot', version));
	  if ((0, _util.isCx5)(version)) {
	    return contextRoot + '/static';
	  }
	  return contextRoot + '/static/items';
	};
	
	var pageConfig = function pageConfig() {
	  var version = globalConfig('version') || detectVersion();
	  return {
	    version: version,
	    portalName: config('portalName', version),
	    pageName: config('pageName', version),
	    staticResourcesRoot: (0, _util.trimSlash)(config('staticResourcesRoot', version)) || fallbackStaticResourcesRoot(version)
	  };
	};
	
	exports.default = pageConfig;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global System window */
	
	var trimSlash = function trimSlash(str) {
	  return str && str.replace(/(.*)^\/$/, '$1');
	};
	
	var isWidget = function isWidget(name) {
	  return name.indexOf('widget-') === 0;
	};
	var isContainer = function isContainer(name) {
	  return name.indexOf('container-') === 0;
	};
	
	var itemType = function itemType(name) {
	  if (isWidget(name)) {
	    return 'widgets';
	  }
	  return isContainer(name) ? 'containers' : 'features';
	};
	
	var PROTOCOL_REGEX = /^[A-z][A-z0-9+.-]+:\/\//;
	var isAbsolutePath = function isAbsolutePath(name) {
	  return name.indexOf('/') === 0 || PROTOCOL_REGEX.test(name);
	};
	
	var isCx5 = function isCx5(version) {
	  return version === '5';
	};
	
	exports.isAbsolutePath = isAbsolutePath;
	exports.isCx5 = isCx5;
	exports.itemType = itemType;
	exports.trimSlash = trimSlash;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(4);
	
	var _dev = __webpack_require__(6);
	
	var getModuleFile = function getModuleFile(name) {
	  return name.indexOf('/') !== -1 ? name : name + '/scripts/' + name + '.js';
	};
	
	var getModuleRoot = function getModuleRoot(name, version, staticResourcesRoot) {
	  return (0, _util.isCx5)(version) ? staticResourcesRoot + '/' + (0, _util.itemType)(name) + '/%5BBBHOST%5D' : staticResourcesRoot;
	};
	
	var isRegisteredBySystem = function isRegisteredBySystem(name) {
	  var systemPath = '' + System.baseURL + name;
	  return System.defined && System.defined[systemPath] || System.has(systemPath);
	};
	
	var nameToPath = function nameToPath(name, version, staticResourcesRoot) {
	  if ((0, _util.isAbsolutePath)(name)) {
	    return name.replace('[BBHOST]', '%5BBBHOST%5D');
	  }
	
	  if ((0, _dev.mocksEnabled)() && name.indexOf('data-') === 0) {
	    name = 'mock.' + name; // eslint-disable-line no-param-reassign
	    console.log('load mock', name); // eslint-disable-line no-console
	  }
	
	  var moduleRoot = getModuleRoot(name, version, staticResourcesRoot);
	  var moduleFile = getModuleFile(name);
	
	  return moduleRoot + '/' + moduleFile;
	};
	
	var systemJsConfig = function systemJsConfig(config, bundleDefinition) {
	
	  if (!(0, _dev.bundlesEnabled)()) {
	    bundleDefinition = []; // eslint-disable-line no-param-reassign
	  }
	
	  // Get bundles that are relevant for the current page.
	  var itemPath = function itemPath(name) {
	    return nameToPath(name, config.version, config.staticResourcesRoot);
	  };
	  var bundles = {};
	  var map = {};
	  var meta = {};
	  for (var i = 0; i < bundleDefinition.length; i++) {
	    var bundle = bundleDefinition[i];
	    if (bundle.portal) {
	      if (config.portalName !== bundle.portal) continue;
	      if (bundle.page && config.pageName !== bundle.page) continue;
	    }
	    var bundleName = 'bundle' + i;
	    var bundlePath = itemPath(bundle.path);
	    bundles[bundlePath] = bundle.dependencies;
	    map[bundleName] = bundlePath;
	    bundle.dependencies.forEach(function (dep) {
	      return map[dep] = itemPath(dep);
	    });
	    meta[bundleName] = { format: 'amd' };
	  }
	
	  var systemNormalize = System.normalize;
	  var systemTranslate = System.translate;
	  return {
	    meta: meta,
	    bundles: bundles,
	    map: map,
	    normalize: function normalize(name, parentName, isPlugin) {
	      if (isRegisteredBySystem(name)) {
	        return systemNormalize.call(this, name, parentName, isPlugin);
	      }
	      return systemNormalize.call(this, itemPath(name), parentName, isPlugin);
	    },
	    translate: function translate(load) {
	      if (load.name.indexOf('.json') === load.name.length - 5) {
	        return 'define([], ' + load.source + ');';
	      }
	
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }
	
	      return systemTranslate.call.apply(systemTranslate, [this, load].concat(args));
	    }
	  };
	};
	
	exports.default = systemJsConfig;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/* global System window */
	
	var readEnvUrlFlag = function readEnvUrlFlag(key) {
	  var enableKey = 'enable-' + key;
	  var disableKey = 'disable-' + key;
	  var hasFlag = function hasFlag(flag) {
	    return !!window.location.search.match(new RegExp('[?&]' + flag + '(&|$)'));
	  };
	  if (hasFlag(enableKey)) {
	    return true;
	  } else if (hasFlag(disableKey)) {
	    return false;
	  }
	  return undefined;
	};
	
	var getStorage = function getStorage(key) {
	  try {
	    return window.localStorage.getItem(key);
	  } catch (e) {
	    return null;
	  }
	};
	
	var setStorage = function setStorage(key, value) {
	  try {
	    window.localStorage.setItem(key, value);
	  } catch (e) {
	    return;
	  }
	};
	
	var getEnvFlag = function getEnvFlag(key) {
	  var defaultVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
	  var envVal = readEnvUrlFlag(key);
	  if (envVal !== undefined) {
	    setStorage(key, envVal ? '1' : '0');
	  } else {
	    var storedVal = getStorage(key);
	    envVal = storedVal === null ? defaultVal : storedVal === '1';
	  }
	  return envVal;
	};
	
	var mocksEnabled = exports.mocksEnabled = function mocksEnabled() {
	  return getEnvFlag('mocks');
	};
	var bundlesEnabled = exports.bundlesEnabled = function bundlesEnabled() {
	  return getEnvFlag('bundles', true);
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// eslint-disable-next-line
	exports.default = [];

/***/ })
/******/ ])
});
;
//# sourceMappingURL=config-bb-module-loader.js.map