/******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
		/******/
		/******/ 		// Check if module is in cache
		/******/ 		if (installedModules[moduleId]) {
			/******/ 			return installedModules[moduleId].exports;
			/******/ 		}
		/******/ 		// Create a new module (and put it into the cache)
		/******/ 		var module = installedModules[moduleId] = {
			/******/ 			i: moduleId,
			/******/ 			l: false,
			/******/ 			exports: {}
			/******/ 		};
		/******/
		/******/ 		// Execute the module function
		/******/ 		modules[moduleId].call( module.exports, module, module.exports, __webpack_require__ );
		/******/
		/******/ 		// Flag the module as loaded
		/******/ 		module.l = true;
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
	/******/ 	// define getter function for harmony exports
	/******/ 	__webpack_require__.d = function(exports, name, getter) {
		/******/ 		if ( ! __webpack_require__.o( exports, name )) {
			/******/ 			Object.defineProperty( exports, name, { enumerable: true, get: getter } );
			/******/ 		}
		/******/ 	};
	/******/
	/******/ 	// define __esModule on exports
	/******/ 	__webpack_require__.r = function(exports) {
		/******/ 		if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			/******/ 			Object.defineProperty( exports, Symbol.toStringTag, { value: 'Module' } );
			/******/ 		}
		/******/ 		Object.defineProperty( exports, '__esModule', { value: true } );
		/******/ 	};
	/******/
	/******/ 	// create a fake namespace object
	/******/ 	// mode & 1: value is a module id, require it
	/******/ 	// mode & 2: merge all properties of value into the ns
	/******/ 	// mode & 4: return value when already ns object
	/******/ 	// mode & 8|1: behave like require
	/******/ 	__webpack_require__.t = function(value, mode) {
		/******/ 		if (mode & 1) {
			value = __webpack_require__( value );
		}
		/******/ 		if (mode & 8) {
			return value;
		}
		/******/ 		if ((mode & 4) && typeof value === 'object' && value && value.__esModule) {
			return value;
		}
		/******/ 		var ns = Object.create( null );
		/******/ 		__webpack_require__.r( ns );
		/******/ 		Object.defineProperty( ns, 'default', { enumerable: true, value: value } );
		/******/ 		if (mode & 2 && typeof value != 'string') {
			for (var key in value) {
				__webpack_require__.d( ns, key, function(key) { return value[key]; }.bind( null, key ) );
			}
		}
		/******/ 		return ns;
		/******/ 	};
	/******/
	/******/ 	// getDefaultExport function for compatibility with non-harmony modules
	/******/ 	__webpack_require__.n = function(module) {
		/******/ 		var getter = module && module.__esModule ?
		/******/ 			function getDefault() { return module['default']; } :
		/******/ 			function getModuleExports() { return module; };
		/******/ 		__webpack_require__.d( getter, 'a', getter );
		/******/ 		return getter;
		/******/ 	};
	/******/
	/******/ 	// Object.prototype.hasOwnProperty.call
	/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call( object, property ); };
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__( __webpack_require__.s = "./src/index.js" );
	/******/ })(
		{

			/***/ "./src/index.js":
			/*!**********************!*\
			!*** ./src/index.js ***!
			\**********************/
			/*! no exports provided */
			/***/ (function(module, __webpack_exports__, __webpack_require__) {

				"use strict";
				__webpack_require__.r( __webpack_exports__ );
				/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__         = __webpack_require__( /*! @wordpress/element */ "@wordpress/element" );
				/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ );

				var registerBlockType    = wp.blocks.registerBlockType;
				var wpep_block_container = {
					"text-align": 'center'
				};
				var divStyle             = {
					"margin-bottom": "40px"
				};
				var wpep_logo            = {
					filter: "grayscale(100%)",
					width: "250px"
				};
				registerBlockType(
					'wpep/shortcode',
					{
						title: 'WPEasyPay Form',
						description: 'Block to add WP EASY PAY shortcode to the page',
						icon: 'format-aside',
						category: 'layout',
						attributes: {
							type: {
								type: 'string'
							}
						},
						edit: function edit(props) {
							var p       = wpep_forms.forms;
							var options = [];
							options.push(
								Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
									"option",
									{
										value: ""
									},
									"Please select your form"
								)
							);

							for (var key in p) {
								if (p.hasOwnProperty( key )) {
									var form_id    = p[key].ID;
									var form_title = p[key].title;

									if (props.attributes.type == form_id) {
										options.push(
											Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
												"option",
												{
													value: form_id,
													selected: true
												},
												form_title
											)
										);
									} else {
										options.push(
											Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
												"option",
												{
													value: form_id
												},
												form_title
											)
										);
									}
								}
							}

							var type = props.attributes.type;

							function wpep_shortcode_change(e) {
										var form_id = e.target.value;
										props.setAttributes(
											{
												type: form_id
											}
										);
							}

							return Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
								"div",
								{
									style: wpep_block_container
								},
								Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
									"div",
									{
										style: divStyle
									},
									Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
										"img",
										{
											style: wpep_logo,
											src: 'https://wpeasypay.com/wp-content/uploads/2019/12/Group-270@2x.png'
										}
									),
									" "
								),
								" ",
								Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
									"div",
									null,
									Object( _wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"] )(
										"select",
										{
											onChange: wpep_shortcode_change
										},
										" ",
										options,
										" "
									),
									" "
								),
								" "
							);
						},
						save: function save(props) {
							return null;
						}
					}
				);

				/***/ }),

		/***/ "@wordpress/element":
		/*!******************************************!*\
		!*** external {"this":["wp","element"]} ***!
		\******************************************/
		/*! no static exports found */
		/***/ (function(module, exports) {

			(function() { module.exports = this["wp"]["element"]; }());

			/***/ })

		/******/ }
	);
	// # sourceMappingURL=index.js.map
