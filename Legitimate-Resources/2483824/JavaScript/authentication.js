(()=>{var e={21575:function(e){e.exports=function(e,t){"use strict";function n(e){return n.$.channel(e),n.$}return n.$={version:"0.2",channelName:"",channels:[],broadcast:function(){var e,n,r,o,i=this.channels[this.channelName],c=i.length;for(e=0;e<c;e++)"object"==typeof(n=i[e])&&n.length&&(r=n[0],o=n[1]||t),r.apply(o,arguments);return this},channel:function(e){var t=this.channels;return t[e]||(t[e]=[]),this.channelName=e,this},subscribe:function(){var e,t,n=arguments,r=this.channels[this.channelName],o=n.length,i=[];for(e=0;e<o;e++)"object"==typeof(t="function"==typeof(i=n[e])?[i]:i)&&t.length&&r.push(t);return this},unsubscribe:function(){var e,t,n,r=arguments,o=this.channels[this.channelName],i=r.length,c=o.length,a=0;for(e=0;e<i;e++)for(a=0,c=o.length,t=0;t<c;t++)o[n=t-a][0]===r[e]&&(o.splice(n,1),a++);return this}},n}(0,this)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,n,r){return(n=function(t){var n=function(t,n){if("object"!==e(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var o=r.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(n)?n:String(n)}(n))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t}function r(e){var t=document.cookie.split(";").find((function(t){return t.trim().startsWith("".concat(e,"="))}));return!!t&&t.split("=")[1]}function o(e){document.cookie="".concat(e,"= ;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;")}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?i(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var a="walletConnected",u="hidden",l="visible",s=function(e,t){var n="connected";t?(e.classList.add(n),e.classList.add(l)):e.classList.remove(n)};var f="authCompleted";function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function p(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function y(e){return function(e){if(Array.isArray(e))return d(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||p(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}n(21575),Object.freeze({PUBLISH:"publish",FUTURE:"future",DRAFT:"draft",PENDING:"pending",PRIVATE:"private",TRASH:"trash",AUTO_DRAFT:"auto-draft",INHERIT:"inherit"}),document.querySelector("body");const v=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};window.dataLayer&&e&&0!==Object.keys(n).length&&window.dataLayer.push(function(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?b(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({event:e},n))};var m=3154e5,h="time_meter_v2",w=document.body.querySelector("#page-gtm-values .keyvals"),g=w?parseInt(w.getAttribute("data-content_cms_id"),10):null,O=window.location.pathname.includes("/preview/"),S=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=new Date((new Date).getTime()+864e5).toUTCString();document.cookie="".concat(h,"=1|").concat(e,"|").concat(encodeURIComponent(n),";path=/;max-age=").concat(m,";"),v(t?"Meter Reset Post Expiry Date":"Meter Reset Initial",{time_meter_count:1})},j=function(e){var t=function(e){var t,n,r=(t=e.split("|"),n=3,function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i,c,a=[],u=!0,l=!1;try{if(i=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=i.call(n)).done)&&(a.push(r.value),a.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return a}}(t,n)||p(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1],c=r[2];return{viewCount:parseInt(o,10),articleList:i.split(",").map((function(e){return parseInt(e,10)})),expiryDateStr:c}}(e),n=t.viewCount,r=t.articleList,o=t.expiryDateStr,i=r.includes(g)?y(r):[].concat(y(r),[g]);new Date>new Date(decodeURIComponent(o))?S(g,!0):function(e){var t=e.viewCount,n=e.articleList,r=e.expiryDateStr;document.cookie="".concat(h,"=").concat(t,"|").concat(n,"|").concat(r,";path=/;max-age=").concat(m,";")}({viewCount:n,articleList:i,expiryDateStr:o})};const P=function(){var e;document.dispatchEvent(new Event(f)),window.dispatchEvent(new CustomEvent("taas-datalayer-ready")),window[f]=!0,O||((e=r(h))?j(e):S(g)),document.dispatchEvent(new CustomEvent("meterCompleted",{detail:{meterWallType:void 0}})),window.meterCompleted=!0};function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function E(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?T(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):T(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}const D=function(e){var t;"metamask"===e&&(t=window.ethereum),function(e){e&&e.on("accountsChanged",(function(e){var t=function(e){return 0===e.length?"":e[0]}(e);t?(o("wallet_sub"),o("wallet_connect_progress"),window.location.reload()):function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];localStorage.removeItem(a),o("wallet_sub"),o("wallet_connect_progress"),e&&window.location.reload()}()}))}(t)};function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?L(Object(r),!0).forEach((function(n){t(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):L(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var I=function(e){e.addEventListener("click",(function(){o("TASLogin"),o("rft"),o("new_user"),o("blaize_jwt"),void 0!==window.dataLayer&&window.dataLayer.push({event:"TIME Login Event",eventCategory:"Registration",eventAction:"logout",eventLabel:""})}))},k=function(e,t){e.forEach((function(e){e&&(e.classList.remove("hidden","visible"),e.classList.add(t))}))},A=document.body.querySelector("header.navigation"),C=A.querySelectorAll(".signin-button"),x=A.querySelector(".account-dropdown"),U=A.querySelector(".account-mobile"),q=A.querySelector(".account-menu"),N=A.querySelectorAll(".print-sub-digital-link"),R=A.querySelector(".subscribe-link-container"),M=A.querySelector(".subscribe-flyout"),J=A.querySelector(".subscribe"),F=A.querySelectorAll(".signout-button"),G=A.querySelector(".component.connect-crypto-wallet");const H=function(e){if(!e)return k([U].concat(y(C),[R,M,J]),"visible"),e;var t=e.loggedIn,n=e.activeSubscription,r=e.role,o=e.partner,i=e.walletConnected,c=e.walletSubs,a=void 0===c?{role:"",partner:""}:c,u=a.role,l=a.partner,s=r&&(["TIM","DGT","BTH","BTF"].includes(r)||r.includes("time_dig")),f="TIMEPieceUser"===u&&"cryptoWallet"===l,d=void 0!==n,p=f&&!d||i&&!d,b=f&&d&&!1===n||i&&d&&!1===n;return"bulk"===r&&"nicklpass"===o||f?(k([].concat(y(C),[R,M,x,U,q]),"hidden"),f&&G&&G.classList.add("connected","visible"),e):(t&&d&&(k([x,U,q],"visible"),k([J],"hidden")),(t&&d&&!1===n||p||b)&&k([R,M,J],"visible"),t||k([].concat(y(C),[J]),"visible"),t&&F.forEach(I),t&&s&&k(N,"visible"),e)},$=function(e){var t,n=e.loggedIn,r=void 0!==n&&n,o=e.role,i=void 0===o?"anonymous":o,c=e.userId,a=void 0!==c&&c,u=e.walletSubs,l="TIMEPieceUser"===(null==u?void 0:u.role);return window.timeUser=e,t={timeTasUserid:a.toString(),timeUsertype:i,timeUserloginstatus:r.toString(),isTimePiecesUser:l.toString()},window.dataLayer=window.dataLayer||[],window.dataLayer.push(t),e};!function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=function(){var e=JSON.parse(localStorage.getItem(a)),t={currentProvider:"",isConnected:!1};if(e){var n=e.currentProvider,r=void 0===n?"":n,o=e.isConnected,i=void 0!==o&&o;t=c(c({},t),{},{currentProvider:r,isConnected:i})}return t}(),n=t.currentProvider,o=document.querySelector(".component.connect-crypto-wallet");"undefined"!=typeof localStorage&&null!==localStorage.getItem("lytics_segments")&&function(e,t,n,r){var o,i=" path=".concat("/"),c=new Date;c.setTime(c.getTime()+2592e6);var a=(o=c.toGMTString())?" expires=".concat(o,";"):"";document.cookie="".concat("is_lytics_mnou","=").concat(t,";").concat(a).concat(i)}(0,JSON.parse(localStorage.getItem("lytics_segments")).some((function(e){return"mnou"===e})));var i=function(){o.classList.toggle("opened")};o&&e&&(o.addEventListener("click",i),o.addEventListener("touch",i));var f,d=function(){var e={},t=r("t_b_sub"),n=r("new_user"),o=r("rft"),i=r("TASLogin"),c=r("wallet_sub");return(i||o||t||c)&&(e=E(E(E({token:i,refreshToken:o},n&&{newUser:n}),t&&{bulkSubToken:t}),c&&{walletSubToken:c})),e}();"{}"!==JSON.stringify(d)?(f=d,function(e){return function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e4;return new Promise((function(r,o){var i=new window.AbortController,c=i.signal,a=setTimeout((function(){var e=new Error("Request aborted or timed out.");e.name="TimeoutError",i.abort(),o(e)}),n);fetch(e,_(_({},t),{},{signal:c})).then((function(e){return clearTimeout(a),e.text().then((function(t){return{success:e.ok,text:t}}))})).then((function(e){var t=e.success,n=e.text;try{var i=JSON.parse(n);return t?r(i):o(i)}catch(e){return r(n)}})).catch((function(e){o(e)}))}))}("/authenticate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})}(f).then($).then(H).then(D(n))).catch((function(){return H(window.timeUser)})).finally(P):(function(e,t){var n,r,o=document.querySelector(".component.connect-crypto-wallet");o&&(e?(function(e,t){var n=e.querySelector(".dropdown-content__crypto-wallet-disconnect");"metamask"!==t&&n.classList.remove(u)}(o,t),s(o,e)):(s(o),n=o,r=window.location.pathname,["/connect-crypto-wallet/","/collection/timepieces-nft/"].includes(r)?n.classList.add(l):n.classList.add(u)))}(),H(window.timeUser),P())}()})()})();