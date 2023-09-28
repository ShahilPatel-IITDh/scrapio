/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + "-" + {"1":"7e3b4c594738142db1b7"}[chunkId] + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "//limg.imgsmail.ru/splash/v/j/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	aRadar('additionalJSLoad', 1);
	aRadar('additionalJSInit');

	if (mr.scriptLoaded) {
		if ('chrome' in window && 'app' in window.chrome && 'webstore' in window.chrome && 'install' in window.chrome.webstore && !chrome.app.isInstalled && Splash.data.extension && Splash.tpl.extension) {
			var data = Splash.data.extension,
			    html = Splash.tpl.extension(data);
			document.body.insertAdjacentHTML('beforeend', html);

			var installUrl = 'https://chrome.google.com/webstore/detail/' + data.extensionId,
			    link = document.createElement('link');

			link.rel = 'chrome-webstore-item';
			link.href = installUrl;
			document.getElementsByTagName('head')[0].appendChild(link);

			__webpack_require__.e/* nsure */(1, function (require) {
				window.__portal = __webpack_require__(3);
				__webpack_require__(6);
				__webpack_require__(7);
				__webpack_require__(8);

				var extPopup = new __portal.PortalPopup({
					node: mr.id('popup:extension')
				});

				extPopup.on('actionSave', function () {
					mr.counter('clb' + data.confirm);
					new Image().src = data.counterUrl + '&' + mr._random();
					extPopup.__node.style.display = 'none';

					var onSuccess = function onSuccess() {
						mr.counter('clb' + data.success);
						extPopup.hide();
					},
					    onFailure = function onFailure() {
						mr.counter('clb' + data.failure);
						extPopup.hide();
					};
					chrome.webstore.install(installUrl, onSuccess, onFailure);
				});

				extPopup.on('actionCancel', function () {
					extPopup.hide();
				});

				extPopup.on('hide', function () {
					mr.counter('clb' + data.hide);
				});
				extPopup.show();
				mr.counter('d' + data.show);
			});
		}

		if (!newsTabs.tabsSwitched && !mr.isElectionsRunning && !window.__ie7 && !(!!~navigator.userAgent.indexOf('Opera') && (!~navigator.userAgent.indexOf('Opera/9.8') || !!~navigator.userAgent.indexOf('Version/10')))) {
			var RegionConfirm = __webpack_require__(2);

			var regionConfirm = new RegionConfirm({
				show: mr.switchers.showRegionConfirm,
				cityName: mr.switchers.cityName,
				manualRegion: manualRegion,
				region: region
			});

			regionConfirm.show();
		}

		__webpack_require__(5);
	}

	aRadar('additionalJSInit', 1);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var portal = __webpack_require__(3),
		PortalEvents = __webpack_require__(4),
		fn = portal.__fn;

	var defaultSettings = {
		cityName: '',
		region: null,
		manualRegion: null
	};

	function RegionConfirm(settings){
		var self = this;

		this.__settings = fn.extend({}, defaultSettings, settings);

		this.showVariant = this.__settings.show;
		this.variant = 0;

		this.container = mr.id('l-center');
		this.linkforposition = mr.id('regional-info-link-0');
		this.popup = mr.id('region-confirm');

		if (mr._.STUCK_IN_POT) {
			this.popup.className = this.popup.id = mr.locator.transform('region-confirm');
			mr.setBem(this.popup, mr.locator.transform('region-confirm'));
		}

		this.choose = mr.id('region-confirm__choose');
		this.closeButton = mr.id('region-confirm__close');
		this.confirm = mr.id('region-confirm__confirm');
		this.link = mr.id('region-confirm__link');
		this.city = mr.id('region-confirm__city');
		this.yes = mr.id('region-confirm__yes');
		this.no = mr.id('region-confirm__no');

		this.container.appendChild(this.popup);

		PortalEvents.addListener(this.closeButton, 'click', fn.bind(this.hideByButton, this));
		PortalEvents.addListener(this.closeButton, 'keyup', fn.bind(function (e) { if (e.keyCode === 13) this.hideByButton() }, this));

		var geo = mr['s_cookie']['getGlobal']('geo'), // эффективный
			georb = mr['s_cookie']['getGlobal']('georb'), // регион, в котором сделан выбор
			geod = mr['s_cookie']['getGlobal']('geod'), // регион, где запомнили, что "НЕТ"
			geol1 = mr['s_cookie']['getGlobal']('geol1'),
			sregion = {
				level1: geol1 || null,
				level2: georb || null
			},
			region = this.__settings.region,
			manualRegion = this.__settings.manualRegion;


		if (this.showVariant === 1 || this.__settings.region.id === 0 && !geo){
			this.variant = 1;

		} else if (
				this.showVariant === 2

				||

				geo // если выбор вообще делался

				&&
				geo !== region.id // выбранный регион отличается от ip региона нижнего уровня

				// И
				&&

					(   // одно из двух
						(
							sregion.level2 !== null // есть L2, в котором делали выбор (делали выбор из области)
							&&
							manualRegion.level2 != region.level2 // выбранный L2 не равен определенному L2
							&&
							sregion.level2 != region.level2 // L2, в котором делали выбор, не равен определенному L2
							&&
							region.level2 !== null // IP L2 есть

							// sregion.level2 === effRegion.level2 но вполне могут быть равны L2, в котором делали выбор, и L2 выбранный
						)

						|| // или

						(
							sregion.level1 !== null // есть L1 в котром делали выбор
							&&
							manualRegion.level1 != region.level1 // выбранный L1 не равен определенному L1
							&&
							sregion.level1 != region.level1 // L1, в котором делали выбор, не равен определенному L1

							// region.level1 != effRegion.level1 но вполне могут быть равны L1, в котором делали выбор, и L1 выбранный
						)
					)

				&& // И

				(
						!geod // либо "нет" не нажимали

					||

						geod // либо нажимали
						&&
						geod != region.level1 // но в другой стране
				)

				/*||

					this.__settings.region.level2 != this.__settings.effRegion.level2
				&&
					this.__settings.region.level2 != null
				&&
					this.__settings.effRegion.level2 != null
				&&


					(!geod || geod && geod != this.__settings.region.level1)
				&&
					georb && georb != this.__settings.region.level2
				&&
					geo && geo !== this.__settings.region.id*/
			) {

			this.variant = 2;

		}

		if (this.variant === 1){
			this.choose.style.display = 'inline-block';

			this.confirm.style.display = 'none';
			if (this.link) {
				PortalEvents.addListener(this.link, 'click', fn.bind(this.showRegionalSelector, this));
			}
		} else if (this.variant === 2){
			this.choose.style.display = 'none';
			this.confirm.style.display = 'inline-block';

			this.city.innerHTML = this.__settings.cityName;

			PortalEvents.addListener(this.yes, 'click', fn.bind(this.save, this));
			PortalEvents.addListener(this.no, 'click', fn.bind(this.save, this));
			PortalEvents.addListener(this.yes, 'keyup', fn.bind(this.save, this));
			PortalEvents.addListener(this.no, 'keyup', fn.bind(this.save, this));
		} else {
			this.__disabled = true;
		}

		newsTabs.on('tab:activate', function () {
			self.hide();
		});
	}

	RegionConfirm.prototype = {
		save: function (e) {
			var button,
				geod;

			if (!(e.type === 'click' || e.type === 'keyup' && e.keyCode === 13)) return;

			if (e.target === this.yes || fn.hasParent(e.target, this.yes)){
				button = 'yes';
			} else if (e.target === this.no || fn.hasParent(e.target, this.no)){
				button = 'no';
			}

			if (!button) return;

			(new Image).src = '//rs.mail.ru/f?geo=' + mr['s_cookie']['getGlobal']('geo') + '&ipR=' + this.__settings.region.id + '&ipLevel2=' + this.__settings.region.level2 + '&effLevel2=' + this.__settings.manualRegion.level2 + '&ipLevel1=' + this.__settings.region.level1 + '&effLevel1=' + this.__settings.manualRegion.level1 + '&geod=' + mr['s_cookie']['getGlobal']('geod') + '&georb=' + mr['s_cookie']['getGlobal']('georb') + '&geol1=' + mr['s_cookie']['getGlobal']('geol1') + '&button=' + button;

			if (button === 'yes'){
				mr.counter('clb1283927');

				mr['s_cookie']['removeGlobal']('geo');
				mr['s_cookie']['removeGlobal']('georb');
				mr['s_cookie']['removeGlobal']('geol1');
				mr['s_cookie']['removeGlobal']('geod');

				setTimeout(function () {
					location.reload();
				}, 20);

				this.hide();
			}
			if (button === 'no'){
				mr.counter('clb1283928');

				geod = mr['s_cookie']['getGlobal']('geod');

				mr['s_cookie'][this.__settings.region.level2 ? 'setGlobal' : 'removeGlobal']('georb', this.__settings.region.level2);
				mr['s_cookie'][this.__settings.region.level1 ? 'setGlobal' : 'removeGlobal']('geol1', this.__settings.region.level1);

				if (geod == -1){
					mr['s_cookie']['setGlobal']('geod', this.__settings.region.level1);
				} else {
					mr['s_cookie']['setGlobal']('geod', '-1')
				}
				this.hide();
			}
		},
		hideByButton: function () {
			this.hide();
			if (this.variant){
				mr.counter('clb' + (this.variant == 1 ? '1283920' : '1283930'));
			}
		},
		hide: function () {
			this.popup.style.display = 'none';
		},
		show: function () {
			if (this.__disabled){
				return;
			}
			this.popup.style.display = 'block';
			this.popup.style.left = this.linkforposition.offsetWidth + 20 + 'px';

			if (this.variant){
				mr.counter('d' + (this.variant == 1 ? '1283915' : '1283926'));
			}
		},
		showRegionalSelector: function () {
			showRegionSelector = true;
			mr.counter('clb1283918');
			mr.loadRegionPopup();
			this.hide();
		}
	};

	module.exports = RegionConfirm;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	
	/**
	 *
	 * namespace для всякостей
	 *
	 * @expose
	 * @type {Object}
	 */
	var __portal = {};

	/**
	 *
	 * @param {string} id
	 * @return {Node}
	 */
	function byId(id){
		return document.getElementById(id);
	}

	/**
	 *
	 * @return {Function}
	 */
	function byClassName(){
		var
			/** @type {RegExp} @const */
			RE__getElementsByClassName = /\s*(\S+)\s*/g
			/** @type {string} @const */
			, STRING_FOR_RE__getElementsByClassName = '(?=(^|.*\\s)$1(\\s|$))'
			/** @type {boolean} @const */
			, IS_IELT9 = !/\[native\s+code\]/i.test(document.getElementsByClass + "")
			/** @type {RegExp} @const */
			, RE__querySelector__dottes = /\./g
		;
		/**
		 * @param {(Document|Node|string)} root_or_klas if string -> klas. Class list with "." separator and start with "."
		 * @param {string=} klas
		 * @param {string=} tag
		 */
		return function getElementsByClass(root_or_klas, klas, tag) {
			var result
				, preResult
				, i
				, child
			;

			if(typeof root_or_klas === "string") {
				tag = klas;
				klas = root_or_klas;
				root_or_klas = document;
			}

			tag = tag || "";

			if(!root_or_klas || klas == null) {
				return [];
			}

			klas = klas.replace(/\s+/ig, '.');

			if (klas[0] != '.'){
				klas = '.' + klas;
			}

			if("querySelectorAll" in root_or_klas) {
				preResult = root_or_klas.querySelectorAll(tag + klas); // w3c and IE8

				if(IS_IELT9) {
					i = -1;
					result = [];
					while(child = preResult[++i]) {
						result.push(child);
					}
					return result;
				}
				else {
					return preResult;
				}
			}
			else { // IE < 8
				preResult = root_or_klas.getElementsByTagName(tag || "*");

				if(klas) {
					klas = klas.replace(RE__querySelector__dottes, " ");
					klas = new RegExp(klas.replace(RE__getElementsByClassName, STRING_FOR_RE__getElementsByClassName));
				}

				i = -1;
				result = [];

				while(child = preResult[++i]) {
					if(child.nodeType === 1 && (!klas || klas.test(child.className))) {
						result.push(child);
					}
				}

				return result;
			}
		}
	}

	/**
	 *
	 * @param {Function} fn
	 * @param {Object} that
	 * @return {Function}
	 */
	function bind(fn, that) {
		return function(){
			if (typeof fn !== 'function') {
				console.log(fn);
			}
			return fn.apply(that, arguments);
		};
	}

	/**
	 *
	 * @param {Object} target
	 * @param {...Object} sources
	 * @return {Object}
	 */
	function extend(target, sources){
		target = target || {};
		for (var i = 1, l = arguments.length; i < l; i++){
			var source = arguments[i];
			for (var p in source) if (source.hasOwnProperty(p)){
				target[p] = source[p];
			}
		}
		return target;
	}

	/**
	 *
	 * @param {Object} obj
	 * @param {Object} extension
	 * @return {Object}
	 */
	function append(obj, extension) {
		for(var key in extension)
			if(Object.prototype.hasOwnProperty.call(extension, key) && !Object.prototype.hasOwnProperty.call(obj, key))
				obj[key] = extension[key];

		return obj;
	}

	/**
	 *
	 * @param {Node} ele
	 * @return {Boolean}
	 */
	function isNode(ele){
		return ele && ele.nodeType == 1;
	}

	/**
	 *
	 * @param {Node} node
	 * @param {Node|string} parent
	 * @return {Node|boolean}
	 */
	function hasParent(node, parent){
		var checker;
		if (isNode(parent)){
			checker = function(node, parent){
				return node == parent;
			}
		} else {
			checker = function(node, parent){
				return hasClass(node, parent);
			}
		}
		var p = node.parentNode;
		while (p){
			if (checker(p, parent)){
				return p;
			}
			p = p.parentNode;
		}
		return false;
	}

	/**
	 *
	 * @type {Boolean}
	 */
	var supportClassList = "classList" in document.documentElement;

	/**
	 *
	 * @param {Node} node
	 * @param {string} klas
	 * @return {*}
	 */
	function hasClass(node, klas) {
		return isNode(node) && supportClassList ? node['classList'].contains(klas) : !!~(" " + node.className + " ").indexOf(" " + klas + " ")
	}

	/**
	 *
	 * @param {Node} node
	 * @param {string} klas
	 */
	function addClass(node, klas) {
		if(isNode(node)) {
			supportClassList ?
				node['classList']['add'](klas) :
				!hasClass(node, klas) && (node.className += (" " + klas));
		}
	}

	/**
	 *
	 * @param {Node} node
	 * @param {string} klas
	 */
	function removeClass(node, klas) {
		if(isNode(node)) {
			supportClassList ?
				node['classList']['remove'](klas) :
				node.className = node.className.replace(new RegExp("(^|\\s)" + klas + "(\\s|$)", "g"), "$1")
		}
	}

	/**
	 *
	 * @param {Node} node
	 * @param {string} klas
	 * @return {*}
	 */
	function toggleClass(node, klas) {
		if(isNode(node)) {
			return supportClassList ?
				node['classList']['toggle'](klas) :
				hasClass(node, klas) ? (removeClass(node, klas), false) : (addClass(node, klas), true);
		}
	}

	/**
	 *
	 * namespace для вспомогательных функций
	 *
	 * @expose
	 * @type {Object}
	 */


	module.exports = {
		__fn: {
			byId: byId,
			byClassName: byClassName(),
			bind: bind,
			extend: extend,
			append: append,
			//eventCancel: eventCancel,
			//eventPreventDefault: eventPreventDefault,
			//event: event,
			isNode: isNode,
			hasParent: hasParent,
			hasClass: hasClass,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass
		}
	};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var portal = __webpack_require__(3),
		fn = portal.__fn,
		PortalEvents = {};

	var _browser_msie = window["eval"] && window["eval"]("/*@cc_on 1;@*/") && +((/msie (\d+)/i.exec(navigator.userAgent) || [])[1] || 0) || void 0

		, _document_documentElement = document.documentElement

		, _document_body = document.body

		, _append = fn.append

		/** @const @type {string} */
		, _event_UUID_prop_name = "uuid"

		/** @type {number} unique indentifier for event listener */
		, _event_UUID = 1//MUST be more then 0 | 0 - using for DOM0 events

		/** @const @type {string} */
		, _event_handleUUID = "_h_9e2"

		/** @const @type {string} */
		, _event_eventsUUID = "_e_8vj"

		/** @const */
		, _hasOwnProperty = Function.prototype.call.bind(Object.prototype.hasOwnProperty)

		/** @const */
		, _Function_call = Function.prototype.call

		/** @const */
		, _throw = function(errStr) {
			throw errStr instanceof Error ? errStr : new Error(errStr);
		}

		/** @type {boolean} @const */
		, IS_NEED_LISTENER_WRAP = !("createEvent" in document)// || !("stopImmediatePropagation" in (document.createEvent("Event")))

		, __is__DOMContentLoaded
	;

	var _Event_prototype = {
		/** @this {_ielt9_Event} */
		"preventDefault" : function() {
			if(this.cancelable === false)return;

			this["returnValue"] = false;
			this["defaultPrevented"] = true;
		} ,

		/** @this {_ielt9_Event} */
		"stopPropagation" : function() {
			this["cancelBubble"] = true;
		}
	};
	/** @this {_ielt9_Event} */
	_Event_prototype["stopImmediatePropagation"] = function() {
		this["__stopNow"] = true;
		this.stopPropagation();
	};
	_Event_prototype["defaultPrevented"] = false;


	function fixEvent(event) {
		if("__isFixed" in event)return;

		if(!_document_body) {
			_document_body = document.body;
		}

		var thisObj = this
			, _button = ("button" in event) && event.button
		;

		event["__isFixed"] = true;// mark event as fixed

		//http://javascript.gakaa.com/event-detail.aspx
		//http://www.w3.org/TR/2011/WD-DOM-Level-3-Events-20110531/#event-type-click
		//indicates the current click count; the attribute value must be 1 when the user begins this action and increments by 1 for each click.
		if(event.type === "click" || event.type === "dblclick") {
			if(event.detail === void 0)event.detail = event.type === "click" ? 1 : 2;
			if(!event.button && fixEvent._clickButton !== void 0)_button = fixEvent._clickButton;
		}

		_append(event, _Event_prototype);

		if(!event["defaultPrevented"])event["defaultPrevented"] = false;

		if(!event.target)event.target = event.srcElement || document;// target for IE

		// add relatedTarget в IE, if needs
		if(event.relatedTarget === void 0 && event.fromElement)
			event.relatedTarget = event.fromElement == event.target ? event.toElement : event.fromElement;

		// calculate pageX/pageY for IE
		if("clientX" in event && event.pageX == null) {
			event.pageX = event.clientX + (_document_documentElement.scrollLeft || _document_body && _document_body.scrollLeft || 0) - (_document_documentElement.clientLeft || 0);
			event.pageY = event.clientY + (_document_documentElement.scrollTop || _document_body && _document_body.scrollTop || 0) - (_document_documentElement.clientTop || 0);
		}

		//Add 'which' for click: 1 == left; 2 == middle; 3 == right
		if(!event.which && _button)event.which = _button & 1 ? 1 : _button & 2 ? 3 : _button & 4 ? 2 : 0;

		"timeStamp" in event || (event.timeStamp = +new Date());

		"eventPhase" in event || (event.eventPhase = (event.target == thisObj) ? 2 : 3); // "AT_TARGET" = 2, "BUBBLING_PHASE" = 3

		"currentTarget" in event || (event.currentTarget = thisObj);

		"isTrusted" in event || (event.isTrusted = true);

		"keyCode" in event || (event.keyCode = event.charCode || event.which);

		return event;
	}

	if(_browser_msie && _browser_msie < 9) {
		document.attachEvent("onmousedown", function(){
			fixEvent._clickButton = event.button;
		});
		document.attachEvent("onclick", function(){
			fixEvent._clickButton = void 0;
		});
	}

	// Universal event handler, this == element
	function commonHandler(nativeEvent) {
		if(fixEvent === void 0) {//filtering rare issue in old IE when handler call after page is unload
			return;
		}

		var thisObj = this
			, _ = thisObj["_"]
			, errors = []
			, errorsMessages = []
			, _event
			, handlersKey = _event_eventsUUID
		;

		if((!_ || !_[handlersKey]))return;

		// get event in IE
		nativeEvent || (nativeEvent = window.event);

		fixEvent.call(this, nativeEvent);

		var handlers = _[handlersKey][nativeEvent.type];

		if(handlers) {
			for(var g in handlers)if(_hasOwnProperty(handlers, g)) {
				var handler = handlers[g]
					, context
				;

				if(typeof handler === "object") {
					context = handler;
					handler = handler.handleEvent;
				}

				try {
					// Call handler with needed context and fixed event as a parameter, result saved in event['result']
					if( handler &&
						(
							nativeEvent['result'] = _Function_call.call(handler, context || thisObj, nativeEvent)
							)
							=== false
						) {// If handler return false
						nativeEvent.preventDefault();
						nativeEvent.stopPropagation();
					}
				}
				catch(e) {
					window.logError && logError(e, 'portalEventHandler');
					errors.push(e);// Collect all exceptions without interrupting events queue call
					errorsMessages.push(e.message);
					if(window.console)console.error(e);
				}

				if(nativeEvent["__stopNow"])break;// Immediate stop propagation
			}
			handlers[0] = void 0;//cleanup
			delete handlers[0];

			if(errors.length == 1) {// If there was only one error - throw it on
				_throw(errors[0])
			}
			else if(errors.length > 1) {// Otherwise, do a common object with a list of errors Error in property errors and throw it
				var e = new Error("Multiple errors thrown : " + nativeEvent.type + " : " + " : " + errorsMessages.join("|"));
				e["errors"] = errors;
				_throw(e);
			}
		}
	}


	PortalEvents["addListener"] = IS_NEED_LISTENER_WRAP ?
		function(thisObj, _type, _handler) {
			if(typeof _handler != "function" &&
				!(typeof _handler === "object" && _handler.handleEvent)//Registering an EventListener with a function object that also has a handleEvent property -> Call EventListener as a function
				) {
				return;
			}

			var /** @type {Object} */
				_ = thisObj["_"]
				/** @type {Function} */
				, _callback
				/** @type {boolean} */
				, _useInteractive = false
				/** @type {string} */
				, handlersKey = _event_eventsUUID
			;

			if(!_)_ = thisObj["_"] = {};

			if(_browser_msie && _browser_msie < 9) {
				if(_type == "DOMContentLoaded") {
					if (document.readyState == 'complete')return;

					if(thisObj === global)thisObj = document;

					_useInteractive = true;

					if(!__is__DOMContentLoaded) {
						__is__DOMContentLoaded = true;

						function poll() {
							try { document.documentElement.doScroll('left'); } catch(e) {
								setTimeout(poll, 50);
								return;
							}
							commonHandler.call(thisObj, {"type" : _type, "isTrusted" : true });
						}

						if ("createEventObject" in document && "doScroll" in document.documentElement) {
							try { if(!global["frameElement"])poll() } catch(e) { }
						}
					}
				}

				// fix little IE bug with window object as this object
				if(thisObj.setInterval && (thisObj != global && !thisObj["frameElement"]))thisObj = global;
			}

			// Set unique number to handler function
			if(!_handler[_event_UUID_prop_name])_handler[_event_UUID_prop_name] = ++_event_UUID;

			// Init Инициализовать служебную структуру events и обработчик _[handleUUID].
			//Основная его задача - передать вызов универсальному обработчику commonHandle с правильным указанием текущего элемента this.
			//Как и events, _[handleUUID] достаточно инициализовать один раз для любых событий.
			if(!(_callback = _[_event_handleUUID])) {
				_callback = _[_event_handleUUID] = commonHandler.bind(thisObj);
			}

			//Если обработчиков такого типа событий не существует - инициализуем events[type] и вешаем
			// commonHandle как обработчик на elem для запуска браузером по событию type.
			if(!_[handlersKey])_[handlersKey] = {};
			if(!_[handlersKey][_type]) {
				_[handlersKey][_type] = {};

				if(_browser_msie && _browser_msie < 9) {
					if(!_useInteractive) {
						thisObj.attachEvent('on' + _type, _callback);
					}
				}
				else {
					thisObj.addEventListener(_type, _callback, false);
				}
			}

			//Добавляем пользовательский обработчик в список elem[handlersKey][type] под заданным номером.
			//Так как номер устанавливается один раз, и далее не меняется - это приводит к ряду интересных фич.
			// Например, запуск add с одинаковыми аргументами добавит событие только один раз.
			_[handlersKey][_type][_handler[_event_UUID_prop_name]] = _handler;
		}
		:
		function(thisObj, _type, _handler) {
			thisObj.addEventListener(_type, _handler, false)
		}
	;

	PortalEvents["removeListener"] = IS_NEED_LISTENER_WRAP ?
		function(thisObj, _type, _handler) {
			var /** @type {Object} */
				_ = thisObj["_"]
				/** @type {string} */
				, handlersKey = _event_eventsUUID
				/** @type {Function} */
				, _callback
				/** @type {Array} */
				, handlers
				/** @type {String} */
				, any
			;

			if(typeof _handler != "function" &&	!(typeof _handler === "object" && _handler.handleEvent) || !_handler[_event_UUID_prop_name] || !_)return;
			if(!(_callback = _[_event_handleUUID]))return;

			//Get handlers list
			handlers = _[handlersKey] && _[handlersKey][_type];
			//Delete handler by ID
			delete handlers[_handler[_event_UUID_prop_name]];
			//Check handlers list for emptiness
			for(any in handlers)if(_hasOwnProperty(handlers, any))return;

			//If handlers list is empty - detach native event handler
			if(_browser_msie && _browser_msie < 9) {
				thisObj.detachEvent("on" + _type, _callback);
			}
			else {
				thisObj.removeEventListener(_type, _callback, false);
			}
			//  and delete handlers container
			delete _[handlersKey][_type];

			//If no any handlers on that element
			for(any in _[handlersKey])if(_hasOwnProperty(_[handlersKey], any))return;
			// delete container of handlers containers
			delete _[handlersKey];
		}
		:
		function(thisObj, _type, _handler) {
			thisObj.removeEventListener(_type, _handler, false)
		}
	;

	portal.PortalEvents = PortalEvents;

	module.exports = PortalEvents;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	// HOME-6019 Пишем в куку "s" viewport пользователя, для последующего таргетинга
	mr['s_cookie']['setGlobal']('ww', Math.max(document.documentElement.clientWidth, window.innerWidth || 0))
	mr['s_cookie']['setGlobal']('wh', Math.max(document.documentElement.clientHeight, window.innerHeight || 0))


/***/ })
/******/ ]);