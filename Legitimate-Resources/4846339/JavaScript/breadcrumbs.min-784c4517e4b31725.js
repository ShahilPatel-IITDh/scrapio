dla.breadcrumbs=function(){var n,e,t,i,r=0;function o(n){window.requestAnimationFrame((function(){d(n.target.innerWidth)}))}function d(o){n=$(".js-breadcrumb-item:visible"),t=n.eq(0),e=$(".js-breadcrumb-dots:visible");var d=$(".js-breadcrumb:visible"),a=d.outerHeight(),c=d.width();!function(n,e){return n>767&&e>28||n<=767&&e>50}(o,a)?void 0!==i&&i.length>0&&e.length&&function(e){var t=0;return $.each(n,(function(n,e){t+=$(e).width()})),e>t+r}(c)&&(e.remove(),t.after(i)):function(){var e=n.not(".js-breadcrumb-dots"),o=e.length;if(o>3){i=e.slice(1,o-2),r=0,$.each(i,(function(n,e){r+=$(e).width(),$(e).remove()}));var d=n.last().clone().addClass("js-breadcrumb-dots").text("...");t.after(d)}}()}return $(window).on("resize",o),$(window).on("orientationchange",o),$(window).on("page:enter",(function(){d(window.innerWidth)})),$((function(){d(window.innerWidth)})),{addDotsWhenBreadcrumbsAreTooLong:d}}();