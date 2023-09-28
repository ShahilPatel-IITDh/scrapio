"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6227],{83119:function(e,t,i){i.d(t,{J:function(){return y}});var n=i(59499),r=i(4730),a=i(85893),o=i(67294),d=i(19521),l=i(56947);let s={xs:"0",sm:l.breakpoints.sm,md:l.breakpoints.md,lg:l.breakpoints.lg,xl:l.breakpoints.xl},p=e=>`${e/12*100}%`,m=e=>!0===e?1:e,u=e=>!0===e?1:e,c=e=>{let t=`${e}Offset`;return(0,d.iv)(["@media (min-width:","){margin-left:",";",";}"],s[`${e}`],e=>e[`${t}`]?p(e[`${t}`]):"initial",t=>{if(!t[`${e}`])return null;if("auto"===t[`${e}`])return`
            flex: 0 0 auto;
          `;if("boolean"==typeof t[`${e}`])return`
            flex-grow: 1;
            flex-basis: auto;
            max-width: 100%;
          `;let i=p(t[`${e}`]);return`
          flex-basis: ${i};
          max-width: ${i};
        `})},f=(e,t)=>(0,d.iv)(["@media (min-width:","){flex-shrink:",";}"],s[`${t}`],m(e)),h=(e,t)=>e?(0,d.iv)(["@media (min-width:","){flex-grow:",";}"],s[`${t}`],u(e)):null,x=d.ZP.div.withConfig({displayName:"styles__StyledCol",componentId:"sc-fw90uk-0"})(["box-sizing:border-box;flex:0 0 auto;padding-right:0;padding-left:0;border-right-color:inherit;flex-direction:row;",";",";",";",";",";",";",";",";",";",";",";",";",";",";",";",";"," "," "," "," "," "," "," "," "," ",""],({fill:e})=>e&&`
    height: 100%;
    width: 100%;
  `,({xs:e})=>e&&c("xs"),({sm:e})=>e&&c("sm"),({md:e})=>e&&c("md"),({lg:e})=>e&&c("lg"),({xl:e})=>e&&c("xl"),({xsShrink:e})=>e&&f(e,"xs"),({smShrink:e})=>e&&f(e,"sm"),({mdShrink:e})=>e&&f(e,"md"),({lgShrink:e})=>e&&f(e,"lg"),({xlShrink:e})=>e&&f(e,"xl"),({xsGrow:e})=>e&&h(e,"xs"),({smGrow:e})=>e&&h(e,"sm"),({mdGrow:e})=>e&&h(e,"md"),({lgGrow:e})=>e&&h(e,"lg"),({xlGrow:e})=>e&&h(e,"xl"),({xsHiddenUp:e})=>e&&"display: none !important;",({xsHiddenDown:e})=>e&&`
    @media (max-width: ${l.breakpoints.xsMax}) {
      display: none !important;
    }
  `,({smHiddenUp:e})=>e&&`
    @media (min-width: ${l.breakpoints.sm}) {
      display: none !important;
    }
  `,({smHiddenDown:e})=>e&&`
    @media (max-width: ${l.breakpoints.smMax}) {
      display: none !important;
    }
  `,({mdHiddenUp:e})=>e&&`
    @media (min-width: ${l.breakpoints.md}) {
      display: none !important;
    }
  `,({mdHiddenDown:e})=>e&&`
    @media (max-width: ${l.breakpoints.mdMax}) {
      display: none !important;
    }
  `,({lgHiddenUp:e})=>e&&`
    @media (min-width: ${l.breakpoints.lg}) {
      display: none !important;
    }
  `,({lgHiddenDown:e})=>e&&`
    @media (max-width: ${l.breakpoints.lgMax}) {
      display: none !important;
    }
  `,({xlHiddenUp:e})=>e&&`
    @media (min-width: ${l.breakpoints.xl}) {
      display: none !important;
    }
  `,({xlHiddenDown:e})=>e&&"display: none !important;"),b=["children"];function w(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,n)}return i}function g(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?w(Object(i),!0).forEach(function(t){(0,n.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):w(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}let y=(0,o.forwardRef)((e,t)=>{let{children:i}=e,n=(0,r.Z)(e,b);return(0,a.jsx)(x,g(g({},n),{},{as:n.tagName,ref:t,children:i}))});y.displayName="Col"},90203:function(e,t,i){i.r(t),i.d(t,{default:function(){return p}});var n=i(85893),r=i(11163),a=i(30896),o=i(13483),d=i(32657),l=i(70958),s=i(83119);let p=e=>{var t,i,p,m;let{asPath:u}=(0,r.useRouter)(),c=(0,d.oe)(u),f=null!==(t=null==e?void 0:null===(i=e.content)||void 0===i?void 0:i.pos)&&void 0!==t?t:"",h=(0,a.KS)(c,f),x=null!==(p=null!==(m=h.pos)&&void 0!==m?m:null==f?void 0:f.toLowerCase())&&void 0!==p?p:"";return"btf"===x?(0,n.jsx)("div",{className:"l-container-fixed h-border-t h-padding-a-default","data-test":"adContainer",id:"adContainer",style:{overflow:"hidden",height:"auto"},children:(0,n.jsx)("div",{id:"adDesktopWrapperContainer",children:(0,n.jsx)(l.X,{className:"h-flex-justify-center",children:(0,n.jsx)(s.J,{className:"h-margin-r-default",children:(0,n.jsx)(o.M,{adName:x,showSponsored:!0})})})})}):(0,n.jsx)("div",{className:"l-container l-container-standard h-padding-t-default",children:(0,n.jsx)(o.M,{adName:x,showSponsored:!0})})};p.displayName="PubAdContainer"}}]);