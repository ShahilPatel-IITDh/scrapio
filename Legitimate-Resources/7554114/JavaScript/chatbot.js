var gCall;
var gChatbotCalled = false;
var GTIMEOUT = 90000;

var LC_API;
var load = false;

$(init);
$(document).ready (function(){
	console.log("ready chatbot");
	window.__lc = window.__lc || {};
	window.__lc.license = 8746781;
	//window.__lc.group = getGroup('${pageContext.response.locale}');
	window.__lc.group = getGroup($("#locale").val());
	(function() {
	  var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
	  lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
	})();
	
	LC_API = LC_API || {};

	LC_API.on_after_load = function() {
		load = true;
	};
	
	$("#smoochId").change(function () {
		accessChatLink($("#tempId").val(), $("#configChatJsUrl").val());
	});
	
	if($('#cookiesModal').length){
		console.log("chatbot exterior");
		isNewChatbot();
	}else{
		console.log("chatbot inner");
		console.log($("#chatbotAuto"));
		if($("#chatbotAuto").length){
			document.body.addEventListener('click', function(event) {
				if(!gChatbotCalled){
					console.log("mouse click!");
					rebootChatbot();
				}else{
					console.log("mouse click ignored");
				}				
			});
			gCall = setTimeout(callChatbot, GTIMEOUT);
		}
	}

});
function rebootChatbot() {
	console.log("rebootChatbot");
    window.clearTimeout(gCall);
    gCall = setTimeout(callChatbot, GTIMEOUT);
}
function callChatbot(){
	console.log("call chatbot!!");
	var baseUrl = $("#configChatUrl").val();
	var userId = $("#smoochId").val();
	var lang = $("#locale").val();
	var appName = $("#appName").val();
	var urlPago = $("#urlPago").length ? $("#urlPago").val() : "";
	var urlCompromiso = $("#urlAplazar").length ? $("#urlAplazar").val() : "";
	var urlFraccionar = $("#urlFraccionar").length ? $("#urlFraccionar").val() : "";
	console.log("showHelpUser(" + baseUrl + "," + userId + "," + lang + "," + appName + "," + urlPago + "," + urlCompromiso + "," + urlFraccionar + ")");
	showHelpUser(baseUrl, userId, lang, appName, urlPago, urlCompromiso, urlFraccionar);
	stopCallChatbot();
}
function stopCallChatbot(){
	window.clearTimeout(gCall);
	gChatbotCalled = true;
}
function isNewChatbot(){
	$('#cookiesModal').on('hide.bs.modal', function () {
		try{
			console.log("call chatbot presentation!!");  
			var baseUrl = $("#configChatUrl").val();
			var userId = $("#smoochId").val();
			var lang = $("#locale").val();
			var appName = $("#appName").val();
			//console.log('requestInfoNewWeb(' + baseUrl + "," + userId + "," + lang + "," + appName + ")");
			requestInfoNewWeb(baseUrl, userId, lang, appName);
		}catch(error){
			console.log("Error en el chatbot, lo capturamos y continuamos." + error);
		}
	});
}
/* <!-- LiveChat code --> */

function chatLink(){
	accessChatLink($("#tempId").val(), $("#configChatJsUrl").val());
}
	
function init() {
	params = chatConfiguration($("#locale").val(),$("#configChatUrl").val()+'configChat/');
};
	
function initChat() {
	var el = document.getElementById('contentChat');
	var iframeDoc = getIframeWindow(el)
	iframeDoc.initializeChat(params);
};	

function getGroup(locale){
	if( locale == 'ca'){
		return 2;
	}
	if( locale == 'es'){
		return 1;
	}
	return 3;
};

function hiddenChat(){
	LC_API.hide_chat_window();
}

function minChat(){
	LC_API.minimize_chat_window();
}

function openChat(){
	LC_API.open_chat_window();
}

function asyncOpenChat(){
	if(load){
		openChat();
		clearInterval(itv);
	};
}