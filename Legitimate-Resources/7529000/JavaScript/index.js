(function () {
  /** @type {MediaQueryList} SP matchMedia */
  var isSP = window.matchMedia("(max-width: 1019px)");

  /** @type {boolean} PDログインフラグ */
  var isCustomer = false;

  /**
   * cookie名から値を取得する
   * @param {string} cname
   */
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split("; ");
    var c = ca.filter(function (row) {
      return row.indexOf(name) === 0;
    });
    if (c.length) return c[0].split("=")[1];
    return "";
  }

  /**
   * 新規・既存 表示切り替え
   * @param {boolean} isCustomer
   */
  function userDisplaySwitching(isCustomer) {
    if (isCustomer) {
      $(".for-customer").removeClass("for-customer--hidden");
      $(".for-new").addClass("for-new--hidden");
    } else {
      $(".for-customer").addClass("for-customer--hidden");
      $(".for-new").removeClass("for-new--hidden");
    }
  }

  /**
   * マーケット情報のIframeをリロードする
   * @param {boolean} isCustomer
   */
  function reloadMarketInformationIframe(isCustomer) {
    var iframe = $("#js-market-information-iframe");
    if (isCustomer) {
      var src = iframe.attr("data-src");
      iframe.attr("src", src);
    } else {
      iframe.attr("src", null);
    }
  }

  /**
   * スライダーを再レンダリングする
   */
  function reRenderingSlider() {
    $("#rt_top_kv_n .slider__list").slick("setPosition");
    $("#rt_car_k .slider__list").slick("setPosition");
    $(".top-latest-interest-rate--carousel .slider__list").slick("setPosition");
    $(".top-recommended-info--carousel .slider__list").slick("setPosition");
  }

  /**
   * check口座開設
   */
  (function () {
    var uid = getCookie("_rt.uid");
    isCustomer = uid.length === 64;

    userDisplaySwitching(isCustomer);

    reloadMarketInformationIframe(isCustomer);
  })();

  /**
   * TOP単体キービジュアルの背景色を敷く
   */
  function topKeyvisualBackgroundColor() {
    const keyvisualInner = document.querySelector(".top-keyvisual--single");

    if (!keyvisualInner) return;

    const keyvisualImage = keyvisualInner.querySelector(".top-keyvisual--image img");

    if (!keyvisualImage) return;

    keyvisualImage.crossOrigin = "";

    /**
     * 要素をcanvasに描いてセットする
     * @param {Element} imageElement Image Element
     * @returns {CanvasRenderingContext2D | null}
     */
    function setCanvas(imageElement) {
      const canvas = document.createElement("canvas");
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const context = canvas.getContext("2d");
      context.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
      return context;
    }

    /**
     * canvasから色をサンプリングして背景色にセットする
     * @param {Element} setElement 背景色を付ける要素
     * @param {CanvasRenderingContext2D} context2D CanvasRenderingContext2D
     * @param {number} x サンプリングするx座標
     * @param {number} y サンプリングするy座標
     */
    function setBackgroundColor(setElement, context2D, x, y) {
      const imageData = context2D.getImageData(x, y, 1, 1);
      setElement.style.backgroundColor = `rgba(${imageData.data.join(",")})`;
    }

    keyvisualImage.addEventListener(
      "load",
      function (e) {
        const imageElement = e.currentTarget;

        if (!imageElement) return;

        const context2D = setCanvas(imageElement);

        if (!context2D) return;

        setBackgroundColor(keyvisualInner, context2D, context2D.canvas.width - 1, 0);
      },
      { once: true }
    );
  }
  topKeyvisualBackgroundColor();

  /**
   * KV上テキストリンク TOP用口座開設切り替え
   */
  (function () {
    $("[data-toggle-top-account]").on("click", function (e) {
      e.preventDefault();

      var $self = $(this);
      isCustomer = $self.attr("data-toggle-top-account") === "opened";

      userDisplaySwitching(isCustomer);

      // ヘッダー上 バナー のヘッダー制御
      if ($(".top-header-banner:visible").length) {
        $(".wrapper").addClass("wrapper--header-banner-visible");
      } else {
        $(".wrapper").removeClass("wrapper--header-banner-visible");
      }

      reRenderingSlider();

      reloadMarketInformationIframe(isCustomer);
    });
  })();

  /**
   * カルーセル キービジュアル
   */
  function topKeyvisualCarousel() {
    $(".top-keyvisual--carousel").each(function () {
      var self = this;
      $(self).find(".slider__item").find("img").each(function (i, keyvisualImage) {
        keyvisualImage.crossOrigin = "";
      })
      var isOneItem = $(self).find(".slider__list .slider__item").length <= 1;
      if (isOneItem) {
        $(self).closest(".top-keyvisual").addClass("top-keyvisual--single");
      }
      $(this)
        .find(".slider__list")
        .slick({
          autoplay: $(self).find(".slider__list").hasClass("js-manual-slide") ? false : true,
          autoplaySpeed: 6000,
          mobileFirst: true,
          accessibility: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: !isOneItem,
          arrows: true,
          centerMode: true,
          centerPadding: "0",
          swipeToSlide: true,
          prevArrow: $(self).find(".slider__prev"),
          nextArrow: $(self).find(".slider__next"),
          responsive: [
            {
              breakpoint: 1019,
              settings: {
                centerMode: true,
                centerPadding: "0",
              },
            },
          ],
        });
    });
  }
  topKeyvisualCarousel();

  /**
   * カルーセル バナースライド
   */
  function topBannerSlideCarousel() {
    $(".top-banner-slide--carousel").each(function () {
      var self = this;
      $(this)
        .find(".slider__list")
        .slick({
          autoplay: $(self).find(".slider__list").hasClass("js-manual-slide") ? false : true,
          autoplaySpeed: 3000,
          mobileFirst: true,
          accessibility: false,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          swipeToSlide: true,
          prevArrow: $(self).find(".slider__prev"),
          nextArrow: $(self).find(".slider__next"),
          responsive: [
            {
              breakpoint: 1019,
              settings: {
                centerMode: false,
                slidesToShow: 4,
              },
            },
          ],
        });
    });
  }
  topBannerSlideCarousel();

  /**
   * カルーセル 最新の金利
   */
  $(".top-latest-interest-rate--carousel").each(function () {
    var self = this;
    $(this)
      .find(".slider__list")
      .slick({
        autoplay: $(self).find(".slider__list").hasClass("js-manual-slide") ? false : true,
        autoplaySpeed: 3000,
        mobileFirst: true,
        accessibility: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        centerMode: true,
        centerPadding: "30px",
        swipeToSlide: true,
        prevArrow: $(self).find(".slider__prev"),
        nextArrow: $(self).find(".slider__next"),
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: "74px",
            },
          },
          {
            breakpoint: 1019,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerMode: true,
              centerPadding: "74px",
            },
          },
        ],
      });
  });

  /**
   * カルーセル キャンペーン・プログラム
   */
  $(".top-campaign-program--carousel").each(function () {
    var self = this;
    $(this)
      .find(" .slider__list")
      .slick({
        autoplay: $(self).find(".slider__list").hasClass("js-manual-slide") ? false : true,
        autoplaySpeed: 3000,
        mobileFirst: true,
        accessibility: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        centerMode: true,
        centerPadding: "30px",
        arrows: true,
        swipeToSlide: true,
        prevArrow: $(self).find(".slider__prev"),
        nextArrow: $(self).find(".slider__next"),
        responsive: [
          {
            breakpoint: 1019,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              centerPadding: "74px",
            },
          },
        ],
      });
  });

  /**
   * カルーセル おすすめ情報
   */
  $(".top-recommended-info--carousel").each(function () {
    var self = this;
    var slidesToShowSp = 1;
    var slidesToShowPc = 3;
    $(this)
      .find(" .slider__list")
      .slick({
        autoplay: $(self).find(".slider__list").hasClass("js-manual-slide") ? false : true,
        autoplaySpeed: 3000,
        mobileFirst: true,
        accessibility: false,
        infinite: true,
        slidesToShow: slidesToShowSp,
        slidesToScroll: 1,
        dots: $(self).find(".slider__list .slider__list-item").length <= slidesToShowSp ? false : true,
        centerMode: true,
        centerPadding: "30px",
        arrows: true,
        swipeToSlide: true,
        prevArrow: $(self).find(".slider__prev"),
        nextArrow: $(self).find(".slider__next"),
        responsive: [
          {
            breakpoint: 1019,
            settings: {
              slidesToShow: slidesToShowPc,
              slidesToScroll: 1,
              dots: $(self).find(".slider__list .slider__list-item").length <= slidesToShowPc ? false : true,
              centerPadding: "74px",
            },
          },
        ],
      });
  });

  /**
   * ヘッダー上 バナー
   */
  (function () {
    $(".top-header-banner").each(function () {
      var getCookieVal = getCookie("banner-id");
      var bannerIdList = getCookieVal ? getCookieVal.split(",") : [];
      var $self = $(this);
      var $closeBtn = $self.find(".top-header-banner__close-btn");
      var bannerId = $closeBtn.attr("data-banner-id");
      var hasNotBannerId = bannerIdList.every(function (setBannerId) {
        return bannerId !== setBannerId;
      });

      if (hasNotBannerId) {
        // 初期表示
        $self.addClass("top-header-banner--visible");
        var hasOpenedClass = $self.parent().hasClass(isCustomer ? "for-customer" : "for-new");
        if (hasOpenedClass) {
          $(".wrapper").addClass("wrapper--header-banner-visible");
        }
      }

      // 閉じるボタン
      $closeBtn.on("click", function () {
        $self.removeClass("top-header-banner--visible");
        $(".wrapper").removeClass("wrapper--header-banner-visible");

        bannerIdList.push(bannerId);
        document.cookie = "banner-id=" + bannerIdList.join(",");
      });
    });
  })();

  /** TOPキービジュアル 新規 */
  Rtoaster.listen("rt_top_kv_n", function () {
    topKeyvisualCarousel();
  });

  /** TOPキービジュアル 既存 */
  Rtoaster.listen("rt_top_kv_k", function () {
    topKeyvisualBackgroundColor();
  });

  /** カルーセルバナー 新規 */
  Rtoaster.listen("rt_car_n", function () {
    topBannerSlideCarousel();
  });

  /** カルーセルバナー 既存 */
  Rtoaster.listen("rt_car_k", function () {
    topBannerSlideCarousel();
  });

  /**
   * エマージェンシーエリア キービジュアル直上
   */
  $(".top-emergency-josetsu-area").load("/topmsg/ja/topmsg_josetsu.html .top-emergency-josetsu");

  /**
   * エマージェンシーエリア キービジュアル直下
   */
  $(".top-emergency-spot-area").load("/topmsg/ja/topmsg_spot.html .top-emergency-spot");

  /**
   * ニュースリリース ニュース一覧
   */
  (function () {
    /**
     * ニュースリリース生成
     */
    function newsReleaseList() {
      var ajaxOptNews = {
        type: "GET",
        url: "https://corp.sbishinseibank.co.jp/contentFeeds/content/multi3/ja/news/news",
        dataType: "xml",
      };
      var ajaxOptNotice = {
        type: "GET",
        url: "https://corp.sbishinseibank.co.jp/contentFeeds/content/multi3/ja/news/notice",
      };

      // 日付を取得する
      var convertDateEnc = function (day) {
        var dateData = new Date(day);
        var dayY = dateData.getFullYear();
        var dayM = dateData.getMonth() + 1;
        var dayD = dateData.getDate();
        day = dayY + "年" + dayM + "月" + dayD + "日";
        return day;
      };

      // ソート用メソッド
      var sortDayFunc = function (a, b) {
        var aName = $(a).find("pubDate").text();
        var bName = $(b).find("pubDate").text();
        var dta = new Date(aName);
        var dtb = new Date(bName);
        if (dta < dtb) return 1;
        if (dta > dtb) return -1;
        return -1;
      };

      /** @type {number} ニュースの最大表示件数 */
      var newsMaxDisplay = 6;
      var newsTemplate =
        '<li class="block-inform-update-info__item"><a class="link-complex" href="" target="_blank"><div class="extra-group--info badges"><span class="extra-group--info-item"></span></div><div class="link-complex__label"></div></a></li>';
      var iconPdf = '<img class="icon-pdf" src="/common21/imgs/icon-pdf-blue.svg" alt="">';
      var iconNewtab = '<img class="icon-newtab" src="/common21/imgs/icon-newtab-blue.svg" alt="">';
      var xmlObj = {};

      /**
       * ニュースのリストアイテムを生成
       * @param {XMLDocument} data
       */
      function generateNewsElement(data) {
        var generalNews = $(data);
        var newsElement = generalNews.map(function () {
          var $self = $(this);
          var $template = $(newsTemplate);
          var text = $self.find("title").text();
          var day = $self.find("pubDate").text();
          var link = $self.find("link").text();
          var isPdf = /\.pdf$/.test(link);
          var textAndIcon = isPdf ? text + iconPdf : text + iconNewtab;

          $template.find(".link-complex").attr("href", link);
          $template.find(".extra-group--info-item").text(day);
          $template.find(".link-complex__label").html(textAndIcon);
          if (isPdf) {
            var gaEvent = "ga('send', 'event', 'pdf', 'click', '" + location.origin + link + "')";
            $template.find(".link-complex").attr("onclick", gaEvent);
          }

          return $template;
        });

        return newsElement;
      }

      /**
       * ニュースのリストを生成
       * @param {JQuery<JQuery<HTMLElement>>} newsElement
       */
      function generateListElement(newsElement) {
        var listElement = $("<ul></ul>");
        if (newsElement.length >= newsMaxDisplay) {
          newsElement.length = newsMaxDisplay;
        }

        newsElement.each(function () {
          listElement.append(this);
        });

        return listElement;
      }

      /**
       * ニュースのリストをレンダリング
       * @param {JQuery<JQuery<HTMLElement>>} newsElement
       */
      function addListElement(newsElement) {
        var listElement = generateListElement(newsElement);
        $(".top-news-release").html(listElement);
      }

      // news取得
      var getNewsData = function () {
        var d = new $.Deferred();
        $.ajax(ajaxOptNews)
          .done(function (data) {
            xmlObj["news"] = data;
            d.resolve();
          })
          .fail(function () {
            d.resolve();
          });
        return d.promise();
      };

      // お知らせ取得
      var getNoticeData = function () {
        var d = new $.Deferred();
        $.ajax(ajaxOptNotice)
          .done(function (data) {
            xmlObj["notice"] = data;
            d.resolve();
          })
          .fail(function () {
            d.resolve();
          });
        return d.promise();
      };

      // データを並び替えて整理する
      var convertEntryData = function () {
        var $news = $(xmlObj["news"])
          .find("item");
        var $notice = $(xmlObj["notice"])
          .find("item");

        // マージ
        $.merge($news, $notice);

        // ソート処理
        $news.sort(sortDayFunc);

        // 日本語に日付を変換
        $news.each(function(index, element) {
          var date = convertDateEnc($(element).find("pubDate").text());
          $(element).find("pubDate").text(date)
        });

        var newsElement = generateNewsElement($news);
        addListElement(newsElement);
      };

      $.when(getNewsData(), getNoticeData()).done(function () {
        convertEntryData();
      });
    }

    /** notification-and-newsを交差監視して範囲に入った時、1度だけ実行 */
    const newsReleaseObserver = new IntersectionObserver(
      (entry) => {
        const isIntersecting = !entry.every((item) => !item.isIntersecting);
        if (isIntersecting) {
          newsReleaseObserver.disconnect();
          newsReleaseList();
        }
      },
      { rootMargin: "200px" }
    );
    const topNewsRelease = document.querySelectorAll(".notification-and-news");

    topNewsRelease.forEach((newsRelease) => {
      newsReleaseObserver.observe(newsRelease);
    });
  })();

  /**
   * キャンペーン・プログラム の文字数省略
   */
  (function () {
    /**
     * 文字数省略
     * @param {string} str
     * @param {number} num
     */
    function stringOmit(str, num) {
      if (str.length >= num) {
        return str.substring(0, num - 1) + "…";
      }
      return str;
    }

    $(".for-new.top-campaign-program .campaign-title").each(function () {
      var str = $(this).text().trim();
      var text = stringOmit(str, 30);
      $(this).text(text).attr("title", str);
    });

    $(".for-new.top-campaign-program .campaign-description").each(function () {
      var str = $(this).text().trim();
      var text = stringOmit(str, 75);
      $(this).text(text).attr("title", str);
    });
  })();

  /**
   * 商品・サービス SP:アコーディオン
   */
  (function () {
    var btnParent = ".products-and-services__list-item";
    var btn = ".products-and-services__btn";
    var inside = ".products-and-services__inside";

    $(btn).attr("disabled", !isSP.matches);

    $(window).on("resize", function () {
      $(btn).attr("disabled", !isSP.matches);
    });

    $(btnParent).each(function () {
      var $btn = $(this).find(btn);

      $btn.on("click", function () {
        var $btnParent = $(this).closest(btnParent);
        var $btnParentInside = $btnParent.find(inside);

        $btnParent.toggleClass("open");
        $btnParentInside.slideToggle(200);
      });
    });
  })();

  /**
   * 商品・サービス PC:タブ
   */
  (function () {
    var tab = ".products-and-services__list-tab-item";
    var tabContent = ".products-and-services__list-item"

    $(tab).on("click", function () {
      $(".active").removeClass("active");
      $(this).addClass("active");

      var index = $(this).index();
      $(tabContent).eq(index).addClass("active");
    });
  })();
})();


