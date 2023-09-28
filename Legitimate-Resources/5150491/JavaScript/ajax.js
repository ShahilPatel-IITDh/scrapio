var g_oRequest = false;
try {
	g_oRequest = new XMLHttpRequest();
} 
catch (trymicrosoft)
{
	try {
   		g_oRequest = new ActiveXObject("Msxml2.XMLHTTP");
 	} 
 	catch (othermicrosoft) 
 	{
   		try {
    	g_oRequest = new ActiveXObject("Microsoft.XMLHTTP");
   		} 
   		catch (failed) 
   		{
     		g_oRequest = false;
   		}  
 	}
}


