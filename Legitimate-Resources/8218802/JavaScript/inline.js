
		var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
		var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
		s1.async=true;
		s1.src="https://embed.tawk.to/55f183a2a7e313dd03cf2c7c/default";	
		s1.charset="UTF-8";
		s1.setAttribute("crossorigin","*");
		s0.parentNode.insertBefore(s1,s0);
		})();
		//Tawk_API.onStatusChange = function(status){console.log(status);};  // Log Status
		Tawk_API.visitor = {
		name  : "", 
		email : "",
		hash : ""
		};		
			

Tawk_API["onStatusChange"] = function (status) {
  if (status === "online") {
    document["getElementById"]("chat")["style"]["display"] = "inline"
    document["getElementById"]("sup")["style"]["display"] = "none"
	document["getElementById"]("expedientechat")["style"]["display"] = "inline"
  }
  else {
    if (status === "away") {
      document["getElementById"]("chat")["style"]["display"] = "none"
    }
    else {
      if (status === "offline") {
        document["getElementById"]("chat")["style"]["display"] = "none"
        document["getElementById"]("sup")["style"]["display"] = "inline"
		document["getElementById"]("expedientechat")["style"]["display"] = "none"
      }
    }
  }
}
		