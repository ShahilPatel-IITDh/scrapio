$(document).ready(function(){if(!("autofocus"in document.createElement("input"))){$("#hostip").focus();}
$(".action_btn").attr("disabled",false).click(function(){send_check_query(this);});$("table.result tbody tr:even").addClass("zebra");$(".ad_z").click(function(){ad_close(this)});$(".arda_z").click(function(){ad_close(this)});$('.tooltip').tooltipster({theme:'tooltipster-light',animation:'fade',delay:100,interactive:true,trigger:'click'});});var slaves_global=[];function css_esc(identifier){return identifier.replace(/[!"#$%&'()*+,./:;<=>?@\[\\\]^`{|}~)]/g,'\\$&')}
function get_check_results(request,slaves,check_displayer,tries){if(slaves.length==0){return;}
if(typeof(tries)=="undefined"){setTimeout(function(){get_check_results(request,slaves,check_displayer,0);},1000);return;}
if(tries<20){$.ajax({url:"/check_result/"+request,data:{slaves:slaves},type:"POST",success:function(data,textStatus){for(slave in data){for(var i=0;i<slaves.length;i++){if(slaves[i]==slave){slaves.splice(i,1);break;}}
var r=data[slave];slaves_global[slave]=r[0];check_displayer.display(slave,r);}
if(slaves.length>0){setTimeout(function(){get_check_results(request,slaves,check_displayer,tries+1);},3000);}},error:function(xhr,ajaxOptions,thrownError){console.log('Error fetching check_result');}})}else{for(slave in slaves){check_displayer.display(slaves[slave],null);}}}
function CheckResultDisplayer(container){this.container=container;}
CheckResultDisplayer.prototype.displayMessage=function(slave,type,message,row){var slave_id_selector=css_esc(slave);var id="#result_"+slave_id_selector;if(typeof row!=="undefined"){id="#result_"+row+"_"+slave_id_selector;}
var el=$("<div>").addClass(type);if(typeof message==="object"){el.append(message);}else{el.text(message)}
this.container.find(id).empty().append(el);}
CheckResultDisplayer.prototype.displayInternalError=function(slave,message){this.container.find("#result_"+css_esc(slave)).parent().addClass("result_internal_error");this.displayMessage(slave,"error",message);}
CheckResultDisplayer.prototype.display=function(slave,result){if(result==null||(result!=null&&typeof(result)=="object"&&result[0]==null))
{this.displayInternalError(slave,_("Check server is down"));return true;}
return false;}
CheckResultDisplayer.prototype.generateHostLinkHTML=function(host){return "<a target=\"_blank\" href=\"/ip-info?host="+host+"\">"+host+"</a>";}
function DNSCheckResultDisplayer(container){this.container=container;}
DNSCheckResultDisplayer.prototype=new CheckResultDisplayer();DNSCheckResultDisplayer.prototype.display=function(slave,result){if(CheckResultDisplayer.prototype.display.call(this,slave,result))
return true;if(result instanceof Array){var values=new Array();for(var record in result[0]){if(record!='TTL')
values=values.concat(result[0][record]);}
if(values.length==0){this.displayMessage(slave,"error",_("Not found"));}else{var ttl=result[0]['TTL'];if(ttl){this.displayMessage(slave,null,seconds_to_duration(ttl),"ttl");}
this.displayMessage(slave,null,values.join(", "));}
return true;}
return false;}
function HTTPCheckResultDisplayer(container){this.container=container;}
HTTPCheckResultDisplayer.prototype=new CheckResultDisplayer();HTTPCheckResultDisplayer.prototype.display=function(slave,result){if(CheckResultDisplayer.prototype.display.call(this,slave,result))
return true;if(result instanceof Array){result=result[0];if(result[0]){this.displayMessage(slave,null,"OK");var code=result[3];if(result[2]){code+=" ("+result[2]+")";}
this.displayMessage(slave,null,code,"code");this.displayMessage(slave,null,result[1].toFixed(3)+" "+_("s"),"time");this.displayMessage(slave,null,result[4],"ip");}else{var result_msg=result[2];var server_error_code=result[3];if(server_error_code!=null){result_msg="Server error";if(result[2]){server_error_code+=" ("+result[2]+")";}
this.displayMessage(slave,"error",server_error_code,"code");this.displayMessage(slave,null,result[1].toFixed(3)+" "+_("s"),"time");}
this.displayMessage(slave,"error",_(result_msg));this.displayMessage(slave,null,result[4],"ip");}
return true;}
return false;}
function TCPCheckResultDisplayer(container){this.container=container;}
TCPCheckResultDisplayer.prototype=new CheckResultDisplayer();TCPCheckResultDisplayer.prototype.display=function(slave,result){if(CheckResultDisplayer.prototype.display.call(this,slave,result))
return true;if(typeof(result)=="object"){if(result[0]&&!result[0].error){this.displayMessage(slave,null,_("Connected"));this.displayMessage(slave,null,result[0].time.toFixed(3)+" "+_("s"),"time");}else{this.displayMessage(slave,"error",_(result[0].error));}
this.displayMessage(slave,null,result[0].address,"ip");return true;}
return false;}
function UDPCheckResultDisplayer(container){this.container=container;}
UDPCheckResultDisplayer.prototype=new TCPCheckResultDisplayer();UDPCheckResultDisplayer.prototype.display=function(slave,result){if(CheckResultDisplayer.prototype.display.call(this,slave,result))
return true;if(typeof(result)=="object"){if(result[0]&&!result[0].error){this.displayMessage(slave,null,_("Open or filtered"));}else{this.displayMessage(slave,"error",_(result[0].error));}
this.displayMessage(slave,null,result[0].address,"ip");return true;}
return false;}
function PingCheckResultDisplayer(container,host){this.container=container;this.host=host;this.tracerouteLabel=_('Traceroute');}
PingCheckResultDisplayer.prototype=new CheckResultDisplayer();PingCheckResultDisplayer.prototype.display=function(slave,result){if(CheckResultDisplayer.prototype.display.call(this,slave,result))
return true;if(typeof(result)=="object"){if(result[0][0]==null){this.displayMessage(slave,"error",_("Unknown host"));return true;};var total=0;var received=0;var time_total=0;var time_min=0;var time_max=0;var first=1;for(var i in result[0]){total++;var status=result[0][i][0];var time=result[0][i][1];if(status=="ERROR"){this.displayInternalError(slave,_("Server error"));return true;}else if(status=="OK"){received++;time_total+=time;if(first){first=0;time_max=time;time_min=time;}else{if(time>time_max){time_max=time;};if(time<time_min){time_min=time;}};}}
var status_result=received+" / "+total;var msg_type=null;if(received<total)
msg_type="error";this.displayMessage(slave,msg_type,status_result);if(received>0){time_min*=1000;time_max*=1000;var time_avg=1000*(time_total/received);this.displayMessage(slave,null,[time_min.toFixed(1),time_avg.toFixed(1),time_max.toFixed(1)].join(" / ")+" "+_("ms"),"rtt");}else{this.displayMessage(slave,null,$(this.generateTracerouteLink(slave)),"rtt");}
var ip=result[0][0][2];this.displayMessage(slave,null,ip,"ip");return true;}
return false;}
PingCheckResultDisplayer.prototype.generateTracerouteLink=function(node){return '<a href="/check-traceroute?host='+encodeURIComponent(this.host)
+'&node='+encodeURIComponent(node)
+'" target="_blank">'+this.tracerouteLabel+'</a>';}
function TracerouteCheckResultDisplayer(container){this.container=container;}
TracerouteCheckResultDisplayer.prototype=new CheckResultDisplayer();TracerouteCheckResultDisplayer.prototype.displayInternalError=function(slave,message){this.displayMessage(slave,"error",message);}
TracerouteCheckResultDisplayer.prototype.display=function(slave,result){if(CheckResultDisplayer.prototype.display.call(this,slave,result))
return true;if(typeof(result)=="object"){if(result[0][0]==null){this.displayMessage(slave,"error",_("Unknown host"));return true;};}
var slave_id_selector=css_esc(slave);var id="#result_"+slave_id_selector;var container=this.container.find(id);container.empty();var result_html="";for(var i=0;i<result[0].length;i++){var hop_result=result[0][i];var number_cell="<td class=\"traceroute_hop_number\" rowspan=\""+hop_result.length+"\">"+(i+1)+"</td>";var server_results=[];for(var j=0;j<hop_result.length;j++){server_results.push(this.formatServerResult(hop_result[j]));}
result_html+="<tr>"+number_cell+server_results.join("</tr><tr>")+"</tr>";if(this.isEmptyReply(hop_result)&&(i+1)<result[0].length&&this.isEmptyReply(result[0][i+1])&&this.isEmptyReply(result[0][i+2]))
{var k=i+2;while(k<result[0].length-1&&this.isEmptyReply(result[0][k+1])){k++;}
result_html+="<tr><td>â€¦</td><td></td><td>*</td><td>*</td><td>*</td></tr>";i=k-1;}}
container.parent().after(result_html);container.parent().remove();}
TracerouteCheckResultDisplayer.prototype.isEmptyReply=function(hop_reply){return hop_reply.length==1&&hop_reply[0].host==null;}
TracerouteCheckResultDisplayer.prototype.formatServerResult=function(server_result){if(server_result.host==null){return "<td></td><td>*</td><td>*</td><td>*</td>";}
var html="<td>"+this.generateHostLinkHTML(server_result.host)+"</td>";for(var i=0;i<server_result.query_times.length;i++){var value=server_result.query_times[i];if(value==null||value==="")
value='*';html+="<td>"+value+"</td>";}
for(var i=server_result.query_times.length;i<3;i++){html+="<td></td>";}
return html;}
function send_check_query(button){var url;var action=button.name;var add_csrf=false;if(action=='info'){url="/ip-info";}else if(action=='cidr'){url="/subnet-calculator";}else{add_csrf=true;url="/check-"+action;}
var host=button.form.host.value;if(host!=''){url+="?host="+encodeURI(host);if(add_csrf){url+="&csrf_token="+encodeURI(button.form.csrf_token.value);}}
window.location=url;return 0;}
function nospy(str,fakechar){var re=new RegExp(fakechar,"g");return str.replace(re,"");}
function _(lexem){return lang[lexem]||lexem;}
function seconds_to_duration(seconds){var s=Math.ceil(seconds%60);var m=Math.floor((seconds/60)%60);var h=Math.floor((seconds/(60*60))%24);var d=Math.floor((seconds/(60*60*24)));return((d>0?d+_('d')+' ':'')
+(h>0?h+_('h')+' ':'')
+(m>0?m+_('m')+' ':'')
+(s+_('s')));}
function retrieve_whois_data(host){$("#whois_retrieve").hide();$("#whois_preloader").show();$.post('/ip-info/whois',{host:host},function(data,textStatus){$("#whois_preloader").hide();$("#whois_result").show();if(data.length<10){data=_("Not found");}
$("#whois_result").html(data);},'html');}
var ad_prepend="nrkzbchad";var ad_re=new RegExp("^"+ad_prepend+"(.+)$");function ad_close(ad_x){var container=$(ad_x).parent()
var elem_id=container[0].id;var ad_id=ad_re.exec(elem_id)[1];if(confirm(_("Have you read the advertisement and it has no relationship to you?"))==true){$.ajax({url:"/close_ad/"+ad_id});container.hide();}}
function MapInfo(title,not_available_txt){this.title=title;this.maps=[];this.not_available=not_available_txt;this.initialized=false;}
MapInfo.prototype.addMap=function(id,longitude,latitude,accuracy_radius){if(longitude==null||latitude==null||longitude==""||latitude==""){document.getElementById(id).textContent=this.not_available;return;}
if(this.initialized)
this.showMap(id,[longitude,latitude,accuracy_radius])
else
this.maps.push([id,[longitude,latitude,accuracy_radius]]);}
MapInfo.prototype.showMap=function(id,latlng){var el=document.getElementById(id);var position=[latlng[0],latlng[1]];var map_options={zoom:4};var map=L.map(el).setView(position,map_options['zoom']);L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);var marker=L.marker(position).addTo(map);var accuracy_radius=latlng[2];if(accuracy_radius!=null){L.circle(position,{color:'none',fillColor:'#dbab57',fillOpacity:0.35,radius:accuracy_radius*1000}).addTo(map);}}
MapInfo.prototype.initialize=function(){this.initialized=true;for(var i=0;i<this.maps.length;i++){var id=this.maps[i][0];var latlng=this.maps[i][1];this.showMap(id,latlng);}}