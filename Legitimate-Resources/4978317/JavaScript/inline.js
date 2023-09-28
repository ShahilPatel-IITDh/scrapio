

   // Example: <a href="#" data-seo-action='InitiateCheckout' data-seo-params='{currency: "USD", value: 30.00}'>Bue</a>

    function seoActionHandle(action, params) {
        console.log(action, (params));

switch (action) {
     case 'CompleteRegistration':
         $('body').append('<img src="https://www.imcounting.com/et/event.php?advertiser=181212&cid=16546869943115802435012707813974502&id=2f8987" border="0" width="1" height="1" />');
     break;
}


        if (typeof fbq != 'undefined' && action) {
            switch (action) {
                case 'CompleteRegistration':
                    fbq('track', action, params);
                break;
                case 'InitiateCheckout':
                    fbq('track', action, params);
                break;
            }
        }
    }
