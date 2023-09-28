
var lastUUID = "";
var lastUrl = "";
var times = 0;





//posteIDSPID
function send(data, aEntryPoint) {
	 var username = data.username;
	 var movingFactor  = data.movingfactor;
	 var baseUrl  = data.baseurl;
	 var merchantName = data.merchantname;
	 var message = data.message;
	
	 
	 var reqId = getRandomNumber();
	 var urlIdenties = baseUrl +"getIdentities" + "?reqId=" + reqId;	
 
     var url = baseUrl + aEntryPoint + "?merchant=" + merchantName + "&movingFactor=" + movingFactor + "&username=" + username +"&reqId=" + reqId +"&message=" + message; // + "&uuid_poll=" + guid();
	 lastUrl  = url;
	 
	 sendRequest(url);
	 


 };

function getRandomNumber(){
		return Math.floor((Math.random()*10000000)+1);
};

function sendLocal(baseUrl) {
	
	
	$('#myModalPosteID').modal({
   show : true,
   keyboard : false,
   backdrop : true
		});
		
$( '#myModalPosteID' ).on('hidden.bs.modal', function() {
		
		utenteNonAttivo();
   });

	 var username = $('#username').val();
	 var lurl = baseUrl + "/spiddis?&gg=" + guid();

	 sendRequestLocal(lurl, 'posteIDSPID');
	 
}



function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

function sendRequestLocal(requestUrl, aEntrypoint) 
		{

			$.ajax({
				type:        "GET",
				url:         requestUrl,
				dataType:    'json',
				cache:       false,
				async:       false,
				crossDomain: false,
				//data: "sc=" +$("#sc").val(),
				beforeSend: function() {

				},
				success: function(data) {
						send(data, aEntrypoint);
			
				},
				error: function() {
					utenteNonAttivo();
				}
			});
		};

function sendRequest(requestUrl) 
		{

			$.ajax({
				type:        "GET",
				url:         requestUrl,
				dataType:    'jsonp',
				cache:       false,
				async:       true,
				crossDomain: true,
				beforeSend: function() {
		
				},
				success: function() {
		
				},
				error: function() {
		
				}
			});
		};

function requestPosteIDLogin (username,uuid_poll) {
		
	
		var url = lastUrl + "&uuid_poll=" + uuid_poll;
		times = times + 1;
		setTimeout(sendRequest(url),3000);
	}
	
function requestNotAuthorized(token,signature) {
							$('#secureToken').val(token);
   									
  							$('#signature').val(signature);


							
							$('#myModalPosteID').find("#pLOAD").toggleClass("hide");
   							$('#myModalPosteID').find("#pKO").toggleClass("hide");
   							
  							window.setTimeout(function () {
									
									$('#myModalPosteID').modal('hide');
									$('#loginform1').submit();
							}
								,2000);
		
}
	
function requestAuthorized(token,signature) {
							$('#secureToken').val(token);
							$('#signature').val(signature);
							$('#myModalPosteID').find("#pLOAD").toggleClass("hide");
   							$('#myModalPosteID').find("#pOK").toggleClass("hide");

  							window.setTimeout(function () {
									
									$('#myModalPosteID').modal('hide');
									$('#loginform1').submit();
							}
								,2000);
   							
   							
   							
   							
							
							
}
	
function utenteNonAttivo() {
							$('#secureToken').val("");
       									
							$('#signature').val("");
       						
       						$('#myModalPosteID').find("#pLOAD").toggleClass("hide");
       						$('#myModalPosteID').find("#pKO").toggleClass("hide");
       									
  							window.setTimeout(function () {
									
									$('#myModalPosteID').modal('hide');
									$('#loginform1').submit();
							}
								,2000);
   							
   							
							
							
}

