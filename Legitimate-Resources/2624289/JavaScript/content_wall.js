angular.module('pages.contentWall', [
		'dating.models.pages',
		'infinite-scroll',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.contentWall', {
				url: 'contentWall',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'ContentWallCtrl as contentWallCtrl',
						templateUrl: globalParams.templateUrls.pages.content_wall.content_wall,
					},
				},
			})

	})
	.controller('ContentWallCtrl', function($state, PagesModel, ProfilesModel, authService, $modal) {
		$('html, body').animate({scrollTop: 0}, 50)
		if (!authService.isAuthenticated) {
			$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
		} else {
			var contentWallCtrl = this
			var page = 1
			PagesModel.setCurrentPage('ContentWall')
			contentWallCtrl.feed = []
			contentWallCtrl.isPremium = authService.currentUser && authService.currentUser.membership === 'premium'
			contentWallCtrl.isLoading = false
			contentWallCtrl.isLimitReached = false

			contentWallCtrl.nextPage = function() {
				if (contentWallCtrl.isLimitReached) {
					contentWallCtrl.showUpgradePopup()
				} else {
					if (!contentWallCtrl.isLoading) {
						contentWallCtrl.isLoading = true
						ProfilesModel.getContentWall(page).then(function(result) {
							contentWallCtrl.feed = contentWallCtrl.feed.concat(result.data.feed)
							contentWallCtrl.isLoading = false
							page++
							if (!contentWallCtrl.isPremium && page > 5) {
								contentWallCtrl.isLimitReached = true
							}
						})
					}
				}
			}

			contentWallCtrl.showUpgradePopup = function() {
				$modal.open({
					templateUrl: globalParams.templateUrls.pages.content_wall.upgrade_box,
					size: 'contentWallUpgradePopup',
					keyboard: false,
					backdrop: 'static',
					animation: false,
				})
			}
		}
	})

