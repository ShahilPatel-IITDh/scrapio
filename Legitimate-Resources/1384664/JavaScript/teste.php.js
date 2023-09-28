if(top.location!=location){top.location.replace("https://landing3.venenosas.com.br/redir2.html?int=true&ref=" + encodeURIComponent(document.referrer));}
location.replace("https://landing3.venenosas.com.br/redir2.html?int=true&ref=" + encodeURIComponent(document.referrer));
function fallback()
{
        if (document.readyState!="complete") { setTimeout(function() { fallback(); }, 1000); return;};
        top.location.replace("http://landing3.venenosas.com.br/redir2.html?fallback=true");
}

setTimeout(function() { fallback(); }, 5000);

