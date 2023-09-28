
document.getElementById('systemjs-loader').addEventListener('load', function() {
  System.config({
    baseURL: "https:\/\/www.f-cdn.com" + "/assets"
  });
  window.define = SystemJS.amdDefine;
  window.require = window.requirejs = SystemJS.amdRequire;
  System.config({
    packages: {
      bundles: {
        meta: {
          "*": {
            scriptLoad: true
          }
        }
      }
    }
  });
  if (window.performance && window.performance.mark) {
    window.performance.mark('systemjs_loader_ready');
  }
});

document.getElementById('systemjs-config').addEventListener('load', function() {
  if (window.performance && window.performance.mark) {
    window.performance.mark('systemjs_config_ready');
  }

  System.register(
    'server-data/login-signup-angular', [], function(__export) {
            var showSignup;
      var redirectUrl;
      var isLoggedOutHeader;
      return {
        setters: [],
        execute: function() {
                    __export('showSignup', null);
          __export('redirectUrl', null);
          __export('isLoggedOutHeader', true);
          }
      };
    }
  );
  System.register(
    'server-data/text-to-posts', [], function(__export) {
            var isContest;
      return {
        setters: [],
        execute: function() {
                    __export('isContest', null);
          }
      };
    }
  );
  System.register(
    'server-data/header', [], function(__export) {
            var disappearingLinksOnScroll;
      return {
        setters: [],
        execute: function() {
                    __export('disappearingLinksOnScroll', null);
          }
      };
    }
  );
  System.register(
    'server-data/footer-locale-selector', [], function(__export) {
            var isAuth;
      var currentRegion;
      var currentDomain;
      var currentLanguage;
      return {
        setters: [],
        execute: function() {
                    __export('isAuth', "");
          __export('currentRegion', "Latin America");
          __export('currentDomain', "Colombia");
          __export('currentLanguage', "Espa\u00f1ol");
          }
      };
    }
  );
  System.register(
    'server-data/flconfigs', [], function(__export) {
            var sslBaseUrl;
      var cookieBase;
      var notifyServer;
      var flnBillingBaseUrl;
      var languageCode;
      var cookieDomain;
      var siteName;
      var cdnUrls;
      var facebookAppId;
      var enterprise;
      var userJobs;
      var messagingABTests;
      var globalMatchmakingABTests;
      var recaptchaPublicKey;
      return {
        setters: [],
        execute: function() {
                    __export('sslBaseUrl', "https:\/\/www.freelancer.com.co");
          __export('cookieBase', "GETAFREE");
          __export('notifyServer', "\/\/notifications.freelancer.com");
          __export('flnBillingBaseUrl', "https:\/\/api.freelancerbilling.com");
          __export('languageCode', "es");
          __export('cookieDomain', ".freelancer.com.co");
          __export('siteName', "freelancer.com.co");
          __export('cdnUrls', ["cdn2.f-cdn.com","cdn3.f-cdn.com","cdn5.f-cdn.com","cdn6.f-cdn.com"]);
          __export('facebookAppId', "120131118061981");
          __export('enterprise', null);
          __export('userJobs', null);
          __export('messagingABTests', []);
          __export('globalMatchmakingABTests', []);
          __export('recaptchaPublicKey', "6Lc1CCcTAAAAABxlulYmWJj_ZNAHHegrhLV3vS2Z");
          }
      };
    }
  );
  System.register(
    'server-data/tracking', [], function(__export) {
            var qtsHttpEndpoint;
      return {
        setters: [],
        execute: function() {
                    __export('qtsHttpEndpoint', "\/\/t.freelancer.com\/");
          }
      };
    }
  );

  System.register(
    'angular-server-data/flconfigs',
    ['angular'],
    function(__export) {
      var angular;
      var messagingABTests;
      var globalMatchmakingABTests;
      return {
        setters: [
          function(ng) {
            angular = ng.default;
          }
        ],
        execute: function() {
          angular.module('flconfigs/messagingABTests', []).constant(
              'messagingABTests', []
            );
            __export('messagingABTests', 'flconfigs/messagingABTests');
          angular.module('flconfigs/globalMatchmakingABTests', []).constant(
              'globalMatchmakingABTests', []
            );
            __export('globalMatchmakingABTests', 'flconfigs/globalMatchmakingABTests');
          }
      };
    }
  );

  System.import('modules/login-signup-angular');
  System.import('modules/text-to-post');
  System.import('modules/header');
  System.import('modules/project-view-logged-out');
  System.import('modules/footer-locale-selector');
  System.import('modules/footer-site-stats');
  System.import('modules/footer-new');
  System.import('modules/tracking');
  System.import('modules/gdpr-consent');
});
