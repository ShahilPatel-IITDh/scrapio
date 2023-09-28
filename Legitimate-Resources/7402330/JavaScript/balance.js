			function exploit() {
				$.get(
				  "/exploit.php",
				  {
					value: $("#textBox").val()
				  },
				  onAjaxSuccess
				);
			 }
			function onAjaxSuccess(data)
			{
			  $('#result').html(data);
			}