/**
 * Validação da política de cookies
 */
var urlAtual = "";

function onloadExecute() {
    cookies();
    urlAtual = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
}

function cookies() {
    // // Verifica se o cookie já existe, se não existe adiciona a barra
    if (document.cookie.indexOf('privacidade') < 0) {
        $('#divTermos').css('display', 'block').slideDown(400);
    }
}

// Fecha a barra de consentimento.
function fechar() {
    $('.pp').css('display', 'none');
}

// Aceita o cookie e o escreve na lista
function aceitar() {
    setCookie();
}

// Grava o cookie e fecha a barra
function setCookie() {
    document.cookie = "privacidade=valueOfCookie; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    location.assign(urlAtual);
    fechar();
}

function saibaMais() {
	window.location.href = "../espe/paginas/view_terms.php";
}

