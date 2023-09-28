/**
 * Common Scripts.
 *
 * @package  wp-configurator-pro/assets/frontend/js/
 * @since  3.0.5
 */
(function ($, window, document) {
    'use strict';

    /*
     * On Document Ready
     */
    $(document).ready(function ($) {
        $('body').on('click', '.js-view-configurations', function (e) {
            e.preventDefault();

            let $self = $(this),
                $wrap = $self.closest('.wpc-cart-form-cart-item');

            $wrap.find('.variation').slideToggle(400);
        });

        $('.js-wpc-set-active-image-data').on('click', function (event) {
            var $self = $(this),
                configID = $self.data('id');

            // Build active encoded image and save it to `wpc_active_data` object
            wpc.buildActivePreviewImage(configID, false, event);
        });

        $('body').on('click', '[data-open-popup-id]', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $self = $(this),
                configID = wpc.getConfigID($self),
                popID = $self.data('open-popup-id'),
                popType = $self.data('popup-type'),
                $wrap = $(`[data-popup-id="${popID}"]`).closest(
                    `[data-popup][data-config-id="${configID}"]`
                );

            $('body').addClass('wpc-popup-initialized');

            $('[data-popup]').find('.error').empty();

            $('[data-popup]').removeClass(
                'wpc-popup-floating wpc-popup-full wpc-popup-partial wpc-popup-center wpc-popup-center-overflow'
            );

            $wrap.addClass(`wpc-popup-active wpc-popup-${popType}`);

            $wrap
                .find(`[data-popup-id="${popID}"]`)
                .addClass('active')
                .siblings()
                .removeClass('active');
        });

        $('[data-close-popup]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            $('body').removeClass('wpc-popup-initialized');

            $('[data-popup]').removeClass(
                'wpc-popup-floating wpc-popup-full wpc-popup-partial wpc-popup-center wpc-popup-center-overflow wpc-popup-active'
            );
            $('[data-popup-id]').removeClass('active');
        });

        $('.js-wpc-zoom-img').on('click', function (event) {
            var $self = $(this),
                configID = $self.data('id'),
                $wrap = $(`.wpc-magnify-wrapper[data-config-id="${configID}"]`);

            $wrap.addClass('wpc-loading');

            wpc.buildActivePreviewImage(configID, false, event);

            $wrap.addClass('active');
        });

        if ('undefined' !== typeof wpc) {
            wpc.add_action(
                'wpc_after_canvas_created',
                function (configID, canvas, event) {
                    if (!$(event.currentTarget).hasClass('js-wpc-zoom-img')) {
                        return;
                    }

                    var $wrap = $(
                        `.wpc-magnify-wrapper[data-config-id="${configID}"]`
                    );

                    var dataUrl = canvas.toDataURL();

                    if (dataUrl) {
                        $wrap
                            .find('.wpc-magnify')
                            .append(
                                `<img src="${dataUrl}" class="zoom" data-magnify-src="${dataUrl}">`
                            );
                        $wrap.find('img').magnify();
                    }

                    $wrap.removeClass('wpc-loading');
                }
            );

            wpc.add_action('wpc_data_changeimage', function ($self) {
                $('body').removeClass('slide-left slide-right');
                $('[data-flyin-id]').removeClass('active');
            });
        }

        // Hotspot
        $('[data-configurator]').on('click', '[data-hotspot]', function (e) {
            let $self = $(this),
                configID = wpc.getConfigID($self),
                style = $(
                    '[data-controls-wrap][data-config-id="' + configID + '"]'
                ).data('controls-style');

            wpc.do_action('wpc_hotspot_clicked-' + style, [$self, configID]);
        });

        $('.js-wpc-submit-cart-form').on('click', function (e) {
            e.preventDefault();
            let $self = $(this),
                configID = wpc.getConfigID($self),
                $form = $(`[data-config-id="${configID}"] .wpc-cart-form`);

            wpc.submitForm('cart-form', $form);
        });

        $('.wpc-popup').on('submit', 'form', function (e) {
            e.preventDefault();
            wpc.submitForm('quote-form', $(this));
        });

        $('.wpc-contact-form .wpcf7-submit').on('click', function (e) {
            e.preventDefault();

            var $form = $(this).closest('form');

            wpc.submitForm('contact-form', $form);
        });

        $(
            '.wpc-magnify-wrapper .js-wpc-close-magnify, .wpc-magnify-wrapper .js-wpc-close-magnify'
        ).on('click', function (e) {
            e.preventDefault();

            var $self = $(this),
                $wrap = $self.closest('.wpc-magnify-wrapper');

            $wrap.find('.magnify').remove();
        });

        // Take Photo
        $('.js-wpc-take-photo').on('click', function (event) {
            event.preventDefault();

            var $self = $(this),
                configID = $self.data('id');

            wpc.buildActivePreviewImage(configID, true, event);
        });

        // Reset
        $('.js-wpc-reset-config').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            var $self = $(this),
                configID = $self.data('id');

            wpc.applyComponent(configID, wpc_reset_keys[configID], 'reset');
        });

        // Add Inspiration
        $('[data-inspiration-form]').on(
            'click',
            '.js-wpc-create-inspiration',
            function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $self = $(this),
                    $form = $self.closest('form'),
                    configID = wpc.getConfigID($self),
                    data = $form.serializeArray();

                // Save inspiration key via ajax
                wpc.createInspiration(configID, data);
            }
        );

        // Update the inspiration list
        $('[data-inspiration-form]').on(
            'click',
            '.js-wpc-update-inspiration',
            function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $self = $(this),
                    $form = $self.closest('form'),
                    data = $form.serializeArray();

                wpc.updateInspiration($self, data);
            }
        );

        // Delete Inspiration List
        $('[data-inspiration-wrap]').on(
            'click',
            '.js-wpc-delete-inspiration',
            function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $self = $(this),
                    value = $self
                        .closest('.wpc-inspiration-list')
                        .data('value');

                if (confirm(wpc_i18n.confirm_delete_inspiration)) {
                    wpc.deleteInspiration($self, value);
                }
            }
        );

        // Delete Inspiration Group
        $('[data-inspiration-wrap]').on(
            'click',
            '.js-wpc-delete-inspiration-group',
            function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $self = $(this),
                    configID = wpc.getConfigID($self),
                    values,
                    group = $self.data('group');

                values = {
                    config_id: configID,
                    group,
                };

                if (confirm(wpc_i18n.confirm_delete_inspiration_group)) {
                    wpc.deleteInspirationGroup($self, values);
                }
            }
        );

        // Reset Inspiration List
        $('[data-inspiration-wrap]').on(
            'click',
            '.js-wpc-reset-inspiration',
            function (e) {
                e.preventDefault();
                e.stopPropagation();

                var $self = $(this),
                    values,
                    configID = wpc.getConfigID($self),
                    key = wpc_active_data[configID]['encoded'],
                    encodedImage = wpc_active_data[configID]['image'],
                    price = wpc_active_data[configID]['total'],
                    value = $self
                        .closest('.wpc-inspiration-list')
                        .data('value');

                if (undefined != typeof key) {
                    values = {
                        config_id: configID,
                        id: value.id,
                        key,
                        image: encodedImage,
                        price,
                    };

                    if (confirm(wpc_i18n.confirm_reset_inspiration)) {
                        wpc.resetInspiration($self, values);
                    }
                }
            }
        );

        // Flyin
        $('body').on('click', '[data-open-flyin-id]', function (e) {
            e.preventDefault();

            var $self = $(this),
                configID = wpc.getConfigID($self),
                flyinID = $self.data('open-flyin-id'),
                flyinPosition = $self.data('flyin-position'),
                $wrap = $(`[data-flyin-id="${flyinID}"]`);

            $('body').toggleClass(`slide-${flyinPosition}`);
            $wrap.toggleClass('active');
        });

        $('[data-close-flyin]').on('click', function (e) {
            e.preventDefault();

            $('body').removeClass('slide-left slide-right');
            $('[data-flyin-id]').removeClass('active');
        });
    });
})(jQuery, window, document);
