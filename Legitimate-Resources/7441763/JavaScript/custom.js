jQuery(document).ready(function () {
  // $(".residential-servicing-main").hide();
  // $(".subservicing-main").hide();
  // $(".wholesale-lenders-main").hide();
  jQuery(".expand-btn").on("click", function (e) {
    e.preventDefault();
    jQuery(".pi-holder").toggleClass("open");
  });

  jQuery("#humber-menu").click(function () {
    jQuery("#nav_menu-4").toggle();
  });

  jQuery(".hamburger-menu").click(function () {
    jQuery("body").toggleClass("hamburger-open");
  });
  // SHOW HIDE CHART
  // residentialServicerChart;

  $("#residential-lenders-button").click(function () {
    $(".residential-lending-main").show();
    $(".residential-servicing-main").hide();
    $(".subservicing-main").hide();
    $(".wholesale-lenders-main").hide();

    $(this).addClass("button-active");
    $("#residential-service-button").removeClass("button-active");
    $("#servicing-button").removeClass("button-active");
    $("#wholesale-lenders-button").removeClass("button-active");
  });

  $("#residential-service-button").click(function () {
    $(".residential-lending-main").hide();
    $(".residential-servicing-main").show();
    $(".subservicing-main").hide();
    $(".wholesale-lenders-main").hide();

    $(this).addClass("button-active");
    $("#residential-lenders-button").removeClass("button-active");
    $("#servicing-button").removeClass("button-active");
    $("#wholesale-lenders-button").removeClass("button-active");

  });

  $("#servicing-button").click(function () {
    $(".residential-lending-main").hide();
    $(".residential-servicing-main").hide();
    $(".subservicing-main").show();
    $(".wholesale-lenders-main").hide();

    $(this).addClass("button-active");
    $("#residential-lenders-button").removeClass("button-active");
    $("#residential-service-button").removeClass("button-active");
    $("#wholesale-lenders-button").removeClass("button-active");
  });

  $("#wholesale-lenders-button").click(function () {
    $(".residential-lending-main").hide();
    $(".residential-servicing-main").hide();
    $(".subservicing-main").hide();
    $(".wholesale-lenders-main").show();

    $(this).addClass("button-active");
    $("#residential-service-button").removeClass("button-active");
    $("#servicing-button").removeClass("button-active");
    $("#residential-lenders-button").removeClass("button-active");
  });
});
const select = document.querySelector('.select-container select');
const selectContainer = document.querySelector('.select-container');

let startIndex = 0;
let endIndex = 9;

select.addEventListener('scroll', () => {
    if (select.scrollTop === (select.scrollHeight - select.offsetHeight)) {
        startIndex += 10;
        endIndex += 10;

        for (let i = startIndex; i <= endIndex; i++) {
            const option = document.createElement('option');
            option.value = 'value_' + i;
            option.text = 'Option ' + i;
            select.appendChild(option);
        }
    }
});
