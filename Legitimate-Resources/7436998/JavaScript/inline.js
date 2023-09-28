
    if (window.location.search.indexOf('failedJS') !== -1
        || window.location.search.indexOf('failedAPIRequest') !== -1) {
      if (window.location.href.indexOf('subscriptions/unsubscribed') !== -1) {
        document.getElementById('onsite-consent-pages-root').style.display = 'none';
        document.getElementById('unsubscribe-success-fallback').style.display = 'block';
      } else if (window.location.href.indexOf('subscriptions/unsubscribe') !== -1) {
        document.getElementById('unsubscribe-fallback').style.display = 'block';
        document.getElementById('onsite-consent-pages-root').style.display = 'none';
        document.getElementById('unsubscribe-form').onsubmit = handleSubmit;
      }
    }
  