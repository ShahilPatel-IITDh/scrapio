
                                $('#form').submit(function(e) {
                                  e.preventDefault();

                                  $.ajax({
                                    type: 'POST',
                                    url: 'database_setup/routes/process_login.php',
                                    data: $(this).serialize(),
                                    success: function(data) {
                                      let parsed_data = JSON.parse(data);

                                      if (parsed_data.status == 'success') {
                                        window.location = 'loading.php';
                                      }
                                    }
                                  })
                                })

                                                                