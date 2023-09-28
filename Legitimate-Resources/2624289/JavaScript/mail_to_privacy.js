angular.module('pages.mailToPrivacy', [
		'dating.models.pages',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.mailToPrivacy', {
				url: 'site/mailToPrivacy',
				views: {
					'sections@': {
						controller: 'MailToPrivacyCtrl as mailToPrivacyCtrl',
						templateUrl: globalParams.templateUrls.pages.mail_to_privacy,
					},
				},
			})

	})
	.controller('MailToPrivacyCtrl', function(PagesModel) {
		var mailToPrivacyCtrl = this

		PagesModel.setCurrentPage('MailToPrivacy')
		mailToPrivacyCtrl.sendFormForUser = function() {
			PagesModel.sendFormForUser(mailToPrivacyCtrl.newTicket)
				.error(function(result) {
					mailToPrivacyCtrl.errors = result
				})
				.then(function() {
					mailToPrivacyCtrl.ticketSubmitted = true
				})
		}
	})

