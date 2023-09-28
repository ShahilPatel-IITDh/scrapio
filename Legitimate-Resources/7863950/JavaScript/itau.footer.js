var abc = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z");
var es_arriba = false;
var valor_arriba = "";
var resultado = null;
var todos_html = null;
var primera_busqueda = true;
function consulta_paginas() {
    
    if (resultado == null) {
        aguarde(true);
        //var palabra_clave = ("#txt_palabra").val();
        if ($("#txt_palabra").val() == "¿Buscás algo?") {
            $("#txt_palabra").val("");
        }
        //$("#txt_palabra").val("");
        $.ajax({
            type: "POST",
            url: "/Common/Paginas",
            error: function (jqXHR, textStatus) {
                //if (textStatus == 'timeout') {
                aguarde(false);
                alertaChico(true);

                //}
            },
            success: function (msg) {
                if (msg.error != undefined) {
                    if (msg.error) {
                        alertaChico(true);
                    }
                    aguarde(false);
                } else {
                    aguarde(false);
                    //console.log(msg);
                    resultado = msg;
                   
                    filtra();
                    $(".overbox").fadeOut(100);
                    $(".fadebox").fadeOut(100, function () { abreSiteMap(); });
                }

            },
            timeout: 15000
        });
    } else {
        filtra();
        abreSiteMap();
    }
};
function filtra() {
    $(this).off();
    setTimeout(filtrar, 10);
}

function filtrar() {
    $(this).off();
    var buscar_todos = true;
    //aguarde_small(true);
    $.each(abc, function (indice, valor) {
        $("#ul_" + valor).html("");
        $("#ul_" + valor).parent(".col-lg-3").hide();
        //$("#ul_" + valor).hide();
    });

    var palabra = $("#txt_palabra").val();
    if (palabra == "¿Buscás algo?") palabra = "";

    if (palabra.length == 0 || palabra.length < 3) {
        palabra = "";
    }
    palabra = palabra.toLowerCase();

    if (todos_html != null && palabra == "") {
        buscar_todos = false;
        $("#grilla_resultados").html(todos_html);

    } ///fin resultado null
    if (buscar_todos == true) {
        $.each(resultado, function (indice, valor) {
            coincidencia = false;
            try {

                var referencias = valor.referencia.split(",");
                //console.log(referencias);
                $.each(referencias, function (indice_ref, valor_ref) {
                    //console.log(valor_ref);
                    if (valor_ref.toLowerCase().search(palabra) != -1) {
                        coincidencia = true;

                    }
                })
            } catch (Exception) {

            }
            if (valor.titulo.toLowerCase().search(palabra) != -1) {
                coincidencia = true;
            }
            if (coincidencia) {
                if (valor.titulo.toLowerCase().search("gourmet") == -1) { //si no es gourmet
                    var letra = valor.titulo.charAt(0);
                    $("#ul_" + letra.toLowerCase()).parent(".grid_3").show();
                    //$("#ul_" + letra.toLowerCase()).show();
                    //var lista = $("#ul_" + letra.toLowerCase()).append('<ul></ul>').find('ul');
                    var lista = $("#ul_" + letra.toLowerCase());
                    if (valor.estatica) {
                        lista.append('<li><a class="link_pag" href="/Paginas/' + valor.nombre + '">' + valor.titulo + '</a></li>');
                    } else {

                        lista.append('<li><a class="link_pag" href="' + valor.url_dinamica + '">' + valor.titulo + '</a></li>');
                    }

                    $('.link_pag').removeHighlight().highlight(palabra);
                }
            }

        });
        if (primera_busqueda) {
            todos_html = $("#grilla_resultados").html();
            primera_busqueda = false;
        }
        if (es_arriba) {
            es_arriba = false;
            $("#txt_palabra").val(valor_arriba);
            filtrar();
        }



    }
    if (typeof estatica != 'undefined') {
        $("a").unbind().click(function () {
            $(this).off();
            var link = $(this).attr("href");
            if (url_para_ajax(link)) {
                link_ajax(link);

                return false;
            }

        });
        //console.log(todos_html);
        //aguarde_small(false);
        //$("#sitemap").focus();
    }
    $(".grid_3").each(function () {
        var stylestemp = this.style;
        if (stylestemp.display == 'none')
            this.remove();
    });
}

jQuery(function ($) {
   
    //consulta_paginas();
    //$("#txt_palabra").keyup(function () { $(this).off(); filtra(); });
    //$("#btn_buscar_palabra").click(function () { filtra(); return false; });
    
});

function buscar_footer() {
    $("#txt_palabra").off();
    filtra();
}

