setREVStartSize({c: 'rev_slider_6_1',rl:[1240,1024,768,480],el:[],gw:[1170],gh:[720],type:'standard',justify:'',layout:'fullwidth',mh:"0"});
var revapi6,
tpj;
function revinit_revslider61() {
jQuery(function() {
tpj = jQuery;
revapi6 = tpj("#rev_slider_6_1");
if(revapi6==undefined || revapi6.revolution == undefined){
  revslider_showDoubleJqueryError("rev_slider_6_1");
}else{
  revapi6.revolution({
    visibilityLevels:"1240,1024,768,480",
    gridwidth:1170,
    gridheight:720,
    spinner:"spinner0",
    perspectiveType:"local",
    responsiveLevels:"1240,1024,768,480",
    progressBar:{disableProgressBar:true},
    navigation: {
      mouseScrollNavigation:false,
      onHoverStop:false,
      arrows: {
        enable:true,
        style:"custom",
        hide_onmobile:true,
        hide_under:767,
        left: {
          h_offset:50
        },
        right: {
          h_offset:50
        }
      }
    },
    fallbacks: {
      allowHTML5AutoPlayOnAndroid:true
    },
  });
}

});
} // End of RevInitScript
var once_revslider61 = false;
if (document.readyState === "loading") {document.addEventListener('readystatechange',function() { if((document.readyState === "interactive" || document.readyState === "complete") && !once_revslider61 ) { once_revslider61 = true; revinit_revslider61();}});} else {once_revslider61 = true; revinit_revslider61();}

var htmlDivCss = unescape("%23rev_slider_6_1_wrapper%20.custom.tparrows%20%7B%0A%09cursor%3Apointer%3B%0A%09background%3A%23000%3B%0A%09background%3Argba%280%2C0%2C0%2C0.5%29%3B%0A%09width%3A40px%3B%0A%09height%3A40px%3B%0A%09position%3Aabsolute%3B%0A%09display%3Ablock%3B%0A%09z-index%3A1000%3B%0A%7D%0A%23rev_slider_6_1_wrapper%20.custom.tparrows%3Ahover%20%7B%0A%09background%3A%23000%3B%0A%7D%0A%23rev_slider_6_1_wrapper%20.custom.tparrows%3Abefore%20%7B%0A%09font-family%3A%20%27revicons%27%3B%0A%09font-size%3A15px%3B%0A%09color%3A%23fff%3B%0A%09display%3Ablock%3B%0A%09line-height%3A%2040px%3B%0A%09text-align%3A%20center%3B%0A%7D%0A%23rev_slider_6_1_wrapper%20.custom.tparrows.tp-leftarrow%3Abefore%20%7B%0A%09content%3A%20%27%5Ce824%27%3B%0A%7D%0A%23rev_slider_6_1_wrapper%20.custom.tparrows.tp-rightarrow%3Abefore%20%7B%0A%09content%3A%20%27%5Ce825%27%3B%0A%7D%0A%0A%0A");
var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
if(htmlDiv) {
htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
}else{
var htmlDiv = document.createElement('div');
htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
}

var htmlDivCss = unescape("%0A%0A%0A");
var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
if(htmlDiv) {
htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
}else{
var htmlDiv = document.createElement('div');
htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
}