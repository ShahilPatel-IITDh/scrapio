
        if (/Trident.*rv:/.test(navigator.userAgent)) {
            console.log('picturefill loaded');
            var pfill = document.createElement('script');
            pfill.src = '/scripts/responsive/picturefill.js';
            document.body.appendChild(pfill);

            var url_fill = document.createElement('script');
            url_fill.src = '/scripts/url.polyfill.js';
            document.body.appendChild(url_fill);
        }
    