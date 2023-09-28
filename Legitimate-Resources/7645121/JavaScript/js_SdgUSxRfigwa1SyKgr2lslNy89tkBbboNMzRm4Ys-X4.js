/**
 * @file
 * Add extra data for Webtools analytics.
 */
(function (drupalSettings) {
  'use strict';

  Drupal.behaviors.webtoolsAnalyticsCustomDimensions = {
    attach: function attach(context, settings) {
      if ($wt.analytics.isTrackable()) {
        let _paq = window._paq || [];
        drupalSettings.webtoolsAnalyticsDimensions.forEach((element) => {
          _paq.push(['setCustomDimension', element.id, element.value]);
        });
      }
    }
  }

})(drupalSettings);

;
