
      function feedback() {
        const p = window.Shopify.customerPrivacy;
        console.log(`Tracking ${p.userCanBeTracked() ? "en" : "dis"}abled`);
      }
      window.Shopify.loadFeatures(
        [
          {
            name: "consent-tracking-api",
            version: "0.1",
          },
        ],
        function (error) {
          if (error) throw error;
          if ("Cookiebot" in window)
            if (Cookiebot.consented || Cookiebot.declined) {
              window.Shopify.customerPrivacy.setTrackingConsent(!Cookiebot.declined, feedback);
              return;
            }
          window.Shopify.customerPrivacy.setTrackingConsent(false, feedback);
        }
      );
      window.addEventListener("CookiebotOnConsentReady", function () {
        window.Shopify.customerPrivacy.setTrackingConsent(!Cookiebot.declined, feedback);
      });
    