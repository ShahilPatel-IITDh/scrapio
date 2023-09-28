
    jQuery(document).ready(function($) {

        function lds_init_custom_icons() {

            console.log('running custom icons!');

            
        }

        lds_init_custom_icons();

        $('body').on( 'ld_has_paginated', function() {
            lds_init_custom_icons();
        });

    });
