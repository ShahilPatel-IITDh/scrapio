function acessibilitetab(lastClass, firstClass) {
    lastClass.each(function(index, element) {
        $(element).on('keydown', function(e) {
            var optionsLength = $(this).parent().children().length;
            var keyCode = e.keyCode;
            if ($(this).index() === optionsLength - 1) {
                if (keyCode === 9 || e.which === 9) {
                    if (!e.shiftKey) {
                        firstClass.focus();
                        e.preventDefault();
                        return false;
                    }
                }
            }
        });
    });
    firstClass.each(function(index, element) {
        $(element).on('keydown', function(e) {
            var keyCode = e.keyCode;
            if ($(this).index() === 0) {
                if (keyCode === 9 || e.which === 9) {
                    if (e.shiftKey) {
                        lastClass.focus();
                        e.preventDefault();
                        return false;
                    }
                }
            }
        });
    });
}

export function init() {
    acessibilitetab($('.list_father .list_option:last-child a'), $(".button_close_modal"))

    var header = document.getElementById('header');
    var main = document.getElementById('main');
    var middleFooter = document.getElementById('share-middle-footer');
    var mobileFooter = document.getElementById('mobile-footer');
    var breadrumbFooter = document.getElementById('upper-col');
    var tjFooter = document.getElementById('legal-info');
    var modalButton = document.getElementById('modal_button');

    let botao_open_modal = document.querySelector('.options_button');
    let botao_close_modal = document.querySelector('.button_close_modal');
    let modal = document.querySelector('.footer_modal');

    botao_open_modal.addEventListener('click', () => {
        header.setAttribute("aria-hidden", "true");
        main.setAttribute("aria-hidden", "true");
        middleFooter.setAttribute("aria-hidden", "true");
        mobileFooter.setAttribute("aria-hidden", "true");
        breadrumbFooter.setAttribute("aria-hidden", "true");
        tjFooter.setAttribute("aria-hidden", "true");
        modalButton.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-hidden");
        modal.classList.add('modal_show');
        botao_close_modal.focus();
    });
    botao_open_modal.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            header.setAttribute("aria-hidden", "true");
            main.setAttribute("aria-hidden", "true");
            middleFooter.setAttribute("aria-hidden", "true");
            mobileFooter.setAttribute("aria-hidden", "true");
            breadrumbFooter.setAttribute("aria-hidden", "true");
            tjFooter.setAttribute("aria-hidden", "true");
            modalButton.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-hidden");
            modal.classList.add('modal_show');
            botao_close_modal.focus();
        }
    });
    botao_close_modal.addEventListener('click', () => {
        header.removeAttribute("aria-hidden");
        main.removeAttribute("aria-hidden");
        middleFooter.setAttribute("aria-hidden", "false");
        mobileFooter.setAttribute("aria-hidden", "false");
        breadrumbFooter.setAttribute("aria-hidden", "false");
        tjFooter.setAttribute("aria-hidden", "false");
        modalButton.setAttribute("aria-hidden", "false");
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove('modal_show');
        botao_open_modal.focus();
    });
    botao_close_modal.addEventListener('keypress', (event) => {
        if (event.key === "Enter") {
            header.removeAttribute("aria-hidden");
            main.removeAttribute("aria-hidden");
            middleFooter.setAttribute("aria-hidden", "false");
            mobileFooter.setAttribute("aria-hidden", "false");
            breadrumbFooter.setAttribute("aria-hidden", "false");
            tjFooter.setAttribute("aria-hidden", "false");
            modalButton.setAttribute("aria-hidden", "false");
            modal.setAttribute("aria-hidden", "true");
            modal.classList.remove('modal_show');
            botao_open_modal.focus();

        }
    });
}
export function onLoad() {
    init();
}
document.addEventListener("DOMContentLoaded", onLoad);