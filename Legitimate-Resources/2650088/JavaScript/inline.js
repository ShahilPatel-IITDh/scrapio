
		$(document).ready(function() {
			// Show or hide the sticky footer button
			$(window).scroll(function() {
				if ($(this).scrollTop() > 200) {
					$('.backhome').fadeIn(200);
				} else {
					$('.backhome').fadeOut(200);
				}
			});
			
			// Animate the scroll to top
			$('.backhome').click(function(event) {
				event.preventDefault();
				
				$('html, body').animate({scrollTop: 0}, 300);
			})
		});
	