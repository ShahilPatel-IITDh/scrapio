

function OptanonWrapper() {
	var bannerAcceptBtnITA04 = document.getElementById("ot-group-id-ITA04");
	if (bannerAcceptBtnITA04.checked) {
		var message = "OT";
		
		window.postMessage(message, location.origin);
		
		var frames = document.getElementsByTagName("iframe");
		for (var i = 0; i < frames.length; i++) {
			frames[i].contentWindow.postMessage(message, location.origin);
		}
	} else {
		if (typeof(BNLCSAoptOut) === "function") {
			BNLCSAoptOut();
		}
	}
	
	
}
