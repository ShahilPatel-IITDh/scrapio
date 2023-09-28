/********************************
ActiveBoard User Monitor Script
Copyright 2005 Sparklit Networks
*********************************/

// Set Locally
var abmHostname = "";
var abmImgHostname = "";
var abmABID = 0;
var abmShowActivity = 0;
var abmLocalTimestamp = 0;

// Set Remotely
var abmRemoteTimestamp;
var abmMemberIDs;
var abmLastAccessTimes;
var abmUserNames;
var abmActivities;
var abmAvatarIDs;
var abmAvatarLinks;
var abmAvatarSizes;
var abmGuestsOnline;
var abmMembersOnline;
var abmModeratorIDs;
var abmAdminID;
var abmAutoUpdateStats;
var abmStartTime;

function abmInit(hostname, imghostname, aBID, showActivity, autoUpdateStats) {
	abmHostname = hostname;
	abmImgHostname = imghostname;
	abmABID = aBID;
	abmShowActivity = showActivity;
	abmAutoUpdateStats = autoUpdateStats;

	var div = $('#abMonScriptDiv');
	if (div.length){
		div.addClass('widget genmed row1 borderline');
		div.css({
			'position': 'absolute',
			'vertical-align': 'middle'
		});
	}
	
	var dt = new Date();
	window.document.write('<scr'+'ipt ID=abmScript type="text/javascript" src="//'+abmHostname+'/ab_monitor?aBID='+abmABID+'&t='+dt.getTime()+'"></scr'+'ipt>');
	abmLocalTimestamp = Math.floor(dt.getTime()/1000);
	abmStartTime = abmLocalTimestamp;
	if (abmAutoUpdateStats)
		setTimeout("abmRefresh()", abmAutoUpdatePeriod());
}

function abmRefresh() {
	var dt = new Date();
	abmImportJS('//'+abmHostname+'/ab_monitor?v=x02&aBID='+abmABID+'&t='+dt.getTime());
	abmLocalTimestamp = Math.floor(dt.getTime()/1000);
	abmHideDiv();
	
	if (abmLocalTimestamp-abmStartTime<1800 && abmAutoUpdateStats)
		setTimeout("abmRefresh()", abmAutoUpdatePeriod());
}

function abmAutoUpdatePeriod() {
	if(abmMembersOnline >= 4)
		return 120000;
	if(abmMembersOnline >= 2)
		return 120000;
	return 120000;
}

function abmUpdateMemberLinks() {
    var str,
        e = document.getElementById('abmMemberLinks');
	if(e) {
		str = '';
		for(i = 0; i < abmMembersOnline; i++) {
			if(i > 0)
				str += ', ';
				
			if (abmAdminID == abmMemberIDs[i])
				str += '<a onMouseOut="abmHideDiv()" onMouseOver="abmShowDiv(event, '+i+', this)" href="/forum.spark?aBID='+abmABID+'&p=20&memberID='+abmMemberIDs[i]+'" class="admin">'+abmUserNames[i]+'</a>';						
			else {
				var isMod=false;
				 for(j = 0; j < abmModeratorIDs.length; j++){
					  if((abmModeratorIDs[j] == abmMemberIDs[i]))
							isMod = true;
				 }
				
				if (isMod)
					str += '<a onMouseOut="abmHideDiv()" onMouseOver="abmShowDiv(event, '+i+', this)" href="/forum.spark?aBID='+abmABID+'&p=20&memberID='+abmMemberIDs[i]+'" class="mod">'+abmUserNames[i]+'</a>';						
				else
					str += '<a onMouseOut="abmHideDiv()" onMouseOver="abmShowDiv(event, '+i+', this)" href="/forum.spark?aBID='+abmABID+'&p=20&memberID='+abmMemberIDs[i]+'">'+abmUserNames[i]+'</a>';						
			}
		}
		e.innerHTML = (abmMembersOnline ? ': ' : '.') + str;
	}
	e = document.getElementById('abmNGuests');
	if(e) {
		e.innerHTML = abmGuestsOnline;
	}
	e = document.getElementById('abmNMembers');
	if(e) {
		e.innerHTML = abmMembersOnline;
	}
}

function abmShowDiv(e, index, parent)
{

	if (abmMemberIDs[index])
		var user = abmMemberIDs[index];
	else
		return;
	
	var monDivSel = $('#abMonScriptDiv');
	var i = 0;
	var lastAccess = 0;
	var timeDiff = 0;
	var html = "";
	monDivSel.html('');
	
	var s = abmActivities[index];
	if( (i = s.indexOf(':')) && i < s.length-1)
	{
		var str1 = s.substr(0, i);
		var str2 = s.substr(i+1);
	}
	
	var forumName = "Unknown Forum";
	for(i = 0; i < abmSubForumIDs.length; i++)
	{
		if(parseInt(abmSubForumIDs[i]) == parseInt(str2))
		{
			forumName = abmSubForums[i];
			break;
		}
	}
	
	var imgLink = "";
	if(abmAvatarLinks[index] == 'library'){
		imgLink = '//'+abmImgHostname+'/forum/avatar/lib/lib_avtr_'+abmAvatarIDs[index]+'.gif';
	}
	else if(abmAvatarIDs[index] > 0){
		imgLink = '//'+abmHostname+'/avatar?id='+abmAvatarIDs[index]+'&m='+abmAvatarMimeCode[index]+'&t='+abmAvatarLastModified[index];
	}
	
	
	
	if (imgLink.length>0)
	{
		xOff = abmAvatarSizes[index].indexOf('x');
		x = abmAvatarSizes[index].substr(0, xOff);
		y = abmAvatarSizes[index].substr(xOff+1);
		var imgh = 50;
		var imgw = x/(y/imgh)
		html += "<img width=\""+imgw+"\" height=\""+imgh+"\" src="+imgLink+" style=\"padding: 0px; margin: 0px; vertical-align: middle;\">";
		monDivSel.css('padding', 0);
	}
	else
		monDivSel.css('padding', '5px');
	
	html += "<span style=\"padding: 5px;\"><b>"+abmUserNames[index]+"</b> - ";
	
	if(str1 == 'R')
		html += "Reading in: "+forumName+", ";
	else if(str1 == 'W')
		html += "Posting in: "+forumName+", ";
	else
		html += "Last activity: ";
	
	var dt = new Date();
	lastAccess = Math.floor(dt.getTime()/1000) - abmLastAccessTimes[index] - (abmLocalTimestamp-abmRemoteTimestamp);
	
	if(lastAccess < 60)
		html += lastAccess+' seconds ago';
	else
		html += Math.floor(lastAccess/60)+' min. '+(lastAccess%60)+' sec. ago';
		
	html += "</span>";

	monDivSel.html(html);
	monDivSel.show();

	var height = monDivSel.outerHeight();
	monDivSel.css({
		left: e.pageX + 10,
		top: (e.pageY- height - 10) + 'px'
	});
}

function abmGetTimeStr(t) {
	if(t < 120)
		return t+' seconds';
	else
		return Math.floor(t/60)+' min. '+(t%60)+' sec.';
}

function abmGetActivityStr(s) {
	var i;
	var str1;
	var str2;
	var title;
	
	if( (i = s.indexOf(':')) && i < s.length-1) {
		str1 = s.substr(0, i);
		str2 = s.substr(i+1);
		title = abmGetSubForumStr(str2);
		
		if(str1 == 'R')
			return 'Reading in '+title;
		if(str1 == 'W')
			return 'Posting in '+title;
	}
	
	return s;
}

function abmGetSubForumStr(id) {
	for(i = 0; i < abmSubForumIDs.length; i++)
		if(abmSubForumIDs[i] == id)
			return abmSubForums[i];
	
	return 'a sub-forum'; // wtf?
}

function abmHideDiv() {
	$('#abMonScriptDiv').hide();
}

function abmDivTop(p)
{
	t = p.offsetHeight;
	do {
		if(p.offsetTop)
			t += p.offsetTop;
	} while (p = p.offsetParent);
	return t+7;
}

function abmDivLeft(p)
{
	l = 0;
	do {
		if(p.offsetLeft)
			l += p.offsetLeft;
	} while (p = p.offsetParent);
	return l;
}

function abmImportJS(scriptName) {
	if( document.createElement && document.childNodes) {
		var scriptElem = document.createElement('script');
		scriptElem.setAttribute('src',scriptName);
		scriptElem.setAttribute('type','text/javascript');
		document.getElementsByTagName('head')[0].appendChild(scriptElem);
	}
}

/********************************/