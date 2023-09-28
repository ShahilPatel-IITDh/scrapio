//	Extensions of Standard Types -----------------------------------------------

//	Create a String.escape() method that uses UTF-8
String.prototype.escape = function() 
	{
	return encodeURIComponent(this).replace(/'/g, '%27').replace(/"/g, '%22');
	};
	
//	Create a String.unescape() method that uses UTF-8
String.prototype.unescape = function() 
	{
	return decodeURIComponent (this);
	};

//	Create a String.trim() method
String.prototype.trim = function() 
	{
	//	Skip leading and trailing whitespace and return everything in between
	var x = this;
	if (x)
		{
		x = x.replace (/^\s*(.*)/,  "$1");
		x = x.replace (/(.*?)\s*$/, "$1");
		}
	return x;
	};
	
//	Create a String.clean() method
String.prototype.clean = function() 
	{
	//	Skip leading and trailing whitespace. Remove all internal multiple spaces sequences
	var x = this;
	if (x)
		{
		x = x.replace (/^\s*(.*)/,  "$1");
		x = x.replace (/(.*?)\s*$/, "$1");
		x = x.replace (/\s+/g, ' ');
		}
	return x;
	};
	
//	Add trailing 's' if warranted
String.prototype.plural = function (count) 
	{
	if (count != 1)
		return this + 's';
	else
		return this;
	};
	
//	{{ }} replacement
String.prototype.replaceCurlies = function (lookup, encoded, escaped, exclusions ) 
	{
	encoded = encoded || false;
	escaped = escaped || false;
	exclusions = exclusions || null;
	var template = this;
	var startCurly = encoded ? '%7B%7B' : '{{';
	var endCurly = encoded ? '%7D%7D' : '}}';
	var results = [];
	var nextChar = 0;
	var nextCurlies = template.indexOf( startCurly );
	var startChar, endCurlies;
	while ( nextCurlies >= 0 ) 
		{
		startChar = nextChar;
		endCurlies = template.indexOf( endCurly, nextCurlies );
		if ( endCurlies >= 0 ) 
			{
			nextChar = endCurlies + endCurly.length;
			var paramName = template.substring( nextCurlies + startCurly.length, endCurlies );
			var innerCurlies = paramName.lastIndexOf( startCurly );
			if ( innerCurlies != -1 ) 
				{
				nextCurlies += startCurly.length + innerCurlies;
				paramName = template.substring( nextCurlies + startCurly.length, endCurlies );
				}
			var paramValue = lookup[paramName];
			if ( paramValue !== undefined && paramValue !== null ) 
				{
				results.push( template.substring( startChar, nextCurlies ) );
				if ( Object.prototype.toString.call( paramValue.render ) == '[object Function]' )
					paramValue.render( results );
				else
					{
					if ( escaped ) 
						{
						paramValue = paramValue.toString();
						if( (!exclusions || exclusions.indexOf(paramName,0,false) < 0) && "&nbsp;" != paramValue)
							paramValue = paramValue.escapeHTML();
						}
					results.push( paramValue );
					}
				}
			else 
				results.push( template.substring( startChar, nextChar ) );
			}
		else
			{
			nextChar = nextCurlies + startCurly.length;
			results.push( template.substring( startChar, nextChar ) );
			}
		nextCurlies = template.indexOf( startCurly, nextChar );
		}
	if ( nextChar == 0 ) return template;
	if ( nextChar < template.length )
		results.push( template.substring( nextChar ) );
	return results.join('');
	}; 

// {{ }} replacement -- with escapeHTML() for strings in lookup
// Optional array of exclusions (names) to not escapeHTML
String.prototype.replaceCurliesEscaped = function(lookup, exclusions)
	{
	return this.replaceCurlies( lookup, false, true, exclusions );	
	};

//	{{ }} replacement
String.prototype.replaceEncodedCurlies = function (lookup) 
	{
	return this.replaceCurlies( lookup, true );	
	};
	
//	{{escape}} and {{{raw}}} replacement.
String.prototype.replaceCurlies2 = function (lookup, startCurly, endCurly)
	{
	if (!(startCurly && endCurly))
		{
		return this.replaceCurlies2(lookup, '{{{', '}}}').replaceCurlies2(lookup, '{{', '}}');
		}
		
	var curlyLength  = startCurly.length;
	var escapeNeeded = curlyLength == 2;
	
	var pieces = [];
	
	var template = this;
		
	var startPoint = 0;
		
	var done = false;
	while (!done)
		{
		//	At entry, everything to the left of startPoint has been processed and is in the pieces array.
		
		var index = template.indexOf (startCurly, startPoint);
		
		if (index == -1)
			//	Could not find open curly. Done.
			{
			if (startPoint == 0)
				//	Optimization
				return template;
				
			pieces.push (template.substring (startPoint, template.length));
			done = true;
			
			break;
			}
			
		//	Advance start point
		pieces.push (template.substring (startPoint, index));
		startPoint = index;
		
		//	Look for close curly
		var index2 = template.indexOf (endCurly, startPoint);
		
		if (index2 == -1)
			//	Did not find close curly. Awkward. But done.
			{
			pieces.push (template.substring (startPoint, template.length));
			done = true;
			
			break;
			}
			
		//	Found close curly	
		var key 	= template.substring (index+curlyLength, index2);
		var value 	= lookup[key];
		if (value !== undefined && value !== null)
			{
			pieces.push (escapeNeeded ? value.escapeHTML() : value);
			}
		else
			{
			pieces.push ('!!!!' + key + '!!!!');	//	so people pay attention
			}
			
		startPoint = index2+curlyLength;
		}
		
	return results.join('');
	};
		
//	Create a String.dequote() method to remove quotes
String.prototype.dequote = function () 
	{
	var x = this;
	if (x.length < 2)
		return x;
	c0 = x.charAt(0);
	c1 = x.charAt(x.length-1);
	if (c0 == c1 && (c0 == '"' || c0 == '\''))
		x = x.substring (1, x.length-1);
	return x;
	}
	
//	Create a String.startsWith() method
String.prototype.startsWith = function (str)
	{
	if (!str)
		return false;
	return this.indexOf(str) == 0;
	};
	
//	Remove all HTML tags
String.prototype.stripHTML = function ()
	{
	var strInputCode = this;
		
	//	Replace any escaped &lt; with < and &gt;  with >
	strInputCode = strInputCode.replace (/&(lt|gt);/g, function (strMatch, p1) { return (p1 == "lt")? "<" : ">"; });
		
	return strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
	};

String.prototype.stripStyleTags = function ()
	{
	var strInputCode = this;
	strInputCode = strInputCode.trim();
	strInputCode = strInputCode.replace(/^<style[^>]+(>|$)/g, "");
	strInputCode = strInputCode.replace(/^<\/style>$/g, "");
	return strInputCode;
	};

//	Remove all HTML comments
String.prototype.stripHTMLComments = function ()
	{
	return this.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g,'');
	};
	
//	Remove all HTML comments but do not touch those between <script></script> and <style></style> blocks
String.prototype.stripHTMLCommentsCarefully = function ()
	{
	var regX = /<(?:!(?:--[\s\S]*?--\s*)?(>)\s*|(?:script|style|SCRIPT|STYLE)[\s\S]*?<\/(?:script|style|SCRIPT|STYLE)>)/g;	
	return this.replace (regX, function (m, $1) { return $1 ? '' : m; });
	};
	
//	Remove Microsoft Office CSS Attributes
String.prototype.stripMsoClasses = function ()
	{
	return this.replace (/ class="Mso[A-Z][A-Za-z0-9]+"/g, '');
	};

String.prototype.encodeHTML = function ()
	{
	return this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\$/g, '&#36;');
	};

String.prototype.escapeHTML = function()
	{
	return this.encodeHTML();
	}

String.prototype.unescapeHTML = function()
	{
	return this.replace(/\&amp;/g, '&').replace(/\&lt;/g, '<').replace(/\&gt;/g, '>').replace(/&quot;/g, '"').replace(/\&\#39;/g, "'").replace(/\&\#36;/g, '$');
	}
	
//	Cleanup text from TinyMCE
String.prototype.cleanupAfterTinyMCE = function ()
	{
	var strInputCode = this;
	
	strInputCode = strInputCode.stripHTMLCommentsCarefully();	//	This removes all the Microsoft Office CSS Declarations
	strInputCode = strInputCode.stripMsoClasses();		//	This removes all the Microsoft Office injected class= attributes from tags
	
	//	Finally unescape the & which Tiny MCE insists on turning into &amp;
	strInputCode = strInputCode.replace (/&amp;/g, '&');
	
	return strInputCode;
	};

var replaceAmpInTagAttributes = function(html)
	{
	var result = [];
	var begin = 0;
	var index = html.indexOf('<',begin);
	var len = html.length;
	while ( index !== -1 )
		{
		index += 1;
		if ( index + 5 < len && html.substr(index,6) === 'script')
			{
			index = html.indexOf('</script>',index);
			if ( index !== -1 )
				index = html.indexOf('<',index + 9);
			}
		else if ( index < len )
			{
			var firstChar = html.charAt(index);
			if ( firstChar === '!' )
				{
				index = html.indexOf('>',index);
				if ( index !== -1 )
					index = html.indexOf('<',index + 1);
				}
			else if ( ( 'a' <= firstChar && firstChar <= 'z' ) ||
				( 'A' <= firstChar && firstChar <= 'Z' ) )
				{
				var end = html.indexOf('>',index);
				var contents = html.substring(index,end);
				if ( contents.indexOf('&') !== -1 )
					{
					result.push(html.substring(begin,index));
					result.push(contents.replace (/&amp;/g, '&'));
					index = begin = end;
					}
				else index = end;
				if ( index !== -1 )
					index = html.indexOf('<',index + 1);
				}
			}
		else index = -1;
		}
	if ( begin > 0 )
		result.push(html.substring(begin));
	return begin === 0 ? html : result.join('');
	};

//	Cleanup text from TinyMCE
String.prototype.cleanupAfterTinyMCE2 = function ()
	{
	var strInputCode = this;

	strInputCode = strInputCode.stripHTMLCommentsCarefully();	//	This removes all the Microsoft Office CSS Declarations
	strInputCode = strInputCode.stripMsoClasses();		//	This removes all the Microsoft Office injected class= attributes from tags

	//	Finally unescape the & which Tiny MCE insists on turning into &amp;
	strInputCode = replaceAmpInTagAttributes( strInputCode );

	return strInputCode;
	};


String.prototype.cleanupAfterInnerHtml = function ()
	{
	var strInputCode = this;
	if (isFirefox())
		{
		strInputCode = strInputCode.replace (/%7B%7B/g, '{{');
		strInputCode = strInputCode.replace (/%7D%7D/g, '}}');
		}
	return strInputCode;
	};

String.prototype.reverse = function() 
	{
	splitext = this.split("");
	revertext = splitext.reverse();
	reversed = revertext.join("");
	return reversed;
	}
	
String.prototype.compareTo = function (s)
	{
	var len1 = this.length;
	var len2 = s.length;
	var n = (len1 < len2 ? len1 : len2);
				
	for (var i = 0 ; i < n ; i++)
		{
		var a = this.charCodeAt (i);
		var b = s.charCodeAt (i);
			if (a != b)
			  return (a - b);
		}  
	return (len1 - len2);
	};	
	
//	Create an Array.indexOf() method
Array.prototype.indexOf = function (item, i, ignoreCase)
	{
	i || (i = 0);
	ignoreCase || (ignoreCase = false);
	var length = this.length;
	if (i < 0) i = length + i;
	for (; i < length; i++)
		{
	    if (this[i] === item) return i;
	    if( ignoreCase && typeof(item) == 'string' && typeof(this[i]) == 'string' && this[i].toLowerCase() == item.toLowerCase() )
	    	return i;
	  	}
    return -1;
  	};
 
//	Create an Array.contains() method
Array.prototype.contains = function (s)
	{
    for (var i = 0; i < this.length; i++)
    	{
    	if (s == this[i]) 
    		return true;
  		}
  	return false;
	};
 
//	Create an Array.remove() method
Array.prototype.remove = function (s)
	{
    for (var i = 0; i < this.length; i++)
    	{
    	if (s == this[i]) 
    		this.splice (i, 1);
  		}
	};
	
//	Create an Array.toQuotedString() method
Array.prototype.toQuotedString = function (quote, sep)
	{
	var retval = '';
	
	var x = this;
	var n = this.length;
	for (var i = 0; i < n; i++)
		{
		if (i > 0)
			retval += sep;
			
		if (quote)
			retval += quote + x[i] + quote;
		else
			retval += x[i];
		}
	
	return retval;
	};
	
//	Create an Array.toSeparatedString() method
Array.prototype.toSeparatedString = function (sep)
	{
	var retval = '';
	
	var x = this;
	var n = this.length;
	for (var i = 0; i < n; i++)
		{
		if (i > 0)
			retval += sep;
		retval += x[i];
		}
	
	return retval;
	};
	
//	Create an Array.trim() method
Array.prototype.trim = function (str)
	{
    for (var i = 0; i < this.length; i++)
      	this[i] = this[i].trim();
  	};

	// this function constructs a phantom form in the
	// current document, populates the form with hidden fields 
	// from the object passed in (name/value pairs)
	// and submits the form, then deletes it from the
	// document.

	submitPhantomForm = function(method, action, target, fields)
		{
		var myForm 		= 	document.createElement("form");
		myForm.method	=	method;
		myForm.action 	= 	action; 
		myForm.target 	= 	target;
		
		for (var i in fields)
			{
			var inp = document.createElement("input");
			inp.setAttribute("name", i);
			inp.setAttribute("value",fields[i]);
			myForm.appendChild(inp);
			}

		document.body.appendChild(myForm);
		myForm.submit() ;
		document.body.removeChild(myForm) ;
		};

//	Browser Sniffers -----------------------------------------------------------

isWin = function()
	{
	var agent 	= navigator.userAgent.toLowerCase();	
	var is_win  = agent.indexOf("win") != -1;
	return is_win;
	};
	
isWinXP = function()
	{
	return isWinVersion('5.1');
	}

isWin7 = function()
	{
	return isWinVersion('6.1');
	}
	
isWinVersion = function(version)
	{
	var nt_str	= "windows nt ";
	var agent	= navigator.userAgent.toLowerCase();
	var win_idx	= agent.indexOf(nt_str);
	if (win_idx == -1) 
		return false;
	var start_index = win_idx + nt_str.length;
	var agent_version = agent.slice(start_index, start_index+version.length);
	return version === agent_version;
	
	}

isWinIE = function()
	{
	var agent 	= navigator.userAgent.toLowerCase();
	var is_win  = agent.indexOf("win") != -1;
	var is_ie   = agent.indexOf("msie") != -1 && agent.indexOf("opera") == -1;
	return is_win && is_ie;
	};
	
isMozilla = function()
	{	
	var agent 	= navigator.userAgent.toLowerCase();
	var isMoz	= agent.indexOf ("gecko") != -1 && agent.indexOf ("safari") == -1;
	};

isFirefox = function()
	{
	var agt 	= 	navigator.userAgent.toLowerCase();
	var is_ff	=	agt.indexOf("firefox/1") != -1 || agt.indexOf("firefox/2") != -1 || agt.indexOf("firefox/3") != -1;
	return is_ff;
	};
	
isWinFirefox = function()
	{
	var agt 	= 	navigator.userAgent.toLowerCase();
	var is_win  = 	agt.indexOf("win") != -1;
	var is_ff	=	agt.indexOf("firefox/1") != -1 || agt.indexOf("firefox/2") != -1 || agt.indexOf("firefox/3") != -1;
		
	return is_win && is_ff;
	};	

isOpera = function()
	{
	var agent 	= navigator.userAgent.toLowerCase();	
	var is_op	= agent.indexOf("opera") != -1;
	return is_op;
	};

isSafari = function()
	{
	var agent 	= navigator.userAgent.toLowerCase();	
	var is_sf	= agent.indexOf("safari") != -1 && agent.indexOf("chrome") == -1;
	return is_sf;
	};
	
isChrome = function()
	{
	var agent 	= navigator.userAgent.toLowerCase();	
	var is_chr	= agent.indexOf("chrome") != -1;
	return is_chr;
	};	
	
getBrowserTimeZoneOffset = function ()
	{
	var rightNow = new Date();
		
	//	Get Jan 1
	var date1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
		
	//	Get Jan 1 in the local time of this browser
	var temp = date1.toGMTString();											//	e.g., Thu, 1 Jan 2008 22:05:52 GMT
	var date3 = new Date (temp.substring(0, temp.lastIndexOf(" ")-1));
		
	//	Compute time zone offset on Jan 1 when DST cannot apply	  
	return (date3 - date1) / (1000 * 60);
	};
	
getBrowserTimeZoneName = function ()
	{
	var rightNow = new Date();
		
	//	Get Jan 1
	var date1 = new Date(rightNow.getFullYear(), 0, 1, 0, 0, 0, 0);
		
	//	Get Jan 1 in the local time of this browser
	var temp = date1.toGMTString();
	var date3 = new Date (temp.substring(0, temp.lastIndexOf(" ")-1));
		
	//	Compute time zone offset on Jan 1 when DST cannot apply	  
	var delta = (date1 - date3) / (1000 * 60 * 60);
		
	var dd = Math.abs (delta);
	var hh = Math.floor (dd);
	var mm = dd - hh;
		
	if (hh < 10) hh = '0'.concat (hh);
		
	mm = 60 * mm;
	if (mm == 0) mm = '00';
				
	if (delta == 0)
		{
		return "GMT       ";
		}
	else if (delta > 0)
		{
		return "GMT +" + hh + ":" + mm;
		}
	else
		{
		return "GMT -" + hh + ":" + mm;
		}
	};
	
//	ActiveX Loader -------------------------------------------------------------

getActiveX = function (name)
	{
	if (isWinIE ())
		{
		try 		{ return new ActiveXObject (name); }
		catch (e)	{ }
		}
	else if (isWinFirefox())
		{
		try 		{ return new GeckoActiveXObject (name); }
		catch (e)	{ }
		}
	return null;
	};
	
//	Cookies --------------------------------------------------------------------

_setCookie = function (name, value, expires, path, domain, secure)
	{
    document.cookie= name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path)    ? "; path=" + path : "") +
        ((domain)  ? "; domain=" + domain : "") +
        ((secure)  ? "; secure" : "");
	};
	
setCookie = function (name, value)
	{
	//var hour = 60 * 60 * 1000;
	//var expiresDate = new Date (new Date().getTime() + hour);
	_setCookie (name, value, null, '/', null, null);
	};
	
setPermanentCookie = function (name, value)
	{
	var hour = 60 * 60 * 1000;
	var year = 365 * 24 * hour;
	var expiresDate = new Date (new Date().getTime() + year);
	_setCookie (name, value, expiresDate, '/', null, null);
	};

getCookie = function (name)
	{
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1)
    	{
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    	}
    else
    	{
        begin += 2;
    	}
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    	{
        end = dc.length;
    	}
    return unescape(dc.substring(begin + prefix.length, end));
	};

deleteCookie = function (name)
	{
	var expirationDate = new Date();
	expirationDate.setYear (expirationDate.getYear() - 1);
	expirationDate = expirationDate.toGMTString();
    	
    document.cookie = name + "=; expires=" + expirationDate;
    document.cookie = name + "=; path=/; expires=" + expirationDate;
	};

deleteSameSiteCookie = function (name)
{
	var expirationDate = new Date();
	expirationDate.setYear (expirationDate.getYear() - 1);
	expirationDate = expirationDate.toGMTString();

	document.cookie = name + "=; expires=" + expirationDate;
	document.cookie = name + "=; path=/; expires=" + expirationDate;
	document.cookie = name + "=; path=/; secure=true; SameSite=None; expires=" + expirationDate;
};

deleteAllCookies = function ()
	{
	var cookieString = "" + document.cookie;
	var cookieArray  = cookieString.split ("; ");

	// Try to delete each cookie:
	for (var i = 0; i < cookieArray.length; i++)
		{
		var singleCookie = cookieArray[i].split ("=");
		if (singleCookie.length != 2)
			continue;
		var name = unescape (singleCookie [0]);
		deleteCookie (name);
		}
	};
		
//	Number Formatting ----------------------------------------------------------

	formatNumber = function (num)
		{
		var sep 		= ",";
		var decpoint 	= ".";
		
		//	Need a string for operations
		num = num.toString();
		
		// 	Separate the whole number and the fraction if possible
		a = num.split (decpoint);
		x = a [0]; 					// decimal
		y = a [1]; 					// fraction
		z = "";
		
		if (typeof(x) != "undefined") 
			{
		    //	Reverse the digits. regexp works from left to right.
		    for (i = x.length-1; i >= 0; i--)
		    	z += x.charAt (i);
		    	
		    //	Add separators. but undo the trailing one, if there
		    z = z.replace (/(\d{3})/g, "$1" + sep);
		    if (z.slice (-sep.length) == sep)
		      z = z.slice(0, -sep.length);
		    x = "";
		    
		    //	Reverse again to get back the number
		    for (i = z.length-1; i >= 0; i--)
		      	x += z.charAt(i);
		      
		    // 	Add the fraction back in, if it was there
		    if (typeof(y) != "undefined" && y.length > 0)
		      	x += decpoint + y;
		  	}
		  
		return x;
		};

//	Time formatting ------------------------------------------------------------

var _msMin	= 60 * 1000;
var _msHour	= 60 * _msMin;
var _msDay	= 24 * _msHour;

formatValueForPlural = function(number, text) {
	var display = formatNumber(number) + ' ' + text;
	if (number > 1) {
		return display + 's ago';
	}
	return display + ' ago';
}

howLongAgo = function (whenMillis, nowMillis, abbreviated) {
	if (!whenMillis)
		return '';

	if (!nowMillis)
		nowMillis = new Date().getTime();

	var delta = Math.abs(nowMillis - whenMillis);
	var daysAgo = Math.floor (delta / _msDay);
	var hoursAgo = Math.floor ((delta % _msDay)  / _msHour);
	var	minsAgo = Math.floor ((delta % _msHour) / _msMin);

	if (daysAgo > 0) {
		if (abbreviated) {
			return formatNumber(daysAgo) + "d ago"
		}
		return formatValueForPlural(daysAgo, 'day');
	} else if (hoursAgo > 0) {
		if (abbreviated) {
			return formatNumber(hoursAgo) + "h ago"
		}
		return formatValueForPlural(hoursAgo, 'hour');
	} else if (minsAgo > 0) {
		if (abbreviated) {
			return formatNumber(minsAgo) + "m ago"
		}
		return formatValueForPlural(minsAgo, 'minute');
	}
	return 'now';
};

//	Getting Query String Parameter Values --------------------------------------

getParameter = function (queryString, parameterName) 
	{
	if (queryString.length == 0) 
		return null;
	
	var begin = queryString.indexOf (parameterName+"=");
		
	if (begin == -1)
		return null;
		
	begin += parameterName.length+1;
	
	var end = queryString.indexOf ("&", begin);
	if (end == -1) 
		end = queryString.length
	
	return unescape (queryString.substring (begin, end));
	}; 

//	Open a popup window centered on the screen ---------------------------------

popupWindow = function (url, w, h, windowName)
	{	
	
	var left = (screen.width  - w) / 2;
	var top  = (screen.height - h) / 2;
	
	var attr = "left=" + left + ",top=" + top + ",width=" + w + ",height=" + h;
  			
  	attr += ",modal=yes,dependent=yes,resizable=yes,scrollbars=yes,toobar=no,location=no,status=no";
  	
  	windowName = (typeof windowName == 'undefined') ? (new Date()).getTime().toString() : windowName;

	var newwindow = window.open (url, windowName, attr);
	
	if (window.focus) 
		{
		newwindow.focus()
		}
	
	return newwindow;
	};
	
//	Absolute Positioning Support -----------------------------------------------
	
sideLeft = function (element)
	{
	var oNode = element;
		
	var x = oNode.offsetLeft;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		x += oNode.offsetParent.clientLeft;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		x += oNode.offsetLeft;
		}
		
	return x;
	};	
	
sideTop = function (element)
	{
	var oNode = element;
		
	var y = oNode.offsetTop;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		y += oNode.offsetParent.clientTop;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		y += oNode.offsetTop;
		}
		
	return y;
	};
	
sideRight = function (element)
	{
	var oNode = element;
		
	var x = oNode.offsetLeft + oNode.offsetWidth;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		x += oNode.offsetParent.clientLeft;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		x += oNode.offsetLeft;
		}
		
	return x;
	};
	
sideBottom = function (element)
	{
	var oNode = element;
		
	var y = oNode.offsetTop  + oNode.offsetHeight;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		y += oNode.offsetParent.clientTop;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		y += oNode.offsetTop;
		}
		
	return y;
	};
	
cornerTopLeft = function (element)
	{
	var oNode = element;
		
	var x = oNode.offsetLeft;
	var y = oNode.offsetTop;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		x += oNode.offsetParent.clientLeft;
		y += oNode.offsetParent.clientTop;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		x += oNode.offsetLeft;
		y += oNode.offsetTop;
		}
		
	return { x: x, y: y };
	};
	
cornerTopRight = function (element)
	{
	var oNode = element;
		
	var x = oNode.offsetLeft + oNode.offsetWidth;
	var y = oNode.offsetTop;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		x += oNode.offsetParent.clientLeft;
		y += oNode.offsetParent.clientTop;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		x += oNode.offsetLeft;
		y += oNode.offsetTop;
		}
		
	return { x: x, y: y };
	};
	
cornerBottomLeft = function (element)
	{
	var oNode = element;
		
	var x = oNode.offsetLeft;
	var y = oNode.offsetTop  + oNode.offsetHeight;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		x += oNode.offsetParent.clientLeft;
		y += oNode.offsetParent.clientTop;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		x += oNode.offsetLeft;
		y += oNode.offsetTop;
		}
		
	return { x: x, y: y };
	};

cornerBottomRight = function (element)
	{
	var oNode = element;
		
	var x = oNode.offsetLeft + oNode.offsetWidth;
	var y = oNode.offsetTop  + oNode.offsetHeight;
		
	if (navigator.userAgent.indexOf("MSIE") >= 0) 
		{
		x += oNode.offsetParent.clientLeft;
		y += oNode.offsetParent.clientTop;
	  	}
		
	while ((oNode = oNode.offsetParent) != null)
		{
		x += oNode.offsetLeft;
		y += oNode.offsetTop;
		}
		
	return { x: x, y: y };
	};
	
//	Popup Button Support --------------------------------------------------------

aButtonHighlight = function (td, flag)
	{
	var tr = td.parentNode;
	var tds = tr.childNodes;
	for (var i = tds.length-1; i >= 0; i--)
		if (tds[i].nodeName != 'TD')
			tr.removeChild (tds[i]);
	
	if (flag)
		{
		var imgL = tds[0].getElementsByTagName ('IMG');
		if (imgL)
			imgL[0].src = imgL[0].src.replace (/.gif/, '_highlight.gif');
		else
			alert ('L');
			
		tds[1].style.backgroundImage = tds[1].style.backgroundImage.replace (/.gif/, '_highlight.gif');
			
		var imgR = tds[2].getElementsByTagName ('IMG');
		if (imgR)
			imgR[0].src = imgR[0].src.replace (/.gif/, '_highlight.gif');
		else
			alert ('R');
		}
	else
		{
		var imgL = tds[0].getElementsByTagName ('IMG');
		if (imgL)
			imgL[0].src = imgL[0].src.replace (/_highlight.gif/, '.gif');
			
		tds[1].style.backgroundImage = tds[1].style.backgroundImage.replace (/_highlight.gif/, '.gif');
			
		var imgR = tds[2].getElementsByTagName ('IMG');
		if (imgR)
			imgR[0].src = imgR[0].src.replace (/_highlight.gif/, '.gif');
		}
	
	};
		
//	Window Support --------------------------------------------------------------

windowWidth = function ()
	{
	if (window.innerWidth)
		return window.innerWidth;
	else if (document.body && document.body.offsetWidth)
		return document.body.offsetWidth;
	else
		return null;
	};
	
windowHeight = function ()
	{
	if (window.innerHeight)
		return window.innerHeight;
	else if (document.body && document.body.offsetHeight)
		return document.body.offsetHeight;
	else
		return null;
	};

var _composerWindows = [];

/**
 * Checks if New Composer is already open in a window, for a given message. This method also exists in /web/ActOn.js
 *
 * @param url URL to open in a new window
 * @param msgId (optional) message ID for reopening messages (omit for new messages)
 */
openNewComposeWindow = function (url, msgId)
	{
	// use current time for ID if msgId is omitted
	var id = (msgId || new Date().getTime().toString()).replace(/-/g,'_');
	if (_composerWindows[id] && ! _composerWindows[id].closed)
		{
		var r = confirm("This message is open in another browser tab.\n\nDo you want to replace it?");
		if (r)
			{
			_composerWindows[id].close();
			_composerWindows[id] = window.open(url, '_newCompose' + id);
			}
		else
			_composerWindows[id].focus();
		}
	else
		_composerWindows[id] = window.open(url, '_newCompose' + id);
	};
	
windowParentContaining = function (jsObjName, startingWindow)
	{
	var w = startingWindow ? startingWindow : self;
	
	try {
		while (w)
			{
			if (w[jsObjName])
				return w;
			if (w == w.parent)
				w = null;
			else
				w = w.parent;
			}
		}
	catch (e)
		{
		return null;
		}
		
	return w;
	};
	
windowParentContainingElementId = function (id, startingWindow)
	{
	var w = startingWindow ? startingWindow : self;
	
	try {
		while (w)
			{
			if (w.document.getElementById(id))
				return w;
			if (w == w.parent)
				w = null;
			else
				w = w.parent;
			}
		}
	catch(e)
		{
		return null;
		}
	return w;
	};	

windowScrollAmount = function ()
	{
    var scrollX, scrollY;
      
    if (document.all)
		{
		if (!document.documentElement.scrollLeft)
			scrollX = document.body.scrollLeft;
		else
			scrollX = document.documentElement.scrollLeft;
				               
		if (!document.documentElement.scrollTop)
			scrollY = document.body.scrollTop;
		else
			scrollY = document.documentElement.scrollTop;
		}   
	else
      	{
		scrollX = window.pageXOffset;
		scrollY = window.pageYOffset;
      	}
      	
	return { x: scrollX, y: scrollY };     
	};
	
//	Generic hidden IFRAME support -----------------------------------------------

setHiddenIframe = function (url)
	{
	var e = document.getElementById ('hiddenIframe');
	if (e)
		{
		e.src = url;
		}
	else
		{
		var rDiv = document.createElement('div');
		rDiv.innerHTML = '<iframe name="hiddenIframe" id="hiddenIframe" src="'+url+'" frameborder="0" style="border: 0; width: 0; height: 0"></iframe>';		
		document.body.appendChild (rDiv);
		}
	};
	
//	Cancel bubble ---------------------------------------------------------------

noBubble = function (e)
	{
	if (!e) var e = window.event;
	e.cancelBubble = true;
	if (e.stopPropagation) 
		e.stopPropagation();
	};

//	Modal Popup Window With Underlying Shadow -----------------------------------

	var modalDialogCount = 1;

	showModal = function (idDiv, useDarkShadow)
		{

		modalDialogCount++;
		var e = document.getElementById ('modalSheet');
		if (!e)
			{
			e = document.createElement ("div");
			
			e.id 			= 'modalSheet';
			e.className 	= useDarkShadow ? 'modalSheetDark' : 'modalSheet';
			e.style.display	= 'none';
			
			document.body.appendChild (e);
			}
		else
			{
			e.className 	= useDarkShadow ? 'modalSheetDark' : 'modalSheet';
			}
		var xScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
		var yScroll = document.documentElement.scrollTop  || document.body.scrollTop;
		
		if (e)
			{
			e.style.display = '';
			
			e.style.left	= xScroll + 'px';
			e.style.top 	= yScroll + 'px';
			}
			
		var dlg = document.getElementById (idDiv);
			
		dlg.style.visibility = 'hidden';
		dlg.style.display 	= '';
		
		var dlgLeft = Math.max (0, (windowWidth() - dlg.offsetWidth)/2);
		var dlgTop  = Math.max (0, (windowHeight() - dlg.offsetHeight)/2);
		
		dlg.style.top 		= (dlgTop  + yScroll) + 'px';
		dlg.style.left 		= (dlgLeft + xScroll) + 'px';
		dlg.style.zIndex	= modalDialogCount;
		
		dlg.style.visibility = 'visible';
		
		window.onscroll = function ()
			{
			var e = document.getElementById ('modalSheet');
			if (e)
				{
				var xScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
				var yScroll = document.documentElement.scrollTop  || document.body.scrollTop;
				e.style.left	= xScroll + 'px';
				e.style.top 	= yScroll + 'px';
				}
			};
			translateContent(idDiv, 'table');
		};

	sendMessageToNewUI = function (message) {
		try {
			var actonUI = null;
			try {
				actonUI = window.newActonUI;
			} catch (e) {
			}

			if (!actonUI) {
				try {
					actonUI = window.parent.newActonUI;
				} catch (e) {
				}
			}
			if (!actonUI) {
				try {
					actonUI = window.parent.parent.newActonUI;
				} catch (e) {
				}
			}
			if (actonUI && actonUI.postMessage) {
				actonUI.postMessage(message)
				return true
			}
		} catch(e) {
			console.log(e);
		}
	}
	
 	updateActonModalState = function (open) {
		sendMessageToNewUI({actonModalOpen: open})
	}	
	
	openNewListPicker = function (objectName, selectedListsIds, disabledListsIds, disabledListTooltipText, isListsOnly, multiSelect, getRootIFrameOnly, restrictedToLegacyLists) {
		return sendMessageToNewUI({ 
			modalData: {
				message: { 
					sourceName: objectName,
					selectedListsIds: selectedListsIds,
					disabledListsIds: disabledListsIds,
					disabledListTooltipText: disabledListTooltipText,
					isListsOnly: isListsOnly,
					multiSelect: multiSelect,
					getRootIFrameOnly: getRootIFrameOnly,
					restrictedToLegacyLists: restrictedToLegacyLists,
				},
				type: 'LIST_PICKER' }
		});
	}

openAIGeneratedEmailModal = function (objectName, subjectLine) {
	return sendMessageToNewUI({
		modalData: {
			message: {
				sourceName: objectName,
				subjectLine: subjectLine
			},
			type: 'AI_GENERATED_EMAIL' }
	});
}

	hideModal = function (idDiv, hideSheet)
		{
		updateActonModalState(false)
		window.onscroll = null;
		
		// function can be called with 1 argument.  if second 
		// argument isn'd defined, it's the old style, and always
		// hides the modelSheet.  If it passes true, it will hide
		// the sheet.  if it passes false, it will NOT hide the sheet
		if (hideSheet===undefined || hideSheet==true)
			{
			var e = document.getElementById ('modalSheet');
			if (e)
				e.style.display	= 'none';
			}
			
		document.getElementById (idDiv).style.display = 'none';
		};
	
//	Modal Popup Menu Support ---------------------------------------------------

	var idCurrPopup = null;
		
	showPopup = function (idMenuDiv, topLeft, onClickOutsideFunction)
		{
		var e = document.getElementById ('menuSheet');
		if (!e)
			{
			e = document.createElement ("div");
			
			e.id 			= 'menuSheet';
			e.className		= 'menuSheet';
			e.style.display	= 'none';
			
			document.body.appendChild (e);
			}
			
		var xScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
		var yScroll = document.documentElement.scrollTop  || document.body.scrollTop;
		
		if (e)
			{
			e.style.display = '';
			
			e.style.left	= xScroll + 'px';
			e.style.top 	= yScroll + 'px';
			
			e.onclick		= onClickOutsideFunction ? onClickOutsideFunction : function () { hidePopup(idMenuDiv); };
			
			document.onscroll = e.onclick;
			}
			
		var mnu = $(idMenuDiv);
		// var mnu = document.getElementById (idMenuDiv);
			
		mnu.style.visibility = 'hidden';
		mnu.style.display 	= '';
		
		var menuHeight = mnu.getHeight();
		
		var viewHeight = document.viewport.getHeight() ? document.viewport.getHeight() : window.innerHeight;
	
		if (topLeft.y + menuHeight > viewHeight + yScroll)
			{
			topLeft.y = topLeft.y - menuHeight - 10;
			if (topLeft.y < yScroll) topLeft.y = yScroll;
			}
	
		mnu.style.top 		= (topLeft.y) + 'px';
		mnu.style.left 		= (topLeft.x) + 'px';
		
		mnu.style.visibility = 'visible';
		};
		
	hidePopup = function (idMenuDiv)
		{
		var e = document.getElementById ('menuSheet');
		if (e)
			{
			e.style.display	= 'none';
			e.onclick = null;
			
			document.onscroll = null;
			}
			
		document.getElementById (idMenuDiv).style.display = 'none';
		};
	
//	Busy Overlay ---------------------------------------------------------------

	showBusy = function (flag)
		{
		var e = document.getElementById ('busybusybusy');
		
		if (flag)
			{
			if (!e)
				{
				e = document.createElement ("div");
				
				e.id 			= 'busybusybusy';
				e.className 	= 'busyBox2';
				e.style.display	= 'none';
				
				document.body.appendChild (e);

				e.innerHTML = 	'<table width="100" height="100" cellspacing="0" cellpadding="0"><tr><td align="center" valign="middle">' +
								'<img src="'+(typeof contextPath != 'undefined'?contextPath:"..")+'/image/loading.gif">' +
								'</td></tr></table>';
								
				// dotdotdot_mozilla_blue.gif
				}
				
			var ww = window.innerWidth  || document.body.clientWidth;
			var hh = window.innerHeight || document.body.clientHeight;
				
			var xScroll = document.documentElement.scrollLeft || document.body.scrollLeft;
			var yScroll = document.documentElement.scrollTop  || document.body.scrollTop;
				
			e.style.left = ((ww - 100)/2 + xScroll) + 'px';
			e.style.top  = ((hh - 100)/2 + yScroll) + 'px';
				
			e.style.display = '';			
			}
		else
			{
			if (e)
				e.style.display = 'none';		
			}
		};

//	Generic Expand Collapse Functionality --------------------------------------

	//	This is based on a naming convention involving 3 DOM blocks (e.g., DIVs)
	//	- a block with id=<blockName> for the content 
	//	- a block with id=m<blockName> for the minus (i.e., fully expanded) icon
	//	- a block with id=p<blockName> for the plus (i.e., fully collapsed) icon
	
	expandBlock = function(blockName)
		{
		$('m'+blockName).style.display = '';
		$('p'+blockName).style.display = 'none';
		$(blockName).style.display = '';
		};
		
	collapseBlock = function(blockName)
		{
		$('m'+blockName).style.display = 'none';
		$('p'+blockName).style.display = '';
		$(blockName).style.display = 'none';
		};
		
	toggleBlock = function(blockName)
		{
		if ($('m'+blockName).style.display == 'none')
			expandBlock (blockName);
		else
			collapseBlock (blockName);
		};

// Generic toggle style display on/off
	toggleDisplay = function(id)
		{
		var obj = $(id);
		if( !obj )
			return;
		if( obj.style.display == 'none' )
			obj.style.display = '';
		else
			obj.style.display = 'none';
		};		
		
//	Drag & drop support for DIVs -----------------------------------------------
//	To use this to drag divs, add: onMouseDown="dragStart(event,'MyWindow')

var	xMouse;
var yMouse;
	
var idDrag;

var _dragCallback =null;

dragStartWithCallback = function (event, idDraggable, callbackFunction)
	{
	_dragCallback = callbackFunction;
	dragStart(event, idDraggable);
	};
	
dragStart = function (event, idDraggable)
	{
	idDrag = idDraggable;
		
	if (document.all)
		{
		xMouse = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		yMouse = window.event.clientY + document.documentElement.scrollTop  + document.body.scrollTop;
    		
	    document.attachEvent ("onmousemove", dragGo);
	    document.attachEvent ("onmouseup",   dragStop);
	    window.event.cancelBubble = true;
	    window.event.returnValue = false;
		}
	else
		{
	    xMouse = event.clientX + window.scrollX;
	    yMouse = event.clientY + window.scrollY;
		    
	    document.addEventListener ("mousemove", dragGo,   true);
	    document.addEventListener ("mouseup",   dragStop, true);
	    event.preventDefault();
		}
	};

dragGo = function (event)
	{
		var x, y;

		if (document.all)	 
			{
		x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
		y = window.event.clientY + document.documentElement.scrollTop  + document.body.scrollTop;
			}
		else
			{
			x = event.clientX + window.scrollX;
			y = (event.clientY + window.scrollY > 25) ? event.clientY + window.scrollY : 25;
			}
  			
		var dragObj = $(idDrag);

		dragObj.style.left = (parseInt(dragObj.style.left,10) + (x - xMouse)) + "px";
		dragObj.style.top  = (parseInt(dragObj.style.top,10)  + (y - yMouse)) + "px";
  		
		xMouse = x;
		yMouse = y;

		if (document.all) 
			{
	    window.event.cancelBubble = true;
	    window.event.returnValue = false;
			}
		else
		event.preventDefault();
	};
		
dragStop = function (event)
	{
	if (document.all) 
		{
	    document.detachEvent ("onmousemove", dragGo);
	    document.detachEvent ("onmouseup",   dragStop);
	  	}
	else
		{
	    document.removeEventListener ("mousemove", dragGo,   true);
	    document.removeEventListener ("mouseup",   dragStop, true);
	  	}
	if (_dragCallback != null)
		{
		_dragCallback(event);
		_dragCallback=null;
		}
	};
	
//	Help -----------------------------------------------------------------------
//	The naming conventions for DIVs are tightly coupled with the naming
//	conventions in parts/help.jsp
openHelpDialog = function(target,key,align,textId,width,caption)
	{
	if ( typeof( hasSafeCall ) != 'undefined' && hasSafeCall() )
		{
		var tr=cornerTopRight(target),bl=cornerBottomLeft(target);
		safeCall( 'help.open', [ key,tr.y,tr.x,bl.y,bl.x,align,textId,width,caption,document ] );
		}
	};

helpTextOpen = function (btn, idHelpText, width, alignment)
	{
	var helpText = $(idHelpText);
		
	if (!helpText)
		{
		alert ('Under Construction!  ');
		return;
		}
		
	var html =	'<div align="left">' + helpText.innerHTML + '</div>';
		
	$(idHelpText+'Content').innerHTML = html;
	translateContent(idHelpText+'Content', "div");
	if (alignment == 'left')
		{
		var offset = cornerTopRight (btn);
			
		$(idHelpText+'Window').style.left = (offset.x) + 'px';
		$(idHelpText+'Window').style.top  = (offset.y) + 'px';
		}
	else
		{
		var offset = cornerTopLeft (btn);
			
		$(idHelpText+'Window').style.left = (offset.x - width) + 'px';
		$(idHelpText+'Window').style.top  = (offset.y) + 'px';
		}
		
	try {
		Effect.Appear (idHelpText+'Window');
		}
	catch (e)
		{
		$(idHelpText+'Window').style.display = '';
		}
	};
	
helpTextClose = function (idHelpText)
	{
	try {
		Effect.Fade (idHelpText+'Window');
		}
	catch (e)
		{
		$(idHelpText+'Window').style.display = 'none';
		}
	};

//	Miscellaneous --------------------------------------------------------------

addLoadEvent = function (func) 
	{
	var oldonload = window.onload;
	if (typeof window.onload != 'function') 
		{
		window.onload = func;
		} 
	else 
		{
		window.onload = function() 
			{
			if (oldonload) 
				{
				oldonload();
      			}
      		func();
    		}
  		}
	};
	
reallyOver = function (src, e) 
	{  
	var event = e || window.event;
	
	if (!event)
		return true;
		
	if (event.relatedTarget !== undefined)
		{
		var from = event.relatedTarget;
		return (!from) || (!Element.descendantOf (from, src));
		}
	else
		{
		var from = event.fromElement;	var fromOutside = (!from) || (!Element.descendantOf (from, src));
		var to	 = event.toElement;		var toInside 	= Element.descendantOf (to, src);
		return fromOutside && toInside;
		}
	};
	
reallyOut = function (src, e) 
	{  
	var event = e || window.event;
	
	if (!event)
		return true;
		
	if (event.relatedTarget !== undefined)
		{
		var to = event.relatedTarget;
		return (!to) || (!Element.descendantOf (to, src));
		}
	else
		{
		var from = event.fromElement;	var fromInside = Element.descendantOf (from, src);
		var to	 = event.toElement;		var toOutside = (!to) || (!Element.descendantOf (to, src));
		return fromInside && toOutside;
		}
	};
	
getNextTR = function (tr)
	{
	var next = tr.nextSibling;
	while (next && next.nodeName != 'TR')
		next = next.nextSibling;
	return next;
	};
		
getNextTD = function (td)
	{
	var next = td.nextSibling;
	while (next && next.nodeName != 'TD')
		next = next.nextSibling;
	return next;
	};		

selectGetValue = function (selectFieldName)
	{

	var select = $(selectFieldName);
	var selectValue = select.selectedIndex >= 0 ? select.options[select.selectedIndex].value : undefined;
	
	return selectValue;
	};
	
selectSetValue = function (selectFieldId, optionValue) 
	{  
	
	var selectObject = $(selectFieldId);
	for (var i = 0; i < selectObject.options.length; i++) 
		{        
		if (selectObject.options[i].value == optionValue) 
			{
			selectObject.options[i].selected = true;
			selectObject.options[i].setAttribute("selected", "selected");
			}
		else
			{
			selectObject.options[i].removeAttribute("selected");
			}
		}
		return;
	};
	
radioGetValue = function (radioFieldName)				//	name="" and not id=""
	{
	var selectorExpression = 'input:checked[type="radio"][name="'+radioFieldName+'"]';
	var radioButtons = $$(selectorExpression);
	if (radioButtons.length == 1)
		return radioButtons[0].value;
	else
		return null;
	};
	
radioSetValue = function (radioFieldName, value)		//	name="" and not id=""
	{
	var selectorExpression = 'input[type="radio"][name="'+radioFieldName+'"]';
	$$(selectorExpression).each (
		function (radioButton)
			{
			radioButton.checked = radioButton.value == value;
			}
		);
	};
	
//	Zendesk Single Signon ------------------------------------------------------

zenLink = function (remoteurl , forcedPopUp)
	{

	var url = (typeof contextPath != 'undefined'?contextPath:"..")+"/account/zendeskBridge.jsp?forwardUrl="+encodeURIComponent( remoteurl );
		if(forcedPopUp )
		{
			popupWindow(url, 1000, 850, 'ActOnZen');
		}
		else
		{
			window.open(url, 'ActOnZen');

		}
	};
	
clearDirty = function ()
	{
	var p = windowParentContaining( 'clearDirtyBit' );
	if( p )
		p.clearDirtyBit();
	}

isBrowserHtml5 = function ()
	{
	return !!document.createElement('canvas').getContext;
	}
var composeWindow = null;

openComposeWindow = function (url, w, h)
	{
	try {
	if (composeWindow && !composeWindow.closed)
		{
		composeWindow.focus();
		return;
		}
	}
	catch (e)
		{
		}

	if (!w)	w = 800;
	if (!h)	h = screen.height-100;

	composeWindow = popupWindow (url, w, h);
	};
// Used for Babelizing
var englishMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
var englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

//
function relativeToAbsoluteUrl( relUrl, protocol, host )
	{
	protocol = protocol||location.protocol;
	host = host||location.host;
	var absUrl;
	if ( !relUrl ) absUrl = protocol + "//" + host + "/acton";
	else if ( relUrl.substr(0,1) == '/' ) absUrl = protocol + "//" + host + relUrl;
	else
		{
		var base = location.pathname;
		if ( base.lastIndexOf('/') >= 0 )
			base = base.substr(0,base.lastIndexOf('/'));
		if ( relUrl.length >= 2 && relUrl.substr(0,2) == './' )
			relUrl = relUrl.substr(2);
		while ( relUrl.length >= 3 && relUrl.substr(0,3) == '../' )
			{
			if ( base.lastIndexOf('/') >= 0 )
				base = base.substr(0,base.lastIndexOf('/'));
			relUrl = relUrl.substr(3);
			}
		absUrl = protocol + "//" + host + base + "/" + relUrl;
		}
	return absUrl;
	}

function relativeToSecureAbsoluteUrl( relUrl, host )
	{
	return relativeToAbsoluteUrl( relUrl, "https:", host )
	}

function relativeToUnSecureAbsoluteUrl( relUrl, host )
	{
	return relativeToAbsoluteUrl( relUrl, "http:", host )
	}

function jsonp(url, success)
	{
	var ud = '_' + Math.floor(Math.random()*1000000)+ '_' +(new Date().getTime()),
		script = document.createElement('script'),
		head = document.getElementsByTagName('head')[0]
			|| document.documentElement;

	window[ud] = function(data)
		{
		head.removeChild(script);
		success && success(data);
		};

	script.src = url.indexOf('callback=?') >= 0 ?
		url.replace('callback=?', 'callback=' + ud) :
		url.indexOf('?') > -1?
			url + '&' + 'callback=' + ud :
			url + '?' + 'callback=' + ud ;
	head.appendChild(script);
	}

function autoResize(id)
	{
    var newheight;

    if(document.getElementById){
    	
        newheight = document.getElementById(id).parentNode.offsetHeight;
    }

    document.getElementById(id).parentNode.height = (newheight - 2) + "px";
    document.getElementById(id).height = (newheight - 4) + "px";
	}

//Date and Time ----------------------------------------------------------

var getTime = function() {
    var str = "";
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var ampm = "";

    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    
    if(hours > 11){
        ampm = "PM";
    } else {
        ampm += "AM";
    }
    
    if (hours > 12) {
        hours = hours - 12;
    }
    
    str += hours + ":" + minutes + " " + ampm;
    
    return str;
}

//Duplicate code from ActOn.js ----------------------------------------------------------

windowOpen = function (url, w, h, windowName) {	

	var left = (screen.width  - w) / 2;
	var top  = (screen.height - h) / 2;
	
	var attr = "left=" + left + ",top=" + top + ",width=" + w + ",height=" + h;
				
		attr += ",modal=yes,dependent=yes,resizable=yes,scrollbars=yes,toobar=no,location=no,status=no";
		
		windowName = (typeof windowName == 'undefined') ? (new Date()).getTime().toString() : windowName;
	
	var newwindow = window.open (url, windowName, attr);
	
	if (window.focus) 
		{
		newwindow.focus()
		}
	
	return newwindow;
};

// Ponyfill for Object.assign
if (typeof Object.assign != 'function') {
	Object.assign = function(target, varArgs) {
		'use strict';
		if (target == null) { // TypeError if undefined or null
			throw new TypeError('Cannot convert undefined or null to object');
		}

		var to = Object(target);

		for (var index = 1; index < arguments.length; index++) {
			var nextSource = arguments[index];

			if (nextSource != null) { // Skip over if undefined or null
				for (var nextKey in nextSource) {
					// Avoid bugs when hasOwnProperty is shadowed
					if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
		}
		return to;
	};
}

// Ponyfill for Array.fill
if (!Array.prototype.fill) {
	Object.defineProperty(Array.prototype, 'fill', {
		value: function(value) {

			// Steps 1-2.
			if (this == null) {
				throw new TypeError('this is null or not defined');
			}

			var O = Object(this);

			// Steps 3-5.
			var len = O.length >>> 0;

			// Steps 6-7.
			var start = arguments[1];
			var relativeStart = start >> 0;

			// Step 8.
			var k = relativeStart < 0 ?
				Math.max(len + relativeStart, 0) :
				Math.min(relativeStart, len);

			// Steps 9-10.
			var end = arguments[2];
			var relativeEnd = end === undefined ?
				len : end >> 0;

			// Step 11.
			var final = relativeEnd < 0 ?
				Math.max(len + relativeEnd, 0) :
				Math.min(relativeEnd, len);

			// Step 12.
			while (k < final) {
				O[k] = value;
				k++;
			}

			// Step 13.
			return O;
		}
	});
}

(function (global) {
	var global_isFinite = global.isFinite;

	Object.defineProperty(Number, 'isFinite', {
		value: function isFinite(value) {
			return typeof value === 'number' && global_isFinite(value);
		},
		configurable: true,
		enumerable: false,
		writable: true
	});
})(this);

//IE11 fix to support forEach on NodeList and HTMLCollections
if(window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = Array.prototype.forEach;
}
if(window.HTMLCollection && !HTMLCollection.prototype.forEach) {
	HTMLCollection.prototype.forEach = Array.prototype.forEach;
}

// URLSearchParams ponyfill
(function (w) {
	w.URLSearchParams = w.URLSearchParams || function (searchString) {
		var self = this;
		self.searchString = searchString;
		self.get = function (name) {
			var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(self.searchString);
			if (results == null) {
				return null;
			}
			else {
				return decodeURI(results[1]) || 0;
			}
		};
	}

})(window)

