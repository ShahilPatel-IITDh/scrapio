
			var timer = null;
			$(document).ready(function(){
				$('.alertMovimento').fadeIn(1000, function () {
					timer = setInterval(function () {
						$('.alert').fadeOut(2000);
						clearInterval(timer);
					}, 2 * 1000);
				});
			});
		