(function ($) {
  $("#search-block-form").on("submit", function(e) {
    var search = $("#search-block-form input#edit-search-block-form--2");
    var search = $("#search-block-form input#edit-search-block-form--2").val().replace(/\s?&\s?/g,' ');
    $('.search-form input#edit-search-block-form--2').val(search);
  });
}(jQuery));
