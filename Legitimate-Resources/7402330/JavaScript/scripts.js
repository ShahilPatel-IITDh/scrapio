var _tmpl_isMobile      = false,
    _tmpl_animated      = true;

if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i)||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/IEMobile/i) ||
    navigator.userAgent.match(/BlackBerry/i)) {
    _tmpl_isMobile = true;
};

$(function(){	

	window.onload = function () { $("#loader").fadeOut(300); };

	if ( _tmpl_animated == true) {
	    if (_tmpl_isMobile == true) {
	        $('.animated').removeClass('animated');
	    };
	    if (_tmpl_isMobile == false) {
	        $('*[data-animated]').each(function() {
	            if ( !$(this).parent().parent().hasClass('owl-item') ) {
	                $(this).addClass('animated');
	            };
	        });
	    };
	    function animated_contents() {
	        $('.animated:appeared').each(function (i) {
	            var $this    = $(this),
	                animated = $(this).data('animated');

	            setTimeout(function () {
	                $this.addClass(animated);
	            }, 100 * i);

	        });
	    };
	    if (_tmpl_isMobile == false) {
	        animated_contents();
	        $(window).scroll(function () {
	            animated_contents();
	        });
	    };
	};

	var top_height = $('#top').height();
	$('#top').height(0);

	$('.top-open .fa').click(function() {
		$(this).toggleClass('fa-plus').toggleClass('fa-minus');
		if ( !$(this).hasClass('fa-plus') ) {
			$('#top').addClass('top-opened').height(top_height);
		} else {
			$('#top').removeClass('top-opened').height(0);
		};
	});

	$("#nav .uMenuRoot > li.uWithSubmenu > a > span").append('<i class="fa fa-angle-down"></fa>');
    $("#nav .uMenuRoot > li.uWithSubmenu li.uWithSubmenu > a > span").append('<i class="fa fa-angle-right"></fa>');

    $('.search-icon .fa').click(function() {
    	$(this).toggleClass('fa-search').toggleClass('fa-close');
    	$('#search-form').toggleClass('search-form-show');
    });

    $(".slider").aSlider({
        prevBtn: '.slider-button-prev',
        nextBtn: '.slider-button-next',
        fadeSpeed: 200,         // скорость затухания/появления слайда
        autoPlay: true,         // автоперелистывание слайдов (true/false)
        autoPlayDelay: 5000,    // время показа в слайдах в миллисекундах
        slideDelay: 200        
    });

    $(document.body).on('appear', '.skill-line-wrap > span', function(e, $affected) {
		var percent = $(this).data('percent');
		if ( $(this).is(':appeared') && !$(this).hasClass('skill-starting') ) {
			$(this).children('b').append(percent+'%');
			$(this).addClass('skill-starting');			
			$(this).width($(this).parent().width()*percent/100);
		}
	});
	$('.skill-line-wrap > span').appear({force_process: true});

	$('<span id="go-top" class="fa fa-angle-up" title="Вверх!"></span>').appendTo('body');
    $('#go-top').css({
        'opacity'    : '0',
        'visibility' : 'hidden'
    });
    $(window).scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('#go-top').css({
                'opacity'    : '1',
                'visibility' : 'visible'
            });
        } else {
            $('#go-top').css({
                'opacity'    : '0',
                'visibility' : 'hidden'
            });
        }
    });
    $('#go-top').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 800);
        return false
    });

    $('.menu-icon').click(function() {
    	$('#nav').toggle();
    });

    $('.photo').parent().removeAttr('id').removeAttr('class').removeAttr('style').parent().removeAttr('id').removeAttr('class').removeAttr('style').addClass('photo-wrap').parent().removeAttr('id').removeAttr('class').removeAttr('style').addClass('photo-list');
    $('.post').parent().addClass('post-wrap').parent().addClass('oh');

});