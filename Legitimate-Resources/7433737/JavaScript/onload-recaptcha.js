var onloadCaptcha = function() {};

// Used in signup submit button
if($( "#submit-btn" ).length) {
  onloadCaptcha = function() {
    $( "#submit-btn" ).attr("disabled", "disabled")
  }
}