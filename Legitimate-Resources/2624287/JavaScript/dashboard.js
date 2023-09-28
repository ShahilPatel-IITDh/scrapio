angular.module('pages.dashboard', [
	'dating.models.pages',
	'dating.models.profiles',
	'dating.models.events',
	'userSteps',
	'oneClick',
	'ui.bootstrap',
	'Dating',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.dashboard', {
				url: 'dashboard',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'DashboardCtrl as dashboardCtrl',
						templateUrl: globalParams.templateUrls.pages.dashboard,
					},
				},
			})
	})
	.controller('DashboardCtrl', function($state, PagesModel, ProfilesModel, EventsModel, showStep1Box, showStep2Box, showUpdatePasswordBox, showAffiliateOneClickStep1Box, showAffiliateOneClickStep2Box, showAffiliateOneClickStep3Box, showOneClickBox, GLOBALS, authService, $rootScope, monetizationHook) {
		if (!authService.isAuthenticated) {
			$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
			return
		}
		$('html, body').animate({scrollTop: 0}, 50)
		var dashboardCtrl = this
		dashboardCtrl.currentUser = authService.currentUser
		dashboardCtrl.isFeaturedEnabled = parseInt(GLOBALS.isFeaturedEnabled)
		dashboardCtrl.showFeaturedFS = parseInt(GLOBALS.showFeaturedFunctionality)
		dashboardCtrl.isSafeMode = dashboardCtrl.currentUser.safeMode
		dashboardCtrl.isMobile = parseInt(GLOBALS.isMobile)
		dashboardCtrl.siteShortName = GLOBALS.siteShortName
		dashboardCtrl.isMainstream = GLOBALS.isMainstreamSite
		dashboardCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
		dashboardCtrl.featureToggles = GLOBALS.featureToggles
		dashboardCtrl.monetizationOptions = GLOBALS.monetizationOptions
		dashboardCtrl.monetizationHook = monetizationHook

		PagesModel.setCurrentPage('Dashboard')
		if (+dashboardCtrl.featureToggles.getProfileList) {
			ProfilesModel.getProfilesList(1, 'near-you', 20).then(function(result) {
				dashboardCtrl.nearYouProfiles = result.profiles
			})
		}

		if (+dashboardCtrl.featureToggles.getProfileListSE) {
			if (dashboardCtrl.currentUser.membership === 'standard') {
				ProfilesModel.getProfilesList(1, 'near-you', 15).then(function(result) {
					dashboardCtrl.streamMembers = result.profiles
				})
			} else {
				ProfilesModel.getProfilesList(1, 'premium', 15).then(function(result) {
					dashboardCtrl.streamMembers = result.profiles
				})
			}
			ProfilesModel.getProfilesList(1, 'online-now', 15).then(function(result) {
				dashboardCtrl.onlineNowProfiles = result.profiles
			})
		}
		if (dashboardCtrl.isFeaturedEnabled) {
			ProfilesModel.getProfilesList(1, 'featured', 15).then(function(result) {
				dashboardCtrl.featuredMembers = result.profiles
			})
		}

		if (+dashboardCtrl.featureToggles.fetchTabs) {
			dashboardCtrl.onlineNowLoading = true
			dashboardCtrl.newMembersLoading = true
			dashboardCtrl.recommendedLoading = true
			ProfilesModel.getProfilesList(1, 'online-now', 20).then(function(result) {
				dashboardCtrl.onlineNowProfiles = result.profiles
				dashboardCtrl.onlineNowLoading = false
			})
			ProfilesModel.getProfilesList(1, 'new-members', 20).then(function(result) {
				dashboardCtrl.newMembersProfiles = result.profiles
				dashboardCtrl.newMembersLoading = false
			})
			ProfilesModel.getProfilesList(1, 'near-you', 20).then(function(result) {
				dashboardCtrl.nearYouProfiles = result.profiles
				dashboardCtrl.recommendedLoading = false
			})
			dashboardCtrl.section = 'likes-you'
			dashboardCtrl.onlineNow = true
			dashboardCtrl.newMembers = false
			dashboardCtrl.recommended = false
			dashboardCtrl.isLoading = true
			dashboardCtrl.goToPlayPage = function() {
				$state.go('dating.pages.play')
			}
			dashboardCtrl.onDashboardBottomSelectorClicked = function(selectedItem) {
				$rootScope.$broadcast('refreshBanners')
				dashboardCtrl.section = selectedItem
			}

			dashboardCtrl.onDashboardTopSelectorClicked = function(selectedItem) {
				$rootScope.$broadcast('refreshBanners')
				if (selectedItem === 'newMembers') {
					dashboardCtrl.onlineNow = false
					dashboardCtrl.newMembers = true
					dashboardCtrl.recommended = false
				}
				if (selectedItem === 'onlineNow') {
					dashboardCtrl.onlineNow = true
					dashboardCtrl.newMembers = false
					dashboardCtrl.recommended = false
				}
				if (selectedItem === 'recommended') {
					dashboardCtrl.onlineNow = false
					dashboardCtrl.newMembers = false
					dashboardCtrl.recommended = true
				}
			}
		}

		if (_.find(GLOBALS.loadOnDashboard, function(str) {
			return str === 'matches'
		})) {
			dashboardCtrl.isLoadingMatches = true
			ProfilesModel.getDashboardMatches().then(function(result) {
				dashboardCtrl.isLoadingMatches = false
				dashboardCtrl.matches = result
				if (!dashboardCtrl.matches.length) {
					dashboardCtrl.noMatchesClass = 'no-matches-' + GLOBALS.siteShortName + '-photo-' + dashboardCtrl.currentUser.gender
				}
			})
		}
		if (_.find(GLOBALS.loadOnDashboard, function(str) {
			return str === 'tickers'
		})) {
			EventsModel.getTickers().then(function(result) {
				dashboardCtrl.tickers = result.data
				if (+dashboardCtrl.featureToggles.getTickersXP) {
					if (dashboardCtrl.tickers.nViewedYou > 7 || dashboardCtrl.tickers.nYouViewed > 7) {
						angular.element('.tickerContainer').prepend($('#dashboard-views-cnt').detach())
						if (dashboardCtrl.tickers.nViewedYou > dashboardCtrl.tickers.nYouViewed) {
							dashboardCtrl.isViewActive = true
						}
					}
					if (dashboardCtrl.tickers.nLikesYou > 7 || dashboardCtrl.tickers.nYouLike > 7) {
						angular.element('.tickerContainer').prepend($('#dashboard-likes-cnt').detach())
						if (dashboardCtrl.tickers.nLikesYou > dashboardCtrl.tickers.nYouLike) {
							dashboardCtrl.isLikeActive = true
						}
					}
				}
			})
			var onMessagesSelected = function() {
				EventsModel.sendEvent('updateLastViewedMessagesTab')
				dashboardCtrl.tickers.nNewMessages = 0
			}
			var onMatchesSelected = function() {
				EventsModel.sendEvent('updateLastViewedMatchesTab')
				dashboardCtrl.tickers.nNewMatches = 0
			}
			var onViewedYouSelected = function() {
				EventsModel.sendEvent('updateViewedYouTabTime')
				dashboardCtrl.tickers.nNewViewedYou = 0
			}
			var onLikesYouSelected = function() {
				EventsModel.sendEvent('updateLastViewedRequestsTab')
				dashboardCtrl.tickers.nNewLikesYou = 0
			}
			dashboardCtrl.onMessagesSelected = onMessagesSelected
			dashboardCtrl.onMatchesSelected = onMatchesSelected
			dashboardCtrl.onViewedYouSelected = onViewedYouSelected
			dashboardCtrl.onLikesYouSelected = onLikesYouSelected
		}

		//we need to call that only once - after page will be /dashboard @see line 66
		if ($state.current.name === 'dating.pages.dashboard') {
			if (GLOBALS.user.justRegistered) {
showStep1Box()
}
			if (GLOBALS.user.showUploadPhotoDescriptionBox) {
				if (GLOBALS.user.showOneClickBox) {
					showOneClickBox()
					if(GLOBALS.cookie1ClickActionsSooner){
						var sent = false
						$(window).on('focus mousemove touchmove', function(event) {
							if (sent) {
								return
							}
							EventsModel.updateFocus()
							sent = true
						})
					}
				} else {
					showStep2Box()
				}
			}
			if (GLOBALS.user.bResetPassword) {
				showUpdatePasswordBox()
			}
			if (GLOBALS.user.bAffiliateOneClickBox) {
				showAffiliateOneClickStep1Box()
				if(GLOBALS.cookie1ClickActionsSooner){
					var sent = false
					$(window).on('focus mousemove touchmove', function(event) {
						if (sent) {
							return
						}
						EventsModel.updateFocus()
						sent = true
					})
				}
			}
			if (GLOBALS.user.bAffiliateOneClickBoxStep2) {
				showAffiliateOneClickStep2Box()
				if(GLOBALS.cookie1ClickActionsSooner){
					var sent = false
					$(window).on('focus mousemove touchmove', function(event) {
						if (sent) {
							return
						}
						EventsModel.updateFocus()
						sent = true
					})
				}
			}
			if (GLOBALS.user.bAffiliateOneClickBoxStep3) {
				showAffiliateOneClickStep3Box()
				if(GLOBALS.cookie1ClickActionsSooner){
					var sent = false
					$(window).on('focus mousemove touchmove', function(event) {
						if (sent) {
							return
						}
						EventsModel.updateFocus()
						sent = true
					})
				}
			}
		}
		dashboardCtrl.showExoclickAds = dashboardCtrl.currentUser.showExoclickAds ? true : false
		dashboardCtrl.showExoMobileHeader = dashboardCtrl.currentUser.showExoMobileHeader ? true : false
	})
