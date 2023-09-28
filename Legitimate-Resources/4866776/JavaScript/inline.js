
	var popup_modal = false;
			popup_modal = true;
			
	var mobile_popup = 0;
		
			
	if(mobile_popup == 1) {
		/*$("#popup_open").fancybox({
			fitToView: false,
			width: '100%',
			height: '100%',
			autoSize: false,
			closeClick: false,
			openEffect: 'none',
			closeEffect: 'none',
			padding: 0,
			margin: 0,
			modal: popup_modal,
			wrapCSS: 'mobile_popup',
			beforeShow: function(){
				$("html").css({'overflow-y':'auto'});
				$(".main").css({'display':'none'});
			},
			afterClose: function(){
				$("html").css({'overflow-y':'visible'});
				$(".main").css({'display':'block'});
			},
			helpers: {
				overlay: {
					locked: true
				}
			}
		});*/
	}
	else {
		$("#popup_open").fancybox({
			fitToView: false,
			width: '80%',
			maxWidth: '940px',
			height: 'auto',
			autoSize: false,
			closeClick: false,
			openEffect: 'none',
			closeEffect: 'none',
			padding: 20,
			margin: 20,
			modal: popup_modal,
			helpers: {
				overlay: {
					locked: false
				}
			}
		});
	}
	
	$(document).ready(function() {
		
        console.log('');

        				get_shop_is_closed();
							
				
				
							
					
	});
	
