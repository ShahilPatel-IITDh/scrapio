(self.webpackChunk=self.webpackChunk||[]).push([["ally-core.modal.v1.build"],{"./ally-core/clientlibs/core/v2/src/js/modal/constants.js":(e,s,t)=>{"use strict";t.d(s,{BT:()=>n,C7:()=>a,FP:()=>r,Fh:()=>c,On:()=>o,TG:()=>i,Xc:()=>l,al:()=>d,ot:()=>u});const l="allysf",o="-hide",i="-in",n="allysf-modal-layer",c="allysf-modal-wrap",a="modalLayer",d={history:[],isModalOpen:!1},r={CLOSE:"modal.close",CLOSED:"modal.closed",INITIALIZED:"modal.initialized",OPEN:"modal.open",OPENED:"modal.opened"},u=/googlebot|bingbot/gi},"./ally-core/components/structure/modal/v1/modal/clientlibs/src/index.js":(e,s,t)=>{"use strict";var l=t("./ally-core/clientlibs/utils/js/component/index.js");t("./ally-core/components/structure/modal/v1/modal/clientlibs/src/scss/component.scss");const o="Structure",i="Modal",n=`ALLYSF ${o}/${i}:`,c="allysf-modal-v1-close";var a=t("./ally-core/clientlibs/core/v2/src/js/modal/constants.js"),d=t("../../../../../node_modules/@allysf/logger/dist/logger.build.js"),r=t("./ally-core/clientlibs/utils/js/a11y/getfocusable.js");class u extends l.wA{constructor(e){super(e,i,"v1"),[this.closeBtn]=e.getElementsByClassName(c),this.init()}setFocus(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;const s=(0,r.GO)(this.el,!0);if(s.length)s[e].focus();else{const s=`${n} No focusable elements to focus`;(0,d.LOGROCKET)(s,this.lrTags,{component:this,index:e}),(0,d.WARN)(s)}}trapFocus(e){const s=e.keyCode||e.which,t=e.shiftKey,l=(0,r.GO)(this.el,!0);if(9!==s)return;const o=l.length;t&&document.activeElement===l[0]?(e.preventDefault(),this.setFocus(o-1)):(t&&document.activeElement===l[1]||!t&&document.activeElement===l[o-1])&&(e.preventDefault(),this.setFocus(0))}handleClick(e){e.preventDefault(),window.ALLYSF("publish",a.FP.CLOSE,{triggerOverride:this.closeBtn})}init(){if(this.closeBtn)this.closeBtn.addEventListener("click",this.handleClick.bind(this)),this.closeBtn.addEventListener("keydown",this.trapFocus.bind(this));else{const e=(0,r.GO)(this.el,!0);if(e.length){e[e.length-1].addEventListener("keydown",this.trapFocus.bind(this))}}requestAnimationFrame((()=>{const e=(0,r.GO)(this.el,!0),s=e.length;if(s){if(e[0].addEventListener("keydown",this.trapFocus.bind(this)),s>2){e[1].addEventListener("keydown",this.trapFocus.bind(this))}}})),this.el.addEventListener("click",(e=>e.stopPropagation())),window.ALLYSF("publish",a.FP.INITIALIZED,{element:this.el}),window.ALLYSF("subscribe",a.FP.OPENED,{callback:this.setFocus.bind(this,void 0)})}}(0,l.xp)({group:o,name:i,version:"v1",class:u})},"./ally-core/components/structure/modal/v1/modal/clientlibs/src/scss/component.scss":e=>{e.exports={PHONE_MAX:"640",TABLET_MAX:"1024",DESKTOP_MAX:"1172"}}},e=>{e.O(0,["allysf.build"],(()=>{return s="./ally-core/components/structure/modal/v1/modal/clientlibs/src/index.js",e(e.s=s);var s}));e.O()}]);