angular.module('pages.pageAd', [
	'dating.models.pages',
	'Dating',
	'angucomplete-alt',
	'dating.models.profiles',
	'dating.models.users',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.fullPageAd', {
				url: 'fullPageAd',
				views: {
					'sections@': {
						controller: 'FullPageAdCtrl as fullPageAdCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.full_page,
					},
				},
				resolve: {
					HasFullPage: function($location, authService, GLOBALS) {
						if (!authService.isAuthenticated || !authService.currentUser.showAds || GLOBALS.removeOptimiserRedirects) {
							$location.path('/')
						} else {
							return true
						}
					},
				},
			})
			.state('dating.pages.regOfferOne', {
				url: 'regOfferOne',
				views: {
					'sections@': {
						controller: 'RegOfferCtrl as regOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.reg_offer_one,
					},
				},
			})
			.state('dating.pages.regOfferTwo', {
				url: 'regOfferTwo',
				views: {
					'sections@': {
						controller: 'RegOfferCtrl as regOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.reg_offer_two,
					},
				},
			})
			.state('dating.pages.signOutAd', {
				url: 'signOutAd',
				views: {
					'sections@': {
						controller: 'SignOutCtrl as signOutCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.sign_out,
					},
				},
			})
			.state('dating.pages.emailOfferOne', {
				url: 'emailOfferOne',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_one,
					},
				},
			})
			.state('dating.pages.emailOfferTwo', {
				url: 'emailOfferTwo',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_two,
					},
				},
			})
			.state('dating.pages.emailOfferThree', {
				url: 'emailOfferThree',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_three,
					},
				},
			})
			.state('dating.pages.emailOfferFour', {
				url: 'emailOfferFour',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_four,
					},
				},
			})
			.state('dating.pages.emailOfferFive', {
				url: 'emailOfferFive',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_five,
					},
				},
			})
			.state('dating.pages.emailOfferSix', {
				url: 'emailOfferSix',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_six,
					},
				},
			})
			.state('dating.pages.emailOfferSeven', {
				url: 'emailOfferSeven',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_seven,
					},
				},
			})
			.state('dating.pages.emailOfferEight', {
				url: 'emailOfferEight',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_eight,
					},
				},
			})
			.state('dating.pages.emailOfferNine', {
				url: 'emailOfferNine',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
						templateUrl: globalParams.templateUrls.pages.page_ad.email_offer_nine,
					},
				},
			})
			.state('dating.pages.emailOfferRedirect', {
				url: 'emailOfferRedirect',
				views: {
					'sections@': {
						controller: 'EmailOfferCtrl as emailOfferCtrl',
					},
				},
			})
	})
	.controller('FullPageAdCtrl', function($state, $previousState, PagesModel, HasFullPage, GLOBALS, $rootScope) {
		var fullPageAdCtrl = this
		fullPageAdCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic

		fullPageAdCtrl.themePath = GLOBALS.baseUrl + '/images/'

		fullPageAdCtrl.hasFullPage = HasFullPage

		fullPageAdCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)

		if (fullPageAdCtrl.hasFullPage) {
			PagesModel.setCurrentPage('FullPageAd')
			var trackClick = function() {
				window.location.href = fullPageAdCtrl.fullPageData.landingUrl
			}
			var goToSkipPage = function() {
				if ($previousState.get() == null) {
					$state.go('dating.pages.dashboard')
				} else {
					window.history.back()
				}
			}

			if (GLOBALS.parentSite == 'discreetcrush') {
				fullPageAdCtrl.profiles = [
					{name: 'Suzzy', picture: 'img1.jpg'},
					{name: 'Natalie', picture: 'img2.jpg'},
					{name: 'Caitlin', picture: 'img3.jpg'},
					{name: 'Emma', picture: 'img4.jpg'},
					{name: 'Jenny', picture: 'img5.jpg'},
					{name: 'Rania', picture: 'img6.jpg'},
					{name: 'Kristin', picture: 'img7.jpg'},
					{name: 'Susan', picture: 'img8.jpg'},
					{name: 'Jessica', picture: 'img9.jpg'},
					{name: 'Melany', picture: 'img10.jpg'},
					{name: 'Monica', picture: 'img11.jpg'},
					{name: 'Emily', picture: 'img12.jpg'},
				]
			}

			if (GLOBALS.parentSite == 'localhussies') {
				fullPageAdCtrl.profiles = [
					{name: 'Barbie', picture: 'img1.jpg'},
					{name: 'Angelika', picture: 'img2.jpg'},
					{name: 'Anabel', picture: 'img3.jpg'},
					{name: 'Ameliya', picture: 'img4.jpg'},
					{name: 'Candy', picture: 'img5.jpg'},
					{name: 'Claudia', picture: 'img6.jpg'},
					{name: 'Limonika', picture: 'img7.jpg'},
					{name: 'Genya', picture: 'img8.jpg'},
				]
			}

			if (GLOBALS.siteNameLower == 'racymilfs') {
				fullPageAdCtrl.profiles = [
					{name: 'Caren', picture: 'img1.jpg'},
					{name: 'Natalie', picture: 'img2.jpg'},
					{name: 'Sonia', picture: 'img3.jpg'},
					{name: 'Sara', picture: 'img6.jpg'},
					{name: 'Joanna', picture: 'img7.jpg'},
					{name: 'Mia', picture: 'img5.jpg'},
					{name: 'Limonika', picture: 'img4.jpg'},
					{name: 'Selena HJusta', picture: 'img8.jpg'},
				]
			}

			if (GLOBALS.parentSite == 'foxytemptation') {
				fullPageAdCtrl.profiles = [
					{name: 'Suzzy', age: '29', picture: 'img1.jpg'},
					{name: 'Emily', age: '25', picture: 'img2.jpg'},
					{name: 'Helena', age: '31', picture: 'img3.jpg'},
					{name: 'Jennifer', age: '19', picture: 'img4.jpg'},
					{name: 'Sarah', age: '22', picture: 'img5.jpg'},
				]
			}

			if (GLOBALS.parentSite == 'wivesnow') {
				fullPageAdCtrl.profilesTop = [
					{name: 'Caren', age: '22', picture: 'img1.jpg'},
					{name: 'Helen', age: '28', picture: 'img2.jpg'},
					{name: 'Suzy', age: '30', picture: 'img3.jpg'},
					{name: 'Emma', age: '22', picture: 'img4.jpg'},
				]
				fullPageAdCtrl.profilesBottom = [
					{name: 'Jenny', age: '26', picture: 'img5.jpg'},
					{name: 'Sarah', age: '30', picture: 'img6.jpg'},
					{name: 'Sophia', age: '21', picture: 'img7.jpg'},
					{name: 'Isabella', age: '30', picture: 'img8.jpg'},
				]
			}

			if (GLOBALS.siteNameLower == 'hookupmatches' || GLOBALS.siteNameLower == 'truehotties') {
				fullPageAdCtrl.profiles = [
					{name: 'Veronica', picture: 'img1.jpg'},
					{name: 'Alice', picture: 'img2.jpg'},
					{name: 'Samantha', picture: 'img3.jpg'},
					{name: 'Joanna', picture: 'img4.jpg'},
					{name: 'Belinda', picture: 'img5.jpg'},
					{name: 'Meredith', picture: 'img6.jpg'},
					{name: 'Cheryl', picture: 'img7.jpg'},
					{name: 'Violet', picture: 'img8.jpg'},
					{name: 'Deborah', picture: 'img9.jpg'},
					{name: 'Ruby', picture: 'img10.jpg'},
					{name: 'Kim', picture: 'img11.jpg'},
					{name: 'Kathryn', picture: 'img12.jpg'},
				]
			}

			if (GLOBALS.parentSite === 'xmeeting') {
				fullPageAdCtrl.profiles = [
					{age: 23,name: 'Barbie', picture: 'img1.png'},
					{age: 25,name: 'Angelika', picture: 'img2.png'},
					{age: 24,name: 'Anabel', picture: 'img3.png'},
					{age: 25,name: 'Ameliya', picture: 'img4.png'},
					{age: 26,name: 'Candy', picture: 'img5.png'},
					{age: 28,name: 'Claudia', picture: 'img6.png'},
				]
			}

			if (GLOBALS.parentSite === 'meetwives') {
				fullPageAdCtrl.profiles = [
					{age: 23, name: 'Veronica', picture: 'img1.jpg'},
					{age: 25, name: 'Alice', picture: 'img2.jpg'},
					{age: 24, name: 'Samantha', picture: 'img3.jpg'},
					{age: 25, name: 'Joanna', picture: 'img4.jpg'},
					{age: 26, name: 'Belinda', picture: 'img5.jpg'},
					{age: 28, name: 'Meredith', picture: 'img6.jpg'},
					{age: 22, name: 'Cheryl', picture: 'img7.jpg'},
					{age: 28, name: 'Violet', picture: 'img8.jpg'},
					{age: 30, name: 'Deborah', picture: 'img9.jpg'},
					{age: 22, name: 'Ruby', picture: 'img10.jpg'},
					{age: 26, name: 'Kim', picture: 'img11.jpg'},
					{age: 31, name: 'Kathryn', picture: 'img12.jpg'},
				]
			}

			fullPageAdCtrl.trackClick = trackClick
			fullPageAdCtrl.goToSkipPage = goToSkipPage
			PagesModel.fullPage($rootScope.monetizeFullPageAd).then(function(result) {
					fullPageAdCtrl.fullPageData = result.data
					$rootScope.monetizeFullPageAd = ''
				}
			)
		}
	})
	.controller('SignOutCtrl', function($rootScope, $scope, $timeout, PagesModel, $window, GLOBALS, $state, sharedData, authService) {
		var signOutCtrl = this,
			REDIRECT_COUNTER = 10
		signOutCtrl.themePath = GLOBALS.baseUrl + '/images/'
		signOutCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
		signOutCtrl.isLoggedIn = authService.isAuthenticated

		var currentUserSignOutPageData = Object.assign({}, authService.currentUser)
		signOutCtrl.isSafeMode = currentUserSignOutPageData.safeMode
		signOutCtrl.displayAd = currentUserSignOutPageData.showAds
		signOutCtrl.redirectCounter = REDIRECT_COUNTER
		signOutCtrl.removeOptimiserRedirects = GLOBALS.removeOptimiserRedirects

		GLOBALS.redirectingSignOut = (typeof GLOBALS.redirectingSignOut !== 'undefined') ? GLOBALS.redirectingSignOut : false

		signOutCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)

		if (GLOBALS.parentSite == 'discreetcrush') {
			signOutCtrl.profiles = [
				{name: 'Suzzy', picture: 'out1.jpg'},
				{name: 'Natalie', picture: 'out2.jpg'},
				{name: 'Caitlin', picture: 'out3.jpg'},
				{name: 'Rania', picture: 'out4.jpg'},
				{name: 'Kristin', picture: 'out5.jpg'},
				{name: 'Susan', picture: 'out6.jpg'},
				{name: 'Jessica', picture: 'out7.jpg'},
				{name: 'Melany', picture: 'out8.jpg'},
			]
		}

		if (GLOBALS.parentSite == 'localhussies') {
			signOutCtrl.profiles = [
				{name: 'Caren', picture: 'out1.jpg'},
				{name: 'Natalie', picture: 'out2.jpg'},
				{name: 'Sonia', picture: 'out3.jpg'},
				{name: 'Sara', picture: 'out4.jpg'},
				{name: 'Joanna', picture: 'out5.jpg'},
				{name: 'Mia', picture: 'out6.jpg'},
				{name: 'Limonika', picture: 'out7.jpg'},
				{name: 'Selena', picture: 'out8.jpg'},
			]
		}

		if (GLOBALS.parentSite == 'foxytemptation') {
			signOutCtrl.profiles = [
				{name: 'Suzzy', age: '29', picture: 'out1.jpg'},
				{name: 'Emily', age: '25', picture: 'out2.jpg'},
				{name: 'Helena', age: '31', picture: 'out3.jpg'},
				{name: 'Jennifer', age: '19', picture: 'out4.jpg'},
				{name: 'Sarah', age: '22', picture: 'out5.jpg'},
			]
		}

		if (GLOBALS.parentSite == 'wivesnow') {
			signOutCtrl.profilesTop = [
				{name: 'Sarah', age: '29', picture: 'out1.jpg'},
				{name: 'Emma', age: '28', picture: 'out2.jpg'},
				{name: 'Jenny', age: '30', picture: 'out3.jpg'},
				{name: 'Isabella', age: '30', picture: 'out4.jpg'},
			]
			signOutCtrl.profilesBottom = [
				{name: 'Jenifer', age: '26', picture: 'out5.jpg'},
				{name: 'Lisa', age: '30', picture: 'out6.jpg'},
				{name: 'Helena', age: '21', picture: 'out7.jpg'},
				{name: 'Diana', age: '30', picture: 'out8.jpg'},
			]
		}

		if (GLOBALS.siteNameLower == 'hookupmatches') {
			signOutCtrl.profiles = [
				{name: 'Lindsay', picture: 'out1.jpg'},
				{name: 'Karla', picture: 'out2.jpg'},
				{name: 'Danielle', picture: 'out3.jpg'},
				{name: 'Yvette', picture: 'out4.jpg'},
				{name: 'Stacy', picture: 'out5.jpg'},
				{name: 'Sally', picture: 'out6.jpg'},
				{name: 'Lillie', picture: 'out7.jpg'},
				{name: 'Kimberly', picture: 'out8.jpg'},
			]
		}

		if (GLOBALS.siteNameLower == 'truehotties') {
			signOutCtrl.profiles = [
				{name: 'Agnes', picture: 'out1.jpg'},
				{name: 'Susie', picture: 'out2.jpg'},
				{name: 'Jeannie', picture: 'out3.jpg'},
				{name: 'Myra', picture: 'out4.jpg'},
				{name: 'Wanda', picture: 'out5.jpg'},
				{name: 'Lillian', picture: 'out6.jpg'},
				{name: 'Brooke', picture: 'out7.jpg'},
				{name: 'Melinda', picture: 'out8.jpg'},
			]
		}

		if (GLOBALS.parentSite === 'xmeeting') {
			signOutCtrl.profiles = [
				{age: 23,gender: 'W', name: 'Caren', picture: 'out1.png'},
				{age: 25,gender: 'W', name: 'Natalie', picture: 'out2.png'},
				{age: 24,gender: 'W', name: 'Sonia', picture: 'out3.png'},
				{age: 25,gender: 'W', name: 'Sara', picture: 'out4.png'},
				{age: 26,gender: 'W', name: 'Joanna', picture: 'out5.png'},
				{age: 28,gender: 'W', name: 'Mia', picture: 'out6.png'},
				{age: 22,gender: 'W', name: 'Limonika', picture: 'out7.png'},
				{age: 25,gender: 'W', name: 'Selena', picture: 'out8.png'},
			]
		}

		if (GLOBALS.parentSite === 'meetwives') {
			signOutCtrl.profiles = [
				{age: 23, name: 'Veronica', picture: 'out1.jpg'},
				{age: 25, name: 'Alice', picture: 'out2.jpg'},
				{age: 24, name: 'Samantha', picture: 'out3.jpg'},
				{age: 25, name: 'Joanna', picture: 'out4.jpg'},
				{age: 26, name: 'Belinda', picture: 'out5.jpg'},
				{age: 28, name: 'Meredith', picture: 'out6.jpg'},
				{age: 22, name: 'Cheryl', picture: 'out7.jpg'},
				{age: 28, name: 'Violet', picture: 'out8.jpg'},
				{age: 30, name: 'Deborah', picture: 'out9.jpg'},
				{age: 22, name: 'Ruby', picture: 'out10.jpg'},
				{age: 26, name: 'Kim', picture: 'out11.jpg'},
				{age: 31, name: 'Kathryn', picture: 'out12.jpg'},
			]
		}

		// Clear storage of value so the popup gets displayed again when the user logs in
		if (GLOBALS.isCreditsSite) {
			window.localStorage.removeItem('renewFlowVisible')
		}

		var trackClick = function() {
			window.location.href = signOutCtrl.signOutPageData.landingUrl
		}
		signOutCtrl.trackClick = trackClick

		var redirectOnTimeOut = function() {
			if (signOutCtrl.signOutPageData) {
				if (GLOBALS.redirectingSignOut && signOutCtrl.displayAd) {
					signOutCtrl.redirectCounter--
					if (signOutCtrl.redirectCounter == 0) {
						var redirectOnTimeoutUrl = updateQueryStringParameter(signOutCtrl.signOutPageData.landingUrl, 'keyword', signOutCtrl.signOutPageData.redirectKeyword)
						window.location.href = redirectOnTimeoutUrl
					} else {
						$timeout(redirectOnTimeOut, 1000)
					}
				} else {
					window.location.href = '/'
				}
			}
		}

		function updateQueryStringParameter(uri, key, value) {
			var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
			var separator = uri.indexOf('?') !== -1 ? '&' : '?'
			if (uri.match(re)) {
				return uri.replace(re, '$1' + key + '=' + value + '$2')
			} else {
				return uri + separator + key + '=' + value
			}
		}

		$scope.$on('sign-out:stopRedirect', function() {
			GLOBALS.redirectingSignOut = false
			$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
		})

		$scope.$on('sign-out:success', function() {
			signOutCtrl.isLoggedIn = false
		})
		if (signOutCtrl.isLoggedIn) {
			signOutCtrl.userCity = currentUserSignOutPageData.city
			signOutCtrl.countryCode = currentUserSignOutPageData.countryCode
			signOutCtrl.isLoading = true
			signOutCtrl.displayAd = false
			sharedData.exoSubDataChanged(currentUserSignOutPageData.exoSubParams)
			sharedData.adniumSubDataChanged(currentUserSignOutPageData.adniumSubParams)
			sharedData.goAdserverSubDataChanged(currentUserSignOutPageData.goAdserverSubParams)
			PagesModel.setCurrentPage('signOutAd')
			PagesModel.signOut().then(function(result) {
				$('#chat-widget').empty()
				if (_.isEmpty(result.data)) {
					$rootScope.$broadcast('sign-out:success')
					$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
				} else {
					signOutCtrl.displayAd = !!currentUserSignOutPageData.showAds
					signOutCtrl.signOutPageData = result.data
					$rootScope.$broadcast('sign-out:success')
					GLOBALS.redirectingSignOut = true
					signOutCtrl.bIsMobile = $('body').width() <= 768
					if (!signOutCtrl.removeOptimiserRedirects) {
						redirectOnTimeOut()
					}
				}
				signOutCtrl.isLoading = false
				authService.clearCredentials()
			})
		} else {
			GLOBALS.redirectingSignOut = true
			signOutCtrl.signOutPageData = currentUserSignOutPageData
			signOutCtrl.bIsMobile = $('body').width() <= 768
			angular.element(document.querySelector('.footer-banners')).remove()
			redirectOnTimeOut()
		}
	})
	.controller('RegOfferCtrl', function($location, $scope, $state, $previousState, LocationsModel, UsersModel, ProfilesModel, PagesModel, GLOBALS, authService, $timeout, $modalStack) {
		var regOfferCtrl = this
		var REDIRECT_COUNTER = 40
		regOfferCtrl.themePath = GLOBALS.baseUrl + '/images/'
		regOfferCtrl.isSubmitButtonDisabled = false
		regOfferCtrl.countries = ProfilesModel.getCountries()
		regOfferCtrl.redirectCounter = REDIRECT_COUNTER
		regOfferCtrl.siteUrl = GLOBALS.siteUrl
		regOfferCtrl.siteDomain = GLOBALS.siteDomain
		regOfferCtrl.cupidMail = GLOBALS.cupidDomain
		regOfferCtrl.registrationCompleted = true

		if (!authService.isAuthenticated) {
			$location.path('/')
		}

		$modalStack.dismissAll()
		$('#notify-notice').remove()
		$('#sign-in').hide()

		var redirectOnTimeOut = function() {
			regOfferCtrl.redirectCounter--
			if (regOfferCtrl.redirectCounter === 0) {
				$timeout.cancel(redirectOnTimeOut)
			} else {
				$timeout(redirectOnTimeOut, 1000)
			}
		}

		PagesModel.setCurrentPage('RegOfferOne')
		PagesModel.setCurrentPage('RegOfferTwo')

		redirectOnTimeOut()

		PagesModel.regOfferOne()
			.then(function(result) {
					regOfferCtrl.regOfferData = result.data
					regOfferCtrl.registrationCompleted = result.data.registrationCompleted
					if (regOfferCtrl.registrationCompleted) {
						window.location.href = '/dashboard'
					}
				}
			)

		LocationsModel.getCurrent().then(function(result) {
			regOfferCtrl.currentCity = result.data.city
			regOfferCtrl.currentCountry = result.data.country
		})

		regOfferCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		regOfferCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: regOfferCtrl.location}
		}

		regOfferCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			regOfferCtrl.city = selectedCity.originalObject.region
			regOfferCtrl.textKey = selectedCity.originalObject.textKey
		}

		regOfferCtrl.saveSettings = function() {
			regOfferCtrl.isSubmitButtonDisabled = true
			window.location.href = '/dashboard'
		}
	})
	.controller('EmailOfferCtrl', function($rootScope, $scope, $window, $timeout, $location, PagesModel, LocationsModel, TrackModel, GLOBALS, authService) {
		var emailOfferCtrl = this
		var REDIRECT_COUNTER = 10

		emailOfferCtrl.redirectCounter = REDIRECT_COUNTER
		emailOfferCtrl.themePath = '/images/emailOffer/'
		emailOfferCtrl.isMobile = $('body').width() <= 600

		if (!authService.isAuthenticated) {
			$location.path('/')
		}

		var setCurrentPage = function() {
			var path = $location.path()
			if (path.charAt(0) === '/') {
				path = path.substring(1)
			}
			path = path.charAt(0).toUpperCase() + path.slice(1)
			PagesModel.setCurrentPage(path)
		}
		setCurrentPage()

		LocationsModel.getCurrent().then(function(result) {
			emailOfferCtrl.currentCity = result.data.city
		})

		PagesModel.emailOffer()
			.then(function(result) {
					var data = result.data
					emailOfferCtrl.redirectUrl = data.url + '?email=' + data.email + '&subid=' + data.subId + '&group_id=' + data.groupId
				}
			)

		function getTemplateVersion() {
			var path = PagesModel.getCurrentPage()
			var versionString = path.slice(10)
			var versionNum = ''

			switch (versionString) {
				case 'One':
					versionNum = 1
					break
				case 'Two':
					versionNum = 2
					break
				case 'Three':
					versionNum = 3
					break
				case 'Four':
					versionNum = 4
					break
				case 'Five':
					versionNum = 5
					break
				case 'Six':
					versionNum = 6
					break
				case 'Seven':
					versionNum = 7
					break
				case 'Eight':
					versionNum = 8
					break
				case 'Nine':
					versionNum = 9
					break
			}

			return versionNum
		}

		var templateVersion = getTemplateVersion()

		emailOfferCtrl.trackRedirect = function() {
			TrackModel.adTrackEvent(12,2, templateVersion).then(function() {
				$window.location.href = emailOfferCtrl.redirectUrl
			})
		}
		var redirectOnTimeOut = function() {
			emailOfferCtrl.redirectCounter--
			if (emailOfferCtrl.redirectCounter === 0) {
				emailOfferCtrl.trackRedirect()
			} else {
				$timeout(redirectOnTimeOut, 1000)
			}
		}
		redirectOnTimeOut()

		if ($location.path().indexOf('emailOfferRedirect') !== -1) {
			emailOfferCtrl.trackRedirect()
		}
	})


