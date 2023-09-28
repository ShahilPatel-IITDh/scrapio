jQuery(document).ready(function($){const notice=$('.notice.jquery-migrate-deprecation-notice');const warnings=jQuery.migrateWarnings||[];const adminbar=$('#wp-admin-bar-enable-jquery-migrate-helper');const countWrapper=$('.count-wrapper',adminbar);var previousDeprecations=[];function getSlugFromTrace(trace){let traceLines=trace.split('\n'),match=null;traceLines.forEach(function(line){if(!line){return;}
line=line.split('?')[0];if(!match&&line.indexOf('/'+JQMH.plugin_slug+'/js')===-1&&(line.indexOf('/plugins/')>-1||line.indexOf('/themes/')>-1||line.indexOf('/wp-admin/js/')>-1)){match=line.replace(/.*?http/,'http');}});return match;}
function setAdminBarCount(count){if(!adminbar.length){return;}
if(!JQMH.capture_deprecations){return;}
if(!countWrapper.is(':visible')){countWrapper.show();countWrapperVisibility();}
$('.count',adminbar).text(count);}
function countWrapperVisibility(){if(countWrapper.is(':visible')){adminbar.css('background-color','#be4400').css('color','#eeeeee');}else{adminbar.css('background-color','').css('color','');}}
function appendNoticeDisplay(message){const list=notice.find('.jquery-migrate-deprecation-list');if(!notice.length){return;}
if(JQMH.single_instance_log){if(previousDeprecations.indexOf(message)>-1){return;}
previousDeprecations.push(message);}
if(!notice.is(':visible')){notice.show();}
list.append($('<li></li>').text(message));}
function reportDeprecation(message){if(JQMH.backend&&notice.length){return;}
if(!JQMH.capture_deprecations){return;}
let data={action:'jquery-migrate-log-notice',notice:message,nonce:JQMH.report_nonce,backend:JQMH.backend,url:window.location.href,};$.post({url:JQMH.ajaxurl,data});}
if(warnings.length){warnings.forEach(function(entry){const trace=getSlugFromTrace(entry.trace?entry.trace:"");let message=trace?trace+': ':'';if(''===message){return;}
message+=entry.warning;appendNoticeDisplay(message);reportDeprecation(message);});setAdminBarCount(warnings.length);}
$(document).on('click','.jquery-migrate-dashboard-notice .notice-dismiss',function(){const $notice=$(this).closest('.notice');const notice_id=$notice.data('notice-id');$.post({url:window.ajaxurl,data:{action:'jquery-migrate-dismiss-notice','notice':notice_id,'dismiss-notice-nonce':$('#'+notice_id+'-nonce').val(),},});});$(document).on('click','.jquery-migrate-previous-deprecations .notice-dismiss',function(){countWrapper.hide();countWrapperVisibility();});countWrapperVisibility();});