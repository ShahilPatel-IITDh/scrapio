
  var _learnq = _learnq || [];
  function addedToCart() {
    fetch(`${window.location.origin}/cart.js`)
    .then(res => res.clone().json().then(data => {
      var cart = {
        total_price: data.total_price/100,
        $value: data.total_price/100,
        total_discount: data.total_discount,
        original_total_price: data.original_total_price/100,
        items: data.items
      }
      if (item !== 'undefined') {
        cart = Object.assign(cart, item)
      }
      _learnq.push(['track', 'Added to Cart', cart])
    }))
  } 
  (function (ns, fetch) {
    ns.fetch = function() {
      const response = fetch.apply(this, arguments);
      response.then(res => {
        if (`${window.location.origin}/cart/add.js`
        	.includes(res.url)) {
          	addedToCart()
        }
      });
      return response
    }
  }(window, window.fetch))
  $(document).ajaxComplete(function(event, request, settings){
    if(settings.url == "/cart/add.js"){
        addedToCart()
    }
  })