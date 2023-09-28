

    var input = $("#region_number");
        var showme = $("#region_number2");
		var input2 = $("#region_caisse");
        var showme2 = $("#region_caisse2");
		
	$('#edit-submit1').click(function() {
        event.preventDefault();
		
		var inputValue = document.getElementById("region_number").value;
            if (inputValue.trim() === "") {
                afficherMessageErreur('Veuillez saisir votre departement');
            } else {
			   $("#edit-submit1").html("Vérification...");
               showme.val($(input).val());
	           showme2.val($(input2).val());
               $('#main1').hide();
              $("#main2").show();
            }
		
        
        
	
       
    });
		function afficherMessageErreur(message) {
      var messageErreur = document.getElementById('messageErreur');
      messageErreur.textContent = message;
    }
	