angular.module('pages.aboutUs', [
		'dating.models.pages',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.oldAboutUs', {
				url: 'aboutUs',
				onEnter: function($state) {
					$state.go('dating.pages.aboutUs')
				},
			})
			.state('dating.pages.aboutUs', {
				url: 'site/about',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'AboutUsCtrl as aboutUsCtrl',
						templateUrl: globalParams.templateUrls.pages.about_us,
					},
				},
			})

	})
	.controller('AboutUsCtrl', function($scope, PagesModel, GLOBALS, authService) {
		var aboutUsCtrl = this
		aboutUsCtrl.companyName = GLOBALS.companyName
		aboutUsCtrl.companyCountry = GLOBALS.companyCountry
		aboutUsCtrl.supportEmail = GLOBALS.supportEmail
		aboutUsCtrl.companyAddress = GLOBALS.companyAddress
		aboutUsCtrl.isLoggedIn = authService.isAuthenticated
		aboutUsCtrl.imagesUrl = GLOBALS.baseUrl + '/images/'
		PagesModel.setCurrentPage('AboutUs')
		$('html, body').animate({scrollTop: 0}, 50)
		$scope.$on('sign-out:success', function() {
			aboutUsCtrl.isLoggedIn = false
		})
	})

