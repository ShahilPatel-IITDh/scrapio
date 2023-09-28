
	(function() {
		function j(src, id) {
			var s = document.createElement('script');
			s.type = 'text/javascript';
			s.async = true;
			s.src = src;
			if(id) {s.id=id};
			document.getElementsByTagName('head')[0].appendChild(s);
		}
		j('//platform.twi'+'tter.com/widgets.js');
	})()
