$(document).ready(function() {
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small></small>';
      }
    }
  });
});

$('.datepicker').datepicker({
  changeMonth: true,
  changeYear: true,
  format: 'dd-mm-yyyy',
  autoclose:true
});
$('.timepicker').timepicker({
  autoclose:true
});

  $("#formDiv1Next").click(function () {
    if($('#enrollmentFormId').valid())
    {
      $("#formdiv1").hide();
      $("#formdiv2").show();
      $("#level2").toggleClass('done');
    }
  });
  $("#formDiv2Prev").click(function () {
      $("#formdiv2").hide();
      $("#formdiv1").show();
      $("#level2").toggleClass('done');
  });
  $("#formDiv2Next").click(function () {
    if($('#enrollmentFormId').valid())
    {
      $("#formdiv2").hide();
      $("#formdiv3").show();
      $("#level3").toggleClass('done');
    }
  });
  $("#formDiv3Prev").click(function () {
      $("#formdiv3").hide();
      $("#formdiv2").show();
      $("#level3").toggleClass('done');
  });
  $("#formDiv3Next").click(function () {
    if($('#enrollmentFormId').valid())
    {
      $("#formdiv3").hide();
      $("#formdiv4").show();
      $("#level4").toggleClass('done');
    }
  });
  $("#formDiv4Prev").click(function () {
      $("#formdiv4").hide();
      $("#formdiv3").show();
      $("#level4").toggleClass('done');
  });

  $("#accommodationRequiredNo").click(function () {
      $("#accommodationRequiredDiv").hide();
  });
  $("#accommodationRequiredYes").click(function () {
      $("#accommodationRequiredDiv").show();
  });

  $("#airPortTransferNo").click(function () {
      $("#airportTransferSingleDiv").hide();
      $("#airportTransferReturnDiv").hide();
  });
  $("#airPortTransferSingle").click(function () {
      $("#airportTransferSingleDiv").show();
      $("#airportTransferReturnDiv").hide();
  });
  $("#airPortTransferReturn").click(function () {
      $("#airportTransferSingleDiv").show();
      $("#airportTransferReturnDiv").show();
  });
  $("#sponsorStudentYes").click(function () {
      $("#sponsorNameDiv").show();
  });
  $("#sponsorStudentNo").click(function () {
      $("#sponsorNameDiv").hide();
  });

  /* enrollment frm */
  $('#enrollmentFormId').validate({
    rules:{
      title: {required: true},
      first_name: {required: true},
      last_name: {required: true},
      dob: {required: true},
      address: {required: true},
      contact_number: {required: true},
      email: {required: true},
      nationality: {required: true},
      id_number: {required: true},
      first_language: {required: true},
      visa_requirement: {required: true},
      passport_number: {required: true},
      sponsored_student: {required: true},
      sponsor_name: {required: true},
      emergency_contact_name: {required: true},
      emergency_contact_relationship: {required: true},
      emergency_contact_number: {required: true},

      course_details:{required: true},
      course_start_date: {required: true},
      course_end_date: {required: true},
      number_of_weeks: {required: true},
      level_of_english: {required: true},
      accommodation_required: {required: true},
      bcc_residential_accommodation: {required: true},
      accommodation_start_date: {required: true},
      accommodation_end_date: {required: true},
      uk_address: {required: true},
      airport_transfer: {required: true},
      airport_name: {required: true},
      date_of_flight: {required: true},
      time_of_flight: {required: true},
      flight_number: {required: true},
      return_airport_name: {required: true},
      return_date_of_flight: {required: true},
      return_time_of_flight: {required: true},
      return_flight_number: {required: true},
      about_bcc: {required: true},
      //agent_name: {required: true},
      upload_passport: {required: true},
      upload_visa_page: {required: true},
      letter_financial_support_copy: {required: true},
      declaration: {required: true}
    }
  });

  /* contact frm */
  $('#contactFrm').validate({
    rules:{
      name: {required: true},
      email: {required: true},
      phone: {required: true},
      query: {required: true},
      msg: {required: true},
      type: {required: true}
    }
  });
  
  
  $('.residence').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    dots:false,
    autoplay:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})
  