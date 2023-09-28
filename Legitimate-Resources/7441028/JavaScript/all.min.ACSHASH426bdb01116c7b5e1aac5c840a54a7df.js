/*
 Copyright (C) Federico Zivolo 2018
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */(function(e,t){'object'==typeof exports&&'undefined'!=typeof module?module.exports=t():'function'==typeof define&&define.amd?define(t):e.Popper=t()})(this,function(){'use strict';function e(e){return e&&'[object Function]'==={}.toString.call(e)}function t(e,t){if(1!==e.nodeType)return[];var o=getComputedStyle(e,null);return t?o[t]:o}function o(e){return'HTML'===e.nodeName?e:e.parentNode||e.host}function n(e){if(!e)return document.body;switch(e.nodeName){case'HTML':case'BODY':return e.ownerDocument.body;case'#document':return e.body;}var i=t(e),r=i.overflow,p=i.overflowX,s=i.overflowY;return /(auto|scroll|overlay)/.test(r+s+p)?e:n(o(e))}function r(e){return 11===e?re:10===e?pe:re||pe}function p(e){if(!e)return document.documentElement;for(var o=r(10)?document.body:null,n=e.offsetParent;n===o&&e.nextElementSibling;)n=(e=e.nextElementSibling).offsetParent;var i=n&&n.nodeName;return i&&'BODY'!==i&&'HTML'!==i?-1!==['TD','TABLE'].indexOf(n.nodeName)&&'static'===t(n,'position')?p(n):n:e?e.ownerDocument.documentElement:document.documentElement}function s(e){var t=e.nodeName;return'BODY'!==t&&('HTML'===t||p(e.firstElementChild)===e)}function d(e){return null===e.parentNode?e:d(e.parentNode)}function a(e,t){if(!e||!e.nodeType||!t||!t.nodeType)return document.documentElement;var o=e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING,n=o?e:t,i=o?t:e,r=document.createRange();r.setStart(n,0),r.setEnd(i,0);var l=r.commonAncestorContainer;if(e!==l&&t!==l||n.contains(i))return s(l)?l:p(l);var f=d(e);return f.host?a(f.host,t):a(e,d(t).host)}function l(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:'top',o='top'===t?'scrollTop':'scrollLeft',n=e.nodeName;if('BODY'===n||'HTML'===n){var i=e.ownerDocument.documentElement,r=e.ownerDocument.scrollingElement||i;return r[o]}return e[o]}function f(e,t){var o=2<arguments.length&&void 0!==arguments[2]&&arguments[2],n=l(t,'top'),i=l(t,'left'),r=o?-1:1;return e.top+=n*r,e.bottom+=n*r,e.left+=i*r,e.right+=i*r,e}function m(e,t){var o='x'===t?'Left':'Top',n='Left'==o?'Right':'Bottom';return parseFloat(e['border'+o+'Width'],10)+parseFloat(e['border'+n+'Width'],10)}function h(e,t,o,n){return $(t['offset'+e],t['scroll'+e],o['client'+e],o['offset'+e],o['scroll'+e],r(10)?o['offset'+e]+n['margin'+('Height'===e?'Top':'Left')]+n['margin'+('Height'===e?'Bottom':'Right')]:0)}function c(){var e=document.body,t=document.documentElement,o=r(10)&&getComputedStyle(t);return{height:h('Height',e,t,o),width:h('Width',e,t,o)}}function g(e){return le({},e,{right:e.left+e.width,bottom:e.top+e.height})}function u(e){var o={};try{if(r(10)){o=e.getBoundingClientRect();var n=l(e,'top'),i=l(e,'left');o.top+=n,o.left+=i,o.bottom+=n,o.right+=i}else o=e.getBoundingClientRect()}catch(t){}var p={left:o.left,top:o.top,width:o.right-o.left,height:o.bottom-o.top},s='HTML'===e.nodeName?c():{},d=s.width||e.clientWidth||p.right-p.left,a=s.height||e.clientHeight||p.bottom-p.top,f=e.offsetWidth-d,h=e.offsetHeight-a;if(f||h){var u=t(e);f-=m(u,'x'),h-=m(u,'y'),p.width-=f,p.height-=h}return g(p)}function b(e,o){var i=2<arguments.length&&void 0!==arguments[2]&&arguments[2],p=r(10),s='HTML'===o.nodeName,d=u(e),a=u(o),l=n(e),m=t(o),h=parseFloat(m.borderTopWidth,10),c=parseFloat(m.borderLeftWidth,10);i&&'HTML'===o.nodeName&&(a.top=$(a.top,0),a.left=$(a.left,0));var b=g({top:d.top-a.top-h,left:d.left-a.left-c,width:d.width,height:d.height});if(b.marginTop=0,b.marginLeft=0,!p&&s){var y=parseFloat(m.marginTop,10),w=parseFloat(m.marginLeft,10);b.top-=h-y,b.bottom-=h-y,b.left-=c-w,b.right-=c-w,b.marginTop=y,b.marginLeft=w}return(p&&!i?o.contains(l):o===l&&'BODY'!==l.nodeName)&&(b=f(b,o)),b}function y(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=e.ownerDocument.documentElement,n=b(e,o),i=$(o.clientWidth,window.innerWidth||0),r=$(o.clientHeight,window.innerHeight||0),p=t?0:l(o),s=t?0:l(o,'left'),d={top:p-n.top+n.marginTop,left:s-n.left+n.marginLeft,width:i,height:r};return g(d)}function w(e){var n=e.nodeName;return'BODY'===n||'HTML'===n?!1:'fixed'===t(e,'position')||w(o(e))}function E(e){if(!e||!e.parentElement||r())return document.documentElement;for(var o=e.parentElement;o&&'none'===t(o,'transform');)o=o.parentElement;return o||document.documentElement}function v(e,t,i,r){var p=4<arguments.length&&void 0!==arguments[4]&&arguments[4],s={top:0,left:0},d=p?E(e):a(e,t);if('viewport'===r)s=y(d,p);else{var l;'scrollParent'===r?(l=n(o(t)),'BODY'===l.nodeName&&(l=e.ownerDocument.documentElement)):'window'===r?l=e.ownerDocument.documentElement:l=r;var f=b(l,d,p);if('HTML'===l.nodeName&&!w(d)){var m=c(),h=m.height,g=m.width;s.top+=f.top-f.marginTop,s.bottom=h+f.top,s.left+=f.left-f.marginLeft,s.right=g+f.left}else s=f}return s.left+=i,s.top+=i,s.right-=i,s.bottom-=i,s}function x(e){var t=e.width,o=e.height;return t*o}function O(e,t,o,n,i){var r=5<arguments.length&&void 0!==arguments[5]?arguments[5]:0;if(-1===e.indexOf('auto'))return e;var p=v(o,n,r,i),s={top:{width:p.width,height:t.top-p.top},right:{width:p.right-t.right,height:p.height},bottom:{width:p.width,height:p.bottom-t.bottom},left:{width:t.left-p.left,height:p.height}},d=Object.keys(s).map(function(e){return le({key:e},s[e],{area:x(s[e])})}).sort(function(e,t){return t.area-e.area}),a=d.filter(function(e){var t=e.width,n=e.height;return t>=o.clientWidth&&n>=o.clientHeight}),l=0<a.length?a[0].key:d[0].key,f=e.split('-')[1];return l+(f?'-'+f:'')}function L(e,t,o){var n=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null,i=n?E(t):a(t,o);return b(o,i,n)}function S(e){var t=getComputedStyle(e),o=parseFloat(t.marginTop)+parseFloat(t.marginBottom),n=parseFloat(t.marginLeft)+parseFloat(t.marginRight),i={width:e.offsetWidth+n,height:e.offsetHeight+o};return i}function T(e){var t={left:'right',right:'left',bottom:'top',top:'bottom'};return e.replace(/left|right|bottom|top/g,function(e){return t[e]})}function C(e,t,o){o=o.split('-')[0];var n=S(e),i={width:n.width,height:n.height},r=-1!==['right','left'].indexOf(o),p=r?'top':'left',s=r?'left':'top',d=r?'height':'width',a=r?'width':'height';return i[p]=t[p]+t[d]/2-n[d]/2,i[s]=o===s?t[s]-n[a]:t[T(s)],i}function D(e,t){return Array.prototype.find?e.find(t):e.filter(t)[0]}function N(e,t,o){if(Array.prototype.findIndex)return e.findIndex(function(e){return e[t]===o});var n=D(e,function(e){return e[t]===o});return e.indexOf(n)}function P(t,o,n){var i=void 0===n?t:t.slice(0,N(t,'name',n));return i.forEach(function(t){t['function']&&console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var n=t['function']||t.fn;t.enabled&&e(n)&&(o.offsets.popper=g(o.offsets.popper),o.offsets.reference=g(o.offsets.reference),o=n(o,t))}),o}function k(){if(!this.state.isDestroyed){var e={instance:this,styles:{},arrowStyles:{},attributes:{},flipped:!1,offsets:{}};e.offsets.reference=L(this.state,this.popper,this.reference,this.options.positionFixed),e.placement=O(this.options.placement,e.offsets.reference,this.popper,this.reference,this.options.modifiers.flip.boundariesElement,this.options.modifiers.flip.padding),e.originalPlacement=e.placement,e.positionFixed=this.options.positionFixed,e.offsets.popper=C(this.popper,e.offsets.reference,e.placement),e.offsets.popper.position=this.options.positionFixed?'fixed':'absolute',e=P(this.modifiers,e),this.state.isCreated?this.options.onUpdate(e):(this.state.isCreated=!0,this.options.onCreate(e))}}function W(e,t){return e.some(function(e){var o=e.name,n=e.enabled;return n&&o===t})}function B(e){for(var t=[!1,'ms','Webkit','Moz','O'],o=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<t.length;n++){var i=t[n],r=i?''+i+o:e;if('undefined'!=typeof document.body.style[r])return r}return null}function H(){return this.state.isDestroyed=!0,W(this.modifiers,'applyStyle')&&(this.popper.removeAttribute('x-placement'),this.popper.style.position='',this.popper.style.top='',this.popper.style.left='',this.popper.style.right='',this.popper.style.bottom='',this.popper.style.willChange='',this.popper.style[B('transform')]=''),this.disableEventListeners(),this.options.removeOnDestroy&&this.popper.parentNode.removeChild(this.popper),this}function A(e){var t=e.ownerDocument;return t?t.defaultView:window}function M(e,t,o,i){var r='BODY'===e.nodeName,p=r?e.ownerDocument.defaultView:e;p.addEventListener(t,o,{passive:!0}),r||M(n(p.parentNode),t,o,i),i.push(p)}function I(e,t,o,i){o.updateBound=i,A(e).addEventListener('resize',o.updateBound,{passive:!0});var r=n(e);return M(r,'scroll',o.updateBound,o.scrollParents),o.scrollElement=r,o.eventsEnabled=!0,o}function F(){this.state.eventsEnabled||(this.state=I(this.reference,this.options,this.state,this.scheduleUpdate))}function R(e,t){return A(e).removeEventListener('resize',t.updateBound),t.scrollParents.forEach(function(e){e.removeEventListener('scroll',t.updateBound)}),t.updateBound=null,t.scrollParents=[],t.scrollElement=null,t.eventsEnabled=!1,t}function U(){this.state.eventsEnabled&&(cancelAnimationFrame(this.scheduleUpdate),this.state=R(this.reference,this.state))}function Y(e){return''!==e&&!isNaN(parseFloat(e))&&isFinite(e)}function j(e,t){Object.keys(t).forEach(function(o){var n='';-1!==['width','height','top','right','bottom','left'].indexOf(o)&&Y(t[o])&&(n='px'),e.style[o]=t[o]+n})}function K(e,t){Object.keys(t).forEach(function(o){var n=t[o];!1===n?e.removeAttribute(o):e.setAttribute(o,t[o])})}function q(e,t,o){var n=D(e,function(e){var o=e.name;return o===t}),i=!!n&&e.some(function(e){return e.name===o&&e.enabled&&e.order<n.order});if(!i){var r='`'+t+'`';console.warn('`'+o+'`'+' modifier is required by '+r+' modifier in order to work, be sure to include it before '+r+'!')}return i}function G(e){return'end'===e?'start':'start'===e?'end':e}function z(e){var t=1<arguments.length&&void 0!==arguments[1]&&arguments[1],o=me.indexOf(e),n=me.slice(o+1).concat(me.slice(0,o));return t?n.reverse():n}function V(e,t,o,n){var i=e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),r=+i[1],p=i[2];if(!r)return e;if(0===p.indexOf('%')){var s;switch(p){case'%p':s=o;break;case'%':case'%r':default:s=n;}var d=g(s);return d[t]/100*r}if('vh'===p||'vw'===p){var a;return a='vh'===p?$(document.documentElement.clientHeight,window.innerHeight||0):$(document.documentElement.clientWidth,window.innerWidth||0),a/100*r}return r}function _(e,t,o,n){var i=[0,0],r=-1!==['right','left'].indexOf(n),p=e.split(/(\+|\-)/).map(function(e){return e.trim()}),s=p.indexOf(D(p,function(e){return-1!==e.search(/,|\s/)}));p[s]&&-1===p[s].indexOf(',')&&console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d=/\s*,\s*|\s+/,a=-1===s?[p]:[p.slice(0,s).concat([p[s].split(d)[0]]),[p[s].split(d)[1]].concat(p.slice(s+1))];return a=a.map(function(e,n){var i=(1===n?!r:r)?'height':'width',p=!1;return e.reduce(function(e,t){return''===e[e.length-1]&&-1!==['+','-'].indexOf(t)?(e[e.length-1]=t,p=!0,e):p?(e[e.length-1]+=t,p=!1,e):e.concat(t)},[]).map(function(e){return V(e,i,t,o)})}),a.forEach(function(e,t){e.forEach(function(o,n){Y(o)&&(i[t]+=o*('-'===e[n-1]?-1:1))})}),i}function X(e,t){var o,n=t.offset,i=e.placement,r=e.offsets,p=r.popper,s=r.reference,d=i.split('-')[0];return o=Y(+n)?[+n,0]:_(n,p,s,d),'left'===d?(p.top+=o[0],p.left-=o[1]):'right'===d?(p.top+=o[0],p.left+=o[1]):'top'===d?(p.left+=o[0],p.top-=o[1]):'bottom'===d&&(p.left+=o[0],p.top+=o[1]),e.popper=p,e}for(var J=Math.min,Q=Math.round,Z=Math.floor,$=Math.max,ee='undefined'!=typeof window&&'undefined'!=typeof document,te=['Edge','Trident','Firefox'],oe=0,ne=0;ne<te.length;ne+=1)if(ee&&0<=navigator.userAgent.indexOf(te[ne])){oe=1;break}var i=ee&&window.Promise,ie=i?function(e){var t=!1;return function(){t||(t=!0,window.Promise.resolve().then(function(){t=!1,e()}))}}:function(e){var t=!1;return function(){t||(t=!0,setTimeout(function(){t=!1,e()},oe))}},re=ee&&!!(window.MSInputMethodContext&&document.documentMode),pe=ee&&/MSIE 10/.test(navigator.userAgent),se=function(e,t){if(!(e instanceof t))throw new TypeError('Cannot call a class as a function')},de=function(){function e(e,t){for(var o,n=0;n<t.length;n++)o=t[n],o.enumerable=o.enumerable||!1,o.configurable=!0,'value'in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),ae=function(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e},le=Object.assign||function(e){for(var t,o=1;o<arguments.length;o++)for(var n in t=arguments[o],t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},fe=['auto-start','auto','auto-end','top-start','top','top-end','right-start','right','right-end','bottom-end','bottom','bottom-start','left-end','left','left-start'],me=fe.slice(3),he={FLIP:'flip',CLOCKWISE:'clockwise',COUNTERCLOCKWISE:'counterclockwise'},ce=function(){function t(o,n){var i=this,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};se(this,t),this.scheduleUpdate=function(){return requestAnimationFrame(i.update)},this.update=ie(this.update.bind(this)),this.options=le({},t.Defaults,r),this.state={isDestroyed:!1,isCreated:!1,scrollParents:[]},this.reference=o&&o.jquery?o[0]:o,this.popper=n&&n.jquery?n[0]:n,this.options.modifiers={},Object.keys(le({},t.Defaults.modifiers,r.modifiers)).forEach(function(e){i.options.modifiers[e]=le({},t.Defaults.modifiers[e]||{},r.modifiers?r.modifiers[e]:{})}),this.modifiers=Object.keys(this.options.modifiers).map(function(e){return le({name:e},i.options.modifiers[e])}).sort(function(e,t){return e.order-t.order}),this.modifiers.forEach(function(t){t.enabled&&e(t.onLoad)&&t.onLoad(i.reference,i.popper,i.options,t,i.state)}),this.update();var p=this.options.eventsEnabled;p&&this.enableEventListeners(),this.state.eventsEnabled=p}return de(t,[{key:'update',value:function(){return k.call(this)}},{key:'destroy',value:function(){return H.call(this)}},{key:'enableEventListeners',value:function(){return F.call(this)}},{key:'disableEventListeners',value:function(){return U.call(this)}}]),t}();return ce.Utils=('undefined'==typeof window?global:window).PopperUtils,ce.placements=fe,ce.Defaults={placement:'bottom',positionFixed:!1,eventsEnabled:!0,removeOnDestroy:!1,onCreate:function(){},onUpdate:function(){},modifiers:{shift:{order:100,enabled:!0,fn:function(e){var t=e.placement,o=t.split('-')[0],n=t.split('-')[1];if(n){var i=e.offsets,r=i.reference,p=i.popper,s=-1!==['bottom','top'].indexOf(o),d=s?'left':'top',a=s?'width':'height',l={start:ae({},d,r[d]),end:ae({},d,r[d]+r[a]-p[a])};e.offsets.popper=le({},p,l[n])}return e}},offset:{order:200,enabled:!0,fn:X,offset:0},preventOverflow:{order:300,enabled:!0,fn:function(e,t){var o=t.boundariesElement||p(e.instance.popper);e.instance.reference===o&&(o=p(o));var n=B('transform'),i=e.instance.popper.style,r=i.top,s=i.left,d=i[n];i.top='',i.left='',i[n]='';var a=v(e.instance.popper,e.instance.reference,t.padding,o,e.positionFixed);i.top=r,i.left=s,i[n]=d,t.boundaries=a;var l=t.priority,f=e.offsets.popper,m={primary:function(e){var o=f[e];return f[e]<a[e]&&!t.escapeWithReference&&(o=$(f[e],a[e])),ae({},e,o)},secondary:function(e){var o='right'===e?'left':'top',n=f[o];return f[e]>a[e]&&!t.escapeWithReference&&(n=J(f[o],a[e]-('right'===e?f.width:f.height))),ae({},o,n)}};return l.forEach(function(e){var t=-1===['left','top'].indexOf(e)?'secondary':'primary';f=le({},f,m[t](e))}),e.offsets.popper=f,e},priority:['left','right','top','bottom'],padding:5,boundariesElement:'scrollParent'},keepTogether:{order:400,enabled:!0,fn:function(e){var t=e.offsets,o=t.popper,n=t.reference,i=e.placement.split('-')[0],r=Z,p=-1!==['top','bottom'].indexOf(i),s=p?'right':'bottom',d=p?'left':'top',a=p?'width':'height';return o[s]<r(n[d])&&(e.offsets.popper[d]=r(n[d])-o[a]),o[d]>r(n[s])&&(e.offsets.popper[d]=r(n[s])),e}},arrow:{order:500,enabled:!0,fn:function(e,o){var n;if(!q(e.instance.modifiers,'arrow','keepTogether'))return e;var i=o.element;if('string'==typeof i){if(i=e.instance.popper.querySelector(i),!i)return e;}else if(!e.instance.popper.contains(i))return console.warn('WARNING: `arrow.element` must be child of its popper element!'),e;var r=e.placement.split('-')[0],p=e.offsets,s=p.popper,d=p.reference,a=-1!==['left','right'].indexOf(r),l=a?'height':'width',f=a?'Top':'Left',m=f.toLowerCase(),h=a?'left':'top',c=a?'bottom':'right',u=S(i)[l];d[c]-u<s[m]&&(e.offsets.popper[m]-=s[m]-(d[c]-u)),d[m]+u>s[c]&&(e.offsets.popper[m]+=d[m]+u-s[c]),e.offsets.popper=g(e.offsets.popper);var b=d[m]+d[l]/2-u/2,y=t(e.instance.popper),w=parseFloat(y['margin'+f],10),E=parseFloat(y['border'+f+'Width'],10),v=b-e.offsets.popper[m]-w-E;return v=$(J(s[l]-u,v),0),e.arrowElement=i,e.offsets.arrow=(n={},ae(n,m,Q(v)),ae(n,h,''),n),e},element:'[x-arrow]'},flip:{order:600,enabled:!0,fn:function(e,t){if(W(e.instance.modifiers,'inner'))return e;if(e.flipped&&e.placement===e.originalPlacement)return e;var o=v(e.instance.popper,e.instance.reference,t.padding,t.boundariesElement,e.positionFixed),n=e.placement.split('-')[0],i=T(n),r=e.placement.split('-')[1]||'',p=[];switch(t.behavior){case he.FLIP:p=[n,i];break;case he.CLOCKWISE:p=z(n);break;case he.COUNTERCLOCKWISE:p=z(n,!0);break;default:p=t.behavior;}return p.forEach(function(s,d){if(n!==s||p.length===d+1)return e;n=e.placement.split('-')[0],i=T(n);var a=e.offsets.popper,l=e.offsets.reference,f=Z,m='left'===n&&f(a.right)>f(l.left)||'right'===n&&f(a.left)<f(l.right)||'top'===n&&f(a.bottom)>f(l.top)||'bottom'===n&&f(a.top)<f(l.bottom),h=f(a.left)<f(o.left),c=f(a.right)>f(o.right),g=f(a.top)<f(o.top),u=f(a.bottom)>f(o.bottom),b='left'===n&&h||'right'===n&&c||'top'===n&&g||'bottom'===n&&u,y=-1!==['top','bottom'].indexOf(n),w=!!t.flipVariations&&(y&&'start'===r&&h||y&&'end'===r&&c||!y&&'start'===r&&g||!y&&'end'===r&&u);(m||b||w)&&(e.flipped=!0,(m||b)&&(n=p[d+1]),w&&(r=G(r)),e.placement=n+(r?'-'+r:''),e.offsets.popper=le({},e.offsets.popper,C(e.instance.popper,e.offsets.reference,e.placement)),e=P(e.instance.modifiers,e,'flip'))}),e},behavior:'flip',padding:5,boundariesElement:'viewport'},inner:{order:700,enabled:!1,fn:function(e){var t=e.placement,o=t.split('-')[0],n=e.offsets,i=n.popper,r=n.reference,p=-1!==['left','right'].indexOf(o),s=-1===['top','left'].indexOf(o);return i[p?'left':'top']=r[o]-(s?i[p?'width':'height']:0),e.placement=T(t),e.offsets.popper=g(i),e}},hide:{order:800,enabled:!0,fn:function(e){if(!q(e.instance.modifiers,'hide','preventOverflow'))return e;var t=e.offsets.reference,o=D(e.instance.modifiers,function(e){return'preventOverflow'===e.name}).boundaries;if(t.bottom<o.top||t.left>o.right||t.top>o.bottom||t.right<o.left){if(!0===e.hide)return e;e.hide=!0,e.attributes['x-out-of-boundaries']=''}else{if(!1===e.hide)return e;e.hide=!1,e.attributes['x-out-of-boundaries']=!1}return e}},computeStyle:{order:850,enabled:!0,fn:function(e,t){var o=t.x,n=t.y,i=e.offsets.popper,r=D(e.instance.modifiers,function(e){return'applyStyle'===e.name}).gpuAcceleration;void 0!==r&&console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,d,a=void 0===r?t.gpuAcceleration:r,l=p(e.instance.popper),f=u(l),m={position:i.position},h={left:Z(i.left),top:Q(i.top),bottom:Q(i.bottom),right:Z(i.right)},c='bottom'===o?'top':'bottom',g='right'===n?'left':'right',b=B('transform');if(d='bottom'==c?-f.height+h.bottom:h.top,s='right'==g?-f.width+h.right:h.left,a&&b)m[b]='translate3d('+s+'px, '+d+'px, 0)',m[c]=0,m[g]=0,m.willChange='transform';else{var y='bottom'==c?-1:1,w='right'==g?-1:1;m[c]=d*y,m[g]=s*w,m.willChange=c+', '+g}var E={"x-placement":e.placement};return e.attributes=le({},E,e.attributes),e.styles=le({},m,e.styles),e.arrowStyles=le({},e.offsets.arrow,e.arrowStyles),e},gpuAcceleration:!0,x:'bottom',y:'right'},applyStyle:{order:900,enabled:!0,fn:function(e){return j(e.instance.popper,e.styles),K(e.instance.popper,e.attributes),e.arrowElement&&Object.keys(e.arrowStyles).length&&j(e.arrowElement,e.arrowStyles),e},onLoad:function(e,t,o,n,i){var r=L(i,t,e,o.positionFixed),p=O(o.placement,r,t,e,o.modifiers.flip.boundariesElement,o.modifiers.flip.padding);return t.setAttribute('x-placement',p),j(t,{position:o.positionFixed?'fixed':'absolute'}),o},gpuAcceleration:void 0}}},ce});
//# sourceMappingURL=popper.min.js.map


/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);

(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define(factory);
    else if(typeof exports === 'object')
        exports["Namespacer"] = factory();
    else
        root["Namespacer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

    /* WEBPACK VAR INJECTION */(function(global) {/*!
    Namespacer
    https://github.com/sporto/namespacer.js
    */

    module.exports = function (string, obj) {
        var parts = string.split('.');
        var current = null;
        var container = global;

        while(parts.length > 0) {
            current = parts.shift();
            if (parts.length === 0) {
                // last part
                // if object is given then add that object
                // if there is already something there don't do anything
                // otherwise just create an empty object
                container[current] = obj || container[current] || {};
                return container[current];
            } else {
                container[current] = container[current] || {};
            }
            container = container[current];
        }

        return obj;
    }

    /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;


/*************************************************************
* 
* AT&T CONFIDENTIAL
* __________________
* 
* AT&T Inc. 
* All Rights Reserved.
* 
* NOTICE:  All information contained herein is, and remains
* the property of AT&T Inc. and its suppliers, if any. The
* intellectual and technical concepts contained herein are 
* proprietary to AT&T Inc. and its suppliers and may be covered 
* by U.S. and Foreign Patents, patents in process, and are 
* protected by trade secret or copyright law. Dissemination of 
* this information or reproduction of this material is strictly 
* forbidden unless prior written permission is obtained
* from AT&T Inc.
*/

/**
* Utilities methhods for AT&T
* @required Namespace.js  
* @namespace att.util
* @author kv760r@att.com - Kanakaraj Venkataswamy
*/
;(function(){

   var module = { 

       /**
        * Loads javascript file in async manner
        * @name loadScript
        * @param  {String}   url      valid, accessible web address
        * @param  {Function} callback function to be called after script load
        */
       loadScript: function (url, callback) {

           var script = document.createElement("script")
           script.type = "text/javascript";

           // for Internet Explorer
           if (script.readyState) {
               script.onreadystatechange = function () {
                   if (script.readyState == "loaded" || script.readyState == "complete") {
                       script.onreadystatechange = null;
                       callback();
                   }
               };
           } 
           // Rest of the browsers
           else {
               script.onload = function () {
                   if(typeof callback !== 'undefined') callback();
               };
           }

           script.src = url;
           document.getElementsByTagName("body")[0].appendChild(script);
       },

       /**
        * Detect mobile devices
        * @return {Object} returns isMobile object
        * @example
        * att.util.detectMobile.isAndroid();  // returns boolean (true / false)
        * att.util.detectMobile.any(); // returns boolean (true / false)
        */
       detectMobile : function () {

           var isMobile = {

               Android: function () {
                   return navigator.userAgent.match(/Android/i);   
               },

               iOS: function () {
                   return navigator.userAgent.match(/iPhone|iPad|iPod/i);
               },

               Opera: function () {
                   return navigator.userAgent.match(/Opera Mini/i);
               },

               Windows: function () {
                   return navigator.userAgent.match(/IEMobile/i);
               },

               iPhone: function () {
                   return navigator.userAgent.match(/iPhone/i);
               },

               any: function () {
                   return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
               }

           };

           return isMobile;
       }
   };

   Namespacer('att.util', module);

})();

/**
 * jQuery $.extend / JSON.parse vulnerability fix
 * Patching extend method
 */
jQuery.extend = jQuery.fn.extend = jQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
        deep = target;

        // Skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

            // Extend the base object
            for ( name in options ) {
                copy = options[ name ];

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if ( name === "__proto__" || target === copy ) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                    ( copyIsArray = Array.isArray( copy ) ) ) ) {
                    src = target[ name ];

                    // Ensure proper type for the source value
                    if ( copyIsArray && !Array.isArray( src ) ) {
                        clone = [];
                    } else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    copyIsArray = false;

                    // Never move original objects, clone them
                    target[ name ] = jQuery.extend( deep, clone, copy );

                // Don't bring in undefined values
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
};

// jQuery $.extend / JSON.parse vulnerability fix end

/**
 * Site tracking
 * @requires jQuery
 * @requires namespace.js (size: 3kb)
 * @requires att.lib.js (size: 4kb)
 * @return {Object} att.entbus.track.ddo
 */
 ;(function($, window, document, undefined){

  var module = {};

  /**attbusiness/solutions/components/page/base-page
   * multiTrack
   * @example
   * att.entbus.track.ddo.pushEvent('param1', 'param2', 'param3')
   */
  var pushEvent = function(param){
    window.adobeDataLayer.push(param);
  };
  module.ddo = {
      pushEvent: pushEvent
  }
  Namespacer('att.entbus.track.ddo', module.ddo);
})(jQuery.noConflict(), window, document);
 
/**
 * paramsToJson description
 * Parse abc=foo&def=%5Basf%5D&xyz=5 in five steps:
 * decodeURI: abc=foo&def=[asf]&xyz=5
 * Escape quotes: same, as there are no quotes
 * Replace &: abc=foo","def=[asf]","xyz=5
 * Replace =: abc":"foo","def":"[asf]","xyz":"5
 * Suround with curlies and quotes: {"abc":"foo","def":"[asf]","xyz":"5"}
 * which is legal JSON.
 * http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object/8649003#8649003
 * @param  {String} params       eg. "abc=foo&def=[asf]&xyz=5"
 * @return {Object} json object  eg. {"abc":"foo","def":"[asf]","xyz":"5"}
 * @example
 * paramsToJson(players[index].getVideoUrl().split('?')[1])
 * TODO: Move to att.entbus.utils
 */
function paramsToJson (params) {
    var json = {};
    json = params?JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g,'":"') + '"}',
            function(key, value) { return key===""?value:decodeURIComponent(value) }):{};
    return json;
}

/**
 * [cookie description]
 * @param  {[String]} name    Cookie name
 * @param  {[String]} value   Cookie value
 * @param  {Object} options   Key value pair
 * @example
 * $.cookie('SHOPSESSIONID', some Value, {expires: 20, domain: 'att.com'});
 * $.cookie('SHOPSESSIONID');  // returns value of the cookie if available or null
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

/***************************** att.util.equalHeightColumn.js START ********************************/

/**
 * Equal height columns
 * @author kv760r Kanakaraj Venaktaswamy
 * @requires namespace.js
 * @return {Object}  att.entbus.equalHeightColumn
 */
;(function ($, window, undefined) {
    var module   = {},
        selector = {
            ehParent: '.eh-parent',
            ehChild : '.eh-child'
        },

    /**
     * Sets equal height property to elements selected
     * @param {Array}  columns comma separated class names with dot
     * @example
     * var tallestColumn = getEqualHeight(['.security', '.iot', '.contactus']); 
     * @returns {Number} Height column height
     */
    getEqualHeight = function (columns) {
        var $elements,
            currentHeight = 0,
            tallestColumnHeight = 0;

        if(typeof columns === 'undefined' || columns.length === 0) return;

        $elements =  $.isArray(columns) ? $(columns.join()) : $(columns);
        resetHeight(columns);
        $elements.each(function (index, item) {
            currentHeight = $(item).outerHeight();
            if(currentHeight > tallestColumnHeight) 
                tallestColumnHeight = currentHeight;
        });
        return tallestColumnHeight;
    },

    /**
     * Set inline css height property to DOM element with 
     * the class name passed as parameter
     * @param {Array} columns comma separated class names with dot
     * @example
     * setEqualHeight(['.security', '.iot', '.contactus']); 
     */
    setEqualHeight = function (columns) {
        var $elements,
            height;
        columns = columns || selector.ehChild
        height = getEqualHeight(columns);
        $elements = $.isArray(columns) ? $(columns.join()): $(columns);
        $elements.outerHeight(height);
    },

    /**
     * Set inline css height property as auto to DOM elements with
     * the class name passed as parameter
     * @param {Array} columns comma separated class names with dot
     */
    resetHeight = function (columns) {
        var columns = columns || selector.ehChild,
            $elements = $.isArray(columns) ? $(columns.join()) : $(columns);
        
        $elements.outerHeight('auto');
    };

    module = {
        setEqualHeight: setEqualHeight,
        resetHeight: resetHeight
    };

    Namespacer('att.entbus.equalHeightColumn', module);

})(jQuery.noConflict(), window);


;(function ($, window, undefined) {
    $(function(){
        var setEqualHeight = function() {
            if($(window).width() >= 1200) {
                setTimeout(function(){
                    // att.entbus.equalHeightColumn.setEqualHeight(['.featured-whitepaper','.certification-container', '.lte-modules']);
                    // att.entbus.equalHeightColumn.setEqualHeight(['.data-security .left','.data-security .right']);
                    att.entbus.equalHeightColumn.setEqualHeight();
                }, 0);
            } else {
                // att.entbus.equalHeightColumn.resetHeight(['.featured-whitepaper','.certification-container', '.lte-modules']);
                // att.entbus.equalHeightColumn.resetHeight(['.data-security .left','.data-security .right']);
                att.entbus.equalHeightColumn.resetHeight();
            }
        }
        // TODO: bind only if relevant classes present in the DOM
        $(window).bind('resize load', setEqualHeight);
    });
})(jQuery.noConflict(), window);


;(function ($, window, undefined) {
  /**
   * Method to sanitize HTML output before inserting it into the page
   * @param  {[type]} input [Object]
   * @return {[type]}     [Object]
   * @required jQuery
   * @example
   * $('output.div').html(sanitizeHtml(someOutput);
   */
  var sanitizeHtml = function (inphtml) {
    var escaped = $('<textarea />').text(inphtml).html(),
    sanitized = $('<textarea />').html(escaped).text();
    return sanitized;  
  };

  module = {
      sanitizeHtml: sanitizeHtml
  };

  Namespacer('att.entbus.veracode', module);

})(jQuery.noConflict(), window);


/***************************** att.util.equalHeightColumn.js END ********************************/

// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
// Array.findIndex shim / polyfill for older browsers
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}


/***************************** att.util.assetLazyloading.js Start ********************************/

/* Intersection observer Polyfill for older browsers */

"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the W3C SOFTWARE AND DOCUMENT NOTICE AND LICENSE.
 *
 *  https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
 *
 */
(function () {
  'use strict'; // Exit early if we're not running in a browser.

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) !== 'object') {
    return;
  } // Exit early if all IntersectionObserver and IntersectionObserverEntry
  // features are natively supported.


  if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
    // Minimal polyfill for Edge 15's lack of `isIntersecting`
    // See: https://github.com/w3c/IntersectionObserver/issues/211
    if (!('isIntersecting' in window.IntersectionObserverEntry.prototype)) {
      Object.defineProperty(window.IntersectionObserverEntry.prototype, 'isIntersecting', {
        get: function get() {
          return this.intersectionRatio > 0;
        }
      });
    }

    return;
  }
  /**
   * A local reference to the document.
   */


  var document = window.document;
  /**
   * An IntersectionObserver registry. This registry exists to hold a strong
   * reference to IntersectionObserver instances currently observing a target
   * element. Without this registry, instances without another reference may be
   * garbage collected.
   */

  var registry = [];
  /**
   * The signal updater for cross-origin intersection. When not null, it means
   * that the polyfill is configured to work in a cross-origin mode.
   * @type {function(DOMRect, DOMRect)}
   */

  var crossOriginUpdater = null;
  /**
   * The current cross-origin intersection. Only used in the cross-origin mode.
   * @type {DOMRect}
   */

  var crossOriginRect = null;
  /**
   * Creates the global IntersectionObserverEntry constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-entry
   * @param {Object} entry A dictionary of instance properties.
   * @constructor
   */

  function IntersectionObserverEntry(entry) {
    this.time = entry.time;
    this.target = entry.target;
    this.rootBounds = entry.rootBounds;
    this.boundingClientRect = entry.boundingClientRect;
    this.intersectionRect = entry.intersectionRect || getEmptyRect();
    this.isIntersecting = !!entry.intersectionRect; // Calculates the intersection ratio.

    var targetRect = this.boundingClientRect;
    var targetArea = targetRect.width * targetRect.height;
    var intersectionRect = this.intersectionRect;
    var intersectionArea = intersectionRect.width * intersectionRect.height; // Sets intersection ratio.

    if (targetArea) {
      // Round the intersection ratio to avoid floating point math issues:
      // https://github.com/w3c/IntersectionObserver/issues/324
      this.intersectionRatio = Number((intersectionArea / targetArea).toFixed(4));
    } else {
      // If area is zero and is intersecting, sets to 1, otherwise to 0
      this.intersectionRatio = this.isIntersecting ? 1 : 0;
    }
  }
  /**
   * Creates the global IntersectionObserver constructor.
   * https://w3c.github.io/IntersectionObserver/#intersection-observer-interface
   * @param {Function} callback The function to be invoked after intersection
   *     changes have queued. The function is not invoked if the queue has
   *     been emptied by calling the `takeRecords` method.
   * @param {Object=} opt_options Optional configuration options.
   * @constructor
   */


  function IntersectionObserver(callback, opt_options) {
    var options = opt_options || {};

    if (typeof callback != 'function') {
      throw new Error('callback must be a function');
    }

    if (options.root && options.root.nodeType != 1) {
      throw new Error('root must be an Element');
    } // Binds and throttles `this._checkForIntersections`.


    this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT); // Private properties.

    this._callback = callback;
    this._observationTargets = [];
    this._queuedEntries = [];
    this._rootMarginValues = this._parseRootMargin(options.rootMargin); // Public properties.

    this.thresholds = this._initThresholds(options.threshold);
    this.root = options.root || null;
    this.rootMargin = this._rootMarginValues.map(function (margin) {
      return margin.value + margin.unit;
    }).join(' ');
    /** @private @const {!Array<!Document>} */

    this._monitoringDocuments = [];
    /** @private @const {!Array<function()>} */

    this._monitoringUnsubscribes = [];
  }
  /**
   * The minimum interval within which the document will be checked for
   * intersection changes.
   */


  IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;
  /**
   * The frequency in which the polyfill polls for intersection changes.
   * this can be updated on a per instance basis and must be set prior to
   * calling `observe` on the first target.
   */

  IntersectionObserver.prototype.POLL_INTERVAL = null;
  /**
   * Use a mutation observer on the root element
   * to detect intersection changes.
   */

  IntersectionObserver.prototype.USE_MUTATION_OBSERVER = true;
  /**
   * Sets up the polyfill in the cross-origin mode. The result is the
   * updater function that accepts two arguments: `boundingClientRect` and
   * `intersectionRect` - just as these fields would be available to the
   * parent via `IntersectionObserverEntry`. This function should be called
   * each time the iframe receives intersection information from the parent
   * window, e.g. via messaging.
   * @return {function(DOMRect, DOMRect)}
   */

  IntersectionObserver._setupCrossOriginUpdater = function () {
    if (!crossOriginUpdater) {
      /**
       * @param {DOMRect} boundingClientRect
       * @param {DOMRect} intersectionRect
       */
      crossOriginUpdater = function crossOriginUpdater(boundingClientRect, intersectionRect) {
        if (!boundingClientRect || !intersectionRect) {
          crossOriginRect = getEmptyRect();
        } else {
          crossOriginRect = convertFromParentRect(boundingClientRect, intersectionRect);
        }

        registry.forEach(function (observer) {
          observer._checkForIntersections();
        });
      };
    }

    return crossOriginUpdater;
  };
  /**
   * Resets the cross-origin mode.
   */


  IntersectionObserver._resetCrossOriginUpdater = function () {
    crossOriginUpdater = null;
    crossOriginRect = null;
  };
  /**
   * Starts observing a target element for intersection changes based on
   * the thresholds values.
   * @param {Element} target The DOM element to observe.
   */


  IntersectionObserver.prototype.observe = function (target) {
    var isTargetAlreadyObserved = this._observationTargets.some(function (item) {
      return item.element == target;
    });

    if (isTargetAlreadyObserved) {
      return;
    }

    if (!(target && target.nodeType == 1)) {
      throw new Error('target must be an Element');
    }

    this._registerInstance();

    this._observationTargets.push({
      element: target,
      entry: null
    });

    this._monitorIntersections(target.ownerDocument);

    this._checkForIntersections();
  };
  /**
   * Stops observing a target element for intersection changes.
   * @param {Element} target The DOM element to observe.
   */


  IntersectionObserver.prototype.unobserve = function (target) {
    this._observationTargets = this._observationTargets.filter(function (item) {
      return item.element != target;
    });

    this._unmonitorIntersections(target.ownerDocument);

    if (this._observationTargets.length == 0) {
      this._unregisterInstance();
    }
  };
  /**
   * Stops observing all target elements for intersection changes.
   */


  IntersectionObserver.prototype.disconnect = function () {
    this._observationTargets = [];

    this._unmonitorAllIntersections();

    this._unregisterInstance();
  };
  /**
   * Returns any queue entries that have not yet been reported to the
   * callback and clears the queue. This can be used in conjunction with the
   * callback to obtain the absolute most up-to-date intersection information.
   * @return {Array} The currently queued entries.
   */


  IntersectionObserver.prototype.takeRecords = function () {
    var records = this._queuedEntries.slice();

    this._queuedEntries = [];
    return records;
  };
  /**
   * Accepts the threshold value from the user configuration object and
   * returns a sorted array of unique threshold values. If a value is not
   * between 0 and 1 and error is thrown.
   * @private
   * @param {Array|number=} opt_threshold An optional threshold value or
   *     a list of threshold values, defaulting to [0].
   * @return {Array} A sorted list of unique and valid threshold values.
   */


  IntersectionObserver.prototype._initThresholds = function (opt_threshold) {
    var threshold = opt_threshold || [0];
    if (!Array.isArray(threshold)) threshold = [threshold];
    return threshold.sort().filter(function (t, i, a) {
      if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
        throw new Error('threshold must be a number between 0 and 1 inclusively');
      }

      return t !== a[i - 1];
    });
  };
  /**
   * Accepts the rootMargin value from the user configuration object
   * and returns an array of the four margin values as an object containing
   * the value and unit properties. If any of the values are not properly
   * formatted or use a unit other than px or %, and error is thrown.
   * @private
   * @param {string=} opt_rootMargin An optional rootMargin value,
   *     defaulting to '0px'.
   * @return {Array<Object>} An array of margin objects with the keys
   *     value and unit.
   */


  IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
    var marginString = opt_rootMargin || '0px';
    var margins = marginString.split(/\s+/).map(function (margin) {
      var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);

      if (!parts) {
        throw new Error('rootMargin must be specified in pixels or percent');
      }

      return {
        value: parseFloat(parts[1]),
        unit: parts[2]
      };
    }); // Handles shorthand.

    margins[1] = margins[1] || margins[0];
    margins[2] = margins[2] || margins[0];
    margins[3] = margins[3] || margins[1];
    return margins;
  };
  /**
   * Starts polling for intersection changes if the polling is not already
   * happening, and if the page's visibility state is visible.
   * @param {!Document} doc
   * @private
   */


  IntersectionObserver.prototype._monitorIntersections = function (doc) {
    var win = doc.defaultView;

    if (!win) {
      // Already destroyed.
      return;
    }

    if (this._monitoringDocuments.indexOf(doc) != -1) {
      // Already monitoring.
      return;
    } // Private state for monitoring.


    var callback = this._checkForIntersections;
    var monitoringInterval = null;
    var domObserver = null; // If a poll interval is set, use polling instead of listening to
    // resize and scroll events or DOM mutations.

    if (this.POLL_INTERVAL) {
      monitoringInterval = win.setInterval(callback, this.POLL_INTERVAL);
    } else {
      addEvent(win, 'resize', callback, true);
      addEvent(doc, 'scroll', callback, true);

      if (this.USE_MUTATION_OBSERVER && 'MutationObserver' in win) {
        domObserver = new win.MutationObserver(callback);
        domObserver.observe(doc, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      }
    }

    this._monitoringDocuments.push(doc);

    this._monitoringUnsubscribes.push(function () {
      // Get the window object again. When a friendly iframe is destroyed, it
      // will be null.
      var win = doc.defaultView;

      if (win) {
        if (monitoringInterval) {
          win.clearInterval(monitoringInterval);
        }

        removeEvent(win, 'resize', callback, true);
      }

      removeEvent(doc, 'scroll', callback, true);

      if (domObserver) {
        domObserver.disconnect();
      }
    }); // Also monitor the parent.


    if (doc != (this.root && this.root.ownerDocument || document)) {
      var frame = getFrameElement(doc);

      if (frame) {
        this._monitorIntersections(frame.ownerDocument);
      }
    }
  };
  /**
   * Stops polling for intersection changes.
   * @param {!Document} doc
   * @private
   */


  IntersectionObserver.prototype._unmonitorIntersections = function (doc) {
    var index = this._monitoringDocuments.indexOf(doc);

    if (index == -1) {
      return;
    }

    var rootDoc = this.root && this.root.ownerDocument || document; // Check if any dependent targets are still remaining.

    var hasDependentTargets = this._observationTargets.some(function (item) {
      var itemDoc = item.element.ownerDocument; // Target is in this context.

      if (itemDoc == doc) {
        return true;
      } // Target is nested in this context.


      while (itemDoc && itemDoc != rootDoc) {
        var frame = getFrameElement(itemDoc);
        itemDoc = frame && frame.ownerDocument;

        if (itemDoc == doc) {
          return true;
        }
      }

      return false;
    });

    if (hasDependentTargets) {
      return;
    } // Unsubscribe.


    var unsubscribe = this._monitoringUnsubscribes[index];

    this._monitoringDocuments.splice(index, 1);

    this._monitoringUnsubscribes.splice(index, 1);

    unsubscribe(); // Also unmonitor the parent.

    if (doc != rootDoc) {
      var frame = getFrameElement(doc);

      if (frame) {
        this._unmonitorIntersections(frame.ownerDocument);
      }
    }
  };
  /**
   * Stops polling for intersection changes.
   * @param {!Document} doc
   * @private
   */


  IntersectionObserver.prototype._unmonitorAllIntersections = function () {
    var unsubscribes = this._monitoringUnsubscribes.slice(0);

    this._monitoringDocuments.length = 0;
    this._monitoringUnsubscribes.length = 0;

    for (var i = 0; i < unsubscribes.length; i++) {
      unsubscribes[i]();
    }
  };
  /**
   * Scans each observation target for intersection changes and adds them
   * to the internal entries queue. If new entries are found, it
   * schedules the callback to be invoked.
   * @private
   */


  IntersectionObserver.prototype._checkForIntersections = function () {
    if (!this.root && crossOriginUpdater && !crossOriginRect) {
      // Cross origin monitoring, but no initial data available yet.
      return;
    }

    var rootIsInDom = this._rootIsInDom();

    var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();

    this._observationTargets.forEach(function (item) {
      var target = item.element;
      var targetRect = getBoundingClientRect(target);

      var rootContainsTarget = this._rootContainsTarget(target);

      var oldEntry = item.entry;

      var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, targetRect, rootRect);

      var newEntry = item.entry = new IntersectionObserverEntry({
        time: now(),
        target: target,
        boundingClientRect: targetRect,
        rootBounds: crossOriginUpdater && !this.root ? null : rootRect,
        intersectionRect: intersectionRect
      });

      if (!oldEntry) {
        this._queuedEntries.push(newEntry);
      } else if (rootIsInDom && rootContainsTarget) {
        // If the new entry intersection ratio has crossed any of the
        // thresholds, add a new entry.
        if (this._hasCrossedThreshold(oldEntry, newEntry)) {
          this._queuedEntries.push(newEntry);
        }
      } else {
        // If the root is not in the DOM or target is not contained within
        // root but the previous entry for this target had an intersection,
        // add a new record indicating removal.
        if (oldEntry && oldEntry.isIntersecting) {
          this._queuedEntries.push(newEntry);
        }
      }
    }, this);

    if (this._queuedEntries.length) {
      this._callback(this.takeRecords(), this);
    }
  };
  /**
   * Accepts a target and root rect computes the intersection between then
   * following the algorithm in the spec.
   * TODO(philipwalton): at this time clip-path is not considered.
   * https://w3c.github.io/IntersectionObserver/#calculate-intersection-rect-algo
   * @param {Element} target The target DOM element
   * @param {Object} targetRect The bounding rect of the target.
   * @param {Object} rootRect The bounding rect of the root after being
   *     expanded by the rootMargin value.
   * @return {?Object} The final intersection rect object or undefined if no
   *     intersection is found.
   * @private
   */


  IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, targetRect, rootRect) {
    // If the element isn't displayed, an intersection can't happen.
    if (window.getComputedStyle(target).display == 'none') return;
    var intersectionRect = targetRect;
    var parent = getParentNode(target);
    var atRoot = false;

    while (!atRoot && parent) {
      var parentRect = null;
      var parentComputedStyle = parent.nodeType == 1 ? window.getComputedStyle(parent) : {}; // If the parent isn't displayed, an intersection can't happen.

      if (parentComputedStyle.display == 'none') return null;

      if (parent == this.root || parent.nodeType ==
      /* DOCUMENT */
      9) {
        atRoot = true;

        if (parent == this.root || parent == document) {
          if (crossOriginUpdater && !this.root) {
            if (!crossOriginRect || crossOriginRect.width == 0 && crossOriginRect.height == 0) {
              // A 0-size cross-origin intersection means no-intersection.
              parent = null;
              parentRect = null;
              intersectionRect = null;
            } else {
              parentRect = crossOriginRect;
            }
          } else {
            parentRect = rootRect;
          }
        } else {
          // Check if there's a frame that can be navigated to.
          var frame = getParentNode(parent);
          var frameRect = frame && getBoundingClientRect(frame);

          var frameIntersect = frame && this._computeTargetAndRootIntersection(frame, frameRect, rootRect);

          if (frameRect && frameIntersect) {
            parent = frame;
            parentRect = convertFromParentRect(frameRect, frameIntersect);
          } else {
            parent = null;
            intersectionRect = null;
          }
        }
      } else {
        // If the element has a non-visible overflow, and it's not the <body>
        // or <html> element, update the intersection rect.
        // Note: <body> and <html> cannot be clipped to a rect that's not also
        // the document rect, so no need to compute a new intersection.
        var doc = parent.ownerDocument;

        if (parent != doc.body && parent != doc.documentElement && parentComputedStyle.overflow != 'visible') {
          parentRect = getBoundingClientRect(parent);
        }
      } // If either of the above conditionals set a new parentRect,
      // calculate new intersection data.


      if (parentRect) {
        intersectionRect = computeRectIntersection(parentRect, intersectionRect);
      }

      if (!intersectionRect) break;
      parent = parent && getParentNode(parent);
    }

    return intersectionRect;
  };
  /**
   * Returns the root rect after being expanded by the rootMargin value.
   * @return {Object} The expanded root rect.
   * @private
   */


  IntersectionObserver.prototype._getRootRect = function () {
    var rootRect;

    if (this.root) {
      rootRect = getBoundingClientRect(this.root);
    } else {
      // Use <html>/<body> instead of window since scroll bars affect size.
      var html = document.documentElement;
      var body = document.body;
      rootRect = {
        top: 0,
        left: 0,
        right: html.clientWidth || body.clientWidth,
        width: html.clientWidth || body.clientWidth,
        bottom: html.clientHeight || body.clientHeight,
        height: html.clientHeight || body.clientHeight
      };
    }

    return this._expandRectByRootMargin(rootRect);
  };
  /**
   * Accepts a rect and expands it by the rootMargin value.
   * @param {Object} rect The rect object to expand.
   * @return {Object} The expanded rect.
   * @private
   */


  IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
    var margins = this._rootMarginValues.map(function (margin, i) {
      return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
    });

    var newRect = {
      top: rect.top - margins[0],
      right: rect.right + margins[1],
      bottom: rect.bottom + margins[2],
      left: rect.left - margins[3]
    };
    newRect.width = newRect.right - newRect.left;
    newRect.height = newRect.bottom - newRect.top;
    return newRect;
  };
  /**
   * Accepts an old and new entry and returns true if at least one of the
   * threshold values has been crossed.
   * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
   *    particular target element or null if no previous entry exists.
   * @param {IntersectionObserverEntry} newEntry The current entry for a
   *    particular target element.
   * @return {boolean} Returns true if a any threshold has been crossed.
   * @private
   */


  IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {
    // To make comparing easier, an entry that has a ratio of 0
    // but does not actually intersect is given a value of -1
    var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
    var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1; // Ignore unchanged ratios

    if (oldRatio === newRatio) return;

    for (var i = 0; i < this.thresholds.length; i++) {
      var threshold = this.thresholds[i]; // Return true if an entry matches a threshold or if the new ratio
      // and the old ratio are on the opposite sides of a threshold.

      if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
        return true;
      }
    }
  };
  /**
   * Returns whether or not the root element is an element and is in the DOM.
   * @return {boolean} True if the root element is an element and is in the DOM.
   * @private
   */


  IntersectionObserver.prototype._rootIsInDom = function () {
    return !this.root || containsDeep(document, this.root);
  };
  /**
   * Returns whether or not the target element is a child of root.
   * @param {Element} target The target element to check.
   * @return {boolean} True if the target element is a child of root.
   * @private
   */


  IntersectionObserver.prototype._rootContainsTarget = function (target) {
    return containsDeep(this.root || document, target) && (!this.root || this.root.ownerDocument == target.ownerDocument);
  };
  /**
   * Adds the instance to the global IntersectionObserver registry if it isn't
   * already present.
   * @private
   */


  IntersectionObserver.prototype._registerInstance = function () {
    if (registry.indexOf(this) < 0) {
      registry.push(this);
    }
  };
  /**
   * Removes the instance from the global IntersectionObserver registry.
   * @private
   */


  IntersectionObserver.prototype._unregisterInstance = function () {
    var index = registry.indexOf(this);
    if (index != -1) registry.splice(index, 1);
  };
  /**
   * Returns the result of the performance.now() method or null in browsers
   * that don't support the API.
   * @return {number} The elapsed time since the page was requested.
   */


  function now() {
    return window.performance && performance.now && performance.now();
  }
  /**
   * Throttles a function and delays its execution, so it's only called at most
   * once within a given time period.
   * @param {Function} fn The function to throttle.
   * @param {number} timeout The amount of time that must pass before the
   *     function can be called again.
   * @return {Function} The throttled function.
   */


  function throttle(fn, timeout) {
    var timer = null;
    return function () {
      if (!timer) {
        timer = setTimeout(function () {
          fn();
          timer = null;
        }, timeout);
      }
    };
  }
  /**
   * Adds an event handler to a DOM node ensuring cross-browser compatibility.
   * @param {Node} node The DOM node to add the event handler to.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to add.
   * @param {boolean} opt_useCapture Optionally adds the even to the capture
   *     phase. Note: this only works in modern browsers.
   */


  function addEvent(node, event, fn, opt_useCapture) {
    if (typeof node.addEventListener == 'function') {
      node.addEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.attachEvent == 'function') {
      node.attachEvent('on' + event, fn);
    }
  }
  /**
   * Removes a previously added event handler from a DOM node.
   * @param {Node} node The DOM node to remove the event handler from.
   * @param {string} event The event name.
   * @param {Function} fn The event handler to remove.
   * @param {boolean} opt_useCapture If the event handler was added with this
   *     flag set to true, it should be set to true here in order to remove it.
   */


  function removeEvent(node, event, fn, opt_useCapture) {
    if (typeof node.removeEventListener == 'function') {
      node.removeEventListener(event, fn, opt_useCapture || false);
    } else if (typeof node.detatchEvent == 'function') {
      node.detatchEvent('on' + event, fn);
    }
  }
  /**
   * Returns the intersection between two rect objects.
   * @param {Object} rect1 The first rect.
   * @param {Object} rect2 The second rect.
   * @return {?Object} The intersection rect or undefined if no intersection
   *     is found.
   */


  function computeRectIntersection(rect1, rect2) {
    var top = Math.max(rect1.top, rect2.top);
    var bottom = Math.min(rect1.bottom, rect2.bottom);
    var left = Math.max(rect1.left, rect2.left);
    var right = Math.min(rect1.right, rect2.right);
    var width = right - left;
    var height = bottom - top;
    return width >= 0 && height >= 0 && {
      top: top,
      bottom: bottom,
      left: left,
      right: right,
      width: width,
      height: height
    } || null;
  }
  /**
   * Shims the native getBoundingClientRect for compatibility with older IE.
   * @param {Element} el The element whose bounding rect to get.
   * @return {Object} The (possibly shimmed) rect of the element.
   */


  function getBoundingClientRect(el) {
    var rect;

    try {
      rect = el.getBoundingClientRect();
    } catch (err) {// Ignore Windows 7 IE11 "Unspecified error"
      // https://github.com/w3c/IntersectionObserver/pull/205
    }

    if (!rect) return getEmptyRect(); // Older IE

    if (!(rect.width && rect.height)) {
      rect = {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };
    }

    return rect;
  }
  /**
   * Returns an empty rect object. An empty rect is returned when an element
   * is not in the DOM.
   * @return {Object} The empty rect.
   */


  function getEmptyRect() {
    return {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    };
  }
  /**
   * Inverts the intersection and bounding rect from the parent (frame) BCR to
   * the local BCR space.
   * @param {Object} parentBoundingRect The parent's bound client rect.
   * @param {Object} parentIntersectionRect The parent's own intersection rect.
   * @return {Object} The local root bounding rect for the parent's children.
   */


  function convertFromParentRect(parentBoundingRect, parentIntersectionRect) {
    var top = parentIntersectionRect.top - parentBoundingRect.top;
    var left = parentIntersectionRect.left - parentBoundingRect.left;
    return {
      top: top,
      left: left,
      height: parentIntersectionRect.height,
      width: parentIntersectionRect.width,
      bottom: top + parentIntersectionRect.height,
      right: left + parentIntersectionRect.width
    };
  }
  /**
   * Checks to see if a parent element contains a child element (including inside
   * shadow DOM).
   * @param {Node} parent The parent element.
   * @param {Node} child The child element.
   * @return {boolean} True if the parent node contains the child node.
   */


  function containsDeep(parent, child) {
    var node = child;

    while (node) {
      if (node == parent) return true;
      node = getParentNode(node);
    }

    return false;
  }
  /**
   * Gets the parent node of an element or its host element if the parent node
   * is a shadow root.
   * @param {Node} node The node whose parent to get.
   * @return {Node|null} The parent node or null if no parent exists.
   */


  function getParentNode(node) {
    var parent = node.parentNode;

    if (node.nodeType ==
    /* DOCUMENT */
    9 && node != document) {
      // If this node is a document node, look for the embedding frame.
      return getFrameElement(node);
    }

    if (parent && parent.nodeType == 11 && parent.host) {
      // If the parent is a shadow root, return the host element.
      return parent.host;
    }

    if (parent && parent.assignedSlot) {
      // If the parent is distributed in a <slot>, return the parent of a slot.
      return parent.assignedSlot.parentNode;
    }

    return parent;
  }
  /**
   * Returns the embedding frame element, if any.
   * @param {!Document} doc
   * @return {!Element}
   */


  function getFrameElement(doc) {
    try {
      return doc.defaultView && doc.defaultView.frameElement || null;
    } catch (e) {
      // Ignore the error.
      return null;
    }
  } // Exposes the constructors globally.


  window.IntersectionObserver = IntersectionObserver;
  window.IntersectionObserverEntry = IntersectionObserverEntry;
})();


/* Lazy load img elements */
document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lzy"));

  if ("IntersectionObserver" in window) {
    var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lzy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } 
});


/* Lazy load the background-image CSS urls */
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lzy-background"));

  if ("IntersectionObserver" in window) {
    var lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {

			entry.target.classList.remove("lzy-background");

          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});

/***************************** att.util.assetLazyloading.js END ********************************/

/**
 * edmPropertyStack helper JavaScript class for store, restore data layer's governed properties
 * @param  {[type]} edm [ddo object reference]
 * @return {[type]}     [edmPropertyStack object with push, pop methods]
 * @required ddo object
 * @example
 * var stack = new edmPropertyStack(ddo);
 * var additionalDetail = {'page.pageInfo.pageTitle', document.title, 'page.pageInfo.pageName': 'Modal window - child'};
 * stack.push(additionalDetail);
 * ddo.pushEvent('pageLoad', '<evtName>', <{data as key,value pair}>);
 * stack.pop();
 * Refer https://wiki.web.att.com/pages/viewpage.action?spaceKey=DETS&title=Modal+Windows
 */
function edmPropertyStack(edm) {
    var 
    _edm = edm,
    _properties = [],
    _property = function (name, value) {
        this.name = name;
        this.value = value;
    };
    // store original values and set new value
    this.push = function (evtDetails) {
        var 
        property, 
        value;
        
        _properties = [];
        for (var item in evtDetails) {
            if (edm.isValidConfig(item)) {
                // store the property and its existing value
                value = _edm.getVar(item);
                property = new _property(item, value);
                _properties.push(property);

                // set the governed property to the desired value
                _edm.setVar(item, evtDetails[item]);
            }
        }
    }
    // revert all new values to original
    this.pop = function () {
        _properties.forEach(function (property) {
            _edm.setVar(property.name, property.value);
        });
    }
}
/**
 * Youtube player implementation
 * @author kv760r
 * @requires namespace.js (size: 3kb)
 * @requires att.lib.js (size: 4kb)
 * @requires ddo object from detm layer js lib
 * @return {Object} att.entbus.ytPlayer
 * @example
 * // script html tag structure like below
 * // NOTE: youtube player library will replace
 * // the div with youtube-player class with an iframe;
 * // So make sure this change will not break the layout
 * <div class="youtube-player"
 *    data-width="640" data-height="360"
 *    data-src="DROXZ04BNNc"
 *    frameborder="0">
 * </div>
 * // In case of overlay youtube player use following
 *
 * att.entbus.ytPlayer.setPlayers('overlay-youtube-player');
 * youtube video player API 
 * https://developers.google.com/youtube/iframe_api_reference
 */
 ;(function($, window, document, undefined) {

    var module,
    userPausedTheVideo = false,
        selectors = {
            playerContainers: '.youtube-player'
        },
        urls = {
            youtubeApi:  'https://www.youtube.com/iframe_api'
        },
        defaults = {
            width: 510,
            height: 324,
            autoRun: false
        },
        PLAYER_TYPE = {
            ytPlayer: 'ytPlayer',
            jwPlayer: 'jwPlayer'
        },
        PLAYER_POSITION = {
            IN_PAGE: 'In Page Player',
            OVERLAY: 'Overlay Player'
        },
        videoCompleted = false,
        players = [];

    var scriptLoadedCallback = function() {
        // Placeholder for callback
    },

    /**
     * @name onYouTubeIframeAPIReady
     * @description This method will be called after Youtube library loaded
     */
    onYouTubeIframeAPIReady = function () {

        createPlayers({
            players: $(selectors.playerContainers)
        });

    },

    onPlayerReady = function (event) {

        if(defaults.autoRun)
            event.target.playVideo();

    },

    onPlayerStateChange = function (event) {       
        switch(event.data) {
            /** unstarted */
            case -1:
                // unstarted
                break;
            case YT.PlayerState.ENDED:
                trackOnEnd(event);
                break;
            case YT.PlayerState.PLAYING:
                if(userPausedTheVideo) {
                    trackPausedVideo(event);
                    userPausedTheVideo = false;
                }
                players.map(function(el, index){
                    if(players[index].hasOwnProperty('getPlayerState')) {
                        if(players[index].getPlayerState() === YT.PlayerState.PLAYING && paramsToJson(players[index].getVideoUrl().split('?')[1]).v !== paramsToJson(event.target.getVideoUrl().split('?')[1]).v) {
                            players[index].pauseVideo();
                            trackOnClose(players[index]);
                        }
                    }
                });
                trackOnPlay(event);
                break;
            case YT.PlayerState.PAUSED:
                userPausedTheVideo = true;
                break;
            case YT.PlayerState.BUFFERING:
                break;
            case YT.PlayerState.CUED:
                break;
            default:
            // left intentionally blank
        }
    },

    trackOnClose = function(player) {        
        /*var videoId      = player.getVideoData().video_id,
        playerDomData    = player.h.dataset,
        mediaFriendlyName= playerDomData.mediafriendlyname,
        videoLengthTotal = Math.round(player.getDuration()),
        videoLengthViewed= Math.round(player.getCurrentTime()),
        progressPercent  = Math.round(player.getCurrentTime() / player.getDuration() * 100),
        mediaType        = playerDomData.mediatype,
        mediaClass       = playerDomData.mediaclass,
        mediaSeriesName  = playerDomData.series,
        mediaObjective   = playerDomData.objective,
        mediaCategory    = playerDomData.category,
        mediaVertical    = playerDomData.vertical,
        mediaPublisher   = playerDomData.publisher,
        mediaPersona     = playerDomData.persona,
        mediaSource      = playerDomData.source,
        mediaPublishDate = playerDomData.publishdate;

       
        att.entbus.track.ddo.pushEvent('video', 'Video_Update', 
            {
                'successFlag'         : '1',
                'statusCode'          : '0',
                'errorType'           : 'Success_Admit',
                'sendHitNow'		  : true,
                'linkName'            : 'Watch Video',
                'linkPosition'        : 'body',
                'linkDestinationUrl'  : window.location.href,
                'mediaId'             : videoId,
                'mediaFriendlyName'   : mediaFriendlyName || '',
                'mediaSeriesName'     : mediaSeriesName || '',
                'videoType'           : 'VOD', // Stream, VOD, Live, Download, Clip
                'mediaType'           : 'Video',
                'mediaClass'          : 'Video',
                'mediaObjective'      : mediaObjective || '',
                'mediaCategory'       : mediaCategory || '',
                'mediaVertical'       : mediaVertical || '',
                'mediaPublishDate'    : mediaPublishDate || '',
                'mediaPublisher'      : mediaPublisher || '',
                'mediaPersona'        : mediaPersona || '',
                'mediaSource'         : mediaSource || '',
                'mediaPlayerName'     : 'YouTube',
                'videoLengthTotal'    : videoLengthTotal,
                'videoLengthViewed'   : videoLengthViewed,
                'videoProgressPercent': progressPercent
            }
        );*/ //todelete
    },

    trackPausedVideo = function(event) {
        var player  = event.target,
        playerDomData    = event.target.i.dataset,
        videoId = player.getVideoData().video_id,
        mediaFriendlyName= playerDomData?.mediafriendlyname || '',
        videoLengthTotal = Math.round(event.target.getDuration());

        att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataVideo.pauseAction(
            event,            
            {
                videoID:videoId,
                friendlyName: mediaFriendlyName,
                totalLength: videoLengthTotal,
            }
        ));        

    },
    /** dependency: ddo object */
    trackOnEnd = function(event) {        
            var player           = event.target,
            playerDomData    = event.target.i.dataset,
            videoLengthTotal = Math.round(event.target.getDuration()),
            videoId          = player.getVideoData().video_id,
            mediaFriendlyName= playerDomData?.mediafriendlyname || '',
            mediaType        = playerDomData?.mediatype || '',
            mediaClass       = playerDomData?.mediaclass || '',
            mediaSeriesName  = playerDomData?.series || '',
            mediaObjective   = playerDomData?.objective || '',
            mediaCategory    = playerDomData?.category || '',
            mediaVertical    = playerDomData?.vertical || '',
            mediaPublisher   = playerDomData?.publisher || '',
            mediaPersona     = playerDomData?.persona || '',
            mediaSource      = playerDomData?.source || '',
            mediaPublishDate = playerDomData?.publishdate || '';             
         /*att.entbus.track.ddo.pushEvent('video', 'Video_Update', 
            {
                'successFlag'         : '1',
                'statusCode'          : '0',
                'errorType'           : 'Success_Admit',
                'linkName'            : 'Watch Video',
                'linkPosition'        : 'body',
                'linkDestinationUrl'  : window.location.href,
                'mediaId'             : videoId,
                'mediaFriendlyName'   : mediaFriendlyName || '',
                'mediaSeriesName'     : mediaSeriesName || '',
                'videoType'           : 'VOD', // Stream, VOD, Live, Download, Clip
                'mediaType'           : mediaType || '',
                'mediaClass'          : mediaClass || '',
                'mediaObjective'      : mediaObjective || '',
                'mediaCategory'       : mediaCategory || '',
                'mediaVertical'       : mediaVertical || '',
                'mediaPublishDate'    : mediaPublishDate || '',
                'mediaPublisher'      : mediaPublisher || '',
                'mediaPersona'        : mediaPersona || '',
                'mediaSource'         : mediaSource || '',
                'mediaPlayerName'     : 'YouTube',
                'videoLengthTotal'    : videoLengthTotal,
                'videoLengthViewed'   : videoLengthTotal,
                'videoProgressPercent': '100' // <milestone percentage>',
            }
        );*/ //todelete
        if(!videoCompleted) {
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataVideo.completeAction(
                {
                    videoID: videoId,
                    friendlyName: mediaFriendlyName,
                    totalLength: { 
                        value: videoLengthTotal
                    },
                    mediaDetails: {
                        videoType: 'VOD',
                        type: 'VOD',
                        class: mediaClass,
                        objective: mediaObjective,
                        category: mediaCategory,
                        vertical: mediaVertical,
                        publishDate: mediaPublishDate,
                        publisher: mediaPublisher,
                        persona: mediaPersona,
                        format: '',
                        contentAuthor: ''
                    }
                }
            )); 
            videoCompleted = true;
        }
        event.target.isStartVideo = false;
    },

    /**
     * @dependency ddo object
     */
    trackOnPlay = function(event) {
        var player,
            videoId,
            videoLengthTotal,
            playerDomData     = event.target.i.dataset,
            mediaType         = playerDomData?.mediatype,
            mediaClass        = playerDomData?.mediaclass,
            mediaSeriesName   = playerDomData?.series,
            mediaObjective    = playerDomData?.objective,
            mediaCategory     = playerDomData?.category,
            mediaVertical     = playerDomData?.vertical,
            mediaPublishDate  = playerDomData?.publishdate,
            mediaPersona      = playerDomData?.persona,
            mediaPublisher    = playerDomData?.publisher,
            mediaSource       = playerDomData?.source,
            mediaFriendlyName;

        if (!event.target.isStartVideo) {     
            if (!videoCompleted) { 
            event.target.isStartVideo = true;
            player               = event.target;
            videoId              = player.getVideoData().video_id,
            mediaFriendlyName    = playerDomData?.mediafriendlyname;
            player.durationCheck = setInterval(function() {
                /** Until player ready getDuration value will be 0 */
                if (typeof att.adobeDataLayer !== 'undefined' && player.getDuration() !== 0) {
                    videoLengthTotal = Math.round(player.getDuration());
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataVideo.startAction(event, 
                        {
                            'mediaId'           : videoId,
                            'mediaFriendlyName' : mediaFriendlyName || '',
                            'videoLengthTotal'  : videoLengthTotal,
                            // 'successFlag'       : '1',
                            // 'statusCode'        : '0',
                            // 'errorType'         : 'Success_Admit',
                            // 'linkName'          : 'Watch Video',
                            // 'linkPosition'      : 'body',  // Body, Marquee, Carousel
                            // 'linkDestinationUrl': window.location.href,                            
                            // 'mediaSeriesName'   : mediaSeriesName || '',
                            // 'videoType'         : 'VOD', // Stream, VOD, Live, Download, Clip
                            // 'mediaType'         : mediaType || '',
                            // 'mediaClass'        : mediaClass || '',
                            // 'mediaObjective'    : mediaObjective || '',
                            // 'mediaCategory'     : mediaCategory || '',
                            // 'mediaVertical'     : mediaVertical || '',
                            // 'mediaPublishDate'  : mediaPublishDate || '',
                            // 'mediaPublisher'    : mediaPublisher || '',
                            // 'mediaPersona'      : mediaPersona || '',
                            // 'mediaSource'       : mediaSource || '',
                            // 'mediaPlayerName'   : 'YouTube',                            
                        }
                    ));
                    clearTimeout(player.durationCheck);

                    var complete25 = false;
                    var complete50 = false;
                    var complete75 = false;
                    player.onProgress = setInterval(function() {
                        if(((100* player.getCurrentTime())/videoLengthTotal)>=25 && !complete25){
                            complete25 = true;
                            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataVideo.complete25Action());
                        }
                        if(((100* player.getCurrentTime())/videoLengthTotal)>=50 && !complete50){
                            complete50 = true;
                            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataVideo.complete50Action());
                        }
                        if(((100* player.getCurrentTime())/videoLengthTotal)>=75 && !complete75){
                            complete75 = true;
                            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataVideo.complete75Action());
                        }
                        if(((100* player.getCurrentTime())/videoLengthTotal)>=100){
                            clearTimeout(player.onProgress);
                        } 

                    }, 1000);
                }
            }, 250);

            }
        }
    },

    /**
     * [onError description]
     * @statusCode Error Codes passed through event.data
     * 2 â€“ The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.
     * 5 â€“ The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.
     * 100 â€“ The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.
     * 101 â€“ The owner of the requested video does not allow it to be played in embedded players.
     * 150 â€“ This error is the same as 101. It's just a 101 error in disguise!
     * @errorType values
     * Success_Admit â€“ sent on every â€œnon-errorâ€ event
     * Failure_Metadata â€“ SOLR database is unavailable 
     * Failure_ID_Invalid â€“ Video ID is invalid
     * Failure_ID_Expired â€“ Video ID is expired (EOL)
     * Failure_Asset â€“ A video resource (video file/image/thumbnail/caption) is missing
     * Failure_Playback â€“ Catch all for any other playback related issues
     * TODO: write logic to set errorType
     * Refer: https://developers.google.com/youtube/iframe_api_reference
     */
    onError = function (event) {
        var player           = event.target,
            playerDomData     = event.target.i.dataset,
            videoId          = player.getVideoData().video_id,
            mediaFriendlyName= playerDomData?.mediafriendlyname,
            statusCode       = event.data,
            mediaType        = playerDomData?.mediatype,
            mediaClass       = playerDomData?.mediaclass,
            mediaSeriesName  = playerDomData?.series,
            mediaObjective   = playerDomData?.objective,
            mediaCategory    = playerDomData?.category,
            mediaVertical    = playerDomData?.vertical,
            mediaPersona     = playerDomData?.persona,
            mediaPublisher   = playerDomData?.publisher,
            mediaSource      = playerDomData?.source,
            mediaPublishDate = playerDomData?.publishdate;

      
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(event, 
            {
                'successFlag'      : '0',
                'statusCode'       : -2, // statusCode or if empty, pass actual error message through 'statusMessage'
                'errorType'        : 'Failure_Playback',
                'linkName'         : 'Watch Video',  // TODO: link label text
                'linkPosition'     : 'body',
                'linkDestinationUrl':window.location.href,
                'mediaId'          : videoId,
                'mediaFriendlyName': mediaFriendlyName || '',
                'mediaSeriesName'  : mediaSeriesName || '',
                'videoType'        : 'VOD', // Stream, VOD, Live, Download, Clip
                'mediaType'        : mediaType || '',
                'mediaClass'       : mediaClass || '',
                'mediaObjective'   : mediaObjective || '',
                'mediaCategory'    : mediaCategory || '',
                'mediaVertical'    : mediaVertical || '',
                'mediaPublishDate' : mediaPublishDate || '',
                'mediaPublisher'   : mediaPublisher || '',
                'mediaPersona'     : mediaPersona || '',
                'mediaSource'      : mediaSource || '',
                'mediaPlayerName'  : 'YouTube'
            }
        ));
    },

    /**
     * isOverlayPlayer Determine in page or overlay player
     * @todo This logic based on html structure; May need to refine further
     * @param  {Object}  event current player - passed by youtube library
     * @return {const PLAYER_POSITION}       IN_PAGE | OVERLAY
     */
    isOverlayPlayer = function(event) {

        var playerType = PLAYER_POSITION.IN_PAGE;

        if($(event.target.a).parents('#vidlightbox').length)
            playerType = PLAYER_POSITION.OVERLAY;

        return playerType;

    },

    /** 
     * @deprecated method (7/4/2019)
     */
    getMinutesSeconds = function(videoDuration) {

        var videoTimes,
            videoLengthMinutes,
            videoLengthSeconds,
            videoLengthTotal = "0";

        try {
            videoLengthTotal   = videoDuration / 60;
            videoTimes         = videoLengthTotal.toString().split(".");
            videoLengthMinutes = videoTimes[0];
            videoLengthSeconds = "." + videoTimes[1];
            videoLengthSeconds = Math.round(60*videoLengthSeconds);
            videoLengthTotal   = videoLengthMinutes + "m" + videoLengthSeconds + "s";
        } catch (err) {
            // left intentionall blank
        }

        return videoLengthTotal;

    },

    /**
     * @name createPlayers
     * @param  {[type]} options options.players should contain DOM element of player's containers
     * @example
     * options.players DOM element must contains data attribute for width, height, src
     * <div class="youtube-player"
     *    data-width="640" data-height="360"
     *    data-src="M7lc1UVf-VE"
     *    frameborder="0">
     * </div>
     */
    createPlayers = function(options) {

        var videoId,
            player,
            $currentPlayer,
            playerType;

        if(options.players.length) {

            options.players.map(function(index, el) {

                $currentPlayer = $(options.players[index]);
                videoId = $currentPlayer.data('src');

                player = new YT.Player(el, {
                    width: $currentPlayer.data('width') || defaults.width,
                    height: $currentPlayer.data('height') || defaults.height,
                    videoId: videoId,
                    playerVars: {
                        'rel': 0,
                        'showinfo': 0
                    },
                    events: {
                        'onError': onError,
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
                players.push(player);
                
                window.onbeforeunload = function () {
                     if ($('.video-overlay').is(':visible')) trackOnClose(player);
                }
                
            });

        }

    },

    /**
     * Public method
     */
    getPlayers = function() {

        return players;

    },

    /**
     * setPlayers used to set youtube player on the fly
     * Public method
     * @param {String} eleClass className of the DOM element (omit .) eg overlay-youtube-player
     * @param {Object} options  eg. {autoRun : true | false}
     */
    setPlayers = function(eleClass, options) {
        defaults.autoRun = options.autoRun || false;
        createPlayers({
            players: $('.'+eleClass)
        });
    },

    /**
     * Public method
     */
    removePlayer = function (player) {
        videoCompleted = false;
        player.stopVideo();
        if (player.getPlayerState() !== YT.PlayerState.ENDED) trackOnClose(player);
        players.map(function(el, index){
            if(paramsToJson(players[index].getVideoUrl().split('?')[1]).v === paramsToJson(player.getVideoUrl().split('?')[1]).v)
                players.splice(index, 1);
        });
    },

    /**
     * stopAll Stops all the videos playing
     * Public method
     * @example
     * $('.close-button').on('click', function(){
     *     att.entbus.ytPlayer.stopAll();
     * })
     *
     */
    stopAll = function() {
        var players = getPlayers();
        if(players.length) {
            players.map(function(el, index) {
                players[index].stopVideo();
            });
        }
    };
    
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    att.util.loadScript(urls.youtubeApi, scriptLoadedCallback);

    /**
     * Public method
     * @type {Object}
     * @example
     * att.entbus.ytPlayer.getPlayers()[0].playVideo();
     * att.entbus.ytPlayer.getPlayers()[0].pauseVideo();
     * @returns {Array} Reference to initialised Youtube players
     */
    module = {

        getPlayers  : getPlayers,
        setPlayers  : setPlayers,
        stopAll     : stopAll,
        removePlayer: removePlayer

    };

    Namespacer('att.entbus.ytPlayer', module);

})(jQuery.noConflict(), window);
$jq10 = jQuery.noConflict();
$jq10(document).ready(function () {

	function hideMenu() {
        $jq10("#side_wrapper").hide(function() {
            $jq10("#side_wrapper").css({"border-left":"none"});
            $jq10("#header .logo").css("display","block");
            $jq10("#header .segment").css("display","block");
            
            $jq10('#primary-wrapper').css({ "max-width":"100%"});
            if ((window.innerWidth || document.documentElement.clientWidth) <= 767) {
                //$jq10("#header").css("max-width","480px");
            } else if ((window.innerWidth || document.documentElement.clientWidth) <= 1023) {
                //$jq10("#header.resp-header").css("max-width","768px");
            } else {
                $jq10("#header.resp-header").css("max-width","980px");
                $jq10("#header.fluid-header").css("max-width","1280px");
            }
            $jq10(".widget-button-holder").show();
        }); 
    }
 		//footer legal note - year
		var today = new Date();
		$jq10("span#footer-year").text(" "+today.getFullYear());												  

    $jq10(window).resize(function(){
        if ((window.innerWidth || document.documentElement.clientWidth) >= 1200) {
            hideMenu();
            $jq10(".resource-nav-cont").show();
        } else {
            $jq10(".resource-nav-cont").hide();
            if ($jq10("#icon-menu").hasClass('menu-icon')) {
                if ((window.innerWidth || document.documentElement.clientWidth) <= 767) {
                    //$jq10("#header").css("max-width","480px");
                } else if ((window.innerWidth || document.documentElement.clientWidth) <= 1023) {
                    //$jq10("#header.resp-header").css("max-width","768px");
                } else {
                    $jq10("#header.resp-header").css("max-width","980px");
                    $jq10("#header.fluid-header").css("max-width","1280px");
                    $jq10("#header").css("float","inherit");

                }
            } else if ((window.innerWidth || document.documentElement.clientWidth) <= 767) {
                
            } else if ((window.innerWidth || document.documentElement.clientWidth) <= 1023) {

            }
        }
        if ((window.innerWidth || document.documentElement.clientWidth) <= 479) {
            $jq10("#formFrame .bottom-form").css("height","650px");
        } else if ((window.innerWidth || document.documentElement.clientWidth) <= 767) {
            $jq10("#formFrame .bottom-form").css("height","425px");
        } else {
            $jq10("#formFrame .bottom-form").css("height","375px");
        }
    });

	/* ENTBUS 761 */
	//Smooth scrolling to onpage ID code
    // excluding href just contain only # and href contains pattern /#/
    $jq10('a[href*="#"]:not([href="#"]):not([href*="/#/"]):not([data-toggle="collapse"]):not([href*="topic#"]):not([href*=".jsp#"]):not(".prevent-scroll")')
    .filter(function (index, ele) {
        var domain = $jq10(this).attr('href');
        // excluding #hash || external domain || business center sites
        return ($jq10(this).parents('.business-center-site, .msites') === 0 && (domain.indexOf('#') === 0 || domain.indexOf(window.location.hostname) > -1));
    })
    .click(function(e) {
        e.preventDefault();
        // handling the logic in sticky-nav component in solutions
        if(window.location.href.indexOf('/learn/') < 0) return false;

        var edgeToedgeCampaignPageUrl = 'Edge-to-Edge';
        if (location.href.indexOf(edgeToedgeCampaignPageUrl) < 0 && location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $jq10(this.hash);
            target = target.length ? target : $jq10('[name=' + this.hash.slice(1) +']');
			
			var clickeditem = $jq10(this).parent('li').index();
            if (target.length) {
                var targetOffset=target.offset().top;
					if ($jq10(".module-page-nav").hasClass("sticky")) {
						targetOffset = targetOffset - 95;
                    } else if ($jq10(".header-wrapper").hasClass("sticky")) {
                        targetOffset =  targetOffset - 55;
					} else if ($jq10(".module-page-nav").length) {
						targetOffset = targetOffset - 240;
                    } else {
                        targetOffset = targetOffset - 110;
                    }

                    // tweak for inpage sticky nav
                    if($jq10(".l1-sticky-nav, .l2-sticky-nav").hasClass("stick")) {
						targetOffset = targetOffset - 100;
                    } else {
						if(clickeditem === 2){
							targetOffset = targetOffset - 70;
						} else{
							targetOffset = targetOffset - 102;
						}
                    }

                    $jq10('html,body').animate({
                        scrollTop: targetOffset
                    }, 1000);
                e.preventDefault();
                return false;
            }
        }
    });

    /* /ENTBUS 761 */
	
    //contact button widget and Get Quote Button on click
    $jq10(function(){
        var isMobile;
        var bottomFormLen = 0;
        $jq10("#contact-button, .get-quote-btn.btn")
            .filter(function(){ 
                // DirectTV page Get Quote button launch lead form;
                // if .get-quote-btn.btn has href has value then page scrolls to that section 
                // which is taken care by other part of js code
                if($jq10(this).attr('class')=='get-quote-btn btn' && this.hash.length) {
                    return false;
                }
                return true;
            })
            .click(function(event) {
            event.preventDefault();
            //setting the height of 'html' because in formFrameAdjustHt() it checks the height of this element
                $jq10('#formFrame').contents().find('html').css("height","518px");
            //check if thank you message is being shown
            checkIfMobile();
            if(typeof att.adobeDataLayerManager !== 'undefined') {
                att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataOnClick(event, {'slotFriendlyName':'contact-button','contentFriendlyName':'Contact Button','linkName':'Contact Button','linkDestinationUrl':'Contact Form', 'type': 'others'}));
            }
        });

        $jq10(window).resize(function(){
            if($jq10("#formFrame.right-rail").is(':visible'))
            {
                checkIfMobile();
            }
            formFrameAdjustHt('first',1);
        });

        function checkIfMobile(){
            //isMobile=window.innerWidth<768;
            if ((window.innerWidth || document.documentElement.clientWidth) < 768) { isMobile=true; }else{isMobile=false;}
            if (isMobile) {
                if (bottomFormLen == 0)
                    bottomFormLen = $jq10("#bottom-form").offset().top;
                $jq10('html, body').animate({
                    scrollTop: bottomFormLen
                }, function(){ formFrameAdjustHt('first',1); });
            } else {
                setContactModal();
            }
            if ($jq10("#formFrame").contents().find('#mainwindow').is(":visible")) {
                $jq10("#formFrame").attr("src", $jq10("#iotLeadFormUrl").val());
                //$jq10('#formFrame').contents().find('html').css("height","518px");              
            }
        }

        function setContactModal(){

            var timer, 
                interval  = 500,
                timeout   = 3000,  // 3 seconds
                timeSpent = 0,
                classes   = {
                    bottomForm: 'bottom-form',
                    rightRail: 'right-rail'
                },
				dtvForm,
                $formFrame = $jq10('#formFrame'),
                $formFrameContents = $formFrame.contents();

            $formFrame.css({
                display : 'inline',
                position: 'fixed',
                top     : '0px',
                right   : '0px',
                bottom  : '0px',
                left    : '0px',
                margin  : 'auto'
            });

            if(isMobile){
                $formFrame.css({
                    height  : '100%',
                    width   : '100%'
                });

            } else {
                $formFrame.css({
                    height  : '518px',
                    width   : '80%',
                    maxWidth: '620px'
                });
            }
            var test=$formFrame.css('height');

            // poll until iframe loads
                if($formFrame.contents().find('body').length > 0 && $formFrame.contents().find('#form-header').length > 0) {
                    $formFrame.contents().find('body')
                        .removeClass(classes.bottomForm)
                        .addClass(classes.rightRail);
                       }

            $formFrame
                .removeClass(classes.bottomForm)
                .addClass(classes.rightRail);

            formFrameAdjustHt('first',1);
            makeButtonActive("contact-button");
            maskWidgetsModal();

			dtvForm = ($formFrame.contents().find('#formType').val() == "DirecTV");
			$formFrame.css('max-height', (dtvForm)? "610px" : "518px");
			$formFrame.css('height', (dtvForm)? "93%" : "518px");
			$formFrame.css('top', (dtvForm)? "45px" : "0px");
        }

    });
    

	/* ENTBUS 761 */
	/* share this code moved to respective component */
	/* /ENTBUS 761 */


    //foresee overlay modal
    $jq10("#foresee-button").click(function(e) {
        e.preventDefault();
        maskWidgetsModal();
        $jq10("#foresee-modal").show();
        makeButtonActive("foresee-button");
    });

    $jq10(".foresee-modal-close").click(function() {
        unmaskWidgetsModal();
        $jq10("#foresee-modal").hide();
        makeButtonInactive("foresee-button");
    });

    function makeButtonActive(el)
    {
        var elm=$jq10("#"+el);
        if(!elm.hasClass('active'))
        {
            elm.addClass('active');
        }
    }
    function makeButtonInactive(el)
    {
        var elm=$jq10("#"+el);
        if(elm.hasClass('active'))
        {
            elm.removeClass('active');
        }
    }

    // masks the page when widget modal appears
    function maskWidgetsModal()
    {
        if(!$jq10('#widgetMaskHolder').hasClass('noScroll'))
        {
            $jq10("#widgetMaskHolder").addClass('noScroll');
        }
        if($jq10("#content").find('#overlay-widgets-mask').length==0)
        {
            $jq10("#content").append('<div id="overlay-widgets-mask"></div>');
        }
        
    }
    // unmasks the page when widget modal disappears
    function unmaskWidgetsModal()
    {
        if($jq10('#widgetMaskHolder').hasClass('noScroll'))
        {
            $jq10("#widgetMaskHolder").removeClass('noScroll'); 
        }
        if($jq10("#content").find('#overlay-widgets-mask').length>0)
        {
            $jq10('#overlay-widgets-mask').remove();
        }
            
    }

    //making the widgets invisible when any of the following elemets are visible    
    $jq10(function(){
        var isVisibleForesee,isVisibleBottomForm,isVisibleSocialComp;
        if ($jq10('#foresee-component').length) {
            $jq10('#foresee-component').bind('inview', function(e,isVisible,topOrBottomOrAll){
                 isVisibleForesee=isVisible;
                 checkifInview();
            });
        }
        if ($jq10('#bottom-form').length) {
            $jq10('#bottom-form').bind('inview', function(e,isVisible,topOrBottomOrAll){
                isVisibleBottomForm=isVisible;
                checkifInview();
            });
        }
        if ($jq10('#shareInviewContainer').length) {
            $jq10('#shareInviewContainer').bind('inview', function(e,isVisible,topOrBottomOrAll){
                isVisibleSocialComp=isVisible;
                checkifInview();
            });
        }

        function checkifInview()
        {
			var isMobile = ((window.innerWidth || document.documentElement.clientWidth) < 768)? true : false;
			
			if (!isMobile) {	
				
				if(!isVisibleForesee && !isVisibleBottomForm && !isVisibleSocialComp)


				{
					showWidgetButtons();


					showWidgetHolder();
				}
				if(isVisibleForesee || isVisibleBottomForm || isVisibleSocialComp)


				{
					hideWidgetButtons();


					hideWidgetHolder();
				}
			} else{
				
				if(isVisibleForesee || isVisibleBottomForm || isVisibleSocialComp){
					hideWidgetButtons();
					hideWidgetHolder();
				} else{
					if($jq10('#widget-buttons-sh').hasClass('open')){
						showWidgetButtons();
						hideWidgetHolder();
					} else{
						showWidgetButtons();
						showWidgetHolder();
					}
				}
			
			}
        }
		
		function hideWidgetHolder()
        {
            $jq10(".widget-button-holder").hide();
			
		}
		function showWidgetHolder()
        {
            $jq10(".widget-button-holder").show();
			
		}
		
        function hideWidgetButtons()
        {
            //$jq10(".widget-button-holder").hide();
            $jq10("#widget-buttons-sh").hide();
            $jq10("#formFrame").removeClass("right-rail");
            $jq10("#formFrame").addClass("bottom-form");
            $jq10("#formFrame").css("position","relative");
            $jq10("#formFrame").css("display","block");
            $jq10("#formFrame").css("width","100%");
            $jq10("#formFrame").css("max-width","980px");
            $jq10("#formFrame").css("margin","0px auto");
            $jq10("#formFrame").css("top","0px");6
            $jq10("#formFrame").css("border","0px");
            formFrameAdjustHt("first",1);
            unmaskWidgetsModal();
            $jq10("#foresee-modal").hide();
            if($jq10("#social-component").hasClass('social-right-rail'))
                $jq10("#social-component").removeClass("social-right-rail").addClass("social-bottom");
            $jq10("#formFrame").contents().find('body').removeClass("right-rail");
            $jq10("#formFrame").contents().find('body').addClass("bottom-form");
            $jq10("#formFrame").contents().find('#comments-div').css("clear", "both");
            if ($jq10("#formFrame").contents().find('#mainwindow').is(":visible")) {
                $jq10("#bottom-form").css("min-height","175px");
                $jq10("#formFrame").contents().find('body').css("background-color","#067ab4");
                $jq10("#formFrame").css("height","175px");
            }
            //$jq10("#social-component").removeClass("social-right-rail");
            //$jq10("#social-component").addClass("social-bottom");
        }
        function showWidgetButtons()
        {
            //$jq10(".widget-button-holder").show();
            $jq10("#widget-buttons-sh").show();
            $jq10("#formFrame").hide();
            $jq10("#formFrame").removeClass("bottom-form");
            $jq10("#formFrame").addClass("right-rail");
            $jq10("#formFrame").contents().find('body').removeClass("bottom-form");
            $jq10("#formFrame").contents().find('body').addClass("right-rail");
            $jq10("#formFrame").contents().find('#comments-div').css("clear", "none");
            $jq10("#formFrame").css("position","fixed");
            $jq10("#formFrame").css("width","300px");
            $jq10("#formFrame").css("right","0px");
            $jq10("#formFrame").css("top","100px");
            $jq10("#formFrame").css("height","500px");
            unmaskWidgetsModal();
            if ($jq10("#formFrame").css("display") != "none") {
                formFrameAdjustHt("first",1);                
            }
            if ($jq10("#formFrame").contents().find('#mainwindow').is(":visible")) {
                $jq10("#formFrame").css("height","175px");
                $jq10("#formFrame").contents().find('body').css("background-color","#e8e8e8");
            }
        }
        
    });

    // onpage video
    if ($jq10('.onpage-video').length) {
        $jq10('.onpage-video').each(function(index) {
            var onPageChild = $jq10(this).find(".youtube-player");
            loadPlayer(onPageChild.attr('id'), onPageChild.attr('data-width'),onPageChild.attr('data-height'),onPageChild.attr('data-image'),onPageChild.attr('data-path'),onPageChild.attr('data-cc-file'),'html5','false','true');
        });
    }
	
});

	function checkLeadFormInput() {
		$jq10("#formFrame").contents().find(".form-textbox, .form-dropdown").on('input', function (e) {
			enableSubmit();
		});
	}

	function enableSubmit() {
		var formfilled = true;
		$jq10("#formFrame").contents().find(".form-textbox, .form-dropdown").not(':hidden').each(function (e) {
			if ( $jq10(this).val() === "") {
				formfilled = false;
			}
		});
		var submitbtn = $jq10("#formFrame").contents().find(".css-button input");
		if (formfilled) {
			submitbtn.removeAttr("disabled");
			submitbtn.removeClass("gray").addClass("blue");
		} else {
			submitbtn.prop("disabled", "true");
			submitbtn.removeClass("blue").addClass("gray");
		}
	}

function loadPlayer(pDivId, pWidth, pHeight, pImage, pURL, pSRT, pPrimary, pAutoStart, pSharingEnabled) {
var skinFile = "/library/media/player/skins/att/video.xml" ;
var playerHeight = pHeight ;
var playerWidth = pWidth ;
var currentDuration = null ;
var currentTime = null;
var isTenSeconds = false ;
var isMidPoint = false ;
var isStartVideo =  false ;
var videoLengthTotal = null;
var isQuarter = false;
var isMilestone3 = false ;
var autoStart = "1";

if (pAutoStart === "false") autoStart = "0";



}

    function getMinutesSeconds(videoDuration){ 
        var videoLengthTotal = "0";
        try {
            videoLengthTotal = videoDuration/60;
            var videoTimes = videoLengthTotal.toString().split(".");
            var videoLengthMinutes = videoTimes[0];
            var videoLengthSeconds = "." + videoTimes[1];
            videoLengthSeconds = Math.round(60*videoLengthSeconds);
            videoLengthTotal= videoLengthMinutes + "m" + videoLengthSeconds + "s";
        } catch (err) {
        }
        return videoLengthTotal;
    }



!function(t){function e(){var e,i,n={height:a.innerHeight,width:a.innerWidth};return n.height||(e=r.compatMode,(e||!t.support.boxModel)&&(i="CSS1Compat"===e?f:r.body,n={height:i.clientHeight,width:i.clientWidth})),n}function i(){return{top:a.pageYOffset||f.scrollTop||r.body.scrollTop,left:a.pageXOffset||f.scrollLeft||r.body.scrollLeft}}function n(){var n,l=t(),r=0;if(t.each(d,function(t,e){var i=e.data.selector,n=e.$element;l=l.add(i?n.find(i):n)}),n=l.length)for(o=o||e(),h=h||i();n>r;r++)if(t.contains(f,l[r])){var a,c,p,s=t(l[r]),u={height:s.height(),width:s.width()},g=s.offset(),v=s.data("inview");if(!h||!o)return;g.top+u.height>h.top&&g.top<h.top+o.height&&g.left+u.width>h.left&&g.left<h.left+o.width?(a=h.left>g.left?"right":h.left+o.width<g.left+u.width?"left":"both",c=h.top>g.top?"bottom":h.top+o.height<g.top+u.height?"top":"both",p=a+"-"+c,v&&v===p||s.data("inview",p).trigger("inview",[!0,a,c])):v&&s.data("inview",!1).trigger("inview",[!1])}}var o,h,l,d={},r=document,a=window,f=r.documentElement,c=t.expando;t.event.special.inview={add:function(e){d[e.guid+"-"+this[c]]={data:e,$element:t(this)},l||t.isEmptyObject(d)||(l=setInterval(n,250))},remove:function(e){try{delete d[e.guid+"-"+this[c]]}catch(i){}t.isEmptyObject(d)&&(clearInterval(l),l=null)}},t(a).bind("scroll resize scrollstop",function(){o=h=null}),!f.addEventListener&&f.attachEvent&&f.attachEvent("onfocusin",function(){h=null})}(jQuery);


/* ============================= */
// Days Difference Function
/* ============================= */

(function($) {
     $.fn.daysDiff = function() {
        var countContainer = this;
        
        $(countContainer).addClass('countContainer');
        
        $(this).append( ' <span class="countcont days-no"></span><span class="countcont"> until <span class="shut-date orng"></span></span>' );
        
        var enddate = $(this).data( "enddate" );
        
        
        // Find Today's Date
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();

        var start =     d.getFullYear() + '/ ' +
                        ((''+month).length<2 ? '0' : '') + month + '/ ' +
                        ((''+day).length<2 ? '0' : '') + day;
                        
        
        var start = new Date(start);
        var end = new Date(enddate);
        
        var diff = end - start;
        var daysDiff = Math.floor((end - start + 1) / (1000 * 60 * 60 * 24));
        
        
        if(daysDiff > 1){
            $('.days-no').html('<span class="days">'+ daysDiff +'</span>'+ ' <small>DAYS</small>');
        } else{
            $('.days-no').html('<span class="days">'+ daysDiff +'</span>'+ ' <small>DAY</small>');
        }
        
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        var dd=end.getDate();
        var mm=monthNames[end.getMonth()];
        var yy=end.getFullYear();
        
        var shutDate = (mm+" "+dd+", "+yy);

        $('.shut-date').html(shutDate);
        
     }

}( jQuery ));

$jq10(document).ready(function () {
    $jq10('.daily-counter').daysDiff();
    $jq10("#click_chat").on("click",function(e) {
        e.preventDefault();
        Inq.fireCustomEvent("launchDSAChat")
    });
        
    $jq10("#VSE_chat").on("click",function(e) {
        e.preventDefault();
        window.WhisbiButton.openWidget()
    });    
        
        
});


// TODO: included in modular.js to resolve the issue temporarily. This needs to be moved to appropriate component
function formFrameAdjustHt(status, options) {
    // if senario is not passed to make sure default case executes
    var scenario = options || 999,
        $formFrame = $jq10('#formFrame.bottom-form');
    switch(scenario) {
            // desktop comment is open
        case 1:
            if(status=="first")
            {
                // if((window.innerWidth || document.documentElement.clientWidth) < 768) {
                // $formFrame.css('height', '100%');
                //} else {
                //$formFrame.css('height', $formFrame.contents().find('#form-header').innerHeight());
                //$formFrame.css('height', $formFrame.contents().find('#formHeightCalc').innerHeight());
                $formFrame.css('height',$formFrame.contents().find('.widget-header').innerHeight() + $formFrame.contents().find('.widget-content').innerHeight()+20);
                //}
            }
            else if(status=="open")
            {
                $formFrame.css('height',$jq10('#formFrame.bottom-form').height()+40+'px');
            }
            else if(status=="close")
            {
                $formFrame.css('height',$jq10('#formFrame.bottom-form').height()-40+'px');
            }         
            break;
        default:
            var paddinght = (status=="textarea")? 30: 0;
            var framehtmlHt = $jq10('#formFrame').contents().find('html').height() + paddinght;
            $jq10('#formFrame').css("height", framehtmlHt + "px");      

            if ($jq10('#formFrame').css("position") == "fixed") {
                var fheight = $jq10('#formFrame').height();
                if (status == "true" || fheight > 550) {
                    $jq10('#formFrame').css("top", ((fheight > 660) ? 0 : (660 - fheight)) + "px");
                    $jq10('#formFrame').css("z-index", "1001");
                }
                $jq10('#formFrame').contents().find('#commentsfield').css("max-height", "150px");
            } else {
                //$jq10('#bottom-form').css("height", framehtmlHt + "px");
            }
            break;
    }
    
}

/** Widgets **/

var att=att||{};
att.entbus=att.entbus||{};
att.entbus.widgets=(function($){

var selector={
widgetButtonsShowHide:"#widget-buttons-sh",
widgetsButtonsHolder:".widget-button-holder",
widgetsButton:".widget-button-holder .widget-button"
},
isMobile;


//set widgets according to screen size
function resetWidgets(){
	if(isMobile){
		var buttonWidth=$(selector.widgetsButton).width(),
		buttonMarginLeft=4,
		numberOfButtons=$(selector.widgetsButton).length;
		//set with of buttons holder
		var widthOfHolder=((buttonWidth+buttonMarginLeft)*numberOfButtons)+4;//four is to extend the white bg till the show hide button

		$(selector.widgetButtonsShowHide).css('right','0px');
		$(selector.widgetButtonsShowHide).removeClass('close open').addClass('open');
		$(selector.widgetsButtonsHolder).hide();
	}
	else{
		$(selector.widgetButtonsShowHide).css('right','-250px');
		$(selector.widgetsButtonsHolder).css('right','0px').css('opacity','1').css('width','70px');
	}
}

function checkScreenSize(){
	isMobile=window.innerWidth<768;
	resetWidgets();
}

checkScreenSize();

$(window).bind('resize',checkScreenSize);


$(function(){
att.entbus.widgets.events();
});


return{
events:function()
{
$(selector.widgetButtonsShowHide).bind('click', function(e){
	e.preventDefault();
	if($(this).hasClass('close')){


		$(this).removeClass('close').addClass('open');


		$(selector.widgetsButtonsHolder).css({display:'none', opacity: '0'});
	}
	else if($(this).hasClass('open')){


		$(this).removeClass('open').addClass('close');
		//$(selector.widgetsButtonsHolder).css({right:'9px',opacity:'0'});
		$(selector.widgetsButtonsHolder).css({display:'block', opacity:'1'});
	}
});
}
}

})(jQuery.noConflict());

;(function ($, window, document, undefined) {

    var module,
    isOpen = false,
    selector = {
        mask: '.primary-menu-mask',
        primaryMenu: '#header .business-unit.active',
        loginMenu: '#header .goto-container.active',
        sideWrapper: '#side_wrapper'
    };

    var bindEvents = function () {
        $(selector.mask).bind('click',function(){
            resetMenus();
        });
    },

    resetMenus = function () {
        att.entbus.goto.resetMenu();
        att.entbus.menu.resetMenu();
    },

    isAnyModalOpen = function () {

        // Assumes all the modal windows are configured through html with data-target
        var isAnyBootstrapModalOpen = function () {

            var modalIds = '', 
                isOpenBootstrap = false,
                modalLength = $('[data-target]').length;

            // Gather all modal window container ids in the page
            $('[data-target]').each(function(index) {
                modalIds += $(this).data('target') + ((index !== modalLength-1) ? ', ' : '');
            });

            $(modalIds).each(function () {
                var $modal = $(this).data('bs.modal');
                if($modal && $modal.isShown) {
                    isOpenBootstrap = true;
                    return false;  // breaks the loop
                }
            });

            return isOpenBootstrap;

        };

        isOpen = false;

        if($(selector.loginMenu).length) isOpen = true;
        if($(selector.primaryMenu).length) isOpen = true;
        if(isAnyBootstrapModalOpen()) isOpen = true;

        return isOpen;
    },

    clearMask = function () {
        if(!isAnyModalOpen()) {
            $(selector.mask).hide();
            $(selector.sideWrapper).css({'overflow-y': 'auto'});
            $('html, body').removeClass('modal-open');
			//keyboard navigation
            $('.primary-menu .business-unit').attr('aria-pressed','false');																				  
        }
    },

    mask = function () {
        $(selector.mask).show();
        $('html, body').addClass('modal-open');
        $(selector.sideWrapper).css({'overflow-y': 'scroll'});
    },

    maskLogin = function () {
        mask();
    };

    module = {
        mask: mask,
        clearMask: clearMask
    };

    $(function () {
        bindEvents();
    });

    // att.entbus.menu.handleMask('MENU_LOGIN');
    $.extend(module, Namespacer('att.entbus.menu'));
    Namespacer('att.entbus.menu', module);

})(jQuery.noConflict(), window, document);

;(function($){

	/*
    @ param: selector as string
    @ element with passed selected element need to have fixed height
    */
    var ellipsizeMultiline = function(selector) {
        var elements = document.querySelectorAll(selector);
        Array.prototype.forEach.call(elements, clipWords);
    }
    var clipWords = function(element) {
        // Do nothing if DOM element missing data-title
        if(typeof element.dataset.title === 'undefined') return;
        var wordsArray = element.dataset.title.split(' ');
		element.innerHTML = element.dataset.title;
        while(element.scrollHeight > element.offsetHeight){
        	wordsArray.pop();
        	element.innerHTML = wordsArray.join(' ') + ' ...';
    	}
	}

    $(function(){
        $(window).bind('resize', function() {
            ellipsizeMultiline('.item-list .tile-text');
            ellipsizeMultiline('.load-more .tile-text');
        });
    });

    var module = {
        ellipsizeMultiline: ellipsizeMultiline
    };

	Namespacer('att.entbus.ellipse', module)

})(jQuery.noConflict());
/**
 * isTrackingLoaded used to determin tracking.js loaded or not
 * This has been resolved in tracking.js
 */
var att = att || {};
att.isTrackingLoaded = jQuery.Deferred();

/**
 * Cludo search implementation
 */
;(function ($, window, document, undefined) {

    var CludoSearch,
    cludoSettings = {
        customerId: 10000029,
        engineId: 10000674,
        searchUrl: '/search.html',
        endlessScroll: {stopAfterPage:1, resultsPerPage:10, bottomOffset: 700},
        language: 'en',
        richAutocomplete: true,
        searchInputs: ['cludo-search-form', 'cludo-mob-search', 'search-results-page-cludo-search-form'],
        customerTemplate: 'default 2020',
        focusOnResultsAfterSearch: true,
        enableRelatedSearches: true
    },
    selectors = {
        searchBox: '#q-cludo, #qm-cludo'
    },
    placeholderText = 'Search Business for ...',
    
    /**
     * Adding placeholder feature to search box
     */
    addPlaceholderText = function () {
        $(selectors.searchBox)
            .bind('focus', function(){
                if(this.value == placeholderText) this.value = '';
            })
            .bind('blur', function(){
                if(this.value == '') this.value = placeholderText;
            })
    },

    /**
     * Extends autocompleteMouseDownEvent, searchBoxInputKeydownEvent
     * from Cludo javascript library to attach tracking events
     * @requires header.js
     * @requires Cludo javascript library search-script.min.js
     */
    initAndExtendCludoEvents = function () {
        var options = {},
            oldFunctionReference_autocompleteMouseDownEvent,
            oldFunctionReference_searchBoxInputKeydownEvent,
            
            setFrom = function (e) {
                var e = e || window.event,
                    target = e.currentTarget || e.srcElement;
                // suggestion clicked
                if($(target).parents('div#search-results-page-cludo-search-form').length > 0) options.from = 'SEARCHPAGE';
                // desktop primary menu search box - desktop
                if($(target).parents('form#cludo-search-form').length > 0) options.from = 'DESKTOP';
                // desktop primary menu search box - mobile
                if($(target).parents('form#cludo-mob-search').length > 0) options.from = 'MOBILE';
            };
        
            // initialized here so that we can attach tracking handlers first
            CludoSearch = new Cludo(cludoSettings);
            CludoSearch.init();
            // extend library methods
            oldFunctionReference_autocompleteMouseDownEvent = CludoSearch.autocompleteMouseDownEvent;
            oldFunctionReference_searchBoxInputKeydownEvent = CludoSearch.searchBoxInputKeydownEvent;
            CludoSearch.searchBoxInputKeydownEvent = function (e) {
                var e = e || window.event,
                    target = e.currentTarget || e.srcElement;
                if($(window).width() > 1200) {
                    att.entbus.goto.resetMenu();
                    att.entbus.menu.resetMenu();
                }
                if(e.keyCode === this.helpers.ENTER) {
                    setFrom(e);
                    cludoSearchIconClickTracking(options);
                }
                oldFunctionReference_searchBoxInputKeydownEvent.call(CludoSearch);
            };
            CludoSearch.autocompleteMouseDownEvent = function (e) {
                cludoAutoCompleteLinkTracking(e);
                oldFunctionReference_autocompleteMouseDownEvent.call(CludoSearch, e);
            };
            // formResponse event tracking
            CludoSearch.customCallbackAfterSearch = function () {
                if(window.cludoResultsPageFormResponseTracking){
                    window.cludoResultsPageFormResponseTracking(CludoSearch);
                }
            }
    },

    bindEvents = function(){
        addPlaceholderText();
    },
    
    init = function () {
        $.getScript('//customer.cludo.com/scripts/bundles/search-script.min.js', function () {
            /**
             * initialised after tracking.js loaded so as tracking handlers attached first 
             */
            $.when(att.isTrackingLoaded).done(initAndExtendCludoEvents);
        });
    };

    $(function () {
        init();
        bindEvents();
    });

})(jQuery.noConflict(), window, document);
/** 
 * Modal component JavaScript implementation
 * @param $         jQuery JavaScript library
 * @param window    Global window object
 * @param document  Global document object
 * @param undefined Restoring undefined global object
 * @returns
 */
 ; (function ($, window, document, undefined) {

    var selectors = {
        modalContainer: '.att-modal-container',
        modalLink: '.modal-anchor',  //att-modal-link
        modalClose: '.att-modal-close',
        foreGround: '.att-modal-foreground',
        backGround: '.att-modal-background'
    },

        urls = {
            getDataByModalId: '/modal/api/pageload?modal='
        },

        // jQuery promise object
        dataFetched = $.Deferred(),

        fetchedData,

        /**
         * paramsToJson description
         * Parse abc=foo&def=%5Basf%5D&xyz=5 in five steps:
         * decodeURI: abc=foo&def=[asf]&xyz=5
         * Escape quotes: same, as there are no quotes
         * Replace &: abc=foo","def=[asf]","xyz=5
         * Replace =: abc":"foo","def":"[asf]","xyz":"5
         * Suround with curlies and quotes: {"abc":"foo","def":"[asf]","xyz":"5"}
         * which is legal JSON.
         * http://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object/8649003#8649003
         * @param  {String} params       eg. "abc=foo&def=[asf]&xyz=5"
         * @return {Object} json object  eg. {"abc":"foo","def":"[asf]","xyz":"5"}
         * @example
         * paramsToJson(players[index].getVideoUrl().split('?')[1])
         * TODO: Move to att.entbus.utils
         */
        paramsToJson = function (params) {
            var json = {};
            try {
                json = params ? JSON.parse('{"' + params.replace(/&/g, '","').replace(/=/g, '":"') + '"}',
                    function (key, value) { return key === "" ? value : decodeURIComponent(value) }) : {};
            }
            catch (e) { }
            return json;
        },

        closeModal = function (context) {
            $('.att-modal-container')
                .find(selectors.foreGround + ', ' + selectors.backGround)
                .hide();
            $('html, body').removeClass('modal-open');
            // reset data
            fetchedData = null;
            // reset jQuery promise object
            dataFetched = $.Deferred();
        },

        openModal = function () {
            $('.att-modal-container')
                .find(selectors.foreGround + ', ' + selectors.backGround)
                .show();
            $('html, body').addClass('modal-open');
        },

    // TODO: use <template> html tag after stopping IE11 support
    buildTemplate = function (data) {
        var templateHTML,
            modalType = data.modalType,
            title = data['displayTitle'] || data['jcr:title'] || '',
            body =  paraIndent(data.body);
            image = data.metaImage || '',
            link  = data.pageLink || data.assetLink || data.externalLink || '',
            label = data.label || '',
            withImage = (image !== '') ? 'withImage' : '',
            withCta = (link !=='') ? 'withCta' : '',
            headingLeft = data.headingLeft || '',
            headingRight = data.headingRight || '',
            bodyLeft =  paraIndent(data.bodyLeft),
            bodyRight = paraIndent(data.bodyRight),
            linkLeft = data.pageLinkLeft || data.assetLinkLeft || data.externalLinkLeft || '',
            linkRight = data.pageLinkRight || data.assetLinkRight || data.externalLinkRight || '',
            lTarget = data.closeModal || '',
            llTarget = data.closeModalLeft || '',
            lrTarget = data.closeModalRight || '',
            labelLeft = data.labelLeft || '',
            labelRight = data.labelRight || '';

            lTarget = (lTarget === 'true') ? 'target-self' : 'target-blank';
            llTarget = (llTarget === 'true') ? 'target-self' : 'target-blank';
            lrTarget = (lrTarget === 'true') ? 'target-self' : 'target-blank';

            if (typeof data.pageLink !== 'undefined') {
                link = (link.indexOf('.html') > 0) ? link : link + '.html';
            }
            if (typeof data.pageLinkLeft !== 'undefined') {
                linkLeft = (linkLeft.indexOf('.html') > 0) ? linkLeft : linkLeft + '.html';
            }
            if (typeof data.pageLinkRight !== 'undefined') {
                linkRight = (linkRight.indexOf('.html') > 0) ? linkRight : linkRight + '.html';
            }

            var simpleModal = function () {
                template = [];
                // template.push('<div class="att-modal-container">');
                template.push('    <div class="att-modal-background"></div>');
                template.push('    <div class="att-modal-foreground ' + withImage + ' ' + withCta + '">');
                template.push('        <div class="att-modal-close-container">');
                template.push('            <a href="#" class="att-modal-close">Close <span class="att-modal-close-icon"></span></a>');
                template.push('        </div>');
                if (image !== '') {
                    template.push('        <div class="att-modal-image">');
                    template.push('            <img src="' + image + '" alt="modal image" />');
                    template.push('        </div>');
                }
                template.push('        <div class="att-modal-heading">');
                template.push('            <h2>' + title + '</h2>');
                template.push('        </div>');
                template.push('        <div class="att-modal-content">');
                template.push('            <div class="att-modal-body">' + body + '</div>');
                if (link !== '') {
                    template.push('            <div class="att-modal-footer">');
                    template.push('                <a class="att-button primary medium js-modal-button ' + lTarget + '" href="' + link + '" alt="modal call to action">' + label + '</a>');
                    template.push('            </div>');
                }
                template.push('        </div>');
                template.push('    </div>');
                // template.push('</div>');
                return template.join('');
            },

                dualModal = function () {
                    template = [];
                    template.push('<div class="att-modal-background"></div>');
                    template.push('<div class="att-modal-foreground dual-modal">');
                    template.push('    <div class="att-modal-close-container">');
                    template.push('        <a href="#" class="att-modal-close">Close <span class="att-modal-close-icon"></span></a>');
                    template.push('    </div>');
                    template.push('    <div class="att-modal-heading">');
                    template.push('        <h2>' + title + '</h2>');
                    template.push('    </div>');
                    template.push('    <div class="att-modal-content">');
                    template.push('        <div class="att-modal-left">');
                    template.push('            <div class="att-modal-title-left">' + headingLeft + '</div>');
                    template.push('            <div class="att-modal-body-left">' + bodyLeft + '</div>');
                    template.push('            <div class="att-modal-footer-left">');
                    template.push('                <a class="att-button primary medium js-modal-button ' + llTarget + '" href="' + linkLeft + '" alt="modal call to action">' + labelLeft + '</a>');
                    template.push('            </div>');
                    template.push('        </div>');
                    template.push('        <div class="att-modal-right">');
                    template.push('            <div class="att-modal-title-right">' + headingRight + '</div>');
                    template.push('            <div class="att-modal-body-right">' + bodyRight + '</div>');
                    template.push('            <div class="att-modal-footer-right">');
                    template.push('                <a class="att-button primary medium js-modal-button ' + lrTarget + '" href="' + linkRight + '" alt="modal call to action">' + labelRight + '</a>');
                    template.push('            </div>');
                    template.push('        </div>');
                    template.push('    </div>');
                    template.push('</div>');
                    return template.join('');
                };

            switch (modalType) {
                case 'single':
                    templateHTML = simpleModal();
                    break;
                case 'dual':
                    templateHTML = dualModal();
                    break;
                default:
                // Left intentionally blank
            }
            return templateHTML;
        },

	    paraIndent = function (bodyStr) {
	        return (bodyStr)? bodyStr.replaceAll(/<p>([1-9]\.)/g, '<p class="paraindent1">$1')
	                                 .replaceAll(/<p>([a-z]\.)/g, '<p class="paraindent2">$1')
	                                 .replaceAll(/<p>(o&nbsp;)/g, '<p class="paraindent2">$1')
	                                 .replaceAll('<p><b>&nbsp;</b></p>', '<p class="paraspc">&nbsp;</p><!-- paraspc -->')
	                                 .replaceAll('<p> </p>', '<p class="paraspc">&nbsp;</p><!-- paraspc -->')
	                                 .replaceAll('<p><b>', '<p class="paraspc"><b>')
	                                 .replaceAll('<p><a>', '<p class="paraspc"><a>')
	                                 .replaceAll('</b></p>', '</b></p><!-- paraspc -->')
	                                 .replaceAll('<p>&nbsp;</p>', '<p class="paraspc">&nbsp;</p><!-- paraspc -->')
	                                 .replaceAll(/<\/p>(\r\n|\r|\n)<p>/g, '</p><p>&nbsp;</p><p>') 
	                                 : '';
	    },    
    
    fetchData = function (resource) {
        $.ajax({
            url: resource,
        }).done(function (data) {
            fetchedData = (typeof data.hits !== 'undefined') ? data.hits[0] : data;
            dataFetched.resolve();
        }).fail(function (ajaxError,status) {
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataError(
                {
                    type: status ,
                    statusCode: ajaxError.status, 
                }
            ));
            // handle error
        })
    },    

    showModal = function (context) {
        // '/content/attbusiness/en/modal-resources/modal-resources/jcr:content.tidy.json'
        var resource, data;
        // custom markup {modal:<modalName>}
        resource = $(context).data('resource');
        // Dual modal through pageLink
        if (typeof resource === 'undefined') resource = $(context).attr('href') || $(context).data('link-url');
        if (typeof resource === 'string' && resource.indexOf('.html') > 0) {
            resource = resource.replace('.html', '/jcr:content.json');
            resource = (resource.indexOf('/content/attbusiness/en') > -1)? resource : '/content/attbusiness/en' + resource;
        }
        // Through url www.domain.com?modal=modalId
        if (typeof context.modal !== 'undefined') resource = urls.getDataByModalId+context.modal;
            if (resource) {
        data = fetchData(resource);

        $.when(dataFetched).done(function () {
            var processKeyup = function (e) { 
                if (e.key === 'Escape' || e.key === 'Esc') {
                    e.preventDefault(); 
                    closeModal(this);
                    $(document).off('keyup', keyupHandler);
                }
            },
            // To arrest memory leak
            keyupHandler = function (e) { processKeyup(e) };
            // append template only once
            $(selectors.modalContainer).html(buildTemplate(fetchedData));
            att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataAlert.alertActionMessage(fetchedData.body));
            $(selectors.modalContainer).on('click', selectors.modalClose, function (e) { 
                e.preventDefault(); 
                closeModal(this); 
                $(document).off('keyup', keyupHandler);
            });
            $(document).on('keyup', keyupHandler);
            openModal();
        });
            }
    },

        appendModalContainer = function () {
            var template = [];
            template.push('<div class="att-modal-container">');
            template.push('</div>');
            if ($(selectors.modalContainer).length === 0) $('body').append(template.join(''));

        },

        init = function () {
            var modalResourceId;
            appendModalContainer();
            modalResourceId = paramsToJson(window.location.href.split('?')[1]);
            if (typeof modalResourceId !== 'undefined' && typeof modalResourceId.modal !== 'undefined') showModal(modalResourceId);
        },

        bindEvents = function () {
            // $(selectors.modalLink).on('click', function (e) { e.preventDefault(); showModal(this); });
            $('.modal-anchor').on('click', function (e) { e.preventDefault(); showModal(this); });
            $('.att-modal-container').on('click', '.target-self', function () { closeModal(this); });
        };

    // Execute after DOM ready
    $(function () {
        init();
        bindEvents();
    });

})(jQuery.noConflict(), window, document);
/**
 * Bootstrap tooltip JavaScript implementation
 * @param  {[type]} $         jQuery JavaScript Library
 * @param  {[type]} window    Global window object
 * @param  {[type]} document  Global document object
 * @param  {[type]} undefined Restoring global undefined
 * @requires jQuery JavaScript Library
 * @requires popper JavaScrpt library
 * @requires bootstrap library
 */
;(function($, window, document, undefined) {

    var urls = {
        blueIcon : '/content/dam/attbusiness/images/icons/pictogram-info-component.svg',
        whiteIcon: '/content/dam/attbusiness/images/icons/pictogram-info-inverse-component.svg'
    },


    selectors = {
        tooltipTarget     : '[data-toggle="tooltip"]',
        tooltipIconsBlack : '[data-bg="black"] [data-toggle="tooltip"]',
        tooltipIconsBlue  : '[data-bg="blue"] [data-toggle="tooltip"], [data-bg="dark-blue"] [data-toggle="tooltip"]',
        tooltipIconsWhite : '[data-bg="white"] [data-toggle="tooltip"]',
        tooltipIconsLightGray : '[data-bg="light-gray"] [data-toggle="tooltip"]'
    },

    setIconPath = function () {
        // white, lightgray => blue, black, blue => white
        $(selectors.tooltipIconsBlack).find('img').each( function (index, item) {
            // Excluding certain components
            // TODO: come up with stronger logic
            if ($(item).parents('.content-teaser, .product-card, .table-comparison').length === 0) {
                item.src = urls.whiteIcon;
            }
        });
        $(selectors.tooltipIconsBlue).find('img').each( function (index, item) {
            if ($(item).parents('.content-teaser, .product-card, .table-comparison, .accordion').length === 0) {
                item.src = urls.whiteIcon;
            }
        });
        // By default blue icon set at server
        // TODO: Can be removed?
        $(selectors.tooltipIconsWhite).find('img').each( function (index, item) {
            if ($(item).parents('.content-teaser, .product-card, .table-comparison').length === 0) {
                item.src = urls.blueIcon;
            }
        });
        $(selectors.tooltipIconsLightGray).find('img').each( function (index, item) {
            if ($(item).parents('.content-teaser, .product-card, .table-comparison').length === 0) {
                item.src = urls.blueIcon;
            }
        });
        // Exception to table comparison component plan name as its background is always blue
        $('.table-comparison .plan-name [data-toggle="tooltip"] img').each( function (index, item) {
            item.src =urls.whiteIcon;
        });
    },

    init = function () {
        if($(selectors.tooltipTarget).length > 0 ){
            $(selectors.tooltipTarget).tooltip();
        }
    };

    // Execute after DOM ready
    $(function () {
        setIconPath();
        // Allowing time to exchange icons
        setTimeout(function () {
            init();
        }, 2000);
    });

})(jQuery.noConflict(), window, document);

/***** bg color adjust on collapse of a modular section *****/
(function ($) {
    $(document).on('hide.bs.collapse', '.collapse', function (e) {
        //checking if the target and selector are same, because of the multiple event triggering
        if ($(this).is(e.target)) {
            if($(this).hasClass('section-content')){
                $(this).closest('.body-section').addClass('collapsedSection');
            }
            if($(this).hasClass('viewMore-content')){
                var section_id=$(this).closest('.body-section').attr('id');
                $('html,body').animate({scrollTop:$("#"+section_id).offset().top-($("#filter-tab").outerHeight()+$("#header").outerHeight())},'slow');
            }
        }
    });
    $(document).on('show.bs.collapse', '.collapse', function (e) {
        //checking if the target and selector are same, because of the multiple event triggerings
        if ($(this).is(e.target)) {
            if($(this).hasClass('section-content')){
                $(this).closest('.body-section').removeClass('collapsedSection');
            }
        }
    });
})(jQuery.noConflict());

/***** Modular section open/collapse customization *****/
;(function ($, window, document, undefined) {

    var selectors = {
            header      : 'section.body-section .section-heading[data-toggle]',
            body        : 'section.body-section .section-content.collapse',
            leftNav     : '#l3LeftTabNav',
        	subHeading  : '.section-sub-heading',
            bodySection : 'section.body-section .section-content'
        },
        // value set on init or on setScreen
        screen,

        // Only L3 template has left navigation 
        // Only L3 template starts showing tab view less than 992; rest: less than 1200
        setScreen = function () {
            if(window.innerWidth < 768) {
                screen = 'MOBILE';
            // Except L3
            } else if($(selectors.leftNav).length == 0 && window.innerWidth < 1200) {
                screen = 'TAB';
            // L3 on tablet
            } else if($(selectors.leftNav).length && window.innerWidth < 992) {
                screen = 'TAB';
            } else if($(selectors.leftNav).length && window.innerWidth >= 992) {
                screen = 'L3';
            } else if (window.innerWidth >= 1200) {
                screen = 'DESKTOP';
            }
        },

        getScreen = function () {
            return screen;
        },

        init = function () {
            setScreen();
            handleOnLoad();
        },

        handleOnLoad = function () {
            switch(getScreen()) {
                case 'MOBILE':
                    $(selectors.body).collapse('hide');

                    //keep the first open/collapsible item open
                    var firstSectionElement = $(selectors.bodySection).first();
                    if(firstSectionElement.hasClass('collapse') || firstSectionElement.hasClass('collapsing')){
                        // wait for animation to be completed
                        setTimeout(function () {
                            firstSectionElement.collapse('show');
                        }, 500);
                    }

                    break;
                case 'TAB':
                    $(selectors.body).collapse('hide');
                    // wait for animation to be completed
                    setTimeout(function () {
                        $(selectors.body).first().collapse('show');
                    }, 500);
                    break;
                case 'DESKTOP':
                    // uncollapse all the sections
                    $(selectors.body).collapse('show');
                    // disable collapsible feature
                    $(selectors.header).attr('data-toggle', 'disable');
                    break;
                case 'L3':
                    // do nothing
                    break;
                default:
                    // intentionally left blank
            }
        },

        handleResize = function () {
            // on resize find latest screen size and screen
            setScreen();
            //$(selectors.subHeading).show();
            switch(getScreen()) {
                case 'MOBILE':
                    //$(selectors.subHeading).hide();
                    // intentially falling back to TAB
                case 'TAB':
                    // Maintain tab collapse state as it is and
                    // Enable collapsible feature
                    $(selectors.header).attr('data-toggle', 'collapse');
                    break;
                case 'DESKTOP':
                    // uncollapse all the sections
                    $(selectors.body).collapse('show');
                    // disable collapsible feature
                    $(selectors.header).attr('data-toggle', 'disable');
                    break;
                case 'L3':
                    $(selectors.body).collapse('show');
                    $(selectors.header).attr('data-toggle', 'collapse');
                    break;
                default:
                    // intentionally left blank
            }
        },

        bindEvents = function () {
            $(window).on('resize', handleResize);
        },

        // deprecated
        setOpenCollapse = function () {
            // 
            if (window.innerWidth < 1200) {
                $(selectors.header).attr('data-toggle', 'collapse');
                $(selectors.body).collapse('hide');
            } else {
                if ($(selectors.header).attr('data-toggle') == 'collapse') {

                    // uncollapse all the sections
                    $(selectors.body).collapse('show');
                    // disable collapsible feature
                    $(selectors.header).attr('data-toggle', 'disable');

                } else {

                    // enable collapsible feature
                    $(selectors.header).attr('data-toggle', 'collapse');

        		}
            }
        };

    // Bind on document ready
    $(function () {
        init();
        bindEvents();
    });

    //TODO: L3 on click of section we need to set the hash in the url

})(jQuery.noConflict(), window, document);


/*!
 * jQuery Validation Plugin v1.19.0
 *
 * https://jqueryvalidation.org/
 *
 * Copyright (c) 2018 Jörn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

$.extend( $.fn, {

	// https://jqueryvalidation.org/validate/
	validate: function( options ) {

		// If nothing is selected, return nothing; can't chain anyway
		if ( !this.length ) {
			if ( options && options.debug && window.console ) {
				console.warn( "Nothing selected, can't validate, returning nothing." );
			}
			return;
		}

		// Check if a validator for this form was already created
		var validator = $.data( this[ 0 ], "validator" );
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr( "novalidate", "novalidate" );

		validator = new $.validator( options, this[ 0 ] );
		$.data( this[ 0 ], "validator", validator );

		if ( validator.settings.onsubmit ) {

			this.on( "click.validate", ":submit", function( event ) {

				// Track the used submit button to properly handle scripted
				// submits later.
				validator.submitButton = event.currentTarget;

				// Allow suppressing validation by adding a cancel class to the submit button
				if ( $( this ).hasClass( "cancel" ) ) {
					validator.cancelSubmit = true;
				}

				// Allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
				if ( $( this ).attr( "formnovalidate" ) !== undefined ) {
					validator.cancelSubmit = true;
				}
			} );

			// Validate the form on submit
			this.on( "submit.validate", function( event ) {
				if ( validator.settings.debug ) {

					// Prevent form submit to be able to see console output
					event.preventDefault();
				}

				function handle() {
					var hidden, result;

					// Insert a hidden input as a replacement for the missing submit button
					// The hidden input is inserted in two cases:
					//   - A user defined a `submitHandler`
					//   - There was a pending request due to `remote` method and `stopRequest()`
					//     was called to submit the form in case it's valid
					if ( validator.submitButton && ( validator.settings.submitHandler || validator.formSubmitted ) ) {
						hidden = $( "<input type='hidden'/>" )
							.attr( "name", validator.submitButton.name )
							.val( $( validator.submitButton ).val() )
							.appendTo( validator.currentForm );
					}

					if ( validator.settings.submitHandler && !validator.settings.debug ) {
						result = validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if ( hidden ) {

							// And clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						if ( result !== undefined ) {
							return result;
						}
						return false;
					}
					return true;
				}

				// Prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			} );
		}

		return validator;
	},

	// https://jqueryvalidation.org/valid/
	valid: function() {
		var valid, validator, errorList;

		if ( $( this[ 0 ] ).is( "form" ) ) {
			valid = this.validate().form();
		} else {
			errorList = [];
			valid = true;
			validator = $( this[ 0 ].form ).validate();
			this.each( function() {
				valid = validator.element( this ) && valid;
				if ( !valid ) {
					errorList = errorList.concat( validator.errorList );
				}
			} );
			validator.errorList = errorList;
		}
		return valid;
	},

	// https://jqueryvalidation.org/rules/
	rules: function( command, argument ) {
		var element = this[ 0 ],
			isContentEditable = typeof this.attr( "contenteditable" ) !== "undefined" && this.attr( "contenteditable" ) !== "false",
			settings, staticRules, existingRules, data, param, filtered;

		// If nothing is selected, return empty object; can't chain anyway
		if ( element == null ) {
			return;
		}

		if ( !element.form && isContentEditable ) {
			element.form = this.closest( "form" )[ 0 ];
			element.name = this.attr( "name" );
		}

		if ( element.form == null ) {
			return;
		}

		if ( command ) {
			settings = $.data( element.form, "validator" ).settings;
			staticRules = settings.rules;
			existingRules = $.validator.staticRules( element );
			switch ( command ) {
			case "add":
				$.extend( existingRules, $.validator.normalizeRule( argument ) );

				// Remove messages from rules, but allow them to be set separately
				delete existingRules.messages;
				staticRules[ element.name ] = existingRules;
				if ( argument.messages ) {
					settings.messages[ element.name ] = $.extend( settings.messages[ element.name ], argument.messages );
				}
				break;
			case "remove":
				if ( !argument ) {
					delete staticRules[ element.name ];
					return existingRules;
				}
				filtered = {};
				$.each( argument.split( /\s/ ), function( index, method ) {
					filtered[ method ] = existingRules[ method ];
					delete existingRules[ method ];
				} );
				return filtered;
			}
		}

		data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules( element ),
			$.validator.attributeRules( element ),
			$.validator.dataRules( element ),
			$.validator.staticRules( element )
		), element );

		// Make sure required is at front
		if ( data.required ) {
			param = data.required;
			delete data.required;
			data = $.extend( { required: param }, data );
		}

		// Make sure remote is at back
		if ( data.remote ) {
			param = data.remote;
			delete data.remote;
			data = $.extend( data, { remote: param } );
		}

		return data;
	}
} );

// Custom selectors
$.extend( $.expr.pseudos || $.expr[ ":" ], {		// '|| $.expr[ ":" ]' here enables backwards compatibility to jQuery 1.7. Can be removed when dropping jQ 1.7.x support

	// https://jqueryvalidation.org/blank-selector/
	blank: function( a ) {
		return !$.trim( "" + $( a ).val() );
	},

	// https://jqueryvalidation.org/filled-selector/
	filled: function( a ) {
		var val = $( a ).val();
		return val !== null && !!$.trim( "" + val );
	},

	// https://jqueryvalidation.org/unchecked-selector/
	unchecked: function( a ) {
		return !$( a ).prop( "checked" );
	}
} );

// Constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

// https://jqueryvalidation.org/jQuery.validator.format/
$.validator.format = function( source, params ) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray( arguments );
			args.unshift( source );
			return $.validator.format.apply( this, args );
		};
	}
	if ( params === undefined ) {
		return source;
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray( arguments ).slice( 1 );
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each( params, function( i, n ) {
		source = source.replace( new RegExp( "\\{" + i + "\\}", "g" ), function() {
			return n;
		} );
	} );
	return source;
};

$.extend( $.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		pendingClass: "pending",
		validClass: "valid",
		errorElement: "label",
		focusCleanup: false,
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function( element ) {
			this.lastActive = element;

			// Hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.hideThese( this.errorsFor( element ) );
			}
		},
		onfocusout: function( element ) {
			if ( !this.checkable( element ) && ( element.name in this.submitted || !this.optional( element ) ) ) {
				this.element( element );
			}
		},
		onkeyup: function( element, event ) {

			// Avoid revalidate the field when pressing one of the following keys
			// Shift       => 16
			// Ctrl        => 17
			// Alt         => 18
			// Caps lock   => 20
			// End         => 35
			// Home        => 36
			// Left arrow  => 37
			// Up arrow    => 38
			// Right arrow => 39
			// Down arrow  => 40
			// Insert      => 45
			// Num lock    => 144
			// AltGr key   => 225
			var excludedKeys = [
				16, 17, 18, 20, 35, 36, 37,
				38, 39, 40, 45, 144, 225
			];

			if ( event.which === 9 && this.elementValue( element ) === "" || $.inArray( event.keyCode, excludedKeys ) !== -1 ) {
				return;
			} else if ( element.name in this.submitted || element.name in this.invalid ) {
				this.element( element );
			}
		},
		onclick: function( element ) {

			// Click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element( element );

			// Or option elements, check parent select in that case
			} else if ( element.parentNode.name in this.submitted ) {
				this.element( element.parentNode );
			}
		},
		highlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).addClass( errorClass ).removeClass( validClass );
			} else {
				$( element ).addClass( errorClass ).removeClass( validClass );
			}
		},
		unhighlight: function( element, errorClass, validClass ) {
			if ( element.type === "radio" ) {
				this.findByName( element.name ).removeClass( errorClass ).addClass( validClass );
			} else {
				$( element ).removeClass( errorClass ).addClass( validClass );
			}
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.setDefaults/
	setDefaults: function( settings ) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format( "Please enter no more than {0} characters." ),
		minlength: $.validator.format( "Please enter at least {0} characters." ),
		rangelength: $.validator.format( "Please enter a value between {0} and {1} characters long." ),
		range: $.validator.format( "Please enter a value between {0} and {1}." ),
		max: $.validator.format( "Please enter a value less than or equal to {0}." ),
		min: $.validator.format( "Please enter a value greater than or equal to {0}." ),
		step: $.validator.format( "Please enter a multiple of {0}." )
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $( this.settings.errorLabelContainer );
			this.errorContext = this.labelContainer.length && this.labelContainer || $( this.currentForm );
			this.containers = $( this.settings.errorContainer ).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var currentForm = this.currentForm,
				groups = ( this.groups = {} ),
				rules;
			$.each( this.settings.groups, function( key, value ) {
				if ( typeof value === "string" ) {
					value = value.split( /\s/ );
				}
				$.each( value, function( index, name ) {
					groups[ name ] = key;
				} );
			} );
			rules = this.settings.rules;
			$.each( rules, function( key, value ) {
				rules[ key ] = $.validator.normalizeRule( value );
			} );

			function delegate( event ) {
				var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";

				// Set form expando on contenteditable
				if ( !this.form && isContentEditable ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = $( this ).attr( "name" );
				}

				// Ignore the element if it belongs to another form. This will happen mainly
				// when setting the `form` attribute of an input to the id of another form.
				if ( currentForm !== this.form ) {
					return;
				}

				var validator = $.data( this.form, "validator" ),
					eventType = "on" + event.type.replace( /^validate/, "" ),
					settings = validator.settings;
				if ( settings[ eventType ] && !$( this ).is( settings.ignore ) ) {
					settings[ eventType ].call( validator, this, event );
				}
			}

			$( this.currentForm )
				.on( "focusin.validate focusout.validate keyup.validate",
					":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], " +
					"[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], " +
					"[type='radio'], [type='checkbox'], [contenteditable], [type='button']", delegate )

				// Support: Chrome, oldIE
				// "select" is provided as event.target when clicking a option
				.on( "click.validate", "select, option, [type='radio'], [type='checkbox']", delegate );

			if ( this.settings.invalidHandler ) {
				$( this.currentForm ).on( "invalid-form.validate", this.settings.invalidHandler );
			}
		},

		// https://jqueryvalidation.org/Validator.form/
		form: function() {
			this.checkForm();
			$.extend( this.submitted, this.errorMap );
			this.invalid = $.extend( {}, this.errorMap );
			if ( !this.valid() ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = ( this.currentElements = this.elements() ); elements[ i ]; i++ ) {
				this.check( elements[ i ] );
			}
			return this.valid();
		},

		// https://jqueryvalidation.org/Validator.element/
		element: function( element ) {
			var cleanElement = this.clean( element ),
				checkElement = this.validationTargetFor( cleanElement ),
				v = this,
				result = true,
				rs, group;

			if ( checkElement === undefined ) {
				delete this.invalid[ cleanElement.name ];
			} else {
				this.prepareElement( checkElement );
				this.currentElements = $( checkElement );

				// If this element is grouped, then validate all group elements already
				// containing a value
				group = this.groups[ checkElement.name ];
				if ( group ) {
					$.each( this.groups, function( name, testgroup ) {
						if ( testgroup === group && name !== checkElement.name ) {
							cleanElement = v.validationTargetFor( v.clean( v.findByName( name ) ) );
							if ( cleanElement && cleanElement.name in v.invalid ) {
								v.currentElements.push( cleanElement );
								result = v.check( cleanElement ) && result;
							}
						}
					} );
				}

				rs = this.check( checkElement ) !== false;
				result = result && rs;
				if ( rs ) {
					this.invalid[ checkElement.name ] = false;
				} else {
					this.invalid[ checkElement.name ] = true;
				}

				if ( !this.numberOfInvalids() ) {

					// Hide error containers on last error
					this.toHide = this.toHide.add( this.containers );
				}
				this.showErrors();

				// Add aria-invalid status for screen readers
				$( element ).attr( "aria-invalid", !rs );
			}

			return result;
		},

		// https://jqueryvalidation.org/Validator.showErrors/
		showErrors: function( errors ) {
			if ( errors ) {
				var validator = this;

				// Add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = $.map( this.errorMap, function( message, name ) {
					return {
						message: message,
						element: validator.findByName( name )[ 0 ]
					};
				} );

				// Remove items from success list
				this.successList = $.grep( this.successList, function( element ) {
					return !( element.name in errors );
				} );
			}
			if ( this.settings.showErrors ) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// https://jqueryvalidation.org/Validator.resetForm/
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.invalid = {};
			this.submitted = {};
			this.prepareForm();
			this.hideErrors();
			var elements = this.elements()
				.removeData( "previousValue" )
				.removeAttr( "aria-invalid" );

			this.resetElements( elements );
		},

		resetElements: function( elements ) {
			var i;

			if ( this.settings.unhighlight ) {
				for ( i = 0; elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ],
						this.settings.errorClass, "" );
					this.findByName( elements[ i ].name ).removeClass( this.settings.validClass );
				}
			} else {
				elements
					.removeClass( this.settings.errorClass )
					.removeClass( this.settings.validClass );
			}
		},

		numberOfInvalids: function() {
			return this.objectLength( this.invalid );
		},

		objectLength: function( obj ) {
			/* jshint unused: false */
			var count = 0,
				i;
			for ( i in obj ) {

				// This check allows counting elements with empty error
				// message as invalid elements
				if ( obj[ i ] !== undefined && obj[ i ] !== null && obj[ i ] !== false ) {
					count++;
				}
			}
			return count;
		},

		hideErrors: function() {
			this.hideThese( this.toHide );
		},

		hideThese: function( errors ) {
			errors.not( this.containers ).text( "" );
			this.addWrapper( errors ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if ( this.settings.focusInvalid ) {
				try {
					$( this.findLastActive() || this.errorList.length && this.errorList[ 0 ].element || [] )
					.filter( ":visible" )
					.focus()

					// Manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger( "focusin" );
				} catch ( e ) {

					// Ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep( this.errorList, function( n ) {
				return n.element.name === lastActive.name;
			} ).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// Select all valid inputs inside the form (no submit or reset buttons)
			return $( this.currentForm )
			.find( "input, select, textarea, [contenteditable]" )
			.not( ":submit, :reset, :image, :disabled" )
			.not( this.settings.ignore )
			.filter( function() {
				var name = this.name || $( this ).attr( "name" ); // For contenteditable
				var isContentEditable = typeof $( this ).attr( "contenteditable" ) !== "undefined" && $( this ).attr( "contenteditable" ) !== "false";

				if ( !name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this );
				}

				// Set form expando on contenteditable
				if ( isContentEditable ) {
					this.form = $( this ).closest( "form" )[ 0 ];
					this.name = name;
				}

				// Ignore elements that belong to other/nested forms
				if ( this.form !== validator.currentForm ) {
					return false;
				}

				// Select only the first element for each name, and only those with rules specified
				if ( name in rulesCache || !validator.objectLength( $( this ).rules() ) ) {
					return false;
				}

				rulesCache[ name ] = true;
				return true;
			} );
		},

		clean: function( selector ) {
			return $( selector )[ 0 ];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.split( " " ).join( "." );
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		resetInternals: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $( [] );
			this.toHide = $( [] );
		},

		reset: function() {
			this.resetInternals();
			this.currentElements = $( [] );
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor( element );
		},

		elementValue: function( element ) {
			var $element = $( element ),
				type = element.type,
				isContentEditable = typeof $element.attr( "contenteditable" ) !== "undefined" && $element.attr( "contenteditable" ) !== "false",
				val, idx;

			if ( type === "radio" || type === "checkbox" ) {
				return this.findByName( element.name ).filter( ":checked" ).val();
			} else if ( type === "number" && typeof element.validity !== "undefined" ) {
				return element.validity.badInput ? "NaN" : $element.val();
			}

			if ( isContentEditable ) {
				val = $element.text();
			} else {
				val = $element.val();
			}

			if ( type === "file" ) {

				// Modern browser (chrome & safari)
				if ( val.substr( 0, 12 ) === "C:\\fakepath\\" ) {
					return val.substr( 12 );
				}

				// Legacy browsers
				// Unix-based path
				idx = val.lastIndexOf( "/" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Windows-based path
				idx = val.lastIndexOf( "\\" );
				if ( idx >= 0 ) {
					return val.substr( idx + 1 );
				}

				// Just the file name
				return val;
			}

			if ( typeof val === "string" ) {
				return val.replace( /\r/g, "" );
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $( element ).rules(),
				rulesCount = $.map( rules, function( n, i ) {
					return i;
				} ).length,
				dependencyMismatch = false,
				val = this.elementValue( element ),
				result, method, rule, normalizer;

			// Prioritize the local normalizer defined for this element over the global one
			// if the former exists, otherwise user the global one in case it exists.
			if ( typeof rules.normalizer === "function" ) {
				normalizer = rules.normalizer;
			} else if (	typeof this.settings.normalizer === "function" ) {
				normalizer = this.settings.normalizer;
			}

			// If normalizer is defined, then call it to retreive the changed value instead
			// of using the real one.
			// Note that `this` in the normalizer is `element`.
			if ( normalizer ) {
				val = normalizer.call( element, val );

				// Delete the normalizer from rules to avoid treating it as a pre-defined method.
				delete rules.normalizer;
			}

			for ( method in rules ) {
				rule = { method: method, parameters: rules[ method ] };
				try {
					result = $.validator.methods[ method ].call( this, val, element, rule.parameters );

					// If a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" && rulesCount === 1 ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor( element ) );
						return;
					}

					if ( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch ( e ) {
					if ( this.settings.debug && window.console ) {
						console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
					}
					if ( e instanceof TypeError ) {
						e.message += ".  Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.";
					}

					throw e;
				}
			}
			if ( dependencyMismatch ) {
				return;
			}
			if ( this.objectLength( rules ) ) {
				this.successList.push( element );
			}
			return true;
		},

		// Return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		// return the generic message if present and no method specific message is present
		customDataMessage: function( element, method ) {
			return $( element ).data( "msg" + method.charAt( 0 ).toUpperCase() +
				method.substring( 1 ).toLowerCase() ) || $( element ).data( "msg" );
		},

		// Return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[ name ];
			return m && ( m.constructor === String ? m : m[ method ] );
		},

		// Return the first defined argument, allowing empty strings
		findDefined: function() {
			for ( var i = 0; i < arguments.length; i++ ) {
				if ( arguments[ i ] !== undefined ) {
					return arguments[ i ];
				}
			}
			return undefined;
		},

		// The second parameter 'rule' used to be a string, and extended to an object literal
		// of the following form:
		// rule = {
		//     method: "method name",
		//     parameters: "the given method parameters"
		// }
		//
		// The old behavior still supported, kept to maintain backward compatibility with
		// old code, and will be removed in the next major release.
		defaultMessage: function( element, rule ) {
			if ( typeof rule === "string" ) {
				rule = { method: rule };
			}

			var message = this.findDefined(
					this.customMessage( element.name, rule.method ),
					this.customDataMessage( element, rule.method ),

					// 'title' is never undefined, so handle empty string as undefined
					!this.settings.ignoreTitle && element.title || undefined,
					$.validator.messages[ rule.method ],
					"<strong>Warning: No message defined for " + element.name + "</strong>"
				),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call( this, rule.parameters, element );
			} else if ( theregex.test( message ) ) {
				message = $.validator.format( message.replace( theregex, "{$1}" ), rule.parameters );
			}

			return message;
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule );

			this.errorList.push( {
				message: message,
				element: element,
				method: rule.method
			} );

			this.errorMap[ element.name ] = message;
			this.submitted[ element.name ] = message;
		},

		addWrapper: function( toToggle ) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements, error;
			for ( i = 0; this.errorList[ i ]; i++ ) {
				error = this.errorList[ i ];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if ( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if ( this.settings.success ) {
				for ( i = 0; this.successList[ i ]; i++ ) {
					this.showLabel( this.successList[ i ] );
				}
			}
			if ( this.settings.unhighlight ) {
				for ( i = 0, elements = this.validElements(); elements[ i ]; i++ ) {
					this.settings.unhighlight.call( this, elements[ i ], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not( this.invalidElements() );
		},

		invalidElements: function() {
			return $( this.errorList ).map( function() {
				return this.element;
			} );
		},

		showLabel: function( element, message ) {
			var place, group, errorID, v,
				error = this.errorsFor( element ),
				elementID = this.idOrName( element ),
				describedBy = $( element ).attr( "aria-describedby" );

			if ( error.length ) {

				// Refresh error/success class
				error.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// Replace message on existing label
				error.html( message );
			} else {

				// Create error element
				error = $( "<" + this.settings.errorElement + ">" )
					.attr( "id", elementID + "-error" )
					.addClass( this.settings.errorClass )
					.html( message || "" );

				// Maintain reference to the element to be placed into the DOM
				place = error;
				if ( this.settings.wrapper ) {

					// Make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					place = error.hide().show().wrap( "<" + this.settings.wrapper + "/>" ).parent();
				}
				if ( this.labelContainer.length ) {
					this.labelContainer.append( place );
				} else if ( this.settings.errorPlacement ) {
					this.settings.errorPlacement.call( this, place, $( element ) );
				} else {
					place.insertAfter( element );
				}

				// Link error back to the element
				if ( error.is( "label" ) ) {

					// If the error is a label, then associate using 'for'
					error.attr( "for", elementID );

					// If the element is not a child of an associated label, then it's necessary
					// to explicitly apply aria-describedby
				} else if ( error.parents( "label[for='" + this.escapeCssMeta( elementID ) + "']" ).length === 0 ) {
					errorID = error.attr( "id" );

					// Respect existing non-error aria-describedby
					if ( !describedBy ) {
						describedBy = errorID;
					} else if ( !describedBy.match( new RegExp( "\\b" + this.escapeCssMeta( errorID ) + "\\b" ) ) ) {

						// Add to end of list if not already present
						describedBy += " " + errorID;
					}
					$( element ).attr( "aria-describedby", describedBy );

					// If this element is grouped, then assign to all elements in the same group
					group = this.groups[ element.name ];
					if ( group ) {
						v = this;
						$.each( v.groups, function( name, testgroup ) {
							if ( testgroup === group ) {
								$( "[name='" + v.escapeCssMeta( name ) + "']", v.currentForm )
									.attr( "aria-describedby", error.attr( "id" ) );
							}
						} );
					}
				}
			}
			if ( !message && this.settings.success ) {
				error.text( "" );
				if ( typeof this.settings.success === "string" ) {
					error.addClass( this.settings.success );
				} else {
					this.settings.success( error, element );
				}
			}
			this.toShow = this.toShow.add( error );
		},

		errorsFor: function( element ) {
			var name = this.escapeCssMeta( this.idOrName( element ) ),
				describer = $( element ).attr( "aria-describedby" ),
				selector = "label[for='" + name + "'], label[for='" + name + "'] *";

			// 'aria-describedby' should directly reference the error element
			if ( describer ) {
				selector = selector + ", #" + this.escapeCssMeta( describer )
					.replace( /\s+/g, ", #" );
			}

			return this
				.errors()
				.filter( selector );
		},

		// See https://api.jquery.com/category/selectors/, for CSS
		// meta-characters that should be escaped in order to be used with JQuery
		// as a literal part of a name/id or any selector.
		escapeCssMeta: function( string ) {
			return string.replace( /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1" );
		},

		idOrName: function( element ) {
			return this.groups[ element.name ] || ( this.checkable( element ) ? element.name : element.id || element.name );
		},

		validationTargetFor: function( element ) {

			// If radio/checkbox, validate first element in group instead
			if ( this.checkable( element ) ) {
				element = this.findByName( element.name );
			}

			// Always apply ignore filter
			return $( element ).not( this.settings.ignore )[ 0 ];
		},

		checkable: function( element ) {
			return ( /radio|checkbox/i ).test( element.type );
		},

		findByName: function( name ) {
			return $( this.currentForm ).find( "[name='" + this.escapeCssMeta( name ) + "']" );
		},

		getLength: function( value, element ) {
			switch ( element.nodeName.toLowerCase() ) {
			case "select":
				return $( "option:selected", element ).length;
			case "input":
				if ( this.checkable( element ) ) {
					return this.findByName( element.name ).filter( ":checked" ).length;
				}
			}
			return value.length;
		},

		depend: function( param, element ) {
			return this.dependTypes[ typeof param ] ? this.dependTypes[ typeof param ]( param, element ) : true;
		},

		dependTypes: {
			"boolean": function( param ) {
				return param;
			},
			"string": function( param, element ) {
				return !!$( param, element.form ).length;
			},
			"function": function( param, element ) {
				return param( element );
			}
		},

		optional: function( element ) {
			var val = this.elementValue( element );
			return !$.validator.methods.required.call( this, val, element ) && "dependency-mismatch";
		},

		startRequest: function( element ) {
			if ( !this.pending[ element.name ] ) {
				this.pendingRequest++;
				$( element ).addClass( this.settings.pendingClass );
				this.pending[ element.name ] = true;
			}
		},

		stopRequest: function( element, valid ) {
			this.pendingRequest--;

			// Sometimes synchronization fails, make sure pendingRequest is never < 0
			if ( this.pendingRequest < 0 ) {
				this.pendingRequest = 0;
			}
			delete this.pending[ element.name ];
			$( element ).removeClass( this.settings.pendingClass );
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$( this.currentForm ).submit();

				// Remove the hidden input that was used as a replacement for the
				// missing submit button. The hidden input is added by `handle()`
				// to ensure that the value of the used submit button is passed on
				// for scripted submits triggered by this method
				if ( this.submitButton ) {
					$( "input:hidden[name='" + this.submitButton.name + "']", this.currentForm ).remove();
				}

				this.formSubmitted = false;
			} else if ( !valid && this.pendingRequest === 0 && this.formSubmitted ) {
				$( this.currentForm ).triggerHandler( "invalid-form", [ this ] );
				this.formSubmitted = false;
			}
		},

		previousValue: function( element, method ) {
			method = typeof method === "string" && method || "remote";

			return $.data( element, "previousValue" ) || $.data( element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, { method: method } )
			} );
		},

		// Cleans up all forms and elements, removes validator-specific events
		destroy: function() {
			this.resetForm();

			$( this.currentForm )
				.off( ".validate" )
				.removeData( "validator" )
				.find( ".validate-equalTo-blur" )
					.off( ".validate-equalTo" )
					.removeClass( "validate-equalTo-blur" )
				.find( ".validate-lessThan-blur" )
					.off( ".validate-lessThan" )
					.removeClass( "validate-lessThan-blur" )
				.find( ".validate-lessThanEqual-blur" )
					.off( ".validate-lessThanEqual" )
					.removeClass( "validate-lessThanEqual-blur" )
				.find( ".validate-greaterThanEqual-blur" )
					.off( ".validate-greaterThanEqual" )
					.removeClass( "validate-greaterThanEqual-blur" )
				.find( ".validate-greaterThan-blur" )
					.off( ".validate-greaterThan" )
					.removeClass( "validate-greaterThan-blur" );
		}

	},

	classRuleSettings: {
		required: { required: true },
		email: { email: true },
		url: { url: true },
		date: { date: true },
		dateISO: { dateISO: true },
		number: { number: true },
		digits: { digits: true },
		creditcard: { creditcard: true }
	},

	addClassRules: function( className, rules ) {
		if ( className.constructor === String ) {
			this.classRuleSettings[ className ] = rules;
		} else {
			$.extend( this.classRuleSettings, className );
		}
	},

	classRules: function( element ) {
		var rules = {},
			classes = $( element ).attr( "class" );

		if ( classes ) {
			$.each( classes.split( " " ), function() {
				if ( this in $.validator.classRuleSettings ) {
					$.extend( rules, $.validator.classRuleSettings[ this ] );
				}
			} );
		}
		return rules;
	},

	normalizeAttributeRule: function( rules, type, method, value ) {

		// Convert the value to a number for number inputs, and for text for backwards compability
		// allows type="date" and others to be compared as strings
		if ( /min|max|step/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
			value = Number( value );

			// Support Opera Mini, which returns NaN for undefined minlength
			if ( isNaN( value ) ) {
				value = undefined;
			}
		}

		if ( value || value === 0 ) {
			rules[ method ] = value;
		} else if ( type === method && type !== "range" ) {

			// Exception: the jquery validate 'range' method
			// does not test for the html5 'range' type
			rules[ method ] = true;
		}
	},

	attributeRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {

			// Support for <input required> in both html5 and older browsers
			if ( method === "required" ) {
				value = element.getAttribute( method );

				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if ( value === "" ) {
					value = true;
				}

				// Force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr( method );
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}

		// 'maxlength' may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
		if ( rules.maxlength && /-1|2147483647|524288/.test( rules.maxlength ) ) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function( element ) {
		var rules = {},
			$element = $( element ),
			type = element.getAttribute( "type" ),
			method, value;

		for ( method in $.validator.methods ) {
			value = $element.data( "rule" + method.charAt( 0 ).toUpperCase() + method.substring( 1 ).toLowerCase() );

			// Cast empty attributes like `data-rule-required` to `true`
			if ( value === "" ) {
				value = true;
			}

			this.normalizeAttributeRule( rules, type, method, value );
		}
		return rules;
	},

	staticRules: function( element ) {
		var rules = {},
			validator = $.data( element.form, "validator" );

		if ( validator.settings.rules ) {
			rules = $.validator.normalizeRule( validator.settings.rules[ element.name ] ) || {};
		}
		return rules;
	},

	normalizeRules: function( rules, element ) {

		// Handle dependency check
		$.each( rules, function( prop, val ) {

			// Ignore rule when param is explicitly false, eg. required:false
			if ( val === false ) {
				delete rules[ prop ];
				return;
			}
			if ( val.param || val.depends ) {
				var keepRule = true;
				switch ( typeof val.depends ) {
				case "string":
					keepRule = !!$( val.depends, element.form ).length;
					break;
				case "function":
					keepRule = val.depends.call( element, element );
					break;
				}
				if ( keepRule ) {
					rules[ prop ] = val.param !== undefined ? val.param : true;
				} else {
					$.data( element.form, "validator" ).resetElements( $( element ) );
					delete rules[ prop ];
				}
			}
		} );

		// Evaluate parameters
		$.each( rules, function( rule, parameter ) {
			rules[ rule ] = $.isFunction( parameter ) && rule !== "normalizer" ? parameter( element ) : parameter;
		} );

		// Clean number parameters
		$.each( [ "minlength", "maxlength" ], function() {
			if ( rules[ this ] ) {
				rules[ this ] = Number( rules[ this ] );
			}
		} );
		$.each( [ "rangelength", "range" ], function() {
			var parts;
			if ( rules[ this ] ) {
				if ( $.isArray( rules[ this ] ) ) {
					rules[ this ] = [ Number( rules[ this ][ 0 ] ), Number( rules[ this ][ 1 ] ) ];
				} else if ( typeof rules[ this ] === "string" ) {
					parts = rules[ this ].replace( /[\[\]]/g, "" ).split( /[\s,]+/ );
					rules[ this ] = [ Number( parts[ 0 ] ), Number( parts[ 1 ] ) ];
				}
			}
		} );

		if ( $.validator.autoCreateRanges ) {

			// Auto-create ranges
			if ( rules.min != null && rules.max != null ) {
				rules.range = [ rules.min, rules.max ];
				delete rules.min;
				delete rules.max;
			}
			if ( rules.minlength != null && rules.maxlength != null ) {
				rules.rangelength = [ rules.minlength, rules.maxlength ];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function( data ) {
		if ( typeof data === "string" ) {
			var transformed = {};
			$.each( data.split( /\s/ ), function() {
				transformed[ this ] = true;
			} );
			data = transformed;
		}
		return data;
	},

	// https://jqueryvalidation.org/jQuery.validator.addMethod/
	addMethod: function( name, method, message ) {
		$.validator.methods[ name ] = method;
		$.validator.messages[ name ] = message !== undefined ? message : $.validator.messages[ name ];
		if ( method.length < 3 ) {
			$.validator.addClassRules( name, $.validator.normalizeRule( name ) );
		}
	},

	// https://jqueryvalidation.org/jQuery.validator.methods/
	methods: {

		// https://jqueryvalidation.org/required-method/
		required: function( value, element, param ) {

			// Check if dependency is met
			if ( !this.depend( param, element ) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {

				// Could be an array for select-multiple or a string, both are fine this way
				var val = $( element ).val();
				return val && val.length > 0;
			}
			if ( this.checkable( element ) ) {
				return this.getLength( value, element ) > 0;
			}
			return value !== undefined && value !== null && value.length > 0;
		},

		// https://jqueryvalidation.org/email-method/
		email: function( value, element ) {

			// From https://html.spec.whatwg.org/multipage/forms.html#valid-e-mail-address
			// Retrieved 2014-01-14
			// If you have a problem with this implementation, report a bug against the above spec
			// Or use custom methods to implement your own email validation
			return this.optional( element ) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test( value );
		},

		// https://jqueryvalidation.org/url-method/
		url: function( value, element ) {

			// Copyright (c) 2010-2013 Diego Perini, MIT licensed
			// https://gist.github.com/dperini/729294
			// see also https://mathiasbynens.be/demo/url-regex
			// modified to allow protocol-relative URLs
			return this.optional( element ) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test( value );
		},

		// https://jqueryvalidation.org/date-method/
		date: ( function() {
			var called = false;

			return function( value, element ) {
				if ( !called ) {
					called = true;
					if ( this.settings.debug && window.console ) {
						console.warn(
							"The `date` method is deprecated and will be removed in version '2.0.0'.\n" +
							"Please don't use it, since it relies on the Date constructor, which\n" +
							"behaves very differently across browsers and locales. Use `dateISO`\n" +
							"instead or one of the locale specific methods in `localizations/`\n" +
							"and `additional-methods.js`."
						);
					}
				}

				return this.optional( element ) || !/Invalid|NaN/.test( new Date( value ).toString() );
			};
		}() ),

		// https://jqueryvalidation.org/dateISO-method/
		dateISO: function( value, element ) {
			return this.optional( element ) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test( value );
		},

		// https://jqueryvalidation.org/number-method/
		number: function( value, element ) {
			return this.optional( element ) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test( value );
		},

		// https://jqueryvalidation.org/digits-method/
		digits: function( value, element ) {
			return this.optional( element ) || /^\d+$/.test( value );
		},

		// https://jqueryvalidation.org/minlength-method/
		minlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length >= param;
		},

		// https://jqueryvalidation.org/maxlength-method/
		maxlength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || length <= param;
		},

		// https://jqueryvalidation.org/rangelength-method/
		rangelength: function( value, element, param ) {
			var length = $.isArray( value ) ? value.length : this.getLength( value, element );
			return this.optional( element ) || ( length >= param[ 0 ] && length <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/min-method/
		min: function( value, element, param ) {
			return this.optional( element ) || value >= param;
		},

		// https://jqueryvalidation.org/max-method/
		max: function( value, element, param ) {
			return this.optional( element ) || value <= param;
		},

		// https://jqueryvalidation.org/range-method/
		range: function( value, element, param ) {
			return this.optional( element ) || ( value >= param[ 0 ] && value <= param[ 1 ] );
		},

		// https://jqueryvalidation.org/step-method/
		step: function( value, element, param ) {
			var type = $( element ).attr( "type" ),
				errorMessage = "Step attribute on input type " + type + " is not supported.",
				supportedTypes = [ "text", "number", "range" ],
				re = new RegExp( "\\b" + type + "\\b" ),
				notSupported = type && !re.test( supportedTypes.join() ),
				decimalPlaces = function( num ) {
					var match = ( "" + num ).match( /(?:\.(\d+))?$/ );
					if ( !match ) {
						return 0;
					}

					// Number of digits right of decimal point.
					return match[ 1 ] ? match[ 1 ].length : 0;
				},
				toInt = function( num ) {
					return Math.round( num * Math.pow( 10, decimals ) );
				},
				valid = true,
				decimals;

			// Works only for text, number and range input types
			// TODO find a way to support input types date, datetime, datetime-local, month, time and week
			if ( notSupported ) {
				throw new Error( errorMessage );
			}

			decimals = decimalPlaces( param );

			// Value can't have too many decimals
			if ( decimalPlaces( value ) > decimals || toInt( value ) % toInt( param ) !== 0 ) {
				valid = false;
			}

			return this.optional( element ) || valid;
		},

		// https://jqueryvalidation.org/equalTo-method/
		equalTo: function( value, element, param ) {

			// Bind to the blur event of the target in order to revalidate whenever the target field is updated
			var target = $( param );
			if ( this.settings.onfocusout && target.not( ".validate-equalTo-blur" ).length ) {
				target.addClass( "validate-equalTo-blur" ).on( "blur.validate-equalTo", function() {
					$( element ).valid();
				} );
			}
			return value === target.val();
		},

		// https://jqueryvalidation.org/remote-method/
		remote: function( value, element, param, method ) {
			if ( this.optional( element ) ) {
				return "dependency-mismatch";
			}

			method = typeof method === "string" && method || "remote";

			var previous = this.previousValue( element, method ),
				validator, data, optionDataString;

			if ( !this.settings.messages[ element.name ] ) {
				this.settings.messages[ element.name ] = {};
			}
			previous.originalMessage = previous.originalMessage || this.settings.messages[ element.name ][ method ];
			this.settings.messages[ element.name ][ method ] = previous.message;

			param = typeof param === "string" && { url: param } || param;
			optionDataString = $.param( $.extend( { data: value }, param.data ) );
			if ( previous.old === optionDataString ) {
				return previous.valid;
			}

			previous.old = optionDataString;
			validator = this;
			this.startRequest( element );
			data = {};
			data[ element.name ] = value;
			$.ajax( $.extend( true, {
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				context: validator.currentForm,
				success: function( response ) {
					var valid = response === true || response === "true",
						errors, message, submitted;

					validator.settings.messages[ element.name ][ method ] = previous.originalMessage;
					if ( valid ) {
						submitted = validator.formSubmitted;
						validator.resetInternals();
						validator.toHide = validator.errorsFor( element );
						validator.formSubmitted = submitted;
						validator.successList.push( element );
						validator.invalid[ element.name ] = false;
						validator.showErrors();
					} else {
						errors = {};
						message = response || validator.defaultMessage( element, { method: method, parameters: value } );
						errors[ element.name ] = previous.message = message;
						validator.invalid[ element.name ] = true;
						validator.showErrors( errors );
					}
					previous.valid = valid;
					validator.stopRequest( element, valid );
				}
			}, param ) );
			return "pending";
		}
	}

} );

// Ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()

var pendingRequests = {},
	ajax;

// Use a prefilter if available (1.5+)
if ( $.ajaxPrefilter ) {
	$.ajaxPrefilter( function( settings, _, xhr ) {
		var port = settings.port;
		if ( settings.mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = xhr;
		}
	} );
} else {

	// Proxy ajax
	ajax = $.ajax;
	$.ajax = function( settings ) {
		var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
			port = ( "port" in settings ? settings : $.ajaxSettings ).port;
		if ( mode === "abort" ) {
			if ( pendingRequests[ port ] ) {
				pendingRequests[ port ].abort();
			}
			pendingRequests[ port ] = ajax.apply( this, arguments );
			return pendingRequests[ port ];
		}
		return ajax.apply( this, arguments );
	};
}
return $;
}));
