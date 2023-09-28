angular.module('authBox', [
		'dating.models.users',
		'ui.bootstrap',
	])
	.service('showSignInBox', function($modal, $modalStack) {
		var showSignInBox = function(popupData) {
			$modal.open({
				templateUrl: globalParams.templateUrls.auth_box.sign_in_box,
				controller: 'SignInBoxCtrl as signInBoxCtrl',
				size: 'signInPopup',
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
		return showSignInBox
	})
	.service('showSignUpBox', function($modal, $modalStack) {
		var showSignUpBox = function(popupData) {
			$modal.open({
				templateUrl: globalParams.templateUrls.auth_box.sign_up_box,
				controller: 'SignUpBoxCtrl as signUpBoxCtrl',
				size: 'signUpPopup',
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
		return showSignUpBox
	})
	.service('showUpdatePasswordBox', function($modal, $modalStack) {
		var showUpdatePasswordBox = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.auth_box.update_password_box,
				controller: 'UpdatePasswordBoxCtrl as updatePasswordBoxCtrl',
				size: 'updatePasswordPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
			$modalStack.dismissAll()
		}
		return showUpdatePasswordBox
	})
	.service('showResetPasswordBox', function($modal, $modalStack) {
		var showResetPasswordBox = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.auth_box.reset_password_box,
				controller: 'ResetPasswordBoxCtrl as resetPasswordCtrl',
				size: 'resetPasswordPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
			$modalStack.dismissAll()
		}
		return showResetPasswordBox
	})
	.controller('SignInBoxCtrl', function($scope, $modalInstance, UsersModel, PagesModel, showSignUpBox, popupData, GLOBALS, showResetPasswordBox) {
		var signInBoxCtrl = this

		signInBoxCtrl.signInUser = function() {
			signInBoxCtrl.isSubmitButtonDisabled = true
			UsersModel.signIn(signInBoxCtrl.user)
				.error(function(result) {
					signInBoxCtrl.isSubmitButtonDisabled = false
					signInBoxCtrl.errors = result
				})
				.then(function() {
					signInBoxCtrl.isSubmitButtonDisabled = false
					signInBoxCtrl.errors = null
					window.location.href = '/'
				})
		}

		signInBoxCtrl.showSignUpBox = showSignUpBox
		signInBoxCtrl.mobile = popupData.mobile || false
		signInBoxCtrl.canClose = popupData.canClose == true
		signInBoxCtrl.siteDomain = GLOBALS.siteDomain
		signInBoxCtrl.siteUrl = GLOBALS.siteUrl
		signInBoxCtrl.showResetPasswordBox = showResetPasswordBox
		signInBoxCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}
	})
	.controller('SignUpBoxCtrl', function($scope, $modalInstance, UsersModel, PagesModel, showSignInBox, popupData, GLOBALS) {
		var signUpBoxCtrl = this

		signUpBoxCtrl.days = UsersModel.getBirthdayDays()
		signUpBoxCtrl.months = UsersModel.getBirthdayMonths()
		signUpBoxCtrl.years = UsersModel.getBirthdayYears()
		signUpBoxCtrl.canClose = popupData.canClose || false
		signUpBoxCtrl.mobile = popupData.mobile || false
		signUpBoxCtrl.siteDomain = GLOBALS.siteDomain
		signUpBoxCtrl.siteUrl = GLOBALS.siteUrl
		signUpBoxCtrl.cupidMail = GLOBALS.cupidDomain
		signUpBoxCtrl.showBirthdayFieldsInUsFormat = GLOBALS.showBirthdayFieldsInUsFormat
		signUpBoxCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)

		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index
		}

		signUpBoxCtrl.signUpUser = function() {
			signUpBoxCtrl.isSubmitButtonDisabled = true
			UsersModel.signUp(signUpBoxCtrl.newUser)
				.error(function(result) {
					signUpBoxCtrl.isSubmitButtonDisabled = false
					signUpBoxCtrl.errors = result
					if (signUpBoxCtrl.errors.email) {
						//"This email address already exists" is twice, i.e. {"email":["This email address already exists","This email address already exists"]}
						signUpBoxCtrl.errors.email = signUpBoxCtrl.errors.email.filter(onlyUnique)
					}
				})
				.then(function() {
					signUpBoxCtrl.isSubmitButtonDisabled = false
					signUpBoxCtrl.errors = null
					window.location.reload()
				})
		}

		signUpBoxCtrl.showSignInBox = showSignInBox
		signUpBoxCtrl.defaultBirthday = {
			day: parseInt(GLOBALS.defaultBirthDay.day),
			month: parseInt(GLOBALS.defaultBirthDay.month),
			year: parseInt(GLOBALS.defaultBirthDay.year),
		}
		signUpBoxCtrl.canClose = popupData.canClose == true
		signUpBoxCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}
	})
	.controller('ResetPasswordBoxCtrl', function($scope, $modalInstance, UsersModel, showSignInBox) {
		var resetPasswordBoxCtrl = this

		resetPasswordBoxCtrl.resetPassForUser = function() {
			UsersModel.resetPassword(resetPasswordBoxCtrl.user).error(function(result) {
				resetPasswordBoxCtrl.errors = result
			})
				.then(function() {
					resetPasswordBoxCtrl.errors = null
					resetPasswordBoxCtrl.messages = [
						'We sent an email to you containing instructions on how to reset you password. Check your inbox.',
					]
				})
		}

		resetPasswordBoxCtrl.showSignInBox = showSignInBox
	})
	.controller('UpdatePasswordBoxCtrl', function($scope, $modalInstance, UsersModel) {
		var updatePasswordBoxCtrl = this

		updatePasswordBoxCtrl.updatePassForUser = function() {
			UsersModel.updatePassword(updatePasswordBoxCtrl.user).error(function(result) {
				updatePasswordBoxCtrl.errors = result
			})
				.then(function() {
					updatePasswordBoxCtrl.errors = null
					$modalInstance.close()
				})
		}
	})

