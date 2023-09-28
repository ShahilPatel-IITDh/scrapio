angular.module('pages.privacy', [
		'dating.models.pages',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.oldPrivacy', {
				url: 'privacy',
				onEnter: function($state) {
					$state.go('dating.pages.privacy')
				},
			})
			.state('dating.pages.privacy', {
				url: 'site/privacy',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'PrivacyCtrl as privacyCtrl',
						templateUrl: globalParams.templateUrls.pages.privacy,
					},
				},
			})

	})
	.controller('PrivacyCtrl', function($scope, PagesModel, GLOBALS, authService) {
		var privacyCtrl = this
		privacyCtrl.supportEmail = GLOBALS.supportEmail
		privacyCtrl.isLoggedIn = authService.isAuthenticated
		privacyCtrl.imagesUrl = GLOBALS.baseUrl + '/images/'
		privacyCtrl.siteName = GLOBALS.siteName
		privacyCtrl.siteShortName = GLOBALS.siteShortName
		privacyCtrl.siteDomain = GLOBALS.siteDomain
		privacyCtrl.cookiePolicyUrl = GLOBALS.siteUrl + 'site/cookiePolicy'
		privacyCtrl.companyName = GLOBALS.companyName
		privacyCtrl.companyAddress = GLOBALS.companyAddress
		privacyCtrl.mailToPrivacyUrl = GLOBALS.siteUrl + 'site/mailToPrivacy'
		privacyCtrl.useTrafficmansionPrivacyPolicy = GLOBALS.useTrafficmansionPrivacyPolicy
		privacyCtrl.privacy = GLOBALS.trafficmansionPrivacyPolicy
		PagesModel.setCurrentPage('Privacy')
		$('html, body').animate({scrollTop: 0}, 50)
		$scope.$on('sign-out:success', function() {
			privacyCtrl.isLoggedIn = false
		})
	})

