/****************************************************************************
 * Utils
 * contains utility functions in:
 * - help screen creature display
 * - cookies
 * - navigation tree control
 ****************************************************************************/
var enums = {};
enums.keyboard = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    SHIFT: 16,
    CTRL: 17,
    ALT: 18,
    PAUSE: 19,
    CAPS_LOCK: 20,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT_ARROW: 37,
    UP_ARROW: 38,
    RIGHT_ARROW: 39,
    DOWN_ARROW: 40,
    INSERT: 45,
    DELETE: 46,
    KEY_0: 48,
    KEY_1: 49,
    KEY_2: 50,
    KEY_3: 51,
    KEY_4: 52,
    KEY_5: 53,
    KEY_6: 54,
    KEY_7: 55,
    KEY_8: 56,
    KEY_9: 57,
    KEY_A: 65,
    KEY_B: 66,
    KEY_C: 67,
    KEY_D: 68,
    KEY_E: 69,
    KEY_F: 70,
    KEY_G: 71,
    KEY_H: 72,
    KEY_I: 73,
    KEY_J: 74,
    KEY_K: 75,
    KEY_L: 76,
    KEY_M: 77,
    KEY_N: 78,
    KEY_O: 79,
    KEY_P: 80,
    KEY_Q: 81,
    KEY_R: 82,
    KEY_S: 83,
    KEY_T: 84,
    KEY_U: 85,
    KEY_V: 86,
    KEY_W: 87,
    KEY_X: 88,
    KEY_Y: 89,
    KEY_Z: 90,
    LEFT_META: 91,
    RIGHT_META: 92,
    SELECT: 93,
    NUMPAD_0: 96,
    NUMPAD_1: 97,
    NUMPAD_2: 98,
    NUMPAD_3: 99,
    NUMPAD_4: 100,
    NUMPAD_5: 101,
    NUMPAD_6: 102,
    NUMPAD_7: 103,
    NUMPAD_8: 104,
    NUMPAD_9: 105,
    MULTIPLY: 106,
    ADD: 107,
    SUBTRACT: 109,
    DECIMAL: 110,
    DIVIDE: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    NUM_LOCK: 144,
    SCROLL_LOCK: 145,
    SEMICOLON: 186,
    EQUALS: 187,
    COMMA: 188,
    DASH: 189,
    PERIOD: 190,
    FORWARD_SLASH: 191,
    GRAVE_ACCENT: 192,
    OPEN_BRACKET: 219,
    BACK_SLASH: 220,
    CLOSE_BRACKET: 221,
    SINGLE_QUOTE: 222
};
enums.validKeyboard = {
    NUMERIC: "numeric",
    DATE: "date"
};
enums.dateSegments = {
    YEAR: "year",
    MONTH: "month",
    WEEK: "week",
    DAY: "day",
    HOUR: "hour",
    MINUTE: "minute",
    SECOND: "second"
};
enums.browserType =
{
    Edge    : "Edge",
    MSIE    : "MSIE",
    Trident : "Explorer",
    Firefox : "Firefox",
    Opera   : "Opera",
    OPR     : "Opera",
    Chrome  : "Chrome",
    Safari  : "Safari",
    Other   : "Other",
    Unknown : "Unknown"
};


navigator.GetBrowserType = (function ()
{
    var ua = navigator.userAgent, tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

    if (/trident/i.test(M[1]))
    {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

        return 'IE ' + (tem[1] || '');
    }

    if (M[1] === 'Chrome')
    {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);

        if (tem != null)
            return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null)
        M.splice(1, 1, tem[1]);

    return M.join(' ');
})();


/*
navigator.GetBrowserType = (function ()
{
    this.browser    = enums.browserType.Unknown;
    this.version    = 0;

    var ua          = navigator.userAgent, tem,
    M               = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    
    //switch (M[1])
    //{
    //    case "trident":
    //        this.browser = enums.browserType.Trident;
    //        break;

    //}
    
    if (/trident/i.test(M[1]))
    {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

        //return 'IE ' + (tem[1] || '');
        this.browser = enums.browserType.Trident;

        if (tem[i])
        {
            this.version = tem[i];
        }
    }

    if (M[1] === 'Chrome')
    {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);

        if (tem != null)
        {
            console.log("tem.slice(1): " + tem.slice(1));

            return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null)
    {
        M.splice(1, 1, tem[1]);
    }


    //return M.join(' ');
    return null;
})();
*/

/****************************************************************************/
// PART 1 - HELP SCREEN CREATURE DISPLAY
/****************************************************************************/

/****************************************************************************/
// FireHelpCreauture()
// Displays the help character on the screen in a flash object written onto
// a DIV.
/****************************************************************************/
function FireHelpCreauture() {
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"');
	document.write('WIDTH="106" HEIGHT="600" id="swfCreature" ALIGN="left" VIEWASTEXT><param name="wMode" value="transparent"/><PARAM NAME=movie VALUE="/images/layout/firegg4.swf"');
	document.write('<PARAM NAME=menu VALUE=false>');
	document.write('<PARAM NAME=quality VALUE=high>');
	document.write('<PARAM NAME=scale VALUE=exactfit>'); 
	document.write('<PARAM NAME=Loop VALUE=true>');
	document.write('<PARAM NAME=wmode VALUE="transparent">');
	document.write('<EMBED src="/images/layout/firegg4.swf" wmode="transparent" menu=false quality=high scale=exactfit loop =true WIDTH="106" HEIGHT="600" NAME="firegg4.swf" ALIGN="left"');
	document.write('TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');						
	document.write('</OBJECT>');

}

/****************************************************************************/
// setDragElement()
// sets coordinates to use when dragging the help DIV around
/****************************************************************************/	
function setDragElement(drag,e)
{
	if(typeof e=="undefined")e=window.event;
	target=(typeof e.target=="undefined")? e.srcElement: e.target;

	if(target.className!="dragHandle")
		return false;
	
	mouseover=true
	pleft=document.getElementById('divHelp').style.pixelLeft
	ptop=document.getElementById('divHelp').style.pixelTop
	xcoor=e.clientX
	ycoor=e.clientY
	document.onmousemove=moveImage

}

/****************************************************************************/
// moveImage()
// moves the image around the window while dragging the mouse.
/****************************************************************************/	
function moveImage()
{
	if (mouseover&&event.button==1)
	{
		document.getElementById('divHelp').style.pixelLeft=pleft+event.clientX-xcoor
		document.getElementById('divHelp').style.pixelTop=ptop+event.clientY-ycoor
		return false
	}
}

/****************************************************************************/
// stopDrag()
// turns off dragging mode.
/****************************************************************************/	
function stopDrag()
{
	mouseover=false
}

/****************************************************************************/
// closeHelpWindow()
/****************************************************************************/	
function closeHelpWindow() {

    var helpscreen = document.getElementById('divHelp');
    var cbTurnOffHelp = document.getElementById('cbDisable');

    helpscreen.style.display = "none";

    //Turn off help windows
    if (cbTurnOffHelp.checked)
        createCookie(helpCookie, 'false', 1000); // name,value,days 

    // show select boxes
    var sel = document.getElementsByTagName("SELECT");
    for (i = 0; i < sel.length; i++) {
        if (sel[i].style.visibility != "visible") { sel[i].style.visibility = "visible"; }
    }
}

/****************************************************************************/
// PART 2 - COOKIE FUNCTIONS
/****************************************************************************/

//Help cookie - The user can turn off the help screens and vise versa
var helpCookie = 'toggleHelp' ;
var cookieHelpMenu='HelpMenu';

function createCookie(name,value,days)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i<ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}

/*Tree utils  */
var maxGroups = 100;

function readCookies()
{
	if (readCookie(cookieHelpMenu) != null)
	{
		var objectID=readCookie(cookieHelpMenu);
		var objCat = document.getElementById(objectID+"_items");
		var imgCat=document.getElementById(objectID+"_img_toggle");
		
		objCat.style.display = "block";
		imgCat.src = "/Images/layout/plus_c.gif";
	}
}

function ToggleCategoryItems(id)
{
	var theItemsTr = document.getElementById(id + "_items");
	var toggleImg  = document.getElementById(id + "_img_toggle");
	
	if (theItemsTr.style.display == 'block')
		{
			theItemsTr.style.display = 'none';
			toggleImg.src = '/Images/layout/plus.gif';
			eraseCookie(cookieHelpMenu);
		}			
	else
		{
			theItemsTr.style.display = 'block';	
			toggleImg.src = '/Images/layout/plus_c.gif';
			createCookie(cookieHelpMenu, id, 100);
		}	
}
//Expand or collapse the tree
function ToggleCollapse()
{
	var isCollapsed = document.getElementById('IsCollapsed');
	var imgToggle = document.getElementById('img_ToggleCollapse');
	var divItems ;
	var trCatefory;
	var imgSignPath ;
	var strDisplay;
	
	if (isCollapsed.value == 'true')
		{		
			isCollapsed.value = 'false';
			strDisplay = 'block';
			imgSignPath = '/Images/layout/plus_c.gif' ;	
		}
		else
		{
			isCollapsed.value = 'true';
			strDisplay = 'none';
			imgSignPath = '/Images/layout/plus.gif' ;		
		}
		
		//Toggle the plus sign
		imgToggle.src = imgSignPath;
		//Exapnd or collpase all nodes
		for(i=0; i< maxGroups; i++)
		{
			divItems = document.getElementById('cat' + i+ '_items');
			trCatefory = document.getElementById('cat' + i+ '_img_toggle');
			if (trCatefory != null)
				trCatefory.src = imgSignPath;
			if (divItems != null)
				divItems.style.display = strDisplay;
		}
}

/***************************************************/
//Albums
/***************************************************/

function GetUrlParam(paramName)
{
    var paramVal = '';
    var oMatch;
    var oRegex  = new RegExp('[\?&]' + paramName + '=([^&]+)', 'i');
    var query   = window.top.location.search;

    if (typeof(query)   == 'undefined' ||
        query           == '')
    {
        query   = document.location.href;
    }

    oMatch      = oRegex.exec(query);
	
    if (oMatch &&
        oMatch.length > 1)
	{
	    paramVal = oMatch[1];
	}
	
	return paramVal;
}

/***************************************************/
// Forums
/***************************************************/

// delete a specific post
function confirmDeletePost(postId, forumId) {
	if (confirm('?האם אתה בטוח שברצונך למחוק את ההודעה וכל התגובות אליה'))
		location.href='/Manage/Forums_DeletePost.aspx?PostID='+postId+'&ForumID='+forumId;
	
}

function CheckSurvey(surveyObjId, resultObjId)
{
    var isAnswerSelected    = false;
    //var flag              = 0;
    //var inputObj; 

    if (typeof (surveyObjId)    != "undefined" && 
        surveyObjId             != null) 
    {
        isAnswerSelected    = $('#' + surveyObjId + ' input[type=radio]:checked').length > 0;
    }
    /*
    else
    {
        inputObj            = document.getElementsByTagName('input'); 

        for (i = 0; i < inputObj.length; i++) 
	    { 
            if (inputObj[i].type                        == 'radio' &&
                inputObj[i].name.indexOf('rdAnswers')   > 0) 
		    {
                if (inputObj[i].checked == true)
                {
                    isAnswerSelected = true;

                    break;
                }
		    }
        } 
    }
    */

    if (isAnswerSelected == false) 
	{
        var obj; 

        if (typeof (resultObjId)    != "undefined" && 
            resultObjId             != null) 
        {
            obj                 = $('#' + resultObjId)[0];
        }
        else
        {
            obj                 = document.getElementById('lblResult'); 
        }

        if (typeof (obj)    != "undefined" &&
            obj             != null)
        {
            obj.style.display   = 'block';
        }
	}

    return isAnswerSelected;
}

function CheckListChoise (obj)
{
	if ((obj.value == 'rbUsersSkins')) 
	{
		 document.getElementById('sharedList').style.display = 'block';
	}
	else
		 document.getElementById('sharedList').style.display = 'none';
}

/***************************************************/
// CheckCellPhone()
/***************************************************/
function CheckCellPhone()
{
    var ddl = document.getElementById('lst_Code');
    var txt = document.getElementById('txt_Cellephone');
    var lbl =  document.getElementById('lbl_CellPhone');
    var exp = /[0-9]{7}/;
    
    if (txt.value == '' && ddl.value == '0')
    {
        lbl.innerText = '';
        return true;
    } 
       
    if (txt.value == '' && ddl.value != '0')
    {
       lbl.innerText = 'נא להזין מספר בן 7 ספרות';
       return false; 
     }  
        
    if (txt.value != '' && ddl.value == '0')
    {
        lbl.innerText = 'נא לבחור קידומת';
       return false; 
    }
    
    if (txt.value != '' && ddl.value != '0')
    {
       if (!exp.test(txt.value))
       {
            lbl.innerText= 'מספר סלולארי חייב להיות בן 7 ספרות בלבד';
            return false; 
       }
       else
       {
            lbl.innerText = '';                
            return true;
       } 
    }
}

/*
ShowFlash
*/
function ShowFlash (flash)
{
	document.write(flash);
}

/*
write flash 
*/
function writeFlash(flash)
{
	document.write(flash);
}

function OpenNewPopUp(path, paramName) {
    var height = 530;
    var width = 705;
    var x = (maxX - width) / 2;
    var y = (maxY - height) / 2;

    if (paramName.toLower() == "siteid") {
        var paramVal = document.getElementById("spanSiteNumber").innerHTML.replace("מס' אתר", "") * 1;
        path = path + "?siteid=" + paramVal;
    }
    
    window.open(path, '', 'status=yes,scrollbars=no,width=' + width + ',height=' + height + ',screenX=' + x + ',screenY=' + y + ',top=' + y + ',left=' + x);
}

/*
opens a popup window with a random name
*/
function OpenPopUp(file, width, height)
{
	var maxY = screen.availHeight;
	var maxX = screen.availWidth;  
	var x = (maxX - width) / 2;
	var y = (maxY - height) / 2;
	var winName = 'win_' + Math.floor(Math.random()*9999999999);
    var w = window.open(file,winName,'status=yes,scrollbars=no,width='+width+',height='+height+',screenX='+x+',screenY='+y+',top='+y+',left='+x);
    if (w != null)
	    w.focus();
	    
	return w;
}

/*
Function open popup window
*/
function OpenPopUpScroll(file, width, height)
{
	var maxY = screen.availHeight;
	var maxX = screen.availWidth;  
	var x = (maxX - width) / 2;
	var y = (maxY - height) / 2;
	var w = window.open(file,'','status=yes,scrollbars=yes,width='+width+',height='+height+',screenX='+x+',screenY='+y+',top='+y+',left='+x);
	if (w != null)
		w.focus();

	return w;
}

/*
 * open popup window with name and optional scroll
 * omit scroll parameter to not use scrollbars
 */
function OpenNamePopUp(file, name, width, height, scroll) {
	var maxY = screen.availHeight;
	var maxX = screen.availWidth;  
	var x = (maxX - width) / 2;
	var y = (maxY - height) / 2;
	var w = window.open(file, name, 'status=yes,scrollbars='+(scroll==''?'no':scroll)+',width='+width+',height='+height+',screenX='+x+',screenY='+y+',top='+y+',left='+x);
	if (w != null)
		w.focus();

	return w;
}

/*
 * popupCalendar(u)
 * pops up the calendar window
 */
function popupCalendar(u, event) 
{
	var width=243, height=176;
	var x = event.screenX-width-20;
	var y = event.screenY;
	var w = window.open(u,'date_chooser','status=yes,scrollbars=no,width='+width+',height='+height+',screenX='+x+',screenY='+y+',top='+y+',left='+x);
	w.focus();
}

// get the selected date from calander popup
// or from a textbox
function CalendarDateChanged(txtId, dateDay, updateDateRange, showPublishDate, timeRangeDDLId)
{
    var txt             = $('#' + txtId);
    var ddlRangeDateId  = 'ddlTimeRange';
    var ddlRangeDate;
    var chkShowPubDate;
    var previousDate;
    var currentDate;

    if (typeof (txt)    != undefined && 
        txt             != null)
    {
        currentDate     = $(txt).val();

        if (dateDay                         == null && 
            typeof($(txt).attr('last-val')) != undefined)
        {
            previousDate = $(txt).attr('last-val');
        }

        if ((dateDay != null && currentDate != dateDay) ||
            (dateDay == null && currentDate != previousDate))
        {
            if (updateDateRange == true)
            {
                if (typeof (timeRangeDDLId) != 'undefined'  &&
                    timeRangeDDLId          != null         &&
                    timeRangeDDLId          != '')
                {
                    ddlRangeDateId  = timeRangeDDLId;
                }

                ddlRangeDate        = $('#' + ddlRangeDateId);

                if (typeof (ddlRangeDate)                                        != undefined   && 
                    ddlRangeDate                                                 != null        && 
                    $('#' + ddlRangeDateId + ' option[value=CustomDate]').length == 0)
                {
                    $('#' + ddlRangeDateId).append($('<option>', { value: 'CustomDate', text: 'טווח זמן מותאם' }));
                    $('#' + ddlRangeDateId).val('CustomDate');
                }
            }
            else if (showPublishDate == true)
            {
                chkShowPubDate = $('#chkShowPublishDate');

                if (typeof (chkShowPubDate) != undefined    &&
                    chkShowPubDate          != null)
                {
                    $('#chkShowPublishDate').attr('checked', true);
                }
            }
        }

        // if the textbox value changed dont set it's value again
        if (dateDay != null)
        { 
            $(txt).val(dateDay);
        }
    }
}

/*Browsercheck object (coolmenus)*/
function cm_bwcheck(){
	//In theory we should use object detection, but this script needs work-arounds for almost every browser...
	this.ver=navigator.appVersion
	this.agent=navigator.userAgent.toLowerCase()
	this.dom=document.getElementById?1:0
	this.ns4=(!this.dom && document.layers)?1:0;
	this.op=window.opera 
	this.moz=(this.agent.indexOf("gecko")>-1 || window.sidebar)
	this.ie=this.agent.indexOf("msie")>-1 && !this.op
	if(this.op){
		this.op5=(this.agent.indexOf("opera 5")>-1 || this.agent.indexOf("opera/5")>-1)
		this.op6=(this.agent.indexOf("opera 6")>-1 || this.agent.indexOf("opera/6")>-1)
		this.op7=this.dom&&!this.op5&&!this.op6 //So all higher opera versions will use it
	}else if(this.moz) this.ns6 = 1
	else if(this.ie){
		this.ie4 = !this.dom && document.all
  	this.ie5 = (this.agent.indexOf("msie 5")>-1)
  	this.ie55 = (this.ie5 && this.agent.indexOf("msie 5.5")>-1)
  	this.ie6 = this.dom && !this.ie4 && !this.ie5 && ! this.ie55
	}
	this.mac=(this.agent.indexOf("mac")>-1)
	this.bw=(this.ie6 || this.ie5 || this.ie4 || this.ns4 || this.ns6 || this.op5 || this.op6 || this.op7)
  this.usedom= this.ns6||this.op7//Use dom creation
  this.reuse = this.ie||this.op7||this.usedom //Reuse layers
  this.px=this.dom&&!this.op5?"px":""
	return this
}
var bw=new cm_bwcheck()

// Get the top & left of an html element
function findPos(objId)
{
    if (bw.ns4)
    {
        //Netscape 4
        x = document.layers.layerMenu.pageX
        y = document.layers.layerMenu.pageY
    }
    else
    {
        //other browsers
        x = 0; y = 0;
        var el, temp;

        el = bw.ie4 ? document.all[objId] : document.getElementById(objId);

        if (el != null && typeof (el) != "undefined")
        {
            if (el.offsetParent)
            {
                temp = el

                while (temp.offsetParent)
                {
                    //Looping parent elements to get the offset of them as well
                    temp=temp.offsetParent; 
                    x+=temp.offsetLeft
                    y+=temp.offsetTop;
                }
            }

            x+=el.offsetLeft
            y+=el.offsetTop
        }
    }

    //Returning the x and y as an array
    return [x,y]
}

// utility function that gets the mouse event coords relative to the document
function getMouseCoords(e) {
    var posx = 0;
    var posy = 0;
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
    }

    //Returning the x and y as an array
    return [posx, posy];
}

// on catalog item edit screen, chooses between catalog extra options
function setExtraGroupOptions(type, ddlGroupId, hdnTypeId, divExCheckboxId, divExRadioId, divExDropDownId)
{
    /*
	var checkbox            = document.getElementById(divExCheckboxId);
	var radio               = document.getElementById(divExRadioId);
	var dropdown            = document.getElementById(divExDropDownId);
	var dropDownListGroup   = document.getElementById(ddlGroupId);
	var hdnType             = document.getElementById(hdnTypeId);
    */
    var checkbox            = $('#' + divExCheckboxId)[0];
	var radio               = $('#' + divExRadioId)[0];
	var dropdown            = $('#' + divExDropDownId)[0];
	var dropDownListGroup   = $('#' + ddlGroupId)[0];
	var hdnType             = $('#' + hdnTypeId)[0];

	switch (type) 
    {
        case "radio":
            if ($(radio).hasClass('is-disabled') == false)
            {
                radio.style.backgroundColor             = '#FFFFAD';
		        checkbox.style.backgroundColor          = '';
		        dropdown.style.backgroundColor          = '';
		        dropDownListGroup.style.backgroundColor = '#FFFFAD';
		        hdnType.value                           = '1';
            }
            break;
        case "dropdownlist":
            if ($(dropdown).hasClass('is-disabled') == false)
            {
                dropdown.style.backgroundColor          = '#FFFFAD';
                radio.style.backgroundColor             = '';
                checkbox.style.backgroundColor          = '';
                dropDownListGroup.style.backgroundColor = '#FFFFAD';
                hdnType.value                           = '2';
            }
            break;
        default:
            // checkbox
            if ($(checkbox).hasClass('is-disabled') == false)
            {
                radio.style.backgroundColor             = '';
                dropdown.style.backgroundColor          = '';
		        checkbox.style.backgroundColor          = '#FFFFAD';
		        //dropDownListGroup.selectedIndex       = 0;
		        dropDownListGroup.style.backgroundColor = '';
		        hdnType.value                           = '0';
            }
            break;
    }
}

// selects or unselects all checkboxes on the page
function selectAll(status) {
    var inputs = document.getElementsByTagName("input");
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox")
            inputs[i].checked = status;
    }
}

// shows the catalog settings help screen
function toggleCatalogSettingsHelp(screenId) {
    var e = document.getElementById('divCatalogSettingsHelp' + screenId);
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

// toggles and element's display
function toggleElementDisplay(elementId) {
    var e = document.getElementById(elementId);
    if (e.style.display == 'block')
        e.style.display = 'none';
    else
        e.style.display = 'block';
}

// adds a function to body onload
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

// adds a function to body onresize
function addResizeEvent(func) {
    var oldonload = window.onresize;
    if (typeof window.onresize != 'function') {
        window.onresize = func;
    } else {
        window.onresize = function() {
            oldonload();
            func();
        }
    }
}

// toggles an element's display and the +/- image of similar ID
function ToggleDisplay(ID) {
    var tableRow = document.getElementById(ID);
    var img = document.getElementById('img_' + ID);

    if (tableRow.style.display == 'none') {
        tableRow.style.display = 'block';
        img.src = "/Images/layout/plus_c.gif";
    }
    else {
        tableRow.style.display = 'none';
        img.src = "/Images/layout/plus.gif";
    }
}

function ToggleDisplay2(ElementID, ImageID) {
    var elm = document.getElementById(ElementID);
    var img = document.getElementById(ImageID);

    if (elm.style.display == 'none') {
        elm.style.display = 'block';
        img.src = "/Images/layout/plus_c.gif";
    }
    else {
        elm.style.display = 'none';
        img.src = "/Images/layout/plus.gif";
    }
}

// used to implement radio button group functionality when inside a repeater
// see http://www.codeguru.com/csharp/csharp/cs_controls/custom/article.php/c12371/
function SetUniqueRadioButton(nameregex, current) {
    re = new RegExp(nameregex);
    for (i = 0; i < document.forms[0].elements.length; i++) {
        elm = document.forms[0].elements[i]
        if (elm.type == 'radio') {
            if (re.test(elm.name)) {
                elm.checked = false;
            }
        }
    }
    current.checked = true;
}

// this will open the domain search window from the main site
function OpenDomainSearch() {
    var name = document.getElementById('txtDomain').value;
    var ending = document.getElementById('selectDomain').value;

    var url = '/Manage/Domain_Upgrade.aspx?fromMain=1&name=' + name + '&ending=' + ending;
    
    window.open(url, 'domain_search', 'width=705,height=530');
}

function PackagesAndHosting() {
    var siteNum = document.getElementById("spanSiteNumber").innerHTML;

    siteNum = siteNum.replace("מס' אתר", "") * 1;
    var url = "/Manage/Package_Upgrade.aspx?Site_ID=" + siteNum; ;

    window.open(url, 'package_upgrade', 'width=705,height=530');
}

function Renewlas() {
    var siteNum = document.getElementById("spanSiteNumber").innerHTML;

    siteNum = siteNum.replace("מס' אתר", "") * 1;
    var url = "/Manage/Renewals.aspx?Site_ID=" + siteNum; ;

    window.open(url, 'renewals', 'width=705,height=530');
}

function UpdateQueryString(key, value, url)
{
    if (!url) url = window.location.href;
    var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)(.*)", "gi");

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            return url.replace(re, '$1$3').replace(/(&|\?)$/, '');
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = url.indexOf('?') !== -1 ? '&' : '?',
                hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (hash[1]) url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

function SetFloatingDivPosition(divId, imgId, leftPx, topPx, divParentId)
{
    var div         = document.getElementById(divId);
    var pos         = findPos(imgId);
    var divParent;
    var parentWidth = 0;

    if (typeof (divParentId) != "undefined" && divParentId != "")
    {
        pos         = findPos(divParentId);
        divParent   = document.getElementById(divParentId);
        parentWidth = divParent.scrollWidth;
    }

    if (div != null && typeof(div) != "undefined" &&
        pos != null && typeof(pos) != "undefined")
    {
        div.style.left  = pos[0] + parentWidth - leftPx + 'px';
        div.style.top   = pos[1] + topPx + 'px';
    }
}

function ShowSelectedHelp(divId)
{
    $("#" + divId).toggle();

    var divArray;

    if ($("div.popupDivHelp").length > 0)
        divArray = $("div.popupDivHelp");
    else if ($("div.yellowPopupDiv").length > 0)
        divArray = $("div.yellowPopupDiv");

    $(divArray).each(function ()
    {
        var objId = $(this).attr('id');

        if (objId != divId)
            $(this).css("display", "none");
    });
}

function HideAllHelpDivs(img)
{
    //$(img).parent().parent().css("display", "none");
    //$("div.popupDivHelp").css("display", "none");

    if ($("div.popupDivHelp").length > 0)
        $("div.popupDivHelp").css("display", "none");
    else if ($("div.yellowPopupDiv").length > 0)
        $("div.yellowPopupDiv").css("display", "none");
}

function toggleSettingsHelp(id) 
{
	var divHelpBubble   = document.getElementById('divHelp' + id);
    var pos;

    try
    {
        // if jQuery library is not exists or position() is not supported
        pos             = $('#imgQ' + id).position();
    }
    catch (e)
    {

    }

    if (pos             != null &&
        typeof (pos)    != "undefined")
    {
        
        divHelpBubble.style.left    = pos.left - $(divHelpBubble).outerWidth() + 15 + 'px';
	    divHelpBubble.style.top     = pos.top + 20 + 'px';
    }
    else
    {
        pos                         = findPos('imgQ' + id);

        divHelpBubble.style.left    = pos[0] - $(divHelpBubble).outerWidth() + 15 + 'px';
        divHelpBubble.style.top     = pos[1] + 20 + 'px';
    }
		
	toggleElementDisplay(divHelpBubble.id);
}

function InputFocus(obj, initValue, styleSettings)
{
    if (obj.value == initValue || 
        initValue == '')
    {
        obj.value = '';

        if (typeof (styleSettings)  != "undefined" &&
            styleSettings           != '')
        {
            var style = styleSettings.split(';');

            for (var i = 0; i < style.length; i++) 
            {
                if (style != '')
                {                     
                    $(obj).css(style[i].split(':')[0], style[i].split(':')[1]);
                }                
            }
        }
    }
}

function InputBlur(obj, initValue, styleSettings)
{
    if (obj.value == '' && 
        initValue != '')
    {
        obj.value = initValue;

        if (typeof (styleSettings)  != "undefined" &&
            styleSettings           != '')
        {
            var style = styleSettings.split(';');
            
            for (var i = 0; i < style.length; i++)
            {                
                $(obj).css(style[i].split(':')[0], style[i].split(':')[1]);
            }
        }
    }
}

function CopyToClipboard()
{
    var lnk = $('#txtConvertedLink');

    try
    {
        lnk.select();
        document.execCommand('copy');
    }
    catch (e) 
    {
        console.log('Oops, unable to copy');
        console.log(e);
    }
}

function FilterKeyCodes(e, validKeyboard)
{
    switch (validKeyboard)
    {
        case enums.validKeyboard.DATE:
            switch (e.keyCode)
            {
                case enums.keyboard.BACKSPACE:
                case enums.keyboard.DELETE:
                case enums.keyboard.HOME:
                case enums.keyboard.END:
                case enums.keyboard.TAB:
                case enums.keyboard.ENTER:
                case enums.keyboard.LEFT_ARROW:
                case enums.keyboard.RIGHT_ARROW:
                case enums.keyboard.FORWARD_SLASH:
                case enums.keyboard.DIVIDE:
                case enums.keyboard.BACK_SLASH:
                case enums.keyboard.DECIMAL:
                case enums.keyboard.PERIOD:
                case enums.keyboard.SPACE:
                case enums.keyboard.DASH:
                case enums.keyboard.SUBTRACT:
                case enums.keyboard.KEY_0:
                case enums.keyboard.KEY_1:
                case enums.keyboard.KEY_2:
                case enums.keyboard.KEY_3:
                case enums.keyboard.KEY_4:
                case enums.keyboard.KEY_5:
                case enums.keyboard.KEY_6:
                case enums.keyboard.KEY_7:
                case enums.keyboard.KEY_8:
                case enums.keyboard.KEY_9:
                case enums.keyboard.NUMPAD_0:
                case enums.keyboard.NUMPAD_1:
                case enums.keyboard.NUMPAD_2:
                case enums.keyboard.NUMPAD_3:
                case enums.keyboard.NUMPAD_4:
                case enums.keyboard.NUMPAD_5:
                case enums.keyboard.NUMPAD_6:
                case enums.keyboard.NUMPAD_7:
                case enums.keyboard.NUMPAD_8:
                case enums.keyboard.NUMPAD_9:
                    return;
                    break;
                default:
                    e.preventDefault();
                    break;
            }
            break;
        case enums.validKeyboard.NUMERIC:
            switch (e.keyCode)
            {
                case enums.keyboard.BACKSPACE:
                case enums.keyboard.DELETE:
                case enums.keyboard.HOME:
                case enums.keyboard.END:
                case enums.keyboard.TAB:
                case enums.keyboard.ENTER:
                case enums.keyboard.LEFT_ARROW:
                case enums.keyboard.RIGHT_ARROW:
                case enums.keyboard.KEY_0:
                case enums.keyboard.KEY_1:
                case enums.keyboard.KEY_2:
                case enums.keyboard.KEY_3:
                case enums.keyboard.KEY_4:
                case enums.keyboard.KEY_5:
                case enums.keyboard.KEY_6:
                case enums.keyboard.KEY_7:
                case enums.keyboard.KEY_8:
                case enums.keyboard.KEY_9:
                case enums.keyboard.NUMPAD_0:
                case enums.keyboard.NUMPAD_1:
                case enums.keyboard.NUMPAD_2:
                case enums.keyboard.NUMPAD_3:
                case enums.keyboard.NUMPAD_4:
                case enums.keyboard.NUMPAD_5:
                case enums.keyboard.NUMPAD_6:
                case enums.keyboard.NUMPAD_7:
                case enums.keyboard.NUMPAD_8:
                case enums.keyboard.NUMPAD_9:
                    return;
                    break;
                default:
                    e.preventDefault();
                    break;
            }
            break;
    }
}

function ValidateDForm(formId, hidUrlId)
{
    var isValid     = true;
    var isFocusSet  = false;
    var ctlId;
    var lastCtlId   = '';
    var parentUrl;
    var hval;

    if (typeof (Page_ClientValidate) == 'function')
    {
        Page_ClientValidate(formId);

        if (Page_IsValid == false)
        {
            isValid = false;

            for(i=0; i < Page_Validators.length; i++)
            {
                ctlId = Page_Validators[i].controltovalidate;

                if (lastCtlId == '' || 
                    lastCtlId != ctlId)
                {
                    lastCtlId = ctlId;

                    $('#' + lastCtlId).removeClass('dform-input-error');
                    $('#' + lastCtlId).removeAttr('aria-invalid');
                }

                if (typeof($('#' + ctlId)[0])   != 'undefined'  &&
                    $('#' + ctlId)[0].tagName   == "INPUT"      &&
                    $('#' + ctlId)[0].type      == "text")
                {
                    Page_Validators[i].onclick = function ()
                    {
                        var cId = $(this)[0].controltovalidate;
                        $('#' + cId).select();
                    };
                }

                if(Page_Validators[i].isvalid == false)
                {
                    $('#' + ctlId).addClass('dform-input-error');
                    $('#' + ctlId).attr('aria-invalid', 'true');

                    if (isFocusSet == false)
                    {
                        $('#' + ctlId).select();

                        isFocusSet = true;
                    }
                }
                else if (lastCtlId                           != ctlId &&
                         $('#' + ctlId).attr('aria-invalid') == 'true')
                {
                    $('#' + ctlId).attr('aria-invalid', 'false');
                }
            }
        }
    }

    if (isValid == true)
    {
        parentUrl   = window.parent.location.href;
        hval        = document.getElementById(hidUrlId);
        hval.value  = parentUrl;
    }

    return isValid;
}