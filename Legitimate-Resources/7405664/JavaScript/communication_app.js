var link_url = ''
window._communication_app_data = {
    // h5 定义的页面类型
    // key (app_link_type_id + '-' + _h5_type)
    _page_type: {
        '20001-1': oldToNew, // 老带新 - 获取用户登录状态
        '20001-2': newComerData, // 新人专享 - 获取用户登录状态
        '20002-2': newComers, // 新人专享 
        '20001-3': getLoginInfo, // 0元购 - 获取用户登录状态
        '20003-3': getSizeInfo, // 0元购 - 获取尺码信息
        '20004-3': freeRulePopup, // 0元购 - 获取助力结果
    },
    _userInfo: {
        '20004-3' : 'init',
        data: {
            status: 'status'
        }
    }
}
// app 调用 js
window.unionEntrance = function (app_data) {

    var _h5_type = Number($('#_h5_page_type').val())
    var _methods = String(app_data.data.app_link_type_id) + '-' + String(_h5_type)
    for (var i in app_data.data) {
        _communication_app_data._userInfo.data[i]   = app_data.data[i]
        _communication_app_data._userInfo[_methods] = app_data
    }
    _communication_app_data._page_type[_methods] && _communication_app_data._page_type[_methods](app_data)

    if (app_data.data.app_link_type_id === 20000) return returnData(_h5_type)

}

// js 调用 app
window.__unionEntrance = function (data) {
    if (__device_type().android) {
        window.interaction.unionEntrance(JSON.stringify(data))
    }
    if (__device_type().ios || __device_type().ipad) {
        window.webkit.messageHandlers.unionEntrance.postMessage(JSON.stringify(data))
    }
}

function returnData(_h5_type) {
    return JSON.stringify({
        code: 0,
        msg: 'success',
        data: {
            app_link_type_id: 20000,
            h5_type: _h5_type,
        }
    })
}

function oldToNew(data) {
    getActivityStatus()
    $('.m-bamboozle-user-bg').attr('style', 'margin-top:0')
    $('.m-login-block').hide()
    $('.h5-login-block-view').show()
    if (!data.data.user_id) {
        $('.login-status-1').attr('style', 'display:flex')
    } else {
        $('.login-status-2').attr('style', 'display:flex')
    }
}

function getSizeInfo (data) {

    openModalLoading()

    var _spu_list  = []
    var _spu_list2 = []
    var _size      = data.data.size_text
    var _thumbnail = data.data.thumbnail_url
    var _product   = data.data.product_url
    var _spu       = data.data.spu_id
    var _sku       = data.data.sku_id
    var _activity  = data.data.activity_id
    var _status    = 'init'

    $(".m-free-progress-product-view").each(function () {
        _spu_list.push($(this).find('.m-free-progress-size-context').data('spu-id'))
        var child = $(this).find('.m-free-progress-list-button')
        if (_spu == child.find('.m-free-progress-list-left').data('spu-id')) {
            child.siblings('.m-free-progress-size-view').find('.m-free-progress-size-circular-img').attr('src', _thumbnail)
            child.siblings('.m-free-progress-size-view').find('.m-free-progress-size-text').html(_size)
            child.parents('.m-free-progress-product-list-view').find('.free-progress-product-url').attr('src', _product)
            $(this).find('.m-free-progress-size-context').data('sku-id', _sku)
            $(this).find('.m-free-progress-product-list-left').find('a').data('sku-id', _sku)
            _status = $(this).find('.m-free-product-button').data('status')
        }
    })

    $(".m-free-product-list-view").each(function () {
        _spu_list2.push($(this).find('.m-free-product-list-button').data('spu-id'))
        if (_spu == $(this).find('.m-free-product-list-button').data('spu-id')) {
            $(this).remove()
        }
    })

    getfreeActivityStatus({
        activity_id : _activity,
        spu_id      : _spu,
        sku_id      : _sku,
        type        : 'get_activity_url',
    }, function (res) {

        var _length = $('.m-free-progress-product-view').length
        if (_length < 3 || (_length >= 3 && _progress_page == 2)) {
            if (_spu_list.indexOf(parseInt(_spu)) == -1) {
                $('#list-box').append(res.data_html)
            }
    
            if (_spu_list.indexOf(_spu) >= 0) {
                $(".m-free-progress-product-view").each(function () {
                    if (_spu == $(this).find('.m-free-progress-list-button').data('spu-id')) {
                        $(this).replaceWith(res.data_html)
                    }
                })
            }
        }

        $(".m-free-progress-product-view").each(function () {
            var child = $(this).find('.m-free-progress-list-button')
            if (_spu == child.find('.m-free-progress-list-left').data('spu-id')) {
                _status = $(this).find('.m-free-product-button').data('status')
            }
        })

        $('.m-free-progress-product-more')[$(".m-free-progress-product-view").length ? 'hide' : 'show']()

        if (_length >= 3 && _progress_page == 1) {
            progressProduct(1, function (data) {
                setTimeout(closeModalLoading, 500)
                $('.m-free-progress-product-more')[data.count <= 3 ? 'hide' : 'show']()
            })
        }
        
        if (_status == 1 || _status == 2) {
            __unionEntrance({
                code : 0,
                msg  : 'success',
                data : {
                    app_link_type_id : 10001,
                    share_url        : res.link_url
                }
            })
        }

        setTimeout(closeModalLoading, 500)

    })
}

function freeRulePopup (res) {

    var _user_id = _communication_app_data._userInfo.data && _communication_app_data._userInfo.data.user_id
    
    $.ajax({
        type     : 'GET',
        async    : true,
        dataType : 'JSON',
        url      : '/activity/list/free-activity-assist-sku?utm_token=' + getQueryString('utm_token') + '&user_id=' + _user_id,
        success  : function success(data) {
            $('#m-free-progress-share').html(data.html)
            setTimeout(closeModalLoading, 500)
        }
    })

}

function getLoginInfo (result) {
    var _user_id = _communication_app_data._userInfo.data && _communication_app_data._userInfo.data.user_id
    setTimeout(closeModalLoading, 500)
    getHomeRecommendForYou(1, 40)
    $.ajax({
        type     : 'GET',
        async    : true,
        dataType : 'JSON',
        url      : '/activity/list/free-activity-assist-sku?utm_token=' + getQueryString('utm_token') + '&user_id=' + _user_id,
        success  : function success(data) {
            $('#m-free-progress-share').html(data.html)
            setTimeout(closeModalLoading, 500)
        }
    })
    if (!result.data.user_id) return false
    $('.m-free-progress-product-bg').show()
    progressProduct(1, function (data) {
        $('#m-free-progress-loading').hide()
        $('#list-box').html(data.data)
        $('.m-free-progress-title')[data.count > 0 ? 'show' : 'hide']()
        $('.m-free-progress-product-bg')[data.count > 0 ? 'show' : 'hide']()
        $('.m-free-progress-product-more')[data.count <= 3 ? 'hide' : 'show']()
        setTimeout(closeModalLoading, 500)
    })
    setTimeout(closeModalLoading, 500)
    getHomeRecommendForYou(1, 40)
    function getHomeRecommendForYou (page, length) {
        
        var _page = page || 1,
            _size = length

        if (__device_type().mobile) _size = 40; // 移动端展示30个

        var _user_id = _communication_app_data._userInfo.data && _communication_app_data._userInfo.data.user_id
        var _data = _user_id ? 'limit=' + _size + '&page=' + _page + '&user_id=' + _user_id : 'limit=' + _size + '&page=' + _page
        $.ajax({
            type: "GET",
            data: _data,
            url: '/activity/list/get-free-activity-spu',
            success: function success(data) {
                if (!data || data == 0) {
                    $("#loadingImags").attr('style', 'display: none !important')
                    if (!__device_type().app) {
                        $("#footer").show()
                        // $(document).scrollTop($(document).height());
                    }
                    return false
                }
                $('.m-free-product-view').html(data)
                initPageStatus()
            }
        });
    }
}

function newComers(result) {
    receData(result)
}

function newComerData(res) {
    resData(res)
}

window.getfreeActivityStatus = function (obj, call) {

    var _info    = _communication_app_data._userInfo
    var isMobile = __device_type().mobile
    var channel  = getQueryString('channel')
    var _app     = __device_type().app
    var vsid     = getQueryString('vsid') || window._app_data.vsid || getCookie('vsid')
    var param = {
        activity_id : obj.activity_id,
        sku_id      : obj.sku_id,
        spu_id      : obj.spu_id,
    }

    if (obj.type) {
        param.type = obj.type || 'get_activity_url'
    }

    if (_info && _info.data && _info.data.user_id) {
        param.user_id = _info.data.user_id
    }

    $.ajax({
        type     : 'GET',
        async    : true,
        dataType : 'JSON',
        data     : param,
        url      : '/activity/list/generate-free-activity-url',
        success  : function success(data) {

            link_url = vsid ? data.link_url + '&vsid=' + vsid : data.link_url

            //2表示活动结束
            if (data.error == 2 && call) {
                window.location.href = '/activity/list/free-activity-end-index'
                return false
            }

            if (channel) {
                link_url += '&channel=' + channel
            }
            
            else {
                link_url += !isMobile ? '&channel=2' : _app ? '&channel=4' : '&channel=3'
            }

            if (call === 'copy') {
                __copyText(link_url)
                return false
            }

            data.link_url = link_url
            window.share_url.free_url = link_url

            call && call(data)

        }
    })
}
