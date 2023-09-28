// BANNER ADS
if (typeof ad_client != 'undefined' && typeof ad_format != 'undefined' && typeof ad_width != 'undefined' && typeof ad_height != 'undefined') {
	var boomads_widget_trackingparameter_ = null;
	var boomadsIsHomePage = function () {
		var path = window.location.pathname.toString().toLowerCase();
		path = path.replace("/", "");
		if (path == "") {
			return true;
		} else if (path.substr(0, 8).indexOf("default.") > -1) {
			return true;
		} else if (path.substr(0, 6).indexOf("index.") > -1) {
			return true;
		} else if (path.substr(0, 5).indexOf("home.") > -1) {
			return true;
		}
		return false;
	}
	if (typeof boomads_widget_trackingparameter != 'undefined') {
		boomads_widget_trackingparameter_ = boomads_widget_trackingparameter;
	}
	// CREATING DIV ELEMENT
	var boomsAdsScriptElemDiv = document.createElement('div');
	boomsAdsScriptElemDiv.innerHTML = "<div class='boomads-custom-ads' id='boomads_ads_type_0'></div>";
	var boomsAdsDocumentBody = document.getElementsByTagName('body')[0];
	if (boomsAdsDocumentBody)
		boomsAdsDocumentBody.appendChild(boomsAdsScriptElemDiv);
	// CREATING SCRIPT ELEMENT
	var boomAdsParams = new Object();
	var boomsAdsScriptWidget = document.createElement('script');
	boomAdsParams.AdClient = ad_client.replace(/-/g, "");
	boomAdsParams.AdCampaignType = "0";
	boomsAdsScriptWidget.type = 'text/javascript';
	boomsAdsScriptWidget.src = '//widget.boomads.com/WidgetJS/CustomAds?AdClient=' + boomAdsParams.AdClient + '&AdCampaignType=' + boomAdsParams.AdCampaignType + '&R=' + Math.random() + '';
	var boomsAdsDocumentHeadWidget = document.getElementsByTagName('head')[0];
	//if (boomsAdsDocumentHeadWidget)
	//	boomsAdsDocumentHeadWidget.appendChild(boomsAdsScriptWidget);
}


// Bumerang eski sablonlar icin silinemez yeri degistirilemez. Diger web projelerinde gereksiz.
ad_url = "http://bumerangeski.boomads.com/showadvert.aspx?";
document.write('<iframe name="ads_frame" width=' + window.ad_width + " height=" + window.ad_height + " frameborder=0 src=" + G() + ' marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" target="_main">');
document.write("</iframe>");

function G() {
    var retVal = ad_url;
    retVal = retVal + "clientid=" + window.ad_client + "&ctype=" + window.ad_format;
    return retVal;
}