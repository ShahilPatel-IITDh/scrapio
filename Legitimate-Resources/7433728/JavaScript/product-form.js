/** Shopify CDN: Minification failed

Line 12:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 17:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 18:4 Transforming let to the configured target environment ("es5") is not supported yet
Line 25:2 Transforming let to the configured target environment ("es5") is not supported yet

**/
document.addEventListener('DOMContentLoaded', (event) => {
  $('#addToCart').on('click', function(e) {
    
    const submitButton = $(this);

    submitButton.attr('disabled', true);
    submitButton.addClass('loading');
	
    let variant = $('[name="id"]').val();
    let qty = $('#qty').val();
    
    addToCart(variant,qty,submitButton);
  });
});

function addToCart(x,y,z) {
  let formData = {
    'items': [{
      'id': x,
      'quantity': y
    }]
  };

  console.log(formData);

  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    return response.json();
  })
  .catch((error) => {
    //not printing error to console on status 400?!
    console.error('Error:', error);
  })
  .finally(() => {       
    toggleCartDrawer(true);
    z.removeClass('loading');
    z.attr('disabled', false);
    pinTrigger(true);

    // Implement this
    //refreshShippingBanner();
  });
}