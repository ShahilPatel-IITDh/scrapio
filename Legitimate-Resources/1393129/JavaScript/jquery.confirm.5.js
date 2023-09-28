(function($){
	if($(document.body).data('jquery.confirm') === 'loaded') {
		return ;
	 }
    /* jamesc code */
    var markup = [
            '<div id="confirmOverlay">',
            '<div id="confirmBox">',
            '<a class="confirmboxclose">close</a>',
            '<div class="confirmboxin"></div>',
            '</div></div>'
    ].join('');
    /* end jamesc code */

	$.confirm = function(params){
		
            /* jamesc edit */
            /*
		if($('#confirmOverlay').length){
			// A confirm is already shown on the page:
			return false;
		}
                */
		
		var buttonHTML = '';
		$.each(params.buttons,function(name,obj){
			
			// Generating the markup for the buttons:
			
			buttonHTML += '<span class="button '+obj['class']+'">'+name+'</span><span></span>';
			
			if(!obj.action){
				obj.action = function(){};
			}
		});
		
		var markup = [
			'<h1>',params.title,'</h1>',
			//'<p>',params.message,'</p>',
			params.message,
			'<div id="confirmButtons">',
			buttonHTML,
			'</div>'
		].join('');
		
      $('#confirmBox .confirmboxin').html(markup).parent().parent().fadeIn();
      if(params.hideCloseBtn)
      {
         $('#confirmBox .confirmboxclose').hide();
      }
                /* jamesc edit */
		//$(markup).hide().appendTo('body').fadeIn();

		var buttons = $('#confirmBox .button:not(.emptybtn)'),
			i = 0;

		$.each(params.buttons,function(name,obj){
			buttons.eq(i++).click(function(){
				
				// Calling the action attribute when a
				// click occurs, and hiding the confirm.
				
				obj.action();
				$.confirm.hide();
				return false;
			});
		});
	}

	$.confirm.hide = function(){
            /* jamesc change */
		$('#confirmOverlay').fadeOut();
            /*
		$('#confirmOverlay').fadeOut(function(){
			$(this).remove();
		});
                */
	}
	
        /* jamesc code */
    var root = $('#rooh_content');
    if (root.length == 0) root = document.body;
    $(markup).hide().appendTo(root).find('.confirmboxclose').click($.confirm.hide);
    $(document.body).trigger('jquery.confirm loaded').data('jquery.confirm', 'loaded');
        /* end jamesc code */
})(roohJQ);
