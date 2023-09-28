
	MessageBus.subscribe("LogoutClicked", function (handleObject) {
		handleObject.handled = true;
		if (typeof logoutCallbacks === 'undefined') {
			window.location = handleObject.logoffLocation;
			return;
		}

		new Promise(function (resolve) {
			setBusyIndicator(true, false);
			resolve();
		}).then(function () {
			return Promise.all(logoutCallbacks.map(function (f) { return f(); }));
		}).then(function () {
			return new Promise(function (resolve) {
				setTimeout(resolve, 1000);
			});
		}).catch(function (error) {
			console.log(error);
			window.location = handleObject.logoffLocation;
		}).then(function () {
			window.location = handleObject.logoffLocation;
		});
	});

	MessageBus.subscribe('LoggedOut', function (reason) {
		window.location = "LoggedOut.aspx?LogoutReason=" + reason;
	});

	function getCurrentPageTitle() {
		return $("title").text().trim();
	}

	function detokenizePageTitle(title) {
		var container = {
			pageTitle: title,
			portalName: "Ocean Bank"
		};
		return IDS.detokenizePlainText(container, "{pageTitle} - {portalName}");
	}

	function clearBanner (className, altLocation, title) {
		$("." + className).each(function () {
			var el = $(this);
			el.html("");
			el.data({
				rotate: true,
				promotions: [],
				altlocation: altLocation + " - " + title
			});
		});
	}

	function loadMcmBanners (title) {
		clearBanner("banner-top", "Top Banner", title);
		clearBanner("banner-bottom", "Bottom Banner", title);
		clearBanner("banner-bottom-left", "Left Column Bottom", title);
		clearBanner("banner-bottom-right", "Right Column Bottom", title);
		clearBanner("banner-top-left", "Left Column Top", title);
		clearBanner("banner-top-right", "Right Column Top", title);
		if (window.orccMcmManager && window.orccMcmManager.promosLoaded)
			window.orccMcmManager.loadPromotions();
	}

	MessageBus.subscribe('SetPageTitle', function (data) {
		var handlePageTitleChange = function (newTitle) {
			if (getCurrentPageTitle() !== newTitle) {
				$("title").text(newTitle);
				loadMcmBanners(newTitle);
			}
		};
			handlePageTitleChange(detokenizePageTitle(data.title));
	});

	var previousPageTitle = getCurrentPageTitle();

	Router.addRouteChangeHandler(function (pathTemplate) {
		var findMappedPageTitle = function (routePathTemplate) {
			var mappings = [];
			var result = undefined;
			var index = mappings.findIndex(function (m) { return m.routePathTemplate === routePathTemplate; });
			if (index !== -1) {
				var contentLocationMapping = mappings[index];
				// Matches everything between two dashes. 
				// For Example: It will match " - Account Overview - " when the input is "Top Center - Account Overview - Ascend"
				var itemsFoundInBetweenDashes = contentLocationMapping.contentLocation.match(/\s+-\s+(.+)\s+-\s+/);
				if (itemsFoundInBetweenDashes)
					result = detokenizePageTitle(itemsFoundInBetweenDashes[1]);
				else
					throw "MCM Content Location Mapping is not configured correctly:"
					+ " [ContentLocation: " + contentLocationMapping.contentLocation + "]"
					+ " [RoutePathTemplate: " + contentLocationMapping.routePathTemplate + "]";
			}

			return result;
		};

		var handleOnRouteChangedAfterPageTitleChanged = function () {
			var currentPageTitle = getCurrentPageTitle();
			if (previousPageTitle !== currentPageTitle) {
				previousPageTitle = currentPageTitle;
				if (findMappedPageTitle(pathTemplate))
					loadMcmBanners(findMappedPageTitle(pathTemplate));
			} else {
				setTimeout(handleOnRouteChangedAfterPageTitleChanged, 0);
			}
		}

		handleOnRouteChangedAfterPageTitleChanged();
	});

	$(document).ready(function () {
		if (!orccMcmManager.promosLoaded) {
			try {
				orccMcmManager.url = '';
				orccMcmManager.rotationInterval = '45000';
				orccMcmManager.loadPromotions();
				orccMcmManager.fiveAdBannerSwitcher();
			} catch (exception) {
				window.orccLogManager.logException('failed to load MCM', exception);
			}
		}
		$('.ui-dialog').on('dialogclose', function (event) {
			$("body").removeClass("modal-open");
		});
	});

	$('.skip-nav a').click(function () {
		var mainContent = $(this).attr('href');
		$(mainContent).attr("tabindex", -1);
		$(mainContent).focus();
		
		return false;
	});
