
document.addEventListener("DOMContentLoaded", function(event) {
	var load = document.getElementById("load");
	if(!load.classList.contains('loader-removed')){
		var removeLoading = setTimeout(function() {
			load.className += " loader-removed";
		}, 300);
	}
});
