// JavaScript Document

var vimeo_regex = /(https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
//var youtube_regex = /(https?:\/\/)?(?:www\.|player\.)?youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)/;
var youtube_regex = /(https?:\/\/)?((?:www\.|player\.)?youtube.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9\-_]+)/;

var url_regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

function is_mobile() {
	var $ = jQuery;
	return $(window).width() <= 782;
	//return $('.mobile-only:visible').length>0;
}
function scroll_to(i,duration) {
	var $ = jQuery;
	if (typeof(duration)==='undefined') duration = 1000;
	let wpadminbar = $('#wpadminbar').length ? $('#wpadminbar').height() : 0;
	let stickyMenu = $('.sticky-menu-container').length ? $('.sticky-menu-container').height() : 0;
	
	let top = i - $('.site-header').outerHeight() - wpadminbar - stickyMenu;
	
	if ( duration===0 ) {
		$(window).scrollTop( top );
		setTimeout( () => $(window).scrollTop( top ), 1000 );
	} else {
		$('body,html').animate( { scrollTop: top } ,duration); //$('.site-header').outerHeight()/2
	}
}
jQuery(document).ready(function($) {

	
	$(document).on('beforeChange', '.slick-initialized', function(e) {
		$(this).addClass('is_moving');
	} ).on('afterChange', '.slick-initialized', function(e) {
		$(this).removeClass('is_moving');
	} );

	$(document).on('wheel', '.services-container.slick-initialized', function(e) {
		if ( $(this).hasClass('is_moving') ) return;
		if ( e.originalEvent.wheelDeltaX !== 0 ) {
			let rtl = $(this).slick('slickGetOption','rtl');
			let to_right = e.originalEvent.wheelDeltaX > 0;
			if ( ( rtl && to_right ) || ( !rtl && !to_right ) ) {
				$(this).slick('slickNext');
			} else {
				$(this).slick('slickPrev');
			}
		}
	} );
	
	if ( check_version_ie() ) $('html').addClass('ie');

	var h = window.location.hash;

	$( window ).on( 'hashchange', function( e ) {
		e.preventDefault();
		var h = window.location.hash;
		if (!h) return;
		console.log(['hashchange',h]);
		var s = $(h);
		if ( s.length ) {
			scroll_to( s.offset().top, 500 );
		}
	} ).load(function() {
		$(window).trigger('hashchange');
		/*if (!h) {
			var s = $(h);
			if ( s.length ) {
				scroll_to( s.offset().top, 0 );
			}
		}*/
	});
	$(document).on('click', 'a[href^="#"]', function(e) {
		e.preventDefault();
		var h = $(this).attr('href');
		var s = $(h);
		if ( s.length ) {
			scroll_to( s.offset().top, 500 );
		}
	} );
	
	$(window).on('resize',function() {
		$('body').css( 'margin-top', $('.site-header').outerHeight()+'px' );
		/*$('html')[0].style.setProperty(
			'margin-top',
			(
				( $('#wpadminbar').length ? $('#wpadminbar').height() : 0 ) +
				$('.site-header').outerHeight()
			)+'px',
			"important"
		);*/
		is_mobile() ? $('body').addClass('mobile') : $('body').removeClass('mobile');
		$(document).scroll();
		
		$('.project-main .col-2 .video-container-container').each( function() {
			let c = $(this).find('.video-container');
			let r = $(this).outerWidth() / $(this).outerHeight(),
				r2 = c.outerWidth()/c.outerHeight();
			if ( r > r2 ) {
				c.width( '100%' );
			} else {
				c.width( $(this).width() * r2 / r );
			}
		} );
		
	}).trigger('resize');

	$('.back-to-top').click(function() {
		scroll_to(0);
	});
	
	/* about page: */
	if ( $('.about-counters').length )
		$(window).scroll(function() {
			$('.about-counter').each(function(i) {
				/*if ( $(window).scrollTop() + $(window).height() < $(this).offset().top + 400 ) {
					$(this).data('visible',false);
				} else */if ($(window).scrollTop() + $(window).height() > $(this).offset().top) {
					if ($(this).data('visible')!=true) {
						var p = $(this);
						//console.log( p.find('.number').data('number') );
						$({foo:0}).animate({foo:p.find('.number').data('number')}, {
							step: function(val) {
								p.find('.number').text( number_format(parseInt(val),0) );
							},
							duration: 2000
						});
						
						$(this).data('visible',true);
					}
				}
			});
		});
	
	
	$('.faq').each(function() {
		var p = $(this);
		$(this).find('.faq-question').click(function() {
			p.toggleClass('open');
		});
	});
	
	$('.dice-big-toggle').click( function() {
		let p = $(this).parents('.contact-toggle-section').first(),
			_form = $('section.contact-section');

		p.toggleClass('on');
		if ( p.hasClass('on') ) {
			_form.css('height','auto');
			let h = _form.outerHeight();
			_form.css('height',0).animate({height:h},400,'swing', function() {
				_form.css('height','auto');
			} );
			scroll_to( _form.offset().top );
		} else {
			_form.animate({height:0},400);
		}
	});
	
	/*if ( $('.carousel').length ) {
		$('.carousel').first().carousel({
			noWrap:true,
			dist: is_mobile() ? -100 : -150,
			indicators: true
		});
		if ( $('.carousel').first().hasClass('rtl') ) {
			var instance = M.Carousel.getInstance($('.carousel').first());
			//instance.set( $('.carousel').first().find('.carousel-item').length - 1 );
		}
	}*/
	
	$('.expand-toggle').click( function() {
		$(this).parents('.expandable').first().toggleClass('expanded')
			.find( '.image-gallery:visible' ).not('.slick-initialized').slick( {
				rtl: $('body').hasClass('rtl'),
				autoplay: true,
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false
			} );

	} );
	
	// other slick sliders:
	$('.services-container').slick({
		rtl: $('body').hasClass('rtl'),
		//autoplay: true,
		slidesToShow: 6,
		slidesToScroll: 6,
		//centerMode: true,
		infinite:false,
		arrows:false,
		responsive: [
			{
				breakpoint: 1850,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
				}
			},
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
				}
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 782,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					//centerMode: true,
					//arrows: false,
					//dots: false
				}
			},
			{
				breakpoint: 440,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					//centerMode: true,
					//arrows: false,
					//dots: false
				}
			},
		]
	});
	
	$('.about-slider-section').slick({
		rtl: $('body').hasClass('rtl'),
		autoplay: true,
		arrows:false,
		dots:true,
	});
	
	$('.page-header-slick:not(.slick-initialized)').each( function() {
		if ( $(this).find('.page-header-slide').length > 1 ) {
			$(this).slick({
				rtl: $('body').hasClass('rtl'),
				autoplay: true,
				arrows:false,
				dots:true,
			});
		}
	} );
	
	$('.my-slick').slick({
		rtl: $('body').hasClass('rtl'),
		responsive: [
			{
				breakpoint: 750,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});

	// handle youtube videos for all slick sliders:
	/*$('.slick-initialized .slick-slide iframe').each(function() {
		$(this).attr('orig_iframe_src',$(this).attr('src'));
	});
	$('.slick-initialized').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		let i = $(this).find('[data-slick-index="'+currentSlide+'"]').find('iframe');
		if (i.length) {
			if (!window.slick_iframe_counter) window.slick_iframe_counter = 0;
			setTimeout( _=> i.attr('src', i.attr('orig_iframe_src')+'&_r='+window.slick_iframe_counter++ ), slick.options.speed );
		}
	}).on("afterChange", function(event, slick, currentSlide) {
		//let i = $(this).find('[data-slick-index="'+currentSlide+'"]').find('iframe');
		//i.attr('src', i.attr('orig_iframe_src')+'&autoplay=1' );
    });*/
		
	
	// inner page side menu:
	//$('.side-nav-menu li.current-menu-item, .side-nav-menu li.current-menu-ancestor').addClass('open');
	
	$(document).keyup(function(e) {
		if(e.which == 27){
			show_popup(false);
		}
	});
	
	/*$('.home-buttons a').click(function(e) {
		if ($(this).parent().find('ul').length) {
			e.preventDefault();
		}
	});*/

	
  	$('.popup-container').on('click',function() {
		show_popup(false);
	});
	$('.popup').on('click',function(e) {
		e.stopPropagation();
	});
	
	$('.hide-popup').on('click',function() {
		show_popup(false);
	});

	$('a').not('[target]').not('[href^="javascript:"]').each(function () {
		var a = new RegExp('/' + window.location.host + '/');
		
		// special for ivrilider.com / ivrilider.co.il:
		var b = new RegExp('/' + window.location.host.split('.com').join('.co.il') + '/'); 
		var c = new RegExp('/' + window.location.host.split('.co.il').join('.com') + '/'); 
		
		if ( ! a.test(this.href) && ! b.test(this.href) && ! c.test(this.href) ) {
			$(this).attr('target', '_blank');
		}
	});
	
	
	// tabs and inner-menu-containers:
	$('.inner-menu a').click( function() {
		
	} );
	
	
	/* mobile menu: */
	$('.menu-toggle').click(function() {
		$('body').toggleClass('mobile-menu');
	});
	/* mobile submenus: */
	$('.nav-menu li.menu-item-has-children > a').click(function(e) {
		//$(this).parent().toggleClass('on');
		if (is_mobile()) {
			e.preventDefault();
			e.stopPropagation();
			$(this).parent().toggleClass('on');
			$(this).parent().hasClass('on') ?
				$(this).parent().removeClass('closed') :
				$(this).parent().addClass('closed');
			return false;
		}
	});
	
});

function show_popup(obj) {
	var $ = jQuery;
	//$('.popup-container:visible').not('.popup-non-closable').trigger('popup-close').hide();
	if (obj===false) {

		$('.popup-container:visible').not('.popup-non-closable').trigger('onhide').animate({opacity:0},200,'linear',function() {$(this).hide()});

	} else {
		if (typeof(obj)=='string') obj = $('<div class="popup"><div class="hide-popup"></div>'+obj+'</div>');
		
		//if (!obj.parent().hasClass('popup-container')) $('.popup-container').prepend(obj.detach());
		//$('.popup-container').show().css({opacity:0}).animate({opacity:1},200);
		//obj.css({display:'inline-block'});
		obj.css({display:'flex'}).animate({opacity:1},200).find('.popup').show();
		
		//obj.css({'max-height':$('.popup-container').height()-30});

		//$('.hide-popup').unbind('click').click(function() {
		//	show_popup(false);
		//});
		//$(document).scroll();
	}
}

function format_money(x,show_agorot_always) {
	//if (!is_numeric(x)) return x;
	x = Math.round(x*100)/100;
	if (x==Math.round(x) && !show_agorot_always) {
		return '$'+number_format(x);
	} else {
		return '$'+number_format(x,2);
	}
}
function number_format(n, c, d, t) {
	var c = isNaN(c = Math.abs(c)) ? 2 : c, 
	d = d == undefined ? "." : d, 
	t = t == undefined ? "," : t, 
	s = n < 0 ? "-" : "", 
	i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
	j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


function setCookie(name, value, expires, path, domain, secure) {
  var curCookie = name + "=" + escape(value) +
      ((expires) ? "; expires=" + expires.toGMTString() : "") +
      ((path) ? "; path=" + path : "; path=/" ) +
      ((domain) ? "; domain=" + domain : "") +
      ((secure) ? "; secure" : "");
  document.cookie = curCookie;
}
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
function hilite_search_term(term,subject) {
	var i = subject.toLowerCase().indexOf(term);
	if (i==-1) return subject;
	return subject.substr(0,i)+'<b>'+subject.substr(i,term.length)+'</b>'+subject.substring( i+term.length, subject.length);
}


function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        return (parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
    }
    return false;
}
function check_version_ie() {
	var ua = window.navigator.userAgent;

	if (ua.indexOf("Trident") !== -1 && ua.indexOf("rv:11") !== -1) {
	    return 11;
	}
	var msie = ua.indexOf("MSIE ");
	if (msie > 0) // If Internet Explorer, return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
	else return false;
}


