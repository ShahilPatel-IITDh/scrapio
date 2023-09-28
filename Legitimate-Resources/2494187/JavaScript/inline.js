
function gtCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
    window.addEventListener('load', () => {
        var cook = gtCookie("accept");
        if(!cook){
         $('body').append("<div class='sc-eyulwr-0 gEBiRP'><div><p>Esse site utiliza <strong>cookies</strong>, que possibilitam uma melhor experiência de navegação. <br> Ao continuar, você concorda com o uso de <strong>cookies</strong>.</p></div><div class='sc-eyulwr-1 dliQEE'><button kind='primary' class='sc-1w7c0sd-0 cQFGrI sc-eyulwr-2 gRCWtB'>Concordo, continuar</button></div></div>");
        };
        $('.gRCWtB').on( "click", function() {
            $('.gEBiRP').remove();
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 9999*999999;
            now.setTime(expireTime);
            document.cookie = 'accept=yes;expires='+now.toUTCString()+';path=/';
        });
    });
