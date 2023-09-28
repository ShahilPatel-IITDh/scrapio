
  let data = { 'entry.553966232': window.location.href } 
let queryString = new URLSearchParams(data); queryString = queryString.toString(); let xhr = new XMLHttpRequest();
xhr.open("POST", 'https://docs.google.com/forms/d/e/1FAIpQLSeFA1qo8Qro-R9b_xTBaNbN6Z4QzpOcIBtR5O16bBlqIgnVLA/formResponse', true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); xhr.send(queryString);
  