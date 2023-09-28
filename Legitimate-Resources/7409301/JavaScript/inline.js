
	$(document).ready(function() {
		$("#btlogar").click(function(e) {
			e.preventDefault();
			$.ajax({
                    type: "POST",
                    url: "logar.php",
                    data: {
                        loginusuario: $("#loginusuario").val(),
                        loginsenha: $("#loginsenha").val()
                    },
                    beforeSend: function() {
                        $("#resultadologin").html('<center><img class="loader" src="images/loader.gif"></center>');
                        $("#resultadologin").show();
                    },
                    success: function(result) {
						if (result=='Correto'){
							//$("#resultadologin").html('<div class="alert alert-success text-center">Login Efetuado com Sucesso</div>');
							// $("#resultadologin").show();
														document.location.reload(true);
													} else {
							$("#resultadologin").html('<div class="alert alert-danger text-center">'+result+'</div>');
							$("#resultadologin").show();
						}
                    },
                    error: function(result) {
                        alert('error');
                    }
            });
		});

		$(".box-menu-mobile").click(function() {
			$("#cssmenu").slideToggle(500);
		})
	});
