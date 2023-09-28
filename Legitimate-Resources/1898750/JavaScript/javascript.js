/**
/* @package		Dare to Manage v1.01
/* @copyright	Copyright (C) 2011 Dare to Design, http://www.daretodesign.nl. All rights reserved
**/

// EXPANDING LIST 

function showtr(id,img) {
	
	if( document.getElementById(id) != null ) {
	
		if( document.getElementById(id).style.display == 'none' && document.getElementById(id).style.visibility == 'hidden' ) {
			document.getElementById(id).style.display = '';
			document.getElementById(id).style.visibility = '';
			document.getElementById(img).src = '../cms_files/media/afbeeldingen/contract.gif';
		} else {
			document.getElementById(id).style.display = 'none';
			document.getElementById(id).style.visibility = 'hidden';
			document.getElementById(img).src = '../cms_files/media/afbeeldingen/expand.gif';
		}
		
	}

}

// POPUP
var win=null;

function NewWindow(mypage,myname,w,h) {
	
	myleft=(screen.width)?(screen.width-w)/2:100;
	mytop=(screen.height)?(screen.height-h)/2:100;

	settings="width=" + w + ",height=" + h + ",top=" + mytop + ",left=" + myleft + ",scrollbars=yes,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no,url=no";win=window.open(mypage,myname,settings);

	win.focus();
}

// LANGUAGUE COOKIE
function SetCookie(cookieName,cookieValue,nDays,path) {
	var today = new Date();
	var expire = new Date();
	if (nDays==null || nDays==0) nDays=1;
	expire.setTime(today.getTime() + 3600000*24*nDays);
	document.cookie = cookieName+"="+escape(cookieValue) + "; expires="+expire.toGMTString() + "; path="+path;
}

// CLONE DIV
function addNewBlock(IDtoCopy) {
	
	var divCount = $('.homeBlok').length;
	
	var cloned = $('#'+IDtoCopy).clone(true).attr('id',IDtoCopy+divCount).removeClass("model").insertBefore('.nieuwBlok');
	cloned.find('.blokType option').each(function() {
		$(this).attr('rel',$(this).attr('rela')+divCount).removeAttr('rela').end();
	});
	cloned.find('div[rela=pagina_]').attr('rel', 'pagina_'+divCount).removeAttr('rela').end();
	cloned.find('div[rela=module_]').attr('rel', 'module_'+divCount).removeAttr('rela').end();
	cloned.find('div[id=pagina_0]').attr('id', 'pagina_'+divCount+'0').end();
	cloned.find('div[id=module_0]').attr('id', 'module_'+divCount+'0').end();
	
	return false;
}

/*SUPERSIZED
jQuery(function($){
	
	$.supersized({
	
		// Functionality
		slideshow               :   1,			// Slideshow on/off
		autoplay				:	1,			// Slideshow starts playing automatically
		start_slide             :   1,			// Start slide (0 is random)
		stop_loop				:	0,			// Pauses slideshow on last slide
		random					: 	1,			// Randomize slide order (Ignores start slide)
		slide_interval          :   7000,		// Length between transitions
		transition              :   1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed		:	2000,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover             :   0,			// Pause slideshow on hover
		keyboard_nav            :   0,			// Keyboard navigation on/off
		performance				:	3,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
												   
		// Size & Position						   
		min_width		        :   0,			// Min width allowed (in pixels)
		min_height		        :   0,			// Min height allowed (in pixels)
		vertical_center         :   0,			// Vertically center background
		horizontal_center       :   1,			// Horizontally center background
		fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait         	:   0,			// Portrait images will not exceed browser height
		fit_landscape			:   0,			// Landscape images will not exceed browser width
												   
		// Components							
		slide_links				:	'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				:	1,			// Individual thumb links for each slide
		thumbnail_navigation    :   0,			// Thumbnail navigation
		slides 					:  	[			// Slideshow Images
									{image : '/media/afbeeldingen/supersized/001.jpg'},
									{image : '/media/afbeeldingen/supersized/002.jpg'},
									{image : '/media/afbeeldingen/supersized/003.jpg'},
									{image : '/media/afbeeldingen/supersized/004.jpg'},
									{image : '/media/afbeeldingen/supersized/005.jpg'},
									{image : '/media/afbeeldingen/supersized/006.jpg'}
									],
									
		// Theme Options			   
		progress_bar			:	1,			// Timer for each slide							
		mouse_scrub				:	0
		
	});
});*/