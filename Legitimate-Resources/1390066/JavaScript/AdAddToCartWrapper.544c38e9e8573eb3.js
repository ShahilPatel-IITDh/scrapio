(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[894],{94184:function(e,t){var r;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var u=i.apply(null,r);u&&e.push(u)}}else if("object"===o){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var s in r)n.call(r,s)&&r[s]&&e.push(s)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0!==(r=(function(){return i}).apply(t,[]))&&(e.exports=r)}()},53135:function(e,t,r){"use strict";r.d(t,{O:function(){return i}});var n=r(67294);function i(e=!1){let{0:t,1:r}=(0,n.useState)(e),i=(0,n.useCallback)(()=>r(e=>!e),[]);return[t,i]}},22020:function(e,t,r){"use strict";r.d(t,{o:function(){return l}});var n=r(19521),i=r(56947),o=r(20041),u=r(79087);let s=({size:e="md"})=>{switch(e){case"sm":return`
        font-size: ${i.font.size.text.small};
      `;case"md":return`
        font-size: ${i.font.size.text.medium};
        `;case"lg":return`
        font-size: ${i.font.size.text.base};
      `;default:return`
          font-size: ${i.font.size.text.medium};
        `}},l=(0,n.ZP)(u.Yd).withConfig({displayName:"styles__ButtonTertiary",componentId:"sc-1xye60r-0"})([""," ",";&:hover{","}&:active{","}&:disabled{",";&:hover{",";}}"],o.WU,s,o.A8,o.Pw,o.WU,o.WU)},40659:function(e,t,r){"use strict";r.d(t,{a:function(){return l}});var n=r(59499),i=r(85893),o=r(67294),u=r(47281);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}let l=(0,o.memo)(e=>(0,i.jsx)(u.J,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach(function(t){(0,n.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({_name:"Info",_src:"assets/glyph/Info.svg",_viewBox:"0 0 24 24"},e)))},55198:function(e,t,r){"use strict";r.d(t,{Bd:function(){return u},Ig:function(){return s},up:function(){return o},ur:function(){return i}});var n=r(75074);let i=e=>(0,n.IX)(e)?void 0:null==e?void 0:e.service_offering_providers,o=e=>{var t;return null===(t=i(e))||void 0===t?void 0:t[0]},u=e=>{var t,r,n;let[o]=null!==(t=i(e))&&void 0!==t?t:[];return(null==o?void 0:null===(r=o.service_offering_category)||void 0===r?void 0:r.toLowerCase())==="subscription"&&(null==o?void 0:null===(n=o.service_provider_name)||void 0===n?void 0:n.toLowerCase())==="microsoft"},s=e=>{var t;let r=o(e);return null==r?void 0:null===(t=r.fulfillment_info)||void 0===t?void 0:t.is_exclusive_fulfillment}},99058:function(e,t,r){"use strict";r.r(t),r.d(t,{AdAddToCartWrapper:function(){return l}});var n=r(19525),i=r(67294),o=r(93041),u=r(81982),s=r(85893);let l=()=>{var e;let{0:t,1:r}=(0,i.useState)(),l=(0,i.useRef)(null),c=e=>{var t,n,i;if(null!=e&&null!==(t=e.data)&&void 0!==t&&t.partnumber&&null!==(n=e.origin)&&void 0!==n&&n.includes("googlesyndication.com")&&l.current){e.stopImmediatePropagation(),e.preventDefault();let t=null===(i=e.data)||void 0===i?void 0:i.partnumber;r(t)}};return(0,i.useEffect)(()=>{var e;let n=null===(e=l.current)||void 0===e?void 0:e.querySelector("button");t&&n&&(n.click(),setTimeout(()=>r(void 0),0))},[t,null===(e=l.current)||void 0===e?void 0:e.firstChild]),(0,i.useEffect)(()=>(window.addEventListener("message",c,!1),()=>{window.removeEventListener("message",c,!1)}),[]),(0,s.jsx)("div",{ref:l,style:{display:"none"},children:(0,n.Z)(o.a,{overrideBehavior:u.TX.ENABLE_CHOOSE_OPTIONS_ONLY_MODE,tcin:t})})};l.displayName="AdAddToCartWrapper"}}]);