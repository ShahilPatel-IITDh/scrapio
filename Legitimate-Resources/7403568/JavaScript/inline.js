

        $(function(){

                        if (
                (
                    window.payhipShop.editor.globalSettings.cookieBanner.disableAnalyticsCookiesInSomeCases == 'no'
                    ||
                    (
                        window.payhipShop.editor.globalSettings.cookieBanner.enabled == 'yes'
                        &&
                        !window.payhipShouldShowCookieBanner()
                        &&
                        window.payhipShop.editor.globalSettings.cookieBanner.disableAnalyticsCookiesInSomeCases == 'yes'
                    )
                )
                &&
                !(
                    window.payhipShop.editor.globalSettings.cookieBanner.disableAnalyticsCookiesInSomeCases == 'yes'
                    &&
                    window.payhipShop.editor.globalSettings.cookieBanner.disableAnalyticsCookiesInAllCases == 'yes'
                )
            ) {

                window.payhipThirdPartyAnalytics = new PayhipThirdPartyAnalytics(
                    'UA-34658431-1',
                     false ,
                     false                 );

                
                    try {
                        if (typeof window.payhipThirdPartyAnalytics !== 'undefined') {
                            window.payhipThirdPartyAnalytics.editorv2NonProductPageViewed();
                        }
                    } catch(error) {

                    }

                
            }

        });

    