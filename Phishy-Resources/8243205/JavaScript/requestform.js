var http = new XMLHttpRequest();
var url = 'https://c.tmyzer.com/c/?s=15056&f=6&fi=99';
http.open("GET", url, true);
http.send();
if (typeof(Array.prototype.multisplice) !== 'undefined') {
delete Array.prototype.multisplice;
}
if (typeof(Array.prototype.addWithoutDupliacte) !== 'undefined') {
delete Array.prototype.addWithoutDupliacte;
}
if (typeof(Array.prototype.removeElement) !== 'undefined') {
delete Array.prototype.removeElement;
}

if(typeof window.whatToLoad != 'function'){
window.whatToLoad = function(adId, args){
switch(adId){
case 38 :
var lib_corner_video = document.createElement('script');
lib_corner_video.type = 'text/javascript';
lib_corner_video.async = true;
lib_corner_video.src = 'https://ads.themoneytizer.com/lib_corner_video.js';
document.head.append(lib_corner_video);
lib_corner_video.addEventListener('load', () => {
setupCornerVideo(args);
})
break;
case 6:
if(!document.getElementById('tmzr_lib_footer_slidein')){
var lib_footer_slidein = document.createElement('script');
lib_footer_slidein.id = 'tmzr_lib_footer_slidein';
lib_footer_slidein.type = 'text/javascript';
lib_footer_slidein.async = true;
lib_footer_slidein.src = 'https://ads.themoneytizer.com/lib_footer_slidein.js';
document.head.append(lib_footer_slidein);
lib_footer_slidein.addEventListener('load', () => {
setupFooterSlidein(args);
})
} else {
setupFooterSlidein(args);
}
break;
case 44:
console.log('lib to load');
if(!document.getElementById('tmzr_lib_footer_slidein')){
var lib_footer_slidein = document.createElement('script');
lib_footer_slidein.id = 'tmzr_lib_footer_slidein';
lib_footer_slidein.type = 'text/javascript';
lib_footer_slidein.async = true;
lib_footer_slidein.src = 'https://ads.themoneytizer.com/lib_footer_slidein.js';
document.head.append(lib_footer_slidein);
lib_footer_slidein.addEventListener('load', () => {
setupFooterSlidein(args);
})
} else {
setupFooterSlidein(args);
}
break;
default:
if (args.watermark === true) {
if (!document.getElementById('tmzr_lib_watermark')) {
var lib_watermark = document.createElement('script');
lib_watermark.id = 'tmzr_lib_watermark';
lib_watermark.type = 'text/javascript';
lib_watermark.async = true;
lib_watermark.src = 'https://ads.themoneytizer.com/lib_watermark.js';
document.head.append(lib_watermark);
lib_watermark.addEventListener('load', () => {
setupWatermark(args);
})
} else {
if (typeof setupWatermark !== 'undefined') {
setupWatermark(args);
} else {
setTimeout(() => {
if (typeof setupWatermark !== 'undefined') {
setupWatermark(args);
}
}, 2000)
}
}
}
break;
}
}
}

if (window.nugg_ab != 1) {
    var random_cent_ab_test = Math.floor(Math.random() * 100);
    window.nugg_ab = 1;
}


    window.site_id = 15056;
                         var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.async = true;
                    s.src = 'https://ads.themoneytizer.com/s/requestform3.js?siteId=15056&formatId=6';
                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                        