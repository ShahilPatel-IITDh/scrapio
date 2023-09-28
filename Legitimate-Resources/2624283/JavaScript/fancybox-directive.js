angular.module('dating.directives.fancybox', [])
	.directive('fancybox', function(GLOBALS) {
		var featureToggle = GLOBALS.featureToggles.toggleFancyBox
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				if (+featureToggle) {
					$(element).find('.fancybox').fancybox({
						openEffect: 'none',
						closeEffect: 'none',
						padding: '0',
						closeBtn: false,
					})
				} else {
					$(element).find('.fancybox').fancybox({
						openEffect: 'none',
						closeEffect: 'none',
					})
				}
				$(element).on('click', '.fancybox-start-gallery', function(ev) {
					ev.preventDefault()
					$(element).find('.fancybox:first').trigger('click')
				})
			},
		}
	})

