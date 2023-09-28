
        	var sonDeepFreeze = function(obj){
			    Object.keys(obj).forEach(function(property){
			      	if ((typeof obj[property] === "object" || Array.isArray(obj[property])) && !Object.isFrozen(obj[property])){
			      		sonDeepFreeze(obj[property]);
			      	} 
			    });
			    return Object.freeze(obj);
		  	};
			Object.defineProperty(window, 'SON_CONFIG', {
				value: sonDeepFreeze({"skin":"PrimeScratchCards","displayName":"PrimeScratchCards","license":"MT","family":"PrimeScratchCards","abbrev":"primescratch","braze":false,"cookie_consent":{"name":"son_consent","version":1,"categories":[{"name":"necessary","checked":true,"needed":true,"wanted":true},{"name":"functionality","checked":false,"needed":false,"wanted":true},{"name":"tracking","checked":false,"needed":false,"wanted":true},{"name":"targeting","checked":false,"needed":false,"wanted":true}],"enabled":false},"gtm":null,"gtm_layername":"dataLayer","locale":"EN-IN","lang":"en-in","lang_id":32,"gth_lang_id":32,"segments":["en-in","in"],"affiliate":"house_primescratch0823","dynid":"no_zone","zoneid":"none","currency":{"currency_id":40,"code":"INR","symbol":"₹","symbol_place":"before","country":"IN","rate":80,"currency_decimal":".","currency_separator":","},"apps":{"enabled":false,"ios":{"id":"","available":false,"aths":false},"android":{"available":false,"id":"","ais":false,"aths":false}},"analytics":false,"registration_token":"a20ca1da-93f7-4d4e-a26c-fdaae6d8f9c4","client_type":"subdomain","support_email":"support@primescratchcards.com","interstitial":false,"registeredUser":false,"pnp":{"enabled":false,"payments":[],"pnp_payments_extra":false},"restrictions":true,"domain":"primescratchcards.com","cta":{"url":["https://www.playuzu.mx/mx","https://www.drueckglueck.com/de/","https://www.playuzu.mx/specials/uzuvip-new","https://www.luckyniki.de/vip/vip-punkte/","https://www.luckyniki.de/niki/social/","https://www.playuzu.com/cl/juegos/","https://www.playuzu.com/juegos/","https://www.playuzu.mx/juegos/","https://www.playuzu.com/pe/juegos/","https://www.playuzu.es/juegos/"]},"country_name":"INDIA","device":"wearable","isMobile":false,"browser":"","origin":"https://www.primescratchcards.com","resources":"https://service.image-tech-storage.com/workers/1350","isDev":false,"country":"IN","regionCode":"KA","city":"Dharwad","sub":"www","tld":"com","webcomponents":"https://service.image-tech-storage.com/workers/1350/webcomponents.0fe48638.js"}),
				writable: false
			});
		