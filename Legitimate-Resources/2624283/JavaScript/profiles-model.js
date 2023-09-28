angular.module('dating.models.profiles', [
	])
	.service('ProfilesModel', function($http, $q, COUNTRY_LIST) {
		var model = this,
			URLS = {
				FETCH_GUEST_PROFILES: '/home/guestProfiles',
				FETCH_GEO_PROFILES: '/profile/geoProfiles',
				FETCH_ONLINE_PROFILES: '/profile/onlineProfiles',
				FETCH_SEARCH_PROFILES: '/search/users',
				FETCH_SEARCH_VIDEO_PROFILES: '/search/videos',
				FETCH_SEARCH_FEATURED_PROFILES: '/search/featured',
				FETCH_PROFILE: '/profile/view/id/:id',
				POST_GET_DASHBOARD_MATCHES: '/match/getMatchesDashboard',
				GET_PROFILES_LIST: {
					'you-like': '/widget/youLike',
					'likes-you': '/widget/likesYou',
					'you-viewed': '/widget/youViewed',
					'viewed-you': '/widget/viewedYou',
					matches: '/widget/matches',
					'online-now': '/widget/onlineNow',
					'new-members': '/widget/newMembers',
					'near-you': '/widget/nearYou',
					premium: '/widget/premium',
					featured: '/featured/list',
				},
				POST_MATCH_REQUESTS: {
					like: '/match/send',
					accept: '/match/accept',
					reject: '/match/reject',
				},
				GET_SET_PRIMARY_IMAGE: '/image/setPrimary',
				GET_DELETE_IMAGE: '/image/delete',
				GET_MOVE_IMAGE: '/image/move',
				GET_SET_SAFE_MODE: '/profile/setSafeMode',
				TOGGLE_IMAGE_PRIVACY: '/image/togglePrivacy',
				POST_BLOCK_PROFILE: '/profile/blockUser',
				POST_REPORT_PROFILE: '/profile/reportAbuse',
				POST_DELETE_ACCOUNT: '/profile/deleteAccount',
				POST_PHOTO_REQUEST: '/profile/requestPhoto',
				POST_PRIVATE_PHOTO_ACCESS_REQUEST: '/profile/requestPrivatePhotoAccess',
				POST_TOGGLE_PRIVATE_PHOTO_ACCESS: '/profile/togglePrivatePhotoAccess',
				POST_REBILL_CHANGE: '/billing/changeRebill',

				POST_VOTE_PROFILE: '/play/vote',
				POST_PLAY_SET_FILTER: '/play/setFilter',
				FETCH_PLAY_PROFILES: '/play/index',
				POST_GET_CONTENT_WALL: '/contentWall',
			},
			geoProfiles,
			onlineProfiles,
			searchProfiles,
			ages = []


		for (var i = 18; i < 101; i++) {
			ages.push(i)
		}

		function extract(result) {
			return _.map(result.data, function(profile) {
				return profile
			})
		}

		function extractDashboardMatches(result) {
			return extract(result)
		}

		function extractProfile(result) {
			return result.data
		}

		function extractProfilesList(result) {
			return {total_profiles: result.data.total_profiles, current_page: result.data.current_page, profiles: extract({data: result.data.profiles})}
		}

		function cacheGeoProfiles(result) {
			geoProfiles = extract(result)
			return geoProfiles
		}

		function cacheOnlineProfiles(result) {
			onlineProfiles = extract(result)
			return onlineProfiles
		}

		function cacheSearchProfiles(result) {
			// searchProfiles = extract(result);
			// return searchProfiles;
			return {total_profiles: result.data.total_profiles, profiles: extract({data: result.data.profiles})}
		}

		function formatFormLookingFor(data) {
			var lookingFor = []
			_.each(data, function(key, val) {
				if (key === true) {
			lookingFor.push(val)
		}
			})
			return lookingFor
		}
		model.getGuestProfiles = function() {
			var url = URLS.FETCH_GUEST_PROFILES
			return $http.get(url)
		}
		model.getGeoProfiles = function(lookingFor) {
			var url = URLS.FETCH_GEO_PROFILES
			if (lookingFor != undefined) {
				url += '/lookingFor/' + lookingFor
			}
			return (geoProfiles) ? $q.when(geoProfiles) : $http.get(url).then(cacheGeoProfiles)
		}

		model.getOnlineProfiles = function() {
			return (onlineProfiles) ? $q.when(onlineProfiles) : $http.get(URLS.FETCH_ONLINE_PROFILES).then(cacheOnlineProfiles)
		}

		model.getSearchProfiles = function(page, searchFilter, profilesPerPage, featured, isVideoProfilesSearch) {
			var url
			if (searchFilter.lookingFor) {
				searchFilter = _.cloneDeep(searchFilter)
				searchFilter.lookingFor = formatFormLookingFor(searchFilter.lookingFor)
			}
			if (featured) {
				url = URLS.FETCH_SEARCH_FEATURED_PROFILES + '/page/' + page + '/' + model.buildSearchQueryParams(searchFilter) + '&profilesPerPage=' + profilesPerPage
			} else if (isVideoProfilesSearch) {
				url = URLS.FETCH_SEARCH_VIDEO_PROFILES + '/page/' + page + '/' + model.buildSearchQueryParams(searchFilter) + '&profilesPerPage=' + profilesPerPage
			} else {
				url = URLS.FETCH_SEARCH_PROFILES + '/page/' + page + '/' + model.buildSearchQueryParams(searchFilter) + '&profilesPerPage=' + profilesPerPage
			}
			return (searchProfiles) ? $q.when(searchProfiles) : $http.get(url).then(cacheSearchProfiles)
		}

		model.getProfile = function(profileId, showVideo) {
			var url = URLS.FETCH_PROFILE.replace(':id', profileId)
			if (showVideo) {
				url += '?showVideo=' + showVideo
			}
			return $http.get(url).then(extractProfile)
		}

		model.getDashboardMatches = function() {
			return $http.post(URLS.POST_GET_DASHBOARD_MATCHES).then(extractDashboardMatches)
		}

		model.getProfilesList = function(page, type, count) {
			var url = URLS.GET_PROFILES_LIST[type] + '/page/' + page + '/count/' + count
			return $http.get(url).then(extractProfilesList)
		}

		model.sendMatch = function(profileId, matchStatus) {
			var data = {otherUserId: profileId}
			var url = URLS.POST_MATCH_REQUESTS[matchStatus]
			return $http.post(url, data)
		}

		model.setPrimaryImage = function(imageId) {
			var url = URLS.GET_SET_PRIMARY_IMAGE + '/id/' + imageId
			return $http.get(url)
		}

		model.togglePrivacy = function(imageId) {
			var url = URLS.TOGGLE_IMAGE_PRIVACY + '/id/' + imageId
			return $http.get(url)
		}

		model.deleteImage = function(imageId) {
			var url = URLS.GET_DELETE_IMAGE + '/id/' + imageId
			return $http.get(url)
		}

		model.moveImage = function(imageId, direction) {
			var url = URLS.GET_MOVE_IMAGE + '/id/' + imageId + '/direction/' + direction
			return $http.get(url)
		}

		model.setSafeMode = function() {
			return $http.get(URLS.GET_SET_SAFE_MODE)
		}

		model.changeRebill = function(changeRebill) {
			return $http.post(URLS.POST_REBILL_CHANGE, {enableRebill: changeRebill})
		}

		model.block = function(profileId) {
			return $http.post(URLS.POST_BLOCK_PROFILE, {id: profileId})
		}

		model.report = function(data) {
			return $http.post(URLS.POST_REPORT_PROFILE, data)
		}

		model.deleteAccount = function(data) {
			return $http.post(URLS.POST_DELETE_ACCOUNT, data)
		}

		model.sendPhotoRequest = function(data) {
			return $http.post(URLS.POST_PHOTO_REQUEST, data)
		}

		model.sendPrivatePhotoAccessRequest = function(data) {
			return $http.post(URLS.POST_PRIVATE_PHOTO_ACCESS_REQUEST, data)
		}

		model.togglePrivatePhotoAccess = function(data) {
			return $http.post(URLS.POST_TOGGLE_PRIVATE_PHOTO_ACCESS, data)
		}

		model.getPlayProfiles = function(profileId) {
			var url = profileId ? URLS.FETCH_PLAY_PROFILES + '/id/' + profileId : URLS.FETCH_PLAY_PROFILES
			return $http.get(url)
		}

		model.setPlayFilter = function(data) {
			return $http.post(URLS.POST_PLAY_SET_FILTER, data)
		}

		model.vote = function(data) {
			return $http.post(URLS.POST_VOTE_PROFILE, data)
		}

		model.getCountries = function() {
			return _.map(globalParams.countries, function(name, code) {
				return {code: code, name: name}
			})
		}

		model.getSearchCountries = function() {
			return _.map(globalParams.searchcountries, function(name, code) {
				return {code: code, name: name}
			})
		}

		model.getDistances = function(addWorldwide) {
			addWorldwide = addWorldwide || false
			var distances = [
				{id: 1, label: 'Only in the selected location'},
				{id: 15, label: '10 miles/ 15 km'},
				{id: 40, label: '25 miles/ 40 km'},
				{id: 80, label: '50 miles/ 80 km'},
				{id: 160, label: '100 miles/ 160 km'},
				{id: 400, label: '250 miles/ 400 km'},
				{id: 800, label: '500 miles/ 800 km'},
				{id: 1600, label: '1000 miles/ 1600 km'},
			]
			if (addWorldwide) {
				distances.push(
					{id: 20000, label: 'Worldwide'}
				)
			}
			return distances
		}

		model.getMinAges = function() {
			return ages
		}

		model.getMaxAges = function() {
			return _.clone(ages).reverse()
		}

		model.buildSearchQueryParams = function(filterParams) {
			var queryFilter = '?doSearch=true'
			_.each(filterParams, function(val, key) {
				if (key == 'searchRadius') {
					val = val.id
				}
				if (['withPhotos', 'isOnline'].indexOf(key) !== -1) {
					val = val == true ? 1 : 0
				}
				if (typeof val === 'object' && key != 'lookingFor') {
					Object.keys(val).forEach(function(classifierKey) {
						if (val[classifierKey]) {
							queryFilter += '&SearchForm[classifiers][' + key + '][]=' + classifierKey
						}
					})
				} else {
					queryFilter += '&SearchForm[' + key + ']=' + val
				}
			})
			return queryFilter
		}

		model.buildSearchParams = function(filterParams) {
			var filter = JSON.stringify(filterParams)
			return filter
		}

		model.parseSearchParams = function(filterParams) {
			try {
				return JSON.parse(filterParams)
			} catch (e) {
				return ''
			}
		}

		model.getContentWall = function(page) {
			var url = URLS.POST_GET_CONTENT_WALL + '/?page=' + page
			return $http.post(url).then(function(result) {
				return result
			})
		}
	})
	.factory('ProfileData', function(PROFILE_SETTINGS, GLOBALS, $filter) {
		return function ProfileData(attributes) {
			var p = this

			p.attributes = angular.copy(attributes)

			p.get = function(attr) {
				return p.attributes[attr]
			}

			if (attributes.reason) {
				//for bad profiles
				return null
			}

			p.set = function(attr, value) {
				return (p.attributes[attr] = value)
			}

			p.isOnline = function() {
				return !!p.get('online')
			}

			p.isPremium = function() {
				return p.get('membership') === 'premium'
			}

			p.getShortGender = function() {
				return p.get('genderText')[0]
			}

			p.getNumberGender = function() {
				return p.get('gender')
			}

			p.getPhotos = function() {
				return p.get('photos')
			}

			p.countPhotos = function() {
				return p.getPhotos().length
			}

			p.getPrivatePhotos = function() {
				return p.get('privatePhotos')
			}

			p.countPrivatePhotos = function() {
				return p.getPrivatePhotos().length
			}

			p.hasPhotos = function() {
				return p.countPhotos() > 0
			}

			p.hasPrivatePhotos = function() {
				return p.countPrivatePhotos() > 0
			}

			p.getAvatar = function() {
				return p.get('avatar')
			}

			p.getSmallPhoto = function(index) {
				return p.getPhotos()[index] ? p.getPhotos()[index].small : null
			}

			p.getMediumPhoto = function(index) {
				return p.getPhotos()[index].medium
			}

			p.getBigPhoto = function(index) {
				return p.getPhotos()[index].big
			}

			p.getPhotoID = function(index) {
				return p.getPhotos()[index].id
			}

			p.getPhotoCategory = function(index) {
				return p.getPhotos()[index].category
			}

			p.getSmallPrivatePhoto = function(index) {
				return p.getPrivatePhotos()[index] ? p.getPrivatePhotos()[index].small : null
			}

			p.getMediumPrivatePhoto = function(index) {
				return p.getPrivatePhotos()[index].medium
			}

			p.getBigPrivatePhoto = function(index) {
				return p.getPrivatePhotos()[index].big
			}

			p.getPrivatePhotoID = function(index) {
				return p.getPrivatePhotos()[index].id
			}

			p.getStringGeo = function() {
				return p.get('geo').join(',')
			}

			p.getDescription = function() {
				return p.get('info').description
			}

			p.getLookingForDescription = function() {
				return p.get('info').lookingForDescription
			}

			p.getFormattedBirthday = function() {
				var dates = p.get('birthday').split('-')
				return {
					day: parseInt(dates[2]),
					month: parseInt(dates[1]),
					year: parseInt(dates[0]),
				}
			}

			p.getEntitySelect = function(entity) {
				var oTemp = {}
				_.each(p.get('info')[entity], function(id) {
					oTemp[id] = true
				})
				return oTemp
			}

			p.getEntityText = function(entity) {
				var sTemp = ''
				_.each(p.get('info')[entity], function(id) {
					sTemp += PROFILE_SETTINGS[p.get('gender')][entity][id]
					sTemp += ', '
				})
				sTemp = sTemp.slice(0, -2)
				return sTemp
			}

			p.getLookingForSelect = function() {
				var lookingFor = {}
				_.each(p.get('info').lookingFor, function(gender) {
					lookingFor[gender] = true
				})
				return lookingFor
			}

			p.getLookingForText = function() {
				var lookingFor = ''
				_.each(p.get('info').lookingFor, function(gender) {
					lookingFor += PROFILE_SETTINGS[p.get('gender')].lookingFor[gender]
					lookingFor += ', '
				})
				lookingFor = lookingFor.slice(0, -2)
				return lookingFor
			}

			p.getSettingText = function(name) {
				var sText = PROFILE_SETTINGS[p.get('gender')][name] && p.get('info')[name] ? PROFILE_SETTINGS[p.get('gender')][name][p.get('info')[name]] : $filter('translate')('Ask me')
				return sText
			}

			p.getClassifierKey = function(name) {
				var key = p.get('info')[name]
				if (key == null) {
					key = _.findKey(PROFILE_SETTINGS[p.get('gender')][name], function(chr) {
						return chr.toLowerCase() == 'prefer not to say'
					})
					if (key == undefined) {
						key = _.findKey(PROFILE_SETTINGS[p.get('gender')][name], function() {
							return true
						})
					}
				}
				return key + ''
			}

			p.getProfileSettings = function() {
				var birthday = this.getFormattedBirthday()
				return {
					username: this.get('username'),
					locationText: this.get('location'),
					country: this.get('country'),
					city: this.get('city'),
					geo: this.getStringGeo(),
					selfDescription: this.getDescription(),
					lookingForDescription: this.getLookingForDescription(),
					birthday_day: birthday.day,
					birthday_month: birthday.month,
					birthday_year: birthday.year,
					LookingFor: this.getLookingForSelect(),
					LookingForWhat: this.getEntitySelect('LookingForWhat'),
					myCharacteristics: this.getEntitySelect('myCharacteristics'),
					favoriteActivities: this.getEntitySelect('favoriteActivities'),
					whatTurnsMeOn: this.getEntitySelect('whatTurnsMeOn'),
					height: this.getClassifierKey('height'),
					race: this.getClassifierKey('race'),
					religion: this.getClassifierKey('religion'),
					hairColor: this.getClassifierKey('hairColor'),
					eyeColor: this.getClassifierKey('eyeColor'),
					bodyType: this.getClassifierKey('bodyType'),
					profession: this.getClassifierKey('profession'),
					education: this.getClassifierKey('education'),
					smoking: this.getClassifierKey('smoking'),
					drinking: this.getClassifierKey('drinking'),
					maritalStatus: this.getClassifierKey('maritalStatus'),
					piercings: this.getClassifierKey('piercings'),
					tattoos: this.getClassifierKey('tattoos'),
					position: this.getClassifierKey('position'),
					exercise: this.getClassifierKey('exercise'),
					Pets: this.getClassifierKey('Pets'),
					sexSpot: this.getClassifierKey('sexSpot'),
					children: this.getClassifierKey('children'),
					budget: this.getClassifierKey('budget'),
					income: this.getClassifierKey('income'),
					netWorth: this.getClassifierKey('netWorth'),
					arrangementType: this.getClassifierKey('arrangementType'),
				}
			}

			p.getAccountSettings = function() {
				var result = {
					email: this.get('email'),
					disableAPs: this.get('disableAPs'),
				}

				if (this.get('separateUnsubscribe3rdPartyMails')) {
					result.receiveEmailNotificationsGroup = this.get('receiveEmailNotificationsGroup')
					result.receiveEmailProfileViewsGroup  = this.get('receiveEmailProfileViewsGroup')
					result.receive3rdPartyEmailGroup 	  = this.get('receive3rdPartyEmailGroup')
					result.receiveCupidEmailGroup 		  = this.get('receiveCupidEmailGroup')
				} else {
					result.emailNotificationType    = this.get('emailNotificationType')
					result.receiveProfileViewsEmail = this.get('receiveProfileViewsEmail')
					result.receive3rdPartyEmail     = this.get('receive3rdPartyEmail')
					result.receiveCupidEmail        = this.get('receiveCupidEmail')
				}

				return result
			}
		}
	})
	.constant('PROFILE_SETTINGS', globalParams.classifiers)
	.constant('COUNTRY_LIST', globalParams.countries)

