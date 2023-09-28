if (!window.mfc) {
  window.mfc = {};
}

if (!window.mfc.modlets) {
  window.mfc.modlets = {};
}

mfc.modlets.BankingDetailsUpdateForm = function () {
  var self;
  var isValidAccount = false;

  // constructor function
  function constructorFn() {
    self = this;
  }

  constructorFn.prototype.checkCanSubmit = function () {
    var submitButton = jQuery("#submit_banking_details_button");
    var submitArrow = jQuery("#submit-arrow");
    if (isValidAccount && self.validateForm()){
      submitButton.addClass('submit_btn');
      submitButton.removeClass('submit_btn_disabled'); // update button
      submitArrow.addClass('icon-link-arrow-white-new');
      submitArrow.removeClass('icon-link-arrow-white-disabled');
      //Need to unbind the click event below otherwise it will submit the form over and over again
      submitButton.unbind( "click" );
      submitButton.click(function(){
        self.submitForm();
      });
    }else{
      //disable button again
      submitButton.removeClass('submit_btn');
      submitButton.addClass('submit_btn_disabled'); // update button
      submitArrow.removeClass('icon-link-arrow-white-new');
      submitArrow.addClass('icon-link-arrow-white-disabled');
      //Need to unbind the click event below otherwise it will submit the form over and over again
      submitButton.unbind( "click" );
    }
  }

  constructorFn.prototype.init = function () {

    //if its pre pre-populated (i.e there from before) we need to assume its a valid account
    var d = self.readBankDetails();
    if (d.branch_code.length > 0 && d.account_no.length > 0 && d.account_type.length > 0) {
      isValidAccount = true;
    }

    jQuery('.js-banking-details-tclink-close').unbind("click");
    jQuery('js-banking-details-tclink').unbind("click");
    jQuery('.js-banking-details-tclink').click(function(e) {
      jQuery('.js-banking-details-tclink-block').removeClass('wysniks');
    })
    jQuery('.js-banking-details-tclink-close').click(function(e) {
      jQuery('.js-banking-details-tclink-block').addClass('wysniks');
    })

    jQuery('.js-account-owner').unbind("change");
    jQuery('.js-account-owner').change(function(e) {
      if (jQuery("#from_someones").is(':checked')) {
        //someones
        jQuery('#theirPersonalDetails').removeClass("wysniks");
        jQuery('#bankDetailsPrefixYour').addClass("wysniks");
        jQuery('#bankDetailsPrefixTheir').removeClass("wysniks");

      } else {
        //yours
        jQuery('#theirPersonalDetails').addClass("wysniks");
        jQuery('#bankDetailsPrefixYour').removeClass("wysniks");
        jQuery('#bankDetailsPrefixTheir').addClass("wysniks");

      }
    });


    self.validationEngine =  jQuery('#banking_details_update_form').validate({
      onfocusout: function(element) {
        this.element(element);
        self.checkCanSubmit();
      },
      onclick: function (element) {
        this.element(element);
        self.checkCanSubmit();
        },

      rules: {
        "thirdp_firstname": {
          required: function(element) {
            return jQuery("#from_someones").is(':checked');
          }
        },
        "thirdp_surname": {
          required: function(element) {
            return jQuery("#from_someones").is(':checked');
          }
        },
        "thirdp_id": {
          required: function(element) {
            return jQuery("#from_someones").is(':checked');
          }
        }
      },

      errorClass: "error_field",
      messages: {
        account_holder: "<span>Please enter the account holder's name</span>",
        name_of_bank: "<span>Please enter a bank name</span>",
        branch_name: "<span>Please enter a branch name</span>",
        branch_code: "<span>Please enter the branch code</span>",
        account_no: "<span>Please enter the account number</span>",
        thirdp_id: "<span>Please enter the account holder's ID number</span>",
        thirdp_firstname: "<span>Please enter the account holder's first name</span>",
        thirdp_surname: "<span>Please enter the account holder's surname</span>"
      },
      focusInvalid: false,
      invalidHandler: function(form, validator) {

        if (!validator.numberOfInvalids())
          return;

        //console.log(jQuery(validator.errorList[0].element).position().top);
        jQuery('#banking_details_update_form_display .modal__content').animate({
          scrollTop: 0
        }, 1000);
      }
    });

    //if the account number is already captured then do a check on all fields to validate it again
    var timeout;
    jQuery("#banking_details_update_form_display").on("change keyup", ".js-validate", function(){
      if (jQuery("#account_no").val().length > 5){
        clearTimeout(timeout);
        timeout = setTimeout(function(){
          self.verifyAccount();
        }, 500)
      }
    })
  }

  constructorFn.prototype.initNOSUI = function () {

    jQuery('#account_type').nosFormSelect({
      namespace: 'form-select',
      onChange: function(el, fauxEl, options) {
        // do visual validation here
        self.checkCanSubmit();

        if (jQuery(el).val() == '') {
          // fail validation
          jQuery("#form-select-account_type").addClass("error_field");
          jQuery("#account_type-error").html("<span>Please select an account type</span>");
          jQuery("#account_type-error").show();
        } else {
          // pass validation
          jQuery("#form-select-account_type").removeClass("error_field");
          jQuery("#account_type-error").html("");
        }
      }
    });

    // jQuery('#apply_to_all').nosInputCheckbox({
    //   namespace: 'nosui-form-check-input'
    // });

    // jQuery('#tandc').nosInputCheckbox({
    //   namespace: 'nosui-form-check-input',
    //   onChange: function(el, fauxEl, options) {
    //     // do visual validation here
    //     self.checkCanSubmit();

    //     if (jQuery(el).is(':checked')) {
    //       // pass validation
    //       jQuery(el).prev().removeClass("error_field");
    //       jQuery("#tandc-error").html("");
    //     } else {
    //       // fail validation
    //       jQuery(el).prev().addClass("error_field");
    //       jQuery("#tandc-error").html("<span>Please check the box to confirm your details</span>");
    //       jQuery("#tandc-error").show();
    //     }
    //   }
    // });

    // jQuery('#confirm_details').nosInputCheckbox({
    //   namespace: 'nosui-form-check-input',
    //   onChange: function(el, fauxEl, options) {
    //     // do visual validation here
    //     self.checkCanSubmit();

    //     if (jQuery(el).is(':checked')) {
    //       // pass validation
    //       jQuery(el).prev().removeClass("error_field");
    //       jQuery("#confirm_details-error").html("");
    //     } else {
    //       // fail validation
    //       jQuery(el).prev().addClass("error_field");
    //       jQuery("#confirm_details-error").html("<span>Please check the box to confirm your details</span>");
    //       jQuery("#confirm_details-error").show();
    //     }
    //   }
    // });
    
    // jQuery('#authorise').nosInputCheckbox({
    //   namespace: 'nosui-form-check-input',
    //   onChange: function(el, fauxEl, options) {
    //     // do visual validation here
    //     self.checkCanSubmit();

    //     if (jQuery(el).is(':checked')) {
    //       // pass validation
    //       jQuery(el).prev().removeClass("error_field");
    //       jQuery("#authorise-error").html("");
    //     } else {
    //       // fail validation
    //       jQuery(el).prev().addClass("error_field");
    //       jQuery("#authorise-error").html("<span>Please check the box to authorise the details</span>");
    //       jQuery("#authorise-error").show();
    //     }
    //   }
    // });

  }

  constructorFn.prototype.validateForm = function () {
    var valid = jQuery('#banking_details_update_form').valid();

    // now check custom styled fields

    // account_type select drop-down
    var accountType = jQuery("#account_type");
    if (accountType.val() == '') {
      // fail validation
      jQuery("#form-select-account_type").addClass("error_field");
      jQuery("#account_type-error").html("<span>Please select an account type</span>");
      jQuery("#account_type-error").show();
      valid = false;
    } else {
      // pass validation
      jQuery("#form-select-account_type").removeClass("error_field");
      jQuery("#account_type-error").html("");
    }

    // t and c checkbox
    if (! jQuery("#tandc").is(':checked')) {
      valid = false;
    }
    if (! jQuery("#authorise").is(':checked')) {
      valid = false;
    }
    if (! jQuery("#confirm_details").is(':checked')) {
      valid = false;
    }

    return valid;
  }


  constructorFn.prototype.submitForm = function () {

    if (self.validateForm() && isValidAccount) {
      jQuery("#submit_banking_details_button").hide();
      jQuery("#spinner_banking_details").show();
      jQuery.ajax({
        url: ccs.contextPath + '/json/' + ccs.appName + '/' + ccs.languageCode + '/modules/self_service_banking_details_update/updateBankingDetails.json',
        dataType: 'json',
        type: 'post',
        data: jQuery("#banking_details_update_form").serialize(),
        async: true,
        cache: false,
        error: function (e) {
          showErrorModal('System error');
          jQuery("#submit_banking_details_button").show();
          jQuery("#spinner_banking_details").hide();
        },
        success: function (response) {
          jQuery("#submit_banking_details_button").show();
          jQuery("#spinner_banking_details").hide();

          if (response.success) {
            // show thank-you screen
            jQuery("#banking_details_update_form_display").hide();
            jQuery("#banking_details_thankyou_display").show();

            // fake the Incomplete Action on the Dashboard
            // for the complete list of "dealsToSwitch" from json

            for (var i=0; i < response.dealsToSwitch.length; i++) {
              jQuery("#banking_details_edit_" + response.dealsToSwitch[i]).removeClass("document_request_functions");
              jQuery("#banking_details_edit_" + response.dealsToSwitch[i]).removeClass("document_request_functions_disabled");
              jQuery("#banking_details_edit_" + response.dealsToSwitch[i]).addClass("document_request_functions_disabled");
              jQuery("#banking_details_edit_" + response.dealsToSwitch[i]).unbind("click");
              jQuery("#banking_details_edit_" + response.dealsToSwitch[i]).click(function() {
                event.stopPropagation();
              });
            }

          } else {
            showErrorModal('System error');
          }
        }
      });
    }
  }

  constructorFn.prototype.readBankDetails = function () {
    return {
      "branch_code" :jQuery("input[name=branch_code]").val(),
      "account_type" :jQuery("#account_type").val(),
      "account_no" :jQuery("input[name=account_no]").val()
    }

  }

  constructorFn.prototype.initAutoComplete = function () {
    var branches = [];
    //if we already have a prepopulated value for bank name then find the bank and set the available branches
    var bankName = jQuery("#name_of_bank").val().toLowerCase();
    var bankObj;
    if (bankName.length > 0){
      bankObj = jQuery.grep(items.banks, function(value){
        return value.name.toLowerCase() === bankName;
      })
      branches = jQuery.grep(items.branches, function(value){
        if (bankObj.length > 0) {
          return value.bankCode == bankObj[0].code;
        }
      })
    }
    jQuery( "#name_of_bank" ).autocomplete({
      minLength: 1,
      source: function(request, response){
        var matcher = new RegExp( jQuery.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( jQuery.grep( items.banks, function( value ) {
            return matcher.test(value.name);
          })
        )},
      appendTo: "#banking_details_update_form_display",
      select: function( event, ui ) {
        jQuery( "input[name=name_of_bank]" ).val( ui.item.name );
        //On select of the bank we setup the list of possible branches
        branches = jQuery.grep(items.branches, function(value){
          return value.bankCode == ui.item.code;
        })
        return false;
      }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return jQuery( "<li>" )
        .append( "<a>" + item.name + "</a>" )
        .appendTo( ul );
    };

    jQuery( "#branch_name" ).autocomplete({
      minLength: 1,
      source: function(request, response){
        var matcher = new RegExp( jQuery.ui.autocomplete.escapeRegex( request.term ), "i" );
        response( jQuery.grep(branches, function( value ) {
            return matcher.test(value.branchName);
          })
        )},
      appendTo: "#banking_details_update_form_display",
      /*              focus: function( event, ui ) {
       jQuery( "#bankname" ).val( ui.item.name);
       return false;
       },*/
      select: function( event, ui ) {
        jQuery( "input[name=branch_name]" ).val( ui.item.branchName );
        jQuery( "input[name=branch_code]" ).val( ui.item.sortCode );
        return false;
      }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return jQuery( "<li>" )
        .append( "<a>" + item.branchName + "</a>" )
        .appendTo( ul );
    };

    //focusout of branch number find the branchname from our branches collection
    jQuery( "input[name=branch_code]").focusout(function(){
      //If we have a list of branches we can do this so they need to select a bank first
      if (branches.length > 0){
        var brno = jQuery(this).val();
        branch = jQuery.grep(branches, function(value){
          return value.sortCode === brno;
        })
        if (branch.length > 0){
          //Set branch name
          jQuery( "input[name=branch_name]" ).val(branch[0].branchName);
        }else{
          //todo Could not find branch so show error
        }
      }
    });

  }


  constructorFn.prototype.verifyAccount = function () {
    //Only try and verify account if all fields needed are captured
    var d = self.readBankDetails();
    //if (accountType && branchCode && accountNo){
    jQuery("#spinner_verify_account").show();
    jQuery("#accountnumber-error").hide();
    jQuery.ajax({
      url: ccs.contextPath + '/json/' + ccs.appName + '/' + ccs.languageCode + '/modules/self_service_banking_details_update/verifyAccount.json',
      dataType: 'json',
      type: 'post',
      data: d,
      async: true,
      cache: false,
      error: function (e) {
        showErrorModal('System error');
        jQuery("#spinner_verify_account").hide();
        isValidAccount = false;
      },
      success: function (response) {
        jQuery("#spinner_verify_account").hide();

        if (response.success && response.isValid) {
          jQuery("#accountnumber-error").hide();
          jQuery("#account-details").removeClass("error_field");
          isValidAccount = true;
          self.checkCanSubmit();
        } else {
          isValidAccount = false;
          jQuery("#account-details").addClass("error_field");
          jQuery("#accountnumber-error").html("<span>Your account number doesn't match your<br/> branch code and/or account type. <br/>Please check again.</span>");
          jQuery("#accountnumber-error").show();
        }
        self.checkCanSubmit();
      }
    });
    //}
  }

  return new constructorFn();
}

