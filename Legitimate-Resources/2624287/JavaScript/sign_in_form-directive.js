angular.module('dating.directives.signInForm', [])
	.controller('SignInFormCtrl', function($scope, UsersModel) {
		var signInCtrl = this
		signInCtrl.signInUser = function() {
			signInCtrl.isSubmitButtonDisabled = true
            if (!signInCtrl.user || !signInCtrl.user.username.trim()) {
                signInCtrl.errors = {username: ['Username cannot be blank.']}
				signInCtrl.isSubmitButtonDisabled = false
                return
            }
			UsersModel.signIn(signInCtrl.user).error(function(result) {
					signInCtrl.errors = result
					signInCtrl.isSubmitButtonDisabled = false
				})
				.then(function() {
					signInCtrl.isSubmitButtonDisabled = false
					signInCtrl.errors = null
					window.location.href = '/'
				})
		}
	})
	.directive('signInForm', function() {
		return {
			restrict: 'E',
			controller: 'SignInFormCtrl',
			controllerAs: 'signInFormCtrl',
			bindToController: true,
			scope: {},
			templateUrl: globalParams.templateUrls.directives.sign_in_form,
			link: function(scope, element, attr, signInCtrl) {
			},
		}
	})

