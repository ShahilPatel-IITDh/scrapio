(function($) {
    'use strict';

    $(function () {
        /**
         * Umschalten zwischen Tabs
         */
        $('.partner-filter li').on('click', function (event) {
            let partner_wrapper = $(this).parents('.ebas-partners');
            let selected_filter = $(this).attr('data-partner-filter');
            let url_params = new URLSearchParams(window.location.search);

            // Kennzeichnung von aktiven Elementen (Filter, Partner-Liste, ...) entfernen
            partner_wrapper.find('.active').removeClass('active');

            // Kennzeichnung für aktives Element zu neuem Filter und neuer Partner-Gruppe hinzufügen
            $(this).addClass('active');
            partner_wrapper.find('li[data-partner-group="' + selected_filter + '"]').addClass('active');

            // Filter-Wert URL-konform encodieren
            let selected_filter_encoded = encodeURIComponent(selected_filter);

            // URL Query String anpassen
            url_params.set('partner-filter', selected_filter_encoded);
            window.history.replaceState({}, "", decodeURIComponent(window.location.pathname + '?' + url_params));
        });
    });
})(jQuery);


