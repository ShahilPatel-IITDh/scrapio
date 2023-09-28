
    function ShowCheck_news(src) {

        $(src).parent().find("a").removeClass("cur");
        $(src).addClass("cur");
        var Index = $(src).attr("id");
        Index = Index.substring(3, Index.length);

        var ShowIndex = "#nhk" + Index
        $("#new1").find(".news_m").hide();
        $("#new1").find("#thk" + Index).addClass("cur");

        $("#new1").find("#nhk" + Index).show();


    }
    var CheckIndex = "0";

    //默认样式

    $("#new1").find("#thk" + CheckIndex).addClass("cur");
    $("#new1").find("#nhk" + CheckIndex).show();
   
    
