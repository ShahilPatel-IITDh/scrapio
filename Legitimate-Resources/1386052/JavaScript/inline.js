
jQuery(document).ready(function($){
		$('.related-item-container').owlCarousel({
				loop:true,
				margin:20,
				nav:true,
				
				dots:true,
				autoplay: true,
				autoplayTimeout: 2000,
				speed:2000,
				smartSpeed: 2000,
								
				navText: ['<i class="flownewsicon fa-angle-left"></i>','<i class="flownewsicon fa-angle-right"></i>'],
				responsive:{
							0:{
								items:1
							},
							480:{
								items:2
							}							
				}
			});
		});
