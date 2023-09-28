
            window.addEventListener(
                'load',
                function() {
                    var form = document.getElementById( 'snow-monkey-form-2054' ); 
                    if (form) {
                        form.addEventListener(
                            'smf.submit',
                            function(event) {
                                if ('complete' === event.detail.status) {
                                    window.location.href = 'http://test.gooodcrew.com/www.aocinc.co.jp/contact/thanks/';
                                }
                            }
                        );
                    }
                }
            );
        
