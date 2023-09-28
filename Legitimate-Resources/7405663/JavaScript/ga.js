// копи-паста из адмитада
function generateSUID() {
	// in modern browsers use normal crypto
	if (typeof Uint8Array !== 'undefined') {
		var admCrypto = window.crypto || window.msCrypto || {
			getRandomValues: function getRandomValues(array) {
				for (var i = 0, l = array.length; i < l; i++) {
					array[i] = Math.floor(Math.random() * 256);
				}
				return array;
			}
		};

		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
			return (c ^ admCrypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
		});
	}
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0,
			v = c === 'x' ? r : r & 0x3 | 0x8;
		return v.toString(16);
	});
}

function getTimeStamp() {
	var now = new Date();
	var tzo = -now.getTimezoneOffset();
	var dif = tzo >= 0 ? '+' : '-';
	var pad = function(num) {
		var norm = Math.abs(Math.floor(num));
		return (norm < 10 ? '0' : '') + norm;};
	return now.getFullYear()
		+ '-' + pad(now.getMonth()+1)
		+ '-' + pad(now.getDate())
		+ 'T' + pad(now.getHours())
		+ ':' + pad(now.getMinutes())
		+ ':' + pad(now.getSeconds())
		+ '.' + pad(now.getMilliseconds())
		+ dif + pad(tzo / 60)
		+ ':' + pad(tzo % 60);
}

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var decodedCookie = decodeURIComponent(document.cookie);
		var cookies = decodedCookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			cookie = (cookie || "").replace(/^\s+|\s+$/g, "");
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === name + '=') {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

function sendToGoogleAnalytics (params) {
	try {
		if (window.ga) {
			var gaParams = {
					'hitType': 'pageview',
					'dimension5': getTimeStamp(),
					'dimension9': generateSUID()
				};
			ga(function(tracker) {
					var dimension1 = tracker.get('clientId');
					var dimension2 = tracker.get('referrer');
					var dimension6 = new Date().getTime() + '.' + Math.random().toString(36).substring(5);

					if (dimension1) gaParams['dimension1'] = dimension1;
					if (dimension2) gaParams['dimension2'] = dimension2;
					if (dimension6) gaParams['dimension6'] = dimension6;
				});

			window.ga('send', Object.assign(gaParams, params))
		}
	} catch(e) {
		console.log('Catch error while sending Google analytics')
	}
}
