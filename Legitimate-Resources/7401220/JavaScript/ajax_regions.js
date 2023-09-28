function showProducts(){
		$.ajax({
			type : "post",
			url : maim_vars.ajaxurl, //url del admin-ajax.php
			data : {
				action: "buscar_productos", 
				region: $("#region_sel").val()+"|"+$("#region_sel option:selected").text(),
				refer_code : $('#refer_code').val()
			},
			beforeSend: function () {
				$('#productos_region').html('<div class="text-center mt-5 mb-5"><br class="mb-5"><br class="mb-5"><br class="mb-5"><img style="widht:100px; height:100px" src="/wp-content/uploads/load_spinner.svg"></div>');
			},
			error: function(respuesta){
				console.log(respuesta);
			},
			success: function(respuesta) {
				$('#productos_region').html(respuesta);
			}
		})
}

function calculator(){
	//$('#calculadora_maim').html('<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>');
	var region_post = $("#region_sel").val()+"|"+$("#region_sel option:selected").text();
	//si la calculadora está en otra página
	/*if(!location.href.includes("adquiere-maim"))
		region_post = $("#region_sel_hid").val();*/
	x = document.getElementById("firstNumber").value;  
	y = document.getElementById("secondNumber").value;  
	if(x <= 0 || y <= 0)
		return;
		$.ajax({
			type : "post",
			url : maim_vars.ajaxurl, //url del admin-ajax.php
			data : {
				action: "calculadora_productos", 
				region: region_post,
				n1: x,
				n2: y
			},
			beforeSend: function () {
				$('#calculadora_maim').html('<div class="text-center"><img style="widht:100px; height:100px" src="/wp-content/uploads/load_spinner.svg"></div>');
			},
			error: function(respuesta){
				console.log(respuesta);
			},
			success: function(respuesta) {
				$('#calculadora_maim').html(respuesta);
			}
		})
}

$(document).ready( function(){
	
	//sólo imprimo los productos cuando esté en adquiere maim
	if(location.href.includes("adquiere-maim"))
		showProducts();
	/*$('#select_region').on('click', function(){  
		showProducts();
	});*/
	$('#region_sel').on('change', function() {
		showProducts();
	});

	$('#btn-calculadora').on('click', function(){  
		calculator();
	});
	
	$('#btn-calculadora-pop').on('click', function(){  
		$('#calculadora_maim').html('');
	});

});

$('#codigo').keyup(function() {
	// console.log(this.value)
	var pay = $('#pay_type').val()
	// console.log(pay)
	if(this.value == 'buenfin' || this.value == 'BUENFIN' && pay == 'Renta mensual'){
		$('#messages_code').html('<strong>4 MESES MITAD DE PRECIO EN RENTA</strong>')
		$('#display_price').hide()
		// console.log(this.value, 'si es igual')
	}else{
		$('#messages_code').html('')
		$('#display_price').show()
		// console.log(this.value, 'no eses igual')
	}
    
})