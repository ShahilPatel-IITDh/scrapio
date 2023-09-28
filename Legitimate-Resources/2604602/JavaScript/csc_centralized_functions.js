//Store referrer and URL parameters in cookies... 
var pageId = getPageId();
  
// incorporate.com cookies
if(getPageDomain().indexOf('incorporate') > -1){
    if ((getReferrer()) && (!getCookie(pageId + "_FV_referrer"))) {createIncCookie(pageId + '_FV_referrer', getReferrer(), 180);}
    if ((getParameterValues("utm_campaign")) && (!getCookie(pageId + "_FV_utm_campaign"))) {createIncCookie(pageId + '_FV_utm_campaign', getParameterValues("utm_campaign"), 180);}
    if ((getParameterValues("utm_content")) && (!getCookie(pageId + "_FV_utm_content"))) {createIncCookie(pageId + '_FV_utm_content', getParameterValues("utm_content"), 180);}
    if ((getParameterValues("utm_medium")) && (!getCookie(pageId + "_FV_utm_medium"))) {createIncCookie(pageId + '_FV_utm_medium', getParameterValues("utm_medium"), 180);}
    if ((getParameterValues("utm_source")) && (!getCookie(pageId + "_FV_utm_source"))) {createIncCookie(pageId + '_FV_utm_source', getParameterValues("utm_source"), 180);}
    if ((getParameterValues("utm_term")) && (!getCookie(pageId + "_FV_utm_term"))) {createIncCookie(pageId + '_FV_utm_term', getParameterValues("utm_term"), 180);}
    if ((getParameterValues("iq_id")) && (!getCookie(pageId + "_FV_iq_id"))) {createIncCookie(pageId + '_FV_iq_id', getParameterValues("iq_id"), 180);}
    if ((getParameterValues("promo")) && (!getCookie(pageId + "_FV_promo"))) {createIncCookie(pageId + '_FV_promo', getParameterValues("promo"), 180);}
    if ((getParameterValues("affiliate")) && (!getCookie(pageId + "_FV_affiliate"))) {createIncCookie(pageId + '_FV_affiliate', getParameterValues("affiliate"), 180);}
    if ((getParameterValues("prodgroup")) && (!getCookie(pageId + "_FV_prodgroup"))) {createIncCookie(pageId + '_FV_prodgroup', getParameterValues("prodgroup"), 180);}
    if ((getParameterValues("ranSiteID")) && (!getCookie(pageId + "_FV_ranSiteID"))) {createIncCookie(pageId + '_FV_ranSiteID', getParameterValues("ranSiteID"), 180);}
    if ((getParameterValues("aic")) && (!getCookie(pageId + "_FV_aic"))) {createIncCookie(pageId + '_FV_aic', getParameterValues("aic"), 180);}
    if ((getParameterValues("pers")) && (!getCookie(pageId + "_FV_pers"))) {createIncCookie(pageId + '_FV_pers', getParameterValues("pers"), 180);}
    if ((getParameterValues("gclid")) && (!getCookie(pageId + "_FV_gclid"))) {createIncCookie(pageId + '_FV_gclid', getParameterValues("gclid"), 180);}
    if (!getCookie("LSKey-c$marketing_ac")) {createIncCookie("LSKey-c$marketing_ac", true, 180);}

    // Swiftype
      (function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
      (w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
      e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
      })(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');
      
      _st('install','wkJyspzxw5BSFCF8Yz1R','2.0.0');
}
else{
    if ((getReferrer()) && (!getCookie(pageId + "_FV_referrer"))) {createCookie(pageId + '_FV_referrer', getReferrer(), 180);}
    if ((getParameterValues("utm_campaign")) && (!getCookie(pageId + "_FV_utm_campaign"))) {createCookie(pageId + '_FV_utm_campaign', getParameterValues("utm_campaign"), 180);}
    if ((getParameterValues("utm_content")) && (!getCookie(pageId + "_FV_utm_content"))) {createCookie(pageId + '_FV_utm_content', getParameterValues("utm_content"), 180);}
    if ((getParameterValues("utm_medium")) && (!getCookie(pageId + "_FV_utm_medium"))) {createCookie(pageId + '_FV_utm_medium', getParameterValues("utm_medium"), 180);}
    if ((getParameterValues("utm_source")) && (!getCookie(pageId + "_FV_utm_source"))) {createCookie(pageId + '_FV_utm_source', getParameterValues("utm_source"), 180);}
    if ((getParameterValues("utm_term")) && (!getCookie(pageId + "_FV_utm_term"))) {createCookie(pageId + '_FV_utm_term', getParameterValues("utm_term"), 180);}
    if ((getParameterValues("iq_id")) && (!getCookie(pageId + "_FV_iq_id"))) {createCookie(pageId + '_FV_iq_id', getParameterValues("iq_id"), 180);}
    // if(window.location.href.indexOf("incorporate.com") > -1){ incorporateTrackingScripts();}

}
  
