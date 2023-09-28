
        $(function () {
            if(navigator.userAgent.match(/Grand Prime.*rv\:11\./) ) {
                $('<div/>')
                    .addClass('class="alert alert-warning')
                    .text('Intenta con Edge, Internet Explorer 11, Firefox, Safari, Chrome. Este sitio no funciona correctamente en este navegador.')
                    .appendTo('#errorLog');
            }
        });
    