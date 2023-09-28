(function (window, $, undefined) {
  "use strict";

  $(".wrap-cookie-warning").hide();

  $("#warning-agree").click(function () {
    $(".wrap-cookie-warning").hide();
    setCookie("cookiesAccepted", "true", 1);
  });

  $("#submit-newsletter").click(function () {
    $("#newsletter-popup-wrapper").submit();
  });

  $("#newsletter-popup-form").submit(function (e) {
    e.preventDefault();

    $(this).addClass("loading-form");

    var url = $(this).attr("data-url-action"),
      name = $("#newsletter-popup-name").val(),
      email = $("#newsletter-popup-email").val();

    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: {
        name: name,
        email: email,
        tipo: "1",
        categoria: "Inscrito por pop-up newsletter",
      },
    }).done(function (response) {
      if (response.status == 1) {
        $("#newsletter-popup-form").removeClass("loading-form");
        $("#newsletter-popup-form").addClass("form-sent");
        setCookie("newsletterPopup", "true", 365);
        $("#newsletter-popup-message > div").append("<p>" + response.mensagem + "</p>");
        $("#newsletter-popup-message").show();
        setTimeout(function () {
          $("#newsletter-popup-wrapper").removeClass("open");
        }, 3000);
      }
    });
  });

  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  if (getCookie("newsletterPopup") != "true") {
    $(window).on("load", function () {
      $("#newsletter-popup-wrapper").addClass("open");
    });
  }

  if (getCookie("cookiesAccepted") != "true") {
    $(window).on("load", function () {
      $(".wrap-cookie-warning").show();
    });
  }

  $("#close-newsletter-popup-btn, #close-popup-span, button#__button38").click(function () {
    $("#newsletter-popup-wrapper").removeClass("open");
    setCookie("newsletterPopup", "true", 30);
  });

  $("#banner-full-mobile > div > div.banner-full-mobile-slider").slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    speed: 300,
    dots: false,
    arrows: true,
    autoplay: true,
    prevArrow: "<div class='banner-full-mobile-arrow arrow-prev'><div><i></i></div></div>",
    nextArrow: "<div class='banner-full-mobile-arrow arrow-next'><div><i></i></div></div>",
  });

  function validatecaptcha(block) {
    if ($(block).find(".captcha-checkbox-label").children("input[type=checkbox]").is(":checked")) {
      return true;
    }

    return false;
  }

  var label = "Não sou um robô";
  var html = '<label class="captcha-checkbox-label"><input type="checkbox" /><span></span><div>' + label + "</div></label>";
  var htmlNews = '<label class="captcha-checkbox-label newsletter-captcha"><input type="checkbox" /><span></span><div>' + label + "</div></label>";

  $("body > div.page-wrapper.main-content > div > form > fieldset.contact-form__fieldset.contact-form__fieldset--full > label > textarea").after(html);
  $("#newsletter-popup-form").append(htmlNews);

  Module(
    "TAURUS.globals",
    function (globals) {
      globals.$body = $("body");
      globals.document = document;
      globals.$window = $(window);
      globals.$form = $("form.js-main-form") || "";
      globals.noop = function () {};
    },
    {}
  );

  Module(
    "TAURUS.utils",
    function (utils) {
      utils.scrollTo = function ($el) {
        $("html, body").animate({
          scrollTop: $el.offset().top,
        });
      };
    },
    {}
  );

  Module(
    "TAURUS.externalLink",
    function (externalLink) {
      externalLink.init = function () {
        TAURUS.globals.$body.on("click", '[rel="external"]', function (e) {
          e.preventDefault();
          window.open($(this).attr("href"));
        });
      };
    },
    {}
  );

  Module("TAURUS.CustomSelect", function (CustomSelect) {
    CustomSelect.fn.initialize = function ($el) {
      this.$el = $el;

      this.$el.addClass("custom-select--real-select");

      this.$wrap = this.$el.wrap('<div class="custom-select">').parent();
      this.$selectedArea = $('<div class="custom-select__selected">').appendTo(this.$wrap);

      this.$selectedArea.append(this.$el.find("option:selected").html());
      if (this.$el.val()) {
        this.$selectedArea.addClass("custom-select__selected--has-value");
      }

      this.addEvents();
    };

    CustomSelect.fn.addEvents = function () {
      var that = this;

      this.$el.on("change", function () {
        that.$selectedArea.removeClass("custom-select__selected--has-value").html(that.$el.find("option:selected").html());

        if ($(this).val()) {
          that.$selectedArea.addClass("custom-select__selected--has-value");
        }
      });
    };
  });

  Module("TAURUS.CustomFileInput", function (CustomFileInput) {
    CustomFileInput.fn.initialize = function ($el) {
      this.$el = $el;
      this.noFileText = $el.data("no-file-selected");
    };

    CustomFileInput.fn.init = function () {
      this.getWrap();
      this.createFileInfo();
      this.setFileName();
      this.addEventListeners();

      return this;
    };

    CustomFileInput.fn.getWrap = function () {
      this.$wrap = this.$el.parent();
    };

    CustomFileInput.fn.createFileInfo = function () {
      this.$fileInfo = $('<div class="custom-file-input__info"></div>');
      this.$wrap.append(this.$fileInfo);
    };

    CustomFileInput.fn.setFileName = function () {
      var fileName = this.$el.val().replace(/^.*[\\\/]/, "");

      this.$fileInfo.html(fileName || this.noFileText);
    };

    CustomFileInput.fn._onFileChange = function () {
      this.setFileName();
    };

    CustomFileInput.fn.addEventListeners = function () {
      this.$el.on("change", _.bind(this._onFileChange, this));
    };

    CustomFileInput.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.Overlay", function (Overlay) {
    Overlay.fn.initialize = function ($parent) {
      this.$parent = $parent || TAURUS.globals.$body;
    };

    Overlay.fn.init = function () {
      this.createOverlay();

      return this;
    };

    Overlay.fn.createOverlay = function () {
      this.$overlay = $('<div class="overlay">').appendTo(this.$parent);
    };

    Overlay.fn.show = function () {
      this.$overlay.fadeIn();
    };

    Overlay.fn.hide = function () {
      this.$overlay.fadeOut();
    };

    Overlay.fn.toggle = function () {
      this.$overlay.fadeToggle();
    };

    Overlay.fn.addClass = function (classList) {
      this.$overlay.addClass(classList);
    };

    Overlay.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.Spinner", function (Spinner) {
    Spinner.fn.initialize = function ($parent) {
      this.$parent = $parent || TAURUS.globals.$body;
    };

    Spinner.fn.init = function () {
      this.createSpinner();

      return this;
    };

    Spinner.fn.createSpinner = function () {
      this.$spinner = $('<div class="spinner">' + '<div class="double-bounce1"></div>' + '<div class="double-bounce2"></div>' + "</div>").appendTo(this.$parent);
    };

    Spinner.fn.show = function () {
      this.$spinner.fadeIn();
    };

    Spinner.fn.hide = function () {
      this.$spinner.fadeOut();
    };

    Spinner.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.PictureSlider", function (PictureSlider) {
    PictureSlider.fn.initialize = function ($el) {
      this.$el = $el;
      this.width = this.$el.data("width");
      this.$children = this.$el.children();
      this.length = this.$children.length;
      this.animating = false;
    };

    PictureSlider.fn.setWidth = function () {
      this.$el.width(this.width);
    };

    PictureSlider.fn.createPaginationPanel = function () {
      var $pagination = $('<div class="picture-slider__pagination">'),
        paginationHTML = "",
        i = 0;

      for (; i < this.length; i += 1) {
        paginationHTML += '<div class="picture-slider__pagination__item"></div>';
      }

      $pagination.width(this.$el.data("pagination-width")).html(paginationHTML).appendTo(this.$el).children().filter(":eq(0)").addClass("picture-slider__pagination__item--active");

      this.$pagination = $pagination;
    };

    PictureSlider.fn.addEventListeners = function () {
      var self = this;

      if (this.length > 1) {
        this.$pagination.on("click", ".picture-slider__pagination__item", function () {
          self.moveTo($(this).index());
        });
      }
    };

    PictureSlider.fn.moveTo = function (index) {
      var self = this;

      if (!this.animating) {
        this.animating = true;
      } else {
        return false;
      }

      this.$pagination
        .children()
        .removeClass("picture-slider__pagination__item--active")
        .filter(":eq(" + index + ")")
        .addClass("picture-slider__pagination__item--active");

      this.$wrap.fadeOut(function () {
        self.$wrap.css("text-indent", -index * self.width);
        self.$wrap.fadeIn(function () {
          self.animating = false;
        });
      });
    };

    PictureSlider.fn.wrap = function () {
      this.$wrap = this.$el.wrapInner("<div>").children().filter(":eq(0)");
    };

    PictureSlider.fn.init = function () {
      this.wrap();
      this.setWidth();

      if (this.length > 1) {
        this.createPaginationPanel();
      }

      this.addEventListeners();
      return this;
    };

    PictureSlider.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.Form", function (Form) {
    Form.fn.initialize = function ($el) {
      this.$el = $el;
      this.overlay = TAURUS.Overlay.create();
      this.spinner = TAURUS.Spinner.create();
    };

    Form.fn.init = function () {
      this.createMessageContainer();
      this.addEventListeners();
    };

    Form.fn.createMessageContainer = function () {
      this.$messageContainer = $('<div class="default-form__message">' + '<div class="table">' + '<div class="table__cell table__cell--v-middle">' + "</div>" + "</div>" + "</div>").appendTo(this.$el);
      this.$message = this.$messageContainer.find(".table__cell");
    };

    Form.fn.addEventListeners = function () {
      this.$el.on("submit", _.bind(this._onSubmit, this)).on("click", ".js-form-clear-message", _.bind(this._onClearMessageClick, this)).on("click", ".js-form-reset-fields", _.bind(this._onResetFieldsClick, this));
      this.$el.find(".js-custom-select").on("change", { target: 'select[name="subject"]' }, _.bind(this._onChangeSubject, this));
    };

    Form.fn._onClearMessageClick = function (e) {
      e.preventDefault();
      this.$messageContainer.fadeOut();
    };

    Form.fn._onResetFieldsClick = function (e) {
      e.preventDefault();
      $('<button type="reset">').appendTo(this.$el).trigger("click").remove();
      this.$el.find("select").trigger("change");
    };

    Form.fn._onChangeSubject = function (e) {
      var validOptions = ["Dúvidas e Sugestões", "Informações sobre pedidos de compra", "Assistência Técnica", "Financeiro"];

      if (this.$el.find(e.data.target).val() == "Financeiro") {
        this.$el.find(".js-user-select.show-if-financeiro").show();
        $(".js-user-select.show-if-financeiro select").prop("disabled", false);
        $(".js-user-select.show-if-financeiro select").addClass("js-validate-required");

        this.$el.find(".js-user-select.show-if-duvidas-or-informacoes").hide();
        $(".js-user-select.show-if-duvidas-or-informacoes select").prop("disabled", true);
        $(".js-user-select.show-if-duvidas-or-informacoes select").removeClass("js-validate-required");
      } else if (this.$el.find(e.data.target).val() == "Dúvidas e Sugestões" || this.$el.find(e.data.target).val() == "Informações sobre pedidos de compra") {
        this.$el.find(".js-user-select.show-if-duvidas-or-informacoes").show();
        $(".js-user-select.show-if-duvidas-or-informacoes select").prop("disabled", false);
        $(".js-user-select.show-if-duvidas-or-informacoes select").addClass("js-validate-required");

        this.$el.find(".js-user-select.show-if-financeiro").hide();
        $(".js-user-select.show-if-financeiro select").prop("disabled", true);
        $(".js-user-select.show-if-financeiro select").removeClass("js-validate-required");
      } else {
        this.$el.find(".js-user-select").hide();
        $('.js-user-select input[name="user"]').prop("disabled", true);
        $('.js-user-select input[name="user"]').removeClass("js-validate-required");
      }

      if (validOptions.indexOf(this.$el.find(e.data.target).val()) > -1) {
        this.$el.find(".js-sliding-select").fadeIn(function () {
          $('.js-sliding-select input[name="cpf"]').prop("disabled", false);
          $('.js-sliding-select input[name="cpf"]').addClass("js-validate-required");
        });
      } else {
        this.$el.find(".js-sliding-select").fadeOut(function () {
          $('.js-sliding-select input[name="cpf"]').prop("disabled", true);
          $('.js-sliding-select input[name="cpf"]').removeClass("js-validate-required");
        });
      }
    };

    Form.fn.showLoading = function () {
      this.overlay.show();
      this.spinner.show();
    };

    Form.fn.hideLoading = function () {
      this.overlay.hide();
      this.spinner.hide();
    };

    Form.fn._onSubmit = function () {
      if (this.validate()) {
        this.showLoading();
        this.send.call(this, _.bind(this.handleSendResponse, this));
      } else {
        // TAURUS.utils.scrollTo($('.js-validate-required:first'));
      }

      return false;
    };

    Form.fn.validate = function () {
      var $inputs = this.$el.find(":input:not(:button)"),
        $required = $inputs.filter(".js-validate-required"),
        hasErrors = false;

      $required.each(function () {
        var $input = $(this);

        if (!$input.val()) {
          $input.addClass("input-error");
          hasErrors = true;
        }
      });

      var captchaSpan = "body > div.page-wrapper.main-content > div > form > fieldset.contact-form__fieldset.contact-form__fieldset--full > label > label > span";

      $inputs.removeClass("input-error");
      $(captchaSpan).removeClass("input-error");

      if (!validatecaptcha("body > div.page-wrapper.main-content > div > form")) {
        $(captchaSpan).addClass("input-error");
        hasErrors = true;
      }

      return !hasErrors;
    };

    Form.fn.send = function (cb) {
      var self = this,
        successFn = typeof cb === "function" ? cb : TAURUS.globals.noop;

      this.$el.ajaxSubmit({
        url: this.$el.attr("data-url-action"),
        type: this.$el.attr("method") || "post",
        dataType: "json",
        success: successFn,
      });
    };

    Form.fn.showMessage = function (message) {
      this.$message.html(message);
      this.$messageContainer.fadeIn();

      if ($(".default-form__message").length > 0) {
        $("form > p, form > .fancy-table").remove();
        $("html, body").animate(
          {
            scrollTop: $(".default-form__message").offset().top - 20,
          },
          "slow"
        );
      }
    };

    Form.fn.hideMessage = function () {
      this.$messageContainer.fadeOut();
    };

    Form.fn.handleSendResponse = function (data) {
      this.showMessage(data.mensagem);
      this.hideLoading();
      if (data.url) {
        window.location.href = data.url;
      }
    };

    Form.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.FilterContent", function (FilterContent) {
    FilterContent.fn.initialize = function ($el) {
      this.$el = $el;
      this.$filterSummary = $el.find(".js-filter-summary");
      this.filterSummaryTemplate = _.template($el.find(".js-filter-summary-template").html());
      this.$target = $($el.data("target"));
      this.marginRight = this.$target.filter(":eq(0)").css("margin-right");
      this.itemsToShow = $el.data("items-to-show");
    };

    FilterContent.fn.init = function () {
      this.addEventListeners();
    };

    FilterContent.fn.getSummaryJSON = function () {
      var summary = {};

      this.$el.find(":input:not(:button)").each(function () {
        var $input = $(this),
          val;

        val = $input.val();

        if ($input.prop("tagName") === "SELECT") {
          if (val) {
            val = $input.find("option:selected").html();
          }
        }

        summary[$input.attr("name")] = val;
      });

      return summary;
    };

    FilterContent.fn.updateSummary = function () {
      this.$filterSummary.html(this.filterSummaryTemplate(this.getSummaryJSON()));
    };

    FilterContent.fn.addEventListeners = function () {
      var self = this;

      this.$el
        .on("change", ":input:not(:button)", function () {
          self.filter();
          self.updateSummary();
        })
        .on("content-updated", function () {
          self.$target = $(self.$el.data("target"));
          self.filter();
        });
    };

    FilterContent.fn.getQuery = function () {
      var parts = [],
        $inputs = this.$el.find(":input:not(:button)");

      $inputs.each(function () {
        var val = $(this).val();

        if (val) {
          parts.push("." + $(this).val());
        }
      });

      return parts.join("");
    };

    FilterContent.fn.filter = function () {
      var q = this.getQuery(),
        self = this,
        $hide,
        $show,
        cb;

      $hide = this.$target.filter(":not(" + q + ")");
      $show = q ? this.$target.filter(q) : this.$target;

      cb = function () {
        var $marginAdjust;

        self.$target.css("margin-right", 0);
        $show
          .filter(function (index) {
            return index % self.itemsToShow;
          })
          .css("margin-right", self.marginRight);

        $show.fadeIn();
      };

      if ($hide.length) {
        $.when($hide.fadeOut()).done(_.bind(cb, this));
      } else {
        cb();
      }
    };

    FilterContent.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.LoadMore", function (LoadMore) {
    LoadMore.fn.initialize = function ($el) {
      this.$el = $el;
      this.$loadMoreContent = $el.find(".js-load-more-content");
      this.$loadMoreButton = $el.find(".js-load-more-button");
      this.overlay = new TAURUS.Overlay();
      this.spinner = new TAURUS.Spinner();
      this.cache = {};
      this.loadedURLs = [];
      this.currentURLUid = 0;
    };

    LoadMore.fn.getTemplate = function () {
      this.template = _.template(this.$el.find(".js-load-more-template").html());
    };

    LoadMore.fn.init = function () {
      this.getTemplate();
      this.addEventListeners();
      this.overlay.init();
      this.spinner.init();
    };

    LoadMore.fn.doRequest = function (url) {
      var self = this;

      this.overlay.show();
      this.spinner.show();
      $.ajax({
        url: url,
        dataType: "json",
        type: "post",
      }).done(
        _.bind(this.handleRequestResponse, this, url, function (data) {
          self.overlay.hide();
          self.spinner.hide();
          if (parseInt(data.next) !== -1) {
            $(".js-load-more-button").attr("href", data.next);
          } else {
            $(".js-load-more-button").attr("disabled", "disabled");
          }
        })
      );
    };

    LoadMore.fn.handleRequestResponse = function (url, cb, data) {
      var downloadsHTML = "",
        self = this,
        $downloadsHTML;

      downloadsHTML += self.template({
        data: data,
      });

      $downloadsHTML = $(downloadsHTML);

      this.cache[url] = $downloadsHTML;
      this.loadedURLs.push(url);
      this.addContent($downloadsHTML);

      if (data.next) {
        self.currentURLUid += 1;
        history.pushState &&
          history.pushState(
            {
              id: self.currentURLUid,
            },
            "",
            url
          );
      }

      if (typeof cb === "function") {
        cb(data);
      }
    };

    LoadMore.fn.addContent = function (html) {
      this.$loadMoreContent.append(html).trigger("content-updated");
    };

    LoadMore.fn.addEventListeners = function () {
      var self = this;

      this.$el.on("click", ".js-load-more-button", function (e) {
        var url = $(this).attr("href");

        if ($(this).attr("disabled")) {
          return false;
        }

        e.preventDefault();

        self.doRequest(url);
      });

      TAURUS.globals.$window.on("popstate", function (evt) {
        var url = location.href,
          state = evt.originalEvent.state,
          $html = self.cache[self.loadedURLs.pop()];

        if (/#/g.test(url)) {
          return false;
        }

        if (!state || state.id < self.currentURLUid) {
          // 'back'
          if (!$html) {
            location.href = url;
          }
          $html.hide();
          self.currentURLUid -= 1;
        } else {
          $html = self.cache[url];
          if (!$html) {
            self.doRequest(url);
          } else {
            $html.show();
          }
        }
      });
    };

    LoadMore.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.FooterNav", function (FooterNav) {
    FooterNav.fn.initialize = function ($el) {
      this.$el = $el;
      this.$mainNav = this.$el.find(".js-footer-nav__main-nav");
      this.$toggle = this.$el.find(".js-footer-nav__toggle");
    };

    FooterNav.fn._onNavToggleClick = function (e) {
      this.toggleNav(e);
      this.toggleNavTrigger(e);
    };

    FooterNav.fn.addEventListeners = function () {
      this.$el.on("click", ".js-footer-nav__toggle", _.bind(this._onNavToggleClick, this));
    };

    FooterNav.fn.toggleNav = function (e) {
      e.preventDefault();
      this.$mainNav.slideToggle(function () {
        TAURUS.utils.scrollTo($(this));
      });
    };

    FooterNav.fn.toggleNavTrigger = function () {
      this.$toggle.each(function () {
        var $self = $(this),
          oldText = $self.html();

        $self.toggleClass($self.data("toggle-class"));
        $self.html($self.data("toggle-text"));
        $self.data("toggle-text", oldText);
      });
    };

    FooterNav.fn.init = function () {
      this.addEventListeners();
    };

    FooterNav.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.Modal", function (Modal) {
    Modal.fn.initialize = function ($parent) {
      this.$parent = $parent || TAURUS.globals.$body;
      this.overlay = new TAURUS.Overlay(this.$parent);
      this.$modal = this.createModal();
      this.$modalContent = this.$modal.find(".js-modal-content");
    };

    Modal.fn.setContent = function ($content) {
      this.$modalContent.html($content);

      return this;
    };

    Modal.fn.init = function () {
      this.overlay.init();
      this.$modal.appendTo(this.$parent);
      this.addEventListeners();

      return this;
    };

    Modal.fn.addEventListeners = function () {
      this.$modal.on("click", ".js-modal-close", _.bind(this.hide, this));
    };

    Modal.fn.show = function () {
      this.overlay.show();
      this.$modal.fadeIn();
    };

    Modal.fn.hide = function () {
      this.overlay.hide();
      this.$modal.fadeOut();
    };

    Modal.fn.createModal = function () {
      return $('<div class="modal-wrapper">' + '<div class="modal">' + '<div class="table table--fixed table--full">' + '<div class="table__cell table__cell--v-middle">' + '<div class="modal__close js-modal-close">X</div>' + '<div class="js-modal-content"></div>' + "</div>" + "</div>" + "</div>" + "</div>").hide();
    };

    Modal.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.VideoList", function (VideoList) {
    VideoList.fn.initialize = function ($el) {
      this.$el = $el;
      this.modal = new TAURUS.Modal();
    };

    VideoList.fn.init = function () {
      this.modal.init();
      this.addEventListeners();
    };

    VideoList.fn.openVideo = function (href) {
      var videoId = /\?v=([^\?]*)/g.exec(href)[1];

      this.modal.setContent('<iframe width="940" height="500" src="//www.youtube.com/embed/' + videoId + '" frameborder="0" allowfullscreen></iframe>').show();
    };

    VideoList.fn.addEventListeners = function () {
      var self = this;

      this.$el.on("click", ".js-video-list__item", function (e) {
        e.preventDefault();
        self.openVideo($(this).attr("href"));
      });
    };

    VideoList.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.ContentBannerGallery", function (ContentBannerGallery) {
    ContentBannerGallery.fn.initialize = function ($el) {
      this.$el = $el;
      this.$children = this.$el.children();
      this.length = this.$children.length;
      this.current = 0;
      this.animating = false;
      this.rotate = this.$el.data("rotate");
      this.rotateInterval = 5000;
    };

    ContentBannerGallery.fn.init = function () {
      this.hideAll();
      this.showFirst();
      if (this.length > 1) {
        this.addNavigation();
      }
      if (this.rotate) {
        this.addRotation();
      }
      this.addEventListeners();
    };

    ContentBannerGallery.fn.addRotation = function () {
      var self = this;

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(function () {
        self.showNext();
        self.addRotation();
      }, this.rotateInterval);
    };

    ContentBannerGallery.fn.hideAll = function () {
      this.$children.hide();
    };

    ContentBannerGallery.fn.showFirst = function () {
      this.$children.filter(":eq(0)").show();
    };

    ContentBannerGallery.fn.addNavigation = function () {
      var navigationHTML = '<div class="arrow-navigation arrow-navigation--bottom-left">' + '<svg width="30" height="30" viewBox="0 0 20 30">' + "<polyline " + 'class="js-content-banner-gallery__prev"' + 'points="15 1, 1 14, 15 27"></polyline>' + "</svg>" + '<svg width="30" height="30" viewBox="0 0 20 30">' + "<polyline " + 'class="js-content-banner-gallery__next"' + 'points="1 1, 15 14, 1 27"></polyline>' + "</svg>" + "</div>";

      this.$el.append(navigationHTML);
    };

    ContentBannerGallery.fn.addEventListeners = function () {
      var self = this;

      this.$el
        .on("click", ".js-content-banner-gallery__prev", _.bind(this.showPrev, this))
        .on("click", ".js-content-banner-gallery__next", _.bind(this.showNext, this))
        .on("mouseenter", function (e) {
          e.stopPropagation();
          e.preventDefault();
          clearTimeout(self.timeout);
        })
        .on("mouseleave", function (e) {
          e.stopPropagation();
          e.preventDefault();
          self.addRotation();
        });
    };

    ContentBannerGallery.fn.showPrev = function () {
      var oldCurrent = this.current;

      if (this.animating) {
        return;
      }

      if (!this.current) {
        this.current = this.length - 1;
      } else {
        this.current -= 1;
      }
      this.show(oldCurrent, this.current);
    };

    ContentBannerGallery.fn.showNext = function () {
      var oldCurrent = this.current;
      if (this.animating) {
        return;
      }

      this.current = (this.current + 1) % this.length;
      this.show(oldCurrent, this.current);
    };

    ContentBannerGallery.fn.show = function (oldIndex, index) {
      var $hide = this.$children.filter(":eq(" + oldIndex + ")"),
        $show = this.$children.filter(":eq(" + index + ")"),
        self = this;

      this.animating = true;

      $hide.fadeOut(function () {
        $show.fadeIn(function () {
          self.animating = false;
        });
      });
    };

    ContentBannerGallery.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.BusinessBoxGallery", function (BusinessBoxGallery) {
    BusinessBoxGallery.fn.initialize = function ($el) {
      this.$el = $el;
      this.$children = this.$el.children();
      this.current = 0;
      this.length = this.$children.length;
      this.animating = false;
      this.galleryURL = this.$el.data("gallery-url");
    };

    BusinessBoxGallery.fn.init = function () {
      this.addNavigation();
      this.addEventListeners();
      this.openSelected();
    };

    BusinessBoxGallery.fn.openSelected = function () {
      var currentSlug = $("#current_slug").val();

      if (currentSlug) {
        $("#negocio-" + currentSlug).trigger("open");
      }
    };

    BusinessBoxGallery.fn.addEventListeners = function () {
      var self = this;

      this.$el
        .parent()
        .on("click", ".js-business-box-gallery__prev", _.bind(this.showPrev, this))
        .on("click", ".js-business-box-gallery__next", _.bind(this.showNext, this))
        .on("business-box:opened", function (e, index) {
          self.animating = false;
          self.current = index;
        })
        .on("business-box:opening", function () {
          self.$navigation.fadeIn();
        })
        .on("business-box:closing", function () {
          self.$navigation.fadeOut();
          history.replaceState && history.replaceState({}, {}, self.galleryURL);
        });
    };

    BusinessBoxGallery.fn.showPrev = function () {
      var oldCurrent = this.current;
      if (this.animating) {
        return false;
      }

      if (!this.current) {
        this.current = this.length - 1;
      } else {
        this.current -= 1;
      }

      this.show(oldCurrent, this.current);
    };

    BusinessBoxGallery.fn.showNext = function () {
      var oldCurrent = this.current;

      if (this.animating) {
        return false;
      }

      this.current = (this.current + 1) % this.length;

      this.show(oldCurrent, this.current);
    };

    BusinessBoxGallery.fn.show = function (oldIndex, index) {
      var $hide = this.$children.filter(":eq(" + oldIndex + ")"),
        $show = this.$children.filter(":eq(" + index + ")");

      this.animating = true;

      $hide.trigger("close");
      $show.trigger("open");
    };

    BusinessBoxGallery.fn.addNavigation = function () {
      var navigationHTML = '<div class="arrow-navigation arrow-navigation--bottom-right">' + '<svg width="16" height="28" viewBox="0 0 16 28">' + "<polyline " + 'class="js-business-box-gallery__prev"' + 'points="15 1, 1 14, 15 27"></polyline>' + "</svg>" + '<svg width="16" height="28" viewBox="0 0 16 28">' + "<polyline " + 'class="js-business-box-gallery__next"' + 'points="1 1, 15 14, 1 27"></polyline>' + "</svg>" + "</div>";

      this.$navigation = $(navigationHTML).hide();

      this.$el.parent().append(this.$navigation);
    };

    BusinessBoxGallery.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.BusinessBox", function (BusinessBox) {
    BusinessBox.fn.initialize = function ($el) {
      this.$el = $el;
      this.$content = this.$el.find(".business-box__content");
    };

    BusinessBox.fn.init = function () {
      this.addOverlay();
      this.addCloseButton();
      this.copyMainImage();
      this.addEventListeners();
    };

    BusinessBox.fn.addCloseButton = function () {
      this.$content.append('<div class="business-box__close">X</div>');
    };

    BusinessBox.fn.addEventListeners = function () {
      var self = this;

      this.$el.on("click", ".js-business-box__anchor", _.bind(this.open, this)).on("open", _.bind(this.open, this)).on("click", ".business-box__close", _.bind(this.close, this, true)).on("close", _.bind(this.close, this));
    };

    BusinessBox.fn.open = function (e) {
      var target = [this.$overlay, this.$content, this.$mainImage],
        self = this,
        count = 0;

      e.preventDefault();
      e.stopPropagation();

      history.replaceState && history.replaceState({}, {}, this.$el.find(".js-business-box__anchor").attr("href"));

      this.$el.trigger("business-box:opening");

      _.forEach(target, function ($el) {
        $el.fadeIn(function () {
          count += 1;

          if (count === target.length - 1) {
            self.$el.trigger("business-box:opened", self.$el.index());
          }
        });
      });
    };

    BusinessBox.fn.close = function (param1, param2) {
      var target = [this.$overlay, this.$content, this.$mainImage],
        self = this,
        count = 0,
        e,
        trigger;

      if (param2 === undefined) {
        e = param1;
      } else {
        e = param2;
        trigger = param1;
      }

      trigger && this.$el.trigger("business-box:closing");

      e.stopPropagation();

      _.forEach(target, function ($el) {
        $el.fadeOut(function () {
          count += 1;

          if (count === target.length - 1) {
            self.$el.trigger("business-box:closed");
          }
        });
      });
    };

    BusinessBox.fn.addOverlay = function () {
      this.$overlay = $('<div class="business-box__overlay">');

      this.$overlay.appendTo(this.$el);
    };

    BusinessBox.fn.copyMainImage = function () {
      this.$mainImage = this.$el.find(".js-business-box__main-image").clone();

      this.$el.append(this.$mainImage.addClass("business-box__main-image"));
    };

    BusinessBox.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.MainNav", function (MainNav) {
    MainNav.fn.initialize = function ($el) {
      this.$el = $el;
      this.$mainNav = $el.find(".js-main-nav__nav");
      this.$mainNavTrigger = $el.find(".js-main-nav__trigger");
      this.overlay = new TAURUS.Overlay();

      this.$taurusLogo = $(".js-taurus-logo");
    };

    MainNav.fn.init = function () {
      this.overlay.init();
      this.overlay.addClass("overlay--dotted overlay--cover-page");
      this.addToggleArrows();
      this.setLogoZIndex();
      this.addEventListeners();
      this.selectCurrentURL();
    };

    MainNav.fn.selectCurrentURL = function () {
      var $target = this.$el.find('a[href="' + location.href + '"]');

      $target.addClass("main-nav__item--is-selected");

      if ($target.hasClass("main-nav__item__subnav__item")) {
        $target.parent().parent().trigger("click");
      }
    };

    MainNav.fn.setLogoZIndex = function () {
      this.$taurusLogo.css("position", "relative").data("toggle-z-index", (parseInt(this.overlay.$overlay.css("z-index"), 10) || 0) + 1);
    };

    MainNav.fn.addToggleArrows = function () {
      var $target = this.$el.find(".main-nav__item__subnav"),
        arrowHTML = '<svg class="main-nav__item__arrow" ' + 'viewbox="0 0 34 17" width="34" height="17">' + "<polyline " + 'points="0 1, 16 16, 32 0" ' + 'toggle-points="1 16, 16 1, 32 16"' + "></polyline>";
      ("</svg>");

      $target.each(function () {
        $(this).parent().append(arrowHTML);
      });
    };

    MainNav.fn.toggleMainNavItem = function () {
      var $self = $(this),
        $title = $self.find(".main-nav__item__title"),
        $arrow = $self.find(".main-nav__item__arrow polyline"),
        $subNav = $self.find(".main-nav__item__subnav"),
        arrOldPoints;

      $subNav.slideToggle();
      if ($title.prop("tagName") !== "A") {
        $title.toggleClass("main-nav__item__title--active");
      }

      arrOldPoints = $arrow.attr("points");
      $arrow.attr("points", $arrow.attr("toggle-points"));
      $arrow.attr("toggle-points", arrOldPoints);
    };

    MainNav.fn.addEventListeners = function () {
      this.$el
        .on("click", ".js-main-nav__trigger", _.bind(this.triggerMainNav, this))
        .on("click", ".main-nav__item", this.toggleMainNavItem)
        .on("click", ".main-nav__item__subnav__item", function (e) {
          var $link = $(this);

          e.stopPropagation();
          if ($link.attr("rel") === "external") {
            window.open($link.attr("href"));
            return false;
          }
          return true;
        });

      var me = this;

      $(".overlay").on("click", function () {
        if ($(".js-main-nav__nav").is(":visible")) {
          me.triggerMainNav();
        }
      });
    };

    MainNav.fn.triggerMainNav = function (e) {
      var $target = this.$mainNavTrigger,
        $targetText = $target.find(".main-nav__trigger__text"),
        logoOldZIndex,
        oldText;

      this.overlay.toggle();
      this.$mainNav.fadeToggle();

      logoOldZIndex = this.$taurusLogo.css("z-index");
      this.$taurusLogo.css("z-index", this.$taurusLogo.data("toggle-z-index"));
      this.$taurusLogo.data("toggle-z-index", logoOldZIndex);

      $target.toggleClass("main-nav__trigger--active");

      oldText = $targetText.html();
      $targetText.html($targetText.data("toggled-text"));
      $targetText.data("toggled-text", oldText);
    };

    MainNav.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  Module("TAURUS.Promotions", function (Promotions) {
    Promotions.fn.initialize = function ($el) {
      this.$el = $el;
    };

    Promotions.fn.init = function () {
      this.addEventListeners();
    };

    Promotions.fn.addEventListeners = function () {
      this.$el.find(".js-promotion-button").on("click", this.addFields);

      this.$el.on("click", ".js-remove-fieldset", this.removeFieldset);

      this.$el.on("change", ".js-promotion-select", this.paymentMethods);
    };

    Promotions.fn.paymentMethods = function () {
      var self = this;
      var model_id = self.value;
      var model_field = self.name.split("_")[1];
      var url = TAURUS.globals.$form.data("domain") + "/payment_methods/" + model_id;
      var selector = 'select[name="payment_method_' + model_field + '"]';
      var tmplt = "";

      this.dataset.selected = model_id;

      $.getJSON(
        url,
        {
          x: model_id,
        },
        function (response) {
          tmplt += response.map(function (option) {
            return Mustache.render('<option value="{{id}}">{{descricao}}</option>', option);
          });

          $(selector).html(tmplt);
        }
      );
    };

    Promotions.fn.addFields = function () {
      var selectNum = $(".js-promotion-select").length;

      var inUse = $.makeArray(
        $(".js-promotion-select").map(function () {
          return $(this).data("selected");
        })
      );

      if (selectNum < 2) {
        var current = selectNum + 1;
        var url = TAURUS.globals.$form.data("domain") + "/ajax/";
        var tmplt = '<fieldset class="contact-form__fieldset contact-fieldset">';
        tmplt += '<label><span class="visuallyhidden">Modelo</span>';
        tmplt += '<select name="modelo_' + current + '" class="js-promotion-select full-select">';
        tmplt += '<option selected disabled hidden value="">Escolha modelo desejado</option>';
        tmplt += '{{#models}}<option value="{{id}}">{{modelo}}</option>{{/models}}';
        tmplt += "</select>";
        tmplt += "</label>";
        tmplt += "<label>";
        tmplt += '<span class="visuallyhidden">Forma de Pagamento</span>';
        tmplt += '<select name="payment_method_' + current + '" class="full-select">';
        tmplt += '<option selected disabled hidden value="">Escolha a forma de pagamento</option>';
        tmplt += "</select>";
        tmplt += "</label>";
        tmplt += '<span class="delete-bt js-remove-fieldset"></span>';
        tmplt += "</fieldset>";

        $.getJSON(url, function (response) {
          var filtered = {};
          var filtered_response = response.filter(function (method) {
            return inUse.indexOf(Number(method.id)) === -1;
          });

          filtered.models = filtered_response;

          $(".contact-fieldset").last().after(Mustache.render(tmplt, filtered));
        });

        if (selectNum === 1) {
          $(".js-promotion-button").addClass("button-disabled").attr("disabled", true);
        }
      }
    };

    Promotions.fn.removeFieldset = function () {
      $(this)
        .parent()
        .slideUp(function () {
          $(this).remove();
        });

      if ($(".js-promotion-select").length <= 3) {
        $(".js-promotion-button").attr("disabled", false);
      }
    };

    Promotions.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));
      return instance.init();
    };
  });

  Module("TAURUS.SearchForm", function (SearchForm) {
    SearchForm.fn.initialize = function ($el) {
      this.$el = $el;
      this.$tableCell = $el.closest(".table__cell");
      this.$input = $el.find(".search-form__input");
      this.$btn = $el.find(".search-form__submit");
    };

    SearchForm.fn.init = function () {
      this.addEventListeners();
    };

    SearchForm.fn.addEventListeners = function () {
      var me = this;
      this.$el.on("mouseenter", function () {
        me.showInput();
      });

      this.$el.on("mouseleave", function () {
        setTimeout(function () {
          me.hideInput();
        }, 3000);
      });

      this.$input.on("focusout", function () {
        setTimeout(function () {
          me.hideInput();
        }, 3000);
      });
    };

    SearchForm.fn.showInput = function () {
      var me = this;
      if ($(window).width() > 600) {
        me.$tableCell.stop().animate({ width: 290 }, 500);
      }
      me.$input.stop().animate({ width: 172, padding: "8px" }, 500);
    };

    SearchForm.fn.hideInput = function () {
      var me = this;
      if (!me.$input.is(":focus") && !me.$el.is(":hover")) {
        me.$tableCell.stop().animate({ width: 160 }, 500);
        me.$input.stop().animate({ width: 0, padding: 0 }, 500);
      }
    };

    SearchForm.create = function () {
      var instance = this.apply(null, [].slice.call(arguments));

      return instance.init();
    };
  });

  $('[data-js-module="js-promotion"]').each(function () {
    TAURUS.Promotions.create($(this));
  });

  $(".search-form").each(function () {
    TAURUS.SearchForm.create($(this));
  });

  $(".js-footer-nav").each(function () {
    TAURUS.FooterNav.create($(this));
  });

  $(".js-main-nav").each(function () {
    TAURUS.MainNav.create($(this));
  });

  $(".js-business-box").each(function () {
    TAURUS.BusinessBox.create($(this));
  });

  $(".js-business-box-gallery").each(function () {
    TAURUS.BusinessBoxGallery.create($(this));
  });

  $(".js-content-banner-gallery").each(function () {
    TAURUS.ContentBannerGallery.create($(this));
  });

  $(".js-video-list").each(function () {
    TAURUS.VideoList.create($(this));
  });

  $(".js-load-more").each(function () {
    TAURUS.LoadMore.create($(this));
  });

  $(".js-picture-slider").each(function () {
    TAURUS.PictureSlider.create($(this));
  });

  $(".js-custom-select").each(function () {
    new TAURUS.CustomSelect($(this));
  });

  $(".js-form").each(function () {
    TAURUS.Form.create($(this));
  });

  $(".js-filter-content").each(function () {
    TAURUS.FilterContent.create($(this));
  });

  $(".js-custom-file-input").each(function () {
    TAURUS.CustomFileInput.create($(this));
  });

  $("#breadcrumb-categories").on("click", function (e) {
    e.preventDefault();
    $(".js-main-nav__trigger").trigger("click");
  });

  TAURUS.externalLink.init();

  $(".banner-nav-item").hover(function (e) {
    e.preventDefault();
    var classe = $(this).data("href");
    $(".active").removeClass("active");
    $(this).addClass("active");
    $(".banner-item-active").removeClass("banner-item-active");
    $(classe).addClass("banner-item-active").fadeIn();
  });

  $(".distributors-nav a").click(function (e) {
    e.preventDefault();
    var url = $(".distributors-nav").data("url");
    var filtro = $(this).data("filter");
    var filtroF = filtro.replace(".", "");
    $(".item-active").removeClass("item-active");
    changeMap(filtroF);
    history.pushState({}, {}, url + "/" + filtroF);
  });

  $(".downloads--filter").change(function (e) {
    e.preventDefault();

    var filter = $(this).val();

    if (filter != "todas") {
      window.history.pushState("page", "Downloads | Taurus Armas", "/pt/downloads?categoria=" + filter);
    } else {
      window.history.pushState("page", "Downloads | Taurus Armas", "/pt/downloads");
    }

    switch (filter) {
      case "catalogos":
        filter = "catálogos";
        break;
      case "noticias":
        filter = "notícias";
        break;
      case "posters":
        filter = "posters";
        break;
      case "manuais":
        filter = "manuais";
        break;
      case "regulamentos":
        filter = "regulamentos";
        break;
      default:
        filter = "todas";
        break;
    }

    $(".heading--downloads").html(filter);
  });

  function changeMap(src) {
    var image = $(".distributors-map img").attr("data-url");
    $(".distributors-map img").attr("src", image + src + ".png");
  }

  $(function () {
    var cl = "",
      classeActive = $(".distributors-nav").data("active");
    if (classeActive) {
      cl = "." + classeActive;
      changeMap(classeActive);
    } else {
      cl = "all";
    }
    $(".distributors-page").mixItUp({
      load: {
        filter: cl,
      },
    });

    howToBuyFilter.init();
    calibreFilter.init();
    assistanceFilter.init();

    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var urlParamsFilter = false;

    switch (urlParams.get("categoria")) {
      case "catalogos":
        urlParamsFilter = ".catalogos";
        break;
      case "noticias":
        urlParamsFilter = ".noticias";
        break;
      case "posters":
        urlParamsFilter = ".posters";
        break;
      case "manuais":
        urlParamsFilter = ".manuais";
        break;
      case "regulamentos":
        urlParamsFilter = ".regulamentos";
        break;
      default:
        urlParamsFilter = false;
        break;
    }

    if (urlParamsFilter) {
      $(".download-page").mixItUp({
        load: {
          filter: urlParamsFilter,
        },
      });
    } else {
      $(".download-page").mixItUp();
    }

    $("select").on("change", function () {
      $(this).prop("selected", true).trigger("click");
    });

    $(".downloads--filter").on("change", function () {
      $(".downloads--filter option:selected").trigger("click");
    });

    // var hash = window.location.hash.substring(1).toLowerCase();

    // $(".downloads--filter option").each(function () {
    //   if ($(this).val().toLowerCase() == hash) {
    //     $(this).prop("selected", true).trigger("change");
    //   }
    // });

    $("select option").each(function () {
      if ($(this).val().toLowerCase() == hash) {
        $(this).prop("selected", true).trigger("change");
      }
    });

    if ($(".banner-nav ul li").length > 0) {
      var max = $(".banner-nav ul li").length;
      var i = 0;
      setInterval(function () {
        $(".banner-nav ul li:eq(" + i + ") a").click();
        i++;
        if (i == max) {
          i = 0;
        }
      }, 8000);

      $(".banner-nav ul li a").click(function () {
        i = $(this).parent().index();
      });
    }
  });

  $(".item-question .icon").click(function (e) {
    var elementClass = e.target.classList;
    if (elementClass.contains("down")) {
      elementClass.remove("down");
      elementClass.add("up");
    } else {
      elementClass.remove("up");
      elementClass.add("down");
    }
    $(e.target.parentNode.parentNode).find(".item-answer").slideToggle();
  });

  //COMO COMPRAR
  $(".how-to-buy-nav a").click(function (e) {
    e.preventDefault();
    var url = $(".how-to-buy-nav").data("url"),
      filter = $(this).data("item"),
      nav = e.target.parentElement,
      ativo = "";
    var item = filter.replace(".", "");

    var pushstate = $(this).data("pushstate");

    if (nav.getAttribute("data-active") == item) return;

    if (item == "calibre-restrito" || item == "calibre-permitido" || item == "cacs") {
      ativo = "restricted";
    } else {
      ativo = "show";
    }

    $(".item-active").removeClass("item-active");
    $(e.target).addClass("item-active");
    history.pushState({}, {}, url + "/" + pushstate);
    // console.log(pushstate);
    $(".breadcrumb").children().eq(2).text(e.target.text);
    $(".breadcrumb").children().eq(2).attr("href", location.href);
    document.getElementById("state-select-label").style.display = item == "psicologos" || item == "instrutores" ? "none" : "block";
    document.getElementById("city-select-label").style.display = item == "lojistas" ? "block" : "none";
    document.getElementById("instrutores-text").style.display = item == "instrutores" ? "block" : "none";
    document.getElementById("psicologos-text").style.display = item == "psicologos" ? "block" : "none";

    if (ativo != "restricted" && nav.getAttribute("last") != "restricted") {
      howToBuyFilter.output.type = filter;
      $("#state-select").val("").change();
    } else if (ativo != "show" && nav.getAttribute("last") != "show") {
      calibreFilter.output.type = filter;
      calibreFilter.filter();
    }
    if ((ativo == "restricted" || nav.getAttribute("last") != "show") && (ativo == "show" || nav.getAttribute("last") != "restricted")) {
      $("#how-to-buy-content").fadeOut(function () {
        switch (ativo) {
          case "restricted":
            changeView("restricted", item, nav, ativo);
            break;
          default:
            changeView("template1", item, nav, ativo);
            break;
        }
      });
    }
    nav.setAttribute("data-active", item);
  });

  $(".how-to-buy-form").on("change", "select", function (e) {
    e.preventDefault();
    if (e.target.id == "state-select") {
      howToBuyFilter.output.state = e.target.value;
      var url = location.href.replace(location.href.split("/").pop(), "");
      $("#city-select").val("").change();
      if (e.target.value != "") {
        $.ajax({
          url: url + "city_filter/" + e.target.value.replace(".", "") + "/" + location.href.split("/").pop(),
          type: "POST",
          dataType: "json",
          success: function (data) {
            var listitems = $("#city-select").children()[0].outerHTML;
            $("#city-select").children().remove();
            $.each(data, function (index, city) {
              listitems += "<option value=." + city.id + ">" + city.name + "</option>";
            });
            $("#city-select").append(listitems);
          },
        });
      }
      changeBrasilMap(e.target.value);
    } else {
      howToBuyFilter.output.city = e.target.value;
      howToBuyFilter.filter();
    }
  });

  function changeView(view, item, nav, ativo) {
    var views = ["restricted", "template1"],
      lastVisited = "";
    for (var i = views.length - 1; i >= 0; i--) {
      if (views[i] == view) {
        if (view == "template1") {
          $("#" + views[i]).show("fast", function () {
            howToBuyFilter.output.type = "." + item;
            $("#state-select").val("").change();
          });
        } else {
          $("#" + views[i]).show("fast", function () {
            calibreFilter.output.type = "." + item;
            calibreFilter.filter();
          });
        }
      } else {
        $("#" + views[i]).hide();
      }
    }
    $("#how-to-buy-content").fadeIn();
    lastVisited = ativo;
    nav.setAttribute("last", lastVisited);
  }

  var calibreFilter = {
    output: {
      type: "",
    },

    init: function () {
      var me = this,
        clCalibre = "",
        classeCalibreActive = $(".how-to-buy-nav").data("active");
      if (classeCalibreActive) {
        clCalibre = "." + classeCalibreActive;
      } else {
        clCalibre = "all";
      }

      me.output.type = clCalibre;
      $(".calibre-page").mixItUp({
        controls: {
          enable: false,
        },
        load: {
          filter: me.output.type,
        },
      });
    },

    filter: function () {
      var me = this;
      if ($(".calibre-page").mixItUp("isLoaded")) {
        $(".calibre-page").mixItUp("filter", me.output.type);
      }
    },
  };

  var howToBuyFilter = {
    output: {
      type: "",
      state: "",
      city: "",
    },

    init: function () {
      var me = this,
        clHowToBuy = "",
        classeHowToBuyActive = $(".how-to-buy-nav").data("active");
      if (classeHowToBuyActive) {
        clHowToBuy = "." + classeHowToBuyActive;
      } else {
        clHowToBuy = "all";
      }
      me.output.type = clHowToBuy;
      $(".how-to-buy-page").mixItUp({
        controls: {
          enable: false,
        },
        load: {
          filter: me.output.type,
        },
      });
    },

    filter: function () {
      var me = this;
      if ($(".how-to-buy-page").mixItUp("isLoaded")) {
        $(".how-to-buy-page").mixItUp("filter", me.output.type + me.output.state + me.output.city);
      }
    },
  };

  //ASSISTENCIA TECNICA
  $(".assistance-form").on("change", "select", function (e) {
    e.preventDefault();
    if (e.target.id == "state-select") {
      assistanceFilter.output.state = e.target.value;
      var url = location.href;
      $("#select-city").val("").change();
      $.ajax({
        url: url + "/city_filter/" + e.target.value.replace(".", ""),
        type: "POST",
        dataType: "json",
        success: function (data) {
          var listitems = $("#select-city").children()[0].outerHTML;
          $("#select-city").children().remove();
          $.each(data, function (index, city) {
            listitems += "<option value=." + city.id + ">" + city.name + "</option>";
          });
          $("#select-city").append(listitems);
        },
      });
      changeBrasilMap(e.target.value);
    } else {
      assistanceFilter.output.city = e.target.value;
    }
    assistanceFilter.filter();
  });

  var assistanceFilter = {
    output: {
      state: "",
      city: "",
    },

    init: function () {
      var me = this;
      $(".assistance-page").mixItUp({
        load: {
          filter: "all",
        },
      });
    },

    filter: function () {
      var me = this,
        filter = me.output.state + me.output.city;

      if ($(".assistance-page").mixItUp("isLoaded")) {
        $(".assistance-page").mixItUp("filter", filter ? filter : "all");
      }
    },
  };

  function changeBrasilMap(state) {
    if (document.querySelector("#svg-map a.active")) document.querySelector("#svg-map a.active").classList.remove("active");
    if (state) document.querySelector("#svg-map a" + state).classList.add("active");
  }

  $("#contact-state-select").on("change", function (e) {
    var url = location.href;
    $("#contact-select-city").next(".custom-select__selected").text("Carregando...");
    $.ajax({
      url: url + "/city_filter/" + e.target.value,
      type: "POST",
      dataType: "json",
      success: function (data) {
        var listitems = $("#contact-select-city").children()[0].outerHTML;
        $("#contact-select-city").children().remove();
        $.each(data, function (index, city) {
          listitems += "<option value=" + city.id + ">" + city.name + "</option>";
        });
        $("#contact-select-city").append(listitems);
        $("#contact-select-city").next(".custom-select__selected").text("Cidade (obrigatório)");
      },
    });
  });

  $(document)
    .on("click", ".modal-inner > span", function () {
      $(".modal-pl").fadeOut();
    })
    .on("click", ".modal-pl h1, .modal-pl p, .modal-pl--inner", function (e) {
      e.stopPropagation();
    });
  //CADASTRO NEWS
  var cadastro_news = {
    Civil: [],
    Policial: ["Policial Militar", "Policial Civil", "Policial Federal", "Policial Rodoviário Federal", "Metroviária", "Bombeiro Militar"],
    "Forças Armadas": ["Exército Brasileiro", "Marinha do Brasil", "Aeronáutica"],
    Magistrado: ["Juiz Federal", "Juiz Estadual", "Promotor Federal", "Promotor Estadual", "Oficial de Justiça", "Auditor da Receita Federal", "Auditor Fiscal"],
    CAC: ["Caçador", "Atirador", "Colecionador"],
    Outros: ["Guarda Municipal", "Agente Penitenciário", "Analista Tributário", "Fiscal do IBAMA", "Agência Brasileira de Inteligência", "Guarda e Policias dos Ministérios", "Auditores Fiscais do Trabalho", "Fiscais da Previdência Social"],

    subcategorias: function (categoria) {
      var me = this,
        elements = '<span class="input-warning">Seleção obrigatória</span>';

      if (categoria) {
        me[categoria].forEach(function (subcategoria) {
          elements += '<label><input type="radio" name="subcategoria" value="' + subcategoria + '"><span>' + subcategoria + "</span></label>";
        });

        $("#subcategorias")
          .fadeOut(function () {
            $(this).html("");
            $(this).append(elements);
          })
          .fadeIn();
      }
    },
  };

  $(".news-form select[name=categoria]").on("change", function () {
    cadastro_news.subcategorias($(this)[0].value);
  });

  $("input[name=autorizado]").on("change", function () {
    if ($(this)[0].checked == true && ($(this)[0].value == "Aguardando" || $(this)[0].value == "Sim")) {
      $("#autorizacao").fadeIn();
    } else {
      $("#autorizacao").fadeOut();
    }
  });

  $(".phone").mask("(99) 9999-9999Z", {
    translation: {
      Z: {
        pattern: /[0-9]/,
        optional: true,
      },
    },
  });

  $(".cpf").mask("000.000.000-00");
  $(".cep").mask("99.999-999");

  $(".re").on("keypress", function (evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  });

  $(".load-more-news").on("click", function (e) {
    e.preventDefault();
    var index = $(this).attr("data-history"),
      source = $(this).data("source"),
      url = "",
      loader = $('<img class="loader-gif" src="' + $("body").data("domain") + '/assets/img/loader.gif" />'),
      domain = TAURUS.globals.$body.data("domain");
    var total = parseInt($(this).attr("data-total"));
    index++;

    if (source && source === "video") {
      url = $("body").data("domain") + "pt/manutencao/pagina/" + index + "/json";
    } else {
      url = $("body").data("domain") + "pt/noticias/pagina/" + index + "/json";
    }

    $(this).append(loader);

    $.ajax({
      method: "POST",
      url: url,
      data: { page_number: 1, type: "json" },
      success: function (response) {
        $(this).attr("data-history", index);
        var obj = {},
          append = [];

        loader.hide();

        if (response.length == 2) {
          $(".load-more-news").remove();
        } else {
          $(".load-more-news").attr("data-history", index);
          obj = $.parseJSON(response);

          if (index * 5 > total) {
            $(".load-more-news").remove();
          }

          append = obj.map(function (item) {
            var output = "";

            if (source && source === "video") {
              output += '<article class="noticias-box">';
              output += '<figure class="product-box__figure">';
              output += '<a href="manutencao/' + item.slug + '">';
              output += '<img style="width: 270px; height: 152px;" src=" http://img.youtube.com/vi/' + item.code + '/mqdefault.jpg" />';
              output += "</a>";
              output += "</figure>";
              output += '<a class="container-link" href="manutencao/' + item.slug + '">';
              output += '<h3 class="noticias-box__title">';
              output += item.title;
              output += "</h3>";
              output += "</a>";
              output += "</article>";
            } else {
              output = '<article class="noticias-box">';
              output += '<figure class="product-box__figure">';
              output += '<a href="' + item.slug + '">';
              output += '<img src="' + domain + "/assets/img/content/news/tn_" + item.image + '" />';
              output += "</a>";
              output += "</figure>";
              output += '<a href="' + item.slug + '">';
              output += '<h3 class="noticias-box__title">';
              output += '<span class="noticias-date">' + item.date.split("-").reverse().join("/") + "</span><br>";
              output += item.title;
              output += "</h3>";
              output += "</a>";
              output += "</article>";
            }

            return output;
          });
          $(".news-page section").append(append);
        }
      },
    });
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
      if ($(".load-more")) {
        $(".load-more").trigger("click");
      }
    }
  });

  $(document).on("click", ".guns-qualidade-list--button", function (e) {
    e.preventDefault();

    var self = this;
    self.overlay = TAURUS.Overlay.create();
    self.spinner = TAURUS.Spinner.create();
    //self.overlay.show();
    // self.spinner.show();

    var button = $(this);
    if (!button.hasClass("loading")) {
      var page = $(button).data("page");
      var next = page + 1;
      button.addClass("loading");
      $.ajax({
        type: "POST",
        url: $("body").data("domain") + "/pt/qualidade",
        data: { page: next, term: $(".guns-qualidade--search--input").val() },
        success: function (html) {
          //self.overlay.hide();
          //self.spinner.hide();

          $(button).before(html);
          button.removeClass("loading");
          $(button).data("page", next);
          if (next + 1 >= max_pages) {
            $(button).css("display", "none");
          }
        },
      });
    }

    return false;
  });

  $(".guns-qualidade--search--input").on("change", function (e) {
    $(".guns-qualidade--search").submit();
  });

  $(".guns-qualidade--search").on("submit", function (e) {
    e.preventDefault();
    var self = this;

    self.overlay = TAURUS.Overlay.create();
    self.spinner = TAURUS.Spinner.create();
    self.overlay.show();
    self.spinner.show();

    $(".guns-qualidade--search--button").prop("disabled", true);
    $.ajax({
      type: "POST",
      url: $("body").data("domain") + "/pt/qualidade",
      data: { term: $(".guns-qualidade--search--input").val() },
      success: function (html) {
        self.overlay.hide();
        self.spinner.hide();
        $(".guns-qualidade-list").html(html);
        $(".guns-qualidade--search--button").prop("disabled", false);
      },
    });
  });

  $(".guns-qualidade--selector").on("click", function () {
    $(this).parent().siblings(".guns-qualidade--selector-list").toggle();
  });

  $(".guns-news--selector").on("click", function () {
    $(this).parent().siblings(".guns-news--selector-list").toggle();
  });

  $(document).on("click", ".balloon span", function () {
    var domain = TAURUS.globals.$body.data("root");
    var i = domain.indexOf("pt");

    if (i > 0) {
      domain = domain.slice(0, i);
    }

    var parent_id = $(this).parent().attr("data-id"),
      arr = [],
      url = $("body").data("domain"),
      loader = $('<img class="loader-gif" src="' + domain + 'assets/img/loader.gif" />'),
      oldUrl = window.location.href.split("/"),
      newUrl = "";

    $(".guns-news--selector-list li[data-id=" + parent_id + "]").removeClass("disabled");
    $(this).parent().remove();

    newUrl = oldUrl.join("/");

    $(".balloon").each(function (a, b) {
      arr.push($(b).data("id"));
    });

    if (arr.length <= 0) {
      location.reload();
      return;
    }

    $.ajax({
      method: "POST",
      url: url + "pt/armas-noticias",
      data: { id: arr },
      success: function (response) {
        loader.hide();
        var obj = {},
          append = [],
          output = "";

        if (response.length > 2) {
          obj = $.parseJSON(response);
          append = obj.map(function (item) {
            output = '<article class="noticias-box">';
            output += '<figure class="product-box__figure">';
            output += '<img src="' + domain + "assets/img/content/news/tn_" + item.image + '" />';
            output += "</figure>";
            output += '<a class="container-link" href="' + domain + "pt/manutencao/" + item.slug + '">';
            output += '<h3 class="noticias-box__title">';
            output += '<span class="noticias-date">' + item.date.split("-").reverse().join("/") + "</span><br>";
            output += item.title;
            output += "</h3>";
            output += "</a>";
            output += "</article>";

            return output;
          });

          $(".news-page section.news-list").html(append).hide().fadeIn();
        } else {
          $(".news-page section.news-list").html();
        }
      },
    });
  });

  $(document).on("click", ".guns-news--wrapper .guns-news--selector-list li", function () {
    var domain = TAURUS.globals.$body.data("root");
    var i = domain.indexOf("pt");

    if (i > 0) {
      domain = domain.slice(0, i);
    }

    if ($(this).hasClass("disabled")) {
      return false;
    }

    if ($(this).data("id") < 0) {
      location.reload();
    }

    $(this).addClass("disabled");

    var name = $(this).html(),
      id = $(this).data("id"),
      url = $("body").data("domain"),
      loader = $('<img class="loader-gif" src="' + domain + '/assets/img/loader.gif" />'),
      arr = [],
      balloon = $('<div data-id="" class="balloon"><span></span></div>');

    balloon.append(name);
    balloon.attr("data-id", id);

    $(this).append(loader);

    $(".guns-news--selected").append(balloon);

    $(".balloon").each(function (a, b) {
      arr.push($(b).data("id"));
    });

    var source = $(".guns-news--selector-list").data("source");
    var subUrl = "";

    if (source && source === "video") {
      subUrl = "pt/armas-videos/";
    } else {
      subUrl = "pt/armas-noticias";
    }

    $.ajax({
      method: "POST",
      url: url + subUrl,
      data: { id: arr },
      success: function (response) {
        loader.hide();
        var obj = {},
          append = [];

        if (response.length > 2) {
          obj = $.parseJSON(response);
          var output = "";

          append = obj.map(function (item) {
            if (source === "video") {
              output = '<article class="noticias-box">';
              output += '<figure class="product-box__figure">';
              output += '<img class="default--yb-thumb" src=" http://img.youtube.com/vi/' + item.code + '/mqdefault.jpg" />';
              output += "</figure>";
              output += '<a class="container-link" href="' + domain + "pt/manutencao/" + item.slug + '">';
              output += '<h3 class="noticias-box__title">';
              output += item.title;
              output += "</h3>";
              output += "</a>";
              output += "</article>";
            } else {
              output = '<article class="noticias-box">';
              output += '<figure class="product-box__figure">';
              output += '<a href="' + item.slug + '">';
              output += '<img src="' + domain + "assets/img/content/news/tn_" + item.image + '" />';
              output += "</a>";
              output += "</figure>";
              output += '<a href="' + item.slug + '">';
              output += '<h3 class="noticias-box__title">';
              output += '<span class="noticias-date">' + item.date.split("-").reverse().join("/") + "</span><br>";
              output += item.title;
              output += "</h3>";
              output += "</a>";
              output += "</article>";
            }
            return output;
          });

          $(".news-page section.news-list").html(append).hide().fadeIn();
        } else {
          $(".news-page section.news-list").html("");
        }
      },
    });
  });

  /* Seletor de Subcategorias para Armas */
  $(document).on("click", ".guns-subcategory--wrapper .guns-news--selector-list li", function () {
    var domain = TAURUS.globals.$body.data("root");
    var i = domain.indexOf("pt");

    if (i > 0) {
      domain = domain.slice(0, i);
    }

    if ($(this).hasClass("disabled")) {
      return false;
    }

    if ($(this).data("id") < 0) {
      location.reload();
    }

    $(this).addClass("disabled");

    var name = $(this).html(),
      id = $(this).data("id"),
      url = $("body").data("domain"),
      arr = [],
      balloon = $('<div data-id="" class="balloon"><span></span></div>');

    balloon.append(name);
    balloon.attr("data-id", id);

    $(".guns-news--selected").append(balloon);

    $(".balloon").each(function (a, b) {
      arr.push($(b).data("id"));
    });

    $.ajax({
      method: "POST",
      url: url + "pt/armas-usuarios/",
      data: { id: arr },
      success: function (response) {
        var obj = {},
          append = [];
        if (response.length > 2) {
          obj = $.parseJSON(response);
          append = obj.map(function (item) {
            var output = '<article class="list-box subcategory-box">';
            output += '<header class="product-box__header">';
            output += '<a href="' + item.cSlug + "/" + item.slug + '">';
            output += '<figure class="product-box__figure_sub">';
            output += '<img src="' + domain + "assets/img/content/products/" + item.imgUrl + '" alt="' + item.name + '" />';
            output += "</figure>";
            output += '<h3 class="product-box__title">' + item.name + "</h3>";
            output += "</a>";
            output += "</header>";
            output += "<p>";
            output += item.description.slice(0, 120) + " [...]";
            output += "</p>";
            output += "</article>";
            return output;
          });

          $(".list-showcase.subcategory-page").html(append).hide().fadeIn();
        } else {
          $(".list-showcase.subcategory-page").html("");
        }
      },
    });
  });

  /* Seletor de Categorias para Subcategorias para Armas */
  $(".guns-category").on("change", function () {
    var selected = $(this).children(":selected").data("idcategoria"),
      url = $("body").data("domain"),
      that = $(this),
      loader = $('<img class="loader-gif" src="' + url + 'assets/img/loader.gif" />');
    that.parent().next().append(loader);

    if (that.val() < 0) {
      location.reload();
    } else {
      $.ajax({
        type: "POST",
        url: url + "pt/subcategorias/categoria/",
        data: { id: selected },
        success: function (response) {
          loader.hide();
          var obj = $.parseJSON(response),
            collection = obj.map(function (item) {
              return '<li data-id="' + item.id_subcategoria + '">' + item.title + "</li>";
            });

          that.parent().next(".guns-subcategory--wrapper").show();
          that.parent().next(".guns-subcategory--wrapper").children("ul.guns-news--selector-list").html(collection);
          that.parent().next(".guns-subcategory--wrapper").find("ul.guns-news--selector-list").show();
        },
      });
    }
  });

  $(".disabled-list").on("click", function () {
    return false;
  });

  $(".facebook").on("click", function (e) {
    e.preventDefault();
    var $me = $(this),
      url = TAURUS.globals.$body.data("domain") + "pt/noticias/" + $me.data("url");

    fbShare(url, 520, 350);
  });

  function fbShare(url, winWidth, winHeight) {
    var winTop = screen.height / 2 - winHeight / 2;
    var winLeft = screen.width / 2 - winWidth / 2;
    window.open("http://www.facebook.com/sharer.php?s=100&p[url]=" + url, "sharer", "top=" + winTop + ",left=" + winLeft + ",toolbar=0,status=0,width=" + winWidth + ",height=" + winHeight);
  }

  $("#product-pricing-select").on("change", function () {
    if ($(this).children(":selected").data("cash") && $(this).children(":selected").data("installments")) {
      var select = document.createElement("select"),
        selectConteiner = document.createElement("div"),
        cash = document.createElement("option"),
        installments = document.createElement("option"),
        six = document.createElement("option"),
        twelve = document.createElement("option"),
        optGroupCash = document.createElement("optgroup"),
        optGroupInst = document.createElement("optgroup"),
        conteiner = $("#payment-method-conteiner"),
        cashValue = $(this).children(":selected").data("cash"),
        instValue = $(this).children(":selected").data("installments"),
        sixValue = $(this).children(":selected").data("six"),
        twelveValue = $(this).children(":selected").data("twelve");

      cash.value = "cash";
      installments.value = "installments";
      six.value = "six";
      twelve.value = "twelve";

      installments.innerHTML = instValue;
      six.innerHTML = sixValue;
      twelve.innerHTML = twelveValue;
      cash.innerHTML = cashValue;

      optGroupCash.label = "À vista";
      optGroupInst.label = "Parcelado";

      optGroupCash.appendChild(cash);
      optGroupInst.appendChild(installments);
      optGroupInst.appendChild(six);
      optGroupInst.appendChild(twelve);

      select.className = "payment-method";

      select.appendChild(optGroupCash);

      if (instValue !== "Não disponível") {
        select.appendChild(optGroupInst);
      }

      select.name = "paymentMethod";

      selectConteiner.appendChild(select);
      selectConteiner.className = "payment-method--conteiner";

      conteiner.html(selectConteiner);
    }
  });

  $("#prevent-dot").on("keypress", function (e) {
    if (e.charCode == 46) return false;
  });

  $(document).on("click", ".modal-pl, .modal-pl .modal-pl--inner span", function (e) {
    if ($(e.target).hasClass("modal-pl") || $(e.target).hasClass("close")) {
      $(".modal-pl").fadeOut();
    }
  });

  $(document).ready(function () {
    $(".banner-contato").mouseenter(function () {
      setTimeout(function () {
        $(".contact-main").show();
      }, 300);
      $(this).css({ right: "45px" });
    });

    $(".banner-contato").mouseleave(function () {
      setTimeout(function () {
        $(".contact-main").hide();
      }, 300);
      $(this).css({ right: "-200px" });
    });

    if (window.location.pathname.indexOf("contato") > 0) {
      $(".banner-contato").remove();

      var allowedOptions = ["duvidas-e-sugestoes", "quero-comprar", "assistencia-tecnica", "financeiro", "pedidos-e-compras", "quero-comprar-restrito"];

      var chosen = "";

      allowedOptions.forEach(function (item) {
        if (window.location.pathname.indexOf(item) > 0) {
          chosen = item;
        }
      });

      switch (chosen) {
        case allowedOptions[0]:
          $('select[name="subject"]').val("Dúvidas e Sugestões");
          $("#subject").next(".custom-select__selected").text("Dúvidas e Sugestões");
          setTimeout(function () {
            $(".js-sliding-select").fadeIn(function () {
              $('.js-sliding-select input[name="cpf"]').prop("disabled", false);
              $('.js-sliding-select input[name="cpf"]').addClass("js-validate-required");
            });
          }, 500);
          break;
        case allowedOptions[1]:
          $('select[name="subject"]').val("Quero comprar: calibre permitido");
          $("#subject").next(".custom-select__selected").text("Quero comprar: calibre permitido");
          break;
        case allowedOptions[2]:
          $('select[name="subject"]').val("Assistência Técnica");
          $("#subject").next(".custom-select__selected").text("Assistência Técnica");
          setTimeout(function () {
            $(".js-sliding-select").fadeIn(function () {
              $('.js-sliding-select input[name="cpf"]').prop("disabled", false);
              $('.js-sliding-select input[name="cpf"]').addClass("js-validate-required");
            });
          }, 500);
          break;
        case allowedOptions[3]:
          $('select[name="subject"]').val("Financeiro");
          $("#subject").next(".custom-select__selected").text("Financeiro");
          setTimeout(function () {
            $(".js-sliding-select").fadeIn(function () {
              $('.js-sliding-select input[name="cpf"]').prop("disabled", false);
              $('.js-sliding-select input[name="cpf"]').addClass("js-validate-required");
            });
          }, 500);

          $(".js-user-select.show-if-financeiro").show();
          $(".js-user-select.show-if-financeiro select").prop("disabled", false);
          $(".js-user-select.show-if-financeiro select").addClass("js-validate-required");

          $(".js-user-select.show-if-duvidas-or-informacoes").hide();
          $(".js-user-select.show-if-duvidas-or-informacoes select").prop("disabled", true);
          $(".js-user-select.show-if-duvidas-or-informacoes select").removeClass("js-validate-required");
          break;
        case allowedOptions[4]:
          $('select[name="subject"]').val("Informações sobre pedidos de compra");
          $("#subject").next(".custom-select__selected").text("Informações sobre pedidos de compra");
          setTimeout(function () {
            $(".js-sliding-select").fadeIn(function () {
              $('.js-sliding-select input[name="cpf"]').prop("disabled", false);
              $('.js-sliding-select input[name="cpf"]').addClass("js-validate-required");
            });
          }, 500);
          $(".js-user-select.show-if-duvidas-or-informacoes").show();
          $(".js-user-select.show-if-duvidas-or-informacoes select").prop("disabled", false);
          $(".js-user-select.show-if-duvidas-or-informacoes select").addClass("js-validate-required");
          break;
        case allowedOptions[5]:
          $('select[name="subject"]').val("Quero comprar: calibre restrito");
          $("#subject").next(".custom-select__selected").text("Quero comprar: calibre restrito");
          break;
      }
    }
  });

  // $('.contact-head').click(function () {
  //     $('.contact-main').slideToggle(function () {
  //         $('.close-contact').toggle();
  //     });
  // });

  // $('.close-contact').click(function (e) {
  //     e.stopPropagation();
  //     $('.contact-main').slideUp();
  //     $(this).hide();
  // });

  $('a[href="#open-modal"]').on("click", function (e) {
    e.preventDefault();
    $(".modal-pl").fadeIn();
  });

  $(".instructors_register form").on("blur", "input[name='cep']", function (event) {
    var cep = $('.instructors_register form input[name="cep"]').val();
    if (cep) {
      var address;
      $.ajax({
        url: "cadastro-de-instrutores/getAddressCEP/" + cep,
        success: function (result) {
          var streetInput = $('.instructors_register form input[name="rua"]');
          var neighborhoodInput = $('.instructors_register form input[name="bairro"]');
          var townInput = $('.instructors_register form input[name="cidade"]');
          var stateInput = $('.instructors_register form input[name="estado"]');

          if (result.indexOf("400") >= 0) {
            $('.instructors_register form input[name="cep"]').css("border", "1px solid red");
            $(streetInput).val("");
            $(streetInput).prop("readonly", true);
            $(neighborhoodInput).val("");
            $(neighborhoodInput).prop("readonly", true);
            $(townInput).val("");
            $(townInput).prop("readonly", true);
            $(stateInput).val("");
            $(stateInput).prop("readonly", true);
          } else {
            $('.instructors_register form input[name="cep"]').css("border", "none");
            address = JSON.parse(result);
            console.log(address);
            if (address.logradouro) {
              $(streetInput).val(address.logradouro);
              $(streetInput).prop("readonly", true);
            } else {
              $(streetInput).val("");
              $(streetInput).removeAttr("readonly");
            }

            if (address.bairro) {
              $(neighborhoodInput).prop("readonly", true);
              $(neighborhoodInput).val(address.bairro);
            } else {
              $(neighborhoodInput).val("");
              $(neighborhoodInput).removeAttr("readonly");
            }
            if (address.localidade) {
              $(townInput).prop("readonly", true);
              $(townInput).val(address.localidade);
            } else {
              $(townInput).val("");
              $(townInput).removeAttr("readonly");
            }
            if (address.uf) {
              $(stateInput).prop("readonly", true);
              $(stateInput).val(address.uf);
            } else {
              $(stateInput).val("");
              $(stateInput).removeAttr("readonly");
            }
          }
        },
      });
    }
  });

  $(".ctt_register form").on("blur", "input[name='cep']", function (event) {
    var cep = $('.ctt_register form input[name="cep"]').val();
    if (cep) {
      var address;
      $.ajax({
        url: "cadastro-para-evento-ctt/getAddressCEP/" + cep,
        success: function (result) {
          var streetInput = $('.ctt_register form input[name="rua"]');
          var neighborhoodInput = $('.ctt_register form input[name="bairro"]');
          var townInput = $('.ctt_register form input[name="cidade"]');
          var stateInput = $('.ctt_register form input[name="estado"]');

          if (result.indexOf("400") >= 0) {
            $('.ctt_register form input[name="cep"]').css("border", "1px solid red");
            $(streetInput).val("");
            $(streetInput).prop("readonly", true);
            $(neighborhoodInput).val("");
            $(neighborhoodInput).prop("readonly", true);
            $(townInput).val("");
            $(townInput).prop("readonly", true);
            $(stateInput).val("");
            $(stateInput).prop("readonly", true);
          } else {
            $('.ctt_register form input[name="cep"]').css("border", "none");
            address = JSON.parse(result);
            if (address.logradouro) {
              $(streetInput).val(address.logradouro);
              $(streetInput).prop("readonly", true);
            } else {
              $(streetInput).val("");
              $(streetInput).removeAttr("readonly");
            }

            if (address.bairro) {
              $(neighborhoodInput).prop("readonly", true);
              $(neighborhoodInput).val(address.bairro);
            } else {
              $(neighborhoodInput).val("");
              $(neighborhoodInput).removeAttr("readonly");
            }
            if (address.localidade) {
              $(townInput).prop("readonly", true);
              $(townInput).val(address.localidade);
            } else {
              $(townInput).val("");
              $(townInput).removeAttr("readonly");
            }
            if (address.uf) {
              $(stateInput).prop("readonly", true);
              $(stateInput).val(address.uf);
            } else {
              $(stateInput).val("");
              $(stateInput).removeAttr("readonly");
            }
          }
        },
      });
    }
  });
})(window, jQuery);
