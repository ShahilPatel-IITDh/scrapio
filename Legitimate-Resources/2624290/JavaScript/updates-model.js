angular.module('dating.models.updates', [
	])
	.service('UpdatesModel', function($http, $q) {
		var model = this,
			URLS = {
				POST_GET_UPDATES: '/userUpdate/moreUpdatesDashboard',
				POST_UPDATE: '/userUpdate/add',
				POST_DELETE_UPDATE: '/userUpdate/delete',
			}

		function extractUpdates(result) {
			return result.data
		}

		model.getUpdates = function(page, targetId, count) {
			return $http.post(URLS.POST_GET_UPDATES, {page: page, targetId: targetId, count: count}).then(extractUpdates)
		}

		model.sendUpdate = function(update) {
			return $http.post(URLS.POST_UPDATE, update)
		}

		model.deleteUpdate = function(updateId) {
			return $http.post(URLS.POST_DELETE_UPDATE, {updateId: updateId})
		}

	})

