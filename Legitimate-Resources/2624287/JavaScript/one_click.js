angular.module('oneClick', [
		'dating.models.users',
		'dating.models.profiles',
		'ui.bootstrap',
		'angucomplete-alt',
		'ngFileUpload',
	])

	.service('showAffiliateOneClickStep1Box', function($modal, $modalStack) {
		var showBox = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.one_click.affiliate_step_1_box,
				controller: 'AffiliateBoxCtrlStep1 as boxCtrl',
				size: 'affiliateStep1Box',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
			$modalStack.dismissAll()
		}

		return showBox
	})
	.controller('AffiliateBoxCtrlStep1', function($scope, UsersModel, ProfilesModel, authService, GLOBALS) {
		var boxCtrl = this

		boxCtrl.saveSettings = function() {
			boxCtrl.isSubmitButtonDisabled = true
			UsersModel.saveAffiliateStep1Settings(boxCtrl.currentUser).error(function(result) {
					boxCtrl.errors = result
					boxCtrl.isSubmitButtonDisabled = false
				})
				.then(function() {
					boxCtrl.errors = null
					window.location.reload()
				})
		}

		boxCtrl.setARValues = function(genderId) {
			if (genderId == 1) {
				boxCtrl.currentUser.lookingFor = {}
				boxCtrl.currentUser.lookingFor[GLOBALS.lookingFor.male] = true
				boxCtrl.currentUser.arrangementType = null
			} else {
				boxCtrl.currentUser.lookingFor = {}
				boxCtrl.currentUser.lookingFor[GLOBALS.lookingFor.female] = true
				boxCtrl.currentUser.arrangementType = (GLOBALS.userInfo.age >= GLOBALS.minAgeForSugarDaddy) ? GLOBALS.arrangementType.give : null
			}
		}

		boxCtrl.isSubmitButtonDisabled = false
		boxCtrl.siteDomain = GLOBALS.siteDomain
		boxCtrl.siteName = GLOBALS.siteName
		boxCtrl.siteUrl = GLOBALS.siteUrl
		boxCtrl.cupidMail = GLOBALS.cupidDomain
		boxCtrl.sellEmailClicks = GLOBALS.sellEmailClicks
		boxCtrl.sendIMLiveLead = GLOBALS.sendIMLiveLead
		boxCtrl.currentUser = authService.currentUser

		boxCtrl.genders = UsersModel.getGenders()
		boxCtrl.lookingForGenders = UsersModel.getLookingForGenders()
		boxCtrl.showBirthdayFieldsInUsFormat = GLOBALS.showBirthdayFieldsInUsFormat
		boxCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)

		boxCtrl.currentUser.gender = boxCtrl.currentUser.gender || boxCtrl.genders[_.findIndex(boxCtrl.genders, ['type', 'Man'])].id
		var oDefaultLookingFor = {}
		_.each(GLOBALS.defaultLookingFor, function(item) {
			oDefaultLookingFor[item] = true
		})
		boxCtrl.currentUser.lookingFor = boxCtrl.currentUser.lookingFor || oDefaultLookingFor

		boxCtrl.days = UsersModel.getBirthdayDays()
		boxCtrl.months = UsersModel.getBirthdayMonths()
		boxCtrl.years = UsersModel.getBirthdayYears()
		boxCtrl.defaultBirthday = {
			day: parseInt(GLOBALS.defaultBirthDay.day),
			month: parseInt(GLOBALS.defaultBirthDay.month),
			year: parseInt(GLOBALS.defaultBirthDay.year),
		}
	})
	.filter('floor', function() {
		return function(input) {
			return Math.floor(input);
		};
	})
	.service('showAffiliateOneClickStep2Box', function($modal, $modalStack) {
		var showBox = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.one_click.affiliate_step_2_box,
				controller: 'AffiliateBoxCtrlStep2 as boxCtrl',
				size: 'affiliateStep2Box',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
			$modalStack.dismissAll()
		}
		return showBox
	})
	.controller('AffiliateBoxCtrlStep2', function($scope, UsersModel, ProfilesModel, authService) {
		var boxCtrl = this
		boxCtrl.currentUser = authService.currentUser
		boxCtrl.isSubmitButtonDisabled = false

		var typingStartTime = 0
		var typingEndTime = 0

		boxCtrl.descriptionTime = function() {
			var currentTime = Math.round((new Date().getTime()) / 1000)

			if (typingStartTime == 0) {
				typingStartTime = currentTime
			}
			typingEndTime = currentTime
		}

		boxCtrl.saveSettings = function() {
			boxCtrl.isSubmitButtonDisabled = true
			boxCtrl.currentUser.time = typingEndTime - typingStartTime
			UsersModel.saveAffiliateStep2Settings(boxCtrl.currentUser).error(function(result) {
					if (result && result.selfDescription && result.selfDescription.Reason) {
						result.selfDescription = [result.selfDescription.Reason]
					}

					boxCtrl.errors = result
					boxCtrl.isSubmitButtonDisabled = false
				})
				.then(function() {
					boxCtrl.errors = null
					window.location.reload()
				})
		}

		boxCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		boxCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: boxCtrl.currentUser.location}
		}

		boxCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			boxCtrl.currentUser.city = selectedCity.originalObject.region
			boxCtrl.currentUser.textKey = selectedCity.originalObject.textKey
		}

		UsersModel.getTimestamp().then(function(result) {
			boxCtrl.currentUser.displayTimestamp = result.data.timestamp
		})
		boxCtrl.countries = ProfilesModel.getCountries()
	})
	.service('showAffiliateOneClickStep3Box', function($modal, $modalStack) {
		var showBox = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.one_click.affiliate_step_3_box,
				controller: 'AffiliateBoxCtrlStep3 as boxCtrl',
				size: 'affiliateStep3Box',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
			$modalStack.dismissAll()
		}
		return showBox
	})
	.controller('AffiliateBoxCtrlStep3', function($scope, UsersModel) {
		var boxCtrl = this
		boxCtrl.isSubmitButtonDisabled = false

		boxCtrl.saveSettings = function() {
			boxCtrl.isSubmitButtonDisabled = true
			UsersModel.saveAffiliateStep3Settings(boxCtrl.currentUser).error(function(result) {
					boxCtrl.errors = result
					boxCtrl.isSubmitButtonDisabled = false
				})
				.then(function() {
					boxCtrl.errors = null
					window.location.reload()
				})
		}
	})
	.service('showOneClickBox', function($modal, $modalStack) {
		var showBox = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.one_click.one_click_box,
				controller: 'OneClickCtrl as boxCtrl',
				size: 'oneClickPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
			$modalStack.dismissAll()
		}
		return showBox
	})
	.controller('OneClickCtrl', function($scope, UsersModel, ProfilesModel, authService, GLOBALS, $window, $interval) {
		var boxCtrl = this
		boxCtrl.currentUser            = authService.currentUser
		boxCtrl.siteDomain             = GLOBALS.siteDomain
		boxCtrl.isSubmitButtonDisabled = false
		boxCtrl.siteName               = GLOBALS.siteName
		boxCtrl.cupidMail              = GLOBALS.cupidDomain
		boxCtrl.sellEmailClicks        = GLOBALS.sellEmailClicks
		boxCtrl.sendIMLiveLead         = GLOBALS.sendIMLiveLead
		boxCtrl.themePath              = GLOBALS.baseUrl + '/styles/images/exitPopup/'
		boxCtrl.isCreditsSite          = parseInt(GLOBALS.isCreditsSite)
		boxCtrl.shouldShowExitPopup    = GLOBALS.signupSpecialOffer

		boxCtrl.saveSettings = function() {
			boxCtrl.isSubmitButtonDisabled = true
			UsersModel.saveOneClickSettings(boxCtrl.currentUser).error(function(result) {
					boxCtrl.errors = result
					boxCtrl.isSubmitButtonDisabled = false
				})
				.then(function(result) {
					boxCtrl.errors = null
					window.location.reload()
				})
		}

		boxCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		boxCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: boxCtrl.currentUser.location}
		}

		boxCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			boxCtrl.currentUser.city = selectedCity.originalObject.region
			boxCtrl.currentUser.textKey = selectedCity.originalObject.textKey
		}

		$scope.state = {showLong: false}
		boxCtrl.countries = ProfilesModel.getCountries()
		boxCtrl.showLong = false
		$scope.counter = 59;
		var timer;

		$scope.$watch('state.showLong', function(newValue) {
			if (newValue) {
				startCountdown();
			}
		});

		// Function to start the countdown
		function startCountdown() {
			timer = $interval(function() {
				$scope.counter--;
				if ($scope.counter === 0) {
					// Countdown completed, do something
					$interval.cancel(timer);
				}
			}, 1000);
		}

		// Cleanup the timer when the controller is destroyed
		$scope.$on('$destroy', function() {
			$interval.cancel(timer);
		});
		if(!parseInt(GLOBALS.isMobile) && boxCtrl.shouldShowExitPopup){
			var yOld = typeof yOld === 'undefined' ? 0 : yOld
			$(document).on('mousemove', function (event) {
				var yTemp = event.pageY
				if (yTemp < 50 && yTemp < yOld)
				{
					$scope.$apply(function() {
						$scope.state.showLong = true;
					});
					boxCtrl.showLong = true
					$(this).unbind('mousemove')
					$('.modal-oneClickPopup').trigger('click').addClass('long')
				}
				yOld = yTemp
			})
		}
	})
	.directive('countDown', function() {
		var count = 40
		return {
			restrict: 'A',
			scope: {
				runWhen: '=runWhen',
			},
			link: function(scope, element, attr) {
				function countDown() {
					if (count === 0) {
						return
					} else {
						count--
						$('.sdigits').html('<span>' + Math.floor(count / 10) + '</span><span>' + count % 10 + '</span>')
						setTimeout(countDown, 1000)
					}
				}
				scope.$watch('runWhen', function(newVal) {
					if (newVal) {
						countDown()
					}
				})
			},
		}
	})
