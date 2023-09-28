(function($) {
    'use strict';

    $(function() {
        /**
         * Allgemein: rel="noopener" zu Links mit target="_blank" hinzufügen, wenn Wert noch nicht vorhanden ist
         */
        $('*:not(#partner):not(#breadcrumb-navigation) > .container a[target="_blank"]').each(function () {
            let anchor = $(this);
            let anchor_rel = anchor.attr('rel');

            if(typeof anchor_rel !== 'undefined') {
                if(anchor_rel.indexOf('noopener') === -1) {
                    anchor.attr('rel', anchor_rel + ' noopener');
                }
            } else {
                anchor.attr('rel', 'noopener');
            }
        });


        /**
         * Template: Bei Klick auf Lupe in Suchfeld in Footer, Suchfeld übermitteln
         */
        $('#search-footer .facetwp-icon').on('click', function () {
            $('#search-footer').submit();
        });


        /**
         * Template: Suchformular in Footer nur absenden, wenn dieses Wert enthält
         */
        $('#search-footer').on('submit', function (event) {
            if($('#search-footer .facetwp-search').val().length < 1) {
                event.preventDefault();
            }
        });


        /**
         * Template: Dafür sorgen, dass Menü auch auf Mobile klickbar ist
         */
        $('.menu-item-mega-parent .menu-item a').on('click', function (event) {
            event.stopPropagation();
        });


        /**
         * Template: Partner-Liste auf Mobile ausfahrbar machen
         */
        /*$('.partner-title h3').on('click', function () {
            if($(window).width() < 767) {
                $(this).closest('.flex_column').find('.partner-footer').slideToggle();
                $(this).closest('.partner-title').toggleClass('expanded');
            }
        });*/


        /**
         * Template: Funktionalität von ausfahrbaren Inhalten definieren
         */
        $('.ebas-collapse > *:first-child').on('click', function () {
            // Klasse zur Kennezeichnung von geöffnetem Collapse-Element zu Container hinzufügen/entfernen
            $(this).closest('.ebas-collapse').toggleClass('ebas-collapse-expanded');

            // Prüfen, ob sich Inhalt nach Toggler bereis in Div mit der Klasse "ebas-collapse-content" befindet,
            // andernfalls Content mit entsprechendem Div umschliessen
            if(!$(this).siblings('.ebas-collapse-content').length) {
                $(this).siblings().wrapAll('<div class="ebas-collapse-content"></div>');
            }

            // Div mit der Klasse "ebas-collapse-content" (eigentlicher Inhalt) aus-/einfahren
            $(this).siblings('.ebas-collapse-content').slideToggle();
        });

        // Bei Klick auf Links in Avia Textblock deren href mit # beginnen, expandEbasCollapse() anwenden,
        // damit allenfalls zugeklappter Bereich von Link-Ziel ausgefahren wird.
        $('.avia_textblock a[href^=\'#\']').on('click', function () {
            let anchor = $(this).attr('href');
            $(anchor).expandEbasCollapse();
        });


        /**
         * Template: Lightbox auch auf Links mit SVG-Datei als Ziel anwenden
         */
        let avia_activate_lightbox_orig = $.fn.avia_activate_lightbox;
        $.fn.avia_activate_lightbox = function() {
            avia_activate_lightbox_orig.apply(this, [{
                autolinkElements:   'a.lightbox, a[rel^="prettyPhoto"], a[rel^="lightbox"], a[href$=jpg], a[href$=png], a[href$=gif], a[href$=jpeg], a[href$=svg], a[href*=".jpg?"], a[href*=".png?"], a[href*=".gif?"], a[href*=".jpeg?"], a[href*=".svg?"], a[href$=".mov"] , a[href$=".swf"] , a:regex(href, .vimeo\.com/[0-9]) , a[href*="youtube.com/watch"] , a[href*="screenr.com"], a[href*="iframe=true"]',
            }]);
        };



        /**
         * Gravity Forms: Customizations beim Rendern der Formulare
         */
        $(document).on('gform_post_render', function(event, form_id, current_page){
            /**
             * Klasse zu Select hinzufügen, wenn Wert ausgewählt wurde. Erforderlich für Styling von "Platzhaltern".
             */
            $('.gfield_select').on('change.ebas', function () {
                let selected_val = $(this).find(':selected').val();

                if(selected_val) {
                    $(this).addClass('ebas-selected');
                } else {
                    $(this).removeClass('ebas-selected');
                }
            });
            $('.gfield_select').trigger('change.ebas');


            /**
             * Lupe für Bilder mit Klasse magnify aktivieren
             */
            // Prüfen, ob Magnify-Instanzen von vorherigen Seiten (AJAX) existieren und diese löschen
            if (typeof window.magnifiers !== 'undefined') {
                window.magnifiers.forEach(function (item) {
                    item.destroy();
                });
            }
            window.magnifiers = [];

            // Magnify nur für Elemente der aktuellen Seite aktivieren
            // Auf Bestätigungs-Seite ist Wert current_page = undefined
            if (typeof current_page !== 'undefined') {
                $('.gform_page:nth-child(' + current_page +') .magnifier').each(function () {
                    let magnifier = $(this).magnify({
                        src: $(this).attr('src'),
                        touchBottomOffset: 90,
                    });

                    // Magnify-Instanz in globalem Array speichern, damit diese auf folgender Seite gelöscht werden kann.
                    window.magnifiers.push(magnifier);
                });
            }


            /**
             * Bei Fehlern zum Formular-Anfang scrollen
             */
            if($('#gform_' + form_id + ' .validation_error').length > 0) {
                $('#gform_wrapper_' + form_id).scrollToElement();
            }
        });


        /**
         * Gravity Forms: Customizations beim Anzeigen der Bestätigungsnachricht
         */
        $(document).on('gform_confirmation_loaded', function(event, form_id){
            $('#gform_confirmation_wrapper_' + form_id).scrollToElement();
        });


        /**
         * Gravity Forms: Customizations beim Seitenwechsel in mehrseitigen Formularen
         */
        $(document).on('gform_page_loaded', function(event, form_id, current_page){
            // Zum Formular-Anfang scrollen, sobald neue Seite geladen wurde und diese keine Validierungs-Fehler enthält.
            // Im Fall von Validierungs-Fehlern wird Scrollverhalten über gform_post_render gesteuert.
            if($('#gform_' + form_id + ' .validation_error').length <= 0) {
                $('#gform_wrapper_' + form_id).scrollToElement();
            }
        });



        /**
         * FacetWP: Customizations
         */
        if(typeof FWP !== 'undefined') {
            // Checkboxen beim Aktualisieren halb-transparent anzeigen
            FWP.loading_handler = function(params) {
                params.element.find('.facetwp-checkbox').css('opacity', 0.5);
            };

            // Isotope für FacetWP Grid initialisieren
            let facetWP_grid = $('.facetwp-template').isotope({
                masonry: {
                    columnWidth: '.facetwp-template li:not(.ebas-featured), .facetwp-template li.ebas-featured:only-child',
                    horizontalOrder: true
                }
            });

            // Wenn initiale oder neue Elemente geladen wurden...
            $(document).on('facetwp-loaded', function(event) {
                // Isotope aktualsieren
                facetWP_grid.isotope('reloadItems').isotope();

                if($('.facetwp-template').length) {
                    let facetwp_search = $('.facetwp-search');

                    // Vorhandene Event-Handler deaktivieren, damit gleiche Handler nicht mehrfach feuern
                    facetwp_search.off('keypress');
                    facetwp_search.off('input');

                    // Bei initialem Aufruf von Seiten mit Suchergebnissen: Fokus auf Suchfeld legen
                    // Bei initialem Aufruf von Start-/Testseite ist FWP.loaded = false und FWP.load_more_paged = 1
                    // Bei Auswahl von Filter oder Eingabe von Suchbegriff ist FWP.loaded = true und FWP.load_more_paged = 1
                    // Beim Laden von weiteren Elementen wird FWP.load_more_paged erhöht
                    // nicht bei IE anwenden, da Platzhaltertext bei Fokus ausgeblendet wird
                    // nicht auf Mobilgeräten anwenden, da z.B. auf iOS trotz Unterdrückung zu Suchfeld gesprungen wird
                    if(!FWP.loaded  && !$('html.avia-msie').length && !$('.avia_mobile').length ) {
                        let scroll_x = window.pageXOffset || document.documentElement.scrollLeft,
                            scroll_y = window.pageYOffset || document.documentElement.scrollTop;
                        let facetwp_search_elem = facetwp_search[0];
                        let input_length = facetwp_search_elem.value.length;

                        facetwp_search_elem.focus();
                        facetwp_search_elem.setSelectionRange(input_length, input_length);
                        window.scrollTo(scroll_x, scroll_y);
                    }

                    // Auf mobilen Geräten Fokus von Suchfeld nehmen, wenn Enter gedrückt wird, damit Tastatur ausgeblendet und Suchergebnisse sichtbar werden
                    facetwp_search.on('keypress', function(event) {
                        let key = event.which || event.keyCode;

                        if (key === 13 && $('.avia_mobile').length) {
                            facetwp_search.blur();
                        }
                    });

                    // Auf Startseite zu Suche scrollen, sobald Benutzer anfängt zu tippen, damit Suchergebnisse sichtbar werden (nicht auf mobile)
                    if($('#top.home').length && !$('.avia_mobile').length) {
                        facetwp_search.on('input', _.debounce(function () {
                            if($(this).val() !== '') { // Workaround, da IE11 input Event feuert, wenn auch nur Platzhalter-Text präsent ist.
                                let header_height = $('#header').height();
                                let spacing = 20;
                                let scrollTop_window = $(window).scrollTop();
                                let scrollTop_search = $('.facetwp-facet-search').offset().top - header_height - spacing;

                                // Nur Scrollen, wenn sich Suche nicht schon an Zielposition +/- 5px befindet.
                                // Toleranz erforderlich aufgrund von Rundungsfehlern.
                                if(scrollTop_window < scrollTop_search - 5 || scrollTop_window > scrollTop_search + 5) {
                                    $('html, body').animate({
                                        scrollTop: scrollTop_search
                                    }, 750);
                                }
                            }
                        }, 2000, true));
                    }

                    // Wenn Benutzer Wert des Suchfelds anpasst, Auswahl von Kategorien zurücksetzen
                    facetwp_search.on('input', function () {
                        $(this).closest('.facetwp-facet-search').siblings('.facetwp-facet-categories').find('.checked').removeClass('checked');
                    });
                }

                // Vorherige Kategorie abwählen, wenn neue Kategorie ausgewählt wurde
                $('.facetwp-checkbox').on('click', function () {
                    // Klasse "checked" nur entfernen, wenn nicht auf bereits ausgewähltes Element geklickt wurde,
                    // da sich Kategorien andernfalls nicht mehr abwählen lassen.
                    if(!$(this).hasClass('checked')) {
                        $(this).closest('.facetwp-facet-categories').find('.checked').removeClass('checked');
                        // FWP.autoload();
                    }
                });
            });

            // Funktionalität von Kategorien-Toggle
            $('.toggle-facetwp-categories').on('click', function (event) {
                event.preventDefault();
                $(this).siblings('.facetwp-facet-categories').slideToggle();
            });

            // Hide loading animation
            //FWP.loading_handler = function() { }
        }

        

        /**
         * WPML: Cookie bei Klick auf Sprachwechsler updaten
         */
        $('.wpml-ls li a').on('click', function () {
            let lang = $(this).find('.wpml-ls-native').attr('lang');
            document.cookie = 'lang=' + lang + '; path=/; max-age=' + 10 * 365 * 24 * 60 * 60;
        });
    });



    $(window).load(function () {
        /**
         * Template: Header beim Scrollen ausblenden
         */
        let scroll_previous = $(window).scrollTop();

        $(window).on('scroll.bh-custom', function () {
            let header = $('#header');
            let scroll_current = $(window).scrollTop();
            let scroll_delta = Math.abs(scroll_current - scroll_previous);
            let scroll_min_delta = 10;

            // Wenn gar nicht gescrollt wurde (Neuer Abruf der Seite) oder mehr als min_delta gescrollt wurde,
            // Klasse mit Scroll-Richtung zu Header hinzufügen.
            if(scroll_delta === 0 || scroll_delta > scroll_min_delta) {
                if(scroll_current > scroll_previous && scroll_current > 0) {
                    header.removeClass('ebas-scroll-up');
                    header.addClass('ebas-scroll-down');
                } else {
                    header.removeClass('ebas-scroll-down');
                    header.addClass('ebas-scroll-up');
                }

                // Aktuelle Scroll-Position in scroll_previous speichern
                scroll_previous = scroll_current;
            }
        });

        $(window).trigger('scroll.bh-custom');



        /**
         * Template: Menu mit Klick öffnen
         */
        jQuery('li.menu-item-mega-parent').off('hover');
        jQuery('li.menu-item-mega-parent').on('click', function () {
            let is_scrollable = scrollLock.getScrollState();
            let mega_menu = jQuery(this).find('.avia_mega_div')

            // Navigation anzeigen oder ausblenden
            jQuery(this).toggleClass('ebas-mega-menu-visible');
            mega_menu.toggleClass('ebas-visible');

            // Scrollen von Body bei offenem Menü unter Safari auf iOS verhindern
            if(is_scrollable && $('.avia_mobile.avia-safari').length) {
                scrollLock.disablePageScroll(mega_menu.get(0));
            } else {
                scrollLock.enablePageScroll(mega_menu.get(0));
            }

        });


        /**
         * Template: Falls URL zur aktuellen Seite einen Hash enthält, Funktion expandEbasCollapse() anwenden,
         * damit allenfalls zugeklappter Bereich von Link-Ziel ausgefahren wird.
         */
        $(':target').expandEbasCollapse(0);
    });

    /**
     * Hilfsfunktion zum Prüfen, ob sich das Ziel-Element innerhalb eines zugeklappten Bereichs befindet.
     * Falls dem so ist, Bereich ausklappen und zu Ziel-ELement scrollen.
     *
     * @param duration integer Dauer der Animation zum Ausfahren des Zugeklappten Bereichs
     */
    $.fn.expandEbasCollapse = function(duration) {
        duration = (duration === undefined) ? 200 : duration;
        let anchor = $(this);
        let ebas_collapse = anchor.closest('.ebas-collapse:not(.ebas-collapse-expanded)');

        // Prüfen, ob sich Element innerhalb eines zuklappbaren Bereichs befindet
        if(ebas_collapse.length) {
            // Toggler entspricht erstem Element in zuklappbarem Bereich
            let ebas_collapse_toggler = ebas_collapse.find('> *:first-child');

            // Klasse zur Kennzeichnung von geöffnetem Collapse-Element zu Container hinzufügen
            ebas_collapse.addClass('ebas-collapse-expanded');

            // Prüfen, ob sich Inhalt nach Toggler bereis in Div mit der Klasse "ebas-collapse-content" befindet,
            // andernfalls Content mit entsprechendem Div umschliessen
            if(!ebas_collapse_toggler.siblings('.ebas-collapse-content').length) {
                ebas_collapse_toggler.siblings().wrapAll('<div class="ebas-collapse-content"></div>');
            }

            // Div mit der Klasse "ebas-collapse-content" (eigentlicher Inhalt) ausfahren und zu Ziel-Element springen
            ebas_collapse_toggler.siblings('.ebas-collapse-content').slideDown(duration, function () {
                $('html, body').animate({
                    scrollTop: anchor.offset().top,
                }, 400);
            });
        }
    };


    /**
     * Hilfsfunktion zum Scrollen zu einem Element unter Berücksichtigung der Höhe des Headers
     */
    $.fn.scrollToElement = function() {
        let scrollTop_window = $(window).scrollTop();
        let header_height = $('#header').height();
        let spacing = 20;
        let element_offset = $(this).offset().top - header_height - spacing;

        // Nur zum Element scrollen, wenn Anfang oberhalb des Viewports liegt
        if(scrollTop_window > element_offset) {
            $('html, body').animate({
                scrollTop: element_offset,
            }, 400);
        }
    };
})(jQuery);