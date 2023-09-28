function isMobile() {
    return $(this).innerWidth() < 1184;
}

function openMenu() {
    window.scroll_pos = $(window).scrollTop();
    scrollToTop();

    $('body').addClass('modal-open mobile-menu-open');
}

function closeMenu() {
    scrollToTop(window.scroll_pos);
    $('body').removeClass('modal-open mobile-menu-open');
}

function openSearch() {
    window.scroll_pos = $(window).scrollTop();
    scrollToTop();

    $('body').addClass('modal-open search-modal-open');

    if (!isMobile()) {
        $('.search-modal .search-field').trigger('focus');
    }
}

function closeSearch() {
    scrollToTop(window.scroll_pos);
    $('body').removeClass('modal-open search-modal-open');
}

function onWindowScroll() {
    if (isMobile()) {
        return;
    }

    if ($(this).scrollTop() > 300 && !$('header').hasClass('collapsed')) {
        $('header').addClass('collapsed')
        $('.branding').addClass('collapsed')
    } else if ($(this).scrollTop() <= 300 && $('header').hasClass('collapsed')) {
        $('header').removeClass('collapsed')
        $('.branding').removeClass('collapsed')
    }
}

function scrollToTop(top) {
    $(window).scrollTop(top || 0);
}

function onSinglePostScroll() {
    var _share = $('.share');
    var _loader = $('#loader');
    var _title = $('title');
    var _text = $('.text');
    var _secondary = $('.secondary');

    var height = $(this).innerHeight();
    var singleHeight = $('#single-post').height();
    var scroll = $(document).scrollTop();
    var textEnd = _secondary.innerHeight() + _text.innerHeight() - _share.innerHeight();
    var isScrolledToEnd = singleHeight < (height + scroll - 326);
    var isNeedLoad = (singleHeight * 0.8) < (height + scroll);

    if (_share.is(":visible") && textEnd < scroll) {
        _share.hide();
    } else if (!_share.is(":visible") && textEnd >= scroll) {
        _share.show();
    }

    if (isScrolledToEnd) {
        if (window.main_data && _title.html() !== window.main_data.title) {
            _title.html(window.main_data.title);
            window.history.replaceState({}, window.main_data.title, window.main_data.url);
        }
    } else {
        if (window.post_data && _title.html() !== window.post_data.title) {
            _title.html(window.post_data.title);
            window.history.replaceState({}, window.post_data.title, window.post_data.url);
        }
    }

    if (isNeedLoad) {
        if (_loader.is(':empty') && !_loader.hasClass('loading')) {
            _loader.addClass('loading');

            $.post('/wp-admin/admin-ajax.php', {action: 'main_load'}, function (data) {
                if (data.status) {
                    $('#loader').append(data.content);

                    window.post_data = {url: document.location.href, title: _title.html()};
                    window.main_data = data.data;

                    _title.html(window.main_data.title);
                    window.history.replaceState({}, window.main_data.title, window.main_data.url);
                    ga('send', 'pageview', location.pathname);

                    setEvents();
                }

                _loader.removeClass('loading');
            }.bind(this), 'json');
        }
    }
}

function copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
};

function setEvents() {
    $(window).off('scroll').on('scroll', function() {
        onWindowScroll();

        if ($('body').hasClass('single')) {
            onSinglePostScroll();
        }
    });

    $('#open-search').off('click').on('click', function (e) {
        e.preventDefault();
        openSearch();
    });

    $('.close-search').off('click').on('click', function (e) {
        e.preventDefault();
        closeSearch();
    });

    $('#open-menu').off('click').on('click', function (e) {
        e.preventDefault();
        openMenu();
    });

    $('#close-menu').off('click').on('click', function (e) {
        e.preventDefault();
        closeMenu();
    });

    if ($('body').hasClass('single')) {
        $(window).off('resize').on('resize', function () {
            var width = $(this).innerWidth();
            var offset = (width - 1044) / 2 - 32 - 24;
            var top = $('.secondary .description').offset().top;

            $('.share').css('left', offset + 'px').css('top', top + 'px');
        }).trigger('resize');
    }

    $('#sort').off('change').on('change', function() {
        $(this).parent().submit();
    });

    $('#filter').off('change').on('change', function() {
        $(this).parent().submit();
    });

    $('#load-more').off('click').on('click', function (e) {
        e.preventDefault();

        if ($(this).data('disabled')) {
            return;
        }

        $(this).data('disabled', 'disabled');

        $(this).css({'background': '#0d7bb9', 'borderColor': '#0d7bb9', 'color': '#fff'});
        setTimeout(function () {
            $(this).css({'background': '#fff', 'borderColor': '#000', 'color': '#000'});
        }.bind(this), 500);

        var params = {};
        var offset = window.load_offset || $(this).data('offset');
        var action = $(this).data('action');

        switch (action) {
            case 'category':
                params = {category_id: $(this).data('category'), offset: offset};
                break;

            case 'author':
                params = {author_id: $(this).data('author'), order: $(this).data('order'), offset: offset};
                break;

            case 'search':
                params = {search_query: $(this).data('query'), order: $(this).data('order'), offset: offset};
                break;

            case 'tag':
                params = {tag_id: $(this).data('tag'), offset: offset};
                break;

            case 'label':
                params = {label: $(this).data('label'), offset: offset};
                break;
        }
        params.action = action + '_load';

        $.post('/wp-admin/admin-ajax.php', params, function (data) {
            if (data.status) {
                $('#posts-list').append(data.content);

                window.load_offset = offset + data.length;

                if (data.end) {
                    $(this).hide();
                }
            }

            $(this).data('disabled', null);
        }.bind(this), 'json');
    });

    $('.load-more').off('click').on('click', function (e) {
        if (isMobile()) {
            e.preventDefault();
        } else {
            return true;
        }

        if ($(this).data('disabled')) {
            return;
        }
        $(this).data('disabled', 'disabled');

        if (!window.load_offset) {
            window.load_offset = {};
        }

        var params = {};
        var action = $(this).data('action');
        var offset = window.load_offset[action] || $(this).data('offset');
        var steps = $(this).data('steps') || 1;

        $(this).css({'background': '#0d7bb9', 'borderColor': '#0d7bb9', 'color': '#fff'});
        setTimeout(function () {
            $(this).css({'background': '#fff', 'borderColor': '#000', 'color': '#000'});
        }.bind(this), 500);

        switch (action) {
            case 'category_list':
                params = {category_id: $(this).data('category'), offset: offset};
                break;

            case 'news_list':
                params = {offset: offset};
                break;

            case 'video_list':
                params = {offset: offset};
                break;
        }

        params.action = action + '_load';
        $.post('/wp-admin/admin-ajax.php', params, function (data) {
            if (data.status) {
                if (steps == 1) {
                    $(this).parent().find('ul').append(data.content);
                } else {
                    $(this).parent().parent().find('ul').append(data.content);
                }

                window.load_offset[action] = offset + data.length;
                $(this).data('disabled', null);

                if (data.end) {
                    $(this).hide();
                }
            }
        }.bind(this), 'json');
    });

    $('.reaction-link').off('click').on('click', function (e) {
        e.preventDefault();

        var post_id = $(this).data('post-id');
        var reaction = $(this).data('reaction');

        $.post('/wp-admin/admin-ajax.php', {action: 'post_react', postID: post_id, reaction: reaction}, function (data) {
            if (data.status) {
                $.each(data.count, function (key, value) {
                    $('a[data-reaction="' + key + '"]').find('.reaction-counter').html(value);
                });
            }
        }.bind(this), 'json');
    });

    $('.share-link').off('click').on('click', function (e) {
        e.preventDefault();

        copyToClipboard($(this).data('link'));
    });

    $('.toggle-faq-content').click(function (e) {
        e.preventDefault();

        $(this).parent().toggleClass('open');
    });

    $('.month-list li').click(function (e) {
        if ($(this).hasClass('active') || $(this).hasClass('button')) {
            return;
        }

        e.preventDefault();

        $('.month-list li').removeClass('active');
        $(this).addClass('active');

        $('#auditory-unique').html($(this).data('unique'));
        $('#auditory-views').html($(this).data('views'));
    });

    $('.month-list li.next').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('disabled')) {
            return;
        }

        let next = $('.month-list li.active').next();

        $('.month-list li.active').removeClass('active');

        if (!next.next() || !next.next().hasClass('month')) {
            $(this).addClass('disabled');
        }

        if (next.prev()) {
            $('.month-list li.prev').removeClass('disabled');
        }

        next.click();
    });

    $('.month-list li.prev').click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('disabled')) {
            return;
        }

        let prev = $('.month-list li.active').prev();

        $('.month-list li.active').removeClass('active');

        if (!prev.prev() || !prev.prev().hasClass('month')) {
            $(this).addClass('disabled');
        }

        if (prev.next()) {
            $('.month-list li.next').removeClass('disabled');
        }

        prev.click();
    });
     
    $('#close-catfish').click(function(e) {
	    e.preventDefault();
	    
	    $(this).parent().remove();
    });
    
    $('.catfish').css('max-height', '');
}
window.addEventListener('load', setEvents);
