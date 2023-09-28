$(document).ready(function() {
    $('.all_content').removeClass('all_content--hide');


    var elem = document.querySelector('.js-switch');
    var init = new Switchery(elem);

    var elem2 = document.querySelector('.js-switch-2');
    var init2 = new Switchery(elem2);

    var use_proxy = false;

    $('.generator_sound_checkbox .switchery').click(function() {

    });

    $('.use_proxy_checkbox .switchery').click(function() {
        use_proxy = !use_proxy;
    });

    $('.nav .nav__item').click(function() {
        var index = $(this).index();


        $('.nav .nav__item').removeClass('nav__item--active');
        $(this).addClass('nav__item--active');

        $('.nav .nav__active_bg').animate({left: (index * 33.333 + '%')}, 150);

        $('.header__side .header__title').removeClass('header__title--active');
        $('.header__side .header__title:nth-child(' + (index + 1) + ')').addClass('header__title--active');

        $('.content__views .content__view').removeClass('content__view--active');
        $('.content__views .content__view:nth-child(' + (index + 1) + ')').addClass('content__view--active');

        return false;
    });

    $('.platforms__items .platforms__item').click(function() {
        $('.platforms__items .platforms__item').removeClass('platforms__item--active');
        $(this).addClass('platforms__item--active');

        var value = $('input#generator_username').val();
        var platform_choose = $('.generator .platforms__item').hasClass('platforms__item--active');

        if (value != '' && platform_choose) {
            $('.generator .generator_proceed_btn').removeClass('btn--disabled');
        } else {
            $('.generator .generator_proceed_btn').addClass('btn--disabled');
        }

        return false;
    });

    $('input#generator_username').keyup(function() {
        var value = $(this).val();
        var platform_choose = $('.generator .platforms__item').hasClass('platforms__item--active');

        if (value != '' && platform_choose) {
            $('.generator .generator_proceed_btn').removeClass('btn--disabled');
        } else {
            $('.generator .generator_proceed_btn').addClass('btn--disabled');
        }
    });

    $('button, .btn').click(function() {
        var is_disabled = $(this).hasClass('btn--disabled');

    });

    $('.instructions_trg').click(function() {
        $('.full_overlay').addClass('full_overlay--show');
        $('.popup#instructions').addClass('popup--show');

        return false;
    });

    $('.settings_trg').click(function() {
        $('.full_overlay').addClass('full_overlay--show');
        $('.popup#settings').addClass('popup--show');

        return false;
    });

    $('.privacy_policy_trg').click(function() {
        $('.full_overlay').addClass('full_overlay--show');
        $('.popup#privacy_policy').addClass('popup--show');

        return false;
    });

    $('.terms_of_service_trg').click(function() {
        $('.full_overlay').addClass('full_overlay--show');
        $('.popup#terms_of_service').addClass('popup--show');

        return false;
    });

    $('.contact_us_trg').click(function() {
        $('.full_overlay').addClass('full_overlay--show');
        $('.popup#contact_us').addClass('popup--show');

        return false;
    });

    $('.close_popup_trg').click(function() {
        $('.full_overlay').removeClass('full_overlay--show');
        $(this).parent().parent().removeClass('popup--show');

        return false;
    });
});
