angular.module('dating.interceptors.pageRender', [
	])
	.factory('pageRenderInterceptor', function($q, $location) {
		return {
			response: function(response) {
				if (response.headers('X-Page-Render') === 'FullPageAd') {
					$location.path('/fullPageAd')
				}
				return response || $q.when(response)
			},
			responseError: function(rejection) {
				return $q.reject(rejection)
			},
		}
	})

