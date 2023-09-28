jQuery(document).ready(function($){
	
	// Product Page Sidebar
    $('.sidebar-catpro').navgoco({
        caretHtml: '<i class="fas fa-plus"></i>',
        accordion: true,
        openClass: 'open',
        slide: {
          duration: 400,
          easing: 'swing'
        }
    });


	
	$(".sidebar-catpro").navgoco({
        caret: '<span class="caret"></span>',
        accordion: false,
        openClass: 'open',
        save: true,
        cookie: {
            name: 'navgoco',
            expires: false,
            path: '/'
        },
        slide: {
            duration: 400,
            easing: 'swing'
        }
    });
	
	
	$(window).scroll(function(){
		if ($(this).scrollTop() > 58) {
		   $('.elementor-location-header').addClass('afterscroll');
		} else {
		   $('.elementor-location-header').removeClass('afterscroll');
		}
	});
	
	
}); 