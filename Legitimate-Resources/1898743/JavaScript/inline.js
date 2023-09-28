
	
		var $buoop = {
			reminder: 0,
			vs: { i: 8, f: 15, o: 15, s: 5.1, n: 9 }
		};
	
		$(window).load(function(){
	
			if (typeof (loadMap) !== 'undefined') {
				loadMap()
			}
	
			var e = document.createElement("script");
			e.setAttribute("type", "text/javascript");
			e.setAttribute("src", "//browser-update.org/update.js");
			document.body.appendChild(e);
	
		});
	