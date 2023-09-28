
var acicActionType = false;
P.when('auth-validate-form-handler', "acic-component", "ready").execute('acic-setup', function(AuthValidateFormHandler) {
    var aautTargetForm = document.querySelector('form[name="signIn"]');
    if (aautTargetForm) {
        setAAToken("000-0000000-0000000-" + Date.now(), aautTargetForm);
        if ((typeof acic !== 'undefined') && (acic != null)) {
            acic.setupACIC({
                "data-mode": "1", 
                "data-ref-id": "ap",
                "data-context": getClientContext(aautTargetForm),
                "data-callback": function(data) {
                    if (data.sessionToken) {
                        setAAToken(data.sessionToken, aautTargetForm);
                    }
                    if (data.actionType && data.actionType !== "PASS") {
                        acicActionType = true;
                    }
                },
                "data-host-config": "prod.USAmazon",
                "data-event-trigger": "PageLoad",
            });
        }

        var submitInputs = aautTargetForm.querySelectorAll('input[type="submit"]');
        if (submitInputs && submitInputs.length === 1) {
            var submitInput = submitInputs[0];
            submitInput.addEventListener("click", function(event) {
                acicEventListener(AuthValidateFormHandler, aautTargetForm, submitInput, event);
            });
        }
    }
});

var acicShouldSetup = true;
function acicEventListener(AuthValidateFormHandler, aautTargetForm, submitInput, event) {
    
    
    if (acicShouldSetup &&
        (typeof acic !== 'undefined') && (acic != null) &&
        AuthValidateFormHandler.validate(aautTargetForm)) {

        if (acicActionType || isTestEmailPattern(getEmailAddress(aautTargetForm))) {
            event.stopPropagation();
            event.stopImmediatePropagation();
            event.preventDefault();

            acic.setupACIC({
                "data-ref-id": "ap",
                "data-context": getClientContext(aautTargetForm),
                "data-callback": function(data) {
                    if (data.sessionToken) {
                        setAAToken(data.sessionToken, aautTargetForm);
                    }
                    submitForm(submitInput);
                },
                "data-host-config": "prod.USAmazon",
                "data-event-trigger": "SubmitInput",
                "data-fwcim": getFwcimBlob(aautTargetForm),
            });
        } else if (true) {
            acic.setupACICforAsyncReporting({
                "data-ref-id": "ap",
                "data-context": getClientContext(aautTargetForm),
                "data-callback": function(data) {
                },
                "data-host-config": "prod.USAmazon",
                "data-event-trigger": "SubmitInput",
                "data-fwcim": getFwcimBlob(aautTargetForm),
            });
        }
    }
}

function submitForm(submitInput) {
    acicShouldSetup = false;
    submitInput.click();
}

function setAAToken(sessionToken, aautTargetForm) {
    if (sessionToken) {
        var aaTokenInput = aautTargetForm.querySelector("input[name='aaToken']");
        if (!aaTokenInput) {
            aaTokenInput = document.createElement("input");
            aaTokenInput.type = "hidden";
            aaTokenInput.name = "aaToken";
            aautTargetForm.appendChild(aaTokenInput);
        }
        aaTokenInput.value = sessionToken;
    }
}

function getClientContext(aautTargetForm) {
    var context = {};
    var emailAddress = getEmailAddress(aautTargetForm);
    if (emailAddress) {
        context.emailAddress = emailAddress;
    }
    context.sessionId = "000-0000000-0000000";
    context.marketplaceId = "A1AM78C64UM0Y8";
    context.rid = "Y2M5YJDE4FQZWXZ160R8";
    context.ubid = "";

    context.pageType = "AuthenticationPortal";

    var appActionInput = aautTargetForm.querySelector("input[name='appAction']");
    if (appActionInput) {
        context.appAction = appActionInput.value;
    }

    var subPageTypeInput = aautTargetForm.querySelector("input[name='subPageType']");
    if (subPageTypeInput) {
        context.subPageType = subPageTypeInput.value;
    }

    return JSON.stringify(context);
}

function getFwcimBlob(aautTargetForm) {
    var fwcimBlob = aautTargetForm.querySelector("input[name='metadata1']");
    if(fwcimBlob && fwcimBlob.value !== 'true') {
        return fwcimBlob.value;
    }
    return null
}

function getEmailAddress(aautTargetForm) {
    var emailInput = aautTargetForm.querySelector("input[type='email']");
    if (!emailInput) {
        emailInput = aautTargetForm.querySelector("input[name='email']");
    }
    if (emailInput) {
        return emailInput.value;
    }
    return null;
}

function isTestEmailPattern(emailAddress) {
    
    return emailAddress &&
        (emailAddress.indexOf('sentinels') >= 0) &&
        emailAddress.endsWith('@amazon.com');
}
