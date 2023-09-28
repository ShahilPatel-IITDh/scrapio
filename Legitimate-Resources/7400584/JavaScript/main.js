'use strict';
(function ($) {
	jQuery(window).on('load',function(){
		jQuery(window).trigger('resize');
	});

	jQuery(window).on('elementor/frontend/init', function(){
		elementorFrontend.hooks.addAction('frontend/element_ready/wb-news-ticker.default', function ($scope, $) {
			var direction = $scope.find('.wb-breaking-news-ticker').data('direction');
			var scrollspeed = $scope.find('.wb-breaking-news-ticker').data('scrollspeed');
			var pause_on_hover = $scope.find('.wb-breaking-news-ticker').data('pause_on_hover');
			var autoplay_attr = $scope.find('.wb-breaking-news-ticker').data('autoplay');
			var stop_on_hover = true;
			var autoplay = true;

			var template_style = $scope.find('.wbel-nt-wrapper').data('template-style');

			if (autoplay_attr == 'yes') {
				autoplay = true;				
			}else{
				autoplay = false;
			}

			if( pause_on_hover == 'yes' ){
				stop_on_hover = true;
			}else{
				stop_on_hover = false;
			}
			if( template_style == 'typing' ){
				$scope.find('.wb-breaking-news-ticker').breakingNews({
					effect : 'typography',
					direction : direction,
					delayTimer: 4000,
					stopOnHover : stop_on_hover,
					play : autoplay
				});
			}else if( template_style == 'default' ){
				$scope.find('.wb-breaking-news-ticker').breakingNews({
					effect : 'scroll',
					direction : direction,
					scrollSpeed: scrollspeed,
					stopOnHover : stop_on_hover,
					play : autoplay
				});
			}else{
				$scope.find('.wb-breaking-news-ticker').breakingNews({
					effect : template_style,
					direction : direction,
					scrollSpeed: scrollspeed,
					stopOnHover : stop_on_hover,
					play : autoplay
				});
			}
		});
	});
})(jQuery);