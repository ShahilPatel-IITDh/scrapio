
// JQuery Easing Plugin 1.3
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=e*.3*1.5),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:.5*h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});


jQuery(document).ready(function() {
jQuery(window).resize(function(event) {
  /* Act on the event */
   parallaxfullwidth ()
 
});
});

//Normal Call Back Functions
// jQuery('audio,video').mediaelementplayer();
jQuery(document).ready(function($) {
	function count(options) {
        var $this = jQuery(this);
        options = jQuery.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
      }
	   	jQuery(".cs-time-counter") .each(function(index, el) {
			jQuery(this).one('inview', function(event, isInView, visiblePartX, visiblePartY) {
				if (isInView) {
					jQuery(this).data('countToOptions', {
						formatter: function (value, options) {
						  return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
						}
					});
				 jQuery(this).each(count);
			
				} 
			});
		});
	
	
	jQuery('.tooltip').tooltip();
	jQuery(".sub-menu").parent("li").addClass("parentIcon");
	
	cs_skills_shortcode_script()

	jQuery('audio,video').mediaelementplayer();
  parallaxfullwidth()
// Foucs Blur function for input field 
  jQuery(' textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"]').focus(function() {
    if (!$(this).data("DefaultText")) $(this).data("DefaultText", $(this).val());
    if ($(this).val() != "" && $(this).val() == $(this).data("DefaultText")) $(this).val("");
  }).blur(function() {
    if ($(this).val() == "") $(this).val($(this).data("DefaultText"));
  });
  jQuery('a.btn-back-top ').click(function(event) {
    event.preventDefault();
    jQuery('html, body').animate({scrollTop: 0}, 1000);
    return false;
})



/*	jQuery('#main .flexslider,.widget_slider .flexslider').flexslider({
    animation: "slide",
      prevText: "<i class='fa fa-angle-left'></i>",
     nextText: "<i class='fa fa-angle-right'></i>",
     slideshowSpeed: 4000

  });*/
  
  jQuery('[data-toggle="tooltip"]').tooltip()
   
   

    
});
// team carousal
function cs_team_carousal(){
	"use strict";
	 jQuery('.our_staff .flexslider').flexslider({
		animation: "slide",
		itemWidth: 221,
		itemMargin: 20,
		prevText:"<em class='fa fa-long-arrow-left'></em>",
		nextText:"<em class='fa fa-long-arrow-right'></em>",
		start: function(slider) {
			jQuery('body').removeClass('loading');
		}
    }); 
	
}

function event_map(add,lat, long, zoom, counter){
	"use strict";
 	var map;
	var myLatLng = new google.maps.LatLng(lat,long)
	//Initialize MAP
	var myOptions = {
	  zoom:zoom,
	  center: myLatLng,
	  disableDefaultUI: true,
	  zoomControl: true,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'+counter),myOptions);
	//End Initialize MAP

	//Set Marker
	var marker = new google.maps.Marker({
	  position: map.getCenter(),
	  map: map
	});
	marker.getPosition();
	//End marker
	
	//Set info window
	var infowindow = new google.maps.InfoWindow({
		content: ""+add,
		position: myLatLng
	});
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});
}

// Twitter js function
function cs_twitter_slider(){
	"use strict";
	jQuery('.widget_slider .flexslider').flexslider({
		animation: "slide",
		prevText:"<em class='fa fa-long-arrow-left'></em>",
		nextText:"<em class='fa fa-long-arrow-right'></em>",
		start: function(slider) {
		jQuery('.widget_slider').css("opacity",1);
		}
	});
}

// used for sticky menu
function cs_menu_sticky(){
	"use strict";
	jQuery("#header").scrollToFixed();
	if (jQuery('#wpadminbar').length > 0) {
		
		
	  
	}
	
	
}
// Mailchimp widget 
function cs_mailchimp_add_scripts () {
	'use strict';
	(function (a) {
	    a.fn.ns_mc_widget = function (b) {
	        var e, c, d;
	        e = {
	            url: "/",
	            cookie_id: false,
	            cookie_value: ""
	        };
	        d = jQuery.extend(e, b);
	        c = a(this);
	        c.submit(function () {
				var mailchimp_submitvalue = jQuery('.widget_newsletter form input[type="submit"]').val();

				var mailchimp_key_validation = jQuery('#mailchimp_key_validation').val();
				
				if( mailchimp_key_validation  != ""){
					//api_key_error = jQuery("<p class='bad_authentication'>" + mailchimp_key_validation + "</p>");
					//c.prepend(api_key);
					alert(mailchimp_key_validation);
					return false;
				} else {
				
	            var f;
	            f = jQuery("<div class='loader_img'><i class='fa fa-spinner fa-spin'></i></div>");
	            f.css({
	                "background-position": "center center",
	                "background-repeat": "no-repeat",
	                height: "16px",
	                right: "53px",
	                position: "absolute",
	                top: "11px",
	                width: "16px",
	                "z-index": "100"
	            });
	            c.css({
	                height: "100%",
	                position: "relative",
	                width: "100%"
	            });
				//if(jQuery('.widget_newsletter').hasClass('bad_authentication')){
					jQuery('.bad_authentication').remove();
					//i.remove();
				//}
				
					jQuery('.error').remove();
				
	          //  c.children().hide();
	            c.prepend(f);
	            a.getJSON(d.url, c.serialize(), function (h, k) {
					//alert(h+'======'.k);
	                var j, g, i;
	                if ("success" === k) {
	                    if (true === h.success) {
							if(jQuery('.widget_newsletter span').hasClass('bad_authentication')){
								i.remove();
							}
							
	                        i = jQuery("<p class='bad_authentication'>" + h.success_message + "</p>");
	                        i.hide();
							f.remove();
							
							
	                        c.fadeTo(400, 0, function () {
	                            c.prepend(i);
	                            i.show();
	                            c.fadeTo(400, 1)
	                        });
	                        if (false !== d.cookie_id) {
	                            j = new Date();
	                            j.setTime(j.getTime() + "3153600000");
	                            document.cookie = d.cookie_id + "=" + d.cookie_value + "; expires=" + j.toGMTString() + ";"
	                        }
							jQuery('.loader_img').remove();
	                    } else {
							jQuery('.loader_img').remove();
	                        g = jQuery(".error", c);
	                        if (0 === g.length) {
	                            f.remove();
	                            c.children().show();
	                            g = jQuery('<div class="error"></div>');
	                            g.prependTo(c)
	                        } else {
	                            f.remove();
	                            c.children().show()
	                        }
	                        g.html(h.error)
	                    }
	                }
					jQuery('.widget_newsletter input[type="submit"]').val(mailchimp_submitvalue);
	                return false
	            });
				}
	            return false
	        })
	    }
	}(jQuery));
	
	
	

}
// Blog video popup
function cs_video_load(theme_url, post_id, post_video,poster){
	'use strict';
   	//var dataString = 'post_video=' + post_video;
   	var dataString = {post_video:post_video,poster:poster};
	jQuery.ajax({
		type:"POST",
		url: theme_url+"/include/video_load.php",
			 data:dataString, 
		success:function(response){
	//jQuery("#myModal"+post_id).hide();
	jQuery("a[data-target='#myModal"+post_id+"']").removeAttr('onclick')
	jQuery("#myModal"+post_id).html(response);
		jQuery('audio,video').mediaelementplayer({
			sfeatures: ['playpause']
		});
	}
});
            //return false;
}
// parallax width
function parallaxfullwidth() {
	"use strict";
  jQuery(".parallax-fullwidth").each(function() {
    var ab = jQuery("#wrappermain-cs").hasClass("wrapper_boxed");
    if (ab) {

      var w = jQuery("#wrappermain-pix").width();
      var m = jQuery(this).parents("div").width();
      var e = w - m;
      jQuery(this).css({
        "position": "relative",
        "left": -(e / 2),
        "top": 0,
        "width": w
      });
    } else {
      var w = jQuery("#main").width();
      var m = jQuery(this).parent("div").width();
      var e = w - m;
      jQuery(this).css({
        "position": "relative",
        "left": -(e / 2),
        "top": 0,
        "width": w
      });

    }
  });
}

// Like Counter
function cs_like_counter(theme_url, post_id){
	"use strict";
   jQuery("#like_this"+post_id).html('<i class="fa fa-spinner fa-spin"></i>');
   var dataString = 'post_id=' + post_id;
            jQuery.ajax({
                type:"POST",
                url: theme_url+"/include/like_counter.php",
    data:dataString, 
                success:function(response){
    // jQuery("#loading_div"+post_id).hide();
     jQuery("#you_liked"+post_id).show();
	 jQuery("#like_this"+post_id).remove();
     jQuery("#like_counter"+post_id).html(response);
	 jQuery(".like_counter"+post_id).html(response);
                }
            });
            //return false;
}
function post_swiper_carousal(){ 
	"use strict";
		var mySwiper = new Swiper('.swiper-container',{
		//pagination: '.pagination',
		loop:false,
		grabCursor: true,
		paginationClickable: true,
		slidesPerView: 'auto',
		calculateHeight:true
		})
		jQuery('.arrow-left').on('click', function(e){
		e.preventDefault()
		mySwiper.swipePrev()
		})
		jQuery('.arrow-right').on('click', function(e){
		e.preventDefault()
		mySwiper.swipeNext()
		})
}

// event countdown
function cs_event_countdown(year_event,month_event,date_event){
	"use strict";
	var austDay = new Date();
	austDay = new Date(year_event,month_event-1,date_event);
	jQuery('#textLayout').countdown({until: austDay,
	 layout: '<strong>{dn}</strong> {dl} <em>:</em> <strong>{hn}</strong> {hl} <em>:</em> <strong>{mn}</strong> {ml} <em>:</em> <strong>{sn}</strong> {sl} '});
}

//menu toggle
jQuery(document).ready(function($) {
	MenuToggle();
	jQuery("#menus  li.sub-icon > a") .hover(function(){
		jQuery(this).next().toggle(200);
		return true;
	});
	jQuery('.cs-click-menu').live('click', function(event) {        
		jQuery(this).next().toggle('show');
		jQuery("#menus ul") .hide();
	});
});
function MenuToggle() {
		jQuery("#menus ul") .parent('li') .addClass('sub-icon');
}
jQuery(window).resize(function($) {
  		var a = jQuery(window).width();
		var b = 1000
		if (a >= b) {
			jQuery("#menus ul,#menus") .show();
		}else{
			jQuery("#menus ul,#menus") .hide();
		}
		
});


//menu toggle
function cs_skills_shortcode_script() {
  jQuery("[data-loadbar]").each(function(index) {
    var d = jQuery(this).attr('data-loadbar');
    var e = jQuery(this).attr('data-loadbar-text');
    var ani = jQuery(this).find('div');
    jQuery(ani).animate({
      width: d + "%"
    }, 2000,"easeOutCubic").find("span").html(e);
  });
}

function twitter_swiper_carousal(id){ 
	"use strict";
		var mySwiper = new Swiper('.swiper-container'+id,{
		//pagination: '.pagination',
		loop:false,
		grabCursor: true,
		paginationClickable: true,
		slidesPerView: 'auto',
		calculateHeight:true
		})
		jQuery('.arrow-left').on('hover', function(e){
		e.preventDefault()
		mySwiper.swipePrev()
		})
		jQuery('.arrow-right').on('hover', function(e){
		e.preventDefault()
		mySwiper.swipeNext()
		})
}

function sticky_menu_scroll(){ 
	"use strict";
	jQuery(window).scroll(function() {
   var windscroll = jQuery(window).scrollTop();
    if (windscroll >= 100) {
        jQuery('#header').addClass('header_fixed');
		
        jQuery('.wrapper').each(function(i) {
            if (jQuery(this).position().top <= windscroll - 100) {

            }
        });

    } else {

        jQuery('#header').removeClass('header_fixed');

    }
	})
}

// /*
//  * Scroll Events for Articles
//  */
//  var lastScrollPosition = 0;
 
// jQuery(window).on('scroll', function(){ // register for scroll events
// 	var sp = $(this).scrollTop();// current scroll position
// 	if(sp > lastScrollPosition) { // Scrolling Down
// 		if(window.console)
// 			console.log("we are scrolling...down","Current Position: "+sp);
// 		// add Class ".in"
// 		if($("article.cs-out").length > 0) 
// 			$("article").removeClass("cs-out").addClass("cs-in");
// 		else 
// 			$("article").addClass("cs-in");
// 	} else {
// 		if(window.console)
// 			console.log("we are scrolling...up","Current Position: "+sp);
// 		// add Class ".out"
// 		if($("article.cs-in").length > 0) 
// 			$("article").removeClass("cs-in").addClass("cs-out");
// 		else 
// 			$("article").addClass("cs-out");
// 	}
// 	lastScrollPosition = sp; // save current position for next time
// });