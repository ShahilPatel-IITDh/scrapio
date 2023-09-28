
var srchRef1 = document.referrer;
var domnNOTred = srchRef1.replace('http://','').replace('https://','').split(/[/?#]/)[0];
function getParam(name ,url)
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url);
	if( results == null )
	{
		return "";
	}
	else
	{
		var tmp_results = results[1].replace(/</ig,'').replace(/%3C/ig,'').replace(/>/ig,'').replace(/%3E/ig,'');
		return tmp_results;
	}
}
function appendText()
{
	var page_url_new = document.location;
	var srchRef_new	= document.referrer;
	var refRal =  "";
	var url_sc_cid_value = "" ;
	var addparamtext = ""
	refRal = srchRef_new.replace('http://','').replace('https://','').split(/[/?#]/)[0];
	url_sc_cid_value = getParam('sc_cid',page_url_new);

	if(refRal.indexOf("rediff") == "-1" && refRal != '')
	{
		if(url_sc_cid_value == "")
		{
			addparamtext = refRal;
		}
		else
		{
			addparamtext = refRal+"|"+url_sc_cid_value;
		}
	}
	else
	{
		if(url_sc_cid_value != "")
		{
			addparamtext = url_sc_cid_value;
		}
	}

	var anchertg = document.getElementsByTagName("a");
	for(var i = 0; i < anchertg.length; i++)
	{
		var urlalt = anchertg[i].getAttribute('urlAlt');
		var hrefval = anchertg[i].getAttribute('href');
		var testurl_str = "";
		if(urlalt == "ptracking")
		{
			if(hrefval.indexOf('sc_cid=') >= 0)
			{
				if(addparamtext != "")
				{
					hrefval = hrefval.replace("sc_cid=","sc_cid="+addparamtext+"|");
				}
			}
			else
			{
				if(hrefval.indexOf('?') >= 0)
				{
					if(addparamtext != "")
					{
						hrefval = hrefval+"&sc_cid="+addparamtext;
					}
				}
				else
				{
					if(addparamtext != "")
					{
						hrefval = hrefval+"?sc_cid="+addparamtext;
					}
				}
			}
			anchertg[i].setAttribute('href', hrefval);
		}
	}
}
appendText();

if(typeof $ !== "undefined"){
	$(document).ready(function(){
		$('a[urlalt="ptracking"]').each(function(){ 
			var cur_page_url = document.location;
			var oldUrl = $(this).attr("href"); // Get current url    
	
			if(oldUrl && oldUrl.length > 0 && oldUrl.indexOf('javascript:') == -1 && oldUrl.indexOf('utm_campaign') == -1){
				var utm_campaign = getParam('utm_campaign',cur_page_url);
				var utm_medium = getParam('utm_medium',cur_page_url);
				var utm_source = getParam('utm_source',cur_page_url);
				var newUrl = "";
				var appendText = [], appendTextStr = "";
	
				if(utm_campaign && utm_campaign.length > 0){
					appendText.push('utm_campaign='+utm_campaign);
				}
				if(utm_medium && utm_medium.length > 0){
					appendText.push('utm_medium='+utm_medium);
				} 
				if(utm_source && utm_source.length > 0){
					appendText.push('utm_source='+utm_source);
				}  
	
				appendTextStr = appendText.join('&');
	
				if(appendTextStr.length > 0){
					if(oldUrl.indexOf('?') >= 0){
						newUrl = oldUrl + '&' + appendTextStr;
					}
					else{
						newUrl = oldUrl + '?' + appendTextStr;
					}
					$(this).attr("href", newUrl); // Set herf value
				}
			}
			
		});
	});
}