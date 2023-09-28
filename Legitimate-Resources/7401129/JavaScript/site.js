var sc_span=document.getElementsByTagName("ul")[0].getElementsByTagName("span");
for(var sc_var=0;sc_var<sc_span.length;){
sc_span[sc_var].innerHTML="&nbsp;-&nbsp;"+sc_span[sc_var].innerHTML.slice(1,-1);
sc_var++;
}
var str=document.getElementById("whole_body").innerHTML;
var x=str.replace(/进入管理模式/g,"^_^").replace(/进入浏览模式/g,"^_^").replace(/English/g,"En").replace(/下一页/g,"﹀").replace(/上一页/g,"︿").replace(/apk/g,"安卓"). replace(/退出/g,"勿点");
document.getElementById("whole_body").innerHTML=x;