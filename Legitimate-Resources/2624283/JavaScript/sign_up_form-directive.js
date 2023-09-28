angular.module('dating.directives.signUpForm', [])
	.controller('SignUpFormCtrl', function($scope, UsersModel, GLOBALS, showSignUpBox, showSignInBox) {
		var signUpFormCtrl = this
		signUpFormCtrl.imagesUrl = GLOBALS.baseUrl + '/styles/images/'
		function signUpUser() {
			signUpFormCtrl.isSubmitButtonDisabled = true
			UsersModel.signUp(signUpFormCtrl.newUser)
				.error(function(result) {
					signUpFormCtrl.isSubmitButtonDisabled = false
					signUpFormCtrl.errors = result
				})
				.then(function() {
					signUpFormCtrl.isSubmitButtonDisabled = false
					signUpFormCtrl.errors = null
					window.location.href = '/'
				})
		}

		signUpFormCtrl.days = UsersModel.getBirthdayDays()
		signUpFormCtrl.months = UsersModel.getBirthdayMonths()
		signUpFormCtrl.years = UsersModel.getBirthdayYears()
		signUpFormCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)

		signUpFormCtrl.signUpUser = signUpUser
		signUpFormCtrl.currentCity = null
		signUpFormCtrl.siteDomain  = GLOBALS.siteDomain
        signUpFormCtrl.cupidMail   = GLOBALS.cupidDomain

		signUpFormCtrl.defaultBirthday = {
			day: parseInt(GLOBALS.defaultBirthDay.day),
			month: parseInt(GLOBALS.defaultBirthDay.month),
			year: parseInt(GLOBALS.defaultBirthDay.year),
		}
		signUpFormCtrl.showSignUpBox = showSignUpBox
		signUpFormCtrl.showSignInBox = showSignInBox
	})
	.directive('signUpForm', function(UsersModel) {
		return {
			restrict: 'E',
			controller: 'SignUpFormCtrl',
			controllerAs: 'signUpFormCtrl',
			bindToController: true,
			scope: {},
			templateUrl: globalParams.templateUrls.directives.sign_up_form,
			link: function(scope, element, attr, SignUpFormCtrl) {
			},
		}
	})

