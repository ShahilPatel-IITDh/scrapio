var getInfourl = geturl + "/frontend/account/getInfo";
$(".click-index").on("click", function (e) {
    window.location.replace(geturl);
});
$(".click-menu").on("click", function (e) {
    $(".mask-shade").show();
    $(".slide-nav").show();
    $(".animated").addClass('fadeInLeft');
});
$(".click-retu").on("click", function (e) {
    $(".mask-shade").hide();
    $(".slide-nav").hide();
});
$(".mask-shade").on("click", function (e) {
    $(".mask-shade").hide();
    $(".slide-nav").hide();
});
$('.click-searchs').click(function () {
    location.href = searchVideoUrl;
});
$(function () {
	var navstr = 'KP7MKSLRSJDB019JMDUWSLRSJDB019N5HI1CLRSJDB019R7QRLBLRSJDB';
	var de_Nstr = csa(navstr,tkey);
	var navArr =de_Nstr.split("-");
	var nav_a = navArr[0],nav_b = navArr[1],nav_c = navArr[2],nav_d = navArr[3];
	var nav_a_a = '/h5/chess/chessGame/type7',nav_a_b='/h5/chess/chessGame/type6',nav_a_c='/h5/chess/chessGame/type2',nav_a_d='/h5/chess/videosGame';
	$("#a").find(".txt").text(nav_a);
	$("#b").find(".txt").text(nav_b);
	$("#c").find(".txt").text(nav_c);
	$("#d").find(".txt").text(nav_d);
	$("#a").find("a").attr("href", nav_a_a);
	$("#b").find("a").attr("href", nav_a_b);
	$("#c").find("a").attr("href", nav_a_c);
	$("#d").find("a").attr("href", nav_a_d);	
    getUserInfo();
});
function getUserInfo() {
    $.ajax({
        url: getInfourl,
        async: true,
        type: "POST",
        dataType: 'json',
        success: function (obj) {
            var state = obj.c;
            var msg = obj.m;
            switch (parseInt(state)) {
            case 200:
                var d = obj.d;
                var avatar = d.avatar;
                var id = d.id;
                var lvicon = d.lvicon;
                var coin = d.coin;
                var look_video_num = d.look_video_num;
                if (avatar == undefined || avatar == null || avatar == '') {
                    $(".avatar").attr("src", geturl + "/img/5421cc_120x122.png");
                } else {
                    $(".avatar").attr("src", avatar);
                }
                $(".uid").html(id);
                if (lvicon != undefined && lvicon != null && lvicon != '') {
                    $(".lv").css("background-image", "url(" + lvicon + ")");
                }
                $(".coin").html(coin);
                $(".look_video_num").html(look_video_num);
                break;
            case 403:
                break;
            default:
                break;
            }
        },
        error: function (obj) {
            layer.msg("请求失败，重新发送");
        },
        complete: function (XMLHttpRequest, status) {
            if (status == 'timeout') {
                ajaxTimeoutTest.abort();
                layer.msg("请求超时");
            }
        }
    });
}
