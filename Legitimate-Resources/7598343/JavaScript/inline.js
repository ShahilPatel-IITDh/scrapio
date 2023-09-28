
      if ( typeof window.globals  === 'undefined')
      {
        window.globals={};
      }
      globals = Object.assign({},globals, {
  "currentURL": "/LrrController?TAM_OP=login&USERNAME=unauthenticated&ERROR_CODE=0x00000000&ERROR_TEXT=HPDBA0521I%20%20%20Successful%20completion&METHOD=GET&URL=%2Fmga%2Fsps%2Foauth%2Foauth20%2Fauthorize%3Fresponse_mode%3Dform_post%26claims%3D%257B%2522id_token%2522%253A%257B%2522authenticationTypes%2522%253A%257B%2522essential%2522%253Afalse%257D%257D%257D%26scope%3Dopenid%26Target%3Dhttps%253A%252F%252Fsaml.e-access.att.com%252Fisam%252Fsps%252FATTIDPEntity_MFA%252Fsaml20%252Flogin%253FSAMLRequest%253DlVLBbtswDP0VQ3fbsls7qRAH8JIVC9B2RuPt0EvB2HQqwJY8UU7Xv5%25252BipGh3aIddycfHx%25252Fe4IBj6dBTlZJ%25252FUPf6akGzwe%25252BgViVOnYJNRQgNJEgoGJGEbsS1vb0QacTEabXWjexaURGis1GqlFU0Dmi2ag2zwx%25252F1NwZ6sHUnEMVi7a4EiOvVCpZ%25252BjRg%25252BxgsMIe4xazYK1UyAVHKneBo9aIgyhaZAocjR%25252BTLpyTCPFZV1v1tVXZaV9eby9Lj0%25252B5XGv91Kx4FqbBv2FBeugJ2TBZl2w7d1qfpG3V5A23VWeI2Sc590O8hmfdZC1fM4dkCogkgd8GyWacKPIgrIFS3mahnwWJlmdJOKCi2wezbLLBxZUZ2%25252B%25252BSNVKtf%25252FcyN0",
  "errorText": "Input parameters are missing in this request and it has therefore been blocked.",
  "mkNativeLogoutUrl": "/pkmslogout?localLogout=true&retURL=",
  "errorCode": "0x1005b38a",
  "cspTest": false,
  "sessionId": "2e5d6e91501aa2d6242aab04c25d5427f6387248",
  "ajaxStatusHandlerInfo": {
    "0": {
      "max_retries": 10,
      "delayMS": 1000
    },
    "503": {
      "max_retries": 2,
      "delayMS": 1000
    }
  },
  "referenceId": "2e5d6e91501aa2d6242aab04c25d5427f6387248",
  "internet": "ON",
  "strReqURL": "/mga/sps/oauth/oauth20/authorize?response_mode=form_post&claims=%7B%22id_token%22%3A%7B%22authenticationTypes%22%3A%7B%22essential%22%3Afalse%7D%7D%7D&scope=openid&Target=https%3A%2F%2Fsaml.e-access.att.com%2Fisam%2Fsps%2FATTIDPEntity_MFA%2Fsaml20%2Flogin%3FSAMLRequest%3DlVLBbtswDP0VQ3fbsls7qRAH8JIVC9B2RuPt0EvB2HQqwJY8UU7Xv5%252BipGh3aIddycfHx%252Fe4IBj6dBTlZJ%252FUPf6akGzwe%252BgViVOnYJNRQgNJEgoGJGEbsS1vb0QacTEabXWjexaURGis1GqlFU0Dmi2ag2zwx%252F1NwZ6sHUnEMVi7a4EiOvVCpZ%252BjRg%252BxgsMIe4xazYK1UyAVHKneBo9aIgyhaZAocjR%252BTLpyTCPFZV1v1tVXZaV9eby9Lj0%252B5XGv91Kx4FqbBv2FBeugJ2TBZl2w7d1qfpG3V5A23VWeI2Sc590O8hmfdZC1fM4dkCogkgd8GyWacKPIgrIFS3mahnwWJlmdJOKCi2wezbLLBxZUZ2%252B%252BSNVKtf%252FcyN0"
} );
      function getFaqLink( params )
      {
        var url = "https://oidc.idp.elogin.att.com/faq/eiam/static/v2/resources/html/faq/FAQs_en.html?aa=";
        if ( params != null )
        {
          url = url + "&" + params;
        }
        window.open(url, "_faq");
      }
      window.onload = function ()
      {
        isMobileDevice ();

        //

        displayError( getErrorMessage ( globals.errorCode, globals.errorText ) );


        ////////////////////////////////////////////////////////////////////////////
        //add hidden div at end to signal end of page setup for testing
        var elem = document.createElement('div');
        elem.setAttribute("id", "qaPageLoaded");
        elem.style.cssText = 'position:relative; visibility:hidden';
        document.body.appendChild(elem);

        var languages = {
            "en" : {
                          "isolang": "en",
                          "displayText":"English",
                          "select": [ {
                                         "text":"English",
                                         "displayText":"English",
                                         "isolang" : "en"
                                       },
                                       {
                                         "text":"Spanish",
                                         "displayText" : "Spanish",
                                         "isolang" : "es"
                                       }
                                    ]
                        },
            "es" : {
                          "isolang": "es",
                          "displayText" :"Espa&ntilde;ol",
                          "select": [ {
                                         "text":"English",
                                         "displayText":"Ingl&eacute;s",
                                         "isolang" : "en"
                                       },
                                       {
                                         "text":"Spanish",
                                         "displayText":"Espa&ntilde;ol",
                                         "isolang" : "es"
                                       }
                                    ]
                        }
      };

      initLanguage ( "en",  languages );


      ////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////
      function getErrorMessage(id, text )
      {
        // Veracode Fix
      var protocol = '';
      var host = '';
      var strUrl = '/mga/sps/oauth/oauth20/authorize?response_mode=form_post&amp;amp;claims=%7B%22id_token%22%3A%7B%22authenticationTypes%22%3A%7B%22essential%22%3Afalse%7D%7D%7D&amp;amp;scope=openid&amp;amp;Target=https%3A%2F%2Fsaml.e-access.att.com%2Fisam%2Fsps%2FATTIDPEntity_MFA%2Fsaml20%2Flogin%3FSAMLRequest%3DlVLBbtswDP0VQ3fbsls7qRAH8JIVC9B2RuPt0EvB2HQqwJY8UU7Xv5%252BipGh3aIddycfHx%252Fe4IBj6dBTlZJ%252FUPf6akGzwe%252BgViVOnYJNRQgNJEgoGJGEbsS1vb0QacTEabXWjexaURGis1GqlFU0Dmi2ag2zwx%252F1NwZ6sHUnEMVi7a4EiOvVCpZ%252BjRg%252BxgsMIe4xazYK1UyAVHKneBo9aIgyhaZAocjR%252BTLpyTCPFZV1v1tVXZaV9eby9Lj0%252B5XGv91Kx4FqbBv2FBeugJ2TBZl2w7d1qfpG3V5A23VWeI2Sc590O8hmfdZC1fM4dkCogkgd8GyWacKPIgrIFS3mahnwWJlmdJOKCi2wezbLLBxZUZ2%252B%252BSNVKtf%252FcyN0';
      var url = protocol + "://" + host + strUrl;
        switch (id.toLowerCase() )
        {
          case "0x132120c8":
            return 'Login incorrect. Please try again. (' + id + ')';
            break;
          case "0x38ad52fa":
            return 'An attempt to remove a non-empty directory failed.'                                                   +
                   '<br>'                                                                                          +
                   'The requested operation requires the removal of a non-empty directory.  This is an illegal operation. '                                             +
                   '<br>'                                                                                          +
                   'The contents of the directory must be removed before the requested operation can proceed.';
            break;
          case "0x38b9a41f":
            return 'You are already logged in to this Web server.  A new session cannot be created.'                                                   +
                   '<br>'                                                                                          +
                   'The requested operation requires the removal of a non-empty directory.  This is an illegal operation. '                                             +
                   '<br>'                                                                                          +
                   '<UL>'                                                                                          +
                   '<LI><B>Resume your original session:</B> If you still have access to your original session, you can return to that client and continue accessing the Web site.</LI>'                                      +
                   '<LI><B>End your original session:</B> If you still have access to your original session, you can return to that client and log out from the Web site.  Once you have logged out from that client, you can log in from a new client.</LI>'                                      +
                   '<LI><B>Wait for your original session to time out:</B> If you no longer have access to your original session (for example, if you closed your browser without properly logging out of the Web site), you can wait for your original session to terminate automatically.</LI>'                                      +
                   '</UL>';
            break;
          case "0x38b9a4b0":
            return 'The application server you are accessing has been taken offline by the system administrator.'                                                   +
                   '<br>'                                                                                          +
                   'The application server you are accessing has been taken offline by the system administrator.'                                             +
                   '<br>'                                                                                          +
                   'Try again at a later time or contact the system administrator for more information.';
            break;
          case "0x38b9a4b1":
            return 'The server is temporarily unable to service your request.'                                                   +
                   '<br>'                                                                                          +
                   'The server is unable to service a request because a needed resource is unavailable.'                                             +
                   '<br>'                                                                                          +
                   'Please try again later';
            break;
          case "0x38cf013d":
            return 'Your login was successful.  However, AT&T Global Logon was unable to complete your previous request.'                                                   +
                   '<br>'                                                                                          +
                   'AT&T Global Logon was unable to cache your previous request because its size exceeded the configurable value set by the system administrator.'                                             +
                   '<br>'                                                                                          +
                   'Please use your browsers back button and resubmit your request.  If your browser does not support caching, you may have to re-enter POST or query data.';
            break;
          case "0x38cf0259":
            return 'AT&T Global Logon could not determine your sign-on information for the resource you have requested.'                                                   +
                   '<br>'                                                                                          +
                   'The resource you have requested requires AT&amp;T Global Logon to sign you on.  However, a problem occurred while the server was attempting to fetch the information.';
            break;
          case "0x38cf025a":
            return 'AT&T Global Logon could not determine the sign-on information for the resource you have requested.'                                                   +
                   '<br>'                                                                                          +
                   'The resource you have requested requires AT&amp;T Global Logon to sign you on.  However, your account is not configured with any sign-on information.';
            break;
          case "0x38cf025b":
            return 'AT&T Global Logon could not determine the sign-on information for the resource you have requested.'                                                   +
                   '<br>'                                                                                          +
                   'The resource you have requested requires AT&amp;T Global Logon to sign you on.  However, your account does not have any sign-on information for the target web server.';
            break;
          case "0x38cf025d":
            return 'The resource you have requested requires AT&T Global Logon to sign you on to another web server.  However, in order to do this, you must first log into AT&T Global Logon.'                                                   +
                   '<br>'                                                                                          +
                   'The resource you have requested requires AT&T Global Logon to sign you on to another web server.  However, in order to do this, you must first log'                                             +
                   '<br>'                                                                                          +
                   'Log into AT&amp;T Global Logon.  You can do this by accessing the requested resource using HTTPS (SSL).'                                               +
                   '<A HREF=' + url + '>Re-access the page using HTTPS.</A>';
            break;
          case "0x38cf025e":
            return 'AT&T Global Logon could not sign you on.'                                                   +
                   '<br>'                                                                                          +
                   'The resource you have requested requires AT&amp;T Global Logon to sign you on to another web server.  However, the sign-on information for your account is incorrect.';
            break;
          case "0x38cf025f":
            return 'AT&T Global Logon received an unexpected authentication challenge from a the web server.'                                                   +
                   '<br>'                                                                                          +
                   'AT&amp;T Global Logon attempted to fetch the resource you requested from the web server.  However, it received an authentication challenge from the web server while handling your request.  There is currently no sign-on information configured for this junction server. This may be a system configuration problem.';
            break;
          case "0x38cf0421":
            return 'The web resource you have requested has been temporarily moved.'                                                  +
                   '<A HREF=' + url + '>Click here</A>'    +
                   'to fetch the resource.';
            break;
          case "0x38cf0424":
            return 'AT&T Global Logon received an invalid HTTP request.'                                                   +
                   '<br>'                                                                                          +
                   'Possible causes for this message include:'                                            +
                   '<UL>'                                                                                          +
                   '<LI>Incompatibility between the browser and the server.</LI>'                                   +
                   '<LI>A problem with the browser.</LI>'                                   +
                   '<LI>Illegal URL format or character.</LI>'                                   +
                   '<LI>Invalid hostname.</LI>'                                   +
                   '</UL>';
            break;
          case "0x38cf0425":
            return 'You must login before you can access the resource you have requested.'                                                   +
                   '<br>'                                                                                          +
                   'The resource you have requested is secured by AT&amp;T Global Logon, and in order to access it, you must first login.';
            break;
          case "0x38cf0427":
            return 'The resource you have requested is secured by AT&T Global Logon.'                                                   +
                   '<br>'                                                                                          +
                   'You have received this message due to one or more of the following reasons'                                            +
                   '<br>'                                                                                          +
                   'You are logged in to this secure domain, but do not have the correct permissions to access the resource.'                                            +
                   '<br>'                                                                                          +
                   'The resource you requested is ' + url                                                          +
                   '<br>'                                                                                          +
                   '<UL>'                                                                                          +
                   '<LI>If you do not have an account with this secure domain: Please contact your Account Administrator to obtain login and password information.<LI>'                                       +
                   '<LI>If you are logged in but still are denied access to the page: If you continue to get this message, you probably do not have the correct permissions to access the resource. Please contact your Security Administrator for assistance.<LI>'                                       +
                   '</UL>'                                                                                         +
                   '<br>'                                                                                          +
                   'You may want to close this browser window, launch a new browser window, and try your URL again.';

            break;
          case "0x38cf0428":
            return 'AT&T Global Logon cannot find the resource you have requested.'                                                   +
                   '<br>'                                                                                          +
                   'AT&T Global Logon cannot find any resource matching the requested URL :&nbsp;<B><I>' + url +'</I></B>'             +
                   '<br>'                                                                                          +
                   'If you manually entered the URL, check the accuracy of the URL.';
            break;
          case "0x38cf0432":
            return 'A service required by AT&T Global Logon to complete your request is currently not available.'                                                   +
                   '<br>'                                                                                          +
                   'The service required by AT&T Global Logon is located on a back-end server that is temporarily down.';
            break;
          case "0x38cf0434":
            return 'The resource you have requested requires privacy.'                                                   +
                   '<br>'                                                                                          +
                   'You are accessing the resource using an unencrypted connection.  The resource has access controls set by the servers administrator that restrict access to encrypted connections.'                                             +
                   '<br>'                                                                                          +
                   'You must access this resource via HTTPS (SSL).'                                               +
                   '<A HREF=' + url + '>Re-access the page using HTTPS</A>.';
            break;
          case "0x38cf0442":
            return 'A service required by AT&amp;T Global Logon to complete your request is currently not available.'                                                   +
                   '<br>'                                                                                          +
                   'The service required by AT&amp;T Global Logon is located on a back-end server, where SSL mutual authentication has failed. ';
            break;
          case "0x38cf04c6":
            return 'The resource you have requested is located on a third-party server.  AT&amp;T Global Logon has attempted to send your request to that server, but it is not responding.'                                                   +
                   '<br>'                                                                                          +
                   'This could be due to the third-party server being offline, or to network problems making it unreachable. The problem is not with AT&amp;T Global Logon itself.'                                             +
                   '<br>'                                                                                          +
                   'Retry your request later.';
            break;
          case "0x38cf04d7":
            return 'The resource you have requested is located on a third-party server. AT&T Global Logon has attempted to send your request to that server, but it is not responding.'                                                   +
                   '<br>'                                                                                          +
                   'This could be due to the third-party server being offline, or to network problems making it unreachable. The problem is not with AT&T Global Logon itself.'                                             +
                   '<br>'                                                                                          +
                   'Retry your request later.';
            break;
          case "0x38cf07aa":
            return 'AT&T Global Logon could not complete your request.'                                                   +
                   '<br>'                                                                                          +
                   'The following CGI program returned an invalid response:';
            break;
          case "0x38cf08cc":
            return 'You cannot access the resource you have requested at this time.'                                                   +
                   '<br>'                                                                                          +
                   'The resource you have requested is protected by a policy restricting access to specific time periods.  Your request has occurred outside of those permitted time periods.'                                             +
                   '<br>'                                                                                          +
                   'Retry your request later.';
            break;
          case "0xaac_user_error":
            return 'Authentication Service Error'                                             +
                   '<br>'                                                                                          +
                   'Unable to complete authentication process. This can be caused by using the back button during authentication, performing multiple authentication processes in the same browser, using an old bookmark, or other reasons.'                                       +
                   '<br>'                                                                                          +
                   'Retry your request.';
            break;
          default:
            if ( text == null || text == "" )
            {
              return 'Login incorrect. Please try again. (' + id + ')';
            }
            else
            {
              return text + ' (' + id + ')';
            }
            break;
          }
        }
      }

    