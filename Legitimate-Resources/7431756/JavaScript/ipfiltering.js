$.getJSON("https://geoip.nekudo.com/api",
	function (data) {
		if(data.country.code != "ES" && $("#international-results-section").html().length > 100){
			$("#main-results-section").hide();
			$("#international-results-section").show();
		}
	}
);

