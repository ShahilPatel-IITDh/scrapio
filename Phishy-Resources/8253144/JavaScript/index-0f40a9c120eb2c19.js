(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5405],{2668:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return i(32215)}])},82885:function(e,t,i){"use strict";var n=i(97458),r=i(55258),a=i(27144);let o=a.ZP.img.withConfig({componentId:"sc-c5c8ef7c-0"})`
  border: 1px solid ${e=>{let{theme:t}=e;return t.card.background}};
  border-radius: 50%;
  bottom: 0px;
  position: absolute;
  right: 0px;
  min-width: 20px;
  min-height: 20px;
  width: 37.5%;
  height: 37.5%;
  z-index: 5;

  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    border-width: 2px;
  }
`,l=a.ZP.div.withConfig({componentId:"sc-c5c8ef7c-1"})`
  background: url('${e=>{let{bg:t}=e;return t}}');
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  position: relative;
  width: 100%;
  height: 100%;

  & > img {
    border-radius: 50%;
  }
`,s=(0,a.ZP)(r.Z).withConfig({componentId:"sc-c5c8ef7c-2"})`
  width: 100%;
  height: 100%;
`,d=e=>{var t;let{profile:i}=e;return(0,n.jsxs)(l,{bg:null===(t=i.nft)||void 0===t?void 0:t.image.thumbnail,children:[!i.isActive&&(0,n.jsx)(s,{}),i.team&&(0,n.jsx)(o,{src:`/images/teams/${i.team.images.alt}`,alt:i.team.name})]})};t.Z=d},20490:function(e,t,i){"use strict";var n=i(40732);let r=e=>{let[t,i]=(0,n.Pn)();return{usernameWithVisibility:e&&(t?e:"\uD83D\uDC30\uD83D\uDC30\uD83D\uDC30\uD83D\uDC30\uD83D\uDC30\uD83D\uDC30"),userUsernameVisibility:t,setUserUsernameVisibility:i}};t.Z=r},66840:function(e,t,i){"use strict";i.d(t,{o:function(){return B}});var n=i(17921),r=i(99835),a=i.n(r),o=i(86066),l=i(52983),s=i(71421),d=i(7058),c=i(1462),p=i(95423),x=i(90239),h=i(58475),u=i(896),A=i(20030);let g=(0,p.ot)(),m=new n.Z("1000000000000"),f=new n.Z("1000000000000000000"),b=(e,t,i)=>e.times(f).div(t).div(i).times(100),C=(e,t,i)=>new n.Z(e.toString()).times(new n.Z(Math.max(t,0))).div(new n.Z(i.toString())).div(m),w=(e,t)=>new n.Z(e).times(t.plus(1));function B(){let{duration:e=h.VO}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{totalShares:t=x.HW,pricePerFullShare:i=x.HW,fees:{performanceFeeAsDecimal:r}={performanceFeeAsDecimal:2}}=(0,s.Xo)(),p=(0,l.useMemo)(()=>new n.Z(t.toString()),[t]),m=(0,l.useMemo)(()=>new n.Z(i.toString()),[i]),{data:f}=(0,d.Z)("masterChef-total-cake-pool-emission",async()=>{let e=(0,u.z2)({chainId:A.a_.BSC}),[t,i,r]=await e.multicall({contracts:[{address:g,abi:c.H,functionName:"cakePerBlock",args:[!1]},{address:g,abi:c.H,functionName:"poolInfo",args:[BigInt(0)]},{address:g,abi:c.H,functionName:"totalSpecialAllocPoint"}],allowFailure:!1}),a=i[2],l=new n.Z(a.toString()).div(new n.Z(r.toString()));return new n.Z(t.toString()).times(o.Bi).times(l)}),B=(0,l.useMemo)(()=>f&&!m.isZero()&&!p.isZero()&&b(f,m,p).toString(),[m,f,p]),Z=(0,l.useMemo)(()=>C(h.xt,e,h.A0),[e]),j=(0,l.useMemo)(()=>B&&w(B,Z).toString(),[Z,B]),k=(0,l.useCallback)(e=>C(h.xt,e,h.A0),[]),v=(0,l.useMemo)(()=>{if(B&&r){let e=a()(1-r/100);return new n.Z(B).times(e).toString()}return B},[B,r]);return{flexibleApy:v,lockedApy:j,getLockedApy:(0,l.useCallback)(e=>B&&w(B,k(e)).toString(),[B,k]),boostFactor:(0,l.useMemo)(()=>Z.plus("1"),[Z]),getBoostFactor:(0,l.useCallback)(e=>k(e).plus("1"),[k])}}},32215:function(e,t,i){"use strict";i.r(t),i.d(t,{__N_SSG:function(){return re},default:function(){return rt}});var n,r,a=i(97458),o=i(96638),l=i(67082),s=i.n(l),d=i(27144),c=i(4746),p=i(33077),x=i(17206),h=i(55391),u=i(4586),A=i(29063),g=i(20030),m=i(33932),f=i(29974),b=i(48586),C=i(30202),w=i(71645),B=i(84633),Z=i.n(B),j=i(90624),k=i(25149);let v=(e,t)=>d.F4`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(${e}, ${t});
  }
  to {
    transform: translate(0, 0px);
  }
`,E=(0,d.ZP)(k.ZP).withConfig({componentId:"sc-dd92527b-0"})`
  position: relative;
  max-height: ${e=>{let{maxHeight:t}=e;return t}};

  & :nth-child(2) {
    animation: ${v("3px","15px")} 3s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${v("5px","10px")} 3s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${v("6px","5px")} 3s ease-in-out infinite;
    animation-delay: 0.33s;
  }

  & :nth-child(5) {
    animation: ${v("4px","12px")} 3s ease-in-out infinite;
    animation-delay: 0s;
  }
`,S=d.ZP.img.withConfig({componentId:"sc-dd92527b-1"})`
  max-height: ${e=>{let{maxHeight:t}=e;return t}};
  visibility: hidden;
`,y=(0,d.ZP)(k.ZP).withConfig({componentId:"sc-dd92527b-2"})`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  img {
    max-height: 100%;
    width: auto;
  }
`;(n=r||(r={})).MD="1.5x",n.LG="2x";let L=function(e,t,i){let n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:".png";return`${e}${t}${i?`@${i}${n}`:n}`},D=function(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:".png";return`${L(e,t,void 0,i)} 512w,
  ${L(e,t,r.MD,i)} 768w,
  ${L(e,t,r.LG,i)} 1024w,`},F=e=>{let{path:t,attributes:i,maxHeight:n="512px"}=e;return(0,a.jsxs)(E,{maxHeight:n,children:[(0,a.jsx)(S,{srcSet:D(t,i[0].src,".webp"),maxHeight:n,loading:"lazy",decoding:"async",onError:e=>{let n=D(t,i[0].src);if(""!==e.currentTarget.srcset&&e.currentTarget.srcset!==n)e.currentTarget.srcset=n;else{let n=L(t,i[0].src);""===e.currentTarget.srcset||e.currentTarget.src.endsWith(n)||(e.currentTarget.srcset="",e.currentTarget.src=n)}}}),i.map(e=>(0,a.jsx)(y,{children:(0,a.jsx)("img",{srcSet:D(t,e.src,".webp"),alt:e.alt,onError:i=>{let n=D(t,e.src);if(""!==i.currentTarget.srcset&&i.currentTarget.srcset!==n)i.currentTarget.srcset=n;else{let n=L(t,e.src);""===i.currentTarget.srcset||i.currentTarget.src.endsWith(n)||(i.currentTarget.srcset="",i.currentTarget.src=n)}}})},e.src))]})};var M=i(30760);let I=()=>d.F4`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, -5px);
  }
  to {
    transform: translate(0, 0px);
  }
`,U=()=>d.F4`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0.1;
  }
  to {
    opacity: 0.9;
  }
`,V=d.ZP.div.withConfig({componentId:"sc-6f4112d1-0"})`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
`,P=d.ZP.div.withConfig({componentId:"sc-6f4112d1-1"})`
  position: absolute;
  width: 100%;
  bottom: -3px;
`,z=d.ZP.div.withConfig({componentId:"sc-6f4112d1-2"})`
  width: 100%;
  animation: ${I} 3.5s ease-in-out infinite;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`,T=d.ZP.div.withConfig({componentId:"sc-6f4112d1-3"})`
  position: absolute;
  top: 0;
  left: 0;

  & :nth-child(2) {
    animation: ${U} 2s ease-in-out infinite;
    animation-delay: 1s;
  }

  & :nth-child(3) {
    animation: ${U} 5s ease-in-out infinite;
    animation-delay: 0.66s;
  }

  & :nth-child(4) {
    animation: ${U} 2.5s ease-in-out infinite;
    animation-delay: 0.33s;
  }
`,Q={path:"/images/home/lunar-bunny/",attributes:[{src:"star-l",alt:"3D Star"},{src:"star-r",alt:"3D Star"},{src:"star-top-r",alt:"3D Star"}]},R=()=>{let{t:e}=(0,u.Z)(),{address:t}=(0,p.mA)(),{chainId:i}=(0,A.g)();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s(),{id:"17b87fe7f0af5ff",children:'.slide-svg-dark{display:none}.slide-svg-light{display:block}[data-theme="dark"] .slide-svg-dark{display:block}[data-theme="dark"] .slide-svg-light{display:none}'}),(0,a.jsx)(V,{children:(0,a.jsxs)(P,{children:[(0,a.jsx)(M.U,{className:"slide-svg-dark",width:"100%"}),(0,a.jsx)(M.s,{className:"slide-svg-light",width:"100%"})]})}),(0,a.jsxs)(m.Z,{position:"relative",flexDirection:["column-reverse",null,null,"row"],alignItems:["flex-end",null,null,"center"],justifyContent:"center",mt:[t&&i===g.a_.BSC?"280px":"50px",null,0],id:"homepage-hero",children:[(0,a.jsxs)(m.Z,{flex:"1",flexDirection:"column",children:[(0,a.jsx)(f.Z,{scale:"xxl",color:"secondary",mb:"24px",children:e("The moon is made of pancakes.")}),(0,a.jsx)(f.Z,{scale:"md",mb:"24px",children:e("Trade, earn, and win crypto on the most popular decentralized platform in the galaxy.")}),(0,a.jsxs)(m.Z,{children:[!t&&(0,a.jsx)(w.Z,{mr:"8px"}),(0,a.jsx)(b.Z,{to:"/swap",children:(0,a.jsx)(C.Z,{variant:t?"primary":"secondary",children:e("Trade Now")})})]})]}),(0,a.jsxs)(m.Z,{height:["192px",null,null,"100%"],width:["192px",null,null,"100%"],flex:[null,null,null,"1"],mb:["24px",null,null,"0"],position:"relative",children:[(0,a.jsx)(z,{children:(0,a.jsx)(Z(),{src:`${j.EW}/web/images/astronaut-bunny.png`,priority:!0,blurDataURL:"data:image/png;base64,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",width:1024,height:1024,alt:e("Lunar bunny"),unoptimized:!0})}),(0,a.jsx)(T,{children:(0,a.jsx)(F,{...Q})})]})]})]})},W=e=>({headingText:e("Trade anything. No registration, no hassle."),bodyText:e("Trade any token on BNB Smart Chain in seconds, just by connecting your wallet."),reverse:!1,primaryButton:{to:"/swap",text:e("Trade Now"),external:!1},secondaryButton:{to:"https://docs.pancakeswap.finance/",text:e("Learn"),external:!0},images:{path:"/images/home/trade/",attributes:[{src:"BNB",alt:e("BNB token")},{src:"BTC",alt:e("BTC token")},{src:"CAKE",alt:e("CAKE token")}]}}),H=e=>({headingText:e("Earn passive income with crypto."),bodyText:e("PancakeSwap makes it easy to make your crypto work for you."),reverse:!0,primaryButton:{to:"/farms",text:e("Explore"),external:!1},secondaryButton:{to:"https://docs.pancakeswap.finance/products/yield-farming",text:e("Learn"),external:!0},images:{path:"/images/home/earn/",attributes:[{src:"pie",alt:e("Pie chart")},{src:"stonks",alt:e("Stocks chart")},{src:"folder",alt:e("Folder with cake token")}]}}),N=e=>({headingText:e("CAKE makes our world go round."),bodyText:e("CAKE token is at the heart of the PancakeSwap ecosystem. Buy it, win it, farm it, spend it, stake it... heck, you can even vote with it!"),reverse:!1,primaryButton:{to:"/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&chainId=56",text:e("Buy CAKE"),external:!1},secondaryButton:{to:"https://docs.pancakeswap.finance/tokenomics/cake",text:e("Learn"),external:!0},images:{path:"/images/home/cake/",attributes:[{src:"bottom-right",alt:e("Small 3d pancake")},{src:"top-right",alt:e("Small 3d pancake")},{src:"coin",alt:e("CAKE token")},{src:"top-left",alt:e("Small 3d pancake")}]}});var K=i(71395),J=i(29032),q=i(74190),G=i(26909),X=i(58733),$=i(81379),Y=i(7058),O=i(7905),_=i(98245);let ee=(0,d.ZP)(O.Z).withConfig({componentId:"sc-dafe503b-0"})`
  height: fit-content;
  padding: 1px 1px 4px 1px;
  box-sizing: border-box;

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    ${e=>{let{rotation:t}=e;return t?`transform: rotate(${t});`:""}}
  }
`,et=(0,d.ZP)(k.ZP).withConfig({componentId:"sc-dafe503b-1"})`
  position: absolute;
  top: 24px;
  right: 24px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    ${e=>{let{rotation:t}=e;return t?`transform: rotate(${t});`:""}}
  }
`,ei=e=>{let{icon:t,background:i,borderColor:n,rotation:r,children:o,...l}=e;return(0,a.jsx)(ee,{background:i,borderBackground:n,rotation:r,...l,children:(0,a.jsxs)(_.Z,{children:[(0,a.jsx)(et,{rotation:r,children:t}),o]})})};var en=i(48172);let er=e=>{let{headingText:t,bodyText:i,highlightColor:n}=e,{isMobile:r,isTablet:o}=(0,en.Z)(),l=t.split(" "),s=l.pop(),d=l.slice(0,l.length).join(" ");return(0,a.jsxs)(m.Z,{minHeight:[null,null,null,"168px"],minWidth:"232px",width:"fit-content",flexDirection:"column",justifyContent:"flex-end",mt:[null,null,null,"64px"],children:[(r||o)&&d.length>13?(0,a.jsx)(f.Z,{scale:"lg",children:d}):(0,a.jsx)(f.Z,{scale:"xl",children:d}),(0,a.jsx)(f.Z,{color:n,scale:"xl",mb:"24px",children:s}),(0,a.jsx)(G.Z,{color:"textSubtle",children:i})]})};var ea=i(5592);let eo=()=>{let{t:e}=(0,u.Z)(),{theme:t}=(0,x.ZP)(),{data:i}=(0,Y.Z)("tvl"),{data:n}=(0,Y.Z)("totalTx30Days"),{data:r}=(0,Y.Z)("addressCount30Days"),o=(0,$.uI)(n),l=(0,$.uI)(r),s=i?(0,$.uI)(i):"-",d=e("And those users are now entrusting the platform with over $%tvl% in funds.",{tvl:s}),[c,p]=d.split(s),h={icon:(0,a.jsx)(K.Z,{color:"secondary",width:"36px"})},A={icon:(0,a.jsx)(J.Z,{color:"primary",width:"36px"})},g={icon:(0,a.jsx)(q.Z,{color:"failure",width:"36px"})};return(0,a.jsxs)(m.Z,{justifyContent:"center",alignItems:"center",flexDirection:"column",children:[(0,a.jsx)(ea.Z,{height:"48px",width:"48px",mb:"24px"}),(0,a.jsx)(f.Z,{textAlign:"center",scale:"xl",children:e("Used by millions.")}),(0,a.jsx)(f.Z,{textAlign:"center",scale:"xl",mb:"32px",children:e("Trusted with billions.")}),(0,a.jsx)(G.Z,{textAlign:"center",color:"textSubtle",children:e("PancakeSwap has the most users of any decentralized platform, ever.")}),(0,a.jsx)(m.Z,{flexWrap:"wrap",children:(0,a.jsxs)(G.Z,{display:"inline",textAlign:"center",color:"textSubtle",mb:"20px",children:[c,(0,a.jsx)(a.Fragment,{children:i?(0,a.jsx)(a.Fragment,{children:s}):(0,a.jsx)(X.Z,{display:"inline-block",height:16,width:70,mt:"2px"})}),p]})}),(0,a.jsx)(G.Z,{textAlign:"center",color:"textSubtle",bold:!0,mb:"32px",children:e("Will you join them?")}),(0,a.jsxs)(m.Z,{maxWidth:"100%",flexDirection:["column",null,null,"row"],children:[(0,a.jsx)(ei,{...h,mr:[null,null,null,"16px"],mb:["16px",null,null,"0"],children:(0,a.jsx)(er,{headingText:e("%users% users",{users:l}),bodyText:e("in the last 30 days"),highlightColor:t.colors.secondary})}),(0,a.jsx)(ei,{...A,mr:[null,null,null,"16px"],mb:["16px",null,null,"0"],children:(0,a.jsx)(er,{headingText:e("%trades% trades",{trades:o}),bodyText:e("made in the last 30 days"),highlightColor:t.colors.primary})}),(0,a.jsx)(ei,{...g,children:(0,a.jsx)(er,{headingText:e("$%tvl% staked",{tvl:s}),bodyText:e("Total Value Locked"),highlightColor:t.colors.failure})})]})]})};var el=i(44986),es=i(27632),ed=i(34680);let ec=e=>{let{headingText:t,bodyText:i,reverse:n,primaryButton:r,secondaryButton:o,images:l}=e;return(0,a.jsx)(m.Z,{flexDirection:"column",children:(0,a.jsxs)(m.Z,{flexDirection:["column-reverse",null,null,n?"row-reverse":"row"],alignItems:["flex-end",null,null,"center"],justifyContent:"center",children:[(0,a.jsxs)(m.Z,{flexDirection:"column",flex:"1",ml:[null,null,null,n&&"64px"],mr:[null,null,null,!n&&"64px"],alignSelf:["flex-start",null,null,"center"],children:[(0,a.jsx)(ed.Z,{text:t}),(0,a.jsx)(G.Z,{color:"textSubtle",mb:"24px",children:i}),(0,a.jsxs)(m.Z,{children:[(0,a.jsx)(C.Z,{mr:"16px",children:r.external?(0,a.jsx)(el.Z,{external:!0,href:r.to,children:(0,a.jsx)(G.Z,{color:"card",bold:!0,fontSize:"16px",children:r.text})}):(0,a.jsx)(b.Z,{to:r.to,children:(0,a.jsx)(G.Z,{color:"card",bold:!0,fontSize:"16px",children:r.text})})}),o.external?(0,a.jsxs)(el.Z,{external:!0,href:o.to,children:[o.text,(0,a.jsx)(es.Z,{color:"primary",ml:"4px"})]}):(0,a.jsx)(b.Z,{to:o.to,children:o.text})]})]}),(0,a.jsx)(m.Z,{height:["192px",null,null,"100%"],width:["192px",null,null,"100%"],flex:[null,null,null,"1"],mb:["24px",null,null,"0"],children:(0,a.jsx)(F,{...l})})]})})};var ep=i(7133),ex=i(90430),eh=i(52983),eu=i(58833),eA=i(84601),eg=i(61251),em=i(97511),ef=i(10928),eb=i(98630);let eC=(0,d.ZP)(b.Z).withConfig({componentId:"sc-a05ac88a-0"})`
  width: 100%;
`,ew=e=>{let{preText:t,won:i}=e;return(0,a.jsxs)(f.Z,{color:"#280D5F",my:"8px",scale:"xl",bold:!0,children:[t,i]})},eB=()=>{let{t:e}=(0,u.Z)(),{observerRef:t,isIntersecting:i}=(0,eA.S1)(),[n,r]=(0,eh.useState)(!1),l=(0,em.Hf)({forceMainnet:!0}),s=(0,em.S9)({forceMainnet:!0}),{data:d}=(0,o.ZP)(n?["prediction","tokenWon"]:null,eg.yn,{refreshInterval:eb.KI}),c=(0,ef.a)(l,(null==d?void 0:d.totalWonBNB)||0),p=(0,ef.a)(s,(null==d?void 0:d.totalWonCAKE)||0),x=(0,$.uI)(c+p),h=e("$%wonInUsd% in BNB + CAKE won so far",{wonInUsd:x}),[A,g]=h.split(x);return(0,eh.useEffect)(()=>{i&&r(!0)},[i]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(m.Z,{flexDirection:"column",mt:"48px",children:[(0,a.jsx)(G.Z,{color:"#280D5F",bold:!0,fontSize:"16px",children:e("Prediction")}),c?(0,a.jsx)(ew,{preText:A,won:x}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(X.Z,{width:230,height:40,my:"8px"}),(0,a.jsx)("div",{ref:t})]}),(0,a.jsx)(G.Z,{color:"#280D5F",mb:"24px",bold:!0,fontSize:"16px",children:g}),(0,a.jsx)(G.Z,{color:"#280D5F",mb:"40px",children:e("Predict the price trend of BNB or CAKE to win")})]}),(0,a.jsx)(m.Z,{alignItems:"center",justifyContent:"center",children:(0,a.jsx)(eC,{to:"/prediction",id:"homepage-prediction-cta",children:(0,a.jsxs)(C.Z,{width:"100%",children:[(0,a.jsx)(G.Z,{bold:!0,color:"invertedContrast",children:e("Play")}),(0,a.jsx)(eu.Z,{ml:"4px",color:"invertedContrast"})]})})})]})};var eZ=i(6126),ej=i(37745),ek=i(58274);let ev=(0,d.ZP)(b.Z).withConfig({componentId:"sc-16bbce39-0"})`
  width: 100%;
`,eE=(0,d.ZP)(eZ.Z).withConfig({componentId:"sc-16bbce39-1"})`
  background: ${e=>{let{theme:t}=e;return t.colors.gradientGold}};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`,eS=()=>{let{t:e}=(0,u.Z)(),{observerRef:t,isIntersecting:i}=(0,eA.S1)(),[n,r]=(0,eh.useState)(!1),o=(0,ej.Nj)(),{data:l}=(0,Y.Z)(n?["currentLotteryId"]:null,ek.kC,{refreshInterval:eb.KI}),{data:s}=(0,Y.Z)(l?["currentLottery"]:null,async()=>(0,ek.JE)(l.toString()),{refreshInterval:eb.KI}),d=e("%cakePrizeInUsd% in CAKE prizes this round",{cakePrizeInUsd:o.toString()}),[c,p]=d.split(o.toString()),x=s?parseFloat(s.amountCollectedInCake):null,h=x?o.times(x):null;return(0,eh.useEffect)(()=>{i&&r(!0)},[i]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(m.Z,{flexDirection:"column",mt:"48px",children:[(0,a.jsx)(G.Z,{color:"white",bold:!0,fontSize:"16px",children:e("Lottery")}),c&&(0,a.jsx)(G.Z,{color:"white",mt:"12px",bold:!0,fontSize:"16px",children:c}),h&&h.gt(0)?(0,a.jsx)(eE,{fontSize:"40px",bold:!0,prefix:"$",decimals:0,value:(0,$.U4)(h).toNumber()}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(X.Z,{width:200,height:40,my:"8px"}),(0,a.jsx)("div",{ref:t})]}),(0,a.jsx)(G.Z,{color:"white",mb:"24px",bold:!0,fontSize:"16px",children:p}),(0,a.jsx)(G.Z,{color:"white",mb:"40px",children:e("Buy tickets with CAKE, win CAKE if your numbers match")})]}),(0,a.jsx)(m.Z,{alignItems:"center",justifyContent:"center",children:(0,a.jsx)(ev,{to:"/lottery",id:"homepage-prediction-cta",children:(0,a.jsxs)(C.Z,{width:"100%",children:[(0,a.jsx)(G.Z,{bold:!0,color:"invertedContrast",children:e("Buy Tickets")}),(0,a.jsx)(eu.Z,{ml:"4px",color:"invertedContrast"})]})})})]})},ey=d.ZP.div.withConfig({componentId:"sc-e5f8f124-0"})`
  background: ${e=>{let{theme:t}=e;return t.isDark?"rgba(8, 6, 11, 0.6)":" rgba(255, 255, 255, 0.6)"}};
  padding: 16px;
  border: 1px solid ${e=>{let{theme:t}=e;return t.colors.cardBorder}};
  box-sizing: border-box;
  backdrop-filter: blur(12px);
  border-radius: 72px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    padding: 40px;
  }
`,eL=d.ZP.div.withConfig({componentId:"sc-e5f8f124-1"})`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`,eD=(0,d.ZP)(m.Z).withConfig({componentId:"sc-e5f8f124-2"})`
  position: absolute;
  left: 0;
  bottom: -64px;
  max-width: 192px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    max-width: 100%;
  }
`,eF=(0,d.ZP)(m.Z).withConfig({componentId:"sc-e5f8f124-3"})`
  position: absolute;
  right: 0;
  top: -64px;

  max-width: 192px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    max-width: 100%;
  }
`,eM={icon:(0,a.jsx)(ep.Z,{width:"36px",color:"inverseContrast"}),background:"linear-gradient(180deg, #ffb237 0%, #ffcd51 51.17%, #ffe76a 100%);",borderColor:"#ffb237",rotation:"-2.36deg"},eI={icon:(0,a.jsx)(ex.Z,{color:"white",width:"36px"}),background:" linear-gradient(180deg, #7645D9 0%, #5121B1 100%);",borderColor:"#3C1786",rotation:"1.43deg"},eU={path:"/images/home/prediction-cards/",attributes:[{src:"bottom-left",alt:"CAKE card"},{src:"green",alt:"Green CAKE card with up arrow"},{src:"red",alt:"Red Cake card with down arrow"},{src:"top-right",alt:"CAKE card"}]},eV={path:"/images/home/lottery-balls/",attributes:[{src:"2",alt:"Lottery ball number 2"},{src:"4",alt:"Lottery ball number 4"},{src:"6",alt:"Lottery ball number 6"},{src:"7",alt:"Lottery ball number 7"},{src:"9",alt:"Lottery ball number 9"}]},eP=()=>{let{t:e}=(0,u.Z)(),{theme:t}=(0,x.ZP)();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(eL,{children:[(0,a.jsx)(eD,{children:(0,a.jsx)(F,{...eU})}),(0,a.jsx)(eF,{children:(0,a.jsx)(F,{...eV})})]}),(0,a.jsx)(ey,{isDark:t.isDark,children:(0,a.jsxs)(m.Z,{flexDirection:"column",alignItems:"center",justifyContent:"center",children:[(0,a.jsx)(ed.Z,{textAlign:"center",text:e("Win millions in prizes")}),(0,a.jsx)(G.Z,{color:"textSubtle",children:e("Provably fair, on-chain games.")}),(0,a.jsx)(G.Z,{mb:"40px",color:"textSubtle",children:e("Win big with PancakeSwap.")}),(0,a.jsxs)(m.Z,{m:"0 auto",flexDirection:["column",null,null,"row"],maxWidth:"600px",children:[(0,a.jsx)(m.Z,{flex:"1",maxWidth:["275px",null,null,"100%"],mr:[null,null,null,"24px"],mb:["32px",null,null,"0"],children:(0,a.jsx)(ei,{...eM,children:(0,a.jsx)(eB,{})})}),(0,a.jsx)(m.Z,{flex:"1",maxWidth:["275px",null,null,"100%"],children:(0,a.jsx)(ei,{...eI,children:(0,a.jsx)(eS,{})})})]})]})})]})};var ez=i(27131),eT=i(3101),eQ=i(83018),eR=i(7583),eW=i(20591),eH=i(40916),eN=i.n(eH),eK=i(37622),eJ=i(41987),eq=i(26639);let eG=e=>{let t=(0,eQ.TL)(),{data:i,regularCakePerBlock:n}=(0,ej.E2)(),{data:r,isLoading:a}=(0,eq.jz)(),[l,s]=(0,eh.useState)(()=>[null,null,null,null,null]),d=(0,ej.Nj)(),{chainId:c}=(0,A.g)(),{status:p,isValidating:x}=(0,o.ZP)(e&&c&&[c,"fetchTopFarmsByApr"],async()=>{let e=await (0,eJ.getFarmConfig)(c),i=e.filter(e=>0!==e.pid);return t((0,eR.eG)({pids:i.map(e=>e.pid),chainId:c}))},{revalidateOnFocus:!1,revalidateOnReconnect:!1});return(0,eh.useEffect)(()=>{if(p===eK.iF.Fetched&&(null==i?void 0:i.length)>0&&!a){let e=i.filter(e=>e.lpTotalInQuoteToken&&e.quoteTokenPriceBusd&&0!==e.pid&&e.multiplier&&"0X"!==e.multiplier),t=e.map(e=>{let t=e.lpTotalInQuoteToken.times(e.quoteTokenPriceBusd),{cakeRewardsApr:i,lpRewardsApr:r}=(0,eW.yW)(c,e.poolWeight,d,t,e.lpAddress,n);return{...e,apr:i,lpRewardsApr:r,version:2}}),a=r.farmsWithPrice.filter(e=>"0X"!==e.multiplier&&"cakeApr"in e).map(e=>({...e,apr:+e.cakeApr,lpRewardsApr:0,version:3})),o=eN()([...t,...a],e=>e.apr+e.lpRewardsApr,"desc");s(o.slice(0,5))}},[d,c,i,r.farmsWithPrice,p,a,n]),{topFarms:l,fetched:p===eK.iF.Fetched&&!x,chainId:c}};var eX=i(50663),e$=i.n(eX),eY=i(52832),eO=i(31219),e_=i(71421);let e0=(e,t)=>{let i=(0,eQ.TL)(),[n,r]=(0,eh.useState)(()=>[null,null,null,null,null]),{pools:a}=(0,e_.f6)(),{status:l,isValidating:s}=(0,o.ZP)(e&&t&&[t,"fetchTopPoolsByApr"],async()=>(await i((0,eO.Gf)({chainId:t})),Promise.all([i((0,eO.HX)(t)),i((0,eO.P4)(t)),i((0,eO.ht)(t))])),{revalidateOnFocus:!1,revalidateOnReconnect:!1});return(0,eh.useEffect)(()=>{let[e,t]=e$()(a,e=>0===e.sousId),i=e.filter(e=>e.vaultKey===eY.om.CakeVault);l!==eK.iF.Fetched||s||(e=>{let t=eN()(e,e=>e.apr||0,"desc");r([...i,...t.slice(0,4)])})(t)},[r,a,s,l]),{topPools:n}};var e1=i(10863),e2=i(66840),e4=i(97649);let e5=(0,d.ZP)(m.Z).withConfig({componentId:"sc-41d96a0c-0"})`
  position: relative;
`,e3=(0,d.ZP)(m.Z).withConfig({componentId:"sc-41d96a0c-1"})`
  position: absolute;
  top: ${e=>{let{topOffset:t}=e;return t}};
  opacity: ${e=>{let{visible:t}=e;return t?1:0}};
  margin-top: ${e=>{let{visible:t}=e;return t?0:"50%"}};
  transition: opacity, margin-top, 0.4s ease-out;
  flex-direction: column;

  ${e=>{let{index:t,theme:i}=e;return t>0?`
         ${i.mediaQueries.sm} {
           height: 80px;
           top: 0;
           padding-left: 16px;
           border-left: 1px ${i.colors.inputSecondary} solid;
         }
       `:"padding-right: 16px;"}}
`,e6=e=>{let{title:t,percentage:i,index:n,visible:r}=e,{t:o}=(0,u.Z)();return(0,a.jsx)(e5,{index:n,children:(0,a.jsxs)(e3,{index:n,visible:r,topOffset:n>=0&&n<2?"0px":n>=2&&n<3?"80px":"160px",children:[t?(0,a.jsx)(G.Z,{bold:!0,mb:"8px",fontSize:"12px",color:"secondary",children:t}):(0,a.jsx)(X.Z,{width:80,height:12,mb:"8px"}),i?(0,a.jsx)(e4.Z,{gap:"4px",children:(0,a.jsx)(eZ.Z,{lineHeight:"1.1",fontSize:"16px",bold:!0,unit:"%",value:i})}):(0,a.jsx)(X.Z,{width:60,height:16}),i?(0,a.jsx)(G.Z,{fontSize:"16px",color:"textSubtle",children:o("APR")}):(0,a.jsx)(X.Z,{width:30,height:16,mt:"4px"})]})})},e8=e=>{let{text:t,...i}=e,{theme:n}=(0,x.ZP)(),r=t.split(" "),o=r[0],l=r.slice(1).join(" ");return(0,a.jsxs)(f.Z,{...i,children:[o,(0,a.jsxs)("span",{style:{color:n.colors.secondary},children:[" ",l]})]})},e7=d.ZP.div.withConfig({componentId:"sc-e50386c7-0"})`
  display: grid;
  grid-template-columns: repeat(2, auto);

  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    grid-gap: 16px;
    grid-template-columns: repeat(5, auto);
  }

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    grid-gap: 32px;
  }
`,e9=()=>{let[e,t]=(0,eh.useState)(!0),{t:i}=(0,u.Z)(),{observerRef:n,isIntersecting:r}=(0,eA.S1)(),{topFarms:o,fetched:l,chainId:s}=eG(r),{topPools:d}=e0(l&&r,s),{lockedApy:c}=(0,e2.o)(),p=(0,eh.useRef)(null),x=o[0]&&d[0],h=(0,eh.useCallback)(()=>{p.current=setInterval(()=>{t(e=>!e)},6e3)},[p]);(0,eh.useEffect)(()=>(x&&h(),()=>{clearInterval(p.current)}),[p,x,h]);let A=(0,eh.useCallback)(e=>e.vaultKey?e1.Y[e.vaultKey].name:i("Stake %stakingSymbol% - Earn %earningSymbol%",{earningSymbol:e.earningToken.symbol,stakingSymbol:e.stakingToken.symbol}),[i]);return(0,a.jsx)("div",{ref:n,children:(0,a.jsxs)(m.Z,{flexDirection:"column",mt:"24px",children:[(0,a.jsxs)(m.Z,{mb:"24px",children:[(0,a.jsx)(e8,{text:e?i("Top Farms"):i("Top Syrup Pools")}),(0,a.jsx)(ez.Z,{variant:"text",height:"100%",width:"auto",onClick:()=>{t(e=>!e),clearInterval(p.current),h()},children:(0,a.jsx)(eT.Z,{height:"24px",width:"24px",color:"textSubtle"})})]}),(0,a.jsxs)(k.ZP,{height:["240px",null,"80px"],children:[(0,a.jsx)(e7,{children:o.map((t,i)=>(0,a.jsx)(e6,{title:(null==t?void 0:t.lpSymbol)&&`${null==t?void 0:t.lpSymbol}${(null==t?void 0:t.version)===3?` v${t.version}`:""}`,version:null==t?void 0:t.version,percentage:(null==t?void 0:t.apr)+(null==t?void 0:t.lpRewardsApr),index:i,visible:e},i))}),(0,a.jsx)(e7,{children:d.map((t,i)=>(0,a.jsx)(e6,{title:t&&A(t),percentage:(null==t?void 0:t.sousId)===0?+c:null==t?void 0:t.apr,index:i,visible:!e},i))})]})]})})};var te=i(85817);let tt=e=>(0,a.jsxs)(te.Z,{viewBox:"0 0 1956 1956",...e,children:[(0,a.jsx)("g",{filter:"url(#filter0_f)",children:(0,a.jsx)("path",{d:"M978 20L987.526 796.229L1078.14 25.248L1006.47 798.221L1177.18 40.9346L1025.11 802.182L1274.04 66.8879L1043.23 808.07L1367.65 102.823L1060.64 815.819L1457 148.348L1077.14 825.345L1541.1 202.962L1092.55 836.544L1619.03 266.067L1106.71 849.292L1689.93 336.973L1119.46 863.451L1753.04 414.902L1130.65 878.865L1807.65 499L1140.18 895.365L1853.18 588.346L1147.93 912.77L1889.11 681.962L1153.82 930.89L1915.07 778.821L1157.78 949.526L1930.75 877.862L1159.77 968.474L1936 978L1159.77 987.526L1930.75 1078.14L1157.78 1006.47L1915.07 1177.18L1153.82 1025.11L1889.11 1274.04L1147.93 1043.23L1853.18 1367.65L1140.18 1060.64L1807.65 1457L1130.65 1077.14L1753.04 1541.1L1119.46 1092.55L1689.93 1619.03L1106.71 1106.71L1619.03 1689.93L1092.55 1119.46L1541.1 1753.04L1077.14 1130.65L1457 1807.65L1060.64 1140.18L1367.65 1853.18L1043.23 1147.93L1274.04 1889.11L1025.11 1153.82L1177.18 1915.07L1006.47 1157.78L1078.14 1930.75L987.526 1159.77L978 1936L968.474 1159.77L877.862 1930.75L949.526 1157.78L778.821 1915.07L930.89 1153.82L681.962 1889.11L912.77 1147.93L588.346 1853.18L895.365 1140.18L499 1807.65L878.865 1130.65L414.902 1753.04L863.451 1119.46L336.973 1689.93L849.292 1106.71L266.067 1619.03L836.544 1092.55L202.962 1541.1L825.345 1077.14L148.348 1457L815.819 1060.64L102.823 1367.65L808.07 1043.23L66.8879 1274.04L802.182 1025.11L40.9346 1177.18L798.221 1006.47L25.248 1078.14L796.229 987.526L20 978L796.229 968.474L25.248 877.862L798.221 949.526L40.9346 778.821L802.182 930.89L66.8879 681.962L808.07 912.77L102.823 588.346L815.819 895.365L148.348 499L825.345 878.865L202.962 414.902L836.544 863.451L266.067 336.973L849.292 849.292L336.973 266.067L863.451 836.544L414.902 202.962L878.865 825.345L499 148.348L895.365 815.819L588.346 102.823L912.77 808.07L681.962 66.8879L930.89 802.182L778.821 40.9346L949.526 798.221L877.862 25.248L968.474 796.229L978 20Z",fill:"url(#paint0_radial)",fillOpacity:"0.1"})}),(0,a.jsxs)("defs",{children:[(0,a.jsxs)("filter",{id:"filter0_f",x:"0",y:"0",width:"1956",height:"1956",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB",children:[(0,a.jsx)("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),(0,a.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"BackgroundImageFix",result:"shape"}),(0,a.jsx)("feGaussianBlur",{stdDeviation:"10",result:"effect1_foregroundBlur"})]}),(0,a.jsxs)("radialGradient",{id:"paint0_radial",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(978 978) rotate(90) scale(958)",children:[(0,a.jsx)("stop",{offset:"0.114547",stopColor:"white",stopOpacity:"0"}),(0,a.jsx)("stop",{offset:"0.374975",stopColor:"white"}),(0,a.jsx)("stop",{offset:"1",stopColor:"white",stopOpacity:"0"})]})]})]}),ti=d.ZP.div.withConfig({componentId:"sc-5f6b33d6-0"})`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
`,tn=(0,d.ZP)(tt).withConfig({componentId:"sc-5f6b33d6-1"})`
  height: 350%;
  width: 350%;

  ${e=>{let{theme:t}=e;return t.mediaQueries.xl}} {
    height: 400%;
    width: 400%;
  }
`,tr=(0,d.ZP)(m.Z).withConfig({componentId:"sc-5f6b33d6-2"})`
  z-index: 1;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`,ta=(0,d.ZP)(h.Z).withConfig({componentId:"sc-5f6b33d6-3"})`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  visibility: hidden;

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    visibility: visible;
  }
`,to=(0,d.ZP)(m.Z).withConfig({componentId:"sc-5f6b33d6-4"})`
  position: absolute;
  left: 0;
  top: 0;
`,tl=(0,d.ZP)(m.Z).withConfig({componentId:"sc-5f6b33d6-5"})`
  position: absolute;
  right: 0;
  bottom: 0;
`,ts={path:"/images/home/flying-pancakes/",attributes:[{src:"1-bottom",alt:"Pancake flying on the bottom"},{src:"1-left",alt:"Pancake flying on the left"},{src:"1-top",alt:"Pancake flying on the top"}]},td={path:"/images/home/flying-pancakes/",attributes:[{src:"2-bottom",alt:"Pancake flying on the bottom"},{src:"2-top",alt:"Pancake flying on the top"},{src:"2-right",alt:"Pancake flying on the right"}]},tc=()=>{let{t:e}=(0,u.Z)(),{address:t}=(0,p.mA)(),{isTablet:i,isDesktop:n}=(0,en.Z)();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(ti,{children:(0,a.jsx)(m.Z,{alignItems:"center",justifyContent:"center",width:"100%",height:"100%",children:(0,a.jsx)(tn,{})})}),(i||n)&&(0,a.jsxs)(ta,{children:[(0,a.jsx)(to,{children:(0,a.jsx)(F,{...ts,maxHeight:"256px"})}),(0,a.jsx)(tl,{children:(0,a.jsx)(F,{...td,maxHeight:"256px"})})]}),(0,a.jsxs)(tr,{children:[(0,a.jsx)(f.Z,{mb:"24px",scale:"xl",color:"white",children:e("Start in seconds.")}),(0,a.jsx)(G.Z,{textAlign:"center",color:"white",children:e("Connect your crypto wallet to start using the app in seconds.")}),(0,a.jsx)(G.Z,{mb:"24px",bold:!0,color:"white",children:e("No registration needed.")}),(0,a.jsxs)(el.Z,{external:!0,href:"https://docs.pancakeswap.finance/",children:[e("Learn how to start"),(0,a.jsx)(es.Z,{color:"primary",ml:"4px"})]}),!t&&(0,a.jsx)(w.Z,{mt:"24px"})]})]})};var tp=i(49292),tx=i(64523),th=i(95423),tu=i(896),tA=i(17921),tg=i(1462),tm=i(70564);let tf=(0,th.ot)(),tb=e=>{let{data:t}=(0,p.do)({abi:tg.H,address:tf,chainId:g.a_.BSC,functionName:"cakePerBlockToBurn",enabled:e,select:e=>{let t=(0,tm.d)(e);return new tA.Z(40).minus(t).toNumber()}});return t};var tC=i(67777);let tw=(0,d.ZP)(m.Z).withConfig({componentId:"sc-f9a97203-0"})`
  flex-direction: column;
  ${e=>{let{noMobileBorder:t,theme:i}=e;return t?`${i.mediaQueries.md} {
           padding: 0 16px;
           border-left: 1px ${i.colors.inputSecondary} solid;
         }
       `:`border-left: 1px ${i.colors.inputSecondary} solid;
         padding: 0 8px;
         ${i.mediaQueries.sm} {
           padding: 0 16px;
         }
       `}}

  ${e=>{let{noDesktopBorder:t,theme:i}=e;return t&&`${i.mediaQueries.md} {
           padding: 0;
           border-left: none;
         }
       `}}
`,tB=d.ZP.div.withConfig({componentId:"sc-f9a97203-1"})`
  display: grid;
  grid-gap: 16px 8px;
  margin-top: 24px;
  grid-template-columns: repeat(2, auto);
  grid-template-areas:
    'a d'
    'b e'
    'c f';

  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    grid-gap: 16px;
  }

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    grid-template-areas:
      'a b c'
      'd e f';
    grid-gap: 32px;
    grid-template-columns: repeat(3, auto);
  }
`,tZ=(0,th.O9)(),tj=()=>{let{t:e}=(0,u.Z)(),{observerRef:t,isIntersecting:i}=(0,eA.S1)(),[n,r]=(0,eh.useState)(!1),l=tb(n),{data:{cakeSupply:s,burnedBalance:d,circulatingSupply:c}={cakeSupply:0,burnedBalance:0,circulatingSupply:0}}=(0,o.ZP)(n?["cakeDataRow"]:null,async()=>{let[e,t,i]=await (0,tu.z2)({chainId:g.a_.BSC}).multicall({contracts:[{abi:tC.em,address:tp.ds.cake.address,functionName:"totalSupply"},{abi:tC.em,address:tp.ds.cake.address,functionName:"balanceOf",args:["0x000000000000000000000000000000000000dEaD"]},{abi:tx.d,address:tZ,functionName:"totalLockedAmount"}],allowFailure:!1}),n=0x86f9f3e50c0f8ffd4800n+t,r=e-(n+i);return{cakeSupply:e&&t?+(0,$.Zr)(e-n):0,burnedBalance:t?+(0,$.Zr)(n):0,circulatingSupply:r?+(0,$.Zr)(r):0}},{refreshInterval:eb.KI}),p=(0,ej.Nj)(),x=p.times(c),h=(0,$.uI)(x.toNumber());return(0,eh.useEffect)(()=>{i&&r(!0)},[i]),(0,a.jsxs)(tB,{children:[(0,a.jsxs)(m.Z,{flexDirection:"column",style:{gridArea:"a"},children:[(0,a.jsx)(G.Z,{color:"textSubtle",children:e("Circulating Supply")}),c?(0,a.jsx)(eZ.Z,{decimals:0,lineHeight:"1.1",fontSize:"24px",bold:!0,value:c}):(0,a.jsx)(X.Z,{height:24,width:126,my:"4px"})]}),(0,a.jsxs)(tw,{noMobileBorder:!0,style:{gridArea:"b"},children:[(0,a.jsx)(G.Z,{color:"textSubtle",children:e("Total supply")}),s?(0,a.jsx)(eZ.Z,{decimals:0,lineHeight:"1.1",fontSize:"24px",bold:!0,value:s}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{ref:t}),(0,a.jsx)(X.Z,{height:24,width:126,my:"4px"})]})]}),(0,a.jsxs)(tw,{noMobileBorder:!0,style:{gridArea:"c"},children:[(0,a.jsx)(G.Z,{color:"textSubtle",children:e("Max Supply")}),(0,a.jsx)(eZ.Z,{decimals:0,lineHeight:"1.1",fontSize:"24px",bold:!0,value:75e7})]}),(0,a.jsxs)(tw,{noDesktopBorder:!0,style:{gridArea:"d"},children:[(0,a.jsx)(G.Z,{color:"textSubtle",children:e("Market cap")}),(null==x?void 0:x.gt(0))&&h?(0,a.jsx)(f.Z,{scale:"lg",children:e("$%marketCap%",{marketCap:h})}):(0,a.jsx)(X.Z,{height:24,width:126,my:"4px"})]}),(0,a.jsxs)(tw,{style:{gridArea:"e"},children:[(0,a.jsx)(G.Z,{color:"textSubtle",children:e("Burned to date")}),d?(0,a.jsx)(eZ.Z,{decimals:0,lineHeight:"1.1",fontSize:"24px",bold:!0,value:d}):(0,a.jsx)(X.Z,{height:24,width:126,my:"4px"})]}),(0,a.jsxs)(tw,{style:{gridArea:"f"},children:[(0,a.jsx)(G.Z,{color:"textSubtle",children:e("Current emissions")}),l?(0,a.jsx)(f.Z,{scale:"lg",children:e("%cakeEmissions%/block",{cakeEmissions:(0,$.uf)(l)})}):(0,a.jsx)(X.Z,{height:24,width:126,my:"4px"})]})]})},tk=d.ZP.div.withConfig({componentId:"sc-cbf3a528-0"})`
  z-index: -1;
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0px;
  top: 0px;
`,tv=d.ZP.div.attrs({className:"inner-wedge"}).withConfig({componentId:"sc-cbf3a528-1"})`
  position: absolute;
  display: flex;
  width: 100%;
  ${e=>{let{top:t}=e;return t?"top: 0px":"bottom: 0px"}};

  svg {
    fill: ${e=>{let{theme:t}=e;return t.colors.background}};
    width: ${e=>{let{width:t}=e;return t||"100%"}};
    height: 100%;
    max-height: 48px;
  }
`,tE=e=>(0,a.jsx)(te.Z,{viewBox:"0 0 1660 48",...e,preserveAspectRatio:"none",children:(0,a.jsx)("path",{d:"M1660 48C1139.02 46.1887 336.256 15.2453 0 0H1660V48Z"})}),tS=e=>(0,a.jsx)(te.Z,{viewBox:"0 0 1660 48",...e,preserveAspectRatio:"none",children:(0,a.jsx)("path",{d:"M-346 48C174.985 46.1887 977.744 15.2453 1314 0H-346V48Z"})});var ty=i(40968),tL=i(82955),tD=i(34898),tF=i(86066),tM=i(22459),tI=i(40732),tU=i(37203),tV=i(78834),tP=i(51773),tz=i(90138),tT=i(85990),tQ=i(35645),tR=i(43694),tW=i(35364);let tH=()=>{let{account:e,chainId:t}=(0,tT.Z)(),{data:i}=(0,ej.f5)(),{proxyAddress:n,isLoading:r}=(0,tR.A)(e,t),a=(0,tP.DE)(n),l=(0,tP.y8)(),s=(0,tP.kL)(),d=(0,tP.gp)(),{tokenIds:c}=(0,tz.OC)(null==d?void 0:d.address,e),{tokenIdResults:p}=(0,eq.md)(c),x=async(e,i,n)=>{let r=await (0,tu.z2)({chainId:t}).multicall({contracts:e.map(e=>({abi:tg.H,address:l.address,functionName:"pendingCake",args:[e.pid,i]}))}),o=n.address!==l.address&&a?await s.read.balanceOf([a.address]):null,d=o?(0,$.mW)(new tA.Z(o.toString())):0,c=e.map((e,t)=>({...e,balance:new tA.Z(r[t].result.toString())})),p=c.filter(e=>e.balance.gt(0)).map(e=>({...e,contract:n})),x=p.reduce((e,t)=>{let i=new tA.Z(t.balance);return i.eq(0)?e:e+i.div(tF.o3).toNumber()},0);return{farmsWithBalances:p,totalEarned:x+d}},{data:{farmsWithStakedBalance:h,earningsSum:u}={farmsWithStakedBalance:[],earningsSum:null}}=(0,o.ZP)(e&&i&&t&&!r?[e,"farmsWithBalance",t,i]:null,async()=>{let r=await (0,eJ.getFarmConfig)(t),o=null==r?void 0:r.filter(e=>i>e.pid),s=await x(o,e,l);if(n&&(null==o?void 0:o.length)&&(0,tQ.H)(t)){let{farmsWithProxy:e}=(0,tW.Z)(o),t=await x(e,n,a);return{farmsWithStakedBalance:[...s.farmsWithBalances,...t.farmsWithBalances],earningsSum:s.totalEarned+t.totalEarned}}return{farmsWithStakedBalance:s.farmsWithBalances,earningsSum:s.totalEarned}},{refreshInterval:eb.sR}),A=c.map((t,i)=>(null==p?void 0:p[i])>0n?{sendTx:{tokenId:t.toString(),to:e}}:null).filter(Boolean);return(0,eh.useMemo)(()=>{var e;return{farmsWithStakedBalance:[...h,...A],earningsSum:null!==(e=u+(null==p?void 0:p.reduce((e,t)=>{let i=new tA.Z(t.toString());return i.eq(0)?e:e+i.div(tF.o3).toNumber()},0)))&&void 0!==e?e:0}},[u,h,A,p])},tN=(e,t,i,n)=>{let r={earningsBusd:i.toString(),count:e},a=n("%earningsBusd% to collect",r);return e>0&&t?a=n(e>1?"%earningsBusd% to collect from %count% farms and CAKE pool":"%earningsBusd% to collect from %count% farm and CAKE pool",r):e>0?a=n(e>1?"%earningsBusd% to collect from %count% farms":"%earningsBusd% to collect from %count% farm",r):t&&(a=n("%earningsBusd% to collect from CAKE pool",r)),a},tK=(0,d.ZP)(O.Z).withConfig({componentId:"sc-d9fe2c31-0"})`
  width: 100%;
  height: fit-content;
`,tJ=(0,th.ot)(),tq=()=>{let{t:e}=(0,u.Z)(),{toastSuccess:t}=(0,ty.p)(),{fetchWithCatchTxError:i,loading:n}=(0,tM.Z)(),{farmsWithStakedBalance:r,earningsSum:o}=tH(),l=(0,ej.Nj)(),s=(0,tI.Fh)(),d=new tA.Z(o).multipliedBy(l),c=r.length,p=r.filter(e=>"pid"in e&&0!==e.pid||"sendTx"in e&&null!==e.sendTx).length,x=tN(p,c-p>0,d,e),[h,A]=x.split(d.toString()),{onHarvestAll:g}=(0,tV.n)(),f=(0,eh.useCallback)(async()=>{let n=r.filter(e=>"pid"in e),o=r.filter(e=>"sendTx"in e);for(let r=0;r<n.length;r++){let o=n[r],l=await i(()=>(0,tU.sA)(o.contract,o.pid,s,o.contract.address!==tJ?tF.ZM:void 0));(null==l?void 0:l.status)&&t(`${e("Harvested")}!`,(0,a.jsx)(tD.Y,{txHash:l.transactionHash,children:e("Your %symbol% earnings have been sent to your wallet!",{symbol:"CAKE"})}))}g(o.map(e=>e.sendTx.tokenId))},[r,g,i,s,t,e]);return(0,a.jsx)(tK,{children:(0,a.jsx)(_.Z,{children:(0,a.jsxs)(m.Z,{flexDirection:["column",null,null,"row"],justifyContent:"space-between",alignItems:"center",children:[(0,a.jsxs)(m.Z,{flexDirection:"column",alignItems:["center",null,null,"flex-start"],children:[h&&(0,a.jsx)(G.Z,{mb:"4px",color:"textSubtle",children:h}),d.isNaN()?(0,a.jsx)(X.Z,{width:96,height:24,my:"2px"}):(0,a.jsx)(eZ.Z,{decimals:d.gt(0)?2:0,fontSize:"24px",bold:!0,prefix:d.gt(0)?"~$":"$",lineHeight:"1.1",value:d.toNumber()}),(0,a.jsx)(G.Z,{mb:["16px",null,null,"0"],color:"textSubtle",children:A})]}),c<=0?(0,a.jsx)(b.Z,{to:"farms",children:(0,a.jsxs)(C.Z,{width:["100%",null,null,"auto"],variant:"secondary",children:[(0,a.jsx)(G.Z,{color:"primary",bold:!0,children:e("Start earning")}),(0,a.jsx)(eu.Z,{ml:"4px",color:"primary"})]})}):(0,a.jsx)(C.Z,{width:["100%",null,null,"auto"],id:"harvest-all",isLoading:n,endIcon:n?(0,a.jsx)(tL.Z,{spin:!0,color:"currentColor"}):null,disabled:n,onClick:f,children:(0,a.jsx)(G.Z,{color:"invertedContrast",bold:!0,children:n?e("Harvesting"):e("Harvest all")})})]})})})};var tG=i(55258),tX=i(72314),t$=i(94663),tY=i(26584),tO=i(93579),t_=i(82885),t0=i(1974),t1=i(20490),t2=i(33657);let t4=(0,d.ZP)(m.Z).withConfig({componentId:"sc-7d6a351f-0"})`
  align-items: center;
  display: none;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    display: flex;
  }
`,t5=(0,d.ZP)(m.Z).withConfig({componentId:"sc-7d6a351f-1"})`
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    display: none;
  }
`,t3=(0,d.ZP)(m.Z).withConfig({componentId:"sc-7d6a351f-2"})`
  height: 92px;
  width: 92px;
  background-color: ${e=>{let{theme:t}=e;return t.colors.invertedContrast}};
  border: 3px solid ${e=>{let{theme:t}=e;return t.colors.invertedContrast}};
  border-radius: ${e=>{let{theme:t}=e;return t.radii.circle}};
  box-shadow: ${e=>{let{theme:t}=e;return t.card.boxShadow}};
`,t6=(0,d.ZP)(tG.Z).withConfig({componentId:"sc-7d6a351f-3"})`
  height: 100%;
  width: 100%;
`,t8=()=>{let{profile:e,isLoading:t}=(0,tO.Un)(),{t:i}=(0,u.Z)(),{address:n}=(0,p.mA)(),{isMobile:r,isTablet:o,isDesktop:l}=(0,en.Z)(),{domainName:s,isLoading:d,avatar:c}=(0,t2.t)(n),{usernameWithVisibility:x,userUsernameVisibility:h,setUserUsernameVisibility:A}=(0,t1.Z)(null==e?void 0:e.username),g=()=>{A(!h)},b=h?tX.Z:t$.Z;return(0,a.jsxs)(a.Fragment,{children:[(o||l)&&(0,a.jsxs)(t4,{children:[(0,a.jsx)(k.ZP,{mr:"24px",children:(0,a.jsx)(t3,{children:e?(0,a.jsx)(t_.Z,{profile:e}):c?(0,a.jsx)(tY.Z,{src:c,width:32,height:32,mr:"16px"}):(0,a.jsx)(t6,{})})}),(0,a.jsxs)(m.Z,{flexDirection:"column",children:[e?(0,a.jsxs)(f.Z,{scale:"xl",children:[i("Hi, %userName%!",{userName:x}),(0,a.jsx)(b,{ml:"4px",onClick:g,cursor:"pointer"})]}):t?(0,a.jsx)(X.Z,{width:200,height:40,my:"4px"}):null,d||t||!n?(0,a.jsx)(X.Z,{width:160,height:16,my:"4px"}):e&&h||!e&&n?(0,a.jsx)(G.Z,{fontSize:"16px",children:i("Connected with %address%",{address:s||(0,t0.Z)(n)})}):null]})]}),r&&(0,a.jsx)(t5,{children:e?(0,a.jsxs)(f.Z,{mb:"18px",textAlign:"center",children:[i("Hi, %userName%!",{userName:x}),(0,a.jsx)(b,{ml:"4px",onClick:g,cursor:"pointer"})]}):t?(0,a.jsx)(X.Z,{width:120,height:20,mt:"2px",mb:"18px"}):null})]})},t7=(0,d.ZP)(k.ZP).withConfig({componentId:"sc-5a24e908-0"})`
  border-bottom: 1px ${e=>{let{theme:t}=e;return t.colors.secondary}} solid;
  border-left: 1px ${e=>{let{theme:t}=e;return t.colors.secondary}} solid;
  border-right: 1px ${e=>{let{theme:t}=e;return t.colors.secondary}} solid;
  border-radius: ${e=>{let{theme:t}=e;return`0 0 ${t.radii.card} ${t.radii.card}`}};
  background: ${e=>{let{theme:t}=e;return t.isDark?"linear-gradient(360deg, rgba(49, 61, 92, 0.9) 0%, rgba(61, 42, 84, 0.9) 100%)":"linear-gradient(180deg, rgba(202, 194, 236, 0.9) 0%,  rgba(204, 220, 239, 0.9) 51.04%, rgba(206, 236, 243, 0.9) 100%)"}};
`,t9=()=>(0,a.jsx)(t7,{p:["16px",null,null,"24px"],children:(0,a.jsxs)(m.Z,{alignItems:"center",justifyContent:"center",flexDirection:["column",null,null,"row"],children:[(0,a.jsx)(m.Z,{flex:"1",mr:[null,null,null,"32px"],children:(0,a.jsx)(t8,{})}),(0,a.jsx)(m.Z,{flex:"1",width:["100%",null,"auto"],children:(0,a.jsx)(tq,{})})]})});var ie=i(57571),it=i(34651),ii=i(27276);i(40784),i(5221),i(5971);var ir=i(2167),ia=i(74137),io=i.n(ia),il=i(97897);let{ETHBunny:is,ETHXPancakeSwap:id}={ETHBunny:`${j.EW}/web/banners/ETHBunny.png`,ETHXPancakeSwap:`${j.EW}/web/banners/ethXpancakeswap.png`},ic=d.ZP.div.withConfig({componentId:"sc-538be968-0"})`
  position: absolute;
  right: 0;
  bottom: -10px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    right: 1px;
    bottom: -18px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    right: 0px;
    bottom: -21px;
  }
`,ip=d.ZP.div.withConfig({componentId:"sc-538be968-1"})`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 110%;
  color: #ffffff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin-bottom: 21px;
  margin-top: 16px;

  @media screen and (max-width: 375px) {
    font-size: 21px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 35px;
    margin-top: 10px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 40px;
  }
`,ix=()=>{let{t:e}=(0,u.Z)(),{isMobile:t}=(0,en.Z)();return(0,a.jsx)(il.im,{style:{background:"linear-gradient(128.04deg, #BBD3FB -23.79%, #4B3CFF 121.4%)",overflow:t?"hidden":"visible"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsx)(k.ZP,{marginTop:"3px",children:(0,a.jsx)(Z(),{src:id,alt:"eth pancake",width:119,height:18,unoptimized:!0})}),(0,a.jsx)(ip,{children:e("gm eth teams")}),(0,a.jsxs)(C.Z,{minHeight:"48px",onClick:()=>null==window?void 0:window.open("https://docs.pancakeswap.finance/ethereum-expansion","_blank","noopener noreferrer"),children:[(0,a.jsxs)(G.Z,{color:"invertedContrast",bold:!0,fontSize:"16px",mr:"4px",children:["\uD83D\uDC4B ",e("Get in Touch")]}),(0,a.jsx)(es.Z,{color:"invertedContrast"})]})]}),(0,a.jsx)(ic,{children:(0,a.jsx)(Z(),{src:is,alt:"ethImage",width:t?1100:930,height:t?250:231,unoptimized:!0})})]})})};var ih=i(34927);let iu=d.ZP.div.withConfig({componentId:"sc-b48fc70c-0"})`
  position: absolute;
  right: 0;
  bottom: -7px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    bottom: 0px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    bottom: 9px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    bottom: -30px;
  }
`,iA=(0,d.ZP)(il.wh).withConfig({componentId:"sc-b48fc70c-1"})`
  font-size: 20px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 40px;
  }
`,ig=(0,d.ZP)(il.EZ).withConfig({componentId:"sc-b48fc70c-2"})`
  font-size: 16px;
  margin: 10px 0 0 4px;
  align-self: center;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 24px;
  }
`,im=()=>{let{t:e}=(0,u.Z)(),{isDesktop:t,isMobile:i}=(0,en.Z)();return(0,a.jsx)(il.im,{children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsxs)(m.Z,{children:[(0,a.jsx)(Z(),{src:ih.qM,alt:"ModLogo",width:i?68:112,height:i?18:33}),(0,a.jsx)(ig,{children:e("Trading Competition")})]}),(0,a.jsx)(iA,{width:["150px","150px","auto"],children:e("$120,000 in Prizes!")}),(0,a.jsx)(b.Z,{to:"/competition",children:(0,a.jsxs)(C.Z,{children:[(0,a.jsx)(G.Z,{color:"invertedContrast",bold:!0,fontSize:"16px",mr:"4px",children:e("Trade Now")}),(0,a.jsx)(eu.Z,{color:"invertedContrast"})]})})]}),(0,a.jsx)(iu,{children:t?(0,a.jsx)(Z(),{src:ih.yC,alt:"CompetitionBanner",width:632,height:338,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.HN,alt:"CompetitionBanner",width:206,height:201,placeholder:"blur"})})]})})};var ib=(0,eh.memo)(im),iC=i(31071),iw=i(74057),iB=i(71730);let iZ=d.F4`
	0% {transform:translateX(-100%);}
  20% {transform:translateX(100%);}
	100% {transform:translateX(100%);}
`,ij=d.ZP.div.withConfig({componentId:"sc-df2bb235-0"})`
  position: absolute;
  right: 1px;
  bottom: 18px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    bottom: -3px;
    right: 0;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    bottom: 9px;
    right: 67px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    bottom: -3px;
    right: 67px;
  }
  z-index: 0;
`,ik=d.ZP.div.withConfig({componentId:"sc-df2bb235-1"})`
  position: absolute;
  background-image: ${e=>{let{src:t}=e;return`url("${t}")`}};
  background-size: cover;
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  bottom: 35px;
  right: 95px;
  overflow: hidden;
  border-radius: 50%;
  z-index: 2;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    width: 60px;
    height: 60px;
    bottom: 25px;
    right: 196px;
    z-index: 2;
  }
  &::after {
    content: '';
    top: 0;
    transform: translateX(100%);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    animation: ${iZ} 5s infinite 1s;
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(128, 186, 232, 0) 99%,
      rgba(125, 185, 232, 0) 100%
    );
  }
`,iv=()=>{var e,t,i;let{t:n}=(0,u.Z)(),r=(0,eh.useRef)(null),o=(0,iw.Mm)(g.a_.BSC),l=(0,iC.A)(),s=null!==(e=null==l?void 0:l.name)&&void 0!==e?e:"XXX",d=!!(o&&l&&l.endBlock>o),c=d?(0,iB.l)(Number(o),l.startBlock,l.endBlock):null,{isMobile:p}=(0,en.Z)();return(0,eh.useEffect)(()=>{r.current&&(p?(r.current.offsetHeight>36||r.current.offsetWidth>335)&&(r.current.style.fontSize="20px"):r.current.style.fontSize="")},[p]),d&&c?(0,a.jsx)(il.im,{children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsx)(il.EZ,{children:n("live"===c?"Live":"Soon")}),(0,a.jsxs)(il.wh,{scale:"xl",ref:r,children:[s," ",n("IFO")]}),(0,a.jsx)(b.Z,{to:"/ifo",children:(0,a.jsxs)(C.Z,{children:[(0,a.jsx)(G.Z,{color:"invertedContrast",bold:!0,fontSize:"16px",mr:"4px",children:n("Go to IFO")}),(0,a.jsx)(eu.Z,{color:"invertedContrast"})]})})]}),(0,a.jsxs)(ij,{children:[(0,a.jsx)(ik,{src:`/images/tokens/${l.token.address}.png`,onError:e=>{e.target.style.display="none"}}),p?(0,a.jsx)(Z(),{src:ih.MV,alt:`IFO ${null!==(i=null==l?void 0:l.id)&&void 0!==i?i:"XXX"}`,width:150,height:150,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.r_,alt:`IFO ${null!==(t=null==l?void 0:l.id)&&void 0!==t?t:"XXX"}`,width:291,height:211,placeholder:"blur"})]})]})}):null};var iE=(0,eh.memo)(iv),iS=i(53452);let{v3LaunchBg:iy,v3LaunchBgMobile:iL,v3LaunchBunny:iD,v3LaunchBunnyMobile:iF,v3LaunchBnb:iM,v3LaunchEth:iI,v3LaunchFlag:iU}={v3LaunchBg:`${j.EW}/web/banners/v3LaunchBg.png`,v3LaunchBgMobile:`${j.EW}/web/banners/v3LaunchBgMobile.png`,v3LaunchBunny:`${j.EW}/web/banners/v3LaunchBunny.png`,v3LaunchBunnyMobile:`${j.EW}/web/banners/v3LaunchBunnyMobile.png`,v3LaunchBnb:`${j.EW}/web/banners/v3LaunchBnb.png`,v3LaunchEth:`${j.EW}/web/banners/v3LaunchEth.png`,v3LaunchFlag:`${j.EW}/web/banners/v3LaunchFlag.png`},iV=d.F4`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, 5px);
  }
  to {
    transform: translate(0, 0px);
  }
`,iP=d.F4`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(0px, 10px);
  }
  to {
    transform: translate(0, 0px);
  }
`,iz=d.F4`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(2px, 2px);
  }
  to {
    transform: translate(0, 0px);
  }
`,iT=(0,d.ZP)(m.Z).withConfig({componentId:"sc-88a5c967-0"})`
  flex-direction: column-reverse;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    flex-direction: column;
  }
`,iQ=d.ZP.div.withConfig({componentId:"sc-88a5c967-1"})`
  position: relative;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 98%;
  letter-spacing: 0.01em;
  font-feature-settings: 'liga' off;
  background: linear-gradient(166.02deg, #ffb237 -5.1%, #ffeb37 75.24%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-right: 100px;
  margin-bottom: 10px;
  &::after {
    letter-spacing: 0.01em;
    font-feature-settings: 'liga' off;
    background: linear-gradient(166.02deg, #ffb237 -5.1%, #ffeb37 75.24%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding-right: 100px;
    content: attr(data-text);
    text-shadow: 1.27551px 1.27551px 1.02041px rgba(0, 0, 0, 0.2);
    -webkit-text-stroke: 8px rgba(101, 50, 205, 1);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 40px;
    padding-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    &::after {
      padding-right: 0px;
    }
  }
`,iR=d.ZP.div.withConfig({componentId:"sc-88a5c967-2"})`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  z-index: 1;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    right: 1px;
    bottom: -18px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    right: 0px;
    bottom: -2px;
  }
  overflow: visible;
  > span:first-child {
    // v3LaunchBg
    position: absolute !important;
    right: 0px;
    bottom: 0;
    overflow: hidden;
    z-index: 2;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: 0px;
    }
  }
  > span:nth-child(2) {
    // v3LaunchBunny
    position: absolute !important;
    top: -20px;
    right: -24px;
    z-index: 3;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: -31px;
      right: 153px;
    }
    ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
      display: block !important;
    }
  }
  > span:nth-child(3) {
    // v3LaunchBnb
    position: absolute !important;
    top: 0px;
    z-index: 3;
    right: 0px;
    animation: ${iV} 12.5s ease-in-out infinite;
  }
  > span:nth-child(4) {
    // v3LaunchEth
    display: none !important;
    position: absolute !important;
    z-index: 3;
    top: 0px;
    right: 423px;
    animation: ${iP} 10.5s ease-in-out infinite 1.5s;
    ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
      display: block !important;
    }
  }
  > span:nth-child(5) {
    // v3LaunchEth
    position: absolute !important;
    z-index: 1;
    top: 0px;
    right: 72px;
    animation: ${iz} 5.5s ease-in-out infinite 1.5s;
  }
`,iW=(0,d.ZP)(m.Z).withConfig({componentId:"sc-88a5c967-3"})`
  margin-top: -20px;
  margin-bottom: 10px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    margin-top: 10px;
    margin-bottom: 8px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    margin-top: 10px;
  }
`,iH=d.ZP.div.withConfig({componentId:"sc-88a5c967-4"})`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 110%;
  color: #ffffff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin-top: 0px;
  padding-right: 80px;

  @media screen and (max-width: 375px) {
    font-size: 16px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 24px;
    padding-right: 240px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 24px;
    padding-right: 0px;
  }
`,iN=d.iv`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 4px 8px;
  border-radius: 16px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    border-radius: 16px;
  }
`,iK=(0,d.ZP)(C.Z).withConfig({componentId:"sc-88a5c967-5"})`
  ${iN}
  margin-top: 10px;
`,iJ=()=>{let{t:e}=(0,u.Z)(),{isMobile:t}=(0,en.Z)();return(0,a.jsx)(il.im,{style:{background:"linear-gradient(239.62deg, rgba(49, 78, 119, 0.35) 15.52%, rgba(60, 46, 87, 0.35) 86.5%), linear-gradient(114.79deg, #C040FC -17.76%, #4B3CFF 99.88%)"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{style:{zIndex:2},children:[(0,a.jsxs)(iT,{children:[(0,a.jsx)(iQ,{"data-text":e("Ev3ryone's Favourite D3X"),children:e("Ev3ryone's Favourite D3X")}),(0,a.jsxs)(iW,{alignItems:"center",style:{gap:5},children:[(0,a.jsx)(iS.Z,{})," ",(0,a.jsx)(iH,{children:e("PancakeSwap v3 is live!")})]})]}),(0,a.jsx)(b.Z,{target:"_blank",to:"https://blog.pancakeswap.finance/articles/introducing-pancake-swap-v3-a-more-efficient-and-user-friendly-dex-on-bnb-chain-and-ethereum",rel:'"noopener noreferrer',children:(0,a.jsxs)(iK,{scale:t?"sm":"md",children:[(0,a.jsx)(G.Z,{bold:!0,fontSize:"16px",mr:"4px",color:"invertedContrast",children:e("Discover V3")}),(0,a.jsx)(es.Z,{color:"invertedContrast"})]})})]}),(0,a.jsxs)(iR,{children:[t?(0,a.jsx)(Z(),{src:iL,alt:"v3LaunchBgMobile",width:232,height:192,unoptimized:!0}):(0,a.jsx)(Z(),{src:iy,alt:"v3LaunchBg",width:595,height:192,unoptimized:!0}),t?(0,a.jsx)(Z(),{src:iF,alt:"v3LaunchBunnyMobile",width:176,height:201,unoptimized:!0}):(0,a.jsx)(Z(),{src:iD,alt:"v3LaunchBunny",width:221,height:254,unoptimized:!0}),!t&&(0,a.jsx)(Z(),{src:iM,alt:"v3LaunchBnb",width:204,height:123,unoptimized:!0}),!t&&(0,a.jsx)(Z(),{src:iI,alt:"v3LaunchEth",width:208,height:172,unoptimized:!0}),!t&&(0,a.jsx)(Z(),{src:iU,alt:"v3LaunchFlag",width:150,height:180,unoptimized:!0})]})]})})};var iq=i(73208),iG=i(96547),iX=i(44701),i$=i(72345);let iY=d.ZP.div.withConfig({componentId:"sc-f6438e03-0"})`
  position: absolute;
  min-height: 100%;
  right: 0;
  bottom: 0px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    bottom: 8.2px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    bottom: 9px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    bottom: -2px;
  }
`,iO=(0,d.ZP)(il.wh).withConfig({componentId:"sc-f6438e03-1"})`
  font-size: 20px;
  min-height: 44px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 40px;
    min-height: auto;
  }
`,i_=()=>{let{t:e,currentLanguage:{code:t}}=(0,u.Z)(),{isDesktop:i,isMobile:n}=(0,en.Z)(),{isDark:r}=(0,d.Fg)(),{chainId:o}=(0,A.g)(),l=(0,eh.useMemo)(()=>(0,i$.e)({chainId:o,languageCode:t,isDark:r}),[o,t,r]),s=(0,eh.useRef)(null),[c]=(0,iq.Z)((0,a.jsx)(iG.Z,{title:e("PancakeSwap Perpetuals"),id:iX.X.PERPETUALS}),!1,!1,"usCitizenConfirmModal"),[p]=(0,iX.M)(iX.X.PERPETUALS);return(0,it.Y)(()=>{let e=s.current;e&&n&&(e.style.fontSize="",e.style.lineHeight="",e.offsetHeight>27&&(e.style.fontSize="18px",e.style.lineHeight="27px"))},[n,t]),(0,a.jsx)(il.im,{children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsx)(il.EZ,{ref:s,children:e("Perpetual Futures")}),(0,a.jsx)(iO,{width:["160px","160px","auto"],children:e("Up to 100\xd7 Leverage")}),(0,a.jsx)(el.Z,{href:l,external:!0,onClick:e=>{p||(e.stopPropagation(),e.preventDefault(),c())},children:(0,a.jsxs)(C.Z,{children:[(0,a.jsx)(G.Z,{color:"invertedContrast",bold:!0,fontSize:"16px",mr:"4px",children:e("Trade Now")}),(0,a.jsx)(eu.Z,{color:"invertedContrast"})]})})]}),(0,a.jsx)(iY,{children:i?(0,a.jsx)(Z(),{src:ih.gX,alt:"PerpetualBanner",width:392,height:232,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.VF,alt:"PerpetualBanner",width:208,height:208,placeholder:"blur"})})]})})};var i0=(0,eh.memo)(i_);let{liquidStakingBunny:i1,liquidStakingBunnyBg1:i2,liquidStakingBunnyBg2:i4,liquidStakingBunnyBg2Mobile:i5,liquidStakingBunnyBg3:i3,liquidStakingBunnyBg4:i6,liquidStakingBunnyMobile:i8,liquidStakingTitle:i7,liquidStakingTitleMobile:i9}={liquidStakingBunny:`${j.EW}/web/banners/liquidStakingBunny.png`,liquidStakingBunnyBg1:`${j.EW}/web/banners/liquidStakingBunnyBg1.png`,liquidStakingBunnyBg2:`${j.EW}/web/banners/liquidStakingBunnyBg2.png`,liquidStakingBunnyBg2Mobile:`${j.EW}/web/banners/liquidStakingBunnyBg2Mobile.png`,liquidStakingBunnyBg3:`${j.EW}/web/banners/liquidStakingBunnyBg3.png`,liquidStakingBunnyBg4:`${j.EW}/web/banners/liquidStakingBunnyBg4.png`,liquidStakingBunnyMobile:`${j.EW}/web/banners/liquidStakingBunnyMobile.png`,liquidStakingTitle:`${j.EW}/web/banners/liquidStakingTitle.png`,liquidStakingTitleMobile:`${j.EW}/web/banners/liquidStakingTitleMobile.png`},ne=d.F4`
  from {
    opacity: 0.9;
  }
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`,nt=d.ZP.div.withConfig({componentId:"sc-ae40c6db-0"})`
  position: absolute;
  min-height: 100%;
  width: 100%;
  right: 0;
  bottom: -2px;
  z-index: 1;
  > span:first-child {
    // liquidStakingBunny
    position: absolute !important;
    bottom: -10px;
    right: -3px;
    z-index: 2;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      right: 26px;
      bottom: 2px;
    }
  }
  > span:nth-child(2) {
    // liquidStakingBunnyBg1
    position: absolute !important;
    top: -1px;
    right: 100px;
    z-index: 1;
    filter: blur(2px);
    ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
      top: -2px;
      right: 390px;
      filter: blur(0px);
    }
  }
  > span:nth-child(3) {
    // liquidStakingBunnyBg2
    position: absolute !important;
    bottom: 0px;
    right: 100px;
    z-index: 1;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      bottom: 2px;
      right: 0px;
      border-bottom-right-radius: 32px;
      overflow: hidden;
    }
  }
  > span:nth-child(4) {
    // liquidStakingBunnyBg3
    position: absolute !important;
    bottom: 138px;
    right: 78px;
    z-index: 1;
    animation: ${ne} 3s ease-in-out infinite 0.5s;
    ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
      bottom: 78px;
      right: 392px;
    }
  }
  > span:nth-child(5) {
    // liquidStakingBunnyBg4
    position: absolute !important;
    bottom: 29px;
    right: 26px;
    z-index: 1;
    animation: ${ne} 3s ease-in-out infinite 1.2s;
    ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
      bottom: 118px;
      right: 498px;
    }
  }
`,ni=d.ZP.div.withConfig({componentId:"sc-ae40c6db-1"})`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 101%;
  font-feature-settings: 'liga' off;
  color: #280d5f;
  margin: 5px 0px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 24px;
  }
`,nn=d.ZP.div.withConfig({componentId:"sc-ae40c6db-2"})`
  padding-right: 100px;
  position: relative;
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 98%;
  letter-spacing: 0.01em;
  font-feature-settings: 'liga' off;
  background: linear-gradient(166.02deg, #ffb237 -5.1%, #ffeb37 75.24%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-left: 3px;
  &::after {
    letter-spacing: 0.01em;
    background: linear-gradient(166.02deg, #ffb237 -5.1%, #ffeb37 75.24%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    content: attr(data-text);
    text-shadow: 1.27551px 1.27551px 1.02041px rgba(0, 0, 0, 0.2);
    -webkit-text-stroke: 5px #7645d9;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    padding-right: 100px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 24px;
    padding-left: 0px;
    margin-bottom: 10px;
    &::after {
      padding-right: 0px;
    }
  }
`,nr=(0,d.ZP)(C.Z).withConfig({componentId:"sc-ae40c6db-3"})`
  margin-top: 10px;
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 8px;
  height: auto;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    border-radius: 16px;
    height: 48px;
    padding: 4px 8px;
  }
`,na=()=>{let{t:e}=(0,u.Z)(),{isMobile:t,isDesktop:i}=(0,en.Z)();return(0,a.jsx)(il.im,{style:{background:"linear-gradient(189.57deg, #E8FAFE -83.55%, #B6E4FF -40.3%, #CCC2FE 123.53%, #C6A3FF 176.26%)"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{position:"relative",style:{zIndex:2},children:[(0,a.jsx)(k.ZP,{height:t?"20px":"29px",mt:t?"-10px":"0px",children:t?(0,a.jsx)(Z(),{src:i9,alt:"liquidStakingTitleMobile",width:212,height:20,unoptimized:!0}):(0,a.jsx)(Z(),{src:i7,alt:"liquidStakingTitle",width:403,height:29,unoptimized:!0})}),(0,a.jsx)(ni,{children:e(t?"WBETH Liquid Staking":"Liquid Staking Integration for WBETH:")}),(0,a.jsx)(nn,{"data-text":e(t?"Stake ETH Receive WBETH":"ETH to WBETH conversion and earn ETH staking rewards!"),children:e(t?"Stake ETH Receive WBETH":"ETH to WBETH conversion and earn ETH staking rewards!")}),(0,a.jsxs)(m.Z,{style:{gap:t?4:16},children:[(0,a.jsx)(el.Z,{href:"/liquid-staking",children:(0,a.jsxs)(nr,{scale:t?"sm":"md",children:[(0,a.jsx)(G.Z,{color:"invertedContrast",textTransform:t?"uppercase":"capitalize",bold:!0,fontSize:t?"12px":"16px",mr:"4px",children:e("Get Started")}),!t&&(0,a.jsx)(eu.Z,{color:"invertedContrast"})]})}),(0,a.jsx)(el.Z,{href:"https://blog.pancakeswap.finance/articles/liquid-staking-integration-with-binance-earn-stake-eth-and-receive-wbeth-to-earn-eth-staking-rewards",external:!0,style:{textDecoration:"none"},children:(0,a.jsx)(nr,{variant:"tertiary",style:{background:"white"},scale:t?"sm":"md",children:(0,a.jsx)(G.Z,{color:"primary",bold:!0,fontSize:t?"12px":"16px",textTransform:t?"uppercase":"capitalize",mr:"4px",children:e("Learn More")})})})]})]}),(0,a.jsxs)(nt,{children:[i?(0,a.jsx)(Z(),{src:i1,alt:"liquidStakingBunny",width:334,height:222,unoptimized:!0}):(0,a.jsx)(Z(),{src:i8,alt:"liquidStakingBunnyMobile",width:159,height:197,unoptimized:!0}),i?(0,a.jsx)(Z(),{src:i2,alt:"liquidStakingBunnyBg1",width:140,height:57,unoptimized:!0}):(0,a.jsx)(Z(),{src:i2,alt:"liquidStakingBunnyBg1Mobile",width:90,height:37,unoptimized:!0}),i?(0,a.jsx)(Z(),{src:i4,alt:"liquidStakingBunnyBg2",width:61,height:78,unoptimized:!0}):(0,a.jsx)(Z(),{src:i5,alt:"liquidStakingBunnyBg2Mobile",width:57,height:57,unoptimized:!0}),(0,a.jsx)(Z(),{src:i3,alt:"liquidStakingBunnyBg3",width:33,height:31,unoptimized:!0}),(0,a.jsx)(Z(),{src:i6,alt:"liquidStakingBunnyBg4",width:21,height:20,unoptimized:!0})]})]})})};var no=(0,eh.memo)(na);let{pancakeProtectorBunny:nl,pancakeProtectorBgMobile:ns,pancakeProtectorBg:nd,pancakeSwapLogo:nc}={pancakeSwapLogo:`${j.EW}/web/banners/ethXpancakeswap.png`,pancakeProtectorBunny:`${j.EW}/web/banners/pancakeProtectorBunny.png`,pancakeProtectorBg:`${j.EW}/web/banners/pancakeProtectorBg.png`,pancakeProtectorBgMobile:`${j.EW}/web/banners/pancakeProtectorBgMobile.png`},np=d.iv`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 800;
  line-height: 98%;
  letter-spacing: 0.01em;
  background: linear-gradient(349.27deg, #ffb237 -8.6%, #ffeb37 59.55%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
`,nx=d.ZP.div.withConfig({componentId:"sc-5f23b45a-0"})`
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  top: -2px;
  left: 0;
  overflow: hidden;
  border-radius: 32px;
  span {
    // liquidStakingBunnyBg1
    position: absolute !important;
    top: 0px;
    right: 0px;
    z-index: 1;
    max-width: none !important;
    min-width: 300px !important;
    width: 100% !important;
    height: 196px !important;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: -2px;
      right: 0;
      width: 1126px !important;
      height: 194px !important;
    }
  }
`,nh=d.ZP.div.withConfig({componentId:"sc-5f23b45a-1"})`
  position: absolute;
  min-height: 100%;
  width: 100%;
  right: 0;
  bottom: -2px;
  z-index: 1;
  > span:first-child {
    // liquidStakingBunny
    position: absolute !important;
    bottom: -7px;
    right: -3px;
    z-index: 2;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      right: 26px;
      bottom: 2px;
    }
  }
`,nu=d.ZP.div.withConfig({componentId:"sc-5f23b45a-2"})`
  ${np}
  font-size: 29px;
  margin-bottom: 8px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    margin-bottom: 10px;
  }
  word-spacing: 9999px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    word-spacing: normal;
  }
`,nA=d.ZP.div.withConfig({componentId:"sc-5f23b45a-3"})`
  ${np}
  font-size: 19px;
`,ng=(0,d.ZP)(C.Z).withConfig({componentId:"sc-5f23b45a-4"})`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 8px;
  height: auto;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    border-radius: 16px;
    height: 48px;
    padding: 4px 8px;
    font-size: 16px;
  }
`,nm=(0,d.ZP)(k.ZP).withConfig({componentId:"sc-5f23b45a-5"})`
  margin-bottom: 0px;
  margin-top: -3px;
  transform: scale(0.9);
  transform-origin: top left;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    margin-top: 0px;
    transform: scale(1);
    margin-bottom: 10px;
  }
`,nf=d.ZP.div.withConfig({componentId:"sc-5f23b45a-6"})`
  background: #ffffff;
  height: 10px;
  width: 2px;
  border-radius: 1px;
`,nb=()=>{let{t:e}=(0,u.Z)(),{isMobile:t,isDesktop:i}=(0,en.Z)();return(0,a.jsx)(il.im,{style:{background:"transparent"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{position:"relative",style:{zIndex:2},children:[(0,a.jsx)(nm,{children:(0,a.jsx)(Z(),{src:nc,alt:"pancakeSwapLogo",width:119,height:18,unoptimized:!0})}),(0,a.jsx)(nu,{children:e("Join Pancake Protectors")}),(0,a.jsx)(nA,{children:i&&e("Exclusive Perks for PancakeSwap Bunnies and Squads")}),(0,a.jsxs)(m.Z,{alignItems:"center",style:{gap:t?4:16},children:[(0,a.jsx)(el.Z,{href:"https://blog.pancakeswap.finance/articles/pancake-protectors-is-here-discover-the-power-of-cake-and-perks-for-pancake-squads-and-bunnies",style:{textDecoration:"none"},external:!0,children:(0,a.jsx)(ng,{variant:"text",scale:t?"sm":"md",style:{color:"white",paddingLeft:0},children:e("Details")})}),(0,a.jsx)(nf,{}),(0,a.jsx)(el.Z,{href:"https://protectors.pancakeswap.finance",external:!0,style:{textDecoration:"none"},children:(0,a.jsxs)(ng,{variant:"text",style:{color:"white"},scale:t?"sm":"md",children:[e("Play Now"),(0,a.jsx)(eu.Z,{color:"white"})]})})]})]}),(0,a.jsxs)(nh,{children:[t?(0,a.jsx)(Z(),{src:nl,alt:"pancakeProtectorBunnyMobile",width:132,height:160,unoptimized:!0}):(0,a.jsx)(Z(),{src:nl,alt:"pancakeProtectorBunny",width:193,height:232,unoptimized:!0}),(0,a.jsx)(nx,{children:t?(0,a.jsx)(Z(),{src:ns,alt:"pancakeProtectorBgMobile",width:293,height:176,unoptimized:!0}):(0,a.jsx)(Z(),{src:nd,alt:"pancakeProtectorBg",width:1126,height:192,unoptimized:!0})})]})]})})};var nC=(0,eh.memo)(nb),nw=i(38977),nB=i(4105);let nZ=()=>{let e=(0,nB.U)();return null!==e},nj=()=>{let e=(0,iw.Mm)(g.a_.BSC),t=(0,iC.A)();return!!(e&&t&&t.endBlock>e)},nk=d.F4`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, 5px);
  }
  to {
    transform: translate(0, 0px);
  }
`,nv=d.ZP.div.withConfig({componentId:"sc-c010666-0"})`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: visible;

  > span:nth-child(1) {
    // TradingRewardBunny
    position: absolute !important;
    right: 0px;
    bottom: 0px;
    ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
      right: 55px;
    }
  }

  > span:nth-child(2) {
    // TradingRewardButter
    position: absolute !important;
    top: -8%;
    right: 20%;
    animation: ${nk} 5.5s ease-in-out infinite;

    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: -12%;
      right: 14%;
    }

    ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
      top: 1%;
      right: -2%;
    }
  }

  > span:nth-child(3) {
    // TradingRewardButter2
    position: absolute !important;
    right: 28%;
    bottom: 18%;
    animation: ${nk} 2.5s ease-in-out infinite;
  }

  > span:nth-child(4) {
    // TradingRewardBg
    position: absolute !important;
    right: 0px;
    bottom: 0px;
  }

  > span:nth-child(5) {
    // TradingRewardLoveButter
    position: absolute !important;
    top: -30%;
    left: 55%;
    animation: ${nk} 3.5s ease-in-out infinite;
  }
`,nE=d.ZP.div.withConfig({componentId:"sc-c010666-1"})`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 110%;
  color: #ffffff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  padding-right: 80px;
  @media screen and (max-width: 375px) {
    font-size: 21px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 26px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 40px;
    padding-right: 0px;
  }
`,nS=(0,d.ZP)(k.ZP).withConfig({componentId:"sc-c010666-2"})`
  font-weight: 600;
  font-size: 12px;
  line-height: 110%;
  font-feature-settings: 'liga' off;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 21px;
    width: 100%;
  }
`,ny=d.iv`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    border-radius: 16px;
  }
`,nL=(0,d.ZP)(C.Z).withConfig({componentId:"sc-c010666-3"})`
  ${ny}
  > div {
    color: ${e=>{let{theme:t}=e;return t.colors.white}};
  }
`,nD=(0,d.ZP)(C.Z).withConfig({componentId:"sc-c010666-4"})`
  ${ny}
  background-color: ${e=>{let{theme:t}=e;return t.colors.white}};
  > div {
    color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  }
`,nF=()=>{let{t:e}=(0,u.Z)(),{isMobile:t,isTablet:i,isDesktop:n}=(0,en.Z)();return(0,a.jsx)(il.im,{style:{background:"linear-gradient(64.41deg, rgba(214, 126, 10, 0.26) 44.37%, rgba(255, 235, 55, 0) 102.8%), radial-gradient(55.22% 134.13% at 57.59% 0%, #F5DF8E 0%, #FCC631 33.21%, #FF9D00 79.02%)"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsx)(nS,{children:e("Trade to Earn Rewards")}),(0,a.jsx)(m.Z,{flexDirection:["column","row"],mb:["8px","8px","12px"],children:(0,a.jsx)(nE,{children:e("10% trading rebate to be earned!")})}),(0,a.jsxs)(m.Z,{style:{gap:8},flexWrap:t?"wrap":"nowrap",flexDirection:["column","row"],children:[(0,a.jsx)(b.Z,{to:"/swap?showTradingReward=true",children:(0,a.jsxs)(nL,{scale:["xs","sm","md"],children:[(0,a.jsx)(G.Z,{bold:!0,fontSize:["12px","16px"],mr:"4px",children:e("Trade Now")}),!t&&(0,a.jsx)(eu.Z,{color:"white"})]})}),(0,a.jsx)(b.Z,{target:"_blank",to:"/trading-reward",rel:'"noopener noreferrer',children:(0,a.jsxs)(nD,{scale:["xs","sm","md"],children:[(0,a.jsx)(G.Z,{bold:!0,fontSize:["12px","16px"],mr:"4px",children:e("Learn More")}),!t&&(0,a.jsx)(es.Z,{color:"primary"})]})})]})]}),(0,a.jsxs)(nv,{children:[t||i?(0,a.jsx)(Z(),{src:ih.z4,alt:"TradingRewardBunny",width:145,height:167,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.z4,alt:"TradingRewardBunny",width:220,height:249,placeholder:"blur"}),t?(0,a.jsx)(Z(),{src:ih.zK,alt:"TradingRewardButter",width:40,height:34,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.zK,alt:"TradingRewardButter",width:72,height:60,placeholder:"blur"}),n&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(Z(),{src:ih.C,alt:"TradingRewardButter2",width:70,height:60,placeholder:"blur"}),(0,a.jsx)(Z(),{src:ih.GK,alt:"TradingRewardBg",width:1112,height:192,placeholder:"blur"}),(0,a.jsx)(Z(),{src:ih.vc,alt:"TradingRewardLoveButter",width:147,height:147,placeholder:"blur"})]})]})]})})},nM=d.F4`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(-5px, 5px);
  }
  to {
    transform: translate(0, 0px);
  }
`,nI=`${j.EW}/web/banners/ethXpancakeswap.png`,nU=d.ZP.div.withConfig({componentId:"sc-d3c2d991-0"})`
  background: #ffffff;
  height: 10px;
  width: 1px;
  border-radius: 1px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    height: 16px;
  }
`,nV=d.ZP.div.withConfig({componentId:"sc-d3c2d991-1"})`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: visible;

  > span:nth-child(2) {
    // TradingRewardButter
    position: absolute !important;
    top: -15%;
    right: 3%;

    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: 5%;
      right: -7%;
    }

    ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
      top: -15%;
      right: 3%;
    }
  }

  > span:nth-child(3) {
    // TradingRewardButter2
    position: absolute !important;
    right: 0;
    top: -24%;
    animation: ${nM} 2.5s ease-in-out infinite;
    z-index: 2;

    ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
      right: 12%;
    }
  }
`,nP=d.ZP.div.withConfig({componentId:"sc-d3c2d991-2"})`
  position: relative;
  font-family: 'Kanit';
  font-style: normal;
  line-height: 98%;
  letter-spacing: 0.01em;
  font-feature-settings: 'liga' off;
  background: linear-gradient(166.02deg, #ffb237 -5.1%, #ffeb37 75.24%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 800;

  &::after {
    letter-spacing: 0.01em;
    font-feature-settings: 'liga' off;
    background: linear-gradient(0deg, #832e00, #832e00), linear-gradient(18.74deg, #ffdf37 7.81%, #ffeb37 81.03%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    content: attr(data-text);
    text-shadow: 1.27551px 1.27551px 1.02041px rgba(0, 0, 0, 0.2);
    -webkit-text-stroke: 4px #832e00;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 32px;
    margin-bottom: 4px;
  }
`,nz=d.iv`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    border-radius: 16px;
    padding: 12px 24px;
  }
`,nT=(0,d.ZP)(C.Z).withConfig({componentId:"sc-d3c2d991-3"})`
  ${nz}
  > div {
    color: ${e=>{let{theme:t}=e;return t.colors.white}};
  }
`,nQ=d.ZP.div.withConfig({componentId:"sc-d3c2d991-4"})`
  position: absolute;
  height: 100%;
  width: 100%;
  top: -2px;
  left: 0;
  overflow: hidden;
  border-radius: 32px;
  span {
    // liquidStakingBunnyBg1
    position: absolute !important;
    top: 0px;
    right: 0px;
    max-width: none !important;
    min-width: 300px !important;
    width: 100% !important;
    height: 196px !important;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: -2px;
      right: 0;
      width: 1126px !important;
      height: 194px !important;
    }
  }
`,nR=()=>{let{t:e}=(0,u.Z)(),{isMobile:t,isDesktop:i}=(0,en.Z)(),n=e(i?"Traverse the Treasure Islands on Galxe now!":"Traverse the Treasure Islands!");return(0,a.jsx)(il.im,{style:{background:"linear-gradient(130.14deg, rgba(0, 90, 225, 0.2) 15.11%, rgba(87, 221, 218, 0.2) 82.57%), linear-gradient(249.98deg, #53DEE9 32.16%, #31D0AA 91.27%), linear-gradient(117.08deg, rgba(99, 255, 254, 0.2) 11.95%, rgba(54, 210, 179, 0.2) 96.2%), linear-gradient(182.28deg, rgba(104, 220, 233, 0.8) -44.21%, rgba(104, 220, 233, 0) 87.24%)"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsxs)(m.Z,{alignItems:"center",style:{gap:t?4:12},mb:"8px",children:[(0,a.jsx)(Z(),{src:nI,alt:"pancakeSwapLogo",width:t?90:132,height:t?13:20,unoptimized:!0}),(0,a.jsx)(nU,{}),(0,a.jsx)(Z(),{src:ih.XD,alt:"galxeLogo",width:t?52:77,height:t?9:14,unoptimized:!0})]}),(0,a.jsx)(nP,{"data-text":n,children:n}),!t&&(0,a.jsx)(G.Z,{color:"#280D5F",fontSize:24,fontWeight:700,mb:"8px",children:e("Exclusive NFTs and treasures await!")}),(0,a.jsx)(m.Z,{children:(0,a.jsx)(b.Z,{target:"_blank",to:"https://blog.pancakeswap.finance/articles/join-pancake-swap-s-multichain-adventure-traverse-the-treasure-islands",children:(0,a.jsxs)(nT,{scale:["xs","sm","md"],children:[(0,a.jsx)(G.Z,{bold:!0,fontSize:["12px","16px"],mr:"4px",children:e("Get Started")}),(0,a.jsx)(es.Z,{color:"white"})]})})})]}),(0,a.jsxs)(nV,{children:[(0,a.jsx)(nQ,{children:t?(0,a.jsx)(Z(),{src:ih.VY,alt:"Background",width:338,height:176,unoptimized:!0}):(0,a.jsx)(Z(),{src:ih.vt,alt:"Background",width:1126,height:192,unoptimized:!0})}),t?(0,a.jsx)(Z(),{src:ih.D9,alt:"Cloud",width:126,height:34,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.D9,alt:"Cloud",width:208,height:57,placeholder:"blur"}),t?(0,a.jsx)(Z(),{src:ih.sO,alt:"GalxeTraverseBunny",width:157,height:102,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.sO,alt:"GalxeTraverseBunny",width:262,height:170,placeholder:"blur"})]})]})})},nW=`${j.EW}/web/banners/ethXpancakeswap.png`,nH=d.ZP.div.withConfig({componentId:"sc-ea0dddaf-0"})`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: visible;

  > span:nth-child(2) {
    // TradingRewardButter2
    position: absolute !important;
    right: 6%;
    top: -30%;
    animation: ${nM} 2.5s ease-in-out infinite;
    z-index: 2;

    ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
      right: 17%;
      top: -50%;
    }
  }
`,nN=d.ZP.div.withConfig({componentId:"sc-ea0dddaf-1"})`
  position: relative;
  font-family: 'Kanit';
  font-style: normal;
  line-height: 98%;
  letter-spacing: 0.01em;
  font-feature-settings: 'liga' off;
  background: linear-gradient(166.02deg, #ffb237 -5.1%, #ffeb37 75.24%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 16px;
  width: 196px;

  &::after {
    letter-spacing: 0.01em;
    font-feature-settings: 'liga' off;
    background: linear-gradient(0deg, #832e00, #832e00), linear-gradient(18.74deg, #ffdf37 7.81%, #ffeb37 81.03%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    content: attr(data-text);
    text-shadow: 1.27551px 1.27551px 1.02041px rgba(0, 0, 0, 0.2);
    -webkit-text-stroke: 4px #832e00;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    font-size: 32px;
    margin-bottom: 4px;
    width: 100%;
  }
`,nK=d.iv`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    border-radius: 16px;
    padding: 12px 24px;
  }
`,nJ=(0,d.ZP)(C.Z).withConfig({componentId:"sc-ea0dddaf-2"})`
  ${nK}
  > div {
    color: ${e=>{let{theme:t}=e;return t.colors.white}};
  }
`,nq=d.ZP.div.withConfig({componentId:"sc-ea0dddaf-3"})`
  position: absolute;
  height: 100%;
  width: 100%;
  top: -2px;
  left: 0;
  overflow: hidden;
  border-radius: 32px;
  span {
    // liquidStakingBunnyBg1
    position: absolute !important;
    top: 0px;
    right: 0px;
    max-width: none !important;
    min-width: 300px !important;
    width: 100% !important;
    height: 196px !important;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: -2px;
      right: 0;
      width: 1126px !important;
      height: 194px !important;
    }
  }
`,nG=()=>{let{t:e}=(0,u.Z)(),{isMobile:t,isDesktop:i}=(0,en.Z)(),n=e(i?"PancakeSwap Now Live on Polygon zkEVM!":"Polygon zkEVM is LIVE!");return(0,a.jsx)(il.im,{style:{background:"linear-gradient(180deg, #9132D2 0%, #803DE1 100%)"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsx)(m.Z,{alignItems:"center",mb:"8px",children:(0,a.jsx)(Z(),{src:nW,alt:"pancakeSwapLogo",width:t?90:132,height:t?13:20,unoptimized:!0})}),(0,a.jsx)(nN,{"data-text":n,children:n}),i&&(0,a.jsx)(G.Z,{color:"#FFE437",fontSize:24,fontWeight:700,mb:"8px",children:e("Swap, LP, and Farms on Polygon zkEVM now")}),(0,a.jsx)(m.Z,{children:(0,a.jsx)(b.Z,{target:"_blank",to:"https://blog.pancakeswap.finance/articles/pancake-swap-expands-to-polygon-zk-evm-a-new-era-of-multichain-de-fi-begins",children:(0,a.jsxs)(nJ,{scale:["xs","sm","md"],children:[(0,a.jsx)(G.Z,{bold:!0,fontSize:["12px","16px"],mr:"4px",children:e("Get Started")}),(0,a.jsx)(es.Z,{color:"white"})]})})})]}),(0,a.jsxs)(nH,{children:[(0,a.jsx)(nq,{children:t?(0,a.jsx)(Z(),{src:ih.fG,alt:"Background",width:338,height:176,unoptimized:!0}):(0,a.jsx)(Z(),{src:ih.uZ,alt:"Background",width:1126,height:192,unoptimized:!0})}),t?(0,a.jsx)(Z(),{src:ih.GX,alt:"GalxeTraverseBunny",width:173,height:138,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.GX,alt:"GalxeTraverseBunny",width:335,height:268,placeholder:"blur"})]})]})})},nX=`${j.EW}/web/banners/ethXpancakeswap.png`,n$=d.ZP.div.withConfig({componentId:"sc-40d2734d-0"})`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: visible;
  > span:nth-child(1) {
    // TradingRewardButter2
    position: absolute !important;
    right: -42px;
    bottom: -60px;

    ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
      right: -42px;
      bottom: -40px;
    }
    ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
      right: 27px;
      bottom: 0;
    }
  }

  > span:nth-child(2) {
    // TradingRewardButter2
    position: absolute !important;
    right: 230px;
    top: -10%;
  }
`,nY=d.ZP.div.withConfig({componentId:"sc-40d2734d-1"})`
  position: relative;
  font-family: 'Kanit';
  font-size: 25.526px;
  font-style: normal;
  font-weight: 800;
  line-height: 98%;
  padding-right: 80px;
  margin-bottom: 20px;
  color: ${e=>{let{theme:t}=e;return t.colors.white}};

  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    font-size: 32px;
    margin-bottom: 4px;
    width: 100%;
  }
`,nO=d.iv`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    border-radius: 16px;
    padding: 12px 24px;
  }
`,n_=d.ZP.div.withConfig({componentId:"sc-40d2734d-2"})`
  height: 15px;
  width: 1px;
  background-color: ${e=>{let{theme:t}=e;return t.colors.white}};
`,n0=(0,d.ZP)(C.Z).withConfig({componentId:"sc-40d2734d-3"})`
  ${nO}
  > div {
    color: ${e=>{let{theme:t}=e;return t.colors.white}};
  }
`,n1=()=>{let{t:e}=(0,u.Z)(),{isMobile:t,isDesktop:i}=(0,en.Z)(),n=e(i?"PancakeSwap Now Live on zkSync Era!":"Zksync Lormips LIVE!");return(0,a.jsx)(il.im,{style:{background:"linear-gradient(180deg, #CCA382 0%, #9DC38F 49.77%, #9FCCCF 100%)",overflow:i?"visible":"hidden"},children:(0,a.jsxs)(il.Nh,{children:[(0,a.jsxs)(il.Sp,{children:[(0,a.jsxs)(m.Z,{alignItems:"center",mb:"8px",style:{gap:t?10:14},children:[(0,a.jsx)(Z(),{src:nX,alt:"pancakeSwapLogo",width:t?100:132,height:t?15:20,unoptimized:!0}),(0,a.jsx)(n_,{}),(0,a.jsx)(Z(),{src:ih.pz,alt:"eraLogo",width:t?73:88,height:t?14:16})]}),(0,a.jsx)(nY,{children:n}),i&&(0,a.jsx)(G.Z,{color:"white",fontSize:20,fontWeight:700,mb:"8px",children:e("Swap and Provide Liquidity on zkSync Era Now")}),(0,a.jsx)(m.Z,{children:(0,a.jsx)(b.Z,{target:"_blank",to:"https://blog.pancakeswap.finance/articles/pancake-swap-v3-on-zk-sync-era",children:(0,a.jsxs)(n0,{scale:["xs","sm","md"],style:{borderRadius:t&&"20px"},children:[(0,a.jsx)(G.Z,{bold:!0,fontSize:["12px","16px"],mr:"4px",children:e(t?"Start Now":"Get Started")}),(0,a.jsx)(es.Z,{color:"white"})]})})})]}),(0,a.jsxs)(n$,{children:[i?(0,a.jsx)(Z(),{src:ih.gM,alt:"zkSyncBg",width:624,height:177,placeholder:"blur"}):(0,a.jsx)(Z(),{src:ih.X8,alt:"zkSyncBgMobile",width:270,height:239,placeholder:"blur"}),i&&(0,a.jsx)(Z(),{src:ih.LA,alt:"zkSyncBunny",width:201,height:203,placeholder:"blur"})]})]})})},n2=()=>{let e=nj(),t=nZ();return(0,eh.useMemo)(()=>{let i=[{shouldRender:!0,banner:(0,a.jsx)(n1,{})},{shouldRender:!0,banner:(0,a.jsx)(nG,{})},{shouldRender:!0,banner:(0,a.jsx)(nR,{})},{shouldRender:!0,banner:(0,a.jsx)(nC,{})},{shouldRender:!0,banner:(0,a.jsx)(nF,{})},{shouldRender:!0,banner:(0,a.jsx)(no,{})},{shouldRender:!0,banner:(0,a.jsx)(iJ,{})},{shouldRender:!0,banner:(0,a.jsx)(nw.Z,{})},{shouldRender:!0,banner:(0,a.jsx)(ix,{})},{shouldRender:e,banner:(0,a.jsx)(iE,{})}],n=[{shouldRender:t,banner:(0,a.jsx)(ib,{})},{shouldRender:!0,banner:(0,a.jsx)(i0,{})}];return[...i,...io()(n)].filter(e=>e.shouldRender).map(e=>e.banner)},[e,t])},n4=d.ZP.div.withConfig({componentId:"sc-3197e810-0"})`
  position: relative;
  height: 179px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    height: 221px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    height: 232px;
  }
  &::before {
    content: '';
    border-radius: 32px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: -webkit-linear-gradient(#7645d9 0%, #452a7a 100%);
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      top: 20px;
      left: 20px;
      right: 20px;
      bottom: 20px;
    }
  }
  margin-top: ${e=>{let{walletConnected:t}=e;return t?"250px":"0px"}};
  margin-bottom: ${e=>{let{walletConnected:t}=e;return t?"-220px":"0px"}};
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    margin-top: ${e=>{let{walletConnected:t}=e;return t?"190px":"-32px"}};
    margin-bottom: 30px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    margin-top: ${e=>{let{walletConnected:t}=e;return t?"90px":"-32px"}};
    margin-bottom: ${e=>{let{walletConnected:t}=e;return t?"40px":"30px"}};
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}},${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    padding-top: 0;
    margin-top: ${e=>{let{walletConnected:t}=e;return t?"60px":"-32px"}};
    margin-bottom: ${e=>{let{walletConnected:t}=e;return t?"60px":"30px"}};
  }
  .swiper-slide {
    overflow: visible;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`,n5=(0,d.ZP)(ir.tq).withConfig({componentId:"sc-3197e810-1"})`
  position: relative;
  overflow: visible;
  opacity: 0;
  animation: ${ie.Oz} 0.3s ease-in-out 0.7s forwards;
  .swiper-pagination {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    width: 108px;
    bottom: 12px;
    ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
      bottom: 35px;
    }
    ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
      bottom: 45px;
    }
    ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
      bottom: 35px;
    }
  }
  .swiper-pagination-bullet {
    background-color: white;
    flex-basis: 108px;
    margin: 0 !important;
    border-radius: 0px;
    &:first-child {
      border-radius: 4px 0px 0px 4px;
    }
    &:last-child {
      border-radius: 0px 4px 4px 0px;
    }
  }
`,n3=()=>{let e=n2(),{address:t}=(0,p.mA)(),{isDesktop:i,isTablet:n}=(0,en.Z)(),{chainId:r}=(0,A.g)(),[o,l]=(0,eh.useState)(null);return(0,it.Y)(()=>{if(o){var t,i,n,r;!(e.length>1)||(null===(t=o.autoplay)||void 0===t?void 0:t.running)?e.length<=1&&(null===(i=o.autoplay)||void 0===i?void 0:i.running)&&(null===(r=o.autoplay)||void 0===r||r.stop()):null===(n=o.autoplay)||void 0===n||n.start()}},[e,o]),(0,a.jsx)(n4,{walletConnected:!!t&&r===g.a_.BSC,children:(0,a.jsx)(n5,{onSwiper:l,modules:[ii.pt,ii.tl,ii.xW],spaceBetween:50,observer:!0,slidesPerView:1,effect:"fade",fadeEffect:{crossFade:!0},speed:500,autoplay:{delay:5e3,pauseOnMouseEnter:!0,disableOnInteraction:!1},loop:!0,pagination:{clickable:!0},children:e.map((e,t)=>{let r=`Banner${t}`;return(0,a.jsx)(ir.o5,{style:{padding:i||n?20:0},children:e},r)})})})},n6=(0,d.ZP)(c.Z).withConfig({componentId:"sc-14a24f66-0"})`
  padding-top: 16px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    padding-top: 48px;
  }
`,n8=(0,d.ZP)(h.Z).withConfig({componentId:"sc-14a24f66-1"})`
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  padding-left: 0px;
  padding-right: 0px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    padding-left: 24px;
    padding-right: 24px;
  }
`,n7=()=>{let{theme:e}=(0,x.ZP)(),{address:t}=(0,p.mA)(),{chainId:i}=(0,A.g)(),n={margin:"0",width:"100%",maxWidth:"968px"},{t:r}=(0,u.Z)();return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s(),{id:"f6b5af38acf07080",children:'#home-1 .page-bg{background:-webkit-linear-gradient(310.27deg,#e6fdff 0%,#f3efff 100%);background:-moz-linear-gradient(310.27deg,#e6fdff 0%,#f3efff 100%);background:-o-linear-gradient(310.27deg,#e6fdff 0%,#f3efff 100%);background:linear-gradient(139.73deg,#e6fdff 0%,#f3efff 100%)}[data-theme="dark"] #home-1 .page-bg{background:-webkit-radial-gradient(50%50%,103.12%50%,#21193a 0%,#191326 100%);background:-moz-radial-gradient(50%50%,103.12%50%,#21193a 0%,#191326 100%);background:-o-radial-gradient(50%50%,103.12%50%,#21193a 0%,#191326 100%);background:radial-gradient(103.12%50%at 50%50%,#21193a 0%,#191326 100%)}#home-2 .page-bg{background:-webkit-linear-gradient(top,#fff 22%,#d7caec 100%);background:-moz-linear-gradient(top,#fff 22%,#d7caec 100%);background:-o-linear-gradient(top,#fff 22%,#d7caec 100%);background:linear-gradient(180deg,#fff 22%,#d7caec 100%)}[data-theme="dark"] #home-2 .page-bg{background:-webkit-linear-gradient(top,#09070c 22%,#201335 100%);background:-moz-linear-gradient(top,#09070c 22%,#201335 100%);background:-o-linear-gradient(top,#09070c 22%,#201335 100%);background:linear-gradient(180deg,#09070c 22%,#201335 100%)}#home-3 .page-bg{background:-webkit-linear-gradient(top,#6fb6f1 0%,#eaf2f6 100%);background:-moz-linear-gradient(top,#6fb6f1 0%,#eaf2f6 100%);background:-o-linear-gradient(top,#6fb6f1 0%,#eaf2f6 100%);background:linear-gradient(180deg,#6fb6f1 0%,#eaf2f6 100%)}[data-theme="dark"] #home-3 .page-bg{background:-webkit-linear-gradient(top,#0b4576 0%,#091115 100%);background:-moz-linear-gradient(top,#0b4576 0%,#091115 100%);background:-o-linear-gradient(top,#0b4576 0%,#091115 100%);background:linear-gradient(180deg,#0b4576 0%,#091115 100%)}#home-4 .inner-wedge svg{fill:#d8cbed}[data-theme="dark"] #home-4 .inner-wedge svg{fill:#201335}'}),(0,a.jsxs)(n6,{innerProps:{style:{margin:"0",width:"100%"}},containerProps:{id:"home-1"},index:2,hasCurvedDivider:!1,children:[t&&i===g.a_.BSC&&(0,a.jsx)(n8,{children:(0,a.jsx)(t9,{})}),(0,a.jsx)(n3,{}),(0,a.jsx)(R,{})]}),(0,a.jsx)(c.Z,{innerProps:{style:{margin:"0",width:"100%"}},containerProps:{id:"home-2"},index:2,hasCurvedDivider:!1,children:(0,a.jsx)(eo,{})}),(0,a.jsxs)(c.Z,{innerProps:{style:n},background:e.colors.background,containerProps:{id:"home-4"},index:2,hasCurvedDivider:!1,children:[(0,a.jsx)(tk,{children:(0,a.jsx)(tv,{top:!0,children:(0,a.jsx)(tE,{})})}),(0,a.jsx)(ec,{...W(r)})]}),(0,a.jsxs)(c.Z,{innerProps:{style:n},background:e.colors.gradientCardHeader,index:2,hasCurvedDivider:!1,children:[(0,a.jsx)(tk,{children:(0,a.jsx)(tv,{width:"150%",top:!0,children:(0,a.jsx)(tS,{})})}),(0,a.jsx)(ec,{...H(r)}),(0,a.jsx)(e9,{})]}),(0,a.jsx)(c.Z,{innerProps:{style:n},containerProps:{id:"home-3"},index:2,hasCurvedDivider:!1,children:(0,a.jsx)(eP,{})}),(0,a.jsxs)(c.Z,{innerProps:{style:n},background:e.colors.background,index:2,hasCurvedDivider:!1,children:[(0,a.jsx)(ec,{...N(r)}),(0,a.jsx)(tj,{})]}),(0,a.jsx)(c.Z,{innerProps:{style:n},background:"linear-gradient(180deg, #7645D9 0%, #5121B1 100%)",index:2,hasCurvedDivider:!1,children:(0,a.jsx)(tc,{})})]})},n9=e=>{let{totalTx30Days:t,addressCount30Days:i,tvl:n}=e;return(0,a.jsx)(o.J$,{value:{fallback:{totalTx30Days:t,addressCount30Days:i,tvl:n}},children:(0,a.jsx)(n7,{})})};n9.chains=[];var re=!0,rt=n9},20591:function(e,t,i){"use strict";i.d(t,{yW:function(){return d}});var n=i(17921),r=i(20030),a=i(86066),o=JSON.parse('{"0x07C10ecFb0e1CF81E3e05ddb693Cc114C8EBe498":9.26,"0x0d5b9A0f4315a4bcE36D1Ea7d6B6d3123167aFAa":0.69,"0x0eD7e52944161450477ee417DE9Cd3a859b14fD0":0.86,"0x1D0F31Bf6171EdFEED3d202104ed69B04C936B02":9.69,"0x1DEC73074cE9cAbEd47D7748410277109B23Cda2":107.88,"0x269043694D070e8811c620bf95485314BCC7B4b7":1.73,"0x346575fC7f07E6994D76199E41D13dC1575322E1":1.42,"0x43b95976cF0929478bC13332C9cd2D63Bf060976":10.23,"0x43C2aBe5e3bceC619072D8668Ac83Ad825da707f":7.77,"0x4D4310f465C6db2081C3d24fA3B571cb29aBddB7":6.07,"0x50e4837Fc2eEFFD34EF78483A89c6Afb7Dd70c77":2.49,"0x54cd9d6Ce45cEF4fCc1AC568329254661B28711d":21.61,"0x58aED290F42963A502626774Bd8fa03f33c9B71f":2.53,"0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16":2.69,"0x5CF69395345614e349b2117dBC5F6cf5A500a43d":11.74,"0x70f16782010fa7dDf032A6aaCdeed05ac6B0BC85":24.85,"0x76B0d10A4540B6743aa086EA31DC48E8AB691c4d":14.31,"0x804678fa97d91B974ec2af3c843270886528a9E6":2.62,"0x9Bafeea2A8bC72b1910AB102ca5F8eCa6a67D929":1.1,"0x9e9b768174eF24233BF8AC2f4131F10ff5E72Dee":2.21,"0x9Ed9E9aA51670A3210fD6078024c21ec6c1d61d9":9.86,"0xa0D4e270D9EB4E41f7aB02337c21692D7eECCCB0":0,"0xA39Af17CE4a8eb807E076805Da1e2B8EA7D0755b":7.29,"0xA63E32FeEFC6590bBf869070Fd2e706Eb7881bd2":10.22,"0xac747ad9D61884986aD7A4A6cC5de998ce21B253":0.34,"0xAf839f4D3620a1EED00cCc21dDC01119C26a75E1":1.63,"0xC9853537DC498F4667f9E50bF2BE6aBeF9D53149":2.27,"0xe86eaAD81C32ffbb88B7ec9B325C8f75C8c9f1Ab":6.39,"0xfcc860289819c8b754ef31a1709a7952EB940223":2.24,"0x008604A38cD589680F7B8f085DC2D5B4F81151dB":0.08,"0x009C58e79779982eB53a9941F9F4a2269d093566":1.41,"0x02D75D7beebF6D5228A3Fa5f810CedF2BEa5aB1E":21.56,"0x25bfD3162360BbD8FF97b86169288b311c2A68D7":52.39,"0x3d12E4381901a6b94438758B90881cB03F10b01E":8.76,"0x3D5A3E3824da092851026fCda3D8a0B7438c4573":0.04,"0x401AbD5327542c25baD057614935BfD98186a8a1":0.82,"0x41140a1650372Fb8cb2f71e335448ab8cfc1c4f3":0.44,"0x5ca96E8bDe0Bc587DaC9e02422Fd205b1102DAa4":0.01,"0x6045931E511EF7e53A4A817F971e0CA28c758809":1.96,"0x69AFe59e88614501c3fDEb7480f12DBA0A414032":75.58,"0x70c26e9805ec5Df3d4aB0b2a3dF86BBA2231B6c1":1.06,"0x72121d60b0e2F01c0FB7FE32cA24021b42165A40":4.33,"0x74fA517715C4ec65EF01d55ad5335f90dce7CC87":1.33,"0x7618fdAb208aE23690dadD3aa4a42a442313d24E":0,"0x800946D29e40199963100d67c9265B1725F80333":7.21,"0x89c68051543Fa135B31c2CE7BD8Cdf392345FF01":0.66,"0x92c3E2cddDb0CE886bCA864151BD4d611A86E563":8.45,"0xaA2527ff1893e0D40d4a454623d362B79E8bb7F1":0.08,"0xbcfd0d4a37fEb4dceAAeFa9da28CD833E5f04e9f":133.25,"0xbe6A4f74fdDc88853612C50D7404E059b37692D8":1.4,"0xdE8a4f457af12F98DB090841579Feed384684819":10.19,"0xe68D05418A8d7969D9CA6761ad46F449629d928c":6.78,"0xe98ac95A1dB2fCaaa9c7D4ba7ecfCE4877ca2bEa":2.29,"0xe9F369298565B60a0DC19A6fA93cEE934Fd1A58c":0.94,"0xee456d906a38e10680c9d157FFf143390e9681bA":6.22,"0xEF642c40EebBc964881dD7Bd1A0b50e90441E73A":16.46,"0xF01eD80d46759c0cf6A3e9c66856017d81284962":27.72,"0xF23BAD605E94dE0e3B60c9718a43A94A5aF43915":16.81,"0xF8cA29a3BF6d34691981D3Ee8D4c9Cd1C437EfeE":1.17,"0x007EC643C7Cc33a70C083fC305c283dd009C8b94":2.03,"0x046A9B3A9b743340eE2Bc4C6dDD35543E237C6c2":7.28,"0x06043B346450BbCfdE066ebc39fdc264FdFFeD74":3.85,"0x062f88E2B4896e823ac78Ac314468c29eEC4186d":3.21,"0x0A292e96ABb35297786a38fDD67Dc4f82689E670":2.09,"0x11c0b2BB4fbB430825d07507A9E24e4c32f7704D":7.01,"0x141e9558f66Cc21c93628400cCa7d830c15c2c24":1.54,"0x1CCc3cC95c8148477Afd18a552f03835Be9D182a":0.63,"0x1Ce76390Dd210B9C9ae28373FDf79714206ECb73":3.07,"0x28BDb16b623176426305a70D8B475bE73Aca71f3":5.01,"0x2AE94A6C768D59f5DDc25bd7f12C7cBE1D51dc04":20.32,"0x2Eebe0C34da9ba65521E98CBaA7D97496d05f489":0.12,"0x365c3F921b2915a480308D0b1C04aEF7B99c2876":0.19,"0x486697ae24469cB1122F537924Aa46E705B142Aa":2.52,"0x53a63ac301D6410915385294527f947aFf616599":5.97,"0x55cdb14855220b239Cf857A03849D96736b9103f":3.14,"0x58d4B61983Ca0aFE6E352e90719F403E24e016F4":1.52,"0x6483F166b9E4310A165a55FEa04F867499aded06":8.66,"0x6dB23b5360c9D2859fDcbf41c56494e7b8573649":2.84,"0x70531B39E2Bb4d8dA59E2Ce41a98eBA2990F8497":4.53,"0x71E6de81381eFE0Aa98f56b3B43eB3727D640715":15.84,"0x88a02D94F437799f06f8c256ff07Aa397E6D0016":1.03,"0x88c9bf5E334e2591C6A866D5E20683E31226Be3d":6.41,"0x8CA3fF14A52b080C54A6d1a405eecA02959d39fE":10.6,"0x8e744Ec2795c8B836689d1b4EBE1489204357dAC":1.27,"0x936928146a21AfCcd30DfA84824A780572B1630B":1.13,"0xa0Ee789a8F581CB92dD9742ed0B5d54a0916976C":1.49,"0xB7E73DaEe6A6Ca37A21f8E4bfba4DA448DFE4d92":5.95,"0xbDF0aA1D1985Caa357A6aC6661D838DA8691c569":49.62,"0xf924E642f05ACC57fc3b14990c2B1a137683b201":1.15,"0x0ecc84c9629317a494f12Bc56aA2522475bF32e8":0.49,"0x1472976E0B97F5B2fC93f1FFF14e2b5C4447b64F":7.81,"0x16aFc4F2Ad82986bbE2a4525601F8199AB9c832D":6.84,"0x2bF2dEB40639201C9A94c9e33b4852D9AEa5fd2D":0.07,"0x2E28b9B74D6d99D4697e913b82B41ef1CAC51c6C":0.3,"0x3f1A9f3D9aaD8bD339eD4853F345d2eF89fbfE0c":8.28,"0x59FaC9e98479fc9979aE2a0C7422Af50bCBB9B26":0,"0x6a445cEB72c8B1751755386c3990055ff92e14A0":4.04,"0x7752e1FA9F3a2e860856458517008558DEb989e3":18.05,"0x89EBF9cD99864f6E51bd7a578965922029cAB977":0.46,"0x89eE0491CE55d2f7472A97602a95426216167189":1.81,"0x8FA59693458289914dB0097F5F366d771B7a7C3F":0.7,"0x92247860A03F48d5c6425c7CA35CDcFCB1013AA1":1.72,"0x9D2296e2Fe3CdBf2EB3e3e2CA8811BaFA42eeDFF":17.57,"0xac109C8025F272414fd9e2faA805a583708A017f":13.25,"0xb5D108578Be3750209d1b3A8f45FFee8C5a75146":1.09,"0xba01662E978DE7d67F8FfC937726215eb8995d17":3.22,"0xc13aA76AAc067c86aE38028019F414D731b3D86A":1.17,"0xC2d00De94795e60FB76Bc37d899170996cBdA436":1.92,"0xcAD7019D6d84a3294b0494aEF02e73BD0f2572Eb":1.52,"0xD171B26E4484402de70e3Ea256bE5A2630d7e88D":0.11,"0xddE420cbB3794ebD8FFC3Ac69F9c78e5d1411870":0.22,"0xE6b421a4408c82381b226Ab5B6F8C4b639044359":2.14,"0xE834bf723f5bDff34a5D1129F3c31Ea4787Bc76a":0.61,"0xEa26B78255Df2bBC31C1eBf60010D78670185bD0":0.43,"0xEc6557348085Aa57C72514D67070dC863C0a5A8c":0.97,"0xF3Bc6FC080ffCC30d93dF48BFA2aA14b869554bb":0.06,"0xF45cd219aEF8618A92BAa7aD848364a158a24F33":0.78,"0xFdFde3aF740A22648B9dD66D05698e5095940850":1.23,"0xFFd4B200d3C77A0B691B5562D804b3bd54294e6e":1.7,"0x014608E87AF97a054C9a49f81E1473076D51d9a3":1.78,"0x03F18135c44C64ebFdCBad8297fe5bDafdBbdd86":30.09,"0x05faf555522Fa3F93959F86B41A3808666093210":5.8,"0x133ee93FE93320e1182923E1a640912eDE17C90C":2.29,"0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE":6.18,"0x1BdCebcA3b93af70b58C41272AEa2231754B23ca":6.46,"0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1":0.5,"0x272c2CF847A49215A3A1D4bFf8760E503A06f880":0,"0x28415ff2C35b65B9E5c7de82126b4015ab9d031F":1.04,"0x3DcB1787a95D2ea0Eb7d00887704EeBF0D79bb13":4.56,"0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082":1.14,"0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489":0.34,"0x71b01eBdDD797c8E9E0b003ea2f4FD207fBF46cC":3.19,"0x74E4716E431f45807DCF19f284c7aA99F18a4fbc":1.39,"0x7EB5D86FD78f3852a3e0e064f2842d45a3dB6EA2":3.46,"0x7EFaEf62fDdCCa950418312c6C91Aef321375A00":2.01,"0x824eb9faDFb377394430d2744fa7C42916DE3eCe":2.21,"0x942b294e59a8c47a0F7F20DF105B082710F7C305":1.46,"0xACF47CBEaab5c8A6Ee99263cfE43995f89fB3206":1.76,"0xB2678C414ebC63c9CC6d1a0fC45f43E249B50fdE":1.82,"0xC5768c5371568Cf1114cddD52CAeD163A42626Ed":7.78,"0xD8E2F8b6Db204c405543953Ef6359912FE3A88d6":1.72,"0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF":1.35,"0x1c7e5a3A72b6D94DE5Ec20812E3e68713978a584":0.01765,"0xB2Aa63f363196caba3154D4187949283F085a488":0.19393,"0x92357Ab9003CA881E08e32CDAE59B10B3161b05C":0.04651,"0x9976f5c8BEfDee650226d5571d5F5551e8722b75":0.0824,"0xee1bcc9F1692E81A281b3a302a4b67890BA4be76":0.23633,"0x1A77C359D0019cD8F4d36b7CDf5a88043D801072":0.0524,"0x36842F8fb99D55477C0Da638aF5ceb6bBf86aA98":0.3148,"0xB6040A9F294477dDAdf5543a24E5463B8F2423Ae":0.07154}'),l=JSON.parse('{"0x17c1ae82d99379240059940093762c5e4539aba5":1.5,"0x2e8135be71230c6b1b4045696d41c09db0414226":0.62,"0x4ab6702b3ed3877e9b1f203f90cbef13d663b0e8":0.66,"0x6cca86cc27eb8c7c2d10b0672fe392cfc88e62ff":0.8,"0x829e9cc8d05d0d55b4494ecb5a43d71546dd4ddb":0.58,"0xda7cf6a0cd5d5e8d10ab55d8ba58257813a239ca":5.87,"0xf9b026786522251c08d8c49e154d036ef3ad8cc7":0}');let s=e=>{switch(e){case r.a_.BSC:return o;case r.a_.ETHEREUM:return l;default:return{}}},d=(e,t,i,r,o,l)=>{var d;let c=t?t.times(a.Bi*l):new n.Z(NaN),p=c.times(i).div(r).times(100),x=null;!p.isNaN()&&p.isFinite()&&(x=p.toNumber());let h=null!==(d=s(e)[null==o?void 0:o.toLowerCase()]||s(e)[o])&&void 0!==d?d:0;return{cakeRewardsApr:x,lpRewardsApr:h}}},78834:function(e,t,i){"use strict";i.d(t,{n:function(){return f}});var n=i(97458),r=i(4586),a=i(40968),o=i(36044),l=i(34898),s=i(29063),d=i(22459),c=i(51773),p=i(52983),x=i(96638),h=i(34239),u=i(4133),A=i(20206),g=i(33077);let m=e=>{var t,i;let{tokenId:m,onDone:f}=e,{t:b}=(0,r.Z)(),{toastSuccess:C}=(0,a.p)(),{address:w}=(0,g.mA)(),{data:B}=(0,g.py)(),{chainId:Z}=(0,s.g)(),{sendTransactionAsync:j}=(0,g.pQ)(),k=u.r[Z],{loading:v,fetchWithCatchTxError:E}=(0,d.Z)(),S=null===(t=(0,c.gp)())||void 0===t?void 0:t.address,y=null===(i=(0,c.GL)())||void 0===i?void 0:i.address,L=(0,p.useCallback)(async()=>{let{calldata:e,value:t}=o.e5.withdrawCallParameters({tokenId:m,to:w}),i={account:w,to:S,data:e,value:(0,A.y_)(t),chain:null==B?void 0:B.chain},r=await E(()=>k.estimateGas(i).then(e=>{let t={...i,gas:(0,h.yC)(e)};return j(t)}));(null==r?void 0:r.status)&&(null==f||f(),C(`${b("Unstaked")}!`,(0,n.jsx)(l.Y,{txHash:r.transactionHash,children:b("Your earnings have also been harvested to your wallet")})))},[w,E,S,k,j,B,b,C,m,f]),D=(0,p.useCallback)(async()=>{let{calldata:e,value:t}=o.cK.safeTransferFromParameters({tokenId:m,recipient:S,sender:w}),i={to:y,data:e,value:(0,A.y_)(t),account:w,chain:null==B?void 0:B.chain},r=await E(()=>k.estimateGas(i).then(e=>{let t={...i,gas:(0,h.yC)(e)};return j(t)}));(null==r?void 0:r.status)&&(null==f||f(),C(`${b("Staked")}!`,(0,n.jsx)(l.Y,{txHash:r.transactionHash,children:b("Your funds have been staked in the farm")})))},[w,E,S,y,k,j,B,b,C,m,f]),F=(0,p.useCallback)(async()=>{let{calldata:e}=o.e5.harvestCallParameters({tokenId:m,to:w}),t={to:S,data:e,value:0n},i=await E(()=>k.estimateGas({account:w,...t}).then(e=>{let i={...t,account:w,chain:null==B?void 0:B.chain,gas:(0,h.yC)(e)};return j(i)}));(null==i?void 0:i.status)&&(C(`${b("Harvested")}!`,(0,n.jsx)(l.Y,{txHash:i.transactionHash,children:b("Your %symbol% earnings have been sent to your wallet!",{symbol:"CAKE"})})),(0,x.JG)(e=>Array.isArray(e)&&"mcv3-harvest"===e[0],void 0))},[w,E,S,k,j,B,b,C,m]);return{attemptingTxn:v,onStake:D,onUnstake:L,onHarvest:F}};function f(){var e;let{t}=(0,r.Z)(),{data:i}=(0,g.py)(),{toastSuccess:s}=(0,a.p)(),{address:m}=(0,g.mA)(),{sendTransactionAsync:f}=(0,g.pQ)(),{loading:b,fetchWithCatchTxError:C}=(0,d.Z)(),w=null===(e=(0,c.gp)())||void 0===e?void 0:e.address,B=(0,p.useCallback)(async e=>{var r;let{calldata:a,value:d}=o.e5.batchHarvestCallParameters(e.map(e=>({tokenId:e,to:m}))),c={to:w,data:a,value:(0,A.y_)(d),account:m},p=(0,u.N)({chainId:null==i?void 0:null===(r=i.chain)||void 0===r?void 0:r.id}),g=await C(()=>p.estimateGas(c).then(e=>{let t={...c,gas:(0,h.yC)(e)};return f(t)}));(null==g?void 0:g.status)&&(s(`${t("Harvested")}!`,(0,n.jsx)(l.Y,{txHash:g.transactionHash,children:t("Your %symbol% earnings have been sent to your wallet!",{symbol:"CAKE"})})),(0,x.JG)(e=>Array.isArray(e)&&"mcv3-harvest"===e[0],void 0))},[m,C,w,f,i,t,s]);return{onHarvestAll:B,harvesting:b}}t.Z=m},38977:function(e,t,i){"use strict";var n=i(97458),r=i(4586),a=i(25149),o=i(30202),l=i(48172),s=i(33932),d=i(53452),c=i(48586),p=i(26909),x=i(58833),h=i(27632),u=i(90624),A=i(84633),g=i.n(A),m=i(27144),f=i(97897);let{farmV3MigrationBunny:b,farmV3MigrationMobileBunny:C}={farmV3MigrationBunny:`${u.EW}/web/banners/farmV3MigrationBunny.png`,farmV3MigrationMobileBunny:`${u.EW}/web/banners/farmV3MigrationMobileBunny.png`},w=m.ZP.div.withConfig({componentId:"sc-d97be3e7-0"})`
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  top: 0;
  overflow: visible;

  > span:first-child {
    position: absolute !important;
    right: 0px;
    bottom: 0px;
  }

  ${e=>{let{theme:t}=e;return t.mediaQueries.lg}} {
    > span:first-child {
      right: 18px;
    }
  }
`,B=m.ZP.div.withConfig({componentId:"sc-d97be3e7-1"})`
  font-family: 'Kanit';
  font-style: normal;
  font-weight: 600;
  font-size: 23px;
  line-height: 110%;
  color: #ffffff;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  padding-right: 80px;

  @media screen and (max-width: 375px) {
    font-size: 21px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 26px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    font-size: 40px;
    padding-right: 0px;
  }
`,Z=(0,m.ZP)(a.ZP).withConfig({componentId:"sc-d97be3e7-2"})`
  font-weight: 600;
  font-size: 12px;
  line-height: 110%;
  font-feature-settings: 'liga' off;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 8px;
  padding-right: 120px;

  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    font-size: 21px;
    margin-bottom: 16px;
    width: 100%;
    padding-right: 140px;
  }
`,j=m.iv`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  padding: 4px 8px;
  border-radius: 8px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    border-radius: 16px;
  }
`,k=(0,m.ZP)(o.Z).withConfig({componentId:"sc-d97be3e7-3"})`
  ${j}
  > div {
    color: ${e=>{let{theme:t}=e;return t.colors.white}};
  }
`,v=(0,m.ZP)(o.Z).withConfig({componentId:"sc-d97be3e7-4"})`
  ${j}
  background-color: ${e=>{let{theme:t}=e;return t.colors.white}};
  > div {
    color: ${e=>{let{theme:t}=e;return t.colors.primary}};
  }
`,E=()=>{let{t:e}=(0,r.Z)(),{isMobile:t,isTablet:i}=(0,l.Z)();return(0,n.jsx)(f.im,{style:{background:"linear-gradient(261.24deg, rgba(158, 63, 253, 0.1225) 27.61%, rgba(98, 61, 255, 0.25) 76.11%), linear-gradient(247.24deg, #53DEE9 -16.43%, #A881FC 92.15%)"},children:(0,n.jsxs)(f.Nh,{children:[(0,n.jsxs)(f.Sp,{children:[(0,n.jsxs)(s.Z,{flexDirection:["column","row"],mb:["8px","8px","12px"],children:[t&&(0,n.jsx)(d.Z,{mr:["auto","8px"],width:24,height:24}),(0,n.jsx)(B,{children:e(t?"PCS v3 Migration":"PancakeSwap v3 Migration")})]}),(0,n.jsx)(Z,{children:e("Migrate to continue farming CAKE rewards and earning trading fees.")}),(0,n.jsxs)(s.Z,{style:{gap:8},flexWrap:t?"wrap":"nowrap",children:[(0,n.jsx)(c.Z,{to:"/migration",children:(0,n.jsxs)(k,{scale:t?"sm":"md",children:[(0,n.jsx)(p.Z,{bold:!0,fontSize:"16px",mr:"4px",children:`${e("Proceed")} ${t?"\uD83D\uDC48":""}`}),!t&&(0,n.jsx)(x.Z,{color:"white"})]})}),(0,n.jsx)(c.Z,{target:"_blank",to:"https://docs.pancakeswap.finance/code/v3-migration/how-to-migrate",rel:'"noopener noreferrer',children:(0,n.jsxs)(v,{scale:t?"sm":"md",children:[(0,n.jsx)(p.Z,{bold:!0,fontSize:"16px",mr:"4px",children:e("Guide")}),(0,n.jsx)(h.Z,{color:"primary"})]})})]})]}),(0,n.jsx)(w,{children:t||i?(0,n.jsx)(g(),{src:C,alt:"farmV3MigrationMobileBunny",width:200,height:200,unoptimized:!0}):(0,n.jsx)(g(),{src:b,alt:"farmV3MigrationBunny",width:300,height:230,unoptimized:!0})})]})})};t.Z=E},97897:function(e,t,i){"use strict";i.d(t,{EZ:function(){return o},Nh:function(){return d},Sp:function(){return c},im:function(){return s},wh:function(){return l}});var n=i(29974),r=i(33932),a=i(27144);let o=(0,a.ZP)(n.Z).withConfig({componentId:"sc-61461c41-0"})`
  background: -webkit-linear-gradient(#ffd800, #eb8c00);
  font-size: 20px;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px rgba(0, 0, 0, 0.5);
  ${e=>{let{theme:t}=e;return t.mediaQueries.xs}} {
    font-size: 24px;
  }
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    -webkit-text-stroke: unset;
  }
  margin-bottom: 8px;
`,l=(0,a.ZP)(n.Z).withConfig({componentId:"sc-61461c41-1"})`
  color: #ffffff;
  background: -webkit-linear-gradient(#7645d9 0%, #452a7a 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-stroke: 6px transparent;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  text-transform: uppercase;
  margin-bottom: 8px;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    margin-bottom: 16px;
  }
`,s=a.ZP.div.withConfig({componentId:"sc-61461c41-2"})`
  position: relative;
  border-radius: 32px;
  width: 100%;
  max-height: max-content;
  overflow: visible;
  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    overflow: visible;
  }
`,d=(0,a.ZP)(r.Z).withConfig({componentId:"sc-61461c41-3"})`
  position: relative;
  padding: 24px;
  flex-direction: row;
  justify-content: space-between;
  max-height: 192px;
  min-height: 181px;
  &::-webkit-scrollbar {
    display: none;
  }
`,c=(0,a.ZP)(r.Z).withConfig({componentId:"sc-61461c41-4"})`
  z-index: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  ${e=>{let{theme:t}=e;return t.mediaQueries.md}} {
    padding-top: 40px;
    padding-bottom: 40px;
  }
`;a.ZP.div.withConfig({componentId:"sc-61461c41-5"})`
  position: absolute;
  right: -17px;
  opacity: 0.9;
  transform: translate(0, -50%);
  top: 50%;

  img {
    height: 100%;
    width: 500px;
  }

  ${e=>{let{theme:t}=e;return t.mediaQueries.sm}} {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    right: 24px;
    bottom: 0;
    transform: unset;
    opacity: 1;
    top: unset;
    height: 211px;
  }
`},34927:function(e,t,i){"use strict";i.d(t,{r_:function(){return n},MV:function(){return r},GK:function(){return g},z4:function(){return A},zK:function(){return x},C:function(){return h},vc:function(){return u},pz:function(){return S},Zj:function(){return c},ER:function(){return p},XD:function(){return w},vt:function(){return m},VY:function(){return f},sO:function(){return C},D9:function(){return b},yC:function(){return a},HN:function(){return o},qM:function(){return l},gX:function(){return s},VF:function(){return d},uZ:function(){return B},fG:function(){return Z},GX:function(){return j},gM:function(){return v},X8:function(){return k},LA:function(){return E}});var n={src:"/_next/static/media/IFO.7b008469.png",height:422,width:582,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAb1BMVEUySl48q/N8r9PpjHSAZFvRwsXezMvC//+cNhJuxeAsqcXLm5Mrn+4SkOpgw/Cxl4Z7VkW3IgDMzcHVzc931v+LUVaic2+tb1WOgHaQh4/asX5vutbr7O/z8fbQu7fGqqN3jZRwl7CPYE6709n///9KAmQTAAAAIHRSTlMChodr/Hn6FxCHboqNv2fB+1nu2ZZqd7v512n8+Zyr8+Fk6nkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA6SURBVHicBcGFAYAwEACxK9S+SHF32H9GEsCVKi8C4ES6JAOPXxqTYmw7xneu2b9tuta757Cn1tUz/DcxAsKIEvzgAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:6},r={src:"/_next/static/media/IFOMobile.a93e96d8.png",height:346,width:338,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAhFBMVEVMaXGnVDIqqOi+5fT08/iISD7cw6x4cLCulZvv6u3i2dzs7PJz2fXLsaiOQx6T3ejNt7Cek7eYcmp9YVqmoJubiaSab4htbmpok57GqpqZfJWdcmRSu+xKlOa+yMyTTUgujO+yy9Hgk4iqpoW/incgnPVtdIMmhseXy+ddnrSiYlmPX1C0ExctAAAAK3RSTlMAQr2H/RXREEH8WGOCdiIt9jLj+fdXtf736YPSxR/X6THxh0VttvVX+/r6rFpRsAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAEZJREFUeJwVxsURwCAABMDDIe7untB/fxleuwAANS63MxjoSV3inbENSmtC5HTAM6bt12eGz3lRN++FMJFZbu2HSECkZVf9e9YEC+V/KkcAAAAASUVORK5CYII=",blurWidth:8,blurHeight:8},a={src:"/_next/static/media/mod-tc-desktop.e1700017.png",height:677,width:1290,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAMAAACEE47CAAAAP1BMVEW6j7L/ZwCXZZWWVVJNTkKEbn6KeqoAP///hoa8mKWYc62eVVGAcIBcX1r///9AeG+UYlTPuMa1YjqTdVfbxOigxH61AAAAFXRSTlMNG36VmGkwAQIVn3SPyheufzaRu3t/k4s8AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAKUlEQVR4nAXBhQEAIAzAsKLbcPv/VhJExRAFQ2pw+5FTif2uAb7FmQ4fEMYBAiXfjBIAAAAASUVORK5CYII=",blurWidth:8,blurHeight:4},o={src:"/_next/static/media/mod-tc-mobile.92900d89.png",height:403,width:412,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAb1BMVEWqeXm9bDPWgWaQXZbyyveXQjp1W0ymetecX5zGrMnEuNKhUFnbhmaParCga6B1OV95PD6vkr7Cs9X10/p5RmZ3Y3pVNy5+jX1EXlZfOS5TWklocXKyeVBjk4HJZjTmbSm0c1d2Vkr///+oXWOUUjwyNYo2AAAAIXRSTlMBezmfHSGjCChgg4lXifrIhsabcFDYeJ/265KOsUWmnv73oDlZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAQklEQVR4nB3FxRGAMAAAwQtEcXcL0H+NTNjPQmCc/Ce521CUuUaCNenTYTBxXr16O7FFPcyrF1D2k7/8Dmpc9CHUB1GVAxM4DnPNAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:8},l={src:"/_next/static/media/mod-white-logo.02856f5f.png",height:134,width:489,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAFVBMVEX///////////////////////////9nSIHRAAAAB3RSTlModWIwFUVQHYhWcgAAAAlwSFlzAAALEwAACxMBAJqcGAAAABpJREFUeJxjYGFmYGBmZmBhYGNkYmJkZGQFAAFUACWNHhzuAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:2},s={src:"/_next/static/media/perpetual.fd0aa080.png",height:464,width:784,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAMAAABPT11nAAAAUVBMVEWqgevsRZc1z6Yi/+fjR5XPnkwy2q/xTaXqT4T0PpbVrF/lmEtc4rAtv6O7wXMm0q/Zwm51xn7jrInAt5bvSJzqlU8Z46PPz6rn7vHNxI3rvWXl5yU8AAAAGXRSTlMDpWUWEjyWIDZb46KoHKXM/qfrerD+gMjXbCXM1gAAAAlwSFlzAAALEwAACxMBAJqcGAAAADRJREFUeJwFwYkCQCAQQMFHx26SDor8/4c2AyJEB8gW7nk4Q1Dt/+VPrGorNe/YR753+LQAHlgBpffQ4xsAAAAASUVORK5CYII=",blurWidth:8,blurHeight:5},d={src:"/_next/static/media/perpetualMobile.79f3069c.png",height:416,width:384,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAAZlBMVEXqdLOM1LS6wI70QaTTPYnwSJn64u5MaXEv16viuFbbP5Dtd2DjeWzjSajtilLuw5rfz4nPyp3rkUCeubfKzoo24KbmlkDklkPDynDVs302s5Svn1/jpVjlvWvyslv18O7h4NLlolqnVBsjAAAAHXRSTlMFIP1dNEdqAHjPkdlSXsteQeC2fP2WX5pN6mIQvNcNY/UAAAAJcEhZcwAACxMAAAsTAQCanBgAAABASURBVHicFcVHEoAgEADBAcFlzTmD+v9PWvalEWBYBHw9xmvFZdVureKLJiU9wZVv1AMkf6Yt/N/9HBAxbRfMB1bwAsQ8okFcAAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8},c={src:"/_next/static/media/farmV3MigrationBunny.4f924600.png",height:236,width:316,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAVFBMVEX/6ZTp3M/26tV54H7s27imxaP32MRMaXH1y8K8tT32xCPWnuDKeP921nvrx5WhbK6EuJSjnYrVu4LAg1PW1rb////Pmtmmdbfgwrf/3aj2yKDUoNOG17h1AAAAGXRSTlMDdleNo0r8AAwnOTJOcsn2p/SP5uAb1WiPalN3kgAAAAlwSFlzAAALEwAACxMBAJqcGAAAADRJREFUeJwFwYcBgCAAwLCqQMG95/9/moBVCFnA+hlV8E4pWsD13Q+hpWzLFQdy15/fNDc/KG0B2vINrVYAAAAASUVORK5CYII=",blurWidth:8,blurHeight:6},p={src:"/_next/static/media/farmV3MigrationBunnyFull.6276ea4c.png",height:609,width:480,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAMAAADtGH4KAAAAYFBMVEWzyc/42Lnt1q7t2LrHk+bYrPLGtdtMaXHArpfq4dvEfeurerqoU9jAeOK4ed6ud9Tcq/Tlz7q/hpfLmmCyWeHpzLadeKakibysec/huP/AsIvJnqrFjNr2y5z738fJd+/CtRrkAAAAGnRSTlMHzquks4FFABoq7pLqf5fNX3B00fny9UGd/g9qNUkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA7SURBVHicY2DnYGbiZGdgZ2CUBVEconKCIJ6wFBs7AwODkLSYOIMAL5ekDDcDK5+IPA8LAwObBD8LKwA5yQJCrB7KGgAAAABJRU5ErkJggg==",blurWidth:6,blurHeight:8},x={src:"/_next/static/media/butter.45e9bddc.png",height:121,width:142,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAM1BMVEX/6HftzzX/60z32zT/4lX98mb53zr/6Tv33Db21zX44lv85k//6lb/61n54DnyzzH/+mC7mkVRAAAAEHRSTlMBMvvkDU29/h+udX3I1vnFxgTRAAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAADNJREFUeJxFxUkSwCAMBLEGDGOTzf9/bYoDhS6Co8QYl0FpUs2ON701b6OnlI8DM75Ybz8exwEMmiR1iwAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:7},h={src:"/_next/static/media/butter-2.36a9d3e5.png",height:60,width:70,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAOVBMVEVMaXH01DP950nrzTf/41b01DT22zX/6zz21jH+7mX55GD/51D/80795kz54Tn32zf/61n/+2H/8VruWxrNAAAAEXRSTlMAtr0uDaDU/htEYoX9+Pfmzi1yTWYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAA0SURBVHicPcs5AsAgDASx4VxzJMT5/2OpQL3gyCPWkIDmU1oJcvTnVTWwz6W/AVZC6fewASIqARi1NLpGAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:7},u={src:"/_next/static/media/love-butter.28a011a7.png",height:401,width:402,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAM1BMVEVMaXHhujT5t4H0rHLXg0zgfzD24Vz84ET41GvRglrw0kD/6Wr8x6ru2ELy2kT/4oL/0ohua99yAAAAD3RSTlMAgv5/hjrz/ostxQzULj874n5ZAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAKElEQVR4nGNgwAJ4+bghDC52Ng4wg5GdnZ8HzOIQYGIGMzhZWJH0AAAVBQCfe76ApQAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8},A={src:"/_next/static/media/trading-reward-bunny.8fd08b80.png",height:499,width:440,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAICAMAAAAC2hU0AAAAYFBMVEVMaXGHdzL528P07GuOr7L9yJfrnk6UmYG8p0mJp4/H3eXEvbnV1cnilDiZnj6OyduVrnzgrVFplZXQxZHEoTz975vVklr7yX7opGS5tVrK5fGhr4nA1b/HtYL5zlvUgUDrxVajAAAAF3RSTlMAevpfmv38DMjyoPirfy0rKalG7mWFSS3AwQAAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAA9SURBVHicFchHEoAgEADBUYEVMYESzP//pUUfG2BRK9V42xlkaHMvoE5XJiDY62hA4vbUTllrD+yfMW/HDz8eAj0xLBK6AAAAAElFTkSuQmCC",blurWidth:7,blurHeight:8},g={src:"/_next/static/media/trading-reward-bg.50068168.png",height:192,width:1126,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAABlBMVEXgwSL/v39wEu6kAAAAAnRSTlMCCEp+J4gAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAMSURBVHicY2CAAEYAAAoAArTnxBAAAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},m={src:"/_next/static/media/galxe-traverse-bg.7ac0b1a7.png",height:384,width:2252,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAAD1BMVEU8tKFy0OA0x9dfzt1GqJwwcvEoAAAAAnRSTlP3+wcBkdYAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAARSURBVHicY2BkZmJiYmJhAAAAUgARLevuIgAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:1},f={src:"/_next/static/media/galxe-traverse-bg-mobile.1cbf0d0b.png",height:352,width:676,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAMAAACEE47CAAAAPFBMVEUwydww0dE109c21OIyzOMszNAsx90p0LJbwGks0sE7yq1ZyXYy1NNivWtG1bI71MpGrnpKxog31OxD2MyBIhJtAAAACXRSTlPj////////5eAJnNHUAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAKklEQVR4nAXBhwEAIAgDsLJUwO3/v5oApajqBcyIReaDO3VeO1A9TuZoHw60AP9m7N+KAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:4},b={src:"/_next/static/media/galxe-traverse-cloud.c229b8c9.png",height:117,width:418,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAHlBMVEXW7PzU7PnJ7fbJ5vn////O5/rI5vnR7PrV8/rJ5/ttq2Q7AAAACnRSTlP+8RxfAuTFo5mARStBywAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAABdJREFUeJxjYGLmZGVkZ2JhYGMAAUYOAAIKADFMhYB4AAAAAElFTkSuQmCC",blurWidth:8,blurHeight:2},C={src:"/_next/static/media/galxe-traverse-bunny.2eec4362.png",height:340,width:523,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAMAAABPT11nAAAAOVBMVEW+r8uxpqvm28+9ur3WucNUoZqBwbuypLi/rruStbKhmJ1YxatWrbPDtrmNw7pbipvHtMd8oq+Mh5ML16KCAAAAEnRSTlMBb/WJLxNGHE5Wx2ssprOcKeQI8SbDAAAACXBIWXMAABYlAAAWJQFJUiTwAAAALklEQVR4nB3JyREAIAgEsAVBwFv7L9bRfIPITfFYzD1qCMzLSVkNi5hJfnp3Ay4YGQD1hGNXNgAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:5},w={src:"/_next/static/media/galxe-logo.7705eef0.png",height:280,width:1532,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAADFBMVEX////////////////1pQ5zAAAABHRSTlNRM186HSDNvQAAAAlwSFlzAAALEwAACxMBAJqcGAAAABFJREFUeJxjYGZkYGBgZGICAAAxAAqpWIoIAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:1},B={src:"/_next/static/media/polygon-zk-bg.67d7dcaf.png",height:384,width:2252,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAABCAMAAADU3h9xAAAACVBMVEWUUrGIN9qTSbwxKezBAAAAAXRSTlP3Yz+/2QAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAA1JREFUeJxjYAQDJgYAAC4ACTFcsN0AAAAASUVORK5CYII=",blurWidth:8,blurHeight:1},Z={src:"/_next/static/media/polygon-zk-bg-mobile.8348cfa2.png",height:352,width:676,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAMAAACEE47CAAAAJFBMVEWPNNaCO96Zbo6GP8aNNNaHONyCOuGVQ9+1kIWSSKSEOKGjXE/j+q8QAAAABHRSTlPj5eD+3Au28AAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAACRJREFUeJxjYGABAwYIzcrOzsDKysrKxsnNxcDIxsbGxszBBAAJ5gCeal8lJwAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:4},j={src:"/_next/static/media/polygon-zk-bunny.a0b3c2dd.png",height:536,width:671,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAPFBMVEVMaXGLWqespqzfp1jBwea8qOmwufXSvuWsofqeeeu/kV1VS3h7P7OqjkeMeEGzsMepfq1kVG26utDlp09vLur3AAAAFHRSTlMAImTdLVYmCRZgXbRA2fRvtfVH8O4uc+sAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAAxSURBVHicRca3EQAgDASwJ5i3yWH/XTkqVAn4qK6aIIrNVUxBqu9tJwA6TvAvjNkRFxnsARfFgLqYAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:6},k={src:"/_next/static/media/zkSyncBgMobile.721366a8.png",height:478,width:540,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAHCAMAAAACh/xsAAAAY1BMVEVMaXG5y5jjwZSHh4dEQCuCl3CNqo3P37GFoXFUVXfu5d261Jb/5//cx8Q0Kxr46NGmuZKnvYybr4Y7NiSstbPCwM7ArKF/b1C1lX+fn4GZqpCnk3c1KRrG4aabrnyiuYnaw9LHPnHXAAAAH3RSTlMA/vovfdoJ+x4KPNAgzh3eopHAYvT5tMTcuTxAQ2h5dUM8GwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAD1JREFUeJwFwQcCgCAMALEDCy3uvRX//0oTgGTDGAHqPocEqezm7TihaL51vyJW6eK9PljITtW90E4icvMDSyECfZfTvmkAAAAASUVORK5CYII=",blurWidth:8,blurHeight:7},v={src:"/_next/static/media/zkSyncBg.bdbb9964.png",height:353,width:1248,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAIVBMVEWCjnnK26Ooso5MaXHCpWx/qn/Gt4XA5KqUoH6OjHDZroBSjHWfAAAAC3RSTlMq02MA+AzwcsKs+zdE7lcAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAaSURBVHicY2Bm4GRgZuJgZWBmYmFk5GJjBwACDQBBVOBRvgAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:2},E={src:"/_next/static/media/zkSyncBunny.04c71ea2.png",height:407,width:402,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAZlBMVEVwZqm4yt3108W1hmv/69jm0dLx5uTYusl9XoHozuyJk62it8PNqujGvcSyipTy4uTDoN77+PvYuc6nkrD/9+vWu6/axvPq3azgzff//Ob04u316uqfruanp9XdxNL466zw3Nfty/Z0fqAvAAAAGnRSTlMBU2p5BrlvjBlCtrmH9ZDatVT5huz6mfvXupIGXqUAAAAJcEhZcwAACxMAAAsTAQCanBgAAABBSURBVHicHcpHEoAgAMDAiFQL9gbW/3/SgVxyWUDioiYlj6g0BcP8bGGn8l1Y3hVsqe7xmxIR7dXbjOuzyccYBz9i8AKOt3riIgAAAABJRU5ErkJggg==",blurWidth:8,blurHeight:8},S={src:"/_next/static/media/eraLogo.da478c42.png",height:28,width:148,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAMAAABSSm3fAAAAFVBMVEX///////////////////////////9nSIHRAAAAB3RSTlNxSGY3mVlX60paBgAAAAlwSFlzAAALEwAACxMBAJqcGAAAABpJREFUeJxjYGRmYWJiYGBkYGVmYWBkY2AAAAE6ACFy9WHoAAAAAElFTkSuQmCC",blurWidth:8,blurHeight:2}},34680:function(e,t,i){"use strict";var n=i(97458),r=i(52983),a=i(29974),o=i(17206);let l=e=>{var t;let{text:i,firstColor:l,mb:s="24px",...d}=e,{theme:c}=(0,o.ZP)(),{firstWord:p,remainingWords:x}=(0,r.useMemo)(()=>{let e=i.split(" "),t=e[0],n=e.slice(1).join(" ");return{firstWord:t,remainingWords:n}},[i]),h=null!==(t=c.colors[l])&&void 0!==t?t:c.colors.secondary;return(0,n.jsxs)(a.Z,{scale:"xl",mb:s,...d,children:[(0,n.jsxs)("span",{style:{color:h},children:[p," "]}),x]})};t.Z=l},5447:function(e,t,i){"use strict";var n=i(97458),r=i(52983),a=i(27144),o=i(28606),l=i(17934),s=i(29546);let d=(0,a.ZP)(l.Z).withConfig({componentId:"sc-2c9b1849-0"})`
  display: flex;
  background-repeat: no-repeat;
  background-size: contain;
`,c=e=>{let{loadingPlaceholder:t,src:i,width:a,height:l,...c}=e,[p,x]=(0,r.useState)(!1),h=(0,r.useRef)(null),u=t||(0,n.jsx)(s.Z,{});return(0,r.useEffect)(()=>{let e;let t=window.IntersectionObserver;if(h.current&&t){let t=h.current;(e=new window.IntersectionObserver(n=>{n.forEach(n=>{let{isIntersecting:r}=n;if(r){if(i){let e=document.createElement("img");e.onload=()=>{t.style.backgroundImage=`url("${i}")`,x(!0)},e.src=i}e.disconnect()}})},o.Z)).observe(t)}return()=>{e&&e.disconnect()}},[i,x]),(0,n.jsx)(d,{ref:h,width:a,height:l,...c,children:!p&&u})};t.Z=c},26584:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(27144),a=i(67463),o=i(5447);let l=(0,r.ZP)(o.Z).withConfig({componentId:"sc-c84637f9-0"})`
  border-radius: 50%;
`,s=(0,r.ZP)(a.Z).withConfig({componentId:"sc-c84637f9-1"})`
  height: 100%;
  width: 100%;
`,d=e=>(0,n.jsx)(l,{loadingPlaceholder:(0,n.jsx)(s,{}),...e});t.Z=d},67463:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(27144),a=i(85817);let o=e=>{let t=(0,r.Fg)(),i=t.isDark?"#3C3742":"#e9eaeb",o=t.isDark?"#666171":"#bdc2c4";return(0,n.jsxs)(a.Z,{viewBox:"0 0 72 72",...e,children:[(0,n.jsx)("path",{d:"M72 36C72 55.8823 55.8823 72 36 72C16.1177 72 0 55.8823 0 36C0 16.1177 16.1177 0 36 0C55.8823 0 72 16.1177 72 36Z",fill:i}),(0,n.jsx)("mask",{id:"mask0","mask-type":"alpha",maskUnits:"userSpaceOnUse",x:"3",y:"3",width:"66",height:"66",children:(0,n.jsx)("path",{d:"M68.25 36C68.25 53.8112 53.8112 68.25 36 68.25C18.1888 68.25 3.75 53.8112 3.75 36C3.75 18.1888 18.1888 3.75 36 3.75C53.8112 3.75 68.25 18.1888 68.25 36Z",fill:"#C4C4C4"})}),(0,n.jsxs)("g",{mask:"url(#mask0)",children:[(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M20.9927 23.2654C26.1289 23.1362 30.0824 27.7278 29.2039 32.7879L27.6838 41.5445C30.2298 41.0514 32.9304 40.7875 35.7229 40.7875C37.7063 40.7875 39.6424 40.9206 41.5089 41.1741L49.2862 29.5726C51.7713 25.8657 56.7909 24.8751 60.4978 27.3602C64.7827 30.2326 65.3155 36.33 61.5938 39.9021L55.2585 45.9828C59.9045 49.0009 63.1305 53.2977 63.1306 58.4066V62.322C63.1306 67.644 59.6097 72.0998 54.6877 75.1077C49.7272 78.1391 43.0165 79.9412 35.7229 79.9412C28.4292 79.9412 21.7186 78.1391 16.7581 75.1077C11.836 72.0998 8.31519 67.644 8.31519 62.322V58.4067C8.31522 54.4286 10.2963 50.9169 13.3384 48.1585L13.0101 31.6154C12.9208 27.115 16.4929 23.3785 20.9927 23.2654ZM15.617 49.1514C15.6003 49.0112 15.5903 48.8688 15.5874 48.7246L15.2471 31.571C15.1822 28.3014 17.7798 25.5842 21.049 25.502C24.7712 25.4084 27.637 28.733 26.9996 32.4052L24.8971 44.5163C25.6681 44.2915 26.4607 44.0899 27.2726 43.9131C29.9138 43.338 32.7585 43.0248 35.7229 43.0248C38.1625 43.0248 40.5211 43.237 42.7519 43.6326C42.8725 43.2609 43.0459 42.8995 43.2742 42.5589L51.1446 30.8185C52.9416 28.1379 56.5714 27.4216 59.252 29.2186C62.3505 31.2957 62.7358 35.7049 60.0446 38.2879L51.5469 46.4441C52.264 46.7988 52.9486 47.1771 53.5975 47.577C58.1074 50.3568 60.8932 54.1829 60.8932 58.4066V62.322C60.8932 70.8172 49.6241 77.7039 35.7229 77.7039C21.8217 77.7039 10.5525 70.8172 10.5525 62.322V58.4067C10.5526 54.9322 12.4377 51.7266 15.617 49.1514Z",fill:o}),(0,n.jsx)("path",{d:"M60.8932 62.3221C60.8932 70.8173 49.624 77.704 35.7228 77.704C21.8216 77.704 10.5525 70.8173 10.5525 62.3221V58.4067H60.8932V62.3221Z",fill:i}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M26.9995 32.4051C27.637 28.733 24.7711 25.4083 21.0489 25.5019C17.7797 25.5842 15.1821 28.3013 15.247 31.5709L15.5874 48.7245C15.5903 48.8687 15.6002 49.0111 15.617 49.1513C12.4376 51.7266 10.5525 54.9321 10.5525 58.4066C10.5525 66.9018 21.8216 73.7885 35.7228 73.7885C49.624 73.7885 60.8932 66.9018 60.8932 58.4066C60.8932 53.5752 57.2481 49.264 51.5468 46.444L60.0445 38.2879C62.7358 35.7048 62.3504 31.2956 59.252 29.2185C56.5714 27.4215 52.9416 28.1378 51.1446 30.8184L43.2742 42.5588C43.0458 42.8994 42.8724 43.2609 42.7519 43.6326C40.521 43.2369 38.1625 43.0248 35.7228 43.0248C31.8473 43.0248 28.1763 43.56 24.897 44.5162L26.9995 32.4051Z",fill:i}),(0,n.jsx)("path",{d:"M32.0873 57.2881C32.0873 59.6049 30.8352 61.4831 29.2906 61.4831C27.746 61.4831 26.4939 59.6049 26.4939 57.2881C26.4939 54.9712 27.746 53.093 29.2906 53.093C30.8352 53.093 32.0873 54.9712 32.0873 57.2881Z",fill:o}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M28.891 54.0353C29.461 54.8903 29.8499 56.1359 29.8499 57.5677C29.8499 58.1855 30.3508 58.6864 30.9686 58.6864C31.5864 58.6864 32.0873 58.1855 32.0873 57.5677C32.0873 55.7558 31.5997 54.0649 30.7526 52.7943C29.9107 51.5314 28.6248 50.5759 27.0532 50.5759C25.4816 50.5759 24.1957 51.5314 23.3538 52.7943C22.5067 54.0649 22.0191 55.7558 22.0191 57.5677C22.0191 58.55 22.1622 59.4908 22.4244 60.3463C22.6055 60.937 23.2311 61.2691 23.8218 61.088C24.4125 60.9069 24.7446 60.2813 24.5635 59.6906C24.3685 59.0543 24.2565 58.3349 24.2565 57.5677C24.2565 56.1359 24.6454 54.8903 25.2154 54.0353C25.7906 53.1725 26.4624 52.8133 27.0532 52.8133C27.644 52.8133 28.3158 53.1725 28.891 54.0353Z",fill:o}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M48.1883 54.0353C48.7582 54.8903 49.1472 56.1359 49.1472 57.5677C49.1472 58.1855 49.648 58.6864 50.2658 58.6864C50.8837 58.6864 51.3845 58.1855 51.3845 57.5677C51.3845 55.7558 50.8969 54.0649 50.0498 52.7943C49.208 51.5314 47.9221 50.5759 46.3505 50.5759C44.7788 50.5759 43.4929 51.5314 42.6511 52.7943C41.804 54.0649 41.3164 55.7558 41.3164 57.5677C41.3164 58.55 41.4594 59.4908 41.7216 60.3463C41.9027 60.937 42.5284 61.2691 43.1191 61.088C43.7098 60.9069 44.0418 60.2813 43.8608 59.6906C43.6657 59.0543 43.5538 58.3349 43.5538 57.5677C43.5538 56.1359 43.9427 54.8903 44.5127 54.0353C45.0879 53.1725 45.7597 52.8133 46.3505 52.8133C46.9412 52.8133 47.613 53.1725 48.1883 54.0353Z",fill:o}),(0,n.jsx)("path",{d:"M51.3844 57.2881C51.3844 59.6049 50.1323 61.4831 48.5877 61.4831C47.0431 61.4831 45.791 59.6049 45.791 57.2881C45.791 54.9712 47.0431 53.093 48.5877 53.093C50.1323 53.093 51.3844 54.9712 51.3844 57.2881Z",fill:o}),(0,n.jsx)("path",{d:"M34.0221 25.9463V25.2697C34.0221 24.32 34.2121 23.5247 34.5919 22.8836C34.9956 22.2426 35.5297 21.6134 36.1945 20.9961C36.8118 20.4026 37.4172 19.8921 38.0108 19.4648C38.6043 19.0374 39.091 18.5863 39.4709 18.1115C39.8508 17.6367 40.0407 17.0787 40.0407 16.4377C40.0407 15.5118 39.7083 14.8589 39.0436 14.479C38.4025 14.0754 37.3223 13.8736 35.8028 13.8736C34.8056 13.8736 33.8203 14.0041 32.8469 14.2653C31.8735 14.5027 31.0425 14.8114 30.354 15.1912V10.3835C31.2325 9.95615 32.2652 9.61189 33.4523 9.35073C34.6632 9.08957 35.9808 8.95898 37.4054 8.95898C40.1594 8.95898 42.2606 9.5644 43.7088 10.7752C45.1571 11.9623 45.8812 13.6005 45.8812 15.6898C45.8812 17.0194 45.6082 18.0996 45.0621 18.9306C44.5161 19.7378 43.7207 20.5688 42.6761 21.4235C41.7976 22.1595 41.0616 22.8005 40.4681 23.3466C39.8745 23.8689 39.5777 24.5812 39.5777 25.4834V25.9463H34.0221ZM33.7728 32.2498V28.1187H39.7914V32.2498H33.7728Z",fill:o})]}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M71.9838 37.09L69.7348 37.0231C69.7449 36.6834 69.75 36.3423 69.75 36C69.75 35.6577 69.7449 35.3166 69.7348 34.9769L71.9838 34.91C71.9946 35.272 72 35.6354 72 36C72 36.3646 71.9946 36.728 71.9838 37.09ZM71.8544 32.7398L69.6134 32.941C69.5523 32.2603 69.471 31.5857 69.3702 30.9176L71.5949 30.5818C71.7025 31.2945 71.7892 32.014 71.8544 32.7398ZM71.2052 28.4414L69.0048 28.9115C68.8622 28.2441 68.6999 27.5841 68.5185 26.932L70.6861 26.3289C70.8798 27.0248 71.053 27.7292 71.2052 28.4414ZM70.0397 24.2525L67.9128 24.9864C67.6906 24.3424 67.4494 23.7072 67.1899 23.0815L69.2683 22.2196C69.5452 22.8874 69.8026 23.5652 70.0397 24.2525ZM68.3746 20.237L66.3524 21.2235C66.0538 20.6114 65.7373 20.0097 65.4034 19.419L67.3622 18.3119C67.7183 18.942 68.0561 19.584 68.3746 20.237ZM66.2353 16.4517L64.347 17.6751C63.977 17.104 63.5901 16.5448 63.1872 15.998L64.9984 14.6631C65.4281 15.2462 65.8407 15.8426 66.2353 16.4517ZM63.656 12.952L61.9283 14.3934C61.4925 13.8711 61.0413 13.3621 60.5752 12.8671L62.2132 11.3246C62.7102 11.8523 63.1914 12.3951 63.656 12.952ZM60.6754 9.78678L59.1329 11.4248C58.6379 10.9587 58.1289 10.5074 57.6066 10.0717L59.048 8.34397C59.6049 8.80865 60.1477 9.28984 60.6754 9.78678ZM57.3369 7.00159L56.002 8.8128C55.4552 8.40985 54.896 8.02303 54.3249 7.65302L55.5482 5.76468C56.1574 6.15933 56.7538 6.57187 57.3369 7.00159ZM53.6881 4.63782L52.581 6.5966C51.9903 6.26271 51.3886 5.94615 50.7765 5.64759L51.7629 3.62536C52.416 3.94392 53.058 4.28165 53.6881 4.63782ZM49.7804 2.7317L48.9185 4.81008C48.2928 4.55061 47.6576 4.30943 47.0136 4.08723L47.7475 1.96028C48.4348 2.19743 49.1126 2.4548 49.7804 2.7317ZM45.6711 1.31385L45.068 3.48152C44.4159 3.3001 43.7559 3.13777 43.0885 2.99517L43.5586 0.794831C44.2708 0.947003 44.9752 1.12024 45.6711 1.31385ZM41.4182 0.405049L41.0824 2.62985C40.4143 2.529 39.7397 2.44772 39.059 2.38662L39.2602 0.14563C39.986 0.210778 40.7055 0.297466 41.4182 0.405049ZM37.09 0.0161859C36.728 0.0054207 36.3646 0 36 0C35.6354 0 35.272 0.00542073 34.91 0.016186L34.9769 2.26519C35.3166 2.25509 35.6577 2.25 36 2.25C36.3423 2.25 36.6834 2.25509 37.0231 2.26519L37.09 0.0161859ZM32.7398 0.145631L32.941 2.38662C32.2603 2.44772 31.5857 2.529 30.9176 2.62985L30.5818 0.405049C31.2945 0.297467 32.014 0.210779 32.7398 0.145631ZM28.4414 0.794832L28.9115 2.99517C28.2441 3.13777 27.5841 3.3001 26.932 3.48152L26.3289 1.31386C27.0248 1.12024 27.7292 0.947004 28.4414 0.794832ZM24.2525 1.96028L24.9864 4.08723C24.3424 4.30944 23.7072 4.55061 23.0815 4.81008L22.2196 2.7317C22.8874 2.45481 23.5652 2.19743 24.2525 1.96028ZM20.237 3.62536L21.2235 5.64759C20.6114 5.94616 20.0097 6.26272 19.419 6.5966L18.3119 4.63783C18.942 4.28165 19.584 3.94392 20.237 3.62536ZM16.4517 5.76469L17.6751 7.65302C17.104 8.02303 16.5448 8.40985 15.998 8.81281L14.6631 7.00159C15.2462 6.57188 15.8426 6.15933 16.4517 5.76469ZM12.952 8.34398L14.3934 10.0717C13.8711 10.5075 13.3621 10.9587 12.8671 11.4248L11.3246 9.78679C11.8523 9.28984 12.3951 8.80865 12.952 8.34398ZM9.78678 11.3246L11.4248 12.8671C10.9587 13.3621 10.5074 13.8711 10.0717 14.3934L8.34397 12.952C8.80865 12.3951 9.28984 11.8523 9.78678 11.3246ZM7.00159 14.6631L8.8128 15.998C8.40985 16.5448 8.02303 17.104 7.65302 17.6751L5.76468 16.4518C6.15933 15.8426 6.57187 15.2462 7.00159 14.6631ZM4.63782 18.3119L6.5966 19.419C6.26271 20.0097 5.94615 20.6114 5.64759 21.2235L3.62536 20.2371C3.94392 19.584 4.28165 18.942 4.63782 18.3119ZM2.7317 22.2196L4.81008 23.0815C4.55061 23.7072 4.30943 24.3424 4.08723 24.9864L1.96028 24.2525C2.19743 23.5652 2.4548 22.8874 2.7317 22.2196ZM1.31385 26.3289L3.48152 26.932C3.3001 27.5841 3.13777 28.2441 2.99517 28.9115L0.794831 28.4414C0.947003 27.7292 1.12024 27.0248 1.31385 26.3289ZM0.405049 30.5818L2.62985 30.9176C2.529 31.5857 2.44772 32.2603 2.38662 32.941L0.14563 32.7398C0.210778 32.014 0.297466 31.2945 0.405049 30.5818ZM0.0161859 34.91C0.0054207 35.272 0 35.6354 0 36C0 36.3646 0.00542073 36.728 0.016186 37.09L2.26519 37.0231C2.25509 36.6834 2.25 36.3423 2.25 36C2.25 35.6577 2.25509 35.3166 2.26519 34.9769L0.0161859 34.91ZM0.145631 39.2602L2.38662 39.059C2.44772 39.7397 2.529 40.4143 2.62985 41.0824L0.40505 41.4182C0.297467 40.7055 0.210779 39.986 0.145631 39.2602ZM0.794833 43.5586L2.99517 43.0885C3.13777 43.7559 3.3001 44.4159 3.48152 45.068L1.31386 45.6711C1.12024 44.9752 0.947004 44.2708 0.794833 43.5586ZM1.96028 47.7475L4.08723 47.0136C4.30944 47.6576 4.55061 48.2928 4.81008 48.9185L2.7317 49.7804C2.45481 49.1126 2.19743 48.4348 1.96028 47.7475ZM3.62536 51.763L5.64759 50.7765C5.94616 51.3886 6.26272 51.9903 6.5966 52.581L4.63783 53.6881C4.28165 53.058 3.94392 52.416 3.62536 51.763ZM5.76469 55.5482L7.65302 54.3249C8.02303 54.896 8.40985 55.4552 8.81281 56.002L7.00159 57.3369C6.57188 56.7538 6.15933 56.1574 5.76469 55.5482ZM8.34398 59.048L10.0717 57.6066C10.5075 58.1289 10.9587 58.6379 11.4248 59.1329L9.78679 60.6754C9.28984 60.1477 8.80865 59.6049 8.34398 59.048ZM11.3246 62.2132L12.8671 60.5752C13.3621 61.0413 13.8711 61.4925 14.3934 61.9283L12.952 63.656C12.3951 63.1914 11.8523 62.7102 11.3246 62.2132ZM14.6631 64.9984L15.998 63.1872C16.5448 63.5901 17.104 63.977 17.6751 64.347L16.4518 66.2353C15.8426 65.8407 15.2462 65.4281 14.6631 64.9984ZM18.3119 67.3622L19.419 65.4034C20.0097 65.7373 20.6114 66.0538 21.2235 66.3524L20.2371 68.3746C19.584 68.0561 18.942 67.7184 18.3119 67.3622ZM22.2196 69.2683L23.0815 67.1899C23.7072 67.4494 24.3424 67.6906 24.9864 67.9128L24.2525 70.0397C23.5652 69.8026 22.8874 69.5452 22.2196 69.2683ZM26.3289 70.6861L26.932 68.5185C27.5841 68.6999 28.2441 68.8622 28.9115 69.0048L28.4414 71.2052C27.7292 71.053 27.0248 70.8798 26.3289 70.6861ZM30.5818 71.595L30.9176 69.3702C31.5857 69.471 32.2603 69.5523 32.941 69.6134L32.7398 71.8544C32.014 71.7892 31.2945 71.7025 30.5818 71.595ZM34.91 71.9838L34.9769 69.7348C35.3166 69.7449 35.6577 69.75 36 69.75C36.3423 69.75 36.6834 69.7449 37.0231 69.7348L37.09 71.9838C36.728 71.9946 36.3646 72 36 72C35.6354 72 35.272 71.9946 34.91 71.9838ZM39.2602 71.8544L39.059 69.6134C39.7397 69.5523 40.4143 69.471 41.0824 69.3702L41.4182 71.5949C40.7055 71.7025 39.986 71.7892 39.2602 71.8544ZM43.5586 71.2052L43.0885 69.0048C43.7559 68.8622 44.4159 68.6999 45.068 68.5185L45.6711 70.6861C44.9752 70.8798 44.2708 71.053 43.5586 71.2052ZM47.7475 70.0397L47.0136 67.9128C47.6576 67.6906 48.2928 67.4494 48.9185 67.1899L49.7804 69.2683C49.1126 69.5452 48.4348 69.8026 47.7475 70.0397ZM51.7629 68.3746L50.7765 66.3524C51.3886 66.0538 51.9903 65.7373 52.581 65.4034L53.6881 67.3622C53.058 67.7183 52.416 68.0561 51.7629 68.3746ZM55.5482 66.2353L54.3249 64.347C54.896 63.977 55.4552 63.5901 56.002 63.1872L57.3369 64.9984C56.7538 65.4281 56.1574 65.8407 55.5482 66.2353ZM59.048 63.656L57.6066 61.9283C58.1289 61.4925 58.6379 61.0413 59.1329 60.5752L60.6754 62.2132C60.1477 62.7102 59.6049 63.1914 59.048 63.656ZM62.2132 60.6754L60.5752 59.1329C61.0413 58.6379 61.4925 58.1289 61.9283 57.6066L63.656 59.048C63.1914 59.6049 62.7102 60.1477 62.2132 60.6754ZM64.9984 57.3369L63.1872 56.002C63.5901 55.4552 63.977 54.896 64.347 54.3249L66.2353 55.5482C65.8407 56.1574 65.4281 56.7538 64.9984 57.3369ZM67.3622 53.6881L65.4034 52.581C65.7373 51.9903 66.0538 51.3886 66.3524 50.7765L68.3746 51.7629C68.0561 52.416 67.7184 53.058 67.3622 53.6881ZM69.2683 49.7804L67.1899 48.9185C67.4494 48.2928 67.6906 47.6576 67.9128 47.0136L70.0397 47.7475C69.8026 48.4348 69.5452 49.1126 69.2683 49.7804ZM70.6861 45.6711L68.5185 45.068C68.6999 44.4159 68.8622 43.7559 69.0048 43.0885L71.2052 43.5586C71.053 44.2708 70.8798 44.9752 70.6861 45.6711ZM71.595 41.4182L69.3702 41.0824C69.471 40.4143 69.5523 39.7397 69.6134 39.059L71.8544 39.2602C71.7892 39.986 71.7025 40.7055 71.595 41.4182Z",fill:o})]})};t.Z=o},74190:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(85817);let a=e=>(0,n.jsxs)(r.Z,{viewBox:"0 0 24 24",...e,children:[(0,n.jsx)("path",{d:"M5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7V18C3 19.1046 3.89543 20 5 20H20C20.5523 20 21 19.5523 21 19C21 18.4477 20.5523 18 20 18H5V7Z"}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M19 17H7C6.44772 17 6 16.5523 6 16V12C6 11.4477 6.44772 11 7 11H10V10C10 9.44772 10.4477 9 11 9H14V7C14 6.44772 14.4477 6 15 6H19C19.5523 6 20 6.44772 20 7V16C20 16.5523 19.5523 17 19 17ZM16 8H18V15H16V8ZM12 15H14V11H12V15ZM10 13H8V15H10V13Z"})]});t.Z=a},71395:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(85817);let a=e=>(0,n.jsx)(r.Z,{viewBox:"0 0 24 24",...e,children:(0,n.jsx)("path",{d:"M4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V17C0 17.5523 0.447715 18 1 18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H23C23.5523 18 24 17.5523 24 17V16.43ZM16.24 13.65C15.07 13.13 13.63 12.75 12 12.75C10.37 12.75 8.93 13.14 7.76 13.65C6.68 14.13 6 15.21 6 16.39V17C6 17.5523 6.44772 18 7 18H17C17.5523 18 18 17.5523 18 17V16.39C18 15.21 17.32 14.13 16.24 13.65ZM8.07 16C8.16 15.77 8.2 15.61 8.98 15.31C9.95 14.93 10.97 14.75 12 14.75C13.03 14.75 14.05 14.93 15.02 15.31C15.79 15.61 15.83 15.77 15.93 16H8.07ZM12 8C12.55 8 13 8.45 13 9C13 9.55 12.55 10 12 10C11.45 10 11 9.55 11 9C11 8.45 11.45 8 12 8ZM12 6C10.34 6 9 7.34 9 9C9 10.66 10.34 12 12 12C13.66 12 15 10.66 15 9C15 7.34 13.66 6 12 6Z"})});t.Z=a},55258:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(27144),a=i(85817);let o=e=>{let t=(0,r.Fg)(),i=t.isDark?"#3C3742":"#e9eaeb",o=t.isDark?"#666171":"#bdc2c4";return(0,n.jsxs)(a.Z,{viewBox:"0 0 32 32",...e,children:[(0,n.jsx)("path",{d:"M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z",fill:i}),(0,n.jsx)("mask",{id:"A","mask-type":"alpha",maskUnits:"userSpaceOnUse",x:"0",y:"0",width:"32",height:"32",children:(0,n.jsx)("path",{d:"M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0s16 7.163 16 16z",fill:"#c4c4c4"})}),(0,n.jsxs)("g",{mask:"url(#A)",children:[(0,n.jsx)("path",{d:"M25.128 16.436c0 3.115-4.133 5.641-9.231 5.641s-9.231-2.526-9.231-5.641V15h18.461v1.436zm2.205 13.806c0-3.815-5.074-6.908-11.333-6.908S4.667 26.426 4.667 30.242V32h22.667v-1.759z",fill:o}),(0,n.jsx)("path",{fillRule:"evenodd",d:"M10.234 5.601C9.942 4.264 10.96 3 12.328 3c1.184 0 2.143.959 2.143 2.143v3.873l1.427-.067c.589 0 1.166.034 1.724.098V5.143c0-1.184.959-2.143 2.143-2.143 1.368 0 2.386 1.264 2.093 2.601l-.931 4.258c2.529 1.006 4.201 2.749 4.201 4.731 0 3.115-4.133 5.641-9.231 5.641s-9.231-2.526-9.231-5.641c0-2.053 1.794-3.849 4.476-4.836l-.908-4.153z",fill:o}),(0,n.jsx)("ellipse",{cx:"12.308",cy:"14.846",rx:"1.026",ry:"1.538",fill:i}),(0,n.jsx)("ellipse",{cx:"19.385",cy:"14.846",rx:"1.026",ry:"1.538",fill:i})]})]})};t.Z=o},7133:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(85817);let a=e=>(0,n.jsxs)(r.Z,{viewBox:"0 0 24 24",...e,children:[(0,n.jsx)("path",{d:"M3.18731 5.68438C2.44993 5.52604 2.44993 4.47393 3.18731 4.31559L5.3203 3.85755C5.58957 3.79973 5.79991 3.58939 5.85774 3.32012L6.31577 1.18713C6.47411 0.449748 7.52622 0.449751 7.68457 1.18713L8.1426 3.32012C8.20042 3.58939 8.41076 3.79973 8.68003 3.85755L10.813 4.31559C11.5504 4.47393 11.5504 5.52604 10.813 5.68438L8.68003 6.14241C8.41076 6.20024 8.20042 6.41058 8.1426 6.67985L7.68457 8.81284C7.52622 9.55022 6.47411 9.55022 6.31577 8.81284L5.85774 6.67985C5.79991 6.41058 5.58957 6.20024 5.3203 6.14241L3.18731 5.68438Z"}),(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M12 2.99998C15.866 2.99998 19 6.13399 19 9.99998C19 13.866 15.866 17 12 17C8.13401 17 5 13.866 5 9.99998C5 9.4477 4.55228 8.99998 4 8.99998C3.44772 8.99998 3 9.4477 3 9.99998C3 12.8894 4.36163 15.4608 6.47822 17.1075L5.58579 18C5.21071 18.3751 5 18.8838 5 19.4142V21.5C5 22.3284 5.67157 23 6.5 23H17.5C18.3284 23 19 22.3284 19 21.5V19.4142C19 18.8838 18.7893 18.3751 18.4142 18L17.5218 17.1075C19.6384 15.4608 21 12.8894 21 9.99998C21 5.02942 16.9706 0.999985 12 0.999985C11.4477 0.999985 11 1.4477 11 1.99998C11 2.55227 11.4477 2.99998 12 2.99998ZM12 19C10.6564 19 9.38156 18.7056 8.23649 18.1777L7 19.4142L7 21H17V19.4142L15.7635 18.1777C14.6184 18.7056 13.3436 19 12 19Z"})]});t.Z=a},90430:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(85817);let a=e=>(0,n.jsx)(r.Z,{viewBox:"0 0 24 24",...e,children:(0,n.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M1.4144 13.4824L9.36944 5.52736L10.0765 6.23446C10.3694 6.52736 10.8443 6.52736 11.1372 6.23446C11.4301 5.94157 11.4301 5.4667 11.1372 5.1738L10.4301 4.4667L12.7281 2.16869C13.5092 1.38764 14.7755 1.38764 15.5565 2.16869L16.6173 3.22943C16.8125 3.42465 16.8125 3.74115 16.6173 3.93637C15.641 4.91268 15.641 6.49559 16.6173 7.4719C17.5936 8.44821 19.1765 8.44821 20.1528 7.4719C20.348 7.27669 20.6645 7.27669 20.8597 7.4719L21.9205 8.53265C22.7015 9.3137 22.7015 10.58 21.9205 11.3611L19.6224 13.6592L18.9153 12.9521C18.6224 12.6592 18.1475 12.6592 17.8546 12.9521C17.5617 13.245 17.5617 13.7198 17.8546 14.0127L18.5617 14.7198L10.6068 22.6748C9.82574 23.4558 8.55941 23.4558 7.77836 22.6748L6.7177 21.6141C6.52244 21.4189 6.52244 21.1023 6.7177 20.907C7.69401 19.9307 7.69401 18.3478 6.7177 17.3715C5.74139 16.3952 4.15848 16.3952 3.18217 17.3715C2.9869 17.5667 2.67032 17.5667 2.47506 17.3715L1.4144 16.3108C0.633351 15.5298 0.633351 14.2634 1.4144 13.4824ZM13.2584 7.29521C12.9655 7.00232 12.4907 7.00232 12.1978 7.29521C11.9049 7.5881 11.9049 8.06298 12.1978 8.35587L12.9049 9.06298C13.1978 9.35587 13.6727 9.35587 13.9655 9.06298C14.2584 8.77009 14.2584 8.29521 13.9655 8.00232L13.2584 7.29521ZM15.0262 10.1236C15.3191 9.83075 15.794 9.83074 16.0869 10.1236L16.794 10.8307C17.0869 11.1236 17.0869 11.5985 16.794 11.8914C16.5011 12.1843 16.0262 12.1843 15.7333 11.8914L15.0262 11.1843C14.7333 10.8914 14.7333 10.4165 15.0262 10.1236Z"})});t.Z=a},72314:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(85817);let a=e=>(0,n.jsx)(r.Z,{viewBox:"0 0 24 24",...e,children:(0,n.jsx)("path",{d:"M12 6.49999C14.76 6.49999 17 8.73999 17 11.5C17 12.01 16.9 12.5 16.76 12.96L19.82 16.02C21.21 14.79 22.31 13.25 23 11.49C21.27 7.10999 17 3.99999 12 3.99999C10.73 3.99999 9.51 4.19999 8.36 4.56999L10.53 6.73999C11 6.59999 11.49 6.49999 12 6.49999ZM2.71 3.15999C2.32 3.54999 2.32 4.17999 2.71 4.56999L4.68 6.53999C3.06 7.82999 1.77 9.52999 1 11.5C2.73 15.89 7 19 12 19C13.52 19 14.97 18.7 16.31 18.18L19.03 20.9C19.42 21.29 20.05 21.29 20.44 20.9C20.83 20.51 20.83 19.88 20.44 19.49L4.13 3.15999C3.74 2.76999 3.1 2.76999 2.71 3.15999ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 10.73 7.18 9.99999 7.49 9.35999L9.06 10.93C9.03 11.11 9 11.3 9 11.5C9 13.16 10.34 14.5 12 14.5C12.2 14.5 12.38 14.47 12.57 14.43L14.14 16C13.49 16.32 12.77 16.5 12 16.5ZM14.97 11.17C14.82 9.76999 13.72 8.67999 12.33 8.52999L14.97 11.17Z"})});t.Z=a},94663:function(e,t,i){"use strict";var n=i(97458);i(52983);var r=i(85817);let a=e=>(0,n.jsx)(r.Z,{viewBox:"0 0 24 24",...e,children:(0,n.jsx)("path",{d:"M12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 16.5C9.24 16.5 7 14.26 7 11.5C7 8.74 9.24 6.5 12 6.5C14.76 6.5 17 8.74 17 11.5C17 14.26 14.76 16.5 12 16.5ZM12 8.5C10.34 8.5 9 9.84 9 11.5C9 13.16 10.34 14.5 12 14.5C13.66 14.5 15 13.16 15 11.5C15 9.84 13.66 8.5 12 8.5Z"})});t.Z=a},5221:function(){},5971:function(){}},function(e){e.O(0,[6723,3406,2868,7276,2967,6721,5751,9774,2888,179],function(){return e(e.s=2668)}),_N_E=e.O()}]);
//# sourceMappingURL=index-0f40a9c120eb2c19.js.map