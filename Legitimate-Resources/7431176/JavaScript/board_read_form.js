/**
 * Created by Gram.Sim on 2018-03-07.
 */

/* READ FORM */
function initReadForm(bid, aid, article, callback) {
    console.log('read');
    qvjax_direct(
        "check_board_auth",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid + '&auth_action=read',
        function (data) {
            if (data || $('#ReadPasswordCheckModal').data('certification')) {
                qvjax_direct(
                    "select_board_info",
                    "/module/board/board.php",
                    'bid=' + bid,
                    function (data) {
                        if (data.length > 0) {
                            $.each(data, function() {
                                if (parseInt(this.use_category) == 1) {
                                    $('.read-category').addClass('read-category-show');
                                }
                                else {
                                    $('.read-category').removeClass('read-category-show');
                                    $('.read-category').remove();
                                }

                                if (parseInt(this.use_recommend) == 0) {
                                    $('.read-hits').remove();
                                    $('.read-recommend').remove();
                                }
                                else {
                                    $('.read-hits').css('display', 'inline-block');
                                    $('.read-recommend').show();
                                }

                                if (parseInt(this.use_views) == 0) { $('.read-views').remove(); } else { $('.read-views').css('display', 'inline-block'); }
                                if (parseInt(this.use_date) == 0) { $('.read-date').remove(); } else { $('.read-date').css('display', 'inline-block'); }
                                if (parseInt(this.use_writer) == 0) { $('.read-writer').remove(); } else { $('.read-writer').css('display', 'inline-block'); }
                            });
                        }
                    },
                    function (xhr) {}
                );

                updateViewCount(bid, aid, function() {
                    $('.read-title').text(article.subject);
                    // $('.read-content-inner').html(decodeURIComponent(article.content));
                    $('.read-content-inner').html(article.content);
                    $('.read-category').text(article.category_name);
                    $('.read-writer-name').text(changeAdministratorNameLanguage(article.writer));
                    $('.read-hits-count').text(article.hits);
                    $('.read-views-count').text(parseInt(article.views) + 1);
                    $('.read-date').text($.datepicker.formatDate('yy-mm-dd', new Date(article.reg_date*1000)));

                    if (article.category_name == '' || article.category_name == null) {
                        $('.read-category').remove();
                    }

                    callback(article);
                });

                $('#ReadPasswordCheckModal').removeData('certification');
            }
            else {
                if (article.writer_account == null) {
                    $('.read-body').data('article', article);
                    $('#ReadPasswordCheckModal').modal('show');
                    $('#ReadPasswordCheckModal').data('type', 'check_password');
                    $('#ReadPasswordCheckModal').data('aid', aid);
                    $('#ReadPasswordCheckModal').data('init-type', 'move');
                }
                else {
                    alert(lang.no_permission_please_login_2);
                    location.href = "/";
                }
            }
        },
        function (xhr) {}
    );
}

function renderArticle(data, bid, aid, callback) {
    var article;
    updateViewCount(bid, aid, function() {
        $('.read-title').text(data.subject);
        $('.read-content-inner').html(data.content);
        $('.read-category').text(data.category_name);
        $('.read-writer-name').text(data.writer);
        $('.read-hits-count').text(data.hits);
        $('.read-views-count').text(parseInt(data.views) + 1);
        $('.read-date').text($.datepicker.formatDate('yy-mm-dd', new Date(data.reg_date*1000)));
        article = data;

        if (data.category_name == '' || data.category_name == null) {
            $('.read-category').remove();
        }

        callback(article);
    });
}

function initComment(bid, aid) {
    // comment 작성 폼 초기화
    $('#read-comment-nonmember-writer').val('');
    $('#read-comment-nonmember-password').val('');
    $('#read-comment-textarea').val('');

    // 답글 권한이 없으면 답글버튼 삭제
    qvjax_direct(
        "check_board_auth",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid + '&auth_action=reply',
        function(data) {
            if (data || $('#ReadPasswordCheckModal').data('certification')) {
                $('.read-content-reply').css('display', 'inline-block');
            }
            else {
                $('.read-content-reply').remove();
            }
        },
        function (xhr) {
            console.log(xhr);
        }
    );

    // 댓글쓰기 권한이 없으면 댓글작성 창 제거
    qvjax_direct(
        "check_board_auth",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid + '&auth_action=comment',
        function(data) {
            if (data || $('#ReadPasswordCheckModal').data('certification')) {
                $('.read-comment').show();
            }
            else {
                $('.read-comment').remove();
            }
        },
        function (xhr) {
            console.log(xhr);
        }
    );


    qvjax_direct(
        "select_board_comment",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid,
        function (data) {
            if (data.length > 0) {
                $('.read-comment-list').children().remove();

                $.each(data, function() {
                    var padding = this.comment_reply.length * 20 + 'px';
                    var recomment = this.comment_reply.length > 0 ? 're' : '';
                    var html = '<li class="' + recomment + '" id="' + this.aid + '" style="padding-left:' + padding + '">';


                    var createDateTime = new Date(parseInt(this.reg_date) * 1000);
                    var currentDateTime = new Date();
                    var compareDateTime = currentDateTime.setDate(currentDateTime.getDate() - 1);
                    if (createDateTime > compareDateTime) {
                        var date = getNiceTime(parseInt(this.reg_date) * 1000, new Date(), 1, true);
                    }
                    else {
                        var date = $.datepicker.formatDate('yy-mm-dd', createDateTime);
                    }
                    // var today = new Date();
                    // var updateDate = new Date(this.up_date);
                    // if (today.toDateString() == updateDate.toDateString()) { var date = '<b>' + this.up_date + '</b>' }
                    // else { var date = $.datepicker.formatDate('yy-mm-dd', new Date(this.up_date*1000));}

                    html += '<div class="read-comment-top">';
                    if (this.is_secret == "1") {
                        html += '<div class="read-comment-secret"><i class="icon-lock" aria-hidden="true"></i><span>[' + lang.secret_article + ']</span></div>';
                    }
                    html += '<div class="read-comment-writer">' + this.writer + '</div>';
                    html += '<div class="read-comment-date">' + date + '</div>';
                    html += '<div class="read-comment-options">';
                    html += '<div class="read-comment-recomment">' + lang.write_comment + '</div>';
                    html += '<div class="read-comment-modify">' + lang.modify + '</div>';
                    html += '<div class="read-comment-delete">' + lang.remove + '</div>';
                    html += '</div></div>';

                    var content = this.content.replace(/\n/g, "<br />");
                    if (this.is_secret == "1") {
                        html += '<div class="read-comment-content"></div>';
                        var article_id = this.aid;
                        checkAuth(bid, article_id,
                            function() { $('#' + article_id + ' .read-comment-content').html(content); },
                            function() { $('#' + article_id + ' .read-comment-content').html(lang.is_secret_article); },
                            function() {}
                        )
                    }
                    else {
                        html += '<div class="read-comment-content">' + content + '</div>';
                    }
                    html += '</li>';
                    $('.read-comment-list').append(html);
                });
            }
        },
        function (xhr) {}
    );
}

function initAttachments(bid, aid, callback) {
    qvjax_direct(
        "select_board_file",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid,
        function (data) {
            if (data.length > 0) {
                var html = '<div style="padding: 2px 5px;">' + lang.attachment + ' (' + data.length + ')</div>';
                $.each(data, function() {
                    var textoverflow = (this.file_name.length > 15) ? 'textoverflow' : '';
                    html += '<div class="col-sm-2 read-attachments-item ' + textoverflow + '" id=' + this.file_id + '>'
                        + '<div class="read-attachments-icon col-sm-3">'
                        + '<i class="fa fa-download"></i>'
                        + '</div>'
                        + '<div class="read-attachments-fileinfo col-sm-9">'
                        + '<div class="read-attachments-filename">' + this.file_name + '</div>'
                        + '<div class="read-attachments-filesize">' + bytesToSize(this.file_size) + '</div>'
                        + '</div>'
                        + '</div>';
                });

                $('.read-attachments-list').append(html);
            }
            else {
                // $('.read-attachments').remove();
            }
            callback();
        },
        function (xhr) {}
    );
}

function updateViewCount(bid, aid, callback) {
    var cookie_name = QV_BASE_OBJ.stid + '_' + bid + '_' + aid;
    var diff = 1800000;

    if (getCookie(cookie_name) != '') {
        if ($.now() - parseInt(getCookie(cookie_name)) < diff) {
            callback();
            return;
        }
    }

    setCookie(cookie_name, $.now(), 1);
    qvjax_direct(
        "update_view_count",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid,
        function (data) {
            callback();
        },
        function (xhr) {
            callback();
        }
    );
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

function generateRandomId() {
    var text = "";
    var possible_alpahbat = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    text += possible_alpahbat.charAt(Math.floor(Math.random() * possible_alpahbat.length));
    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

$('body').delegate('.read-comment-add', 'click', function(e) {
    e.preventDefault();

    var aid = $(this).parent().hasClass('recomment') ? $(this).parent().data('target') : 'read-comment';
    var cid = $(this).parent().hasClass('recomment') ? $(this).parent().data('target') : '';
    var content = $(this).parent().children('textarea').val();
    var obj = new Object();
    var result = [];
    var successCallback;
    var is_secret = $(this).parents('.read-comment').first().find('.read-comment-secret input').prop('checked') ? 1 : 0;

    // 2019.02.20 boardCommentsBox
    if ($(this).parents('.boardCommentsBox').length > 0) {
        __BID = 'cmt';
        __AID = $(this).parents('.boardCommentsBox').attr('data-id');
        var target = $(this).parents('.view').first();
        var page = $(this).parents('.boardCommentsBox').find('.pager button.active').val();
        var size = $(this).parents('.boardCommentsBox').attr('data-pagesize');
        var reverse = $(this).parents('.boardCommentsBox').attr('data-reverse') === "1" ? true : false;
        page = page == undefined ? 1 : page;
        size = size == undefined ? 10 : size;
        successCallback = function() { initBoardComments(__BID, __AID, page, size, target, reverse) };

        if ($(this).parents('.read-body').data('article') == undefined) {
            alert(lang.not_complete_board_configration);
            return;
        }
    }
    else {
        successCallback = function() { initComment(__BID, __AID) };
    }

    if ($(this).parents('.read-body').data('type') == 'member') {
        obj.bid = __BID;
        obj.aid = generateRandomId();
        obj.num = $(this).parents('.read-body').data('article').num;
        obj.subject = '';
        obj.content = content;
        obj.is_secret = is_secret;
        obj.comment = 0;
        obj.comment_reply = '';
        obj.reply = '';

        if (obj.content.trim() == '') {
            alert(lang.enter_contents); return;
        }

        obj.ip = '';
        result.push(obj);

        qvjax_direct(
            "insert_board_comment",
            "/module/board/board.php",
            'pid=' + __AID + '&cid=' + cid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
            function (data) {
                if (data) {
                    if (data.message == 'ERROR' && data.code == 1355) {
                        alert(lang.no_more_reply);
                    }
                    else if (data.message == 'ERROR') {
                        alert(lang.no_permission);
                    }
                    else {
                        successCallback();
                        alert(lang.complete_regist);
                    }
                }
            },
            function (xhr) {
            }
        );
    }
    else {
        obj.bid = __BID;
        obj.aid = generateRandomId();
        obj.num = $(this).parents('.read-body').data('article').num;
        obj.subject = '';
        obj.content = content;
        obj.is_secret = is_secret;
        obj.writer = $('#' + aid + ' .read-comment-nonmember > #read-comment-nonmember-writer').val();
        obj.password = $('#' + aid + ' .read-comment-nonmember > #read-comment-nonmember-password').val();
        obj.comment = 0;
        obj.comment_reply = '';
        obj.reply = '';

        if (obj.writer.trim() == '') {
            alert(lang.enter_writer); return;
        }
        else if (obj.content.trim() == '') {
            alert(lang.enter_contents); return;
        }
        else if (obj.password.trim() == '') {
            alert(lang.enter_password); return;
        }
        else if (obj.password.length > 20) {
            alert(lang.invalid_password_limit); return;
        }

        obj.ip = '';
        result.push(obj);

        qvjax_direct(
            "insert_board_comment_nonmember",
            "/module/board/board.php",
            'pid=' + __AID + '&cid=' + cid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
            function (data) {
                if (data) {
                    if (data.message == 'ERROR' && data.code == 1355) {
                        alert(lang.no_more_reply);
                    }
                    else if (data.message == 'ERROR') {
                        alert(lang.no_permission);
                    }
                    else {
                        successCallback();
                        alert(lang.complete_regist);
                    }
                }
            },
            function (xhr) {
            }
        );
    }
});


$('body').delegate('.read-comment-recomment', 'click', function(e) {
    e.preventDefault();
    var target = $(this).parents('li').first();

    // 수정폼이 열려있으면 지운 뒤 댓글쓰기를 연다
    if (target.children('.read-comment.modify').length > 0) {
        var value = $(target).data('value');
        var content = '<div class="read-comment-content">' + value + '</div>';
        target.find('.read-comment-top').after(content);
        target.children('.read-comment.modify').remove();
    }

    if (target.children('.read-comment.recomment').length > 0) {
        target.children('.read-comment.recomment').remove();
    }
    else {
        var aid = target[0].id;
        var html = '<div class="read-comment recomment" data-target="' + aid + '">';
        if ($('.read-body').data('type') == 'nonmember') {
            html += '<div class="read-comment-nonmember"><input id="read-comment-nonmember-writer" class="form-control read-comment-nonmember-writer" type="text" placeholder="' + lang.writer + '"><input id="read-comment-nonmember-password" class="form-control read-comment-nonmember-password" type="password" placeholder="' + lang.password + '"></div>'
        }
        html += '<textarea id="read-comment-textarea-' + aid + '" class="form-control read-comment-textarea" type="text" placeholder="' + lang.comments + '"></textarea><div class="read-comment-add">' + lang.write_comment + '</div>';
        // html += '<div class="read-comment-secret" style=""><input type="checkbox" value="0"><div>비밀글</div></div>';
        html += '</div>';
        target.append(html);
    }
});

function initCommentShow(aid) {
    var target = $('#'+aid).first();
}

function initCommentModify(aid) {
    var target = $('#'+aid).first();

    // 댓글쓰기가 열려있으면 지운 뒤 수정폼을 띄운다.
    if (target.children('.read-comment.recomment').length > 0) {
        target.children('.read-comment.recomment').remove();
    }

    // 댓글형 게시판일때의 처리
    if (target.parents('.boardCommentsBox').length > 0) {
        var isSecret = $('.read-body').data('article').is_secret ? 'checked' : '';
        var content = $('.read-body').data('article').content ? $('.read-body').data('article').content : target.find('.read-comment-content').html();
    } else {
        var isSecret = '';
        var content = target.find('.read-comment-content').html();
    }

    var value = content.replace(/<br\s*[\/]?>/gi, "\n");
    var html = '<div class="read-comment modify">';
    html += '<textarea id="read-comment-textarea-' + aid + '" class="form-control read-comment-textarea" type="text" placeholder="' + lang.comments + '"></textarea><div class="read-comment-update">' + lang.edit + '</div>';
    if (account != "" && account != undefined) {
        html += '<div class="read-comment-secret"><input type="checkbox" value="0" ' + isSecret + '><div>' + lang.secret_article + '</div></div>';
    } else {
        html += '<div class="read-comment-secret" style="display: none;"><input type="checkbox" value="0" ' + isSecret + '><div>' + lang.secret_article + '</div></div>';
    }
    html += '</div>';
    target.find('.read-comment-content').remove();
    target.append(html);

    $(target).data('target', aid);
    $(target).data('value', value);
    $('#read-comment-textarea-' + aid).val(value);
}
$('body').delegate('.read-comment-modify', 'click', function(e) {
    e.preventDefault();
    var target = $(this).parents('li').first();
    var aid = target[0].id;

    // 2019.02.20 boardCommentsBox
    if ($(this).parents('.boardCommentsBox').length > 0) { __BID = 'cmt'; }

    if (target.find('.read-comment-content').length > 0) {
        // 수정 전 권한 체크
        checkAuth(__BID, aid,
            function () { initCommentModify(aid); },
            function () { alert(lang.no_permission); },
            function () {
                $('#ReadPasswordCheckModal').modal('show');
                $('#ReadPasswordCheckModal').data('type', 'update_comment');
                $('#ReadPasswordCheckModal').data('aid', aid);
            }
        );
    }
    else {
        // initComment(__BID, __AID);
        if (target.children('.read-comment.modify').length > 0) {
            var value = $(target).data('value').replace(/\n/g, "<br />");
            var content = '<div class="read-comment-content">' + value + '</div>';
            target.find('.read-comment-top').after(content);
            target.children('.read-comment.modify').remove();
        }
    }
});
$('body').delegate('.read-comment-update', 'click', function(e) {
    e.preventDefault();
    var box = $(this).parents('.box').first()
    var aid = $(this).parents('li').data('target');
    var content = $(this).parent().children('textarea').val();
    var obj = new Object();
    var result = [];

    var is_secret = $(this).parents('.read-comment').first().find('.read-comment-secret input').prop('checked') ? 1 : 0;

    obj.bid = __BID;
    obj.aid = aid;
    obj.content = content;
    obj.is_secret = is_secret;

    obj.ip = '';
    result.push(obj);

    // 댓글 업데이트 시 권한을 다시 한 번 확인한다.
    checkAuth(__BID, aid,
        function () {
            qvjax_direct(
                "update_board_comment",
                "/module/board/board.php",
                'json_result=' + encodeURIComponent(JSON.stringify(result)),
                function (data) {
                    if (data) {
                        if (data.message == 'ERROR') {
                            alert(lang.no_permission);
                        }
                        else {
                            if (box.hasClass('boardCommentsBox')) {
                                __BID = 'cmt';
                                __AID = box.attr('data-id');
                                var target = box.find('.view').first();
                                var page = box.find('.pager button.active').val();
                                var size = box.attr('data-pagesize');
                                page = page == undefined ? 1 : page;
                                size = size == undefined ? 10 : size;
                                initBoardComments(__BID, __AID, page, size, target)
                            } else {
                                initComment(__BID, __AID);
                            }
                            alert(lang.complete_modify);
                        }
                    }
                },
                function (xhr) { }
            );
        },
        function () { alert(lang.no_permission); },
        function () {
            var password = $('#' + obj.aid).data('password');
            var comment_array = [];
            var comment_obj = new Object();
            comment_obj.aid = obj.aid;
            comment_obj.bid = obj.bid;
            comment_obj.password = password;
            comment_array.push(comment_obj);

            qvjax_direct(
                "check_board_article_password",
                "/module/board/board.php",
                'json_result=' + encodeURIComponent(JSON.stringify(comment_array)),
                function (data) {
                    if (data > 0) {
                        qvjax_direct(
                            "update_board_comment",
                            "/module/board/board.php",
                            'json_result=' + encodeURIComponent(JSON.stringify(result)),
                            function (data) {
                                if (data) {
                                    if (data.message == 'ERROR') {
                                        alert(lang.no_permission);
                                    }
                                    else {
                                        if (box.hasClass('boardCommentsBox')) {
                                            __BID = 'cmt';
                                            __AID = box.attr('data-id');
                                            var target = box.find('.view').first();
                                            var page = box.find('.pager button.active').val();
                                            var size = box.attr('data-pagesize');
                                            page = page == undefined ? 1 : page;
                                            size = size == undefined ? 10 : size;
                                            initBoardComments(__BID, __AID, page, size, target)
                                        } else {
                                            initComment(__BID, __AID);
                                        }
                                        alert(lang.complete_modify);
                                    }
                                }
                            },
                            function (xhr) { }
                        );
                    }
                    else {
                        alert(lang.invalid_password)
                    }
                },
                function (xhr) { }
            );
        }
    );
});
$('body').delegate('.read-comment-delete', 'click', function(e) {
    e.preventDefault();
    var result = confirm(lang.remove_comment);
    if (result) {
        var aid = $(this).parents('li')[0].id;

        // 2019.02.20 boardCommentsBox
        if ($(this).parents('.boardCommentsBox').length > 0) { __BID = 'cmt'; }

        checkAuth(__BID, aid,
            function () {
                deleteBoardComment(aid, function () {
                    window.location.reload();
                });
            },
            function () { alert(lang.no_permission); },
            function () {
                $('#ReadPasswordCheckModal').modal('show');
                $('#ReadPasswordCheckModal').data('type', 'delete_comment');
                $('#ReadPasswordCheckModal').data('aid', aid);
            }
        );
    }
});

//reply delete
$('body').delegate('.read-content-delete', 'click', function (e) {
    e.preventDefault();
    var result = confirm(lang.remove_article);
    if(result) {
        checkAuth(__BID, __AID,
            function () {
                deleteBoardArticle(__AID, function () {
                    location.href = '/';
                    var query = qv_func.getUrlParams();
                    if (query.pn == '' || query.pn == undefined) {
                        location.href = '/';
                    } else {
                        location.href = '/' + query.pn;
                    }
                });
            },
            function () { alert(lang.no_permission); },
            function () {
                $('#ReadPasswordCheckModal').modal('show');
                $('#ReadPasswordCheckModal').data('type', 'delete_article');
                $('#ReadPasswordCheckModal').data('aid', __AID);
            }
        );
    }
});

function deleteBoardArticle(aid, callback) {
    var array = [];
    var obj = new Object();
    obj.aid = aid;
    obj.bid = __BID;
    array.push(obj);

    qvjax_direct(
        "delete_board_article",
        "/module/board/board.php",
        'json_result=' + encodeURIComponent(JSON.stringify(array)),
        function (data) {
            if (data.message == 'ERROR') {
                if (data.code == 1350) alert(lang.no_permission);
                if (data.code == 1351) alert(lang.remove_article_error_1351);
            }
            else {
                alert(lang.remove_complete);
                callback();
            }
        },
        function (xhr) {
        }
    );
}

function deleteBoardComment(aid, callback) {
    var array = [];
    var obj = new Object();
    obj.aid = aid;
    obj.bid = __BID;
    array.push(obj);

    qvjax_direct(
        "delete_board_comment",
        "/module/board/board.php",
        'json_result=' + encodeURIComponent(JSON.stringify(array)),
        function (data) {
            if (data.message == 'ERROR') {
                if (data.code == 1350) alert(lang.no_permission);
                if (data.code == 1351) alert(lang.remove_comment_error_1351);
                if (data.code == 1352) alert(lang.remove_comment_error_1352);
            }
            else {
                alert(lang.remove_complete);
                callback();
            }
        },
        function (xhr) {
        }
    );
}

$('body').delegate('.read-content-modify', 'click', function (e) {
    e.preventDefault();
    var uri = encodeURI(window.location.href);
    if (__PN == undefined) { __PN == QV_BASE_OBJ.spid; }
    location.href = '/module/board/write_form.html?w=u&bid=' + __BID + '&aid=' + __AID + '&pn=' + __PN +'&prev=' + encodeURIComponent(uri);
});

$('body').delegate('.read-content-list', 'click', function (e) {
    e.preventDefault();
    if ($(this).parents('.board-body').length > 0) {
        // '현재 탭에서 게시글 보기' 에서 목록 클릭한 경우
        // 게시글 페이지로 이동하기
        var view = $(this).parents('.view').first();
        var target = view.find('.board-body');

        if ($(this).parents('.bottom').length > 0) {
            $('html, body').animate({
                scrollTop: view.offset().top - $('.header').height()
            }, 300);
        }

        $('.table-column').removeClass('table-column');
        target.remove();
        view.find('.board-theme').show();
    }
    else {
        // '새 탭에서 게시글 보기' 에서 목록 클릭한 경우
        // 게시판 위치에 게시글 띄우기
        var query = qv_func.getUrlParams();
        if (query.pn == '' || query.pn == undefined) {
            location.href = '/';
        }
        else {
            console.log(window.location.hash);
            location.href = '/' + query.pn;
        }
    }
});

$('body').delegate('.read-content-reply', 'click', function (e) {
    e.preventDefault();
    var query = qv_func.getUrlParams();
    if (query.pn == '' || query.pn == undefined) {
        var pn = QV_BASE_OBJ.spid;
    }
    else {
        var pn = query.pn;
    }
    location.href = '/module/board/write_form.html?w=r&bid=' + __BID + '&aid=' + __AID +'&pn=' + pn;
});

// $(".body").delegate(".read-attachments-item", "click", function(e) {
//     e.preventDefault();
//     if ($(this).hasClass('dev')) return;
//
//     var file_id = this.id;
//     qvjax_direct(
//         "select_board_file_url",
//         "/module/board/board.php",
//         'bid=' + __BID + '&file_id=' + file_id,
//         function (data) {
//             $.each(data, function() {
//                 if (data.length > 0) {
//                     var a = $("<a>").attr("href", this.file_path).attr("download", this.file_name).attr("target", "_blank").appendTo("body");
//                     a[0].click();
//                     a.remove();
//                 }
//             });
//         },
//         function (xhr) {}
//     );
// });


$(".body").delegate(".read-attachments-item", "click", function(e) {
    e.preventDefault();

    var file_id = this.id;
    qvjax_direct(
        "select_board_file_url",
        "/module/board/board.php",
        'bid=' + __BID + '&file_id=' + file_id,
        function (data) {
            $.each(data, function() {
                var url = this.file_path;

                /* 2020.02.17 재헌
                 * 사파리에서 파일다운로드 시 download.php 파일이 바로 다운로드 되어버리는 문제
                 * 헤더값을 조정해도 동작하지않음. (safari에서는 강제 파일다운로드가 안된다는 글 확인)
                 * https://stackoverflow.com/questions/8849197/php-download-file-script-not-working-on-ipad
                 * 2020.12.10 재헌
                 * 카카오톡(android) 브라우저에서 게시판 파일다운로드가 되지않는 문제가 있어 예외처리
                 */
                var agent = navigator.userAgent.toLowerCase();

                if ((agent.indexOf('safari') > -1 && agent.indexOf('chrome') == -1) ||
                    (agent.indexOf('android') > -1 && agent.indexOf('kakaotalk') > -1)) {
                    // var name = encodeURI(this.file_name);
                    // post_redirect('/module/board/download.php', {'url': url, 'name': name}, '_top');

                    var name = encodeURI(this.file_name);
                    var a = $("<a>").attr("href", url).attr("download", name).appendTo("body");
                    a[0].click();
                    a.remove();
                    // window.open(url);
                }
                else {
                    var name = encodeURIComponent(this.file_name);
                    post_redirect('/module/board/download.php', {'url': url, 'name': name}, '_top');
                }
            });
        },
        function (xhr) {}
    );
});

$(".body").delegate(".recommend", "click", function(e) {
    qvjax_direct(
        "update_recommend_count",
        "/module/board/board.php",
        'bid=' + __BID + '&aid=' + __AID,
        function (data) {
            if (data == 1) {
                alert(lang.recommended_posts);
                location.reload();
            }
            else if (data == 2) {
                alert(lang.login_to_make_recommend);
            }
            else if (data == null) {
                alert(lang.already_recommended);
            }
        },
        function (xhr) {}
    );
});


$("body").delegate("#ReadPasswordCheckModalBtnSave", "click", function(e) {
    var password = $('#ReadPasswordCheck').val();

    var type = $('#ReadPasswordCheckModal').data('type');
    switch (type) {
        case "check_password":
            var array = [];
            var obj = new Object();
            var aid = $('#ReadPasswordCheckModal').data('aid');
            var initType = $('#ReadPasswordCheckModal').data('init-type');
            obj.aid = aid;
            obj.bid = __BID;
            obj.password = password;
            array.push(obj);

            checkArticlePassword(
                array,
                function() {
                    if (initType == 'default') {
                        initialize_currentLocation(obj.bid, obj.aid, $('#ReadPasswordCheckModal').data('article'), $('#ReadPasswordCheckModal').data('table'));
                    }
                    else {
                        initialize($('.read-body').data('article'));
                    }

                    $('#ReadPasswordCheckModal').data('certification', true);
                    $('#ReadPasswordCheckModal').modal('hide');
                },
                function() {
                    $('#ReadPasswordCheckModal').data('certification', false);
                    alert(lang.invalid_password);
                }
            );
            break;

        case "update_comment":
            var array = [];
            var obj = new Object();
            var aid = $('#ReadPasswordCheckModal').data('aid');
            obj.aid = aid;
            obj.bid = __BID;
            obj.password = password;
            array.push(obj);

            checkArticlePassword(
                array,
                function() {
                    initCommentModify(aid);
                    $('#' + aid).data('password', obj.password);
                    $('#ReadPasswordCheckModal').data('certification', true);
                    $('#ReadPasswordCheckModal').modal('hide');
                },
                function() {
                    $('#ReadPasswordCheckModal').data('certification', false);
                    alert(lang.invalid_password)
                }
            );
            break;

        case "delete_article":
            var array = [];
            var obj = new Object();
            var aid = $('#ReadPasswordCheckModal').data('aid');
            obj.aid = aid;
            obj.bid = __BID;
            obj.password = password;
            array.push(obj);


            qvjax_direct(
                "delete_board_article_nonmember",
                "/module/board/board.php",
                'json_result=' + encodeURIComponent(JSON.stringify(array)),
                function (data) {
                    if (data.message == 'ERROR') {
                        if (data.code == 1350) alert(lang.no_permission);
                        if (data.code == 1351) alert(lang.remove_article_error_1351_nomember);
                        $('#ReadPasswordCheckModal').modal('hide');
                    }
                    else if (data > 0) {
                        alert(lang.remove_article_complete);
                        //location.href = '/';
                        var query = qv_func.getUrlParams();
                        if (query.pn == '' || query.pn == undefined) {
                            location.href = '/';
                        }
                        else {
                            location.href = '/' + query.pn;
                        }
                    }
                    else if (data == 0){
                        alert(lang.invalid_password)
                    }
                },
                function (xhr) { }
            );
            break;

        case "delete_comment":
            var array = [];
            var obj = new Object();
            var aid = $('#ReadPasswordCheckModal').data('aid');
            obj.aid = aid;
            obj.bid = __BID;
            obj.password = password;
            array.push(obj);

            qvjax_direct(
                "delete_board_comment_nonmember",
                "/module/board/board.php",
                'json_result=' + encodeURIComponent(JSON.stringify(array)),
                function (data) {
                    if (data.message == 'ERROR') {
                        if (data.code == 1350) alert(lang.no_permission);
                        if (data.code == 1351) alert(lang.remove_comment_error_1351);
                        if (data.code == 1352) alert(lang.remove_comment_error_1352_nomember);
                    }
                    else if (data == 0){
                        alert(lang.invalid_password)
                    }
                    else {
                        alert(lang.remove_complete);
                        window.location.reload();
                        // initComment(__BID, __AID);
                        // $('#ReadPasswordCheckModal').modal('hide');
                    }
                },
                function (xhr) {
                }
            );
            break;
    }

});


$(document).ready(function() {
    $('#ReadPasswordCheckModal').on('show.bs.modal', function () {
        $('#ReadPasswordCheck').val('')
    });
    $("#ReadPasswordCheckModal").on('hide.bs.modal', function () {
        if (!$('#ReadPasswordCheckModal').data('certification') && $('.body').children('.read-body').length > 0) {
            parent.history.back();
        }
    });
    $('#ReadPasswordCheckModal').keyup(function (event) {
        // press enter in modal
        if (event.keyCode == 13) {
            $('#ReadPasswordCheckModalBtnSave').trigger("click");
        }
    });
});

function post_redirect(url, parm, target) {
    var f = document.createElement('form');
    var objs, value;
    for (var key in parm) {
        value = parm[key];
        objs = document.createElement('input');
        objs.setAttribute('type', 'hidden');
        objs.setAttribute('name', key);
        objs.setAttribute('value', value);
        f.appendChild(objs);
    }
    if (target) f.setAttribute('target', target);
    f.setAttribute('method', 'post');
    f.setAttribute('action', url);
    document.body.appendChild(f);
    f.submit();
}