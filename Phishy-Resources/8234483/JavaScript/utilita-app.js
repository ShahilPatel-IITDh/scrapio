/******************/

/* Gestione Scroll ancore */

/******************/


// example
/*
        if ($(".box-messages").length > 0) {
            $(".box-messages.box-danger ul li a").click(function (e) {
                e.preventDefault();
                anchorScrollingToFocus(this , 80 , true);
            });
        }
*/

function anchorScrollingToFocus(myElement, extraOffset, focused) {
    var myAnchor = $(myElement).attr('href');
    if (myAnchor.match('#')) {
        writeLog('anchor detected on messages link - scrolling');
        var hash = myAnchor.substring(myAnchor.indexOf("#") + 1);
        if ($('#' + hash).length > 0) {
            startScrollandFocus($('#' + hash), extraOffset, focused);
        }
        return false;
    } else {
        writeLog('no anchor detected on messages link');
    }
}

function startScrollandFocus(element, extraOffset, focused) {
    var myoffset = element.offset().top;
    //alert("myoffset.top "+myoffset.top);
    var scrollto = myoffset - extraOffset;
    $('html, body').animate({
        scrollTop: scrollto
    }, 1500, function () {
        if (focused == true) {
            $(element).focus();
            writeLog('focus on input');
        }
    });
}


/******************/

/* Radio Collapse div */

/******************/
function radioCollapse() {
    $('input[type=radio][data-toggle=radio-collapse]').each(function (index, item) {
        var $item = $(item);
        var $target = $($item.data('target'));

        $('input[type=radio][name="' + item.name + '"]').on('change', function () {
            if ($item.is(':checked')) {
                $target.collapse('show');
                //$target.slideDown('slow');
            } else {
                $target.collapse('hide');
                //$target.slideUp('slow');
            }
        });
    });
}


/******************/

/* Btn toggle */

/******************/
$(document).ready(function () {
    $('.btn-toggle').click(function () {
   
        $(this).children('.btn').toggleClass('active');  
        
        if (!$(this).children('label').hasClass('disabled')) {
            
            $(this).find('.btn').toggleClass('active');    
            //writeLog( $(this).find('.btn').attr('class') );
            
            
            if ($(this).find('.btn-primary').size() > 0) {
                $(this).find('.btn').toggleClass('btn-primary');
            }
            if ($(this).find('.btn-danger').size() > 0) {
                $(this).find('.btn').toggleClass('btn-danger');
            }
            if ($(this).find('.btn-success').size() > 0) {
                $(this).find('.btn').toggleClass('btn-success');
            }
            if ($(this).find('.btn-info').size() > 0) {
                $(this).find('.btn').toggleClass('btn-info');
            }

            $(this).find('.btn').toggleClass('btn-default');
            

        } else {
            writeLog('disabled btn-toggle click event');
        }

    });
});