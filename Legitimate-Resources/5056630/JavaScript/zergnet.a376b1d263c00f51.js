!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("CAAS_AOLCOM",[],t):"object"==typeof exports?exports.CAAS_AOLCOM=t():e.CAAS_AOLCOM=t()}(self,(function(){return function(){"use strict";var e={d:function(t,o){for(var i in o)e.o(o,i)&&!e.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:o[i]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r:function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function o(e){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o(e)}function i(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,r=function(e,t){if("object"!==o(e)||null===e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var n=i.call(e,"string");if("object"!==o(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===o(r)?r:String(r)),n)}var r}e.r(t),e.d(t,{default:function(){return u}});var n,r,l,a,c,u=new(n=window.wafer.utils,r=n.bindEvent,l=n.elementInView,a=n.throttle,c=n.unbindEvent,function(){function e(t){var o=t.selector;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.elem=document.getElementsByClassName(o)[0],this.elem){var i=this.elem.querySelector('script[type="x-mod-config"]');i?(this.config=JSON.parse(i.text),this._initialized=!1,this._validateWithThrottle=a(this.validate,50,this),this.init()):console.error("Zergnet: No module config Found")}}var t,o;return t=e,(o=[{key:"init",value:function(){r(window,"scroll",this._validateWithThrottle),this._validateWithThrottle()}},{key:"loadZergnet",value:function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://www.zergnet.com/zerg.js?id=".concat(this.config.zergnetId);var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}},{key:"validate",value:function(){!this._initialized&&l(this.elem,{offsetY:200},window.wafer.base.viewport)&&(c(window,"scroll",this._validateWithThrottle),this._initialized=!0,this.loadZergnet())}},{key:"destroy",value:function(){c(this.elem,"scroll",this._validateWithThrottle)}}])&&i(t.prototype,o),Object.defineProperty(t,"prototype",{writable:!1}),e}())({selector:"zergnet"});return t}()}));
//# sourceMappingURL=zergnet.js.map