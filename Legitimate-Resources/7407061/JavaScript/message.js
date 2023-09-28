$(document).ready(function(){var isloading=false;$(".messagePager a").live("click",function(){if(isloading){return;}
isloading=true;$.ajax({type:"POST",url:"/user/messages",data:{page:parseInt($(this).text())},success:function(data){isloading=false;$(".messages").html(data);},error:function(XMLHttpRequest,textStatus,errorThrown){isloading=false;alert(errorThrown);}});});$(".readmsg a,.messagesub a,.readmsg-tr").live("click",function(){isloading=true;var td=$(this);$.ajax({type:"POST",url:"/user/readmessages",data:{msgid:$(this).attr("data-id")},success:function(data){td.attr("class","ordertab-two-tdbg");if(td.find(".tright img").attr("src").indexOf("read")>-1){td.find(".tright img").attr("src","/images/unread.gif");}},error:function(XMLHttpRequest,textStatus,errorThrown){isloading=false;alert(errorThrown);}});});$(".msgcount,.messagesub").live("mouseout",function(){$(".messagesub").hide();}).live("mouseover",function(){if($(".messagesub li").length>0){$(".messagesub").show();}});var timeout=30000;var mcount=0;var msgSelector=".msgcount";if($(msgSelector).length==0){msgSelector=".msgtotal";}
if($(msgSelector).length>0){var check=function(){if(mcount>30){return;}
if(document.visibilityState=="visible"&&location.href.indexOf("news")==-1){mcount+=1;$.ajax({type:"POST",url:"/check/messagessync",data:{},timeout:1000*80,success:function(data){if(data.sound){var audios='<audio id="chatAudio">"'+
'<source src="'+data.path+'notify.mp3" type="audio/mpeg">'+
'<source src="'+data.path+'notify.wav" type="audio/wav">'+
'<source src="'+data.path+'notify.ogg" type="audio/ogg">'+
'</audio>';$(audios).appendTo('body');$('#chatAudio')[0].play();}
if(data.messages){if(!isNaN(data.total)){if($(".msgtotal").length==0&&parseInt(data.total)>0){$(".msgcount").append("<b><i class=\"msgtotal\">0</i></b>");}
if($(".toplogin .msga").length>0){var img=$(".toplogin .msga img");if(parseInt(data.total)>0){img.attr("src","/images/pnotice.gif");img.attr("style","margin-top: -12px;");}else{img.attr("src","/images/unread.gif");img.removeAttr("style");}}
$(".msgtotal").text(data.total).show();if(parseInt(data.total)>0){$(".msgtotal").removeClass("zero");}
else{$(".msgtotal").addClass("zero");}}
if(data.messages.length>0){$(".hasmsg").show();$(".notmsg").hide();}else{$(".hasmsg").hide();$(".notmsg").show();}
var ul=$(".messagesub ul");ul.html("");$.each(data.messages,function(){ul.append("<li><a href=\"javascript:void(0);\" data-id=\""+this.id+"\">"+this.title+"</a></li>");});}
setTimeout(check,timeout);},error:function(XMLHttpRequest,textStatus,errorThrown){setTimeout(check,timeout);}});}
else{setTimeout(check,timeout);}};setTimeout(check,1000);}
$(".orderPager a").live("click",function(){if(isloading){return;}
isloading=true;$.ajax({type:"POST",url:"/user/SearchOrder",data:{page:parseInt($(this).text())},success:function(data){isloading=false;$(".orderList").html(data);},error:function(XMLHttpRequest,textStatus,errorThrown){isloading=false;alert(errorThrown);}});});});function messageOpen(){$.cookie("MessageEmail","message",{expires:7,path:'/membercenter'});if(getCookie("useremail")==""){window.location.href="/user/messageslist";}
else{window.location.href="/membercenter";}}
function inMesse()
{$.ajax({type:"POST",url:"/user/AjaxReadMessages",async:false,success:function(data){},error:function(XMLHttpRequest,textStatus,errorThrown){}});}
function clearAllCookie(){var re=new RegExp(" ","g");$(".cragoods-name").each(function(){var cratename=$(this).text().replace(re,"-").toLowerCase();$.cookie(cratename+"-rocketprices","");$.cookie(cratename+"-openCardLogs","");});}