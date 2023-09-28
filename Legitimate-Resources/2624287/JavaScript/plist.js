angular.module('pages.plist', [
	'dating.models.pages',
	'dating.models.profiles',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.plist', {
				url: 'plist/:section/:page/',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'PlistCtrl as plistCtrl',
						templateUrl: globalParams.templateUrls.pages.plist,
					},
				},
			})

	})
	.controller('PlistCtrl', function($state, $scope, $stateParams, PagesModel, EventsModel, GLOBALS, authService) {
		var plistCtrl = this
		plistCtrl.featureToggles = GLOBALS.featureToggles
		if (+plistCtrl.featureToggles.datingCenterRedirect) {
			$state.go('dating.pages.datingCenter')
		} else {
			plistCtrl.changeView = function(section) {
				plistCtrl.section = section
			}
			plistCtrl.isMobileScreen = GLOBALS.isMobileScreen
			plistCtrl.isLoading = true
			plistCtrl.section = $stateParams.section || null
			plistCtrl.currentPage = $stateParams.page || 1
			plistCtrl.currentUser = authService.currentUser
			plistCtrl.isMainstream = GLOBALS.isMainstreamSite
			plistCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
			PagesModel.setCurrentPage(plistCtrl.section)
			EventsModel.getTickers().then(function(result) {
				plistCtrl.tickers = result.data
				plistCtrl.isLoading = false
			})

			plistCtrl.go = function(section, page) {
				page = (typeof page !== 'undefined') ? page : 1
				$state.go('dating.pages.plist', { section: section, page: page })
			}
			plistCtrl.go(plistCtrl.section, plistCtrl.currentPage)
			plistCtrl.showExoMobileHeader = parseInt(GLOBALS.isMobile) && parseInt(GLOBALS.showMobileHeaderInManyPages) && plistCtrl.currentUser && plistCtrl.currentUser.showExoMobileHeader
			plistCtrl.isMobile = parseInt(GLOBALS.isMobile)
		}

		$scope.$on('sign-out:success', function() {
			plistCtrl.currentUser = null
		})
	})

