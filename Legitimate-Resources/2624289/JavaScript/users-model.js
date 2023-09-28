angular.module('dating.models.users', [
	])
	.service('UsersModel', function($http, $q) {
		var model = this,
			URLS = {
				POST_USERS_SIGNUP: '/registration/save',
				GET_TIMESTAMP: '/registration/getTimestamp',
				POST_USERS_SIGNIN: '/site/signin',
				POST_USER_PASSWORD: '/resetPassword/processRequest',
				POST_UPDATE_USER_PASSWORD: '/resetPassword/save',
				POST_STEP_1: '/registration/justRegistered',
				POST_STEP_2: '/registration/uploadStep',
				POST_PROFILE_SETTINGS: '/profile/save',
				POST_ACCOUNT_SETTINGS: '/profile/saveSettings',
				POST_CHANGE_USERNAME: '/profile/changeUsername',
				POST_CHANGE_LOCATION: '/profile/changeLocation',
				AFFILIATE_ONE_CLICK: {
					POST_STEP_1: '/oneClick/affiliateStepOne',
					POST_STEP_2: '/oneClick/affiliateStepTwo',
					POST_STEP_3: '/oneClick/affiliateStepThree',
				},
				ONE_CLICK_POST: '/registration/oneClick',
				NOTIFICATION: {
					POST_RESEND_EMAIL: '/site/resendWelcomeEmail',
					POST_SAVE_EMAIL: '/site/saveEmailAddress',
				},
			},
			days = [],
			months = [],
			years = []


		function formatFormBirthday(data) {
			return {day: _.padStart(data.birthday_day, 2, 0), month: _.padStart(data.birthday_month, 2, 0), year: _.padStart(data.birthday_year, 2, 0)}
		}

		function formatFormLookingFor(data) {
			var lookingFor = []
			_.each(data.LookingFor, function(key, val) {
				if (key === true) {
lookingFor.push(val)
}
			})
			return lookingFor
		}

		function formatFormEntity(data, entity) {
			var tempArray = []
			_.each(data[entity], function(key, val) {
				if (key === true) {
tempArray.push(val)
}
			})
			return tempArray
		}

		model.getBirthdayDays = function() {
			if (!days.length) {
days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
}
			return days
		}

		model.getBirthdayMonths = function() {
			if (!months.length) {
months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}
			return months
		}

		model.getBirthdayYears = function() {
			if (!years.length) {
				var maxYear = globalParams.year - 18
				var listYears = []
				for (var i = maxYear; i >= 1920; i--) {
					listYears.push(i)
				}
				years = listYears
			}
			return years
		}

		model.getGenders = function() {
			var tempArray = []
			_.each(globalParams.genders, function(item, key) {
				tempArray.push({id: key, type: item})
			})
			return tempArray
		}

		model.getLookingForGenders = function(gender) {
			gender = (typeof gender !== 'undefined') ? gender : 2
			var tempArray = []
			_.each(globalParams.classifiers[gender].lookingFor, function(item, key) {
				tempArray.push({id: key, type: item})
			})
			return tempArray
		}

		model.getEntitiesArray = function(entity, gender) {
			gender = (typeof gender !== 'undefined') ? gender : 2
			var tempArray = []
			_.each(globalParams.classifiers[gender][entity], function(item, key) {
				tempArray.push({id: key, type: item})
			})
			return tempArray
		}

		model.getArrangementTypes = function(gender) {
			gender = (typeof gender !== 'undefined') ? gender : 2
			var tempArray = []
			_.each(globalParams.classifiers[gender].arrangementType, function(item, key) {
				tempArray.push({id: key, type: item})
			})
			return tempArray
		}

		model.signUp = function(user) {
			if (user) {
user.birthday = {day: _.padStart(user.birthday_day, 2, 0), month: _.padStart(user.birthday_month, 2, 0), year: _.padStart(user.birthday_year, 2, 0)}
}
			return $http.post(URLS.POST_USERS_SIGNUP, user)
		}

		model.getTimestamp = function() {
			return $http.get(URLS.GET_TIMESTAMP)
		}

		model.signIn = function(user) {
			return $http.post(URLS.POST_USERS_SIGNIN, user)
		}

		model.resetPassword = function(user) {
			return $http.post(URLS.POST_USER_PASSWORD, user)
		}

		model.updatePassword = function(user) {
			return $http.post(URLS.POST_UPDATE_USER_PASSWORD, user)
		}

		model.saveSettings = function(user) {
			return $http.post(URLS.POST_STEP_1, user)
		}

		model.saveAffiliateStep1Settings = function(user) {
			user = _.cloneDeep(user)
			if (user) {
				user.birthday = formatFormBirthday(user)
			}
			return $http.post(URLS.AFFILIATE_ONE_CLICK.POST_STEP_1, user)
		}

		model.saveAffiliateStep2Settings = function(user) {
			return $http.post(URLS.AFFILIATE_ONE_CLICK.POST_STEP_2, user)
		}

		model.saveAffiliateStep3Settings = function(user) {
			return $http.post(URLS.AFFILIATE_ONE_CLICK.POST_STEP_3, user)
		}

		model.saveOneClickSettings = function(user) {
			return $http.post(URLS.ONE_CLICK_POST, user)
		}

		model.saveDescription = function(user) {
			return $http.post(URLS.POST_STEP_2, user)
		}

		model.saveProfileSettings = function(profile) {
			profile = _.cloneDeep(profile)
			if (profile) {
				profile.birthday = formatFormBirthday(profile)
				profile.LookingFor = formatFormLookingFor(profile)
				profile.LookingForWhat = formatFormEntity(profile, 'LookingForWhat')
				profile.myCharacteristics = formatFormEntity(profile, 'myCharacteristics')
				profile.favoriteActivities = formatFormEntity(profile, 'favoriteActivities')
				profile.whatTurnsMeOn = formatFormEntity(profile, 'whatTurnsMeOn')
			}
			return $http.post(URLS.POST_PROFILE_SETTINGS, profile)
		}

		model.saveAccountSettings = function(profile) {
			profile = _.cloneDeep(profile)
			return $http.post(URLS.POST_ACCOUNT_SETTINGS, profile)
		}

		model.saveNotificationSettings = function(profile) {
			profile = _.cloneDeep(profile)
			profile.onlyNotifications = true
			return $http.post(URLS.POST_ACCOUNT_SETTINGS, profile)
		}

		model.saveEmailPassSettings = function(profile) {
			profile = _.cloneDeep(profile)
			profile.onlyEmailPass = true
			return $http.post(URLS.POST_ACCOUNT_SETTINGS, profile)
		}

		model.saveUsername = function(profile) {
			profile = _.cloneDeep(profile)
			return $http.post(URLS.POST_CHANGE_USERNAME, profile)
		}

		model.saveLocation = function(profile) {
			profile = _.cloneDeep(profile)
			return $http.post(URLS.POST_CHANGE_LOCATION, profile)
		}

		model.resendEmail = function() {
			return $http.post(URLS.NOTIFICATION.POST_RESEND_EMAIL)
		}

		model.changeEmail = function(data) {
			return $http.post(URLS.NOTIFICATION.POST_SAVE_EMAIL, data)
		}

	})

