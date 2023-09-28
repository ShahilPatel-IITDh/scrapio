//<SCRIPT Language="javascript">
<!--


function bCheckDigit(szStr)
{
    var iNum = szStr * 1;

    if (isNaN(szStr))
        return false;
    else
    // it is a number
        return true;   
}


function bIsDigitOnly(szStr)
{
    for (var i = 0; i < szStr.length; i++) 
    {
        var c = szStr.charAt(i);
        
        if ( (c < '0') || (c > '9') ) 
            return false;

    }
    return true;
}


function bCheckBlank(szStr)
{
    for(var i = 0; i < szStr.length; i++)
    {
        var c = szStr.charAt(i);
        if ((c != ' ') && (c != '\n') && (c != '\t'))
            return false;
    }
    return true;
}


function iParseLongDate(szInDate)
{
    var szDate = szInDate + "";
    if (szDate.length < 10)
    {
        return 0;
    }

    var iDay = szDate.substr(0,2) * 1;
    var iMonth = szDate.substr(3,2) * 100;
    var iYear = szDate.substr(6,4) * 10000;

    if (isNaN(iDay) || isNaN(iMonth) || isNaN(iYear))
        return 0;

    var iDate = iYear + iMonth + iDay;
    return iDate;

}

function bDateIsValid(szDate)
{
    if (szDate.length != 10 || szDate.substring(2,3) != "/" || szDate.substring(5,6) != "/") 
    {
        return false;
    }

    var  iDay = szDate.substring(0,2);
    var  iMonth = szDate.substring(3,5);
    var  iYear = szDate.substring(6,10);

    if (!bCheckDigit(iDay) || !bCheckDigit(iMonth) || !bCheckDigit(iYear))
        return false; 
    else if ((iDay<1 || iDay>31) || (iMonth<1 || iMonth>12)) 
        return false;
    else if (!(iMonth == 1 || iMonth == 3 || iMonth == 5 || iMonth == 7 || iMonth == 8 || iMonth == 10 || iMonth == 12))
    {
        if (iDay > 30)
            return false;
        else if (iMonth == 2)
        {
            if (iDay == 30)
                return false;
            else if (iDay == 29 && !(iYear % 1000 == 0 || (iYear % 4 == 0 && !(iYear % 100 == 0))))
                return false;
        }
    }
    return true;
}

function bCheckTel(szTelNum)
{
    var iNumCnt = 0;
    var bResult = true;
    var iOpenBracket = 0;
    var iCloseBracket = 0;
    var szTel = szTelNum + "";

    var iLen = szTel.length;

    if (iLen < 7 || iLen > 20)
        bResult = false;
    else
    {
        for (var i=0; i< iLen; i++) 
        {
            var c = szTel.charAt(i);

            if (c == '(')
                iOpenBracket++;
            else if (c == ')')
                iCloseBracket++;         
            else if  (c != ' ' && c != "-")
            {
                if (isNaN(c * 1))
                {
                    bResult = false;
                    break;
                }
                else
                    iNumCnt++;
            }                
        }

        if (iOpenBracket != iCloseBracket || iOpenBracket > 1 || iNumCnt < 7)
        bResult = false;
    }   

    if (!bResult)
        alert("Sorry, you have entered an invalid telephone number.");

    return bResult;
}

function fEmailCheck(str) {
		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   //alert(message)
		   return false
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   //alert(message)
		      return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		  // alert(message)
		      return false
		}

		 if (str.indexOf(at,(lat+1))!=-1){
		   //alert(message)
		     return false
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		  // alert(message)
		     return false
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		   //alert(message)
		 
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		  // alert(message)	
		     return false
		 }
		 

 		 return true					
	}

function fDBSCurrencyToFloat(szCurrency)
{
    var szStr = szCurrency + "";
    if (szStr.length > 0)
    {
        var iPos = szStr.indexOf("$");
        szStr = szStr.substr(iPos + 1,(szStr.length - 1));

        while (szStr.indexOf(",") != -1)
        { 
            szStr = szStr.replace(",","");
        }
        var fValue = parseFloat(szStr);
        return fValue;
    }
    else
        return 0;
}


function szFloatToDBSCurrency(iNum, szSymbol)
{  
    var szMinus = "";    

    var fNum = (Math.round(iNum * 100) / 100);

    if (fNum < 0) 
        szMinus = "-";

    var szStr = fNum + "";
    var szCurrency = "";
    var iPos = szStr.indexOf(".");

    if (iPos > -1)
    {
        var szDecimal = szStr.substr(iPos, szStr.length);
        if (szDecimal.length < 3)
            szDecimal = szDecimal + "0"; 
        szStr = szStr.substr(0,iPos); 
    }
    else
    {
        var szDecimal = ".00"; 
    }
    
    while (szStr.length > 3)
    {
        szCurrency = "," + szStr.slice(szStr.length - 3) + szCurrency; 
        szStr = szStr.slice(0, -3);
    }
    
    szCurrency = szStr + szCurrency;  
    szCurrency = szMinus + szSymbol + szCurrency + szDecimal;


    return szCurrency;

}

function szFloatToDBSCurrencyLatest(iNum, szSymbol)
{  
    var fNum = (Math.round(iNum * 100) / 100);
    var szStr = fNum + "";
    var szCurrency = "";
    var iPos = szStr.indexOf(".");

    if (iPos > -1)
    {
        var szDecimal = szStr.substr(iPos, szStr.length);
        if (szDecimal.length < 3)
            szDecimal = szDecimal + "0"; 
        szStr = szStr.substr(0,iPos); 
    }
    else
    {
        var szDecimal = ".00"; 
    }
    while (szStr.length > 3)
    {
        szCurrency = "," + szStr.slice(szStr.length - 3) + szCurrency; 
        szStr = szStr.slice(0, -3);
    }
    iPos = szStr.indexOf("-");
	if (iPos > -1)
    {
		szStr = szStr.slice(1,szStr.length);
        szCurrency = szStr + szCurrency;  
		szCurrency = "-" + szSymbol + szCurrency + szDecimal; 
    }
    else
    {
        szCurrency = szStr + szCurrency;  
		szCurrency = szSymbol + szCurrency + szDecimal;
    }


    return szCurrency;

}

function szLTrim(szStr)
{
    if (szStr.length == 0)
        return "";

    while ((szStr.length > 0) && (szStr.charAt(0) == " "))  
    {
        szStr = szStr.slice(1);
    }

    return szStr;    
}  

function szRTrim(szStr)
{ 
    if (szStr.length == 0)
        return "";

    while ((szStr.length > 0) && (szStr.charAt(szStr.length - 1) == " ")) 
        szStr = szStr.slice(0,-1); 

    return szStr;    
}    


function szTrim(szStr)
{
    return szRTrim(szLTrim(szStr));
}

function checkInputDate(dd,mm,yyyy)
{
	var errorFlag;
	var day,month,year;
	day = dd.value;
	month = mm.value;
	year = yyyy.value;
	day = szTrim(day);
	month = szTrim(month);
	year = szTrim(year);
	//Check if day is empty	
	if(day=="")
	{
		alert("Please enter day ");
		errorFlag = false;
		dd.focus();
		return errorFlag;
	}
	//Check if day is numeric
	errorFlag = bIsDigitOnly(day);
	if(errorFlag == false) 
	{
		alert("Please enter Day in numeric form");
		dd.focus();
		return errorFlag;
	}
	//Check if day is between 1 and 31
	if(((day*1)>31)||((day*1)<=0) )
	{ 
		alert("Please enter Day between 1 and 31"); 
		dd.focus();		
		return errorFlag;
	}
	//Check if month is empty
	if(month=="")
	{
		alert("Please enter month ");
		errorFlag = false;
		mm.focus();		
		return errorFlag;
	}
	//Check if month is numeric
	errorFlag = bIsDigitOnly(month);
	if(errorFlag == false) 
	{
		alert("Please enter Month in numeric form");
		errorFlag == false;
		mm.focus();
		return errorFlag;
	}
	//Check if month is between 1 and 12	
	if(((month*1)>12)||((month*1)<=0) )
	{ 
		alert("Please enter Month between 1 and 12");
		errorFlag == false;
		mm.focus();		
		return errorFlag;
	}
	//Check if year is empty
	if(year=="")
	{
		alert("Please enter year ");
		errorFlag = false;
		yyyy.focus();
		return errorFlag;
	}
	//Check if year is numeric
	errorFlag = bIsDigitOnly(year);
	if(errorFlag == false) 
	{
		alert("Please enter Year in numeric form");
		yyyy.focus();
		return errorFlag;
	}
	//Check if year is valid
	if(((year*1)<=0)||(year.length<4))
	{ 
		alert("Please enter valid year");
		errorFlag == false;
		yyyy.focus();
		return errorFlag;
	}
}
function isANumMoreThanTwice(pin)
{
	for(i=0;i<pin.length;i++){
		count =1;
		for(j=i+1;j<pin.length;j++){
			if(pin.charAt(i)==pin.charAt(j))
				count++;
			if(count > 2)	
				return true;
		}	
	}
    return false;
}
function isSeqNumber(pin)
{
	var pat1='01234567890';
	var pat2='09876543210';
	if(pat1.indexOf(pin) >= 0 || pat2.indexOf(pin) >= 0)
		return true;
    return false;
}

//MR1401 - Pin Validation to check if the numbers in pin must not be used more than twice consecutively
function isANumConsecutive(pin)
{
	var pinLength = pin.length;
	var consecutiveCount = 0;
	for (i=0;i<pin.length-2;i++)
	{
		if (pin.charAt(i) == pin.charAt(i+1) && pin.charAt(i+1) == pin.charAt(i+2))
		    consecutiveCount++;
	}
	if(consecutiveCount > 0)
		return true;
	else
		return false;
}

//MR0701 Changes (For Ticket#660904)

function isMetaCharacter(txtField) { 
    var metaCharecters = "\\<|\\>|\\&|\\*|\\(|\\)|\"|\\'|\\;|\\%";
    
    for(i=0;i<txtField.length;i++){
        if(metaCharecters.indexOf(txtField.charAt(i))>=0){
           return true;
        }
    }    
    return false;
}

// MR0702 Changes (For Ticket#702361)
function isANumRepetitive(pin)
{
	var repeatCount = pin.length;	
	var count =1;
	for(j=1;j<pin.length;j++){
		if(pin.charAt(0)==pin.charAt(j))
			count++;
		else
			break;		
	}
	if(count > repeatCount-1)
		return true;
	else
		return false;
}

//Validation for contact number - allow only digits, special char + and space
function checkContactNum(szStr)
{
	if(szStr.length==0)
		return false;
    for (var i = 0; i < szStr.length; i++) 
    {
        var c = szStr.charAt(i);
        if(c < '0' || c > '9')
        	{
        	if(c != '+')
        		{
        		if(c!=' ')
        			return false;
        		}
        	}
    }
    return true;
}

////For MR0903 Changes  Add new functions here 

		function isWithinLengthRange(text,minlength,maxlength)
		{
		   if(text.length >= minlength && text.length <= maxlength)
		   {
		   		return true;
		   }	
		   else
		   {
		   		return false;
		   }			
		}
		
		function isAlphaNumeric(text)
        {
          for(var i = 0; i < text.length; i++)
          {
            var c = text.charAt(i);
            if((c < 'a' || c > 'z') && (c < 'A' || c > 'Z') && (c < '0' || c > '9'))
                return false;
          }

          return true;
        }
        
        //This is included specially for Nickname where they needed to allow spaces.
        function isAlphaNumericWithSpace(text)
        {
          for(var i = 0; i < text.length; i++)
          {
            var c = text.charAt(i);
            if((c < 'a' || c > 'z') && (c < 'A' || c > 'Z') && (c < '0' || c > '9') && (c != ' '))
                return false;
          }

          return true;
        }
        
		//Preset Payee Changes Foe Special Character issues.
         function isAlphaNumericWithSpace1(text)
        {
          for(var i = 0; i < text.length; i++)
          {
            var c = text.charAt(i);
            if((c < 'a' || c > 'z') && (c < 'A' || c > 'Z') && (c < '0' || c > '9') && (c != ' ') && (c != '-'))
                return false;
               
          }

          return true;
        }
        
        //MR1602 Changes Start
  function isAlphaNumericWithSpacesforPersonalizemyname(str)
        {
          var specialIndex=0;
          for(var i = 0; i < str.length; i++)
          {
            var c = str.charAt(i);
            if((c < 'a' || c > 'z') && (c < 'A' || c > 'Z') && (c < '0' || c > '9') && (c != ' ')){
                
            
                      if(c=='/' || c=='@'|| c=="'" || c=='(' || c==')' || c=='-' || c=='.' || c==','){
                       //alert('Special Char found');
                         
                      
                      }else{
                           return false;
                      }    
                
                }
                
               
          }

          return true;
        }	


  //MR1602 Changes end
        
        function isNumeric(text)
        {
          var count = 0;
          for(var i = 0; i < text.length; i++)
          {
            var c = text.charAt(i);
            if(c >= '0' && c <= '9')
                count++;
          }
          return count == text.length;
        }
        
         function isPinValid(pin)
         {
        	var pinLength = pin.length;
	        if(pinLength < 6 || pinLength > 9)
    	      {   
    	        return false;
    	      }  
        	return true;
         }
         
      
      var shiftPress = 0; 
      function keyUp(event) 
      { 
        if(event.keyCode == 16) 
          { 
            shiftPress = 0; 
          } 
      } 
      function onlyNumerics(event) 
      { 
        if(event.keyCode == 16) 
          { 
            shiftPress = 1; 
          } 
        if(shiftPress == 1 && event.keyCode == 9) 
          { 
           shiftPress = 0;   
           return true; 
          } 
        if(shiftPress == 1 ) 
           return false; 
        if(event.keyCode > 47 && event.keyCode < 59) 
          { 
           return true; 
          } 
        else if(event.keyCode > 95 && event.keyCode < 106) 
         { 
          return true; 
         } 
        else if(event.keyCode > 34 && event.keyCode < 40) 
         { 
          return true; 
         } 
        else if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode ==46) 
         { 
          return true; 
         } 
        else if(event.keyCode == 16) 
         { 
          return false; 
         } 
         else 
          return false; 
       }      
       
    function checkAllowedSpecialCharacter(splchar) { 
    var splCharacters = "\\.|\\,|\\-|\\#|\\(|\\)|\\@|\\!|\\/|\\'";
    
        if(splCharacters.indexOf(splchar)>=0){
           return true;
    	}    
    	return false;
	}
	function freeStringValidation(text){
			if(szTrim(text).length > 0)
				{
					for(var i = 0; i < text.length; i++){
			            var c = text.charAt(i);
            				if((c < 'a' || c > 'z') && (c < 'A' || c > 'Z') && (c < '0' || c > '9'))
				                if(!checkAllowedSpecialCharacter(c) && c!=" ")
									return false;
          			}
				}
          return true;
	}

	function freeStringValidationForTTService(text){
			if(szTrim(text).length > 0)
				{
					for(var i = 0; i < text.length; i++){
			            var c = text.charAt(i);
            				if((c < 'a' || c > 'z') && (c < 'A' || c > 'Z') && (c < '0' || c > '9'))
				                if(checkAllowedSpecialCharacterForTTService(c))
									return false;
          			}
				}
          return true;
	}
    function checkAllowedSpecialCharacterForTTService(splchar) { 
    var splCharacters = "\\\|\\:|\\*|\\?|\\\"|\\<|\\>|\\||\\/";
        if(splCharacters.indexOf(splchar)>=0){
           return true;
    	}    
    	return false;
	}	

	
function parser(input){
	var validArray = new Array("a","A","b","B","c","C","d","D","e","E","f","F","g","G","h","H","i","I","j","J","k","K","l","L","m","M","n","N","o","O","p","P","q","Q","r","R","s","S","t","T","u","U","v","V","w","W","x","X","y","Y","z","Z","0","1","2","3","4","5","6","7","8","9","-"," ");
	var len = input.length;
	var size = validArray.length;
	for(i=0;i<len;i++){
		for(j=0;j<size;j++){
			if(input.charAt(i)!=validArray[j])
				found = false;
			else{
				found = true;break;}
		}
		if(found == false && j==size)
				return false;
    }
	return true;
}
	
function checkForSpecialCharacters(str,splCharacters){
	if(szTrim(str).length > 0){
		for(var i = 0; i < str.length; i++){
			var  c = str.charCodeAt(i);
			if((c < 97 || c > 122) && (c < 65 || c > 90)){
				for(var j=0  ;j < splCharacters .length ; j++){
					if(c == splCharacters [j]){
						j = splCharacters.length;
						break;
					}else {
						if( j == (splCharacters.length -1))
							return false;
					}
				}

			}
		}
	}
	    return true;
                                                
}
function onlyNumericsV2(event) 
{ 
    if(event.keyCode > 47 && event.keyCode < 59) 
      { 
       return true; 
      } 
    else if(event.keyCode > 95 && event.keyCode < 106) 
     { 
      return true; 
     } 
    else if(event.keyCode > 34 && event.keyCode < 40) 
     { 
      return true; 
     } 
    else if(event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 13)
     { 
      return true; 
     } 
    else if(event.keyCode == 16) 
     { 
      return false; 
     } 
     else 
      return false; 
}

//-->
//</SCRIPT>
