angular.module('dating.directives.goBack', [
	])
	.directive('goBack', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).on('click', function(ev) {
					history.back()
					scope.$apply()
				})
			},
		}
	})