
    /* Facebook SDK */
    var FB = null,
        FBaccesstoken = false;
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '264508872243158',
            status     : true,
            cookie     : true,
            xfbml      : true,
            version    : 'v2.9'
        });

        /* Check if the current user is logged in and has authorized the app */
        FB.getLoginStatus(checkLoginStatus);

        /* Check the result of the user status and display login button if necessary */
        function checkLoginStatus(response) {
            try{
                if(response && response.status == 'connected') {
                    FBaccesstoken = response.authResponse.accessToken;
                    nav.current_view.showFacebookUser(response);
                } else {
                    nav.current_view.showFacebookUser(false);
                }
            } catch(e){}
        }

        FB = this.FB;
    };
    (function(d){
       var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement('script'); js.id = id; js.async = true;
       js.src = "//connect.facebook.com/pt_BR/sdk.js";
       ref.parentNode.insertBefore(js, ref);
    }(document));
