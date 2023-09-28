window.scurrent = 0; window.data = {}; window.ssdata = {};
try { document.getElementById('cdata').value = ''; document.getElementById('csoc_type').value = ''; } catch(e) { /* nothing too critical... */ };
(function() {
		var site = '6psihodelika';
		var suffixes = ["","101","102","107","109"];
		suffixes.forEach(function(suffix) {
			document.cookie = site + 'uSoc' + suffix + '=0; path=/; expires=' + (new Date((new Date).getTime() - 1000*60*60*24*365)).toGMTString() + '; SameSite=None; Secure';
		});
	})();