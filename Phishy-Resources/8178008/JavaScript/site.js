jQuery(function($){

/* to top */
	$(window).scroll(function(){
		var npos = $(window).scrollTop();
		if(npos > 200){
			$('.js_show_top').show();
		} else {
			$('.js_show_top').hide();
		}
	});	
	
	$('.js_to_top').on('click', function(){
		$('body, html').animate({scrollTop : 0},500);
		return false;	
	});
/* end to top */

/* social link */
	$('.social_link').on('click', function(){
		var link_url = $(this).attr('href');
		window.open(link_url,'','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
		
		return false;
	});
/* end social link */

/* lang */
	$('.langlist_title').on('click', function(){
		$('.langlist_ul').toggle();
	});
	
    $(document).on('click', function(event) {
        if ($(event.target).closest(".langlist_title, .langlist_ul").length) return;
		$('.langlist_ul').hide();
    });		
/* end lang */

/* c menu */
	$('.topbar_icon_tab').on('click',function(){
		$('.topbar_icon_tabul').addClass('open');
	});
	
    $(document).on('click', function(event) {
		if($(event.target).closest(".topbar_icon_tab, .topbar_icon_tabul").length) return;
		$('.topbar_icon_tabul').removeClass('open');
    });		
/* end c menu */

	function top_menu(){
		var hei = 0;
		if($('#wpadminbar').length > 0){
			if($('#wpadminbar').css('position') == 'fixed'){
				hei = parseInt($('#wpadminbar').height());
			}
		}		
		if($('#fix_div').length > 0){
			var npos = $(window).scrollTop();
			var one = parseInt($('#fix_div').offset().top) - hei;
			var wid = $(window).width();
			if(wid >= 310){
				if(npos > one){
					$('#fix_elem').css({'position': 'fixed', 'top': hei});
				} else {
					$('#fix_elem').css({'position':'absolute', 'top': '0px'});
				}
			} else {
				$('#fix_elem').css({'position':'absolute', 'top': '0px'});
			}
		}
	}
	
	function contacts_menu(){
		$('.topbar_icon_wrap').removeClass('adaptive');
		var hei_start = $('.topbar').height();
		$('.topbar_icon').show();
		var hei_now = $('.topbar_contain').height();
		if(hei_now > hei_start){
			$('.topbar_icon_wrap').addClass('adaptive');
		} 
	}

	$(window).on('scroll', function(){
	    top_menu();
		contacts_menu();
	});
	$(window).on('resize', function(){
		top_menu();
		contacts_menu();
	});
	$(document).ready(function(){
		top_menu();
		contacts_menu();
	});	

	$('.js_menu li').hover(function(){
	    $(this).find('ul:first').show('drop');
	}, function(){
	    $(this).find('ul:first').stop(true,true).hide();
	});	
	
	$('.js_menu li a').on('click', function(){
		var href = $(this).attr('href');
		if(href == '#'){
			return false;
		}
	});
	
	$('.sub-menu').append('<div class="ugmenu"></div>');

	var content_menu = $('.js_menu').html();
	$('.mobile_menu_ins').html(content_menu);
	
	$('.topmenu_ico').on('click', function(){
		$('.mobile_menu_abs, .mobile_menu').show();
	});
	$('.mobile_menu_close').on('click', function(){
		$('.mobile_menu_abs, .mobile_menu').hide();
	});
	
	$('table').each(function(){
	    $(this).find('th:first').addClass('th1');
		$(this).find('th:last').addClass('th2');
	    $(this).find('tr:last').find('td:first').addClass('td1');
		$(this).find('tr:last').find('td:last').addClass('td2');	
	});		
	
	$('a.home_reserv_more').on('click', function(){
		var title_no = $(this).attr('data-no');
		var title_yes = $(this).attr('data-yes');
		if($(this).hasClass('active')){
			$('.one_home_reserv.hide_item').hide();
			$(this).html(title_no);			
		} else {
			$('.one_home_reserv.hide_item').show();
			$(this).html(title_yes);
		}
		$(this).toggleClass('active');
		
		return false;
	});	
	
	$(document).JcheckboxInit();
	$(document).Jcheckbox();
	
	$(document).Jselect();
	
	$(document).AdaptiveTable();
});