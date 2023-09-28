export function init() {

    $('body').find('.second-level').each((index, el) => {
        $(el).find('.common-link__button').each((idx, e) => {
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