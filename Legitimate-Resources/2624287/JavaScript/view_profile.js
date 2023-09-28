angular.module('pages.viewProfile', [
		'authBox',
		'dating.models.pages',
		'dating.models.profiles',
		'ui.bootstrap',
		'Dating',
	])
	.factory('preloader', function($q, $rootScope) {
		function Preloader(imageLocations) {
			this.imageLocations = imageLocations
			this.imageCount = this.imageLocations.length
			this.loadCount = 0
			this.errorCount = 0
			this.states = {PENDING: 1, LOADING: 2, RESOLVED: 3, REJECTED: 4}
			this.state = this.states.PENDING
			this.deferred = $q.defer()
			this.promise = this.deferred.promise
		}

		Preloader.preloadImages = function(imageLocations) {
			var preloader = new Preloader(imageLocations)
			return preloader.load()
		}
		Preloader.prototype = {
			constructor: Preloader,
			isInitiated: function isInitiated() {
				return this.state !== this.states.PENDING
			},
			isRejected: function isRejected() {
				return this.state === this.states.REJECTED
			},
			isResolved: function isResolved() {
				return this.state === this.states.RESOLVED
			},
			load: function load() {
				if (this.isInitiated()) {
					return this.promise
				}
				this.state = this.states.LOADING
				for (var i = 0; i < this.imageCount; i++) {
					this.loadImageLocation(this.imageLocations[i])
				}
				return this.promise
			},
			handleImageError: function handleImageError(imageLocation) {
				this.errorCount++
				if (this.isRejected()) {
					return
				}
				this.state = this.states.REJECTED
				this.deferred.reject(imageLocation)
			},
			handleImageLoad: function handleImageLoad(imageLocation) {
				this.loadCount++
				if (this.isRejected()) {
					return
				}
				this.deferred.notify({
					percent: Math.ceil(this.loadCount / this.imageCount * 100),
					imageLocation: imageLocation,
				})
				if (this.loadCount === this.imageCount) {
					this.state = this.states.RESOLVED
					this.deferred.resolve(this.imageLocations)
				}
			},
			loadImageLocation: function loadImageLocation(imageLocation) {
				var preloader = this
				var image = $(new Image())
					.load(
						function(event) {
							$rootScope.$apply(
								function() {
									preloader.handleImageLoad(event.target.src)
									preloader = image = event = null
								}
							)
						}
					)
					.error(
						function(event) {
							$rootScope.$apply(
								function() {
									preloader.handleImageError(event.target.src)
									preloader = image = event = null
								}
							)
						}
					)
					.prop('src', imageLocation)
			},
		}
		return Preloader
	})
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.viewProfile', {
				url: 'profile/view/id/:id?showVideo',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'ViewProfileCtrl as viewProfileCtrl',
						templateUrl: globalParams.templateUrls.pages.view_profile.view_profile,
					},
				},
				reloadOnSearch: true,
			})
			.state('dating.pages.badProfile', {
				url: 'badProfile/:id/:reason',
				views: {
					'sections@': {
						controller: 'BadProfileCtrl as badProfileCtrl',
						templateUrl: globalParams.templateUrls.pages.view_profile.bad_profile,
					},
				},
			})
			.state('dating.pages.userConversation', {
				url: 'profile/conversation/id/:id',
				views: {
					'sections@': {
						controller: 'UserConversationCtrl as userConversationCtrl',
						templateUrl: globalParams.templateUrls.pages.view_profile.user_conversation,
					},
				},
			})

	})
	.filter('trustResource', ['$sce', function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url)
		}
	}])
	.controller('ViewProfileCtrl', function($rootScope, $location, $sce, $timeout, $state, $stateParams, $scope, PagesModel, ProfilesModel, ProfileData, showSignUpBox, GLOBALS, authService, $modal, BlockUserDialog, preloader, userAccess, showStep1Box, showStep2Box, showAffiliateOneClickStep1Box, showAffiliateOneClickStep2Box, showAffiliateOneClickStep3Box, showOneClickBox, UsersModel, monetizationHook, EventsModel) {
		var viewProfileCtrl = this
		viewProfileCtrl.isLoggedIn = authService.isAuthenticated
		viewProfileCtrl.featureToggles = GLOBALS.featureToggles
		viewProfileCtrl.monetizationOptions = GLOBALS.monetizationOptions
		viewProfileCtrl.monetizationHook = monetizationHook

		if (!viewProfileCtrl.isLoggedIn) {
			if ($stateParams.id == 'me') {
				$state.go(window.globalParams.isMobileScreen ? 'dating.pages.datingCenterMobile' : 'dating.pages.datingCenter')
				return
			}
		}

		var profileId = $stateParams.id,
			defaultFilter
		if (GLOBALS.isMobileScreen) {
			$state.go('dating.pages.viewProfileMobile', {id: profileId})
		}

		if (+viewProfileCtrl.featureToggles.exoClickAdsRefresh) {
			viewProfileCtrl.onClickRefreshExoFooterAds = function() {
				$rootScope.$broadcast('refreshBanners')
			}
		}

		PagesModel.setCurrentPage('ViewProfile')

		viewProfileCtrl.themePath = GLOBALS.baseUrl + '/images/'

		viewProfileCtrl.profileId = profileId
		viewProfileCtrl.siteShortName = GLOBALS.siteShortName
		viewProfileCtrl.minAges = ProfilesModel.getMinAges()
		viewProfileCtrl.siteUrl = GLOBALS.siteUrl
		viewProfileCtrl.isMobile = parseInt(GLOBALS.isMobile)
		viewProfileCtrl.isPhotoRequestDisabled = true
		viewProfileCtrl.isMainstream = GLOBALS.isMainstreamSite

		if (viewProfileCtrl.isLoggedIn && !userAccess.hasAccess) {
			viewProfileCtrl.isLoggedIn = false
		}

		viewProfileCtrl.triggerMainPhoto = function(identifier, index) {
			$(identifier + index).trigger('click')
		}

		var showVideo = $location.search().showVideo
		ProfilesModel.getProfile(profileId, showVideo).then(function(result) {
			viewProfileCtrl.profile = new ProfileData(result)
			viewProfileCtrl.imageGenderLabel = viewProfileCtrl.profile.get('gender') == 1 ? 'woman' : 'man'

			var reason = viewProfileCtrl.profile.get('reason')
			if (reason) {
				if (reason == 'redirect') {
					$state.go('dating.pages.dashboard')
				} else {
					$state.go('dating.pages.badProfile', {reason: reason, id: profileId})
				}
			} else {
				defaultFilter = {
					whereCountry: viewProfileCtrl.profile.get('country'),
					whereCity: viewProfileCtrl.profile.get('city'),
					lowAge: viewProfileCtrl.minAges[0],
					highAge: viewProfileCtrl.minAges[viewProfileCtrl.minAges.length - 1],
					withPhotos: true,
				}
				var infoProfile = viewProfileCtrl.profile.get('info')
				viewProfileCtrl.hasPrivatePhotosShared = infoProfile.hasPrivatePhotosShared
				viewProfileCtrl.isPrivatePhotoAccessRequestDisabled = !infoProfile.canRequestPrivatePhotoAccess
				viewProfileCtrl.isPhotoRequestDisabled = !infoProfile.canRequestPhoto
				viewProfileCtrl.isYou = infoProfile.isYou
				viewProfileCtrl.canBeBlockedReported = infoProfile.canBeBlockedReported
				viewProfileCtrl.currentUser = authService.currentUser
				viewProfileCtrl.imgBaseUrl = GLOBALS.baseUrl + '/images'
				viewProfileCtrl.googleMapKey = GLOBALS.googleMapKey
				viewProfileCtrl.noPhotoSmall = viewProfileCtrl.imgBaseUrl + '/no_photo_' + viewProfileCtrl.profile.getShortGender() + '_100.png'
				viewProfileCtrl.budgetText = (viewProfileCtrl.profile.getSettingText('arrangementType') == 'Sugar Daddy/Sugar Momma') ? 'Lifestyle Budget' : 'Lifestyle Expectation'
				viewProfileCtrl.showWorthIncome = (viewProfileCtrl.budgetText == 'Lifestyle Budget')
				viewProfileCtrl.canSetMainPhoto = true
				viewProfileCtrl.numberPrivatePhotos = viewProfileCtrl.profile.countPrivatePhotos()
				viewProfileCtrl.profile.reloadMessages = 0
				viewProfileCtrl.showVirtualHottie = viewProfileCtrl.profile.get('showVirtualHottie')
				viewProfileCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
				viewProfileCtrl.customVideoPlayer = GLOBALS.customVideoPlayer
				viewProfileCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile
				var externalUpgradeUrl = viewProfileCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
				viewProfileCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? externalUpgradeUrl : '/billing/upgrade'
				if (viewProfileCtrl.isLoggedIn) {
					viewProfileCtrl.unitedStatesUser = viewProfileCtrl.currentUser.countryCode === 'US' || viewProfileCtrl.currentUser.countryCode === 'CA'
					// sms flow popup shows if FS is enabled, user does not have a saved phone number and is from US or CA
					viewProfileCtrl.showBbrPhoneNumberPopup = GLOBALS.showBbrPoneNumber && viewProfileCtrl.currentUser.phone === '' && viewProfileCtrl.unitedStatesUser
				}

				viewProfileCtrl.checkNudityCover = function() {
					if (viewProfileCtrl.profile.attributes.publicVideos.length && viewProfileCtrl.profile.attributes.publicVideos[0] && viewProfileCtrl.profile.attributes.publicVideos[0].category) {
						var nudeCategories = [2,3,4]
						var currentVideoCategory = viewProfileCtrl.profile.attributes.publicVideos[0].category
						return viewProfileCtrl.currentUser.safeMode === '1' && viewProfileCtrl.profile.attributes.publicVideos.length > 0 && nudeCategories.indexOf(currentVideoCategory) >= 0
					}
					return false
				}

				viewProfileCtrl.disablePictureInPicture = function(video) {
					// Adds HTML5 disablepictureinpicture tag to video element for both custom and normal video player
					video[0].disablePictureInPicture = true
				}

				viewProfileCtrl.disableFullscreen = function(video) {
					// Adds playsinline tag which disables fullscreen
					video[0].setAttribute('playsinline', '')
				}

				viewProfileCtrl.secondsForLoop = 5
				viewProfileCtrl.showNudityCover = viewProfileCtrl.checkNudityCover()
				viewProfileCtrl.isPrivateVideoLoaded = false
				viewProfileCtrl.showVideo = viewProfileCtrl.profile.get('showVideo')
				viewProfileCtrl.privateVideoUrl = viewProfileCtrl.profile.get('privateVideoUrl')
				viewProfileCtrl.privateCoverUrl = viewProfileCtrl.profile.get('privateCoverUrl')
				viewProfileCtrl.secondsBeforeBlur = viewProfileCtrl.profile.get('secondsBeforeBlur')
				viewProfileCtrl.videoBlurred = false
				viewProfileCtrl.isPublicVideoProfile = false
				// for public video profiles
				if (viewProfileCtrl.profile.attributes.publicVideos && viewProfileCtrl.profile.attributes.publicVideos.length !== 0) {
					var publicVideo = viewProfileCtrl.profile.attributes.publicVideos[0]
					viewProfileCtrl.isPublicVideoProfile = true
					viewProfileCtrl.publicVideoCover = publicVideo.coverUrl
					viewProfileCtrl.secondsBeforePublicVideoBlur = publicVideo.secondsBeforeBlur
					if (viewProfileCtrl.secondsBeforePublicVideoBlur > 0) {
						// converting value to milliseconds
						viewProfileCtrl.secondsBeforePublicVideoBlur *= 1000
					}
				}

				// for SMS flow, saving the phone in the profile on submit
				viewProfileCtrl.savePhoneNumber = function() {
					var input = document.querySelector('#EditSettingsForm_phone')
					var phoneNumber = input.value
					var countryCode = input.offsetParent.innerText
					var phoneData = {
						phone: phoneNumber,
						phoneCountryCode: countryCode.slice(1),
					}
					UsersModel.saveAccountSettings(phoneData).error(function(result) {
						viewProfileCtrl.errors = result
						viewProfileCtrl.accountFormStatus = 'editing'
					})
						.then(function(result) {
							viewProfileCtrl.errors = null
							viewProfileCtrl.accountFormStatus = 'editing'
							viewProfileCtrl.currentUser.phone = '+' + result.config.data.phoneCountryCode + result.config.data.phone
							if (result.statusText === 'OK') {
								$('#addPhoneNumberPopup').hide()
								$('.ui-widget-overlay').hide()
								input.value = ''
							}
						})
				}

				// init sms input for SMS flow if FS is enabled and there is no phone stored
				if (viewProfileCtrl.showBbrPhoneNumberPopup) {
					if (['xmeeting'].indexOf(GLOBALS.parentSite) !== -1) {
						setTimeout(function() {
							var input = document.querySelector('#EditSettingsForm_phone')
							var iti   = window.intlTelInput(input, {
								formatOnDisplay: false,
								initialCountry: 'auto',
								separateDialCode: 'true',
								autoPlaceholder: 'off',
								utilsScript: '/themes/js/intelPhoneNumber/utils.js',
								geoIpLookup: function(callback) {
									var countryCode = viewProfileCtrl.currentUser.countryCode
									callback(countryCode)
								},
							})
						}, 300)

						$('#EditSettingsForm_phone').on('touchend', function() {
							$('.error').css('visibility', 'hidden')
						})

						$('#EditSettingsForm_phone').keyup(function() {
							$('.error').css('visibility', 'hidden')
						})
					}
				}

				viewProfileCtrl.initVideo = function() {
					if (viewProfileCtrl.customVideoPlayer && !viewProfileCtrl.showNudityCover) {
						var videoContainer = document.getElementById('video-container')
						var videoPlayer = videoContainer.querySelectorAll('video')
						//If user is not a premium member, disable fullscreen and picture in picture mode
						if (viewProfileCtrl.currentUser && viewProfileCtrl.currentUser.membership !== 'premium') {
							viewProfileCtrl.disablePictureInPicture(videoPlayer)
							viewProfileCtrl.disableFullscreen(videoPlayer)
						}
						$('.video-player-wrapper').fancybox({
							afterClose: function() {
								$('.video-player-wrapper').prop('style', '')
							},
						})
					} else if (!viewProfileCtrl.customVideoPlayer) {
						var video = document.getElementById('public-video')
						if (video) {
							video.style.display = 'block'
						}
						$('[data-fancybox]').fancybox({
							afterClose: function(instance, video) { // eslint-disable-line no-shadow
								$(video.src).prop('style', '')
							},
						})

						if (viewProfileCtrl.currentUser && viewProfileCtrl.currentUser.membership !== 'premium') {
							video.setAttribute('disablePictureInPicture', '')
							video.onplay = function() {
								video.removeAttribute('controls')
							}
						}

						// Removes fancybox attribute so it won't fullscreen the video when the blurred cover is enabled
						// forces customVideoPlayer if safemode is enabled so only need to style blur to 1 video element
						if (viewProfileCtrl.showNudityCover) {
							videoPlayer = document.getElementById('public-video')
							videoPlayer.setAttribute('autoplay','')
							videoContainer.removeAttribute('data-fancybox')
						}

						// loops the video back to the start when duration exceeds x seconds ( based of the secondsForLoop variable )
						video.ontimeupdate = function() {
							if (viewProfileCtrl.showNudityCover) {
								if (video.currentTime > viewProfileCtrl.secondsForLoop) {
									video.currentTime = 0
								}
							}
							if (viewProfileCtrl.currentUser && viewProfileCtrl.currentUser.membership !== 'premium' && !viewProfileCtrl.showNudityCover) {
								$timeout(function() {
									video.classList.add('blur')
									video.pause()
									viewProfileCtrl.videoBlurred = true
									// IE10+ does not support blur, only the video cover without blur will be displayed
									var userAgent = window.navigator.userAgent
									var msie = userAgent.indexOf('MSIE')
									if (msie !== -1) {
										video.src = ''
										video.removeAttribute('src')
									}
								}, viewProfileCtrl.secondsBeforePublicVideoBlur)
							}
						}
					}
				}

				viewProfileCtrl.initPrivateVideo = function() {
					if (viewProfileCtrl.customVideoPlayer) {
						var videoContainer = document.getElementById('video-container')
						var videoPlayer = videoContainer.querySelectorAll('video')
						//If user is not a premium member, disable fullscreen and picture in picture mode
						if (viewProfileCtrl.currentUser && viewProfileCtrl.currentUser.membership !== 'premium') {
							viewProfileCtrl.disablePictureInPicture(videoPlayer)
							viewProfileCtrl.disableFullscreen(videoPlayer)
						}
						$('#private-video').fancybox({
							afterClose: function() {
								var noReloadOnUrlChangeTimeout = $timeout(function() {
									$state.$current.self.reloadOnSearch = false
									$location.search('showVideo', null)
									$timeout.cancel(noReloadOnUrlChangeTimeout)
								}, 400)
								var reloadOnUrlChangeTimeout = $timeout(function() {
									$state.$current.self.reloadOnSearch = true
									$timeout.cancel(reloadOnUrlChangeTimeout)
								}, 600)
							},
						}).trigger('click')
					} else {
						var privateVideo = document.getElementById('private-video')
						var video = document.getElementById('video')
						if (video) {
							video.setAttribute('disablePictureInPicture', '')
							privateVideo.style.display = 'block'
							video.oncanplay = function() {
								viewProfileCtrl.isPrivateVideoLoaded = true

								video.addEventListener('contextmenu', function(e) {
									e.preventDefault()
									return false
								})
								video.ontimeupdate = function() {
									var percentage = (video.currentTime / video.duration) * 100
									$('#progress-bar').val(percentage)
								}

								if (viewProfileCtrl.currentUser && viewProfileCtrl.currentUser.membership === 'premium') {
									$('#progress-bar').addClass('hand')
									$('#progress-bar').on('click', function(e) {
										var offset = $(this).offset()
										var left = (e.pageX - offset.left)
										var totalWidth = $('#progress-bar').width()
										var percentage = (left / totalWidth)
										video.currentTime = video.duration * percentage
									})
								}

								var milliSeconds = parseInt(viewProfileCtrl.secondsBeforeBlur) * 1000
								if (milliSeconds > 0 && viewProfileCtrl.currentUser && viewProfileCtrl.currentUser.membership !== 'premium') {
									$timeout(function() {
										var video = document.getElementById('video') // eslint-disable-line no-shadow
										var userAgent = window.navigator.userAgent
										var msie = userAgent.indexOf('MSIE ')
										if (msie !== -1) {
											video.src = ''
											video.removeAttribute('src')
											video.setAttribute('poster', viewProfileCtrl.privateCoverUrl)
										}
										$('#video').addClass('blur')
										viewProfileCtrl.videoBlurred = true
									}, milliSeconds)
								}
							}
							var noReloadOnUrlChangeTimeout, reloadOnUrlChangeTimeout
							$('#private-video').fancybox({
								content: privateVideo,
								afterClose: function() {
									noReloadOnUrlChangeTimeout = $timeout(function() {
										$state.$current.self.reloadOnSearch = false
										$location.search('showVideo', null)
										$timeout.cancel(noReloadOnUrlChangeTimeout)
									}, 400)
									reloadOnUrlChangeTimeout = $timeout(function() {
										$state.$current.self.reloadOnSearch = true
										$timeout.cancel(reloadOnUrlChangeTimeout)
									}, 600)
								},
							}).trigger('click')
						}
					}
				}

				viewProfileCtrl.redirectToUpgradePage = function() {
					window.location.href = '/billing/upgrade'
				}

				viewProfileCtrl.closeFancyboxAndRedirectToUpgrade = function() {
					$('.fancybox-close').click()
					window.location.href = '/billing/upgrade'
				}

				if (viewProfileCtrl.isLoggedIn) {
					viewProfileCtrl.currentUser.canSendMessages = viewProfileCtrl.profile.attributes.viewerCanSendMessages
				}

				if (GLOBALS.hasMap) {
					viewProfileCtrl.useOpenStreetMap = GLOBALS.useOpenStreetMap

					if (GLOBALS.useOpenStreetMap) {
						var nLat = parseFloat(viewProfileCtrl.profile.get('latLon').lat)
						var nLon = parseFloat(viewProfileCtrl.profile.get('latLon').lon)
						var sImg = '/images/map-marker-' + GLOBALS.siteShortName + '.png'
						viewProfileCtrl.markers = [
							{
								lat: nLat,
								lon: nLon,
							},
						]
						angular.extend($scope, {
							center: {
								lat: nLat,
								lon: nLon,
								zoom: 6,
							},
							markers: viewProfileCtrl.markers,
							defaults: {
								styles: {
									marker: {
										/* global ol */
										image: new ol.style.Icon({
											anchor: [0.5, 1.1],
											src: sImg,
										}),
									},
								},
							},
						})
					} else {
						var mapUrl = viewProfileCtrl.profile.get('mapUrl')
						viewProfileCtrl.mapUrl = $sce.trustAsResourceUrl(mapUrl)
					}
				}
				$(document).scrollTop(0)
				viewProfileCtrl.setMainPhoto = function(n, isPrivate) {
					if (viewProfileCtrl.canSetMainPhoto) {
						$('.mainPhoto', '.mainPhotoBox').addClass('ng-hide')
						if (isPrivate) {
							$('#mainPhotoPrivate' + n, '.mainPhotoBox').removeClass('ng-hide')
						} else {
							$('#mainPhoto' + n, '.mainPhotoBox').removeClass('ng-hide')
						}
					}
				}
				viewProfileCtrl.setActive = function($event, n, isPrivate) {
					$('.photoGalleryBox a').removeClass('active')
					$($event.currentTarget).addClass('active')
					viewProfileCtrl.canSetMainPhoto = true
					viewProfileCtrl.setMainPhoto(n, isPrivate)
					viewProfileCtrl.canSetMainPhoto = false
				}
				if (!viewProfileCtrl.isLoggedIn) {
					if (GLOBALS.isViewingSocialMediaLp && GLOBALS.user) {
						if (GLOBALS.user.justRegistered) {
							showStep1Box()
						}
						if (GLOBALS.user.showUploadPhotoDescriptionBox) {
							if (GLOBALS.user.showOneClickBox) {
								showOneClickBox()
								if(GLOBALS.cookie1ClickActionsSooner){
									var sent = false
									$(window).on('focus mousemove touchmove', function(event) {
										if (sent) {
											return
										}
										EventsModel.updateFocus()
										sent = true
									})
								}
							} else {
								showStep2Box()
							}
						}
						if (GLOBALS.user.bAffiliateOneClickBox) {
							showAffiliateOneClickStep1Box()
							if(GLOBALS.cookie1ClickActionsSooner){
								var sent = false
								$(window).on('focus mousemove touchmove', function(event) {
									if (sent) {
										return
									}
									EventsModel.updateFocus()
									sent = true
								})
							}
						}
						if (GLOBALS.user.bAffiliateOneClickBoxStep2) {
							showAffiliateOneClickStep2Box()
							if(GLOBALS.cookie1ClickActionsSooner){
								var sent = false
								$(window).on('focus mousemove touchmove', function(event) {
									if (sent) {
										return
									}
									EventsModel.updateFocus()
									sent = true
								})
							}
						}
						if (GLOBALS.user.bAffiliateOneClickBoxStep3) {
							showAffiliateOneClickStep3Box()
							if(GLOBALS.cookie1ClickActionsSooner){
								var sent = false
								$(window).on('focus mousemove touchmove', function(event) {
									if (sent) {
										return
									}
									EventsModel.updateFocus()
									sent = true
								})
							}
						}
					} else {
						showSignUpBox()
					}
				}
			}
		})

		viewProfileCtrl.filterProfiles = function() {
			$state.go('dating.pages.profiles', {
				page: 1,
				filter: ProfilesModel.buildSearchParams(defaultFilter),
			})
		}

		viewProfileCtrl.photoRange = function(n) {
			var photoRange = []
			for (var i = 0; i < n; i++) {
				photoRange.push(i)
			}
			return photoRange
		}

		viewProfileCtrl.max = function(a, b) {
			return (a > b) ? a : b
		}

		viewProfileCtrl.sendMatch = function(status) {
			if (status == 'like') {
				viewProfileCtrl.profile.set('matchStatus', 'youLiked')
			} else if (status == 'accept') {
				viewProfileCtrl.profile.set('matchStatus', 'match')
			}
			ProfilesModel.sendMatch(profileId, status).then(function() {
				ProfilesModel.getProfile(profileId, false).then(function(result) {
					viewProfileCtrl.profile = new ProfileData(result)
				})
			})
			// show popup for the sms flow when user clicks like button, FS is ON and there is no phone saved
			if (['xmeeting'].indexOf(GLOBALS.parentSite) !== -1 && viewProfileCtrl.showBbrPhoneNumberPopup && (status === 'like' || status === 'accept')) {
				if ($('#addPhoneNumberPopup').hasClass('sendMessageBBRPopup')) {
					$('#addPhoneNumberPopup').removeClass('sendMessageBBRPopup')
				}
				$('#addPhoneNumberPopup').show()
				$('#addPhoneNumberPopup').addClass('sendLikeBBRPopup')

				$('#addPhoneNumberPopup .cancelBtn').on('click touchstart', function() {
					$('#addPhoneNumberPopup').hide()
					$('#addPhoneNumberPopup').removeClass('sendLikeBBRPopup sendMessageBBRPopup')
					$('#EditSettingsForm_phone').val('')
					return false
				})
			}
			if (+viewProfileCtrl.featureToggles.refreshBanners) {
				$rootScope.$broadcast('refreshBanners')
			}
		}

		viewProfileCtrl.reportProfile = function() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.pages.view_profile.report_abuse_box,
				controller: 'ReportAbuseBoxCtrl as reportAbuseBoxCtrl',
				size: 'reportPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					profile: function() {
						return viewProfileCtrl.profile
					},
				},
			})
		}

		viewProfileCtrl.blockProfile = function() {
			BlockUserDialog.open(viewProfileCtrl.profile.get('id')).then(function() {
				$state.go('dating.pages.dashboard')
			})
		}

		viewProfileCtrl.sendPhotoRequest = function() {
			var data = {userId: viewProfileCtrl.profileId}
			viewProfileCtrl.isPhotoRequestDisabled = true
			ProfilesModel.sendPhotoRequest(data).then(function(result) {
				viewProfileCtrl.profile.reloadMessages++
			})

			if (+viewProfileCtrl.featureToggles.refreshBanners) {
				$rootScope.$broadcast('refreshBanners')
			}
		}

		viewProfileCtrl.sendPrivatePhotoAccessRequest = function() {
			var data = {userId: viewProfileCtrl.profileId}
			viewProfileCtrl.isPrivatePhotoAccessRequestDisabled = true
			ProfilesModel.sendPrivatePhotoAccessRequest(data).then(function(result) {
				viewProfileCtrl.profile.attributes.info.canRequestPrivatePhotoAccess = false
				viewProfileCtrl.profile.reloadMessages++
			})
		}

		viewProfileCtrl.togglePrivatePhotoAccess = function() {
			viewProfileCtrl.changingSharing = true
			var data = {senderId: viewProfileCtrl.profile.get('id')}
			ProfilesModel.togglePrivatePhotoAccess(data).then(function(result) {
				viewProfileCtrl.hasPrivatePhotosShared = (result.data.status == 1)
				viewProfileCtrl.profile.reloadMessages++
				viewProfileCtrl.changingSharing = false
			})
		}

		viewProfileCtrl.setSafeMode = function() {
			ProfilesModel.setSafeMode().then(function() {
				window.location.reload()
			})
		}

		viewProfileCtrl.showPictureBox = function(nPhoto) {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.pages.confirm_box,
				controller: 'ConfirmBoxCtrl as confirmBoxCtrl',
				size: 'pictureBoxPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				modalClass: 'pictureBoxPopup',
				resolve: {
					infoToSend: function() {
						return {
							type: 3,
							nPhoto: nPhoto,
							profile: viewProfileCtrl.profile,
							imageId: viewProfileCtrl.profile.getPhotoID(nPhoto),
							reloadProfile: function() {
								/*global reloadProfile*/
								reloadProfile()
							},
						}
					},
				},
			})
		}
	})

	.controller('ReportAbuseBoxCtrl', function($modalInstance, ProfilesModel, profile) {
		var reportAbuseBoxCtrl = this,
			profileId = profile.get('id')
		reportAbuseBoxCtrl.newReport = {abuserId: profileId}
		reportAbuseBoxCtrl.sendReport = function() {
			ProfilesModel.report(reportAbuseBoxCtrl.newReport)
				.error(function(result) {
					reportAbuseBoxCtrl.errors = result
				})
				.then(function(result) {
					reportAbuseBoxCtrl.reportSubmitted = true
				})
		}

		reportAbuseBoxCtrl.profile = profile
	})

	.controller('BadProfileCtrl', function($state, $stateParams) {
		var badProfileCtrl = this,
			reason = $stateParams.reason,
			profileId = $stateParams.id
		badProfileCtrl.reason = reason
		badProfileCtrl.profileId = profileId
	})
	.controller('UserConversationCtrl', function($state, $stateParams, ProfilesModel, ProfileData, PagesModel) {
		var userConversationCtrl = this,
			profileId = $stateParams.id
		$('html, body').animate({scrollTop: 0}, 500)
		userConversationCtrl.isLoading = true
		userConversationCtrl.profileId = profileId
		PagesModel.setCurrentPage('UserConversation')
		ProfilesModel.getProfile(profileId, false).then(function(result) {
			userConversationCtrl.profile = new ProfileData(result)
			var reason = userConversationCtrl.profile.get('reason')
			if (reason) {
				if (reason == 'inaccessible') {
					$state.go('dating.pages.badProfile', {reason: reason, id: profileId})
				}
			} else {
				userConversationCtrl.isLoading = false
			}
		})
	})

