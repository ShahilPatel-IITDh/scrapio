
jQuery(function ($) { $(document).on('show_variation', function (event, variation, purchasable) { if(variation.cashback_amount) { $('.on-woo-wallet-cashback').show(); $('.on-woo-wallet-cashback').html(variation.cashback_html); } else { $('.on-woo-wallet-cashback').hide(); } }) });
