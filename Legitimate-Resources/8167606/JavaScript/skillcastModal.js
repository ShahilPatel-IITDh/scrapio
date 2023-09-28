function SkillcastModal(){

	var classNames = {
		'container': 'sc-modal-container',
		'modal': 'sc-modal',
		'modalActive': 'sc-modal-active',
		'header': 'sc-modal-header',
		'content': 'sc-modal-content',
		'buttonContainer': 'sc-modal-buttons',
		'closeIcon': 'far fa-lg fa-times',
		'closeButton': 'sc-modal-close',
		'wordIcon': 'far fa-lg fa-file-word',
		'wordButton': 'sc-icon-button sc-modal-word',
		'pdfIcon': 'far fa-lg fa-file-pdf',
		'pdfButton': 'sc-icon-button sc-modal-pdf'
	};

	var lang = {
		'close': 'Close',
		'closeAria': 'Close modal',
		'pdfAria': 'Download content in PDF format',
		'wordAria': 'Download content in Word format'
	};
	
	var lastFocusedElement;
	var intModalsOpen = 0;
	var tracking = {};

	var utils = {
		'selectContainer': function(){
			if( $('div.'+classNames.container).length === 0 ){
				utils.createContainer();
			}
			return $('div.'+classNames.container);
		},
		'createContainer': function(){
			$('body').css({'overflow': 'hidden'});
			$('body').append('<div class="'+classNames.container+'"></div>');
		},
		'removeEmptyContainer': function(){
			$('body').css({'overflow': 'auto'});
			$('div.'+classNames.container+':empty').remove();
		},
		'randomId': function(){
			return Math.floor((Math.random() * 1000000) + 1);
		},
		'modalChildren': function(args){
			var buttons = [];
			if( args.showPDFDownloadButton ){
				buttons.push({
					'element': 'button',
					'class': classNames.pdfButton,
					'child': {'element': 'i', 'class': classNames.pdfIcon},
					'onclick': function(e){
						SKILLCASTHTMLJS.createPdfDownload(document.getElementById(args.id + '-content'));
					},
					'ariaLabel': lang.pdfAria,
					'title': lang.pdfAria
				});
			}
			if( args.showWordDownloadButton ){
				buttons.push({
					'element': 'button',
					'class': classNames.wordButton,
					'child': {'element': 'i', 'class': classNames.wordIcon},
					'onclick': function(e){
						SKILLCASTHTMLJS.createDocDownload(document.getElementById(args.id + '-content'));
					},
					'ariaLabel': lang.wordAria,
					'title': lang.wordAria
				});
			}

			buttons.push({
				'element': 'button',
				'class': classNames.closeButton,
				'children': [
					{'element': 'i', 'class': classNames.closeIcon}, 
					{'element': 'span', 'text': lang.close}
				],
				'onclick': function(e){
					close(args)
				},
				'ariaLabel': lang.closeAria
			});
			
			var header = [];
			if( args.hasOwnProperty('logo') ){
				if( args.logo.hasOwnProperty('enabled') && args.logo.enabled === true ){
					header.push({"element": "img", "src" : args.logo.url, "alt" : "", "maxHeight": "50px", "float": "left", "display": "inline-block", "margin": "0 15px 0 0" });
				}
			}
			if( args.title.length > 0 ){
				header.push({'element': 'h1', 'text': args.title, 'id': args.id + '-title' })
			}
			if( args.description.length > 0 ){
				header.push({'element': 'p', 'text': args.description, 'id': args.id + '-description' })
			}
			header.push({'class': classNames.buttonContainer, 'children': buttons});

			var modalElements = [];
			modalElements.push({
				'element': 'header',
				'class': classNames.header,
				'children': header
			});

			modalElements.push({
				'element': 'section',
				'id': args.id + '-content',
				'class': classNames.content,
				'child': args.content 
			});

			return modalElements;
		},
		'createModal': function(args){
			utils.selectContainer().append( SKILLCASTHTMLJS.createElem({
				'element': 'div',
				'role': 'dialog',
				'id': args.id,
				'class': classNames.modal,
				'ariaLabelledBy': args.id + '-title',
				'ariaDescribedBy': args.id + '-description',
				'children': utils.modalChildren(args)
			}) );

			intModalsOpen++;

			if( intModalsOpen > 1 ){
				var pixels = (intModalsOpen*10)-10;
				$('#'+args.id).css({'top': pixels+'px', 'right': '-'+pixels+'px', 'bottom': '-'+pixels+'px', 'left': pixels+'px'});
			}

			utils.engageAlly(args.id);

			if( args.hasOwnProperty('onopenCallback') ){
				args.onopenCallback( args.hasOwnProperty('onopenCallbackArgs') ? args.onopenCallbackArgs : {} );
			}

			return;
		},
		'engageAlly': function(id){
			for(var tId in tracking) {
				utils.disengageAlly(tId);
			}

			$('.' + classNames.modal).removeClass(classNames.modalActive);
			$('#' + id).addClass(classNames.modalActive);

			var $selector = $('#' + id + '.' + classNames.modalActive);
			if( $selector.length ){
				ally.when.visibleArea({
					context: $selector,
					callback: function(context) {
						var element = ally.query.firstTabbable({
							context: context,
							defaultToContext: true,
						});
						element.focus();
					},
				});

				var handles = {
					'disabled': ally.maintain.disabled({ filter: $selector }),
					'hidden': ally.maintain.hidden({ filter: $selector }),
					'tab': ally.maintain.tabFocus({ context: $selector }),
					'key': ally.when.key({ escape: function(){ close(args); } })
				};
				tracking[id] = handles;
			}
		},
		'disengageAlly': function(id){
			if( tracking.hasOwnProperty(id) ){
				tracking[id].key.disengage();
				tracking[id].tab.disengage();
				tracking[id].hidden.disengage();
				tracking[id].disabled.disengage();
				delete tracking[id];
			}
			lastFocusedElement.focus();
		},
		'removeModal': function(id){
			if( typeof id != 'undefined' && id.length > 0 ){
				$('#'+id).remove();
			} else {
				$('div.'+classNames.modal).remove();
			}
		}
	}

	var ajaxRequests = {
		"logo": function(){
			return SKILLCASTHTMLJS.skillcastAPI( "offlineActivity", "getLogoParamsJSON", {} );
		}
	};

	function open(args){
		lastFocusedElement = document.activeElement;

		var args = args || {};
		args.title = args.title || '';
		args.description = args.description || '';
		args.id = args.id || 'sc-modal-' + utils.randomId();
		args.content = args.content || {};
		args.showClientLogo = args.showClientLogo || false;
		args.showPDFDownloadButton = args.showPDFDownloadButton || false;
		args.showWordDownloadButton = args.showWordDownloadButton || false;

		if( args.showClientLogo === true ){
			$.when( 
				ajaxRequests.logo()
			).done(function( rlogo ){
				args.logo = rlogo;
				utils.createModal(args);
			});
		} else {
			utils.createModal(args);
		}
	}

	function close(args){
		utils.disengageAlly(args.id);
		utils.removeModal(args.id);
		utils.removeEmptyContainer();

		if(intModalsOpen > 1){
			utils.engageAlly( $('.' + classNames.container + ' .' + classNames.modal).last().attr('id') );
		}
		intModalsOpen--;
		
		if( args.hasOwnProperty('oncloseCallback') ){
			args.oncloseCallback( args.hasOwnProperty('oncloseCallbackArgs') ? args.oncloseCallbackArgs : {} );
		}
	}

	return {
		'open': open,
		'closed': close
	};

};