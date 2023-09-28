/* JQUERY GERAL */
/*var time = 0;
var timer;*/

$(document).ready(function() {

	/*//===================== MENU ATUAL =====================
	var url = window.location.pathname;
	$('ul.nav-menu a').filter(function()
	{
		return this.pathname == url;
	}).addClass('active').closest('.submenu').siblings('.pagelink').addClass('active');

	$('footer nav ul li a, .link-rodape').filter(function()
	{
		return this.pathname == url;
	}).addClass('active');*/

	//===================== POPUP =====================
	/*if ($('.global_popup').attr('data-display') == 'true') {
		popup();
	}
	$('.popup .fechar').click(function() {
		popup(false);
	});
	$('.global_popup.leave-page').not('figure').click(function() {
		popup(false);
	});

	$("body").on('mouseleave', function() {
		popup();
	});

	setTimeout(function() {
		popup();
	}, 5000);*/
	//===================== POPUP =====================

	//===================== EFEITOS DE MENU =====================
	$('[data-target]').on('click', function(event) {
		event.stopPropagation();
		$('.nav-bullets li').removeClass('focused');
		var classe = $(this).data('target');
		var heightFix = 0;
		$(this).addClass('focused');

		// MENU FIXO NÃO PRECISA DESSA VALIDAÇÃO
		// if ($('.nav-menu').hasClass('menu-aberto')) {
		// 	heightFix = $('.nav-menu.menu-aberto').height();
		// }
		$('html, body').animate({
			scrollTop: $('.' + classe)[0].offsetTop - heightFix
		}, 500);

		// if (heightFix > 0) {
		// 	setTimeout(function(){
		// 		$('.nav-menu').removeClass('menu-aberto').slideUp();
		// 	}, 300);
		// }
	});

	$('.super').on('click', function(event) {
		// if ($(this).hasClass('open')) {
		// 	return;
		// }
		// $('.submenus').slideUp();
		$(this).toggleClass('open').siblings('.submenus').slideToggle();
	});

	//===================== EFEITOS DE MENU =====================
	$('.hamburger').click(function(ev) {
		/*Abrir*/
		if (!$('#hamburger').is(':checked')) {
			if (!$('body').hasClass('fixed')) {
				$('body').addClass('fixed stuck');
			} else {
				$('body').addClass('stuck');
			}
		}
		/*Fechar*/
		else {
			if ($(window).scrollTop() == 0) {
				$('body').addClass('fixed').removeClass('stuck');
			} else {
				$('body').removeClass('fixed stuck');
			}
		}
		// 	$('.nav-menu').toggleClass('menu-aberto').slideToggle('400');
	});

	//===================== OBOX =====================
	var oboxconfirm = "0";
	$('[data-obox-content]').on('click', function(event) {
		if (oboxconfirm === "0") {
			if ($(this)[0].hasAttribute('data-obox-form')) {
				$('.area-obox').addClass('form');
				$('.area-obox .obox-body .close').hide();
				$('.area-obox .obox-body .btn-enviar').bind('click');
			} else if ($(this)[0].hasAttribute('data-obox-confirm')) {
				event.preventDefault();
				var element = $(this)[0];
				oboxconfirm = "1";
				$('.area-obox').removeClass('form').removeClass('confirm');
				$('.area-obox .obox-header h3').remove();
				$('.area-obox .obox-body .content').remove();
				$('.area-obox .obox-body .close').show();
				$('.area-obox .obox-body .close').text('Discordo');
				$('.area-obox').addClass('confirm');
				$('<div></div>').addClass('confirm').text('Concordo').on('click', function(ev) {
					console.log($(element));
					$(element).addClass('btn-enviar').trigger('click');
				}).appendTo('.area-obox .obox-body');
			} else {
				$('.area-obox').removeClass('form');
				$('.area-obox .obox-body .close').show();
			}
			$('.area-obox .obox-header').prepend(
				$('<h3></h3>').text($(this).data('obox-caption'))
			);
			$('.area-obox .obox-body').prepend(
				$('<div></div>').addClass('content').html($(this).data('obox-content'))
			);
			$('.area-obox').fadeIn(300);
			$('body').addClass('stuck');
		} else {
			$('.obox .close').trigger('click');
		}
	});
	$('.obox .close').click(function() {
		oboxconfirm = "0";
		$('.area-obox').fadeOut(300).removeClass('form').removeClass('confirm');
		$('body').removeClass('stuck');
		setTimeout(function() {
			$('.area-obox .obox-header h3').remove();
			$('.area-obox .obox-body .content').remove();
			$('.area-obox .obox-body .close').text('OK');
			$('.area-obox .obox-body .confirm').remove();
			$('.btn-remove-colaborador').removeClass('btn-enviar');
		}, 300);
	});
	/*$('[data-obox-content]').on('click', function(event) {
		event.preventDefault();
		if ($(this)[0].hasAttribute('data-obox-form')) {
			$('.area-obox').addClass('form');
			$('.area-obox .obox-body .close').hide();
			$('.area-obox .obox-body .btn-enviar').bind('click');
		}
		else {
			$('.area-obox').removeClass('form');
			$('.area-obox .obox-body .close').show();
		}
		$('.area-obox .obox-header').prepend(
			$('<h3></h3>').text($(this).data('obox-caption'))
			);
		$('.area-obox .obox-body').prepend(
			$('<div></div>').addClass('content').html($(this).data('obox-content'))
			);
		$('.area-obox').fadeIn(300);
		$('body').addClass('stuck');
	});
	$('.obox .close').click(function() {
		$('.area-obox').fadeOut(300).removeClass('form');
		$('body').removeClass('stuck');
		setTimeout(function(){
			$('.area-obox .obox-header h3').remove();
			$('.area-obox .obox-body .content').remove();
		}, 300);
	});*/

	//===================== EFEITOS DE SCROLL =====================
	// var lastScrollTop = $(this).scrollTop();
	if (($(window).scrollTop() == 0) && (($('.page-home').length) || ($('.page-seja-credenciado').length))) {
		$('body').addClass('fixed');
	}

	$(window).scroll(function(e) {
		e.stopPropagation();

		var scrolltop = $(this).scrollTop();
		if (scrolltop > 0) {
			$("header").addClass('fixed');
			$("body").removeClass('fixed');
		} else {
			$("header").removeClass('fixed');
			if (($(window).scrollTop() == 0) && (($('.page-home').length) || ($('.page-seja-credenciado').length))) {
				$("body").addClass('fixed');
			}
		}
		/*if ($('.page-home').length) {
			if (scrolltop > lastScrollTop){
				console.log("down");
			} else {
				console.log("up");
			}
			window.scrollBy(0,topo);
			lastScrollTop = scrolltop;
		}*/
	});

	//===================== EFEITOS DE DATA =====================
	/*	$("#data_retirada").datepicker({
			dateFormat: 'dd/mm/yy',
			minDate : 0,
			dayNamesMin: [ "Dm", "Sg", "Te", "Qr", "Qn", "Sx", "Sa" ],
			monthNames: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
			onClose: function( selectedDate ) {
				 $( "#data_devolucao" ).datepicker( "option", "minDate", selectedDate );
				$( "#data_devolucao" ).datepicker( "option", "maxDate", "+30D" );
			}
		});

		$("#data_devolucao").datepicker({
			dateFormat: 'dd/mm/yy',
			minDate : 0,
			dayNamesMin: [ "Dm", "Sg", "Te", "Qr", "Qn", "Sx", "Sa" ],
			monthNames: [ "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro" ],
			onClose: function( selectedDate ) {
				$( "#data_retirada" ).datepicker( "option", "maxDate", selectedDate );
			}
		});
		$( "#data_retirada" ).datepicker( "setDate", '+1D' );
		$( "#data_devolucao" ).datepicker( "setDate", '+2D' );*/
});

/*function popup(exibir = true, tempo = 300) {
	var cookie = readCookie("popup");

	if (exibir && cookie == null) {
		$('.global_popup').delay(200).fadeIn(tempo);
		createCookie("popup", "true", 1);
	} else {
		$('.global_popup').fadeOut(tempo);
	}
}

function createCookie(name, value, days) {
	var expires;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0)
			return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}*/


//===================== EFEITOS DE LAZYLOAD =====================
(function() {
	'use strict';

	/* PARAMETERS  */
	if ($('.interna').length) {
		var offset = 95; //int in %
	} else {
		var offset = 95; //int in %
	}
	var offset2 = 35; //int in %

	/* D'ONT TOUCH ANY FURTHER IF YOU DON'T KNOW WHAT YOU ARE DOING */
	// var $targets = $('[data-src]');
	var $targets = $('.lazy');
	var $targets2 = $('.page-home > div');

	var windowHeight = $(window).height(),
		offsetHeight = windowHeight * offset / 100,
		offsetHeight2 = windowHeight * offset2 / 100,
		docHeight = $(document).height();
	$(window).scroll(reveal);
	$(document).ready(reveal);

	function reveal() {
		// console.log(offsetHeight);
		$targets.each(function() {
			var targetTop = $(this).offset().top;
			var windowScroll = $(window).scrollTop();
			//default animation
			// if (!animation) { animation = 'fade-in-up'; }

			// lunch animation if scroll is further the target + offset  OR at the end of the page
			if (targetTop < (windowScroll + offsetHeight) || (windowScroll + windowHeight) == docHeight) {
				$(this).attr('src', $(this).data('src'));

				$(this).removeAttr('data-src').delay(400).removeClass('lazyload');
				if (targetTop < windowScroll) {
					$(this).delay(400).addClass('lazyload');
				}
			} else {
				$(this).delay(400).addClass('lazyload');
			}
		});
		// $targets = $('.lazy');

		$targets2.each(function(i, j) {
			var targetTop = $(this).offset().top;
			var windowScroll = $(window).scrollTop();
			//default animation
			// if (!animation) { animation = 'fade-in-up'; }

			// lunch animation if scroll is further the target + offset  OR at the end of the page
			if (targetTop < (windowScroll + offsetHeight2) || (windowScroll + windowHeight) == docHeight) {
				$('.nav-bullets li').removeClass('focused');
				$('.nav-bullets li[data-target="' + $(this)[0].classList[0] + '"]').addClass('focused');
			}
			/*else if ( targetTop > ( windowScroll + offsetHeight2) || (windowScroll + windowHeight) == docHeight) {
				console.log($(this)[0].classList[0]);
			} else {
				console.log($(this)[0].classList[0]);
			}*/
		});
	}

}());