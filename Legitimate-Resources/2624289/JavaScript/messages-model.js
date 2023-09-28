angular.module('dating.models.messages', [
	])
	.service('MessagesModel', function($http, $q, GLOBALS) {
		var model = this,
			URLS = {
				POST_GET_MESSAGES: '/message/index',
				POST_MESSAGE: '/message/sendMagicMessage',
				POST_DELETE_MESSAGE: '/message/hide',
				GET_UNREAD_MESSAGES: '/message/unread',
				POST_MARK_AS_READ: '/message/markAsRead',
				POST_MESSAGE_ATTEMPT: '/message/logMessageAttempt',
			}

		function extractMessages(result) {
			return result.data
		}

		function extractMessagesNumber(result) {
			return result.data.nTotalMessages
		}

		model.getMessages = function(page, receiverId, lastMessageId, limitedNumber, iOverwriteLoadCount, onlyPhotoRequest) {
			var data = {
				page: page,
				receiverId: receiverId,
				lastMessageId: lastMessageId,
				limitedNumber: limitedNumber,
				iOverwriteLoadCount: iOverwriteLoadCount,
				onlyPhotoRequest: onlyPhotoRequest,
			}
			return $http.post(URLS.POST_GET_MESSAGES, data).then(extractMessages)
		}

		model.getSentMessages = function(page) {
			var data = {page: page, showSentMessages: 1}
			return $http.post(URLS.POST_GET_MESSAGES, data).then(extractMessages)
		}

		model.getMessagesNumber = function() {
			var data = {showMessagesNumber: 1}
			return $http.post(URLS.POST_GET_MESSAGES, data).then(extractMessagesNumber)
		}

		model.getSentMessagesNumber = function() {
			var data = {showMessagesNumber: 1, showSentMessages: 1}
			return $http.post(URLS.POST_GET_MESSAGES, data).then(extractMessagesNumber)
		}

		model.getUnread = function() {
			return $http.get(URLS.GET_UNREAD_MESSAGES)
		}

		model.sendMessage = function(message) {
			return $http.post(URLS.POST_MESSAGE, message)
		}

		model.deleteMessage = function(messageId) {
			return $http.post(URLS.POST_DELETE_MESSAGE, {messageId: messageId})
		}

		model.markAsRead = function() {
			return $http.post(URLS.POST_MARK_AS_READ)
		}

		model.logMessageAttempt = function(receiverId) {
			return $http.post(URLS.POST_MESSAGE_ATTEMPT, {receiverId: receiverId})
		}
	})

