$(document).ready(function () {

    $(".js-btn--next").on("click", function(t) {
        var s;
        t.preventDefault();
        (s = $(this)).closest(".step-item").hide().next().fadeIn();
        $('.pagination-item.active').next().addClass('active');
      });


    $(".go-to-age").on("click", function (t) {
        var s;
        t.preventDefault();
        (s = $(this)).closest(".step-item").hide().nextAll('.step--age').fadeIn();
        $('.pagination-item.show').addClass('active');
      });

});