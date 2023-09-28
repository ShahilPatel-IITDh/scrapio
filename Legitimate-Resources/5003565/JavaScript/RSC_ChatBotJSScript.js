// bold 360 chatbot 
window._bcvma = window._bcvma || [];
_bcvma.push(["setParameter", "VisitName", ""]);
_bcvma.push(["setParameter", "VisitPhone", ""]);
_bcvma.push(["setParameter", "VisitEmail", ""]);
_bcvma.push(["setParameter", "VisitRef", ""]);
_bcvma.push(["setParameter", "VisitInfo", ""]);
_bcvma.push(["setParameter", "CustomUrl", ""]);
_bcvma.push(["setParameter", "WindowParameters", ""]);
_bcvma.push(["pageViewed"]);
    
let bcLoad = function(event){
	
    let accountId = event.detail.accountId;
    let chatId = event.detail.chatId;
    let websiteId = event.detail.websiteId;
    setChatBotConfigProperties(accountId,chatId,websiteId);
    
	if(chatbotAlreadyLoaded()){
		showChatBotHandler(); // show the chatbot icon	
	}else if(window.pageViewer && pageViewer.load) {
		pageViewer.load();
	}
	else {
		if(window.bcLoaded) return;
		window.bcLoaded = true;
		var vms = document.createElement("script"); vms.type = "text/javascript"; vms.async = true;
		vms.src = ('https:'==document.location.protocol?'https://':'http://') + `vmss.boldchat.com/aid/${accountId}/bc.vms4/vms.js`;
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(vms, s);
	}    
};

let setChatBotConfigProperties = function(accountId, chatId, websiteId) {
	
    _bcvma.push(["setAccountID", accountId]);
	_bcvma.push(["setParameter", "WebsiteID", websiteId]);
    _bcvma.push(["addFloat", {type: "chat", id: chatId}]);
};

let hideChatBotHandler = function(event){
	
	let chatBotElement = document.getElementsByClassName('widget-floating'); // chatbot outer div container
    let chatBotBcFloat =  document.getElementsByClassName('bcFloat');
        if (chatBotElement[0] !== undefined) {
            chatBotElement[0].style.visibility = "hidden";
        }
   		else if (chatBotBcFloat[0] !== undefined){
        	chatBotBcFloat[0].style.visibility = "hidden";
    	}
};

let chatbotAlreadyLoaded = function() {
	
	let chatBotElement = document.getElementsByClassName('widget-floating');
    let chatBotBcFloat =  document.getElementsByClassName('bcFloat');
	if ((chatBotElement[0] === undefined || chatBotElement[0] === null) && (chatBotBcFloat[0] === undefined || chatBotBcFloat[0] === null)){
    	return false;
    }
	return true; // already loaded check set the display to true
};

let showChatBotHandler = function(event){
	
	let chatBotElement = document.getElementsByClassName('widget-floating');
    let chatBotBcFloat = document.getElementsByClassName('bcFloat');// chatbot outer div container
    if (chatBotElement[0] !== undefined) {
        chatBotElement[0].style.visibility = "visible";
    }
    else if (chatBotBcFloat[0] !== undefined){
        chatBotBcFloat[0].style.visibility = "visible";
    }
};

// end of chatbot script   
//Handlers to listen for events triggering the display and hiding of chatbot, the aura component triggers the events which are being executed from the head markup
document.addEventListener('loadChatbot', bcLoad);
document.addEventListener('hidechatbot',hideChatBotHandler);
