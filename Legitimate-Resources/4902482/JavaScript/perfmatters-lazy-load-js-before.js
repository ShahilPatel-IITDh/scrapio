
window.lazyLoadOptions={elements_selector:"img[data-src],.perfmatters-lazy,.perfmatters-lazy-css-bg",thresholds:"0px 0px",class_loading:"pmloading",class_loaded:"pmloaded",callback_loaded:function(element){if(element.tagName==="IFRAME"){if(element.classList.contains("pmloaded")){if(typeof window.jQuery!="undefined"){if(jQuery.fn.fitVids){jQuery(element).parent().fitVids()}}}}}};window.addEventListener("LazyLoad::Initialized",function(e){var lazyLoadInstance=e.detail.instance;var target=document.querySelector("body");var observer=new MutationObserver(function(mutations){lazyLoadInstance.update()});var config={childList:!0,subtree:!0};observer.observe(target,config);});function perfmattersLazyLoadYouTube(e){var t=document.createElement("iframe"),r="ID?";r+=0===e.dataset.query.length?"":e.dataset.query+"&",r+="autoplay=1",t.setAttribute("src",r.replace("ID",e.dataset.src)),t.setAttribute("frameborder","0"),t.setAttribute("allowfullscreen","1"),t.setAttribute("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"),e.replaceChild(t,e.firstChild)}
