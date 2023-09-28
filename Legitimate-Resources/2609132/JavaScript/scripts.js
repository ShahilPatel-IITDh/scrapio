$(function () {




/* NAVBAR */    
            
	var navbar = $('#nab-bar-site');
	$(window).scroll(function(){
		if($(window).scrollTop() <= 1){
			navbar.removeClass('fixed-top bg-white shadow-sm');
		} else {
			navbar.addClass('fixed-top bg-white shadow-sm');
			 $('#logo-original img').attr('src', 'imagens/logo.png');
			// console.log('maior');
		}
	});


/* formularios */
// $(".formulario").submit(function( event ) {
  

// 	$.ajax({
// 	  url: "enviando.php", 
// 	  type : 'post',
// 	  data: $(this).serialize(),
// 	  success: function(result){
// 		$('.result-formulario').html(result);
// 		$('.formulario').each(function(){this.reset(); });
// 		//console.log(data);
// 	  }});

// 	event.preventDefault();
//   });







	$('[data-toggle="tooltip"]').tooltip();
	/* JSON MENU */
	if (menu != '') {
		var m = JSON.parse(menu);
		if (m.menu_descricao == '') {
			$('#menu_descricao').hide();
		} else {
			$('#menu_descricao').html(m.menu_descricao);
		}
		if (m.menu_titulo == '') {
			$('#menu_titulo').hide();
		} else {
			$('#menu_titulo').html(m.menu_titulo);
		}
		if (m.menu_mini_texto == '') {
			$('#menu_mini_texto').hide();
		} else {
			$('#menu_mini_texto').html(m.menu_mini_texto);
		}
	}
	$('.dropdown-submenu .dropdown-item').on("click", function (e) {
		$(this).next('ul').toggle();
		e.stopPropagation();
		e.preventDefault();
	});
	$('#form-busca-nav').submit(function () {
		var q = $('#q').val();
		window.location = "busca&q=" + q;
		return false;
	});
	/* imagem */
	var CapaImagem = "assets/images/sem_imagem.jpg";
	$('.capa').on("error", function () {
		$(this).attr('src', CapaImagem);
	});
	/* formularios */
	$(".formulario").submit(function (event) {
		$.ajax({
			url: "send-email.php",
			type: 'post',
			data: $(this).serialize(),
			success: function (result) {
				$('.result-formulario').html(result);
				$('.formulario').each(function () {
					this.reset();
				});
				//console.log(data);
			}
		});
		event.preventDefault();
	});
	/* orcamento */
	$(".orcamento").submit(function (event) {
		$.ajax({
			url: "send-email.php",
			type: 'post',
			data: $(this).serialize(),
			success: function (result) {
				$('.result-formulario').html(result);
				$('.orcamento').each(function () {
					this.reset();
				});
				//console.log(data);
			}
		});
		event.preventDefault();
	});
	/* curriculo */
	//$(".curriculo").submit(function( event ) {
	var submitButton = $(".curriculo button[type='submit']").attr("disabled", true);
	console.log('e ai?');
	$(".curriculo .required").change(function () {
		var valid = true;
		$.each($(".curriculo .required"), function (index, value) {
			if (!$(value).val()) {
				valid = false;
			}
		});
		if (valid) {
			$(submitButton).attr("disabled", false);
			console.log("valid");
			$(".curriculo").submit(function (event) {
				$.ajax({
					url: "send-email.php",
					type: 'post',
					data: $(this).serialize(),
					success: function (result) {
						$('.result-formulario').html(result);
						$('.curriculo').each(function () {
							this.reset();
						});
						//console.log(data);
					}
				});
				event.preventDefault();
			});
		} else {
			$(submitButton).attr("disabled", true);
		}
	});
	//});
	/* newsletter */
	$(".news").submit(function (event) {
		$.ajax({
			url: "send-email.php",
			type: 'post',
			data: $(this).serialize(),
			success: function (result) {
				$('.result-formulario').html(result);
				$('.news').each(function () {
					this.reset();
				});
			}
		});
		event.preventDefault();
	});
	/* newsletter */
	$(".buscablog").submit(function (event) {
		window.location.assign("blog&q=" + $('#q').val());
		event.preventDefault();
	});
	/* news blog */
	$(".newsblog").submit(function (event) {
		$.ajax({
			url: "send-email.php",
			type: 'post',
			data: $(this).serialize(),
			success: function (result) {
				$('.result-formulario').html(result);
				$('.newsblog').each(function () {
					this.reset();
				});
			}
		});
		event.preventDefault();
	});
	/* informativo */
	$(".informativo").submit(function (event) {
		$.ajax({
			url: "send-email.php",
			type: 'post',
			data: $(this).serialize(),
			success: function (result) {
				$('.result-formulario').html(result);
				$('.informativo').each(function () {
					this.reset();
				});
			}
		});
		event.preventDefault();
	});
	/* calculadora */
	$(".calculadora").submit(function (event) {
		$.ajax({
			url: "send-email.php",
			type: 'post',
			data: $(this).serialize(),
			success: function (result) {
				$('.result-formulario').html(result);
			}
		});
		event.preventDefault();
	});
	/* SLIDER */
	$('.carousel').carousel({
		interval: 2000
	});
	/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
	// 	$(window).scroll(function() {
	//         if ($(this).scrollTop() > 150) { 
	// 			console.log('foi');
	//             $('.grid').masonry({
	//                 // options...
	//                 itemSelector: '.grid-item',
	//                 //columnWidth: 200
	//                 });
	//         }
	//  });
});
/*
--
-- Função para mater a sequencia dos DIVs do mesmo tamanho, pegando o maior!
--
--  Como usar?
--  window.onload = function(){ DivAltura('.card-box'); }
--
*/
function DivAltura(div) {
	var q = jQuery(div).length;
	if (q > 1) {
		var list = new Array();
		list[0] = 0;
		for (i = 1; i <= q; i++) {
			if (jQuery(div + ':eq(' + i + ')').height() > 0)
				list[i] = jQuery(div + ':eq(' + i + ')').height();
			//console.log(list[i]);
		}
		var t = Math.max.apply(null, list);
		jQuery(div).css({
			'height': t
		});
		//console.log(i);
	}
}
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
// LighthBox
$(document).on('click', '[data-toggle="lightbox"]', function (event) {
	event.preventDefault();
	$(this).ekkoLightbox();
});
/* ---------------------------------------------------------------------------------------------------------------------------------------------- */
// CountNumber
$({
	Counter: 0
}).animate({
	Counter: $('.contator').text()
}, {
	duration: 1000,
	easing: 'swing',
	step: function () {
		$('.contator').text(Math.ceil(this.Counter));
	}
});