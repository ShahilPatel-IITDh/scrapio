function SendImpressionGlobal(event, value, referrer) {
	try {
		var impression =
			"https://imp.onesearch.org/impression.do?event=" + event +
			"&user_id=20e08473-9659-457f-b0f5-f2f0fe87af66" +
			"&source=tt" +
			"&traffic_source=AppFocus84" +
			"&subid=20180129" +
			"&implementation_id=packages_" +
			"&page=" + value +
			"&referrer=" + referrer +
			"&offer_id=~"
		;
		
		var img = document.createElement("img");
		img.src = impression;
		img.width = 1;
		img.height = 1;
		img.style.display = 'none';

		document.body.appendChild(img);
	}
	catch (err) {}
}

var sptpn = {
    ad: "AppFocus84",
    source: "tt",
    uid: "20e08473-9659-457f-b0f5-f2f0fe87af66",
    imp: "packages_",
    offerid: "301",
    uc: "20180129",
    age: "2016",
    country: "in",
	state: "jh",
	ipaddress: "203.129.219.162",
	admbanneraccount: "internal_banner",
	admbannerid: "10055",
	admtileaccount: "internal_tiles",
	admtileid: "10058"

};
