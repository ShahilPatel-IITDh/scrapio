
/**
 * 依赖 jquery collector
 */

; (function (window, collector, $, undefined) {

  if (!collector) return console.log('collector 不存在');
  if (!$ || !$.fn) return console.log('jquery 不存在');

  collector.presetAttr.addAll({
    page_name: {
      config: 4, // 0b100
      val: function () {
        return window._page;
      }
    }
  });
  function wrapData(data) {
    var event = data.event;
    delete data.event;
    return {
      data: {
        event: event,
        event_data: data
      }
    };
  }
  function getBagInfo() {
    var spu_id = [], spu = [], sku_id = [], sku = [], sku_num = [], sku_price = [], quantity = 0;
    var data = getCouponInfo();
    var discount_amount = $('#data-bonus-fee').val() || $('#data-coupon-fee').val() || 0;
    $('li.mybag-goods-list-item').each(function () {
      var data = $('a[data-goods-number]:first', this).data() || {};
      spu_id.push(data.spuId);
      spu.push(data.spu);
      sku_id.push(data.skuId);
      sku.push(data.sku);
      sku_num.push(data.goodsNumber);
      sku_price.push(($('[data-sku-price]', this).data() || {}).skuPrice);
      quantity++;
    });
    
    return {
      // 收货人邮箱
      email: $('#returning_email').val() || window.currency_user_email,
      // 商品SPU ID
      spu_id: spu_id.join(','),
      // 商品SPU
      spu: spu.join(','),
      // 商品SKU ID
      sku_id: sku_id.join(','),
      // 商品SKU
      sku: sku.join(','),
      // 优惠码
      promo_code: data.coupon_code,
      coupon_name: data.coupon_name,
      coupon_id: data.coupon_id,
      // 商品总金额
      amount: $('#data-goods-amount').val(),
      // 实付总金额
      pay_amount: $('#data-order-amount').val(),
      // 每个sku数量
      sku_num: sku_num.join(','),
      // sku实付单价
      sku_price: sku_price.join(','),
      // 结算币种
      currency: $('#current_site_currency').val(),
      // 商品数量
      quantity: quantity,
      // 商品优惠金额
      discount_amount: discount_amount
    };
  }
  function getDisplay() {
    return $(window).width() >= 992
      ? 'pc'
      : 'mobile';
  }
  function getDevice() {
    return /iPad/.test(navigator.userAgent)
      ? 'pad'
      : getDisplay();
  }
  function getScene() {
    return $('.goods-basic-display').size()
      ? 'detail'
      : 'quickview';
  }
  function searchOpen(device, toggle_type, e) {
    var params = {
      device: getDevice() || device,
      toggle_type: toggle_type,
      event: 'SearchOpen'
    };
    collector.emit('click', wrapData(params), e.originalEvent);
  }
  var topLeftMenuOpen = false;
  function mTopLeftMenu(click_type, e) {
    if (click_type === 'open') {
      topLeftMenuOpen = true;
    }
    if (click_type === 'close') {
      // 点按钮时也会触发 hidden.bs.modal 事件，防止重复提交，同时保证提交数据带上 button 信息
      if (!topLeftMenuOpen) return;
      topLeftMenuOpen = false;
    }
    var params = {
      click_type: click_type,
      url: location.href,
      event: 'MTopLeftMenu'
    };
    // hidden.bs.modal 事件没有 e.originalEvent 包裹
    collector.emit('click', wrapData(params), e.originalEvent || e);
  }
  function queryParse(url) {
    var queryStr = collector.tool.urlParse(url || '').query.replace(/^\?/, '');
    var queryObj = collector.tool.parse(queryStr);
    return queryObj;
  }
  /**
   * 
   * @param {String} filter_attr 120_1497-120_1528-128_1700
   * @returns {String} 120|xx|1497|zz,120|xx|1528|zz,128|xx|1700|zz
   */
  function getFilterInfo(queryObj) {
    var filter_attr = queryObj.filter_attr || '';
    var filters = [];
    filter_attr.replace(/(\d+)_(\d+)/g, function (_, id, value_id) {
      filters.push([
        // id
        id,
        // type
        typeMap[id],
        // value_id
        value_id,
        // value
        $('#attr-' + id + ' .text-link[data=' + value_id + ']').text()
      ].join('|'));
    });
    if (queryObj.price_min && queryObj.price_max) {
      filters.push('|price range||' + queryObj.price_min + '-' + queryObj.price_max);
    }
    return filters.join(',');
  }
  function goodsListSkuImg(type, e) {
    var infoEl = $(e.originalEvent.target);
    var data = infoEl.data() || {};

    var params = {
      sku_id: data.skuId,
      sku: data.sku,
      image: infoEl.attr('src'),
      // 所在分页
      page: getPage(),
      // 列表位置
      position: infoEl.parent().index() + 1,
      type: type,
      event: 'GoodsListSkuImg'
    };
    collector.emit('click', wrapData(params), e.originalEvent);
  }
  /**
   * 点击商品详情图片
   * 
   * @param {Number} index 当前索引
   */
  function goodsDetailImg(index) {
    var infoEl = $('#sku_id');
    var data = infoEl.data() || {};
    var isDetail = $('.goods-basic-display').size();

    var params = {
      scene: getScene(),
      spu_id: data.spuId,
      spu: data.spu,
      sku_id: data.skuId,
      sku: data.sku,
      // 位置
      position: parseInt(index) + 1,
      img: '',
      video: '',
      event: 'GoodsDetailImg'
    };
    var gallery = $(isDetail ? '#gallery_detail' : '#gallery');
    var cur = gallery.find('.swiper-slide').eq(index);
    var videoEl = cur.find('video');
    if (index == 0 && videoEl.size()) {
      // 视频地址
      params.video = videoEl.attr('src');
    } else {
      // 图片url
      params.img = cur.find('img').attr('src');
    }
    collector.send(wrapData(params));
  }
  function goodsDetailImgPC() {
    goodsDetailImg($(this).index());
  }
  function getCouponInfo() {
    var coupon_code = $('#bonus_sn').attr('data');
    return {
      coupon_code: coupon_code,
      coupon_name: coupon_code ? '' : $('#pro-ajax-coupon').attr('data-coupon'),
      coupon_id: coupon_code ? '' : $('#default_coupon_sn').val(),
    };
  }
  //  购物车选择优惠券 open & close
  function cartUseCoupon(coupon_type) {
    var data = getCouponInfo();

    var params = {
      // 优惠券操作类型
      coupon_type: coupon_type,
      // 优惠码
      coupon_code: data.coupon_code,
      // 优惠名称
      coupon_name: data.coupon_name,
      // 优惠券ID
      coupon_id: data.coupon_id,
      // 使用状态
      coupon_status: ''
    };
    var $el = coupon_type === 'open'
      ? $('#pro-ajax-coupon')
      : $('#modalCoupons button.close');
    collector.emit('CartUseCoupon', params, $el);
  }
  /**
   * 获取当前分页 默认为 1
   */
  function getPage() {
    var queryObj = queryParse(location.href);
    return parseInt(queryObj.page || $('.pagination>li.active>a').text() || '1');
  }
  function quickViewGoods(view_type, e) {
    var infoEl;
    var $el = $(e.target);
    var item = $el.closest('li');
    if ($el.is('img')) {
      infoEl = $el;
    } else {
      // viewGo 触发时 尝试从 .gcard .swiper-slide 找到卡片包裹，如果有新识别方式则添加至数组
      infoEl = $el.closest([
        '.gcard',
        '.swiper-slide'
      ].join(',')).find('img[data-sku]');
    }
    if (!infoEl.size()) {
      // console.log('quickViewGoods 发现未识别的卡片', e);
      return;
    }
    var data = infoEl.data() || {};

    var params = {
      scene: getCurScene($el.closest('[data-scene]').attr('data-scene')),
      page: getPage(),
      position: item.parent().find('>li').index(item) + 1,
      // 查看类型
      view_type: view_type,
      is_ad: data.isAd,
      is_cate_ad: data.isCateAd,
      spu_id: data.spuId,
      spu: data.spu,
      sku_id: data.skuId,
      sku: data.sku,
      // 商品名称
      name: data.name,
      category_id: data.categoryId,
      // 商品分类
      category: data.category,
      // 商品标签
      tag: data.tag,
      // 商品原价
      original_price: data.originalPrice,
      // 商品现价
      price: data.price,
      img: infoEl.attr('src'),
      event: 'GoodsClick'
    };
    collector.emit('click', wrapData(params), e.originalEvent);
  }
  function cacheShowGoodsList(scene, skuArr) {
    if (!(scene in tmpData.GoodsList)) {
      tmpData.GoodsList[scene] = {};
    }
    var cache = tmpData.GoodsList[scene];
    $.each(skuArr, function (index, sku) {
      cache[sku] = true;
    });
  }
  function filterNoCache(scene, skuArr) {
    var arr = [];
    var cache = tmpData.GoodsList[scene];
    if (!cache) return skuArr;
    $.each(skuArr, function (index, sku) {
      if (sku in cache) return;
      arr.push(sku);
    });
    return arr;
  }
  function adParams() {
    var infoEl = $(this);
    var data = infoEl.data() || {};

    return {
      device: getDevice(),
      page_type: window._page === 'home' ? '首页' : '列表页',
      position_id: data.positionId,
      position_name: data.positionName,
      ad_id: data.adId,
      ad_name: data.title,
      url: this.href,
      img: $(this).find('img:visible').attr('src')
    };
  }
  var AD_SELECTOR = 'a.index-ad';
  // { '120': 'Color', ... }
  var typeMap = {};

  var tmpData = {
    ReChooseGoods: undefined,
    GoodsList: {},
    adShow: {},
  };
  var debounce = collector.tool.debounce;
  var debounceWait = 300;

  // dom ready 不再发送事件
  collector.addIntercept({
    type: 'ready_send_before',
    handler: function (collector, params) {
      return false;
    }
  });
  //是否APP
  var deviceType = function () {
    var u = navigator.userAgent;
    return {
      android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      ios     : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      ipad    : u.indexOf('Macintosh') >= 0,
      mobile  : navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
      app     : u.includes('KoMiLy')
    }
  }
  var isApp = deviceType().app

  // 事件委托 开始
  $(document)
    // template
    .on('click', '_____________', function (e) {
      var params = {
        event: ''
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击注册按钮
    .on('click', '.register-btn', function (e) {
      var params = {
        // 邮箱地址
        email: $('#regEmail').val(),
        // 风格偏好
        style_preference: collector.tool.getVals('input[name="user_favorite[]"]:checked'),
        // 是否接收新品邮件
        is_newsletters: $('#agreesubcribe').is(':checked') ? 1 : 0,
        event: 'RegisterButtonClick'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击登录按钮[登录页面]
    .on('click', '.login-btn', function (e) {
      var params = {
        // 登录类型
        login_type: 'email',
        login_page: window._page,
        // 是否记住
        is_remember_me: $('#remember').is(':checked') ? 1 : 0,
        // 邮箱
        email: $('#returning_email').val(),
        event: 'Login'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击facebook登录按钮[登录页面]
    .on('click', '#loginFaceBook', function (e) {
      var params = {
        // 登录类型
        login_type: 'facebook',
        login_page: window._page,
        event: 'Login'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击google登录按钮[登录页面]
    .on('click', '#google_signdiv', function (e) {
      var params = {
        // 登录类型
        login_type: 'google',
        login_page: window._page,
        event: 'Login'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击facebook登录按钮[结算页面]
    .on('click', '#loginFaceBookFun', function (e) {
      var params = {
        // 登录类型
        login_type: 'facebook',
        login_page: window._page,
        event: 'Login'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击google登录按钮[结算页面]
    .on('click', '#google_sign_checkout', function (e) {
      var params = {
        // 登录类型
        login_type: 'google',
        login_page: window._page,
        event: 'Login'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击facebook登录按钮[结算页面-使用优惠券弹窗]
    .on('click', '#loginFaceBookFun2', function (e) {
      var params = {
        // 登录类型
        login_type: 'facebook',
        login_page: 'select_coupon',
        event: 'Login'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击google登录按钮[结算页面-使用优惠券弹窗]
    .on('click', '#google_sign_checkout2', function (e) {
      var params = {
        // 登录类型
        login_type: 'google',
        login_page: 'select_coupon',
        event: 'Login'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击搜索按钮
    .on('click', [
      '#pc_searchBtn',
      '#searchFormM .submit-btn'
    ].join(','), function (e) {
      var params = {
        device: getDevice(),
        // 关键词
        key_word: $('#pc_search').val(),
        // 是否使用历史词
        is_history: 0, // a 链接直接跳转
        // 是否使用推荐词
        is_recommend: 0, // a 链接直接跳转
        event: 'SearchButtonClick'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 邮箱填写
    .on('click', '#check_email_btn', function (e) {
      var params = {
        event: 'PayEmail'
      };
      collector.tool.merge(params, getBagInfo());
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 完成收货地址
    .on('click', '#addressForm button[type=submit]', function (e) {
      var data = $('#addressForm').serializeObject();

      var params = {
        // 收货人名
        first_name: data.first_name,
        // 收货人姓
        last_name: data.last_name,
        // 收货人国家
        country: data.country,
        // 收货人省份
        province: data.state_province || '',
        // 收货人城市
        city: data.city,
        // 邮政编码
        zip_code: data.zipcode,
        // 收货地址1
        address1: data.address_1,
        // 收货地址2
        address2: '', // TODO
        // 收货人地区
        receiver_area: '', // TODO
        // 收货电话
        tel: data.tel,
        // 收货备注
        edit_address_tip: '', // TODO
        event: 'PayAddress'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击付款方式
    // .on('click', [
    //   '#paypal-button-container', // KM 第一次点击 paypal 按钮时实际点中的元素
    //   '#pay_list_item_pacypay a', // KM
    //   '#pay_list_item_oceancredit a', // KM
    //   '#pay_list_item_paypal button',
    //   '#pay_list_item_oceancredit button',
    //   '#pay_list_item_pacypay button'
    // ].join(','), function (e) {
    //   // 默认脚本触发一次，不发送
    //   if (!e.originalEvent) return;
    //   var params = {
    //     event: 'ClickPayment'
    //   };
    //   collector.tool.merge(params, getBagInfo());
    //   collector.emit('click', wrapData(params), e.originalEvent);
    // })
    // 提交付款信息
    .on('click', [
      '#paybutton', // KM
      '#pacypaybutton'
    ].join(','), function (e) {
      var params = {
        payment_id: $('#default_pay_id').val() || '38',
        payment_name: 'oceancredit',
        event: 'PayNow'
      };
      collector.tool.merge(params, getBagInfo());
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 收藏商品
    .on('click', '[data-spu] .icon-wish', function (e) {
      var infoEl = $(this).closest('[data-spu]');
      var data = infoEl.data() || {};

      var params = {
        scene: getScene(),
        // 商品SPU ID
        spu_id: data.spuId,
        // 商品SPU
        spu: data.spu,
        // 商品SKU ID
        sku_id: infoEl.attr('sku_id'),
        // 商品SKU
        sku: data.sku,
        // 商品名称
        name: data.name,
        category_id: data.categoryId,
        // 商品分类
        category: data.category,
        // 商品标签
        tag: data.tag,
        // 商品原价
        original_price: data.originalPrice,
        // 商品现价
        price: data.price,
        event: 'Collect'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 评论
    .on('click', '#uploadReveiw-order_0_goods_0 .review-btn', function (e) {
      var infoEl = $('#uploadReveiw-order_0_goods_0').parent().prev().find('a[data-spu]');
      var data = infoEl.data() || {};

      var params = {
        // 商品SPU ID
        spu_id: data.spuId,
        // 商品SPU
        spu: data.spu,
        // 商品SKU ID
        sku_id: data.skuId,
        // 商品SKU
        sku: data.sku,
        // 商品名称
        goods_name: data.name,
        category_id: data.categoryId,
        // 商品分类
        category: data.category,
        // 商品评分
        score: ($('#rating').data() || {}).score,
        event: 'Review'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击分享
    .on('click', '.datails-content .d-flex.share', function (e) {
      var infoEl = $('#sku_id');
      var data = infoEl.data() || {};

      var params = {
        // 分享类型
        share_type: 'facebook',
        // 商品SPU ID
        spu_id: data.spuId,
        // 商品SPU
        spu: data.spu,
        // 商品SKU ID
        sku_id: data.skuId,
        // 商品SKU
        sku: data.sku,
        // 商品名称
        name: data.name,
        category_id: data.categoryId,
        // 商品分类
        category: data.category,
        // 商品标签
        tag: data.tag,
        // 商品原价
        original_price: data.originalPrice,
        // 商品现价
        price: data.price,
        event: 'ShareClick'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 展开/关闭商品描述
    .on('click', '#accordion-details .collapse-card', function (e) {
      var cur = $(this).find('>[id]');
      var toggle = $(this).find('button.collapsed').size() ? 'close' : 'open';
      /**
       * service      service
       * policy       return
       * deliverys    delivery
       * description  description
       */
      var type = (function (id) {
        switch (id) {
          case 'policy': return 'return';
          case 'deliverys': return 'delivery';
          case 'service':
          case 'description': return id;
        }
      })(cur.attr('id'));
      // 这里 data 数据会动态修改，不能直接使用 $.data 因其会缓存数据
      var infoEl = $('#sku_id');

      var params = {
        // 类型
        type: type,
        // 打开/关闭
        toggle: toggle,
        spu_id: infoEl.attr('data-spu-id'),
        spu: infoEl.attr('data-spu'),
        sku_id: infoEl.val(),
        sku: infoEl.attr('data-sku'),
        event: 'ClickDescription'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 加购商品
    .on('click', '#addToBag', function (e) {
      var infoEl = $('#sku_id');
      var data = infoEl.data();
      var devices_type = isMobileDevices() ? 'm.' : 'www.'

      var params = {
        scene: getScene(),
        spu_id: data.spuId,
        spu: data.spu,
        sku_id: data.skuId,
        sku: data.sku,
        // 商品名称
        name: data.name,
        // 商品标签
        tag: data.tag,
        category_id: data.categoryId,
        // 商品分类
        category: data.category,
        // 商品原价
        original_price: data.originalPrice,
        // 商品现价
        price: data.price,
        // 数量
        amount: $('#goods_number').val(),
        yypm: getQueryString('yypm') || '',
        event: 'AddCart'
      };
      if (window._page == 'cart') {
        params.goods_type = $('#is_presale_good').length ? $('#is_presale_good').val() : 0
        params.yypm = devices_type + window._page + '.add_items.' + $(this).data('product-index')
        params.scene = $(this).data('add-scene')
      }
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 打开搜索 - PC
    .on('focus', '#pc_search', searchOpen.bind(null, 'PC', 'open'))
    // 关闭搜索 - PC
    .on('blur', '#pc_search', searchOpen.bind(null, 'PC', 'close'))
    // 打开搜索 - M
    .on('click', '#toggle_search_btn', searchOpen.bind(null, 'mobile', 'open'))
    // 关闭搜索 - M
    .on('click', '#searchFormM .search_modal-close', searchOpen.bind(null, 'mobile', 'close'))
    // 面包屑
    .on('click', 'ol.breadcrumb a', function (e) {
      var params = {
        name: $(this).text().trim(),
        page_path: location.href,
        url: this.href,
        event: 'Breadcrumb'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 跑马灯
    .on('click', [
      // M
      '.m-swiper-marqueen a',
      // PC
      '.pc-swiper-marqueen a'
    ].join(','), function (e) {
      var params = {
        device: getDevice(),
        page_path: location.href,
        title: document.title,
        url: this.href,
        event: 'TopMarquee'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击顶部Logo
    .on('click', 'h1.logo>a', function (e) {
      var params = {
        page_path: location.href,
        event: 'TopLogo'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击顶部购物车
    .on('click', [
      '#header .mCart-svg', // KM 站 M 端，没有 shopBag 包裹
      '#shopBag'
    ].join(','), function (e) {
      var params = {
        device: getDevice(),
        event: 'TopCart'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击顶部收藏
    .on('click', '#header .icon-wish', function (e) {
      var params = {
        event: 'TopCollection'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击顶部客服
    .on('click', [
      '.header-bar .dropdown-customer-care a', // KM 站
      '#header .dropdown-customer-care a'
    ].join(','), function (e) {
      var params = {
        device: getDevice(),
        title: document.title,
        url: this.href,
        event: 'TopCustomerCare'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击顶部币种
    .on('click', [
      '.header-bar .dropdown-dollor span>a', // KM 站
      // 点击顶部币种 - PC
      '#header .dropdown-dollor span>a',
      // 点击顶部币种 - M
      '#collapseCurrency a'
    ].join(','), function (e) {
      var params = {
        device: getDevice(),
        name: $(this).text().trim(),
        event: 'TopCurrency'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击顶部语言选择
    .on('click', [
      // 点击顶部语言选择 - PC
      '#header .dropdown-language .dropdown-menu>a',
      // 点击顶部语言选择 - M
      '#site-web-currency-footer a'
    ].join(','), function (e) {
      var params = {
        device: getDevice(),
        name: $(this).text().trim(),
        event: 'TopLanguage'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 订阅
    .on('click', '#emailSub', function (e) {
      var params = {
        input: $('#email_sub').val(),
        event: 'subscription'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 底部链接
    .on('click', '#footer a', function (e) {
      var params = {
        device: getDevice(),
        page_path: location.href,
        title: document.title,
        url: this.href,
        event: 'BottomLink'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 回到顶部
    .on('click', '.goTop', function (e) {
      var params = {
        hight: $(document).height(),
        event: 'ToTop'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 同意Cookie
    .on('click', '.cookie-tip-btn', function (e) {
      var params = {
        event: 'AgreeCookie'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 同意CookiePolicy
    .on('click', '.cookie-tip a', function (e) {
      var params = {
        event: 'AgreeCookiePolicy'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // M端点开左边栏
    .on('click', '#humg_menu', mTopLeftMenu.bind(null, 'open'))
    // M端关闭左边栏 - 按钮
    .on('click', '#m_menu_modal button.close', mTopLeftMenu.bind(null, 'close'))
    // M端关闭左边栏 - 空白处
    .on('hidden.bs.modal', '#m_menu_modal', mTopLeftMenu.bind(null, 'close'))
    // 点击分类页左侧过滤 - PC
    .on('click', '#filter-block #filter a.align-self-center', function (e) {
      var item = $(this);
      var link = item.attr('href');
      var queryObj = queryParse(link);
      var filter_id = (item.parents('.collapse:first').attr('id') || '').replace(/\D/g, '');
      var filter_type = typeMap[filter_id];
      var filter_value_id = item.find('.text-link').attr('data') || '';
      var filter_value = item.find('.text-link').text(); // 显示值

      var params = {
        device: getDevice(),
        filter_id: filter_id,
        filter_type: filter_type,
        filter_value_id: filter_value_id,
        filter_value: filter_value,
        filter: getFilterInfo(queryObj),
        sort: queryObj.order,
        event: 'CategoryFilter'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击分类页Sort
    .on('click', [
      // 点击分类页Sort - PC
      '[aria-labelledby=dropdownFilter]>a',
      // 点击分类页Sort - M
      '#headingCategray01~div:first>a'
    ].join(','), function (e) {
      var item = $(this);
      var link = item.attr('href');
      var queryObj = queryParse(link);

      var params = {
        device: getDevice(),
        sort: queryObj.order,
        filter: getFilterInfo(queryObj),
        event: 'CategorySort'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击尺码表
    .on('click', '#size_chart_btn', function (e) {
      var params = {
        scene: getScene(),
        spu_id: $('#sku_id').attr('data-spu-id'),
        spu: $('#sku_id').attr('data-spu'),
        sku_id: $('#sku_id').val(),
        sku: $('#sku_id').attr('data-sku'),
        event: 'ClickSizeChart'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 在点击标签词
    .on('click', '#AECMP_TAG a[data-tag-id]', function (e) {
      var infoEl = $('#sku_id');
      var data = infoEl.data() || {};
      var item = $(this);

      var params = {
        spu_id: data.spuId,
        spu: data.spu,
        sku_id: data.skuId,
        sku: data.sku,
        tag: item.text().trim(),
        tag_id: item.attr('data-tag-id'),
        event: 'ClickTag'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击商品详情图片 - PC - detail
    .on('mouseenter', '#thumbs_detail .swiper-slide', goodsDetailImgPC)
    // 点击商品详情图片 - PC - quickview
    .on('mouseenter', '#thumbs .swiper-slide', goodsDetailImgPC)
    // M端点击返回
    .on('click', '#header .header-l a.btn-link', function (e) {
      var params = {
        page_path: location.href,
        pre_url: document.referrer,
        event: 'MTopBack'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 顶部/左侧菜单点击
    .on('click', [
      // PC
      '.nav-drowpdown .link>a',
      // 一级菜单
      '#m_menu_modal li a.cell-title',
      // 二级菜单
      '#m_menu_modal li .collapse a'
    ].join(','), function (e) {
      var params = {
        device: getDevice(),
        name: $(this).text().trim(),
        url: this.href,
        event: 'TopMenu'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 顶部/左侧菜单展开关闭
    .on('click', '#m_menu_modal li [data-toggle]', function (e) {
      var target = ($(this).data() || []).target;
      // 排除空的
      if (!$(target).size()) return;

      var params = {
        device: getDevice(),
        toggle_type: $(this).next().hasClass('show') ? 'close' : 'open',
        name: $(this).find('.cell-title').text().trim(),
        event: 'ToggleMenu'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击顶部菜单图片
    .on('click', '#header .nav-drowpdown .media>a', function (e) {
      var item = $(this);

      var params = {
        top_name: item.parents('.nav-item:first').find('>a.nav-link').text().trim(),
        name: item.find('.text').text().trim(),
        img: item.find('img').attr('src'),
        url: item.attr('href'),
        event: 'TopMenuImg'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 商品列表中点击收藏
    .on('click', '#dirProList [data-spu]>.icon-wish', function (e) {
      var infoEl = $(this).parent();
      var data = infoEl.data() || {};
      var item = infoEl.closest('li');
      var adEl = item.find('img[data-is-ad]');
      var adData = adEl.data() || {};

      var params = {
        sku_id: infoEl.attr('sku_id'),
        sku: data.sku,
        // 所在分页
        page: getPage(),
        // 列表位置
        position: item.parent().find('>li').index(item) + 1,
        is_ad: adData.isAd || '',
        is_cate_ad: adData.isCateAd || '',
        event: 'GoodsListCollection'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 商品列表sku图 click
    .on('click', '#dirProList li .sku-map img', goodsListSkuImg.bind(null, 'click'))
    // 商品列表sku图 hover
    .on('mouseenter', '#dirProList li .sku-map img', goodsListSkuImg.bind(null, 'hover'))
    // 删除购物车商品
    .on('click', '#cartList>.mybag-goods-list-item a[data-del-id]', function (e) {
      var item = $(this).parents('li:first');
      var infoEl = item.find('a[data-sku]:first');
      var data = infoEl.data() || {};

      var params = {
        sku_id: data.skuId,
        sku: data.sku,
        cart_index: $('#cartList>.mybag-goods-list-item').index(item),
        event: 'CartDelGoods'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 点击历史浏览产品事件
    .on('click', [
      '.error-404-recently-viewed-wrapper a[data-spu]', // 404 页面
      '.section-recenty-views a[data-spu]', // 个人中心
      '#AECMP_HISTORY a[data-spu]'
    ].join(','), function (e) {
      var infoEl = $(this);
      var data = infoEl.data() || {};

      var params = {
        source_type: window._page,
        spu_id: data.spuId,
        spu: data.spu,
        sku_id: data.skuId,
        sku: data.sku,
        img: infoEl.find('img').attr('src'),
        event: 'RecentlyViewed'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // ad点击
    .on('click', AD_SELECTOR, function (e) {
      var params = collector.tool.merge(adParams.call(this), {
        event: 'adClick'
      });
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    // 购物车选择优惠券 - open
    .on('show.bs.modal', '#modalCoupons', cartUseCoupon.bind(null, 'open'))
    // 购物车选择优惠券 - close
    .on('hide.bs.modal', '#modalCoupons', cartUseCoupon.bind(null, 'close'))
    // 重选商品 - open
    .on('click', '#cartList>.mybag-goods-list-item .viewGo', function () {
      var item = $(this).closest('li');
      var infoEl = item.find('a[data-sku]:first');
      var data = infoEl.data() || {};

      tmpData.ReChooseGoods = data;

      collector.emit('ReChooseGoods', {
        choose_type: 'open',
        sku_id: data.skuId,
        sku: data.sku
      }, $(this));
    })
    // 重选商品 - close
    .on('hide.bs.modal', '#quickViewModal', function () {
      var data = tmpData.ReChooseGoods;
      // 仅重选商品
      if (!data) return;

      collector.emit('ReChooseGoods', {
        choose_type: 'close',
        sku_id: data.skuId,
        sku: data.sku
      }, $('#quickViewModal button.close'));

      tmpData.ReChooseGoods = undefined;
    })
    // 重选商品 - img
    .on('click', '#thumbs .swiper-slide', function (e) {
      var data = tmpData.ReChooseGoods;
      // 仅重选商品
      if (!data) return;

      collector.emit('ReChooseGoods', {
        choose_type: 'img',
        img_index: $(this).index() + 1,
        sku_id: data.skuId,
        sku: data.sku
      }, $(this));
    })
    .on('click', '#app-open', function (e) {
      var params = {
        ad_sign: 'page_top',
        link_type: 'get',
        userid: window.currency_user_id || window.current_distinct_id,
        pagename: window._page,
        event: 'InviteAppPage'
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })

    //预售分类点击
    .on('click', '.category-wrap .swiper-slide', function(e) {
      var params = {
        device: getDevice(),
        filter_id: $(this).find('a').attr('cid'),
        filter_type: $(this).find('a').text().trim(),
        filter_value_id: '',
        filter_value: '',
        filter: '',
        sort: '',
        event:'CategoryFilter',
      };
      collector.emit('click', wrapData(params), e.originalEvent);
    })
    if(!isApp){
      $(document)
      // 列表点击商品 - detail
      .on('click', '[data-scene] img[data-sku]:not(.sku-map img)', quickViewGoods.bind(null, 'detail'))
      // 列表点击商品 - quickview
      .on('click', '[data-scene] .viewGo', quickViewGoods.bind(null, 'quickview'))
    }
    ; // 事件委托 结束


  //#region 自定义 emit
  // 点击付款方式 web\js\pay_valid.js web\js\secure_checkout.js
  collector.on('ClickPayment', function (id, name, e) {
    var params = {
      payment_id: id,
      payment_name: name,
      event: 'ClickPayment'
    };
    collector.tool.merge(params, getBagInfo());
    collector.emit('click', wrapData(params), e);
  });
  // 浏览商品详情 web\js\goods_detail.js
  collector.on('GoodsDetail', function (data) {
    data = data || {};
    
    var params = {
      // 商品SPU ID
      spu_id: data.spuId,
      // 商品SPU
      spu: data.spu,
      // 商品SKU ID
      sku_id: data.skuId,
      // 商品SKU
      sku: data.sku,
      // 商品名称
      name: data.name,
      // 商品标签
      tag: data.tag,
      category_id: data.categoryId,
      // 商品分类
      category: data.category,
      // 商品原价
      original_price: data.originalPrice,
      // 商品现价
      price: data.price,
      is_landing_page: collector.tool.isLandingPage(),
      event: 'GoodsDetail'
    };
    collector.send(wrapData(params));
  });

  // 登录成功 web\js\login.js web\js\secure_checkout.js
  collector.on('LoginSuccess', function (login_type, email, currency_user_id, loginPage) {
    var params = {
      login_type: login_type,
      login_page: loginPage || window._page,
      email: email,
      user_id: currency_user_id,
      event: 'LoginSuccess'
    };
    window.currency_user_id = currency_user_id;
    window.user_is_login = 1;
    collector.send(wrapData(params));
  });

  // 点击buyagin按钮
  collector.on('MemberOrderClick', function (params) {
    params.event = 'MemberOrderClick';
    collector.send(wrapData(params));
  });
  // 注册成功 web\js\login.js
  collector.on('RegisterSuccess', function (email, user_id) {
    var params = {
      email: email,
      user_id: user_id,
      event: 'RegisterSuccess'
    };

    collector.send(wrapData(params));
  });

  // 点击商品详情图片 web\js\common2.js
  collector.on('GoodsDetailImg', goodsDetailImg);

  // 详情点击Color web\js\common2.js
  collector.on('GoodsDetailColor', function (params, isQuickView, $el) {
    var obj = {
      color: $el.attr('title'),
      scene: getScene(),
      event: 'GoodsDetailColor'
    }
    if ($('#addToBag').data('add-scene')) {
      obj.scene = $('#addToBag').data('add-scene')
    }
    collector.tool.merge(params, obj);

    collector.emit('click', wrapData(params), { target: $el.get(0) });
  });

  // 详情点击Size web\js\common2.js
  collector.on('GoodsDetailSize', function (params, isQuickView, $el) {
    var obj = {
      size: $el.attr('title'),
      scene: getScene(),
      event: 'GoodsDetailSize'
    }
    if ($('#addToBag').data('add-scene')) {
      obj.scene = $('#addToBag').data('add-scene')
    }
    collector.tool.merge(params, obj);

    collector.emit('click', wrapData(params), { target: $el.get(0) });
  });

  // 重选商品 web\js\common2.js
  collector.on('ReChooseGoods', function (params, $el) {
    params.event = 'ReChooseGoods';
    collector.emit('click', wrapData(params), { target: $el.get(0) });
  });

  // 购物车选择优惠券 web\js\secure_checkout.js
  collector.on('CartUseCoupon', function (params, $el) {
    params.event = 'CartUseCoupon';
    collector.emit('click', wrapData(params), { target: $el.get(0) });
  });

  // 分享结果 web\js\goods_detail.js
  collector.on('ShareResult', function (params) {
    params.event = 'ShareResult';
    collector.send(wrapData(params));
  });

  // 创建订单 web\js\pay_valid.js web\js\secure_checkout.js
  collector.on('CreateOrder', function (params) {
    params.event = 'CreateOrder';
    params.email = window.currency_user_email || '';
    collector.tool.merge(params, getBagInfo());
    collector.send(wrapData(params));
  });

  // 付款成功 modules\checkout\views\index\success.php
  collector.on('PaySuccess', function (params) {
    params.event = 'PaySuccess';
    collector.send(wrapData(params));
  });
  // 广告图
  collector.on('adShow', function (params) {
    params.event = 'adShow';
    collector.send(wrapData(params));
  });
  collector.on('InviteAppPage', function (params) {
    params.event = 'InviteAppPage';
    collector.send(wrapData(params));
  });

  collector.on('ZeroBtnClick', function (params) {
    params.event = 'ZeroBtnClick';
    collector.send(wrapData(params));
  });
  collector.on('PaySuccessClick', function (params) {
    params.event = 'PaySuccessClick';
    collector.send(wrapData(params));
  });
  // 付款失败 modules\checkout\views\index\fail.php
  collector.on('PayFailure', function (params) {
    params.event = 'PayFailure';
    collector.send(wrapData(params));
  });

  // 点击分类页左侧过滤 - M web\js\goods_list.js
  collector.on('CategoryFilter', function (e, link) {
    var queryObj = queryParse(link || '');
    var params = {
      device: getDevice(),
      filter_id: '',
      filter_type: '',
      filter_value_id: '',
      filter_value: '',
      filter: getFilterInfo(queryObj),
      sort: queryObj.order,
      event: 'CategoryFilter'
    };
    collector.emit('click', wrapData(params), e.originalEvent);
  });

  // 顶部/左侧菜单展开关闭 - PC web\js\common2.js
  collector.on('ToggleMenu', function (e, toggle_type) {
    var item = $(e.target).closest('.nav-item');
    var linkEl = item.find('>a:first');
    var hasMenu = item.find('.nav-drowpdown').size();
    var aTag = linkEl.get(0);
    if (!hasMenu) return;
    // 增加已打开标识，无打开状态时不上报 toggle_type close
    if (toggle_type === 'open') {
      aTag._open = true;
    } else {
      if (!aTag._open) return;
      aTag._open = false;
    }

    var params = {
      device: getDevice(),
      toggle_type: toggle_type,
      name: linkEl.text().trim(),
      event: 'ToggleMenu'
    };
    collector.emit('click', wrapData(params), { target: aTag });
  });

  // 首页新品，有 swiper-wrapper 标记但没有使用 swiper 插件
  // 商品上报 - M web\js\home.js
  collector.on('GoodsList', function ($el) {
    goodsList($el.find('[data-scene]'));
  });

  // 商品上报，广告位填充后上报 web\js\goods_list.js
  collector.on('change.GoodsList', function () {
    $('[data-scene]').each(function () {
      var item = $(this);
      // 如果是 swiper 插件管理的列表，交由 init 事件上报
      if (item.is('.swiper-wrapper') || item.find('.swiper-wrapper:first').size()) return;
      // 商品上报 - list
      goodsList(item);
      // 商品上报 - show
      goodsList(item, true);
    });
  });
  collector.on('InviteAppBtnClick', function (type) {
    var params = {
      btn_type: type,
      event: 'InviteAppBtnClick'
    };
    collector.send(wrapData(params));
  });
  collector.on('InviteAppShare', function (params) {
    params.event = 'InviteAppShare';
    collector.send(wrapData(params));
  });
  collector.on('InviteAppSideToggle', function (type) {
    var params = {
      click_type: type,
      event: 'InviteAppSideToggle'
    };
    collector.send(wrapData(params));
  });
  //品牌热卖榜
  collector.on('DetailClickHotBar', function (params) {
    params.event = 'DetailClickHotBar';
    collector.send(wrapData(params));
  });
  // 加购提示上报
  collector.on('BtnClick', function (params) {
    params.event = 'BtnClick';
    collector.send(wrapData(params));
  });
  // 通用展现点击
  collector.on('ComShowClick', function (params) {
    params.event = 'ComShowClick';
    collector.send(wrapData(params));
  });
  // AddCart
  collector.on('AddCart', function (params) {
    params.scene = getScene();
    params.event = 'AddCart';
    collector.send(wrapData(params));
  });
  //#endregion

  //#region 商品上报 广告位上报
  function showReport() {
  // 商品上报 - show
    goodsList('[data-scene]', true);
    //ajax商品上报
    if($('[data-scene-ajax]').length>0){
      goodsListAjax('[data-scene-ajax]', true);
    }
    // 广告位上报 - show
    adShow($(AD_SELECTOR));
    if($('[public-show]').length>0){
      publicShow('[public-show]');
    }
  }
  $(window).scroll(debounce(function () {
    if (window.location.href.indexOf('checkout/index/secure_checkout') != -1) return 
    showReport()
  }, 200));
  $(window).resize(debounce(showReport, debounceWait));

  function adShow($el) {
    $el.each(function () {
      var params = collector.tool.merge(adParams.call(this), {
        event: 'adShow'
      });
      var img = $(this).find('img:visible').get(0);
      if (!img) return;
      var boundingClientRect = img.getBoundingClientRect();
      if (!halfInScreen(boundingClientRect)) return;
      // 同页面已上报的不上报
      if (params.ad_id in tmpData.adShow) return;
      // 标记已上报
      tmpData.adShow[params.ad_id] = true;
      collector.send(wrapData(params));
    });
  }
  function getCurScene(scene) {
    // [PC场景标识][,M端场景标识]
    var arr = (scene || '').split(',');
    // 未正常配置 scene 处理
    if (!arr[1] && /^m_/.test(arr[0])) {
      arr = ['', arr[0]];
    }
    return arr[getDisplay() === 'pc' ? 0 : 1];
  }
  // 半截以上在屏幕内
  function halfInScreen(boundingClientRect) {
    if (!(boundingClientRect.left >= 0 && boundingClientRect.right <= window.innerWidth)) return false;
    var inScreenHeight;
    if (boundingClientRect.top >= 0) {
      inScreenHeight = window.innerHeight - boundingClientRect.top;
    } else {
      inScreenHeight = boundingClientRect.top + boundingClientRect.height;
    }
    return inScreenHeight >= boundingClientRect.height >> 1;
  }

  function inScreen(boundingClientRect) {
    var bottom = boundingClientRect.bottom;
    return bottom >= 0 && bottom <= $(window).height();
  }

  function join(arr) {
    return (arr || []).join(',');
  }

  function goodsListNotReady() {
    return window._isGoodsList && !window._goodsListReady;
  }
  //通用展现
  var position_name_list = []
  window.publicShow = function(wrap){
    if (typeof wrap === 'string') {
      wrap = $(wrap);
    }
    wrap.each(function () {
      var boundingClientRect = this.getBoundingClientRect();
      var bottom = boundingClientRect.bottom - boundingClientRect.height/2;
      var falg = bottom >= 0 && bottom <= $(window).height();

      //不可见50%不上报
      if (!falg) return;

      var positionName = $(this).attr('public-show')

      //已上报的不再上报
      if(position_name_list.indexOf(positionName)>-1){
        return
      }
      position_name_list.push(positionName)

      var devices_type = isMobileDevices() ? 'm.' : 'www.'
      var position_id = $(this).attr('data-position-id')
      var params = {
        type: 1,
        position_id: position_id,
        position_name: $(this).attr('data-position-name'),
        content: $(this).attr('data-content'),
        url: $(this).attr('data-url'),
        yypm:devices_type + window._page+'.' + positionName + '.' + position_id,
        img: $(this).attr('data-img'),
        event: 'ComShowClick'
      };
      collector.send(wrapData(params));
    })
  }
  //ajax请求商品上报
  window.goodsListAjax= function(wrap, isShow) {
    if(!isShow || isShow == 'init'){
      tmpData.GoodsList={}
    }
    if (goodsListNotReady()) return;
    if (typeof wrap === 'string') {
      wrap = $(wrap);
    }
    wrap.each(function () {
      var indexMap = {};
      var wrap = $(this);
      var cate_ad_sku_list = [];
      var ad_sku_list = [];
      var sku_list = []; 
      var scenes = wrap.attr('data-scene-ajax') || wrap.attr('data-scene');
      var scene = getCurScene(scenes);
      
      if (!scene) return;
      wrap.find('img[data-sku]:visible:not(.sku-map img)').each(function () {
        var item = $(this).closest('li');
        var itemData = item.data() || {};
        if (!item.size()) return;
        var boundingClientRect = this.getBoundingClientRect();
        var infoEl = $(this);
        var data;

        if (window.location.href.indexOf('checkout/index/secure_checkout') != -1 && !__device_type().mobile) {
          if (isShow == 'recommend_goods_list') {
            _w = 800
          } else {
            _w = 1500
          }
        } else {
          _w = window.innerWidth
        }

        // 需要左右滑动才显示的不上报
        if (isShow != 'init') {
          if (!(boundingClientRect.left >= 0 && boundingClientRect.right <= _w)) return;
          // show 状态时 不在可见范围不上报
          if ((isShow && !inScreen(boundingClientRect))) return;
        }

        data = infoEl.data() || {};
        switch (true) {
          case data.isCateAd == 1:
            cate_ad_sku_list.push(data.sku);
            break;
          case data.isAd == 1:
            ad_sku_list.push(data.sku);
            break;
          default:
            sku_list.push(data.sku);
            break;
        }
        indexMap[data.sku] = itemData.index !== undefined
          ? itemData.index  // swiper
          : item.parent().find('>li').index(item); // 非 swiper
      });

      // 已上报过的数据不上报
      if (isShow == 'recommend_goods_list') {
        isShow = true
      }
      cate_ad_sku_list = filterNoCache(isShow + scene, cate_ad_sku_list);
      ad_sku_list = filterNoCache(isShow + scene, ad_sku_list);
      sku_list = filterNoCache(isShow + scene, sku_list);
      // 更新缓存
      cacheShowGoodsList(isShow + scene, [].concat(sku_list, ad_sku_list, cate_ad_sku_list));

      // 空数据不发
      if (!(cate_ad_sku_list.length || ad_sku_list.length || sku_list.length)) return;

      var skuArr = [].concat(sku_list, ad_sku_list, cate_ad_sku_list);
      var show_type = isShow ? 'show' : 'list'
      if (window.location.href.indexOf('checkout/index/secure_checkout') != -1 && isShow == 'init') {
        show_type = 'list'
      }
      var params = {
        page: getPage(),
        position_list: '',
        device: getDevice(),
        show_type: show_type,
        scene: scene,
        cate_ad_sku_list: cate_ad_sku_list.join(','),
        ad_sku_list: ad_sku_list.join(','),
        sku_list: skuArr.join(','),
        event: 'GoodsList'
      };
      if (isShow && isShow != 'init') {
        params.position_list = $.map(skuArr, function (sku) {
          return indexMap[sku] + 1;
        }).join(',');
      }
      collector.send(wrapData(params));
    });
  }
  function goodsList(wrap, isShow) {
    if (goodsListNotReady()) return;
    if (typeof wrap === 'string') {
      wrap = $(wrap);
    }
    wrap.each(function () {
      var indexMap = {};
      var wrap = $(this);
      var cate_ad_sku_list = [];
      var ad_sku_list = [];
      var sku_list = [];
      var scenes = wrap.attr('data-scene') || wrap.closest('[data-scene]').attr('data-scene');
      var scene = getCurScene(scenes);
      
      if (!scene) return;
      wrap.find('img[data-sku]:visible:not(.sku-map img)').each(function () {
        if($(this).hasClass('gcard-img-hover')){
          return
        }
        var item = $(this).closest('li');
        var itemData = item.data() || {};
        if (!item.size()) return;
        var boundingClientRect = this.getBoundingClientRect();
        var infoEl = $(this);
        var data;

        // 需要左右滑动才显示的不上报
        if (!(boundingClientRect.left >= 0 && boundingClientRect.right <= window.innerWidth)) return;
        // show 状态时 不在可见范围不上报
        if (isShow && !inScreen(boundingClientRect)) return;

        data = infoEl.data() || {};
        switch (true) {
          case data.isCateAd == 1:
            cate_ad_sku_list.push(data.sku);
            break;
          case data.isAd == 1:
            ad_sku_list.push(data.sku);
            break;
          default:
            sku_list.push(data.sku);
            break;
        }
        indexMap[data.sku] = itemData.index !== undefined
          ? itemData.index  // swiper
          : item.parent().find('>li').index(item); // 非 swiper
      });

      // 已上报过的数据不上报
      cate_ad_sku_list = filterNoCache(isShow + scene, cate_ad_sku_list);
      ad_sku_list = filterNoCache(isShow + scene, ad_sku_list);
      sku_list = filterNoCache(isShow + scene, sku_list);
      // 更新缓存
      cacheShowGoodsList(isShow + scene, [].concat(sku_list, ad_sku_list, cate_ad_sku_list));

      // 空数据不发
      if (!(cate_ad_sku_list.length || ad_sku_list.length || sku_list.length)) return;

      var skuArr = [].concat(sku_list, ad_sku_list, cate_ad_sku_list);
      var params = {
        page: getPage(),
        position_list: '',
        device: getDevice(),
        show_type: isShow ? 'show' : 'list',
        scene: scene,
        cate_ad_sku_list: cate_ad_sku_list.join(','),
        ad_sku_list: ad_sku_list.join(','),
        sku_list: skuArr.join(','),
        event: 'GoodsList'
      };
      if (isShow) {
        params.position_list = $.map(skuArr, function (sku) {
          return indexMap[sku] + 1;
        }).join(',');
      }
      collector.send(wrapData(params));
    });
  }

  var everHappenedWebStay = false;
  var autoWebStayMil = 3000;

  // 拦截 stay
  collector.addIntercept({
    type: 'stay_send_before',
    handler: function () {
      // 标记为已触发
      everHappenedWebStay = true;
    }
  });
  // dom ready
  $(function () {
    setTimeout(function () {
      // 已触发时不再上报
      if (everHappenedWebStay) return;
      collector.emit('stay', {}, autoWebStayMil);
    }, autoWebStayMil);
    // 构建 typeMap
    $('#filter .collapse-body').each(function () {
      var item = $(this);
      var id = (item.parent().attr('id') || '').replace(/^attr-/g, '');
      var val = item.parent().prev().text().trim();
      typeMap[id] = val;
    });
    collector.emit('change.GoodsList');

    if (typeof Swiper === 'undefined') return;
    var showgoods = debounce((function (swiper) {
      // 商品上报 - list
      goodsList($(swiper.wrapperEl));
      // 商品上报 - show
      goodsList($(swiper.wrapperEl), true);
    }), debounceWait);
    var init = Swiper.prototype.init;

    // 注入 Swiper
    Swiper.prototype.init = function () {
      this.on('beforeInit', function () {
        // 保存原始下标，避免在 loop 模式下获取错误的下标信息
        $(this.wrapperEl).find('>.swiper-slide').each(function (index) {
          $(this).data({ index: index });
        });
      });
      // 在 swiper 初始化之后上报，以获取正确的展示数量
      this.on('init', function () {
        var $el = $(this.wrapperEl);
        // 商品上报 - list
        goodsList($el);
        // 商品上报 - show
        goodsList($el, true);
        adShow($el.find(AD_SELECTOR));
      });
      init.apply(this, [].slice.call(arguments));
      this.on('transitionEnd', function () {
        showgoods(this);
      });
    };
  });
  //#endregion

  //#region template

  //#endregion
})(window, typeof collector !== 'undefined' && collector, $);
