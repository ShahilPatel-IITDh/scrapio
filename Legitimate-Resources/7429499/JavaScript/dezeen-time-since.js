jQuery( document.body ).trigger( 'post-load' );

jQuery(document).ready(function($) {
    jQuery.timeago.settings.cutoff = 1000*60*60*24;
    jQuery.timeago.settings.strings.minute = '1 minute';
    jQuery.timeago.settings.strings.hour = '1 hour';
    jQuery.timeago.settings.strings.hours = '%d hours';
    
    $('.main-story-list time').timeago();
    $('.single time').timeago();
    
});
