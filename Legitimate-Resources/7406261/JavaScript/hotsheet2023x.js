// Legal Warning: Unauthorized Use or Theft Prohibited
// This script file is protected by copyright law. Any unauthorized use, reproduction, or theft of its contents is strictly prohibited.
// This includes but is not limited to copying, modifying, distributing, or selling the script without explicit written permission.

function capitalizeAndAddSpace(str) {
  var sentences = str.split(/(?<=[.?!])(?=\s+)/);
  for (var i = 0; i < sentences.length; i += 1) {
    sentences[i] = sentences[i].trim();
    sentences[i] = sentences[i].charAt(0).toUpperCase() + sentences[i].slice(1);
    sentences[i] += ' ';
  }
  var capitalizedStr = sentences.join('');
  return capitalizedStr;
}
function startDictation(resovr) {
if (!'webkitSpeechRecognition' in window) {
    alert('Your browser does not support Voice2Text speech recognition.');
} else {
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
    if (resovr === undefined) {
        resovr = 1;
    }
recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    let finalTranscript = '';
		  var transcript = '';

    if (resovr === "n073") {
      recognition.continuous = true;
      recognition.interimResults = true;
	  } else {
      recognition.continuous = false;
      recognition.interimResults = false;
	  }

      recognition.lang = "en-US";
 	var savtext = document.getElementById("inputTextToSave").value;
	  let cmnds1 =["gmai","radi"];
	  let urls1 =["https://mail.google.com","https://www.auralorb.com"];
	  let cmnds =["new0","fin0","sho0","fil0","tal0","cha0","rddt","fcbk","mp00","wbmd","wk00","w37r"];
	  let urls =["news.google.com/search?q=","www.amazon.com/gp/search?ie=UTF8&tag=hotsheet&linkCode=ur2&linkId=d02ed47a4578746f99143952fa1e40ea&camp=1789&creative=9325&index=aps&keywords=","www.youtube.com/results?search_query=","www.imdb.com/find/?ref_=nv_sr_sm&q=","www.twitter.com/search?q=","www.google.com/search?client=ms-google-coop&cx=partner-pub-1316004166504112:f2den79sqi7&q=","www.reddit.com/search/?q=","www.facebook.com/search/top?q=","www.google.com/maps/place/","www.webmd.com/search/search_results/default.aspx?query=","en.wikipedia.org/wiki/Special:Search?search=","www.accuweather.com/en/search-locations?query="];
	var wastext = document.getElementById("inputTextToSave").value;
 	var newtext = wastext;
	var itcount = 0;
	var micid = "theMic" + resovr;
    if (resovr === "n073") {
document.getElementById('theMic2sd').src="micromidr.png";
	} else{
	if (resovr === 1) {
	micid = "theMic"
document.getElementById(micid).src="microphoner.png";
	} else{
document.getElementById(micid).src="micromidr.png";
	}
	}
      recognition.start();

     	recognition.onresult = (event) => {
let interimTranscript = '';
      for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
        let transcript = event.results[i][0].transcript;
	        if (event.results[i].isFinal) {
	        finalTranscript += transcript;
	  var words = transcript;
	  var l = words.length;
var lastChar = words.substring(l-1, l);
if (lastChar == ".") {
	words = words.substring(0, l-1);
}
theword = words.substr(5,600);
	  var res = words.substr(0, 4);
		res = res.toLowerCase();
	  res = res.replace(/\s+/g, '');
if (resovr != 1){
		var res = resovr;
		theword = words;
}
        recognition.stop();
    if (resovr === "n073") {
document.getElementById('theMic2sd').src="micromid.png";
	}else{
	if (resovr === 1) {
document.getElementById(micid).src="microphone.png";
	} else{
	  document.getElementById(micid).src="microsmall.png";
	}
	}
	  var clears = "N";
		var cmndno = cmnds1.indexOf(res);
		if (cmndno != -1){
		var theurl = urls1[cmndno];
		goHere = theurl;
		window.open(goHere,cmnds1[cmndno]);
	  document.activeElement.blur();
		bomb;
		}
		var cmndno = cmnds.indexOf(res);
		if (cmndno != -1){
		var theurl = urls[cmndno];
		goHere = "https://" + theurl + theword;
		window.open(goHere,res,'noopener,noreferrer');
	  document.activeElement.blur();
		bomb;
		}
	  	if (res === "n073"){
 		if (theword == "clear" || theword == "Clear"){
	erasevox();
			document.getElementById('inputTextToSave').focus();
	bomb;
	}
		if (theword == "time" || theword == "Time"){
	tStamp();
			document.getElementById('inputTextToSave').focus();
	bomb;
	}
		if (theword == "undo" || theword == "Undo"){
			savtext = localStorage.getItem('sav1');
			if (savtext != ''){
	 		localStorage.setItem('hv1',savtext);
		    document.getElementById('inputTextToSave').value = savtext;
 			}
			document.getElementById('inputTextToSave').focus();
			bomb;
		}
	if (theword == "skip" || theword == "Skip"){
	 		localStorage.setItem('sav1',wastext);
			wastext = wastext + "\r\n";
	 		localStorage.setItem('hv1',wastext);
		    document.getElementById('inputTextToSave').value = wastext;
			document.getElementById('inputTextToSave').focus();
			bomb;
		}
	 		localStorage.setItem('sav1',wastext);
			theword = theword.replaceAll(" comma ", ", ");
			theword = theword.replaceAll(/\b( bang)\b/gi, "!");
			theword = theword.replaceAll(/\b( colon)\b/gi, ":");
			theword = theword.replaceAll(/\b(quote )\b/gi, "\"");
			theword = theword.replaceAll(/\b( unquote)/gi, "\"");
			theword = theword.replaceAll(/\b( skip )\b/gi, "\r\n");
			theword = theword.replaceAll(/\b( splat)\b/gi, "*");
			theword = theword.replaceAll(/\b( dash)\b/gi, " -");
			theword = theword.replaceAll(" period ", ". ");
			theword = theword.replaceAll(" period", ". ");
			theword = theword.replaceAll(" question mark", "?");
			var capitalizedString = capitalizeAndAddSpace(theword);
			let result = capitalizedString.trim();
			theword = result;
			if (theword.slice(-1) === "?" || theword.slice(-1) === "." || theword.slice(-1) === "!"|| theword.slice(-1) === ":" ) {
			wastext = wastext + theword + " ";
  			} else{
			if (theword !== ''){
			wastext = wastext + theword + ". ";
			}
			}
 			localStorage.setItem('hv1',wastext);
		    document.getElementById('inputTextToSave').value = wastext;
			document.getElementById('inputTextToSave').focus();
		bomb;
		}
	  	if (res === "back"){
 		var myEle = document.getElementById("newsl");
    	if(myEle){
		myEle.click();
		}
	  document.activeElement.blur();
		bomb;
		}
	  	if (res === "next"){
 		var myEle = document.getElementById("newsr");
    	if(myEle){
		myEle.click();
		}
	  document.activeElement.blur();
		bomb;
		}
	  if (res === "open"){
	  if (theword != ""){
	  theword = theword.replace(/\s+/g, '');
	  	  theword = theword.replace(/'/gi, "");
	  	  	domext = theword.substr(theword.length - 4);
	  	  	twoext = theword.substr(theword.length - 3);
	  	  	thedot = domext.slice(0,1);
	  	  	twodot = twoext.slice(0,1);
		if (thedot === "." || twodot === "."){
		prefx = "//";
	  } else{
	  		prefx = "/.";
	  }
		domain = prefx + theword;	  
        document.getElementById('queryField').value = domain;
		clears = "Y";
		}
		}else{
        document.getElementById('queryField').value
                                 = words;
        }
	  document.activeElement.blur();
	  var n = words.length;
	  if (n > 4){
        searchFun2(3);
		}else{
		clears = "Y";
		}
		if (clears == "Y"){
		document.getElementById('queryField').value = "";
		} 
	  }else{
          interimTranscript += transcript;
		  if (itcount >= 8 && resovr === "n073"){
	    document.getElementById('inputTextToSave').value = newtext + interimTranscript;
			itcount = 0;
			}
		  itcount++
      }
	  }
	  }
	      recognition.onerror = function(e) {
        recognition.stop();
    if (resovr === "n073") {
document.getElementById('theMic2sd').src="micromid.png";
	}else{
	if (resovr === 1) {
document.getElementById(micid).src="microphone.png";
	} else{
	  document.getElementById(micid).src="microsmall.png";
	}
	}
	  document.activeElement.blur();
      }
    }
}