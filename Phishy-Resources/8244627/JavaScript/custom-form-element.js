/******************/

/* custom File button */

/******************/

function customSelect() {
    var myselect = $('select');
    $(myselect).each(function () {
        if ($(this).parent().is("span.select-wrapper")) {
            $(this).parent().find("span.holder").remove();
            $(this).unwrap();
        }
        if ($(this).is(':disabled') || $(this).is('[readonly]')) {
            $(this).wrap("<span class='select-wrapper form-control select-disabled'></span>");
        } else {
            $(this).wrap("<span class='select-wrapper form-control'></span>");
        }
        $(this).after("<span class='holder'></span>");

        var selectedOption = $(this).find(":selected").text();
        $(this).next(".holder").text(selectedOption);
        writeLog("customselect partito");

    });

    $(myselect).not('[readonly]').off('change.custom-form-element');
    $(myselect).not('[readonly]').on('change.custom-form-element', function () {
        var selectedOption = $(this).find(":selected").text();
        $(this).next(".holder").text(selectedOption);
        writeLog("customselect onchange");
    }); //.trigger('change.custom-form-element');



    /*check on focusout*/
    $(myselect).focusout(function () {
        if ($(this).parent().is("span.select-wrapper")) {
            $(this).parent("span.select-wrapper").removeClass("select-wrapper-focused");
        }
    });
    /*check on focus*/
    $(myselect).focus(function () {
        if ($(this).parent().is("span.select-wrapper")) {
            $(this).parent("span.select-wrapper").addClass("select-wrapper-focused");
        }
    });
    /*check input from keyboard*/
    $(document).keyup(function (e) {
        if ($(myselect).is(':focus')) {
            $(":focus option:selected").each(function () {
                writeLog("select change value from keyboard: " + $(this).text());
                $(this).parent('select').next(".holder").text($(this).text());
            });
        }
    });
}








$(document).ready(function () {
    customSelect();
});




/******************/

/* custom File button */

/******************/

function customFile() {
    var fileButton = $('input[type="file"]');
    $(fileButton).each(function () {
        if ($(this).parent().is("div.custom-file-input")) {
            $(this).parent().find("div.input-group").remove();
            $(this).unwrap();
        }
        $(this).wrap('<div class="custom-file-input"></div>');
        //$("<div class='input-group'><input type='text' class='form-control' placeholder='seleziona file'><div class='input-group-addon input-group-addon-evidence-primary'><span class='glyphicon glyphicon-chevron-right'></span></div></div>").appendTo($(this).parent('.custom-file-input'));
         $("<div class='input-group'><input type='text' class='form-control' placeholder='seleziona file'><div class='input-group-addon input-group-addon-evidence-primary'><img src='/risorse_dt/condivise/immagini/icone/icone-default-on-2x/ico-freccia-dx@2x.png' alt='carica'/></div></div>").appendTo($(this).parent('.custom-file-input'));

    });

    $(fileButton).off('change.custom-form-element');
    $(fileButton).on('change.custom-form-element', function (e) {
        var fullPath = $(this).val();
        var filename = fullPath.replace(/^.*[\\\/]/, '');
        $(this).next().children('.form-control').attr('value', filename);
    });
}
$(document).ready(function () {
    customFile();
});

/******************/

/* custom Radio button */

/******************/

function customRadio() {
    var radioButton = $('.radio input');
    $(radioButton).each(function () {
        if ($(this).parent().is("span.custom-radio")) {
            $(this).unwrap();
        }
        $(this).wrap("<span class='custom-radio'></span>");
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });
    $('.radio label').css('padding-left', '10px');


    $(radioButton).not('[readonly]').off('click.custom-form-element');
    $(radioButton).not('[readonly]').on('click.custom-form-element', function () {
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }

        var myradioname = $(this).attr('name');

        $(radioButton).not(this).each(function () {
            if ($(this).attr('name') == myradioname) {
                $(this).parent().removeClass("selected");
            }
        });
    });



    $("input[type='radio']").focusout(function () {
        if ($(this).parent().is("span.custom-radio")) {
            $(this).parent("span.custom-radio").removeClass("custom-radio-focused");
        }
    });
    $("input[type='radio']").focus(function () {
        if ($(this).parent().is("span.custom-radio")) {
            $(this).parent("span.custom-radio").addClass("custom-radio-focused");
        }
    });

}
$(document).ready(function () {
    customRadio();
});



/******************/

/* custom Checkbox */

/******************/

function customCheckbox() {
    var checkBox = $('.checkbox input');

    $(checkBox).each(function () {
        customOneCheckbox(this);
    });
}

function customOneCheckbox(aObject) {
    var checkBox = aObject;

    $(checkBox).each(function () {
        if ($(this).parent().is("span.custom-checkbox")) {
            $(this).unwrap();
        }
        $(this).wrap("<span class='custom-checkbox'></span>");
        if ($(this).is(':checked')) {
            $(this).parent().addClass("selected");
        }
    });

    $(checkBox).parent(".checkbox label").css('padding-left', '10px');

    $(checkBox).not('[readonly]').off('click.custom-form-element');
    $(checkBox).not('[readonly]').on('click.custom-form-element', function () {
        $(this).parent().toggleClass("selected");
    });

    $(checkBox).focusout(function () {
        if ($(this).parent().is("span.custom-checkbox")) {
            $(this).parent("span.custom-checkbox").removeClass("custom-checkbox-focused");
        }
    });
    $(checkBox).focus(function () {
        if ($(this).parent().is("span.custom-checkbox")) {
            $(this).parent("span.custom-checkbox").addClass("custom-checkbox-focused");
        }
    });
}

/* Fix ie double click */
$('#objectId').on('click', function (event) {
    var parent = $(this).parent("span.custom-checkbox");

    if (parent.hasClass('.custom-checkbox-focused')) {
        return; // Do nothing (checkbox)
    }
    $(':checkbox', this).each(function () {
        this.checked = !this.checked; // Swap check state
    }).trigger('change');


}).on('change', function (event) {

    var $this = $(this);
    $(this).parent().toggleClass("selected");
    if (this.checked) {
        //logica
    } else {
        //logica           
    }
});



$(document).ready(function () {
    customCheckbox();
});