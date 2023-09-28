function changeLanguage(language) {
    if (!language) { return; }
    var date = new Date();
    var expireDays = 365;
    date.setTime(date.getTime() + expireDays * 24 * 3600 * 1000);
    document.cookie = "pushbt.org_Lankey=" + language + ";path=/; expires=" + date.toGMTString();
    window.location.reload();
};

imgs = document.getElementsByTagName("img");
imgsnum = imgs.length;
for (imgi = 0; imgi < imgsnum; imgi++) {
    if ((typeof (imgs[imgi].src) == 'undefined' || imgs[imgi].src == '') && imgs[imgi].getAttribute('thissrc') != null)
        imgs[imgi].src = imgs[imgi].getAttribute('thissrc');
};

//baidu tongji
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?1a7a5d4881446c073b7350c901d9d4ce";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//baidu post
(function ()
{
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https')
    {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else
    {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();

