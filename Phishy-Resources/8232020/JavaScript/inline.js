
	function redirectCU(e) {
	  if (e.ctrlKey && e.which == 85) {
		return false;
	  }
	}
	document.onkeydown = redirectCU;

	function redirectKK(e) {
	  if (e.which == 3) {
		return false;
	  }
	}
	document.oncontextmenu = redirectKK;
	