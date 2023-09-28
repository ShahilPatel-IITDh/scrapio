
//chartbeat
var _sf_async_config = prevent_sf_async_config || window._sf_async_config;
//UOLTM - ads
//
document.querySelectorAll(".c-advertising__banner-area").forEach(function(ad){window.uolads.push({id:ad.id})});
window.uolads.push({id:"banner-1x1-area"});
//

//IVC
(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalIvcNamespace=p.GlobalIvcNamespace||[];
p.GlobalIvcNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
};p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","//gadasource.storage.googleapis.com/ivc.js","ivc"));
window.ivc('newTracker','cf','ivccf.ivcbrasil.org.br',{idWeb:'125'});
window.ivc('trackPageView');

// chartbeat track (beta 0.2)
if (document.referrer && /(assinaturas\.folha\.com\.br\/\d+\/sucesso|login\.folha\.com\.br\/assinatura\/conclusao)/.test(document.referrer)) {
  (function tryCbTrack(delay,times){
  if (typeof chartbeat === 'function') {chartbeat('trackPaywallComplete')}
  else if (times > 0) {setTimeout(function(){tryCbTrack(delay,--times)}, delay)}
  }(20,200));
}

// cookieUOL
if (/CAUBR01/.test(document.cookie)) {
document.cookie="CAUBR01=;expires=Fri Aug 27 2021 12:00:00 GMT;domain=.uol.com.br;path=/;SameSite=None;Secure";
}
