window.consent = {
  enabled: true,
  states: {
     first: false,
     manager: false,
     provided: false,
     closed: false,
     complete: false,
  },
  record: function (state, track, categories) {
    if (window.consent.enabled === true) {
      if (track === true) {

        var data = {
          'name': 'sourcepoint.consent',
          'action': state,
        };

        if (categories) {
          data.categories = categories;
        }

        window.tedl = window.tedl || {};
        window.tedl.events = window.tedl.events || [];
        window.tedl.events.push(data);

      }
    }
  }
};

window._cmp_ = {
  config: {
    baseHref: 'https://consent.economist.com',
    propertyHref: 'https://www.economist.com',
    targetingParams: {
      isGroupSub: `; ${document.cookie}`.split('; isGroupSub=').length === 2
        ? `; ${document.cookie}`.split('; isGroupSub=').pop().split(';').shift()
        : false,
      isApp: window.location.search.includes('app=core') || window.location.search.includes('app=espresso')
    },
    gdpr: {
      includeTcfApi: false,
      privacyManager: 814270
    },
    ccpa: {
      privacyManager: 744617
    },
    accountId: 1747,
    permutive: {
      enabled: true
    },
    autoload: true,
    joinHref: true,
    events: {
      onConsentReady: function (type, uuid, consent) {
        if (type === 'ccpa') {
          if (consent.indexOf('---') === -1) {
            window.consent.states.provided = true;
            if (uuid !== null) {
              window.consent.states.complete = true;
            }
          }
        } else if (type === 'gdpr') {
          if (uuid !== null) {
            window.consent.states.provided = true;
            window.consent.states.complete = true;
          }
        }
        window.consent.record('ready', true);
      },
      onReady: function (type) {
        if (type === 'gdpr') {
          if (window.consent.states.provided === false) {
            if (window.consent.states.first === false && window.consent.states.manager === false) {
              window.consent.states.first = true;
              window.consent.states.manager = false;
              window.consent.record('visible.' + type, true);
            }
          } else {
            window.consent.states.first = false;
            window.consent.states.manager = true;
          }
        } else if (type === 'ccpa') {
          if (window.consent.states.first === false && window.consent.states.manager === false) {
            window.consent.states.first = true;
            window.consent.states.manager = false;
            window.consent.record('visible.' + type, true);
          }
        }
      },
      onCancel: function (type) {
        window.consent.states.first = (window.consent.states.provided === true ? false : true);
        window.consent.states.closed = true;
        window.consent.states.manager = false;
        if (type !== 'ccpa') {
          window.consent.states.complete = window.consent.states.provided;
        }
      },
      onAction: function (type, data) {
        setTimeout(function () {
          if (window.consent.states.closed !== true) {
            if (type === 'gdpr') {
              if (data) {
                if (data.purposeConsent === 'none' && data.vendorConsent === 'none') {
                  window.consent.record('declined', true);
                }
                else {
                  window._sp_.gdpr.getCustomVendorConsents(function(consents, success) {
                    window.consent.record(
                      'provided.categories',
                      true,
                      consents.consentedPurposes.map(function(purpose) {
                          return purpose.name;
                      }).join(',')
                    );
                  });
                }
              }
            } else if (type === 'ccpa') {
              
            }
            window.consent.states.first = false;
            window.consent.states.manager = false;
          }
          window.consent.states.closed = false;
        }, 500);
      },
      onSelect: function (type, choice) {
        switch (choice.type) {
          case 11: // The user has chosen the "Accept All" option in a consent message
            window.consent.states.first = false;
            window.consent.states.manager = false;
            window.consent.states.complete = true;
            window.consent.record('provided.' + type, true);
            break;
          case 12: // The user has chosen to view a privacy manager (consent preferences) UI.
            window.consent.states.first = false;
            window.consent.states.manager = true;
            window.consent.record('manager.consent', true);
            break;
          case 13: // The user has chosen the "Reject All" message from a consent message
            window.consent.states.first = false;
            window.consent.states.manager = false;
            window.consent.states.complete = true;
            window.consent.record('declined', true);
            break;
        }
      },
      onPrivacyManager: function (state) {
        if (state === 'open') {
          window.consent.states.first = false;
          window.consent.states.manager = true;
          window.consent.record('manager.footer', true);
        }
      },
    },
  },
};
