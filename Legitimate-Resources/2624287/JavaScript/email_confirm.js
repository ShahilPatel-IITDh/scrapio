angular.module('emailConfirm', [
		'dating.models.users',
		'ui.bootstrap',
		'ngCookies',
	])
	.service('showConfirmEmailPopup', function($modal, $modalStack) {
		var showConfirmEmailPopup = function() {
			$modal.open({
				templateUrl: globalParams.templateUrls.email_confirm.confirm_email,
				controller: 'EmailPopupCtrl as emailPopupCtrl',
				size: 'notificationPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				modalClass: 'myClass',
			})
			$modalStack.dismissAll()
		}
		return showConfirmEmailPopup
	})

	.service('showResendEmailPopup', function($modal, $modalStack) {
		var showResendEmailPopup = function() {
			$modal.open({
				templateUrl: globalParams.templateUrls.email_confirm.resend_email,
				controller: 'EmailPopupCtrl as emailPopupCtrl',
				size: 'notificationPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				modalClass: 'myClass',
			})
			$modalStack.dismissAll()
		}
		return showResendEmailPopup
	})

	.service('showChangeEmailPopup', function($modal, $modalStack) {
		var showChangeEmailPopup = function() {
			$modal.open({
				templateUrl: globalParams.templateUrls.email_confirm.change_email,
				controller: 'EmailPopupCtrl as emailPopupCtrl',
				size: 'notificationPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				modalClass: 'myClass',
			})
			$modalStack.dismissAll()
		}
		return showChangeEmailPopup
	})

	.service('showInvalidEmailPopup', function($modal, $modalStack) {
		var showInvalidEmailPopup = function() {
			$modal.open({
				templateUrl: globalParams.templateUrls.email_confirm.invalid_email,
				controller: 'EmailPopupCtrl as emailPopupCtrl',
				size: 'blockPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				modalClass: 'myClass',
			})
			$modalStack.dismissAll()
		}
		return showInvalidEmailPopup
	})

	.controller('NotificationBarCtrl', function($cookies, showConfirmEmailPopup, showResendEmailPopup, showChangeEmailPopup, showInvalidEmailPopup, $modal, $modalStack, authService, GLOBALS) {
		var notificationBarCtrl = this

		notificationBarCtrl.bShowNotificationBar = GLOBALS.user && GLOBALS.user.bShowNotificationBar
		notificationBarCtrl.emailJustBecameInvalid = GLOBALS.user && GLOBALS.user.emailJustBecameInvalid
		notificationBarCtrl.showConfirmEmailPopup = showConfirmEmailPopup
		notificationBarCtrl.showResendEmailPopup = showResendEmailPopup
		notificationBarCtrl.showChangeEmailPopup = showChangeEmailPopup
		notificationBarCtrl.isMobileScreen = GLOBALS.isMobileScreen
		notificationBarCtrl.isLoggedIn = authService.isAuthenticated

		if (notificationBarCtrl.bShowNotificationBar && $cookies.get('data-close' + GLOBALS.userInfo.subid) != 'closed') {
			showConfirmEmailPopup()
		}

		if (notificationBarCtrl.emailJustBecameInvalid && parseInt(GLOBALS.showInvalidEmailPopup)) {
			showInvalidEmailPopup()
		}
	})

	.controller('EmailPopupCtrl', function($cookies, UsersModel, showConfirmEmailPopup, showResendEmailPopup, showChangeEmailPopup, GLOBALS, $filter, $modalInstance) {
		var emailPopupCtrl = this
		var email = GLOBALS.userInfo.emailCurrentUser

		var setEmailRelated = function(newEmail) {
			var domain = newEmail.replace(/.*@/, '')
			var aEmailDomains = ['gmail', 'yahoo', 'aol', 'outlook', 'hotmail']
			emailPopupCtrl.href = '/email/emailActionsPassthrough?emailDomain=' + domain.replace('gmail', 'googlemail')
			emailPopupCtrl.userEmailAddress = newEmail
			emailPopupCtrl.cssClass = domain.split('.') ? domain.split('.')[0] : ''
			emailPopupCtrl.userEmailDomain = (aEmailDomains.indexOf(emailPopupCtrl.cssClass) >= 0) ? emailPopupCtrl.cssClass : $filter('translate')('your mail')
		}
		setEmailRelated(email)

		emailPopupCtrl.siteDomain = GLOBALS.siteDomain
		emailPopupCtrl.showResendEmailPopup = showResendEmailPopup
		emailPopupCtrl.showChangeEmailPopup = showChangeEmailPopup
		emailPopupCtrl.showConfirmEmailPopup = showConfirmEmailPopup
		emailPopupCtrl.isDisabledBtn = false
		emailPopupCtrl.user = {newEmail: ''}
		emailPopupCtrl.isEmailResent = false
		emailPopupCtrl.isEmailChanged = false
		emailPopupCtrl.isMobileScreen = globalParams.isMobileScreen

		emailPopupCtrl.closePopup = function() {
			var expireDate = new Date()
			expireDate.setMinutes(expireDate.getMinutes() + 30)
			$cookies.put('data-close' + GLOBALS.userInfo.subid, 'closed', {expires: expireDate})
		}

		emailPopupCtrl.resendConfirmation = function() {
			emailPopupCtrl.isDisabledBtn = true
			UsersModel.resendEmail().error(function(result) {
				emailPopupCtrl.errors = result
			})
				.then(function() {
					emailPopupCtrl.errors = null
					emailPopupCtrl.isEmailResent = true
				})
		}

		emailPopupCtrl.changeEmail = function(closePopupOnSuccess) {
			var data = {
				email: emailPopupCtrl.user.newEmail,
			}
			emailPopupCtrl.isDisabledBtn = true
			UsersModel.changeEmail(data).error(function(result) {
				emailPopupCtrl.errors = result
			})
				.then(function() {
					GLOBALS.userInfo.emailCurrentUser = emailPopupCtrl.user.newEmail
					setEmailRelated(emailPopupCtrl.user.newEmail)
					emailPopupCtrl.errors = null
					emailPopupCtrl.isEmailChanged = true

					if (closePopupOnSuccess) {
						$modalInstance.close()
						emailPopupCtrl.closePopup()
					}
				})
		}

		emailPopupCtrl.resetForm = function() {
			emailPopupCtrl.isDisabledBtn = false
			emailPopupCtrl.errors = null
		}

		emailPopupCtrl.showMoreInfo = function(e) {
			var el = $(e.currentTarget)
			el.toggleClass('folded')
			el.next('p').toggleClass('ng-hide')
		}
	})

