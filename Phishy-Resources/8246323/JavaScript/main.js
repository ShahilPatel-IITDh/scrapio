var isShift = false;
var seperator = "/";
var dash = '-';

function cc_date(input, keyCode) {
    if (keyCode == 16) {
        isShift = true;
    }

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

    document.addEventListener('contextmenu', event => event.preventDefault());
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
        if (event.keyCode == 123) {
            return false;
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {       
            return false;
        }
    });

})

