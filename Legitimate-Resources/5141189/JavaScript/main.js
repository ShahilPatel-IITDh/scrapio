 
$(document).ready(function () {
    $(".form2").hide();

    $("#get-new-user").click(function () {
        $(".form1").hide();
        $(".form2").fadeIn(800);
    });

    $("#take-me-back").click(function () {
        $(".form2").hide();
        $(".form1").fadeIn(800);

    })


    $("input.numbers").keypress(function (event) {
        return /\d/.test(String.fromCharCode(event.keyCode));
    });

 



})
