/*!
 * @splidejs/splide-extension-auto-scroll
 * Version  : 0.5.2
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */(function(S){typeof define=="function"&&define.amd?define(S):S()})(function(){"use strict";function S(n){n.length=0}function D(n,t,e){return Array.prototype.slice.call(n,t,e)}function _(n){return n.bind.apply(n,[null].concat(D(arguments,1)))}function q(n){return requestAnimationFrame(n)}function V(n,t){return typeof t===n}var z=Array.isArray;_(V,"function"),_(V,"string"),_(V,"undefined");function B(n){return z(n)?n:[n]}function H(n,t){B(n).forEach(t)}var fn=Object.keys;function cn(n,t,e){if(n){var r=fn(n);r=e?r.reverse():r;for(var o=0;o<r.length;o++){var c=r[o];if(c!=="__proto__"&&t(n[c],c)===!1)break}}return n}function sn(n){return D(arguments,1).forEach(function(t){cn(t,function(e,r){n[r]=t[r]})}),n}var dn=Math.min;function vn(){var n=[];function t(u,s,a,d){o(u,s,function(f,l,v){var A="addEventListener"in f,b=A?f.removeEventListener.bind(f,l,a,d):f.removeListener.bind(f,a);A?f.addEventListener(l,a,d):f.addListener(a),n.push([f,l,v,a,b])})}function e(u,s,a){o(u,s,function(d,f,l){n=n.filter(function(v){return v[0]===d&&v[1]===f&&v[2]===l&&(!a||v[3]===a)?(v[4](),!1):!0})})}function r(u,s,a){var d,f=!0;return typeof CustomEvent=="function"?d=new CustomEvent(s,{bubbles:f,detail:a}):(d=document.createEvent("CustomEvent"),d.initCustomEvent(s,f,!1,a)),u.dispatchEvent(d),d}function o(u,s,a){H(u,function(d){d&&H(s,function(f){f.split(" ").forEach(function(l){var v=l.split(".");a(d,v[0],v[1])})})})}function c(){n.forEach(function(u){u[4]()}),S(n)}return{bind:t,unbind:e,dispatch:r,destroy:c}}var K="move",J="moved",ln="updated",Q="drag",En="dragged",U="scroll",Y="scrolled",pn="destroy";function mn(n){var t=n?n.event.bus:document.createDocumentFragment(),e=vn();function r(c,u){e.bind(t,B(c).join(" "),function(s){u.apply(u,z(s.detail)?s.detail:[])})}function o(c){e.dispatch(t,c,D(arguments,1))}return n&&n.event.on(pn,e.destroy),sn(e,{bus:t,on:r,off:_(e.unbind,t),emit:o})}function An(n,t,e,r){var o=Date.now,c,u=0,s,a=!0,d=0;function f(){if(!a){if(u=n?dn((o()-c)/n,1):1,e&&e(u),u>=1&&(t(),c=o(),r&&++d>=r))return v();q(f)}}function l(E){!E&&b(),c=o()-(E?u*n:0),a=!1,q(f)}function v(){a=!0}function A(){c=o(),u=0,e&&e(u)}function b(){s&&cancelAnimationFrame(s),u=0,s=0,a=!0}function M(E){n=E}function N(){return a}return{start:l,rewind:A,pause:v,cancel:b,set:M,isPaused:N}}var hn="is-active",yn="slide",bn="fade";function W(n,t,e){return Array.prototype.slice.call(n,t,e)}function $(n){return n.bind.apply(n,[null].concat(W(arguments,1)))}function L(n,t){return typeof t===n}function C(n){return!X(n)&&L("object",n)}var gn=Array.isArray;$(L,"function"),$(L,"string");var wn=$(L,"undefined");function X(n){return n===null}function Sn(n){return gn(n)?n:[n]}function O(n,t){Sn(n).forEach(t)}function _n(n,t,e){n&&O(t,function(r){r&&n.classList[e?"add":"remove"](r)})}var Ln=Object.keys;function Z(n,t,e){if(n){var r=Ln(n);r=e?r.reverse():r;for(var o=0;o<r.length;o++){var c=r[o];if(c!=="__proto__"&&t(n[c],c)===!1)break}}return n}function j(n){return W(arguments,1).forEach(function(t){Z(t,function(e,r){n[r]=t[r]})}),n}function On(n,t){O(n,function(e){O(t,function(r){e&&e.removeAttribute(r)})})}function k(n,t,e){C(t)?Z(t,function(r,o){k(n,o,r)}):O(n,function(r){X(e)||e===""?On(r,t):r.setAttribute(t,String(e))})}var nn=Math.min,tn=Math.max,Rn=Math.floor,Gn=Math.ceil,qn=Math.abs;function Tn(n,t,e){var r=nn(t,e),o=tn(t,e);return nn(tn(r,n),o)}var Dn={speed:1,autoStart:!0,pauseOnHover:!0,pauseOnFocus:!0},Vn={startScroll:"Start auto scroll",pauseScroll:"Pause auto scroll"};function $n(n,t,e){var r=mn(n),o=r.on,c=r.off,u=r.bind,s=r.unbind,a=t.Move,d=a.translate,f=a.getPosition,l=a.toIndex,v=a.getLimit,A=t.Controller,b=A.setIndex,M=A.getIndex,N=t.Direction.orient,E=t.Elements.toggle,rn=t.Live,I=n.root,m={},p,h,x,F,P,T;function Cn(){var i=e.autoScroll;m=j({},Dn,C(i)?i:{})}function en(){n.is(bn)||!p&&e.autoScroll!==!1&&(p=An(0,xn),Mn(),In())}function on(){p&&(p.cancel(),p=null,T=void 0,c([K,Q,U,J,Y]),s(I,"mouseenter mouseleave focusin focusout"),s(E,"click"))}function Mn(){m.pauseOnHover&&u(I,"mouseenter mouseleave",function(i){x=i.type==="mouseenter",R()}),m.pauseOnFocus&&u(I,"focusin focusout",function(i){F=i.type==="focusin",R()}),m.useToggleButton&&u(E,"click",function(){h?g():w()}),o(ln,Nn),o([K,Q,U],function(){P=!0,w(!1)}),o([J,En,Y],function(){P=!1,R()})}function Nn(){var i=e.autoScroll;i!==!1?(m=j({},m,C(i)?i:{}),en()):on(),p&&!wn(T)&&d(T)}function In(){m.autoStart&&(document.readyState==="complete"?g():u(window,"load",g))}function g(){G()&&(p.start(!0),rn.disable(!0),F=x=h=!1,un())}function w(i){i===void 0&&(i=!0),h||(h=i,un(),G()||(p.pause(),rn.disable(!1)))}function R(){h||(x||F||P?w(!1):g())}function xn(){var i=f(),y=Fn(i);i!==y?(d(y),Pn(T=f())):(w(!1),m.rewind&&n.go(0))}function Fn(i){var y=m.speed||1;return i+=N(y),n.is(yn)&&(i=Tn(i,v(!1),v(!0))),i}function Pn(i){var y=n.length,an=(l(i)+y)%y;an!==M()&&(b(an),t.Slides.update(),t.Pagination.update(),e.lazyLoad==="nearby"&&t.LazyLoad.check())}function un(){if(E){var i=h?"startScroll":"pauseScroll";_n(E,hn,!h),k(E,"aria-label",e.i18n[i]||Vn[i])}}function G(){return!p||p.isPaused()}return{setup:Cn,mount:en,destroy:on,play:g,pause:w,isPaused:G}}typeof window<"u"&&(window.splide=window.splide||{},window.splide.Extensions=window.splide.Extensions||{},window.splide.Extensions.AutoScroll=$n)});
