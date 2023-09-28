"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[77216],{51302:function(e,t,n){var r=n(62814),o=n(34642),i=n(56515),a=n(9975),c=n(94103);function l(e){return e.substring(2).toLowerCase()}t.Z=function(e){let{children:t,disableReactTree:n=!1,mouseEvent:s="onClick",onClickAway:u,touchEvent:d="onTouchEnd"}=e,f=r.useRef(!1),h=r.useRef(null),m=r.useRef(!1),v=r.useRef(!1);r.useEffect(()=>(setTimeout(()=>{m.current=!0},0),()=>{m.current=!1}),[]);let p=(0,o.Z)(t.ref,h),g=(0,i.Z)(e=>{let t=v.current;v.current=!1;let r=(0,a.Z)(h.current);if(m.current&&h.current&&(!("clientX"in e)||!(r.documentElement.clientWidth<e.clientX)&&!(r.documentElement.clientHeight<e.clientY))){if(f.current){f.current=!1;return}(e.composedPath?e.composedPath().indexOf(h.current)>-1:!r.documentElement.contains(e.target)||h.current.contains(e.target))||!n&&t||u(e)}}),Z=e=>n=>{v.current=!0;let r=t.props[e];r&&r(n)},b={ref:p};return!1!==d&&(b[d]=Z(d)),r.useEffect(()=>{if(!1!==d){let e=l(d),t=(0,a.Z)(h.current),n=()=>{f.current=!0};return t.addEventListener(e,g),t.addEventListener("touchmove",n),()=>{t.removeEventListener(e,g),t.removeEventListener("touchmove",n)}}},[g,d]),!1!==s&&(b[s]=Z(s)),r.useEffect(()=>{if(!1!==s){let e=l(s),t=(0,a.Z)(h.current);return t.addEventListener(e,g),()=>{t.removeEventListener(e,g)}}},[g,s]),(0,c.jsx)(r.Fragment,{children:r.cloneElement(t,b)})}},62382:function(e,t,n){var r=n(44486),o=n(25260),i=n(62814),a=n(76565),c=n(70022),l=n(74028),s=n(3798),u=n(94103);let d=["addEndListener","appear","children","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","style","timeout","TransitionComponent"];function f(e){return`scale(${e}, ${e**2})`}let h={entering:{opacity:1,transform:f(1)},entered:{opacity:1,transform:"none"}},m="undefined"!=typeof navigator&&/^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent)&&/(os |version\/)15(.|_)4/i.test(navigator.userAgent),v=i.forwardRef(function(e,t){let{addEndListener:n,appear:v=!0,children:p,easing:g,in:Z,onEnter:b,onEntered:k,onEntering:E,onExit:x,onExited:C,onExiting:w,style:y,timeout:R="auto",TransitionComponent:S=a.ZP}=e,T=(0,o.Z)(e,d),L=i.useRef(),O=i.useRef(),M=(0,c.Z)(),P=i.useRef(null),j=(0,s.Z)(P,p.ref,t),A=e=>t=>{if(e){let n=P.current;void 0===t?e(n):e(n,t)}},H=A(E),z=A((e,t)=>{let n;(0,l.n)(e);let{duration:r,delay:o,easing:i}=(0,l.C)({style:y,timeout:R,easing:g},{mode:"enter"});"auto"===R?(n=M.transitions.getAutoHeightDuration(e.clientHeight),O.current=n):n=r,e.style.transition=[M.transitions.create("opacity",{duration:n,delay:o}),M.transitions.create("transform",{duration:m?n:.666*n,delay:o,easing:i})].join(","),b&&b(e,t)}),_=A(k),D=A(w),I=A(e=>{let t;let{duration:n,delay:r,easing:o}=(0,l.C)({style:y,timeout:R,easing:g},{mode:"exit"});"auto"===R?(t=M.transitions.getAutoHeightDuration(e.clientHeight),O.current=t):t=n,e.style.transition=[M.transitions.create("opacity",{duration:t,delay:r}),M.transitions.create("transform",{duration:m?t:.666*t,delay:m?r:r||.333*t,easing:o})].join(","),e.style.opacity=0,e.style.transform=f(.75),x&&x(e)}),B=A(C),N=e=>{"auto"===R&&(L.current=setTimeout(e,O.current||0)),n&&n(P.current,e)};return i.useEffect(()=>()=>{clearTimeout(L.current)},[]),(0,u.jsx)(S,(0,r.Z)({appear:v,in:Z,nodeRef:P,onEnter:z,onEntered:_,onEntering:H,onExit:I,onExited:B,onExiting:D,addEndListener:N,timeout:"auto"===R?null:R},T,{children:(e,t)=>i.cloneElement(p,(0,r.Z)({style:(0,r.Z)({opacity:0,transform:f(.75),visibility:"exited"!==e||Z?void 0:"hidden"},h[e],y,p.props.style),ref:j},t))}))});v.muiSupportAuto=!0,t.Z=v},33845:function(e,t,n){n.d(t,{Z:function(){return y}});var r=n(25260),o=n(44486),i=n(62814),a=n(75586),c=n(10962),l=n(51302),s=n(25152),u=n(70022),d=n(75436),f=n(90604),h=n(4070),m=n(62382),v=n(428),p=n(47106),g=n(34700);function Z(e){return(0,g.Z)("MuiSnackbar",e)}(0,p.Z)("MuiSnackbar",["root","anchorOriginTopCenter","anchorOriginBottomCenter","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft"]);var b=n(94103);let k=["onEnter","onExited"],E=["action","anchorOrigin","autoHideDuration","children","className","ClickAwayListenerProps","ContentProps","disableWindowBlurListener","message","onBlur","onClose","onFocus","onMouseEnter","onMouseLeave","open","resumeHideDuration","TransitionComponent","transitionDuration","TransitionProps"],x=e=>{let{classes:t,anchorOrigin:n}=e,r={root:["root",`anchorOrigin${(0,h.Z)(n.vertical)}${(0,h.Z)(n.horizontal)}`]};return(0,c.Z)(r,Z,t)},C=(0,s.ZP)("div",{name:"MuiSnackbar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[`anchorOrigin${(0,h.Z)(n.anchorOrigin.vertical)}${(0,h.Z)(n.anchorOrigin.horizontal)}`]]}})(({theme:e,ownerState:t})=>(0,o.Z)({zIndex:(e.vars||e).zIndex.snackbar,position:"fixed",display:"flex",left:8,right:8,justifyContent:"center",alignItems:"center"},"top"===t.anchorOrigin.vertical?{top:8}:{bottom:8},"left"===t.anchorOrigin.horizontal&&{justifyContent:"flex-start"},"right"===t.anchorOrigin.horizontal&&{justifyContent:"flex-end"},{[e.breakpoints.up("sm")]:(0,o.Z)({},"top"===t.anchorOrigin.vertical?{top:24}:{bottom:24},"center"===t.anchorOrigin.horizontal&&{left:"50%",right:"auto",transform:"translateX(-50%)"},"left"===t.anchorOrigin.horizontal&&{left:24,right:"auto"},"right"===t.anchorOrigin.horizontal&&{right:24,left:"auto"})})),w=i.forwardRef(function(e,t){let n=(0,d.Z)({props:e,name:"MuiSnackbar"}),c=(0,u.Z)(),s={enter:c.transitions.duration.enteringScreen,exit:c.transitions.duration.leavingScreen},{action:h,anchorOrigin:{vertical:p,horizontal:g}={vertical:"bottom",horizontal:"left"},autoHideDuration:Z=null,children:w,className:y,ClickAwayListenerProps:R,ContentProps:S,disableWindowBlurListener:T=!1,message:L,onBlur:O,onClose:M,onFocus:P,onMouseEnter:j,onMouseLeave:A,open:H,resumeHideDuration:z,TransitionComponent:_=m.Z,transitionDuration:D=s,TransitionProps:{onEnter:I,onExited:B}={}}=n,N=(0,r.Z)(n.TransitionProps,k),W=(0,r.Z)(n,E),X=(0,o.Z)({},n,{anchorOrigin:{vertical:p,horizontal:g}}),$=x(X),Y=i.useRef(),[F,G]=i.useState(!0),K=(0,f.Z)((...e)=>{M&&M(...e)}),q=(0,f.Z)(e=>{M&&null!=e&&(clearTimeout(Y.current),Y.current=setTimeout(()=>{K(null,"timeout")},e))});i.useEffect(()=>(H&&q(Z),()=>{clearTimeout(Y.current)}),[H,Z,q]);let J=()=>{clearTimeout(Y.current)},Q=i.useCallback(()=>{null!=Z&&q(null!=z?z:.5*Z)},[Z,z,q]),U=e=>{P&&P(e),J()},V=e=>{j&&j(e),J()},ee=e=>{O&&O(e),Q()},et=e=>{A&&A(e),Q()},en=e=>{M&&M(e,"clickaway")},er=e=>{G(!0),B&&B(e)},eo=(e,t)=>{G(!1),I&&I(e,t)};return(i.useEffect(()=>{if(!T&&H)return window.addEventListener("focus",Q),window.addEventListener("blur",J),()=>{window.removeEventListener("focus",Q),window.removeEventListener("blur",J)}},[T,Q,H]),i.useEffect(()=>{if(H)return document.addEventListener("keydown",e),()=>{document.removeEventListener("keydown",e)};function e(e){!e.defaultPrevented&&("Escape"===e.key||"Esc"===e.key)&&M&&M(e,"escapeKeyDown")}},[F,H,M]),!H&&F)?null:(0,b.jsx)(l.Z,(0,o.Z)({onClickAway:en},R,{children:(0,b.jsx)(C,(0,o.Z)({className:(0,a.Z)($.root,y),onBlur:ee,onFocus:U,onMouseEnter:V,onMouseLeave:et,ownerState:X,ref:t,role:"presentation"},W,{children:(0,b.jsx)(_,(0,o.Z)({appear:!0,in:H,timeout:D,direction:"top"===p?"down":"up",onEnter:eo,onExited:er},N,{children:w||(0,b.jsx)(v.Z,(0,o.Z)({message:L,action:h},S))}))}))}))});var y=w},428:function(e,t,n){n.d(t,{Z:function(){return x}});var r=n(25260),o=n(44486),i=n(62814),a=n(75586),c=n(10962),l=n(95789),s=n(25152),u=n(75436),d=n(43869),f=n(47106),h=n(34700);function m(e){return(0,h.Z)("MuiSnackbarContent",e)}(0,f.Z)("MuiSnackbarContent",["root","message","action"]);var v=n(94103);let p=["action","className","message","role"],g=e=>{let{classes:t}=e;return(0,c.Z)({root:["root"],action:["action"],message:["message"]},m,t)},Z=(0,s.ZP)(d.Z,{name:"MuiSnackbarContent",slot:"Root",overridesResolver:(e,t)=>t.root})(({theme:e})=>{let t="light"===e.palette.mode?.8:.98,n=(0,l._4)(e.palette.background.default,t);return(0,o.Z)({},e.typography.body2,{color:e.vars?e.vars.palette.SnackbarContent.color:e.palette.getContrastText(n),backgroundColor:e.vars?e.vars.palette.SnackbarContent.bg:n,display:"flex",alignItems:"center",flexWrap:"wrap",padding:"6px 16px",borderRadius:(e.vars||e).shape.borderRadius,flexGrow:1,[e.breakpoints.up("sm")]:{flexGrow:"initial",minWidth:288}})}),b=(0,s.ZP)("div",{name:"MuiSnackbarContent",slot:"Message",overridesResolver:(e,t)=>t.message})({padding:"8px 0"}),k=(0,s.ZP)("div",{name:"MuiSnackbarContent",slot:"Action",overridesResolver:(e,t)=>t.action})({display:"flex",alignItems:"center",marginLeft:"auto",paddingLeft:16,marginRight:-8}),E=i.forwardRef(function(e,t){let n=(0,u.Z)({props:e,name:"MuiSnackbarContent"}),{action:i,className:c,message:l,role:s="alert"}=n,d=(0,r.Z)(n,p),f=g(n);return(0,v.jsxs)(Z,(0,o.Z)({role:s,square:!0,elevation:6,className:(0,a.Z)(f.root,c),ownerState:n,ref:t},d,{children:[(0,v.jsx)(b,{className:f.message,ownerState:n,children:l}),i?(0,v.jsx)(k,{className:f.action,ownerState:n,children:i}):null]}))});var x=E},87596:function(e,t,n){n.d(t,{kP:function(){return o},t3:function(){return r}});let r=4e3,o=r},83040:function(e,t,n){n.d(t,{DH:function(){return c},wT:function(){return a}});var r=n(10860),o=n(62814);let i=(0,o.createContext)(void 0),a=e=>{let{handleClose:t,children:n}=e;return(0,r.tZ)(i.Provider,{value:{handleClose:t},children:n})},c=()=>{let e=(0,o.useContext)(i);if(!e)throw Error("useSnackbarContext must be used within a SnackbarProvider");return e}},53645:function(e,t,n){n.d(t,{A:function(){return f}});var r=n(10860),o=n(87596),i=n(83040),a=n(60860),c=n(6647),l=n(73063),s=n(69020),u=n(33845),d=n(62814);let f=(0,d.forwardRef)((e,t)=>{let{action:n,anchorOrigin:f={vertical:"bottom",horizontal:"center"},autoHideDuration:h=o.kP,message:m,withCloseIcon:v,onClose:p,type:g,children:Z,...b}=e,k=(0,d.useCallback)((e,t)=>{"clickaway"!==t&&(null==p||p(e,t))},[p]),E=(0,d.useMemo)(()=>n?(0,r.tZ)(l.Z,{variant:"text",size:"small",color:"inherit",onClick:n.onClick,children:n.label}):null,[n]),x=(0,d.useMemo)(()=>v?(0,r.BX)(r.HY,{children:[E,(0,r.tZ)(s.Z,{"aria-label":"close","data-testid":"fc-snackbar__close-button",onClick:e=>k(e,"escapeKeyDown"),color:"inherit",children:(0,r.tZ)(c.Z,{})})]}):n&&E,[n,E,k,v]);return(0,r.tZ)(u.Z,{ref:t,...b,autoHideDuration:h,anchorOrigin:f,action:x,onClose:k,message:!Z&&(0,r.tZ)(a.Z,{variant:"bodySmall",children:m}),sx:e=>({...!Z&&{width:{lg:e.spacing(86)}},".MuiSnackbarContent-root":{..."error"===g&&{backgroundColor:"error.main",color:"error.contrastText"}},".MuiButton-textInherit":{color:"error"===g?"inherit":"onSurface.inverseTertiary"}}),ContentProps:{role:"error"===g?"alert":"status",elevation:2},"data-testid":"error"===g?"fc-snackbar--error":"fc-snackbar--default",children:Z&&(0,r.tZ)("div",{children:(0,r.tZ)(i.wT,{handleClose:k,children:Z})})})});f.displayName="Snackbar"},77216:function(e,t,n){n.r(t),n.d(t,{NotificationsWrapper:function(){return E}});var r=n(10860),o=n(28334),i=n(34503),a=n(53645),c=n(428),l=n(79373),s=n(53336),u=n(10845),d=n(6647),f=n(73137),h=n.n(f),m=n(69020),v=n(62814),p=n(4489),g=n.n(p),Z=n(28986),b=n.n(Z);let k=g()(()=>Promise.all([n.e(29945),n.e(33076)]).then(n.bind(n,33076)).then(e=>e.AnalyticsWelcomeToastWrapper),{loadableGenerated:{webpack:()=>[33076]}}),E=()=>{var e;let t=(0,s.v9)(e=>e.notificationsReducer.snacks,b()),n=(0,s.v9)(e=>e.notificationsReducer.isOpen),f=(0,s.v9)(e=>e.notificationsReducer.currentSnack,b()),p=(0,s.v9)(e=>{var t;return!!(null===(t=e.notificationsReducer.analyticsWelcomeToast)||void 0===t?void 0:t.props)}),g=(0,s.I0)(),Z=(0,u.C)();(0,v.useEffect)(()=>{(null==t?void 0:t.length)&&!f?(g((0,l.pw)({...t[0]})),g((0,l.Io)(t.slice(1))),g((0,l.A_)(!0))):(null==t?void 0:t.length)&&f&&n&&g((0,l.A_)(!1))},[g,f,n,t]);let E=(e,t)=>{g((0,l.A_)(!1))},x=()=>{g((0,l.pw)(void 0))};return(0,r.tZ)(r.HY,{children:(0,r.BX)(o.x,{sx:e=>({".MuiSnackbar-root":{...Z&&{bottom:e.spacing(20)}}}),children:[(0,r.tZ)(a.A,{open:n,onClose:E,TransitionProps:{onExited:x},autoHideDuration:null==f?void 0:f.autoHideDuration,type:null==f?void 0:f.type,withCloseIcon:null==f?void 0:f.withCloseIcon,children:(0,r.tZ)(c.Z,{message:null==f?void 0:f.message,action:(0,r.BX)(r.HY,{children:[(null==f?void 0:null===(e=f.action)||void 0===e?void 0:e.href)?(0,r.tZ)(i.z,{component:h(),color:"inherit",href:f.action.href,variant:"text",children:f.action.label}):void 0,(null==f?void 0:f.withCloseIcon)&&(0,r.tZ)(m.Z,{"aria-label":"close","data-testid":"fc-snackbar__close-button",onClick:e=>E(e,"escapeKeyDown"),color:"inherit",children:(0,r.tZ)(d.Z,{})})]})})},f?f.key:void 0),p&&(0,r.tZ)(k,{})]})})}}}]);