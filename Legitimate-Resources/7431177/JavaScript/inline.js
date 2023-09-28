
    $(document).ready(function() {
        if (!$('body').hasClass('body-fade')) {
            $('body').show();
        }
    });

    $(window).bind("load",function(){
                initContentsLazyLoad();
        
        if ($('body').hasClass('body-fade')) {
            $('body').fadeIn(300, 'linear');
        }

        initAnchor(document.location.pathname + document.location.search);


        if (!is_InternetExplorer()) {
            initAnimation();
        }

        setTimeout(function() { initHeaderOverflowMenuResizeEvent(); }, 500);

        // 템플릿에서 버튼 클릭되지 않도록 -> iframe 내부에서 호출되면 form, board 작성 불가, 주소 tpl 포함인 페이지에만 적용
        if (self !== top) {
            // in iframe (template)
            if (location.host.indexOf('tpl') == 0) {
                $('.form-contents-button, .board-write').css('pointer-events', 'none');
            }
            // in iframe (others)
            else { }
        }

        
        initMaintainRatioImage();
        initMaintainRatioSlider();
        initBackgroundFullSizeVideo();

        if ($(window).width() < 767) {
            initImageBoxAutoResize();
        }
    });

    function initMaintainRatioImage() {
        if (isMobile() && $(window).width() < 767) return;
        var notAllowed = [
            '.mobile_ele',
            '.col-sm-1',
            '.col-sm-2',
            '.col-sm-3',
            '.col-sm-4',
            '.col-sm-5',
            '.col-sm-6',
            '.col-sm-7',
            '.col-sm-8',
            '.col-sm-9',
            '.col-sm-10',
            '.col-sm-11',
        ];

        $.each($('#main_container .body .imgBox'), function() {
            if ($(this).parents(notAllowed.join(',')).length > 0) return;
            var imgcore = $(this).find('.img-core');
            var background_size = imgcore.css('background-size');

            if (background_size == 'contain') {
                var backgroundPosition = $(this).find('.img-core').css('background-position');
                if (backgroundPosition != '50% 50%') return;
                else {
                    var url = $(this).find('.img-core').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");
                    // var height = $(this).attr('data-hei').replace(/px/g, '');
                    var height = $(this).find('.img-core').height();
                    $(this).height('auto');
                    imgcore.hide();
                    // max-height 지정에서 height 지정으로 변경됨
                    // 이미지를 확대해서 저장했을 때 에디터화면과 다른 문제 (라이브에서는 원본크기 이상으로 늘어나지 않음)
                    imgcore.after('<img class="img-core-dummy" src="' + url + '" style="max-width: 100%; height: ' + height + 'px;">')
                }
            }
        });
    }

    function resizeMaintainRatioImage() {
        if (isMobile()) return;
        // var interval = setInterval(function() {
        //     if ($('#main_container').width() == 0) { return; }
        //     else {
        //         clearInterval(interval);
        //     }
        // }, 100);

        $.each($('#main_container .imgBox'), function() {
            var imgbox = $(this);
            var imgcore = $(this).find('.img-core');
            var ratio = imgcore.attr('data-ratio');
            var w = $(this).width();
            var w_data = $(this).attr('data-width');
            var background_size = imgcore.css('background-size');

            if (!$(this).hasClass('displayed')
                || (background_size != 'contain')
                || (w == w_data)
                || (!ratio)) {
                console.log(this.id, 'returned');
                return;
            }

            ratio = parseFloat(ratio);
            var ratio_box = imgcore.height() / imgcore.width();
            if (ratio_box > ratio) {
                imgcore.height(imgcore.width() * parseFloat(ratio));
                imgbox.height('auto');
                console.log('1', ratio_box, ratio);
            }
            else {
                imgcore.height(imgbox.attr('data-hei'));
                console.log('2', ratio_box, ratio);
            }

            // $(this).attr('data-width', w);
            // $(this).height('auto');
            // imgcore.height(imgcore.width() * parseFloat(ratio));
        });
    }

    function resizeMaintainRatioSlider() {
        /* 2020.03.18 재헌
         * IE, FF 에서 해당함수 호출 시 렌더링이 완료되지 않은 상태면 ratio 값을 잘못 측정하는 문제
         * 렌더링 완료 기준은 main_container의 width 값이 0인지 아닌지로 확인
         * 렌더링이 완료되지 않은 상태에서 호출되었다면 100ms 간격을 두고 함수 재호출
         */
        var w = $('#main_container').width();
        if (w == 0) {
            setTimeout(function() {
                resizeMaintainRatioSlider();
            }, 100);
            return;
        }

        $.each($('#main_container .slider-frm.maintain-ratio .frm, #main_container .slider-frm.maintain-ratio .box'), function() {
            var screenWidth = window.screen.width;
            // col-sm 비율까지 고려하려면 아래 코드 사용, 일단 main_container 하위 슬라이드만 적용할 것이라 사용하지 않음
            //var sliderFrame = $(this).parents('.slider-frm').first();
            // var column = sliderFrame.parent()[0].className.split(' ').filter(v => v.indexOf('col-sm') > -1);
            // if (column.length > 0) { // [col-sm-4..]
            //     var column_num = column[0].replace(/col-sm-/g, '');
            //     var column_ratio = 12 / column_num;
            //     screenWidth = screenWidth / column_ratio;
            // }

            var ratio = $(this).parents('.slider-frm').first().width() / screenWidth;
            // 상위에 프레임이 하나 더 있는 경우 width가 0으로 잡힌다
            ratio = ratio != 0 ? ratio : $(this).parents('.slider-frm').parent().width() / screenWidth;

            if(ratio > 0.1) { //IE11,FF load()전 width()값 못가져오는 case 예외처리
                var origin_height = parseInt($(this).data('origin-height'));
                var height = Math.floor(origin_height * ratio);

                if ($(this).hasClass('frm')) {
                    if ($(this).parent().hasClass('item')) {
                        if (window.innerWidth <= 767) {
                            ratio = 1;
                            height = $(this).data('origin-height');
                            $(this).children('.view').css('transform-origin', '50% 50%');
                            $(this).css('background-position-y', '50%'); // frame 백그라운드 이미지 원복
                        }
                        $(this).parents('.carousel-inner').height(height);
                        $(this).children('.view').children('.tb').height(height);
                        $(this).children('.view').css('transform', 'scale(' + ratio + ')');

                        // column이 여러개인 경우 item의 높이가 column의 수 만큼 크게나와서 아래와 같이 보정
                        var itemHeight = $(this).parent('.item').height();
                        if (!$(this).parent('.item').hasClass('active')) {
                            itemHeight = itemHeight / $(this).children('.view').children('.tb').children('.row').children('.column').length;
                        }
                        //
                        if (itemHeight >= height) {
                            var diff = parseFloat(itemHeight - height);
                            var rate = itemHeight / 2;
                            var column_height = 0;
                            $.each($(this).children('.view').children('.tb').children('.row').children('.column'), function () {
                                var total = 0;
                                $.each($(this).children('.frm, .box'), function () {
                                    total += parseInt($(this).data('origin-height'));
                                });
                                column_height = column_height < total ? total : column_height;
                            });
                            column_height = column_height * ratio;
                            column_height = height - column_height;
                            rate = rate - column_height;

                            // most 3
                            // var diff = parseFloat(itemHeight - height);
                            // var column_height = 0;
                            // $.each($(this).children('.view').children('.tb').children('.row').children('.column'), function() {
                            //     var total = 0;
                            //     $.each($(this).children('.frm, .box'), function() {
                            //         total += parseInt($(this).data('origin-height'));
                            //     });
                            //     column_height = column_height < total ? total : column_height;
                            // });
                            // var rate = (itemHeight + height - (column_height * ratio * 2)) / 2;

                            // most 2
                            // var diff = parseFloat(itemHeight - height);
                            // var rate = diff + diff * Math.sqrt((ratio - 0.5));

                            // most 1
                            // var diff = itemHeight - height;
                            // var rate = diff * (1 + Math.pow(ratio, 2) + (ratizo - 0.5));

                            if (window.innerWidth > 767) {
                                $(this).children('.view').css('transform-origin', '50% calc(50% - ' + Math.ceil(rate) + 'px)');
                                $(this).css('background-position-y', 'calc(50% - ' + parseFloat(diff / 2) + 'px)'); // frame 백그라운드 이미지 보정
                            }
                        }
                    }
                }
                else {
                    // $(this).height(height);

                    // if ($(this).hasClass('imgBox')) {
                    //     $(this).find('.img-core').height(height);
                    // }
                }
            }
        });
    }



    function initMaintainRatioSlider() {
        if ($('#main_container .slider-frm.maintain-ratio').length > 0) {
            // ratio slider는 displayed 클래스를 붙여준다.
            $.each($('#main_container .slider-frm.maintain-ratio'), function() {
                var target = $(this).parents('.frm');
                $.merge(target, [$(this)]);
                $.merge(target, $(this).find('.frm, .box'));
                $.each(target, function() {
                    $(this).addClass('displayed');
                });
            });

            // $.each($('#main_container .slider-frm.maintain-ratio .carousel-inner'), function() {
            //     $(this).css('height', 'auto');
            // });
            $.each($('#main_container .slider-frm.maintain-ratio .item > .frm > .view > .tb > .row > .column'), function() {
                $(this).css('height', 'auto');
                // $(this).css('min-height', 'auto');
            });
            $.each($('#main_container .slider-frm.maintain-ratio .column'), function() {
                $(this).css('min-height', 'auto');
            });
            $.each($('#main_container .slider-frm.maintain-ratio .frm, #main_container .slider-frm.maintain-ratio .box'), function() {
                var h = $(this).hasClass('frm') ? $(this).children('.view').children('.tb').height() : $(this).height();
                h = $(this).parent().hasClass('item') ? $(this).parents('.carousel-inner').height() : h;
                $(this).data('origin-height', h);
            });

            // 브라우저가 resize 될 때 마다 slider 크기를 조절한다
            $(window).resize(function(){
                resizeMaintainRatioSlider();
            });

            resizeMaintainRatioSlider();
        }
    }

    /* 2020.02.27 재헌
     * fixed - relative 기반
     */
    function initAffixedFrame() {
        var affixedFrame = $('.body .frm[data-fixed="true"]');
        if (affixedFrame.length == 0) return;

        //data-fixed가 존재하는 frame에 z-index 할당
        //var zIndex = $('.body > .frm .frm[data-fixed="true"]').length + 10;
        var zIndex = $('.body .frm').length + 10;
        $.each($('.body .frm'), function() {
            $(this).css('z-index', zIndex--);
        });

        // 고정 컨텐츠의 초기값 지정 및 affixed 클래스 부여, 더미 생성
        $.each(affixedFrame, function() {
            // displayed 되지 않은 항목은 width, offsetTop 값을 가져오지 못하기 때문에
            // 자신과 부모 프레임에 displayed 클래스를 추가한다
            $.each($(this).parents('.frm').andSelf(), function() {
                $(this).addClass('displayed');
            });

            var offsetTop = $(this).offset().top - parseInt($(this).css('margin-top'));
            var maxHeight = $('.header.useFixed').length > 0 ? 'calc(100vh - ' + offsetTop + 'px)' : '100vh';

            // $(this).css('width', $(this).width() + 'px');
            $(this).css('max-height', maxHeight);
            if (!$(this).is('.qv-ani, .qv-ani-ele')) {
                $(this).attr('data-origin-offset-top', offsetTop);
            }
            $(this).addClass('affixed');

            var height = $(this).height() +
                parseInt($(this).css('margin-top')) +
                parseInt($(this).css('margin-bottom')) +
                parseInt($(this).css('padding-top')) +
                parseInt($(this).css('padding-bottom'));
            $(this).after('<div class="affixed-dummy" id="dummy-' + this.id + '" style="height:' + height + 'px;"></div>');

            // $(this).parents('.frm').last().css('z-index', zIndex--);
            // $.each($('#fGYLWT').parents('.frm').andSelf(), function() {
            //    $(this).css('z-index', 15);
            // });
        });

        var scrollTarget = is_InternetExplorer() ? $('body') : $(document);
        scrollTarget.on('scroll', function() {
            var currentScrollTop = $(this).scrollTop();
            var topWithWindowHeight = $(this).scrollTop() + $(window).height();
            console.log(currentScrollTop);
            // 모바일 호환
            var header = (isMobile() && $('.header-mobile').length > 0) ? $('.header-mobile') : $('.header:not(.useFixed)');
            var footer = (isMobile() && $('.footer-frame-mobile').length > 0) ? $('.footer-frame-mobile') : $('.footer-frame');

            $.each(affixedFrame, function() {
                /* 2020.02.28 재헌
                 * data-origin-offset-top 값이 없거나(qv-ani, qv-ani-ele), currentScrollTop이 0이면 재할당하여 수시로 값을 보정한다
                 */
                if (!$(this).attr('data-origin-offset-top') || currentScrollTop == 0) {
                    var offsetTop = $(this).offsetTop() - currentScrollTop;
                    $(this).attr('data-origin-offset-top', offsetTop);
                }

                // 최상위 프레임
                if ($(this).parent().is('.body')) {
                    if (header.length > 0 && header.height() > currentScrollTop) {
                        if (!$(this).is('.affixed-top')) {
                            $(this).removeClass (function (index, className) {
                                return (className.match(/(^|\s)affix\S+/g) || []).join(' ');
                            });
                            $(this).addClass('affixed-top');
                            $('.affixed-dummy#dummy-' + this.id).hide();

                            console.log('scroll - header');
                        }
                    }
                    // 스크롤 중 footer에 도달했을 때 (relative)
                    else if (footer.length > 0 && footer.offsetTop() < topWithWindowHeight) {
                        if (!$(this).is('.affixed-bottom')) {
                            var relativePosition = $(window).height();
                            var offsetTop = footer.offsetTop() - relativePosition;
                            offsetTop = header.length > 0 ? offsetTop - header.height() : offsetTop;
                            $(this).css('top', offsetTop + 'px');
                            $(this).removeClass (function (index, className) {
                                return (className.match(/(^|\s)affix\S+/g) || []).join(' ');
                            });
                            $(this).addClass('affixed-bottom');
                            $('.affixed-dummy#dummy-' + this.id).hide();

                            console.log('scroll - footer');
                        }
                    }
                    // header, footer와 접하지 않을 때 (fixed)
                    else {
                        var offsetTop = $(this).attr('data-origin-offset-top');
                        offsetTop = header.length > 0 ? offsetTop - header.height() : offsetTop;
                        // offsetTop = offsetTop < 0 ? 0 : offsetTop;
                        $(this).css('top', offsetTop + 'px');
                        $(this).css('width', $(this).width() + 'px');
                        $(this).removeClass(function (index, className) {
                            return (className.match(/(^|\s)affix\S+/g) || []).join(' ');
                        });
                        $(this).addClass('affixed');
                        $('.affixed-dummy#dummy-' + this.id).show();

                        console.log('scroll - main');
                    }
                }
                // 하위 프레임
                else {
                    var parentFrame = $(this).parents('.frm').last();

                    // 스크롤 중 부모프레임 최상부에 도달했을 때
                    var _offsetTop = parseInt($(this).attr('data-origin-offset-top'));
                    if (_offsetTop > currentScrollTop) {
                        if (!$(this).is('.affixed-top')) {
                            $(this).removeClass (function (index, className) {
                                return (className.match(/(^|\s)affix\S+/g) || []).join(' ');
                            });
                            $(this).addClass('affixed-top');
                            $('.affixed-dummy#dummy-' + this.id).hide();
                        }

                        // offset top 갱신 (chrome, ie 에서 offsetTop 값이 다르게나오는 문제)
                        var offsetTop = $(this).offsetTop();
                        if (_offsetTop != offsetTop) {
                            $(this).attr('data-origin-offset-top', offsetTop);
                        }
                    }
                    // 스크롤 중 부모프레임 최하부에 도달했을 때
                    else if (parentFrame.offsetTop() + parentFrame.height() < topWithWindowHeight) {
                        if (!$(this).is('.affixed-bottom') && !$(this).is('.affixed-top')) { // affixed-top 에서 바로 affixed-bottom 되는 케이스 없도록 함
                            var offsetTop = parentFrame.offsetTop() + parentFrame.height() - $(window).height() - parseInt($(this).attr('data-origin-offset-top'));
                            $(this).css('top', offsetTop + 'px');
                            $(this).removeClass (function (index, className) {
                                return (className.match(/(^|\s)affix\S+/g) || []).join(' ');
                            });
                            $(this).addClass('affixed-bottom');
                            $('.affixed-dummy#dummy-' + this.id).hide();
                        }
                    }
                    // 부모프레임 최상부,최하부에 접하지 않을 때
                    else {
                        if (!$(this).is('.affixed')) {
                            $(this).css('top', '0px');
                            $(this).css('width', $(this).width() + 'px');
                            $(this).removeClass(function (index, className) {
                                return (className.match(/(^|\s)affix\S+/g) || []).join(' ');
                            });
                            $(this).addClass('affixed');
                            $('.affixed-dummy#dummy-' + this.id).show();
                        }
                    }
                }
            });
        });
        window.scrollTo(window.scrollX, window.scrollY - 1);
    }


    function initContentsLazyLoad() {
        if (is_InternetExplorer() || $.browser.mozilla) {
            $('.body').removeClass('pl-h').addClass('pl-n');
            initMapListBox();
            initMapBox();
            return;
        }
        
        var correctionValue = isMobile() ? 500 : 300;
        var contents = $('#main_container .body > .frm');
        var scrollTarget = is_InternetExplorer() ? $('body') : $(document);

        if (contents.length == 0) return;
        else {
            $.each(contents, function () {
                var offsetTop = $(this).offset().top;
                if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                    offsetTop = $('body').scrollTop() + offsetTop;
                }

                var currentScrollTop = scrollTarget.scrollTop();
                if (offsetTop < $(window).height() + correctionValue + currentScrollTop) {
                    $(this).find('.frm:not(".dp-none-important"), .box:not(".dp-none-important")').addClass('displayed');

                    if ($(this).find('.mapListBox').length > 0) {
                        $.each($(this).find('.mapListBox'), function() { initMapListBox($(this)); });
                    }
                    if ($(this).find('.mapBox').length > 0) {
                        $.each($(this).find('.mapBox'), function() { initMapBox($(this)); });
                    }
                }
            });
        }

        var lastScrollTop = 0;
        scrollTarget.on('scroll', function() {
            var currentScrollTop = $(this).scrollTop();
//            var screenHeight = $(window).height();
            var screenHeight = window.innerHeight;
            var t = currentScrollTop;
            var b = currentScrollTop + screenHeight + correctionValue;

            if (currentScrollTop > lastScrollTop){ // scroll down
                $.each($('#main_container .body > .frm'), function() {
                    var height = $(this).height() + parseInt($(this).css('padding-top'))  + parseInt($(this).css('padding-bottom'));
                    var offsetTop = $(this).offset().top;
                    if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                        offsetTop = $('body').scrollTop() + offsetTop;
                    }

                    if (offsetTop + height < t) { }
                    else if (offsetTop < b) {
                        $(this).find('.frm:not(".dp-none-important"), .box:not(".dp-none-important")').addClass('displayed');

                        if ($(this).find('.mapListBox').length > 0) {
                            $.each($(this).find('.mapListBox'), function() { initMapListBox($(this)); });
                        }
                        if ($(this).find('.mapBox').length > 0) {
                            $.each($(this).find('.mapBox'), function() { initMapBox($(this)); });
                        }
                    }
                });
            } else { // scroll up
                $.each($('#main_container .body > .frm'), function() {
                    var height = $(this).height() + parseInt($(this).css('padding-top'))  + parseInt($(this).css('padding-bottom'));
                    var offsetTop = $(this).offset().top;
                    if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                        offsetTop = $('body').scrollTop() + offsetTop;
                    }

                    if (offsetTop > b) { }
                    else if (offsetTop + height > t) {
                        $(this).find('.frm:not(".dp-none-important"), .box:not(".dp-none-important")').addClass('displayed');

                        if ($(this).find('.mapListBox').length > 0) {
                            $.each($(this).find('.mapListBox'), function() { initMapListBox($(this)); });
                        }
                        if ($(this).find('.mapBox').length > 0) {
                            $.each($(this).find('.mapBox'), function() { initMapBox($(this)); });
                        }
                    }
                });
            }

            lastScrollTop = currentScrollTop;
        });
    }

    /* 2020.02.21 재헌
     * an-once 추가
     * 해당 클래스가 있으면 애니메이션이 단 한번만 실행된다.
     * (기존엔 스크롤했다가 다시 올라오면 애니메이션이 다시 실행 됨)
     */
    function initAnimation() {
        var scrollTarget = is_InternetExplorer() ? $('body') : $(document);
        var ani = $('#main_container .qv-ani-ele, #main_container .qv-ani');
        if (ani.length == 0) return;
        else {
            $.each(ani, function () {
                var offsetTop = $(this).offset().top;
                if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                    offsetTop = $('body').scrollTop() + offsetTop;
                }

                var offsetBottom = offsetTop + $(this).height();
                var currentScrollTop = scrollTarget.scrollTop();
                var currentScrollBottom = currentScrollTop + $(window).height() ;

                // 부등호 < 에서 <= 로 모두 변경
                if ((offsetTop <= currentScrollTop && currentScrollTop <= offsetBottom) ||
                    (offsetTop <= currentScrollBottom && currentScrollBottom <= offsetBottom) ||
                    (currentScrollTop <= offsetTop && offsetBottom <= currentScrollBottom) ||
                    (offsetTop <= currentScrollTop && currentScrollBottom <= offsetBottom)) {
                    return;
                }
                else if ($(this).hasClass('qv-ani-ele')) {
                    $(this).toggleClass('qv-ani-ele qv-ani');
                }

//                if (offsetTop > $(window).height() &&
//                    $(this).hasClass('qv-ani-ele')) {
//                    $(this).toggleClass('qv-ani-ele qv-ani');
//                }
            });
        }

        var lastScrollTop = 0;
        scrollTarget.on('scroll', function() {
            var currentScrollTop = $(this).scrollTop();
//            var screenHeight = $(window).height();
            var screenHeight = window.innerHeight;
            var t = currentScrollTop;
            var b = currentScrollTop + screenHeight;

            if (currentScrollTop > lastScrollTop) { // scroll down
                $.each($('#main_container .qv-ani-ele, #main_container .qv-ani'), function() {
                    var height = $(this).height() + parseInt($(this).css('padding-top'))  + parseInt($(this).css('padding-bottom'));
                    var offsetTop = $(this).offset().top;
                    if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                        offsetTop = $('body').scrollTop() + offsetTop;
                    }

                    if (offsetTop + height < t) {
                        if ($(this).is('.qv-ani-ele.an-once')) {
                            $(this).removeClass('qv-ani').addClass('qv-ani-ele');
                        }
                        else if ($(this).hasClass('qv-ani-ele')) {
                            $(this).toggleClass('qv-ani-ele qv-ani');
                            //console.log(1);
                        }
                    }
                    else if (offsetTop < b) {
                        if ($(this).is('.qv-ani-ele.an-once')) {
                            $(this).removeClass('qv-ani').addClass('qv-ani-ele');
                        }
                        else if ($(this).hasClass('qv-ani')) {
                            $(this).toggleClass('qv-ani qv-ani-ele');
                            //console.log(2);
                        }
                    }
                });
            } else { // scroll up
                $.each($('#main_container .qv-ani-ele, #main_container .qv-ani'), function() {
                    var height = $(this).height() + parseInt($(this).css('padding-top'))  + parseInt($(this).css('padding-bottom'));
                    var offsetTop = $(this).offset().top;
                    if (is_InternetExplorer()) { // IE에서는 offset(and position) 동작이 다름.
                        offsetTop = $('body').scrollTop() + offsetTop;
                    }

                    if (offsetTop > b) {
                        if ($(this).is('.qv-ani-ele.an-once')) {
                            $(this).removeClass('qv-ani').addClass('qv-ani-ele');
                        }
                        else if ($(this).hasClass('qv-ani-ele')) {
                            $(this).toggleClass('qv-ani-ele qv-ani');
                            //console.log(3);
                        }
                    }
                    else if (offsetTop + height > t) {
                        if ($(this).is('.qv-ani-ele.an-once')) {
                            $(this).removeClass('qv-ani').addClass('qv-ani-ele');
                        }
                        else if ($(this).hasClass('qv-ani')) {
                            $(this).toggleClass('qv-ani qv-ani-ele');
                            //console.log(4);
                        }
                    }
                });
            }

            lastScrollTop = currentScrollTop;
        });
    }
    $('.quv-made .logo, .quv-made .txt').on('click', function() {
        window.open('https://quv.kr','_blank');
    });
    $('.quv-made .logo, .quv-made .btn-quv-start').on('click', function() {
        window.open('https://quv.kr','_blank');
    });

    function moveArticle(href) {
        var page = href.slice(1, href.indexOf('?'));
        var query = qv_func.getUrlParams();
        var bid = query.bid;
        var aid = query.aid;
        var table = $('table[data-bid="' + bid + '"]');

        if (table.length == 0) return;
        if (bid && aid && (QV_BASE_OBJ.spid == page || SITE_URL == page)) {
            // 앵커 동작 시 lazyload를 무시하고 displayed 클래스 부여
            $.each($('.body > .frm'), function() {
                $(this).find('.frm:not(".dp-none-important"), .box:not(".dp-none-important")').addClass('displayed');
            });

            var type = 'default';
            var _pn = page;
            var pn = "&pn=" + _pn;

            __BID = bid;
            __AID = aid;
            __PN = QV_BASE_OBJ.spid;

            $('#' + bid).attr('data-type', 'default');
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
    }

    function initAnchor(href) {
        var page = href.slice(1, href.indexOf('?'));
        var query = qv_func.getUrlParams();
        var anchor = query.qvac;
        var anchor_mobile = query.qvmac;

        if (isMobile() && anchor_mobile) { anchor = anchor_mobile; }
        if ($('#' + anchor).length == 0) return;
        if (anchor && (QV_BASE_OBJ.spid == page || SITE_URL == page)) {
            // 앵커 동작 시 lazyload를 무시하고 displayed 클래스 부여
            $.each($('.body > .frm'), function() {
               $(this).find('.frm:not(".dp-none-important"), .box:not(".dp-none-important")').addClass('displayed');
            });
            
            if (is_InternetExplorer() && $("#" + anchor).offset().top == 0) { // ie에서 page load 시 offset 값을 가져오지 못하기 때문에 가져올때까지 setInterval 돌림
                var interval = null;
                interval = setInterval(function() {
                    moveAnchor(anchor);
                    clearInterval(interval);
                }, 100);
            }
            else {
                setTimeout(function() {
                    moveAnchor(anchor);
                }, 100)
            }
        }
    }

    function moveAnchor(anchor) {
        var scrolltop = 0;
        var header_height_pc = 0;
        $.each($('.header > div[class*=header]'), function() {
            if ($(this).attr('data-scr-hei')) {
                header_height_pc += parseInt($(this).attr('data-scr-hei'));
            }
        });
        header_height_pc = header_height_pc == 0 ? $('.header').height() : header_height_pc;

        var header_height = isMobile() ? $('.header-mobile').height() : header_height_pc;

        /* 2021.09.28
         * 동일 아이디를 가진 anchor 객체가 존재하는 경우가 있음 (PC/Mobile)
         * 구분하여 각 환경에 맞게 앵커객체 할당
         */
        let anchorTarget = $('div[id="' + anchor + '"]').filter(function(i, a) {
            const mobileParents = $(a).parents('.mobile_ele');
            return isMobile() ? mobileParents.length > 0 : mobileParents.length === 0;
        });
        anchorTarget = anchorTarget.length > 0 ? anchorTarget : $('#' + anchor);

        if (anchorTarget.parents('.slider-frm').length > 0) {
            scrolltop = anchorTarget.parents('.slider-frm').offset().top - header_height;
            scrolltop = is_InternetExplorer() ? scrolltop + $('body').scrollTop() : scrolltop;

            var slider_index = anchorTarget.parents('.item').index();
            anchorTarget.parents('.carousel.slide').carousel(slider_index);
            anchorTarget.parents('.item').first().css('transform', 'translate3d(0, 0, 0)');

            if (anchorTarget.parents('.fullpage ').length > 0) {
                if (anchorTarget.parents('.item').prev('.item').length > 0 ) {
                    anchorTarget.parents('.item').prev('.item').css('transform', 'translate3d(0, -100%, 0)');
                }
                if (anchorTarget.parents('.item').next('.item').length > 0 ) {
                    anchorTarget.parents('.item').next('.item').css('transform', 'translate3d(0, 100%, 0)');
                }
            }
        }
        else if (anchorTarget.parents('.tab-frm').length > 0) {
            scrolltop = anchorTarget.parents('.tab-frm').offset().top - header_height;
            scrolltop = is_InternetExplorer() ? scrolltop + $('body').scrollTop() : scrolltop;

            if (anchor.indexOf('tab-') > -1) {
                var tab_id = anchor;
            }
            else {
                var tab_id = anchorTarget.parent()[0].id;
            }
            anchorTarget.parents('.tab-frm').find('a[href*="#' + tab_id + '"]').trigger('click');

            /* 2020.03.19 재헌
             * 탭을 mobile_ele로 복사하여 넣은 경우 헤더의 탭 앵커가 동작하지 않기 때문에(id가 달라서)
             * 이름으로 찾아 활성화한다
             */
            if (isMobile()) {
                var tab = anchorTarget.parents('.tab-frm');
                var target_tab = tab.find('a[href*="#' + tab_id + '"]');
                var tab_name = target_tab.text();
                $.each($('.mobile_ele .tab-frame-nav a'), function() {
                    if ($(this).text() == tab_name) {
                        $(this).trigger('click');
                    }
                });
            }
        }
        else {
            scrolltop = $("#" + anchor).offset().top - header_height;
            scrolltop = is_InternetExplorer() ? scrolltop + $('body').scrollTop() : scrolltop;
        }

        console.log('anchor', scrolltop, $("#" + anchor).offset().top);
        $('html, body').animate({
            scrollTop: scrolltop
        }, 700);


        // mn-link 클릭하면 header-side-nav 닫음
        if (isMobile() && $('.header-side-nav').hasClass('active')) {
            $('.header-side-nav').removeClass('active');

            if ($(this).parents('.header-mobile').length > 0) {
                $(this).parents('.header1, .header2, .header3, .header9').removeClass('z-index-9999');
            }
        }
    }

    //$('.mn-link').on('click', function() {
    $('a[href*="qvac"]').on('click', function() {
        var href = $(this).attr('href');
        if (href != undefined && href != '') {
            var page = href.slice(1, href.indexOf('?'));
            var params = qv_func.getUrlParams('?' + href.split('?')[1]);
            var anchor = params.qvac;
            var anchor_mobile = params.qvmac;

            if (isMobile() && anchor_mobile) { anchor = anchor_mobile; }
            if ($('#' + anchor).length == 0) return;
            //side menu close
            if($(this).parents(".header-mobile-side-nav").length > 0){
                $('.header-mobile').removeClass('active-side-nav');
            }
            if (anchor && (QV_BASE_OBJ.spid == page || SITE_URL == page)) {
                moveAnchor(anchor);
                return false;
            }
        }
    });

    $('a.mn-link[href*="tab"]').on('click', function(e) {
        var href = $(this).attr('href');
        if (href != undefined && href != '') {
            var page = href.slice(1, href.indexOf('#'));
            var anchor = href.split('#')[1];
            if ($('#' + anchor).length == 0) return;
            else {
                if (anchor && (QV_BASE_OBJ.spid == page || SITE_URL == page)) {
                    e.preventDefault();
                    moveAnchor(anchor);
                }
            }
        }
    });

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    }

    //원래 initHeaderOverflowMenuResizeEvent 위치


    //var resize_frames = [];
    function imageBoxAutoResize() {
        $.each($('#main_container .imgBox'), function() {
            var img_box = $(this);
            var bg_size = $(this).find('.img-core').css('background-size');
            var bg_image = $(this).find('.img-core').css('background-image').replace('url(', '').replace(')', '').replace(/\"/gi, "");

            // displayed 클래스가 없으면 리사이징 하지않는다.
            if (!img_box.hasClass('displayed')) return;

            // 컬럼 2개 이상 존재하는 프레임에 속해있으면 리사이징 하지않는다.
            if (isMobile() || window.innerWidth <= 767) {
                if (img_box.parents('.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11').length > 0) return;
            }
            else {
                if (img_box.parents('.col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11').length > 0) return;
            }

            // 탭, 슬라이드 내의 이미지는 리사이징 하지않는다.
            if (img_box.parents('.tab-frm, .slider-frm').length > 0) return;

            if (bg_size == 'contain') {
                var tmpImg = new Image();
                tmpImg.src = bg_image;
                $(tmpImg).one('load',function(){
                    var ratio = tmpImg.width / tmpImg.height;
                    var height_origin = parseInt(getDataHeight(img_box));
                    var width_resize = img_box.width();
                    var height_resize = width_resize / ratio;
                    height_resize = height_resize > height_origin ? height_origin : height_resize;

                    var diff = height_origin - height_resize;
                    //console.log(diff);

                    if (!isMobile() && window.innerWidth > 767) {
                        img_box.height(height_origin - diff);
                        img_box.find('.img-core').height(height_origin - diff);
                    }
                    else { 
                        /*
                         * 모바일에서는 에디터 width 375px 기준으로 비율을 맞춰서 크기를 조정한다
                         * 모바일객체는 height important가 적용되어있는 경우가 많아 height 조정 시 important를 붙여줘야 함
                         */
                        var mobile_width = 375 - (parseInt(img_box.parents('.frm').last().css('padding-left')) * 2); // 에디터(375px) 기준
                        var mobile_ratio = mobile_width / height_origin;
                        img_box[0].style.setProperty('height', (width_resize / mobile_ratio) + 'px', 'important');
                        img_box.find('.img-core')[0].style.setProperty('height', (width_resize / mobile_ratio) + 'px', 'important');
                    }
                });
            }
        });

        $.each($('.body > .frm'), function() {
            // 컬럼 2개 이상 존재하는 프레임에 속해있으면 리사이징 하지않는다.
            if (isMobile() || window.innerWidth <= 767) {
                if ($(this).parents('.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11').length > 0) return;
                if ($(this).find('.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11').length > 0) return;
            }
            else {
                if ($(this).parents('.col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11').length > 0) return;
                if ($(this).find('.col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11').length > 0) return;
            }


            // 탭, 슬라이드 내의 이미지는 리사이징 하지않는다.
            if ($(this).parents('.tab-frm, .slider-frm').length > 0) return;
            if ($(this).hasClass('tab-frm') || $(this).hasClass('slider-frm')) return;

            var re = 0;
            var image_count = 0;
            $.each($(this).find('.box.imgBox'), function() {
                // displayed 클래스가 없으면 리사이징 하지않는다.
                if (!$(this).hasClass('displayed')) return;

                // 컬럼 2개 이상 존재하는 프레임에 속해있으면 리사이징 하지않는다.
                if (isMobile() || window.innerWidth <= 767) {
                    if ($(this).parents('.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11').length > 0) return;
                }
                else {
                    if ($(this).parents('.col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11').length > 0) return;
                }

                // 탭, 슬라이드 내의 이미지는 리사이징 하지않는다.
                if ($(this).parents('.tab-frm, .slider-frm').length > 0) return;

                re += getDataHeight($(this)) - $(this).height();
                image_count++;
            });

            if (image_count > 0) {
                $.each($(this).find('.frm').andSelf(), function () {
                    var h = getDataHeight($(this));
                    if (h == 'auto' || h == 0 || re > h) return;
                    if ($(this).is($('.body > .frm').first()) && $('.header').length > 0) {
                        $.each($('.header > div'), function() { // 헤더 크기가 가변적이기 때문에 data-hei 값을 가져다쓴다
                            var header_height = $(this).attr('data-hei');
                            if (header_height == '' || header_height == undefined) { return; }
                            h += parseInt(header_height);
                        });
                        //h += $('.header').height();
                    } // 최상단 프레임은 헤더 높이 추가
                    h -= re;
                    //$(this).children('.view').children('.tb').height(h);
                    if (isMobile() || window.innerWidth <= 767) {
                        $(this).css('height', 'auto');
                    }
                    else {
                        $(this).height(h);
                    }
                });
            }
            image_count = 0;
        });

//    $.each(resize_frames, function() {
//        var frame = $('#' + this.id);
//        var height_data = frame.attr('data-hei');
//        if ((height_data == '' || height_data == undefined || height_data == null)) return;
//        if (this.diff <= 0) return;
//        var height_origin_frm = parseInt(height_data);
//        frame.height(height_origin_frm - this.diff);
//        console.log('id : ' + this.id + ' / diff : ' + (height_origin_frm - this.diff).toString());
//
//        this.diff = 0; // 프레임 높이 조정 후 diff:0 으로 할당
//    });
    }

    function getDataHeight($obj) {
        var retval;
        if (window.innerWidth <= 767 || isMobile()) {
            retval = $obj.attr('data-m-hei');
        }
        else {
            retval = $obj.attr('data-hei');
        }

        if (retval == '' || retval == 'auto' || retval == undefined || retval == null || retval == 'NaNpx') {
            retval = $obj.height();
        }
        else {
            retval = parseInt(retval);
            retval -= parseInt($obj.css('margin-top'));
            retval -= parseInt($obj.css('margin-bottom'));
            retval -= parseInt($obj.css('padding-top'));
            retval -= parseInt($obj.css('padding-bottom'));
        }

        return retval;
    }

    function initImageBoxAutoResize() {
        $.each($('#main_container .frm'), function() {
            $(this).css('transition', '0.1s ease height');

            if ($(this).hasClass('tab-frm')) return;
            if ($(this).parents('.tab-frm').length > 0) return;
            if ($(this).hasClass('slider-frm')) return;
            if ($(this).parents('.slider-frm').length > 0) return;

            var hei = $(this).attr('data-hei');
            if (hei == '' || hei == 'auto' || hei == undefined || hei == null || hei == 'NaNpx') {
                hei = $(this).height();
                hei += parseInt($(this).css('margin-top'));
                hei += parseInt($(this).css('margin-bottom'));
                hei += parseInt($(this).css('padding-top'));
                hei += parseInt($(this).css('padding-bottom'));
                $(this).attr('data-hei', hei);
            }
//            $(this).attr('data-hei', $(this).height());
        });

        $.each($('#main_container .imgBox'), function() {
            var m_hei = $(this).attr('data-m-hei');
            if (m_hei == '' || m_hei == 'auto' || m_hei == undefined || m_hei == null || m_hei == 'NaNpx') {
                m_hei = $(this).height();
                m_hei += parseInt($(this).css('margin-top'));
                m_hei += parseInt($(this).css('margin-bottom'));
                m_hei += parseInt($(this).css('padding-top'));
                m_hei += parseInt($(this).css('padding-bottom'));
                $(this).attr('data-m-hei', m_hei + 'px');
            }
        });

        $.each($('#main_container .imgBox .img-core'), function() {
            $(this).css('transition', 'none');
        });

        // 0.2초 마다 갱신
        setInterval(imageBoxAutoResize, 200);


//        window.onresize = function(event) {
//            imageBoxAutoResize();
//        };
//        $(window).bind('resizeEnd', function() {
//            setTimeout(imageBoxAutoResize(), 50)
//        });
    }

    /* 2020.03.10 재헌
     * 백그라운드 비디오 크기 설정 (16:9)
     * frame/box의 크기를 확인 후 맞는 사이즈의 클래스를 부여함
     */
    function initBackgroundFullSizeVideo() {
        var backgroundVideo = $('.box-background-video-fullwidth .video-iframe');
        if (backgroundVideo.length == 0) { return; }
        else {
            var w = $('#main_container').width();
            if (w == 0) {
                setTimeout(function() {
                    initBackgroundFullSizeVideo();
                }, 100);
                return;
            }
            else {
                resizeBackgroundFullSizeVideo();
                $(window).resize(function () {
                    resizeBackgroundFullSizeVideo();
                });
            }
        }
    }
    function resizeBackgroundFullSizeVideo() {
        $.each($('.box-background-video-fullwidth .video-iframe'), function() {
            var $t = $(this).parents('.frm, .box').first();
            var w = $t.width();
            var h = $t.height();

            // 모바일에서 vimeo 배경설정 시 '소리 켜기' 버튼이 생기는 문제 때문에 전체 크기 상향 조정
            // if (isMobile()) {
            //     w += 100;
            //     h += 100;
            // }

            if ($t.parents('.slider-frm').length > 0) {
                w = $t.parents('.slider-frm').width();
                h = $t.parents('.slider-frm').height();
            }
            else if ($t.parents('.tab-frm').length > 0) {
                w = $t.parents('.tab-frm').width();
                h = $t.parents('.tab-frm').height();
            }
            else if (w == 0 || h == 0) {
                $t.addClass('displayed');
                $t.parents('.frm').addClass('displayed');
                w = $t.width();
                h = $t.height();
            }

            h += parseInt($t.css('padding-top'));
            h += parseInt($t.css('padding-bottom'));
            h += parseInt($t.css('margin-top'));
            h += parseInt($t.css('margin-bottom'));

            var resolution = 'resolution-1920x1080'; // default;
            var resolution_array = [
                { w:320, h:180 },
                { w:480, h:270 },
                { w:640, h:360 },
                { w:800, h:450 },
                { w:864, h:486 },
                { w:960, h:540 },
                { w:1024, h:576 },
                { w:1152, h:648 },
                { w:1280, h:720 },
                { w:1366, h:768 },
                { w:1440, h:810 },
                { w:1600, h:900 },
                { w:1760, h:990 },
                { w:1920, h:1080 },
                { w:2048, h:1152 },
                { w:2560, h:1440 },
                { w:2880, h:1620 },
                { w:3200, h:1800 },
                { w:3840, h:2160 },
                { w:4096, h:2304 },
                { w:5120, h:2880 },
            ];
            $.each(resolution_array.reverse(), function() {
                if (w > this.w || h > this.h) { return false; }
                else {
                    resolution = 'resolution-' + this.w + 'x' + this.h;
                }
            });

            if ($(this).hasClass(resolution)) return;
            else {
                $(this).removeClass(function (index, className) {
                    return (className.match(/(^|\s)resolution-\S+/g) || []).join(' ');
                });
                $(this).addClass(resolution);
            }
        });
    }

    function is_InternetExplorer() {
        var agent = navigator.userAgent.toLowerCase();
        return (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1);
    }

    /* 2020.03.11 재헌
     * IE, Chrome이 $t.offset().top 값을 다르게 출력하기 때문에 아래와 같이 처리
     */
    $.fn.offsetTop = function() {
        var offsetTop = $(this).offset().top - parseInt($(this).css('margin-top'));
        return is_InternetExplorer() ? offsetTop + $('body').scrollTop() : offsetTop;
    };


    /* 2020.05.18 재헌
     * 동영상 컨텐츠 로딩 시 다른 컨텐츠의 로딩까지 느려지는 부분 개선
     * 로딩 순서 (동영상 외) -> (동영상)
     */
    $.each($('iframe.video-iframe'), function() {
        var src = $(this).attr('data-src');
        if (!src) return;

        var loadingMask = '<div class="proceeding">' +
            '<div style="z-index: -1;" class="qv-loader qv-loader-black"></div>' +
            '</div>';
        $(this).before($(loadingMask));
    });

    $(window).bind("load",function() {
        $.each($('iframe.video-iframe'), function() {
            var src = $(this).attr('data-src');
            if (!src) return;

            $(this).on('load', function() {
                $(this).siblings('.proceeding').remove();
            });
            $(this).attr('src', src);
        });
    });

    $(document).ready(function() {
        if ($('.read-content-next')) {
            $('.read-content-next').text('이전글');
            $('.read-content-prev').text('다음글');
        }

        $("#main_container").delegate('.board-table-1 tr.board-tbody-tr, .board-table-2 tr.board-tbody-tr, .read-content-next, .read-content-prev', 'click', function (e) {
            const customInterval = setInterval(function() {
                if ($('.read-content-next')) {
                    $('.read-content-next').text('이전글');
                    $('.read-content-prev').text('다음글');
                    clearInterval(customInterval);
                }
            }, 1000)
        });
    });
