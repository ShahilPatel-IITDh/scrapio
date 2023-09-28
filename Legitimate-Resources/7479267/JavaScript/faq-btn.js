// ログイン画面フロートバナー関連の処理
(function() {
    "use strict";

    // バナーを生成する処理
    function createBnr() {
        var navArea = document.querySelector('.nav-area > .str-inner');
        var floatBnrDiv = document.createElement('div');
        var floatBnrAnchor = document.createElement('a');
        var floatBnrImg = document.createElement('img');

        floatBnrDiv.classList.add('js-float-bnr');
        floatBnrDiv.classList.add('pc-none'); // PC表示とSP表示を切り分ける既存クラスを付与
        floatBnrAnchor.href = "https://j-faq.jcb.co.jp/?site_domain=default&link_id=myj_login_qa_popup";
        floatBnrAnchor.target = "_blank";
        floatBnrImg.src = "/apl/renew/login/images/faq-btn.png";
        floatBnrImg.alt = "よくあるご質問はこちら";

        floatBnrAnchor.appendChild(floatBnrImg);
        floatBnrDiv.appendChild(floatBnrAnchor);
        navArea.appendChild(floatBnrDiv);

        // スタイルタグの追加
        var styleTag = document.createElement('style');
        var pcStyles = '.js-float-bnr {position: absolute; top: 50%; right: 15px; z-index: 100; transform: translateY(-50%);} .js-float-bnr img {height: 33px; user-drag: none; -webkit-user-drag: none; -moz-user-select: none;}';
        var spStyles = '.js-float-bnr {position: absolute; top: 50%; right: 15px; z-index: 100; transform: translateY(-50%);} .js-float-bnr img {height: 33px; user-drag: none; -webkit-user-drag: none; -moz-user-select: none;} @media only screen and (max-width: 767px){.js-float-bnr > a:focus img, .js-float-bnr > a:hover img {opacity: 1} .js-float-bnr > a:focus, .js-float-bnr > a:hover {opacity: 1;}}';

        if (navigator.userAgent.match(/iPhone|iPad|Android.+Mobile/)) {
            styleTag.innerText = spStyles;
        } else {
            styleTag.innerText = pcStyles;
        }

        document.head.appendChild(styleTag);
    }

    // ロード時の処理
    window.addEventListener('load', function () {
        createBnr();
    })
})();
