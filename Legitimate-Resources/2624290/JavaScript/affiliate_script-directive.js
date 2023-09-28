angular.module('dating.directives.affiliateScript', [
])
	.directive('affiliateScript', function() {
		return {
			restrict: 'E',
			link: function(scope, element, attr) {
				element.html($('#' + attr.containerId).clone())
			},
		}
	})
