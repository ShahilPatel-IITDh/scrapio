var spbctaNM = {};
(function ($) {
  spbctaNM.func = {
    // spbcta functionality
    spbcta_pass: function (
      base64String,
      element,
      link,
      target,
      preview = false
    ) {
      //if reveal blank hide reveal
      if (base64String) {
        /////
        if ($(element)[0].hasAttribute("href")) {
          $(element).addClass("spbcta_selectable");
          $(element)
            .children(".reveal__button__hidden__content")
            .html(decodeURIComponent(escape(atob(base64String))));
          if (!preview) $(element).removeAttr("href");
          $(element)
            .closest(".reveal__button__wrapper")
            .addClass("reveal__button__content");
          spbctaNM.selectText(
            $(element).children(".reveal__button__hidden__content")[0]
          );
          if (!preview) spbctaNM.openLink(link, target);
        } else {
          if (!preview) spbctaNM.openLink(link, target);
        }
      }
    },
  };
  spbctaNM.openLink = function (link, target) {
    if (target == 1) {
      window.open(link, "_blank");
    } else {
      location.href = link;
    }
  };

  spbctaNM.selectText = function (element) {
    var range = document.createRange();
    range.selectNodeContents(element);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };
})(jQuery);

jQuery(document).ready(function ($) {
  spbcta_resize();
  setTimeout(function () {
    spbcta_resize();
  }, 1000);
  let spbcta_timer;
  $(window).resize(function () {
    clearTimeout(spbcta_timer);
    spbcta_timer = setTimeout(function () {
      spbcta_resize();
    }, 100);
  });

  function spbcta_resize() {
    /*
		$(".reveal__button__hidden__content").each(function(){
			$(this).css({
			'min-width': ($(this).siblings(".reveal__button__text").width() + 'px')
			});
		});
		*/
    $(".reveal__button__wrapper").each(function () {
      const text_height = $(this)
        .children(".reveal__button__link:not(.spbcta_selectable)")
        .children(".reveal__button__text")
        .height();
      if (text_height == null || text_height === undefined) {
        const element = $(this)
          .children(".reveal__button__link")
          .children(".reveal__button__hidden__content");
        element.height("auto");
        element.width("");
      } else {
        const element = $(this)
          .children(".reveal__button__link")
          .children(".reveal__button__hidden__content");
        element.height(text_height);
        element.width("");
        const existing_style = element.attr("style");
        const width_padding = 35;
        const text_width =
          $(this)
            .children(".reveal__button__link:not(.spbcta_selectable)")
            .children(".reveal__button__text")
            .outerWidth() + width_padding;
        element.attr(
          "style",
          "width:" + text_width + "px !important; " + existing_style
        );
      }
      //$(this).height(text_height);
    });
  }

  $(".reveal__button__link").click(function () {
    spbcta_resize();
  });
});
