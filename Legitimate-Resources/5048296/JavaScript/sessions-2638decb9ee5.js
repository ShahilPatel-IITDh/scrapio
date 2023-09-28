"use strict";(globalThis.webpackChunk=globalThis.webpackChunk||[]).push([["sessions"],{67404:(e,t,n)=>{function o(e){return r(e)[0]}function r(e){let t=[];for(let n of i()){let[o,r]=n.trim().split("=");e===o&&void 0!==r&&t.push({key:o,value:r})}return t}function i(){try{return document.cookie.split(";")}catch{return[]}}function a(e,t,n=null,o=!1,r="lax"){let i=document.domain;if(null==i)throw Error("Unable to get document domain");i.endsWith(".github.com")&&(i="github.com");let a="https:"===location.protocol?"; secure":"",s=n?`; expires=${n}`:"";!1===o&&(i=`.${i}`);try{document.cookie=`${e}=${t}; path=/; domain=${i}${s}${a}; samesite=${r}`}catch{}}function s(e,t=!1){let n=document.domain;if(null==n)throw Error("Unable to get document domain");n.endsWith(".github.com")&&(n="github.com");let o=new Date().getTime(),r=new Date(o-1).toUTCString(),i="https:"===location.protocol?"; secure":"",a=`; expires=${r}`;!1===t&&(n=`.${n}`);try{document.cookie=`${e}=''; path=/; domain=${n}${a}${i}`}catch{}}n.d(t,{$1:()=>r,d8:()=>a,ej:()=>o,kT:()=>s})},254:(e,t,n)=>{n.d(t,{ZG:()=>s,q6:()=>c,w4:()=>u});var o=n(8439);let r=!1,i=new o.Z;function a(e){let t=e.target;if(t instanceof HTMLElement&&t.nodeType!==Node.DOCUMENT_NODE)for(let e of i.matches(t))e.data.call(null,t)}function s(e,t){r||(r=!0,document.addEventListener("focus",a,!0)),i.add(e,t),document.activeElement instanceof HTMLElement&&document.activeElement.matches(e)&&t(document.activeElement)}function u(e,t,n){function o(t){let r=t.currentTarget;r&&(r.removeEventListener(e,n),r.removeEventListener("blur",o))}s(t,function(t){t.addEventListener(e,n),t.addEventListener("blur",o)})}function c(e,t){function n(e){let{currentTarget:o}=e;o&&(o.removeEventListener("input",t),o.removeEventListener("blur",n))}s(e,function(e){e.addEventListener("input",t),e.addEventListener("blur",n)})}},96056:(e,t,n)=>{n.d(t,{Hu:()=>p,_8:()=>c,cj:()=>u});var o=n(69567),r=n(36071);let i="github-mobile-auth-flash";function a(e){let t=new o.R(document.querySelector("template.js-flash-template"),{className:`flash-error ${i}`,message:e}),n=document.importNode(t,!0),r=document.querySelector("#js-flash-container");r&&(s(),r.appendChild(n))}function s(){let e=document.querySelector("#js-flash-container");if(e)for(let t of e.children)!t.classList.contains("js-flash-template")&&t.classList.contains(i)&&e.removeChild(t)}function u(){let e=document.getElementById("github-mobile-authenticate-prompt");e&&(e.hidden=!0);let t=document.getElementById("github-mobile-authenticate-error-and-retry");t&&(t.hidden=!1)}function c(){s();let e=document.getElementById("github-mobile-authenticate-prompt");e&&(e.hidden=!1);let t=document.getElementById("github-mobile-authenticate-error-and-retry");t&&(t.hidden=!0)}function l(e){let t;(t=e?new URL(`password_reset/${encodeURIComponent(e)}`,window.location.origin):new URL("",window.location.href)).searchParams.set("redirect","true"),window.location.assign(t)}function d(){document.getElementById("github-mobile-rejected-redirect").click()}function m(e){e&&a(e),u()}function f(e){return document.getElementById("github-mobile-authenticate-error-and-retry").getAttribute(e)}function h(e,t,n,o){return async function r(i){let a,s;if(o&&o())return;let u="STATUS_UNKNOWN";try{let t=document.getElementById("github-mobile-authenticate-form"),n=t.querySelector(".js-data-url-csrf"),o=await self.fetch(new Request(e,{method:"POST",body:new FormData(t),mode:"same-origin",headers:{Accept:"application/json","Scoped-CSRF-Token":n.value,"X-Requested-With":"XMLHttpRequest"}}));if(o.ok){let e=await o.json();u=e.status,a=e.token}else u="STATUS_ERROR"}catch{u="STATUS_ERROR"}switch(u){case"STATUS_APPROVED":return t?t():l(a);case"STATUS_EXPIRED":return s=f("timeout-flash"),n?n(s):m(s);case"STATUS_ACTIVE":case"STATUS_ERROR":case"STATUS_UNKNOWN":break;case"STATUS_REJECTED":return s=f("error-flash"),n?n(s):d();default:return s=f("error-flash"),n?n(s):m(s)}await new Promise(e=>setTimeout(e,3e3)),r(i)}(0)}async function p(e,t,n,o){try{await h(e.getAttribute("data-poll-url"),t,n,o)}catch(t){let e=f("error-flash");return m(e)}}(0,r.N7)(".js-poll-github-mobile-two-factor-authenticate",function(e){p(e)}),(0,r.N7)(".js-poll-github-mobile-verified-device-authenticate",function(e){p(e)}),(0,r.N7)(".js-poll-github-mobile-two-factor-password-reset-authenticate",function(e){p(e)})},98576:(e,t,n)=>{n.d(t,{C:()=>a,v:()=>s});var o=n(254),r=n(65935),i=n(58700);function a(){document.body.classList.add("is-sending"),document.body.classList.remove("is-sent","is-not-sent")}function s(){document.body.classList.add("is-sent"),document.body.classList.remove("is-sending")}function u(e){e&&(document.querySelector(".js-sms-error").textContent=e),document.body.classList.add("is-not-sent"),document.body.classList.remove("is-sending")}(0,r.AC)(".js-send-auth-code",async(e,t)=>{let n;a();try{n=await t.text()}catch(e){u(e.response.text)}n&&s()}),(0,r.AC)(".js-two-factor-set-sms-fallback",async(e,t)=>{let n;try{n=await t.text()}catch(i){let t=e.querySelector(".js-configure-sms-fallback"),n=e.querySelector(".js-verify-sms-fallback"),o=t.hidden?n:t,r=o.querySelector(".flash");switch(i.response.status){case 404:case 422:case 429:r.textContent=JSON.parse(i.response.text).error,r.hidden=!1}}if(n)switch(n.status){case 200:case 201:window.location.reload();break;case 202:e.querySelector(".js-configure-sms-fallback").hidden=!0,e.querySelector(".js-verify-sms-fallback").hidden=!1,e.querySelector(".js-fallback-otp").focus()}}),(0,o.q6)(".js-verification-code-input-auto-submit",function(e){let t=e.currentTarget,n=t.pattern||"[0-9]{6}";RegExp(`^(${n})$`).test(t.value)&&(0,i.Bt)(t.form)})},63047:(e,t,n)=>{n.d(t,{T:()=>r,k:()=>i});var o=n(8433);function r(){return(0,o.Zh)()?"supported":"unsupported"}async function i(){return await window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable()?"supported":"unsupported"}},5760:(e,t,n)=>{var o=n(67404),r=n(36071);(0,r.N7)(".js-transform-notice",{constructor:HTMLElement,add(e){let t=(0,o.$1)("org_transform_notice");for(let n of t){let t=document.createElement("span");try{t.textContent=atob(decodeURIComponent(n.value)),(0,o.kT)(n.key),e.appendChild(t),e.hidden=!1}catch(e){}return}}});var i=n(98576),a=n(96056),s=n(63047),u=n(8433),c=n(58700);let l=new AbortController;async function d(){let e=await (0,s.k)(),t=document.querySelector(".js-conditional-webauthn-placeholder"),n=await globalThis.PublicKeyCredential?.isConditionalMediationAvailable?.();if(t&&n&&"supported"===e){document.querySelector("#login_field")?.setAttribute("autocomplete","username webauthn");let e=t.getAttribute("data-webauthn-sign-request");if(!e)return;let n=document.querySelector("webauthn-get");n&&n.addEventListener("webauthn-get-prompt",()=>{l.abort()});let o=JSON.parse(e),r=(0,u.wz)(o);r.signal=l.signal;let i=await (0,u.U2)(r),a=t.querySelector(".js-conditional-webauthn-response");a.value=JSON.stringify(i),(0,c.Bt)(t)}}(0,r.N7)(".js-webauthn-support",{constructor:HTMLInputElement,add(e){(0,c.Se)(e,(0,s.T)())}}),(0,r.N7)(".js-webauthn-iuvpaa-support",{constructor:HTMLInputElement,async add(e){(0,c.Se)(e,await (0,s.k)())}}),(0,r.N7)(".js-support",{constructor:HTMLInputElement,async add(e){(0,c.Se)(e,"true")}}),(0,r.N7)(".js-conditional-webauthn-placeholder",function(){d()});var m=n(254),f=n(53729);let h=window.location.hostname.split(".")[0];(0,m.q6)(".js-login-field",function(e){let t=e.target,n=t.closest("form");if(!n)return;let o=n.querySelector(".js-password-field"),r=n.querySelector(".js-sign-in-button");if(!o||!r)return;let i=t.value;!(!(0,f.ko)()&&i.includes("_"))||i.includes("@")||["pj_nitin","up_the_irons"].includes(i)||i.endsWith("_admin")||r.getAttribute("development")&&(i.endsWith("_fab")||"github"!==h)?(o.removeAttribute("disabled"),r.value=r.getAttribute("data-signin-label")||" "):(o.setAttribute("disabled","true"),r.value=r.getAttribute("data-sso-label")||" ")})},58700:(e,t,n)=>{n.d(t,{Bt:()=>i,DN:()=>u,KL:()=>d,Se:()=>s,qC:()=>m,sw:()=>c});var o=n(5582);function r(e,t,n){return e.dispatchEvent(new CustomEvent(t,{bubbles:!0,cancelable:n}))}function i(e,t){t&&(a(e,t),(0,o.j)(t)),r(e,"submit",!0)&&e.submit()}function a(e,t){if(!(e instanceof HTMLFormElement))throw TypeError("The specified element is not of type HTMLFormElement.");if(!(t instanceof HTMLElement))throw TypeError("The specified element is not of type HTMLElement.");if("submit"!==t.type)throw TypeError("The specified element is not a submit button.");if(!e||e!==t.form)throw Error("The specified element is not owned by the form element.")}function s(e,t){if("boolean"==typeof t){if(e instanceof HTMLInputElement)e.checked=t;else throw TypeError("only checkboxes can be set to boolean value")}else{if("checkbox"===e.type)throw TypeError("checkbox can't be set to string value");e.value=t}r(e,"change",!1)}function u(e,t){for(let n in t){let o=t[n],r=e.elements.namedItem(n);r instanceof HTMLInputElement?r.value=o:r instanceof HTMLTextAreaElement&&(r.value=o)}}function c(e){if(!(e instanceof HTMLElement))return!1;let t=e.nodeName.toLowerCase(),n=(e.getAttribute("type")||"").toLowerCase();return"select"===t||"textarea"===t||"input"===t&&"submit"!==n&&"reset"!==n||e.isContentEditable}function l(e){return new URLSearchParams(e)}function d(e,t){let n=new URLSearchParams(e.search),o=l(t);for(let[e,t]of o)n.append(e,t);return n.toString()}function m(e){return l(new FormData(e)).toString()}},5582:(e,t,n)=>{function o(e){let t=e.closest("form");if(!(t instanceof HTMLFormElement))return;let n=r(t);if(e.name){let o=e.matches("input[type=submit]")?"Submit":"",r=e.value||o;n||((n=document.createElement("input")).type="hidden",n.classList.add("js-submit-button-value"),t.prepend(n)),n.name=e.name,n.value=r}else n&&n.remove()}function r(e){let t=e.querySelector("input.js-submit-button-value");return t instanceof HTMLInputElement?t:null}n.d(t,{j:()=>o,u:()=>r})},53729:(e,t,n)=>{n.d(t,{A7:()=>d,ko:()=>c,q1:()=>s});var o=n(15205),r=n(86283);let i=(0,o.Z)(a);function a(){return r.n4?.head?.querySelector('meta[name="runtime-environment"]')?.content||""}let s=(0,o.Z)(u);function u(){return r.n4?.head?.querySelector('meta[name="is-private-instance"]')?.content==="true"}let c=(0,o.Z)(l);function l(){return"enterprise"===i()}let d="webpack"},86283:(e,t,n)=>{n.d(t,{Qg:()=>o.Qg,W6:()=>o.W6,cF:()=>o.cF,iG:()=>r.iG,jX:()=>r.jX,n4:()=>r.n4,zu:()=>r.zu});var o=n(35647),r=n(73614)},73614:(e,t,n)=>{n.d(t,{iG:()=>r,jX:()=>a,n4:()=>o,zu:()=>i});let o="undefined"==typeof document?void 0:document,r="undefined"==typeof window?void 0:window,i="undefined"==typeof history?void 0:history,a="undefined"==typeof location?{pathname:"",origin:"",search:"",hash:""}:location},35647:(e,t,n)=>{n.d(t,{Qg:()=>i,W6:()=>r,cF:()=>a});var o=n(73614);let r=void 0===o.n4,i=!r;function a(){return!!r||Boolean(o.n4.querySelector('react-app[data-ssr="true"]'))}}},e=>{var t=t=>e(e.s=t);e.O(0,["vendors-node_modules_github_selector-observer_dist_index_esm_js","vendors-node_modules_github_remote-form_dist_index_js-node_modules_github_memoize_dist_esm_in-687f35"],()=>t(5760));var n=e.O()}]);
//# sourceMappingURL=sessions-e9cb32440c1a.js.map