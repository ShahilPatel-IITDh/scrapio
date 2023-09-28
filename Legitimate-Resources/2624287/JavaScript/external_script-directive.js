/* global ExoLoader, ad_idzone:writable, ad_width:writable, ad_height:writable, ad_sub:writable, ad_sub2:writable, ad_sub3:writable */
/* exported ExoLoader, ad_idzone, ad_width, ad_height, ad_sub, ad_sub2, ad_sub3 */
angular.module('dating.directives.externalScript', [
])
	.controller('ExternalScriptCtrl', function($sce, $scope, $timeout, $location, $window, GLOBALS, authService, PagesModel, sharedData, $rootScope, addTapAndHold, TrackModel) {
		var externalScriptCtrl = this
		externalScriptCtrl.isLoggedIn           = authService.isAuthenticated
		externalScriptCtrl.currentUser          = authService.currentUser
		externalScriptCtrl.isSafeMode           = authService.isAuthenticated ? !!authService.currentUser.safeMode : true
		externalScriptCtrl.isAdblockEnabled     = false
		externalScriptCtrl.shiftAdblockTraffic  = GLOBALS.shiftAdblockTraffic
		externalScriptCtrl.advertisement        = GLOBALS.advertisement
		externalScriptCtrl.exoSubParamsCheck    = GLOBALS.userInfo.exoSubParams && GLOBALS.userInfo.exoSubParams.sub2
		externalScriptCtrl.adniumSubParamsCheck = GLOBALS.userInfo.adniumSubParams && GLOBALS.userInfo.adniumSubParams.s1
		externalScriptCtrl.goAdserverSubParamsCheck = GLOBALS.userInfo.goAdserverSubParams && GLOBALS.userInfo.goAdserverSubParams.subid
		externalScriptCtrl.projectId = GLOBALS.projectId ? ('&wlkw=' + GLOBALS.projectId) : ''
		externalScriptCtrl.showAdvertisementLabel =  GLOBALS.markAdvert && GLOBALS.userInfo.isRootTraffic
		externalScriptCtrl.featureToggles = GLOBALS.featureToggles
		externalScriptCtrl.unitedStatesUser = (externalScriptCtrl.currentUser) ? externalScriptCtrl.currentUser.locationCountryCode === 'US' : false
		externalScriptCtrl.isLegacyToAngular = GLOBALS.isLegacyToAngular
		externalScriptCtrl.USbannerTrafficAdnium = GLOBALS.showAdniumUSTraffic && !GLOBALS.isLegacyToAngular && externalScriptCtrl.unitedStatesUser
		externalScriptCtrl.shouldLoadInIFrame = true


		var goAdServerProvider =  2
		var adniumProvider =  1
		var exoProvider = 0

		ExoLoader.getDetector().detectCensorship(function(block) {
			if (block) {
				externalScriptCtrl.isAdblockEnabled = true
			}
		})
		if (!externalScriptCtrl.isLoggedIn) {
			externalScriptCtrl.exoSubParamsCheck = sharedData.exoSubData && sharedData.exoSubData.sub2
			externalScriptCtrl.adniumSubParamsCheck = sharedData.adniumSubData && sharedData.adniumSubData.s1
		}
		if (externalScriptCtrl.exoSubParamsCheck) {
			externalScriptCtrl.exoSub2         = externalScriptCtrl.isLoggedIn ? externalScriptCtrl.currentUser.exoSubParams.sub2 : sharedData.exoSubData.sub2
			externalScriptCtrl.exoSub3         = externalScriptCtrl.isLoggedIn ? externalScriptCtrl.currentUser.exoSubParams.sub3 : sharedData.exoSubData.sub3
			externalScriptCtrl.exoSubUrlParams = '&sub2=' + externalScriptCtrl.exoSub2 + '&sub3=' + externalScriptCtrl.exoSub3
		}

		if (externalScriptCtrl.goAdserverSubParamsCheck) {
			externalScriptCtrl.goAdserverSid1         = externalScriptCtrl.isLoggedIn ? externalScriptCtrl.currentUser.goAdserverSubParams.sid1 : sharedData.goAdserverSubData.sid1
			externalScriptCtrl.goAdserverSid2         = externalScriptCtrl.isLoggedIn ? externalScriptCtrl.currentUser.goAdserverSubParams.sid2 : sharedData.goAdserverSubData.sid2
		}

		externalScriptCtrl.iframeUrl = '//ads.exosrv.com/iframe.php?idzone='

		if (externalScriptCtrl.scriptType.indexOf('unsubscribe-') > -1) {
			externalScriptCtrl.isSafeMode = sharedData.safeMode
		}

		setBannersConfig()

		// refresh banners in every 10 seconds with activity for DC cluster, for standard users only
		if (+externalScriptCtrl.featureToggles.refreshBanners
			//  external script is loaded twice - for every external script tag loaded; this check is used to prevent activity monitor not to load twice
			&& (externalScriptCtrl.scriptType === 'desktop-footer-zone' || externalScriptCtrl.scriptType === 'mobile-footer-zone')
			&& (externalScriptCtrl.currentUser && externalScriptCtrl.currentUser.membership === 'standard')) {
			monitorActivity()
		}

		function getAdniumDataZone(idZone) {
			var result = null
			try {
				result = idZone.split('&')[0].split('=')[1]
			} catch (err) {
				return result
			}
			return result
		}

		function setBannersConfig() {
			if (externalScriptCtrl.scriptType === 'desktop-center-cube') {
				if (+externalScriptCtrl.advertisement.desktopCenterCubesZonesProvider === goAdServerProvider && externalScriptCtrl.advertisement.desktopCenterCubesZonesGoAdserver){
					externalScriptCtrl.shouldLoadInIFrame = false
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopCenterCubesZonesGoAdserver.safeModeUrl :
						externalScriptCtrl.advertisement.desktopCenterCubesZonesGoAdserver.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopCenterCubesZonesGoAdserver.safeMode :
						externalScriptCtrl.advertisement.desktopCenterCubesZonesGoAdserver.normal
					externalScriptCtrl.controllerIdGoAdserver = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.controllerIdGoAdserver.safeMode :
						externalScriptCtrl.advertisement.controllerIdGoAdserver.normal
				}
				else if (+externalScriptCtrl.advertisement.desktopCenterCubesZonesProvider === adniumProvider && externalScriptCtrl.advertisement.desktopCenterCubesZonesAdnium &&
					(externalScriptCtrl.USbannerTrafficAdnium || (externalScriptCtrl.shiftAdblockTraffic  || !externalScriptCtrl.isAdblockEnabled))) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopCenterCubesZonesAdnium.safeModeUrl :
						externalScriptCtrl.advertisement.desktopCenterCubesZonesAdnium.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopCenterCubesZonesAdnium.safeMode :
						externalScriptCtrl.advertisement.desktopCenterCubesZonesAdnium.normal
					externalScriptCtrl.adniumDataZone = getAdniumDataZone(externalScriptCtrl.idzone)

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&size=300x250' + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}
				} else if (externalScriptCtrl.advertisement.desktopCenterCubesZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopCenterCubesZonesExoClick.safeModeUrl :
						externalScriptCtrl.advertisement.desktopCenterCubesZonesExoClick.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopCenterCubesZonesExoClick.safeMode :
						externalScriptCtrl.advertisement.desktopCenterCubesZonesExoClick.normal

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&size=300x250')

					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&size=300x250&sub=' + externalScriptCtrl.idzone + externalScriptCtrl.exoSubUrlParams)
					}
				}
			}

			if (externalScriptCtrl.scriptType === 'search-native-zone') {
				externalScriptCtrl.shouldLoadInIFrame = true
				if (+externalScriptCtrl.advertisement.generalSearchNativeZonesProvider === adniumProvider && externalScriptCtrl.advertisement.generalSearchNativeZonesAdnium) {
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.generalSearchNativeZonesAdnium.safeModeUrl : externalScriptCtrl.advertisement.generalSearchNativeZonesAdnium.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.generalSearchNativeZonesAdnium.safeMode : externalScriptCtrl.advertisement.generalSearchNativeZonesAdnium.normal
				}

				if (+externalScriptCtrl.advertisement.generalSearchNativeZonesProvider === exoProvider && externalScriptCtrl.advertisement.generalSearchNativeZonesExoClick) {
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.generalSearchNativeZonesExoClick.safeModeUrl : externalScriptCtrl.advertisement.generalSearchNativeZonesExoClick.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.generalSearchNativeZonesExoClick.safeMode : externalScriptCtrl.advertisement.generalSearchNativeZonesExoClick.normal
				}

				externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl)
			}

			if (externalScriptCtrl.scriptType === 'mobile-header-zone')  {
				if (+externalScriptCtrl.advertisement.mobileHeaderZonesProvider === goAdServerProvider && externalScriptCtrl.advertisement.mobileHeaderZonesGoAdserver){
					externalScriptCtrl.shouldLoadInIFrame = false
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileHeaderZonesGoAdserver.safeModeUrl :
						externalScriptCtrl.advertisement.mobileHeaderZonesGoAdserver.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileHeaderZonesGoAdserver.safeMode :
						externalScriptCtrl.advertisement.mobileHeaderZonesGoAdserver.normal
					externalScriptCtrl.controllerIdGoAdserver = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.controllerIdGoAdserver.safeMode :
						externalScriptCtrl.advertisement.controllerIdGoAdserver.normal
				} else if (+externalScriptCtrl.advertisement.mobileHeaderZonesProvider === adniumProvider &&
					(externalScriptCtrl.USbannerTrafficAdnium || !externalScriptCtrl.isAdblockEnabled) &&
					externalScriptCtrl.advertisement.mobileHeaderZonesAdnium) {
					externalScriptCtrl.shouldLoadInIFrame = true

					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileHeaderZonesAdnium.safeModeUrl :
						externalScriptCtrl.advertisement.mobileHeaderZonesAdnium.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileHeaderZonesAdnium.safeMode :
						externalScriptCtrl.advertisement.mobileHeaderZonesAdnium.normal

					externalScriptCtrl.adniumDataZone = getAdniumDataZone(externalScriptCtrl.idzone)

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&s2=' + externalScriptCtrl.adniumSubParamsCheck  + externalScriptCtrl.projectId)
					}
				} else if (externalScriptCtrl.advertisement.mobileHeaderZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileHeaderZonesExoClick.safeModeUrl :
						externalScriptCtrl.advertisement.mobileHeaderZonesExoClick.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileHeaderZonesExoClick.safeMode :
						externalScriptCtrl.advertisement.mobileHeaderZonesExoClick.normal

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&size=300x100')

					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&size=300x100&sub=' + externalScriptCtrl.idzone + externalScriptCtrl.exoSubUrlParams)
					}
				}
				if (externalScriptCtrl.showAdvertisementLabel) {
					$(document).ready(function() {
						addTapAndHold('mark-header-zone')
					})

				}
			}

			if (externalScriptCtrl.scriptType === 'mobile-footer-zone') {
				if (+externalScriptCtrl.advertisement.mobileFooterZonesProvider === goAdServerProvider && externalScriptCtrl.advertisement.mobileFooterZonesGoAdserver){
					externalScriptCtrl.shouldLoadInIFrame = false
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileFooterZonesGoAdserver.safeModeUrl :
						externalScriptCtrl.advertisement.mobileFooterZonesGoAdserver.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileFooterZonesGoAdserver.safeMode :
						externalScriptCtrl.advertisement.mobileFooterZonesGoAdserver.normal
					externalScriptCtrl.controllerIdGoAdserver = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.controllerIdGoAdserver.normal :
						externalScriptCtrl.advertisement.controllerIdGoAdserver.safeMode
				} else if (+externalScriptCtrl.advertisement.mobileFooterZonesProvider === adniumProvider &&
					(externalScriptCtrl.USbannerTrafficAdnium || !externalScriptCtrl.isAdblockEnabled) &&
					externalScriptCtrl.advertisement.mobileFooterZonesAdnium) {

					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileFooterZonesAdnium.safeModeUrl :
						externalScriptCtrl.advertisement.mobileFooterZonesAdnium.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode
						? externalScriptCtrl.advertisement.mobileFooterZonesAdnium.safeMode
						: externalScriptCtrl.advertisement.mobileFooterZonesAdnium.normal

					externalScriptCtrl.adniumDataZone = getAdniumDataZone(externalScriptCtrl.idzone)

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}

				} else if (externalScriptCtrl.advertisement.mobileFooterZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileFooterZonesExoClick.safeModeUrl :
						externalScriptCtrl.advertisement.mobileFooterZonesExoClick.normalUrl
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode
						? externalScriptCtrl.advertisement.mobileFooterZonesExoClick.safeMode
						: externalScriptCtrl.advertisement.mobileFooterZonesExoClick.normal

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&size=300x250')

					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&size=300x250&sub=' + externalScriptCtrl.idzone + externalScriptCtrl.exoSubUrlParams)
					}
				}
				if (externalScriptCtrl.showAdvertisementLabel) {
					$(document).ready(function() {
						addTapAndHold('mobile-marketing-zone')
					})
				}
			}

			if (externalScriptCtrl.scriptType === 'desktop-footer-zone') {
				if (+externalScriptCtrl.advertisement.desktopFooterZonesProvider === goAdServerProvider && externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver){
					externalScriptCtrl.shouldLoadInIFrame = false
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.safeModeUrl : externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.normalUrl
					externalScriptCtrl.idzoneLeft = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.safeModeLeft : externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.normalLeft
					externalScriptCtrl.idzoneMiddle = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.safeModeMiddle : externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.normalMiddle
					externalScriptCtrl.idzoneRight = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.safeModeRight : externalScriptCtrl.advertisement.desktopFooterZonesGoAdserver.normalRight
					externalScriptCtrl.controllerIdGoAdserver = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.controllerIdGoAdserver.safeMode : externalScriptCtrl.advertisement.controllerIdGoAdserver.normal

				} else if (+externalScriptCtrl.advertisement.desktopFooterZonesProvider === adniumProvider &&
					(externalScriptCtrl.USbannerTrafficAdnium || !externalScriptCtrl.isAdblockEnabled) &&
					externalScriptCtrl.advertisement.desktopFooterZonesAdnium) {

					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesAdnium.safeModeUrl : externalScriptCtrl.advertisement.desktopFooterZonesAdnium.normalUrl
					externalScriptCtrl.idzoneLeft = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesAdnium.safeModeLeft : externalScriptCtrl.advertisement.desktopFooterZonesAdnium.normalLeft
					externalScriptCtrl.idzoneMiddle = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesAdnium.safeModeMiddle : externalScriptCtrl.advertisement.desktopFooterZonesAdnium.normalMiddle
					externalScriptCtrl.idzoneRight = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesAdnium.safeModeRight : externalScriptCtrl.advertisement.desktopFooterZonesAdnium.normalRight

					externalScriptCtrl.adniumDataZoneLeft = getAdniumDataZone(externalScriptCtrl.idzoneLeft)
					externalScriptCtrl.adniumDataZoneMiddle = getAdniumDataZone(externalScriptCtrl.idzoneMiddle)
					externalScriptCtrl.adniumDataZoneRight = getAdniumDataZone(externalScriptCtrl.idzoneRight)

					externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + externalScriptCtrl.projectId)
					externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneMiddle + externalScriptCtrl.projectId)
					externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
						externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneMiddle + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
						externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}

				} else if (externalScriptCtrl.advertisement.desktopFooterZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesExoClick.safeModeUrl : externalScriptCtrl.advertisement.desktopFooterZonesExoClick.normalUrl
					externalScriptCtrl.idzoneLeft = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesExoClick.safeModeLeft : externalScriptCtrl.advertisement.desktopFooterZonesExoClick.normalLeft
					externalScriptCtrl.idzoneMiddle = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesExoClick.safeModeMiddle : externalScriptCtrl.advertisement.desktopFooterZonesExoClick.normalMiddle
					externalScriptCtrl.idzoneRight = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopFooterZonesExoClick.safeModeRight : externalScriptCtrl.advertisement.desktopFooterZonesExoClick.normalRight

					externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + '&size=300x250')
					externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneMiddle + '&size=300x250')
					externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + '&size=300x250')

					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + '&s2=' + externalScriptCtrl.adniumSubParamsCheck)
						externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneMiddle + '&s2=' + externalScriptCtrl.adniumSubParamsCheck)
						externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + '&s2=' + externalScriptCtrl.adniumSubParamsCheck)
					}
				}
			}

			if (externalScriptCtrl.scriptType === 'desktop-popunder-zone') {
				externalScriptCtrl.shouldLoadInIFrame = true
				if (externalScriptCtrl.advertisement.desktopPopUnderZones) {
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopPopUnderZones.safeMode : externalScriptCtrl.advertisement.desktopPopUnderZones.normal
				}
			}

			if (externalScriptCtrl.scriptType === 'mobile-popunder-zone') {
				externalScriptCtrl.shouldLoadInIFrame = true
				if (externalScriptCtrl.advertisement.mobilePopUnderZones) {
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.mobilePopUnderZones.safeMode : externalScriptCtrl.advertisement.mobilePopUnderZones.normal
				}
			}

			if (externalScriptCtrl.scriptType === 'unsubscribe-skyscraper') {
				if (+externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesProvider === adniumProvider &&
					!externalScriptCtrl.isAdblockEnabled &&
					externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesAdnium) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesAdnium.safeMode :
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesAdnium.normal
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesAdnium.safeModeUrl :
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesAdnium.normalUrl

					externalScriptCtrl.adniumDataZone = getAdniumDataZone(externalScriptCtrl.idzone)

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}

				} else if (externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesExoClick.safeMode :
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesExoClick.normal
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesExoClick.safeModeUrl :
						externalScriptCtrl.advertisement.generalUnsubscribeSkyscrapersZonesExoClick.normalUrl

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl +  '/iframe.php?idzone=' + externalScriptCtrl.idzone + '&size=160x600')
					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl +  '/iframe.php?idzone=' + externalScriptCtrl.idzone + '&size=300x250&sub=' + externalScriptCtrl.idzone + externalScriptCtrl.exoSubUrlParams)
					}
				}
				TrackModel.adTrackEvent(10, 1)
			}

			if (externalScriptCtrl.scriptType === 'unsubscribe-desktop-footer-zone') {
				if (+externalScriptCtrl.advertisement.desktopUnsubscribeZonesProvider === adniumProvider &&
					!externalScriptCtrl.isAdblockEnabled &&
					externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium) {

					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzoneLeft = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.safeModeLeft : externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.normalLeft
					externalScriptCtrl.idzoneMiddle = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.safeModeMiddle : externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.normalMiddle
					externalScriptCtrl.idzoneRight = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.safeModeRight : externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.normalRight
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.safeModeUrl : externalScriptCtrl.advertisement.desktopUnsubscribeZonesAdnium.normalUrl

					externalScriptCtrl.adniumDataZoneLeft = getAdniumDataZone(externalScriptCtrl.idzoneLeft)
					externalScriptCtrl.adniumDataZoneMiddle = getAdniumDataZone(externalScriptCtrl.idzoneMiddle)
					externalScriptCtrl.adniumDataZoneRight = getAdniumDataZone(externalScriptCtrl.idzoneRight)

					externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + externalScriptCtrl.projectId)
					externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneMiddle + externalScriptCtrl.projectId)
					externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
						externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneMiddle + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
						externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}
				} else if (externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick) {

					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzoneLeft = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.safeModeLeft : externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.normalLeft
					externalScriptCtrl.idzoneMiddle = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.safeModeMiddle : externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.normalMiddle
					externalScriptCtrl.idzoneRight = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.safeModeRight : externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.normalRight
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.safeModeUrl : externalScriptCtrl.advertisement.desktopUnsubscribeZonesExoClick.normalUrl

					externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneLeft + '&size=300x250')
					externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneMiddle + '&size=300x250')
					externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneRight + '&size=300x250')

					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneLeft + '&size=300x250&sub=' + externalScriptCtrl.idzoneLeft + externalScriptCtrl.exoSubUrlParams)
						externalScriptCtrl.iframeSrcMiddle = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneMiddle + '&size=300x250&sub=' + externalScriptCtrl.idzoneMiddle + externalScriptCtrl.exoSubUrlParams)
						externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneRight + '&size=300x250&sub=' + externalScriptCtrl.idzoneRight + externalScriptCtrl.exoSubUrlParams)
					}
				}
				TrackModel.adTrackEvent(4, 1)
			}

			if (externalScriptCtrl.scriptType === 'unsubscribe-mobile-footer-zone') {
				if (+externalScriptCtrl.advertisement.mobileUnsubscribeZonesProvider === adniumProvider &&
					!externalScriptCtrl.isAdblockEnabled &&
					externalScriptCtrl.advertisement.mobileUnsubscribeZonesAdnium) {

					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.mobileUnsubscribeZonesAdnium.safeMode : externalScriptCtrl.advertisement.mobileUnsubscribeZonesAdnium.normal
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.mobileUnsubscribeZonesAdnium.safeModeUrl : externalScriptCtrl.advertisement.mobileUnsubscribeZonesAdnium.normalUrl

					externalScriptCtrl.adniumDataZone = getAdniumDataZone(externalScriptCtrl.idzone)

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}
				} else if (externalScriptCtrl.advertisement.mobileUnsubscribeZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.mobileUnsubscribeZonesExoClick.safeMode : externalScriptCtrl.advertisement.mobileUnsubscribeZonesExoClick.normal
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ? externalScriptCtrl.advertisement.mobileUnsubscribeZonesExoClick.safeModeUrl : externalScriptCtrl.advertisement.mobileUnsubscribeZonesExoClick.normalUrl

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzone + '&size=300x250')

					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzone + '&size=300x250&sub=' + externalScriptCtrl.idzone + externalScriptCtrl.exoSubUrlParams)
					}
				}
				TrackModel.adTrackEvent(4, 1)
			}

			if (externalScriptCtrl.scriptType === 'is-registered-desktop-zone') {
				if (+externalScriptCtrl.advertisement.desktopIsRegisteredZonesProvider === adniumProvider &&
					!externalScriptCtrl.isAdblockEnabled &&
					externalScriptCtrl.advertisement.desktopIsRegisteredZonesAdnium) {

					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzoneLeft = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesAdnium.safeModeLeft :
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesAdnium.normalLeft
					externalScriptCtrl.idzoneRight = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesAdnium.safeModeRight :
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesAdnium.normalRight
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesAdnium.safeModeUrl :
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesAdnium.normalUrl

					externalScriptCtrl.adniumDataZoneLeft = getAdniumDataZone(externalScriptCtrl.idzoneLeft)
					externalScriptCtrl.adniumDataZoneRight = getAdniumDataZone(externalScriptCtrl.idzoneRight)

					externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + externalScriptCtrl.projectId)
					externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + externalScriptCtrl.projectId)

					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneLeft + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
						externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzoneRight + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}

				} else if (externalScriptCtrl.advertisement.desktopIsRegisteredZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzoneLeft = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesExoClick.safeModeLeft :
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesExoClick.normalLeft
					externalScriptCtrl.idzoneRight = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesExoClick.safeModeRight :
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesExoClick.normalRight
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesExoClick.safeModeUrl :
						externalScriptCtrl.advertisement.desktopIsRegisteredZonesExoClick.normalUrl

					externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneLeft + '&size=300x250')
					externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneRight + '&size=300x250')
					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrcLeft = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneLeft + '&size=300x250&sub=' + externalScriptCtrl.idzoneLeft + externalScriptCtrl.exoSubUrlParams)
						externalScriptCtrl.iframeSrcRight = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzoneRight + '&size=300x250&sub=' + externalScriptCtrl.idzoneRight + externalScriptCtrl.exoSubUrlParams)
					}
				}
			}

			if (externalScriptCtrl.scriptType === 'is-registered-mobile-zone') {
				if (+externalScriptCtrl.advertisement.mobileIsRegisteredZonesProvider === adniumProvider &&
					!externalScriptCtrl.isAdblockEnabled &&
					externalScriptCtrl.advertisement.mobileIsRegisteredZonesAdnium) {

					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesAdnium.safeMode :
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesAdnium.normal
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesAdnium.safeModeUrl :
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesAdnium.normalUrl

					externalScriptCtrl.adniumDataZone = getAdniumDataZone(externalScriptCtrl.idzone)

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl +  externalScriptCtrl.idzone + externalScriptCtrl.projectId)
					if (externalScriptCtrl.adniumSubParamsCheck) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + externalScriptCtrl.idzone + '&s2=' + externalScriptCtrl.adniumSubParamsCheck + externalScriptCtrl.projectId)
					}
				} else if (externalScriptCtrl.advertisement.mobileIsRegisteredZonesExoClick) {
					externalScriptCtrl.shouldLoadInIFrame = true
					externalScriptCtrl.idzone = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesExoClick.safeMode :
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesExoClick.normal
					externalScriptCtrl.iframeUrl = externalScriptCtrl.isSafeMode ?
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesExoClick.safeModeUrl :
						externalScriptCtrl.advertisement.mobileIsRegisteredZonesExoClick.normalUrl

					externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzone + '&size=300x250')
					if (externalScriptCtrl.exoSubUrlParams) {
						externalScriptCtrl.iframeSrc = $sce.trustAsResourceUrl(externalScriptCtrl.iframeUrl + '/iframe.php?idzone=' + externalScriptCtrl.idzone + '&size=300x250&sub=' + externalScriptCtrl.idzone + externalScriptCtrl.exoSubUrlParams)
					}
				}
			}
		}

		function serveScript(idzone, container, sub, controllerId, here, containerId, adAsScriptTag) {
			var scriptType = externalScriptCtrl.scriptType
			var myEl = {el: null}
			var event = new CustomEvent('getexoloader', {detail: myEl})
			window.document.dispatchEvent(event)
			var ExoLoader = myEl.el || window.ExoLoader
			var params = {idzone: idzone}
			if (typeof container !== 'undefined') {
				params.container = container
			}
			if (typeof sub !== 'undefined' && sub) {
				params.sub = sub
			}
			if (externalScriptCtrl.exoSub2) {
				params.sub2 = externalScriptCtrl.exoSub2
			}
			if (externalScriptCtrl.exoSub3) {
				params.sub3 = externalScriptCtrl.exoSub3
			}
			if (typeof here !== 'undefined' && here) {
				params.here = here
				if (typeof containerId !== 'undefined' && containerId) {
					params.containerId = containerId
				}
			}
			if(externalScriptCtrl.shouldLoadInIFrame) {
				ExoLoader.addZone(params)

				ad_idzone = idzone
				if (scriptType === 'mobile-header-zone') {
					ad_width = 300
					ad_height = 100
				}
				if (scriptType === 'unsubscribe-skyscraper') {
					ad_width = 160
					ad_height = 600
				}
				if (['mobile-footer-zone', 'desktop-footer-zone', 'desktop-center-cube', 'unsubscribe-desktop-footer-zone', 'unsubscribe-mobile-footer-zone', 'is-registered-desktop-zone', 'is-registered-mobile-zone'].indexOf(scriptType) > -1) {
					ad_width = 300
					ad_height = 250
				}

				ad_sub  = ad_idzone
				ad_sub2 = externalScriptCtrl.exoSub2
				ad_sub3 = externalScriptCtrl.exoSub3

				ExoLoader.getDetector().detectCensorship(function(block) {
					if (block) {
						externalScriptCtrl.isAdblockEnabled = true
						if (adAsScriptTag) {
							$('#exoNativeWidget' + idzone).remove()
							return
						}
						$('[src*=\'idzone=' + idzone + '\']').remove()
					}
				})
				ExoLoader.serve({script_url: '/exckbe', force: true})
			} else {
				var sid1, sid2, subid
				subid = externalScriptCtrl.currentUser.goAdserverSubParams.subid
				if (externalScriptCtrl.goAdserverSubParamsCheck)
				{
					sid1 = externalScriptCtrl.goAdserverSid1
					sid2 = externalScriptCtrl.goAdserverSid2
				}
				TBCtrl.ctrlId=controllerId // the id of this controller
				TBCtrl.debugOn=false // set on true in case you want to debug, eaCtrl will log errors or other info in the console
				TBCtrl.bypassAb=true // change to enable/disable
				TBCtrl.lazyLoading=false // change to enable/disable lazyLoading, default it only display an ad when it reach the fold
				TBCtrl.connectors ={
					1:{'isproxy':0,'type':'url','url': externalScriptCtrl.iframeUrl},
					2:{'isproxy':1,'type':'path','url':'/tbctrl'}
				};
				TBCtrl.init();
				TBCtrl.add({'name': scriptType,'plugin':'banner','sid': idzone,'keywords':'','subid': subid,'sid1': sid1,'sid2': sid2,'display':container,'responsive':'0'});
			}

		}

		function loadData() {
			var scriptType = externalScriptCtrl.scriptType
			$scope.$watch('$viewContentLoaded',
				function() {
					refreshBanners()
					var timer = $timeout(function() {
						checkIfShowExternalScript()
						var idzone, idzoneLeft, idzoneMiddle, idzoneRight, sub, controllerId, container, containerLeft, containerMiddle, containerRight
						if (externalScriptCtrl.shouldShowExternalScript && scriptType === 'search-native-zone') {
							var scriptElement = document.createElement('script')
							scriptElement.setAttribute('data-idzone', externalScriptCtrl.idzone)
							scriptElement.setAttribute('src', externalScriptCtrl.iframeSrc)

							var elementContainer = angular.element('#search-native-zone')
							elementContainer.append(scriptElement)
						}
						if (externalScriptCtrl.shouldShowExternalScript || externalScriptCtrl.shouldShowFooterAds) {
							var myEl = {el: null}
							var event = new CustomEvent('getexoloader', {detail: myEl})
							window.document.dispatchEvent(event)
							var ExoLoader = myEl.el || window.ExoLoader
							var adAsScriptTag = false
							ExoLoader.getDetector().domain_base = 'exosrv.com'
							if (externalScriptCtrl.shouldShowFooterAds && (scriptType === 'mobile-footer-zone' || scriptType === 'mobile-header-zone' || scriptType === 'desktop-center-cube' || scriptType === 'unsubscribe-skyscraper' || scriptType === 'unsubscribe-mobile-footer-zone' || scriptType === 'is-registered-mobile-zone' || scriptType === 'search-native-zone')) {
								idzone = externalScriptCtrl.idzone
								sub = externalScriptCtrl.shouldLoadInIFrame ? externalScriptCtrl.idzone : externalScriptCtrl.currentUser.goAdserverSubParams.subid
								container = externalScriptCtrl.shouldLoadInIFrame ? document.getElementById(scriptType) : scriptType
								controllerId = (externalScriptCtrl.controllerIdGoAdserver === undefined) ? null : externalScriptCtrl.controllerIdGoAdserver
								if (!container) {
									return loadData()
								}
								if (scriptType === 'search-native-zone') {
									adAsScriptTag = true
								}
								serveScript(idzone, container, sub, controllerId, null, adAsScriptTag)
							}
							if (scriptType.indexOf('popunder-zone') > -1) {
								if (GLOBALS.displayOneclickPopupOnExit) {
									return
								}
								idzone = externalScriptCtrl.idzone
								serveScript(idzone)
							}
							if (externalScriptCtrl.shouldShowFooterAds && (scriptType === 'desktop-footer-zone' || scriptType === 'unsubscribe-desktop-footer-zone')) {
								idzoneLeft = externalScriptCtrl.idzoneLeft
								idzoneMiddle = externalScriptCtrl.idzoneMiddle
								idzoneRight = externalScriptCtrl.idzoneRight
								var containerIdLeft = scriptType + '-left',
									containerIdMiddle = scriptType + '-middle',
									containerIdRight = scriptType + '-right'
								containerLeft = externalScriptCtrl.shouldLoadInIFrame ? document.getElementById(containerIdLeft) : containerIdLeft
								containerMiddle = externalScriptCtrl.shouldLoadInIFrame ? document.getElementById(containerIdMiddle) : containerIdMiddle
								containerRight = externalScriptCtrl.shouldLoadInIFrame ? document.getElementById(containerIdRight) : containerIdRight
								controllerId = (externalScriptCtrl.controllerIdGoAdserver === undefined) ? null : externalScriptCtrl.controllerIdGoAdserver

								if (!containerLeft || !containerMiddle || !containerRight) {

									return loadData()
								}
								var here = document.getElementById('footerBannersContainer')
								serveScript(idzoneLeft, containerLeft, idzoneLeft, controllerId, here, containerIdLeft)
								serveScript(idzoneMiddle, containerMiddle, idzoneMiddle, controllerId, here, containerIdMiddle)
								serveScript(idzoneRight, containerRight, idzoneRight, controllerId, here, containerIdRight)
							}
							if (scriptType === 'is-registered-desktop-zone') {
								idzoneLeft = externalScriptCtrl.idzoneLeft
								idzoneRight = externalScriptCtrl.idzoneRight
								containerIdLeft = scriptType + '-left'
								containerIdRight = scriptType + '-right'
								containerLeft = document.getElementById(scriptType + '-left')
								containerRight = document.getElementById(scriptType + '-right')
								controllerId = (externalScriptCtrl.controllerIdGoAdserver === undefined) ? null : externalScriptCtrl.controllerIdGoAdserver
								if (!containerLeft || !containerRight) {

									return loadData()
								}
								here = document.getElementById('footerBanners')
								serveScript(idzoneLeft, containerLeft, idzoneLeft, controllerId, here, containerIdLeft)
								serveScript(idzoneRight, containerRight, idzoneLeft, controllerId, here, containerIdRight)
							}
						}
						$timeout.cancel(timer)
					}, 2000)
				})
		}

		function checkIfShowExternalScript() {
			externalScriptCtrl.shouldShowExternalScript = true
			externalScriptCtrl.shouldShowFooterAds      = true
			var currentPage = PagesModel.getCurrentPage()
			if (['AboutUs',
				'Terms',
				'Privacy',
				'2257Notice',
				'cookiePolicy',
				'help',
				'Help',
				'SubProcessors',
				'FullPageAd',
				'RegOfferOne',
				'RegOfferTwo',
				'EmailOfferOne',
				'EmailOfferTwo',
				'EmailOfferThree',
				'EmailOfferFour',
				'EmailOfferFive',
				'EmailOfferSix',
				'EmailOfferSeven',
				'EmailOfferEight',
				'EmailOfferNine',
			].indexOf(currentPage) !== -1 || externalScriptCtrl.currentUser && !externalScriptCtrl.currentUser.showAds) {
				externalScriptCtrl.shouldShowExternalScript = false
				externalScriptCtrl.shouldShowFooterAds      = false
			}
			if (externalScriptCtrl.scriptType.indexOf('popunder-zone') > -1) {
				externalScriptCtrl.shouldShowExternalScript = false //let exo pops disabled
			}
			if (externalScriptCtrl.currentUser && !externalScriptCtrl.currentUser.footerAds) {
				externalScriptCtrl.shouldShowFooterAds = false
			}
		}

		function refreshBanners() {
			var bannerIds = []
			if (GLOBALS.isMobileScreenFooterBanners) {
				bannerIds = ['mobile-footer-zone', 'mobile-header-zone']
			} else {
				bannerIds = ['desktop-footer-zone-left', 'desktop-footer-zone-middle', 'desktop-footer-zone-right', 'search-native-zone']
			}
			for (var i in bannerIds) {
				var bannerElement = $('#' + bannerIds[i])
				if (bannerElement.length) {
					if (Object.prototype.hasOwnProperty.call(bannerIds, i)) {
						var val = bannerIds[i];
						if(val == "desktop-footer-zone-left" || val == "desktop-footer-zone-left"  || val == "desktop-footer-zone-right" || val == "mobile-footer-zone") {
							TrackModel.adTrackEvent(4, 1)
						}
						if(val == "mobile-header-zone") {
							TrackModel.adTrackEvent(8, 1)
						}
					}
					var iframe = bannerElement.find('iframe')
					if (!iframe.length || iframe.css('display') == 'none') {
						bannerElement.empty()
					} else {
						iframe.attr('src', iframe.attr('src'))
						var nextAd = iframe.next()
						if (nextAd.length) {
							nextAd.remove()
						}
					}
				}
			}
		}

		function refreshCenterCube() {
			var centerCube = $('#desktop-center-cube')
			if (centerCube.length && !parseInt(GLOBALS.isMobile)) {
				var iframe = centerCube.find('iframe')
				if (!iframe.length || iframe.css('display') == 'none') {
					centerCube.empty()
				} else {
					iframe.attr('src', iframe.attr('src'))
					var nextAd = iframe.next()
					if (nextAd.length) {
						nextAd.remove()
					}
				}
			}
		}

		function monitorActivity() {
			// we should refresh banners in every 10 seconds if there is any activity like clicks, typings, scrolling etc...
			var seconds = 10
			var activities = 0

			// detects key presses, mouse clicks, key scrolling and touchscreen interaction
			window.onkeypress = activityDetected
			window.onclick = activityDetected
			window.onscroll = activityDetected
			window.onmousedown = activityDetected

			var timer
			var countdownTimer = setInterval(function() {
				seconds = seconds - 1
				if (seconds <= 0) {
					if (activities > 0) {
						timer = $timeout(function() {
							$rootScope.$broadcast('refreshBanners')
							$timeout.cancel(timer)
						}, 500)
					}
					clearInterval(countdownTimer)
					deleteAlreadyAppendedScripts()
					monitorActivity()
				}
			}, 1000)

			//scripts cleanup
			function deleteAlreadyAppendedScripts() {
				var exoScripts = document.querySelectorAll('script[src=\'/exckbe\']')
				if (exoScripts) {
					for (var i = 0; i < exoScripts.length; i++) {
						var script = exoScripts[i]
						script.remove()
					}
				}
			}

			function activityDetected() {
				activities++
			}
			refreshBannerOnActiveBrowserTab()
		}

		function handleChangeTab() {
			var timer
			if (!document.hidden) {
				timer = $timeout(function() {
					$rootScope.$broadcast('refreshBanners')
					$timeout.cancel(timer)
				}, 500)
				document.removeEventListener('visibilitychange', handleChangeTab)
			}
		}

		function refreshBannerOnActiveBrowserTab() {
			document.addEventListener('visibilitychange', handleChangeTab)
		}

		$scope.$watch(function() {
			return $location.path()
		}, function() {
			checkIfShowExternalScript()
			loadData()
		})

		$scope.$watch('externalScriptCtrl.isAdblockEnabled', function(newValue, oldValue) {
			if (externalScriptCtrl.isAdblockEnabled && oldValue !== newValue) {
				setBannersConfig()
				loadData()
			}
		})

		$scope.$on('sign-out:success', function() {
			externalScriptCtrl.isLoggedIn = false
		})

		$scope.$on('refreshBanners', function() {
			loadData()
		})

		$scope.$on('refreshCenterCube', function() {
			refreshCenterCube()
		})

		$scope.$on('unsubDataLoaded', function(event, data) {
			externalScriptCtrl.isSafeMode = data.safeMode
			externalScriptCtrl.exoSubUrlParams = data.exoSubUrlParams
			externalScriptCtrl.exoSubData = data.exoSubData
			externalScriptCtrl.adniumSubUrlParams = data.adniumSubUrlParams
			externalScriptCtrl.adniumSubData = data.adniumSubData
			setBannersConfig()
			refreshBanners()
		})

	})
	.directive('externalScript', function() {
		return {
			restrict: 'E',
			controller: 'ExternalScriptCtrl',
			controllerAs: 'externalScriptCtrl',
			bindToController: true,
			scope: {
				scriptType: '@scriptType',
			},
			templateUrl: globalParams.templateUrls.directives.external_script,
		}
	})

