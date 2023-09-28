
    window.sliceComponents = window.sliceComponents || {};

    externalsScriptLoaded.then(() => {
        window.reliableDOMContentLoaded.then(() => {
            var componentContainer = document.querySelector("#slice-container-newsletterForm-articleInbodyContent");

            if (componentContainer) {
                var data = {"layout":"inbodyContent","header":"Are you a pro? Subscribe to our newsletter","tagline":"Sign up to the TechRadar Pro newsletter to get all the top news, opinion, features and guidance your business needs to succeed!","formFooterText":"By submitting your information you agree to the <a href=\"http:\/\/www.futureplc.com\/terms-conditions\/\" target=\"_blank\">Terms & Conditions<\/a> and <a href=\"http:\/\/www.futureplc.com\/privacy-policy\/\" target=\"_blank\">Privacy Policy<\/a> and are aged 16 or over.","successMessage":{"body":"Thank you for signing up. You will receive a confirmation email shortly."},"failureMessage":"There was a problem. Please refresh the page and try again.","method":"POST","inputs":[{"type":"hidden","name":"NAME"},{"type":"email","name":"MAIL","placeholder":"Your Email Address","required":true},{"type":"hidden","name":"NEWSLETTER_CODE","value":"XTP-X"},{"type":"hidden","name":"LANG","value":"EN"},{"type":"hidden","name":"SOURCE","value":"60"},{"type":"checkbox","name":"CONTACT_OTHER_BRANDS","label":{"text":"Contact me with news and offers from other Future brands"}},{"type":"checkbox","name":"CONTACT_PARTNERS","label":{"text":"Receive email from us on behalf of our trusted partners or sponsors"}},{"type":"submit","value":"Sign me up","required":true}],"endpoint":"https:\/\/newsletter-subscribe.futureplc.com\/v2\/submission\/submit","ariaLabels":{}};

                var triggerHydrate = function() {
                    window.sliceComponents.newsletterForm.hydrate(data, componentContainer);
                }

                if (window.lazyObserveElement) {
                    window.lazyObserveElement(componentContainer, triggerHydrate);
                } else {
                    triggerHydrate();
                }
            }
        }).catch(err => console.log('Hydration Script has failed for newsletterForm-articleInbodyContent Slice', err));
    }).catch(err => console.log('Externals script failed to load', err));
