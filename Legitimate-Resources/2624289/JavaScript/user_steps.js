angular.module('userSteps', [
	'dating.models.users',
	'dating.models.profiles',
	'ui.bootstrap',
	'angucomplete-alt',
	'ngFileUpload',
])
	.service('showStep1Box', function($modal, $modalStack) {
		var modalInstance = null
		var showStep1Box = function() {
			if (!modalInstance) {
				modalInstance = $modal.open({
					templateUrl: globalParams.templateUrls.user_steps.step_1_box,
					controller: 'Step1BoxCtrl as step1BoxCtrl',
					size: 'step1Popup',
					keyboard: false,
					backdrop: 'static',
					animation: false,
				})
			}
			$modalStack.dismissAll()
		}
		return showStep1Box
	})
	.controller('Step1BoxCtrl', function($scope, $modalInstance, UsersModel, ProfilesModel, showStep1Box, authService, GLOBALS) {
		var step1BoxCtrl = this,
			captchaCode = null

		step1BoxCtrl.setARValues = function(genderId) {
			if (genderId == 1) {
				step1BoxCtrl.currentUser.lookingFor = {}
				step1BoxCtrl.currentUser.lookingFor[GLOBALS.lookingFor.male] = true
				step1BoxCtrl.currentUser.arrangementType = null
			} else {
				step1BoxCtrl.currentUser.lookingFor = {}
				step1BoxCtrl.currentUser.lookingFor[GLOBALS.lookingFor.female] = true
				step1BoxCtrl.currentUser.arrangementType = (GLOBALS.userInfo.age >= GLOBALS.minAgeForSugarDaddy) ? GLOBALS.arrangementType.give : null
			}
		}

		step1BoxCtrl.saveSettings = function() {
			step1BoxCtrl.isSubmitButtonDisabled = true
			UsersModel.saveSettings(step1BoxCtrl.currentUser)
				.error(function(result) {
					step1BoxCtrl.isSubmitButtonDisabled = false
					step1BoxCtrl.errors = result
				})
				.then(function(result) {
					step1BoxCtrl.isSubmitButtonDisabled = false
					step1BoxCtrl.errors = null
					window.location.reload()
				})
		}

		step1BoxCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
			step1BoxCtrl.errors = null
		}

		step1BoxCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: step1BoxCtrl.currentUser.location}
		}

		step1BoxCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			step1BoxCtrl.currentUser.city = selectedCity.originalObject.region
			step1BoxCtrl.currentUser.textKey = selectedCity.originalObject.textKey
		}

		step1BoxCtrl.getCaptchaForm = function() {
			return 'JustRegisteredForm'
		}

		step1BoxCtrl.genders = UsersModel.getGenders().reverse()
		step1BoxCtrl.lookingForGenders = UsersModel.getLookingForGenders()
		step1BoxCtrl.lookingForGendersReversed = UsersModel.getLookingForGenders().reverse()
		step1BoxCtrl.countries = ProfilesModel.getCountries()
		step1BoxCtrl.currentUser = authService.currentUser
		step1BoxCtrl.currentUser.gender = step1BoxCtrl.currentUser.gender || _.find(step1BoxCtrl.genders, 'type', 'Man').id
		var oDefaultLookingFor = {}
		_.each(GLOBALS.defaultLookingFor, function(item) {
			oDefaultLookingFor[item] = true
		})
		step1BoxCtrl.currentUser.lookingFor = step1BoxCtrl.currentUser.lookingFor || oDefaultLookingFor

	})
	.service('showStep2Box', function($modal, $modalStack) {
		var showStep2Box = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.user_steps.step_2_box,
				controller: 'Step2BoxCtrl as step2BoxCtrl',
				size: 'step2Popup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
			$modalStack.dismissAll()
		}
		return showStep2Box
	})
	.controller('Step2BoxCtrl', function($scope, $rootScope, $modalInstance, UsersModel, ProfilesModel, showStep2Box, authService, Upload, GLOBALS, ProfileData) {
		var step2BoxCtrl = this
		step2BoxCtrl.currentUser = authService.currentUser
		step2BoxCtrl.errors = null
		$scope.$watch('profilePhotos', function() {
			upload($scope.profilePhotos)
		})

		var upload = function(profilePhotos) {
			step2BoxCtrl.errors = null
			if (profilePhotos && profilePhotos.length) {
				var file = profilePhotos[0]
				Upload.upload({
                    url: 'image/upload',
                    file: file,
                    data: {isPrivate: 0},
                    fileFormDataName: 'UserImageUploaded[file][file]',
				}).progress(function(evt) {
					step2BoxCtrl.uploadProgress = parseInt(100.0 * evt.loaded / evt.total)
				}).success(function(data, status, headers, config) {
					step2BoxCtrl.uploadProgress = -3
					step2BoxCtrl.imageUploaded = true
					reloadProfile()
				}).error(function(data, status, headers, config) {
					step2BoxCtrl.errors = data
					step2BoxCtrl.uploadProgress = -1
				})
			}
		}

		var reloadProfile = function() {
			ProfilesModel.getProfile(step2BoxCtrl.currentUser.id).then(function(result) {
				var avatarSrc = new ProfileData(result).getAvatar()
				if (avatarSrc.indexOf('no_photo_') === -1) {
					step2BoxCtrl.currentUser.avatar = avatarSrc
					$rootScope.$broadcast('no_photo:false')
					$('#current-user-avatar-img').attr('src', avatarSrc).removeClass('ng-hide')
				}
			})
		}

		var typingStartTime = 0
		var typingEndTime = 0

		step2BoxCtrl.descriptionTime = function() {
			var currentTime = Math.round((new Date().getTime()) / 1000)

			if (typingStartTime == 0) {
				typingStartTime = currentTime
			}
			typingEndTime = currentTime
		}

		step2BoxCtrl.saveDescription = function() {
			step2BoxCtrl.currentUser.time = typingEndTime - typingStartTime
			step2BoxCtrl.isSubmitButtonDisabled = true
			UsersModel.saveDescription(step2BoxCtrl.currentUser)
				.error(function(result) {
					if (result && result.selfDescription && result.selfDescription.Reason) {
						result.selfDescription = [result.selfDescription.Reason]
					}

					step2BoxCtrl.isSubmitButtonDisabled = false
					step2BoxCtrl.errors = result
				})
				.then(function(result) {
					step2BoxCtrl.isSubmitButtonDisabled = false
					step2BoxCtrl.errors = null
					window.location.reload()
				})
		}

		step2BoxCtrl.isAvatarUploaded = function() {
			return step2BoxCtrl.currentUser.avatar.indexOf('no_photo_') === -1
		}

		step2BoxCtrl.uploadProgress = -2
		step2BoxCtrl.showLookingForDescription = false

		UsersModel.getTimestamp().then(function(result) {
			step2BoxCtrl.currentUser.displayTimestamp = result.data.timestamp
		})

		document.cookie = 'landingPage=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
	})

