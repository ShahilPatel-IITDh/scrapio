var schedule_template =
    '{{#item}}<div class="item {{activeClass}} {{liveClass}} {{canplayClass}}" data-id="{{item_id}}" data-frame="{{frame}}" data-date="{{dateplay}}" data-current="{{current}}" data-after="{{after}}" data-duration="{{duration}}" data-ott-url="{{ott_url}}">' +
    '<div class="time_line">{{frame}}</div>' +
    '<div class="program">' +
    '<span class="program_title">' +
    "{{program}}" +
    "{{#facebook}}" +
    "{{#facebook_url}}" +
    '<a href="{{facebook_url}}" target="_blank" class="program_icon fb"><img src="' +
    template_path +
    'Assets/img/fb_icon_16x16.png"/></a>' +
    "{{/facebook_url}}" +
    "{{/facebook}}" +
    "{{#youtube}}" +
    "{{#youtube_url}}" +
    '<a href="{{youtube_url}}" target="_blank" class="program_icon yt"><img src="' +
    template_path +
    'Assets/img/yt_icon_16x16.png"/></i></a>' +
    "{{/youtube_url}}" +
    "{{/youtube}}" +
    "{{#note}}" +
    '<span class="program_note">{{note}}</span>' +
    "{{/note}}" +
    "</span>" +
    "{{#description}}" +
    '<span class="program_desc">{{description}}</span>' +
    "{{/description}}" +
    "</div>" +
    '{{#canplay}}<div class="replay"><span class="program_note">Xem lại</span><span class="program_playing">Đang phát</span></div>{{/canplay}}' +
    "{{{liveTick}}}" +
    "</div>" +
    "{{/item}}";

function number_format(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function frame_to_time(frame, time_plus) {
    if (frame.indexOf(":") < 0) return "";
    var arr = frame.split(":");
    var hour = arr[0];
    var min = arr[1];
    var t = hour * 60 * 60 + min * 60 + Math.round(time_plus);

    h = floor(t / 3600);
    rm = t - h * 3600;

    m = floor(rm / 60);
    rm = rm - m * 60;

    s = round(rm, 3);
    s = number_format(s);

    //convert to 24h
    h = h >= 24 ? h - 24 : h;

    h = h < 10 ? "0".h : h;
    m = h < 10 ? "0".h : h;
    s = h < 10 ? "0".h : h;

    var time = h + ":" + m; // + ":" + s;
    return time;
}

function manual_sync(type) {
    type = type == undefined ? "video" : type;
    var $wrap = $("#schedule_" + type + "_item");
    var $el = $("#schedule_" + type + "_item .item.active");
    var $next_el = $("#schedule_" + type + "_item .item.active").next();
    var duration = parseInt($el.attr("data-duration"));
    var cur_time = Math.floor(Date.now() / 1000); //parseInt($el.attr('data-now'));
    var after_time = parseInt($el.attr("data-after"));
    var timewait = 10;
    if ($el.index() == $wrap.find(".item").length - 1) {
        return;
    }
    if (cur_time < after_time) {
        return;
    }
    if (window.manual_sync_timer != undefined)
        clearTimeout(window.manual_sync_timer);
    window.manual_sync_timer = setTimeout(function () {
        $wrap.find(".active").removeClass("active");
        $wrap
            .find(".item")
            .eq($el.index() + 1)
            .addClass("active");
        $wrap.mCustomScrollbar(
            "scrollTo",
            $wrap.find(".mCSB_container").find(".item.active")
        );
        manual_sync(type);
    }, timewait * 1000);
}

function auto_sync() {
    var type = "video";
    var ws = false;
    var host =
        location.hostname === "localhost" || location.hostname === "127.0.0.1"
            ? "localhost"
            : location.hostname;
    var port = 4000;
    var reconect_time = 10; //seconds
    var connected = false;

    var tryconnect = function () {
        if (connected) {
            clearTimeout(manual_sync_timer);
            return clearTimeout(reconect_timer);
        }
        window.reconect_timer = setTimeout(function () {
            console.log("Reconnecting...");
            manual_sync();
            connect();
        }, reconect_time * 1000);
    };
    var connect = function () {
        ws = new WebSocket("ws://" + host + ":" + port + "/");
        ws.onopen = function (event) {
            connected = true;
            console.log("Connected");
        };
        ws.onerror = function (event) {
            connected = false;
            console.log("Connect fail");
        };
        ws.onmessage = function (event) {
            var wsd = JSON.parse(event.data);
            type = wsd.type;
            var schedule_id = parseInt(
                $("#schedule_" + type + "_item").attr("data-schedule-id")
            );
            var file = wsd.file;
            var newurl = new URL(file);
            if (newurl.hostname != host) {
                newurl.hostname = host;
                file = newurl.href;
            }
            if (wsd.errCode) {
                $.ajax({
                    url: file,
                    type: "get",
                    dataType: "json",
                    success: function (jsond) {
                        //check schedule id match with jsondata
                        var item_id_arr = jsond[0].item_id.split("_");
                        if (schedule_id == parseInt(item_id_arr[0])) {
                            $("#schedule_" + type + "_item").mCustomScrollbar(
                                "destroy"
                            );
                            $("#schedule_" + type + "_item").html("");
                            Mustache.parse(schedule_template);
                            if (jsond.length) {
                                $.each(jsond, function (k, v) {
                                    var html_rendered = Mustache.render(
                                        schedule_template,
                                        { item: v }
                                    );
                                    $("#schedule_" + type + "_item").append(
                                        html_rendered
                                    );
                                });
                            }
                            $("#schedule_" + type + "_item").mCustomScrollbar({
                                scrollInertia: 300,
                                setHeight:
                                    $("#tab_schedule_" + type).height() -
                                    $(
                                        "#tab_schedule_" + type + " .nav"
                                    ).height() -
                                    $(
                                        "#tab_schedule_" +
                                            type +
                                            " .schedule_heading"
                                    ).height(),
                                callbacks: {
                                    onInit: function () {
                                        $(
                                            "#schedule_" + type + "_item"
                                        ).mCustomScrollbar(
                                            "scrollTo",
                                            $("#schedule_" + type + "_item")
                                                .find(".mCSB_container")
                                                .find(".item.active")
                                        );
                                    },
                                },
                            });
                        }
                    },
                });
            } else {
                console.log(wsd.errMsg);
            }
        };
        ws.onclose = function (event) {
            connected = false;
            tryconnect();
            console.log("Disconnected");
        };
        window.addEventListener("beforeunload", function () {
            ws.close();
        });
    };

    connect();
}

var video_player = null;
function video_load(video_src, video_type) {
    if (!video_player) {
        video_type == /(youtu\.be|youtube)/.test(video_src)
            ? "video/youtube"
            : "video/mp4";
        var yt_link =
            "https://www.youtube.com/watch?v=" + get_youtube_id(video_src);
        video_src = video_type == "video/youtube" ? yt_link : video_src;
        video_player = videojs("video_player", {
            width: "860",
            height: "480",
            controls: true,
            autoplay: true,
            fluid: true,
            preload: "metadata",
            techOrder: ["youtube", "html5"],
            youtube: { iv_load_policy: 1, ytControls: 2, modestbranding: 0 },
            playsinline: $.browser.safari ? true : false,
            muted: $.browser.mobile ? true : false,
            notSupportedMessage:
                "Không thể tải dữ liệu vì máy chủ mất kết nối hoặc do định dạng không được hỗ trợ.",
            sources: [
                {
                    src: video_src,
                    type: video_type,
                },
            ],
        });
        video_player.ready(function () {
            video_player = this;
            video_player.play();
        });
    } else {
        video_player.play();
    }

    var shareOptions = {
        socials: ["fbFeed", "tw", "messenger", "mail", "zalo"],

        url: window.location.href,
        title: "videojs-share",
        description: "video.js share plugin",
        image: video_livestream_snapshot,

        // required for Facebook and Messenger
        fbAppId: fbAppId,

        // required for zalo
        zaloAppId: zaloAppId,

        // optional for Facebook
        redirectUri: window.location.href + "#close",

        // optional for VK
        isVkParse: true,

        // optinal embed code
        embedCode:
            "<iframe src='" +
            window.location.href +
            "' width='560' height='315' frameborder='0' allowfullscreen></iframe>",

        beforeShare: function () {
            snapshotLiveStream(video_player);
        },
    };
    console.log(shareOptions);

    video_player.share(shareOptions);
}

function loadSchedule(element) {
    var type = "video";
    var d = element.data("date");
    $("#schedule_" + type + " .schedule_heading .item").removeClass("active");
    element.addClass("active");
    if ($.data(element.get(0), "schedule_items")) {
        var items = $.data(element.get(0), "schedule_items");
        var dateplay = moment(d).format("YYYY-MM-DD");
        // log(items);
        $("#schedule_" + type + "_item .item").remove();
        if (items.length) {
            Mustache.parse(schedule_template);
            $.each(items, function () {
                var html_rendered = Mustache.render(schedule_template, {
                    item: this,
                });
                $("#schedule_" + type + "_item .mCSB_container").append(
                    html_rendered
                );
                $("#schedule_" + type + "_item").mCustomScrollbar({
                    scrollInertia: 300,
                });
            });
        } else {
            $("#schedule_" + type + "_item .mCSB_container").html(
                '<div class="item"><span class="program">Không có dữ liệu!</span></div>'
            );
        }
        return true;
    }
    $.ajax({
        url: route("schedule/" + type + "/" + d),
        type: "post",
        dataType: "json",
        success: function (d) {
            $("#schedule_" + type + "_item .item").remove();
            if (d.errCode) {
                Mustache.parse(schedule_template);
                $.each(d.items, function () {
                    var html_rendered = Mustache.render(schedule_template, {
                        item: this,
                    });
                    $("#schedule_" + type + "_item .mCSB_container").append(
                        html_rendered
                    );
                    $("#schedule_" + type + "_item").mCustomScrollbar({
                        scrollInertia: 300,
                    });
                });
            } else {
                $("#schedule_" + type + "_item .mCSB_container").html(
                    '<div class="item">' + d.errMsg + "</div>"
                );
            }
            //set data
            $.data(element.get(0), "schedule_items", d.items);
        },
    });
}
$(function () {
    var video_src = $("#video_player").data("src"),
        video_type = $("#video_player").data("type");

    if (
        $("#video_player").length &&
        video_src != undefined &&
        video_type != undefined
    ) {
        video_load(video_src, video_type);
    }

    // maintabs
    if (Response.deviceW() > 768) {
        $.fn.matchHeight._afterUpdate = function (e, g) {
            if ($("#tab_schedule_video").length) {
                $("#schedule_video_item").mCustomScrollbar({
                    scrollInertia: 300,
                    setHeight:
                        $("#tab_schedule_video").height() -
                        $("#tab_schedule_video .nav").height() -
                        $("#tab_schedule_video .schedule_heading").height(),
                    advanced: {
                        updateOnSelectorChange: true,
                    },
                    callbacks: {
                        onUpdate: function () {
                            $("#schedule_video_item").mCustomScrollbar(
                                "scrollTo",
                                $("#schedule_video_item")
                                    .find(".mCSB_container")
                                    .find(".item.active")
                            );
                        },
                    },
                });
            }
        };
        if ($("#tab_schedule_video").length) {
            $("#tab_schedule_video").matchHeight({
                target: $("#tab_content"),
            });
        }
    } else {
        // if($('#schedule_video_item').length){
        //     $('#schedule_video_item').mCustomScrollbar({
        //         scrollInertia: 300,
        //         advanced:{
        //             updateOnSelectorChange: true
        //         },
        //         callbacks:{
        //             onUpdate: function(){
        //                 $('#schedule_video_item').mCustomScrollbar("scrollTo",$('#schedule_video_item').find('.mCSB_container').find('.item.active'));
        //             }
        //         }
        //     });
        // }
    }
});

function snapshotLiveStream(video_player) {
    var frame = captureVideoFrame(video_player.id(), "png");
    console.log(video_player.id());
    var image64 = frame.dataUri;
    uploadImage(image64);
}

function captureVideoFrame(video, format) {
    if (typeof video === "string") {
        video = document.getElementById(video);
    }
    video = document.getElementsByTagName("video")[0];
    format = format || "jpeg";
    console.log(video);
    if (!video || (format !== "png" && format !== "jpeg")) {
        return false;
    }

    var canvas = document.createElement("CANVAS");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    var dataUri = canvas.toDataURL("image/" + format);
    var data = dataUri.split(",")[1];
    var mimeType = dataUri.split(";")[0].slice(5);

    var bytes = window.atob(data);
    var buf = new ArrayBuffer(bytes.length);
    var arr = new Uint8Array(buf);

    for (var i = 0; i < bytes.length; i++) {
        arr[i] = bytes.charCodeAt(i);
    }

    var blob = new Blob([arr], { type: mimeType });

    return { blob: blob, dataUri: dataUri, format: format };
}

function base64ToBlob(base64, mime) {
    mime = mime || "";
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (
        var offset = 0, len = byteChars.length;
        offset < len;
        offset += sliceSize
    ) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mime });
}

function uploadImage(image64) {
    var base64ImageContent = image64.replace(
        /^data:image\/(png|jpg);base64,/,
        ""
    );
    var blob = base64ToBlob(base64ImageContent, "image/png");
    var formData = new FormData();
    formData.append("picture", blob);
    $.ajax({
        url: site_path + "api/snapshotLiveStream",
        data: formData,
        type: "post",
        dataType: "json",
        cache: false,
        contentType: false,
        processData: false,
        success: function (d) {
            if (d.errCode && d.image) {
                $('[property="og:image"]').attr("content", d.image);
                // $.ajax({
                //     type: 'get',
                //     url: 'https://developers.facebook.com/tools/debug/sharing/?q=' + document.location.href,

                // });
                // $.ajax({
                //     type: 'get',
                //     url: 'https://developers.zalo.me/tools/debug-sharing?q=' + document.location.href,

                // });
            }
        },
    });
}
$(function () {
    //replace audio & video in articles
    var player_id = 0;
    if ($(".block-detail .audio_player").length) {
        $(".block-detail .audio_player").each(function (k, v) {
            player_id++;
            var id = "player_" + player_id;
            var src = decodeURIComponent($(this).attr("data-src"));
            var type = $(this).attr("data-type");
            $(this).html(
                '<audio id="' +
                    id +
                    '" class="video-js vjs-btb-skin vjs-audio" controls preload="metadata"></audio>'
            );
            videojs(id, {
                width: 570,
                height: 100,
                controls: true,
                autoplay: false,
                fluid: $.browser.mobile ? true : false,
                preload: "metadata",
                techOrder: ["html5", "youtube"],
                sources: [{ type: type, src: src }],
            }).ready(function () {
                $("#" + id).prepend(
                    '<span class="videojs-info-title">' +
                        src.substring(
                            src.lastIndexOf("/") + 1,
                            src.lastIndexOf(".")
                        ) +
                        "</span>"
                );
            });
        });
    }

    if ($(".main-news .block-detail .video_player").length) {
        $(".main-news .block-detail .video_player").each(function (k, v) {
            player_id++;
            var id = "player_" + player_id;
            var src = $(this).attr("data-src");
            var type = $(this).attr("data-type");
            if (!/(http|https)/.test(src)) {
                src = document.location.origin + src;
            }
            $(this).replaceWith(
                '<video id="' +
                    id +
                    '" class="video-js vjs-btb-skin vjs-16-9" controls preload="metadata"></video>'
            );
            type = /(youtu\.be|youtube)/.test(src)
                ? "video/youtube"
                : "video/mp4";
            var yt_link =
                "https://www.youtube.com/watch?v=" + get_youtube_id(src);
            src = type == "video/youtube" ? yt_link : src;
            videojs(id, {
                width: 570,
                height: 360,
                controls: true,
                autoplay: false,
                fluid: $.browser.mobile ? true : false,
                preload: "metadata",
                techOrder: ["youtube", "html5"],
                sources: [{ type: type, src: src }],
            }).ready(function () {});
        });
    }

    //auto scale image size in article content
    if ($(".main-news .block-detail .block-content-wrapper").length) {
        var $img_els = $(".block-content-wrapper img");
        var imgs = [];

        if (Response.deviceW() < 768) {
            if ($(".main-news .block-detail .block-content img").length) {
                $(".main-news .block-detail .block-content img").each(function (
                    k,
                    v
                ) {
                    $(this).attr("style", "");
                });
            }
        }

        if ($img_els.length) {
            $img_els.each(function (k, el) {
                var img_src = $(this).attr("src");
                if (img_src != undefined && !/(http|https)/i.test(img_src)) {
                    img_src = site_path + img_src.replace(/^\/+$/g, "");
                    //rebuild attr src
                    $(this).attr("src", img_src);
                }
            });
            $img_els.each(function (k, v) {
                var text = "";
                text = $(this).closest("p").text();
                text =
                    text == "" || text == undefined
                        ? $(this).closest("p").next("p").text()
                        : text;
                text =
                    text == "" || text == undefined ? "Image " + (k + 1) : text;
                if ($(this).closest("div").hasClass("block-thumb")) {
                    text = $(".main-news .block-detail .block-heading").text();
                }
                imgs.push({
                    src: $(this).attr("src"),
                    opts: {
                        caption: text,
                        thumb: $(this).attr("src"),
                    },
                });
            });
        }

        $(".main-news .block-detail .block-content-wrapper img").click(
            function (e) {
                e.stopImmediatePropagation();
                var idx = $(
                    ".main-news .block-detail .block-content-wrapper img"
                ).index(this);
                $.fancybox.open(
                    imgs,
                    {
                        loop: true,
                    },
                    idx
                );
            }
        );
    }

    if ($(".main-news .block-detail .block-content iframe").length) {
        $(".main-news .block-detail .block-content iframe").each(function (
            k,
            el
        ) {
            var ifr_src = $(this).attr("src");
            if (!/(youtube.com|youtu.be)/.test(ifr_src)) {
                $(this).replaceWith(
                    '<div class="embed-responsive embed-responsive-16by9">' +
                        '<iframe class="embed-responsive-item" src="' +
                        ifr_src +
                        '?rel=0" allowfullscreen></iframe>' +
                        "</div>"
                );
            }
        });
    }

    //autosync
    if ($(".main-livestream").length) {
        // auto_sync();

        //get schedule by date
        $(".schedule_heading .item")
            .not("#item_prev,#item_next")
            .click(function (e) {
                loadSchedule($(this));
            });
    }

    var request_ott = false;
    // play ott
    $(document).on("click", "#schedule_video_item .item", function (e) {
        e.preventDefault();
        var self = $(this);
        if (!$(this).hasClass("live") && !$(this).hasClass("canplay")) {
            return showMessage("Không có chương trình phát lại");
        }
        if (request_ott) {
            return showMessage(
                "Hệ thống đang xử lý vui lòng đợi trong giây lát"
            );
        }
        //trigger ott live
        ott_url = $(this).attr("data-ott-url");
        video_type = "application/x-mpegURL";
        $("#schedule_video_item .item").removeClass("active");
        self.addClass("active");
        if (self.hasClass("live")) {
            video_src = ott_url;
            video_player.src(video_src);
            video_player.play();
        } else {
            if (ott_url != "") {
                $.ajax({
                    url: ott_url,
                    type: "GET",
                    beforeSend: function () {
                        request_ott = true;
                    },
                    success: function (d) {
                        request_ott = false;
                        if (d.errCode) {
                            video_player.src(d.url);
                            video_player.play();
                        }
                    },
                });
            }
        }
    });
});

$(window).resize(function (event) {
    if ($("#schedule_video_item").length) {
        $("#schedule_video_item").mCustomScrollbar({
            scrollInertia: 300,
            advanced: {
                updateOnSelectorChange: true,
            },
            callbacks: {
                onUpdate: function () {
                    $("#schedule_video_item").mCustomScrollbar(
                        "scrollTo",
                        $("#schedule_video_item")
                            .find(".mCSB_container")
                            .find(".item.active")
                    );
                },
            },
        });
    }
});
