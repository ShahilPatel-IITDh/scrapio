if ('off' === jQuery.cookie('porto_ads_status')) {

} else {
    jQuery('.porto-block-html-top > div').removeClass('d-none').append('<button class="mfp-close"></button>');
}
jQuery('body').on('click', '.porto-block-html-top .mfp-close', function() {
   jQuery(this).parent().fadeOut();
   jQuery.cookie('porto_ads_status', 'off', { expires : 7 });
});