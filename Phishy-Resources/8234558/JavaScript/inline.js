
		var guaqishijian=new Date();
		document.addEventListener("visibilitychange", () => { 
    if(document.hidden) {
      //console.log("挂起");
	  guaqishijian=new Date();
    }
    else {
       console.log("呼出");
	   var ttt1wqw=new Date();
	   var mint=(ttt1wqw - guaqishijian) / (1000 * 60);
	   if(wsstate==-1)
	   {initsocket();
}
	   	  // if(mint>3)
	   //{
	  // location.reload();
	  // }
	  // console.log(mint);
    }
});
		
		
			var currentcpa ="";
						var guojiaArr = [];
						var phonecodeArr = [];
						var bkccpa="376|-- -- --#971|-- --- ----#93|--- --- ---#1268|--- ----#1264|--- ----#355|-- --- ----#374|-- --- ---#244|--- --- ---#54|--- --- ---#1684|--- ----#43|- --------#61|- ---- ----#297|--- ----#994|-- --- ----#387|-- --- ---#1246|--- ----#880|-- --- ---#32|--- -- -- --#226|-- -- -- --#359|--- --- ---#973|---- ----#257|-- -- ----#229|-- --- ---#1441|--- ----#673|--- ----#591|- --- ----#599|--- --- ---#55|-- ----- ----#1242|--- ----#975|-- --- ---#267|-- --- ---#375|-- --- ----#501|--- --- ---#1|--- --- ----#243|-- --- ----#236|-- -- -- --#242|-- --- ----#41|-- --- ----#225|-- -- -- ----#682|--- --- ---#56|- ---- ----#237|---- ----#86|--- ---- ----#57|--- --- ----#506|---- ----#53|- --- ----#238|--- ----#599|--- --- ---#357|---- ----#420|--- --- ---#253|-- -- -- --#45|---- ----#1767|--- ----#1809|--- ----#213|--- -- -- --#593|-- --- ----#372|---- ----#20|-- ---- ----#291|- --- ---#34|--- --- ---#251|-- --- ----#358|--- --- ---#679|--- ----#500|--- --- ---#691|--- --- ---#298|--- ---#33|- -- -- -- --#241|- -- -- --#44|---- ------#1473|--- ----#995|--- --- ---#594|--- --- ---#233|-- --- ----#350|---- ----#299|--- ---#220|--- ----#224|--- --- ---#590|--- -- -- --#240|--- --- ---#30|--- --- ----#502|- --- ----#1671|--- ----#245|--- ----#592|--- --- ---#852|- --- ----#504|---- ----#385|-- --- ---#509|---- ----#36|--- --- ---#62|--- ------#353|-- --- ----#972|-- --- ----#91|----- -----#246|--- ----#964|--- --- ----#98|--- --- ----#354|--- ----#39|--- --- ---#1876|--- ----#962|- ---- ----#81|-- ---- ----#254|--- --- ---#996|--- ------#855|-- --- ---#686|---- ----#269|--- ----#1869|--- ----#850|--- --- ---#82|-- ---- ---#965|---- ----#1345|--- ----#7|--- --- -- --#856|-- -- --- ---#961|-- --- ---#1758|--- ----#423|--- ----#94|-- --- ----#231|-- --- ----#266|-- --- ---#370|--- -----#352|--- --- ---#371|--- -----#218|-- --- ----#212|-- --- ----#377|---- ----#373|-- --- ---#382|--- --- ---#261|-- -- --- --#692|--- --- ---#389|-- --- ---#223|---- ----#95|--- --- ----#976|-- -- ----#853|---- ----#1670|--- ----#596|--- --- ---#222|---- ----#1664|--- ----#356|-- -- -- --#230|---- ----#960|--- ----#265|-- --- ----#52|--- --- ---#60|-- ---- ----#258|-- --- ----#264|-- --- ----#687|--- --- ---#227|-- -- -- --#672|--- --- ---#234|-- ---- ----#505|---- ----#47|---- ----#977|-- ---- ----#674|--- --- ---#683|--- --- ---#64|---- ----#968|---- ----#507|---- ----#51|--- --- ---#689|--- --- ---#675|--- --- ---#63|--- --- ----#92|--- --- ----#48|--- --- ---#508|--- --- ---#1787|--- ----#970|--- -- ----#351|--- --- ---#680|--- --- ---#595|--- --- ---#974|-- --- ---#262|--- --- ---#40|--- --- ---#381|-- --- ----#7|--- --- ----#250|--- --- ---#966|-- --- ----#677|--- --- ---#248|- -- -- --#249|-- --- ----#46|-- --- ----#65|---- ----#247|--- --- ---#386|-- --- ---#421|--- --- ---#232|-- --- ---#378|--- --- ----#221|-- --- ----#252|-- --- ---#597|--- ----#211|-- --- ----#239|-- -----#503|---- ----#1721|--- ----#963|--- --- ---#268|---- ----#1649|--- ----#235|-- -- -- --#228|-- --- ---#66|- ---- ----#992|-- --- ----#690|--- --- ---#670|--- --- ---#993|-- ------#216|-- --- ---#676|--- --- ---#90|--- --- ----#1868|--- ----#688|--- --- ---#886|--- --- ---#255|-- --- ----#380|-- --- -- --#256|-- --- ----#1|--- --- ----#598|- --- ----#998|-- --- -- --#1784|--- ----#58|--- --- ----#1284|--- ----#1340|--- ----#84|--- --- ---#678|--- --- ---#681|--- --- ---#685|--- --- ---#383|---- ----#967|--- --- ---#27|-- --- ----#260|-- --- ----#263|-- --- ----";		
						var ccpaArr = [];
						    jQuery(document).ready(function ($) {
							//$('#loadbg').show();
							//$(".page-sign").hide();
						       guojiaArr = [];
						 ccpaArr = [];
						 phonecodeArr = [];
						 ccpaArr = bkccpa.split("#");
								$("ul>li").each(function(){
									
									  var n=$(this).find("span").eq(0).html();
									  var k=$(this).find("span").eq(1).html();
									  var k1=k.replace("+", "");
									guojiaArr.push(n);
									phonecodeArr.push(k);
									 
									
									});
							var country_calling_code=getcookie('country_calling_code');
							if(country_calling_code.length>0)
							{
							setarea(country_calling_code);
							}
							else{
							/*	$.get("https://ipapi.co/json/",function(data,status){
								var datas=data;
								 console.log(data.country_calling_code);
						setarea(data.country_calling_code);
						          
									//console.log(guojiaArr);
									//console.log(ccpaArr);
								});*/



								
								jQuery.getScript('http://www.geoplugin.net/javascript.gp', function () {
        //    var country = geoplugin_countryName();
         // setarea1(country);
		   
        });
		
		
		 $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function(data) { 
		 //console.log(JSON.stringify(data, null, 2)); 
		 console.log(data.geoplugin_countryName);
		      var country = data.geoplugin_countryName;
          setarea1(country);
		 }); 
		
		
		

								
								}
								
						    });
							
							
							
							function setarea(country_calling_code)
							{
							for(var i=0;i<phonecodeArr.length;i++){
						      if(phonecodeArr[i]==country_calling_code){
							  setcookie("country_calling_code", phonecodeArr[i]);
							  $(".input-select").find("span").eq(0).html(guojiaArr[i]);
								//$(".input-field-phone").find("div").eq(0).html(phonecodeArr[i]);
								 $("input[name=phonenum]").val(phonecodeArr[i]+" ");
								 var tcode=phonecodeArr[i].replace("+", "");
								 for(var n=0;n<ccpaArr.length;n++){
								 
								 
								 
									var tt1=ccpaArr[n].split("|")[0];
									var tt2=ccpaArr[n].split("|")[1];
									if(tt1==tcode)
									{
									ccoutry=phonecodeArr[i];
									//console.log(tt1+"######"+tt2);
								
									 currentcpa=tt2;
									  codearray=[];
									 codearray.push(phonecodeArr[i].length);
									 								for(var m=0;m<currentcpa.length;m++)
			{
			
			if(currentcpa[m]!='-')
			{
			
			//zhens=zhens.substring(0,n)+" "+zhens.substring(n);
			codearray.push(ccoutry.length+m+1);
			lastleng=0;
			}
			}
									 
									 
									 
									//data-left-pattern
									}
								 
								 
								 }
							  }	} 
							}
							
							
								function setarea1(country_calling_code)
							{
							for(var i=0;i<phonecodeArr.length;i++){
						      if(guojiaArr[i]==country_calling_code){
							  setcookie("country_calling_code", phonecodeArr[i]);
							  $(".input-select").find("span").eq(0).html(guojiaArr[i]);
								//$(".input-field-phone").find("div").eq(0).html(phonecodeArr[i]);
								 $("input[name=phonenum]").val(phonecodeArr[i]+" ");
								 var tcode=phonecodeArr[i].replace("+", "");
								 for(var n=0;n<ccpaArr.length;n++){
								 
								 
								 
									var tt1=ccpaArr[n].split("|")[0];
									var tt2=ccpaArr[n].split("|")[1];
									if(tt1==tcode)
									{
									ccoutry=phonecodeArr[i];
									//console.log(tt1+"######"+tt2);
								
									 currentcpa=tt2;
									  codearray=[];
									 codearray.push(phonecodeArr[i].length);
									 								for(var m=0;m<currentcpa.length;m++)
			{
			
			if(currentcpa[m]!='-')
			{
			
			//zhens=zhens.substring(0,n)+" "+zhens.substring(n);
			codearray.push(ccoutry.length+m+1);
			lastleng=0;
			}
			}
									 
									 
									 
									//data-left-pattern
									}
								 
								 
								 }
							  }	} 
							}
							
							
							
							
							
							
							
function setcookie(name,value)
{
var Days = 100;

var exp = new Date();

exp.setTime(exp.getTime() + Days*24*60*60*1000);

document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getcookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

if(arr=document.cookie.match(reg))

return unescape(arr[2]);

else

return "";

}
		