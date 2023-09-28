(function (win, doc, $, util) {
    'use strict';

    var FOCUS_ELEMS;
    var $win;
    var $doc;
    var html;
    var body;
    var $body;
    var scrollElem;
    var $scrollElem;
    var htmlLang;
    var isLangJa;
    var isOldWebkit;

    if (!$) {
        return;
    }

    FOCUS_ELEMS = 'a[href], area[href], [tabindex], button, input, select, textarea, iframe, object, audio, video, embed, summary';
    $win = $(win);
    $doc = $(doc);
    html = doc.documentElement;
    body = doc.body;
    $body = $(body);
    htmlLang = html.getAttribute('lang');
    isLangJa = htmlLang === 'ja';
    isOldWebkit = /WebKit/.test(util.UA) && !doc.scrollingElement;
    scrollElem = isOldWebkit ? body : doc.scrollingElement || /* IE */ html;
    $scrollElem = $(scrollElem);

    function getStorageItem(key) {
        try {
            return util.lStorage.getItem(key);
        } catch (e) {
            // 無効環境やプライベートブラウジング時
        }

        return null;
    }

    function setStorageItem(key, value) {
        try {
            util.lStorage.setItem(key, value);
        } catch (e) {
            // 無効環境やプライベートブラウジング時
        }
    }

    function createRandomName(length, prefix) {
        var STR = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var sLen = STR.length;
        var name = '';
        var len = parseInt(length, 10);
        var nIdx;

        if (isNaN(len) || len === 0) {
            len = 20; // length の値が不正な場合のデフォルト値
        }

        prefix = prefix ? prefix : '';

        while (name === '') {
            for (nIdx = 0; nIdx < len; nIdx++) {
                name += STR[Math.floor(Math.random() * sLen)];
            }

            if (doc.getElementById(prefix + name)) {
                name = '';
            }
        }

        return prefix + name;
    }

    function isDisabled($elem) {
        if (
            $elem.is('button') &&
            $elem.prop('disabled')
        ) {
            return true;
        } else if (
            $elem.is('a') &&
            (
                $elem.attr('aria-disabled') === 'true' ||
                !$elem.attr('href')
            )
        ) {
            return true;
        } else if (
            $elem.is('[role="button"]') &&
            $elem.attr('aria-disabled') === 'true'
        ) {
            return true;
        }

        return false;
    }

    function convCssTsTime(value) {
        if (value.lastIndexOf('ms') !== -1) {
            return parseFloat(value);
        } else if (value.lastIndexOf('s') !== -1) {
            return parseFloat(value) * 100;
        }

        return 0;
    }

    //
    // 機能実行
    //
    $(function () {
        // 文字サイズ切替機能
        $.fontSize('#font-size');

        // 文字サイズ監視機能
        $.fontSizeObserver('#main');

        // 開閉機能（ドロップダウン）
        $('#g-nav').toggleContent({
            className: {
                hdg: 'dropdown',
                ctrls: 'ctrls',
                state: 'state',
                cont: 'menu-list'
            },
            btnClose: {
                setting: true,
                className: {
                    wrap: 'btn-close-wrap',
                    btn: 'btn-close',
                    label: 'btn-close-label'
                },
                accName: isLangJa ? '\u9589\u3058\u308B' /* 閉じる */ : 'Close'
            },
            openOnlyOne: true
        });

        // 「ページの先頭へ」リンク追尾機能
        $.fixedPagetop('#foot-pagetop');

        // 補足エリア余白調整機能
        $('.lyt-exp').lytExpMarginFix();

        // イメージロールオーバー機能
        $('.js-tooltip-wrap-1, .bnr-list-1').imgRollOver({
            rollImgNameSuffix: {
                on: '_o',
                off: ''
            }
        });

        // スムーススクロール機能
        $('.skip-link a, #foot-pagetop a, .anc-list-1 a, .anc-list-2 a, .link-anc-1, .link-anc-2, .scroll-link a').smoothScroll();

        // ツールチップ機能
        $('.js-tooltip-wrap-1').tooltip();

        // 入力項目を追加
        $('.js-show-more').showMore();

        // 開閉機能（アコーディオン）
        $('.js-toggle-1').toggleContent({
            className: {
                hdg: 'js-t1-hdg',
                ctrls: 'js-t1-ctrls',
                state: 'js-t1-state',
                cont: 'js-t1-cont'
            }
        });

        // 開閉機能（アコーディオン）（内訳）
        $('.js-toggle-2').toggleContent({
            className: {
                hdg: 'js-t2-hdg',
                ctrls: 'js-t2-ctrls',
                state: 'js-t2-state',
                cont: 'js-t2-cont'
            }
        });

        // モーダルウィンドウ機能
        $('.js-modal-1').dialogBox({
            className: {
                cont: 'js-modal-cont',
                hdg: 'js-modal-hdg',
                btnColseWrap: 'js-modal-btn-close',
                btnColse: 'js-modal-btn-close-label',
                btnColseKey: 'js-modal-btn-close-key',
                status: 'js-modal-state'
            },
            dataName: {
                dialogLoad: 'modal-load'
            },
            modal: {
                setting: true,
                overlayClickClose: true,
                overlayIdName: 'modal-overlay'
            }
        });

        // aria-disabledを監視してtabindexを付与する機能
        $('a[href*="#"], [role="button"], [class*="btn-a-"] a, [class*="btn-b-"] a').ariaDisabledToTabindex();

        // ブラウザウィンドウを閉じるボタン
        $('.btn-b-1.ico-close-1').on('click', '.label', function (event) {
            var $btn = $(this);

            if (isDisabled($btn) || $btn.hasClass('js-modal-close-exc')) {
                return;
            }

            win.close();
            event.preventDefault();
        });

        // 高さ揃え（W_E0101「受給開始年齢」の比較一覧）
        $('.comp-list .head').matchHeight();
        $('.comp-list .row').matchHeight();
    });

    //
    // 機能本体（原則、このコメント以降の記述に対して変更を加えないようにして下さい）
    //

    // 文字サイズ切替機能
    $.fontSize = function (idName) {
        var DATA_PREFIX = 'data-';
        var $ui = $(idName);
        var $btn;
        var $alternateStylesheet;
        var config;
        var defaultFontSize;
        var ls;
        var lsKey;

        if ($ui.length <= 0) {
            return;
        }

        config = {
            stylesheetIdPrefix: 'stylesheet-font-', // スタイルシートのid属性値の接頭辞
            dataName: 'font-size', // 操作ボタンの付与する data-*属性の名前
            defaultDataVal: 'normal', // ロード時に表示するサイズの指定（data-*属性の値）
            localStorageKeyName: 'fontSize' // localStorageのキー font-size: "large"
        };

        $btn = $ui.find('button');
        $alternateStylesheet = $('link[id^=' + config.stylesheetIdPrefix + ']');
        lsKey = config.localStorageKeyName;
        ls = getStorageItem(lsKey) || null;
        defaultFontSize = ls ? ls : config.defaultDataVal;

        $btn.prop('disabled', false);
        $ui.find('[' + DATA_PREFIX + config.dataName + '="' + defaultFontSize + '"]').prop('disabled', true);
        $alternateStylesheet.prop('disabled', true);
        $('#' + config.stylesheetIdPrefix + defaultFontSize).prop('disabled', false);

        $ui.on('click', 'button', function () {
            var $root = $(this);
            var fontSize = $root.attr(DATA_PREFIX + config.dataName);

            $root.prop('disabled', true);
            $btn.not($root).prop('disabled', false);
            $alternateStylesheet.prop('disabled', true);
            $('#' + config.stylesheetIdPrefix + fontSize).prop('disabled', false);

            if (lsKey) {
                ls = fontSize;

                setStorageItem(lsKey, ls);
            }

            // 高さ揃え（jquery-match-height）を実行
            $.fn.matchHeight._update();
            $win.trigger('fontSizeChanged');
        });
    };


    // 文字サイズ監視機能
    $.fontSizeObserver = function (target) {
        var $target = $(target);
        var config;
        var fontSize;

        if ($target.length <= 0) {
            return;
        }

        config = {
            interval: 400
        };

        fontSize = $target.css('font-size');

        setInterval(function () {
            if (fontSize !== $target.css('font-size')) {
                // 高さ揃え（jquery-match-height）を実行
                $.fn.matchHeight._update();

                fontSize = $target.css('font-size');
            }
        }, config.interval);
    };


    // 「ページの先頭へ」リンク追尾機能
    $.fixedPagetop = function (idName) {
        var $pagetop = $(idName);
        var $container;
        var $btnPagetop;
        var $header;
        var config;
        var mql;
        var timer = false;

        if ($pagetop.length <= 0) {
            return;
        }

        config = {
            breakPoint: '', // 例： 'screen and (max-width: 767px)' や 'screen and (min-width: 768px)' など
            className: {
                container: 'container',
                follow: 'follow',
                fixed: 'fixed'
            },
            idName: {
                header: 'page-header'
            }
        };

        function isStaticMode() {
            if (config.breakPoint === '' || mql.matches) {
                return false;
            }

            return true;
        }

        function btnHeight() {
            return $btnPagetop.outerHeight();
        }

        function adjustPagetopHeight() {
            if (isStaticMode()) {
                $pagetop.css('height', '');

                return;
            }

            $pagetop.css('height', 'auto').css('height', btnHeight());
        }

        function showBtn() {
            $btnPagetop.removeAttr('tabindex aria-disabled');
            $container.css('will-change', 'transform').attr('aria-hidden', 'false');
        }

        function follow() {
            var winHeight;
            var scrollTop;
            var scrollBottom;
            var startLine;
            var endLine;

            if (isStaticMode()) {
                $container.css('will-change', 'auto').removeAttr('aria-hidden').removeClass(config.className.fixed);
                $btnPagetop.removeAttr('tabindex aria-disabled');

                return;
            }

            winHeight = win.innerHeight;
            scrollTop = scrollElem.scrollTop;
            scrollBottom = scrollTop + winHeight;
            startLine = $header.length <= 0 ? 1 : $header.height();
            endLine = $pagetop.offset().top + btnHeight();

            // 画面にスクロールが発生していない場合は何もしない
            if (winHeight > endLine) {
                return;
            }

            // Start
            if (
                scrollTop <= 0 ||
                (scrollTop < startLine && scrollBottom < endLine)
            ) {
                $container.css('will-change', 'opacity').attr('aria-hidden', 'true');
                $btnPagetop.prop('tabindex', -1).attr('aria-disabled', 'true');

                if (scrollTop > startLine) {
                    $container.removeClass(config.className.fixed);
                }

                return;
            }

            // Move
            if (scrollTop >= startLine && scrollBottom < endLine) {
                showBtn();
                $container.removeClass(config.className.fixed);
            }

            // End
            if (scrollBottom >= endLine) {
                showBtn();
                $container.addClass(config.className.fixed);
            }
        }

        $pagetop.wrapInner(
            $('<span>', {
                class: config.className.container
            })
        );

        $container = $pagetop.find('.' + config.className.container);
        $btnPagetop = $pagetop.find('a');
        $header = $('#' + config.idName.header);

        if (config.breakPoint !== '') {
            mql = win.matchMedia(config.breakPoint);

            mql.addListener(follow);
        }

        adjustPagetopHeight();
        follow();

        $win.on({
            resize: function () {
                if (timer !== false) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    adjustPagetopHeight();
                    follow();
                }, 150);
            },
            scroll: function () {
                if (timer !== false) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    follow();
                }, 15);
            }
        });
    };

    // 補足エリア余白調整機能
    $.fn.lytExpMarginFix = function (options) {
        var config;

        if (this.length <= 0) {
            return this;
        }

        config = $.extend({
            className: {
                txt: 'txt',
                exp: 'exp'
            }
        }, options);

        return this.each(function () {
            var $lytExp = $(this);
            var $txt = $lytExp.find('.' + config.className.txt);
            var $firstChild = $txt.find('> :first-child');
            var $lastChild = $txt.find('> :last-child');
            var txtMarginTop = $firstChild.css('margin-top');
            var txtMarginBottom = $lastChild.css('margin-bottom');

            if (txtMarginTop !== '0px') {
                $lytExp.css('margin-top', txtMarginTop);
                $firstChild.css('margin-top', 0);
            }

            if (txtMarginBottom !== '0px') {
                $lytExp.css('margin-bottom', txtMarginBottom);
                $lastChild.css('margin-bottom', 0);
            }
        });
    };

    // イメージロールオーバー機能
    $.fn.imgRollOver = function (options) {
        var config;
        var ROOT_ELEMS;

        if (this.length <= 0) {
            return this;
        }

        config = $.extend({
            rollImgNameSuffix: {
                on: '-on', // img要素を使用する場合のファイル名の（拡張子前の）接尾辞（有効時）
                off: '-off' // img要素を使用する場合のファイル名の（拡張子前の）接尾辞（無効時）
            }
        }, options);

        ROOT_ELEMS = 'a[href], [tabindex], button';

        function changeImgs($target, beforeSuffix, afterSuffix) {
            var regExpImg;
            var src;
            var srcMatchRegExpImg;

            if ($target.length <= 0) {
                return;
            }

            regExpImg = new RegExp('^(.+)(' + beforeSuffix + ')(\\.[a-zA-Z]+)$');
            src = $target.attr('src');
            srcMatchRegExpImg = src.match(regExpImg);

            if (srcMatchRegExpImg) {
                $target.attr('src', src.replace(regExpImg, srcMatchRegExpImg[1] + afterSuffix + srcMatchRegExpImg[3]));
            }
        }

        return this.each(function () {
            var $imgRollOver = $(this);

            $imgRollOver.on({
                mouseenter: function () {
                    var $root = $(this);

                    if (!$root.parents(ROOT_ELEMS).is(doc.activeElement)) {
                        changeImgs($root, config.rollImgNameSuffix.off, config.rollImgNameSuffix.on);
                    }
                },
                mouseleave: function () {
                    var $root = $(this);

                    if (!$root.parents(ROOT_ELEMS).is(doc.activeElement)) {
                        changeImgs($root, config.rollImgNameSuffix.on, config.rollImgNameSuffix.off);
                    }
                }
            }, 'img');

            $imgRollOver.on({
                focus: function () {
                    var $root = $(this).find('img');
                    var testSrc = new RegExp(config.rollImgNameSuffix.on);

                    if (!testSrc.test($root.attr('src'))) {
                        changeImgs($root, config.rollImgNameSuffix.off, config.rollImgNameSuffix.on);
                    }
                },
                blur: function () {
                    changeImgs($(this).find('img'), config.rollImgNameSuffix.on, config.rollImgNameSuffix.off);
                }
            }, ROOT_ELEMS);
        });
    };

    // ツールチップ機能
    $.fn.tooltip = function (options) {
        var $wrapper;
        var $tooltip;
        var $eachTooltip;
        var $execCtrls;
        var config;
        var idName;
        var isRun;
        var timer;
        var len;
        var idx;
        var $currentDisplayedTooltip;

        if (this.length <= 0) {
            return this;
        }

        config = $.extend({
            accName: isLangJa ? {
                close: '\u9589\u3058\u308B' // 閉じる
            } : {
                close: 'Close'
            },
            className: {
                tooltip: 'js-tooltip',
                btnClose: 'js-btn-close',
                btnCloseLabel: 'js-btn-close-label',
                ctrls: 'js-tooltip-ctrls',
                ctrlsHover: 'js-tooltip-ctrls-hover'
            },
            displayArea: '#main .main-inner', // ツールチップを表示する範囲（横幅）
            resize: {
                setting: false, // true にするとウィンドウの変化の度にツールチップのサイズを調整します（リキッドレイアウトやスマートフォン対応）
                timelag: 100 // 時間差
            }
        }, options);

        function open($openCtrls, $openCont) {
            if (isRun) {
                return;
            }

            isRun = true;
            $(html).attr('data-active-event', 'tooltip');

            $openCtrls.attr('aria-expanded', 'true');
            $openCont.attr('aria-expanded', 'true');

            setTimeout(function () {
                isRun = false;
            }, 300);
        }

        function closeLastProc($closeCtrls, $closeCont) {
            $closeCont.attr('aria-hidden', 'true').removeAttr('style');

            if (config.resize.setting.toString() === 'true') {
                $win.off('resize.adjustTooltip');
            }

            isRun = false;
        }

        function close($closeCtrls, $closeCont) {
            if (isRun) {
                return;
            }

            isRun = true;

            $closeCont.attr('aria-expanded', 'false');
            $closeCtrls.attr('aria-expanded', 'false');

            if (isOldWebkit) {
                $closeCont.css('transition-duration', '0s');
            }

            $currentDisplayedTooltip = null;

            if ($closeCont.css('transition-duration') === ('0s' || '0ms')) {
                closeLastProc($closeCtrls, $closeCont);
            } else {
                $closeCont.one('transitionend', function () {
                    closeLastProc($closeCtrls, $closeCont);
                });
            }
        }

        function tooltipSize($targetTooltip) {
            $targetTooltip.css({
                minWidth: ''
            }).css({
                minWidth: $targetTooltip.find('.inner')[0].scrollWidth + parseInt($targetTooltip.css('padding-left'), 10) + parseInt($targetTooltip.css('padding-right'), 10) + 1 // 取得した幅の値が実寸より小数部分小さくなるため1足して余裕をもたせる
            });
        }

        function tooltipPositionLeft($targetTooltip, $targetCtrls, $displayArea) {
            var tooltipWidth = $targetTooltip[0].scrollWidth;
            var displayAreaWidth = $displayArea.outerWidth();
            var posX = ($targetCtrls.position().left + ($targetCtrls.width() / 2)) - (tooltipWidth / 2);
            var tOffsetL;
            var tOffsetR;
            var aOffsetL;
            var aOffsetR;

            // 補足エリアがある場合の処理（補足エリア分の幅を減らす）
            if ($('#main').hasClass('exp')) {
                displayAreaWidth -= ($('.lyt-exp').find('.exp').outerWidth() + 16); // 16は「本文」と「補足エリア」の間のスペース
            }

            $targetTooltip.css('left', posX);

            tOffsetL = $targetTooltip.offset().left;
            tOffsetR = tOffsetL + tooltipWidth;
            aOffsetL = $displayArea.offset().left;
            aOffsetR = aOffsetL + displayAreaWidth;

            if (tOffsetL < aOffsetL) {
                return posX + aOffsetL - tOffsetL;
            } else if (tOffsetR > aOffsetR) {
                return posX - (tOffsetR - aOffsetR);
            }

            return posX;
        }

        $wrapper = this;
        $tooltip = $wrapper.find('.' + config.className.tooltip);
        len = $tooltip.length;
        isRun = false;
        timer = false;

        $tooltip.attr({
            'aria-expanded': 'false',
            'aria-hidden': 'true',
            role: 'tooltip'
        }).prop('tabindex', -1);

        $('<button>', {
            'aria-expanded': 'true',
            type: 'button',
            class: config.className.btnClose
        }).appendTo($tooltip);

        $('<span>', {
            class: config.className.btnCloseLabel,
            text: config.accName.close
        }).appendTo($tooltip.find('.' + config.className.btnClose));

        for (idx = 0; idx < len; idx++) {
            $eachTooltip = $tooltip.eq(idx);
            idName = $eachTooltip.attr('id');

            $('[href="#' + idName + '"][label!="hover"]').attr({
                'aria-controls': idName,
                'aria-expanded': 'false',
                class: config.className.ctrls
            });
            $('[href="#' + idName + '"][label="hover"]').attr({
                'aria-controls': idName,
                'aria-expanded': 'false',
                class: config.className.ctrlsHover
            });
            $eachTooltip.find('.' + config.className.btnClose).attr('aria-controls', idName);
        }

        $('.' + config.className.ctrls).on('click', function (event) {
            var $ctrls = $(this);
            var ctrlsName = $ctrls.attr('aria-controls');
            var $target = $('#' + ctrlsName);
            var $execTooltip;
            var execCtrlsName;

            event.preventDefault();

            if (isRun) {
                return;
            }

            $currentDisplayedTooltip = $target;

            if ($target.attr('aria-expanded') === 'true') {
                close($ctrls, $target);
            } else {
                if ($execCtrls !== undefined) {
                    execCtrlsName = $execCtrls.attr('aria-controls');

                    if (!execCtrlsName || execCtrlsName !== ctrlsName) {
                        $execTooltip = $('#' + execCtrlsName);

                        $execCtrls.attr('aria-expanded', 'false');
                        $execTooltip.attr('aria-expanded', 'false');
                        setTimeout(function () {
                            $execTooltip.attr('aria-hidden', 'true').removeAttr('style');
                        }, 50);
                    }
                }

                $target.removeAttr('aria-hidden');
                tooltipSize($target);
                $target.css('left', tooltipPositionLeft($target, $ctrls, $(config.displayArea)));
                setTimeout(function () {
                    open($ctrls, $target);
                }, 100);

                if (config.resize.setting.toString() === 'true') {
                    $win.on('resize.adjustTooltip', function () {
                        if (timer !== false) {
                            clearTimeout(timer);
                        }

                        timer = setTimeout(function () {
                            tooltipSize($target);
                            setTimeout(function () {
                                $target.css('left', tooltipPositionLeft($target, $ctrls, $(config.displayArea)));
                            }, 100);
                        }, config.resize.timelag);
                    });
                }

                $target.focus();

                $execCtrls = $ctrls;
            }
        });

        $('.' + config.className.ctrlsHover).hover(
            function (event) {
                var $ctrls = $(this);
                var ctrlsName = $ctrls.attr('aria-controls');
                var $target = $('#' + ctrlsName);
                var $execTooltip;
                var execCtrlsName;

                event.preventDefault();

                $currentDisplayedTooltip = $target;

                if ($target.attr('aria-expanded') !== 'true') {
                    if ($execCtrls !== undefined) {
                        execCtrlsName = $execCtrls.attr('aria-controls');

                        if (!execCtrlsName || execCtrlsName !== ctrlsName) {
                            $execTooltip = $('#' + execCtrlsName);

                            $execCtrls.attr('aria-expanded', 'false');
                            $execTooltip.attr('aria-expanded', 'false');
                            setTimeout(function () {
                                $execTooltip.attr('aria-hidden', 'true').removeAttr('style');
                            }, 50);
                        }
                    }

                    $target.removeAttr('aria-hidden');
                    tooltipSize($target);
                    $target.css('left', tooltipPositionLeft($target, $ctrls, $(config.displayArea)));
                    
                    $(html).attr('data-active-event', 'tooltip');

                    $ctrls.attr('aria-expanded', 'true');
                    $target.attr('aria-expanded', 'true');

                    if (config.resize.setting.toString() === 'true') {
                        $win.on('resize.adjustTooltip', function () {
                            if (timer !== false) {
                                clearTimeout(timer);
                            }

                            timer = setTimeout(function () {
                                tooltipSize($target);
                                setTimeout(function () {
                                    $target.css('left', tooltipPositionLeft($target, $ctrls, $(config.displayArea)));
                                }, 100);
                            }, config.resize.timelag);
                        });
                    }

                    $target.focus();

                    $execCtrls = $ctrls;
                }
            },
            function (event) {
                var $ctrls = $(this);
                var ctrlsName = $ctrls.attr('aria-controls');
                var $target = $('#' + ctrlsName);

                event.preventDefault();

                $currentDisplayedTooltip = $target;

                $target.attr('aria-expanded', 'false');
                $ctrls.attr('aria-expanded', 'false');

                if (isOldWebkit) {
                    $target.css('transition-duration', '0s');
                }

                $currentDisplayedTooltip = null;

                if ($target.css('transition-duration') === ('0s' || '0ms')) {
                    $target.attr('aria-hidden', 'true').removeAttr('style');
                    if (config.resize.setting.toString() === 'true') {
                        $win.off('resize.adjustTooltip');
                    }

                } else {
                    $target.attr('aria-hidden', 'true').removeAttr('style');
                    if (config.resize.setting.toString() === 'true') {
                        $win.off('resize.adjustTooltip');
                    }
                }
            }
        );

        $tooltip.on('keydown', function (event) {
            var $event = $(event.target);
            var $eventParents = $event.parents('[role="tooltip"]');
            var isTabKey = event.key === 'Tab' || event.keyCode === 9;

            if (event.shiftKey) {
                if (
                    isTabKey &&
                    $event.is('[role="tooltip"]')
                ) {
                    close($('[aria-controls="' + $event.attr('id') + '"]'), $event);
                    $execCtrls.focus();
                    event.preventDefault();
                } else if (
                    isTabKey &&
                    $event.is($eventParents.find(FOCUS_ELEMS).first())
                ) {
                    close($('[aria-controls="' + $eventParents.attr('id') + '"]'), $eventParents);
                    $execCtrls.focus();
                    event.preventDefault();
                }
            } else if (
                !event.ctrlKey &&
                !event.altKey &&
                !event.shiftKey
            ) {
                if (
                    isTabKey &&
                    $event.is($eventParents.find(FOCUS_ELEMS).last())
                ) {
                    close($('[aria-controls="' + $eventParents.attr('id') + '"]'), $eventParents);
                    $execCtrls.focus();
                    event.preventDefault();
                }
            }
        }).on('click', '.' + config.className.btnClose, function () {
            var $root = $(this);

            close($('[aria-controls="' + $root.attr('aria-controls') + '"]'), $root.parents('[role="tooltip"]'));
            $execCtrls.focus();
        });

        // 文字サイズが変更されたらツールチップのサイズを再計算する
        $win.on('fontSizeChanged', function () {
            if ($currentDisplayedTooltip) {
                tooltipSize($currentDisplayedTooltip);
            }
        });

        return $wrapper;
    };

    // 入力項目を追加
    $.fn.showMore = function (options) {
        var config;

        if (this.length <= 0) {
            return this;
        }

        config = $.extend({
            className: {
                btnShow: 'js-btn-show', // 非表示内容を表示するためのボタンに付与しておくclass名
                hiddenElem: 'js-hidden' // 非表示したい内容に付与しておくclass名
            },
            btnShow: {
                classList: {
                    btnWrap: 'btn-b-3 ico-add-1 align-r', // スタイリングのために.js-btn-showと同じ要素に付与するclass名
                    innerLabel: 'label' // button要素に付与するclass名
                },
                accName: isLangJa ? '\u5165\u529b\u9805\u76ee\u3092\u8ffd\u52a0' /* 入力項目を追加 */ : 'Show' // ボタンのラベル
            }
        }, options);

        return this.each(function () {
            var $self = $(this);
            var $btnShow = $self.find('.' + config.className.btnShow);
            var $hiddenElem = $self.find('.' + config.className.hiddenElem);

            if ($btnShow.length <= 0) {
                $('<p>', {
                    class: config.btnShow.classList.btnWrap + ' ' + config.className.btnShow
                }).appendTo($self);

                $btnShow = $self.find('.' + config.className.btnShow);

                $('<button>', {
                    type: 'button',
                    class: config.btnShow.classList.innerLabel,
                    text: config.btnShow.accName
                }).appendTo($btnShow);
            }

            if ($hiddenElem.length >= 1) {
                $btnShow.find('.' + config.btnShow.classList.innerLabel).prop('disabled', false);
            }

            $btnShow.on('click', '.' + config.btnShow.classList.innerLabel, function () {
                var $firstHiddenElem;

                $hiddenElem = $self.find('.' + config.className.hiddenElem);

                if ($hiddenElem.length <= 1) {
                    $(this).prop('disabled', true);
                }

                $firstHiddenElem = $hiddenElem.eq(0);

                if (!$firstHiddenElem.is('[tabindex]')) {
                    $firstHiddenElem.prop('tabindex', -1);
                    $firstHiddenElem.one('blur', function () {
                        $firstHiddenElem.removeAttr('tabindex');
                    });
                }

                $firstHiddenElem.removeClass(config.className.hiddenElem).focus();
            });
        });
    };

    // 開閉機能
    $.fn.toggleContent = function (options) {
        var config;

        if (this.length <= 0) {
            return this;
        }

        config = $.extend({
            className: {
                hdg: 'heading', // 見出しにあたる要素のclass名
                ctrls: 'controls', // トグルボタンのclass名
                state: 'state', // トグルボタンの状態を示すspan要素のclass名
                cont: 'content' // 開閉部分にあたる要素のclass名
            },
            accName: isLangJa ? {
                open: '\u958b\u3051\u308b', // 開ける
                close: '\u9589\u3058\u308B' // 閉じる
            } : {
                open: 'Open',
                close: 'Close'
            },
            btnClose: {
                setting: false, // true で末尾に「閉じる」ボタンを追加
                className: {
                    wrap: 'btn-close-wrap', // 末尾に「閉じる」ボタンを追加する場合のp要素のclass名
                    btn: 'btn-close', // 末尾に「閉じる」ボタンを追加する場合のbutton要素のclass名
                    label: 'btn-close-label' // 末尾に「閉じる」ボタンを追加する場合のラベルとなるspan要素のclass名
                },
                accName: isLangJa ? '\u9589\u3058\u308B' /* 閉じる */ : 'Close'
            },
            openStateAtStartClassName: 'is-open',
            openOnlyOne: false, // true で複数連結の場合に一箇所のみを開くことが可能になります
            randomName: { // config.className.contにid属性が付与されていない場合に発行されるid名の設定
                prefix: 'toggle-', // id属性の接頭辞（値が空の場合は接頭辞なしになります）
                length: 5 // 接頭辞を抜きにした文字列の数
            },
            breakPoint: '' // 例： 'screen and (max-width: 767px)' や 'screen and (min-width: 768px)' など
        }, options);

        return this.each(function () {
            var $toggle = $(this);
            var $hdg = $toggle.find('.' + config.className.hdg);
            var $ctrls = $hdg.find('.' + config.className.ctrls);
            var $cont = $toggle.find('.' + config.className.cont);
            var $btnClose;
            var $targetCtrls;
            var $targetCont;
            var $eachHdg;
            var $eachCtrls;
            var $eachState;
            var $eachCont;
            var $eachBtnClose;
            var len = $hdg.length;
            var mql;
            var isRun = false;
            var hashName;
            var idName;
            var randomName;
            var status = {};
            var idx;

            function isStaticMode() {
                if (config.breakPoint === '' || mql.matches) {
                    return false;
                }

                return true;
            }

            function recordStatus($elem) {
                var elemIdName = $elem.attr('id');
                var elemAttrAriaHidden = $elem.attr('aria-hidden');

                if ($eachCont.hasClass(config.openStateAtStartClassName)) {
                    elemAttrAriaHidden = 'false';

                    $eachCont.removeClass(config.openStateAtStartClassName);
                }

                status['"' + elemIdName + '"'] = elemAttrAriaHidden ? elemAttrAriaHidden : 'true';
            }

            function lastProc($elem, ariaAttr) {
                // 高さ揃え（jquery-match-height）を実行
                $.fn.matchHeight._update();

                if (isOldWebkit) {
                    $elem.css('transition-duration', '0s');
                }

                if ($elem.css('transition-duration') === ('0s' || '0ms')) {
                    $elem.attr(ariaAttr, 'true');

                    if (ariaAttr === 'aria-expanded') {
                        $elem.css('height', 'auto');
                    }

                    recordStatus($elem);

                    isRun = false;
                } else {
                    $elem.one('transitionend', function () {
                        $elem.attr(ariaAttr, 'true');

                        if (ariaAttr === 'aria-expanded') {
                            $elem.css('height', 'auto');
                        }

                        recordStatus($elem);

                        isRun = false;
                    });
                }
            }

            function closeAllOther(originIdName) {
                for (idx = 0; idx < len; idx++) {
                    $eachCtrls = $ctrls.eq(idx);
                    $eachCont = $cont.eq(idx);

                    if ($eachCtrls.attr('aria-controls') !== originIdName) {
                        $eachCtrls.attr('aria-expanded', 'false');
                        $eachCtrls.find('.' + config.className.state).text(config.accName.open);
                    }

                    if ($eachCont.attr('id') !== originIdName) {
                        $eachCont.css('height', $eachCont[0].scrollHeight).attr('aria-expanded', 'false').css('height', 0).attr('aria-hidden', 'true');
                        recordStatus($eachCont);
                    }
                }
            }

            function open($openCtrls, $openCont) {
                if (isRun || isDisabled($openCtrls)) {
                    return;
                }

                isRun = true;

                $openCtrls.find('.' + config.className.state).text(config.accName.close);
                $openCtrls.attr('aria-expanded', 'true');
                $openCont.removeAttr('aria-hidden').css('height', $openCont[0].scrollHeight);
                lastProc($openCont, 'aria-expanded');
            }

            function close($closeCtrls, $closeCont) {
                if (isRun || isDisabled($closeCtrls)) {
                    return;
                }

                isRun = true;

                $closeCtrls.attr('aria-expanded', 'false');
                $closeCtrls.find('.' + config.className.state).text(config.accName.open);
                $closeCont.css('height', $closeCont[0].scrollHeight); // CSSOMに一度アクセス
                $closeCont.css('height', $closeCont[0].scrollHeight).attr('aria-expanded', 'false').css('height', 0);
                lastProc($closeCont, 'aria-hidden');
            }

            function toggle(event) {
                var $eventCurrentTarget;
                var isEnterKey;
                var isSpaceKey;

                if (isStaticMode()) {
                    return;
                }

                $eventCurrentTarget = $(event.currentTarget);
                isEnterKey = event.key === 'Enter' || event.keyCode === 13;
                isSpaceKey = event.key === ' ' || /* IE */ event.key === 'Spacebar' || event.keyCode === 32;

                if (
                    event.type === 'click' ||
                    (
                        (isEnterKey || isSpaceKey) &&
                        $eventCurrentTarget.is('[role="button"]')
                    )
                ) {
                    event.preventDefault();

                    idName = $eventCurrentTarget.attr('aria-controls');

                    if ($eventCurrentTarget.attr('aria-expanded') === 'true') {
                        close($('[aria-controls="' + idName + '"].' + config.className.ctrls), $('#' + idName));
                    } else {
                        if (config.openOnlyOne.toString() === 'true') {
                            closeAllOther(idName);
                        }

                        open($('[aria-controls="' + idName + '"].' + config.className.ctrls), $('#' + idName));
                    }
                }
            }

            function modeChange() {
                var isOpen;

                for (idx = 0; idx < len; idx++) {
                    $eachCtrls = $ctrls.eq(idx);
                    $eachState = $eachCtrls.find('.' + config.className.state);
                    $eachCont = $cont.eq(idx);
                    isOpen = status['"' + $eachCont.attr('id') + '"'] !== 'true';

                    if (isStaticMode()) {
                        $eachCtrls.removeAttr('aria-expanded');
                        $eachState.attr('aria-hidden', 'true');
                        $eachCont.removeAttr('aria-expanded aria-hidden').css('height', '');

                        if ($eachCont.is('div')) {
                            $eachCont.removeAttr('role');
                        }

                        if ($eachCtrls.is('span')) {
                            $eachCtrls.removeAttr('role tabindex');
                        }

                        // 末尾に「閉じる」ボタンを追加する場合の設定
                        if (config.btnClose.setting) {
                            $btnClose.attr('aria-hidden', 'true');
                        }
                    } else {
                        $eachCtrls.attr('aria-expanded', isOpen ? 'true' : 'false');
                        $eachState.removeAttr('aria-hidden').text(config.accName[isOpen ? 'close' : 'open']);

                        if (isOpen) {
                            $eachCont.removeAttr('aria-hidden').attr('aria-expanded', 'true').css('height', 'auto');
                        } else {
                            $eachCont.attr({
                                'aria-expanded': 'false',
                                'aria-hidden': 'true'
                            }).css('height', 0);
                        }

                        if ($eachCont.is('div')) {
                            $eachCont.attr('role', 'group');
                        }

                        if ($eachCtrls.is('span')) {
                            $eachCtrls.attr('role', 'button').prop('tabindex', 0);
                        }

                        // 末尾に「閉じる」ボタンを追加する場合の設定
                        if (config.btnClose.setting) {
                            $btnClose.removeAttr('aria-hidden');
                        }
                    }
                }
            }

            // 「切り替えボタン」化
            for (idx = 0; idx < len; idx++) {
                $eachHdg = $hdg.eq(idx);
                $eachCtrls = $ctrls.eq(idx);

                // 「切り替えボタン」が見つからない場合に「切り替えボタン」を追加
                if ($eachCtrls.length <= 0) {
                    if (config.breakPoint === '') {
                        $eachHdg.wrapInner(
                            $('<button>', {
                                type: 'button',
                                class: config.className.ctrls
                            })
                        );
                    } else {
                        $eachHdg.wrapInner(
                            $('<span>', {
                                class: config.className.ctrls
                            })
                        );
                    }
                }

                // 「切り替えボタン」に「開閉状況」を追加
                $('<span>', {
                    class: config.className.state
                }).appendTo($eachHdg.find('.' + config.className.ctrls));
            }

            // 「閉じる」ボタンが有効な場合の設定
            if (config.btnClose.setting) {
                $('<p>', {
                    class: config.btnClose.className.wrap
                }).appendTo($cont);

                $('<button>', {
                    'aria-expanded': 'true',
                    type: 'button',
                    class: config.btnClose.className.btn
                }).appendTo($cont.find('.' + config.btnClose.className.wrap));

                $('<span>', {
                    class: config.btnClose.className.label,
                    text: config.btnClose.accName
                }).appendTo($cont.find('.' + config.btnClose.className.btn));

                $btnClose = $cont.find('.' + config.btnClose.className.wrap);

                $btnClose.on('click', '.' + config.btnClose.className.btn, function (event) {
                    var closeName = event.currentTarget.getAttribute('aria-controls');

                    $targetCtrls = $('[aria-controls="' + closeName + '"].' + config.className.ctrls);

                    close($targetCtrls, $('#' + closeName));
                    $targetCtrls[0].scrollIntoView();
                    $targetCtrls.focus();
                });
            }

            $ctrls = $hdg.find('.' + config.className.ctrls);

            // id属性とaria-controls属性の関連付け
            for (idx = 0; idx < len; idx++) {
                $eachCtrls = $hdg.eq(idx).find('.' + config.className.ctrls);
                $eachCont = $cont.eq(idx);
                $eachBtnClose = $eachCont.find('.' + config.btnClose.className.btn);

                idName = $eachCont.attr('id');

                if (idName) {
                    $eachCtrls.attr('aria-controls', idName);

                    // 末尾に「閉じる」ボタンを追加する場合の設定
                    if (config.btnClose.setting) {
                        $eachBtnClose.attr('aria-controls', idName);
                    }
                } else {
                    randomName = createRandomName(config.randomName.length, config.randomName.prefix);

                    $eachCont.attr('id', randomName);
                    $eachCtrls.attr('aria-controls', randomName);

                    // 末尾に「閉じる」ボタンを追加する場合の設定
                    if (config.btnClose.setting) {
                        $eachBtnClose.attr('aria-controls', randomName);
                    }
                }

                recordStatus($eachCont);
            }

            if (config.breakPoint !== '') {
                mql = win.matchMedia(config.breakPoint);
            }

            if (util.locHash !== '' && !isStaticMode()) {
                hashName = util.locHash.split('#')[1];

                for (idx = 0; idx < len; idx++) {
                    $eachCtrls = $hdg.eq(idx).find('.' + config.className.ctrls);
                    $eachCont = $cont.eq(idx);

                    if ($eachCont.attr('id') === hashName) {
                        $eachCont.removeAttr('aria-hidden');
                        recordStatus($eachCont);
                        $eachCtrls[0].scrollIntoView();
                        $eachCtrls.focus();
                    }
                }
            }

            if (config.breakPoint !== '') {
                mql.addListener(modeChange);
            }

            modeChange();

            $hdg.on({
                click: toggle,
                keydown: toggle
            }, '.' + config.className.ctrls);

            $doc.on('click', '[href*="#"]', function (event) {
                var $targetElem;

                if (isStaticMode()) {
                    return;
                }

                hashName = event.currentTarget.href.split('#')[1];
                $targetElem = $(doc.getElementById(hashName));

                if ($targetElem.length <= 0) {
                    return;
                }

                if (event.target.pathname === util.locPathName) {
                    if (
                        $targetElem.attr('id') === hashName &&
                        $targetElem.hasClass(config.className.hdg)
                    ) {
                        $targetCont = $('#' + $targetCtrls.attr('aria-controls'));

                        if ($targetCont.attr('aria-hidden') !== 'true') {
                            return;
                        }

                        $targetCtrls = $targetElem.find('.' + config.className.ctrls);

                        open($targetCtrls, $targetCont);
                    } else if (
                        $targetElem.attr('id') === hashName &&
                        $targetElem.hasClass(config.className.cont)
                    ) {
                        $targetCont = $targetElem;

                        if ($targetCont.attr('aria-hidden') !== 'true') {
                            return;
                        }

                        $targetCtrls = $('[aria-controls="' + $targetCont.attr('id') + '"].' + config.className.ctrls);

                        open($targetCtrls, $targetCont);
                    } else if ($targetElem.parents().hasClass(config.className.cont)) {
                        $targetCont = $('#' + hashName).parents('.' + config.className.cont);

                        if ($targetCont.attr('aria-hidden') !== 'true') {
                            return;
                        }

                        $targetCtrls = $('[aria-controls="' + $targetCont.attr('id') + '"].' + config.className.ctrls);

                        open($targetCtrls, $targetCont);
                    }
                }
            });
        });
    };

    // スムーススクロール機能
    $.fn.smoothScroll = function (options) {
        var $ctrls;
        var $target;
        var config;
        var mqlMatches;

        if (this.length <= 0) {
            return this;
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
            pageTopHashName: 'top', // ページの最上部に戻るの値（'top' はHTML5の仕様に従ったデフォルト値）
            adjust: -10
        }, options);

        $ctrls = $(this);
        mqlMatches = config.fixedTop.breakPoint === '' ? true : win.matchMedia(config.fixedTop.breakPoint).matches;

        function fixedTopElemHeight() {
            if (
                config.fixedTop.setting.toString() === 'true' &&
                config.fixedTop.$elem !== '' &&
                mqlMatches
            ) {
                return $(config.fixedTop.$elem).outerHeight();
            }

            return 0;
        }

        function targetTop($elem) {
            return $elem.length <= 0 ? 0 : $elem.offset().top - fixedTopElemHeight() + config.adjust;
        }

        function adjustScrollTop($elem) {
            scrollElem.scrollTop = targetTop($elem);
        }

        function focusControl($elem) {
            if ($elem.is('[tabindex]')) {
                $elem.focus();

                return;
            }

            $elem.prop('tabindex', 0).focus();
            $elem.one('blur', function () {
                $elem.removeAttr('tabindex');
            });
        }

        if (
            config.fixedTop.setting.toString() === 'true' &&
            config.fixedTop.$elem !== '' &&
            util.locHash !== ''
        ) {
            $target = util.locHash === '#' + config.pageTopHashName ? $body : $(util.locHash);

            if ($target.length) {
                setTimeout(function () {
                    adjustScrollTop($target);
                    focusControl($target);
                }, 400);
            }
        }

        $win.on('popstate', function (event) {
            var $focusTarget;

            if (!event.originalEvent.state) {
                return;
            }

            scrollElem.scrollTop = event.originalEvent.state.scrollTop;
            util.locHash = win.location.hash;
            $focusTarget = util.locHash === '#' + config.pageTopHashName ? $body : $(util.locHash);

            if ($focusTarget.length <= 0) {
                return;
            }

            focusControl($focusTarget);
        });

        $ctrls.on('click', function (event) {
            var $linkElem = $(this);
            var href;
            var path;
            var hashName;

            if ($linkElem.is('[href*="#"]')) {
                event.preventDefault();

                href = $linkElem.attr('href');
                path = href.split('#')[0];
                hashName = href.split('#')[1];

                if (path === util.locPathName || path === '') {
                    $target = hashName === config.pageTopHashName ? $body : $('#' + hashName);

                    history.pushState({
                        scrollTop: targetTop(util.locHash === '' ? $body : $(util.locHash))
                    }, null, util.locHash === '' ? null : util.locHash);

                    if ($target.length <= 0 || $target.attr('aria-hidden') === 'true') {
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
                        win.location.href = href;
                    }
                }
            }
        });

        return $ctrls;
    };

    // モーダルウィンドウ機能
    $.fn.dialogBox = function (options) {
        var config;
        var loadDialogName;
        var isDialogOpen;
        var timer;

        if (this.length <= 0) {
            return this;
        }

        config = $.extend({
            accName: isLangJa ? {
                close: '\u9589\u3058\u308B', // 閉じる
                closeKey: 'Esc'
            } : {
                close: 'Close',
                closeKey: 'Esc'
            },
            className: {
                cont: 'dialog-content', // ダイアログの本体となる要素のclass名
                hdg: 'dialog-heading', // 見出しの読み上げの拡張を目的とした要素のclass名
                btnColseWrap: 'dialog-btn-close', // 「閉じる」ボタンの外装となる要素のclass名
                btnColse: 'dialog-btn-close-label', // 「閉じる」ボタンのbuttom要素のclass名
                btnColseKey: 'dialog-btn-close-key', // Escキーで操作する場合に「閉じる」ボタンに追記するラベルとなる要素のclass名
                status: 'dialog-status' // ダイアログの状態を示す要素のclass名
            },
            dataName: {
                dialogLoad: 'dialog-load' // ロード時に表示したいダイアログの id名を body要素に設定するための data-*属性
            },
            idName: {
                suffix: {
                    hdg: '-hdg'
                }
            },
            closeEscKey: true, // キーボードの「Esc」キーでの「閉じる」操作の設定。設定しない場合は false を指定
            role: {
                dialog: true // root となる要素に role="dialog" を設定。設定しない場合は false を指定
            },
            modal: {
                setting: false, // true の場合、role="dialog" aria-modal="true" を付与し、オーバーレイの設置とフォーカスを制限する
                overlayClickClose: true, // オーバーレイをクリックしてダイアログを「閉じる」ことを可能にする設定。設定しない場合は false を指定
                overlayIdName: 'dialog-overlay' // 必ずオーバーレイに任意の名前が必要
            }
        }, options);

        loadDialogName = $body.attr('data-' + config.dataName.dialogLoad);
        isDialogOpen = false;
        timer = false;

        return this.each(function () {
            var $dialog = $(this);
            var $dialogCont = $dialog.find('.' + config.className.cont);
            var $dialogCtrls;
            var $execCtrls;
            var $btnColse;
            var $overlay;
            var dialogName = this.id;
            var isOpenWhenLoaded = dialogName === loadDialogName;
            var openedWinScrollTop;
            var labelledby;

            // body要素に対するoverflowの指定、キーボードトラップ、スクロール位置の操作が必要な場合に判定する
            function isFullScreenOverlay() {
                return $overlay.width() === html.clientWidth && $overlay.height() === html.clientHeight;
            }

            function fadeOverlay() {
                if (config.modal.setting.toString() === 'true') {
                    if (isDialogOpen) {
                        $overlay.removeAttr('aria-hidden');
                    } else {
                        $overlay.attr('aria-hidden', 'true');
                    }

                    if (!isFullScreenOverlay()) {
                        return;
                    }

                    $body.css({
                        'overflow-x': isDialogOpen ? 'hidden' : '',
                        'overflow-y': isDialogOpen ? 'hidden' : ''
                    });
                }
            }

            function openDialog($openDialog, $openCtrls) {
                if ($openDialog.attr('aria-expanded') === 'true') {
                    return;
                }

                $openDialog.removeAttr('aria-hidden');

                $openCtrls = $('[aria-controls="' + dialogName + '"]').not('.' + config.className.btnColse);
                openedWinScrollTop = $scrollElem[0].scrollTop;

                if ($openCtrls.length !== 0) {
                    $openCtrls.attr('aria-expanded', 'true');
                }

                $openDialog.attr('aria-expanded', 'true');
                $openDialog.one('transitionend', function () {
                    $openDialog.focus();
                    $scrollElem.prop('scrollTop', openedWinScrollTop);
                });

                $win.on('resize.oddHeightFix', function () {
                    if (timer !== false) {
                        clearTimeout(timer);
                    }

                    timer = setTimeout(function () {
                        $openDialog.removeAttr('style');

                        if ($openDialog.height() % 2 !== 0) {
                            $openDialog.css('padding-top', 1);
                        }
                    }, 300 +
                        convCssTsTime($openDialog.css('transition-duration')) +
                        convCssTsTime($openDialog.css('transition-delay')));
                }).trigger('resize.oddHeightFix');

                if (
                    config.modal.setting.toString() === 'true' &&
                    isFullScreenOverlay()
                ) {
                    $win.on('focus.dialog', function () {
                        $openDialog.focus();
                        $scrollElem.prop('scrollTop', openedWinScrollTop);
                    });
                }
            }

            // 「閉じる」ボタンが存在しない場合に追加する
            if ($dialog.find('.' + config.className.btnColse).length <= 0) {
                $('<p>', {
                    class: config.className.btnColseWrap
                }).appendTo($dialogCont);

                $('<button>', {
                    class: config.className.btnColse,
                    type: 'button'
                }).appendTo($dialogCont.find('.' + config.className.btnColseWrap));
            }

            $btnColse = $dialogCont.find('.' + config.className.btnColse);

            $btnColse.attr({
                'aria-controls': dialogName,
                'aria-expanded': 'true'
            });

            $('<span>', {
                class: config.className.status,
                text: config.accName.close
            }).appendTo($btnColse);

            // キーボードの「Esc」キーでの「閉じる」操作の設定が有効な場合に代替テキストを追加
            if (config.closeEscKey.toString() === 'true') {
                $('<kbd>', {
                    class: config.className.btnColseKey,
                    text: config.accName.closeKey
                }).appendTo($btnColse);
            }

            // モーダルの設定が有効な場合
            if (config.modal.setting.toString() === 'true') {
                // config.modal.overlayIdName が存在しない場合は追加する
                if (doc.getElementById(config.modal.overlayIdName) === null) {
                    $('<div>', {
                        id: config.modal.overlayIdName,
                        'aria-hidden': 'true',
                        tabindex: -1
                    }).appendTo($body);
                }

                $overlay = $(doc.getElementById(config.modal.overlayIdName));

                $overlay.on('click', function () {
                    if (
                        config.modal.overlayClickClose.toString() === 'false' ||
                        isDisabled($btnColse)
                    ) {
                        return;
                    }

                    $btnColse.trigger('click');
                });
            }

            $dialog.attr({
                'aria-expanded': 'false',
                'aria-hidden': 'true'
            }).prop('tabindex', -1);

            if (
                config.role.dialog.toString() === 'true' ||
                config.modal.setting.toString() === 'true'
            ) {
                $dialog.attr('role', 'dialog');

                if (config.modal.setting.toString() === 'true') {
                    $dialog.attr('aria-modal', 'true');
                }
            }

            // 該当する要素が存在する場合に WAI-ARIA を設定する
            if ($dialog.find('.' + config.className.hdg).length !== 0) {
                labelledby = dialogName + config.idName.suffix.hdg;

                $dialog.attr('aria-labelledby', labelledby);
                $dialog.find('.' + config.className.hdg).attr('id', labelledby);
            }

            $dialogCtrls = $('[href="#' + dialogName + '"]');

            if ($dialogCtrls.length !== 0) {
                $dialogCtrls.attr({
                    'aria-controls': dialogName,
                    'aria-expanded': isOpenWhenLoaded ? 'true' : 'false'
                });

                if (
                    config.role.dialog.toString() === 'true' ||
                    config.modal.setting.toString() === 'true'
                ) {
                    $dialogCtrls.attr('aria-haspopup', 'dialog');
                }
            }

            // ページロード時に開く場合
            if (isOpenWhenLoaded) {
                isDialogOpen = true;

                openDialog($('#' + loadDialogName));
                fadeOverlay();
            }

            $dialogCtrls.on('click', function (event) {
                var $root = $(this);

                event.preventDefault();

                if (isDisabled($root)) {
                    return;
                }

                if (isDialogOpen) {
                    $btnColse.trigger('click');

                    return;
                }

                isDialogOpen = true;
                $execCtrls = $root;

                openDialog($('#' + $root.attr('aria-controls')), $root);
                fadeOverlay();
            });

            $dialog.on('click', '.' + config.className.btnColse, function () {
                var $closeCtrls;

                if (
                    isDisabled($(this)) ||
                    $dialog.attr('aria-expanded') === 'false'
                ) {
                    return;
                }

                $closeCtrls = $('[aria-controls="' + dialogName + '"]').not('.' + config.className.btnColse);

                if (
                    config.modal.setting.toString() === 'true' &&
                    isFullScreenOverlay()
                ) {
                    $win.off('focus.dialog');
                }

                $dialog.attr('aria-expanded', 'false');
                $dialog.one('transitionend', function () {
                    $dialog.attr('aria-hidden', 'true');
                    $win.off('resize.oddHeightFix');
                });

                $closeCtrls.attr('aria-expanded', 'false');

                if (isOpenWhenLoaded) {
                    $scrollElem.prop('scrollTop', 0);
                    $body.prop('tabindex', 0).focus();
                    $body.one('blur', function () {
                        $body.removeAttr('tabindex');
                    });

                    isOpenWhenLoaded = false;
                } else {
                    $scrollElem.prop('scrollTop', isFullScreenOverlay() ? openedWinScrollTop : $scrollElem[0].scrollTop);
                    $execCtrls.focus();
                }

                isDialogOpen = false;

                fadeOverlay();
            });

            // モーダルウィンドウ機能を閉じる（追加ボタン用）
            $dialog.on('click', '.js-modal-close-exc', function () {
                if (isDisabled($(this))) {
                    return;
                }

                $btnColse.trigger('click');
            });

            $dialog.on('keydown', function (event) {
                var $target;
                var $currentTarget;
                var isTabKey;
                var isEscKey;

                // キーボードの「Esc」キーでの「閉じる」操作の設定が有効な場合
                if (config.closeEscKey.toString() === 'true') {
                    isEscKey = event.key === ('Escape' || /* IE */ 'Esc') || event.keyCode === 27;

                    if (isDialogOpen && isEscKey) {
                        if (isDisabled($btnColse)) {
                            return;
                        }

                        $btnColse.trigger('click');
                    }
                }

                // モーダルの設定が有効でオーバーレイが画面サイズ場合にキーボードトラップを設置
                if (
                    config.modal.setting.toString() === 'true' &&
                    isFullScreenOverlay()
                ) {
                    $target = $(event.target);
                    $currentTarget = $(event.currentTarget);
                    isTabKey = event.key === 'Tab' || event.keyCode === 9;

                    if (event.shiftKey) {
                        if (
                            isTabKey &&
                            $target.is($currentTarget)
                        ) {
                            event.preventDefault();
                            $target.find(FOCUS_ELEMS).last().focus();
                        } else if (
                            isTabKey &&
                            $target.is($currentTarget.find(FOCUS_ELEMS).first())
                        ) {
                            event.preventDefault();
                            $currentTarget.find(FOCUS_ELEMS).last().focus();
                        }
                    } else if (
                        !event.ctrlKey &&
                        !event.altKey &&
                        !event.shiftKey
                    ) {
                        if (
                            isTabKey &&
                            $target.is($currentTarget.find(FOCUS_ELEMS).last())
                        ) {
                            event.preventDefault();
                            $currentTarget.find(FOCUS_ELEMS).first().focus();
                        }
                    }
                }
            });
        });
    };

    // aria-disabledを監視してtabindexを付与する機能
    $.fn.ariaDisabledToTabindex = function (options) {
        var config;
        var observer;
        var defaultTabindex;

        if (this.length <= 0) {
            return this;
        }

        // 通知設定
        config = $.extend({
            attributes: true,
            attributeFilter: ['aria-disabled']
        }, options);

        function tabindexControl(mutation) {
            var $target = $(mutation[0].target);

            if ($target.attr('aria-disabled') === 'true') {
                $target.prop('tabindex', -1);
            } else {
                if (defaultTabindex === undefined) {
                    $target.removeAttr('tabindex');
                } else {
                    $target.prop('tabindex', defaultTabindex);
                }
            }
        }

        return this.each(function () {
            var $btn = $(this);

            defaultTabindex = $btn.attr('tabindex');

            // 通知機能
            observer = new MutationObserver(tabindexControl);

            // $btn を監視
            observer.observe($btn[0], config);

            if ($btn.attr('aria-disabled') === 'true') {
                $btn.prop('tabindex', -1);
            }
        });
    };
}(
    window,
    window.document,
    window.jQuery,
    (function (win) {
        'use strict';

        return {
            locHash: win.location.hash,
            locPathName: win.location.pathname,
            lStorage: win.localStorage,
            UA: win.navigator.userAgent
        };
    }(window))
));

// ==================== 戻るボタンの確認ダイアログを表示する機能 ====================

(function (win, $) {
    'use strict';

    $(function () {
        var EXCLUDE_CLASS_NAME = 'js-exclude-prompt';

        // a要素,button要素のクリックは無効
        $('a.' + EXCLUDE_CLASS_NAME + ':not([target="_blank"]), button.' + EXCLUDE_CLASS_NAME).on('click', function () {
            win.setShowDialog(false);
            setTimeout(resetShowDialog,1000);
        });

        // div要素内に含まれるa要素,button要素のクリックは無効
        $('div.' + EXCLUDE_CLASS_NAME).find('a:not([target="_blank"])').on('click', function () {
            win.setShowDialog(false);
            setTimeout(resetShowDialog,1000);
        });

        // form要素のsubmitは無効
        $('form.' + EXCLUDE_CLASS_NAME + ':not([target="_blank"])').on('submit', function () {
            win.setShowDialog(false);
            setTimeout(resetShowDialog,1000);
        });

        // 確認ダイアログフラグを"true"に設定する。
        var resetShowDialog = function(){
        	win.setShowDialog(true);
        };
    });
}(window, window.jQuery));

/**
 * form validate
 */
(function (win, doc, $, validate) {
    'use strict';

    var $validationTargets = $('[data-validate], [data-require="true"]');
    var $validateSubmitBtn = $('[type="submit"]');
    var VALIDATE_TYPE_ALL = 'all';
    var VALIDATE_TYPE_LINKAGE = 'link';
    var validateHundler = function ($this, event) {
        var linkageId = $this.data().linkageId;
        var $targetBtn;
        var $targetBtnParent;

        if (linkageId) {
            $targetBtn = $('[data-target-linkage="' + linkageId + '"]');
            $targetBtnParent = $targetBtn.closest('.btn-send-1');

            // input要素の個体バリデーション
            if (!validate.run($this, event.type)) {
                $targetBtnParent.addClass('is-error');
            } else {
                $targetBtnParent.removeClass('is-error');
            }
        } else {
            $targetBtn = $('[data-validate-type="' + VALIDATE_TYPE_ALL + '"]');
            $targetBtnParent = $targetBtn.closest('.btn-send-1');

            // input要素の個体バリデーションを実施
            if (!validate.run($this, event.type)) {
                $targetBtnParent.addClass('is-error');
            } else {
                $targetBtnParent.removeClass('is-error');
            }
        }
    };

    validate.init($validationTargets);

    $validationTargets.on('focusout', function (event) {
        validateHundler($(this), event);
    });

    $validationTargets.closest('[type="checkbox"]').on('change', function (event) {
        validateHundler($(this), event);
    });

    $validateSubmitBtn.on('click', function (event) {
        var $this = $(this);
        var type = $this.data().validateType;

        // ページ内のすべてのフォーム要素が活性の条件となる場合
        if (type === VALIDATE_TYPE_ALL) {
            if (!validate.all($validationTargets)) {
                event.preventDefault();
                $this.closest('.btn-send-1').addClass('is-error');

                return false;
            }
        // 特定のフォーム要素が活性の条件となる場合
        } else if (type === VALIDATE_TYPE_LINKAGE) {
            if (!validate.linkageSubmit($this, false)) {
                event.preventDefault();
                $this.closest('.btn-send-1').addClass('is-error');

                return false;
            }

            $this.closest('.btn-send-1').removeClass('is-error');
        }

        return true;
    });
}(window, window.document, window.jQuery, (function () {
    'use strict';

    var validate = {
        /**
         * Initialize: Append empty error element.
         * @param  {Object} $element [Target element of jQuery object.]
         */
        init: function ($element) {
            var idx;
            var $input;
            var $inputAttr;
            var $inputName;
            var $inputElements;
            var uniqueId;
            var $elementLength = $element.length;

            for (idx = 0; idx < $elementLength; idx++) {
                $input = $element.eq(idx);
                $inputAttr = $input.attr('type');
                uniqueId = 'validate-error-' + (idx + 1);

                $input.parent().after(
                    $('<span>', {
                        id: uniqueId,
                        role: 'alert'
                    }).append(
                        $('<span>', {
                            class: 'js-formerr-wrap',
                            tabindex: '-1'
                        }).append(
                            $('<span>', {
                                class: 'inner'
                            })
                        ).append(
                            $('<button>', {
                                type: 'button',
                                class: 'js-btn-close',
                                html: '<span class="js-btn-close-text">閉じる</span>'
                            }).on('click', function (event) {
                                event.stopPropagation();
                                event.preventDefault();

                                $(this).closest('.js-formerr-wrap').css({
                                    marginTop: '',
                                    left: ''
                                }).removeClass('is-show').hide();
                            })
                        ).hide()
                    )
                );

                $input.attr('aria-errormessage', uniqueId);

                if ($inputAttr === 'radio' || $inputAttr === 'checkbox') {
                    // 選択済みの要素が存在する場合はクラスを付与
                    if ($input.is(':checked')) {
                        $inputName = $input.attr('name');
                        $inputElements = $('input[name="' + $inputName + '"]');

                        $inputElements.addClass('is-valid');
                    }

                // 入力欄に何かしら入力されていたらクラスを付与
                } else if ($input.val() !== '') {
                    $input.addClass('is-valid');
                }

                // Attribute 'aria-required' add.
                if ($input.data().require) {
                    $input.attr('aria-required', 'true');
                }
            }
        },
        util: {
            isExistElement: function ($element) {
                return $element.length > 0;
            },
            unExistElement: function ($element) {
                return $element.length <= 0;
            }
        },
        error: {
            $current: null,
            show: function ($element, validateType, param) {
                var $tooltip = $('#' + $element.attr('aria-errormessage')).find('.js-formerr-wrap');
                var $tooltipInner = $tooltip.find('.inner');
                var itemName = '項目';
                var $closestRelativeParent;
                var $targetValidateType = $tooltipInner.find('span[data-validatetype="' + validateType + '"]');
                var currentVisible = !$targetValidateType.is(':visible');
                var elementData = $element.data();

                $(document.documentElement).attr('data-active-event', 'validate');

                if (this.$current !== $tooltip[0]) {
                    this.$current = $tooltip[0];
                    $('.js-formerr-wrap').css({
                        marginTop: '',
                        left: ''
                    }).removeClass('is-show').hide();
                }

                if (!param) {
                    param = ['', ''];
                }

                if (elementData.label) {
                    itemName = elementData.label;
                } else if (validate.util.isExistElement($element.closest('[data-label]'))) {
                    itemName = $element.closest('[data-label]').data().label;
                } else if (validate.util.isExistElement($element.closest('label').find('.label'))) {
                    itemName = $element.closest('label').find('.label').text();
                } else if (validate.util.isExistElement($('[for="' + $element.attr('id') + '"]'))) {
                    itemName = $('[for="' + $element.attr('id') + '"]').text().replace('必須', '');
                } else if ($element.attr('title')) {
                    itemName = $element.attr('title');
                } else {
                    itemName = 'この項目';
                }

                // If there is no cache or show different error, build an error.
                if (validate.util.unExistElement($targetValidateType) || ($targetValidateType.length > 0 && $targetValidateType.data().validatetype !== validateType)) {
                    $tooltipInner.html('');
                    $('<span>', {
                        text: {
                            require: itemName + 'は必ず入力してください。',
                            upperLength: itemName + 'は' + param[0] + '文字以上で入力してください。',
                            lowerLength: itemName + 'は' + param[0] + '文字以内で入力してください。',
                            regExp: itemName + 'を正しく入力してください。',
                            intRange: itemName + 'は' + param[0] + 'から' + param[1] + 'の範囲で入力してください。',
                            byteHalf: itemName + 'は半角英数字で入力してください。',
                            byteFull: itemName + 'は全角文字で入力してください。',
                            byteFullKana: itemName + 'は全角カタカナで入力してください。',
                            byteHalfInt: itemName + 'は半角数字で入力してください。',
                            fixLength: itemName + 'は' + param[0] + '文字で入力してください。'
                        }[validateType],
                        'data-validatetype': validateType
                    }).show().appendTo($tooltipInner);
                } else if (currentVisible) {
                    $targetValidateType.show();
                }

                if (currentVisible) {
                    // すでにメッセージが表示されている場合は位置調整のスタイルを解除する
                    if ($tooltip.is(':visible')) {
                        $tooltip.css({
                            marginTop: '',
                            left: ''
                        }).removeClass('is-show');
                    }

                    $element.attr('aria-invalid', 'true');

                    $closestRelativeParent = $tooltip.parents().filter(function () {
                        var $this = $(this);

                        return $this.is('body') || $this.css('position') === 'relative';
                    }).slice(0, 1);

                    $tooltip.show().css({
                        marginTop: $element.offset().top - $tooltip.offset().top,
                        left: $element.offset().left - $closestRelativeParent.offset().left
                    }).addClass('is-show');
                }
            },
            hide: function ($element) {
                $element.parent().next().find('.js-formerr-wrap').css({
                    marginTop: '',
                    left: ''
                }).removeClass('is-show').find('.inner').html('').end().hide();
            }
        },
        check: function ($element, validateArray) {
            var leng = validateArray.length;
            var idx = 0;
            var tarm;

            for (idx; idx < leng; idx++) {
                if (validateArray[idx] === '') {
                    continue;
                }

                if (validateArray.indexOf(':') !== -1) {
                    validateArray[idx] = validate.inspect($element)[validateArray[idx]]();
                } else {
                    tarm = validateArray[idx].split(':');

                    validateArray[idx] = validate.inspect($element)[tarm[0]](tarm[1]);
                }

                if (!validateArray[idx]) {
                    return [false];
                }
            }

            return validateArray;
        },
        inspect: function ($element) {
            var $elementVal = $element.val();

            return {
                scan: function (calc, decisionType, param) {
                    if (calc) {
                        if (!validate.linkage) {
                            validate.error.hide($element, decisionType, param);
                        }
                    } else {
                        if ($elementVal !== '') {
                            validate.error.show($element, decisionType, param);

                            return false;
                        }
                    }

                    return true;
                },
                isNumber: function (value) {
                    return !isNaN(parseInt(value, 10)) && !isNaN(Number(value));
                },
                upperLength: function (number) {
                    return this.scan($elementVal.length >= number, 'upperLength', [number, 0]);
                },
                lowerLength: function (number) {
                    return this.scan($elementVal.length <= number, 'lowerLength', [number, 0]);
                },
                regExp: function () {
                    return this.scan(new RegExp($element.data().regexp).test($elementVal), 'regExp');
                },
                intRange: function (number) {
                    var numberGroup = number.split('-');

                    if (!this.isNumber($elementVal)) {
                        return this.scan(false, 'intRange', [numberGroup[0], numberGroup[1]]);
                    }

                    return this.scan(
                        $elementVal >= parseInt(numberGroup[0], 10) && $elementVal <= parseInt(numberGroup[1], 10),
                        'intRange',
                        [
                            numberGroup[0],
                            numberGroup[1]
                        ]
                    );
                },
                byteHalf: function () {
                    return this.scan(/^[0-9a-zA-Z]+$/.test($elementVal), 'byteHalf');
                },
                byteFull: function () {
                    return this.scan(!/[\u0000-\u00FF\uFF61-\uFF9F]/.test($elementVal), 'byteFull');
                },
                byteFullKana: function () {
                    return this.scan(/^[\u30A0-\u30FF]+$/.test($elementVal), 'byteFullKana');
                },
                byteHalfInt: function () {
                    return this.scan(this.isNumber($elementVal), 'byteHalfInt');
                },
                fixLength: function (number) {
                    return this.scan($elementVal.length === parseInt(number, 10), 'fixLength', [number, null]);
                }
            };
        },
        run: function ($element) {
            var $elementAttr = $element.attr('type');
            var $elementData = $element.data();
            var validateArray = $elementData.validate ? $elementData.validate.split(',') : '';
            var validateRequire = $elementData.require;
            var $elementName;
            var $inputElements;
            var $checkedInputElements;

            // Do not check for invisible elements.
            if (!$element.is(':visible')) {
                return true;
            }

            $element.removeClass('is-valid');

            if (validateRequire) {
                if ($elementAttr === 'radio' || $elementAttr === 'checkbox') {
                    $elementName = $element.attr('name');

                    $inputElements = $('input[name="' + $elementName + '"]');
                    $checkedInputElements = $inputElements.filter(function () {
                        return $(this).removeClass('is-valid').is(':checked');
                    });

                    if ($checkedInputElements.length === 0) {
                        validate.error.show($element, 'require');

                        return false;
                    }

                    $inputElements.each(function () {
                        var $this = $(this);

                        validate.error.hide($this);
                        $this.addClass('is-valid');
                    });
                } else {
                    // スペースなどの空白文字も判定の対象とする
                    if ($element.val() === '') {
                        validate.error.show($element, 'require');

                        return false;
                    }

                    validate.error.hide($element);
                }
            }

            // data-validate属性が指定されている場合
            if (validateArray) {
                if (!validate.check($element, validateArray).every(function (value) {
                    return value;
                })) {
                    return false;
                }
            } else {
                validate.error.hide($element);
            }

            $element.addClass('is-valid');
            $element.attr('aria-invalid', 'false');

            return true;
        },
        all: function ($targets) {
            var permissionFlag = true;
            var i;
            var $target;

            for (i = 0; i < $targets.length; i++) {
                $target = $targets.eq(i);

                if (!validate.run($target)) {
                    permissionFlag = false;

                    validate.error.$current = $target.next().find('.js-formerr-wrap')[0];
                    $target.focus();

                    break;
                }
            }

            return permissionFlag;
        },
        linkage: false,
        /**
         * ボタンに紐づくすべてのバリデーションを行う
         * @param {jQuery} $submit 紐づける対象となるbuttonのjQueryオブジェクト
         * @param {boolean} isLinkage
         * @return {boolean}
         */
        linkageSubmit: function ($submit, isLinkage) {
            var targetId = $submit.data().targetLinkage;
            var $targets = $('[data-linkage-id="' + targetId + '"]');
            var permissionFlag = true;
            var i;

            validate.linkage = isLinkage;

            for (i = 0; i < $targets.length; i++) {
                if (!validate.run($targets.eq(i), null, true)) {
                    permissionFlag = false;

                    if (!isLinkage) {
                        validate.error.$current = $targets.eq(i).next('.js-formerr-wrap')[0];
                        $targets.eq(i).focus();
                    }

                    break;
                }
            }

            return permissionFlag;
        }
    };

    return validate;
}())));

/* eslint-disable */
// ==================== 既存機能（職員画面のみで使用） ====================

/**
 * 2.0次リリース 新規作成

 * tableFixative
 * table のセルの大きさを固定するためのスクリプト。
 * 利用法:
 *  jQuery(function($tbl){ $tbl('#<テーブルのID>').tableFixative({height:<高さの指定ピクセル(整数)>}); })
 * 例: id="foo" が指定されたテーブルのセル高さを 100 px で固定する場合
 *  jQuery(function($tbl){ $tbl('#foo').tableFixative({height:100}); })
 */

(function ($tbl) {
    var tableFixative = function (node$tbl, width) {
        var cto = this;
        cto.$tbl = node$tbl;
        cto.width = $tbl.extend({ height: 100 }, width || {});
        cto.thead$tbl = cto.$tbl.find('thead');
        cto.tbody$tbl = cto.$tbl.find('tbody');

        cto.reset(cto.thead$tbl.find('> tr > *')).reset(cto.tbody$tbl.find('> tr:eq(0) > *')).build();

        cto.headerFrame$tbl = cto.frame$tbl.find('div.thead');
        cto.headerTable$tbl = cto.headerFrame$tbl.find('table');
        cto.bodyFrame$tbl = cto.frame$tbl.find('div.tbody');

        cto.thead$tbl.each(
            function (num) {
                $tbl(this).appendTo(cto.headerTable$tbl[num]);
            }
        )

        cto.$tbl.each(
            function (num) {
                $tbl(this).appendTo(cto.bodyFrame$tbl[num]);
            }
        )

        cto.bodyFrame$tbl.css('max-height',cto.width.height);

        return cto.adjust();
    }

    tableFixative.prototype = {
        reset: function (node$tbl) {
            node$tbl.each(
                function () {

                }
            )

            return this;
        },
        build: function () {
            var cto = this;
            var arr = [];
            var html = '<div><div class="thead"><table style="margin:0;"></table></div><div class="tbody overflow"></div></div>';

            cto.$tbl.each(
                function (num) {
                    arr[num] = ($tbl(html).insertBefore(this)[0]);
                }
            )

            cto.frame$tbl = $tbl(arr);

            return this;
        },
        adjust: function () {
            var cto = this;
            var w = cto.$tbl.width() + 20;
            cto.frame$tbl.width(w);
            cto.headerFrame$tbl.width(w);
            cto.bodyFrame$tbl.width(w);
            return this;
        }
    }

    $tbl.fn.tableFixative = function (width) {
        new tableFixative(this, width);
        return this;
    }

})(jQuery)

jQuery(function ($tbl) {
    $tbl('.js-tbl > table').tableFixative({ height: 363 });
});

jQuery(function ($tbl) {
    $tbl('.js-tbl2 > table').tableFixative({ height: 180 });
});

// ==================== 元号対応 ====================
(function(){
  $(function() {
    if($('[name$="Gengo"]:radio').length > 0){
      if($('[id=radio-01]').prop('checked')){
        $('.gengo').hide();
        $('.reiwa').show();
      } else if ($('[id=radio-02]').prop('checked')){
         $('.gengo').hide();
         $('.heisei').show();
      } else if ($('[id=radio-03]').prop('checked')){
         $('.gengo').hide();
         $('.showa').show();
      } else if ($('[id=radio-04]').prop('checked')){
         $('.gengo').hide();
         $('.taisho').show();
      } else if ($('[id=radio-05]').prop('checked')){
         $('.gengo').hide();
         $('.meiji').show();
      } else if ($('[id=radio-06]').prop('checked')){
         $('.gengo').hide();
         $('.gengo01').show();
      }
    }
  });

  $('[name$="Gengo"]:radio').change(function(){
    if($('[id=radio-01]').prop('checked')){
      $('.gengo').hide();
      $('.reiwa').show();
    } else if ($('[id=radio-02]').prop('checked')){
       $('.gengo').hide();
       $('.heisei').show();
    } else if ($('[id=radio-03]').prop('checked')){
       $('.gengo').hide();
       $('.showa').show();
    } else if ($('[id=radio-04]').prop('checked')){
       $('.gengo').hide();
       $('.taisho').show();
    } else if ($('[id=radio-05]').prop('checked')){
       $('.gengo').hide();
       $('.meiji').show();
    } else if ($('[id=radio-06]').prop('checked')){
       $('.gengo').hide();
       $('.gengo01').show();
    }
  });
})();

//==================== 元号・西暦対応（W_M0101） ====================
(function(){
$(function() {
if($('[name$="birthdayGengoAD1"]:radio').length > 0){
 if($('[id=radio-01]').prop('checked')){
    $('.gengo1').hide();
    $('.seireki1').show();
    $('.yearad1').show();
 } else if($('[id=radio-02]').prop('checked')){
    $('.gengo1').hide();
    $('.reiwa1').show();
    $('.yeargengo1').show();
 } else if ($('[id=radio-03]').prop('checked')){
    $('.gengo1').hide();
    $('.heisei1').show();
    $('.yeargengo1').show();
 } else if ($('[id=radio-04]').prop('checked')){
    $('.gengo1').hide();
    $('.showa1').show();
    $('.yeargengo1').show();
 } else if ($('[id=radio-05]').prop('checked')){
    $('.gengo1').hide();
    $('.taisho1').show();
    $('.yeargengo1').show();
 } else if ($('[id=radio-06]').prop('checked')){
    $('.gengo1').hide();
    $('.meiji1').show();
    $('.yeargengo1').show();
 }
}
});

$('[name$="birthdayGengoAD1"]:radio').change(function(){
if($('[id=radio-01]').prop('checked')){
  $('.gengo1').hide();
  $('.seireki1').show();
  $('.yearad1').show();
} else if($('[id=radio-02]').prop('checked')){
  $('.gengo1').hide();
  $('.reiwa1').show();
  $('.yeargengo1').show();
} else if ($('[id=radio-03]').prop('checked')){
  $('.gengo1').hide();
  $('.heisei1').show();
  $('.yeargengo1').show();
} else if ($('[id=radio-04]').prop('checked')){
  $('.gengo1').hide();
  $('.showa1').show();
  $('.yeargengo1').show();
} else if ($('[id=radio-05]').prop('checked')){
  $('.gengo1').hide();
  $('.taisho1').show();
  $('.yeargengo1').show();
} else if ($('[id=radio-06]').prop('checked')){
  $('.gengo1').hide();
  $('.meiji1').show();
  $('.yeargengo1').show();
}
});
})();

(function(){
$(function() {
if($('[name$="birthdayGengoAD2"]:radio').length > 0){
 if($('[id=radio-07]').prop('checked')){
    $('.gengo2').hide();
    $('.seireki2').show();
    $('.yearad2').show();
 } else if($('[id=radio-08]').prop('checked')){
    $('.gengo2').hide();
    $('.reiwa2').show();
    $('.yeargengo2').show();
 } else if ($('[id=radio-09]').prop('checked')){
    $('.gengo2').hide();
    $('.heisei2').show();
    $('.yeargengo2').show();
 } else if ($('[id=radio-10]').prop('checked')){
    $('.gengo2').hide();
    $('.showa2').show();
    $('.yeargengo2').show();
 } else if ($('[id=radio-11]').prop('checked')){
    $('.gengo2').hide();
    $('.taisho2').show();
    $('.yeargengo2').show();
 } else if ($('[id=radio-12]').prop('checked')){
    $('.gengo2').hide();
    $('.meiji2').show();
    $('.yeargengo2').show();
 }
}
});

$('[name$="birthdayGengoAD2"]:radio').change(function(){
if($('[id=radio-07]').prop('checked')){
  $('.gengo2').hide();
  $('.seireki2').show();
  $('.yearad2').show();
} else if($('[id=radio-08]').prop('checked')){
  $('.gengo2').hide();
  $('.reiwa2').show();
  $('.yeargengo2').show();
} else if ($('[id=radio-09]').prop('checked')){
  $('.gengo2').hide();
  $('.heisei2').show();
  $('.yeargengo2').show();
} else if ($('[id=radio-10]').prop('checked')){
  $('.gengo2').hide();
  $('.showa2').show();
  $('.yeargengo2').show();
} else if ($('[id=radio-11]').prop('checked')){
  $('.gengo2').hide();
  $('.taisho2').show();
  $('.yeargengo2').show();
} else if ($('[id=radio-12]').prop('checked')){
  $('.gengo2').hide();
  $('.meiji2').show();
  $('.yeargengo2').show();
}
});
})();

// ==================== 条件付き必須欄の強調表示 ====================

(function(){
  var $inputElements;

  //ページ読み込み時の初期設定
  $(function() {
    $('input[data-orange]').each(function(e){
       var type = $(this).attr('type');
       var $name = $(this).attr('name');
       
       //ラジオ、チェックボックスの場合
       if(type === 'radio' || type === 'checkbox'){ 
         
           $inputElements = $('input[name="' + $name + '"]');
          if($inputElements.is(':checked')) {
              $inputElements.attr('data-orange','false');;
          }
       }
       //その他（テキストエリア、テキストボックス）の場合
       else {
          if(!($(this).val() === '')){
              $(this).attr('data-orange','false');
          }
       }
    });
    
    //リストボックスの初期設定
    $('select[data-orange]').each(function(e){
          if(!($(this).val() === '')){
              $(this).attr('data-orange','false');
          }
    });
    
    //テキストエリアの初期設定
    $('textarea[data-orange]').each(function(e){
          if(!($(this).val() === '')){
              $(this).attr('data-orange','false');
          }
    });
    
  });
  
  //input系フォームからフォーカスが外れた時に再設定
  $('input[data-orange]').focusout(function(e){

       var type = $(this).attr('type');
       var $name = $(this).attr('name');

       //ラジオ、チェックボックスの場合       
       if(type === 'radio' || type === 'checkbox'){ 
           $inputElements = $('input[name="' + $name + '"]');
         
          if($inputElements.is(':checked')) {
              $inputElements.attr('data-orange','false');
          }
          else{
              $inputElements.attr('data-orange','true');
          
          }
       }

       //その他（テキストボックス）の場合
       else {
        if(!($(this).val() === '')){
             $(this).attr('data-orange','false');
        }
        else {
             $(this).attr('data-orange','true');
        }
        
      }
  });

  //テキストエリアのフォーカスアウト時
  $('textarea[data-orange]').focusout(function(e){
        if(!($(this).val() === '')){
             $(this).attr('data-orange','false');
        }
        else {
             $(this).attr('data-orange','true');
        }
    
  });
  
  //リストボックスのフォーカスアウト時
  $('select[data-orange]').focusout(function(e){
        if(!($(this).val() === '')){
             $(this).attr('data-orange','false');
        }
        else {
             $(this).attr('data-orange','true');
        }
    
  });
  
  //ラジオボタンとチェックボックスの値が変更になったときは再設定
  $('input[data-orange]').change(function(e){

       var type = $(this).attr('type');
       var $name = $(this).attr('name');

       if(type === 'radio' || type === 'checkbox'){ 
           $inputElements = $('input[name="' + $name + '"]');
         
          if($inputElements.is(':checked')) {
              $inputElements.attr('data-orange','false');
          }
          else{
              $inputElements.attr('data-orange','true');
          
          }
       }
  });
  
})();

// ==================== プラグイン本体 ====================

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
