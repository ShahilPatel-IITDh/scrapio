if(document.getElementById("fecha_instalacion") != null){
    var today = new Date();
    var dd;
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); //IE<=10
    var trident = ua.indexOf('Trident/'); ////IE>=11
  //  $("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});

    if (msie > 0 || trident > 0) //Internet Explorer empieza en 0
        dd = today.getDate() + 3;
    else
        dd = today.getDate() + 2;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;

    document.getElementById("fecha_instalacion").setAttribute("min", today);
    if ($('.fecha_instalacion')[0] != 'date')
        /**
         * Order Controller
         */
        jQuery(document).ready(function ($) {
            jQuery("#zip_code").change(function ($) {
                var zip_code = jQuery("#zip_code").val();
                // console.log(zip_code)
                jQuery.ajax({
                    async: true,
                    type: 'GET',
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    url: jQuery(location).attr('origin') + '/wp-admin/admin-post.php',
                    data: {
                        "action": "get_zip_code",
                        "zip_code": zip_code
                    },
                    beforeSend: function () {
                        jQuery("#address_info").html('<div class="text-center"><img src="/wp-content/uploads/load_spinner.svg"></div>');
                    },
                    complete: function (data) {
                        // console.log(data.responseText)
                        jQuery('#address_info').html(data.responseText)
                    },
                })
            });
        });
}//endif

function createOrder_js1() {
    var firstname = $("#firstname").val() != null ? $("#firstname").val().trim() : "";
    var last_name = $("#last_name").val() != null ? $("#last_name").val().trim() : "";
    var email = $("#email").val() != null ? $("#email").val().trim() : "";
    var tel = $("#tel").val() != null ? $("#tel").val().trim() : "";
	var tel2 = $("#tel2").val() != null ? $("#tel2").val().trim() : "";
	var forma_enterarse = $("#forma_enterarse").val() != null ? $("#forma_enterarse").val().trim() : "";
	var medio_contacto = $("#medio_contacto").val() != null ? $("#medio_contacto").val().trim() : "";
    var street_address = $("#street-address").val() != null ? $("#street-address").val().trim() : "";
    var locality = $("#locality").val() != null ? $("#locality").val().trim() : "";
    var municipio = $("#municipio").val() != null ? $("#municipio").val().trim() : "";
    var city = $("#city").val() != null ? $("#city").val().trim() : "";
    var state = $("#state").val() != null ? $("#state").val().trim() : "";
    var zip_code = $("#zip_code").val() != null ? $("#zip_code").val().trim() : "";
    var fecha_instalacion = $("#fecha_instalacion").val() != null ? $("#fecha_instalacion").val().trim() : "";
    var cc_name = $("#cc-name").val() != null ? $("#cc-name").val().trim() : "";
    var cc_number = $("#cc-number").val() != null ? $("#cc-number").val().trim() : "";
    var cc_csc = $("#cc-csc").val() != null ? $("#cc-csc").val().trim() : "";
    var date_install = $("#fecha_instalacion").val() != null ? $("#fecha_instalacion").val().trim() : "";
    var password = $("#password").val() != null ? $("#password").val().trim() : ""; 
    var promocion = $("#promocion").val() != null ? $("#promocion").val().trim() : "";
	var cantidad_tanques = $("#cantidad_tanques").val() != null ? $("#cantidad_tanques").val().trim() : "";
    if($('#promocion').length > 0) {
        console.log("promocion"+$('#promocion').val());
    } else {
        console.log("No encontrado");
    }

    //si esta vacio lanza error
    if (
        firstname.length == 0 ||
        last_name.length == 0 ||
        email.length == 0 ||
        tel.length == 0 ||
		tel2.length == 0 ||
		forma_enterarse.length == 0 ||
		medio_contacto.length == 0 ||
        street_address.length == 0 |
        locality.length == 0 ||
        municipio.length == 0 ||
        city.length == 0 ||
        zip_code.length == 0 ||
        state.length == 0 ||
        fecha_instalacion.length == 0 ||
        cc_name.length == 0 ||
        cc_number.length == 0 ||
        cc_csc.length == 0 ||
        date_install.length == 0 ||
        ($("#password").length > 0 && password.length == 0)
    ) {
        ($('#firstname').val() != 0) ? $('#firstname').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#firstname').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#last_name").val() != '') ? $('#last_name').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#last_name').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#email").val() != '') ? $('#email').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#email').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#tel").val() != '') ? $('#tel').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#tel').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
		($("#tel2").val() != '') ? $('#tel2').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#tel2').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
		($("#forma_enterarse").val() != '') ? $('#forma_enterarse').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#forma_enterarse').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
		($("#medio_contacto").val() != '') ? $('#medio_contacto').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#medio_contacto').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#street-address").val() != '') ? $('#street-address').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#street-address').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#locality").val() != '') ? $('#locality').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#locality').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#municipio").val() != '') ? $("#municipio").css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#municipio').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#city").val() != '') ? $('#city').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#city').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#state").val() != '') ? $('#state').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#state').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#zip_code").val() != '') ? $('#zip_code').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#zip_code').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#cc-name").val() != '') ? $('#cc-name').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#cc-name').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#cc-number").val() != '') ? $('#cc-number').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#cc-number').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#cc-csc").val() != '') ? $('#cc-csc').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#cc-csc').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#fecha_instalacion").val() != '') ? $('#fecha_instalacion').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#fecha_instalacion').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        ($("#password").val() != '') ? $('#password').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#password').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
        $("#messages").html('<div class="text-center">Por favor asegurate de llenar todos los campos</div>');
    } else {
        // alert("Todo correcto");
		console.log("Todo correcto");

        var parameters = {
            'action': $('#action').val(),
            'firstname': $('#firstname').val(),
            'last_name': $('#last_name').val(),
            'email': $('#email').val(),
            'tel': $('#tel').val(),
			'tel2': $('#tel2').val(),
			'forma_enterarse': $('#forma_enterarse').val(),
			'medio_contacto': $('#medio_contacto').val(),
            'street-address': $('#street-address').val(),
            'locality': $('#locality').val(),
            'municipio': $('#municipio').val(),
            'city': $('#city').val(),
            'state': $('#state').val(),
            'postal-code': $('#zip_code').val(),
            'referencias': $('#referencias').val(),
			'promocion': promocion,
			
            'codigo': $('#codigo').val(),

            'tipo_servicio': $('#tipo_servicio').val(),
            'plazo_a_pagar': $('#plazo_a_pagar').val(),
            'producto': $('#producto').val(),
            'color': $('#color').val(),
            'fecha_instalacion': $('#fecha_instalacion').val(),
            'require_factura': $('#require_factura').val(),
            'rfc': $('#rfc').val(),
            'uso_cfdi': $('#uso_cfdi').val(),

            'forma_pago': $('#forma_pago').val(),

            'cc-name': $('#cc-name').val(),
            'cc-number': $('#cc-number').val(),
            'cc-exp-month': $('#cc-exp-month').val(),
            'cc-exp-year': $('#cc-exp-year').val(),
            'cc-csc': $('#cc-csc').val(),

            'login': $('#login').val(),
            'password': $('#password').val(),
            'prod_id': $('#prod_id').val(),
            'var_id': $('#var_id').val(),
            'price': $('#price').val(),
			'cantidad_tanques': $('#cantidad_tanques').val(),
        };
        $.ajax({
            data: parameters,
            url: jQuery(location).attr('origin') + '/wp-admin/admin-post.php',
            type: 'post',
            beforeSend: function () {
                $("#messages").html('<div class="text-center"><img style="widht:100px; height:100px" src="/wp-content/uploads/load_spinner.svg"></div>');
            },
            success: function (response) {
                console.log(response)
                $("#messages").html(response);
            }
        });
    }
}

function createOrder_js() {

    var forma_pago = $("#forma_pago").val();

    var firstname = $("#firstname").val() != null ? $("#firstname").val().trim() : "";
    var last_name = $("#last_name").val() != null ? $("#last_name").val().trim() : "";
    var email = $("#email").val() != null ? $("#email").val().trim() : "";
    var tel = $("#tel").val() != null ? $("#tel").val().trim() : "";
	var tel2 = $("#tel2").val() != null ? $("#tel2").val().trim() : "";
	var forma_enterarse = $("#forma_enterarse").val() != null ? $("#forma_enterarse").val().trim() : "";
	var medio_contacto = $("#medio_contacto").val() != null ? $("#medio_contacto").val().trim() : "";
    var street_address = $("#street-address").val() != null ? $("#street-address").val().trim() : "";
    var locality = $("#locality").val() != null ? $("#locality").val().trim() : "";
    var municipio = $("#municipio").val() != null ? $("#municipio").val().trim() : "";
    var city = $("#city").val() != null ? $("#city").val().trim() : "";
    var state = $("#state").val() != null ? $("#state").val().trim() : "";
    var zip_code = $("#zip_code").val() != null ? $("#zip_code").val().trim() : "";
    var fecha_instalacion = $("#fecha_instalacion").val() != null ? $("#fecha_instalacion").val().trim() : "";
    var cc_name = $("#cc-name").val() != null ? $("#cc-name").val().trim() : "";
    var cc_number = $("#cc-number").val() != null ? $("#cc-number").val().trim() : "";
    var cc_csc = $("#cc-csc").val() != null ? $("#cc-csc").val().trim() : "";
    var date_install = $("#fecha_instalacion").val() != null ? $("#fecha_instalacion").val().trim() : "";
    var password = $("#password").val() != null ? $("#password").val().trim() : ""; 
    var promocion = $("#promocion").val() != null ? $("#promocion").val().trim() : "";
	var cantidad_tanques = $("#cantidad_tanques").val() != null ? $("#cantidad_tanques").val().trim() : "";

    if(forma_pago==9 || forma_pago==10) {
    //si esta vacio lanza error
        if (
            firstname.length == 0 ||
            last_name.length == 0 ||
            email.length == 0 ||
            tel.length == 0 ||
            tel2.length == 0 ||
            forma_enterarse.length == 0 ||
            medio_contacto.length == 0 ||
            street_address.length == 0 |
            locality.length == 0 ||
            municipio.length == 0 ||
            city.length == 0 ||
            zip_code.length == 0 ||
            state.length == 0 ||
            fecha_instalacion.length == 0 ||
            cc_name.length == 0 ||
            cc_number.length == 0 ||
            cc_csc.length == 0 ||
            date_install.length == 0 ||
            ($("#password").length > 0 && password.length == 0)
        ) {
            ($('#firstname').val() != 0) ? $('#firstname').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#firstname').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#last_name").val() != '') ? $('#last_name').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#last_name').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#email").val() != '') ? $('#email').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#email').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#tel").val() != '') ? $('#tel').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#tel').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#tel2").val() != '') ? $('#tel2').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#tel2').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#forma_enterarse").val() != '') ? $('#forma_enterarse').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#forma_enterarse').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#medio_contacto").val() != '') ? $('#medio_contacto').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#medio_contacto').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#street-address").val() != '') ? $('#street-address').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#street-address').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#locality").val() != '') ? $('#locality').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#locality').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#municipio").val() != '') ? $("#municipio").css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#municipio').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#city").val() != '') ? $('#city').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#city').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#state").val() != '') ? $('#state').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#state').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#zip_code").val() != '') ? $('#zip_code').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#zip_code').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#cc-name").val() != '') ? $('#cc-name').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#cc-name').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#cc-number").val() != '') ? $('#cc-number').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#cc-number').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#cc-csc").val() != '') ? $('#cc-csc').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#cc-csc').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#fecha_instalacion").val() != '') ? $('#fecha_instalacion').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#fecha_instalacion').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#password").val() != '') ? $('#password').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#password').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            $("#messages").html('<div class="text-center">Por favor asegurate de llenar todos los campos</div>');
        } else {
            // alert("Todo correcto");
            console.log("Todo correcto");

            var parameters = {
                'action': $('#action').val(),
                'firstname': $('#firstname').val(),
                'last_name': $('#last_name').val(),
                'email': $('#email').val(),
                'tel': $('#tel').val(),
                'tel2': $('#tel2').val(),
                'forma_enterarse': $('#forma_enterarse').val(),
                'medio_contacto': $('#medio_contacto').val(),
                'street-address': $('#street-address').val(),
                'locality': $('#locality').val(),
                'municipio': $('#municipio').val(),
                'city': $('#city').val(),
                'state': $('#state').val(),
                'postal-code': $('#zip_code').val(),
                'referencias': $('#referencias').val(),
                'promocion': promocion,
                
                'codigo': $('#codigo').val(),

                'tipo_servicio': $('#tipo_servicio').val(),
                'plazo_a_pagar': $('#plazo_a_pagar').val(),
                'producto': $('#producto').val(),
                'color': $('#color').val(),
                'fecha_instalacion': $('#fecha_instalacion').val(),
                'require_factura': $('#require_factura').val(),
                'rfc': $('#rfc').val(),
                'uso_cfdi': $('#uso_cfdi').val(),

                'forma_pago': $('#forma_pago').val(),

                'cc-name': $('#cc-name').val(),
                'cc-number': $('#cc-number').val(),
                'cc-exp-month': $('#cc-exp-month').val(),
                'cc-exp-year': $('#cc-exp-year').val(),
                'cc-csc': $('#cc-csc').val(),

                'login': $('#login').val(),
                'password': $('#password').val(),
                'prod_id': $('#prod_id').val(),
                'var_id': $('#var_id').val(),
                'price': $('#price').val(),
                'cantidad_tanques': $('#cantidad_tanques').val(),
            };
            $.ajax({
                data: parameters,
                url: jQuery(location).attr('origin') + '/wp-admin/admin-post.php',
                type: 'post',
                beforeSend: function () {
                    $("#messages").html('<div class="text-center"><img style="widht:100px; height:100px" src="/wp-content/uploads/load_spinner.svg"></div>');
                },
                success: function (response) {
                    console.log(response)
                    $("#messages").html(response);
                }
            });
        }
    } else {
        if (
            firstname.length == 0 ||
            last_name.length == 0 ||
            email.length == 0 ||
            tel.length == 0 ||
            tel2.length == 0 ||
            forma_enterarse.length == 0 ||
            medio_contacto.length == 0 ||
            street_address.length == 0 |
            locality.length == 0 ||
            municipio.length == 0 ||
            city.length == 0 ||
            zip_code.length == 0 ||
            state.length == 0 ||
            fecha_instalacion.length == 0 ||
            date_install.length == 0 ||
            ($("#password").length > 0 && password.length == 0)
        ) {
            ($('#firstname').val() != 0) ? $('#firstname').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#firstname').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#last_name").val() != '') ? $('#last_name').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#last_name').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#email").val() != '') ? $('#email').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#email').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#tel").val() != '') ? $('#tel').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#tel').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#tel2").val() != '') ? $('#tel2').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#tel2').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#forma_enterarse").val() != '') ? $('#forma_enterarse').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#forma_enterarse').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#medio_contacto").val() != '') ? $('#medio_contacto').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#medio_contacto').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#street-address").val() != '') ? $('#street-address').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#street-address').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#locality").val() != '') ? $('#locality').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#locality').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#municipio").val() != '') ? $("#municipio").css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#municipio').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#city").val() != '') ? $('#city').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#city').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#state").val() != '') ? $('#state').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#state').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#zip_code").val() != '') ? $('#zip_code').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#zip_code').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            ($("#fecha_instalacion").val() != '') ? $('#fecha_instalacion').css({"box-shadow": "","border": "2px solid #E1E8EE"}) : $('#fecha_instalacion').css({ "border": "1px solid red", "box-shadow": "0px 0px 10px -2px red" });
            $("#messages").html('<div class="text-center">Por favor asegurate de llenar todos los campos</div>');
        } else {
            // alert("Todo correcto");
            console.log("Todo correcto");

            var parameters = {
                'action': $('#action').val(),
                'firstname': $('#firstname').val(),
                'last_name': $('#last_name').val(),
                'email': $('#email').val(),
                'tel': $('#tel').val(),
                'tel2': $('#tel2').val(),
                'forma_enterarse': $('#forma_enterarse').val(),
                'medio_contacto': $('#medio_contacto').val(),
                'street-address': $('#street-address').val(),
                'locality': $('#locality').val(),
                'municipio': $('#municipio').val(),
                'city': $('#city').val(),
                'state': $('#state').val(),
                'postal-code': $('#zip_code').val(),
                'referencias': $('#referencias').val(),
                'promocion': promocion,
                
                'codigo': $('#codigo').val(),

                'tipo_servicio': $('#tipo_servicio').val(),
                'plazo_a_pagar': $('#plazo_a_pagar').val(),
                'producto': $('#producto').val(),
                'color': $('#color').val(),
                'fecha_instalacion': $('#fecha_instalacion').val(),
                'require_factura': $('#require_factura').val(),
                'rfc': $('#rfc').val(),
                'uso_cfdi': $('#uso_cfdi').val(),

                'forma_pago': $('#forma_pago').val(),

                'cc-name': $('#cc-name').val(),
                'cc-number': $('#cc-number').val(),
                'cc-exp-month': $('#cc-exp-month').val(),
                'cc-exp-year': $('#cc-exp-year').val(),
                'cc-csc': $('#cc-csc').val(),

                'login': $('#login').val(),
                'password': $('#password').val(),
                'prod_id': $('#prod_id').val(),
                'var_id': $('#var_id').val(),
                'price': $('#price').val(),
                'cantidad_tanques': $('#cantidad_tanques').val(),
            };
            $.ajax({
                data: parameters,
                url: jQuery(location).attr('origin') + '/wp-admin/admin-post.php',
                type: 'post',
                beforeSend: function () {
                    $("#messages").html('<div class="text-center"><img style="widht:100px; height:100px" src="/wp-content/uploads/load_spinner.svg"></div>');
                },
                success: function (response) {
                    console.log(response)
                    $("#messages").html(response);
                }
            });
        }
    }
}