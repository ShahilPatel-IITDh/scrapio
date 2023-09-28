/**** iPhone open modal box disable scroll background START ****/
let previousScrollY = 0;
$(document).on('show.bs.modal', () => {
	previousScrollY = window.scrollY;
	$('html').addClass('modal-open').css({
		marginTop: -previousScrollY,
		overflow: 'hidden',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		position: 'fixed',
	});
	$('header').css('marginTop',previousScrollY);
}).on('hidden.bs.modal', () => {
	$('html').removeClass('modal-open').css({
		marginTop: 0,
		overflow: 'visible',
		left: 'auto',
		right: 'auto',
		top: 'auto',
		bottom: 'auto',
		position: 'static',
	});
	$('header').css('marginTop',0);
	window.scrollTo(0, previousScrollY);
});
/**** iPhone open modal box disable scroll background END ****/

(function($) {$(function() {
	$('ul.nav > li').hover(function () {
		if ($(window).width() >= 992) {
	        $(this).find(':not(.alwaysCollapse) .sub-level').stop(true, true);
	    }
	}, function () {
		if ($(window).width() >= 992) {
			$(this).find(':not(.alwaysCollapse) .sub-level').stop(true, true);
		}
	});
		
	$('.navbar a.dropdown-toggle, .navbar a.menu-toggle').on('click', function(e) {
		if ($(window).width() < 992) {
			var $el = $(this);
			var $parent = $(this).offsetParent(".dropdown-menu");
			$(this).parent("li").toggleClass('open');

			if(!$parent.parent().hasClass('nav')) {
				$el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
			}

			$('.nav li.open').not($(this).parents("li")).removeClass("open");

			return false;
		} else {
			var $el = $(this);
			var $parent = $(this).offsetParent(".alwaysCollapse .dropdown-menu");
			$(this).parent("li").toggleClass('open');

			if(!$parent.parent().hasClass('nav')) {
				$el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
			}

			$('.alwaysCollapse .nav li.open').not($(this).parents("li")).removeClass("open");

			return false;
		}
	});

	$('#innerPageMenu .dropdown-submenu > a').on('click', function() {
			var $el = $(this);
			var $parent = $(this).offsetParent();
			$(this).parent("li").toggleClass('open');
  
			$('.dropdown-menu li.open').not($(this).parents("li")).removeClass("open");

			return false;
	});
	$('#innerPageMenu .parentLink').click(function() {
		var location = $(this).attr('href');
		window.location.href = location;
		return false;
	});
	$('#dcMenu .dropdown-submenu > a').on('click', function() {
			var $el = $(this);
			var $parent = $(this).offsetParent();
			$(this).parent("li").toggleClass('open');
  
			$('.dropdown-menu li.open').not($(this).parents("li")).removeClass("open");

			return false;
	});
	$(document).click(function(e) {
		if (!$(e.target).is('a') && typeof($('.collapse').collapse) == 'function') {
			$('.collapse').collapse('hide');        
		}
	});


});})(jQuery);