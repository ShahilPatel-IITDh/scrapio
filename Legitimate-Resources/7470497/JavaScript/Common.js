
var submitState = false;

function CheckSubmit()
{
	if (submitState)
	{
		return false;
	}
	else
	{
		submitState=true;
		return true;
	}
}

function CheckState()
{
	if (window.navigator.userAgent.indexOf("MSIE") != -1)
	{
		if (document.readyState == "complete")
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return true;
	}
}

function StartApplication(url)
{
	if (submitState)
	{
		return false;
	}
	else
	{
		submitState=true;

		document.forms["MSMenu"].action = url;
		document.forms["MSMenu"].submit();

		return true;
	}
}

function CorrectBaseVariable() 
{
	// IEでbaseVariableを利用されるパージに限定
	// alert("★修正スクリプト実行前  basevar = " + document.forms[0]["baseVariable"].value + "; copy = " + document.forms[0]["baseVarCopy"].value);
	if (document.forms[0]["baseVariable"] != null && document.forms[0]["baseVarCopy"] != null)
	{
		// 初回表示される時、baseVariableをbaseVarCopyに退避
		if (document.forms[0]["baseVarCopy"].value=="")
		{
			document.forms[0]["baseVarCopy"].value = document.forms[0]["baseVariable"].value;

		}
		else //戻るボタン押下された場合、baseVarCopyからbaseVaribleを復元
		{
			document.forms[0]["baseVariable"].value = document.forms[0]["baseVarCopy"].value;
		}
	}
	// alert("★修正スクリプト実行後　basevar = " + document.forms[0]["baseVariable"].value + "; copy = " + document.forms[0]["baseVarCopy"].value);

}