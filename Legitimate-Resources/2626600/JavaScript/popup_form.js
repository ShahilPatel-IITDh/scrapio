if (!window.ccs) {
  window.ccs = {};
}
ccs.PopupForm = function (config) {

  var self;
  var config;
  var containerId;

  function constructorFn(_config) {
    self = this;
    config = _config;
    containerId = 'popupForm_' + config.type;
  }

  constructorFn.prototype.init = function () {
  }

  constructorFn.prototype.initValidationExtras = function () {
    // restricts input fields to numbers only just add numbersOnly class onto any input field
    jQuery('.numbersOnly').on("keypress paste change", function (e) {
      var key;
      var keychar;


      if (window.event) {
        if (window.event.type == "paste")
          return false;
        key = window.event.keyCode;
      }
      else if (e) {
        key = e.which;
      }
      else {
        return true;
      }
      keychar = String.fromCharCode(key);

      // control keys
      if ((key == null) || (key == 0) || (key == 8) ||
        (key == 9) || (key == 13) || (key == 27))
        return true;

      // numbers
      else if ((("0123456789").indexOf(keychar) > -1))
        return true;
      else
        return false;
    });
  }

  constructorFn.prototype.attachEvents = function () {
    setTimeout(function() {
      jQuery(".calendar_input").datepicker();
    }, 500);

    // Hide or show sections
    var
      $sectionSelector = jQuery('select.js-section-selector'),
      $problemSelector = jQuery('#' + containerId + ' .js-subject');

    if ($sectionSelector.length) {

      jQuery('#' + containerId + ' .js-form-section').hide();

      jQuery('#' + containerId).find('select.js-section-selector').change(
        function () {
          var
            selector = '.' + jQuery(':selected', jQuery(this)).attr('data-section'),
            value = jQuery(':selected', jQuery(this)).val(),
            buttonText = jQuery(':selected', jQuery(this)).attr('data-button-text'),
            $section = jQuery(selector);

          jQuery('#' + containerId).find('.js-modal-submit').html(buttonText);
          jQuery('#' + containerId + ' .js-form-error').hide();

          $section.show().siblings('.js-form-section').hide();

          jQuery('.js-assist-us-sub').val(value);
        }
      ).change();
    }

    // Clear errors on payment problems on section select
    if ($problemSelector.length) {
      $problemSelector.change(
        function () {
          jQuery('#' + containerId + ' .js-form-error').hide();
        }
      ).change();
    }

    // Hide or show tooltips
    jQuery('.form__tooltip-wrap .form__tooltip').hide();
    jQuery('.form__tooltip-wrap .icon')
      .mouseover(
        function () {
          jQuery(this).siblings('.form__tooltip').show();
        }
      ).mouseout(
      function () {
        jQuery(this).siblings('.form__tooltip').hide();
      }
    );

    // Date pickers
    jQuery(".another-period input").datepicker(
      {
        dateFormat: "dd/mm/yy",
        constrainInput: true
      }
    );

  }

  constructorFn.prototype.whichTransitionEvent = function () {
    var t;
    var el = document.createElement('fakeelement');

    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MSTransition': 'msTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }

  constructorFn.prototype.popupForm = function (heading, parameters) {
    // check to see if the link has been disabled
    if (typeof parameters !== 'undefined' && typeof parameters.css !== 'undefined' && parameters.css.indexOf('disabled') != -1) {
      return;
    }

    if (false && self.formLoaded === true) {
      self.openModal(true);
    } else {
      if (parameters && parameters.showModalWithSpinner) {
        self.openModal(true);
      }

      self.loadForm(heading, function() {
        if (parameters == null || !parameters.showModalWithSpinner) {
          self.openModal(true);
        }

      }, parameters);
    }
  }

  constructorFn.prototype.embedForm = function (heading) {
    //hans: added force form re fetch to avoid all weird reset issues
    if (false && self.formLoaded === true) {
      self.openModal(false);
    } else {
      self.loadForm(heading, function () {
        self.openModal(false);
      });
    }
  }


  constructorFn.prototype.openModal = function (mustAnimate) {
    var container = jQuery('#' + containerId);

    container.find('.js-form-error').hide();
    self.refreshCaptcha();

    // Wait for a paint to happen
    if (config.embed) {
      container.show();
    } else {
      container.show();
      setTimeout(function () {
        container.removeClass('modal--hidden');
        jQuery('html, body').removeClass('locked');
        if (mustAnimate) {
          container.addClass('modal--visible');
          jQuery('html').attr('data-scroll', jQuery(window).scrollTop());
          setTimeout(function () {
            jQuery('html, body').addClass('locked');
          }, 400)
          if (jQuery(window).width() < 717) {
            // var headerHeight = jQuery('#' + containerId + ' .form_title').outerHeight();
            // jQuery('#' + containerId + ' .modal__heading-text').css('margin-top', headerHeight + 'px');
            // jQuery('#' + containerId + ' .modal__error, .modal__response, .modal__busy').css('top', headerHeight + 'px');
            // jQuery('#' + containerId + ' .js-modal-close').css('height', headerHeight + 'px');
            // jQuery('#' + containerId + ' h2.mobile-title.form_title').css('height', headerHeight + 'px');
          }

          enableToolTips();
          enableProfileAccordions();
        }
      }, 0);
    }

  }

  constructorFn.prototype.closeModal = function () {

    var container = jQuery('#' + containerId);

    // Add the invisible class to the element after the animation completes
    if (this.whichTransitionEvent()) {
      container.on(this.whichTransitionEvent(), this.onAnimiationComplete.bind(this));
    } else {
      this.onAnimiationComplete.call(this);
    }
    container.removeClass('modal--visible').addClass('modal--hidden');
    container.hide()
    //   container.attr('style','');
    jQuery('html, body').removeClass('locked');
    jQuery(window).scrollTop(jQuery('html').attr('data-scroll'));
    //history.pushState('', document.title, window.location.pathname);
  }

  constructorFn.prototype.onAnimiationComplete = function (e) {
    /*
        var container = jQuery('#' + containerId);
        container.off( this.whichTransitionEvent());
        container.hide();

          container.html("");
    */
  };


  constructorFn.prototype.setAndLoad = function (_loggedIn) {
    loggedIn = _loggedIn;
    self.load();
  };

  constructorFn.prototype.toggleSpinner = function (parameters) {
    //Show loader with class name passed into parameters object
    if (parameters && parameters.spinner) {
      var item = jQuery("." + parameters.spinner);
      item.toggleClass("wysniks");
    }
  };

  constructorFn.prototype.showLoadingModal = function (parameters) {
    //Show loader with class name passed into parameters object
    if (parameters && parameters.showModalWithSpinner) {
      loaderTpl = jQuery("#popupLoaderTemplate").val();
      jQuery('#' + containerId).html(loaderTpl);
    }
  };


  constructorFn.prototype.loadForm = function (headings, callback, parameters) {
    //Modalbox.show(ccs.contextPath + "/json/" + ccs.appName + "/" + ccs.languageCode + '/modules/2.capture/load.json?h=' + 100000,  {title: 'Profile', width: 600, height: 200});
    if (config.type != null && config.type.length > 0) {
      jQuery('body').css('cursor', 'wait').trigger('mousemove');

      self.toggleSpinner(parameters);
      self.showLoadingModal(parameters);


      new Ajax.Request(ccs.contextPath + '/json/' + ccs.appName + '/' + ccs.languageCode + '/modules/popup_form/' + config.type + '_form.json', {
        method: 'post',
        parameters: parameters,
        onSuccess: function (transport) {

          jQuery('body').css('cursor', '').trigger('mousemove');
          self.toggleSpinner(parameters);

          self.formLoaded = true;
          var res = transport.responseText;


          try {

            jQuery('#' + containerId).html(res);
            if (parameters && !parameters.showModalWithSpinner) {
              jQuery('#' + containerId).hide();
            }

            if (!config.embed) {
              if (parameters && !parameters.showModalWithSpinner) {
                jQuery('#' + containerId).addClass('modal--hidden');
              }

            }
          } catch (e) {
            //weird error thrown on first load as you add the class?
            console.log(e);
          }

          if (callback) {
            callback();
          }

          jQuery('.table__select', '#' + containerId).nosFormSelect({
            onClick: function ($el, $fauxEl) {
              $el.trigger('click');
            }
          });

          //Commented out as there is a duplicaiton on
          jQuery('.form__label', '#' + containerId).nosFormSelect({
            namespace: 'nosui-calculator-form-select',
            onClick: function ($el, $fauxEl) {
              $el.trigger('click');
            }
          });

          jQuery('.form__radio', '#' + containerId).nosInputRadio({
            namespace: 'nosui-form-radio-input',
            onClick: function ($el, $fauxEl) {
              $el.trigger('click');
            },
            onChange: function ($el, $fauxEl) {
              $el.trigger('change');
            }
          });

          jQuery('.form__checkbox', '#' + containerId).nosInputCheckbox({
            namespace: 'nosui-form-check-input',
            onClick: function ($el, $fauxEl) {
              $el.trigger('click');
            }
          });

          if (!document.location.href.match(/mfc-for-dealers$/)) {

            var resize = function () {
              // jQuery('.modal__content').height(jQuery(window).height() - jQuery('.modal__heading', '#' + containerId).height() - 160);
              // jQuery('.modal__form-wrap').height(jQuery(window).height() - jQuery('.modal__heading', '#' + containerId).height() - 180);
            }
            jQuery(window).resize(resize);
            resize();

          }

          self.attachEvents();

        },
        onFailure: function () {
          self.toggleSpinner(parameters);
          jQuery('body').css('cursor', '').trigger('mousemove');
          //jQuery('#' + containerId).show();
          //jQuery('#' + containerId).html("An error occured while loading form.....");
          self.closeModal();
          showErrorModal('System error');
        }
      });
    }
  };

  constructorFn.prototype.validateForm = function ($form) {

    var
      errors = false;

    // Clear validated flags
    $form.find('[data-validated]').removeAttr('data-validated');

    errors |= validateOR($form);

    // Mandatory and Pattern fields, but not fields that have been validated
    $form.find('[data-pattern],[data-mandatory="true"]').not('[data-validated]').each(
      function () {

        var $this = jQuery(this);

        if (!validateField($this)) {
          errors = true;
          $this.siblings('.js-form-error').show();
        } else {
          $this.siblings('.js-form-error').hide();
        }
      }
    );

    errors |= validateANY($form);

    if (errors) $form.find('.js-form-error:visible').first().siblings('input').focus();

    return !errors;
  }

  constructorFn.prototype.refreshCaptcha = function () {

    var $capImg = jQuery('#' + containerId + ' form .js-jcaptcha-img');

//		if ($capImg.length == 0) alert("Could not find capture image with class js-jcaptcha-img");

    // PJH 03Feb2015: updated cause not all forms have captcha field any longer
    if ($capImg.length > 0) {
      var captchaURL = $capImg.attr("src");
      captchaURL = captchaURL.substring(0, captchaURL.indexOf("?")) + "?" + new Date().getTime();
      $capImg.attr("src", captchaURL);

      jQuery('#' + containerId + ' .js-jcaptcha').val('');
    }
  }

  constructorFn.prototype.cleanPars = function ($form, varQueryType, pars) {
    //we are on an asisst us form
    //we need to loop through ALL parameters and check if we have any form fields that we should not have, i.e they belong
    //to another sub form. Some fields will have a data-assist-us parameter, if it does have it then we need to
    //remove that fields if the value is NOT the same as our query type.
    for (var key in pars) {
      var f = $form[0][key];
      if (f != null) {
        var assistUs = jQuery(f).attr("data-only-for");
        if (assistUs != null && assistUs != varQueryType) {
          delete pars[key];
        }
      }
    }
  }

  constructorFn.prototype.save = function () {

    var
      $form = jQuery('#' + containerId + ' form'),
      pars = Form.serialize($form[0], true),
      $thanks = jQuery('#' + containerId + ' .modal__response'),
      $error = jQuery('#' + containerId + ' .modal__error'),
      $busy = jQuery('#' + containerId + ' .modal__busy'),
      $content = jQuery('#' + containerId + ' .modal__form-wrap'),
      $heading = jQuery('#' + containerId + ' .js-form-title'),
      $success = jQuery('#' + containerId + ' .modal__form-thanks'),
      $intro = jQuery('#' + containerId + ' .modal__heading-text')


    if (self.validateForm($form)) {

      jQuery('#' + containerId + ' .js-reference-id').html(pars['ID-number']);
      jQuery('#' + containerId + ' .js-reference-name').html(pars['Name']);

      var varQueryType = null;
      if (pars["assist_us_sub"]) { //assit us
        varQueryType = pars["assist_us_sub"]; //payment problems
        self.cleanPars($form, varQueryType, pars);
      } else if (pars["Please-assist-me"]) {
        varQueryType = pars["Please-assist-me"];
      } else if (pars["I-need-more-information-about"]) {
        varQueryType = pars["I-need-more-information-about"];
      }


      //add all fields to preserve ORDER for email
      var order = "";
      for (var o in pars) {
        order += (order.length > 0 ? "," : "") + o;
      }
      pars["field_order"] = order;

      if (jQuery(window).width() > 925) {
        $content.animate({opacity: 0.2});
        $busy.show();
      } else {
        $content.animate({opacity: 0});
        $busy.show();
      }

      jQuery(document).scrollTop(0);

      pars["type"] = config.type;

      new Ajax.Request(ccs.contextPath + '/json/' + ccs.appName + '/' + ccs.languageCode + '/modules/popup_form/save.json', {

        method: 'post',
        parameters: pars,

        onSuccess: function (transport) {

          var response = transport.responseText || "no response text";
          var json = eval('(' + response + ')');

          if (json.success) {


            $busy.hide();
            $thanks.slideDown();
            $success.slideDown();
            $heading.slideUp();
            $intro.slideUp();
            $content.slideUp();

            if (jQuery(window).width() < 717) {
              var headerHeight = jQuery('#' + containerId + ' .form_title').outerHeight();
              jQuery('#' + containerId + ' .modal__content').css('margin-top', ((headerHeight * 2) + 'px'));
            }

          } else {

            // captcha failed
            $content.animate({opacity: 100});
            $busy.hide();
            jQuery(".js-jcaptcha").focus().siblings('.js-form-error').show();
            $content.animate({opacity: 1});
            $content.slideDown();
            jQuery("#popupform_save_btn").show();
            self.refreshCaptcha();
          }
        },

        onFailure: function () {
          jQuery("#popupform_save_btn").show();
          $intro.slideUp();
          $error.slideDown();
          $busy.hide();
        }
      });
    }

  }


  constructorFn.prototype.reset = function () {

    jQuery('textarea, input:not([type=radio], [type=checkbox])', '#' + containerId).val('');

    jQuery('select', '#' + containerId).each(
      function () {
        jQuery(this).val(jQuery(this).find('option:first').val());
      }
    ).trigger('update-faux-field');

    jQuery('#' + containerId).find(':checked').each(function () {
      jQuery(this).prop('checked', false);
    }).change();

    this.resetSubmitMessage();
  }

  constructorFn.prototype.resetSubmitMessage = function () {

    var
      $error = jQuery('.modal__error'),
      $content = jQuery('.modal__content'),
      $intro = jQuery('.modal__heading-text');

    jQuery('.modal__response', '#' + containerId).slideUp();

    $error.slideUp();
    $content.animate(
      {opacity: 1}, function () {
        $content.css('opacity', '')
      }
    ).add($intro).slideDown();

  }

  // Validation


  // OR fields: Fields that are dependent on any of a collection of fields to have a validated value
  function validateOR($form) {

    var
      errors = false,
      validateOr = function () {

        var
          $this = jQuery(this),
          $collection = $this,
          fellows = $this.attr('data-validate-or').split(',');

        for (var i = 0; i < fellows.length; i++) {
          var fellow = jQuery('[name="' + fellows[i].trim() + '"]', $form);
          $collection.push(fellow[0]);
        }

        var hasValue = false;
        $collection.each(
          function () {
            if (validateField(jQuery(this))) hasValue = true;
          }
        );

        if (!hasValue) {
          errors = true;
          $collection.siblings('.js-form-error').show();
        } else {
          $collection.siblings('.js-form-error').hide();
        }

      }
    $form.find('[data-validate-or]:visible').each(validateOr);

    return errors;
  }

  // ANY fields: Fields that are dependent on any of a collection of fields to have a value
  function validateANY($form) {

    var errors = false;

    $form.find('[data-validate-any]:visible').each(
      function () {

        var
          $this = jQuery(this),
          fellows = $this.attr('data-validate-any').split(','),
          hasValue = false;

        for (var i = 0; i < fellows.length; i++) {

          var
            $fellow = jQuery('[name="' + fellows[i].trim() + '"]', $form);

          if ($fellow.attr('type') == 'checkbox') {
            hasValue |= $fellow.is(':checked');
          } else {
            hasValue |= $fellow.val().length > 0;
          }
        }

        if (hasValue) {
          $this.siblings('.js-form-error').hide();
        } else {
          errors = true;
          $this.siblings('.js-form-error').show();
        }

      }
    );

    return errors;
  }

  function validateField(field) {

    var
      isHidden = field.parents('.js-form-section:hidden').length,
      isDependent = field.attr('data-depends-on-checkbox');

    if (isHidden || isDependent) return true;

    var
      mandatory = field.attr('data-mandatory'),
      pattern = field.attr('data-pattern'),
      valid = true,
      value = field.val().trim();

    // Check for mandatory
    if (mandatory && value == '') valid = false;
    if (mandatory && field.attr('type') == 'checkbox' & !field.prop('checked')) valid = false;

    // Check for pattern matching
    if (pattern && !value.match(pattern)) valid = false;

    field.attr('data-validated', true);

    return valid;
  }


  return new constructorFn(config);
}

