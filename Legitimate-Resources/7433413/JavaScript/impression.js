function SendImpressionGlobal(event, value, referrer) {
	try {
		var impression =
			"https://imp.onesearch.org/impression.do?event=" + event +
			"&user_id=b3041825-04de-42e7-8371-6e96a65f4860" +
			"&source=bing-bb8" +
			"&traffic_source=appfocus29" +
			"&subid=20180121" +
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
    ad: "appfocus29",
    source: "bing-bb8",
    uid: "b3041825-04de-42e7-8371-6e96a65f4860",
    imp: "packages_",
    offerid: "323",
    uc: "20180121",
    age: "1999",
    country: "in",
	state: "jh",
	ipaddress: "203.129.219.162",
	admbanneraccount: "internal_banner",
	admbannerid: "10055",
	admtileaccount: "internal_tiles",
	admtileid: "10058"

};
