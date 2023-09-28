angular.module('dating.directives.activity', [
		'dating.models.activity',
	])
	.controller('ActivityCtrl', function($sce, $scope, ActivityModel, MessagesModel, ProfilesModel, authService, GLOBALS, $rootScope, monetizationHook) {
		var activityCurrentPage = -1,
			activityCtrl = this,
			profilesPerPage = parseInt(activityCtrl.count) || 8
			activityCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
			activityCtrl.monetizationOptions = GLOBALS.monetizationOptions
			activityCtrl.monetizationHook = monetizationHook

		function loadActivity($el) {
			activityCtrl.isLoading = true
			ActivityModel.getActivity(activityCurrentPage + 1, activityCtrl.profilesPerPage).then(function(result) {
				if (result.length) {
					activityCtrl.activity = activityCtrl.activity.concat(result)
					activityCurrentPage++
				} else {
					if ($el) {
						$el.attr('disabled', true).addClass('disabled').off('click')
						$el.find('.text').text($el.attr('data-no-activity') ? $el.attr('data-no-activity') : 'No more activity')
					}
				}
				activityCtrl.isLoading = false
			})
		}

		activityCtrl.sendMatch = function(id, type, username) {
			ProfilesModel.sendMatch(id, type).then(function() {
				_.each(activityCtrl.activity, function(value) {
					if (value.username == username) {
						value.matchStatus = type == 'accept' ? 'match' : 'youLiked'
					}
				})
			})
		}

		activityCtrl.sendPhotoRequest = function(id, username) {
			var data = {userId: id}
			_.each(activityCtrl.activity, function(value) {
				if (value.username === username) {
					value.isPhotoRequestDisabled = true
				}
			})
			ProfilesModel.sendPhotoRequest(data).then(function() {
				_.each(activityCtrl.activity, function(value) {
					if (value.username === username) {
						value.bCanRequestPhoto = false
						value.isPhotoRequestDisabled = false
					}
				})
			})
		}

		activityCtrl.loadActivity = loadActivity
		activityCtrl.profilesPerPage = profilesPerPage
		activityCtrl.activity = []
		activityCtrl.currentUser = authService.currentUser
		activityCtrl.sendMessage = sendMessage
		activityCtrl.isLoggedIn = authService.isAuthenticated
		var externalUpgradeUrl = activityCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		activityCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? externalUpgradeUrl : '/billing/upgrade'
		activityCtrl.isPremiumUser = activityCtrl.isLoggedIn ? activityCtrl.currentUser.membership === 'premium' : false
		activityCtrl.customFlowCredits = GLOBALS.customFlowCredits
		activityCtrl.featureToggles = GLOBALS.featureToggles
		activityCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile

		function sendMessage(activity) {
			if (!activity.newMessage || !activity.newMessage.content) {
				activity.emptyMessage = true
			} else if (activityCtrl.currentUser.canSendMessages) {
				activity.newMessage.receiverId = activity.profileId
				activity.isSending = true
				MessagesModel.sendMessage(activity.newMessage).then(function() {
					activity.isSending = false
					activity.newMessage.content = ''
					activity.sendMessageFeedback = $sce.trustAsHtml('Message sent. View conversation history <a href=\''+ '/profile/view/id/' + activity.newMessage.receiverId + '\'>here</a>')
				})
			} else {
				MessagesModel.logMessageAttempt(activity.profileId)
				window.location.href = activityCtrl.upgradeUrl
			}
		}

		if (+activityCtrl.featureToggles.exoClickAdsRefresh) {
			activityCtrl.onClickRefreshExoFooterAds = function() {
				$rootScope.$broadcast('refreshBanners')
			}
		}

		$scope.$on('sign-out:success', function() {
			activityCtrl.isLoggedIn = false
			activityCtrl.currentUser = null
		})
	})
	.directive('activity', function() {
		return {
			restrict: 'E',
			controller: 'ActivityCtrl',
			controllerAs: 'activityCtrl',
			bindToController: true,
			scope: {
				count: '@count',
				showLoadMore: '@showLoadMore',
				textLoadMore: '@textLoadMore',
				textNoActivity: '@textNoActivity',
			},
			templateUrl: globalParams.templateUrls.directives.activity,
			link: function(scope, element, attr, activityCtrl) {
				$(element).on('click', '#load-more-activity-btn', function(ev) {
					ev.stopPropagation()
					activityCtrl.loadActivity($(ev.currentTarget))
				})
				activityCtrl.loadActivity()
			},
		}
	})

