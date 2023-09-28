// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 　　　記事周りの調整
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//記事下の関連記事を#widget-related-postの下にインサートする
// (function ($) {
//   $(".p-related-posts.c-entry-aside").insertAfter("#widget-related-post");
// })(jQuery);

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 　　　フォームの設定
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// Formのセレクトボックス初期値の色変更
(function ($) {
  const Target = $(".is-empty");
  $(Target).on("change", function () {
    if ($(Target).val() !== "") {
      $(this).removeClass("is-empty");
    } else {
      $(this).addClass("is-empty");
    }
  });
})(jQuery);

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 　　　メニューの設定
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

// サブメニューの位置を調整する
// (function ($) {
//   $("#menu-header-sub").insertBefore("#menu-header-main");
// })(jQuery);

//メガメニューの設定
(function ($) {
  //メガメニューを最適な位置にインサートする
  $("#megamenu-howto").insertAfter("#page-start");
  $(".menu-item-30.c-navbar__item").on("click", function () {
    //グロナビの「初めてのかたへ」をクリックした時
    $("#megamenu-howto").toggleClass("active"); //初めてのかたへのメガメニューに.activeをつけるor外す
    $(".menu-item-30.c-navbar__item").toggleClass("active"); //グロナビの「初めてのかたへ」に.activeをつけるor外す
  });
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".menu-item-30,.smb-section__inner").length) {
      //グロナビの「初めてのかたへ」か、初めてのかたへのメガメニュー以外をクリックした時
      $("#megamenu-howto").removeClass("active"); //初めてのかたへのメガメニューから.activeを取る
      $(".menu-item-30.c-navbar__item").removeClass("active"); //グロナビの「初めてのかたへ」から.activeを取る
    }
  });
})(jQuery);

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 　　　記事スライダー
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//使い方／パラメータ関連は　https://zero-plus.io/media/javascript-swiper/ とか　https://gorigoricode.com/swiper-option/　とか見てね
// const swiper = new Swiper(".swiper", {
//   pagination: {
//     el: ".swiper-pagination",
//   },
//   effect: "coverflow",
//   grabCursor: true,
//   centeredSlides: true,
//   slidesPerView: 1.1,
//   coverflowEffect: {
//     rotate: 0,
//     stretch: 0,
//     depth: 80,
//     modifier: 2,
//     slideShadows: false,
//   },
//   loop: true,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: true,
//     reverseDirection: false,
//   },
//   autoHeight: true,
//   breakpoints: {
//     1024: {
//       slidesPerView: 1.5,
//       coverflowEffect: {
//         rotate: 0,
//         stretch: -40,
//         depth: 60,
//         modifier: 2,
//         slideShadows: false,
//       },
//     },
//   },
// });
