jQuery(function() {
	var $ = jQuery;
	
    $('#wsite-header-search-form input').css({'width': '0px', 'display': 'none'});
	$('#wsite-header-search-form').append( '<span class="wsite-search-cover"></span>');
	$('#header .wsite-search').css('border', '2px transparent');
	
	$('.wsite-search-cover').live('click', function(e){
		e.preventDefault();
		$('#logo, .nav').fadeOut('slow');
		$('#header .wsite-search').css('border', '2px solid #fff');
		$('#wsite-header-search-form input').css({'display': 'block'});
		$('#wsite-header-search-form input').animate({width: '145px'}, 1000, function() {
			$(this).focus();
			$('.wsite-search-cover').remove();
		});
	})
	
	$('#wsite-header-search-form input').live('blur', function(e) {
		$('#wsite-header-search-form input').animate({width: '0px'}, 1000, function() {
			$(this).css({'display': 'none'});
			$('#header .wsite-search').css('border', '2px transparent');
			$('.#logo, .nav').fadeIn('slow');
			$('#wsite-header-search-form').append( '<span class="wsite-search-cover"></span>');
		});
	})
});