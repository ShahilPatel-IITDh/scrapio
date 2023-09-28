document.addEventListener('DOMContentLoaded', function() {

	$('.search-icon a.search-open').click(function() {
		$('.search-row').slideToggle('slow');
	});

	$('.ham-menu a.navi-open').click(function() {
		$('.panel-navi').slideToggle('slow');
	});
	
});