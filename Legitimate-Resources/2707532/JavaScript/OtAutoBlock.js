!function(){function h(b){for(var k,a,e,d,c=[],f=0;f<q.length;f++){var n=q[f];if(n.Tag===b){c=n.CategoryId;break}var g=(k=n.Tag,d=e=a=void 0,a=-1!==(d=k).indexOf("http:")?d.replace("http:",""):d.replace("https:",""),-1!==(e=a.indexOf("?"))?a.replace(a.substring(e),""):a);if(b&&(-1!==b.indexOf(g)||-1!==n.Tag.indexOf(b))){c=n.CategoryId;break}}if(!c.length&&t){var u=function(a){var c=document.createElement("a");c.href=a;a=c.hostname.split(".");return-1!==a.indexOf("www")||2<a.length?a.slice(1).join("."):
c.hostname}(b);v.some(function(a){return a===u})&&(c=["C0004"])}return c}function g(b){return b&&window.OptanonActiveGroups&&b.every(function(b){return-1!==window.OptanonActiveGroups.indexOf(b)})}function l(b){return-1!==(b.getAttribute("class")||"").indexOf("optanon-category")}function m(b){return b.hasAttribute("data-ot-ignore")}var q=JSON.parse('[{"Host":"co.uk","Tag":"https://www.google-analytics.com/analytics.js","CategoryId":["C0002"]},{"Host":"3lift.com","Tag":"https://eb2.3lift.com/xuid","CategoryId":["C0004"]},{"Host":"openx.net","Tag":"https://us-u.openx.net/w/1.0/sd","CategoryId":["C0004"]},{"Host":"metrobankonline.co.uk","Tag":"https://connect.facebook.net/signals/config/282706273476838","CategoryId":["C0004"]},{"Host":"yahoo.com","Tag":"https://ads.yahoo.com/cms/v1","CategoryId":["C0004"]},{"Host":"pubmatic.com","Tag":"https://simage2.pubmatic.com/AdServer/Pug","CategoryId":["C0004"]},{"Host":"metrobankonline.co.uk","Tag":"https://www.google-analytics.com/analytics.js","CategoryId":["C0002"]},{"Host":"twitter.com","Tag":"https://analytics.twitter.com/i/adsct","CategoryId":["C0004"]},{"Host":"outbrain.com","Tag":"https://sync.outbrain.com/cookie-sync","CategoryId":["C0004"]},{"Host":"apply.metrobankonline.co.uk","Tag":"https://apply.metrobankonline.co.uk/apply/polyfills.98281e217702f35b0560.js","CategoryId":["C0003"]},{"Host":"metrobankonline.co.uk","Tag":"https://www.googletagmanager.com/gtag/js","CategoryId":["C0002"]},{"Host":"bing.com","Tag":"https://bat.bing.com/bat.js","CategoryId":["C0004"]},{"Host":"co.uk","Tag":"https://script.hotjar.com/modules.385e5029655a846359a5.js","CategoryId":["C0002"]},{"Host":"adroll.com","Tag":"https://d.adroll.com/consent/check/QL76PGRETZDCZIHWBYU47U","CategoryId":["C0004"]},{"Host":"co.uk","Tag":"https://apply.metrobankonline.co.uk/apply/polyfills.98281e217702f35b0560.js","CategoryId":["C0002"]},{"Host":"co.uk","Tag":"https://apply.metrobankonline.co.uk/personal/polyfills-es2015.0796a616689bfd8faa3f.js","CategoryId":["C0004"]},{"Host":"apply.metrobankonline.co.uk","Tag":"https://d.adroll.com/consent/check/QL76PGRETZDCZIHWBYU47U","CategoryId":["C0004"]},{"Host":"bidswitch.net","Tag":"https://x.bidswitch.net/sync","CategoryId":["C0004"]},{"Host":"d.adroll.com","Tag":"https://d.adroll.com/consent/check/QL76PGRETZDCZIHWBYU47U","CategoryId":["C0004"]},{"Host":"co.uk","Tag":"https://www.googletagmanager.com/gtag/js","CategoryId":["C0002"]},{"Host":"metrobankonline.co.uk","Tag":"https://script.hotjar.com/modules.385e5029655a846359a5.js","CategoryId":["C0002"]},{"Host":"metrobankonline.co.uk","Tag":"https://apply.metrobankonline.co.uk/personal/polyfills-es2015.0796a616689bfd8faa3f.js","CategoryId":["C0002","C0004"]},{"Host":"ads.linkedin.com","Tag":"https://px.ads.linkedin.com/collect","CategoryId":["C0004"]},{"Host":"apply.metrobankonline.co.uk","Tag":"https://apply.metrobankonline.co.uk/apply/assets/favicon/metro256x256.png","CategoryId":["C0003"]},{"Host":"www.facebook.com","Tag":"https://www.facebook.com/tr/","CategoryId":["C0004"]},{"Host":"casalemedia.com","Tag":"https://dsum-sec.casalemedia.com/rum","CategoryId":["C0004"]},{"Host":"taboola.com","Tag":"https://sync.taboola.com/sg/adroll-network/1/rtb-h","CategoryId":["C0004"]},{"Host":"co.uk","Tag":"https://connect.facebook.net/signals/config/282706273476838","CategoryId":["C0004"]},{"Host":"adnxs.com","Tag":"https://ib.adnxs.com/bounce","CategoryId":["C0004"]},{"Host":"metrobankonline.co.uk","Tag":"https://apply.metrobankonline.co.uk/apply/polyfills.98281e217702f35b0560.js","CategoryId":["C0002","C0003"]},{"Host":"linkedin.com","Tag":"https://www.linkedin.com/px/li_sync","CategoryId":["C0004"]},{"Host":"doubleclick.net","Tag":"https://cm.g.doubleclick.net/pixel","CategoryId":["C0004"]},{"Host":"metrobankonline.co.uk","Tag":"https://apply.metrobankonline.co.uk/personal/polyfills-es2015.28854ba084c0e2d833bb.js","CategoryId":["C0004"]},{"Host":"flashtalking.com","Tag":"https://servedby.flashtalking.com/segment/2/read/a","CategoryId":["C0004"]},{"Host":"www.linkedin.com","Tag":"https://www.linkedin.com/px/li_sync","CategoryId":["C0004"]},{"Host":"linkedin.com","Tag":"https://px.ads.linkedin.com/collect","CategoryId":["C0004"]},{"Host":"adnxs.com","Tag":"https://ib.adnxs.com/setuid","CategoryId":["C0004"]}]'),
t=JSON.parse("false"),v=[""],p=["embed","iframe","img","script"];(new MutationObserver(function(b){Array.prototype.forEach.call(b,function(b){Array.prototype.forEach.call(b.addedNodes,function(a){var c,b;if(1===a.nodeType&&-1!==p.indexOf(a.tagName.toLowerCase())&&!l(a)&&!m(a))if("script"===a.tagName.toLowerCase()){if((b=h(c=a.src||"")).length){var d=b.join("-");-1===(f=a.getAttribute("class")?a.getAttribute("class"):"").indexOf("optanon-category-"+d)&&a.setAttribute("class","optanon-category-"+d+
" "+f);g(b)||(a.type="text/plain");var e=function(b){"text/plain"===a.getAttribute("type")&&b.preventDefault();a.removeEventListener("beforescriptexecute",e)};a.addEventListener("beforescriptexecute",e)}}else if((b=h(c=a.src||"")).length){var f;d=b.join("-");-1===(f=a.getAttribute("class")?a.getAttribute("class"):"").indexOf("optanon-category-"+d)&&a.setAttribute("class","optanon-category-"+d+" "+f);g(b)||(a.removeAttribute("src"),a.setAttribute("data-src",c))}});var a=b.target;if(b.attributeName&&
(!l(a)||!m(a)))if("script"===a.nodeName.toLowerCase()){if((c=h(d=a.src||"")).length){b=c.join("-");-1===(f=a.getAttribute("class")?a.getAttribute("class"):"").indexOf("optanon-category-"+b)&&a.setAttribute("class","optanon-category-"+b+" "+f+" ");g(c)||(a.type="text/plain");var e=function(b){"text/plain"===a.getAttribute("type")&&b.preventDefault();a.removeEventListener("beforescriptexecute",e)};a.addEventListener("beforescriptexecute",e)}}else if(-1!==p.indexOf(b.target.nodeName.toLowerCase())){var d,
c;if((c=h(d=a.src||"")).length){var f;b=c.join("-");-1===(f=a.getAttribute("class")?a.getAttribute("class"):"").indexOf("optanon-category-"+b)&&a.setAttribute("class","optanon-category-"+b+" "+f);g(c)||(a.removeAttribute("src"),a.setAttribute("data-src",d))}}})})).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src"]});var r=document.createElement;document.createElement=function(){for(var b=[],k=0;k<arguments.length;k++)b[k]=arguments[k];if("script"!==b[0].toLowerCase()&&
-1===p.indexOf(b[0].toLowerCase()))return r.bind(document).apply(void 0,b);var a=r.bind(document).apply(void 0,b),e=a.setAttribute.bind(a);return Object.defineProperties(a,{src:{get:function(){return a.getAttribute("src")||""},set:function(d){var c="";"string"==typeof d?c=d:d instanceof Object&&(c=d.toString());c=h(c);!c.length||"script"!==b[0].toLowerCase()||l(a)||g(c)||m(a)?!c.length||-1===p.indexOf(b[0].toLowerCase())||l(a)||g(c)||m(a)?e("src",d):(a.removeAttribute("src"),e("data-src",d),a.getAttribute("class")||
e("class","optanon-category-"+c)):(e("type","text/plain"),e("src",d));return!0}},type:{set:function(b){var c=h(a.src||"");b=!c.length||l(a)||g(c)||m(a)?b:"text/plain";return e("type",b),!0}},class:{set:function(b){var c=h(a.src);!c.length||l(a)||g(c)||m(a)?e("class",b):(c=c.join("-"),e("class","optanon-category-"+c+" "+b));return!0}}}),a.setAttribute=function(b,c,f){"type"!==b&&"src"!==b||f?e(b,c):a[b]=c},a}}();