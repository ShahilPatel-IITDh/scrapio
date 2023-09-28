$(document).ready(function() {
    $.each($('.adserver'), function(index, offer) {
        registerPrint(offer);
        $(offer).find('a').click(registerClick);
        $(offer).find('embed').click(registerClick);
        $(offer).find('object').click(registerClick);
    }); 
    $('#bg_ad_left').click(registerClickSkin);
    $('#bg_ad_right').click(registerClickSkin);
    $('.evento-agenda').click(clickEntrada);
    $('#myModal').css({'margin-top':'-' + ($('#myModal').height() / 2) + 'px'})  
});


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function registerClick(e){
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    var tipo = $(this).parents('.adserver').attr('data-type');
    var campaign = $(this).parents('.adserver').attr('data-campaign');
    console.error(tipo+":"+campaign);
    $.ajax('/register_ad/', {
        data: {
            tipo: tipo,
            campaign: campaign,
            evento: 'click'
        },
        type: 'POST'
    });
}

function registerClickSkin(e){
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    var tipo = $('#adserver-background').attr('data-type');
    var campaign = $('#adserver-background').attr('data-campaign');
    console.error(tipo+":"+campaign);
    $.ajax('/register_ad/', {
        data: {
            tipo: tipo,
            campaign: campaign,
            evento: 'click'
        },
        type: 'POST'
    });
}

function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++){
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(cname,cvalue,exhours){
    var d = new Date();
    d.setTime(d.getTime()+(exhours*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function registerPrint(e){
    var csrftoken = getCookie('csrftoken');
    $.ajaxSetup({
        crossDomain: false, // obviates need for sameOrigin test
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    var times = parseInt($(e).attr('data-times'));
    var timer = parseInt($(e).attr('data-timer'));
    var tipo = $(e).attr('data-type');
    var campaign = $(e).attr('data-campaign');
    if (times > 0){
        var numberaux = parseInt(getCookie("red17_"+campaign));
        var numbera = 0;
        if (numberaux){ numbera = numberaux; }
        if (numbera <= timer){
            setCookie("red17_"+campaign,numbera+1,timer);
        }
    }
    $.ajax('/register_ad/', {
        data: {
            tipo: tipo,
            campaign: campaign,
            evento: 'print'
        },
        type: 'POST'
    });
}

function addTimestamp(urls){
    var timest = String(new Date().getTime());
    var res = urls.replace('[timestamp]',timest);
    return res
}

function clickEntrada(e){
    var click_out = $(this).attr('data-click');
    var click_url = $(this).attr('data-url');
    $.ajax('/register_click_agenda/', {
        data: {
            id_data: click_out,
        },
        type: 'POST'
    });
    window.open(click_url);

}
