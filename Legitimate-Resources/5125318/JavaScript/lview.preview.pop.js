function ShowAditionalInfo(id,propid,proptype,info,width,height){setCookie(propid);width=672;height=280;$('#cover').show();$('#contentpreview').html('');$('#popmoreinfo').show();$('#popmoreinfo').css("width",width+"px");$('#popmoreinfo').css("height",height+"px");$('#popmoreinfo').css('border','0');$('#cover').click(function(){closeButton();});$('#popmoreinfo').center();if(info!=""){$('#contentpreview').html('<iframe frameborder="0" src="/preview.lview.pop.php?pid='+propid+'&ptype='+proptype+'&type='+info+'" width="'+width+'" height="'+height+'">');}
return false;}
function closeButton(){$('#cover').hide();$('#popmoreinfo').hide();$('#contentpreview').html('');return false;}
jQuery.fn.center=function(){this.css("position","absolute");this.css("top",($(window).height()-this.height())/2+$(window).scrollTop()+"px");this.css("left",($(window).width()-this.width())/2+$(window).scrollLeft()+"px");return this;}
jQuery.fn.move=function(x,y){this.css("top",this.offset().top+y+"px");this.css("left",this.offset().left+x+"px");return this;}
function setCookie(propid)
{cpids=$.cookie('cpids');if(cpids!=null)
{cpids=cpids.split(',');if(cpids.length>3)
cpids=cpids.slice(-3);}
else
{cpids=new Array();}
found=false;for(var i=0;i<cpids.length;i++){if(cpids[i]==propid){found=true;}}
if(!found)
{cpids.push(propid);}
if(cpids.length>0)
{cpids.join(',');$.cookie('cpids',cpids,{expires:7,path:'/'});}}