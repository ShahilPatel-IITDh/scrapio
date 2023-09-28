
//<![CDATA[
"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(e=>{}).catch(e=>{console.log("SW registration failed: ",e)})});
//]]>
