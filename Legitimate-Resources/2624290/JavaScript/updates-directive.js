angular.module('dating.directives.updates', [
		'dating.models.updates',
	])
	.controller('UpdatesListCtrl', function($scope, UpdatesModel, MessagesModel, GLOBALS, authService, showSignInBox, $rootScope, PagesModel, monetizationHook) {
		var updatesCurrentPage = -1,
			updates = [],
			updatesListCtrl = this
			updatesListCtrl.isLoggedIn = authService.isAuthenticated
			updatesListCtrl.currentUser = authService.currentUser
			updatesListCtrl.isMobile = parseInt(GLOBALS.isMobile)
			updatesListCtrl.updatesPerPage = parseInt(updatesListCtrl.count) || 8
			var externalUpgradeUrl = updatesListCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
			updatesListCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? externalUpgradeUrl : '/billing/upgrade'
		    updatesListCtrl.upgradeUrlAddonForUpdate = GLOBALS.upgradeUrlAddonForUpdate
			updatesListCtrl.isMainstream = GLOBALS.isMainstreamSite
			updatesListCtrl.featureToggles = GLOBALS.featureToggles
			updatesListCtrl.customFlowCredits = GLOBALS.customFlowCredits
			updatesListCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)
			updatesListCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile
			updatesListCtrl.monetizationOptions = GLOBALS.monetizationOptions
			updatesListCtrl.monetizationHook = monetizationHook

		updatesListCtrl.currentPage = 1
		function sendUpdate() {
			if (updatesListCtrl.currentUser.canSendMessages) {
				UpdatesModel.sendUpdate(updatesListCtrl.newUpdate).then(function(result) {
					updatesListCtrl.newUpdate.content = ''
					if (result.data) {
						updatesListCtrl.updates = result.data.concat(updatesListCtrl.updates)
						updatesListCtrl.loadUpdates()
					}
				})
			} else {
				window.location.href = updatesListCtrl.upgradeUrl + '?' + updatesListCtrl.upgradeUrlAddonForUpdate
			}
		}

		function loadUpdates($el) {
			updatesListCtrl.isLoading = true
			UpdatesModel.getUpdates(updatesCurrentPage + 1, updatesListCtrl.targetId, updatesListCtrl.updatesPerPage).then(function(result) {
				updatesListCtrl.isLoading = false
				if (result.length) {
					updatesListCtrl.updates = updatesListCtrl.updates.concat(result)
					updatesCurrentPage++
					updatesListCtrl.currentPage++
				} else {
					if ($el) {
						$el.attr('disabled', true).addClass('disabled').off('click')
						$el.find('.text').text($el.attr('data-no-updates') ? $el.attr('data-no-updates') : 'No more updates')
					}
				}
			})
		}

		function deleteUpdate(updateId, $update) {
			UpdatesModel.deleteUpdate(updateId).then(function() {
				$update.hide()
			})
		}

		function sendMessage(update) {
			if (updatesListCtrl.currentUser.canSendMessages) {
				update.newMessage.receiverId = update.externalId
				update.isSending = true
				MessagesModel.sendMessage(update.newMessage).then(function() {
					update.messageSent = true
					update.isSending = false
					update.newMessage.content = ''
				})
			} else {
				MessagesModel.logMessageAttempt(update.externalId)
				window.location.href = updatesListCtrl.upgradeUrl
			}
		}

		function editMessage(update) {
			if (update.newMessage.content !== '') {
				update.messageSent = false
			}
		}

		if (+updatesListCtrl.featureToggles.exoClickAdsRefresh) {
			updatesListCtrl.onClickRefreshExoFooterAds = function() {
				$rootScope.$broadcast('refreshBanners')
			}
		}

		updatesListCtrl.editMessage = editMessage
		updatesListCtrl.sendMessage = sendMessage
		updatesListCtrl.sendUpdate = sendUpdate
		updatesListCtrl.loadUpdates = loadUpdates
		updatesListCtrl.deleteUpdate = deleteUpdate
		updatesListCtrl.updates = updates
		updatesListCtrl.maxUpdateChars = GLOBALS.maxUpdateChars
		updatesListCtrl.maxMessageChars = GLOBALS.maxMessageChars
		updatesListCtrl.showReplyForm = false
		updatesListCtrl.showSignInBox = showSignInBox
		updatesListCtrl.isSafeMode = authService.isAuthenticated ? !!authService.currentUser.safeMode : true
		updatesListCtrl.showExoclickAds = (authService.isAuthenticated && authService.currentUser.showExoclickAds) ? true : false
		updatesListCtrl.shouldShowUpdatesList = PagesModel.getCurrentPage() != 'Profiles'

		$scope.$on('sign-out:success', function() {
			updatesListCtrl.isLoggedIn = false
			updatesListCtrl.currentUser = null
		})
		$scope.$on("$locationChangeStart", function(){
			updatesListCtrl.shouldShowUpdatesList = PagesModel.getCurrentPage() != 'Profiles'
		})

	})
	.directive('updates', function() {
		var mobileSlug = (globalParams.isMobileScreen ? '-mobile' : '')
		return {
			restrict: 'E',
			controller: 'UpdatesListCtrl',
			controllerAs: 'updatesListCtrl',
			bindToController: true,
			scope: {
				showAddForm: '@showAddForm',
				showLoadMore: '@showLoadMore',
				textLoadMore: '@textLoadMore',
				textNoUpdates: '@textNoUpdates',
				textEmptyList: '@textEmptyList',
				textSendButton: '@textSendButton',
				showCharsLeft: '@showCharsLeft',
				showDelete: '@showDelete',
				showReply: '@showReply',
				showNewImages: '@showNewImages',
				targetId: '@targetId',
			},
			templateUrl: globalParams.templateUrls.directives['updates' + mobileSlug],
			link: function(scope, element, attr, updatesListCtrl) {
				$(element).on('click', '#load-more-updates-btn', function(ev) {
					updatesListCtrl.loadUpdates($(ev.currentTarget))
				})
				$(element).on('click', '.delete-update', function(ev) {
					ev.preventDefault()
					var $el = $(ev.target)
					updatesListCtrl.deleteUpdate($el.data('id'), $el.parents('.update-cnt:first'))
				})
				updatesListCtrl.loadUpdates()
			},
		}
	})

