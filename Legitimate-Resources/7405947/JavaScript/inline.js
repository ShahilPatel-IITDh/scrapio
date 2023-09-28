ZFLive.encodedString = "";



ZFLive.mode = "live"; 


// While rendering private form, ZFLive.mode="live". While rendering saved private/public form, ZFLive.mode="savedRecord". While rendering responseEdit private/public form, ZFLive.mode="edit".
$(document).ready(function(){
// Matrix_Freeze Changes
if(true) {
makeRowSticky();
}
// Matrix_Freeze Changes

if($("#bgLiveDisabledDiv").length > 0){ // loading gif, which is added for defer page load.
$("#bgLiveDisabledDiv").fadeOut(function(){
$(this).remove();
});
}

// Sometimes "User-Agent" won't be present in the Request header.

var userAgent = "python\x2Drequests\x2F2.31.0";
if(userAgent.indexOf("Mobile")!=-1){
if(window.top.location != window.self.location){
$("#deviceCont").hide();
}
//This is captured for save and resume popup placement.
ZFLive.isReqFromMobile = true;
}

ZFLive.noresultsfound = 'No\x20results\x20found.';

/*
Old forms have backgroundsecbg with padding:30px in custom.css . Now changed padding to templateWidth class.
Old Users have form width of 800px will change to 740px because of 30px padding on left and right of form.
Hence to differentiate old and new forms, .newThemeDummyWidth class is used.
This calculation is not needed for mobile view.
*/
var customCssStr = $("#CUSTOM_STYLE_TAG").text();
ZFLive.sfdpdTemplate = "default";
ZFLive.dpdTemplate = "default";
if(ZFLive.isReqFromMobile == false && customCssStr.indexOf(".newThemeDummyWidth") == -1) {
var formElem = $(".templateWidth");
var computedWidth = parseInt($(formElem).outerWidth()) + 60;
if(window.top.location != window.self.location) {
/*
If form is embedded, for iframe size less than 768px media query will be applied. Hence computed width should not be applied.
For iframe size greater than 768px , apply the computed width.
*/
var iframeWidth;
if(document.body.getBoundingClientRect().width) { //For all browsers
iframeWidth = document.body.getBoundingClientRect().width;
}else if(document.body.offsetWidth) { //For IE
iframeWidth = document.body.offsetWidth;
}
if(iframeWidth > 768) {
$(formElem).css("width",computedWidth + "px"); // No I18N
}
}else {
/*
For private form and perma form apply the computed width
*/
$(formElem).css("width",computedWidth + "px"); // No I18N
}
}
setCustomDropdown();

// On document load, the field width inside subform is changed based on for width
var firstPageUl = $("#formDiv").find("ul[elname=formBodyULName][page_no=1]");
setWidthForSFElem(firstPageUl);
setWidthForCurrencySymbolInSubForm(firstPageUl);
initializeSFSummary();

if(isMobileBrowser()){
$("#formDiv").find("li[comptype=32]").each(function(i,eachli){
$(eachli).find("a[elname=webCamera]").hide();
$(eachli).find("div[elname=checkCamera]").addClass("onlyUpload");
});
$("#formDiv").find("li[comptype=35]").each(function(i,eachli){
if($(eachli).attr('media_type')==3){
$(eachli).find("a[elname=mediaRecorder]").hide();
}  
});
}
else if( window.top.location !== window.self.location ){
var cameraaccess=false;
if(!cameraaccess){
$("#formDiv").find("li[comptype=32]").each(function(i,eachli){
$(eachli).find("a[elname=webCamera]").hide();
});
}
}
ZFLive.csrf = 'null';
ZFLive.accountsUrl = "https://accounts.zoho.com";
ZFLive.recID = "";
ZFLive.formID = "346466000000250066";
ZFLive.skipValidation = false
ZFLive.isSaveReq = false;
ZFLive.isFormAdmin=false; 
ZFLive.paymentMerchantList = null;
ZFLive.authNetApiLoginID = '';
ZFLive.authNetPublicClientKey = '';
ZFLive.captchaType ="0";
ZFLive.gsiteKey ="null";
ZFLive.gtheme ="light";
ZFLive.isLargeFileUploadForm = false; 
ZFLive.isLargeFileSizeAllowed = false; 
//Code for formula field
ZFLive.formulaJson = null;

ZFLive.formulaJson = '\x5B\x5D';

ZFLive.constraintJson;

ZFLive.constraintJson = JSON.parse('\x7B\x22MultiLine\x22\x3A\x7B\x22min_len\x22\x3A0,\x22show_word_count\x22\x3Afalse,\x22range_type\x22\x3A1,\x22max_len\x22\x3A65535\x7D,\x22SingleLine1\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine2\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine3\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22MultiLine1\x22\x3A\x7B\x22min_len\x22\x3A0,\x22show_word_count\x22\x3Afalse,\x22range_type\x22\x3A1,\x22max_len\x22\x3A65535\x7D,\x22SingleLine19\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine4\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine15\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine16\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine17\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D,\x22SingleLine18\x22\x3A\x7B\x22min_len\x22\x3A0,\x22pattern\x22\x3A\x7B\x7D,\x22range_type\x22\x3A1,\x22max_len\x22\x3A255\x7D\x7D');

ZFLive.dateConstraintJson;

ZFLive.dateConstraintJson = JSON.parse('\x7B\x7D');

ZFLive.sfUniqueJson = JSON.parse('\x7B\x7D');
ZFLive.currentDate;

ZFLive.currentDate = '06-Aug-2023 09:13 PM';

ZFLive.pastDate;

ZFLive.pastDate = '05-Aug-2023 11:59 PM';

ZFLive.futureDate;

ZFLive.futureDate = '07-Aug-2023 12:00 AM';

ZFLive.isDateTimeAdvPropsEnabled = true;
ZFLive.formulaCurrentDate;

ZFLive.formulaCurrentDate = '06-Aug-2023 09:13 PM';

ZFLive.formulaCurrentDateddmmyyyyhhmm;

ZFLive.formulaCurrentDateddmmyyyyhhmm = '06-08-2023 09:13';

ZFLive.formulaFieldsList = null;

ZFLive.formulaFieldsList = '\x5B\x5D';
ZFLive.bindEventForFormula(); 
ZFLive.prefillFieldsList = undefined;

ZFLive.prefillFieldsList = '\x5B\x5D';

// Zoho CRM field
// Focussing Zoho CRM field needs to be done. In order to call the method focusZohoCrmField(), ZFCrmLive is initialized here.
// "*/form/*/formperma/*" - GET - Public form - zohoCrmFieldPropsJson=NULL, even if Zoho CRM field is present. For public form too, ZFCrmLive needs to be initialized as mandatory testing needs to be done if Zoho CRM field is present. Public Edit response, Public saved form are similar to that of Public form, that is zohoCrmFieldPropsJson=NULL.
// GET - Private form, GET - Private saved form - zohoCrmFieldPropsJson is not NULL. {} if Zoho CRM field is not present.
ZFCrmLive.zfCrmLive = new ZFCrmLive();
// CRM module API names, CRM data types, CRM field API names, Form field link names are only received. So, no output encoding is added.
ZFCrmLive.zfCrmLive.zohoCrmFieldPropsJson = {};
//To differentiate normal form and embedded form for splash message.
ZFLive.isEmbedded = true;
// Focussing of first field must not be done, if the form is embedded in some other site.
if(window.top.location === window.self.location) {
ZFLive.isEmbedded = false;
focusFirstLiElemOnLoad();
//Only for private,shared,perma form geolocation will be captured. But not for Embedded forms.

}
disableButtonNotNeeded();

$('form[name=test]').find('input, select').keypress(function(e){
if ( e.which == 13 ) // Enter key = keycode 13
{
// preventDefault action is done so that submit action for form is not getting called automatically.
e.preventDefault();
var fldLiElem = $(this).closest("li[elname=\"livefield-elem\"]"); // No I18N
//If form is submitted by pressing ENTER, splash message is displayed over current focus element.
ZFLive.currentFocusElem = fldLiElem;
var fldCompType = parseInt($(fldLiElem).attr("comptype")); // No I18N
/* If livefield-elem <li>is not present, then fldCompType=NaN and submission of form happens.
If 'comptype' attribute is not present, then fldCompType=NaN and submission of form happens.
*/
if(fldCompType !== ZFFieldTypeConstants.ZOHO_CRM) { // When 'Enter' key is pressed in Zoho CRM field, the form must not be submitted.
var pageCount = $("#formBodyDiv").find('ul[elname=formBodyULName]').length;
var pageNum = $(this).closest('ul[elname=formBodyULName]').attr('page_no'); // No I18N
if(pageCount != pageNum){
$("#formRedirectURL").find('ul[elname=footer][page_no='+pageNum+']').find('button[elname=next]').click();
// Focussing of first field is done in the 'click' action of Next button.
}else{

if($('button[elname="submit"]').prop("disabled") != true){
$('form[name=test]').find("button[elname=submit]")[0].click();
}

}
} // comptype 'if' block ends. // No I18N
}
});
$('form[name=test]').find("button[elname=submit]").click(function(e) { 
e.preventDefault();
if(uploadObjects.length == 0){

var merchantType = $("#test").find("div[elname=merchantDiv]").attr("merchantType"); // No I18N
if(merchantType != null ){
performPaymentAndSubmitData(merchantType);
} else {
//Event is needed to differentiate whether form submitted by click or by pressing ENTER for displaying Splash Message.
ZFLive.currEvent = e;
ZFLive.ValidateAndSubmitData();
}
} else {
var errorObj = ZFLive.validateForm(Mode.LIVE, true);
if (errorObj.length == 0) {
if (uploadObjects.length == 0) {
$(this).trigger('click');    // No I18N
} else {
ZFLive.submitButtonClicked = true;
ZFLive.actionBtn = this;
$("#pleaseWait_Div").show();
setPopUpElemPosition($("#pleaseWait_DivCont")); // No I18N
}
} else {
showError(errorObj);
resetCaptcha();
}
}
});
$('form[name=test]').find("button[elname=update]").click(function(e) { 
e.preventDefault();
if(uploadObjects.length == 0){

$('form[name=test]').find("button[elname=update]").attr("recordLinkID","");// No I18N
ZFLive.ValidateAndUpdateDataForLiveEdit();
} else {
var errorObj = ZFLive.validateForm(true);
if (errorObj.length == 0) {
if (uploadObjects.length == 0) {
$(this).trigger('click');    // No I18N
} else {
ZFLive.submitButtonClicked = true;
ZFLive.actionBtn = this;
$("#pleaseWait_Div").show();
setPopUpElemPosition($("#pleaseWait_DivCont")); // No I18N
}
} else {
showError(errorObj);
resetCaptcha();
}
}
});
$('form[name=test]').find("button[elname=back],button[elname=next],button[elname=save],button[elname=submit],button[elname=update],button[elname=review]").mousedown(function(e){
if(!isIELessThan9() && typeof ZFLive.constraintJson !== ResponseKey.UNDEFINED){
e.preventDefault();
}
});
$('form[name=test]').find("button[elname=save]").click(function(e) { 
e.preventDefault();
if(uploadObjects.length == 0){

$('form[name=test]').find("button[elname=save]").attr("recordLinkID","");// No I18N
ZFLive.ValidateAndSaveData();
} else {
ZFLive.isUploadSaveValidate = true;
var errorObj = ZFLive.validateForm(Mode.LIVE, false);
if (errorObj.length == 0) {
if(uploadObjects.length == 0){
$(this).trigger('click');    // No I18N
} else {
ZFLive.submitButtonClicked = true;
ZFLive.actionBtn = this;
// $("#savingDiv").show();
$("#plainLoading").show();
setPopUpElemPosition($("#plainLoadingCont")); // No I18N
}
} else {
showError(errorObj);
resetCaptcha();
}
}
});
ZFLive.ShowPageTitle;
$('form[name=test]').find("button[elname=review]").click(function(e) { 
e.preventDefault();
if(uploadObjects.length == 0){
ZFLive.ShowPageTitle = 1
ZFLive.reviewType = 1
ZFLive.reviewData();
} else {
if(uploadObjects.length == 0){
$(this).trigger('click');    // No I18N
} else {
ZFLive.submitButtonClicked = true;
ZFLive.actionBtn = this;
$("#reviewLoad_Div").show();
setPopUpElemPosition($("#reviewLoad_DivCont")); // No I18N
}
}
ZFLive.disableReviewBtn();
});

// For Forms saved with Custom Theme.
addCustomCSSStyles();

// checkAlign();
ZFLive.bindChangeToAddrFldAndCheckStatesListExistOnLoad();

if(ZFLive.formulaJson != null){
// Formula will be calculated even when rules are not present, as it has to be calculated with initial value or prefil values.
// Formula calculation should be inside Document.ready, as ZFLive.formulaJson will be initialzed within it.
ZFLive.evalExpressionOnFormLoad();
}
triggerFormResize();

ZFLive.preevalPrefillFldLabelOnLoad();
preventCutCopyPasteInEmailReconf();
preventCutCopyPasteInPhoneReconf();
});
ZFLive.isSalesIQIntegrationEnabled = false;
ZFLive.isPageSenseIntegrationEnabled = false;
ZFLive.salesIQFieldsArray = null;
// Field rules
zf_rule = new ZFRule();
zfPageRule = new ZFPageRule();

if(typeof ZFGTMUtil == "function"){
gtm = new ZFGTMUtil();
ZFGTMUtil.gtmJSON={};
gtm.bindGTMEvents();
}