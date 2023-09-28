
			/*<![CDATA[*/
			document.oncontextmenu = function(event) {
				if (event.target.tagName != 'INPUT' && event.target.tagName != 'TEXTAREA') {
					event.preventDefault();
				}
			};
			document.ondragstart = function() {
				if (event.target.tagName != 'INPUT' && event.target.tagName != 'TEXTAREA') {
					event.preventDefault();
				}
			};
			/*]]>*/
		