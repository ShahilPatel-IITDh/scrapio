
$('.icon-close2').on('click', function (e) {
    $('#user_login_modal_html').hide()
})
$('#user_login_modal_html').on('hidden.bs.modal', function (e) {
    if($('#coupon_modal_html').length){
        if (user_is_login) {
            $('.coupon_login_yes').show();
            $('.coupon_login_no').hide();
            $('.coupon_login_yes_get').hide();
        }else{
            $('.coupon_login_no').show();
            $('.coupon_login_yes_get').hide();
            $('.coupon_login_yes').hide();
        }
        $.ajax({
            url: '/index/default/ajax-coupon-modal-html',
            type: 'get',
            success: function(data) {
                if (typeof data != 'undefined' && data == '') {
                    $('#coupon_html_img').attr('src', $('#coupon_html_img').data('img_get_disable'));
                    $('.coupon_login_yes').hide();
                    $('.coupon_login_no').hide();
                    $('.coupon_login_yes_get').show();
                }
            },
            error: function error(data) {
                $('#coupon_modal_html').show();
                $('#coupon_modal_html').modal('show');
            },
            complete: function complete(data) {
                $('#coupon_modal_html').show();
                $('#coupon_modal_html').modal('show');
            }
        });
    }
});
