"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7607],{77401:function(e,t,n){n.d(t,{F:function(){return c}});var i=n(50308),r=n.n(i),o=n(85893),l=n(67294),a=n(12182),d=n(33483),s=n(95296);let c=({children:e,deferContentRendering:t,isOpen:n,noAnimation:i=!1,onClose:c=r(),onOpen:p=r(),variant:u="standard"})=>{let{0:m,1:f}=(0,l.useState)(!1),{0:g,1:h}=(0,l.useState)(!1),x=(0,l.useRef)(null),v=(0,l.useRef)(null),b=(0,l.useCallback)(()=>{(0,a.vU)({skipAnimation:i,setup:[[null==v?void 0:v.current,{transitionProperty:"height opacity",transitionDuration:"300ms",transitionTimingFunction:"ease"}],[null==x?void 0:x.current,{transitionProperty:"transform",transitionDuration:"300ms",transitionTimingFunction:"ease"}]],from:[[v.current,{overflow:"hidden",height:"0",opacity:"0"}],[x.current,{transform:"translateY(-15px)"}]],to:[[v.current,{opacity:"1",height:()=>{var e;return`${null==x?void 0:null===(e=x.current)||void 0===e?void 0:e.clientHeight}px`}}],[x.current,{transform:"translateY(0)"}]]}).then(()=>{v.current&&(v.current.style.height="auto"),v.current&&(v.current.style.overflow="visible"),p()}).catch(()=>{})},[i,p]),y=(0,l.useCallback)(()=>{(0,a.vU)({skipAnimation:i,setup:[[null==v?void 0:v.current,{transitionProperty:"height opacity",transitionDuration:"300ms",transitionTimingFunction:"ease"}],[null==x?void 0:x.current,{transitionProperty:"transform",transitionDuration:"300ms",transitionTimingFunction:"ease"}]],from:[[v.current,{overflow:"hidden",opacity:"1",height:()=>{var e;return`${null==x?void 0:null===(e=x.current)||void 0===e?void 0:e.clientHeight}px`}}],[x.current,{transform:"translateY(0)"}]],to:[[v.current,{opacity:"0",height:"0"}],[x.current,{transform:"translateY(-15px)"}]]}).then(()=>{f(!1),c()}).catch(()=>{})},[i,c]);return(0,d.G)(()=>{!g&&n&&(f(!0),b(),h(!0)),g&&!n&&(f(!0),y(),h(!1))},[y,b,n,g]),(0,o.jsx)("div",{"aria-hidden":!n,"data-test":"collapsibleClippingDiv",ref:v,children:(0,o.jsx)(s.Rt,{"data-test":"collapsibleContentDiv",isDisplayed:n||m,ref:x,children:t&&!(n||m)?null:"bare"===u?e:"menu"===u?(0,o.jsx)(s.TH,{children:e}):(0,o.jsx)(s.Ev,{children:e})})})};c.displayName="CollapsibleContent"},988:function(e,t,n){n.d(t,{z:function(){return _}});var i=n(59499),r=n(4730),o=n(85893),l=n(67294),a=n(50308),d=n.n(a),s=n(31998),c=n(19521),p=n(56947),u=n(23921);let m=c.ZP.span.withConfig({displayName:"ArrowIcon__IconWrapper",componentId:"sc-3hry0g-0"})(["margin:0 "," 0 0;display:flex;align-items:center;"],p.space.generic.x2),f=(0,c.ZP)(u.B).withConfig({displayName:"ArrowIcon__StyledIconArrowDownFill",componentId:"sc-3hry0g-1"})(["transition:transform 300ms ease;",";"],({$isOpen:e})=>e?"transform: rotate(-180deg)":"");m.displayName="Icon";let g=({isOpen:e,iconSize:t})=>(0,o.jsx)(m,{children:(0,o.jsx)(f,{$isOpen:e,width:t})});g.displayName="Arrow";var h=n(95296),x=n(77401);let v=["controlled","disabled","onClick","open","children","className","contentLabel","deferContentRendering","noAnimation","onOpen","onClose","size","title","titleStyle","id","variant"];function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach(function(t){(0,i.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}let w=(e,t)=>"string"==typeof e?`${(0,s.I8)((0,s.u$)((0,s.A2)(e)))}-accordion`:"string"==typeof t?`${(0,s.I8)((0,s.u$)((0,s.A2)(t)))}-accordion`:void 0,_=e=>{let{controlled:t=!1,disabled:n=!1,onClick:i,open:a=!1,children:s,className:c,contentLabel:p,deferContentRendering:u,noAnimation:m=!1,onOpen:f=d(),onClose:b=d(),size:_,title:k,titleStyle:j,id:O=encodeURI("string"==typeof k?k:null!=p?p:""),variant:P="standard"}=e,C=(0,r.Z)(e,v),{0:N,1:I}=(0,l.useState)(a),$=(0,l.useCallback)(e=>{e.persist(),e.preventDefault(),!0===n||(i&&i(e),t||I(!N))},[t,n,N,i]),z=n?{}:{href:`#${O}`,onClick:$,"aria-expanded":!!(n?null:t?a:N)},T=w(k,null!=p?p:""),E="bare"===P,D="menu"===P;return(0,l.useEffect)(()=>{},[t,E,k]),(0,o.jsxs)(h.pg,y(y({className:c,"data-test":T,variant:P},C),{},{children:[!E&&(0,o.jsxs)(h.HP,y(y({disabled:n},z),{},{"aria-label":p,variant:P,children:[D?null:(0,o.jsx)(g,{iconSize:20,isOpen:t?a:!!(N&&!n)}),"string"==typeof k?(0,o.jsx)(h.bT,{disabled:n,size:_,style:y({},j),variant:P,children:k}):k,D&&(0,o.jsx)(g,{iconSize:32,isOpen:t?a:!!(N&&!n)})]})),(0,o.jsx)(x.F,{deferContentRendering:u,id:O,isOpen:t?a:!!(N&&!n),noAnimation:m,onClose:b,onOpen:f,variant:P,children:s})]}))};_.displayName="Collapsible"},95296:function(e,t,n){n.d(t,{Ev:function(){return c},HP:function(){return a},Rt:function(){return s},TH:function(){return p},bT:function(){return l},pg:function(){return d}});var i=n(58310),r=n(19521),o=n(56947);let l=r.ZP.span.withConfig({displayName:"styles__CollapsibleHeading",componentId:"sc-semtf2-0"})(["",";font-size:",";font-weight:",";margin-bottom:0;outline:none;text-decoration:none;&:focus{text-decoration:underline;outline:none;}&:active{outline:none;color:",";}",";"],(0,i.Bs)(),({size:e,variant:t})=>"md"===e?o.font.size.text.large:"menu"===t?o.font.size.heading.level3:o.font.size.text.base,({variant:e})=>"menu"===e?o.font.weight.bold:400,o.colors.palette.gray.dark,({disabled:e})=>e?`color: ${o.colors.palette.gray.dark};`:`color: ${o.colors.text.onLight.primary};`),a=r.ZP.a.withConfig({displayName:"styles__CollapsibleToggle",componentId:"sc-semtf2-1"})(["",";text-decoration:none;display:flex;"," list-style:none;outline:none;",";"],(0,i.Bs)(),({variant:e})=>"menu"===e?` 
    padding: ${o.space.generic.x4} 0;
    justify-content: space-between;
    align-items: center;

  `:` 
  padding: ${o.space.generic.x3};
  `,({disabled:e})=>e?`
      background-color: ${o.colors.background.lightest};
      cursor: not-allowed;
    `:`
      color: ${o.colors.text.onLight.primary};
      &:active {
        outline: none;
        color: ${o.colors.text.onLight.secondary};
      }
      &:focus, &:hover {
        outline: none;
        text-decoration: underline;
      }
    `),d=r.ZP.div.withConfig({displayName:"styles__CollapsibleContainer",componentId:"sc-semtf2-2"})(["--border-color:",";",";"],({variant:e,disabled:t})=>t?o.colors.border.container.default:"menu"===e?o.colors.palette.gray.light:o.colors.border.container.active,({variant:e})=>"bare"!==e&&`
    border-top: 1px solid;
    border-color: var(--border-color);
    margin-left: ${o.space.generic.x4};
    margin-right: ${o.space.generic.x4};

    &:last-child {
      border-bottom: 1px solid;
      border-color: var(--border-color);
    }
  `),s=r.ZP.div.withConfig({displayName:"styles__ContentDiv",componentId:"sc-semtf2-3"})(["display:",";padding:0.1px 0;"],({isDisplayed:e})=>e?"block":"none"),c=r.ZP.div.withConfig({displayName:"styles__SpacingDiv",componentId:"sc-semtf2-4"})(["padding-bottom:",";padding-left:",";&:focus,&:hover{outline:",";}"],o.space.generic.x3,o.space.generic.x9,({variant:e})=>"menu"===e?"underline":"none"),p=r.ZP.div.withConfig({displayName:"styles__MenuSpacingDiv",componentId:"sc-semtf2-5"})(["padding-bottom:",";padding-left:0;"],o.space.generic.x3)},65197:function(e,t,n){n.d(t,{V:function(){return f}});var i=n(85893),r=n(18079),o=n(19521),l=n(56947),a=n(58310);let d={white:l.colors.palette.gray.light,black:l.colors.palette.black},s={white:l.colors.palette.white,black:l.colors.palette.black},c={white:l.colors.palette.gray.darkest,black:l.colors.palette.white},p={white:l.colors.palette.red.default,black:l.colors.palette.white},u=o.ZP.span.withConfig({displayName:"styles__StyledRibbon",componentId:"sc-1vpmz0u-0"})([""," position:relative;display:inline-flex;align-items:center;overflow:hidden;padding:3px 14px 3px ",";color:",";background:",";border-radius:4px 0 0 4px;border:1px solid ",";border-right:0;font-size:",";clip-path:polygon(0 0,0 100%,100% 100%,calc(100% - 6px) 50%,100% 0);&::after{position:absolute;top:-1px;right:0;height:calc(100% + 2px);width:7px;display:block;background:",";content:'';clip-path:polygon( calc(100% - 1px) 0,100% 0,1px 50%,100% 100%,calc(100% - 1px) 100%,0 50% );}"],(0,a.Bs)(),l.space.generic.x2,e=>c[e.variant],e=>s[e.variant],e=>d[e.variant],l.font.size.text.small,e=>d[e.variant]),m=o.ZP.span.withConfig({displayName:"styles__BullseyeGlyphWrapper",componentId:"sc-1vpmz0u-1"})(["color:",";font-size:",";line-height:1;margin-left:",";"],e=>p[e.variant],l.font.size.text.base,l.space.generic.x1),f=({ariaHidden:e=!1,children:t,className:n,"data-test":o="ribbon",hasBullseye:l=!1,variant:a="white"})=>(0,i.jsxs)(u,{"aria-hidden":e,className:n,"data-test":o,variant:a,children:[t,l&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.uy,{children:" target"}),(0,i.jsx)(m,{"aria-hidden":!0,"data-test":"ribbon-bullseye-glyph",variant:a,children:"\xac"})]})]});f.displayName="Ribbon"},78503:function(e,t,n){n.d(t,{H:function(){return o}});var i=n(67294),r=n(86235);let o=()=>{let{dispatch:e,circleOffersReducerState:t}=(0,i.useContext)(r.j);return[t,e]}},44281:function(e,t,n){n.d(t,{U:function(){return a},l:function(){return d}});var i=n(44350),r=n(24223);let o="LOYALTY_GUEST_OFFERS_API_MIGRATION_FLAG_ENABLED",l="LOYALTY_PROFILE_SAVED_OFFERS_API_MIGRATION_ENABLED",a=()=>{let e=(0,r.T)();return(0,i.flags)(o)||e[o]},d=()=>{let e=(0,r.T)();return(0,i.flags)(l)||e[l]}},56276:function(e,t,n){n.d(t,{e:function(){return i}});let i=6e5},21645:function(e,t,n){n.d(t,{Yz:function(){return f}});var i=n(59499),r=n(44350),o=n(25682),l=n(61464),a=n(47269),d=n(11637),s=n(56276);function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}let p="@web/domain-promotions/get-recommended-circle-offers-v1",u=["page","placement_id","visitor_id"],{useQuery:m}=(0,o.J)({name:p,keyFn:e=>(u.forEach(t=>{if(!e[t])throw Error(`Required \`${t}\` was missing from query: \`${p}\``)}),[p,e]),queryFn:async(e,t)=>{var n;let{apiKey:o,apis:{promotions:d},baseUrl:s}=(0,r.config)().services.redskyAggregations,{barcode_id:p,category_id:u,channel:m="WEB",fulfillment_types:f,member_id:g,offer_id:h,page:x,placement_id:v,purchasable_store_ids:b,slingshot_component_id:y,tcins:w,visitor_id:_}=null!=e?e:{},k=a.Z.buildURLWithParams(new URL(d.endpointPaths.getRecommendedCircleOffersV1,s),{barcode_id:p,category_id:u,channel:m,fulfillment_types:f,member_id:g,offer_id:h,page:x,placement_id:v,purchasable_store_ids:b,slingshot_component_id:y,tcins:w,visitor_id:_,key:o}),{data:j,ok:O,statusText:P}=await (0,l.G)(k,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach(function(t){(0,i.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({partialErrorTag:"get_recommended_circle_offers_error_partial",errorTag:"get_recommended_circle_offers_error",timerTag:"get_recommended_circle_offers_call"},t));if(O)return null!==(n=null==j?void 0:j.data)&&void 0!==n?n:null;throw Error(`${P}`)},defaultOptions:{staleTime:s.e}}),f=(0,d.p)(m)},37196:function(e,t,n){n.d(t,{cD:function(){return o},gl:function(){return l},iL:function(){return r},qk:function(){return d},rs:function(){return i},u3:function(){return a},uq:function(){return s}});let i=e=>null==e?void 0:e.recommended_circle_offers,r=e=>{var t;return null==e?void 0:null===(t=e.recommended_circle_offers)||void 0===t?void 0:t.strategy_id},o=e=>{var t;return null==e?void 0:null===(t=e.recommended_circle_offers)||void 0===t?void 0:t.strategy_name},l=e=>{var t;return null==e?void 0:null===(t=e.recommended_circle_offers)||void 0===t?void 0:t.strategy_description},a=e=>{var t;return null==e?void 0:null===(t=e.recommended_circle_offers)||void 0===t?void 0:t.circle_offers},d=e=>{var t;return null==e?void 0:null===(t=e.recommended_circle_offers)||void 0===t?void 0:t.placement_id},s=e=>{var t;return null==e?void 0:null===(t=e.recommended_circle_offers)||void 0===t?void 0:t.doctype}},35281:function(e,t,n){n.d(t,{Y:function(){return r}});var i=n(80367);let r=e=>(0,i.X)()&&e.includes("/preview")},43288:function(e,t,n){n.d(t,{SC:function(){return a},ai:function(){return s},o_:function(){return d},vg:function(){return l}});var i=n(56947),r=n(70926);let o="320px",l={xxs:"12",xs:"15",sm:"18.75",md:"23.4375",lg:"29.296875",xl:"36.62109375",xxl:"45.7763671875",xxxl:"57.220458984375"},a=(e,t)=>{let n=Number((0,r._K)(e));return`${Number(t)/n*100}vw`},d=`
  @media (min-width: 0) {
    .storycard--headline {
      font-size: ${a(o,l.md)};
    }

    .storycard--detail {
      font-size: ${a(o,l.xs)};
    }
  }

  @media (min-width: ${i.breakpoints.md}) {
    .storycard--headline {
      font-size: ${a(i.breakpoints.md,l.lg)};
    }

    .storycard--detail {
      font-size: ${a(i.breakpoints.md,l.sm)};
    }
  }

  @media (min-width: ${i.breakpoints.lg}) {
    .storycard--headline {
      font-size: ${a(i.breakpoints.lg,l.lg)};
    }

    .storycard--detail {
      font-size: ${a(i.breakpoints.lg,l.sm)};
    }
  }

  @media (min-width: ${i.breakpoints.xl}) {
    .storycard--headline {
      font-size: ${+l.xl}px;
    }

    .storycard--detail {
      font-size: ${+l.md}px;
    }
  }
`,s=`
  @media (min-width: 0) {
    .storycard--headline {
      font-size: ${a(o,l.xxs)};
    }

    .storycard--detail {
      font-size: ${a(o,l.xxs)};
    }
  }

  @media (min-width: ${i.breakpoints.md}) {
    .storycard--headline {
      font-size: ${a(i.breakpoints.md,l.xs)};
    }

    .storycard--detail {
      font-size: ${a(i.breakpoints.md,l.xxs)};
    }
  }

  @media (min-width: ${i.breakpoints.lg}) {
    .storycard--headline {
      font-size: ${a(i.breakpoints.lg,l.xs)};
    }

    .storycard--detail {
      font-size: ${a(i.breakpoints.lg,l.xxs)};
    }
  }

  @media (min-width: ${i.breakpoints.xl}) {
    .storycard--headline {
      font-size: ${+l.sm}px;
    }

    .storycard--detail {
      font-size: ${+l.xs}px;
    }
  }
`},23501:function(e,t,n){n.d(t,{nn:function(){return a},qo:function(){return r}});var i=n(56947);let r=(e={})=>[{media:i.breakpoints.xl,imageUrl:e.image_path_xl},{media:i.breakpoints.lg,imageUrl:e.image_path_lg},{media:i.breakpoints.md,imageUrl:e.image_path_md},{media:"0px",imageUrl:e.image_path}],o=(e,t)=>{var n,i,r,o;return{id:null!=e?e:"",type:null!==(n=null===(i=t.metadata)||void 0===i?void 0:i.component_type)&&void 0!==n?n:"",version:null!==(r=null===(o=t.metadata)||void 0===o?void 0:o.component_version)&&void 0!==r?r:""}},l=(e,t=[])=>{let{type:n,version:i,id:r}=e,o=[n,i,r,...t];return o.join("|")},a=(e,t,n)=>l(o(e,t),n)},81316:function(e,t,n){n.d(t,{f:function(){return m},p:function(){return u}});var i=n(59499),r=n(85893),o=n(988),l=n(21803),a=n(56947),d=n(19521);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}let c=d.ZP.div.withConfig({displayName:"CarouselPlaceholder__CarouselPlaceholderContainer",componentId:"sc-b0dakj-0"})(["height:clamp(219px,-148.2308px + 37.0192vw,296px);@media (max-width:","){height:clamp(208px,26.0062px + 27.2446vw,296px);}@media (max-width:","){height:clamp(287px,74.8963px + 66.2824vw,517px);}"],a.breakpoints.mdMax,a.breakpoints.smMax),p={isAnimated:!0,height:"100%",width:"100%"},u=(0,d.ZP)(o.z).withConfig({displayName:"CarouselPlaceholder__CollapsibleContainer",componentId:"sc-b0dakj-1"})(["& > div > div{padding:0;}"]),m=()=>(0,r.jsxs)(c,{className:"l-container l-container-standard h-margin-b-default","data-test":"@web/slingshot-components/CarouselPlaceholder",children:[(0,r.jsx)("h3",{className:"h-sr-only",children:"Loading..."}),(0,r.jsx)(l.G,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){(0,i.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},p))]});m.displayName="CarouselPlaceholder"},69686:function(e,t,n){n.d(t,{P:function(){return p}});var i=n(59499),r=n(85893),o=n(17619),l=n(21803),a=n(56947),d=n(19521);function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}let c=d.ZP.div.withConfig({displayName:"TilePlaceholder__TilePlaceholderContainer",componentId:"sc-tgophu-0"})(["height:284px;@media (max-width:","){height:227px;}"],a.breakpoints.smMax),p=()=>{let{screenMd:e}=(0,o.l)();return(0,r.jsxs)(c,{className:"h-margin-b-default h-padding-h-tiny h-margin-t-x2","data-test":"@web/slingshot-components/TilePlaceholder",children:[(0,r.jsx)("h3",{className:"h-sr-only",children:"Loading..."}),(0,r.jsx)(l.G,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach(function(t){(0,i.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},{isAnimated:!0,height:"100%",width:e?"185px":"125px"}))]})};p.displayName="TilePlaceholder"},85702:function(e,t,n){n.d(t,{Mv:function(){return a},Vt:function(){return d},W4:function(){return s},WQ:function(){return o},a4:function(){return l}});var i=n(19521),r=n(56947);let o=160,l=i.ZP.div.withConfig({displayName:"styles__CarouselTileWrapper",componentId:"sc-13ca9kt-0"})(["position:relative;background-color:",";padding:",";margin:",";width:185px;box-shadow:",";border-radius:",";display:flex;flex-direction:column;font-size:",";line-height:",";align-items:start;@media (max-width:","){width:125px;}"],r.colors.palette.white,r.space.generic.x1,r.space.generic.x2,({useBorder:e})=>e?`0 0 0 1px ${r.colors.palette.gray.light}`:"none",r.border.radius.x1,r.font.size.text.medium,r.font.lineHeight.heading,r.breakpoints.smMax),a=i.ZP.div.withConfig({displayName:"styles__CarouselTileContentWrapper",componentId:"sc-13ca9kt-1"})(["font-size:",";padding:",";line-height:",";text-align:left;min-height:66px;@media (max-width:","){padding:",";}"],r.font.size.text.medium,r.space.generic.x2,r.font.lineHeight.heading,r.breakpoints.smMax,r.space.generic.x1),d=i.ZP.img.withConfig({displayName:"styles__CarouselTilePicture",componentId:"sc-13ca9kt-2"})(["width:100%;aspect-ratio:1;"]),s=i.ZP.div.withConfig({displayName:"styles__ButtonWrapper",componentId:"sc-13ca9kt-3"})(["margin:",";width:calc(100% - ",");min-width:110px;& > button{max-width:unset;width:100%;}"],r.space.generic.x1,r.space.generic.x2)},86820:function(e,t,n){n.d(t,{T:function(){return y}});var i=n(85893),r=n(17619),o=n(23501),l=n(23258),a=n(19521),d=n(56947),s=n(17314),c=n(55446),p=n(43288);let u=a.ZP.div.withConfig({displayName:"styles__EndcapWrapper",componentId:"sc-10hdb2m-0"})(["width:390px;position:relative;display:flex;justify-content:center;align-items:center;border-radius:",";box-sizing:border-box;flex-direction:column;padding:",";padding-right:0;text-decoration:none;background:",";color:",";@media (max-width:","){width:100%;}"],d.border.radius.default,d.space.inset.x2,e=>{var t;return null!==(t=e.backgroundColor)&&void 0!==t?t:"transparent"},e=>{var t;return null!==(t=e.textColor)&&void 0!==t?t:d.colors.text.onLight.primary},d.breakpoints.smMax),m=(0,a.ZP)(s.t).withConfig({displayName:"styles__EndcapPicture",componentId:"sc-10hdb2m-1"})(["width:100%;img{width:100%;vertical-align:bottom;display:block;}"]),f=`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`,g=a.ZP.div.withConfig({displayName:"styles__EndcapTextWrapper",componentId:"sc-10hdb2m-2"})(["text-align:center;display:flex;flex-direction:column;justify-content:center;padding:",";margin:",";"," ",""],d.space.inset.x3,d.space.inset.x3,e=>e.hasSmallViewportImage&&`${f}`,e=>e.hasLargeViewportImage&&`
    @media (min-width: ${d.breakpoints.md}) {
      ${f}
    }
    `),h=(0,a.ZP)(c.w).withConfig({displayName:"styles__StyledEndcapHeading",componentId:"sc-10hdb2m-3"})(["font-size:",";@media (min-width:","){font-size:",";}@media (min-width:","){font-size:",";}@media (min-width:","){font-size:","px;}"],(0,p.SC)("320px",p.vg.md),d.breakpoints.md,(0,p.SC)(d.breakpoints.md,p.vg.lg),d.breakpoints.lg,(0,p.SC)(d.breakpoints.lg,p.vg.lg),d.breakpoints.xl,p.vg.xl);function x({headline:e,hasSmallViewportImage:t,hasLargeViewportImage:n,trackClick:o}){let{screenMd:a}=(0,r.l)();return(0,i.jsxs)(g,{hasLargeViewportImage:n,hasSmallViewportImage:t,children:[(0,i.jsx)(h,{"data-test":"headline",level:2,size:1,children:e}),a&&(0,i.jsx)(l.B9,{trackClick:o})]})}x.displayName="EndcapHeadline";let v=e=>!!(null==e?void 0:e.image_path),b=e=>!!(null==e?void 0:e.image_path_md);function y({backgroundColor:e,backgroundImages:t,textColor:n,headline:l,trackClick:a}){let{screenMd:d}=(0,r.l)(),s=b(t)&&d;return(0,i.jsxs)(u,{backgroundColor:e,textColor:n,children:[t&&(0,i.jsx)(m,{alt:null==t?void 0:t.image_alt_text,aspectRatio:s?"4x3":void 0,height:s?"290px":void 0,images:(0,o.qo)(t)}),(0,i.jsx)(x,{hasLargeViewportImage:b(t),hasSmallViewportImage:v(t),headline:l,trackClick:a})]})}y.displayName="Endcap"},23258:function(e,t,n){n.d(t,{Zo:function(){return et},B9:function(){return J}});var i=n(59499),r=n(96026),o=n.n(r),l=n(41609),a=n.n(l),d=n(85893),s=n(67294),c=n(36679),p=n(17619),u=n(55446),m=n(69282),f=n(21645),g=n(37196),h=n(67105),x=n(43430),v=n(80367),b=n(35281),y=n(11163),w=n(86820),_=n(58979),k=n(66069),j=n(53726),O=n(79002),P=n(64851),C=n(60396),N=n(47269),I=n(19521),$=n(56947),z=n(65197);let T="@web/SiteTopOfFunnel/CircleOfferTile/OfferCardRibbon",E={PERSONALIZED_RIBBON:`${T}/PersonalizedRibbon`,LABEL_RIBBON:`${T}/LabelRibbon`};function D({label:e,personalized:t,className:n}){return t?(0,d.jsx)(z.V,{className:n,"data-test":E.PERSONALIZED_RIBBON,children:"Just for you"}):e?(0,d.jsx)(z.V,{className:n,"data-test":E.LABEL_RIBBON,children:e}):null}D.displayName="OfferCardRibbonUnstyled";let S=(0,I.ZP)(D).withConfig({displayName:"OfferCardRibbon",componentId:"sc-fsa0ud-0"})(["position:absolute;left:-1px;top:-1px;z-index:5;",""],e=>e.personalized&&`
      background: ${$.colors.background.darkest};
      color: ${$.colors.text.onDark.primary};
      border: none;

      &::before,
      &::after {
        background: ${$.colors.background.darkest};
        color: ${$.colors.text.onDark.primary};
        border: none;
      }

      &::before {
        top: 0;
      }

      &::after {
        bottom: 0;
      }
  `);var L=n(85702);let Z=(e,t)=>{var n,i,r;let o=null!==(n=null==e?void 0:null===(i=e.components)||void 0===i?void 0:i[0])&&void 0!==n?n:{};return{name:null!==(r=null==o?void 0:o.title)&&void 0!==r?r:null==o?void 0:o.id,position:String(t),component:null!=o&&o.title?`${null==o?void 0:o.id} || ${null==o?void 0:o.title}`:null==o?void 0:o.id,componentType:null==o?void 0:o.type_name,contentType:null==o?void 0:o.content_type}},F="@web/SiteTopOfFunnel/CircleOfferTile",R={OFFER_TILE:`${F}/OfferTile`,OFFER_DETAILS_LINK:`${F}/OfferDetailsLink`};function A({offer:e,index:t,strategyName:n,strategyId:i,metadata:r,order:o,useBorder:l}){var a,c,p;let u=`${null==e?void 0:e.value} ${null==e?void 0:e.title}`,m=(0,s.useContext)(O.t),f=(0,s.useCallback)(()=>{let l=Z(r,o);(0,x.OK)({recClick:{type:"promo",productId:null==e?void 0:e.id,position:t,strategyId:i,strategyName:n},contentClick:l})},[null==e?void 0:e.id,t,i,n,r,o]),g=(0,s.useCallback)(()=>{m&&m({type:P.q.PUSH_OVERLAY,value:{offerId:null==e?void 0:e.id,isCircleOffer:!0}}),f()},[m,null==e?void 0:e.id,f]),h=(0,s.useMemo)(()=>{var t,n,i,r;return(null!==(t=null==e?void 0:null===(n=e.value)||void 0===n?void 0:n.length)&&void 0!==t?t:0)>20&&(null!==(i=null==e?void 0:null===(r=e.title)||void 0===r?void 0:r.length)&&void 0!==i?i:0)>20?1:2},[null==e?void 0:null===(a=e.title)||void 0===a?void 0:a.length,null==e?void 0:null===(c=e.value)||void 0===c?void 0:c.length]),v=new N.Z(null!==(p=null==e?void 0:e.image_url)&&void 0!==p?p:"").setQuery({wid:2*L.WQ,hei:2*L.WQ}).toString();return(0,d.jsxs)(L.a4,{"data-test":R.OFFER_TILE,useBorder:l,children:[(0,d.jsx)(S,{label:null==e?void 0:e.label,personalized:null==e?void 0:e.personalized}),(0,d.jsxs)(k.Fg,{"data-test":R.OFFER_DETAILS_LINK,onClick:g,style:{color:"#333",flex:"1 0 auto"},underline:"invert",children:[(0,d.jsx)(L.Vt,{alt:"",src:v}),(0,d.jsxs)(L.Mv,{title:`${null==e?void 0:e.value} ${null==e?void 0:e.title}`,children:[(0,d.jsx)("div",{className:"h-text-red h-text-bold",children:null==e?void 0:e.value}),(0,d.jsx)(j.k,{lines:h,children:null==e?void 0:e.title})]})]}),(0,d.jsx)(L.W4,{children:(0,d.jsx)(C.Q,{buttonSize:"sm",isOfferAddedDefault:null==e?void 0:e.added,metadata:r,offerAriaLabel:u,offerId:String(null==e?void 0:e.id),order:o,trackingDetails:{position:t,strategyId:i,strategyName:n}})})]})}A.displayName="OfferTile";let B=I.ZP.div.withConfig({displayName:"OfferTilePlaceholder__PlaceholderWrapper",componentId:"sc-c4fux8-0"})(["margin:",";width:calc(100% - ",");min-width:110px;"],$.space.generic.x1,$.space.generic.x2),H=I.ZP.div.withConfig({displayName:"OfferTilePlaceholder__ImagePlaceholderWrapper",componentId:"sc-c4fux8-1"})(["width:100%;min-width:117px;"]),W=I.ZP.div.withConfig({displayName:"OfferTilePlaceholder__ImagePlaceholder",componentId:"sc-c4fux8-2"})(["position:relative;font-size:14px;&::before{content:' ';display:block;width:100%;padding-bottom:100%;background:#c4c4c4;}"]),V=I.ZP.div.withConfig({displayName:"OfferTilePlaceholder__TitlePlaceholder",componentId:"sc-c4fux8-3"})(["position:relative;font-size:14px;&::before{content:' ';display:block;width:100%;height:1em;background:#c00;margin-top:0.25em;margin-bottom:0.4em;}"]),U=I.ZP.div.withConfig({displayName:"OfferTilePlaceholder__TextPlaceholder",componentId:"sc-c4fux8-4"})(["position:relative;font-size:14px;&::before{content:' ';display:block;width:90%;height:1em;background:#c4c4c4;margin-bottom:0.25em;}&::after{content:' ';display:block;width:80%;height:1em;background:#c4c4c4;margin-bottom:0.4em;}"]),M=I.ZP.div.withConfig({displayName:"OfferTilePlaceholder__ButtonPlaceholder",componentId:"sc-c4fux8-5"})(["position:relative;font-size:clamp(14px,calc(2vw - 2px),20px);&::after{content:' ';display:block;width:100%;height:32px;background:#c00;border-radius:4px;}"]);function Y({useBorder:e}){return(0,d.jsxs)(L.a4,{"data-test":"@web/SiteTopOfFunnel/CircleOfferTilePlaceholder",useBorder:e,children:[(0,d.jsx)(H,{children:(0,d.jsx)(W,{})}),(0,d.jsxs)(B,{children:[(0,d.jsx)(V,{}),(0,d.jsx)(U,{})]}),(0,d.jsx)(L.W4,{children:(0,d.jsx)(M,{})})]})}Y.displayName="OfferTile";var G=n(81316),q=n(69686);function K(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?K(Object(n),!0).forEach(function(t){(0,i.Z)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):K(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function J({trackClick:e}){return(0,d.jsx)(c.F,{"data-test":"view-all-link",href:"/circle/offers",onClick:e,underline:"always",children:"View all Target Circle offers"})}J.displayName="ViewAllLink";let X=e=>"standard"===e?"default":e;function ee(e){var t,n,i,r,l,c,j,O,P,C,N;let{content:I,options:$,metadata:z,order:T}=e,{background_color:E,margin_bottom:D,placement_id:S,category_id:L,endcap:F,text_color:R,custom_headline:B}=null!=I?I:{},{fullWidth:H=!1}=null!=$?$:{},{background_color:W,headline:V,image:U}=null!=F?F:{},M=!E||"white"===E||"#FFFFFF"===E,[K]=(0,h.fo)(),{targetCartWheelId:ee}=null!==(t=null===(n=K())||void 0===n?void 0:n.profile)&&void 0!==t?t:{},[et,en]=(0,f.Yz)({placement_id:null!=S?S:"circle_offer_component_tester",category_id:L,barcode_id:ee,fulfillment_types:null==I?void 0:I.fulfillment_types,slingshot_component_id:null==z?void 0:null===(i=z.components)||void 0===i?void 0:null===(r=i[0])||void 0===r?void 0:r.id}),ei=en.isIdle||en.isFetching||en.isLoading,er=et(g.u3),eo=et(g.iL),el=et(g.cD),ea=null===(l=et(g.rs))||void 0===l?void 0:l.placement_id,ed=et(g.gl),es=null===(c=et(g.rs))||void 0===c?void 0:c.doctype,ec=null!==(j=null!=V?V:et(g.gl))&&void 0!==j?j:"Top Circle offers",{screenMd:ep}=(0,p.l)(),eu=(0,x.rS)(),em=(0,v.X)(),{asPath:ef}=(0,y.useRouter)(),eg=(0,b.Y)(ef),eh=eg?null!=B?B:"Headline placeholder":ei?(0,d.jsx)("span",{children:"\xa0"}):null!=B?B:"Headline placeholder";(0,s.useEffect)(()=>{eu.trackEvent({guest:{eventType:"recommendations"},recommendations:{strategyId:eo,strategyName:el,placementId:ea,strategyDescription:ed,docType:es,type:"promo"}})},[eu,et,eo,el,ea,ed,es]);let ex=(0,s.useCallback)(()=>{let e=Z(z,T);(0,x.OK)({contentClick:Q(Q({},e),{},{linkName:"View all Target Circle offers"})})},[z,T]),ev=(null==z?void 0:null===(O=z.components)||void 0===O?void 0:null===(P=O[0])||void 0===P?void 0:null===(C=P.type_name)||void 0===C?void 0:C.toLocaleLowerCase())==="item or promotion carousel",eb=(0,d.jsx)(w.T,{backgroundColor:W,backgroundImages:U,headline:ec,textColor:R,trackClick:ex}),ey=a()(F)?null:(0,d.jsx)(_.e,Q(Q({},F),{},{background_color:null!==(N=null!=W?W:E)&&void 0!==N?N:"",headline:ed||(em?eg?null!=B?B:"Headline placeholder":ei?void 0:null!=B?B:"Headline placeholder":""),text_color:R,track_click:ex})),ew=ep?ev?ey:eb:null,e_=ep?null:ev?ey:eb,ek=F?null:(0,d.jsxs)(k.JU,{background_color:E,className:"l-container l-container-standard h-padding-a-x2",text_color:R,children:[(0,d.jsx)(u.w,{className:"h-margin-b-none",level:2,size:1,style:{color:"inherit"},children:ed||(em?eh:ei?(0,d.jsx)("span",{children:"\xa0"}):"")}),(0,d.jsx)(J,{trackClick:ex})]}),ej=o()(10).map(e=>(0,d.jsx)(q.P,{},e)),eO=o()(10).map(e=>(0,d.jsx)(Y,{useBorder:M},e));return em?(0,d.jsxs)(d.Fragment,{children:[ek,(0,d.jsxs)(k.TZ,{backgroundColor:E,className:`${D?`h-margin-b-${X(D)}`:""}
        l-container ${H?"":"l-container-standard"}`,"data-test":"filmstrip-wrapper",extraPadding:!!E&&!ew&&ep,children:[e_,(0,d.jsxs)(m.T,{children:[ew,a()(er)?ei?eg?eO:ej:eO:null==er?void 0:er.map((e,t)=>(0,d.jsx)(A,{index:t,metadata:z,offer:e,order:T,strategyId:eo,strategyName:el,useBorder:M},null==e?void 0:e.id))]})]})]}):(0,d.jsx)(G.p,{controlled:!0,noAnimation:ei||!!(null!=er&&er.length),open:ei||!!(null!=er&&er.length),variant:"bare",children:(0,d.jsxs)(d.Fragment,{children:[ek,(0,d.jsxs)(k.TZ,{backgroundColor:E,className:`${D?`h-margin-b-${X(D)}`:""}
        l-container ${H?"":"l-container-standard"}`,"data-test":"filmstrip-wrapper",extraPadding:!!E&&!ew&&ep,children:[e_,(0,d.jsxs)(m.T,{children:[ew,null!=er&&er.length?null==er?void 0:er.map((e,t)=>(0,d.jsx)(A,{index:t,metadata:z,offer:e,order:T,strategyId:eo,strategyName:el,useBorder:M},null==e?void 0:e.id)):ej]})]})]})})}ee.displayName="OffersCarousel";let et=ee},58979:function(e,t,n){n.d(t,{e:function(){return h}});var i=n(85893),r=n(17619),o=n(19521),l=n(56947);let a=o.ZP.div.withConfig({displayName:"styles__StyledDivForEndcapWrapper",componentId:"sc-uueek-0"})(["position:relative;display:flex;justify-content:center;align-items:center;color:",";box-sizing:border-box;flex-direction:column;margin-left:",";text-decoration:none;img,svg{display:block;width:100%;max-width:296px;height:auto;margin:"," auto;}h2{font-size:36px;line-height:1.15em;color:inherit;margin-bottom:",";}@media (max-width:","){width:calc(100vw - ",");padding-top:",";h2{font-size:32px;margin-bottom:",";}img,svg{max-width:100%;margin:0;}}a{color:inherit;display:inline-block;padding:",";&:hover{color:inherit;}&:focus{color:inherit;outline:dashed ",";}&:visited{color:inherit;}}"],({text_color:e})=>"light"===e?l.colors.text.onDark.primary:l.colors.text.onLight.primary,l.space.inset.x2,l.space.inset.x2,l.space.generic.x2,l.breakpoints.smMax,l.space.inset.x4,l.space.generic.x2,l.space.generic.x1,l.space.generic.x1,({text_color:e})=>"light"===e?l.colors.text.onDark.primary:l.colors.text.onLight.primary),d=o.ZP.div.withConfig({displayName:"styles__StyledDivForEndcapHeadline",componentId:"sc-uueek-1"})(["position:absolute;top:0;right:0;bottom:0;left:0;text-align:center;display:flex;flex-direction:column;justify-content:center;padding:",";margin:",";"],l.space.inset.x3,l.space.inset.x3),s=o.ZP.div.withConfig({displayName:"styles__StyledDivForEndcapVariableHeadline",componentId:"sc-uueek-2"})(["position:relative;text-align:center;display:flex;flex-direction:column;justify-content:center;background-color:",";min-height:5em;width:100%;padding:"," ",";"],e=>{var t;return null!==(t=e.backgroundColor)&&void 0!==t?t:l.colors.palette.white},l.space.inset.x3,l.space.inset.x5),c=({fillColor:e="",ratioWidth:t="160",ratioHeight:n="90"})=>(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000",viewBox:`0 0 ${t} ${n}`,children:(0,i.jsx)("rect",{width:t,height:n,fill:e,fillOpacity:e?"1":"0"})}),p=e=>{let{screenMd:t}=(0,r.l)(),n=null!=e&&e.image_1x1?(0,i.jsx)("img",{src:`${e.image_1x1}?wid=800`,alt:null==e?void 0:e.image_alt_text}):(0,i.jsx)(c,{fillColor:null==e?void 0:e.noImage_color,ratioWidth:"100",ratioHeight:"100"}),o=null!=e&&e.image_16x9?(0,i.jsx)("img",{src:`${e.image_16x9}?wid=800`,alt:null==e?void 0:e.image_alt_text}):null;return t?n:o};c.displayName="SVGBackgroundFill",p.displayName="PersonalizationEndcapImage";var u=n(55446),m=n(23258);let f=({headline:e,trackClick:t})=>(0,i.jsxs)(d,{children:[e?(0,i.jsx)(u.w,{level:2,size:1,children:e}):null,t?(0,i.jsx)("div",{children:(0,i.jsx)(m.B9,{trackClick:t})}):null]});f.displayName="PersonalizationEndcapHeadline";let g=({bgColor:e,headline:t,trackClick:n})=>(0,i.jsxs)(s,{backgroundColor:e,children:[t?(0,i.jsx)(u.w,{level:2,size:1,children:t}):null,n?(0,i.jsx)("div",{children:(0,i.jsx)(m.B9,{trackClick:n})}):null]});g.displayName="PersonalizationEndcapVariableHeadline";let h=e=>{let{image_1x1:t,image_16x9:n,image_alt_text:o,headline:l,background_color:d,text_color:s,track_click:c}=e,{screenMd:u}=(0,r.l)();return u||n?(0,i.jsxs)(a,{text_color:s,children:[(0,i.jsx)(p,{hasLink:!!c,image_16x9:n,image_1x1:t,image_alt_text:o,noImage_color:d}),(0,i.jsx)(f,{headline:l,trackClick:c})]}):(0,i.jsx)(a,{text_color:s,children:(0,i.jsx)(g,{bgColor:d,headline:l,trackClick:c})})};h.displayName="PersonalizationEndcap"},66069:function(e,t,n){n.d(t,{Fg:function(){return d},JU:function(){return a},TZ:function(){return l}});var i=n(19521),r=n(56947),o=n(36679);let l=i.ZP.div.withConfig({displayName:"styles__FilmstripWrapper",componentId:"sc-9ebcfz-0"})(["background-color:",";padding-left:",";padding-bottom:",";"],e=>{var t;return null!==(t=e.backgroundColor)&&void 0!==t?t:"transparent"},e=>e.extraPadding?r.space.generic.x4:0,e=>e.extraPadding?r.space.generic.x4:0),a=i.ZP.div.withConfig({displayName:"styles__HeadlineWrapper",componentId:"sc-9ebcfz-1"})(["text-align:center;background-color:",";color:",";a{color:inherit;display:inline-block;padding:",";&:hover{color:inherit;}&:focus{color:inherit;outline:dashed ",";}&:visited{color:inherit;}}"],e=>{var t;return null!==(t=e.background_color)&&void 0!==t?t:"transparent"},({text_color:e})=>"light"===e?r.colors.text.onDark.primary:r.colors.text.onLight.primary,r.space.generic.x1,({text_color:e})=>"light"===e?r.colors.text.onDark.primary:r.colors.text.onLight.primary),d=(0,i.ZP)(o.F).withConfig({displayName:"styles__StyledLink",componentId:"sc-9ebcfz-2"})(["border-radius:1px;"])}}]);