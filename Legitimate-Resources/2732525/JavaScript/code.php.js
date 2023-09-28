
var _paq = window._paq = window._paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);

(function() {
    var u="https://stitchology.me/stitchology/";
    _paq.push(['setTrackerUrl', u+'js/tracker.php']);
    _paq.push(['setSiteId', "194"]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.async=true; g.src=u+'js/tracker.php?s_revalidate='+Date.now(); s.parentNode.insertBefore(g,s);
})();



/*scrolling event*/
var doc_title = document.title;
var maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight; var percentagesArr = [25,50,75,100]; const showed = {}; let timeout; let previousPercentage; window.addEventListener("scroll", function (event) { var scrollVal = this.scrollY; var scrollPercentage = Math.round(scrollVal / maxScrollHeight * 100); let currentPercentage = 0; let i = 0; while(percentagesArr[i] <= scrollPercentage) { currentPercentage = percentagesArr[i++]; } if (previousPercentage !== currentPercentage) { clearTimeout(timeout); timeout = currentPercentage !== 0 && !showed[currentPercentage] ? setTimeout(() => { _paq.push(['trackEvent', 'scrolling', doc_title, currentPercentage+'%',currentPercentage]); showed[currentPercentage] = true; }, 500) : null; previousPercentage = currentPercentage; } }); window.addEventListener("resize", () => { maxScrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight; });

/*--Rage Clicks Detection Start-- */
(function (){ "use strict";var getSelectorFromTarget=function(target){var className=target.className!==""?"."+target.className:"";var targetId=target.id!==""?"#"+target.id:"";return[target.nodeName,className,targetId].join(" ")};var detectRageClicks=function(subscribe,_a){var interval=_a.interval,limit=_a.limit;var count=1;var countClear=setInterval((function(){count=1}),interval);var listener=function(event){if(count===limit){subscribe(getSelectorFromTarget(event.target),(function(){clearInterval(countClear);document.removeEventListener("click",listener)}))}count++};document.addEventListener("click",listener)}; detectRageClicks(function (target, unsubscribe) { window._paq.push(["trackEvent", "ClickTracking", "RageClick", target]); }, { interval: 750, limit: 3, }); })();
/*-- Rage Clicks Detection End-- */

/* -- Dead Clicks Detection Start-- */
(function (){ "use strict";var getSelectorFromTarget=function(target){var className=target.className!==""?"."+target.className:"";var targetId=target.id!==""?"#"+target.id:"";return[target.nodeName,className,targetId].join(" ")};var detectDeadClicks=function(subscribe,_a){var interval=_a.interval,limit=_a.limit;var clickCounts={};var countClear=setInterval((function(){clickCounts={}}),interval);var listener=function(event){var selector=getSelectorFromTarget(event.target);clickCounts[selector]=clickCounts[selector]?clickCounts[selector]+1:1;if(clickCounts[selector]===limit){subscribe(selector,(function(){clearInterval(countClear);document.removeEventListener("click",listener)}))}};document.addEventListener("click",listener)}; detectDeadClicks(function (target, unsubscribe) { window._paq.push(["trackEvent", "ClickTracking", "DeadClick", target]); }, { interval: 1000, limit: 2, }); })();
/*-- Dead Clicks Detection End--*/

/*-- Error Clicks Detection Start--*/
(function (){ "use strict";var getSelectorFromTarget=function(target){var className=target.className!==""?"."+target.className:"";var targetId=target.id!==""?"#"+target.id:"";return[target.nodeName,className,targetId].join(" ")};var detectErrorClicks=function(subscribe){var error;window.onerror=function(msg){error=msg};var listener=function(event){var selector=getSelectorFromTarget(event.target);setTimeout((function(){if(error){subscribe(selector,error,(function(){document.removeEventListener("click",listener)}))}error=undefined}),0)};document.addEventListener("click",listener)}; detectErrorClicks(function (target, error, unsubscribe) { window._paq.push(["trackEvent", "ClickTracking", "ErrorClick", target]); }, { interval: 1000, limit: 2, }); })();
/*-- Error Clicks Detection End--*/