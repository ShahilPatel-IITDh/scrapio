angular.module('pages.profiles', [
		'dating.models.pages',
		'dating.models.profiles',
		'angucomplete-alt',
		'Dating',
	])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.profiles', {
				url: 'search/:page/:filter',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'ProfilesCtrl as profilesCtrl',
						templateUrl: globalParams.templateUrls.pages.profiles,
					},
				},
			})
			.state('dating.pages.videoProfiles', {
				url: 'search/videos/:page/:filter',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'ProfilesCtrl as profilesCtrl',
						templateUrl: globalParams.templateUrls.pages.profiles,
					},
				},
			})
			.state('dating.pages.videoProfilesNoParams', {
				url: 'search/videos',
				views: {
					'sections@': {
						controller: 'ProfilesCtrl as profilesCtrl',
						templateUrl: globalParams.templateUrls.pages.profiles,
					},
				},
			})
			.state('dating.pages.profilesNoParams', {
				url: 'search',
				views: {
					'sections@': {
						controller: 'ProfilesCtrl as profilesCtrl',
						templateUrl: globalParams.templateUrls.pages.profiles,
					},
				},
			})
			.state('dating.pages.featuredProfiles', {
				url: 'featured/:page/:filter',
				views: {
					'sections@': {
						controller: 'ProfilesCtrl as profilesCtrl',
						templateUrl: globalParams.templateUrls.pages.profiles,
					},
				},
			})
			.state('dating.pages.landingProfiles', {
				url: 'search/:type',
				deepStateRedirect: { default: { state: 'dating.pages.profiles' } },
			})

	})
	.controller('ProfilesCtrl', function(ProfileData, $scope, $state, $stateParams, $modal, PagesModel, ProfilesModel, UsersModel, FeaturedModel, LocationsModel, GLOBALS, PROFILE_SETTINGS, authService, ProfilePreviewDialog, monetizationHook) {
		$('html, body').animate({scrollTop: 0}, 50)
		var profilesCtrl = this,
			currentPage = $stateParams.page || 1,
			profilesPerPage = GLOBALS.parentSite === 'xpickupresponsive' ? 24 : 20,
			searchFilter = ProfilesModel.parseSearchParams($stateParams.filter),
			defaultFilter,
			distancesWithWorldwide = false,
			featuredProfilesCount = 3

		if (GLOBALS.parentSite == 'foxytemptation') {
			featuredProfilesCount = 8
		}

		if (['megaflirt', 'steamyplay', 'adultcrush', 'xmeeting', 'truebootycall'].indexOf(GLOBALS.parentSite) !== -1) {
			featuredProfilesCount = 5
		}

		profilesCtrl.isVideoProfilesSearch = false

		if (GLOBALS.parentSite == 'wivesnow') {
			profilesPerPage = 12
		}

		if ($state.current.name === 'dating.pages.videoProfiles' || $state.current.name === 'dating.pages.videoProfilesNoParams') {
			profilesCtrl.isVideoProfilesSearch = true
			PagesModel.setCurrentPage('Videos')
		} else {
			PagesModel.setCurrentPage('Profiles')
		}

		profilesCtrl.countries = ProfilesModel.getSearchCountries()
		profilesCtrl.minAges = ProfilesModel.getMinAges()
		profilesCtrl.maxAges = ProfilesModel.getMaxAges()
		profilesCtrl.distances = ProfilesModel.getDistances(distancesWithWorldwide)
		profilesCtrl.lookingForGenders = UsersModel.getLookingForGenders()
		profilesCtrl.typeView = (GLOBALS.typeView != undefined) ? GLOBALS.typeView : 'gridView'
		profilesCtrl.sendingMatch = []
		profilesCtrl.showMatchStamp = []
		profilesCtrl.isMobile = GLOBALS.isMobileScreen
		profilesCtrl.isLoggedIn = authService.isAuthenticated
		profilesCtrl.currentUser = authService.currentUser
		profilesCtrl.showSearchForm = true
		profilesCtrl.showAllSearchCriteria = false
		profilesCtrl.showResults = true
		profilesCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		profilesCtrl.isFeaturedEnabled = parseInt(GLOBALS.isFeaturedEnabled)
		profilesCtrl.showFeaturedFS = parseInt(GLOBALS.showFeaturedFunctionality)
		profilesCtrl.featuredSearch = ($state.current.name == 'dating.pages.featuredProfiles') ? true : false
		profilesCtrl.videoProfilesSearch = ($state.current.name === 'dating.pages.videoProfiles' || $state.current.name === 'dating.pages.videoProfilesNoParams')
		profilesCtrl.featureToggles = GLOBALS.featureToggles
		profilesCtrl.imagesUrl = GLOBALS.baseUrl + '/styles/images/'
		profilesCtrl.monetizationOptions = GLOBALS.monetizationOptions
		profilesCtrl.monetizationHook = monetizationHook
		profilesCtrl.slider = {
			value: 18,
			options: {
				floor: 18,
				ceil: 100,
				step: 1,
			},
		}
		profilesCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile
		var externalUpgradeUrl = profilesCtrl.isLoggedIn ? GLOBALS.userInfo.partnerBillingRedirectUrl : ''
		profilesCtrl.upgradeUrl = parseInt(GLOBALS.isExternalUpgradeSite) ? externalUpgradeUrl : '/billing/upgrade'
		if (+profilesCtrl.featureToggles.searchSlider) {
			profilesCtrl.slider.options.hideLimitLabels = true
			profilesCtrl.slider.options.pushRange = true
			$('html, body').animate({scrollTop: 0}, 50)
		}
		profilesCtrl.toggleOnline = function() {
			profilesCtrl.profilesFilter.isOnline = !profilesCtrl.profilesFilter.isOnline
		}
		profilesCtrl.togglePhotos = function() {
			profilesCtrl.profilesFilter.withPhotos = !profilesCtrl.profilesFilter.withPhotos
		}
		defaultFilter = {
			lowAge: profilesCtrl.minAges[0],
			highAge: profilesCtrl.minAges[profilesCtrl.minAges.length - 1],
			withPhotos: true,
		}

		if (!profilesCtrl.isLoggedIn) {
			var oDefaultLookingFor = {}
			_.each(GLOBALS.defaultLookingFor, function(item) {
				oDefaultLookingFor[item] = true
			})
			defaultFilter.lookingFor = defaultFilter.lookingFor || oDefaultLookingFor
			LocationsModel.getCurrent().then(function(locationResult) {
				defaultFilter.whereCountry = locationResult.data.country
				defaultFilter.whereCity = locationResult.data.city

				var obj =_.find(profilesCtrl.countries, ['code', defaultFilter.whereCountry])
				if (!obj) {
					defaultFilter.whereCountry = ''
					defaultFilter.whereCity = ''
				}

				searchFilter = searchFilter ? searchFilter : defaultFilter
				ProfilesModel.getSearchProfiles(currentPage, searchFilter, profilesPerPage).then(function(result) {
					setSearchData (result, currentPage)
				})
			})
		} else {
			defaultFilter.whereCountry = GLOBALS.userInfo.location
			defaultFilter.whereCity = GLOBALS.userInfo.city

			var obj =_.find(profilesCtrl.countries, ['code', defaultFilter.whereCountry])
			if (!obj) {
				defaultFilter.whereCountry = ''
				defaultFilter.whereCity = ''
			}
			searchFilter = searchFilter ? searchFilter : defaultFilter
			if ($state.current.name == 'dating.pages.featuredProfiles' && profilesCtrl.currentUser.membership == 'premium') {
				ProfilesModel.getSearchProfiles(currentPage, searchFilter, profilesPerPage, true).then(function(result) {
					setSearchData (result, currentPage)
				})
			} else if ($state.current.name === 'dating.pages.videoProfiles' || $state.current.name === 'dating.pages.videoProfilesNoParams') {
				ProfilesModel.getSearchProfiles(currentPage, searchFilter, profilesPerPage, false, profilesCtrl.isVideoProfilesSearch).then(function(result) {
					setSearchData (result, currentPage)
				})
			} else {
				ProfilesModel.getSearchProfiles(currentPage, searchFilter, profilesPerPage).then(function(result) {
					setSearchData (result, currentPage)
				})
			}
		}

		var setSearchData = function(result, newPage) {
			profilesCtrl.searchProfiles = result.profiles
			profilesCtrl.totalProfiles = result.total_profiles
			profilesCtrl.currentPage = newPage
			profilesCtrl.isLoading = false
		}

		if (profilesCtrl.isFeaturedEnabled) {

			if (profilesCtrl.isLoggedIn && profilesCtrl.currentUser.membership == 'premium') {
				FeaturedModel.getFeaturedProfiles(featuredProfilesCount).then(function(result) {
					setFeaturedData(result)
				})
			}

			var setFeaturedData = function(result) {
				profilesCtrl.searchFeaturedProfiles = result.profiles
				profilesCtrl.totalFeaturedProfiles = result.total_profiles
			}
		}

		profilesCtrl.toggleShowSearchForm = function() {
			profilesCtrl.showSearchForm = !profilesCtrl.showSearchForm
		}

		profilesCtrl.toggleAllSearchCriteria = function() {
			profilesCtrl.showAllSearchCriteria = !profilesCtrl.showAllSearchCriteria
		}

		profilesCtrl.setTypeView = function(type) {
			profilesCtrl.typeView = type
			GLOBALS.typeView = type
		}

		profilesCtrl.sendMatch = function(profileId, status, showMatchStamp) {
			showMatchStamp = typeof showMatchStamp == 'undefined' ? false : showMatchStamp
			if (!profilesCtrl.isLoggedIn) {
				$state.go('dating.pages.viewProfile', {id: profileId})
			} else {
				profilesCtrl.sendingMatch[profileId] = true
				if (status ==='redirect') {
					$state.go('dating.pages.viewProfile', {id: profileId})
					return
				}
				if (showMatchStamp) {
					profilesCtrl.showMatchStamp[profileId] = true
				}
				_.each(profilesCtrl.searchProfiles, function(value, key) {
					if (value.id == profileId) {
						value.matchStatus = status == 'accept' ? 'match' : 'youLiked'
					}
				})
				ProfilesModel.sendMatch(profileId, status).then(function(result) {
					profilesCtrl.showMatchStamp[profileId] = false
					$state.go('dating.pages.viewProfile', {id: profileId})
				})
			}
		}

		profilesCtrl.sendPhotoRequest = function(profile) {
			var profileId = profile.id
			if (!profilesCtrl.isLoggedIn) {
				$state.go('dating.pages.viewProfile', {id: profileId})
			} else {
				profile.isPhotoRequestDisabled = true
				var data = {userId: profileId}
				ProfilesModel.sendPhotoRequest(data).then(function(result) {
					profile.bCanRequestPhoto = false
					profile.isPhotoRequestDisabled = false
				})
			}
		}

		profilesCtrl.pageChanged = function() {
			if ($state.current.name === 'dating.pages.videoProfiles' || $state.current.name === 'dating.pages.videoProfilesNoParams') {
				$state.go('dating.pages.videoProfiles', {
					page: profilesCtrl.currentPage,
				})
			} else {
				$state.current.name = ($state.current.name == 'dating.pages.featuredProfiles') ? $state.current.name : 'dating.pages.profiles'
				$state.go($state.current.name, {
					page: profilesCtrl.currentPage,
				})
			}
		}

		profilesCtrl.filterProfiles = function() {
			if ($state.current.name === 'dating.pages.videoProfiles' || $state.current.name === 'dating.pages.videoProfilesNoParams') {
				$state.go('dating.pages.videoProfiles', {
					page: 1,
					filter: ProfilesModel.buildSearchParams(profilesCtrl.profilesFilter),
				})
			} else {
				$state.current.name = ($state.current.name == 'dating.pages.featuredProfiles') ? $state.current.name : 'dating.pages.profiles'
				$state.go($state.current.name, {
					page: 1,
					filter: ProfilesModel.buildSearchParams(profilesCtrl.profilesFilter),
				})
			}
		}

		profilesCtrl.showUpgradePopup = function () {
			if (profilesCtrl.nProfileInsteadOfLprofile && (!profilesCtrl.isLoggedIn || profilesCtrl.currentUser.membership !== 'premium')) {
				$modal.open({
					templateUrl: globalParams.templateUrls.pages.upgrade_popup,
					controller: 'UpgradeBoxCtrl as upgradeBoxCtrl',
					size: 'upgradePopup'
				})
			}
		}

		profilesCtrl.countryChange = function() {
			$scope.$broadcast('angucomplete-alt:clearInput')
		}

		profilesCtrl.autocompleteDataFormatCallback = function(str) {
			return {q: str, limit: 20, country: profilesCtrl.profilesFilter.whereCountry}
		}

		profilesCtrl.autocompleteObjectSelectedCallback = function(selectedCity) {
			selectedCity = selectedCity || {originalObject: {region: '', textKey: ''}}
			profilesCtrl.profilesFilter.whereCity = selectedCity.originalObject.region
			profilesCtrl.profilesFilter.whereExactLocation = selectedCity.originalObject.textKey
		}

		profilesCtrl.isLoading = true
		profilesCtrl.profilesPerPage = profilesPerPage
		profilesCtrl.profilesFilter = searchFilter ? searchFilter : defaultFilter
		profilesCtrl.profileSettingsOptions = PROFILE_SETTINGS[profilesCtrl.isLoggedIn ? (profilesCtrl.currentUser.gender == 1 ? 2 : 1) : 1]
		_.each(profilesCtrl.profileSettingsOptions, function(item, key) {
			_.each(item, function(text, id) {
				if (text.toLowerCase() == 'prefer not to say') {
					item = _.omit(item, id)
				}
				if (key == 'education' && text.indexOf('(') > -1) {
					//adjust by removing () from Associate's degree (2 years college) and BA/BS (4 years college)
					text = text.replace(/ *\([^)]*\) */g, '')
					item[id] = text
				}
				if (key == 'height' && text.indexOf('/') > -1) {
					//adjust by removing ft measures
					text = text.replace(/ *[^)]*\/ */g, '')
					item[id] = text
				}
			})
			profilesCtrl.profileSettingsOptions[key] = item
		})

		if ($('#moreCriteria').length) {
			$('#moreCriteria').on('click', function(e) {
				$('.titleCriteria').removeClass('opened').next().hide()
				$(this).toggleClass('opened')
				$('#contentMore').slideToggle()
			})

			$('.titleCriteria').on('click', function(e) {
				$('.titleCriteria').not($(this)).removeClass('opened').next().hide()
				$(this).toggleClass('opened')
				$(this).next().toggle()
			})
		}

		profilesCtrl.previewProfile = function(profileId) {
			ProfilePreviewDialog.open(profileId).then(function() {
				$state.go('dating.pages.dashboard')
			})
		}

		$scope.$on('sign-out:success', function() {
			profilesCtrl.isLoggedIn = false
			profilesCtrl.currentUser = null
		})
	})

