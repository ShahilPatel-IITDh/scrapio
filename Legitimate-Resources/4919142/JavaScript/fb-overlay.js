if(typeof setCookie === 'undefined') {
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";path=/;" + expires;
    }
}

if(typeof getCookie === 'undefined') {
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
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
}

jQuery(document).ready(function($) {

    function showFbPopup() {

        if (typeof FB == 'undefined') {
            return;
        }

        setCookie('isFbPopupDisplayed', 1, scriptParams.cookie_lifespan);
        var html = '<div class="fb-exit-popup-container">';
        html += '<div class="fb-exit-popup-inner shareItemLikeBox" item-position="popup">';
        html += '<div class="fb-exit-head">Kövess minket a Facebook-on <i class="fa fa-close"></i></div>';
        html += '<div id="fb-exit-popup" style="width:300px;" class="fb-page" data-href="' + fb_page_to_exit_popup + '" data-adapt-container-width="true" data-hide-cover="false" data-small-header="false" data-show-facepile="true" data-show-posts="false"></div>';
        html += '<a class="close-fb-popup">Már követem az oldalt</a>';
        html += '</div>';
        html += '</div>';
        $('body').append(html);
        $('.fb-exit-popup-container .close-fb-popup, .fb-exit-popup-container .fb-exit-head i').click(function () {
            $('.fb-exit-popup-container').remove();
        });
        FB.XFBML.parse();

    }

    function handleMouseleaveToFbExit(e) {

        if (fb_page_to_exit_popup == '' || $('.fb-exit-popup-container').length > 0) {
            return;
        }

        if (getCookie('isFbPopupDisplayed') == '') {
            showFbPopup();
        }
    }

    if($('body').hasClass('single-post') && typeof fb_page_to_exit_popup != 'undefined') {

        if(parseInt(scriptParams.popup_open_condition, 10)) {
            document.documentElement.addEventListener('mouseleave', handleMouseleaveToFbExit);
        }
        else {
            setTimeout(function() {
                handleMouseleaveToFbExit();
            }, 1000);

        }
    }

});
