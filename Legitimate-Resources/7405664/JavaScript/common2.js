require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({2:[function(require,module,exports){
'use strict';

require('./header.js');

window.sessionStorage.setItem('CONTROLS_KEY', '');
window.sessionStorage.setItem('THUMBS_LIST', '');
$(document).on('show.bs.modal', '#quickViewModal', function () {
  window.sessionStorage.setItem('CONTROLS_KEY', '');
  window.sessionStorage.setItem('THUMBS_LIST', '');
});
  window.yypm_devices_type = isMobileDevices() ? 'm.' : 'www.'
  window.add_items_code = ''

  window.yypmUrl = function (data) {
      var url = data.url
      var index = data.index
      var isNull = url.indexOf('?') != -1
      url = url + (isNull ? '&' : '?')  +'yypm=' + yypm_devices_type + window._page + '.add_items.' + index
      return url
  }
window.addMoreLinksDetail = function (ele) {
    var $more = $(ele).next('.more-hook');
    var line = $(ele).data('line');
    var outerH = Math.round($(ele).height()) + 30,
        innerH = Math.round($(ele + '-inner').height());
    outerH < innerH ? $more.show() : $more.hide();

    $more.find('.more').on('click', function () {
      $(ele).toggleClass('unfold');
    });
  }
window.ctagDeviceValue = function () {
    var device = 0
    if (!__device_type().mobile) {
      device = 0
    }
    if (__device_type().android) {
      device = 1
    }
    if (__device_type().ios || __device_type().ipad) {
      device = 2
    }
    return device
  }
window.pageStatus = function (_methods, share) {

  var sku = $(this).data('sku')
  window.product_info.sku = sku
  window.product_info.sku_id = $(this).data('sku-id')

  var data = {
      sku_id: $(this).data('sku-id'),
      spu_id: $(this).data('spu-id'),
      activity_id: $(this).data('activity-id'),
  }
  if (share) {
      data.type = 'get_activity_url'
  }
  if (_methods.sku_id) {
    data.sku_id = _methods.sku_id
    window.product_info.sku_id = _methods.sku_id
  }
  if (_methods.type) {
      data.type = _methods.type
  }
  getfreeActivityStatus(data, function (res) {
      var _app = __device_type().app
      var _user_id = _communication_app_data._userInfo.data && _communication_app_data._userInfo.data.user_id
      var _back_url = '/user/member/login?back_url=' + window.location.href
      var _user_is_login = window.user_is_login
      if (_app && !_user_id) {
          closeModalLoading()
          if (_methods.unwantedLoginApp) {
              _methods.unwantedLoginApp(res) // 与登录态无关的交互
              return false
          }
          __unionEntrance({ code: 0, msg: 'success', data: { app_link_type_id: 10000 } })
          _methods.noLoginApp && _methods.noLoginApp(res)
      }
      else if (_app && _user_id) {
          closeModalLoading()
          _methods.unwantedLoginApp && _methods.unwantedLoginApp(res) // 与登录态无关的交互
          _methods.loginApp && _methods.loginApp(res)         // APP 已登录
      }
      else if (!_app && !_user_is_login) {
          closeModalLoading()
          if (_methods.unwantedLoginH5) {
              _methods.unwantedLoginH5(res) // 与登录态无关的交互
              return false
          }
          window.location.href = _back_url
          _methods.noLoginH5 && _methods.noLoginH5(res)
      }
      else if (!_app && _user_is_login) {
          _methods.unwantedLoginH5 && _methods.unwantedLoginH5(res) // 与登录态无关的交互
          _methods.loginH5 && _methods.loginH5(res)         // H5  已登录
      }
  })
}

var callAppTimer = null;
function visibilitychangeHandler() {
  if (callAppTimer) {
    clearTimeout(callAppTimer);
    callAppTimer = null;
    document.removeEventListener('visibilitychange', visibilitychangeHandler);
  }
}
  window.share_url = {
    free_url : ''
  }

  window.product_info = {}

  window.openModalLoading = function () {
      $('#quickViewModal').addClass('modal-loading')
      $('#quick-modal-body').html('<div class="la-ball-clip-rotate align-self-center"><div></div></div>')
      $('#quickViewModal').modal('show')
  }
  window.closeModalLoading = function () {
      $('#quickViewModal').modal('hide')
  }
  window._openApp = function () {
      var APP = new callAppHj()
      APP.__openApp()
  }
  window.ctagDownload = function (ad_sign, link_type, btn_type) {
    ctag('InviteAppPage', {
        ad_sign: ad_sign,
        link_type: link_type,
        btn_type: btn_type,
        userid: window.currency_user_id || window.current_distinct_id ,
        pagename: window._page,
        event: 'InviteAppPage'
    });
  }
  window._debounce = function (delay) {
      let timer = null
      return function (fn) {
          if (timer) clearTimeout(timer)
          timer = setTimeout(fn, delay)
      }
  }
  window.__scrollBottom = function (call) {
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop()
        var scrollHeight = $(document).height()
        var windowHeight = $(this).height()
        if (scrollTop + windowHeight == scrollHeight) {
          call && call()
        }
    })
  }
window.__copyText = function (url) {
  var tag = document.createElement('input')
  tag.setAttribute('id', 'cp_hgz_input_link')
  tag.value = url
  document.getElementsByTagName('body')[0].appendChild(tag)
  document.getElementById('cp_hgz_input_link').select()
  document.execCommand('copy')
  document.getElementById('cp_hgz_input_link').remove()
  $('body').toast('Copy Success')
}
window.__device_type = function () {
  var u = navigator.userAgent;
  return {
    android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    ios     : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    ipad    : u.indexOf('Macintosh') >= 0,
      mobile  : navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
      app     : u.includes('KoMiLy')
  }
}
var bottomAppLink=''; //底部二维码点击链接
window.__qrcode = function (obj) {
  var _app_data = window._app_data
  var param     = ''
  var data      = {
        ad_sign   : obj.ad_sign,
        page_name : window._page,
        userid    : window.currency_user_id || window.current_distinct_id,
        btn_type  : obj.btn_type || 0,
  }
  for (var i in _app_data) {
        data[i] =  getQueryString(i) || _app_data[i]
  }
  for (var i in data) {
      param += '&' + i + '=' + data[i]
  }
  var qrLink      = location.origin + '/dwn?m='
  var default_url = location.origin + '/activity/list/download-index?link_type=scan' + param
    if (obj.url) {
      default_url = obj.url
    }
  $.ajax({
      type     : 'POST',
      async    : true,
      dataType : 'JSON',
      url      : '/activity/list/generate-seo-url',
      data     : {
          link_url : default_url,
      },
      headers  : { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
      success  : function success(res) {
          var _url = res.code == 0 ? qrLink += res.data : default_url
          if (obj.watch) {
              _url = _url + '&watch=true'
          }
          document.getElementById(obj.id) !== null && document.getElementById(obj.id).appendChild(qrcanvas.qrcanvas({
              data     : _url,
              cellSize : obj.cellSize || 4,
              padding  : 4,
          }))
          bottomAppLink = _url
      }
  })
}
window.callAppHj = function (params) {
    var _type = ''
    var _params = Object.prototype.toString.call(params) === '[object Object]'
    if (_params) {
      _type = params.type || ''
    } else {
      _type = params
    }
  this.u                    = navigator.userAgent
  this.time                 = null
  this.params               = params || {}
  this.type                 = _type
  this.scheme_url           = 'komily://eventHandle?active=' + this.__sendApp(_params ? params : '') // 打开 app 的协议
  this.ios_download_url     = window.app_ios_download + '?mt=8' // ios 下载链接
  this.android_download_url = window.app_android_download // android 下载链接
  this.download_url = ''
  switch (_type) {
      case 'ios':
          this.download_url = this.ios_download_url
          break;
      case 'android':
          this.download_url = this.android_download_url
          break;
      default:
          if (__device_type().android) {
              this.download_url = this.android_download_url
          }
            if (__device_type().ios || __device_type().ipad) {
              this.download_url = this.ios_download_url
          }
          break;
  }
}
callAppHj.prototype.__closewin = function () {
  setTimeout(location.reload())
}
callAppHj.prototype.__openApp = function () {
  if (this.type && this.type !== 'ios'     && __device_type().ios    ) return false
  if (this.type && this.type !== 'android' && __device_type().android) return false
  if (this.type && this.type !== 'ios'     && __device_type().ipad   ) return false
  reportSource(this.__browserType.bind(this), this.params)
}
callAppHj.prototype.__browserType = function () {
  var type = this.u
  var url  = this.download_url
    if (type.indexOf('FB') >= 0) {
      this.__downloadFacebookbApp(url)
      return false
    }
    if (type.indexOf('Gecko') >= 0 && type.indexOf('Chrome') >= 0 && type.indexOf('Android') >= 0) {
      this.__downloadAndroidApp(url)
      return false
    }
  if (type.indexOf('Gecko') >= 0 && type.indexOf('Safari') >= 0 && type.indexOf('Version') >= 0) {
      this.__downloadSafariApp(url)
    } else if (type.indexOf('Gecko') >= 0 && (type.indexOf('FBAN') >= 0 || type.indexOf('FBIOS') >= 0 || type.indexOf('FBSN') >= 0) || type.indexOf('FBMD') >= 0 || type.indexOf('FB') >= 0) {
      this.__downloadFacebookbApp(url)
  } else if (type.indexOf('Gecko') >= 0 && type.indexOf('CriOS') >= 0) {
      this.__downloadChromeApp(url)
  } else if (type.indexOf('Gecko') >= 0 && type.indexOf('Chrome') >= 0) {
      this.__downloadOtherApp(url)
  } else if (type.indexOf('Gecko') >= 0 && type.indexOf('FxiOS') >= 0) {
      this.__downloadFacebookbApp(url)
  } else if (type.indexOf('Gecko') >= 0 && type.indexOf('firefox') >= 0) {
      this.__downloadOtherApp(url)
  } else if (type.indexOf('Gecko') >= 0 && type.indexOf('Quark') >= 0) {
      this.__downloadFacebookbApp(url)
  } else if (type.indexOf('Gecko') >= 0 && type.indexOf('UCBrowser') >= 0) {
      this.__downloadChromeApp(url)
  } else {
      this.__downloadOtherApp(url)
  }
}
callAppHj.prototype.__downloadFacebookbApp = function (url) {
  _app_time = setInterval(function () {
      clearInterval(_app_time)
      location.href = url
  }.bind(this), 3000)
  location.href = this.scheme_url
}
callAppHj.prototype.__downloadChromeApp = function (url) {
  _app_time = setTimeout(function () {
      clearTimeout(_app_time)
      location.href = url
  }.bind(this), 3000)
  location.href = this.scheme_url
}
callAppHj.prototype.__downloadSafariApp = function (url) {
  location.href = this.scheme_url
  setTimeout(function () {
    $('body').append("<a id='download' href='" + url + "'></a>")
    var obj = document.getElementById('download')
    obj.click()
    this.__closewin()
  }.bind(this))
}
callAppHj.prototype.__downloadAndroidApp = function (url) {
    _app_time = setTimeout(function () {
        clearTimeout(_app_time)
        location.href = url
    }.bind(this), 3000)

    location.href = this.scheme_url
  }
callAppHj.prototype.__downloadOtherApp = function (url) {
  location.href = this.scheme_url
  setTimeout(function () {
    location.href = url
  })
}
callAppHj.prototype.__sendApp = function (params) {
  var __app_data_ = window._app_data
  var app_data = {
      'id': 0,
      'position_id': 0,
      'ad_name': '',
      'ad_link': '',
      'app_code': '',
      'app_link_type_id': getQueryString('app_link_type_id') || __app_data_.app_link_type_id,
      'cate_id': 0,
      'spu_id': 0,
      'sku_id': 0,
      'coupon_id': 0,
      'flash_sale_id': 0,
      'order_id': 0,
      'tickets_id': 0,
      'coupon_sn': '',
      'bonus_id': 0,
      'tag_id': 0,
      'article_id': 0,
      'sale_id': 0,
      'app_code_width': 0,
      'app_code_height': 0,
        'link_url': getQueryString('link_url') || window.location.href,
      'recommend': getQueryString('recommend') || __app_data_.recommend,
  }
  switch (Number(getQueryString('app_link_type_id') || __app_data_.app_link_type_id)) {
      case 2: // home
          break;
      case 3: // category
          app_data.cate_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 4: // goods
          app_data.spu_id = getQueryString('spu_id') || __app_data_.spu_id
          app_data.sku_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 5: // h5 topic
        app_data.ad_link = app_data.link_url
          break;
      case 6: // coupon
          break;
      case 7: // flash sale in
          app_data.flash_sale_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 8: // flash sale pre
          app_data.flash_sale_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 9: // h5 page
            app_data.ad_link = app_data.link_url
          break;
      case 10: // register
          break;
      case 11: // help
          app_data.tickets_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 12: // order
          app_data.order_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 13: // coupon_sn
          break;
      case 14: // bonus
          break;
      case 15: // tag
          app_data.tag_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 16: // new goods page
          break;
      case 19: // system notify
          app_data.article_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 22: // more sale page
          app_data.sale_id = getQueryString('app_link_id') || __app_data_.app_link_id
          break;
      case 23: // help page
          break;
  }
  app_data.campaign_type = getQueryString('campaign_type') || __app_data_.campaign_type || '0'
  app_data.vsid = getQueryString('vsid') || __app_data_.vsid || getCookie('vsid')
  app_data.recommend = getQueryString('recommend') || __app_data_.recommend
  app_data.user_id  = window.website_user_id  
  if (params) {
    for (var i in params) {
        app_data[i] = params[i]
    }
  }
  var active = JSON.stringify(removeEmptyField(app_data))
  return encodeURIComponent(active)
}
window._app_time = null
document.addEventListener('visibilitychange', function () {
  if (typeof document.hidden !== "undefined") {
      __clearInterval()
  } else if (typeof document.mozHidden !== "undefined") {
      __clearInterval()
  } else if (typeof document.msHidden !== "undefined") {
      __clearInterval()
  } else if (typeof document.webkitHidden !== "undefined") {
      __clearInterval()
  }
})
window.__clearInterval = function () {
  clearInterval(_app_time)
}
window.removeEmptyField = function (obj) {
  var newObj = {}
  if (typeof obj === 'string') {
      obj = JSON.parse(obj)
  }
  if (obj instanceof Array) {
      newObj = []
  }
  if (obj instanceof Object) {
      for (var attr in obj) {
          if (obj.hasOwnProperty(attr) && obj[attr] !== '' && obj[attr] !== null && obj[attr] !== undefined && obj[attr] !== 0) {
              if (obj[attr] instanceof Object) {
                  if (JSON.stringify(obj[attr]) === '{}' || JSON.stringify(obj[attr]) === '[]') {
                      continue
                  }
                  newObj[attr] = removeEmptyField(obj[attr])
              } else if (
                  typeof obj[attr] === 'string' &&
                  ((obj[attr].indexOf('{') > -1 && obj[attr].indexOf('}') > -1) ||
                      (obj[attr].indexOf('[') > -1 && obj[attr].indexOf(']') > -1))
              ) {
                  try {
                      var attrObj = JSON.parse(obj[attr])
                      if (attrObj instanceof Object) {
                          newObj[attr] = removeEmptyField(attrObj)
                      }
                  } catch (e) {
                      newObj[attr] = obj[attr]
                  }
              } else {
                  newObj[attr] = obj[attr]
              }
          }
      }
  }
  return newObj
}
  window.getQueryString = function (name, url) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (url) {
      var search = '?' + url.split('?')[1];
      r = search.substr(1).match(reg)
    }
    if (r != null) return unescape(r[2]); return null;
  }
  window.__changeURLArg = function (url,arg,arg_val){
      var pattern=arg+'=([^&]*)';
      var replaceText=arg+'='+arg_val;
      if(url.match(pattern)){
          var tmp='/('+ arg+'=)([^&]*)/gi';
          tmp=url.replace(eval(tmp),replaceText);
          return tmp;
      }else{
          if(url.match('[\?]')){
              return url+'&'+replaceText;
          }else{
              return url+'?'+replaceText;
          }
      }
  }
  window.getCookie = function (cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]){
            return arr[1];
        }
    }
    return "";
  }
  window.reportSource = function (call, params) {
    var bbb = {}
    for (var i in window._app_data) {
      bbb[i] = getQueryString([i]) || window._app_data[i]
    }
    for (var i in params) {
        if (params && params.report_source != 2 && i == 'app_link_type_id') {
          bbb[i] = params[i]
      }
  }
  if (params && params.order_id) {
    bbb.app_link_id = params.order_id
  }
  $.ajax({
      type: 'POST',
      async: true,
      dataType: 'JSON',
      url: window._app_track_url,
      data: bbb,
      // headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
      success: function success(data) {
          setTimeout(function() {
            call && call()
          })
      }
  });
}
window.openApp = function (callback, isDetail) {
  var isIphone = /iphone/i.test(navigator.userAgent);
  if (callback) {
    // 1 秒未离开页面，则认为唤起失败
    callAppTimer = setTimeout(function () {
      callback();
    }, 1000);
    document.addEventListener('visibilitychange', visibilitychangeHandler);
  }
  if (isDetail) {
    // https://www.komily.com/Life-Is-Good-Floral-Tank---Blue-g-73996-478653
    var match = /-g-(\d+)-(\d+)$/.exec(location.pathname);
    if (!match) return;
    var search = '?spu=' + match[1] + '&sku=' + match[2];
    var scheme = isIphone ? window.app_ios_detail_scheme : window.app_android_detail_scheme;
    top.location = scheme + search;
  } else {
    top.location = isIphone ? window.app_ios_scheme :  window.app_android_scheme;
  }
};

// 绑定菜单滑过事件
var NAV_TIMER = null;
$("nav.nav-menu").on("mouseenter", "li.nav-item", function (e) {
  var _this = $(this);
  NAV_TIMER && clearTimeout(NAV_TIMER);
  NAV_TIMER = setTimeout(function () {
    _this.addClass("hover");
    ctag('ToggleMenu', e, 'open');
  }, 500)
});
$("nav.nav-menu").on("mouseleave", "li.nav-item", function (e) {
  var _this = $(this);
  NAV_TIMER && clearTimeout(NAV_TIMER);
  _this.removeClass("hover");
  ctag('ToggleMenu', e, 'close');
});
var cart_msg = '';
/* google analytics 访问页面事件 */
var event_time = Math.round(new Date().getTime());
gtag('event', 'view_page', {
  'event_category': 'view_page',
  'event_action': ga_client_id || "-",
  'event_label': event_time,
  'non_interaction': 'true'
});

/* google analytics 点击广告图 */
$(document).on('click', 'a.index-ad', function (event) {
  var data_position_id = $(this).attr('data-position-id');
  var data_ad_id = $(this).attr('data-ad-id');
  var data_position_name = $(this).attr('data-position-name');
  var data_ad_title = $(this).attr('data-title');
  var data_ad_url = $(this).attr('data-url');
  if (typeof data_position_id != 'undefined' && typeof data_ad_id != 'undefined') {
    var event_time = Math.round(new Date().getTime());
    gtag('event', 'click_ad', {
      'event_category': 'click_ad',
      'event_action': ga_client_id || "-",
      'event_label': event_time,
      'non_interaction': 'true',
      'dimension1': data_position_id || "-",
      'dimension2': data_ad_id || "-",
      'dimension3': data_position_name || "-",
      'dimension4': data_ad_title || "-",
      'dimension5': data_ad_url || "-"
    });
  }
});
/* 获得选定的商品属性 */
function getSelectedAttributes(formBuy) {
  var spec_arr = [];
  var j = 0;
  var i = 0;
  for (i = 0; i < formBuy.elements.length; i++) {
    var prefix = formBuy.elements[i].id.substr(0, 5);
    if (prefix == 'spec_' && formBuy.elements[i].type == 'hidden' && formBuy.elements[i].disabled == false) {
      var g_v;
      if (document.getElementById('text_value_' + formBuy.elements[i].value)) {
        if ($.trim($('#text_value_' + formBuy.elements[i].value).val()) != '') {
          g_v = formBuy.elements[i].value + ':' + document.getElementById('text_value_' + formBuy.elements[i].value).value;
          spec_arr[j] = g_v;
        }
      } else {
        g_v = formBuy.elements[i].value;
        spec_arr[j] = g_v;
      }
      j++;
    }
  }
  return spec_arr;
}

  // 全局变量防重复
  var REPEAT_ADDTOBAG = false; 
/* 添加商品到购物车 */
function addToCart() {
  var sku_id=$('#sku_id').val();
  var spu_id=$('#spu_id').val();
  var goods_number=$('#goods_number').val();
  var rec_id=$('#rec_id').val();
  if(sku_id && spu_id && goods_number>0){
    $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: '/cart/index/add-to-cart',
      data: {'sku_id':sku_id,'spu_id':spu_id,'goods_number':goods_number,'rec_id':rec_id,notify_id:notify_id},
      headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
      success: addToCartResponse
    });
  }
}
window.__debounce_addToBag = _debounce(300)
/* 处理添加商品到购物车的反馈信息 */
function addToCartResponse(result) {
    if(result&&result.confirm_type=='3'){
      setTimeout(function () {
        REPEAT_ADDTOBAG = false;
      }, 2500);
    }else{
      REPEAT_ADDTOBAG = false;
    }
  if (result.error > 0) {
    $('#addToBag').toast({ type: 'failed', msg: result.message, duration: 2000 });
    return false;
  } else {
    /*如果是购物车页面就是*/
    var cartInfo = document.getElementById('AECMP_CARTINFO');
    var cart_url = '/cart/index/index';
    if (cartInfo) {
      cartInfo.innerHTML = result.content;
    }
    if (result.one_step_buy == '1') {
      location.href = result.cart_url;
    } else {
      switch (result.confirm_type) {
        case '1':

          break;
        case '2':
          $('#consignee_content').html(result.ajax_address);
          if (typeof result.cart_empty != 'undefined' && result.cart_empty) {
            window.location.href = result.cart_empty;
            return;
          }
          if (typeof result.cart_html != 'undefined' && result.cart_html) {
            $('#cartList').html(result.cart_html);
          }
          if (typeof result.ajax_shipping != 'undefined' && result.ajax_shipping) {
            $('#ajax_shipping').html(result.ajax_shipping);
          }
          if (typeof result.ajax_payment != 'undefined' && result.ajax_payment) {
            $('#ajax_payment').html(result.ajax_payment);
          }
          if (typeof result.content != 'undefined' && result.content) {
            $('#order-total-block').html(result.content);
          }
          if (typeof result.order != 'undefined' && result.order.shipping_id) {
            $('#default_shipping_id').val(result.order.shipping_id);
          }
          if (typeof result.order != 'undefined' && result.order.pay_id) {
            $('#default_pay_id').val(result.order.pay_id);
          }
          if (result.total.free_shipping_amount_html) {
            $('#free_shipping_amount_html2').html(result.total.free_shipping_amount_html);
          }
          if (result.total_number) {
            $('#cart_total_number').html('(' + result.total_number + ')');
          }
          if (result.total.bonus || result.total.cat_bonus) {} else {
            $('#bonus_sn').removeAttr('data');
          }
          $('#quickViewModal').modal('hide');
          break;
        case '3':
            $('#shopBag .number').hide()
            $('#header .badge').hide()
          $('#menu_cart').html(result.product_list);
            getShopBagNumber()
            $('.mCart-svg .number').html($('#shopBag .number').html());
            if (isMobileDevices() && window._page != 'cart'){
              var dom=$('.shoping-list ul li').eq(0)
              var color=$(dom).find('.goods-base').find('span').eq(0).html().replace('Color: ','')
              var size=$(dom).find('.goods-base').find('span').eq(1).html().replace('Size: ','')
              $('#mCartTip').html(result.last_add_goods_html);
              $('#mCartTip').fadeIn()
              ctag('BtnClick', {
                btn_type: 'view_bag',
              });
              setTimeout(() => {
                $('#mCartTip').fadeOut()
              }, 2000);
            }
          $('#addToBag').html(add_to_bag_added);
          cart_slide(result);
          if (typeof result.limit_buy_number != 'undefined') {
            $('.goods_limit_buy_number .limit_buy_txt').html(goods_limit_buy_number.replace('%d', result.limit_buy_number));
            $('.goods_limit_buy_number').attr('data-limit', result.limit_buy_number);
            if (result.limit_buy_number == 0) {
                flash_sale_out = 1;
                if (typeof result.limit_buy_number_pretxt != 'undefined' && result.limit_buy_number_pretxt) {
                    cart_msg = result.limit_buy_number_pretxt;
                }
                changeAddToBagBtn(0);
            }else{
                flash_sale_out = 0;
            }
          }
          gtag('event', 'conversion', {'send_to': 'AW-656359492/5jg4CLSMlPwBEMSA_bgC'});
          /* google analytics 加入购物车事件 */
          var event_time = Math.round(new Date().getTime());
          if (typeof current_event_id != 'undefined') {
              var facebook_event_id = 'AddToCart-' + current_event_id;
              fbq('track', 'AddToCart', {}, {eventID: facebook_event_id});
          } else {
              fbq('track', 'AddToCart');
          }
          var data_spu = $("#sku_id").attr('data-spu');
          var data_sku = $("#sku_id").attr('data-sku');
          var data_spu_id = $("#sku_id").attr('data-spu-id');
          gtag('event', 'add_to_bag', {
            'event_category': 'add_to_bag',
            'event_action': ga_client_id || "-",
            'event_label': event_time,
            'non_interaction': 'true',
            'dimension1': data_spu || "-",
            'dimension2': data_sku || "-",
            'dimension3': data_spu_id || "-"
          });

          var data_goods_number = $('#goods_number').val();
          gtag('event', 'add_to_cart', {
            'event_label': event_time,
            "items": [
              {
                "id": "" + data_spu,
                "quantity": data_goods_number
              }
            ]
          });
          break;
        default:
          break;
        }
        function blockTop () {
          $('html,body').animate({ scrollTop: $('#AECMP_RECOMMEND').offset().top - $('.header-wrap').height() }, 500);
        }

        if (window._page === 'goods' && __device_type().mobile) {

          var _header_h = $('.header-wrap').height()
          var _ck_h = $('.m-btn.headroom.headroom--not-bottom').height() + _header_h + $('.m-btn.headroom.headroom--not-bottom').height() + 20
          var _b_h = $('#AECMP_RECOMMEND').height()
          var _scroll_top = $('body').scrollTop()+$('html').scrollTop()
          var _b_top = $('#AECMP_RECOMMEND').offset().top

          if (_b_h <= _ck_h) {
            __debounce_addToBag(blockTop)
          } else {

            if (_scroll_top < _b_top) {
              __debounce_addToBag(blockTop)
            } else {
              if (_scroll_top >= _b_top + _b_h - _ck_h*3 -100) {
                __debounce_addToBag(blockTop)
              }
            }
            
          }
      }
      if (window._page == 'cart') {
          $.ajax({
              type: 'POST',
              dataType: 'JSON',
              url: '/checkout/index/ajax-update-cart',
              data: {
                  data_type : 'reload_cart_goods'
              },
              headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
              success: __changeCartResponse
          });
      }
    }
  }
}
/* 添加购物车 */
$('body').on('click', '#addToBag', function () {
  if(REPEAT_ADDTOBAG) return;
  var t = 0;
  $('.pro-ordinary').each(function () {
    if ($(this).find('a.pro-item.active').length == 0) {
      $('.add-option-tips-' + !$(this).attr('data-attr')).show();
      t++;
    }
  });

  if (t == 0) {
    if ($.trim($(this).attr('data-sale')) == 1) {
        var color_id=parseInt($('.pro-ordinary a.spec_Color.active').attr('namevalue'));
        var size_id=parseInt($('.pro-ordinary a.spec_Size.active').attr('namevalue'));
        var sku_attr_list_array=$.parseJSON(JSON.stringify(sku_attr_list));
        $.each(sku_attr_list_array, function(index, value) {
          var color_number3 = 0;
          if($('.pro-ordinary a.spec_Color').length > 1){
            var color_ids3=new Array();
            $('.pro-ordinary a.spec_Color').each(function(i) {
                if(i == 0){
                    color_ids3.push($(this).attr('namevalue'));
                    color_number3 = 1;
                }else if($.inArray($(this).attr('namevalue'), color_ids3)!=-1) {
                    color_ids3.push($(this).attr('namevalue'));
                    color_number3 = color_number3 + 1;
                }
            })
            if(color_number3 > 1){
                var color_sku_id_tmp3 =$('.pro-ordinary a.spec_Color.active').attr('color_sku_id');
            }else{
                var color_sku_id_tmp3 = 0;
            }
          }else{
            var color_sku_id_tmp3 = 0;
          }
          if(color_sku_id_tmp3){
            index = color_sku_id_tmp3;
          }
          if($.inArray(color_id, value)!=-1 && $.inArray(size_id, value)!=-1){
            $('#sku_id').val(index);
          }
        })
      addToCart();
        REPEAT_ADDTOBAG = true;
    } else {
        if (cart_msg) {
            $(this).toast({ type: 'failed', msg: cart_msg, duration: 2000 });
        } else {
            $(this).toast({type: 'failed', msg: out_of_stock, duration: 2000});
        }
    }
  } else {
    return false;
  }
});

$('body').on('input', '.pro-input', function () {
  this.value.length === 1 ? this.value.replace(/[^1-9]/g, '0') : this.value = this.value.replace(/\D/g, '');
}).on('change', '.pro-input', function () {
  this.value = $.trim(this.value) ? this.value : 1;
  this.value == 1 ? $('.pro-minus').prop({ disabled: true }) : $('.pro-minus').prop({ disabled: false });
  var isOnSale = $(this).attr('data-sale');
  if (isOnSale == '1') {
    var sku_number = parseInt(this.value);
    var sku_id = $(this).data('sku-id');
    var spu_id = $(this).data('spu_id');
    if (sku_number && sku_id && spu_id) {
        checkStock(sku_id, spu_id, sku_number);
    }
  }
});

function getHistory(spu_id) {
  $.ajax({
    type: 'POST',
    dataType: 'html',
    url: '/goods/goods/ajax-history',
    data: { 'spu_id': spu_id},
    headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
    success: function success(data) {
      if (data != '0') {
        $('#AECMP_HISTORY').html(data);
        require('./recentlySwiper.js');
      }
    }
  });
};

// 猜你喜欢
var youLikeSwiper = null;
function youLikeSwiperInit() {
    var winWidth = $(window).width();
    var containerId = '.you-like-wrapper';
    if (winWidth >= 992 && youLikeSwiper === null) {
      youLikeSwiper = new Swiper(containerId + ' .index-swiper', {
        lazy: true,
        slidesPerView: 5,
        slidesPerGroup: 5,
        navigation: {
          nextEl: containerId + ' .swiper-button-next',
          prevEl: containerId + ' .swiper-button-prev'
        },
        watchSlidesVisibility: true,
        breakpoints: {
          480: { //当宽度小于等于320 
            slidesPerView: 2,
            slidesPerGroup: 2
          },
          768: { //当宽度小于等于640  
            slidesPerView: 3,
            slidesPerGroup: 3
          }
        },
        // on: {
        //   init: function init(swiper) {
        //     if ($("#" + containerId + " li.bigdata-li").length > 0) {
        //       (0, _util.bigDataReportOnlyShow)($("#" + containerId + " li.bigdata-li"), 'swiper_refresh');
        //       (0, _util.bigDataReportOnlyShow)($("#" + containerId + " li.bigdata-li"), 'swiper_scroll');
        //     }
        //   },
        //   slideNextTransitionEnd: function slideNextTransitionEnd(swiper) {
        //     if ($("#" + containerId + " li.bigdata-li").length > 0) {
        //       (0, _util.bigDataReportOnlyShow)($("#" + containerId + "  li.bigdata-li"), 'swiper');
        //     }
        //   },
        //   tap: function tap(swiper) {
        //     if ($("#" + containerId + " li.bigdata-li").length > 0) {
        //       (0, _util.bigDataReportOnlyShow)($("#" + containerId + " li.bigdata-li"), 'swiper');
        //     }
        //   }
        // }
      });
    } else if (winWidth < 992) {
      if (youLikeSwiper !== null) {
        youLikeSwiper.destroy();
        youLikeSwiper = null;
      }
      $(containerId).find(".swiper-lazy").each(function (e) {
        var _this = $(this);
        var _original = _this.attr("data-src");
        _this.attr("data-src", _original).addClass("lazyload");
      });
    };
};
  //穿搭
  var OutfitSwiper = null;
  function OutfitSwiperInit() {
    OutfitSwiper = null;
    var winWidth = $(window).width();
    var containerId = '.Outfit-wrapper';
    if (OutfitSwiper === null) {
      OutfitSwiper = new Swiper(containerId + ' .right-swiper .swiper-container', {
        lazy: true,
        slidesPerView: 4,
        slidesPerGroup: 4,
        navigation: {
          nextEl: containerId + ' .swiper-button-next',
          prevEl: containerId + ' .swiper-button-prev'
        },
        watchSlidesVisibility: true,
        breakpoints: {
          768: { //当宽度小于等于640  
            slidesPerView: 2,
            slidesPerGroup: 2
          }
        },
      });
    }
  };
  // 异步获取穿搭模块
  window.getOutfit=function(spu_id,sku_id) {
    $.ajax({
      type: 'POST',
      dataType: 'html',
      url: '/goods/goods/ajax-get-tie-in',
      data: { 'spu_id': spu_id,'select_sku_id':sku_id},
      headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
      success: function success(data) {
        if (data != '0') {
          $('#AECMP_OUTFIT').html(data);
          OutfitSwiperInit()
          $(window).resize(function () { OutfitSwiperInit() });
        }
      }
    });
  };
// 异步获取猜你喜欢模块
function getRecommend(spu_id) {
  $.ajax({
    type: 'POST',
    dataType: 'html',
    url: '/goods/goods/ajax-recommend',
    data: { 'spu_id': spu_id},
    headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
    success: function success(data) {
      if (data != '0') {
        $('#AECMP_RECOMMEND').html(data);
        // require('./youLikeSwiper.js');
        // youLikeSwiper = new Swiper('.you-like-wrapper .swiper-container', {
        //   direction: 'horizontal', // 水平切换选项
        //   observer: true,
        //   observeParents: true,
        //   lazy: true,
        //   // 如果需要前进后退按钮
        //   slidesPerView: 5,
        //   slidesPerGroup: 5,
        //   navigation: {
        //     nextEl: '.you-like-wrapper .swiper-button-next',
        //     prevEl: '.you-like-wrapper .swiper-button-prev'
        //   },
        //   pagination: {
        //     el: '.you-like-wrapper .swiper-pagination'
        //   },
        //   breakpoints: {
        //     480: { // 当宽度小于等于320
        //       slidesPerView: 2,
        //       slidesPerGroup: 2
        //     },
        //     768: { // 当宽度小于等于640
        //       slidesPerView: 3,
        //       slidesPerGroup: 3
        //     }
        //   }
        // });
        youLikeSwiperInit();
        $(window).resize(function () {console.log(3456); youLikeSwiperInit() });
      }
    }
  });
};

function getNewGoods(ele_div_id) {
  /*
  $.get('/goods/index/ajax_new_goods', function (data) {
    if (data != '0') {
      $(ele_div_id).append(data);
      window.setTimeout(function () {

        // 新品
        var newSwiper = undefined;
        newSwiperUpdate();
        $(window).resize(function () {
          newSwiperUpdate();
        });
        function newSwiperUpdate() {
          var winWidth = $(window).width();
          if (winWidth >= 992 && newSwiper == undefined) {
            newSwiper = new Swiper('.new-arrival-swiper .swiper-container', {
              direction: 'horizontal', // 水平切换选项
              // 如果需要前进后退按钮
              slidesPerView: 5,
              navigation: {
                nextEl: '.new-arrival-swiper .swiper-button-next',
                prevEl: '.new-arrival-swiper .swiper-button-prev'
              },
              breakpoints: {
                1600: { // 当宽度小于等于1600
                  slidesPerView: 4
                }
              }
            });
          } else if (winWidth < 992 && newSwiper != undefined) {
            newSwiper.destroy();
            newSwiper = undefined;
            $('.new-arrival-swiper .swiper-wrapper').removeAttr('style');
            $('.new-arrival-swiper .swiper-slide').removeAttr('style');
          }
        }
      }, 2000);
    }
  });
  */
}

function cartGoodsSpecSave(spu_id, sku_id, rec_id) {
  var pay_btn_ele = $('#updateCartBtn');
  if ($(this).hasClass('prevent_submit')) {
    return;
  }
  
  var current_sku_id = $('#sku_id').val();
  if (current_sku_id == sku_id) {
    $('#quickViewModal').modal('hide');
    return false;
  }
  pay_btn_ele.addClass('prevent_submit');
  pay_btn_ele.toast({ type: 'loading', msg: '', duration: 0 });
  $.ajax({
    type: 'POST',
    dataType: 'JSON',
    url: '/checkout/index/ajax-update-cart-sku',
    data: {'sku_id':current_sku_id,'spu_id':spu_id,'rec_id':rec_id},
    headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
    success: function success(result) {
      if (result) {
        ctag('ReChooseGoods', {
          choose_type: 'continue',
          sku_id: sku_id,
          sku: ($('#sku_id').data() || {}).sku
        }, $('#updateCartBtn'));
        window.location.reload();
        return;
      }
    },
    error: function error(res) {
      pay_btn_ele.removeClass('prevent_submit');
      pay_btn_ele.toast('clear');
    },
    complete: function complete(res) {}
  });
}

  window.getShopBagNumber=function() {
    var shopBagNumber=parseInt($('#shopBag .number').html())
    if(shopBagNumber>99){
      $('#shopBag .number').html('99+')
      $('#header .badge').html('99+')
      $('#shopBag .number').attr('style','right:-22px;')
      $('#header .badge').attr('style','right:-22px;')
    }else if(shopBagNumber>9){
      $('#shopBag .number').attr('style','right:-13px;')
      $('#header .badge').attr('style','right:-13px;')
    }else{
      $('#shopBag .number').attr('style','')
      $('#header .number').attr('style','')
    }
    $('#shopBag .number').show()
    $('#header .badge').show()
  }
$(function() {
    //导航条定位
    $('#m_menu_modal').on('click','.collapsePrev',function(){
      var e = $(this),
      t = e.find('.cell-title'),
      c = e.next()
      if(!c.hasClass('show')){
        $('#m_menu_modal .collapse,#m_menu_modal .collapsePrev').removeClass('show')
      }
      c.toggleClass("show")
      e.toggleClass('show')
      t[0].scrollIntoViewIfNeeded && t[0].scrollIntoViewIfNeeded()
    })
    if($('#m_menu_modal .isloginTrue').length>0){
      $('#accordion').attr('style','height:calc(100vh - 1.86567rem);margin-top: 1.86567rem !important;')
    }
    getShopBagNumber()
    var headerHeight=$('.header-wrap').height()
    $('.header-wrap').height(headerHeight)
  $('.pc-wrap .pc,.phone-wrap').on('click',function(){
      var url = bottomAppLink
      url = url.replace(/scan/, "click")
      window.location.href=url.replace(/page_slide/, "page_bottom")
  })
    /*
    if($('.cookie-tip-btn').length) {
        $('.cookie-tip-btn').click(function () {
            $('.cookie-tip-bg').css('display', 'none');
            $.ajax({
                url: '/index/default/ajaxcookie',
                type: 'get',
                success: function (data) {
                
                }
            });
        });
        $('.cookie-close').click(function () {
            $('.cookie-tip-bg').css('display', 'none');
        })
    }
    */
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
    var get_date_range_goods_count = function(new_type='all',is_get_goods_count=1) {
        $.ajax({
            url: '/category/list/get-date-range-goods-count',
            type: 'post',
            data: {'new_type':new_type,'is_get_goods_count':is_get_goods_count},
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success: function success(data) {
                if (typeof data.htmlStr != 'undefined' && data.htmlStr != '' && $('#filter-block').length) {
                    $('#filter-block').before(data.htmlStr);
                }
                if (typeof data.htmlStrM != 'undefined' && data.htmlStrM != '' && $('#m_date_range_goods_count').length) {
                    $('#m_date_range_goods_count').append(data.htmlStrM);
                }
            },
            error: function error() {}
        });
    };
    if($('#collapse_categray').length){
        var themePage = $('#collapse_categray').attr('themes_page');
        if(themePage == 'products_new'){
            var new_type = getUrlParameter('new_type');
            if(new_type == undefined){
                new_type = 'all';
            }
            get_date_range_goods_count(new_type);
        }
    }
    if($('.btn-copy').length){
        var clipboard = new ClipboardJS('.btn-copy')
        clipboard.on('success', function(e) {
            $('.btn-copy').toast('Copy Success')
        });
        clipboard.on('error', function(e) {
        });
    }
    $('body').on('click', '.notify-msg .btn-setting', toggleNotifyConfig);
    $('body').on('click', '.notify-msg .btn-close', function() {
        closeNotifyMsg.call(this);
        // 允许消息通知时，弹窗一直存在，点击关闭时手动触发弹窗队列
        popupQueue.close();
        clearInterval(notify_set_interval);
        var notify_id = $(this).attr('notify-id');
        $.ajax({
            url: '/notify/index/ajax-notify?btn_close=1&id='+notify_id,
            type: 'get',
            success: function (data) {
                window.location.href = go_url;
            }
        });
    });
    function toggleNotifyConfig() {
        $(this).parents('.notify-msg').toggleClass('notify-config-hide');
    }
    function closeNotifyMsg() {
        $(this).parents('.notify-msg').remove();
    }
    function show_notify() {
        if(notify_prevent_ajax){
            return;
        }
        notify_prevent_ajax = 1;
        $.ajax({
            url: '/notify/index/index?browser_type='+browser_type+'&step_ajax='+step_ajax,
            type: 'get',
            dataType: 'json',
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            success: function(data) {
                notify_prevent_ajax = 0;
                if (typeof data.data != 'undefined' && data.data != '') {
                    if(data.code == 2){
                        notify_show_count++;
                    }
                    $('body').append(data.data);
                } else {
                  // 没有消息通知，手动触发弹窗队列
                  popupQueue.close();
                }
                if(data.one_time_show_count>0 && notify_show_count>=data.one_time_show_count){
                    clearInterval(notify_set_interval);
                }
                if($('#notify-setting').length){
                    step_ajax++;
                }
                if(data.had_show_count>0 && data.left_show_count <= 0){
                    clearInterval(notify_set_interval);
                }
            }
        });
    }
    var notify_set_interval;
    var step_ajax = 1;
    var user_browser_type = '';
    var browser_type = 0;
    var agent = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if (navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i)) {
        user_browser_type = 'edge';
    }
    else {
        user_browser_type = agent && agent[1].toLowerCase();
    }
    if(user_browser_type){
        switch(user_browser_type){
            case 'chrome':
                browser_type = 1;
                break;
            case 'firefox':
                browser_type = 2;
                break;
            case 'safari':
                browser_type = 3;
                break;
            default:
                browser_type = 4;
                break;
        }
    }
    
    $('body').on('click', '.notify-go-btn', function () {
        closeNotifyMsg.call(this);
        clearInterval(notify_set_interval);
        var go_url = $(this).attr('data');
        var notify_id = $(this).attr('notify-id');
        $.ajax({
            url: '/notify/index/ajax-notify?btn_close=0&id='+notify_id,
            type: 'get',
            success: function (data) {
                if(go_url.length>1){
                    window.location.href = go_url;
                }
            }
        });
    });
    $('body').on('click', '#notify_setting_btn', function () {
        toggleNotifyConfig.call(this);
        if($( "input[name='notify_setting']:checked").val() == '1'){
            closeNotifyMsg.call(this);
            popupQueue.close();
            $.ajax({
                url: '/notify/index/ajax-notify-modal-cookie?type=1',
                type: 'get',
                success: function (data) {
                
                }
            });
        }
    });
    PopupQueue.ready = true;
    // 当前弹窗优先级：cookies 40 > 推送弹窗 30 > 注册引导弹窗 20 > 优惠券引导弹窗 10
    // 设置一个优先级为 30 的弹窗
    popupQueue.add(function(next) {
        if(notify_agree == 0 && notify_agree_ajax){ //首页及结算页除外
            show_notify();
            $('body').on('click', '#notify-agree-no', function () {
                next();
                $('#notify-agree').remove();
                $.ajax({
                    url: '/notify/index/ajax-notify-modal-cookie?type=1',
                    type: 'get',
                    success: function (data) {
                    
                    }
                });
            });
            $('body').on('click', '#notify-agree-yes', function () {
                $('#notify-agree').remove();
                step_ajax = 1;
                $.ajax({
                    url: '/notify/index/ajax-notify-modal-cookie?type=2',
                    type: 'get',
                    success: function (data) {
                        notify_set_interval = setInterval(function() {
                            show_notify();
                        },notify_interval_time);
                    }
                });
            });
        }else if(notify_agree == 2 && notify_ajax){ // 结算页除外
            notify_set_interval = setInterval(function() {
                show_notify();
            },notify_interval_time);
        } else {
            next();
        }
    }, 30);
    var notifyIndexStart = window.location.href.indexOf('notify_id=');
    var notifyIndexEnd = window.location.href.indexOf('&n_id=');
    if(notifyIndexStart !== -1 && notifyIndexEnd !== -1){
        notify_id = document.location.href.substring(notifyIndexStart+10,notifyIndexEnd);
    }else if(typeof document.referrer != 'undefined' && document.referrer){
        notifyIndexStart = document.referrer.indexOf('notify_id=');
        notifyIndexEnd = document.referrer.indexOf('&n_id=');
        if(notifyIndexStart !== -1 && notifyIndexEnd !== -1){
            notify_id = document.referrer.substring(notifyIndexStart+10,notifyIndexEnd);
        }
    }
})

/* 检查价格 */
function checkajaxprice(goodsId, attr, qty) {
  var goods_sku_model = goodsSn;
  if ($('.pro-ordinary a.spec_Size').length > 1 && $('.pro-ordinary a.spec_Size.active').length) {
    goods_sku_model = $('.pro-ordinary a.spec_Size.active').attr('attr_model');
  } else if ($('.pro-ordinary a.spec_Color.active').length) {
    goods_sku_model = $('.pro-ordinary a.spec_Color.active').attr('attr_model');
  }
  $.ajax({
    type: 'GET',
    async: true,
    dataType: 'JSON',
    url: '/goods/index/price',
    data: 'goods_id=' + goodsId + '&attr=' + attr + '&number=' + qty + '&goods_sku_model=' + goods_sku_model,
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
    success: function success(data) {
      changePriceResponse(data);
    }
  });
}
// 接收价格的返回的信息
function changePriceResponse(res) {
  if (res.err_msg.length > 0) {
    alert(res.err_msg);
  } else {
    var goods_sku_model_string = '';
    if (res.goods_sku_model != '' && $('#' + res.goods_sku_model).length) {
      goods_sku_model_string = res.goods_sku_model;
    } else if (res.goods_sku_model_new != '' && $('#' + res.goods_sku_model_new).length) {
      goods_sku_model_string = res.goods_sku_model_new;
    }
    if (goods_sku_model_string) {
      var goods_sku_model_ele = $('#' + goods_sku_model_string);
      if (goods_sku_model_ele.attr('sku_price') == res.price) {
        $('.flashPic,.wholesalePrice,#content_time_flashPic').hide();
        $('.dirWasPrice').hide();
        $('.dirPriceBig').html(goods_sku_model_ele.attr('sku_price')).removeClass('text-danger');
      } else if (goods_sku_model_ele.attr('sku_discount_price') == res.price) {
        $('.flashPic,.wholesalePrice,#content_time_flashPic').hide();
        if (goods_sku_model_ele.attr('sku_price') != '0') {
          $('.dirWasPrice').hide();
          $('.dirWasPrice').html(goods_sku_model_ele.attr('sku_price')).show();
          $('.dirPriceBig').html(goods_sku_model_ele.attr('sku_discount_price')).addClass('text-danger');
        } else {
          $('.dirWasPrice').hide();
          $('.dirPriceBig').html(goods_sku_model_ele.attr('sku_discount_price'));
        }
      } else {
        $('.dirPriceBig').html(res.price);
        if ($('.dirWasPrice').hasClass('is_promotegoods')) {
          $('.dirWasPrice').html($('.dirWasPrice').attr('data')).show();
          $('.dirPriceBig').addClass('text-danger');
        } else {
          $('.dirWasPrice').hide();
          $('.dirPriceBig').removeClass('text-danger');
        }
        if ($('#content_time_flashPic').hasClass('is_flashgoods')) {
          $('#content_time_flashPic').show();
        }
      }
    }
    $('.qtyTotal').html('{$lang.goods_index_total}' + ':' + '&nbsp;' + res.result);
  }
}

/* 添加收藏 */
function changeCollect(sku_id, data_sku) {
  $.ajax({
    type: 'POST',
    dataType: 'JSON',
    async: true,
    url: '/goods/goods/add-collect',
    data: { 'sku_id': sku_id },
    headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
    success: function success(data) {
      $(".public-loading").fadeOut();
      changeCollectResponse(data, sku_id, data_sku);
    }
  });
}

/* 处理收藏结果 */
function changeCollectResponse(result, sku_id, data_sku) {
  if (result.error == 1) {
    window.location.href = result.url;
  } else {
    if (result.error == 0) {
      if ($('#collect-' + sku_id).length) {
        if (result.type == 'del') {
          $('#collect-' + sku_id).removeClass('text-danger'); // by lg
          $('#collect-' + sku_id).find('use').attr('xlink:href', '#wish');
            $('.collect-' + sku_id).find('use').attr('xlink:href', '#wish');
          $('#collect-text-' + sku_id).html('Add To Wishlist');
        } else {
          $('#collect-' + sku_id).addClass('text-danger'); // by lg
          $('#collect-' + sku_id).find('use').attr('xlink:href', '#wish-over');
            $('.collect-' + sku_id).find('use').attr('xlink:href', '#wish-over');
            $('.collect2-' + sku_id).find('use').attr('xlink:href', '#wish-over2');
          $('#collect-text-' + sku_id).html(add_to_bag_added);
          /* google analytics 加入收藏事件 */
          var event_time = Math.round(new Date().getTime());
          var data_spu = $('#collect-' + sku_id).attr('data-spu');
          // var data_sku = $('#collect-' + sku_id).attr('data-sku');
          var data_spu_id = $('#collect-' + sku_id).attr('data-spu-id');
          gtag('event', 'add_to_wishlist', {
            'event_category': 'add_to_wishlist',
            'event_label': event_time,
            'event_action': ga_client_id || "-",
            'non_interaction': 'true',
            'dimension1': data_spu || "-",
            'dimension2': data_sku || "-",
            'dimension3': data_spu_id || "-"
          });
        }
      }
    } else {
      $('#addToBag').toast({ type: 'failed', msg: 'Add To Wishlist Failed', duration: 2000 });
    }
  }
}
function validateEmail(emailAddress) {
  var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (filter.test(emailAddress)) {
    return true;
  } else {
    return false;
  }
}

$(function () {
  var gallerySwiper = null;
  /*邮件订阅*/
  $('#emailSub').click(function () {
    if ($(this).hasClass('prevent_submit')) {
      return;
    }
    $('#email_sub-error').addClass('d-none');
    $('#email_sub').removeClass('error');
    var email_sub = $.trim($('#email_sub').val());
    if (email_sub != '') {
      if (validateEmail(email_sub)) {
        var pay_btn_ele = $(this);
        pay_btn_ele.toast({ type: 'loading', msg: '', duration: 0 });
        pay_btn_ele.addClass('prevent_submit');
        /* google analytics 订阅 */
        var event_time = Math.round(new Date().getTime());
        gtag('event', 'subscription', {
          'event_category': 'subscription',
          'event_action': ga_client_id || "-",
          'event_label': event_time,
          'non_interaction': 'true',
          'dimension1': email_sub || "-"
        });

        $.ajax({
          type: 'POST',
          dataType: 'JSON',
          url: '/user/email/add',
          data: { 'email': email_sub },
          headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
          success: function success(data) {
            if (data.error == 0) {
              pay_btn_ele.toast('clear');
              if(user_is_login){
                  $('#btn-shop-login-no').hide();
                  $('#btn-shop-login').show();
              }else{
                  $('#btn-shop-login-no').show();
                  $('#btn-shop-login').hide();
              }
              $('#email_toast_modal').show();
              if (typeof current_event_id != 'undefined') {
                  var facebook_event_id = 'CompleteRegistration-' + current_event_id;
                  fbq('track', 'CompleteRegistration', {}, {eventID: facebook_event_id});
              } else {
                  fbq('track', 'CompleteRegistration');
              }
            } else {
              $('#emailSub').toast(data.message);
            }
          },
          complete: function complete(res) {
            pay_btn_ele.removeClass('prevent_submit');
          }
        });
      } else {
        $('#email_sub-error').html(email_invalid).removeClass('d-none');
        $('#email_sub').addClass('error');
      }
    } else {
      $('#email_sub-error').html(email_invalid).removeClass('d-none');
      $('#email_sub').addClass('error');
    }
  });
  $('#email_toast_btn').click(function () {
    $('#email_toast_modal').hide();
    if (user_is_login) {} else {
      getLoginModal();
    }
  });
  $('#email_toast_modal .close').click(function () {
    $('#email_toast_modal').hide();
  });
  if ($('#AECMP_FORMBUY').length) {
    SpecDefaultSelect();
  }
  if(typeof goods_id != 'undefined'){
      flashsaleTime(goods_id);
  }
  if($('.gmt_end_time_d_0').length){
      var topic_end_time_str = parseInt($('.gmt_end_time_d_0').attr('end_time'));
      var topic_end_time_str = topic_end_time_str*1000;
      setInterval(function () {
        GetRTime(0, topic_end_time_str, 0, 0);
      }, 1000);
  }
  
    if ($('#AECMP_OUTFIT').length) {
      getOutfit($('#spu_id').val(),$('#sku_id').val());
    }
    if ($('#AECMP_RECOMMEND').length) {
      getRecommend($('#spu_id').val());
    }
    if ($('#AECMP_HISTORY').length) {
      getHistory($('#spu_id').val());
    }
    window.publicLoading = function () {
    var str = '<div class="toast show loading public-loading"><div class="toast-wrapper"><img src="https://images.komily.com/banner/2021/08/02/14780287454885013.gif" class="public-loading-icon"></div></div>';
    let falg=$(".public-loading").length>0
    falg?$(".public-loading").fadeIn():$("body").append(str);
  }
  /* 收藏 */
  $('body').on('click', '.pro-collect', function () {
    var sku_id = $(this).attr('sku_id');
    var data_sku = $(this).attr('data-sku');
    if (typeof data_sku == "undefined") {
      data_sku = '';
    }
    if (sku_id) {
      publicLoading()
      changeCollect(sku_id, data_sku);
    }
  });
    function pCartInput(_this) {
      _this.value=_this.value.replace(/\D/g,'')
      if($(_this).val()==0){
        $(_this).val(1)
      }else if($(_this).val()>99 && $(this).attr('id')=='goods_number'){
        $(_this).val(99)
      }
    }
    $('body').on('paste','.p-cart-input',function() {
      pCartInput(this)
    })
    $('body').on('focus','.p-cart-input',function() {
      pCartInput(this)
    })
    $('body').on('blur','.p-cart-input',function() {
      pCartInput(this)
    })
    
    $('body').on('keyup','.p-cart-input',function() {
      this.value=this.value.replace(/\D/g,'')
      if($(this).attr('id')=='goods_number'){
        if($(this).val()>99){
          $(this).val(99)
        }
        parseInt($(this).val()) == 1 ? $('.pro-minus').prop({ disabled: true }) : $('.pro-minus').prop({ disabled: false });
        parseInt($(this).val()) == 99 ? $('.pro-plus').prop({ disabled: true }) : $('.pro-plus').prop({ disabled: false });
      }
    })
  if ($('.pro-minus').length) {
    stepper_num('.pro-minus');
  }
  if ($('.pro-plus').length) {
    stepper_num('.pro-plus');
  }
});

$('body').on('click', '#updateCartBtn', function () {
  if($(this).data('data-sale') == '0'){
      return;
  }
  var current_sku_id = $(this).data('sku_id');
  var current_spu_id = $(this).data('spu_id');
  var current_rec_id = $(this).data('rec_id');
  if (typeof current_sku_id != "undefined" && typeof current_spu_id != "undefined" && typeof current_rec_id != "undefined" && current_spu_id && current_sku_id&& current_rec_id) {
    cartGoodsSpecSave(current_spu_id, current_sku_id, current_rec_id);
  }
});


/*--- google place autocomplete by digger 2019.1.17---*/
$(document).on('input propertychange', 'input[name="address_string1"]', function (o) {
  var i = $(this).val();
  if (i.length >= 5 && is_g_api_keys) {
    var JS_IMG_URL = $('#js_address_list').attr('loading-img');
    var e = o.timeStamp;
    setTimeout(function () {
      if (e - o.timeStamp == 0) {
        $('#js_address_list').html('<img class="js_tipLoading" src="' + JS_IMG_URL + '" alt="loading">').show();
        address_autocomplete();
      }
    }, 500);
  } else {
    $('#js_address_list').html('').hide();
  }
});
function address_autocomplete() {
  var address_a = $('#sAddress1').val();
  var address_c = $($('#country_displaying').find('option:selected')).attr('data-isocode');
  $.ajax({
    url: '/index/index/getAutoComplete',
    type: 'post',
    dataType: 'json',
    data: {
      address_input: address_a,
      iso_code: address_c
    },
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
    success: function success(e) {
      if (e !== 0 && typeof e.predictions != 'undefined') {
        var a = e.predictions,
            o = '';
        if (!a) {
          $('#js_address_list').html('').hide();
          return;
        }
        for (var i = 0; i < a.length; i++) {
          o += '<li class="js_tipWord' + (i + 1) + '" data-placeId=' + a[i].place_id + '><p>' + a[i].description + '</p></li>';
        }$('#js_address_list').html(o).show();
        address_place_select();
      } else {
        setTimeout(function () {
          $('#js_address_list').html('').hide();
        }, 2000);
      }
      if (!$.trim($('#sAddress1').val())) {
        $('#js_address_list').html('').hide();
      }
    },
    complete: function complete(e, t) {},
    error: function error(e, t) {
      $('#js_address_list').html('').hide();
    }
  });
}
function address_place_select() {
  $(document).off('click', '#js_address_list>li'), $(document).on('click', '#js_address_list>li', function () {
    var address_i = $(this).attr('data-placeId');
    var JS_IMG_URL = $('#js_address_list').attr('loading-img');
    var current_region_id = $('#country_displaying').val();
    $('#js_address_list').html('<img class="js_tipLoading" src="' + JS_IMG_URL + '" alt="loading">').show();
    $.ajax({
      url: '/index/index/getGeocodingInfo',
      type: 'post',
      dataType: 'json',
      data: {
        place_id: address_i,
        region_id: current_region_id
      },
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
      success: function success(t) {
        if (t !== 0 && typeof t.formatted_address != 'undefined') {
          var a = t.address_components;
          a.city ? $('#sCity').val(a.city) : $('#sCity').val('');
          a.postcode ? $('#sPostcode').val(a.postcode) : $('#sPostcode').val('');
          $.trim(a.address) && $('#sAddress1').val(a.address);
          if (a.region_id) {
            if (current_region_id == a.region_id) {
              if (a.state) {
                $('#province_string').val(a.state);
              }
              if ($('#province_string').length > 0 && $.trim($('#province_string').val()) == '') {
                document.getElementById('province_string').options[document.getElementById('province_string').length] = new Option(a.state, a.state);
                $('#province_string').val(a.state);
              }
              return;
            }
            $('#country_displaying').val(a.region_id);
            if (a.state) {
              CountryChange(a.region_id, a.state);
            } else {
              CountryChange(a.region_id);
            }
            if ($('#province_string').length > 0 && $.trim($('#province_string').val()) == '') {
              document.getElementById('province_string').options[document.getElementById('province_string').length] = new Option(a.state, a.state);
              $('#province_string').val(a.state);
            }
          }
          var postcode_input = $('#sPostcode');
          var tel_input = $('#sPhone');
          postcode_input.css('border', '1px solid rgb(187, 27, 38)');
          tel_input.css('border', '1px solid rgb(187, 27, 38)');
          setTimeout(function () {
            postcode_input.css('border', '1px solid rgb(222, 222, 222)');
            tel_input.css('border', '1px solid rgb(222, 222, 222)');
          }, 5000);
        }
      },
      complete: function complete(e, t) {
        $('#js_address_list').html('').hide();
      }
    });
  });
}
function address_empty() {
  $('input[name="address_string1"]').on('keyup', function () {
    $.trim($(this).val()) || $('#js_address_list').html('').hide();
  }), $('body').on('blur', 'input[name="address_string1"]', function () {
    setTimeout(function () {
      $('#js_address_list').html('').hide();
    }, 1000);
  });
}




/*--- google place autocomplete by digger 2019.1.17---*/
$(function () {
  // size guide
  $('body').on('click', '.size-nav li', function () {
    var i = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    $('.size-con>li').eq(i).addClass('active').siblings().removeClass('active');
  });

  // 手机端隐藏quckliy view 弹框
  $(window).on('resize', function () {
    if (breakpoint == 'md') {
      // $('#quickViewModal').modal('hide')
    } else {
      $('#m_menu_modal').modal('hide');
    }
  });

  if ($('#pay-success-page').length) {
    getNewGoods('#pay-success-page');
  }
});

},{"./header.js":3,"./recentlySwiper.js":7}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
if( $(".recently-viewed-wrapper").length > 0 ){
  var recentlySwiper = new Swiper('.recently-viewed-wrapper .swiper-container', {
    direction: 'horizontal', // 水平切换选项
    lazy: true,
    observer: true,
    observeParents: true,
    // 如果需要前进后退按钮
    slidesPerView: 5,
    slidesPerGroup: 5,
    navigation: {
      nextEl: '.recently-viewed-wrapper .swiper-button-next',
      prevEl: '.recently-viewed-wrapper .swiper-button-prev'
    },
    pagination: {
      el: '.recently-viewed-wrapper .swiper-pagination'
    },
    breakpoints: {
      480: { // 当宽度小于等于320
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      768: { // 当宽度小于等于640
        slidesPerView: 3,
        slidesPerGroup: 3
      }
    }
  });
}

exports.default = recentlySwiper;

},{}],3:[function(require,module,exports){
'use strict';

;$(function () {
  var WEB_SITE_HEADER = $('#header');

  if (WEB_SITE_HEADER.length && window.location.pathname.indexOf("Promotions") !== 1) {
    // 专题不显示浮动菜单

    var header = document.querySelector('#header');
    var h_offset_top;
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      h_offset_top = WEB_SITE_HEADER.offset().top;
    } else {
        h_offset_top = WEB_SITE_HEADER.offset().top + WEB_SITE_HEADER.height();
    }
    var headroom = new Headroom(header, {
      onPin: function () {
        if (typeof bestSellerCateScroll === 'function') {
          bestSellerCateScroll();
        }
      },
      onUnpin: function () {
        if (typeof bestSellerCateScroll === 'function') {
          bestSellerCateScroll();
        }
      },
      tolerance: 0,
      offset: h_offset_top,
      classes: {
        initial: 'animated',
        pinned: 'slideDown',
        unpinned: 'slideUp'
      }
    });
    headroom.init();
  };

if($('.swiper-marqueen').length > 0){
  // 跑马灯
  var mySwiper = new Swiper('.swiper-marqueen', {
    direction: 'vertical',
    loop: true,
    autoplay: true,
    observer: true,
    observeParents: true,
    on: {
      resize: function resize() {
        this.autoplay.paused = false;
        this.updateAutoHeight(100);
      }
    }
  });
};
  // 搜索模块
  $('#pc_search').on('focus', function (event) {
    event.preventDefault();
    $($(this).data('target')).addClass('open');
  }).on('blur', function () {
    event.preventDefault();
    var that = $($(this).data('target'));
    setTimeout(function () {
      that.removeClass('open');
    }, 300);
  });

  $('#toggle_search_btn').on('click', function (event) {
    event.preventDefault();
    $($(this).data('target')).toggleClass('open');
  });
  // 关闭搜索框
  $('#m_search_pannel').on('click', '.close', function (event) {
    event.preventDefault();
    $('#m_search_pannel').removeClass('open');
  });
  // 搜索模块结束
  
  function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;
      
      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');
          
          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  }
  
  $('.currency-li-item').click(function () {
    var curr = $(this).attr('data');
    //var recommend_id = parseInt($(this).attr('recommend'));
    var to_url = window.location.href;
    if($('#price-range .digger-price-range-checked').length > 0){
      var dataele = $('#price-range .digger-price-range-checked');
      var datakey = dataele.attr('data');
      to_url = dataele.attr('value');
      $.ajax({
          type: 'GET',
          async: false,
          dataType: 'json',
          url: '/category/list/get-price-range-grade?currency='+curr+'&key='+datakey,
          headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
          success: function success(data) {
              if (typeof data.htmlStr != 'undefined' && data.htmlStr != '') {
                  curr = curr + data.htmlStr;
              }
          },
          complete: function complete(res) {}
      });
    }else{
        var currencyStr = getUrlParameter('currency');
    }
    if(typeof currencyStr != 'undefined'){
        to_url = to_url.replace('='+currencyStr, '='+curr);
    } else {
        if(to_url.indexOf('?') != -1){
            to_url = to_url+'&currency=' + curr;
        } else {
            to_url = to_url+'?currency=' + curr;
        }
    }
    window.location.href = to_url;
  });

  //phone left menu
  if ($('#m_site_trans').length) {
    $.ajax({
      url: '/index/index/get_m_left_menu',
      type: 'GET',
      dataType: 'JSON',
      headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
      success: function success(res) {
        if (res.code == 200 && res.data2 != '') {
          $('#m_site_trans').before(res.data2);
        }
        if (res.code == 200 && res.data != '') {
          $('#m_site_trans').before(res.data);
        }
      },
      error: function error() {}
    });
  }

  // PC导航菜单中的图片添加懒加载事件
  WEB_SITE_HEADER.on("mouseover", "li.lazyNavImg", function () {
    var _this = $(this);
    _this.find("img.lazyMenuImg").lazyload();
    _this.off("mouseover").removeClass("lazyNavImg");
  });

  //pc date menu
  if ($('#new_arrivals_date').length && $('#date_range_goods_count').length <= 0) {
    $.ajax({
      type: 'POST',
      async: true,
      dataType: 'json',
      url: '/category/list/get-range-date',
      headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
      success: function success(data) {
          if (typeof data.htmlStr != 'undefined' && data.htmlStr != '' && $('#new_arrivals_date').length) {
              $('#new_arrivals_date').before(data.htmlStr);
        }
      },
      complete: function complete(res) {}
    });
  }
    // user name
  /*if (typeof user_is_login != 'undefined') {
    setTimeout(function () {
      if (user_is_login) {
        $('#login_url_digger').addClass('isloginTrue')
        $('#login_url_digger span').html($('#login_username').html());
        $('#login_url_digger a').attr('href', '/user/member/order');
        $('#login_url_digger .reg-coupon').html('Enjoy your shopping life')
      } else {
        $('#login_url_digger span').html($('#login_in').html());
        $('#login_url_digger a').attr('href', $('#login_in').attr('href'));
        $('#login_url_digger .reg-coupon').html('<img src="https://images.bellelily.com/banner/2022/04/19/12241985119349426.png">')
      }
    }, 2000);
  }*/
});

},{}]},{},[2])













var is_shoes = 1;
var shoes_size_usa = 'USA:';
var shoes_size_uk = 'UK:';
var shoes_size_eu = 'EU:';
var shoes_size_len = 'Foot Length:';
/*
if (!user_ip_to_c) {
  if (g_api_keys) {
    getLocation();
  } else {
    getLocation2();
  }
}
*/
function getUserCollections() {
  var defer = $.Deferred();
  $.ajax({
      url: '/goods/goods/get-user-collections',
      type: "get", // 请求类型
      dataType: 'json',
      async: true, // 是否异步
      success: function (ret) {
          defer.resolve(ret)
      }
  });
  return defer.promise();
}
var get_user_collections = function get_user_collections(is_quickview) {
  $.when(getUserCollections()).done(function(res){
    if (typeof res != 'undefined' && res) {
      if (!is_quickview) {
        $('.pro-collect').find('use').attr('xlink:href', '#wish');
        $('.pro-collect').removeClass('text-danger');
        $('.pro-collect-text').html('Add To Wishlist');
      }
      for (var prop in res) {
        if (res.hasOwnProperty(prop)) {
          if ($('#myBag').length) {}
          if ($('#collect-' + res[prop]).length) {
            if (!is_quickview) {
              $('#collect-' + res[prop]).addClass('text-danger'); // by lg
              $('#collect-' + res[prop]).find('use').attr('xlink:href', '#wish-over');
                $('.collect2-' + res[prop]).find('use').attr('xlink:href', '#wish-over2');
              $('#collect-text-' + res[prop]).html(add_to_bag_added);
            } else if ($('#quickViewModal #collect-' + res[prop]).length) {
              $('#quickViewModal #collect-' + res[prop]).addClass('text-danger'); // by lg
              $('#quickViewModal #collect-' + res[prop]).find('use').attr('xlink:href', '#wish-over');
              $('#quickViewModal #collect-text-' + res[prop]).html(add_to_bag_added);
            }
          }
        }
      }
    }
  });
};

var payErrorTipsModal = function payErrorTipsModal(msg, callback) {
    var modal = $('<div class="modal fade pay-error-tips-modal" id="payErrorTipsModal" tabindex="-1" role="dialog" aria-labelledby="couponsModalLabel" aria-hidden="true">' + '<div class="modal-dialog modal-dialog-centered" role="document">' + '<div class="modal-content">' + '<div class="modal-header border-0">' + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' + '<svg class="icon icon-close">' + '<use xlink:href="#close3"></use>' + '</svg>' + '</button>' + '</div>' + '<div class="modal-body">' + '<div class="text-center">' + '<div>' + '<svg class="icon icon-bang">' + '<use xlink:href="#bang"></use>' + '</svg>' + '</div>' + '<p class="mb-3 mb-lg-5"><big>' + msg + '</big></p>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>');
    
    modal.on('hidden.bs.modal', function (e) {
        callback && callback();
        $(this).remove();
    });
    
    return modal;
};

function getLocation() {
  var lat = 0;
  var lng = 0;
  xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + g_api_keys, true);
  xhr.onload = function () {
    // do something
    var response = JSON.parse(this.responseText);
    if (typeof response.location == 'undefined' || typeof response.location.lat == 'undefined' || typeof response.location.lng == 'undefined') {
      return;
    }
    lat = response.location.lat;
    lng = response.location.lng;
    if (lat != 0 && lng != 0) {
      $.ajax({
        url: '/index/default/getLocationInfo',
        type: 'post',
        dataType: 'json',
        data: {
          lat: lat,
          lng: lng
        },
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        success: function success(t) {
          if (t !== 0) {
            var a = t.address_components;
            if (a.region_id) {
              user_region_id = a.region_id;
            }
            if (a.iso_code) {
              user_iso_code = a.iso_code;
            }
            user_ip_to_c = 1;
          }
          if (!user_region_id && !user_iso_code) {
            getLocation2();
          }
        }
      });
    }
  };
  xhr.send();
}

function getLocation2() {
  $.ajax({
    type: 'GET',
    url: 'https://ip2c.org/self',
    success: function success(response) {
      user_ip_to_c = 1;
      if (typeof response != 'undefined' && response.indexOf('1;') != -1) {
        // 1;CD;COD;COUNTRY
        var current_country_code = response.split(';')[1];
        if (current_country_code) {
          $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: '/index/default/ajax-country-code',
            data: { 'iso_code': current_country_code },
            headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
            success: function success(data) {
              if (data.code == 200) {
                user_iso_code = data.user_iso_code;
                user_region_id = data.user_region_id;
              }
            }
          });
        }
      }
    },
    error: function error(data) {},
    complete: function complete() {}
  });
}

function show_shoes_size_tips(str_id) {
  var curren_size = $("[id='size_id_" + $.trim($(str_id).html()) + "']").eq(0);
  var ab = $(curren_size).children();
  var size_tips = '';
  if (ab[0] != 'undefined' && ab[0]) {
    ab.each(function (index, value) {
      if (index > 0) {
        size_tips += $(this).attr('class') + ':' + $.trim($(this).html()) + ' ';
      }
    });
  }
  if ($('#shoes-size-tips').length) {
    $('#shoes-size-tips').html(size_tips + '(In inches)');
  } else {
    $('#AECMP_FORMBUY .add-option-tips-Size').before('<div id="shoes-size-tips">' + size_tips + '(In inches)' + '</div>');
  }
  if ($.trim($('#shoes-size-tips').html())) {
    $('#shoes-size-tips').show();
  } else {
    $('#shoes-size-tips').hide();
  }
}

function init_shoes_size_tips() {
  if ($('#shoes-size-tips').length && typeof is_shoes != 'undefined' && is_shoes) {
    var classArr = [];
    var len = 0;

    // 强制设置 尺码弹窗 显示第2个选项卡 by lg 2019.11.25
    $('.size-nav li').eq(1).addClass('active').siblings().removeClass('active');
    $('.size-con>li').eq(1).addClass('active').siblings().removeClass('active');

    $('.size-con > li.active > table tr th').each(function () {
      var size_title = $.trim($(this).html());
      $(this).attr('id', size_title);
      classArr.push(size_title);
      len = classArr.length;
    });
    $('.size-con > li.active > table tr td').each(function (key) {
      var i = key % len;
      $(this).attr('class', classArr[i]);
    });
    $('.size-con > li.active > table tr').each(function () {
      var _this = $(this);
      var size_id = 'size_id_' + $.trim($(_this.find('td')[0]).html()); // tr id sizeֵ
      _this.attr('id', size_id);
    });
    var shoes_size_show = $('#AECMP_FORMBUY .spec_list a.spec_Size');
    if (breakpoint != 'md') {
      shoes_size_show.mouseover(function () {
        show_shoes_size_tips(this);
      });
      shoes_size_show.mouseleave(function () {
        if (!shoes_size_show.hasClass('active')) {
          $('#shoes-size-tips').hide();
        } else {
          show_shoes_size_tips('#AECMP_FORMBUY .spec_list a.spec_Size.active');
        }
      });
    }
    show_shoes_size_tips('#AECMP_FORMBUY .spec_list a.spec_Size.active');
  }
}

// 获取旧缩略图
function getImgList() {
    var imgList = [];
    var el = $($('.goods-basic-display').size() ? '#thumbs_detail' : '#thumbs');
    el.find('.swiper-slide:not(.digger-video) img').each(function (i, k) {
        var imgUrl = $(this).attr('src');
        imgList.push(imgUrl)
    })
    window.sessionStorage.setItem('THUMBS_LIST', JSON.stringify(imgList));
}

  //预售倒计时
  var inter=null
  var PreSaleT=0
  var html0 = '00D : 00H : 00M : 00S'
  function pp(s) {
    return s < 10 ? "0" + s : s;
  }
  function interFun(){
    var d = Math.floor(PreSaleT / 60 / 60 / 24);
    var h = Math.floor((PreSaleT / 60 / 60) % 24);
    var m = Math.floor((PreSaleT / 60) % 60);
    var s = Math.floor((PreSaleT) % 60);
    var html = PreSaleT <= 0 ? html0 : pp(d) + 'D : ' + pp(h) + 'H : ' + pp(m) + 'M : ' + pp(s) + 'S'
    $(".goods-detail-preSale .presale-time-wrap span").eq(0).html(html)
    if(PreSaleT<=0){
      clearInterval(inter);
    }
    PreSaleT=PreSaleT-1
    return interFun
  }
  function setPreSaleTime(time){
    clearInterval(inter);
    var EndTime = new Date(time*1000);
    var NowTime = new Date();
    PreSaleT = (EndTime.getTime() - NowTime.getTime())/1000;
    inter=setInterval(interFun(),1000);
  }

var QUICK_GALLERY_SWIPER = '';
//请求 /goods/goods/ajax-get-sku 异步-同步 处理gif卡顿问题
function ajaxGetSku(params) {
  var defer = $.Deferred();
  $.ajax({
    type: 'POST',
    async: true,
    dataType: 'JSON',
    url: '/goods/goods/ajax-get-sku',
    data: params,
    headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
    success: function success(data) {
      defer.resolve(data)
    }
  });
  return defer.promise()
}
function change_sku_id(callback, isColor){
  var color_id=parseInt($('.pro-ordinary a.spec_Color.active').attr('namevalue'));
  var size_id=parseInt($('.pro-ordinary a.spec_Size.active').attr('namevalue'));
  var sku_attr_list_array=$.parseJSON(JSON.stringify(sku_attr_list));
  var falg_tmp2=false;
  $.each(sku_attr_list_array, function(index, value) {
    if(falg_tmp2){
      return;
    }
    var color_number3 = 0;
    if($('.pro-ordinary a.spec_Color').length > 1){
      var color_ids3=new Array();
      $('.pro-ordinary a.spec_Color').each(function(i) {
          if(i == 0){
              color_ids3.push($(this).attr('namevalue'));
              color_number3 = 1;
          }else if($.inArray($(this).attr('namevalue'), color_ids3)!=-1) {
              color_ids3.push($(this).attr('namevalue'));
              color_number3 = color_number3 + 1;
          }
      })
      if(color_number3 > 1){
          var color_sku_id_tmp3 =$('.pro-ordinary a.spec_Color.active').attr('color_sku_id');
      }else{
          var color_sku_id_tmp3 = 0;
      }
    }else{
      var color_sku_id_tmp3 = 0;
    }
    if(color_sku_id_tmp3){
      index = color_sku_id_tmp3;
    }
    if($.inArray(color_id, value)!=-1 && $.inArray(size_id, value)!=-1){
      falg_tmp2 = true;
      $('#sku_id').val(index);
      if($('#quick-modal-body').length){
        $('#quick-modal-body .pro-collect-text').attr('id','collect-text-'+index);
        $('#quick-modal-body .pro-collect-text').html(add_to_wishlist_txt);
        $('#quick-modal-body .whistlist_icon').attr('id','collect-'+index);
        $('#quick-modal-body .whistlist_icon').attr('sku_id',index);
        $('#quick-modal-body .whistlist_icon').removeClass('text-danger');
        $('#quick-modal-body .whistlist_icon').find('use').attr('xlink:href', '#wish');
        get_user_collections(1);
      }
      var is_quick_view = 1;
      var is_good_detail = ''

      if($('.goods-basic-display').length){
          is_quick_view  = 0;
          is_good_detail = 1;
      }
      var spu_id=$('#spu_id').val();
      var cur_url = $('#sku_url').val();
      var color_sku_ids = '';
      var associated_color_sku_ids = '';
      $('.pro-ordinary a.pro-item-color').each(function(i) {
        if(!$(this).hasClass('active')){
            if(typeof $(this).attr('associated_color_sku_id') != 'undefined'){
                if(associated_color_sku_ids){
                    associated_color_sku_ids = associated_color_sku_ids+','+$(this).attr('associated_color_sku_id');
                }else{
                    associated_color_sku_ids = $(this).attr('associated_color_sku_id');
                }
            }else{
                if(color_sku_ids){
                    color_sku_ids = color_sku_ids+','+$(this).attr('color_sku_id');
                }else{
                    color_sku_ids = $(this).attr('color_sku_id');
                }
            }
        }
      });
      var params={
            'sku_id': index,
            'spu_id': spu_id,
            'is_quick_view':is_quick_view,
            'is_good_detail': is_good_detail,
            'current_url': cur_url,
            'color_sku_ids':color_sku_ids,
            'associated_color_sku_ids':associated_color_sku_ids
          }
      $.when(ajaxGetSku(params)).done(function(data){
            if (data !== null) {
                goodsDetailCollector(data, isColor, is_quick_view);
                $('#sku_url').attr('href', data.sku_url);
                if (!is_quick_view) {
                    // window.location.href=data.sku_url;
                } else {
                    $('#sku_url').attr('href',data.sku_url);
                    if (data.is_ajun_more_goods_sale == 1 && data.more_goods_sale_info) {
                        $('#more_goods_sale_info').html(data.more_goods_sale_info).show();
                        $('#wholesale_price').addClass('d-none');
                    } else {
                        $('#more_goods_sale_info').html('').hide();
                        if ($('#wholesale_price').hasClass('show_wholesale_txt')) {
                            $('#wholesale_price').removeClass('d-none');
                        }
                    }
                    if (typeof data.title != 'undefined' && typeof data.title) {
                  if(typeof data.new_title !== 'undefined' && typeof data.new_title){
                    $('.goods-detail-name').html(data.new_title);
                  }else{
                    $('.goods-detail-name').html(data.title);
                    }
                }
                // 预售
                var preSaleTime=$(".goods-detail-preSale .presale-time-wrap span").eq(0).attr('data-time')
                if($(".goods-detail-preSale").length && preSaleTime && !isMobileDevices()){
                  setPreSaleTime(parseInt(preSaleTime))
                }
                    var sku_gallery_count_old = parseInt($('#thumbs').attr('data'));
                    $('#thumbs').attr('data',data.sku_gallery_count)

                    // quick view
                    var gallery = []
                    var oldgallery = JSON.parse(window.sessionStorage.getItem('THUMBS_LIST') || '[]');

                    // 获取当前的缩略图数据
                    if (data.sku_gallery && data.sku_gallery.length > 0) {
                        for(var i = 0; i < data.sku_gallery.length; i++){
                            gallery.push(data.sku_gallery[i].sku_attr_img_small || data.sku_gallery[i].spu_img_small)
                        }
                    }

                    // 缩略图与当前接口返回的图是否一致
                    try {
                        var is_result = oldgallery.length ===gallery.length && oldgallery.every((a, a1) => 
                            gallery.some((b, b1) => (a === b && a1 === b1)))

                        if (!is_result) {
                            var thumbshtml = '',
                                galleryhtml = '',
                                x = 0,
                                _diggerVideoThumbs = $("#quick-swiper-thumbs").find("div.swiper-slide.digger-video"),
                                _diggerVideoGallery = $("#quick-swiper-gallery").find("div.swiper-slide.digger-video");

                            if(_diggerVideoThumbs.length > 0){  // QuickView弹窗
                              x += 1;
                              thumbshtml = _diggerVideoThumbs.prop("outerHTML");
                              galleryhtml = _diggerVideoGallery.prop("outerHTML");
                            }
                            // 动态填充缩略图
                            for (var i= 0; i < data.sku_gallery.length; i++) {
                                var maxImg = data.sku_gallery[i].spu_img || data.sku_gallery[i].sku_attr_img,
                                    smallImg = data.sku_gallery[i].spu_img_small || data.sku_gallery[i].sku_attr_img_small;
                                thumbshtml+= `<div class="swiper-slide slide-thumb" data-index="${i + x}"><img class="img-fluid" src="${smallImg}"></div>`;
                                galleryhtml+= `<div class="swiper-slide" data-index="${i + x}" data-src="${maxImg}"><img class="img-fluid" src="${maxImg}"></div>`;
                            }

                            $('#quick-swiper-thumbs').empty().html(thumbshtml);
                            $('#quick-swiper-gallery').empty().html(galleryhtml);
                            
                              var quickThumbsSwiper = new Swiper('#thumbs', {
                                initialSlide:0,//sku_index,
                                loop: false,
                                direction: 'vertical',
                                spaceBetween: 10,
                                slidesPerView: 5,
                                watchSlidesVisibility: true, // 防止不可点击
                              updateOnImagesReady: true,
                                breakpoints: {
                                  // 当宽度小于等于540
                                  576: {
                                    slidesPerView: 2.6
                                  }
                                },
                                navigation: {
                                  nextEl: '.swiper-nav .swiper-button-down',
                                  prevEl: '.swiper-nav .swiper-button-up'
                                },
                                on: {
                                imagesReady: function () {
                                  this.update();
                                },
                                resize: function () {
                                  this.update();
                                },
                                  click: function click() {
                                    if (gallerySwiper && gallerySwiper.activeIndex == this.clickedIndex + 1) {
                                      var $galleryActiveSlide = $(gallerySwiper.slides[gallerySwiper.activeIndex]);
                                      $galleryActiveSlide.find('img').attr('src', $galleryActiveSlide.data('src'));
                                    }
                                  },
                                  slideChangeTransitionEnd: function() {

                                  }
                                }
                              });

                              QUICK_GALLERY_SWIPER = new Swiper('#gallery', {
                                initialSlide: 0,
                                autoHeight: true,
                          slidesPerView: 'auto',
                                updateOnImagesReady: true,
                                navigation: {
                                  nextEl: '#gallery .swiper-button-next',
                                  prevEl: '#gallery .swiper-button-prev'
                                },
                                on: {
                                  init: function init() {
                                    this.height = $(this.slides[0]).height();
                                  },
                                  slideChange: function slideChange() {
                                    var $activeSlide = $(this.slides[this.activeIndex]);
                                    $activeSlide.find('img').attr('src', $activeSlide.data('src'));
                                  },
                                  imagesReady: function() {
                                      if ($('#quick-next').hasClass('swiper-button-disabled')) {
                                          if (QUICK_GALLERY_SWIPER && QUICK_GALLERY_SWIPER != '' && QUICK_GALLERY_SWIPER.isEnd) {
                                              $('#quick-next').attr('aria-disabled', 'true').addClass('swiper-button-disabled');
                                          } else {
                                              $('#quick-next').attr('aria-disabled', 'false').removeClass('swiper-button-disabled');
                                          }
                                      }
                                  },
                                  slideChangeTransitionEnd: function (){

                                  }
                                },
                                thumbs: {
                                  swiper: quickThumbsSwiper
                                }
                              });

                              quickThumbsSwiper.update();
                              QUICK_GALLERY_SWIPER.update();
                              quickSwiper(QUICK_GALLERY_SWIPER);
                            }

                            $('body').on('click', '#quick-next', function (e) {
                                if ($(this).hasClass('swiper-button-disabled')) {
                                    if (QUICK_GALLERY_SWIPER && QUICK_GALLERY_SWIPER != '' && QUICK_GALLERY_SWIPER.isEnd) {
                                        $('#quick-next').attr('aria-disabled', 'true').addClass('swiper-button-disabled');
                                    } else {
                                        $('#quick-next').attr('aria-disabled', 'false').removeClass('swiper-button-disabled');
                                    }
                                }
                            });
                    } catch(err) {
                        
                    }
                    // data.sku_gallery_count != sku_gallery_count_old && callback && callback(data.sku_gallery);
                }
            }
      })

    }
  })
}

function expandCollapse(el) {
    $('#accordion-details').find('.collapse-card').each(function (i, k) {
        var _this = $(this);
        var CONTROLS_KEY = window.sessionStorage.getItem("CONTROLS_KEY");
        if (CONTROLS_KEY !== undefined && CONTROLS_KEY !== '') {
            if (_this.find('.btn').attr('aria-controls') === CONTROLS_KEY) {
                _this.find('.btn').attr('aria-expanded', true)
                _this.find('.collapse').addClass('show')
            } else {
                _this.find('.btn').attr('aria-expanded', false)
                _this.find('.collapse').removeClass('show')
            }
        }
    })
}

var GALLERY_SWIPER = '';
var VIRTUAL_SWIPER = '';
var THUMBS_SWIPER = '';
function change_sku(sku_info, isColor) {
    var params = {
        spu_id: $(sku_info).attr('spu_id'),
        sku_id: $(sku_info).attr('sku_id')
    };
    var is_quick_view = 1;
    var is_good_detail = ''
    var sku_url = $('#sku_url').val();
    var sku_number = $('#goods_number').val();
    var color_id = parseInt($('.pro-ordinary a.spec_Color.active').attr('namevalue'));
    var size_id = parseInt($('.pro-ordinary a.spec_Size.active').attr('namevalue'));
    var sku_attr_list_array=$.parseJSON(JSON.stringify(sku_attr_list));

    expandCollapse();
    flashsaleTime(goods_id);
    SpecDefaultSelect();
    show_sku_price();
    init_shoes_size_tips();
    // get_user_collections(1);
    if (typeof rec_id =="undefined" && !flash_sale_out) {
        check_stock_btn();
    }

    if ($('.goods-basic-display').length) {
        is_quick_view  = 0;
        is_good_detail = 1;
    }
    var spu_id=$('#spu_id').val();
    var cur_url = $('#sku_url').val();

    if (!is_quick_view) {
          var falg_tmp=false;
        $.each(sku_attr_list_array, function(index, value) {
            // 当前颜色属性存在关联
                if(falg_tmp){
                    return;
                }
                var color_number2 = 0;
                if($('.pro-ordinary a.spec_Color').length > 1){
                    var color_ids2=new Array();
                    $('.pro-ordinary a.spec_Color').each(function(i) {
                        if(i == 0){
                            color_ids2.push($(this).attr('namevalue'));
                            color_number2 = 1;
                        }else if($.inArray($(this).attr('namevalue'), color_ids2)!=-1) {
                            color_ids2.push($(this).attr('namevalue'));
                            color_number2 = color_number2 + 1;
                        }
                    })
                    if(color_number2 > 1){
                        var color_sku_id_tmp2 =$('.pro-ordinary a.spec_Color.active').attr('color_sku_id');
                    }else{
                        var color_sku_id_tmp2 = 0;
                    }
                }else{
                    var color_sku_id_tmp2 = 0;
                }
                if(color_sku_id_tmp2){
                    index = color_sku_id_tmp2;
                }
            if ($.inArray(color_id, value)!=-1 && $.inArray(size_id, value)!=-1) {
                  falg_tmp = true;
                // 商品收藏
                if ($('.goods-basic-display').length) {
                    $('.goods-basic-display .pro-collect').attr('id','collect-'+index);
                    $('.goods-basic-display .pro-collect').attr('sku_id',index);
                    $('.goods-basic-display .pro-collect').removeClass('text-danger');
                    $('.goods-basic-display .pro-collect').find('use').attr('xlink:href', '#wish');
                    get_user_collections(0);
                }
                var color_sku_ids = '';
                var associated_color_sku_ids = '';
                $('.pro-ordinary a.pro-item-color').each(function(i) {
                    if(!$(this).hasClass('active')){
                        if(typeof $(this).attr('associated_color_sku_id') != 'undefined'){
                            if(associated_color_sku_ids){
                                associated_color_sku_ids = associated_color_sku_ids+','+$(this).attr('associated_color_sku_id');
                            }else{
                                associated_color_sku_ids = $(this).attr('associated_color_sku_id');
                            }
                        }else{
                            if(color_sku_ids){
                                color_sku_ids = color_sku_ids+','+$(this).attr('color_sku_id');
                            }else{
                                color_sku_ids = $(this).attr('color_sku_id');
                            }
                        }
                    }
                });
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/goods/goods/ajax-get-sku',
                    data: {
                        'sku_id': index,
                        'spu_id': spu_id,
                        'is_quick_view': is_quick_view,
                        'is_good_detail': is_good_detail,
                        'current_url': cur_url,
                        'color_sku_ids':color_sku_ids,
                        'associated_color_sku_ids':associated_color_sku_ids
                    },
                    headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
                    success: function success(data) {
                        if (data !== null) {
                            $('.left-current .gcard-img-wrap img').attr('src',data.sku_gallery[0].sku_attr_img)
                            $('.left-current .gcard-name a').html(data.title); //穿搭标题赋值
                            goodsDetailCollector(data, isColor, is_quick_view);
                            $('#sku_url').attr('href', data.sku_url);
                            if (data.sku_info && data.sku_info !== null) {
                                $('#sku_id').val(data.sku_info.id).attr('data-sku', data.sku_info.sku)
                            }

                              var activity_id = getQueryString('activity_id')
                            // 更改当前url
                            if ('history' in window && 'replaceState' in history) {
                                  var yypm = location.search.substr(location.search.indexOf('yypm='))
                                  var url = data.sku_url
                                  if(yypm){
                                    url = url + (data.sku_url.indexOf('?')<0 ? '?':'&') + yypm 
                                  }
                                  window.history.replaceState({}, '', url);
                                  //window.history.replaceState({}, '', data.sku_url);
                                  if (__device_type().mobile && activity_id) {
                                    if(location.href.indexOf('?')<0){
                                      window.history.replaceState({},'', location.href+'&activity_id=' + activity_id);
                                    }else{
                                      window.history.replaceState({},'', location.href+'?activity_id=' + activity_id);
                                    }
                                    //window.history.replaceState({}, window.location.origin + window.location.pathname, '?activity_id=' + activity_id);
                                  }
                              }
                            setTimeout(function () {
                                $('.el-loadding').removeClass('is-loading');
                            }, 500)
                            if (!is_quick_view) {
                                // 详情页颜色/尺寸属性异步处理
                                // window.location.href=data.sku_url;
                                if (data.is_ajun_more_goods_sale == 1 && data.more_goods_sale_info) {
                                    $('.goods-detail-infor').html(data.more_goods_sale_info).show();
                                    $('#wholesale_price').addClass('d-none');
                                } else {
                                    $('.goods-detail-infor').html('').hide();
                                    if ($('#wholesale_price').hasClass('show_wholesale_txt')) {
                                        $('#wholesale_price').removeClass('d-none');
                                    }
                                }

                                if (data.sku_info && data.sku_info.sku !== '') {
                                    goods_sku = data.sku_info.sku;
                                    $('#description').find('.link-sku').text(data.sku_info.sku);
                                }

                                if(typeof data.title !== 'undefined' && typeof data.title) {
                                    //预售
                                    if(typeof data.new_title !== 'undefined' && typeof data.new_title){
                                      $('.goods-detail-name').html(data.new_title);
                                    }else{
                                      $('.goods-detail-name').html(data.title);
                                    }
                                    $('.breadcrumb-item.active').text(data.title);
                                }

                                var sku_gallery_count_old = parseInt($('#thumbs_detail').attr('data'));
                                $('#thumbs_detail').attr('data',data.sku_gallery_count)

                                var gallery = [];
                                var oldgallery = JSON.parse(window.sessionStorage.getItem('THUMBS_LIST') || '[]');

                                // 获取当前的缩略图数据
                                if (data.sku_gallery && data.sku_gallery.length > 0) {
                                    for(var i = 0; i < data.sku_gallery.length; i++){
                                        gallery.push(data.sku_gallery[i].sku_attr_img_small || data.sku_gallery[i].spu_img_small)
                                    }
                                }

                                // 缩略图与当前接口返回的图是否一致
                                try {
                                    var is_result = oldgallery.length ===gallery.length && oldgallery.every((a, a1) => 
                                    gallery.some((b, b1) => (a === b && a1 === b1)))

                                    if (!is_result) {
                                        var thumbshtml = '',
                                            galleryhtml = '',
                                            x = 0,
                                            _swiperWrapperThumbs = $("#swiper-wrapper-thumbs").find("div.swiper-slide.digger-video"),
                                            _swiperWrapperGallery = $("#swiper-wrapper-gallery").find("div.swiper-slide.digger-video");

                                        if(_swiperWrapperThumbs.length > 0){  // 详情页面
                                          x += 1;
                                          thumbshtml = _swiperWrapperThumbs.prop("outerHTML");
                                          galleryhtml = _swiperWrapperGallery.prop("outerHTML");
                                        }
                                        
                                        // 动态填充缩略图
                                        for (var i= 0; i < data.sku_gallery.length; i++) {
                                            var maxImg = data.sku_gallery[i].spu_img || data.sku_gallery[i].sku_attr_img,
                                                smallImg = data.sku_gallery[i].spu_img_small || data.sku_gallery[i].sku_attr_img_small;
                                            thumbshtml+= `<div class="swiper-slide slide-thumb" data-index="${i+x}" data-swiper-slide-index="${i+x}"><img class="img-fluid" src="${smallImg}"></div>`;
                                            galleryhtml+= `<div class="swiper-slide" data-index="${i+x}" data-src="${maxImg}"><img class="img-fluid" src="${maxImg}"></div>`;
                                        }

                                        $('#swiper-wrapper-thumbs').html(thumbshtml);
                                        $('#swiper-wrapper-gallery').html(galleryhtml);

                                        if (THUMBS_SWIPER) {
                                            THUMBS_SWIPER.detachEvents();
                                        }

                                        THUMBS_SWIPER = new Swiper('#thumbs_detail', {
                                            initialSlide: 0,
                                            // loop: false,
                                            direction: 'vertical',
                                            spaceBetween: 10,
                                            slidesPerView: 5,
                                            observer: true,
                                            observeParents: true,
                                            autoScrollOffset: 1,
                                            watchSlidesVisibility: true, // 防止不可点击
                                            updateOnImagesReady: true,
                                            breakpoints: {
                                                // 当宽度小于等于540
                                                576: {
                                                    slidesPerView: 2.6
                                                }
                                            },
                                            navigation: {
                                                nextEl: '.swiper-nav .swiper-button-down',
                                                prevEl: '.swiper-nav .swiper-button-up'
                                            },
                                            on: {
                                                imagesReady: function () {
                                                  this.update();
                                                },
                                                resize: function () {
                                                  this.update();
                                                },
                                                click: function click() {
                                                    if (GALLERY_SWIPER && GALLERY_SWIPER.activeIndex == this.clickedIndex + 1) {
                                                        var $galleryActiveSlide = $(GALLERY_SWIPER.slides[GALLERY_SWIPER.activeIndex]);
                                                        $galleryActiveSlide.find('img').attr('src', $galleryActiveSlide.data('src'));
                                                    }
                                                },
                                                slideChangeTransitionEnd: function(){
                                                   // console.log(this.activeIndex);
                                                },
                                            }
                                        });

                                        if (GALLERY_SWIPER) {
                                            GALLERY_SWIPER.detachEvents();
                                            // GALLERY_SWIPER.destroy(false);
                                        }

                                        GALLERY_SWIPER = new Swiper('#gallery_detail', {
                                            initialSlide: 0,
                                            autoHeight: true,
                                            observer: true,
                                            observeParents: true,
                                            autoScrollOffset: 1,
                                            watchOverflow: true,
                                            observeParents: true,
                                            centerInsufficientSlides: true,
                                            updateOnImagesReady: true,
                                            // preventClicksPropagation: true,
                                            navigation: {
                                                nextEl: '#gallery_detail .swiper-button-next',
                                                prevEl: '#gallery_detail .swiper-button-prev'
                                            },
                                            pagination: {
                                              el: '#gallery_detail .swiper-pagination',
                                              clickable: true
                                            },
                                            slidesPerView: 1,
                                            breakpoints: {
                                              768: {
                                                slidesPerView: 1.5,
                                                spaceBetween: 5 * dpr
                                              }
                                            },
                                            on: {
                                                init: function init() {
                                                    this.height = $(this.slides[0]).height();
                                                },
                                                click: function click(e) {
                                                    var _this = this,
                                                        imgList = _this.imagesToLoad,
                                                        // 获取当前swiper的图片集合
                                                        imgFluid = '',
                                                        // 定义封装img列表的变量
                                                        virtualWrapper = ''; // 虚拟swiper

                                                    // 注:只针对于PC端显示virtualWrapper
                                                    if (GALLERY_SWIPER && GALLERY_SWIPER.width >= 482) {
                                                        if (imgList.length > 0 && _this.clickedIndex != undefined && _this.clickedSlide != undefined && e.target.nodeName != "VIDEO") {
                                                            for (var i = 0; i < imgList.length; i++) {
                                                                imgFluid += '<div class="swiper-slide"><img class="img-fluid" src="' + imgList[i].src + '"/></div>';
                                                            }

                                                            virtualWrapper = $('<div class="swiper-container virtual-swiper">\n<div class="swiper-wrapper">' + imgFluid + '</div>\n<div id="virtual-next" class="swiper-button-next swiper-button-black"></div>\n<div id="virtual-prev" class="swiper-button-prev swiper-button-black"></div>\n<div class="swiper-pagination swiper-pagination-black"></div>\n<span id="closeSwiper" class="close-virtual-swiper">\n<svg class="icon icon-close"><use xlink:href="#close"></use></svg>\n</span>\n</div>');
                                                            virtualWrapper.appendTo('body');

                                                            VIRTUAL_SWIPER = new Swiper(virtualWrapper, {
                                                                initialSlide: 0,
                                                                mousewheel: true,
                                                                observer: true,
                                                                observeParents: true,
                                                                observeSlideChildren: true,
                                                                navigation: {
                                                                  nextEl: '.swiper-button-next',
                                                                  prevEl: '.swiper-button-prev'
                                                                },
                                                                pagination: {
                                                                  el: '.swiper-pagination'
                                                                }
                                                            });

                                                            VIRTUAL_SWIPER.slideTo(this.clickedIndex, 0);

                                                            // 绑定关闭事件
                                                            closeVirSwiper(virtualWrapper);
                                                        }
                                                    }
                                                },
                                                slideChange: function slideChange() {
                                                    // 点击商品详情图片 - M
                                                    $(window).width() < 768 && ctag('GoodsDetailImg', this.activeIndex);
                                                    // this.activeIndex
                                                    var $activeSlide = $(this.slides[this.activeIndex]);
                                                    $activeSlide.find('img').attr('src', $activeSlide.data('src'));
                                                },
                                                imagesReady: function() {
                                                    this.attachEvents();
                                                },
                                                resize: function() {
                                                    this.init();
                                                    this.update(); // 窗口变化时，更新Swiper的一些属性，如宽高等
                                                    this.pagination.update();
                                                },
                                                slideChangeTransitionEnd: function() {
                                                    if ($('#swiper-next').hasClass('swiper-button-disabled')) {
                                                        if (GALLERY_SWIPER && GALLERY_SWIPER != '' && GALLERY_SWIPER.isEnd) {
                                                            $('#swiper-next').attr('aria-disabled', 'true').addClass('swiper-button-disabled');
                                                        } else {
                                                            $('#swiper-next').attr('aria-disabled', 'false').removeClass('swiper-button-disabled');
                                                        }
                                                    }

                                                    if (this.activeIndex == 0) {
                                                        $('#swiper-prev').attr('aria-disabled', 'true').addClass('swiper-button-disabled');
                                                    } else {
                                                        $('#swiper-prev').attr('aria-disabled', 'false').removeClass('swiper-button-disabled');
                                                    }
                                                    // console.log('activeIndex----', this.activeIndex)
                                                    // console.log('realIndex----', this.realIndex)
                                                }
                                            },
                                            thumbs: {
                                                swiper: THUMBS_SWIPER
                                            }
                                        });
                                    }

                                    THUMBS_SWIPER.update();
                                    GALLERY_SWIPER.update();
                                    swiperNext(GALLERY_SWIPER);
                                    swiperPrev(GALLERY_SWIPER);
                                    gallerySwipers(GALLERY_SWIPER);
                                    $('.swiper-pagination span').eq(0).trigger('click');
                                } catch(err) {
                                    
                                }
                            }
                        }
                    },
                    error: function error(err) {
                        $('.el-loadding').removeClass('is-loading');
                    },
                    complete: function complete(res) {
                        $('.el-loadding').removeClass('is-loading');
                    }
                });
            } else {
                setTimeout(function () {
                    $('.el-loadding').removeClass('is-loading');
                }, 600)
            }
        });
    }
}
function goodsDetailCollector(data, isColor, is_quick_view) {
  if (!(data && data.sku_info && data.spu_info)) return;
  // 更新 sku_id sku spu_id
  $('#sku_id').data({
    skuId: data.sku_info.id,
    sku: data.sku_info.sku
  });
  // 同时修改 dom 上的属性
  $('#sku_id').attr('data-sku-id', data.sku_info.id);
  $('#sku_id').attr('data-sku', data.sku_info.sku);
  var goodsInfo = $('#sku_id').data();
  if (isColor === true) {
      // 点击Color
      ctag('GoodsDetailColor', {
          sku_id: goodsInfo.skuId,
          sku: goodsInfo.sku
      }, is_quick_view, $('.pro-ordinary a.spec_Color.active'));
  } else if (isColor === false) {
      // 点击Size
      ctag('GoodsDetailSize', {
        sku_id: goodsInfo.skuId,
        sku: goodsInfo.sku
      }, is_quick_view, $('.pro-ordinary a.spec_Size.active'));
  }
}
// 更新数量
function stepper_num(ele) {
  $('body').off('click', ele).on('click', ele, function () {
    var input_ele = $('.pro-input');
    var val = parseInt(input_ele.val());
    var goods_number = ele === '.pro-minus' ? val > 1 ? val - 1 : 1 : val + 1;
      if(goods_number >= 99){
        goods_number = 99
      }
    input_ele.val(goods_number);
    parseInt($('.pro-input').val()) == 1 ? $('.pro-minus').prop({ disabled: true }) : $('.pro-minus').prop({ disabled: false });
      parseInt($('.pro-input').val()) == 99 ? $('.pro-plus').prop({ disabled: true }) : $('.pro-plus').prop({ disabled: false });
    var isOnSale = input_ele.attr('data-sale');
    if (isOnSale == '1') {
      var sku_number = parseInt(input_ele.val());
      var sku_id = input_ele.data('sku-id');
      var spu_id = input_ele.data('spu_id');
      if (sku_number && sku_id && spu_id) {
        checkStock(sku_id, spu_id, sku_number);
      }
    }
  });
}
/* 检查库存 */
function checkStock(sku_id,spu_id, qty) {
    $.ajax({
        type: 'POST',
        async: true,
        dataType: 'JSON',
        url: '/goods/goods/check-sku-stock',
        data: {'sku_id':sku_id,'spu_id':spu_id,'sku_number':qty},
        headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
        success: function success(data) {
            checkStockResponse(data, sku_id);
        }
    });
}
/* 检查库存回调函数 */
function checkStockResponse(res, sku_id) {
    if (res.err_no) {
        changeAddToBagBtn(0);
    } else {
        if (typeof res.is_ajun_flash_sale != 'undefined' && res.is_ajun_flash_sale) {
            $('#AECMP_FORMBUY .pro-ordinary .spec_list a').removeClass('disabled');
        }
        if($('#goods_limit_buy_number_info .limit_buy_txt > span.text-danger').length && $('#goods_limit_buy_number_info .limit_buy_txt > span.text-danger').html() == '0'){
            changeAddToBagBtn(0);
        }else{
            changeAddToBagBtn(1);
        }
    }
    if ($('#goods_subtotal_id').length && res.goods_subtotal) {
        $('#goods_subtotal_id').html(res.goods_subtotal);
    }
    var goods_sku_model_string = '';
    if (res.goods_sku_model != '' && $('#' + res.goods_sku_model).length) {
        goods_sku_model_string = res.goods_sku_model;
    } else if (res.goods_sku_model_new != '' && $('#' + res.goods_sku_model_new).length) {
        goods_sku_model_string = res.goods_sku_model_new;
    }
    if (goods_sku_model_string) {
        var goods_sku_model_ele = $('#' + goods_sku_model_string);
        if (goods_sku_model_ele.attr('sku_price') == res.price) {
            $('#content_time_flashPic').hide();
            $('#pro-promote-price,#pro-old-price').addClass('d-none');
            $('#pro-shop-price').html(goods_sku_model_ele.attr('sku_price')).removeClass('d-none');
        } else if (goods_sku_model_ele.attr('sku_discount_price') == res.price) {
            $('#content_time_flashPic').hide();
            if (goods_sku_model_ele.attr('sku_price') != '0') {
                $('#pro-shop-price').addClass('d-none');
                $('#pro-old-price').html(goods_sku_model_ele.attr('sku_price')).removeClass('d-none');
                $('#pro-promote-price').html(goods_sku_model_ele.attr('sku_discount_price')).addClass('active').removeClass('d-none');
            } else {
                $('#pro-shop-price').addClass('d-none');
                $('#pro-old-price').addClass('d-none');
                $('#pro-promote-price').html(goods_sku_model_ele.attr('sku_discount_price')).addClass('active').removeClass('d-none');
            }
        } else {
            if ($('#pro-old-price').hasClass('is_promotegoods')) {
                $('#pro-shop-price').addClass('d-none');
                if ($('#pro-promote-price').hasClass('is_flashsale_stock_show')) {
                    $('#pro-promote-price').html(res.price).addClass('active').removeClass('d-none');
                } else {
                    $('#pro-promote-price').html(res.price + '<span>(Sale)</span>').addClass('active').removeClass('d-none');
                }
                $('#pro-old-price').html($('#pro-old-price').attr('data')).removeClass('d-none');
            } else {
                $('#pro-promote-price').addClass('d-none');
                $('#pro-old-price').addClass('d-none');
                $('#pro-shop-price').html(res.price).removeClass('d-none');
            }
            if ($('#content_time_flashPic').hasClass('is_flashgoods')) {
                $('#content_time_flashPic').show();
            }
            if ($('#pro-wholesale-price.d-none').length <= 0) {
                $('#pro-wholesale-price').show();
            }
        }
    }
  /* google analytics 设置sku_id */
    if (typeof res.sku_id != 'undefined') {
        $("#sku_id").val(res.sku_id);
        if ($('#collect-' + sku_id).length) {
            $('#collect-' + sku_id).attr('data-sku-id', res.sku_id);
        }
    }
}

var flashsaleSetInterval = null;
function flashsaleTime(sku_id) {
    if($('#content_time_flashPic').length){
        var now_server_time = new Date();
        var now_server_time_str = now_server_time.getTime();
        var end_time = parseInt($('#content_time_flashPic').attr('end_time'));
        var end_time_str = end_time*1000;
        if (end_time_str > now_server_time_str) {
            flashsaleSetInterval = setInterval(function () {
                GetRTime(sku_id, end_time_str, 0, 0);
            }, 1000);
        }
    }
}
// 倒计时
function GetRTime(id, endtime, interval_id, timediff) {
    function p(s) {
        return s < 10 ? '0' + s : s;
    }
    if (isNaN(endtime)) {
        var EndTime = new Date(endtime);
        
        var NowTime = new Date();
        var t = EndTime.getTime() - NowTime.getTime() + timediff;
    } else {
        var NowTime = new Date();
        var t = endtime - NowTime.getTime() + timediff;
    }
    if (t < 0) {
        clearInterval(parseInt(interval_id) + 1);
    } else {
        var d = Math.floor(t / 1000 / 60 / 60 / 24);
        var h = Math.floor(t / 1000 / 60 / 60 % 24);
        var m = Math.floor(t / 1000 / 60 % 60);
        var s = Math.floor(t / 1000 % 60);
        
        $('.gmt_end_time_d_' + id).html(d + 'D:');
        $('.gmt_end_time_h_' + id).html(p(h) + 'h:');
        $('.gmt_end_time_i_' + id).html(p(m) + 'm:');
        $('.gmt_end_time_s_' + id).html(p(s) + 's');
    }
}
function SpecDefaultSelect() {
  var color_ele = $('.pro-ordinary a.spec_Color');
  var size_ele = $('.pro-ordinary a.spec_Size');
  var color_ele_active =$('.pro-ordinary a.spec_Color.active').length>0 ? $('.pro-ordinary a.spec_Color.active') : null;
  var size_ele_active =$('.pro-ordinary a.spec_Size.active').length>0 ? $('.pro-ordinary a.spec_Size.active') : null;

  if (color_ele.length) {
    if (color_ele_active==null) {
      // color_ele.addClass('disabled').attr('disabled', 'disabled');
    } else {
      var new_img_url = $('#goods-img-color-' + color_ele_active.attr('nameattr')).attr('value');
      if (new_img_url && typeof google_e_id != 'undefined' && !google_e_id) {

        // quick view
        if ($('#thumbs .swiper-slide:first-child').length) {
            //updateSwipers(new_img_url, 'quick');
            $('#thumbs .swiper-slide:first-child img').attr('src', new_img_url);
        }
        if ($('#gallery .swiper-slide:first-child').length) {
            //updateSwipers(new_img_url, 'quick');
            $('#gallery .swiper-slide:first-child img').attr('src', new_img_url);
        }

        // 针对于详情页缩略图/预览图
        if ($('#thumbs_detail .swiper-slide:first-child').length) {
            //updateSwipers(new_img_url, 'detail');
            $('#thumbs_detail .swiper-slide:first-child img').attr('src', new_img_url);
        }
        if ($('#gallery_detail .swiper-slide:first-child').length) {
            // updateSwipers(new_img_url, 'detail');
            $('#gallery_detail .swiper-slide:first-child img').attr('src', new_img_url);
        }
      }
    }
  }
  if (size_ele.length && size_ele_active==null) {
    size_ele.addClass('disabled').attr('disabled', 'disabled');
  }
  if(color_ele_active!=null) {
    checkSkuSizeStock(color_ele_active);
  }
  if(size_ele_active!=null){
    checkSkuColorStock(size_ele_active);
  }
}
function attrSkuPrice(params) {
  var defer = $.Deferred();
  $.ajax({
    type: 'POST',
    dataType: 'json',
    async: true,
    url: '/goods/goods/attr-sku-price',
    data:params,
    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
    success: function success(data) {
      defer.resolve(data)
    }
  })
  return defer.promise();
}
function show_sku_price(rec_id='') {
  var color_id=$('.pro-ordinary a.spec_Color.active').attr('namevalue');
  var spu_id=$('.pro-ordinary a.spec_Color.active').attr('spu_id');
  var size_id=$('.pro-ordinary a.spec_Size.active').attr('namevalue');
    var color_number = 0;
    if($('.pro-ordinary a.spec_Color').length > 1){
        var color_ids=new Array();
        $('.pro-ordinary a.spec_Color').each(function(i) {
            if(i == 0){
                color_ids.push($(this).attr('namevalue'));
                color_number = 1;
            }else if($.inArray($(this).attr('namevalue'), color_ids)!=-1) {
                color_ids.push($(this).attr('namevalue'));
                color_number = color_number + 1;
            }
        })
        if(color_number > 1){
            var color_sku_id_tmp =$('.pro-ordinary a.spec_Color.active').attr('color_sku_id');
        }else{
            var color_sku_id_tmp = 0;
        }
    }else{
        var color_sku_id_tmp = 0;
    }
    
    var params={'color_id': color_id, 'size_id': size_id, 'spu_id': spu_id, 'color_sku_id':color_sku_id_tmp}
  $.when(attrSkuPrice(params)).done(function(data){
      $('#quick_final_price').html(data.final_price);
      $('#detail_final_price').html(data.final_price);
      $('.left-current .gcard-price__current').html(data.final_price);
      if(data.sale_price!=data.final_price){
        $('#quick_sale_price').html(data.sale_price);
        $('#quick_percent').html(data.percent);
        $('#quick_final_price').addClass('text-danger');

        $('#detail_sale_price').html(data.sale_price);
        $('#detail_percent').html(data.percent);
        $('#detail_final_price').addClass('text-danger');

        $('.left-current .gcard-price__current').addClass('text-danger')
        $('.left-current .gcard-price__old').html(data.sale_price);
      } else {
        $('#quick_sale_price').html('');
        $('#quick_final_price').removeClass('text-danger');

        $('#detail_sale_price').html('');
        $('#detail_final_price').removeClass('text-danger');
      }
      
      if(typeof data.skuinfo != 'undefined' && data.skuinfo && typeof data.skuinfo.sku != 'undefined'){
        $('#quick-modal-body .whistlist_icon').attr('data-sku', data.skuinfo.sku);
        $('#sku_id').attr('data-sku', data.skuinfo.sku);
      }

      if(typeof data.wholesale_txt != 'undefined' && data.wholesale_txt){
          $('#wholesale_price_info').html(data.wholesale_txt);
          $('#wholesale_price').addClass('show_wholesale_txt');
          // $('#wholesale_price').removeClass('d-none');
      }else{
          $('#wholesale_price').removeClass('show_wholesale_txt');
          // $('#wholesale_price').addClass('d-none');
      }
      //预售
      if(data.presale_block){
        $('#presale_block').html(data.presale_block);
        var preSaleTime=$(".goods-detail-preSale .presale-time-wrap span").eq(0).attr('data-time')
        if($(".goods-detail-preSale").length && preSaleTime && $('.goods-basic-display').length > 0){
          setPreSaleTime(parseInt(preSaleTime))
        }
      } else{
          $('#presale_block').html('');
      if(data.flashsale_block){
        $('#flashsale_block').html(data.flashsale_block);
        $('.el-goods-detail-flashsale').html(data.flashsale_block);

        if(flashsaleSetInterval){
            clearInterval(flashsaleSetInterval);
        }
        flashsaleTime(data.sku_id);
      } else{
          $('#flashsale_block').html('');
          $('.el-goods-detail-flashsale').html('');
      }
      }
      if (data.is_flashsale == 1 && typeof data.limit_buy_number != 'undefined' && data.limit_buy_number == 0) {
          flash_sale_out = 1;
      }else{
          flash_sale_out = 0;
      }
      if(data.in_stock == 1){
          changeAddToBagBtn(1,rec_id);
      }else{
          changeAddToBagBtn(0,rec_id);
      }
  })
}

function changeAddToBagBtn(btn_status,rec_id='') {
  var isOnSale = $('#addToBag').attr('data-sale');
  if (btn_status == 0) {
    // $('#AECMP_FORMBUY .pro-ordinary .spec_list a.active').addClass('disabled');
    if(rec_id!='' && parseInt(rec_id)>0){
        $('#updateCartBtn').html(out_of_stock).addClass('btn-out-stock');
          $('#freeBtn').html(out_of_stock).addClass('btn-out-stock');
          $('.m-free-details--button-right').html(out_of_stock).addClass('btn-out-stock');
        $('#updateCartBtn').attr('data-sale', 0);
    }else{
        $('#addToBag').html(out_of_stock).addClass('btn-out-stock');
          $('#freeBtn').html(out_of_stock).addClass('btn-out-stock');
          $('.m-free-details--button-right').html(out_of_stock).addClass('btn-out-stock');
        $('#addToBag').attr('data-sale', 0);
    }
    $('.pro-plus').prop({ disabled: true });
  } else {
    $('#AECMP_FORMBUY .pro-ordinary .spec_list a.active').removeClass('disabled');
    if(rec_id!='' && parseInt(rec_id)>0){
        $('#updateCartBtn').html(continue_txt).removeClass('btn-out-stock');
          $('#freeBtn').html($('#freeBtn').data('activity-add-bag-title')).removeClass('btn-out-stock');
          $('.m-free-details--button-right').html($('.m-free-details--button-right').data('activity-add-bag-title')).removeClass('btn-out-stock');
        $('#updateCartBtn').attr('data-sale', 1);
    }else{
        $('#addToBag').html(add_to_bag).removeClass('btn-out-stock');
          $('#freeBtn').html($('#freeBtn').data('activity-add-bag-title')).removeClass('btn-out-stock');
          $('.m-free-details--button-right').html($('.m-free-details--button-right').data('activity-add-bag-title')).removeClass('btn-out-stock');
        $('#addToBag').attr('data-sale', 1);
    }
    $('.pro-plus').prop({ disabled: false });
  }
}

function check_stock_btn(rec_id='') {
  if($('.pro-ordinary a.spec_Color.active').hasClass('disabled') || $('.pro-ordinary a.spec_Size.active').hasClass('disabled')){
    changeAddToBagBtn(0);
  }else{
    if(rec_id){
      changeAddToBagBtn(1,rec_id);
    }else{
      changeAddToBagBtn(1);
    }
  }
}

function checkSkuColorStock(size_item) {
  var stock_goods_array=$.parseJSON(JSON.stringify(stock_goods));
  var size_attr_value_id=parseInt(size_item.attr('namevalue'));
  var size_array=new Array();

  $.each(stock_goods_array, function(index, value) {
    if($.inArray(size_attr_value_id, value)!=-1){
      size_array.push(value);
    }
  })

  $('.pro-ordinary a.spec_Color').each(function () {
    var color_attr_value_id = parseInt($(this).attr('namevalue'));
    var id_exists=false;
    $.each(size_array, function(index, value) {
      if($.inArray(color_attr_value_id, value)!=-1){
        id_exists=true;
      }
    })

    if(id_exists==false) {
      // $(this).addClass('disabled').attr('disabled', 'disabled');
    }else {
      $(this).removeClass('disabled').removeAttr('disabled');
    }
  });
}

function checkSkuSizeStock(color_item, color) {
  var stock_goods_array=$.parseJSON(JSON.stringify(stock_goods));
  var color_attr_value_id=parseInt(color_item.attr('namevalue'));
  var color_array=new Array();

  $.each(stock_goods_array, function(index, value) {
    if($.inArray(color_attr_value_id, value)!=-1){
      color_array.push(value);
    }
  })

  $('.pro-ordinary a.spec_Size').each(function () {
    var size_attr_value_id = parseInt($(this).attr('namevalue'));
    var id_exists=false;
    $.each(color_array, function(index, value) {
      if($.inArray(size_attr_value_id, value)!=-1){
        id_exists=true;
      }
    })
    if (!color) {
      if(id_exists==false) {
        $(this).addClass('disabled').attr('disabled', 'disabled');
      }else {
        $(this).removeClass('disabled').removeAttr('disabled');
      }
    }
  });
}

var THUMBS_SWIPER = null; // quick view 的橱窗图

function changeSwiperImg(img){
  var imgs = img,
      _thumbsSlide = THUMBS_SWIPER.slides,  // THUMBS_SWIPER 是全局变量
      _gallerySlide = gallerySwiper.slides;  // gallerySwiper 是全局变量
  if(imgs !== undefined && imgs.length > 0){

    if(_thumbsSlide.length > 0){  // 以橱窗图数量为准，大图开启loop，导致数量不准确
      for (var i = _thumbsSlide.length - 1; i >= 0; i--) {
        if(!$(_thumbsSlide[i]).hasClass("digger-video")){
          THUMBS_SWIPER.removeSlide(i);  // 清空橱窗图
          gallerySwiper.removeSlide(i);  // 清空轮播大图
        }
      }
    };

    // if(_gallerySlide.length > 0){  // 清空轮播大图
    //   for (var i = _gallerySlide.length - 1; i >= 0; i--) {
    //     if(!$(_gallerySlide[i]).hasClass("digger-video")){
    //       gallerySwiper.removeSlide(i);
    //     }
    //   }
    // };

    for (var i = 0; i < imgs.length; i++) {  // 添加橱窗图和轮播大图
      var maxImg   = imgs[i].spu_img || imgs[i].sku_attr_img,
          smallImg = imgs[i].spu_img_small || imgs[i].sku_attr_img_small;
      THUMBS_SWIPER.addSlide(i+1,`<div class="swiper-slide"><img class="img-fluid" src="${smallImg}"></div>`);
      gallerySwiper.addSlide(i+1,`<div class="swiper-slide" data-src="${maxImg}"><img class="img-fluid" src="${maxImg}"></div>`);
      gallerySwiper.slideTo(1);
    };

  }
};
function processor(fn, milliseconds) {
  var timeoutId;
  var process = function () {
      clearTimeout(timeoutId);
      var self = this,
          args = arguments;
      timeoutId = setTimeout(function () {
        fn.apply(self, args);
      }, milliseconds || 300);
  }
  return function () {
      process.apply(this, arguments);
  };
}
function toastLoading () {
    var str = '<div class="toast show loading size-loading"><div class="toast-wrapper"><img src="https://images.komily.com/banner/2021/08/02/14780287454885013.gif" class="size-loading-icon"></div></div>';
    let falg=$(".goods-detail-size .goods-detail-pro__lable .size-loading").length>0
    falg?$(".size-loading").fadeIn():$(".goods-detail-size .goods-detail-pro__lable").append(str);
    setTimeout(() => {
        $(".size-loading").fadeOut();
    }, 1200);
}
$(function () {
    $('#quickViewModal').on('hidden.bs.modal', function() {
      $("#quickViewModal .goods-detail-preSale .presale-time-wrap span").eq(0).html('00D : 00H : 00M : 00S')
      if(window._page!='goods'){
        clearInterval(inter);
      }
    });
    // 描述
    $('body').on('click', '.collapse-card', function () {
        var that = $(this);
        var controlsKey = that.find("button").attr('aria-controls');
        window.sessionStorage.setItem('CONTROLS_KEY', controlsKey);
    });

  $(document).on('click', '.pro-ordinary a.spec_Color', processor(function () {
    var __this = $(this);
    var __spu_id = $(this).attr('associated_spu_id');
    var __sku_id = $(this).attr('associated_sku_id');
    // 获取旧的缩略图
    getImgList();

      if (!__spu_id) {
        toastLoading();
      }

      // 商详页切换关联SPU体验优化
      if (__spu_id) {
        var str = '<div class="toast show loading size-loading"><div class="toast-wrapper"><img src="https://images.komily.com/banner/2021/08/02/14780287454885013.gif" class="size-loading-icon"></div></div>';
        let falg=$(".goods-detail-size .goods-detail-pro__lable .size-loading").length>0
        falg?$(".size-loading").fadeIn():$(".goods-detail-size .goods-detail-pro__lable").append(str);
        $.ajax({
            type: 'GET',
            async: true,
            url: '/goods/goods/ajax-get-spu-info?spu_id=' + __spu_id + '&sku_id=' + __sku_id,
            headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
            success: function success(data) {

                var __data = JSON.parse(data)
                if ('history' in window && 'replaceState' in history) {
                    var yypm = location.search.substr(location.search.indexOf('yypm='))
                    var url = __data.default_sku.sku_url
                    if(yypm){
                      url = url + (__data.default_sku.sku_url.indexOf('?')<0 ? '?':'&') + yypm 
                    }
                    window.history.replaceState({}, '', url);
                }
                getOutfit(__spu_id,__sku_id);

                $('#goods-basic-display').replaceWith(__data.goods_details)
                
                $('#swiper-wrapper-gallery .swiper-slide').each(function () {
                    $(this).find('img').attr('src', $(this).find('img').data('src'))
                })
                $('#swiper-wrapper-thumbs .swiper-slide').each(function () {
                    $(this).find('img').attr('src', $(this).find('img').data('src'))
                })

                $(".size-loading").fadeOut();

                ctag('GoodsDetailColor', {
                  sku_id: __sku_id,
                  sku: $('#sku_id').data().sku
                }, false, $('.pro-ordinary a.spec_Color.active'));

                var youLikeSwiper = null;
                function youLikeSwiperInit2() {
                  
                    var winWidth = $(window).width();
                    var containerId = '.you-like-wrapper';
                    if (winWidth >= 992 && youLikeSwiper === null) {
                      youLikeSwiper = new Swiper(containerId + ' .index-swiper', {
                        lazy: true,
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        navigation: {
                          nextEl: containerId + ' .swiper-button-next',
                          prevEl: containerId + ' .swiper-button-prev'
                        },
                        watchSlidesVisibility: true,
                        breakpoints: {
                          480: { //当宽度小于等于320 
                            slidesPerView: 2,
                            slidesPerGroup: 2
                          },
                          768: { //当宽度小于等于640  
                            slidesPerView: 3,
                            slidesPerGroup: 3
                          }
                        }
                      });
                    } else if (winWidth < 992) {
                      if (youLikeSwiper !== null) {
                        youLikeSwiper.destroy();
                        youLikeSwiper = null;
                      }
                      $(containerId).find(".swiper-lazy").each(function (e) {
                        var _this = $(this);
                        var _original = _this.attr("data-src");
                        _this.attr("data-src", _original).addClass("lazyload");
                      });
                    };
                };

                $.ajax({
                  type: 'POST',
                  dataType: 'html',
                  url: '/goods/goods/ajax-recommend',
                  data: { 'spu_id': __spu_id},
                  headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
                  success: function success(data) {
                    if (data != '0') {
                      $('#AECMP_RECOMMEND').html(data);
                      youLikeSwiperInit2();
                      $(window).resize(function () {console.log(3456); youLikeSwiperInit2() });
                    } else {
                      $('#AECMP_RECOMMEND').hide()
                    }
                  }
                });

                $.ajax({
                  type: 'POST',
                  dataType: 'html',
                  url: '/goods/goods/ajax-history',
                  data: { 'spu_id': __spu_id},
                  headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
                  success: function success(data) {
                    if (data != '0') {
                      $('#AECMP_HISTORY').html(data);
                      var recentlySwiper = new Swiper('.recently-viewed-wrapper .swiper-container', {
                        direction: 'horizontal', // 水平切换选项
                        lazy: true,
                        observer: true,
                        observeParents: true,
                        // 如果需要前进后退按钮
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                        navigation: {
                          nextEl: '.recently-viewed-wrapper .swiper-button-next',
                          prevEl: '.recently-viewed-wrapper .swiper-button-prev'
                        },
                        pagination: {
                          el: '.recently-viewed-wrapper .swiper-pagination',
                          clickable:true
                        },
                        breakpoints: {
                          480: { // 当宽度小于等于320
                            slidesPerView: 2,
                            slidesPerGroup: 2
                          },
                          768: { // 当宽度小于等于640
                            slidesPerView: 3,
                            slidesPerGroup: 3
                          }
                        }
                      });
                      goodsListAjax('[data-scene]');
                      // require('./recentlySwiper.js');
                    } else {
                      $('#AECMP_HISTORY').hide()
                    }
                  }
                });

                $.ajax({
                  type: 'POST',
                  data: { 'sku_id': __sku_id, 'page': 1, 'review_type': 0, 'source': isMobileDevices() ? 2 : 1 },
                  headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                  url: "/goods/goods/comment",
                  success: function success(res) {
                    flashsaleTime(__sku_id)
                    if (res && res != '') {
                      if (__device_type().mobile) {
                        $('#reviewsModalListBox').html(res); // 切换tab是替换全部内容
                      } else {
                        $('#reviewsModalListBox').append(res); // 没切换tab是插入内容
                      }
                    }
                    if (res && res != '') {
                      $('#AECMP_COMMENT').html(res); // 切换tab是替换全部内容
                      $('#AECMP_COMMENT').show()
                      var sku_id = $('#sku_id').val();
                      __getGoodsCommentList(sku_id, 1, 0);
                    } else {
                      $('#AECMP_COMMENT').hide()
                      return false
                    }
                    if (!res) {
                      return false
                    }
                    if ($('#g_page_commet_tip').hasClass('d-none')) {
                      var rating_age = $('#g_comment_alue_rating_age').val();
                      $('#g_page_comment_score').attr('data-score', rating_age);
                      $('#g_page_comment_star').html(rating_age);
                      if ($('#g_comment_count').val()) {
                        if ($('#g_comment_count').val() == '1') {
                          $('#g_page_comment_count i').html($('#g_comment_count').val());
                        } else {
                          $('#g_page_comment_count i').html($('#g_comment_count').val());
                        }
                      }
                      $('#g_page_commet_tip').show().addClass('d-flex').removeClass('d-none');
                    }
                  }
                })

                function getUserCollections() {
                    var defer = $.Deferred();
                    $.ajax({
                        url: '/goods/goods/get-user-collections',
                        type: "get", // 请求类型
                        dataType: 'json',
                        async: true, // 是否异步
                        success: function (ret) {
                            defer.resolve(ret)
                        }
                    });
                    return defer.promise();
                  }
                  var get_user_collections = function get_user_collections(is_quickview) {
                    $.when(getUserCollections()).done(function(res){
                      if (typeof res != 'undefined' && res) {
                        if (!is_quickview) {
                          $('.pro-collect').find('use').attr('xlink:href', '#wish');
                          $('.pro-collect').removeClass('text-danger');
                          $('.pro-collect-text').html('Add To Wishlist');
                        }
                        for (var prop in res) {
                          if (res.hasOwnProperty(prop)) {
                            if ($('#myBag').length) {}
                            if ($('#collect-' + res[prop]).length) {
                              if (!is_quickview) {
                                $('#collect-' + res[prop]).addClass('text-danger'); // by lg
                                $('#collect-' + res[prop]).find('use').attr('xlink:href', '#wish-over');
                                $('.collect2-' + res[prop]).find('use').attr('xlink:href', '#wish-over2');
                                $('#collect-text-' + res[prop]).html(add_to_bag_added);
                              } else if ($('#quickViewModal #collect-' + res[prop]).length) {
                                $('#quickViewModal #collect-' + res[prop]).addClass('text-danger'); // by lg
                                $('#quickViewModal #collect-' + res[prop]).find('use').attr('xlink:href', '#wish-over');
                                $('#quickViewModal #collect-text-' + res[prop]).html(add_to_bag_added);
                              }
                            }
                          }
                        }
                      }
                    });
                  };
                  get_user_collections()

                $.ajax({
                  type: 'GET',
                  async: true,
                  data: 'spu_id=' + $('#spu_id').val() + '&goods_cate_id=' + $('#sku_id').attr('data-category-id'),
                  url: '/hotsale/list/ajax-goods-ranking',
                  success: function success(res) {
                    if(typeof res!='undefined' && res && res!=''){
                      $('#Leaderboard-wrap').html(res)
                    }else{
                      $('#Leaderboard-wrap').hide()
                      $('#Leaderboard-wrap').next().hide()
                    }
                  },
                  error: function error(res) { 
                  },
                });

                if ($('#AECMP_TAG').length) {
                  var spu_id=$('#spu_id').val();
                  $.ajax({
                    type: 'POST',
                    async: true,
                    dataType: 'html',
                    data: { 'spu_id': spu_id },
                    headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                    url: '/goods/goods/ajax-goods-tag',
                    success: function success(data) {
                      if (data != '0') {
                        $('#AECMP_TAG').html(data);
                        addMoreLinksDetail('.link-group');
                      } else {
                        $('#AECMP_TAG').html('');
                      }
                    }
                  });
                }

                if ($('#size_chart').length) {
                  $('#size-guide-body').html($('#size_chart').html());
                  $('#size_chart').empty();
                }
                expandCollapse();
                SpecDefaultSelect();
                show_sku_price();
                init_shoes_size_tips();

              var THUMBS_SWIPER = new Swiper('#thumbs_detail', {
                  initialSlide: 0,
                  // loop: false,
                  direction: 'vertical',
                  spaceBetween: 10,
                  slidesPerView: 5,
                  observer: true,
                  observeParents: true,
                  autoScrollOffset: 1,
                  watchSlidesVisibility: true, // 防止不可点击
                  updateOnImagesReady: true,
                  breakpoints: {
                      // 当宽度小于等于540
                      576: {
                          slidesPerView: 2.6
                      }
                  },
                  navigation: {
                      nextEl: '.swiper-nav .swiper-button-down',
                      prevEl: '.swiper-nav .swiper-button-up'
                  },
                  on: {
                      imagesReady: function () {
                        this.update();
                      },
                      resize: function () {
                        this.update();
                      },
                      click: function click() {
                          if (GALLERY_SWIPER && GALLERY_SWIPER.activeIndex == this.clickedIndex + 1) {
                              var $galleryActiveSlide = $(GALLERY_SWIPER.slides[GALLERY_SWIPER.activeIndex]);
                              $galleryActiveSlide.find('img').attr('src', $galleryActiveSlide.data('src'));
                          }
                      },
                      slideChangeTransitionEnd: function(){
                         // console.log(this.activeIndex);
                      },
                  }
              });

                var GALLERY_SWIPER = new Swiper('#gallery_detail', {
                    initialSlide: 0,
                    autoHeight: true,
                    observer: true,
                    observeParents: true,
                    autoScrollOffset: 1,
                    watchOverflow: true,
                    centerInsufficientSlides: true,
                    updateOnImagesReady: true,
                    allowTouchMove: true,
                    // preventClicksPropagation: true,
                    navigation: {
                        nextEl: '#gallery_detail .swiper-button-next',
                        prevEl: '#gallery_detail .swiper-button-prev'
                    },
                    pagination: {
                        el: '#gallery_detail .swiper-pagination',
                        clickable: true
                    },
                    slidesPerView: 1,
                    breakpoints: {
                        768: {
                            slidesPerView: 1.5,
                            spaceBetween: 5 * dpr
                        }
                    },
                    thumbs: {
                        swiper: THUMBS_SWIPER
                    }
                });

                THUMBS_SWIPER.update();
                GALLERY_SWIPER.update();
                swiperNext(GALLERY_SWIPER);
                swiperPrev(GALLERY_SWIPER);
                gallerySwipers(GALLERY_SWIPER);
                $('.swiper-pagination span').eq(0).trigger('click');

            }
        })
      }
      // 商详页切换关联SPU体验优化
  
      // $('.el-loadding').addClass('is-loading');
      $(this).addClass('active').siblings().removeClass('active');
      var rec_id=$(this).attr('rec_id');
      var new_img_url
      var eTag = $('.goods-img-color-' + $(this).attr('namevalue'))
      if(eTag.length>1){
        new_img_url = eTag.eq(__this.index()).attr('value');
      }else{
        new_img_url = $('#goods-img-color-' + $(this).attr('namevalue')).attr('value');
      }
      if (new_img_url) {
          // quick view
          if ($('#thumbs .swiper-slide.swiper-slide-active').length) {
              if (!$('#thumbs .swiper-slide.swiper-slide-active').hasClass('digger-video')) {
                $('#thumbs .swiper-slide.swiper-slide-active img').attr('src', new_img_url);
              }
              // updateSwipers(new_img_url, 'quick');
          }
          if ($('#gallery .swiper-slide.swiper-slide-active').length) {
              if (!$('#gallery .swiper-slide.swiper-slide-active').hasClass('digger-video')) {
                  $('#gallery .swiper-slide.swiper-slide-active img').attr('src', new_img_url);
              }
              // updateSwipers(new_img_url, 'quick');
          }
          // 针对于详情页缩略图/预览图
          if ($('#thumbs_detail .swiper-slide.swiper-slide-active').length) {
              if (!$('#thumbs_detail .swiper-slide.swiper-slide-active').hasClass('digger-video')) {
                $('#thumbs_detail .swiper-slide.swiper-slide-active img').attr('src', new_img_url);
              }
              // updateSwipers(new_img_url, 'detail');
          }
          if ($('#gallery_detail .swiper-slide.swiper-slide-active').length) {
              if (!$('#gallery_detail .swiper-slide.swiper-slide-active').hasClass('digger-video')) {
                $('#gallery_detail .swiper-slide.swiper-slide-active img').attr('src', new_img_url);
              }
              // updateSwipers(new_img_url, 'detail');
          }
      }
  
      if ($('.pro-ordinary a.spec_Color.active').length && $('.pro-ordinary a.spec_Size.active').length) {
        checkSkuSizeStock($('.pro-ordinary a.spec_Color.active'), 'color');
      }
  
      if (!__spu_id) {
        change_sku(this, true);
        show_sku_price(rec_id);
      }
  
      change_sku_id(changeSwiperImg, true);
    }, 1));
    $(document).on('click', '.pro-ordinary a.spec_Size', processor(function () {
        window._app_data.app_link_id = $('#sku_id').val()
        toastLoading();
        // 获取旧的缩略图
        getImgList();
      //   $('.el-loadding').addClass('is-loading');
        $(this).addClass('active').siblings().removeClass('active');
        $(this).addClass('size-active').siblings().removeClass('size-active');
        var rec_id=$(this).attr('rec_id');
        setTimeout(() => {
          if ($('.pro-ordinary a.spec_Color.active').length && $('.pro-ordinary a.spec_Size.active').length) {
            checkSkuColorStock($('.pro-ordinary a.spec_Size.active'));
         }
         change_sku(this, false);
  
         show_sku_price(rec_id);
          change_sku_id(changeSwiperImg, false);
          if (breakpoint == 'md') {
            show_shoes_size_tips(this);
          }
        }, 100);
        
        
        
      }, 1));
    var quickViewFalg = false //防止多次点击导致浏览器奔溃
    var _app = __device_type().app
    if(!_app){
  $('body').on('click', '.viewGo', function () {
      if(quickViewFalg) return;
      quickViewFalg = true;
        if($(".home-main").length>0 || $("#presale-wrap").length>0){
        if (!isMobileDevices()){
            $("#quickViewModal").removeClass('index-quickViewModal')
            $("#quickViewModal .modal-dialog-centered").removeClass('modal-dialog-flex-end')
            $('#quick-modal-body').addClass('d-flex align-items-start')
          }else if(!$("#quickViewModal").hasClass('index-quickViewModal')){
            $("#quickViewModal").addClass('index-quickViewModal')
            $("#quickViewModal .modal-dialog-centered").addClass('modal-dialog-flex-end')
            $('#quick-modal-body').removeClass('d-flex align-items-start')
          }
      }
    var gallerySwiper = null;
    var THUMBS_SWIPER = null;
    var pay_btn_ele = $(this);
    if ($(this).hasClass('prevent_submit')) {
        quickViewFalg = false
      return;
    }
    pay_btn_ele.addClass('prevent_submit');
    $('#quickViewModal').addClass('modal-loading');
    $('#quick-modal-body').html('<div class="la-ball-clip-rotate align-self-center"><div></div></div>');
    $('#quickViewModal').modal('show');

    if (window.location.pathname.includes('secure_checkout')) {
      url = '/goods/goods/quick-view';
      params = {
        sku_id: $(this).data('sku_id'),
        spu_id: $(this).data('spu_id'),
        rec_id: $(this).data('rec_id')
      };
      var rec_id=$(this).data('rec_id');
    } else {
      url = '/goods/goods/quick-view';
      params = {
        spu_id: $(this).attr('spu_id'),
        sku_id: $(this).attr('sku_id')
      };
    }
    $.ajax({
      type: 'POST',
      async: true,
      dataType: 'html',
      url: url,
      data: params,
      headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
      success: function success(data) {
          quickViewFalg = false
        if (data != 0) {
          $.ajaxSetup({ cache: true });
          $('#quickViewModal').removeClass('modal-loading');
          $('#quick-modal-body').html(data);
          //showVideoBefore();
          if (user_is_login) {}
          $.ajaxSetup({ cache: false });
          stepper_num('.pro-minus');
          stepper_num('.pro-plus');          
          if ($('#size_chart').length) {
            $('#size-guide-body').html($('#size_chart').html());
            $('#size_chart').empty();
          }
          if (pay_btn_ele.parents(".swiper-slide").length) {
              $('#addToBag').attr('data-product-index', pay_btn_ele.parents(".swiper-slide").index())
              $('#addToBag').attr('data-add-scene', pay_btn_ele.data('add-scene'))
          }
          if($('.index-quickViewModal.show').length>0){
            if ($('#quick-swiper-gallery .swiper-slide').length <= 1) {
              $('#quick-swiper-gallery').attr('style', 'display: flex;justify-content: center')
            } else {
                $('#quick-swiper-gallery').attr('style', '')
            }
          }
          setTimeout(function () {
              if(THUMBS_SWIPER){ THUMBS_SWIPER.destroy(); THUMBS_SWIPER = null; }
            THUMBS_SWIPER = new Swiper('#thumbs', {
              initialSlide:0,//sku_index,
              loop: false,
              direction: 'vertical',
              spaceBetween: 10,
              slidesPerView: 5,
              watchSlidesVisibility: true, // 防止不可点击
              breakpoints: {
                // 当宽度小于等于540
                576: {
                  slidesPerView: 2.6
                }
              },
              navigation: {
                nextEl: '.swiper-nav .swiper-button-down',
                prevEl: '.swiper-nav .swiper-button-up'
              },
              on: {
                click: function click() {
                  if (gallerySwiper && gallerySwiper.activeIndex == this.clickedIndex + 1) {
                    var $galleryActiveSlide = $(gallerySwiper.slides[gallerySwiper.activeIndex]);
                    $galleryActiveSlide.find('img').attr('src', $galleryActiveSlide.data('src'));
                  }
                },
                slideChangeTransitionEnd: function() {

                }
              }
            });

              if(gallerySwiper){ gallerySwiper.destroy(); gallerySwiper = null; }
            gallerySwiper = new Swiper('#gallery', {
              initialSlide: 0, // sku_index,
              autoHeight: true,
              slidesPerView: 'auto',
              navigation: {
                nextEl: '#gallery .swiper-button-next',
                prevEl: '#gallery .swiper-button-prev'
              },
              on: {
                init: function init() {
                  this.height = $(this.slides[0]).height();
                },
                slideChange: function slideChange() {
                  var $activeSlide = $(this.slides[this.activeIndex]);
                  $activeSlide.find('img').attr('src', $activeSlide.data('src'));
                },
              },
              thumbs: {
                swiper: THUMBS_SWIPER
              }
            });

            THUMBS_SWIPER.update();
            gallerySwiper.update();

            // 一张图片不轮播
            // if (gallerySwiper.slides.length <= 3) {  // bylg 20210111
            //   gallerySwiper.navigation.$nextEl.css('display', 'none');
            //   gallerySwiper.navigation.$prevEl.css('display', 'none');
              // gallerySwiper.destroy();
            // }
          }, 600);
          flashsaleTime(goods_id);
          SpecDefaultSelect();
          show_sku_price();
          init_shoes_size_tips();
          get_user_collections(1);
          if(typeof rec_id =="undefined" && !flash_sale_out){
            check_stock_btn();
          }
          change_sku_id();
        } else {
          $('#quickViewModal').removeClass('modal-loading');
          $('#quick-modal-body').empty();
          $('#quickViewModal').modal('hide');
        }
      },
      error: function error(err) {
          quickViewFalg = false
        $('#quickViewModal').removeClass('modal-loading');
        $('#quick-modal-body').empty();
        $('#quickViewModal').modal('hide');
        pay_btn_ele.toast({ msg: err, duration: 2000 });
      },
      complete: function complete(res) {
        pay_btn_ele.removeClass('prevent_submit');
      }
    });
  });
    }

  // wish
  if ($('.pro-collect').length) {
    get_user_collections(0);
  }

  // $('body').on('mouseenter', '.sku-map-item', function () {
  //   get_user_collections(0);
  // });
  

  // 初始化数量选择按钮
  parseInt($('.pro-input').val()) == 1 ? $('.pro-minus').prop({ disabled: true }) : $('.pro-minus').prop({ disabled: false });
  // 尺码提示
  init_shoes_size_tips();

  $('body').on('click', '#head-cart-list .delete-btn', function () {
    var id = $(this).data('rec_id');
    var current_url = window.location.href;
    if (current_url.indexOf('cart/index/index') != -1) {
      window.location.href = '/cart/ajax/drop_goods?id=' + id;
    } else {
      var drop_goods_number = parseInt($('#limit_goods_' + id).attr('data'));
      $.ajax({
        type: 'POST',
        async: true,
        dataType: 'json',
        url: '/cart/index/remove-cart-goods',
        data: {"id":id},
        headers:{'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')},
        success: function success(result) {
          var data_spu = $('#limit_goods_' + id).attr('data-spu');
          var data_goods_number = $('#goods_number').val();
          var event_time = Math.round(new Date().getTime());
          gtag('event', 'remove_from_cart', {
            'event_label': event_time,
            "items": [
              {
                "id": "" + data_spu,
                "quantity": data_goods_number
              }
            ]
          });

            $('#shopBag .number').hide()
            $('#header .badge').hide()
          $('#menu_cart').html(result.product_list);
            getShopBagNumber()
          cart_slide(result);
          /*--- 产品限购活动处理 Digger ---*/
            if ($('.goods_limit_buy_number').length > 0) {
                var limit_number = $('.goods_limit_buy_number').attr('data-limit');
                if (typeof limit_number != 'undefined' && drop_goods_number) {
                    changeAddToBagBtn(parseInt(limit_number) + drop_goods_number);
                    $('.goods_limit_buy_number .limit_buy_txt').html(goods_limit_buy_number.replace('%d', parseInt(limit_number) + drop_goods_number)).show().attr('data-limit', parseInt(limit_number) + drop_goods_number);
                }
            }
          /*--- 产品限购活动处理 Digger ---*/
        }
      });
    }
  });
  // if ($('#js_address_list').length) {
  //   address_empty();
  // }
  // 回到顶部
    $('.pc-go-top').gotop();
    $('.m-fixed-right-img-top').mGotop();
});

function cart_slide(result){
  // zll
  setTimeout(function () {
    if (result.limit_buy_number != 0) {
      $('#addToBag').html(add_to_bag);
    }
  }, 2500);
  if ($('#quickViewModal').length) {
    $('#quickViewModal').modal('hide');
  }
  // 加入购物车成功后, 头部购物车下拉框下拉
  var screenW = document.documentElement.getBoundingClientRect().width;
  if (screenW >= 768) {
    $('.dropdown-shopcart .dropdown-menu').stop().slideDown(function () {
      var that = this;
      setTimeout(function () {
        if (!$(that).is(':hover')) {
          $(that).stop().slideUp('fast');
        }
        $('.dropdown-shopcart').hover(function () {
          $(that).stop().slideDown();
        }, function () {
          $(that).stop().slideUp();
        });
      }, 1500);
    });
  } else {
      // $('body').toast({ msg: 'Success', duration: 2000 });
  }
}


function gallerySwipers(el) {
    $("#swiper-wrapper-thumbs .swiper-slide").hover(function(e){
        var _that = $(this);
        // var indexTo = e.currentTarget.dataset.index;
        var indexTo = $(this).attr('data-index');
        $(this).addClass("active-nav").siblings().removeClass("active-nav");
        el.slideTo(_that.index(), 1000, false);
        // el.slideTo(Number(indexTo) + 1, 1000, false);
    })
}


function swiperLazy() {
  $('#gallery_detail .swiper-wrapper, #thumbs_detail .swiper-wrapper').find(".swiper-lazy").each(function (e) {
      var _this = $(this);
      var _original = _this.attr("data-src");
     _this.attr("src", _original);
  });
}

function quickSwiper(ele) {
    // 缩略图绑定滑过事件
    $("body").on("mouseover", "#thumbs .swiper-slide", function (e) {
        var _that = $(this);
        var indexTo = $(this).attr('data-index');
        // var indexTo = e.currentTarget.dataset.index;
        ele && ele.slideTo(_that.index(), 1000, false);
        // ele.slideTo(indexTo, 1000, false);
        // ele.slideTo(Number(indexTo) + 1, 1000, false);
        // ele && ele.slideTo(_that.index(), 1000, false);
    })
}


function closeVirSwiper(el) {
    $('body').on('click', '#closeSwiper', function (e) {
        $('.virtual-swiper').remove();
    });
}

function swiperNext(elem) {
    $('body').on('click', '#swiper-next', function (e) {
        if ($(this).hasClass('swiper-button-disabled')) {
            if (elem && elem != '' && elem.isEnd) {
                $('#swiper-next').attr('aria-disabled', 'true').addClass('swiper-button-disabled');
            } else {
                $('#swiper-next').attr('aria-disabled', 'false').removeClass('swiper-button-disabled');
            }
        }
        elem.navigation.update();
    })
}

function swiperPrev(elem) {
    $('body').on('click', '#swiper-prev', function (e) {
        if ($(this).hasClass('swiper-button-disabled')) {
            if (elem && elem != '' && elem.isEnd) {
                $('#swiper-prev').attr('aria-disabled', 'true').addClass('swiper-button-disabled');
            } else {
                $('#swiper-prev').attr('aria-disabled', 'false').removeClass('swiper-button-disabled');
            }
        }
        elem.navigation.update();
    })
}

// function updateSwipers(url, elem) {
//     var swiperList = '';
//     if (url !== '') {
//         swiperList = url.split(',');
//         var thumbshtml = '',
//             galleryhtml = '';

//         // 动态填充缩略图
//         for (var i= 0; i < swiperList.length; i++) {
//             var swiperImg = swiperList[i];
//             thumbshtml+= `<div class="swiper-slide slide-thumb" data-index="${i}"><img class="img-fluid" src="${swiperImg}"></div>`;
//             galleryhtml+= `<div class="swiper-slide" data-index="${i}" data-src="${swiperImg}"><img class="img-fluid" src="${swiperImg}"></div>`;
//         }

//         if (elem === 'quick') {
//             $('#quick-swiper-thumbs').html(thumbshtml);
//             $('#quick-swiper-gallery').html(galleryhtml);

//             var quickThumbsSwiper = new Swiper('#thumbs', {
//                 initialSlide: 0,
//                 direction: 'vertical',
//                 spaceBetween: 10,
//                 slidesPerView: 5,
//                 observer: true,
//                 observeParents: true,
//                 watchSlidesVisibility: true, // 防止不可点击
//                 breakpoints: {
//                     // 当宽度小于等于540
//                     576: {
//                         slidesPerView: 2.6
//                     }
//                 },
//                 navigation: {
//                     nextEl: '.swiper-nav .swiper-button-down',
//                     prevEl: '.swiper-nav .swiper-button-up'
//                 },
//                 on: {
//                     click: function click() {
//                         if (gallerySwiper && gallerySwiper.activeIndex == this.clickedIndex + 1) {
//                             var $galleryActiveSlide = $(gallerySwiper.slides[gallerySwiper.activeIndex]);
//                             $galleryActiveSlide.find('img').attr('src', $galleryActiveSlide.data('src'));
//                         }
//                    },
//                    slideChangeTransitionEnd: function slideChangeTransitionEnd(){
//                        // console.log(this.activeIndex);
//                    },
//                 }
//             });

//             var quickGallerySwiper = new Swiper('#gallery', {
//                 initialSlide: 0,
//                 autoHeight: true,
//                 observer: true,
//                 observeParents: true,
//                 navigation: {
//                     nextEl: '#gallery .swiper-button-next',
//                     prevEl: '#gallery .swiper-button-prev'
//                 },
//                 pagination: {
//                   el: '#gallery .swiper-pagination'
//                 },
//                 slidesPerView: 1,
//                 breakpoints: {
//                   768: {
//                     slidesPerView: 1.5,
//                     spaceBetween: 5 * dpr
//                   }
//                 },
//                 on: {
//                     init: function init() {
//                         this.height = $(this.slides[0]).height();
//                     },
//                     click: function click(e) {
//                         var _this = this,
//                             imgList = _this.imagesToLoad,
//                             // 获取当前swiper的图片集合
//                             imgFluid = '',
//                             // 定义封装img列表的变量
//                             virtualSwiperWrapper = ''; // 虚拟swiper

//                         if (imgList.length > 0 && _this.clickedIndex != undefined && _this.clickedSlide != undefined && e.target.nodeName != "VIDEO") {
//                             for (var i = 0; i < imgList.length; i++) {
//                                 imgFluid += '<div class="swiper-slide"><img class="img-fluid" src="' + imgList[i].src + '"/></div>';
//                             }

//                             virtualSwiperWrapper = $('<div class="swiper-container virtual-swiper">\n                                      <div class="swiper-wrapper">' + imgFluid + '</div>\n                                      <div class="swiper-button-next swiper-button-black"></div>\n                                      <div class="swiper-button-prev swiper-button-black"></div>\n                                      <div class="swiper-pagination swiper-pagination-black"></div>\n                                      <span id="closeVirtualSwiper" class="close-virtual-swiper">\n                                        <svg class="icon icon-close"><use xlink:href="#close"></use></svg>\n                                      </span>\n                                    </div>');
//                             virtualSwiperWrapper.appendTo('body');

//                             var virtualSwiper = new Swiper(virtualSwiperWrapper, {
//                                 mousewheel: true,
//                                 navigation: {
//                                     nextEl: '.swiper-button-next',
//                                     prevEl: '.swiper-button-prev'
//                                 },
//                                 pagination: {
//                                     el: '.swiper-pagination',
//                                     clickable: true
//                                 }
//                             });

//                             // 绑定关闭事件
//                             virtualSwiperWrapper.on('click', '#closeVirtualSwiper', function () {
//                                 virtualSwiperWrapper.remove();
//                             });
//                         }
//                     },
//                     slideChange: function slideChange() {
//                         var $activeSlide = $(this.slides[this.activeIndex]);
//                         $activeSlide.find('img').attr('src', $activeSlide.data('src'));
//                     },
//                     slideChangeTransitionEnd: function() {

//                     },
//                 },
//                 thumbs: {
//                     swiper: quickThumbsSwiper
//                 }
//             });
//             quickThumbsSwiper.update();
//             quickGallerySwiper.update();
//         } else {
//             $('#swiper-wrapper-thumbs').html(thumbshtml);
//             $('#swiper-wrapper-gallery').html(galleryhtml);
//             var thumbsSwiper = new Swiper('#thumbs_detail', {
//                 initialSlide: 0,
//                 direction: 'vertical',
//                 spaceBetween: 10,
//                 slidesPerView: 5,
//                 observer: true,
//                 observeParents: true,
//                 watchSlidesVisibility: true, // 防止不可点击
//                 breakpoints: {
//                     // 当宽度小于等于540
//                     576: {
//                         slidesPerView: 2.6
//                     }
//                 },
//                 navigation: {
//                     nextEl: '.swiper-nav .swiper-button-down',
//                     prevEl: '.swiper-nav .swiper-button-up'
//                 },
//                 on: {
//                     click: function click() {
//                         if (gallerySwiper && gallerySwiper.activeIndex == this.clickedIndex + 1) {
//                             var $galleryActiveSlide = $(gallerySwiper.slides[gallerySwiper.activeIndex]);
//                             $galleryActiveSlide.find('img').attr('src', $galleryActiveSlide.data('src'));
//                         }
//                    },
//                    slideChangeTransitionEnd: function slideChangeTransitionEnd(){
//                        // console.log(this.activeIndex);
//                    },
//                 }
//             });

//             var gallerySwiper = new Swiper('#gallery_detail', {
//                 initialSlide: 0,
//                 loop: false,
//                 autoHeight: true,
//                 observer: true,
//                 observeParents: true,
//                 navigation: {
//                     nextEl: '#gallery_detail .swiper-button-next',
//                     prevEl: '#gallery_detail .swiper-button-prev'
//                 },
//                 pagination: {
//                   el: '#gallery_detail .swiper-pagination'
//                 },
//                 slidesPerView: 1,
//                 breakpoints: {
//                   768: {
//                     slidesPerView: 1.5,
//                     spaceBetween: 5 * dpr
//                   }
//                 },
//                 on: {
//                     init: function init() {
//                         this.height = $(this.slides[0]).height();
//                     },
//                     click: function click(e) {
//                         var _this = this,
//                             imgList = _this.imagesToLoad,
//                             // 获取当前swiper的图片集合
//                             imgFluid = '',
//                             // 定义封装img列表的变量
//                             virtualSwiperWrapper = ''; // 虚拟swiper

//                         if (imgList.length > 0 && _this.clickedIndex != undefined && _this.clickedSlide != undefined && e.target.nodeName != "VIDEO") {
//                             for (var i = 0; i < imgList.length; i++) {
//                                 imgFluid += '<div class="swiper-slide"><img class="img-fluid" src="' + imgList[i].src + '"/></div>';
//                             }

//                             virtualSwiperWrapper = $('<div class="swiper-container virtual-swiper">\n                                      <div class="swiper-wrapper">' + imgFluid + '</div>\n                                      <div class="swiper-button-next swiper-button-black"></div>\n                                      <div class="swiper-button-prev swiper-button-black"></div>\n                                      <div class="swiper-pagination swiper-pagination-black"></div>\n                                      <span id="closeVirtualSwiper" class="close-virtual-swiper">\n                                        <svg class="icon icon-close"><use xlink:href="#close"></use></svg>\n                                      </span>\n                                    </div>');
//                             virtualSwiperWrapper.appendTo('body');

//                             var virtualSwiper = new Swiper(virtualSwiperWrapper, {
//                                 mousewheel: true,
//                                 navigation: {
//                                     nextEl: '.swiper-button-next',
//                                     prevEl: '.swiper-button-prev'
//                                 },
//                                 pagination: {
//                                     el: '.swiper-pagination',
//                                     clickable: true
//                                 }
//                             });

//                             // 绑定关闭事件
//                             virtualSwiperWrapper.on('click', '#closeVirtualSwiper', function () {
//                                 virtualSwiperWrapper.remove();
//                             });
//                         }
//                     },
//                     slideChange: function slideChange() {
//                         var $activeSlide = $(this.slides[this.activeIndex]);
//                         $activeSlide.find('img').attr('src', $activeSlide.data('src'));
//                     },
//                     slideChangeTransitionEnd: function slideChangeTransitionEnd(){
//                         // console.log(this.activeIndex)
//                     },
//                 },
//                 thumbs: {
//                     swiper: thumbsSwiper
//                 }
//             });
//             thumbsSwiper.update();
//             gallerySwiper.update();
//         }
//     }
// }

swiperLazy()
closeVirSwiper()

// author:wanglei
// function showVideo() {
//     $('#video-container').addClass('canplay-video');
// }
// function showVideoBefore() {
//     var videoEl = $('#video-container video')[0];
//     if (videoEl && videoEl.buffered && !videoEl.buffered.length) {
//         videoEl.oncanplay = showVideo;
//     } else {
//         showVideo();
//     }
// }
// ;(function() {
//     showVideoBefore();
// })();

/* 
  使用app设备打开 h5 站点时, 去掉站点头部和尾部
*/
$(function () {
    var close_suspension_advertisement = sessionStorage.getItem('close_suspension_advertisement')
    if (close_suspension_advertisement) {
      $('.m-fixed-right-img').attr('style', 'display: none;')
    }
    else {
      $('.m-fixed-right-img').attr('style', 'display: flex;')
      var _page_arr = [
        'home',
        'category',
        'tag',
        'marketing',
      ]
      if (_page_arr.indexOf(window._page) != -1 && isMobileDevices()) {
        advertisementctag('.m-fixed-right-img-icon')
      }
    }
    var __free_debounce = _debounce(300)
    var btn_type_status = {
        1: 4,
        2: 2,
        3: 3,
    }
    $('.m-free-details--button-right').on('click', function(){
      var status = $(this).data('status')
      __free_debounce(pageStatus.bind(this, {
          loginH5  : function () {
            if (status == 1 || status == 2) {
                $('#pop-ups-view').attr('style', 'display: flex;')
            }
            if (status == 3) {
                var redirect_url = '/checkout/index/secure_checkout'
                if (typeof redirect_url != 'undefined') {
                    redirect_url += '?activity_user_id=' + $(this).data('activity-user-id')
                }
                window.location.href = redirect_url
            }
            ctag('ZeroBtnClick', {
                btn_type: btn_type_status[status],
                sku_id: $(this).data('sku-id'),
                sku: $(this).data('sku'),
            })
          }.bind(this),
          sku_id: $('#sku_id').val()
      }, 'share'))
    })
    $('#pop-ups-close').on('click', function () {
      $('#pop-ups-view').css('display', 'none')
    })
    $(".fb-share-button").on('click', function () {
        FB.init({
            appId   : fb_app_id,
            status  : true,
            xfbml   : true,
            version : 'v2.4'
        })
        FB.ui({
            method  : 'share',
            href    : window.share_url.free_url
        }, function (response) {
            if (response && !response.error_message) { }
            if (!response) return;
            var params = {
                share_type : 'facebook',
                is_success : response.error_message ? 0 : 1,
                fail_reason: response.error_message || ''
            }
            ctag('ZeroBtnClick', {
                btn_type: 5,
                sku_id: window.product_info.sku_id || '',
                sku: window.product_info.sku || '',
            })
            if ($('#free-activity-assist').val() == 'assist' && !__device_type().app) {
                window.location.href = '/activity/list/free-activity-index'
            }
        })
    })
    $(document).on('click', '.free-clone-link', function () {
        $('#pop-ups-view').attr('style', 'display: none')
        __copyText(window.share_url.free_url)
        ctag('InviteAppShare', {
            share_type  : 'link',
            is_success  : 1,
            fail_reason : '',
        })
        if ($('#free-activity-assist').val() == 'assist' && !__device_type().app) {
          window.location.href = '/activity/list/free-activity-index'
        }
    })
    $('.m-free-details--button-left').on('click', function(){
      window.location.href = '/activity/list/free-activity-index'
    })
  $('.pc-google-play-button').on('click', function(){
    reportSource()
    $('body').append("<a id='to_android_market'  target='_blank' href='" + window.app_android_download + "'></a>")
    var obj = document.getElementById('to_android_market');
    obj.click();
    ctagDownload('other', 'click', 1)
  })
  $('.pc-app-store-button').on('click', function(){
    reportSource()
    $('body').append("<a id='to_ios_market'  target='_blank' href='" + window.app_ios_download + "'></a>")
    var obj = document.getElementById('to_ios_market');
    obj.click();
    ctagDownload('other', 'click', 2)
  })
  $('.m-download-btn-left').on('click', function(){
    reportSource()
    // window.location.href = window.app_android_download
    ctagDownload('other', 'click', 1)
  })
  $('.m-download-btn-right').on('click', function(){
    reportSource()
    // window.location.href = window.app_ios_download
    ctagDownload('other', 'click', 2)
  })
  $(document).on('click', '.app-coupon-btn-goods', function () {
    var objgoods = window._app_data
    var strgoods = '';
    for (var i in objgoods) {
        strgoods += '&' + i + '=' + objgoods[i]
    }
      window.location.href = location.origin + '/activity/list/download-index?ad_sign=other&link_type=click' + strgoods
  })
    if (getQueryString('device_type') || __device_type().app) {
    var url = window.location.href
    $('.header').hide()
    $('#app-ad-wrap').hide()
    $('#footer').hide()
    $('#footer-nav').hide()
    $('#tpadcomm').hide()
    $('.ask-to').hide()
    $('.help-categories').hide()
      $('.header-wrap').hide()
    $('.d-lg-block').attr('style', 'display:none !important;')
    $('.faq-list-search').attr('style', 'display:none !important;')
    $('.header + div').attr('style', 'margin-top: 0 !important;')
      setTimeout(function () {
        $('#tpadcomm-m').hide()
      })
    // app嵌套文章页面，在h5页面点击跳转时给 url 添加 device_type、themes字段
    $('.faq-list-item').find('a').each(function() {
        var str = $(this).attr("href")
          $(this).attr("href", str + '&device_type=app')
    })
    if (/\/(?:answers)/.test(location.pathname)) {
      $(document).on('click', [
        '.faq-content a',
      ].join(','), function(){ return false; })
    }
    if (/\/(?:termsofuse|privacypolicy)\.htm/.test(location.pathname)) {
      $('.title01').hide()
    }
  }
  $('.m-coupon-bottom-left').on('click', function () {
    var _app = new callAppHj('android')
    _app.__openApp()
  })
  $('.m-coupon-bottom-right').on('click', function () {
    var _app = new callAppHj('ios')
    _app.__openApp()
  })
  $('#m-activity-button').on('click', function () {
    $('#h5-login-block-view').show()
  })
  $('.m-google-play-button').on('click', function () {
    var _app = new callAppHj('android')
    _app.__openApp()
  })
  $('.m-app-store-button').on('click', function () {
    var _app = new callAppHj('ios')
    _app.__openApp()
      // var __open_url = 'http://d.7short.com/Komily'
})
  $('.pc-google-play').on('click', function () {
      reportSource()
      $('body').append("<a id='to_android_market1'  target='_blank' href='" + window.app_android_download + "'></a>")
      var obj = document.getElementById('to_android_market1');
      obj.click();
      ctagDownload('other', 'click', 1)
  })
  $('.pc-app-store-button').on('click', function () {
      reportSource()
      $('body').append("<a id='to_ios_market2'  target='_blank' href='" + window.app_ios_download + "'></a>")
      var obj = document.getElementById('to_ios_market2');
      obj.click();
      ctagDownload('other', 'click', 2)
  })
  $('.m-google-play-button').on('click', function () {
      reportSource()
      ctagDownload('other', 'click', 1)
  })
  $('.m-app-store-button').on('click', function () {
      reportSource()
      ctagDownload('other', 'click', 2)
  })
  $('.order-context-input-block-member').on('click', function () {
      ctag('PaySuccessClick', {
          click_type: 'order_detail',
          event: 'PaySuccessClick'
      });
  })
  $('.order-context-input-right').on('click', function () {
      __copyText(document.getElementById('order-context-input-left').innerHTML)
      ctag('PaySuccessClick', {
          click_type: 'get_mail',
          email: document.getElementById('order-context-input-left').innerHTML,
          event: 'PaySuccessClick'
      });
  })
    $('.go-code').hover(function() {
      ctag('InviteAppSideToggle', 'open')
    }, function() {
      ctag('InviteAppSideToggle', 'close')
    })
    $('.fixed-right-advertisement').hover(function() {
      advertisementctag('.fixed-right-advertisement')
      $('.fixed-right-advertisement-img').show()
    }, function() {
      $('.fixed-right-advertisement-img').hide()
    })
    $('.fixed-right-advertisement-img').hover(function() {
      $('.fixed-right-advertisement-img').show()
    }, function() {
      $('.fixed-right-advertisement-img').hide()
    })


    $(document).on('click', '.coupon-block-new .coupon-btn', function () {
      var a = isMobileDevices() ? 'm.' : 'www.'
      ctag('ComShowClick', {
        type: 2,
        position_id: 0,
        position_name: 'goods_get_it',
        content: $(this).data('content'),
        url: $(this).data('href'),
        yypm: a + window._page + '.get_it.0',
        img: '',
        event: 'ComShowClick'
      })
      window.location.href=$(this).data('href')+'?yypm=' + a + window._page + '.get_it.0'
    })
    

  // var clipboard = new ClipboardJS('.btn-copy')
    function advertisementctag (obj) {
  //     $('.btn-copy').toast('Copy Success')
      var device = ''
      if (__device_type().mobile) {
        device = 'mobile'
      } else {
        if (__device_type().ipad) {
          device = 'pad'
        } else {
          device = 'pc'
        }
      }
  //     console.log(e);
      ctag('adShow', {
          device: device,
          page_type: window._page === 'home' ? '首页' : '列表页',
          position_id: $(obj).data('position-id'),
          position_name: $(obj).data('position-name'),
          ad_id: $(obj).data('ad-id'),
          ad_name: $(obj).data('ad-title'),
          url: $(obj).data('url'),
          img: $(obj).find('img').attr('src'),
          event: 'adShow'
      })
    }
    if (window.location.pathname == '/activity/list/download-index') {
      reportSource()
    }

    $('#m-order-member-view-order-details,.pc-order-details-view-button').on('click', function () {
      if (window.user_is_login) {
        window.location.href = $('#m-order-member-view-order-details').data('href')
      } else {
        window.location.href = '/user/member/login?back_url=' + $('#m-order-member-view-order-details').data('href')
      }
      // var _app = new callAppHj({
      //   app_link_type_id: 12,
      //   order_id: $(this).data('order-id'),
      // })
      // _app.__openApp()
    })

    $(document).on('click', [
      '#m-order-view-order-details',
      '.m-order-download-app-btn',
    ].join(','), _openApp)

    $('.m-download-app').on('click', function () {
      _openApp()
      ctagDownload('other', 'click', ctagDeviceValue())
    })

    $('.m-order-code-btn-google').on('click', function () {
      var _app = new callAppHj('android')
          _app.__openApp()
          ctagDownload('other', 'click', 1)
    })

    $('.m-order-code-app-store').on('click', function () {
      var _app = new callAppHj('ios')
          _app.__openApp()
          ctagDownload('other', 'click', 2)
    })

    $(document).on('click', [
      '.m-order-success-text span',
      '.pc-order-success-text span',
    ].join(','), function () {
      __copyText($(this).html())
    })

    $('.m-order-no-login-text span,.pc-order-no-login-view-line span').on('click', function () {
      window.location.href = '/user/member/login'
    })

    $(document).on('click', '.m-order-use-now,.pc-order-swiper-use-now', function () {
      window.location.href = window.user_is_login ? '/' : '/user/member/login'
    })
    
    $(document).on('click', '.pc-order-details-app,.pc-download-app', function () {
      $('body').toast('Please scan the code from the right to download the app')
    })

    $('.pc-new-code-left-btn-1').on('click', function () {
        reportSource()
        $('body').append("<a id='to_android_market1'  target='_blank' href='" + window.app_android_download + "'></a>")
        var obj = document.getElementById('to_android_market1');
        obj.click();
        ctagDownload('other', 'click', 1)
    })

    $('.pc-new-code-left-btn-2').on('click', function(){
        reportSource()
        $('body').append("<a id='to_ios_market'  target='_blank' href='" + window.app_ios_download + "'></a>")
        var obj = document.getElementById('to_ios_market');
        obj.click();
        ctagDownload('other', 'click', 2)
    })
    if (__device_type().app) {
      $('.m-fixed-right-view').hide()
    }
    $('.m-fixed-right-img').on('click', function(){
      window.location.href = $(this).find('a').data('href')
    })
    $('.m-fixed-right-img-close').on('click', function(event){
      event.stopPropagation()
      $('.m-fixed-right-img').hide()
      sessionStorage.setItem('close_suspension_advertisement', true)
    })
    if ($('.advertisement-type-img').length) {
      if (__device_type().mobile) {
        device = 'mobile'
      } else {
        if (__device_type().ipad) {
          device = 'pad'
        } else {
          device = 'pc'
        }
      }
      var _advertisement_type = $('.advertisement-type-img').find('a')
      ctag('adShow', {
          device: device,
          page_type: window._page,
          position_id: _advertisement_type.data('position-id'),
          position_name: _advertisement_type.data('position-name'),
          ad_id: _advertisement_type.data('ad-id'),
          ad_name: _advertisement_type.data('ad-title'),
          url: _advertisement_type.data('url'),
          img: !__device_type().mobile ? _advertisement_type.find('img').data('ad-code') : _advertisement_type.find('img').data('mobile-code'),
          event: 'adShow'
      })
    }
  });