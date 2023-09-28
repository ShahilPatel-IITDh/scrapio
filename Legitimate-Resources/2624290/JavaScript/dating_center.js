angular.module('pages.datingCenter', [
	'dating.models.pages',
	'dating.models.profiles',
	'dating.models.users',
	'dating.models.locations',
	'authBox',
	'Dating',
])
	.config(function($stateProvider) {
		$stateProvider
			.state('dating.pages.datingCenter', {
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'DatingCenterCtrl as datingCenterCtrl',
						templateUrl: globalParams.templateUrls.pages.dating_center,
					},
				},
			})
			.state('dating.pages.sugarDaddy', {
				url: 'sugardaddy',
				views: {
					'sections@': {
						controller: 'DatingCenterCtrl as datingCenterCtrl',
						templateUrl: globalParams.templateUrls.pages.sugardaddy,
					},
				},
			})
			.state('dating.pages.sugarBaby', {
				url: 'sugarbaby',
				views: {
					'sections@': {
						controller: 'DatingCenterCtrl as datingCenterCtrl',
						templateUrl: globalParams.templateUrls.pages.sugarbaby,
					},
				},
			})

	})
	.controller('DatingCenterCtrl', function($timeout, $state, PagesModel, ProfilesModel, UsersModel, LocationsModel, showSignUpBox, GLOBALS, authService, UpdatesModel, showSignInBox) {
		if (authService.isAuthenticated) {
			$state.go('dating.pages.dashboard')
		}
		var datingCenterCtrl = this

		PagesModel.setCurrentPage('DatingCenter')

		if (GLOBALS.parentSite == 'xpickupresponsive') {
			PagesModel.setCurrentPage('Landing' + GLOBALS.siteShortName)
		}

		if ($state.current.name.indexOf('sugarDaddy') !== -1) {
			PagesModel.setCurrentPage('SugarDaddy')
		}

		if ($state.current.name.indexOf('sugarBaby') !== -1) {
			PagesModel.setCurrentPage('SugarBaby')
		}
		var imagesUrl = GLOBALS.baseUrl + '/styles/images/'

		datingCenterCtrl.tips = [
			{
				title: 'Engage with people immediately:',
				tip1: 'Read & post status updates on the feed;',
				tip2: 'Instantly message anyone and start hitting it off;',
				subtitle: '',
				img: imagesUrl + 'first-tip.jpg',
			},
			{
				title: 'Do you like someone?',
				tip1: 'Let him/her know what you\'re looking for;',
				tip2: 'Flirt with him/her;',
				subtitle: '',
				img: imagesUrl + 'second-tip.jpg',
			},
			{
				title: 'Find sexy people near you:',
				tip1: 'Browse all profiles near you;',
				tip2: 'Play our game to find the perfect match;',
				subtitle: '',
				img: imagesUrl + 'third-tip.jpg',
			},
			{
				title: 'Show yourself a little bit:',
				tip1: 'Upload a photo;',
				tip2: 'Fill out your profile;',
				subtitle: 'To increase your chance of finding that special \n' + 'someone, you need to show yourself!',
				img: imagesUrl + 'forth-tip.jpg',
			},
		]
		datingCenterCtrl.loadGuestProfiles = +GLOBALS.featureToggles.loadGuestProfiles

		if (datingCenterCtrl.loadGuestProfiles) {
			ProfilesModel.getGuestProfiles().then(function(result) {
				datingCenterCtrl.guestProfilesList = result.data.profiles
			})
		}
		if (_.indexOf(GLOBALS.showOnGuestPage, 'city') > -1) {
			LocationsModel.getCurrent().then(function(result) {
				datingCenterCtrl.currentCity = result.data.city
				datingCenterCtrl.currentCountry = result.data.country
			})
		}
		if (_.indexOf(GLOBALS.showOnGuestPage, 'onlineMembers') > -1) {
			ProfilesModel.getOnlineProfiles().then(function(result) {
				datingCenterCtrl.onlineProfiles = result
			})
		}
		if (_.indexOf(GLOBALS.showOnGuestPage, 'geoMembers') > -1) {
			ProfilesModel.getGeoProfiles().then(function(result) {
				datingCenterCtrl.geoProfiles = result
			})
		}
		if (_.indexOf(GLOBALS.showOnGuestPage, 'onlineNow') > -1) {
			ProfilesModel.getProfilesList(0, 'online-now', GLOBALS.loadOnDatingCenter.onlineGuestPage).then(function(result) {
				datingCenterCtrl.oProfiles = result.profiles
			})
		}
		if (_.indexOf(GLOBALS.showOnGuestPage, 'newMembers') > -1) {
			ProfilesModel.getProfilesList(0, 'new-members', GLOBALS.loadOnDatingCenter.newMemberGuestPage).then(function(result) {
				datingCenterCtrl.newProfiles = result.profiles
			})
		}

		function onlyUnique(value, index, self) {
			return self.indexOf(value) === index
		}

		function signUpUser() {
			UsersModel.signUp(datingCenterCtrl.newUser)
				.error(function(result) {
					datingCenterCtrl.errors = result
					if (datingCenterCtrl.errors.email) {
						datingCenterCtrl.errors.email = datingCenterCtrl.errors.email.filter(onlyUnique)
					}
				})
				.then(function(result) {
					datingCenterCtrl.errors = null
					window.location.href = '/'
				})
		}
		datingCenterCtrl.siteDomain = GLOBALS.siteDomain
		datingCenterCtrl.siteName = GLOBALS.siteName
		datingCenterCtrl.isExternalUpgradeSite = parseInt(GLOBALS.isExternalUpgradeSite)
		datingCenterCtrl.nProfileInsteadOfLprofile = GLOBALS.nProfileInsteadOfLprofile
		datingCenterCtrl.imagesUrl = GLOBALS.baseUrl + '/styles/images/'
		datingCenterCtrl.isCreditsSite = parseInt(GLOBALS.isCreditsSite)
		datingCenterCtrl.days = UsersModel.getBirthdayDays()
		datingCenterCtrl.months = UsersModel.getBirthdayMonths()
		datingCenterCtrl.years = UsersModel.getBirthdayYears()
		datingCenterCtrl.getCurrentPage = function() {
			return PagesModel.getCurrentPage()
		}

		datingCenterCtrl.signUpUser = signUpUser
		datingCenterCtrl.currentCity = null
		datingCenterCtrl.cupidMail = GLOBALS.cupidDomain
		datingCenterCtrl.showBirthdayFieldsInUsFormat = GLOBALS.showBirthdayFieldsInUsFormat

		datingCenterCtrl.defaultBirthday = {
			day: parseInt(GLOBALS.defaultBirthDay.day),
			month: parseInt(GLOBALS.defaultBirthDay.month),
			year: parseInt(GLOBALS.defaultBirthDay.year),
		}
		datingCenterCtrl.showSignUpBox = showSignUpBox
		datingCenterCtrl.showSignInBox = showSignInBox

		datingCenterCtrl.scrollDown = function() {
			$('html, body').animate(
				{scrollTop: $(window).height()}, 300
			)
		}
		function getNextDigit(digit) {
			return digit < 9 ? digit + 1 : 0
		}
		function random(a, b) {
			return a + Math.floor(Math.random() * (b - a))
		}

		function animateDigit(digitId) {
			if (digitId < 0 || digitId > 6) {
				return
			}
			var ms = 1200
			var digit = datingCenterCtrl.aDigits[digitId]
			datingCenterCtrl.cnt++
			if (digit === 9) {
				$timeout(function() {
					animateDigit(digitId - 1)
				}, parseInt(ms / 2))
			}
			var currentNode = $('#digit' + digitId)
			currentNode.addClass('top-up')
			$timeout(function() {
				datingCenterCtrl.aDigits[digitId] = getNextDigit(digit)
				datingCenterCtrl.cnt--
				currentNode.removeClass('top-up')
			}, ms)
		}

		function displayCounterMembers() {
			var sec = random(5, 15)
			if ($('#counter-digits').length) {
				$timeout(function() {
					displayCounterMembers()
				}, sec * 1000)

				if (datingCenterCtrl.cnt === 0) {
					animateDigit(6)
				}
			}
		}

		if (['discreetcrush', 'steamyplay'].indexOf(GLOBALS.parentSite) !== -1) {
			var aDigits
			if (typeof GLOBALS.aDigits !== 'undefined') {
				aDigits = GLOBALS.aDigits
			} else {
				var nMembers = 1700000 + random(0, 99999)
				aDigits = []
				while (nMembers) {
					aDigits.push(nMembers % 10)
					nMembers = Math.floor(nMembers / 10)
				}
				aDigits.reverse()
				GLOBALS.aDigits = aDigits
			}
			datingCenterCtrl.aDigits = aDigits
			datingCenterCtrl.cnt = 0
			datingCenterCtrl.getNextDigit = getNextDigit
			displayCounterMembers()
		}

		datingCenterCtrl.toggleSignInForm = function() {
			datingCenterCtrl.showSignInForm = !datingCenterCtrl.showSignInForm
		}

		var date = new Date()
		var day = formatDateNum(date.getDate())
		var month = formatDateNum(date.getMonth() + 1)
		var year = date.getFullYear()

		function formatDateNum(num) {
			if (num.toString().length < 2) {
				return '0' + num
			}
			return num
		}

		datingCenterCtrl.date = day + '-' + month + '-' + year
	})

