/*!*
 * project: digitalstrategie / pk
 * release: XX
 * build-date: XX.XX.XXXX / XX:XX
 * creation-date: 28.02.2020 / 11:51
 * ATTENTION: This file was created without build-Tool.
 * As soon as we are able to use such a tool, we have to create the file again.
 *
 * This Javascript was part of lib_head. We had to separate the smartbanner functionality from the other functionality.
 * So the smartbanner part was moved into this new javascript file.
 * From lib_head it was removed.
 * 
 * This Javascript is loaded by CIF only if the Switch for showSmartbanner=true. 
 * So any test on showSmartbanner in this script is redundant.
 */

/* define namespace */
var cSmartBanner = cSmartBanner || {};



 /* ipad banner */
 window.setBannerTags = (function( window, document, undefined ) {

  var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

  /* get locale */
  var currentLang = "DE";

  if( jQuery('html').attr('lang') ) {
    currentLang = jQuery('html').attr('lang').substring(0, 2).toUpperCase();
  }

  
  
  


  /* switch language dependent variables */
    switch (currentLang)
    {
      
      case "DE":
        var iTunesPhoneID   = "app-id=366609901";
        var iTunesTabID   = "app-id=366609901";
        var showSmartbanner = true;

        break;
           
      case "EN":
        var iTunesPhoneID   = "app-id=366609901";
        var iTunesTabID   = "app-id=366609901";
        var showSmartbanner = true;

        break;
           

      default:
        var iTunesPhoneID   = "app-id=366609901";
          var iTunesTabID   = "app-id=366609901";
          var showSmartbanner = true;
    }

    if (mobile && showSmartbanner) {

        var userAgent = navigator.userAgent.toLowerCase();

        if (userAgent.search("ipad") > -1) {
          jQuery("meta[name=apple-itunes-app]").attr("content", iTunesTabID);
        } else if (userAgent.search("iphone") > -1) {
          jQuery("meta[name=apple-itunes-app]").attr("content", iTunesPhoneID);
        }
    }

 })(this, this.document);


 /* android banner */
 jQuery(function() {

    cSmartBanner.androidBanner = function () {

        var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

    /* get locale */
    var currentLang = "DE";

    if( jQuery('html').attr('lang') ) {
      currentLang = jQuery('html').attr('lang').substring(0, 2).toUpperCase();
    }

    // set jquery smartbanner parameters
    
    
    

    /* General*/
    var bannerDaysHidden    = 90;
    var bannerDaysReminder  = 90;

    /* switch language dependent variables */
        switch (currentLang)
        {
           
      case "DE":
              /* General*/
              var showSmartbanner     = true;
              var appStoreLanguage    = "de"
              var appPrice            = "Gratis";
              var appAuthor           = "Commerzbank AG";
              var appStoreLanguage    = "de"
              /* iTunes */
              var iTunesStoreName     = "App Store";
              var appTitle            = "Commerzbank AG";
              /* General Android */
              var androidStoreName    = "Google Play Store";
              var buttonText          = "Anzeigen";
              /* Android Phone */
              var androidPhoneTitle   = "Commerzbank Banking";
              var androidPhoneID      = "de.commerzbanking.mobil";
              var androidPhoneIcon    = "/portal/media/anwendungen/apps/appstore/icon-512.png";
              /* Android Tab */
              var androidTabTitle     = "Commerzbank Banking";
              var androidTabID        = "de.commerzbanking.mobil";
              var androidTabIcon      = "/portal/media/anwendungen/apps/appstore/icon-512.png";
              break;
      
      case "EN":
              /* General*/
              var showSmartbanner     = true;
              var appStoreLanguage    = "en"
              var appPrice            = "Free";
              var appAuthor           = "Commerzbank AG";
              var appStoreLanguage    = "en"
              /* iTunes */
              var iTunesStoreName     = "App Store";
              var appTitle            = "Commerzbank AG";
              /* General Android */
              var androidStoreName    = "Play Store";
              var buttonText          = "View";
              /* Android Phone */
              var androidPhoneTitle   = "Commerzbank Banking";
              var androidPhoneID      = "de.commerzbanking.mobil";
              var androidPhoneIcon    = "/portal/media/anwendungen/apps/appstore/icon-512.png";
              /* Android Tab */
              var androidTabTitle     = "Commerzbank Banking";
              var androidTabID        = "de.commerzbanking.mobil";
              var androidTabIcon      = "/portal/media/anwendungen/apps/appstore/icon-512.png";
              break;
      

           default:
              /* General*/
              var showSmartbanner     = true;
              var appStoreLanguage    = "de"
              var appPrice            = "Gratis";
              var appAuthor           = "Commerzbank AG";
              var appStoreLanguage    = "de"
              /* iTunes */
              var iTunesStoreName     = "App Store";
              var appTitle            = "Commerzbank AG";
              /* General Android */
              var androidStoreName    = "Google Play Store";
              var buttonText          = "Anzeigen";
              /* Android Phone */
              var androidPhoneTitle   = "Commerzbank Banking";
              var androidPhoneID      = "de.commerzbanking.mobil";
              var androidPhoneIcon    = "/portal/media/anwendungen/apps/appstore/icon-512.png";
              /* Android Tab */
              var androidTabTitle     = "Commerzbank Banking";
              var androidTabID        = "de.commerzbanking.mobil";
              var androidTabIcon      = "/portal/media/anwendungen/apps/appstore/icon-512.png";
        }

        if (mobile && showSmartbanner) {

            var userAgent       = navigator.userAgent.toLowerCase();

            if ((userAgent.search("android") > -1) && (userAgent.search("mobile") > -1)) {
              var playStoreID   = androidPhoneID;
              var playStoreIcon = androidPhoneIcon;
              appTitle = androidPhoneTitle;
            } else if ((userAgent.search("android") > -1) && !(userAgent.search("mobile") > -1)) {
              var playStoreID   = androidTabID;
              var playStoreIcon = androidTabIcon;
              appTitle = androidTabTitle;
            }

            jQuery("head").append("<meta name='google-play-app' content='app-id=" + playStoreID + "'>");

            /* initialize smart banner */
            jQuery.smartbanner({
              title             : appTitle,
              author            : appAuthor,
              appStoreLanguage  : appStoreLanguage,
              icon              : playStoreIcon,
              daysHidden        : bannerDaysHidden,
              daysReminder      : bannerDaysReminder,
              inAppStore        : iTunesStoreName,
              inGooglePlay      : androidStoreName,
              price             : appPrice,
              button            : buttonText
            })

        }
    }

    /* init smartBanner */
    cSmartBanner.androidBanner();
 });
 
