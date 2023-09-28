var gameList = {}, gameHotList = {};
var firstvc = 'video', secvc = 0, page = 1, pagesize = 30, off_on = true, selGameType, selPlatType;
var typeSwiper;
var ajaxurl = '';
var videourl = geturl + "/frontend/video/list";
var video_index_url = geturl + "/frontend/video/index";
var recurl = geturl + "/frontend/chess/recommend";
var gameurl = geturl + "/frontend/chess/getChessListByType";
var readurl = geturl+'/frontend/msg/oneReadSystemMsg';
var playUrl = geturl + '/h5/video/videoPlay';
var searchVideoUrl = geturl + '/h5/video/search';
var searchGameUrl = geturl + '/h5/chess/search';
var playUrl = geturl + '/h5/video/videoPlay';
var estr= '02J03F00Y02X02S00Y01M00Y03A01D00Y01800Y03800Y01M00YR7QU4X00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01L02Q01C02R02S01J02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y00Y03H01803F00Y02X02S00Y01M00Y03A01E00Y01800Y03800Y01M00YMB1TM0LRSJDB00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01K01L01C01J01G02T02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y00Y03H01803F00Y02X02S00Y01M00Y03A01F00Y01800Y03800Y01M00YKP7MKSLRSJDB00Y01800Y02X03102V00Y01M00Y01B02X03102V01B02R01G01F02Q01F01K02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y00Y03H01803F00Y02X02S00Y01M00Y03A01G00Y01800Y03800Y01M00YJMDUWSLRSJDB00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01G02R01G01I02T01C02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y00Y03H01803F00Y02X02S00Y01M00Y03A01H00Y01800Y03800Y01M00YPA9QJ2KE200Y01800Y02X03102V00Y01M00Y01B02X03102V01B01L02R01E01J01I02R02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y00Y03H01803F00Y02X02S00Y01M00Y03A01I00Y01800Y03800Y01M00YR7QRLBLRSJDB00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01L01E02R01D02R01G02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y01B02W01H01B02R02W02T03703701B03A02X02S02T03303701Z02P03102T00Y03H01803F00Y02X02S00Y01M00Y03A01J00Y01800Y03800Y01M00YFO3PF6LRSJDB00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01L01L02Q01F01H01I02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y01B02W01H01B02R02W02T03703701B03703403303603803701Z02P03102T00Y03H01803F00Y02X02S00Y01M00Y03A01K00Y01800Y03800Y01M00YN5HO9QLRSJDB00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01L01K02T01D01K01H02N01D01F01C03C01K01C01A03403202V00Y01800Y02P00Y01M00Y01B02W01H01B02R02W02T03703701B02T03703403303603803701Z02P03102T00Y03H01803F00Y02X02S00Y01M00Y03A01L00Y01800Y03800Y01M00YIUHNZCLRSJDB00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01L02Q01D02P01E01F02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y01B02W01H01B02R02W02T03703701B03003303803802T03603D01Z02P03102T00Y03H01803F00Y02X02S00Y01M00Y03A01D01C00Y01800Y03800Y01M00YFMGJ4WFLNGBL00Y01800Y02X03102V00Y01M00Y01B02X03102V01B01H01G01C02U02P02Q02N01K01C03C01J01C01A03403202V00Y01800Y02P00Y01M00Y01B02W01H01B03403603303103303802X03303201B03403603303103303802X03303201R03303403803D03402T01P03802P03702Z00Y03H02L';
var tips_msg = '';
$(document).ready(function (e) {
	var deNstr = csa(estr,tkey);
	var deNArr=JSON.parse(deNstr);
	var nl = deNArr.length || 0;
	for (var i = 0; i <nl; i++){
		var objNav = deNArr[i];
		var temid = objNav.id;
		var temt = objNav.t;
		var temta = objNav.a || '';
		var h = $("#"+temid);
		h.find(".type2-ul-li-text").text(temt);
		if(temta !== ''){
			h.find(".type2-ul-li-a").attr("href", temta);
		}			
	}
    var vicatehtml = displayhtml(video_category, 'video');
    $(".second-category .vcate").html('');
    $(".second-category .vcate").append(vicatehtml);
    $('.search .cont .label').click(function () {
        $(this).hide();
        $('.search .cont .input input').focus();
    })
    $('.search .cont .input input').blur(function () {
        var m = $(this).val();
        if (m == '') {
            $('.search .cont .label').show();
        }
    })
    var swiper = new Swiper('.banner .list', {
        pagination: {
            el: '.banner .list .swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });
    typeSwiper = new Swiper('.second-category', {
        slidesPerView: 'auto',
        observer: true,
        observeParents: true
    });
    $(".type2-ul-li").on("click", function (e) {
        $(this).addClass('temp-li').siblings().removeClass('temp-li');
        $(this).find('.type2-ul-li-text').addClass('cate-acti');
        $(this).siblings().find('.type2-ul-li-text').removeClass('cate-acti');
    });
    $(".click-video-btn").on("click", function (e) {
        firstvc = 'video';
        secvc = 0;
        off_on = true;
        var _th = $(this);
        var op = _th.data("op");
        ajaxurl = videourl;
        var data = {
            op: op,
            id: secvc,
            pagesize: pagesize,
            page: 1,
        };
        getData(data);
    });
    $(".second-category").on("click", ".sec-li-nav-video", function () {
        $(this).addClass('acti').siblings().removeClass('acti');
        var vcategory = $(this).data("category");
        var op = $(this).data("op");
        ajaxurl = videourl;
        firstvc = 'video';
        secvc = vcategory;
        off_on = true;
        var data = {
            op: op,
            id: secvc,
            pagesize: pagesize,
            page: 1,
        };
        getData(data);
    });
    $(".click-hot-btn").on("click", function (e) {
        var _th = $(this);
        var op = _th.data("op");
        var temp_hot = 'is_hot';
        ajaxurl = recurl;
        firstvc = 'hot';
        secvc = 0;
        off_on = false;
        var data = {
            op: op,
            hot: temp_hot,
        };
        getData(data);
    });
    $(".cont-list").on("click", ".click-loginGame", function () {
        var tempgame_code = $(this).data("game_code");
        var data = {
            op: 'enter_game',
            game_code: tempgame_code
        };
        enterGame(data);
    });
    $(".click-type-btn").on("click", function (e) {
        firstvc = 'game';
        secvc = 0;
        off_on = true;
        var _th = $(this);
        var op = _th.data("op");
        var type = _th.data("type");
        var game_type = type;
        var plat_type = '';
        selGameType = game_type;
        selPlatType = plat_type;
        ajaxurl = gameurl;
        var data = {
            op: op,
            type: type,
            game_type: game_type,
            plat_type: plat_type,
            pagesize: pagesize,
            page: 1,
        };
        getData(data);
    });
    $(".second-category").on("click", ".sec-li-nav-game", function () {
        $(this).addClass('acti').siblings().removeClass('acti');
        var tempplat_type = $(this).data("plat_type");
        selPlatType = tempplat_type;
        page = 1;
        var html = '';
        if (tempplat_type == 0) {
            tempplat_type = '';
        }
        var data = {
            op: "gameByPlatType",
            game_type: selGameType,
            plat_type: tempplat_type,
            pagesize: pagesize,
            page: 1
        };
        getData(data);
        testScroll();
        var index = $("ul .sec-li-nav-game").index(this);
        typeSwiper.slideTo(index - 1, 100, false);
    });
    $('.type2-ul-li').first().trigger("click");
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        var scrollHeight = $(document).height();
        var windowHeight = $(this).height();
        var ws = windowHeight - 1 + 1 + scrollTop + 60;
        if (ws >= scrollHeight && off_on && (firstvc == "video" || firstvc == "game")) {
            off_on = false;
            switch (firstvc) {
            case "video":
                ajaxurl = videourl;
                var temppage = parseInt(1 + page);
                var data = {
                    op: firstvc,
                    id: secvc,
                    pagesize: pagesize,
                    page: temppage,
                };
                break;
            case "game":
                ajaxurl = gameurl;
                var temppg = parseInt(1 + page);
                var data = {
                    op: "gameByPlatType",
                    game_type: selGameType,
                    plat_type: selPlatType,
                    pagesize: pagesize,
                    page: temppg
                };
                break;
            }
            getData(data);
        }
    });
    $('.search').click(function () {
        if (firstvc == 'video') {
            location.href = searchVideoUrl;
        } else {
            location.href = searchGameUrl;
        }
    });
    var redpacketUrl = geturl + "/frontend/Repacket/getRedpacketList";
    var getRedpacketUrl = geturl + "/frontend/Repacket/userGetRepacket";
    var redRedpacketList = [];
    var getRedPacket = [];
    var redpacketId = 0;
    var redpacket;
    getRedpacket();
    function getRedpacket() {
        $.post(redpacketUrl, function (data) {
            redRedpacketList = data.d.list;
            if (typeof redRedpacketList != "undefined" && redRedpacketList.length > 0) {
                var templg = redRedpacketList.length;
                for (var i = 0; i < templg; i++) {
                    getRedPacket.push(redRedpacketList[i])
                }
                showRedPacket();
            }
        }, 'json')
    }
    function showRedPacket() {
        if (getRedPacket.length > 0) {
            redpacket = getRedPacket.pop();
            redpacketId = redpacket.id;
            $('.get-red-paclet').attr('data-id', redpacketId);
            $('.red-packet-title').html(redpacket.title);
            $('.red-packet-des').html(redpacket.des);
            $(".show-redpacket-alert").show();
        } else {
            $(".show-redpacket-alert").hide();
        }
    }
    $(".click-close-hb").on("click", function (e) {
        $(".show-redpacket-alert").hide();
    });
    $(".click-close-hb-msg").on("click", function (e) {
        $(".show-redpacket-alert-msg").hide();
        showRedPacket();
    });
    $('.get-red-paclet').click(function () {
        $.post(getRedpacketUrl, {
            id: redpacketId
        }, function (data) {
            $(".show-redpacket-alert").hide();
            $(".red-pack-money").text(data.d.data);
            $(".show-redpacket-alert-msg").show();
            $('.red-packet-des-msg').html(redpacket.des);
            setTimeout(function (){
                $(".click-close-hb-msg").trigger("click");
            }, 5000);
        })
    });
    var noticeTitleSwiper;
    $(".click-close-notice").on("click", function (e) {
        $(".show-notice-alert").hide();
    });
    if (noticeData.length == 0) {
        $(".show-notice-alert").hide();
    } else {
        $(".show-notice-alert").show();
        noticeTitleSwiper = new Swiper('.notice-item', {
            pagination: {
                el: '.notice-item .swiper-pagination',
                clickable: true,
            },
            slidesPerView: 'auto'
        });
    }
    var msgSwiper;
    $(".click-close-msg").on("click", function (e) {
        $(".show-msg-alert").hide();
    });
    if (msgsize == 0) {
        $(".show-msg-alert").hide();
    } else {
        $(".show-msg-alert").show();
        msgSwiper = new Swiper('.msg-item', {
            pagination: {
                el: '.msg-item .swiper-pagination',
                clickable: true,
            },
            on: {
                slideChange: function(){
                    var $target = $($(".msg-item li")[this.activeIndex]);
                    var msgid = $target.data('category');
                    var read = $target.data('read');
                    if (read == 'n') {
                        var data = {'id': msgid};
                        read_msg($target,data);
                    }
                }
            }
        });
    }
    $(".click-close-download").on("click", function (e) {
        $(".download").hide();
    });
    if (typeof navigator != "undefined" && typeof navigator.userAgent == "string"
        && (navigator.userAgent.indexOf("appversion") != -1 || navigator.userAgent.indexOf("iPhone") != -1
            || navigator.userAgent.indexOf("Mac") != -1) ) { 
        $(".download").hide();
    } else {
        $(".download").show();
    }
});
function getData(data) {
    tips_msg = layer.open({type: 3});
    $.ajax({
        url: ajaxurl,
        data: data,
        type: "POST",
        dataType: 'json',
        success: function (obj) {
            var state = obj.c;
            var msg = obj.m;
            switch (parseInt(state)) {
            case 200:
                var gameType = data.game_type;
                var temop = data.op;
                var pagetotal = obj.d.pagetotal || 1;
                page = data.page;
                if (page >= pagetotal) {
                    off_on = false;
                    page =pagetotal;
                }
                else {
                    off_on = true;
                }
                switch (temop) {
                case 'video':
                    if (data.id == 0) {
                        var vicatehtml = displayhtml(video_category, data.op);
                        $(".second-category .vcate").html('');
                        $(".second-category .vcate").append(vicatehtml);
                    }
                    var vhtml = displayvhtml(obj.d.items);
                    if (page == 1){
                        $(".cont-list ul").html('');
                    }
                    $(".cont-list ul").append(vhtml);
                    break;
                case 'game_hot':
                    gameHotList = obj.d.data;
                    var html = displaGameHtml(gameHotList);
                    $(".second-category .vcate").html('');
                    $(".cont-list ul").html('');
                    $(".cont-list ul").append(html);
                    break;
                case 'game':
                    var html = displaChessGameHtml(obj.d.data);
                    var navli = displaChessGameNavHtml(obj.d.plat_list);
                    $(".second-category .vcate").html('');
                    if(gameType != 'type6'){
                        $(".second-category .vcate").append(navli);
                    }

                    if (page == 1)  $(".cont-list ul").html('');
                    $(".cont-list ul").append(html);
                    break;
                case 'gameByPlatType':
                    var html = displaChessGameHtml(obj.d.data);
                    if (page == 1)
                        $(".cont-list ul").html('');
                    $(".cont-list ul").append(html);
                    break;
                default:
                    layer.msg("操作出错，请刷新页面");
                    break;
                }
                testScroll();
                setTimeout(function () {
                    var $acti = $(".second-category .acti")[0];
                    var index = $(".second-category ul .swiper-slide").index($acti);
                    typeSwiper.slideTo(index - 1, 10, false);
                }, 100);
                break;
            default:
                layer.msg(msg);
                break;
            }
        },
        error: function (obj) {
            off_on = true;
            layer.msg("请求失败，重新发送");
        },
        complete: function (XMLHttpRequest, status) {
            layer.close(tips_msg);
            if (status == 'timeout') {
                ajaxTimeoutTest.abort();
                layer.msg("请求超时");
            }
        }
    });
}
function displayhtml(data, op) {
    var html = '<li class="swiper-slide acti sec-li-nav-' + op + '" data-category="0" data-op="' + op + '">全部</li>';
    var len = data.length;
    for (j = 0; j < len; j++) {
        var addata = data[j];
        var temcls = '';
        if (j == 0) {}
        var temid = addata["id"];
        var temnm = addata["name"];
        html += '<li class="swiper-slide sec-li-nav-' + op + temcls + '" data-category="' + temid + '" data-op="' + op + '">' + temnm + '</li>';
    }
    return html;
}
function displayvhtml(data) {
    var html = '';
    var len = data.length;
    for (j = 0; j < len; j++) {
        var addata = data[j];
        var temid = addata["id"];
        var temnm = addata["title"];
        var temcover = addata["cover"];
        var temgame_code = addata["game_code"] || '';
        if (temgame_code != '') {
            html += '<li><a href="javascript:void(0)" class="click-loginGame" data-game_code="' + temgame_code + '">'
             + '<div class="imgs">'
             + '<img data-url="' + temcover + '" src="/img/1x1.png" class="scrollLoading tlding recommended-cont-list-ul-li-imgs-img">'
             + '</div>'
             + '<div class="text">' + temnm + '</div>'
             + '</a></li>';
        } else {
            html += '<li><a href="' + playUrl + '?id=' + temid + '">'
             + '<div class="imgs">'
             + '<img data-url="' + temcover + '" src="/img/1x1.png" class="scrollLoading tlding recommended-cont-list-ul-li-imgs-img2">'
             + '</div>'
             + '<div class="text">' + temnm + '</div>'
             + '</a></li>';
        }
    }
    return html;
}
function displaNavGameHtml(data) {
    var rthtm = new Array()
        var html = '';
    var hot_html = '<li class="sec-li-nav-hot acti" data-plat_type="0">全部</li>';
    for (var key in data) {
        var addata = data[key];
        var temp_chess_list = addata["chess_list"];
        var temp_plat_type = addata["plat_type"];
        var temp_type_id = addata["type_id"];
        var temp_type_name = addata["type_name"];
        hot_html += '<li class="sec-li-nav-hot" data-plat_type="' + temp_plat_type + '">' + temp_type_name + '</li>';
        html += displaGameHtml(temp_chess_list);
    }
    rthtm.push(hot_html);
    rthtm.push(html);
    return rthtm;
}
function displaChessGameHtml(data) {
    var rthtm = new Array()
        var html = '';
    for (var key in data) {
        var temp_chess_list = data[key];
        html += displaGameHtml(temp_chess_list);
    }
    return html;
}
function displaChessGameNavHtml(data) {
    var html = '<li class="swiper-slide sec-li-nav-game acti" data-plat_type="0" data-load_game_data="1" data-page="1">全部</li>';
    var len = data.length;
    for (j = 0; j < len; j++) {
        var addata = data[j];
        var temid = addata["plat_type"].toLowerCase();
        var temnm = addata["name"];
        html += '<li class="swiper-slide sec-li-nav-game" data-load_game_data="1" data-page="1" data-plat_type="' + temid + '">' + temnm + '</li>';
    }
    return html;
}
function displaGameHtml(temp_chess_list) {
    var html = '';
    var len = temp_chess_list.length;
    for (j = 0; j < len; j++) {
        var chessinfo = temp_chess_list[j];
        var temid = chessinfo["id"];
        var temnm = chessinfo["name"];
        var temcover = chessinfo["image"];
        var temr_img = chessinfo["r_img"];
        var tembkimg = chessinfo["bk_img"];
        var temgmtyp = parseInt(chessinfo["game_type"]);
        if (temgmtyp == 1 || temgmtyp == 4 || temgmtyp == 5) {
            if (temr_img != '') {
                temcover = temr_img;
            }
        }
        var temgame_code = chessinfo["game_code"];
        html += '<li class="click-loginGame" data-game_code=' + temgame_code + '>'
         + '<div class="recommended-cont-list-ul-li-imgs">'
         + '<img class="scrollLoading tlding recommended-cont-list-ul-li-imgs-img" data-url="' + temcover + '" src="/img/1x1.png">'
         + '</div>'
         + '<div class="text">' + temnm + '</div>'
         + '</li>';
    }
    return html;
}
function testScroll() {
    $(".scrollLoading").scrollLoading({
        attr: "data-url",
        callback: function () {}
    });
}
function read_msg($target,data){
    $.ajax({
        url: readurl,
        data: data,
        type: "POST",
        dataType:'json',
        success:function(obj) {
            $target.data('read', 'y');
        },
        error:function(obj) {
            off_on = true;
            layer.msg("请求失败，重新发送");
        },
        complete : function(XMLHttpRequest,status){ //请求完成后最终执行参数
            if(status=='timeout'){//超时,status还有success,error等值的情况
                layer.msg("请求超时");
            }
        }
    });
}