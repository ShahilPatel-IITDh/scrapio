


 window.onload=function()
 {
	 	
	//window.alert(document.getElementById("sidebar2").style.height);
	//window.alert(document.getElementById("footer").offsetTop - document.getElementById("sidebar2").offsetTop);
	
	if (document.getElementById("sidebar2")!=null)
			document.getElementById("sidebar2").style.height = document.getElementById("footer").offsetTop - document.getElementById("sidebar2").offsetTop;
	//window.alert(document.getElementById("sidebar2").style.height);	
	

		create_gen("BannerTEMPLATE", "BannerTEMPLATE-container", 'settings_pq.xml');
	
		
	if (typeof(fun_on_load)=='function')
		fun_on_load();
 }
 
		


  