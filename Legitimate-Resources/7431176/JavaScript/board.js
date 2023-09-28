/**
 * Created by quvsoftware on 2019-07-24.
 */
/**
 * Created by Gram.Sim on 2018-03-07.
 */

/* BOARD */
function initAllBoard() {
    $.each($("body").find('table[class*="board-table-"]'), function() {
        var boardBox = $(this).parents('.boardBox').first();
        boardBox.addClass('board-loading');
        boardBox.append('<div class="board-loading-mask"><div></div></div>');
        callArticle(this, function() {
            boardBox.removeClass('board-loading');
            boardBox.find('.board-loading-mask').remove();
        });
    });
    $.each($('.board-category'), function() {
        if ($(this).children('.board-category-item.default').length > 0) {
            $(this).children('.board-category-item.default').addClass('active');

            /* 2020.02.21 재헌
             * 게시판 - 카테고리 헤더 다국어적용
             */
            $(this).find('.board-category-item.default > div').text(lang.view_all);
        }
    });

    /* 2020.02.21 재헌
     * 게시판 - 검색옵션 다국어적용
     */
    $.each($('.board-search-select'), function() {
        var select_options = '<option value="all">' + lang.all + '</option>' +
            '<option value="subject">' + lang.subject + '</option>' +
            '<option value="content">' + lang.contents + '</option>' +
            '<option value="writer">' + lang.writer + '</option>';
        $(this).html(select_options);
    });
}
initAllBoard();

function callArticle(obj, callback) {
    var view = $(obj).parents('.view').first();
    var bid = $(obj).attr('data-bid');
    var category = '';
    var keyword = '';
    var page = 1;
    var size = parseInt(view.find('table').attr('data-pagesize'));
    var language = $(obj).data('language');

    // 2021.01.11
    // 게시글로 이동 후 다시 되돌아 갈 때 게시판 카테고리, 페이지 유지
    try {
        var boardLocalStorage = window.localStorage.getItem('QuvBoard');
        if (boardLocalStorage) {
            boardLocalStorage = JSON.parse(boardLocalStorage);
            if (boardLocalStorage.bid == bid)  {
                category = boardLocalStorage.category;
                page = parseInt(boardLocalStorage.page || 1);
                keyword = boardLocalStorage.keyword || '';
            }
            window.localStorage.removeItem('QuvBoard')
        }
    }
    catch (ex) {
        console.log(ex)
    }


    if (bid == undefined) {
        $(obj).parents('.boardBox').first().remove();
        return;
    }

    qvjax_direct(
        "select_board_info",
        "/module/board/board.php",
        'bid=' + bid,
        function (data) {
            if (data.length > 0) {
                $.each(data, function() {
                    if (this.use_recommend == 0) { $(obj).find('thead .board-thead-item-hits').remove() }
                    if (this.use_views == 0) { $(obj).find('thead .board-thead-item-views').remove() }
                    if (this.use_date == 0) { $(obj).find('thead .board-thead-item-date').remove() }
                    if (this.use_writer == 0) { $(obj).find('thead .board-thead-item-writer').remove() }

                    // 카테고리를 사용하는 사용자만 호출
                    if (this.use_category == 1) {
                        init_BoardCategoryItem(view, bid);
                    }

                    // 2019.04.23
                    // DB 의존적으로 컬럼 생성
                    // var lang = new Object();
                    // if (language == 'en') {
                    //     lang.NO = '글 번호';
                    //     lang.CATEGORY = '카테고리';
                    //     lang.TITLE = '제목';
                    //     lang.WRITER = '작성자';
                    //     lang.HITS = '추천수';
                    //     lang.VIEWS = '조회수';
                    //     lang.DATE = '작성일';
                    // }
                    // else {
                    //     lang.NO = 'NO';
                    //     lang.CATEGORY = 'CATEGORY';
                    //     lang.TITLE = 'TITLE';
                    //     lang.WRITER = 'WRITER';
                    //     lang.HITS = 'HITS';
                    //     lang.VIEWS = 'VIEWS';
                    //     lang.DATE = 'DATE';
                    // }
                    // $(obj).find('thead .board-thead-item-hits').remove();
                    // $(obj).find('thead .board-thead-item-views').remove();
                    // $(obj).find('thead .board-thead-item-date').remove();
                    // $(obj).find('thead .board-thead-item-writer').remove();
                    //
                    // if (this.use_writer == 1) {
                    //     $(obj).find('thead > tr.board-thead-tr').append('<th class="board-thead-item-writer">' + lang.WRITER + '</th>');
                    // }
                    // if (this.use_recommend == 1) {
                    //     $(obj).find('thead > tr.board-thead-tr').append('<th class="board-thead-item-hits">' + lang.HITS + '</th>');
                    // }
                    // if (this.use_views == 1) {
                    //     $(obj).find('thead > tr.board-thead-tr').append('<th class="board-thead-item-views">' + lang.VIEWS + '</th>');
                    // }
                    // if (this.use_date == 1) {
                    //     $(obj).find('thead > tr.board-thead-tr').append('<th class="board-thead-item-date">' + lang.DATE + '</th>');
                    // }

                });
                setBoardArticle(view, bid, category, keyword, page, size, 0, function() {
                    /* 2020.01.17 재헌
                       일부 컬럼을 숨긴 게시판을 랜더링 시 IE에서 width 부분이 잘못 랜더링 됨
                       display 값을 none -> table로 timeout을 두고 변경해주면 제대로 랜더링 됨
                     */
                    if (is_InternetExplorer()) {
                        $('#' + bid).css('display', 'none');
                        setTimeout(function() {
                            $('#' + bid).css('display', 'table');
                        }, 100);
                    }

                    callback();
                });
                boardPagingDelegateActivation();
            }
            else { $(obj).remove(); }
        },
        function(xhr) {
            callback();
        }
    );
}

function moveWriteForm(obj) {
    var board = $(obj).parents('.boardBox').first();
    var bid = $(obj).siblings('table').data('bid');

    if (board.find('.board-guide').length > 0 || bid == undefined) {
        alert(lang.not_complete_board_creation);
        return;
    }
    else {
        var uri = encodeURI(window.location.href);
        location.href = '/module/board/write_form.html?bid=' + encodeURIComponent(bid) + "&pn=" + encodeURIComponent(SITE_URL) + '&prev=' + encodeURIComponent(uri);
    }
}

function setBoardArticle(view, bid, category, keyword, page, size, segment, callback) {
    if (!callback) callback = function() {}
    if (page <= 0 || size <= 0) {
        callback();
        return;
    }
    // 목록보기 권한 체크
    qvjax_direct(
        "check_board_auth",
        "/module/board/board.php",
        'bid=' + bid + '&auth_action=view',
        function (data) {
            if (data) {
                init_BoardArticle();
            }
            else {
                view.find('.board-tbody-tr').remove();
                view.find('.pager').children().remove();
                view.find('.board-noauth').remove();

                var html = '<div class="board-noauth" style="height: 100px;width: 100%;border: 1px solid #000;"><div style="display: flex;justify-content: center;align-items: center;flex-direction: column;height: 100%; color: #494949;">권한이 없습니다.</div></div>';
                view.find('table').after($(html));
                callback();
            }
        },
        function (xhr) {
            callback();
        }
    );

    function init_BoardArticle() {
        var search_type = view.find('.board-search-select option:selected').val();

        qvjax_direct(
            "select_board_article_list",
            "/module/board/board.php",
            'bid=' + bid + '&category=' + category + '&search_type=' + search_type +'&keyword=' + keyword + '&page=' + page + '&size=' + size + '&segment=' + segment,
            function (data) {
                var json_data = $.parseJSON(data);
                var totalCount = json_data.total;
                var article_data = json_data.data;

                // paging start //
                var startNumber = totalCount-((page-1)*size);
                buildPagingHtml(view, page, size, totalCount, keyword != '');

                var box = view.parents('.boardBox').first();
                box.data('total', totalCount);
                // paging end //

                if (view.find('tbody.board-tbody').children('tr').length > 0) {
                    view.find('tbody.board-tbody').children('tr').remove();
                }

                var fid = view.parents('.frm')[0].id;
                var tid = view.find('table')[0].id;
                var html = '';

                if (article_data.length > 0) {
                    // PC
                    $.each(article_data, function() {
                        var user_type = 'm';
                        if (this.writer_account == null) { user_type = 'nm'; }
                        if (this.category_name == null) { this.category_name = ''; }

                        // 일반 게시판 형
                        if (view.find('table').hasClass('board-table-1')) {
                            // 공지사항은 tr에 notice 클래스 추가
                            if (parseInt(this.is_notice) > 0) {
                                html += '<tr class="board-tbody-tr notice" id="' + this.aid + '" data-type="' + user_type + '">';
                            }
                            else {
                                html += '<tr class="board-tbody-tr" id="' + this.aid + '" data-type="' + user_type + '">';
                            }

                            // 공지사항은 글번호 대신 notice
                            if ($('#' + tid + ' thead tr').children('.board-thead-item-no').length > 0) {
                                if (parseInt(this.is_notice) > 0) {
                                    html += '<td class="board-tbody-item board-tbody-item-count" style="font-size: 11px;"><div>Notice</div></td>';
                                }
                                else {
                                    html += '<td class="board-tbody-item board-tbody-item-count">' + startNumber-- + '</td>';
                                }
                            }

                            // 카테고리
                            if ($('#' + tid + ' thead tr').children('.board-thead-item-category').length > 0) {
                                html += '<td class="board-tbody-item board-tbody-item-category">' + this.category_name + '</td>';
                            }

                            // 제목
                            if ($('#' + tid + ' thead tr').children('.board-thead-item-title').length > 0) {
                                // 댓글인 항목은 padding을 줘서 들여쓰기 함
                                var padding = this.reply.length * 15 + 20 + 'px'; // 20은 default padding
                                html += '<td class="board-tbody-item board-tbody-item-title" style="padding-left:' + padding + '">';
                                // 댓글
                                if (this.reply != '') {
                                    html += '<i class="fa fa-mail-reply" aria-hidden="true" style="transform: rotate(180deg);"></i>';
                                }
                                // 비밀글
                                if (parseInt(this.is_secret) > 0) {
                                    html += '<i class="icon-lock" aria-hidden="true"></i>';
                                }
                                // 공지사항
                                if (parseInt(this.is_notice) > 0) {
                                    html += '<i class="icon-volume-2" aria-hidden="true"></i>';
                                    // 공지사항은 제목 bold처리
                                    html += '<div style="font-weight:bold;">' + this.subject + '</div>';
                                }
                                else {
                                    // 새 글
                                    var createDateTime = new Date(parseInt(this.reg_date) * 1000)
                                    var currentDateTime = new Date();
                                    var compareDateTime = currentDateTime.setDate(currentDateTime.getDate() - 1);
                                    if (createDateTime > compareDateTime && this.reply == '') {
                                        //html += '<span class="dot"></span>';
                                        html += '<div class="new">' + this.subject + '</div>';
                                    }
                                    else {
                                        html += '<div>' + this.subject + '</div>';
                                    }
                                }
                                if (parseInt(this.fileCount) > 0) {
                                    html += '<i class="icon-paper-clip" aria-hidden="true"></i>';
                                }
                                // if ($(this.content).find('img').length > 0) {
                                if (this.content.indexOf('<img') > -1) {
                                    html += '<i class="icon-picture" aria-hidden="true"></i>';
                                }
                                if (parseInt(this.comment) > 0) {
                                    html += '<span><i class="icon-bubble" aria-hidden="true"></i>' + this.comment + '</span>';
                                }
                                html += '</td>';
                            }

                            if ($('#' + tid + ' thead tr').children('.board-thead-item-writer').length > 0) {
                                html += '<td class="board-tbody-item board-tbody-item-writer">' + changeAdministratorNameLanguage(this.writer) + '</td>';
                            }
                            if ($('#' + tid + ' thead tr').children('.board-thead-item-hits').length > 0) {
                                html += '<td class="board-tbody-item board-tbody-item-hits"><i class="icon-like" aria-hidden="true" style="display:none;"></i>' + this.hits + '</td>';
                            }
                            if ($('#' + tid + ' thead tr').children('.board-thead-item-views').length > 0) {
                                html += '<td class="board-tbody-item board-tbody-item-views"><i class="icon-eye" aria-hidden="true" style="display:none;"></i>' + this.views + '</td>';
                            }
                            if ($('#' + tid + ' thead tr').children('.board-thead-item-date').length > 0) {
                                // 게시된지 하루가 지나지 않은 항목은 ~~hours ago 형식
                                // 게시된지 하루가 지난 항목은 yyyy-MM-dd 형식
                                var createDateTime = new Date(parseInt(this.reg_date) * 1000);
                                var currentDateTime = new Date();
                                var compareDateTime = currentDateTime.setDate(currentDateTime.getDate() - 1);
                                if (createDateTime > compareDateTime) {
                                    html += '<td class="board-tbody-item board-tbody-item-date">' + getNiceTime(parseInt(this.reg_date) * 1000, new Date(), 1, true) +'</td>';
                                }
                                else {
                                    html += '<td class="board-tbody-item board-tbody-item-date">' + $.datepicker.formatDate('yy-mm-dd', createDateTime) + '</td>';
                                }
                            }
                            html += '</tr>';
                        }
                        // 썸네일 게시판 형
                        else if (view.find('table').hasClass('board-table-2')) {
                            var content = this.content.replace(/\n/g, '');

                            // 공지사항은 tr에 notice 클래스 추가
                            if (parseInt(this.is_notice) > 0) {
                                html += '<tr class="board-tbody-tr notice" id="' + this.aid + '" data-type="' + user_type + '">';
                            }
                            else {
                                html += '<tr class="board-tbody-tr" id="' + this.aid + '" data-type="' + user_type + '">';
                            }
                            html += '<td class="board-tbody-item board-tbody-item-title">';
                            html += '<div class="board-tbody-item-img">';

                            // 공지사항은 이미지 대신 아이콘, 이미지가 없으면 임시 이미지
                            if (content.indexOf('qv-video') > 0 && parseInt(this.is_notice) == 0) {
                                var id = /<iframe.*?class="qv-video".*?data-id=['"](.*?)['"]/.exec(content)[1];
                                var type = /<iframe.*?class="qv-video".*?data-type=['"](.*?)['"]/.exec(content)[1];
                                var thumbnail = /board-thumbnail.*?src=['"](.*?)['"]/.exec(content);

                                if (thumbnail != null) {
                                    var thumbnailUrl = thumbnail[1];
                                    html += '<div class="gallery-board-image" style="background-image:url(' + thumbnailUrl + ')"></div>';
                                }
                                else if (type == 'youtube') {
                                    var thumbnailUrl = 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg';
                                    html += '<div class="gallery-board-image" style="background-image:url(' + thumbnailUrl + ')">';
                                    html += '<div class="gallery-board-image-overlay"><i class="icon-control-play"></i></div>';
                                    html += '</div>';
                                }
                                else if (type == 'vimeo') {
                                    $.getJSON('https://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', {format: "json"}, function(data) {
                                        $('.vimeo' + data[0].id).css('backgroundImage','url(' + data[0].thumbnail_large + ')');
                                    });
                                    html += '<div class="gallery-board-image vimeo' + id + '">';
                                    html += '<div class="gallery-board-image-overlay"><i class="icon-control-play"></i></div>';
                                    html += '</div>';
                                }
                            }
                            else if (content.indexOf('img') > 0 && parseInt(this.is_notice) == 0) {
                                // html += $(content).find('img')[0].outerHTML;
                                /* 2020.02.11 재헌
                                 * 첨부 이미지 프로세스 변경
                                 */
                                if (content.indexOf('board-thumbnail') > 0) {
                                    var src = '';
                                    var images = content.match(/<img(.*?)>/g);
                                    $.each(images, function() {
                                        if (this.indexOf('board-thumbnail') > 0) {
                                            var regex = /src=['"](.*?)['"]/;
                                            src = regex.exec(this)[1];
                                            return false;
                                        }
                                    });
                                    html += '<div class="gallery-board-image" style="background-image:url(' + src + ')"></div>';
                                }
                                else {
                                    var first = content.match(/<img(.*?)\/>/g);
                                    // 사용자 임의로 base64로 인코딩 이미지를 넣으면 정규식에 걸리지않는다
                                    if (first == null) {
                                        html += '<div class="gallery-board-image">';
                                        html += '<div class="gallery-board-image-overlay"><i class="icon-picture" style="color: #e8e8e8 !important;"></i></div>';
                                        html += '</div>';
                                    }
                                    else {
                                        var regex = /<img.*?src=['"](.*?)['"]/;
                                        var src = regex.exec(first[0])[1];
                                        html += '<div class="gallery-board-image" style="background-image:url(' + src + ')"></div>';
                                    }
                                }
                            }
                            else if (parseInt(this.is_notice) > 0) {
                                html += '<i class="icon-volume-2" aria-hidden="true"></i>';
                            }
                            else {
                                // html += '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdzCFhx2amGylOL5hNmrDzZUiimjh8IEJhTN91zUPECwsqwHNu" style="max-width:100%;" class="mCS_img_loaded">';
                                // html += '<div class="gallery-board-image" style="background-image:url(' + "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdzCFhx2amGylOL5hNmrDzZUiimjh8IEJhTN91zUPECwsqwHNu" + ')"></div>'
                                html += '<div class="gallery-board-image">';
                                html += '<div class="gallery-board-image-overlay"><i class="icon-picture" style="color: #e8e8e8 !important;"></i></div>';
                                html += '</div>';
                            }
                            html += '</div>';
                            html += '<div class="board-tbody-item-contents">';
                            html += '<div class="board-tbody-item-top">';

                            // 공지사항은 카테고리 란에 Notice 로 치환
                            if (parseInt(this.is_notice) > 0) {
                                html += '<div class="board-tbody-item-category" style="font-weight: bold;">Notice</div>';
                                html += '<div class="board-tbody-item-subject" style="font-weight: bold;">' + this.subject + '</div>';
                            }
                            else {
                                if ($('#' + tid + ' thead tr').children('.board-thead-item-category').length > 0) {
                                    if (this.category_name == '' && view.find('.theme-1').length > 0) {}
                                    else {
                                        html += '<div class="board-tbody-item-category">' + this.category_name + '</div>';
                                    }
                                }

                                // 새 글
                                var createDateTime = new Date(parseInt(this.reg_date) * 1000)
                                var currentDateTime = new Date();
                                var compareDateTime = currentDateTime.setDate(currentDateTime.getDate() - 1);
                                if (createDateTime > compareDateTime && this.reply == '') {
                                    html += '<div class="board-tbody-item-subject new">';
                                }
                                else {
                                    html += '<div class="board-tbody-item-subject">';
                                }
                                // 비밀글
                                if (parseInt(this.is_secret) > 0) {
                                    html += '<i class="icon-lock" aria-hidden="true"></i>';
                                }
                                html += this.subject;

                                if (parseInt(this.fileCount) > 0) {
                                    html += '<i class="icon-paper-clip" aria-hidden="true"></i>';
                                }
                                // if ($(content).find('img').length > 0) {
                                if (content.indexOf('<img') > -1) {
                                    html += '<i class="icon-picture" aria-hidden="true"></i>';
                                }
                                html += '</div>';
                            }
                            if (parseInt(this.comment) > 0) {
                                html += '<span><i class="icon-bubble" aria-hidden="true"></i>' + this.comment + '</span>';
                            }

                            // 2019.01.22
                            if (view.find('table.board-table-2').hasClass('board-show-content')) {
                                var content = $('<div>' + this.content + '</div>');
                                if (content.find('preview').length > 0) {
                                    // 본문이 표시될 때 깜빡이는 문제 때문에 content display:none -> inline-block (inline-style) 로 처리
                                    html += '<div class="board-tbody-item-content" style="display: inline-block;">' + content.find('preview').not('style').html() + '</div>';
                                }
                                else {
                                    var content_length = 700;
                                    if (view.find('.board-theme').hasClass('theme-2')) { content_length = 280; }
                                    html += '<div class="board-tbody-item-content" style="display: inline-block;">' + $(this.content).not('style').text().substring(0, content_length) + '</div>';
                                }
                            }

                            html += '</div>';
                            html += '<div class="board-tbody-item-bottom">';
                            html += '<span class="board-tbody-item-bottom-writer">' + changeAdministratorNameLanguage(this.writer) + '</span>';
                            html += '<span class="board-tbody-item-bottom-hits"><i class="icon-like" aria-hidden="true"></i>' + this.hits + '</span>';
                            html += '<span class="board-tbody-item-bottom-views"><i class="icon-eye" aria-hidden="true"></i>' + this.views + '</span>';

                            // 게시된지 하루가 지나지 않은 항목은 ~~hours ago 형식
                            // 게시된지 하루가 지난 항목은 yyyy-MM-dd 형식
                            var createDateTime = new Date(parseInt(this.reg_date) * 1000);
                            var currentDateTime = new Date();
                            var compareDateTime = currentDateTime.setDate(currentDateTime.getDate() - 1);
                            if (createDateTime > compareDateTime) {
                                html += '<span class="board-tbody-item-bottom-date">' + getNiceTime(parseInt(this.reg_date) * 1000, new Date(), 1, true) +'</span>';
                            }
                            else {
                                html += '<span class="board-tbody-item-bottom-date">' + $.datepicker.formatDate('yy-mm-dd', createDateTime) + '</span>';
                            }
                            html += '</div>';
                            html += '</div>';
                            html += '</td>';
                            html += '</tr>';
                        }
                        // Q&A 게시판 형
                        else if (view.find('table').hasClass('board-table-3')) {
                            var createDateTime = new Date(parseInt(this.reg_date) * 1000);
                            html += '<tr class="board-tbody-tr" id="' + this.aid + '" data-type="' + user_type + '">';
                            html += '<td class="board-tbody-item">';
                            html += '<div class="board-tbody-item-title"><i class="material-icons">add</i>' + this.subject;
                            html += '<div class="board-tbody-item-bottom">';
                            html += '<div class="board-tbody-item-writer">' + changeAdministratorNameLanguage(this.writer) + '</div>';
                            html += '<div class="board-tbody-item-date">' +  $.datepicker.formatDate('yy-mm-dd', createDateTime); + '</div>'
                            html += '</div></div>';
                            html += '<div class="board-tbody-item-contents">';
                            html += this.content;
                            html += '</div>';
                            html += '</td>';
                            html += '</tr>';
                        }
                    });
                }
                else {
                    var colspan = view.find('.board-thead th').length
                    html += '<tr style="border: 1px solid #eee;"><td colspan="' + colspan + '" style="height: 300px;">' + lang.no_result_found + '</td></tr>'
                }

                view.find('tbody.board-tbody').append(html);

                if (category) {
                    var categoryItem = view.find('.board-category > .board-category-item[data-category-id="' + category + '"]')
                    if (!categoryItem.hasClass('active')) {
                        view.find('.board-category > .board-category-item').removeClass('active');
                        categoryItem.addClass('active');
                    }
                }


                callback();

                // 리턴받은 결과값 개수가 페이지 사이즈보다 작을 때 빈값을 넣어준다
                // if (view.find('table').hasClass('board-table-1')
                //     || (view.find('table').hasClass('board-table-2') && view.find('.board-theme').hasClass('theme-1'))) {
                //     var td_empty = '';
                //     $.each($('#' + tid + ' thead tr th'), function (i, val) {
                //         td_empty += "<td></td>";
                //     });
                //
                //     for (var i = 0; i < size - list.length; i++) {
                //         if (i == size - list.length - 1) {
                //             var tr_empty = "<tr class='board-tbody-tr board-tbody-tr-empty' style='border-bottom:1px solid #f1f1f1;'>" + td_empty + "</tr>";
                //         }
                //         else {
                //             var tr_empty = "<tr class='board-tbody-tr board-tbody-tr-empty'>" + td_empty + "</tr>";
                //         }
                //         html += tr_empty;
                //     }
                // }
                // view.find('tbody.board-tbody').append(html);
                //
                // if (view.find('.board-tbody-tr-empty').length > 0) {
                //     var tr_empty_height = 40;
                //     if (view.find('.board-tbody-tr').length > 0) {
                //         if (view.find('.board-tbody-tr').first().height() > 40) {
                //             tr_empty_height = view.find('.board-tbody-tr').first().height();
                //         }
                //     }
                //     view.find('.board-tbody-tr-empty').height(tr_empty_height);
                // }
            },
            function (xhr) { }
        )
    }
}

function init_BoardCategoryItem(view, bid) {
    // category item
    qvjax_direct(
        'select_board_category',
        "/module/board/board.php",
        'bid=' + bid,
        function(data) {
            if (data.length > 0) {
                view.find('.board-category').children().not('.default').remove();
                var html = "";
                $.each(data, function () {
                    html += '<div class="col-sm-2 board-category-item" data-category-id="' + this.category_id + '"><div>' + this.category_name + '</div></div>';
                });
                view.find('.board-category').append(html);

                view.undelegate('.board-category-item', 'click');
                view.delegate('.board-category-item', 'click', function (e) {
                    e.preventDefault();
                    view.find('.board-category-item').not(this).removeClass('active');
                    $(this).addClass('active');

                    var table = $(this).parents('.view').first().find('table');
                    var category = $(this).attr('data-category-id');
                    var keyword = '';
                    var page = 1;
                    var size = parseInt(table.attr('data-pagesize'));
                    setBoardArticle(view, bid, category, keyword, page, size, 0);
                });
            }
        },
        function(xhr) { }
    );
}

// paging
function buildPagingHtml(view, page, pageSize, totalCount, is_search) {
    var html = '';
    var paging_start;
    var paging_end;

    page = parseInt(page);
    pageSize = parseInt(pageSize);
    totalCount = parseInt(totalCount);

    if (page - 2 <= 0) {
        paging_start = 1;
        paging_end = Math.ceil(totalCount/pageSize) >= paging_start + 4 ? 5 : Math.ceil(totalCount/pageSize);
    }
    else if (page + 2 >= Math.ceil(totalCount/pageSize)) {
        paging_start = Math.ceil(totalCount/pageSize) - 4 <= 0 ? 1 : Math.ceil(totalCount/pageSize) - 4;
        paging_end = Math.ceil(totalCount/pageSize);
    }
    else {
        paging_start = page - 2;
        paging_end = page + 2;
    }

    html += '<li class="paging-btn-group__item left">';
    html += '<i class="i-chevron-left"></i>';
    html += '</li>';
    for(var i = paging_start; i <= paging_end; i ++) {
        html += '<li class="paging-btn-group__item">';
        html += '<button class="btn btn--basic" value="' + i + '"><span>' + i;
        html += '</span></button></li>';
    }

    if (is_search) {
        html += '<li class="paging-btn-group__item"><button class="btn btn--next-segment" value="0"><span>' + lang.find_next + '</span></button></li>';
    }

    html += '<li class="paging-btn-group__item right">';
    html += '<i class="i-chevron-right"></i>';
    html += '</li>';

    view.find('.paging-btn-group').children('.paging-btn-group__item').remove();
    view.find('.paging-btn-group').append(html);

    view.find('.btn.btn--basic').filter(function() { return this.value==page; }).addClass('active');
}

var g_segment = 0;
function searchBoardArticle(obj) {
    var frm = $(obj).parents('.frm').first();
    var view = $(obj).parents('.view').first();
    var bid = view.find('table').attr('data-bid');
    var category = view.find('.board-category-item.active').attr('data-category-id') == undefined ? "" : view.find('.board-category-item.active').attr('data-category-id');
    var keyword = view.find('.board-search-input').first().val();
    var page = 1;
    var size = parseInt(view.find('table').attr('data-pagesize'));

    g_segment = 0;
    setBoardArticle(view, bid, category, keyword, page, size, g_segment);
    boardPagingDelegateActivation();
}

$('.board-search .board-search-input').keyup(function(event){
    // press enter in search bar
    if(event.keyCode == 13) { searchBoardArticle(this); }
});

function boardPagingDelegateActivation() {
    $('.boardBox .pager').undelegate('.btn.btn--basic', 'click');
    $('.boardBox .pager').delegate('.btn.btn--basic', 'click', function (e) {
        e.preventDefault();
        var target = $(this).parents('.box').first();
        var view = target.find('.view').first();
        var table = target.find('table').first();
        var bid = table.attr('data-bid');
        var category = view.find('.board-category-item.active').attr('data-category-id') == undefined ? "" : view.find('.board-category-item.active').attr('data-category-id');
        var keyword = view.find('.board-search-input').first().val();
        // var page = parseInt($(this).children('span').text());
        var page = $(this).val();
        var size = table.data("pagesize");

        setBoardArticle(view, bid, category, keyword, page, size, g_segment, function() {
            // 페이지 이동 시 게시판 최상위로 스크롤한다.
            var offsetTop = target.offset().top;
            if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                offsetTop = $('body').scrollTop() + offsetTop;
            }
            if ($('body').hasClass('headerFixed')) {
                var headerHeight = $('.header > .header1').attr('data-hei');
                headerHeight = headerHeight ? parseInt(headerHeight) : $('.header').height();
                offsetTop -= headerHeight;
            }
            $("html, body").animate({scrollTop: offsetTop}, 300);
        });
    });
    $('.boardBox .pager').undelegate('.paging-btn-group__item.left', 'click');
    $('.boardBox .pager').delegate('.paging-btn-group__item.left', 'click', function(e) {
        e.preventDefault();
        var target = $(this).parents('.box').first();
        var view = target.find('.view').first();
        var table = target.find('table').first();
        var bid = table.attr('data-bid');
        var category = view.find('.board-category-item.active').attr('data-category-id') == undefined ? "" : view.find('.board-category-item.active').attr('data-category-id');
        var keyword = view.find('.board-search-input').first().val();
        var page = 1;
        var size = table.data("pagesize");

        setBoardArticle(view, bid, category, keyword, page, size, g_segment);
    });
    $('.boardBox .pager').undelegate('.paging-btn-group__item.right', 'click');
    $('.boardBox .pager').delegate('.paging-btn-group__item.right', 'click', function(e) {
        e.preventDefault();
        var target = $(this).parents('.box').first();
        var view = target.find('.view').first();
        var table = target.find('table').first();
        var bid = table.attr('data-bid');
        var category = view.find('.board-category-item.active').attr('data-category-id') == undefined ? "" : view.find('.board-category-item.active').attr('data-category-id');
        var search_type = view.find('.board-search-select option:selected').val();
        var keyword = view.find('.board-search-input').first().val();
        var size = table.data("pagesize");

        var totalCount = target.data('total');
        if (totalCount) {
            var page = Math.ceil(parseInt(totalCount)/size);
            setBoardArticle(view, bid, category, keyword, page, size, g_segment);
        }
        else { // 초기화가 정상적으로 되었다면 아래 로직 타지않음
            qvjax_direct(
                "count_board_article",
                "/module/board/board.php",
                'bid=' + bid + '&category=' + category + '&search_type=' + search_type + '&keyword=' + keyword,
                function (data) {
                    var page = Math.ceil(data / size);
                    setBoardArticle(view, bid, category, keyword, page, size, g_segment);
                },
                function (xhr) {

                }
            );
        }
    });

    $('.boardBox .pager').undelegate('.btn.btn--next-segment', 'click');
    $('.boardBox .pager').delegate('.btn.btn--next-segment', 'click', function (e) {
        e.preventDefault();
        var target = $(this).parents('.box').first();
        var view = target.find('.view').first();
        var table = target.find('table').first();
        var bid = table.attr('data-bid');
        var category = view.find('.board-category-item.active').attr('data-category-id') == undefined ? "" : view.find('.board-category-item.active').attr('data-category-id');
        var keyword = view.find('.board-search-input').first().val();
        // var page = parseInt($(this).children('span').text());
        var page = 1;
        var size = table.data("pagesize");

        setBoardArticle(view, bid, category, keyword, page, size, ++g_segment);
    });

}
boardPagingDelegateActivation();

function boardArticleClickEvent() {
    $("#main_container").delegate('.board-table-1 tr.board-tbody-tr, .board-table-2 tr.board-tbody-tr', 'click', function(e) {
        // $("#main_container").delegate('tr.board-tbody-tr', 'click', function(e) {
        e.preventDefault();
        var table = $(this).parents('table').first();
        var aid = this.id;
        var bid = table.attr('data-bid');
        var type = table.attr('data-type');
        var _pn = table.attr('data-pn')?table.attr('data-pn'):SITE_URL;
        var pn = "&pn=" + _pn;

        __BID = bid;
        __AID = aid;
        __PN = SITE_URL;

        // 2021.01.11
        // 게시글로 이동 후 다시 되돌아 갈 때 게시판 카테고리, 페이지 유지
        var category = table.prevAll('.board-category');
        var categoryId = category ? category.find('.board-category-item.active').attr('data-category-id') : '';
        var page = table.nextAll('.pager');
        var pageNumber = page ? page.find('button.btn.active').val() : 1;
        var keyword = table.prevAll('.board-search');
        var keywordText = keyword.find('.board-search-input').val();
        try {
            window.localStorage.setItem('QuvBoard', JSON.stringify({
                bid: bid,
                page: pageNumber,
                category: categoryId,
                keyword: keywordText,
            }));
        }
        catch (ex) {
            console.log(ex)
        }


        switch(type) {
            case "move":
                checkAuth(bid, aid,
                    function(obj) {
                        var url = "/module/board/read_form.html?bid=" + bid + "&aid=" + aid + pn;
                        location.href = url;
                        //window.open(url, "_blank");
                    },
                    function(obj) {
                        qvjax_direct(
                            "check_board_auth",
                            "/module/board/board.php",
                            'bid=' + bid + '&aid=' + aid + '&auth_action=read',
                            function (data) {
                                if (data || $('tr#' + obj.parent).attr('data-type') == 'nm') {
                                    // 부모객체의 작성자 유저 타입을 넘겨준다
                                    var parent_user_type = obj.parent == "1" ? "" : "&put=" + $('tr#' + obj.parent).attr('data-type');
                                    var url = "/module/board/read_form.html?bid=" + bid + "&aid=" + aid + pn + parent_user_type;
                                    location.href = url;
                                }
                                else { alert(lang.no_permission); }
                            },
                            function (xhr) {  }
                        );
                    },
                    function(obj) {
                        // 부모객체의 작성자 유저 타입을 넘겨준다
                        var parent_user_type = obj.parent == "1" ? "" : "&put=" + $('tr#' + obj.parent).attr('data-type');
                        var url = "/module/board/read_form.html?bid=" + bid + "&aid=" + aid + pn + parent_user_type;
                        location.href = url;
                    }
                );
                break;
            case "anchor":
                var url = '/' + table.attr('data-pagenum') + '?bid=' + bid + '&aid=' + aid;
                location.href = url;
                break;
            default:
                checkAuth(bid, aid,
                    function(obj) { initialize_currentLocation(bid, aid, obj, table); },
                    function(obj) {
                        qvjax_direct(
                            "check_board_auth",
                            "/module/board/board.php",
                            'bid=' + bid + '&aid=' + aid + '&auth_action=read',
                            function (data) {
                                if (data) {
                                    if ((obj.is_secret == 1 && obj.writer_account == null)
                                        || (obj.is_secret == 1 && $('tr#' + obj.parent).attr('data-type') == 'nm')) {
                                        $('.read-body').data('article', obj);
                                        $('#ReadPasswordCheckModal').modal('show');
                                        $('#ReadPasswordCheckModal').data('article', obj);
                                        $('#ReadPasswordCheckModal').data('type', 'check_password');
                                        $('#ReadPasswordCheckModal').data('aid', __AID);
                                        $('#ReadPasswordCheckModal').data('init-type', type);
                                        $('#ReadPasswordCheckModal').data('table', table);
                                    }
                                    else if (obj.is_secret == 1) {
                                        alert(lang.no_permission);
                                        // window.top.close();
                                    }
                                    else {
                                        initialize_currentLocation(bid, aid, obj, table);
                                    }
                                }
                                else { alert(lang.no_permission); }
                            },
                            function (xhr) { alert(lang.no_permission); }
                        );
                    },
                    function(obj) {
                        //if (obj.is_secret == 1 || obj.writer_account == null) {
                        //if (obj.writer_account == null) {
                        if (obj.is_secret == 1 && obj.writer_account == null) {
                            $('#ReadPasswordCheckModal').modal('show');
                            $('#ReadPasswordCheckModal').data('article', obj);
                            $('#ReadPasswordCheckModal').data('type', 'check_password');
                            $('#ReadPasswordCheckModal').data('aid', __AID);
                            $('#ReadPasswordCheckModal').data('init-type', type);
                            $('#ReadPasswordCheckModal').data('table', table);
                        }
                        else if (obj.is_secret == 1) {
                            alert(lang.no_permission);
                            return;
                            // window.top.close();
                        }
                        else {
                            initialize_currentLocation(bid, aid, obj, table);
                        }
                    }
                );
                break;
        }
    });
}
boardArticleClickEvent();

function boardArticleClickEvent_QA() {
    $('#main_container').undelegate('.board-table-3 tr.board-tbody-tr', 'click');
    $('#main_container').delegate('.board-table-3 tr.board-tbody-tr', 'click', function(e) {
        $(this).children('.board-tbody-item').toggleClass('unfold');
    });
}
boardArticleClickEvent_QA();

function ClearBoardModal(md) {
    md.find('.board-config-interlock option[value=0]').prop('selected', true);
    md.find('.board-config-title').val('');

    md.find('.board-config-auth-group-input').children().remove();
    md.find('.board-config-auth-view option[value=n]').prop('selected',true);
    md.find('.board-config-auth-read option[value=n]').prop('selected',true);
    md.find('.board-config-auth-write option[value=n]').prop('selected',true);
    md.find('.board-config-auth-reply option[value=n]').prop('selected',true);
    md.find('.board-config-auth-comment option[value=n]').prop('selected',true);

    md.find('.board-config-pagesize option[value0]').prop('selected',true);
    md.find('.board-config-category-list').children('li').remove();

    md.find('.board-config-placeholder-subject').val('');
    md.find('.board-config-placeholder-content').val('');
}

function checkAuth(bid, aid, success_callback, failure_callback, nonmember_callback, password) {
    qvjax_direct(
        "select_board_article_check_auth",
        "/module/board/board.php",
        password ? 'bid=' + bid + '&aid=' + aid + '&password=' + password : 'bid=' + bid + '&aid=' + aid,
        function (data) {
            var result = $.parseJSON(data);
            switch(result.type) {
                case 'success':
                    success_callback(result.data[0]);
                    break;
                case 'failure':
                    failure_callback(result.data[0]);
                    break;
                case 'nonmember':
                    nonmember_callback(result.data[0]);
                    break;
            }
        },
        function (xhr) {
            console.log(xhr)
        }
    );
}


function initialize(data) {
    initReadForm(__BID, __AID, data, function(data) {
        initComment(__BID, __AID);
        initAttachments(__BID, __AID, function() {});

        if (data.writer_account == account ||
            data.writer_account == null ||
            isAdmin == 1) {
            var html = '<div class="read-content-options-admin">';
            html += '<div class="read-content-modify">' + lang.modify + '</div> ';
            html += '<div class="read-content-delete">' + lang.remove + '</div>';
            html += '</div>';
            $('.read-content-options').append(html);
        }

        $('.read-body').data('article', data);

        // 비회원
        if (account == "" || account == undefined) {
            var html = '<div class="read-comment-nonmember"><input id="read-comment-nonmember-writer" class="form-control read-comment-nonmember-writer" type="text" placeholder="' + lang.writer + '"><input id="read-comment-nonmember-password" class="form-control read-comment-nonmember-password" type="password" placeholder="' + lang.password + '"></div>'
            $('#read-comment-textarea').before(html);
            $('.read-comment-secret').remove();
            $('.read-body').data('type', 'nonmember');
        }
        // 회원
        else {
            $('.read-body').data('type', 'member');
        }

        /* 2020.02.11 재헌
         * 이전글, 다음글 기능 추가
         */
        if (data.prev != null) {
            var prevUrl = location.href.replace(data.aid, data.prev);
            $('.read-content-prev').off('click.prevArticle');
            $('.read-content-prev').on('click.prevArticle', function() {
                location.href = prevUrl;
            });
            $('.read-content-prev').show();
        }
        if (data.next != null) {
            var nextUrl = location.href.replace(data.aid, data.next);
            $('.read-content-next').off('click.nextArticle');
            $('.read-content-next').on('click.nextArticle', function() {
                location.href = nextUrl;
            });
            $('.read-content-next').show();
        }
    });
}

function initialize_currentLocation(bid, aid, data, table) {
    var html = '<div class="board-body">';
    html += '<div class="read-body">';
    html += '<div class="read-content-options top">';
    html += '<div class="read-content-options-user">';
    html += '<div class="read-content-list">';
    html += lang.list;
    html += '</div> ';
    html += '<div class="read-content-reply">';
    html += lang.reply;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="read-top">';
    html += '<div class="read-category"></div>';
    html += '<div class="read-title"></div>';
    html += '<div class="read-options">';
    html += '<div class="read-writer">' + lang.writer + ' <div class="read-writer-name"></div></div>';
    html += '<div class="read-hits">' + lang.hits + ' <div class="read-hits-count"></div></div>';
    html += '<div class="read-views">' + lang.views + ' <div class="read-views-count"></div></div>';
    html += '<div class="read-date"></div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="read-content">';
    html += '<div class="read-content-inner">' + lang.contents + '</div>';
    html += '</div>';

    if (account != undefined && account != '') {
        html += '<div class="read-recommend">';
        html += '<div class="recommend">';
        html += '<i class="fa fa-heart"></i>';
        html += '<div>' + lang.recommend + '</div>';
        html += '</div>';
        html += '</div>';
    }

    html += '<div class="read-attachments">';
    html += '<div class="read-attachments-list"></div>';
    html += '</div>';
    html += '<div class="read-bottom">';
    html += '<ul class="read-comment-list">';
    html += '</ul>';
    html += '<div class="read-comment" id="read-comment">';
    html += '<textarea id="read-comment-textarea" class="form-control read-comment-textarea" type="text" placeholder="' + lang.comments + '"></textarea><div class="read-comment-add">' + lang.write_comment + '</div>';
    html += '<div class="read-comment-secret"><input type="checkbox" value="0"><div>' + lang.secret_article + '</div></div>';
    html += '</div>';
    html += '</div>';
    html += '<div class="read-content-options bottom">';
    html += '<div class="read-content-options-user">';
    html += '<div class="read-content-list">';
    html += lang.list;
    html += '</div> ';
    html += '<div class="read-content-prev" style="display: none;"><i class="icon-arrow-up" aria-hidden="true"></i>' + lang.prev_article + '</div> ';
    html += '<div class="read-content-next" style="display: none;"><i class="icon-arrow-down" aria-hidden="true"></i>' + lang.next_article + '</div> ';
    html += '<div class="read-content-reply">';
    html += lang.reply;
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
    html += '</div>';

    var target = table.parents('.board-theme').first();
    var view = target.parents('.view').first();
    var columns = target.parents('.column');
    target.hide();
    view.append($(html));
    columns.addClass('table-column');

    var scrolltop = view.offset().top - $('.header').height() - 25;
    scrolltop = is_InternetExplorer() ? scrolltop + $('body').scrollTop() : scrolltop;
    $('html, body').animate({
        scrollTop: scrolltop
    }, 500);

    initReadForm_currentLocation(bid, aid, data, view, function() {
        initComment_currentLocation(bid, aid, view);
        initAttachments_currentLocation(bid, aid, view, function() {});

        if (data.writer_account == account ||
            data.writer_account == null ||
            isAdmin == 1) {
            var html = '<div class="read-content-options-admin">';
            html += '<div class="read-content-modify">' + lang.modify + '</div> ';
            html += '<div class="read-content-delete">' + lang.remove + '</div>';
            html += '</div>';
            view.find('.read-content-options').append(html);
        }

        view.find('.read-body').data('article', data);

        // 비회원
        if (account == "" || account == undefined) {
            var html = '<div class="read-comment-nonmember"><input id="read-comment-nonmember-writer" class="form-control read-comment-nonmember-writer" type="text" placeholder="' + lang.writer + '"><input id="read-comment-nonmember-password" class="form-control read-comment-nonmember-password" type="password" placeholder="' + lang.password + '"></div>'
            view.find('.read-comment-textarea').before(html);
            view.find('.read-comment-secret').remove();
            view.find('.read-body').data('type', 'nonmember');
        }
        // 회원
        else {
            view.find('.read-body').data('type', 'member');
        }

        /* 2020.02.11 재헌
         * 이전글, 다음글 기능 추가
         */
        if (data.prev != null) {
            view.find('.read-content-prev').off('click.prevArticle');
            view.find('.read-content-prev').on('click.prevArticle', function() {
                __BID = bid;
                __AID = data.prev;
                click_prev_next_currentLocation(this, bid, data.prev, data, table);
            });
            view.find('.read-content-prev').show();
        }
        if (data.next != null) {
            view.find('.read-content-next').off('click.nextArticle');
            view.find('.read-content-next').on('click.nextArticle', function() {
                __BID = bid;
                __AID = data.next;
                click_prev_next_currentLocation(this, bid, data.next, data, table);
            });
            view.find('.read-content-next').show();
        }
    });
}

function initReadForm_currentLocation(bid, aid, article, target, callback) {
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
                                    target.find('.read-category').addClass('read-category-show');
                                }
                                else {
                                    target.find('.read-category').removeClass('read-category-show');
                                    target.find('.read-category').remove();
                                }

                                if (parseInt(this.use_recommend) == 0) {
                                    target.find('.read-hits').remove();
                                    target.find('.read-recommend').remove();
                                }
                                else {
                                    target.find('.read-hits').css('display', 'inline-block');
                                    target.find('.read-recommend').show();
                                }

                                if (parseInt(this.use_views) == 0) { target.find('.read-views').remove(); } else { target.find('.read-views').css('display', 'inline-block'); }
                                if (parseInt(this.use_date) == 0) { target.find('.read-date').remove(); } else { target.find('.read-date').css('display', 'inline-block'); }
                                if (parseInt(this.use_writer) == 0) { target.find('.read-writer').remove(); } else { target.find('.read-writer').css('display', 'inline-block'); }
                            });
                        }
                    },
                    function (xhr) {}
                );

                updateViewCount(bid, aid, function() {
                    /* 2020.01.23 재헌
                       IE에서 col-sm-12가 아니면서 '현재 게시판 위치에 표시' 타입인 게시물을 열 때 큰 이미지가 있으면
                       게시판이 한 줄 내려오는 문제
                       -> 각 이미지에 id 부여하고 이미지 로딩이 완료되면 width값을 계산해 다시 할당한다.
                     */
                    /* 2020.06.02 재헌
                     * 이미지가 특정 태그 내에 존재할 때 width를 계산해도 해당 크기가 맞지않는 케이스가 있어서
                     * 일단 img태그인 항목을 모두 hide시키고 게시글 렌더링이 완료되고 나면 show로 전환
                     * show로 전환할 때 max-width 를 parent 기준으로 맞춘다
                     */
                    if (is_InternetExplorer() && // only ie
                        target.parents('.boardBox').length > 0 && // type:default
                        $(article.content).find('img').length > 0) {
                        var html = '';
                        var clone = $(article.content).clone();
                        var width = target.width();
                        $.each(clone.find('img'), function(i, val) {
                            $(this).hide();
                        });

                        $.each(clone, function() {
                            if (this.outerHTML) {
                                html += this.outerHTML;
                            }
                        });

                        article.content = html;
                    }

                    target.find('.read-title').text(article.subject);
                    target.find('.read-content-inner').html(article.content);
                    target.find('.read-category').text(article.category_name);
                    target.find('.read-writer-name').text(changeAdministratorNameLanguage(article.writer));
                    target.find('.read-hits-count').text(article.hits);
                    target.find('.read-views-count').text(parseInt(article.views) + 1);
                    target.find('.read-date').text($.datepicker.formatDate('yy-mm-dd', new Date(article.reg_date*1000)));

                    if (article.category_name == '' || article.category_name == null) {
                        target.find('.read-category').remove();
                    }

                    target.find('.read-content-inner img').each(function() {
                        var box = $(target).parents('.box').first();
                        var margin = parseInt(box.css('margin-left')) + parseInt(box.css('margin-right'));
                        var parentWidth = $(this).parents('.box').width() - margin - 30;
                        if (parentWidth > 0) {
                            this.style.setProperty('max-width', parentWidth + 'px', 'important');
                        }
                        if (parentWidth <= $(this).width()) {
                            this.style.setProperty('width', '100%');
                        }
                        $(this).show();
                    });

                    callback(article);
                });
                $('#ReadPasswordCheckModal').removeData('certification');
            }
            else {
                if (article.writer_account == null) {
                    $('#ReadPasswordCheckModal').modal('show');
                    $('#ReadPasswordCheckModal').data('article', article);
                    $('#ReadPasswordCheckModal').data('type', 'check_password');
                    $('#ReadPasswordCheckModal').data('aid', aid);
                    $('#ReadPasswordCheckModal').data('init-type', 'default');
                    $('#ReadPasswordCheckModal').data('table', target.find('table').first());
                    target.find('.board-body').remove();
                }
                else {
                    alert(lang.no_permission);
                    location.href="/";
                }
            }
        },
        function (xhr) {}
    );
}

function initComment_currentLocation(bid, aid, target) {
    // comment 작성 폼 초기화
    target.find('.read-comment-nonmember-writer').val('');
    target.find('.read-comment-nonmember-password').val('');
    target.find('.read-comment-textarea').val('');

    // 답글 권한이 없으면 답글버튼 삭제
    qvjax_direct(
        "check_board_auth",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid + '&auth_action=reply',
        function(data) {
            if (data || $('#ReadPasswordCheckModal').data('certification')) {
                target.find('.read-content-reply').css('display', 'inline-block');
            }
            else {
                target.find('.read-content-reply').remove();
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
                target.find('.read-comment').show();
            }
            else {
                target.find('.read-comment').remove();
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
                target.find('.read-comment-list').children().remove();

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
                    html += '<div class="read-comment-writer">' + changeAdministratorNameLanguage(this.writer) + '</div>';
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
                            function() {
                                $('#' + article_id + ' .read-comment-content').text(lang.is_secret_article);
                                $('#' + article_id + ' .read-comment-content').addClass('nm').addClass('secret')
                            }
                        )
                    }
                    else {
                        html += '<div class="read-comment-content">' + content + '</div>';
                    }
                    html += '</li>';
                    target.find('.read-comment-list').append(html);
                });
            }
        },
        function (xhr) {}
    );
}

function initAttachments_currentLocation(bid, aid, target, callback) {
    qvjax_direct(
        "select_board_file",
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid,
        function (data) {
            if (data.length > 0) {
                var html = '';
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

                target.find('.read-attachments-list').append(html);
            }
            callback();
        },
        function (xhr) {}
    );
}


function checkArticlePassword(array, success_callback, failure_callback) {
    checkAuth(array[0].bid, array[0].aid,
        function (obj) {
            $('.write-body').data('article', obj);
            $('.read-body').data('article', obj);

            $('#ReadPasswordCheckModal').data('article', obj);

            success_callback();
        },
        function() {
            failure_callback();
        },
        function() {
            failure_callback();
        },
        array[0].password
    );
    // qvjax_direct(
    //     "check_board_article_password",
    //     "/module/board/board.php",
    //     'json_result=' + encodeURIComponent(JSON.stringify(array)),
    //     function (data) {
    //         if (data > 0) {
    //             success_callback();
    //         }
    //         else {
    //             failure_callback();
    //         }
    //     },
    //     function (xhr) { failure_callback(); }
    // );
}
// function checkAuth(bid, aid, success_callback, failure_callback, nonmember_callback) {
//     qvjax_direct(
//         "select_board_article",
//         "/module/board/board.php",
//         'bid=' + bid + '&aid=' + aid,
//         function (data) {
//             if (data.length > 0) {
//                 $.each(data, function () {
//                     var article = this;
//                     // 관리자
//                     var arr_auth = auth.split(',');
//                     if ($.inArray('1', arr_auth) >= 0           // 소유자
//                         || $.inArray('2', arr_auth) >= 0        // 모든권한
//                         || $.inArray('30', arr_auth) >= 0) {    // 게시판관리자
//                         success_callback(article);
//                     }
//                     // 비회원
//                     else if (this.writer_account == null) {
//                         nonmember_callback(article);
//                     }
//                     // 일반회원
//                     else {
//                         qvjax_direct(
//                             "check_board_article_owner",
//                             "/module/board/board.php",
//                             'bid=' + bid + '&aid=' + aid,
//                             function (data) {
//                                 if (data) { success_callback(article); }
//                                 else { failure_callback(article); }
//                             },
//                             function (xhr) { failure_callback(article); }
//                         );
//                     }
//                 });
//             }
//         },
//         function (xhr) {}
//     );
// }



// 댓글형 게시판
function initBoardCommentsBox() {
    $.each($('#main_container .boardCommentsBox'), function() {
        var bid = 'cmt';
        var aid = $(this).attr('data-id');
        var target = $(this).find('.view').first();
        var pagesize = $(this).attr('data-pagesize');
        var reverse = $(this).attr('data-reverse') === "1" ? true : false;
        pagesize = pagesize == undefined ? 10 : pagesize;

        qvjax_direct(
            "select_board_article_contentless",
            "/module/board/board.php",
            'bid=' + bid + '&aid=' + aid,
            function (data) {
                if (data.length > 0) {
                    target.find('.read-body').data('article', data[0]);

                    if (account == "" || account == undefined) {
                        var html = '<div class="read-comment-nonmember"><input id="read-comment-nonmember-writer" class="form-control read-comment-nonmember-writer" type="text" placeholder="' + lang.writer + '"><input id="read-comment-nonmember-password" class="form-control read-comment-nonmember-password" type="password" placeholder="' + lang.password + '"></div>'
                        target.find('.read-comment-textarea').before(html);
                        target.find('.read-body').data('type', 'nonmember');
                    }
                    else {
                        target.find('.read-body').data('type', 'member');
                    }
                }
            },
            function(xhr) {}
        );

        initBoardComments(bid, aid, 1, pagesize, target, reverse);

        // Paging num
        target.find('.pager').delegate('.btn.btn--basic', 'click', function() {
            initBoardComments(bid, aid, parseInt($(this).children('span').text()), pagesize, target, reverse);
        });

        // Paging left
        target.find('.pager').delegate('.paging-btn-group__item.left', 'click', function() {
            initBoardComments(bid, aid, 1, pagesize, target, reverse);
        });

        // Paging right
        target.find('.pager').delegate('.paging-btn-group__item.right', 'click', function() {
            qvjax_direct(
                "count_board_comment",
                "/module/board/board.php",
                'aid=' + aid,
                function (data) {
                    initBoardComments(bid, aid, Math.ceil(data/pagesize), pagesize, target, reverse);
                },
                function (xhr) {}
            );
        });

        // Language
        target.find('.read-comment-add').html(lang.write_comment);
        target.find('.read-comment-secret > div').html(lang.secret_article);
    });
}
initBoardCommentsBox();

function initBoardComments(bid, aid, page, size, target, reverse) {
    const method = reverse
        ? 'select_comments_board_article_reverse'
        : 'select_comments_board_article';

    qvjax_direct(
        method,
        "/module/board/board.php",
        'bid=' + bid + '&aid=' + aid + '&page=' + page + '&size=' + size,
        function (data) {
            target.find('.read-comment-textarea').val('');
            target.find('.read-comment-list').children().remove();
            target.find('.pager').show();
            if (data.length > 0) {
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

                    html += '<div class="read-comment-top">';
                    if (this.is_secret == "1") {
                        html += '<div class="read-comment-secret"><i class="icon-lock" aria-hidden="true"></i><span>[' + lang.secret_article + ']</span></div>';
                    }
                    html += '<div class="read-comment-writer">' + changeAdministratorNameLanguage(this.writer) + '</div>';
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
                            function() {
                                $('#' + article_id + ' .read-comment-content').text(lang.is_secret_article);
                                $('#' + article_id + ' .read-comment-content').addClass('nm').addClass('secret')
                            }
                        )
                    }
                    else {
                        html += '<div class="read-comment-content">' + content + '</div>';
                    }
                    html += '</li>';
                    target.find('.read-comment-list').append(html);
                });
            }
            else {
                target.find('.read-comment-list').append('<div class="read-comment-list-empty">' + lang.no_posts + '</div>');
                target.find('.pager').hide();
            }

            qvjax_direct(
                "count_board_comment",
                "/module/board/board.php",
                'aid=' + aid,
                function (data) {
                    buildPagingHtml(target, page, size, data, false);
                },
                function (xhr) {}
            );
        },
        function (xhr) {}
    );
}

function click_prev_next_currentLocation(_this, bid, aid, data, table) {
    var view = $(_this).parents('.view').first();
    var target = view.find('.board-body');

    if ($(_this).parents('.bottom').length > 0) {
        $('html, body').animate({
            scrollTop: view.offset().top - $('.header').height()
        }, 300);
    }

    $('.table-column').removeClass('table-column');
    target.remove();
    view.find('.board-theme').show();

    checkAuth(bid, aid,
        function(obj) { initialize_currentLocation(bid, aid, obj, table); },
        function(obj) {
            qvjax_direct(
                "check_board_auth",
                "/module/board/board.php",
                'bid=' + bid + '&aid=' + aid + '&auth_action=read',
                function (data) {
                    if (data) {
                        if ((obj.is_secret == 1 && obj.writer_account == null)
                            || (obj.is_secret == 1 && $('tr#' + obj.parent).attr('data-type') == 'nm')) {
                            $('.read-body').data('article', obj);
                            $('#ReadPasswordCheckModal').modal('show');
                            $('#ReadPasswordCheckModal').data('article', obj);
                            $('#ReadPasswordCheckModal').data('type', 'check_password');
                            $('#ReadPasswordCheckModal').data('aid', __AID);
                            $('#ReadPasswordCheckModal').data('init-type', type);
                            $('#ReadPasswordCheckModal').data('table', table);
                        }
                        else if (obj.is_secret == 1) {
                            alert(lang.no_permission);
                            // window.top.close();
                        }
                        else {
                            initialize_currentLocation(bid, aid, obj, table);
                        }
                    }
                    else { alert(lang.no_permission); }
                },
                function (xhr) { alert(lang.no_permission); }
            );
        },
        function(obj) {
            //if (obj.is_secret == 1 || obj.writer_account == null) {
            //if (obj.writer_account == null) {
            if (obj.is_secret == 1 && obj.writer_account == null) {
                $('#ReadPasswordCheckModal').modal('show');
                $('#ReadPasswordCheckModal').data('article', obj);
                $('#ReadPasswordCheckModal').data('type', 'check_password');
                $('#ReadPasswordCheckModal').data('aid', __AID);
                $('#ReadPasswordCheckModal').data('init-type', type);
                $('#ReadPasswordCheckModal').data('table', table);
            }
            else if (obj.is_secret == 1) {
                alert(lang.no_permission);
                return;
                // window.top.close();
            }
            else {
                initialize_currentLocation(bid, aid, obj, table);
            }
        }
    );
}

function changeAdministratorNameLanguage(writer) {
    if (writer != '관리자' && writer != '소유자') return writer;
    if (LANG && LANG == 'ko') return writer;

    return 'Administrator';
}


function initBoardShare() {
    $('.read-body').delegate('.read-share', 'click', function() {
        var shareDialog = '';
        shareDialog += '<div class="share-dialog">';
        shareDialog += '<div class="share-close"></div>';
        shareDialog += '<div class="share-media">';
        // shareDialog += '<div class="share-media-item" data-media="kakao"><img src="/img/sc/sns/icon/Square-Color/KakaoTalk.png"></div>';
        shareDialog += '<div class="share-media-item" data-media="naver"><img src="/img/sc/sns/icon/Square-Color/Naver.png"></div>';
        shareDialog += '<div class="share-media-item" data-media="band"><img src="/img/sc/sns/icon/Square-Color/NaverBand.png"></div>';
        shareDialog += '<div class="share-media-item" data-media="twitter"><img src="/img/sc/sns/icon/Square-Color/Twitter.png"></div>';
        shareDialog += '<div class="share-media-item" data-media="facebook"><img src="/img/sc/sns/icon/Square-Color/Facebook.png"></div>';
        shareDialog += '</div>';
        shareDialog += '<div class="share-address">';
        shareDialog += '<input type="text" id="share-url" readonly/>';
        shareDialog += '<div class="share-address-copy">Copy</div>';
        shareDialog += '</div>';
        shareDialog += '</div>';
        $(this).after(shareDialog);

        $('.share-address input').val(location.href);
    });

    $('.read-body').delegate('.share-address-copy', 'click', function() {
        var obShareUrl = document.getElementById("share-url");
        obShareUrl.select();
        document.execCommand("copy");
        obShareUrl.blur();

        $('.share-address-copy').text('Copied!');
    });

    $('.read-body').delegate('.share-media-item', 'click', function() {
        var media = $(this).attr('data-media');
        var title = encodeURIComponent($('.read-title').text());
        var url = encodeURIComponent(location.href);

        switch(media) {
            case 'kakao':
                break;
            case 'naver':
                var redirect = 'https://share.naver.com/web/shareView.nhn?url={0}&title={1}'.format(url, title);
                break;
            case 'band':
                var redirect = 'http://band.us/plugin/share?route={0}&body={1}"'.format(url, title);
                break;
            case 'twitter':
                var redirect = 'https://twitter.com/intent/tweet?via=quv&url={0}&text={1}'.format(url, title);
                break;
            case 'facebook':
                var redirect = 'https://www.facebook.com/sharer/sharer.php?u={0}'.format(url);
                break;
        }
        console.log(redirect);
        window.open(redirect, '_blank');
    });

    $('.read-body').delegate('.share-close', 'click', function() {
        $('.share-dialog').remove();
    });
}
initBoardShare();


$('.read-comment-list').delegate('.read-comment-content.nm.secret', 'click', function() {
    var target = $(this).parents('li').first();
    var aid = target[0].id;
    __BID = 'cmt';
    $('#ReadPasswordCheckModal').modal('show');
    $('#ReadPasswordCheckModal').data('type', 'update_comment');
    $('#ReadPasswordCheckModal').data('aid', aid);
});