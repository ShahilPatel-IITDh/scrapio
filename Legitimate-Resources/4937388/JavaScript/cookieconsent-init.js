 (function($){

  var logCookieEnabled = true;
  var allowList = ['cc_cookie', 'has_js', 'SESS', /^Drupal/];
  var consentId = drupalSettings.cc_cookie_id || 0;

  // Banner settings
  var consentSetting = {
    autoclear_cookies: true,                   // default: false
    page_scripts: true,

    cookie: {
      name: 'cc_cookie',
    },

    guiOptions: {
      consentModal: {
        layout: 'box',                      // box,cloud,bar
        position: 'bottom right',           // bottom,middle,top + left,right,center
        transition: 'slide'                 // zoom,slide
      },
      preferencesModal: {
        layout: 'box',                      // box,bar
        // position: 'left',                // right,left (available only if bar layout selected)
        transition: 'slide'                 // zoom,slide
      }
    },

    guiOptions: {
      consentModal: {
        layout: 'cloud',                    // box,cloud,bar
        position: 'bottom center',          // bottom,middle,top + left,right,center
        transition: 'slide'                 // zoom,slide
      },
      preferencesModal: {
        layout: 'bar',                      // box,bar
        position: 'left',                   // right,left (available only if bar layout selected)
        transition: 'slide'                 // zoom,slide
      }
    },

    onFirstConsent: function(cookie){
      console.log('onFirstAction fired');
      gtmConsentUpdate(cookie)
    },

    onConsent: function () {
      console.log('onConsent fired ...');
    },

    onChange: function (cookie, changed_preferences) {
      console.log('onChange fired ...');
      gtmConsentUpdate(cookie, changed_preferences)
    },

    categories: {
      necessary: {
        readOnly: true,
        enabled: true
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^(_ga|_gid)/
            }
          ]
        }
      },
    },

    language: {
      default: drupalSettings.path.currentLanguage || 'sk',    //'en'

      translations: {
        sk: {
          consentModal: {
            title: 'PouÅ¾Ã­vame sÃºbory cookies',
            description: 'Tieto webovÃ© strÃ¡nky pouÅ¾Ã­vajÃº sÃºbory cookies a Ä�alÅ¡ie sledovacie nÃ¡stroje s cieÄ¾om vylepÅ¡enia uÅ¾Ã­vateÄ¾skÃ©ho prostredia, zobrazenia prispÃ´sobenÃ©ho obsahu a reklÃ¡m, analÃ½zy nÃ¡vÅ¡tevnosti webovÃ½ch strÃ¡nok a zdroje nÃ¡vÅ¡tevnosti.',
            acceptAllBtn: 'PrijaÅ¥ vÅ¡etko',
            acceptNecessaryBtn: 'OdmietnuÅ¥ vÅ¡etko',
            showPreferencesBtn: 'NastaviÅ¥',
          },
          preferencesModal: {
            title: 'UpraviÅ¥ predvoÄ¾by',
            acceptAllBtn: 'PrijaÅ¥ vÅ¡etko',
            acceptNecessaryBtn: 'OdmietnuÅ¥ vÅ¡etko',
            savePreferencesBtn: 'UloÅ¾iÅ¥ nastavenia',
            sections: [
              {
                title: 'PouÅ¾itie cookies ğŸ“¢',
                description: '<p>SÃºbory cookies sÃº veÄ¾mi malÃ© textovÃ© sÃºbory, ktorÃ© sa ukladajÃº do vaÅ¡ich zariadenÃ­ pri navÅ¡tevovanÃ­ webovÃ½ch strÃ¡nok. SÃºbory cookies pouÅ¾Ã­vame pre rÃ´zne ÃºÄ�ely a pre vylepÅ¡enie vÃ¡Å¡ho online zÃ¡Å¾itku na webovej strÃ¡nke (naprÃ­klad pre zapametanie prihlasovacÃ­ch Ãºdajov k vÃ¡Å¡mu ÃºÄ�tu).</p>\
                                        <br><p>Pri prezeranÃ­ naÅ¡ich webovÃ½ch strÃ¡nok mÃ´Å¾ete zmeniÅ¥ svoje predvoÄ¾by a odmietnuÅ¥ urÄ�itÃ© typy cookies, ktorÃ© sa majÃº ukladaÅ¥ do vÃ¡Å¡ho poÄ�Ã­taÄ�a. \
                                        MÃ´Å¾ete tieÅ¾ odstrÃ¡niÅ¥ vÅ¡etky sÃºbory cookies, ktorÃ© sÃº uÅ¾ uloÅ¾enÃ© vo vaÅ¡om poÄ�Ã­taÄ�i, ale majte na pamÃ¤ti, Å¾e odstrÃ¡nenie cookies vÃ¡m mÃ´Å¾e zabrÃ¡niÅ¥ pri pouÅ¾Ã­vanÃ­ Ä�astÃ­ nÃ¡Å¡ho webu. <a href="/cookies" target="_blank" class="cc-link">DalÅ¡ie informÃ¡cie</a>.</p>\
                                        <br><p>ID vÃ¡Å¡ho sÃºhlasu je ' + consentId + '</p>'
              }, {
                title: 'TechnickÃ© cookies',
                description: 'Tieto sÃºbory cookie sÃº nevyhnutnÃ© k tomu, aby sme vÃ¡m mohli poskytovaÅ¥ sluÅ¾by dostupnÃ© prostrednÃ­ctvom nÃ¡Å¡ho webu a umoÅ¾nili vÃ¡m tieÅ¾ pouÅ¾Ã­vaÅ¥ urÄ�itÃ© funkcie nÃ¡Å¡ho webu.',
                linkedCategory: 'necessary'
              }, {
                title: 'AnalytickÃ© cookies',
                description: 'Tieto sÃºbory cookies sa pouÅ¾Ã­vajÃº ku zhromaÅ¾Ä�ovaniu informÃ¡ciÃ­ pre analÃ½zu nÃ¡vÅ¡tevnosti na naÅ¡ich webovÃ½ch strÃ¡nkach a sledovanie pouÅ¾Ã­vania naÅ¡ich webovÃ½ch strÃ¡nok pouÅ¾Ã­vateÄ¾om.',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: {
                    name: 'Cookie',
                    domain: 'DomÃ©na',
                    expiration: 'ExpirÃ¡cia',
                    desc: 'Popis'
                  },
                  body: [
                    {
                      name: '^_ga',       // match all cookies starting with "_ga"
                      domain: 'google.com',
                      expiration: '2 roky',
                      desc: 'Tento nÃ¡zov sÃºboru cookie je spojenÃ½ s Google Universal Analytics - Ä�o je vÃ½znamnÃ¡ aktualizÃ¡cia beÅ¾nejÅ¡ie pouÅ¾Ã­vanej analytickej sluÅ¾by spoloÄ�nosti Google. Tento sÃºbor cookie sa pouÅ¾Ã­va na odlÃ­Å¡enie jedineÄ�nÃ½ch pouÅ¾Ã­vateÄ¾ov priradenÃ­m nÃ¡hodne vygenerovanÃ©ho Ä�Ã­sla ako identifikÃ¡tora klienta. Je zahrnutÃ¡ v kaÅ¾dej poÅ¾iadavke na strÃ¡nku na webe a slÃºÅ¾i na vÃ½poÄ�et Ãºdajov o nÃ¡vÅ¡tevnÃ­koch, relÃ¡ciÃ¡ch a kampaniach pre analytickÃ© prehÄ¾ady webovÃ½ch strÃ¡nok. PoskytovateÄ¾: Google',
                      is_regex: true
                    },
                    {
                      name: '_gid',
                      domain: 'google.com',
                      expiration: '1 deÅˆ',
                      desc: 'Tento sÃºbor cookie nastavuje sluÅ¾ba Google Analytics. UkladÃ¡ a aktualizuje jedineÄ�nÃº hodnotu pre kaÅ¾dÃº navÅ¡tÃ­venÃº strÃ¡nku a pouÅ¾Ã­va sa na poÄ�Ã­tanie a sledovanie zobrazenÃ­ strÃ¡nky. PoskytovateÄ¾: Google',
                    },
                    {
                      name: '^_gat',
                      domain: 'google.com',
                      expiration: '1 minÃºta',
                      desc: 'Toto je sÃºbor cookie typu typu nastavenÃ½ sluÅ¾bou Google Analytics, kde prvok vzoru v nÃ¡zve obsahuje jedineÄ�nÃ© identifikaÄ�nÃ© Ä�Ã­slo ÃºÄ�tu alebo webovej strÃ¡nky, ktorej sa tÃ½ka. Je to variÃ¡cia sÃºboru _gat, ktorÃ½ sa pouÅ¾Ã­va na obmedzenie mnoÅ¾stva Ãºdajov zaznamenanÃ½ch spoloÄ�nosÅ¥ou Google na webovÃ½ch strÃ¡nkach s veÄ¾kÃ½m objemom prevÃ¡dzky. PoskytovateÄ¾: Google',
                      is_regex: true
                    }
                  ]
                }
              },
              {
                title: 'Viac informÃ¡ciÃ­',
                description: 'V prÃ­pade akÃ½chkoÄ¾vek otÃ¡zok v sÃºvislosti s naÅ¡imi zÃ¡sadami tÃ½kajÃºcimi sa sÃºborov cookie a vaÅ¡im vÃ½berom nÃ¡s prosÃ­m <a class="cc-link" href="/kontakt-specialy-re-car">kontaktujte</a>.',
              }
            ]
          }
        },
        en: {
          consentModal: {
            title: 'We use cookies!',
            description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <a href="/en/cookies" target="_blank" class="cc-link">More info</a>.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage preferences',
          },
          preferencesModal: {
            title: 'Cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Save preferences',
            sections: [
              {
                title: 'Cookie usage ğŸ“¢',
                description: '<p>Cookies are very small text files that are stored on your computer when you visit a website. We use cookies for a variety of purposes and to enhance your online experience on our website (for example, to remember your account login details).</p>\
                                        <br> <p>You can change your preferences and decline certain types of cookies to be stored on your computer while browsing our website. You can also remove any cookies already stored on your computer, but keep in mind that deleting cookies may prevent you from using parts of our website. \
                                        Please read the full <a href="/en/cookies" target="_blank" class="cc-link">cookies info</a>.</p>\
                                        <br><p>Your consent ID is ' + consentId + '</p>'
              }, {
                title: 'Necessary / Essential Cookies',
                description: 'These cookies are essential for the proper functioning of the website. Without these cookies, the website would not work properly.',
                linkedCategory: 'necessary'
              }, {
                title: 'Performance and Analytics cookies',
                description: 'These cookies allow the website to remember the choices you have made in the past',
                linkedCategory: 'analytics',
                cookieTable: {
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    expiration: 'Expiration',
                    desc: 'Description'
                  },
                  body: [
                    {
                      name: '^_ga',       // match all cookies starting with "_ga"
                      domain: 'google.com',
                      expiration: '2 years',
                      desc: 'The _ga cookie, installed by Google Analytics, calculates visitor, session and campaign data and also keeps track of site usage for the site\'s analytics report. The cookie stores information anonymously and assigns a randomly generated number to recognize unique visitors.',
                      is_regex: true
                    },
                    {
                      name: '_gid',
                      domain: 'google.com',
                      expiration: '1 day',
                      desc: 'Installed by Google Analytics, _gid cookie stores information on how visitors use a website, while also creating an analytics report of the website\'s performance. Some of the data that are collected include the number of visitors, their source, and the pages they visit anonymously.',
                    },
                    {
                      name: '^_gat',
                      domain: 'google.com',
                      expiration: '1 minute',
                      desc: 'Set by Google to distinguish users.',
                      is_regex: true
                    }
                  ]
                }
              },
              {
                title: 'More information',
                description: 'For any queries in relation to my policy on cookies and your choices, please <a class="cc-link" href="/en/form/contact-form">contact me</a>.',
              }
            ]
          }
        }
      }
    }
  }


/* Make cookie conset instance global in function scope */
var cc;

// INIT CookieConsent
$(function () {
    // obtain cookieconsent plugin
    cc = CookieConsent.init();
    cc.run(consentSetting);

    cc_text = 'Cookie settings';
    if (consentSetting.language.default == 'sk') {
      cc_text = 'Nastavenia cookies';
    }
    // Add Cookie settings button.
    let btn = document.createElement("div");
    btn.setAttribute('class', 'c-settings');
    btn.innerHTML = '<div class="cc-image"><svg xmlns="http://www.w3.org/2000/svg" ' +
      'height="100%" viewBox="0 0 24 24" width="100%" fill="currentColor" aria-hidden="true">' +
      '<path d="M0 0h24v24H0V0z" fill="none"></path>' +
      '<path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7-.23.16-.54.11-.7-.12-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21zm6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15zm7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12zM14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94s3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38z"></path>' +
      '</svg></div>' +
      '<div class="cc-text">' + cc_text + '</div>';
    btn.addEventListener("click", function () {
      cc.showPreferences()
    });
    document.body.appendChild(btn);

    console.log("init consent")
    // Set theme for banner - dark mode.
    //document.body.classList.toggle('theme_cesta_dark');

    blockCookies();
    var blockCookiesInterval = setInterval(blockCookies, 30 * 1000);
});

  /*------ CALLBACK METHODs -----*/


  /**
   * callback to onAccept|onChange
   * @param {Object} cookieSetting - cookie values
   * @param {array} changed_preferences - all defined languages
   * @returns void
   */
  function gtmConsentUpdate(cookieSetting, changed_preferences) {
    console.log('onChange fired ...');

      if (cookieSetting.categories.includes('analytics')) {
          console.log('consent: set analytics granted.')
          
          // gtag('consent', 'update', {
          //     'analytics_storage': 'granted',
          // });
          // for smartlook
          //dataLayer.push({'event':'cookie_consent_analytics'});
      } else {
          console.log('consent: set analytics denied')

          typeof gtag === 'function' && gtag('consent', 'update', {
            'analytics_storage': 'denied'
          });
          // gtag('consent', 'update', {
          //     'analytics_storage': 'denied',
          // });
      }

      if (cookieSetting.categories.includes('marketing')) {
          console.log('consent: set marketing granted')

          // gtag('consent', 'update', {
          //     'ad_storage': 'granted',
          // });
      } else {
          console.log('consent: set marketing denied')

          // gtag('consent', 'update', {
          //     'ad_storage': 'denied',
          // });
      }

      getCsrfToken(function (csrfToken) {
        postCookieConsent(csrfToken, cookieSetting.categories);
      });
  }

  function getCsrfToken(callback) {
   $.get(Drupal.url('session/token'))
     .done(function (data) {
       var csrfToken = data;
       callback(csrfToken);
     });
  }

  function postCookieConsent(csrfToken, cookieSetting) {
   $.ajax({
     url: '/cookie-consent-data?_format=json',
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'X-CSRF-Token': csrfToken
     },
     data: JSON.stringify(cookieSetting),
     success: function (cookieSetting) {
       console.log(cookieSetting);
     },
   });
  }

  // Block cookies when the user hasn't agreed.
  function blockCookies() {
    console.log('check cookies..');
    var hostname = window.location.hostname;
    var allowList = _getWhiteList();

    // Load all cookies
    var cookies = Cookies.get();

    // Check each cookie and try to remove it if it's not allowed.
    for (var cookieName in cookies) {

      var isAllowed = allowList.some(function(item){
        if (cookieName == item) {
          return true;    
        } else {
          try {
            //var regexp = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.+') + '$', 'g');
            var regexp = new RegExp(item, 'g');
            return regexp.test(cookieName);
          }
          catch (err) {
             isAllowed =  false;
          }
        }
        return false;
      });


      //console.log("Cookie " + cookieName + (isAllowed ? ' Allowed': ' NOT allowed'));
      // Remove not allowed cookie
      if (!isAllowed){
        console.log('Remove cookie:', cookieName);

        var cookieRemoved = Cookies.remove(cookieName);
        if (!cookieRemoved) _eraseCookies([cookieName]);
        if (!Cookies.get(cookieName)) {
          console.log("Cookie " + cookieName + " removed.");
        }
        //Log uknown cookie
        var allCookes = _getKnownCookies();
        var knownCookie = allCookes.some(function(item){
          if (cookieName == item) {
            return true;    
          } else {
            try {
              //var regexp = new RegExp('^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.+') + '$', 'g');
              var regexp = new RegExp(item, 'g');
              return regexp.test(cookieName);
            }
            catch (err) {
               isAllowed =  false;
            }
          }
          return false;
        });

        // if (!knownCookie){
        //   _logUnknownCookie(cookieName);
        // }
      }
    }
  }

  /*------ HELPER METHODs -----*/
  
  /**
    If user took action
    return bool
  */
  function _isBannerAccepted(){
    var saved_cookie_content = JSON.parse(Cookies.get(cc.getConfig('cookie').name) || "{}");
    var cookie_consent_accepted = saved_cookie_content['level'] !== undefined;

    return cookie_consent_accepted;
  }

  /**
    Return cookies from cookieTable in settings
    return format: {category: [cookie1, cookie2], }
  */
  function _getCookieTable() {
    var lang = consentSetting.language.default;
    var all_blocks = consentSetting.language['translations'][lang]['preferencesModal']['sections'];

    var n_blocks = all_blocks.length;
    var cookie_tables = {};
    for (var i = 0; i < n_blocks; ++i) {
      var curr_block = all_blocks[i];
      if (Object.prototype.hasOwnProperty.call(curr_block, "linkedCategory")) {
        var category = curr_block["linkedCategory"];
        cookie_tables[category] = [];
        if (Object.prototype.hasOwnProperty.call(curr_block, "cookieTable")) {
          if ('body' in curr_block['cookieTable']) {
            for (var row of curr_block['cookieTable']['body']) {
              var cookieName = row['name'];
              cookie_tables[category].push(cookieName);
            }
          }
        }
      }
    }
    return cookie_tables;
  }


  /**
    @return array
  */
  function _getKnownCookies() {
    var list = []
    var cookieList = _getCookieTable();
    for (var category in cookieList) {
        list = list.concat(cookieList[category])
    }
    return list.concat(allowList)
  }

  /**
    @return array
  */
  function _getWhiteList() {
    var list = []
    var cookieList = _getCookieTable();

    if(_isBannerAccepted()){
        var accepted_categories = cc.getUserPreferences()["accepted_categories"];
        accepted_categories.forEach(function(category){
            if (category in cookieList) {
                list = list.concat(cookieList[category])
            }
        })
    }
    return allowList.concat(list);
  }

  /**
   * Delete cookie by name & path
   * @param {string[]} cookies
   * @param {string} [custom_path] - optional
   */
  var _eraseCookies = function(cookies, custom_path) {
      var path = custom_path ? custom_path : '/';
      var expires = 'Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      var domains = _getDomains();

      for(var i=0; i<cookies.length; i++){
          for(var j=0; j<domains.length; j++){
              document.cookie = cookies[i] + '=; path=' + path +
              (domains[j].indexOf('.') > -1 ? '; domain=' + domains[j] : "") + '; ' + expires;
          }
          //console.log("CookieConsent : deleting cookie: '" + cookies[i] + "' path: '" + path + "' domain:", domains);
      }
  }

  /**
   * Return domains. default hostname.
   * If on subdomain, return also sndleveldomain
   * 
   * @return array
   */
  var _getDomains = function(){
    var domains = [], subdomain;
    var hostname = window.location.hostname;
    
    var parts = hostname.split(".");
    var sndleveldomain = parts.slice(-2).join('.');
    if (parts.length > 2) {
      subdomain = parts.shift();
    }

    domains.push(hostname);
    domains.push("."+hostname);

    if (subdomain == 'kalendar') {
      return domains;
    }

    if (subdomain) {
      domains.push(sndleveldomain)
      domains.push("."+sndleveldomain)
    }
    return domains;
  }

  function _logUnknownCookie(cookieName) {
      //console.log('LOG cookieNAme: ', cookieName)
      if (logCookieEnabled) {
        var url = drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix + 'cookieconsent/log-unknown-cookie/'+cookieName;
        $.post(url, {}, function (data) { 
          console.log(data)
        });
      }
  }

}(jQuery));
