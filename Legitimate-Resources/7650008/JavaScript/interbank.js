jQuery(document).ready(function( $ ) {
	
	$('.open-login').on('click', function () {
		$('.mobile-login').toggleClass('toggled');
	});
	$('.close-login').on('click', function () {
		$('.mobile-login').toggleClass('toggled');
	});
	
});