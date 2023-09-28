angular.module('dating.directives.profilesList', [
		'dating.models.profiles',
	])
	.controller('ProfilesListCtrl', function(ProfilesModel, GLOBALS, ProfilePreviewDialog, authService, $scope, $state, $rootScope, monetizationHook) {
		var profilesListCtrl = this,
			currentPage = profilesListCtrl.currentPage || 1,
			profilesPerPage = profilesListCtrl.count || 8

		profilesListCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		profilesListCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile
		profilesListCtrl.isLoggedIn = authService.isAuthenticated
		var externalUpgradeUrl = profilesListCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		profilesListCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? externalUpgradeUrl : '/billing/upgrade'
		profilesListCtrl.themePath = GLOBALS.baseUrl
		profilesListCtrl.featureToggles = GLOBALS.featureToggles
		profilesListCtrl.monetizationOptions = GLOBALS.monetizationOptions
		profilesListCtrl.monetizationHook = monetizationHook
		profilesListCtrl.pageChanged = function() {
			if (profilesListCtrl.plist != undefined) {
				$state.go('dating.pages.plist', {section: profilesListCtrl.plist, page: profilesListCtrl.currentPage})
			} else {
				loadProfiles()
			}
		}

		var loadProfiles = function() {
			profilesListCtrl.isLoading = true
			ProfilesModel.getProfilesList(profilesListCtrl.currentPage, profilesListCtrl.type, profilesListCtrl.profilesPerPage).then(function(result) {
				profilesListCtrl.profiles = result.profiles
				profilesListCtrl.totalProfiles = result.total_profiles
				profilesListCtrl.currentPage = result.current_page
				profilesListCtrl.isLoading = false
				if (parseInt(profilesListCtrl.totalProfiles) <= parseInt(profilesListCtrl.profilesPerPage)) {
					profilesListCtrl.hidePagination = true
				}
			})
		}
		profilesListCtrl.profilesPerPage = profilesPerPage
		profilesListCtrl.currentPage = currentPage
		profilesListCtrl.isLoading = true
		profilesListCtrl.currentUser = authService.currentUser
		profilesListCtrl.sendingMatch = []
		profilesListCtrl.showMatchStamp = []
		if (profilesListCtrl.currentUser) {
			loadProfiles()
		}
		profilesListCtrl.getRange = function(n) {
			if (n < 0) {
				n = 0
			}
			return new Array(n)
		}

		profilesListCtrl.showIndicator = true
		$scope.$on('hideIndicator', function() {
			profilesListCtrl.showIndicator = false
		})

		if (+profilesListCtrl.featureToggles.loadProfilesOnSuccess) {
			$scope.$on('play-vote:success', function() {
				loadProfiles()
			})
		}

		profilesListCtrl.sendMatch = function(profileId, status, showMatchStamp) {
			showMatchStamp = typeof showMatchStamp == 'undefined' ? false : showMatchStamp
			if (status==='redirect') {
				$state.go('dating.pages.viewProfile', {id: profileId})
				return
			}
			if (showMatchStamp) {
				profilesListCtrl.showMatchStamp[profileId] = true
			}
			_.each(profilesListCtrl.profiles, function(value) {
				if (value.id == profileId) {
					value.matchStatus = status == 'accept' ? 'match' : 'youLiked'
				}
			})
			ProfilesModel.sendMatch(profileId, status).then(function() {
				profilesListCtrl.showMatchStamp[profileId] = false
				$state.go('dating.pages.viewProfile', {id: profileId})
			})
		}
		profilesListCtrl.previewProfile = function(profileId) {
			ProfilePreviewDialog.open(profileId).then(function() {
				$state.go('dating.pages.dashboard')
			})
		}
		if (GLOBALS.parentSite == 'discreetcrush') {
			profilesListCtrl.onClickRefreshExoFooterAds = function() {
				$rootScope.$broadcast('refreshBanners')
			}
		}
		$scope.$on('sign-out:success', function() {
			profilesListCtrl.currentUser = null
		})
	})
	.directive('profileslist', function() {
		var mobileSlug = (globalParams.isMobileScreen ? '-mobile' : '')
		return {
			restrict: 'E',
			controller: 'ProfilesListCtrl',
			controllerAs: 'profilesListCtrl',
			bindToController: true,
			scope: {
				type: '@type',
				count: '@count',
				hidePagination: '@hidePagination',
				plist: '@plist',
				hideTotalPhotos: '@hideTotalPhotos',
				hideLocation: '@hideLocation',
				hideGender: '@hideGender',
				owlc: '@owlc',
				currentPage: '@currentPage',
				section: '@section',
			},
			templateUrl: globalParams.templateUrls.directives['profiles_list' + mobileSlug],
			link: function(scope, element, attr, profilesListCtrl) {
			},
		}
	})
	.service('ProfilePreviewDialog', function($q, $modal) {
		var ProfilePreviewDialog = this
		var modalInstance

		ProfilePreviewDialog.open = function(profileId) {
			var deferred = $q.defer()

			modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.helpers.profile_preview,
				controller: 'ProfilePreviewDialogCtrl as profilePreviewDialogCtrl',
				size: 'profilePreview',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					profileId: function() {
						return profileId
					},

					deferred: function() {
						return deferred
					},
				},
			})

			return deferred.promise.finally(function() {
				modalInstance.close()
			})
		}


		return ProfilePreviewDialog
	})
	.controller('ProfilePreviewDialogCtrl', function($state, $modalInstance, ProfileData, ProfilesModel, profileId, deferred) {
		var profilePreviewDialogCtrl = this
		ProfilesModel.getProfile(profileId).then(function(result) {
			profilePreviewDialogCtrl.profile = new ProfileData(result)
		})
		profilePreviewDialogCtrl.sendMatch = function(status) {
			if (status == 'like') {
				profilePreviewDialogCtrl.profile.set('matchStatus', 'youLiked')
			} else if (status == 'accept') {
				profilePreviewDialogCtrl.profile.set('matchStatus', 'match')
			}
			ProfilesModel.sendMatch(profileId, status).then(function(result) {
				ProfilesModel.getProfile(profileId).then(function() {
					profilePreviewDialogCtrl.profile = new ProfileData(result)
				})
			})
		}

		profilePreviewDialogCtrl.close = function() {
			deferred.reject()
		}
	})

