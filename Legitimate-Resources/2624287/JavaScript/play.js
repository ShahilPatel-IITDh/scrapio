angular.module('pages.play', [
	'dating.models.pages',
	'dating.models.profiles',
	'dating.models.messages',
	'dating.directives.ratingstars',
	'angucomplete-alt',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.play', {
				url: 'play',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'PlayCtrl as playCtrl',
						templateUrl: globalParams.templateUrls.pages.play,
					},
				},
			})

	})
	.controller('PlayCtrl', function($sce, $scope, PagesModel, ProfilesModel, ProfileData, MessagesModel, GLOBALS, authService, $modal, $rootScope, monetizationHook) {
		$('html, body').animate({scrollTop: 0}, 50)
		var playCtrl = this, defaultFilter
		playCtrl.isLoggedIn = authService.isAuthenticated
		playCtrl.currentUser = authService.currentUser

		var externalUpgradeUrl = playCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		playCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		playCtrl.upgradeUrl = playCtrl.isExternalUpgradeSite ? externalUpgradeUrl : '/billing/upgrade'
		playCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile
		playCtrl.monetizationOptions = GLOBALS.monetizationOptions
		playCtrl.monetizationHook = monetizationHook

		if (playCtrl.isPlayPage !== 'false') {
			PagesModel.setCurrentPage('Play')
		}

		var loadProfiles = function(profileId) {
			playCtrl.isLoading = true
			playCtrl.previousProfile = null
			playCtrl.nextProfile = null
			playCtrl.currentProfile = null
			playCtrl.previousScore = null
			playCtrl.isPendingVote = false
			ProfilesModel.getPlayProfiles(profileId)
			.then(function(result) {
				playCtrl.isLoading = false
				if (result.data.previous) {
					playCtrl.previousProfile = new ProfileData(result.data.previous)
					playCtrl.previousScore = playCtrl.previousProfile.get('score')
				}
				if (result.data.current) {
					playCtrl.currentProfile = new ProfileData(result.data.current)
					playCtrl.currentProfileId = playCtrl.currentProfile.get('id')
				}
				if (result.data.next) {
					playCtrl.nextProfile = new ProfileData(result.data.next)
				}
				playCtrl.sendMessageFeedback = ''
			})
		}

		var sendMessage = function() {
			if (playCtrl.currentUser.membership == 'premium') {
				playCtrl.newMessage.receiverId = playCtrl.currentProfile.get('id')
				playCtrl.sendingMessage = true
				MessagesModel.sendMessage(playCtrl.newMessage)
				.then(function(result) {
					playCtrl.sendingMessage = false
					playCtrl.newMessage.content = ''
					playCtrl.sendMessageFeedback = $sce.trustAsHtml('Message sent. View conversation history <a href=\''+ '/profile/view/id/' + playCtrl.newMessage.receiverId + '\'>here</a>')
				})
			} else {
				MessagesModel.logMessageAttempt(playCtrl.currentProfile.get('id'))
				window.location.href = playCtrl.upgradeUrl
			}
		}

		var filterProfiles = function() {
			playCtrl.isLoading = true
			ProfilesModel.setPlayFilter(playCtrl.profilesFilter)
			.then(function() {
				loadProfiles()
			})
		}

		playCtrl.reportProfile = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.pages.view_profile.report_abuse_box,
				controller: 'ReportAbuseBoxCtrl as reportAbuseBoxCtrl',
				size: 'reportPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					profile: function() {
						return playCtrl.currentProfile
					},
				},
			})
		}

		playCtrl.showUpgradePopup = function () {
			if (playCtrl.nProfileInsteadOfLprofile && (!playCtrl.isLoggedIn || playCtrl.currentUser.membership !== 'premium')) {
				$modal.open({
					templateUrl: globalParams.templateUrls.pages.upgrade_popup,
					controller: 'UpgradeBoxCtrl as upgradeBoxCtrl',
					size: 'upgradePopup'
				})
			}
		}

		$scope.$on('play-vote:pending', function() {
			playCtrl.isPendingVote = true
		})

		$scope.$on('play-vote:success', function() {
			playCtrl.isPendingVote = false
			loadProfiles()
		})

		$scope.$on('play-vote:next', function() {
			playCtrl.isPendingVote = false
			playCtrl.goToNext()
		})

		$scope.$on('sign-out:success', function() {
			playCtrl.isLoggedIn = false
			playCtrl.currentUser = null
		})

		playCtrl.goToNext = function() {
			loadProfiles(playCtrl.nextProfile.get('id'))
			$rootScope.$broadcast('refreshBanners')
		}

		playCtrl.goToPrevious = function() {
			loadProfiles(playCtrl.previousProfile.get('id'))
			$rootScope.$broadcast('refreshBanners')
		}

		playCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		playCtrl.cityChange = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			playCtrl.profilesFilter.whereCity = selectedCity.originalObject.region
			playCtrl.profilesFilter.whereExactLocation = selectedCity.originalObject.textKey
		}

		playCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: playCtrl.profilesFilter.whereCountry}
		}

		playCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			playCtrl.profilesFilter.whereCity = selectedCity.originalObject.region
			playCtrl.profilesFilter.whereExactLocation = selectedCity.originalObject.textKey
		}

		playCtrl.submitOnChangeCity = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			playCtrl.profilesFilter.whereCity = selectedCity.originalObject.region
			playCtrl.profilesFilter.whereExactLocation = selectedCity.originalObject.textKey
			if (playCtrl.profilesFilter.whereCity) {
				filterProfiles()
			}
		}

		playCtrl.countries = ProfilesModel.getSearchCountries()
		playCtrl.minAges = ProfilesModel.getMinAges()
		playCtrl.maxAges = ProfilesModel.getMaxAges()
		playCtrl.sendMessage = sendMessage
		playCtrl.filterProfiles = filterProfiles
		playCtrl.currentProfileId = undefined

		defaultFilter = {
			lowAge: playCtrl.minAges[0],
			highAge: playCtrl.minAges[playCtrl.minAges.length - 1],
			whereCountry: GLOBALS.userInfo.location,
			whereCity: GLOBALS.userInfo.city,
		}
		playCtrl.profilesFilter = defaultFilter
		filterProfiles()
	})
	.directive('play', function() {
		return {
			restrict: 'E',
			controller: 'PlayCtrl',
			controllerAs: 'playCtrl',
			bindToController: true,
			scope: {
				isPlayPage: '@isPlayPage',
			},
			templateUrl: globalParams.templateUrls.directives.play,
			link: function(scope, element, attr, PlayCtrl) {
			},
		}
	})
	.controller('ReportAbuseBoxCtrl', function($modalInstance, ProfilesModel, profile) {
		var reportAbuseBoxCtrl = this,
			profileId = profile.get('id')
		reportAbuseBoxCtrl.newReport = {abuserId: profileId}
		reportAbuseBoxCtrl.sendReport = function() {
			ProfilesModel.report(reportAbuseBoxCtrl.newReport)
			.error(function(result) {
				reportAbuseBoxCtrl.errors = result
			})
			.then(function(result) {
				reportAbuseBoxCtrl.reportSubmitted = true
			})
		}

		reportAbuseBoxCtrl.profile = profile
	})

