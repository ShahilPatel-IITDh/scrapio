

jQuery(document).ready(function($) {
	console.log(jQuery(".serie-storiche-container a").length);
	jQuery(".serie-storiche-container a").css('cursor','default');
	jQuery(".serie-storiche-container a").click(function(event) {
		event.preventDefault();
	});
});