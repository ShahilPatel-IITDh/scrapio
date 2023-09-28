$(function(){
	$.message = (function(){
		
	var conf = {
			'vars' : {},
			'classes': new Array(),
			'showTime': 1000,
			'hideTime': 1000,
			'hideOnClick': true,
			'showAnimation': 'bounceInDown',
			'hideAnimation': 'bounceOutUp',
			'idleTime': false,
			'parent': $('body'),
			'hideTriggers': '.close-msg,.msg-link-close'
		},
		syncConf = {
			'showTime': 1000,
			'hideTime': 1000,
			'idleTime': false,
			'showAnimation': 'bounceInDown',
			'hideAnimation': 'bounceOutUp',
			'hideTriggers': '.close-msg,.msg-link-close',
			'parent': $('body'),
			'hideOnClick': true
		},
		layoutLookup = {
			'product-add':{
							html:'<div class="{{klass}}">'+
								 '<p class="msg-text-top">Produto adicionado com sucesso!</p>'+ 
 							     '<p class="msg-text-bottom">Você deseja <a class="msg-link-cart" href="'+base_url+'carrinho">finalizar o pedido</a> ou <a class="msg-link-close" href="javascript:;">continuar comprando</a>?</p>'+
	 					   		     '<a href="javascript:;" class="close-msg">&times;</a>'+
	 					   		  '</div>'
   	 		},
   	 		'product-add-home':{
							html:'<div class="{{klass}} msg-success">'+
								 '<p class="msg-text-top">Produto adicionado com sucesso!</p>'+ 
 							     '<p class="msg-text-bottom">Você deseja <a class="msg-link-cart" href="'+base_url+'carrinho">finalizar o pedido</a> ou <a class="msg-link-close" href="'+base_url+'">continuar comprando</a>?</p>'+
	 					   		     '<a href="javascript:;" class="close-msg">&times;</a>'+
	 					   		  '</div>'
   	 		},
   	 		'price-not-fit':{
							html:'<div class="{{klass}} msg-error">'+
								 '<p class="msg-text-top">O valor mínimo do pedido é de: {{value}}</p>'+ 
 							     '<p class="msg-text-bottom">'+
 							     	  '<a class="msg-link-close" href="'+base_url+'">continue comprando</a>'+		
 							    '</p>'+ 
	 					   		 '<a href="javascript:;" class="close-msg">&times;</a>'+
	 					   		  '</div>'
   	 		},
   	 		'success': {
   	 				html: '<div class="{{klass}}">'+
   	 					'<p class="msg-text-top">{{title}}</p>'+ 
	 					 '<p class="msg-text-bottom">{{content}}</p>'+ 
	 					  '<a href="javascript:;" class="close-msg">&times;</a>'+
   	 					 '</div>'
   	 		},
   	 		'error':{
   	 				html: '<div class="{{klass}}">'+ 
   	 					  '<p class="msg-text-top">{{title}}</p>'+
   	 					  '<p class="msg-text-bottom">{{content}}</p>'+
   	 					   '<a href="javascript:;" class="close-msg">&times;</a>'+
   	 					  '</div>'
   	 		},
   	 		'info':{
   	 				html: '<div class="{{klass}}">'+ 
   	 					  '<p class="msg-text-top">{{title}}</p>'+
   	 					  '<p class="msg-text-bottom">{{content}}</p>'+
   	 					   '<a href="javascript:;" class="close-msg">&times;</a>'+
   	 					  '</div>'
   	 		},
   	 		'warning':{
   	 				html: '<div class="{{klass}}">'+ 
   	 					  '<p class="msg-text-top">{{title}}</p>'+
   	 					  '<p class="msg-text-bottom">{{content}}</p>'+
   	 					   '<a href="javascript:;" class="close-msg">&times;</a>'+
   	 					  '</div>'
   	 		},
   	 		'masked-success':{
   	 				html: '<div class="mask-msg"></div>'+
		   	 			  '<div class="{{klass}}">'+
		   	 				'<p class="msg-text-top">{{title}}</p>'+ 
			 				'<p class="msg-text-bottom">{{content}}</p>'+ 
		   	 			   '</div>'
   	 		},
   	 		'masked-warning':{
   	 				html: '<div class="mask-msg"></div>'+
		   	 			  '<div class="{{klass}}">'+
		   	 				'<p class="msg-text-top">{{title}}</p>'+ 
			 				'<p class="msg-text-bottom">{{content}}</p>'+ 
		   	 			   '</div>'
   	 		},
 		   'masked':{
 				html: '<div class="mask-msg"></div>'+
   	 			  '<div class="{{klass}}">'+
   	 				'<p class="msg-text-top">{{title}}</p>'+ 
	 				'<p class="msg-text-bottom">{{content}}</p>'+ 
   	 			   '</div>'
 			},
 			'product-list-add':{
				html:'<div class="{{klass}} msg-success">'+
						 '<p class="msg-text-top">Produto Adicionado à Lista com sucesso!</p>'+ 
 					     '<p class="msg-text-bottom">Você deseja <a class="msg-link-cart" href="'+base_url+'clientes/listaPresentes">Ver Lista</a> ou <a class="msg-link-close" href="javascript:;">Continuar</a></p>'+ 
	 				     '<a href="javascript:;" class="close-msg">&times;</a>'+
	 				  '</div>'
   	 		},
   	 		'product-list-error':{
				html:'<div class="{{klass}} msg-error">'+
						 '<p class="msg-text-top">Falha ao Adicionar Produto na Lista.</p>'+ 
 					     '<p class="msg-text-bottom">Acesse seu Cadastro e Gerencie sua Lista <a class="msg-link-cart" href="'+base_url+'clientes/login/lista">Aqui</a></p>'+ 
	 				     '<a href="javascript:;" class="close-msg">&times;</a>'+
	 				  '</div>'
   	 		}
 	  	};

		var setConf = function(msgConf){
				if(typeof msgConf !=  'undefined'){
					$.each(msgConf, function(index, value){
						conf[index] = value; 
					});
				}
			},
			hide = function(div, callback){
				var div = $(div),
					mask = div.prev(),
					msg_conf = (div.hasClass('sync-msg')) ? syncConf : conf;

				if(mask.hasClass('mask-msg')){
					mask.fadeOut('slow', function(){ div.remove(); });
				}

				div.removeClass(msg_conf.showAnimation).addClass(msg_conf.hideAnimation);
				setTimeout(function(){ 
					div.remove(); 
					
					if(typeof callback !== 'undefined'){
						callback.call(div);
					}

				}, msg_conf.hideTime);
			},
			setClasses = function(div){
				$(conf.classes).each(function(index, klass){ div.addClass(klass); });
			},
			interpolate = function(html){
				if(typeof conf.vars !== 'undefined'){
					var vars = conf.vars,
						regex = /{{2}[a-zA-Z0-9_-]*\}{2}/g;
						textVars = html.match(regex);


					$.each(textVars, function(index, value){
						keyValue = value.replaceAll('{', '').replaceAll('}', '');

						if(typeof vars[keyValue] !== 'undefined'){	
							html = html.replace(value, vars[keyValue]);
						}else{
							html = html.replace(value, '');
						}
					});
				}

				return html;
			},
			setEvents = function(div){
				var msg_conf = (div.hasClass('sync-msg')) ? syncConf : conf;

				if(msg_conf.hideOnClick){
					div.click(function(){ 
						hide(div); 
					}).find(msg_conf.hideTriggers).click(function(){ 
						hide(div); 
					});
				}

				if(msg_conf.idleTime !== false){
					setTimeout(function(){ 
						hide(div); 
					}, msg_conf.idleTime);
				}
			},
			show = function(type, msgConf){
				var klass ='msg-'+type,
					layout =  layoutLookup[type],
					div = $('.'+klass);

				if(!div.length){
					setConf(msgConf);
					conf.vars.klass = klass;
				
					var div = interpolate(layout.html);
						setClasses(div);
						conf.parent.prepend(div);
						div = conf.parent.children('.'+klass);
						
						div.attr('class', div.attr('class').replace('/^msg$/', ''));
						div.attr('class', 'msg '+div.attr('class'));

					if(!div.hasClass('animated')){
						div.addClass('animated').addClass(conf.showAnimation);
					}	

					setEvents(div);
				}

				return div;
			},
			showSync = function(div, conf){
				if(div.prev().hasClass('mask')){
					var mask = div.prev();
						mask_clone = $(div.prev()).clone(); 
						mask.remove()
				}
				var div_clone = $(div).clone();
					div.remove();

				if(typeof mask_clone !== 'undefined'){
					conf.parent.append(mask_clone.show().after(div_clone));
				}else{
					conf.parent.append(div_clone);
				}

				setEvents(div_clone);
				div_clone.show().addClass('animated').addClass(conf.showAnimation);
			},
			mapSync = function(){
				$('.sync-msg').each(function(index, msg){
					var msg_conf = $(msg).data();
						msg = $(msg);

					$.each(msg_conf, function(key, value){

						if(key.indexOf('time') != -1){
							value = (value * 1000);
						}

						syncConf[key.toCamel()] = value;
					});

					showSync(msg, syncConf);
				});
			};

			return {
				setConf: setConf,
				show: show,
				hide: hide,
				mapSync: mapSync
			}

	})();

	$.message.mapSync();
});