
window.addEventListener( 'load', function() {
	var url = document.querySelector( '#url' );
	url.focus();
	url.select();

	var fields = document.querySelectorAll( '.fselect' );
	Array.prototype.forEach.call( fields, function( element ) {
		element.addEventListener( 'click', function() {
			element.select();
		} );
	} );
} );
