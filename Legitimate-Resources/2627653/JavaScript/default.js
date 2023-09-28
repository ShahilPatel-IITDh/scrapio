var newwindow;

function popup(url)
{
	newwindow=window.open(url,'LeaseWebSalesChat','height=560,width=420');
	if (window.focus) { newwindow.focus() };
}

function InsertMailToTag( userName, domainName, text, className)
{
  var EmailId;
  var atSign = "&#64";
  var fullStop = "&#46";
  
  EmailId = userName;
  EmailId = "" + EmailId + atSign;
  EmailId = EmailId + domainName;
  
  if(typeof text == 'undefined' && !text)
  {
    text = EmailId;
  }

  if(typeof className == 'undefined' && !className)
  {
    className = "";
  }

  document.write( "<a class='" + className + "' href='mail" + "to:" + EmailId + "'>" + text +"</a>" );
}
