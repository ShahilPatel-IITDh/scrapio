jQuery(function ($) {
	$('.woocommerce form.woocommerce-form .woocommerce-form-row span.password-input').append(
	"<div class='hide-show'><span toggle='#password' class='fa fa-fw field-icon toggle-password fa-eye'></span></div>");
	
	$('.woocommerce form.woocommerce-form .form-row-last').append(
	"<div class='hide-show'><span toggle='#password' class='fa fa-fw field-icon toggle-password fa-eye'></span></div>");
});

jQuery(function($){
  $(".toggle-password").click(function() {

  $(this).toggleClass("fa-eye fa-eye-slash");
  var input = $($(this).attr("toggle"));
  if (input.attr("type") == "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
});
	
	
});

