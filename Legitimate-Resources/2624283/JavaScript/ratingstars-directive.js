angular.module('dating.directives.ratingstars', [
		'dating.models.profiles',
	])
	.controller('RateCtrl', function($rootScope, ProfilesModel) {
		var rateCtrl = this
		rateCtrl.rateClass = ''
		rateCtrl.currentScore = null
		rateCtrl.getRateRange = function() {
			return _.range(1, 1 + parseInt(rateCtrl.maxImageScore))
		}
		rateCtrl.sendVote = function(score) {
			rateCtrl.isVotePending = true
			rateCtrl.currentScore = score
			$rootScope.$broadcast('play-vote:pending')
			var data = {userId: rateCtrl.profileId, score: score}
			ProfilesModel.vote(data)
				.error(function() {
					window.location.reload()
				})
				.then(function() {
					$rootScope.$broadcast('play-vote:success')
					rateCtrl.isVotePending = false
				})
			$rootScope.$broadcast('refreshBanners')
			$rootScope.$broadcast('refreshCenterCube')
		}

		rateCtrl.skipVote = function() {
			$rootScope.$broadcast('play-vote:next')
			$rootScope.$broadcast('refreshBanners')
			$rootScope.$broadcast('refreshCenterCube')
		}

		rateCtrl.overStar = function(score) {
			rateCtrl.rateClass = 'over' + score
		}
		rateCtrl.leaveStar = function() {
			rateCtrl.rateClass = ''
		}
	})
	.directive('ratingstars', function($log) {
		return {
			restrict: 'E',
			controller: 'RateCtrl',
			controllerAs: 'rateCtrl',
			bindToController: true,
			scope: {
				maxImageScore: '@maxImageScore',
				minScoreForLike: '@minScoreForLike',
				profileId: '@profileId',
			},
			templateUrl: globalParams.templateUrls.directives.ratingstars,
			link: function(scope, element, attr, rateCtrl) {
				$(element).on('click', '.score', function() {
					var btnScore = $(this).attr('data-score')
					rateCtrl.sendVote(btnScore)
				})

				$(element).on('click', '.skip', function() {
					rateCtrl.skipVote()
				})
			},
		}
	})

