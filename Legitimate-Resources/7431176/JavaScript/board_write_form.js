/**
 * Created by quvsoftware on 2019-07-25.
 */
/**
 * Created by Gram.Sim on 2018-03-07.
 */
/* WRITE FORM */
function initWriteForm(bid, callback) {
    var arr_auth = auth.split(',');
    if ($.inArray('1', arr_auth) >= 0
        || $.inArray('2', arr_auth) >= 0
        || $.inArray('30', arr_auth) >= 0) {
        var html = '<div class="write-title-options-notice">';
        html += '<input id="write-title-options-notice" type="checkbox" value="0">';
        html += '<span>' + lang.notice +'</span>';
        html += '</div>';
        $('.write-title-options-secret').before(html);
    }

    qvjax_direct(
        "select_board_info",
        "/module/board/board.php",
        'bid=' + bid,
        function (data) {
            if (data.length > 0) {
                $.each(data, function() {
                    if (parseInt(this.use_category) == 1) {
                        $('.write-category').addClass('write-category-show');
                        setCategory(function() {});
                    }
                    else {
                        $('.write-category').removeClass('write-category-show');
                        $('.write-category').remove();
                    }

                    var subject = this.placeholder_subject.trim() == '' ? lang.subject : this.placeholder_subject;
                    $('#write-title-input').attr('placeholder', subject);
                    CKEDITOR.instances['write-content-textarea'].setData(this.placeholder_content);

                    callback(this);
                });
            }
        },
        function (xhr) { }
    );

    $('.footer-fixed-contents').remove();
}

function initUploadFileSettings() {
    var upload_size_limit = QV_BASE_OBJ.is_free_version == "1" ? 10 : 30;
    // 파일 업로드
    var fileUploadSettings = {
        url: "//g" + QV_BASE_OBJ.svid + "m.quv.kr" + "/aws/board_upload_file.php",
        formData: {"sskey":QV_BASE_OBJ.sskey, "token":QV_BASE_OBJ.token, "stid":QV_BASE_OBJ.stid, "svid":QV_BASE_OBJ.svid, "bid": __BID, "aid": __AID},
        dragDrop: false,
        dragDropStr: "",
        multiple: true,
        fileName: "file",
        maxFileSize: 1024*1024*upload_size_limit,
        acceptFiles: "*",
        showStatusAfterSuccess: false,
        showDone: false,
        showDelete: false,
        uploadButtonClass: "write-files",
        onSelect: function(files) {
            var fileStatusError=0;
            $('#loading-mask').addClass('loading-mask-show');
            $.each(files, function() {
                //console.log(this);
                if(this.size > 1024*1024*upload_size_limit){
                    fileStatusError=1;
                    return false;
                }
            });
            if(fileStatusError>0){
                alert(lang.upload_size_limit_file(upload_size_limit));
                $('#loading-mask').removeClass('loading-mask-show');
                return false;
            }
        },
        onSuccess: function(files,data,xhr) {
            if (data == 'overflow') {
                alert(lang.upload_overflow_file);
                $('#loading-mask').removeClass('loading-mask-show');
            }else if(data == 'token_failed'){
                alert(lang.upload_expired);
                $('#loading-mask').removeClass('loading-mask-show');
            }
            else {
                setAttachments(__BID, __AID, function() {
                    $('#loading-mask').removeClass('loading-mask-show');
                    // alert('파일 업로드 완료');
                });
            }
        },
        onError: function(files,status,errMsg,pd) {
            $('#loading-mask').removeClass('loading-mask-show');
            alert(lang.upload_error(upload_size_limit));
        }
    };
    var fileUploadObj = $(".write-files").uploadFile(fileUploadSettings);

    // 이미지 업로드
    var imageUploadSettings = {
        url: "//g" + QV_BASE_OBJ.svid + "m.quv.kr" + "/aws/board_upload_image.php",
        //formData: {"stid":QV_BASE_OBJ.stid, "svid":QV_BASE_OBJ.svid, "token":token},
        formData: {"sskey":QV_BASE_OBJ.sskey, "token":QV_BASE_OBJ.token, "stid":QV_BASE_OBJ.stid, "svid":QV_BASE_OBJ.svid},
        dragDrop: false,
        dragDropStr: "",
        multiple: true,
        fileName: "file",
        maxFileSize: 1024*1024*10,
        //allowedTypes:"jpg,png",
        acceptFiles: "image/*",
        showStatusAfterSuccess: false,
        showDone: false,
        showDelete: false,
        uploadButtonClass: "write-images",
        onSelect: function(files) {
            var fileStatusError=0;
            $('#loading-mask').addClass('loading-mask-show');
            $.each(files, function() {
                //console.log(this);
                if(this.size>10000000){
                    fileStatusError=1;
                    return false;
                }
            });
            if(fileStatusError>0){
                alert(lang.upload_size_limit_image);
                $('#loading-mask').removeClass('loading-mask-show');
                return false;
            }
        },
        onSuccess: function(files,data,xhr) {
            if (data == 'overflow') {
                alert(lang.upload_overflow_image);
                $('#loading-mask').removeClass('loading-mask-show');
            }else if(data == 'token_failed'){
                alert(lang.upload_expired);
                $('#loading-mask').removeClass('loading-mask-show');
            }
            else {
                var id = qv_func.randomId();
                // ckeditor에 커서가 활성화 되어있을 때
                if (CKEDITOR.instances['write-content-textarea'].getSelection().getStartElement() != null) {
                    var html = '<img style="max-width:100%;" src="' + data + '" id="' + id + '"><p><br></p>';
                    $(CKEDITOR.instances['write-content-textarea'].getSelection().getStartElement().$).after(html);
                }
                else {
                    var html = CKEDITOR.instances['write-content-textarea'].getData();
                    html += '<img style="max-width:100%;" src="' + data + '" id="' + id + '"><p><br></p>';
                    CKEDITOR.instances['write-content-textarea'].setData(html);
                }

                /* 2020.02.11 재헌
                 * 첨부 이미지 프로세스 변경
                 */
                var imageItem = '<div class="write-upload-image-item" data-id="' + id + '" style="background-image:url(' + data + ')" data-active-text="' + lang.representative_image + '">' +
                    '<div class="write-upload-image-item-delete"><i class="fa fa-close"></i>' +
                    '</div></div>';
                $('.write-upload-images-list').append(imageItem);
                $('.write-upload-images').show();

                $('#loading-mask').removeClass('loading-mask-show');
            }
        },
        onError: function(files,status,errMsg,pd) {
            $('#loading-mask').removeClass('loading-mask-show');
            alert(lang.upload_error(10));
        }

    };
    var imageUploadObj = $(".write-images").uploadFile(imageUploadSettings);
}

function initReply(bid, aid, callback) {
    qvjax_direct(
        "select_board_article_contentless",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid,
        function (data) {
            if (data.length > 0) {
                $.each(data, function () {
                    $('.write-body').data('article', this);
                    $('#write-title-input').val("re: " + this.subject);
                    $('#write-title-options-notice').prop('checked', false);
                    $('#write-title-options-secret').prop('checked', false);
                    CKEDITOR.instances['write-content-textarea'].setData('');

                    if (this.category == null || this.category == '' || this.category == undefined) {
                        $('.write-category-select option[value="0"]').prop('selected',true);
                    }
                    else {
                        $('.write-category-select option[value=' + this.category + ']').prop('selected',true);
                    }
                });

                callback();
            }
        },
        function (xhr) {}
    );
}

function initModify(bid, aid, callback) {
    checkAuth(bid, aid,
        function(data) {
            $('.write-body').data('article', data);
            initModifyForm(data);
            callback();
        },
        function() {
            alert(lang.no_permission);
            location.href='/';
        },
        function() {
            $('#WritePasswordCheckModal').modal('show');
            callback();
        }
    );
    // qvjax_direct(
    //     "select_board_article",
    //     "/module/board/board.php",
    //     'bid=' + bid + '&aid=' + aid,
    //     function (data) {
    //         if (data.length > 0) {
    //             $.each(data, function () {
    //                 $('.write-body').data('article', this);
    //                 var articleData = this;
    //                 if (articleData.category != '') {
    //                     $('.write-category-select option[value="' + articleData.category + '"]').prop('selected', true)
    //                 }
    //
    //                 // 관리자
    //                 var arr_auth = auth.split(',');
    //                 if ($.inArray('1', arr_auth) >= 0
    //                     || $.inArray('2', arr_auth) >= 0
    //                     || $.inArray('30', arr_auth) >= 0) {
    //                     initModifyForm(articleData);
    //                 }
    //                 // 비회원
    //                 else if (this.writer_account == null) {
    //                     $('#WritePasswordCheckModal').modal('show');
    //                 }
    //                 // 일반회원
    //                 else {
    //                     qvjax_direct(
    //                         "check_board_article_owner",
    //                         "/module/board/board.php",
    //                         'bid=' + bid + '&aid=' + aid,
    //                         function (data) {
    //                             if (data) { initModifyForm(articleData); }
    //                             else {
    //                                 alert(lang.no_permission);
    //                                 location.href='/';
    //                             }
    //                         },
    //                         function (xhr) {}
    //                     );
    //                 }
    //             });
    //
    //             callback();
    //         }
    //     },
    //     function (xhr) {}
    // );
}

function initModifyForm(data) {
    $('#write-title-input').val(data.subject);
    $('#write-title-options-notice').prop('checked', data.is_notice == 1 ? true : false);
    $('#write-title-options-secret').prop('checked', data.is_secret == 1 ? true : false);

    /* 2020.02.11 재헌
     * 첨부 이미지 프로세스 변경
     */
    var content = $('<div>' + data.content + '</div>');
    if (content.find('img').length > 0) {
        $.each(content.find('img'), function () {
            var id = qv_func.randomId();
            this.id = id;

            if ($(this).hasClass('board-thumbnail')) {
                var imageItem = '<div class="write-upload-image-item active" data-id="' + id + '"  data-active-text="' + lang.representative_image + '" style="background-image:url(' + $(this).attr('src') + ')">' +
                    '<div class="write-upload-image-item-delete"><i class="fa fa-close"></i></div>' +
                    '</div>';
            } else {
                var imageItem = '<div class="write-upload-image-item" data-id="' + id + '"  data-active-text="' + lang.representative_image + '" style="background-image:url(' + $(this).attr('src') + ')">' +
                    '<div class="write-upload-image-item-delete"><i class="fa fa-close"></i></div>' +
                    '</div>';
            }
            $('.write-upload-images-list').append(imageItem);
        });
        $('.write-upload-images').show();
    }

    CKEDITOR.instances['write-content-textarea'].setData(content.html());
    if (data.category == null || data.category == '' || data.category == undefined) {
        $('.write-category-select option[value="0"]').prop('selected',true);
    }
    else {
        $('.write-category-select option[value=' + data.category + ']').prop('selected',true);
    }

    // 댓글은 공지로 지정할 수 없음
    if (data.reply.length > 0) {
        $('#write-title-options-notice').prop('disabled', true);
    }
}

function setCategory(callback) {
    qvjax_direct(
        "select_board_category",
        "/module/board/board.php",
        'bid=' + __BID,
        function (data) {
            if (data.length > 0) {
                $('.write-category-select option').remove();
                $.each(data, function() {
                    var html = '<option value="' + this.category_id + '">' + this.category_name + '</option>';
                    $('.write-category-select').append(html);
                });
            }
            callback();
        },
        function (xhr) {}
    );
}

function setAttachments(bid, aid, callback) {
    qvjax_direct(
        "select_board_file",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid,
        function (data) {
            $('.write-attachments-list ul li').remove();
            if (data.length > 0) {
                var html = '<div class="write-attatchments-title">' + lang.attachment +'</div>';
                $.each(data, function() {
                    html += '<li id="' + this.file_id + '" data-type="' + this.file_name.split('.').pop() + '">' +
                        '<div class="write-attachments-filename"><i class="fa fa-download" aria-hidden="true"></i>' + this.file_name + '</div>' +
                        '<div class="write-attachments-filesize">' + bytesToSize(this.file_size) + '</div>' +
                        '<div class="write-attachments-delete"><i class="material-icons">clear</i></div>' +
                        '</li>';
                });
                $('.write-attachments-list ul').children('li').remove();
                $('.write-attachments-list ul').find('.write-attatchments-title').remove();
                $('.write-attachments-list ul').append(html);
            }
            callback();
        },
        function (xhr) {}
    );
}

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function generateRandomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

$('.write-body').delegate('.write-attachments-delete', 'click', function() {
    var fid = $(this).parents('li')[0].id;
    var ftype = $(this).parents('li').data('type');
    var result = confirm(lang.remove_attachment);
    if(result) {
        $.ajax({
            type: "POST",
            url: "//g" + QV_BASE_OBJ.svid + "m.quv.kr" + "/aws/board_remove_file.php",
            data: 'stid=' + QV_BASE_OBJ.stid + '&bid=' + __BID + '&fid=' + fid + '&ftype=' + ftype,
            dataType: "json",
            success: function (data) {
                if (data) {
                    setAttachments(__BID, __AID, function() {
                        alert(lang.remove_complete);
                    });
                }
            },
            error: function (xhr) {
            }
        });
    }
});

$('#main_container').delegate('.write-button-confirm', 'click', function() {
    var result = [];
    var obj = new Object();

    if ($('.write-service input').length > 0 || __SERVICE == 1) {
        if (!$('.write-service input').prop('checked')) {
            alert(lang.agree_privacy_info);
            return;
        }
    }

    // 수정
    if (__W.toLowerCase() == 'u' &&(__AID != '' && __AID != undefined)) {
        obj.bid = __BID;
        obj.aid = __AID;
        obj.category = $('.write-category-select option:selected').val();
        obj.subject = $('#write-title-input').val();
        obj.content = CKEDITOR.instances['write-content-textarea'].getData();
        obj.password = $('#write-nonmember-options-password').val();
        obj.is_secret = $('#write-title-options-secret').prop('checked') ? 1 : 0;
        if ($('#write-title-options-notice').length > 0) {
            obj.is_notice = $('#write-title-options-notice').prop('checked') ? 1 : 0;

            if ($('.write-body').data('article').reply.length > 0) {
                obj.is_notice = 0;
            }
        }

        if (obj.subject.trim() == '') {
            alert(lang.enter_subject); return;
        }
        else if (obj.content.trim() == '') {
            alert(lang.enter_contents); return;
        }

        $('#loading-mask').addClass('loading-mask-show');

        result.push(obj);

        // 게시글 업데이트 시 권한을 다시 한 번 확인한다.
        checkAuth(obj.bid, obj.aid,
            function() {
                qvjax_direct(
                    "update_board_article",
                    "/module/board/board.php",
                    'json_result=' + encodeURIComponent(JSON.stringify(result)),
                    function (data) {
                        if (data) {
                            $('#loading-mask').removeClass('loading-mask-show');
                            if (data.message == 'ERROR') {
                                alert(lang.no_permission);
                            }
                            else {
                                alert(lang.complete_modify);
                                location.href = "/module/board/read_form.html?bid=" + __BID + "&aid=" + __AID + "&pn=" + __PN;
                            }
                            $('#loading-mask').removeClass('loading-mask-show');
                        }
                    },
                    function (xhr) {
                        $('#loading-mask').removeClass('loading-mask-show');
                    }
                );
            },
            function() { $('#loading-mask').removeClass('loading-mask-show'); alert(lang.no_permission); },
            function() {
                var password = $('.write-body').data('password');
                var article_array = [];
                var article_obj = new Object();
                article_obj.aid = obj.aid;
                article_obj.bid = obj.bid;
                article_obj.password = password;
                article_array.push(article_obj);

                checkArticlePassword(
                    article_array,
                    function() {
                        qvjax_direct(
                            "update_board_article",
                            "/module/board/board.php",
                            'json_result=' + encodeURIComponent(JSON.stringify(result)),
                            function (data) {
                                if (data) {
                                    $('#loading-mask').removeClass('loading-mask-show');
                                    if (data.message == 'ERROR') {
                                        alert(lang.no_permission);
                                    }
                                    else {
                                        alert(lang.complete_modify);
                                        location.href = "/module/board/read_form.html?bid=" + __BID + "&aid=" + __AID + "&pn=" + __PN;
                                    }
                                    $('#loading-mask').removeClass('loading-mask-show');
                                }
                            },
                            function (xhr) {
                                $('#loading-mask').removeClass('loading-mask-show');
                            }
                        );
                    },
                    function() {
                        alert(lang.invalid_password);
                        parent.history.back();
                    }
                );
            }
        );
    }
    // 답글
    else if (__W.toLowerCase() == 'r' &&(__AID != '' && __AID != undefined)) {
        // 회원
        if ($('.write-body').data('type') == 'member') {
            var aid = generateRandomId();
            obj.bid = __BID;
            obj.aid = aid;
            obj.category = $('.write-body').data('article').category;
            obj.subject = $('#write-title-input').val();
            obj.content = CKEDITOR.instances['write-content-textarea'].getData();
            obj.is_secret = $('#write-title-options-secret').prop('checked') ? 1 : 0;

            if (obj.subject.trim() == '') {
                alert(lang.enter_subject); return;
            }
            else if (obj.content.trim() == '') {
                alert(lang.enter_contents); return;
            }

            $('#loading-mask').addClass('loading-mask-show');

            result.push(obj);

            qvjax_direct(
                "insert_board_reply",
                "/module/board/board.php",
                'pid=' + __AID + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
                function (data) {
                    if (data) {
                        $('#loading-mask').removeClass('loading-mask-show');
                        if (data.message == 'ERROR' && data.code == 1355) {
                            alert(lang.no_more_reply);
                        }
                        else if (data.message == 'ERROR') {
                            alert(lang.no_permission);
                        }
                        else {
                            pushNotification('', obj.subject, 'board');

                            alert(lang.complete_regist);
                            location.href = "/module/board/read_form.html?bid=" + __BID + "&aid=" + aid + "&pn=" + __PN;
                        }
                        $('#loading-mask').removeClass('loading-mask-show');
                    }
                },
                function (xhr) {
                    $('#loading-mask').removeClass('loading-mask-show');
                }
            );
        }
        // 비회원
        else {
            var aid = generateRandomId();
            obj.bid = __BID;
            obj.aid = aid;
            obj.category = $('.write-body').data('article').category;
            obj.subject = $('#write-title-input').val();
            //obj.content = encodeURIComponent(CKEDITOR.instances['write-content-textarea'].getData());
            obj.content = CKEDITOR.instances['write-content-textarea'].getData();
            obj.writer = $('#write-nonmember-options-writer').val();
            obj.password = $('#write-nonmember-options-password').val();
            obj.is_secret = $('#write-title-options-secret').prop('checked') ? 1 : 0;

            if (obj.subject.trim() == '') {
                alert(lang.enter_subject); return;
            }
            else if (obj.writer.trim() == '') {
                alert(lang.enter_writer); return;
            }
            else if (obj.content.trim() == '') {
                alert(lang.enter_contents); return;
            }

            $('#loading-mask').addClass('loading-mask-show');

            result.push(obj);

            qvjax_direct(
                "insert_board_reply_nonmember",
                "/module/board/board.php",
                'pid=' + __AID + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
                function (data) {
                    if (data) {
                        $('#loading-mask').removeClass('loading-mask-show');
                        if (data.message == 'ERROR' && data.code == 1355) {
                            alert(lang.no_more_reply);
                        }
                        else if (data.message == 'ERROR') {
                            alert(lang.no_permission);
                        }
                        else {
                            pushNotification('', obj.subject, 'board');

                            alert(lang.complete_regist);
                            //location.href = "/module/board/read_form.html?bid=" + __BID + "&aid=" + aid;
                            // 비회원 글 작성 완료 시 목록으로 이동하도록 수정
                            redirectPrevPage();
                        }
                        $('#loading-mask').removeClass('loading-mask-show');
                    }
                },
                function (xhr) {
                    $('#loading-mask').removeClass('loading-mask-show');
                }
            );
        }
    }
    // 신규
    else {
        // 회원upload
        if ($('.write-body').data('type') == 'member') {
            obj.aid = __AID;
            obj.bid = __BID;
            obj.category = $('.write-category-select option:selected').val();
            obj.subject = $('#write-title-input').val();
            obj.content = CKEDITOR.instances['write-content-textarea'].getData();
            obj.views = 0;
            obj.hits = 0;
            obj.is_secret = $('#write-title-options-secret').prop('checked') ? 1 : 0;
            obj.is_notice = $('#write-title-options-notice').prop('checked') ? 1 : 0;
            obj.parent = 1;
            obj.is_comment = 0;
            obj.comment = 0;

            if (obj.subject.trim() == '') {
                alert(lang.enter_subject); return;
            }
            else if (obj.content.trim() == '') {
                alert(lang.enter_contents); return;
            }

            $('#loading-mask').addClass('loading-mask-show');

            result.push(obj);

            qvjax_direct(
                "insert_board_article",
                "/module/board/board.php",
                'json_result=' + encodeURIComponent(JSON.stringify(result)),
                function (data) {
                    if (data.message == 'ERROR') {
                        alert(lang.no_permission);
                    }
                    else {
                        pushNotification('', obj.subject, 'board');

                        qv_func.conversion('board', function() {
                            alert(lang.complete_regist);
                            location.href = "/module/board/read_form.html?bid=" + __BID + "&aid=" + __AID + "&pn=" + __PN;
                        });
                    }
                    $('#loading-mask').removeClass('loading-mask-show');
                },
                function (xhr) {
                    $('#loading-mask').removeClass('loading-mask-show');
                }
            );
        }
        // 비회원
        else {
            obj.aid = __AID;
            obj.bid = __BID;
            obj.category = $('.write-category-select option:selected').val();
            obj.subject = $('#write-title-input').val();
            //obj.content = encodeURIComponent(CKEDITOR.instances['write-content-textarea'].getData());
            obj.content = CKEDITOR.instances['write-content-textarea'].getData();
            obj.views = 0;
            obj.hits = 0;
            obj.writer = $('#write-nonmember-options-writer').val();
            obj.password = $('#write-nonmember-options-password').val();
            obj.is_secret = $('#write-title-options-secret').prop('checked') ? 1 : 0;
            obj.parent = 1;
            obj.is_comment = 0;
            obj.comment = 0;

            if (obj.subject.trim() == '') {
                alert(lang.enter_subject); return;
            }
            else if (obj.writer.trim() == '') {
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

            $('#loading-mask').addClass('loading-mask-show');

            result.push(obj);

            qvjax_direct(
                "insert_board_article_nonmember",
                "/module/board/board.php",
                'json_result=' + encodeURIComponent(JSON.stringify(result)),
                function (data) {
                    if (data.message == 'ERROR') {
                        alert(lang.no_permission);
                    }
                    else {
                        pushNotification('', obj.subject, 'board');

                        qv_func.conversion('board', function() {
                            alert(lang.complete_regist);
                            //location.href = "/module/board/read_form.html?bid=" + __BID + "&aid=" + __AID + "&pn=" + __PN;
                            // 비회원 글 작성 완료 시 목록으로 이동하도록 수정
                            redirectPrevPage();
                        });
                    }
                    $('#loading-mask').removeClass('loading-mask-show');
                },
                function (xhr) {
                    $('#loading-mask').removeClass('loading-mask-show');
                }
            )
        }
    }
});

// $('#write-title-options-secret').change(function() {
//     if($(this).is(":checked")) {
//         $('#write-nonmember-options-password').show();
//     }
//     else {
//         $('#write-nonmember-options-password').hide();
//     }
// });

$("#WritePasswordCheckModal").delegate("#WritePasswordCheckModalBtnSave", "click", function(e) {
    var password = $('#WritePasswordCheck').val();
    var array = [];
    var obj = new Object();
    obj.aid = __AID;
    obj.bid = __BID;
    obj.password = password;
    array.push(obj);

    checkArticlePassword(
        array,
        function() {
            initModifyForm($('.write-body').data('article'));
            $('.write-body').data('password', obj.password);
            $('#WritePasswordCheckModal').data('certification', true);
            $('#WritePasswordCheckModal').modal('hide');
        },
        function() {
            $('#WritePasswordCheckModal').data('certification', false);
            alert(lang.invalid_password);
            parent.history.back();
        });

    // qvjax_direct(
    //     "check_board_article_password",
    //     "/module/board/board.php",
    //     'json_result=' + encodeURIComponent(JSON.stringify(array)),
    //     function (data) {
    //         if (data > 0) {
    //             initModifyForm($('.write-body').data('article'));
    //             $('.write-body').data('password', obj.password);
    //             $('#WritePasswordCheckModal').data('certification', true);
    //             $('#WritePasswordCheckModal').modal('hide');
    //         }
    //         else {
    //             $('#WritePasswordCheckModal').data('certification', false);
    //             alert(lang.invalid_password);
    //             parent.history.back();
    //         }
    //     },
    //     function (xhr) { }
    // );
});

$("#WritePasswordCheckModal").on('hide.bs.modal', function () {
    if (!$('#WritePasswordCheckModal').data('certification')) {
        parent.history.back();
    }
});


// 비디오 클립
$('.write-videos').on('click', function() {
    $('#WriteVideoModal').modal('show');
});

$(".modal").delegate("#WriteVideoModalBtnSave", "click", function(e) {
    // url 변경
    var videoUrl = $('#video-url').val();
    if (videoUrl.trim() != "") {
        var pattern1 = /(?:http?s?:\/\/)?(?:www\.)?(?:vimeo\.com)\/?(.+)/g;
        var pattern2 = /(?:http?s?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g;
        var pattern3 = /([-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?(?:jpg|jpeg|gif|png))/gi;

        var videoId = '';
        // youtube
        if (pattern2.test(videoUrl) && (videoUrl.indexOf('//www.youtube.com/watch') > -1 || videoUrl.indexOf('//youtu.be/') > -1)) {
            var replacement = 'https://www.youtube.com/embed/$1';
            var replacementUrl = videoUrl.replace(pattern2, replacement);

            videoId = videoUrl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
            videoId = videoId[1];
            var videoType = 'youtube';
        }
        // vimeo
        else if (pattern1.test(videoUrl) && videoUrl.indexOf('//vimeo.com/') > -1) {
            var replacement = 'https://player.vimeo.com/video/$1';
            var replacementUrl = videoUrl.replace(pattern1, replacement);

            videoId = videoUrl.match(/(?:https?:\/{2})?(?:w{3}\.)?vimeo.com\/(\d+)($|\/)/);
            videoId = videoId[1];
            var videoType = 'vimeo';
        }
        // etc
        else if (pattern3.test(videoUrl)) {
            var replacement = '$1';
            var replacementUrl = videoUrl.replace(pattern3, replacement);

            var videoType = 'etc';
        }

        replacementUrl = typeof(replacementUrl) == "undefined" ? videoUrl : replacementUrl;
        replacementUrl += '?frameborder=0&autoplay=1';

        var iframeHtml = '<iframe class="qv-video" data-id="' + videoId + '" data-type="' + videoType + '" src="' + replacementUrl + '" frameborder="0" style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;height:480px;width:100%;" height="480px" width="100%"></iframe>';

        // ckeditor에 커서가 활성화 되어있을 때
        if (CKEDITOR.instances['write-content-textarea'].getSelection().getStartElement() != null) {
            $(CKEDITOR.instances['write-content-textarea'].getSelection().getStartElement().$).after(iframeHtml);
        }
        else {
            var html = CKEDITOR.instances['write-content-textarea'].getData();
            html += iframeHtml;
            CKEDITOR.instances['write-content-textarea'].setData(html);
        }

        $('#WriteVideoModal').modal('hide');
    }
});

$('#WritePasswordCheckModal').keyup(function(event){
    // press enter in modal
    if(event.keyCode == 13) { $('#WritePasswordCheckModalBtnSave').trigger( "click" ); }
});

$('.write-close, .write-button-cancel').on('click', function() {
    redirectPrevPage();
});

function redirectPrevPage() {
    var query = qv_func.getUrlParams();
    var prevUrl = query.prev;
    if (prevUrl == undefined || prevUrl == '') {
        parent.history.back();
    }
    else {
        location.href = decodeURIComponent(prevUrl);
    }
}



/* 2020.02.11 재헌
 * 첨부 이미지 프로세스 변경
 */
$('.write-body').delegate('.write-upload-image-item', 'click', function(e) {
    if ($(e.target).is('.write-upload-image-item-delete') ||
        $(e.target).parents('.write-upload-image-item-delete').length > 0) return;

    var id = $(this).attr('data-id');
    var data = $('<div>' + CKEDITOR.instances['write-content-textarea'].getData() + '</div>');

    if ($(this).hasClass('active')) {
        data.find('img').removeClass('board-thumbnail');
        $(this).removeClass('active');
        CKEDITOR.instances['write-content-textarea'].setData(data.html());
    }
    else {
        data.find('img').removeClass('board-thumbnail');
        data.find('img#' + id).addClass('board-thumbnail');

        $('.write-upload-image-item.active').removeClass('active');
        $(this).addClass('active');
        CKEDITOR.instances['write-content-textarea'].setData(data.html());
    }
});
$('.write-body').delegate('.write-upload-image-item-delete', 'click', function(e) {
    var result = confirm('해당 이미지를 삭제하시겠습니까?');
    if (result) {
        var target = $(this).parent('.write-upload-image-item');
        var id = target.attr('data-id');
        var data = $('<div>' + CKEDITOR.instances['write-content-textarea'].getData() + '</div>');

        data.find('img#' + id).remove();
        target.remove();
        CKEDITOR.instances['write-content-textarea'].setData(data.html());
    }
});