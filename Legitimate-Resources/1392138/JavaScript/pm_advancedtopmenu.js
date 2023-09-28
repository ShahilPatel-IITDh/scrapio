function activateParentMenu(e,type) {
	if(type == 'element') {
		$(e).parents('.adtm_column').children('h5').children('a').addClass('advtm_menu_actif');
		$(e).parents('.li-niveau1').children('a').addClass('advtm_menu_actif');
	}
	if(type == 'column') {
		$(e).parents('.li-niveau1').children('a').addClass('advtm_menu_actif');
	}
}

function adtm_isMobileDevice() {
	return (('ontouchstart' in window) || (typeof(document.documentElement) != 'undefined' && 'ontouchstart' in document.documentElement) || (typeof(window.navigator) != 'undefined' && typeof(window.navigator.msMaxTouchPoints) != 'undefined' && window.navigator.msMaxTouchPoints));
}

function adtm_loadDoubleTap(){!function(e){e.event.special.doubletap={bindType:"touchend",delegateType:"touchend",handle:function(e){var a=e.handleObj,t=jQuery.data(e.target),n=(new Date).getTime(),l=t.lastTouch?n-t.lastTouch:0,u=null==u?300:u;u>l&&l>50?(t.lastTouch=null,e.type=a.origType,["clientX","clientY","pageX","pageY"].forEach(function(a){e[a]=e.originalEvent.changedTouches[0][a]}),a.handler.apply(this,arguments)):t.lastTouch=n}}}(jQuery)}

$(document).ready(function(){
	if (adtm_isMobileDevice()) {
		$("#adtm_menu").addClass('adtm_touch');
		adtm_loadDoubleTap();
	}
	
	// Touch devices
	$("#adtm_menu.adtm_touch ul#menu li.li-niveau1").each(function(){
		var li = $(this);
		li.mouseover(function(){ li.data('hoverTime', new Date().getTime()); });
		if (typeof(li.mouseleave) != 'undefined') {
			li.mouseleave(function(){ li.removeClass("adtm_is_open"); });
		} else if (typeof(li.mouseout) != 'undefined') {
			li.mouseout(function(){ li.removeClass("adtm_is_open"); });
		}
		li.children('a').bind('click', function() {
			if (li.hasClass('sub') && !$('#adtm_menu').hasClass('adtm_menu_toggle_open')) {
				return ( new Date().getTime() - li.data('hoverTime') ) > 1000; 
			} else if (li.hasClass('sub') && li.hasClass('menuHaveNoMobileSubMenu') && $(this).attr('href') != '' && $(this).attr('href') != '#') {
				window.location = $(this).attr('href');
				return false;
			} else if (li.hasClass('sub')) {
				$(li).toggleClass('adtm_sub_open');
				$('div.adtm_sub', li).toggleClass('adtm_submenu_toggle_open');
				return false;
			}
		});
		li.children('a').bind('doubletap', function(e) {
			if (li.hasClass('sub') && $(this).attr('href') != '' && $(this).attr('href') != '#')
				window.location = $(this).attr('href');
			return false;
		});
	});
	
	// Non-touch devices
	$("#adtm_menu:not(.adtm_touch) ul#menu li.li-niveau1").each(function(){
		var li = $(this);
		if (li.hasClass('sub')) {
			li.hover(function(e) {
				if ($(li).css('position') != 'relative') {
					// We must calculate top if it's on line != 1 (responsive case)
					if ($('#adtm_menu li.li-niveau1:not(.advtm_menu_toggle)').offset().top != $(li).offset().top) {
						if (typeof($('div.adtm_sub', li).data('originalTop')) === 'undefined') {
							$('div.adtm_sub', li).data('originalTop', parseInt($('div.adtm_sub', li).css('top')));
						}
						$('div.adtm_sub', li).css('top', $('div.adtm_sub', li).data('originalTop') + $(li).offset().top - $('#adtm_menu li.li-niveau1:not(.advtm_menu_toggle)').offset().top);
					} else {
						$('div.adtm_sub', li).css('top', $('div.adtm_sub', li).data('originalTop'));
					}
				}
			}, function(e) {});
			li.children('a').click(function(e) {
				if ($('#adtm_menu:not(.adtm_touch) ul#menu li.advtm_menu_toggle').is(':visible')) {
					$(li).toggleClass('adtm_sub_open');
					$('div.adtm_sub', li).toggleClass('adtm_submenu_toggle_open');
					return false;
				}
			});
			li.children('a').bind('dblclick', function(e) {
				if ($('#adtm_menu:not(.adtm_touch) ul#menu li.advtm_menu_toggle').is(':visible')) {
					if ($('#adtm_menu').hasClass('adtm_menu_toggle_open') && li.hasClass('sub') && $(this).attr('href') != '' && $(this).attr('href') != '#')
						window.location = $(this).attr('href');
					return false;
				}
			});
		}
	});
	
	// Set event for menu toggle
	$('#adtm_menu ul li.advtm_menu_toggle a.adtm_toggle_menu_button').unbind('click').bind('click', function(e) {
		$('#adtm_menu').toggleClass('adtm_menu_toggle_open');
		return false;
	});

	// Set sticky menu
	if ($('#adtm_menu').attr('data-sticky') == 1 && !adtm_isMobileDevice()) {
		if (typeof($("#adtm_menu").attr('class')) != 'undefined') {
			originalClasses = ' ' + $("#adtm_menu").attr('class');
		} else {
			originalClasses = '';
		}
		$("#adtm_menu").sticky({className:'adtm_sticky' + originalClasses, getWidthFrom:'#adtm_menu_inner'});
	}
});