// Legal Warning: Unauthorized Use or Theft Prohibited
// This script file is protected by copyright law. Any unauthorized use, reproduction, or theft of its contents is strictly prohibited.
// This includes but is not limited to copying, modifying, distributing, or selling the script without explicit written permission.

var page = window.location;
var updInx = 0;
var hlong = 1000*60*60*24*6004; 	
var u = new Date(); u.setTime (u.getTime() + hlong);
var e = new Date(); e.setTime (u.getTime());
var engine = new Array("dead","dead","search.msn.com/results.aspx?q=","www.hotsheet.com/search.php?cx=partner-pub-1316004166504112:f2den79sqi7&cof=FORID:10&ie=UTF-8&sa=Search&q=","twitter.com/search?q=","dead","en.wikipedia.org/wiki/Special:Search?search=","search.yahoo.com/search?p=","www.imdb.com/find?ref_=nv_sr_fn&s=all&q=","www.youtube.com/results?search_query=","www.dictionary.com/browse/","allrecipes.com/search/results/?wt=","www.webmd.com/search/search_results/default.aspx?query=","dead","www.accuweather.com/en/search-locations?query=","dead","news.google.com/search?q=","tvlistings.zap2it.com/?aid=gapzap&q=","finance.yahoo.com/q?d=v1&s=","www.amazon.com/gp/search?ie=UTF8&tag=hotsheet&linkCode=ur2&linkId=d02ed47a4578746f99143952fa1e40ea&camp=1789&creative=9325&index=aps&keywords=");
var engurl = new Array("www.hotsheet.com","www.ask.com","www.bing.com","www.hotsheet.com/search.php","www.twitter.com","dead","en.wikipedia.org","www.yahoo.com","www.imdb.com","www.youtube.com","www.dictionary.com","www.allrecipes.com","www.webmd.com","dead","weather.com/weather/today/","dead","news.google.com","tvlistings.zap2it.com/?aid=gapzap","finance.yahoo.com","www.amazon.com/exec/obidos/redirect-home/hotsheet");

window.defaultStatus='';
function hidestatus(){
window.status='';
return true;
}

if (document.layers){
document.captureEvents(Event.MOUSEOVER | Event.MOUSEOUT);
document.onmouseover=hidestatus;
document.onmouseout=hidestatus;
}

function searchFunc(eIDX){
searchValue = document.superSearch.queryField.value;
if (searchValue != ''){
goHere = "https://" + engine[eIDX] + searchValue;
} else {
goHere = "https://" + engurl[eIDX];
}
window.open(goHere,'_blank');
document.superSearch.queryField.value='';
toggle_search('SearchMore');
}

function searchFun2(eIDX){
searchValue = document.superSearch.queryField.value;
var chkWww = searchValue.substring(0,2);
var moreval = searchValue.substring(2);
if (searchValue != ''){
goHere = "https://" + engine[eIDX] + searchValue;
} else {
goHere = "https://" + engurl[eIDX];
}
let cmndgo =["..","./","//","/."];
var cmndty = cmndgo.indexOf(chkWww);
if (cmndty === -1){
window.open(goHere,'_self');
}else{
if (moreval != ''){
openLink(chkWww,moreval);
}
}
document.superSearch.queryField.value='';
}
function searchFun3(eIDX){
searchValue = document.superSearch.queryField.value;
if (searchValue != ''){
goHere = "https://" + engine[eIDX] + searchValue;
} else {
goHere = "https://" + engurl[eIDX];
}
window.open(goHere,'_blank');
document.superSearch.queryField.value='';
toggle_search('SearchMore');
}

function openLink(chkWww,moreval){
if (chkWww == ".."){
newLoc= "https://www." + moreval + ".com/";
goHere= newLoc;
window.open(goHere,'_blank');
eIDX=3;
document.superSearch.queryField.value='';
}
if (chkWww == "./"){
newLoc= "https://www." + moreval;
goHere= newLoc;
window.open(goHere,'_blank');
eIDX=3;
document.superSearch.queryField.value='';
}
if (chkWww == "/."){
newLoc= "https://" + moreval + ".com/";
goHere= newLoc;
window.open(goHere,'_blank');
document.superSearch.queryField.value='';
eIDX=3;
}
if (chkWww == "//"){
newLoc= "https://" + moreval;
goHere= newLoc;
window.open(goHere,'_blank');
document.superSearch.queryField.value='';
eIDX=3;
}
return;
}

function searchClear(){
var form = document.getElementById('superSearch');
document.superSearch.queryField.value='';
form.reset();
document.superSearch.queryField.focus();
}

var tipWindow;
function openTip() {
  var left = (screen.width/2)-250;
  var top = (screen.height/2)-300;
  tipWindow = window.open('updatesinfo.html', 'tipwin','location=no,height=580,width=500,scrollbars=no,status=no,toolbar=no,menubar=no,, top='+top+', left='+left);
tipWindow.focus();
}

function closeTip() {
  tipWindow.close();
}

function loadurl(dest) { 
try {
xmlhttp = window.XMLHttpRequest?new XMLHttpRequest():
new ActiveXObject("Microsoft.XMLHTTP");
}
catch (e) { /* do nothing */ }
xmlhttp.onreadystatechange = triggered;
xmlhttp.open("GET", $("#newsdiv").load(dest));
}
function triggered() {
if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
document.getElementById('newsContent').innerHTML = xmlhttp.responseText;
}
document.getElementById('newsdiv').focus();
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function load_cook(pname,phide){
var json_str = readCookie('showcats');
if (json_str == null){
var arr = [ 
    {name:'news', hide:'1' },{name:'search', hide:'1' },{name:'entertainment', hide:'1' },{name:'shop', hide:'1' },{ name:'finance', hide:'1' },{ name:'travel', hide:'1' },{ name:'connect', hide:'1' },{ name:'utilities', hide:'1' }
	]
}else{
var arr = JSON.parse(json_str);
}
var addNewElement = function(arr, newElement) {
    var found = false;
    for(var i=0; element=arr[i]; i++) {
        if(element.name == newElement.name) {
            found = true;
            if(newElement.hide === 0) {
                arr[i] = false;
            } else {
                arr[i] = newElement;
            }            
        }
    }
    if(found === false) {
        arr.push(newElement);
    }
    // removing elements
    var newArr = [];
    for(var i=0; element=arr[i]; i++) {
        if(element !== false) newArr.push(element);
    }
    return newArr;
}
arr = addNewElement(arr, {name: pname, hide: phide});
var json_str = JSON.stringify(arr);
createCookie('showcats',json_str,90);
}

function eraseCookie() {
var r2 = confirm(" Reset all settings and remove HotSheet.com cookies? ");
if (r2 == true) {
	createCookie("newSrc","",-1);
	createCookie("txtSize","",-1);
	createCookie("adshow","",-1);
	createCookie("color","",-1);
	createCookie("bcolor","",-1);
	createCookie("search","",-1);
	createCookie("nHeight","",-1);
	createCookie("srce","",-1);
	createCookie("ortion","",-1);
	createCookie("n1","",-1);
	createCookie("n2","",-1);
	createCookie("v2t","",-1);
	createCookie("q1","",-1);
	createCookie("station","",-1);
	createCookie("smnet","",-1);
	createCookie("author","",-1);
	createCookie("twtuser","",-1);
	createCookie("showcats","",-1);
alert(" All custom settings and related cookies have been deleted ");
location.reload();
}
}
function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
function scrollCat(catid){
id = '#' + catid;
$('html, body').animate({scrollTop: $(id).offset().top -43 }, 5);
if(catid == 'superSearch'){
document.getElementById('queryField').select();
}
}
function toggle_search(togid) {
       var e = document.getElementById(togid);
	   if(e.style.display === 'block'){
          e.style.display = 'none';
		  e.style.visibility = "hidden";
	    e.style.opacity = 0;	
		createCookie('q1','',-1);
		 }else{
          e.style.display = 'block';
		  e.style.visibility = "visible";
	    e.style.opacity = 1;	
		createCookie('q1','1','30');
	 }
    }
function changeFontSize(){
	var thetext = document.getElementById("stories");
	var style = window.getComputedStyle(thetext, null).getPropertyValue('font-size');
	var thefont = parseFloat(style);
	var id = 1;
	if (nclicks == ""){
	nclicks = 0;
	}
	let cars = [12,14,16,17,18,19,20,21,22,24,28,32];
	var xclick = cars.indexOf(thefont);
	if (xclick != -1){
	nclicks = xclick;
    id = xclick + 1;
	}
	createCookie('txtSize',cars[id],285);
	thetext.style.fontSize = cars[id] + "px";
	nclicks++;
	if (nclicks >= 12){
	nclicks = 0;
	document.getElementById("stories").style.fontSize = "12px";
	createCookie('txtSize',10,7);
	}
	document.getElementById("nclicks").innerHTML = nclicks;
}
    var aColl = document.getElementsByClassName('newstitle');
    var bColl = document.getElementsByTagName('h3');
function changeColor(coll, color){
    for(var i=0, len=coll.length; i<len; i++)
    {
        coll[i].style["color"] = color;
    }
}
function closeInfo(days) {
    var target = document.getElementById('slide');
        target.style.height = 0;
        target.style.border = 0;
		createCookie('n1','1',days);
}
function closeTweets() {
    var target = document.getElementById('sideShow');
	        target.style.height = 0;
	    target.style.display = 'none';
		createCookie('n2','1',30);
}
function closeTv() {
    var target = document.getElementById('tvShow');
	        target.style.height = 0;
	    target.style.display = 'none';
		createCookie('t1','1',30);
}
function closeT2() {
    var target = document.getElementById('tvShow');
	        target.style.height = 0;
	    target.style.display = 'block';
		createCookie('t2','1',30);
}
function overstn(){
var stn1 = document.getElementById('ovstn').value;
createCookie('twtuser',stn1,90);
window.location.reload(true);
}
function refreshtwt(){
    var container = document.getElementById("twtblock");
    var content = container.innerHTML;
    container.innerHTML= content;
}
function togUser() {
  var y = document.getElementById("twtuser");
  if (y.style.display === "block") {
    y.style.display = "none";
  } else {
    y.style.display = "block";
  }
}
function openVid() {
var scwidth = window.screen.width;
scwidth = scwidth * .45;
if (scwidth < 9430){
scwidth = 720;
}
var scheight = window.screen.height;
var storeh = scheight;
scheight =  120 + (scwidth * .5625);
if (scheight > storeh){
scheight = storeh;
}
var tipWindow = window.open('https://www.hotsheet.com/tv.php',"_blank",'location=no,height=' + scheight + ',width=' + scwidth + ',scrollbars=no,status=no,toolbar=no,menubar=no,location=no,top=0,left=0');
tipWindow.focus();
}
function openRad() {
var scwidth = 520;
var scheight = 520;
var tipWindow = window.open('https://www.auralorb.com',"radio",'location=no,height=' + scheight + ',width=' + scwidth + ',scrollbars=no,status=no,toolbar=no,menubar=no,location=no,top=120,left=120');
tipWindow.focus();
}
function togLine2() {
  var x = document.getElementById('menushow');
    x.style.display = "inline-block";	
    x.style.visibility = "visible";
    x.style.opacity = 1;	
createCookie('first1','1',120);
}
function togLine1() {
  var x = document.getElementById('menushow');
  if (x.style.display === "inline-block") {
    x.style.display = "none";
     x.style.visibility = "hidden";
    x.style.opacity = 0;	
 } else {
    x.style.display = "inline-block";
    x.style.visibility = "visible";
    x.style.opacity = 1;	
  }
}
function togLine3(divname) {
  var x = document.getElementById(divname);
  if (x.style.display === "block") {
    x.style.display = "none";
 } else {
    x.style.display = "block";
  }
}
function voxcopy() {
  let textarea = document.getElementById("inputTextToSave");
  textarea.select();
  document.execCommand("copy");
  document.activeElement.blur();
document.getElementById("inputTextToSave").focus();
}
function erasevox() {
var r = confirm(" Erase all Voice2Text text? ");
if (r == true) {
localStorage.removeItem('hv1');
document.getElementById("inputTextToSave").value = "";
document.getElementById("inputTextToSave").focus();
}
}
function togNote() {
  var x = document.getElementById('slide2');
     var target = document.getElementById('slide');
     var target2 = document.getElementById('qlinks');
  if (x.style.display === "block") {
    x.style.display = "none";
     x.style.visibility = "hidden";
    x.style.opacity = 0;
	createCookie("v2t","",-1);
 } else {
     target.style.height = 0;
     target.style.border = 0;
   x.style.display = "block";
    x.style.visibility = "visible";
    x.style.opacity = 1;	
	createCookie('v2t','1','5');
document.getElementById("inputTextToSave").focus();
  }
}
function tog_on(tid) {
       var e = document.getElementById(tid);
          e.style.display = 'block';
    }
function toggle_off(togid) {
       var e = document.getElementById(togid);
          e.style.display = 'none';
    }
function openNote() {
  var x = document.getElementById('slide2');
      var target = document.getElementById('slide');
     target.style.height = 0;
     target.style.border = 0;
  x.style.display = "block";
    x.style.visibility = "visible";
    x.style.opacity = 1;	
	createCookie('v2t','1','5');
document.getElementById("inputTextToSave").focus();
}
function closeNote() {
  var x = document.getElementById('slide2');
  x.style.display = "none";
    x.style.visibility = "hidden";
	createCookie("v2t","",-1);
}
function saveTextAsFile()
{
	var textToSave = document.getElementById("inputTextToSave").value;
	var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
	var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
	var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	downloadLink.href = textToSaveAsURL;
	downloadLink.onclick = destroyClickedElement;
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);

	downloadLink.click();
}
function loadFileAsText()
{
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("inputTextToSave").value = textFromFileLoaded;
		localStorage.setItem('hv1',textFromFileLoaded);
};
	fileReader.readAsText(fileToLoad, "UTF-8");
	document.getElementById("inputTextToSave").focus();
}
function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}
function toIsoString(date) {
  var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
          return (num < 10 ? '0' : '') + num;
      };

  return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      '-' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds());
}
function tStamp(){
var twas = document.getElementById("inputTextToSave").value;
localStorage.setItem('sav1',twas);
var dt = new Date();
var stamp = toIsoString(dt);
var newText = twas + "\r\n" + stamp + ",";
document.getElementById('inputTextToSave').value = newText;
localStorage.setItem('hv1',newText);
document.getElementById("inputTextToSave").focus();
}
function lineBrk(){
var twas = document.getElementById("inputTextToSave").value;
localStorage.setItem('sav1',twas);
var newText = twas + "\r\n";
document.getElementById('inputTextToSave').value = newText;
localStorage.setItem('hv1',newText);
document.getElementById("inputTextToSave").focus();
}