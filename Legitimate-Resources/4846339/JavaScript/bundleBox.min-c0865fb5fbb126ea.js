dla.helper.createNamespace("dla.syndicates.bundleBox"),dla.syndicates.bundleBox=function(e){var t=e.bundleId,s=e.$box,a=e.maxShares,n=e.cartRelativePath,i=e.price,r={shares:1,duration:1,subscription:!1};function d(e,t){""===e?r.shares=t?1:0:!isNaN(e)&&c(parseInt(e,10))}function o(){dla.helper.scrollToIfHidden(".js-subscribe-message")}function c(e){r.shares=e<1?1:e>a?a:e}function u(e){c(r.shares+e)}function l(){return n+"?tickets=BU;"+t+";"+r.shares+";"+(r.subscription?1:0)+";"+r.duration}function h(){return i*r.shares*r.duration}function f(){var e;s.find(".js-shares-input").val(0===r.shares?"":r.shares),s.find(".js-total-shares").text(r.shares),s.find(".js-total-shares-one").toggle(1===r.shares),s.find(".js-total-shares-many").toggle(r.shares>1),s.find(".js-total-shares-price").text((function(e,t){return function(e,t){var s=h(),a=/[\d\s,.]+\d{2}/.exec(t)[0],n=a.substr(0,a.length-3),i=/[\s,.]/.exec(n)[0]||"",r=a[a.length-3],d=Math.floor(s/100).toString().replace(/\B(?=(\d{3})+(?!\d))/g,i),o=(s/100).toFixed(2).toString();return o=o.substr(o.length-2),e.replace(/\d[\d\s,.]+\d/g,d+r+o)}(t,s.find(".js-total-shares-price-example").text())})),p(),e=s.find(".js-bundleBox-check"),r.subscription?e.addClass("active"):e.removeClass("active"),function(){$(this).hasClass("active")||s.find(".js-duration-box").each((function(e,t){var s=$(t);s.data("weeks")===r.duration?s.addClass("active"):s.removeClass("active")}))}(),s.find(".js-syndicate-submit").toggleClass("disabled",0===r.shares),s.find(".js-syndicate-submit").attr("href",l())}function b(){const e=document.querySelector(".js-bundle-betting-box-total"),t=e&&e.dataset?e.dataset:{totalSharesOneText:"Share",totalSharesManyText:"Shares"};return 0===r.shares||1===r.shares?`${r.shares} ${t.totalSharesOneText}`:`${r.shares} ${t.totalSharesManyText}`}function g(){const e=document.querySelector(".js-bundle-betting-box-total");return(e&&e.dataset?e.dataset:{syndicateTitle:""}).syndicateTitle}function p(){s.hasClass("l-bundle-betting-box")&&r.shares>0&&window.dispatchEvent(new CustomEvent("productChange",{detail:{type:"syndicates",name:g(),summary:b(),total:h(),ticket:{type:"bundle",id:t,shares:r.shares,duration:r.duration,subscription:r.subscription},status:{valid:r.shares>0}}}))}return{init:function(){f(),s.find(".js-shares-minus").click((function(){u(-1),f()})),s.find(".js-shares-plus").click((function(){u(1),f()})),s.find(".js-bundleBox-check").click((function(){r.subscription=!r.subscription;var e=s.find(".js-duration-legend");$(this).is(":checked")?e.text(dla.messages.get("syndicates_detail_billingPeriod_weeks")):e.text(dla.messages.get("syndicates_detail_duration_weeks")),f()})),s.find(".js-duration-box").click((function(){r.duration=$(this).data("weeks"),f()})),s.find(".js-subscribe-info").click(o).mouseover(o),s.find(".js-shares-input").keyup((function(e){d(e.target.value,!1),f()})).change((function(e){d(e.target.value,!1),f()})).blur((function(e){d(e.target.value,!0),f()})).bind("copy paste",(function(e){return e.preventDefault(),!1})),p()}}},$(window).trigger("available","syndicatesBundleBoxJsLoaded");