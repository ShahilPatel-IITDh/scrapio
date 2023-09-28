angular.module('pages.cookiePolicy', [
		'dating.models.pages',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.oldCookiePolicy', {
				url: 'cookiePolicy',
				onEnter: function($state) {
					$state.go('dating.pages.cookiePolicy')
				},
			})
			.state('dating.pages.cookiePolicy', {
				url: 'site/cookiePolicy',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'CookiePolicyCtrl as cookiePolicyCtrl',
						templateUrl: globalParams.templateUrls.pages.our_policy,
					},
				},
			})

	})
	.controller('CookiePolicyCtrl', function(PagesModel, GLOBALS) {
		var cookiePolicyCtrl = this

		cookiePolicyCtrl.siteDomain   = GLOBALS.siteDomain
		cookiePolicyCtrl.supportEmail = GLOBALS.supportEmail
		cookiePolicyCtrl.siteShortName = GLOBALS.siteShortName
		cookiePolicyCtrl.companyAddress = GLOBALS.companyAddress
		cookiePolicyCtrl.companyName = GLOBALS.companyName
		cookiePolicyCtrl.useTrafficmansionCookiePolicy = GLOBALS.useTrafficmansionCookiePolicy
		cookiePolicyCtrl.cookies = GLOBALS.trafficmansionCookiePolicy
		PagesModel.setCurrentPage('cookiePolicy')
	})

