angular.module('dating.models.pages', [
	])
	.service('PagesModel', function($http, $rootScope, GLOBALS) {
		var model = this,
			currentPage,
			URLS = {
				GET_SIGN_OUT: '/site/signout',
				GET_FULL_PAGE: '/site/fullPageAd',
				GET_REG_OFFER_ONE: '/site/regOfferOne',
				GET_EMAIL_OFFER: '/site/emailOffer',
				GET_UN_SUBSCRIBE: '/unsubscribe/index',
				POST_SEP_UNSUBSCRIBE: '/unsubscribe/separateUnsubscribe',
				POST_RE_SUBSCRIBE: '/unsubscribe/resubscribe',
				POST_PRIVACY_FORM: '/site/processMailToPrivacyRequest',
				CURRENT_CREDITS_INFO: '/profile/currentCreditsInfo',
				GET_MONETIZATION_CHECK: '/ad/monetisationUrl',
			}
		model.setCurrentPage = function(page) {
			currentPage = page
			var classes = $('body').attr('class') ?  $('body').attr('class').split(' ') : []
			$.each(classes, function() {
				if (this.match(/Page$/)) {
					$('body').removeClass(this.toString())
				}
			})
			$('body').addClass(currentPage + 'Page' + (GLOBALS.i18nDefaultLang ? ' ' + GLOBALS.i18nDefaultLang : ''))
			$.fancybox.close()
		}
		function extractData(result) {
			return result.data
		}
		model.getCurrentPage = function() {
			return currentPage
		}
		model.isCurrentPage = function(page) {
			return page === currentPage
		}
		model.signOut = function() {
			return $http.get(URLS.GET_SIGN_OUT)
		}
		model.fullPage = function(monetizationFlag) {
			return $http.get(URLS.GET_FULL_PAGE, {headers: {}, params: {monetisationFlag: monetizationFlag}})
		}
		model.regOfferOne = function() {
			return $http.get(URLS.GET_REG_OFFER_ONE)
		}
		model.emailOffer = function() {
			return $http.get(URLS.GET_EMAIL_OFFER)
		}
		model.unSubscribe = function(data) {
			return $http.get(URLS.GET_UN_SUBSCRIBE, {headers: {}, params: data})
		}
		model.separateUnsubscribe = function(data) {
			return $http.post(URLS.POST_SEP_UNSUBSCRIBE, data)
		}
		model.reSubscribe = function(data) {
			return $http.post(URLS.POST_RE_SUBSCRIBE, data)
		}
		model.sendFormForUser = function(data) {
			return $http.post(URLS.POST_PRIVACY_FORM, data)
		}
		model.currentCreditsInfo = function() {
			return $http.get(URLS.CURRENT_CREDITS_INFO);
		}
		model.monetizationCheck = function(id) {
			return $http.get(URLS.GET_MONETIZATION_CHECK, {headers: {}, params: {monetisationOptionId : id}})
		}
	})

