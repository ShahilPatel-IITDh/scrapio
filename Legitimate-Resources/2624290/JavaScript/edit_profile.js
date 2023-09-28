angular.module('pages.editProfile', [
		'dating.models.pages',
		'dating.models.users',
		'dating.models.profiles',
		'ui.bootstrap',
		'angucomplete-alt',
		'ngFileUpload',
	])
	.service('showRebillPopup', function($modal, $modalStack) {
		var showRebillPopup = function(popupData) {
			$modal.open({
				templateUrl: globalParams.templateUrls.pages.rebill_popups,
				controller: 'EditProfileCtrl as editProfileCtrl',
				size: 'rebillPopup',
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
		return showRebillPopup
	})
	.service('showCustomRebillPopup', function($modal, $modalStack) {
		var showCustomRebillPopup = function(popupData) {
			$modal.open({
				templateUrl: globalParams.templateUrls.pages.rebill_custom_popups,
				controller: 'EditProfileCtrl as editProfileCtrl',
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
		return showCustomRebillPopup
	})
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.editProfile', {
				url: 'profile/edit/:page',
				views: {
					'sections@': {
						controller: 'EditProfileCtrl as editProfileCtrl',
						templateUrl: globalParams.templateUrls.pages.edit_profile,
					},
				},
			})
			.state('dating.pages.editProfileNoParams', {
				url: 'profile/edit',
				deepStateRedirect: {default: {state: 'dating.pages.editProfile'}},
			})

	})
	.controller('EditProfileCtrl', function($sce, $filter, $modal, $state, $stateParams, $rootScope, $scope, PagesModel, UsersModel, ProfilesModel, EventsModel, ProfileData, PROFILE_SETTINGS, GLOBALS, authService, Upload, sharedService, $window, showRebillPopup, showCustomRebillPopup) {
		$('html, body').animate({scrollTop: 0}, 50)
		var editProfileCtrl = this
		editProfileCtrl.isLoggedIn = authService.isAuthenticated

		if (!editProfileCtrl.isLoggedIn) {
			$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
			return
		}

		if (GLOBALS.isMobileScreen) {
			$state.go('dating.pages.editProfileMobile')
		}

		editProfileCtrl.currentUser = authService.currentUser
		editProfileCtrl.profileId = editProfileCtrl.currentUser.id
		var sError = ('Please fill out required fields'),
			sOk = ('Changes saved')
		PagesModel.setCurrentPage('EditProfile')
		editProfileCtrl.themePath = GLOBALS.baseUrl + '/images/'
		editProfileCtrl.imagesUrl = GLOBALS.baseUrl + '/styles/images/'
		editProfileCtrl.featureToggles = GLOBALS.featureToggles
		if (+editProfileCtrl.featureToggles.deletePhotoFromEditProfile) {
			$.fancybox.defaults.caption = function(instance, item) {
				var caption = '<button data-fancybox-delete class=\'btn\'>Delete photo</button>'
				return caption
			}
			$('body').on('click', '[data-fancybox-delete]', function() {
				var photoID = $.fancybox.getInstance().current.index
				editProfileCtrl.deleteImage(editProfileCtrl.profile.getPhotoID(photoID))
			})
		}

		editProfileCtrl.page = $stateParams.page || null
		editProfileCtrl.gender = editProfileCtrl.currentUser.genderText
		editProfileCtrl.safeMode = !!editProfileCtrl.currentUser.safeMode
		editProfileCtrl.sexyMode = !editProfileCtrl.currentUser.safeMode
		editProfileCtrl.isPremium = editProfileCtrl.currentUser.membership === 'premium'
		editProfileCtrl.openAdvancedSettings = false
		editProfileCtrl.descriptionFocus = false
		editProfileCtrl.siteShortName = GLOBALS.siteShortName
		editProfileCtrl.isMainstream = GLOBALS.isMainstreamSite
		editProfileCtrl.isMobile = parseInt(GLOBALS.isMobile)
		editProfileCtrl.separateUnsubscribe3rdPartyMails = editProfileCtrl.currentUser.separateUnsubscribe3rdPartyMails
		editProfileCtrl.showRebillPopup = showRebillPopup
		editProfileCtrl.rebillPopupsEnabled = GLOBALS.rebillBarPopups && editProfileCtrl.currentUser.recurringMembership
		editProfileCtrl.showCustomRebillPopup = showCustomRebillPopup
		editProfileCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		editProfileCtrl.showBirthdayFieldsInUsFormat = GLOBALS.showBirthdayFieldsInUsFormat
		editProfileCtrl.filter = $filter
		editProfileCtrl.showVirtualHottieOption = GLOBALS.canSeeVirtualHottie
		editProfileCtrl.virtualHottieName = GLOBALS.virtualHottieName + ' Profiles'
		editProfileCtrl.showBbrPhoneNumberPopup = GLOBALS.showBbrPoneNumber
		editProfileCtrl.getFeaturedButtonDisabled = false
		editProfileCtrl.userMembership = GLOBALS.membership;
		editProfileCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile

		editProfileCtrl.scrollToCreditsBlock = function(){
			var creditsBlock = document.getElementById('credits-info')
			if(creditsBlock){
				creditsBlock.scrollIntoView(true)
				clearTimeout(editProfileCtrl.scrollToCreditsBlock)
			}
		}

		if(window.location.href.split('#')[1] === 'credits'){
			setTimeout(editProfileCtrl.scrollToCreditsBlock, 500);
		}

		//Check for credit sites
		if( GLOBALS.creditsInfo && GLOBALS.creditsInfo.currentCredits && GLOBALS.creditsInfo.expiryDate) {
			editProfileCtrl.creditCount = GLOBALS.creditsInfo.currentCredits;
			editProfileCtrl.creditsExpiryDate = GLOBALS.creditsInfo.expiryDate.date;
			editProfileCtrl.creditsExpiryDateStamp = editProfileCtrl.creditsExpiryDate.split(" ")[0];
			editProfileCtrl.creditsExpiryTimeStamp = editProfileCtrl.creditsExpiryDate.split(" ")[1];
			editProfileCtrl.creditsExpiryTimeZone = GLOBALS.creditsInfo.expiryDate.timezone;

			editProfileCtrl.creditsDifferenceInDate = function() {
				if( editProfileCtrl.creditsExpiryDate && editProfileCtrl.creditsExpiryTimeZone) {
					var currentDate = new Date();
					var parsedExpiryDate = Date.parse(new Date(editProfileCtrl.creditsExpiryDateStamp + 'T' + editProfileCtrl.creditsExpiryTimeStamp));
					return parsedExpiryDate - currentDate;
				}
			}

			editProfileCtrl.creditsDifferenceInDays = function() {
				if( editProfileCtrl.creditsExpiryDate && editProfileCtrl.creditsExpiryTimeZone) {
					return Math.floor(( editProfileCtrl.creditsDifferenceInDate() ) / (1000 * 60 * 60 * 24));
				}
				return 0;
			}
			editProfileCtrl.creditsDifferenceInHours = function() {
				if( editProfileCtrl.creditsExpiryDate && editProfileCtrl.creditsExpiryTimeZone) {
					return Math.floor(((editProfileCtrl.creditsDifferenceInDate()) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				}
				return 0;
			}
			editProfileCtrl.creditsDifferenceInMinutes = function() {
				if( editProfileCtrl.creditsExpiryDate && editProfileCtrl.creditsExpiryTimeZone) {
					return Math.floor(((editProfileCtrl.creditsDifferenceInDate()) % (1000 * 60 * 60)) / (1000 * 60));
				}
				return 0;
			}
			editProfileCtrl.creditsDifferenceInSeconds = function() {
				if( editProfileCtrl.creditsExpiryDate && editProfileCtrl.creditsExpiryTimeZone) {
					return Math.floor(((editProfileCtrl.creditsDifferenceInDate()) % (1000 * 60)) / (1000));
				}
				return 0;
			}

			// Set initial values of the countdown timer
			$scope.creditsDay = editProfileCtrl.creditsDifferenceInDays();
			$scope.creditsHour = editProfileCtrl.creditsDifferenceInHours() < 10 ? `0${editProfileCtrl.creditsDifferenceInHours()}` : editProfileCtrl.creditsDifferenceInHours();
			$scope.creditsMinute = editProfileCtrl.creditsDifferenceInMinutes() < 10 ? `0${editProfileCtrl.creditsDifferenceInMinutes()}` : editProfileCtrl.creditsDifferenceInMinutes();
			$scope.creditsSeconds = editProfileCtrl.creditsDifferenceInSeconds() < 10 ? `0${editProfileCtrl.creditsDifferenceInSeconds()}` : editProfileCtrl.creditsDifferenceInSeconds();

			// Sets interval so the timer updates every second
			editProfileCtrl.creditsCountdownTimer = setInterval(function() {
				$scope.creditsDay = editProfileCtrl.creditsDifferenceInDays();
				$scope.creditsHour = editProfileCtrl.creditsDifferenceInHours() < 10 ? `0${editProfileCtrl.creditsDifferenceInHours()}` : editProfileCtrl.creditsDifferenceInHours();
				$scope.creditsMinute = editProfileCtrl.creditsDifferenceInMinutes() < 10 ? `0${editProfileCtrl.creditsDifferenceInMinutes()}` : editProfileCtrl.creditsDifferenceInMinutes();
				$scope.creditsSeconds = editProfileCtrl.creditsDifferenceInSeconds() < 10 ? `0${editProfileCtrl.creditsDifferenceInSeconds()}` : editProfileCtrl.creditsDifferenceInSeconds();
				$scope.$apply();
			}, 1000);

			// Clears the countdown interval when user is no longer on the profile details page
			$scope.$on("$destroy", function() {
				clearInterval(editProfileCtrl.creditsCountdownTimer)
			});

		}

		if (editProfileCtrl.showBbrPhoneNumberPopup) {
			if (['xmeeting'].indexOf(GLOBALS.parentSite) !== -1) {
				var userPhone = editProfileCtrl.currentUser.phone
				//slicing the phone 10 numbers from behind to extract the country code; should be changed when BE stores a separate field for the country code
				var phoneCountryCode = userPhone.slice(0, -10)
				editProfileCtrl.phoneNumber = userPhone
				editProfileCtrl.phoneCountryCode = phoneCountryCode
				setTimeout(function() {
					var input = document.querySelector('#EditSettingsForm_phone')
					var iti   = window.intlTelInput(input, {
						formatOnDisplay: false,
						initialCountry: 'auto',
						separateDialCode: 'true',
						autoPlaceholder: 'off',
						utilsScript: '/themes/js/intelPhoneNumber/utils.js',
						geoIpLookup: function(callback) {
							var countryCode = editProfileCtrl.currentUser.countryCode
							callback(countryCode)
						},
					})
				}, 300)
			}
		}

		editProfileCtrl.rebillPopupsStep2 = function() {
			$('.rebillPopup1').hide()
			var isFeatured = editProfileCtrl.currentUser.isFeatured
			var isFreeFeatured = editProfileCtrl.currentUser.isFreeFeatured

			if (isFreeFeatured) {
				editProfileCtrl.freeFeaturedDate = isFreeFeatured
				$('.rebillPopupFeatured2').show()
			} else if (isFeatured) {
				editProfileCtrl.rebillPopupsStep3()
			} else {
				$('.rebillPopupFeatured1').show()
			}
		}

		editProfileCtrl.rebillPopupsStep3 = function() {
			$('.rebillPopup2').hide()
			$('.rebillPopup3').show()
		}

		editProfileCtrl.rebillPopupsFeaturedEnabled = function() {
			editProfileCtrl.getFeaturedButtonDisabled = true
			EventsModel.addRebillNotification(1, 1)
				.then(function() {
					$('.rebillPopupFeatured1').hide()
					editProfileCtrl.getFeaturedButtonDisabled = false
					$('.rebillPopupFeaturedEnabled').show()
				})
		}

		editProfileCtrl.reloadPage = function() {
			window.location.reload()
		}

		editProfileCtrl.customRebillPopupsStep2 = function() {
			$('.rebillCustomPopup2').show()
			$('.rebillCustomPopup1').hide()
		}

		editProfileCtrl.customRebillPopupsStep3 = function() {
			ProfilesModel.changeRebill(0)
			$('.rebillCustomPopup3').show()
			$('.rebillCustomPopup2').hide()
		}

		editProfileCtrl.customRebillPopupsStep4 = function() {
			$('.rebillCustomPopup3').hide()
			ProfilesModel.changeRebill(1).then(function() {
				editProfileCtrl.paymentProcessCustom = true
			})
		}

		editProfileCtrl.setSexyMode = function() {
			ProfilesModel.setSafeMode()
			editProfileCtrl.sexyMode = !editProfileCtrl.sexyMode
			editProfileCtrl.currentUser.safeMode = !editProfileCtrl.currentUser.safeMode
		}

		editProfileCtrl.setSafeModeToValue = function(safeMode) {
			if (safeMode != editProfileCtrl.currentUser.safeMode) {
				ProfilesModel.setSafeMode().then(function() {
					editProfileCtrl.currentUser.safeMode = safeMode
					window.location.reload()
				})
			}
		}

		editProfileCtrl.tabs = {}
		editProfileCtrl.tabs[editProfileCtrl.page] = true

		editProfileCtrl.go = function(page) {
			$state.go('dating.pages.editProfile', {page: page})
		}

		if (['profile', 'settings', 'managePhotos'].indexOf($stateParams.page) == -1) {
			editProfileCtrl.go('profile')
		}

		editProfileCtrl.isSugarDaddy = function() {
			return editProfileCtrl.currentUser.arrangementType == GLOBALS.arrangementType.give
		}

		editProfileCtrl.restoreModelFromAttributes = function() {
			editProfileCtrl.profileSettings = editProfileCtrl.profile.getProfileSettings()
			editProfileCtrl.accountSettings = editProfileCtrl.profile.getAccountSettings()
			editProfileCtrl.sexyMode = !editProfileCtrl.currentUser.safeMode
		}

		var reloadProfile = function() {
			editProfileCtrl.isLoading = true
			ProfilesModel.getProfile(editProfileCtrl.profileId).then(function(result) {
				$rootScope.$broadcast('profile_loaded:true')
				editProfileCtrl.isLoading = false
				editProfileCtrl.settingPrimaryImage = false
				editProfileCtrl.profile = new ProfileData(result)
				editProfileCtrl.profileSettings = editProfileCtrl.profile.getProfileSettings()
				editProfileCtrl.accountSettings = editProfileCtrl.profile.getAccountSettings()
				editProfileCtrl.accountSettings.showOnline = editProfileCtrl.currentUser.showOnline ? '1' : '0'
				editProfileCtrl.profileSettings.initialUsername = editProfileCtrl.profileSettings.username
				editProfileCtrl.showCupidSettings = editProfileCtrl.profile.get('showCupidSettings')
				editProfileCtrl.profileSettings.phone = editProfileCtrl.currentUser.phone
				var avatarSrc = editProfileCtrl.profile.getAvatar()
				editProfileCtrl.currentUser.avatar = avatarSrc
				if (avatarSrc.indexOf('no_photo_') > -1) {
					$rootScope.$broadcast('no_photo:true')
					$('#current-user-avatar-img').addClass('ng-hide')
				} else {
					$rootScope.$broadcast('no_photo:false')
					$('#current-user-avatar-img').attr('src', avatarSrc).removeClass('ng-hide')
				}

				if (GLOBALS.hasMap) {
					editProfileCtrl.useOpenStreetMap = GLOBALS.useOpenStreetMap
					if (GLOBALS.useOpenStreetMap) {
						var nLat = parseFloat(editProfileCtrl.profile.get('latLon').lat)
						var nLon = parseFloat(editProfileCtrl.profile.get('latLon').lon)
						var sImg = '/images/map-marker-' + GLOBALS.siteShortName + '.png'
						editProfileCtrl.markers = [
							{
								lat: nLat,
								lon: nLon,
							},
						]
						angular.extend($scope, {
							center: {
								lat: nLat,
								lon: nLon,
								zoom: 6,
							},
							/* global ol */
							markers: editProfileCtrl.markers,
							defaults: {
								styles: {
									marker: {
										image: new ol.style.Icon({
											anchor: [0.5, 1.1],
											src: sImg,
										}),
									},
								},
							},
						})
					} else {
						var mapUrl = editProfileCtrl.profile.get('mapUrl')
						editProfileCtrl.mapUrl = $sce.trustAsResourceUrl(mapUrl)
					}
				}
			})
		}

		reloadProfile()

		editProfileCtrl.photoRange = function(n) {
			var photoRange = []
			for (var i = 0; i < n; i++) {
				photoRange.push(i)
			}
			return photoRange
		}
		editProfileCtrl.photoRangeMobile = editProfileCtrl.isMobile ? editProfileCtrl.photoRange(5) : editProfileCtrl.photoRange(8)

		var updateGlobalsLocation = function(sCriteria) {
			GLOBALS.userInfo.textKey = sCriteria.location ? sCriteria.location : GLOBALS.userInfo.textKey
			GLOBALS.userInfo.location = sCriteria.location ? sCriteria.location.slice(0, 2) : GLOBALS.userInfo.location
			GLOBALS.userInfo.city = sCriteria.city ? sCriteria.city.split(',')[0] : GLOBALS.userInfo.city
		}

		var updateGlobalsUsername = function(profileSettings) {
			GLOBALS.userInfo.username = profileSettings.username ? profileSettings.username : GLOBALS.userInfo.username
		}

		editProfileCtrl.saveSettings = function() {
			editProfileCtrl.formStatus = 'saving'
			UsersModel.saveProfileSettings(editProfileCtrl.profileSettings).error(function(result) {
					if (result && result.selfDescription && result.selfDescription.Reason) {
						result.selfDescription = [result.selfDescription.Reason]
					}

					editProfileCtrl.errors = result
					editProfileCtrl.formStatus = 'editing'
					editProfileCtrl.showConfirmBox(sError, 1)
				})
				.then(function() {
					editProfileCtrl.errors = null
					editProfileCtrl.formStatus = 'editing'
					editProfileCtrl.showConfirmBox(sOk, 1)
					updateGlobalsLocation(editProfileCtrl.profileSettings)
					reloadProfile()
				})
		}

		editProfileCtrl.saveDescription = function(description) {
			editProfileCtrl.formDescriptionStatus = 'saving'
			editProfileCtrl.descriptionFocus = true
			editProfileCtrl.profileSettings = editProfileCtrl.profile.getProfileSettings()
			editProfileCtrl.profileSettings.selfDescription = description
			UsersModel.saveProfileSettings(editProfileCtrl.profileSettings).error(function(result) {
				if (result && result.selfDescription && result.selfDescription.Reason) {
					result.selfDescription = [result.selfDescription.Reason]
				}

				editProfileCtrl.errors = result
				editProfileCtrl.formDescriptionStatus = 'editing'
				editProfileCtrl.descriptionFocus = false
				editProfileCtrl.showConfirmBox(sError, 1)
			})
			.then(function() {
				editProfileCtrl.errors = null
				editProfileCtrl.formDescriptionStatus = 'editing'
				editProfileCtrl.descriptionFocus = false
				editProfileCtrl.showConfirmBox(sOk, 1)
				reloadProfile()
			})
		}

		editProfileCtrl.saveLifestyle = function() {
			editProfileCtrl.formLifestyleStatus = 'saving'
			var settingsLifestyle = editProfileCtrl.profile.getProfileSettings();
			['position', 'exercise', 'drinking', 'smoking', 'Pets', 'sexSpot'].forEach(function(el) {
				settingsLifestyle[el] = editProfileCtrl.profileSettings[el]
			})
			UsersModel.saveProfileSettings(settingsLifestyle).error(function(result) {
				editProfileCtrl.errors = result
				editProfileCtrl.formLifestyleStatus = 'editing'
				editProfileCtrl.showConfirmBox(sError, 1)
			})
			.then(function() {
				editProfileCtrl.errors = null
				editProfileCtrl.formLifestyleStatus = 'editing'
				editProfileCtrl.showConfirmBox(sOk, 1)
				reloadProfile()
			})
		}

		editProfileCtrl.saveMyself = function() {
			editProfileCtrl.formStatus = 'saving'
			var settingsLifestyle = editProfileCtrl.profile.getProfileSettings();
			['LookingFor', 'maritalStatus', 'profession', 'race', 'religion', 'height', 'bodyType', 'hairColor', 'eyeColor', 'piercings', 'tattoos'].forEach(function(el) {
				settingsLifestyle[el] = editProfileCtrl.profileSettings[el]
			})
			UsersModel.saveProfileSettings(settingsLifestyle).error(function(result) {
				editProfileCtrl.errors = result
				editProfileCtrl.formStatus = 'editing'
				editProfileCtrl.showConfirmBox(sError, 1)
			})
			.then(function() {
				editProfileCtrl.errors = null
				editProfileCtrl.formStatus = 'editing'
				editProfileCtrl.showConfirmBox(sOk, 1)
				reloadProfile()
			})
		}

		editProfileCtrl.changesSaved = false

		editProfileCtrl.saveAccountSettings = function() {
			editProfileCtrl.accountFormStatus = 'saving'
			if (editProfileCtrl.showBbrPhoneNumberPopup) {
				var input = document.querySelector('#EditSettingsForm_phone')
				var phoneNumber = input.value
				var countryCode = input.offsetParent.innerText
				editProfileCtrl.accountSettings.phone = phoneNumber
				editProfileCtrl.accountSettings.phoneCountryCode = countryCode.slice(1)
			}
			UsersModel.saveAccountSettings(editProfileCtrl.accountSettings).error(function(result) {
					editProfileCtrl.errors = result
					editProfileCtrl.accountFormStatus = 'editing'
					editProfileCtrl.showConfirmBox(sError, 1)
				})
				.then(function(result) {
					if (editProfileCtrl.showBbrPhoneNumberPopup) {
						editProfileCtrl.currentUser.phone = '+' + result.config.data.phoneCountryCode + result.config.data.phone
					}
					editProfileCtrl.currentUser.showOnline = editProfileCtrl.accountSettings.showOnline
					editProfileCtrl.errors = null
					editProfileCtrl.accountFormStatus = 'editing'
					editProfileCtrl.setSafeModeToValue(!editProfileCtrl.sexyMode)
					editProfileCtrl.showConfirmBox(sOk, 1)
				})
		}

		editProfileCtrl.saveEmailPassSettings = function() {
			editProfileCtrl.emailPassFormStatus = 'saving'
			UsersModel.saveEmailPassSettings(editProfileCtrl.accountSettings).error(function(result) {
				editProfileCtrl.errors = result
				editProfileCtrl.emailPassFormStatus = 'editing'
				editProfileCtrl.showConfirmBox(sError, 1)
			})
			.then(function() {
				editProfileCtrl.currentUser.showOnline = editProfileCtrl.accountSettings.showOnline
				editProfileCtrl.setSafeModeToValue(!editProfileCtrl.sexyMode)
				editProfileCtrl.errors = null
				editProfileCtrl.emailPassFormStatus = 'editing'
				editProfileCtrl.showConfirmBox(sOk, 1)
				window.location.reload()
			})
		}

		editProfileCtrl.saveNotificationsSettings = function() {
			editProfileCtrl.notificationFormStatus = 'saving'
			UsersModel.saveNotificationSettings(editProfileCtrl.accountSettings).error(function(result) {
				editProfileCtrl.errors = result
				editProfileCtrl.notificationFormStatus = 'editing'
				editProfileCtrl.showConfirmBox(sError, 1)
			})
			.then(function() {
				editProfileCtrl.currentUser.showOnline = editProfileCtrl.accountSettings.showOnline
				editProfileCtrl.errors = null
				editProfileCtrl.notificationFormStatus = 'editing'
				editProfileCtrl.showConfirmBox(sOk, 1)
			})
		}

		editProfileCtrl.saveUsername = function(profile) {
			editProfileCtrl.formStatus = 'saving'
			editProfileCtrl.savingUsername = true
			UsersModel.saveUsername(profile).error(function(result) {
					editProfileCtrl.errors = result
					editProfileCtrl.formStatus = 'editing'
					editProfileCtrl.savingUsername = false
				})
				.then(function() {
					editProfileCtrl.errors = null
					editProfileCtrl.formStatus = 'editing'
					editProfileCtrl.savingUsername = false
					editProfileCtrl.showUsernameForm = false
					editProfileCtrl.showUsernameFormDropdown = false
					editProfileCtrl.profileSettings.initialUsername = profile.username
					updateGlobalsUsername(profile)
					reloadProfile()
				})
		}

		editProfileCtrl.saveLocation = function(profile) {
			editProfileCtrl.formStatus = 'saving'
			UsersModel.saveLocation(profile).error(function(result) {
					editProfileCtrl.errors = result
					editProfileCtrl.formStatus = 'editing'
				})
				.then(function(result) {
					editProfileCtrl.errors = null
					editProfileCtrl.formStatus = 'editing'
					editProfileCtrl.showLocationForm = false
					editProfileCtrl.showLocationFormDropdown = false
					editProfileCtrl.profileSettings.locationText = result.data.Locality
					editProfileCtrl.profileSettings.geo = result.data.Lat + ',' + result.data.Lng
					updateGlobalsLocation(profile)
					reloadProfile()
				})
		}

		editProfileCtrl.showUpgradePopup = function () {
			if (editProfileCtrl.nProfileInsteadOfLprofile && !editProfileCtrl.isPremium) {
				$modal.open({
					templateUrl: globalParams.templateUrls.pages.upgrade_popup,
					controller: 'UpgradeBoxCtrl as upgradeBoxCtrl',
					size: 'upgradePopup'
				})
			}
		}

		editProfileCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		editProfileCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: editProfileCtrl.profileSettings.country}
		}

		editProfileCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}

			editProfileCtrl.profileSettings.city = selectedCity.originalObject.region
			editProfileCtrl.profileSettings.location = selectedCity.originalObject.textKey
		}

		editProfileCtrl.moveImage = function($event, n, direction, photoType) {
			var imageId = (photoType == 'private') ? editProfileCtrl.profile.getPrivatePhotoID(n) : editProfileCtrl.profile.getPhotoID(n)
			$event.preventDefault()
			$event.stopPropagation()
			ProfilesModel.moveImage(imageId, direction).error(function(result) {
					editProfileCtrl.errors = result
				})
				.then(function() {
					editProfileCtrl.errors = null
					reloadProfile()
				})
		}

		editProfileCtrl.setPrimaryImage = function(imageId) {
			editProfileCtrl.settingPrimaryImage = true
			ProfilesModel.setPrimaryImage(imageId).error(function(result) {
					editProfileCtrl.errors = result
				})
				.then(function() {
					editProfileCtrl.errors = null
					reloadProfile()
				})
		}

		editProfileCtrl.togglePrivacy = function(imageId) {
			ProfilesModel.togglePrivacy(imageId).error(function(result) {
					editProfileCtrl.errors = result
				})
				.then(function() {
					editProfileCtrl.errors = null
					reloadProfile()
				})
		}

		editProfileCtrl.makePublicPhoto = function(imageId) {
			editProfileCtrl.showConfirmBox('Are you sure you want to move this private photo to your public folder?', 3, imageId)
		}

		editProfileCtrl.makePrivatePhoto = function(imageId) {
			editProfileCtrl.showConfirmBox('Are you sure you want to move this public photo to your private folder?', 3, imageId)
		}

		editProfileCtrl.deleteImage = function(imageId) {
			editProfileCtrl.uploadProgress = -2 //to remove the previous feedback for success uploaded
			editProfileCtrl.showConfirmBox('Are you sure you want to delete this photo?', 2, imageId)
		}

		$scope.$watch('profilePhotos', function() {
			upload($scope.profilePhotos, false)
		})

		$scope.$watch('privateProfilePhotos', function() {
			upload($scope.privateProfilePhotos, true)
		})

		$scope.profilePhotosTabset = {}

		$scope.$watch('profilePhotosTabset.files', function() {
			upload($scope.profilePhotosTabset.files, false)
		})

		var upload = function(profilePhotos, isPrivate) {
			editProfileCtrl.typePhotoUploaded = isPrivate ? 'private' : 'public'
			editProfileCtrl.uploadProgress = -2
			if (profilePhotos && profilePhotos.length) {
				var file = profilePhotos[0]
				Upload.upload({
					url: 'image/upload',
					file: file,
					data: {isPrivate: isPrivate},
					fileFormDataName: 'UserImageUploaded[file][file]',
				}).progress(function(evt) {
					editProfileCtrl.uploadProgress = parseInt(100.0 * evt.loaded / evt.total)
				}).success(function(data, status, headers, config) {
					reloadProfile()
					editProfileCtrl.uploadProgress = -3
				}).error(function(data, status, headers, config) {
					if (data.file) {
						editProfileCtrl.showConfirmBox(data.file[0], 1)
					}
					editProfileCtrl.uploadProgress = -1
				})
			}
		}

		editProfileCtrl.showPrivatePhotoBox = function() {
			$('.managePhotosContent.private-photos').show()
			$('.managePhotosContent.public-photos').hide()
			$('li.public-photos').removeClass('selected')
			$('li.private-photos').addClass('selected')
		}
		editProfileCtrl.showPublicPhotoBox = function() {
			$('.managePhotosContent.private-photos').hide()
			$('.managePhotosContent.public-photos').show()
			$('li.public-photos').addClass('selected')
			$('li.private-photos').removeClass('selected')
		}

		editProfileCtrl.showConfirmBox = function(message, type, imageId) {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.pages.confirm_box,
				controller: 'ConfirmBoxCtrl as confirmBoxCtrl',
				size: 'confirmBoxPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					infoToSend: function() {
						return {
							message: message,
							type: type,
							imageId: imageId,
							profile: editProfileCtrl.profile,
							reloadProfile: function() {
								reloadProfile()
							},
							updateGlobalsLocation: function(profile) {
								updateGlobalsLocation(profile)
							},
						}
					},
				},
			})
		}

		editProfileCtrl.showPictureBox = function(nPhoto) {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.pages.confirm_box,
				controller: 'ConfirmBoxCtrl as confirmBoxCtrl',
				size: 'pictureBoxPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				modalClass: 'pictureBoxPopup',
				resolve: {
					infoToSend: function() {
						return {
							type: 2,
							nPhoto: nPhoto,
							profile: editProfileCtrl.profile,
							imageId: editProfileCtrl.profile.getPhotoID(nPhoto),
							reloadProfile: function() {
								reloadProfile()
							},
						}
					},
				},
			})
		}
		editProfileCtrl.imgBaseUrl = GLOBALS.baseUrl + '/images'
		if (GLOBALS.parentSite == 'xpickupresponsive') {
			editProfileCtrl.imgBaseUrl += '/' + GLOBALS.siteShortName.toLowerCase()
		}
		editProfileCtrl.days = UsersModel.getBirthdayDays()
		editProfileCtrl.months = UsersModel.getBirthdayMonths()
		editProfileCtrl.years = UsersModel.getBirthdayYears()
		editProfileCtrl.lookingForGenders = UsersModel.getLookingForGenders(editProfileCtrl.currentUser.gender)
		editProfileCtrl.LookingForWhat = UsersModel.getEntitiesArray('LookingForWhat', editProfileCtrl.currentUser.gender)
		editProfileCtrl.myCharacteristics = UsersModel.getEntitiesArray('myCharacteristics', editProfileCtrl.currentUser.gender)
		editProfileCtrl.favoriteActivities = UsersModel.getEntitiesArray('favoriteActivities', editProfileCtrl.currentUser.gender)
		editProfileCtrl.whatTurnsMeOn = UsersModel.getEntitiesArray('whatTurnsMeOn', editProfileCtrl.currentUser.gender)

		editProfileCtrl.profileSettingsOptions = PROFILE_SETTINGS[editProfileCtrl.currentUser.gender]

		editProfileCtrl.countries = ProfilesModel.getCountries()
		editProfileCtrl.formStatus = 'editing'
		editProfileCtrl.formDescriptionStatus = 'editing'
		editProfileCtrl.formLifestyleStatus = 'editing'
		editProfileCtrl.accountFormStatus = 'editing'
		editProfileCtrl.notificationFormStatus = 'editing'
		editProfileCtrl.emailPassFormStatus = 'editing'
		editProfileCtrl.showUsernameForm = false
		editProfileCtrl.showUsernameFormDropdown = false
		editProfileCtrl.showLocationForm = false
		editProfileCtrl.showLocationFormDropdown = false
		editProfileCtrl.uploadProgress = -2

		editProfileCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)
		editProfileCtrl.showDescriptorUrl = editProfileCtrl.currentUser.showDescriptorUrl
		editProfileCtrl.descriptorUrl = editProfileCtrl.currentUser.descriptorUrl
		editProfileCtrl.paymentProcess = editProfileCtrl.currentUser.paymentProcess
		editProfileCtrl.paymentProcessCustom = editProfileCtrl.currentUser.paymentProcessCustom
		angular.element($window).bind('click', function(event) {
			if (!$(event.target).is('.dropdownForm *:not("button"), .toggleDropdown, .angucomplete-title')) {
				$scope.$apply(editProfileCtrl.showUsernameFormDropdown = false, editProfileCtrl.showLocationFormDropdown = false)
			}
		})
		$scope.$on('sign-out:success', function() {
			editProfileCtrl.isLoggedIn = false
			editProfileCtrl.currentUser = null
		})
	})
	.controller('ConfirmBoxCtrl', function(infoToSend, ProfilesModel, UsersModel, $scope, $modalStack, $modalInstance, GLOBALS) {
		var confirmBoxCtrl = this
		confirmBoxCtrl.infoToDisplay = infoToSend
		if (confirmBoxCtrl.infoToDisplay.type != 3) {
			confirmBoxCtrl.days = UsersModel.getBirthdayDays()
			confirmBoxCtrl.months = UsersModel.getBirthdayMonths()
			confirmBoxCtrl.years = UsersModel.getBirthdayYears()
			confirmBoxCtrl.countries = ProfilesModel.getCountries()
			confirmBoxCtrl.profileSettings = infoToSend.profile.getProfileSettings()
			confirmBoxCtrl.formStatus = 'editing'
		}
		confirmBoxCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		confirmBoxCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: confirmBoxCtrl.profileSettings.country}
		}

		confirmBoxCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}

			confirmBoxCtrl.profileSettings.city = selectedCity.originalObject.region
			confirmBoxCtrl.profileSettings.location = selectedCity.originalObject.textKey
		}

		confirmBoxCtrl.saveUsernameBirthdayLocation = function() {
			confirmBoxCtrl.formStatus = 'saving'
			UsersModel.saveProfileSettings(confirmBoxCtrl.profileSettings).error(function(result) {
				confirmBoxCtrl.errors = result
				confirmBoxCtrl.formStatus = 'editing'
			})
			.then(function() {
				confirmBoxCtrl.errors = null
				confirmBoxCtrl.formStatus = 'editing'
				infoToSend.reloadProfile()
				infoToSend.updateGlobalsLocation(confirmBoxCtrl.profileSettings)
				$modalStack.dismissAll()
			})
		}

		confirmBoxCtrl.deletePhoto = function() {
			confirmBoxCtrl.deletingImage = true
			ProfilesModel.deleteImage(infoToSend.imageId).error(function(result) {
					confirmBoxCtrl.errors = result
				})
				.then(function() {
					confirmBoxCtrl.errors = null
					infoToSend.reloadProfile()
					confirmBoxCtrl.closeModal = true
					if (GLOBALS.siteName.toLowerCase() == 'localtemptation') {
						$.fancybox.close()
					}
				})
		}

		confirmBoxCtrl.togglePrivacy = function(imageId) {
			ProfilesModel.togglePrivacy(imageId).error(function(result) {
					confirmBoxCtrl.errors = result
				})
				.then(function() {
					confirmBoxCtrl.errors = null
					infoToSend.reloadProfile()
				})
		}

		confirmBoxCtrl.setPrimaryImage = function() {
			confirmBoxCtrl.settingPrimaryImage = true
			ProfilesModel.setPrimaryImage(infoToSend.imageId).error(function(result) {
				confirmBoxCtrl.errors = result
			})
			.then(function() {
				confirmBoxCtrl.errors = null
				infoToSend.reloadProfile()
				confirmBoxCtrl.closeModal = true
			})
		}
		confirmBoxCtrl.setNext = function() {
			if (confirmBoxCtrl.infoToDisplay.nPhoto <confirmBoxCtrl.infoToDisplay.profile.countPhotos()-1) {
				var newPhotoNumber = confirmBoxCtrl.infoToDisplay.nPhoto+1
				confirmBoxCtrl.infoToDisplay.nPhoto = newPhotoNumber
				infoToSend.imageId=confirmBoxCtrl.infoToDisplay.profile.getPhotoID(newPhotoNumber)
			}
		}
		confirmBoxCtrl.setPrev = function() {
			if (confirmBoxCtrl.infoToDisplay.nPhoto > 0) {
				var newPhotoNumber = confirmBoxCtrl.infoToDisplay.nPhoto-1
				confirmBoxCtrl.infoToDisplay.nPhoto = newPhotoNumber
				infoToSend.imageId=confirmBoxCtrl.infoToDisplay.profile.getPhotoID(newPhotoNumber)
			}
		}
		$scope.$on('profile_loaded:true', function() {
			confirmBoxCtrl.settingPrimaryImage = false
			confirmBoxCtrl.deletingImage = false
			if (confirmBoxCtrl.closeModal) {
				$modalInstance.close()
				confirmBoxCtrl.closeModal = false
			}
		})
	})

