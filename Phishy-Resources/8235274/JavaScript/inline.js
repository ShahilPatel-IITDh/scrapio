
  $(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13'){
    $("#btn-email, .btn-signin").click();
  }
});
