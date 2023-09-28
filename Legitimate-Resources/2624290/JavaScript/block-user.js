angular.module('dating.helpers.blockUser', [])
	.service('BlockUserDialog', function($q, $modal) {
		var BlockUserDialog = this
		var modalInstance

		BlockUserDialog.open = function(profileId) {
			var deferred = $q.defer()

			modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.helpers.block_user,
				controller: 'BlockUserDialogCtrl as blockUserDialogCtrl',
				size: 'blockPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					profileId: function() {
						return profileId
					},

					deferred: function() {
						return deferred
					},
				},
			})

			return deferred.promise.finally(function() {
				modalInstance.close()
			})
		}

		BlockUserDialog.close = function() {
			modalInstance.close()
		}

		return BlockUserDialog
	})
	.controller('BlockUserDialogCtrl', function($state, $modalInstance, ProfilesModel, profileId, deferred) {
		var blockUserDialogCtrl = this

		blockUserDialogCtrl.blockUser = function() {
			ProfilesModel.block(profileId).then(function(result) {
				deferred.resolve(result)
			})
		}

		blockUserDialogCtrl.close = function() {
			deferred.reject()
		}
	})
