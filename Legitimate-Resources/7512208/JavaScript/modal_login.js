const btnLogin = document.querySelector(".acessos-person");
const inputLogin = document.getElementById("opcoes-login");
const btnRememberMe = document.getElementById("remember-me");
const btnAcessos = document.querySelector(".button-acessos");
const menuHamburguer = document.querySelector(".menu-burguer");

btnLogin.addEventListener("keydown", (ev) => {
    if (!ev.shiftKey &&
        ev.key == "Tab" &&
        btnLogin.classList.contains("acessos-person-on-x")
    ) {
        ev.preventDefault();
        inputLogin.focus();
    }
});

inputLogin.addEventListener("keydown", (ev) => {
    if (
        ev.shiftKey &&
        ev.key == "Tab" &&
        btnLogin.classList.contains("acessos-person-on-x")
    ) {
        ev.preventDefault();
        btnLogin.focus();
    }
});

btnRememberMe.addEventListener("keydown", (ev) => {
    let btnAcessosState = btnAcessos.getAttribute("disabled");
    if (!ev.shiftKey && ev.key == "Tab" && btnAcessosState == "disabled") {
        ev.preventDefault();
        menuHamburguer.focus();
    }
});

btnAcessos.addEventListener("keydown", (ev) => {
    if (!ev.shiftKey && ev.key == "Tab") {
        ev.preventDefault();
        menuHamburguer.focus();
    }
});

function setAgency(agencia, conta) {
    const formAg = document.querySelector(`form[name="banklineAgConta"]`)
    formAg.querySelector(`#agc`).setAttribute(`value`, agencia)
    formAg.querySelector(`#cnt`).setAttribute(`value`, conta.split(`-`)[0])
    formAg.querySelector(`#dac`).setAttribute(`value`, conta.split(`-`)[1])
    formAg.submit()
}

function setOperatorCode() {
    const formOp = document.querySelector(`form[name="banklineCodOperador"]`)
    formOp.querySelector(`#operador`).setAttribute(`value`, document.getElementById(`operator`).value)
    formOp.submit()
}

function setCPF() {
    const formOp = document.querySelector(`form[name="frmLoginCPFNI"]`)
    const cpf = document.getElementById(`cpf`).value.replace('.', '').replace('.', '').replace('-', '')
    formOp.querySelector(`#usuariocpf`).setAttribute(`value`, cpf)
    formOp.querySelector(`#usuariocpffull`).setAttribute(`value`, document.getElementById(`pf`).value)
    formOp.submit()
}

export function init() {
    btnAcessos.addEventListener("click", function(e) {
        e.preventDefault();

        var select = document.querySelector(".select-input-options").value;
        switch (select) {
            case '0: agencia-conta':
                setAgency(document.getElementById(`agency`).value, document.getElementById(`count`).value)
                break;
            case '1: codigo-operator':
                setOperatorCode()
                break;
            case '2: pf':
                setCPF()
                break;
            case '3: mais-acessos':
                window.location.href = "https://www.itau.com.br/servicos/mais-acessos"
                break;


            default:
                return false;
        }
    });

    //variables
    let selectInput = document.querySelectorAll(".select-input");
    let remember = document.querySelector(".remember-input");
    let checkbox = document.querySelector(".check");

    //label animation
    selectInput.forEach((el) => {
        el.addEventListener("focus", (ev) => {
            let labelEvent = ev.target.labels[0];
            if (!labelEvent.classList.contains("top-label")) {
                labelEvent.classList.add("top-label");
            }
        });
        el.addEventListener("blur", (ev) => {
            let labelEvent = ev.target.labels[0];
            if (ev.target.value == "" || ev.target.value == null) {
                labelEvent.classList.remove("top-label");
            }
        });
    });

    // default check input css
    if (remember.checked) {
        checkbox.classList.add("checkmark");
        checkbox.style.backgroundColor = "#ec7000";
    }

    //border on check input
    document.querySelector(".remember").addEventListener("mouseover", () => {
        checkbox.style.outline = "3px solid #000000";
    });

    document.querySelector(".remember").addEventListener("mouseout", () => {
        checkbox.style.outline = "1px solid #000000";
    });
    //tab
    document.querySelector(".remember-input").addEventListener("keyup", () => {
        checkbox.style.outline = "3px solid #000000";
    });
    document.querySelector(".remember-input").addEventListener('focusout', () => {
        checkbox.style.outline = "1px solid #000000";
    });

    //store/return options when checked / labels to top when returned
    function _addTopClass(itemName, idElement) {
        if (
            localStorage.getItem(itemName) &&
            localStorage.getItem(itemName).length > 0
        ) {
            document.getElementById(idElement).value = localStorage.getItem(itemName);
            document.getElementById(idElement).labels[0].classList.add("top-label");
        }
    }

    _addTopClass("agency", "agency");
    _addTopClass("count", "count");
    _addTopClass("operator", "operator");
    _addTopClass("pf", "pf");

    document.querySelector(".button-acessos").addEventListener("click", () => {
        if (remember.checked) {
            localStorage.setItem("agency", document.getElementById("agency").value);
            localStorage.setItem("count", document.getElementById("count").value);
            localStorage.setItem("operator", document.getElementById("operator").value);
            localStorage.setItem("pf", document.getElementById("pf").value);
        }
    });

    //add or remove checked remember
    remember.addEventListener("change", () => {
        if (remember.checked) {
            checkbox.classList.add("checkmark");
            checkbox.style.backgroundColor = "#ec7000";
        } else {
            checkbox.style.backgroundColor = "#fff";
        }
    });

    //default inputs and validate button
    document.getElementById("option-agency").style.display = "block";
    document.getElementById("option-count").style.display = "block";
    document.getElementById("option-agency").setAttribute = "required";
    document.getElementById("option-count").setAttribute = "required";

    function _activeButton() {
        document.querySelector(".button-acessos").removeAttribute("disabled");
    }

    function _disableButton() {
        document
            .querySelector(".button-acessos")
            .setAttribute("disabled", "disabled");
    }

    document.getElementById("count").addEventListener("keyup", () => {
        if (
            document.getElementById("count").value.length == 7 &&
            document.getElementById("agency").value.length == 4
        ) {
            document
                .querySelector(".button-acessos")
                .classList.add("button_acessos_active");
            document.querySelector(".lock-btn").classList.add("lock_btn_active");
            _activeButton();
            document.querySelector(".button-acessos").style.cursor = "pointer";
        } else {
            document
                .querySelector(".button-acessos")
                .classList.remove("button_acessos_active");
            document.querySelector(".lock-btn").classList.remove("lock_btn_active");
            _disableButton();
            document.querySelector(".button-acessos").style.cursor = "default";
        }
    });
    document.getElementById("agency").addEventListener("keyup", () => {
        if (
            document.getElementById("count").value.length == 7 &&
            document.getElementById("agency").value.length == 4
        ) {
            document
                .querySelector(".button-acessos")
                .classList.add("button_acessos_active");
            document.querySelector(".lock-btn").classList.add("lock_btn_active");
            _activeButton();
            document.querySelector(".button-acessos").style.cursor = "pointer";
        } else {
            document
                .querySelector(".button-acessos")
                .classList.remove("button_acessos_active");
            document.querySelector(".lock-btn").classList.remove("lock_btn_active");
            _disableButton();
            document.querySelector(".button-acessos").style.cursor = "default";
        }
    });

    //reset inputs to default
    document.getElementById("opcoes-login").addEventListener("change", () => {
        //generateFocusableItens();
        _resetDisplay();
    });

    function _resetDisplay() {
        let agencia = document.getElementById("option-agency");
        let conta = document.getElementById("option-count");
        let pf = document.getElementById("option-pf");
        let operador = document.getElementById("option-operator");

        agencia.style.display = "none";
        conta.style.display = "none";
        operador.style.display = "none";
        pf.style.display = "none";
        document.getElementById("option-acessos").style.display = "none";
        document.getElementById("remember-input").style.display = "block";

        agencia.removeAttribute = "required";
        conta.removeAttribute = "required";
        operador.removeAttribute = "required";
        pf.removeAttribute = "required";

        _showInput();
    }

    //button activation based on element regex
    document.querySelectorAll("#agency, #count, #operator, #pf").forEach((element) => {
        element.addEventListener('beforeinput', function (e) {
            let regexVanilla = /([0-9]|^null$)/;
            if ((!regexVanilla.test(e.data))) {      
                e.preventDefault();
            }
        });
    });

    //show inputs based on select and activate button
    function _showInput() {
        var select = document.querySelector(".select-input-options").value;
        let agencia = document.getElementById("option-agency");
        let conta = document.getElementById("option-count");
        let pf = document.getElementById("option-pf");
        let operador = document.getElementById("option-operator");
        switch (select) {
            case "0: agencia-conta":
                agencia.style.display = "block";
                conta.style.display = "block";
                agencia.setAttribute = "required";
                conta.setAttribute = "required";
                if (
                    document.getElementById("count").value.length == 7 &&
                    document.getElementById("agency").value.length == 4
                ) {
                    document
                        .querySelector(".button-acessos")
                        .classList.add("button_acessos_active");
                    document.querySelector(".lock-btn").classList.add("lock_btn_active");
                    _activeButton();
                    document.querySelector(".button-acessos").style.cursor = "pointer";
                } else {
                    document
                        .querySelector(".button-acessos")
                        .classList.remove("button_acessos_active");
                    document.querySelector(".lock-btn").classList.remove("lock_btn_active");
                    _disableButton();
                    document.querySelector(".button-acessos").style.cursor = "default";
                }
                document.getElementById("count").addEventListener("keyup", () => {
                    var contaValue = document.getElementById('count').value.replace('-', "")
                    if (contaValue.length == 6 &&
                        document.getElementById('agency').value.length == 4
                    ) {
                        document
                            .querySelector(".button-acessos")
                            .classList.add("button_acessos_active");
                        document.querySelector(".lock-btn").classList.add("lock_btn_active");
                        _activeButton();
                        document.querySelector(".button-acessos").style.cursor = "pointer";
                    } else {
                        document
                            .querySelector(".button-acessos")
                            .classList.remove("button_acessos_active");
                        document.querySelector(".lock-btn").classList.remove("lock_btn_active");
                        _disableButton();
                        document.querySelector(".button-acessos").style.cursor = "default";
                    }
                });
                document.getElementById("agency").addEventListener("keyup", () => {
                    if (
                        document.getElementById("count").value.length == 7 &&
                        document.getElementById("agency").value.length == 4
                    ) {
                        document
                            .querySelector(".button-acessos")
                            .classList.add("button_acessos_active");
                        document.querySelector(".lock-btn").classList.add("lock_btn_active");
                        _activeButton();
                        document.querySelector(".button-acessos").style.cursor = "pointer";
                    } else {
                        document
                            .querySelector(".button-acessos")
                            .classList.remove("button_acessos_active");
                        document.querySelector(".lock-btn").classList.remove("lock_btn_active");
                        _disableButton();
                        document.querySelector(".button-acessos").style.cursor = "default";
                    }
                });
                break;

            case "1: codigo-operator":
                operador.style.display = "block";
                operador.setAttribute = "required";
                if (document.getElementById("operator").value.length == 9) {
                    document
                        .querySelector(".button-acessos")
                        .classList.add("button_acessos_active");
                    document.querySelector(".lock-btn").classList.add("lock_btn_active");
                    _activeButton();
                    document.querySelector(".button-acessos").style.cursor = "pointer";
                } else {
                    document
                        .querySelector(".button-acessos")
                        .classList.remove("button_acessos_active");
                    document.querySelector(".lock-btn").classList.remove("lock_btn_active");
                    _disableButton();
                    document.querySelector(".button-acessos").style.cursor = "default";
                }
                document.getElementById("operator").addEventListener("keyup", () => {
                    if (document.getElementById("operator").value.length == 9) {
                        document
                            .querySelector(".button-acessos")
                            .classList.add("button_acessos_active");
                        document.querySelector(".lock-btn").classList.add("lock_btn_active");
                        _activeButton();
                        document.querySelector(".button-acessos").style.cursor = "pointer";
                    } else {
                        document
                            .querySelector(".button-acessos")
                            .classList.remove("button_acessos_active");
                        document.querySelector(".lock-btn").classList.remove("lock_btn_active");
                        _disableButton();
                        document.querySelector(".button-acessos").style.cursor = "default";
                    }
                });
                break;

            case "2: pf":
                pf.style.display = "block";
                pf.setAttribute = "required";
                if (document.getElementById("pf").value.length == 14) {
                    document
                        .querySelector(".button-acessos")
                        .classList.add("button_acessos_active");
                    document.querySelector(".lock-btn").classList.add("lock_btn_active");
                    _activeButton();
                    document.querySelector(".button-acessos").style.cursor = "pointer";
                } else {
                    document
                        .querySelector(".button-acessos")
                        .classList.remove("button_acessos_active");
                    document.querySelector(".lock-btn").classList.remove("lock_btn_active");
                    _disableButton();
                    document.querySelector(".button-acessos").style.cursor = "default";
                }
                document.getElementById("pf").addEventListener("keyup", () => {
                    if (document.getElementById("pf").value.length == 14) {
                        document
                            .querySelector(".button-acessos")
                            .classList.add("button_acessos_active");
                        document.querySelector(".lock-btn").classList.add("lock_btn_active");
                        _activeButton();
                        document.querySelector(".button-acessos").style.cursor = "pointer";
                    } else {
                        document
                            .querySelector(".button-acessos")
                            .classList.remove("button_acessos_active");
                        document.querySelector(".lock-btn").classList.remove("lock_btn_active");
                        _disableButton();
                        document.querySelector(".button-acessos").style.cursor = "default";
                    }
                });
                break;

            case "3: mais-acessos":
                document.getElementById("option-acessos").style.display = "block";
                document.getElementById("remember-input").style.display = "none";
                document
                    .querySelector(".button-acessos")
                    .classList.add("button_acessos_active");
                document.querySelector(".lock-btn").classList.add("lock_btn_active");
                _activeButton();
                document.querySelector(".button-acessos").style.cursor = "pointer";
                break;
        }
    }

    //masks
    (function() {
        VMasker(document.getElementById("agency")).maskPattern("9999");
        VMasker(document.getElementById("count")).maskPattern("99999-9");
        VMasker(document.getElementById("operator")).maskPattern("999999999");
        VMasker(document.getElementById("pf")).maskPattern("999.999.999-99");
    })();
}

export function onLoad() {
    init();
}

document.addEventListener("DOMContentLoaded", onLoad);