(window.webpackJsonpDelete=window.webpackJsonpDelete||[]).push([[136],{1429:function(e,t,r){"use strict";r.r(t),r.d(t,"ModalTriggerComponent",(function(){return p}));var n=r(2),o=(r(20),r(125)),i=r(15),s=r(10);function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class h extends n.a{constructor(e,t){super(e),a(this,"onClick",e=>{this.open(),e.preventDefault()}),this.modal=null,this.options=l(l({},this.options),t),this.addListener(this.element,"click",this.onClick)}static getNamespace(){return"modal-trigger"}onInit(){}onDestroy(){this.modal&&(this.modal.destroy(),this.modal=null)}open(){this.isOpenning||(this.isOpenning=!0,this.getModal().then(e=>{try{e.open(),this.isOpenning=!1}catch(e){console.log(e)}}).catch(e=>{this.isOpenning=!1,console.log(e)}))}getModal(){return this.modal?Promise.resolve(this.modal):this.getTarget().then(e=>{try{const t=()=>Object(i.a)(s.a.siteSection,this.options.action||"Click Close",s.a.pageName);return this.modal=o.a.create(e,l(l({},this.options),{},{onClose:t})),this.modal}catch(e){return Promise.reject(e)}}).catch(e=>Promise.reject(e))}getAsyncTargetUrl(){return this.element.getAttribute("href")||this.getChildAttribute(this.element,"href")}getTarget(){if(this.options.content)return Promise.resolve(this.options.content);if(this.options.targetSelector){const e=document.querySelector(this.options.targetSelector);return Promise.resolve(e)}return console.error("Modal Trigger has no content"),Promise.resolve(null)}}var p=h;n.b.register(p)}}]);