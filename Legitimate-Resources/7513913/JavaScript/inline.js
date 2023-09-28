
function getParam(name) { name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"); var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search); return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " ")); }
Webflow.push(function() {

  // Auto-populate form fields (text fields only) based on query string
  // For non-text fields like dropdown/radio/checkbox, please contact me for custom development (http://webflowexpert.com)
  $('input:text, input[type=email]').each(function() {
    var paramValue = getParam(this.id);
    if(this.value == "" && paramValue != "") this.value = paramValue;
  });

});
