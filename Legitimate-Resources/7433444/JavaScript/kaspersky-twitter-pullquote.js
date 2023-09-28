(function(window, document, $, undefined) {

	// Open the tweet button in a new popup window
	$(function(){
		//$('body').on('click','.btn-twhite', function(){
		$('.btn-twhite').click(function(event) {
			var width	= 575,
				height	= 400,
				left	= ($(window).width()  - width)  / 2,
				top		= ($(window).height() - height) / 2,
				url		= this.href,
				opts	= 'status=1' +
						  ',width='  + width  +
						  ',height=' + height +
						  ',top='    + top    +
						  ',left='   + left;
		    window.open(url, 'twitter', opts);
		    return false;
		});
	});

})(window, document, jQuery);
