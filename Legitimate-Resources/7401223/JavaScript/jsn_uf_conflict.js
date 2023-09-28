if (typeof jQuery.noConflict() == 'function') {	
	var jsnUF = jQuery.noConflict();
}
try {
	if (JSNUFjQueryBefore && JSNUFjQueryBefore.fn.jquery) {
		jQuery = JSNUFjQueryBefore;
	}
} catch (e) {
	console.log(e);
}