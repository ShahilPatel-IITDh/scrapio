angular.module('pages.2257Notice', [
		'dating.models.pages',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.old2257Notice', {
				url: '2257Notice',
				onEnter: function($state) {
					$state.go('dating.pages.2257Notice')
				},
			})
			.state('dating.pages.2257Notice', {
				url: 'site/2257Notice',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'NoticeCtrl as noticeCtrl',
						templateUrl: globalParams.templateUrls.pages['2257_notice'],
					},
				},
			})

	})
	.controller('NoticeCtrl', function(PagesModel, GLOBALS) {
		var noticeCtrl = this
		noticeCtrl.companyName = GLOBALS.companyName
		noticeCtrl.companyCountry = GLOBALS.companyCountry
		noticeCtrl.supportEmail = GLOBALS.supportEmail
		noticeCtrl.companyAddress = GLOBALS.companyAddress
		noticeCtrl.imagesUrl = GLOBALS.baseUrl + '/images/'
		noticeCtrl.notice = GLOBALS.trafficmansioNotice2257
		PagesModel.setCurrentPage('2257Notice')
	})

