var slide = false;
var estatica = false;

function aguarde(aguardar) {
    if (aguardar) {
        $(".overbox").fadeIn(50);
        $(".fadebox").fadeIn(50);
    } else {
        $(".overbox").fadeOut(200);
        $(".fadebox").fadeOut(200);
    }
}

function aguarde_small(aguardar) {
    if (aguardar) {
        $("#alertaChico").hide();
        $("#overboxAlertaChico").hide();
        $("#overboxChico").stop(true, true).fadeIn(100);
        $("#fadeboxChico").stop(true, true).fadeIn(100);
    } else {
        $("#overboxChico").fadeOut(200);
        $("#fadeboxChico").fadeOut(200);
    }
}

function alertaChico(alerta) {
    if (alerta) {
        $("#alertaChico").stop(true, true).fadeIn(50);
        $("#overboxAlertaChico").stop(true, true).fadeIn(50);
        setTimeout("alertaChico(false)", 2000);
    } else {
        $("#alertaChico").fadeOut(2500);
        $("#overboxAlertaChico").fadeOut(2500);
    }
}


$(window).load(function (e) {
    $("#btnSitemap").fadeIn("slow");
    aguarde_small(false);

});

// FIX placeholder para IE
jQuery(function ($) {

    //!$.support.placeholder 
    if (!$.support.placeholder) {
        // if ($.support.placeholder != undefined) {

        try {
            var active = document.activeElement;

            $(':text').focus(function () {
                if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
                    $(this).val('').removeClass('hasPlaceholder');
                }

            }).blur(function () {
                if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
                    $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
                }
            });

            $(':text').blur();
            $(active).focus();

            $('form').submit(function () {
                $(this).find('.hasPlaceholder').each(function () { $(this).val(''); });
            });
        } catch (Exception) {

        }
    }

});

function eliminaPlaceHolder(formulario) {

    $('#' + formulario).find('input').each(function () {
        $(this).removeAttr('placeholder');
        $(this).removeClass('hasPlaceholder');
        $(this).off("blur");
        $(this).off("focus");
    })
 }
// fin FIX placeholder para IE


 function abreSiteMap() {
     $("#sitemap").fadeIn('slow');

     $("footer").css({ position: 'relative' });
     $("body").css({ "overflow": 'hidden scroll' });
     $.scrollTo('#sitemap', 500);

     $("#btnSitemap.cerrar").fadeIn('fast');
     $("#btnSitemap.abrir").fadeOut('fast');
 }
 function cierraSiteMap() {
     //aguarde_small(true);
     // $("#sitemap").slideToggle("slow");
     $("#sitemap").hide();
	 
	 if($("body").css("overflow")=='hidden scroll' && $("#wrapperBanner").length > 0)
		 {
			 $("body").css({ "overflow": 'hidden' });
		 }
     if(($(window).height()>$(document).height())){
         $("body").css({ "overflow": 'hidden' });
		 alert("hdhdh");
     }
     // $("footer").css({ position: 'fixed' });

     var pwidth=$("header").css("width"); // Obtenemos el ancho
     if(pwidth < "1000px"){
         $("footer").css({ position: 'initial' });
     } else {
         $("footer").css({ position: 'fixed' });
     }

     //aguarde_small(false);
     $("#btnSitemap.cerrar").fadeOut('fast');
     $("#btnSitemap.abrir").fadeIn('fast');

  }
jQuery(function ($) {
    // colorbox
    $("a[rel='imagenes']").colorbox();
    $(".externos").colorbox({ iframe: true, innerWidth: 700, innerHeight: 700 });
    $(".ayuda").colorbox({ iframe: true, innerWidth: '80%', innerHeight: 600 });
    $(".nodisponible").colorbox({iframe:true, innerWidth:600, innerHeight:240, href:"/Paginas/HB-nodisponible?sinl=sinl", scrolling: false});
    // colorbox
    ///fix cookie
    //$.cookie.json = true;
    
    // Make ColorBox responsive
    $.colorbox.settings.maxWidth  = '95%';
    // $.colorbox.settings.maxHeight = '95%';

    // ColorBox resize function
    var resizeTimer;
    function resizeColorBox()
    {
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
                if ($('#cboxOverlay').is(':visible')) {
                        $.colorbox.load(true);
                }
        }, 300);
    }

    // Resize ColorBox when resizing window or changing mobile device orientation
    $(window).resize(resizeColorBox);
    window.addEventListener("orientationchange", resizeColorBox, false);
});

$(document).ready(function () {
    
   
    
    // // BOTON ABRIR 24HS HB MOBILE
    // $("#abrir24hsMobile").click(function(){
    //     var pwidth=$("header").css("width"); // Obtenemos el ancho
    //     if(pwidth < "579px"){
    //         var $pw = "270px";
    //     } else {
    //         var $pw = "180px";
    //     }

    //     $(".accesoHB").slideDown('fast');
    //     $(".menu").css({position: 'absolute', top: $pw});
    //     $("#thumbs-wrapper").css({display: 'none'});

    //     $("#abrir24hsMobile").fadeOut('fast');
    //     $("#cerrar24hsMobile").fadeIn('fast');
    // });

    // $("#cerrar24hsMobile").click(function(){
    //     $(".accesoHB").css({display: 'none'});
    //     $(".menu").css({ position: 'static' });
    //     $("#thumbs-wrapper").css({display: 'block'});

    //     $("#cerrar24hsMobile").fadeOut('fast');
    //     $("#abrir24hsMobile").fadeIn('fast');
    // });
    // // BOTON ABRIR 24HS HB MOBILE
    
    // // MENU PRINCIPAL OCULTA SUBMENU - FIX MOBILE
    // // menu uno
    // $("header .menu > ul > li.uno div a").click(function(){
    //     $("header .menu > ul > li.uno div").hide(); 
    // });
    // $( ".uno" ).mouseover(function() {
    //     $("header .menu > ul > li.uno div").show();
    //     $("header .menu > ul > li.dos div").hide(); 
    //     $("header .menu > ul > li.tres div").hide(); 
    // });
    // $( ".uno" ).mouseout(function() {
    //     $("header .menu > ul > li.uno div").hide();
    // });

    // //menu dos
    // $("header .menu > ul > li.dos div a").click(function(){
    //     $("header .menu > ul > li.dos div").hide(); 
    // });
    // $( ".dos" ).mouseover(function() {
    //     $("header .menu > ul > li.dos div").show();
    //     $("header .menu > ul > li.uno div").hide(); 
    //     $("header .menu > ul > li.tres div").hide(); 
    // });
    // $( ".dos" ).mouseout(function() {
    //     $("header .menu > ul > li.dos div").hide();
    // });

    // //menu tres
    // $("header .menu > ul > li.tres div a").click(function(){
    //     $("header .menu > ul > li.tres div").hide(); 
    // });
    // $( ".tres" ).mouseover(function() {
    //     $("header .menu > ul > li.tres div").show();
    //     $("header .menu > ul > li.uno div").hide(); 
    //     $("header .menu > ul > li.dos div").hide(); 
    // });
    // $( ".tres" ).mouseout(function() {
    //     $("header .menu > ul > li.tres div").hide();
    // });
    // // MENU PRINCIPAL OCULTA SUBMENU - FIX MOBILE 
    
});

jQuery(function ($) {
    //

    // BOTON ABRIR SITEMAP
     //$('#btnSitemap.abrir').click(function () {

     //               $("#sitemap").fadeIn('slow');
     //               $("footer").css({ position: 'relative' });
     //               $("body").css({ "overflow-y": 'scroll', "overflow-x": 'hidden' });
     //               $.scrollTo('#sitemap', 500);

     //               $("#btnSitemap.cerrar").fadeIn('fast');
     //               $("#btnSitemap.abrir").fadeOut('fast');

     //});
    // $('#btnSitemap.cerrar').click(function () {

    // });


    // FIN BOTON ABRIR SITEMAP

    // ILUMINAR BUSQUEDA SITEMAP
           $("#txt_palabra").keyup(function () {
               var val = this.value;
               $('.link_pag').removeHighlight().highlight(val);
           });
    // FIN ILUMINAR BUSQUEDA SITEMAP

    // mostrar y ocultar DIVS ACCESO HB -------
    // $(function () {
    //     $('#segmento').selectmenu({
    //         change: function (e, object) {
    //             $("#ruc").val("RUC");
				// $("#ruc").attr('placeholder', 'RUC');
				// $("#cedula").val("Documento");
    //             $("#cedula").attr('placeholder', 'Documento');
    //             $("#vcedula").val("");
    //             if (object.item.value == 'panelPersona') {
    //                 $('#panelEmpresa').hide();
    //                 $('#' + object.item.value).show();
    //                 // $('#tarjetaOpt').show();
    //             } else {
    //                 $('#panelPersona').hide();
    //                 $('#' + object.item.value).show();
    //                 $('#tarjetaOpt').hide();
    //             }
    //         }
    //     });
    // });

    // $(function () {
    //     $('#tipoCuenta').selectmenu({
    //         change: function (e, object) {
    //             if (object.item.value == 'cuenta') {
    //                 $('#tarjeta').hide();
    //                 $('#' + object.item.value).show();
    //                 $('#tarjetaOpt').hide();
    //             } else {
    //                 $('#cuenta').hide();
    //                 $('#' + object.item.value).show();
    //                 $('#tarjetaOpt').show();
    //             }
    //         }
    //     });
    // });

    // $(".groupTarjeta").click(function () {
    //     var radio_value = $(this).val();
    //     if (radio_value == 'otros') {
    //         $("#vcard1").val("M");
    //         $("#otros").show();
    //         $("#chk_otros").attr('checked', 'checked');
    //         $("#amex").hide();
    //         $("#chk_amex").removeAttr('checked');
    //     } else {
    //         $("#vcard1").val("A");
    //         $("#amex").show();
    //         $("#chk_amex").attr('checked', 'checked');
    //         $("#otros").hide();
    //         $("#chk_otros").removeAttr('checked');
    //     }
    // });
    // $("#otros").show();
    // $("#amex").hide();
    // // mostrar y ocultar DIVS ACCESO HB -------

    // // mascara para input de acceso a 24hs
    // $('.cuenta').mask('000000000');
    // //$('.documento').mask('AAAAAAAAAAAAAAA');
    // $('.otros').mask('0000-0000-0000-0000');
    // $('.amex').mask('0000-000000-00000');
    // // mascara para input de acceso a 24hs empresa
    // $('.cuenta_empresa').mask('000000000');
    // $('.ruc').mask('AAAAAAAAAAAAAAA');
    



    

    $("#acceso_hb").submit(function () {

        if ($("#vcedula").val().length < 2) {
            alert("Datos incorrectos. Por favor intent\u00e1 nuevamente.");
            if ($("#segmento").val() == "panelPersona") {
                $("#cedula").focus();
            } else {
                $("#ruc").focus();
            }
            return false;
        }



        var valida = check();
        if (valida) {
            if ($('#tipoCuenta').val() == "tarjeta") {
                if ($("#vcard1").val() == "M") {
                    vc = $("#vcuenta").val();
                    vc = vc.split("-");
                    $("#vnum1").val(vc[0]);
                    $("#vnum2").val(vc[1]);
                    $("#vnum3").val(vc[2]);
                    $("#vnum4").val(vc[3]);
                    $("#vcuenta").removeAttr("name");
                } else {
                    vc = $("#vcuenta").val();
                    vc = vc.split("-");
                    $("#vnum1").val(vc[0]);
                    $("#vnum2").val(vc[1]);
                    $("#vnum3").val(vc[2]);
                    $("#vnum4").removeAttr("name");
                    $("#vcuenta").removeAttr("name");
                 }

            }

        }
        return valida;
        //return true;
    });


//    //Binds
    //$("#cedula").keyup(function () {
    //    $("#vcedula").val($("#cedula").val());
    //    alert($("#vcedula").val());

    //});
    //$("#ruc").keyup(function () {
    //    $("#vcedula").val($("#ruc").val());

    //});

    //$("#cuenta").keyup(function () {
    //    $("#vcuenta").val($("#cuenta").val());
    //    //alert($("#vcedula").val());

    //});
    //$("#cuenta_empresa").keyup(function () {
    //    $("#vcuenta").val($("#cuenta_empresa").val());

    //});
    //$("#otros").keyup(function () {
    //    var valor = $("#otros").val();
    //    //valor = valor.replace(/-/g, "");
    //    $("#vcuenta").val(valor);
    //});
    //$("#amex").keyup(function () {
    //    var valor = $("#amex").val();
    //    //valor = valor.replace(/-/g, "");
    //    $("#vcuenta").val(valor);
    //});

    ////Cuentas
    //$("#cuenta")
	//    .keyup(habilitarSgte)
	//    .blur(habilitarSgte);

    //$("#cuenta_empresa")
	//    .keyup(habilitarSgte)
	//    .blur(habilitarSgte);

    //$("#amex")
	//    .keyup(habilitarSgte)
	//    .blur(habilitarSgte);

    //$("#otros")
	//    .keyup(habilitarSgte)
	//    .blur(habilitarSgte);

});
//$("#cuenta").keypress(function () {
//    return isNumberKey(this);
//});
//$("#cuenta_empresa").keypress(function () {
//    return isNumberKey(this);
//});
//function isNumberKey(evt) {   
//    var charCode = (evt.which) ? evt.which : event.keyCode
//    if (charCode > 31 && (charCode < 48 || charCode > 57))
//        return false;
//    return true;
//}

// function es_empresa() {
//     $("#tel_contacto").html('(021) 617 1018');
//     $("#mail_contacto").html('sac.bancaempresarial@itau.com.py');
//     $("#mail_contacto").attr('href','mailto:sac.bancaempresarial@itau.com.py');
// }
// 
// 
// 
// 
// 
// 
// 


$(document).ready(function() {

    // ////////////////////////////////
    // mostrar y ocultar DIVS ACCESO HB 
    // ////////////////////////////////

    var anchoVentana = window.innerWidth;
    var x = document.getElementById('segmento');

    if(anchoVentana > 992){
        x.remove(2);
    } else if ($('#segmento').length < 2) {
        var option = document.createElement('option');
        option.text = 'Pagos Electrónicos';
        option.value = 'PagosElectronicos';
        x.appendChild(option);

    }

    window.onresize = function () {
        anchoVentana = window.innerWidth;
        if (anchoVentana > 992) {
            x.remove(2);
        } 
        else if($('#segmento').length < 2){
            var option = document.createElement('option');
            option.text = 'Pagos Electrónicos';
            option.value = 'PagosElectronicos';
            x.appendChild(option);
        }
    }

    $(function() {
        $('.div-empresas').hide();
        $('.div-tarjetas').hide();
        $('#segmento').change(function() {
            if ($('#segmento').val() == 'panelEmpresa') {
                $('.div-empresas').show();
                $('.div-personas').hide();
                $('.div-tarjetas').hide();
                $('.div-tarjetaOpt').hide();
            } else {
                $('.div-personas').show();
                $('.div-empresas').hide();
                $('.div-tarjetas').hide();
            }
        });
    });

    $(function() {
        $('.div-tarjetas').hide();
        $('.div-tarjetaOpt').hide();
        $('#tipoCuenta').change(function() {
            if ($('#tipoCuenta').val() == 'cuenta') {
                $('.div-tarjetas').hide();
                $('.div-tarjetaOpt').hide();
                $('.div-cuenta').show();
            } else {
                $('.div-cuenta').hide();
                $('.div-tarjetaOpt').show();
                $('.div-tarjetas').show();
                $('.div-amex').hide();
            }
        });
    });

    $("input[name$='groupTarjeta']").click(function() {
        var radio_value = $(this).val();
        if (radio_value == 'otros') {
            $(".div-otros").show();
            $(".div-amex").hide();
        } else {
            $(".div-amex").show();
            $(".div-otros").hide();
        }
    });
    $(".div-otros").show();
    $(".div-amex").hide();
    // mostrar y ocultar DIVS ACCESO HB -------


    // // BOTON ABRIR SITEMAP
    $('.abrir').click(function() {

        $("#sitemap").fadeIn('slow');
        $("footer").css({ position: 'relative' });

        var $pagina = $("body");
        if ($pagina.attr("id") == "secc_inicio") {
            $("body").removeAttr('style');
            $("body").css({ "overflow-y": 'scroll', "overflow-x": 'hidden' });
        }

        $.scrollTo('#sitemap', 500);

        $(".cerrar").fadeIn('fast');
        $(".abrir").fadeOut('fast');

    });
    $('.cerrar').click(function() {

        $("#sitemap").hide();

        var $pagina = $("body");
        if ($pagina.attr("id") == "secc_inicio") {
            $("body").removeAttr('style');
            $("body").css({ "overflow": 'hidden' });
        }

        $("footer").css({ position: 'fixed' });

        $(".cerrar").fadeOut('fast');
        $(".abrir").fadeIn('fast');
    });
    // FIN BOTON ABRIR SITEMAP

    // mascara para input de acceso a 24hs
    $('.cuenta').mask('0000000000');
    $('.documento').mask('0000000000');
    $('.otros').mask('0000-0000-0000-0000');
    $('.amex').mask('0000-000000-00000');
    // mascara para input de acceso a 24hs

    // ////////////////////////////////
    // mostrar y ocultar DIVS ACCESO HB 
    // ////////////////////////////////
});

//BUSCADOR ARRIBA
//aguarde_small(true);
jQuery(function($) {
    $("#btn_buscar_arriba").click(function() {
        busqueda_arriba();
        return false;
    });

    $("#buscador_arriba").submit(function() {
        //e.preventDefault;
        busqueda_arriba();
        return false;
    });
});

//function busqueda_arriba() {
//    //el resto en el footer
//    es_arriba = true;
//    valor_arriba = $("#txt_palabra_arriba").val();
//    $("#txt_palabra").val();
//    $('#btnSitemap.abrir').click();
//    return false;
//}
//FIN BUSCADOR ARRIBA

// CAMBIO DE ICONOS EN BOTONES MENU RESPONSIVE
jQuery(function($) {
    $("#menu-nav-ppal").click(function(){
        if ($("#menu-nav-ppala").html() == "dehaze"){
            $("#menu-nav-ppala").html("clear");
            $("#textoMenu").html("Cerrar");
        } else {
            $("#menu-nav-ppala").html("dehaze");
            $("#textoMenu").html("Men&uacute;");
        }
    });
    $("#menu-nav-user").click(function(){
        if ($("#menu-nav-usera").html() == "person"){
            $("#menu-nav-usera").html("clear");
			$("#textoMenuAcc").html("Cerrar");
        } else {
            $("#menu-nav-usera").html("person");
			$("#textoMenuAcc").html("Acceso");
        }
    });

     
});
// FIN CAMBIO DE ICONOS EN BOTONES MENU RESPONSIVE
//Responsive
$(function () {
    $('[data-toggle="popover"]').popover();
})


// SCRIPT TECLADITO
//$(function () {
//    $('#tecladoBox1').hide().click(function (e) {
//        e.stopPropagation();
//    });
//    $(".btn-teclado-1").click(function (e) {
//        alert("teclado");
//        $('#tecladoBox1').show();
//        e.stopPropagation();
//    });
//    $(document).click(function () {
//        $('#tecladoBox1').fadeOut();
//    });
//});
//$(function () {
//    $('#tecladoBox2').hide().click(function (e) {
//        e.stopPropagation();
//    });
//    $(".btn-teclado-2").click(function (e) {
//        $('#tecladoBox2').show();
//        e.stopPropagation();
//    });
//    $(document).click(function () {
//        $('#tecladoBox2').fadeOut();
//    });
//});

// TARJETA FOCUS
$(document).ready(function () {
    $("#nrotarjeta").focus(function () {
        $(".tarjeta-body").css({ opacity: '0.5' });
    });
    $('#nrotarjeta').blur(function () {
        if (!$(this).val()) {
            $(".tarjeta-body").css({ opacity: '1' });
        }
    });

});

    