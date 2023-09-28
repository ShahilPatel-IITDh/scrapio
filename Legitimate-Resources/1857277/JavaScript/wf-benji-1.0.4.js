!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("wafer-benji",[],t):"object"==typeof exports?exports["wafer-benji"]=t():(e.wafer=e.wafer||{},e.wafer.wafers=e.wafer.wafers||{},e.wafer.wafers["wafer-benji"]=t())}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="https://s.yimg.com/aaq/wf/",t(t.s="./src/entry.js")}({"./src/base.js":function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},f=function(){function e(e,t){var r=[],n=!0,o=!1,i=void 0;try{for(var a,f=e[Symbol.iterator]();!(n=(a=f.next()).done)&&(r.push(a.value),!t||r.length!==t);n=!0);}catch(e){o=!0,i=e}finally{try{!n&&f.return&&f.return()}finally{if(o)throw i}}return r}return function(t,r){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=window.wafer,c=u.constants,l=u.WaferBaseClass,p=c.ATTR_PREFIX,d=["benji-config"],b=function(e){function t(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=r.errorClass,s=r.selector,u=r.successClass;n(this,t);var c=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,{errorClass:i,selector:s,successClass:u},{STATE_ATTRS:d})),l=(e.getAttribute(p+"margin")||"").split(" "),b=f(l,2),v=b[0],y=void 0===v?"1200":v,h=b[1],w=void 0===h?"0":h;return c._util=a({},c._util,{"benji-config":e.getAttribute(p+"benji-config"),benjiPageContext:e.getAttribute(p+"benji-page-context")||"",benjiWaferConfig:e.getAttribute(p+"benji-wafer-config")||"",offsetX:Number(w)||0,offsetY:Number(y)||0,trigger:e.getAttribute(p+"trigger")||"viewport"}),c}return i(t,e),s(t,[{key:"stateDidUpdate",value:function(){this._stateDidUpdate()}},{key:"config",get:function(){var e=this._util;return{offsetX:e.offsetX,offsetY:e.offsetY,trigger:e.trigger}}}]),t}(l);b.events={},t.default=b,e.exports=t.default},"./src/controller.js":function(e,t,r){"use strict";function n(){return s=o(r("./src/base.js"))}function o(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s,u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=function e(t,r,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,r);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,r,n)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(n)},l=window.wafer.controllers.WaferBaseController,p=window.wafer,d=p.base,b=p.utils,v=b.elementInView,y=b.debounce,h=function(e){function t(e){var r=e.errorClass,o=void 0===r?"wafer-benji-error":r,f=e.root,u=void 0===f?document:f,c=e.selector,l=void 0===c?".wafer-benji":c,p=e.successClass,b=void 0===p?"wafer-benji-done":p,h=e.validateDelay,w=void 0===h?25:h;i(this,t);var g=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,{root:u,selector:l,props:{errorClass:o,selector:l,successClass:b},WaferClass:(s||n()).default}));g._validateWithDebounce=y(function(){g.validate()},w,g);var j=g;return(s||n()).default.prototype._stateDidUpdate=function(){var e=this._util.elem,t=this.config,r=t.offsetX,n=t.offsetY,o=t.trigger,i=!0;"viewport"===o&&(i=v(e,{offsetX:r,offsetY:n},d.viewport)),i&&j.triggerForElements([e],{source:"state"})},g.sync(),g}return f(t,e),u(t,[{key:"_checkIfBenjiNameSpaceExist",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return new Promise(function(r,n){if(t>5)return n(new Error("namespace does not exist"));if(window.benji)return r();var o=t+1;setTimeout(function(){e._checkIfBenjiNameSpaceExist(o).then(function(){r()}).catch(function(e){n(e)})},50*o)})}},{key:"makeBenjiCall",value:function(e,t,r){var n=window.benji;n&&"function"==typeof n.render&&(t&&"function"==typeof n.updateI13N&&n.updateI13N(r),n.render(e.positions))}},{key:"triggerForElements",value:function(e){var t=this;this._checkIfBenjiNameSpaceExist().then(function(){if(window.benji){var r=t._state.elementInstances;e.forEach(function(e){var n=r.get(e),o=n.instance,i={},a={},f={},s=!1;try{if(!(i=JSON.parse(o._util["benji-config"])))return!1;var u=o._util.benjiWaferConfig;if(u.length>0&&(f=JSON.parse(u),s=f.updateI13n)){var c=o._util.benjiPageContext;c.length>0&&(a=JSON.parse(c))}i.positions&&(t.makeBenjiCall(i,s,a),o.destroy())}catch(r){e.classList.add(t._options.props.errorClass),o.destroy()}})}}).catch(function(e){})}},{key:"handleScroll",value:function(){this._validateWithDebounce()}},{key:"handleResize",value:function(){this._validateWithDebounce()}},{key:"willValidate",value:function(e){var t=[],r=this._state.elementInstances;e.forEach(function(e){var n=r.get(e),o=n.instance,i=o.config,a=i.offsetX,f=i.offsetY,s=i.trigger;"viewport"===s&&v(e,{offsetX:a,offsetY:f},d.viewport)?t.push(e):"onLoad"===s&&t.push(e)}),t.length&&this.triggerForElements(t)}},{key:"destroy",value:function(e){c(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"destroy",this).call(this,e)}}]),t}(l);t.default=h,e.exports=t.default},"./src/entry.js":function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o;t.default=new((o||function(){return o=n(r("./src/controller.js"))}()).default)({selector:"wafer-benji"}),e.exports=t.default}})});