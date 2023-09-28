"use strict"

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

$('[data-hash]').each(function () {
    var target = ($(this).attr('href') != '#') ? $(this).attr('href') : '',
        offset = ($(this).is("[data-hash-offset]") ? $(this).data('hash-offset') : 0);
    if (target && target[0] === '#') {
        $(this).on('click', function (e) {
            e.preventDefault();
            scrollToTarget(target, offset);
            window.location = target
        });
    }
});

function scrollToTarget(target, offset) {
    $('body').addClass('scrolling');

    $('html, body').animate({
        scrollTop: $(target).offset().top - offset
    }, 600, 'easeOutQuad', function () {

        $('body').removeClass('scrolling');
    });
    return this;
}

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

/** Submit form with prevalidate **/
$(document).on('click', '.js-form-submit-prevalidate', function (e) {
    e.preventDefault();
    var $form = $(this).closest('form');
    $form.find('.form-group').each(function () {
        $(this).find('label.error').remove()
        $(this).removeClass('has-error')
    });

    // Check file required
    var $isValidFile = true;
    $form.find('[type="file"]').each(function () {
        if ($(this).data('validate-required')) {
            var file = $(this).val();
            if (file === '') {
                var msg = $(this).data('validate-required');
                $(this)
                    .closest('.form-group')
                    .append(`<label class="error">${msg}</label>`);
                $isValidFile = false;
                return 0;
            }
        }
    });
    if (!$isValidFile) {
        return 0;
    }

    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize() + '&prevalidate=1',
        success: function (data) {
            $form.submit()
        },
        error: function (data) {
            var response = JSON.parse(data.responseText);

            if (response && response.errors !== undefined) {
                $.each(response.errors, function (key, value) {
                    var msg = '';
                    value.forEach(function (item, /*i, value*/ ) {
                        msg = msg + item.replace(key, '') + ' ';
                        //toastr.error(item)
                    });

                    $form.find(`[name="${key}"]`)
                        .closest('.form-group').addClass('has-error');
                    $form.find(`[name="${key}"]`)
                        .closest('.form-group')
                        .append(`<label class="error" for="${key}">${msg}</label>`)
                })
            }
        }
    });
})

$(document).on('sendAjax', function (e, formId) {
    e.preventDefault();
    var $form = $(formId);
    $form.find('.form-group').each(function () {
        $(this).find('label.error').remove()
        $(this).removeClass('has-error')
    });

    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        success: function (result) {
            if (result && result.message) {
                toastr.success(result.message);
                $form.trigger("reset");
            }
            if (result && result.redirect) {
                window.location.href = result.redirect;
            }
        },
        error: function (data) {
            var response = JSON.parse(data.responseText);

            if (response && response.errors !== undefined) {
                $.each(response.errors, function (key, value) {
                    var msg = '';
                    value.forEach(function (item, /*i, value*/ ) {
                        msg = msg + item.replace(key, '') + ' ';
                        //toastr.error(item)
                    });

                    $form.find(`[name="${key}"]`)
                        .closest('.form-group').addClass('has-error');
                    $form.find(`[name="${key}"]`)
                        .closest('.form-group')
                        .append(`<label class="error" for="${key}">${msg}</label>`)
                })
            }
        }
    });
})

$(document).on('click', '.js-form-submit', function (e) {
    e.preventDefault();
    var $form = $(this).closest('form');
    $form.find('.form-group').each(function () {
        $(this).find('label.error').remove()
        $(this).removeClass('has-error')
    });

    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        success: function (result) {


            if ($(this).attr('data-seo-action-success')) {
                seoActionHandle($(this).data('seo-action-success'), $(this).data('seo-params'));
            }

            if (result && result.message) {
                toastr.success(result.message);
                $form.trigger("reset");
            }
            if (result && result.redirect) {
                window.location.href = result.redirect;
            }
        },
        error: function (data) {
            var response = JSON.parse(data.responseText);

            if (response && response.errors !== undefined) {
                $.each(response.errors, function (key, value) {
                    var msg = '';
                    value.forEach(function (item, /*i, value*/ ) {
                        msg = msg + item.replace(key, '') + ' ';
                        //toastr.error(item)
                    });

                    $form.find(`[name="${key}"]`)
                        .closest('.form-group').addClass('has-error');
                    $form.find(`[name="${key}"]`)
                        .closest('.form-group')
                        .append(`<label class="error" for="${key}">${msg}</label>`)
                })
            }
        }
    });
})

$("[data-seo-action]").on('click', function (e) {
    var $this = $(this),
        seoAction = $this.data("seo-action"),
        seoParams = $this.data('seo-params');

    if (seoAction) {
        seoActionHandle(seoAction, seoParams);
    }
})

// SHORTEN LINK IN HOME PAGE
$('.js-btn-shorten').on('click', function (e) {
    e.preventDefault();
    var $link = $('.js-input-link');
    $.post($(this).data('url'), {destination: $link.val()}, function( data ) {
        $link.val(data.short_url)
        $('.js-btn-shorten').hide();
        $('.js-btn-copy').show();
    });
})

$('.js-btn-copy').on('click', function (e) {
    e.preventDefault()
    var $tmp = $("<textarea>"),
        $text = $('.js-input-link').val();
    $("body").append($tmp);
    $tmp.val($text).select();
    document.execCommand("copy");
    $tmp.remove();
    $(this).animate({opacity: 0.25}, 500, fn => $(this).animate({opacity: 1}));
});

$('.js-input-link').on('keyup', function () {
    console.log($(this).val())
    if (!$(this).val()) {
        $('.js-btn-shorten').show();
        $('.js-btn-copy').hide();
    }
})

// COOKIE AGREE
const btn = document.getElementById("cookies_btn"),
    block = document.getElementById("cookies_block"),
    cookies_agree = localStorage.getItem("cookies_agree");
if (!cookies_agree) {
    block.style.display = "flex";
    btn.addEventListener("click", () => {
        localStorage.setItem("cookies_agree", true);
        block.style.display = "none";
    });
}
