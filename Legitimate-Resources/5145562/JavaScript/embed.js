window._kuulaEmbedVersion = '158';
!function(){if(!window._kuulaEmbedScriptLoaded){window._kuulaEmbedScriptLoaded=!0,console.log("VKE b"+(window._kuulaEmbedVersion||"L2"));var t,e,n,a=[],i={},o=window._kuulaMaxZIndex||"10000000",r="DeviceOrientationEvent"in window&&"function"==typeof DeviceOrientationEvent.requestPermission,d=!1,l=0,u=!1,s=!1,c=null;window.addEventListener("message",function(t){var e=t.data.fid||!1;switch(t.data.kuula&&a.forEach(function(e){(e.contentWindow||e).postMessage(t.data,"*")}),t.data.cmd){case"kuula-vr-btn":!0,c="vron",w(),s?m(e):p(!0,e);break;case"kuula-vroff-btn":!1,u=!1,p(!1,e);break;case"kuula-fs-btn":p(u=!u,e);break;case"kuula-gcl":window.close();break;case"kuula-gyro-btn":w()}});var m=function(t){if(c){var e=t?i[t]:a[0];(e.contentWindow||e).postMessage({kuula:!0,cmd:c},"*"),c=null}},p=function(r,d){var l=d?i[d]:a[0];r&&!s?(t||((t=document.createElement("div")).setAttribute("style","                    position: fixed;                     z-index: "+o+";                     top: 0; left: 0;                     width: 100%; height: 100%;                     background-color: #000;"),(e=document.createElement("span")).style.display="none"),n=l.getAttribute("style"),l.setAttribute("style","                position: absolute !important;                 margin: 0 !important;                 padding: 0 !important;                 max-width: 100% !important;                 max-height: 100% !important;                 top: 0 !important;                 left: 0 !important;                 width: 100% !important;                 height: 100% !important;"),l.parentNode.replaceChild(e,l),t.appendChild(l),document.body.appendChild(t)):s&&!r&&(l.setAttribute("style",n),e.parentNode.replaceChild(l,e),document.body.removeChild(t)),s=r},b=function(){window.addEventListener("deviceorientation",function(t){var e={alpha:t.alpha,beta:t.beta,gamma:t.gamma,orientation:window.orientation};a.forEach(function(t){(t.contentWindow||t).postMessage(e,"*")})},!0)},w=function(){d||DeviceOrientationEvent.requestPermission().then(function(t){"granted"==t&&(d=!0,b())}).catch(function(t){console.error("GyroPermission",t)})},f=function(t,e){var n=e+"f"+Math.floor(100*Math.random()),o=t.getAttribute("data-kuula")||t.getAttribute("data-viewin360");if(o){var r=document.createElement("iframe");r.setAttribute("frameborder","0"),r.setAttribute("scrolling","no"),r.setAttribute("allow","xr-spatial-tracking; gyroscope; accelerometer"),r.setAttribute("allowfullscreen","true"),r.style.border="none",r.style.backgroundColor="#000000",r.style.maxWidth="100%",r.addEventListener("load",m);var d=t.getAttribute("data-width"),u=t.getAttribute("data-height"),s=t.getAttribute("data-aspect"),c=t.getAttribute("data-css"),p=t.getAttribute("data-title"),b=document.querySelector(".kuula-bl");b&&(b.style.display="none"),d&&!d.match(/px|%|v/)&&(d+="px"),r.style.width=d,u?u.match(/px|%|v/)||(u+="px"):(t.parentNode&&(u=t.parentNode.getBoundingClientRect().width),s&&(u*=s)),0!=u&&"0px"!=u||(u="100%"),r.style.height=u,r.kuulaSettings={width:d,height:u},p&&(r.setAttribute("alt",p),r.setAttribute("title",p)),c&&r.classList.add(c);var w=-1==o.indexOf("?")?"?":"&",f="enablejs=1&fid="+n;0===e&&-1==o.indexOf("priority=")&&(f+="&priority=1"),r.src=o+w+f,a.push(r),i[n]=r,-1==o.indexOf("gyro=0")&&l++,t.parentNode.insertBefore(r,t.nextSibling),t.parentNode.removeChild(t)}else console.warn("Malformed embed element.",t)};window.kuulaEmbedManualMode||window.addEventListener("DOMContentLoaded",function(){Array.prototype.slice.call(document.querySelectorAll("[data-kuula],[data-viewin360]")).forEach(f),l&&!r&&b()});var h={add:f,clear:function(){a.length=0}};window.kuulaEmbed=h,window.view360Embed=h}}();