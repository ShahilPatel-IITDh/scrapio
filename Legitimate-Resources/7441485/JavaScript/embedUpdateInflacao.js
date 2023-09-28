function ready(callbackFunc) {
    if (document.readyState !== 'loading') {
        // Document is already ready, call the callback directly
        callbackFunc();
    } else if (document.addEventListener) {
        // All modern browsers to register DOMContentLoaded
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        // Old IE browsers
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
}

function debit_update_inflacao(){
    var debitIndicadorInflacao = document.getElementById('debit_indicadores_inflacao')
    debitIndicadorInflacao.src = 'https://debit.com.br/indicadores/indicadores_inflacao.png?' + new Date().getTime();
    setTimeout(debit_update_inflacao, 600000);
}

ready(function() {
    debit_update_inflacao();
});

