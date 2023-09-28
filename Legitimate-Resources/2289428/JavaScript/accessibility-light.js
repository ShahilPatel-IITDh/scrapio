/*
 * Cookies
*/ 
function sitelinx_createCookie(a, e, t) {
    if (t) {
        var r = new Date;
        r.setTime(r.getTime() + 24 * t * 60 * 60 * 1e3);
        var o = "; expires=" + r.toGMTString()
    } else var o = "";
    document.cookie = a + "=" + e + o + "; path=/"
}
function sitelinx_readCookie(a) {
    for (var e = a + "=", t = document.cookie.split(";"), r = 0; r < t.length; r++) {
        for (var o = t[r];
             " " == o.charAt(0);) o = o.substring(1, o.length);
        if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
    }
    return null
}
function sitelinx_eraseCookie(a) {
    sitelinx_createCookie(a, "", -1)
}

/*
 * Fix missing Alt's
*/
function sitelinx_fixMissingAlts() {
	if( jQuery("body").hasClass("sitelinx-alt") ){
		jQuery("img").each(function(){
			var alt = jQuery(this).attr("alt");
			
			if( !alt )
				jQuery(this).attr("alt", "");
		});
	}
}

function sitelinx_closeToolbar() {
	jQuery("#sitelinx-black-screen").removeClass("active");
	jQuery("#sitelinx-toggle-toolbar").removeClass("open");
	jQuery("#sitelinx-toolbar").removeClass("active").attr("aria-hidden", "true");
	
	jQuery("#sitelinx-toolbar button, #sitelinx-toolbar a").each(function(){
		jQuery(this).attr("tabindex", "-1");
	});
}
function sitelinx_openToolbar() {
	jQuery("#sitelinx-toggle-toolbar").addClass("open");
	jQuery("#sitelinx-toolbar").addClass("active").attr("aria-hidden", "false");
	jQuery("#sitelinx-black-screen").addClass("active");
	
	jQuery("#sitelinx-toolbar button, #sitelinx-toolbar a").each(function(){
		jQuery(this).attr("tabindex", "0");
	});
}

jQuery(document).ready(function($){
	
	// empty alt
	sitelinx_fixMissingAlts();
	
	// toolbar
	
	if( $("#sitelinx-toolbar").length > 0 ) {
		$('body').children().not('#wpadminbar').wrapAll("<div id='sitelinx-body-wrap'></div>");
		$("body").prepend($("#sitelinx-toolbar"));
		$("body").prepend($("#sitelinx-black-screen"));
		$("body").prepend($("#sitelinx-toggle-toolbar"));
	}

	$("#sitelinx-black-screen").click(function(){
		sitelinx_closeToolbar();
		// $("#sitelinx-toggle-toolbar").show('slow');
	});
	$("#sitelinx-close-toolbar").click(function(){
		sitelinx_closeToolbar();
		// $("#sitelinx-toggle-toolbar").show('slow');
	});
	$("#sitelinx-toggle-toolbar img").click(function(){
		sitelinx_openToolbar();
		// $("#sitelinx-toggle-toolbar").hide();
	});
	//tbs code
	$("#sitelinx-toggle-toolbar").click(function(){
		sitelinx_openToolbar();
		// $("#sitelinx-toggle-toolbar").hide();
	});
	
	// disable animation
	
	if( sitelinx_readCookie("sitelinx_disable_animation") ) {
		$("#sitelinx_disable_animation").addClass("sitelinx-active");
		$("body").addClass("sitelinx-animation");
	}
	
	$("#sitelinx_disable_animation").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("body").toggleClass("sitelinx-animation");
		
		if( sitelinx_readCookie("sitelinx_disable_animation") ) {
			sitelinx_eraseCookie("sitelinx_disable_animation");
		} else {
			sitelinx_createCookie("sitelinx_disable_animation", "disable_animation", 1);
		}
	});
	
	// mark links
	
	if( sitelinx_readCookie("sitelinx_links_mark") ) {
		$("#sitelinx_links_mark").addClass("sitelinx-active");
		$("body").addClass("sitelinx-mlinks");
	}
	
	$("#sitelinx_links_mark").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("body").toggleClass("sitelinx-mlinks");
		
		if( sitelinx_readCookie("sitelinx_links_mark") ) {
			sitelinx_eraseCookie("sitelinx_links_mark");
		} else {
			sitelinx_createCookie("sitelinx_links_mark", "marked", 1);
		}
	});
	
	// keyboard navigation
	
	if( sitelinx_readCookie("sitelinx_keyboard") ) {
		$("#sitelinx_keys_navigation").addClass("sitelinx-active");
		$("body").addClass("sitelinx-outline");
	}
	
	$("#sitelinx_keys_navigation").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("body").toggleClass("sitelinx-outline");
		
		if( sitelinx_readCookie("sitelinx_keyboard") ) {
			sitelinx_eraseCookie("sitelinx_keyboard");
		} else {
			sitelinx_createCookie("sitelinx_keyboard", "keyboard", 1);
		}
	});
	
	// heading mark
	
	if( sitelinx_readCookie("sitelinx_heading_mark") ) {
		$("#sitelinx_headings_mark").addClass("sitelinx-active");
		$("body").addClass("sitelinx-heading-mark");
	}
	$("#sitelinx_headings_mark").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("body").toggleClass("sitelinx-heading-mark");
		
		if( sitelinx_readCookie("sitelinx_heading_mark") ) {
			sitelinx_eraseCookie("sitelinx_heading_mark");
		} else {
			sitelinx_createCookie("sitelinx_heading_mark", "heading_mark", 1);
		}
	});
	
	// background color
	
	if( sitelinx_readCookie("sitelinx_background_color") ) {
		$("#sitelinx_background_color").addClass("sitelinx-active");
		$("body").addClass("sitelinx-background-color");
		$(".sitelinx_background_color").show();
		
		var color = $(".sitelinx_background_color input").val();
		var colors = "#" + color;
		
		if( sitelinx_readCookie("sitelinx_change_background_color") ) {
			
			var colors = sitelinx_readCookie("sitelinx_change_background_color");
		}
		
		$("body.sitelinx-background-color #sitelinx-body-wrap *:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").css({"background-color": colors});
		
	}
	if( sitelinx_readCookie("sitelinx_change_background_color") ) {
			
		var def_colors = sitelinx_readCookie("sitelinx_change_background_color");
		$(".sitelinx_background_color input.jscolor").val(def_colors);
		$(".sitelinx_background_color input.jscolor").css({"background-color": def_colors});
		
	}
	$("#sitelinx_background_color").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("body").toggleClass("sitelinx-background-color");
		
		if( sitelinx_readCookie("sitelinx_background_color") ) {
			sitelinx_eraseCookie("sitelinx_background_color");
		} else {
			sitelinx_createCookie("sitelinx_background_color", "background_color", 1);
		}
		
		var bgcolor = $(".sitelinx_background_color input.jscolor").css("background-color");
		
		if ($("body").hasClass("sitelinx-background-color")) {
			
			// var backup_bg = $("body.sitelinx-background-color #sitelinx-body-wrap *:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").css("background-color");
			// $("body.sitelinx-background-color #sitelinx-body-wrap *:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").attr("backup_bg", backup_bg);
			$("body.sitelinx-background-color #sitelinx-body-wrap *:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").css({"background-color": bgcolor});
			$(".sitelinx_background_color").slideDown('fast');
			
		}else{
			
			// var backup_bg = $("body #sitelinx-body-wrap *[backup_bg]:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").val();
			$("body #sitelinx-body-wrap *:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").css("background-color",'');
			$(".sitelinx_background_color").slideUp('fast');
			
		}
		
	});
	$('.sitelinx_background_color input.jscolor').on("change paste keyup", function(){
		
		var change_color = $(this).css("background-color");
		
		$("body.sitelinx-background-color #sitelinx-body-wrap *:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").css({"background-color": change_color});
		
		sitelinx_createCookie("sitelinx_change_background_color", change_color, 1);
		
	});
	
	// underline
	
	if( sitelinx_readCookie("sitelinx_underline") ) {
		$("#sitelinx_links_underline").addClass("sitelinx-active");
		$("body").addClass("sitelinx-underline");
	}
	$("#sitelinx_links_underline").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("body").toggleClass("sitelinx-underline");
		
		if( sitelinx_readCookie("sitelinx_underline") ) {
			sitelinx_eraseCookie("sitelinx_underline");
		} else {
			sitelinx_createCookie("sitelinx_underline", "underlined", 1);
		}
	});

	// zoom
	
	if( sitelinx_readCookie("sitelinx_zoom") ) {
		$("body").addClass("sitelinx-zoom-" + sitelinx_readCookie("sitelinx_zoom"));
		if(sitelinx_readCookie("sitelinx_zoom") == 3) {
			$("#sitelinx_screen_up").addClass("sitelinx-active-blue");
		} else if(sitelinx_readCookie("sitelinx_zoom") == 4) {
			$("#sitelinx_screen_up").addClass("sitelinx-active");
		} else if(sitelinx_readCookie("sitelinx_zoom") == 1) {
			$("#sitelinx_screen_down").addClass("sitelinx-active");
		}
	}
	
	$("#sitelinx_screen_up").click(function(){
		if( $("body").hasClass("sitelinx-zoom-1") ) {
			$("body").removeClass("sitelinx-zoom-1");
			$("#sitelinx_screen_down").removeClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_zoom");
		} else if( $("body").hasClass("sitelinx-zoom-3") ) {
			$("body").removeClass("sitelinx-zoom-3").addClass("sitelinx-zoom-4");
			$(this).removeClass("sitelinx-active-blue").addClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_zoom");
			sitelinx_createCookie("sitelinx_zoom", 4, 1);
		} else if( $("body").hasClass("sitelinx-zoom-4") ) {
			$("body").removeClass("sitelinx-zoom-4");
			$(this).removeClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_zoom");
		} else {
			$("body").addClass("sitelinx-zoom-3");
			$(this).addClass("sitelinx-active-blue");
			sitelinx_createCookie("sitelinx_zoom", 3, 1);
		}
	});
	
	$("#sitelinx_screen_down").click(function(){
		if( $("body").hasClass("sitelinx-zoom-1") ) {
			$("body").removeClass("sitelinx-zoom-1");
			$(this).removeClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_zoom");
		} else if( $("body").hasClass("sitelinx-zoom-3") ) {
			$("body").removeClass("sitelinx-zoom-3");
			$("#sitelinx_screen_up").removeClass("sitelinx-active-blue").removeClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_zoom");
		} else if( $("body").hasClass("sitelinx-zoom-4") ) {
			$("body").removeClass("sitelinx-zoom-4").addClass("sitelinx-zoom-3");
			$("#sitelinx_screen_up").addClass("sitelinx-active-blue");
			sitelinx_eraseCookie("sitelinx_zoom");
			sitelinx_createCookie("sitelinx_zoom", 3, 1);
		} else {
			$("body").addClass("sitelinx-zoom-1");
			$(this).addClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_zoom");
			sitelinx_createCookie("sitelinx_zoom", 1, 1);
		}
	});
	
	// readable font
	
	if( sitelinx_readCookie("sitelinx_readable") ) {
		$("#sitelinx_readable_font").addClass("sitelinx-active");
		$("body").addClass("sitelinx-readable");
	}
	$("#sitelinx_readable_font").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("body").toggleClass("sitelinx-readable");
		
		if( sitelinx_readCookie("sitelinx_readable") ) {
			sitelinx_eraseCookie("sitelinx_readable");
		} else {
			sitelinx_createCookie("sitelinx_readable", "readable", 1);
		}
	});
	
	// font sizer
	
	var inc_user_value = $("#sitelinx_fontsizer_inc").attr("data-sitelinx-value");
	
	if( inc_user_value ) {
		var fontsizer_include = inc_user_value;
	} else {
		var fontsizer_include = $("body, p, h1, h2, h3, h4, h5, h6, label, input, a, button, textarea");
	}
	
	var exc_user_value = $("#sitelinx-toolbar p, #sitelinx-toolbar h1, #sitelinx-toolbar h2, #sitelinx-toolbar h3, #sitelinx-toolbar h4, #sitelinx-toolbar h5, #sitelinx-toolbar h6, #sitelinx-toolbar a, #sitelinx-toolbar button, #sitelinx-toolbar label, #sitelinx-toolbar input, #sitelinx-toolbar span, #sitelinx-toolbar div");
	
	var from_exc_user_value = $("#sitelinx_fontsizer_exc").attr("data-sitelinx-value");
	
	if(from_exc_user_value){
		
	var exc_user_value = exc_user_value + from_exc_user_value;
	
	}
	
	$(fontsizer_include).not(exc_user_value).each(function(){
		var fontsize = parseInt( $(this).css("font-size") );
		$(this).attr("data-fontsize", fontsize);
	});
	
	if( sitelinx_readCookie("sitelinx_fontsizer") ) {
		$("body").addClass("sitelinx-font-lvl-" + sitelinx_readCookie("sitelinx_fontsizer"));
		
		if(sitelinx_readCookie("sitelinx_fontsizer") == 3) {
			$("#sitelinx_fontsize_up").addClass("sitelinx-active-blue");
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", (fontsize * 1.5) + "px");
			});
		} else if(sitelinx_readCookie("sitelinx_fontsizer") == 4) {
			$("#sitelinx_fontsize_up").addClass("sitelinx-active");
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", (fontsize * 2) + "px");
			});
		} else if(sitelinx_readCookie("sitelinx_fontsizer") == 1) {
			$("#sitelinx_fontsize_down").addClass("sitelinx-active");
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				
				if( (fontsize / 2) > 12 ) {
					$(this).css("font-size", (fontsize / 2) + "px");
				} else {
					$(this).css("font-size", "12px");
				}
				
			});
		}
	}
	
	$("#sitelinx_fontsize_up").click(function(){
		
		// if level 1
		if( $("body").hasClass("sitelinx-font-lvl-1") ) {
			$("body").removeClass("sitelinx-font-lvl-1").addClass("sitelinx-font-lvl-2");
			$("#sitelinx_fontsize_down").removeClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", fontsize + "px");
			});
		}
		// if level 3
		else if( $("body").hasClass("sitelinx-font-lvl-3") )  {
			$("body").removeClass("sitelinx-font-lvl-3").addClass("sitelinx-font-lvl-4");
			$(this).removeClass("sitelinx-active-blue").addClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			sitelinx_createCookie("sitelinx_fontsizer", "4", 1);
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", (fontsize * 2) + "px");
			});
		}
		// if level 4
		else if( $("body").hasClass("sitelinx-font-lvl-4") )  {
			$("body").removeClass("sitelinx-font-lvl-4").addClass("sitelinx-font-lvl-2");
			$(this).removeClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", fontsize + "px");
			});
		}
		// if level 2 or nothing
		else {
			$("body").removeClass("sitelinx-font-lvl-2").addClass("sitelinx-font-lvl-3");
			$(this).addClass("sitelinx-active-blue");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			sitelinx_createCookie("sitelinx_fontsizer", "3", 1);
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", (fontsize * 1.5) + "px");
			});
		}
	});
	
	$("#sitelinx_fontsize_down").click(function(){
		
		// if level 1
		if( $("body").hasClass("sitelinx-font-lvl-1") ) {
			$("body").removeClass("sitelinx-font-lvl-1").addClass("sitelinx-font-lvl-2");
			$(this).removeClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", fontsize + "px");
			});
		}
		// if level 3
		else if( $("body").hasClass("sitelinx-font-lvl-3") )  {
			$("body").removeClass("sitelinx-font-lvl-3").addClass("sitelinx-font-lvl-2");
			$("#sitelinx_fontsize_up").removeClass("sitelinx-active-blue");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", fontsize + "px");
			});
		}
		// if level 4
		else if( $("body").hasClass("sitelinx-font-lvl-4") )  {
			$("body").removeClass("sitelinx-font-lvl-4").addClass("sitelinx-font-lvl-3");
			$("#sitelinx_fontsize_up").removeClass("sitelinx-active").addClass("sitelinx-active-blue");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			sitelinx_createCookie("sitelinx_fontsizer", "3", 1);
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				$(this).css("font-size", (fontsize * 1.5) + "px");
			});
		}
		// if level 2 or nothing
		else {
			$("body").removeClass("sitelinx-font-lvl-2").addClass("sitelinx-font-lvl-1");
			$(this).addClass("sitelinx-active");
			sitelinx_eraseCookie("sitelinx_fontsizer");
			sitelinx_createCookie("sitelinx_fontsizer", "1", 1);
			
			$(fontsizer_include).not(exc_user_value).each(function(){
				var fontsize = parseInt($(this).attr("data-fontsize"));
				
				if( (fontsize / 2) > 12 ) {
					$(this).css("font-size", (fontsize / 2) + "px");
				} else {
					$(this).css("font-size", "12px");
				}
				
			});
		}
	});
	
	// bright contrast
	
	if(sitelinx_readCookie("sitelinx_contrast") === "bright") {
		$("#sitelinx_contrast_bright").addClass("sitelinx-active");
		$("body").addClass("sitelinx-contrast-bright");
	} else if(sitelinx_readCookie("sitelinx_contrast") === "dark") {
		$("#sitelinx_contrast_dark").addClass("sitelinx-active");
		$("body").addClass("sitelinx-contrast-dark");
	}
	$("#sitelinx_contrast_bright").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("#sitelinx_contrast_dark").removeClass("sitelinx-active");
		$("body").removeClass("sitelinx-contrast-dark");
		$("body").toggleClass("sitelinx-contrast-bright");
		
		if( sitelinx_readCookie("sitelinx_contrast") === "bright") {
			sitelinx_eraseCookie("sitelinx_contrast");
		} else if(sitelinx_readCookie("sitelinx_contrast") === "dark") {
			sitelinx_eraseCookie("sitelinx_contrast");
			sitelinx_createCookie("sitelinx_contrast", "bright", 1);
		} else {
			sitelinx_createCookie("sitelinx_contrast", "bright", 1);
		}
	});
	
	$("#sitelinx_contrast_dark").click(function(){
		$(this).toggleClass("sitelinx-active");
		$("#sitelinx_contrast_bright").removeClass("sitelinx-active");
		$("body").removeClass("sitelinx-contrast-bright");
		$("body").toggleClass("sitelinx-contrast-dark");
		
		if( sitelinx_readCookie("sitelinx_contrast") === "dark") {
			sitelinx_eraseCookie("sitelinx_contrast");
		} else if(sitelinx_readCookie("sitelinx_contrast") === "bright") {
			sitelinx_eraseCookie("sitelinx_contrast");
			sitelinx_createCookie("sitelinx_contrast", "dark", 1);
		} else {
			sitelinx_createCookie("sitelinx_contrast", "dark", 1);
		}
	});
	
	// reset
	
	$("#sitelinx-reset").click(function(){
		$("#sitelinx-toolbar button").each(function() {
			$(this).removeClass("sitelinx-active").removeClass("sitelinx-active-blue");
		});
		
		var cookieClasses = ["sitelinx-animation", "sitelinx-outline", "sitelinx-heading-mark", "sitelinx-zoom-1", "sitelinx-zoom-2", "sitelinx-zoom-3", "sitelinx-zoom-4", "sitelinx-font-lvl-1", "sitelinx-font-lvl-2", "sitelinx-font-lvl-3", "sitelinx-font-lvl-4", "sitelinx-readable", "sitelinx-contrast-bright", "sitelinx-contrast-dark", "sitelinx-mlinks", "sitelinx-underline", "sitelinx-background-color"];
		
		cookieClasses.forEach(function(a) {
		    $("body").removeClass(a);
		});
		
		
		var cookieNames = document.cookie.split(/=[^;]*(?:;\s*|$)/);
		
		for (var i = 0; i < cookieNames.length; i++) {
		    if (/^sitelinx_/.test(cookieNames[i])) {
		        sitelinx_eraseCookie(cookieNames[i]);
		    }
		}
		
		$(fontsizer_include).not(exc_user_value).each(function(){
			var fontsize = parseInt($(this).attr("data-fontsize"));
			$(this).css("font-size", fontsize + "px");
		});
		
		$(".sitelinx_background_color").hide();
		// var backup_bg = $("body #sitelinx-body-wrap *[backup_bg]:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").val();
		$("body #sitelinx-body-wrap *:not(#sitelinx-toggle-toolbar, #sitelinx-toggle-toolbar img)").css("background-color", '');
	});

	//hide show the logo on click
	jQuery("#sitelinx_statement").hover(function(){
		jQuery(".hide-on-hover-stat").css("display", "none");
		jQuery("#show-on-ho").css("display", "block");
		}, function(){
		jQuery("#show-on-ho").css("display", "none");
		jQuery(".hide-on-hover-stat").css("display", "block");
	    
	  });
	
	//hide show the feedback
	jQuery("#sitelinx_feedback").hover(function(){
		jQuery(".hide-on-feed").css("display", "none");
		jQuery("#show-ho-feed").css("display", "block");
		}, function(){
		jQuery("#show-ho-feed").css("display", "none");
		jQuery(".hide-on-feed").css("display", "block");
	    
	  });

});
  

