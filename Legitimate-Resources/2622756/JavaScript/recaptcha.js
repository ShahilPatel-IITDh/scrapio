$(document).ready(function() {
    //cms form submit
    $('.cms-form-recap').submit(function(e) {
        if (!grecaptcha.getResponse()) {
            e.preventDefault(); //prevent form submit
            grecaptcha.execute();
        }
    });

    onCompleted = function() {
        cmsAjaxSubmit();
    };

    cmsAjaxSubmit = function() {
        //cms post
        jQuery.ajax({
            url: '/cms-form-recap',
            type: "POST",
            data: $('.cms-form-recap').serialize(),
            success: confirm(),
            dataType: 'json'
        });
    };

    var confirm = function () {
        jQuery('.cms-form-recap').hide();
        jQuery('#sending').show('fast', function() {
            setTimeout(function() {
                jQuery('.conftext').show();
                jQuery('#sending').hide();
            }, 1000);
        });
    };
});
