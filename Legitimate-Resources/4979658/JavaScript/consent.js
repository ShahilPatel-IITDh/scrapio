var logRegEvent = MatchCore.CPX.Logging.logRegEvent;

var consentAccepted = window.consentAccepted || false;
var lastClick, lastClickTarget;
var modalOpened = true;
var personalizedConsent = false;
var logMessages = {
  DEFAULT_ACCEPT_ALL: "{ Main Modal: Accept All }",
  PERSONALIZE: "{ Main Modal: Personalize }",
  PERSONALIZE_REJECT_ALL: "{ Personalize Modal: Reject All }",
  PERSONALIZE_ALLOW_ALL: "{ Personalize Modal: Allow All }",
  PERSONALIZE_ALLOW_ADS: "{ Personalize Modal: Confirm with ad }",
  PERSONALIZE_REJECT_ADS: "{ Personalize Modal: Confirm without ad }",
  REG_STARTED: "{ Action Executed: Main CTA }",
  SIGN_IN: "{ Action Executed: Sign In }",
  MODAL_DISPLAYED: "{ Modal Displayed }",
  MODAL_CLOSED: "{ Modal Closed }",
  TRIGGER_REG_STARTED: "{ Trigger Action: Main CTA }",
  TRIGGER_SIGN_IN: "{ Trigger Action: Sign In }",
};

function acceptConsentCallback() {
  if (personalizedConsent) {
    //... do logic to match purposeIds between the userPrefs and groups, then log status as desired.
    var update = OneTrust.GetDomainData();
    var choices = update.ConsentIntegrationData.consentPayload.purposes;
    var confirmed = [];
    var groups = update.Groups;
    choices.forEach(function (choice) {
      if (choice.TransactionType == "CONFIRMED") {
        groups.forEach(function (group) {
          if (group.PurposeId == choice.Id) {
            confirmed.push(group);
          }
        });
      }
    });
    // console.log('confirmed', confirmed);
    if (confirmed.length == choices.length - 1) {
      logRegEvent(0, logMessages.PERSONALIZE_ALLOW_ALL);
    } else if (confirmed.length == 0) {
      logRegEvent(0, logMessages.PERSONALIZE_REJECT_ALL);
    } else {
      var ads = false;
      confirmed.forEach(function (category) {
        if (category.GroupName == "Advertising Cookies") {
          ads = true;
        }
      });
      if (ads) {
        logRegEvent(0, logMessages.PERSONALIZE_ALLOW_ADS);
      } else {
        logRegEvent(0, logMessages.PERSONALIZE_REJECT_ADS);
      }
    }
  }
  if (lastClickTarget) {
    if (lastClick == "buttonPrimary") {
      logRegEvent(0, logMessages.REG_STARTED);
    } else if (lastClick == "loginLink") {
      logRegEvent(0, logMessages.SIGN_IN);
    }
    $jq(lastClickTarget)[0].click();
  }
  logRegEvent(0, logMessages.MODAL_CLOSED);
  modalOpened = false;
  $jq('select[name="ggs"]').focus();
}

(function ($) {
  $(document).on("mousedown", "#onetrust-pc-btn-handler", function (e) {
    personalizedConsent = true;
    logRegEvent(0, logMessages.PERSONALIZE);
  });
  $(document).on("mousedown", "#onetrust-accept-btn-handler", function (e) {
    // if(consentAccepted){
    //     return;
    // }
    logRegEvent(0, logMessages.DEFAULT_ACCEPT_ALL);
  });

  $(document).ready(function () {
    showBanner();
    $(".button-submit").on("mousedown", function (e) {
      if (!consentAccepted) {
        e.preventDefault();
        lastClick = "buttonPrimary";
        lastClickTarget = e.currentTarget;
        logRegEvent(0, logMessages.TRIGGER_REG_STARTED);
        showBanner();
      }
    });

    $(".Login_sift").on("mousedown", function (e) {
      if (!consentAccepted) {
        e.preventDefault();
        lastClick = "loginLink";
        lastClickTarget = e.currentTarget;
        logRegEvent(0, logMessages.TRIGGER_SIGN_IN);
        showBanner();
      }
    });

    function handleKeyboardCTA() {
      if (!consentAccepted && !modalOpened) {
        lastClick = "buttonPrimary";
        lastClickTarget = $(".button-submit")[0];
        logRegEvent(0, logMessages.TRIGGER_REG_STARTED);
        showBanner();
      } else {
        $(".button-submit").click();
      }
    }

    function showBanner() {
      $("#onetrust-banner-sdk").attr({
        role: "dialog",
        "aria-modal": true,
        "aria-labelledby": "onetrust-policy-title",
      });

      $("#onetrust-banner-sdk").show();
      $("#onetrust-consent-sdk").css({ "z-index": "auto", opacity: 1 });

      modalOpened = true;
      $("#onetrust-accept-btn-handler").focus();

      logRegEvent(0, logMessages.MODAL_DISPLAYED);
    }

    $(document).on("keydown", function (e) {
      if (e.which === 32) {
        if (e.target.id === "onetrust-pc-btn-handler") {
          if (!personalizedConsent) {
            personalizedConsent = true;
            logRegEvent(0, logMessages.PERSONALIZE);
          }
        }
        if (e.target.id === "onetrust-accept-btn-handler") {
          logRegEvent(0, logMessages.DEFAULT_ACCEPT_ALL);
        }
        if (e.target.id === "viewSingles") {
          e.preventDefault();
          handleKeyboardCTA();
          return;
        }
      }
      if (e.which === 13) {
        if (e.target.tagName !== "A") {
          e.preventDefault();
          handleKeyboardCTA();
          return;
        }
      }
    });
  });
})(jQuery);
