//----------------------------------------------------------------------------
// DCRM: Dynamic CRM                                                          
//----------------------------------------------------------------------------
//                                                                            
// Dynamic Customer Relationship Management                                   
//                                                                            
//  $Id: $
//
//----------------------------------------------------------------------------

dcrm.manager.registerFinder (
            /*
              Your search placement implementation should be here
                  input:
                    contentArgs: a json object with the message attribute from RTIM
                  return:
                    placement:   the best placement you find for this offer as a 
                                 dcrm.Placement object.
            */
            function   ( contentArgs ) {
				if(window.frameElement){
					var webPlacements = $('[data-celebrus-type!=""][data-celebrus-type]').toArray()
					   .sort   (function (el1, el2) {
							var  priority1  = parseInt ($( el1 ).attr('data-celebrus-priority'));
							var  priority2  = parseInt ($( el2 ).attr('data-celebrus-priority'));
							if ( ! priority1 ) priority1 = 0;
							if ( ! priority2 ) priority2 = 0;
							
							return priority2 - priority1;
					});
				}
				else{
					var webPlacements = $('[data-celebrus-type!=""][data-celebrus-type]', window.top.document).toArray()
					   .sort   (function (el1, el2) {
							var  priority1  = parseInt ($( el1 ).attr('data-celebrus-priority'));
							var  priority2  = parseInt ($( el2 ).attr('data-celebrus-priority'));
							if ( ! priority1 ) priority1 = 0;
							if ( ! priority2 ) priority2 = 0;
							
							return priority2 - priority1;
					});
				}
                if (webPlacements.length  < 1) {
                    return null;
                }
				var already_exist = false;
				$("img").each (function(index,item){
					
					if($(item)[0].src.includes(contentArgs.content_ref_web)){
						already_exist = true;
					}
				});
				var index_banner;
				$(webPlacements).each (function(index,item ){
					if( contentArgs.content_type == $(item).attr('content-type') ){
						index_banner = index;
					}
				});
				if(index_banner != undefined &&  !already_exist){
					return new dcrm.Placement (   webPlacements[index_banner],
											$(webPlacements[index_banner]).attr('data-celebrus-type'), {
						"id"           :    $(webPlacements[index_banner]).attr('id'),
						"size"         :    $(webPlacements[index_banner]).attr('data-celebrus-size'),
						"content_type" :	$(webPlacements[index_banner]).attr('content-type')
					});
				}
				
});

dcrm.manager.registerBuilder(
            /*
              The builder type, when you find a placement with the previous finder
              the type of this placement is used a key to find the correct builder
            */
            "banner",
            /*
              Your web content builder method implementation should be here
                  input:
                    contentArgs:   a json object with the message attribute from RTIM
                    placementArgs: the placement arguments you define at the Placement 
                                   object creation (see in the finder)
                    celebrusHelper:an helper provide by the DCRM to ease feedback
                                   sending to Celebrus
                                        use: celebrusHelper.accepted(), to indicate that the offer
                                             is accepted by the user, e.g: when the user click
                                             on a banner
                                             celebrusHelper.refused (), to indicate that the offer
                                             is refused
                                             celebrusHelper.custom  ("<custom>"), to send whatever status
                                             you want
                  return:
                    content:       the web content you build from the message and placement args.
            */
	function ( contentArgs, placementArgs, celebrusHelper ) {
		var isTrading;
		if(window.frameElement){
			isTrading = window.frameElement.getAttribute("src").includes("/navigation/trading");
		}
		var current;
		if(isTrading){
			current = $("#"+placementArgs.id);
		}else{
			current = $("#"+placementArgs.id,window.top.document);
		} 
		var banner_setting = {
				'testo' :'',
				'path' :'',
				'link_image_internal' :'',
				'link_image_external': '',
				'priority' :'',
				'size' :''
		}
		var  div  = $('<div />');
		if ( placementArgs.id  ) {
			div.attr ('id', placementArgs.id);
			if(placementArgs.content_type == "top"){
				div.attr('data-celebrus-type', 'banner');
				div.attr('content-type', placementArgs.content_type);
			}
			
		}
		var a ;
		// qui ho differenziato il target tra top e bottom, anche se non so a cosa serve, purtroppo non sono siuscita a testarlo
		
		if ( contentArgs.content_ref_web  ) {
				
			$.ajax({
				  url: contentArgs.pathtemplate + contentArgs.content_ref_web + ".xml",
				  aSync: false,
				  dataType: "xml"
					})
				.done(function( data ) {
					if ( console && console.log ) {
					  
					   banner_setting.testo = $(data).find('html-internal-item').text();
					   banner_setting.path = $(data).find('image').text();
					   banner_setting.link_image_internal = $(data).find('internal-url').text();
					   banner_setting.link_image_external = $(data).find('external-url').text();
					   banner_setting.priority = $(data).find('priority-label').text();
					   banner_setting.size = $(data).find('size-label').text();
					   /*if( current.html().indexOf(banner_setting.path) == -1){*/
						if(!contentArgs.content_type){
							contentArgs.content_type = "top";
						}
							
						if(contentArgs.content_type == placementArgs.content_type){
							var  content_type = (contentArgs.content_type === undefined)? null:contentArgs.content_type;
						
							//Sostituzione Variabili nel testo
							var testo = banner_setting.testo;
							testo = banner_setting.testo.replace('$nome', contentArgs.nome);
							testo = testo.replace('$var1', contentArgs.var1);
							testo = testo.replace('$var2', contentArgs.var2);
							testo = testo.replace('$var3', contentArgs.var3);
							testo = testo.replace('$var4', contentArgs.var4);
							testo = testo.replace('$var5', contentArgs.var5);
							testo = testo.replace('$var6', contentArgs.var6);
							
							
							var  url_img = "#"
							if( banner_setting.link_image_internal != '')
								url_img	= banner_setting.link_image_internal;
							else if(banner_setting.link_image_external != '') 
								url_img	= banner_setting.link_image_external;
							/*if(contentArgs.content_type == "top")
								a = $('<a target="_top" href="' + url_img + '"/>');
							else
								a = $('<a target="_bottom" href="' + url_img + '"/>');*/
							var classe = "rtim-text-default";
							if(contentArgs.content_type == "top"){
								classe =  "rtim-text";
							}
							else if(contentArgs.content_type == "bottom"){
								classe =  "rtim-text-footer";
							}
							
							var onError = "onerror=\"this.src ='" + current.find('img').attr('src') + "'\"" ;
							var htmlResponse = '<a href="'+ url_img +'" target="_top">';
							htmlResponse += '<img src="'+ banner_setting.path + "\" " + onError+ '/>';
							htmlResponse += '<div class="'+classe+'">'+testo+ '</div>';
							htmlResponse += '</a>';
							
							
							
							//a.append('<img src="'+ banner_setting.path + "\" " + onError+ '/>');
							
							
						
							var  div_template  = $('<div />');	
							div_template.attr ('id', contentArgs.content_ref_web);	
							
							
							
							div_template.append(htmlResponse);
							//div.append   (a);
							div.append(div_template);
							div.click( function () {
								celebrusHelper.accepted();
							});
						}
					}
				})
				 .fail(function() {
					if ( console && console.log ) {
					  console.log( "ERROR - template non trovato");
					}
					div.append(current)
					
				});
		} else {
			
		}
		return div.get(0);	
});


dcrm.manager.registerBuilder(
            /*
              The builder type, when you find a placement with the previous finder
              the type of this placement is used a key to find the correct builder
            */
            "layer",
            function ( contentArgs, placementArgs, celebrusHelper ) {
                
                var  url  =  (contentArgs.content_url  === undefined)?"#":contentArgs.content_url;
                var  txt  =  (contentArgs.content_text !== undefined)?contentArgs.content_text:contentArgs.content_ref_web;
                var  id   =   'layer_' + contentArgs.content_ref_web;
                var  div  = $('<div />');
                div.attr     ('id',      id );
                div.css      ('z-index', 9999);
                div.css      ('display', 'none');
                
                div.append   ('<label class="opt_inout"><span>' + txt + '</span></label>'); 
                
                var  ask  = $('<div style="position:absolute; bottom:15px; right:15px;">');
                var  ok   = $('<button type="button">Oui</button>');
                var  ko   = $('<button type="button">Non</button>');
                ask.append   (ok);
                ask.append   (ko);
                
                function  removeLayer  () {
                    $(    '#mask_' + id + ', #' + id).fadeOut(300 , function() {
                        $('#mask_' + id).remove();
                        $('#'      + id).remove();
                    });
                };
                ok.click     (function () {
                    celebrusHelper.accepted   ();
                    removeLayer        ();
                    self.location.replace(url);
                });
                ko.click     (function () {
                    celebrusHelper.refused    ();
                    removeLayer        ();
                });
                
                div.append   (ask);
                div.addClass ('layer_ecrm');
                
                div.on       ('DOMNodeInserted', function () {
                         $('#'      + id ).fadeIn (300);
                         $('body').append('<div id="mask_' + id + '" class="mask_layer_ecrm" style="z-index: 999;"></div>');
                         $('#'      + id).css('display', 'block');
                         $('#mask_' + id).fadeIn(300);
                });
                
                return div.get(0);
});