(this.webpackJsonp=this.webpackJsonp||[]).push([[700],{293:function(e,t,r){r("uGLJ"),r("5d5v"),e.exports=r("i7By")},"580c":function(e,t){var r={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"};e.exports=function(e){return"\\"+r[e]}},"5d5v":function(e,t,r){"use strict";r.r(t);var n=r("CMIT");Object(n.a)()},"7wPF":function(e,t){e.exports=/<%-([\s\S]+?)%>/g},"8RB9":function(e,t,r){var n=r("CR7L"),i=r("G/Sk");e.exports=function(e,t,r,o){var s=!r;r||(r={});for(var a=-1,c=t.length;++a<c;){var u=t[a],l=o?o(r[u],e[u],u,r,e):void 0;void 0===l&&(l=e[u]),s?i(r,u,l):n(r,u,l)}return r}},A4KP:function(e,t,r){var n=r("s2Ra"),i=r("T5M9"),o=r("m2qY"),s=i((function(e,t){try{return n(e,void 0,t)}catch(e){return o(e)?e:new Error(e)}}));e.exports=s},CMIT:function(e,t,r){"use strict";r.d(t,"a",(function(){return b})),r.d(t,"b",(function(){return p}));var n=r("6oy4"),i=r.n(n),o=r("IwtD"),s=r("ro1d"),a=r("lb6a"),c=r.n(a);class u{constructor(e,t){this.container=e,this.templates=t}renderTemplate(e,t){const r=document.querySelector(this.templates[e]).innerHTML,n=c()(r);this.container.html(n(t))}renderError(e){this.renderTemplate("error",{error_message:e.message(),error_name:e.errorName})}}var l=r("XVnd");class d{constructor(e,t,r,n,i){this.container=e,this.webauthnParams=Object(l.f)(JSON.parse(r.options)),this.renderInProgress=this.renderInProgress.bind(this),this.form=t,this.fallbackButton=n,this.fallbackUI=i,this.fallbackButton&&this.fallbackButton.addEventListener("click",this.switchToFallbackUI.bind(this)),this.flow=new u(e,{inProgress:"#js-authenticate-token-2fa-in-progress",error:"#js-authenticate-token-2fa-error",authenticated:"#js-authenticate-token-2fa-authenticated"}),this.container.on("click","#js-token-2fa-try-again",this.renderInProgress)}start(){Object(l.i)()?this.renderInProgress():this.switchToFallbackUI()}authenticate(){var e=this;navigator.credentials.get({publicKey:this.webauthnParams}).then((function(t){const r=Object(l.g)(t);e.renderAuthenticated(JSON.stringify(r))})).catch((function(t){e.flow.renderError(new s.a(t,o.t))}))}renderInProgress(){this.flow.renderTemplate("inProgress"),this.authenticate()}renderAuthenticated(e){this.flow.renderTemplate("authenticated");const t=this.container[0];t.querySelector("#js-device-response").value=e,t.querySelector(this.form).submit(),this.fallbackButton.classList.add("hidden")}switchToFallbackUI(){this.fallbackButton.classList.add("hidden"),this.container[0].classList.add("hidden"),this.fallbackUI.classList.remove("hidden")}}r("WmlO"),r("3R5X"),r("W9Nl");var h=r("t9l/");class f{constructor(e,t){this.container=e,this.renderInProgress=this.renderInProgress.bind(this),this.webauthnOptions=Object(l.d)(t.options),this.flow=new u(e,{message:"#js-register-2fa-message",setup:"#js-register-token-2fa-setup",error:"#js-register-token-2fa-error",registered:"#js-register-token-2fa-registered"}),this.container.on("click","#js-token-2fa-try-again",this.renderInProgress)}start(){Object(l.i)()?this.renderSetup():this.renderNotSupported(!Object(l.h)())}register(){var e=this;navigator.credentials.create({publicKey:this.webauthnOptions}).then((function(t){return e.renderRegistered(JSON.stringify(Object(l.e)(t)))})).catch((function(t){return e.flow.renderError(new s.a(t,o.v))}))}renderSetup(){this.flow.renderTemplate("setup"),this.container.find("#js-setup-token-2fa-device").on("click",this.renderInProgress)}renderInProgress(){return this.flow.renderTemplate("message",{message:Object(h.a)("Trying to communicate with your device. Plug it in (if needed) and press the button on the device now.")}),this.register()}renderRegistered(e){this.flow.renderTemplate("registered"),this.container.find("#js-device-response").val(e)}renderNotSupported(e){const t=e?Object(h.a)("WebAuthn only works with HTTPS-enabled websites. Contact your administrator for more details."):Object(h.a)("Your browser doesn't support WebAuthn. Please use a supported browser, e.g. Chrome (67+) or Firefox (60+).");this.flow.renderTemplate("message",{message:t})}}const b=function(){!function(){if(!gon.webauthn)return;new d(i()("#js-authenticate-token-2fa"),"#js-login-token-2fa-form",gon.webauthn,document.querySelector("#js-login-2fa-device"),document.querySelector(".js-2fa-form")).start()}()},p=function(){!function(){const e=i()("#js-register-token-2fa");if(!e.length)return;new f(e,gon.webauthn).start()}()}},IwtD:function(e,t,r){"use strict";r.d(t,"a",(function(){return o})),r.d(t,"b",(function(){return s})),r.d(t,"c",(function(){return a})),r.d(t,"d",(function(){return c})),r.d(t,"e",(function(){return u})),r.d(t,"f",(function(){return l})),r.d(t,"g",(function(){return d})),r.d(t,"h",(function(){return h})),r.d(t,"i",(function(){return f})),r.d(t,"j",(function(){return b})),r.d(t,"k",(function(){return p})),r.d(t,"l",(function(){return m})),r.d(t,"m",(function(){return g})),r.d(t,"n",(function(){return v})),r.d(t,"o",(function(){return w})),r.d(t,"p",(function(){return j})),r.d(t,"q",(function(){return y})),r.d(t,"r",(function(){return O})),r.d(t,"s",(function(){return _})),r.d(t,"t",(function(){return k})),r.d(t,"v",(function(){return S})),r.d(t,"u",(function(){return T}));var n=r("t9l/"),i=r("mcoW");const o=Object(n.a)("Register device"),s=Object(n.a)("Set up new device"),a=Object(n.a)("Try again?"),c=Object(n.a)("Device name"),u=Object(n.a)("Excluding USB security keys, you should include the browser name together with the device name."),l=Object(n.a)("Macbook Touch ID on Edge"),d=Object(n.a)("WebAuthn only works with HTTPS-enabled websites. Contact your administrator for more details."),h=Object(n.a)("Your browser doesn't support WebAuthn. Please use a supported browser, e.g. Chrome (67+) or Firefox (60+)."),f=Object(n.a)("Your device needs to be set up. Plug it in (if needed) and click the button on the left."),b=Object(n.a)("You must save your recovery codes after you first register a two-factor authenticator, so you do not lose access to your account. %{linkStart}See the documentation on managing your WebAuthn device for more information.%{linkEnd}"),p=Object(n.a)("Current password"),m=Object(n.a)("Your current password is required to register a new device."),g=Object(n.a)("Your device was successfully set up! Give it a name and register it with the GitLab server."),v=Object(n.a)("Trying to communicate with your device. Plug it in (if needed) and press the button on the device now."),w="error",j="ready",y="success",O="unsupported",_="waiting",k="authenticate",S="register",T=Object(i.a)("user/profile/account/two_factor_authentication",{anchor:"set-up-a-webauthn-device"})},VVgp:function(e,t,r){var n=r("A1CF"),i={escape:r("7wPF"),evaluate:r("ejHb"),interpolate:r("h1XE"),variable:"",imports:{_:{escape:n}}};e.exports=i},"Vp/X":function(e,t,r){"use strict";r("uHfJ"),r("R0RX");var n=r("q+nE"),i=r("oj/M"),o=r("Q04j"),s=r("JmT7"),a={name:"DismissibleAlert",components:{GlAlert:o.a},directives:{SafeHtml:s.a},props:{html:{type:String,required:!1,default:""}},data:()=>({isDismissed:!1}),methods:{dismiss(){this.isDismissed=!0,this.$emit("alertDismissed")}}},c=r("bPvS"),u=Object(c.a)(a,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.isDismissed?e._e():r("gl-alert",e._g(e._b({on:{dismiss:e.dismiss}},"gl-alert",e.$attrs,!1),e.$listeners),[r("div",{directives:[{name:"safe-html",rawName:"v-safe-html",value:e.html,expression:"html"}]})])}),[],!1,null,null,null).exports;const l=function(e){const t=Number(e);return!e||Number.isNaN(t)?30:t},d=function(e){const t={html:e.innerHTML},r={...e.dataset,dismissible:Object(i.E)(e.dataset.dismissible)},{dismissCookieName:o,dismissCookieExpire:s}=e.dataset;return new n.default({el:e,render:e=>e(u,{props:t,attrs:r,on:{alertDismissed(){o&&Object(i.K)(o,!0,{expires:l(s)})}}})})};t.a=function(){return[...document.querySelectorAll(".js-vue-alert")].map(d)}},"YOf/":function(e,t,r){var n=r("79w4"),i=Object.prototype,o=i.hasOwnProperty;e.exports=function(e,t,r,s){return void 0===e||n(e,i[r])&&!o.call(s,r)?t:e}},ZTWp:function(e,t,r){var n=r("T5M9"),i=r("kTp2");e.exports=function(e){return n((function(t,r){var n=-1,o=r.length,s=o>1?r[o-1]:void 0,a=o>2?r[2]:void 0;for(s=e.length>3&&"function"==typeof s?(o--,s):void 0,a&&i(r[0],r[1],a)&&(s=o<3?void 0:s,o=1),t=Object(t);++n<o;){var c=r[n];c&&e(t,c,n,s)}return t}))}},ejHb:function(e,t){e.exports=/<%([\s\S]+?)%>/g},h1XE:function(e,t){e.exports=/<%=([\s\S]+?)%>/g},hnH5:function(e,t,r){var n=r("8RB9"),i=r("ZTWp"),o=r("LrAm"),s=i((function(e,t,r,i){n(t,o(t),e,i)}));e.exports=s},i7By:function(e,t,r){"use strict";r.r(t);var n=r("6oy4"),i=r.n(n),o=r("Vp/X"),s=r("rhpH"),a=r("3PJK"),c=r("2Yyc"),u=r("yYHy");var l=r("xqp2");new(r("YPPw").a),new c.a,new class{constructor(){let{currentTabKey:e="current_signin_tab",tabSelector:t="ul.new-session-tabs"}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.currentTabKey=e,this.tabSelector=t,this.isLocalStorageAvailable=l.a.canUseLocalStorage(),window.location.hash&&this.saveData(window.location.hash),this.bootstrap()}bootstrap(){var e=this;const t=document.querySelectorAll(this.tabSelector);t.length>0&&t[0].addEventListener("click",(function(t){if(t.target&&"A"===t.target.nodeName){const r=t.target.getAttribute("href");e.saveData(r)}})),this.showTab()}showTab(){const e=this.readData();if(e){const t=document.querySelector(`${this.tabSelector} a[href="${e}"]`);if(t)t.click();else{const e=document.querySelector(this.tabSelector+" a");e&&e.click()}}}saveData(e){if(this.isLocalStorageAvailable)return window.localStorage.setItem(this.currentTabKey,e)}readData(){return this.isLocalStorageAvailable?window.localStorage.getItem(this.currentTabKey):null}},new s.a,new class{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.container=e.container||""}bindEvents(){i()("#remember_me",this.container).on("click",this.toggleRememberMe)}toggleRememberMe(e){const t=i()(e.target).is(":checked");i()(".js-oauth-login",this.container).each((function(e,r){const n=i()(r).parent("form"),o=n.attr("action");t?n.attr("action",Object(u.z)({remember_me:1},o)):n.attr("action",Object(u.H)(["remember_me"],o))}))}}({container:i()(".omniauth-container")}).bindEvents(),function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";if(e){const t=e.replace(/^#/,""),r=document.querySelectorAll("#signin-container .tab-content form");Array.prototype.forEach.call(r,(function(e){const r=Object(u.K)(e.getAttribute("action"),"#"+t);e.setAttribute("action",r)}));const n=document.querySelectorAll("#signin-container .omniauth-container form");Array.prototype.forEach.call(n,(function(e){const r=Object(u.z)({redirect_fragment:t},e.getAttribute("action"));e.setAttribute("action",r)}))}}(window.location.hash),Object(o.a)(),Object(a.a)()},lb6a:function(e,t,r){var n=r("hnH5"),i=r("A4KP"),o=r("0fyf"),s=r("YOf/"),a=r("580c"),c=r("m2qY"),u=r("kTp2"),l=r("x/yk"),d=r("h1XE"),h=r("VVgp"),f=r("MfoV"),b=/\b__p \+= '';/g,p=/\b(__p \+=) '' \+/g,m=/(__e\(.*?\)|\b__t\)) \+\n'';/g,g=/[()=,{}\[\]\/\s]/,v=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,w=/($^)/,j=/['\n\r\u2028\u2029\\]/g,y=Object.prototype.hasOwnProperty;e.exports=function(e,t,r){var O=h.imports._.templateSettings||h;r&&u(e,t,r)&&(t=void 0),e=f(e),t=n({},t,O,s);var _,k,S=n({},t.imports,O.imports,s),T=l(S),P=o(S,T),A=0,E=t.interpolate||w,I="__p += '",x=RegExp((t.escape||w).source+"|"+E.source+"|"+(E===d?v:w).source+"|"+(t.evaluate||w).source+"|$","g"),q=y.call(t,"sourceURL")?"//# sourceURL="+(t.sourceURL+"").replace(/\s/g," ")+"\n":"";e.replace(x,(function(t,r,n,i,o,s){return n||(n=i),I+=e.slice(A,s).replace(j,a),r&&(_=!0,I+="' +\n__e("+r+") +\n'"),o&&(k=!0,I+="';\n"+o+";\n__p += '"),n&&(I+="' +\n((__t = ("+n+")) == null ? '' : __t) +\n'"),A=s+t.length,t})),I+="';\n";var D=y.call(t,"variable")&&t.variable;if(D){if(g.test(D))throw new Error("Invalid `variable` option passed into `_.template`")}else I="with (obj) {\n"+I+"\n}\n";I=(k?I.replace(b,""):I).replace(p,"$1").replace(m,"$1;"),I="function("+(D||"obj")+") {\n"+(D?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(_?", __e = _.escape":"")+(k?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+I+"return __p\n}";var L=i((function(){return Function(T,q+"return "+I).apply(void 0,P)}));if(L.source=I,c(L))throw L;return L}},m2qY:function(e,t,r){var n=r("DVqJ"),i=r("cgqb"),o=r("Zqnx");e.exports=function(e){if(!i(e))return!1;var t=n(e);return"[object Error]"==t||"[object DOMException]"==t||"string"==typeof e.message&&"string"==typeof e.name&&!o(e)}},ro1d:function(e,t,r){"use strict";r.d(t,"a",(function(){return s}));var n=r("t9l/"),i=r("IwtD"),o=r("XVnd");class s{constructor(e,t){this.error=e,this.errorName=e.name||"UnknownError",this.message=this.message.bind(this),this.httpsDisabled=!Object(o.h)(),this.flowType=t}message(){return"NotSupportedError"===this.errorName?Object(n.a)("Your device is not compatible with GitLab. Please try another device"):"InvalidStateError"===this.errorName&&this.flowType===i.t?Object(n.a)("This device has not been registered with us."):"InvalidStateError"===this.errorName&&this.flowType===i.v?Object(n.a)("This device has already been registered with us."):"SecurityError"===this.errorName&&this.httpsDisabled?Object(n.a)("WebAuthn only works with HTTPS-enabled websites. Contact your administrator for more details."):Object(n.a)("There was a problem communicating with your device.")}}}},[[293,1,0,168]]]);
//# sourceMappingURL=pages.sessions.new.bbb40795.chunk.js.map