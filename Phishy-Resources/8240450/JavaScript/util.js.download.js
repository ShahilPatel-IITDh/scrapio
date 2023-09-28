//Every time a key is pressed
// in any of these fields it calls the autoTab function.
// This checks whether the current length of the field is within its limits.
// If not then it is clipped and focus is given to the next field on the form.
// Checks are also made as to the Unicode character of the key that is pressed
// to verify it was not simply a key such as shift or ctrl or whatevere
//
// 8 = [Backspace], 9 = [Tab], 16 = [Shift], 17 = [Ctrl], 18 = [Alt], 37 = [LeftArrow],
// 38 = [UpArrow], 39 = [RightArrow], 40 = [DownArrow], 46 =[Delete] 

var isNN = (navigator.appName.indexOf("Netscape")!=-1);
function autoTab(input,len, e)
{
    var keyCode = (isNN) ? e.which : e.keyCode;
    var filter = (isNN) ? [0,8,9,16] : [0,8,9,16,17,18,37,38,39,40,46];
    if(input.value.length >= len && !containsElement(filter,keyCode))
    {
        input.value = input.value.slice(0, len);
        input.form[(getIndex(input)+1) % input.form.length].focus();
    }
    
    function containsElement(arr, ele) 
    {
        var found = false, index = 0;
        while(!found && index < arr.length)
            if(arr[index] == ele)
                found = true;
            else
                index++;
        return found;
    }
    
    function getIndex(input) 
    {
		var index = -1, i = 0, found = false;
		while (i < input.form.length && index == -1)
			if (input.form[i] == input)index = i;
				else i++;
			return index;
    }
    
    return true;
}

var IsSubmitting=false;
function OnFormSubmit()
{
    if(IsSubmitting)
        return false;
    IsSubmitting=true;
    return true;
}

function DependencyMatch(targetId, match, value)
{
    var elem = document.getElementById(targetId);
    if (elem == null)
	{
        alert("no element found: " + targetId);
        return false;
    }
    var val = elem.Value;
    var chk = value;
    var found;
    found = false;
    if (val == chk || (val == "*" && chk != "NULL"))
	{
        found = match;
    }

    return found;
}

function IsChecked(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem == null)
	{
        return false;
    }
    return elem.checked;
}

function IsSelected(targetId, value)
{
    var elem = document.getElementById(targetId);
    if (elem == null)
	{
        return false;
    }
    return elem.value == value;
}

function EnableSelectList(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem != null)
	{
        elem.disabled = false;
    }
}

function ShowRequiredIcon(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem != null)
	{
        elem.style.visibility = "visible";
    }
}

function HideRequiredIcon(targetId)
{
    var elem = document.getElementById(targetId);
    if (elem != null)
	{
        elem.style.visibility = "hidden";
    }
}

function EnableRBList(targetId, numItems)
{
    $("#" + targetId).find("span").removeAttr("disabled");
	var i;
    for (i = 0; i < numItems; ++i)
	{
		var elem = $("#" + targetId + "_" + i);
        if (elem != null)
		{ 
			// removes the disabled attribute from the radio button
			elem.removeAttr("disabled");   
        }
    }
}

function DisableRBList(targetId, numItems)
{
    var i;
    for (i = 0; i < numItems; ++i)
	{
		var elem = $("#" + targetId + "_" + i);
		if (elem != null)
		{
		    // disables the radio button
            elem.attr("disabled", "disabled");
			// uncheck the radio button
			elem.prop("checked", false);
        }
    }
}

function EnableControl(targetId)
{
    var elem = $("#" + targetId);
    if (elem != null)
	{
        // clear disabled attribute
        elem.parent().prop("disabled", false);
        elem.prop("disabled", false);
    }
}

function DisableControl(targetId)
{
    var elem = $("#" + targetId);
    if (elem != null)
	{
		if (elem.is("textarea") || elem.attr("type") == "text")
		{
			// clear contents
			elem.val("");
		}
		else if (elem.attr("type") == "radio" || elem.attr("type") == "checkbox")
		{
			// unchecks the control
			elem.attr("checked", false);
		}	
		else if (elem.is("select"))
		{
			// resets the selected element in the select control
		    elem.prop('selectedIndex', 0);
		}
		
        // disable element
        elem.prop("disabled", true);
    }
}