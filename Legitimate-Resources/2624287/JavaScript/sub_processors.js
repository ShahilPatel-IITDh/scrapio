angular.module('pages.subProcessors', [
		'dating.models.pages',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.oldSubProcessors', {
				url: 'subprocessors',
				onEnter: function($state) {
					$state.go('dating.pages.subProcessors')
				},
			})
			.state('dating.pages.subProcessors', {
				url: 'site/subprocessors',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'SubProcessorsCtrl as subProcessorsCtrl',
						templateUrl: globalParams.templateUrls.pages.sub_processors,
					},
				},
			})

	})
	.controller('SubProcessorsCtrl', function(PagesModel, GLOBALS) {
		var subProcessorsCtrl = this
		subProcessorsCtrl.siteName = GLOBALS.siteName

		PagesModel.setCurrentPage('SubProcessors')
	})

