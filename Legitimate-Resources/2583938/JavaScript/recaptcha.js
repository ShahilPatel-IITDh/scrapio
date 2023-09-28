grecaptcha.ready(function() {
 grecaptcha.execute('6Lcs1IQUAAAAAEuK38GSllm6SCwOlylkuA26Ru2v', {action: 'efm'}).then(function(token) {
  document.getElementById('g-recaptcha-response').value = token;
 });
});

