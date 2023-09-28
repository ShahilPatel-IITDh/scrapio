
	$(window).bind('load', function() {
	  $('img').each(function() {
		if( (typeof this.naturalWidth != "undefined" && this.naturalWidth == 0) 
		||  this.readyState == 'uninitialized'                                  ) {
			$(this).attr('src', 'tema/genel/uploads/logo/insaatv9_logo.svg');
		}
	  });
	});	
	