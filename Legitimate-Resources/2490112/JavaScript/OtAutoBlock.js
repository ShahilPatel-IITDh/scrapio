!function(){function n(d){var g=[],a=[],f=function(c){for(var b={},e=0;e<z.length;e++){var h=z[e];if(h.Tag===c){b=h;break}var k=(r=h.Tag,t=x=l=void 0,l=-1!==(t=r).indexOf("http:")?t.replace("http:",""):t.replace("https:",""),-1!==(x=l.indexOf("?"))?l.replace(l.substring(x),""):l);if(c&&(-1!==c.indexOf(k)||-1!==h.Tag.indexOf(c))){b=h;break}}var r,l,x,t;return b}(d);return f.CategoryId&&(g=f.CategoryId),f.Vendor&&(a=f.Vendor.split(":")),!f.Tag&&D&&(a=g=function(c){var b=[],e=function(h){var k=document.createElement("a");
k.href=h;h=k.hostname.split(".");return-1!==h.indexOf("www")||2<h.length?h.slice(1).join("."):k.hostname}(c);y.some(function(h){return h===e})&&(b=["C0004"]);return b}(d)),{categoryIds:g,vsCatIds:a}}function A(d){return!d||!d.length||(d&&window.OptanonActiveGroups?d.every(function(g){return-1!==window.OptanonActiveGroups.indexOf(","+g+",")}):void 0)}function m(d,g){void 0===g&&(g=null);var a=window,f=a.OneTrust&&a.OneTrust.IsVendorServiceEnabled;a=f&&a.OneTrust.IsVendorServiceEnabled();return"Categories"===
u||"All"===u&&f&&!a?A(d):("Vendors"===u||"All"===u&&f&&a)&&A(g)}function p(d){d=d.getAttribute("class")||"";return-1!==d.indexOf("optanon-category")||-1!==d.indexOf("ot-vscat")}function q(d){return d.hasAttribute("data-ot-ignore")}function v(d,g,a){void 0===a&&(a=null);var f=d.join("-"),c=a&&a.join("-"),b=g.getAttribute("class")||"",e="",h=!1;d&&d.length&&-1===b.indexOf("optanon-category-"+f)&&(e=("optanon-category-"+f).trim(),h=!0);a&&a.length&&-1===b.indexOf("ot-vscat-"+c)&&(e+=" "+("ot-vscat-"+
c).trim(),h=!0);h&&g.setAttribute("class",e+" "+b)}function B(d,g,a){void 0===a&&(a=null);var f;d=d.join("-");a=a&&a.join("-");return-1===g.indexOf("optanon-category-"+d)&&(f=("optanon-category-"+d).trim()),-1===g.indexOf("ot-vscat-"+a)&&(f+=" "+("ot-vscat-"+a).trim()),f+" "+g}var z=JSON.parse('[{"Tag":"https://www.youtube.com/embed/Z20W0DbEn-A","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/dQDcBSNMICY","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/xgpShchdrmw","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/e6c1G7hSB54","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/1WKD4wHLsP0","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/13MFpeYDEEI","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/ASAwOXnsh-o","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/KZ41BDFtSkE","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://open.spotify.com/embed-podcast/episode/7tOqoMwB23uGBxXnS3RUfc","CategoryId":["C0003"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/ZTRKtJki9wo","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/5nb1GemMdO0","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/Rz080VnQRY4","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/6PbmtJp-YD0","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/2Xt0Q3k2w-A","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/CmOqmTIAz-w","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/8rdZPDOCTdQ","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/LzbwgSBPNGg","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/gwPIsgP7II4","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/oETaQtrkOXs","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/PqCUst2xFxQ","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/ADLLndIpRlE","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/JmF-nga9VG0","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/NRJ_Y5vBi0E","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.google-analytics.com/analytics.js","CategoryId":["C0002"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/BeRrJBEIOAc","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/XluFIi46pcI","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/v\x3dfNweLxkNHNA","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/QsP-ZAz9uEo","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/https://www.youtube.com/embed/TFVpB232ah4","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/Fi5suJENYlM","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/eZ3zcyXVgak","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/pTIZxcq64gw","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/jF43hCOB4ng","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/whd04r_l5NQ","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/lTX_JmKlIT0","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/GiQRVjatA6A","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/6dbY6VJL5CM","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/iyCT2dvpmMw","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/VjXk5qMbpQg","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/rRP7hVomUw8","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/8hua4f2zn3A","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/zzqqpoiBDJ8","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/CgixVyEOvl4","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/EUSVkTTDNiw","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.googletagmanager.com/gtag/js","CategoryId":["C0002"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/LlxSUzw9Rwk","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/DoAS4IqoIco","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/cUj6cL73ez8","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/M_n6tJQ6pAg","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/8i837GAVZmc","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/0IhOJvCT6Mo","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/iGVi2f9oPpI","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/KLEIVJkWQO0","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/HdnfERH-7C8","CategoryId":["C0004"],"Vendor":null},{"Tag":"https://www.youtube.com/embed/s6cJo_eTl78","CategoryId":["C0004"],"Vendor":null}]'),
D=JSON.parse("true"),u=JSON.parse('"Categories"'),y="addthis.com addtoany.com adsrvr.org amazon-adsystem.com bing.com bounceexchange.com bouncex.net criteo.com criteo.net dailymotion.com doubleclick.net everesttech.net facebook.com facebook.net googleadservices.com googlesyndication.com krxd.net liadm.com linkedin.com outbrain.com rubiconproject.com sharethis.com taboola.com twitter.com vimeo.com yahoo.com youtube.com".split(" ");y=y.filter(function(d){if("null"!==d&&d.trim().length)return d});var w=
["embed","iframe","img","script"];(new MutationObserver(function(d){Array.prototype.forEach.call(d,function(g){Array.prototype.forEach.call(g.addedNodes,function(e){var h,k;if(1===e.nodeType&&-1!==w.indexOf(e.tagName.toLowerCase())&&!p(e)&&!q(e))if("script"===e.tagName.toLowerCase()){if((k=n(h=e.src||"")).categoryIds.length||k.vsCatIds.length){v(k.categoryIds,e,k.vsCatIds);m(k.categoryIds,k.vsCatIds)||(e.type="text/plain");var r=function(l){"text/plain"===e.getAttribute("type")&&l.preventDefault();
e.removeEventListener("beforescriptexecute",r)};e.addEventListener("beforescriptexecute",r)}}else((k=n(h=e.src||"")).categoryIds.length||k.vsCatIds.length)&&(v(k.categoryIds,e,k.vsCatIds),m(k.categoryIds,k.vsCatIds)||(e.removeAttribute("src"),e.setAttribute("data-src",h)))});var a=g.target;if(g.attributeName&&(!p(a)||!q(a)))if("script"===a.nodeName.toLowerCase()){if((b=n(c=a.src||"")).categoryIds.length||b.vsCatIds.length){v(b.categoryIds,a,b.vsCatIds);m(b.categoryIds,b.vsCatIds)||(a.type="text/plain");
var f=function(e){"text/plain"===a.getAttribute("type")&&e.preventDefault();a.removeEventListener("beforescriptexecute",f)};a.addEventListener("beforescriptexecute",f)}}else if(-1!==w.indexOf(g.target.nodeName.toLowerCase())){var c,b;((b=n(c=a.src||"")).categoryIds.length||b.vsCatIds.length)&&(v(b.categoryIds,a,b.vsCatIds),m(b.categoryIds,b.vsCatIds)||(a.removeAttribute("src"),a.setAttribute("data-src",c)))}})})).observe(document.documentElement,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["src"]});
var C=document.createElement;document.createElement=function(){for(var d=[],g=0;g<arguments.length;g++)d[g]=arguments[g];if("script"!==d[0].toLowerCase()&&-1===w.indexOf(d[0].toLowerCase()))return C.bind(document).apply(void 0,d);var a=C.bind(document).apply(void 0,d),f=a.setAttribute.bind(a);return Object.defineProperties(a,{src:{get:function(){return a.getAttribute("src")||""},set:function(c){var b="";"string"==typeof c?b=c:c instanceof Object&&(b=c.toString());b=n(b);!b.categoryIds.length&&!b.vsCatIds.length||
"script"!==d[0].toLowerCase()||p(a)||m(b.categoryIds,b.vsCatIds)||q(a)?!b.categoryIds.length||-1===w.indexOf(d[0].toLowerCase())||p(a)||m(b.categoryIds,b.vsCatIds)||q(a)?f("src",c):(a.removeAttribute("src"),f("data-src",c),c=a.getAttribute("class"),c||(c=B(b.categoryIds,c||"",b.vsCatIds),f("class",c))):(f("type","text/plain"),f("src",c));return!0}},type:{set:function(c){var b=n(a.src||"");c=!b.categoryIds.length&&!b.vsCatIds.length||p(a)||m(b.categoryIds,b.vsCatIds)||q(a)?c:"text/plain";return f("type",
c),!0}},class:{set:function(c){var b=n(a.src);!b.categoryIds.length&&!b.vsCatIds.length||p(a)||m(b.categoryIds,b.vsCatIds)||q(a)?f("class",c):(c=B(b.categoryIds,c,b.vsCatIds),f("class",c));return!0}}}),a.setAttribute=function(c,b,e){"type"!==c&&"src"!==c||e?f(c,b):a[c]=b},a}}();