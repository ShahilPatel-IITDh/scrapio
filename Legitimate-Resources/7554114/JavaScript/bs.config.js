function smoochConfiguration(lang, baseUrl)
{
    var deferred = new $.Deferred();
    var promise = deferred.promise();

    var l = '';
    var file = '';
    if(typeof lang === 'undefined' || lang === '')
        l = 'ES'
    else
        l = lang.toUpperCase();
    
    switch (l) {
        case 'FR':
        case 'EN':
        case 'DE':
        case 'CA':
            file = 'bs.config-' + l.toLowerCase() + '.js';
            break;
        default:
            file = 'bs.config-es.js';
    }


    var xhrObj = new XMLHttpRequest();
    xhrObj.open('GET', baseUrl + file, false);
    xhrObj.send('');

  //SPG Se añade Css para el rebote de la burbuja de chat
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href",  baseUrl.replace('/js/config/' , '/css/') + 'rebound_iframe.css'); 
    document.getElementsByTagName('head')[0].appendChild(link);
  //FIN SPG

    var x = document.createElement('script');
    x.type = "text/javascript";
    x.text = xhrObj.responseText;
    document.getElementsByTagName('head')[0].appendChild(x);

  

    Smooch.on('message:received',
        function () {
            if (!Smooch.isOpened()) {      
                Smooch.open();
            }
        });

    Smooch.on('widget:opened', function () {
        $('iframe').addClass('noanimation');
    });
    return getSmoochConfig();
}

function smoochChatLink(tempID, objSmooch, baseUrl) {

    //var urlDestination = baseUrl.replace('IMChatBot/js/', 'CSChatLink/api/ChatRequest/Link');

    var u = objSmooch.getUser();

    if (tempID !== "" && u._id !== "" ) {

        $.ajax({
            type: "POST",
            url: baseUrl,
            data: JSON.stringify({ "chatId": u._id, "tempId": tempID}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
        });
    }
}

