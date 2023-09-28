function processShortcut(event) {
    if (T.config.PREVIEW) {
        return;
    }

    if (isIE) {
        event = window.event;
        event.target = event.srcElement;
    }

    if (event.altKey || event.ctrlKey || event.metaKey)
        return;
    switch (event.target.nodeName) {
        case "INPUT":
        case "SELECT":
        case "TEXTAREA":
            return;
    }
    if (event.target.nodeName === "DIV" && event.target.getAttribute('contenteditable') === 'true') {
        return;
    }
    switch (event.keyCode) {
        case 81: //Q
            if (T.config.ROLE == 'user') {
                permissionNotice();
            }
            if (T.config.ROLE == 'loginGuest') {
                notBloggerNotice();
            } else {
                window.location = TistoryBlog.manageUrl;
            }
            break;

        case 90: //Z
            window.location = "#recentEntries";
            break;

        case 88: //X
            window.location = "#recentComments";
            break;

    }
}

document.onkeydown = processShortcut;

function addComment(submitButton, entryId) {
    (function ($) {
        var MAX_COMMENT_SIZE = 1000;
        var oForm = findFormObject(submitButton);
        var commentInput = oForm.querySelector('[name="comment"]');

        if (!oForm) {
            return false;
        }

        var data = {
            key: 'tistory'
        };

        var $captchaInput = $("#inputCaptcha");
        if ($captchaInput.length > 0) {
            if (!$captchaInput.val()) {
                alert('ê·¸ë¦¼ë¬¸ìë¥¼ ìë ¥í´ ì£¼ì¸ì.');
                return false;
            }

            data.captcha = $captchaInput.val();
        }

        if (oForm["name"]) {
            data.name = oForm["name"].value;
        }

        if (oForm["password"]) {
            var passwd = oForm["password"].value.trim();
            if (passwd.length == 0) {
                alert('ë¹ë°ë²í¸ë¥¼ ìë ¥í´ ì£¼ì¸ì.');
                return false;
            }

            var shaObj = new jsSHA("SHA-256", "TEXT");
            shaObj.update(md5(encodeURIComponent(passwd)));
            data.password = shaObj.getHash("HEX");
        }

        if (oForm["homepage"]) {
            data.homepage = oForm["homepage"].value;
        }

        if (oForm["secret"] && oForm["secret"].checked) {
            data.secret = 1;
        }

        if (oForm["comment"]) {
            data.comment = oForm["comment"].value;
        }

        if (typeof data.comment === 'string' && data.comment.length > MAX_COMMENT_SIZE) {
            alert('ëê¸ì ' + MAX_COMMENT_SIZE + 'ìê¹ì§ ìë ¥í  ì ììµëë¤.');
            commentInput && commentInput.focus();
            return;
        }

        if (data.secret === 1 && T.config.ROLE === 'guest') {
            if (confirm('ë¹ë¡ê·¸ì¸ ëê¸ì ê³µê° ìì±ë§ ê°ë¥í©ëë¤. ë¡ê·¸ì¸ íìê² ìµëê¹?')) {
                window.location.href = T.config.LOGIN_URL;
            }
            commentInput && commentInput.focus();
            return;
        }

        if (submitButton && submitButton.setAttribute) {
            submitButton.setAttribute('disabled', true);
        }

        $.ajax({
            url: oForm.action + '?__T__=' + (new Date()).getTime(),
            method: 'post',
            data: data,
        }).done(function (r) {
            if (entryId == 0) {
                window.location = addUriPrefix("/guestbook");
                return;
            }

            var data = r.data;
            var $comments = $("#entry" + entryId + "Comment"),
                $recentComments = $("#recentComments"),
                $commentCountOnRecentEntries = $("#commentCountOnRecentEntries" + entryId);

            $comments.html(data.commentBlock);
            $recentComments.html(data.recentCommentBlock);
            for (var i = 0; $("#commentCount" + entryId + "_" + i).length; i++) {
                $("#commentCount" + entryId + "_" + i).html(data.commentCount);
            }
            $commentCountOnRecentEntries.html("(" + data.commentCount + ")");

            if (typeof window.needCommentCaptcha !== "undefined") {
                captchaPlugin.init('complete');
            }
        }).fail(function (r) {
            alert(r.responseJSON.data);
        }).always(function () {
            if (submitButton && submitButton.setAttribute) {
                submitButton.setAttribute('disabled', false);
            }
        });

    })(tjQuery);
}

function commentRequireLoginByDormancy() {
    alert("ì¥ê¸°ê° ë¡ê·¸ì¸ ëì§ ìì ê³ì ì´ í´ë©´ ìíë¡ ì íëììµëë¤.");
    return false;
}


function commentRequireLogin() {
    if (confirm(T.config.COMMENT_LOGIN_CONFIRM_MESSAGE)) {
        window.location = T.config.LOGIN_URL;
    } else {
        window.focus();
    }
}

function commentObserverForAuth(evetObj) {
    var reex = /name|password|homepage|secret|comment/,
        name;
    if (isIE) {
        name = evetObj.srcElement.name;
    } else {
        name = evetObj.target.name;
    }
    if (reex.test(name) && !(new RegExp("^entry\\d+password$").test(name))) {
        commentRequireLogin();
    }
}


if (T.config.NEED_COMMENT_LOGIN && T.config.ROLE === 'guest') {
    STD.addEventListener(document);
    document.addEventListener("click", commentObserverForAuth, false);
}


function commentVisibility(id) {
    var visibility = document.getElementById('commentVisibility_' + id);
    if (visibility.innerHTML == "[ì¹ì¸ìë£]")
        return false;
    var request = new HTTPRequest("POST", addUriPrefix("/admin/comment/approve.php"));
    visibility.innerHTML = "[ì¹ì¸ì¤]";
    request.onVerify = function () {
        try {
            var result = eval("(" + this.getText() + ")");
            return (result.error == false);
        } catch (e) {
            return false;
        }
    };
    request.onSuccess = function () {
        document.getElementById('commentVisibility_' + id).innerHTML = "[ì¹ì¸ìë£]";
    };
    request.onError = function () {
        document.getElementById('commentVisibility_' + id).innerHTML = "[ì¹ì¸ì¤í¨]";
    };
    request.send('id=' + id + '&approved=1');
}

var openWindow = '';

function alignCenter(win, width, height) {
    if (navigator.userAgent.indexOf("Chrome") == -1)
        win.moveTo(screen.width / 2 - width / 2, screen.height / 2 - height / 2);
}

function deleteComment(id) {
    var width = 450;
    var height = 550;
    try {
        openWindow.close();
    } catch (e) {
    }
    openWindow = window.open(addUriPrefix("/comment/manage/") + id, "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
    openWindow.focus();
    alignCenter(openWindow, width, height);
}

function deleteGuestbookComment(id, guestbookWrittenPage) {
    var width = 450;
    var height = 550;
    try {
        openWindow.close();
    } catch (e) {
    }
    openWindow = window.open(addUriPrefix("/comment/manage/" + id + (guestbookWrittenPage ? "?guestbookWrittenPage=" + guestbookWrittenPage : "")), "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
    openWindow.focus();
    alignCenter(openWindow, width, height);
}

function commentComment(parent) {
    var visibility = document.getElementById('commentVisibility_' + parent);
    if (visibility === null || visibility.innerHTML == "[ì¹ì¸ìë£]") {
        var width = 450;
        var height = 550;
        try {
            openWindow.close();
        } catch (e) {
        }
        openWindow = window.open(addUriPrefix("/comment/comment/") + parent, "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
        openWindow.focus();
        alignCenter(openWindow, width, height);
    } else {
        alert('ì¹ì¸ ëê¸°ì¤ì¸ ëê¸ìë ëµê¸ì ìì±í  ì ììµëë¤.');
        return false;
    }
}

function guestbookCommentComment(parent, guestbookWrittenPage) {
    var visibility = document.getElementById('commentVisibility_' + parent);
    if (visibility === null || visibility.innerHTML == "[ì¹ì¸ìë£]") {
        var width = 450;
        var height = 550;
        try {
            openWindow.close();
        } catch (e) {
        }
        openWindow = window.open(addUriPrefix("/comment/comment/" + parent + (guestbookWrittenPage ? "?guestbookWrittenPage=" + guestbookWrittenPage : "")), "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
        openWindow.focus();
        alignCenter(openWindow, width, height);
    } else {
        alert('ì¹ì¸ ëê¸°ì¤ì¸ ëê¸ìë ëµê¸ì ìì±í  ì ììµëë¤.');
        return false;
    }
}

function editEntry(parent) {
    var apiFrame = document.getElementById('editEntry');
    apiFrame.contentWindow.postMessage(parent, TistoryBlog.tistoryUrl);
}

window.addEventListener('message', function (event) {
    if (event.origin !== TistoryBlog.tistoryUrl) {
        return;
    }

    if (event.data === 'reload') {
        window.document.location.reload();
    }
}, false);

function guestbookComment(parent) {
    var width = 450;
    var height = 550;
    try {
        openWindow.close();
    } catch (e) {
    }
    openWindow = window.open(addUriPrefix("/comment/comment/") + parent, "tatter", "width=" + width + ",height=" + height + ",location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0");
    openWindow.focus();
    alignCenter(openWindow, width, height);
}

function deleteTrackback(id, entryId) {
    if (T.config.ROLE != 'MEMBER' && T.config.ROLE != "owner") {
        if (confirm("í¸ëë°±ì ì­ì íê¸° ìí´ìë ë¡ê·¸ì¸ì´ íìí©ëë¤.\në¡ê·¸ì¸ íìê² ìµëê¹?")) {
            window.location = T.config.LOGIN_URL;
        }
        return false;
    }

    if (!confirm("ì íë í¸ëë°±ì ì­ì í©ëë¤. ê³ìíìê² ìµëê¹?"))
        return;

    var request = new HTTPRequest("GET", "/trackback/delete/" + id);
    request.onSuccess = function () {
        var target = document.getElementById('trackback' + id);
        if (target) {
            target.parentNode.removeChild(target);
        }
        if (document.getElementById("recentTrackbacks")) {
            document.getElementById("recentTrackbacks").innerHTML = this.getText("/response/recentTrackbackBlock");
        }
        if (document.getElementById("trackbackCount" + entryId)) {
            document.getElementById("trackbackCount" + entryId).innerHTML = this.getText("/response/trackbackView");
        }
    };
    request.onError = function () {
        alert(this.getText("/response/result"));
    };
    request.send();

}

function changeVisibility(id, visibility) {
    var request = new HTTPRequest("POST", addUriPrefix("/admin/entry/setVisibility.php"));
    request.onVerify = function () {
        try {
            var result = eval("(" + this.getText() + ")");
            if (result.data.event == 'join') {
                alert("ì´ë²¤í¸ì ì°¸ì¬í ê¸ì ê³µê°ì¤ì ì ë³ê²½íì¤ ì ììµëë¤.");
                return false;
            } else {
                return (result.error == false);
            }
        } catch (e) {
            return false;
        }
    };
    request.onSuccess = function () {
        window.location.reload();
    };
    request.send("ids=" + id + "&visibility=" + visibility);
}

function showTooltip(text) {
    if (typeof text != 'undefined' && text.length > 0) {
        var $layer = tjQuery('body .layer_tooltip');
        tjQuery(".desc_g", $layer).html(text);
        $layer.show();

        setTimeout(function () {
            $layer.hide();
        }, 1000);
    }
}

function deleteEntry(id) {
    if (!confirm("ì´ ê¸ ë° ì´ë¯¸ì§ íì¼ì ìì í ì­ì í©ëë¤. ê³ìíìê² ìµëê¹?")) {
        return;
    }
    var request = new HTTPRequest("POST", addUriPrefix("/admin/entry/delete/"));
    request.onSuccess = function () {
        alert('ì ìì ì¼ë¡ ì­ì ëììµëë¤');
        window.location.replace("/");
    };
    request.onError = function () {
        alert('ì­ì ì ì¤í¨íìµëë¤');
    };
    request.send("ids=" + id);
}

function followBlog(blogId, $target, url, device) {
    if (!!initData.user) {
        var requestUrl = addUriPrefix("/subscription/");

        return tjQuery.ajax({
            method: "POST",
            // dataType: "jsonp",
            url: requestUrl,
            data: {
                blogId: blogId,
                type: "follow",
                token: TistoryBlog.token,
                url: url,
                device: device
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function (r) {
            tjQuery(".btn_subscription").addClass("following");
            tjQuery(".btn_subscription .txt_post,.btn_subscription .txt_state").html('êµ¬ëì¤');
            showTooltip("ì´ ë¸ë¡ê·¸ë¥¼ êµ¬ëí©ëë¤.");
        }).fail(function (r) {
            showTooltip("êµ¬ë ì¤í¨");
        }).always(function () {
            $target.data("doing", false);
        });
    } else {
        window.location = window.appInfo.loginUrl + "?redirectUrl=" + encodeURIComponent(window.location.href);
    }
}

function unfollowBlog(blogId, $target, url, device) {
    if (!!initData.user) {
        var requestUrl = addUriPrefix("/subscription/");

        tjQuery.ajax({
            method: "POST",
            // dataType: "jsonp",
            url: requestUrl,
            data: {
                blogId: blogId,
                type: "unfollow",
                token: TistoryBlog.token,
                url: url,
                device: device
            },
            xhrFields: {
                withCredentials: true
            }
        }).done(function (r) {
            tjQuery(".btn_subscription").removeClass("following");
            tjQuery(".btn_subscription .txt_post,.btn_subscription .txt_state").html('êµ¬ëíê¸°');
            showTooltip("ì´ ë¸ë¡ê·¸ êµ¬ëì ì·¨ìí©ëë¤.");
        }).fail(function (r) {
            showTooltip("êµ¬ë ì·¨ì ì¤í¨");
        }).always(function () {
            $target.data("doing", false);
        });
    } else {
        window.location = window.appInfo.loginUrl + "?redirectUrl=" + encodeURIComponent(window.location.href);
    }
}

function reloadEntry(id) {
    var password = document.getElementById("entry" + id + "password");
    if (!password)
        return;
    document.cookie = "GUEST_PASSWORD=" + encodeURIComponent(password.value) + ";path=";

    window.location.reload();
}

function notBloggerNotice(oEvent) {
    if (confirm('ìì§ ë¸ë¡ê·¸ë¥¼ ê°ì¤íì§ ìì¼ì¨ìµëë¤ \nì§ê¸ ê°ì¤ íìê² ìµëê¹?')) {
        document.location.href = T.config.JOIN_URL;
    }
    try {
        oEvent.preventDefault();
    } catch (e) {
        event.returnValue = false;
        event.cancelBubble = true;
    }
}

function permissionNotice(oEvent) {
    if (T.config.USER.name == null || T.config.USER.homepage == null) {
        return false;
    }
    if (confirm(T.config.USER.name + 'ëì ë¸ë¡ê·¸ê° ìëëë¤. ' + T.config.USER.homepage + 'ì ê´ë¦¬ìë¡ ì´ë íìê² ìµëê¹?')) {
        document.location.href = T.config.USER.homepage + '/manage';
    }
    try {
        oEvent.preventDefault();
    } catch (e) {
        event.returnValue = false;
        event.cancelBubble = true;
    }
}

loadedComments = new Array();
loadedTrackbacks = new Array();

function viewTrigger(id, category, categoryId) {
    var request = new HTTPRequest("GET", addUriPrefix("/" + category + "/view/" + id));
    var target = document.getElementById('entry' + id + (category == 'comment' ? 'Comment' : 'Trackback'));
    if (target == null)
        return false;
    request.onSuccess = function () {
        target.innerHTML = this.getText("/response/result");
        target.style.display = 'block';
        category == 'comment' ? loadedComments[id] = true : loadedTrackbacks[id] = true;
        if (categoryId > -1)
            location = location.toString();
        if (typeof window.needCommentCaptcha !== "undefined") {
            captchaPlugin.init();
        }
        findFragmentAndHighlight();
    };
    request.onError = function () {
        console.error('ì¤í¨íìµëë¤.')
    };
    request.send();
}

function highlight() {
    var hash = new RegExp("^#(comment\\d+)").exec(window.location.hash);
    if (hash && (el = document.getElementById(hash[1]))) {
        var highlightColor = el.getAttribute("activecommentbackground") || "#FFFF44";
        highlightElement(hash[1], 0, el.style.backgroundColor, highlightColor);
    }

}

function highlightElement(id, amount, origColor, highlightColor) {

    var el = document.getElementById(id);
    if (!el) {
        return;
    }

    el.style.backgroundColor = (amount % 2)
        ? highlightColor
        : origColor;

    if (++amount < 7) {
        setTimeout(function () {
            highlightElement(id, amount, origColor, highlightColor);
        }, 200);
    }
}

function toggleLayerForEntry(id, category, categoryId, mode) {
    if ((category == 'comment' ? loadedComments[id] : loadedTrackbacks[id])) {
        try {
            var obj = document.getElementById('entry' + id + (category == 'comment' ? 'Comment' : 'Trackback'));
            if (mode == undefined)
                obj.style.display = (obj.style.display == "none") ? "block" : "none";
            else
                obj.style.display = (mode == 'show') ? "block" : "none";
        } catch (e) {

        }
        return true;
    } else {
        if (categoryId) {
            viewTrigger(id, category, categoryId);
        } else {
            viewTrigger(id, category, -1);
        }
    }
}

function ObserverForAnchor(evetObj) {
    var lo = location.toString();
    var queryString = lo.substr(lo.lastIndexOf('/') + 1);
    if (queryString.indexOf('#') > -1) {
        var qsElements = queryString.split('#');
        if (qsElements[1].indexOf('comment') > -1) {
            var category = 'comment';
        } else if (qsElements[1].indexOf('trackback') > -1) {
            var category = 'trackback';
        }
        if (category) {
            entryid = qsElements[0];
            categoryId = qsElements[1].substr(category.length);
            toggleLayerForEntry(entryid, category, categoryId, 'show');
        }
    }
}

STD.addEventListener(window);
window.addEventListener("load", ObserverForAnchor, false);

function addUriPrefix(path) {
    return TistoryBlog.basePath + path;
}
