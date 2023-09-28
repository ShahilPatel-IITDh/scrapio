angular.module('dating.models.track', [
	])
	.service('TrackModel', function($http, $q) {
		var model = this,
			URLS = {
				POST_AD_TRACK: '/ad/trackEvent',
			}

		model.adTrackEvent = function(adType, adEvent, data) {
			data = data || ''
			return $http.post(URLS.POST_AD_TRACK, {adType: adType, adEvent: adEvent, data: data, email: globalParams.userInfo.encodedEmail})
		}
	})

