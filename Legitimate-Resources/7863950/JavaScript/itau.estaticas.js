//history.pushState('data', '', location.href);

var estatica = true;
var v_link = "";
var retroceso = false;


function url_para_ajax(link) {

    if (link.toLowerCase().search("paginas") != -1 || link.toLowerCase().search("beneficios") != -1) {
        return true;
    }
    return false;
}

function ajax_centra() {
    $("body").css("overflow-x", "hidden");
    $("body").css("overflow-y", "scroll");
    $('#footer-redes').show();
    $("html, body").animate({ scrollTop: 0 }, 500);
 }
 
 function bandeiras() {
	 
	   // Bandeiras Footer Site                         
       if($('.listaIdiomas').hasClass('visible')){
            $('.listaIdiomas').removeClass('visible');
			$('.listaIdiomas').addClass('invisible');
			$('.listaIdiomas').slideUp('fast');
       }else{
            $('.listaIdiomas').removeClass('invisible');
			$('.listaIdiomas').addClass('visible');
			$('.listaIdiomas').slideDown('fast');
       }
      return false;

 }

 $(document).ready(function () {
     $("a").click(function () {
         $(this).off();

         var link = $(this).attr("href");
         if (link != undefined) {
             ///Acomodar segun o en itau.esticas.mini
             if (url_para_ajax(link)) {

                 if (link != document.location.pathname) {
                     link_ajax(link);
                 } else {
                     ajax_centra();
                 }
                 return false;
             }
         }
     });

 });
function link_ajax(link) {
    v_link = link;
    $(this).die();
    if(slide)
        $("#parcial").hide("slide", { direction: "left"}, 100);
    //$("#parcial").hide("slide", { direction: "left"}, 500, function () {

    $.ajax({
        url: v_link,
        type: "POST",
        data: "ajax=ajax",
        dataType: "html",
        beforeStart: aguarde_small(true),
        error: function (jqXHR, textStatus) {
            if (textStatus != "error") {
                alertaChico(true);
            }
        },
        success: function (msg) {
            $("#parcial").html(msg);
            $("#parcial").show("slide", { direction: "right" }, 200, function () {

                //                if (v_link.indexOf("#") != -1) {
                //                    var hash = v_link.split('#')[1];
                //                    alert(hash);
                //                    $("#" + hash).show();

                //                }

            });
            cierraSiteMap();
            try {
                if (!retroceso) {
                    history.pushState('data', '', v_link);
                } else {
                    retroceso = false;
                }
            } catch (ex) {
                //nada
            }

        }
    }).always(function () {
        aguarde_small(false);
        setTimeout(function () { ajax_centra(); }, 500);
        //Pace.restart();
    });
    //}); //fin hide;
    return false;

}




window.onpopstate = function (e) {

    try {
        //alert(e.state);
        //load(location.href, e.state);
        if (e.state == "data") {

            var link = location.href;
            ///Acomodar segun o en itau.esticas.mini
            if (url_para_ajax(link)) {

                if (link != document.location.pathname) {
                    retroceso = true;
                    link_ajax(link);
                } else {
                    ajax_centra();
                }
                return false;
            }
        } else if (e.state == "layout") {

            window.location = location.href;
        }
    } catch (ex) {
        return false;
    }
};
