
if (typeof loadCheckResult === 'undefined') {
  let loadCheckResult = null;
}
loadCheckResult = (checkFnArgs =>
    // IE11 users will LOVE this concatenation
    // eslint-disable-next-line prefer-template
    document.getElementById('gen-nav-' + checkFnArgs[0]))(["footer"]);
if (!loadCheckResult) {
  (fragmentPath => {
  const error = new Error(
    // eslint-disable-next-line prefer-template
    'ESI fragment ' + fragmentPath + ' requested, but not found in client',
  );
  // eslint-disable-next-line no-undef
  if (window.newrelic) {
    console.warn(error);
    // eslint-disable-next-line no-undef
    newrelic.noticeError(error, {
      type: 'ESI_LOAD_ERROR',
      fragment: fragmentPath,
    });
  } else {
    throw error; // let another monitoring system catch the error.
  }
})('footer')
} else if (loadCheckResult.id && loadCheckResult.id.includes && loadCheckResult.id.includes('skipped')) {
  (fragmentPath => {
  // eslint-disable-next-line no-undef
  if (window.newrelic) {
    // eslint-disable-next-line no-undef
    newrelic.addPageAction('ESI_LOAD_SKIPPED', { fragment: fragmentPath });
  }
})('footer')
} else {
  (fragmentPath => {
  // eslint-disable-next-line no-undef
  if (window.newrelic) {
    // eslint-disable-next-line no-undef
    newrelic.addPageAction('ESI_LOAD', { fragment: fragmentPath });
  }
})('footer')
}
