let show = true;

const menuSection = document.querySelector(".menuMobile");
const menuBurguer = menuSection.querySelector(".menu-burguer");
const itemMenu = document.getElementsByClassName("item-menu");
const collapse = document.getElementsByClassName("collapsible");
const btnPerson = document.querySelector(".acessos-person");

// menuBurguer.addEventListener("click", () => {
//     if (show){
//         menuBurguer.classList.remove("on", false)
//     } 
    
//     menuSection.classList.toggle("on", show);
//     console.log(show);
//     const active = menuSection.classList.contains('on');
//     console.log(active);
//     menuBurguer.setAttribute("aria-expanded", active);
//     show = !show;
// })


for (const item of itemMenu) {
    item.addEventListener("click", function() {
        for (const item of itemMenu) item.style.order = 2;
        this.style.order = 1;
    });
}

for (const item of collapse) {
    $(item).find('.btn-menu').click(function() {
        for (const item of collapse) {
            if (item.offsetTop != this.offsetTop && isSameLevel(this, item)) {
                item.classList.remove("active");
                item.nextElementSibling.classList.remove("active");
            }
        }
        item.classList.toggle("active");
        item.nextElementSibling.classList.toggle("active");
        $(item).find(".btn-menu").attr('aria-expanded', $(item).hasClass("active"));

    });
}

function isSameLevel(elem1, elem2) {
    switch (elem1.classList[1]) {
        case 'has-child':
            if (elem2.classList[1] == 'has-child') {
                return true;
            }
            break;
        case 'collapse-child':
            if (elem2.classList[1] == 'collapse-child') {
                return true;
            }
            break;
        default:
            return false;
    }
}

function appendSearchScript() {
    const scriptBusca = document.createElement('script');
    scriptBusca.id = "scriptBuscaNaoLogado"
    scriptBusca.type = "text/javascript";
    scriptBusca.src = "https://buscanaologadowebcomponent.cloud.itau.com.br/main.js";

    dispatchEvent(new CustomEvent('start-loading-web-busca'));
    
    scriptBusca.onload = function() {
        dispatchEvent(new CustomEvent("web-busca"))
        setTimeout(() => {    
            dispatchEvent(new CustomEvent('end-loading-web-busca'));
        }, 500);
    }

    scriptBusca.onerror = function() {
        dispatchEvent(new CustomEvent('end-loading-web-busca'));
    }

    document.head.append(scriptBusca);
}

function openSearchMobo() {
    $("#open-search-mobo").click(function () {
        if (!document.querySelector('#scriptBuscaNaoLogado')) {
            appendSearchScript();
        } else {
            dispatchEvent(new CustomEvent("web-busca"))
        }
    })
}

$('body').find('.footerMobile__head').each((index, el) => {
    $(el).find('.footer').each((idx, e) => {
        $(e).click(function() {
            if ($(e).hasClass('active')) {
                $(e).removeClass('active');
            } else {
                $(e).addClass('active');
            }
        })
    })
})

$('body').find('.menuMobile__head').each((index, el) => {
    $(el).find('.rotate').each((idx, e) => {
        $(e).click(function() {
            if ($(e).hasClass('active')) {
                $(e).removeClass('active');
            } else {
                $(e).addClass('active');
            }
        })
    })
})

$('.hamburguer button').click(function(){
    if(!$(this).closest('.menuMobile').hasClass('on')){
        $('.menuMobile__item .collapsible.active button').click();
    }
});

export function onLoad() {
    openSearchMobo();
}

document.addEventListener("DOMContentLoaded", onLoad);
