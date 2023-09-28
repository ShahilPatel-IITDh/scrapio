const chatData = JSON.parse(decodeURIComponent(document.getElementById('chatData').dataset.chat));
if (chatData.error) {
	console.log(chatData.message);
}
const chatJSON = chatData.chatJSON;

var sfButtonID = chatJSON.sfButtonId;
var sfStoreID = chatJSON.sfStoreId;
var STORES_ID = chatJSON.storeId;

var initESW = function(gslbBaseURL) {
    embedded_svc.settings.displayHelpButton = true;
    embedded_svc.settings.language = '';
    embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
        if(prechatFormData[3].value === 'An existing order'){
            return '5733a000000Cniz';
        }

        return sfButtonID;
    }

    embedded_svc.settings.extraPrechatInfo = [{
        "entityName": "Contact",
        "showOnCreate": false,
        "saveToTranscript":"",
        "entityFieldMaps": [{
            "isExactMatch": true,
            "fieldName": "FirstName",
            "doCreate": false,
            "doFind": false,
            "label": "First Name"
        }, {
            "isExactMatch": true,
            "fieldName": "LastName",
            "doCreate": false,
            "doFind": false,
            "label": "Last Name"
        }, {
            "isExactMatch": true,
            "fieldName": "Email",
            "doCreate": false,
            "doFind": false,
            "label": "Email"
        }]
        }, {
        "entityName": "Case",
        "entityFieldMaps": [{
            "isExactMatch": false,
            "fieldName": "Contact_Reason__c",
            "doCreate": false,
            "doFind": false,
            "label": "I need help with:"
        }, {
            "isExactMatch": false,
            "fieldName": "Order_No__c",
            "doCreate": false,
            "doFind": false,
            "label": "Order No."
        }]
        }, {
        "entityName": "Order",
        "saveToTranscript" : "Order__c",
        "entityFieldMaps": [{
            "isExactMatch": true,
            "fieldName": "Name",
            "doCreate": false,
            "doFind": true,
            "label": "Order No."
        }]
        }, {
        "entityName" : "Account",
        "showOnCreate" : true,
        "saveToTranscript" : "AccountId",
        "entityFieldMaps": [{
            "isExactMatch": true,
            "fieldName": "LastName",
            "doCreate": true,
            "doFind": false,
            "label": "Last Name"
        },{
            "isExactMatch": false,
            "fieldName": "FirstName",
            "doCreate": true,
            "doFind": false,
            "label": "First Name"
        },{
            "isExactMatch": true,
            "fieldName": "PersonEmail",
            "doCreate": true,
            "doFind": true,
            "label": "Email"
        },{
            "isExactMatch": false,
            "fieldName": "RecordTypeId",
            "doCreate": true,
            "doFind": false,
            "label": "RecordTypeId"
        }]
    }];
    embedded_svc.settings.extraPrechatFormDetails = [{
            "label": "RecordTypeId",
            "value": "012j0000000hgOHAAY",
            "displayToAgent": false
        }, {
            "label":"Order No.",
            "transcriptFields": ["Order_Number__c"]
        }, {
            "label":"I need help with:",
            "transcriptFields": ["Chat_Reason__c"]
        }, {
            "label": "StoreId",
            "value": sfStoreID,
            "displayToAgent": false,
            "transcriptFields": ["Store__c"]
        }];


    embedded_svc.settings.prechatBackgroundImgURL = 'https://www.powerequipmentdirect.com/images/experts/livechat-prechat-bg-'+STORES_ID+'.png';
    embedded_svc.settings.avatarImgURL = 'https://www.powerequipmentdirect.com/images/experts/livechat-avatar-'+STORES_ID+'.png';
    embedded_svc.settings.headerBackgroundURL = 'https://www.powerequipmentdirect.com/images/experts/livechat-header-bg-'+STORES_ID+'.png';
    embedded_svc.settings.disabledMinimizedText = 'Live Chat Offline';
    embedded_svc.settings.enabledFeatures = ['LiveAgent'];
    embedded_svc.settings.entryFeature = 'LiveAgent';
    embedded_svc.init(
        'https://pedstores.my.salesforce.com',
        'https://powerequipmentdirect.force.com',
        gslbBaseURL,
        '00Dj0000001o1iM',
        'PEDAgents',
        {
            baseLiveAgentContentURL: 'https://c.la3-c1-phx.salesforceliveagent.com/content',
            deploymentId: '572f1000000k9di',
            buttonId: sfButtonID,
            baseLiveAgentURL: 'https://d.la3-c1-phx.salesforceliveagent.com/chat',
            eswLiveAgentDevName: 'SBDAgents',
            isOfflineSupportEnabled: false
        }
    );
};

if (!window.embedded_svc) {
    var s = document.createElement('script');
    s.setAttribute('src', 'https://pedstores.my.salesforce.com/embeddedservice/5.0/esw.min.js');
    s.onload = function() {
        initESW(null);
    };
    document.body.appendChild(s);
} else {
    initESW('https://service.force.com');
}

// Live Chat stylesheet gets appended after our own, making custom styles not work
// this event detects when it gets created and moves it above our own
// so our custom styles will apply
const moveSalesforceStyles = function(event){
    // get reference to inserted object
    const salesforceStyleSheet = event.target;
    // check if object has href attribute
    if(salesforceStyleSheet.href){
        // check if href is the stylesheet we want
        if(salesforceStyleSheet.href.indexOf('esw.min.css') > 0){
            // first remove the event listener so moving the script doesn't cause recursion
            document.head.removeEventListener('DOMNodeInserted', moveSalesforceStyles);
            // determine the first stylesheet in our document
            const firstLink = document.querySelector('head > link');
            // move the live chat stylesheet above our first loaded CSS file
            document.head.insertBefore(salesforceStyleSheet, firstLink);
        }
    }
}
// add our event listener to the head
document.head.addEventListener('DOMNodeInserted', moveSalesforceStyles);
