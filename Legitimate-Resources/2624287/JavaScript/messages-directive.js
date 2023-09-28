angular.module('dating.directives.messages', [
		'dating.models.messages',
		'dating.models.profiles',
	])
	.controller('MessagesListCtrl', function($sce, $modal, $window, $state, MessagesModel, ProfilesModel, BlockUserDialog, GLOBALS, authService, EventsModel, $rootScope, $scope, monetizationHook) {
		var messages = [],
			messagesListCtrl = this
		messagesListCtrl.messagesCurrentPage = -1
		messagesListCtrl.siteName = GLOBALS.siteName
		messagesListCtrl.supportEmail = GLOBALS.supportEmail
		messagesListCtrl.showMessagesConfirmBox = showMessagesConfirmBox
		messagesListCtrl.isLoggedIn = authService.isAuthenticated
		messagesListCtrl.currentUser = authService.currentUser
		messagesListCtrl.externalUpgradeUrl = messagesListCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		messagesListCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? messagesListCtrl.externalUpgradeUrl : '/billing/upgrade'
		messagesListCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		messagesListCtrl.themePath = GLOBALS.baseUrl
		messagesListCtrl.showBbrPhoneNumberPopup = GLOBALS.showBbrPoneNumber && authService.currentUser.phone === ''
		messagesListCtrl.isPremiumUser = messagesListCtrl.currentUser.membership === 'premium'
		messagesListCtrl.customFlowCredits = GLOBALS.customFlowCredits
		messagesListCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)
		messagesListCtrl.monetizationOptions = GLOBALS.monetizationOptions
		messagesListCtrl.monetizationHook = monetizationHook

		function showMessagesConfirmBox() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.directives.messages_confirm_box,
				controller: 'ShowMessagesConfirmBoxController as showMessagesConfirmBoxController',
				size: 'messagesConfirmBoxPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {},
			})
		}

		function showSharingConfirmBox() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.directives.sharing_confirm_box,
				size: 'sharingConfirmBoxPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {},
			})
		}
		// when user starts to type phone number popup is displayed
		function handleUserType() {
			messagesListCtrl.emptyMessage = null
			if (messagesListCtrl.showBbrPhoneNumberPopup) {
				if (['xmeeting'].indexOf(GLOBALS.parentSite) !== -1) {
					$('#message-area').on( 'keyup', function() {
						if ($('#addPhoneNumberPopup').hasClass('sendLikeBBRPopup')) {
							$('#addPhoneNumberPopup').removeClass('sendLikeBBRPopup')
						}
						$('#addPhoneNumberPopup').addClass('sendMessageBBRPopup')
						$('#addPhoneNumberPopup').show()

						$('#addPhoneNumberPopup .cancelBtn').on('click touchstart', function() {
							$('#addPhoneNumberPopup').hide()
							$('#addPhoneNumberPopup').removeClass('sendLikeBBRPopup sendMessageBBRPopup')
							$('#EditSettingsForm_phone').val('')
							return false
						})
					})
				}
			}
		}

		function sendMessage(receiverId) {
			if (!messagesListCtrl.newMessage || !messagesListCtrl.newMessage.content) {
				messagesListCtrl.emptyMessage = true
			} else {
				messagesListCtrl.disableBtnSend = true
				messagesListCtrl.newMessage.receiverId = messagesListCtrl.receiverId || receiverId

				if (messagesListCtrl.receiverId) {
					//it's sending messages via view profile page
					if (GLOBALS.isViewingSocialMediaLp && messagesListCtrl.currentUser.membership !== 'premium') {
						MessagesModel.logMessageAttempt(messagesListCtrl.receiverId)
						window.location.href = messagesListCtrl.upgradeUrl
					} else {
						MessagesModel.sendMessage(messagesListCtrl.newMessage).then(function(result) {
							if (!result.data.canSendMessages) {
								window.location.href = messagesListCtrl.upgradeUrl
							}
							messagesListCtrl.newMessage.content = ''
							messagesListCtrl.disableBtnSend = false
							if (result.data.messages) {
								messagesListCtrl.messages = result.data.messages.concat(messagesListCtrl.messages)
							}
						}).catch(function(result) {
							if (result.data && result.data.status == 'redirect') {
								if (window.CONFIG && window.CONFIG.actions && typeof window.CONFIG.actions.clearCache === 'function' ) {
									window.CONFIG.actions.clearCache()
								}
								if (parseInt(GLOBALS.isExternalUpgradeSite)) {
									window.location.href = messagesListCtrl.externalUpgradeUrl
								} else {
									window.location.href = result.data.message
								}
							}
						})
					}
				} else {
					MessagesModel.sendMessage(messagesListCtrl.newMessage).then(function() {
						messagesListCtrl.newMessage.content = ''
						messagesListCtrl.messages = []
						messagesListCtrl.messagesCurrentPage = -1
						messagesListCtrl.disableBtnSend = false
						loadMessages()
					})
				}
			}
		}

		function sendReplyMessage(message) {
			if (messagesListCtrl.currentUser.canSendMessages) {
				message.newMessage.receiverId = message.externalId
				message.isSending = true
				MessagesModel.sendMessage(message.newMessage).then(function() {
					message.messageSent = true
					message.showReplyForm = GLOBALS.showReplyFormInMessages > 0;
					message.newMessage.content = ''
					message.isSending = false
				})
			} else {
				MessagesModel.logMessageAttempt(message.externalId)
				window.location.href = messagesListCtrl.upgradeUrl
			}
		}

		function toggleShowReplyForm(message) {
			message.showReplyForm=!message.showReplyForm
			if (message.showReplyForm) {
				message.messageSent = false
			}
		}

		function deleteMessage(messageId, $message) {
			MessagesModel.deleteMessage(messageId).then(function() {
				$message.hide()
			})
		}
		function blockSender(message) {
			BlockUserDialog.open(message.externalId).then(function() {
				messagesListCtrl.deleteMessage(message.messageId, $('#message-cnt' + message.messageId))
			})
		}
		function loadMessages($el, iOverwriteLoadCount) {
			messagesListCtrl.isLoading = true
			var lastMessageId = messagesListCtrl.messages.length ? messagesListCtrl.messages[messagesListCtrl.messages.length - 1].messageId : undefined
			messagesListCtrl.pageChanged = function() {
				messagesListCtrl.isLoading = true
				MessagesModel.getMessages(messagesListCtrl.messagesCurrentPage-1, messagesListCtrl.receiverId, lastMessageId, messagesListCtrl.limitedNumber, iOverwriteLoadCount, messagesListCtrl.onlyPhotoRequest).then(function(result) {
					setMessagesInPage(result)
				})
			}
			var setMessagesInPage = function(result) {
				messagesListCtrl.nTotalMessages = result.nTotalMessages
				var disableLoadMore = function() {
					if ($el) {
						$el.attr('disabled', true).addClass('disabled').off('click')
						$el.find('.text').text($el.attr('data-no-messages') ? $el.attr('data-no-messages') : 'No more messages')
					}
				}
				messagesListCtrl.currentUser.canSendMessages = result.canSendMessages
				if (result.nTotalMessages <= result.messages.length) {
					messagesListCtrl.showLoadMore = false
				} else {
					if (!messagesListCtrl.limitedNumber) {
						messagesListCtrl.showLoadMore = true
					}
				}
				if (result.messages.length) {
					var tempMessages = result.messages
					if (messagesListCtrl.limitedNumber && (result.messages.length > messagesListCtrl.limitedNumber)) {
						tempMessages.length = messagesListCtrl.limitedNumber
					}
					for (var i = 0; i < tempMessages.length; i++) {
						tempMessages[i].messageText = $sce.trustAsHtml(tempMessages[i].messageText)
					}
					messagesListCtrl.messages = messagesListCtrl.messages.concat(tempMessages)
					messagesListCtrl.messagesCurrentPage++
					if (result.hideLoadMore) {
						disableLoadMore($el)
					}
				} else {
					disableLoadMore($el)
				}
				messagesListCtrl.isLoading = false
			}

			if (messagesListCtrl.showSentMessages) {
				MessagesModel.getSentMessages(messagesListCtrl.messagesCurrentPage + 1).then(function(result) {
					setMessagesInPage(result)
				})
			} else {
				MessagesModel.getMessages(messagesListCtrl.messagesCurrentPage + 1, messagesListCtrl.receiverId, lastMessageId, messagesListCtrl.limitedNumber, iOverwriteLoadCount, messagesListCtrl.onlyPhotoRequest).then(function(result) {
					setMessagesInPage(result)
				})
			}
		}


		function loadMessagesQM($el, iOverwriteLoadCount) {
			messagesListCtrl.isLoading = true
			var lastMessageId = messagesListCtrl.messages.length ? messagesListCtrl.messages[messagesListCtrl.messages.length - 1].messageId : undefined
			var setMessagesInPage = function(result) {
				var disableLoadMore = function() {
					if ($el) {
						$el.attr('disabled', true).addClass('disabled').off('click')
						$el.find('.text').text($el.attr('data-no-messages') ? $el.attr('data-no-messages') : 'No more messages')
					}
				}
				messagesListCtrl.currentUser.canSendMessages = result.canSendMessages
				if (result.nTotalMessages <= result.messages.length) {
					messagesListCtrl.showLoadMore = false
				} else {
					if (!messagesListCtrl.limitedNumber) {
						messagesListCtrl.showLoadMore = true
					}
				}
				if (result.messages.length) {
					var tempMessages = result.messages
					if (messagesListCtrl.limitedNumber && (result.messages.length > messagesListCtrl.limitedNumber)) {
						tempMessages.length = messagesListCtrl.limitedNumber
					}
					for (var i = 0; i < tempMessages.length; i++) {
						tempMessages[i].messageText = $sce.trustAsHtml(tempMessages[i].messageText)
					}
					messagesListCtrl.messages = messagesListCtrl.messages.concat(tempMessages)
					messagesListCtrl.messagesCurrentPage++
					if (result.hideLoadMore) {
						disableLoadMore($el)
					}
				} else {
					disableLoadMore($el)
				}
				messagesListCtrl.isLoading = false
			}
			var page = messagesListCtrl.messagesCurrentPage + 1
			var limitedNumber = messagesListCtrl.limitedNumber
			setTimeout(function() {
				MessagesModel.getMessages(page, null, lastMessageId, limitedNumber, iOverwriteLoadCount).then(function(result) {
					setMessagesInPage(result)
				})
			}, 700)
		}
		messagesListCtrl.sendMessage = sendMessage
		messagesListCtrl.sendReplyMessage =  sendReplyMessage
		messagesListCtrl.toggleShowReplyForm = toggleShowReplyForm
		messagesListCtrl.deleteMessage = deleteMessage
		messagesListCtrl.blockSender = blockSender
		messagesListCtrl.loadMessages = loadMessages
		messagesListCtrl.loadMessagesQM = loadMessagesQM
		messagesListCtrl.handleUserType = handleUserType
		messagesListCtrl.messages = messages
		messagesListCtrl.isLoading = true
		messagesListCtrl.maxMessageChars = GLOBALS.maxMessageChars
		messagesListCtrl.showReplyForm = false
		messagesListCtrl.conversationsDisplayed = []
		messagesListCtrl.newMessages = {}
		messagesListCtrl.systemMessageTypes = ['1', '2', '3']
		messagesListCtrl.clearSendMessage = function(index) {
			delete messagesListCtrl.newMessages[index]
		}

		messagesListCtrl.markAsRead = function(profileId) {
			ProfilesModel.getProfile(profileId)
			$rootScope.$broadcast('clear_messages')
		}

		var conversationIndex

		messagesListCtrl.displayConversation = function(index, shouldDisplay) {
			conversationIndex = index
			if (shouldDisplay) {
				if (messagesListCtrl.conversationsDisplayed.indexOf(index) > -1) {
					var element = messagesListCtrl.conversationsDisplayed.indexOf(index)
					messagesListCtrl.conversationsDisplayed.splice(element, 1)
				} else {
					messagesListCtrl.conversationsDisplayed.push(index)
				}
			}
		}

		messagesListCtrl.shouldShowConversation = function(index) {
			return (messagesListCtrl.conversationsDisplayed.indexOf(index) > -1)
		}

		$scope.$on('$sharedPrivatePhotosConversation', function(event, data) {
			if (messagesListCtrl.messages[conversationIndex]) {
				messagesListCtrl.messages[conversationIndex].privatePhotosShared = true
				messagesListCtrl.sharePrivatePhotos(data.senderId, data.privatePhotosShared, data.goProfile, conversationIndex)
			}
		})

		$scope.$on('sign-out:success', function() {
			messagesListCtrl.isLoggedIn = false
			messagesListCtrl.currentUser = null
		})

		messagesListCtrl.sharePrivatePhotos = function(senderId, privatePhotosShared, goProfile) {
			if (privatePhotosShared) {
				showSharingConfirmBox()
			} else {
				var data = {senderId: senderId}
				ProfilesModel.togglePrivatePhotoAccess(data).then(function() {
					if (goProfile) {
						messagesListCtrl.redirectToProfile(senderId)
					} else {
						$window.location.reload()
					}
				})
			}
		}

		messagesListCtrl.redirectToProfile = function(id) {
			$state.go('dating.pages.viewProfile', {
				id: id,
			})
		}

		messagesListCtrl.openConversation = function(externalId, receiverId) {
			if (typeof receiverId == 'undefined') {
				$state.go('dating.pages.userConversation', {id: externalId})
			} else if ($state.current.name != 'dating.pages.viewProfile') {
				$state.go('dating.pages.viewProfile', {id: externalId})
			}
		}

		messagesListCtrl.toggleEmoticons = function() {
			$('#emoticonsList').toggle()
		}

		$('.emoticon', '#emoticonsList').hover(
			function() {
				var titleEmoticon = $(this).attr('title')
				$('#emoticonShortcut').text(titleEmoticon)
			},
			function() {
				$('#emoticonShortcut').text('')
			}
		)

		$('.emoticon', '#emoticonsList').on('click', function() {
			if (messagesListCtrl.newMessage == undefined) {
				messagesListCtrl.newMessage = new Object()
			}
			var titleEmoticon = $(this).attr('title')
			var sendMessageText = $('#newMessageText').val() + ' ' + titleEmoticon + ' '
			$('#newMessageText').val(sendMessageText)
			messagesListCtrl.newMessage.content = sendMessageText
			$('#emoticonsList').hide()
			$('#newMessageText').focus()
			$('#btnSend').removeAttr('disabled')
		})

		$scope.$on('loadMessages', function() {
			messagesListCtrl.messages = []
			messagesListCtrl.messagesCurrentPage = -1
			messagesListCtrl.loadMessages()
		})
	})


	.controller('ShowMessagesConfirmBoxController', function() {
		var showMessagesConfirmBoxController = this
		showMessagesConfirmBoxController.isMobile = false
	})
	.directive('messages', function() {
		var mobileSlug = (globalParams.isMobileScreen ? '-mobile' : '')
		return {
			restrict: 'E',
			controller: 'MessagesListCtrl',
			controllerAs: 'messagesListCtrl',
			bindToController: true,
			scope: {
				showAddForm: '@showAddForm',
				showEmoticons: '@showEmoticons',
				placeholder: '@placeholder',
				showLoadMore: '@showLoadMore',
				textLoadMore: '@textLoadMore',
				textNoMessages: '@textNoMessages',
				textEmptyList: '@textEmptyList',
				textSendButton: '@textSendButton',
				textReadMessage: '@textReadMessage',
				showCharsLeft: '@showCharsLeft',
				showReadMessage: '@showReadMessage',
				showDelete: '@showDelete',
				showBlock: '@showBlock',
				showReply: '@showReply',
				receiverId: '@receiverId',
				showSentMessages: '@showSentMessages',
				goOver: '@goOver',
				goProfile: '@goProfile',
				reloadMessages: '@reloadMessages',
				limitedNumber: '@limitedNumber',
				isViewProfile: '@isViewProfile',
				calledFrom: '@calledFrom',
				hidePagination: '@hidePagination',
				onlyPhotoRequest: '@onlyPhotoRequest',
			},
			templateUrl: globalParams.templateUrls.directives['messages' + mobileSlug],
			link: function(scope, element, attr, messagesListCtrl) {
				$(element).on('click', '#load-more-messages-btn', function(ev) {
					messagesListCtrl.loadMessages($(ev.currentTarget))
				})
				$(element).on('click', '.delete-message', function(ev) {
					ev.preventDefault()
					var $el = $(ev.currentTarget)
					messagesListCtrl.deleteMessage($el.data('id'), $el.parents('.message-cnt:first'))
				})
				$(element).on('mouseenter', '.goOver', function(ev) {
					var $el = $(ev.currentTarget)
					$el.addClass('over')
				})
				$(element).on('mouseleave', '.goOver', function(ev) {
					var $el = $(ev.currentTarget)
					$el.removeClass('over')
				})
				$(element).on('click', '.goProfile', function(ev) {
					var $el = $(ev.currentTarget)
					messagesListCtrl.redirectToProfile($el.data('id'))
				})

				if (messagesListCtrl.currentUser) {
					messagesListCtrl.loadMessages()
				}
				attr.$observe('reloadMessages', function(value) {
					if (value > 0) {
						messagesListCtrl.messages = []
						messagesListCtrl.messagesCurrentPage = -1
						messagesListCtrl.loadMessages()
					}
				})
			},
		}
	})

