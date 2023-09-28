function ready(callbackFunc){if(document.readyState!=='loading'){callbackFunc();}else if(document.addEventListener){document.addEventListener('DOMContentLoaded',callbackFunc);}else{document.attachEvent('onreadystatechange',function(){if(document.readyState==='complete'){callbackFunc();}});}}
function debit_update(){var debitIndicador=document.getElementById('debit_indicadores')
debitIndicador.src='https://debit.com.br/indicadores/indicadores.png?'+new Date().getTime();setTimeout(debit_update,600000);}
ready(function(){debit_update();});