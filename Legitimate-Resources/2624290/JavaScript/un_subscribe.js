angular.module('pages.unSubscribe', [])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.unSubscribe', {
				url: 'emailUnsubscribe',
				views: {
					'sections@': {
						templateUrl: globalParams.templateUrls.pages.un_subscribe,
						controller: 'UnSubscribeCtrl as unSubscribeCtrl',
					},
				},
			})
			.state('dating.pages.separateUnsubscribe', {
				url: 'asm/*path',
				views: {
					'sections@': {
						templateUrl: globalParams.templateUrls.pages.separate_unsubscribe,
						controller: 'SeparateUnsubscribeCtrl as SeparateUnsubscribeCtrl',
					},
				},
			})
	})
	.factory('sharedData', function($rootScope) {
		var userInfo = {}
		userInfo.safeMode   = false
		userInfo.exoSubData = ''
		userInfo.adniumSubData = ''
		userInfo.goAdserverSubData = ''

		userInfo.safeModeChanged = function(value) {
			this.safeMode = value
		}

		userInfo.exoSubDataChanged = function(value) {
			this.exoSubData = value
		}

		userInfo.adniumSubDataChanged = function(value) {
			this.adniumSubData = value
		}

		userInfo.goAdserverSubDataChanged = function(value) {
			this.goAdserverSubData = value
		}

		return userInfo
	})
	.controller('UnSubscribeCtrl', function($rootScope, $location, $timeout, PagesModel, GLOBALS, sharedData) {
		var unSubscribeCtrl  = this,
			REDIRECT_COUNTER = 15,
			object           = $location.search(),
			params           = {email: object.email}

		unSubscribeCtrl.email                  = decodeIfValidBase64(object.email)
		unSubscribeCtrl.isMobile               = parseInt(GLOBALS.isMobile)
		unSubscribeCtrl.siteShortName          = GLOBALS.siteShortName
		unSubscribeCtrl.status                 = 'initial'
		unSubscribeCtrl.themeFolder            = GLOBALS.baseUrl
		unSubscribeCtrl.removeOptimiserRedirects = GLOBALS.removeOptimiserRedirects

		PagesModel.setCurrentPage('UnSubscribe')

		function decodeIfValidBase64(email) {
			try {
				var decodedEmail = atob(email)
				return decodedEmail
			} catch (error) {
				return email
			}
		}

		var redirectOnTimeOut = function() {
			unSubscribeCtrl.redirectCounter--
			if (unSubscribeCtrl.redirectCounter == 0) {
				window.location.href = unSubscribeCtrl.unSubscribePageData.sRedirectLink
			} else {
				$timeout(redirectOnTimeOut, 1000)
			}
		}

		var resubscribe = function() {
			PagesModel.reSubscribe(params).then(function(result) {
				unSubscribeCtrl.status = result.data.status
			})
		}

		PagesModel.unSubscribe(params).then(function(result) {
			if (_.isEmpty(result.data)) {
				window.location.href = '/'
			} else {
				unSubscribeCtrl.unSubscribePageData = result.data
				unSubscribeCtrl.showAds = result.data.showAds
				unSubscribeCtrl.showAdvertisementLabel =  result.data.markAdvert
				$rootScope.$broadcast('sign-out:success')
				unSubscribeCtrl.redirectCounter = REDIRECT_COUNTER
				sharedData.safeModeChanged(result.data.bSafeMode)
				sharedData.exoSubDataChanged(result.data.exoSubData)
				sharedData.adniumSubDataChanged(result.data.adniumSubData)
				sharedData.goAdserverSubDataChanged(result.data.goAdserverSubData)
				if (!unSubscribeCtrl.removeOptimiserRedirects) {
					redirectOnTimeOut()
				}
			}
			$rootScope.$broadcast('unsubDataLoaded', {safeMode: result.data.bSafeMode, exoSubData: result.data.exoSubData, exoSubUrlParams: result.data.exoSubUrlParams, adniumSubData: result.data.adniumSubData, adniumSubUrlParams: result.data.adniumSubUrlParams})
			unSubscribeCtrl.isLoading = false
		})

		unSubscribeCtrl.isLoading = true
		unSubscribeCtrl.resubscribe = resubscribe
		$(window).on('resize', function() {
			var w = window.innerWidth
			unSubscribeCtrl.isMobile = (w <= 900)
		})
	})
	.controller('SeparateUnsubscribeCtrl', function($rootScope, $location, $timeout, PagesModel, GLOBALS, sharedData, authService, $state) {
		var SeparateUnsubscribeCtrl = this
		SeparateUnsubscribeCtrl.isLoggedIn = authService.isAuthenticated
		if (!SeparateUnsubscribeCtrl.isLoggedIn /*|| !GLOBALS.separateUnsubscribe*/) {
			$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
			return
		}
		PagesModel.setCurrentPage('SeparateUnsubscribe')

		SeparateUnsubscribeCtrl.imagesUrl = GLOBALS.baseUrl + '/styles/images/'
		SeparateUnsubscribeCtrl.userUnsubscribed = GLOBALS.userUnsubscribed
		SeparateUnsubscribeCtrl.showCustomResponse = false
		SeparateUnsubscribeCtrl.userEmailAddress = GLOBALS.userInfo.emailCurrentUser
		SeparateUnsubscribeCtrl.userMailSettings = GLOBALS.userMailSettings
		for (var key in SeparateUnsubscribeCtrl.userMailSettings) {
			SeparateUnsubscribeCtrl.userMailSettings[key].value = !!SeparateUnsubscribeCtrl.userMailSettings[key].value
		}

		SeparateUnsubscribeCtrl.optIn = function() {
			SeparateUnsubscribeCtrl.userUnsubscribed = false
		}

		SeparateUnsubscribeCtrl.optOutCustom = function() {
			PagesModel.separateUnsubscribe(SeparateUnsubscribeCtrl.userMailSettings).then(function(){
				SeparateUnsubscribeCtrl.showCustomResponse = true
			})
		}

		SeparateUnsubscribeCtrl.optOutOfAll = function() {
			var data = {optOutOfAllTypes : true}
			PagesModel.separateUnsubscribe(data).then(function(){
				SeparateUnsubscribeCtrl.userUnsubscribed = true
				SeparateUnsubscribeCtrl.showCustomResponse = false
			})
		}
	})

