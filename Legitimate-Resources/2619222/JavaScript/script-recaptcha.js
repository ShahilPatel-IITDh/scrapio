
        LR.handleAsyncScript('recaptcha', function() {
            loadScript('https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoaded&render=explicit', true, document.getElementById('script-recaptcha'), null, null, true);
        });
    