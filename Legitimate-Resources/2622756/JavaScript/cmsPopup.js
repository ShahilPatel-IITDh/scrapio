// CMSpopup
var show = 'yes';

$(window).on("load", function() {

    if (typeof popup !== 'undefined') {
        // if cookie already set, don't show popup
        var cookie = getCookie('popup' + popup.id);
        if (cookie != "") {
            // console.log('popup' + popup.id + ': cookie already set.');
        } else {
            // console.log('popup' + popup.id + ': cookie not set.');

            // PopUp on MOVE
            if (popup.mouseMove == 'Yes' && typeof $("#cmsPopup").data('bs.modal') == 'undefined') {
                window.onmousemove= function(e){
                    if (e.y <= 40) {
                        showPopup('move');
                    }
                };
            }

            // PopUp TIMED
            showPopup('time');

            // Create cookie when popup closed
            jQuery('#cmsPopup').on('hidden.bs.modal', function (){
                var d = new Date();
                d.setTime(d.getTime() + (popup.rememberDays * 24 * 60 * 60 * 1000));
                var expires = "expires="+d.toUTCString();
                var cookieString = 'popup' + popup.id + '=ok;'+ expires + ';path=/';
                document.cookie = cookieString;
                console.info(cookieString);
            });
        }
    }

    //cms form submit
    if ( jQuery('.cms-form-popup').length ) {
        jQuery('.cms-form-popup').submit(function (e) {
            e.preventDefault();
            //cms post
            jQuery.ajax({
                url: '/cms-form',
                type: "POST",
                data: jQuery(this).serialize(),
                success: confirm(),
                dataType: 'json'
            });
        });

        var confirm = function () {
            jQuery('.cms-form-popup').hide();
            jQuery('#sending').show('fast', function() {
                setTimeout(function() {
                    jQuery('.conftext').show();
                    jQuery('#sending').hide();
                }, 1000);
            });
        }
    }

});

function showPopup(type) {
    if (show == 'yes') {
        if (type == 'move') {
            jQuery('#cmsPopup').modal('show');
            setTimeout(function() {setImageHeight();}, 100);
            setTimeout(function() {setImageHeight();}, 200);
            setTimeout(function() {setImageHeight();}, 300);
            show = 'no';
            clearTimeout(popupTimeout);
        } else if (type == 'time') {
            popupTimeout = setTimeout(function() {
                jQuery('#cmsPopup').modal('show');
                show = 'no';
                setTimeout(function() {setImageHeight();}, 100);
                setTimeout(function() {setImageHeight();}, 200);
                setTimeout(function() {setImageHeight();}, 300);
            }, popup.appearsAfterSeconds * 1000);
        }
        setImageHeight();
        setTimeout(function() {setImageHeight();}, 100);
        setTimeout(function() {setImageHeight();}, 200);
        setTimeout(function() {setImageHeight();}, 300);
    }
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setImageHeight() {
    var imageSrc = document.getElementById('popupImage');
    if (imageSrc) {
        imageSrc = imageSrc
        .style
        .backgroundImage
        .replace(/url\((['"])?(.*?)\1\)/gi, '$2')
        .split(',')[0];
    var image = new Image();
    image.src = imageSrc;
    var width = image.width,
        height = image.height;
    $('#popupImage').height(height);
    }
}

//newsletter form submit
if ( jQuery('.newsletter-form-popup').length ) {
    jQuery('.newsletter-form-popup').submit(function (e) {

        e.preventDefault();
        $('#label_newsletter_offers_popup span.error').html('');
        $('#label_newsletter_tcs_popup span.error').html('');

        // check gdpr checkboxes
        if($("#newsletter_offers_popup").is(':checked') && $("#newsletter_tcs_popup").is(':checked')) {
            jQuery.ajax({
                url: '/newsletter-signup-form',
                type: "POST",
                data: jQuery(this).serialize(),
                success: nl_confirm(),
                dataType: 'json'
            });
        } else {
            if (!$("#newsletter_offers_popup").is(':checked')) {
                $('#label_newsletter_offers_popup span.error').html('<i class="fa fa-exclamation-circle"></i> please accept to continue. ');
            }
            if (!$("#newsletter_tcs_popup").is(':checked')) {
                $('#label_newsletter_tcs_popup span.error').html('<i class="fa fa-exclamation-circle"></i> please accept to continue. ');
            }
        }
    });
    var nl_confirm = function () {
        jQuery('.newsletter-form-popup').hide();
        jQuery('.newsletter-conftext-popup').show();
    }
}