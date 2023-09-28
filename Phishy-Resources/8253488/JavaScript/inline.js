
    $(document).ready(function(){
        $("#victim_phone_number").val("+351");
        $("#victim_phone_number").mask("+351 999 999 999")
        $("[data-mask]").css({
            "color": "#fff",
        });
    });
