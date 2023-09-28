
    // 百度地图API功能

    // var map = new BMap.Map("allmap");

    // var m = new BMap.Marker(new BMap.Point(96.24968, 16.836616));

    // map.addOverlay(m);

    // map.centerAndZoom(new BMap.Point(96.24968, 16.836616), 16);

    // map.enableScrollWheelZoom(true);


    // // 用经纬度设置地图中心点

    // function theLocation(longitude, latitude) {

    //   map.clearOverlays();

    //   var new_point = new BMap.Point(longitude, latitude);

    //   var marker = new BMap.Marker(new_point); // 创建标注

    //   map.addOverlay(marker); // 将标注添加到地图中

    //   map.panTo(new_point);

    //   map.centerAndZoom(new_point, 16);
    // }

    // jQuery(document).ready(function(e) {

    //   jQuery(function() {

    //     var storeSwiper = new Swiper('#stores', {

    //       prevButton: '.dealer-stores-next',

    //       nextButton: '.dealer-stores-prev',

    //       simulateTouch: false,

    //       direction: 'vertical',

    //       slidesPerView: 'auto',

    //       slidesPerGroup: 1,

    //       preventClicks: false,

    //       loop: false,

    //       autoHeight: true,

    //       onInit: function(swiper) {

    //         var firstDom = jQuery('#stores').find('.swiper-slide').eq(0);

    //         firstDom.addClass('on');

    //         var str = firstDom.attr('data-src');

    //       },

    //       breakpoints: {

    //         767: {

    //           slidesPerView: 'auto',

    //         }

    //       }

    //     });

    //     jQuery('#stores .swiper-slide').click(function() {

    //       jQuery(this).addClass('on').siblings().removeClass('on');

    //       var str = jQuery(this).attr('data-src');

    //       if (str == 'yangon') {
    //         theLocation(96.2514502, 16.8421162)
    //       } else if (str == 'jakarta') {
    //         theLocation(106.512619, -6.200837)
    //       } else if (str == 'PhnomPenh') {
    //         theLocation(104.7247703, 11.508087)
    //       } else if (str == 'bangkok') {
    //         theLocation(100.8280251, 13.5851398)
    //       } else if (str == 'Hochiminh') {
    //         theLocation(106.6146051, 10.7962849)
    //       } else if (str == 'dubai') {
    //         theLocation(55.406839, 25.1759492)
    //       } else if (str == 'sydney') {
    //         theLocation(151.0275116, -33.8602835)
    //       } else if (str == 'melbourne') {
    //         theLocation(144.7200891, -37.7509679)
    //       }

    //     })

    //   });

    // });

    // if (sysLanguage == 'zh-cn') {
    //   jQuery(function($) {

    //     // jQuery("#googlemap").hide();
    //     jQuery("#googlemap").show();
    //     jQuery("#baidumap").hide();

    //   });
    // } else if (sysLanguage !== 'zh-cn') {
      jQuery(function($) {
        $.ajax({
          type: 'get',
          url: 'https://www.google.com',
          dataType: "jsonp",
          success: function(data, status) {
            console.log("请求成功");
            jQuery("#googlemap").show();
            jQuery("#baidumap").hide();
          },
          error: function(XMLHttpRequest) {
            jQuery("#googlemap").show();
            jQuery("#baidumap").hide();

            jQuery(document).ready(function(e) {

              jQuery(function() {

                var storeSwiper = new Swiper('#googlestores', {

                  prevButton: '.dealer-stores-next',

                  nextButton: '.dealer-stores-prev',

                  simulateTouch: false,

                  direction: 'vertical',

                  slidesPerView: 'auto',

                  slidesPerGroup: 1,

                  preventClicks: false,

                  loop: false,

                  autoHeight: true,

                  onInit: function(swiper) {

                    var firstDom = jQuery('#googlestores').find('.swiper-slide').eq(0);

                    firstDom.addClass('on');

                    var str = firstDom.attr('data-src');

                  },

                  breakpoints: {

                    767: {

                      slidesPerView: 'auto',

                    }

                  }

                });



                jQuery('.yangon').html('<iframe style="border: 0;" src="https://www.google.com/maps/embed/v1/place?q=Samanea Yangon Market 缅甸 Dagon Myothit (Seikkan), Bago River Rd&amp;key=AIzaSyDoy0sqotmIOPrc5cRdIYDRscjUIkMTdTw" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');

                jQuery('.jakarta').html('<iframe style="border: 0;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3533.7214424413064!2d106.51808900742694!3d-6.2017903187407635!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x4df85ecdfe7352bf!2sSamanea%20Indonesia!5e0!3m2!1szh-CN!2sus!4v1608189072973!5m2!1sen!2sus" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');

                jQuery('.PhnomPenh').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1643.7772740280473!2d104.73834946762486!3d11.509956042107339!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310949fe14c5b717%3A0xa824083d7515420f!2sSamanea%20PP%20Market!5e0!3m2!1sen!2ssg!4v1608192265595!5m2!1sen!2ssg" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');
               
                jQuery('.bangkok').html('<iframe style="border: 0;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15512.630856128353!2d100.8250927!3d13.5871747!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d43ea71fca507%3A0x27c1565a1b01f057!2z5pif6L-I6buO5Lqa5pu86LC35ZWG6LS45Z-O!5e0!3m2!1szh-CN!2sus!4v1608189677485!5m2!1sen!2sus" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');

                jQuery('.Hochiminh').html('<iframe style="border: 0;" src="https://www.google.com/maps/embed/v1/place?q=%20Celadon%20City%2C%20Tan%20Phu%20District%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam&amp;key=AIzaSyDoy0sqotmIOPrc5cRdIYDRscjUIkMTdTw" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');

                jQuery('.dubai').html('<iframe style="border: 0;" src="https://www.google.com/maps/embed/v1/place?q=Warsan%20First%2C%20Dubai%2C%20UAE&amp;key=AIzaSyDoy0sqotmIOPrc5cRdIYDRscjUIkMTdTw" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');

                jQuery('.sydney').html('<iframe style="border: 0;" src="https://www.google.com/maps/embed/v1/place?q=79-99%20St%20Hillers%20Road%2C%20Auburn%2C%20NSW%202144%2C%20Australia&amp;key=AIzaSyDoy0sqotmIOPrc5cRdIYDRscjUIkMTdTw" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');

                jQuery('.melbourne').html('<iframe style="border: 0;" src="https://www.google.com/maps/embed/v1/place?q=1385%20Western%20Highway%2C%20Rockbank%2C%20VIC%203335%2C%20Australia&amp;key=AIzaSyDoy0sqotmIOPrc5cRdIYDRscjUIkMTdTw" width="100%" height="635" frameborder="0" allowfullscreen="allowfullscreen"></iframe>');



                jQuery('.jakarta,.PhnomPenh,.bangkok,.Hochiminh,.dubai,.sydney,.melbourne').css('display', 'none');


                jQuery('#googlestores .swiper-slide').click(function() {

                  jQuery(this).addClass('on').siblings().removeClass('on');

                  var src = jQuery(this).attr('data-src');



                  if (src == 'yangon')

                  {

                    jQuery('.yangon').css('display', 'block');

                    jQuery('.jakarta,.PhnomPenh,.bangkok,.Hochiminh,.dubai,.sydney,.melbourne').css('display', 'none');

                  } else if (src == 'jakarta')

                  {

                    jQuery('.jakarta').css('display', 'block');

                    jQuery('.yangon,.PhnomPenh,.bangkok,.Hochiminh,.dubai,.sydney,.melbourne').css('display', 'none');



                  } else if (src == 'PhnomPenh')

                  {

                    jQuery('.PhnomPenh').css('display', 'block');

                    jQuery('.yangon,.jakarta,.bangkok,.Hochiminh,.dubai,.sydney,.melbourne').css('display', 'none');



                  } else if (src == 'bangkok')

                  {

                    jQuery('.bangkok').css('display', 'block');

                    jQuery('.yangon,.jakarta,.PhnomPenh,.Hochiminh,.dubai,.sydney,.melbourne').css('display', 'none');



                  } else if (src == 'Hochiminh')

                  {

                    jQuery('.Hochiminh').css('display', 'block');

                    jQuery('.yangon,.jakarta,.PhnomPenh,.bangkok,.dubai,.sydney,.melbourne').css('display', 'none');

                  } else if (src == 'dubai')

                  {

                    jQuery('.dubai').css('display', 'block');

                    jQuery('.yangon,.jakarta,.PhnomPenh,.bangkok,.Hochiminh,.sydney,.melbourne').css('display', 'none');

                  } else if (src == 'sydney')

                  {

                    jQuery('.sydney').css('display', 'block');

                    jQuery('.yangon,.jakarta,.PhnomPenh,.bangkok,.Hochiminh,.dubai,.melbourne').css('display', 'none');

                  } else if (src == 'melbourne')

                  {

                    jQuery('.melbourne').css('display', 'block');

                    jQuery('.yangon,.jakarta,.PhnomPenh,.bangkok,.Hochiminh,.dubai,.sydney').css('display', 'none');

                  }

                });

              });

            });
          },
        });
        // jQuery("#googlemap").hide();
        // jQuery("#baidumap").show();
        jQuery("#googlemap").show();
        jQuery("#baidumap").hide();
      });

    // }
  