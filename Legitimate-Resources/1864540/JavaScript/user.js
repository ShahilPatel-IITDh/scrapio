$(document).ready(function(){

  // CLOSE BOX
  $('body').on('click', 'button.mo-close', function(){
    $('#mo-fancy-dialog').fadeOut(200);
    $('#mo-fancy-overlay').fadeOut(200);
  });


  $('#mo-fancy-dialog .mo-close, #mo-fancy-overlay').on('click', function(e){ 
    e.stopPropagation();
    $('#mo-fancy-dialog').fadeOut(200);
    $('#mo-fancy-overlay').fadeOut(200);
  });

  // GO TO NEW OFFER
  $('body').on('click', 'a.mo-goto-new', function(e) {
    e.preventDefault();
    $('#mo-list').slideUp(200, function() {
      $('#mo-new').slideDown(200);
    });
  });


  // GO TO OFFER LIST
  $('body').on('click', 'i.mo-back', function(e) {
    e.preventDefault();
    $('#mo-new').slideUp(200, function() {
      $('#mo-list').slideDown(200);
    });
  });



  // OFFER SUBMISSION VIA AJAX 
  $('body').on('click', 'button.mo-submit', function(e){
    e.preventDefault();

    // FORM VALIDATION
    $('form.mo-form-new').validate({
      rules: {
        "price": {
          required: true
        },

        "name": {
          required: true,
          minlength: 3
        },

        "email": {
          required: true,
          email: true
        }      
      },
      
      messages: {
        "price": {
          required: "Price: This field is required."
        },

        "name": {
          required: "Name: This field is required.",
          minlength: "Name: Name is too short."
        },
        
        "email": {
          required: "Email: This field is required.",
          email: "Email: Not valid email format."
        }
      },
      
      wrapper: "li",
      errorLabelContainer: ".mo-error-list",
      invalidHandler: function(form, validator) {
        $('#mo-fancy-dialog').animate({scrollTop:0}, 300);
      },
      submitHandler: function(form){
        $('button[type=submit], input[type=submit]').attr('disabled', 'disabled');
        form.submit();
      }
    });
 


    if($('form.mo-form-new').valid())  {
      var form = $(this).closest('form');

      form.find('button.mo-submit').addClass('disabled').attr('disabled', true);

      $.ajax({
        url: form.attr('action'),
        type: "POST",
        data: form.find(':input[value!=""]').serialize(),
        success: function(response){
          form.find('button.mo-submit').removeClass('disabled').attr('disabled', false);
          form.slideUp(200);
          form.siblings('.mo-status.mo-success').slideDown(200);
        },
        error: function(response){
          form.find('button.mo-submit').removeClass('disabled').attr('disabled', false);
          form.slideUp(200);
          form.siblings('.mo-status.mo-error').slideDown(200);
        }
      });
    }

  });



  // SELLER APPROVAL/REJECTION BY AJAX 
  $('body').on('click', 'a.mo-respond-button', function(e){
    e.preventDefault();

    var status = $(this).attr('data-accept');
    var form = $(this).closest('form');

    form.find('a.mo-respond-button').addClass('disabled').attr('disabled', true);
    form.find('input[name="statusId"]').val(status);

    $.ajax({
      url: form.attr('action'),
      type: "POST",
      data: form.find(':input[value!=""]').serialize(),
      success: function(response){
        form.find('a.mo-respond-button').removeClass('disabled').attr('disabled', false);
        form.find('.mo-input-wrap').fadeOut(200);
        form.parent().addClass('mo-done').text(form.find('input[name="respond"]').val());

        // UPDATE STATUS
        if(status == 1) {
          form.parent().siblings('.mo-offer-status').text(moStatusAccept);
        } else if(status == 2) {
          form.parent().siblings('.mo-offer-status').text(moStatusDecline);
        }
      }
    });
  });



  // UPDATE UNIT PRICE ON CHANGE
  $('body').on('change', '#price, #quantity', function(){
    var price = $('#mo-new #price').val();
    var quantity = $('#mo-new #quantity').val();

    if( price != '' && price > 0 && quantity > 1) {
      $('#mo-new .unit-price').show(0);
      $('#mo-new .unit-price .mo-top').text( (price/quantity).toFixed(1) + $('#mo-new .mo-input-wrap > span').text() );

    } else {
      $('#mo-new .unit-price').hide(0);
    }
  });


  $('body').on('click', 'a.make-offer-link', function(e) {
    e.preventDefault();

    $.get(
      $(this).attr('data-ajax-url'),
      function(response) {
        $('#mo-fancy-dialog').html($(response).contents().parent('.show-offer-wrap').html());

        $('#mo-fancy-dialog').fadeIn(200).css('top', ($(document).scrollTop() + Math.round($(window).height()/10)) + 'px');
        $('#mo-fancy-overlay').fadeIn(200);
      }
    );
  });

});
