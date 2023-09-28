function getXmlHttpObject()
{
	var xmlHttp=null;
	try 
	{
		xmlHttp = new XMLHttpRequest();
	} catch (e) {
		try {
			xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}


var myFormName;

function ajaxFormSubmit(formName)
{
	return ajaxFormSubmitSpecify(formName,"ajaxResponse",dsPageID);
}

function ajaxFormSubmitSpecify(formName,responseID,pageID)
{
//	alert("form submit - page ["+formName+":"+responseID+":"+pageID+"]");
	var params="";

	try {
		var $invalid = $("form[name="+formName+"]").find("input:not(:valid):not([type=hidden]):not([readonly])");
		if ($invalid.length > 0) {
			$invalid[0].focus();
			document.getElementById(responseID).innerHTML="Please complete all required fields.";
			return false;
		}
	} catch (eee) {} 

	document.getElementById(responseID).innerHTML="<img src='/static/spinner.gif'/> Sending ...";
	
	params="dsPageID="+pageID;
	myFormName=formName;
	var f = document.forms[formName];
	for (var i=0;i<f.elements.length;++i) {
		var e= f.elements[i];
		var kk=e.name;
		var vv=e.value;
		if (e.type=='radio') {
			if (!e.checked)
				kk="";
		}
		if (e.type=='checkbox') {
			if (!e.checked)
				kk="";
		}
		
		if (kk!='') {
//			alert("["+kk+"] = ["+vv+"]");
			params+="&"+encodeURIComponent(kk)+"="+encodeURIComponent(vv);
		}

//		if (e.type!='submit' && e.type!='button')
//			e.value='';
	}
	//disable "submit"
	
	xmlHttp = getXmlHttpObject();
	if (xmlHttp == null) {
		document.getElementById(responseID).innerHTML="Unable to submit.";
		return true; //try submit instead.
	}

	var url = "/core/ajaxFormPost.php";
	xmlHttp.onreadystatechange=function() { formStateChanged(responseID); }
	xmlHttp.open("POST",url,true);
	xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlHttp.setRequestHeader("Content-length", params.length);
	xmlHttp.setRequestHeader("Connection", "close");
	xmlHttp.send(params);

	try {
		gtag('event', 'Contact', {
			'event_category': 'Contact',
			'event_label': 'Contact Form Completed - '+pageID
		});
	} catch (err) {}
	try {
		_gaq.push(['_trackEvent','Contact','Contact','Contact Form Completed - '+pageID]);
	} catch (err) {}
	try {
		ga('send', 'event', 'Contact', 'Contact','Contact Form Completed - '+pageID);
	} catch (err) {}
	
	//Display "thank you"
	
	//Clear fields
	
//	alert("done: ["+params+"]");
	return false; //don't submit
}


function formStateChanged(responseID)
{
	if (xmlHttp.readyState == 4) {
//		document.orderform.submit.disabled=true;
//		document.getElementById("continuePrevent").style.display='inline';
		var rr=xmlHttp.responseText;
		if (rr.indexOf("captcha fail")>=0) {
			document.getElementById(responseID).innerHTML="Sorry, please type the correct characters.";
			//Recaptcha.reload();
		} else {
			document.getElementById(responseID).innerHTML=rr;
			document.forms[myFormName].reset();
		}


		
		//Clear form
//		var t="Could not determine availability for <strong>"+site+"</strong>";
//		if (rr=='')
//			t="Could not determine availability for <strong>"+site+"</strong>";
//		else if  (rr==0) {
//			t="<strong>"+site+"</strong> is Available!";
//			document.orderform.submit.disabled=false;
//			document.getElementById("continuePrevent").style.display='none';
//		}
//		else if (rr==1)
//			t="<strong>"+site+"</strong> is Already taken.";
//		document.getElementById("isDomainAvailable").innerHTML=t;
	}
}

function refreshCaptcha()
{
       try {
               $(".captchaImage").prop("src","/core/security/captcha.php?d="+(new Date()).getTime());
       } catch (err) {}
}




var myFormName2;

function ajaxFormLink(formName)
{
        return ajaxFormLinkSpecify(formName,"ajaxResponse",dsPageID);
}

function ajaxFormLinkSpecify(formName,responseID,pageID)
{
//      alert("form submit - page ["+formName+":"+responseID+":"+pageID+"]");
        var params="";

    document.getElementById(responseID).innerHTML ="<img src='/static/spinner.gif'/> Sending ...";

        params="dsPageID="+pageID;
        myFormName2=formName;
        var f = document.forms[formName];
        for (var i=0;i<f.elements.length;++i) {
                var e= f.elements[i];
                var kk=e.name;
                var vv=e.value;
                if (e.type=='radio') {
                        if (!e.checked)
                                kk="";
                }
                if (e.type=='checkbox') {
                        if (!e.checked)
                                kk="";
                }

                if (kk!='') {
//                      alert("["+kk+"] = ["+vv+"]");
                        params+="&"+encodeURIComponent(kk)+"="+encodeURIComponent(vv);
                }

//              if (e.type!='submit' && e.type!='button')
//                      e.value='';
        }
        //disable "submit"

        xmlHttp = getXmlHttpObject();
        if (xmlHttp == null) {
                document.getElementById(responseID).innerHTML="Unable to submit.";
                return false; //try submit instead.
        }

        var url = "/core/ajax/ajaxFormSave.php";
        xmlHttp.onreadystatechange=function() { formStateChanged2(responseID); }
        xmlHttp.open("POST",url,true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.setRequestHeader("Content-length", params.length);
        xmlHttp.setRequestHeader("Connection", "close");
        xmlHttp.send(params);

        try {
                _gaq.push(['_trackEvent','Contact','Contact','Contact Form Completed - '+pageID]);
        } catch (err) {}

        //Display "thank you"

        //Clear fields

//      alert("done: ["+params+"]");
        return false; //don't submit
}


function formStateChanged2(responseID)
{
        if (xmlHttp.readyState == 4) {
//              document.orderform.submit.disabled=true;
//              document.getElementById("continuePrevent").style.display='inline';
                var rr=xmlHttp.responseText;
                if (rr.indexOf("captcha fail")>=0) {
                        document.getElementById(responseID).innerHTML="Sorry, please type the correct characters.";
                        //Recaptcha.reload();
                } else {

                        if (typeof _LMZAjaxFormSaveReply !== "undefined") {
                                document.getElementById(responseID).innerHTML=""; // hide spinner
                                _LMZAjaxFormSaveReply(myFormName2,responseID,rr);
                        } else {
                                document.getElementById(responseID).innerHTML=rr;
                                document.forms[myFormName2].reset();
                        }
                }
        }
}



function loadFormFromKey(key, callback)
{
        $("#saveKey").val(key);

        $.ajax({
                type: "POST",
                method: "POST",
                url:"/core/ajax/ajaxFormLoad.php",
                data: { key: key }
        }) . done(function(msg) {
                console.log(msg);
                var data = JSON.parse(msg);
                for (var key in data) {
                        if (data.hasOwnProperty(key) && key!="saveKey") {
                                var $e = $("#"+key);
                                if ($e.length) {
                                        $e.val(data[key]);
                                }
                        }
                }
				if (callback && typeof callback == 'function') {
					callback();
				}
        });
}


