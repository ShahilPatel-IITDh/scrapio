var path='https://www.foreclosure1.com/';function change_state()
{if(document.search_box.state.value!='')
window.location.href=path+'listings/'+document.search_box.state.value+'/';else
window.location.href=path+'listings/';}
function change_county()
{if(document.search_box.county.value!='')
window.location.href=path+'listings/'+document.search_box.state.value+'/'+document.search_box.county.value+'/';else
window.location.href=path+'listings/'+document.search_box.state.value+'/';}
function change_city()
{if(document.search_box.city.value!='')
window.location.href=path+'listings/'+document.search_box.state.value+'/'+document.search_box.county.value+'/'+document.search_box.city.value+'/';else
window.location.href=path+'listings/'+document.search_box.state.value+'/'+document.search_box.county.value+'/';}
function change_zipcode()
{var pagina;if(document.search_box.zipcode.value!='')
{pagina=path+'listings/zipcode/'+document.search_box.zipcode.value+'/';}
else
{if(document.search_box.state.value!='')
{pagina=path+'listings/'+document.search_box.state.value+'/';if(document.search_box.county.value!='')
{pagina+=document.search_box.county.value+'/';if(document.search_box.city.value!='')
{pagina+=document.search_box.city.value+'/';}}}}
window.location.href=pagina;}
function limit_search()
{var url,x,i;if($("#zipcode").val()!='')
{url=path+'lview.preview-content.php?zipcode='+$("#zipcode").val();if($("#property_type").val()!=''){url+='&property_type='+$("#property_type").val();}}
else
{url=path+'lview.preview-content.php?state_sigla='+$("#state").val()+'&county_name='+$("#county").val().replace(' ','%20');if($("#city").val()!=''){url+='&city_name='+$("#city").val().replace(' ','%20');}
if($("#property_type").val()!=''){url+='&property_type='+$("#property_type").val();}}
if($("#regs_per_page").val()!=''&&$("#regs_per_page").val()!=25)
url+='&regs_per_page='+$("#regs_per_page").val();if($("#order_by").val()!=''&&$("#order_by").val()!='property_photos')
url+='&order_by='+$("#order_by").val().replace(' ','%20');if($("#min_price").val()!=0||$("#max_price").val()!=-1)
url+='&min_price='+$("#min_price").val()+'&max_price='+$("#max_price").val();if($("#beds").val()!='')
url+='&beds='+$("#beds").val();if($("#baths").val()!='')
url+='&baths='+$("#baths").val();reloadContent(url);}
function order()
{url=path+$("#order_url").val();if($("#order_by").val()!=''&&$("#order_by").val()!='property_photos')
url+='&order_by='+$("#order_by").val().replace(' ','%20');reloadContent(url);}
function order_by(order)
{url=path+$("#order_url").val();if(order!=''&&order!='property_photos')
url+='&order_by='+order.replace(' ','%20');reloadContent(url);}
function jump(page)
{url=path+$("#jump_url").val();if(page!=''&&page!=undefined)
{url+='&page='+page;reloadContent(url);}
else if($("#page").val()!=''&&$("#page").val()!=undefined)
{url+='&page='+$("#page").val();reloadContent(url);}}
function change_regs_per_page()
{url=path+$("#regs_url").val();if($("#regs_per_page").val()!=''&&$("#regs_per_page").val()!=25)
url+='&regs_per_page='+$("#regs_per_page").val();reloadContent(url);}
$(document).ready(function(){if(window.location.hash!='')
{var url;if($("#zipcode").val()!='')
{url=path+'lview.preview-content.php?zipcode='+$("#zipcode").val();if($("#property_type").val()!=''){url+='&property_type='+$("#property_type").val();}}
else
{url=path+'lview.preview-content.php?state_sigla='+$("#state").val()+'&county_name='+$("#county").val().replace(' ','%20');if($("#city").val()!=''){url+='&city_name='+$("#city").val().replace(' ','%20');}
if($("#property_type").val()!=''){url+='&property_type='+$("#property_type").val();}}
url+=window.location.hash.replace('#','&').replace(/ /g,'%20');reloadContent(url,function(){var qsa=window.location.hash.replace('#','').split('&');for(var i=0;i<qsa.length;i++)
{param=qsa[i].split('=');if(param[0]!='page'&&param[0]!='regs_per_page')
$("#"+param[0]).val(param[1]);if(param[0]=='active'&&param[1]=='yes')
$("#"+param[0]).attr('checked','checked');}
if($('#scrollto').val()!='')
{goToDiv('#list_'+$('#scrollto').val());}});}
if(window.location.hash=="#property_sold"){$('#property_sold').show();}});function reloadContent(lview,callback)
{$("#content_view").animate({opacity:0.5},500,function(){$("#lview_loading").show();$.ajax({url:lview,success:function(data){$('#content_view').html(data);setActions();$("#lview_loading").hide();$("#content_view").animate({opacity:1.0},500);window.location.hash=$("#hash").val();track=String(window.location);track=track.replace(path,'');pageTracker._trackPageview('/'+escape(track));if(typeof(callback)=='function')
callback();}});});}
function check_zipcode(){var zipcode;zipcode=document.getElementById("zipcode_search").value;if(zipcode=="")
alert("Please fill the zipcode.");else
document.search_box2.submit();}
function goToDiv(div){var target=$(div);if(target.length)
{var top=target.offset().top;$('html,body').animate({scrollTop:top},500);return false;}}
function scrollToProperty(state,county,city,pid)
{regs_per_page=25;url=path+'listings/'+state+'/'+county+'/'+city+'/#property_id='+pid;window.location.href=url;if($("#state").val()==state&&$("#county").val()==county&&$("#city").val()==city)
window.location.reload();}