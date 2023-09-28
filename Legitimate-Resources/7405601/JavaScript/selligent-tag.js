
function selligent_initialiser() {
window.wa = document.createElement("script"),
wa_s = document.getElementsByTagName("script")[0];
window.wa.src = "https://targetemsecure.blob.core.windows.net/138526d1-8ff9-4de4-b84a-3a11ec020ede/138526d18ff94de4b84a3a11ec020ede_1.js";
window.wa.type = "text/javascript";
wa_s.parentNode.insertBefore(wa, wa_s);
window.wa.bt_queue = [];
const properties = window.ffte?.properties;
let vertical_subsection_tags = {};
let tags = {};
if(properties) {
vertical_subsection_tags = properties.articleCategoryHandle.map(category => {
return { "tag": "VERTICAL_SUB_SECTION", "value": category }
});
tags = properties.articleTagHandle.map(tag => {
return { "tag": "TAGS", "value": tag }
});
}
window.wa.afterInit = function(){
window.wa.bt_queue.push({
"customIdentifier": "",
"async": true,
"isEvent": false,
"isTargeting": true,
"tagValues":[
{ "tag": "CATEGORY", "value": window.ffte.properties?.articleVertical || '' },
...vertical_subsection_tags,
...tags,
{ "tag": "FEP_PRODUCTS", "value": window.fepPrimaryProduct },
{ "tag": "FEP_PRODUCTS", "value": window.fepSecondaryProducts }
],
"exposedFields": [
{ "field": "Number_of_hits_in_the_last_day" },
{ "field": "Average_time__minutes__per_visit" }
]
});
}
}
window.vanilla.featureFlags.selligent.enabled && window.reliablePageLoad.then(function(){
reliableConsentGiven.then(function (consentResponse) {
if (consentResponse.consent && consentResponse.consent.gdprApplies) {
// for Sourcepoint
if (window._sp_) {
__tcfapi('getCustomVendorConsents', 2, function (consent, success) {
var selligentID = '618d115d5c485f079ca75e9e';
// Purposes for selligent = 5, 6, 8, 10
var purposes = consentResponse.consent.purpose.consents;
var relevantPurposes = [purposes[5], purposes[6], purposes[8], purposes[10]];
var consentForPurposes = relevantPurposes.every((purpose) => purpose);
if (consent.consentedVendors.find(e => e._id === selligentID) && consentForPurposes){
selligent_initialiser();
}
});
}
}
});
ccpaAppliesPromise.then(function (ccpaApplies) {
if (ccpaApplies) {
selligent_initialiser();
}
});
});
