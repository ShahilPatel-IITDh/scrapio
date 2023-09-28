jQuery(document).ready(function ($) {
    "use strict";

    let modal = $("#woo_sc_modal");
    let htmlbody = $('html, body');
    htmlbody.on('click', '.woo_sc_call_popup', function () {
        htmlbody.find("#woo_sc_modal").show();
        htmlbody.css({
            overflow: 'hidden',
            height: '100%'
        });
    });

    htmlbody.on('click', '.woo_sc_modal_close', function () {
        htmlbody.find("#woo_sc_modal").hide();
        htmlbody.css({
            overflow: 'auto',
            height: 'auto'
        });
    });
    htmlbody.on('click', '#woo_sc_modal', function (event) {
        if (!event.target.closest('.woo_sc_modal_content')) {
            htmlbody.find("#woo_sc_modal").hide();
            htmlbody.css({
                overflow: 'auto',
                height: 'auto'
            });
        }
    });
    $('.woo_sc_table100-body.js-pscroll.ps').each(function () {
        let ps = new PerfectScrollbar(this);

        $(window).on('resize', function () {
            ps.update();
        })
    });
});
