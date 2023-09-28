window.Globalize = {
    parseFloat: function (t) {
        return parseFloat((t+"").replace(/[^0-9]/g, ''));
    },

    format: function (t) {
        return format.number(t,0);
    }
};

// @function initGaTrackActions
// @descr
//  Metoda inicjalizujaca automatyczne sledzenie GA.
//  Dla wszystkich elementow o klasie "gaTrackClick" raportuje zdarzenie podajac za argumenty wartosc data-ga-click-params kliknietego elementu.
// @input
//  -
// @output
//  -

function initGaTrackActions () {
    "use strict";

    if (!window.ga) {
        return;
    }

    $(".gaTrackClick").on ("click.ga", function () {
        window.ga.apply(null,['send', 'event'].concat ($(this).data ("ga-click-params")));
    });
}

// @function initRedirectHintsChange
// @descr
//  Metoda inicjalizujaca wyswietlanie podpowiedzi dla uzytkownika przy wyborze rodzaju przekierowania oraz komunikatu przy zapisie.
// @input
//  -
// @output
//  -

function initRedirectHintsChange () {
    "use strict";

    var $redirectFormElement;

    $redirectFormElement = $("#redirectform");

    if ($redirectFormElement.length) {
        $redirectFormElement.on ("submit.redirectform", function (event) {
            if (
                $("#redirect_type_select").val () === "no" &&
                $("#redirect_url").val ().length > 0 &&
                !confirm ($redirectFormElement.data ("confirmmessage"))
            ) {
                event.preventDefault ();
                event.stopPropagation ();
            }
        });
    }

    $("#redirect_type_select").
        on ("change.redirectype", function () {
            var optionValue;

            optionValue = $(this).val ();
            $(".help", "#redirect_help_infobox").hide ();
            $("#infobox_" + optionValue).show ();
            $("#redirect_content").css ("display", optionValue === "extframe" ? "block" : "none");
        }).
        trigger ("change.redirectype");
}

// @function initForsaleLeasingScripts
// @descr
//  Metoda inicjalizujaca zachowanie pola wyboru ceny dzierzawy w ofertach.
// @input
//  -
// @output
//  -
function initForsaleLeasingScripts () {
    "use strict";

    var buyNowValue, changeCallaback, formFieldValue, leasingAutoThreshold, leasingFixedPriceValue, leasingSettingInput, leasingSettingType, leasingSettingValueBN;

    leasingSettingType = $("#leasing_setting_type");
    leasingSettingInput = $("#leasing_setting_input");
    leasingSettingValueBN = $("#leasing_setting_value_bn");

    changeCallaback = function () {
        switch (leasingSettingType.val ()) {
            case "default":
                formFieldValue = "-";
                buyNowValue = m_tools.parse_price (leasingSettingValueBN.val ());
                leasingAutoThreshold = m_tools.parse_price (leasingSettingType.data ("autoleasing"));

                // obliczenia dla ceny dzierzawy ustawionej kwotowo
                if(leasingSettingType.data ("fixed-price") !== undefined) {
                    leasingFixedPriceValue = m_tools.parse_price (leasingSettingType.data ("fixed-price"));

                    // ponizsza wartosc 100 wynika z faktu konwersji  1 oznaczajacej opcje wlaczona dla wszystkich z zlotowek na grosze
                    if (
                        (leasingAutoThreshold > 0 && buyNowValue >= leasingAutoThreshold && buyNowValue >= leasingFixedPriceValue) ||
                        (leasingAutoThreshold === 100 && buyNowValue === 0)
                    ) {
                        formFieldValue = format.price (leasingFixedPriceValue);
                    }
                }
                // ustawienia dla ceny dzierzawy ustawionej procentowo
                else {
                    if(leasingAutoThreshold > 0 && buyNowValue >= leasingAutoThreshold) {
                        formFieldValue = format.price(Math.ceil(buyNowValue * leasingSettingType.data ("percent") / 100));
                    }
                }

                leasingSettingInput.
                    prop ({"disabled": true, "readonly": true}).
                    val (formFieldValue);
                break;
            case "off":
                leasingSettingInput.
                    val ("-").
                    prop ({"disabled": true, "readonly": true});
            break;
            case "manual":
                leasingSettingInput.prop ({"disabled": false, "readonly": false});
                if (leasingSettingType[0] == this) {
                    leasingSettingInput.
                        trigger ("focus").
                        trigger ("select");
                }
            break;
        }
    };

    leasingSettingType.on ("change", changeCallaback);
    leasingSettingValueBN.
        on ("keyup", changeCallaback).
        on ("change", changeCallaback).
        trigger ("change");
}

// @function initUserPreferencesScripts
// @descr
//  Metoda inicjalizujaca akcje zwiazane z panelem ustawien klienta.
// @input
//  -
// @output
//  -
function initUserPreferencesScripts () {
    "use strict";

    var leasingTypeSelect;
    leasingTypeSelect = $("#pf_p_auction_auto_leasing_price_use_defined_value");

    // Wybor pomiedzy kosztem miesiecznej dzierzawy ustawianym kwotowo a liczonym procentowo z kup teraz.
    if (leasingTypeSelect.length) {
        leasingTypeSelect.
            on ("change.p_auction_auto_leasing_price_use_defined_value", function () {
                $("#pf_p_auction_auto_leasing_avail_p").closest ("tr").toggle ($(this).val () !== "1");
                $("#pf_p_auction_auto_leasing_avail_price").closest ("tr").toggle ($(this).val () === "1");
            }).
            trigger ("change.p_auction_auto_leasing_price_use_defined_value");
    }
}

// @function initPanelPageScripts
// @descr
//  Metoda inicjalizujaca akcje zwiazane z strona glowna panelu uzytkownika.
// @input
//  -
// @output
//  -
function initPanelPageScripts() {
    "use strict"

    var boxes;
    boxes = $("#boxes");

    if (boxes.length) {
        $.ajax ({
            url: boxes.data ("url"),
            cache: false
        }).
        done (function (html) {
            if (html.indexOf ("startPageBoxesPanel") > -1) {
                boxes.html (html);
            }
        });
    }
}

$(document).ready(function () {
    $("#blockedExternalJsWarning").hide();
    initGaTrackActions ();
    initRedirectHintsChange ();
    initForsaleLeasingScripts ();
    initUserPreferencesScripts ();
    initPanelPageScripts ();

    JS_HOST = $('#_URL').text ();

    $('input, textarea').placeholder ();

    $('#search-form').on('submit', function () {
        if (!$('input[name=q]').val().match(/^\./)) {
            window.location = JS_HOST + 'szukaj/' + encodeURIComponent($('input[name=q]').val().replace(/^ */, ''));
            return false;
        }
    });

    $('.langselect img').each(function (k,v) {

        var $v = $(v);
        var src = $v.attr('src');

        if (src) {
            if (!src.match(/-active\.png$/)) {
                $v.mouseenter(function () {
                    $v.attr('src', src.replace(/.png$/, '-active.png'));
                });
                $v.mouseleave(function () {
                    $v.attr('src', src.replace(/-active\.png$/, '.png'));
                });
            }
        }

    });

    if (!isIe()) {
        $('.list-fixed-header').each(function () {
            var t = $(this);
            var th = t.children('thead');

            if (th.length > 0) {
                var nt = $('<table class="list list-fixed-header-only" />');
                var nth = th.clone();
                var tp = t.offset().top;
                var tpb = t.offset().top + t.height();

                $('body').click(function () {
                    setTimeout(function () {
                        tp = t.offset().top;
                        tpb = t.offset().top + t.height();
                    }, 350);
                });

                nt
                    .append(nth)
                    .insertAfter(t)
                    .width(t.width())
                ;

                var fix_w = function () {
                    nt.width(t.width());

                    th.find('tr > th').each(ref({"nths":nth.find('tr > th')}, function (k,v) {
                        $(this.nths[k]).width($(v).width());
                    }));
                };
                fix_w();

                t.data('fix_w', fix_w);

                setTimeout(fix_w, 700);

                var $window = $(window);
                var $topMenuFixed = $('#top-menu-fixed');
                var topMenuFixedHeight = $topMenuFixed.height();

                $window.scroll(function (e) {
                    var st = $window.scrollTop() + topMenuFixedHeight;
                    if (st>=tp && st<= tpb) {
                        nt.show().css('top', topMenuFixedHeight+'px');
                    } else {
                        nt.hide();
                    }
                }).scroll();
            }
        });
    }

    if (typeof console === "undefined") {
        console = {
            "log": function () {},
            "error": function () {}
        };
    }

    var multiselectLabelCallback = function (checkedNumber, totalNumber, checkedList) {
        if (checkedNumber > 1) {
            return $(checkedList[0]).attr('title') + " + " + (checkedNumber - 1);
        } else {
            var title = $(checkedList[0]).attr('title');
            if (title.length > 12) {
                title = title.substr(0, 10) + '..';
            }
            return title;
        }
    };

    $('.slider').each(function () {
        try {
            var $this = $(this);
            var $input = [
                $this.children('input.min'),
                $this.children('input.max')
            ];
            var $values = [
                $this.children('.slider-value-min'),
                $this.children('.slider-value-max')
            ];
            var $handles = [];
            var $slider = $this.children('.slider-slider');
            var min = parseInt($this.children('.slider-min').text());
            if (min === 1) {
                min = 0;
            }
            var max = parseInt($this.children('.slider-max').text());
            var onChange = function( event, ui ) {
                $input[0].val(format.number(ui.values[0], 0));
                $input[1].val(format.number(ui.values[1], 0));
                $values[0].text(format.number(ui.values[0], 0));
                $values[1].text(format.number(ui.values[1], 0));
                $input[0].change();
                $input[1].change();
                if (ui.values[0] === min) {
                    $handles[0].addClass('handle-on-corner');
                } else {
                    $handles[0].removeClass('handle-on-corner');
                }
                if (ui.values[1] === max) {
                    $handles[1].addClass('handle-on-corner');
                } else {
                    $handles[1].removeClass('handle-on-corner');
                }
            };
            var initValues = [ parseInt($input[0].val()), parseInt($input[1].val()) ];

            $slider.slider({
                range: true,
                min: min,
                max: max,
                step: max>10000?(max>100000?1000:100):1,
                values: initValues,
                slide: onChange
            });

            $handles.push($($slider.children('a')[0]), $($slider.children('a')[1]));

            onChange(null, {values: initValues});

            var minWidth = ((""+max).length*7 + 10);
            $values[0].css('min-width', minWidth+'px');
            $values[1].css('min-width', minWidth+'px');
            $input[0].css('width', minWidth+'px');
            $input[1].css('width', minWidth+'px');

            $this.find('input.max, input.min').change(function () {
                var values = [
                    m_tools.parse_float($input[0].val()),
                    m_tools.parse_float($input[1].val())
                ];
                $slider.slider("values", values);
            }).focus(function () {
                var inp = $(this);
                setTimeout(function () {
                    inp.select();
                }, 100);
            });
        } catch (e) {
            console.error(e);
        }
    });

    $('.cat-select').each(function () {
        var $this = $(this);
        var $select = $this.children('.cat-select-primary');
        var $sub = $this.children('.cat-select-sub');

        try {
            $sub.each(function (k,v) {
                $(v).multiselect({
                    header: false,
                    minWidth: 'auto',
                    multiple: false,
                    noneSelectedText: "inne",
                    selectedText: multiselectLabelCallback,
                    checkAllText: "zaznacz wszystko",
                    uncheckAllText: "odznacz wszystko",
                    classes: $(v).attr('class')
                });
            });

            $select.multiselect({
                header: false,
                minWidth: 'auto',
                multiple: false,
                noneSelectedText: "inne",
                selectedText: multiselectLabelCallback,
                checkAllText: "zaznacz wszystko",
                uncheckAllText: "odznacz wszystko"
            });
        } catch (e) {
            console.error(e);
        }

        $sub = $this.children('.cat-select-sub');

        $select.change(function () {
            var primary = $select.val();
            $sub.hide();
            $this.children('button.cat-select-sub-' + primary).show();
        }).change();
    });

    $('.range').each(function () {
        var $this = $(this);
        var $select_buttons = $this.find('.range-select');
        var $input = [
            $select_buttons.find('.select-buttons-input'),
            $this.find('.range-max')
        ];
        var $range = $this.find('.range-ranges .select-buttons-input');

        var $slider = $this.find('.slider');
        $slider.hide();

        var $slider_input = [
            $this.find('.slider input.min'),
            $this.find('.slider input.max')
        ];

        $this.find('.slider input').change(function () {
            $input[0].val($slider_input[0].val());
            $input[1].val($slider_input[1].val());
            $input[1].change();
        });

        if ($range.val() === 'full') {
            $this.find('.slider input').change();
        }

        $range.change(function () {
            var range = $range.val();

            if (range === 'full') {
                $select_buttons.hide();
                $slider.show();
            } else {
                $select_buttons.show();
                $slider.hide();
            }
        }).change();
    });

    $('.select-buttons').each(function () {
        var $this = $(this);
        var $select = $this.children('.select-buttons-input');
        var $options = $this.children('.select-buttons-option');
        var $others = $this.children('.select-buttons-others');
        var $default = $this.children('.select-buttons-option-default');
        var is_multiple = $select.hasClass('multiple') || $others.attr('multiple') === "multiple";

        $this.addClass('select-buttons-for-'+$select.attr('name').replace(/[^a-z\-]/g, ''));

        try {
            $others.multiselect({
                header: false,
                minWidth: 80,
                multiple: is_multiple,
                classes: "ui-multiselect-hiddendefault",
                noneSelectedText: "inne",
                selectedText: multiselectLabelCallback,
                checkAllText: "zaznacz wszystko",
                uncheckAllText: "odznacz wszystko"
            });
        } catch (e) {
            console.error(e);
        }

        var $othersMultiselect = $this.children('.ui-multiselect');
        if ($others.hasClass('selected')) {
            $othersMultiselect.addClass('selected');
        }

        var selectVal = function (value) {
            if (is_multiple) {
                var values = $select.val().split(",");
                values.push(value);
                var newValues = [];
                $.each(values, function (k,v) {
                    if (v !== "") {
                        newValues.push(v);
                    }
                });
                $select.val(newValues.join(",")).change();
                $default.removeClass('selected');
            } else {
                $select.val(value).change();
                $others.removeClass('selected');
                $spinner.removeClass('selected').val($spinner.data('defaultValue'));
                $othersMultiselect.removeClass('selected');
                $options.removeClass('selected');
            }
        };

        var unselectVal = function (value) {
            if (is_multiple) {
                var values = $select.val().split(",");
                var newValues = [];
                $.each(values, function (k,v) {
                    if (v !== value && v !== "") {
                        newValues.push(v);
                    }
                });
                $select.val(newValues.join(",")).change();

                if (newValues.length === 0) {
                    $default.addClass('selected');
                }
            }
        };

        var unselectAll = function () {
            if (is_multiple) {
                $select.val("").change();
                $others.removeClass('selected');
                $othersMultiselect.removeClass('selected');
                $options.removeClass('selected');
                $default.addClass('selected');
            }
        };

        var $spinner = $this.find('.spinner');
        $spinner.data('defaultValue', $spinner.val());

        var $spinnerButton = $('<button type="button" class="ui-multiselect ui-widget ui-state-default ui-corner-all spinner-button" aria-haspopup="true"><span class="ui-icon ui-icon-triangle-2-n-s"></span><span>inne</span></button>');
        $spinner.after($spinnerButton);

        var onSpinnerChange = function () {
            var value = $spinner.val();
            if (value !== "") {
                $select.val(value).change();
                $options.removeClass('selected');
            }
        };

        $spinner.spinner({
            numberFormat: "C",
            step: 1000,
            start: function( event, ui ) {
                //$spinner.val($spinner.val().replace(/[^0-9]/g, ''));
            },
            stop: function( event, ui ) {
                //$spinner.val(format.price($spinner.val()*100, false));
            },
            change: onSpinnerChange,
            spin: onSpinnerChange
        });

        var $spinnerWidget = $spinner.spinner( "widget" );

        if (!$spinner.hasClass( "spinner-default-open" )) {
            $spinnerWidget.hide();
        } else {
            $spinnerButton.hide();
        }

        $spinnerButton.click(function () {
            $spinnerButton.hide();
            $spinnerWidget.show();
            $spinner.focus().select();
        });

        $spinner.blur(function () {
            if ($spinner.val() === '') {
                $spinnerButton.show();
                $spinnerWidget.hide();
            }
        });

        $spinner.change(onSpinnerChange).keyup(onSpinnerChange).focus(onSpinnerChange);

        $others.change(function () {
            var $option = $(this);
            var value = $option.val();

            if (is_multiple) {
                $select.val("");
                $options.removeClass('selected');

                try {
                    $.each(value, function (k,v) {
                        selectVal(v);
                    });
                } catch (e) {}

                if ($select.val() === "") {
                    $others.removeClass('selected');
                    $othersMultiselect.removeClass('selected');
                    $options.removeClass('selected');
                    $default.addClass('selected');
                }
            } else {
                selectVal(value);

                if ((""+value).length > 0) {
                    $others.addClass('selected');
                    $othersMultiselect.addClass('selected');
                }
            }
        });

        $options.click(function () {
            if ($others.val() !== null) {
                $others.multiselect("uncheckAll");
            }

            var $option = $(this);
            var value = $option.children('.value').text();

            if ($option.hasClass('selected')) {
                if (!$option.hasClass('select-buttons-option-default') && is_multiple) {
                    unselectVal(value);
                    $option.removeClass('selected');
                }
            } else {
                if ($option.hasClass('select-buttons-option-default') && is_multiple) {
                    unselectAll();
                } else {
                    selectVal(value);
                }
                $option.addClass('selected');
            }
        });

        var values = $select.val().split(",");
        $.each($options, function (k,v) {
            var $option = $(v);
            var value = $option.children('.value').text();
            var inArray = false;

            $.each(values, function (k,v) {
                if (v === value) {
                    inArray = true;
                }
            });

            if (inArray) {
                $option.addClass('selected');
            }
        });
    });

    $('#filters-top').each(function () {

        var $filters = $(this);
        var $filtersParent = $filters.parent();
        var $form = $filters.find('form');
        var $advancedRows = $filters.find('.form_row:not(.filter-simple)');
        var $simpleButton = $filters.find('.switch-to-simple');
        var $advancedButton = $filters.find('.switch-to-advanced');
        var $submitButton = $filters.find('input[type=submit]');
        var $forsaleCategories = $('.forsale-categories');

        var getAdvancedInputs = function () {
            return $advancedRows.find('input,select');
        };

        var getAdvancedDisabledInputs = function () {
            return $advancedRows.find('.advanced-disabled');
        };

        $simpleButton.click(function (e) {
            e.preventDefault();
            $filtersParent.find('.filters-simple-only').show();
            $filtersParent.find('.filters-advanced-only').hide();
            $filters.addClass('filters-top-simple').removeClass('filters-top-advanced');
            getAdvancedInputs().attr('disabled', true).addClass('advanced-disabled');
            $forsaleCategories.show();
        });

        $advancedButton.click(function (e) {
            e.preventDefault();
            $filtersParent.find('.filters-simple-only').hide();
            $filtersParent.find('.filters-advanced-only').show();
            $filters.removeClass('filters-top-simple').addClass('filters-top-advanced');
            getAdvancedDisabledInputs().attr('disabled', false).removeClass('advanced-disabled');
            $forsaleCategories.hide();
        });

        $form.find('select.multiselect').multiselect({
            header: false,
            minWidth: 'auto',
            multiple: false,
            noneSelectedText: "inne",
            selectedText: multiselectLabelCallback
        });

        if ($filters.hasClass('filters-top-simple')) {
            $simpleButton.click();
        } else {
            $advancedButton.click();
        }

        var attentionBlinking = null;

        $form.find('input,select').change(function () {
            if ($filters.hasClass('filters-top-simple')) {
                setTimeout(function () {
                    $form.submit();
                }, 350);
            } else {
                clearTimeout(attentionBlinking);

                attentionBlinking = setTimeout(function () {
                    $submitButton
                            .animate({opacity: .5}, 250)
                            .animate({opacity: 1}, 250)
                            .animate({opacity: .5}, 250)
                            .animate({opacity: 1}, 250)
                            .animate({opacity: .5}, 250)
                            .animate({opacity: 1}, 250)
                    ;
                }, 250);
            }
        });

        $form.find('.sort-default-desc option').attr('selected', true);
        var sortDefaultList = $form.find('.sort-default-desc').val();

        if (!sortDefaultList) {
            sortDefaultList = [];
        }

        $form.find('input[name=order]').change(function () {
            var $this = $(this);
            var value = $this.val();
            var descDefault = false;
            $.each(sortDefaultList, function (k,v) {
                if (v === value) {
                    descDefault = true;
                }
            });
            $($form.find('.select-buttons-for-desc .select-buttons-option')[descDefault ? 1 : 0]).click();
        });

        $form.find('.input-date-part').datepicker({ changeYear: true, yearRange: "1985:+20" }).keyup(function (e) {
            if (e.keyCode === 13) {
                $form.submit();
            }
        });
        $form.find('.ui-datepicker').hide();

        if (!$filters.hasClass('do-not-show')) {
            $filters.show();
        }

    });

    $('input[name=q]').attr('x-webkit-speech', 'x-webkit-speech');
    $('._blank').attr('target', '_blank');

    $('.default-value')
        .focus(function () {
            if ($(this).val() === $(this).attr('defaultValue'))
                $(this).val('');

            if ($(this).val().indexOf($(this).attr('defaultValue')) === 0)
                $(this).val($(this).val().replace(new RegExp('^' + $(this).attr('defaultValue')), ''));
        })

        .blur(function () {
            if ($(this).attr('value') === '')
                $(this).val($(this).attr('defaultValue'));
        })

        .each(function (k, input) {
            $(input).attr('defaultValue', $(input).val());
        })
    ;

    $('.tooltip:not(.tooltip-replaced)').each(function (k,v) {
        var t = $(v).html();

        $(v).text('').append(
            $('<span class="icon"/>')
        ).append(
            $('<span class="tip"/>').hide().html(t)
        ).addClass('tooltip-replaced');
    }).mouseenter(function () {
        $(this).children('.tip').show();
    }).mouseleave(function () {
        $(this).children('.tip').hide();
    });

    $('.radiogroup[type=checkbox]').change(function () {
        var $this = $(this);
        var form = $this.parents('.form_row, .form-table');

        var name = $this.attr('class').replace(/^.*?(radiogroup-)/, '').replace(/ .*/, '');
        form.find('input[name="' + $this.attr('name') + '"]').not('.radiogroup-'+name).attr('checked', false);
    });

    $('.pseudoradio[type=checkbox]').change(function () {
        var $this = $(this);

        if ($this.is(':checked')) {
            var form = $this.parents('.form_row, .form-table');
            var name = $this.attr('class').replace(/^.*?(pseudoradio-)/, '').replace(/ .*/, '');
            form.find('.pseudoradio-'+name).attr('checked', false);
            $this.attr('checked', true);
        }
    });

    $('.autofocus').focus();
    $('.colorselect, .colorpicker').colorselect();

    $('.js-show').fadeIn();

    if ($('#bottom').length) {
        var offset = $(window).height() - $('#bottom').offset().top;
        var height = $('#bottom').height();

        if (offset > height) {
            $('#bottom').css('margin-top', (30 + offset - height) + 'px');
        }
    }

    $("textarea[maxlength]").keypress(function(e) {
        if(e.which >= 33 || e.which === 13) {
            if(this.value.length >= parseInt($(this).attr('maxlength'), 10)) {
                $(this).css('color','red');
            } else {
                $(this).css('color','');
            }
        }
    })
    .keyup(function(e) {
        $(this).parents('.form_row').find('.chars-left').text(Math.max(0, parseInt($(this).attr('maxlength'), 10) - this.value.length));
    });

    $('.paginate input.paginate-page').each(function (k,v) {
        var $input = $(v);
        var url = $input.prev().val();

        var $select = $input.next();

        $input.wrap('<div class="paginate-page-select" style="display: none"></div>');

        var $wrapper = $input.show().parent();

        $('<span>IdÅº do strony nr: </span>').insertBefore($input);

        $wrapper.append(
            $('<span class="button-play"></span>').click(function () {
                window.location.href = url.replace('%25pp', parseInt($input.val(), 10) - 1);
            })
        );

        $select.change(function () {
            if (!$select.val()) {
                $select.hide();
                $wrapper.show().next().hide().next().hide().next().hide();
                $input.select().focus();
                return;
            }

            var loc = url.replace('%25pp', this.value);
            window.location.href = loc;
        });
    });

    $('.extras-show').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('extras-hide')) {
            $('.extras-show').removeClass('extras-hide');
            $('.extras').hide();

            if ($(this).attr('id')) {
                createCookie($(this).attr('id'), 0, 9999);
            }
        } else {
            $('.extras-show').addClass('extras-hide');
            $('.extras').show();

            if ($(this).attr('id')) {
                createCookie($(this).attr('id'), 1, 9999);
            }
        }
    });

    var f = function () {
        if ($(this).val().length > 0) {
            $(this).removeClass('emptyval');
        } else if (!$(this).hasClass('emptyval')) {
            $(this).addClass('emptyval');
        }
    };

    if ($('input[name=premiumpllogin]').length > 0) {
        $('input[name=premiumpllogin]').blur(f);
        ref($('input[name=premiumpllogin]'), f)();
    }

    if (window.location.href.match(/^https?:\/\/(www\.)?premium\.pl/)) {
        if (top !== self) {
            window.parent.location = self.location;
        }
    }

    $('.date-picker').datepicker({ changeYear: true, yearRange: "1985:+20" });
});

var JS_HOST = null;

var select_set_value = function (sel, val) {
    $(sel).each(function (k, s) {
        $(s).val(val).change();
    });
};

(function ($) {
    $.fn.colorselect = function () {
        return this.each(function () {
            var holder = $('<div></div>');
            holder.insertBefore($(this));

            $(this).hide();

            holder.ColorPicker({
                flat: true,
                color: $(this).val(),

                onShow: function (colpkr) {
                    $(colpkr).fadeIn(500);
                    return false;
                },
                onHide: function (colpkr) {
                    $(colpkr).fadeOut(500);
                    return false;
                },
                onChange: ref(this, function (hsb, hex, rgb) {
                    $(this).val(hex);
                    $(this).trigger('colorchange');
                })
            });
        });
    };
})(jQuery);

function ref(object, method) {
    return function () {
        return method.apply(object, arguments);
    };
}

(function ($) {
    $.fn.attrToggle = function (a_n) {
        this.each(function () {
            $(this).attr(a_n, !$(this).attr(a_n));
        });

        return this;
    };
})(jQuery);

var sAgent = navigator.userAgent.toLowerCase();

function isGecko() {
    return sAgent.match(/gecko/i);
}

function isPresto() {
    return sAgent.match(/presto/i);
}

function isIe() {
    return document.getElementById('incompatible') ||
            (!isPresto() && !isGecko() && document.all) ? true : false;
}

function isIe7() {
    return (!isPresto() && !isGecko() && document.all && /MSIE (7)/.test(sAgent)) ? true : false;
}

function textLength(txt, fFace, fSize, fWeight) {
    var t = $('<span style="visibility:hidden; white-space: nowrap;"></span>');

    t.css('font-family', fFace);
    t.css('font-size', fSize);
    t.css('font-weight', fWeight);

    t.text(txt);
    $('body').append(t);

    var res = t.width();
    t.remove();

    return res;
}

var _lca;

function round(num, dec) {
    return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
}

function number_format (number, decimals, dec_point, thousands_sep) {
    // http://kevin.vanzonneveld.net

    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

var format = {
    "number": function (num, decimals) {
        if (typeof decimals === 'undefined') {
            decimals = 2;
        }

        return number_format(num, decimals, ',', num>=10000?' ':'');
    },
    "price": function (num, cents) {
        return format.number(num/100, cents||typeof cents==='undefined'?2:0);
    },
    "date": function (d) {
        var m = d.getMonth() + 1, da = d.getDate();
        return d.getFullYear() + '-' + (m<10?'0'+m:m) + '-' + (da<10?'0'+da:da);
    },
    "tax": function (v) {
        v = v+'';
        if (v.match(/^[\-0-9]+%?$/)) {
            return v.replace(/[^\-0-9]/g, '') + '%';
        } else {
            return v;
        }
    }
};

var m_tools = {
    "parse_float": function (pv) {
        return m_tools.not_nan(Math.round(parseFloat((pv+'').replace(',', '.').replace(/[^\-0-9\.]/g, ''))));
    },
    "parse_price": function (pv) {
        return m_tools.not_nan(parseInt(Math.round(parseFloat((pv+'').replace(',', '.').replace(/[^\-0-9\.]/g, '')) * 100), 10));
    },
    "not_nan": function (num) {
        if (isNaN(num)) {
            num = 0;
        }
        return num;
    },
    "parse_measure": function (num) {
        return m_tools.parse_float(num);
    },
    "parse_pc": function (pc) {
        return m_tools.not_nan(parseInt((pc+'').replace(/[^\-0-9]/g, ''), 10));
    },
    "pc_mul": function (num, pc) {
        pc = m_tools.not_nan(parseInt((pc+'').replace(/[^\-0-9]/g, ''), 10));
        num = m_tools.not_nan(parseInt(num, 10));
        return round(num * (pc/100), 0);
    },
    "pc_mul_add": function (num, pc) {
        return num + m_tools.pc_mul(num, pc);
    },
    "pc_mul_sub": function (num, pc) {
        return num - m_tools.pc_mul(num, pc);
    },
    "pc_mul_base": function (num, pc) {
        pc = m_tools.not_nan(parseInt((pc+'').replace(/[^\-0-9]/g, ''), 10));
        num = m_tools.not_nan(parseInt(num, 10));
        return round(num * (100/(100+pc)), 0);
    },
    "pc_get": function (num, piece_num) {
        num = m_tools.not_nan(parseInt(num, 10));
        piece_num = m_tools.not_nan(parseInt(piece_num, 10));
        return num === 0 ? 0 : round(piece_num/num * 100, 0);
    }
};

function createCookie(name, value, hours) {
    if (!hours) {
        hours = 3;
    }

    var date = new Date();
    date.setTime(date.getTime() + (86400*hours));

    var expires="; expires="+date.toGMTString();
    document.cookie=name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    name=name+"=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i ++){
        var c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}