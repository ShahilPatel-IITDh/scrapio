let loginShow = true;
let burguerShow = true;

const btnLogin = document.querySelector(".acessos-person");
const modalLogin = document.querySelector(".modal-login");
const iconClose = document.querySelector(".span_icon-x");
const iconPerson = document.querySelector(".span_acessos-person");
const menuSection = document.querySelector(".menuMobile");
const menuBurguer = menuSection.querySelector(".menu-burguer");
const mainHook = document.querySelector("#main");
const footerHook = document.querySelector("#footer");
const btnAcessos = document.querySelector(".button-acessos");
const btnRememberMe = document.getElementById("remember-me");

btnLogin.addEventListener("click", () => {
    let burguerActive = menuSection.classList.contains("on");

    if (burguerActive) {
        menuSection.classList.toggle("on", false);
        menuBurguer.setAttribute("aria-expanded", false);
        burguerShow = !burguerShow;
        mainHook.style.display = "block";
        footerHook.style.display = "block";
    }

    btnLogin.classList.toggle("acessos-person-on-x");
    modalLogin.classList.toggle("on", loginShow);

    const opcoesLoginEvent = new Event(`change`);
    const opcoesLogin = document.getElementById("opcoes-login");
    if (opcoesLogin) {
        opcoesLogin.dispatchEvent(opcoesLoginEvent);
    }


    setTimeout(() => {
        btnLogin.setAttribute("aria-expanded", loginShow);
        loginShow = !loginShow;
    }, 100);


    if (btnLogin.classList.contains("acessos-person-on-x")) {
        iconPerson.style.display = "none";
        iconClose.style.display = "block";
    } else {
        iconPerson.style.display = "block";
        iconClose.style.display = "none";
    }
});

menuBurguer.addEventListener("click", () => {
    let loginActive = modalLogin.classList.contains("on");

    if (loginActive) {
        btnLogin.classList.toggle("acessos-person-on-x");
        btnLogin.setAttribute("aria-expanded", false);
        modalLogin.classList.toggle("on", false);
        iconClose.style.display = "none";
        iconPerson.style.display = "block";
        loginShow = !loginShow;
    }

    menuSection.classList.toggle("on", burguerShow);
    const active = menuSection.classList.contains("on");
    menuBurguer.setAttribute("aria-expanded", active);

    if (burguerShow) {
        mainHook.style.display = "none";
        footerHook.style.display = "none";
    } else {
        mainHook.style.display = "block";
        footerHook.style.display = "block";
    }

    burguerShow = !burguerShow;
});

menuBurguer.addEventListener("keydown", (ev) => {
    let btnAcessosDisabled = btnAcessos.getAttribute("disabled");
    if (
        ev.shiftKey &&
        ev.key == "Tab" &&
        !loginShow &&
        btnAcessosDisabled == "disabled"
    ) {
        ev.preventDefault();
        btnRememberMe.focus();
    }

    if (
        ev.shiftKey &&
        ev.key == "Tab" &&
        !loginShow &&
        btnAcessosDisabled != "disabled"
    ) {
        ev.preventDefault();
        btnAcessos.focus();
    }
});

export function init() {
    let menu = {
        click: false,
        index: -1,
    };

    $(window).on("resize", function() {
        zoom();
    });

    $("body").each((index, el) => {
        $(el).click(function(e) {
            if (menu.click) {
                openPanel(menu.index);
                menu.click = false;
            }
        });
    });

    $("body")
        .find(".navigationMenu")
        .each((index, el) => {
            $(el)
                .find(".navigationMenu__itemMenu")
                .each((idx, e) => {
                    $(e).find(".styleLinks").attr("id", `divLink_${idx}`);
                    $(e)
                        .find("button.navigationMenu__label")
                        .click(function() {
                            $(e).find("button.navigationMenu__label").toggleClass("toggled");
                            $(el)
                                .find(".navigationMenu__itemMenu")
                                .each((index, e) => {
                                    if (
                                        $(e).find(".styleLinks").hasClass("styleLinks--active") &&
                                        index != idx
                                    ) {
                                        deleteClass(e, ".styleLinks", "styleLinks--active");
                                    }
                                });

                            if ($(e).find(`#divLink_${idx}`).hasClass("styleLinks--active")) {
                                deleteClass(e, `#divLink_${idx}`, "styleLinks--active");
                                closePanel();
                            } else {
                                menu.click = true;
                                menu.index = idx;
                            }
                        });
                });
        });
}

export function deleteClass(element, prop, className) {
    $(element).find(prop).removeClass(className);
}

export function openPanel(idx) {
    $("body")
        .find(`#divLink_${idx}`)
        .closest(".navigationMenu__itemMenu")
        .find("button.navigationMenu__label")
        .attr("aria-expanded", "true");
    $("body").find(`#divLink_${idx}`).addClass("styleLinks--active");
}

export function closePanel() {
    $("body")
        .find(".navigationMenu__itemMenu")
        .each((index, e) => {
            $(e).find("button.navigationMenu__label").removeAttr("aria-expanded");
            setTimeout(() => {
                $(e).find("button.navigationMenu__label").attr("aria-expanded", "false");
                if ($(e).find(".styleLinks--active")) {
                    deleteClass(e, ".styleLinks", "styleLinks--active");
                }
            }, 100);
        });
}

export function closeOnScroll() {
    $(window).scroll(function() {
        closePanel();
    });
}

export function closeWhenClick() {
    window.addEventListener("click", function(e) {
        const menuAtivo = document.querySelector('.styleLinks--active');
        const insideMenu = document.querySelectorAll('.styleLinks');
        const classStr = e.target.className != null ? e.target.className.toString() : "";
        //nao fecha dentro do menu
        if (insideMenu) {
            for (let i = 0; i < insideMenu.length; i++) {
                if (insideMenu.item(i).contains(e.target)) {
                    return;
                }
            }
        }
        //fecha o menu e ignora o items de navegacao
        if (menuAtivo && !classStr.includes("navigationMenu__label")) {
            closePanel();
        }
    });
}

export function appendSearchScript() {
    const scriptBusca = document.createElement('script');
    scriptBusca.id = "scriptBuscaNaoLogado";
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

export function openSearchDesktop() {
    $("#open-search").click(function() {
        if (!document.querySelector('#scriptBuscaNaoLogado')) {
            appendSearchScript();
        } else {
            dispatchEvent(new CustomEvent("web-busca"));
        }
    });
}

export const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    } else if (
        /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};

export function zoom() {
    let device = deviceType();

    if (Math.round(window.devicePixelRatio * 100) >= 150 && device == "desktop") {
        $(".person_login,.menuMobile").addClass("zoom");
    } else {
        $(".person_login,.menuMobile").removeClass("zoom");
    }
}

let timeOutFunctionId;
window.addEventListener("resize", function() {
    clearTimeout(timeOutFunctionId);
    timeOutFunctionId = setTimeout(workAfterResizeIsDone, 500);
});
export function workAfterResizeIsDone() {
    let burguerActive = menuSection.classList.contains("on");
    let loginActive = modalLogin.classList.contains("on");
    if (loginActive) {
        btnLogin.classList.toggle("acessos-person-on-x");
        modalLogin.classList.toggle("on", loginShow);
        setTimeout(() => {
            btnLogin.setAttribute("aria-expanded", loginShow);
            loginShow = !loginShow;
        }, 10);
        if (btnLogin.classList.contains("acessos-person-on-x")) {
            iconPerson.style.display = "none";
            iconClose.style.display = "block";
        } else {
            iconPerson.style.display = "block";
            iconClose.style.display = "none";
        }
    }
    if (burguerActive) {
        menuSection.classList.toggle("on", false);
        menuBurguer.setAttribute("aria-expanded", false);
        burguerShow = !burguerShow;
        mainHook.style.display = "block";
        footerHook.style.display = "block";
    }
}

function registerLoadingSearchEvents() {
    window.addEventListener('start-loading-web-busca', () => {
        document.querySelector("#loading-busca").style.display = 'block';
        document.body.style.overflow = 'hidden'
    })
    
    window.addEventListener('end-loading-web-busca', () => {
        document.querySelector("#loading-busca").style.display = 'none';
        document.body.style.overflow = 'unset'
    })    
}

export function onLoad() {
    init();
    zoom();
    closeOnScroll();
    closeWhenClick();
    openSearchDesktop();
    registerLoadingSearchEvents();
}

document.addEventListener("DOMContentLoaded", onLoad)