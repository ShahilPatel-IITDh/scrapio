angular.module('pages', [
	'pages.datingCenter',
	'pages.dashboard',
	'pages.profiles',
	'pages.plist',
	'pages.viewProfile',
	'pages.messages',
	'pages.editProfile',
	'pages.resetPassword',
	'pages.help',
	'pages.aboutUs',
	'pages.privacy',
	'pages.terms',
	'pages.2257Notice',
	'pages.unSubscribe',
	'pages.mailToPrivacy',
	'pages.contentWall',
	'authBox',
	'emailConfirm',
	'noticeBar',
	'newMessagesAlert',
	'dating.models.pages',
	'dating.models.users',
	'dating.models.profiles',
	'dating.models.updates',
	'dating.models.messages',
	'dating.models.track',
	'dating.directives.fancybox',
	'dating.directives.simplegallery',
	'dating.directives.updates',
	'dating.directives.messages',
	'dating.directives.profilesList',
	'dating.directives.stopRedirect',
	'dating.directives.goBack',
	'dating.interceptors.pageRender',
	'dating.helpers.mobile',
	'dating.helpers.blockUser',
	'dating.directives.signInForm',
	'dating.directives.signUpForm',
	'dating.directives.externalScript',
	'dating.directives.videoPlayer',
	'owlcarousel',
	'Dating',
].concat(window.globalParams.ngModules))
	.service('addTapAndHold', function() {
		var addTapAndHold = function(targetId) {
			var i=0
			var $target = document.getElementById(targetId)
			if ($target) {
				$target.addEventListener('touchstart',function() {
					var t = window.setInterval(function() {
						i+=.5
						if (i>=1) {
							window.clearInterval(t)
							$('#' + targetId + ' .marketing-info').fadeIn()
							i=0
						}
					},500)
				})
				$target.addEventListener('touchend',function() {
					$('#' + targetId + ' .marketing-info').fadeOut()
					i=0
				})
			}
		}
		return addTapAndHold
	})
	.service('showEnableRebillPopup', function($modal, $modalStack) {
		var showEnableRebillPopup = function(popupData) {
			$modal.open({
				templateUrl: globalParams.templateUrls.pages.rebill_custom_popup,
				controller: 'BodyCtrl as bodyCtrl',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					popupData: function() {
						return popupData || {}
					},
				},
			})
			$modalStack.dismissAll()
		}
		return showEnableRebillPopup
	})
	.service('monetizationHook', function(GLOBALS, PagesModel, $window, authService) {
		var monetizationHook = function(optionId) {
			if(GLOBALS.monetizationFlag && authService.isAuthenticated && authService.currentUser.neverUpgraded){
				PagesModel.monetizationCheck(optionId).then(function(result) {
					if(result.data.monetisationUrl != null){
						setTimeout(function() {
							var win = $window.open();
							win.location = result.data.monetisationUrl;
						})
					}
				})
			}
			return
		}
		return monetizationHook
	})
	.config(function() {
		window.globalParams.isMobileScreen = $('body').width() <= 768
		window.globalParams.isMobileScreenFooterBanners = $('body').width() <= 1024
	})
	.config(function($httpProvider) {
		$httpProvider.interceptors.push('pageRenderInterceptor')
	})
	.config(function($stateProvider) {
		var mobileSlug = (globalParams.isMobileScreen ? '-mobile' : '')
		var mobileSlugFooterBanners = (globalParams.isMobileScreenFooterBanners ? '-mobile' : '')
		$stateProvider
			.state('dating.pages', {
				url: '/',
				views: {
					'notificationbar@': {
						controller: 'NotificationBarCtrl as notificationBarCtrl',
						templateUrl: globalParams.templateUrls.email_confirm.notification_bar,
					},
					//target the ui-view named 'navs' in ROOT state
					'navs@': {
						controller: 'PagesCtrl as pagesCtrl',
						templateUrl: globalParams.templateUrls.pages['navs' + mobileSlug],
					},
					'noticebar@': {
						controller: 'NoticeBarCtrl as noticeBarCtrl',
						templateUrl: globalParams.templateUrls.notice_bar.notice_bar,
					},
					'footer@': {
						controller: 'FooterCtrl as footerCtrl',
						templateUrl: globalParams.templateUrls.pages['footer' + mobileSlug],
					},
					'footerbanners@': {
						controller: 'FooterCtrl as footerCtrl',
						templateUrl: globalParams.templateUrls.pages['footer-banners'],
					},
					'leftusernav@': {
						controller: 'LeftUserNavCtrl as leftUserNavCtrl',
						templateUrl: globalParams.templateUrls.pages.leftusernav,
					},
					'searchform@': {
						controller: 'SearchFormCtrl as searchFormCtrl',
						templateUrl: globalParams.templateUrls.pages.searchform,
					},
				},
			})
	})
	.controller('PagesCtrl', function($scope, $modal, $state, $translate, $location, PagesModel, ProfilesModel, EventsModel, MobileHelper, showSignInBox, showSignUpBox, showNewMessagesAlert, GLOBALS, $window, userAccess, MessagesModel, $rootScope, authService) {
		var pagesCtrl = this
		var myEl = {el: null}
		var ExoLoader = myEl.el || window.ExoLoader
		pagesCtrl.isSafeMode = authService.isAuthenticated ? !!authService.currentUser.safeMode : true
		$translate.use(GLOBALS.i18nDefaultLang)
		pagesCtrl.advertisement = GLOBALS.advertisement
		var isNotLander = $state.current.name.indexOf('sugarDaddy') === -1
			&& $state.current.name.indexOf('sugarBaby') === -1
			&& $state.current.name.indexOf('datingCenter') === -1
			&& (($state.current.name !== 'dating.pages' || $state.current.name !== 'dating.pages.dashboard') && pagesCtrl.isLoggedIn === false)
		pagesCtrl.isMobile   = GLOBALS.isMobileScreen
		pagesCtrl.isLoggedIn = authService.isAuthenticated
		pagesCtrl.currentUser = authService.currentUser
		pagesCtrl.externalUpgradeUrl = pagesCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		pagesCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? pagesCtrl.externalUpgradeUrl : '/billing/upgrade'
		pagesCtrl.exoLinksWithAdblockOn = GLOBALS.exoLinksWithAdblockOn
		pagesCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		pagesCtrl.isBillingPartnerCmp = GLOBALS.userInfo.billingPartner && parseInt(GLOBALS.userInfo.billingPartner) === 7
		pagesCtrl.isMainstream = GLOBALS.isMainstreamSite
		pagesCtrl.isRootMainstreamTraffic = pagesCtrl.isMainstream && GLOBALS.userInfo.isRootTraffic
		pagesCtrl.hasFreeMovies = parseInt(GLOBALS.hasFreeMovies)
		pagesCtrl.showAdvertisementLabel = GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
		pagesCtrl.contentWall = GLOBALS.contentWall
		pagesCtrl.userMembership = GLOBALS.membership
		pagesCtrl.featureToggles = GLOBALS.featureToggles
		pagesCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)
		pagesCtrl.monetizationFlag = GLOBALS.monetizationFlag
		pagesCtrl.monetizationPageViewsCount = GLOBALS.monetizationPageViewsCount
		$rootScope.monetizeFullPageAd = ''

		if(pagesCtrl.monetizationFlag && pagesCtrl.isLoggedIn && pagesCtrl.currentUser.neverUpgraded) {
			$rootScope.pageViewsCount = 0
			$rootScope.$on('$stateChangeStart',
			function(event, toState){
				if(toState.name !== 'dating.pages.fullPageAd'){
					$rootScope.pageViewsCount++
				}
				if($rootScope.pageViewsCount === +pagesCtrl.monetizationPageViewsCount) {
					$rootScope.monetizeFullPageAd = '1'
					$rootScope.pageViewsCount = 0
					event.preventDefault()
					$state.go('dating.pages.fullPageAd')
				}
			})
		}

		$rootScope.getUpgradeAttributes = function () {
			var upgrade = {}
			upgrade.url = '/billing/upgrade'
			upgrade.buttonText = 'Upgrade now'
			upgrade.premiumUserStatusText = 'Premium'
			upgrade.showUpgradeButton = true
			upgrade.showPremiumUserStatus = false
			upgrade.showNotifyUpgrade = false
			upgrade.notifyUpgradeText = ''
			upgrade.showCreditsRenewalFlow = false
			upgrade.showCreditsCount = false
			upgrade.showCreditsCountdown = false
			if(GLOBALS.userInfo.membership ==='premium'){
				upgrade.showUpgradeButton = false
				upgrade.showPremiumUserStatus = true
			}
			if(parseInt(GLOBALS.isExternalUpgradeSite)) {
				upgrade.url = authService.isAuthenticated ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
				upgrade.buttonText = (GLOBALS.userInfo.billingPartner && parseInt(GLOBALS.userInfo.billingPartner) === 7) ? 'Unlimited Access' : 'Get Verified'
				upgrade.premiumUserStatusText = 'Verified'
				if(authService.isAuthenticated && GLOBALS.userInfo.membership !='premium') {
					upgrade.showNotifyUpgrade = true
					upgrade.notifyUpgradeText = 'Limited time offer: verify you are 18+ free of charge and unlock all premium features!'
					if(GLOBALS.userInfo.billingPartner && parseInt(GLOBALS.userInfo.billingPartner) === 7) {
						upgrade.notifyUpgradeText = 'Special offer: get instant unlimited access to all premium features!'
					}
				}
			} else if(parseInt(GLOBALS.isCreditsSite)) {
				upgrade.buttonText = 'Unlock credits'
				if(GLOBALS.userInfo.membership==='premium' && GLOBALS.creditsInfo.currentCredits && !$rootScope.creditsReachedZero) {
					upgrade.showCreditsCount = true
					upgrade.showCreditsCountdown = true
				}
				else if(parseInt(GLOBALS.isExPremium)){
					upgrade.buttonText = 'Re-purchase'
					if((GLOBALS.userInfo.membership === 'standard' || $rootScope.creditsReachedZero) && localStorage.getItem('renewFlowVisible') === 'show'){
						upgrade.showCreditsRenewalFlow = true
					}
				}
			}
			$rootScope.upgrade = upgrade;
		}

		pagesCtrl.setRenewFlow = function() {
			if (localStorage.getItem('renewFlowVisible') == null) {
				localStorage.setItem('renewFlowVisible', 'show')
				pagesCtrl.showRenewFlow = true
			}
		}

		pagesCtrl.disableRenewFlow = function() {
			localStorage.setItem('renewFlowVisible', 'hide')
			pagesCtrl.showRenewFlow = false
			$rootScope.getUpgradeAttributes()
		}

		pagesCtrl.getRenewFlow = function() {
			return localStorage.getItem('renewFlowVisible') === 'show'
		}

		pagesCtrl.showRenewFlow = pagesCtrl.getRenewFlow()
		pagesCtrl.imagesUrl = GLOBALS.baseUrl + '/styles/images/'
		pagesCtrl.creditsUrl = GLOBALS.siteUrl + 'profile/edit/settings' + '#credits'
		pagesCtrl.updateCreditCounter = null

		pagesCtrl.setRenewFlow()
		$rootScope.getUpgradeAttributes()

		// Checks if user has credits info so the functions / variables only get assigned if it's a credit site
		if(GLOBALS.creditsInfo && GLOBALS.creditsInfo.currentCredits && GLOBALS.creditsInfo.expiryDate) {
			pagesCtrl.creditCount = GLOBALS.creditsInfo.currentCredits
			pagesCtrl.creditsExpiryDate = GLOBALS.creditsInfo.expiryDate.date
			pagesCtrl.creditsExpiryDateStamp = pagesCtrl.creditsExpiryDate.split(" ")[0]
			pagesCtrl.creditsExpiryTimeStamp = pagesCtrl.creditsExpiryDate.split(" ")[1]
			pagesCtrl.creditsExpiryTimeZone = GLOBALS.creditsInfo.expiryDate.timezone
			$rootScope.creditsReachedZero = false
			$rootScope.liveCreditsCount = pagesCtrl.creditCount

			pagesCtrl.creditsRemainingDays = function() {
				if (pagesCtrl.creditsExpiryDate ) {
					var currentDate = new Date()
					var parsedExpiryDate = Date.parse(new Date(pagesCtrl.creditsExpiryDateStamp + 'T' + pagesCtrl.creditsExpiryTimeStamp))
					var differenceInDays = Math.floor(( parsedExpiryDate - currentDate) / (1000 * 3600 * 24))
					if (differenceInDays < 1) {
						return "less than 1"
					}
					return differenceInDays
				}
			}
			// Interval function that fetches the credit info every 5 seconds
			pagesCtrl.updateCreditCounter = setInterval(function(){
				PagesModel.currentCreditsInfo().then(function (response) {
					if (response.data && response.data.currentCredits){
						$rootScope.liveCreditsCount = response.data.currentCredits
					}
					else {
						location.reload()
					}
				});
				$rootScope.$apply()
			}, 5000)
		}

		if (pagesCtrl.isLoggedIn) {
			pagesCtrl.rebillDisabledABTest = parseInt(authService.currentUser.rebillDisabledABTest)
		}

		if (pagesCtrl.isLoggedIn && GLOBALS.userInfo.exoSubParams) {
			pagesCtrl.exoSub2         = GLOBALS.userInfo.exoSubParams.sub2
			pagesCtrl.exoSub3         = GLOBALS.userInfo.exoSubParams.sub3
			pagesCtrl.exoSubUrlParams = '&sub2=' + pagesCtrl.exoSub2 + '&sub3=' + pagesCtrl.exoSub3
		}
		pagesCtrl.isExPremiumUser = function() {
			return GLOBALS.isExPremium === '1'
		}

		pagesCtrl.isAdblockEnabled = false

		pagesCtrl.desktopTabZonesExoClickUrls = GLOBALS.advertisement.desktopTabZonesExoClickUrls
		pagesCtrl.mobileTabZonesExoClickUrls = GLOBALS.advertisement.mobileTabZonesExoClickUrls
		pagesCtrl.desktopTabZonesAdniumUrls = GLOBALS.advertisement.desktopTabZonesAdniumUrls
		pagesCtrl.mobileTabZonesAdniumUrls = GLOBALS.advertisement.mobileTabZonesAdniumUrls

		pagesCtrl.liveCamsIdZone = 'http://s.vlink4.com/splash.php?idzone='
		pagesCtrl.sexyGamesIdZone = 'http://s.vlink4.com/splash.php?idzone='

		pagesCtrl.stripcashCamTabUrl = GLOBALS.stripcashCamTabUrl

		if (pagesCtrl.isLoggedIn) {
			pagesCtrl.liveCamsTab = pagesCtrl.currentUser.liveCamsTab
			pagesCtrl.sexyGamesTab = pagesCtrl.currentUser.sexyGamesTab
			pagesCtrl.moreGirlsTab = pagesCtrl.currentUser.moreGirlsTab
		}

		ExoLoader.getDetector().detectCensorship(function(block) {
			if (block) {
				pagesCtrl.isAdblockEnabled = true
			}
			$scope.$on('$viewContentLoaded', placeAdCodes())
			angular.element($window).bind('resize', placeAdCodes())
		})

		if (pagesCtrl.isLoggedIn && !userAccess.hasAccess) {
			pagesCtrl.isLoggedIn = false
		}

		function placeAdCodes() {
			if (pagesCtrl.isLoggedIn) {
				pagesCtrl.liveCamsUrl = pagesCtrl.liveCamsTab.url
				pagesCtrl.sexyGamesUrl = pagesCtrl.sexyGamesTab.url
				pagesCtrl.pickupUrl = pagesCtrl.moreGirlsTab.url
				if (+pagesCtrl.featureToggles.GoAdServer && !pagesCtrl.isSafeMode){
					if (GLOBALS.isMobile == '0') {
						pagesCtrl.liveCamsUrl = "//go2.trafficbull.com/redirect.go?pid=11794&spaceid=1242595&keywords=cams&returnurl="
						pagesCtrl.sexyGamesUrl = "//go2.trafficbull.com/redirect.go?pid=11794&spaceid=1242596&keywords=games&returnurl="
					} else {
						pagesCtrl.liveCamsUrl = "//go2.trafficbull.com/redirect.go?pid=11794&spaceid=1242597&keywords=cams&returnurl="
						pagesCtrl.sexyGamesUrl = "//go2.trafficbull.com/redirect.go?pid=11794&spaceid=1242598&keywords=games&returnurl="
					}
				} else if (pagesCtrl.isAdblockEnabled && pagesCtrl.exoLinksWithAdblockOn) {
					pagesCtrl.liveCamsUrl += '&tags=adblock'
					pagesCtrl.sexyGamesUrl += '&tags=adblock'
				}
			}
		}

		pagesCtrl.datingTabsNewBehaviour = function(event) {
			event.preventDefault()
			window.open(event.currentTarget.href)
		}

		if (!isNotLander) {
			if ($state.current.name.indexOf('sugarBaby') !== -1) {
				document.cookie = 'landingPage=sugarBaby;path=/'
				pagesCtrl.currentLander = 'sugarBaby'
			} else if ($state.current.name.indexOf('sugarDaddy') !== -1) {
				document.cookie = 'landingPage=sugarDaddy;path=/'
				pagesCtrl.currentLander = 'sugarDaddy'
			} else {
				pagesCtrl.currentLander = 'datingCenter'
			}
		}

		if (!GLOBALS.mobileQuery && GLOBALS.isMobile == '0' && isNotLander) {
			MobileHelper.setMobileFlag()
			MobileHelper.watchScreenSize()
		}

		pagesCtrl.setSafeMode = function() {
			ProfilesModel.setSafeMode().then(function() {
				window.location.reload()
			})
		}

		$scope.$on('sign-out:success', function() {
			pagesCtrl.isLoggedIn = false
			pagesCtrl.currentLander = 'datingCenter'
			pagesCtrl.currentUser = null
		})

		function countDigits(tickers) {
			var nDigits = 0
			var aWhat = ['nNewMessages', 'nNewMatches', 'nNewLikesYou', 'nNewViewedYou']

			function visibleDigits(number) {
				var i = 0
				while (number) {
					i++
					number = Math.floor(number / 10)
				}
				return i
			}

			$.each(aWhat, function(key, value) {
				if (tickers[value] > 0) {
					nDigits += visibleDigits(tickers[value])
				}
			})
			return nDigits
		}

		function LeaveSiteNotification() {
			window.onbeforeunload = function(e) {
				e = e || window.event

				if (e) {
					e.returnValue = 'Any string'
				}

				return 'Any string'
			}
		}
		if (parseInt(GLOBALS.showLeaveSiteWarningPopup)) {
			LeaveSiteNotification()
		}

		pagesCtrl.showSignInBox = showSignInBox
		pagesCtrl.showSignUpBox = showSignUpBox
		pagesCtrl.nNewMessagesCount = 0

		if (pagesCtrl.isLoggedIn) {
			pagesCtrl.noAvatar = pagesCtrl.currentUser.avatar.indexOf('no_photo_') > -1
			$scope.$on('no_photo:true', function() {
				pagesCtrl.noAvatar = true
			})
			$scope.$on('no_photo:false', function() {
				pagesCtrl.noAvatar = false
			})

			if (+pagesCtrl.featureToggles.getTickers_) {
				EventsModel.getTickers().then(function(result) {
					var convertToNumbers = function(obj) {
						Object.keys(obj).forEach(function(key) {
							obj[key] = parseInt(obj[key])
						})
						return obj
					}
					pagesCtrl.tickers = convertToNumbers(result.data)
				})

				pagesCtrl.shouldShowMessages = true
				$scope.$on('clear_messages', function() {
					pagesCtrl.shouldShowMessages = false
				})
			}

			MessagesModel.getUnread().then(function(result) {
				pagesCtrl.nNewMessagesCount = result.data.totalUnreadMessages
			})

			if (+pagesCtrl.featureToggles.getTickersSE) {
				EventsModel.getTickers().then(function(result) {
					pagesCtrl.tickers = result.data
				})
				angular.element($window).bind('scroll', function() {
					var offsetY = this.pageYOffset
					var limit = angular.element('.top-header').innerHeight()
					if (angular.element('.upgrade-bar').length > 0) {
						limit += angular.element('.upgrade-bar').innerHeight()
					}
					if (angular.element('.notification-bar').length > 0) {
						limit += angular.element('.notification-bar').innerHeight()
					}
					if (offsetY > limit) {
						angular.element('.body-container').addClass('on-top')
					} else {
						angular.element('.body-container').removeClass('on-top')
					}
				})
			}
		}
		pagesCtrl.siteName = GLOBALS.siteName
		pagesCtrl.siteDomain = GLOBALS.siteDomain
		pagesCtrl.siteUrl = GLOBALS.siteUrl
		pagesCtrl.logo = GLOBALS.logo
		pagesCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}
		pagesCtrl.isCurrentPage = function(page) {
			return PagesModel.isCurrentPage(page)
		}
		pagesCtrl.isActivityPage = function() {
			var currentPage = PagesModel.getCurrentPage()
			var activityPages = ['overview', 'matches', 'likesyou', 'viewedyou', 'youlike', 'youviewed']
			return (activityPages.indexOf(currentPage) > -1)
		}
		pagesCtrl.isMatchesPage = function() {
			var currentPage = PagesModel.getCurrentPage()
			var matchesPages = ['matches', 'likesyou', 'youlike']
			return (matchesPages.indexOf(currentPage) > -1)
		}
		pagesCtrl.isViewsPage = function() {
			var currentPage = PagesModel.getCurrentPage()
			var viewsPages = ['viewedyou', 'youviewed']
			return (viewsPages.indexOf(currentPage) > -1)
		}
		pagesCtrl.isProfilePage = function() {
			var currentPage = PagesModel.getCurrentPage()
			return ($location.path() == '/profile/view/id/me' || currentPage == 'EditProfile')
		}

		pagesCtrl.onLikesYouSelected = function() {
			EventsModel.sendEvent('updateLastViewedRequestsTab')
			if (pagesCtrl.tickers) {
				pagesCtrl.tickers.nNewLikesYou = 0
			}
		}
		pagesCtrl.onViewedYouSelected = function() {
			EventsModel.sendEvent('updateViewedYouTabTime')
			if (pagesCtrl.tickers) {
				pagesCtrl.tickers.nNewViewedYou = 0
			}
		}
		pagesCtrl.onMatchesSelected = function() {
			EventsModel.sendEvent('updateLastViewedMatchesTab')
			if (pagesCtrl.tickers) {
				pagesCtrl.tickers.nNewMatches = 0
			}
		}
		pagesCtrl.onMessagesSelected = function() {
			EventsModel.sendEvent('updateLastViewedMessagesTab')
			if (pagesCtrl.tickers) {
				pagesCtrl.tickers.nNewMessages = 0
			}
		}

		if ($state.current.name != 'dating.pages.unSubscribe') {
			showNewMessagesAlert()
		}
		if ($state.current.name == 'dating.pages') {
			if (!window.globalParams.isMobileScreen || !isNotLander) {
				$state.go(pagesCtrl.isLoggedIn ? 'dating.pages.dashboard' : 'dating.pages.datingCenter')
			}
			if (window.globalParams.isMobileScreen && isNotLander) {
				$state.go(pagesCtrl.isLoggedIn ? 'dating.pages.dashboardMobile' : 'dating.pages.datingCenterMobile')
			}
		}
		function noPhotoModalBox() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.pages.no_photo_popup,
				controller: 'NoPhotoModalBox as noPhotoModalBox',
				size: (GLOBALS.userInfo.gender == 1) ? 'noPhotoWoman' : 'noPhotoMan',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
		}

		if (pagesCtrl.rebillDisabledABTest && +pagesCtrl.featureToggles.rebillDisabledABTest) {
			$rootScope.$broadcast('showEnableRebillPopup')
			setTimeout(function() {
				$('.rebillCustomPopup3').show()
			}, 500)
		}

		function random(a, b) {
			return a + Math.floor(Math.random() * (b - a))
		}
		pagesCtrl.members = 250000 + random(0, 9999)
		pagesCtrl.online = 32000 + random(0, 999)
	})
	.controller('NoPhotoModalBox', function(GLOBALS) {
		var noPhotoModalBox = this
		noPhotoModalBox.isMobile = GLOBALS.isMobileScreen
		noPhotoModalBox.isWoman = (GLOBALS.userInfo.gender == 1)
		noPhotoModalBox.goToEditPhoto = function() {
			GLOBALS.toPhotoUpload = true
		}
	})
	.controller('FooterCtrl', function($scope, $state, PagesModel, GLOBALS, userAccess, showSignInBox, showSignUpBox, $window, ProfilesModel, authService) {
		var footerCtrl = this,

			captchaCode = null
		footerCtrl.isLoggedIn = authService.isAuthenticated
		if (footerCtrl.isLoggedIn && !userAccess.hasAccess) {
			footerCtrl.isLoggedIn = false
		}

		footerCtrl.isMobileScreenFooterBanners = GLOBALS.isMobileScreenFooterBanners
		footerCtrl.companyName = GLOBALS.companyName
		footerCtrl.companyCountry = GLOBALS.companyCountry
		footerCtrl.companyAddress = GLOBALS.companyAddress
		footerCtrl.isSafeMode = authService.isAuthenticated ? !!authService.currentUser.safeMode : true
		footerCtrl.siteName = GLOBALS.siteName
		footerCtrl.siteDomain = GLOBALS.siteDomain
		footerCtrl.siteUrl = GLOBALS.siteUrl
		footerCtrl.year = GLOBALS.year
		footerCtrl.showSignInBox = showSignInBox
		footerCtrl.showSignUpBox = showSignUpBox
		footerCtrl.isRegistered =  footerCtrl.isLoggedIn ? GLOBALS.user.isRegistered : false
		footerCtrl.imagesUrl = GLOBALS.baseUrl + '/images/'
		footerCtrl.exoLinksWithAdblockOn = GLOBALS.exoLinksWithAdblockOn
		footerCtrl.advertisement = GLOBALS.advertisement
		footerCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		footerCtrl.isMainstream = GLOBALS.isMainstreamSite
		footerCtrl.isRootTraffic = GLOBALS.userInfo.isRootTraffic
		footerCtrl.hasFreeMovies = parseInt(GLOBALS.hasFreeMovies)
		footerCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
		footerCtrl.contentWall =  GLOBALS.contentWall

		footerCtrl.desktopTabZonesExoClickUrls = GLOBALS.advertisement.desktopTabZonesExoClickUrls
		footerCtrl.mobileTabZonesExoClickUrls = GLOBALS.advertisement.mobileTabZonesExoClickUrls
		footerCtrl.desktopTabZonesAdniumUrls = GLOBALS.advertisement.desktopTabZonesAdniumUrls
		footerCtrl.mobileTabZonesAdniumUrls = GLOBALS.advertisement.mobileTabZonesAdniumUrls

		footerCtrl.stripcashCamTabUrl = GLOBALS.stripcashCamTabUrl

		footerCtrl.currentUser = authService.currentUser
		footerCtrl.isRootMainstreamTraffic = footerCtrl.isMainstream && GLOBALS.userInfo.isRootTraffic
		if (footerCtrl.isLoggedIn && GLOBALS.userInfo.exoSubParams) {
			footerCtrl.exoSub2         = GLOBALS.userInfo.exoSubParams.sub2
			footerCtrl.exoSub3         = GLOBALS.userInfo.exoSubParams.sub3
			footerCtrl.exoSubUrlParams = '&sub2=' + footerCtrl.exoSub2 + '&sub3=' + footerCtrl.exoSub3
		}
		footerCtrl.liveCamsIdZone = 'http://s.vlink4.com/splash.php?idzone='
		footerCtrl.sexyGamesIdZone = 'http://s.vlink4.com/splash.php?idzone='

		if (footerCtrl.isLoggedIn) {
			footerCtrl.liveCamsTab = footerCtrl.currentUser.liveCamsTab
			footerCtrl.sexyGamesTab = footerCtrl.currentUser.sexyGamesTab
			footerCtrl.moreGirlsTab = footerCtrl.currentUser.moreGirlsTab
		}

		footerCtrl.setSafeMode = function() {
			ProfilesModel.setSafeMode().then(function() {
				window.location.reload()
			})
		}

		$scope.$on('sign-out:success', function() {
			footerCtrl.isLoggedIn = false
			footerCtrl.currentUser = null
		})

		footerCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}

		footerCtrl.isCurrentPage = function(page) {
			return PagesModel.isCurrentPage(page)
		}

		footerCtrl.isActivityPage = function() {
			var currentPage = PagesModel.getCurrentPage()
			var activityPages = ['overview', 'matches', 'likesyou', 'viewedyou', 'youlike', 'youviewed']
			return (activityPages.indexOf(currentPage) > -1)
		}

		footerCtrl.goTop = function() {
			$('html, body').animate({scrollTop: 0}, 500)
		}

		footerCtrl.datingTabsNewBehaviour = function(event) {
			event.preventDefault()
			window.open(event.currentTarget.href)
		}

		if (footerCtrl.isLoggedIn) {
			footerCtrl.noAvatar = footerCtrl.currentUser.avatar.indexOf('no_photo_') > -1
			$scope.$on('no_photo:true', function() {
				footerCtrl.noAvatar = true
			})
			$scope.$on('no_photo:false', function() {
				footerCtrl.noAvatar = false
			})
		}

		footerCtrl.isAdblockEnabled = false

		window.ExoLoader.getDetector().detectCensorship(function(block) {
			if (block) {
				footerCtrl.isAdblockEnabled = true
			}
			$scope.$on('$viewContentLoaded', placeAdCodes())
			angular.element($window).bind('resize', placeAdCodes())
		})

		function placeAdCodes() {
			if (footerCtrl.isLoggedIn) {
				footerCtrl.liveCamsUrl = footerCtrl.liveCamsTab.url
				footerCtrl.sexyGamesUrl = footerCtrl.sexyGamesTab.url
				footerCtrl.pickupUrl = footerCtrl.moreGirlsTab.url

				if (footerCtrl.isAdblockEnabled && footerCtrl.exoLinksWithAdblockOn) {
					footerCtrl.liveCamsUrl += '&tags=adblock'
					footerCtrl.sexyGamesUrl += '&tags=adblock'
				}
			}
		}
	})
	.controller('LeftUserNavCtrl', function($scope, $state, $stateParams, $location, authService, EventsModel, PagesModel, ProfilesModel, userAccess, GLOBALS, $window) {
		var leftUserNavCtrl = this,
			currentPage = $stateParams.page || 1,
			profilesPerPage = 20,
			searchFilter = ProfilesModel.parseSearchParams($stateParams.filter),
			defaultFilter

		leftUserNavCtrl.isMobile = parseInt(GLOBALS.isMobile)
		leftUserNavCtrl.isLoggedIn = authService.isAuthenticated
		leftUserNavCtrl.currentUser = authService.currentUser
		leftUserNavCtrl.creditsUrl = GLOBALS.siteUrl + 'profile/edit/settings' + '#credits'
		leftUserNavCtrl.showExoclickAds = leftUserNavCtrl.currentUser && leftUserNavCtrl.currentUser.showExoclickAds ? true : false

		if (leftUserNavCtrl.isLoggedIn && !userAccess.hasAccess) {
			leftUserNavCtrl.isLoggedIn = false
		}
		leftUserNavCtrl.isSafeMode = authService.isAuthenticated ? !!authService.currentUser.safeMode : true
		leftUserNavCtrl.advertisement = GLOBALS.advertisement
		leftUserNavCtrl.isMainstream = GLOBALS.isMainstreamSite
		leftUserNavCtrl.isRootMainstreamTraffic = leftUserNavCtrl.isMainstream && GLOBALS.userInfo.isRootTraffic
		leftUserNavCtrl.hasFreeMovies = parseInt(GLOBALS.hasFreeMovies)
		leftUserNavCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
		leftUserNavCtrl.contentWall = GLOBALS.contentWall

		if (leftUserNavCtrl.isLoggedIn && GLOBALS.userInfo.exoSubParams) {
			leftUserNavCtrl.exoSub2         = GLOBALS.userInfo.exoSubParams.sub2
			leftUserNavCtrl.exoSub3         = GLOBALS.userInfo.exoSubParams.sub3
			leftUserNavCtrl.exoSubUrlParams = '&sub2=' + leftUserNavCtrl.exoSub2 + '&sub3=' + leftUserNavCtrl.exoSub3
		}
		leftUserNavCtrl.liveCamsIdZone = 'http://s.vlink4.com/splash.php?idzone='
		leftUserNavCtrl.sexyGamesIdZone = 'http://s.vlink4.com/splash.php?idzone='

		leftUserNavCtrl.desktopTabZonesExoClickUrls = GLOBALS.advertisement.desktopTabZonesExoClickUrls
		leftUserNavCtrl.mobileTabZonesExoClickUrls = GLOBALS.advertisement.mobileTabZonesExoClickUrls
		leftUserNavCtrl.desktopTabZonesAdniumUrls = GLOBALS.advertisement.desktopTabZonesAdniumUrls
		leftUserNavCtrl.mobileTabZonesAdniumUrls = GLOBALS.advertisement.mobileTabZonesAdniumUrls

		leftUserNavCtrl.stripcashCamTabUrl = GLOBALS.stripcashCamTabUrl

		leftUserNavCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		if(leftUserNavCtrl.isExternalUpgradeSite) {
			leftUserNavCtrl.upgradeUrl = leftUserNavCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
			leftUserNavCtrl.upgradeText = leftUserNavCtrl.isBillingPartnerCmp ? 'Unlimited Access' : 'Get Verified'
		} else {
			leftUserNavCtrl.upgradeUrl = '/billing/upgrade'
			leftUserNavCtrl.upgradeText = 'Upgrade now'
		}
		leftUserNavCtrl.isBillingPartnerCmp = GLOBALS.userInfo.billingPartner && parseInt(GLOBALS.userInfo.billingPartner) === 7

		if (leftUserNavCtrl.isLoggedIn) {
			leftUserNavCtrl.liveCamsTab = leftUserNavCtrl.currentUser.liveCamsTab
			leftUserNavCtrl.sexyGamesTab = leftUserNavCtrl.currentUser.sexyGamesTab
			leftUserNavCtrl.moreGirlsTab = leftUserNavCtrl.currentUser.moreGirlsTab
		}

		leftUserNavCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}

		leftUserNavCtrl.getCurrentSection = function() {
			return $location.path()
		}

		leftUserNavCtrl.updateUI = function () {
			leftUserNavCtrl.showEditProfileNav = leftUserNavCtrl.getCurrentPage() === 'EditProfile'
			leftUserNavCtrl.showUpdatesWidget = leftUserNavCtrl.getCurrentPage() === 'Dashboard' || leftUserNavCtrl.getCurrentPage() === 'Profiles'
			leftUserNavCtrl.showMainNav = leftUserNavCtrl.getCurrentPage() !== 'EditProfile'
			leftUserNavCtrl.showSearchWidget = leftUserNavCtrl.getCurrentPage() === 'ViewProfile' || leftUserNavCtrl.getCurrentPage() === 'Play';
		}

		ProfilesModel.getSearchProfiles(currentPage, searchFilter).then(function(result) {
			leftUserNavCtrl.searchProfiles = result.profiles
			leftUserNavCtrl.totalProfiles = result.total_profiles
			leftUserNavCtrl.currentPage = currentPage
			leftUserNavCtrl.isLoading = false
		})

		if (leftUserNavCtrl.currentUser) {
			EventsModel.getTickers().then(function(result) {
				leftUserNavCtrl.tickers = result.data
			})
		}

		$scope.$on('sign-out:success', function() {
			leftUserNavCtrl.isLoggedIn = false
			leftUserNavCtrl.currentUser = null
		})

		leftUserNavCtrl.onMessagesSelected = function() {
			EventsModel.sendEvent('updateLastViewedMessagesTab')
			leftUserNavCtrl.tickers.nNewMessages = 0
		}

		leftUserNavCtrl.onMatchesSelected = function() {
			EventsModel.sendEvent('updateLastViewedMatchesTab')
			leftUserNavCtrl.tickers.nNewMatches = 0
		}

		leftUserNavCtrl.onViewedYouSelected = function() {
			EventsModel.sendEvent('updateViewedYouTabTime')
			leftUserNavCtrl.tickers.nNewViewedYou = 0
		}

		leftUserNavCtrl.onLikesYouSelected = function() {
			EventsModel.sendEvent('updateLastViewedRequestsTab')
			leftUserNavCtrl.tickers.nNewLikesYou = 0
		}

		leftUserNavCtrl.datingTabsNewBehaviour = function(event) {
			event.preventDefault()
			window.open(event.currentTarget.href)
		}

		leftUserNavCtrl.updateUI()
		$scope.$on('$locationChangeStart', function() {
			leftUserNavCtrl.updateUI()
		})

		$scope.$on('$viewContentLoaded', placeAdCodes())
		angular.element($window).bind('resize', placeAdCodes())

		function placeAdCodes() {
			if (leftUserNavCtrl.isLoggedIn) {
				leftUserNavCtrl.liveCamsUrl = leftUserNavCtrl.liveCamsTab.url
				leftUserNavCtrl.sexyGamesUrl = leftUserNavCtrl.sexyGamesTab.url
				leftUserNavCtrl.pickupUrl = leftUserNavCtrl.moreGirlsTab.url
			}
		}
	})
	.controller('SearchFormCtrl', function($scope, $state, $stateParams, PagesModel, ProfilesModel, GLOBALS, PROFILE_SETTINGS, authService, $modal) {
		var searchFormCtrl = this,
			currentPage = $stateParams.page || 1,
			profilesPerPage = 20,
			searchFilter = ProfilesModel.parseSearchParams($stateParams.filter),
			defaultFilter
		searchFormCtrl.isLoggedIn = authService.isAuthenticated
		searchFormCtrl.currentUser = authService.currentUser

		ProfilesModel.getSearchProfiles(currentPage, searchFilter).then(function(result) {
			searchFormCtrl.searchProfiles = result.profiles
			searchFormCtrl.totalProfiles = result.total_profiles
			searchFormCtrl.currentPage = currentPage
			searchFormCtrl.isLoading = false
		})

		searchFormCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}

		searchFormCtrl.showUpgradePopup = function () {
			if (searchFormCtrl.nProfileInsteadOfLprofile && (!searchFormCtrl.isLoggedIn || searchFormCtrl.currentUser.membership !== 'premium')) {
				$modal.open({
					templateUrl: globalParams.templateUrls.pages.upgrade_popup,
					controller: 'UpgradeBoxCtrl as upgradeBoxCtrl',
					size: 'upgradePopup'
				})
			}
		}

		searchFormCtrl.pageChanged = function() {
			$state.go('dating.pages.profiles', {
				page: searchFormCtrl.currentPage,
			})
		}

		searchFormCtrl.filterProfiles = function() {
			$state.go('dating.pages.profiles', {
				page: searchFormCtrl.currentPage,
				filter: ProfilesModel.buildSearchParams(searchFormCtrl.profilesFilter),
			})
		}

		searchFormCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		searchFormCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: searchFormCtrl.profilesFilter.whereCountry}
		}

		searchFormCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			searchFormCtrl.profilesFilter.whereCity = selectedCity.originalObject.region
			searchFormCtrl.profilesFilter.whereExactLocation = selectedCity.originalObject.textKey
		}
		searchFormCtrl.isLoading = true
		searchFormCtrl.countries = ProfilesModel.getSearchCountries()
		searchFormCtrl.minAges = ProfilesModel.getMinAges()
		searchFormCtrl.maxAges = ProfilesModel.getMaxAges()
		searchFormCtrl.profilesPerPage = profilesPerPage
		searchFormCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile
		defaultFilter = {
			whereCountry: GLOBALS.userInfo.location,
			whereCity: GLOBALS.userInfo.city,
			lowAge: searchFormCtrl.minAges[0],
			highAge: searchFormCtrl.minAges[searchFormCtrl.minAges.length - 1],
			withPhotos: true,
		}

		var obj =_.find(searchFormCtrl.countries, ['code', defaultFilter.whereCountry])
		if (!obj) {
			defaultFilter.whereCountry = ''
			defaultFilter.whereCity = ''
		}

		searchFormCtrl.profilesFilter = searchFilter ? searchFilter : defaultFilter
		searchFormCtrl.profileSettingsOptions = PROFILE_SETTINGS[searchFormCtrl.currentUser ? (searchFormCtrl.currentUser.gender == 1 ? 2 : 1) : 1]
		_.each(searchFormCtrl.profileSettingsOptions, function(item, key) {
			_.each(item, function(text, id) {
				if (text.toLowerCase() == 'prefer not to say') {
					item = _.omit(item, id)
				}
				if (key == 'education' && text.indexOf('(') > -1) {
					//adjust by removing () from Associate's degree (2 years college) and BA/BS (4 years college)
					text = text.replace(/ *\([^)]*\) */g, '')
					item[id] = text
				}
				if (key == 'height' && text.indexOf('/') > -1) {
					//adjust by removing ft measures
					text = text.replace(/ *[^)]*\/ */g, '')
					item[id] = text
				}
			})
			searchFormCtrl.profileSettingsOptions[key] = item
		})
		$scope.$on('sign-out:success', function() {
			searchFormCtrl.isLoggedIn = false
			searchFormCtrl.currentUser = null
		})

	})
	.directive('resizeSelect', function() {
		return {
			restrict: 'A',
			link: function($scope, $elm) {
				function resizeElement() {
					$('#hiddenSelect option').html($('#' + $($elm).attr('id') + ' option:selected').text())
					$('#' + $($elm).attr('id')).width($('#hiddenSelect').width() - 20)
				}
				$elm.on('change', resizeElement)
				setTimeout(resizeElement, 10)
			},
		}
	})
	.controller('BodyCtrl', function(authService, $scope, $window, PagesModel, showEnableRebillPopup, ProfilesModel) {
		var bodyCtrl = this
		bodyCtrl.mobileResolution = false
		bodyCtrl.isLoggedIn = authService.isAuthenticated
		bodyCtrl.isMobile = false
		bodyCtrl.showLeftNav = true
		bodyCtrl.showEnableRebillPopup = showEnableRebillPopup
		bodyCtrl.profiles = [{picture: 'Marguot.png', name: 'Marguot'},
			{picture: 'mrsdiva.png', name: 'mrsdiva'},
			{picture: 'amoreamo.png', name: 'amoreamo'},
			{picture: 'grownsexy.png', name: 'grownnsexy'},
			{picture: 'Zeina.png', name: 'Zeina'},
			{picture: 'daringnicole.png', name: 'daringnicole'},
		]
		if (!bodyCtrl.isLoggedIn) {
			bodyCtrl.showLeftNav = false
		}
		$scope.$on('sign-out:success', function() {
			bodyCtrl.isLoggedIn = false
			bodyCtrl.showLeftNav = false
		})

		bodyCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}

		$scope.$on('$viewContentLoaded', function() {
			bodyCtrl.inViewProfile = bodyCtrl.getCurrentPage() === 'ViewProfile'
			bodyCtrl.notInFullPageAd = bodyCtrl.getCurrentPage() !== 'FullPageAd'
			bodyCtrl.notInSignOutAd = bodyCtrl.getCurrentPage() !== 'signOutAd'
			bodyCtrl.notInProfiles = bodyCtrl.getCurrentPage() !== 'Profiles'
			bodyCtrl.notInRegOfferOne = bodyCtrl.getCurrentPage() !== 'RegOfferOne'
			bodyCtrl.notInRegOfferTwo = bodyCtrl.getCurrentPage() !== 'RegOfferTwo'
			bodyCtrl.inEditProfile = bodyCtrl.getCurrentPage() === 'EditProfile'
			bodyCtrl.inDashboard = bodyCtrl.getCurrentPage() === 'Dashboard'
			bodyCtrl.inMessages = bodyCtrl.getCurrentPage() === 'Messages'
			bodyCtrl.inActivity = ['matches', 'viewedyou', 'likesyou', 'youlike'].indexOf(bodyCtrl.getCurrentPage()) !== -1
			bodyCtrl.notInSeparateUnsubscribe = bodyCtrl.getCurrentPage() !== 'SeparateUnsubscribe'
			bodyCtrl.inEmailOffer = bodyCtrl.getCurrentPage() && bodyCtrl.getCurrentPage().includes('EmailOffer')
		})

		bodyCtrl.customRebillPopupsStep4 = function() {
			$('.rebillCustomPopup3').hide()
			ProfilesModel.changeRebill(1).then(function() {
				window.location.reload()
			})
		}

		$scope.$on('showEnableRebillPopup', function() {
			showEnableRebillPopup()
		})

	})
	.controller('DocumentClickCtrl', function(GLOBALS, EventsModel, authService, $scope) {
		var documentClickCtrl = this
		documentClickCtrl.currentUser = authService.currentUser
		documentClickCtrl.isLoggedIn = authService.isAuthenticated
		documentClickCtrl.removeOptimiserRedirects = GLOBALS.removeOptimiserRedirects

		function showPopUnder(url) {
			var emailCurrentUser, subId, groupIdExitPopup, urlPopUnder, keyword
			if (url == undefined) {
				url = window.location.href
			}

			function createPopUnder(sUrl) {
				var parent   = (top != self && typeof (top.document.location.toString()) === 'string') ? top : self
				var pName    = '_blank'
				var pWidth = $(window).width()
				var pHeight = $(window).height()
				var pPosX = (window.screenX != undefined) ? window.screenX : 0
				var pPosY = (window.screenY != undefined) ? window.screenY : 0
				var pMenuBar = (window.menubar && window.menubar.visible == true) ? 'yes' : 'no'
				var pToolBar = (window.toolbar && window.toolbar.visible == true) ? 'yes' : 'no'
				var browser = function() {
					var n = navigator.userAgent.toLowerCase()
					var b = ''
					if (/msie|trident/i.test(n) || /msie/i.test(n)) {
						b = 'ie'
					} else if (/firefox/i.test(n)) {
						b = 'firefox'
					} else if (/opera/i.test(n) || /opr/i.test(n)) {
						b = 'opera'
					} else if (/chrome/i.test(n) && /windows/i.test(n)) {
						b = 'chrome'
					} else if (/webkit/i.test(n)) {
						b = 'webkit'
					} else if (/safari/i.test(n) && !(/chrome/.test(n))) {
						b = 'safari'
					}
					return b
				}()

				function openNewBackgroundTab() {
					var a   = document.createElement('a')
					a.href  = sUrl
					var evt = document.createEvent('MouseEvents')
					evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null)
					a.dispatchEvent(evt)
				}
				function openCloseWindow() {
					var ghost = window.open('about:blank')
					ghost.focus()
					ghost.close()
				}

				var sOptions = 'toolbar=' + pToolBar + ',scrollbars=yes,location=yes,statusbar=yes,menubar=' + pMenuBar + ',resizable=1,width=' + pWidth.toString() + ',height=' + pHeight.toString() + ',screenX=' + pPosX + ',screenY=' + pPosY

				if (browser == 'chrome' || browser == 'opera') {
					openNewBackgroundTab(sUrl)
				} else {
					var popUnder = parent.window.open(sUrl, pName, sOptions)
					if (popUnder) {
						try {
							popUnder.blur()
							popUnder.opener.window.focus()
							window.self.window.blur()
							window.focus()
							if (browser == 'firefox') {
								openCloseWindow()
							}
						} catch (e) {
							// popunder blocked by browser
						}
					}
				}
			}

			if (documentClickCtrl.isLoggedIn) {
				emailCurrentUser = documentClickCtrl.currentUser.emailCurrentUser
				if (GLOBALS.displayOneclickPopupOnExit && emailCurrentUser) {
					GLOBALS.displayOneclickPopupOnExit = false
					subId = documentClickCtrl.currentUser.subid
					groupIdExitPopup = GLOBALS.groupIdExitPopup ? GLOBALS.groupIdExitPopup : 94
					keyword = parseInt(GLOBALS.isMobile) ? GLOBALS.siteShortName + '_mobile' : GLOBALS.siteShortName
					urlPopUnder = 'https://tmoptimiser.net/?group_id=' + groupIdExitPopup + '&keyword=' + keyword + '&email=' + emailCurrentUser + '&subid=' + subId
					EventsModel.sendEvent('updateLastViewedOneclickPopupOnExit')
					createPopUnder(urlPopUnder)
				}
			}
		}
		if (!documentClickCtrl.removeOptimiserRedirects) {
			documentClickCtrl.showPopUnder = showPopUnder
		}

		$scope.$on('sign-out:success', function() {
			documentClickCtrl.isLoggedIn = false
			documentClickCtrl.currentUser = null
		})
	})
	.directive('documentClick', function() {
		return {
			restrict: 'A',
			controller: 'DocumentClickCtrl',
			controllerAs: 'documentClickCtrl',
			bindToController: true,
			link: function(scope, element, attr , documentClickCtrl) {
				if (globalParams.displayOneclickPopupOnExit && !documentClickCtrl.removeOptimiserRedirects) {
					$(element).on('click', 'a:not(.no-under)', function(ev) {
						ev.stopPropagation()
						var currentTarget = ev.currentTarget
						var el = angular.element(currentTarget)
						documentClickCtrl.showPopUnder($(this).attr('href'))
					})
				}
			},
		}
	})
	.controller('UpgradeBoxCtrl', function(PagesModel, authService, GLOBALS) {
		var upgradeBoxCtrl = this

		upgradeBoxCtrl.isLoggedIn = authService.isAuthenticated
		var externalUpgradeUrl = upgradeBoxCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		upgradeBoxCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? externalUpgradeUrl : '/billing/upgrade'
		upgradeBoxCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		upgradeBoxCtrl.isBillingPartnerCmp = GLOBALS.userInfo.billingPartner && parseInt(GLOBALS.userInfo.billingPartner) === 7

		upgradeBoxCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}

        if (upgradeBoxCtrl.getCurrentPage() === 'EditProfile') {
			upgradeBoxCtrl.title = 'Location settings are available for premium users only!'
		} else {
			upgradeBoxCtrl.title = 'Advanced search options are available for premium users only!'
		}
	})

