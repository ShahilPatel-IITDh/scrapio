function excutenum() {
    return Math.floor(10 * Math.random())
}

function excutenum1_6() {
    return Math.floor(6 * Math.random())
}

function kuaicase(n) {
    switch (n) {
        case 1:
            return "0px";
        case 2:
            return "-43px";
        case 3:
            return "-86px";
        case 4:
            return "-129px";
        case 5:
            return "-172px";
        case 6:
            return "-215px"
    }
}

var animateMethod = {}, intervalSsc = null, animateID = {}, time = 600, pk10animate = !1, pkid, publicHeadOrf = {};
animateMethod.loadingList = function (n, i) {
    i ? $(n).append('<div id="loadingbox"></div>') : $(n).find("#loadingbox").remove()
}, animateMethod.pk10OpenAnimate = function (n) {
    var i = 600;
    $(n + " .numberbox").find("li");
    $(n).find(".opentyle").show(), $(n).find(".cuttime").hide();
    var e = setInterval(function () {
        var e = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], a = [];
        i--;
        for (var t = 0; t < 10; t++) {
            var r = Math.floor(Math.random() * e.length);
            a[t] = e[r], e.splice(r, 1)
        }
        for (var l = "", d = 0; d < 10; d++) {
            var o = a[d] < 10 ? "numsm0" + a[d] : "numsm" + a[d];
            l += 9 == d ? "<li style='margin-right: 0px;' class='" + o + "'></li>" : "<li class='" + o + "'></li>"
        }
        $(n).find(".numberbox").empty(), $(n).find(".numberbox").append(l), 100 == i && $("#waringbox").show(300)
    }, 100);
    animateID[n] = e
}, animateMethod.pk10OpenAnimate_GaryAddIndex = function (n) {
    var i = 600;
    $(n + " .numberbox").find("li");
    $(n).find(".opentyle").show(), $(n).find(".cuttime").hide();
    var e = setInterval(function () {
        var e = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], a = [];
        i--;
        for (var t = 0; t < 10; t++) {
            var r = Math.floor(Math.random() * e.length);
            a[t] = e[r], e.splice(r, 1)
        }
        for (var l = "", d = 0; d < 10; d++) {
            var o = a[d] < 10 ? "nub0" + a[d] : "nub" + a[d];
            l += 9 == d ? "<li style='margin-right: 0px;' class='" + o + "'></li>" : "<li class='" + o + "'></li>"
        }
        $(n).find(".numberbox").empty(), $(n).find(".numberbox").append(l), 100 == i && $("#waringbox").show(300)
    }, 100);
    animateID[n] = e
}, animateMethod.pk10end = function (n, i) {
    var e, i = i, a = (n = n).length, t = 0, r = $(i).find(".numberbox");
    pk10animate && i == pkid || ($(r).empty(), e = setInterval(function () {
        pkid = i, pk10animate = !0;
        var l = "";
        if (t < a) {
            t == a - 1 && (l = "li_after");
            var d = "<li class='numsm" + n[t] + " " + l + "'><i style='font-size:10px; display:none'>" + n[t] + "</i></li>";
            $(r).append(d), t += 1
        } else clearInterval(e), pk10animate = !1
    }, 60), $(i).find(".opentyle").hide(), $(i).find(".cuttime").show(), $("#waringbox").hide("200"))
}, animateMethod.pk10end_GaryAddIndex = function (n, i) {
    var e, i = i, a = (n = n).length, t = 0, r = $(i).find(".numberbox");
    pk10animate && i == pkid || ($(r).empty(), e = setInterval(function () {
        pkid = i, pk10animate = !0;
        var l = "";
        if (t < a) {
            t == a - 1 && (l = "li_after");
            var d = "<li class='nub" + n[t] + " " + l + "'><i style='font-size:10px; display:none'>" + n[t] + "</i></li>";
            $(r).append(d), t += 1
        } else clearInterval(e), pk10animate = !1
    }, 60), $(i).find(".opentyle").hide(), $(i).find(".cuttime").show(), $("#waringbox").hide("200"))
}, animateMethod.sscAnimate = function (n) {
    "#klsf" == n || "gdklsf" == n || "#egxy" == n ? $(n).find(".numred").removeClass("numred") : "#gxklsf" == n && ($(n).find(".numred").removeClass("numred"), $(n).find(".numgreen").removeClass("numgreen"));
    var i = $(n).find(".kajianhao"), e = 600;
    $(n).find(".opentyle").show(), $(n).find(".cuttime").hide();
    var a = setInterval(function () {
        $(n).find(".kajianhao li:last-child").css({"margin-right": "0"});
        var a = $(i).find("li").length;
        e--;
        for (var t = 0; t < a; t++) {
            $(i).find("li").eq(t).css({paddingTop: "0px"}), $(i).find("li").eq(t).css({lineHeight: "0px"}), $(i).find("li").eq(t).text(excutenum());
            var r = 50 * excutenum();
            $(i).find("li").eq(t).stop().animate({paddingTop: "35px"}, r), $(i).find("li").eq(t).stop().animate({lineHeight: "60px"}, 100)
        }
        100 == e && $("#waringbox").show(300)
    }, 100);
    animateID[n] = a
}, animateMethod.sscAnimateEnd = function (n, i) {
    n = n.split(",");
    var e = $(i).find(".kajianhao");
    $(e).find("li").removeClass("numred");
    for (var a = 0, t = n.length; a < t; a++) {
        "#gxklsf" != i && n[a] >= 19 && $(e).find("li").eq(a).addClass("numred");
        a < n.length && $(e).find("li:last-child").css({"margin-right": "0"});
        $(e).find("li").eq(a).css({paddingTop: "0px"}), $(e).find("li").eq(a).text(n[a]);
        var r = 50 * excutenum();
        $(e).find("li").eq(a).stop().animate({lineHeight: "36px"}, r)
    }
    $("#waringbox").hide("200")
}, animateMethod.hk6Animate = function(n){
    var i = $(n).find(".kajianhao"), e = 600;
    $(n).find(".opentyle").show(), $(n).find(".cuttime").hide();
    var a = setInterval(function () {
        $(n).find(".kajianhao li:last-child").css({"margin-right": "0"});
        var a = $(i).find("li.numblueHead").length;
        e--;
        for (var t = 0; t < a; t++) {
            $(i).find("li.numblueHead").eq(t).css({paddingTop: "0px"}), $(i).find("li.numblueHead").eq(t).css({lineHeight: "0px"}), $(i).find("li.numblueHead").eq(t).text(excutenum());
            var r = 50 * excutenum();
            $(i).find("li.numblueHead").eq(t).stop().animate({paddingTop: "35px"}, r), $(i).find("li.numblueHead").eq(t).stop().animate({lineHeight: "60px"}, 100)
        }
        100 == e && $("#waringbox").show(300)
    }, 100);
    animateID[n] = a
},animateMethod.hk6AnimateEnd = function (data, i) {
    var n = data.preDrawCode.split(",");
    var e = $(i).find(".kajianhao");
    $(e).find("li.numblueHead").removeClass("numred");
    $(e).find("li.numblueHead").removeClass("numblue");
    $(e).find("li.numblueHead").removeClass("numgreen");
    for (var a = 0, t = n.length; a < t; a++) {
        switch (data.color[a]) {
            case 1:
                $(e).find("li.numblueHead").eq(a).addClass("numred");
                break;
            case 2:
                $(e).find("li.numblueHead").eq(a).addClass("numgreen");
                break;
            case 3:
                // $(e).find("li").eq(a).addClass("numblue");
                break;
        }
        $(e).find("li.numblueHead").eq(a).css({paddingTop: "0px"});
        $(e).find("li.numblueHead").eq(a).text(n[a]);
        $(e).find("li.zodiac").eq(a).text(data.czAndFe[a]);
        var r = 50 * excutenum();
        $(e).find("li.numblueHead").eq(a).stop().animate({lineHeight: "36px"}, r)
    }
    $("#waringbox").hide("200")
}, animateMethod.kuai3Animate = function (n) {
    var i = 600;
    $(n).find(".opentyle").show(), $(n).find(".cuttime").hide(), intervalSsc = setInterval(function () {
        i--;
        for (var e = 0, a = $(n).find(".kajianhao li").length; e < a; e++) {
            var t = excutenum1_6();
            $(n).find(".kajianhao li").eq(e).className = "num" + 1 * t + 1;
            var r = 1 * t, l = kuaicase(1 * excutenum1_6() + 1);
            $(n).find(".kajianhao li").eq(e).stop().animate({backgroundPositionY: l}, r)
        }
        100 == i && $("#waringbox").show(300)
    }, 100), animateID[n] = intervalSsc
}, animateMethod.kuai3AnimateEnd = function (n, i) {
    for (var e = 0, a = (n = n.split(",")).length; e < a; e++) {
        $(i).find("li").eq(e).css({paddingTop: "0px"}), $(i).find("li")[e].className = "num" + n[e], $($(i).find("li")[e]).css({"background-position-y": ""});
        var t = 50 * excutenum();
        $(i).find("li").eq(e).stop().animate({lineHeight: "36px"}, t)
    }
    $("#waringbox").hide("200")
}, animateMethod.cqncAnimate = function (n) {
    var i = 600, e = $(n).find(".kajianhao ul");
    $(n).find(".opentyle").show(), $(n).find(".cuttime").hide(), intervalSsc = setInterval(function () {
        var n = [1, 2, 3, 4, 5, 6, 7, 8], a = [];
        i--;
        for (var t = 0; t < 10; t++) {
            var r = Math.floor(Math.random() * n.length);
            a[t] = n[r], n.splice(r, 1)
        }
        for (var l = "", d = 0; d < 10; d++) l += "<li class='ncnum0" + a[d] + "'></li>";
        $(e).empty(), $(e).append(l), 100 == i && $("#waringbox").show(300)
    }, 100), animateID[n] = intervalSsc
}, animateMethod.cqncAnimateEnd = function (n, i) {
    var i = i, e = (n = n.split(",")).length, a = 0, t = $(i).find(".kajianhao ul");
    $(t).html("");
    var r = setInterval(function () {
        if (a < e) {
            var i = "<li class='ncnum" + n[a] + "'><i style='font-size:10px;display:none'>" + n[a] + "</i></li>";
            $(t).append(i), a++
        } else clearInterval(r)
    }, 100);
    $(i).find(".opentyle").hide(), $(i).find(".cuttime").show(), $("#waringbox").hide("200")
}, animateMethod.cqncAnimateEnd_GaryAddNotUl = function (n, i) {
    var i = i, e = (n = n.split(",")).length, a = 0, t = $(i).find(".kajianhao");
    $(t).html("");
    var r = setInterval(function () {
        if (a < e) {
            var i = "<li class='ncnum" + n[a] + "'><i style='font-size:10px;display:none'>" + n[a] + "</i></li>";
            $(t).append(i), a++
        } else clearInterval(r)
    }, 100);
    $(i).find(".opentyle").hide(), $(i).find(".cuttime").show(), $("#waringbox").hide("200")
};