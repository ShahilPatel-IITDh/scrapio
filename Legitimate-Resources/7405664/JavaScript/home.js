require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({18:[function(require,module,exports){
'use strict';

;$(function () {
    if($('.index-wrap .addDown-wrap').length>0){
      $('.fixed-right-advertisement').remove()
      $('.fixed-right-advertisement-img').remove()
      $('.fixed-right-view .go-code').remove()
    }
    __qrcode({ id: 'down-code', url: $('.addDown-wrap .down-img a').attr('data-url'), cellSize: 4, });
    $('.index-wrap .addDown-wrap .down-btn').on('click',function () {
      var _this=$(this).parent()
      if(_this.hasClass('show')){
        _this.removeClass('show')
        ctag('InviteAppSideToggle', 'close')
      }else{
        _this.addClass('show')
        ctag('InviteAppSideToggle', 'open')
      }
    })
    var downOpen=sessionStorage.getItem('downOpen')
    if(!downOpen){
      $('.index-wrap .addDown-wrap').addClass('show')
      sessionStorage.setItem('downOpen',true)
      if(!isMobileDevices()){
        ctag('InviteAppSideToggle', 'open')
      }
    }
  /*
   * home_middle_banner1 配置规则： 
   * 配置M端，请不要配置PC端的图片
   * 配置PC端，请不要配置M端的图片
   * 配置两端，请只配置一个广告位，PC和M端的图片都需要上传
  **/
  $('.home_middle_banner1 li').each(function(idx){
    var pcImg=$(this).find('[data-srcset]').attr('data-srcset')
    var pc_MImg=$(this).find('img').attr('data-src')
    if(pcImg&&pc_MImg){
      return
    }
    if(!pcImg && window.innerWidth>768 || pcImg && window.innerWidth<768){
      $(this).remove()
    }
  })
  function initSwiper(el){
    var elP=""
    if(el=='.themesSwiper'){
      elP='#themesSwiper'
    }
    var bannerSwiper = new Swiper(el, {
      autoHeight:true,
    direction: 'horizontal', // 水平切换选项
      loop:false, // 循环模式选项
    // watchOverflow: true,//因为仅有1个slide，swiper无效 
    // 如果需要分页器
    pagination: {
          el: (elP?elP:el)+' .swiper-pagination',
          clickable :true,
    },
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false //启动自动切换
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: (elP?elP:el)+' .swiper-button-next',
        prevEl: (elP?elP:el)+' .swiper-button-prev'
    }
  });

      // $(el).mouseover(function () {
    //滑过悬停
      //   if (bannerSwiper.autoplay) bannerSwiper.autoplay.stop();
      // }).mouseout(function () {
    //离开开启
      //   if (bannerSwiper.autoplay) bannerSwiper.autoplay.start();
      // }); 
    if ($(el).length > 0) {
      bannerSwiper.update();

      // 一张图片不轮播
      if (bannerSwiper.slides.length <= 1) {
      bannerSwiper.navigation.$nextEl.css('display', 'none');
      bannerSwiper.navigation.$prevEl.css('display', 'none');
      bannerSwiper.pagination.$el.css('display', 'none');
      bannerSwiper.destroy();
      }
    }
  }
  initSwiper('.banner')
  initSwiper('.clearance-wrap')
  initSwiper('.themesSwiper')

  // 闪购
  var flashSwiper = new Swiper('.flash-deals-swiper', {
    direction: 'horizontal', // 水平切换选项
    // 如果需要前进后退按钮
    slidesPerView: 5,
    navigation: {
      nextEl: '.flash-deals-swiper .swiper-button-next',
      prevEl: '.flash-deals-swiper .swiper-button-prev'
    },
    pagination: {
      el: '.flash-deals-swiper .swiper-pagination'
    },
    breakpoints: {
      480: { //当宽度小于等于320 
        slidesPerView: 2
      },
      768: { //当宽度小于等于640  
        slidesPerView: 3
      }
    }
  });
  var itemSwiper = new Swiper('#itemSwiper', {
    slidesPerView: "auto",
    slidesPerGroup: 4,
    navigation: {
      nextEl: '.item-swiper-wrapper .swiper-button-next',
      prevEl: '.item-swiper-wrapper .swiper-button-prev'
    },
    // loop: true, // 循环模式选项
    breakpoints: {
      768: {
        slidesPerGroup: 2
      }
    }
  });
  var bestSaleSwiper = new Swiper('#bestSaleSwiper .swiper-container', {
    lazy: true,
    slidesPerView: 5,
    slidesPerGroup: 5,
    autoplay: {
      delay: 3000,
      stopOnLastSlide: false,
      disableOnInteraction: false //关闭自动切换,手动启动 start
    },
      pagination: {
        el: '#bestSaleSwiper .swiper-pagination',
        clickable :true,
    },
    breakpoints: {
      768: {
          slidesPerView: 'auto',
        slidesPerGroup: 2
      }
    }
  });
    // $("#bestSaleSwiper .swiper-container").mouseover(function () {
    //滑过悬停
    //   if (bestSaleSwiper.autoplay) bestSaleSwiper.autoplay.stop();
    // }).mouseout(function () {
    //离开开启
    //   if (bestSaleSwiper.autoplay) bestSaleSwiper.autoplay.start();
    // }); 
  var isReported = false;
  // 新品
  var newSwiper = undefined;
  newSwiperUpdate();
  $(window).resize(function () {
    newSwiperUpdate();
  });
  function newSwiperUpdate() {
    var winWidth = $(window).width();
    if (winWidth >= 992 && newSwiper == undefined) {
    //   newSwiper = new Swiper('.new-arrival-swiper .swiper-container', {
    //     lazy: true,
    //     direction: 'horizontal', // 水平切换选项
        // 如果需要前进后退按钮
    //     slidesPerView: 5,
    //     slidesPerGroup: 5,
    //     navigation: {
    //       nextEl: '.new-arrival-swiper .swiper-button-next',
    //       prevEl: '.new-arrival-swiper .swiper-button-prev'
    //     },
        // breakpoints: {
        //   1600: { //当宽度小于等于1600 
        //     slidesPerView: 4,
        //     slidesPerGroup: 4,
        //   }
        // }
    //   });
    } else if (winWidth < 992) {
      if (newSwiper != undefined) {
        newSwiper.destroy();
        newSwiper = undefined;
        $('.new-arrival-swiper .swiper-wrapper').removeAttr('style');
        $('.new-arrival-swiper .swiper-slide').removeAttr('style');
      };
      if (!isReported) {
        isReported = true;
        ctag('GoodsList', $('.new-arrival-swiper'));
      }
      $(".new-arrival-swiper .swiper-lazy").each(function (e) {
        var _this = $(this);
        var _original = _this.attr("data-src");
        _this.attr("data-src", _original).addClass("lazyload");
      });
    }
  }

  //new arrivals板块滚动加载数据
  var timer=0;
  var isComplete=false; //是否加载完
  var firstLilength=10; //new arrivals板块初始化时默认数据30个数
  var saveCurPage=0; //保存当前页面
  if (isMobileDevices()&&$(".home-main") ){ //pc设备不需滚动加载
  window.addEventListener('scroll', debounce(scrollMethod,20));

    if($(".home-main").length>0){
      $("#footer").addClass('d-none');
    }
  }
  function scrollMethod(){
    var liHeight = parseInt($("#newArrivalsWrapperUl").find("li").outerHeight(true)); //获取盒子的高度
    var scrollTopHeight = parseInt($(document).scrollTop());
    var documentHeight = parseInt($(document).height());
    var footHeight = parseInt($("#footer").outerHeight(true)?$("#footer").outerHeight(true):0);
    var headerHeight = parseInt($("#header").outerHeight(true)?$("#header").outerHeight(true):0);
    var tpadcommHeight = parseInt($("#tpadcomm").outerHeight(true)?$("#tpadcomm").outerHeight(true):0);
    var appAdWrapHeight = parseInt($("#app-ad-wrap").outerHeight(true)?$("#app-ad-wrap").outerHeight(true):0);
    var promoBarHeight = parseInt($(".promo-bar").outerHeight(true)?$(".promo-bar").outerHeight(true):0);
    var liLength = parseInt($("#newArrivalsWrapperUl").find("li").length);
    var isHaveBlock = $("#footer").attr('class').indexOf('d-block');
    var curPage = 1 //转换当前页面
    if(isHaveBlock>-1){
      $("#footer").removeClass('d-block');
    }
    if(saveCurPage==0){//第一次
      firstLilength = liLength;
    }
    if(liLength<=firstLilength){
      curPage = 1;
    }else{
      curPage = parseInt(liLength/firstLilength);
      if(liLength%firstLilength !=0 ){
        isComplete = true;
        $("#footer").addClass('d-block');
        $('#viewMore_index').parent().removeClass('d-md-block')
      }
    }
    if(scrollTopHeight>= (documentHeight-liHeight*3-footHeight-headerHeight-tpadcommHeight - appAdWrapHeight - promoBarHeight)){ //当前进入第9排  
      if(!isComplete&&(saveCurPage!=curPage)){//防止发重复页面请求
        $("#loadingImags").show();
        $(".viewMore-loading").show()
        getNewGoodsDataOnScroll(curPage+1,firstLilength);
        saveCurPage = curPage;
      }
    }
  }
  $("#viewMore_index").on('click',function(){
    $(this).hide()
    scrollMethod()
  })

  function getNewGoodsDataOnScroll(page,_size) {
      var _box = $("#newArrivalsWrapper"),
          _page = page || 1
      $.ajax({
          type: "GET",
          data: 'view_more=1' + '&page=' + _page + '&limit=' + _size,
          url: '/goods/goods/ajax-new-goods',
          success: function success(res) {
            var len = res.split('<li class="gcard col-6 col-md-3 justify-content-between">').length-1
             if (res != '0') {
                  _box.find("#newArrivalsWrapperUl").append(res);
            }else{
              $("#footer").removeClass('d-none').addClass('d-block');
            }
            if(len<firstLilength){
                isComplete = true;
               $("#footer").removeClass('d-none').addClass('d-block');
               $('#viewMore_index').parent().removeClass('d-md-block')
                $(document).scrollTop($(document).height());// 加载完成后，滚动底部
              }
             $("#loadingImags").attr('style','display: none !important;');
            $(".viewMore-loading").hide();
            $("#viewMore_index").show()
          }
      });
  }
  //防抖函数
  function debounce(func, wait) {
      return function() {
        var context =this;
        var args = arguments;
        if (timer){
           clearTimeout(timer);
        } 
        timer = setTimeout(() => {
          func.apply(this, args)
        }, wait)
      }
  }
});

},{}]},{},[18])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXHBhZ2VzXFxob21lXFxpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsQ0FBQyxFQUFFLFlBQVk7QUFDYjtBQUNBLE1BQUksZUFBZSxJQUFJLE1BQUosQ0FBWSxTQUFaLEVBQXVCO0FBQ3hDLGVBQVcsWUFENkIsRUFDZjtBQUN6QixVQUFNLElBRmtDLEVBRTVCO0FBQ1o7QUFDQTtBQUNBLGdCQUFZO0FBQ1YsVUFBSTtBQURNLEtBTDRCO0FBUXhDLGNBQVU7QUFDUixhQUFPLElBREM7QUFFUix1QkFBaUIsS0FGVDtBQUdSLDRCQUFzQixLQUhkLENBR3FCO0FBSHJCLEtBUjhCO0FBYXhDO0FBQ0EsZ0JBQVk7QUFDVixjQUFRLDZCQURFO0FBRVYsY0FBUTtBQUZFO0FBZDRCLEdBQXZCLENBQW5COztBQW9CQSxJQUFFLFNBQUYsRUFBYSxTQUFiLENBQXVCLFlBQVk7QUFBQztBQUNsQyxRQUFHLGFBQWEsUUFBaEIsRUFBMEIsYUFBYSxRQUFiLENBQXNCLElBQXRCO0FBQzNCLEdBRkQsRUFFRyxRQUZILENBRVksWUFBVTtBQUFDO0FBQ3JCLFFBQUksYUFBYSxRQUFqQixFQUEyQixhQUFhLFFBQWIsQ0FBc0IsS0FBdEI7QUFDNUIsR0FKRDtBQUtBLGVBQWEsTUFBYjtBQUNBO0FBQ0EsTUFBSSxhQUFhLE1BQWIsQ0FBb0IsTUFBcEIsSUFBOEIsQ0FBbEMsRUFBcUM7QUFDbkMsaUJBQWEsVUFBYixDQUF3QixPQUF4QixDQUFnQyxHQUFoQyxDQUFvQyxTQUFwQyxFQUErQyxNQUEvQztBQUNBLGlCQUFhLFVBQWIsQ0FBd0IsT0FBeEIsQ0FBZ0MsR0FBaEMsQ0FBb0MsU0FBcEMsRUFBK0MsTUFBL0M7QUFDQSxpQkFBYSxVQUFiLENBQXdCLEdBQXhCLENBQTRCLEdBQTVCLENBQWdDLFNBQWhDLEVBQTJDLE1BQTNDO0FBQ0EsaUJBQWEsT0FBYjtBQUNEOztBQUVEO0FBQ0EsTUFBSSxjQUFjLElBQUksTUFBSixDQUFXLHFCQUFYLEVBQWtDO0FBQ2xELGVBQVcsWUFEdUMsRUFDekI7QUFDekI7QUFDQSxtQkFBZSxDQUhtQztBQUlsRCxnQkFBWTtBQUNWLGNBQVEseUNBREU7QUFFVixjQUFRO0FBRkUsS0FKc0M7QUFRbEQsZ0JBQVk7QUFDVixVQUFJO0FBRE0sS0FSc0M7QUFXbEQsaUJBQWE7QUFDWCxXQUFLLEVBQUM7QUFDSix1QkFBZTtBQURaLE9BRE07QUFJWCxXQUFLLEVBQUM7QUFDSix1QkFBZTtBQURaLE9BSk07QUFPWCxZQUFNLEVBQUM7QUFDTCx1QkFBZTtBQURYO0FBUEs7QUFYcUMsR0FBbEMsQ0FBbEI7O0FBd0JBO0FBQ0EsTUFBSSxZQUFZLFNBQWhCO0FBQ0E7QUFDQSxJQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVU7QUFDekI7QUFDRCxHQUZEO0FBR0EsV0FBUyxlQUFULEdBQTBCO0FBQ3hCLFFBQUksV0FBVyxFQUFFLE1BQUYsRUFBVSxLQUFWLEVBQWY7QUFDQSxRQUFHLFlBQVksR0FBWixJQUFtQixhQUFhLFNBQW5DLEVBQTZDO0FBQzNDLGtCQUFZLElBQUksTUFBSixDQUFZLHVDQUFaLEVBQXFEO0FBQy9ELG1CQUFXLFlBRG9ELEVBQ3RDO0FBQ3pCO0FBQ0EsdUJBQWUsQ0FIZ0Q7QUFJL0Qsb0JBQVk7QUFDVixrQkFBUSx5Q0FERTtBQUVWLGtCQUFRO0FBRkUsU0FKbUQ7QUFRL0QscUJBQWE7QUFDWCxnQkFBTSxFQUFDO0FBQ0wsMkJBQWU7QUFEWDtBQURLO0FBUmtELE9BQXJELENBQVo7QUFjRCxLQWZELE1BZU0sSUFBSSxXQUFXLEdBQVgsSUFBa0IsYUFBYSxTQUFuQyxFQUE2QztBQUNqRCxnQkFBVSxPQUFWO0FBQ0Esa0JBQVksU0FBWjtBQUNBLFFBQUUscUNBQUYsRUFBeUMsVUFBekMsQ0FBb0QsT0FBcEQ7QUFDQSxRQUFFLG1DQUFGLEVBQXVDLFVBQXZDLENBQWtELE9BQWxEO0FBQ0Q7QUFDRjtBQUNDLFdBQVMsYUFBVCxDQUF1QixFQUF2QixFQUEyQixXQUEzQixFQUF3QztBQUNwQyxhQUFTLENBQVQsQ0FBVyxDQUFYLEVBQWM7QUFDVixhQUFPLElBQUksRUFBSixHQUFTLE1BQU0sQ0FBZixHQUFtQixDQUExQjtBQUNIOztBQUVELDBCQUFzQixzQkFBb0IsR0FBMUM7QUFDQSxRQUFJLElBQUksbUJBQVI7O0FBRUEsUUFBSSxJQUFJLENBQVIsRUFBVztBQUNQLG9CQUFjLFNBQVMsV0FBVCxJQUF3QixDQUF0QztBQUNILEtBRkQsTUFFTztBQUNILFVBQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFJLElBQUosR0FBVyxFQUFYLEdBQWdCLEVBQWhCLEdBQXFCLEVBQWhDLENBQVI7QUFDQSxVQUFJLElBQUksS0FBSyxLQUFMLENBQVcsSUFBRyxJQUFILEdBQVUsRUFBVixHQUFlLEVBQWYsR0FBb0IsRUFBL0IsQ0FBUjtBQUNBLFVBQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFHLElBQUgsR0FBVSxFQUFWLEdBQWUsRUFBMUIsQ0FBUjtBQUNBLFVBQUksSUFBSSxLQUFLLEtBQUwsQ0FBVyxJQUFHLElBQUgsR0FBVSxFQUFyQixDQUFSO0FBQ0E7O0FBRUEsUUFBRSxxQkFBcUIsRUFBdkIsRUFBMkIsSUFBM0IsQ0FBZ0MsRUFBRSxDQUFGLENBQWhDO0FBQ0EsUUFBRSxxQkFBcUIsRUFBdkIsRUFBMkIsSUFBM0IsQ0FBZ0MsRUFBRSxDQUFGLENBQWhDO0FBQ0EsUUFBRSxxQkFBcUIsRUFBdkIsRUFBMkIsSUFBM0IsQ0FBZ0MsRUFBRSxDQUFGLENBQWhDO0FBQ0EsUUFBRSxxQkFBcUIsRUFBdkIsRUFBMkIsSUFBM0IsQ0FBZ0MsRUFBRSxDQUFGLENBQWhDO0FBQ0E7QUFDSDtBQUNKO0FBQ0QsTUFBRyxtQkFBSCxFQUF1QjtBQUNuQiwwQkFBc0Isc0JBQXNCLElBQTVDO0FBQ0EsUUFBSSxVQUFVLFlBQVksWUFBVztBQUNqQyxvQkFBYyxDQUFkLEVBQWlCLENBQWpCO0FBQ0gsS0FGYSxFQUVYLEdBRlcsQ0FBZDtBQUdIO0FBQ0osQ0F6SEEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtl