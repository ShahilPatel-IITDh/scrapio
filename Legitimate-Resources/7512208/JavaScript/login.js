let modal = document.querySelector(".modal_back");

//open/close modal
function openModal() {
    modal.removeAttribute("aria-hidden")
    modal.style.display = "block"
    generateFocusableItens();
    $('#close_modal').focus();

    const event = new Event(`change`)
    document.getElementById("opcoes_login").dispatchEvent(event)
}

function closeModal() {
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    $('#open_modal').focus();
}
document.getElementById("open_modal").addEventListener('click', openModal);
document.getElementById("close_modal").addEventListener('click', closeModal);

var allFocusableModalItens = [];
var focusableLangModalItems = [];

function generateFocusableItens() {
    focusableLangModalItems = [];
    allFocusableModalItens = document.querySelectorAll('.modal_back .modal button.button_acessos_active, .modal_back .modal button#close_modal, .modal_back .modal select, .modal_back .modal option, .modal_back .modal input');

    allFocusableModalItens.forEach(function(item, index) {
        if ($(item).is(':visible')) {
            focusableLangModalItems.push(item);
        }
    })

    focusableLangModalItems.forEach(function(item, index) {
        if (index === 0) {
            item.onkeydown = function(event) {
                if (event.shiftKey && event.keyCode == 9) {
                    event.preventDefault();
                    focusLastLangModalItem();
                }
            };
        } else if (index === focusableLangModalItems.length - 1) {
            item.onkeydown = function(event) {
                if (event.shiftKey === false && event.keyCode == 9) {
                    event.preventDefault();
                    focusFirstLangModalItem();
                }
            };
        } else {
            item.onkeydown = null;
        }
    });
}

function focusFirstLangModalItem() {
    $(focusableLangModalItems[0]).trigger('focus');
}

function focusLastLangModalItem() {
    $(focusableLangModalItems[focusableLangModalItems.length - 1]).trigger('focus');
}

export function init() {
    //variables
    let selectInput = document.querySelectorAll('.select_input');
    let remember = document.querySelector('.remember_input');
    let checkbox = document.querySelector(".checkbox");
    let conta = document.getElementById('conta');
    let agencia = document.getElementById('agencia');
    let codigoOperador = document.getElementById('codigoOperador');
    let lock = document.querySelector('.login_button_lock');
    let arrow = document.querySelector('.login_button');

    document.getElementById("btn_acessos").addEventListener("click", function(e) {
        e.preventDefault();

        var select = document.querySelector(".select_input_options").value;
        switch (select) {
            case '0: agencia_conta':
                setAgency(document.getElementById(`ag`).value, document.getElementById(`cc`).value)
                break;
            case '1: codigo_operador':
                setOperatorCode(document.getElementById(`op`).value)
                break;
            case '2: cpf':
                setCPF()
                break;
            case '3: mais_acessos':
                window.location.href = "https://www.itau.com.br/servicos/mais-acessos"
                break;


            default:
                return false;
        }

    });
    //show button seta 

    if(conta) {
        conta.addEventListener("keyup", () => {
            var contaValue = conta.value.replace('-', "")
            if (contaValue.length == 6 && agencia.value.length == 4) {
                lock.style.display = 'none';
                arrow.style.display = 'block';
                arrow.removeAttribute('disabled');
            } else {
                lock.style.display = 'block';
                arrow.style.display = 'none';
                arrow.setAttribute('disabled', 'disabled');
            }
        });
    }
    
    if(agencia) {
        agencia.addEventListener("keyup", (event) => {
            if ((event.keyCode == 9 || event.keyCode == 16)) {
                event.preventDefault();
            } else if (agencia.value.length == 4) {
                conta.focus();
            }
    
            if (conta.value.length == 7 && agencia.value.length == 4) {
                lock.style.display = 'none';
                arrow.style.display = 'block';
                arrow.removeAttribute('disabled');
            } else {
                lock.style.display = 'block';
                arrow.style.display = 'none';
                arrow.setAttribute('disabled', 'disabled');
            }
        });
    }

    if(codigoOperador) {
        codigoOperador.addEventListener("keyup", (event) => {
            if(codigoOperador.value.length == 9) {
                lock.style.display = 'none';
                arrow.style.display = 'block';
                arrow.removeAttribute('disabled');
            } else {
                lock.style.display = 'block';
                arrow.style.display = 'none';
                arrow.setAttribute('disabled', 'disabled');
            }
        });
    }

    arrow.addEventListener("click", function(e) {
        e.preventDefault();
        if(agencia && conta){
            setAgency(document.getElementById(`agencia`).value, document.getElementById(`conta`).value);
        }else if(codigoOperador) {
            setOperatorCode(document.getElementById(`codigoOperador`).value);
        }
    });

    //label animation
    selectInput.forEach(el => {
        el.addEventListener("focus", (ev) => {
            let labelEvent = ev.currentTarget.labels[0];
            if (!labelEvent.classList.contains('top_label')) {
                labelEvent.classList.add('top_label');
            }
        });
        el.addEventListener("blur", (ev) => {
            let labelEvent = ev.currentTarget.labels[0];
            if (ev.currentTarget.value == '' || ev.currentTarget.value == null) {
                labelEvent.classList.remove('top_label');
            }
        })
    });

    // default check input css
    if (remember.checked) {
        checkbox.classList.add("checkmark");
        checkbox.style.backgroundColor = "#ec7000";
    }

    //border on check input
    document.querySelector(".remember_input").addEventListener('mouseover', () => {
        checkbox.style.outline = "2px solid #000000";
    });

    document.querySelector(".remember_input").addEventListener('mouseout', () => {
        checkbox.style.outline = "1px solid #000000";
    });

    //tab
    document.querySelector(".remember_input").addEventListener('focus', () => {
        checkbox.style.outline = "2px solid #000000";
    });
    document.querySelector(".remember_input").addEventListener('focusout', () => {
        checkbox.style.outline = "1px solid #000000";
    });

    // aria-expanded select
    document.querySelector(".select_input_options").addEventListener('keypress', (event) => {
        if (event.key === " ") {
            document.querySelector(".select_input_options").setAttribute('aria-expanded', 'true');
        }
    });

    document.querySelector(".select_input_options").addEventListener('change', () => {
        document.querySelector(".select_input_options").setAttribute('aria-expanded', 'false');
    });

    document.querySelector(".select_input_options").addEventListener('click', () => {
        document.querySelector(".select_input_options").setAttribute('aria-expanded', 'true');
    });

    document.querySelector(".select_input_options").addEventListener('blur', () => {
        document.querySelector(".select_input_options").setAttribute('aria-expanded', 'false');
    })

    //store/return options when checked / labels to top when returned
    function addTopClass(itemName, idElement) {
        if (localStorage.getItem(itemName) && localStorage.getItem(itemName).length > 0) {
            document.getElementById(idElement).value = localStorage.getItem(itemName);
        }
    }

    function addClassTop(itemName, idElement) {
        if (itemName.length > 0) {
            document.getElementById(idElement).labels[0].classList.add('top_label');
        }
    }

    addClassTop("agencia", "ag");
    addClassTop("conta", "cc");
    addClassTop("operador", "op");
    addClassTop("cpf", "cpf");

    addTopClass("agencia", "ag");
    addTopClass("conta", "cc");
    addTopClass("operador", "op");
    addTopClass("cpf", "cpf");

    document.querySelector(".button_acessos").addEventListener("click", () => {
        if (remember.checked == true) {
            localStorage.setItem("agencia", document.getElementById('ag').value);
            localStorage.setItem("conta", document.getElementById('cc').value);
            localStorage.setItem("operador", document.getElementById('op').value);
            localStorage.setItem("cpf", document.getElementById('cpf').value);
        }
        if (remember.checked == false) {
            localStorage.removeItem("agencia");
            localStorage.removeItem("conta");
            localStorage.removeItem("operador");
            localStorage.removeItem("cpf");
        }
    });

    //add or remove checked remember
    remember.addEventListener('change', () => {
        if (remember.checked) {
            checkbox.classList.add("checkmark");
            checkbox.style.backgroundColor = "#ec7000";
        } else {
            checkbox.style.backgroundColor = "#fff";
            remember.setAttribute("checked", "false");
        }
    });

    //default inputs and validate button
    document.getElementById("option_ag").style.display = "block";
    document.getElementById("option_cc").style.display = "block";
    document.getElementById("option_ag").setAttribute = "required";
    document.getElementById("option_cc").setAttribute = "required";
    if (document.getElementById('cc').value.length == 7 && document.getElementById('ag').value.length == 4) {
        document.querySelector('.button_acessos').classList.add('button_acessos_active');
        document.querySelector('.lock_btn').classList.add('lock_btn_active');
        activeButton()
        document.querySelector('.button_acessos').style.cursor = "pointer"
    }

    function activeButton() {
        generateFocusableItens()
        document.querySelector('.button_acessos').setAttribute('aria-disabled', "false");
        document.querySelector('.button_acessos').removeAttribute('disabled');
    }

    function disableButton() {
        document.querySelector('.button_acessos').setAttribute('aria-disabled', "true");
        document.querySelector('.button_acessos').setAttribute('disabled', 'disabled');
    }

    document.getElementById('cc').addEventListener('keyup', () => {
        if (document.getElementById('cc').value.length == 7 && document.getElementById('ag').value.length == 4) {
            document.querySelector('.button_acessos').classList.add('button_acessos_active');
            document.querySelector('.lock_btn').classList.add('lock_btn_active');
            activeButton()
            document.querySelector('.button_acessos').style.cursor = "pointer"


        } else {
            document.querySelector('.button_acessos').classList.remove('button_acessos_active');
            document.querySelector('.lock_btn').classList.remove('lock_btn_active');
            disableButton()
            document.querySelector('.button_acessos').style.cursor = "default"
        }
    });
    document.getElementById('ag').addEventListener('keyup', () => {
        if (document.getElementById('cc').value.length == 7 && document.getElementById('ag').value.length == 4) {
            document.querySelector('.button_acessos').classList.add('button_acessos_active');
            document.querySelector('.lock_btn').classList.add('lock_btn_active');
            activeButton()
            document.querySelector('.button_acessos').style.cursor = "pointer"
        } else {
            document.querySelector('.button_acessos').classList.remove('button_acessos_active');
            document.querySelector('.lock_btn').classList.remove('lock_btn_active');
            disableButton()
            document.querySelector('.button_acessos').style.cursor = "default"
        }
    });

    //reset inputs to default
    document.getElementById("opcoes_login").addEventListener('change', () => {
        generateFocusableItens();
        resetDisplay();
    });

    function resetDisplay() {
        let agencia = document.getElementById("option_ag");
        let conta = document.getElementById("option_cc");
        let cpf = document.getElementById("option_cpf");
        let operador = document.getElementById("option_operador");

        agencia.style.display = "none";
        conta.style.display = "none";
        operador.style.display = "none";
        cpf.style.display = "none";
        document.getElementById("option_acessos").style.display = "none";
        document.getElementById("remember_input").style.display = "block";

        agencia.removeAttribute = "required";
        conta.removeAttribute = "required";
        operador.removeAttribute = "required";
        cpf.removeAttribute = "required";

        showInput();
    };

    function setAgency(agencia, conta) {
        const formAg = document.querySelector(`form[name="banklineAgConta"]`)

        formAg.querySelector(`#agc`).setAttribute(`value`, agencia)
        formAg.querySelector(`#cnt`).setAttribute(`value`, conta.split(`-`)[0])
        formAg.querySelector(`#dac`).setAttribute(`value`, conta.split(`-`)[1])

        formAg.submit()
    }

    function setOperatorCode(codOperador) {
        const formOp = document.querySelector(`form[name="banklineCodOperador"]`)

        formOp.querySelector(`#operador`).setAttribute(`value`, codOperador);
        formOp.submit();
    }

    function setCPF() {
        const formOp = document.querySelector(`form[name="frmLoginCPFNI"]`)
        const cpf = document.getElementById(`cpf`).value.replace('.', '').replace('.', '').replace('-', '')

        formOp.querySelector(`#usuariocpf`).setAttribute(`value`, cpf)
        formOp.querySelector(`#usuariocpffull`).setAttribute(`value`, document.getElementById(`cpf`).value)
        formOp.submit()
    }

    //button activation based on element regex
    document.querySelectorAll("#agencia, #conta, #ag, #cc, #op, #cpf, #codigoOperador").forEach((element) => {
        element.addEventListener('beforeinput', function (e) {
            let regexVanilla = /([0-9]|^null$)/;
            if ((!regexVanilla.test(e.data))) {      
                e.preventDefault();
            }
        });
    });

    //show inputs based on select and activate button
    function showInput() {

        var select = document.querySelector(".select_input_options").value;
        let agencia = document.getElementById("option_ag");
        let conta = document.getElementById("option_cc");
        let cpf = document.getElementById("option_cpf");
        let operador = document.getElementById("option_operador");
        switch (select) {
            case '0: agencia_conta':
                agencia.style.display = "block";
                conta.style.display = "block";
                agencia.setAttribute = "required";
                conta.setAttribute = "required";
                if (document.getElementById('cc').value.length == 7 && document.getElementById('ag').value.length == 4) {
                    document.querySelector('.button_acessos').classList.add('button_acessos_active');
                    document.querySelector('.lock_btn').classList.add('lock_btn_active');
                    activeButton()
                    document.querySelector('.button_acessos').style.cursor = "pointer"
                } else {
                    document.querySelector('.button_acessos').classList.remove('button_acessos_active');
                    document.querySelector('.lock_btn').classList.remove('lock_btn_active');
                    disableButton()
                    document.querySelector('.button_acessos').style.cursor = "default"
                }
                document.getElementById('cc').addEventListener('keyup', () => {
                    var contaValue = document.getElementById('cc').value.replace('-', "")
                    if (contaValue.length == 6 && document.getElementById('ag').value.length == 4) {
                        document.querySelector('.button_acessos').classList.add('button_acessos_active');
                        document.querySelector('.lock_btn').classList.add('lock_btn_active');
                        activeButton()
                        document.querySelector('.button_acessos').style.cursor = "pointer"
                    } else {
                        document.querySelector('.button_acessos').classList.remove('button_acessos_active');
                        document.querySelector('.lock_btn').classList.remove('lock_btn_active');
                        disableButton()
                        document.querySelector('.button_acessos').style.cursor = "default"
                    }
                })
                document.getElementById('ag').addEventListener('keyup', () => {
                    if (document.getElementById('cc').value.length == 7 && document.getElementById('ag').value.length == 4) {
                        document.querySelector('.button_acessos').classList.add('button_acessos_active');
                        document.querySelector('.lock_btn').classList.add('lock_btn_active');
                        activeButton()
                        document.querySelector('.button_acessos').style.cursor = "pointer"
                    } else {
                        document.querySelector('.button_acessos').classList.remove('button_acessos_active');
                        document.querySelector('.lock_btn').classList.remove('lock_btn_active');
                        disableButton()
                        document.querySelector('.button_acessos').style.cursor = "default"
                    }
                })
                break;

            case '1: codigo_operador':
                operador.style.display = "block";
                operador.setAttribute = "required";
                if (document.getElementById('op').value.length == 9) {
                    document.querySelector('.button_acessos').classList.add('button_acessos_active');
                    document.querySelector('.lock_btn').classList.add('lock_btn_active');
                    activeButton()
                    document.querySelector('.button_acessos').style.cursor = "pointer"
                } else {
                    document.querySelector('.button_acessos').classList.remove('button_acessos_active');
                    document.querySelector('.lock_btn').classList.remove('lock_btn_active');
                    disableButton()
                    document.querySelector('.button_acessos').style.cursor = "default"
                }
                document.getElementById('op').addEventListener('keyup', () => {
                    if (document.getElementById('op').value.length == 9) {
                        document.querySelector('.button_acessos').classList.add('button_acessos_active');
                        document.querySelector('.lock_btn').classList.add('lock_btn_active');
                        activeButton()
                        document.querySelector('.button_acessos').style.cursor = "pointer"
                    } else {
                        document.querySelector('.button_acessos').classList.remove('button_acessos_active');
                        document.querySelector('.lock_btn').classList.remove('lock_btn_active');
                        disableButton()
                        document.querySelector('.button_acessos').style.cursor = "default"
                    }
                })
                break;

            case '2: cpf':
                cpf.style.display = "block";
                cpf.setAttribute = "required";
                if (document.getElementById('cpf').value.length == 14) {
                    document.querySelector('.button_acessos').classList.add('button_acessos_active');
                    document.querySelector('.lock_btn').classList.add('lock_btn_active');
                    activeButton()
                    document.querySelector('.button_acessos').style.cursor = "pointer"
                } else {
                    document.querySelector('.button_acessos').classList.remove('button_acessos_active');
                    document.querySelector('.lock_btn').classList.remove('lock_btn_active');
                    disableButton()
                    document.querySelector('.button_acessos').style.cursor = "default"
                }
                document.getElementById('cpf').addEventListener('keyup', () => {
                    if (document.getElementById('cpf').value.length == 14) {
                        document.querySelector('.button_acessos').classList.add('button_acessos_active');
                        document.querySelector('.lock_btn').classList.add('lock_btn_active');
                        activeButton()
                        document.querySelector('.button_acessos').style.cursor = "pointer"
                    } else {
                        document.querySelector('.button_acessos').classList.remove('button_acessos_active');
                        document.querySelector('.lock_btn').classList.remove('lock_btn_active');
                        disableButton()
                        document.querySelector('.button_acessos').style.cursor = "default"
                    }
                })
                break;

            case '3: mais_acessos':
                document.getElementById("option_acessos").style.display = "block";
                document.getElementById("remember_input").style.display = "none";
                document.querySelector('.button_acessos').classList.add('button_acessos_active');
                document.querySelector('.lock_btn').classList.add('lock_btn_active');
                activeButton()
                document.querySelector('.button_acessos').style.cursor = "pointer"
                break;
        }
    };

    //masks
    (function() {
        // #maskPattern
        if (agencia && conta) {
            VMasker(agencia).maskPattern("9999");
            VMasker(conta).maskPattern("99999-9");
            VMasker(document.getElementById("ag")).maskPattern("9999");
            VMasker(document.getElementById("cc")).maskPattern("99999-9");
            VMasker(document.getElementById("op")).maskPattern("999999999"); 
            VMasker(document.getElementById("cpf")).maskPattern("999.999.999-99");
            }
        if (codigoOperador) {
            VMasker(codigoOperador).maskPattern("999999999");
            VMasker(document.getElementById("ag")).maskPattern("9999");
            VMasker(document.getElementById("cc")).maskPattern("99999-9");
            VMasker(document.getElementById("op")).maskPattern("999999999"); 
            VMasker(document.getElementById("cpf")).maskPattern("999.999.999-99");
        }
    })();
}

export function onLoad() {
    init();
}

document.addEventListener("DOMContentLoaded", onLoad);