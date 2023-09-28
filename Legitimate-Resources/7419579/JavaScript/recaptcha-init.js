function grecaptchaLoaded() {
    grecaptcha.ready(function() {
        grecaptcha.execute('6LdI1rAUAAAAACI0GsFv-yRpC0tPF5ECiIMDUz2x', {action: 'pageView'});
    });
}

function recaptchaInit() {
    function createTokenInput( parentForm, name, token ) {
        var input = document.createElement( 'input' );

        input.setAttribute( 'type', 'hidden' );
        input.setAttribute( 'value', token );
        input.setAttribute( 'name', name );

        parentForm.appendChild( input );
    }

    grecaptcha.ready(function() {
        grecaptcha.execute('6LdI1rAUAAAAACI0GsFv-yRpC0tPF5ECiIMDUz2x', {action: 'formSubmit'}).then(function(token) {
            var recaptcha = document.querySelectorAll( '.g-recaptcha' );

            recaptcha.forEach(function( obj ) {
                var parentForm = obj.form,
                    response   = parentForm.querySelector( '[name="g-recaptcha-response"]' ),
                    vthree     = parentForm.querySelector( '[name="vthree"]' );

                !response && createTokenInput( parentForm, 'g-recaptcha-response', token );
                !vthree   && createTokenInput( parentForm, 'vthree', token );
            });
        });
    });
}