
!function(){let e=document.getElementsByClassName("video-shariff-play"),t=0;for(t;t<e.length;t++)e[t].onclick=function(t){t.preventDefault(),function(){let e=t.target;for(;!e.className.split(" ").includes("video-shariff-play");)e=e.parentElement;e.outerHTML=JSON.parse(e.dataset.video)}()}}();
