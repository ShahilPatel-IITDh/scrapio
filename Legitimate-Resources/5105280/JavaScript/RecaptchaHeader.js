var grecaptchaReady = false;
var onloadCallback = function(){ grecaptchaReady = true; };

var verifyCallback = function(token) {
    document.dispatchEvent(new CustomEvent('grecaptchaVerified', {'detail': {response: token }}));
};
var errorCallback = function() {
    document.dispatchEvent(new Event('grecaptchaError'));
};

var expiredCallback = function() {
    document.dispatchEvent(new Event('grecaptchaExpired'));
}

let initializeRecaptcha = function(e){ //// retrieve the site key and initialize other handlers

    let siteKey = e.detail.siteKey;
    
	if(siteKey == null || siteKey === undefined){
		return;
	}
	
	// initialize handlers on the document to listen for recatpcha events
	
	document.addEventListener('grecaptchaRender', function(e) {
    onloadCallback = function() {
        grecaptchaReady = true;
        grecaptcha.render(e.detail.element, {
            
            'sitekey': siteKey,
            'callback': verifyCallback,
            'error-callback': errorCallback,
            //	'size': 'invisible',
            'expired-callback':expiredCallback,
            'badge': e.detail.hasOwnProperty('badge') ? e.detail.badge : 'bottomright'
        });
    };
    if (grecaptchaReady) {
        onloadCallback();
    }
});


document.addEventListener('grecaptchaReset', function() {
    grecaptcha.reset();
});
document.addEventListener('grecaptchaExecute', function() {
    grecaptcha.execute();
});

document.addEventListener('grecaptchaComponentInit', function(){
    
    // this is to capture the event and send the grecaptcha object in detail
    document.dispatchEvent( new CustomEvent('grecaptchaCaptureReference', {'detail':{'referenceObject':grecaptcha}}));
});
	
    
}

// listen to custom event from LWC component to start initialization of recaptcha
document.addEventListener('grecaptchaSetSiteKey', initializeRecaptcha);


