/**
 * Created by Gram.Sim on 2018-03-02.
 */
$(window).load(function() {
    // datepicker
    (function($){
        $.fn.datepicker.dates['ko'] = {
            days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
            daysShort: ["일", "월", "화", "수", "목", "금", "토", "일"],
            daysMin: ["일", "월", "화", "수", "목", "금", "토", "일"],
            months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
            monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
        };
    }(jQuery));

    // form-contents-privacy disabled
    $('#main_container').delegate('.form-contents-privacy', 'change keydown paste input', function(e) {
        e.preventDefault();
        return
    });

    form_initialize();
});

function form_initialize() {
    formRebuild(function() {
        initFomrFileSettings();

        if ($('#main_container').find('.form-contents-datepicker').length > 0) {
            var locale = LANG ? LANG : 'ko';
            $('#main_container').find('.form-contents-datepicker input').datepicker({
                format: "yyyy-mm-dd",
                daysOfWeekHighlighted: "0,6",
                todayHighlight: true,
                language: locale,
            });
        }

        // timepicker
        if ($('#main_container').find('.form-contents-timepicker').length > 0) {
            $('#main_container').find('.form-contents-timepicker input').timepicker();
        }


        //chrome input autocomplete prevent
        setTimeout(function(){
            $('#main_container .formBox').each(function() {
                var fid = $(this).attr('data-fid');
                if (fid == undefined) return;

                $.each($(this).find('input'), function () {
                    $(this).removeAttr("disabled");
                });
            });
        },500);
    });
}

function form_submit(obj) {
    if ($(obj).parents('.modal').length > 0) return;

    var form = $(obj).parents('.formBox').first();
    if (form.find('.form-guide').length > 0) {
        alert(lang.not_complete_form_creation);
        return;
    }

    var valid = true;
    var result = [];
    var contents = $(obj).parents('.form-demo').children('.form-contents-item');
    var box = $(obj).parents('.formBox').first();

    //contents.find('.form-contents-view').next('div').remove();
    contents.find('.form-required-warning').remove();
    contents.find('.form-validation-warning').remove();

    // description 수집, 20190222 파기예정, 20190227 주석처리
    // var descriptionMappingArray = [];

    // required, validation check
    $(contents).each(function (i, val) {
        console.log("i:"+i);
        console.log(val);

        var view = $(val).children('.form-contents-view');
        console.log(view.children('div').length);
        //form-contents-view 하위에 div 없는 경우 예외 처리 -go 19.2.22
        if(view.children('div').length>0) {

            var contentsType = view.children('div')[0].className;
            if (contentsType.indexOf(' ') > -1) {
                var arr = contentsType.split(' ');
                contentsType = $.grep(arr, function (e) {
                    return e.indexOf('form-contents') > -1;
                })[0];
            }
            var title = view.children('h4').text();
            if (title == '') {
                view.children('.form-contents-input')
            }
            var description = view.children('p').text();

            switch (contentsType) {
                case 'form-contents-input':
                    var val = view.find('.form-contents-input input').val();
                    var validationType = view.data('validation');
                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && val == '') {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    // 유효성 확인
                    else if ((validationType != '' || validationType == undefined) && !validationCheck(val, validationType)) {
                        if (val != '') {
                            valid = !form_AppendValidationWarning(view.parent());
                        }
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val.replace(/'/g, '\\\'');
                        result.push(obj);
                    }
                    break;
                case 'form-contents-phone':
                    var val = '';
                    $.each(view.find('.form-contents-phone').children(), function() { val += $(this).val(); });
                    var validationType = 2;
                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && val == '') {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    // 유효성 확인
                    else if ((validationType != '' || validationType == undefined) && !validationCheck(val, validationType)) {
                        if (val != '') {
                            valid = !form_AppendValidationWarning(view.parent());
                        }
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val.replace(/'/g, '\\\'');
                        result.push(obj);
                    }
                    break;
                case 'form-contents-textarea':
                    var val = view.find('.form-contents-textarea textarea').val();
                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && val == '') {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val.replace(/'/g, '\\\'');
                        result.push(obj);
                    }
                    break;
                case 'form-contents-checkbox':
                case 'form-contents-radio':
                    var val = '';
                    view.find('input:checked').each(function () {
                        val += $(this).val() + ",";
                    });
                    if (val != '') {
                        val = val.slice(0, -1);
                    }
                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && val == '') {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val.replace(/'/g, '\\\'');
                        result.push(obj);
                    }
                    break;
                case 'form-contents-select':
                    var val = view.find('.form-contents-select .form-contents-select-dropdown').val();
                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && val == '') {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val.replace(/'/g, '\\\'');
                        result.push(obj);
                    }
                    break;
                case 'form-contents-address':
                    var val = '';
                    view.find('.form-contents-address input').each(function () {
                        val += $(this).val() + "|";
                    });
                    if (val != '') {
                        val = val.slice(0, -1);
                    }
                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && val == '') {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val.replace(/'/g, '\\\'');
                        result.push(obj);
                    }
                    break;
                case 'form-contents-datepicker':
                case 'form-contents-timepicker':
                    var val = '';
                    var date = view.find('.form-contents-datepicker input').val();
                    var time = view.find('.form-contents-timepicker input').val();
                    if (date && view.find('.form-contents-datepicker').css('display') != 'none') {
                        val += date;
                    }
                    if (time && view.find('.form-contents-timepicker').css('display') != 'none') {
                        val += (val == '') ? time : ' ' + time;
                    }
                    // if (!date || view.find('.form-contents-datepicker').css('display') == 'none') {
                    //     date = '0000-00-00';
                    // }
                    // if (!time || view.find('.form-contents-timepicker').css('display') == 'none') {
                    //     time = '00:00 AM';
                    // }
                    // var val = date + ' ' + time;
                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && val == '') {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val.replace(/'/g, '\\\'');
                        result.push(obj);
                    }
                    break;
                case 'form-contents-privacy':
                    var val = view.find('.form-contents-privacy-checkbox').is(':checked');
                    // 개인정보 수집 및 이용 동의
                    if (!val) {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }
                    else {
                        var obj = new Object();
                        obj.key = this.id;
                        obj.title = title;
                        obj.value = val;
                        result.push(obj);
                    }
                    break;
                case 'form-contents-file':
                    var arr = [];
                    $.each(view.find('.form-file-item'), function () {
                        var item = new Object();
                        item.n = $(this).attr('data-name');
                        item.p = $(this).attr('data-path').replace(/https:\/\/cdn.quv.kr/g, '');
                        if (item.n.length > 20) {
                            var f = item.n.slice(0, 15) + '...';
                            var e = item.n.split('.').pop();
                            item.n = f + e;
                        }
                        arr.push(item);
                    });

                    // 필수요소 확인
                    if (view.children('h4').hasClass('required') && arr.length == 0) {
                        valid = !form_AppendRequiredWarning(view.parent());
                    }

                    var val = JSON.stringify(arr);
                    var obj = new Object();
                    obj.key = this.id;
                    obj.title = title;
                    obj.value = val;
                    result.push(obj);
                    break;
            }
        }

        // description 수집, 20190222 파기예정, 20190227 주석처리
        // var descriptionMappingObject = new Object();
        // descriptionMappingObject.id = this.id;
        // descriptionMappingObject.description = description;
        // descriptionMappingArray.push(descriptionMappingObject);
    });

    if (valid) {
        //var fid = $(obj).parents('.box')[0].id;
        var id = $(obj).parents('.box')[0].id;
        var fid = $(obj).parents('.box').attr('data-fid');
        var fname = $(obj).parents('.form-demo').attr('data-fname');

        $(obj).parents('.form-demo').append('<div class="qv-loader-layer"><div class="qv-loader qv-loader-black"></div></div>');

        if ($(obj).data('message') == undefined || $(obj).data('message') == '') {
            var message = lang.complete_creation
        }
        else {
            var message = $(obj).data('message');
        }

        qvjax_direct(
            "form_submit",
            "/module/form/form.php",
            'fid=' + fid + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
            function (data) {
                if (data == 1) {
                    form_sendMail(fname, $(obj).data('receiver'), result, function() {
                        $(obj).parents('.form-demo').find('.qv-loader-layer').remove();
                        $('#' + id).find('.form-file-item').remove();
                        $('#' + id).find('.form-contents-input input').val('');
                        $('#' + id).find('.form-contents-textarea textarea').val('');
                        $('#' + id).find('input:checked').prop('checked', false);
                        $('#' + id).find('.form-contents-select .form-contents-select-dropdown option:eq(0)').prop('selected', true);
                        $('#' + id).find('.form-contents-address input').each(function() { $(this).val('') });
                        $('#' + id).find('.form-contents-datepicker input').val('');
                        $('#' + id).find('.form-contents-timepicker input').val('');
                        $('#' + id).find('.form-contents-phone input').val('');
                        $('#' + id).find('.form-contents-privacy-checkbox').prop('checked', false);

                        alert(message);

                        // 폼 전환 기록
                        qv_func.conversion('form', function() {
                            var link = $(obj).data('link_id');
                            var link_type = $(obj).data('link_type');
                            var link_target = $(obj).data('link_target');
                            if (link_type == "page") {
                                link = location.origin + link;
                            }
                            if (link_target != '_blank') {
                                link_target = '_self';
                            }

                            if (link == '' || link == undefined) { return; }
                            else {
                                var win = window.open(link, link_target);
                                if (win) {
                                    win.focus();
                                } else {
                                    window.open(link, '_self');
                                }
                            }
                        });
                    });

                    pushNotification('', fname, 'form');

                    $(obj).parents('.form-demo').removeClass("required-warning");

                    // description 수집, 20190222 파기예정, 20190227 주석처리
                    // qvjax_direct(
                    //     "update_form_response_description",
                    //     "/module/form/form.php",
                    //     'json_result=' + encodeURIComponent(JSON.stringify(descriptionMappingArray)),
                    //     function(data) { },
                    //     function(xhr) { }
                    // )
                }
                else if (data.message.toLowerCase() == 'notexist') {
                    $(obj).parents('.form-demo').find('.qv-loader-layer').remove();
                    alert(lang.not_exist_form);
                }
                else if (data.message.toLowerCase() == 'error') {
                    // data-type:11 제외 (일반 텍스트)
                    var invalidView = $(obj).parents('.form-demo').find('.form-contents-item:not([data-type=11]) > .form-contents-view')[data.index];
                    form_AppendValidationWarning($(invalidView));
                }
                else { alert(lang.problem_1); }
            },
            function (xhr) {
                $(obj).parents('.form-demo').find('.qv-loader-layer').remove();
                alert(lang.problem_2);
            }
        );
    }
    else {
        if (box.find('.form-required-warning, .form-validation-warning').length > 0) {
            var offsetTop = box.find('.form-required-warning, .form-validation-warning').first().offset().top;
            if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                offsetTop = $('body').scrollTop() + offsetTop;
            }
            $("html, body").animate({scrollTop: offsetTop - 300}, 300);
        }
    }
}

function form_AppendRequiredWarning(obj) {
    var _fmb=$(obj).parents('.form-demo').find('.form-contents-item').css('margin-bottom');
    if(_fmb) _fmb=qv_func.replace_px(_fmb);
    if(_fmb<20){
        console.log('_fmb:'+_fmb);
        $(obj).parents('.form-demo').removeClass("required-warning").addClass("required-warning");
    }
    obj.append('<div class="form-required-warning" style="color:red; position:absolute; right:0; font-size: 13px; z-index: 1;">* ' + lang.required_input_element + '</div>');
    $(obj).parents('.form-demo').find('.qv-loader-layer').remove();
    return true;
}
function form_AppendValidationWarning(obj) {
    obj.append('<div class="form-validation-warning" style="color:red; position:absolute; right:0; font-size: 13px; z-index: 1;">* ' + lang.invalid_format + '</div>');
    $(obj).parents('.form-demo').find('.qv-loader-layer').remove();
    return true;
}


function validationCheck(obj, type) {
    switch (String(type)) {
        case '1':
            return validateEmail(obj);
            break;
        case '2':
            return validatePhoneNumber(obj);
            break;
        case '3':
            return validateNumber(obj);
            break;
        case '4':
            return validateEnglish(obj.replace(/(\s*)/g, ''));
            break;
        case '5':
            return validateKorean(obj.replace(/(\s*)/g, ''));
            break;
    }

    return true;
}

function validateEmail(obj) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(obj);
}

function validatePhoneNumber(obj) {
    //https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    var re = /^[\+]?[(]?[0-9]{2,3}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(obj);
}

function validateNumber(obj) {
    var re = /^[0-9]*$/;
    return re.test(obj);
}

function validateEnglish(obj) {
    var re = /^[A-Za-z0-9]*$/;
    return re.test(obj)
}

function validateKorean(obj) {
    var re = /^[가-힣0-9]*$/;
    return re.test(obj)
}

function form_sendMail(formname, to, result, callback) {
    if (!to) {
        callback();
        return;
    }

    qvjax_direct(
        "send_mail_write_form",
        "/module/mail/mail.php",
        'stid=' + QV_BASE_OBJ.stid + '&formname=' + formname + '&to=' + to + '&json_result=' + encodeURIComponent(JSON.stringify(result)),
        function (data) {
            callback();
        },
        function (xhr) {
            callback();
        }
    );
}

function _execDaumPostcode(obj) {
    daum.postcode.load(function() {
        new daum.Postcode({
            oncomplete: function (data) {
                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                // 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
                var extraRoadAddr = ''; // 도로명 조합형 주소 변수
                var juso = '';
                // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                // 건물명이 있고, 공동주택일 경우 추가한다.
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                // 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
                if (extraRoadAddr !== '') {
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
                // 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
                if (fullRoadAddr !== '') {
                    fullRoadAddr += extraRoadAddr;
                }
                if (data.userSelectedType == "R") {
                    juso = fullRoadAddr;
                } else {
                    juso = data.jibunAddress;
                }

                var id = $(obj).prev()[0].id.replace('post', '');
                // 우편번호와 주소 정보를 해당 필드에 넣는다.
                document.getElementById('post' + id).value = data.zonecode; //5자리 새우편번호 사용
                document.getElementById('address' + id).value = juso;
            }
        }).open();
    });
}

var currentFormUploadFileCount;
function initFomrFileSettings() {
    var upload_size_limit = QV_BASE_OBJ.is_free_version == "1" ? 10 : 30;
    // 파일 업로드
    if ($('.formBox').length > 0) {
        $.each($('.formBox .form-contents-item[data-type="10"]'), function() {
            if ($(this).find('.form-contents-file').length == 0) return;
            else if ($(this).find('.form-contents-file').length >= 5) { alert(lang.upload_file_limit); return; }
            var fid = $(this).parents('.formBox')[0].id;
            var itemid = this.id;
            var fileUploadSettings = {
                url: "//g" + QV_BASE_OBJ.svid + "m.quv.kr" + "/aws/form_upload_file.php",
                formData: {"sskey":QV_BASE_OBJ.sskey, "token":QV_BASE_OBJ.token, "stid":QV_BASE_OBJ.stid, "svid":QV_BASE_OBJ.svid, "fid": fid, "itemid": itemid},
                dragDrop: false,
                dragDropStr: "",
                multiple: true,
                fileName: "file",
                maxFileSize: 1024*1024*upload_size_limit,
                acceptFiles: "*",
                showStatusAfterSuccess: false,
                showDone: false,
                showDelete: false,
                uploadButtonClass: "form-upload-files",
                onSelect: function(files) {
                    var fileStatusError=0;
                    $('#loading-mask').addClass('loading-mask-show');
                    $.each(files, function() {
                        if(this.size > 1024*1024*upload_size_limit){
                            fileStatusError=1;
                            return false;
                        }
                    });
                    if(files.length + currentFormUploadFileCount > 5) {
                        alert(lang.upload_file_limit);
                        $('#loading-mask').removeClass('loading-mask-show');
                        return false;
                    }
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
                        var returnValue = $.parseJSON(data);
                        var fid = returnValue.fid;
                        var path = returnValue.path;
                        var filename = returnValue.filename;
                        var html = '<div class="form-file-item" data-filename="' + filename + '" data-name="' + files[0] + '" data-path="' + path + '"><div class="form-file-item-delete"></div>' + files[0] + '</div>';
                        $('#' + fid + ' #' + itemid).find('.form-contents-file').append($(html));
                        $('#loading-mask').removeClass('loading-mask-show');
                    }
                },
                onError: function(files,status,errMsg,pd) {
                    $('#loading-mask').removeClass('loading-mask-show');
                    alert(lang.upload_error(upload_size_limit));
                }
            };

            if ($(this).find(".form-upload-files").length > 0) {
                $.each($(this).find(".form-upload-files"), function() {
                    $(this).uploadFile(fileUploadSettings);
                });

                // 파일 업로드 전에 기존파일 개수 체크
                $(this).find(".form-contents-file").on('click', function() {
                    currentFormUploadFileCount = $(this).find(".form-upload-files").siblings('.form-file-item').length
                })
            }
        });
    }
}

function initFomrFileDeleteSettings() {
    $('#main_container').delegate('.form-file-item-delete', 'click', function() {
        var item = $(this).parents('.form-file-item');
        var filename = $(this).parents('.form-file-item').first().attr('data-filename');
        var result = confirm(lang.remove_attachment);
        if(result) {
            $.ajax({
                type: "POST",
                url: "//g" + QV_BASE_OBJ.svid + "m.quv.kr" + "/aws/form_remove_file.php",
                data: 'stid=' + QV_BASE_OBJ.stid + '&filename=' + filename,
                dataType: "json",
                success: function (data) {
                    if (data) {
                        item.remove();
                        alert(lang.remove_complete);
                    }
                },
                error: function (xhr) { }
            });
        }
    });
}
initFomrFileDeleteSettings();


function initFormResponseBox() {
    if ($('.formResponseBox').length > 0) {
        $.each($('.formResponseBox'), function() {
            var table = $(this).find('.form-response-table');
            var fid = table.attr('data-fid');
            var page = 1;
            var size = table.attr('data-size') == undefined ? 10 : parseInt(table.attr('data-size'));
            var g_state;

            table.find('tbody').children().remove();

            // language
            if (LANG == 'en') {
                table.find('th.response_date div').html(lang.date_created);
                table.find('th.response_state div').html(lang.state);
            }

            qvjax_direct(
                "select_form_state_info",
                "/module/form/form.php",
                '&fid=' + fid ,
                function (data) {
                    if (data.length > 0) {
                        g_state = $.parseJSON(data[0].states);
                    }
                    else {
                        g_state = [{"v": "0", "n": lang.new_response, "c": "rgb(255, 64, 129)"}, {"v": "1", "n": lang.confirm, "c": "rgb(33, 150, 243)" }];
                    }

                    var hideColumnArray = [];
                    $.each(table.find('th'), function() {
                        var obj = new Object();
                        obj.id = $(this).attr('data-id');
                        obj.hide = $(this).attr('data-hide');
                        obj.unnecessary = $(this).css('display') == 'none' ? 'true' : 'false';
                        hideColumnArray.push(obj);
                    });

                    qvjax_direct(
                        "select_form_response_paging",
                        "/module/form/form.php",
                        '&fid=' + fid + '&page=' + page + '&size=' + size  + '&json_result=' + encodeURIComponent(JSON.stringify(hideColumnArray)),
                        function (data) {
                            var tbody_html = '';
                            $.each(data, function() {
                                var response = this;
                                tbody_html += '<tr id="' + response.id + '">';
                                $.each(table.find('thead tr th:not(.response_id):not(.response_date):not(.response_state)'), function() {
                                    if ($(this).css('display') == 'none') return;

                                    var id = $(this).attr('data-id');
                                    var value = response[id] == null ? '' : response[id];
                                    var type = $(this).attr('data-type');

                                    if (type == 10) {
                                        if (value.indexOf('"n":') > -1 && value.indexOf('"p":') > -1) {
                                            var file = '';
                                            $.each($.parseJSON(value), function () {
                                                file += '<div class="form-file"><a href="' + 'https://cdn.quv.kr' + this.p + '" target="_blank">' + this.n + '</a></div>';
                                            });
                                            value = file;
                                        }
                                        else {
                                            value = '';
                                        }
                                    }
                                    else if (type == 8 || type == 9) {
                                        value = value == 1 ? '동의' : '';
                                    }

                                    tbody_html += '<td data-id="' + id + '">' + value + '</td>';
                                });
                                if (table.find('thead tr th.response_date').css('display') != 'none') {
                                    var reg_date = new Date(parseInt(this.reg_date) * 1000);
                                    tbody_html += '<td data-id="response_date">' + $.datepicker.formatDate('yy-mm-dd', reg_date) + '</td>';
                                }

                                if (table.find('thead tr th.response_state').css('display') != 'none') {
                                    var state = $.grep(g_state, function (e) { return e.v == response.lookup; })[0];
                                    if (state == undefined) {
                                        state = $.grep(g_state, function (e) { return e.v == 1; })[0];
                                    }
                                    tbody_html += '<td data-id="response_state" data-value="' + state.v + '"><div class="form-state" style="background-color:' + state.c + '; color:' + state.c + ';">' + state.n + '</div></td>';
                                }

                                tbody_html += '</tr>';
                            });
                            table.find('tbody').append($(tbody_html));

                            // align, con
                            $.each(table.find('thead tr th'), function() {
                                var id = $(this).attr('data-id');
                                var align = $(this).attr('data-align') == undefined ? 'center' : $(this).attr('data-align');
                                table.find('th[data-id="' + id + '"]').css('text-align', $(this).attr('data-align'));
                                table.find('td[data-id="' + id + '"]').css('text-align', $(this).attr('data-align'));

                                var isHide = $(this).attr('data-hide') == "true" ? true : false;
                                var isBold = $(this).attr('data-bold') == "true" ? true : false;
                                $.each(table.find('td[data-id="' + id + '"]'), function() {
                                    if (isHide) {
                                        if ($(this).attr('data-id')=='response_date' || $(this).attr('data-id')=='response_state') { // date, state 외 항목은 php에서 숨김처리
                                            $(this).html(form_response_text_hide($(this).text()));
                                        }
                                    }
                                    if (isBold) { $(this).html('<b>' +  $(this).html() + '</b>'); }
                                });

                                if ($(this).css('display') == 'none') {
                                    $(this).remove();
                                }
                            });
                        },
                        function(xhr) { }
                    );
                },
                function() {}
            );
        });
    }
}
initFormResponseBox();

function form_response_text_hide(s) {
    if ((qv_func.is_number(s) || qv_func.is_mobile_number(s))
        && s.replace(/-/g, '').length >= 9 && s.replace(/-/g, '').length <= 12) {
        return hide_mobile_numbers(s);
    }
    else if (qv_func.is_email(s)) {
        return hide_email(s);
    }
    else {
        return hide_text(s);
    }
}
function hide_mobile_numbers(s) {
    var result = "";
    var sLength = s.length;
    for(var i = 0; i < sLength; i++){
        result += i < sLength - 4 ? "*" : s.charAt(i);
    }
    return result;
}
function hide_email(s) {
    var result = "";
    var sLength = s.length;
    var atLength = s.indexOf('@');
    for(var i = 0; i < sLength; i++){
        if (i == 0 || i == atLength) {
            result +=  s.charAt(i);
        }
        else {
            result += '*'
        }
    }
    return result;
}
function hide_text(s) {
    var result = "";
    var sLength = s.length;
    for(var i = 0; i < sLength; i++){
        result += i == 0 ? s.charAt(i) : "*";
    }
    return result;
}

function formRebuild(callback) {
    if ($('#main_container .formBox').length == 0) { return; }
    if (!callback) { callback = function() {} }
    qvjax_direct(
        "select_form_table_info_all",
        "/module/form/form.php",
        '',
        function (data) {
            if (data.length > 0) {
                // 중복 제외한 fid 배열 생성
                var ids = [];
                $.each(data, function () {
                    if (this.disabled == 1) return;

                    if ($.inArray(this.fid, ids) !== -1) { }
                    else {
                        ids.push(this.fid);
                    }
                });

                // fid 기준으로 data 결과 분류
                var result = [];
                $.each(ids, function() {
                    var fid = this;
                    result.push($.grep(data, function(e){ return e.fid == fid; }));
                });

                var form_info = {};
                for(var i = 0; i < result.length; i++) {
                    var fid = result[i][0].fid;
                    var sub_obj_array = [];
                    $.each(result[i], function() {
                        var sub_obj = new Object();
                        sub_obj.fid = this.fid;
                        sub_obj.fname = this.fname;
                        sub_obj.disabled = this.disabled;
                        sub_obj.displayed = this.displayed;
                        sub_obj.id = this.id;
                        sub_obj.description = this.description == null ? '' : this.description;
                        sub_obj.name = this.name;
                        sub_obj.options = this.options;
                        sub_obj.orderby = this.orderby;
                        sub_obj.required = this.required;
                        sub_obj.type = this.type;
                        sub_obj.validation = this.validation;
                        sub_obj.grid = this.grid;
                        sub_obj_array.push(sub_obj);
                    });

                    form_info[fid] = sub_obj_array;
                }

                var customValueArray = [];
                $('#main_container .formBox').each(function() {
                    var fid = $(this).attr('data-fid');
                    if (fid == undefined) return;

                    // type 1, 2 - input, textarea placeholder 처리
                    $.each($(this).find('.form-demo > div.form-contents-item[data-type="1"], .form-demo > div.form-contents-item[data-type="2"]'), function() {
                        var obj = new Object();
                        obj.id = this.id;
                        obj.value = $(this).find('h4').first().hasClass('required-placeholder') ? 'required-placeholder' : '';
                        customValueArray.push(obj);
                    });
                    // type 3, 4 - radio, option 정렬
                    $.each($(this).find('.form-demo > div.form-contents-item[data-type="3"], .form-demo > div.form-contents-item[data-type="4"]'), function() {
                        var obj = new Object();
                        obj.id = this.id;
                        obj.value = $(this).find('label').first().hasClass('form-contents-options-block') ? 'form-contents-options-block' : '';
                        customValueArray.push(obj);
                    });
                    // type 8 - privacy policy 가져오기
                    $.each($(this).find('.form-demo > div.form-contents-item[data-type="8"]'), function() {
                        var obj = new Object();
                        obj.id = this.id;
                        obj.value = $(this).find('.form-contents-privacy textarea').val();
                        customValueArray.push(obj);
                    });

                    var form_demo = $(this).find('.form-demo');
                    form_demo.children('.form-contents-item:not("[data-type=0]")').remove();

                    var html = '';
                    var info = form_info[fid];
                    $.each(info, function() {
                        if (this.disabled == 1) return;
                        // 공통
                        html += '<div class="form-contents-item" data-type="' + this.type + '" id="' + this.id + '" data-grid="' + this.grid + '">';

                        var required = this.required == "1" ? 'required' : '';
                        // date/time picker는 data-datepicker 값이 필요
                        if (this.type == '7') {
                            var datepicker = 'date';
                            if (this.options.indexOf('date') > -1 && this.options.indexOf('time') > -1) {
                                datepicker = 'both';
                            }
                            else if (this.options.indexOf('date') > -1) {
                                datepicker = 'date';
                            }
                            else if (this.options.indexOf('time') > -1) {
                                datepicker = 'time';
                            }

                            html += '<div class="form-contents-view" data-validation="' + this.validation + '" data-datepicker="' + datepicker + '">';
                        }
                        else {
                            html += '<div class="form-contents-view" data-validation="' + this.validation + '">';
                        }

                        // custom value 처리
                        var itemId = this.id;
                        var custom = $.grep(customValueArray, function(e) { return e.id == itemId; });
                        var customValue = custom.length > 0 ? custom[0].value : '';

                        // 개별
                        switch(this.type) {
                            case "0":
                                // submit btn을 rebuild 시 기존 버튼삭제
                                var button_html = form_demo.find('.form-contents-item[data-type=0] .form-contents-view').html();
                                html += button_html;
                                form_demo.children('.form-contents-item[data-type=0]').remove();

                                // var options = this.options.split('|').pop() == '' ? this.options.slice(0, -1).split('|') : this.options.split('|');
                                // html += '<div class="form-contents-button" contenteditable="false" onclick="form_submit(this)" ';
                                // if (options[0] && options[0] != 'undefined') { html += 'data-link_id="' + options[0] + '"'; }
                                // if (options[1] && options[1] != 'undefined') { html += 'data-link_type="' + options[1] + '" '; }
                                // if (options[2] && options[2] != 'undefined') { html += 'data-link_target="' + options[2] + '"'; }
                                // if (options[3] && options[3] != 'undefined') { html += 'data-receiver="' + options[3] + '"'; }
                                // if (options[4] && options[4] != 'undefined') { html += 'data-message="' + options[4] + '"'; }
                                // html += '>';
                                // html += this.name;
                                // html += '</div>';
                                break;
                            case "1":
                                var name = '';
                                var placeholder = '';
                                if (customValue == 'required-placeholder') { placeholder = this.name; }
                                else { name = this.name; }
                                html += '<h4 class="' + required + ' qv-font ' + customValue + '">' + name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div class="form-contents-input">';
                                html += '<input class="form-control" type="text" placeholder="' + placeholder + '" disabled>';
                                html += '</div>';
                                break;
                            case "2":
                                var name = '';
                                var placeholder = '';
                                if (customValue == 'required-placeholder') { placeholder = this.name; }
                                else { name = this.name; }
                                html += '<h4 class="' + required + ' qv-font '+ customValue + '">' + name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div class="form-contents-textarea">';
                                html += '<textarea class="form-control" placeholder="' + placeholder + '"></textarea>';
                                html += '</div>';
                                break;
                            case "3":
                                var randomName = 'check' + qv_func.randomId();
                                var options = this.options.split('|').pop() == '' ? this.options.slice(0, -1).split('|') : this.options.split('|');
                                customValue = custom.length > 0 ? custom[0].value : 'form-contents-options-block';
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div class="form-contents-checkbox">';
                                $.each(options, function() {
                                    html += '<label class="checkbox-inline ' + customValue + '"><input type="checkbox" class="form-contents-checkbox-item" name="' + randomName + '" value="' + this + '">' + this + '</label>';
                                });
                                html += '</div>';
                                break;
                            case "4":
                                var randomName = 'radio' + qv_func.randomId();
                                var options = this.options.split('|').pop() == '' ? this.options.slice(0, -1).split('|') : this.options.split('|');
                                customValue = custom.length > 0 ? custom[0].value : 'form-contents-options-block';
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div class="form-contents-radio">';
                                $.each(options, function() {
                                    html += '<label class="radio-inline ' + customValue + '"><input type="radio" class="form-contents-radio-item" name="' + randomName + '" value="' + this + '">' + this + '</label>';
                                });
                                html += '</div>';
                                break;
                            case "5":
                                var options = this.options.split('|').pop() == '' ? this.options.slice(0, -1).split('|') : this.options.split('|');
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div class="form-contents-select"><select class="form-control form-contents-select-dropdown">';
                                $.each(options, function() {
                                    html += '<option value="' + this + '">' + this + '</option>';
                                });
                                html += '</select></div>';
                                break;
                            case "6":
                                var random = qv_func.randomId();
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div class="form-contents-address">';
                                html += '<div class="form-contents-item-zipcode">';
                                html += '<input class="form-control" id="post' + random + '" type="text">';
                                html += '<a onclick="_execDaumPostcode(this)">' + lang.search_address + '</a>';
                                html += '</div>';
                                html += '<div class="form-contents-item-address">';
                                html += '<input class="form-control" id="address' + random + '" type="text">';
                                html += '</div>';
                                html += '<div class="form-contents-item-address">';
                                html += '<input class="form-control" type="text">';
                                html += '</div>';
                                html += '</div>';
                                break;
                            case "7":
                                var random = qv_func.randomId();
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                if(this.options.indexOf('date') > -1 && this.options.indexOf('time') > -1) {
                                    html += '<div id="form-datepicker' + random + '" class="form-contents-datepicker">';
                                    html += '<input type="text" class="form-control" placeholder="YYYY-MM-DD">';
                                    html += '</div>';
                                    html += '<div id="form-timepicker' + random + '" class="form-contents-timepicker">';
                                    html += '<input type="text" class="form-control" placeholder="hh:mm">';
                                    html += '</div>';
                                }
                                else if(this.options.indexOf('date') > -1) {
                                    html += '<div id="form-datepicker' + random + '" class="form-contents-datepicker wd-100p-important">';
                                    html += '<input type="text" class="form-control" placeholder="YYYY-MM-DD">';
                                    html += '</div>';
                                }
                                else if(this.options.indexOf('time') > -1) {
                                    html += '<div id="form-timepicker' + random + '" class="form-contents-timepicker wd-100p-important">';
                                    html += '<input type="text" class="form-control" placeholder="hh:mm">';
                                    html += '</div>';
                                }
                                break;
                            case "8":
                                var random = qv_func.randomId();
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<div class="form-contents-privacy">';
                                html += '<textarea class="form-control">' + customValue + '</textarea>';
                                html += '</div>';
                                html += '<label class="checkbox-inline"><input type="checkbox" class="form-contents-privacy-checkbox" name="personal' + random + '" value="personal" style="margin-top:3px;"> </label>';
                                html += '<p style="margin: 0 20px;">' + this.description + '</p>';
                                break;
                            case "9":
                                var random = qv_func.randomId();
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<div class="form-contents-privacy"></div>';
                                html += '<label class="checkbox-inline"><input type="checkbox" class="form-contents-privacy-checkbox" name="personal' + random + '" value="personal" style="margin-top:3px;"> </label>';
                                html += '<p style="margin: 0 20px;">' + lang.agree_privacy_info_blank_1 + '</p>';
                                break;
                            case "10":
                                var random = qv_func.randomId();
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div id="form-file' + random + '" class="form-contents-file">';
                                html += '<div class="form-upload-files"><i class="icon-cloud-upload"></i>' + lang.file_upload + '</div>';
                                html += '</div>';
                                break;
                            case "11":
                                html += '<div class="form-contents-text"><div class="qv-text">' + this.name + this.description + this.options + '</div></div>'
                                break;
                            case "12":
                                var options = this.options.split('|').pop() == '' ? this.options.slice(0, -1).split('|') : this.options.split('|');
                                html += '<h4 class="' + required + ' qv-font">' + this.name + '</h4>';
                                html += '<p class="text qv-font">' + this.description + '</p>';
                                html += '<div class="form-contents-phone"><select class="form-control form-contents-select-dropdown">';
                                $.each(options, function() {
                                    html += '<option value="' + this + '">' + this + '</option>';
                                });
                                html += '</select>';
                                html += '<input class="form-control" type="text" maxlength="4">';
                                html += '<input class="form-control" type="text" maxlength="4">';
                                html += '</div>';
                                break;
                        }

                        html += '</div>';
                        html += '</div>';
                    });

                    // form-content-item 추가할 위치 지정
                    if ($(this).find('.form-demo .form-title').length > 0) {
                        $(this).find('.form-demo .form-title').after($(html));
                    }
                    else {
                        $(this).find('.form-demo').prepend($(html));
                    }
                });

                // init form
                callback();
            }
        },
        function(xhr) {}
    );
}

function is_InternetExplorer() {
    var agent = navigator.userAgent.toLowerCase();
    return (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1);
}