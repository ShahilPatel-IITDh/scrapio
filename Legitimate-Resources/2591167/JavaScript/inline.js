
let DecTiempoCarga = 0;
let arrayDataTiempoCarga = 0;
document.addEventListener("DOMContentLoaded", function () {
    // obtenemos los valores de tiempo de carga y sumamos
    function logDeltaWebVitals({ name, id, delta, entries }) {
        DecTiempoCarga = DecTiempoCarga + delta;
        arrayDataTiempoCarga = entries;

    }
    webVitals.getLCP(logDeltaWebVitals, true);
});

window.addEventListener("load", function () {
    //push a NEO de tiempo de carga
    console.warn('Tiempo carga-milesegundos: ', DecTiempoCarga);
    console.warn('Tiempo carga-Data: ', arrayDataTiempoCarga);
    dataLayer.push({
        'event': 'sendTimeToGA',
        'lcp': DecTiempoCarga
    });
});
