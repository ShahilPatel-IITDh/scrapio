var digitalData
var dtmPageName
var dtmCurrDomain = (window.location.hostname).toString();
var dtmCurrPath = (window.location.pathname).toString();
var dtmCountry = checkStr($("meta[name='page.country']").attr("content")) != "" ? checkStr($("meta[name='page.country']").attr("content")) : "sg";
var dtmLanguage
var dtmCurrSegment
var dtmBusiness
var dtmHierarchy
var dtmLanguage = checkStr($("meta[name='page.language']").attr("content")) != "" ? checkStr($("meta[name='page.language']").attr("content")) : "en";
var dtmFormName
var dtmProductName
var dtmServiceName
var dtmSubCat1
var dtmSubCat2
var dtmCurrPathArray
var destinationUrl = dtmCurrDomain+(window.location.pathname).toString();
var s="";
var s2 = {};
//copy all s object to temp
for (var i in s) {
	s2[i]  = s[i];
}


/********************************************************************************/
/** Fecthing PageName 														**/
/********************************************************************************/
/*Removing the first / from dtmCurrPath*/
dtmCurrPath = dtmCurrPath.substr(1);

/*Creating Pagename*/
dtmPageNameArray = dtmCurrPath.split("/").join(":");


/* Page Name Clean Up Code - Start */
dtmPageNameArray=dtmPageNameArray.toLowerCase();
dtmPageNameArray=dtmPageNameArray.replace(new RegExp(/pages:/g),"");
//to replicate ":index" treatment to ""
dtmPageNameArray=dtmPageNameArray.replace(/:index/,"");
/* sharepoint */
dtmPageNameArray=dtmPageNameArray.replace(/:default.aspx/,"");
dtmPageNameArray=dtmPageNameArray.replace(new RegExp(/.aspx/g),"");
//to replicate ".aspx" treatment to ".page"
dtmPageNameArray=dtmPageNameArray.replace(/:default.page/,"");
dtmPageNameArray=dtmPageNameArray.replace(new RegExp(/.page/g),"");
//remove all occurence of "?" to prevent duplicate pagename entry
dtmPageNameArray = dtmPageNameArray.replace(/\?/g, "");
//Merged from GM-MM s_code - Start
dtmPageNameArray=dtmPageNameArray.replace(/home:default.page/,"home:index.html");
/* Page Name Clean Up Code - End */

if (dtmPageNameArray == "") {
	dtmPageName = dtmCountry + ":" + dtmLanguage;
} else {
	dtmPageName = dtmCountry + ":" + dtmLanguage + ":" + changeTPC(dtmPageNameArray);
}

/********************************************************************************/
/** Fecthing Hierarchy 														**/
/********************************************************************************/

var dtmSiteSection1="";
var dtmSiteSection2="";
var dtmSiteSection3="";
var dtmSiteSection4="";
var dtmSiteSection5="";
var dtmSiteSection6="";

/* Break up Page Name into sections and sub sections  */
var valueArray = dtmPageName.split(":");
if(valueArray[1]!=undefined) {
	dtmSiteSection1=valueArray[0]+':'+valueArray[1];			//Site Country
	dtmHierarchy=valueArray[0]+'|'+valueArray[1];
	if(valueArray[2]!=undefined) {
		dtmHierarchy=valueArray[0]+'|'+valueArray[1]+'|'+valueArray[2];
		dtmChannel=valueArray[0]+':'+valueArray[1]+':'+valueArray[2];
		dtmSiteSection2=valueArray[0]+':'+valueArray[1]+':'+valueArray[2];				//Site Channel
		//s.eVar66 = valueArray[2];
		if(valueArray[3]!=undefined) {
			dtmSiteSection3=valueArray[3];	//Sub Section L2
			dtmHierarchy=valueArray[0]+'|'+valueArray[1]+'|'+valueArray[2]+'|'+valueArray[3];
			if(valueArray[4]!=undefined) {
				dtmSiteSection4=valueArray[4];	//Sub Section L3
				dtmHierarchy=valueArray[0]+'|'+valueArray[1]+'|'+valueArray[2]+'|'+valueArray[3]+'|'+valueArray[4];
				if(valueArray[5]!=undefined) {
					dtmSiteSection5=valueArray[5];	//Sub Section L4
					dtmHierarchy=valueArray[0]+'|'+valueArray[1]+'|'+valueArray[2]+'|'+valueArray[3]+'|'+valueArray[4]+'|'+valueArray[5];
					if(valueArray[6]!=undefined) {
						dtmSiteSection6=valueArray[6];	//Sub Sub Sub Section
						dtmHierarchy=valueArray[0]+'|'+valueArray[1]+'|'+valueArray[2]+'|'+valueArray[3]+'|'+valueArray[4]+'|'+valueArray[5]+'|'+valueArray[6];
					}
				}
			}
		}
	}
}


/********************************************************************************/
/** Form Name, Product name and Service name								**/
/**************************************************************************/

// Set Form name
dtmFormName = dtmPageName.replace(/:/g,"_");


// Set Product Name
var productType = $("meta[name='product.productType']").attr("content");
var pprimaryCat = $("meta[name='product.primaryCat']").attr("content");
var psubCat1 = unescape($("meta[name='product.subCat1']").attr("content"));

if (productType!=undefined && productType != "") {
	dtmProductName = productType;
	if (pprimaryCat!=undefined && pprimaryCat != "") {
		dtmProductName = productType+':'+pprimaryCat;
		if (psubCat1!=undefined && psubCat1 != "") {
			//dtmProductName = productType+':'+pprimaryCat+':'+psubCat1;
			//Set SubCategory for multiple products
			var values = [];
          if(psubCat1.indexOf(';') > 0)
          {
             digitalData ={ 
                           "product" : {
                           "category": {
                           "productType": checkStr($("meta[name='product.productType']").attr("content")),
                           "primaryCategory": checkStr($("meta[name='product.primaryCat']").attr("content"))
                            }
                            }
                          };

                          var finalProducts = psubCat1.split(";");
                          for (var i=0;i<finalProducts.length;i++) {
                          var item = {"product": {
                                                 "category" : {
                                                 "subCategory1": productType+':'+pprimaryCat+':'+finalProducts[i]
                                                               }
                                                   }
                                     }
                          	values.push(item);  
                            //setting value for eVar58
                            var multiProduct = productType+':'+pprimaryCat+':'+finalProducts[i];
                            if(i==0) {
                            dtmProductName = multiProduct; 
                            }
                            else{
                              dtmProductName = dtmProductName +",;"+multiProduct; 
                            }
                      }                       
            
          }else{
              var item = { 
                              "product" : {
                              "category": {
                                          //"productType": checkStr($("meta[name='product.productType']").attr("content")),
                                          //"primaryCategory": checkStr($("meta[name='product.primaryCat']").attr("content")),
                                          "subCategory1": productType+':'+pprimaryCat+':'+psubCat1
                                          }
                                          }
                                      }
                      values.push(item);
            		  dtmProductName = productType+':'+pprimaryCat+':'+psubCat1; 
              }
		}
	}
}



// End multiple product tracking

// Set Service Name
var serviceType = $("meta[name='service.serviceType']").attr("content");
var sprimaryCat = $("meta[name='service.primaryCat']").attr("content");
var ssubCat1 = $("meta[name='service.subCat1']").attr("content");

if (serviceType!=undefined && serviceType != "") {
	dtmServiceName = serviceType;
	if (sprimaryCat!=undefined && sprimaryCat != "") {
		dtmServiceName = serviceType+':'+sprimaryCat;
		if (ssubCat1!=undefined && ssubCat1 != "") {
			dtmServiceName = serviceType+':'+sprimaryCat+':'+ssubCat1;
		}
	}
}

/**
 Check for undefined/null and return empty
 **/
function checkStr(val){
	return (val === undefined || val == null || val.length <= 0) ? "" : trimStr(val);
}

/**
 Trim unwanted spaces
 **/
function trimStr(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

/**
 * Change page name from treasures-private-client to tpc if exisit
 */

function changeTPC (str) {
                  if (str.indexOf("treasures-private-client") > -1 ) {
                        return str.replace('treasures-private-client', 'tpc');
                  } else if (str.indexOf("private-banking") > -1 ) {
                        return str.replace('private-banking','private-bank');
                  } else if (dtmCurrDomain == "www.posb.com.sg" || dtmCurrDomain == "dbsweb-posb.sgp.dbs.com" || dtmCurrDomain == "preview-posb.sgp.dbs.com" || dtmCurrDomain == "dbsweb-s01.posb.com.sg" || dtmCurrDomain == "dbsweb-uat-posb.sgp.dbs.com" || dtmCurrDomain == "dbswebuatak-www.posb.com.sg" || dtmCurrDomain == "dbsweb-g01-prv.posb.com.sg") 
                  {
                       if(str.indexOf('personal')> -1)
                       {
                        return str.replace('personal','personal:posb');
                       }else{
                       	return str.replace('i-bank','personal:posb');
                       }
                  }else {
                        return str;
                  }
}



function getPromoName (str) {
	if (str == undefined || str == "") {
		var category =""; $('.breadcrumb li a').each(function() { if(category != ""){ category = category +":"+$(this).text(); } else { category = $(this).text(); } }); if (category =="") { $('.seo-div-breadcrumb a').each(function() { if(category != ""){ category = category +":"+$(this).text(); } else { category = $(this).text(); } }); }

		if (dtmCountry == "sg") {
			//for promotion
			if(destinationUrl.indexOf('/promotion/')> -1 ){
				var promoName = $('h1').text();
				return checkStr(promoName);
			} 
		  } 

	} else {
		return str;
	}

}

/********************************************************************************/
/** Sub Category 1 and Sub Category 2								**/
/**************************************************************************/

dtmCurrPathArray = dtmCurrPath.split("/");
var categoryInitial = dtmCountry + ":" + dtmLanguage + ":" +checkStr($("meta[name='page.site']").attr("content")) + ":" + checkStr($("meta[name='page.primaryCat']").attr("content"));

if (checkStr(dtmCurrPathArray[1]) != "" && dtmCurrPathArray[1].indexOf(".page") == -1) {
	dtmSubCat1 = categoryInitial + ":" + dtmCurrPathArray[1];
	if (checkStr(dtmCurrPathArray[2]) != "" && dtmCurrPathArray[2].indexOf(".page") == -1) {
		dtmSubCat2 = categoryInitial + ":" + dtmCurrPathArray[1]+ ":" +dtmCurrPathArray[2];
	} else {
		dtmSubCat2 = "n/a";
	}
} else {
	dtmSubCat1 = "n/a";
	dtmSubCat2 = "n/a";
}

/********************************************************************************/
/** Site Name								**/
/**************************************************************************/
var site =   dtmCountry + ":" + dtmLanguage + ":" + checkStr($("meta[name='page.site']").attr("content"));


/********************************************************************************/
/** Assigning data layer to DTM 											**/
/*******************************************************************************/
digitalData = {
	"page": {
		"pageInfo": {
			"pageName": checkStr(dtmPageName),
			"language": checkStr($("meta[name='page.language']").attr("content")),
			"hier": checkStr(dtmHierarchy),
			"brand": checkStr($("meta[name='page.brand']").attr("content")),
			"country": checkStr($("meta[name='page.country']").attr("content")),
			"destinationURL": destinationUrl
		},
		"category": {
			"primaryCategory": checkStr($("meta[name='page.primaryCat']").attr("content")),
			"subCategory1": dtmSubCat1,
			"subCategory2": dtmSubCat2,
			"site": site,
			"pageType": checkStr($("meta[name='page.pageType']").attr("content"))
		}
	},
  	"item": values,
	"product": {
		"category": {
			"productType": checkStr($("meta[name='product.productType']").attr("content")),
			"primaryCategory": checkStr($("meta[name='product.primaryCat']").attr("content")),
			//"subCategory1": checkStr($("meta[name='product.subCat1']").attr("content"))
		},
        
		"attributes": {
			"productOffer": checkStr($("meta[name='product.productOffer']").attr("content")),
			"promoName": getPromoName(checkStr($("meta[name='product.promoName']").attr("content")))
		},
		"productInfo": {
			"productName": checkStr(dtmProductName)
		}
	},
	"service": {
		"category": {
			"serviceType": checkStr($("meta[name='service.serviceType']").attr("content")),
			"primaryCategory": checkStr($("meta[name='service.primaryCat']").attr("content")),
			"subCategory1": checkStr($("meta[name='service.subCat1']").attr("content"))
		},
		"serviceInfo": {
			"serviceName": checkStr(dtmServiceName)
		}
	},
	"form": {
		"name": checkStr(dtmFormName),
		"stepDetail": "",
		"field": "",
		"type": checkStr($("meta[name='form.primaryCat']").attr("content"))
	},
	"transaction": {
		"transactionID": ""
	}
};


