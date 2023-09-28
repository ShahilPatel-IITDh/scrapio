function openWindowWithMenu(loc){var winl=(screen.width-1024)/2;var wint=(screen.height-640)/2;myRemote=launch(loc,"WindowWithMenu","height=640,width=1024,channelmode=0,dependent=0,directories=0,fullscreen=0,location=0,menubar=1,resizable=1,scrollbars=1,status=0,toolbar=1,top="+wint+",left="+winl,"Help");window.myRemote.focus();}
function gotoLoc(loc){var winl=(screen.width-640)/2;var wint=(screen.height-750)/2;myRemote=launch(loc,"FreeSurveys","height=640,width=750,channelmode=0,dependent=0,directories=0,fullscreen=0,location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0,top="+wint+",left="+winl,"Help");window.myRemote.focus();}
function launch(newURL,newName,newFeatures,orgName){remote=open(newURL,newName,newFeatures);if(remote.opener==null)
remote.opener=window;remote.opener.name=orgName;return remote;}
function hideDiv(divID){obj=$('#'+divID);if(obj){obj.addClass("hidden");}}
function showDiv(divID){obj=$('#'+divID);if(obj){obj.removeClass("hidden");}}
function closeWindow(){if(isInternetExplorer()){window.opener='x';}
window.close();}
function updateLanguageForChainingForTakeSurvey2018(languageID){$('input:hidden[name=externalID]').val(languageID);}
function checkForInputPlaceholder(element){if($(element).val().length>0){$(element).addClass('used');}else{$(element).removeClass('used');}}
function checkAndAppendAttributes(brandingSurveyFooterClass,footerPartOneClass,surveyFooterClass){$('.'+brandingSurveyFooterClass+' .'+footerPartOneClass+' .'+surveyFooterClass).attr('style','display: block !important');$('.'+brandingSurveyFooterClass+' .'+footerPartOneClass+' .'+surveyFooterClass+' a').attr('style','text-decoration:none; display: inline !important');$('.'+brandingSurveyFooterClass+' .'+footerPartOneClass+' .'+surveyFooterClass+' a span').attr('style','display: inline !important');}
function checkAndAppendIfAnyTagIsRemoved(poweredByText,footerDiv,brandingSurveyFooterClass,footerPartOneClass,surveyFooterClass){if($('.'+brandingSurveyFooterClass+' .'+footerPartOneClass+' .'+surveyFooterClass).length<=0){$('.'+brandingSurveyFooterClass+' .'+footerPartOneClass).prepend(footerDiv);}
var surveyFooterPoweredByTextWithoutNewLine=$('.'+brandingSurveyFooterClass+' .'+footerPartOneClass+' .'+surveyFooterClass).html().replace(/\n/g," ").replace(/&amp;/g,'&');if(surveyFooterPoweredByTextWithoutNewLine.indexOf(poweredByText)<0){$('.'+brandingSurveyFooterClass+' .'+footerPartOneClass+' .'+surveyFooterClass).html(poweredByText);}}
function adjustTextBoxWidthWithText(){$.fn.textWidth=function(text){if(!$.fn.textWidth.fakeEl)$.fn.textWidth.fakeEl=$('<span>').hide().appendTo(document.body);$.fn.textWidth.fakeEl.text(text||this.val()||this.text()||this.attr('placeholder')).css
('font',"300 14px/20px 'Fira Sans', sans-serif");return $.fn.textWidth.fakeEl.width();};$('.multi-row-question, .email-address-question, .comments-suggestions-question, .form-type-question, '+
'.multiple-choice-question').find('.answer-options:not(.is-auto)').find('.form-input, .other-input').on('input textarea',function(){if($(this).parent().parent('.answer-options').find('.prefix-wrapper, .suffix-wrapper').length>0){}else{var inputWidth=$(this).textWidth();$(this).parent().width(inputWidth+24);if($(this).val()==""){$(this).parent().width("auto");}}});$('.multi-row-question, .email-address-question, .comments-suggestions-question, .form-type-question, '+
'.multiple-choice-question').find('.answer-options:not(.is-auto)').find('.form-input, .other-input').one('keydown',function(){if($(this).parent().parent('.answer-options').find('.prefix-wrapper, .suffix-wrapper').length>0){}else{var textBoxWidth=$(this).parent().outerWidth();$(this).parent().css({"min-width":textBoxWidth,"max-width":"100%"});$(this).parent().find('.control-label').css('overflow-wrap','break-word');}});}
function initPrintViewModeSettings(){if($('.answer-color-popup').length>0){$('.answer-color-popup').hide();$('#textHighlighterPopOver').hide();}
$('.survey-background-image').removeAttr('style');$('#ajaxContainerDiv').removeClass('has-bg-img');$('.is-review-mode .answer-container textarea').each(function(){$(this).height($(this).prop('scrollHeight'));});}
function initPrintReview(){$('.survey-background-image').removeClass('survey-background-image');}
function initTakeSurveyTooltip(){$('[data-qptooltip="tooltip"]').tooltipster({arrow:false,debug:false,delay:50,interactive:true,maxWidth:600,side:['bottom','top','right','left'],speed:300})}
function hideBackIfPreviousQuestionIsPlatformConnect(isPlatformConnectCompletionURL){if(isPlatformConnectCompletionURL){hideButton('.ok-wrapper .btn-prev');hideMainBackIfSingleQuestionOnPage();}}
function hideMainBackIfSingleQuestionOnPage(){if($(".survey-inside-wrapper .survey-question-wrapper").length==1){hideButton('.ok-wrapper .btn-prev:first-child');}}
function hideButton(selector){var backButton=document.querySelector(selector);backButton&&$(backButton).hide();}
function sortObject(obj){var arr=[];for(var prop in obj){if(obj.hasOwnProperty(prop)){arr.push({'key':prop,'value':obj[prop]});}}
arr.sort(function(a,b){return a.value-b.value;});return arr;}
function deleteSurveyCookie(domain){var surveyCookies=sortObject(getSurveyCookies());const SURVEY_COOKIE_LIMIT=20;if(surveyCookies.length>=SURVEY_COOKIE_LIMIT){for(var i=0;i<surveyCookies.length-SURVEY_COOKIE_LIMIT;i++){var name=surveyCookies[i]["key"];document.cookie=name+"=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=."+domain+";";}}}
function getSurveyCookies(){var cookies=document.cookie.split(";");var surveyCookieObject=new Object();for(var i=0;i<cookies.length;i++){if(getCookieName(cookies[i]).indexOf("Survey_")!==-1){var cookie=cookies[i].split("=");surveyCookieObject[cookie[0].trim()]=cookie[1].trim();}}
return surveyCookieObject;}
function getCookieName(cookie){var eqPos=cookie.indexOf("=");return eqPos>-1?cookie.substr(0,eqPos):cookie;}
var maxNoOfImagesPreloadAtOnce=5;function getStartIndex(){if(window.sessionStorage.getItem('imgStartIndex')){return window.sessionStorage.getItem('imgStartIndex');}else{return '0';}}
function preload(imageArray){var imageCount=0,start=null,imageLoadedCount=0;var images=new Array()
start=getStartIndex();if(start==imageArray.length){return;}
if(document.images){for(index=parseInt(start);index<imageArray.length;index++){if(imageCount>maxNoOfImagesPreloadAtOnce-1){window.sessionStorage.setItem('imgStartIndex',index);break;}
images[index]=new Image();images[index].src=imageArray[index];imageCount++;images[index].onload=function(){imageLoadedCount++;if(imageLoadedCount>maxNoOfImagesPreloadAtOnce-1){preload(imageArray);}}
images[index].onerror=function(e){imageLoadedCount++;if(imageLoadedCount>maxNoOfImagesPreloadAtOnce-1){preload(imageArray);}}
window.sessionStorage.setItem('imgStartIndex',index+1);}}}