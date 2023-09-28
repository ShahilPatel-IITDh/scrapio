"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1711],{68467:function(n,t,e){e.d(t,{Z:function(){return m}});var i=e(24246),r=e(27378),o=e(26450),c=e(15937),u=e(85854),a=e(39625),f=e(4586);var d=e(33180);function s(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function p(){return p=Object.assign||function(n){for(var t=1;t<arguments.length;t++){var e=arguments[t];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(n[i]=e[i])}return n},p.apply(this,arguments)}function l(n,t){if(null==n)return{};var e,i,r=function(n,t){if(null==n)return{};var e,i,r={},o=Object.keys(n);for(i=0;i<o.length;i++)e=o[i],t.indexOf(e)>=0||(r[e]=n[e]);return r}(n,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(i=0;i<o.length;i++)e=o[i],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(r[e]=n[e])}return r}function g(){var n,t,e=(n=["\n  ","\n"],t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}})));return g=function(){return e},e}var h=(0,c.ZP)((function(n){n.styledProps;var t=n.buttonRef,e=l(n,["styledProps","buttonRef"]);return(0,i.jsx)("button",function(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{},i=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(e).filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})))),i.forEach((function(t){s(n,t,e[t])}))}return n}({},e,{ref:t}))})).withConfig({componentId:"sc-ca90c2ac-0"})(g(),d.Z),m=function(n){var t=p({},n),e=(0,r.useState)(!1),c=e[0],d=e[1],s=!(0,f.Z)((function(){return"ontouchstart"in window||window.navigator.MaxTouchPoints>0||window.navigator.msMaxTouchPoints>0}))()&&t.tooltipLabel;return(0,i.jsxs)(h,{buttonRef:t.buttonRef,onClick:t.onClick,id:t.id,type:t.type||"button",disabled:t.isDisabled,className:t.className,styledProps:{color:t.color,size:t.size,shape:t.shape,lowercase:t.lowercase,fontWeight:t.fontWeight},children:[(0,i.jsxs)("span",{children:[t.label,t.icon&&(0,i.jsx)(u.Z,{dashboard:t.dashboard,image:t.icon})]}),(0,i.jsx)("span",{children:t.isFetching&&(0,i.jsx)(a.Z,{color:t.dotColor,size:t.dotSize})}),t.children,s&&(0,i.jsx)(o.u,{placement:t.placement,isOpen:c,target:t.id||"",toggle:function(){d(!0)},delay:{show:0,hide:0},children:t.tooltipLabel})]})}},11634:function(n,t,e){var i=e(24246),r=e(27378),o=e(83573),c=e(88038),u=e(86677),a=e(15937),f=e(79758),d=e(66514),s=e(2773),p=e(1527);t.Z=function(n){var t,e,l,g=n.pageTitle,h=n.pageDescription,m=n.forceNoIndex,x=void 0!==m&&m,v=(0,o.Z)(),b=(0,s.P)().locale,w=(0,u.useRouter)(),y=w.pathname,P=w.query,Z=(0,r.useContext)(a.Ni),O=Z.seo,C=Z.customTranslations,j=(0,d.Z)(P,f.Hk),k=(0,i.jsx)("meta",{name:"robots",content:"noindex"}),I=null===(t=y.split("/"))||void 0===t?void 0:t[4],z=Object.keys(O.seoContent),A=null===(e=O.seoContent)||void 0===e?void 0:e[I],S=null===C||void 0===C||null===(l=C[b])||void 0===l?void 0:l[I],L=null===A||void 0===A?void 0:A.canonicalLink,R=Object.keys(j).some((function(n){return!f.CX.includes(n)})),T=!!(null===j||void 0===j?void 0:j.state)&&!f.$j.includes(null===j||void 0===j?void 0:j.state),$=null===O||void 0===O?void 0:O.noIndex,_=!z.some((function(n){return I===n})),E=y===f.xZ,N=[x,$,!$&&_,!$&&R,!$&&T].some((function(n){return n})),D=null===S||void 0===S?void 0:S.title;return D||g?(0,i.jsxs)(c.default,{children:[(0,i.jsx)("title",{children:D||g}),(0,i.jsx)("meta",{name:"description",content:h||(null===S||void 0===S?void 0:S.description)||v.formatMessage(p.Z.metaDescription)}),E?null:N&&k,!N&&(null===L||void 0===L?void 0:L.length)&&(0,i.jsx)("link",{rel:"canonical",href:L})]}):null}},33533:function(n,t,e){e.d(t,{n2:function(){return W},kg:function(){return F},m8:function(){return H},Qy:function(){return M},im:function(){return Y},q_:function(){return q},J1:function(){return G},Dx:function(){return J},ee:function(){return U},Zg:function(){return X},dk:function(){return K},k2:function(){return V},iR:function(){return nn},c:function(){return tn},Qx:function(){return en},EL:function(){return rn},RZ:function(){return on},Tv:function(){return cn},hO:function(){return un},bx:function(){return an},f7:function(){return fn},hI:function(){return dn},wS:function(){return sn},A0:function(){return pn}});var i=e(15937),r=e(22731),o=e(68467);function c(n,t){return t||(t=n.slice(0)),Object.freeze(Object.defineProperties(n,{raw:{value:Object.freeze(t)}}))}function u(){var n=c(["\n  ",";\n"]);return u=function(){return n},n}function a(){var n=c(["\n  margin-left: auto;\n  margin-right: auto;\n"]);return a=function(){return n},n}function f(){var n=c(["\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  margin-bottom: 5px;\n"]);return f=function(){return n},n}function d(){var n=c(["\n  display: block;\n  font-size: 12px;\n  line-height: 14px;\n  color: ",";\n  transition: color ",";\n  ",";\n"]);return d=function(){return n},n}function s(){var n=c(["\n      @media screen and (min-width: ",") {\n        padding: 0 50px 0;\n      }\n    "]);return s=function(){return n},n}function p(){var n=c(["\n      @media screen and (min-width: ",") {\n        margin-bottom: 10px;\n      }\n    "]);return p=function(){return n},n}function l(){var n=c(["\n  margin: 0 auto;\n  width: 100%;\n  padding: 0 10px 0;\n\n  @media screen and (min-width: ",") {\n    padding: 0 20px 0;\n  }\n\n  @media screen and (min-width: ",") {\n    padding: 0 14.7px 0;\n  }\n  @media screen and (max-width: ",") {\n    max-width: 500px;\n    min-width: 250px;\n  }\n  h1,\n  > h2 {\n    width: 100%;\n    min-width: 0;\n    font-weight: 700;\n    font-size: 16px;\n    line-height: 20px;\n    color: ",";\n    word-wrap: break-word;\n  }\n  > h1,\n  > h2 {\n    margin-bottom: ",";\n  }\n  h3 {\n    width: 100%;\n    min-width: 0;\n    font-weight: 700;\n    font-size: 14px;\n    line-height: 20px;\n    color: ",";\n    word-wrap: break-word;\n    margin-bottom: 10px;\n  }\n  p {\n    width: 100%;\n    min-width: 0;\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 16px;\n    color: ",";\n    word-wrap: break-word;\n  }\n\n  ","\n\n  ","\n"]);return l=function(){return n},n}function g(){var n=c(["\n  background-color: ",";\n  position: relative;\n  z-index: ",";\n\n  @media screen and (min-width: ",") {\n    width: ",";\n  }\n\n  @media screen and (min-width: ",") {\n    width: 100%;\n  }\n\n  @media screen and (max-width: ",") {\n    padding: 11px 15px;\n  }\n"]);return g=function(){return n},n}function h(){var n=c(["\n      @media screen and (max-width: ",") {\n        > h2 {\n          margin-bottom: 0;\n        }\n\n        > * {\n          max-width: 320px;\n          margin: 0 auto;\n        }\n      }\n    "]);return h=function(){return n},n}function m(){var n=c(["\n  margin: 0;\n  padding: 0 14.7px 0;\n  width: 100%;\n  background-color: ",";\n  position: relative;\n  z-index: ",";\n\n  @media screen and (max-width: ",") {\n    max-width: unset;\n  }\n\n  > h2 {\n    font-weight: 400;\n    font-size: 14px;\n    line-height: 16px;\n  }\n\n  ","\n"]);return m=function(){return n},n}function x(){var n=c(["\n      padding-bottom: ",";\n      text-align: center;\n    "]);return x=function(){return n},n}function v(){var n=c(["\n  margin-top: 0;\n  width: 100%;\n  min-width: 0px;\n  font-weight: 700;\n  font-size: 16px;\n  line-height: 19px;\n  color: ",";\n  word-wrap: break-word;\n\n  ","\n"]);return v=function(){return n},n}function b(){var n=c(["\n  text-align: center;\n  margin-bottom: 10px;\n"]);return b=function(){return n},n}function w(){var n=c(["\n      display: block;\n      text-align: center;\n      margin: 20px 0;\n    "]);return w=function(){return n},n}function y(){var n=c(["\n  font-size: 12px;\n  line-height: 14px;\n  color: ",";\n  text-decoration: underline;\n  ","\n  @media (hover: hover) {\n    &:hover {\n      color: ",";\n    }\n  }\n"]);return y=function(){return n},n}function P(){var n=c(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin: 0;\n  width: 100%;\n  ",";\n  &:not(:last-child) {\n    ",";\n  }\n"]);return P=function(){return n},n}function Z(){var n=c(["\n  background: none;\n  border: none;\n  padding: 0;\n  color: ",";\n  text-decoration: underline;\n  cursor: pointer;\n"]);return Z=function(){return n},n}function O(){var n=c(["\n  font-size: 12px;\n  line-height: 20px;\n  color: ",";\n"]);return O=function(){return n},n}function C(){var n=c(["\n  margin-top: 5px;\n  font-size: 12px;\n  line-height: 14px;\n  color: ",";\n"]);return C=function(){return n},n}function j(){var n=c(["\n  display: flex;\n  padding-top: 60px;\n  min-height: 100vh;\n  justify-content: center;\n  @media screen and (max-width: ",") {\n    flex: 1;\n    flex-direction: column;\n    align-items: center;\n    justify-content: flex-start;\n    padding-left: 0;\n    padding-top: 60px;\n    height: 100%;\n  }\n  @media screen and (max-width: ",") {\n    padding-top: 60px;\n  }\n"]);return j=function(){return n},n}function k(){var n=c(["\n  font-size: 12px;\n  line-height: 14px;\n  color: ",";\n  p {\n    font-size: inherit;\n    line-height: inherit;\n    line-height: inherit;\n  }\n  ul {\n    margin: 0 0 20px 0;\n    padding: 0;\n    list-style: inside;\n  }\n"]);return k=function(){return n},n}function I(){var n=c(["\n  display: none;\n"]);return I=function(){return n},n}function z(){var n=c(["\n  padding-left: 20px;\n  margin: 0;\n  margin-bottom: 15px;\n\n  & li {\n    text-transform: lowercase;\n  }\n"]);return z=function(){return n},n}function A(){var n=c(["\n  margin-bottom: 40px;\n  p {\n    font-size: 12px;\n    margin-bottom: 20px;\n    margin-top: -12px;\n    color: ",";\n  }\n"]);return A=function(){return n},n}function S(){var n=c(["\n  margin-top: 7px;\n  p {\n    margin-bottom: 15px;\n    font-size: 13px;\n  }\n"]);return S=function(){return n},n}function L(){var n=c(["\n  margin-top: 30px;\n  margin-bottom: 50px;\n  p {\n    font-size: 13px;\n  }\n"]);return L=function(){return n},n}function R(){var n=c(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 8px 6px;\n  height: 36px;\n  border-radius: 3px;\n  font-weight: 500;\n  font-size: 14px;\n  line-height: 18px;\n  min-width: auto;\n  width: 100%;\n  color: ",";\n  background-color: ",";\n"]);return R=function(){return n},n}function T(){var n=c(["\n          margin-top: 30px;\n        "]);return T=function(){return n},n}function $(){var n=c(["\n          margin-top: 0;\n        "]);return $=function(){return n},n}function _(){var n=c(["\n  display: inline-flex;\n  color: ",";\n  font-weight: 400;\n  text-decoration: underline;\n  border: 0;\n\n  &:hover {\n    color: ",";\n  }\n\n  ","\n"]);return _=function(){return n},n}function E(){var n=c(["\n  background: ",";\n  height: 20px;\n  width: 20px;\n  background-size: cover;\n  margin-right: ",";\n"]);return E=function(){return n},n}function N(){var n=c(["\n  display: flex;\n  align-items: center;\n  position: relative;\n"]);return N=function(){return n},n}function D(){var n=c(["\n  p {\n    color: ",";\n  }\n"]);return D=function(){return n},n}function B(){var n=c(["\n  display: block;\n"]);return B=function(){return n},n}function Q(){var n=c(["\n  display: flex;\n  justify-content: ",";\n  align-items: ",";\n  flex-direction: ",";\n"]);return Q=function(){return n},n}var W=i.ZP.div.withConfig({componentId:"sc-fedb6604-0"})(u(),(function(n){return n.addSpace&&"margin-top: 15px;"})),F=i.ZP.div.withConfig({componentId:"sc-fedb6604-1"})(a()),H=i.ZP.div.withConfig({componentId:"sc-fedb6604-2"})(f()),M=i.ZP.label.withConfig({componentId:"sc-fedb6604-3"})(d(),r.O9.gray,r.oQ,(function(n){return n.hasError&&"color: ".concat(r.O9.error)})),Y=i.ZP.div.withConfig({componentId:"sc-fedb6604-4"})(l(),r.xs,r.a8,r.xY,r.O9.txtPrimary,(function(n){var t=n.theme;return n.isLoginPage&&t.optionalPages.oneStepLogin?"0":"10px"}),r.O9.txtPrimary,r.O9.txtPrimary,(function(n){return!n.isLoginPage&&(0,i.iv)(s(),r.a8)}),(function(n){return n.spacingBottom&&(0,i.iv)(p(),r.a8)})),q=(0,i.ZP)(Y).withConfig({componentId:"sc-fedb6604-5"})(g(),r.O9.bgPrimary,r.W5.sky,r.tO,(function(n){return n.isLoginPage&&"320px;"}),r.CA,r.CA),G=(0,i.ZP)(Y).withConfig({componentId:"sc-fedb6604-6"})(m(),r.O9.bgPrimary,r.W5.sky,r.xY,(function(n){return n.isLoginPage&&(0,i.iv)(h(),r.CA)})),J=i.ZP.h1.withConfig({componentId:"sc-fedb6604-7"})(v(),r.O9.black,(function(n){return n.isLoginPage&&(0,i.iv)(x(),n.spacingBottom&&"20px")})),U=(i.ZP.h2.withConfig({componentId:"sc-fedb6604-8"})(b()),i.ZP.a.withConfig({componentId:"sc-fedb6604-9"})(y(),r.O9.gray,(function(n){return n.center&&(0,i.iv)(w())}),r.O9.linkHover)),X=i.ZP.div.withConfig({componentId:"sc-fedb6604-10"})(P(),(function(n){return n.topSpace&&"margin-top: 40px;"}),(function(n){return"margin-bottom: ".concat(n.marginBottom||15,"px;")})),K=(i.ZP.button.withConfig({componentId:"sc-fedb6604-11"})(Z(),r.O9.blue),i.ZP.label.withConfig({componentId:"sc-fedb6604-12"})(O(),r.O9.deepGray),i.ZP.div.withConfig({componentId:"sc-fedb6604-13"})(C(),r.O9.black)),V=i.ZP.div.withConfig({componentId:"sc-fedb6604-14"})(j(),r.pB,r.xY),nn=i.ZP.div.withConfig({componentId:"sc-fedb6604-15"})(k(),r.O9.black),tn=i.ZP.div.withConfig({componentId:"sc-fedb6604-16"})(I()),en=i.ZP.ul.withConfig({componentId:"sc-fedb6604-17"})(z()),rn=(i.ZP.div.withConfig({componentId:"sc-fedb6604-18"})(A(),r.O9.error),i.ZP.div.withConfig({componentId:"sc-fedb6604-19"})(S())),on=i.ZP.div.withConfig({componentId:"sc-fedb6604-20"})(L()),cn=i.ZP.div.withConfig({componentId:"sc-fedb6604-21"})(R(),r.O9.white,r.O9.success),un=(0,i.ZP)(o.Z).withConfig({componentId:"sc-fedb6604-22"})(_(),r.O9.black,r.O9.linkHover,(function(n){return"md"===n.marginTop?(0,i.iv)(T()):(0,i.iv)($())})),an=i.ZP.img.withConfig({componentId:"sc-fedb6604-23"})(E(),(function(n){var t=n.src;return"url(".concat(t,") no-repeat center center")}),(function(n){return n.textSpacing&&"5px"})),fn=i.ZP.span.withConfig({componentId:"sc-fedb6604-24"})(N()),dn=i.ZP.div.withConfig({componentId:"sc-fedb6604-25"})(D(),r.O9.gray),sn=i.ZP.strong.withConfig({componentId:"sc-fedb6604-26"})(B()),pn=i.ZP.div.withConfig({componentId:"sc-fedb6604-27"})(Q(),(function(n){return n.justify}),(function(n){return n.align}),(function(n){return n.direction}))},78858:function(n,t,e){e.d(t,{fi:function(){return i},lg:function(){return r},mO:function(){return o},QT:function(){return c},se:function(){return u},k1:function(){return a},_w:function(){return f},IA:function(){return d},k5:function(){return s},aU:function(){return p}});var i=/^(?=.*[A-Z])/,r=/^(?=.*[a-z])/,o=/^(?=.*[0-9])/,c=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,15}$/i,u=/^(\+48)(50|51|53|57|60|66|69|72|73|78|79|88|45)\d{7}$/i,a=/^(\w[-.]?)*(\w)+$/i,f=/^[0-9]{2}-[0-9]{3}$/,d=/^([A-Za-z\u017c\u017a\u0107\u0144\xf3\u0142\u0119\u0105\u015b\u017b\u0179\u0106\u0104\u015a\u0118\u0141\xd3\u0143]{2,}\s[A-Za-z\u017c\u017a\u0107\u0144\xf3\u0142\u0119\u0105\u015b\u017b\u0179\u0106\u0104\u015a\u0118\u0141\xd3\u0143]{1,}'?-?[A-Za-z\u017c\u017a\u0107\u0144\xf3\u0142\u0119\u0105\u015b\u017b\u0179\u0106\u0104\u015a\u0118\u0141\xd3\u0143]{2,}\s?([A-Za-z\u017c\u017a\u0107\u0144\xf3\u0142\u0119\u0105\u015b\u017b\u0179\u0106\u0104\u015a\u0118\u0141\xd3\u0143]{1,})?)$/i,s=/^[A-Za-z\u017c\u017a\u0107\u0144\xf3\u0142\u0119\u0105\u015b\u017b\u0179\u0106\u0104\u015a\u0118\u0141\xd3\u0143\u0080-\u024F]+(?:([ - ']|(. ))[A-Za-z\u017c\u017a\u0107\u0144\xf3\u0142\u0119\u0105\u015b\u017b\u0179\u0106\u0104\u015a\u0118\u0141\xd3\u0143\u0080-\u024F]+)*$/i,p=/\w*@.*\.(pl|com)/}}]);