angular.module('dating.directives.featured', [
	'dating.models.featured',
])
	.controller('FeaturedCtrl', function($sce, $scope, FeaturedModel, MessagesModel, ProfilesModel, authService, GLOBALS) {
		var profiles = [],
			FeaturedCtrl = this,
			profilesCount = parseInt(FeaturedCtrl.count)

		function loadFeaturedProfiles() {
			FeaturedCtrl.isLoading = true
			FeaturedModel.getFeaturedProfiles(FeaturedCtrl.profilesCount).then(function(result) {
				if (result.profiles) {
					FeaturedCtrl.profiles = result.profiles
				}
				FeaturedCtrl.isLoading = false
			})
		}

		FeaturedCtrl.sendMatch = function(id, type, username) {
			ProfilesModel.sendMatch(id, type).then(function() {
				_.each(FeaturedCtrl.profiles, function(value) {
					if (value.username == username) {
						value.matchStatus = type == 'accept' ? 'match' : 'youLiked'
					}
				})
			})
		}

		FeaturedCtrl.sendPhotoRequest = function(id, username) {
			var data = {userId: id}
			_.each(FeaturedCtrl.profiles, function(value) {
				if (value.username == username) {
					value.isPhotoRequestDisabled = true
				}
			})
			ProfilesModel.sendPhotoRequest(data).then(function() {
				_.each(FeaturedCtrl.profiles, function(value) {
					if (value.username == username) {
						value.bCanRequestPhoto = false
						value.isPhotoRequestDisabled = false
					}
				})
			})
		}

		FeaturedCtrl.loadFeaturedProfiles = loadFeaturedProfiles
		FeaturedCtrl.profilesCount = profilesCount
		FeaturedCtrl.profiles = profiles
		FeaturedCtrl.sendMessage = sendMessage
		FeaturedCtrl.isLoggedIn = authService.isAuthenticated
		FeaturedCtrl.currentUser = authService.currentUser
		FeaturedCtrl.isFeatured = authService.currentUser.isFeatured
		var externalUpgradeUrl = FeaturedCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		FeaturedCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? externalUpgradeUrl : '/billing/upgrade'

		function sendMessage(activity) {
			if (!activity.newMessage || !activity.newMessage.content) {
				activity.emptyMessage = true
			} else if (FeaturedCtrl.currentUser.canSendMessages) {
				activity.newMessage.receiverId = activity.profileId
				activity.isSending = true
				MessagesModel.sendMessage(activity.newMessage).then(function() {
					activity.isSending = false
					activity.newMessage.content = ''
					activity.sendMessageFeedback = $sce.trustAsHtml('Message sent. View conversation history <a href=\''+ '/profile/view/id/' + activity.newMessage.receiverId + '\'>here</a>')
				})
			} else {
				MessagesModel.logMessageAttempt(activity.profileId)
				window.location.href = FeaturedCtrl.upgradeUrl
			}
		}

		$scope.$on('sign-out:success', function() {
			FeaturedCtrl.isLoggedIn = false
			FeaturedCtrl.currentUser = null
		})
	})
	.directive('featured', function() {
		return {
			restrict: 'E',
			controller: 'FeaturedCtrl',
			controllerAs: 'featuredCtrl',
			bindToController: true,
			scope: {
				count: '@count',
				textNoActivity: '@textNoActivity',
			},
			templateUrl: globalParams.templateUrls.directives.featured,
			link: function(scope, element, attr, FeaturedCtrl) {
				FeaturedCtrl.loadFeaturedProfiles()
			},
		}
	})

