"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8025],{43288:function(e,t,r){r.d(t,{SC:function(){return i},ai:function(){return d},o_:function(){return s},vg:function(){return l}});var a=r(56947),n=r(70926);let o="320px",l={xxs:"12",xs:"15",sm:"18.75",md:"23.4375",lg:"29.296875",xl:"36.62109375",xxl:"45.7763671875",xxxl:"57.220458984375"},i=(e,t)=>{let r=Number((0,n._K)(e));return`${Number(t)/r*100}vw`},s=`
  @media (min-width: 0) {
    .storycard--headline {
      font-size: ${i(o,l.md)};
    }

    .storycard--detail {
      font-size: ${i(o,l.xs)};
    }
  }

  @media (min-width: ${a.breakpoints.md}) {
    .storycard--headline {
      font-size: ${i(a.breakpoints.md,l.lg)};
    }

    .storycard--detail {
      font-size: ${i(a.breakpoints.md,l.sm)};
    }
  }

  @media (min-width: ${a.breakpoints.lg}) {
    .storycard--headline {
      font-size: ${i(a.breakpoints.lg,l.lg)};
    }

    .storycard--detail {
      font-size: ${i(a.breakpoints.lg,l.sm)};
    }
  }

  @media (min-width: ${a.breakpoints.xl}) {
    .storycard--headline {
      font-size: ${+l.xl}px;
    }

    .storycard--detail {
      font-size: ${+l.md}px;
    }
  }
`,d=`
  @media (min-width: 0) {
    .storycard--headline {
      font-size: ${i(o,l.xxs)};
    }

    .storycard--detail {
      font-size: ${i(o,l.xxs)};
    }
  }

  @media (min-width: ${a.breakpoints.md}) {
    .storycard--headline {
      font-size: ${i(a.breakpoints.md,l.xs)};
    }

    .storycard--detail {
      font-size: ${i(a.breakpoints.md,l.xxs)};
    }
  }

  @media (min-width: ${a.breakpoints.lg}) {
    .storycard--headline {
      font-size: ${i(a.breakpoints.lg,l.xs)};
    }

    .storycard--detail {
      font-size: ${i(a.breakpoints.lg,l.xxs)};
    }
  }

  @media (min-width: ${a.breakpoints.xl}) {
    .storycard--headline {
      font-size: ${+l.sm}px;
    }

    .storycard--detail {
      font-size: ${+l.xs}px;
    }
  }
`},25884:function(e,t,r){r.r(t),r.d(t,{BANNER_TEST_ID:function(){return h},Banner:function(){return k}});var a=r(85893),n=r(55390),o=r(19521),l=r(56947),i=r(43288);let s=e=>{let t=l.space.generic;switch(e){case"tiny":return t.x1;case"tight":return t.x3;case"standard":case"default":return t.x4;case"wide":return t.x5;case"jumbo":return t.x8;default:return"0"}},d=o.ZP.div.withConfig({displayName:"styles__BannerWrapper",componentId:"sc-184cqtp-0"})(["position:relative;z-index:0;display:block;overflow:hidden;max-width:1200px;margin:"," auto ",";line-height:1;border-bottom:1.5px solid white;background-color:",";",";.banner--link{color:",";}.storycard--text{color:",";justify-content:center;text-align:center;padding:"," 0;}.storycard--headline{margin-bottom:",";padding-bottom:0;}"],e=>s(e.marginTop),e=>s(e.marginBottom),e=>{var t;return null!==(t=e.bgColor)&&void 0!==t?t:l.colors.palette.gray.darkest},i.o_,e=>e.textColor,e=>e.textColor,l.space.generic.x3,l.space.generic.x1);var c=r(36679);let p=({children:e,links:t=[],linkType:r="none"})=>{var n;if("url"!==r||!(null!==(n=t[0])&&void 0!==n&&n.link_url))return(0,a.jsx)(a.Fragment,{children:e});let o=t[0];return(0,a.jsx)(c.F,{className:"banner--link","data-lnk":o.link_tag,"data-test":"banner-link",href:o.link_url,underline:"invert",children:e})};p.displayName="BannerLink";let u={gray:l.colors.palette.gray.medium,grayDark:l.colors.palette.gray.dark,grayDarkest:l.colors.palette.gray.darkest,grayLight:l.colors.palette.gray.light,grayLightest:l.colors.palette.gray.lightest,green:l.colors.palette.green.default,greenDark:l.colors.palette.green.dark,orange:l.colors.palette.orange.default,orangeDark:l.colors.palette.orange.dark,orangeLight:l.colors.palette.orange.light,blue:l.colors.palette.blue.default,red:l.colors.palette.red.default,redDark:l.colors.palette.red.dark,redDarkest:l.colors.interactive.primary.active,transparent:"transparent",white:l.colors.palette.white,yellow:l.colors.palette.yellow.default,darkRed:l.colors.palette.red.dark,black:l.colors.palette.gray.darkest},g={dark:l.colors.palette.gray.darkest,light:l.colors.palette.white},m=e=>e&&Object.keys(u).includes(e)?u[e]:e,y=(e,t)=>e&&g[e]?g[e]:"white"===t?l.colors.palette.gray.darkest:l.colors.palette.white,h="@web/SlingshotComponents/Banner",k=({content:e})=>(0,a.jsx)(d,{bgColor:m(null==e?void 0:e.background_color),"data-test":h,marginBottom:null==e?void 0:e.margin_bottom,marginTop:null==e?void 0:e.margin_top,textColor:y(null==e?void 0:e.text_color,null==e?void 0:e.background_color),children:(0,a.jsx)(p,{links:null==e?void 0:e.links,linkType:null==e?void 0:e.link_type,children:(0,a.jsxs)("div",{className:"storycard--text",children:[(null==e?void 0:e.headline)&&(0,n.K)(null==e?void 0:e.headline,"h2","storycard--headline"),(null==e?void 0:e.subhead)&&(0,n.K)(null==e?void 0:e.subhead,"div","storycard--detail")]})})});k.displayName="Banner"},55390:function(e,t,r){r.d(t,{K:function(){return l}});var a=r(59499),n=r(85893);function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,a)}return r}let l=(e,t="div",r,l)=>(0,n.jsx)(t,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach(function(t){(0,a.Z)(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({className:r,dangerouslySetInnerHTML:{__html:e}},l))}}]);