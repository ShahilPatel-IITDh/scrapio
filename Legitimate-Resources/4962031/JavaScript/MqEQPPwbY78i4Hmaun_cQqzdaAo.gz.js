var FeedRender;(function(n){function o(n){return"".concat(n,"px")}function wt(){u=_qs(r.DenseGridContainerSelector);l=t.WfLayoutConf_hGap;k=_qs("div.dgc_sep");d=_ge(r.DenseGridWrapperId)||_d.documentElement;h=[];i=[];s=[]}function dt(){var n=_d.createElement("ul"),t=i.length+1;return n.setAttribute("id","mmComponent_images_1_list_".concat(t)),n.setAttribute("data-col","".concat(t)),n.setAttribute(r.MutationObserverFlag,"1"),n.classList.add("dgControl_list"),n}function y(){if(!u)return null;return{id:"feedResultsContainer",width:u.clientWidth,setWidth:function(n){u.style.width=o(n)},setHeight:function(n){u.style.height=o(n)}}}function ot(){return e=e||ct()}function st(n){var u,t=0,i=0,h,f,e,r,o,s;try{h=(u=_qs(".iusc",n))===null||u===void 0?void 0:u.getAttribute("m");f=JSON.parse(h);t=f.h;i=f.w}catch(l){}finally{(t<=0||i<=0)&&(e=_qs(c,n),t=e.height,i=e.width)}return g&&(r=1,o=Math.max(t,i),o>b&&(r=b/o),s=t*i,s>w&&(r=Math.min(r,Math.sqrt(w/s))),r<1&&(t=Math.round(r*t),i=Math.round(r*i))),{width:i,height:t,render:kt(n)}}function gt(n){var i,u,f=y(),e,s,t,o,h;n&&f&&(n.setAttribute(r.MutationObserverFlag,"1"),e="fdsim",s=(i=n.classList)===null||i===void 0?void 0:i.contains(e),s?(n.classList.remove(e),n.classList.add("fdsimf"),t=n===null||n===void 0?void 0:n.parentElement,t&&(o=(u=getComputedStyle(t))===null||u===void 0?void 0:u.width,et(n,o,parseInt(o)),sb_st(function(){WfPlanner.adjustColumnHeight(f,+t.dataset.col-1,n.clientHeight)},1e3))):(h=new Array(st(n)),WfPlanner.planItems(f,ot(),h)))}function ht(){for(var t,n=f+1;n<i.length;n++)(t=i[n].parentElement)===null||t===void 0?void 0:t.removeChild(i[n]);i.splice(f+1)}function ni(n){[].forEach.call(n.querySelectorAll(".infact > a"),function(n){n.setAttribute("role","button");n.getAttribute("href").indexOf("dtmnu")>0&&(n.setAttribute("aria-label",n.title),n.setAttribute("aria-expanded","false"))})}function ti(n){var t=Math.max(pt,tt);return n.height>t?(n.height=t,!0):!1}function p(n){var t=n.querySelector(c);t&&(it&&ti(t)&&n.classList.add("fdsnimgs"),ni(n),h.push(n),gt(n))}function ii(n){return s=[],n.forEach(function(n){s.push(st(n))}),s}function ri(){var i=_ge("dtfe"),n,r;g=(i===null||i===void 0?void 0:i.getAttribute("data-szcst"))==="1";n=fi(i,"data-cfg");n&&(t.WfLayoutConf_hGap=n.hGap||t.WfLayoutConf_hGap,t.WfLayoutConf_vGap=n.vGap||t.WfLayoutConf_vGap,t.WfLayoutConf_hMinGap=n.hMinGap||t.WfLayoutConf_hMinGap,t.WfLayoutConf_hMaxGap=n.hMaxGap||t.WfLayoutConf_hMaxGap,t.WfLayoutConf_maxColWidth=n.maxDim||t.WfLayoutConf_maxColWidth,t.WfLayoutConf_minColWidth=n.minDim||t.WfLayoutConf_minColWidth,t.WfLayoutConf_maxColCount=n.maxCols||t.WfLayoutConf_maxColCount,a=n.padding||a,v=n.disableGutter||v);r=+(i===null||i===void 0?void 0:i.dataset.mxh);r>0&&(tt=r,it=!0);rt=+(i===null||i===void 0?void 0:i.dataset.thres)>0}function ui(){e=ct()}function ct(){return{hGap:t.WfLayoutConf_hGap,vGap:t.WfLayoutConf_vGap,hMinGap:t.WfLayoutConf_hMinGap,hMaxGap:t.WfLayoutConf_hMaxGap,minColWidth:t.WfLayoutConf_minColWidth,maxColWidth:t.WfLayoutConf_maxColWidth,minItemHeight:t.WfLayoutConf_minItemHeight,minColCount:t.WfLayoutConf_minColCount,maxColCount:t.WfLayoutConf_maxColCount,gutter:t.WfLayoutConf_gutter}}function fi(n,t){var i;try{i=JSON.parse(n===null||n===void 0?void 0:n.getAttribute(t))}catch(r){return null}return i}function lt(){u.style.width=o(d.clientWidth+(v?0:-l-t.WfLayoutConf_hGap))}function ei(n,t){var i=+n.getAttribute(r.imageItemIdAttribute),u=+t.getAttribute(r.imageItemIdAttribute);return i&&u?i<u?-1:1:0}function at(){var t=_qs(r.RecentFollowCardSelector),n;t&&i&&i.length>0&&(n=i[i.length-1],n.insertBefore(t.parentElement,n.firstChild))}function vt(){if(t.WfLayoutConf_hMinGap&&t.WfLayoutConf_hMaxGap){var n=i.length;nt=e.hGap;i.forEach(function(t,i){i!=n-1&&(t.style.paddingRight=o(nt))});u.style.marginLeft=o(e.gutter)}}function yt(n){var s,c,o,e,v;if(wt(),u){for(n&&WfPlanner.reset(y()),ri(),s=_d.querySelectorAll(r.DenseGridColSelector),e=0;e<s.length;e++)i.push(s[e]);for(f=0,a||(l=t.WfLayoutConf_hGap),lt(),c=_d.querySelectorAll("".concat(r.DenseGridContainerSelector," ").concat(r.DenseGridItemSelector)),o=[],e=0;e<c.length;e++)o.push(c[e]);o.sort(ei);o.forEach(p);ht();vt();v=function(){var n=y();WfPlanner.reset(n);ui();ht();WfPlanner.planItems(n,ot(),ii(h))};sj_be(_w,"resize",function(){f=0;lt();v();vt();at();sj_evt.fire("Feed.Resize")});at();_w.fdpln=p}}var r=FeedConstants,h=[],i=[],w=62500,b=350,c="img.mimg",u,l=0,k,d,s=[],f=0,a=!1,v=!1,g=!0,nt=0,e,tt,it=!1,pt=_w.innerHeight*.8,rt=!1,ut=180,ft="crpttl",t={WfLayoutConf_hGap:20,WfLayoutConf_vGap:0,WfLayoutConf_minColWidth:150,WfLayoutConf_maxColWidth:214,WfLayoutConf_minItemHeight:0,WfLayoutConf_minColCount:2,WfLayoutConf_maxColCount:1e3,WfLayoutConf_hMaxGap:0,WfLayoutConf_hMinGap:0,WfLayoutConf_gutter:0},et=function(n,t,i){var u=n.querySelector(c),e=u.height,o=u.width,f;u.width=i;u.height=Math.floor(e/o*i);f=n.querySelector(".".concat(r.ImageItemWrapperClass));f.style.width=t;u.height<=ut&&f.classList.add(ft)},bt=function(n,t,i,r){var u=o(i);n.style.width=u;t.style.width=u;et(n,u,r)},kt=function(n){var t=_qs(".iuscp",n),r=t===null||t===void 0?void 0:t.classList.contains("fd-video-card"),e=r&&!rt;return function(r){var o;return r.dimIndex>=i.length&&(o=dt(),i.push(o),u.insertBefore(o,k)),r.conWidth!=n.clientWidth?bt(n,i[r.dimIndex],r.conWidth,e?r.conWidth:r.itemWidth):n.clientHeight<=ut&&t.classList.add(ft),r.dimIndex+1>f&&(f=r.dimIndex),i[r.dimIndex].appendChild(n),{width:r.conWidth,height:n.clientHeight}}};n.planItemsOnImageLoad=p;yt(!1);sj_evt.bind("Feed.Refresh",function(){yt(!0)})})(FeedRender||(FeedRender={}))