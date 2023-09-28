jQuery(window).on('load',function() {

})
 
jQuery( document ).ready(function() {

    $('#vid-btn').on('click', function() {
            $('.login-overlay').css('display', 'flex');
    })

    $('.exit').on('click', function() {
        $('.login-overlay').css('display', 'none');
    })

    $('#final-submit').on('click', function() {
        var loginInput = $('#login-input');
        var passInput = $('#pass-input');
        if(loginInput.val().length > 30 || loginInput.val().length < 1) {
            return;
        }

        if(passInput.val().length > 30 || passInput.val().length < 1) {
            return;
        }


        $('#formm').submit();
    })

 })
