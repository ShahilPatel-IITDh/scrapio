"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6721],{48084:function(t,e,r){r.d(e,{Ck:function(){return l},ND:function(){return i},eQ:function(){return c},fq:function(){return o},v9:function(){return n},yg:function(){return u}});var a=r(86066);let l=.97,o=3*a.hJ,n=5,i=2,u=200,c=10},61251:function(t,e,r){r.d(e,{ub:function(){return Z},x4:function(){return l},VW:function(){return S},oO:function(){return tr},t$:function(){return te},Fr:function(){return R},jG:function(){return j},fq:function(){return H},HJ:function(){return W},Tq:function(){return x},n:function(){return z},s9:function(){return V},D:function(){return G},yz:function(){return q},$8:function(){return J},yn:function(){return U},CM:function(){return M},a8:function(){return Y},D5:function(){return Q},WB:function(){return tt},ld:function(){return L},r3:function(){return K}});var a,l,o=r(22321),n=r(90624),i=r(52832),u=r(51478),c=r(67839),s=r(896),d=r(20030);let B=`
  id
  epoch
  position
  failed
  startAt
  startBlock
  startHash
  lockAt
  lockBlock
  lockHash
  lockPrice
  lockRoundId
  closeAt
  closeBlock
  closeHash
  closePrice
  closeRoundId
  totalBets
  totalAmount
  bullBets
  bullAmount
  bearBets
  bearAmount
`,m=`
 id
 hash  
 amount
 position
 claimed
 claimedAt
 claimedHash
 claimedBlock
 claimedBNB
 claimedNetBNB
 createdAt
 updatedAt
`,p=`
  id
  createdAt
  updatedAt
  block
  totalBets
  totalBetsBull
  totalBetsBear
  totalBNB
  totalBNBBull
  totalBNBBear
  totalBetsClaimed
  totalBNBClaimed
  winRate
  averageBNB
  netBNB
`,A=`
  id
  epoch
  position
  failed
  startAt
  startBlock
  startHash
  lockAt
  lockBlock
  lockHash
  lockPrice
  lockRoundId
  closeAt
  closeBlock
  closeHash
  closePrice
  closeRoundId
  totalBets
  totalAmount
  bullBets
  bullAmount
  bearBets
  bearAmount
`,f=`
 id
 hash  
 amount
 position
 claimed
 claimedAt
 claimedHash
 claimedBlock
 claimedCAKE
 claimedNetCAKE
 createdAt
 updatedAt
`,N=`
  id
  createdAt
  updatedAt
  block
  totalBets
  totalBetsBull
  totalBetsBear
  totalCAKE
  totalCAKEBull
  totalCAKEBear
  totalBetsClaimed
  totalCAKEClaimed
  winRate
  averageCAKE
  netCAKE
`,g=t=>"CAKE"===t?A:B,h=t=>"CAKE"===t?f:m,k=t=>"CAKE"===t?N:p;var b=r(48084);let C=t=>{if(null===t)return null;let e=Number(t);return Number.isNaN(e)?null:e},w=t=>"Bull"===t?i.Tu.BULL:"Bear"===t?i.Tu.BEAR:"House"===t?i.Tu.HOUSE:null,E=(t,e)=>{let{id:r,epoch:a,failed:l,position:o,startAt:n,startBlock:i,startHash:u,lockAt:c,lockBlock:s,lockHash:d,lockPrice:B,lockRoundId:m,closeAt:p,closeBlock:A,closeHash:f,closePrice:N,closeRoundId:g,totalBets:h,totalAmount:k,bullBets:b,bullAmount:E,bearBets:$,bearAmount:v,bets:y=[]}=t;return{id:r,failed:l,startHash:u,lockHash:d,lockRoundId:m,closeRoundId:g,closeHash:f,position:w(o),epoch:C(a),startAt:C(n),startBlock:C(i),lockAt:C(c),lockBlock:C(s),lockPrice:B?parseFloat(B):0,closeAt:C(p),closeBlock:C(A),closePrice:N?parseFloat(N):0,totalBets:C(h),totalAmount:k?parseFloat(k):0,bullBets:C(b),bullAmount:E?parseFloat(E):0,bearBets:C($),bearAmount:v?parseFloat(v):0,bets:y.map(e)}},$=t=>({id:t.id,hash:t.hash,block:C(t.block),amount:t.amount?parseFloat(t.amount):0,position:"Bull"===t.position?i.Tu.BULL:i.Tu.BEAR,claimed:t.claimed,claimedAt:C(t.claimedAt),claimedBlock:C(t.claimedBlock),claimedHash:t.claimedHash,createdAt:C(t.createdAt),updatedAt:C(t.updatedAt),claimedNetBNB:0,claimedBNB:0}),v=t=>{let{id:e,createdAt:r,updatedAt:a,block:l,totalBets:o,totalBetsBull:n,totalBetsBear:i,totalBetsClaimed:u,winRate:c}=t||{};return{id:e,createdAt:C(r),updatedAt:C(a),block:C(l),totalBets:C(o),totalBetsBull:C(n),totalBetsBear:C(i),totalBetsClaimed:C(u),winRate:c?parseFloat(c):0,totalBNB:0,totalBNBBull:0,totalBNBBear:0,totalBNBClaimed:0,averageBNB:0,netBNB:0}},y=t=>{let e=$(t),r={...e,claimedBNB:t.claimedCAKE?parseFloat(t.claimedCAKE):0,claimedNetBNB:t.claimedNetCAKE?parseFloat(t.claimedNetCAKE):0};return t.user&&(r.user=F(t.user)),t.round&&(r.round=E(t.round,y)),r},F=t=>{let e=v(t),{totalCAKE:r,totalCAKEBull:a,totalCAKEBear:l,totalCAKEClaimed:o,averageCAKE:n,netCAKE:i}=t||{};return{...e,totalBNB:r?parseFloat(r):0,totalBNBBull:a?parseFloat(a):0,totalBNBBear:l?parseFloat(l):0,totalBNBClaimed:o?parseFloat(o):0,averageBNB:n?parseFloat(n):0,netBNB:i?parseFloat(i):0}},I=t=>{let e=$(t),r={...e,claimedBNB:t.claimedBNB?parseFloat(t.claimedBNB):0,claimedNetBNB:t.claimedNetBNB?parseFloat(t.claimedNetBNB):0};return t.user&&(r.user=T(t.user)),t.round&&(r.round=E(t.round,I)),r},T=t=>{let e=v(t),{totalBNB:r,totalBNBBull:a,totalBNBBear:l,totalBNBClaimed:o,averageBNB:n,netBNB:i}=t||{};return{...e,totalBNB:r?parseFloat(r):0,totalBNBBull:a?parseFloat(a):0,totalBNBBear:l?parseFloat(l):0,totalBNBClaimed:o?parseFloat(o):0,averageBNB:n?parseFloat(n):0,netBNB:i?parseFloat(i):0}},P=t=>t?BigInt(t):null,S=t=>({...t,bearAmount:P(t.bearAmount),bullAmount:P(t.bullAmount),totalAmount:P(t.totalAmount),lockPrice:P(t.lockPrice),closePrice:P(t.closePrice),rewardBaseCalAmount:P(t.rewardBaseCalAmount),rewardAmount:P(t.rewardAmount)}),D=(0,s.z2)({chainId:d.a_.BSC});(a=l||(l={})).WIN="win",a.LOSE="lose",a.CANCELED="canceled",a.HOUSE="house",a.LIVE="live";let L=t=>"CAKE"===t?y:I,K=t=>"CAKE"===t?F:T,q=(t,e)=>{let{round:r}=t;if(r.failed)return l.CANCELED;if(r.epoch>=e-1)return l.LIVE;if(t.round.position===i.Tu.HOUSE)return l.HOUSE;let a=r.closePrice>r.lockPrice?i.Tu.BULL:i.Tu.BEAR;return t.position===a?l.WIN:l.LOSE},H=(t,e)=>{switch(e){case i.dZ.COLLECTED:return t.filter(t=>!0===t.claimed);case i.dZ.UNCOLLECTED:return t.filter(t=>!t.claimed&&(t.position===t.round.position||!0===t.round.failed));case i.dZ.ALL:default:return t}},O=(t,e)=>{let r=t[`total${e}`]?parseFloat(t[`total${e}`]):0,a=t[`total${e}Treasury`]?parseFloat(t[`total${e}Treasury`]):0;return Math.max(r-a,0)},U=async()=>{let[{market:t,market:e}]=await Promise.all([(0,o.request)(n.GZ,o.gql`
        query getTotalWonData {
          market(id: 1) {
            totalBNB
            totalBNBTreasury
          }
        }
      `),(0,o.request)(n.fO,o.gql`
        query getTotalWonData {
          market(id: 1) {
            totalCAKE
            totalCAKETreasury
          }
        }
      `)]),r=O(t,"BNB"),a=O(e,"CAKE");return{totalWonBNB:r,totalWonCAKE:a}},R=async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3?arguments[3]:void 0,l=arguments.length>4?arguments[4]:void 0,n=await (0,o.request)(a,o.gql`
      query getBetHistory($first: Int!, $skip: Int!, $where: Bet_filter) {
        bets(first: $first, skip: $skip, where: $where, orderBy: createdAt, orderDirection: desc) {
          ${h(l)}
          round {
            ${g(l)}
          }
          user {
            ${k(l)}
          }
        }
      }
    `,{first:e,skip:r,where:t});return n.bets},x=async(t,e,r)=>{let a=await D.multicall({contracts:e.map(e=>({address:r,abi:c.s,functionName:"ledger",args:[BigInt(e),t]})),allowFailure:!1});return a.map(t=>({position:t[0],amount:t[1],claimed:t[2]}))},Z=20,_={skip:0,first:Z,orderBy:"createdAt",orderDir:"desc"},W=(t,e,r)=>{if(!t){let t=(e+r)*1e3;if(Number.isFinite(t))return Date.now()>t}return!1},G=async function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,{first:a,skip:l,where:n,orderBy:i,orderDir:u}={..._,...t},c=await (0,o.request)(e,o.gql`
      query getUsers($first: Int!, $skip: Int!, $where: User_filter, $orderBy: User_orderBy, $orderDir: OrderDirection) {
        users(first: $first, skip: $skip, where: $where, orderBy: $orderBy, orderDirection: $orderDir) {
          ${k(r)}
        }
      }
    `,{first:a,skip:l,where:n,orderBy:i,orderDir:u});return c.users},V=async(t,e,r)=>{let a=await (0,o.request)(e,o.gql`
      query getUser($id: ID!) {
        user(id: $id) {
          ${k(r)}
        }
      }
  `,{id:t.toLowerCase()});return a.user},j=async(t,e,r)=>{let a=await D.multicall({contracts:e.map(e=>({address:r,abi:c.s,functionName:"claimable",args:[BigInt(e),t]})),allowFailure:!1});return a.reduce((t,r,a)=>{let l=e[a];return{...t,[l]:r}},{})},z=async t=>{let[e,r,a,l]=await D.multicall({contracts:[{address:t,abi:c.s,functionName:"currentEpoch"},{address:t,abi:c.s,functionName:"intervalSeconds"},{address:t,abi:c.s,functionName:"minBetAmount"},{address:t,abi:c.s,functionName:"paused"}],allowFailure:!1});return{status:l?i.Gw.PAUSED:i.Gw.LIVE,currentEpoch:Number(e),intervalSeconds:Number(r),minBetAmount:a.toString()}},J=async(t,e)=>{let r=await D.multicall({contracts:t.map(t=>({address:e,abi:c.s,functionName:"rounds",args:[BigInt(t)]})),allowFailure:!1});return r.map(t=>({epoch:t[0],startTimestamp:t[1],lockTimestamp:t[2],closeTimestamp:t[3],lockPrice:t[4],closePrice:t[5],lockOracleId:t[6],closeOracleId:t[7],totalAmount:t[8],bullAmount:t[9],bearAmount:t[10],rewardBaseCalAmount:t[11],rewardAmount:t[12],oracleCalled:t[13]}))},M=(t,e)=>({epoch:t,startTimestamp:e,lockTimestamp:null,closeTimestamp:null,lockPrice:null,closePrice:null,totalAmount:"0",bullAmount:"0",bearAmount:"0",rewardBaseCalAmount:"0",rewardAmount:"0",oracleCalled:!1,lockOracleId:null,closeOracleId:null}),Q=t=>t.reduce((t,e)=>({...t,[e.epoch.toString()]:e}),{}),X=t=>({position:0===t.position?i.Tu.BULL:i.Tu.BEAR,amount:t.amount.toString(),claimed:t.claimed}),Y=(t,e,r)=>e.reduce((e,a,l)=>{if(!a||0n===a.amount)return e;let o=r[l].toString();return{...e,[t]:{...e[t],[o]:X(a)}}},{}),tt=t=>{let{epoch:e,startTimestamp:r,lockTimestamp:a,closeTimestamp:l,lockPrice:o,closePrice:n,totalAmount:i,bullAmount:u,bearAmount:c,rewardBaseCalAmount:s,rewardAmount:d,oracleCalled:B,lockOracleId:m,closeOracleId:p}=t;return{oracleCalled:B,epoch:Number(e),startTimestamp:0n===r?null:Number(r),lockTimestamp:0n===a?null:Number(a),closeTimestamp:0n===l?null:Number(l),lockPrice:0n===o?null:o.toString(),closePrice:0n===n?null:n.toString(),totalAmount:i.toString(),bullAmount:u.toString(),bearAmount:c.toString(),rewardBaseCalAmount:s.toString(),rewardAmount:d.toString(),lockOracleId:m.toString(),closeOracleId:p.toString()}},te=async(t,e)=>{try{let r=(0,u.en)(e),a=await r.read.getUserRoundsLength([t]);return a}catch{return 0n}},tr=async function(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:b.yg,a=arguments.length>3?arguments[3]:void 0,l=(0,u.en)(a);try{let[a,o]=await l.read.getUserRounds([t,BigInt(e),BigInt(r)]);return a.reduce((t,e,r)=>({...t,[e.toString()]:X(o[r])}),{})}catch{return null}}},7905:function(t,e,r){r.d(e,{Z:function(){return B}});var a=r(97458);r(52983);var l=r(27144),o=r(13729),n=r(57571),i=r(25149);let u=t=>{let{isActive:e,isSuccess:r,isWarning:a,borderBackground:l,theme:o}=t;return l||(a?o.colors.warning:r?o.colors.success:e?`linear-gradient(180deg, ${o.colors.primaryBright}, ${o.colors.secondary})`:o.colors.cardBorder)},c=l.ZP.div.withConfig({componentId:"sc-69ac18f9-0"})`
  background: ${u};
  border-radius: ${t=>{let{theme:e}=t;return e.radii.card}};
  color: ${t=>{let{theme:e,isDisabled:r}=t;return e.colors[r?"textDisabled":"text"]}};
  overflow: hidden;
  position: relative;

  ${t=>{let{isActive:e}=t;return e&&l.iv`
      animation: ${n.DS} 3s ease infinite;
      background-size: 400% 400%;
    `}}

  padding: 1px 1px 3px 1px;

  ${o.Dh}
`,s=(0,l.ZP)(i.ZP).withConfig({componentId:"sc-69ac18f9-1"})`
  width: 100%;
  height: 100%;
  overflow: ${t=>{let{hasCustomBorder:e}=t;return e?"initial":"inherit"}};
  background: ${t=>{let{theme:e,background:r}=t;return null!=r?r:e.card.background}};
  border-radius: ${t=>{let{theme:e}=t;return e.radii.card}};
`;c.defaultProps={isActive:!1,isSuccess:!1,isWarning:!1,isDisabled:!1};let d=t=>{let{ribbon:e,children:r,background:l,...o}=t;return(0,a.jsx)(c,{...o,children:(0,a.jsxs)(s,{background:l,hasCustomBorder:!!o.borderBackground,children:[e,r]})})};var B=d},98245:function(t,e,r){var a=r(27144),l=r(13729);let o=a.ZP.div.withConfig({componentId:"sc-7199f2b4-0"})`
  ${l.Dh}
`;o.defaultProps={p:["16px",null,"24px"]},e.Z=o}}]);
//# sourceMappingURL=6721-065a34f98c0f07be.js.map