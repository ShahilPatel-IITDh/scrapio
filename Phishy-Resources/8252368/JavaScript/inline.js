
                function StartLogin()
                {
                    LoginManager = new CLoginPromptManager( 'https://steamcommunity.com', {
                        strRedirectURL: "https:\/\/steamcommunity.com\/my\/goto",
                        gidCaptcha: -1,
                        strMobileClientType: null,
                        strMobileClientVersion: null,
                        bIsMobile: false,
                        bMobileClientSupportsPostMessage: false		} );

                    let form = document.forms['logon'];
                    if ( form ) {
                        form.elements['username'].focus();
                    }

                }

                $J( function() {
                    StartLogin();
                });
            