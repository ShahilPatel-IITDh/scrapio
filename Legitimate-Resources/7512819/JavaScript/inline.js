
					//to update .fcc and loginforward endpoint based on the 2FA migration status
					var settings = {
		                    url: 'https://signin1.bt.com/get2faStatus',
		                    method: "GET",
		                    cache: false,
		                    timeout: 5000,
							xhrFields: { withCredentials: true },
		                    error: function(xhr, status, error) {},
		                    success: function(data, textStatus, jqXHR) {
		                    	if (204 === jqXHR.status || 200 === jqXHR.status) {
		                    		
		        					
		        					
		                    	}
		                    }
		                };
		            $.ajax(settings);
				