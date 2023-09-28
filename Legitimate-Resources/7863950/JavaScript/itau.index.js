var index = true;
var map;
var lat_asu = -25.30066;
var long_asu = -57.63591;
var lat_usr = lat_asu;
var long_usr = long_asu;
var creoVisitante = false;
var datos_mapa;

function bnt_mapa() {
    var localidad = $("#txtBuscarCiudad").val();
}

function buscar_mapa(buscaCiudad) {
    if (buscaCiudad) {
        cierra_filtro();
    }
    aguarde_small(true);
    var localidad = $("#txtBuscarCiudad").val();
    var branch = $("#chkAgencias").prop('checked');
    var atm = $("#chkAtm").prop('checked');
    var exs6 = $("#chkS6").prop('checked');
    var exstk = $("#chkSS").prop('checked');
    map.removeMarkers();

    if (buscaCiudad) {
        if (localidad != "") {
            GMaps.geocode({
                address: $('#txtBuscarCiudad').val() + ", paraguay",
                callback: function (results, status) {
                    if (status == 'OK') {
                        var latlng = results[0].geometry.location;
                        map.setCenter(latlng.lat(), latlng.lng());
                        //crea_visitante(map, latlng.lat(), latlng.lng());
                        creoVisitante = true;
                        //              map.addMarker({
                        //                lat: latlng.lat(),
                        //                lng: latlng.lng()
                        //              });


                    }
                }
            });
        } else {
            //crea_visitante(map, lat_usr, long_usr);
            creoVisitante = true;
        }
    }
    if (!creoVisitante) {
        //crea_visitante(map, lat_usr, long_usr);
    }

    consulta(localidad, branch, atm, exs6, exstk);


}

function crea_atm(map, cajeros) {

    $.each(cajeros, function (i, item) {
        //console.log(cajeros);
        var leyenda = '';
        if (item.nombre != undefined) {
            leyenda += '<p>' + item.nombre + '</p>';
        }
        if (item.direccion != undefined) {
            leyenda += '<p>' + item.direccion + '</p>';
        }
        if (item.telefono != undefined) {
            leyenda += '<p>' + item.telefono + '</p>';
        }
        //Cajeros con Guaraníes y Dólares
        if (item.habilitadoGS == true && item.habilitadoUSD == true)
        { leyenda += 'Guaraníes y Dólares'; }
        else if (item.habilitadoGS == true)
        { leyenda += 'Guaraníes'; }
        else if (item.habilitadoUSD == true)
        { leyenda += 'Dólares'; }
        // CAJEROS
        var image = '/images/ico02_2.png';
        map.addMarker({
            lat: item.latitud,
            lng: item.longitud,
            title: item.nombre,
            icon: image,
            infoWindow: {
                content: leyenda
            }
        });
    });

}

function crea_express(map, cajeros, exs6, exstck) {
    $.each(cajeros, function (i, item) {
        var dibujar = false;
        var leyenda = "";
        if (item.nombre != undefined) {
            leyenda += '<p>' + item.nombre + '</p>';
        }
        if (item.direccion != undefined) {
            leyenda += '<p>' + item.direccion + '</p>';
        }
        if (item.telefono != undefined) {
            leyenda += '<p>' + item.telefono + '</p>';
        }

        //    // EXPRESS
        if (item.descripcion != undefined) {
            
            var image = '/images/ico03_2.png';
            if ((item.descripcion.toLowerCase().search("stock") != -1)) {
                var image = '/images/ico10_2.png';
            }
            if (item.descripcion.toLowerCase().search("stock") != -1 && exstck) {
                dibujar = true;
            }
            if (item.descripcion.toLowerCase().search("seis") != -1 && exs6) {
                dibujar = true;
            }
            
            if (dibujar) {
                map.addMarker({
                    lat: item.latitud,
                    lng: item.longitud,
                    title: item.nombre,
                    icon: image,
                    infoWindow: {
                        content: leyenda
                    }
                });
            }
        }
    });

}

function crear_locales(map, branches) {
    $.each(branches, function (i, item) {
        var leyenda = "";
        if (item.nombre != undefined) {
            leyenda += '<p>' + item.nombre + '</p>';
        }
        if (item.direccion != undefined) {
            leyenda += '<p>' + item.direccion + '</p>';
        }
        if (item.telefono != undefined) {
            leyenda += '<p>' + item.telefono + '</p>';
        }
        // CAJEROS
        var image = '/images/logo_itau_24x24.png';
        map.addMarker({
            lat: item.latitud,
            lng: item.longitud,
            title: item.nombre,
            icon: image,
            infoWindow: {
                content: leyenda
            }
        });
    });
    //      AGENCIAS
    //      var image2 = 'images/logo_itau_24x24.png';
    //	    EXPRESS STOCK
    //      var image3 = 'images/ico10_2.png';
    //	    EXPRESS SUPERSEIS
    //      var image3 = 'images/ico03_2.png';
}

function crea_visitante(map, latitud, longitud) {
    // LOCALIZACION VISITANTE
    var image = 'images/ico04.png';
    map.addMarker({
        lat: latitud,
        lng: longitud,
        icon: image
    });
}

function cierra_filtro() {
    $("#btnAbrirFiltros").html("Filtros de búsqueda");
    h = $(window).height();
    hclose = h * 0.6;

    $("#filtros").each(function () {
        displaying = $(this).css("display");
        $(this).fadeOut('slow', function () {
            $(this).css("display", "none");

        });

        $('.buscadorAgencias').animate({
            'top': hclose,
        }, 1000);
    })


}

function mapa_cajeros() {
    $("#chkAgencias").removeAttr('checked');
    $("#chkS6").removeAttr('checked');
    $("#chkSS").removeAttr('checked');
    $('#btn_banner4_thumb').click();
    setTimeout(function () { buscar_mapa(false) }, 2000);

}

function mapa_agencias() {
    $("#chkAtm").removeAttr('checked');
    $("#chkS6").removeAttr('checked');
    $("#chkSS").removeAttr('checked');
    $('#btn_banner4_thumb').click();
    setTimeout(function () { buscar_mapa(false) }, 2000);
}

function mapa_express() {
    $("#chkAtm").removeAttr('checked');
    $("#chkAgencias").removeAttr('checked');
    $('#btn_banner4_thumb').click();
    setTimeout(function () { buscar_mapa(false) }, 2000);
}

jQuery(function ($) {

    $('#footer-redes').hide();
    $("body").css("overflow", "hidden");


    //Asuncion  -25.30066,-57.63591


    // ABRIR FILTRO DE BUSQUEDA

    // Tamaño real de la pantalla
    jQuery.event.add(window, "load", resizeFrame);
    jQuery.event.add(window, "resize", resizeFrame);

    var h;
    function resizeFrame() {
        h = $(window).height();
        $("#map").css("height", h);
        hopen = h * 0.3;
        hclose = h * 0.5;
        $(".buscadorAgencias").css("top", hclose);
        $("body").css({ "overflow": 'hidden' });
    }
    // fin Tamaño real de la pantalla




    $("#btnAbrirFiltros").click(function () {
        $("#filtros").each(function () {
            displaying = $(this).css("display");

            if (displaying == "block") {

                $(this).fadeOut('slow', function () {
                    $(this).css("display", "none");

                });

                $('.buscadorAgencias').animate({
                    'top': hclose,
                }, 1000);

                $("#btnAbrirFiltros").html("Filtros de búsqueda")

            } else {
                $("#btnAbrirFiltros").html("Cerrar filtro")
                $(this).fadeIn('slow', function () {
                    $(this).css("display", "block");

                });

                $('.buscadorAgencias').animate({
                    'top': hopen,
                }, 1000);

            }

        });
    });

    // FIN ABRIR FILTRO DE BUSQUEDA

    $("#chkAgencias").change(function () {
        buscar_mapa(false);
    });

    $("#chkAtm").change(function () {
        buscar_mapa(false);
    });

    $("#chkS6").change(function () {
        buscar_mapa(false);
    });

    $("#chkSS").change(function () {
        buscar_mapa(false);
    });

});

function consulta(localidad, branch, atm, exs6, exstk) {

    dibuja('', branch, atm, exs6, exstk);
    /*
        $.ajax({
            type: "POST",
            url: "/Common/Buscar",
            dataType : "json",
            data: { localidad:localidad, branch: branch,atm: atm, exs6: exs6, exstk: exstk },
            success: function (msg) {
                    var branches = $.parseJSON(msg.branches);
                    var atm = $.parseJSON(msg.atm);
                    var express = $.parseJSON(msg.express);
                    msg.branches = branches;
                    msg.atm = atm;
                    msg.express = express;
                    dibuja(msg,branch, atm, exs6,exstk);
                    
                }
        }).always(function(){
            aguarde_small(false);
        });
    */

}
function dibuja(msg, branch, atm, exs6, exstk) {
    if (branch) {
        //if(msg.branches.error != true && msg.branches.error != "no_consultado"){
        //      crear_locales(map, msg.branches.data);
        //  }
        $.getJSON("/Home/GetAgencias", function (result) {
            crear_locales(map, result);
        });
    }
    if (atm) {
        //if(msg.atm.error != true && msg.atm.error != "no_consultado"){
        //    crea_atm(map, msg.atm.data);
        //}
        $.getJSON("/Home/GetAtms", function (result) {
            crea_atm(map, result);
        });
    }
    if (exs6 || exstk) {
        //if(msg.express.error != true && msg.express.error != "no_consultado"){
        //    crea_express(map, msg.express.data,exs6,exstk);
        //}
        $.getJSON("/Home/GetExpress", function (result) {
            crea_express(map, result, exs6, exstk);
        });
    }
    aguarde_small(false);

}
function Carga_Gmaps() {
    try {

        map = new GMaps({
            el: '#map',
            lat: lat_asu,
            lng: long_asu
        });

        GMaps.geolocate({
            success: function (position) {


                var latOrg = position.coords.latitude;
                var latx = latOrg - '00.005';
                lat_usr = position.coords.latitude;
                long_usr = position.coords.longitude;

                map.setCenter(latx, position.coords.longitude);

                crea_visitante(map, position.coords.latitude, position.coords.longitude);
            },
            error: function (error) {
                //crea_visitante(map,lat_usr, long_usr);
                //alert('Fallo de Geolocación: '+error.message);
                console.log('Fallo de Geolocación: ' + error.message);
            },
            not_supported: function () {
                //alert("Su navegador no soporta Geolocación");
                //crea_visitante(map,lat_asu, long_asu);
                console.log("Su navegador no soporta Geolocación");
            }
            // always: function(){
            //   alert("Done!");
            // }
        });
        buscar_mapa(true);
    } catch (Exception) { alert(Exception) }
}
function FiltrosBusqueda() {
    $("#filtros").each(function () {
        displaying = $(this).css("display");

        if (displaying == "block") {

            $(this).fadeOut('slow', function () {
                $(this).css("display", "none");

            });

            $('.buscadorAgencias').animate({
                'top': hclose,
            }, 1000);

            $("#btnAbrirFiltros").html("Filtros de búsqueda")

        } else {
            $("#btnAbrirFiltros").html("Cerrar filtro")
            $(this).fadeIn('slow', function () {
                $(this).css("display", "block");

            });

            $('.buscadorAgencias').animate({
                'top': hopen,
            }, 1000);

        }

    });
}