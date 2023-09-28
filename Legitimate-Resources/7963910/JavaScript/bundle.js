/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SharedAnalytics", [], factory);
	else if(typeof exports === 'object')
		exports["SharedAnalytics"] = factory();
	else
		root["SharedAnalytics"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/events/pageLoaded/controller_ceddlData.ts":
/*!*******************************************************!*\
  !*** ./src/events/pageLoaded/controller_ceddlData.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PageLoadedController_ceddlData: () => (/* binding */ PageLoadedController_ceddlData)\n/* harmony export */ });\n/* harmony import */ var _services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ceddl-store */ \"./src/services/ceddl-store.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/events/pageLoaded/model.ts\");\n\n\nvar PageLoadedController_ceddlData = /** @class */ (function () {\n    function PageLoadedController_ceddlData() {\n    }\n    PageLoadedController_ceddlData.prototype.run = function (data) {\n        var filteredData = this.filter(data);\n        return this.publish(filteredData);\n    };\n    PageLoadedController_ceddlData.prototype.filter = function (data) {\n        var fitleredData = new _model__WEBPACK_IMPORTED_MODULE_1__.PageLoadedEvent_ceddl();\n        return fitleredData;\n    };\n    PageLoadedController_ceddlData.prototype.publish = function (event) {\n        (0,_services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__.addData)(event);\n    };\n    return PageLoadedController_ceddlData;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/pageLoaded/controller_ceddlData.ts?");

/***/ }),

/***/ "./src/events/pageLoaded/controller_ceddlEvent.ts":
/*!********************************************************!*\
  !*** ./src/events/pageLoaded/controller_ceddlEvent.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PageLoadedController_ceddlEvent: () => (/* binding */ PageLoadedController_ceddlEvent)\n/* harmony export */ });\n/* harmony import */ var _services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ceddl-store */ \"./src/services/ceddl-store.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/events/pageLoaded/model.ts\");\n\n\nvar PageLoadedController_ceddlEvent = /** @class */ (function () {\n    function PageLoadedController_ceddlEvent() {\n    }\n    PageLoadedController_ceddlEvent.prototype.run = function (data) {\n        var filteredData = this.filter(data);\n        return this.publish(filteredData);\n    };\n    PageLoadedController_ceddlEvent.prototype.filter = function (data) {\n        var fData = new _model__WEBPACK_IMPORTED_MODULE_1__.PageLoadedEvent_ceddl();\n        fData.events = '';\n        return fData;\n    };\n    PageLoadedController_ceddlEvent.prototype.publish = function (event) {\n        (0,_services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__.addEvent)(event);\n    };\n    return PageLoadedController_ceddlEvent;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/pageLoaded/controller_ceddlEvent.ts?");

/***/ }),

/***/ "./src/events/pageLoaded/controller_eddl.ts":
/*!**************************************************!*\
  !*** ./src/events/pageLoaded/controller_eddl.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PageLoadedController_eddl: () => (/* binding */ PageLoadedController_eddl)\n/* harmony export */ });\n/* harmony import */ var _services_eddl_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/eddl-store */ \"./src/services/eddl-store.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/events/pageLoaded/model.ts\");\n\n\nvar PageLoadedController_eddl = /** @class */ (function () {\n    function PageLoadedController_eddl() {\n    }\n    PageLoadedController_eddl.prototype.run = function (data) {\n        var filteredData = this.filter(data);\n        return this.publish(filteredData);\n    };\n    PageLoadedController_eddl.prototype.filter = function (data) {\n        var fData = new _model__WEBPACK_IMPORTED_MODULE_1__.PageLoadedEvent_eddl();\n        return fData;\n    };\n    PageLoadedController_eddl.prototype.publish = function (event) {\n        (0,_services_eddl_store__WEBPACK_IMPORTED_MODULE_0__.addData)(event);\n    };\n    return PageLoadedController_eddl;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/pageLoaded/controller_eddl.ts?");

/***/ }),

/***/ "./src/events/pageLoaded/factory.ts":
/*!******************************************!*\
  !*** ./src/events/pageLoaded/factory.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createProductDetailPageLoaddedControllers: () => (/* binding */ createProductDetailPageLoaddedControllers)\n/* harmony export */ });\n/* harmony import */ var _controller_ceddlEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller_ceddlEvent */ \"./src/events/pageLoaded/controller_ceddlEvent.ts\");\n/* harmony import */ var _controller_eddl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller_eddl */ \"./src/events/pageLoaded/controller_eddl.ts\");\n/* harmony import */ var _controller_ceddlData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller_ceddlData */ \"./src/events/pageLoaded/controller_ceddlData.ts\");\n\n\n\nvar CONTROLLERS = {\n    ceddlData: _controller_ceddlData__WEBPACK_IMPORTED_MODULE_2__.PageLoadedController_ceddlData,\n    ceddlEvent: _controller_ceddlEvent__WEBPACK_IMPORTED_MODULE_0__.PageLoadedController_ceddlEvent,\n    eddl: _controller_eddl__WEBPACK_IMPORTED_MODULE_1__.PageLoadedController_eddl,\n};\nvar createProductDetailPageLoaddedControllers = function (modes) {\n    var controllers = [];\n    modes.map(function (mode) {\n        controllers.push(new CONTROLLERS[mode]());\n    });\n    return controllers;\n};\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/pageLoaded/factory.ts?");

/***/ }),

/***/ "./src/events/pageLoaded/model.ts":
/*!****************************************!*\
  !*** ./src/events/pageLoaded/model.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PageLoadedData_ceddl: () => (/* binding */ PageLoadedData_ceddl),\n/* harmony export */   PageLoadedEvent_ceddl: () => (/* binding */ PageLoadedEvent_ceddl),\n/* harmony export */   PageLoadedEvent_eddl: () => (/* binding */ PageLoadedEvent_eddl),\n/* harmony export */   PageLoadedInput: () => (/* binding */ PageLoadedInput)\n/* harmony export */ });\nvar PageLoadedInput = /** @class */ (function () {\n    function PageLoadedInput() {\n    }\n    return PageLoadedInput;\n}());\n\nvar PageLoadedData_ceddl = /** @class */ (function () {\n    function PageLoadedData_ceddl() {\n    }\n    return PageLoadedData_ceddl;\n}());\n\nvar PageLoadedEvent_ceddl = /** @class */ (function () {\n    function PageLoadedEvent_ceddl() {\n    }\n    return PageLoadedEvent_ceddl;\n}());\n\nvar PageLoadedEvent_eddl = /** @class */ (function () {\n    function PageLoadedEvent_eddl() {\n    }\n    return PageLoadedEvent_eddl;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/pageLoaded/model.ts?");

/***/ }),

/***/ "./src/events/trackPageNotAvailable/controller_ceddlData.ts":
/*!******************************************************************!*\
  !*** ./src/events/trackPageNotAvailable/controller_ceddlData.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TrackPageNotAvailableController_ceddlData: () => (/* binding */ TrackPageNotAvailableController_ceddlData)\n/* harmony export */ });\n/* harmony import */ var _services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ceddl-store */ \"./src/services/ceddl-store.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/events/trackPageNotAvailable/model.ts\");\n\n\nvar TrackPageNotAvailableController_ceddlData = /** @class */ (function () {\n    function TrackPageNotAvailableController_ceddlData() {\n    }\n    TrackPageNotAvailableController_ceddlData.prototype.run = function (data) {\n        var filteredData = this.filter(data);\n        return this.publish(filteredData);\n    };\n    TrackPageNotAvailableController_ceddlData.prototype.filter = function (data) {\n        var fData = new _model__WEBPACK_IMPORTED_MODULE_1__.TrackPageNotAvailableData_ceddl();\n        fData.pageName = '404 page not found';\n        fData.productPageNumber = data.productPageNumber;\n        return fData;\n    };\n    TrackPageNotAvailableController_ceddlData.prototype.publish = function (event) {\n        (0,_services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__.addData)(event);\n    };\n    return TrackPageNotAvailableController_ceddlData;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/trackPageNotAvailable/controller_ceddlData.ts?");

/***/ }),

/***/ "./src/events/trackPageNotAvailable/controller_ceddlEvent.ts":
/*!*******************************************************************!*\
  !*** ./src/events/trackPageNotAvailable/controller_ceddlEvent.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TrackPageNotAvailableController_ceddlEvent: () => (/* binding */ TrackPageNotAvailableController_ceddlEvent)\n/* harmony export */ });\n/* harmony import */ var _services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/ceddl-store */ \"./src/services/ceddl-store.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/events/trackPageNotAvailable/model.ts\");\n\n\nvar TrackPageNotAvailableController_ceddlEvent = /** @class */ (function () {\n    function TrackPageNotAvailableController_ceddlEvent() {\n    }\n    TrackPageNotAvailableController_ceddlEvent.prototype.run = function (data) {\n        var filteredData = this.filter(data);\n        return this.publish(filteredData);\n    };\n    TrackPageNotAvailableController_ceddlEvent.prototype.filter = function (data) {\n        var fData = new _model__WEBPACK_IMPORTED_MODULE_1__.TrackPageNotAvailableEvent_ceddl();\n        fData.pageName = '404 page not found';\n        fData.products = \"productmerch\".concat(data.productPageNumber);\n        fData.events = 'event38';\n        fData.prop4 = 'page not found';\n        fData.prop9 = 'page not found|page not found';\n        fData.eVar9 = data.previousPageName;\n        return fData;\n    };\n    TrackPageNotAvailableController_ceddlEvent.prototype.publish = function (event) {\n        (0,_services_ceddl_store__WEBPACK_IMPORTED_MODULE_0__.addEvent)(event);\n    };\n    return TrackPageNotAvailableController_ceddlEvent;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/trackPageNotAvailable/controller_ceddlEvent.ts?");

/***/ }),

/***/ "./src/events/trackPageNotAvailable/controller_eddl.ts":
/*!*************************************************************!*\
  !*** ./src/events/trackPageNotAvailable/controller_eddl.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TrackPageNotAvailableController_eddl: () => (/* binding */ TrackPageNotAvailableController_eddl)\n/* harmony export */ });\n/* harmony import */ var _services_eddl_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/eddl-store */ \"./src/services/eddl-store.ts\");\n/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ \"./src/events/trackPageNotAvailable/model.ts\");\n\n\nvar TrackPageNotAvailableController_eddl = /** @class */ (function () {\n    function TrackPageNotAvailableController_eddl() {\n    }\n    TrackPageNotAvailableController_eddl.prototype.run = function (data) {\n        var filteredData = this.filter(data);\n        return this.publish(filteredData);\n    };\n    TrackPageNotAvailableController_eddl.prototype.filter = function (data) {\n        var fData = new _model__WEBPACK_IMPORTED_MODULE_1__.TrackPageNotAvailableEvent_eddl();\n        return fData;\n    };\n    TrackPageNotAvailableController_eddl.prototype.publish = function (event) {\n        (0,_services_eddl_store__WEBPACK_IMPORTED_MODULE_0__.addData)(event);\n    };\n    return TrackPageNotAvailableController_eddl;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/trackPageNotAvailable/controller_eddl.ts?");

/***/ }),

/***/ "./src/events/trackPageNotAvailable/factory.ts":
/*!*****************************************************!*\
  !*** ./src/events/trackPageNotAvailable/factory.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createTrackPageNotAvailableControllers: () => (/* binding */ createTrackPageNotAvailableControllers)\n/* harmony export */ });\n/* harmony import */ var _controller_eddl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller_eddl */ \"./src/events/trackPageNotAvailable/controller_eddl.ts\");\n/* harmony import */ var _controller_ceddlData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller_ceddlData */ \"./src/events/trackPageNotAvailable/controller_ceddlData.ts\");\n/* harmony import */ var _controller_ceddlEvent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller_ceddlEvent */ \"./src/events/trackPageNotAvailable/controller_ceddlEvent.ts\");\n\n\n\nvar CONTROLLERS = {\n    ceddlData: _controller_ceddlData__WEBPACK_IMPORTED_MODULE_1__.TrackPageNotAvailableController_ceddlData,\n    ceddlEvent: _controller_ceddlEvent__WEBPACK_IMPORTED_MODULE_2__.TrackPageNotAvailableController_ceddlEvent,\n    eddl: _controller_eddl__WEBPACK_IMPORTED_MODULE_0__.TrackPageNotAvailableController_eddl,\n};\nvar createTrackPageNotAvailableControllers = function (modes) {\n    var controllers = [];\n    modes.map(function (mode) {\n        controllers.push(new CONTROLLERS[mode]());\n    });\n    return controllers;\n};\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/trackPageNotAvailable/factory.ts?");

/***/ }),

/***/ "./src/events/trackPageNotAvailable/model.ts":
/*!***************************************************!*\
  !*** ./src/events/trackPageNotAvailable/model.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TrackPageNotAvailableData_ceddl: () => (/* binding */ TrackPageNotAvailableData_ceddl),\n/* harmony export */   TrackPageNotAvailableEvent_ceddl: () => (/* binding */ TrackPageNotAvailableEvent_ceddl),\n/* harmony export */   TrackPageNotAvailableEvent_eddl: () => (/* binding */ TrackPageNotAvailableEvent_eddl),\n/* harmony export */   TrackPageNotAvailableInput: () => (/* binding */ TrackPageNotAvailableInput)\n/* harmony export */ });\nvar TrackPageNotAvailableInput = /** @class */ (function () {\n    function TrackPageNotAvailableInput() {\n    }\n    return TrackPageNotAvailableInput;\n}());\n\nvar TrackPageNotAvailableData_ceddl = /** @class */ (function () {\n    function TrackPageNotAvailableData_ceddl() {\n    }\n    return TrackPageNotAvailableData_ceddl;\n}());\n\nvar TrackPageNotAvailableEvent_ceddl = /** @class */ (function () {\n    function TrackPageNotAvailableEvent_ceddl() {\n    }\n    return TrackPageNotAvailableEvent_ceddl;\n}());\n\nvar TrackPageNotAvailableEvent_eddl = /** @class */ (function () {\n    function TrackPageNotAvailableEvent_eddl() {\n    }\n    return TrackPageNotAvailableEvent_eddl;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/events/trackPageNotAvailable/model.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SharedAnalytics: () => (/* binding */ SharedAnalytics)\n/* harmony export */ });\n/* harmony import */ var _events_pageLoaded_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events/pageLoaded/factory */ \"./src/events/pageLoaded/factory.ts\");\n/* harmony import */ var _events_trackPageNotAvailable_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events/trackPageNotAvailable/factory */ \"./src/events/trackPageNotAvailable/factory.ts\");\n/* harmony import */ var _services_ceddl_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/ceddl-store */ \"./src/services/ceddl-store.ts\");\n/* harmony import */ var _services_eddl_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/eddl-store */ \"./src/services/eddl-store.ts\");\n\n\n\n\nvar SharedAnalytics = /** @class */ (function () {\n    function SharedAnalytics(modes) {\n        if (Array.isArray(modes)) {\n            this._modes = modes;\n        }\n        else {\n            this._modes = [modes];\n        }\n        (0,_services_ceddl_store__WEBPACK_IMPORTED_MODULE_2__.init_ceddl)(this._modes);\n        (0,_services_eddl_store__WEBPACK_IMPORTED_MODULE_3__.init_eddl)(this._modes);\n    }\n    SharedAnalytics.prototype.trackPageNotAvailable = function (data) {\n        var controllers = (0,_events_trackPageNotAvailable_factory__WEBPACK_IMPORTED_MODULE_1__.createTrackPageNotAvailableControllers)(this._modes);\n        controllers.forEach(function (controller) {\n            controller.run(data);\n        });\n    };\n    SharedAnalytics.prototype.pageLoaded = function (data) {\n        var controllers = (0,_events_pageLoaded_factory__WEBPACK_IMPORTED_MODULE_0__.createProductDetailPageLoaddedControllers)(this._modes);\n        controllers.forEach(function (controller) {\n            controller.run(data);\n        });\n    };\n    return SharedAnalytics;\n}());\n\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/index.ts?");

/***/ }),

/***/ "./src/models/mode.ts":
/*!****************************!*\
  !*** ./src/models/mode.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MODE: () => (/* binding */ MODE)\n/* harmony export */ });\nvar MODE;\n(function (MODE) {\n    MODE[\"CEDDL_DATA\"] = \"ceddlData\";\n    MODE[\"CEDDL_EVENT\"] = \"ceddlEvent\";\n    MODE[\"EDDL\"] = \"eddl\";\n})(MODE || (MODE = {}));\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/models/mode.ts?");

/***/ }),

/***/ "./src/services/ceddl-store.ts":
/*!*************************************!*\
  !*** ./src/services/ceddl-store.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addData: () => (/* binding */ addData),\n/* harmony export */   addEvent: () => (/* binding */ addEvent),\n/* harmony export */   init_ceddl: () => (/* binding */ init_ceddl)\n/* harmony export */ });\n/* harmony import */ var _models_mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/mode */ \"./src/models/mode.ts\");\n\nvar init_ceddl = function (modes) {\n    if (modes.includes(_models_mode__WEBPACK_IMPORTED_MODULE_0__.MODE.CEDDL_DATA)) {\n        window.pageData = window.pageData || {};\n    }\n};\nvar addData = function (data) {\n    Object.assign(window.pageData, data);\n};\nvar addEvent = function (event) {\n    if (typeof window.Visitor != 'undefined') {\n        window.s.visitor = window.Visitor.getInstance('F0EF5E09512D2CD20A490D4D@AdobeOrg');\n    }\n    /************************** CONFIG SECTION **************************/\n    // TODO: is this all common all the time?\n    window.s.trackDownloadLinks = true;\n    window.s.trackExternalLinks = true;\n    window.s.trackInlineStats = true;\n    window.s.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';\n    window.s.linkInternalFilters = 'javascript:,conf,kohls,kohlsecommerce';\n    window.s.linkLeaveQueryString = false;\n    window.s.linkTrackVars = 'None';\n    window.s.linkTrackEvents = 'None';\n    window.s.usePlugins = true;\n    window.s.debugTracking = true;\n    window.s.visitorNamespace = 'kohls';\n    window.s.trackingServer = 'ww9.kohls.com';\n    window.s.trackingServerSecure = 'ww8.kohls.com';\n    // add our event data\n    Object.assign(window.s, event);\n    // transmit to adobe analytics\n    window.s.t();\n    window.s.clearVars();\n};\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/services/ceddl-store.ts?");

/***/ }),

/***/ "./src/services/eddl-store.ts":
/*!************************************!*\
  !*** ./src/services/eddl-store.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addData: () => (/* binding */ addData),\n/* harmony export */   init_eddl: () => (/* binding */ init_eddl)\n/* harmony export */ });\n/* harmony import */ var _models_mode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/mode */ \"./src/models/mode.ts\");\n\nvar init_eddl = function (modes) {\n    if (modes.includes(_models_mode__WEBPACK_IMPORTED_MODULE_0__.MODE.EDDL)) {\n        window.appEventData = window.appEventData || [];\n    }\n};\nvar addData = function (data) {\n    window.appEventData.push(data);\n};\n\n\n//# sourceURL=webpack://SharedAnalytics/./src/services/eddl-store.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});