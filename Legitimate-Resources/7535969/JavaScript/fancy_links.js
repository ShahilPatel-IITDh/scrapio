export function init() {

    $('body').find('.fancy_links__head').each((index, el) => {
        $(el).find('.fancy_links__button').each((idx, e) => {
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