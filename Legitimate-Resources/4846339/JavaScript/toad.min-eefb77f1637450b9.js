!function(e,t){function n(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n}function a(t){var n,a,i,r,o;return function(){for(a=this,i=[],r=arguments.length,o=0;o<r;++o)i[o]=arguments[o];n&&e.cancelAnimationFrame(n),n=e.requestAnimationFrame((function(){t.apply(a,i),n=null}))}}function i(){for(var n,a,i,r,o,m,s=t.querySelectorAll("[data-src]","[data-srcset]")||[],c=s.length,l=0;l<c;++l)if(a=(n=s[l]).getBoundingClientRect(),i=(m=a).top>=0&&m.left>=0&&m.top<=e.innerHeight&&m.left<=e.innerWidth&&!(0==m.height&&0==m.width&&0==m.top&&0==m.left),r=n.getAttribute("data-src"),o=n.getAttribute("data-srcset"),(r||o)&&i&&(r&&i&&("img"===n.tagName.toLowerCase()?n.src=r:n.style.backgroundImage="url("+r+")",n.classList.add("lazyloaded"),n.removeAttribute("data-src")),o&&i)){if("img"===n.tagName.toLowerCase())n.srcset=o;else{var u=o.split(","),d=[];u.forEach((function(e){e="url('"+e.trim().replace(" ","') "),d.push(e)})),n.style.backgroundImage="-webkit-image-set("+d.join(",")+")"}n.classList.add("lazyloaded"),n.removeAttribute("data-srcset")}}"requestAnimationFrame"in e||(e.requestAnimationFrame=e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){return e.setTimeout(t,1e3/60)}),"cancelAnimationFrame"in e||(e.cancelAnimationFrame=e.webkitCancelAnimationFrame||e.mozCancelAnimationFrame||e.oCancelAnimationFrame||e.msCancelAnimationFrame||function(t){return e.cancelTimeout(t)}),e.toad={startListening:function(){n(e,"load",a(i)),n(e,"scroll",a(i)),n(e,"resize",a(i)),Array.from(t.querySelectorAll(".js-toLazyLoad")).forEach((function(e){n(e,"scroll",a(i))})),$(e).on("page:enter page:refresh menu:after_animation",a(i))}}}(window,window.document),$(window).trigger("available","toadJS"),document.addEventListener("DOMContentLoaded",(function(){toad.startListening()}));