jQuery(document).ready(function ($) {
    jQuery("#login_user").on("click", function () {
        jQuery.ajax({
            type: "post",
            url: ajax_call_epya.url,
            data: {
                action: "event_get_data_epya",
                user_email: jQuery("#user_email").val(),
                user_password: jQuery("#user_password").val(),
            },
            beforeSend: function () {
                jQuery("#info_user").html('<div class="col-md-12 text-center mb-5">espere...</div>');
            },
            complete: function (result) {
                // console.log(result)
                jQuery('#info_user').html(result.responseText)
            }
        });
    });

    // var i = [];

    // jQuery('.reward_category').each(function () {
    //     jQuery(this).click(function (e) {
    //         // i.push(jQuery(this).val());
    //         console.log(jQuery(this).val())
    //         // console.log(i);
    //     });
    // });

    jQuery(".reward_category").each(function () {
        jQuery(this).click(function (e) {
            // console.log('ajax', jQuery(this).val())
            var info_cat = "#info_cat" + jQuery(this).val();
            var pathname = window.location.pathname; // Returns path only (/path/example.html)
            var url      = window.location.href;     // Returns full URL (https://example.com/path/example.html)
            var origin   = window.location.origin;   // Returns base URL (https://example.com)
            // console.log('pathname', pathname)
            // console.log('url', url)
            // console.log('origin', origin)
            if(jQuery(this).val() != null){
                var redirect = origin + pathname + "?category_id=" + jQuery(this).val()
                // console.log('hago rediretct')
                window.location.href = redirect
            }else{
                // console.log('no hago redirect')
            }
            // console.log(info_cat)
            // console.log(reward_category.url)
            /*
            jQuery.ajax({
                type: "post",
                url: reward_category_get.url_r,
                data: {
                    action: "reward_category_maim",
                    category_id: jQuery(this).val(),
                    manage: 'category_list'
                },
                beforeSend: function () {
                    // console.log('get_data...')
                    // jQuery(info_cat).html('<div class="lds-ripple"><div></div><div></div></div>');
                    // jQuery(info_cat).html('<div class="col-md-12 text-center">Cargando...</div>');
                    jQuery('#info_category').html('<div class="col-md-12 text-center">Cargando...</div>');
                },
                complete: function (result) {
                    // console.log('emntro')
                    // console.log(result.responseText)
                    jQuery('#info_category').html(result.responseText)
                    // jQuery(info_cat).html(result.responseText)
                }
            });
            */
        });
    });
});