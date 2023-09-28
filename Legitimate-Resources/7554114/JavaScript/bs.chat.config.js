function chatConfiguration(lang, baseUrl) {
    var deferred = new $.Deferred();
    var promise = deferred.promise();

    var l = '';
    var file = '';
    if (typeof lang === 'undefined' || lang === '')
        l = 'ES'
    else
        l = lang.toUpperCase();

    switch (l) {
        case 'FR':
        case 'EN':
        case 'DE':
        case 'CA':
            file = 'bs.chat.config-' + l.toLowerCase() + '.js';
            break;
        default:
            file = 'bs.chat.config-es.js';
    }


    var xhrObj = new XMLHttpRequest();
    xhrObj.open('GET', baseUrl + file, false);
    xhrObj.send('');

    //Iniciar chat
    var xhrInitChat = new XMLHttpRequest();
    xhrInitChat.open('GET', baseUrl + 'bs.chat.init.config.js', false);
    xhrInitChat.send('');

    //Cerrar chat al hacer click sobre la página
    var xhrCloseChat = new XMLHttpRequest();
    xhrCloseChat.open('GET', baseUrl + 'bs.chat.close.config.js', false);
    xhrCloseChat.send('');


    //Creamos Iframe para almacenar todo el chat
    var iframe = document.createElement('iframe');

    //propiedades iframe
    iframe.setAttribute('id', 'contentChat');
    iframe.setAttribute('name', 'chatBot');
    iframe.setAttribute('scrolling', 'no');
    iframe.setAttribute('allowfullscreen', '');
    iframe.style.cssText = 'border:none;';
   
    var docu = document.domain;
    //RUTA PRODUCCION
    iframe.setAttribute('src', 'https://' + docu + '/resources/html/webIframe.html');

    //RUTA TEST
    //iframe.setAttribute('src', 'https://' + docu + '/resources/html/webIframeTEST.html');
   

    //RUTA LOCAL 
    //iframe.setAttribute('src', 'https://prepro.pagofacil.de/ims/chats/azureBot.htm');

    iframe.onload = function () {
        initChat();
    };
    document.getElementsByTagName("body")[0].appendChild(iframe);


    //SPG Se añade Css y js 
    //CSS
    var link_rebound = document.createElement("link");
    link_rebound.setAttribute("rel", "stylesheet");
    link_rebound.setAttribute("type", "text/css");
    link_rebound.setAttribute("href", baseUrl.replace('/js/configChat/', '/js/configWebChat/css/') + 'reboundChat.css');
    //iframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(link_rebound);
    document.getElementsByTagName('head')[0].appendChild(link_rebound);

  
    var x = document.createElement('script');
    x.type = "text/javascript";
    x.text = xhrObj.responseText;
    //iframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(x);
    document.getElementsByTagName('head')[0].appendChild(x);

    var xClose = document.createElement('script');
    xClose.type = "text/javascript";
    xClose.text = xhrCloseChat.responseText;
    //iframe.contentWindow.document.getElementsByTagName("head")[0].appendChild(x);
    document.getElementsByTagName('head')[0].appendChild(xClose);

    //Configuración comunes de diseño
    var params = new Object();
    params.colorHeader = "#006DFF";
    params.iconHeader = baseUrl + 'sabadell-icon.jpg';
    params.imgBubble = baseUrl + 'avatar.jpg';
    params.imgBackground = "";
    //params.id = "Test_ImSolutions";
    params.id = "imsolutions";
    params.voiceActive = true;
    
    //Configuración por idioma
    //return params;
    return getChatConfig(params);
}



function accessChatLink(tempID, baseUrl) {

    //var urlDestination = baseUrl.replace('IMChatBot/js/', 'CSChatLink/api/ChatRequest/Link');
   
    try {
        var conv = document.getElementById("smoochId").value; //Temporal hasta que se asigne a otro input con diferente ID que no sea smoochId
    }
    catch (error) {
        console.error(error);
    }

   
    if (tempID !== "" && conv !== "") {

        $.ajax({
            type: "POST",
            url: baseUrl,
            data: JSON.stringify({ "chatId": conv, "tempId": tempID }),
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        });

    }
}

function requestCallBack(baseUrl, userId) {

    //try {
    //    var conv = document.getElementById("smoochId").value; //Temporal hasta que se asigne a otro input con diferente ID que no sea smoochId
    //}
    //catch (error) {
    //    console.error(error);
    //}


    if (userId !== "") {

        $.ajax({
            type: "POST",
            url: baseUrl,
            data: JSON.stringify({ "userID": userId, "source": "newCallBack" }),
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        });

    }
}

function requestInfoNewWeb(baseUrl, userId, lang, appName) {

    var urlDestination = baseUrl.replace('IMChatBot/js/', 'IMChatBot/api/');

    urlDestination = 'https://pagofacil.bancsabadell.com/messageInfoNewWeb/';
    if (userId !== "") {

        $.ajax({
            type: "POST",
            url: urlDestination,
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' },
            data: JSON.stringify({ "id": userId, "appName": appName, "lang": lang, "source": "messageNewWeb" }),
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        });



    }
}

function showHelpUser(baseUrl, userId, lang, appName , urlPago, urlCompromiso, urlFraccionar) {

    var urlDestination = baseUrl.replace('IMChatBot/js/', 'IMChatBot/api/');


    urlDestination = 'https://pagofacil.bancsabadell.com/HelpUser/';
    if (userId !== "") {

        $.ajax({
            type: "POST",
            url: urlDestination,
            headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*' },
            data: JSON.stringify({
                "id": userId, "appName": appName, "lang": lang, "urlPago": urlPago, "urlCompromiso": urlCompromiso,
                "urlFraccionar": urlFraccionar, "source": "HelpUser"
            }),
            dataType: 'json',
            contentType: "application/json; charset=utf-8"
        });

    }
}

function getIframeWindow(iframe_object) {
    var doc;

    if (iframe_object.contentWindow) {
        return iframe_object.contentWindow;
    }

    if (iframe_object.window) {
        return iframe_object.window;
    }

    if (!doc && iframe_object.contentDocument) {
        doc = iframe_object.contentDocument;
    }

    if (!doc && iframe_object.document) {
        doc = iframe_object.document;
    }

    if (doc && doc.defaultView) {
        return doc.defaultView;
    }

    if (doc && doc.parentWindow) {
        return doc.parentWindow;
    }

    return undefined;
}