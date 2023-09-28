<!-- Begin

// NOTE: If you use a ' add a slash before it like this \'


var flashcolor		= "000000"		// FLASH BACKGROUND COLOR
var color		= "000000"		// HEADER BACKGROUND COLOR
var flashheight		= "100"			// HEIGHT OF THE FLASH (IN PIXELS)
var flashwidth		= "750"			// WIDTH OF THE FLASH (IN PIXELS)



document.write('<TABLE cellpadding="0" cellspacing="0" border="0" width="100%" BGCOLOR="#'+color+'"><tr><td ALIGN="LEFT">');
document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="'+flashwidth+'" HEIGHT="'+flashheight+'" id="logo" ALIGN="">');
document.write('<PARAM NAME=movie VALUE="logo.swf">');
document.write('<PARAM NAME=quality VALUE=high>');
document.write('<PARAM NAME=wmode VALUE=transparent>');
document.write('<PARAM NAME=bgcolor VALUE=#'+flashcolor+'>');
document.write('<EMBED src="logo.swf" quality=high wmode=transparent bgcolor=#'+flashcolor+'  WIDTH="'+flashwidth+'" HEIGHT="'+flashheight+'" NAME="logo" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">');
document.write('</EMBED>');
document.write('</OBJECT><br>');
document.write('</td></tr></table>');

//  End -->