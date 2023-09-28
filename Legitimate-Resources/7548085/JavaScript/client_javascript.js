
var ONCE = false;
var timestamp = true;
var printopt = false;
var DA = (document.all) ? 1 : 0;
window.onerror=handle_error;

function handle_error()
{
   if (printopt)   
   {
      msg = "\nNothing was printed. \n\nTo cancel this print job, ";
      msg = msg + "click on the printer icon in the toolbar above.";
      alert(msg);
   }
   
   printopt = false;   
   return true;
}

var bV=parseInt(navigator.appVersion);
var NS4=(document.layers)?true:false;
var IE4=((document.all)&&(bV>=4))?true:false; 
var ver4 = (NS4||IE4)?true:false;


function doingprint()
{  
  printopt = true;
//  if (IE4 && ver4)
//  {   printvb(); }
//  else
//  { window.print();}
  window.print();
  printopt = false;
      
}   

function GetTip(szURL)
{
   popWin = window.open(szURL,"Tip","toolbar=0,width=610,height=350,directories=0,status=0,scrollbars=1,resizable=1,menubar=0,location=0");
   popWin.focus();
}


function openUrl(szURL)
{
   popWin = window.open(szURL,"ExternalSite","toolbar=1,width=610,height=350,directories=0,status=1,scrollbars=1,resizable=1,menubar=1,location=1");
   popWin.focus();
}

function openUrl2(szURL,iHeight){
   popWin = window.open(szURL,"ExternalSite","toolbar=no,width=700,directories=no,status=no,scrollbars=yes,resizable=yes,menubar=no,location=no,height="+iHeight);
	popWin.focus();
}

function openUrl3(szURL,iHeight,iWidth){
	var ua1 = window.navigator.userAgent.indexOf("MSIE 7");
	var ua2 = window.navigator.userAgent.indexOf("MSIE 8");
	if (ua1 > 1 || ua1 > 1) {
		iHeight += 5;
		iWidth += 22;
	}
	popWin = window.open(szURL,"ExternalSite","toolbar=no,directories=no,status=no,scrollbars=yes,resizable=yes,menubar=no,location=no,height="+iHeight+",width="+iWidth);
	popWin.foucs();
}

function CloseWin()
{
   window.close()
}


function DoCancel(szURL, bWarning)
{
   if (!bCheckOnce(true))
      return;

   if (bWarning)
   {
      alert("This transaction has been cancelled at your request");
   }
   
   document.location.href = szURL;
}

function showVerisignCert()
{
    var url ="/help/ib/security_information.htm";
    sealWin=window.open(url,"Security",'toolbar=0,location=0,directories=0,status=1,menubar=1,scrollbars=1,resizable=1,width=500,height=450');
}


function bCheckOnce(Set)
{
var ret;
if (ONCE)
{
  alert("You can only submit this request once!");
  ret = false;
}  
else
  ret = true;    
      
if (Set)
  ONCE = true;

return ret;
}

function SetOnce()
{
  ONCE = true;
  return;
}


function ParseUniqueURL(szURL)
{
  var mydate = new Date();
  var tmpURL =  szURL + "&RandomId=" + mydate.getTime();
//alert(tmpURL)
  return tmpURL;

}



function SetRandom(myForm)
{
  var mydate = new Date();
//  myForm.RandomId.value = mydate.getTime();
//  alert("RandomId = " + myForm.RandomId.value);
  return true;
}
function OpenPrintWindow2(strContentName, strSkinName) {
	// prepare content for print preview
	objPreviewContent = createPreviewContent(strContentName);
	
	// check if there is content for display
	if(objPreviewContent.hasChildNodes())
	{
		// open preint preview window
		openPrintPreview(strContentName, objPreviewContent, strSkinName, 1); // casa txn history
	}
}

function OpenPrintDfpWindow(strContentName, strSkinName) {
	// prepare content for print preview
	objPreviewContent = createDfpPreviewContent(strContentName);
	
	// check if there is content for display
	if(objPreviewContent.hasChildNodes())
	{
		// open preint preview window
		openPrintPreview(strContentName, objPreviewContent, strSkinName, 1); // casa txn history
	}
}

function createDfpPreviewContent(strContentName)
{
	var bodyObject = document.getElementsByTagName(strContentName);

	if (bodyObject.length <= 0)
	{
		return false;
	}
	else
	{
		//var contentObject = getFirstChild(bodyObject[0]);
		$("tr.Insurance").each(function(){$(this).removeClass("Insurance")})
		var contentObject = bodyObject[0];
		newContentObject = contentObject.cloneNode(true);
		var strContentToShow = contentObject.innerHTML;
		var paddingObj = {"paddingLeft":"13px"};
		var forDisplay = document.createElement('div');
		forDisplay.id = 'forDisplay';
		forDisplay.appendChild(newContentObject);
		forDisplay = toggleClassNameByTagNameAndAttribute(forDisplay, 'span', 'class','timestampFP','time-stamp');
		forDisplay = toggleClassNameByTagNameAndAttribute(forDisplay, 'span', 'class','timestampFP ','time-stamp');
		forDisplay = replaceElementByTagName(forDisplay,'section','div'); // Defect Fix MR1403_2047
		forDisplay = replaceElementByTagName(forDisplay,'header','div'); // Defect Fix MR1403_8467
		forDisplay = selectHTMLElements(forDisplay, 'input',contentObject);
		forDisplay = selectHTMLElements(forDisplay, 'select',contentObject);
		forDisplay = selectHTMLElements(forDisplay, 'textarea',contentObject);

		forDisplay = removeElementByTagName(forDisplay, 'script');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'action-bar-inline');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'action-wrapper');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'button');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'reset');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'submit');
		
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'nextSteps');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'marketing_banner');

		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'portfolio-allocation-section');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'a', 'id', 'portfolio-allocation-section-link');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'promo');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'href');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'onclick');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'onblur');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'title');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'col-md-6 trans-subwdth');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'col-md-4 down-subwdth');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'col-md-2 print-wdth');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'breadcrumb ');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'breadcrumb col-md-8 z-in-9');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'breadcrumb col-md-8 z-in-99');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'mTop-12');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'right-action');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'p', 'class', 'text-center headertexttable');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'a', 'id', 'recurrTransBack');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'a', 'id', 'addNonDBSLink');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'a', 'id', 'filterPopupBtn');
		forDisplay = addPaddingToElementByTagNameAndAttribute(forDisplay,'span',"class","timestampFP ",{"paddingLeft":"10px"});
		forDisplay = addPaddingToElementByTagNameAndAttribute(forDisplay,'div',"id","parentCatgFilterDiv",paddingObj);
		forDisplay = addPaddingToElementByTagNameAndAttribute(forDisplay,'div',"id","filteredItemsList",paddingObj);
		forDisplay = addPaddingToElementByTagNameAndAttribute(forDisplay,'span',"class","font-weight-700",paddingObj);
		forDisplay = addPaddingToElementByTagNameAndAttribute(forDisplay,'span',"class","time-stamp",paddingObj);
		forDisplay = addPaddingToElementByTagNameAndAttribute(forDisplay,'h3',"id","childCategoryHeading",paddingObj);
        forDisplay = replaceElementByTagNameAndAttribute(forDisplay, 'select', 'id', 'filterOptions');
		forDisplay = replaceElementByTagNameAndAttribute(forDisplay, 'select', 'id', 'Months');
		forDisplay = replaceElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'custom-dropdown');
		/*if(!isCasaAccountChosen()){
			forDisplay = replaceElementByTagName(forDisplay,'a','span');
		}
		
		if(isCasaAccountChosen()){
			if($('.search-btn').css('display') == 'none')
				forDisplay = unhideElementByClassName(forDisplay,'search-btn');
		}
		
		//fix for pagination print button start
	    if(isPaginationTable(forDisplay)){
	    	forDisplay = removeAttributeByElementTagName(forDisplay, 'TR', 'style');
			forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'pageNavPosition');
	    }
	    //fix for pagination print button end
	    
	    if(isPaginationTable1(forDisplay)){
	    	forDisplay = removeAttributeByElementTagName(forDisplay, 'TR', 'style');
			forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'pageNavPosition1');
	    }*/
	    //forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'main-tabs');
	    
		tableTags = forDisplay.getElementsByTagName('table');
		for (i=0; i<tableTags.length; i++)
		{
			if (parseInt(tableTags[i].getAttribute('width')) > parseInt('600') )
			{
				tableTags[i].setAttribute('width', '100%');
			}
		}
	
		var previewContent = document.createElement('div');
		previewContent.id = 'previewContentID';
	
		// add document heading
		var previewHeader = document.createElement('h3');
		var previewHeader_text = document.createTextNode('This is a print preview page');
		previewHeader.appendChild(previewHeader_text);
		previewHeader.style.textAlign = "center";

		var preview_para = document.createElement('p');
		var cancelLink = document.createElement('a');
		cancelLink.setAttribute("href", "javascript:window.close()");	
		var cancelLink_text = document.createTextNode('Close this window.');
		preview_para.style.textAlign = "center";
		cancelLink.appendChild(cancelLink_text);

		preview_para.appendChild(cancelLink);

		// Put it all toegether
		previewContent.appendChild(previewHeader); 
		previewContent.appendChild(preview_para);
		
		var printContent = document.createElement('div');
		
		printContent.innerHTML=forDisplay.innerHTML;
		
		previewContent.appendChild(printContent);

		return previewContent;
	}
}

function OpenPrintWindow(strContentName, strSkinName)
{
	// prepare content for print preview
	objPreviewContent = createPreviewContent(strContentName);
	
	// check if there is content for display
	if(objPreviewContent.hasChildNodes())
	{
		// open preint preview window
		openPrintPreview(strContentName, objPreviewContent, strSkinName, 1); // normal
	}
}

function createPreviewContent(strContentName)
{
	var bodyObject = document.getElementsByTagName(strContentName);

	if (bodyObject.length <= 0)
	{
		return false;
	}
	else
	{
		//var contentObject = getFirstChild(bodyObject[0]);
		var contentObject = bodyObject[0];
		newContentObject = contentObject.cloneNode(true);
		var strContentToShow = contentObject.innerHTML;
	
		var forDisplay = document.createElement('div');
		forDisplay.id = 'forDisplay';
		forDisplay.appendChild(newContentObject);
		forDisplay = replaceElementByTagName(forDisplay,'section','div'); // Defect Fix MR1403_2047
		forDisplay = replaceElementByTagName(forDisplay,'header','div'); // Defect Fix MR1403_8467
		forDisplay = selectHTMLElements(forDisplay, 'input',contentObject);
		forDisplay = selectHTMLElements(forDisplay, 'select',contentObject);
		forDisplay = selectHTMLElements(forDisplay, 'textarea',contentObject);

		forDisplay = removeElementByTagName(forDisplay, 'script');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'action-bar-inline');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'action-wrapper');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'button');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'reset');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'submit');
		
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'nextSteps');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'marketing_banner');

		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'portfolio-allocation-section');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'a', 'id', 'portfolio-allocation-section-link');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'promo');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'href');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'onclick');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'onblur');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'title');
		if(typeof isCasaAccountChosen !=='undefined' && $.isFunction(isCasaAccountChosen)){
                  if(!isCasaAccountChosen()){
                        forDisplay = replaceElementByTagName(forDisplay,'a','span');
                  }
                  
                  if(isCasaAccountChosen()){
                        if($('.search-btn').css('display') == 'none')
                              forDisplay = unhideElementByClassName(forDisplay,'search-btn');
                  }
            }

		
		//fix for pagination print button start
	    if(isPaginationTable(forDisplay)){
	    	forDisplay = removeAttributeByElementTagName(forDisplay, 'TR', 'style');
			forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'pageNavPosition');
	    }
	    //fix for pagination print button end
	    
	    if(isPaginationTable1(forDisplay)){
	    	forDisplay = removeAttributeByElementTagName(forDisplay, 'TR', 'style');
			forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'pageNavPosition1');
	    }
	    //forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'main-tabs');
	    
		tableTags = forDisplay.getElementsByTagName('table');
		for (i=0; i<tableTags.length; i++)
		{
			if (parseInt(tableTags[i].getAttribute('width')) > parseInt('600') )
			{
				tableTags[i].setAttribute('width', '100%');
			}
		}
	
		var previewContent = document.createElement('div');
		previewContent.id = 'previewContentID';
	
		// add document heading
		var previewHeader = document.createElement('h3');
		var previewHeader_text = document.createTextNode('This is a print preview page');
		previewHeader.appendChild(previewHeader_text);
		previewHeader.style.textAlign = "center";

		var preview_para = document.createElement('p');
		var cancelLink = document.createElement('a');
		cancelLink.setAttribute("href", "javascript:window.close()");	
		var cancelLink_text = document.createTextNode('Close this window.');
		preview_para.style.textAlign = "center";
		cancelLink.appendChild(cancelLink_text);

		preview_para.appendChild(cancelLink);

		// Put it all toegether
		previewContent.appendChild(previewHeader); 
		previewContent.appendChild(preview_para);
		
		var printContent = document.createElement('div');
		
		printContent.innerHTML=forDisplay.innerHTML;
		
		previewContent.appendChild(printContent);

		return previewContent;
	}
}

function unhideElementByClassName(objDocument, strTagName)
{
		var elements = objDocument.getElementsByClassName(strTagName);		
		for (i=0; i< elements.length; i++)
		{
			if(elements[i].style.display == "none")
				elements[i].style.display = "inline-block";
		}			
		return objDocument;
}

function isPaginationTable(forDisplay){
	var tableTags = forDisplay.getElementsByTagName('table');
	var flag=false;
		for (i=0; i<tableTags.length; i++)
		{
			//alert("tableTags[i].id ::"+tableTags[i].id );
			if(tableTags[i].id == "results"){
			
				flag=true;
			}
			
			
		}
	return flag;
	
}
function isPaginationTable1(forDisplay){
	console.log("inside isPaginationTable1 ");
	var tableTags = forDisplay.getElementsByTagName('table');
	var flag=false;
		for (i=0; i<tableTags.length; i++)
		{
			//alert("tableTags[i].id ::"+tableTags[i].id );
			if(tableTags[i].id == "prevResultTbl"){
				console.log("inside isPaginationTable1 true ");
				flag=true;
			}
		}
	return flag;
	
}

function replaceAll(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function openPrintPreview(strContentName, objPreviewContent, strSkinName, pageType)
{

	var WindowWidth = parseInt(document.getElementsByTagName(strContentName)[0].offsetWidth) + 50;
	var WindowHeight = parseInt(document.getElementsByTagName(strContentName)[0].offsetHeight) + 130;

	var WindowTop = 0;
	var WindowLeft = 0;
	var IsTallerThanScreen = true;
	var IsWiderThanScreen = true;
	var printLayoutWidth = 630;

	// checks if the table is taller than the screen
	if((screen.availHeight - WindowHeight) > 0)
	{
		WindowTop = ((screen.availHeight - WindowHeight) / 2);
		IsTallerThanScreen = false;
	}
	else
	{
		WindowHeight = screen.availHeight - 30;
		IsTallerThanScreen = true;
	}

	var sFeatures = "";
	if(IsWiderThanScreen || IsTallerThanScreen)
		sFeatures = "location=no,menubar=no,scrollbars=yes,resizable=no,status=no,toolbar=no,width=" + WindowWidth + ",height=" + WindowHeight + ",top=" + WindowTop + ",left=" + WindowLeft;
	else
		sFeatures = "location=no,menubar=no,scrollbars=no,resizable=no,status=no,toolbar=no,width=" + WindowWidth + ",height=" + WindowHeight + ",top=" + WindowTop + ",left=" + WindowLeft;

	var printPreviewWin = window.open("", "_blank", sFeatures);
	printPreviewWin.document.open(); 
	
	var htmlToBeRendered='<html><head>';
	htmlToBeRendered+='<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">';
	htmlToBeRendered+='<META HTTP-EQUIV="Content-Type" content="text/html; charset=utf-8" />';
	htmlToBeRendered+=' <meta name="viewport" content="width=1020, user-scalable=0;">';
	htmlToBeRendered+='<meta name="format-detection" content="telephone=no">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/vendor/styles/bootstrap-custom.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/theme.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/icons.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/layouts.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/form-page.css" type="text/css">';
	if (pageType == 1) {
		htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/print.css" type="text/css">';
		htmlToBeRendered += '<script language="JavaScript"> function winPrint(){window.focus();';
		if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
			htmlToBeRendered += 'printChrome();}';
			htmlToBeRendered += 'function printChrome(){if(document.readyState==\"complete\") {window.print();} else {setTimeout(\"printChrome();\",3000);}}';
		} else {
			htmlToBeRendered += 'window.print();}';
		}
		htmlToBeRendered += '</scr';
		htmlToBeRendered += 'ipt>\n';
		htmlToBeRendered += '</head><body onload="JavaScript:winPrint();">';
	} else	
		htmlToBeRendered+='</head><body class="dbs-dls form-page" onLoad="self.print()">';
		
	htmlToBeRendered+=objPreviewContent.innerHTML;
	htmlToBeRendered+='</body></html>';

	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE");
		//CE_IE_PRINT_FIX
		if(msie>0)
		  { 
		 // 	setTimeout(function(){dummyPrint()}, 2000); 
           }  
	printPreviewWin.document.write(	htmlToBeRendered);
	printPreviewWin.document.close(); 

	printPreviewWin.focus();	
}
function dummyPrint(){
}

function cancelPrintPreview(doc) {
	// remove the preview content
	var printPreview = doc.getElementById('previewContentID');
	var printPreviewBody = printPreview.parentNode;
	printPreviewBody.removeChild(printPreview);
	printPreview = doc.getElementById('forDisplay');
	printPreviewBody = printPreview.parentNode;
	printPreviewBody.removeChild(printPreview);
	window.close();
}

function getFirstChild(node)
{
	firstChild = node.firstChild;
	while (firstChild.nodeType!=1)
	  {
	  firstChild = firstChild.nextSibling;
	  }
	return firstChild;
}

function removeAttributeByElementTagName(objDocument, strTagName, strAttributeName)
{
		var elements = objDocument.getElementsByTagName(strTagName);
		for (i=0; i< elements.length; i++)
		{
			elements[i].removeAttribute(strAttributeName);
		}
		return objDocument;
}

function removeElementByTagName(objDocument, strTagName)
{
		var elements = objDocument.getElementsByTagName(strTagName);
//		for (i=0; i< elements.length; i++)
		for (i=elements.length-1; i>=0; i--)
		{
			elements[i].parentNode.removeChild(elements[i]);
		}
		return objDocument;
}

function selectHTMLElements(objNewDocument, strTagName,objOldDocument)
{
		
		var elements = objOldDocument.getElementsByTagName(strTagName);
		var newElements = objNewDocument.getElementsByTagName(strTagName);

			for (i=0; i< elements.length; i++)
			{

				if ((elements[i].getAttribute('type')=='checkbox') && elements[i].checked)
				{
					newElements[i].checked=true;
					newElements[i].defaultChecked=true;
					newElements[i].disabled=true;
				}else if ((elements[i].getAttribute('type')=='checkbox') && !elements[i].checked){
					newElements[i].disabled=true;
				}else if ((elements[i].getAttribute('type')=='radio') && elements[i].checked){
					newElements[i].defaultChecked=true;
					newElements[i].disabled=true;

				}else if ((elements[i].getAttribute('type')=='radio') && !elements[i].checked){
					newElements[i].defaultChecked=false;
					newElements[i].disabled=true;

				}else if (elements[i].selectedIndex && elements[i].selectedIndex!=-1){
					newElements[i].options[elements[i].selectedIndex].selected=true;
					newElements[i].options[elements[i].selectedIndex].defaultSelected=true;
					newElements[i].disabled=true;
				}else if (elements[i].getAttribute('type')=='text'){
				    newElements[i].defaultValue=newElements[i].value;
					newElements[i].readOnly=true;
				}else if(strTagName=='textarea'){
					newElements[i].defaultValue=elements[i].value;
					newElements[i].readOnly=true;
				}else{
					if(newElements[i]!=null)
						newElements[i].disabled=true;
				}
			}
			return objNewDocument;
}

function removeElementByTagNameAndAttribute(objDocument, strTagName, strAttributeName, strNameAttributeValue)
{
		var elements = objDocument.getElementsByTagName(strTagName);
		bMoreToRemove = true;
		deleteCount = 0;
		while (bMoreToRemove)
		{
			for (i=0; i< elements.length; i++)
			{
				if (elements[i].getAttribute(strAttributeName) == (strNameAttributeValue))
				{
					removedNode = elements[i].parentNode.removeChild(elements[i]);
					deleteCount++;
				}
			}
			elements = objDocument.getElementsByTagName(strTagName);
			if (deleteCount == 0)
			{
				bMoreToRemove = false;
			}
			deleteCount = 0;
		}
		return objDocument;
}

function replaceElementByTagNameAndAttribute(objDocument, strTagName, strAttributeName, strNameAttributeValue)
{
		var elements = objDocument.getElementsByTagName(strTagName);
		
		for (i=0; i< elements.length; i++)
		{
			if (elements[i].getAttribute(strAttributeName) == strNameAttributeValue)
			{
				if(strTagName == "select")
					newNode = document.createTextNode(elements[i].options[elements[i].selectedIndex].text);
				else
					newNode = document.createTextNode(elements[i].innerHTML);
				elements[i].parentNode.replaceChild(newNode,elements[i]);
			}
		}

		return objDocument;
}

function toggleClassNameByTagNameAndAttribute(objDocument, strTagName, strAttributeName, strNameAttributeOldValue, strNameAttributeNewValue)
{
		var elements = objDocument.getElementsByTagName(strTagName);
		for (i=0; i< elements.length; i++)
		{
			if (elements[i].getAttribute(strAttributeName) == strNameAttributeOldValue)
				{
					elements[i].setAttribute(strAttributeName,strNameAttributeNewValue);
				}
		}
			
		return objDocument;
}


function addPaddingToElementByTagNameAndAttribute(objDocument, strTagName, strAttributeName, strNameAttributeValue, paddingPair){
	var elements = objDocument.getElementsByTagName(strTagName);
	for (i=0; i< elements.length; i++)
		{
			if (elements[i].getAttribute(strAttributeName) == (strNameAttributeValue))
				{
					var htmlObj = elements[i].style;
					for(var key in paddingPair){
						elements[i].style[key] = paddingPair[key];
					}
				}
		}
	return objDocument;
}

function replaceElementByTagName(objDocument, strTagNameOld,strTagNameNew)
{
		var newElement = null;
		var elements = objDocument.getElementsByTagName(strTagNameOld);
		bMoreToRemove = true;
		deleteCount = 0;
		while (bMoreToRemove)
		{
			for (i=0; i< elements.length; i++)
			{
				newElement = document.createElement(strTagNameNew);
				newElement.className=elements[i].className; // Defect Fix MR1403_2047
				newElement.id=elements[i].id; // Defect Fix MR1403_2047
				newElement.innerHTML = elements[i].innerHTML;
				removedNode = elements[i].parentNode.replaceChild(newElement,elements[i]);
				deleteCount++;
			}
			elements = objDocument.getElementsByTagName(strTagNameOld);
			if (deleteCount == 0)
			{
				bMoreToRemove = false;
			}
			deleteCount = 0;
		}
		return objDocument;
}
function boldSignValue(signObjID,displayObjID,isAmountValue,isSecondField){
	var signObj = document.getElementById(signObjID);
	var signObjVal = signObj.innerHTML.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	var newSignOjbVal = "";
	var splitedOjb = "";
	var iPos;
	var headerTag = "<b style='font-weight: Bold; font-size: 16px; color:  #FF0000 ; background: #E9E9E9;'>",tailTag = "</b>";
	if(isAmountValue){
		var splitedStr = signObjVal.split(".");
		signObjVal = splitedStr[0];
		for(var i=splitedStr.length;i>1;i--){
			newSignOjbVal = "."+splitedStr[i-1]+newSignOjbVal;
		}
	}
	var j=1;
	var i=0;
	var tempChar;
	for(i=signObjVal.length;i>0;i--){
		tempChar = signObjVal.charAt(i-1);
		if(isNaN(parseInt(tempChar))){
			newSignOjbVal = tempChar+newSignOjbVal;
		}else{
			newSignOjbVal = headerTag+tempChar+tailTag+newSignOjbVal;
			j++;
			if(j>8){
			 break;
			}
		}
	}
	if(i>1){
		newSignOjbVal = signObjVal.substr(0,i-1)+newSignOjbVal;
	}
	if(!isSecondField){
		if(isAmountValue){
			var iPos = newSignOjbVal.indexOf("S$");
			if(iPos > -1) {
				splitedOjb = newSignOjbVal.split("S$");
				newSignOjbVal = splitedOjb[1];
			}
					
		}
		while(j<=4){
			j++;
			newSignOjbVal = headerTag+"0"+tailTag+newSignOjbVal;
		}
		if(isAmountValue){
			if(iPos > -1){
				newSignOjbVal = "S$"+newSignOjbVal;
			}
		}
	}
	document.getElementById(displayObjID).innerHTML = newSignOjbVal;
}

function OpenPrintWindowInstasure(strContentName, strSkinName)
{
	// prepare content for print preview
	objPreviewContent = createPreviewContentInstaSure(strContentName);
	
	// check if there is content for display
	if(objPreviewContent.hasChildNodes())
	{
		// open preint preview window
		openPrintPreviewInstasure(strContentName, objPreviewContent, strSkinName, 1); // normal
	}
}

function createPreviewContentInstaSure(strContentName)
{
	var bodyObject = document.getElementsByTagName(strContentName);
	//alert(bodyObject);
	if (bodyObject.length <= 0)
	{
		return false;
	}
	else
	{
		//var contentObject = getFirstChild(bodyObject[0]);
		var contentObject = bodyObject[0];
		newContentObject = contentObject.cloneNode(true);
		var strContentToShow = contentObject.innerHTML;
		   //alert(strContentToShow);
		var forDisplay = document.createElement('div');
		forDisplay.id = 'forDisplay';
		forDisplay.appendChild(newContentObject);
		//forDisplay = replaceElementByTagName(forDisplay,'section','div'); // Defect Fix MR1403_2047
		forDisplay = replaceElementByTagName(forDisplay,'header','div'); // Defect Fix MR1403_8467
		forDisplay = selectHTMLElements(forDisplay, 'input',contentObject);
		forDisplay = selectHTMLElements(forDisplay, 'select',contentObject);
		forDisplay = selectHTMLElements(forDisplay, 'textarea',contentObject);

		forDisplay = removeElementByTagName(forDisplay, 'script');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'action-bar-inline');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'button', 'class', 'btn btn-link dark');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'button', 'class', 'btn btn-primary go-next-btn');
		
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'class', 'action-wrapper');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'button');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'reset');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'input', 'type', 'submit');
		
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'nextSteps');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'marketing_banner');

		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'portfolio-allocation-section');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'a', 'id', 'portfolio-allocation-section-link');
		forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'promo');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'href');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'onclick');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'onblur');
		forDisplay = removeAttributeByElementTagName(forDisplay, 'a', 'title');
		forDisplay = replaceElementByTagName(forDisplay,'a','span');
		
		//fix for pagination print button start
	    if(isPaginationTable(forDisplay)){
	    	forDisplay = removeAttributeByElementTagName(forDisplay, 'TR', 'style');
			forDisplay = removeElementByTagNameAndAttribute(forDisplay, 'div', 'id', 'pageNavPosition');
	    }
	    //fix for pagination print button end
		tableTags = forDisplay.getElementsByTagName('table');		
		for (i=0; i<tableTags.length; i++)
		{
			if (parseInt(tableTags[i].getAttribute('width')) > parseInt('600') )
			{
				tableTags[i].setAttribute('width', '100%');
			}
		}	
		var previewContent = document.createElement('div');
		previewContent.id = 'previewContentID';
	
		// add document heading
		var previewHeader = document.createElement('h3');
		var previewHeader_text = document.createTextNode('This is a print preview page');
		previewHeader.appendChild(previewHeader_text);
		previewHeader.style.textAlign = "center";

		var preview_para = document.createElement('p');
		var cancelLink = document.createElement('a');
		cancelLink.setAttribute("href", "javascript:window.close()");	
		var cancelLink_text = document.createTextNode('Close this window.');
		preview_para.style.textAlign = "center";
		cancelLink.appendChild(cancelLink_text);

		preview_para.appendChild(cancelLink);

		// Put it all toegether
		previewContent.appendChild(previewHeader); 
		previewContent.appendChild(preview_para);
		
		var printContent = document.createElement('div');
		
		printContent.innerHTML=forDisplay.innerHTML;
		
		previewContent.appendChild(printContent);

		return previewContent;
	}
}

function openPrintPreviewInstasure(strContentName, objPreviewContent, strSkinName, pageType)
{
    //alert('opening print page');
	var WindowWidth = parseInt(document.getElementsByTagName(strContentName)[0].offsetWidth) + 50;
	var WindowHeight = parseInt(document.getElementsByTagName(strContentName)[0].offsetHeight) + 130;

	var WindowTop = 0;
	var WindowLeft = 0;
	var IsTallerThanScreen = true;
	var IsWiderThanScreen = true;
	var printLayoutWidth = 630;

	// checks if the table is taller than the screen
	if((screen.availHeight - WindowHeight) > 0)
	{
		WindowTop = ((screen.availHeight - WindowHeight) / 2);
		IsTallerThanScreen = false;
	}
	else
	{
		WindowHeight = screen.availHeight - 30;
		IsTallerThanScreen = true;
	}

	var sFeatures = "";
	if(IsWiderThanScreen || IsTallerThanScreen)
		sFeatures = "location=no,menubar=no,scrollbars=yes,resizable=no,status=no,toolbar=no,width=" + WindowWidth + ",height=" + WindowHeight + ",top=" + WindowTop + ",left=" + WindowLeft;
	else
		sFeatures = "location=no,menubar=no,scrollbars=no,resizable=no,status=no,toolbar=no,width=" + WindowWidth + ",height=" + WindowHeight + ",top=" + WindowTop + ",left=" + WindowLeft;

	var printPreviewWin = window.open("", "_blank", sFeatures);
	printPreviewWin.document.open(); 
	
	var htmlToBeRendered='<html><head>';
	htmlToBeRendered+='<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">';
	htmlToBeRendered+='<META HTTP-EQUIV="Content-Type" content="text/html; charset=utf-8" />';
	htmlToBeRendered+=' <meta name="viewport" content="width=1020, user-scalable=0;">';
	htmlToBeRendered+='<meta name="format-detection" content="telephone=no">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/vendor/styles/bootstrap-custom.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/theme.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/icons.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/layouts.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/form-page.css" type="text/css">';
	htmlToBeRendered+='<link rel="stylesheet" href="style/vendor/bootstrap.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="style/language.css">';
	htmlToBeRendered+='<link rel="stylesheet" href="style/instasure.css">';
	if("posb" == strSkinName){
		htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/remit-themes.css" type="text/css">';
	}
	
	if (pageType == 1)
		htmlToBeRendered+='<link rel="stylesheet" href="'+ strSkinName+'/stylesheets/css/print.css" type="text/css">';
	htmlToBeRendered+='</head><body onLoad="self.print()">';
	htmlToBeRendered+=objPreviewContent.innerHTML;
	htmlToBeRendered+='</body></html>';

	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE");
		//CE_IE_PRINT_FIX
		if(msie>0)
		  { 
		 // 	setTimeout(function(){dummyPrint()}, 2000); 
           }  
	printPreviewWin.document.write(	htmlToBeRendered);
	printPreviewWin.document.close(); 

	printPreviewWin.focus();	
}

function confirmDisableEnable(event){
 
 
		// this condition for Disable Enable Confirm Button
			if((document.getElementById("mpin1").value != '') &&
            (document.getElementById("mpin2").value != '') &&
            (document.getElementById("mpin3").value != '') &&
            (document.getElementById("mpin4").value != '') &&
            (document.getElementById("mpin5").value != '') &&
            (document.getElementById("mpin6").value != ''))
            {
           		 $("#confirmButton").removeClass("disabled");
            } 
            else
       	     {
                $("#confirmButton").addClass("disabled");

        	 }
        //this condition for checking blank input and focus on that	
      	 if(document.getElementById("mpin1").value == '')
			{	
				$('#'+event.currentTarget.id).val('');
				document.getElementById("mpin1").focus();
			}
			else if(document.getElementById("mpin2").value == '')
			{	
				if((event.currentTarget.id).substr(4)>2)
				  {
				  $('#'+event.currentTarget.id).val('');
				  }
				  document.getElementById("mpin2").focus();
			}
			else if(document.getElementById("mpin3").value == '')
			{
				if((event.currentTarget.id).substr(4)>3)
				  {
				  $('#'+event.currentTarget.id).val('');
				  }
				 document.getElementById("mpin3").focus();

			}
			else if(document.getElementById("mpin4").value == '')
			{
				if((event.currentTarget.id).substr(4)>4)
				  {
				   $('#'+event.currentTarget.id).val('');
				  }
				  document.getElementById("mpin4").focus();
							
			}
			else if(document.getElementById("mpin5").value == '')
			{
				if((event.currentTarget.id).substr(4)>5)
				   {
					$('#'+event.currentTarget.id).val('');
					}
					document.getElementById("mpin5").focus();
								
			}
			else
			 document.getElementById("mpin6").focus();
        
}

 
				
			
 function onlyNumericsAndFocus(event, tabId){
   	 if(event.keyCode > 47 && event.keyCode < 59) 
      { 
       	document.getElementById(tabId).focus();
      } else if(event.keyCode > 95 && event.keyCode < 106) 
      		{ 
    		    document.getElementById(tabId).focus();
          		}
   				
          						
         }	
     
function onlyNumerics(event) 
  { 
    if(event.keyCode == 16) 
      { 
        shiftPress = 1; 
      } 
    if(shiftPress == 1 && event.keyCode == 9) 
      { 
       shiftPress = 0;   
       return true; 
      } 
    if(shiftPress == 1 ) 
       return false; 
    if(event.keyCode > 47 && event.keyCode < 59) 
      { 
       return true; 
      } 
    else if(event.keyCode > 95 && event.keyCode < 106) 
     { 
      return true; 
     } 
    else if(event.keyCode > 34 && event.keyCode < 40) 
     { 
      return true; 
     } 
    else if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode ==46) 
     { 
      return true; 
     } 
    else if(event.keyCode == 16) 
     { 
      return false; 
     } 
     else 
      return false; 
   }
