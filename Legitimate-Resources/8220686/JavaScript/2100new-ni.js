if(navigator.appVersion.indexOf("MSIE 9.")!=-1 || navigator.appVersion.indexOf("MSIE 8.")!=-1 || navigator.appVersion.indexOf("MSIE 7.")!=-1){
	//no carga plugin si es ie
}else{

//enquire.js
!function(a,b,c){var d=window.matchMedia;"undefined"!=typeof module&&module.exports?module.exports=c(d):"function"==typeof define&&define.amd?define(function(){return b[a]=c(d)}):b[a]=c(d)}("enquire",this,function(a){"use strict";function b(a,b){var c,d=0,e=a.length;for(d;e>d&&(c=b(a[d],d),c!==!1);d++);}function c(a){return"[object Array]"===Object.prototype.toString.apply(a)}function d(a){return"function"==typeof a}function e(a){this.options=a,!a.deferSetup&&this.setup()}function f(b,c){this.query=b,this.isUnconditional=c,this.handlers=[],this.mql=a(b);var d=this;this.listener=function(a){d.mql=a,d.assess()},this.mql.addListener(this.listener)}function g(){if(!a)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!a("only all").matches}return e.prototype={setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},f.prototype={addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var c=this.handlers;b(c,function(b,d){return b.equals(a)?(b.destroy(),!c.splice(d,1)):void 0})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){b(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";b(this.handlers,function(b){b[a]()})}},g.prototype={register:function(a,e,g){var h=this.queries,i=g&&this.browserIsIncapable;return h[a]||(h[a]=new f(a,i)),d(e)&&(e={match:e}),c(e)||(e=[e]),b(e,function(b){d(b)&&(b={match:b}),h[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},new g});
}

$(document).ready(function () {

	//ACORDEON PAGO CON TARJETA
	if ($(".datosTarjeta").css('display') == 'block') {
		$(".tituloPagoTarjeta").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaarriba.png)');
	} else {
		$(".tituloPagoTarjeta").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaabajo.png)');
	}

	//$(".linkIupay").click(function (event) {event.preventDefault();}
		
	$(".tituloPagoTarjeta").click(function () {
		if ($(".datosTarjeta").css('display') == 'block') {
			$(".tituloPagoTarjeta").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaabajo.png)');
		} else {
			$(".tituloPagoTarjeta").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaarriba.png)');
		}
		$(".datosTarjeta").slideToggle(300);
	});
	
	//ACORDEON PAGO CON TARJETA UPI	
	if ($(".datosTarjetaUPI").css('display') == 'block') {
		$(".tituloPagoTarjetaUPI").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaarriba.png)');
	} else {
		$(".tituloPagoTarjetaUPI").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaabajo.png)');
	}
	$(".tituloPagoTarjetaUPI").click(function () {
		if ($(".datosTarjetaUPI").css('display') == 'block') {
			$(".tituloPagoTarjetaUPI").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaabajo.png)');
		} else {
			$(".tituloPagoTarjetaUPI").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaarriba.png)');
		}
		$(".datosTarjetaUPI").slideToggle(300);
	});


	//ACORDEON OTRAS FORMAS DE PAGO
	if ($("h3.sarrow")) {
		if ($(".box-method-wr").css('display') == 'block') {
			$("h3.sarrow").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaarriba.png)');
		} else {
			$("h3.sarrow").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaabajo.png)');
		}
	    $("h3.sarrow").off('click');
	    $("h3.sarrow").click(function () {
			if ($(".box-method-wr").css('display') == 'block') {
				$("h3.sarrow").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaabajo.png)');
			} else {
				$("h3.sarrow").css('background-image', 'url(/sis/graficos/logotipos/comunes/2100abrirpuntaarriba.png)');
			}
			$(".box-method-wr").slideToggle(300);
	    });
	}

	//CAMBIO DE ORDEN DE ELEMENTOS
	$( ".center-cards" ).appendTo( $( ".tituloPagoTarjeta" ) );
	$( ".buttons-wr" ).appendTo( $( ".datosTarjeta" ) );
	$( ".verified ul" ).prepend( $( ".logoEsquemaServired" ) );
	$( "#footer" ).prepend( $( ".powered" ) );

	//CREACION DE CABECERA VERSIÓN MÓVIL
	$("#body").prepend('<div class="header-mobile"><div class="comercio-mobile"></div><div class="precio-mobile"></div></div>');
	$('.logoComercio').clone().appendTo('.comercio-mobile');
    $('.price >.right').clone().appendTo('.precio-mobile');
	
	//CAMBIO DE ORDEN DE ELEMENTOS EN RESPONSIVE
	/*if(navigator.appVersion.indexOf("MSIE 9.")!=-1 || navigator.appVersion.indexOf("MSIE 8.")!=-1 || navigator.appVersion.indexOf("MSIE 7.")!=-1){
	}else{
	enquire.register("screen and (max-width:750px)", {
        match : function() { 
                $('.result').insertBefore('.preft');
        },
        unmatch : function() {
                $('.result').insertBefore('.verified');
        }
	});
	}*/	

});