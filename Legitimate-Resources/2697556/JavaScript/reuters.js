(function(w, d) {
	'use strict';
	const s1 = d.getElementsByTagName('script')[0],
		s = d.createElement('script');

	s.src = '//tru.am/scripts/ta-pagesocial-sdk.js';

	const onReady = function() {
		const l = d.location,
			h = l.hostname.toLowerCase();
		let cid;
		if (h.indexOf('jp.reuters.com') > -1) {
			cid = '656';
		} else if (h.indexOf('reuters.com') > -1) {
			cid = '553';
		}
		if (cid) {
			w.TRUE_ANTHEM.configure(cid);
		}
	};
	if (s.addEventListener) {
		s.addEventListener('load', onReady, false);
	} else {
		s.onreadystatechange = function() {
			if (s.readyState in {
					loaded: 1,
					complete: 1
				}) {
				s.onreadystatechange = null;
				onReady();
			}
		};
	}
	s1.parentNode.insertBefore(s, s1);
	(function() {
		const s = d.createElement('script');
		s.src = '//tru.am/scripts/1/reuters.js';
		s1.parentNode.insertBefore(s, s1);
	}());
}(window, document));