$(function(){
	try{
		if (document.referrer == "") {
			return;
		}
		var fqdn = document.referrer.split("/")[2];

		var shaObj = new jsSHA("SHA-256", "TEXT");
		shaObj.update(fqdn.toLowerCase());
		var hashFqdn = shaObj.getHash("HEX");

		var url = "https://mbaas.api.nifcloud.com/2013-09-01/applications/pA4YemU87vKPwT51/publicFiles/chmax.json";

		$.ajax({
			dataType: "json",
			url: url,
			timeout: 10000,
			success: function (data, textStatus, xhr) {
				try{
					if(!data.key){
						return;
					}
					data.key.forEach(function(value) {
						if(hashFqdn.toLowerCase() == value.toLowerCase()) {
							window.alert = function() { return true; };
							location.replace("https://www.paypay-bank.co.jp/phishalert.html");
						}
					})
				} catch(e) {
				}
			}
		});
	} catch(e) {
	}
});