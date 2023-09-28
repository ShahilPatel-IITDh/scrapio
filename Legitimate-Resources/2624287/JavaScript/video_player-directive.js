angular.module('dating.directives.videoPlayer', [
	'ngSanitize',
	'com.2fdevs.videogular',
	'com.2fdevs.videogular.plugins.controls',
	'com.2fdevs.videogular.plugins.overlayplay',
	'com.2fdevs.videogular.plugins.buffering',
])
	.controller('VideoPlayerCtrl', function($sce, $scope, authService, ProfilesModel) {
		var videoPlayerCtrl = this
		videoPlayerCtrl.currentUser = authService.currentUser
		videoPlayerCtrl.isPremium = videoPlayerCtrl.currentUser && videoPlayerCtrl.currentUser.membership === 'premium'

		videoPlayerCtrl.theme = '/themes/scss/vendor/videogular/videogular.min.css'

		videoPlayerCtrl.config = {
			sources: [
				{
					src: $sce.trustAsResourceUrl(videoPlayerCtrl.videoSource),
					type: 'video/mp4',
				},
			],
		}

		videoPlayerCtrl.onPlayerReady = function(API) {
			videoPlayerCtrl.API = API
			videoPlayerCtrl.progress = 0
			videoPlayerCtrl.videoBlurred = false
			API.setState('stop')
		}

		videoPlayerCtrl.onCanPlay = function() {
			if (videoPlayerCtrl.autoplay) {
				videoPlayerCtrl.API.setVolume(0)
				videoPlayerCtrl.API.setState('play')
				videoPlayerCtrl.API.play()
			}
		}

		videoPlayerCtrl.onUpdateTime = function(currentTime) {
			if (videoPlayerCtrl.showNudityCover) {
				if (currentTime > videoPlayerCtrl.secondsForLoop) {
					videoPlayerCtrl.API.seekTime(0)
				}
			} else {
				if (Math.abs(currentTime - videoPlayerCtrl.progress) < 1) {
					videoPlayerCtrl.progress = currentTime
				}
				if (!videoPlayerCtrl.isPremium && videoPlayerCtrl.secondsBeforeBlur && currentTime >= videoPlayerCtrl.secondsBeforeBlur) {
					videoPlayerCtrl.videoBlurred = true
				}
			}
		}

		videoPlayerCtrl.onBarClick = function() {
			if (!videoPlayerCtrl.isPremium) {
				videoPlayerCtrl.API.seekTime(videoPlayerCtrl.progress)
			}
		}

		videoPlayerCtrl.redirectToUpgrade = function() {
			$('.fancybox-close').click()
			window.location.href = '/billing/upgrade'
		}

		videoPlayerCtrl.setSafeMode = function() {
			ProfilesModel.setSafeMode().then(function() {
				window.location.reload()
			})
		}

		$scope.$on('sign-out:success', function() {
			videoPlayerCtrl.currentUser = null
		})
	})
	.directive('videoPlayer', function() {
		return {
			restrict: 'E',
			controller: 'VideoPlayerCtrl',
			controllerAs: 'videoPlayerCtrl',
			bindToController: true,
			scope: {
				videoSource: '=videoSource',
				autoplay: '=autoplay',
				videoType: '@videoType',
				secondsBeforeBlur: '=secondsBeforeBlur',
				secondsForLoop: '=secondsForLoop',
				showNudityCover: '=showNudityCover',
			},
			templateUrl: globalParams.templateUrls.directives.video_player,
		}
	})
	.directive('videoBlur', function() {
		return {
			restrict: 'E',
			controller: 'VideoPlayerCtrl',
			controllerAs: 'videoPlayerCtrl',
			bindToController: true,
			require: '^videogular',
			scope: {
				videoType: '=videoType',
				showNudityCover: '=showNudityCover',
				videoBlurred: '=videoBlurred',
			},
			templateUrl: globalParams.templateUrls.directives.video_blur,
		}
	})

