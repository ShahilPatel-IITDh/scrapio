/*
 * Settings of the sticky menu
 */
jQuery(document).ready(function(){
   var wpAdminBar = jQuery('#wpadminbar');
   if (wpAdminBar.length) {
      jQuery('#sticky_header').sticky({topSpacing:wpAdminBar.height(), zIndex:'999'});
   } else {
      jQuery('#sticky_header').sticky({topSpacing:0, zIndex:'999'});
   }
});