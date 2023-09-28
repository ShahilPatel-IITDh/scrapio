angular.module('pages.resetPassword', [
		'dating.models.pages',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.resetPassword', {
				url: 'resetPassword/makeRequest',
				views: {
					'sections@': {
						controller: 'ResetPasswordCtrl as resetPasswordCtrl',
						templateUrl: globalParams.templateUrls.pages.reset_password,
					},
				},
			})

	})
	.controller('ResetPasswordCtrl', function(PagesModel, UsersModel) {
		var resetPasswordCtrl = this
		PagesModel.setCurrentPage('ResetPassword')
		resetPasswordCtrl.resetPassForUser = function() {
			UsersModel.resetPassword(resetPasswordCtrl.user).error(function(result) {
				resetPasswordCtrl.errors = result
			})
				.then(function(result) {
					resetPasswordCtrl.errors = null
					resetPasswordCtrl.messages = [
						result.data.message,
					]
				})
		}
	})
