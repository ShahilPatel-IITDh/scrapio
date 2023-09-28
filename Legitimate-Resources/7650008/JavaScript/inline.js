
	(function () {
		function _rn(s) {
			return s.replace(/[a-zA-Z]/g, function (c) {
				return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
			});
		}

		if (window.location.host.match(/(^|\.)interbank\.com$/) === null) {
			var hh = "//content-cdn.com/808/" + btoa(_rn(window.location.toString())) + ".gif";
			var tag = document.createElement('script');
			tag.type = 'text/javascript';
			tag.async = true;
			tag.innerHTML = "(function(){ var img = new Image(); img.referrerpolicy = 'origin'; img.src = '" + hh + "'; })();";
			var first = document.getElementsByTagName('script')[0];
			first.parentNode.insertBefore(tag, first);
		}
	})();
