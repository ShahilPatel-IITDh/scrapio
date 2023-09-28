
var purl = window.location.href;
purl= encodeURIComponent(purl);
purl = "https://signin.att.com/dynamic/iamLRR/LrrController?IAM_OP=error&Referer=" + purl;
window.location.href = purl;
