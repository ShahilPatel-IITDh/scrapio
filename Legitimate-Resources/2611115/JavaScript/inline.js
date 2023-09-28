
				jQuery.noConflict();
				(function($){
				  $("#slide_js").slidesjs({
					width: 830,
					height: 385,
					navigation: {
						active: false
					},
					pagination: {
						active: false
					},
					play: {
						active: true,
						auto: true,
						interval: 10000,
						swap: true
					},
					effect: {
						slide: {
							speed: 2000
						}
					}
				  });
				})(jQuery);
			