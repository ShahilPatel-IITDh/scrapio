"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5703],{24333:function(e,t,i){i.d(t,{D:function(){return n}});var a=i(67294);function n(){let e=(0,a.useRef)(!1),t=(0,a.useCallback)(()=>e.current,[]);return(0,a.useEffect)(()=>(e.current=!0,()=>{e.current=!1}),[]),t}},90584:function(e,t,i){i.d(t,{J:function(){return k}});var a=i(85893),n=i(67294),l=i(53463),o=i(80564),r=i(72604),s=i(43430),d=i(67530),c=i(15138),p=i(50411);let m=({shoppableDrawerData:e})=>{var t,i;let n=null!==(t=null==e?void 0:null===(i=e.tcins)||void 0===i?void 0:i.replace(/\s+/g,""))&&void 0!==t?t:"",[l]=(0,c.Y)({tcins:n,pricing_store_id:"3991"}),o=l(e=>null==e?void 0:e.product_summaries);return(0,a.jsx)("div",{children:o&&(0,a.jsx)("ul",{"data-test":"shoppableDrawer-seo-list",children:null==o?void 0:o.map(e=>{var t,i,n,l,o,r;return(0,a.jsx)("li",{children:(0,a.jsx)(p.F,{"data-test":"shoppableDrawer-seo-link",href:null===(t=e.item)||void 0===t?void 0:null===(i=t.enrichment)||void 0===i?void 0:i.buy_url,children:null===(n=e.item)||void 0===n?void 0:null===(l=n.product_description)||void 0===l?void 0:l.title})},`${e.tcin} - ${null===(o=e.item)||void 0===o?void 0:null===(r=o.product_description)||void 0===r?void 0:r.title}`)})})})};m.displayName="ShoppableDrawerSeoLinks";var u=i(19521),g=i(15582),h=i(46652);let b=(0,u.ZP)(h._).withConfig({displayName:"styles__StyledIcon",componentId:"sc-c0dwwo-0"})(["z-index:",";"],g.kg.inlineOverlay),k=({blockIndex:e=0,children:t,componentId:i,linkType:c,shoppableDrawerData:p})=>{var u;let g=(0,s.rS)(),{isBot:h}=(0,n.useContext)(l.I.Context),k=()=>{y()},[v,{open:x,close:y}]=(0,o.I)({type:"drawer",shouldStack:!0,ModalProps:{onCloseClick:k}}),f=(0,n.useCallback)(t=>{t.stopPropagation(),g.trackEvent({guest:{eventType:"customInteraction"},customInteraction:{type:"click",value:`${i}_ShoppableDrawerOpen_${e+1}`}}),x()},[e,i,g,x]);if(!t)return null;if("shoppable_drawer"!==c||!n.isValidElement(t))return(0,a.jsx)(a.Fragment,{children:t});let _=n.cloneElement(t,{storycardChildren:(0,a.jsx)(b,{onClick:f}),onStoryblockImageContainerButtonClick:f});return(0,a.jsxs)("div",{children:[_,h?(0,a.jsx)(m,{shoppableDrawerData:p}):(0,a.jsx)(v,{headingText:null!==(u=null==p?void 0:p.headline)&&void 0!==u?u:"Explore items",children:(0,a.jsx)(d.M,{addToCartTrackingPlacementType:r.bo.StoryblockShoppableDrawer,componentId:i,shoppableDrawerData:null!=p?p:{}})})]})};k.displayName="StoryblockShoppableDrawerWrapper"},80296:function(e,t,i){i.d(t,{K:function(){return L}});var a=i(59499),n=i(85893),l=i(67294),o=i(96722),r=i(39788),s=i(94184),d=i.n(s),c=i(19521),p=i(22235),m=i(99093),u=i(84200),g=i(3313),h=i(83119),b=i(55390),k=i(56947);let v=({className:e,buttonColor:t,buttonUrl:i,buttonText:a,buttonTag:l,dataIndex:o,onClick:r,textAlignment:s="left"})=>{let d;switch(t){case"default":case"white":default:d=p.P;break;case"primary":d=m.D;break;case"darkRed":d=u.e;break;case"darkGray":d=g.q}return(0,n.jsx)(h.J,{className:`${e} mediaBlock--button h-text-${s}`,xs:!0,children:(0,n.jsx)(d,{"data-index":o,"data-lnk":l,href:i,onClick:r,role:i?"link":"button",children:(0,b.K)(a,"span")})})};v.displayName="StoryblockButton";let x=(0,c.ZP)(v).withConfig({displayName:"StoryblockButton__StyledStoryblockButton",componentId:"sc-zskg6c-0"})(["",";margin:0 "," ",";flex-grow:0;flex-basis:auto;@media (min-width:","){margin-bottom:0;}"],e=>e.hasShoppableDrawer?`padding-top: ${k.space.generic.x3}`:`padding-top: ${k.space.generic.x4};`,k.space.generic.x4,k.space.generic.x4,k.breakpoints.md);var y=i(12652),f=i(2181),_=i(24333),w=i(50411),C=i(43288);let j=c.ZP.div.withConfig({displayName:"styles__FilmstripWrapper",componentId:"sc-1nk1lqw-0"})(["--filmstrip-item-spacing:0;--filmstrip-button-dodge:0;--filmstrip-button-width:32px;[data-test='pagination-dots']{ul{position:relative;top:-20px;}}"]),$=c.ZP.div.withConfig({displayName:"styles__FilmstripItemContainer",componentId:"sc-1nk1lqw-1"})(["position:relative;width:100%;padding:",";a{display:block;color:",";}"],k.space.generic.x1,k.colors.palette.gray.darkest),S=c.ZP.div.withConfig({displayName:"styles__FilmstripItemText",componentId:"sc-1nk1lqw-2"})(["position:absolute;bottom:20px;text-align:center;width:100%;line-height:1.1;@media (min-width:0){.headline{font-size:",";}.subhead{font-size:",";}}@media (min-width:","){.headline{font-size:",";}.subhead{font-size:",";}}@media (min-width:","){.headline{font-size:",";}.subhead{font-size:",";}}@media (min-width:","){.headline{font-size:","px;}.subhead{font-size:","px;}}"],(0,C.SC)(k.breakpoints.sm,C.vg.md),(0,C.SC)(k.breakpoints.sm,C.vg.sm),k.breakpoints.md,(0,C.SC)(k.breakpoints.md,C.vg.sm),(0,C.SC)(k.breakpoints.md,C.vg.xs),k.breakpoints.lg,(0,C.SC)(k.breakpoints.lg,C.vg.sm),(0,C.SC)(k.breakpoints.lg,C.vg.xs),k.breakpoints.xl,C.vg.lg,C.vg.sm),I=c.ZP.div.withConfig({displayName:"styles__StoryblockBody",componentId:"sc-1nk1lqw-3"})(["margin:0 ",";flex-grow:1;a{text-decoration:underline;&:focus{text-decoration:none;outline:1px dashed ",";}}"],k.space.generic.x4,k.colors.palette.gray.darkest),N=c.ZP.button.withConfig({displayName:"styles__StoryblockButtonWrapper",componentId:"sc-1nk1lqw-4"})(["",";margin-bottom:auto;width:100%;&:hover,&:focus{text-decoration:underline;}"],e=>e.hasBody&&`padding-bottom: ${k.space.generic.x4};`),z=(0,c.ZP)(w.F).withConfig({displayName:"styles__StoryblockLinkWrapper",componentId:"sc-1nk1lqw-5"})(["flex-grow:1;display:block;"]);function P({aspectRatio:e,image:t}){var i,a;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(f.t,{alt:null===(i=t.image)||void 0===i?void 0:i.alt,aspectRatio:e,src:null===(a=t.image)||void 0===a?void 0:a.url}),(0,n.jsxs)(S,{children:[t.head&&(0,b.K)(t.head,"span","h-text-bold headline"),t.subhead&&(0,b.K)(t.subhead,"p","subhead")]})]})}function D({aspectRatio:e,image:t}){return(0,n.jsx)($,{children:t.link_url?(0,n.jsx)(w.F,{"data-lnk":t.link_tag,href:t.link_url,children:(0,n.jsx)(P,{aspectRatio:e,image:t})}):(0,n.jsx)(P,{aspectRatio:e,image:t})})}P.displayName="FilmstripItemContent",D.displayName="FilmstripItem";let O=e=>{let{children:t,className:i}=e;return(0,n.jsx)("div",{className:i,children:t})};O.displayName="StoryblockImageContainer";let T=(0,c.ZP)(O).withConfig({displayName:"StoryblockImageContainer__StyledStoryblockImageContainer",componentId:"sc-43626a-0"})(["width:100%;display:block;height:auto;padding-top:",";",";",";.storycard{overflow:visible;}"],k.space.generic.x4,e=>"shoppable_drawer"===e.buttonType&&"flex-grow: 1;",e=>e.hasHorizontalSpacing?`
      padding-left: ${k.space.generic.x4};
      padding-right: ${k.space.generic.x4};
      @media (min-width: ${k.breakpoints.md}) {
        padding: ${k.space.generic.x4} ${k.space.generic.x4} 0;
    }`:null);T.displayName="StyledStoryblockImageContainer";let B=({className:e,aspectRatio:t,images:i})=>{var a,l;return(0,_.D)()?(0,n.jsx)(j,{children:(0,n.jsx)(y.T,{alignItems:"carousel",className:e,hasNativeScrolling:!1,hasPaginationDots:!0,children:null==i?void 0:i.map((e,i)=>(0,n.jsx)(D,{aspectRatio:t,image:e},i))})}):(0,n.jsx)(T,{className:"h-padding-h-tight h-margin-b-tight",children:(0,n.jsx)(f.t,{alt:null==i?void 0:null===(a=i[0].image)||void 0===a?void 0:a.alt,aspectRatio:t,src:null==i?void 0:null===(l=i[0].image)||void 0===l?void 0:l.url})})};B.displayName="StoryblockCarousel";var E=i(41609),F=i.n(E);let R=e=>F()(e)?[]:[e.image_path_xl&&{media:k.breakpoints.xl,imageUrl:e.image_path_xl},e.image_path_lg&&{media:k.breakpoints.lg,imageUrl:e.image_path_lg},e.image_path_md&&{media:k.breakpoints.md,imageUrl:e.image_path_md},e.image_path&&{media:"0px",imageUrl:e.image_path}].filter(Boolean);var U=i(18267);function Z(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,a)}return i}function q(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?Z(Object(i),!0).forEach(function(t){(0,a.Z)(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):Z(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}let L=e=>{let t;let{button_color:i,componentId:a,image_aspect_ratio:s,image_aspect_ratio_md:c,index:p,item:m,storycardChildren:u,onClick:g,dataIndex:h,hasHorizontalSpacing:b,onStoryblockButtonClick:k,onStoryblockImageContainerButtonClick:v,text_alignment:y}=e,f=m.link_type,_=m.image&&Object.keys(m.image).some(e=>e.includes("image_path")),w=!!("url"===m.link_type&&m.link_url),{screenMd:C}=(0,o.l)(),j=e=>{var t,i,a,l,o;return(0,n.jsx)("div",{className:"h-margin-b-tight",children:(0,n.jsx)(U.e,{altText:null==m?void 0:null===(t=m.image)||void 0===t?void 0:t.image_alt_text,cardSizes:{base:s,mediumUp:c},dataIndex:h,dataLnk:m.link_tag,headline:null==m?void 0:null===(i=m.image)||void 0===i?void 0:i.image_headline,images:R(m.image),link_type:m.link_type,onClick:g,secondary_image:C?R(m.secondary_image):void 0,subhead:null==m?void 0:null===(a=m.image)||void 0===a?void 0:a.image_subhead,tagName:e?"div":null,textPosition:null==m?void 0:null===(l=m.image)||void 0===l?void 0:l.image_text_alignment,textPositionMd:null==m?void 0:null===(o=m.image)||void 0===o?void 0:o.image_text_alignment_md,url:m.link_url,video:m.video,children:u})})},$=()=>(0,n.jsxs)(I,{className:d()("mediaBlock mediaBlock-story",{[`h-text-${y}`]:y,[`mediaBlock-${y}`]:y,[`mediaBlock-${s}`]:s,[`mediaBlock-${c}-md`]:c}),children:[m.headline&&(0,n.jsx)(r.w,{className:"h-margin-b-none",innerHTML:m.headline,level:3,size:2}),m.details&&(0,n.jsx)("div",{className:"h-text-hd4",dangerouslySetInnerHTML:{__html:m.details}})]}),S=()=>(0,n.jsxs)(n.Fragment,{children:[_&&(0,n.jsx)(T,{hasHorizontalSpacing:b,children:j(w)}),$()]}),P=(0,l.useRef)(null);if("carousel"===m.type)t=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(T,{hasHorizontalSpacing:!0,children:(0,n.jsx)(B,{aspectRatio:s,images:m.images})}),$()]});else if(w){var D;t=(0,n.jsx)(z,{className:"h-display-flex h-flex-direction-col","data-lnk":null!==(D=m.link_tag)&&void 0!==D?D:`${a}-${p+1}`,"data-test":"storyblock-storyblockLinkWrapper",href:m.link_url,underline:"invert",children:S()})}else t="shoppable_drawer"===m.link_type?(0,n.jsxs)(N,{"data-index":p,"data-test":"storyblock-storyblockLinkWrapper",hasBody:!!m.headline||!!m.details,onClick:function(e){v(e,P)},ref:P,type:"button",children:[S(),(0,n.jsx)("span",{className:"h-sr-only",children:" - shows more content"})]}):(0,n.jsxs)(n.Fragment,{children:[_&&(0,n.jsx)(T,{buttonType:f,hasHorizontalSpacing:b,onClick:v,children:j(!1)}),$()]});return(0,n.jsxs)("div",{"data-test":"@web/SlingshotComponents/common/Storyblock",children:[t,m.button_text&&(0,n.jsx)(x,q(q({},e),{},{buttonColor:i,buttonTag:m.button_tag,buttonText:m.button_text,buttonUrl:m.button_url,className:"",hasShoppableDrawer:"shoppable_drawer"===f,onClick:k,textAlignment:y}))]})};L.displayName="Storyblock"},53148:function(e,t,i){i.d(t,{G:function(){return s}});var a=i(85893),n=i(67294),l=i(1818),o=i(37937),r=i(43430);let s=({children:e,trackingPrefix:t})=>{let i=(0,n.useRef)({}),s=(0,r.rS)(),d=(0,n.useCallback)(()=>{i.current[l.C.initialize]||s.trackEvent({guest:{eventType:"customInteraction"},customInteraction:{value:`${t}|video`}})},[s,t]),c=(0,n.useCallback)(()=>{i.current[l.C.play]||s.trackEvent({guest:{eventType:"customInteraction"},customInteraction:{value:`${t}|video_play`}})},[s,t]),p=(0,n.useCallback)(()=>{i.current[l.C.captions]||s.trackEvent({guest:{eventType:"customInteraction"},customInteraction:{value:`${t}|captions_click`}})},[s,t]),m=(0,n.useCallback)(()=>{i.current[l.C.transcript]||s.trackEvent({guest:{eventType:"customInteraction"},customInteraction:{value:`${t}|transcript_click`}})},[s,t]),u=(0,n.useCallback)(()=>{i.current[l.C.percentComplete]||s.trackEvent({guest:{eventType:"customInteraction"},customInteraction:{value:`${t}|video_complete`}})},[s,t]),g=(0,n.useCallback)(e=>{switch(e){case l.C.initialize:d();break;case l.C.play:c();break;case l.C.captions:p();break;case l.C.transcript:m();break;case l.C.percentComplete:u()}i.current[e]=!0},[p,d,u,c,m]);return(0,a.jsx)(o.m.Provider,{value:{handleVideoEvent:g},children:e})};s.displayName="VideoEventsTracking"},43288:function(e,t,i){i.d(t,{SC:function(){return r},ai:function(){return d},o_:function(){return s},vg:function(){return o}});var a=i(56947),n=i(15582);let l="320px",o={xxs:"12",xs:"15",sm:"18.75",md:"23.4375",lg:"29.296875",xl:"36.62109375",xxl:"45.7763671875",xxxl:"57.220458984375"},r=(e,t)=>{let i=Number((0,n._K)(e));return`${Number(t)/i*100}vw`},s=`
  @media (min-width: 0) {
    .storycard--headline {
      font-size: ${r(l,o.md)};
    }

    .storycard--detail {
      font-size: ${r(l,o.xs)};
    }
  }

  @media (min-width: ${a.breakpoints.md}) {
    .storycard--headline {
      font-size: ${r(a.breakpoints.md,o.lg)};
    }

    .storycard--detail {
      font-size: ${r(a.breakpoints.md,o.sm)};
    }
  }

  @media (min-width: ${a.breakpoints.lg}) {
    .storycard--headline {
      font-size: ${r(a.breakpoints.lg,o.lg)};
    }

    .storycard--detail {
      font-size: ${r(a.breakpoints.lg,o.sm)};
    }
  }

  @media (min-width: ${a.breakpoints.xl}) {
    .storycard--headline {
      font-size: ${+o.xl}px;
    }

    .storycard--detail {
      font-size: ${+o.md}px;
    }
  }
`,d=`
  @media (min-width: 0) {
    .storycard--headline {
      font-size: ${r(l,o.xxs)};
    }

    .storycard--detail {
      font-size: ${r(l,o.xxs)};
    }
  }

  @media (min-width: ${a.breakpoints.md}) {
    .storycard--headline {
      font-size: ${r(a.breakpoints.md,o.xs)};
    }

    .storycard--detail {
      font-size: ${r(a.breakpoints.md,o.xxs)};
    }
  }

  @media (min-width: ${a.breakpoints.lg}) {
    .storycard--headline {
      font-size: ${r(a.breakpoints.lg,o.xs)};
    }

    .storycard--detail {
      font-size: ${r(a.breakpoints.lg,o.xxs)};
    }
  }

  @media (min-width: ${a.breakpoints.xl}) {
    .storycard--headline {
      font-size: ${+o.sm}px;
    }

    .storycard--detail {
      font-size: ${+o.xs}px;
    }
  }
`},72656:function(e,t,i){i.d(t,{A:function(){return o}});var a=i(56947),n=i(19521);let l={light:a.colors.palette.white,dark:a.colors.palette.gray.darkest},o=(0,n.iv)(["",";"],({$focusColor:e})=>{var t;return e?`
    *:focus {
      outline-color: ${null!==(t=l[e])&&void 0!==t?t:l.dark} !important;
    }
  `:""})},23501:function(e,t,i){i.d(t,{nn:function(){return r},qo:function(){return n}});var a=i(56947);let n=(e={})=>[{media:a.breakpoints.xl,imageUrl:e.image_path_xl},{media:a.breakpoints.lg,imageUrl:e.image_path_lg},{media:a.breakpoints.md,imageUrl:e.image_path_md},{media:"0px",imageUrl:e.image_path}],l=(e,t)=>{var i,a,n,l;return{id:null!=e?e:"",type:null!==(i=null===(a=t.metadata)||void 0===a?void 0:a.component_type)&&void 0!==i?i:"",version:null!==(n=null===(l=t.metadata)||void 0===l?void 0:l.component_version)&&void 0!==n?n:""}},o=(e,t=[])=>{let{type:i,version:a,id:n}=e,l=[i,a,n,...t];return l.join("|")},r=(e,t,i)=>o(l(e,t),i)}}]);