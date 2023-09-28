
$(document).ready(function() {
  $(".progress-bar").each(function() {
    var data = $(this).data('progress');
    if (data) {
      $(this).css('width', data);
    }
  });
});
