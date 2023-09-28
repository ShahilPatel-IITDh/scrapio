jQuery(document).ready(function($) {
	$(".wcp-slick").each(function(index, el) {
		var slick_ob = {
			infinite: ($(this).data('infinite') == 'on') ? true : false,
			centerMode: ($(this).data('centerMode') == 'on') ? true : false,
			dots: ($(this).data('dots') == 'on') ? true : false,		  
			arrows: ($(this).data('arrows') == 'on') ? true : false,		  
			autoplay: ($(this).data('autoplay') == 'on') ? true : false,
			pauseOnHover: ($(this).data('pauseonhover') == 'on') ? true : false,
			rtl: ($(this).data('rtl') == 'on') ? true : false,
			autoplaySpeed: $(this).data('autoplayspeed'),
			draggable: true,
			adaptiveHeight: true,
			swipeToSlide: true,
			cssEase: ($(this).data('cssease') != '') ? $(this).data('cssease') : 'ease' ,
			initialSlide: ($(this).data('initialslide') != undefined) ? parseInt($(this).data('initialslide')) : 0,
			vertical: ($(this).data('vertical') == 'on') ? true : false,
			verticalSwiping: ($(this).data('vertical') == 'on') ? true : false,
			speed: $(this).data('speed'),
			slidesToShow: $(this).data('slidestoshow'),
			slidesToScroll: $(this).data('slidestoscroll'),
			slidesPerRow: $(this).data('slidesperrow'),
			rows: $(this).data('rows'),
		  	responsive: [{
		      breakpoint: 989,
		      settings: {
		        slidesToShow: $(this).data('slidestoshowtab'),
		        slidesToScroll: 1,
		      }
		    },
		    {
		      breakpoint: 600,
		      settings: {
		        slidesToShow: $(this).data('slidestoshowmob'),
		        slidesToScroll: 1,
		      }
		    }]			
		};
		$(this).slick(slick_ob);
	});

	if ($('.fixed-height-image').length) {
		$('.fixed-height-image').imagefill();
		setTimeout(function() {$('.fixed-height-image').imagefill();}, 50);
	}
});