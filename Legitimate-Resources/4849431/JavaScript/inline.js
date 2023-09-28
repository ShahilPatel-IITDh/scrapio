

	window.addEvent('resize', function() {
		resetPanelsText('mod294_');
		setPanelsText('mod294_');
	});
	
  	window.addEvent('domready', function(){
  		

	   new Fx.Accordion(document.id('mod294_djtabs'), '#mod294_djtabs .djtabs-title', '#mod294_djtabs .djtabs-in-border',
	   {
	   	initialDisplayFx: false,
	   	alwaysHide: true,
	   	display: -1,	   	onActive: function(toggler, element){
			toggler.addClass('djtabs-active');
			toggler.getParent().addClass('djtabs-active-wrapper');
				},
		onBackground: function(toggler, element){
			toggler.removeClass('djtabs-active');
			toggler.getParent().removeClass('djtabs-active-wrapper');
		toggleVideo(element,0);		}
	   }
	   );
	   
	   var accordionsArray = $$('.mod294_accordion_help_class.accordion_first_out');
	   for (i=1; i<=accordionsArray.length; i++)
	   {
	   	   var accordion_id = accordionsArray[i-1].id;
		   new Fx.Accordion(document.id(accordion_id), '#'+accordion_id+' .djtabs-panel', '#'+accordion_id+' .djtabs-article-body',
		   {
			alwaysHide: true,
			onActive: function(toggler, element){
				toggler.addClass('djtabs-panel-active');
				toggler.getParent().addClass('djtabs-group-active');
			},
			onBackground: function(toggler, element){
				toggler.removeClass('djtabs-panel-active');
				toggler.getParent().removeClass('djtabs-group-active');
			}
			}
		   );
	  }
	  
	  var accordionsArray = $$('.mod294_accordion_help_class.accordion_all_in');
	   for (i=1; i<=accordionsArray.length; i++)
	   {
	   	   var accordion_id = accordionsArray[i-1].id;
		   new Fx.Accordion(document.id(accordion_id), '#'+accordion_id+' .djtabs-panel', '#'+accordion_id+' .djtabs-article-body',
		   {
			alwaysHide: true,
			display: -1,
			onActive: function(toggler, element){
				toggler.addClass('djtabs-panel-active');
				toggler.getParent().addClass('djtabs-group-active');
			},
			onBackground: function(toggler, element){
				toggler.removeClass('djtabs-panel-active');
				toggler.getParent().removeClass('djtabs-group-active');
			}
			}
		   );
	  }

	    setPanelsText('mod294_');
	   document.id('mod294_djtabs').setStyle('visibility','visible');
	   document.id('mod294_djtabs_loading').hide();
	});

