
                    document.getElementById('marketing_hidden_empty').disabled = true;
                    if (document.getElementById('marketing_hidden_empty').value == "") {
                        document.getElementById('marketing_checkbox').checked = true;
                        document.getElementById('marketing_hidden').value = 0;
                    }

                    const marketingCheckbox = document.querySelector('#marketing_checkbox');
                    marketingCheckbox.addEventListener('change', () => {
                        if (document.getElementById('marketing_checkbox').checked == true) {
                            document.getElementById('marketing_hidden').disabled = true;
                        } else {
                            document.getElementById('marketing_hidden').disabled = false;
                            document.getElementById('marketing_hidden').value = 1;
                        }
                    });
				