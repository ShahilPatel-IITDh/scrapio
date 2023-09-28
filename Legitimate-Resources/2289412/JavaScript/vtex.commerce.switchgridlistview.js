
$(document).ready(function() {

    $('.seletorcssalternativo').click(function() {
        var alterantiveCss = $(this).attr('alternativecss');
        var defaultCss = $(this).attr('defaultcss');
        var targetId = $(this).attr('targetId');
        $('#' + targetId).removeClass(defaultCss);
        $('#' + targetId).addClass(alterantiveCss);

        if (TiraAlturaDosLIs) {
            TiraAlturaDosLIs(targetId);
        }

        if (arrumaPrateleiras) {
            arrumaPrateleiras()
        }
    });

    $('.seletorcssalternativo.lista').click(function() {
        $('.seletorcssalternativo').removeClass('cssselected');
        $(this).addClass('cssselected');
    });

    $('.seletorcssalternativo.tabela').click(function() {
        $('.seletorcssalternativo').removeClass('cssselected');
        $(this).addClass('cssselected');
    });

});

function acertaLayout(targetId) {

    
}



TiraAlturaDosLIs = function(targetId) {
    $('#' + targetId).find("ul > li").css('height', '');

};

//criar um cookie
//function updateCookie(value) {
//    //enviar para o controlador para criar o cookie, pq não pode ser um cookie de sessão
//    var dataToPost = { sup: value };
//    var url = '../../Site/Track.aspx';
//    ajaxRequest('GET', url, dataToPost, '');
//}

//function ajaxRequest(method, url, postData, target, callback) {
//    $.ajax({
//        type: method,
//        url: url,
//        data: postData,
//        success: function(dataResult) {
//            if (target != null && target != '') {
//                if (dataResult == 'true') {
//                    alert("gravou o cookie grid list view - sup");
//                } else {
//                    alert("não gravou o cookie grid list view - sup");
//                };
//            }
//            if (callback != null && callback != '') callback();
//        },
//        error: function(XMLHttpRequest, textStatus, errorThrown) {
//            alert("não gravou o cookie grid list view - sup");
//        }
//    });
//}

////ler um cookie
//function readCookie(name) {
//    var nameEQ = name + "=";
//    var ca = document.cookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//        if (c.indexOf(nameEQ) == 0)
//            return unescape(c.substring(nameEQ.length, c.length));
//    }
//    return "";
//}
