
    window.firstPageId = 'mainPage'

    if (window.requestCloseWelcomeScreen) {
        window.requestCloseWelcomeScreen()
    }
	if (!window.__browser_deprecation__) {
		window.fedops.phaseStarted('partially_visible', {paramsOverrides: { pageId: firstPageId }})
	}
