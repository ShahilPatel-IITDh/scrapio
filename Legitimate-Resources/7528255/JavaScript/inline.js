
function _check(opt) {
    
    if(opt=='Yes'){document.getElementById('unsub').style.display = 'block'; document.getElementById('close').style.display = 'none';}
    if(opt=='No'){document.getElementById('unsub').style.display = 'none'; document.getElementById('close').style.display = 'block';}
}

function _close() {
    window.location = "/tr/u/2/721340/349350/c2lyMTk2M0BnbWFpbC5jb20=&unsub=no";
}

function _CheckOption() {
    
    $checkbox = document.getElementsByName("unsubscribe");
    $length = $checkbox.length;
    var checked = false;
    for(var x=0; x<$length; x++) {
        
        if($checkbox[x].checked) checked=true;
    }
    
    if(checked)
        return true;
    
    alert("Please select one option to continue!");
    return false;
}

function unsubReasonChanged(reason) {
    if(reason==="I would like to change the email address to,")	{
            document.getElementById("unsub_update_email_address_div").style.display = "block";	
            document.getElementById("unsub_custom_reason_div").style.display = "none";
    } else {
            if(reason==="I've got another reason (see the comments in the box below)")	{
                    document.getElementById("unsub_update_email_address_div").style.display = "none";
                    document.getElementById("unsub_custom_reason_div").style.display = "block";			
            }	else	{		
                    document.getElementById("unsub_update_email_address_div").style.display = "none";
                    document.getElementById("unsub_custom_reason_div").style.display = "none";			
            }
    }
    return true;	
}

function submitSurvey(){	

    var radios = document.getElementsByName("unsub_survey_reason");
    var valid = false;

    var i = 0;
    while (!valid && i < radios.length) {
            if (radios[i].checked) {
                    valid = true;
                    if(radios[i].value==="I've got another reason (see the comments in the box below)")	{
                            if (document.getElementById("unsub_custom_reason_text").value==="")	{
                                    alert("Please specify a reason in the comment box to continue !");
                                    valid = false;
                                    return valid;
                            }		
                    }

            }
            i++;        
    }

    if (!valid) alert("Please select one reason!");
            return valid;

    return valid;;
}
