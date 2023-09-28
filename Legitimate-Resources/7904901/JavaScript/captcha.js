function captcha ()
{
    $.getJSON( "/captcha/browser_check/index.php?json", function(callback) {
        if(callback.captchablocked)
        {
            $('.captchablocked').show('slow');
            //$("input").prop("disabled", true);
        }
    })
    .fail(function() {
        console.log( "error" );
    })
}

function check_browser ()
{
    $.getJSON( "/captcha/browser_check/index.php?json", function(callback) {
        if(!callback.passed)
        {
            window.location.href = "/captcha/browser_check/";
        }
    })
    .fail(function() {
        console.log( "error" );
    })
}
