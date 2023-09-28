$(function () {
    // 冗余代码注释
    // if ($('#header').length) {

    //     var header = document.querySelector('#header');
    //     var h_offset_top = $('#header').offset().top + $('#header').height();

    //     var headroom = new Headroom(header, {
    //         tolerance: 0,
    //         offset: h_offset_top,
    //         classes: {
    //             initial: 'animated',
    //             pinned: 'slideDown',
    //             unpinned: 'slideUp'
    //         }
    //     });
    //     headroom.init();
    // }

    var HOT_SEARCH_WORD_HTML = ""; // 全局变量用以保存异步获取的推荐搜索词

    //存储搜索历史
    function setHistorySearchWord(word) {

        if (word) {

            var _localWord = localStorage.getItem("__localSearchWord"),
                _wordArray = new Array(),
                _e = false;

            if (_localWord) _wordArray = _localWord.split(",");

            // 检索是否已存储,必须全字符相同
            if (_wordArray.length > 0) {
                for (var i = _wordArray.length - 1; i >= 0; i--) {
                    if (_wordArray[i] == word) _e = true;
                }
            };

            if (!_e) {
                // 未存储时再设置存储
                if (_wordArray.length >= 6) {
                    _wordArray = _wordArray.splice(0, 5);
                    localStorage.setItem("__localSearchWord", word + "," + _wordArray.toString());
                } else {
                    localStorage.setItem("__localSearchWord", _localWord ? word + "," + _localWord : word);
                }
            };
        };
    };

    // 获取本地存储的搜索词并返回HTML
    function getHistorySearchWord() {
        var _localWord = localStorage.getItem("__localSearchWord"),
            _html = "";

        if (_localWord) {
            var _ary = _localWord.split(","),
                history_search_word = '';
            for (var i = 0; i < _ary.length; i++) {
                if (_ary[i]) {
                    history_search_word = _ary[i];
                    history_search_word = history_search_word.replace(/%/g, '%25'); // 解决搜索 % 的问题
                    _html += '<a class="searchWord" href="/s/' + history_search_word + '">' + _ary[i] + '</a>';
                }
            }
        }

        return _html;
    }

    // 获取推荐的搜索热词并返回HTML并存储在全局变量中
    function getHotSearched() {
        $.ajax({
            type: 'POST',
            async: true,
            dataType: 'json',
            url: '/goods/goods/get-search-key',
            headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
            success: function success(res) {
            if (res.code == 200 && res.keys.length > 0) {
                var hot_search_word = '';
                for (var i = 0; i < res.keys.length; i++) {
                    hot_search_word = res.keys[i].keyword;
                    hot_search_word = hot_search_word.replace(/%/g, '%25'); // 解决搜索 % 的问题
                        HOT_SEARCH_WORD_HTML += '<a class="searchFireWord" href="' + (res.keys[i].url ? res.keys[i].url : "/s/" + hot_search_word) + '" data-keyword-id="' + (res.keys[i].id || '') + '" data-keyword-name="' + res.keys[i].keyword + '"><img class="imgIcon" src="https://images.komily.com/banner/2021/09/09/14790975571620053.png">' + res.keys[i].keyword + '</a>';
                }
            }
            },
            complete: function complete(res) {}
        });
    };

    // 插入历史和热词事件
    function insertSearchWord(insertbox) {

        var _box = $(insertbox),
            _history = getHistorySearchWord(),
            _html = (_history ? '<dl class="search_key-box">\n                    <dt class="clearfix">'+history_search+'\n                      <a class="float-right deleteHistoryWord" href="javascript://"><svg role="img" class="icon icon-delete"><use xlink:href="#delete"></use></svg></a>\n                    </dt>\n                    <dd class="d-flex flex-wrap">' + _history + '</dd>\n                </dl>' : "") + (HOT_SEARCH_WORD_HTML ? '<dl class="search_key-box">\n                    <dt class="clearfix">'+hot_search_tip+'</dt>\n                    <dd class="d-flex flex-wrap search_hot_key">' + HOT_SEARCH_WORD_HTML + '</dd>\n                </dl>' : "");

        _box.length > 0 && _box.empty().append(_html);
    };

    /* google analytics 预设搜索词事件 hot searched中 普通的热词 */
    function searchGoods(search_string) {
        if (search_string != '' && search_string.toLowerCase() != 'search') {

            /* google analytics 搜索 */
            var event_time = Math.round(new Date().getTime());
            gtag('event', 'search', {
                'event_category': 'search',
                'event_action': ga_client_id || "-",
                'event_label': event_time,
                'non_interaction': 'true',
                'dimension1': search_string || "-"
            });
            
            search_string = search_string.replace(/%/g, '%25'); // 解决搜索 % 的问题
            window.location.href = '/s/' + search_string;
        }
    }
    getHotSearched(); // 默认执行获取推荐的搜索热词
    $(".wrap-item .search-icon").on("click", function () {
        var str=$('.container-fluid.search-wrap').attr('style')
        if(str){
            $(this).attr('src','https://images.komily.com/banner/2021/09/07/14790743225641980.png')
            $('.container-fluid.search-wrap').removeAttr('style')
        }else{
            $(this).attr('src','https://images.komily.com/banner/2021/09/07/14790741171793230.png')
            $('.container-fluid.search-wrap').show()
        }
    });

    // 绑定搜索表单提交事件
    $(document).on("submit", "#searchFormPC, #searchFormM", function (e) {
        e.stopPropagation();

        var _thisForm = $(this),
            _value = $.trim(_thisForm.serializeArray()[0].value),
            _placeholder = _thisForm.find("input[name='search']").attr("placeholder");

        if (!_value) _value = _placeholder; //  未输入搜索词时取占位符词

        setHistorySearchWord(_value); // 提交表单时存储搜索词

        searchGoods(_value);
    });

    // 绑定删除搜索历史事件
    $(document).on("click", ".deleteHistoryWord", function () {
        var _this = $(this);
        _this.parents("dl").remove();
        localStorage.removeItem("__localSearchWord");
    });

    /* google analytics 预设搜索词事件 hot searched中 普通的热词 */
    $(document).on("click", ".searchWord", function (event) {
        event.preventDefault();
        var _this = $(this),
            _txt = _this.text();

        setHistorySearchWord(_txt); // 提交表单时存储搜索词

        searchGoods(_txt);
    });

    // PC搜索下拉菜单打开时插入数据
    $("#searchDropdownMenu").on("show.bs.dropdown", function () {
        var _wordBox = $(this).find(".hotWordBox");
        insertSearchWord(_wordBox);
    });

    // M搜索弹窗打开时插入数据
    $("#searchModal").on("show.bs.modal", function () {
        var _wordBox = $(this).find(".hotWordBox");
        insertSearchWord(_wordBox);
    });

    // 绑定重置按钮点击事件
    $("#searchFormM").on("click", "button[type='reset']", function (e) {
        var _wordBox = $(".hotWordBox");
        insertSearchWord(_wordBox); // 先恢复到搜索热词初始化的状态

        $(this).hide();
    }); //  隐藏清空按钮
    $("#searchFormPC, #searchFormM")
    .on("focus", "input[name='search']", function (e) {
        var _this = $(this),
            _d = _this.data("default_value"),
            _v = _this.val();
        if (_v == _d) _this.val("");
    })
    .on("blur", "input[name='search']", function (e) {
        var _this = $(this),
            _d = _this.data("default_value"),
            _v = _this.val();
        if (_v == "" || _v == undefined) _this.val(_d);
    })
    .on("keyup", "input[name='search']", function (e) {
        var _this = $(this),
            _html = "",
            _v = $.trim(_this.val()),
            _wordBox = _this.parents("form").find(".hotWordBox"),
            _isDropdown = _this.attr("data-toggle"),
            _isDropdownClose = _this.attr("aria-expanded"),
            _resetBtn = _this.siblings("button[type='reset']");
        if (_isDropdown == "dropdown" && _isDropdownClose == "false") {
            _this.trigger("click"); // 解决下拉菜单关闭状态下输入时自动打开菜单
        };
        if (_v) {
            _resetBtn.show(); //  显示清空按钮
        } else {
            _resetBtn.hide(); //  隐藏清空按钮
            insertSearchWord(_wordBox);
        }
    });

    /* google analytics 预设搜索词事件 hot searched中 火爆的热词 */
    $(document).on('click', '.searchFireWord', function (event) {
        event.preventDefault();

        var _this = $(this),
            data_keyword_id = _this.attr('data-keyword-id'),
            data_keyword_name = _this.attr('data-keyword-name');

    if (data_keyword_id && typeof (data_keyword_id) != 'undefined') {
          var event_time = Math.round(new Date().getTime());

          gtag('event', 'click_search_term', {
            'event_category': 'click_search_term',
            'event_action': ga_client_id || "-",
            'event_label': event_time,
            'non_interaction': 'true',
            'dimension1': data_keyword_id || "-",
            'dimension2': data_keyword_name || "-"
          });
        }

        setHistorySearchWord(data_keyword_name); // 提交表单时存储搜索词

        window.location.href = _this.attr('href');
    });
})