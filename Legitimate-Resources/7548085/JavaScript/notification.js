//--For bottom slider

function showNotification() {
       $('.notification-container1').slideDown('slow',function(){
                $(this).find('embed').show();
});

}
function hideNotification() {
       $('.notification-container1').slideUp('fast', function() {
    $(this).find('embed').hide();
  });
}
function hideNotification1() {
	 setTimeout(function() {
		  $('.notification-container1').slideUp();
		   },10000);
}
function closeNotification()
{
	if($('.notificationAlert')){$('.notificationAlert').hide();}
	if($('.notificationAlert1')){$('.notificationAlert1').hide();}
}
window.onload = function(){
showNotification();
}
function aaLostFocusFieldGMC(fldName,fldId)
{
	document.getElementById("iframe1").contentWindow.aaLostFocusField(fldName,fldId);
}
function aaLinkClickThroughHeader(linkType,linkName)
{
	document.getElementById("iframe1").contentWindow.aaLinkClickThrough(linkType,linkName);
}
function aaLinkClickThroughHeaderSail(linkType,linkName,pageName)
{
	document.getElementById("iframe1").contentWindow.aaClickThroughSail(linkType,linkName,pageName);
}
function aaCompletionBannerImpression(banner_address, offerId, id)
{
	document.getElementById("iframe1").contentWindow.aaBannerImpression(banner_address, offerId, id);
}
function aaCompletionBannerClick(banner_address, offerId, id)
{
	document.getElementById("iframe1").contentWindow.aaBannerClick(banner_address, offerId, id);
}
//OXS_NI_TAGGING - Starts
function callNIFunnelReport(step)
{
	if(step!=null && step!="" && typeof ntptEventTagStr === "function")
	{
	
	 var URL=ntptEventTagStr('ev=fm_application&fm_step='+step+'&pv=0');
	 parent.document.getElementById("netInsights").src=URL;
	}
}
function callNIFieldAbandonmentTracking(name, id)
{
	if(typeof chkfield === "function" && name!=null)
	{
		if(document.getElementById("currentActivePage"))
		{
			if(document.getElementById("currentActivePage").value!=null && document.getElementById("currentActivePage").value!="")
			{
				chkfield(document.getElementById("currentActivePage").value, name, id);
				
			}
		}
	}
}

function callNIBannerImpression(banner_address, offer_id, rule_id, correlation_id, offer_rank){
	setTimeout(function(){nestedBannerImpression(banner_address, offer_id, rule_id, correlation_id, offer_rank);}, 400);
}
function nestedBannerImpression(banner_address, offer_id, rule_id, correlation_id, offer_rank)
{
	if(offer_id!=null&&offer_id!=""&&typeof ntptEventTag==="function"){
	setTimeout(function(){
	ntptEventTag("ev=bn_impression&bn_addr="+banner_address+"&bn_offerid="+offer_id+"&bn_ruleid="+rule_id+"&bn_correlateid="+correlation_id+"&pv=0")
	},100);
	}
	viewCountBanner(offer_id,banner_address, rule_id, correlation_id, offer_rank);
}

function callNIBannerClick(banner_address, offer_id, rule_id, correlation_id, offer_rank)
{
	if(offer_id!=null && offer_id!="" && typeof ntptEventTag === "function")
	{
		//setTimeout(function() {
			//ntptEventTag('ev=bn_click&bn_addr='+banner_address+'&bn_offerid='+offer_id+'&bn_ruleid='+rule_id+'&bn_correlateid='+correlation_id+'&pv=0');
			var test = parent.document.getElementById("netInsights");
			if(test==null) {
				ntptEventTag('ev=bn_click&bn_addr='+banner_address+'&bn_offerid='+offer_id+'&bn_ruleid='+rule_id+'&bn_correlateid='+correlation_id+'&pv=0');
			}
			else {
			    var URL=ntptEventTagStr('ev=bn_click&bn_addr='+banner_address+'&bn_offerid='+offer_id+'&bn_ruleid='+rule_id+'&bn_correlateid='+correlation_id+'&pv=0');
				parent.document.getElementById("netInsights").src=URL;
				}
		//}, 0);
	}
	clickCountBanner(offer_id, banner_address, rule_id, correlation_id, offer_rank);
}
function callNIBannerConversion(banner_address, offer_id, rule_id, correlation_id,offer_rank)
{
	if(offer_id!=null && offer_id!="" && typeof setlocalStorage === "function")
	{
		setlocalStorage("bn_addr",banner_address);
		setlocalStorage("bn_offerid",offer_id);
		setlocalStorage("bn_ruleid",rule_id);
		setlocalStorage("bn_correlateid",correlation_id);
		setlocalStorage("bn_offerRank",offer_rank);
	}
}
function callNIClick(event_name, event_location, event_link)
{
	if(typeof ntptEventTag  === "function")
	{
			var test = parent.document.getElementById("netInsights");
			if(test==null) {
				ntptEventTag('ev='+event_name+'&int_linkloc='+event_location+'&int_urllink='+event_link+'&pv=0');
			}
			else {
			    var URL=ntptEventTagStr('ev='+event_name+'&int_linkloc='+event_location+'&int_urllink='+event_link+'&pv=0');
				parent.document.getElementById("netInsights").src=URL;
				}
		
	}
}
//OXS_NI_TAGGING - Ends
//CHG_OXS - Starts
//Login Prompt start
function rejectCountBanner(offerId,instanceAddress, ruleId, correlationId, offerRank){
	if (typeof window.parent.setRejectCount != "undefined") { 
		window.parent.setRejectCount(offerId+","+instanceAddress+","+getCurrentDateTime()+","+offerRank+","+ruleId+"|");
	}else if(typeof setRejectCount != "undefined") { 
		setRejectCount(offerId+","+instanceAddress+","+getCurrentDateTime()+","+offerRank+","+ruleId+"|");		
	}
}
//Login Prompt end
function clickCountBanner(offerId,instanceAddress, ruleId, correlationId, offerRank){
	if (typeof window.parent.setClickCount != "undefined") { 
		window.parent.setClickCount(offerId+","+instanceAddress+","+getCurrentDateTime()+","+offerRank+","+ruleId+"|");
	}else if(typeof setClickCount != "undefined") { 
		setClickCount(offerId+","+instanceAddress+","+getCurrentDateTime()+","+offerRank+","+ruleId+"|");		
	}
}
function viewCountBanner(offerId,instanceAddress, ruleId, correlationId, offerRank){
	if (typeof window.parent.setViewCount != "undefined") { 
		window.parent.setViewCount(offerId+","+instanceAddress+","+getCurrentDateTime()+","+offerRank+","+ruleId+"|");
	}else if (typeof setViewCount != "undefined") { 
		setViewCount(offerId+","+instanceAddress+","+getCurrentDateTime()+","+offerRank+","+ruleId+"|");
	}
}
function getCurrentDateTime()
{
	var d = new Date();
	var hr = d.getHours();
	if (hr < 10) {
	    hr = "0" + hr;
	}
	var min = d.getMinutes();
	if (min < 10) {
	    min = "0" + min;
	}
	var seconds = d.getSeconds();
	if (seconds < 10) {
	    seconds = "0" + seconds;
	}
	var milliSeconds = d.getMilliseconds();
	var date = d.getDate();
	if (date < 10) {
	    date = "0" + date;
	}
	var month = d.getMonth()+1;
	if (month < 10) {
	    month = "0" + month;
	}
	var year = d.getFullYear();
	var currentDate= year+'-'+month+'-'+date+'T'+hr+':'+min+':'+seconds+'.'+milliSeconds+'+08:00';
	return currentDate;
}
//CHG_OXS - Ends