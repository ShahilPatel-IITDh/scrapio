var CLASS_FILED_CONTAINER = 'fieldset';
var CLASS_HELP_MESSAGE = '.help-msg';
var CLASS_ERROR = 'error';
var LOADING_DIV="__loadingScreenDiv";
var ELEMENT_LOADING_DIV="#"+LOADING_DIV;
var ERROR_MSG_TEMPLATE='<div style="display:none" class="help-msg error"></div>';
var errorMessageType = '';
var EBANKING_SESSION_STORAGE_ITEM="ebanking:session_token";
var EBANKING_SESSION_STORAGE_OFFERDATA="offerQuery";
var EBANKING_SESSION_STORAGE_CLIENT_TYPE="client_type";
var EBANKING_SESSION_STORAGE_BRAND="brand";
var EBANKING_SESSION_STORAGE_LOCALE="locale";
var EBANKING_SESSION_STORAGE_SEGMENT="segment";
function get_ajax_loading_template() {
var lang = $("body").attr('lang');
var altText=lang=='fr'?"Chargement en cours":"Page loading";
return '<div id="'+LOADING_DIV+'" class="ajax-overlay" aria-live="assertive">'+
'<div class="ajax-overlay-background"></div>'+
'<img src="doc/images/common/loading.gif?l='+lang+'" class="ajax-overlay-spinner" tabindex="-1" alt="'+altText+'">' +
'</div>';
}
function clearFieldErrors() {
$(CLASS_FILED_CONTAINER).removeClass(CLASS_ERROR);
$(CLASS_HELP_MESSAGE).hide();
}
function showFieldError(fieldId, message, messageType, scrollTo) {
errorMessageType = messageType;
var fieldElement = "[data-id='" + fieldId + "']";
var container = $(fieldElement).closest(CLASS_FILED_CONTAINER);
if( container.length==0) {
fieldElement = "#" + fieldId;
container = $(fieldElement).closest(CLASS_FILED_CONTAINER);
}
if( container.length==0 ) { 

return false;
}
var msgField = container.find(CLASS_HELP_MESSAGE).eq(0);
if( msgField.length==0 ) {
container.append(ERROR_MSG_TEMPLATE);
msgField = container.find(CLASS_HELP_MESSAGE).eq(0);
}
container.addClass(CLASS_ERROR);
msgField.empty();
msgField.append(message);
msgField.show();
if(scrollTo)
MP.scrollTo({item: fieldElement}); 
}
function scrollToGlobalError() {
MP.scrollTo({item: '.global-error-from-container'}); 
}
var __show_busy_ind_always=false;
var ajaxInProgress = false;
$(document).ready( function() {
if( $(ELEMENT_LOADING_DIV).length==0 ) {
$(get_ajax_loading_template())
.on('click', function(e) { e.preventDefault(); })
.appendTo('body');
$(ELEMENT_LOADING_DIV).on('click', function(e) { e.preventDefault(); })
}
});
function ajax_before(attrs) {
};
function ajax_precondition(attrs) {
return !ajaxInProgress;
};
function ajax_before_send(attrs, jqXHR, settings) {
ajaxInProgress = true;
};
function ajax_after(attrs) {
};
function ajax_complete( attrs, jqXHR, textStatus) {
ajaxInProgress = false;
if(__show_busy_ind_always == true) { 
$(ELEMENT_LOADING_DIV).show();
MP.scrollTo({item:'.ajax-overlay-spinner'});
}
}

 
$(window).on('unload', function () { 
});
$(window).bind("pageshow", function(event) {
if (event.originalEvent && event.originalEvent.persisted) {
window.location.reload(); 
}
});
function createEBankingSession( eBankingSessionId ) {
var currentSessionId = JSON.parse( sessionStorage.getItem(EBANKING_SESSION_STORAGE_ITEM) );
if( eBankingSessionId != currentSessionId )
sessionStorage.setItem(EBANKING_SESSION_STORAGE_ITEM, JSON.stringify(eBankingSessionId));
} 
function destroyEBankingSession() {
sessionStorage.removeItem(EBANKING_SESSION_STORAGE_ITEM);
}
function createSessionStorageForOffer(offerQuery){
sessionStorage.setItem(EBANKING_SESSION_STORAGE_OFFERDATA, offerQuery);
}
function createSessionStorageForClientType(clientType){
sessionStorage.setItem(EBANKING_SESSION_STORAGE_CLIENT_TYPE, clientType);
}
function createSessionStorageForLocale(locale){
sessionStorage.setItem(EBANKING_SESSION_STORAGE_LOCALE, locale);
}
function createSessionStorageForBrand(brand){
sessionStorage.setItem(EBANKING_SESSION_STORAGE_BRAND,brand);
}
function createSessionStorageForSegment(segment){
sessionStorage.setItem(EBANKING_SESSION_STORAGE_SEGMENT,segment);
}
function destroyEBankingSessionSegment() {
sessionStorage.removeItem(EBANKING_SESSION_STORAGE_SEGMENT);
}
