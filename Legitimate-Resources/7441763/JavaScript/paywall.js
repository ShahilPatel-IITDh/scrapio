tp = window.tp || [];
jQuery(function ($) {
  // var gourl;
  // var curloc = window.location.href;

  pianoLoginLogoutButtons = function () {
    if (tp.user.isUserValid()) {
      //$( '#piano-logout-container' ).show();
      //$( '#piano-login-register-container' ).hide();
      $("#head-logout").css("display", "inline");
      $("#head-my-account").css("display", "inline");
      $("#head-login").css("display", "none");
      //$("#signupbtn").css('display', 'none');
      //$("#btnsubscribe").css('display', 'none');
      //$("#block-subscription-5").css('display', 'none');
    } else {
      //$( '#piano-logout-container' ).hide();
      //$( '#piano-login-register-container' ).show();
      $("#head-logout").css("display", "none");
      $("#head-my-account").css("display", "none");
      $("#head-login").css("display", "inline");
      //$("#signupbtn").css('display', 'inline');
      //$("#btnsubscribe").css('display', 'inline');
      //$("#block-subscription-5").css('display', 'inline');
    }
  };
  pianoLoginLogoutButtonsmobile = function () {
    if (tp.user.isUserValid()) {
      $("#mobile-head-logout").css(
        "display",
        "inline"
      );
      //for mobile devices
      $(".region-off-canvas .menu--account .menu #logout").css(
        "display",
        "inline"
      );
      $(".region-off-canvas .menu--account .menu #btnmyaccount").css(
        "display",
        "inline"
      );
      $(".region-off-canvas .menu--account .menu #loginbtn").css(
        "display",
        "none"
      );
      $(".region-off-canvas .menu--account .menu #signupbtn").css(
        "display",
        "none"
      );
      $(".region-off-canvas .menu--account .menu #btnsubscribe").css(
        "display",
        "none"
      );
      $(".region-off-canvas .menu--account .menu #block-subscription-5").css(
        "display",
        "none"
      );
    } else {
      $("#mobile-head-logout").css(
        "display",
        "none"
      );
      //for mobile devices
      $(".region-off-canvas .menu--account .menu #logout").css(
        "display",
        "none"
      );
      $(".region-off-canvas .menu--account .menu #btnmyaccount").css(
        "display",
        "none"
      );
      $(".region-off-canvas .menu--account .menu #loginbtn").css(
        "display",
        "inline"
      );
      $(".region-off-canvas .menu--account .menu #signupbtn").css(
        "display",
        "inline"
      );
      $(".region-off-canvas .menu--account .menu #btnsubscribe").css(
        "display",
        "inline"
      );
      $(".region-off-canvas .menu--account .menu #block-subscription-5").css(
        "display",
        "inline"
      );
    }
  };

  tp.push([
    "init",
    function () {
      pianoLoginLogoutButtons();
      pianoLoginLogoutButtonsmobile();

      // var login_cookie_val = document.cookie.match(
      //   new RegExp("(^| )login_cookie=([^;]+)")
      // );
      //
      // if (!login_cookie_val) {
      //   tp.pianoId.show({
      //     screen: "login",
      //     displayMode: "inline",
      //     containerSelector: ".login-container",
      //     loggedIn: function (data) {
      //       var params = { rid: "RTS6W4X" };
      //       var callback = function (response) {
      //         console.log(response);
      //         if (response.access && response.access.granted) {
      //           // the user has access
      //           $.ajax({
      //             url: paywall_ajax_obj.ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
      //             method: "POST",
      //             data: {
      //               action: "paywall_ajax_request",
      //               data: data,
      //               security: paywall_ajax_obj.security,
      //               hasaccess: 1,
      //             },
      //             success: function (data) {
      //               // This outputs the result of the ajax request
      //               console.log(data);
      //               window.location.href = "/";
      //             },
      //             error: function (errorThrown) {
      //               console.log(errorThrown);
      //             },
      //           });
      //         } else {
      //           $.ajax({
      //             url: paywall_ajax_obj.ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
      //             method: "POST",
      //             data: {
      //               action: "paywall_ajax_request",
      //               data: data,
      //               security: paywall_ajax_obj.security,
      //               hasaccess: 0,
      //             },
      //             success: function (data) {
      //               // This outputs the result of the ajax request
      //               console.log(data);
      //               //window.location.href = prevloc;
      //               window.location.href = "/";
      //             },
      //             error: function (errorThrown) {
      //               console.log(errorThrown);
      //             },
      //           });
      //           // the user does not have access
      //         }
      //       };
      //       tp.api.callApi("/access/check", params, callback);
      //
      //       //location.reload();
      //     },
      //   });
      // }

      $("#head-logout").click(function () {
        // var prevloc = window.location.href;
        $.ajax({
          url: paywall_ajax_obj.ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
          method: "POST",
          data: {
            action: "paywall_ajax_request",

            security: paywall_ajax_obj.security,
            logout: true,
          },
          success: function (data) {
            // This outputs the result of the ajax request
            tp.pianoId.logout();

            // location.reload();
            window.location.href = "/";
            //window.location.href = prevloc;
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          },
        });
      });
      $("#mobile-head-logout").click(function () {
        var prevloc = window.location.href;
        $.ajax({
          url: paywall_ajax_obj.ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
          method: "POST",
          data: {
            action: "paywall_ajax_request",

            security: paywall_ajax_obj.security,
            logout: true,
          },
          success: function (data) {
            // This outputs the result of the ajax request
            tp.pianoId.logout();

            // location.reload();
            window.location.href = "/";
            //window.location.href = prevloc;
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          },
        });
      });
      $("#footer-logout").click(function () {
        var prevloc = window.location.href;
        $.ajax({
          url: paywall_ajax_obj.ajaxurl, // or example_ajax_obj.ajaxurl if using on frontend
          method: "POST",
          data: {
            action: "paywall_ajax_request",

            security: paywall_ajax_obj.security,
            logout: true,
          },
          success: function (data) {
            // This outputs the result of the ajax request
            tp.pianoId.logout();

            // location.reload();
            window.location.href = "/";
            //window.location.href = prevloc;
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          },
        });
      });
    },
  ]);

  //Piano myaccount script
  var myloc = window.location.href;
  tp = window["tp"] || [];
  tp.push([
    "init",
    function () {
      // any additional functionality you need to execute after
      // the tinypass javascript loads
      if (myloc.indexOf("/my-account") > -1) {
        tp.myaccount.show({
          displayMode: "inline",
          containerSelector: "#my-account-wrap",
        });
      }
    },
  ]);
});

jQuery(document).ready(function ($) {
  // We'll pass this variable to the PHP function example_ajax_request
  var fruit = "Banana";

  // This does the ajax request
});
