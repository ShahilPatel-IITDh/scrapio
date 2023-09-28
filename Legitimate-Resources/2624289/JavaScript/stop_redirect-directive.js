angular.module('dating.directives.stopRedirect', [
	])
	.directive('stopRedirect', function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).on('click', 'a', function(ev) {
					$rootScope.$broadcast('sign-out:stopRedirect')
				})
			},
		}
	})
