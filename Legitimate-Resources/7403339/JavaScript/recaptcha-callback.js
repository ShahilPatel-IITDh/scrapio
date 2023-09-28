var widgetIdContact = 1;
var contactAlreadyLoaded = false;
var widgetIdContactFooter = 1;
var widgetIdRegistration = 1;
var registrationAlreadyLoaded = false;
var widgetIdDedi = 1;
var widgetIdComment = 1;

var captchaLoaded = function () {
    if (document.getElementById('recaptcha-inscription') != null) {
        widgetIdRegistration = grecaptcha.render(document.getElementById('recaptcha-inscription'), {
            'sitekey': reCATPCHAsiteKey
        });
        registrationAlreadyLoaded = true;
    }
    else {
        widgetIdRegistration = null;
    }

    if (document.getElementById('recaptcha-contact') != null) {
        widgetIdContact = grecaptcha.render(document.getElementById('recaptcha-contact'), {
            'sitekey': reCATPCHAsiteKey
        });
        contactAlreadyLoaded = true;
    }
    else {
        widgetIdContact = null;
    }

    if (document.getElementById('recaptcha-footer') != null) {
        widgetIdContactFooter = grecaptcha.render(document.getElementById('recaptcha-footer'), {
            'sitekey': reCATPCHAsiteKey
        });
    }
    else {
        widgetIdContactFooter = null;
    }

    if (document.getElementById('recaptchaDedicace') != null) {
        widgetIdDedi = grecaptcha.render(document.getElementById('recaptchaDedicace'), {
            'sitekey': reCATPCHAsiteKey
        });
    }
    else {
        widgetIdDedi = null;
    }

    if (document.getElementById('recaptchaCommentaire') != null) {
        widgetIdComment = grecaptcha.render(document.getElementById('recaptchaCommentaire'), {
            'sitekey': reCATPCHAsiteKey
        });
    }
    else {
        widgetIdComment = null;
    }

}
