if ($) {
  $(function () {
    //- Referral
    try {
      var urlParams = new URLSearchParams(window.location.search);
      var match = urlParams.get('ots-cmpgn-refer');
      if (match) {
        $.get('/analytics/setCampaignSession?ots-cmpgn-refer=' + encodeURIComponent(match));
      }
    } catch (err) {
      console.log('Could not refer campaign');
    }
  });
}
