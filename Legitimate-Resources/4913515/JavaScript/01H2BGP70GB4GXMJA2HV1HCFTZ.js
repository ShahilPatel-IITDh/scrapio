(function(){var u=31348,e=document.createElement("script");e.src="https://config.gorgias.chat/gorgias-chat-bundle.js?rev=82790127&appKey=01H2BGP70GB4GXMJA2HV1HCFTZ",e.id="gorgias-chat-bundle",e.setAttribute("data-ot-ignore","");var r={get(i,t){if(t!="init"&&t!="resolve")throw new Error('You are trying to use the Gorgias Chat API before its initialization (property or function "'+t+'")! Please use `GorgiasChat.init()`. Refer to our documentation https://docs.gorgias.com/gorgias-chat/advanced-customization-new-chat for more info.');let o=i[t];return typeof o=="function"?o.bind(i):o}};window.GorgiasChat=new Proxy({},r);var n=new Promise(function(i,t){window.GorgiasChat.resolve=i});window.GorgiasChat.init=function(){return n},window.gorgiasChatPendingEvents=[];var s={get(i,t){if(t!="init"&&t!="resolve")throw new Error('You are trying to use the Gorgias Bridge API before its initialization (property or function "'+t+'")! Please use `GorgiasBridge.init()`. Refer to our documentation https://developers.gorgias.com/docs/how-to-attach-gorgias-tracking-data-to-shopify-cart-and-checkout-attributes for more info.');let o=i[t];return typeof o=="function"?o.bind(i):o}};window.GorgiasBridge=new Proxy({},s);var g=new Promise(function(i,t){window.GorgiasBridge.resolve=i});window.GorgiasBridge.init=function(){return g};function a(){document.body.appendChild(e)}function c(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",a):a()}c();var d={get(i,t){if(t!="init")throw new Error("You are using the legacy `gorgiasChat` Chat API! Please use `GorgiasChat` instead. Refer to our documentation https://docs.gorgias.com/gorgias-chat/advanced-customization-new-chat for more info.");let o=i[t];return typeof o=="function"?o.bind(i):o}};window.gorgiasChat=new Proxy({},d),window.gorgiasChat.init=function(){return console.warn("You are using the legacy `gorgiasChat.init()` function, please use the new `GorgiasChat` chat API (`GorgiasChat.init()`). Refer to our documentation https://docs.gorgias.com/gorgias-chat/advanced-customization-new-chat for more info."),n}})();
