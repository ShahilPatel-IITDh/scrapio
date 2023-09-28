if(typeof transStaticPath != "string"){
	var transStaticPath = "ConsumerStatic";
}

if(typeof transWebPath != "string"){
	var transWebPath = "ConsumerWeb";
}

function popWin(url,width,height) {
	open (url,"NewWindow", "scrollbars=yes,menubar=no,resizable=1,copyhistory=1,width=" + width + ",height=" + height);
}
function getSSL(page) {
  	if (page.toLowerCase().indexOf("http") == -1 && page.toLowerCase().indexOf("https") == -1) {
	  return "https://" + window.location.hostname + page;
	} else {
      return page;
    }
}
function getSSLOpen(page) {
	window.location=("https://" + window.location.hostname + page);
}
function getSSLPop(page) {
	window.open("https://" + window.location.hostname + page);
}
function siteDisclosure( linktype, ourSite, newSite, newSiteURL, newWindow ){
	// Submit information to Site Catalyst regarding the exit link for accurate reporting
	// example of parameters passed
	// 'website', '${brands.bankFullName}', 'LinkedIn', '${brands.urlLinkedin}', 'yes'
	
	// Set up the site catalyst object
	s=s_gi(s_account);
	
	// Tracking variables
	s.linkTrackVars = 'campaign';
	
	// Create a variable to be used as a unique page identifier
	var siteCatalystReference = scatalyst.pageName+":"+newSite;
	
	// event98 defines this as an exit link
	s.events='event98';
	
	// Pulling the URL for the exit link and pass it to getQueryVariable to extract the tracking ID
	s.campaign=getQueryVariable(newSiteURL,"ecid");
	
	// tl is the track link function
	s.tl(this,'e',siteCatalystReference);
	// End of Site Catalyst code
	
	switch ( linktype ) {
		// Linking to an FNNI family site
		case "website":
			confirmValue = confirm( "Thanks for visiting " + ourSite + ".  You are now leaving our website.  Please be aware that any products and services accessed through this website are not provided by " + ourSite + ".  " + newSite + " may have a privacy policy and security policy that are different from " + ourSite + ".  Please review " + newSite + "'s privacy and security policies." );
			break;
	}//end switch
	if ( confirmValue ) {
		if ((newWindow != "yes") && (newWindow !="true")){
			document.location=newSiteURL;
		}//end nested if
		else {
			window.open(newSiteURL);
		}//end else
	}//end if
}//end siteDisclosure

function trackEcid( referencedURL ){
	// Submit information to Site Catalyst regarding the clicked link for accurate reporting
	// examples of parameter passed, parameter must be in one of the following formats 
	// ecidTracking($("#track-me").attr('href'));
	// ecidTracking("https://idpq.firstnational.com/idmauth/idpsso?providerid=CSOD&ecid=ConnectToLearningCenter");
	// ecidTracking("ecid=testecidoptions");
	//
	// How to call this function -
	//
	// In the following example the call to the function is bound to the click of the element with the id #track-me.
	// This would need to be added in a document.ready() section to work.
	// 
	// $("#track-me").on("click", function (event){
	//	use variation of sample from above here like below -
	//	ecidTracking($("#track-me").attr('href'));
	// });
	
	// Set up the site catalyst object
	s=s_gi(s_account);
	
	// Tracking variables
	s.linkTrackVars = 'campaign,prop19';
	
	// Create a variable to be used as a unique page identifier
	var siteCatalystReference = scatalyst.pageName;
	
	// Pulling the URL for the link and pass it to getQueryVariable to extract the specified parameter
	s.campaign=getQueryVariable(referencedURL,"ecid");
	s.prop19 = getQueryVariable(referencedURL,"ecid");
	
	// tl is the track link function
	s.tl(this,'o',siteCatalystReference);
	// End of Site Catalyst code

}//end trackEcid

function getQueryVariable(url,variable)
{
	var queryString;
		
	if(url){
		queryString = url.substring( url.indexOf('?') + 1 );		
	}else{
		queryString = window.location.search.substring(1);
	}
	
	var vars = queryString.split("&");
	
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	
	return(false);
}

function FooterDate()
{
	var ftrDate=new Date();
	var ftrYear=ftrDate.getFullYear();
	document.write(ftrYear);
}

sendAjaxRequestForRatesData=function(getOrPost, urlToAccess, dataType, isCache, field_id, successFunction, failureFunction) {
	$.ajax({
		type: getOrPost,
		url: urlToAccess,
		dataType: dataType,
		cache:isCache,
		success:function(xml){
			//alert(successFunction);
			successFunction(xml,field_id);
		},
		error:function(jqXHR, textStatus, errorThrown){
			if((jqXHR.status == 404)&&(! typeof failureFunction==='undefined')){
				//XML file not found. Move to build next rates table if there are any.
				failureFunction;
			}
			else
				//unexpected error. Do not proceed to build more tables.
				return;
		}
	});
};

function ratesDateSuccess(xml,field_id){
	$(field_id).html($(xml).find("RATE_UPLOAD_DATE").text().split(" ")[0]);
}

function ratesAPYSuccess(xml,field_id){
	field_name=field_id.substring(1);
	
	$(xml).find("PRODUCT").each(function () {
		if(field_name=="cd-apy"){
			if($(this).find("ACCT_TYPE").text()=="60 Month"){
				$(field_id).html($(this).find("APY").text().slice(0,-1));
			}
		}else if(field_name=="savings-apy"){
			$(field_id).html($(this).find("APY").text().slice(0,-1));
		}else if(field_name=="checking-apy"){
			$(field_id).html($(this).find("APY").text().slice(0,-1));
		}
	});
}

function ratesRateSuccess(xml,rate_id){
	$(rate_id).html($(xml).find("RATE_CHECKING").text().split(" ")[0]);
}

function ratesRateOnlySuccess(xml,rate_id){
	$(rate_id).html($(xml).find("RATE").text().split(" ")[0]);
}

function CDSuccess(xml){
	var tableCDHeaderCode="<table class='branded'> <thead> <tr> <th class='first'>If your account is a:</th> <th>The interest rate on your account will be:</th> <th>With an annual percentage yield*** of:</th>  </tr> </thead>";
	
	var toDisplay=$(xml).find("DISPLAY_THIS_RATE").text();
	toDisplay=toDisplay.toLowerCase();
	if(( toDisplay=="yes" || toDisplay=="true" || toDisplay=="show")){
		buildCDTableStructure();
		var x=1;
	 	var groupName="";
	 	var countVariableRateAccounts=0;
	 	var countAddOnAccounts=0;
	 	var singleTableCodePerGroup;
	 	$(xml).find("GROUP").each(function () {
	 		//groupName=$(this).find("NAME").text();
	 		//singleTableCodePerGroup="<strong>"+groupName+"</strong>";
	 		singleTableCodePerGroup=tableCDHeaderCode+"<tbody>";
	 		$(this).find("PRODUCT").each(function () {
	 			var accountConstraints="";
	 			var account_type=$(this).find("ACCT_TYPE").text();
	 			if($(this).find("VARIABLE_RATE").text()=="Yes"){
	 				countVariableRateAccounts++;
	 				account_type="<span class='notification-ref cross'>"+account_type+"</span>";
	 			}
	 			if($(this).find("ADD_ON_ACCT").text()=="Yes"){
	 				countAddOnAccounts++;
	 				account_type="<span class='notification-ref double-dagger'>"+account_type+"</span>";
	 			}
	 			if($(this).find("OPTIONAL_CONSTRAINTS").length>0){
					var alphaNumericPattern=/[0-9a-zA-Z]/;
					if($(this).find("OPTIONAL_CONSTRAINTS").text().search(alphaNumericPattern)!=-1)
						accountConstraints="<span class='description'>("+$(this).find("OPTIONAL_CONSTRAINTS").text()+")</span>";
				}
	 			if (x%2==1)
			 	{
			 		singleTableCodePerGroup=singleTableCodePerGroup+"<tr class='odd'><td class='cd-type'>"+account_type+accountConstraints+"</td><td class='rate'>"+$(this).find("RATE").text()+"</td><td class='apy'>"+$(this).find("APY").text()+"</td></tr>";
			  	}
	    		else
			  	{
			  		singleTableCodePerGroup=singleTableCodePerGroup+"<tr class='even'><td class='cd-type'>"+account_type+accountConstraints+"</td><td class='rate'>"+$(this).find("RATE").text()+"</td><td class='apy'>"+$(this).find("APY").text()+"</td></tr>";
			  	}
			  	x++;
	 		});
	 		singleTableCodePerGroup=singleTableCodePerGroup+"</tbody></table>";
	 		$("#allCDRates").append(singleTableCodePerGroup);
	 	});
	 	var staticCDVarRateStuff="";
	 	var staticCDAddOnAcctStuff="";
	 	if(countVariableRateAccounts>0)
	 		staticCDVarRateStuff="<div class='notification cross'>Rates may change after the account is opened.</div>";
		if(countAddOnAccounts>0)
			staticCDAddOnAcctStuff="<div class='notification double-dagger'>The account is an add-on account.</div>";
		//staticCDStuffAfterRevDateDisplay=staticCDVarRateStuff+staticCDAddOnAcctStuff+staticCDStuffAfterRevDateDisplay;
		//$("#revisionDateCD").html(staticCDStuffBeforeRevDateDisplay+$(xml).find("RATE_UPLOAD_DATE").text().split(" ")[0]+". &nbsp;A penalty may be imposed for early withdrawal. &nbsp;Fees may reduce earnings on the account.</div>"+staticCDStuffAfterRevDateDisplay);
	}
}

function buildCDTableStructure() {
	var toggleCDRates;
	toggleCDRates='<div id="allCDRates"></div><div id="revisionDateCD"></div>';
	$('.cdDisclosureRates').append(toggleCDRates);
}

var Rates={};

//mortgagebot nugget global map
Rates.mortgageBotNuggetMap={"castle":"castlebank",
							"fnbil":"firstnational1",
							"colorado":"1stnationalbank",
							"default":"firstnational1",
							"kansas":"fnbk",
							"omaha":"firstnational1",
							"southwest":"jpayne-firstnational1lo",
							"shelby":"scsbnet.com"};

Rates.rateMap={1:"15 Year Fixed Rate",
			   2:"30 Year Fixed Rate",
			   3:"FHA 30 Year Fixed Rate"};

Rates.brandCode="";
Rates.protocolType="";
Rates.mortgageBotNugget="";
Rates.rateToDisplay="";

//BrandCode is passed as an argument to startMortgageRatesLoading.
//startMortgageRatesLoading is called from the marketing side in mortgage-loans.fhtml.
//brandCode is derived from brandPrime's mortgageBotBrandCode property.
//brandCode should be the folder name of the branch.
//mortgageBotNugget is determined in this code based on the brandCode.
//See Rates.mortgageBotNuggetMap above.
function startMortgageRatesLoading(brandCode,displayRate,isLocal){
	if(typeof isLocal==='undefined')
		Rates.protocolType="https";
	else{
		if(isLocal=='true')
			Rates.protocolType="http";
		else
			Rates.protocolType="https";
	}
	
	Rates.rateToDisplay=Rates.rateMap[displayRate];
	Rates.brandCode=brandCode;
	Rates.mortgageBotNugget=getMortgageBotNugget(brandCode);
		
	if(brandCode=='kansas' || brandCode=='default' || brandCode=='omaha' || brandCode=='fnbil' || brandCode=='colorado' || brandCode=='southwest' || brandCode=='shelby')
		callMortgageRatesXML("bot");
	else
		callMortgageRatesXML("xml");	
}

function getMortgageBotNugget(nugget){
	var found=false;
	var value;
	for(mortgageKey in Rates.mortgageBotNuggetMap){
		if(mortgageKey==nugget){
			found=true;
			value=Rates.mortgageBotNuggetMap[mortgageKey];
		}
	}
	if(!found)
		value="firstnational1";
	Rates.mortgageBotNugget=value;
	return value;
}

function callMortgageRatesXML(mode) {		
	
	var cache=true;
	if(mode=='bot')
		url="/"+transWebPath+"/"+Rates.brandCode+"/rates/mortgage-bot";
	else{
		url="/"+transStaticPath+"/"+Rates.brandCode+"/rates/mortgageRates.xml";
		cache=false;
	}

	$.ajax({
		type: "GET",
		url: url,
		dataType: "xml",
		cache:cache,
		success:function(xml){
			mortgageRatesSuccess(xml);
		},
		error:function(jqXHR, textStatus, errorThrown){
			if((jqXHR.status == 404)&&(! typeof failureFunction==='undefined')){
				//XML file not found.
			}
			else
				//unexpected error. Do not proceed to build more tables.
				return;
		}
	});
}

function mortgageRatesSuccess(xml){
	var mortgageBotNugget=Rates.mortgageBotNugget;
	var toDisplay="";
	if(! ($(xml).find("DISPLAY_THIS_RATE").length>0)){
		toDisplay="yes";
	}
	else
		toDisplay=$(xml).find("DISPLAY_THIS_RATE").text();
	
	toDisplay=toDisplay.toLowerCase();
	
	if(( toDisplay=="yes" || toDisplay=="true" || toDisplay=="show")){
		var rate_link;
		var new_rate_link;
		$(xml).find("PRODUCT").each(function () {
			$(".mortgage_rate_date").html($(xml).find("RATE_UPLOAD_DATE").text().split(" ")[0]);
			if($(this).find("DESCR").text()==Rates.rateToDisplay) {
				$("#banner-rate").html($(this).find("RATE").text() + "% ");
			}
		});
	}
}

getTrafficDriverCalcState = function() {
	var cname = "calculators=";
	var cvalue = null;
	$.each(document.cookie.split(';'), function(index, value) {
		var v = $.trim(value);
		if (v.indexOf(cname) == 0) {
			cvalue = v.substring(cname.length, v.length);
			return false;
		}
	});
	return JSON.parse(cvalue || "{}");
}

setTrafficDriverCalcStateByCategory = function(category, inputs) {
	var calculatorState = getTrafficDriverCalcState();
	var categoryState;
	if (calculatorState.hasOwnProperty(category)) {
		categoryState = calculatorState[category];
	} else {
		categoryState = {};
		calculatorState[category] = categoryState;
	}
	
	$.each(inputs, function(key, value) {
		categoryState[key] = value;
	});
	document.cookie = "calculators=" + JSON.stringify(calculatorState) + "; path=/";
}

setTrafficDriverCalcCookie = function(category) {
	var inputStrings = {};

	$("#traffic-driver-calc :input[type=text]").each(function(){
		inputStrings[$(this).attr('name')] = eval("$(\"#" + $(this).attr('name') + "\").val().replace(/[^0-9.]/g, \"\")");
	});	
	
	setTrafficDriverCalcStateByCategory(category, inputStrings);
}

function modURLDynApp(elementSelector) {
	//This function gets the parameters agent and or sub from the current window URL
	//and appends them to the HREF property provided identified by the passed parameter
	
	//elementSelector - the selector of the anchor to be used, be specific unless the desire 
	//is to have multiple anchors modified.
	
	//Currently it only looks for an agent and/or sub parameter in the URL and appends them 
	//as /agent/sub unless on or the other doesn'e exist.
	
	//examples:
	//Page URL: https://wwd.firstbankcard.com/ducksunlimited/landingpage/bobs/index.html?agent=111&sub=222
	//Anchor URL: https://wwd.yourbankcard.com/dynapp/da/FVW4LBKJ9W7BW
	//Modified Anchor URL: https://wwd.yourbankcard.com/dynapp/da/FVW4LBKJ9W7BW/111/222

	//Page URL: https://wwd.firstbankcard.com/ducksunlimited/landingpage/bobs/index.html?sub=222
	//Anchor URL: https://wwd.yourbankcard.com/dynapp/da/FVW4LBKJ9W7BW
	//Modified Anchor URL: https://wwd.yourbankcard.com/dynapp/da/FVW4LBKJ9W7BW/222
	
	$(elementSelector).click(function(event) {
		var agent = getQueryVariable('','agent');
		var sub = getQueryVariable('','sub');
		var href = $('a').attr('href');
		
		if(agent){
			agent = agent.substring(0,3);
			href = href+"/"+agent;
		}
		
		if(sub){
			sub = sub.substring(0,3);
			href = href+"/"+sub;
		}
		
		var href = $('a').attr('href', href);
	});		
}