angular.module('newMessagesAlert', [
		'dating.models.messages',
		'dating.models.profiles',
		'ui.bootstrap',
	])
	.service('showNewMessagesAlert', function($modal, $modalStack, MessagesModel, authService, $window, GLOBALS) {
		var showAlert = function(alertData) {
			var mobileSlug = (globalParams.isMobileScreen ? '-mobile' : '')
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.alerts['new_messages_alert' + mobileSlug],
				controller: 'NewMessagesAlertCtrl as newMessagesAlertCtrl',
				size: 'newMessagePopup',
				keyboard: true,
				backdrop: 'static',
				animation: false,
				resolve: {
					alertData: function() {
						return alertData
					},
				},
			})
			$modalStack.dismiss()
		}

		var showNewMessagesAlert = function() {
			if (authService.isAuthenticated) {
				var showNewMessagesPopupAlert = $window.localStorage.getItem('showNewMessagesPopupAlert' + GLOBALS.userInfo.subid)
				if (showNewMessagesPopupAlert == 'false') {
					$window.localStorage.setItem('showNewMessagesPopupAlert' + GLOBALS.userInfo.subid, false)
					return
				}
				$window.localStorage.setItem('showNewMessagesPopupAlert' + GLOBALS.userInfo.subid, true)
				MessagesModel.getUnread().then(function(result) {
					if (GLOBALS.user.showOneClickBox != 1 && result.data.totalUnreadMessages > 0 && !parseInt(GLOBALS.user.justRegistered) && !parseInt(GLOBALS.user.emailJustBecameInvalid) && !GLOBALS.user.bResetPassword && !GLOBALS.user.showUploadPhotoDescriptionBox) {
						showAlert(result.data)
					}
				})
			}
		}
		return showNewMessagesAlert
	})
	.controller('NewMessagesAlertCtrl', function($scope, $modalInstance, alertData, ProfilesModel, ProfileData, MessagesModel, EventsModel, $window, GLOBALS) {
		var newMessagesAlertCtrl = this

		newMessagesAlertCtrl.isMobile = window.globalParams.isMobileScreen
		newMessagesAlertCtrl.canShowLink = false
		newMessagesAlertCtrl.totalUnreadMessages = alertData.totalUnreadMessages
		if (alertData.totalUnreadMessages > 0 && alertData.lastMessageProfileExternalId) {
			ProfilesModel.getProfile(alertData.lastMessageProfileExternalId).then(function(result) {
				newMessagesAlertCtrl.profile = new ProfileData(result)
				newMessagesAlertCtrl.canShowLink = true
			})
		}
		newMessagesAlertCtrl.closeNewMessagePopup = function() {
			$window.localStorage.setItem('showNewMessagesPopupAlert' + GLOBALS.userInfo.subid, false)
		}
		newMessagesAlertCtrl.markAsRead = function() {
			MessagesModel.markAsRead().then(function() {
			})
		}
	})

