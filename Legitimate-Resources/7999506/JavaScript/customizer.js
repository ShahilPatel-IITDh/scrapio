$(document).ready(function() {
  /********************************
   *           Customizer          *
   ********************************/
  var body = $("body"),
    default_bg_color = $(".app-sidebar").attr("data-background-color"),
    default_bg_image = $(".app-sidebar").attr("data-image");

  $('.cz-bg-color span[data-bg-color="' + default_bg_color + '"]').addClass(
    "selected"
  );
  $('.cz-bg-image img[src$="' + default_bg_image + '"]').addClass("selected");

  // Customizer toggle & close button click events  [Remove customizer code from production]
  $(".customizer-toggle").on("click", function() {
    $(".customizer").toggleClass("open");
  });
  $(".customizer-close").on("click", function() {
    $(".customizer").removeClass("open");
  });
  if ($(".customizer-content").length > 0) {
    $(".customizer-content").perfectScrollbar({
      theme: "dark"
    });
  }

  // Layout Config

  if ($("body.layout-dark").length > 0) {
    $(".layout-switch")
      .find(".dark-layout #dl-switch")
      .attr("checked", true);
    $(".sb-color-options")
      .find(".gradient-man-of-steel")
      .removeClass("selected");
    $(".sb-color-options")
      .find(".bg-black")
      .addClass("selected");
  }
  if ($("body.layout-dark.layout-transparent").length > 0) {
    $(".layout-switch")
      .find(".dark-layout #dl-switch")
      .attr("checked", false);
    $(".layout-switch")
      .find(".transparent-layout #tl-switch")
      .attr("checked", true);

    $("#dl-switch").on("click", function() {
      $(".app-sidebar").attr("data-background-color", "black");
    });
    $("#ll-switch").on("click", function() {
      $(".sidebar-background").css(
        "background-image",
        "app-assets/img/sidebar-bg/01.jpg"
      );
    });
  }

  // Change Sidebar Background Color
  $(".cz-bg-color span").on("click", function() {
    var $this = $(this),
      bgColor = $this.attr("data-bg-color");

    $this
      .closest(".cz-bg-color")
      .find("span.selected")
      .removeClass("selected");
    $this.addClass("selected");

    $(".app-sidebar").attr("data-background-color", bgColor);

      //martin set dark class
    setCookie('sidebar-color', bgColor, 999);

    //if (bgColor == "white") {
    //  $(".logo-img img").attr("src", "app-assets/img/logo-dark.png");
    //} else {
    //  if (
    //    $(".logo-img img").attr("src") == "app-assets/img/logo-dark.png"
    //  ) {
    //    $(".logo-img img").attr("src", "app-assets/img/logo.png");
    //  }
    //}
  });

  // Change Background Image
  $(".cz-bg-image img").on("click", function() {
    var $this = $(this),
      src = $this.attr("src");

    setCookie('sidebar-image', src, 999);
    $(".sidebar-background").css("background-image", "url(" + src + ")");
    $this
      .closest(".cz-bg-image")
      .find(".selected")
      .removeClass("selected");
    $this.addClass("selected");
  });

  $(".cz-bg-image-display").on("click", function() {
    var $this = $(this);
    var src = $(".cz-bg-image img.sb-bg-01").attr("src");
    if ($this.prop("checked") === true) {
      $(".sidebar-background").css("background-image", "url(" + src + ")");
      $(".cz-bg-image img.sb-bg-01").addClass("selected");
      setCookie('sidebar-image-active', 'yes', 999);
    } else {
        $(".sidebar-background").css("background-image", "none");
        setCookie('sidebar-image-active', 'no', 999);
    }
  });

  $(".cz-compact-menu").on("click", function() {
    $(".nav-toggle").trigger("click");
    if ($(this).prop("checked") === true) {
        setCookie('sidebar-compact', 'yes', 999);
      $(".app-sidebar").trigger("mouseleave");
    }
    else {
        setCookie('sidebar-compact', 'no', 999);
    }
  });

  $(".cz-sidebar-width").on("change", function() {
    var $this = $(this),
      width_val = this.value,
      wrapper = $(".wrapper");

    if (width_val === "small") {
        setCookie('sidebar-size', 'small', 999);
      $(wrapper)
        .removeClass("sidebar-lg")
        .addClass("sidebar-sm");
    } else if (width_val === "large") {
        setCookie('sidebar-size', 'large', 999);
      $(wrapper)
        .removeClass("sidebar-sm")
        .addClass("sidebar-lg");
    } else {
        setCookie('sidebar-size', 'medium', 999);
      $(wrapper).removeClass("sidebar-sm sidebar-lg");
    }
  });

  // To toggle sidebar image checkbox

  $("#sidebar-bg-img").on("click", function() {
    if ($(this).is(":checked")) {
      $(this).removeAttr("checked", false);
    } else {
      $(this).attr("checked", true);
      $(".sb-bg-img img.selected").removeClass("selected");
    }
  });

  // To Toggle Light Layout

  $("#ll-switch").on("click", function () {
      //Martin set body class
      setCookie('layout-class', ' 2-columns ', 999);

    // Removes Layout Dark and Transparent Classes
    $("body").removeClass(
      "layout-transparent layout-dark bg-hibiscus bg-purple-pizzazz bg-blue-lagoon bg-electric-violet bg-portage bg-tundora bg-glass-1 bg-glass-2 bg-glass-3 bg-glass-4"
    );
    $(".sb-color-options")
      .find(".selected")
      .removeClass("selected");
    $(".sb-color-options")
      .find(".gradient-man-of-steel")
      .addClass("selected");
    // Selected Image
    var src = $(".cz-bg-image img.sb-bg-01").attr("src");
    $(".sidebar-background").css("background-image", "url(" + src + ")");
    $(".app-sidebar").css("background-image", "url(" + src + ")");

    // Selected Background Color
    var bgColor = $(".cz-bg-color span.selected").attr("data-bg-color");
    $(".app-sidebar").attr("data-background-color", bgColor);
  });

  // To Toggle Dark Layout

  $("#dl-switch").on("click", function () {
      //martin set dark class
      setCookie('layout-class', ' 2-columns layout-dark ', 999);

    // Removes Unwanted Classes if any and adds layout-dark to body
    if ($("body").hasClass("layout-transparent")) {
      $("body").removeClass(
        "layout-transparent bg-hibiscus bg-purple-pizzazz bg-blue-lagoon bg-electric-violet bg-portage bg-tundora bg-glass-1 bg-glass-2 bg-glass-3 bg-glass-4"
      );
      $("body").addClass("layout-dark");
      $(".sidebar-background").css(
        "background-image",
        "url(app-assets/img/sidebar-bg/01.jpg)"
      );
      $(".app-sidebar").attr("data-background-color", "black");
    } else {
        //martin set dark class
        setCookie('layout-class', ' 2-columns layout-dark ', 999);

      $("body").toggleClass("layout-dark");
      $(".sb-color-options span.selected").removeClass("selected");
      $(".sb-color-options .bg-black").addClass("selected");
      //$(".app-sidebar").attr("data-background-color", "black");
      //$(".logo-img img").attr("src", "app-assets/img/logo.png");
    }
  });

  // To Toggle Transparent Layout
  $("#tl-switch").on("click", function () {
      //martin set dark class
      setCookie('layout-class', ' 2-columns layout-transparent layout-dark bg-glass-1 ', 999);

      $("body").addClass("layout-transparent layout-dark bg-glass-1");
      setCookie('sidebar-color', 'black', 999);
    $(".app-sidebar").attr("data-background-color", "black");
    $(".cz-tl-bg-color .row .col span.selected").removeClass("selected");
    $(".cz-tl-bg-image .bg-glass-1").addClass("selected");
    $(".sidebar-background").css("background-image", "none");
  });

  // To Change Background Colors In Transparrent Layout

  // Toogle Selected
  // Adds and removes selected class on click on colors
  $(".customizer .cz-tl-bg-color .col .rounded-circle").on("click", function() {
    $("body").removeClass(
      "bg-hibiscus bg-purple-pizzazz bg-blue-lagoon bg-electric-violet bg-portage bg-tundora bg-glass-1 bg-glass-2 bg-glass-3 bg-glass-4"
    );
    $(".cz-tl-bg-color")
      .find(".selected")
      .removeClass("selected");
    $(this).addClass("selected");
    if ($(".cz-tl-bg-image .col-sm-3 img.rounded").hasClass("selected")) {
      $(".cz-tl-bg-image .col-sm-3 img.rounded").removeClass("selected");
    }
  });
  // Adds and removes selected class for images
  $(".cz-tl-bg-image .col-sm-3 img.rounded").on("click", function() {
    $("body").removeClass(
      "bg-hibiscus bg-purple-pizzazz bg-blue-lagoon bg-electric-violet bg-portage bg-tundora bg-glass-1 bg-glass-2 bg-glass-3 bg-glass-4"
    );
    $(".cz-tl-bg-image")
      .find(".selected")
      .removeClass("selected");
    $(this).addClass("selected");
    if (
      $(".customizer .cz-tl-bg-color .col .rounded-circle").hasClass("selected")
    ) {
      $(".customizer .cz-tl-bg-color .col .rounded-circle").removeClass(
        "selected"
      );
    }
  });

  // Transparent Layout Background Colors
  // Hibiscus

  $(".customizer-content .bg-hibiscus").on("click", function() {
      $("body").addClass("bg-hibiscus");
      setCookie('transparent-color', "bg-hibiscus", 999);
      setCookie('transparent-image', "", 999);
  });

  // Purple Pizzazz

  $(".customizer-content .bg-purple-pizzazz").on("click", function() {
      $("body").addClass("bg-purple-pizzazz");
      setCookie('transparent-color', "bg-purple-pizzazz", 999);
      setCookie('transparent-image', "", 999);
  });

  // Blue Lagoon

  $(".customizer-content .bg-blue-lagoon").on("click", function() {
      $("body").addClass("bg-blue-lagoon");
      setCookie('transparent-color', "bg-blue-lagoon", 999);
      setCookie('transparent-image', "", 999);
  });

  // Electric Violet

  $(".customizer-content .bg-electric-violet").on("click", function() {
      $("body").addClass("bg-electric-violet");
      setCookie('transparent-color', "bg-electric-violet", 999);
      setCookie('transparent-image', "", 999);
  });

  // Portage

  $(".customizer-content .bg-portage").on("click", function() {
      $("body").addClass("bg-portage");
      setCookie('transparent-color', "bg-portage", 999);
      setCookie('transparent-image', "", 999);
  });

  // Tundora

  $(".customizer-content .bg-tundora").on("click", function() {
      $("body").addClass("bg-tundora");
      setCookie('transparent-color', "bg-tundora", 999);
      setCookie('transparent-image', "", 999);
  });

  // Transparent BG IMG

  $(".customizer-content .bg-glass-1").on("click", function() {
      $("body").addClass("bg-glass-1");
      setCookie('transparent-image', "bg-glass-1", 999);
  });

  $(".customizer-content .bg-glass-2").on("click", function() {
      $("body").addClass("bg-glass-2");
      setCookie('transparent-image', "bg-glass-2", 999);
  });

  $(".customizer-content .bg-glass-3").on("click", function() {
      $("body").addClass("bg-glass-3");
      setCookie('transparent-image', "bg-glass-3", 999);
  });

  $(".customizer-content .bg-glass-4").on("click", function() {
      $("body").addClass("bg-glass-4");
      setCookie('transparent-image', "bg-glass-4", 999);
  });
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

