!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("CAAS_AOLCOM",[],t):"object"==typeof exports?exports.CAAS_AOLCOM=t():e.CAAS_AOLCOM=t()}(self,(function(){return function(){"use strict";var e={d:function(t,r){for(var o in r)e.o(r,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:r[o]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function o(e){return function(e){if(Array.isArray(e))return n(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return n(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function i(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==r(e)||null===e)return e;var o=e[Symbol.toPrimitive];if(void 0!==o){var n=o.call(e,"string");if("object"!==r(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===r(i)?i:String(i)),n)}var i}e.r(t),e.d(t,{default:function(){return c}});var a,l,u,d,c=new(a=window.wafer.utils,l=a.loadScriptAsync,u=a.elementInView,d=a.throttle,function(){function e(t){var r=this,i=t.selector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.elems=function(e,t,r){if(t&&!Array.isArray(t)&&"number"==typeof t.length){var o=t.length;return n(t,o)}return e(t,r)}(o,document.querySelectorAll(i)),!this.elems.length>0||(this.config=JSON.parse(this.elems[0].dataset.configObject),this.elems.forEach((function(e){return e._libraryIsLoaded=!1,e._initialized=!1,e._validateWithThrottle=d((function(){return r.validate(e)}),50,r),r.init(e),e})))}var t,r;return t=e,(r=[{key:"init",value:function(e){window.addEventListener("scroll",e._validateWithThrottle),e._validateWithThrottle()}},{key:"loadLibrary",value:function(e){e._libraryIsLoaded||window.Readmo||(window.readmo||(window.readmo=[]),l({src:"//s.yimg.com/dy/ads/readmo.js"},(function(){e._libraryIsLoaded=!0})))}},{key:"loadContent",value:function(e){window.readmo=window.readmo||[],window.readmo.push(JSON.parse(e.getAttribute("data-config-object")))}},{key:"updateAdBlockScript",value:function(){var e=window.rapidConfig,t=(void 0===e?{}:e).spaceid,r=void 0===t?"":t,o=this.config,n=o.enableAdBlockScript,i={"data-page-id":o.pageId,"data-space-id":r};n&&window.NEXUtils.loadScript("https://s.yimg.com/dy/readmo-pixel.js",null,!0,!1,i).then((function(){window.ReadmoPixel.load()}))}},{key:"validate",value:function(e){!e._initialized&&u(e,{offsetY:200},window.wafer.base.viewport)&&(window.removeEventListener("scroll",e._validateWithThrottle),e._initialized=!0,this.loadLibrary(e),this.loadContent(e),this.updateAdBlockScript())}}])&&i(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}())({selector:".m-readmo > .readmo-container"});return t}()}));
//# sourceMappingURL=readmo.js.map