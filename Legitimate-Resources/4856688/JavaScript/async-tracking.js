
  // init gtm just to be sure it exists
  window.dataLayer = window.dataLayer || [];

  // user sensitive data
  var userData = {
    diw: {
      userId: '',
      userEmailHashed: '',
            },
    emarsys_cartToken: 'NmPRAcmcv7lZStSTIONxNwJmjdDcGzfl'
  };
  window.dataLayer.push(userData);

  // emarsys cart items
  var EMARSYS_CART_ITEMS = 'emarsysCartItems';
  if (localStorage.getItem(EMARSYS_CART_ITEMS)) {
    window.dataLayer.push(JSON.parse(localStorage.getItem(EMARSYS_CART_ITEMS)));
  }
  localStorage.setItem(EMARSYS_CART_ITEMS, JSON.stringify({
    emarsysCartItems: [
            ]
  }));

    window.dataLayer.push({event: EMARSYS_CART_ITEMS});
  

  // talkable integration
  if (!window._talkableq) {
    window._talkableq = window._talkableq || [];
    window._talkableq.unshift(['init', {site_id: 'armedangels-shopware'}]);
    window._talkableq.push(['authenticate_customer', {
      email: '',
      first_name: '',
      last_name: '',
      traffic_source: 'facebook'
    }]);
    window._talkableq.push(['register_affiliate', {}]);
  }
