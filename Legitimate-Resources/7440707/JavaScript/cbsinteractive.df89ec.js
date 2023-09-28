(function(w, d) {
	'use strict';
	var s1 = d.getElementsByTagName('script')[0],
		s = d.createElement('script'),
		types,
		attr,
		pageFn,
		onReady;

	types = {
		Aricle: true,
		Review: true,
		'video.other': true,
		blog: true
	};

	s.src = '//tru.am/scripts/ta-pagesocial-sdk.02af10.js';

	attr = function(domQ, name) {
		var l = document.querySelector(domQ);
		if (l) {
			return l.getAttribute(name);
		}
		return undefined;
	};

	pageFn = function() {
		var l,
			u,
			ogtype = attr('meta[property="og:type"]', 'content');
		l = document.location;
		if (w.TRUE_ANTHEM.isValidPageType(ogtype) || types[ogtype]) {
			u = l.protocol + "//" + l.host + l.pathname;
			return {
				canonical: attr('link[rel="canonical"]', "href"),
				"og:type": "article",
				"og:url": attr('meta[property="og:url"]', "content")
			};
		}
		return {};
	};

	onReady = function() {
		var l = document.location,
			h = l.hostname.toLowerCase(),
			cid;
		if (h.indexOf('cnet.com') > -1) {
			cid = '1286';
		} else if (h.indexOf('techrepublic.com') > -1) {
			cid = '1071';
		} else if (h.indexOf('zdnet.com') > -1) {
			cid = '1082';
		} else if (h.indexOf('insideedition.com') > -1) {
			cid = '1202';
		}
		if (cid) {
			if (cid == '1202' && /\/videos\//.test(l.pathname)) {
				w.TRUE_ANTHEM.configure(cid, {
					page: pageFn
				});
			} else {
				w.TRUE_ANTHEM.configure(cid, {
					page: pageFn,
					disableHistoryChangeTrigger: true
				});
			}
		}
	};
	if (s.addEventListener) {
		s.addEventListener('load', onReady, false);
	} else {
		s.onreadystatechange = function() {
			if (
				s.readyState in {
					loaded: 1,
					complete: 1
				}
			) {
				s.onreadystatechange = null;
				onReady();
			}
		};
	}
	s1.parentNode.insertBefore(s, s1);
})(window, document);
