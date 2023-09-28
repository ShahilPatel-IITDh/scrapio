(function ($, Drupal, drupalSettings) {
  'use strict';

  Drupal.behaviors.languageDetector  = {
    attach: function (context, settings) {
      var $behavior = this;
      var $body = $('body').once('language-detected');
      if ($body.length) {
        if ($.cookie("hide_lang_switcher") === "1") {
          return;
        }
        $behavior.getCountry(function (userCountry) {
          if (!userCountry) {
            return;
          }
          var languageList = {
            us: "United States",
            uk: "United Kingdom",
            fr: "France",
            de: "Deutschland",
            es: "EspaÃ±a",
            jp: "æ¥æ¬",
            au: "Australia",
            it: "Italia"
          };
          // Check to see if the country belong to the list.
          if (languageList.hasOwnProperty(userCountry)) {
            // Check to see if the current page belongs to the user's country.
            if (userCountry !== drupalSettings.pp_i18n.language) {
              // Show a popup allowing the user to switch countries.
              // Construct the current URL with the new prefix.
              var switcher = $behavior.switcherPanel(languageList, userCountry);
              $behavior.bindEvents(switcher, settings);
              switcher.find('option[value='+userCountry+']').prop('selected', true).trigger('change');
              var $header = $('header', context);
              $header.append(switcher);
              Drupal.attachBehaviors($header.get(0), settings);
            }
          }
        });
        // Only show the language switcher once per session.
        $.cookie("hide_lang_switcher", "1");
      }
    },
    getCountry: function (callback) {
      var $behavior = this;
      var currentCountry = $behavior.getCurrentCountry();
      if (currentCountry !== undefined) {
        return currentCountry;
      }
      if ($.cookie("pp_user_country")) {
        return callback($.cookie("pp_user_country"));
      }
      if (typeof geoip2 === "undefined") {
        return callback(false);
      }
      // Query the MaxMind JS service for the user's country.
      geoip2.country(function (data) {
        if (data.hasOwnProperty("country") && data.country.hasOwnProperty("iso_code")) {
          var userCountry = data.country.iso_code.toLowerCase();
          $.cookie("pp_user_country", userCountry);
          $behavior.setCurrentCountry(userCountry);
          return callback(userCountry);
        }
        else {
          $behavior.setCurrentCountry(false);
          return callback(false);
        }
      });
    },
    setCurrentCountry: function(country) {
      this.country = country;
    },
    getCurrentCountry: function() {
      return this.country || undefined;
    },
    switcherPanel: function (languageList, userCountry) {
      var switcher = "",
          message = '',
          logo = '',
          buttonLabel = '',
          imgBase = '/modules/custom/pp_i18n/images';
      switch (userCountry) {
        // don't translate the message and buttonLabel strings with the Drupal.t() as the message and label need to display in the user language that is set in the switch case. Translating the strings will display the text for the current country in the URL and NOT in the country the user is in if the string has been translated in the drupal translation settings.
        case 'us':
          logo = imgBase + '/US.png';
          message = 'Continue to see content for your location';
          buttonLabel = 'Continue';
          break;
        case 'uk':
          logo = imgBase + '/UK.png';
          message = 'Continue to see content for your location';
          buttonLabel = 'Continue';
          break;
        case 'au':
          logo = imgBase + '/AU.png';
          message = 'Continue to see content for your location';
          buttonLabel = 'Continue';
          break;
        case 'fr':
          logo = imgBase + '/FR.png';
          message = 'Continuer Ã  voir le contenu pour votre emplacement';
          buttonLabel = 'Continuer';
          break;
        case 'de':
          logo = imgBase + '/DE.png';
          message = 'Zeigen Sie weiterhin Inhalte fÃ¼r Ihren Standort an';
          buttonLabel = 'Fortsetzen';
          break;
        case 'es':
          logo = imgBase + '/ES.png';
          message = 'ContinÃºa viendo el contenido de tu ubicaciÃ³n.';
          buttonLabel = 'Continuar';
          break;
        case 'jp':
          logo = imgBase + '/JP.png';
          message = 'ããªãã®å ´æã®ã³ã³ãã³ããè¦ç¶ãã';
          buttonLabel = 'æç¶ãã';
          break;
        case 'it':
          logo = imgBase + '/IT.png';
          message = 'Continua a vedere i contenuti per la tua posizione';
          buttonLabel = 'Continua';
          break;
        default:
          message = 'Continue to see content for your location';
          buttonLabel = 'Continue';
      }
      // Markup for the switcher panel.
      switcher += "<aside id='pp-language-switch' class='language-switch'>";
      switcher += "<div id='language-switch-inner'>";
      switcher += "<span class='language-switch_copy'>" + message + "</span>";
      switcher += "<div class='language-switch_select'><img src='" + logo + "'><select class='no-bs-select'>";
      Object.keys(languageList).forEach(function(key){
        if(!languageList.hasOwnProperty(key)) return;
        switcher += "<option value='"+key+"'>";
        switcher += languageList[key];
        switcher += "</option>";
      });
      switcher += "</div></select>";
      switcher += "<a class='language-switch_button'>" + buttonLabel + "</a>";
      switcher += "<span><a class='language-switch_close' onclick='Drupal.behaviors.languageDetector.ignore(event)' href='#'></span>";
      switcher += "</div>";
      switcher += "</aside>";

      return $(switcher);
    },
    bindEvents: function(switcher, settings){
      switcher.on('change', 'select', function(e){
        var message = '',
            logo = '',
            buttonLabel = '',
            selectedCountry = $(e.currentTarget).val(),
            imgBase = '/modules/custom/pp_i18n/images',
            newUrl = settings.path.baseUrl + selectedCountry + "/" + settings.path.currentPath;
        switch (selectedCountry) {
          // don't translate the message and buttonLabel strings with the Drupal.t() as the message and label need to display in the user language that is set in the switch case. Translating the strings will display the text for the current country in the URL and NOT in the country the user is in if the string has been translated in the drupal translation settings.
          case 'us':
            logo = imgBase + '/US.png';
            message = 'Continue to see content for your location';
            buttonLabel = 'Continue';
            break;
          case 'uk':
            logo = imgBase + '/UK.png';
            message = 'Continue to see content for your location';
            buttonLabel = 'Continue';
            break;
          case 'au':
            logo = imgBase + '/AU.png';
            message = 'Continue to see content for your location';
            buttonLabel = 'Continue';
            break;
          case 'fr':
            logo = imgBase + '/FR.png';
            message = 'Continuer Ã  voir le contenu pour votre emplacement';
            buttonLabel = 'Continuer';
            break;
          case 'de':
            logo = imgBase + '/DE.png';
            message = 'Zeigen Sie weiterhin Inhalte fÃ¼r Ihren Standort an';
            buttonLabel = 'Fortsetzen';
            break;
          case 'es':
            logo = imgBase + '/ES.png';
            message = 'ContinÃºa viendo el contenido de tu ubicaciÃ³n.';
            buttonLabel = 'Continuar';
            break;
          case 'jp':
            logo = imgBase + '/JP.png';
            message = 'ããªãã®å ´æã®ã³ã³ãã³ããè¦ç¶ãã';
            buttonLabel = 'æç¶ãã';
            break;
          case 'it':
            logo = imgBase + '/IT.png';
            message = 'Continua a vedere i contenuti per la tua posizione';
            buttonLabel = 'Continua';
            break;
          default:
            message = 'Continue to see content for your location';
            buttonLabel = 'Continue';
        }

        switcher.find('.language-switch_copy')
            .text(message);
        switcher.find('.language-switch_select img').attr('src', logo);
        switcher.find('.language-switch_button')
            .text(buttonLabel)
            .attr('href', newUrl);
      });
      Drupal.attachBehaviors(switcher.get(0), settings);
    },
    switch: function(e) {

    },
    ignore: function(e) {
      $(e.target).closest("#pp-language-switch").remove();
      $('.super-nav').trigger('updateHeight', e);
    }
  };
})(jQuery, Drupal, drupalSettings);
;
