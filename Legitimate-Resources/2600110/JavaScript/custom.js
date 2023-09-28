jQuery.noConflict()(function($){$("<select />").appendTo("nav");$("<option />",{"selected":"selected","value":"","text":"Please choose page"}).appendTo("nav select");$("nav a").each(function(){var el=$(this);var perfix='';switch(el.parents().length){case(11):perfix='';break;case(13):perfix='-- ';break;default:perfix='';break;}
$("<option />",{"value":el.attr("href"),"text":perfix+el.text()}).appendTo("nav select");$("nav select").change(function(){window.location=$(this).find("option:selected").val();});});});function bookmarksite(title,url)
{if(window.sidebar)
window.sidebar.addPanel(title,url,"");else if(window.opera&&window.print){var elem=document.createElement('a');elem.setAttribute('href',url);elem.setAttribute('title',title);elem.setAttribute('rel','sidebar');elem.click();}
else if(document.all)
window.external.AddFavorite(url,title);}