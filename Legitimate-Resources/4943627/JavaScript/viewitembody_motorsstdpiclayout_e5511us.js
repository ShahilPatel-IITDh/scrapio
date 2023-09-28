//<!--
//1@@m23

function EbayHTMLFrame(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLFrame";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.eFrameElem=null;this.getElem=ebHTMLFrameGetElem;this.bindHTML=ebHTMLFrameBindHTML;this.bindEvents=this.enable=function(){};this.setSource=ebHTMLFrameSetSource;this.cleanupMemoryBase=this.cleanupMemory;this.cleanupMemory=ebHTMLFrameCleanupMemory;this.resize=ebHTMLFrameResize;this.onBeforeResize=this.onAfterResize=null;}
function ebHTMLFrameGetElem(pName)
{with(this)
{var f=null,oD=oDocument;var d=oD.doc,w=oD.win;if(w.frames)
f=eFrameElem=w.frames[pName];if(d.getElementById)
f=d.getElementById(pName);return f;}}
function ebHTMLFrameBindHTML()
{with(this)
{eElem=getElem(sElemName);if(eElem)
assignJSObject(eElem);}}
function ebHTMLFrameCleanupMemory()
{this.cleanupMemoryBase();this.eFrameElem=null;}
function ebHTMLFrameSetSource(pURL)
{if(pURL==null||pURL.trim()==''){return;}
with(this)
{oDocument.setGlobalParent(this);if(pURL.has("ej2child=true"))
pURL+="&ej2parent="+name;if(eFrameElem)
eFrameElem.location.replace(pURL);else if(eElem)
eElem.src=pURL;}}
function ebHTMLFrameResize(pMaxWidth)
{with(this)
{if(onBeforeResize)
onBeforeResize();var f=eFrameElem;if(!f||!(f.document||f.contentDocument))
f=getElem(sElemName);if(f&&typeof(f.document)!="unknown")
{var oDoc=f.document?f.document:f.contentDocument,db=oDoc.body,es=eElem.style,c=this.parent.oGlobals.oClient,w="100%",h=db.offsetHeight,oh;if(c.bSafari)
{oh=db.offsetHeight;w=oDoc.width;h=ebay.oDocument.doc.doctype!=null?oDoc.height+15:oDoc.height+1;}
else if(c.bFirefox)
{w=oDoc.width;h=oDoc.height}
else if(c.bWin||c.bOpera)
{w=db.scrollWidth;h=c.bNav&&ebay.oDocument.doc.doctype!=null?db.scrollHeight+30:db.scrollHeight;}
if(pMaxWidth&&c.bFirefox)
w="100%";if(this.oConfig)
{w=this.oConfig.iWidth||w;h=this.oConfig.iHeight||h;}
es.width=(w=="100%")?w:w+"px";es.height=h+"px";if(onAfterResize)
onAfterResize();}}}

//2@@m14

function EbayHTMLFrameAutoSize(pParent,pName,pCfg,pUrl)
{if(!this.objType)
this.objType="EbayHTMLFrameAutoSize";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.oFrame=this.sWidth=this.sHeight="";this.onAfterResize=null;this.ORIENTATION_HORIZONTAL="0";this.DEFAULT_FRAMEID="myAutoResizeFrame";this.sDefFrameWidth=(pCfg&&pCfg.sWidth)?pCfg.sWidth:"";this.sDefaultUrl=pUrl||"";this.sFrameName=pCfg&&pCfg.sFrameName&&pCfg.sFrameName.length>0?pCfg.sFrameName:this.DEFAULT_FRAMEID;this.bLoaded=false;this.bAutoResize=pCfg.bAutoResize?pCfg.bAutoResize:false;this.getHTML=function()
{with(this)
{var s,c=oConfig,w=c.sDefWidth,sSep=':',src=(sDefaultUrl)?' src="'+sDefaultUrl+'"':'';if(!w){w='100%'}
w=(w.has('%')||w.has('px'))?w+';':w+"px;";s='<iframe name="'+sFrameName+'" id="'+sFrameName+'" '+src+' marginwidth="0" marginheight='+((c.sOrientation==ORIENTATION_HORIZONTAL)?'"1"':'"0"')+' scrolling="no" frameborder="0" '+'style="width'+sSep+w+'height'+sSep+'1px;">'+'&nbsp;</iframe>';return s;}}
this.loadContent=function()
{if(this.oConfig.sContentUrl.has('downgradeDomain')&&!this.oConfig.bPageDowngraded)
this.parent.oDocument.downgradeDomain();this.oFrame.setSource(this.oConfig.sContentUrl);}
this.resize=function()
{with(this)
{if(oFrame)
{oFrame.resize();var st=oFrame.eElem.style;if(sDefFrameWidth)
st.width=(sDefFrameWidth.has('%')||sDefFrameWidth.has('px'))?sDefFrameWidth:sDefFrameWidth+"px";sWidth=st.width;sHeight=st.height;if(onAfterResize)
onAfterResize();if(!bLoaded)
{_registerListener(this.oDocument._getEvent("resize"),EVENT_AFTER,"resize");bLoaded=true;}}}}
this.writeContainer=function(pConfig)
{with(this)
{var b=pConfig.bShowContentAfterPageLoad,oP=parent,oD=oP.oDocument;oConfig=pConfig;sFrameName=pConfig&&pConfig.sFrameName&&pConfig.sFrameName.length>0?pConfig.sFrameName:DEFAULT_FRAMEID;if(sFrameName==DEFAULT_FRAMEID||bAutoResize)
oD.write(getHTML());oFrame=new EbayHTMLFrame(this,sFrameName,oConfig);oFrame.bind();b=(typeof(b)!='undefined')?b:true;if(b)
_registerListener(oD._getEvent("load"),EVENT_AFTER,"loadContent");else
loadContent();return oFrame;}}}

//3@@m5

function EbayIFrameAutoResize(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayIFrameAutoResize";this.base=EbayHTMLFrameAutoSize;this.base(pParent,pName,pName,false,pCfg);this.iFrames=[];this.getElement=function(pUrl)
{for(var i=0;i<this.iFrames.length;i++)
{if(pUrl.toLowerCase()==this.iFrames[i].sContentUrl.toLowerCase())
{return this.iFrames[i];}}}
this.writeContainerBase=this.writeContainer;this.writeContainer=function(pCfg)
{pCfg.sDefWidth=pCfg.iWidth?pCfg.iWidth+"":"";pCfg.sDefWidth=pCfg.iwidth?pCfg.iwidth+"":pCfg.sDefWidth;var s=pCfg.sContentUrl;if(s&&!s.has('downgradeDomain=true'))
{if(!s.has('?'))
s+='?downgradeDomain=true';else
s+='&downgradeDomain=true';pCfg.sContentUrl=s;}
pCfg.bShowContentAfterPageLoad=false;this.iFrames.push(pCfg);pCfg.oFrame=this.writeContainerBase(pCfg);}
this.resizeWithSize=function(pCfg,pWidth,pHeight)
{if(pCfg)
{var f=pCfg.oFrame.getElem(pCfg.oFrame.sElemName);var es=f.style;if(!pCfg.sDefWidth){pCfg.sDefWidth='100%';}
if(pCfg.sDefWidth&&(pCfg.sDefWidth.length>0)){es.width=(pCfg.sDefWidth.has('%')||pCfg.sDefWidth.has('px'))?pCfg.sDefWidth:pCfg.sDefWidth+"px";}
else{es.width=pWidth+"px";}
es.height=pHeight+"px";}}}
new EbayIFrameAutoResize(ebay.oDocument.oPage,"IFrame_AutoResize");

//4@@m22
<!--
function adjustIFrameSize(iframeWindow)
{var iframeElement=iframeWindow.name?this.document.getElementById(iframeWindow.name):null;if(!iframeElement||typeof(iframeElement)=='undefined')
return false;var aDimensions=getFrameDim(iframeWindow.document);iframeElement.style.height=aDimensions[1]+'px';iframeElement.style.width=aDimensions[0]+'px';}
function changeFrame()
{if(parent.adjustIFrameSize)parent.adjustIFrameSize(window);}
function adjustIFrameHeight(iframeWindow)
{var iframeElement=iframeWindow.name?this.document.getElementById(iframeWindow.name):null;if(!iframeElement||typeof(iframeElement)=='undefined')
return false;if(iframeWindow.document.height)
iframeElement.style.height=iframeWindow.document.height+'px';else if(document.all)
{if(iframeWindow.document.compatMode&&iframeWindow.document.compatMode!='BackCompat')
iframeElement.style.height=iframeWindow.document.documentElement.scrollHeight+5+'px';else
iframeElement.style.height=iframeWindow.document.body.scrollHeight+5+'px';}
else
{var oF=new EbayHTMLFrame(ebay.oDocument.oPage,iframeElement.name);oF.bind();oF.resize();oF=null;}
iframeElement.style.width="100%";}
function changeFrameHeight()
{if(parent.adjustIFrameHeight)parent.adjustIFrameHeight(window);}
function getIframeHeight(iframeWindow){if(is.mac)
{return 0;}
if(iframeWindow.document.height){var iframeElement=this.document.getElementById(iframeWindow.name);return iframeWindow.document.height;}
else if(document.all){var iframeElement=this.document.all[iframeWindow.name];if(iframeWindow.document.compatMode&&iframeWindow.document.compatMode!='BackCompat')
{return iframeWindow.document.documentElement.scrollHeight;}
else{return iframeWindow.document.body.scrollHeight;}}}
function ssTrackIframeRequest()
{}
function getFrameDim(frameDoc)
{var frame_size=[];frame_size=["100%",frameDoc.body.offsetHeight];if(frameDoc.height||is.safari)
{frame_size=[frameDoc.width,frameDoc.height+1];}
else if(document.all)
{if(is.win)
frame_size=[frameDoc.body.scrollWidth,frameDoc.body.scrollHeight];}
return frame_size;}
function submitWithParams(form_id,fields)
{var form=document.forms[form_id];if(typeof(form)=="undefined")
{form=parent.document.forms[form_id];}
if(typeof(form)!="undefined"&&typeof(fields)!="undefined")
{for(var i=0;i<fields.length;i++)
{var field=form[fields[i][0]];var value=fields[i][1];if(typeof(field)!="undefined")
{field.value=value;}}
form.submit();return true;}
return false;}
function changeFrameLocation(sName,sLocation)
{var iDelay=1000;if(typeof(parent.frames[sName])!="undefined")
{if(is.mac&&is.ie)
setTimeout('parent.frames["'+sName+'"].location = "'+sLocation+'"',iDelay);else
setTimeout('parent.frames["'+sName+'"].location.replace("'+sLocation+'")',iDelay);}}

//5@@m6

function EbayHTMLForm(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLForm";this.base=EbayHTML;this.base(pParent,pName,pName,false,pCfg);this.getElem=function(){return this.getDocElem(arguments[0],'forms');};this.enable=function(){};this.getElementValue=ebHTMLFormGetElementValue;this.setElementValue=ebHTMLFormSetElementValue;this.getElements=ebHTMLFormGetElements;this.getElement=ebHTMLFormGetElement;this.setAction=ebHTMLFormSetAction;this.getAction=ebHTMLFormGetAction;this.setTarget=ebHTMLFormSetTarget;this.getTarget=ebHTMLFormGetTarget;this.submit=ebHTMLFormSubmit;this.clear=ebHTMLFormClear;this.subscribeEvents("onsubmit");this.onBeforeSubmit=null;this.onAfterSubmit=null;}
function ebHTMLFormGetElements()
{var e=this.eElem;return e?e.elements:new Array;}
function ebHTMLFormGetElement(pName)
{var elems=this.getElements();return elems[pName]?elems[pName]:null;}
function ebHTMLFormGetElementValue(pName)
{var elems=this.getElements();if(elems[pName]&&elems[pName].value)
return elems[pName].value;return"";}
function ebHTMLFormSetElementValue(pName,pValue)
{var elems=this.getElements(),elem=elems[pName];if(elem)
{if(elem.length)
{for(var i=0,len=elem.length;i<len;i++)
elem[i].value=pValue;}
else
elem.value=pValue;}}
function ebHTMLFormSetAction(pAction)
{var e=this.eElem;if(e)
e.action=pAction;}
function ebHTMLFormGetAction()
{var e=this.eElem;if(e)
return e.action;}
function ebHTMLFormSetTarget(pTarget)
{var e=this.eElem;if(e)
e.target=pTarget;}
function ebHTMLFormGetTarget()
{var e=this.eElem;if(e)
return e.target;}
function ebHTMLFormSubmit()
{if(this.onBeforeSubmit)
this.onBeforeSubmit();var e=this.eElem;if(e)
{e.submit();if(this.onAfterSubmit)
this.onAfterSubmit();}
else
this.throwError("Element '"+this.sElemName+"' does not exist on the page","submit");}
function ebHTMLFormClear()
{var elems=this.getElements();for(i=0;i<elems.length;i++)
{var elem=elems[i];var type=elem.type;switch(type)
{case"text":case"textarea":elem.value="";break;case"checkbox":elem.checked=false;break;case"select-one":elem.selectedIndex=0;}}}

//6@@m18

function EbayToolbar(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayToolbar";this.baseObject=EbayBaseControl;this.baseObject(pParent,pName);this.TBDaemonID="eBayToolbarCommLib.IWebEvent.1";this.sTBHelper="eBayToolbar.Helper";var g=this.oGlobals;var env=this.oEnv=g.oEnvironment;this.isInstalled=false;this.client=g.oClient;this.config=pCfg||(new EBayConfig(pName));new EbayHTMLForm(this,this.config.signinFormID);this.qualifyPageType=function(){with(this)
{var t=true;for(var i=0;i<aPageTypes.length;i++)
{if(nPageType==aPageTypes[i])
{t=false;}}}
return t;}
this.onSignIn=function()
{var oF,PageType,sAction,u,sID,oSF,oCfg=this.config,oNI;oF=this.controls[oCfg.signinFormID];PageType=0;this.nPageType=oF.getElementValue("pageType");this.aPageTypes=oCfg.pageTypes.split(",");oSF=document.forms[oCfg.signinFormID];if(this.nPageType!=""&&this.qualifyPageType())
{if(this.activeXSupported(this.TBDaemonID))
{if(oSF!=null)
{sAction=new String(oSF.action);if(this.oDocument.doc.location.protocol.has("https"))
sAction=sAction.replace("http:","https:");oSF.action=sAction;}
u=oF.getElementValue("userid");TBDaemon=new ActiveXObject(this.TBDaemonID);sID=TBDaemon.GetSIDForUser(u);if(sID!="")
{this.createElement(oSF,'runame',env.sCountry.hasAny("cn")?'Soda1-EBAYTOOLBAK7I2R-mwwbb':'EBAYTOOLBAR');if(typeof(oSF.sid)=="undefined")
{this.createElement(oSF,'SID',sID);}}}}}
this.createElement=function(oF,n,v)
{var o=document.createElement("input");o.type='hidden';o.name=n;o.value=v;oF.appendChild(o);}
this.activeXSupported=function(n)
{var oC=this.client;return(!(oC.bMac||oC.bMacppc)&&oC.bIE)&&this.client.activeXLibLoaded(n);}
this.refresh=function()
{with(this)
{var oTBH,oTB,done,oCfg=config;if(activeXSupported(sTBHelper))
{oTBH=new ActiveXObject(sTBHelper);done=oTBH.doSomething(oCfg.toolbarCommand+"?00="+oCfg.eBayUserId+"&05="+oCfg.eBayItemId);}
if(activeXSupported(TBDaemonID))
{oTB=new ActiveXObject(TBDaemonID);oTB.WatchListChanged();}}}
this.refreshListItem=function()
{with(this)
{var oTB;if(activeXSupported(TBDaemonID))
{oTB=new ActiveXObject(TBDaemonID);if(typeof(oTB.OnItemListed)=="undefined"||typeof(oTB.OnItemListed)==false||typeof(oTB.OnItemListed)=="unknown")return;oTB.OnItemListed();}}}}
function EBayToolbarConfig(name)
{if(!this.objType)
this.objType="EBayToolbarConfig";this.base=EbayConfig;this.base(name);}

//7@@m6

function EbayHTMLLayer(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLLayer";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.aBindEvents=new Array;this.getElem=ebHTMLLayerGetElem;this.getValue=ebHTMLLayerGetValue;this.setValue=ebHTMLLayerSetValue;}
function ebHTMLLayerGetElem(pName)
{var s=pName,d=this.oDocument.doc;if(d.getElementById)
return d.getElementById(s);else if(d.all)
return d.all(s);this.throwWarning("Not supported","getElem");}
function ebHTMLLayerGetValue(pIsText)
{if(this.eElem)
{if(pIsText)
{if(this.oDocument.oGlobals.oClient.bFirefox)
return this.eElem.textContent;else
return this.eElem.innerText;}
else
return this.eElem.innerHTML;}
else
return"";}
function ebHTMLLayerSetValue(pVal,pIsText)
{if(this.eElem)
{if(pIsText)
{if(this.oDocument.oGlobals.oClient.bFirefox)
this.eElem.textContent=pVal;else
this.eElem.innerText=pVal;}
else
this.eElem.innerHTML=pVal;}}

//8@@m7

function EbayHTMLImage(pParent,pName,pDisabled,pSource,pDisabledSource,pCfg)
{if(!this.objType)
this.objType="EbayHTMLImage";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.sEnabledSource=this.sDisabledSource=pSource;if(pDisabledSource)
this.sDisabledSource=pDisabledSource;this.getElem=ebHTMLImageGetElem;this.source=ebHTMLImageSource;this.enableBase=this.enable;this.enable=ebHTMLImageEnable;this.subscribeEvents("onclick","onmouseover","onmouseout");}
function ebHTMLImageGetElem(pName)
{return this.getDocElem(pName,'images');}
function ebHTMLImageSource(pSrc,pText)
{var im=this.eElem;if(typeof(im)=='undefined')
return;if(typeof(pSrc)=="undefined")
return(im)?im.src:"";else
{im.src=pSrc;if(pText!=null)
im.alt=pText;}}
function ebHTMLImageEnable(pEnable)
{with(this)
{enableBase(pEnable);if(sDisabledSource&&eElem)
eElem.src=(pEnable)?sEnabledSource:sDisabledSource;}}

//9@@m6

function EbayImgSizeThresholdReport(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayImgSizeThresholdReport";this.base=EbayBaseControl;this.base(pParent,pName);var cl=this.oGlobals.oClient;if(!cl.bIE||cl.bMac||typeof(pCfg)=='undefined')
return;this.oConfig=pCfg;this.iNumUnits=1048576;this.iThreshold=1;this.iImgSize=this.iNumUnits*this.iThreshold;this.iTotMB=0;this.sLayerName='eb_img_size_thresh_report_layer';this.sImagePrefix='eb_img_size_thresh_report_image';this.oLayerOut=new EbayHTMLLayer(this,this.oConfig.sDivOutID);this.oLayerIn=new EbayHTMLLayer(this,this.oConfig.sDivInID);this.aImageObjs=[];this.createControl=ebImgSizeThresholdReportCreateControl;this.getImageTable=ebImgSizeThresholdReportGetImageTable;this.getThresholdUnits=ebImgSizeThresholdReportGetThresholdUnits;this.getCellContent=ebImgSizeThresholdReportGetCellContent;this.display=ebImgSizeThresholdReportDisplay;this.getMinutes=ebImgSizeThresholdReportGetMinutes;this.createControl();function ebImgSizeThresholdReportCreateControl()
{var cfg=this.oConfig;if(cfg)
{with(this)
{oConfig=cfg;var d=oDocument;iThreshold=cfg.iThreshold;iImgSize=iNumUnits*iThreshold;var s='<div id="'+sLayerName+'" style="display:none; position:absolute;left:0px; top:0px;">';new EbayHTMLLayer(this,sLayerName);var l=cfg.aWebURLs.length,imName;if(l>1)
{oLayerOut.bind();oLayerOut.setValue(oConfig.sEvalMsg);}
for(var i=0;i<l;i++)
{imName=sImagePrefix+i;s+='<img name="'+imName+'" src="';s+=cfg.aWebURLs[i]+'">';aImageObjs[aImageObjs.length]=new EbayHTMLImage(this,imName);}
d.write(s+'</div>');var e=oDocument._getEvent("load");_registerListener(e,EVENT_AFTER,"display");}}}
function ebImgSizeThresholdReportDisplay()
{var numOver=0,numMinutes=0,numMB=0;var c=this.oConfig;var aWI=this.aImageObjs;var oD=this.oLayerOut;var aDI=this.oLayerIn.eElem.getElementsByTagName("img");var ln=aWI.length;var ln2=aDI.length;if(ln2>0)
oD.setValue(this.oConfig.sEvalMsg);if((ln+ln2)==0)
{oD.setValue("");return;}
var aWebImages=new Array();for(var i=0;i<ln;i++)
{var im=aWI[i];if(im.eElem.fileSize>this.iImgSize)
aWebImages.push(im);}
var aDescImagesOvr=new Array();for(var i=0;i<ln2;i++)
{if(aDI[i].fileSize>this.iImgSize)
aDescImagesOvr.push(aDI[i]);}
numOver=aDescImagesOvr.length+aWebImages.length;if(numOver==0)
{oD.setValue(c.sUndrThreshMsg.replaceTokensEx("##n##",this.iThreshold));}
else
{var strHTMLPart1=c.sTemplate;var strTable=this.getImageTable(aDescImagesOvr,aWebImages);numMinutes=this.getMinutes();var iT=this.iThreshold,sS=c.sMsgseg4ahref,sE=c.sMsgseg4ahrefend,sT="##n##";var sMSS1=c.sMsgSeg1Single,sMSS2=c.sMsgSeg2Single,sMSS4=c.sMsgSeg4Single;if(numOver==1)
{sMSS1=sMSS1.replaceTokensEx(sT,numOver,iT,sS,sE);sMSS2=sMSS2.replaceTokensEx(sT,numOver,iT,sS,sE);sMSS4=sMSS4.replaceTokensEx(sT,numOver,iT,sS,sE);strHTMLPart1=strHTMLPart1.replaceTokensEx(sT,sMSS1,sMSS2,numMinutes,sMSS4);}
else
{c.sMsgSeg1=c.sMsgSeg1.replaceTokensEx(sT,numOver,iT,sS,sE);c.sMsgSeg2=c.sMsgSeg2.replaceTokensEx(sT,numOver,iT,sS,sE);c.sMsgSeg4=c.sMsgSeg4.replaceTokensEx(sT,numOver,iT,sS,sE);strHTMLPart1=strHTMLPart1.replaceTokensEx(sT,c.sMsgSeg1,c.sMsgSeg2,numMinutes,c.sMsgSeg4);}
strHTMLPart1=strHTMLPart1.replaceTokensEx(sT,numOver,iT,sS,sE);strHTMLPart1+=strTable;oD.setValue(strHTMLPart1);}}
function ebImgSizeThresholdReportGetImageTable(apDescImagesOvr,apWebImages)
{with(this)
{var Dl=apDescImagesOvr.length;var Wl=apWebImages.length;var tot=Dl+Wl;var numMB=0;var sT='';var arrIndex=0;var sE='<table><tr><td>';if((tot>1)&&(Dl>0&&Wl>0))
sE+=oConfig.sMsgseg5psls;else
if((tot==1)&&(Dl>0&&Wl>0))
sE+=oConfig.sMsgseg5pls;else
if((tot>1)&&(Dl==0||Wl==0))
sE+=oConfig.sMsgseg5ps;else
if((tot==1)&&(Dl==0||Wl==0))
sE+=oConfig.sMsgseg5pl;sE+='</td></tr><tr><td> </td></tr><tr><td align="left"><b>';if((Dl>3)||(Wl>3))
{for(var i=0;i<apDescImagesOvr.length;i++)
{numMB=getThresholdUnits(apDescImagesOvr[i].fileSize,iNumUnits);iTotMB+=numMB;}
for(var i=0;i<apWebImages.length;i++)
{numMB=getThresholdUnits(apWebImages[i].eElem.fileSize,iNumUnits);iTotMB+=numMB;}
return sT;}
else if((Dl>0)&&(Wl>0))
{arrIndex=Math.max(apDescImagesOvr.length,apWebImages.length);sT+=sE;sT+=oConfig.sDescHdr;sT+='</b></td><td width="100"/><td align="left"><b>';sT+=oConfig.sPDHdr;sT+='</b></td></tr>';for(var i=0;i<=arrIndex;i++)
{sT+='<tr><td valign="top">';if(typeof apDescImagesOvr[i]!='undefined')
{numMB=getThresholdUnits(apDescImagesOvr[i].fileSize,iNumUnits);iTotMB+=numMB;sT+=getCellContent(apDescImagesOvr[i].src,numMB);}
else
{sT+=" ";}
sT+='</td><td width="100"></td><td valign="top">';if(typeof apWebImages[i]!='undefined')
{numMB=getThresholdUnits(apWebImages[i].eElem.fileSize,iNumUnits);iTotMB+=numMB;sT+=getCellContent(apWebImages[i].eElem.src,numMB);}
else
{sT+=" ";}
sT+='</td></tr>';}
sT+='</table>';}
else if((Dl<=3)&&(Wl==0))
{sT+=sE;sT+=oConfig.sDescHdr;sT+='</b></td></tr>';for(var i=0;i<=Dl;i++)
{sT+='<tr><td valign="top">';if(typeof apDescImagesOvr[i]!='undefined')
{numMB=getThresholdUnits(apDescImagesOvr[i].fileSize,iNumUnits);iTotMB+=numMB
sT+=getCellContent(apDescImagesOvr[i].src,numMB);}
sT+='</td></tr>';}
sT+='</table>';}
else if((Dl==0)&&(Wl<=3))
{sT+=sE;sT+=oConfig.sPDHdr;sT+='</b></td></tr>';for(var i=0;i<=Wl;i++)
{sT+='<tr><td valign="top">';if(typeof apWebImages[i]!='undefined')
{numMB=getThresholdUnits(apWebImages[i].eElem.fileSize,iNumUnits);iTotMB+=numMB
sT+=getCellContent(apWebImages[i].eElem.src,numMB);}
sT+='</td></tr>';}
sT+='</table>';}
return sT;}}
function ebImgSizeThresholdReportGetThresholdUnits(piBytes,piThreshold)
{return Math.round(10*(piBytes/piThreshold))/10;}
function ebImgSizeThresholdReportGetCellContent(psSrc,pfMB)
{var sN=psSrc.substring(psSrc.lastIndexOf('/')+1);return sN+" ("+pfMB+"MB)";}
function ebImgSizeThresholdReportGetMinutes()
{with(this)
{var minsec=((Math.round(iTotMB))*oConfig.fLoadTime);var min=Math.floor(minsec);var sec=((minsec-min)*60);if(sec==0)
return oConfig.sMsgseg3m.replaceTokensEx("##n##",min);else
return oConfig.sMsgseg3ms.replaceTokensEx("##n##",min,sec);}}}
new EbayImgSizeThresholdReport(ebay.oDocument.oPage,"ia",ebay.oDocument.getConfig("imageThresholdConfig"));

//10@@m10

ebay.oUtils.sGLBL_CFG="globalVarsConfigObj";ebay.oUtils.mkVarsGlbl=function(){var gt,oD,oBc,oVC,sGlblCfg;oD=ebay.oDocument;oBc=oD.getConfig("config");var sGlblCfg=ebay.oUtils.sGLBL_CFG;function globalIt(pPropName,pVal){eval(pPropName+" = pVal;");}
gt=globalIt;oVC=oD.getConfig(sGlblCfg);for(var i in oVC.glbls){gt(i,oVC.glbls[i]);}}
ebay.oDocument.oPage.openPicShowPopup=function()
{var cfg=ssPopupData;var oPop=new EbayHTMLPopup(ebay.oDocument.oPage,"itemPopup"+cfg.itemId);oPop.iWidth=screen.width/2+25;oPop.iHeight=screen.height/2+5;oPop.iLeft=(screen.width-oPop.iWidth);oPop.iTop=(screen.availHeight-oPop.iHeight);oPop.bMenubar=false;oPop.bToolbar=false;oPop.bLocation=false;oPop.bStatus=false;oPop.bResizable=true;oPop.sUrl=CoreHtmlHost+'viewitem/viewitem_popup.html?domain='+encodeURIComponent(document.domain);oPop.show();}

//11@@m2

function EbayHTMLMinMax(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLMinMax";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.oMin=this.oMax=null;this.min=ebHTMLMinMaxMin;this.max=ebHTMLMinMaxMax;this.minimize=ebHTMLMinMaxMinimize;this.maximize=ebHTMLMinMaxMaximize;this.init=ebHTMLMinMaxInit;this.init(pParent,pName,pDisabled,pCfg);}
function ebHTMLMinMaxInit(pParent,pName,pDisabled,pCfg)
{with(this)
{var t,e="onclick";_registerEvent('onafterminimize');_registerEvent('onaftermaximize');t=new EbayHTML(this,pCfg.sMinCntrlName,pCfg.sMinCntrlName);t._registerEvent(e,"parent.min");t.subscribeEvents(e);oMin=t;t=new EbayHTML(this,pCfg.sMaxCntrlName,pCfg.sMaxCntrlName);t._registerEvent(e,"parent.max");t.subscribeEvents(e);oMax=t;}}
function ebHTMLMinMaxMinimize()
{this.oMin.onclick();}
function ebHTMLMinMaxMaximize()
{this.oMax.onclick();}
function ebHTMLMinMaxMin()
{with(this.parent)
{show();oMin.show();oMax.show(true);onafterminimize();return false;}}
function ebHTMLMinMaxMax()
{with(this.parent)
{show(true);oMax.show();oMin.show(true);onaftermaximize();return false;}}

//12@@m4

ebay.oDocument.oPage.createLinks=function()
{var oD=this.parent,oMM,oCfg=oD.getConfig("ViewItem.More.Info");if(oCfg)
{oMM=new EbayHTMLMinMax(this,oCfg.name,false,oCfg);oMM._registerListener(oMM._getEvent('onaftermaximize'),this.EVENT_AFTER,'onAfterMaximize');oMM._registerListener(oMM._getEvent('onafterminimize'),this.EVENT_AFTER,'onAfterMinimize');oMM.onAfterMaximize=function()
{if(oCfg.bOverrideCookie){this.parent.getCookieVal(false,true);}else{this.parent.getCookieVal(true,true);}}
oMM.onAfterMinimize=function()
{if(oCfg.bOverrideCookie){this.parent.getCookieVal(false,false);}else{this.parent.getCookieVal(true,false);}}
oMM.bind();oMM.oMin.bind();oMM.oMin.show(false);oMM.oMax.bind();oMM.oMax.show(false);this.oMM=oMM;}}
ebay.oDocument.oPage.createMoreInfoLayer=function()
{var oP=this,oD=oP.parent,t,oCfg=oD.getConfig("ViewItem.More.Info");if(oCfg)
{oP.oMMLayer=new EbayHTMLLayer(this,oCfg.sMoreInfoLayerName,false,oCfg);oP.oMMLayer.bind();oP.setMoreInfoState();}}
ebay.oDocument.oPage.setMoreInfoState=function()
{var oP=this,oD=oP.parent,t,oCfg=oD.getConfig("ViewItem.More.Info");if(this.oMM)
{var oMM=this.oMM;if(oCfg.bOverrideCookie){this.getCookieVal(false,true);oMM.maximize();}else{this.getCookieVal(false,false)?oMM.maximize():oMM.minimize();}}}
ebay.oDocument.oPage.getCookieVal=function(pWrite,pShow)
{var oP=this,oCJ=oP.parent.oCookieJar,pbf=oCJ.readCookielet("dp1","pbf"),cv=oCJ.getBitFlag(pbf,1);if(oP.oMMLayer)
oP.oMMLayer.show(pShow);if(pWrite)
oCJ.writeCookielet("dp1","pbf",oCJ.setBitFlag(pbf,1,pShow?'1':'0'),"","",oCJ.getDate(2));return cv;}
ebay.oDocument.oPage.writeMoreInfoLinks=function(pMinLinkId,pMaxLinkId,pMinLinkText,pMaxLinkText)
{var oP=this,oC=oP.oGlobals.oClient,oD=oP.parent,s;if(oP.bIsSupported)
{s="<a href='#' name='"+pMinLinkId+"' id='"+pMinLinkId+"'>"+pMinLinkText+"</a>";s+="<a href='#' name='"+pMaxLinkId+"' id='"+pMaxLinkId+"'>"+pMaxLinkText+"</a>";oD.doc.write(s);oP.createLinks();}}
ebay.oDocument.oPage.initMoreInfo=function()
{var oP=this,e=oP.parent._getEvent("load"),oC=this.oGlobals.oClient;oP.bIsSupported=!((oC.bNav&&(oC.iVer<7))||(oC.bWebTV))}
ebay.oDocument.oPage.initMoreInfo();

//13@@m1

ebay.oDocument.oPage.initMerchWidget=function()
{var c=this.parent.getConfig('Express.Merch.Widget');if(c)
{var og=this.oGlobals,cl=og.oClient;c.bShowContentAfterPageLoad=(cl.bOpera)?true:false;c.sContentUrl+="&random="+Math.round(Math.random()*1000);var oI=new EbayHTMLFrameAutoSize(this,"Exp_Merch_Ctrl",c,c.sContentUrl);oI.writeContainer(c);}}

//14@@m10

function EbayHTMLAnchor(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLAnchor";this.base=EbayHTML;this.base(pParent,pName,pName,pDisabled,pCfg);this.getElem=ebHTMLAnchorGetElem;this.enableBase=this.enable;this.enable=ebHTMLAnchorEnable;this.subscribeEvents("onclick");}
function ebHTMLAnchorGetElem(pName)
{var d=this.oDocument.doc,l=null;l=d.links[pName];if(l)return l;if(d.getElementById)
l=d.getElementById(pName);if(l)return l;if(d.all)
l=d.all[pName];if(l)return l;if(d.layers)
{var lyrs=d.layers;var len=lyrs.length;for(var i=0;i<len;i++)
{l=this.getElem(lyrs[i].document,pName);if(l)
return l;}}
for(var j=0;j<d.links.length;j++)
{l=d.links[j];if(typeof(l.name)=="undefined")
{if(l.onclick)
{var oc=l.onclick.toString();if(oc.indexOf("{#"+pName+"#}")!=-1)
return l;}}
else
{if(l.name==pName)
return l;}
l=null;}
return l;}
function ebHTMLAnchorEnable(pEnable)
{var cur=(pEnable)?"hand":"default";var el=this.eElem;if(el&&el.style)
{el.style.cursor=cur;el.style.color=pEnable?"":"gray";}
this.enableBase(pEnable);}
function setEbayLink(pS)
{return true;}

//15@@m1

function EbayFastRefresh(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayFastRefresh";this.base=EbayHTMLFrame;this.base(pParent,pName);this.sendRequest=ebFastRefreshSendRequest;this.processResponse=ebFastRefreshProcessResponse;this.rebind=ebFastRefreshRebind;}
function ebFastRefreshSendRequest(pUrl)
{this.setSource(pUrl);}
function ebFastRefreshProcessResponse(pDivInfos,pReBindInfos)
{var aDivs=pDivInfos,iLen=aDivs.length;for(var i=0;i<iLen;i++)
{oDiv=this.oDocument._getControl(aDivs[i][0]);if(!oDiv)
{oDiv=new EbayHTMLLayer(this.parent,aDivs[i][0]);oDiv.bind();}
oDiv.setValue(aDivs[i][1]);}
if(typeof(pReBindInfos)!="undefined"&&pReBindInfos)
this.rebind(pReBindInfos);}
function ebFastRefreshRebind(pReBindInfos)
{var aRBElems=pReBindInfos,iLen=aRBElems.length,oC=null;var oD=this.oDocument;for(var i=0;i<iLen;i++)
{oC=oD._getControl(aRBElems[i]);if(!oC)
oC=new EbayHTML(this,aRBElems[i])
oC.bind();}}

//16@@m18

function EbayHTMLOverlay(pParent,pName,pCfg,pDisabled)
{if(!this.objType)
this.objType="EbayHTMLOverlay";this.base=EbayHTMLLayer;this.base(pParent,pName,pDisabled,pCfg);this.isSupported=ebIsBrowserSupported;if(!this.isSupported())
return;this.sPosStyle=pCfg.posStyle||'absolute';this.sTop=pCfg.top;this.iTopPadding=0;this.iLeftPadding=0;this.sLeft=pCfg.left;this.sWidth=pCfg.width?parseInt(pCfg.width):0;this.sHeight=pCfg.height?parseInt(pCfg.height):0;this.sLayerHTML=pCfg.layerHTML||"";this.sContentDiv=pCfg.contentDiv||"";this.bForceReposition=pCfg.bForceReposition||false;this.bNoSetContent=pCfg.bNoSetContent;this.bClearValueOnClose=typeof(pCfg.bClearValueOnClose)!='undefined'?pCfg.bClearValueOnClose:true;this.bCustomHTML=pCfg.customHTML||false;this.bTransparent=pCfg.transparent||false;this.setPosition=ebHTMLOverlaySetPosition;this.centerTop=ebHTMLOverlayCenterTop;this.centerLeft=ebHTMLOverlayCenterLeft;this.setContent=ebHTMLOverlaySetContent;this.closeOverlay=this.close=ebHTMLOverlayCloseOverlay;this.display=ebHTMLOverlayDisplay;}
function ebHTMLOverlayDisplay(pContent)
{with(this)
{if(!eElem)
bind();if(!bNoSetContent)
setContent(pContent);setPosition();show(true);}}
function ebHTMLOverlaySetPosition()
{with(this)
{if(sPosStyle.is('absolute'))
{if(!sTop||bForceReposition)
centerTop();if(!sLeft||bForceReposition)
centerLeft();top(sTop);left(sLeft);}}}
function ebHTMLOverlayCenterTop()
{with(this)
{var oD=oDocument,winHeight=oD.doc.body.clientHeight,cL=oGlobals.oClient;if(!cL.bIE)
winHeight=oD.win.innerHeight;else if(typeof(winHeight)=='undefined'&&cL.iVer>=6)
winHeight=oD.doc.documentElement.clientHeight;var s=oD.doc.body.scrollTop+(winHeight-sHeight)/2;if(document.documentElement)
s+=document.documentElement.scrollTop;sTop=(parseInt(s)+iTopPadding)+'px';return s;}}
function ebHTMLOverlayCenterLeft()
{with(this)
{var winWidth=document.body.clientWidth,cL=oGlobals.oClient;if(!cL.bIE)
winWidth=window.innerWidth;var s=winWidth/2-sWidth/2;sLeft=(parseInt(s)+iLeftPadding)+'px';return s;}}
function ebHTMLOverlaySetContent(pContent)
{with(this)
{if(sContentDiv!='')
{var oL=new EbayHTMLLayer(this,sContentDiv);oL.bind();oL.setValue(pContent);}
else
setValue(pContent);}}
function ebHTMLOverlayCloseOverlay()
{with(this)
{if(bClearValueOnClose)
{var cts=this.controls;if(sContentDiv!=''&&cts[sContentDiv])
cts[sContentDiv].setValue('&nbsp;');else
setValue('&nbsp;');}
show();if(!this.oGlobals.oClient.bFirefox)
cleanupMemory();}}
function ebIsBrowserSupported()
{var cL=this.oGlobals.oClient,bNS4=document.layers;if(bNS4||(cL.bMac&&!cL.bMacppc&&!cL.bMactel))
return false;return true;}

//17@@m13

function EbayHTMLOverlayUrl(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHTMLOverlayUrl";this.base=EbayHTMLOverlay;this.base(pParent,pName,pCfg);if(!this.isSupported())
return null;this.sUrl=pCfg.url||null;this.sIframeName='if_'+pName;this.sLayerUI=pCfg.layerHTML;this.bAutoResize=pCfg.autoResize;this.bCloseLink=pCfg.defCloseLink;this.bDowngradeDomain=true;this.bTransparent=pCfg.bTransparent;this.displayBase=this.display;this.display=ebHTMLOverlayUrlDisplay;this.hide=this.closeOverlay;this.closeOverlayBase=this.closeOverlay;this.closeOverlay=ebHTMLOverlayUrlCloseOverlay;this.closeLayerUI=ebHTMLOverlayUrlCloseLayer;this.setCloseLayer=ebHTMLOverlayUrlSetCloseLayer;this.getIFUrl=ebHTMLOverlayUrlGetIFUrl;this.setDowngrade=ebHTMLOverlayUrlSetDowngradeDomain;this.onAfterFrameLoad=ebHTMLOverlayUrlAfterFrameLoad;}
function ebHTMLOverlayUrlDisplay()
{with(this)
{if(!sUrl)
return;var s=getIFUrl();if(oGlobals.oEnvironment.sThisPageRaw==sUrl)
return;if(bCloseLink)
s+=setCloseLayer();displayBase(s);new EbayHTMLFrame(this,sIframeName);}}
function ebHTMLOverlayUrlSetCloseLayer()
{with(this)
{sLayerHTML=closeLayerUI()+sLayerUI;var a=new EbayHTMLAnchor(this,'close');a._registerEvent("onclick","this.parent.hide();return false;");}}
function ebHTMLOverlayUrlCloseLayer()
{var s='';var stl='border-collapse:collapse; border-width:2px 2px 0px 2px; background-color:#EEEEEE;border-style:outset;';with(this)
{var pd=oGlobals.oEnvironment.sPicsDir,img=pd+'icon/iconClose_20x20.gif',w=parseInt(sWidth)+4;s+='<table id="tblClose" width="'+w+'" cellspacing="0" cellpadding="4"';s+='style="'+stl+'">';s+='<tr><td align="right"><a href="#" name="close"><img src="'+img+'" border="0"></a>';s+='</td></tr></table>';}
return s;}
function ebHTMLOverlayUrlGetIFUrl()
{var s='';with(this)
{sUrl=setDowngrade(sUrl);if(sUrl.has("ej2child=true"))
{sUrl+="&ej2parent="+this.name;oDocument.setGlobalParent(this);}
s+='<iframe frameborder="no" border="0" marginwidth="0" marginheight="0"';s+=oConfig.bScrolling?' scrolling="auto"':' scrolling="no"';s+=' id="'+sIframeName+'" name="'+sIframeName+'"';s+=' src="'+sUrl+'"';s+=' width="'+sWidth+'" height="'+sHeight+'"';if(oConfig.sIframeClass)
s+=' class="'+oConfig.sIframeClass+'"';if(bTransparent)
s+=' allowtransparency="true"';s+='></iframe>';}
return s;}
function ebHTMLOverlayUrlSetDowngradeDomain(pUrl)
{if(!pUrl.has('downgradeDomain=true')&&this.bDowngradeDomain==true)
{pUrl+=!pUrl.has('?')?'?':'&';pUrl+='downgradeDomain=true';}
return pUrl;}
function ebHTMLOverlayUrlAfterFrameLoad()
{with(this)
{var ifObj=controls[sIframeName];if(!ifObj.eElem)ifObj.bind();if(bAutoResize)
ifObj.resize();if(bCloseLink)
{var e=oDocument.doc.getElementById('tblClose');ifObj.width(parseInt(e.style.width)+4);}}}
function ebHTMLOverlayUrlCloseOverlay()
{with(this)
{var ifObj=controls[sIframeName],cl=oGlobals.oClient;ifObj.bind();if(!cl.bFirefox)
ifObj.setSource(oGlobals.oEnvironment.sPicsDir+'tbx/s.gif');ifObj.cleanupMemory();setTimeout(oUtils.controlPath(this)+'.closeOverlayBase()',100);}}

//18@@m6

function EbaySYI3Grayout(pParent,pName)
{if(!this.objType)
this.objType="EbaySYI3Grayout";this.base=EbayBaseControl;this.base(pParent,pName);this.oLayer=new EbayHTMLLayer(this,'lyrGrayout_sec');this.aSelElems=this.oDocument.doc.getElementsByTagName('SELECT');this.aExcludeSelElems=[];this.bDisableSelElems=true;this.display=function(pWidth,pHeight,pPosArray)
{var oL=this.oLayer,pos=pPosArray;if(!oL.eElem)
oL.bind();oL.width(pWidth);oL.height(pHeight);oL.show(true);oL.left(pos?pos[0]:0);oL.top(pos?pos[1]:0);oL.setValue("");if(this.bDisableSelElems)
this.disableSelElems(true);}
this.hide=function()
{var oL=this.oLayer;oL.width(1);oL.height(1);oL.show(false);if(this.bDisableSelElems)
this.disableSelElems(false);}
this.disableSelElems=function(pDisable)
{if(pDisable)
this.aExcludeSelElems=[];var aS=this.aSelElems,l=aS.length;for(var i=0;i<l;i++)
{if(pDisable&&aS[i].disabled)
this.aExcludeSelElems[this.aExcludeSelElems.length]=aS[i].name;if(!pDisable&&this.oUtils.isInArray(this.aExcludeSelElems,aS[i].name))
continue;aS[i].disabled=pDisable;}}}

//19@@m1

function EbayHotSpotManager(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHotSpotManager";this.baseObject=EbayBaseControl;this.baseObject(pParent,pName);this.createControls=ebHotSpotCreateControls;this.createControls();}
function ebHotSpotCreateControls()
{var aConfigs=ebay.oDocument.aConfigs;var c;for(var oc in aConfigs)
{c=aConfigs[oc];if(c.objType=="EBayHotSpotConfig")
{if(c.inputFieldId&&c.divForTextId)
{new EbayHotSpot(this,oc,c);}}}}

//20@@m4

function EbayHotSpot(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayHotSpot";this.baseObject=EbayBaseControl;this.baseObject(pParent,pName);this.oConfig=pCfg?pCfg:null;this.bInitOn=typeof(this.oConfig.bInitOn)!="undefined"?this.oConfig.bInitOn:true;this.oConfig.elemIndex=this.oConfig.elemIndex?this.oConfig.elemIndex-1:0;this.replaceDiv=ebHotSpotReplaceDiv;this.updateHotSpots=ebHotSpotUpdateHotSpots;this.init=function()
{var c=this.oConfig;if(this.bInitOn)
{this._registerListener(this.oDocument._getEvent("load"),this.EVENT_AFTER,"updateHotSpots");}}
this.init();}
function ebHotSpotReplaceDiv(divName,data)
{var l=new EbayHTMLLayer(this,divName,false,this.oConfig);l.bind();l.setValue(data);}
function ebHotSpotUpdateHotSpots()
{if(!document.getElementsByTagName)
{return;}
var divs=document.getElementsByTagName('div');for(var j=0;j<divs.length;j++)
{if(typeof(divs[j])!="undefined")
{i=divs[j].id;if(i!="length"&&i!="")
{t=eval("typeof(this.oConfig['"+i+"'])!='undefined'");if(t)
{var data=eval("this.oConfig."+i);}
else
{continue;}
data=unescape(data);if(typeof(i)!="undefined"&&typeof(data)!="undefined"&&data!="undefined")
{this.replaceDiv(i,data);}}}}}
function EBayHotSpotConfig(name)
{if(!this.objType)
this.objType="EBayHotSpotConfig";this.base=EbayConfig;this.base(name);}

//21@@m1

function EbaySimpleTemplate(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbaySimpleTemplate";this.baseObject=EbayBaseControl;this.baseObject(pParent,pName);this.oConfig=pCfg?pCfg:null;this.oConfig.elemIndex=this.oConfig.elemIndex?this.oConfig.elemIndex-1:0;this.template=this.oConfig.template;this.onBeforeSwitch=this.oConfig.templateBeforeCommand;this.onAfterSwitch=this.oConfig.templateAfterCommand;}
function EbayTemplateConfig(pName)
{if(!this.objType)
this.objType="EbayTemplateConfig";this.base=EbayConfig;this.base(pName);this.template;this.templateBeforeCommand;this.templateAfterCommand;}

//22@@m3

function EbayLayoutManager(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayLayoutManager";this.baseObject=EbayBaseControl;this.baseObject(pParent,pName);this.oConfig=pCfg?pCfg:null;this.templates=new Array();this.currentTemplate="";this.addTemplate=ebLayoutMgrAddTemplate;this.getTemplate=ebLayoutMgrGetTemplate;this.switchTemplate=ebLayoutMgrSwitchTemplate;this.init=function()
{for(i in this.oConfig)
{if(i.indexOf("switch")!=-1&&i.indexOf("Links")==-1)
{var tplNm=eval('this.oConfig.'+i);var tplCfg=ebay.oDocument.getConfig(tplNm);this.addTemplate(new EbaySimpleTemplate(this,tplNm,tplCfg));var links=eval('this.oConfig.'+i+'Links');ancArray=links.split(",");for(i in ancArray)
{var a=new EbayHTMLAnchor(this,ancArray[i]);a._registerEvent("onclick","changeTemplate");a.changeTemplate=function()
{v=this.name.replace("template","");v=v.charAt(0);t="template"+v;this.parent.switchTemplate(t);}
a.bind();}}}}
this.init();}
function EbayTemplateMgrConfig(pName)
{if(!this.objType)
this.objType="EbayTemplateMgrConfig";this.base=EbayConfig;this.base(pName);this.masterDiv;}
function ebLayoutMgrAddTemplate(oTemplate)
{this.templates[oTemplate.name]=oTemplate;}
function ebLayoutMgrGetTemplate(name)
{return this.templates[name];}
function ebLayoutMgrSwitchTemplate(name)
{tmp=this.getTemplate(name);if(typeof(tmp)=='undefined')
return;if(tmp.onBeforeSwitch)
tmp.onBeforeSwitch();this.currentTemplate=name;var l=new EbayHTMLLayer(this,this.oConfig.masterDiv,false,this.oConfig);l.bind();l.setValue(tmp.oConfig.template);l=null;if(tmp.onAfterSwitch)
tmp.onAfterSwitch();}

//23@@m3

function EbayImageTable(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayImageTable";this.baseObject=EbayBaseControl;this.baseObject(pParent,pName);var c=this.oConfig=pCfg?pCfg:null;this.oConfig.elemIndex=c.elemIndex?c.elemIndex-1:0;this.columns=c.columns;this.startIndx=c.startIndx;this.endIndx=c.endIndx;this.imageArray=c.imageArray;this.preloadImages=ebImageTablePreloadImages;this.buImageArray=c.buImageArray?c.buImageArray:null;this.buImageAryIndx=c.buImageAryIndx;this.imageAryIndx=c.imageAryIndx;this.createThumbText=c.createThumbs;this.setupThumbControls=c.setupThumbControls;this.init=c.setupThumbBinding;}
function ebImageTablePreloadImages()
{}

//24@@m10

function EbayHTMLText(pParent,pName,pDisabled,pCfg,bHidden)
{if(!this.objType)
this.objType="EbayHTMLText";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.value=ebHTMLTextValue;this.getValue=ebHTMLTextGetValue;this.setValue=ebHTMLTextSetValue;this.select=ebHTMLTextSelect;if(bHidden!=true)
this.subscribeEvents("onchange","onblur","onfocus","onkeydown","onkeyup");}
function ebHTMLTextValue(pVal)
{var e=this.eElem;if(e)
{if(typeof(pVal)=="undefined")
return e.value;else
e.value=pVal;}}
function ebHTMLTextGetValue()
{return this.value();}
function ebHTMLTextSetValue(pVal)
{return this.value(pVal);}
function ebHTMLTextSelect()
{var e=this.eElem;if(e)
e.select();}

//25@@m4

function EbayImageSwitcher(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayImageSwitcher";this.baseObject=EbayBaseControl;this.baseObject(pParent,pName);this.oConfig=pCfg?pCfg:null;this.oDestinationImg=null;this.imgSrc=null;this.imgIndx=null;this.imgId=null;this.imgAry=null;this.imgArrayImgIndex=0;this.width=0;this.height=0;this.switchIt=ebSwitchImage;this.switchImageWithImgObject=ebSwitchImageWithImgObject;this.init=function()
{with(this)
{imgSrc=oConfig.initialImage;imgIndx=oConfig.initialIndx;imgId=oConfig.imgId;imgAry=oConfig.imgAry;imgArrayImgIndex=oConfig.imgArrayImgIndex;if(imgSrc==null)
{if(typeof(imgArrayImgIndex)!="undefined")
{imgSrc=imgAry[imgIndx][imgArrayImgIndex];}
else
{imgSrc=imgAry[imgIndx];}}}}
this.init();}
function ebSwitchImage()
{if(this.oDestinationImg==null)
{this.oDestinationImg=new EbayHTMLImage(this,this.imgId);this.oDestinationImg.bind();this.oDestinationImg.source(this.imgSrc,"");}
with(this)
{imgSrc=imgAry[imgIndx][imgArrayImgIndex];oDestinationImg.source(imgSrc,"");}}
function ebSwitchImageWithImgObject()
{}
function EbayImageSwitcherConfig(name)
{if(!this.objType)
this.objType="EBayCharCounterConfig";this.base=EbayConfig;this.base(name);this.initialImage;this.initialIndx;this.imgId;this.imgAry;this.imgArrayImgIndex;}
function ebSwitchItID(name,imgIndx)
{swi=ebay.oDocument._getControl(name);swi.imgIndx=imgIndx;swi.switchIt();}
function ebSwitchItBySrc(name,source,width,height,resizeit,allowStretch)
{swi=ebay.oDocument._getControl(name);swi.imgSrc=source;swi.resizeIt=resizeit;swi.width=width;swi.height=height;swi.allowStretch=allowStretch;swi.switchImageWithImgObject();swi.allowStretch=false;}
function ebSwitchItByImage(name,image,width,height)
{swi=ebay.oDocument._getControl(name);swi.imgSrc=image.getElem(image.name).src;swi.width=width;swi.height=height;swi.resizeIt=true;swi.switchImageWithImgObject();swi.resizeIt=false;}

//26@@m1

function EbayVIBuyerChecklist(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayVIBuyerChecklist";var oCfg=this.oCfg=pCfg;this.base=EbayBaseControl;this.base(pParent,pName);this.aImg=new Array;this.oImgParam=new EbayHTMLText(this,oCfg.sHiddenVar);for(i=0;i<oCfg.aChecklistInfo.length;i++)
{var oImg=this.aImg[i]=new EbayHTMLImage(this,oCfg.aChecklistInfo[i][0],false,oCfg.aImgUrls[0],oCfg.aImgUrls[1]);oImg.sImgVal=oCfg.aChecklistInfo[i][1];oImg.bChecked=oCfg.aChecklistInfo[i][2];oImg.oL=new EbayHTMLLayer(this,oCfg.aChecklistInfo[i][3])
oImg.onclick=function()
{with(this)
{parent.setVal(this,!bChecked);enableBase(true);}}}
this.setVal=function(pObj,bToggle)
{with(this)
{toggleStyles(pObj,bToggle)
var s='';for(j=0;j<aImg.length;j++)
if(aImg[j].bChecked)
s=s+aImg[j].sImgVal+',';s=s.substr(0,s.length-1);oImgParam.setValue(s);}}
this.toggleStyles=function(pObj,bToggle)
{with(pObj)
{enable(bToggle);bChecked=bToggle;if(!oL.eElem)
oL.bind();var sStyle=bToggle?this.oCfg.aDivStyles[0]:this.oCfg.aDivStyles[1];oL.setClass(sStyle);}}}

//27@@m5

function EbayUtilsPositioning(pParent,pName)
{if(!this.objType)
this.objType="EbayUtilsPositioning";this.base=EbayObject;this.base(pParent,pName);this.getScrollLeftTop=function()
{var d=this.oDocument.doc,rv=[0,0],db=d.body,de=d.documentElement;if(db)
{rv[0]+=db.scrollLeft;rv[1]+=db.scrollTop;}
if(de)
{rv[0]+=de.scrollLeft;rv[1]+=de.scrollTop;}
return rv;}
this.getClientWidthHeight=function()
{var d=this.oDocument.doc,de=d.documentElement?d.documentElement:d.body;return[de.clientWidth,de.clientHeight];}
this.getOffsetLeftTop=function(pElem)
{var e=pElem,rv=[0,0];while(e)
{rv[0]+=e.offsetLeft;rv[1]+=e.offsetTop;e=e.offsetParent;}
return rv;}
this.getEventLeftTop=function(pEvent)
{var evt=this.parent.parent.oDocument.win.event||pEvent,xOff=(typeof(screenLeft)!="undefined")?screenLeft:screenX,yOff=(typeof(screenTop)!="undefined")?screenTop:(screenY+(outerHeight-innerHeight)-25);return[evt.screenX-xOff,evt.screenY-yOff];}}
ebay.oUtils.oPositioning=new EbayUtilsPositioning(ebay.oUtils,"Positioning Functions");

//28@@m2

function EbayVIPaymentCalculator(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayVIPaymentCalculator";var oC=this.oCfg=pCfg;this.base=EbayBaseControl;this.base(pParent,pName);var oCl=this.oCl=this.parent.oGlobals.oClient;var oL=this.oL=new EbayHTMLOverlayUrl(this,oC.sPayCalcLayer,oC);var lyr=this.lyr=new EbayHTMLLayer(this,oC.sCurveBoxBottom);this.oPayCalc=new Array;for(j=0;j<oC.aLinks.length;j++)
{var oPayCalc=this.oPayCalc[j]=new EbayHTMLAnchor(this,oC.aLinks[j])
oPayCalc._registerEvent("onclick","onClick");oPayCalc.onClick=function()
{with(this.parent)
{if(oCl.bIE)
lyr.show(false);oL.bDowngradeDomain=false;oL.bForceReposition=true;oL.sUrl=oC.sUrl;if(!oL.eElem)
oL.bind();oL.setPosition=positionLayer;oL.display();return false;}}}
this.positionLayer=function()
{return false;}}

//29@@m21

function EbayHTMLSelect(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLSelect";this.base=EbayHTMLFormElem;this.base(pParent,pName,pDisabled,pCfg);this.iSelIndex=-1;this.createOption=ebHTMLSelectCreateOption;this.clearOptions=ebHTMLSelectClearOptions;this.getValueByIndex=ebHTMLSelectGetValueByIndex;this.getSelectedIndex=ebHTMLSelectGetSelectedIndex;this.getSelectedValue=ebHTMLSelectGetSelectedValue;this.getSelectedText=ebHTMLSelectGetSelectedText;this.getOptionsLength=ebHTMLSelectGetOptionsLength;this.setOption=ebHTMLSelectSetOption;this.insertOption=ebHTMLSelectInsertOption;this.deleteOption=ebHTMLSelectDeleteOption;this.selectByIndex=ebHTMLSelectSelectByIndex;this.selectByValue=ebHTMLSelectSelectByValue;this.selectByText=ebHTMLSelectSelectByText;this.doSelect=ebHTMLSelectDoSelect;this.getIndexByValue=ebHTMLSelectGetIndexByValue;this.getValue=this.getSelectedValue;this.setValue=this.selectByValue;this.subscribeEvents("onchange");}
function ebHTMLSelectClearOptions()
{var e=this.eElem;if(e)
{var opts=e.options;while(opts.length>0)
opts[opts.length-1]=null;}}
function ebHTMLSelectCreateOption(pName,pText)
{if(this.eElem)
{var nOpt=new Option(pText,pName,false,false),opts,lo,oC=ebay.oGlobals.oClient;opts=this.eElem.options;opts[opts.length]=nOpt;idx=opts.length-1;return idx;}}
function ebHTMLSelectGetValueByIndex(pIdx,pTextOnly)
{if(pIdx>-1)
{opt=this.eElem.options[pIdx];if(opt)
return pTextOnly?opt.text:opt.value;}
this.throwError("Invalid index","get");return"";}
function ebHTMLSelectGetSelectedIndex()
{return this.eElem.selectedIndex;}
function ebHTMLSelectGetSelectedValue()
{return this.getValueByIndex(this.eElem.selectedIndex);}
function ebHTMLSelectGetSelectedText()
{return this.getValueByIndex(this.eElem.selectedIndex,true);}
function ebHTMLSelectGetOptionsLength()
{return this.eElem.options.length;}
function ebHTMLSelectSelectByIndex(pIndex)
{this.eElem.selectedIndex=this.iSelIndex=pIndex;}
function ebHTMLSelectDoSelect(pVal,pIsText)
{if(this.eElem)
{var e=this.eElem,o,rv=false,opts=e.options,len=opts.length;for(var i=0;i<len&&!rv;i++)
{o=opts[i];if(((pIsText||(o.value==""))&&(pVal==o.text))||(!pIsText&&(o.value==pVal)))
{e.selectedIndex=this.iSelIndex=i;rv=true;}}}
else
this.throwWarning("HTML element '"+this.name+"' not found","selectByValue");return rv;}
function ebHTMLSelectSelectByValue(pVal)
{return this.doSelect(pVal);}
function ebHTMLSelectSelectByText(pVal)
{return this.doSelect(pVal,true);}
function ebHTMLSelectSetOption(pVal,pText,pInd)
{if(this.eElem)
{if((pInd!=null)&&(pInd>-1))
{var o=this.eElem.options[pInd];o.value=pVal;o.text=pText;}
else
this.createOption(pVal,pText);}
else
this.throwWarning("HTML element '"+this.name+"' not found","selectByValue");}
function ebHTMLSelectInsertOption(pVal,pText,pInd)
{with(this)
{var e=eElem,opts=e.options,len=opts.length;var inOpt=new Array(pText,pVal),tmpOpt=new Array(2);var sel=getSelectedValue();len++;if(pInd>=len)
return;for(i=pInd;i<len;i++)
{if(i<len-1)
tmpOpt=[e.options[i].text,e.options[i].value];opts[i]=new Option(inOpt[0],inOpt[1]);inOpt=tmpOpt;}
selectByValue(sel);}}
function ebHTMLSelectDeleteOption(pInd)
{if(typeof(pInd)!='undefined')
{var opts=this.eElem.options;if(opts[pInd])
opts[pInd]=null;}}
function ebHTMLSelectGetIndexByValue(pVal,pIsText)
{var opts=this.eElem.options,len=opts.length,i=0;for(;i<len;i++)
{o=opts[i];if((o.value==pVal)||(pIsText&&(o.text==pVal)))
return i;}
return-1;}

//30@@m1

function EbayFieldValidation(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayFieldValidation";this.oCfg=pCfg;this.base=EbayBaseControl;this.base(pParent,pName);this.init=function()
{with(this)
{this.iDefaultIdx=oCfg.iDefIndex;this.aSelElem=new Array;this.oL=new EbayHTMLLayer(this,oCfg.sDivError);for(i=0;i<oCfg.aSelectInfo.length;i++)
{aSelElem[i]=new EbayHTMLSelect(this,oCfg.aSelectInfo[i][0]);aSelElem[i].oErrorDiv=new EbayHTMLLayer(this,oCfg.aSelectInfo[i][1]);}}}
this.toggleOnErrors=function()
{with(this)
{var sToggleTitle,bHasErrors=false;for(var i=0,len=aSelElem.length;i<len;i++)
{if(aSelElem[i].eElem)
{if(aSelElem[i].getSelectedIndex()==iDefaultIdx)
{sToggleTitle=oCfg.aDivStyles[1];bHasErrors=true;}
else
sToggleTitle=oCfg.aDivStyles[0];aSelElem[i].oErrorDiv.setClass(sToggleTitle);}}
oL.show(bHasErrors);return bHasErrors;}}
this.init();}

//31@@m2

function EbayTabNavigation(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayTabNavigation";this.oCfg=pCfg;this.base=EbayBaseControl;this.base(pParent,pName);this._registerListener(this.oDocument._getEvent("load"),this.EVENT_AFTER,"initOnAfterLoad");this.iDefIndex=this.oCfg.iDefIndex;this.bInitTabContents=this.oCfg.bInitTabContents;this.bisOnLoadCall=true;this.init=function()
{var oC=this.oCfg,aTabDivs=oC.aTabDivs,aSCDivs=oC.aSubContentInfos;var iATDLen=aTabDivs?aTabDivs.length:0,iASCDLen=aSCDivs?aSCDivs.length:0,i,oTemp;this.aTabDivs=new Array,this.aTabAnchs=new Array,this.aContentDivs=new Array;this.aSubContentDivs=new Array,this.aSubContentIFrames=new Array,this.aSubContentUrls=new Array;for(i=0;i<iATDLen;i++)
{oTemp=new EbayHTMLAnchor(this,aTabDivs[i][0]);this.aTabDivs[aTabDivs[i][3]]=new EbayHTMLLayer(this,aTabDivs[i][1]);oTemp._registerEvent("onclick","parent.tabAnchorOnclick");oTemp.iInd=aTabDivs[i][3];this.aTabAnchs[aTabDivs[i][3]]=oTemp;this.aContentDivs[aTabDivs[i][3]]=new EbayHTMLLayer(this,aTabDivs[i][2]);}
for(i=0;i<iASCDLen;i++)
{var aDivs=aSCDivs[i][0],iSCDLen=aDivs?aDivs.length:0;for(var j=0;j<iSCDLen;j++)
new EbayHTMLLayer(this,aDivs[j]);this.aSubContentIFrames[aSCDivs[i][3]]=new EbayHTMLFrame(this,aSCDivs[i][1]);this.aSubContentUrls[aSCDivs[i][3]]=aSCDivs[i][2];}
this.oContentFrame=new EbayHTMLFrame(this,oC.aContentIFrame[0]);this.oContentUrl=oC.aContentIFrame[1];}
this.initOnAfterLoad=function()
{var oAnch=this.aTabAnchs[this.iDefIndex];if(oAnch)
oAnch.onclick();}
this.tabAnchorOnclick=function()
{with(this.parent)
{if(this.parent.bInitTabContents&&!this.parent.bisOnLoadCall)
oContentFrame.eElem.src=this.parent.oCfg.sInitTabContentsUrl+this.iInd;else
oContentFrame.eElem.src=oContentUrl+this.iInd;this.parent.bisOnLoadCall=false;}}
this.showTabContent=function(pIndex)
{this.aTabDivs[pIndex].setClass(this.oCfg.aTabStyles["selected"]);this.aContentDivs[pIndex].show(true);if(typeof(this.iPrevSelInd)!="undefined"&&this.iPrevSelInd!=pIndex)
{this.aTabDivs[this.iPrevSelInd].setClass(this.oCfg.aTabStyles["notselected"]);this.aContentDivs[this.iPrevSelInd].show(false);}
this.iPrevSelInd=pIndex;var oFrame=this.aSubContentIFrames[pIndex];if(oFrame&&!oFrame.bAlreadyInit)
{oFrame.bAlreadyInit=true;oFrame.eElem.src=this.aSubContentUrls[pIndex];}
if(this.sHref)
{this.oDocument.gotoAnchor(this.sHref);this.sHref=null;}}
this.rebind=function(pReBindInfos)
{var aRBElems=pReBindInfos,iLen=aRBElems.length,oC=null;var oD=this.oDocument;for(var i=0;i<iLen;i++)
{oC=oD._getControl(aRBElems[i]);if(!oC)
oC=new EbayHTML(this,aRBElems[i]);oC.bind();}}
this.init();}

//32@@m1

function EbayHTMLLayerFormSubmit(pParent,pName,pDisabled,pCfg)
{if(!this.objType)
this.objType="EbayHTMLLayerFormSubmit";this.base=EbayHTMLLayer;this.base(pParent,pName,pDisabled,pCfg);this.oCfg=pCfg;this.subscribeEvents("onclick");this.init=ebHTMLLayerFormSubmitInit;this.showButton=ebHTMLLayerFormSubmitShow;if(!pCfg.bNonSubmit)
this.onclick=ebHTMLLayerFormSubmitClick;this.init();}
function ebHTMLLayerFormSubmitInit()
{var oCl=this.oGlobals.oClient;if((oCl.bIE&&oCl.iVer>5)||(oCl.bFirefox)||(oCl.bNav&&oCl.iVer>6)||(oCl.bSafari))
{this.oForm=new EbayHTMLForm(this,this.oCfg.sFormName);this._registerListener(this.oDocument._getEvent("load"),this.EVENT_AFTER,"showButton");}}
function ebHTMLLayerFormSubmitShow()
{this.setValue(this.oCfg.sHTML);}
function ebHTMLLayerFormSubmitClick()
{this.oForm.submit();return false}
ebay.oDocument.oPage.createButton=function(pName)
{var c=this.oDocument.getConfig(pName)
if(c)
new EbayHTMLLayerFormSubmit(this,c.sLayerName,false,c);}

//33@@m4

ebay.oDocument.oPage.registerFormPopupSubmit=function(pSubmitInfos,pPopupInfos)
{this.aFPSControls=[],this.aFPSControls[this.aFPSControls.length]=[pSubmitInfos,pPopupInfos];this._registerListener(this.parent._getEvent("load"),this.EVENT_BEFORE,"formPopupSubmit");this.registerFormPopupSubmit=function(pSubmitInfos,pPopupInfos)
{this.aFPSControls[this.aFPSControls.length]=[pSubmitInfos,pPopupInfos];}}
ebay.oDocument.oPage.formPopupSubmit=function()
{var aFPSControls=this.aFPSControls,iLen=aFPSControls.length;for(var i=0;i<iLen;i++)
{var aSubmitInfos=aFPSControls[i][0],aPopupInfos=aFPSControls[i][1];var oForm=new EbayHTMLForm(this,aSubmitInfos[0]);var oBut=this.oDocument._getControl(aSubmitInfos[1]);if(!oBut)
oBut=new EbayHTMLButton(this,aSubmitInfos[1]);var oPopup=new EbayHTMLPopup(this,"Popup");oPopup.sBaseUrl=aSubmitInfos[2],oBut.oPopup=oPopup,oBut.oForm=oForm;oBut.bUseFormAction=aSubmitInfos[4];oPopup.iHeight=aPopupInfos[1],oPopup.iWidth=aPopupInfos[0];oPopup.iLeft=aPopupInfos[2]?aPopupInfos[2]:0,oPopup.iTop=aPopupInfos[3]?aPopupInfos[3]:0;oBut.subscribeEvents("onclick");oBut._registerListener(oBut._registerEvent("onclick"),this.parent.EVENT_AFTER,"onClick");oBut.bValidate=aSubmitInfos[3];if(oBut.bValidate)
{var oValCfg=ebay.oDocument.getConfig("ViewItem.FinancingPartner.Validation");if(oValCfg)
this.oValCtrl=new EbayFieldValidation(this,'EbayFieldValidation',oValCfg);}
oBut.onClick=function()
{with(this)
{if(parent.oValCtrl)
if(bValidate&&parent.oValCtrl.toggleOnErrors())
return;var aP=[],iPLen,sParam="";var sUrl=oPopup.sBaseUrl;if(bUseFormAction)
{oForm.bind();sUrl=oForm.getAction();}
oPopup.sUrl=sUrl;aP=oForm.getElements(),iPLen=aP.length;for(var j=0;j<iPLen;j++)
{if(((aP[j].type=="radio")||(aP[j].type=="checkbox"))&&!aP[j].checked)
continue;sParam+=("&"+aP[j].name+"="+aP[j].value);}
oPopup.sUrl+=sParam;parent.setDimensions(oPopup);oPopup.show();}
return false;}
this.setDimensions=function(pObj)
{with(this)
{var oPopup=pObj;var winHeight=getHeight()-200;var winWidth=getWidth()-200;if(winHeight>0&&winWidth>0)
{oPopup.iHeight=winHeight;oPopup.iWidth=winWidth;}}}
this.getHeight=function()
{with(this)
{var oD=oDocument;winHeight=oD.doc.body.clientHeight,cL=oGlobals.oClient;if(!cL.bIE)
winHeight=oD.win.innerHeight;else if(typeof(winHeight)=='undefined'&&cL.iVer>=6)
winHeight=oD.doc.documentElement.clientHeight;return winHeight;}}
this.getWidth=function()
{with(this)
{var oD=oDocument;winWidth=oD.doc.body.clientWidth,cL=oGlobals.oClient;if(!cL.bIE)
winWidth=window.innerWidth;return winWidth;}}}}

//34@@m33

ebay.oDocument.oPage.onBeforeLoad=function()
{var oConfig=this.oDocument.getConfig("DynamicTransit");if(oConfig)
new EbayDynamicTransit(ebay.oDocument.oPage,"DynamicTransit",oConfig);var c=ebay.oGlobals.oClient;if(c.bNav&&c.iVer==4)
{return;}
var eD=this.parent;var thumbConfig=eD.getConfig("thumbnails");var rightThumbConfig=eD.getConfig("rightThumbnails");var bottomThumbConfig=eD.getConfig("bottomThumbnails");var tConfig=eD.getConfig("templates");var hpConfig=eD.getConfig("hotspot1");var imgSwitcherCfg=eD.getConfig("thumbsMotors");if(thumbConfig!=null&&tConfig!=null&&hpConfig!=null&&imgSwitcherCfg!=null)
{var tn=new EbayImageTable(eD,"thumbnails",thumbConfig);if(rightThumbConfig!=null&&bottomThumbConfig!=null)
{var tn2=new EbayImageTable(eD,"rightThumbnails",rightThumbConfig);var tn3=new EbayImageTable(eD,"bottomThumbnails",bottomThumbConfig);}
var cc=new EbayHotSpotManager(eD,"hpManager",hpConfig,tConfig);var lM=new EbayLayoutManager(eD,"layoutmanager",tConfig);var iS=new EbayImageSwitcher(eD,"thumbsMotors",imgSwitcherCfg);var winProps=ebGetWindowProperties();ebsetTemplateBasedOnWidth(winProps[0]);this._registerListener(eD._getEvent("resize"),this.EVENT_AFTER,"resizeIt");this.resizeIt=function()
{window.clearTimeout(window.windowResizeTimer);window.windowResizeTimer=window.setTimeout("finishResize()",25);}}
var picShowCfg=eD.getConfig("ViewItem.PictureShow");if(picShowCfg)
{with(this)
{picShowCfg.aImageUrls=extractPictureArray(ssPopupData.imageUrls,picShowCfg.iImgDisplayIdx);window.itemPopup=openPicShowPopup;new EbayHTMLSlideshow(this,'viewitem_picshow',false,picShowCfg);this.aSlideShows=['viewitem_picshow'];}}
var oCfg=this.parent.getConfig("ViewItem.FastRefresh");if(oCfg)
this.fastRefresh(oCfg);var oCfgMVI=this.parent.getConfig('Motors.ViewItem.TabNavigation'),oTab;if(oCfgMVI)
{oTab=this.oTabNavigation=new EbayTabNavigation(this,'Tab_Navigation',oCfgMVI);oTab.iPrevSelInd=oTab.iDefIndex;this.showTab=function(pIndex,pHref)
{oTab.iDefIndex=pIndex;oTab.initOnAfterLoad();oTab.sHref=pHref;}}
var oCfgPC=this.parent.getConfig('Motors.ViewItem.PaymentCalculator');if(oCfgPC)
new EbayVIPaymentCalculator(this,'Payment_Calculator',oCfgPC);var oCfgBC=this.parent.getConfig('Motors.ViewItem.BuyerChecklist');if(oCfgBC)
new EbayVIBuyerChecklist(this,'Buyer_Checklist',oCfgBC);var oC=this.parent.getConfig("ViewItem.SkypeCheck");if(oC)
{var oAnchChat=new EbayHTMLAnchor(this,oC.sChatAnch);var oAnchCall=new EbayHTMLAnchor(this,oC.sCallAnch);var e=oAnchCall._registerEvent("onclick","parent.skypecheck");var e1=oAnchChat._registerEvent("onclick","parent.skypecheck");this.skypecheck=function()
{var c=ebay.oDocument.addConfig(new EbayConfig('SkypeCheck'));c.sPluginURL=oC.sPluginURL;c.iPluginWidth=oC.iPluginWidth;c.iPluginHeight=oC.iPluginHeight
c.oLink=this;return oD.oSkypeCheck.checkInstall();}}
var oSkypeCfg=this.parent.getConfig("ViewItem.SkypeRequest");if(oSkypeCfg)
{oFrame=new EbayHTMLFrame(this,oSkypeCfg.sSkypeiFrame);var oSkypeDiv=new EbayHTMLLayer(this,oSkypeCfg.sSkypeDiv);var oNADiv=new EbayHTMLLayer(this,oSkypeCfg.sNonAvailableDiv);oFrame._registerListener(this.oDocument._getEvent("load"),this.EVENT_AFTER,"setUrl");oFrame.setUrl=function()
{var oSkype=new EbaySkype(this,"skype");if(oSkypeCfg.sSkypeName&&oSkype.bInstalled)
{var sSkypeUrl="skype:"+oSkypeCfg.sSkypeName+"?";if(parseInt(oSkypeCfg.iSkypeAction)==1)
sSkypeUrl+="chat";else if(parseInt(oSkypeCfg.iSkypeAction)==2)
sSkypeUrl+="call";this.oDocument.doc.location.href=sSkypeUrl;}
var oSkypeSectionDiv=new EbayHTMLLayer(this.parent,oSkypeCfg.sSkypeSectionDiv);oSkypeSectionDiv.bind();if(this.oGlobals.oClient.bSafari)
this.eElem.src=oSkypeCfg.sUrl
else
this.setSource(oSkypeCfg.sUrl);}}
var oD=this.parent;var oCfgWI=oD.getConfig("ViewItem.WatchThisItem");var oCl=this.parent.oGlobals.oClient;if(oCfgWI)
{var sUrl;if(oCfgWI.aWatchLinkTop)
{var a=new EbayHTMLAnchor(this,oCfgWI.aWatchLinkTop[0]);a._registerEvent("onclick","onclick");a.onclick=function()
{if(oCfgWI.bIdentified)
{this.parent.parent.redirect(oCfgWI.sIdentifiedWatchUrl);}else{oCfgWI.ssPageName="VIP:WATCHLINK:TOP:";sUrl=oCfgWI.aWatchLinkTop[2]+"ebay.oDocument.oPage.watchItemResult";ebay.oClientServer.callDynamicScriptObject(sUrl);}
return false;}}
var f=new EbayHTMLForm(this,"watch_thisItem");f._registerEvent("onsubmit","onsubmit");f.onsubmit=function()
{if(oCfgWI.bIdentified)
{this.parent.parent.redirect(oCfgWI.sIdentifiedWatchUrl);}else{oCfgWI.ssPageName="VIP:WATCHLINK:MIDDLE:";sUrl=oCfgWI.aWatchLinkMiddle[2]+"ebay.oDocument.oPage.watchItemResult";ebay.oClientServer.callDynamicScriptObject(sUrl);}
return false;}}
var oCfgCB=oD.getConfig("ViewItem.OneClickBid");if(oCfgCB)
{var oAnchOcb=new EbayHTMLAnchor(this,oCfgCB.aOneClickBidLinks[0]);var maxBid=document.getElementById(oCfgCB.aMaxBidText[0]);oAnchOcb._registerEvent("onclick","onclick");oAnchOcb.onclick=function()
{oCfgCB.url=oCfgCB.sOneClickBidUrl+"&maxbid=";if(maxBid!=null)
oCfgCB.url=oCfgCB.url+maxBid.value;var ocbLyr=new EbayHTMLOverlayUrl(this,oCfgCB.sOneClickBidDiv,oCfgCB);var goLyr=new EbaySYI3Grayout(this,'grayout_lyr');goLyr.display(document.body.scrollWidth,document.body.scrollHeight);ocbLyr.bDowngradeDomain=false;ocbLyr.display();return false;}
var oAnchOcbTop=new EbayHTMLAnchor(this,oCfgCB.aOneClickBidLinks[1]);var maxBidTop=document.getElementById(oCfgCB.aMaxBidText[1]);oAnchOcbTop._registerEvent("onclick","onclick");oAnchOcbTop.onclick=function()
{oCfgCB.url=oCfgCB.sOneClickBidUrl+"&maxbid=";if(maxBidTop!=null)
oCfgCB.url=oCfgCB.url+maxBidTop.value;var ocbLyr=new EbayHTMLOverlayUrl(this,oCfgCB.sOneClickBidDiv,oCfgCB);var goLyr=new EbaySYI3Grayout(this,'grayout_lyr');goLyr.display(document.body.scrollWidth,document.body.scrollHeight);ocbLyr.bDowngradeDomain=false;ocbLyr.display();return false;}}
var oCfgC=oD.getConfig("ViewItem.Counter");if(oCfgC)
{if(oCfgC.bShowCounter)
{var sUrl=oCfgC.sCounterUrl+"&cb=ebay.oDocument.oPage.showCounter";ebay.oClientServer.callDynamicScriptObject(sUrl);}}}
ebay.oDocument.oPage.fastRefresh=function(pCfg)
{var oCfg=pCfg,aRAIds=oCfg.aRefreshAnchIds,iLen=aRAIds.length;var oRI=new EbayFastRefresh(this,oCfg.sRefreshIframe,oCfg);for(var i=0;i<iLen;i++)
{oAnch=this.parent._getControl(aRAIds[i]);if(!oAnch)
oAnch=new EbayHTMLAnchor(this,aRAIds[i]);oAnch._registerEvent("onclick","submitIframe");oAnch.submitIframe=function()
{oRI.sendRequest(oCfg.sReqUrl);return false;}}
if(oCfg.bFastRefFuncKey&&this.oGlobals.oClient.bIE)
{this.parent.doc.onkeydown=function(pEvent)
{var evt=pEvent||event,sUrl;if(evt&&evt.keyCode==116)
{sUrl=oCfg.sReqUrl+(oCfg.sFuncKeyParam?oCfg.sFuncKeyParam:"");evt.keyCode=505;oRI.sendRequest(sUrl);return false;}}}
if(oCfg.bAutoRefresh&&oCfg.iAutoRfhTimer&&oCfg.iAutoRfhTimer>0)
{var sAutoRefresh="ebay.oDocument.oPage.autoRefresh()";this.autoRefresh=function()
{oRI.sendRequest(oCfg.sReqUrl);window.setTimeout(sAutoRefresh,oCfg.iAutoRfhTimer);}
window.setTimeout(sAutoRefresh,oCfg.iAutoRfhTimer);}}
ebay.oDocument.oPage.onAfterLoad=function()
{var oMSTCfg=this.parent.getConfig("ViewItem.Motors.SiteTracking");if(oMSTCfg)
{var aElemInfos=oMSTCfg.aElemInfos,iLen=aElemInfos.length;var oImg=new EbayHTMLImage(this,oMSTCfg.sImgElem);oImg.bind();for(var i=0;i<iLen;i++)
{var sName=aElemInfos[i][0];var oElem=this.oDocument._getControl(sName);if(!oElem)
{oElem=new EbayHTML(oImg,sName,sName);oElem.subscribeEvents("onclick");oElem.bind();}
oElem.sParam=aElemInfos[i][1];oElem._registerListener(oElem._registerEvent("onclick"),this.EVENT_BEFORE,"setSrc");oElem.setSrc=function()
{oImg.source(oMSTCfg.sBaseUrl+this.sParam);}}}
with(this)
{var oPicCfg=parent.getConfig("ViewItem.PictureShow");if(oPicCfg)
for(var i=0;i<aSlideShows.length;i++)
{var oShow=this._getControl(aSlideShows[i]);if(oShow)
oShow.next();}}
var oCfgCB=this.parent.getConfig("ViewItem.OneClickBid");if(oCfgCB)
{if(oCfgCB.bShowOCB)
this.parent._getControl(oCfgCB.sOneClickBidLink).onclick();}}
ebay.oDocument.oPage.extractPictureArray=function(pArray,pIdx)
{var aImgs=[];for(var i=0;i<pArray.length;i++)
{var aSlide=pArray[i];aImgs[aImgs.length]=aSlide[pIdx];}
return aImgs;}
function ebGetWindowProperties()
{var myWidth=0,myHeight=0;if(typeof(window.innerWidth)=='number'){myWidth=window.innerWidth;myHeight=window.innerHeight;}else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){myWidth=document.documentElement.clientWidth;myHeight=document.documentElement.clientHeight;}else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){myWidth=document.body.clientWidth;myHeight=document.body.clientHeight;}
return[myWidth,myHeight];}
function finishResize()
{var props=ebGetWindowProperties();ebsetTemplateBasedOnWidth(props[0]);}
function ebsetTemplateBasedOnWidth(w)
{lm=ebay.oDocument._getControl("layoutmanager");ct=lm.currentTemplate;if(descImageUrls.length==1)
{n="templateE"
lm._exec("switchTemplate",n);}
else
{if(ct!="templateB"||ct=="")
{if(w>=1024)
{n="templateA";if(ct!=n)
lm._exec("switchTemplate",n);}
else
{n="templateD"
if(ct!=n)
lm._exec("switchTemplate",n);}}}}
function ebBeforeTemplateB()
{if(this.parent.currentTemplate=="templateD")
{this.oConfig.template=this.oConfig.template.replace(/template.\d/g,"templateD1");}
else if(this.parent.currentTemplate=="templateA")
{this.oConfig.template=this.oConfig.template.replace(/template.\d/g,"templateA1");}}
function ebAfterTemplateB()
{var hsManager=ebay.oDocument._getControl("hotspot1");hsManager.updateHotSpots();hsManager=null;var loMgr=ebay.oDocument._getControl("layoutmanager");loMgr.init();loMgr=null;with(ebay.oDocument.oPage)
{var picCfgLarge=parent.getConfig("ViewItem.PictureShow.Larger");if(picCfgLarge)
{picCfgLarge.aImageUrls=extractPictureArray(ssPopupData.imageUrls,picCfgLarge.iImgDisplayIdx);var oShow=ebay.oDocument.oPage.descSS=new EbayHTMLSlideshow(ebay.oDocument.oPage,'larger_viewitem_picshow',false,picCfgLarge);oShow.bindChildren();oShow.init();}}
var iSwitch=ebay.oDocument._getControl("thumbsMotors");i=iSwitch.imgIndx;i=i==null?0:i;ebThumbImageNum(i);}
function ebBeforeTemplateA()
{with(ebay.oDocument.oPage)
{if(typeof(descSS)!='undefined'&&descSS)
descSS.stop();}
var hsManager=ebay.oDocument._getControl("hotspot1");hsManager.oConfig.thumbs=ebay.oDocument._getControl("thumbnails")._exec("createThumbText");}
function ebAfterTemplateA()
{var iSwitch=ebay.oDocument._getControl("thumbsMotors");var hsManager=ebay.oDocument._getControl("hotspot1");hsManager.updateHotSpots();hsManager=null;var gotoTemp="templateA";var loMgr=ebay.oDocument._getControl("layoutmanager");loMgr.init();loMgr=null
with(ebay.oDocument.oPage)
{i=(typeof(descSS)!='undefined'&&descSS)?descSS.iCurrentIdx:0;iSwitch.imgIndx=i;}
iSwitch.imgIndx=i;if(iSwitch.oDestinationImg!=null)
iSwitch.oDestinationImg.bind();iSwitch.switchIt();}
function ebBeforeTemplateD()
{with(ebay.oDocument.oPage)
{if(typeof(descSS)!='undefined'&&descSS)
descSS.stop();}
var hsManager=ebay.oDocument._getControl("hotspot2");hsManager.oConfig.bottomthumbs=ebay.oDocument._getControl("bottomThumbnails")._exec("createThumbText");hsManager.oConfig.rightthumbs=ebay.oDocument._getControl("rightThumbnails")._exec("createThumbText");}
function ebAfterTemplateD()
{var iSwitch=ebay.oDocument._getControl("thumbsMotors");var hsManager=ebay.oDocument._getControl("hotspot2");hsManager.updateHotSpots();hsManager=null;var loMgr=ebay.oDocument._getControl("layoutmanager");loMgr.init();loMgr=null;with(ebay.oDocument.oPage)
{i=(typeof(descSS)!='undefined'&&descSS)?descSS.iCurrentIdx:0;iSwitch.imgIndx=i;}
iSwitch.imgIndx=i;if(iSwitch.oDestinationImg!=null)
iSwitch.oDestinationImg.bind();iSwitch.switchIt();}
function ebThumbImageNum(id)
{with(ebay.oDocument.oPage)
{descSS.stop();descSS._exec('onDisplay',id);descSS.updateCount();return false;}}
function createThumbsCells()
{imageAryIndx=this.imageAryIndx;array=this.imageArray;columns=this.columns;start=this.startIndx;end=this.endIndx;if(start==null)
start=0;if(end==null)
end=array.length;var str="";var rC=0;for(var x=start;x<end;x++)
{if(rC%columns==0&&rC!=0)
str+="</tr>";if(rC%columns==0)
str+="<tr>";if(typeof(array[x])!="undefined")
{str+='<td width=96 height=95 align="center">';str+="<a href=\"#ebayphotohosting\" title=\"Prev\" name=\"descSSthumb"+x+"\" onclick=\"ebSwitchItID(\'thumbsMotors\',"+x+");return false;\">";str+='<img name="descSSthumb'+x+'" src="'+array[x][imageAryIndx]+'" color="#CCCCCC" border="1">';str+='</a>';str+='</td>';}
rC++;}
str='<table>'+str+'</table>';return str;}
function createSuperSizeCells()
{imageAryIndx=this.imageAryIndx;array=this.imageArray;columns=this.columns;var str="";var rC=0;for(var x=0;x<array.length;x++)
{if(rC%columns==0&&rC!=0)
str+="</tr>";if(rC%columns==0)
str+="<tr>";str+='<td align="center">';str+='<img name="descSSthumb'+x+'" src="'+array[x][imageAryIndx]+'" color="#CCCCCC" border="1">';if(x==0)
{str+='<br clear="all"><a href="#ebayphotohosting" name="templateB2">View Thumbnails</a>';}
str+='</td>';rC++;}
str='<table>'+str+'</table>';return str;}
ebay.oDocument.oPage.watchItemResult=function(watchResult)
{var oD=this.parent;var c=oD.getConfig("ViewItem.WatchThisItem");var item,result,ct,str,bBidMgr,sin;for(i=0;i<watchResult.length;i++)
{item=watchResult[i]['item'];result=watchResult[i]['result'];ct=watchResult[i]['watchcount'];bBidMgr=watchResult[i]['showBidManagerLink'];sin=watchResult[i]['signin'];}
if(result==3)
{this.parent.redirect(c.sGuestWatchFullUrl);}
if(result==1||result==2)
{str=(sin==0)?c.sMsgSuccessGuest:c.sMsgSuccess;if(c.sMsgItemQuantity||c.sMsgItemsQuantity)
{str=(ct==1)?str+c.sMsgItemQuantity:str+c.sMsgItemsQuantity;str=str.replaceTokensEx("##n##",ct);}
if(ebay.oGlobals.oClient.bIE)
{var tb=new EbayToolbar(this,"toolbar",c);tb.refresh();}}
var mLyr=oD._getControl(c.aWatchLinkMiddle[1]);if(!mLyr)
mLyr=new EbayHTMLLayer(this,c.aWatchLinkMiddle[1]);mLyr.bind();if(result==4)
str=mLyr.getValue();if(result!=3)
mLyr.setValue(str);if(c.aWatchLinkTop)
{var tLyr=oD._getControl(c.aWatchLinkTop[1]);if(!tLyr)
tLyr=new EbayHTMLLayer(this,c.aWatchLinkTop[1]);tLyr.bind();if(result==4)
str=tLyr.getValue();if(result!=3)
tLyr.setValue(str);}
if(sin==0)
{var gLyr=oD._getControl(c.sGuestWatchDiv);if(!gLyr)
gLyr=new EbayHTMLLayer(this,c.sGuestWatchDiv);gLyr.bind();if(result!=4&&result!=3)
gLyr.show(true);var oAnch=new EbayHTMLAnchor(this,c.sSignInLink);var e=oAnch.getElem(c.sSignInLink);if(e&&c.sSignInUrl)
e.href=c.sSignInUrl;}
if(bBidMgr)
{var baLyr=oD._getControl(c.sBidAssistantDiv);if(!baLyr)
baLyr=new EbayHTMLLayer(this,c.sBidAssistantDiv);baLyr.bind();if(result!=4&&result!=3)
baLyr.show(true);}
var ctry=ebay.oGlobals.oEnvironment.sCountry;ctry=ctry.toUpperCase();var bStores=c.bStores;var bSeller=c.bSeller;var pn,page="WatchConfirm_";if(sin==0&&!bStores)
pn=page+"guest";if(sin==0&&bStores)
pn=page+"guest_Stores";if(sin!=0&&!bSeller&&!bStores)
pn=page+"Buyer";if(sin!=0&&!bSeller&&bStores)
pn=page+"BuyerStores";if(sin!=0&&bSeller&&!bStores)
pn=page+"Seller";if(sin!=0&&bSeller&&bStores)
pn=page+"SellerStores";if(typeof(pageName)!="undefined"&&typeof(ssDoRequest)!="undefined")
{var sc=oD._getControl("siteCatalyst");var scTmp=sc.sPageName;var tmp=pageName;pageName=ctry+";;"+pn;sc.sPageName=pageName;sc.eventsWatchConfirm();sc.propertyReportsViewItem();s_prop8=sc.readCookie("ssFND2")+";WAT";s_eVar10=ctry+";;"+c.ssPageName+ctry;sc.cookiesSearchListingsViewItemWrite();s_prop18=pageName+";"+c.ssPageName+ctry;sc.cookiesLastListWrite();sc.biboSetProp21();s_prop22=s_prop26=pageName;sc.propertyReportsError();sc.propertyReportsWatchConfirm();sc.propertyReportsHomepage();sc.propertyReportsPaypalRegistration();ssDoRequest();pageName=tmp;sc.sPageName=scTmp;}}
ebay.oDocument.oPage.showCounter=function(vicResponse)
{var oD=this.parent;var c=oD.getConfig("ViewItem.Counter");var result,ct,lyr;for(i=0;i<vicResponse.length;i++)
{result=vicResponse[i].result;ct=vicResponse[i].vicount;}
if(result!=0&&ct!=-1)
{if(ct<10)
ct="0000"+ct;if(ct<100&&ct>=10)
ct="000"+ct;if(ct<1000&&ct>=100)
ct="00"+ct;if(ct<10000&&ct>=1000)
ct="0"+ct;for(var x in c.aCounterDivIds)
{lyr=new EbayHTMLLayer(this,c.aCounterDivIds[x]);lyr.bind();lyr.setValue(ct);}}}
function Localize(s){return s;}

//35@@m2

function EbayPrefetch(pParent,pName)
{if(!this.objType)
this.objType="EbayPrefetch";this.base=EbayBaseControl;this.base(pParent,pName);this.iTimeout=3000;this.aList=[];this.load=function(pPath)
{this.aList[this.aList.length]=pPath;}
this.init=function()
{var a=this.aList,s='';for(var i=0;i<a.length;i++)
{s+='<scr'+'ipt id="'+this.name+'_'+i+'" type="text/x-ebayScript"></'+'script>';}
this.oDocument.write(s);}
this.fetch=function()
{var oClient=ebay.oGlobals.oClient;if(oClient&&oClient.bWin)
{var a=this.aList,nm,cnt=1;var elem=this.oDocument.getUIElem(this.name+"_0");if(elem&&a.length>0)
elem.src=a[0];for(var i=1;i<a.length;i++)
{nm=this.name+"_"+i;elem=this.oDocument.getUIElem(nm);if(elem&&a[i])
{setTimeout('ebay.oDocument.getUIElem("'+nm+'").src = "'+a[i]+'"',cnt*this.iTimeout);cnt++;}}}}
var e=this.oDocument._getEvent("footer");if(e)
this._registerListener(e,this.EVENT_AFTER,"init");this._registerListener(this.oDocument._getEvent("load"),this.EVENT_AFTER,"fetch");}
ebay.oUtils.oPrefetch=new EbayPrefetch(ebay.oUtils,"Prefetch_JS_Files");

//36@@m1

String.prototype.hasAllInArray=function(pArray)
{var l=pArray.length;for(var i=0;i<l;i++)
{if(!this.hasArg(pArray[i]))
return false;}
return true;}

//37@@m11

function EbayBACException(pParent,pString,pFullString)
{if(!this.objType)
this.objType="EbayBACException";this.base=EbayObject;this.base(pParent,"BAC Exception");this.sString=pString;this.sFullString=pFullString;}
function EbayBlockActiveContent(pParent,pName,pCfg)
{if(!this.objType)
this.objType="EbayBlockActiveContent";this.base=EbayBaseControl;this.base(pParent,pName);this.sDocWrite='';this.aExceptions=[];this.iVersion=0;this.oConfig=pCfg||null;this.aAllowed=pCfg.aCustomStrings||["blockActiveContent","EbayBlockActiveContent","open\\s*\\(","createPopup\\s*\\(","ookie\\s*\\(","\\.\\s*cookie","\\.\\s*location\\s*[=.]","replace\\s*\\(","onerror","<iframe","<ilayer","<frameset","eval\\s*\\(","standardWrite","standardCreateElement","writePersonalHeader"];var ih=ebay.oGlobals.oEnvironment.sIncludeHost;this.aAllowedTags=pCfg.aTags||[["script","src",ih],["base","href"],["meta","refresh"],["frame","src",ih]];this.aAllowedElements=pCfg.aElements||["frame","script","layer"];this.addException=function(pStr,pFullString)
{with(this)
aExceptions[aExceptions.length]=new EbayBACException(this,pStr,pFullString);}
this.hasBlockedString=function(pStr)
{var b=this.aAllowed,len=b.length,rv=false,re;pStr=pStr.toLowerCase();for(var i=0;i<len&&!rv;i++)
{re=new RegExp(b[i].toLowerCase());rv=re.test(pStr);}
return rv;}
this.checkTagAndAttribute=function(pStr,pData)
{var tagRegExp=new RegExp("<"+pData[0]+"\\s");var attrRegExp=new RegExp("\\s*"+pData[1]+"\\s*="),attrInd;var str=tstr=pStr,tagInd=str.search(tagRegExp),exInd,qInd,bInd,rv=false;while(tagInd>-1)
{str=str.substr(tagInd+1);attrInd=str.search(attrRegExp);exInd=pData[2]?str.indexOf(pData[2],attrInd):-1;bInd=str.indexOf('>');if(attrInd>bInd)
{qInd=tstr.indexOf('\"');while((attrInd>bInd)&&(bInd!=-1)&&(qInd!=-1)&&(qInd<attrInd))
{tstr=tstr.substr(qInd+1);qInd=tstr.indexOf('\"');bInd=tstr.indexOf('>');}}
if(bInd==-1)
bInd=str.length;tagInd=str.search(tagRegExp);if((attrInd>-1)&&(bInd>attrInd)&&((exInd==-1)||(exInd>bInd)))
{rv=true;tagInd=-1;}}
return rv;}
this.hasTagAndAttribute=function(pStr)
{var ta=this.aAllowedTags;var rv=false,len=ta.length;for(var i=0;i<len&&!rv;i++)
rv=this.checkTagAndAttribute(pStr,ta[i]);return rv;}
this.blockString=function(pStr)
{with(this)
{var s=sDocWrite+pStr;var rv=(hasBlockedString(s)||hasTagAndAttribute(s));if(!rv)
{var a=oConfig.aFixedStrings||["<","<s","<sc","<scr","<scri","<scrip"];for(var i=0;i<a.length;i++)
{if(pStr.toLowerCase()==(a[i]))
return true;}}
sDocWrite+=rv?'':pStr;return rv;}}
this.doDocWrite=function(pStr,pWriteln)
{var ctl=ebay.oDocument._getControl("blockActiveContent");var fdws=ctl.sDocWrite;if(window.event)ctl.addException(pStr);else if(ctl.blockString(pStr))ctl.addException(pStr,fdws+pStr);else if(pWriteln)document.standardWriteln(pStr);else document.standardWrite(pStr);}
document.standardWrite=document.write;this.documentWrite=function(pStr)
{ebay.oDocument._getControl("blockActiveContent").doDocWrite(pStr);}
document.standardWriteln=document.writeln;this.documentWriteln=function(pStr)
{ebay.oDocument._getControl("blockActiveContent").doDocWrite(pStr,true);}
document.standardCreateElement=document.createElement;this.createElement=function(pStr)
{var ctl=ebay.oDocument._getControl("blockActiveContent"),b=ctl.aAllowedElements,tmp='pStr.hasAny(';for(var i=0;i<b.length;i++)
tmp+=(i<b.length-1)?'b['+i+'],':'b['+i+']';if(eval(tmp+')'))
ctl.addException(pStr,"document.createElement");else
return document.standardCreateElement(pStr);}}
ebay.oDocument.createBlockActiveContent=function()
{var g=this.parent.oGlobals,cl=g.oClient,e=g.oEnvironment,cfg=ebay.oDocument.getBACConfig(),v=cfg.iBACVersion,path="";if(!(cl.bMac&&cl.bIE))
{var c=new EbayBlockActiveContent(this,"blockActiveContent",cfg);if(typeof(v)!='undefined'&&(v!=c.iVersion))
{path=e.sIncludeDir+"features/block_active_content/filter_"+v+".js";var tag='<sc'+'ript src="'+path+'"> </sc'+'ript>';this.write(tag);}
document.write=c.documentWrite;document.writeln=c.documentWriteln;document.createElement=c.createElement;}
this._registerListener(this._getEvent("load"),this.EVENT_AFTER,"checkBlockActiveContent");}
ebay.oDocument.getBACConfig=function()
{var s="ViewItem.BlockActiveContent";var c=ebay.oDocument.getConfig(s)||new EbayConfig(s);return c;}
ebay.oDocument.checkBlockActiveContent=function()
{var aa=[],ee,ss,ih,ct,oD=this.doc,i,j,k,tt=["div","span"],cfg=this.getBACConfig(),aLayerStrings=cfg.aLayerStrings||[[["href","mailto:"],["position: absolute;","z-index: 1;"]]];for(var j=0;j<tt.length;j++)
{t=tt[j];if(oD.getElementsByTagName)
aa=oD.getElementsByTagName(t);else if(oD.all)
aa=oD.all;for(i=0;i<aa.length;i++)
{ee=aa[i];if(ee.tagName.toLowerCase()==t.toLowerCase())
{ih=ee.innerHTML;if(ih)
{ih=ih.toLowerCase();ct=ee.style.cssText.toLowerCase();for(k=0;k<aLayerStrings.length;k++)
{var a=aLayerStrings[k];if(ih.hasAllInArray(a[0])&&ct.hasAllInArray(a[1]))
{ee.innerHTML='<img src="http://pics.ebaystatic.com/aw/pics/s.gif" id="imgBlockActiveContent">';break;}}}}}}}
ebay.oDocument.createBlockActiveContent();

//38@@m4

function ebDowngradeDomainTo()
{var dd=document.domain,i=dd.indexOf(".ebay."),qs;if(i!=-1)
{dd=dd.substr(i+1);qs=unescape(document.location.search);if((i=qs.indexOf("downgradeDomainTo="))>-1)
dd=qs.substring(i+18,qs.indexOf(dd)+dd.length);if(document.domain!=dd||!document.all)
document.domain=new String(dd);}}
ebDowngradeDomainTo();

//39@@m3

ebay.oDocument.doc.onclick=function(e)
{var c=ebay.oDocument.getConfig("MyeBay.Tracking");if(c)
{ebay.oDocument.oPage.MyeBayDDTracking(e);}}
ebay.oDocument.oPage.MyeBayDDTracking=function(e)
{var pEvent=window.event?window.event:e;var elem=pEvent.srcElement||pEvent.target;if(elem==null||elem==undefined){return;}
var c=ebay.oDocument.getConfig("MyeBay.Tracking");if(c)
{var paramVal=elem.getAttribute(c.sParamVal);if(paramVal==null||paramVal==undefined||paramVal==""){return;}
var paramName=c.sParamName;}
var sUrl=elem.href;if((sUrl.charAt(sUrl.length-1)=="/"||sUrl.charAt(sUrl.length-1)=="l"||sUrl.charAt(sUrl.length-1)=="m"||sUrl.indexOf('&')==-1)&&sUrl.indexOf('?')==-1)
{elem.href=elem.href+"?"+paramName+"="+paramVal;}
else
elem.href=elem.href+"&"+paramName+"="+paramVal;}
// b=6037610 -->