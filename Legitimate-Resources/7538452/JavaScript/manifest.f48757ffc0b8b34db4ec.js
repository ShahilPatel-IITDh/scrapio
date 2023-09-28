/*! This file is created by qianduan */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/ 		if(executeModules) {
/******/ 			for(i=0; i < executeModules.length; i++) {
/******/ 				result = __webpack_require__(__webpack_require__.s = executeModules[i]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		47: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "static-txox/js/" + ({"0":"index","1":"liu_xianggang","2":"kl_guangdong","3":"di_fucai3D","4":"pk_beijing","5":"ks_jiangsu","6":"sh_chongqing","7":"ele_guangdong","8":"pc_dandan","9":"long_dragon","10":"vpGames","11":"register1","12":"vpQipai","13":"vpBuyu","14":"vpHomeLive","15":"vpTiyu","16":"vpYouhui","17":"traditioIndex","18":"register2","19":"vp_trend_ssc","20":"vp_trend_k3","21":"vp_trend_pk10","22":"vp_trend_pcdd","23":"vp_trend_cp11x5","24":"vp_trend_dpc","25":"vp_trend_lhc","26":"vp_trend_gdklsf","27":"vpHome","28":"register","29":"vp_trend","30":"vpLoading","31":"rules_dipin","32":"vpRelation","33":"rules_kuaisan","34":"rules_pcdandan","35":"vpAboutPage","36":"rules_liuhecai","37":"gameRules","38":"rules_kuaile","39":"vpSaveHelp","40":"hall_Animate","41":"vpPullHelp","42":"rules_eleven","43":"rules_shishicai","44":"rules_pk10"}[chunkId]||chunkId) + "." + {"0":"e340b3d3d7cec3536787","1":"1ebf4639cfa3856e503a","2":"4bda7d9e9cb8d69731ab","3":"eb2f791ef968f196229a","4":"64fb66addec8bed8f983","5":"ebf39c147513c1931081","6":"f53118bca8b6f6c3e5ca","7":"4d1d16b2345108d4d91b","8":"0a28f3cbb0001467ad60","9":"4df8471cff70162c0356","10":"328a5e1e56c84a2a1954","11":"1379d69ec3f71f1241e5","12":"217d9142d95ed1f3e146","13":"b38cd49337f532dd8e4f","14":"9a618771f7fb42b6a3e7","15":"a3b7b712ce3182f47f07","16":"4537af7f7022d5e6c2ba","17":"b0bea5b5858d9839cd63","18":"338df1a410c7cbd95d7b","19":"196ce2ef86d6bd5ab89c","20":"3864d88a016c36d936e0","21":"a625f5df8e3ae735393b","22":"1b19efd066f890bddc9d","23":"c5331a36095f174efa7f","24":"aefd93d8574f42399b69","25":"4e55cd7617af848af911","26":"edac984c821bde5da483","27":"d4859952b93af6d61b5e","28":"e2ecb492f6ede58c4868","29":"8c34fa72319f26ca5e1f","30":"452c55e4e88dc302e3ee","31":"6982f8b107bc775b7566","32":"100c4dda933ff66ee0b2","33":"6cae8ee986ca36c4c7d0","34":"eefc83fcecb4de91604d","35":"02f9b743b2beab7fd791","36":"17768d088225c700f7c3","37":"51396e29072504cf3a25","38":"df039a95e9a227ba12a8","39":"1d5c939b61990c5af6b4","40":"4616bd50115bf7ac7b11","41":"1cde17d94c0b15297d75","42":"c6f2e49ae878c6d2f4bc","43":"308073ea78532e38ff07","44":"89d1568299c536bfe7fc"}[chunkId] + ".js?v=2023-6-30-17:56:43";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/ })
/************************************************************************/
/******/ ([]);