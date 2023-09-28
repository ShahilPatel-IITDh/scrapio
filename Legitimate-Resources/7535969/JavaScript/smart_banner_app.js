export function init() {

    $('body').find('.menuMobile__head').each((index, el) => {
        $(el).find('.smart-banner').each((idx, e) => {
            $(e).click(function() {
                if ($(e).hasClass('active')) { 
                    $(e).removeClass('active');
                 } else {
                    $(e).addClass('active');
                 }
            })
        })
    })
}

document.addEventListener("DOMContentLoaded", init);