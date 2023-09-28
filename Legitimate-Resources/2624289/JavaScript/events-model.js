angular.module('dating.models.events', [
	])
	.service('EventsModel', function($http, $q) {
		var model = this,
			URLS = {
				events: {
					updateViewedYouTabTime: '/event/updateViewedYouTabTime',
					updateLastViewedRequestsTab: '/event/updateLastViewedRequestsTab',
					updateLastViewedMessagesTab: '/event/updateLastViewedMessagesTab',
					updateLastViewedMatchesTab: '/event/updateLastViewedMatchesTab',
					removeRegistrationUploadNotice: '/event/removeRegistrationUploadNotice',
					removeSafeModeNotice: '/event/removeSafeModeNotice',
					setLastViewedUser: '/event/setLastViewedUser',
					updateLastViewedOneclickPopupOnExit: '/event/updateLastViewedOneclickPopupOnExit',
				},
				POST_ADD_REBILL_NOTIFICATION: '/event/addRebillNotification',
				GET_TICKERS: '/event/tickers',
				GET_COMPLETED_INFO: '/event/completedInfo',
				POST_USER_FOCUS: '/event/updateFocus',
			}

		model.sendEvent = function(eventName) {
			return $http.get(URLS.events[eventName])
		}

		model.addRebillNotification = function(enabledRebilling, includeFreeFeatured) {
			return $http.post(URLS.POST_ADD_REBILL_NOTIFICATION, {enabledRebilling: enabledRebilling, includeFreeFeatured: includeFreeFeatured})
		}
		model.updateFocus = function() {
			return $http.post(URLS.POST_USER_FOCUS)
		}
		model.getTickers = function() {
			return $http.get(URLS.GET_TICKERS)
		}
		model.getCompletedInfo = function() {
			return $http.get(URLS.GET_COMPLETED_INFO)
		}
	})

