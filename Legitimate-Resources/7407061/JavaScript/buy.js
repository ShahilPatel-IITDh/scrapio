function HideCar(obj){if($(obj).attr("title")==""){$(".cart-main").find("ul").hide();$(".cart-main").find(".sum").hide();$(obj).attr("title","+");}
else{$(".cart-main").find("ul").show();$(".cart-main").find(".sum").show();$(obj).attr("title","");}}
function AddItem(obj){var res=$(obj).attr("tag").split("|");window.currentConfirmVaule="cancel";var rinput=$(obj).parent().find("input[type='text']:eq(0)");if(rinput.length==0){rinput=$(obj);}
var min=parseInt(rinput.attr("min"));var num=0;try{num=parseInt(rinput.val());}catch(e){}
if(min>num){rinput.val(min);alert("Sorry! buy this item at least "+min+" !");return;}
if(rinput.attr("old")==num){return;}
var old=rinput.attr("old");if(old!=null){num=num-parseInt(old);}
var servername=$(".gold-serverlist").val();if(servername==""){$(".gold-serverlist").focus();alert("Please select ServerName!");return;}
if(servername==null){servername=res[3];}
var data={gamesort:res[0],id:res[1],minbuynum:num,_servername:servername}
$("#tipDiv").show();window.currentConfirmVaule=null;$.post("/Shop/Additem",data,function(res){if(typeof loadingCart!="undefined"){loadingCart=true;}
$(".carlist").html(res);document.getElementById("tipDiv").style.display="none";});}
function AddGold(gsort,_servername,_goldnum,num,_temytype,id,isbuynow,token){var bn=isbuynow&&isbuynow==true;var data={gamesort:gsort,goldNum:_goldnum,minbuynum:num,servername:_servername,temptype:_temytype,id:id,isbuynow:bn,token:token}
$("#tipDiv").show();$.post("/Shop/AddGold",data,function(res){if(typeof loadingCart!="undefined"){loadingCart=true;}
$("#tipDiv").hide();if(bn){if(res.PayUrl!=null&&res.PayUrl.trim()!=""){if(res.PayUrl.indexOf("/")==0){location.href=res.PayUrl;}
else{location.href=location.href+res.PayUrl;}}}else{$(".carlist").html(res);}});}
function Getgoldlist(_gamesort,_servername){var data={gamesort:_gamesort,serverlist:_servername};$.post("/GoldList/GoldList",data,function(res){$(".allgoldlist").html(res);document.getElementById("tipDiv").style.display="none";});}
function PowerBuy(_id,_type,_temptype){if(_id==null||_id==""){return;}
var _servername=$(".gold-serverlist").val();if(_servername==""){window.currentConfirmVaule="cancel";alert("please select servername");return;}
var _gamesort=$("#hidgamesort").val();var data={gamesort:_gamesort,id:_id,servername:_servername,type:_type,temptype:_temptype}
$("#tipDiv").show();$.post("/Shop/AddPower",data,function(res){if(typeof loadingCart!="undefined"){loadingCart=true;}
$(".carlist").html(res);document.getElementById("tipDiv").style.display="none";});}
function powerlevelselect(){var typelevel=$("#typelevel").val();if($("#hourscount").length==0){return;}
$("#hourscount").html("");$("#pricecount").html("");var begin=$('#ddllvelel1').val();var end=$('#ddllvelel2').val();var time=0;var price=0;var index1=$('#ddllvelel1').get(0).selectedIndex;;var index2=$('#ddllvelel2').get(0).selectedIndex;;$(".leveltag").attr("tag","");if(index1>=index2){return;}
$(".leveltag").attr("tag",$("#ddllvelel1").find("option:selected").text()+"-"+$("#ddllvelel2").find("option:selected").text());$("#ddllvelel1 option").each(function(i,item){if(i>index1&&i<=index2){var temp=$(item).val().split('-');if(temp[0]!="0"){time+=parseFloat(temp[0]);}
if(temp[1]!="0"){price+=parseFloat(temp[1]);}}});$("#hourscount").html(time.toFixed(2));$("#pricecount").html(price.toFixed(2)+" "+getCookie("goldtype"));}
function PLSelectNew(i){var id="_"+i;if($("#hourscount"+id).length==0){return;}
$("#hourscount"+id).html("");$("#pricecount"+id).html("");var begin=$('#ddllvelel1'+id).val();var end=$('#ddllvelel2'+id).val();var time=0;var price=0;var index1=$('#ddllvelel1'+id).get(0).selectedIndex;;var index2=$('#ddllvelel2'+id).get(0).selectedIndex;;$(".leveltag"+id).attr("tag","");if(index1>=index2){return;}
$(".leveltag"+id).attr("tag",$("#ddllvelel1"+id).find("option:selected").text()+"-"+$("#ddllvelel2"+id).find("option:selected").text());$("#ddllvelel1"+id+" option").each(function(i,item){if(i>index1&&i<=index2){var temp=$(item).val().split('-');if(temp[0]!="0"){time+=parseFloat(temp[0]);}
if(temp[1]!="0"){price+=parseFloat(temp[1]);}}});$("#hourscount"+id).html(time.toFixed(2));$("#pricecount"+id).html(price.toFixed(2)+" "+getCookie("goldtype"));}
function PLBuy(obj,buynow,type){var o=$(obj);if(!o||o.length==0){return;}
var _servername=$(".gold-serverlist").val();if(_servername==""){alert("please select servername");return;}
var _id=o.attr("tag");var _gamesort=$("#hidgamesort").val();var _temptype=o.attr("data-type");var data={gamesort:_gamesort,id:_id,servername:_servername,type:type,temptype:_temptype,isbuynow:buynow}
showLoad("");$.post("/Shop/AddPower",data,function(res){if(typeof loadingCart!="undefined"){loadingCart=true;}
closeLoad();if(res.PayUrl!=null&&res.PayUrl.trim()!=""){if(res.PayUrl.indexOf("/")==0){location.href=res.PayUrl;}
else{location.href=location.href+res.PayUrl;}}else{$(".carlist").html(res);}});}
function skddlrownoshow(ski){for(var i=ski+1;i<6;i++){document.getElementById("sktd"+i).innerHTML=" &nbsp;";document.getElementById("skddl"+i).style.display="none";}
if(ski<3){document.getElementById("row1").style.display="none";document.getElementById("row2").style.display="none";}
if(ski>2&&ski<5){document.getElementById("row2").style.display="none";}}
function skddlrowshow(ski){if(ski>5){return;}
if(ski==1){document.getElementById("row1").style.display="none";document.getElementById("row2").style.dispaly="none";}
if(ski==2||ski==3){document.getElementById("row1").style.display="";document.getElementById("row2").style.dispaly="none";}
if(ski==4||ski==5){document.getElementById("row1").style.display="";document.getElementById("row2").style.display="";}
document.getElementById("sktd"+(ski+1)).innerHTML=document.getElementById("skddl"+ski).options.item(document.getElementById("skddl"+ski).selectedIndex).text;}
var gski;function skchange(ski){document.getElementById("row3").style.display="none";document.getElementById("pricetb1").value="";document.getElementById("timetb1").value="";document.getElementById("goldtb").value="0";document.getElementById("powerinfo").style.display="none";var ddl=document.getElementById("skddl"+ski);$(".skillid").attr("tag","");skddlrownoshow(ski);if(ddl.selectedIndex==0){return;}
if(ski<6){var skid=$("#skddl"+ski).val();gski=ski+1;var url="/power/skillname/"+skid;$.getJSON(url,function(data){closeLoad();$("#skddl"+gski).empty();$("#skddl"+gski).append("<option value=\"\">select</option>");$.each(data,function(i,item){$("#skddl"+gski).append("<option value=\""+item.id+"\">"+item.nodeName+"</option>");});if($("#skddl"+gski+" option").length>1){document.getElementById("skddl"+gski).style.display="";skddlrowshow(gski-1);}
else{var id1=0;var id2=0;var id3=0;var id4=0;var id5=0;itemame="";for(var j=1;j<gski;j++){if(j==1){id1=$("#skddl"+j).val();}
if(j==2){id2=$("#skddl"+j).val();}
if(j==3){id3=$("#skddl"+j).val();}
if(j==4){id4=$("#skddl"+j).val();}
if(j==5){id5=$("#skddl"+j).val();}
itemame+=document.getElementById("skddl"+j).options.item(document.getElementById("skddl"+j).selectedIndex).text+" ";}
var url="/power/skillnameprice?id1="+id1+"&id2="+id2+"&id3="+id3+"&id4="+id4+"&id5="+id5;$.get(url,function(result){$(".skillid").attr("tag",result.id);document.getElementById("pricetb1").value=result.sPrice;document.getElementById("timetb1").value=result.sTime;document.getElementById("goldtb").value=result.sGold;document.getElementById("powerinfo").innerHTML=result.notice;if(arr[2]!="0"){document.getElementById("row3").style.display="";}
else{document.getElementById("row3").style.display="none";}
if(arr[3]!=""){document.getElementById("powerinfo").style.display="";}
else{document.getElementById("powerinfo").style.display="none";}});}});}}
function ShowCar(result){window.loadingCart=true;if(result.errmsg){alert(result.errmsg);return;}
if(result.PayUrl!=null&&result.PayUrl.trim()!=""){if(result.PayUrl.indexOf("/")==0){location.href=result.PayUrl;}
else{location.href=location.href+result.PayUrl;}}else{var tcl=$("#top-cart-list");if(tcl.length>0){tcl.html(result);var total=tcl.find("span[data-total]").attr("data-total");if(total){if($("#carnumber").length<=0){$(".mhead01-cart").append("<i id=\"carnumber\" class=\"redball\">"+total+"</i>");}else{$("#carnumber").text(total);}}
return;}
if($(".redball_none").length==0){var number=result.match("J-shoping-num\">([^>]*)</i>");if(number!=null){$(".redball").text(number);}else{var total=0;$(result).find(".num,.num-sho").each(function(){total+=parseInt($(this).text());});var redball=$(".redball");if(redball.length==0){redball=$('<i class="redball">1</i>');$(".redball1:last").append(redball);}
redball.text(total);}}
var number=result.match("J-shoping-num\">([^>]*)</i>");var dataurl=result.match("data-url=\"([^>]*)\"");if(number!=null&&number.length>=2&&dataurl!=null&&dataurl.length>=2){if($("#carnumber").length<=0){if($("#buynba2kmt-redball").length>0){$("#buynba2kmt-redball").text(number[1]);}
$(".mhead01-cart").append("<i id=\"carnumber\" class=\"redball\">"+number[1]+"</i>");}
else{$("#carnumber").text(number[1]);}
if($("#goldkkcarnumber").length>0)
{$("#goldkkcarnumber").text(number[1]);$("#goldkkpayurl").attr("onclick","location.href='"+dataurl[1]+"'");}
$(".mhead01-cart").attr("onclick","location.href='"+dataurl[1]+"'");}
var cart=$("<div>"+result+"</div>");var h=cart.find(".cart_header"),f=cart.find(".cart_footer"),c=cart.find(".cart_clear");if(c.length>0){$(".carlist_header").find(".J-shoping-num").text("0");$(".carlist_footer").html("").hide();return;}
if(h.length>0&&f.length>0){$(".carlist_header").html("").append(h).show();$(".carlist_footer").html("").append(f).show();}else{$("#carlist").html(result).show();}}}
function Show(result){if(result.MustLogged){alert("Please sign in!");return;}
if(result.PayUrl!=null&&result.PayUrl.trim()!=""){if(result.PayUrl.indexOf("/")==0||result.PayUrl.indexOf('http')==0){location.href=result.PayUrl;}
else{location.href=location.href+result.PayUrl;}}else{ShowCar(result);}}
function ShowCar1907(result,e){if(e=="success"){var redball=$("#top-cart-list").parent().find(".redball");var l=result.trim().length;if(l==0){redball.remove();enabledScroll();$("#top-cart-list").html("").hide();}else{var t=$(result).find("span[data-total]").attr("data-total");if(redball.length==0){redball=$('<i id="carnumber" class="redball">'+t+'</i>');$(".mhead01-cart").append(redball);}else if(!t){ShowCar1907("",e);}
else{redball.text(t);}
$("#top-cart-list").html(result);}}}
function BindNum(result){var t1=result.value;if(t1==""){$(result).val("");return;}
for(var i=0;i<50;i++){t1=t1.replace(",","");}
var temp=parseInt(t1);if(isNaN(temp)){$(result).val("");return;}
if($(result).attr("maxnum")!=null){if(temp>parseInt($(result).attr("maxnum"))){$(result).val("");try{var t2=parseInt($(result).attr("maxnum"));if(t2%10==1){t2-=1;}
alert("Not exceed "+formatNum(t2))}catch(e){alert("Not exceed "+$(result).attr("maxnum"));}
return;}}
if($(result).attr("minnum")!=null){if(temp<parseInt($(result).attr("minnum"))){$(result).val("");alert("Not less than "+formatNum($(result).attr("minnum")));return;}}
if($(result).attr("tag")!=null&&$(result).attr("tag")!=""){if(temp>parseInt($(result).attr("tag"))){temp=parseInt($(result).attr("tag"));}}
$(result).val(formatNum(temp));}
function addselectHt(hts,x,y){for(var i=x;i<=y;i++){hts.append("<option value=\""+i+"\">"+i+"</option>");}}
function formatNum(num){try{if($(".horse").attr("oninput").indexOf("getnwadhorse")==-1){if(num>=50000){num=num-(num%50);}
if(num<1000){num=num-(num%50);}
else{num=num-(num%50);}}}catch(e){}
if(!/^(\+|-)?\d+(\.\d+)?$/.test(num)){return num;}
var re=new RegExp("(\\d)(\\d{3})(,|\\.|$)");num+="";while(re.test(num)){num=num.replace(re,"$1,$2$3")}
return num;}
function ChangeData2(id){var m=$(".li"+id+"fifaMonth").val();if(m.indexOf('-')>-1){m="-";}
var d=$(".li"+id+"fifaDay").val();if(d.indexOf('-')>-1){d="-";}
var y=$(".li"+id+"fifaYear").val();if(y.indexOf('-')>-1){y="-";}
$(".fifa-date"+id).html($("input[name='["+id+"].DateIssued']").val(d+"/"+m+"/"+y).val());}
var fifadata;var sendstr="";var sendstr2="";function getClickPlayernameAH2(playes,res){var t=$(res).parent().parent().parent().html('').prev().prev().val(playes);$(t).parent().parent().parent().find(".StartPrice").attr("min",$(res).attr("min")).attr("placeholder","Min:"+$(res).attr("min"));$(t).parent().parent().parent().find(".BuyNowPrice").attr("max",$(res).attr("max")).attr("placeholder","Max:"+$(res).attr("max"));$(t).parent().parent().parent().find(".BuyNowPrice").attr("min",$(res).attr("min"));if($(t).parents("tr").find(".ordersend").length>0){var max2=parseInt($(t).parents("tr").find(".ordersend").val())*1000;if(max2<parseInt($(res).attr("max"))){$(t).parent().parent().parent().find(".BuyNowPrice").attr("max",max2).attr("placeholder","Max:"+max2);}}}
function getClickPlayername(playes,res){var e=$(res).parent().parent().parent().html('').prev().prev().val(playes);Checkpalyername(e,res);}
var restxt="";function getnbaplayername(res){var str=($(res).val().toLowerCase().trim());var nbatxtlist;if(location.href.indexOf('nba')>-1||$(".ordertab").text().toLowerCase().indexOf("nba")>0){restxt=$(".nbaplayerlist").val();nbatxtlist=$(".nbaplayerlist").val().split('|');}
else if(location.href.indexOf('nfl')>-1||$(".ordertab").text().toLowerCase().indexOf("nfl")>0||location.href.indexOf('madden')>-1){restxt=$(".nflplayerlist").val();nbatxtlist=$(".nflplayerlist").val().split('|');}
else if(location.href.indexOf('nhl')>-1||$(".ordertab").text().toLowerCase().indexOf("nhl")>0){restxt=$(".nhlplayerlist").val();nbatxtlist=$(".nhlplayerlist").val().split('|');}
var count=0;var html="<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";for(var i=0;i<nbatxtlist.length;i++){var item=nbatxtlist[i].split(':')[1];var str2=(item.toLowerCase());if(str2.indexOf(str)==-1){continue;}
count++;var headshot="https://hutdb.net/assets/img/avatar.png";if(location.href.indexOf('nfl')>-1||$(".ordertab").text().toLowerCase().indexOf("nfl")>0||location.href.indexOf('madden')>-1){headshot="/images/serverplayer.png";if(nbatxtlist[i].split(':')[0]!="1"){headshot="http://media-touchdown.cursecdn.com/avatars/thumbnails/"+nbatxtlist[i].split(':')[0].split('-')[2]+"/250/250/avatar.jpeg";}}
if(location.href.indexOf('nhl')>-1||$(".ordertab").text().toLowerCase().indexOf("nhl")>0){headshot="https://hutdb.net/assets/img/headshots/17/"+nbatxtlist[i].split(':')[0]+".png";if(nbatxtlist[i].split(':')[0]=="0"){headshot="https://hutdb.net/assets/img/avatar.png";}}
html+="<tr class=\"goldlistplayer\" onclick=\" getClickPlayername($(this).attr('tag'),this);\" tag=\""+nbatxtlist[i].split(':')[1]+"\" pid=\""+headshot+"\" tag2=\""+nbatxtlist[i]+"\" ><td>";if(location.href.indexOf('nhl')>-1){html+="<img src=\"https://hutdb.net/assets/img/logos/"+(nbatxtlist[i].split(':')[4]+"/"+nbatxtlist[i].split(':')[2]).toLowerCase()+".png\" alt=\"\" width=\"26\">";}
html+=" </td><td>"+nbatxtlist[i].split(':')[1];if(location.href.indexOf('nhl')>-1||$(".ordertab").text().toLowerCase().indexOf("nhl")>0){html+=" ("+nbatxtlist[i].split(':')[3]+") ("+nbatxtlist[i].split(':')[4]+")";}
if(location.href.indexOf('nfl')>-1||$(".ordertab").text().toLowerCase().indexOf("nfl")>0||location.href.indexOf('madden')>-1){if(nbatxtlist[i].split(':')[0].split('-')[0]!="1"){html+=" <span style=\"float:right;padding-right: 10px;width:35px\">("+nbatxtlist[i].split(':')[0].split('-')[0]+")</span><span style=\"float:right;padding-right: 10px;width:35px\"> ("+nbatxtlist[i].split(':')[0].split('-')[1]+")</span>";html=html.replace("width=\"48\"","width=\"80\"");}}
html+="</td> </tr>";if(count>5){break;}}
if(count==0){html+="<tr><td>No results found</td></tr>";}
else{if(!$(res).is(":focus")){$(res).val("");}}
html+="</table>";$(res).next().next().html(html);$(res).next().next().width($(res).width()+6);$(res).next().next().hide();$(res).next().next().slideDown(100);}
function get5playername(res){if($(res).val().length<2){return;}
if(fifajson!=null){getlocalfifaplayer(res);return;}
var url="/checkout/FIFAPlayer?_playername="+encodeURI($(res).val())
$(res).next().next().html("Loading...");sendstr=url;setTimeout(function(){if(sendstr2==sendstr){return;}
sendstr2=sendstr;$.getJSON(sendstr,function(data){fifadata=data;var html="<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";$.each(data,function(i,item){html+="<tr class=\"goldlistplayer\" onclick=\" getClickPlayername($(this).attr('tag'),this);\" tag=\""+item.playername+"\" pid=\""+item.headshot+"\" ><td>";html+=" </td><td>"+item.playername+"";html+="</td> </tr>";});if(data.length==0){html+="<tr><td>No results found</td></tr>";}
else{if(!$(res).is(":focus")){$(res).val("");}}
html+="</table>";$(res).next().next().html(html);$(res).next().next().width($(res).width()+6);$(res).next().next().hide();$(res).next().next().slideDown(100);});},500);}
function string_to_slug(str){str=str.replace(/^\s+|\s+$/g,'');str=str.toLowerCase();var from="àáäâèéëêìíïîòóöôùúüûñçćšžø";var to="aaaaeeeeiiiioooouuuunccszo";for(var i=0,l=from.length;i<l;i++){str=str.replace(new RegExp(from.charAt(i),'g'),to.charAt(i));}
str=str.replace(/[^a-z0-9 -]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');return str;}
function getlocalfifaplayer(res){var str=string_to_slug($(res).val().toLowerCase().trim());var count=0;var html="<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">";for(var i=0;i<fifajson.length;i++){var item=fifajson[i];var str2=string_to_slug(item.c.toLowerCase());if(str2.indexOf(str)==-1){continue;}
count++;var id="";if(item.i!=null){var headshot="https://www.easports.com/fifa/ultimate-team/web-app/content/20C1B296-B15C-4F72-AF0F-882F187EC2C9/2020/fut/items/images/mobile/portraits/"+item.i+".png";if(parseInt(item.i)>10000000){headshot="https://www.easports.com/fifa/ultimate-team/web-app/content/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/playerheads/mobile/single/p"+item.i+".png";}
html+="<tr class=\"goldlistplayer\" onclick=\" getClickPlayername($(this).attr('tag'),this);\" tag=\""+item.c+"\" pid=\""+headshot+"\" ><td>";html+=" </td><td>"+item.c+"";html+="</td> </tr>";if(count>5){break;}}
else{var headshot="https://www.easports.com/fifa/ultimate-team/web-app/content/20C1B296-B15C-4F72-AF0F-882F187EC2C9/2020/fut/items/images/mobile/portraits/"+item.id+".png";if(parseInt(item.i)>10000000){headshot="https://www.easports.com/fifa/ultimate-team/web-app/content/B1BA185F-AD7C-4128-8A64-746DE4EC5A82/2018/fut/playerheads/mobile/single/p"+item.id+".png";}
html+="<tr class=\"goldlistplayer\" onclick=\" getClickPlayernameAH2($(this).attr('tag'),this);\" tag=\""+item.c+"\" max=\""+item.r+"\" min=\""+item.n+"\"  pid=\""+headshot+"\" ><td>";html+=" </td><td>"+item.c+"("+item.f+")";html+="</td> </tr>";if(count>5){break;}}}
if(count==0){html+="<tr><td>No results found</td></tr>";}
else{if(!$(res).is(":focus")){$(res).val("");}}
html+="</table>";$(res).next().next().html(html);$(res).next().next().width($(res).width()+6);$(res).next().next().hide();$(res).next().next().slideDown(100);}
function Checknbapalyername(res,clickem){var isfafa=false;var playes=$(res).val();if(clickem!=null){isfafa=true;if(location.href.indexOf('nhl')>-1||$(".ordertab").text().toLowerCase().indexOf("nhl")>0){var sptxt=$(clickem).attr("tag2").split(':');$(res).parent().parent().parent().find(".NHLpos").val(sptxt[3]);$(res).parent().parent().parent().find(".NHLLeague").val(sptxt[4]);}
if(location.href.indexOf('nfl')>-1||$(".ordertab").text().toLowerCase().indexOf("nfl")>0||location.href.indexOf('madden')>-1){var sptxt=$(clickem).attr("tag2").split(':')[0].split('-');$(res).parent().parent().parent().find(".NFLovr").val(sptxt[0]);$(res).parent().parent().parent().find(".NFLpos").val(sptxt[1]);}
return;}
try{$.each(restxt.split('|'),function(i,item){if(item.split(':')[1].toLowerCase()==playes.toLowerCase()){isfafa=true;}});}catch(e){}
if(!isfafa){$(res).val("");}}
function Checkpalyername(res,clickem){if(clickem!=null){if($(res).attr("djcs")==null){$(res).attr("djcs","1");}
else{$(res).attr("djcs",parseInt($(res).attr("djcs"))+1);}}
if(location.href.indexOf('nba')>-1||location.href.indexOf('nfl')>-1||location.href.indexOf('madden')>-1||location.href.indexOf('nhl')>-1||$(".ordertab").text().toLowerCase().indexOf("nhl")>0||$(".ordertab").text().toLowerCase().indexOf("nfl")>0||$(".ordertab").text().toLowerCase().indexOf("madden")>0||$(".ordertab").text().toLowerCase().indexOf("nba")>0){Checknbapalyername(res,clickem)
return;}
var playes=$(res).val();var isfafa=false;if((fifajson!=null&&clickem!=null)){isfafa=true;return;}
try{$.each(fifajson,function(i,item){if(item.c==playes||htmldecode(item.c)==playes){isfafa=true;}});}catch(e){}
if(!isfafa&&fifajson!=null){$(res).val("");}}
var fifajson;$(document).ready(function(){});var isloadjs=1;