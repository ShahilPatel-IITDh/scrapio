//<![CDATA[
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create','UA-15675901-1','auto');ga('send','pageview');
jQuery(document).ready(function(){
jQuery("a[href$='.pdf'],a[href$='.doc'],a[href$='.xls'],a[href$='.mp3'],a[href$='.avi'],a[href$='.wmv']").click(function(){
try{ga('send','Downloads','click',jQuery(this).attr('href'));}catch(err){}});});
//]]>