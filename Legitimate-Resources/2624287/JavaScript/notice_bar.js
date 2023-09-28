angular.module('noticeBar', [
	'dating.models.profiles',
	'ui.bootstrap',
	'ngFileUpload',
	'Dating',
])
	.factory('sharedService', function($rootScope) {
		var appService = {}
		appService.completedInfo = {}

		appService.completedInfoChanged = function(items) {
			this.completedInfo = items
			this.broadcastCompletedInfoChanged()
		}

		appService.broadcastCompletedInfoChanged = function() {
			$rootScope.$broadcast('completedInfoChanged')
		}
		return appService
	})
	.controller('CompletePopupCtrl', function($scope, $location, $window, $modalStack, UsersModel, ProfilesModel, EventsModel, ProfileData, PROFILE_SETTINGS, GLOBALS, completedInfo, authService, Upload, sharedService) {
		var completePopupCtrl = this
		completePopupCtrl.currentUser = authService.currentUser
		var profileId = completePopupCtrl.currentUser.id
		completePopupCtrl.completedInfo = completedInfo
		completePopupCtrl.isLoading = true
		completePopupCtrl.buttonDisabled = true
		completePopupCtrl.addedPhoto = false

		var upload = function(profilePhotos) {
			completePopupCtrl.uploadProgress = -2
			if (profilePhotos && profilePhotos.length) {
				var file = profilePhotos[0]
				Upload.upload({
					url: 'image/upload',
					file: file,
					data: {isPrivate: 0},
					fileFormDataName: 'UserImageUploaded[file][file]',
				}).progress(function(evt) {
					completePopupCtrl.uploadProgress = parseInt(100.0 * evt.loaded / evt.total)
				}).success(function(data, status, headers, config) {
					completePopupCtrl.uploadProgress = -3
					completePopupCtrl.buttonDisabled = false
					reloadProfile()
				}).error(function(data, status, headers, config) {
					completePopupCtrl.errors = data
					completePopupCtrl.uploadProgress = -1
				})
			}
		}

		var showNextStep = function() {
			if (completePopupCtrl.completedInfo.noPhoto) {
				completePopupCtrl.whatToShow = 'photo'
			} else if (completePopupCtrl.completedInfo.noDescription || completePopupCtrl.completedInfo.noLookingFor) {
				completePopupCtrl.whatToShow = 'description'
				completePopupCtrl.formStatus = 'editing'
			} else if (completePopupCtrl.completedInfo.noClassifiers) {
				completePopupCtrl.whatToShow = 'classifiers'
				completePopupCtrl.formStatus = 'editing'
				$('.modal-completePopup').addClass('withClassifiers')
			} else {
				completePopupCtrl.closeAndCheck()
			}
		}

		var reloadProfile = function() {
			completePopupCtrl.isLoading = true
			ProfilesModel.getProfile(profileId).then(function(result) {
				completePopupCtrl.isLoading = false
				completePopupCtrl.profile = new ProfileData(result)
				completePopupCtrl.profileSettings = completePopupCtrl.profile.getProfileSettings()
				completePopupCtrl.profileSettingsOptions = PROFILE_SETTINGS[completePopupCtrl.currentUser.gender]

				completePopupCtrl.isSugarDaddy = function() {
					return completePopupCtrl.profileSettings.arrangementType == GLOBALS.arrangementType.give
				}

				if (completePopupCtrl.profile.hasPhotos()) {
					var avatarSrc = completePopupCtrl.profile.getAvatar()
					$('#current-user-avatar-img').attr('src', avatarSrc).removeClass('ng-hide')
					completePopupCtrl.srcImage = completePopupCtrl.profile.getMediumPhoto(0)
				}
				showNextStep()
			})
		}

		reloadProfile()

		completePopupCtrl.savePhoto = function() {
			completePopupCtrl.completedInfo.noPhoto = false
			completePopupCtrl.completedInfo.percent += 30
			completePopupCtrl.addedPhoto = true
			showNextStep()
		}

		completePopupCtrl.closeAndCheck = function() {
			sharedService.completedInfoChanged(completePopupCtrl.completedInfo)
			$modalStack.dismissAll()
			if ($location.path() == '/editProfile/profile') {
				$window.location.reload()
			}
			if ($location.path() == '/editProfile/managePhotos' && completePopupCtrl.addedPhoto) {
				$window.location.reload()
			}
		}

		completePopupCtrl.saveSettings = function(profileSettings, what) {
			completePopupCtrl.formStatus = 'saving'
			UsersModel.saveProfileSettings(profileSettings).error(function(result) {
				completePopupCtrl.errors = result
				completePopupCtrl.formStatus = 'editing'
			})
				.then(function() {
					//description or classifiers saved
					completePopupCtrl.errors = null
					completePopupCtrl.formStatus = 'saved'
					if (what == 'description') {
						if (completePopupCtrl.completedInfo.noDescription) {
							completePopupCtrl.completedInfo.percent += 25
							completePopupCtrl.completedInfo.noDescription = false
						}
						if (completePopupCtrl.completedInfo.noLookingFor) {
							completePopupCtrl.completedInfo.percent += 15
							completePopupCtrl.completedInfo.noLookingFor = false
						}
						if (completePopupCtrl.completedInfo.noClassifiers) {
							completePopupCtrl.whatToShow = 'classifiers'
							completePopupCtrl.formStatus = 'editing'
							$('.modal-completePopup').addClass('withClassifiers')
						} else {
							completePopupCtrl.closeAndCheck()
						}
					} else {
						//classifiers saved
						EventsModel.getCompletedInfo().then(function(result) {
							completePopupCtrl.completedInfo.noClassifiers = result.data.noClassifiers
							completePopupCtrl.completedInfo.percent = result.data.percent
							completePopupCtrl.closeAndCheck()
						})
					}
				})
		}

		completePopupCtrl.uploadProgress = -2
		$scope.$watch('profilePhotos', function() {
			upload($scope.profilePhotos)
		})

		$scope.$on('sign-out:success', function() {
			completePopupCtrl.isLoggedIn = false
			completePopupCtrl.currentUser = null
		})
	})

	.controller('NoticeBarCtrl', function($location, $scope, $rootScope, ProfilesModel, EventsModel, PagesModel, GLOBALS, authService, $modal, sharedService, $cookies) {
		var noticeBarCtrl = this
		noticeBarCtrl.currentUser = authService.currentUser
		noticeBarCtrl.isLoggedIn = authService.isAuthenticated
		noticeBarCtrl.showUploadNotice = noticeBarCtrl.currentUser.avatar.indexOf('no_photo_') > -1
		noticeBarCtrl.showSafeModeNotice = GLOBALS.showSafeModeNotice
		noticeBarCtrl.showNotice = noticeBarCtrl.showUploadNotice || noticeBarCtrl.showSafeModeNotice
		noticeBarCtrl.sBilledAs = GLOBALS.user.sBilledAs
		noticeBarCtrl.showUpgradeNotice = noticeBarCtrl.currentUser.membership === 'standard'
		noticeBarCtrl.showRebillNotice = noticeBarCtrl.currentUser.showReBillBar
		noticeBarCtrl.rebillButtonDisabled = false
		noticeBarCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		noticeBarCtrl.isBillingPartnerCmp = GLOBALS.userInfo.billingPartner && parseInt(GLOBALS.userInfo.billingPartner) === 7
		noticeBarCtrl.externalUpgradeUrl = noticeBarCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		noticeBarCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? noticeBarCtrl.externalUpgradeUrl : '/billing/upgrade'
		noticeBarCtrl.featureToggles = GLOBALS.featureToggles

		$scope.$on('no_photo:true', function() {
			noticeBarCtrl.showUploadNotice = true
		})
		$scope.$on('no_photo:false', function() {
			noticeBarCtrl.showUploadNotice = false
		})
		$scope.$on('sign-out:success', function() {
			noticeBarCtrl.showNotice = false
			noticeBarCtrl.isLoggedIn = false
			noticeBarCtrl.currentUser = null
		})
		if ($location.path() === '/regOfferOne' || $location.path() === '/regOfferTwo') {
			noticeBarCtrl.showUploadNotice = false
		}
		if (noticeBarCtrl.isLoggedIn) {
			if ((+noticeBarCtrl.featureToggles.disableShowNoticeStandard) && noticeBarCtrl.currentUser.membership == 'standard') {
				noticeBarCtrl.showNotice = false
			}
		}

		$scope.$watch(function() {
			return $location.path()
		}, function() {
			noticeBarCtrl.showNudityNotice = PagesModel.getCurrentPage() === 'Profiles' && noticeBarCtrl.showSafeModeNotice && !GLOBALS.isMainstreamSite && noticeBarCtrl.currentUser.safeMode
		})

		noticeBarCtrl.closeNotice = function() {
			$('#notify-notice').slideUp(500, function() {
				noticeBarCtrl.showNotice = false
			})
		}

		noticeBarCtrl.removeUploadNotice = function() {
			EventsModel.sendEvent('removeRegistrationUploadNotice')
		}

		noticeBarCtrl.setSafeMode = function() {
			ProfilesModel.setSafeMode().then(function() {
				window.location.reload()
			})
		}

		noticeBarCtrl.showCompletePopup = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.notice_bar.complete_profile,
				controller: 'CompletePopupCtrl as completePopupCtrl',
				size: 'completePopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					completedInfo: function() {
						return noticeBarCtrl.completedInfo
					},
				},
			})
		}

		noticeBarCtrl.turnOnRebill = function() {
			noticeBarCtrl.rebillButtonDisabled = true
			EventsModel.addRebillNotification(1, 1)
				.then(function() {
					noticeBarCtrl.rebillButtonDisabled = false
					noticeBarCtrl.showRebillNotice = false
					$modal.open({
						templateUrl: globalParams.templateUrls.notice_bar.featured_popup,
						controller: 'NoticeBarCtrl as noticeBarCtrl',
						size: 'rebillPopup',
					})
				})
		}

		noticeBarCtrl.reloadPage = function() {
			window.location.reload()
		}

		noticeBarCtrl.removeRebillNotice = function() {
			$('.rebill-bar').slideUp(500, function() {
				noticeBarCtrl.showRebillNotice = false
			})
			var expireDate = new Date()
			expireDate.setMinutes(expireDate.getMinutes() + 72 * 60)
			$cookies.put('data-reBillBar' + GLOBALS.userInfo.subid, 'hidden', {expires: expireDate})
		}

		$scope.$on('completedInfoChanged', function() {
			noticeBarCtrl.completedInfo = sharedService.completedInfo
			if (noticeBarCtrl.isLoggedIn) {
				noticeBarCtrl.showNotice = (noticeBarCtrl.completedInfo.percent < 100)
			}
		})
	})
