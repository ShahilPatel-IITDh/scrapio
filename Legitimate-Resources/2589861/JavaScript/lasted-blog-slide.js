
					jQuery(document).ready(function ($) {
						//SERVICE SLIDER
						if ($(".ts-blog-slide").length > 0) {
						    $(".ts-blog-slide").owlCarousel({
						    	items: 3,
						        autoPlay: 4000,
						        slideSpeed: 1000,
						        navigation: false,
						        pagination: false,
						        singleItem: false,
						        itemsCustom: [[0, 1],[320,1], [480, 1], [768, 2], [992, 2], [1200, 3]]
						    });
					}
					})
