/**
 * Name         : sharelink.js
 * Version      : v1.0
 * Description  : Js functions for simple share pages.
 * Author       : hosung.seo
 * Copyright 2016 Samsung Electronics All rights reserved
 */

(function (ShareLink, $, undefined) {
    /* common */
    ShareLink.globals = {
            contextPath: '',
            contentsToken: ''
        },
        ShareLink.urls = {
            errorPageUrl: '/error/expired',
            checkPinUrl: '/checkPin.json',
            loginCaptchaUrl: '/login/captcha',
            contentsListUrl: '/contents/list',
            contentsViewUrl: '/contents/view',
            refreshContentsUrl: '/contents/getContentsInfo.json',
            refreshCaptchaUrl: '/common/captcha/img/refresh.captcha',
            generateZipApi: '/ls/public/v1/zip/signature?linkId=',
            zipSignature: '/zip/v1/file?signature=',
            downloadStats: '/common/recordDownloadLog.json',
            landingStats: '/common/recordLandMainPageLog.json'
        },
        ShareLink.mail = {
            receiver: '',
            subject: '',
            message: ''
        },
        ShareLink.functions = {
            imgOnError: function (el, fallbackUrl) {
                el.onerror = '';
                el.src = fallbackUrl;
            },
            xhr: null // ajax api container for zip download
        },
        /* modules */
        ShareLink.login = ShareLink.login || {};
    ShareLink.login.functions = {
            init: function (options) {
                if (options != null) {
                    ShareLink.globals.contextPath = options.contextPath || '';
                    ShareLink.globals.contentsToken = options.contentsToken || '';
                }
            },
            checkPin: function () {
                if ($('#pin').val().length !== 6) {
                    $('.pin_error').show().html($('#dummyLoginInvalid').html());
                    return false;
                }
                var captchaAnswer = $('#captchaAnswer').length ? $('#captchaAnswer').val() : '';
                $.ajax({
                    url: ShareLink.globals.contextPath + ShareLink.urls.checkPinUrl,
                    type: 'post',
                    data: {
                        //contentsToken : ShareLink.globals.contentsToken,
                        pin: $('#pin').val(),
                        captchaAnswer: captchaAnswer
                    },
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        /*
                        switch (data.authResult) {
                            case 'success': window.location.href = ShareLink.globals.contextPath + ShareLink.urls.contentsListUrl + '?contentsToken=' + data.contentsToken; break;
                            case 'fail': $('.pin_error').show().html(data.failMessage); break;
                            case 'retryExceed': window.location.href = ShareLink.globals.contextPath + ShareLink.urls.loginCaptchaUrl + '?contentsToken=' + data.contentsToken; break;
                            case 'error': window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl; break;
                            case 'invalidCaptcha': ShareLink.login.functions.refreshCaptcha(); $('.pin_error').show().html(data.failMessage); break;
                            default : console.log('Unexpected results: ' + data.authResult); break;
                        }
                        */
                        if (data.contentsToken) {
                            window.location.href = ShareLink.globals.contextPath + data.contentsToken;
                        } else {
                            $('.pin_error').show().html($('#dummyLoginInvalid').html());
                        }
                    }
                });
            },
            /*
            refreshCaptcha: function () {
                $('#captchaImg').attr('src', ShareLink.globals.contextPath + ShareLink.urls.refreshCaptchaUrl + '?' + $.param({'contentsToken': ShareLink.globals.contentsToken, 't': (new Date).getTime()})); 
            }
            */
        },
        ShareLink.list = ShareLink.list || {};
    ShareLink.list.functions = {
        init: function (options) {
            if (options != null) {
                ShareLink.globals.contextPath = options.contextPath || '';
                ShareLink.globals.contentsToken = options.contentsToken || '';
                ShareLink.globals.requestTime = options.requestTime || '';
                ShareLink.globals.selectItemsMsg = options.selectItemsMsg || '';
                ShareLink.globals.selectItemsSingular = options.selectItemsSingular || '';
                ShareLink.globals.selectItemsPlural = options.selectItemsPlural || '';
                ShareLink.globals.currentIndex = parseInt(options.currentIndex) || 0;
                ShareLink.globals.contentsTotalCnt = parseInt(options.contentsTotalCnt) || 0;
                ShareLink.globals.uploadCompleted = options.uploadCompleted === 'true';
                ShareLink.globals.downloadClicked = false;
                ShareLink.globals.refreshClicked = false;
                ShareLink.globals.linkUrl = options.linkUrl || '';
                ShareLink.globals.sharedatacontents = options.sharedatacontents;
                ShareLink.globals.linkUrlVersion = options.linkUrlVersion;
                ShareLink.list.selectMode = options.selectMode === 'true';
                ShareLink.mail.receiver = options.mailReceiver || '';
                ShareLink.mail.subject = options.mailSubject || '';
                ShareLink.mail.message = options.mailMessage || '';
            }
        },
        updateBodyTop: function () {
            var headerHeight = document.getElementById("headerId").offsetHeight;
            if (headerHeight) {
                document.getElementById("sub_content").style.marginTop = headerHeight + 'px';
            }
        },
        updateCounter: function () {
            const unselectedIds = sessionStorage.getItem('unSelectedIds' + ShareLink.globals.requestTime)?.split(',') || [];
            let allIDs = [];
            ShareLink.globals.sharedatacontents.map((data, index) => allIDs.push(index + 1));
            const selectedIds = allIDs.filter(item => !unselectedIds.includes(item.toString()));
            var len = selectedIds.length;
            if (len > 0) {
                $('#downloadFilesBtn').removeClass('off');
                $('#downloadFilesBtn').addClass('on');
                if (len == ShareLink.globals.sharedatacontents.length) {
                    $('#checkAll').prop('checked', true);
                } else {
                    $('#checkAll').prop('checked', false);
                }
            } else {
                $('#downloadFilesBtn').removeClass('on');
                $('#downloadFilesBtn').addClass('off');
                $('#checkAll').prop('checked', false);
            }

            sessionStorage.setItem('selectedIds' + ShareLink.globals.requestTime, selectedIds.join(','));
            ShareLink.list.functions.updateCheckboxDesc();
        },
        updateCheckboxDesc: function () {
            // var checkboxList = $('#contentList input[type=checkbox]:checked')
            var selectedIds = sessionStorage.getItem('selectedIds' + ShareLink.globals.requestTime) ?
                sessionStorage.getItem('selectedIds' + ShareLink.globals.requestTime)?.split(',') : [];
            var len = selectedIds.length;
            if (len > 0) {
                if (len > 1) {
                    $('#selectedCount').text(ShareLink.globals.selectItemsPlural);
                } else {
                    $('#selectedCount').text(ShareLink.globals.selectItemsSingular);
                }
                if($('#selectedCount').length > 0) $('#selectedCount').html($('#selectedCount').html().replace('lenPlaceholder', len));
            } else {
                $('#selectedCount').text(ShareLink.globals.selectItemsMsg);
            }
        },
        selectAllCheckbox: function () {
            var checkboxList = $('.contentsListSelection input[type=checkbox]');
            $('#checkAll').prop('checked', true);
            checkboxList.each(function () {
                $(this).prop("checked", true);
            });

            let allIDs = [];
            ShareLink.globals.sharedatacontents.map((data, index) => {
                allIDs.push(index + 1);
            });

            $('#downloadFilesBtn').removeClass('off');
            $('#downloadFilesBtn').addClass('on');

            sessionStorage.setItem('selectedIds' + ShareLink.globals.requestTime,
                allIDs.join(','));
            ShareLink.list.functions.updateCheckboxDesc();
        },
        unSelectAllCheckbox: function () {
            var checkboxList = $('.contentsListSelection input[type=checkbox]');
            $('#checkAll').prop('checked', false);
            checkboxList.each(function () {
                $(this).prop("checked", false);
            });

            let allIDs = [];
            ShareLink.globals.sharedatacontents.map((data, index) => {
                allIDs.push(index + 1);
            });

            $('#downloadFilesBtn').removeClass('on');
            $('#downloadFilesBtn').addClass('off');

            sessionStorage.setItem('selectedIds' + ShareLink.globals.requestTime, '');
            sessionStorage.setItem('unSelectedIds' + ShareLink.globals.requestTime,
                allIDs.join(','));
            ShareLink.list.functions.updateCheckboxDesc();
        },
        downloadContents: function () {
            RemoteShare.functions.checkContentsExpiry(ShareLink.globals.contentsToken, 'download', ShareLink.globals.linkUrlVersion)
                .done(function () {
                    var selectedIds = sessionStorage.getItem('selectedIds' + ShareLink.globals.requestTime)?.split(',') || [];

                    let actualContentsSeqNos = [];
                    selectedIds.map(id => {
                        actualContentsSeqNos.push(ShareLink.globals.sharedatacontents[id - 1].contentsSequenceNo)
                    })

                    var items = ShareLink.globals.sharedatacontents.filter((item) => actualContentsSeqNos.includes(item.contentsSequenceNo));

                    var contents = [];
                    items.map(item => {
                        let url = item.original;
                        if ('V1' === ShareLink.globals.linkUrlVersion) {
                            let name = item.name.replace("&#40;", "(").replace("&#41;", ")");
                            url = `${url}&name=${encodeURIComponent(name)}`;
                        }
                        contents.push(url)
                    });

                    //Statistics Logging
                    ShareLink.list.functions.downloadStatsLog('individual', ShareLink.globals.contentsTotalCnt, contents.length - 1);

                    ShareLink.globals.downloadClicked = true;
                    ShareLink.globals.refreshClicked = false;
                    contents.push("window.history.back()");

                    $('input').prop('disabled', true);

                    $('#downloadFilesBtn').removeClass('on');
                    $('#downloadFilesBtn').addClass('off');
                    $('#cancelSelectBtn').addClass('off');
                    $('#uploadingInProgressMsg').addClass('hide');
                    $('#downloadInProgressMsg').addClass('show');
                    $('.header_spacer').addClass('hide');
                    $('.select_spacer').addClass('hide');

                    //Adjust Margin Top of List Component
                    var headerHeight = document.getElementById("headerId").offsetHeight;
                    if (headerHeight) {
                        document.getElementById("sub_content").style.marginTop = headerHeight + 'px';
                    }

                    $.each(contents, function (index, url) {
                        setTimeout(function (n) {
                            if (index == (contents.length - 1)) {
                                $('input').prop('disabled', false);
                                $('#downloadFilesBtn').addClass('on');
                                $('#downloadFilesBtn').removeClass('off');
                                $('#cancelSelectBtn').removeClass('off');
                                $('#uploadingInProgressMsg').removeClass('hide');
                                $('.header_spacer').removeClass('hide');
                                $('.select_spacer').removeClass('hide');
                                $('#individualDownload, #zipDownload').unbind('click'); // unbind previous attached click events

                                window.history.back();

                                if (!ShareLink.globals.uploadCompleted && !ShareLink.globals.refreshClicked) {
                                    $('#uploadingInProgressMsg').addClass('hide');
                                } else if (!ShareLink.globals.uploadCompleted && ShareLink.globals.refreshClicked) {
                                    $('#downloadInProgressMsg').removeClass('show');
                                }

                                //Recompute Margin Top
                                headerHeight = document.getElementById("headerId").offsetHeight;
                                if (headerHeight) document.getElementById("sub_content").style.marginTop = headerHeight + 'px';
                            } else {
                                window.location.href = url;
                            }
                        }, index * 3000, index);
                    });
                })
                .fail(function () {
                    window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl;
                });
        },
        downloadAllContents: function () {
            RemoteShare.functions.checkContentsExpiry(ShareLink.globals.contentsToken, 'download', ShareLink.globals.linkUrlVersion)
                .done(function () {
                    var contents = [];
                    var contentIndex = 0;

                    ShareLink.globals.sharedatacontents.map(item => {
                        let url = item.original;
                        if ('V1' === ShareLink.globals.linkUrlVersion) {
                            let name = item.name.replace("&#40;", "(").replace("&#41;", ")");
                            url = `${url}&name=${encodeURIComponent(name)}`;
                        }
                        contents.push(url)
                    });
                    ShareLink.globals.downloadClicked = true;
                    ShareLink.globals.refreshClicked = false;

                    //Statistics Logging
                    ShareLink.list.functions.downloadStatsLog('individual', ShareLink.globals.contentsTotalCnt, contents.length);

                    $('#downloadAllBtn').removeClass('on');
                    $('#downloadAllBtn').addClass('off');
                    $('#selectFilesBtn').addClass('off');
                    $('#cancelSelectBtn').addClass('off');
                    $('#uploadingInProgressMsg').addClass('hide');
                    $('#downloadInProgressMsg').addClass('show');
                    $('.header_spacer').addClass('hide');
                    $('.select_spacer').addClass('hide');

                    //Adjust Margin Top of List Component
                    var headerHeight = document.getElementById("headerId").offsetHeight;
                    if (headerHeight) {
                        document.getElementById("sub_content").style.marginTop = headerHeight + 'px';
                    }

                    $.each(contents, function (index, url) {
                        setTimeout(function (n) {
                            contentIndex = contentIndex + 1;
                            window.location.href = url;
                            if (contentIndex === contents.length) {
                                $('#downloadAllBtn').removeClass('off');
                                $('#downloadAllBtn').addClass('on');
                                $('#selectFilesBtn').removeClass('off');
                                $('#cancelSelectBtn').removeClass('off');
                                $('#uploadingInProgressMsg').removeClass('hide');
                                $('.header_spacer').removeClass('hide');
                                $('.select_spacer').removeClass('hide');

                                if (!ShareLink.globals.uploadCompleted && !ShareLink.globals.refreshClicked) {
                                    $('#uploadingInProgressMsg').addClass('hide');
                                } else if (!ShareLink.globals.uploadCompleted && ShareLink.globals.refreshClicked) {
                                    $('#downloadInProgressMsg').removeClass('show');
                                }

                                //Recompute Margin Top
                                headerHeight = document.getElementById("headerId").offsetHeight;
                                if (headerHeight) document.getElementById("sub_content").style.marginTop = headerHeight + 'px';
                            }
                        }, index * 3000, index);
                    });
                })
                .fail(function () {
                    window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl;
                });
        },
        downloadSingleContent: function () {
            RemoteShare.functions.checkContentsExpiry(ShareLink.globals.contentsToken, 'download', ShareLink.globals.linkUrlVersion)
                .done(function () {
                    var url = '';
                    var fileName = '';
                    if ($('#contentList > li').length) {
                        var imgTag = $('#contentList > li').first().find('img');
                        url = imgTag.attr('longdesc');
                        fileName = imgTag.attr('alt');
                    } else {
                        var activeFrame = $('.fotorama').data('fotorama').activeFrame;
                        url = activeFrame.full;
                        fileName = activeFrame.filename;
                    }
                    if ('V1' === ShareLink.globals.linkUrlVersion) {
                        url = `${url}&name=${encodeURIComponent(fileName)}`;
                    }
                    window.location.href = url;
                })
                .fail(function () {
                    window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl;
                });
        },
        refreshContents: async function () {
            return $.ajax({
                url: ShareLink.globals.contextPath + ShareLink.urls.refreshContentsUrl,
                data: {
                    contentsToken: ShareLink.globals.contentsToken,
                    callExtraInfo: 'refreshContents',
                    linkUrlVersion: ShareLink.globals.linkUrlVersion
                },
                dataType: 'json',
                cache: false,
                success: function (data) {
                    ShareLink.globals.refreshClicked = true;
                    ShareLink.globals.sharedatacontents = data.contents;

                    if (data.expired) {
                        window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl;
                    }
                    if (data.contentsTotalCnt) {
                        $('#showCheckBox').show();
                        $(".button_wrap").show();
                        ShareLink.globals.contentsTotalCnt = data.contentsTotalCnt;
                    }
                    if (data.uploadCompleted) {
                        ShareLink.globals.uploadCompleted = true;
                        if (ShareLink.globals.downloadClicked) {
                            $('#downloadInProgressMsg').addClass('show');
                        }
                        //$('#uploadingInProgressMsg').hide();
                        //$('#sub_content').removeClass();
                        $('#listInfo').removeClass('incompleted');
                        if (data.title) {
                            $('#uploadingInProgressMsg > div > span').addClass('ellip');
                            $('#uploadingInProgressMsg > div > span').text(data.title);
                        } else {
                            $('.header-hidden #uploadingInProgressMsg').remove();
                            $('#sub_content').removeClass('mr_t240');
                            if (data.contentsTotalCnt > 0) {
                                $('#uploadingInProgressMsg').remove();
                                $('.refresh').remove();
                                $("#downloadAllBtn").show();
                                $("#downloadFilesBtn").show();
                                $(".select_container").show();
                            }
                        }
                    } else {
                        $('#downloadInProgressMsg').removeClass('show');
                        $('#uploadingInProgressMsg').removeClass('hide');
                        $('.refresh img').attr('src', '/resources/images/ic_downloading_refresh.png');
                        $('#uploadingInProgressMsg').show();
                        $('.refresh').show();

                        if (ShareLink.globals.contentsTotalCnt > 0) {
                            $("#downloadAllBtn").show();
                            $("#downloadFilesBtn").show();
                            $(".select_container").show();
                        }

                    }

                    data.previousItemCnt = $('#contentList').children('li').length;

                    var source = $('#listInfo-template').html();
                    var template = Handlebars.compile(source);
                    $('#listInfo').html(template(data));

                    var expiredTime = parseInt(data.expiredTime) / 1000;
                    var dateExpiration = moment.unix(expiredTime).format(data.dateFormat);
                    var currentDate = parseInt(data.createdTime) / 1000;
                    var newdate = moment.unix(currentDate).format(data.dateFormat);
                    $('.expired').html($('.expired').html().replace('expDatePlaceholder', dateExpiration));
                    $('.infoShareText').html($('.infoShareText').html().replace('curDatePlaceholder', newdate));

                    var headerHeight = document.getElementById("headerId").offsetHeight;
                    if (headerHeight) {
                        document.getElementById("sub_content").style.marginTop = headerHeight + 'px';
                    };

                    ShareLink.list.functions.updateCounter();
                }
            });
        },
        attachEventActions: function () {
            $('body').on('change', '.contentsListSelection input:checkbox', function (e) {
                $(this).next('label').removeClass('sel');
                let selectedIdsArray = sessionStorage.getItem('selectedIds' + ShareLink.globals.requestTime)?.split(',') || [];
                let unSelectedIdsArray = sessionStorage.getItem('unSelectedIds' + ShareLink.globals.requestTime).split(',') || [];

                if (this.checked) {
                    let newarr = [...selectedIdsArray];
                    newarr.push(this.value);
                    newarr.sort(function (a, b) {
                        return parseInt(a) - parseInt(b);
                    });

                    $('#downloadFilesBtn').removeClass('off');
                    $('#downloadFilesBtn').addClass('on');

                    if (newarr.length === ShareLink.globals.sharedatacontents.length) {
                        $('#checkAll').prop('checked', true);
                    };

                    sessionStorage.setItem('selectedIds' + ShareLink.globals.requestTime, newarr.filter(item => item !== '').join(","));

                    let newUnSelectedIds = unSelectedIdsArray.filter(item => item != this.value);
                    newUnSelectedIds.filter(item => item == '');
                    let sanitizedUnSelectedArray = [...new Set(newUnSelectedIds)];
                    sessionStorage.setItem('unSelectedIds' + ShareLink.globals.requestTime, sanitizedUnSelectedArray.join(","));
                } else {
                    let newarr = selectedIdsArray.filter(item => item != this.value);

                    unSelectedIdsArray.push(this.value);

                    unSelectedIdsArray.sort(function (a, b) {
                        return parseInt(a) - parseInt(b);
                    });

                    if (!newarr.length) {
                        $('#downloadFilesBtn').removeClass('on');
                        $('#downloadFilesBtn').addClass('off');
                    }

                    sessionStorage.setItem('selectedIds' + ShareLink.globals.requestTime, newarr.join(","));
                    sessionStorage.setItem('unSelectedIds' + ShareLink.globals.requestTime, unSelectedIdsArray.filter(item => item !== '').join(","));
                    $('#checkAll').prop('checked', false);
                }
                ShareLink.list.functions.updateCheckboxDesc();
            });

            $('.expandBtn').on('click', function (e) {
                window.location.href = ShareLink.globals.contextPath + ShareLink.urls.contentsViewUrl + '?' + $.param({
                    'contentsToken': ShareLink.globals.contentsToken,
                    'reqDt': ShareLink.globals.requestTime,
                    'currentIndex': this.id,
                    'checkbox': window.location.hash === '#selectionMode',
                    'linkUrlVersion': ShareLink.globals.linkUrlVersion
                });
                e.preventDefault();
                e.stopPropagation();
            });

            $('body').on('click', '.expandBtn', function (e) {
                $('body').css('display', 'none');
                sessionStorage.setItem('detailViewVisited', true);
                window.location.href = ShareLink.globals.contextPath + ShareLink.urls.contentsViewUrl + '?' + $.param({
                    'contentsToken': ShareLink.globals.contentsToken,
                    'reqDt': ShareLink.globals.requestTime,
                    'currentIndex': this.id,
                    'checkbox': window.location.hash === '#selectionMode',
                    'linkUrlVersion': ShareLink.globals.linkUrlVersion
                });
                e.preventDefault();
                e.stopPropagation();
            });
        },
        downloadAsZip: function (selectedIds, zipFileName) {

            let actualContentsSeqNos = [];
            selectedIds.map(id => {
                actualContentsSeqNos.push(ShareLink.globals.sharedatacontents[id - 1].contentsSequenceNo)
            })

            $('#downloadFilesBtn').addClass('off'); // disable download btn
            $('#downloadAllBtn').addClass('off');
            $('#downloadAllBtn').removeClass('on');
            $('#downloadFilesBtn').removeClass('on');
            ShareLink.functions.xhr = $.ajax({
                url: ShareLink.globals.contextPath + ShareLink.urls.generateZipApi + ShareLink.globals.contentsToken,
                data: JSON.stringify({
                    contentsSeqNos: actualContentsSeqNos
                }),
                contentType: 'application/json',
                type: 'post',
                dataType: 'json',
                cache: false,
                success: function (data) {
                    window.location.href = data.zipHost + ShareLink.urls.zipSignature + data.signature + '&zipName=' + zipFileName; // download the zip file

                    setTimeout(function () { // give enough time to fire the download properly to avoid cancelling the api call by user interactions
                        $('#individualDownload, #zipDownload').unbind('click'); // unbind previous attached click events
                        $('#downloadOption').addClass('noDisplay');
                        $('#progressOverlay').addClass('noDisplay'); // remove progress dialog display
                        $('body').removeClass('noScroll');
                    }, 2000);

                    setTimeout(function () {
                        if (window.location.hash === '#selectionMode') window.history.back(); // remove selection mode with timeout to avoid cancelling the zip download because of back()
                        $('#downloadFilesBtn').removeClass('off');
                        $('#downloadAllBtn').removeClass('off');
                        $('#downloadAllBtn').addClass('on');
                        $('#downloadFilesBtn').addClass('on');
                    }, 3000);

                    //Statistics Logging
                    ShareLink.list.functions.downloadStatsLog('zip', ShareLink.globals.contentsTotalCnt, selectedIds.length);
                },
                error: function (err) {
                    if (err.statusText !== 'abort') {
                        $('.zipProgress-msg').addClass('noDisplay');
                        $('.zipError-msg').removeClass('noDisplay'); // display error message dialog
                    }
                    $('#downloadFilesBtn').removeClass('off');
                    $('#downloadAllBtn').removeClass('off');
                    $('#downloadAllBtn').addClass('on');
                    $('#downloadFilesBtn').addClass('on');

                    //Statistics Logging
                    ShareLink.list.functions.downloadStatsLog('zip', ShareLink.globals.contentsTotalCnt, selectedIds.length);
                }
            });
        },
        downloadStatsLog: function (type, totalCnt, downloadCnt) {
            $.ajax({
                url: ShareLink.globals.contextPath + ShareLink.urls.downloadStats + '?' + $.param({
                    'linkId': ShareLink.globals.contentsToken,
                    'downloadType': type,
                    'totalContentsCount': totalCnt,
                    'downloadContentsCount': downloadCnt
                }),
                cache: false,
                success: function (data) {}
            });
        },
        landingStatsLog: function () {
            $.ajax({
                url: ShareLink.globals.contextPath + ShareLink.urls.landingStats + '?' + $.param({
                    'linkId': ShareLink.globals.contentsToken
                }),
                cache: false,
                success: function (data) {}
            });
        }
    }

}(window.ShareLink = window.ShareLink || {}, jQuery));