angular.module('pages.messages', [
	'dating.models.pages',
	'dating.models.messages',
	'Dating',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.messages', {
				url: 'messages',
				views: {
					'sections@': {
						controller: 'MessagesCtrl as messagesCtrl',
						templateUrl: globalParams.templateUrls.pages.messages,
					},
				},
			})

	})
	.controller('MessagesCtrl', function($state, PagesModel, MessagesModel, ProfilesModel, GLOBALS, authService, ProfileData) {
		$('html, body').animate({scrollTop: 0}, 50)
		var messagesCtrl = this
		messagesCtrl.isLoggedIn = authService.isAuthenticated
		if (!messagesCtrl.isLoggedIn) {
			$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
		} else {
			messagesCtrl.currentUser = authService.currentUser
			messagesCtrl.isLoading = true
			PagesModel.setCurrentPage('Messages')
			MessagesModel.getMessagesNumber().then(function(result) {
				messagesCtrl.nTotalMessages = parseInt(result)
				messagesCtrl.isLoading = false
			})

			var profileId = authService.currentUser.id
			ProfilesModel.getProfile(profileId).then(function(result) {
				var profile = new ProfileData(result)
				messagesCtrl.nUploadedPhotos = profile.countPhotos() || 0;
			})

			messagesCtrl.isMobile = parseInt(GLOBALS.isMobile)
			messagesCtrl.isMainstream = GLOBALS.isMainstreamSite
			messagesCtrl.showExoMobileHeader = parseInt(GLOBALS.isMobile) && parseInt(GLOBALS.showMobileHeaderInManyPages) && messagesCtrl.currentUser && messagesCtrl.currentUser.showExoMobileHeader
			messagesCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
		}
	})

