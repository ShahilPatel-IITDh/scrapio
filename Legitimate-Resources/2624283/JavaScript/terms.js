angular.module('pages.terms', [
	'dating.models.pages',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.oldTerms', {
				url: 'terms',
				onEnter: function($state) {
					$state.go('dating.pages.terms')
				},
			})
			.state('dating.pages.terms', {
				url: 'site/terms',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'TermsCtrl as termsCtrl',
						templateUrl: globalParams.templateUrls.pages.terms,
					},
				},
			})

	})
	.controller('TermsCtrl', function(PagesModel, GLOBALS, $location, authService) {
		var termsCtrl = this
		termsCtrl.isLoggedIn = authService.isAuthenticated
		termsCtrl.siteDomain = GLOBALS.siteDomain.toUpperCase()
		termsCtrl.termsUrl = GLOBALS.siteUrl + 'site/terms'
		termsCtrl.helpUrl = GLOBALS.siteUrl + 'help/'
		termsCtrl.privacyUrl = GLOBALS.siteUrl + 'site/privacy'
		termsCtrl.subprocessorsUrl = GLOBALS.siteUrl + 'site/subprocessors'
		termsCtrl.cookiePolicyUrl = GLOBALS.siteUrl + 'site/cookiePolicy'
		termsCtrl.supportEmail = GLOBALS.supportEmail
		termsCtrl.showVirtualHottieTerms = GLOBALS.canSeeVirtualHottie
		termsCtrl.companyName = GLOBALS.companyName
		termsCtrl.companyCountry = GLOBALS.companyCountry
		termsCtrl.legalAddress = GLOBALS.legalAddress
		termsCtrl.statutesRegulations = ''
		termsCtrl.courtsJustice = ''
		termsCtrl.agreementGovernedBy = ''
		termsCtrl.showHelpFormLink = termsCtrl.isLoggedIn && !(parseInt(GLOBALS.isExternalUpgradeSite))
		termsCtrl.companyAddress = GLOBALS.companyAddress
		termsCtrl.terms = GLOBALS.trafficmansionTerms

		PagesModel.setCurrentPage('Terms')
		$('html, body').animate({scrollTop: 0}, 50)
		termsCtrl.gotoElement = function(eID) {
			$location.hash(eID)
			$('html, body').animate({scrollTop: $('#' + eID).offset().top}, 500)
		}
	})

