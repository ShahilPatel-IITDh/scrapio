angular.module('Dating', [
	'ui.router',
	'ui.bootstrap.dropdown',
	'ct.ui.router.extras',
	'ngSanitize',
	'pascalprecht.translate',
	'monospaced.elastic',
	'rzModule',
	'pages',
])
	.constant('GLOBALS', window.globalParams)
	.service('authService', function() {
		var user = this
		user.isAuthenticated = !!window.globalParams.userInfo.username
		user.clearCredentials = function() {
			window.globalParams.userInfo = {}
			window.globalParams.user = {}
			user.isAuthenticated = false
		}
		user.currentUser = user.isAuthenticated ? window.globalParams.userInfo : null
	})
	.service('userAccess', function(GLOBALS) {
		var userAccess = this
		userAccess.hasAccess = !!GLOBALS.user
		if (userAccess.hasAccess) {
			if (GLOBALS.user.justRegistered || GLOBALS.user.showUploadPhotoDescriptionBox ||
				GLOBALS.user.bAffiliateOneClickBox || GLOBALS.user.bAffiliateOneClickBoxStep2 || GLOBALS.user.bAffiliateOneClickBoxStep3 ||
				GLOBALS.user.showOneClickBox) {
				userAccess.hasAccess = false
			}
		}
	})
	.config(function($httpProvider, $locationProvider) {
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
		$locationProvider.html5Mode(true)
	})
	.config(function() {
		window.globalParams.isMobileScreen = !window.globalParams.mobileQuery && $('body').width() <= 768
	})
	.config(function($stateProvider, $urlRouterProvider) {
		//abstract state serves as a PLACEHOLDER or NAMESPACE for application states
		$stateProvider.state('dating', {
			url: '',
			abstract: true,
		})

		$urlRouterProvider.otherwise('/')
	})
	.config(function($translateProvider, GLOBALS) {
		$translateProvider.useUrlLoader(GLOBALS.i18nUrl)

		// Since you've now registered more then one translation table, angular-translate has to know which one to use.
		// This is where preferredLanguage(langKey) comes in.
		$translateProvider.preferredLanguage(GLOBALS.i18nDefaultLang)

		// Store the language in the local storage
		$translateProvider.useLocalStorage()

		// Enable sanitize
		$translateProvider.useSanitizeValueStrategy(null)

		// Log missing translations to console
		$translateProvider.useMissingTranslationHandlerLog()
	})
	.config(['$compileProvider', function($compileProvider) {
		$compileProvider.debugInfoEnabled(false)
	}])
	.filter('capitalize', function() {
		return function(str) {
			return (str) ? str.split(' ').map(function(word) {
return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
}).join(' ') : ''
		}
	})
	.filter('trustAsResourceUrl', ['$sce', function($sce) {
		return function(val) {
			return $sce.trustAsResourceUrl(val)
		}
	}])

