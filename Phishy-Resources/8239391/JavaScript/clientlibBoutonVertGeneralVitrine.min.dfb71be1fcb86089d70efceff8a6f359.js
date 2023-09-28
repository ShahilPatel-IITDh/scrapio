(function(document, $, Granite, $document) {

    "use strict";

    NPC.startKeepAlive = function() {
    	var url = location.origin + location.pathname.replace('.html', '.activate-session.html');
        if (isFinite(NPC.keepAliveTime)) {
            NPC.keepAliveInterval = setInterval(function() {
            	var urlAjax = NPC.AddTransactionIdToUrl(url);
            	
            	$.ajax({
                    type: 'GET',
                    url: urlAjax,
                    success: function(data) {
                        console.log('keep alive - succeed to activate session');
                    },
                    error: function(data) {
                        console.error('keep alive - failed to activate session');
                    },
                });
            }, NPC.keepAliveTime);
            console.log('keep alive - startKeepAlive - OK');
            return NPC.keepAliveInterval;
        } else {
            console.error('keep alive - could not set interval because of NPC.keepAliveTime value = [' + NPC.keepAliveTime + ']');
        }
    };

    NPC.endKeepAlive = function() {
        clearInterval(NPC.keepAliveInterval);
        console.log('keep alive - endKeepAlive - OK');
    };

})(document, jQuery, Granite, jQuery(document));
(function(document, $, Granite, $document) {
	var tchatOuvert = false;
	var chatSessionSave = null;
    ///////////////////////////////////////////////////////////////
    // ----------------- Insert Script ------------------------- //
    ///////////////////////////////////////////////////////////////
    var insererScriptGenesys = function() {
        //  l'url du serveur genesys pour la recuperation du js bver.js 
        var baseUrl = NPC.genesysTchatJsUrl;
        // insertion du script apartir de l'url du serveur genesys
        if (genesysScriptInserted == false) {
            insererScript(baseUrl, function() {
                genesysScriptInserted = true;
                $(window).trigger("genesys.loaded");
            });
        }
    };

    var insererScript = function(src, callback) {
        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.async = 0;
        node.src = src;
        node.onload = node.onreadystatechange = function(_, isAbort) {
            if (isAbort || !node.readyState || /loaded|complete/.test(node.readyState)) {
                // Handle memory leak in IE
                node.onload = node.onreadystatechange = null;
                // Remove the node
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
                // Dereference the node
                node = null;

                // Callback if not abort
                if (!isAbort) {
                    callback();
                }
            }
        };
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.appendChild(node);
    };

    var genesysScriptInserted = false;

    /**
     * Retourn servlet URL
     */
    var _getServletUrl = function(selector) {
        var path = window.location.pathname;
        var pathPart = path.split('.');
        var size = pathPart.length - 1;
        if (size < 1) {
            return;
        }
        pathPart.splice(size, 1);
        var basePath = pathPart.join('.');
        return basePath + '/jcr:content.' + selector;
    };
    var urlSessionTchat = NPC.genererURLJson('get-session-tchat');
    var urlSuppressionSessionTchat = NPC.genererURLJson('remove-session-tchat');

    //Fermeture Layer BV Principal (callbackhome)
    var fermerBoutonVertWCB = function() {
    	$(window).trigger('close.bv');
	
		$('.js-GreenBtnContainer').find('.GreenBtn-callbackHome').hide();
	    $('.js-GreenBtnContainer').find('.GreenBtn').hide();
    };

    insererScriptGenesys();
    $(window).on("genesys.loaded", function() {
        NPC.GENESYS = {};
        NPC.GENESYS.openChat = function() {
            var openSessionObject = initVariables(1);
            lancerTchat(openSessionObject);
        };

        NPC.GENESYS.openRappel = function() {
            var openSessionObject = initVariables(2);
            initWebCallBack(openSessionObject);
        };
    });
    var getInformationsClient = function() {
    	var informationsClientModel = (NPC.BV.$_BV_WRAPPER.data('value').modelData != undefined) ? NPC.BV.$_BV_WRAPPER.data('value').modelData.informationsClient : null;
    	
    	var informationsClient = {
        		last_name: "",
        		first_name: "",
        		title_code: "",
        		customer_id: "",
        		phone_number: "",
    			
    	};
    	
    	 if (informationsClientModel) {
    		 var prenomClients = informationsClientModel.firstNames;
             if (prenomClients != null && prenomClients.length > 0) {
            	 prenomClient = prenomClients.join(" ");
             }
          // choix du prenom
             var nomClient = "";
             var namesOfIndividualPerson = informationsClientModel.namesOfIndividualPerson;
             if (namesOfIndividualPerson != null) {
                 if(namesOfIndividualPerson.usualName != null && namesOfIndividualPerson.usualName.trim() != ""){
                	 nomClient = namesOfIndividualPerson.usualName;
                 }else if (namesOfIndividualPerson.marriedName != null && namesOfIndividualPerson.marriedName.trim() != "") {
                	 nomClient = namesOfIndividualPerson.marriedName;
                 } else if (namesOfIndividualPerson.lastName != null && namesOfIndividualPerson.lastName.trim() != "") {
                	 nomClient = namesOfIndividualPerson.lastName;
                 }
             }
             informationsClient.last_name = nomClient;
             informationsClient.first_name = prenomClient;
             informationsClient.title_code = (informationsClientModel.titleLongLabel != null) ? informationsClientModel.titleLongLabel : "";
             informationsClient.phone_number = (informationsClientModel.mobilePhoneNumber != null) ? informationsClientModel.mobilePhoneNumber : "";
             informationsClient.customer_id = (informationsClientModel.id != null) ? informationsClientModel.id : "";
    		 
    	 }
    	 return informationsClient;
    }
    var initVariables = function(idChannel) {
        var labelChannel = (idChannel == 1) ? "Chat" : "wcb";
        var motifSelectionne = NPC.BV._BV_THEME;
        var gpuData = NPC.BV.$_BV_WRAPPER.data('value').gpuData;
        var idMarcheSelectionne = (gpuData != "undefined" && gpuData != null && gpuData.marcheSelectionne != null && !isNaN(gpuData.marcheSelectionne.marketId)) ? gpuData.marcheSelectionne.marketId : -1;
        var labelMarcheSelectionne = (idMarcheSelectionne != -1) ? gpuData.marcheSelectionne.label : undefined;
        // var qualificatifClient = (informationsClient != null && informationsClient.nomPersonne != null) ? informationsClient.nomPersonne.split(" ") : null;

        var nomClient = "";
        var prenomClient = "";
        var civiliteClient = "";
        var idClient = "";
        var telClient = "";
        
        

        //urlSessionTchat = _getServletUrl('get-session-tchat.json');
        var openSessionObject = {
            theme: {
                "id": motifSelectionne.id,
                "label": motifSelectionne.label
            },
            channel: {
                "id": idChannel,
                "label": labelChannel
            },
            market: {
                "id": idMarcheSelectionne,
                "label": labelMarcheSelectionne
            },
            context: {
                "application_code": "string",
                "origin_url": "string",
                "device": NPC.BV.$_BV_WRAPPER.data('value').modelData.device,
                "legal_notice_url": NPC.BV.$_BV_WRAPPER.data('value').modelData.legalNoticeUrl
            },
            contact: getInformationsClient()
        };
        return openSessionObject;
    };

    /////////////////////////////////////////////////////////////////
    // ----------------- lancement de Tchat ---------------------- //
    /////////////////////////////////////////////////////////////////
    var lancerTchat = function(openSessionObject) {
        if (genesysScriptInserted == true) {
            var numCR = NPC.idLiveCopyCaisse;
            numCR = (numCR != "national" && numCR != "master") ? numCR.substring(2) : numCR;
            var postParamsOpenSession = {
                numeroCR: numCR,
                idMarche: openSessionObject.market.id,
                labelMarche: openSessionObject.market.label,
                idTheme: openSessionObject.theme.id,
                labelTheme: openSessionObject.theme.label,
                idChannel: openSessionObject.channel.id,
                labelChannel: openSessionObject.channel.label,

                customerId: openSessionObject.contact.customer_id,
                titleCode: openSessionObject.contact.title_code,
                firstName: openSessionObject.contact.first_name,
                lastName: openSessionObject.contact.last_name,
                phoneNumber: openSessionObject.contact.phone_number
            }

            // ouverture de la session 
            openSession(postParamsOpenSession, openSessionObject);
        }
    };

    function initWebCallBack(openSessionObject) {
        var numeroCR = NPC.idLiveCopyCaisse;
        numeroCR = (numeroCR != "national" && numeroCR != "master") ? numeroCR.substring(2) : numeroCR;
        var request_wcb = {
            technical_wcb: {
                frame_id: '.js-GreenBtnContainer',
                div_id: '.js-GreenBtnContainer',
                authorized_key: NPC.genesysTchatJsAuthorizationKey
            },
            business_wcb: {
                channel_id: '2',
                customer_id: openSessionObject.contact.customer_id,
                first_name: openSessionObject.contact.first_name,
                last_name: openSessionObject.contact.last_name,
                market_id: openSessionObject.market.id,
                regional_bank_id: numeroCR,
                theme_id: openSessionObject.theme.id + '#' + openSessionObject.theme.label,
                title_code: openSessionObject.contact.title_code,
                schedule: getWebCallBackScheduls(),
                device: openSessionObject.context.device,
                legal_notice_url: location.origin + openSessionObject.context.legal_notice_url,
                time_zone_difference : NPC.BV.$_BV_WRAPPER.data('value').timezone_difference
            }
        };

        var reponseWcb = {
            label_id: ""
        };
        var successFct = function() {
            /**
             * P0281-672 - Si la bubble de WCB n'est pas celle du BV
             * mais celle du Tchat-WCB, on ouvre d'abord le BV
             */
            const isIntoTchatWCBContainer = $(this).filter(() => $(this).parents('.tchatWCBContainer').length || $(this).hasClass("tchatWCBContainer"));
            if(isIntoTchatWCBContainer) {
                NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
                $(window).trigger("startBV.loaded");
            }
            
			$('.js-radio-label').on('click', function(){
				var $this = $(this);
				var $input = $this.prev('input');
				$input.prop('checked', 'checked');
			});
			  
			$('.GreenBtn-callbackClose').on('click', function() {
				NPC.BV.FUNCTIONS.OPENCLOSE.closeBV();
			});
			$(window).trigger('layout.bv');
        };
        var technicalFct = function(reponseWcb) {
            fermerBoutonVertWCB();
        };
        var businessFct = function(reponseWcb) {
            fermerBoutonVertWCB();
        };
        var wcbEndedCallBack = function() {
            $(window).trigger("close.bv");
        };
        BVER.open_wcb(request_wcb, wcbEndedCallBack, successFct, technicalFct, businessFct);
        $(window).trigger("wcb.called");
        $(window).trigger('layout.bv');
    };
    
    function initTchat(openSessionObject, reponse) {
        var numeroCR = NPC.idLiveCopyCaisse;
        numeroCR = (numeroCR != "national" && numeroCR != "master") ? numeroCR.substring(2) : numeroCR;

        var request_chat = {
            technical_chat: {
                div_id: '#tchat_session',
                frame_id: '#tchat_session',
                session_id: reponse.session_id,
                user_id: reponse.user_id,
                secure_key: reponse.secure_key,
                alias: reponse.alias,
                authorized_key: NPC.genesysTchatJsAuthorizationKey
            },
            business_chat: {
                regional_bank_id: numeroCR,
                first_name: openSessionObject.contact.first_name,
                last_name: openSessionObject.contact.last_name,
                customer_id: openSessionObject.contact.customer_id,
                market_id: openSessionObject.market.id,
                channel_id: openSessionObject.channel.id,
                theme_id: openSessionObject.theme.id + '#' + openSessionObject.theme.label,
                device: openSessionObject.context.device,
                legal_notice_url: location.origin + openSessionObject.context.legal_notice_url
            }
        };

        var successFct = function() {
			$(window).trigger("npcTchat.ouvert");
            var chatSession = {};
            chatSession.ouvrirChat = true;
            chatSession.openSessionObject = openSessionObject;
            chatSession.wasConnected = NPC.user.isConnected;
            chatSession.requestChat = request_chat;
            tchatOuvert = true;
            //cookie permettant de gerer la navigation
            var cookieNavString = NPC.recupererCookie('chat-session-navigation');
            var cookieNavObject = null;
            // tester si le cookie de navigation n'est pas présent
            if(!cookieNavString){
            	cookieNavObject = chatSession;
            	//si le cookie de navigation est présent alors le garder et mettre a jour ouvrirChat,openSessionObject,wasConnected
            }else{
            	cookieNavObject = JSON.parse(window.unescape(cookieNavString));
            	cookieNavObject.ouvrirChat = chatSession.ouvrirChat;
            	cookieNavObject.openSessionObject = chatSession.openSessionObject;
            	cookieNavObject.wasConnected = chatSession.wasConnected;
            	
            }
            NPC.affecterCookie('chat-session-navigation', JSON.stringify(cookieNavObject));
            chatSessionSave = cookieNavObject;
			NPC.startKeepAlive();
			fermerBoutonVertWCB();
        };
        var reponse = {
            label_id: ""
        };
        var technicalFct = function(reponse) {
        };
        var businessFct = function(reponse) {
        };
        var successFctEnd = function() {
			// supprimer le cookie de navigation
			NPC.supprimerCookie('chat-session-navigation');
			chatSessionSave = null;
        };
        var chatEndedCallBackFct = function() {
			supprimerTchatSession();
			NPC.supprimerCookie('chat-session-navigation');
			chatSessionSave = null;
			//BVER.close_chat(request_chat, successFctEnd, technicalFct, businessFct);
			NPC.endKeepAlive();
		};
		var supprimerTchatSession = function () {
			
			var urlAjax = NPC.AddTransactionIdToUrl(urlSuppressionSessionTchat);
			
			$.ajax({
	            type: 'POST',
	            url: urlAjax,
	            data: {},
	            cache: true,
	            success: function(data) {
	            },
	            error: function(data) {
	            },
	        });
		}
		// si le tchat a été lancé avant la connexion
		var isTchatlaunchedBeforCo = NPC.recupererCookie('chat-session');
		var chatSessionNavigation = NPC.recupererCookie('chat-session-navigation');
		var chatData;
        if (!isTchatlaunchedBeforCo) {
            if(chatSessionNavigation){
            	var tchatSessionObject = JSON.parse(window.unescape(chatSessionNavigation));
                var chatData = tchatSessionObject.requestChat ? tchatSessionObject.requestChat : request_chat;
                BVER.open_chat(chatData, chatEndedCallBackFct, successFct, technicalFct, businessFct);
            }else{
            	chatData = request_chat;
            	BVER.open_chat(chatData, chatEndedCallBackFct, successFct, technicalFct, businessFct);
            }
        	
        } else {
        	var updateChatSession = JSON.parse(chatSessionNavigation);
        	var chatData = updateChatSession.requestChat;
            // une fois le cookie récupéré on suprime le cookie
            NPC.supprimerCookie('chat-session');
            // update user data
            var informationsCliensAJour = getInformationsClient();
            
            if (informationsCliensAJour) {
            	chatData.business_chat.last_name = (informationsCliensAJour.last_name) ? informationsCliensAJour.last_name : "";
            	chatData.business_chat.first_name = (informationsCliensAJour.first_name) ? informationsCliensAJour.first_name : "";
            	chatData.business_chat.customer_id = (informationsCliensAJour.customer_id) ? informationsCliensAJour.customer_id : "";
            }
            chatData.business_chat.regional_bank_id = numeroCR;
            updateChatSession.requestChat = chatData;
            // affecter au cookie de la navigation le requestTchat mis a jour
            NPC.supprimerCookie('chat-session-navigation');
            NPC.affecterCookie('chat-session-navigation', JSON.stringify(updateChatSession));
			BVER.open_chat(chatData, chatEndedCallBackFct, successFct, technicalFct, businessFct);
        }
    };
    
    function getWebCallBackScheduls() {
        var bvDataSelector = NPC.BV.$_BV_WRAPPER.data('value');
        var motifSelectionne = null;
        var motifSelectionneId = null
        var gpuData = null;
        var themesList = null;
        var SchedulsWCB = null;
        if (bvDataSelector.motifSelected == undefined) {
            return false;
        } else if (bvDataSelector.motifSelected.id == undefined) {
            return false;
        } else if (bvDataSelector.gpuData == undefined) {
            return false;
        } else if (bvDataSelector.gpuData.listThemes == undefined) {
            return false;
        } else {
            motifSelectionne = bvDataSelector.motifSelected;
            motifSelectionneId = motifSelectionne.id;
            gpuData = bvDataSelector.gpuData;
            themesList = (gpuData != null) ? gpuData.listThemes : null;

            if (themesList != null) {
                $.each(themesList, function(index, currentTheme) {
                    if (currentTheme != undefined && currentTheme.themeId == motifSelectionneId) {
                        $.each(currentTheme.channelsList, function(index, currentChannel) {
                            if (currentChannel.channelId == 2) {
                                SchedulsWCB = currentChannel.schedule;
                                return false;
                            }
                        });
                        return false;
                    }
                });
            }
        }
        return SchedulsWCB;
    };

    // appel de la fonction openSession
    function openSession(postParamsOpenSession, openSessionObject) {
    	
    	var urlAjax = NPC.AddTransactionIdToUrl(urlSessionTchat);
    	
        $.ajax({
            type: 'POST',
            url: urlAjax,
            data: postParamsOpenSession,
            cache: true,
            success: function(data) {
                initTchat(openSessionObject, data);
            },
            error: function(data) {
                return null;
            },
        });
    };

    $(window).load(function() {
    	//recuperation du cookie de navigation
        var chatSessionJSON = NPC.recupererCookie('chat-session-navigation');
        if(chatSessionJSON){
        	var dataChatSession = JSON.parse(window.unescape(chatSessionJSON));
        	// le cookie est utilisépour 2 choses : 
        	//		- si l'utilisateur est en cours de navigation, reouvrir le tchat avec les memes informations
        	//		- lors d'un retour MOCO, si un chat était ouvert sur lesite producteur, on doit l'ouvrir sur le NPC
        	//la différence entre les 2 modes se fait avec les informations disponible dans le chat
            if (dataChatSession && dataChatSession.ouvrirChat && dataChatSession.openSessionObject && dataChatSession.requestChat) {
            	initTchat(dataChatSession.openSessionObject, dataChatSession.requestChat.technical_chat);
            } else {
            	var variables = initVariableForChatMOCO(dataChatSession);
            	initTchat(variables, dataChatSession);
            	
            }
        }
    });
    
    //on se base sur la création des variables mais on alimente l'id marché qui n'aura pasété récupéré car le BV n'est pas encore ouvert
    function initVariableForChatMOCO(data) {
    	var variables = initVariables(1);
    	variables.market.id = data.id_market;
    	variables.market.label = data.label_market;
    	
    	return variables;

    }
    
    // declanchement d'un event lorsque l'utilisateur clique sur le bouton pour se connecter
    $(".npc-msl-button[name='btnMeConnecter']").click(function() {
    	 $(window).trigger('connexion.tchat');
    });
    // affectation du cookie suite au click sur le bouton de connexion 
     $(window).on("connexion.tchat", function(){
    	 // si le tchat a ete ouvert lors du click suer la connexion
    	 if(chatSessionSave != null){
    		 NPC.affecterCookie('chat-session', true);
    	 }
    	 
     });
     
     // suite a la confirmation de deconnexion
     $("#header-logged-logoff-modal").click(function() {
    	 fermetureTchatAuto();  
     });
     // fonction permettant de recuper l objet du tchat en session et de fermer ce dernier
     var fermetureTchatAuto = function () {
     	 var successFct = function() {
				NPC.supprimerCookie('chat-session-navigation');
				
	        };
	        var technicalFct = function(reponse) {
	        };
	        var businessFct = function(reponse) {
	        };
	        var chatSessionJSON = NPC.recupererCookie('chat-session-navigation');
	        
	        if (chatSessionJSON) {
	            var chatSessionObject = JSON.parse(window.unescape(chatSessionJSON));
				BVER.close_chat(chatSessionObject.requestChat, successFct, technicalFct, businessFct);
	        }
     };
    // a la fermeture du navigateur
     $(window).onbeforeunload = function(){
    	 fermetureTchatAuto();
    	}


})(document, jQuery, Granite, jQuery(document));
var deconnecter;
(function(document, $, Granite, $document) {

    "use strict";

    $('#header-logged-logoff').on('click', function(evt) {
    	if ($('#tchat_session').children().length > 0) {
    		evt.preventDefault();
    		$("#modalTchat").modal('show');
    	}
    });
    
    deconnecter = function(url) {
        if ($('#tchat_session').children().length > 0) {
            $("#modalTchat").modal('show');
        } else {
        	NPC.deconnexion.deconnexionManuelle(url);
        }
	}
})(document, jQuery, Granite, jQuery(document));
// array filter
if (!Array.prototype.filter){
  Array.prototype.filter = function(fun /*, thisArg */){
    'use strict';

    if (this === void 0 || this === null){
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    // NOTE : fix to avoid very long loop on negative length value

    if (len > t.length || typeof fun != 'function'){
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++){
      if (i in t){
        var val = t[i];

        // NOTE: Techniquement on devrait utiliser Object.defineProperty
        //       pour le prochain index car push peut être affecté
        //       par les propriétés d'Object.prototype et d'Array.prototype.
        //       Cependant cette méthode est récente et les cas de collisions
        //       devraient rester rares : on préfère donc l'alternative la plus
        //       compatible.
        if (fun.call(thisArg, val, i, t)){
          res.push(val);
        }
      }
    }

    return res;
  };
}

// ECMA-262, Edition 5, 15.4.4.18
// Référence: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach){

  Array.prototype.forEach = function(callback /*, thisArg*/){

    var T, k;

    if (this == null){
      throw new TypeError(' this vaut null ou n est pas défini');
    }

    // 1. Soit O le résultat de l'appel à ToObject
    //    auquel on a passé |this| en argument.
    var O = Object(this);

    // 2. Soit lenValue le résultat de l'appel de la méthode
    //    interne Get sur O avec l'argument "length".
    // 3. Soit len la valeur ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. Si IsCallable(callback) est false, on lève une TypeError.
    // Voir : http://es5.github.com/#x9.11
    if (typeof callback !== 'function'){
      throw new TypeError(callback + ' n est pas une fonction');
    }

    // 5. Si thisArg a été fourni, soit T ce thisArg ;
    //    sinon soit T égal à undefined.
    if (arguments.length > 1){
      T = arguments[1];
    }

    // 6. Soit k égal à 0
    k = 0;

    // 7. On répète tant que k < len
    while (k < len){

      var kValue;

      // a. Soit Pk égal ToString(k).
      //   (implicite pour l'opérande gauche de in)
      // b. Soit kPresent le résultat de l'appel de la
      //    méthode interne HasProperty de O avec l'argument Pk.
      //    Cette étape peut être combinée avec c
      // c. Si kPresent vaut true, alors
      if (k in O){

        // i. Soit kValue le résultat de l'appel de la
        //    méthode interne Get de O avec l'argument Pk.
        kValue = O[k];

        // ii. On appelle la méthode interne Call de callback
        //     avec T comme valeur this et la liste des arguments
        //     qui contient kValue, k, et O.
        callback.call(T, kValue, k, O);
      }

      // d. On augmente k de 1.
      k++;
    }

    // 8. on renvoie undefined
  };
}

// Object.assign
if (typeof Object.assign != 'function'){

  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target){ // .length of function is 2
      'use strict';
      if (target == null){ // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++){
        var nextSource = arguments[index];

        if (nextSource != null){ // Skip over if undefined or null
          for (var nextKey in nextSource){

            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)){
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}


var listManagerFactory = function(){
  var map = {};
  var list = [];

  return {
    hasItemId: function(id){
      return map[id] !== undefined;
    },
    addItem: function(item){
      if (this.hasItemId(item.id) === true){
        return false;
      }

      map[item.id] = item;
      list.push(item.id);
    },
    removeItemId: function(id){
      if (this.hasItemId(id) === false){
        return false;
      }

      map[id] = undefined;
      list.splice(list.indexOf(id), 1);
    },
    removeAll: function(){
      map = {};
      list = [];
    },
    getLength: function(){
      return list.length;
    },
    getAll: function(){
      var r = [];

      list.forEach(function(id){
        r.push(map[id]);
      });

      return r;
    },
    getById: function(id){
      return map[id];
    },
    forEach: function(forFunc){
      var listClone = list.slice(0);
      return listClone.forEach(function(id){
        forFunc(map[id]);
      });
    }
  };
};

var mapFactory = null; // eslint-disable-line no-unused-vars
(function(){

  var defaultOptions = {
    ZOOM: 13,
    ICONS: {
      public: '../resources/images/commun/ca-pin.png',
      specific: '../resources/images/commun/ca-pin4.png',
      green_point: '../resources/images/commun/ca-pin2.png',
      square: '../resources/images/commun/ca-pin3.png',
      chalus: '../resources/images/commun/ca-pin-chalus.png'
    },
    DEFAULT_ICON: 'public',
    GOOGLE_ITINERARY_PATTERN: 'https://www.google.fr/maps/dir/'
  };

  mapFactory = function(map, opts){
    var gmap = null;
    var oldMap = null;
    var markers = listManagerFactory(); // list of markers
    var mapInfo = null; // the gmap info window
    var options;
    var onClickMarkerList = [];
    var onBoxCloseList = [];
    var markerIdOpened = null;

    var setOptions = function(opts){
      options = Object.assign({}, defaultOptions, window.StoreLocatorFactoryOptions, opts);

      return true;
    };

    var initMap = function(map){
      if (map === oldMap){
        return false;
      }

      var mapOptions = {
        zoom: options.ZOOM,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      gmap = new google.maps.Map(map, mapOptions);

      mapInfo = new google.maps.InfoWindow({
        content: ''
      });

      google.maps.event.addListener(mapInfo, 'closeclick', function(){
        onBoxCloseList.forEach(function(onBoxClose){
          onBoxClose(getMarkerById(markerIdOpened));
        });
      });

      oldMap = map;
    };

    var addOnBoxClose = function(func){
      onBoxCloseList.push(func);
    };
    var addOnClickMarker = function(func){
      onClickMarkerList.push(func);
    };
    var getMarkerById = function(markerId){
      return markers.getById(markerId) || null;
    };
    var getMarkerPosition = function(marker){
      return marker.marker.getPosition();
    };
    var fitBounds = function(delta){
      if (delta === undefined || typeof delta !== 'object'){
        var intDelta = isNaN(delta) ? 0 : parseFloat(delta);
        delta = {
          lat: intDelta,
          lng: intDelta
        };
      }

      if (markers.getLength() === 1){
        var marker = markers.getAll()[0];
        var position = getMarkerPosition(marker);

        gmap.setCenter(
          {
            lat: position.lat(),
            lng: position.lng()
          }
        );
        gmap.setZoom(options.ZOOM);

        return true;
      }

      var latMin = Infinity;
      var latMax = -Infinity;
      var lngMin = Infinity;
      var lngMax = -Infinity;

      markers.forEach(function(marker){
        var lat = marker.marker.position.lat();
        var lng = marker.marker.position.lng();

        if (lat < latMin){
          latMin = lat;
        }
        if (lat > latMax){
          latMax = lat;
        }

        if (lng < lngMin){
          lngMin = lng;
        }
        if (lng > lngMax){
          lngMax = lng;
        }
      });

      gmap.fitBounds(
        new google.maps.LatLngBounds(
          new google.maps.LatLng(latMin - delta.lat, lngMin - delta.lng),
          new google.maps.LatLng(latMax + delta.lat, lngMax + delta.lng)
        )
      );
    };
    var getMarkerOpened = function(){
      if (mapInfo.getAnchor() === null || markerIdOpened === null){
        return false;
      }

      return markers.getById(markerIdOpened);
    };
    var closeMarker = function(){
      if (mapInfo.getAnchor() !== null){
        mapInfo.close();
      }

      markerIdOpened = null;
    };
    addOnClickMarker(closeMarker);

    var openMarker = function(markerId){
      var marker;
      if (typeof markerId === 'string'){
        marker = getMarkerById(markerId);
      } else {
        marker = markerId;
      }
      markerIdOpened = marker.id;

      if (marker.content){
        mapInfo.setContent(marker.content);
        mapInfo.open(gmap, marker.marker);
      }
    };

    var setVisibleById = function(markerId, visible){
      var marker = getMarkerById(markerId);
      if (marker === null){
        return false;
      }

      marker.marker.setVisible(visible);

      if (visible === false && mapInfo.getAnchor() === marker.marker){
        mapInfo.close();
      } else if (visible === true && marker.id === markerIdOpened){
        openMarker(markerId);
      }

      return true;
    };

    var triggerFocus = function(marker){
      onClickMarkerList.forEach(function(onFocusMarker){
        onFocusMarker(marker);
      });
    };


    // base actions

    setOptions(opts);
    initMap(map);

    /**
     * Faire la correspondance entre le type d'agence et son image situé sur l'objet StoreLocatorFactoryOptions
     * dans le fichier init_storeLocatorPin.js
     * ==> Comme ça on'est iso avec le code des pages content.jsp sous store-locator-t033 et store-locator-t113 (sous apps/ca/npc/components/pages)
     */
    var getIcon = function(type){
      if ( type[ 0 ] == 2 ) {                            // eslint-disable-line
        return 'green_point';
      } else if ( type[ 0 ] == 3 ) {                    // eslint-disable-line
        return 'square';
      } else if ( type[ 0 ] == 4 || type[ 0 ] == 5 ) {  // eslint-disable-line
        return 'dab';
      } else if ( type[ 0 ] == 6 ) {                    // eslint-disable-line
        return 'e_agence';
      } else if (NPC.idLiveCopyCaisse == 'cr764') {     // eslint-disable-line
        return 'chalus';
      } else {
        return 'public';
      }
    };

    // define public options

    var actions = {
      initMap: initMap,
      setOptions: setOptions,
      getOptions: function(){
        return options;
      },
      getGmap: function(){
        return gmap;
      },

      /**
       * Add marker to the map
       *
       * @param marker
       * @param marker.id {string} the ID of marker wanted
       * @param marker.lat {number} the latitude of marker
       * @param marker.lng {number} the longitude of marker
       * @param marker.type {string} the icon type of the marker
       * @param marker.content {string} the content of the marker
       * @returns {boolean}
       */
      addMarker: function(marker){
        var newMarker = {
          id: marker.id,
          content: marker.content,
          marker: new google.maps.Marker({
            position: new google.maps.LatLng(
              marker.lat,
              marker.lng
            ),
            clickable: !!marker.content,
            icon: 'undefined' != typeof marker.type && options.ICONS[marker.type] || 'undefined' != typeof marker.type && options.ICONS[getIcon(marker.type)] || options.ICONS[options.DEFAULT_ICON],
            map: gmap
          })
        };

        google.maps.event.addListener(newMarker.marker, 'click', function(){
          triggerFocus(newMarker);
        });

        markers.addItem(newMarker);

        return true;
      },
      fitBounds: fitBounds,
      getMarkerById: getMarkerById,
      getMarkerPosition: getMarkerPosition,
      getMarkerOpened: getMarkerOpened,
      getAllMarkers: function(){
        return markers.getAll();
      },
      removeMarker: function(markerId){
        var marker = getMarkerById(markerId);

        marker.marker.setMap(null);

        markers.removeItemId(markerId);
      },
      showMarker: function(markerId){
        return setVisibleById(markerId, true);
      },
      hideMarker: function(markerId){
        return setVisibleById(markerId, false);
      },

      removeAllMarker: function(){
        markers.forEach(function(marker){
          actions.removeMarker(marker.id);
        });

        return true;
      },
      openMarker: openMarker,
      focusMarker: function(markerId, needOpen){
        var marker = getMarkerById(markerId);
        if (marker === null || marker.marker.getVisible() === false){
          return false;
        }

        if (needOpen){
          openMarker(marker);
        } else {
          gmap.panTo(marker.marker.getPosition());
        }

      },
      addOnClickMarker: addOnClickMarker,
      addOnBoxClose: addOnBoxClose,
      openItinerary: function(){
        var url = options.GOOGLE_ITINERARY_PATTERN;

        if (typeof NPC !== 'undefined'
          && typeof NPC.geoloc !== 'undefined'
        ){
          if (NPC.geoloc.geolocalized){
            url += NPC.geoloc.lat + ',' + NPC.geoloc.long;
          } else {
            NPC.geoloc.addCallBackFnc(actions.openItinerary);
            NPC.geoloc.tryToGeoloc();
            return false;
          }
        }

        var marker = getMarkerOpened();
        if (marker === false){
          return false;
        }

        var position = getMarkerPosition(marker);
        url += '/' + position.lat() + ',' + position.lng() + '/';

        return window.open(url, '_blank');
      }
    };

    return actions;
  };
})();


// require t03x_storeMap.js

var filtersManagerFactory;
(function(){
  filtersManagerFactory = function($forms, baseFilters){
    var currentFilters = Object.assign({}, baseFilters);
    var tempFilters = Object.assign({}, currentFilters);
    var onApplyFiltersList = [];

    var $checks, $selects;


    var getFilters = function(){
      return Object.assign({}, currentFilters);
    };
    var render = function(){

      // change inputs with currentFilter
      $checks.each(function(){
        var $this = $(this);
        var filter = $this.data('filter');
        var value = $this.val();
        var checked = $this.is(':checked');
        var needCheck = hasCurrentFilterValue(filter, value);

        if (checked !== needCheck){
          $this.prop('checked', needCheck);
        }
      });
      $selects.each(function(){
        var $this = $(this);
        var filter = $this.data('filter');
        var value = $this.val();
        var needCheck = value !== currentFilters[filter];

        if (needCheck === true){
          $this.val(currentFilters[filter]).trigger('change');
        }

      });
    };
    var applyFilters = function(){
      currentFilters = Object.assign({}, tempFilters);
      render();

      var filters = getFilters();
      onApplyFiltersList.forEach(function(onApplyFilters){
        onApplyFilters(filters);
      });
    };
    var hasFilterValue = function(filters, filterName, value){
      if (typeof currentFilters[filterName] === 'string'){
        return currentFilters[filterName] === value;
      } else {
        return currentFilters[filterName].indexOf(value) !== -1;
      }
    };
    var hasTempFilterValue = function(filterName, value){
      return hasFilterValue(tempFilters, filterName, value);
    };
    var hasCurrentFilterValue = function(filterName, value){
      return hasFilterValue(currentFilters, filterName, value);
    };
    var setTempFilterValue = function(filterName, value, add){
      if (typeof tempFilters[filterName] === 'string'){
        tempFilters[filterName] = (add === true) ? value : '';
      } else {
        var index = tempFilters[filterName].indexOf(value);

        if (add === true && index === -1){
          tempFilters[filterName] = [].concat(tempFilters[filterName], value);
        } else if (add === false && index !== -1){
          tempFilters[filterName] = tempFilters[filterName].filter(function(val){
            return val !== value;
          });
        }
      }
    };


    var initFormsElements = function($forms){
      $checks = $forms.find('input[type="checkbox"]');
      $selects = $forms.find('select');

      $checks
        .off('click.filterManager')
        .on('click.filterManager', function(){
          var $this = $(this);
          var filter = $this.data('filter');
          var value = $this.val();
          var checked = $this.is(':checked');

          if (hasTempFilterValue(filter, value) !== checked){
            setTempFilterValue(filter, value, checked);
          }
        })
      ;
      $selects
        .off('change.filterManager')
        .on('change.filterManager', function(){
          var $this = $(this);
          var filter = $this.data('filter');
          var value = $this.val();

          if (!hasTempFilterValue(filter, value)){
            setTempFilterValue(filter, value, true);
          }
        })
      ;

      render();
    };

    initFormsElements($forms);


    return {
      resetFilters: function(){
        tempFilters = Object.assign({}, baseFilters);
        applyFilters();
      },
      applyFilters: applyFilters,
      cancelFilters: function(){
        tempFilters = Object.assign({}, currentFilters);
        render();
      },
      setFilterValue: setTempFilterValue,
      getFilters: getFilters,
      addOnApplyFilters: function(func){
        onApplyFiltersList.push(func);
      },
      initFormsElements: initFormsElements
    };
  };
})();


var mapManagerFactory; // eslint-disable-line no-unused-vars
(function($, listManagerFactory){

  var mapManagerDefaultOptions = (function(){
    return {
      ZOOM: 13,
      ICONS: {
        public: '../images/commun/ca-pin.png',
        specific: '../images/commun/ca-pin4.png',
        green_point: '../images/commun/ca-pin2.png',
        square: '../images/commun/ca-pin3.png'
      },
      DEFAULT_ICON: 'public',

      CONTENT_CONTAINER_SELECTOR: '.js-StoreLocatorMap-content',
      AGENCY_CONTENT_SELECTOR: '.js-storeLoc-content',
      ACTIVE_CLASS: 'active',
      TOGGLE_CLASS: 'toggle-open',
      MAP_CLASS: 'js-StoreLocatorMap-Map',
      CURRENT_CLASS: 'current',


      HIDDEN_CLASS: 'hidden',
      MAP_FOCUSED_CLASS: 'has-mapFocus',
      MAP_LEFT_CLASS: 'has-mapLeft',
      OPEN_CLASS: 'open',
      MODAL_SEARCH_CLASS: 'js-FilterModal-Search',


      STORE_LOCATOR_MAP_SELECTOR: '.js-StoreLocatorMap-GMap',
      FILTER_FORMS_SELECTOR: '.js-StoreLocatorMap-Filters,.js-FilterModal-Filters',
      STORE_LOCATOR_TOGGLE_SELECTOR: '.js-StoreLocatorToggle',
      STORE_LOCATOR_FILTER_TOGGLE_SELECTOR: '.js-StoreLocatorFilterToggle',
      STORE_LOCATOR_FINDER_SELECTOR: '.js-StoreLocatorFinder',
      HEAD_LINK_SELECTOR: '.js-StoreLocatorCard-headLink',
      HEAD_LINK__REDIRECT_SELECTOR: '.js-StoreLocatorCard-headLink--redirect',
      OPEN_FILTER_SELECTOR: '.js-filter',
      AGENCY_SELECTOR: '.js-storeLoc-agency',
      SELECT_AGENCY_SELECTOR: '.js-storeLoc-selectAgency',
      FILTER_FORMS_AUTO_SUBMIT_SELECTOR: '.js-StoreLocatorMap-Filters',
      AGENCY_COUNT_SELECTOR: '.js-StoreLocatorMap-near',
      NO_AGENCIES_SELECTOR: '.js-StoreLocatorMap-Agency--noResult',

      FILTER_MODAL_SELECTOR: '.js-FilterModal',
      FILTER_MODAL__APPLY_SELECTOR: '.js-FilterModal-apply',
      FILTER_MODAL__RESET_SELECTOR: '.js-FilterModal-reset',

      MAP_FOCUSED_BASE: false,
      SEARCH_FOCUSED_BASE: false,

      GOOGLE_ITINERARY_PATTERN: 'https://www.google.fr/maps/dir//',


      AGENCY_COUNT_TEXT: function(showedCount){
        return showedCount + ' agence' + (showedCount > 1 ? 's' : '');
      },
      DEFINE_SELECTED_STRUCTURE_TYPE: function(agencies){

        // P0281-502 [STORELOC] - Ajuster le filtre de type de structures
        // Si toute les agences de la liste courante sont du même type, on sélectionne ce type dans le filtre

        const allAgenciesTypes = agencies.map(agency => agency.type);

        const agenciesUniqueTypes = allAgenciesTypes.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

        return agenciesUniqueTypes.length === 1 ? agenciesUniqueTypes[0] : null;

      },
      DEFAULT_FILTERS: function(agencies){

        const uniqueStructureSelected = this.DEFINE_SELECTED_STRUCTURE_TYPE(agencies);

        return {
          type: uniqueStructureSelected ? uniqueStructureSelected : '',
          service: [],
          openings: [],
          attribute: []
        };
      },
      DEFINE_AGENCY_WITH_AGENCY: function($agency, options){
        var data = $agency.data('val');
        var content = $agency.find(options.AGENCY_CONTENT_SELECTOR).html();

        return {
          id: data.id,
          lat: data.latitude,
          lng: data.longitude,
          type: data.type,
          isEagence: data.isEagence,
          service: data.service,
          openings: data.openings,
          attribute: data.attribute,
          content: content,
          $item: $agency
        };
      },

      /**
       * @return {boolean}
       */
      IS_FILTERED_AGENCY: function(agency, filters){

        if (filters.type !== '' && agency.type.indexOf(filters.type) === -1){
          return false;
        }

        if (filters.service.length !== 0 && filters.service.indexOf(agency.service) === -1){
          return false;
        }


        // Openings
        var agencyOpenedMonday = agency.openings.indexOf('monday') !== -1;
        var agencyOpenedSaturday = agency.openings.indexOf('saturday') !== -1;

        var filterMonday = filters.openings.indexOf('monday') !== -1;
        var filterSaturday = filters.openings.indexOf('saturday') !== -1;

        // S'il existe des filtres sur les ouvertures
        if (filters.openings.length !== 0){

          // Si le fitre monday est activé, l'agence doit être ouverte le lundi
          if (filterMonday === true && agencyOpenedMonday === false){
            return false;
          }

          // Si le fitre saturday est activé, l'agence doit être ouverte le samedi
          if (filterSaturday === true && agencyOpenedSaturday === false){
            return false;
          }
        }

        // END Openings


        if (filters.attribute.length !== 0
          && filters.attribute.indexOf(agency.attribute) === -1
        ){
          return false;
        }

        return true;
      }
    };
  })();


  mapManagerFactory = function($containerBase, opts){
    var options = Object.assign({},
      mapManagerDefaultOptions,
      window.StoreLocatorFactoryOptions,
      opts
    );


    var $container;
    var $filterModal;
    var $filterModalApply;
    var $filterModalReset;
    var $containers;

    var mapElement;
    var $filterForms;
    var $contentContainer;
    var $StoreLocatorToggle;
    var $StoreLocatorFilterToggle;
    var $StoreLocatorFinder;
    var $headLink;
    var $headLinkRedirect;
    var $openFilter;
    var $agencies;
    var $filterFormsAutoSubmit;
    var $agencyCount;
    var $noAgencies;

    var map, filters, hasSearch;


    var filtersLast = null;
    var mapFocused = options.MAP_FOCUSED_BASE;
    var mapFocusedLast = null;
    var searchFocused = options.SEARCH_FOCUSED_BASE;
    var searchFocusedLast = null;
    var agencies = null;
    var dirtyAgencies = true;


    var render = function(){
      var currentFilters = filters.getFilters();
      if (dirtyAgencies === true
        || JSON.stringify(currentFilters) !== filtersLast
      ){
        var showedCount = 0;

        // for each item
        agencies.forEach(function(agency){
          var showed = options.IS_FILTERED_AGENCY(agency, currentFilters);

          // actions on filter
          agency.$item.toggleClass(options.HIDDEN_CLASS, showed === false);
          if (showed === true){
            map.showMarker(agency.id);

            showedCount += 1;
          } else {
            map.hideMarker(agency.id);
          }
        });

        // after list
        $agencyCount
          .text(
            typeof options.AGENCY_COUNT_TEXT === 'function'
              ? options.AGENCY_COUNT_TEXT(showedCount)
              : options.AGENCY_COUNT_TEXT
          )
        ;
        $noAgencies.toggleClass(options.HIDDEN_CLASS, showedCount !== 0);

        filtersLast = JSON.stringify(filters.getFilters());
      }

      if (mapFocused !== mapFocusedLast){
        $contentContainer.toggleClass(options.MAP_FOCUSED_CLASS, mapFocused);
        $StoreLocatorToggle.each(function(){
          var $this = $(this);

          $this.toggleClass(
            options.ACTIVE_CLASS,
            ($this.data('target') === options.MAP_CLASS) ? mapFocused : !mapFocused
          );
        });

        mapFocusedLast = mapFocused;
      }

      if (searchFocused !== searchFocusedLast){

        $StoreLocatorFilterToggle.each(function(){
          var $this = $(this);
          var target = $this.data('target');
          var toggle = (target === options.MODAL_SEARCH_CLASS) ? searchFocused : !searchFocused;

          $this.toggleClass(
            options.ACTIVE_CLASS,
            toggle
          );
          $containers.find('.' + target).toggleClass(options.TOGGLE_CLASS, toggle);
        });
        $StoreLocatorFinder.toggleClass(options.OPEN_CLASS, searchFocused);
        $headLink.toggleClass(options.HIDDEN_CLASS, !hasSearch || searchFocused);
        $headLinkRedirect.toggleClass(options.HIDDEN_CLASS, hasSearch && !searchFocused);

        searchFocusedLast = searchFocused;
      }

      dirtyAgencies = false;
    };


    var getMapElement = function(){
      return $containers.find(options.STORE_LOCATOR_MAP_SELECTOR)[0];
    };
    var getAgencies = function(){
      return $containers.find(options.AGENCY_SELECTOR);
    };

    var initAgencies = function(){
      dirtyAgencies = true;
      $agencies = getAgencies();
      $noAgencies = $containers.find(options.NO_AGENCIES_SELECTOR);

      if (!agencies){
        agencies = listManagerFactory();
      } else {
        agencies.removeAll();
      }
    };

    var initMap = function(){

      // init map
      if (!map){
        map = mapFactory(mapElement, options);
      } else {
        map.removeAllMarker();
        map.initMap(mapElement);
      }

      var hasAgence = false;
      var $eagencies = [];
      
      // init agencies
      $agencies.each(function(){
        var $agency = $(this);
        var agency = options.DEFINE_AGENCY_WITH_AGENCY($agency, options);

        if (!agency.isEagence){

          hasAgence = true;

          // add to list
          agencies.addItem(agency);
	
          // add to map
          map.addMarker({
            id: agency.id,
            lat: agency.lat,
            lng: agency.lng,
            type: agency.type[0],
            content: agency.content
          });
        } else {
          $eagencies.push(agency);
        }
      });

      if (hasAgence){
        map.fitBounds(0.005);
      }
      
      $eagencies.forEach(eagency => {
 
        // add to list
        agencies.addItem(eagency);

        // add to map
        map.addMarker({
          id: eagency.id,
          lat: eagency.lat,
          lng: eagency.lng,
          type: eagency.type[0],
          content: eagency.content
        });
      });

      if (!hasAgence){
        map.fitBounds(0.005);
      }

      render();
    };

    var init = function($containerBase){

      // set all elements
      $container = $containerBase;
      $filterModal = $container.find(options.FILTER_MODAL_SELECTOR);
      $filterModalApply = $filterModal.find(options.FILTER_MODAL__APPLY_SELECTOR);
      $filterModalReset = $filterModal.find(options.FILTER_MODAL__RESET_SELECTOR);
      $containers = $container.add($filterModal);

      mapElement = getMapElement();
      $filterForms = $containers.find(options.FILTER_FORMS_SELECTOR);
      $contentContainer = $containers.find(options.CONTENT_CONTAINER_SELECTOR);
      $StoreLocatorToggle = $containers.find(options.STORE_LOCATOR_TOGGLE_SELECTOR);
      $StoreLocatorFilterToggle = $containers.find(options.STORE_LOCATOR_FILTER_TOGGLE_SELECTOR);
      $StoreLocatorFinder = $containers.find(options.STORE_LOCATOR_FINDER_SELECTOR);
      $headLink = $containers.find(options.HEAD_LINK_SELECTOR);
      $headLinkRedirect = $containers.find(options.HEAD_LINK__REDIRECT_SELECTOR);
      $openFilter = $containers.find(options.OPEN_FILTER_SELECTOR);
      $filterFormsAutoSubmit = $containers.find(options.FILTER_FORMS_AUTO_SUBMIT_SELECTOR);
      $agencyCount = $containers.find(options.AGENCY_COUNT_SELECTOR);


      hasSearch = $headLink.length !== 0;

      initAgencies();

      // reset last (force render)
      filtersLast = null;
      mapFocusedLast = null;
      searchFocusedLast = null;

      if (!filters){
        filters = filtersManagerFactory(
          $filterForms,
          (typeof options.DEFAULT_FILTERS === 'function')
            ? options.DEFAULT_FILTERS(agencies.getAll())
            : options.DEFAULT_FILTERS
        );
      } else {
        filters.initFormsElements($filterForms);
      }

      initMap();

      // init events
      var focusAgency = function(agency){
        map.focusMarker(agency.id, true);
        agencies.forEach(function(a){
          a.$item.toggleClass(options.CURRENT_CLASS, a.id === agency.id);
        });
        mapFocused = true;
        render();
      };
      map.addOnClickMarker(focusAgency);
      map.addOnBoxClose(function(marker){
        agencies.getById(marker.id).$item.removeClass(options.CURRENT_CLASS);
      });

      agencies.forEach(function(agency){
        agency.$item
          .off('click.storeLocator', options.SELECT_AGENCY_SELECTOR)
          .on('click.storeLocator', options.SELECT_AGENCY_SELECTOR, function(e){
            e.preventDefault();

            focusAgency(agency);
          })
        ;
      });

      filters.addOnApplyFilters(function(){
        render();
      });

      $StoreLocatorToggle
        .off('click.storeLocator')
        .on('click.storeLocator', function(e){
          e.preventDefault();

          mapFocused = $(this).data('target') === options.MAP_CLASS;
          render();
        })
      ;
      $StoreLocatorFilterToggle
        .off('click.storeLocator')
        .on('click.storeLocator', function(e){
          e.preventDefault();

          searchFocused = $(this).data('target') === options.MODAL_SEARCH_CLASS;
          render();
        })
      ;
      $openFilter
        .off('click.storeLocator')
        .on('click.storeLocator', function(e){
          e.preventDefault();

          $filterModal.modal('show');
        })
      ;
      $filterModalApply
        .off('click.storeLocator')
        .on('click.storeLocator', function(e){
          e.preventDefault();

          filters.applyFilters();
          $filterModal.modal('hide');
          render();
        })
      ;
      $filterModalReset
        .off('click.storeLocator')
        .on('click.storeLocator', function(e){
          e.preventDefault();

          filters.resetFilters();
        })
      ;
      $filterModal
        .off('hidden.bs.modal.storeLocator')
        .on('hidden.bs.modal.storeLocator', function(){
          filters.cancelFilters();
        })
      ;

      var asyncApplyFilters = function(){
        setTimeout(function(){
          filters.applyFilters();
        }, 10); // set after temp filters set
      };
      $filterFormsAutoSubmit
        .off('click.storeLocator', 'input[type="checkbox"]')
        .on('click.storeLocator', 'input[type="checkbox"]', asyncApplyFilters)
      ;
      $filterFormsAutoSubmit
        .off('change.storeLocator', 'select')
        .on('change.storeLocator', 'select', asyncApplyFilters)
      ;
      $headLink
        .on('click.storeLocator')
        .on('click.storeLocator', function(e){
          e.preventDefault();

          searchFocused = true;
          render();
        })
      ;

      // base render
      // check if map is at left on mobile
      $contentContainer.toggleClass(
        options.MAP_LEFT_CLASS,
        $StoreLocatorToggle.filter('[data-target="' + options.MAP_CLASS + '"]:first').length
      );
      render();
    };


    init($containerBase);


    return {
      initialize: function($containerBase){
        return init($containerBase);
      },
      resetFilters: function(){
        return filters.resetFilters();
      },
      requireInit: function(){

        // check same container
        if ($containerBase !== $container){
          return true;
        }

        // check same map
        if (mapElement !== getMapElement()){
          return true;
        }

        // same agencies
        if (this.agenciesIsChanged() === true){
          return true;
        }

        // no need
        // var ids = [];
        // $currentAgencies.each(function () {
        //   var $agency = $(this);
        //
        //   var agency = options.DEFINE_AGENCY_WITH_AGENCY($agency, options);
        //   ids.push(agency.id);
        // });
        //
        // // check ids
        // if(agencies.sameIds(ids) === false) {
        //   return true;
        // }

        return false;
      },
      agenciesChanged: function(){
        initAgencies();
        initMap();
      },
      agenciesIsChanged: function(){
        var $currentAgencies = getAgencies();
        var sameAgenciesElements = true;

        $currentAgencies.each(function(i){
          if (this !== $agencies[i]){
            sameAgenciesElements = false;
            return false;
          }
        });

        // same agencies
        return sameAgenciesElements !== true;
      }
    };
  };

})(jQuery, listManagerFactory);

$(function(){
  var $controls = $('.js-FindAgency-Control');
  var $submit = $('.js-FindAgency-Submit');

  if ($controls.length > 0 && $submit.length > 0){

    // Default status : Submit disabled
    $submit.attr('disabled', true);


    $controls.on('keyup change', function(){
      var filled = false;

      $controls.each(function(){
        var $this = $(this);
        if ($this.val() && $this.val() !== ''){
          filled = true;
        }
      });

      if (!filled){
        $submit.attr('disabled', true);
      } else {
        $submit.attr('disabled', false);
      }
    });

    return true;
  } else {
    return false;
  }
});

$(function(){


	var regex_agence = /(agence)\/.*\.html|\.html/;
	var stl_replacement = "$1/jcr:content.localisation-agences.html";
	
	/**
	 * Vide toutes les informations de geoloc dans la session
	 */
	var clearSessionGeolocData = function(){

		var target = location.pathname.replace(regex_agence, stl_replacement);
		
		var data = {
            "storelocator_no_redirection": 1
        };

		 $.ajax({
		        url : target,
		        type : 'POST',
		        data: data,
		        dataType : 'json',
		        error : function() {
		            console.log('Erreur lors de la suppression des donnees de geoloc');
		        },
		        success : function(code_json) {
		            //RAS
		        }
		   });
	};


	/**
	 * Recharge la page en passant la latitude longitude en parametres POST
	 */
	var refreshWithLatLong = function(){
		NPC.geoloc.tryToGeoloc();
        var lat = NPC.geoloc.lat;
        var long = NPC.geoloc.long;

        if(lat === undefined && long === undefined) {
        	var target = location.pathname.replace(regex_agence, stl_replacement);
        	var $form = $(NPC.createHiddenFormCode(target, "post",  {
        	          "storelocator_locationagencies_latitude": lat, 
        	          "storelocator_locationagencies_longitude": long
            }));

        	$('body').append($form);
        	$form.submit();
        } else {
        	getPostalCode(lat, long, postDataByLocation);
        }
	};


  	function getPostalCode(lat, long, _callback){

    	const latlng = {
            lat: parseFloat(lat),
            lng: parseFloat(long),
        };
		var geocoder = new google.maps.Geocoder();
        try{
           geocoder.geocode({ location: latlng }).then((response) => {
              if (response.results[0]) {
				var cp = response.results[0].address_components.find(element => element.types.includes('postal_code')).long_name;
              } else {
                var cp = "";
              }
              _callback(lat, long, cp)
            })
            .catch((e) => console.error("API Geocoder indisponnible -" + e));
        }catch(ex){
            console.error("API google maps indisponnible -", ex.message);
        }
	}

    function postDataByLocation(lat, long, zipCode) {
        var target = location.pathname.replace(regex_agence, stl_replacement);
 		var $form = $(NPC.createHiddenFormCode(target, "post",  {
            "storelocator_locationagencies_latitude": lat,
            "storelocator_locationagencies_longitude": long,
            "storelocator_locationagencies_zipcode": zipCode
        }));
                
        $('body').append($form);
        $form.submit();
    }

	/**
	 * Recharge la page en récupérant l'addresse et la ville depuis la page et en les envoyant en POST
	 */
	var refreshWithAddress = function(address, city){


		var address = $(address).val();
        var zipcode = $(city + ' option:selected').val();
        var cityName = $(city + ' option:selected').text();

        if(zipcode && cityName){
			 var params = {
			    "storelocator_locationagencies_cityname": cityName,
                "storelocator_locationagencies_zipcode": zipcode
        	}
             postData(params);
        } else {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status === 'OK') {
                    if(results[0].address_components.find(element => element.types.includes('postal_code'))) {
                         var params = {
                            "storelocator_locationagencies_address": address,
                            "storelocator_locationagencies_zipcode": results[0].address_components.find(element => element.types.includes('postal_code')).long_name
                        }
						postData(params);
                    } else {
						var long = results[0].geometry.location.lng();
                        var lat = results[0].geometry.location.lat();   
                        getPostalCode(lat,long,postDataByLocation);
                    }
                } else {
                	var params = {
                             "storelocator_locationagencies_address": address
                    }
					postData(params);
                }
            });
        }
	};

    function postData(params){
        var target = location.pathname.replace(regex_agence, stl_replacement);
        var $form = $(NPC.createHiddenFormCode(target, "post",  params));

	    $('body').append($form);
	    $form.submit();
    }


	//On vide la session lorsque la geoloc est refusee
	if(NPC.storeLocator.enableCleanGeoLoc != undefined && NPC.storeLocator.enableCleanGeoLoc) {
		NPC.geoloc.addCallBackFnc(null, clearSessionGeolocData);
	}

	//Demande la geolocalisation et appelle "refreshWithGeoloc" si ok
	if (NPC && NPC.t034 && NPC.t034.refreshWithLatLong){
		NPC.geoloc.addCallBackFnc(refreshWithLatLong);
	}
	NPC.geoloc.tryToGeoloc();

	$('.FindAgency .searchByAddress').on('click touchstart', function() {
		refreshWithAddress('#address', '#city');
	});

	$('.FindAgency .searchByLocation').on('click touchstart', function() {
		refreshWithLatLong();
	});

	$('.StoreLocatorFinder .searchByAddress').on('click touchstart', function() {
		refreshWithAddress('#address', '#city');
	});

	$('.StoreLocatorFinder .searchByLocation').on('click touchstart', function() {
		refreshWithLatLong();
	});

	$('.FilterModal-Search .m-searchByAddress').on('click touchstart', function() {
		refreshWithAddress('#m-address', '#m-city');
	});

	$('.FilterModal-Search .m-searchByLocation').on('click touchstart', function() {
		refreshWithLatLong();
	});

});
$(function(){
  $('.js-FindAgency-flexAlign').matchHeight();

  enquire.register(CommonNPC.medias.mqXsMax, {
    match: function(){
      $('.js-StoreLocator-tabs')
        .addClass('tab-content')
        .children('.tab-pane')
        .addClass('fade')
      ;

      $('.StoreLocator-filtersNavTabs')
        .on('show.bs.tab.StoreLocator', function(e){
          $(this)
            .find('.StoreLocator-filtersNavTab--active')
            .removeClass('StoreLocator-filtersNavTab--active')
          ;
          $(e.target)
            .closest('.StoreLocator-filtersNavTab')
            .addClass('StoreLocator-filtersNavTab--active')
          ;
        })
        .each(function(){
          $(this)
            .find('[data-toggle="tab"]')
            .eq(0)
            .tab('show')
          ;
        })
      ;
    },
    unmatch: function(){
      $('.js-StoreLocator-tabs')
        .removeClass('tab-content')
        .children('.tab-pane')
        .removeClass('fade in')
      ;
      $('.StoreLocator-filtersNavTabs')
        .off('show.bs.tab.StoreLocator')
      ;
    }
  });

});

// keep public and specific for filters even if they have the same value for the pin
window.StoreLocatorFactoryOptions = {
	    ICONS: {
	      public: '/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin.png',
	      specific: '/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin.png',
	      green_point: '/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin2.png',
	      square: '/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin3.png',
	      dab: '/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin4.png',
		  chalus: '/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin-chalus.png',
	      e_agence: '/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin6.png'
	    }
};					 

var NPC = NPC || {};

(function($) {
    "use strict";

    NPC.formTrouverAgence = NPC.formTrouverAgence || (function (){

    	var me = {};
        me.countDesk = 0;
        me.countMobile = 0;

    	/**
    	 * Clear address and city inputs
    	 * 
    	 * @return void
    	 */
    	me.clearAddress = function(){
            if (me.countDesk == 0) {
                var $desk = $('#address').val('');
            } else {
                me.countDesk = 0;
            }
    	};
    	me.clearAddressMobile = function(){
            if (me.countMobile == 0) {
                var $mobile = $('#m-address').val('');
            } else {
                me.countMobile = 0;
            }
    	};

    	/**
    	 * Clear address and city inputs
    	 * 
    	 * @return void
    	 */
    	me.clearCity = function(){
    		if (me.countDesk == 0) {
                var $desk = $('#city').val('');
                $desk.prop('selected', true);
                $desk.parent().find('li.selected').removeClass('selected')
                me.countDesk++;
            	$desk.trigger('change');
            } else {
                me.clearAddress();
            }
    	};
    	me.clearCityMobile = function(){
    		if (me.countMobile == 0) {
    			var $mobile = $('#m-city').val('');
                $desk.parent().find('li.selected').removeClass('selected')
                me.countMobile++;
            	$mobile.trigger('change');
            } else {
                me.clearAddress();
            }
    	};

    	return me;
    })();
})($);
(function($, mapManagerFactory){

  /* document ready */
  $(window).on('google.maps.api.loaded', function(){
    if (!mapManagerFactory){
      console.warn('error while loading store map module');
      return false;
    }

    /**
     * All map blocs
     *
     * use data-store-map-param='{"DEFAULT_FILTERS": {...}, ...}' for set custom params
     */
    $('.js-StoreLocator-bloc').each(function(){

      var $StoreLocatorBloc = $(this);
      var mapManager = mapManagerFactory(
        $StoreLocatorBloc,
        $StoreLocatorBloc.data('store-map-param') || {}
      );

      /* Bind after ajax or DOM change for all map */
      /* Please use ' $(window).trigger("storemap.init"); ' */
      $(window).on('storemap.init', function(){
        if (mapManager.requireInit() === true){
          console.log('storemap.init', mapManager);
          mapManager.initialize($StoreLocatorBloc);
        }
      });

      /* Bind after ajax or DOM change for agencies */
      /* Please use ' $(window).trigger("storemap.agenciesChanged"); ' */
      $(window).on('storemap.agenciesChanged', function(){
        if (mapManager.agenciesIsChanged() === true){
          console.log('storemap.agenciesChanged', mapManager);
          mapManager.agenciesChanged($StoreLocatorBloc);
        }
      });

      /* Bind if all maps need filter reset */
      /* Please use ' $(window).trigger("storemap.resetFilters"); ' */
      $(window).on('storemap.resetFilters', function(){
        mapManager.resetFilters();
      });
    });
  });
})(jQuery, mapManagerFactory);

/**
 * Bouton vert - Etape 1
 * Initialisation de la modale
 */

$(function(){
    // Initalisation des variables BV (avant modale)
    NPC.BV                      = {};
    NPC.BV._BV_MODAL            = 'ContainerBvModal';
    NPC.BV._BV_MODAL_JS         = NPC.BV._BV_MODAL + '--js';                //(.js-ContainerBvModal)
    NPC.BV._BV_MODAL_HIDDEN     = NPC.BV._BV_MODAL + '--hidden';            //HIDDEN_MODAL_CLASS
    NPC.BV._BV_WRAPPER          = NPC.BV._BV_MODAL + '--wrapper';
    NPC.BV._BV_MODAL_CONTENT    = NPC.BV._BV_MODAL + '--content'; 
    NPC.BV._BV_TEMATIC_SELCT    = 'selectMotifBV'
    NPC.BV._BV_CAPTCHA          = 'CaptchaBoutonVert';
    NPC.BV._BV_FORMID           = 'bv-form';
    NPC.BV.INPUTS               = {
                                    trouverAgenceByAdresse : 'trouverAgenceByAdresse'
                                  }
    NPC.BV.STORELOC_GEOLOC      = false;
    NPC.BV.STORELOC_INPUT       = '';
    NPC.BV.STORELOC_MAP         = false;
    NPC.BV.isBoutonVertOpen     = false;                                    //bvOpened
    NPC.BV.$_BV_WRAPPER         = $('.' + NPC.BV._BV_WRAPPER);       //$containerBase (.bouton-vertWrapper)
    NPC.BV.$_BV_MODAL_CONTENT   = $('.' + NPC.BV._BV_MODAL_CONTENT); //$bvContent (.js-GreenBtnContainer)
    NPC.BV.$_BV_PANEL           = $('#' + NPC.BV._BV_MODAL + '--panel');
    NPC.BV._HISTORY             = []; 
    NPC.BV.FUNCTIONS            = {};
    NPC.BV.PANEL_DATA           = {};
    NPC.BV._BV_ARCEP            = {
                                    "0" : "",
                                    "1" : "npc-num-tel-arcep--greenDegraded",
                                    "2" : "npc-num-tel-arcep--grayDegraded",
                                    "3" : "npc-num-tel-arcep--purpleDegraded"
                                  };
    NPC.BV.CURRENT_PARCOUR      = {};
    NPC.BV._BV_CARDS_STATUS		  = {};
    NPC.BV._BV_THEME            = {};                                                             

    // Initialisation des variables communes
    const BV_COMMON_BODY_OVERFLOW      = 'is-overflowHidden';      //BODY_REMOVE_OVERFLOW_CLASS
    const BV_COMMON_TRUE_POPIN_MEDIA   = CommonNPC.medias.mqSmMax; //TRUE_POPIN_MEDIA

    // Initialisation des variables de fonctionnement
    const bvModalClasses = [
        NPC.BV._BV_MODAL,
        NPC.BV._BV_MODAL_JS,
        NPC.BV._BV_MODAL_HIDDEN
    ]
    const bvModalHTML     = '<div class="' + bvModalClasses.join(' ') + '"/>';  //ContainerBvModalHtml
    var $containerBvModal = $(bvModalHTML).appendTo('body');  // Popin for BV   //ContainerBvModal
    var $containerBvZDG   = $('.bvContainer');                // ZDG for BV     //ContainerBvZDG
    const isZDG5050       = $containerBvZDG.closest('.col-md-4').length === 0;

    // Initalisation des variables BV (aprés modale)
    NPC.BV.$_BV_MODAL_JS      = $('.' + NPC.BV._BV_MODAL + '--js');// (.js-ContainerBvModal)


    /**
     * Factory Bouton Vert Zone de gauche
     * @returns Object BvZDGFactory
     *  - init: Set listener 'open.bv.zdg' et 'close.bv.zdg' puis ouvre ou ferme la popin
     *  - destroy: Unset listener 'open.bv.zdg' et 'close.bv.zdg'
     *  - close: ferme la popin
     *  - open: ouvre la popin et scroll en haut de la page
     */
    function layerBvZDGFactory(){
        var open = function(){
            CommonNPC.scrollTo(0);
            $containerBvZDG.prepend(NPC.BV.$_BV_MODAL_CONTENT);
        };

        var close = function(){
            NPC.BV.$_BV_WRAPPER.append(NPC.BV.$_BV_MODAL_CONTENT);
        };

        return {
            init: function(){
                $(window)
                    .off('open.bv.zdg')
                    .on('open.bv.zdg', open)
                    .off('close.bv.zdg')
                    .on('close.bv.zdg', close)
                ;
    
                if (NPC.BV.isBoutonVertOpen === true){
                    open();
                } else {
                    close();
                }
            },
            destroy: function(){
                $(window)
                    .off('open.bv.zdg')
                    .off('close.bv.zdg')
                ;
            },
            close: close,
            open: open
        };
    };

    /**
     * Factory Bouton Vert Modale
     * @returns Object BvModaleFactory
     *  - init: Set listener
     *  - destroy: Unset listener
     */
     function layerBvModalFactory(layerBvZDG){
        const $bodyHtml = $('body,html');

        /** 
         * Set de l'affichage en mode mobile 
         */ 
        const overlayMobile = {
            match: function(){
                $(window)
                    .off('open.bv.mobile.popin')
                    .on('open.bv.mobile.popin', function(){
                        $bodyHtml.addClass(BV_COMMON_BODY_OVERFLOW);
                    })
                    .off('close.bv.mobile.popin')
                    .on('close.bv.mobile.popin', function(){
                        $bodyHtml.removeClass(BV_COMMON_BODY_OVERFLOW);
                    })
                ;
        
                if (NPC.BV.isBoutonVertOpen){
                    $bodyHtml.addClass(BV_COMMON_BODY_OVERFLOW);
                }
            },
            unmatch: function(){
                if (NPC.BV.isBoutonVertOpen && !window.matchMedia(BV_COMMON_TRUE_POPIN_MEDIA).matches){
                    CommonNPC.scrollTo(0);
                    $bodyHtml.removeClass(BV_COMMON_BODY_OVERFLOW);
                }
            }
        };
    
        /**
         * Set de la hauteur du bouton vert
         */
        const setHeights = function(){
          var headerHeight;
          const windowHeight = $(window.top).height();

            if (window.matchMedia(BV_COMMON_TRUE_POPIN_MEDIA).matches){
                // Calcul de la hauteur du header en fonction de ce qui est visible
                var $header = $('.js-Header, .js-HeaderSticky').filter(':visible');
                headerHeight = $header.outerHeight(true) - $header.outerHeight();
    
                $containerBvModal.css({
                    top: '',
                    marginTop: headerHeight,
                    minHeight: '',
                    height: windowHeight - headerHeight
                });
            } else {
                headerHeight = $('.Template')?.offset()?.top;
    
                $containerBvModal.css({
                    top: headerHeight,
                    marginTop: '',
                    minHeight: windowHeight - headerHeight,
                    height: ''
                });
            }
        };
    

        const centerItems = function(){
          function getElementHeight(element){
            if (element){
              return element.outerHeight();
            }
          }
    
          function centerElem(element, delta, contentHeight){
            if (delta > 0 && contentHeight !== 0){
              element.addClass('centerElm');
            } else {
              element.removeClass('centerElm');
            }
          }
    
          // Nettoyage des classe ce centrage ('.centerElm')
          var centerElm = $('.centerElm');
          if (centerElm){
            centerElm.each(function(){
              $(this).removeClass('centerElm');
            });
          }
       
          // Création des variables de travail
          var $header = $('.GreenBtn-header');
          var $headerWCB = $('.GreenBtn-callbackHomeHeader');
          var $ContainerBvLayerWCB = $('.GreenBtn-callbackHome');
          var $ContainerBvLayerWCBContent = $('.GreenBtn-callbackHomeContent');
          var $ContainerBvLayer = $('.GreenBtn');
          var $ContainerBvLayerContent = $('.GreenBtn-content');
    
          var heightheader = getElementHeight($header);
          var heightheaderWCB = getElementHeight($headerWCB);
          var heightContainerBvLayerWCB = getElementHeight($ContainerBvLayerWCB);
          var heightContainerBvLayerWCBContent = getElementHeight($ContainerBvLayerWCBContent);
          var heightContainerBvLayer = getElementHeight($ContainerBvLayer);
          var heightContainerBvLayerContent = getElementHeight($ContainerBvLayerContent);
        
          // Calcul des deltas
          if ($headerWCB && $ContainerBvLayerWCB && $ContainerBvLayerWCBContent){
            var DeltaWCB = heightContainerBvLayerWCB
              - heightContainerBvLayerWCBContent - heightheaderWCB;
          }
    
          if ($header && $ContainerBvLayer && $ContainerBvLayerContent){
            var DeltaLayer = heightContainerBvLayer
              - heightContainerBvLayerContent - heightheader;
          }
    
          // Centrage des éléments si nécessaire
          centerElem($ContainerBvLayerWCB, DeltaWCB, heightContainerBvLayerWCBContent);
          centerElem($ContainerBvLayer, DeltaLayer, heightContainerBvLayerContent);
    
        };
    
    
        return {
          init: function(){
            layerBvZDG.destroy();
    
            var openPopinBV = function(){
              CommonNPC.scrollTo(0);
              $containerBvModal.removeClass(NPC.BV._BV_MODAL_HIDDEN );
            };
    
            var closePopinBV = function(){
              $containerBvModal.addClass(NPC.BV._BV_MODAL_HIDDEN );
            };
    
            $(window)
              .off('open.bv.popin')
              .on('open.bv.popin', openPopinBV)
              .off('close.bv.popin')
              .on('close.bv.popin', closePopinBV)
              .off('layout.bv')
              .on('layout.bv', function(){
                var sAgent = window.navigator.userAgent;
                var Idx = sAgent.indexOf('MSIE');
    
                // Si IE, récupération du numéro de version
                if (Idx > 0){
                  centerItems();
    
                  // Si IE 11 mise à jour de l'user Agent
                } else if (!!navigator.userAgent.match(/Trident\/7\./)){
                  centerItems();
                }
              });
    
            $containerBvModal.toggleClass(NPC.BV._BV_MODAL_HIDDEN , NPC.BV.isBoutonVertOpen === false);
    
            // Déplacement du bouton vert dans la Popin
            $containerBvModal.append(NPC.BV.$_BV_MODAL_CONTENT);
    
            $(window)
              .off('load.ContainerBvOnFullPage')
              .on('load.ContainerBvOnFullPage', setHeights)
              .off('header.heightChanged.ContainerBvOnFullPage')
              .on('header.heightChanged.ContainerBvOnFullPage', setHeights)
              .off('marginChanged.template.ContainerBvOnFullPage')
              .on('marginChanged.template.ContainerBvOnFullPage', setHeights)
              .off('debounced-resize.ContainerBvOnFullPage')
              .on('debounced-resize.ContainerBvOnFullPage', setHeights)
            ;
    
            enquire.register(BV_COMMON_TRUE_POPIN_MEDIA, overlayMobile);
    
            setHeights();
          },
          destroy: function(){
            enquire.unregister(BV_COMMON_TRUE_POPIN_MEDIA, overlayMobile);
    
            $containerBvModal.css({
              top: '',
              height: ''
            });
    
            $(window)
              .off('load.ContainerBvOnFullPage')
              .off('header.heightChanged.ContainerBvOnFullPage')
              .off('marginChanged.template.ContainerBvOnFullPage')
              .off('debounced-resize.ContainerBvOnFullPage')
            ;

            setHeights();
    
            // Déplacement du bouton vert dans la zdg
            layerBvZDG.init();
    
            $(window)
              .off('open.bv.popin')
              .off('close.bv.popin')
            ;
          }
        };
      };


    /**
     * Fonction d'initialisation du bouton vert
     */
    function InitBV(){

        // Initialisation des fonctions d'ouverture et de fermeture
        var openBV = function(){
            NPC.BV.isBoutonVertOpen = true;
        };
        var closeBV = function(){
            NPC.BV.isBoutonVertOpen = false;
        };

        // Initialisation des factory BV
        const layerBvZDG    = layerBvZDGFactory();
        const layerBvModal  = layerBvModalFactory(layerBvZDG);

        //Action par default
        $(window)
            .off('open.bv.init')
            .on('open.bv.init', openBV)
            .off('close.bv.init')
            .on('close.bv.init', closeBV)
        ;
    
        if ($containerBvZDG.length === 0 || isZDG5050 === false){
        
            // Toujours popin
            layerBvModal.init();
        } else {
            layerBvZDG.init();
        
            // Popin en smMax
            enquire.register(BV_COMMON_TRUE_POPIN_MEDIA, {
                match: layerBvModal.init,
                unmatch: layerBvModal.destroy
            });
        }
        
        // Ajout du background modale grizé sauf footer et header
        NPC.BV.$_BV_MODAL_JS.prepend('<div class="greenBtnModalBackgoundLock"></div>');
    }

    // Methodes à jouer à l'ouverture de la page
    InitBV();
    initBvDisplay();
    initOpenCloseBV();
    initBvStoreLocator();
    initBvRestitAgence(NPC);
    initBvFormFunction();

    initPanelLoader();

    $document.ready(function() {
      NPC.BV.FUNCTIONS.OPENCLOSE.onReady();
    });
});
function initBvDisplay() {

	NPC.layoutTriggerd = false;
	NPC.boutonVert = NPC.boutonVert || {};

	var boutonVerWrapperSelector = NPC.BV.$_BV_WRAPPER;
	var arrayOuvertureCanaux = [];
	var bubblesSelector = $(".GreenBtn-callbackHomeContentBubbleLink");
	/**********************************************/
	/*********** MANAGE BLOC VARIABLES ************/
	/**********************************************/

	var numeroConseillerLienSelector = $("#numeroConseillerLien");
	var numeroAgenceLienSelector = $("#numeroAgenceLien");

	var blockConseillerSelector = $("#blockConseiller");
	var blockAgenceSelector = $("#blockAgence");
	
	NPC.BV.FUNCTIONS.valueIsDefine = function(element){
		return (element != undefined && element != null && element != 'undefined');
	}

	/*
	 * Fonction à utilise rpour ajouter le transactionId aux requetes du BV
	 * afin de passer l'authent forte de certaines pages
	 */
	NPC.AddTransactionIdToUrl = function(url) {
		if ( NPC.checkMemeOrigin(url)) {
        	var transactionId = NPC.$_GET("transactionId");
        	if(transactionId !== undefined && transactionId != null && transactionId !== ''){
        		if(url.indexOf("?") > -1) {
        			url =  url+ "&transactionId=" + transactionId;
        		} else {
        			url =  url+ "?transactionId=" + transactionId;
        		}
        	}
        }
		return url;
	};
	/****************/
	// alimentation de la valeur du href de la FAQ dans le lien  Foire aux questions
	$("#lienFaq").attr("href", NPC.recupererUrlFaq);
	/*********************************************/


	// ------ [Récuperation des données GPU (requettes AJAX)] ------
	/**
	 * Méthode privée
	 * Methode de récupération des dates pour le BV requette ajax syncrone
	 * @param {string} url 
	 * @param {json} postParam 
	 */
	function getTimeInfoFunc(url,postParam){
		$.ajax({
			type : 'POST',
			url : url,
			data : postParam,
			cache : true,
			async: false,
			success : function(data) {
	
				const dateCR = data;

				if (NPC.BV.FUNCTIONS.valueIsDefine(dateCR)) {
					var dayDateData = dateCR.dateDuJour;
					var dayTimeData = dateCR.dayTime;
					var timezoneCaisse = _timeZoneCaisse(postParam.numeroCR) / 60000;  
					var timezoneDifference = ((timezoneCaisse/60) - (postParam.userTimeZoneOffset/60));
					if (NPC.BV.FUNCTIONS.valueIsDefine(dayDateData)) {
						var dayDateArray = dayDateData.split("-");
						NPC.BV.$_BV_WRAPPER.data('value').dayDate = new Date(dayDateArray[0], dayDateArray[1] - 1, dayDateArray[2]);
					}
					if (NPC.BV.FUNCTIONS.valueIsDefine(dayTimeData)) {
						NPC.BV.$_BV_WRAPPER.data('value').dayTime = dayTimeData;
					}
					if (NPC.BV.FUNCTIONS.valueIsDefine(timezoneDifference)) {
						NPC.BV.$_BV_WRAPPER.data('value').timezone_difference = timezoneDifference;
					}
				} 
	
			},
			fail : function(data) {
				NPC.BV.$_BV_WRAPPER.data('value').erreurTableStart = true;
				console.error("erreur d'appel Time");
			},
		});
	}

	/**
	 * Méthode privée
	 * Methode de récupération des data puc pour le BV requette ajax syncrone
	 * @param {string} url 
	 * @param {json} postParam 
	 */
	function getGpuInfoFunc(url,postParam){
		$.ajax({
			type : 'POST',
			url : url,
			data : postParam,
			cache : true,
			async: false,
			success : function(data) {
				NPC.BV.$_BV_WRAPPER.data('value').erreurGpu = false;
				NPC.BV.$_BV_WRAPPER.data('value').gpuData = data;	
			},
			error : function(data) {
				NPC.BV.$_BV_WRAPPER.data('value').erreurGpu = true;	
				NPC.BV.FUNCTIONS.loadErrorPanel();
			},
		});
	}

	/**
	 * Méthode privée
	 * Methode de récupération des datas AEM pour le BV requette ajax syncrone
	 * @param {string} url 
	 * @param {json} postParam 
	 */
	function getStartInfoFunc(url,postParam){
		$.ajax({
			type : 'POST',
			url : url,
			data : postParam,
			cache : true,
			async: false,
			success : function(data) {
				const startInfo = data;
				if (NPC.BV.FUNCTIONS.valueIsDefine(startInfo)) {
					var startDataInf = startInfo.idsParametrageAem;
					var startDataOpt = startInfo.blocsParcoursOptionnel;
					
					if(startDataInf == undefined && startDataOpt == undefined){
						NPC.BV.$_BV_WRAPPER.data('value').erreurTableStart = true;
					}else{
						NPC.BV.$_BV_WRAPPER.data('value').startDataInf = startDataInf;
						NPC.BV.$_BV_WRAPPER.data('value').startDataOpt = startDataOpt;
					}
				}	
			},
			error : function(data) {
				NPC.BV.$_BV_WRAPPER.data('value').erreurTableStart = true;
				console.error("erreur d'appel Start");
			},
		});
	}

	/**
	 * Methode privée
	 * Affectation du bon décalage horaire en fonction de la caisse
	 * @param {*} numeroCR Id de la caisse
	 * @returns timestamp
	 */
	function _timeZoneCaisse(numeroCR){
		switch(numeroCR){
			case '900':
				return NPC.offsetGuadeloupe;
			case '902':
				return NPC.offsetMartinique;
			case '903':
				return NPC.offsetReunion;
			default :
				return NPC.offsetParis;
		}		
	}


	/**
 	  * Methode publique
	  * Méthode d'initialisation des données du BV
 	  */
	NPC.BV.FUNCTIONS.InitBvData = function(){

		//Initialisation des urls
		const urlGpuInfo 	= NPC.genererURLJson('get-info-gpu');
		const urlFoncInfo 	= NPC.genererURLJson('get-info-date');
		const urlStartInfo 	= NPC.genererURLJson('get-info-start');

		//Initialisation des données 
		var modelData 			= NPC.BV.$_BV_WRAPPER.data('value').modelData;
		var isConnected 		= (NPC != undefined && NPC.user?.isConnected != undefined) ? NPC.user.isConnected : false;
		var numeroCR 			= NPC.idLiveCopyCaisse;
		var userTimeZoneOffset 	= - (new Date().getTimezoneOffset());
      	var marcheCourant 		= (NPC.BV.FUNCTIONS.valueIsDefine(modelData) && modelData.idMarche != -1) ? modelData.idMarche : null;
		var postParamsFonc = {
			"numeroCR" : numeroCR,
			"userTimeZoneOffset" : userTimeZoneOffset
		};
		getTimeInfoFunc(NPC.AddTransactionIdToUrl(urlFoncInfo), postParamsFonc);

		if (NPC.BV.FUNCTIONS.valueIsDefine(modelData)) {
			var numeroCRSansCR = (numeroCR != "national" && numeroCR != "master") ? numeroCR.substring(2) : numeroCR;
			var ListeMotifArboRecup = NPC.BV.$_BV_WRAPPER.data('value').idMotif;
			var listMotifString = (ListeMotifArboRecup != null) ? ListeMotifArboRecup.toString() : "";

			var postParamsGpu = {
				"numeroCR" : numeroCRSansCR,
				"MODE_CLIENT" : isConnected,
				"idMarche" : modelData.idMarche,
				"listMotifArboresence" : listMotifString
			};
			getGpuInfoFunc(NPC.AddTransactionIdToUrl(urlGpuInfo), postParamsGpu);
		}

		var postParamsStart = {
			"numeroCR" : numeroCR,
			"marche" : marcheCourant,
		};
		getStartInfoFunc(NPC.AddTransactionIdToUrl(urlStartInfo), postParamsStart);
		
		// verifier la disponibilité du conseiller 
		let displayBlocConseiller = NPC.BV.$_BV_WRAPPER.data('value').startDataOpt[7] != null ? NPC.BV.$_BV_WRAPPER.data('value').startDataOpt[7] : false;
		var conseillerInfo = NPC.BV.$_BV_WRAPPER.data('value').conseiller;
		if (conseillerInfo != undefined && conseillerInfo != "" && (conseillerInfo.firstName != null || conseillerInfo.lastName != null) && displayBlocConseiller) {
			NPC.BV.$_BV_WRAPPER.data('value').conseillerDispo = true;
		}
	}
	// ------ [FIN Récuperation des données GPU (requettes AJAX)] ------



	/**
	 * Méthode privée
	 * Récuperation et afectation du motif séléctioné
	 * @returns Json du motif séléctioné {id:..., label:...}
	 */
	function getDefaultMotif() {
		var motifSelected = NPC.BV._BV_THEME;
		var gpuData = NPC.BV.$_BV_WRAPPER.data('value').gpuData;

		if(!NPC.BV.FUNCTIONS.valueIsDefine(motifSelected) || !NPC.BV.FUNCTIONS.valueIsDefine(motifSelected.id)){
			var listObjetMotif = getThematicList(gpuData);
			var first =  [...listObjetMotif][0];
			motifSelected = {
				"id" : first[0],
				"label" : first[1]
			};
			NPC.BV._BV_THEME = motifSelected;
			NPC.BV.$_BV_WRAPPER.data('value').motifSelected = motifSelected;
			
		}
		return motifSelected;
	}

	/**
	 * Méthode publique
	 * Initalise les card de contact
	 */
	NPC.BV.FUNCTIONS.initCard = function(){
		var resultMotif = null;
		var gpuData = NPC.BV.$_BV_WRAPPER.data('value').gpuData;

		if (NPC.BV.FUNCTIONS.valueIsDefine(gpuData) && NPC.BV.FUNCTIONS.valueIsDefine(gpuData.listThemes)) {
			var motifSelected = getDefaultMotif();
			resultMotif = gpuData.listThemes.filter(theme => theme.themeId === parseInt(motifSelected.id))[0];
		}

		if (resultMotif != null && resultMotif.channelsList != null) {
			NPC.BV.FUNCTIONS.manageBubbles(resultMotif?.channelsList, null, true);
		}
	}

	/****************************************************/
	/*********** GESTION DES Listes Deroulantes Motif ***************/
	/****************************************************/

	/**
	 * Methode plublique
	 * Est utilisé pour set la valeurs séléctionné du select thematique/motif
	 * @param {*} element Objet JQUERY 
	 */
	NPC.BV.FUNCTIONS.selectThematicList = function(element){
		$('#' + NPC.BV._BV_TEMATIC_SELCT + ' option[selected="selected"]').attr('selected',false)
		var motifSelected = {
			"id" : element.value,
			"label" : $('option[value="' + element.value + '"]').text()
		};
		NPC.BV._BV_THEME = motifSelected;
		NPC.BV.$_BV_WRAPPER.data('value').motifSelected = motifSelected;
		$('#' + NPC.BV._BV_TEMATIC_SELCT + ' option[value="' + element.value + '"]').attr('selected',true);
		$(element).parent().find('.npc-bv-selected')[0].innerText = motifSelected.label;
		$(element).parent().find('ul li[select-value="' + motifSelected.id + '"]').addClass('active');
		$('#' + NPC.BV._BV_TEMATIC_SELCT).attr("data-tracking-oic_objet_demande", motifSelected.label.toUpperCase());
		$('#fermetureLayerBV').attr("data-tracking-oic_objet_demande", motifSelected.label.toUpperCase());
	}

	/**
	 * fonction privée
	 * Ordonancement de la liste récupéré dans GPU data
	 * @param {Json} gpuData Data du bouton vert
	 * @returns map de la liste des motifs/thématiques
	 */
	function getThematicList(gpuData){
		const themeParDefaut = gpuData.themeParDefaut;
		var listObjetMotif = new Map(Object.entries(gpuData.motifMapDeroulantes));
		if(NPC.BV.FUNCTIONS.valueIsDefine(themeParDefaut) && themeParDefaut.themeId != undefined){

			listObjetMotif.delete(themeParDefaut.themeId + '');

			const themeParDefautMap = new Map();
			themeParDefautMap.set(themeParDefaut.themeId + '', themeParDefaut.label)
			listObjetMotif = new Map([...themeParDefautMap].concat([...listObjetMotif]));
		}
		return listObjetMotif;
	}

	/**
	 * Methode publique
	 * Complete la liste des thematiques/motifs 
	 */
	NPC.BV.FUNCTIONS.initThematicList = function(){
		const gpuData = NPC.BV.$_BV_WRAPPER.data('value').gpuData;
		if (NPC.BV.FUNCTIONS.valueIsDefine(gpuData)) {
			var listObjetMotif = getThematicList(gpuData);
			var selectThematicListObject = $('#' + NPC.BV._BV_TEMATIC_SELCT);
			selectThematicListObject.find('option').remove();
			if(NPC.BV.FUNCTIONS.valueIsDefine(listObjetMotif)){
				listObjetMotif.forEach( (theme, key, map) => {
					selectThematicListObject.append('<option value="' + key + '">' + theme + '</option>');
					selectThematicListObject.parent().find('ul').append(`<li select-value="${key}" role="bouton" tabindex="-1">${theme}</li>`);
				});
				selectThematicListObject[0].value = "Comptes et Cartes";
			}

			setInitThematicSelect();
		}
	}

	/**
	 * Méthode privée
	 * Affectation du motif courant en fonction du cas
	 */
	function setInitThematicSelect(){
		var motifSelectionne = NPC.BV._BV_THEME;
		var selectThematicListObject = $('#' + NPC.BV._BV_TEMATIC_SELCT);

		if(NPC.BV.FUNCTIONS.valueIsDefine(motifSelectionne) && motifSelectionne.label != undefined){
			selectThematicListObject.value = motifSelectionne.id;
			NPC.BV.FUNCTIONS.selectThematicList(selectThematicListObject);
		}else{
			NPC.BV.FUNCTIONS.selectThematicList(selectThematicListObject);
		}
	}


	/**
	 * Affichage des infos en fonction du motif séléctionné
	 */
	NPC.BV.FUNCTIONS.setInfMotifSelected = function() {
		//permet de set les informations du motif selectionné
		let motidId = getDefaultMotif();
				
		var TableauDonneeStart = NPC.BV.$_BV_WRAPPER.data('value').startDataInf;
		// parcours du tableau
		if (TableauDonneeStart != undefined && TableauDonneeStart != null) {

			$(TableauDonneeStart).each(function(index, currentElement) {
				// si le motif courant du tableau correspond au motif selectionner dans la liste déroulante 
				if (currentElement != null && currentElement.codeMotif != null && currentElement.codeMotif == motidId.id) {

					if (currentElement.resultatListeGenerique != null && currentElement.resultatListeGenerique.indexOf(";") != -1) {

						var d = currentElement.resultatListeGenerique.trim().replace(/(\r|\n|&nbsp;)/gi,'');
						donneeStartInfAAfficher = d.split(";");
						NPC.BV.$_BV_WRAPPER.data('value').startDataInfMotifSelected = donneeStartInfAAfficher;

					}
					// si motif trouvé quitter ladonneeStartTrouvee = true;
					return false;
				}

			});

		}
	};

	/******************************************************************************/
	/********************* MANAGE CHANNELS ****************************************/
	/******************************************************************************/

	/**
	 * Fonction privée
	 * Afectation des dates exceptionnelle d'ouverture des caisses
	 * @param {*} exceptionalList 
	 * @param {*} dayDate 
	 * @param {*} dayTime 
	 * @returns 
	 */
	function checkInExceptional(exceptionalList, dayDate, dayTime) {
		var checkInExceptionalReturn = false;
		if (exceptionalList != null && exceptionalList.length > 0) {
			exceptionalList.forEach(function(currentExceptional) {

				currentExceptional = currentExceptional.split(" - ");
				var start = currentExceptional[0].replace("[", "").split(" ");
				var end = currentExceptional[1].replace("]", "").split(" ");
				var day = start[0].split("/");
				var startingTime = start[1];
				var endingTime = end[1];

				day = new Date(day[2], day[1] - 1, day[0]);
				var sameDay = NPC.BV.FUNCTIONS.isSameDay(day, dayDate);
		
				if (sameDay) {
					var timeLap = "[" + startingTime + " - " + endingTime + "]";
					var isIn = NPC.BV.FUNCTIONS.testTimeIn(timeLap, dayTime);
					if (isIn) {
						checkInExceptionalReturn = true;
						return true;
					}
					return false;
				}
			});
		}			
		return checkInExceptionalReturn;
	};

	NPC.BV.FUNCTIONS.checkInShedule = function(scheduleList, dayDate, dayTime) {
		var isIn = false; 
		if (scheduleList != null && scheduleList.length > 0) {
			 scheduleList.forEach(function(currentSchedule) {

				var currentScheduleDayDate = currentSchedule.date;
				var scheduleTimeLaps = currentSchedule.openning;
				// si la date schedule est renseignée et si ce n'est pas un jour ferié ou si les horaires d'ouvertures sont renseignés 
				if (currentScheduleDayDate != null && currentScheduleDayDate != undefined && currentSchedule.openning != null) {

					currentScheduleDayDate = currentScheduleDayDate.split("-");
					currentScheduleDayDate = new Date(currentScheduleDayDate[0], currentScheduleDayDate[1] - 1, currentScheduleDayDate[2]);

					var sameDay = NPC.BV.FUNCTIONS.isSameDay(currentScheduleDayDate, dayDate);

					// si la date du schedule correspond à la date du jour 
					if (sameDay) {
						// si ce n'est pas un jour ferié
						if (currentSchedule.holiday == false) {
							// comparer les heure et les minutes 

							if (scheduleTimeLaps.indexOf(",") == -1) {
								isIn = NPC.BV.FUNCTIONS.testTimeIn(scheduleTimeLaps, dayTime);
								// si l'heure actuelle est dans la plage d'horaire d'ouverture disableChannel = false sinon true
							} else {
								scheduleTimeLaps = scheduleTimeLaps.split(" , ");
								$(scheduleTimeLaps).each(function(index, currentLaps) {
									isIn = NPC.BV.FUNCTIONS.testTimeIn(currentLaps, dayTime);
								});
							}
						}
					}
				}
			});
		}
		return isIn; 
	}

	NPC.BV.FUNCTIONS.setDefaultCardStatus = function(){
		NPC.BV._BV_CARDS_STATUS = {
			"chat" : "hide",
			"chatMessage" : "",
			"rappel" : "hide",
			"rappelMessage" : "",
			"mail" : "hide",
			"mailMessage" : "",
			"rdv": "hide",
			"rdvMessage" : ""
		  };
	}

	NPC.BV.FUNCTIONS.manageBubbles = function(channelList, globalChannelsList, updateWcb) {
		/*
			Règles de gestion :

			Si un canal n’est pas disponible alors il n’apparaitra pas sur le layer.
				Condition : available = false

			Si un canal est disponible et ouvert, alors il sera visible en couleur sur le layer.
				Condition : available = true et T0 est inclus dans les valeurs de exceptional_opening.

			Si un canal est disponible mais fermé, alors il sera visible sur le layer mais sera grisé.
				Condition : available = true et T0 est inclus dans les valeurs de exceptional_closing

			Lorsque qu’un picto est grisé, c’est à dire que le canal n’est pas ouvert, 
			alors au clic sur ce picto, un message s’affiche au-dessus indiquant les horaires d’ouverture correspondant à ce canal. 
			Ce texte est codé en dur et variabilisé (dates et horaires fournis par GPU) dans le layer.

			Le wcb si disponible est toujours ouvert même en dehors des horaire d'ouverture, si ces derniers sont à null ou non existants il est grisé
		*/
		
		var dayDate = boutonVerWrapperSelector.data('value').dayDate;
		var dayTime = boutonVerWrapperSelector.data('value').dayTime;
		NPC.BV.FUNCTIONS.setDefaultCardStatus();

		var getChannelFromLabel = function(label) {
			var channel = [];
			if(NPC.BV.$_BV_WRAPPER.data('value')?.gpuData?.channelsListGlobal !== undefined){
				channel = NPC.BV.$_BV_WRAPPER.data('value').gpuData.channelsListGlobal.filter(channel => channel.label == label);
			}
			return channel; 
		}

		channelList.forEach(function(channel) {

			var channelId = channel.channelId;
			var alwaysOpen = channel.alwaysOpen;
			var scheduleList = channel.schedule;
			var exceptionalOpenning = getChannelFromLabel(channel.label)[0]?.exceptional0penning;
			var exceptionalClosing = getChannelFromLabel(channel.label)[0]?.exceptionalClosing;
			var availableChannel = channel.available;

			var isExOpen = checkInExceptional(exceptionalOpenning, dayDate, dayTime);
			var isExClose = checkInExceptional(exceptionalClosing, dayDate, dayTime);
			var isInShedule = NPC.BV.FUNCTIONS.checkInShedule(scheduleList, dayDate, dayTime);
			
			if(availableChannel) {
				if(alwaysOpen) {
					// Toujours ouvert
					NPC.BV.FUNCTIONS.setCardStatus(channelId, 'show');
				} else if(channelId === 2 && scheduleList !== null && scheduleList.length > 0) { // Cas particulier rappel wcb
					// dans le calendrier : afficher la card
					NPC.BV.FUNCTIONS.setCardStatus(channelId, 'show');
				} else {
					if(isInShedule) {
						if(isExClose) {
							// disponible avec fermeture exceptionnelle : griser la card
							NPC.BV.FUNCTIONS.setCardStatus(channelId, 'close');
							NPC.BV.FUNCTIONS.setMessageChannel(channelId, scheduleList);
						} else {
							// disponible sans fermeture exceptionnelle : afficher la card
							NPC.BV.FUNCTIONS.setCardStatus(channelId, 'show');
						}
					} else {
						if(isExOpen) {
							// indisponible avec ouverture exceptionnelle : afficher la card
							NPC.BV.FUNCTIONS.setCardStatus(channelId, 'show');
						} else {
							// indisponible sans ouverture exceptionnelle : masquer  la card
							NPC.BV.FUNCTIONS.setCardStatus(channelId, 'close');
							NPC.BV.FUNCTIONS.setMessageChannel(channelId, scheduleList);
						}
					}
				}
			}
        });
	};

	NPC.BV.FUNCTIONS.getFullMessageChannel = function(name, message) {
		return "Le service " + name + " est ouvert " + message + "<br><br>Vous pouvez nous contacter par un autre canal :";
	}

	NPC.BV.FUNCTIONS.setMessageChannel = function(channelId, scheduleList) {
		var arrayOuvertureCanal = [];
		arrayOuvertureCanal = NPC.BV.FUNCTIONS.fillArrayOuvertureCanal(arrayOuvertureCanal, scheduleList);
		messageOpenning = NPC.BV.FUNCTIONS.fillChannelOpenningMessage(arrayOuvertureCanal);

		switch (channelId) {
			case 1 :
				NPC.BV._BV_CARDS_STATUS.tchatMessage = NPC.BV.FUNCTIONS.getFullMessageChannel("Tchat", messageOpenning);
				break;
			case 2 :
				NPC.BV._BV_CARDS_STATUS.rappelMessage = NPC.BV.FUNCTIONS.getFullMessageChannel("Rappel", messageOpenning);
				break;
			case 4 :
				NPC.BV._BV_CARDS_STATUS.mailMessage = NPC.BV.FUNCTIONS.getFullMessageChannel("Mail", messageOpenning);
				break;
			case 5 :
				NPC.BV._BV_CARDS_STATUS.rdvMessage = NPC.BV.FUNCTIONS.getFullMessageChannel("Rdv", messageOpenning);
				break;
		}
	}

	NPC.BV.FUNCTIONS.setCardStatus = function(channel, status) {

		/*
		channel 1 = Chat
		channel 2 = Rappel (= WCB)
		channel 3 = Visio (non utilisé)
		channel 4 = Mail
		channel 5 = Rdv 
		channel 6 = Twitter (non utilisé)
		channel 7 = Messenger (non utilisé)

		status 'show' = afficher la card
		status 'hide' = masquer la card
		status 'close' = griser la card (fermeture)
		*/

		switch (channel) {
			case 1 :
				NPC.BV._BV_CARDS_STATUS.chat = status;
				break;					
			case 2 :
				NPC.BV._BV_CARDS_STATUS.rappel = status;
				break;
			case 4 :
				NPC.BV._BV_CARDS_STATUS.mail = status;
				break;
			case 5 :
				NPC.BV._BV_CARDS_STATUS.rdv = status;
				break;					
		}	
	}

	// compare two date to know if its the same day return true or false
	NPC.BV.FUNCTIONS.isSameDay = function(currentSechedulDate, currentDate) {
		if (currentSechedulDate != null && currentSechedulDate != undefined && currentDate != null && currentDate != undefined) {

			try {
				var currentDateMs = currentDate.getTime();
				var currentSechedulDateMs = currentSechedulDate.getTime();
				if (currentSechedulDateMs == currentDateMs) {
					return true;
				} else {
					return false;
				}
			} catch(err) {
				return false;
			}
			

		}
	}

	// retourn true si l'heure actuel est dans la plage des horaires d'ouverture de la banque 
	NPC.BV.FUNCTIONS.isTimeIn = function(scheduleTimeLaps, dayTime) {
		var isIn = false;
		if (scheduleTimeLaps != null && scheduleTimeLaps != undefined && dayTime != null && dayTime != undefined) {

			// parcourir les plages d ouvertures

			// si scheduleTimeLaps est un tableau de periode de temps
			if (Array.isArray(scheduleTimeLaps)) {

				$(scheduleTimeLaps).each(function(index, currentScheduleTimeLap) {

					isIn = NPC.BV.FUNCTIONS.testTimeIn(currentScheduleTimeLap, dayTime);

					if (isIn) {
						return false;
					}

				});
				// si scheduleTimeLaps est un string de periode de temps
			} else {
				isIn = NPC.BV.FUNCTIONS.testTimeIn(scheduleTimeLaps, dayTime);

			}
		}

		return isIn;

	};

	// permet de gerer les ajout dans arrayOuvertureCanaux
	NPC.BV.FUNCTIONS.addToArrayOuvertureCanaux = function(objetMessageCanal) {
		var objetPourComparer = {
			canalId : objetMessageCanal.canalId
		};
		var positionInArray = NPC.Utils.searchItemIndexByAttributes(arrayOuvertureCanaux, objetPourComparer, false);
		// si l'objet est deja present
		if (positionInArray > -1) {
			arrayOuvertureCanaux[positionInArray] = objetMessageCanal;
		} else {
			arrayOuvertureCanaux.push(objetMessageCanal);
		}

	}
	//permet de gerer la suppression dans arrayOuvertureCanaux
	NPC.BV.FUNCTIONS.removeFromArrayOuvertureCanaux = function(canalId) {
		var objetPourComparer = {
			canalId : canalId
		};
		var positionInArray = NPC.Utils.searchItemIndexByAttributes(arrayOuvertureCanaux, objetPourComparer, false);
		// si l'objet est deja present
		if (positionInArray > -1) {
			//le supprimer
			arrayOuvertureCanaux.splice(positionInArray, 1);
		}
	}
	NPC.BV.FUNCTIONS.formatChannelSchedule = function(schedule) {
		var scheduleOutput = null;
		if (schedule != undefined && schedule != null && schedule.length > 0) {
			var countTimeLaps = (schedule.match(/\[/g) || []).length;

			if (countTimeLaps > 0) {
				var scheduleTmp = schedule.replace(/\[/g, '').trim();
				scheduleOutput = scheduleTmp.split("]");
				scheduleOutput.splice(-1, 1);
			}
		}
		return scheduleOutput;

	}

	NPC.BV.FUNCTIONS.testTimeIn = function(timeLap, dayTime) {
		var isIn = false;
		var formatedOppening = NPC.BV.FUNCTIONS.formatChannelSchedule(timeLap);
		if (formatedOppening != undefined && formatedOppening != null) {
			// si les horaires d ouverture se compose dune plage de  2 parties ex: 8:00 - 12:00 14:00 18:00

			$(formatedOppening).each(function(index, currentSchedule) {
				isIn = NPC.BV.FUNCTIONS.scheduleIsIn(currentSchedule, dayTime);
				// si on est dans l'intervale horaire sortir de laboucle
				if (isIn) {
					return false;
				}
			});

		}

		return isIn;

	};

	NPC.BV.FUNCTIONS.scheduleIsIn = function(schedule, dayTime) {

		var isIn = false;
		var scheduleHourDebut;
		var scheduleHourFin;
		var scheduleMinDebut;
		var scheduleMinFin;

		var timeLap = NPC.BV.FUNCTIONS.getStartEndScheduleOpenning(schedule);

		// si la periode a traiter est sous le bon format 
		if (timeLap != null) {
			var scheduleDebut = timeLap[0].split(":");
			var scheduleFin = timeLap[1].split(":");
			dayTime = dayTime.split(":");
			var dayHour = dayTime[0];
			var dayMin = dayTime[1];
			scheduleHourDebut = scheduleDebut[0];
			scheduleMinDebut = scheduleDebut[1];
			scheduleHourDebut = scheduleHourDebut.replace("[", "");
			scheduleHourFin = scheduleFin[0];
			scheduleMinFin = scheduleFin[1];
			scheduleMinFin = scheduleMinFin.replace("]", "");
			// si l heure actuelle est superieur a l heure d ouvertur et inferieur a l heure de fermetur
			var isSupStartInfEndHour = (dayHour < scheduleHourFin && dayHour > scheduleHourDebut);
			// si l heure actuelle est egal a l'heure de fermeture et la min actuelle et inferieur a la min de fermeture
			var isEqualEndHourInfEndMin = (dayHour == scheduleHourFin && dayMin <= scheduleMinFin);
			// si l heure actuelle est egal a l'heure d ouverture et la min actuelle et superieure a la min d ouverture
			var isEqualStartHourSupStartMin = (dayHour == scheduleHourDebut && dayMin >= scheduleMinDebut);

			if (isSupStartInfEndHour || isEqualEndHourInfEndMin || isEqualStartHourSupStartMin) {

				isIn = true;

			}
		}

		return isIn;

	};

	NPC.BV.FUNCTIONS.manageBubblesMaster = function() {

		$("#caseOneLinkMail").hide();

		$("#caseOneLinkMeeting").hide();
		$(window).trigger("startBV.loaded");

	};

	NPC.BV.FUNCTIONS.fillArrayOuvertureCanal = function(arryOuvertureCanal, scheduleList) {
		if (scheduleList != null && scheduleList.length > 0) {

			$(scheduleList).each(function(index, currentSchedule) {

				if (currentSchedule.openning != null) {
					// objet contenant le label du jour et les ouvertures pour afficher le message d'ouverture du canal
					var elementOuvertureCanal = {
						label : currentSchedule.label,
						openning : currentSchedule.openning
					};
					arryOuvertureCanal.push(elementOuvertureCanal);
				}
			});
		}
		return arryOuvertureCanal;

	};
	// permet de remplir le message d'ouvertur d'un canal sil il est indisponnible
	NPC.BV.FUNCTIONS.fillChannelOpenningMessage = function(arryOuvertureCanal) {
		var message = "";
		if (arryOuvertureCanal.length > 0) {
			$(arryOuvertureCanal).each(function(index, currentElement) {
				var dayLabel = currentElement.label;
				var formatedOppening = NPC.BV.FUNCTIONS.formatChannelSchedule(currentElement.openning);
				if (formatedOppening != undefined && formatedOppening != null) {
					var arraySchedule = formatedOppening;
					if (arraySchedule.length == 1) {
						var openning = NPC.BV.FUNCTIONS.getStartEndScheduleOpenning(arraySchedule[0]);
						if (openning != null) {
							var messageOuvertureMatin = NPC.BV.FUNCTIONS.getChannelOpenningMessage(openning, dayLabel, true);
							message = message + messageOuvertureMatin;
							if (index != arryOuvertureCanal.length - 1) {
								message = message + ", ";
							}
						}
					} else if (arraySchedule.length == 2) {
						var openningMatin = NPC.BV.FUNCTIONS.getStartEndScheduleOpenning(arraySchedule[0]);
						var openningSoir = NPC.BV.FUNCTIONS.getStartEndScheduleOpenning(arraySchedule[1]);
						if (openningMatin != null) {
							var messageOuvertureMatin = NPC.BV.FUNCTIONS.getChannelOpenningMessage(openningMatin, dayLabel, true);
							message = message + messageOuvertureMatin;

						}
						if (openningSoir != null) {
							var messageOuvertureSoir = NPC.BV.FUNCTIONS.getChannelOpenningMessage(openningSoir, dayLabel, false);
							message = message + messageOuvertureSoir;
						}
						if ((openningMatin != null || openningSoir != null) && index != arryOuvertureCanal.length - 1) {
							message = message + ", ";
						}

					}

				}

			});
		}
		return message;
	};
	NPC.BV.FUNCTIONS.getChannelOpenningMessage = function(openning, dayLabel, morning) {
		var ouverture = openning[0].split(":");
		var fermeture = openning[1].split(":");
		var message = (morning) ? "le " + dayLabel + " de " + ouverture[0] + "h"+ ouverture[1] +" à " + fermeture[0] + "h"+fermeture[1] : " et de " + ouverture[0] + "h"+ ouverture[1] +" à " + fermeture[0] + "h"+fermeture[1];
		return message;

	};
	// permet de gerer le message concernant les horaires d ouverture de l agence dans le cas de client connecte
	NPC.BV.FUNCTIONS.gererMessageOuvertureAgenceConnecte = function(message) {
		var messageModifie = [];
		if (message != undefined && message != null) {

			if (message.indexOf(" | ") > -1) {
				message = message.split(" | ");

				for (var i = 0; i < message.length; i++) {
					if (message[i] != "") {
						message[i] = NPC.BV.FUNCTIONS.gererFormatHorairesAgenceCo(message[i]);
						messageModifie.push(message[i]);
					}

				}
			} else {
				if (message[i] != "") {
					message = NPC.BV.FUNCTIONS.gererFormatHorairesAgenceCo(message);
					messageModifie.push(message);
				}
			}
		}
		return messageModifie;
	};

	NPC.BV.FUNCTIONS.gererFormatHorairesAgenceCo = function(message) {
		message = message.replace(/:/g, "h");
		message = message.replace(/00/g, "");
		return message;
	};

	NPC.BV.FUNCTIONS.getStartEndScheduleOpenning = function(timeLaps) {

		// si la periode de temps est sous le format hh:mm - hh:mm
		if (timeLaps.indexOf(" - ") != -1) {
			timeLaps = timeLaps.replace("[", "");
			timeLaps = timeLaps.replace("]", "");
			timeLaps = timeLaps.split(" - ");
			// si la periode de temps est sous le format hh:mm-hh:mm  
		} else if (timeLaps.indexOf("-") != -1) {
			timeLaps = timeLaps.split("-");
		} else {
			timeLaps = null;
		}
		return timeLaps
	};

	NPC.BV.FUNCTIONS.addChannelErrorMessage = function(channelId, message) {
		var channelName = "";
		switch (channelId) {
			case "1" :
				channelName = "Tchat";
				break;
			case "2" :
				channelName = "Rappel";
				break;
			case "4" :
				channelName = "Mail";
				break;
			case "5" :
				channelName = "Rdv";
				break;
		}
		if (channelName != "") {
			message = "Le service " + channelName + " est ouvert " + message;

			if (message.indexOf("[") > -1) {
				message = message.replace(/\[/g, '');
			}
			$("#messageChannelAvailable").html(message);
			$("#messageChannelAvailable").next().html("Vous pouvez nous contacter par un autre canal :");
		}
	};

	NPC.BV.FUNCTIONS.deleteChannelErrorMessage = function(currentPageChannel) {
		$("#messageChannelAvailable").html("");
		$("#messageChannelAvailable").next().html("");
	};

	NPC.BV.FUNCTIONS.initDisplayHeaderConnecte = function() {
		var parametrage = NPC.BV.$_BV_WRAPPER.data('value');

		var isConnected = (NPC != undefined && NPC.user != undefined && NPC.user.isConnected != undefined) ? NPC.user.isConnected : false;
		//traitement du cas utilisateur connecte
		if (isConnected) {

			if (parametrage.conseillerDispo == false) {
				NPC.BV.FUNCTIONS.showBlockAgence();
				NPC.BV.FUNCTIONS.hideBlockConseiller();
				numeroAgenceLienSelector.hide();

			} else {
				NPC.BV.FUNCTIONS.showBlockConseiller();
				NPC.BV.FUNCTIONS.hideBlockAgence();
			}
		} 
	};

	NPC.BV.FUNCTIONS.hideBlockConseiller = function() {
		numeroConseillerLienSelector.hide();
		blockConseillerSelector.hide();

	};

	NPC.BV.FUNCTIONS.setMessageOuvertureAgenceConnecte = function() {
				
		// si utilisateur  connecté
		var isConnected = (NPC != undefined && NPC.user != undefined && NPC.user.isConnected != undefined) ? NPC.user.isConnected : false;
		var agence = NPC.BV.$_BV_WRAPPER.data('value').agence;

		if (agence != "undefined" && agence != null) { //gestion de l'erreur
			// gestion des horaires d ouverture des agence en mode co 
			if (isConnected) {

				var horaireOuvertures = NPC.BV.FUNCTIONS.gererMessageOuvertureAgenceConnecte(agence.messageHorairesBlocAdvisorConnecte);
				if (horaireOuvertures != undefined) {

					$(horaireOuvertures).each(function(index, currentElement) {
						var ligneOuverture = ".ouverturesAgenceCoL" + (index + 1);
						$(ligneOuverture).html(currentElement);
						$(ligneOuverture).show();
					});
				}

			}
		}

	};

	NPC.BV.FUNCTIONS.hideBlockAgence = function() {
		numeroAgenceLienSelector.hide();
		blockAgenceSelector.hide();
	};

	NPC.BV.FUNCTIONS.showBlockConseiller = function() {
		numeroConseillerLienSelector.show();
		blockConseillerSelector.show();
	};

	NPC.BV.FUNCTIONS.showBlockAgence = function() {
		numeroAgenceLienSelector.show();
		blockAgenceSelector.show();
	};

	// Events
	
	// Manage Bloc Event
	numeroConseillerLienSelector.click(function() {
		NPC.BV.FUNCTIONS.hideBlockConseiller();
		NPC.BV.FUNCTIONS.showBlockAgence();
	});

	numeroAgenceLienSelector.click(function() {
		NPC.BV.FUNCTIONS.hideBlockAgence();
		NPC.BV.FUNCTIONS.showBlockConseiller();
	});

	// affichage message de non disponnibilité de canaux
	bubblesSelector.click(function(event) {
		var channelId = $(this).data('bubblenumber');
		var channelIsFound = false;
		if (channelId != undefined && channelId.indexOf("bubble") > -1) {

			channelId = channelId.replace("bubble", "");
			$(arrayOuvertureCanaux).each(function(index, currentChannel) {
				if (channelId == currentChannel.canalId) {
					var message = currentChannel.message;
					// si on trouve un message d'indisponnibilite du canal
					channelIsFound = true;
					NPC.BV.FUNCTIONS.addChannelErrorMessage(channelId, message);
					event.preventDefault();
				}

			});

		}
		if (channelIsFound == false) {
			NPC.BV.FUNCTIONS.deleteChannelErrorMessage(channelId);
		}
	});	 
};

/**
 * Fonction qui contients les sous-fonction de récupération des données des panels du bouton vert
 */
function initBvStoreLocator() {
	$document = $(document);

	const index_infoTableau_phone = "0";
	const index_infoTableau_libelle = "1";
	const index_infoTableau_tarif = "2";
	const index_infoTableau_IDarcep = "3";
	const index_infoTableau_tarifArcep = "4";
	const index_infoTableau_horaire1 = "5";
	const index_infoTableau_horaire2 = "6";
	const index_infoTableau_horaire3 = "7";

	// ------ [Datas des panneaux du bouton vert] ------
	/**
	 * Verification de la valeur (vrai/faux) pour les bloc du panneau choix
	 * @param {Int} index ID de l'élémént dans le tableau
	 * @returns Retourne la classe hidden si le resultat est Null, Undefined ou Faux 
	 */
	function _checkIfTableValueVisible(index){
		var blocShowTableau = NPC.BV.$_BV_WRAPPER.data('value').startDataOpt;
		var result = (blocShowTableau != undefined && blocShowTableau[index]?.valeur) ? blocShowTableau[index].valeur : false;
		return result ? '' : 'hidden';
	}

	NPC.BV.PANEL_DATA.getDataNumAgenceNiv1 = function(){
		return {
			title : NPC.BV.CURRENT_PARCOUR.parcourTitle,
			showHideBlocStoreLocator : '',
			showHideBlocContactTel : 'hidden',
			showHideBlocContactForm : 'hidden',
			parcours : NPC.BV.CURRENT_PARCOUR.parcourName,
			itemTitlebloc : "Choisissez l'agence que vous souhaitez contacter"
		}
	}

	NPC.BV.PANEL_DATA.getDataEmailNiv1 = function(){
		return {
			title : NPC.BV.CURRENT_PARCOUR.parcourTitle,
			showHideStoreLocator : _checkIfTableValueVisible(4),
			showHideBlocContactTel : 'hidden',
			showHideBlocContactForm : _checkIfTableValueVisible(3),
			parcours : NPC.BV.CURRENT_PARCOUR.parcourName,
			itemTitlebloc : "Choisissez l'agence que vous souhaitez contacter",

			boutonParcours : 'sendEmail'
		}
	}

	NPC.BV.PANEL_DATA.getDataRdvNiv1 = function(){
		var blocInfoTableau = NPC.BV.$_BV_WRAPPER.data('value').startDataInfMotifSelected;
		var numberNotStartWithZero = blocInfoTableau[8] != undefined ? blocInfoTableau[8].substring(1, 14) : '';

		NPC.BV.FUNCTIONS.serviceArcep = {
			"0" : "",
			"1" : "Service & appel gratuits",
			"2" : "Service gratuit + prix appel",
			"3" : "Service <b>" + blocInfoTableau[11] + "</b> € / min + prix appel"
		};
		
		return {
			title : NPC.BV.CURRENT_PARCOUR.parcourTitle,
			showHideStoreLocator : _checkIfTableValueVisible(1),
			showHideBlocContactTel : _checkIfTableValueVisible(2),
			showHideBlocContactForm : _checkIfTableValueVisible(0),
			parcours : NPC.BV.CURRENT_PARCOUR.parcourName,
			itemTitlebloc : "Prendre rendez-vous en ligne",
			boutonParcours : 'rdv',
			sansArcep : (blocInfoTableau[10] != undefined && blocInfoTableau[10] === '0') ? '' : 'hidden',
			avecArcep : (blocInfoTableau[10] != undefined && blocInfoTableau[10] !== '0') ? '' : 'hidden',
			serviceArcep : NPC.BV.FUNCTIONS.serviceArcep[blocInfoTableau[10]],
			typeArcep : NPC.BV._BV_ARCEP[blocInfoTableau[10]],
			phoneNumber : blocInfoTableau[8],
			phoneNumberHref : "tel://+33" + numberNotStartWithZero,
			callPrice : blocInfoTableau[11],
			greyTitle : blocInfoTableau[9],
			hours1 : blocInfoTableau[12],
			hours2 : blocInfoTableau[13],
			hours3 : blocInfoTableau[14]
		}
	}

	NPC.BV.PANEL_DATA.getDataEmailRdvNiv3 = function(agence = false, visite = false, showHideDDN = true, showHidePhone = true){
		return {
			title : NPC.BV.CURRENT_PARCOUR.parcourTitle,
			qualifdemande : NPC.BV._BV_THEME.label,
			showHideAgence : agence ? '' : 'hidden',
			showHideVisite : visite ? '' : 'hidden',
			showHideDDN : showHideDDN ? '' : 'hidden',
			showHidePhone : showHidePhone ? '' : 'hidden',
			trackingClass :  NPC.BV.CURRENT_PARCOUR.parcourName === 'parcoursEmail' ? "oic_moyen_email_validation" : "oic_moyen_prise_de_rdv_validation"
		}
	}


	function getCardStatus(card) {
		switch(card){
			case 'show': return '';
			case 'hide': return 'hidden';
			case 'close': return 'npc-bv-cr-card--closed';
		}
	}
	
	NPC.BV.PANEL_DATA.getDataCaisse = function(){
		var blocInfoTableau = NPC.BV.$_BV_WRAPPER.data('value').startDataInfMotifSelected;
		var dataOpt = NPC.BV.$_BV_WRAPPER.data('value').startDataOpt;

		var numberNotStartWithZero = blocInfoTableau[index_infoTableau_phone] != undefined ? blocInfoTableau[index_infoTableau_phone].substring(1, 14): '';
		NPC.BV.FUNCTIONS.priceArcep = {
			"0" : "",
			"1" : "Service & appel gratuits",
			"2" : "Service gratuit + prix appel",
			"3" : "Service <b>" + blocInfoTableau[index_infoTableau_tarifArcep] + "</b> € / min + prix appel"

		};
		
		let displayTrouverUneAgence = dataOpt != null && dataOpt["5"] != null && dataOpt["5"].valeur ? '' : 'hidden';
		let displayFaireReclamation = dataOpt != null && dataOpt["6"] != null && dataOpt["6"].valeur ? '' : 'hidden';
		let displayBlocInfoAgence = '';
		if((NPC.user != null && NPC.user?.isConnected === true) || numberNotStartWithZero === '') {
			displayBlocInfoAgence = 'hidden';
		}

		if(displayBlocInfoAgence === ''){
			tC?.event?.pageVirtuelle(this,{
				evt_page_nom: 'oic_numero_generique', 
				evenement_categorie: 'Prise-de-contact', 
				evenement_oic_objet_demande : NPC.BV?._BV_THEME && Object.keys(NPC.BV?._BV_THEME).length > 0 ? NPC.BV._BV_THEME.label.toUpperCase() : null
			});
		}

		return {
			showHideCardRappel : getCardStatus(NPC.BV._BV_CARDS_STATUS?.rappel),
			showHideCardRdv : getCardStatus(NPC.BV._BV_CARDS_STATUS?.rdv),
			showHideCardMail : getCardStatus(NPC.BV._BV_CARDS_STATUS?.mail),
			showHideCardChat : getCardStatus(NPC.BV._BV_CARDS_STATUS?.chat),
			trackingClassRappel : 'oic_moyen_rappel',
			trackingClassRdv : 'oic_moyen_prise_de_rdv',
			trackingClassMail : 'oic_moyen_mail',
			trackingClassChat : 'oic_moyen_tchat',
			sansArcep : (blocInfoTableau[index_infoTableau_IDarcep] != undefined && blocInfoTableau[index_infoTableau_IDarcep] === '0') ? '' : 'hidden',
			avecArcep : (blocInfoTableau[index_infoTableau_IDarcep] != undefined && blocInfoTableau[index_infoTableau_IDarcep] !== '0') ? '' : 'hidden',
			serviceArcep : NPC.BV.FUNCTIONS.priceArcep[blocInfoTableau[index_infoTableau_IDarcep]],
			typeArcep : NPC.BV._BV_ARCEP[blocInfoTableau[index_infoTableau_IDarcep]],
			phoneNumber : blocInfoTableau[index_infoTableau_phone],
			phoneNumberHref : "tel://+33" + numberNotStartWithZero,
			callPrice : blocInfoTableau[index_infoTableau_tarif],
			title : blocInfoTableau[index_infoTableau_libelle],
			hours1 : blocInfoTableau[index_infoTableau_horaire1],
			hours2 : blocInfoTableau[index_infoTableau_horaire2],
			hours3 : blocInfoTableau[index_infoTableau_horaire3],

			displayBlocInfoAgence : displayBlocInfoAgence,
			displayTrouverUneAgence : displayTrouverUneAgence,
			displayFaireReclamation : displayFaireReclamation
		}
	}
	
	NPC.BV.PANEL_DATA.getDataFeedback = function(title = ''){
		return {
			title : NPC.BV.CURRENT_PARCOUR.parcourTitle,
			info : NPC.BV.CURRENT_PARCOUR.parcourName === 'parcoursEmail' ? "Votre message a bien été envoyé." : "Votre demande de rendez-vous a bien été envoyée."
		}
	}
	// ------ [FIN Datas des panneaux] ------


	// ------ [Ouvertutre du panneau Store Locator] ------
	/**
	 * Fonction pour completer automatiquement le champ adresse du bloc choix
	 */
	function initAutocompleteAdresse() {
		var autocompleteInput = document.getElementById(NPC.BV.INPUTS.trouverAgenceByAdresse);
		if (autocompleteInput) {
			new google.maps.places.Autocomplete(autocompleteInput, {
				types : [ 'geocode' ],
				componentRestrictions : {
					country : [ "fr", "re", "gp", "mq", "gf", "mc", "pm", "yt", "nc", "pf", "mf", "tf" ]
				}
			});
		}
	}

	/**
	 * Fonction qui initialise l'autocomplession si l'api de google maps est
	 * chargée ou qui attend la fin de son chargement  
	 */
	NPC.BV.FUNCTIONS.intialiserAutoCompletion = function(){
        if(NPC.isGoogleMapsApiLoaded){
           initAutocompleteAdresse();
        }else{
           $(window).on("google.maps.api.loaded", initAutocompleteAdresse);
        }
	}

	/**
	 * Methode pour masquer les message d'erreur du bloc agence proche de vous
	 */
	function hiddeErrorStorelocMessages(){
		$('#' + NPC.BV.INPUTS.trouverAgenceByAdresse).css('border-color', '#ccc');
        $('#emptyAdress').addClass('hidden');
        $('#errorAdress').addClass('hidden');
        $('#errorGeolocalisation').addClass('hidden');
        $('#noAgenceByGeolocalisation').addClass('hidden');
        $('#noAgenceByAdress').addClass('hidden');
	}

	/**
	 * Méthode pour afficher un message d'erreur du bloc agence proche de vous
	 * @param {*} errorId Id de l'erreur (#emptyAdress, #errorAdress, ...)
	 */
	function showrrorStorelocMessage( errorId ){
		$('#' + NPC.BV.INPUTS.trouverAgenceByAdresse).css('border-color', 'red');
		$(errorId).removeClass('hidden');
	}

	/**
	 * Méthode d'ouverture du store locator en mode Géolocalisation
	 */
	NPC.BV.FUNCTIONS.findAgenceAuto = function() {
		hiddeErrorStorelocMessages();
		NPC.BV.STORELOC_GEOLOC = true;
		NPC.BV.FUNCTIONS.trouverAgencesRun();
	}

	/**
	 * Méthode d'ouverture du store locator en mode saise d'une addresse
	 * @param {boolean} checkInput Permet de ne pas checker la valeur de l'input mais celle de l'historique (défault : Vrai) 
	 */
	NPC.BV.FUNCTIONS.findAgenceForm = function( checkInput = true ) {
		var runSearch = true;
		if(checkInput){
			hiddeErrorStorelocMessages();
			var regex = /^[a-zA-Z0-9-àéèùÀÉÈÙâêîôûÂÊÎÔÛäëïöüÿÄËÏÖÜçÇœŒ', ]+$/;
			var inputValue = $('#' + NPC.BV.INPUTS.trouverAgenceByAdresse)?.val()?.trim();

			if (inputValue === '') {	
				showrrorStorelocMessage('#emptyAdress');
				runSearch = false;
			}
			// Si l'input est NON ALPHANUMERIQUE - géré coté display pour
			// l'affichage du message d'erreur
			else if (!regex.test(inputValue)) {
				showrrorStorelocMessage('#errorAdress');
				runSearch = false;
			}
		}

		if(runSearch){
			NPC.BV.STORELOC_GEOLOC = false;
			NPC.BV.FUNCTIONS.trouverAgencesAddresseRun();
		}
	};

	/**
	 * Methode qui, en fonction du parcour charge bon panel (agence, formulaire email, formulaire rdv)
	 * @param {Object} element Objet javascript
	 */
	NPC.BV.FUNCTIONS.loadPanelAfterStoreLoc = function(element) {
		var idAgence = $(element).attr('data-agenceid')?.split("-")[1];
		if(NPC.BV.FUNCTIONS.valueIsDefine(idAgence) && idAgence != ''){
			var agence = NPC.BV.listeAgence.filter(function(uneAgence){
				return uneAgence.id === idAgence;
			});
	
			if (NPC.BV.CURRENT_PARCOUR.parcourName === 'storelocator') {
				NPC.BV.FUNCTIONS.loadInfoAgence(NPC.BV.FUNCTIONS.formatDataAgence(agence[0]));
				$('#masquerMoreInfo').addClass('hidden');
			}else{
				let panelData = NPC.BV.CURRENT_PARCOUR.parcourName === 'parcoursRdv' ? NPC.BV.PANEL_DATA.getDataEmailRdvNiv3(true, true) : NPC.BV.PANEL_DATA.getDataEmailRdvNiv3(true, false, false);
				let data = {
					...NPC.BV.FUNCTIONS.formatDataAgence(agence[0]),
					...panelData
				};
				NPC.BV.FUNCTIONS.loadFormPanel(data);
				$('.js-blockMoreInformations').addClass('hidden');
			}
		} else {
			console.error('Une erreur est survenue lors du chargement de la page de formulaire.\nAucun ID agence trouvé.')
		}
	}

	/**
	 * Evenement pour afficher/cacher plus de détails sur une agence
	 */
	$document.on('click', '#masquerMoreInfo .js-moreInformationsLink', function(e) {
		e.preventDefault();
		$('.js-blockMoreInformations').toggleClass('hidden');
		$('.js-moreInformationsLink').html($('.js-blockMoreInformations').hasClass('hidden') ? '<span>Plus d\'informations</span>' : '<span>Masquer</span>');
	});

	/**
	 * Evenement pour afficher 10 agences de plus sur le storelocator
	 */
	$document.on("click", "#voirPlusAgences", function(e) {
		e.preventDefault();
		var $listeAgence = $(".listeAgenceGeolocalisee.hidden:not(.js-storeLoc-agency)");
		var numberAgencies = 10;
		$listeAgence.slice(0, numberAgencies).addClass('StoreLocatorMap-Agency').addClass('js-storeLoc-agency').removeClass('hidden'); 
		$(window).trigger("storemap.agenciesChanged");

		if ($listeAgence.length <= numberAgencies) {
			$(this).addClass("hidden");
		}
	});
	// ------ [FIN Ouvertutre du panneau Store Locator] ------



	
/* Attente de retour : gestion des profils restreint
	$document.on('click', '.puMessagerieSecuriseeDesactivated', function(e) {
		NPC.BV.FUNCTIONS.ouvrirParours({
			title : 'envoyer un email',
			showHideStoreLocator : '',
			showHideBlocContactTel : 'hidden',
			showHideBlocContactForm : 'hidden',
			niveau : '1',
			boutonParcours : 'sendEmail',
			parcours : 'parcoursEmail',
			lienConnexionClient :'hidden',
			itemTitlebloc : "Choisissez l'agence que vous souhaitez contacter"

		});
		
		NPC.BV.FUNCTIONS.intialiserAutoCompletion();
	});

	$document.on('click', '.puPriseDeRdvDesactivated', function(e) {
		NPC.BV.FUNCTIONS.ouvrirParours({
			title : 'prendre rendez-vous',
			showHideStoreLocator : '' ,
			showHideBlocContactTel : 'hidden',
			showHideBlocContactForm : 'hidden',
			niveau : '1',
			sansArcep : 'hidden',
			avecArcep : 'hidden',
			serviceArcep : '',
			typeArcep : '',
			phoneNumber :'',
			phoneNumberHref : '',
			callPrice : '',
			greyTitle : '',
			hours1 : '',
			hours2 : '',
			hours3 : '',
			boutonParcours : 'rdv',
			parcours : 'parcoursRdv',
			lienConnexionClient : 'hidden',
			itemTitlebloc : "Prendre rendez-vous en ligne"

		});
		
		NPC.BV.FUNCTIONS.intialiserAutoCompletion();
	});*/
};
function initPanelLoader(){

    // Liste des Panneaux
    const _BV_PANEL_NATIONAl = 'bv-panel-national';
    const _BV_PANEL_CAISSE = 'bv-panel-caisse';
    const _BV_PANEL_AIDE_ET_URGENCE = 'bv-panel-aide-et-urgence';
    const _BV_PANEL_ERROR = 'bv-panel-error';
    const _BV_PANEL_STORELOCATOR = 'bv-panel-storelocator';
    const _BV_PANEL_CHOICE = 'bv-panel-choice';
    const _BV_PANEL_FORM = 'bv-panel-form';
    const _BV_PANEL_FORM_FEEDBACK = 'bv-panel-form-feedback';
    const _BV_PANEL_HOME_DEFAULT = 'bv-panel-home'; // Choix entre bv-panel-national et bv-panel-national en fonction de la CR
    const _BV_PANEL_INFO_AGENCE = 'bv-panel-info-agence';
    
    // Trigger list
    //    Home
    const _bv_help_trigger = 'js-bv-callbackOpenAideEtUrgence';
    const _bv_numAgence_trigger = 'js-bv-callbackOpenChoixNumAgence';
    const _bv_email_trigger = 'js-bv-callbackOpenChoixEmail';
    const _bv_rdv_trigger = 'js-bv-callbackOpenChoixRdv';
    const _bv_chat_trigger = 'js-bv-callbackOpenChoixChat';
    const _bv_rappel_trigger = 'js-bv-callbackOpenChoixRappel';
    const _bv_national_cr_trigger = 'js-bv-trigger-natioUrgence'
    //    Choice
    const _bv_storeLocGeoLock_trigger = 'js-bv-formStoreLoc-geoLoc';
    const _bv_storeLoc_trigger = 'js-bv-formStoreLoc';
    const _bv_form_trigger = 'js-bv-callbackOpenForm';
    //    Form
    const _bv_form_goHome_trigger = 'js-bv-form-goHome';
    //    FeedBack
    const _BV_feedback_leaveBV = 'js-bv-leaveBV';


    // Constantes Globale des panneaux
    const _BV_LEAVE_BUTTON = $('#fermetureLayerBV');
    const _BV_BACK_BUTTON = $('#backLayerBV');
    const _BV_HEADER = $('.npc-bv-header');
    
    // Liste des Panneaux où afficher le bouton retour
    const _BV_BACK_DISPLAY_PANEL_LIST = [
        _BV_PANEL_AIDE_ET_URGENCE,
        _BV_PANEL_STORELOCATOR,
        _BV_PANEL_CHOICE,
        _BV_PANEL_FORM,
        _BV_PANEL_INFO_AGENCE
    ] 

    // Liste des Panneaux où afficher le Header
    const _BV_HEADER_DISPLAY_PANEL_LIST_CO = [
        _BV_PANEL_CAISSE,
        _BV_PANEL_ERROR
    ] 
    const _BV_HEADER_DISPLAY_PANEL_LIST_NOCO = [
        _BV_PANEL_CAISSE,
        _BV_PANEL_CHOICE,
        _BV_PANEL_ERROR
    ] 

    // ------ [Gestion du bouton "Retour"] ------
    /**
     * Methode qui affiche le bonton retour en fonction du panneau
     */
     const isDisplayBackButton = function(){
        const currentPage = NPC.BV._HISTORY[NPC.BV._HISTORY.length - 1].id; //Récupération de la dernière valeurs de l'historique
        if(_BV_BACK_DISPLAY_PANEL_LIST.includes(currentPage)){
            _BV_BACK_BUTTON.show();
        }else{
            _BV_BACK_BUTTON.hide();
        }
    }
    // ------ [Gestion header] ------
    /**
     * Methode qui affiche le header
     */
    const isDisplayHeader = function(){
        const currentPage = NPC.BV._HISTORY[NPC.BV._HISTORY.length - 1].id;
        if(NPC.user.isConnected === false){
            showHideDisplayHeader(_BV_HEADER_DISPLAY_PANEL_LIST_NOCO.includes(currentPage));
        }else{
            showHideDisplayHeader(_BV_HEADER_DISPLAY_PANEL_LIST_CO.includes(currentPage));
        }
    }

    const showHideDisplayHeader = function(isDisplay){
        if(isDisplay){
            _BV_HEADER.show();
        }else{
            _BV_HEADER.hide();
        }
    }

    /**
     * Methode qui affiche le panneau précedent de l'historique 
     */
    const onClickBackButton = function(){
        if(NPC.BV._HISTORY.length > 1){
            NPC.BV._HISTORY.pop();
            var jsonHistory = NPC.BV._HISTORY[NPC.BV._HISTORY.length - 1]
            NPC.BV._HISTORY.pop();
            loadPanel(jsonHistory.id, jsonHistory.data);
        }
    }

    /**
     * Déclancheur du bouton retour
     */
     _BV_BACK_BUTTON.off('click').on('click', onClickBackButton);    
    // ------ [FIN Gestion du bouton "Retour"] ------


    // ------ [Gestion du bouton "Quitter"] ------
    /**
     * Methode qui affiche le panneau précedent de l'historique 
     */
    const onClickLeaveButton = function(){
        NPC.BV._HISTORY = [];
        NPC.BV.$_BV_PANEL.empty();
        NPC.BV.FUNCTIONS.OPENCLOSE.closeBV();
    }
    
    /**
     * Déclancheur du bouton quitter
     */
    _BV_LEAVE_BUTTON.on('click', onClickLeaveButton);
      
    // ------ [FIN Gestion du bouton "Quitter"] ------


    // ------ [Methode globale pour charger un panneau] ------
    /**
     * Methode de chargement d'un nouveau panneau avec ajout à l'historique
     * @param {*} id ID du panneau "<script id="bv-panel-caisse"<--------- type="text/x-jquery-tmpl"> "
     * @param {*} data DATA à inclure au format json {...}, default={}
     */
    const loadPanelStructure = function( id, data = {} ){     
        NPC.BV.$_BV_PANEL.empty();
        NPC.BV.$_BV_PANEL.loadTemplate($('#' + id), data);
        NPC.BV._HISTORY.push({
            id: id,
            data: data
        });
        isDisplayBackButton();
        isDisplayHeader();
        $(window).trigger('layout.bv');

        NPC.FUNCTIONS.TRACKING.refreshTracking();
        $('.ContainerBvModal--content')[0].focus();
        $(document).scrollTop( 0 );
    }


    const loadPanel = function(id,dataParam = {}){
        switch(id){
            case _BV_PANEL_HOME_DEFAULT :
                loadDefaultPanel(dataParam);
                break;
            case _BV_PANEL_NATIONAl :
                loadNationalPanel(dataParam);
                break;
            case _BV_PANEL_CAISSE :
                loadCaissesPanel(dataParam);
                break;
            case _BV_PANEL_AIDE_ET_URGENCE :
                loadAideEtUrgencePanel(dataParam);
                break;
            case _BV_PANEL_ERROR :
                loadErrorPanel(dataParam);
                break;
            case _BV_PANEL_STORELOCATOR :
                if(NPC.BV.STORELOC_GEOLOC){
                    NPC.BV.FUNCTIONS.findAgenceAuto();
                }else{
                    NPC.BV.FUNCTIONS.findAgenceForm(false);
                }
                break;
            case _BV_PANEL_CHOICE :
                loadChoicePanel(dataParam);
                break;
        }
    } 
    // ------ [FIN Methode globale pour charger un panneau] ------


    // ------ [Methode de chargement des données et des triggers des panneaux] ------
    /**
     * Methode de chargement du panneau par défaut
     */
    const loadDefaultPanel = function(dataParam = {}){
    	NPC.loadLibGoogleMaps();
        var cr = NPC.idLiveCopyCaisse;
        if(cr === 'national'){
            loadNationalPanel(dataParam);
        }else{
            NPC.BV.FUNCTIONS.initCard();            
		    NPC.BV.FUNCTIONS.setInfMotifSelected();
            loadCaissesPanel(NPC.BV.PANEL_DATA.getDataCaisse());
        }
    }

    const loadAideEtUrgencePanel = function(dataParam = {}){
        loadPanelStructure(_BV_PANEL_AIDE_ET_URGENCE);
		initCollapse();
    }

    const loadNationalPanel = function(dataParam = {}){
        loadPanelStructure(_BV_PANEL_NATIONAl);
        initSelectorBV();


        $('.' + _bv_national_cr_trigger).on('click', function(e) {
            e.preventDefault();
            NPC.storeLocator.gotoAccesCr();
        });

        $('.' + _bv_help_trigger).on('click', function() {
            loadAideEtUrgencePanel();
        });
    }

    const loadCaissesPanel = function(dataParam = {}){
        loadPanelStructure(_BV_PANEL_CAISSE, dataParam);
        var msgCard=$('#'+NPC.BV._BV_MODAL+'--panel #messageChannel');
        NPC.BV.FUNCTIONS.initThematicList();
        initBvGenesys();
        NPC.BV.FUNCTIONS.setMessageOuvertureAgenceConnecte();
        NPC.BV.FUNCTIONS.initDisplayHeaderConnecte();

        initSelectorBV();
        msgCard.hide();
        $('.' + _bv_help_trigger).on('click', function() {
            loadAideEtUrgencePanel();
        });

        $('#' + NPC.BV._BV_TEMATIC_SELCT).on('change', function() {
            NPC.BV.FUNCTIONS.selectThematicList(this);
            loadDefaultPanel();
        });

        $('.' + _bv_numAgence_trigger).on('click', function() {
            loadChoicePanelSTORLOC();
        });

        $('.' + _bv_email_trigger).on('click', function() {
            if (NPC.BV._BV_CARDS_STATUS.mail === 'close') {
            	msgCard.show();
            	msgCard.html(NPC.BV._BV_CARDS_STATUS.mailMessage);
            } else if(!NPC.user.isConnected) {
                loadChoicePanelEMAIL();
            }
        });

        $('.' + _bv_rdv_trigger).on('click', function() {
            if (NPC.BV._BV_CARDS_STATUS.rdv === 'close') {
            	msgCard.show();
            	msgCard.html(NPC.BV._BV_CARDS_STATUS.rdvMessage);
            } else if(!NPC.user.isConnected) {
                loadChoicePanelRDV();
            }
        });
        
        $('.' + _bv_chat_trigger).on('click', function() {
            if (NPC.BV._BV_CARDS_STATUS.chat === 'close') {
            	msgCard.show();
            	msgCard.html(NPC.BV._BV_CARDS_STATUS.chatMessage);
            } else {
                NPC.GENESYS.openChat();
            }
        });
        
        $('.' + _bv_rappel_trigger).on('click', function() {
            if (NPC.BV._BV_CARDS_STATUS.rappel === 'close') {
            	msgCard.show();
            	msgCard.html(NPC.BV._BV_CARDS_STATUS.rappelMessage);
            } else {
                NPC.GENESYS.openRappel();
            }
        });
    }

    const loadChoicePanel = function(dataParam = {}){
        loadPanelStructure(_BV_PANEL_CHOICE,dataParam);

        NPC.BV.FUNCTIONS.intialiserAutoCompletion();

        $('.' + _bv_form_trigger).on('click', function() {
            if(NPC.BV.CURRENT_PARCOUR.parcourName === 'parcoursEmail'){
                loadFormPanel(NPC.BV.PANEL_DATA.getDataEmailRdvNiv3());
            }else{
                loadFormPanel(NPC.BV.PANEL_DATA.getDataEmailRdvNiv3(false, true));
            }

        });

        $('.' + _bv_storeLocGeoLock_trigger).on('click', function(e) {
            e.preventDefault();
            NPC.BV.STORELOC_MAP = false;
            NPC.BV.FUNCTIONS.findAgenceAuto();
        });

        $('.' + _bv_storeLoc_trigger).on('submit', function(e) {
            e.preventDefault();
            NPC.BV.STORELOC_MAP = false;
            NPC.BV.FUNCTIONS.findAgenceForm();
        });


    }

    const loadFormPanel = function(dataParam = {}){
        loadPanelStructure(_BV_PANEL_FORM,dataParam);
        NPC.BV.FUNCTIONS.FORM.initForm();
        NPC.BV.FUNCTIONS.FORM.createFormTrigger();
        $('.' + _bv_form_goHome_trigger).on('click', function() {
            loadDefaultPanel();
        });
    }

    const loadInfoAgence = function(dataParam = {}){
        tC?.event?.pageVirtuelle(this,{
            evt_page_nom: 'Impression_oic_agence', 
            evenement_categorie: 'Prise-de-contact', 
            evenement_oic_objet_demande : NPC.BV?._BV_THEME && Object.keys(NPC.BV?._BV_THEME).length > 0 ? NPC.BV._BV_THEME.label.toUpperCase() : null
        });
        loadPanelStructure(_BV_PANEL_INFO_AGENCE,dataParam);
        
        $('.' + _BV_feedback_leaveBV).on('click', function() {
            NPC.BV.FUNCTIONS.OPENCLOSE.closeBV();
        });
    }

    const loadStoreLocPanel = function(dataParam = {}){
        loadPanelStructure(_BV_PANEL_STORELOCATOR,dataParam);
    }

    const loadErrorPanel = function(){
        NPC.loadLibGoogleMaps();
        tC?.event?.pageVirtuelle(this,{evt_page_nom: 'oic_erreur', evenement_categorie: 'Prise-de-contact'} ) ;
        loadPanelStructure(_BV_PANEL_ERROR);
       
        $('.' + _bv_help_trigger).on('click', function() {
            loadAideEtUrgencePanel();
        });

        $('.' + _bv_numAgence_trigger).on('click', function() {
            loadChoicePanelSTORLOC();
        });
    }

    const loadFeedbackPanel = function(){
        loadPanelStructure(_BV_PANEL_FORM_FEEDBACK, NPC.BV.PANEL_DATA.getDataFeedback());

        $('.' + _BV_feedback_leaveBV).on('click', function() {
            NPC.BV.FUNCTIONS.OPENCLOSE.closeBV();
        });
    }

    const loadChoicePanelRDV = function(){
        NPC.BV.CURRENT_PARCOUR = {
            parcourName : 'parcoursRdv',
            parcourTitle : 'Prendre rendez-vous'
        };
        loadChoicePanel(NPC.BV.PANEL_DATA.getDataRdvNiv1());
    }

    const loadChoicePanelEMAIL = function(){
        NPC.BV.CURRENT_PARCOUR = {
            parcourName : 'parcoursEmail',
            parcourTitle : 'Envoyer un Email'
        };
        loadChoicePanel(NPC.BV.PANEL_DATA.getDataEmailNiv1());
    }

    const loadChoicePanelSTORLOC = function(){
        NPC.BV.CURRENT_PARCOUR = {
            parcourName : 'storelocator',
            parcourTitle : 'Trouver le numéro d\'une agence'
        };
        loadChoicePanel(NPC.BV.PANEL_DATA.getDataNumAgenceNiv1());
    }

    // ------ [FIN Methode de chargement des données et des triggers des panneaux] ------

    NPC.BV.FUNCTIONS.loadDefaultPanel = loadDefaultPanel;
    NPC.BV.FUNCTIONS.loadStoreLocPanel = loadStoreLocPanel;
    NPC.BV.FUNCTIONS.loadInfoAgence = loadInfoAgence;
    NPC.BV.FUNCTIONS.loadFormPanel = loadFormPanel;
    NPC.BV.FUNCTIONS.loadErrorPanel = loadErrorPanel;
    NPC.BV.FUNCTIONS.loadFeedbackPanel = loadFeedbackPanel;
    NPC.BV.FUNCTIONS.loadChoicePanelRDV = loadChoicePanelRDV;
    NPC.BV.FUNCTIONS.loadChoicePanelEMAIL = loadChoicePanelEMAIL;
}

function initBvGenesys() {
    $(window).trigger("genesys.loaded");
};
function initBvRestitAgence(NPC) {
    NPC.geoloc = NPC.geoloc || {};


    // ////////////////////
    // PRIVATES METHODS //
    // ////////////////////
    var recupererMarches = function(data) {
        var markets = [];
        for (var market in data) {
            if (data[market] === true) {
                markets.push(market);
            }
        }

        var indexPro = markets.indexOf('pro');
        var indexFarmer = markets.indexOf('farmer');
        var indexAssociation = markets.indexOf('association');

        if (indexPro != -1 || indexFarmer != -1 || indexAssociation != -1) {
            markets.push("pro_farmer_association");
        }

        markets.join(",");

        return markets;
    };

    // Jours d'ouverturs Lundi Ou Samedi
    var openingDays = function(agenceWeekPlanning) {
        var openingDay = [];
        if (agenceWeekPlanning != null && agenceWeekPlanning != undefined) {
            if (agenceWeekPlanning.openMonday === true) {
                openingDay.push("monday");
            }
            if (agenceWeekPlanning.openSaturday === true) {
                openingDay.push("saturday");
            }
        }
        return openingDay;
    };

    // Fin Jours d'ouverturs Lundi Ou Samedi

    // Horaire
    var horaireToday = function(weekPlanning, agence) {
        var horaire = "";
        if (weekPlanning != null && weekPlanning != undefined && agence.exceptionalClosure != undefined) {
            horaire = messageHoraire(agence, false);
        }
        return horaire;
    };

    // Horaire For Mobile
    var horaireTodayForMobile = function(agence) {
        var horaire = "";
        if (agence) {
            horaire = messageHoraire(agence, true);
        }
        return horaire;
    };
    /** ****PAGE HORAIRE SEMAINE********* */
    var planingFunction = function(dayOfWeek, agence, hasOnlyRDV, hasOnlyFermTemp) {
        var dayPlanning = "";
        if (dayOfWeek && agence) {
            if (dayOfWeek.openingHours.length === 0 || agence.exceptionalClosure) {
                dayPlanning = "Fermé";
            } else if (dayOfWeek.openingHours.length === 1) {
                dayPlanning = dayOfWeek.openingHours[0].opening + '-' + dayOfWeek.openingHours[0].closing + infoSupHours(agence, dayOfWeek, 0, hasOnlyRDV, hasOnlyFermTemp);
            } else {
                dayPlanning = dayOfWeek.openingHours[0].opening + '-' + dayOfWeek.openingHours[0].closing + infoSupHours(agence, dayOfWeek, 0, hasOnlyRDV, hasOnlyFermTemp) + ' ' + dayOfWeek.openingHours[1].opening + '-' + dayOfWeek.openingHours[1].closing + infoSupHours(agence, dayOfWeek, 1, hasOnlyRDV, hasOnlyFermTemp);
            }
        }
        return dayPlanning;
    };

    function messageHoraire(agence, mobile) {
        var message = "";
        if(agence.exceptionalClosure) {
            message = "Agence exceptionnellement fermée";
        } else if (!agence.weekPlanning.weekScheduleOfNow) {
            message = "Agence fermée aujourd’hui";
        } else if (agence.weekPlanning.weekScheduleOfNow && agence.weekPlanning.weekScheduleOfNow.opening && agence.weekPlanning.weekScheduleOfNow.closing) {
            // L'agence possède des horaires pour la demi-journée en cours

            if(onRDV(agence.weekPlanning.weekScheduleOfNow) === "OUV_RDV") {
                // Agence ouverte uniquement sur rendez-vous
                message = messageAgenceOuverte(mobile, agence.weekPlanning.weekScheduleOfNow.opening,agence.weekPlanning.weekScheduleOfNow.closing);
                message += "<br/>Ouverture uniquement sur rendez-vous";

            } else if(onRDV(agence.weekPlanning.weekScheduleOfNow) === "FERM_TEMPO") {
                // Agence fermée temporairement
                message = "Fermeture temporaire";

            } else {
                // Agence ouverte (sans détail horaire)
                message = messageAgenceOuverte(mobile, agence.weekPlanning.weekScheduleOfNow.opening,agence.weekPlanning.weekScheduleOfNow.closing);
            }
        }
        return message;
    }

    function onRDV(hours) {
        if(hours && hours.hoursType && hours.hoursType.hoursTypeId) {
            return hours.hoursType.hoursTypeId;
        } else {
            return "";
        }
    }

    function messageAgenceOuverte(mobile, heureDebut, heureFin) {
        if(mobile) {
            return "Agence ouverte aujourd’hui <br class=\"visible-xs visible-sm\"/>de " + heureDebut + " à " + heureFin;
        } else {
            return "Agence ouverte aujourd’hui de " + heureDebut + " à " + heureFin;
        }
    }

    function infoSupHours(agence, dayOfWeek, dayIndex, hasOnlyRDV, hasOnlyFermTemp) {

        if(!agence.exceptionalClosure &&
            (dayOfWeek &&
                    dayOfWeek.openingHours[dayIndex] &&
                    dayOfWeek.openingHours[dayIndex].hoursType &&
                    dayOfWeek.openingHours[dayIndex].hoursType.hoursTypeId))
        {

            if((hasOnlyRDV || hasOnlyFermTemp)
                && (dayOfWeek.openingHours[dayIndex].hoursType.hoursTypeId === 'OUV_RDV'
                || dayOfWeek.openingHours[dayIndex].hoursType.hoursTypeId === 'FERM_TEMPO')
            ) {
                return `<sup>*</sup>`;
            } else if(dayOfWeek.openingHours[dayIndex].hoursType.hoursTypeId === 'OUV_RDV') {
                return `<sup>1</sup>`;
            } else if(dayOfWeek.openingHours[dayIndex].hoursType.hoursTypeId === 'FERM_TEMPO') {
                return `<sup>2</sup>`;
            } else {
                return "";
            }
        } else {
            return "";
        }


    }

    /** ****PAGE HORAIRE SEMAINE********* */
    var ouverturePlanning = function(dayOfWeek, weekPlanning) {
        var classe = "";
        if (weekPlanning != null && dayOfWeek != null) {
            if (dayOfWeek.dayOfWeek == "today" && weekPlanning.weekScheduleOfNow === null) {
                classe = "CardAgencyFunc-day--today CardAgencyFunc-day--closed";
            } else if (dayOfWeek.dayOfWeek == "today" && weekPlanning.weekScheduleOfNow != null) {
                classe = "CardAgencyFunc-day--today";
            }
        }
        return classe;
    };
    /** ******************************* */

    function combineAllMarketObj(listeAgence) {

        return listeAgence
            .map(agency => agency.market)
            .reduce((accu, curr) => {
                for(const key in curr) {
                    if(curr[key] === true) {
                        if(accu != undefined && typeof accu === 'object') {
                            if(accu.hasOwnProperty(key)) {
                                accu[key] = true
                            }
                        }
                    }
                }
                return accu;
            });

    }

    function getTrueMarketList(uniqueTypesObj) {
        if(uniqueTypesObj) {
            return Object.keys(uniqueTypesObj).filter(v => uniqueTypesObj[v])
        } else {
            return [];
        }
    }



    NPC.BV.FUNCTIONS.formatDataAgence = function(agence) {

        function generateNumeroAgence() {
            let phoneNumberHref = agence.contact.phoneNumber
            const numeroAgence = agence.contact.phoneNumber;

            if(phoneNumberHref) {
                phoneNumberHref = phoneNumberHref.split(' ').join('');
                phoneNumberHref = (phoneNumberHref.startsWith('0')) ? "tel://+33" + phoneNumberHref.substr(1) : "tel://+33" + phoneNumberHref;
                return `
                <span class="CardAgencyFunc-label"> Tel : </span>
                <a href="${phoneNumberHref}" class="npc-msl-link npc-link-custom npc-link-bv-custom CardAgencyFunc-value" style="display: unset;"><span>${numeroAgence}</span></a>
                `;
            } else {
                return "";
            }
        }

        function generateNumeroFax() {
            if(agence.contact.fax) {
                return `
                <span class="CardAgencyFunc-label"> Fax : </span>
                <span class="CardAgencyFunc-value CardAgencyFunc-value--bold">${agence.contact.fax}</span>
            `;
            } else {
                return "";
            }

        }

        function generateEmail() {
            if(agence.contact.emailAddress) {
                return `
                    <span class="CardAgencyFunc-label"> E-mail : </span>
                    <a href="mailto://${agence.contact.emailAddress}" class="npc-msl-link npc-link-custom npc-link-bv-custom CardAgencyFunc-value" id="emailAgency" style="display: unset;"><span>${agence.contact.emailAddress}</span></a>
                `;
            } else {
                return "";
            }
        }
        
        function hasAtLeastOne(agence, status) {
            let flag = false;
            const days = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
            const weekPlanning = agence.weekPlanning ? Object.keys(agence.weekPlanning).filter(k => days.includes(k)) : [];

            weekPlanning.forEach(function(day){
                const dayPlanning = agence.weekPlanning[day];
                const ohs = dayPlanning.openingHours;
                if(typeof ohs!=='undefined' && ohs.length > 0){
                    ohs.forEach(function(oh, el){
                        const openingHour = dayPlanning.openingHours[el];
                        if(typeof openingHour !=='undefined'){
                            const hourTypeId = openingHour.hoursType && openingHour.hoursType.hoursTypeId;
                            if(hourTypeId === status) {
                                  flag = true;
                            }
                        }
                    });
               }
            });

            return flag;
        }

        function hasAtLeastOneRDVFunc(agence) {
            return hasAtLeastOne(agence, 'OUV_RDV');
        }

        function hasAtLeastOneFermTempFunc(agence) {
            return hasAtLeastOne(agence, 'FERM_TEMPO');
        }

        const hasAtLeastOneFermTemp = hasAtLeastOneFermTempFunc(agence);
        const hasAtLeastOneRDV = hasAtLeastOneRDVFunc(agence);
        const hasOnlyRDV = hasAtLeastOneRDV && !hasAtLeastOneFermTemp;
        const hasOnlyFermTemp = hasAtLeastOneFermTemp && !hasAtLeastOneRDV;

        function generateRDVLegend(hasOnlyRDV, hasOnlyFermTemp) {
            //Ouverture sur rendez-vous uniquement
            if(!agence.exceptionalClosure && hasAtLeastOneRDV) {
                if(hasOnlyRDV != hasOnlyFermTemp) {
                    return `<sup>*</sup>Ouverture sur rendez-vous uniquement`;
                } else {
                    return `<sup>1</sup>Ouverture sur rendez-vous uniquement`;
                }
            } else {
                return "";
            }

        }

        function generateTempFermLegend(hasOnlyRDV, hasOnlyFermTemp) {
            //Fermeture temporaire
            if(!agence.exceptionalClosure && hasAtLeastOneFermTemp) {
                if(hasOnlyFermTemp != hasOnlyRDV) {
                    return `<sup>*</sup>Fermeture temporaire`;
                } else {
                    return `<sup>2</sup>Fermeture temporaire`;
                }
            } else {
                return "";
            }
        }

        return {
            agenceId : "ficheAgence-" + agence.id,
            agenceName : agence.name,
            horaireTodayAgence : horaireToday(agence.weekPlanning, agence),
            addressCpVille : agence.address.address + ", " + agence.address.zipCode + " " + agence.address.cityName,
            phoneNumber : generateNumeroAgence(),
            fax : generateNumeroFax(),
            emailAddress : generateEmail(),
            planingLundi : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.monday : null, agence, hasOnlyRDV, hasOnlyFermTemp),
            planingMardi : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.tuesday : null, agence, hasOnlyRDV, hasOnlyFermTemp),
            planingMercredi : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.wednesday : null, agence, hasOnlyRDV, hasOnlyFermTemp),
            planingJeudi : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.thursday : null, agence, hasOnlyRDV, hasOnlyFermTemp),
            planingVendredi : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.friday : null, agence, hasOnlyRDV, hasOnlyFermTemp),
            planingSamedi : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.saturday : null, agence, hasOnlyRDV, hasOnlyFermTemp),
            planingDimanche : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.sunday : null, agence, hasOnlyRDV, hasOnlyFermTemp),
            atm : agence.services.atm != true ? 'hidden' : '',
            automaticCashMachine : agence.services.automaticCashMachine != true ? 'hidden' : '',
            wheelChairAccess : agence.services.wheelChairAccess != true ? 'hidden' : '',
            carPark : agence.services.carPark != true ? 'hidden' : '',
            exchangeCurrency : agence.services.exchangeCurrency != true ? 'hidden' : '',
            extraService1Show : (agence.services.extraService1 != null && agence.services.extraService1.trim() != '') ? '' : 'hidden',
            extraService2Show : (agence.services.extraService2 != null && agence.services.extraService2.trim() != '') ? '' : 'hidden',
            extraService3Show : (agence.services.extraService3 != null && agence.services.extraService3.trim() != '') ? '' : 'hidden',
            extraService1 : agence.services.extraService1,
            extraService2 : agence.services.extraService2,
            extraService3 : agence.services.extraService3,
            ouvertureLundi : ouverturePlanning(agence.weekPlanning != null ? agence.weekPlanning.monday : null, agence.weekPlanning != null ? agence.weekPlanning : null),
            ouvertureMardi : ouverturePlanning(agence.weekPlanning != null ? agence.weekPlanning.tuesday : null, agence.weekPlanning != null ? agence.weekPlanning : null),
            ouvertureMercredi : ouverturePlanning(agence.weekPlanning != null ? agence.weekPlanning.wednesday : null, agence.weekPlanning != null ? agence.weekPlanning : null),
            ouvertureJeudi : ouverturePlanning(agence.weekPlanning != null ? agence.weekPlanning.thursday : null, agence.weekPlanning != null ? agence.weekPlanning : null),
            ouvertureVendredi : ouverturePlanning(agence.weekPlanning != null ? agence.weekPlanning.friday : null, agence.weekPlanning != null ? agence.weekPlanning : null),
            ouvertureSamedi : ouverturePlanning(agence.weekPlanning != null ? agence.weekPlanning.saturday : null, agence.weekPlanning != null ? agence.weekPlanning : null),
            ouvertureSamediShow : planingFunction(agence.weekPlanning != null ? agence.weekPlanning.saturday : null, agence) == 'Fermé' ? 'hidden' : '',
            ouvertureDimanche : ouverturePlanning(agence.weekPlanning != null ? agence.weekPlanning.sunday : null, agence.weekPlanning != null ? agence.weekPlanning : null),
            crdAgencyFuncElementShow: agence.services.atm != true && agence.services.automaticCashMachine == false && agence.services.wheelChairAccess != true && agence.services.carPark != true && agence.services.exchangeCurrency != true && (agence.services.extraService1 != '' || agence.services.extraService1 != null) && (agence.services.extraService2 != '' || agence.services.extraService2 != null) && (agence.services.extraService3 != '' || agence.services.extraService3 != null) && planingFunction(agence.weekPlanning != null ? agence.weekPlanning.saturday : null, agence) == 'Fermé' ? 'hidden' : '',
            legendRDV: generateRDVLegend(hasOnlyRDV, hasOnlyFermTemp),
            legendTempFerm: generateTempFermLegend(hasOnlyRDV, hasOnlyFermTemp)
        };

    }
    /**
     * Affiche l'agence la plus proche de l'addresse saisie, de la
     * géolocalisation de l'utilisateur, ou une phrase si aucune Agence n'est
     * trouve
     *
     * @param listAgence:Array
     *
     * @return void
     */
    function _displayResultAgences(listeAgence, estParGeoloc) {
        if(listeAgence.length === 0) {
            if (estParGeoloc) {
              $('#noAgenceByAdress').addClass('hidden');
  			$('#noAgenceByGeolocalisation').removeClass('hidden');
            } else {
              $('#noAgenceByGeolocalisation').addClass('hidden');
  			$('#noAgenceByAdress').removeClass('hidden');
            }
        } else {   

            NPC.BV.listeAgence = listeAgence;
        	const uniqueTypes = combineAllMarketObj(listeAgence);

            const marketList = {
                generalPublic: uniqueTypes.generalPublic,
                privateBanking: uniqueTypes.privateBanking,
                enterprise: uniqueTypes.enterprise,
                pro_farmer_association: uniqueTypes.pro || uniqueTypes.farmer || uniqueTypes.association,
                publicCollectivity: uniqueTypes.publicCollectivity
            }

            NPC.BV.FUNCTIONS.loadStoreLocPanel(
                {
                    // // Id des options du menu déroulant des types
                    // // utilisé pour appliquer l'attribut "selected"
                    // OptionPublic: OptionPublic(),
                    // OptionPrivateBanking: OptionPrivateBanking(),
                    // OptionEnterprise: OptionEnterprise(),
                    // OptionProFarmer: OptionProFarmer(),
                    // OptionPublicCollectivity: OptionPublicCollectivity(),
                    // OptionAll: OptionAll(),

                    // boolean qui indique si l'item est affiché dans le menu
                    title : NPC.BV.CURRENT_PARCOUR.parcourTitle,
                    isNotPublic: marketList.generalPublic ? '' : 'hidden',
                    isNotPrivateBanking: marketList.privateBanking ? '' : 'hidden',
                    isNotEnterprise: marketList.enterprise ? '' : 'hidden',
                    isNotProFarmAssoc:	marketList.pro_farmer_association ? '' : 'hidden',
                    isNotPublicCollectivity: marketList.publicCollectivity ? '' : 'hidden',
                    isNotAll: getTrueMarketList(marketList).length === 1 ? 'hidden' : '',
                    dataSize: getTrueMarketList(marketList).length
                }
            )

            NPC.BV.$_BV_PANEL.find('.selectpicker').selectpicker('refresh');

            // si nous n'avons qu'une seule valeur dans le fitre des marchés,
            // on la sélectionne
            if(getTrueMarketList(marketList).length === 1) {
                $('#greenBtnblockContainer').find('.selectpicker').val(getTrueMarketList(marketList)[0]).selectpicker('refresh');
            }
            
            var contentAucuneAgence = '<li class="StoreLocatorMap-Agency StoreLocatorMap-Agency--noResult js-StoreLocatorMap-Agency--noResult"><h2 class="StoreLocatorMap-AgencyTitle">Aucun résultat</h2></li>';
            $('.StoreLocatorMap-AgenciesList').append(contentAucuneAgence);

            // Si résultat retourné sans agences
            if (!listeAgence || listeAgence.length == 0) {
                // Affichage de la li aucun résultat
                $('#voirPlusAgences').addClass('hidden');

                return;
            }

            // carte et affichage liste agence
            $('.npc-bouton-vert--panel .StoreLocatorMap-AgenciesList').loadTemplate($("#template-carte-agence"), listeAgence.map(function(agence) {
				var pinAgence = "";	
                if(agence.type === 6){
                	pinAgence = "/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin6.png";
                } else {

                	pinAgence = "/etc.clientlibs/settings/wcm/designs/ca/npc/clientlib-resources/resources/images/store-locator/ca-pin.png";
                }
                var data = {
                    latitude : agence.coordinates.latitude,
                    longitude : agence.coordinates.longitude,
                    markets : recupererMarches(agence.market),
                    opening : openingDays(agence.weekPlanning),
                    agenceName : agence.name,
                    horaireTodayAgence : horaireToday(agence.weekPlanning, agence),
                    horaireTodayAgenceForMobile : horaireTodayForMobile(agence),
                    agenceId : "ficheAgence-" + agence.id,
                    horaireAdressCPVille : horaireToday(agence.weekPlanning, agence) + '<br>' + agence.address.address + " " + agence.address.zipCode + " " + agence.address.cityName,
                    agenceDistance : "~ " + agence.distance + " km",
                    agenceIdList : "ficheAgence-" + agence.id,
                    agenceType : [agence.typeName],
                    pinAgence : pinAgence
                };
                data.valueAttr = JSON.stringify({
                    id : data.agenceIdList,
                    latitude : data.latitude,
                    longitude : data.longitude,
                    type : data.agenceType,
                    openings : data.opening,
                    isEagence : agence.type === 6
                });
                return data;
            }), {
                append : true
            });
            
            $document.off('click', '.plusInfo').on('click', '.plusInfo', function(e) {
                e.preventDefault();
                NPC.BV.STORELOC_MAP = true;
                NPC.BV.FUNCTIONS.loadPanelAfterStoreLoc(e.currentTarget);
            });

            $('.listeAgenceGeolocalisee').on('click', function(e) {
                e.preventDefault();
                NPC.BV.STORELOC_MAP = false;
                NPC.BV.FUNCTIONS.loadPanelAfterStoreLoc(e.currentTarget);
            });

            var $listeAgenceGeoloc = $(".listeAgenceGeolocalisee");
            var numberAgencies = 15;

            $listeAgenceGeoloc.slice(numberAgencies).addClass('hidden').removeClass('js-storeLoc-agency').addClass('StoreLocatorMap-Agency');

            $(window).trigger("google.maps.api.loaded");

            if(NPC.BV.STORELOC_MAP){
                $('#mapAgency').addClass('active');
                $('#listAgency').removeClass('active');
                $('.js-StoreLocatorMap-content').addClass('has-mapFocus');
            }else{
                $('#mapAgency').removeClass('active');
                $('#listAgency').addClass('active');
            }
        }

    };

    /**
     * Demande la liste des Agences proches du point de geolocalisation
     *
     * @return void
     */
    var _findNearlyAgences = function() {
        if (NPC.storeLocator) {
            NPC.storeLocator.trouverAgencesProches(NPC.geoloc.lat, NPC.geoloc.long, _displayResultAgences);

        }
    };

    var afficherMessageErreur = function() {
        $('#errorGeolocalisation').removeClass('hidden');
        $('#errorGeolocalisation').addClass('npc-error-geolocalisation');
    };

    /**
     * Méthode privée
     * Demande la liste des Agences proches de l'addresse de géolocalisation
     */
    function _findNearlyAgencesAddresse() {
        if (NPC.storeLocator) {
            var addressUser = '';
            if($('#' +  NPC.BV.INPUTS.trouverAgenceByAdresse).length !== 0){
                addressUser = $.trim($('#' +  NPC.BV.INPUTS.trouverAgenceByAdresse).val());
                NPC.BV.STORELOC_INPUT = addressUser;
            }else{
                addressUser = NPC.BV.STORELOC_INPUT;
            }
            NPC.storeLocator.trouverAgencesProchesAdresse(addressUser, _displayResultAgences);
        }
    };

    // //////////////////
    // PUBLIC METHODS //
    // //////////////////

    /**
     * Méthode publique
     * Lance la recherche en mode géolocalisation
     */
    NPC.BV.FUNCTIONS.trouverAgencesRun = function(){
		if (NPC.geoloc.geolocalized) {
            _findNearlyAgences();
        } else {
            if (NPC.geoloc.userDenied) {
                afficherMessageErreur();
            }
        } 
	};
	
    /**
     * Méthode publique
     * Lance la recherche en mode addresse
     */
	NPC.BV.FUNCTIONS.trouverAgencesAddresseRun = function(){
		_findNearlyAgencesAddresse();
	};
}

/**
 * Initalisation des fonctions/Méthodes liées au formulaire
 * Ulilise al librairie JQuery
 *    - jquery.validate.js
 *    - additional-methods.js
 */
function initBvFormFunction() {
    NPC.BV.FUNCTIONS.FORM = {};

    /**
     * Méthode Privée
     * Methode d'initialisation des regles du formulaire (Voir doc JQuery)
     */
    function initBvFormRules(){
        $('#' + NPC.BV._BV_FORMID).validate({
            rules : {
                dayForm : {
                    date : false,
                    dateITA : true
                },
                birthdateForm : {
                    date : false,
                    dateITA : true
                },
                comment : {
                    required : true,
                    minlength : 20
                },
                lastname : {
                    required : true,
                    minlength : 2
                },
                firstname : {
                    required : true,
                    minlength : 2
                },
                phonenumberForm : {
                    required : true
                },
                emailForm : {
                    email : true,
                    required : true
                },
                checkboxMentionsLegales : {
                    required : true
                }

            },
            messages : {
                firstname : {
                    required : 'Vérifiez votre saisie',
                    minlength : jQuery.format('Vérifiez votre saisie')
                },
                lastname : {
                    required : 'Vérifiez votre saisie',
                    minlength : jQuery.format('Vérifiez votre saisie')
                },
                phonenumberForm : {
                    required : 'Vérifiez votre saisie',
                    minlength : jQuery.format('Vérifiez votre saisie'),
                    maxlength : jQuery.format('Vérifiez votre saisie')

                },
                emailForm : {
                    required : 'Vérifiez votre saisie',
                    email : 'Veuillez entrer une adresse email valide'
                },
                comment : {
                    required : 'Veuillez entrer au moins 20 caractères',
                    minlength : jQuery.format('Veuillez entrer au moins 20 caractères')

                },
                checkboxMentionsLegales : {
                    required : 'Veuillez indiquer que vous avez bien pris connaissance des mentions légales'
                }

            },
            highlight : function(element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight : function(element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
            errorElement : 'p',
            errorClass : 'has-error',
            errorPlacement : function(error, element) {
                if (element.is(':checkbox')) {
                    if (!error.hasClass('npc-form-error-custom')) {
                        error.addClass('npc-form-error-custom');
                    }
                    element.closest('.checkbox').parent().append(error);
                } else {
                    if (!error.hasClass('help-block')) {
                        error.addClass('help-block');
                    }
                    error.insertAfter(element);
                }
            }

        });
    }

    /**
     * Méthode Privée
     * Méthode de validation du formulaire
     * Récupération des valeurs et choix du mail
     */
    function validateBvForm(){
        initBvFormRules();

        const formElement = $('#' + NPC.BV._BV_FORMID);
        if(formElement.valid()){
            const agenceCouranteEmail = NPC.BV.$_BV_WRAPPER.data('value').startDataInfMotifSelected[15];
            const lastName = formElement.find('#lastname').val();
            const firstName = formElement.find('#firstname').val();
            const phoneNumber = formElement.find('#phonenumberForm').val();
            const emailUser = formElement.find('#emailForm').val();

            const civility = formElement.find('#civility').val();
            const country = formElement.find('#country').val();
            const birthDate = formElement.find('#birthdateForm').val();
            const comment = formElement.find('#comment').val().replace(/\n/g, '<br/>');
            const qualifDemande = NPC.BV._BV_THEME.label;

            const hour = formElement.find('#hour').val();
            const day = formElement.find('#dayForm').val();
            const agenceFicheEmail = $('#emailAgency').text();

            var emailAgency = '';
            if(NPC.BV._HISTORY[NPC.BV._HISTORY.length-2].id === 'bv-panel-storelocator'){
                emailAgency = agenceFicheEmail;
            }else{
                emailAgency = agenceCouranteEmail;
            }

            if(NPC.BV.CURRENT_PARCOUR.parcourName === 'parcoursEmail'){
                sendEmailForm(lastName, firstName, phoneNumber, emailUser, emailAgency, comment, civility, country, qualifDemande);
            }else{
                sendEmailForm(lastName, firstName, phoneNumber, emailUser, emailAgency, comment, civility, country, qualifDemande, hour, day, birthDate);
            }
        }
    }

    /**
     * Méthode Privée
     * Methode d'envoie du mail via requette ajax 
     * @param {*} lastName 
     * @param {*} firstName 
     * @param {*} phoneNumber 
     * @param {*} emailUser 
     * @param {*} emailAgency 
     * @param {*} comment 
     * @param {*} civility 
     * @param {*} country 
     * @param {*} qualifDemande 
     * @param {*} hour 
     * @param {*} day 
     * @param {*} birthDate 
     */
    function sendEmailForm(lastName, firstName, phoneNumber, emailUser, emailAgency, comment, civility, country, qualifDemande, hour, day, birthDate){

        var captchaId = '';
        var captchaValue = '';
        var boutonVertCaptchaElement = getBtnVertCaptcha();
        if (boutonVertCaptchaElement.length > 0){
            captchaId = boutonVertCaptchaElement.npcCaptcha('getId');
            captchaValue = boutonVertCaptchaElement.npcCaptcha('getResponse');
        }

        var postParams = {
            'lastName' : lastName,
            'firstName' : firstName,
            'phoneNumber' : phoneNumber,
            'emailUser' : emailUser,
            'emailAgency' : emailAgency,
            'comment' : comment,
            'civility' : civility,
            'country' : country,
            'day' : day,
            'hour' : hour,
            'birthDate' : birthDate,
            'qualifDemande' : qualifDemande,
            'captchaId': captchaId,
            'captchaValue': captchaValue

        };

       var urlSendMailAjax = window.location.pathname.replace('.html', '.greenbtn-sendemail.json');

        $.ajax({
            type : 'POST',
            url : urlSendMailAjax,
            data : postParams,
            cache : true,
            success : function(data) {
                refreshCaptcha();
                console.warn(data);
                NPC.BV.FUNCTIONS.loadFeedbackPanel(true);
            },
            fail : function(data) {
                refreshCaptcha();
                console.error('Probleme mail envoi layer BV!');
                NPC.BV.FUNCTIONS.loadFeedbackPanel(true);
            },
            error :  function(data) {
                refreshCaptcha();
                console.error('Probleme mail envoi layer BV!'); 
                NPC.BV.FUNCTIONS.loadFeedbackPanel(true);
            }
        });
    };

    /**
     * Méthode Privée
     * Récupère le captcha du bouton vert
     */
    function getBtnVertCaptcha() {
        return NPC.BV.$_BV_CAPTCHA.find('[data-npc-captcha]');
    };

    /**
     * Méthode Privée
     * Recharge le captcha
     * @param {*} callback 
     */
    function refreshCaptcha(callback) {
        var boutonVertCaptchaElement = getBtnVertCaptcha();
        boutonVertCaptchaElement.npcCaptcha("refresh", callback);
    };

    /**
     * Méthode Privée
	 * Déplace le captcha dans le bouton vert
	 */
	function loadCaptcha() {
		refreshCaptcha(function() {
			this.npcCaptcha("hideErrors");
			//NPC.BV.$_BV_CAPTCHA.insertAfter('#CaptchaBoutonVertAfter');
			NPC.BV.$_BV_CAPTCHA.removeClass('hidden');
		});
	}

    /**
     * Méthode Privée
	 * Génére la liste du selecteur country
	 */
    function initBvIndicatif(){
        const indicatifList = [
            {minlength: '12', maxlength: '14', value: 'France (+33)'},
            {minlength: '14', maxlength: '19', value: 'Belgique (+32)'},
            {minlength: '14', maxlength: '19', value: 'Allemagne (+49)'},
            {minlength: '14', maxlength: '19', value: 'Italie (+39)'},
            {minlength: '14', maxlength: '19', value: 'Royaume-Uni (+44)'},
            {minlength: '14', maxlength: '19', value: 'Espagne (+34)'},
            {minlength: '14', maxlength: '19', value: 'Gibraltar (+350)'},
            {minlength: '14', maxlength: '19', value: 'Portugal (+351)'},
            {minlength: '14', maxlength: '19', value: 'Luxembourg (+352)'},
            {minlength: '14', maxlength: '19', value: 'Irlande (+353)'},
            {minlength: '14', maxlength: '19', value: 'Islande (+354)'},
            {minlength: '14', maxlength: '19', value: 'Albanie (+355)'},
            {minlength: '14', maxlength: '19', value: 'Malte (+356)'},
            {minlength: '14', maxlength: '19', value: 'Chypre (+357)'},
            {minlength: '14', maxlength: '19', value: 'Finlande (+358)'},
            {minlength: '14', maxlength: '19', value: 'Bulgarie (+359)'},
            {minlength: '14', maxlength: '19', value: 'Hongrie (+36)'},
            {minlength: '14', maxlength: '19', value: 'Lituanie (+370)'},
            {minlength: '14', maxlength: '19', value: 'Lettonie (+371)'},
            {minlength: '14', maxlength: '19', value: 'Estonie (+372)'},
            {minlength: '14', maxlength: '19', value: 'Moldavie (+373)'},
            {minlength: '14', maxlength: '19', value: 'Arménie (+374)'},
            {minlength: '14', maxlength: '19', value: 'Biélorussie (+375)'},
            {minlength: '14', maxlength: '19', value: 'Andorre (+376)'},
            {minlength: '14', maxlength: '19', value: 'Monaco (+377)'},
            {minlength: '14', maxlength: '19', value: 'Saint-Marin (+378)'},
            {minlength: '14', maxlength: '19', value: 'Vatican (+379)'},
            {minlength: '14', maxlength: '19', value: 'Ukraine (+380)'},
            {minlength: '14', maxlength: '19', value: 'Serbie (+381)'},
            {minlength: '14', maxlength: '19', value: 'Monténégro (+382)'},
            {minlength: '14', maxlength: '19', value: 'Croatie (+385)'},
            {minlength: '14', maxlength: '19', value: 'Slovénie (+386)'},
            {minlength: '14', maxlength: '19', value: 'Bosnie-Herzégovine (+387)'},
            {minlength: '14', maxlength: '19', value: 'Macédoine (+389)'},
            {minlength: '14', maxlength: '19', value: 'Roumanie (+40)'},
            {minlength: '14', maxlength: '19', value: 'Suisse (+41)'},
            {minlength: '14', maxlength: '19', value: 'Grèce (+30)'},
            {minlength: '14', maxlength: '19', value: 'Pays-Bas (+31)'},
            {minlength: '14', maxlength: '19', value: 'République tchèque (+420)'},
            {minlength: '14', maxlength: '19', value: 'Slovaquie (+421)'},
            {minlength: '14', maxlength: '19', value: 'Liechtenstein (+423)'},
            {minlength: '14', maxlength: '19', value: 'Autriche (+43)'},
            {minlength: '14', maxlength: '19', value: 'Danemark (+45)'},
            {minlength: '14', maxlength: '19', value: 'Suède (+46)'},
            {minlength: '14', maxlength: '19', value: 'Norvège (+47)'},
            {minlength: '14', maxlength: '19', value: 'Pologne (+48)'},
            {minlength: '14', maxlength: '19', value: 'États-Unis (+1)'},
            {minlength: '14', maxlength: '19', value: 'Canada (+1)'},
            {minlength: '14', maxlength: '19', value: 'Bahamas (+1242)'},
            {minlength: '14', maxlength: '19', value: 'Barbade (+1246)'},
            {minlength: '14', maxlength: '19', value: 'Anguilla (+1264)'},
            {minlength: '14', maxlength: '19', value: 'Antigua-et-Barbuda (+1268)'},
            {minlength: '14', maxlength: '19', value: 'Îles Vierges britanniques (+1284)'},
            {minlength: '14', maxlength: '19', value: 'Îles Vierges des États-Unis (+1340)'},
            {minlength: '14', maxlength: '19', value: 'Îles Caïmans (+1345)'},
            {minlength: '14', maxlength: '19', value: 'Bermudes (+1441)'},
            {minlength: '14', maxlength: '19', value: 'Grenade (+1473)'},
            {minlength: '14', maxlength: '19', value: 'îles Turks-et-Caïcos (+1649)'},
            {minlength: '14', maxlength: '19', value: 'Montserrat (+1664)'},
            {minlength: '14', maxlength: '19', value: 'Îles Mariannes du Nord (+1670)'},
            {minlength: '14', maxlength: '19', value: 'Guam (+1671)'},
            {minlength: '14', maxlength: '19', value: 'Samoa américaines (+1684)'},
            {minlength: '14', maxlength: '19', value: 'Saint-Martin (+1921)'},
            {minlength: '14', maxlength: '19', value: 'Sainte-Lucie (+1958)'},
            {minlength: '14', maxlength: '19', value: 'Dominique (+1967)'},
            {minlength: '14', maxlength: '19', value: 'Saint-Vincent-et-les-Grenadines (+1984)'},
            {minlength: '14', maxlength: '19', value: 'Porto Rico (+1987)'},
            {minlength: '14', maxlength: '19', value: 'République dominicaine (+1809)'},
            {minlength: '14', maxlength: '19', value: 'Trinité-et-Tobago (+1868)'},
            {minlength: '14', maxlength: '19', value: 'Saint-Christophe-et-Niévès (+1869)'},
            {minlength: '14', maxlength: '19', value: 'Jamaïque (+1876)'},
            {minlength: '14', maxlength: '19', value: 'Égypte (+20)'},
            {minlength: '14', maxlength: '19', value: 'Soudan du Sud (+211)'},
            {minlength: '14', maxlength: '19', value: 'Maroc (+212)'},
            {minlength: '14', maxlength: '19', value: 'Algérie (+213)'},
            {minlength: '14', maxlength: '19', value: 'Tunisie (+216)'},
            {minlength: '14', maxlength: '19', value: 'Libye (+218)'},
            {minlength: '14', maxlength: '19', value: 'Gambie (+220)'},
            {minlength: '14', maxlength: '19', value: 'Sénégal (+221)'},
            {minlength: '14', maxlength: '19', value: 'Mauritanie (+222)'},
            {minlength: '14', maxlength: '19', value: 'Mali (+223)'},
            {minlength: '14', maxlength: '19', value: 'Guinée (+224)'},
            {minlength: '14', maxlength: '19', value: 'Côte d\'Ivoire (+225)'},
            {minlength: '14', maxlength: '19', value: 'Burkina Faso (+226)'},
            {minlength: '14', maxlength: '19', value: 'Niger (+227)'},
            {minlength: '14', maxlength: '19', value: 'Togo (+228)'},
            {minlength: '14', maxlength: '19', value: 'Bénin (+229)'},
            {minlength: '14', maxlength: '19', value: 'Maurice (+230)'},
            {minlength: '14', maxlength: '19', value: 'Libéria (+231)'},
            {minlength: '14', maxlength: '19', value: 'Sierra Leone (+232)'},
            {minlength: '14', maxlength: '19', value: 'Ghana (+233)'},
            {minlength: '14', maxlength: '19', value: 'Nigeria (+234)'},
            {minlength: '14', maxlength: '19', value: 'Tchad (+235)'},
            {minlength: '14', maxlength: '19', value: 'République centrafricaine (+236)'},
            {minlength: '14', maxlength: '19', value: 'Cameroun (+237)'},
            {minlength: '14', maxlength: '19', value: 'Cap-Vert (+238)'},
            {minlength: '14', maxlength: '19', value: 'Sao Tomé-et-Principe (+239)'},
            {minlength: '14', maxlength: '19', value: 'Guinée équatoriale (+240)'},
            {minlength: '14', maxlength: '19', value: 'Gabon (+241)'},
            {minlength: '14', maxlength: '19', value: 'République du Congo (+242)'},
            {minlength: '14', maxlength: '19', value: 'République démocratique du Congo (+243)'},
            {minlength: '14', maxlength: '19', value: 'Angola (+244)'},
            {minlength: '14', maxlength: '19', value: 'Guinée-Bissau (+245)'},
            {minlength: '14', maxlength: '19', value: 'Territoire Britannique de l\'océan Indien (+246)'},
            {minlength: '14', maxlength: '19', value: 'Seychelles (+248)'},
            {minlength: '14', maxlength: '19', value: 'Soudan (+249)'},
            {minlength: '14', maxlength: '19', value: 'Rwanda (+250)'},
            {minlength: '14', maxlength: '19', value: 'Éthiopie (+251)'},
            {minlength: '14', maxlength: '19', value: 'Somalie (+252)'},
            {minlength: '14', maxlength: '19', value: 'Djibouti (+253)'},
            {minlength: '14', maxlength: '19', value: 'Kenya (+254)'},
            {minlength: '14', maxlength: '19', value: 'Tanzanie (+255)'},
            {minlength: '14', maxlength: '19', value: 'Ouganda (+256)'},
            {minlength: '14', maxlength: '19', value: 'Burundi (+257)'},
            {minlength: '14', maxlength: '19', value: 'Mozambique (+258)'},
            {minlength: '14', maxlength: '19', value: 'Zambie (+260)'},
            {minlength: '14', maxlength: '19', value: 'Madagascar (+261)'},
            {minlength: '14', maxlength: '19', value: 'La Réunion (+262)'},
            {minlength: '14', maxlength: '19', value: 'Mayotte (+262)'},
            {minlength: '14', maxlength: '19', value: 'Zimbabwe (+263)'},
            {minlength: '14', maxlength: '19', value: 'Namibie (+264)'},
            {minlength: '14', maxlength: '19', value: 'Malawi (+265)'},
            {minlength: '14', maxlength: '19', value: 'Lesotho (+266)'},
            {minlength: '14', maxlength: '19', value: 'Botswana (+267)'},
            {minlength: '14', maxlength: '19', value: 'Swaziland (+268)'},
            {minlength: '14', maxlength: '19', value: 'Comores (+269)'},
            {minlength: '14', maxlength: '19', value: 'Afrique du Sud (+27)'},
            {minlength: '14', maxlength: '19', value: 'Saint Helena (+290)'},
            {minlength: '14', maxlength: '19', value: 'Érythrée (+291)'},
            {minlength: '14', maxlength: '19', value: 'Aruba (+297)'},
            {minlength: '14', maxlength: '19', value: 'Îles Féroé (+298)'},
            {minlength: '14', maxlength: '19', value: 'Groenland (+299)'},
            {minlength: '14', maxlength: '19', value: 'Belize (+501)'},
            {minlength: '14', maxlength: '19', value: 'Guatemala (+502)'},
            {minlength: '14', maxlength: '19', value: 'Salvador (+503)'},
            {minlength: '14', maxlength: '19', value: 'Honduras (+504)'},
            {minlength: '14', maxlength: '19', value: 'Nicaragua (+505)'},
            {minlength: '14', maxlength: '19', value: 'Costa Rica (+506)'},
            {minlength: '14', maxlength: '19', value: 'Panama (+507)'},
            {minlength: '14', maxlength: '19', value: 'Saint-Pierre-et-Miquelon (+508)'},
            {minlength: '14', maxlength: '19', value: 'Haïti (+509)'},
            {minlength: '14', maxlength: '19', value: 'Pérou (+51)'},
            {minlength: '14', maxlength: '19', value: 'Mexique (+52)'},
            {minlength: '14', maxlength: '19', value: 'Cuba (+53)'},
            {minlength: '14', maxlength: '19', value: 'Argentine (+54)'},
            {minlength: '14', maxlength: '19', value: 'Brésil (+55)'},
            {minlength: '14', maxlength: '19', value: 'Chili (+56)'},
            {minlength: '14', maxlength: '19', value: 'Colombie (+57)'},
            {minlength: '14', maxlength: '19', value: 'Venezuela (+58)'},
            {minlength: '14', maxlength: '19', value: 'Guadeloupe (+590)'},
            {minlength: '14', maxlength: '19', value: 'Saint-Barthélemy (+590)'},
            {minlength: '14', maxlength: '19', value: 'Saint-Martin (+590)'},
            {minlength: '14', maxlength: '19', value: 'Bolivie (+591)'},
            {minlength: '14', maxlength: '19', value: 'Guyana (+592)'},
            {minlength: '14', maxlength: '19', value: 'Équateur (+593)'},
            {minlength: '14', maxlength: '19', value: 'Guyane Française (+594)'},
            {minlength: '14', maxlength: '19', value: 'Paraguay (+595)'},
            {minlength: '14', maxlength: '19', value: 'Martinique (+596)'},
            {minlength: '14', maxlength: '19', value: 'Suriname (+597)'},
            {minlength: '14', maxlength: '19', value: 'Uruguay (+598)'},
            {minlength: '14', maxlength: '19', value: 'Curaçao (+599)'},
            {minlength: '14', maxlength: '19', value: 'Malaisie (+60)'},
            {minlength: '14', maxlength: '19', value: 'Australie (+61)'},
            {minlength: '14', maxlength: '19', value: 'Indonésie (+62)'},
            {minlength: '14', maxlength: '19', value: 'Philippines (+63)'},
            {minlength: '14', maxlength: '19', value: 'Nouvelle-Zélande (+64)'},
            {minlength: '14', maxlength: '19', value: 'Singapour (+65)'},
            {minlength: '14', maxlength: '19', value: 'Thaïlande (+66)'},
            {minlength: '14', maxlength: '19', value: 'Timor oriental (+670)'},
            {minlength: '14', maxlength: '19', value: 'Norfolk Island (+672)'},
            {minlength: '14', maxlength: '19', value: 'Brunei (+673)'},
            {minlength: '14', maxlength: '19', value: 'Nauru (+674)'},
            {minlength: '14', maxlength: '19', value: 'Papouasie-Nouvelle-Guinée (+675)'},
            {minlength: '14', maxlength: '19', value: 'Tonga (+676)'},
            {minlength: '14', maxlength: '19', value: 'Salomon (+677)'},
            {minlength: '14', maxlength: '19', value: 'Vanuatu (+678)'},
            {minlength: '14', maxlength: '19', value: 'Fidji (+679)'},
            {minlength: '14', maxlength: '19', value: 'Palaos (+680)'},
            {minlength: '14', maxlength: '19', value: 'Wallis-et-Futuna (+681)'},
            {minlength: '14', maxlength: '19', value: 'Îles Cook (+682)'},
            {minlength: '14', maxlength: '19', value: 'Niue (+683)'},
            {minlength: '14', maxlength: '19', value: 'Samoa américaines (+1684)'},
            {minlength: '14', maxlength: '19', value: 'Samoa (+685)'},
            {minlength: '14', maxlength: '19', value: 'Kiribati (+686)'},
            {minlength: '14', maxlength: '19', value: 'Nouvelle-Calédonie (+687)'},
            {minlength: '14', maxlength: '19', value: 'Tuvalu (+688)'},
            {minlength: '14', maxlength: '19', value: 'Polynésie française (+689)'},
            {minlength: '14', maxlength: '19', value: 'Tokelau (+690)'},
            {minlength: '14', maxlength: '19', value: 'États fédérés de Micronésie (+691)'},
            {minlength: '14', maxlength: '19', value: 'Îles Marshall (+692)'},
            {minlength: '14', maxlength: '19', value: 'Kazakhstan (+7)'},
            {minlength: '14', maxlength: '19', value: 'Russie (+7)'},
            {minlength: '14', maxlength: '19', value: 'Japon (+81)'},
            {minlength: '14', maxlength: '19', value: 'Corée du Sud (+82)'},
            {minlength: '14', maxlength: '19', value: 'Viêtnam (+84)'},
            {minlength: '14', maxlength: '19', value: 'Corée du Nord (+850)'},
            {minlength: '14', maxlength: '19', value: 'Hong Kong (+852)'},
            {minlength: '14', maxlength: '19', value: 'Macao (+853)'},
            {minlength: '14', maxlength: '19', value: 'Cambodge (+855)'},
            {minlength: '14', maxlength: '19', value: 'Laos (+856)'},
            {minlength: '14', maxlength: '19', value: 'Chine (+86)'},
            {minlength: '14', maxlength: '19', value: 'Bangladesh (+880)'},
            {minlength: '14', maxlength: '19', value: 'Taïwan (+886)'},
            {minlength: '14', maxlength: '19', value: 'Turquie (+90)'},
            {minlength: '14', maxlength: '19', value: 'Inde (+91)'},
            {minlength: '14', maxlength: '19', value: 'Pakistan (+92)'},
            {minlength: '14', maxlength: '19', value: 'Afghanistan (+93)'},
            {minlength: '14', maxlength: '19', value: 'Sri Lanka (+94)'},
            {minlength: '14', maxlength: '19', value: 'Birmanie (+95)'},
            {minlength: '14', maxlength: '19', value: 'Maldives (+960)'},
            {minlength: '14', maxlength: '19', value: 'Liban (+961)'},
            {minlength: '14', maxlength: '19', value: 'Jordanie (+962)'},
            {minlength: '14', maxlength: '19', value: 'Syrie (+963)'},
            {minlength: '14', maxlength: '19', value: 'Irak (+964)'},
            {minlength: '14', maxlength: '19', value: 'Koweït (+965)'},
            {minlength: '14', maxlength: '19', value: 'Arabie saoudite (+966)'},
            {minlength: '14', maxlength: '19', value: 'Yémen (+967)'},
            {minlength: '14', maxlength: '19', value: 'Oman (+968)'},
            {minlength: '14', maxlength: '19', value: 'Palestine (+970)'},
            {minlength: '14', maxlength: '19', value: 'Émirats arabes unis (+971)'},
            {minlength: '14', maxlength: '19', value: 'Israël (+972)'},
            {minlength: '14', maxlength: '19', value: 'Bahreïn (+973)'},
            {minlength: '14', maxlength: '19', value: 'Qatar (+974)'},
            {minlength: '14', maxlength: '19', value: 'Bhoutan (+975)'},
            {minlength: '14', maxlength: '19', value: 'Mongolie (+976)'},
            {minlength: '14', maxlength: '19', value: 'Népal (+977)'},
            {minlength: '14', maxlength: '19', value: 'Iran (+98)'},
            {minlength: '14', maxlength: '19', value: 'Tadjikistan (+992)'},
            {minlength: '14', maxlength: '19', value: 'Turkménistan (+993)'},
            {minlength: '14', maxlength: '19', value: 'Azerbaïdjan (+994)'},
            {minlength: '14', maxlength: '19', value: 'Géorgie (+995)'},
            {minlength: '14', maxlength: '19', value: 'Kirghizistan (+996)'}
        ];
        var countrySelector = $('#' + NPC.BV._BV_FORMID).find("#country");

        indicatifList.sort(function (a, b) {
            return a.value.toString().localeCompare(b.value);
        });
        indicatifList.forEach((option) => {
            var isActive = option.value === 'France (+33)' ? ' class="active"' : '';
            countrySelector.append(`<option data-minlength="${option.minlength}" data-maxlength="${option.maxlength}" value="${option.value}">${option.value}</option>`);
            countrySelector.parent().find('ul').append(`<li select-value="${option.value}" role="bouton" ${isActive} tabindex="-1">${option.value}</li>`);
        });

        countrySelector[0].value = 'France (+33)';
        countrySelector.parent().find('.npc-bv-selected')[0].innerText = 'France (+33)';
        
    }

    /**
     * Méthode Privée
	 * Initialise deux datepicker, en fonction de la date du jour, possibilité d'exclure les jours fériés
     */
    function initDatePickerAppointment(){
        var $birthdatepicker = $('#birthdateForm.js-appointmentCalendar');
		var $dayformdatepicker = $('#dayForm.js-appointmentCalendar');
	
		var lang = 'fr';
	
		// les jours fériés
		var natDays = [ "2017-11-30",
		"2017-12-25", "2018-01-01" ];
	
		if ($birthdatepicker.length) {
			var disabledDates = [];
	
			// force format
			for (var i = 0; i < natDays.length; i++) {
				disabledDates[i] = $.fn.datepicker.DPGlobal.formatDate(new Date(natDays[i]), $.fn.datepicker.dates[lang]['format'], lang);
			}
	
			var startDate = new Date('01/01/1850'), endDate = new Date();
	
			$birthdatepicker.datepicker({
				language : lang,
				startView : 2,
				startDate : startDate, // set start date
				endDate : endDate, // set end date
				autoclose : true
			});
		}
	
		if ($dayformdatepicker.length) {

			$dayformdatepicker.datepicker({
				todayBtn : 'linked',
				language : lang,
				startDate : new Date(),
				autoclose : true,
				todayHighlight : true,
				datesDisabled : disabledDates,
				daysOfWeekDisabled : [ 0, 1 ]
			});
	
		}
    }

    /**
     * Méthode privée
     * Initalise les triggers du formulaire
     */
    function initFormTrigger(){
        $('#phonenumberForm').on('keypress change keyup', function(e) {

            $(this).val(function(index, value) {
                return value.replace(/\W/gi, '').replace(/(.{2})/g, '$1 ').trim();
            });
        });
    
        $('#country').on('change', function() {
            var selectedElement = $(this).find("option:selected");
            $("#phonenumberForm").attr('maxlength', $(selectedElement).data('maxlength')).attr('minlength', $(selectedElement).data('minlength')).val("");
        });
        
        $('button[data-id=country]').on('click', function() {
           $("#emailNewContainer .glyphicon").remove();
       });
    
        $(window).on('datePicker.init.appointment', function() {
            initDatePickerAppointment();
        });
    
    }

    /**
     * Méthode privée
     * Replissage des champs su l'utilisateur est connecté (Nom, Prenom, Civilité, email)
     */
    function loadDataConnectedClient(){
        var modelData = NPC.BV.$_BV_WRAPPER.data('value').modelData;
        // Pré remplissage des champs nom et prénom
		var informationsClient = modelData != undefined ? modelData?.informationsClient : null;
		var nomClient = '';
		var prenomClient = '';
		var civiliteClient = '';

		if (informationsClient != null) {
			var prenomsClient = informationsClient.firstNames;
			// choix des prénoms
			if (prenomsClient != null && prenomsClient.length > 0) {
				prenomClient = prenomsClient.join(" ");
			}
			// choix du nom
			var namesOfIndividualPerson = informationsClient.namesOfIndividualPerson;
			if (namesOfIndividualPerson != null) {
				if (namesOfIndividualPerson.usualName != null && namesOfIndividualPerson.usualName.trim() != "") {
					nomClient = namesOfIndividualPerson.usualName;
				} else if (namesOfIndividualPerson.marriedName != null && namesOfIndividualPerson.marriedName.trim() != "") {
					nomClient = namesOfIndividualPerson.marriedName;
				} else if (namesOfIndividualPerson.lastName != null && namesOfIndividualPerson.lastName.trim() != "") {
					nomClient = namesOfIndividualPerson.lastName;
				}
			}
			civiliteClient = (informationsClient.titleLongLabel != null) ? informationsClient.titleLongLabel : "";

		}

		$('#lastname').val(nomClient);
		$('#firstname').val(prenomClient);
		if (NPC.utilisateur.email != null) {
			$('#emailForm').val(NPC.utilisateur.email);
		}

		$("#civility option").each(function() {
			if (this.value === civiliteClient) {
				$(this).prop("selected", true);
                $(this).parent().value = civiliteClient;
                $(this).parent().parent().find('.npc-bv-selected')[0].innerText = civiliteClient;
			}
		});
		$("#civility").change();
    }


    /**
     * Méthode Publique
     * Méthode de création des triggers du formulaire
     */
    NPC.BV.FUNCTIONS.FORM.createFormTrigger = function(){
        $('#' + NPC.BV._BV_FORMID).on('submit', function(e) {
            e.preventDefault();
            if (!NPC.user.isConnected) {
                var boutonVertCaptchaElement = getBtnVertCaptcha();
                if (boutonVertCaptchaElement.length > 0){
                    boutonVertCaptchaElement.npcCaptcha("validate",function(){
                        validateBvForm();
                        });
                } else {
                    validateBvForm();
                }
    
            } else {
                validateBvForm();
            }
        });

        $('#phonenumberForm').on('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    /**
     * Méthode Publique
     * Méthode d'initialisation du formulaire du formulaire
     */
    NPC.BV.FUNCTIONS.FORM.initForm = function(){
        NPC.BV.$_BV_CAPTCHA = $('#' + NPC.BV._BV_CAPTCHA);
        initBvIndicatif();
        loadDataConnectedClient();
        initSelectorBV();
        initFormTrigger();
        refreshCaptcha();
        loadCaptcha();
        $(window).trigger('datePicker.init.appointment');
        $('#' + NPC.BV._BV_FORMID).find("#birthdateForm").datepicker("refresh");
        $('#' + NPC.BV._BV_FORMID).find("#dayForm").datepicker("refresh");
    }
}
function initOpenCloseBV() {

    NPC.BV.FUNCTIONS.OPENCLOSE = {};

    function _setTriggerBVLoaded(){
		$(window)
			.off("startBV.loaded")
			.on("startBV.loaded", function() {
				$(window).trigger('open.bv');
		});
	}

    /**
     * Méthode publique
	 * Methode qui ouvre le bouton vert
	 */
	NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert = function() {
		if (NPC.BV.isBoutonVertOpen) {
			return;
		}

		var numeroCR = NPC.idLiveCopyCaisse;
		_setTriggerBVLoaded();
		NPC.BV._BV_THEME = {};
		NPC.BV.FUNCTIONS.setDefaultCardStatus();

		if (numeroCR != "master" && numeroCR != "national") {
			NPC.BV.FUNCTIONS.InitBvData();
			$(window).trigger("startBV.loaded");
		} else if (numeroCR == "master") {
			NPC.BV.FUNCTIONS.manageBubblesMaster();
		} else if (numeroCR == "national") {
			$(window).trigger("startBV.loaded");
		}

        if(!NPC.BV.$_BV_WRAPPER.data('value').erreurGpu){
            NPC.BV.FUNCTIONS.loadDefaultPanel();
        }
		
	};

	/**
     * Méthode publique
	 * Méthode qui est jouée pour fermer le bouton vert
	 */
	NPC.BV.FUNCTIONS.OPENCLOSE.closeBV = function() {
		$(window).trigger('close.bv');
		NPC.layoutTriggerd = false;
		NPC.BV.ORIGIN[0].focus();
	};

	/**
     * Méthode publique
	 * Méthode qui est jouée pour ouvrir le bouton vert au chargement de la page
	 */
    NPC.BV.FUNCTIONS.OPENCLOSE.onReady = function(){
        var cr = NPC.idLiveCopyCaisse;
		var boutonVertRequired = NPC.recupererCookie("ouvrirBoutonVert");
		var boutonVertRequiredModeCo = NPC.recupererCookie("ouvrirBoutonVertModeConnecte");
		var parcoursRdvRequired = NPC.recupererCookie("boutonvertParcoursRdv");
		var parcoursEmailRequired = NPC.recupererCookie("boutonvertParcoursEmail");
		var parcoursStoreLocatorRequired = NPC.recupererCookie("boutonvertParcoursStorelocator");
		var isConnected = NPC.user?.isConnected;
	
		// Trouver un numéro d'agence		
		if (isConnected && parcoursRdvRequired && !NPC.puPriseRdvActivated) { // Prise de rdv
			NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
			NPC.BV.FUNCTIONS.loadChoicePanelRDV();
			NPC.supprimerCookie("boutonvertParcoursRdv");

		} else if (isConnected && parcoursRdvRequired && NPC.puPriseRdvActivated) {
			var marcheUser = NPC.utilisateur.libMarcheUtilisateur;

			if (marcheUser == "particulier" || marcheUser == "banque-privee") {
				NPC.affecterCookie("ouvrirBoutonVertModeConnecte", false);
				window.location.href = "profil/banque-moi/prendre-un-rdv.html";
			}

			else {
				NPC.affecterCookie("ouvrirBoutonVertModeConnecte", false);
				window.location.href = "profil/banque-vous/prendre-un-rdv.html";
			}
			NPC.supprimerCookie("boutonvertParcoursRdv");

		}

		// Messagerie
		else if (isConnected && parcoursEmailRequired && !NPC.puMessagerieSecuriseeActivated) {
			NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
			NPC.BV.FUNCTIONS.loadChoicePanelEMAIL();
			NPC.supprimerCookie("boutonvertParcoursEmail");

		}

		else if (isConnected && parcoursEmailRequired && NPC.puMessagerieSecuriseeActivated) {
			var marcheUser = NPC.utilisateur.libMarcheUtilisateur;

			if (marcheUser == "particulier" || marcheUser == "banque-privee") {
				NPC.affecterCookie("ouvrirBoutonVertModeConnecte", false);
				window.location.href = "profil/banque-moi/messagerie/msecriture.html";
			}

			else {
				NPC.affecterCookie("ouvrirBoutonVertModeConnecte", false);
				window.location.href = "profil/banque-vous/messagerie/msecriture.html";
			}
			NPC.supprimerCookie("boutonvertParcoursEmail");

		}

		else if (isConnected && boutonVertRequiredModeCo === "true") {
			NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
			NPC.supprimerCookie("ouvrirBoutonVertModeConnecte");
			if (!localStorage.getItem('npcd')) {
				localStorage.setItem('BVModeConnecteOuvert', true);
			}
		}

		else if (cr != undefined && cr != NPC.constantes.ID_CR_NATIONAL && boutonVertRequired) {
			NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
			NPC.supprimerCookie("ouvrirBoutonVert");
		}

		else if (isConnected && parcoursStoreLocatorRequired) {
			NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
			NPC.supprimerCookie("boutonvertParcoursStorelocator");
		}
    }

	/**
	 * Methode privée
	 * Set des trigger pour l'ouverture du bouton vert
	 */
    function openBvTrigger(){
        /** 
         * Trigger d'ouverture du bouton vert depuis le header
         */
        $('.Header-help--bouton-vert--trigger').on('click', function() {
			NPC.BV.ORIGIN = $(this);
            NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
        });

        $('.bv-trigger-burger').on('click', function(e) {
            e.preventDefault();
            $(window).trigger('close.layerNav');
			NPC.BV.ORIGIN = $(this);
            NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();

        });

        // pour ouvrir le bouton vert au click quand on est sur le c110
        $(document).on('click', '.openBV', function() {
			NPC.BV.ORIGIN = $(this);
            NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
        });

        $(window).on("triggerBV", function() {
            NPC.BV.FUNCTIONS.OPENCLOSE.ouvrirBoutonVert();
        });
    }

    function closeBvTrigger(){
        $(document).on('click', 'button.ficheAgence', function() {
            NPC.BV.FUNCTIONS.OPENCLOSE.closeBV();
        });
    }


    function isPhoneTablette() {
        return (NPC && NPC.informationNavigateur && NPC.informationNavigateur.mobile);
      };

      openBvTrigger();
      closeBvTrigger();
      
  
    $(document).on('click', '.puPriseDeRdvActivated', function(e) {
        
        // si on est sur descktop mettre le cookie pour reouvrir le bouton vert
        if(isPhoneTablette() == false){
            NPC.affecterCookie("ouvrirBoutonVertModeConnecte", true);
        }
        
    });

    $(document).on('click', '.puMessagerieSecuriseeActivated', function(e) {
        // si on est sur descktop mettre le cookie pour reouvrir le bouton vert
        if(isPhoneTablette() == false){
            NPC.affecterCookie("ouvrirBoutonVertModeConnecte", true);
        }
    });

    $(document).on('click', '.loginGreenBtn', function() {
		NPC.affecterCookie("ouvrirBoutonVertModeConnecte", true);
	});

    $(document).on('click', '.js-bv-trigger-natioUrgence', function() {
		NPC.affecterCookie("ouvrirBoutonVert", true);
	});

    $(document).on('click', '#lienConnexionClientAccesCompte', function() {
        switch(NPC.BV.CURRENT_PARCOUR.parcourName){
            case 'parcoursRdv':
                NPC.affecterCookie("boutonvertParcoursRdv", true);
                break;
            case 'parcoursEmail':
                NPC.affecterCookie("boutonvertParcoursEmail", true);
                break;
            case 'storelocator':
                NPC.affecterCookie("boutonvertParcoursStorelocator", true);
                break;
        }
	});
	
    //Scroll TO TOP

    const scrollTopListQuery = [
        '.js-storeLoc-agency',
        '.GreenBtn-GMap-more',
        '.GreenBtn-callbackHomeContentContactMail',
        '.GreenBtn-callbackHomeContentContactMeeting',
        '#rdv', 
        '#sendEmail', 
        '.TrouverNumeroAgenceLien', 
        '#sendEmailForm'
    ]

    $(document).on('click', scrollTopListQuery.join(', '), function(){
		CommonNPC.scrollTo(0);
    });
}
/**
 * jQuery Validation Plugin 1.9.0
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2006 - 2011 JÃ¶rn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

    $.extend($.fn, {
        // http://docs.jquery.com/Plugins/Validation/validate
        validate: function( options ) {

            // if nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
                return;
            }

            // check if a validator for this form was already created
            var validator = $.data(this[0], 'validator');
            if ( validator ) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr('novalidate', 'novalidate');

            validator = new $.validator( options, this[0] );
            $.data(this[0], 'validator', validator);

            if ( validator.settings.onsubmit ) {

                var inputsAndButtons = this.find("input, button");

                // allow suppresing validation by adding a cancel class to the submit button
                inputsAndButtons.filter(".cancel").click(function () {
                    validator.cancelSubmit = true;
                });

                // when a submitHandler is used, capture the submitting button
                if (validator.settings.submitHandler) {
                    inputsAndButtons.filter(":submit").click(function () {
                        validator.submitButton = this;
                    });
                }

                // validate the form on submit
                this.submit( function( event ) {
                    if ( validator.settings.debug )
                    // prevent form submit to be able to see console output
                        event.preventDefault();

                    function handle() {
                        if ( validator.settings.submitHandler ) {
                            if (validator.submitButton) {
                                // insert a hidden input as a replacement for the missing submit button
                                var hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
                            }
                            validator.settings.submitHandler.call( validator, validator.currentForm );
                            if (validator.submitButton) {
                                // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            return false;
                        }
                        return true;
                    }

                    // prevent submit for invalid forms or custom submit handlers
                    if ( validator.cancelSubmit ) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if ( validator.form() ) {
                        if ( validator.pendingRequest ) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },
        // http://docs.jquery.com/Plugins/Validation/valid
        valid: function() {
            if ( $(this[0]).is('form')) {
                return this.validate().form();
            } else {
                var valid = true;
                var validator = $(this[0].form).validate();
                this.each(function() {
                    valid &= validator.element(this);
                });
                return valid;
            }
        },
        // attributes: space seperated list of attributes to retrieve and remove
        removeAttrs: function(attributes) {
            var result = {},
                $element = this;
            $.each(attributes.split(/\s/), function(index, value) {
                result[value] = $element.attr(value);
                $element.removeAttr(value);
            });
            return result;
        },
        // http://docs.jquery.com/Plugins/Validation/rules
        rules: function(command, argument) {
            var element = this[0];

            if (command) {
                var settings = $.data(element.form, 'validator').settings;
                var staticRules = settings.rules;
                var existingRules = $.validator.staticRules(element);
                switch(command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        staticRules[element.name] = existingRules;
                        if (argument.messages)
                            settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        var filtered = {};
                        $.each(argument.split(/\s/), function(index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                        });
                        return filtered;
                }
            }

            var data = $.validator.normalizeRules(
                $.extend(
                    {},
                    $.validator.metadataRules(element),
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.staticRules(element)
                ), element);

            // make sure required is at front
            if (data.required) {
                var param = data.required;
                delete data.required;
                data = $.extend({required: param}, data);
            }

            return data;
        }
    });

// Custom selectors
    $.extend($.expr[":"], {
        // http://docs.jquery.com/Plugins/Validation/blank
        blank: function(a) {return !$.trim("" + a.value);},
        // http://docs.jquery.com/Plugins/Validation/filled
        filled: function(a) {return !!$.trim("" + a.value);},
        // http://docs.jquery.com/Plugins/Validation/unchecked
        unchecked: function(a) {return !a.checked;}
    });

// constructor for validator
    $.validator = function( options, form ) {
        this.settings = $.extend( true, {}, $.validator.defaults, options );
        this.currentForm = form;
        this.init();
    };

    $.validator.format = function(source, params) {
        if ( arguments.length == 1 )
            return function() {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply( this, args );
            };
        if ( arguments.length > 2 && params.constructor != Array  ) {
            params = $.makeArray(arguments).slice(1);
        }
        if ( params.constructor != Array ) {
            params = [ params ];
        }
        $.each(params, function(i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: $( [] ),
            errorLabelContainer: $( [] ),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function(element, event) {
                this.lastActive = element;

                // hide error label and remove error class on focus if enabled
                if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
                    this.settings.unhighlight && this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                    this.addWrapper(this.errorsFor(element)).hide();
                }
            },
            onfocusout: function(element, event) {
                if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
                    this.element(element);
                }
            },
            onkeyup: function(element, event) {
                /* GRANITE:START */
                /*if ( element.name in this.submitted || element == this.lastElement ) {
                    this.element(element);
                }*/
                this.valid();
                this.element(element)
                /* GRANITE:END */
            },
            onclick: function(element, event) {
                // click on selects, radiobuttons and checkboxes
                if ( element.name in this.submitted )
                    this.element(element);
                // or option elements, check parent select in that case
                else if (element.parentNode.name in this.submitted)
                    this.element(element.parentNode);
            },
            highlight: function(element, errorClass, validClass) {
                if (element.type === 'radio') {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                if (element.type === 'radio') {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
        setDefaults: function(settings) {
            $.extend( $.validator.defaults, settings );
        },

        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            accept: "Please enter a value with a valid extension.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function() {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = (this.groups = {});
                $.each(this.settings.groups, function(key, value) {
                    $.each(value.split(/\s/), function(index, name) {
                        groups[name] = key;
                    });
                });
                var rules = this.settings.rules;
                $.each(rules, function(key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var validator = $.data(this[0].form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, "");
                    validator.settings[eventType] && validator.settings[eventType].call(validator, this[0], event);
                }
                $(this.currentForm)
                    .validateDelegate("[type='text'], [type='password'], [type='file'], select, textarea, " +
                    "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                    "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                    "[type='week'], [type='time'], [type='datetime-local'], " +
                    "[type='range'], [type='color'] ",
                    "focusin focusout keyup", delegate)
                    .validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

                if (this.settings.invalidHandler)
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/form
            form: function() {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid())
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                this.showErrors();
                return this.valid();
            },

            checkForm: function() {
                this.prepareForm();
                for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
                    this.check( elements[i] );
                }
                return this.valid();
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/element
            element: function( element ) {
                element = this.validationTargetFor( this.clean( element ) );
                this.lastElement = element;
                this.prepareElement( element );
                this.currentElements = $(element);
                var result = this.check( element );
                if ( result ) {
                    delete this.invalid[element.name];
                } else {
                    this.invalid[element.name] = true;
                }
                if ( !this.numberOfInvalids() ) {
                    // Hide error containers on last error
                    this.toHide = this.toHide.add( this.containers );
                }
                this.showErrors();
                return result;
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/showErrors
            showErrors: function(errors) {
                if(errors) {
                    // add items to error list and map
                    $.extend( this.errorMap, errors );
                    this.errorList = [];
                    for ( var name in errors ) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    // remove items from success list
                    this.successList = $.grep( this.successList, function(element) {
                        return !(element.name in errors);
                    });
                }
                this.settings.showErrors
                    ? this.settings.showErrors.call( this, this.errorMap, this.errorList )
                    : this.defaultShowErrors();
            },

            // http://docs.jquery.com/Plugins/Validation/Validator/resetForm
            resetForm: function() {
                if ( $.fn.resetForm )
                    $( this.currentForm ).resetForm();
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass( this.settings.errorClass );
            },

            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },

            objectLength: function( obj ) {
                var count = 0;
                for ( var i in obj )
                    count++;
                return count;
            },

            hideErrors: function() {
                this.addWrapper( this.toHide ).hide();
            },

            valid: function() {
                return this.size() == 0;
            },

            size: function() {
                return this.errorList.length;
            },

            focusInvalid: function() {
                if( this.settings.focusInvalid ) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                            .filter(":visible")
                            .focus()
                            // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                            .trigger("focusin");
                    } catch(e) {
                        // ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function() {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function(n) {
                    return n.element.name == lastActive.name;
                }).length == 1 && lastActive;
            },

            elements: function() {
                var validator = this,
                    rulesCache = {};

                // select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm)
                    .find("input, select, textarea")
                    .not(":submit, :reset, :image, [disabled]")
                    .not( this.settings.ignore )
                    .filter(function() {
                        !this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);

                        // select only the first element for each name, and only those with rules specified
                        if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
                            return false;

                        rulesCache[this.name] = true;
                        return true;
                    });
            },

            clean: function( selector ) {
                return $( selector )[0];
            },

            errors: function() {
                return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
            },

            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },

            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add( this.containers );
            },

            prepareElement: function( element ) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            check: function( element ) {
                element = this.validationTargetFor( this.clean( element ) );

                var rules = $(element).rules();
                var dependencyMismatch = false;
                for (var method in rules ) {
                    var rule = { method: method, parameters: rules[method] };
                    try {
                        var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );

                        // if a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if ( result == "dependency-mismatch" ) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if ( result == "pending" ) {
                            this.toHide = this.toHide.not( this.errorsFor(element) );
                            return;
                        }

                        if( !result ) {
                            this.formatAndAdd( element, rule );
                            return false;
                        }
                    } catch(e) {
                        this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
                            + ", check the '" + rule.method + "' method", e);
                        throw e;
                    }
                }
                if (dependencyMismatch)
                    return;
                if ( this.objectLength(rules) )
                    this.successList.push(element);
                return true;
            },

            // return the custom message for the given element and validation method
            // specified in the element's "messages" metadata
            customMetaMessage: function(element, method) {
                if (!$.metadata)
                    return;

                var meta = this.settings.meta
                    ? $(element).metadata()[this.settings.meta]
                    : $(element).metadata();

                return meta && meta.messages && meta.messages[method];
            },

            // return the custom message for the given element name and validation method
            customMessage: function( name, method ) {
                var m = this.settings.messages[name];
                return m && (m.constructor == String
                    ? m
                    : m[method]);
            },

            // return the first defined argument, allowing empty strings
            findDefined: function() {
                for(var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined)
                        return arguments[i];
                }
                return undefined;
            },

            defaultMessage: function( element, method) {
                return this.findDefined(
                    this.customMessage( element.name, method ),
                    this.customMetaMessage( element, method ),
                    // title is never undefined, so handle empty string as undefined
                    !this.settings.ignoreTitle && element.title || undefined,
                    $.validator.messages[method],
                    "<strong>Warning: No message defined for " + element.name + "</strong>"
                );
            },

            formatAndAdd: function( element, rule ) {
                var message = this.defaultMessage( element, rule.method ),
                    theregex = /\$?\{(\d+)\}/g;
                if ( typeof message == "function" ) {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
                }
                this.errorList.push({
                    message: message,
                    element: element
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function(toToggle) {
                if ( this.settings.wrapper )
                    toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
                return toToggle;
            },

            defaultShowErrors: function() {
                for ( var i = 0; this.errorList[i]; i++ ) {
                    var error = this.errorList[i];
                    this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                    this.showLabel( error.element, error.message );
                }
                if( this.errorList.length ) {
                    this.toShow = this.toShow.add( this.containers );
                }
                if (this.settings.success) {
                    for ( var i = 0; this.successList[i]; i++ ) {
                        this.showLabel( this.successList[i] );
                    }
                }
                if (this.settings.unhighlight) {
                    for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
                        this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                    }
                }
                this.toHide = this.toHide.not( this.toShow );
                this.hideErrors();
                this.addWrapper( this.toShow ).show();
            },

            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function() {
                return $(this.errorList).map(function() {
                    return this.element;
                });
            },

            showLabel: function(element, message) {
                var label = this.errorsFor( element );
                if ( label.length ) {
                    // refresh error/success class
                    label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

                    // check if we have a generated label, replace the message then
                    label.attr("generated") && label.html(message);
                } else {
                    // create label
                    label = $("<" + this.settings.errorElement + "/>")
                        .attr({"for":  this.idOrName(element), generated: true})
                        .addClass(this.settings.errorClass)
                        .html(message || "");
                    if ( this.settings.wrapper ) {
                        // make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if ( !this.labelContainer.append(label).length )
                        this.settings.errorPlacement
                            ? this.settings.errorPlacement(label, $(element) )
                            : label.insertAfter(element);
                }
                if ( !message && this.settings.success ) {
                    label.text("");
                    typeof this.settings.success == "string"
                        ? label.addClass( this.settings.success )
                        : this.settings.success( label );
                }
                this.toShow = this.toShow.add(label);
            },

            errorsFor: function(element) {
                var name = this.idOrName(element);
                return this.errors().filter(function() {
                    return $(this).attr('for') == name;
                });
            },

            idOrName: function(element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },

            validationTargetFor: function(element) {
                // if radio/checkbox, validate first element in group instead
                if (this.checkable(element)) {
                    element = this.findByName( element.name ).not(this.settings.ignore)[0];
                }
                return element;
            },

            checkable: function( element ) {
                return /radio|checkbox/i.test(element.type);
            },

            findByName: function( name ) {
                // select by name and filter by form for performance over form.find("[name=...]")
                var form = this.currentForm;
                return $(document.getElementsByName(name)).map(function(index, element) {
                    return element.form == form && element.name == name && element  || null;
                });
            },

            getLength: function(value, element) {
                switch( element.nodeName.toLowerCase() ) {
                    case 'select':
                        return $("option:selected", element).length;
                    case 'input':
                        if( this.checkable( element) )
                            return this.findByName(element.name).filter(':checked').length;
                }
                return value.length;
            },

            depend: function(param, element) {
                return this.dependTypes[typeof param]
                    ? this.dependTypes[typeof param](param, element)
                    : true;
            },

            dependTypes: {
                "boolean": function(param, element) {
                    return param;
                },
                "string": function(param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function(param, element) {
                    return param(element);
                }
            },

            optional: function(element) {
                return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
            },

            startRequest: function(element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function(element, valid) {
                this.pendingRequest--;
                // sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0)
                    this.pendingRequest = 0;
                delete this.pending[element.name];
                if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function(element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage( element, "remote" )
                });
            }

        },

        classRuleSettings: {
            required: {required: true},
            email: {email: true},
            url: {url: true},
            date: {date: true},
            dateISO: {dateISO: true},
            dateDE: {dateDE: true},
            number: {number: true},
            numberDE: {numberDE: true},
            digits: {digits: true},
            creditcard: {creditcard: true}
        },

        addClassRules: function(className, rules) {
            className.constructor == String ?
                this.classRuleSettings[className] = rules :
                $.extend(this.classRuleSettings, className);
        },

        classRules: function(element) {
            var rules = {};
            var classes = $(element).attr('class');
            classes && $.each(classes.split(' '), function() {
                if (this in $.validator.classRuleSettings) {
                    $.extend(rules, $.validator.classRuleSettings[this]);
                }
            });
            return rules;
        },

        attributeRules: function(element) {
            var rules = {};
            var $element = $(element);

            for (var method in $.validator.methods) {
                var value;
                // If .prop exists (jQuery >= 1.6), use it to get true/false for required
                if (method === 'required' && typeof $.fn.prop === 'function') {
                    value = $element.prop(method);
                } else {
                    value = $element.attr(method);
                }
                if (value) {
                    rules[method] = value;
                } else if ($element[0].getAttribute("type") === method) {
                    rules[method] = true;
                }
            }

            // maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }

            return rules;
        },

        metadataRules: function(element) {
            if (!$.metadata) return {};

            var meta = $.data(element.form, 'validator').settings.meta;
            return meta ?
                $(element).metadata()[meta] :
                $(element).metadata();
        },

        staticRules: function(element) {
            var rules = {};
            var validator = $.data(element.form, 'validator');
            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function(rules, element) {
            // handle dependency check
            $.each(rules, function(prop, val) {
                // ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });

            // evaluate parameters
            $.each(rules, function(rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });

            // clean number parameters
            $.each(['minlength', 'maxlength', 'min', 'max'], function() {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(['rangelength', 'range'], function() {
                if (rules[this]) {
                    rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                }
            });

            if ($.validator.autoCreateRanges) {
                // auto-create ranges
                if (rules.min && rules.max) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength && rules.maxlength) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            // To support custom messages in metadata ignore rule methods titled "messages"
            if (rules.messages) {
                delete rules.messages;
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function(data) {
            if( typeof data == "string" ) {
                var transformed = {};
                $.each(data.split(/\s/), function() {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },

        // http://docs.jquery.com/Plugins/Validation/Validator/addMethod
        addMethod: function(name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        methods: {

            // http://docs.jquery.com/Plugins/Validation/Methods/required
            required: function(value, element, param) {
                // check if dependency is met
                if ( !this.depend(param, element) )
                    return "dependency-mismatch";
                switch( element.nodeName.toLowerCase() ) {
                    case 'select':
                        // could be an array for select-multiple or a string, both are fine this way
                        var val = $(element).val();
                        return val && val.length > 0;
                    case 'input':
                        if ( this.checkable(element) )
                            return this.getLength(value, element) > 0;
                    default:
                        return $.trim(value).length > 0;
                }
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/remote
            remote: function(value, element, param) {
                if ( this.optional(element) )
                    return "dependency-mismatch";

                var previous = this.previousValue(element);
                if (!this.settings.messages[element.name] )
                    this.settings.messages[element.name] = {};
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;

                param = typeof param == "string" && {url:param} || param;

                if ( this.pending[element.name] ) {
                    return "pending";
                }
                if ( previous.old === value ) {
                    return previous.valid;
                }

                previous.old = value;
                var validator = this;
                this.startRequest(element);
                var data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    success: function(response) {
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        var valid = response === true;
                        if ( valid ) {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            validator.showErrors();
                        } else {
                            var errors = {};
                            var message = response || validator.defaultMessage( element, "remote" );
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/minlength
            minlength: function(value, element, param) {
                return this.optional(element) || this.getLength($.trim(value), element) >= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/maxlength
            maxlength: function(value, element, param) {
                return this.optional(element) || this.getLength($.trim(value), element) <= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/rangelength
            rangelength: function(value, element, param) {
                var length = this.getLength($.trim(value), element);
                return this.optional(element) || ( length >= param[0] && length <= param[1] );
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/min
            min: function( value, element, param ) {
                return this.optional(element) || value >= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/max
            max: function( value, element, param ) {
                return this.optional(element) || value <= param;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/range
            range: function( value, element, param ) {
                return this.optional(element) || ( value >= param[0] && value <= param[1] );
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/email
            email: function(value, element) {
                // contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/url
            url: function(value, element) {
                // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
                return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/date
            date: function(value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/dateISO
            dateISO: function(value, element) {
                return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/number
            number: function(value, element) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/digits
            digits: function(value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/creditcard
            // based on http://en.wikipedia.org/wiki/Luhn
            creditcard: function(value, element) {
                if ( this.optional(element) )
                    return "dependency-mismatch";
                // accept only spaces, digits and dashes
                if (/[^0-9 -]+/.test(value))
                    return false;
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false;

                value = value.replace(/\D/g, "");

                for (var n = value.length - 1; n >= 0; n--) {
                    var cDigit = value.charAt(n);
                    var nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9)
                            nDigit -= 9;
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return (nCheck % 10) == 0;
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/accept
            accept: function(value, element, param) {
                param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            },

            // http://docs.jquery.com/Plugins/Validation/Methods/equalTo
            equalTo: function(value, element, param) {
                // bind to the blur event of the target in order to revalidate whenever the target field is updated
                // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
                var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    $(element).valid();
                });
                return value == target.val();
            }

        }

    });

// deprecated, use $.validator.format instead
    $.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
;(function($) {
    var pendingRequests = {};
    // Use a prefilter if available (1.5+)
    if ( $.ajaxPrefilter ) {
        $.ajaxPrefilter(function(settings, _, xhr) {
            var port = settings.port;
            if (settings.mode == "abort") {
                if ( pendingRequests[port] ) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        // Proxy ajax
        var ajax = $.ajax;
        $.ajax = function(settings) {
            var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
                port = ( "port" in settings ? settings : $.ajaxSettings ).port;
            if (mode == "abort") {
                if ( pendingRequests[port] ) {
                    pendingRequests[port].abort();
                }
                return (pendingRequests[port] = ajax.apply(this, arguments));
            }
            return ajax.apply(this, arguments);
        };
    }
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
;(function($) {
    // only implement if not provided by jQuery core (since 1.4)
    // TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
    if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
        $.each({
            focus: 'focusin',
            blur: 'focusout'
        }, function( original, fix ){
            $.event.special[fix] = {
                setup:function() {
                    this.addEventListener( original, handler, true );
                },
                teardown:function() {
                    this.removeEventListener( original, handler, true );
                },
                handler: function(e) {
                    arguments[0] = $.event.fix(e);
                    arguments[0].type = fix;
                    return $.event.handle.apply(this, arguments);
                }
            };
            function handler(e) {
                e = $.event.fix(e);
                e.type = fix;
                return $.event.handle.call(this, e);
            }
        });
    };
    $.extend($.fn, {
        validateDelegate: function(delegate, type, handler) {
            return this.bind(type, function(event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });
})(jQuery);

/*!
 * jQuery Validation Plugin v1.16.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 JÃ¶rn Zaefferer
 * Released under the MIT license
 */
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "./jquery.validate"], factory );
	} else if (typeof module === "object" && module.exports) {
		module.exports = factory( require( "jquery" ) );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

( function() {

	function stripHtml( value ) {

		// Remove html tags and space chars
		return value.replace( /<.[^<>]*?>/g, " " ).replace( /&nbsp;|&#160;/gi, " " )

		// Remove punctuation
		.replace( /[.(),;:!?%#$'\"_+=\/\-â€œâ€â€™]*/g, "" );
	}

	$.validator.addMethod( "maxWords", function( value, element, params ) {
		return this.optional( element ) || stripHtml( value ).match( /\b\w+\b/g ).length <= params;
	}, $.validator.format( "Please enter {0} words or less." ) );

	$.validator.addMethod( "minWords", function( value, element, params ) {
		return this.optional( element ) || stripHtml( value ).match( /\b\w+\b/g ).length >= params;
	}, $.validator.format( "Please enter at least {0} words." ) );

	$.validator.addMethod( "rangeWords", function( value, element, params ) {
		var valueStripped = stripHtml( value ),
			regex = /\b\w+\b/g;
		return this.optional( element ) || valueStripped.match( regex ).length >= params[ 0 ] && valueStripped.match( regex ).length <= params[ 1 ];
	}, $.validator.format( "Please enter between {0} and {1} words." ) );

}() );

// Accept a value from a file input based on a required mimetype
$.validator.addMethod( "accept", function( value, element, param ) {

	// Split mime on commas in case we have multiple types we can accept
	var typeParam = typeof param === "string" ? param.replace( /\s/g, "" ) : "image/*",
		optionalValue = this.optional( element ),
		i, file, regex;

	// Element is optional
	if ( optionalValue ) {
		return optionalValue;
	}

	if ( $( element ).attr( "type" ) === "file" ) {

		// Escape string to be used in the regex
		// see: http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
		// Escape also "/*" as "/.*" as a wildcard
		typeParam = typeParam
				.replace( /[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&" )
				.replace( /,/g, "|" )
				.replace( /\/\*/g, "/.*" );

		// Check if the element has a FileList before checking each file
		if ( element.files && element.files.length ) {
			regex = new RegExp( ".?(" + typeParam + ")$", "i" );
			for ( i = 0; i < element.files.length; i++ ) {
				file = element.files[ i ];

				// Grab the mimetype from the loaded file, verify it matches
				if ( !file.type.match( regex ) ) {
					return false;
				}
			}
		}
	}

	// Either return true because we've validated each file, or because the
	// browser does not support element.files and the FileList feature
	return true;
}, $.validator.format( "Please enter a value with a valid mimetype." ) );

$.validator.addMethod( "alphanumeric", function( value, element ) {
	return this.optional( element ) || /^\w+$/i.test( value );
}, "Letters, numbers, and underscores only please" );

/*
 * Dutch bank account numbers (not 'giro' numbers) have 9 digits
 * and pass the '11 check'.
 * We accept the notation with spaces, as that is common.
 * acceptable: 123456789 or 12 34 56 789
 */
$.validator.addMethod( "bankaccountNL", function( value, element ) {
	if ( this.optional( element ) ) {
		return true;
	}
	if ( !( /^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test( value ) ) ) {
		return false;
	}

	// Now '11 check'
	var account = value.replace( / /g, "" ), // Remove spaces
		sum = 0,
		len = account.length,
		pos, factor, digit;
	for ( pos = 0; pos < len; pos++ ) {
		factor = len - pos;
		digit = account.substring( pos, pos + 1 );
		sum = sum + factor * digit;
	}
	return sum % 11 === 0;
}, "Please specify a valid bank account number" );

$.validator.addMethod( "bankorgiroaccountNL", function( value, element ) {
	return this.optional( element ) ||
			( $.validator.methods.bankaccountNL.call( this, value, element ) ) ||
			( $.validator.methods.giroaccountNL.call( this, value, element ) );
}, "Please specify a valid bank or giro account number" );

/**
 * BIC is the business identifier code (ISO 9362). This BIC check is not a guarantee for authenticity.
 *
 * BIC pattern: BBBBCCLLbbb (8 or 11 characters long; bbb is optional)
 *
 * Validation is case-insensitive. Please make sure to normalize input yourself.
 *
 * BIC definition in detail:
 * - First 4 characters - bank code (only letters)
 * - Next 2 characters - ISO 3166-1 alpha-2 country code (only letters)
 * - Next 2 characters - location code (letters and digits)
 *   a. shall not start with '0' or '1'
 *   b. second character must be a letter ('O' is not allowed) or digit ('0' for test (therefore not allowed), '1' denoting passive participant, '2' typically reverse-billing)
 * - Last 3 characters - branch code, optional (shall not start with 'X' except in case of 'XXX' for primary office) (letters and digits)
 */
$.validator.addMethod( "bic", function( value, element ) {
    return this.optional( element ) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-9])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test( value.toUpperCase() );
}, "Please specify a valid BIC code" );

/*
 * CÃ³digo de identificaciÃ³n fiscal ( CIF ) is the tax identification code for Spanish legal entities
 * Further rules can be found in Spanish on http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
 *
 * Spanish CIF structure:
 *
 * [ T ][ P ][ P ][ N ][ N ][ N ][ N ][ N ][ C ]
 *
 * Where:
 *
 * T: 1 character. Kind of Organization Letter: [ABCDEFGHJKLMNPQRSUVW]
 * P: 2 characters. Province.
 * N: 5 characters. Secuencial Number within the province.
 * C: 1 character. Control Digit: [0-9A-J].
 *
 * [ T ]: Kind of Organizations. Possible values:
 *
 *   A. Corporations
 *   B. LLCs
 *   C. General partnerships
 *   D. Companies limited partnerships
 *   E. Communities of goods
 *   F. Cooperative Societies
 *   G. Associations
 *   H. Communities of homeowners in horizontal property regime
 *   J. Civil Societies
 *   K. Old format
 *   L. Old format
 *   M. Old format
 *   N. Nonresident entities
 *   P. Local authorities
 *   Q. Autonomous bodies, state or not, and the like, and congregations and religious institutions
 *   R. Congregations and religious institutions (since 2008 ORDER EHA/451/2008)
 *   S. Organs of State Administration and regions
 *   V. Agrarian Transformation
 *   W. Permanent establishments of non-resident in Spain
 *
 * [ C ]: Control Digit. It can be a number or a letter depending on T value:
 * [ T ]  -->  [ C ]
 * ------    ----------
 *   A         Number
 *   B         Number
 *   E         Number
 *   H         Number
 *   K         Letter
 *   P         Letter
 *   Q         Letter
 *   S         Letter
 *
 */
$.validator.addMethod( "cifES", function( value ) {
	"use strict";

	var cifRegEx = new RegExp( /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/gi );
	var letter  = value.substring( 0, 1 ), // [ T ]
		number  = value.substring( 1, 8 ), // [ P ][ P ][ N ][ N ][ N ][ N ][ N ]
		control = value.substring( 8, 9 ), // [ C ]
		all_sum = 0,
		even_sum = 0,
		odd_sum = 0,
		i, n,
		control_digit,
		control_letter;

	function isOdd( n ) {
		return n % 2 === 0;
	}

	// Quick format test
	if ( value.length !== 9 || !cifRegEx.test( value ) ) {
		return false;
	}

	for ( i = 0; i < number.length; i++ ) {
		n = parseInt( number[ i ], 10 );

		// Odd positions
		if ( isOdd( i ) ) {

			// Odd positions are multiplied first.
			n *= 2;

			// If the multiplication is bigger than 10 we need to adjust
			odd_sum += n < 10 ? n : n - 9;

		// Even positions
		// Just sum them
		} else {
			even_sum += n;
		}
	}

	all_sum = even_sum + odd_sum;
	control_digit = ( 10 - ( all_sum ).toString().substr( -1 ) ).toString();
	control_digit = parseInt( control_digit, 10 ) > 9 ? "0" : control_digit;
	control_letter = "JABCDEFGHI".substr( control_digit, 1 ).toString();

	// Control must be a digit
	if ( letter.match( /[ABEH]/ ) ) {
		return control === control_digit;

	// Control must be a letter
	} else if ( letter.match( /[KPQS]/ ) ) {
		return control === control_letter;

	// Can be either
	} else {
		return control === control_digit || control === control_letter;
	}

	return false;

}, "Please specify a valid CIF number." );

/*
 * Brazillian CPF number (Cadastrado de Pessoas FÃ­sicas) is the equivalent of a Brazilian tax registration number.
 * CPF numbers have 11 digits in total: 9 numbers followed by 2 check numbers that are being used for validation.
 */
$.validator.addMethod( "cpfBR", function( value ) {

	// Removing special characters from value
	value = value.replace( /([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "" );

	// Checking value to have 11 digits only
	if ( value.length !== 11 ) {
		return false;
	}

	var sum = 0,
		firstCN, secondCN, checkResult, i;

	firstCN = parseInt( value.substring( 9, 10 ), 10 );
	secondCN = parseInt( value.substring( 10, 11 ), 10 );

	checkResult = function( sum, cn ) {
		var result = ( sum * 10 ) % 11;
		if ( ( result === 10 ) || ( result === 11 ) ) {
			result = 0;
		}
		return ( result === cn );
	};

	// Checking for dump data
	if ( value === "" ||
		value === "00000000000" ||
		value === "11111111111" ||
		value === "22222222222" ||
		value === "33333333333" ||
		value === "44444444444" ||
		value === "55555555555" ||
		value === "66666666666" ||
		value === "77777777777" ||
		value === "88888888888" ||
		value === "99999999999"
	) {
		return false;
	}

	// Step 1 - using first Check Number:
	for ( i = 1; i <= 9; i++ ) {
		sum = sum + parseInt( value.substring( i - 1, i ), 10 ) * ( 11 - i );
	}

	// If first Check Number (CN) is valid, move to Step 2 - using second Check Number:
	if ( checkResult( sum, firstCN ) ) {
		sum = 0;
		for ( i = 1; i <= 10; i++ ) {
			sum = sum + parseInt( value.substring( i - 1, i ), 10 ) * ( 12 - i );
		}
		return checkResult( sum, secondCN );
	}
	return false;

}, "Please specify a valid CPF number" );

// http://jqueryvalidation.org/creditcard-method/
// based on http://en.wikipedia.org/wiki/Luhn_algorithm
$.validator.addMethod( "creditcard", function( value, element ) {
	if ( this.optional( element ) ) {
		return "dependency-mismatch";
	}

	// Accept only spaces, digits and dashes
	if ( /[^0-9 \-]+/.test( value ) ) {
		return false;
	}

	var nCheck = 0,
		nDigit = 0,
		bEven = false,
		n, cDigit;

	value = value.replace( /\D/g, "" );

	// Basing min and max length on
	// http://developer.ean.com/general_info/Valid_Credit_Card_Types
	if ( value.length < 13 || value.length > 19 ) {
		return false;
	}

	for ( n = value.length - 1; n >= 0; n-- ) {
		cDigit = value.charAt( n );
		nDigit = parseInt( cDigit, 10 );
		if ( bEven ) {
			if ( ( nDigit *= 2 ) > 9 ) {
				nDigit -= 9;
			}
		}

		nCheck += nDigit;
		bEven = !bEven;
	}

	return ( nCheck % 10 ) === 0;
}, "Please enter a valid credit card number." );

/* NOTICE: Modified version of Castle.Components.Validator.CreditCardValidator
 * Redistributed under the the Apache License 2.0 at http://www.apache.org/licenses/LICENSE-2.0
 * Valid Types: mastercard, visa, amex, dinersclub, enroute, discover, jcb, unknown, all (overrides all other settings)
 */
$.validator.addMethod( "creditcardtypes", function( value, element, param ) {
	if ( /[^0-9\-]+/.test( value ) ) {
		return false;
	}

	value = value.replace( /\D/g, "" );

	var validTypes = 0x0000;

	if ( param.mastercard ) {
		validTypes |= 0x0001;
	}
	if ( param.visa ) {
		validTypes |= 0x0002;
	}
	if ( param.amex ) {
		validTypes |= 0x0004;
	}
	if ( param.dinersclub ) {
		validTypes |= 0x0008;
	}
	if ( param.enroute ) {
		validTypes |= 0x0010;
	}
	if ( param.discover ) {
		validTypes |= 0x0020;
	}
	if ( param.jcb ) {
		validTypes |= 0x0040;
	}
	if ( param.unknown ) {
		validTypes |= 0x0080;
	}
	if ( param.all ) {
		validTypes = 0x0001 | 0x0002 | 0x0004 | 0x0008 | 0x0010 | 0x0020 | 0x0040 | 0x0080;
	}
	if ( validTypes & 0x0001 && /^(5[12345])/.test( value ) ) { // Mastercard
		return value.length === 16;
	}
	if ( validTypes & 0x0002 && /^(4)/.test( value ) ) { // Visa
		return value.length === 16;
	}
	if ( validTypes & 0x0004 && /^(3[47])/.test( value ) ) { // Amex
		return value.length === 15;
	}
	if ( validTypes & 0x0008 && /^(3(0[012345]|[68]))/.test( value ) ) { // Dinersclub
		return value.length === 14;
	}
	if ( validTypes & 0x0010 && /^(2(014|149))/.test( value ) ) { // Enroute
		return value.length === 15;
	}
	if ( validTypes & 0x0020 && /^(6011)/.test( value ) ) { // Discover
		return value.length === 16;
	}
	if ( validTypes & 0x0040 && /^(3)/.test( value ) ) { // Jcb
		return value.length === 16;
	}
	if ( validTypes & 0x0040 && /^(2131|1800)/.test( value ) ) { // Jcb
		return value.length === 15;
	}
	if ( validTypes & 0x0080 ) { // Unknown
		return true;
	}
	return false;
}, "Please enter a valid credit card number." );

/**
 * Validates currencies with any given symbols by @jameslouiz
 * Symbols can be optional or required. Symbols required by default
 *
 * Usage examples:
 *  currency: ["Â£", false] - Use false for soft currency validation
 *  currency: ["$", false]
 *  currency: ["RM", false] - also works with text based symbols such as "RM" - Malaysia Ringgit etc
 *
 *  <input class="currencyInput" name="currencyInput">
 *
 * Soft symbol checking
 *  currencyInput: {
 *     currency: ["$", false]
 *  }
 *
 * Strict symbol checking (default)
 *  currencyInput: {
 *     currency: "$"
 *     //OR
 *     currency: ["$", true]
 *  }
 *
 * Multiple Symbols
 *  currencyInput: {
 *     currency: "$,Â£,Â¢"
 *  }
 */
$.validator.addMethod( "currency", function( value, element, param ) {
    var isParamString = typeof param === "string",
        symbol = isParamString ? param : param[ 0 ],
        soft = isParamString ? true : param[ 1 ],
        regex;

    symbol = symbol.replace( /,/g, "" );
    symbol = soft ? symbol + "]" : symbol + "]?";
    regex = "^[" + symbol + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$";
    regex = new RegExp( regex );
    return this.optional( element ) || regex.test( value );

}, "Please specify a valid currency" );

$.validator.addMethod( "dateFA", function( value, element ) {
	return this.optional( element ) || /^[1-4]\d{3}\/((0?[1-6]\/((3[0-1])|([1-2][0-9])|(0?[1-9])))|((1[0-2]|(0?[7-9]))\/(30|([1-2][0-9])|(0?[1-9]))))$/.test( value );
}, $.validator.messages.date );

/**
 * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
 *
 * @example $.validator.methods.date("01/01/1900")
 * @result true
 *
 * @example $.validator.methods.date("01/13/1990")
 * @result false
 *
 * @example $.validator.methods.date("01.01.1900")
 * @result false
 *
 * @example <input name="pippo" class="{dateITA:true}" />
 * @desc Declares an optional input element whose value must be a valid date.
 *
 * @name $.validator.methods.dateITA
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */
$.validator.addMethod( "dateITA", function( value, element ) {
	var check = false,
		re = /^\d{1,2}\/\d{1,2}\/\d{4}$/,
		adata, gg, mm, aaaa, xdata;
	if ( re.test( value ) ) {
		adata = value.split( "/" );
		gg = parseInt( adata[ 0 ], 10 );
		mm = parseInt( adata[ 1 ], 10 );
		aaaa = parseInt( adata[ 2 ], 10 );
		xdata = new Date( Date.UTC( aaaa, mm - 1, gg, 12, 0, 0, 0 ) );
		if ( ( xdata.getUTCFullYear() === aaaa ) && ( xdata.getUTCMonth() === mm - 1 ) && ( xdata.getUTCDate() === gg ) ) {
			check = true;
		} else {
			check = false;
		}
	} else {
		check = false;
	}
	return this.optional( element ) || check;
}, $.validator.messages.date );

$.validator.addMethod( "dateNL", function( value, element ) {
	return this.optional( element ) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test( value );
}, $.validator.messages.date );

// Older "accept" file extension method. Old docs: http://docs.jquery.com/Plugins/Validation/Methods/accept
$.validator.addMethod( "extension", function( value, element, param ) {
	param = typeof param === "string" ? param.replace( /,/g, "|" ) : "png|jpe?g|gif";
	return this.optional( element ) || value.match( new RegExp( "\\.(" + param + ")$", "i" ) );
}, $.validator.format( "Please enter a value with a valid extension." ) );

/**
 * Dutch giro account numbers (not bank numbers) have max 7 digits
 */
$.validator.addMethod( "giroaccountNL", function( value, element ) {
	return this.optional( element ) || /^[0-9]{1,7}$/.test( value );
}, "Please specify a valid giro account number" );

/**
 * IBAN is the international bank account number.
 * It has a country - specific format, that is checked here too
 *
 * Validation is case-insensitive. Please make sure to normalize input yourself.
 */
$.validator.addMethod( "iban", function( value, element ) {

	// Some quick simple tests to prevent needless work
	if ( this.optional( element ) ) {
		return true;
	}

	// Remove spaces and to upper case
	var iban = value.replace( / /g, "" ).toUpperCase(),
		ibancheckdigits = "",
		leadingZeroes = true,
		cRest = "",
		cOperator = "",
		countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

	// Check for IBAN code length.
	// It contains:
	// country code ISO 3166-1 - two letters,
	// two check digits,
	// Basic Bank Account Number (BBAN) - up to 30 chars
	var minimalIBANlength = 5;
	if ( iban.length < minimalIBANlength ) {
		return false;
	}

	// Check the country code and find the country specific format
	countrycode = iban.substring( 0, 2 );
	bbancountrypatterns = {
		"AL": "\\d{8}[\\dA-Z]{16}",
		"AD": "\\d{8}[\\dA-Z]{12}",
		"AT": "\\d{16}",
		"AZ": "[\\dA-Z]{4}\\d{20}",
		"BE": "\\d{12}",
		"BH": "[A-Z]{4}[\\dA-Z]{14}",
		"BA": "\\d{16}",
		"BR": "\\d{23}[A-Z][\\dA-Z]",
		"BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
		"CR": "\\d{17}",
		"HR": "\\d{17}",
		"CY": "\\d{8}[\\dA-Z]{16}",
		"CZ": "\\d{20}",
		"DK": "\\d{14}",
		"DO": "[A-Z]{4}\\d{20}",
		"EE": "\\d{16}",
		"FO": "\\d{14}",
		"FI": "\\d{14}",
		"FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
		"GE": "[\\dA-Z]{2}\\d{16}",
		"DE": "\\d{18}",
		"GI": "[A-Z]{4}[\\dA-Z]{15}",
		"GR": "\\d{7}[\\dA-Z]{16}",
		"GL": "\\d{14}",
		"GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
		"HU": "\\d{24}",
		"IS": "\\d{22}",
		"IE": "[\\dA-Z]{4}\\d{14}",
		"IL": "\\d{19}",
		"IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
		"KZ": "\\d{3}[\\dA-Z]{13}",
		"KW": "[A-Z]{4}[\\dA-Z]{22}",
		"LV": "[A-Z]{4}[\\dA-Z]{13}",
		"LB": "\\d{4}[\\dA-Z]{20}",
		"LI": "\\d{5}[\\dA-Z]{12}",
		"LT": "\\d{16}",
		"LU": "\\d{3}[\\dA-Z]{13}",
		"MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
		"MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
		"MR": "\\d{23}",
		"MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
		"MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
		"MD": "[\\dA-Z]{2}\\d{18}",
		"ME": "\\d{18}",
		"NL": "[A-Z]{4}\\d{10}",
		"NO": "\\d{11}",
		"PK": "[\\dA-Z]{4}\\d{16}",
		"PS": "[\\dA-Z]{4}\\d{21}",
		"PL": "\\d{24}",
		"PT": "\\d{21}",
		"RO": "[A-Z]{4}[\\dA-Z]{16}",
		"SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
		"SA": "\\d{2}[\\dA-Z]{18}",
		"RS": "\\d{18}",
		"SK": "\\d{20}",
		"SI": "\\d{15}",
		"ES": "\\d{20}",
		"SE": "\\d{20}",
		"CH": "\\d{5}[\\dA-Z]{12}",
		"TN": "\\d{20}",
		"TR": "\\d{5}[\\dA-Z]{17}",
		"AE": "\\d{3}\\d{16}",
		"GB": "[A-Z]{4}\\d{14}",
		"VG": "[\\dA-Z]{4}\\d{16}"
	};

	bbanpattern = bbancountrypatterns[ countrycode ];

	// As new countries will start using IBAN in the
	// future, we only check if the countrycode is known.
	// This prevents false negatives, while almost all
	// false positives introduced by this, will be caught
	// by the checksum validation below anyway.
	// Strict checking should return FALSE for unknown
	// countries.
	if ( typeof bbanpattern !== "undefined" ) {
		ibanregexp = new RegExp( "^[A-Z]{2}\\d{2}" + bbanpattern + "$", "" );
		if ( !( ibanregexp.test( iban ) ) ) {
			return false; // Invalid country specific format
		}
	}

	// Now check the checksum, first convert to digits
	ibancheck = iban.substring( 4, iban.length ) + iban.substring( 0, 4 );
	for ( i = 0; i < ibancheck.length; i++ ) {
		charAt = ibancheck.charAt( i );
		if ( charAt !== "0" ) {
			leadingZeroes = false;
		}
		if ( !leadingZeroes ) {
			ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf( charAt );
		}
	}

	// Calculate the result of: ibancheckdigits % 97
	for ( p = 0; p < ibancheckdigits.length; p++ ) {
		cChar = ibancheckdigits.charAt( p );
		cOperator = "" + cRest + "" + cChar;
		cRest = cOperator % 97;
	}
	return cRest === 1;
}, "Please specify a valid IBAN" );

$.validator.addMethod( "integer", function( value, element ) {
	return this.optional( element ) || /^-?\d+$/.test( value );
}, "A positive or negative non-decimal number please" );

$.validator.addMethod( "ipv4", function( value, element ) {
	return this.optional( element ) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test( value );
}, "Please enter a valid IP v4 address." );

$.validator.addMethod( "ipv6", function( value, element ) {
	return this.optional( element ) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test( value );
}, "Please enter a valid IP v6 address." );

$.validator.addMethod( "lettersonly", function( value, element ) {
	return this.optional( element ) || /^[a-z]+$/i.test( value );
}, "Letters only please" );

$.validator.addMethod( "letterswithbasicpunc", function( value, element ) {
	return this.optional( element ) || /^[a-z\-.,()'"\s]+$/i.test( value );
}, "Letters or punctuation only please" );

$.validator.addMethod( "mobileNL", function( value, element ) {
	return this.optional( element ) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test( value );
}, "Please specify a valid mobile number" );

/* For UK phone functions, do the following server side processing:
 * Compare original input with this RegEx pattern:
 * ^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
 * Extract $1 and set $prefix to '+44<space>' if $1 is '44', otherwise set $prefix to '0'
 * Extract $2 and remove hyphens, spaces and parentheses. Phone number is combined $prefix and $2.
 * A number of very detailed GB telephone number RegEx patterns can also be found at:
 * http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
 */
$.validator.addMethod( "mobileUK", function( phone_number, element ) {
	phone_number = phone_number.replace( /\(|\)|\s+|-/g, "" );
	return this.optional( element ) || phone_number.length > 9 &&
		phone_number.match( /^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/ );
}, "Please specify a valid mobile number" );

/*
 * The NIE (NÃºmero de IdentificaciÃ³n de Extranjero) is a Spanish tax identification number assigned by the Spanish
 * authorities to any foreigner.
 *
 * The NIE is the equivalent of a Spaniards NÃºmero de IdentificaciÃ³n Fiscal (NIF) which serves as a fiscal
 * identification number. The CIF number (Certificado de IdentificaciÃ³n Fiscal) is equivalent to the NIF, but applies to
 * companies rather than individuals. The NIE consists of an 'X' or 'Y' followed by 7 or 8 digits then another letter.
 */
$.validator.addMethod( "nieES", function( value ) {
	"use strict";

	var nieRegEx = new RegExp( /^[MXYZ]{1}[0-9]{7,8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/gi );
	var validChars = "TRWAGMYFPDXBNJZSQVHLCKET",
		letter = value.substr( value.length - 1 ).toUpperCase(),
		number;

	value = value.toString().toUpperCase();

	// Quick format test
	if ( value.length > 10 || value.length < 9 || !nieRegEx.test( value ) ) {
		return false;
	}

	// X means same number
	// Y means number + 10000000
	// Z means number + 20000000
	value = value.replace( /^[X]/, "0" )
		.replace( /^[Y]/, "1" )
		.replace( /^[Z]/, "2" );

	number = value.length === 9 ? value.substr( 0, 8 ) : value.substr( 0, 9 );

	return validChars.charAt( parseInt( number, 10 ) % 23 ) === letter;

}, "Please specify a valid NIE number." );

/*
 * The NÃºmero de IdentificaciÃ³n Fiscal ( NIF ) is the way tax identification used in Spain for individuals
 */
$.validator.addMethod( "nifES", function( value ) {
	"use strict";

	value = value.toUpperCase();

	// Basic format test
	if ( !value.match( "((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)" ) ) {
		return false;
	}

	// Test NIF
	if ( /^[0-9]{8}[A-Z]{1}$/.test( value ) ) {
		return ( "TRWAGMYFPDXBNJZSQVHLCKE".charAt( value.substring( 8, 0 ) % 23 ) === value.charAt( 8 ) );
	}

	// Test specials NIF (starts with K, L or M)
	if ( /^[KLM]{1}/.test( value ) ) {
		return ( value[ 8 ] === String.fromCharCode( 64 ) );
	}

	return false;

}, "Please specify a valid NIF number." );

$.validator.addMethod( "notEqualTo", function( value, element, param ) {
	return this.optional( element ) || !$.validator.methods.equalTo.call( this, value, element, param );
}, "Please enter a different value, values must not be the same." );

$.validator.addMethod( "nowhitespace", function( value, element ) {
	return this.optional( element ) || /^\S+$/i.test( value );
}, "No white space please" );

/**
* Return true if the field value matches the given format RegExp
*
* @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
* @result true
*
* @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
* @result false
*
* @name $.validator.methods.pattern
* @type Boolean
* @cat Plugins/Validate/Methods
*/
$.validator.addMethod( "pattern", function( value, element, param ) {
	if ( this.optional( element ) ) {
		return true;
	}
	if ( typeof param === "string" ) {
		param = new RegExp( "^(?:" + param + ")$" );
	}
	return param.test( value );
}, "Invalid format." );

/**
 * Dutch phone numbers have 10 digits (or 11 and start with +31).
 */
$.validator.addMethod( "phoneNL", function( value, element ) {
	return this.optional( element ) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test( value );
}, "Please specify a valid phone number." );

/* For UK phone functions, do the following server side processing:
 * Compare original input with this RegEx pattern:
 * ^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
 * Extract $1 and set $prefix to '+44<space>' if $1 is '44', otherwise set $prefix to '0'
 * Extract $2 and remove hyphens, spaces and parentheses. Phone number is combined $prefix and $2.
 * A number of very detailed GB telephone number RegEx patterns can also be found at:
 * http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
 */

// Matches UK landline + mobile, accepting only 01-3 for landline or 07 for mobile to exclude many premium numbers
$.validator.addMethod( "phonesUK", function( phone_number, element ) {
	phone_number = phone_number.replace( /\(|\)|\s+|-/g, "" );
	return this.optional( element ) || phone_number.length > 9 &&
		phone_number.match( /^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/ );
}, "Please specify a valid uk phone number" );

/* For UK phone functions, do the following server side processing:
 * Compare original input with this RegEx pattern:
 * ^\(?(?:(?:00\)?[\s\-]?\(?|\+)(44)\)?[\s\-]?\(?(?:0\)?[\s\-]?\(?)?|0)([1-9]\d{1,4}\)?[\s\d\-]+)$
 * Extract $1 and set $prefix to '+44<space>' if $1 is '44', otherwise set $prefix to '0'
 * Extract $2 and remove hyphens, spaces and parentheses. Phone number is combined $prefix and $2.
 * A number of very detailed GB telephone number RegEx patterns can also be found at:
 * http://www.aa-asterisk.org.uk/index.php/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers
 */
$.validator.addMethod( "phoneUK", function( phone_number, element ) {
	phone_number = phone_number.replace( /\(|\)|\s+|-/g, "" );
	return this.optional( element ) || phone_number.length > 9 &&
		phone_number.match( /^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/ );
}, "Please specify a valid phone number" );

/**
 * Matches US phone number format
 *
 * where the area code may not start with 1 and the prefix may not start with 1
 * allows '-' or ' ' as a separator and allows parens around area code
 * some people may want to put a '1' in front of their number
 *
 * 1(212)-999-2345 or
 * 212 999 2344 or
 * 212-999-0983
 *
 * but not
 * 111-123-5434
 * and not
 * 212 123 4567
 */
$.validator.addMethod( "phoneUS", function( phone_number, element ) {
	phone_number = phone_number.replace( /\s+/g, "" );
	return this.optional( element ) || phone_number.length > 9 &&
		phone_number.match( /^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/ );
}, "Please specify a valid phone number" );

/*
* Valida CEPs do brasileiros:
*
* Formatos aceitos:
* 99999-999
* 99.999-999
* 99999999
*/
$.validator.addMethod( "postalcodeBR", function( cep_value, element ) {
	return this.optional( element ) || /^\d{2}.\d{3}-\d{3}?$|^\d{5}-?\d{3}?$/.test( cep_value );
}, "Informe um CEP vÃ¡lido." );

/**
 * Matches a valid Canadian Postal Code
 *
 * @example jQuery.validator.methods.postalCodeCA( "H0H 0H0", element )
 * @result true
 *
 * @example jQuery.validator.methods.postalCodeCA( "H0H0H0", element )
 * @result false
 *
 * @name jQuery.validator.methods.postalCodeCA
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */
$.validator.addMethod( "postalCodeCA", function( value, element ) {
	return this.optional( element ) || /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ] *\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i.test( value );
}, "Please specify a valid postal code" );

/* Matches Italian postcode (CAP) */
$.validator.addMethod( "postalcodeIT", function( value, element ) {
	return this.optional( element ) || /^\d{5}$/.test( value );
}, "Please specify a valid postal code" );

$.validator.addMethod( "postalcodeNL", function( value, element ) {
	return this.optional( element ) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test( value );
}, "Please specify a valid postal code" );

// Matches UK postcode. Does not match to UK Channel Islands that have their own postcodes (non standard UK)
$.validator.addMethod( "postcodeUK", function( value, element ) {
	return this.optional( element ) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test( value );
}, "Please specify a valid UK postcode" );

/*
 * Lets you say "at least X inputs that match selector Y must be filled."
 *
 * The end result is that neither of these inputs:
 *
 *	<input class="productinfo" name="partnumber">
 *	<input class="productinfo" name="description">
 *
 *	...will validate unless at least one of them is filled.
 *
 * partnumber:	{require_from_group: [1,".productinfo"]},
 * description: {require_from_group: [1,".productinfo"]}
 *
 * options[0]: number of fields that must be filled in the group
 * options[1]: CSS selector that defines the group of conditionally required fields
 */
$.validator.addMethod( "require_from_group", function( value, element, options ) {
	var $fields = $( options[ 1 ], element.form ),
		$fieldsFirst = $fields.eq( 0 ),
		validator = $fieldsFirst.data( "valid_req_grp" ) ? $fieldsFirst.data( "valid_req_grp" ) : $.extend( {}, this ),
		isValid = $fields.filter( function() {
			return validator.elementValue( this );
		} ).length >= options[ 0 ];

	// Store the cloned validator for future validation
	$fieldsFirst.data( "valid_req_grp", validator );

	// If element isn't being validated, run each require_from_group field's validation rules
	if ( !$( element ).data( "being_validated" ) ) {
		$fields.data( "being_validated", true );
		$fields.each( function() {
			validator.element( this );
		} );
		$fields.data( "being_validated", false );
	}
	return isValid;
}, $.validator.format( "Please fill at least {0} of these fields." ) );

/*
 * Lets you say "either at least X inputs that match selector Y must be filled,
 * OR they must all be skipped (left blank)."
 *
 * The end result, is that none of these inputs:
 *
 *	<input class="productinfo" name="partnumber">
 *	<input class="productinfo" name="description">
 *	<input class="productinfo" name="color">
 *
 *	...will validate unless either at least two of them are filled,
 *	OR none of them are.
 *
 * partnumber:	{skip_or_fill_minimum: [2,".productinfo"]},
 * description: {skip_or_fill_minimum: [2,".productinfo"]},
 * color:		{skip_or_fill_minimum: [2,".productinfo"]}
 *
 * options[0]: number of fields that must be filled in the group
 * options[1]: CSS selector that defines the group of conditionally required fields
 *
 */
$.validator.addMethod( "skip_or_fill_minimum", function( value, element, options ) {
	var $fields = $( options[ 1 ], element.form ),
		$fieldsFirst = $fields.eq( 0 ),
		validator = $fieldsFirst.data( "valid_skip" ) ? $fieldsFirst.data( "valid_skip" ) : $.extend( {}, this ),
		numberFilled = $fields.filter( function() {
			return validator.elementValue( this );
		} ).length,
		isValid = numberFilled === 0 || numberFilled >= options[ 0 ];

	// Store the cloned validator for future validation
	$fieldsFirst.data( "valid_skip", validator );

	// If element isn't being validated, run each skip_or_fill_minimum field's validation rules
	if ( !$( element ).data( "being_validated" ) ) {
		$fields.data( "being_validated", true );
		$fields.each( function() {
			validator.element( this );
		} );
		$fields.data( "being_validated", false );
	}
	return isValid;
}, $.validator.format( "Please either skip these fields or fill at least {0} of them." ) );

/* Validates US States and/or Territories by @jdforsythe
 * Can be case insensitive or require capitalization - default is case insensitive
 * Can include US Territories or not - default does not
 * Can include US Military postal abbreviations (AA, AE, AP) - default does not
 *
 * Note: "States" always includes DC (District of Colombia)
 *
 * Usage examples:
 *
 *  This is the default - case insensitive, no territories, no military zones
 *  stateInput: {
 *     caseSensitive: false,
 *     includeTerritories: false,
 *     includeMilitary: false
 *  }
 *
 *  Only allow capital letters, no territories, no military zones
 *  stateInput: {
 *     caseSensitive: false
 *  }
 *
 *  Case insensitive, include territories but not military zones
 *  stateInput: {
 *     includeTerritories: true
 *  }
 *
 *  Only allow capital letters, include territories and military zones
 *  stateInput: {
 *     caseSensitive: true,
 *     includeTerritories: true,
 *     includeMilitary: true
 *  }
 *
 */
$.validator.addMethod( "stateUS", function( value, element, options ) {
	var isDefault = typeof options === "undefined",
		caseSensitive = ( isDefault || typeof options.caseSensitive === "undefined" ) ? false : options.caseSensitive,
		includeTerritories = ( isDefault || typeof options.includeTerritories === "undefined" ) ? false : options.includeTerritories,
		includeMilitary = ( isDefault || typeof options.includeMilitary === "undefined" ) ? false : options.includeMilitary,
		regex;

	if ( !includeTerritories && !includeMilitary ) {
		regex = "^(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	} else if ( includeTerritories && includeMilitary ) {
		regex = "^(A[AEKLPRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	} else if ( includeTerritories ) {
		regex = "^(A[KLRSZ]|C[AOT]|D[CE]|FL|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEINOPST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY])$";
	} else {
		regex = "^(A[AEKLPRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[AT]|W[AIVY])$";
	}

	regex = caseSensitive ? new RegExp( regex ) : new RegExp( regex, "i" );
	return this.optional( element ) || regex.test( value );
}, "Please specify a valid state" );

// TODO check if value starts with <, otherwise don't try stripping anything
$.validator.addMethod( "strippedminlength", function( value, element, param ) {
	return $( value ).text().length >= param;
}, $.validator.format( "Please enter at least {0} characters" ) );

$.validator.addMethod( "time", function( value, element ) {
	return this.optional( element ) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test( value );
}, "Please enter a valid time, between 00:00 and 23:59" );

$.validator.addMethod( "time12h", function( value, element ) {
	return this.optional( element ) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test( value );
}, "Please enter a valid time in 12-hour am/pm format" );

// Same as url, but TLD is optional
$.validator.addMethod( "url2", function( value, element ) {
	return this.optional( element ) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test( value );
}, $.validator.messages.url );

/**
 * Return true, if the value is a valid vehicle identification number (VIN).
 *
 * Works with all kind of text inputs.
 *
 * @example <input type="text" size="20" name="VehicleID" class="{required:true,vinUS:true}" />
 * @desc Declares a required input element whose value must be a valid vehicle identification number.
 *
 * @name $.validator.methods.vinUS
 * @type Boolean
 * @cat Plugins/Validate/Methods
 */
$.validator.addMethod( "vinUS", function( v ) {
	if ( v.length !== 17 ) {
		return false;
	}

	var LL = [ "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ],
		VL = [ 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9 ],
		FL = [ 8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2 ],
		rs = 0,
		i, n, d, f, cd, cdv;

	for ( i = 0; i < 17; i++ ) {
		f = FL[ i ];
		d = v.slice( i, i + 1 );
		if ( i === 8 ) {
			cdv = d;
		}
		if ( !isNaN( d ) ) {
			d *= f;
		} else {
			for ( n = 0; n < LL.length; n++ ) {
				if ( d.toUpperCase() === LL[ n ] ) {
					d = VL[ n ];
					d *= f;
					if ( isNaN( cdv ) && n === 8 ) {
						cdv = LL[ n ];
					}
					break;
				}
			}
		}
		rs += d;
	}
	cd = rs % 11;
	if ( cd === 10 ) {
		cd = "X";
	}
	if ( cd === cdv ) {
		return true;
	}
	return false;
}, "The specified vehicle identification number (VIN) is invalid." );

$.validator.addMethod( "zipcodeUS", function( value, element ) {
	return this.optional( element ) || /^\d{5}(-\d{4})?$/.test( value );
}, "The specified US ZIP Code is invalid" );

$.validator.addMethod( "ziprange", function( value, element ) {
	return this.optional( element ) || /^90[2-5]\d\{2\}-\d{4}$/.test( value );
}, "Your ZIP-code must be in the range 902xx-xxxx to 905xx-xxxx" );
return $;
}));
