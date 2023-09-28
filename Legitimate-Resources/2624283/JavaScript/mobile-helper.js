angular.module('dating.helpers.mobile', [])
	.service('MobileHelper', function() {
		var helper = this

		helper.isMobileScreen = function() {
			return $('body').width() <= 768
		}

		helper.hasMobileFlag = function() {
			return $('body').hasClass('mobile-screen')
		}

		helper.setMobileFlag = function() {
			$('body').toggleClass('mobile-screen', helper.isMobileScreen() && !helper.hasMobileFlag())
			window.globalParams.isMobileScreen = helper.isMobileScreen()
		}

		var onResize = function() {
			return $(window).unbind('resize') && (window.location.href = '/')
		}

		helper.watchScreenSize = function() {
			$(window).on('resize', function() {
				if (helper.isMobileScreen() && !helper.hasMobileFlag()) {
					return onResize()
				}
				if (!helper.isMobileScreen() && helper.hasMobileFlag()) {
					return onResize()
				}
			})
		}
	})

