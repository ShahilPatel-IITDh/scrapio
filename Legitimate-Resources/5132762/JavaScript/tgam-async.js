 (function _googletagmanager() { function guid() { function s4() { return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1); } return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4(); } window.analyticsLayer = []; window.analyticsLayerGuid = guid(); function run() { const on = /gtm=false|analytics=false/im.test(window.location.search) === false; const okHost = /(\.arcpublishing\.com)/im.test(window.location.host) === false; const okUrl = /(political-ad-collector|pagebuilder\/editor)/im.test(window.location.pathname)=== false; return on && okHost && okUrl; } if (run()) { (function(w,d,s,l,i){w[l]=w[l]||[]; w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'}); var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:''; j.id='tgam-gtm-script';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; f.parentNode.insertBefore(j,f); })(window,document,'script','analyticsLayer','GTM-TL4VHVZ'); } })(); 