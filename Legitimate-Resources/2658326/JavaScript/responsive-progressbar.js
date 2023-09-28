// Core functionality inspired by http://www.ghosthorses.co.uk/production-diary/super-simple-responsive-progress-bar/

jQuery(function($) {

	moveProgressBar();

	$(window).resize(function() {
		moveProgressBar();
	});


	function moveProgressBar() {
		$('.rprogress-wrap').each(function(i, e) {

			var getPercent = ($(e).data('progress-percent') / 100);
			var getProgressWrapWidth = $(e).width();
			var progressTotal = getPercent * getProgressWrapWidth;
			var animationLength = $(e).data('speed');

			$(e).find('.rprogress-bar').stop().animate({
				left: progressTotal
			}, animationLength);

		});
	}

});
