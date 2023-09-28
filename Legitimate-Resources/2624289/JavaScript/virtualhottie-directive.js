angular.module('dating.directives.virtualhottie', [])
	.controller('VirtualHottieCtrl', function(GLOBALS) {
		var virtualHottieCtrl = this
		virtualHottieCtrl.isMobile = parseInt(GLOBALS.isMobile)
		virtualHottieCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		virtualHottieCtrl.showVirtualHottieInfo = function(e) {
			$(e.currentTarget).find('span').toggle()
		}
	})
	.directive('virtualhottie', function() {
		return {
			restrict: 'E',
			controller: 'VirtualHottieCtrl',
			controllerAs: 'virtualHottieCtrl',
			bindToController: true,
			scope: {
				scriptType: '@scriptType',
			},
			templateUrl: globalParams.templateUrls.directives.virtualhottie,
		}
	})
