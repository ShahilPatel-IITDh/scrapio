angular.module('dating.models.featured', [
])
	.service('FeaturedModel', function($http, $q) {
		var model = this,
			URLS = {
				POST_GET_FEATURED_PROFILES: '/featured/list',
			}

		function extractResults(result) {
			return result.data
		}
		model.getFeaturedProfiles = function(count) {
			var url = URLS.POST_GET_FEATURED_PROFILES + '/count/' + count
			return $http.get(url).then(extractResults)
		}
	})

