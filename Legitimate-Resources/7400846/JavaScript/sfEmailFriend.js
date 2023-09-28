//@BEGINVERSIONINFO

//@APPVERSION: 5.3001.0.1

//@FILENAME: sfemailfriend.asp
	 


//@DESCRIPTION: Handles Opening of Email Page

//@STARTCOPYRIGHT
//The contents of this file is protected under the United States
//copyright laws as an unpublished work, and is confidential and proprietary to
//LaGarde, Incorporated.  Its use or disclosure in whole or in part without the
//expressed written permission of LaGarde, Incorporated is expressly prohibited.

//(c) Copyright 2000 by LaGarde, Incorporated.  All rights reserved.
//@ENDCOPYRIGHT

//@ENDVERSIONINFO

function emailFriend(sName){
	var h, w, friendWin
	h = window.screen.availHeight 
	w = window.screen.availWidth 
	sFeatures = "height=" + h*.75 + ",width=" + w*.80 + ",resizable"
	friendWin = window.open("EmailFriend.asp?ProdID="+sName,"",sFeatures)
	
}
