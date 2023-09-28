angular.module('dating.models.activity', [
	])
	.service('ActivityModel', function($http, $q) {
		var model = this,
			URLS = {
				POST_GET_ACTIVITY: '/activity/index',
			}

		function extractActivity(result) {
			return result.data
		}
		model.getActivity = function(page, count) {
			return $http.post(URLS.POST_GET_ACTIVITY, {page: page, count: count}).then(extractActivity)
		}
	})

