function frame_shield() {
	if (top != self) {
		varappAuthRegex = /^\/app\/auth\//;
		if (window && window.self && window.self.location && window.self.location.pathname && window.self.location.pathname.search(appAuthRegex) != -1) {
			//allowIframe
		} else {
			top.location = self.location;

		}
	}
}