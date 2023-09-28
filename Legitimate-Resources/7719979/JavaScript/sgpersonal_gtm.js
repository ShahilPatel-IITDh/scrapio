function sgpersonalGtmcode() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.text  = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-LXGM')";
  //var IframeSrc = document.createElement('noscript');
  //$(IframeSrc).appendChild("<iframe src='http://www.googletagmanager.com/ns.html?id=GTM-LXGM' height='0' width='0' style='display:none;visibility:hidden'></iframe>");

  if (document.body.firstChild){
    document.body.insertBefore(script, document.body.firstChild);
    //document.body.insertBefore(IframeSrc, document.body.firstChild);
  } else {
    document.body.appendChild(script);
    //document.body.appendChild(IframeSrc);
  }
}
$(document).ready(function() {
	sgpersonalGtmcode();
});