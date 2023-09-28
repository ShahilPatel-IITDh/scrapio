(function ($, win, doc) {
    'use strict';

    var $win;
    var html;
    var body;
    var $body;
    var scrollElem;
    var $scrollElem;
    var locationHash;
    var locationPathName;
    var ua;
    var isOldWebkit;
    var $header;
    var $overlay;
    var $spOverlay;
    var $changeModeButton;
    var content;

    if (!$) {
        return;
    }

    $win = $(win);
    html = doc.documentElement;
    body = doc.body;
    $body = $(body);
    scrollElem = doc.scrollingElement || /* IE */ html;
    locationHash = location.hash;
    locationPathName = location.pathname;
    ua = navigator.userAgent;
    isOldWebkit = /WebKit/.test(ua) && !doc.scrollingElement;
    $header = $('#page-header');
    $overlay = $('<div id="js-overlay"></div>');
    $spOverlay = $('#js-nav-overlay');

    if (isOldWebkit) {
        scrollElem = body;
    }

    $scrollElem = $(scrollElem);

    $body.addClass('js-on');
    $body.append($overlay);

    if (/iP(ad|hone|od)/.test(ua)) {
        $('#page-header .g-nav .js-nav-hook-a').addClass('is-ios');
    }

    function isBreakPoint(num) {
        var winWidth = win.innerWidth;

        return win.matchMedia ? win.matchMedia('screen and (min-width: ' + num + 'px)').matches : winWidth >= num;
    }

    function startline() {
        $changeModeButton = $('.js-change-display-button');

        return $changeModeButton.length === 0 ? 0 : $changeModeButton[0].offsetHeight;
    }

    //
    // 機能実行
    //

    content = null;
    $(document).ready(function () {
        $('#area-campaign').on('DOMSubtreeModified propertychange', function () {
            $('.js-adjust-h .js-set-h').matchHeight();
            $('.js-adjust-h .js-set-h-01').matchHeight();
            $('.js-adjust-h .js-set-h-02').matchHeight();
        });
    });

    $(function () {
        // 高さ揃え
        $('.js-adjust-h .js-set-h').matchHeight();
        $('.js-adjust-h .js-set-h-01').matchHeight();
        $('.js-adjust-h .js-set-h-02').matchHeight();

        // ナビ
        $('.js-nav-hook-a').setNavSp();
        $('.js-nav-hook-a').setNav();
        $('.js-nav-opan').setHamburger();

        // ナビ追従
        $('#page-header').setNavFixed();

        // SPメニュー 同ページアンカーリンク対応
        $('#page-header .g-nav .link-anchor, #page-header .g-nav .js-anchor, #page-header .g-nav a[href*="#anchor-"]').on('click', function () {
            if ($('#js-nav-overlay').hasClass('is-active')) {
                $('#js-nav-overlay').trigger('click');
            }
        });

        // スムーススクロール機能
        $('#to-top a, .list-sp-nav-02 a').setSmoothScroll({
            fixedTop: {
                setting: true,
                $elem: '#page-header',
                breakPoint: ''
            },
            pageTopHashName: 'page-top'
        });
        $('.link-anchor, .js-anchor, a[href*="#anchor-"]').setSmoothScroll({
            fixedTop: {
                setting: true,
                $elem: '#page-header',
                breakPoint: ''
            }
        });
    });

    $(function () {
        // ナビ横のスクロール
        $win.on('scroll', function () {
            if (!isBreakPoint(768)) {
                return;
            }
            if ($header.hasClass('fixed')) {
                $header.css('left', -win.scrollX);
            } else {
                $header.css('left', 0);
            }
        });

        //
        // ロード
        //

        // PC
        if (isBreakPoint(768)) {
            // ナビ
            $('.js-lead-more-detail').css('display', '');
        }
        // SP
        if (!isBreakPoint(768)) {
            // ナビ固定
            $header.addClass('fixed');
        }

        // 戻るボタン対策

        window.onpageshow = function (event) {
            if (event.persisted) {
                window.location.reload();
            }
        };

        //
        // リサイズ
        //
        (function () {
            var timer = false;

            $win.on('resize', function () {
                if (timer !== false) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    var scroll;

                    // PC
                    if (isBreakPoint(768)) {
                        // ナビ
                        $('.g-nav').css('display', 'block');

                        // ナビ固定
                        scroll = $win.scrollTop();

                        if (scroll === startline()) {
                            $header.removeClass('fixed');
                        }

                        $spOverlay.css('display', 'none');
                    }

                    // SP
                    if (!isBreakPoint(768)) {
                        // 横スクロール解除
                        $header.css('left', 0);

                        // ナビ固定
                        $header.addClass('fixed');

                        if ($('.g-nav').hasClass('is-active')) {
                            $('.g-nav').show();
                        } else {
                            $('.g-nav').hide();
                        }

                        if ($spOverlay.hasClass('is-active')) {
                            $spOverlay.css('display', 'block');
                        }
                    }
                }, 200);
            });
        }());
    });

    //
    // 機能本体
    //

    // メガドロップPC
    $.fn.setNav = function () {
        var config;
        var $nav;
        var $navHook;
        var $navHookA;
        var $navHookStatus;
        var $navDetail;
        var $navDetailA;

        if (this.length === 0) {
            return;
        }

        config = {
            a11yName: {
                open: '\u958B\u304F', // 開く
                close: '\u9589\u3058\u308B' // 閉じる
            },
            className: {
                active: 'is-active',
                nav: 'js-nav',
                wrap: 'g-nav',
                hook: 'js-nav-hook',
                hookInner: 'js-nav-hook-a',
                status: 'status',
                detail: 'js-nav-detail',
                inner: 'str-inner'
            }
        };

        $nav = $('.' + config.className.nav);
        $navHook = $nav.find('.' + config.className.hook);
        $navHookA = $navHook.find('.' + config.className.hookInner);
        $navHookStatus = $navHookA.find('.' + config.className.status);
        $navDetail = $nav.find('.' + config.className.detail);
        $navDetailA = $navDetail.find('a');

        $navHookA.on('click', function (event) {
            var $target;
            var $targetHook;
            var $targetHookStatus;
            var $targetDetail;
            var $targetDetailInner;
            var targetDetailHeight;
            var $targetDetailA;

            if (!isBreakPoint(768)) {
                return;
            }

            $target = $(this);
            $targetHook = $(this).parents('.' + config.className.hook);
            $targetHookStatus = $targetHook.find('.' + config.className.status);
            $targetDetail = $targetHook.find('.' + config.className.detail);
            $targetDetailInner = $targetDetail.find('.' + config.className.inner);
            targetDetailHeight = $targetDetailInner.outerHeight();
            $targetDetailA = $targetDetail.find('a');

            if ($target.hasClass(config.className.active)) {
                $target.removeClass(config.className.active);
                $targetDetail.removeClass(config.className.active).css('height', 0);
                $overlay.removeClass(config.className.active);
                $navDetailA.prop('tabIndex', -1);
                $targetHookStatus.text(config.a11yName.open);
            } else {
                $navHookA.removeClass(config.className.active);
                $navDetail.removeClass(config.className.active).css('height', 0);
                $navDetailA.prop('tabIndex', -1);
                $targetDetailA.prop('tabIndex', 0);
                $target.addClass(config.className.active);
                $targetDetail.addClass(config.className.active).css('height', targetDetailHeight);
                $overlay.addClass(config.className.active);
                $navHookStatus.text(config.a11yName.open);
                $targetHookStatus.text(config.a11yName.close);
            }
            event.preventDefault();
        });

        $overlay.on('click', function (event) {
            $navHookA.removeClass(config.className.active);
            $navDetail.removeClass(config.className.active).css('height', 0);
            $navDetailA.prop('tabIndex', -1);
            $overlay.removeClass(config.className.active);
            event.preventDefault();
        });

        // タッチデバイスの場合は、ここで終了
        if (
            /iP(hone|od|ad)/.test(ua) ||
            /Android/.test(ua) && 'ontouchstart' in window
        ) {
            return;
        };

        $navHook.on('mouseenter', function (event) {
            var $target;
            var $targetHook;
            var $targetHookStatus;
            var $targetDetail;
            var $targetDetailInner;
            var targetDetailHeight;
            var $targetDetailA;

            if (!isBreakPoint(768)) {
                return;
            }

            $target = $(this);
            $targetHook = $target.find('.' + config.className.hookInner);
            $targetHookStatus = $targetHook.find('.' + config.className.status);
            $targetDetail = $target.find('.' + config.className.detail);
            $targetDetailInner = $targetDetail.find('.' + config.className.inner);
            targetDetailHeight = $targetDetailInner.outerHeight();
            $targetDetailA = $targetDetail.find('a');

            if ($target.hasClass(config.className.active)) {
                $targetHook.removeClass(config.className.active);
                $targetDetail.removeClass(config.className.active).css('height', 0);
                $overlay.removeClass(config.className.active);
                $navDetailA.prop('tabIndex', -1);
                $targetHookStatus.text(config.a11yName.open);
            } else {
                $navHook.removeClass(config.className.active);
                $navDetail.removeClass(config.className.active);
                $targetHook.addClass(config.className.active);
                $targetDetail.addClass(config.className.active).css('height', targetDetailHeight);
                $overlay.addClass(config.className.active);
                $targetDetailA.prop('tabIndex', 0);
                $targetHookStatus.text(config.a11yName.close);
            }
            event.preventDefault();
        }).on('mouseleave', function () {
            var $target;
            var $targetHook;
            var $targetHookStatus;

            if (!isBreakPoint(768)) {
                return;
            }

            $target = $(this);
            $targetHook = $target.find('.' + config.className.hookInner);
            $targetHookStatus = $targetHook.find('.' + config.className.status);

            $navHookA.removeClass(config.className.active);
            $navDetail.removeClass(config.className.active).css('height', 0);
            $overlay.removeClass(config.className.active);
            $navDetailA.prop('tabIndex', -1);
            $targetHookStatus.text(config.a11yName.open);
        });
    };

    // ナビSP
    $.fn.setNavSp = function () {
        var config;
        var $nav;
        var $navHook;
        var $navHookA;
        var $navDetail;
        var $navDetailA;
        var $navHookStatus;

        if (this.length === 0) {
            return;
        }

        config = {
            a11yName: {
                open: '\u958B\u304F', // 開く
                close: '\u9589\u3058\u308B' // 閉じる
            },
            className: {
                active: 'is-active',
                nav: 'js-nav',
                wrap: 'g-nav',
                hook: 'js-nav-hook',
                hookInner: 'js-nav-hook-a',
                status: 'status',
                detail: 'js-nav-detail',
                inner: 'str-inner'
            }
        };

        $nav = $('.' + config.className.nav);
        $navHook = $nav.find('.' + config.className.hook);
        $navHookA = $navHook.find('.' + config.className.hookInner);
        $navDetail = $nav.find('.' + config.className.detail);
        $navDetailA = $navDetail.find('a');
        $navHookStatus = $('<span class="' + config.className.status + '">' + config.a11yName.open + '</span>');

        $navDetailA.prop('tabIndex', -1);
        $nav.show();
        $navHookA.append($navHookStatus);

        $navHookA.on('click', function (event) {
            var $target = $(this);
            var $targetStatus = $target.find('.' + config.className.status);
            var $targetWrap = $target.parents('.' + config.className.hook);
            var $targetDetail = $targetWrap.find('.' + config.className.detail);
            var $targetDetailInner = $targetDetail.find('.' + config.className.inner);
            var targetDetailHeight = $targetDetailInner.outerHeight();
            var $targetDetailA = $targetDetail.find('a');

            if (isBreakPoint(768)) {
                return;
            }

            $target = $(this);
            $targetStatus = $target.find('.' + config.className.status);
            $targetWrap = $target.parents('.' + config.className.hook);
            $targetDetail = $targetWrap.find('.' + config.className.detail);
            $targetDetailInner = $targetDetail.find('.' + config.className.inner);
            targetDetailHeight = $targetDetailInner.outerHeight();
            $targetDetailA = $targetDetail.find('a');

            if ($targetWrap.hasClass(config.className.active)) {
                $targetWrap.removeClass(config.className.active);
                $targetStatus.text(config.a11yName.open);
                $targetDetail.css('height', 0);
                $targetDetailA.prop('tabIndex', -1);
            } else {
                $targetWrap.addClass(config.className.active);
                $targetStatus.text(config.a11yName.close);
                $targetDetail.css('height', targetDetailHeight);
                $targetDetailA.prop('tabIndex', 0);
            }
            event.preventDefault();
        });
    };

    // ハンバーガー
    $.fn.setHamburger = function () {
        var $gNav;
        var $gNavOpenBtn;
        var $detailHook;
        var $detailHookInner;
        var $detailHookStatus;
        var $detailContents;
        var $gNavOpenBtnStatus;
        var $gNavOverlay;
        var config = {
            a11yName: {
                open: '\u958B\u304F', // 開く
                close: '\u9589\u3058\u308B' // 閉じる
            },
            idName: {
                openBtn: 'js-nav-opan'
            },
            className: {
                nav: 'g-nav',
                active: 'is-active',
                wrap: 'g-nav',
                hook: 'js-nav-hook',
                hookInner: 'js-nav-hook-a',
                overlay: 'js-nav-overlay',
                detail: 'js-nav-detail',
                status: 'status',
                closeBtn: 'js-nav-close'
            }
        };

        $gNav = $('.' + config.className.nav);
        $gNavOpenBtn = $('#' + config.idName.openBtn);
        $detailHook = $gNav.find('.' + config.className.hook);
        $detailHookInner = $detailHook.find('.' + config.className.hookInner);
        $detailHookStatus = $detailHookInner.find('.' + config.className.status);
        $detailContents = $detailHook.find('.' + config.className.detail);
        $gNavOverlay = $('<div id="' + config.className.overlay + '"></div>');

        $gNavOpenBtn.append('<span class="' + config.className.status + '">' + config.a11yName.open + '</span>');
        $body.append($gNavOverlay);

        $gNavOpenBtnStatus = $gNavOpenBtn.find('.' + config.className.status);

        if ($gNavOpenBtn.hasClass(config.className.active)) {
            $gNavOpenBtn.removeClass(config.className.active);
            $gNavOpenBtnStatus.text(config.a11yName.open);
            $gNavOverlay.removeClass(config.className.active);
        }

        $gNavOpenBtn.on('click', function () {
            var $target;

            if (isBreakPoint(768)) {
                return;
            }

            $target = $(this);

            if ($target.hasClass(config.className.active)) {
                $target.removeClass(config.className.active);
                $gNavOpenBtnStatus.text(config.a11yName.open);
                $gNav.removeClass(config.className.active).stop().slideUp();
                $detailHook.removeClass(config.className.active);
                $detailHookStatus.text(config.a11yName.open);
                $detailContents.css('height', 0);
                $gNavOverlay.removeClass(config.className.active);
            } else {
                $target.addClass(config.className.active);
                $gNav.addClass(config.className.active).stop().slideDown();
                $gNavOpenBtnStatus.text(config.a11yName.close);
                $detailContents.find('a').prop('tabIndex', -1);
                $gNavOverlay.addClass(config.className.active);
            }
        });

        $gNavOverlay.on('click', function () {
            if (isBreakPoint(768)) {
                return;
            }

            $gNavOpenBtn.removeClass(config.className.active);
            $gNav.removeClass(config.className.active).stop().slideUp();
            $detailHook.removeClass(config.className.active);
            $detailHookStatus.text(config.a11yName.open);
            $detailContents.css('height', 0);
            $detailContents.find('a').prop('tabIndex', -1);
            $gNavOpenBtn.focus();
            $gNavOverlay.removeClass(config.className.active);
        });
    };

    // ナビ追従
    $.fn.setNavFixed = function () {
        var config;
        var $pageHeader;
        var $pageHeaderWrap;
        var $headerUtility;
        var scroll;
        var utilityHeight;
        var timer = false;

        if (this.length === 0) {
            return;
        }

        config = {
            idName: {
                header: 'page-header'
            },
            className: {
                fixed: 'fixed',
                utility: 'header-utility',
                nav: 'nav-area'
            }
        };

        function pageHeaderWrapHeight() {
            var height = isBreakPoint(768) ? $pageHeader.outerHeight() : 66;

            $pageHeaderWrap.height('auto').css('height', height);
        }

        $pageHeader = $('#' + config.idName.header);
        $headerUtility = $pageHeader.find('.' + config.className.utility);

        $pageHeader.wrap('<div>');
        $pageHeaderWrap = $pageHeader.parent();

        scroll = $win.scrollTop();

        if (isBreakPoint(768)) {
            if (scroll >= startline()) {
                $pageHeader.addClass(config.className.fixed);
            }

            if (scroll === startline() || scroll <= startline()) {
                $pageHeader.removeClass(config.className.fixed);
            }
        }

        if ($body.hasClass('no-nav')) {
            $win.on('scroll', function () {
                scroll = $win.scrollTop();

                if (isBreakPoint(768)) {
                    if (scroll >= startline()) {
                        $pageHeader.addClass(config.className.fixed);
                    }

                    if (scroll === startline() || scroll <= startline()) {
                        $pageHeader.removeClass(config.className.fixed);
                    }
                }
            });
        } else {
            $win.on('scroll', function () {
                scroll = $win.scrollTop();
                utilityHeight = $headerUtility.height();

                if (isBreakPoint(768)) {
                    if (scroll >= utilityHeight + startline()) {
                        $pageHeader.addClass(config.className.fixed);
                    }

                    if (scroll === startline() || scroll <= utilityHeight + startline()) {
                        $pageHeader.removeClass(config.className.fixed);
                    }
                }
            });
        }

        $(function () {
            pageHeaderWrapHeight();
        });

        $win.on({
            resize: function () {
                if (!isBreakPoint(768) && $('#page-header .g-nav').hasClass('is-active')) {
                    return;
                }

                if (timer !== false) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    pageHeaderWrapHeight();
                }, 300);
            },
            scroll: function () {
                if (!isBreakPoint(768) && $('#page-header .g-nav').hasClass('is-active')) {
                    return;
                }

                pageHeaderWrapHeight();
            }
        });
    };

    // スムーススクロール機能
    $.fn.setSmoothScroll = function (options) {
        var $ctrls = $(this);
        var $target;
        var config;
        var mqlMatches;

        if (this.length === 0) {
            return;
        }

        config = $.extend({
            effect: {
                duration: 600, // 効果を存続させる時間（ms）
                delay: 0, // 効果を遅延させる時間（ms）
                easing: '' // イージングの設定
            },
            fixedTop: {
                setting: false, // true にすることで、座標固定要素（top）分の距離を調整
                $elem: '', // 高さを取得したい要素を指定する
                breakPoint: '' // 例： 'screen and (max-width: 767px)' や 'screen and (min-width: 768px)' など
            },
            pageTopHashName: 'top' // ページの最上部に戻るの値（'top' はHTML5の仕様に従ったデフォルト値）
        }, options);

        mqlMatches = config.fixedTop.breakPoint === '' ? true : win.matchMedia(config.fixedTop.breakPoint).matches;

        function fixedTopElemHeight() {
            if (
                config.fixedTop.setting === true &&
                config.fixedTop.$elem !== '' &&
                mqlMatches
            ) {
                return $(config.fixedTop.$elem).outerHeight();
            }

            return 0;
        }

        function targetTop($elem) {
            return $elem.length === 0 ? 0 : $elem[0].offsetTop - fixedTopElemHeight();
        }

        function adjustScrollTop($elem) {
            scrollElem.scrollTop = targetTop($elem);
        }

        function focusControl($elem) {
            if ($elem.is('[tabindex]')) {
                $elem.focus();

                return;
            }

            $elem.prop('tabindex', 0);
            $elem.focus();
            $elem.one('blur', function () {
                $elem.removeAttr('tabindex');
            });
        }

        $(function () {
            if (
                config.fixedTop.setting === true &&
                config.fixedTop.$elem !== '' &&
                locationHash !== ''
            ) {
                $target = $(locationHash);

                setTimeout(function () {
                    adjustScrollTop($target);
                }, 400);
            }
        });

        $win.on('popstate', function (event) {
            if (!event.originalEvent.state) {
                return;
            }

            scrollElem.scrollTop = event.originalEvent.state.scrollTop;
        });

        $ctrls.on('click', function (event) {
            var $linkElem = $(this);
            var href;
            var path;
            var param;
            var hashName;

            if ($linkElem.is('[href*="#"]')) {
                
                href = $linkElem.attr('href');
                path = href.split('#')[0];
                param = href.split('?')[0];
                hashName = href.split('#')[1];
                if($linkElem.attr('href').indexOf('?tab=') === -1){
                    event.preventDefault();
                }

                if (path === locationPathName || param === locationPathName || path === '') {
                    $target = hashName === config.pageTopHashName ? $body : $('#' + hashName);

                    history.pushState({
                        scrollTop: targetTop(hashName === '' ? $body : $('#' + hashName))
                    }, null, hashName === '' ? null : '#' + hashName);

                    if (
                        $target.length === 0 ||
                        $target.attr('aria-hidden') === 'true'
                    ) {
                        history.replaceState(null, null, '#' + hashName);

                        return;
                    }

                    setTimeout(function () {
                        $scrollElem.stop().animate({
                            scrollTop: targetTop($target)
                        }, config.effect.duration, config.effect.easing, function () {
                            history.replaceState({
                                scrollTop: targetTop($target)
                            }, null, '#' + hashName);
                            focusControl($target);

                            // フォーカスを移動した際に「フォーカスした要素の領域が表示領域を上回る場合」に位置がずれてしまうので調整
                            adjustScrollTop($target);
                        });
                    }, config.effect.delay);
                } else {
                    if ($linkElem.is('[target]')) {
                        win.open(href, $linkElem.attr('target'));
                    } else {
                        location.href = href;
                    }
                }
            }
        });
    };
}(window.jQuery, window, window.document));

(function ($) {
    'use strict';

    $(function () {
        var windowWidth = screen.width;
        var $changeModeButton = $('.js-change-display-button');
        var $modalButton = $('.js-modal-button');
        var $modalCloseButton = $('.js-modal-close-button');
        var $listDisplay =$('.list-display');
        var $pageHeader =$('#page-header');
        var metaNameViewport=$('meta[name="viewport"]');
        var mode;

        var RegAndroid = new RegExp('^.*Android (?!(1\\.|2\\.[01]))(?!.* SC-01C ).*Mobile.*Safari.*', '');
        var RegiPhone = new RegExp('^.*iPhone OS (?![0-3]_.*).*Safari.*', '');
        var RegiPad = new RegExp('iPad');

        if (RegAndroid.test(navigator.userAgent) === true || RegiPhone.test(navigator.userAgent) == true ) {

            var canUseSessionStorage = ('sessionStorage' in window) && window['sessionStorage'] !== null;
            if(!canUseSessionStorage){
                mode = 'sp';
            } else if(sessionStorage && sessionStorage.getItem("pc_flag")=="true") {
                mode = 'pc';
            } else {
                mode = 'sp';
            }
            if (mode === 'sp') {
                $listDisplay.css('display','block');
                $modalButton.addClass('js-none-opacity');
                $modalCloseButton.addClass('js-none-opacity');
                $changeModeButton.addClass('js-none-opacity');
            }
            if (mode === 'pc' || windowWidth > 767) {
                $modalButton.addClass('js-none-opacity');
                $modalCloseButton.addClass('js-none-opacity');
                $changeModeButton.addClass('js-none-opacity');
                $changeModeButton.css('display', 'block');
                $pageHeader.removeClass('fixed');
                metaNameViewport.attr('content', 'width=984, initial-scale=0.25');
            }

            $('.rwd_pc').on('click', function (event) {
                if (canUseSessionStorage && sessionStorage) {
                    sessionStorage.setItem("pc_flag","true");
                }
                location.href = $('input[name="pcSpScreenSwitchUrl"]').val();
                event.preventDefault();
            });
            $('.rwd_sp').on('click', function (event) {
                if (canUseSessionStorage && sessionStorage) {
                    sessionStorage.setItem("pc_flag","false");
                }
                location.href = $('input[name="pcSpScreenSwitchUrl"]').val();
                event.preventDefault();
            });
        } else if (RegiPad.test(navigator.userAgent)) {
            metaNameViewport.attr('content', 'width=device-width,initial-scale=0.75');
        }
    });
}(window.jQuery));


// =============== プラグイン本体 ===============

/*
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,n=function(t){return parseFloat(t)||0},a=function(e){var o=1,a=t(e),i=null,r=[];return a.each(function(){var e=t(this),a=e.offset().top-n(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(i-a))<=o?r[r.length-1]=s.add(e):r.push(e),i=a}),r},i=function(e){var o={
    byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=i(e);if(o.remove){var n=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="0.7.2",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
    r._afterUpdate=null,r._rows=a,r._parse=n,r._parseOptions=i,r._apply=function(e,o){var s=i(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
    "padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=a(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var a=t(o),i=0;if(s.target)i=s.target.outerHeight(!1);else{if(s.byRow&&a.length<=1)return void a.css(s.property,"");a.each(function(){var e=t(this),o=e.attr("style"),n=e.css("display");"inline-block"!==n&&"flex"!==n&&"inline-flex"!==n&&(n="block");var a={
    display:n};a[s.property]="",e.css(a),e.outerHeight(!1)>i&&(i=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}a.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=n(e.css("border-top-width"))+n(e.css("border-bottom-width")),o+=n(e.css("padding-top"))+n(e.css("padding-bottom"))),e.css(s.property,i-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),
    this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),n=o.attr("data-mh")||o.attr("data-match-height");n in e?e[n]=e[n].add(o):e[n]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(n,a){if(a&&"resize"===a.type){var i=t(window).width();if(i===e)return;e=i;
}n?o===-1&&(o=setTimeout(function(){s(a),o=-1},r._throttle)):s(a)},t(r._applyDataApi);var h=t.fn.on?"on":"bind";t(window)[h]("load",function(t){r._update(!1,t)}),t(window)[h]("resize orientationchange",function(t){r._update(!0,t)})});
