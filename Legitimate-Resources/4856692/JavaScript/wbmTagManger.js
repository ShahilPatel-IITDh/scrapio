
            function getCookie(name) {
                var cookieMatch = document.cookie.match(name + '=(.*?)(;|$)');
                return cookieMatch && decodeURI(cookieMatch[1]);
            }

            var gtmCookieSet = getCookie('wbm-tagmanager-enabled');
            
            var googleTag = function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl+'';f.parentNode.insertBefore(j,f);};
            

            if (hasSWConsentSupport && gtmCookieSet === null) {
                window.wbmGoogleTagmanagerId = gtmContainerId;
                window.wbmScriptIsSet = false;
                window.googleTag = googleTag;
            } else {
                window.wbmScriptIsSet = true;
                googleTag(window, document, 'script', 'dataLayer', gtmContainerId);
                googleTag = null;
            }
        