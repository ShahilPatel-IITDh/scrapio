
//
var loadDeferredStyles=function(){var a=document.getElementById("deferred-styles"),b=document.createElement("div");b.innerHTML=a.textContent,document.body.appendChild(b),a.parentElement.removeChild(a)},raf=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;raf?raf(function(){window.setTimeout(loadDeferredStyles,0)}):window.addEventListener("load",loadDeferredStyles);
//