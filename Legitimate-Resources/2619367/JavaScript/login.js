jQuery(document).ready(function() {
    jQuery('[data-role=logged-in-dropdown]').bind('mouseover', openSubMenu);
    jQuery('[data-role=logged-in-dropdown]').bind('mouseout', closeSubMenu);

    function openSubMenu() {
        jQuery(this).find('#loggedInSubMenu').css('visibility', 'visible');
    };

    function closeSubMenu() {
        jQuery(this).find('#loggedInSubMenu').css('visibility', 'hidden');
    };

   jQuery.ajax({
      //url: ccs.contextPath + '/json/' + ccs.appName + '/' + ccs.languageCode + '/modules/self_service/getExpandedDealDetails.json?accountRefNum=' + accountRefNum,
      url: ccs.contextPath + '/modletInclude/login/jsp/getUsername.jsp',
      dataType: 'html',
      async: true,
      cache: false,
      error: function (e) {
         //todo: handle error
         //jQuery("#spinner_" + accountRefNum).hide();
      },
      success: function (response) {
         jQuery("#header_login").html(response);
         checkLoginState();
        if (jQuery(window).width() < 925) {
            jQuery('.login_disabled').click(function(){
                jQuery('.toolip_login').toggleClass('active');
            });
        }
      }
   });
});