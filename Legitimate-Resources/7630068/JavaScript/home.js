(function (Socialfunders, $, undefined) {
    (function (Home, $, undefined) {

        Socialfunders.Home.onStart = function() {
            // get the statistics for the phrase below the header image
            $.ajax({
                type: 'get',
                url: '/api/v3/bundles/home-statistics/',
                processData: false,
                contentType: 'application/json',
                success: function (data, successCode, jqXHR) {
                    // animate the numbers below the header image
                    $('.count-animation').each(function () {
                        var $el = $(this);
                        var start = '0';
                        if ($el.attr('data-start') !== undefined) {
                            start = $el.attr('data-start');
                        }
                        var end = data[$el.attr('data-homestatisticsfield')];
                        start = Socialfunders.Utils.parseLocalizedFloatString(start);
                        end = Socialfunders.Utils.parseLocalizedFloatString(end);
                        if ($el.attr('data-end-minus') !== undefined) {
                            if (Socialfunders.Utils.parseLocalizedFloatString($el.attr('data-end-minus')) > end) {
                                end = parseFloat((Socialfunders.Utils.parseLocalizedFloatString($el.attr('data-end-minus')) - end).toFixed(2));
                            } else {
                                end = parseFloat((end - Socialfunders.Utils.parseLocalizedFloatString($el.attr('data-end-minus'))).toFixed(2));
                            }
                        }
                        if ($el.attr('data-reverse') !== undefined) {
                            var help = end;
                            end = start;
                            start = help;
                        }
                        Socialfunders.Utils.count($el, start, end, 300, undefined, $el.data('currency'));
                    });
                    $('.count-animation-flipcounter').each(function () {
                        var $el = $(this);
                        var start = '0';
                        if ($el.attr('data-start') !== undefined) {
                            start = $el.attr('data-start');
                        }
                        var end = data[$el.attr('data-homestatisticsfield')];
                        start = Socialfunders.Utils.parseLocalizedFloatString(start);
                        end = Socialfunders.Utils.parseLocalizedFloatString(end);
                        if ($el.attr('data-end-minus') !== undefined) {
                            if (Socialfunders.Utils.parseLocalizedFloatString($el.attr('data-end-minus')) > end) {
                                end = parseFloat((Socialfunders.Utils.parseLocalizedFloatString($el.attr('data-end-minus')) - end).toFixed(2));
                            } else {
                                end = parseFloat((end - Socialfunders.Utils.parseLocalizedFloatString($el.attr('data-end-minus'))).toFixed(2));
                            }
                        }
                        if ($el.attr('data-reverse') !== undefined) {
                            var help = end;
                            end = start;
                            start = help;
                        }
                        Socialfunders.Utils.count($el, start, end, 3000, $el.attr('id'), $el.data('currency'));
                    });
                    // TODO: this should replace the 2 functions above - check all CMS pages to switch to new function
                    /* check elements with this class and make them animated counter - depending on the data-attributes different things can be achieved:
                    data-start: counter start (default 0). Possible values: any number, data-homestatisticsfield
                    data-homestatisticsfield: the counter end by default
                    data-end: counter end (overrides the data-homestatisticsfield as end). Possible values: any number, data-homestatisticsfield, cofunding-max, cofunding-left, cofunding-donated
                    data-end-minus: Either a fixed value that will be substracted from the end. Possible values: any number, data-homestatisticsfield
                    data-end-plus: Same es ^data-end-minus but instead add this value to the end.
                    data-currency: Treat value as currency? also uses 2 decimal places if data-decimal-places is not defined
                    data-reverse: switch start and end
                    data-decimal-places: The decimal places to display. Mostly to hide decimal places for currency fields.*/
                    $('.animated-counter').each(function () {
                        var $el = $(this);
                        var isCurrency = $el.attr('data-homestatisticsfield').endsWith('_currency') || $el.attr('data-currency');


                        var start = 0;
                        if ($el.attr('data-start') !== undefined) {
                            start = $el.attr('data-start');
                            if (start.startsWith('data-homestatisticsfield')) {
                                if (start === 'data-homestatisticsfield') {
                                    start = data[$el.attr('data-homestatisticsfield')];
                                } else {
                                    start = data[start.split('data-homestatisticsfield-')[1]];
                                }
                            }
                            if (typeof(start) === 'number') {
                                start = Socialfunders.Utils.localizeFloatString(start)
                            }
                        }
                        start = Socialfunders.Utils.parseLocalizedFloatString(start, isCurrency);

                        var end = data[$el.attr('data-homestatisticsfield')];
                        if ($el.attr('data-end') !== undefined) {
                            end = $el.attr('data-end');
                            if (end.startsWith('data-homestatisticsfield')) {
                                if (end === 'data-homestatisticsfield') {
                                    end = data[$el.attr('data-homestatisticsfield')];
                                } else {
                                    end = data[end.split('data-homestatisticsfield-')[1]];
                                }
                            }
                            if (typeof(end) === 'number') {
                                end = Socialfunders.Utils.localizeFloatString(end)
                            }
                        }
                        end = Socialfunders.Utils.parseLocalizedFloatString(end, isCurrency);

                        var minus_data = $el.attr('data-end-minus') || '0';
                        if (minus_data !== undefined && minus_data.startsWith('data-homestatisticsfield')) {
                            if (minus_data === 'data-homestatisticsfield') {
                                minus_data = data[$el.attr('data-homestatisticsfield')];
                            } else {
                                minus_data = data[minus_data.split('data-homestatisticsfield-')[1]];
                            }
                        }
                        minus_data = Socialfunders.Utils.parseLocalizedFloatString(minus_data);
                        if (minus_data !== undefined) {
                            end = parseFloat(end) - parseFloat(minus_data);
                        }

                        var plus_data = $el.attr('data-end-plus') || '0';
                        if (plus_data !== undefined && plus_data.startsWith('data-homestatisticsfield')) {
                            if (plus_data === 'data-homestatisticsfield') {
                                plus_data = data[$el.attr('data-homestatisticsfield')];
                            } else {
                                plus_data = data[plus_data.split('data-homestatisticsfield-')[1]];
                            }
                        }
                        plus_data = Socialfunders.Utils.parseLocalizedFloatString(plus_data);
                        if (plus_data !== undefined) {
                            end = parseFloat(end) + parseFloat(plus_data);
                        }
                        if ($el.attr('data-reverse') !== undefined) {
                            var tmp_end = end;
                            end = start;
                            start = tmp_end;
                        }
                        var is_flipcounter = $el.hasClass('flip-counter');
                        var flipcounter_el = is_flipcounter ? $el.attr('id') : undefined;
                        var time = 2500
                        if ($el.attr('data-time') !== undefined) {
                            time = $el.attr('data-time');
                            time = Socialfunders.Utils.parseLocalizedFloatString(time);
                        }
                        var decimals = $el.attr('data-decimal-places') ? $el.attr('data-decimal-places') : (isCurrency ? 2 : 0)

                        Socialfunders.Utils.count($el, start, end, time, flipcounter_el, isCurrency, decimals);
                    });

                }
            });

            $('.counter-v4').each(function(){
                var url_params = $(this).attr('data-params')
                var $counter = $(this);
                $.ajax({
                    type: 'get',
                    url: '/api/v4/public-stats/?' + url_params,
                    processData: false,
                    contentType: 'application/json',
                    success: function (data, successCode, jqXHR) {

                        var end = $counter.attr('data-end')
                        if (isNaN(parseFloat(end))) {
                            end = data[end]
                        }
                        end = parseFloat(end)

                        var end_minus = $counter.attr('data-end-mod') || 0;
                        if (isNaN(parseFloat(end_minus))) {
                            if(end_minus.startsWith('-')) {
                                end_minus = -1 * data[end_minus.substr(1)]
                            } else {
                                end_minus = data[end_minus]
                            }
                        }
                        end += parseFloat(end_minus)


                        var start = $counter.attr('data-start')
                        if (start === undefined) {
                            start = 0;
                        }
                        else if (isNaN(parseFloat(start))) {
                            start = data[start]
                        }
                        start = parseFloat(start)

                        var start_mod = $counter.attr('data-start-mod') || 0;
                        if (isNaN(parseFloat(start_mod))) {
                            if(start_mod.startsWith('-')) {
                                start_mod = -1 * data[start_mod.substr(1)]
                            } else {
                                start_mod = data[start_mod]
                            }
                        }
                        start += parseFloat(start_mod)

                        var time = 2500
                        if ($counter.attr('data-time') !== undefined) {
                            time = $counter.attr('data-time');
                            time = Socialfunders.Utils.parseLocalizedFloatString(time);
                        }
                        if ($counter.attr('data-reverse') !== undefined) {
                            var tmp_end = end;
                            end = start;
                            start = tmp_end;
                        }
                        var is_currency = $counter.attr('data-start') !== undefined && $counter.attr('data-start').endsWith('_currency') ||
                            $counter.attr('data-end') !== undefined && $counter.attr('data-end').endsWith('_currency') ||
                            $counter.attr('data-currency');
                        var flipcounter_id = $counter.hasClass('flip-counter') ? $counter.attr('id') : undefined;
                        var decimals = $counter.attr('data-decimal-places') ? $counter.attr('data-decimal-places') : (is_currency ? 2 : 0)
                        Socialfunders.Utils.count($counter, start, end, time, flipcounter_id, is_currency, decimals);
                    }
                })
            })

        }
    }(window.Socialfunders.Home = window.Socialfunders.Home || {}, jQuery));
}(window.Socialfunders = window.Socialfunders || {}, jQuery));

$(document).lareReadyOnce(function() {
    Socialfunders.Home.onStart();
});
