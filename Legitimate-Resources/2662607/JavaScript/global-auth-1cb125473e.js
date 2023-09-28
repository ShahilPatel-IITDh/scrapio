function parseURL(url){var a=document.createElement('a');a.href=url;return a.hostname;}
function authCheck()
{var img=new Image();img.src='http://auth.servers.dev/status?'+Date.now();img.onload=function()
{if(img.width===2)
{}};}