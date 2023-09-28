"use strict";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var App = (function () {
  function App() {
    _classCallCheck(this, App);

    this.cname = "_rt.uid";
  }

  _createClass(App, [
    {
      key: "isMobileScreen",
      value: function isMobileScreen() {
        return window.matchMedia("screen and (max-width: 1019px)").matches;
      },
    },
    {
      key: "isLargeScreen",
      value: function isLargeScreen() {
        return window.matchMedia("screen and (min-width: 1020px)").matches;
      },
    },
    {
      key: "isMedialScreen",
      value: function isMedialScreen() {
        return window.matchMedia("(min-width: 769px) and (max-width: 1019px)").matches;
      },
    },
    {
      key: "enableTelClick",
      value: function enableTelClick() {
        const linkContact = $(".link-contact");
        if (!this.isMobileScreen() && linkContact.length) {
          linkContact.css("pointer-events", "none");
        }
      },
    },
    {
      key: "enableCta",
      value: function enableCta(st, breakPointShowCTA) {
        const ctaAccordion = $(".cta-accordion");
        if (ctaAccordion.length) {
          if (!this.isMobileScreen()) {
            ctaAccordion.css("display", "none");
            ctaAccordion.removeClass("active");
          } else {
            if (st > breakPointShowCTA) {
              ctaAccordion.addClass("active");

              var self = this;
              setTimeout(function () {
                self.resetPositionFooterElement(ctaAccordion);
              }, 700);
            }
          }
        }
      },
    },
    {
      key: "resetViewportExtra",
      value: function resetViewportExtra() {
        if (this.isMobileScreen()) {
          // eslint-disable-next-line no-undef
          new ViewportExtra(375);
        } else {
          // eslint-disable-next-line no-undef
          new ViewportExtra(1280);
        }
      },
    },
    {
      key: "init",
      value: function init() {
        this.checkCookieLogin(this.cname);
        this.resetViewportExtra();
        this.initEventOnFooter();
        this.initEventOnHeader();

        this.initModal();
        this.initEventOnSideBar();
        this.resetStatusOnHeader();
        this.initPopup();
        this.initAccordion();
        this.initTableAccordion();
        this.initFAQ();
        this.initTabs();
        this.initStepsAccordion();
        this.setEqualHeightElements();
        this.initEventScrollPage();
        this.initCtaAccordion();
        this.enableTelClick();
        this.gotoToView();
      },
    },
    {
      key: "gotoToView",
      value: function gotoToView() {
        if ($(".js-anchor").length) {
          var app = this;
          $(".js-anchor").on("click", function (e) {
            var extra = app.isMobileScreen() ? 50 : 120;

            if ($("nav").hasClass("container__nav")) {
              extra = app.isMobileScreen() ? 70 : 120;
            }

            if ($("header").hasClass("header--simple")) {
              extra = 20;
            }

            if (this.hash !== "") {
              e.preventDefault();
              var hash = this.hash;
              var SPEED_DEFAULT = 400; // 最初の速度
              var SPEED_REPEAT = 100; // 繰り返し時の速度
              var positionStart = $(hash).offset().top - extra;

              var scrollAnimate = (positionStart, scrollSpeed) => {
                $("html, body")
                  .stop()
                  .animate({ scrollTop: positionStart }, scrollSpeed, "swing", () => {
                    // スクロールアニメーション終了時に、目的地のY座標を取得
                    var positionEnd = $(hash).offset().top - extra;

                    // 処理を繰り返すかの判定
                    // 目的地のY座標が変わっていたらやり直し
                    if (positionStart !== positionEnd) {
                      scrollAnimate(positionEnd, SPEED_REPEAT);
                    }
                  });
              };

              scrollAnimate(positionStart, SPEED_DEFAULT);
            }
          });
        }
      },
    },
    {
      key: "initEventScrollPage",
      value: function initEventScrollPage() {
        var wrapper = $(".wrapper");
        var header = $(".header");

        $(window).on("scroll", function () {
          var scrollTop = $(this).scrollTop();

          if (scrollTop > 0) {
            if (wrapper.hasClass("wrapper--main")) {
              header.addClass("header--scroll");
              wrapper.addClass("wrapper--scroll");
            }
          } else {
            header.removeClass("header--scroll");
            wrapper.removeClass("wrapper--scroll");
          }
        });
      },
    },
    {
      key: "initEventOnFooter",
      value: function initEventOnFooter() {
        $(".js-footer__sub-title").on("click", function () {
          $(this).parent().find(".js-footer__sub-content").slideToggle(200);
          $(this).toggleClass("active");
        });
        $(".js-footer__title").on("click", function () {
          $(this).parent().find("div.footer__row__content").slideToggle(200);
          $(this).toggleClass("active");
        });
      },
    },
    {
      key: "initModal",
      value: function initModal() {
        $('[data-toggle="modal"]').on("click", function (e) {
          e.preventDefault();
          var target = $(this).data("target");

          $("body").addClass("modal-open");
          $(target).addClass("show");
        });
        $(".modal .js-close-modal").on("click", function (e) {
          e.preventDefault();
          var target = $(this).closest(".modal");
          $("body").removeClass("modal-open");
          $(target).removeClass("show");
        }); // close modal

        $(document).on("mouseup", function (e) {
          var container = $(".modal__content");

          if (!container.is(e.target) && container.has(e.target).length === 0) {
            var target = $(".modal__dialog").closest(".modal");
            $("body").removeClass("modal-open");
            $(target).removeClass("show");
          }
        });

        var obj = this;
        $(".footer__pagetop").on("click", function (e) {
          e.preventDefault();

          if ($(".cta-accordion-toggle").length && $(".cta-accordion-toggle").hasClass("active")) {
            obj.ctaToggle();
          }

          $("html, body").stop().animate({ scrollTop: 0 }, 500);
          $("body").removeClass("disable-scroll");
          return false;
        });
      },
    },
    {
      key: "initEventOnHeader",
      value: function initEventOnHeader() {
        var focusedElementBeforeModal;

        function closeSubMenu() {
          $("[id^='sub__menu-']").off("keydown.submenu");
          $(".js-header__main-menu").removeClass("active"); // Set focus back to element that had it before the modal was opened

          if (focusedElementBeforeModal) {
            focusedElementBeforeModal.focus();
            focusedElementBeforeModal = null;
          }
        }

        $(".js-header__main-menu").on("click", function () {
          var id = $(this).attr("data-src");
          focusedElementBeforeModal = document.activeElement;
          var contents = $("#sub__menu-" + id);

          if (!$(this).hasClass("active")) {
            $(".header-sub-menu__item").attr("style", "");
            $(".js-header__main-menu").removeClass("active");
          } else closeSubMenu();

          contents.slideToggle(200, "linear");
          $(this).toggleClass("active");
          $("#js-header--dropdown-list-content").attr("style", "");
          $("#js-dropdown-list-01").removeClass("active");

          function trapTabKey(e) {
            // Check for TAB key press
            if (e.keyCode === 9) {
              // SHIFT + TAB
              if (e.shiftKey) {
                if (document.activeElement === firstTabStop) {
                  e.preventDefault();
                  lastTabStop.focus();
                } // TAB
              } else {
                if (document.activeElement === lastTabStop) {
                  e.preventDefault();
                  firstTabStop.focus();
                }
              }
            } // ESCAPE
            else if (e.keyCode === 27) {
              contents.slideToggle(200, "linear");
              closeSubMenu();
            }
          } // Listen for and trap the keyboard

          if ($(this).hasClass("active")) {
            var focusableElementsString = "a[href]:visible, input:not([disabled]), button:visible:not([disabled])";
            var focusableElements = contents.find(focusableElementsString);
            var firstTabStop = focusableElements[0];
            var lastTabStop = focusableElements[focusableElements.length - 1];

            contents.on("keydown.submenu", trapTabKey); // Focus first child

            firstTabStop.focus();
          }
        }); // close submenu

        $(".js-close-menu-pc").on("click", function () {
          $(this).parent().parent().parent().slideToggle(200, "linear");
          closeSubMenu();
        });
        $(".header-menu-sp .header-menu-sp__icon").on("click", function () {
          // close submenu status if has
          $(".js-header-sub-menu__title").removeClass("active").attr("style", "");
          $(".header__row__content").removeClass("active").attr("style", "");
          $(".header__container__column-group ul").removeClass("active").attr("style", "");
          $(".js-header-sub-menu__child").removeClass("active").attr("style", ""); // display menu

          $(this).toggleClass("active");
          $(".header-sub-menu").toggleClass("active");
          $("body").toggleClass("no-scroll"); // display top of element nav__content

          var el = document.querySelector(".header-sub-menu");
          el.scrollTop = 0;
        });
        $(".js-header-sub-menu__title").on("click", function () {
          $(this).parent().find("div.header__row__content").slideToggle(200);
          $(this).toggleClass("active");
        });
        $(".js-header-sub-menu__child").on("click", function () {
          $(this).parent().find("ul").slideToggle(200);

          $(this).toggleClass("active");
        }); // show form search

        $(".header__top-menu__search").on("click", function () {
          $(".header-search-pc").slideToggle(200, "linear");
          $(".header__top-menu").toggleClass("has__form-search");
          $(this).toggleClass("close"); // close menu

          $(".header-sub-menu__item").attr("style", "");
          closeSubMenu();
          $("#js-header--dropdown-list-content").attr("style", "display: none");
          $("#js-dropdown-list-01").removeClass("active");
        }); // show/hide dropdown list

        $("#js-dropdown-list-01").on("click", function () {
          $(this).toggleClass("active");
          $("#js-header--dropdown-list-content").slideToggle(200, "linear");
          $(".header-search-pc").attr("style", "display: none"); // close menu

          $(".header-sub-menu__item").attr("style", "");
          closeSubMenu();
          $(".header__top-menu__search").removeClass("close");
        });
        $(document).on("mouseup", function (e) {
          // click out close dropdown list
          var e1 = $("#js-header--dropdown-list-content");
          var e2 = $("#js-dropdown-list-01");

          if (!e1.is(e.target) && e1.has(e.target).length === 0 && !e2.is(e.target) && e2.has(e.target).length === 0) {
            if ($(".dropdown-list--pc").hasClass("active")) {
              $("#js-dropdown-list-01").toggleClass("active");
              $("#js-header--dropdown-list-content").slideToggle(200, "linear");
            }
          } // mouseup close form search

          var s1 = $(".header-search-pc");
          var s2 = $(".header__top-menu__search");
          var s3 = $("#i_search_autocomplete");

          if (
            !s1.is(e.target) &&
            s1.has(e.target).length === 0 &&
            !s2.is(e.target) &&
            s2.has(e.target).length === 0 &&
            !s3.is(e.target) &&
            s3.has(e.target).length === 0
          ) {
            if ($(".header__top-menu__search").hasClass("close")) {
              $(".header__top-menu__search").toggleClass("close");
              $(".header-search-pc").slideToggle(200, "linear");
            }
          } // mouseup header close submenu

          var header = $(".header");

          if (!header.is(e.target) && header.has(e.target).length === 0) {
            $(".header-sub-menu__item").each(function () {
              if ($(this).attr("style") === "display: block;") {
                $(this).slideToggle(200, "linear");
              }
            });
            closeSubMenu();
          }
        });
      },
    },
    {
      key: "resetStatusOnHeader",
      value: function resetStatusOnHeader() {
        if (this.isMobileScreen()) {
          $(".header__sub-menu .header-sub-menu").addClass("has-transition");
          $(".nav__content").addClass("has-transition");
          $(".header-sub-menu__item").attr("style", "");
          $(".nav").removeClass("active");

          if ($(".container__nav").hasClass("active")) {
            $("body").addClass("nav-open");
          }
        } else {
          $(".header__sub-menu .header-sub-menu").removeClass("has-transition");
          $(".nav__content").removeClass("has-transition");
          $(".footer__row__content").attr("style", "");
          $(".footer__row__content ul").attr("style", "");
          $(".footer__button--sp").attr("style", "");
          $(".js-footer__title").removeClass("active");
          $(".js-footer__sub-title").removeClass("active");
          $(".footer__row__content").removeClass("active").attr("style", "");
          $(".js-footer__sub-content").attr("style", "");
          $("body").removeClass("nav-open");
        }
      },
    },
    {
      key: "initEventOnSideBar",
      value: function initEventOnSideBar() {
        // Open by adding an active class to li
        $(".nav-list__item").each(function () {
          var isActive = $(this).parent().hasClass("active");
          if (isActive) {
            $(this).parent().find("ul.nav__sub-menu").css("display", "block").slideDown(200);
          }
        });
        $(".nav-list__item").on("click", function () {
          $(this).parent().find("ul.nav__sub-menu").slideToggle(200);
          $(this).parent().toggleClass("active");
        });
        $("#icon-sidebar__sp").on("click", function () {
          $(".container__nav").toggleClass("active");
          $("body").toggleClass("nav-open"); // display top of element nav__content

          var el = document.querySelector(".nav__content");
          el.scrollTop = 0;
        });
      },
    },
    {
      key: "initPopup",
      value: function initPopup() {
        $('[data-toggle="popup"]').on("click", function (e) {
          e.preventDefault();
          var target = $(this).data("target");
          $("body").addClass("popup-open");
          $(target).addClass("show");
        });
        $(".popup .close").on("click", function (e) {
          e.preventDefault();
          var target = $(this).closest(".popup");
          $("body").removeClass("popup-open");
          $(target).removeClass("show");
        });
      },
    },
    {
      key: "initAccordion",
      value: function initAccordion() {
        if ($(".accordion").length) {
          if (this.isLargeScreen()) {
            $(".accordion").each(function () {
              $(this).find(".pc-show").addClass("show");
            });
          } else {
            $(".accordion").each(function () {
              $(this).find(".sp-show").addClass("show");
            });
          }

          $(".js-accordion-toggle .accordion__label").on("click", function (e) {
            e.preventDefault();
            var self = $(this).parent();

            if (self.hasClass("show")) {
              self.find(".accordion__body").slideUp(200, function () {
                self.removeClass("show");
              });
            } else {
              self.find(".accordion__body").slideDown(200, function () {
                self.addClass("show");
              });
            }
          });
        }
      },
    },
    {
      key: "initTableAccordion",
      value: function initTableAccordion() {
        if ($(".js-table-accordion-toggle").length) {
          $(".js-table-accordion-toggle").each(function(){

            var tableHeight = $(this).find('.table-accordion__body').height();
            var tableTop = $(this).offset().top;

            $(this).find(".accordion__label").on("click", function (e) {
              e.preventDefault();
              var self = $(this).parent().parent();
              var btn = $(this).find('strong');
              var autoHeight = self.find('.table-accordion__body-inner').height();

              if (self.hasClass("show")) {
                self.removeClass("show");
                $(window).scrollTop(tableTop);
                self.find(".table-accordion__body").height(autoHeight).animate({height: tableHeight}, 500,function(){
                  btn.text('続きを表示する');
                });
              } else {
                self.addClass("show");
                self.find(".table-accordion__body").height(tableHeight).animate({height: autoHeight}, 500,function(){
                  btn.text('閉じる');
                });
              }
            });

          });

        }
      },
    },
    {
      key: "initFAQ",
      value: function initFAQ() {
        if (this.isLargeScreen()) {
          $(".faq-accordion__item").each(function () {
            $(this).hasClass("pc-show") && $(this).addClass("show");
          });
        } else {
          $(".faq-accordion__item").each(function () {
            $(this).hasClass("sp-show") && $(this).addClass("show");
          });
        }

        $(".js-faq-toggle").on("click", function (e) {
          e.preventDefault();
          var self = $(this).parent();

          if (self.hasClass("show")) {
            self.find(".faq__answer").slideUp(200, function () {
              self.removeClass("show");
            });
          } else {
            self.find(".faq__answer").slideDown(200, function () {
              self.addClass("show");
            });
          }
        });
      },
    },
    {
      key: "initCtaAccordion",
      value: function initCtaAccordion() {
        if ($(".cta-accordion-toggle").length) {
          var self = this;
          $(document).on("click", function (e) {
            if ($(e.target).closest(".cta-accordion").length === 0) {
              if ($(".cta-accordion-toggle").hasClass("active")) {
                self.ctaToggle();
              }
            }
          });
          $(".cta-accordion-toggle").on("click", function (e) {
            e.preventDefault();
            self.ctaToggle();
          });
        }
      },
    },
    {
      key: "ctaToggle",
      value: function ctaToggle() {
        var self = this;
        var $ctaToggle = $(".cta-accordion-toggle");
        var $ctaAccordion = $ctaToggle.closest(".cta-accordion");
        $ctaToggle.toggleClass("active");
        $ctaAccordion.find(".cta-accordion__body").slideToggle({
          duration: 200,
          easing: "linear",
          start: function start() {
            $(".cta-accordion__body").scrollTop(0);
          },
          progress: function progress() {
            self.resetPositionFooterElement($ctaAccordion, true);
          },
          done: function done() {
            self.resetPositionFooterElement($ctaAccordion, true);
          },
        });
        $ctaAccordion.find(".cta-accordion__footer").slideToggle(200);
      },
    },
    {
      key: "getViewportOffset",
      value: function getViewportOffset($e) {
        var $window = $(window),
          scrollTop = $window.scrollTop(),
          offset = $e.offset();
        return {
          top: offset.top - scrollTop,
        };
      },
    },
    {
      key: "resetPositionFooterElement",
      value: function resetPositionFooterElement($e) {
        var slideToggle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var $footerPageTop = $(".footer__pagetop");
        // ISコンテンツ
        var $evgSurveyPopup = $("#evg-SurveyPopup-Wrap");
        var $evgLinkPopup = $("#evg-LinkPopup");
        var $evgRemindPopup = $("#evg-RemindPopup");
        var $evgIntroPopup = $("#evg-IntroPopup");
        var $evgStepupPopup = $("#evg-StepupPopup");

        if ($e.is(":visible")) {
          if (slideToggle) {
            var offset = this.getViewportOffset($e).top;
            $footerPageTop.css("top", offset - 20 - $footerPageTop.height());
            $evgSurveyPopup.css("bottom", 10 + $e.height() + "px");
            $evgLinkPopup.css("bottom", 10 + $e.height() + "px");
            $evgRemindPopup.css("bottom", 10 + $e.height() + "px");
            $evgIntroPopup.css("bottom", 10 + $e.height() + "px");
            $evgStepupPopup.css("bottom", 10 + $e.height() + "px");

          } else {
            $footerPageTop.css({"bottom": 10 + $e.height() + "px", "top": "auto"});
            $evgSurveyPopup.css({"bottom": 10 + $e.height() + "px", "top": "auto"});
            $evgLinkPopup.css({"bottom": 10 + $e.height() + "px", "top": "auto"});
            $evgRemindPopup.css({"bottom": 10 + $e.height() + "px", "top": "auto"});
            $evgIntroPopup.css({"bottom": 10 + $e.height() + "px", "top": "auto"});
            $evgStepupPopup.css({"bottom": 10 + $e.height() + "px", "top": "auto"});
          }
        } else {
          $footerPageTop.css({"top": "auto", "bottom": 10 + "px"});
          $evgSurveyPopup.css({"top": "auto", "bottom": 10 + "px"});
          $evgLinkPopup.css({"top": "auto", "bottom": 10 + "px"});
          $evgRemindPopup.css({"top": "auto", "bottom": 10 + "px"});
          $evgIntroPopup.css({"top": "auto", "bottom": 10 + "px"});
          $evgStepupPopup.css({"top": "auto", "bottom": 10 + "px"});
        }
      },
    },
    {
      key: "initTabs",
      value: function initTabs() {
        this.detectTabsOverflow();

        var getParam = function (name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return "";
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        };

        var clickSegmentItem = function (self) {
          var segment_nav = $(self).parent();
          var segment_content = segment_nav.next(".segment__content");
          var anchor = $(self).find("[data-tab-id]").eq(0).attr("data-tab-id");
          segment_nav.find(".segment__item").removeClass("segment__item--active");
          $(self).addClass("segment__item--active");
          segment_content.find(".segment__panel").removeClass("show");
          segment_content.find('[data-tab-id="' + anchor + '"]').addClass("show");
        };

        $(".segment").each(function () {
          var activePanel = $(this).find(".segment__item--active [data-tab-id]").eq(0).attr("data-tab-id");
          $(this)
            .find('[data-tab-id="' + activePanel + '"]')
            .addClass("show");

          var tabParam = getParam("tab");
          if (tabParam) {
            var segmentItem = $(this)
              .find(".segment__item [data-tab-id='" + tabParam + "']")
              .closest(".segment__item");
            clickSegmentItem(segmentItem);
          }
          $(this)
            .find(".segment__item")
            .on("click", function (e) {
              e.preventDefault();
              clickSegmentItem(this);
            });
        });
      },
    },
    {
      key: "detectTabsOverflow",
      value: function detectTabsOverflow() {
        $(".table-container").each(function () {
          var instruction = $(this).find(".table-instruction");

          if (instruction.length) {
            var container = $(this).find(".table-responsive");
            var scrollWidth = container.get(0).scrollWidth;
            var width = container.width();

            if (scrollWidth > width) {
              instruction.show();
            } else {
              instruction.hide();
            }
          }
        });
      },
    },
    {
      key: "initStepsAccordion",
      value: function initStepsAccordion() {
        if (this.isLargeScreen()) {
          $(".steps-box--toggle").each(function () {
            $(this).find(".pc-show").addClass("show");
          });
        } else {
          $(".steps-box--toggle").each(function () {
            $(this).find(".sp-show").addClass("show");
          });
        }

        $(".steps-box--toggle .step-box__label").on("click", function (e) {
          e.preventDefault();
          var self = $(this).parent();

          if ($(self).hasClass("show")) {
            $(self)
              .find(".step-box__inner")
              .slideUp(200, function () {
                $(self).removeClass("show");
              });
          } else {
            $(self)
              .find(".step-box__inner")
              .slideDown(200, function () {
                $(self).addClass("show");
              });
          }
        });
      },
    },
    {
      key: "equalBoxHeader",
      value: function equalBoxHeader() {
        setTimeout(function () {
          $(".ratebox--discount .js-ratebox__header").matchHeight();
          $(".ratebox--small .ratebox__header").matchHeight();
        }, 1000);
      },
    },
    {
      key: "setEqualHeightElements",
      value: function setEqualHeightElements() {
        var _this = this;

        // to make sure this function will run latest
        setTimeout(function () {
          _this.equalBoxHeader();

          $(".block-reasons-select .js-block-reasons-select__title").matchHeight();
          $(".retail-housing .block-interest-rate .js-ratebox__header").matchHeight();
          $(".rh-recommend-slider .js-card__title").matchHeight();
          $(".block-cta-exist__deposit .btn-caption").matchHeight();
          $(".block-cta-exist__deposit .btn").matchHeight();

          $(".ratebox--recommend .ratebox__header").matchHeight();

          $(".operation-card__body .campaign-title").matchHeight();
          $(".operation-card__body_c").matchHeight();

          $(".js-matchHeight").matchHeight();
        });
      },
    },
    {
      key: "getCookie",
      value: function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(";");

        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];

          while (c.charAt(0) == " ") {
            c = c.substring(1);
          }

          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }

        return "";
      },
    },
    {
      key: "checkCookieLogin",
      value: function checkCookieLogin(cookieName) {
        var uid = this.getCookie(cookieName);

        if (uid.length === 64) {
          $(".for-new").addClass("for-new--hidden");
          $(".for-customer").removeClass("for-customer--hidden");
        } else {
          $(".for-new").removeClass("for-new--hidden");
          $(".for-customer").addClass("for-customer--hidden");
        }
      },
    },
    {
      key: "hideSwipeImgFromScrollTable",
      value: function hideSwipeImgFromScrollTable() {
        var windowWidth = $(window).width();
        if (windowWidth >= 920) {
          $(".table-swipe").hide();
        } else {
          $(".table-swipe").show();
          $(".table-scroll,.column-over").on("scroll", function () {
            $(this).find(".table-swipe").fadeOut();
          });
        }
      },
    },
  ]);

  return App;
})();

$(function () {
  var app = new App();
  app.init();
  var lastScrollTop = 0;
  var breakPointShowCTA = 70;
  var bottomPointShowCTA = 100;
  var scrollTimer;
  var $ctaAccordion = $(".cta-accordion");
  var $simpleFooter = $(".simple-footer");

  $(window).on("resize", function () {
    app.resetStatusOnHeader();
    app.detectTabsOverflow();
    app.hideSwipeImgFromScrollTable();
    app.enableCta($(this).scrollTop(), breakPointShowCTA);
    fixedPageElement();
  });
  $(window).on("load", function () {
    app.enableCta($(this).scrollTop(), breakPointShowCTA);
    fixedPageElement();
    app.hideSwipeImgFromScrollTable();
  });
  $(window).on("scroll", function () {
    if (app.isMobileScreen() && $ctaAccordion.length) {
      clearTimeout(scrollTimer);
      var st = $(this).scrollTop();

      if (st < lastScrollTop) {
        //fix auto scroll top
        if ($(window).scrollTop() + $(window).height() < $(document).height() - bottomPointShowCTA) {
          if (
            $ctaAccordion.is(":visible") &&
            !$(".cta-accordion-toggle").hasClass("active") &&
            $(window).scrollTop() < $(document).height() - $(window).height() * 1.2
          ) {
            $ctaAccordion.removeClass("active");
            $ctaAccordion.fadeOut();
          }
        }
      } else {
        if (st > breakPointShowCTA) {
          if ($ctaAccordion.is(":hidden")) {
            $ctaAccordion.addClass("active");
          }
        } else {
          if ($ctaAccordion.is(":visible")) {
            $ctaAccordion.removeClass("active");
            $ctaAccordion.fadeOut();
          }
        }
      }

      setTimeout(function () {
        app.resetPositionFooterElement($ctaAccordion);
      }, 100);
      lastScrollTop = st;
      scrollTimer = setTimeout(function () {
        afterScroll($ctaAccordion);
      }, 100);
    }

    fixedPageElement();
  });

  function afterScroll($cta) {
    if (lastScrollTop > breakPointShowCTA) {
      $cta.addClass("active");
    } else {
      if ($(".cta-accordion-toggle").hasClass("active")) {
        app.ctaToggle();
      }

      $cta.removeClass("active");
      $cta.fadeOut();
    }

    setTimeout(function () {
      app.resetPositionFooterElement($cta);
    }, 100);
  }

  function fixedPageElement() {
    var isMobileScreen = app.isMobileScreen();
    if (isMobileScreen && ($ctaAccordion.length || !$simpleFooter.length)) return;
    var bottomMargin = isMobileScreen ? 10 : 20;
    var windowHeight = window.innerHeight;
    var elementOffset = $(".simple-footer, .footer__copy-right").offset().top;
    var footerTop = elementOffset - $(window).scrollTop();

    if (footerTop > windowHeight) {
      $(".footer__pagetop").css({bottom: "",});
      // ISコンテンツ
      $("#evg-SurveyPopup-Wrap").css({bottom: "",});
      $("#evg-LinkPopup").css({bottom: "",});
      $("#evg-RemindPopup").css({bottom: "",});
      $("#evg-IntroPopup").css({bottom: "",});
      $("#evg-StepupPopup").css({bottom: "",});
    } else {
      $(".footer__pagetop").css({bottom: windowHeight - footerTop + bottomMargin,});
      // ISコンテンツ
      $("#evg-SurveyPopup-Wrap").css({bottom: windowHeight - footerTop + bottomMargin,});
      $("#evg-LinkPopup").css({bottom: windowHeight - footerTop + bottomMargin,});
      $("#evg-RemindPopup").css({bottom: windowHeight - footerTop + bottomMargin,});
      $("#evg-IntroPopup").css({bottom: windowHeight - footerTop + bottomMargin,});
      $("#evg-StepupPopup").css({bottom: windowHeight - footerTop + bottomMargin,});
    }
  }
  var mutationObserver = new MutationObserver(function(){
    if($("#evg-SurveyPopup-Wrap").length || $("#evg-LinkPopup").length || $("#evg-RemindPopup").length || $("#evg-IntroPopup").length || $("#evg-StepupPopup").length){
      app.resetPositionFooterElement($(".cta-accordion"));
      fixedPageElement()
    }
  })
  mutationObserver.observe(this.body,{childList: true});
});

$(function(){
  var currentPathname = location.pathname;
  if(currentPathname.indexOf('/retail/housing/') >= 0){
    var pcHeaderExaminationBtn = $('.header__container__column--right .header__main-menu__register')[0];
    $(pcHeaderExaminationBtn).text('審査申込');
    $(pcHeaderExaminationBtn).attr({
      href: '/powerflex/housing/document_web_request.html?intcid=hl_mega',
      target: '_blank'
    });
    var spHeaderExaminationBtn = $('.header-menu-sp__button .header-menu-sp__register')[0];
    $(spHeaderExaminationBtn).text('審査申込');
    $(spHeaderExaminationBtn).attr({
      href: '/powerflex/housing/document_web_request.html?intcid=hl_mega',
      target: '_blank'
    });
    $(spHeaderExaminationBtn).addClass('header-menu-sp__hl-examination')
  }
});


