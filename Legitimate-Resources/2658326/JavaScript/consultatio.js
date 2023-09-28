(function($) {


    $('#two').click(function(){
        $('#count').val('2');
    });

    $('#four').click(function(){
        $('#count').val('4');
    });


    $('#0a3').click(function(){
        $('.dropbtn').val('De 0 – 3 meses');
    });

    $('#3a6').click(function(){
        $('.dropbtn').val('De 3 – 6 meses');
    });

    $('#6a9').click(function(){
        $('.dropbtn').val('De 6 – 9 meses');
    });

    $('#h1').click(function(){
        $('.dropbtn').val('Hasta 1 año');
    });

    $('#1a2').click(function(){
        $('.dropbtn').val('De 1 – 2 años');
    });

    $('#2a3').click(function(){
        $('.dropbtn').val('De 2 – 3 años');
    });

    $(".fondo-resumen").click(function(){
        $(".fondo-resumen").addClass("active");
        $(".fondo-rendimiento").removeClass("active");
        $(".fondo-portfolio").removeClass("active");
        $(".fondo-literatura").removeClass("active");
        $(".fondo-resumen-content").show();
        $(".fondo-rendimiento-content").hide();
        $(".fondo-portfolio-content").hide();
        $(".fondo-literatura-content").hide();
    });

    $(".fondo-rendimiento").click(function(){
        $(".fondo-resumen").removeClass("active");
        $(".fondo-rendimiento").addClass("active");
        $(".fondo-portfolio").removeClass("active");
        $(".fondo-literatura").removeClass("active");
        $(".fondo-resumen-content").hide();
        $(".fondo-rendimiento-content").show();
        $(".fondo-portfolio-content").hide();
        $(".fondo-literatura-content").hide();
    });

    $(".fondo-portfolio").click(function(){
        $(".fondo-resumen").removeClass("active");
        $(".fondo-rendimiento").removeClass("active");
        $(".fondo-portfolio").addClass("active");
        $(".fondo-literatura").removeClass("active");
        $(".fondo-resumen-content").hide();
        $(".fondo-rendimiento-content").hide();
        $(".fondo-portfolio-content").show();
        $(".fondo-literatura-content").hide();
    });

    $(".fondo-literatura").click(function(){
        $(".fondo-resumen").removeClass("active");
        $(".fondo-rendimiento").removeClass("active");
        $(".fondo-portfolio").removeClass("active");
        $(".fondo-literatura").addClass("active");
        $(".fondo-resumen-content").hide();
        $(".fondo-rendimiento-content").hide();
        $(".fondo-portfolio-content").hide();
        $(".fondo-literatura-content").show();
    });



    function setup_collapsible_submenus() {
        var $menu = $('#mobile_menu'),
            top_level_link = '#mobile_menu .menu-item-has-children > a';

        $menu.find('a').each(function() {
            $(this).off('click');

            if ( $(this).is(top_level_link) ) {
                $(this).attr('href', '#');
            }

            if ( ! $(this).siblings('.sub-menu').length ) {
                $(this).on('click', function(event) {
                    $(this).parents('.mobile_nav').trigger('click');
                });
            } else {
                $(this).on('click', function(event) {
                    event.preventDefault();
                    $(this).parent().toggleClass('visible');
                });
            }
        });
    }

    $(window).load(function() {
        setTimeout(function() {
            setup_collapsible_submenus();
        }, 700);
    });


    var rangeSlider = function(){

        var slider = $('.range-slider'),
            range = $('.range-slider__range'),
            value = $('.range-slider__value');

        slider.each(function(){

          value.each(function(){
            var value = $(this).prev().attr('value');
            $(this).html(value);
          });

          range.on('input', function(){
            $(this).next(value).html(this.value);
            if (this.value == 1) {
                $( ".data-table" ).addClass( "off" );
                $( ".data-conservador" ).removeClass( "off" );
            }
            else if (this.value == 2) {
                $( ".data-table" ).addClass( "off" );
                $( ".data-moderado" ).removeClass( "off" );
            }
            else if (this.value == 3) {
                $( ".data-table" ).addClass( "off" );
                $( ".data-agresivo" ).removeClass( "off" );
            }
            else {
                $('.header-title').html("");
                $( ".data-table" ).removeClass( "off" );
            }
          });
        });
    };

    rangeSlider();

	$(".pregunta_continuar button").click(function(event){
		event.preventDefault();

		var id = $(this).attr("id");
		id = id.replace('p', '');
		//Continuar(id);
		Continuar_new(id);
  	});

	$(".pregunta_volver button").click(function(event){
		event.preventDefault();
		$('.preg').hide();
		var id = $(this).attr("id");

		id = id.replace('p', '');

		if( id != 'FIN'){
			$('#contenedor_pregunta_'+id).fadeIn();
			//$('#pasoval').text(parseInt(id)+1);
			//$('#contenedor_progreso div').removeClass('progreso_activo');

			$('.rprogress-wrap').each(function(i, e) {
				var getPercent = ($(e).data('progress-percent') / 100);
				var getProgressWrapWidth = $(e).width();
				var progressTotal = getPercent * getProgressWrapWidth;
				var animationLength = $(e).data('speed');

				$(e).find('.rprogress-bar').stop().animate({
						left: progressTotal
					}, animationLength);
			});

			/*var i = 0;
			while (i<=id){
				//$('#contenedor_progreso #progreso_'+i).addClass('progreso_activo');
			  i++;
			}*/
		}else{

			/*$('#pasos').fadeOut();
			//$('#contenedor_progreso').fadeOut();
			$('#loading').show();
			$( "#frm" ).submit();*/
		}
  	});

	$(".inversor-progress-bar-general input[type='radio']").change(function() {
		var id = $(this).attr("name");
		var padre = $( this ).closest( ".preg" );
		var pid = $( padre ).attr("id");
		$( '#'+pid+' .pregunta_continuar button' ).removeClass('boton_des');
		$( '#'+pid+' .pregunta_continuar button' ).prop("disabled", false);
		//console.log(id);
		id = id.replace('p', '');
		//Continuar(parseInt(id)+1);
		Continuar_new(parseInt(id)+1);

		// Aca es lo que agrego.
		/*var nextURL = window.location.pathname + "?pregunta=" + pregTotal;
		window.location.replace(nextURL);*/
	});

	$(".inversor-progress-bar-general input[type='checkbox']").change(function() {
		var id = $(this).attr("name");
		var padre = $( this ).closest( ".preg" );
		var pid = $( padre ).attr("id");

		$( '#'+pid+' .pregunta_continuar button' ).removeClass('boton_des');
		$( '#'+pid+' .pregunta_continuar button' ).prop("disabled", false);

		id = id.replace('p', '');
		//Continuar(parseInt(id)+1);
	});


	$(".inversor-progress-bar-general input[type='text']").change(function() {
		var id = $(this).attr("name");
		var padre = $( this ).closest( ".preg" );
		var pid = $( padre ).attr("id");

		if( $("input[name=p"+id+"]").val() != ''){
			$( '#'+pid+' .pregunta_continuar button' ).removeClass('boton_des');
			$( '#'+pid+' .pregunta_continuar button' ).prop("disabled", false);
		}
	});

	/*if( $('#idrespuestas').val() != '' ){
		//$( '.pregunta_continuar button' ).removeClass('boton_des');
		//$( '.pregunta_continuar button' ).prop("disabled", false);
	}*/

	$("#marca_todas").click(function(event){
		$('#contenedor_pregunta_4 :checkbox').prop('checked',true);
  	});

	$(function(){
		if( $("input[name=p0]").val() != '' ){
			$( '#contenedor_pregunta_0 .pregunta_continuar button' ).removeClass('boton_des');
			$( '#contenedor_pregunta_0 .pregunta_continuar button' ).prop("disabled", false);
		}
	});

	$("input[name=p0]").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

        var id = $(this).attr("id");
		var padre = $( this ).closest( ".preg" );
		var pid = $( padre ).attr("id");

        if( $('#p0').val() != '' ){
    		$( '#'+pid+' .pregunta_continuar button' ).removeClass('boton_des');
    		$( '#'+pid+' .pregunta_continuar button' ).prop("disabled", false);

    		id = id.replace('p', '');
    		//Continuar(parseInt(id)+1);
    	}
    });

	$("input[name=monto]").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

	$("input").focus(function(event){
	    if($(this).attr("content")){
        	$("#flotanteAyuda").html($(this).attr("content"));
        	$("#flotanteAyuda").css({left:this.offsetLeft, top:this.offsetTop-35, display:"block"});
    	}
    });

    $("input").focusout(function(event){
        $("#flotanteAyuda").hide();
    });

	var pregTotal = 0;
	function Continuar(id){
		if($( "input[name=p"+(id-1)+"]" ).val() == ""){
			return false;
		}

		var nextURL = window.location.pathname + "?paso="+id+"&p0="+$( "input[name=p0]:checked" ).val()+"&p1="+$( "input[name=p1]:checked" ).val()+"&p2="+$( "input[name=p2]:checked" ).val()+"&p3="+$( "input[name=p3]:checked" ).val()+"&p4="+$( "input[name=p4]:checked" ).val();

		if( id != 'FIN'){
			/*$('.preg').hide();
			$('#contenedor_pregunta_'+id).fadeIn();*/

			//$('#pasoval').text(parseInt(id)+1);

			//$('#contenedor_progreso div').removeClass('progreso_activo');

			/*var i = 0;
			while (i<=id){
				//$('#contenedor_progreso #progreso_'+i).addClass('progreso_activo');
			  i++;
			}*/

			//$("html, body").animate({ scrollTop: 0 }, 600);
			$('.rprogress-wrap').each(function(i, e) {
				var getPercent = ($(e).data('progress-percent') / 100);
				var getProgressWrapWidth = $(e).width();
				var progressTotal = getPercent * getProgressWrapWidth;
				var animationLength = $(e).data('speed');

				$(e).find('.rprogress-bar').stop().animate({
						left: progressTotal
					}, animationLength);
			});

			//var nextURL = window.location.pathname + "?pregunta="+id+"&="+$( "input[name=p"+(id-1)+"]" ).val();

			window.location.replace(nextURL);
			
		}else{
			/*if( jQuery("#frm").valid() ){
				$('.preg').hide();
				$('#pasos').fadeOut();
				$('#contenedor_progreso').fadeOut();
				$('#loading').show();
				$( "#frm" ).submit();
			}*/
			$("#contenedor_pregunta_5").append('<div class="loader-container"><div class="loader-anim">Loading...</div></div>');
			pregTotal = parseInt($( "input[name=p0]" ).val())+parseInt($( "input[name=p1]" ).val())+parseInt($( "input[name=p2]" ).val())+parseInt($( "input[name=p3]" ).val())+parseInt($( "input[name=p4]" ).val());

			//$.post( "/wp-json/list/simulador/insert", $( "#simulador_form" ).serialize() );
			//console.log(pregTotal);
			/*if(pregTotal >= 24){
				$("#resultado_perfil").val("A");
			} else if(pregTotal >= 16 && pregTotal < 24){
				$("#resultado_perfil").val("M");
			} else {
				$("#resultado_perfil").val("C");
			}*/
			
			
			if(pregTotal <= 13){
				$("#resultado_perfil").val("C");
			} else if(pregTotal <= 26){
				$("#resultado_perfil").val("M");
			} else {
				$("#resultado_perfil").val("A");
			}

			$.ajax({
                url: '/wp-json/list/simulador/insert',
                dataType: 'json',
                type: 'post',
                data: $("#simulador_form").serialize(),
                success: function( data ){
					/*console.log("hola");
					console.log(pregTotal);*/
                    /*if(pregTotal >= 24){
						$(location).attr('href', '/cartera-recomendada/?perfil=agresivo');
					} else if(pregTotal >= 16 && pregTotal < 24){
						$(location).attr('href', '/cartera-recomendada/?perfil=moderado');
					} else {
						$(location).attr('href', '/cartera-recomendada/?perfil=conservador');
					}*/
					if(pregTotal <= 13){
						$(location).attr('href', '/cartera-recomendada/?resultado=perfil&perfil=conservador');
					} else if(pregTotal <= 26){
						$(location).attr('href', '/cartera-recomendada/?resultado=perfil&perfil=moderado');
					} else {
						$(location).attr('href', '/cartera-recomendada/?resultado=perfil&perfil=agresivo');
					}
                }
            });

			return false;
		}
	}
	
	function Continuar_new(id){
		if($( "input[name=p"+(id-1)+"]" ).val() == ""){
			return false;
		}
		
		var preg0 = $( "input[name=p0]:checked" ).val();
		var preg1 = $( "input[name=p1]:checked" ).val();
		var preg2 = $( "input[name=p2]:checked" ).val();
		var preg3 = $( "input[name=p3]:checked" ).val();
		var preg4 = $( "input[name=p4]:checked" ).val();
		var preg5 = $( "input[name=p5]:checked" ).val();
		var preg6 = $( "input[name=p6]:checked" ).val();
		var preg7 = $( "input[name=p7]:checked" ).val();
		
		console.log($( "input[name=p"+id+"]" ).attr("data-valor"));

		var nextURL = window.location.pathname + "?paso="+id+"&p0="+preg0+"&p1="+preg1+"&p2="+preg2+"&p3="+preg3+"&p4="+preg4+"&p5="+preg5+"&p6="+preg6+"&p7="+preg7;

		if( id != 'FIN'){
			$('.rprogress-wrap').each(function(i, e) {
				var getPercent = ($(e).data('progress-percent') / 100);
				var getProgressWrapWidth = $(e).width();
				var progressTotal = getPercent * getProgressWrapWidth;
				var animationLength = $(e).data('speed');

				$(e).find('.rprogress-bar').stop().animate({
						left: progressTotal
					}, animationLength);
			});
			

			window.location.replace(nextURL);

		}else{
			$("#contenedor_pregunta_8").append('<div class="loader-container"><div class="loader-anim">Loading...</div></div>');
			var val0 = parseInt($( "input[name=p0]:checked" ).attr("data-valor"));
			var val1 = parseInt($( "input[name=p1]:checked" ).attr("data-valor"));
			var val2 = parseInt($( "input[name=p2]:checked" ).attr("data-valor"));
			var val3 = parseInt($( "input[name=p3]:checked" ).attr("data-valor"));
			var val4 = parseInt($( "input[name=p4]:checked" ).attr("data-valor"));
			var val5 = parseInt($( "input[name=p5]:checked" ).attr("data-valor"));
			var val6 = parseInt($( "input[name=p6]:checked" ).attr("data-valor"));
			var val7 = parseInt($( "input[name=p7]:checked" ).attr("data-valor"));
			
			pregTotal = val0+val1+val2+val3+val4+val5+val6+val7;
			console.log(pregTotal);


			if(pregTotal <= 45){
				$("#resultado_perfil").val("C");
			} else if(pregTotal <= 64){
				$("#resultado_perfil").val("M");
			} else {
				$("#resultado_perfil").val("A");
			}
			
			$.ajax({
				url: 'https://www2.consultatioplus.com/l/527812/2019-03-12/fxkdc7',
				type: 'post',
				data: $("#simulador_form").serialize()
			});
				
			$.ajax({
				url: '/wp-json/list/simulador/insert',
				dataType: 'json',
				type: 'post',
				data: $("#simulador_form").serialize(),
				success: function( data ){
					if(pregTotal <= 45){
						$(location).attr('href', '/cartera-recomendada/?resultado=perfil&perfil=conservador');
					} else if(pregTotal <= 64){
						$(location).attr('href', '/cartera-recomendada/?resultado=perfil&perfil=moderado');
					} else {
						$(location).attr('href', '/cartera-recomendada/?resultado=perfil&perfil=agresivo');
					}
				}
			});

			return false;
		}
	}

	$.getURL = function(key)   {
        key = key.replace(/[\[]/, '\\[');
        key = key.replace(/[\]]/, '\\]');
        var pattern = "[\\?&]" + key + "=([^&#]*)";
        var regex = new RegExp(pattern);
        var url = unescape(window.location.href);
        var results = regex.exec(url);
        if (results === null) {
            return null;
        } else {
            return results[1];
        }
    }

	$(function(){
		//$('#contenedor_pregunta_'+$.getURL("pregunta")).fadeIn();
		$('.preg').hide();
		if($.getURL("paso")){
			$('#contenedor_pregunta_'+$.getURL("paso")).fadeIn();

			if($.getURL("p0")){
				//$( "input[name=p0]" ).val($.getURL("p0"));
				$("input[name='p0'][value='"+$.getURL("p0")+"']").prop('checked', true);
			}
			if($.getURL("p1")){
				//$( "input[name=p1]" ).val($.getURL("p1"));
				$("input[name='p1'][value='"+$.getURL("p1")+"']").prop('checked', true);
			}
			if($.getURL("p2")){
				//$( "input[name=p2]" ).val($.getURL("p2"));
				$("input[name='p2'][value='"+$.getURL("p2")+"']").prop('checked', true);
			}
			if($.getURL("p3")){
				//$( "input[name=p3]" ).val($.getURL("p3"));
				$("input[name='p3'][value='"+$.getURL("p3")+"']").prop('checked', true);
			}
			if($.getURL("p4")){
				//$( "input[name=p4]" ).val($.getURL("p4"));
				$("input[name='p4'][value='"+$.getURL("p4")+"']").prop('checked', true);
			}
			if($.getURL("p5")){
				$("input[name='p5'][value='"+$.getURL("p5")+"']").prop('checked', true);
			}
			if($.getURL("p6")){
				$("input[name='p6'][value='"+$.getURL("p6")+"']").prop('checked', true);
			}
			if($.getURL("p7")){
				$("input[name='p7'][value='"+$.getURL("p7")+"']").prop('checked', true);
			}

		} else {
			$('#contenedor_pregunta_0').fadeIn();
		}
	});
	
	/*$(function(){
		$('.preg').hide();
		if($.getURL("paso")){
			$('#contenedor_pregunta_'+$.getURL("paso")).fadeIn();

			if($.getURL("p0")){
				$("input[name='p0'][value='"+$.getURL("p0").replace("-"," ")+"']").prop('checked', true);
			}
			if($.getURL("p1")){
				$("input[name='p1'][value='"+$.getURL("p1").replace("-"," ")+"']").prop('checked', true);
			}
			if($.getURL("p2")){
				$("input[name='p2'][value='"+$.getURL("p2").replace("-"," ")+"']").prop('checked', true);
			}
			if($.getURL("p3")){
				$("input[name='p3'][value='"+$.getURL("p3").replace("-"," ")+"']").prop('checked', true);
			}
			if($.getURL("p4")){
				$("input[name='p4'][value='"+$.getURL("p4").replace("-"," ")+"']").prop('checked', true);
			}
			if($.getURL("p5")){
				$("input[name='p5'][value='"+$.getURL("p5").replace("-"," ")+"']").prop('checked', true);
			}
			if($.getURL("p6")){
				$("input[name='p6'][value='"+$.getURL("p6").replace("-"," ")+"']").prop('checked', true);
			}
			if($.getURL("p4")){
				$("input[name='p7'][value='"+$.getURL("p7").replace("-"," ")+"']").prop('checked', true);
			}

		} else {
			$('#contenedor_pregunta_0').fadeIn();
		}
	});*/

	var drag1 = new Dragdealer('simple-slider', {
	  steps: 4,
	  callback: function(x, y) {
		if( Math.round(x * 100) == 33 ){
			$('.data-conservador').show();
			$('.data-moderado').hide();
			$('.data-agresivo').hide();
			$('.comparativo-style .primary-btn').attr('href', 'https://consultatioplus.com/cartera-recomendada/?perfil=conservador');
		}
		if( Math.round(x * 100) == 67 ){
			$('.data-conservador').hide();
			$('.data-moderado').show();
			$('.data-agresivo').hide();
			$('.comparativo-style .primary-btn').attr('href', 'https://consultatioplus.com/cartera-recomendada/?perfil=moderado');
		}
		if(  Math.round(x * 100) == 100 ){
			$('.data-conservador').hide();
			$('.data-moderado').hide();
			$('.data-agresivo').show();
			$('.comparativo-style .primary-btn').attr('href', 'https://consultatioplus.com/cartera-recomendada/?perfil=agresivo');
		}
		if( Math.round(x * 100) == 0 ){
			$('.data-conservador').show();
			$('.data-moderado').show();
			$('.data-agresivo').show();
			$('.comparativo-style .primary-btn').attr('href', 'https://consultatioplus.com/perfil-de-inversor/');
		}
	  }
	});

	/*function getParameters() {
     var searchString = window.location.search.substring(1),
       params = searchString.split("&"),
       hash = {};

     if (searchString == "") return {};
     for (var i = 0; i < params.length; i++) {
       var val = params[i].split("=");
       hash[unescape(val[0])] = unescape(val[1]);
     }

     return hash;
   }*/
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	//console.log(getParameterByName("perfil"));
	if(getParameterByName("perfil") == "agresivo"){
		var defaultperfil = 1;
		$("input[name=resultado_perfil]").val("A");
		$("#cartera_conservador_graf").hide();
		$("#cartera_moderado_graf").hide();
		$("#cartera_agresivo_graf").show();
		
		$("#chartdiv_agresivo-curtain").hide();
	} else if(getParameterByName("perfil") == "moderado"){
		var defaultperfil = 0.5;
		$("input[name=resultado_perfil]").val("M");
		$("#cartera_conservador_graf").hide();
		$("#cartera_moderado_graf").show();
		$("#cartera_agresivo_graf").hide();
		
		$("#chartdiv_moderado-curtain").hide();
	} else {
		var defaultperfil = 0;
		$("input[name=resultado_perfil]").val("C");
		$("#cartera_conservador_graf").show();
		$("#cartera_moderado_graf").hide();
		$("#cartera_agresivo_graf").hide();
		
		$("#chartdiv_conservador-curtain").hide();
	}
	var drag2 = new Dragdealer('simple-slider-cartera', {
	  steps: 3,
	  x: defaultperfil,
	  callback: function(x, y) {
		if( Math.round(x * 100) == 0 ){
			$(".text_perfil").each(function(){
        	    $(this).html("Conservador");
        	});
			$(".et_pb_row_1-2_1-4_1-4").append('<div class="loader-container"><div class="loader-anim">Loading...</div></div>');
			$("input[name=resultado_perfil]").val("C");
			setDataSetFondos("/wp-json/list/dist_cartera/conservador?tipo=fondos");
			setDataSetMoneda("/wp-json/list/dist_cartera/conservador?tipo=moneda");
			setDataSetCredito("/wp-json/list/dist_cartera/conservador?tipo=credito");
			$("#cartera_conservador_graf").show();
			$("#cartera_moderado_graf").hide();
			$("#cartera_agresivo_graf").hide();
		}
		if( Math.round(x * 100) == 50 ){
			$(".text_perfil").each(function(){
        	    $(this).html("Moderado");
        	});
			$(".et_pb_row_1-2_1-4_1-4").append('<div class="loader-container"><div class="loader-anim">Loading...</div></div>');
			$("input[name=resultado_perfil]").val("M");
			setDataSetFondos("/wp-json/list/dist_cartera/moderado?tipo=fondos");
			setDataSetMoneda("/wp-json/list/dist_cartera/moderado?tipo=moneda");
			setDataSetCredito("/wp-json/list/dist_cartera/moderado?tipo=credito");
			$("#cartera_conservador_graf").hide();
			$("#cartera_moderado_graf").show();
			$("#cartera_agresivo_graf").hide();
		}
		if(  Math.round(x * 100) == 100 ){
			$(".text_perfil").each(function(){
        	    $(this).html("Agresivo");
        	});
			$(".et_pb_row_1-2_1-4_1-4").append('<div class="loader-container"><div class="loader-anim">Loading...</div></div>');
			$("input[name=resultado_perfil]").val("A");
			setDataSetFondos("/wp-json/list/dist_cartera/agresivo?tipo=fondos");
			setDataSetMoneda("/wp-json/list/dist_cartera/agresivo?tipo=moneda");
			setDataSetCredito("/wp-json/list/dist_cartera/agresivo?tipo=credito");
			$("#cartera_conservador_graf").hide();
			$("#cartera_moderado_graf").hide();
			$("#cartera_agresivo_graf").show();
		}
	  }
	});
	//drag2.setValue(1);
	function setDataSetFondos(dataset_url) {
	  AmCharts.loadFile(dataset_url, {}, function(data) {
		chart_fondos.dataProvider = AmCharts.parseJSON(data);
		chart_fondos.validateData();
		$(".loader-container").remove();
	  });
	}

	function setDataSetMoneda(dataset_url) {
	  AmCharts.loadFile(dataset_url, {}, function(data) {
		chart_moneda.dataProvider = AmCharts.parseJSON(data);
		chart_moneda.validateData();
		$(".loader-container").remove();
	  });
	}

	function setDataSetCredito(dataset_url) {
	  AmCharts.loadFile(dataset_url, {}, function(data) {
		chart_credito.dataProvider = AmCharts.parseJSON(data);
		chart_credito.validateData();
		$(".loader-container").remove();
	  });
	}

	function CerrarElearning(){
		$( "#iframe_elearning" ).remove();
	}

	$("#popup-modal-btn").click(function(){
        $(".popup-modal").show();
		//$("#div_iframe").append( '<iframe id="iframe_elearning" src="https://www.consultatioplus.com/wp-content/themes/Cplus-Child/elearninghtml5/" width="100%" height="800"></iframe>' );
		$("#div_iframe").append( '<iframe id="iframe_elearning" src="/wp-content/themes/Cplus-Child/elearninghtml5/" width="100%" height="800" frameborder="0" allowfullscreen></iframe>' );
		ga('send','event','Educacion','clickBotoneducacion','E-Learning Interactivo',1);
    });
    $(".popup-close").click(function(){
        $(".popup-modal").hide();
		CerrarElearning();
    });
    $(".popup-overlay").click(function(){
        $(".popup-modal").hide();
    });

	$("#enviar_cartera").click(function(){

		if(isValidEmail($("input[name=prefijo]").val())){
			alert("Email no valido");
		} else {
			$.ajax({
					url: '/wp-json/list/simulador/insert',
					dataType: 'json',
					type: 'post',
					data: $("#simulador_form").serialize(),
					success: function( data ){
						$(".popup-modal").hide();
						return false;
					}
				});
		}
		return false;
    });

	$("input[name=prefijo]").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

	$("input[name=telefono]").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && e.ctrlKey === true) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

	function isValidEmail(emailText) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(emailText);
	};

	$( '#logo' ).click(function() {
		ga('send', 'event', 'Plus Inversiones', 'logoplusinversionesclick', 'Logo plus Inversiones', 1);
	});
	$( '#menu-item-2965' ).click(function() {
		//ga('send', 'event', 'Abri una cuenta', 'click', 'Abrí tu cuenta ', 1);
		ga('send', 'event', 'Abri una cuenta', 'Abrircuentaclick', 'Abri un cuenta header', 1);
	});
	$( '#menu-item-2964' ).click(function() {
		//ga('send', 'event', 'Boton Ingresar', 'click', 'Boton Ingresar ', 1);
		ga('send', 'event', 'Ingresar', 'Ingresarclick', 'Ingresar header', 1);
	});
	$( '#menu-item-2942' ).click(function() {
		ga('send', 'event', 'Contacto', 'Contactoclick', 'Contacto', 1);
	});
	$( '#id_mundoinversiones' ).click(function() {
		ga('send', 'event', 'Educacion', 'clickElMundodeLasInversiones', 'MundodeInversiones', 1);
	});
	$( '#id_glosario' ).click(function() {
		ga('send', 'event', 'Educacion', 'clickGlosario', 'Glosario', 1);
	});
	$( '#id_faq' ).click(function() {
		ga('send', 'event', 'Educacion', 'clickFAQ', 'FAQ', 1);
	});

})( jQuery );

function HomePerfil(){
	/*console.log(document.getElementById("homeplazo").value);
	console.log(document.getElementById("cantidad").value);*/
	ga('send', 'event', 'Conocer mi perfil de inversos', 'click', ' Conocer mi perfil ', 1);
	//$(location).attr('href', '/perfil-de-inversor/?monto='+document.getElementById("cantidad").value);
	//location.href = '/perfil-de-inversor/?monto='+document.getElementById("cantidad").value;
	location.href = '/perfil-de-inversor/';
}

/*function resizeIframe(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
}*/
function resizeIframe(iframe) {
    var padding = 50;
    if (iframe.contentWindow.document.body.scrollHeight < (window.innerHeight - padding))
        iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
    else
        iframe.height = (window.innerHeight - padding) + "px";
}
