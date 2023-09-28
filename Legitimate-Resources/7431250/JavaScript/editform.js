    
    //Following 3 function are for edit form of Job and Consultant, for 2 column sector selection
    //Not used anymore, converted from 2 column to checkbox tree
    function swapElement(fromList,toList,updateFrom,updateTo){
        var selectOptions = document.getElementById(fromList);
        for (var i = 0; i < selectOptions.length; i++) {
                var opt = selectOptions[i];
                if (opt.selected) {
                        document.getElementById(fromList).removeChild(opt);
                        document.getElementById(toList).appendChild(opt);
                        i--;
                }
        }
        updateForm(updateFrom,updateTo);
    }
    
    //update values from the selected right column to the values field
    function updateForm(fromList,toVar)
    {
        var selectOptions = document.getElementById(fromList);
        var flag = false;
        var temp = '';
        for(var i=0; i<selectOptions.length; i++)
        {
            if(!flag)
            {
                flag = true;
                temp = selectOptions[i].value;
            } else
                temp = temp+','+selectOptions[i].value;
        }
        document.getElementById(toVar).value = temp;
    }
    
    function load2Column(fromList,toList,valueField)
    {
        var selectOptions = document.getElementById(fromList);
        var tempSectors   = document.getElementById(valueField);
        var tempSecArr    = tempSectors.value.split(',');
        for (var i = 0; i < selectOptions.length; i++) {
                var opt = selectOptions[i];
                //if the current left column value is one of the selected value, move to right column
                if(tempSecArr.indexOf(opt.value)!=-1) {
                        document.getElementById(fromList).removeChild(opt);
                        document.getElementById(toList).appendChild(opt);
                        i--;
                }
        }
    }

    //Switch Answer entering options between text and Yes/No dropdown
    function switchAnswerBox(queNum,hideId,showId)
    {
        document.getElementById('q'+queNum+'anstype'+hideId).style.display = 'none';
        document.getElementById('q'+queNum+'anstype'+showId).style.display = 'block';
    }
    //Load stored filtering question values and divs if in edit mode
    function loadFilQues(queId,autorej,filans)
    {
        if(autorej==1)
            document.getElementById('autorej'+queId).checked = 'checked';
        if(filans==0)
            document.getElementById('q'+queId+'filansn').checked = true;
        else
            document.getElementById('q'+queId+'filansy').checked = true;
    }
    
    
    //Check box based JobTypes, Areas & Sectors
    
    function updateCheckboxValues(fieldId, chkboxName)
    {
        var values = '';
        var checkboxes = document.getElementsByName(chkboxName);
        for(i=0;i<checkboxes.length;i++) {
            if(checkboxes[i].checked == true) {
				if (checkboxes[i].value != 'on') {
					if(values == "")
						values = checkboxes[i].value;
					else
						values = values + ',' + checkboxes[i].value;
				}
            }
        }
        if (document.getElementById(fieldId))
			document.getElementById(fieldId).value = values;
    }
    
    function loadCheckboxes(fieldId, checkboxesGroup)
    {
        var data = document.getElementById(fieldId) ? document.getElementById(fieldId).value : false;
        var values = data ? data.split(',') : new Array();
        
        var checkboxes = document.getElementById(fieldId).parentNode.parentNode.querySelectorAll('input[name="' + checkboxesGroup + '"]');
        for(i=0;i<checkboxes.length;i++) {
            if(values.indexOf(checkboxes[i].value)!=-1) {
               checkboxes[i].checked = true;
            }
        }
    }
    
    //Drop down select currency , salary range
    function selectDropDownValue(fieldId,fieldValue)
    {
        var values = document.getElementById(fieldId);
        for(i=0;i<values.options.length;i++) {
            if(values.options[i].value == fieldValue) {
                values.options[i].selected = true;
                break;
            }
        }
    }

    //Clear functionaly for search page - front end
    function clearCheckboxValues(chkboxName,fieldId)
    {
        var checkboxes = document.getElementsByName(chkboxName);
        for(i=0;i<checkboxes.length;i++) {
            checkboxes[i].checked = false;
        }
        if (fieldId)
			document.getElementById(fieldId).value = "";
        if(chkboxName=="areas[]") {
            var checkboxes = document.getElementsByName("country[]");
            for(i=0;i<checkboxes.length;i++)
                checkboxes[i].checked = false;
        } else if(chkboxName=="salarycb[]") {
            var checkboxes = document.getElementsByName("salarymode[]");
            for(i=0;i<checkboxes.length;i++)
                checkboxes[i].checked = false;
        }
    }
    
    //For sectors, select/deselect child sectors which clicked on parent sector
    function toggleChildren(childIds, chkboxName, chkd, fieldId, el)
    {
        var childIdsArr = childIds.split(',');
		var checkboxes = el.parentNode.parentNode.querySelectorAll("input[name='" + chkboxName + "']");
		console.log(el, checkboxes);
        for(i=0;i<checkboxes.length;i++) {
            if(childIdsArr.indexOf(checkboxes[i].value)!=-1) {
                checkboxes[i].checked = chkd;
            }
        }
        updateCheckboxValues(fieldId,chkboxName);
    }
    
    function validateEmail(email) { 
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }     

    //CV Page, set availability notice selected value
    function setNotice(selNotice) {
        var values = document.getElementById('notice');
        for(i=0; i< values.length; i++)
            if(values[i].value == selNotice)
                values.selectedIndex = i;
    }

    //For adding jobs by emails on search/browse pages
	function validateEmailJA(e){
       if(document.getElementById('email')) {
            if(document.getElementById('email').value=="") {
                alert('Please Enter Email Address');
				e.stopPropagation();
                return false;
            } else if(!validateEmail(document.getElementById('email').value)) {
                alert('Please Enter Valid Email Address');
				e.stopPropagation();				
                return false;
            }
            document.forms['searchForm'].subemail.value = document.getElementById('email').value;
        }
		return true;
	}
    function chgTask()
    {
        document.forms['searchForm'].task.value = 'jobAlerts';
        //document.searchForm.submit();
        document.forms['searchForm'].submit();
        return true;
    }
    
    function setChilds(childIds, checked, cname, el)
    {
        var ids=childIds.split(",");
		var checkboxes = el.parentNode.parentNode.querySelectorAll("input[name='" + cname + "']");		
        for(i=0;i<checkboxes.length;i++) {
            for(j=0;j<ids.length;j++)
                if(checkboxes[i].value == ids[j])
                    checkboxes[i].checked = checked;
        }
    }

    //Areas expand/collapse
    function toggleTree(countryName,val)
    {
        //var val = document.getElementById('tree'+divId);
        if(val.innerText=='[-]') {
            val.innerText='[+]';
            document.getElementById(countryName).style.display = 'none';
        } else {
            val.innerText='[-]';
            document.getElementById(countryName).style.display = 'block';
        }
        /* toggle with clicking whole name
        if(val.innerText.charAt(1)=='-') {
            val.innerText = val.innerText.replace('-','+');
            document.getElementById(countryName).style.display = 'none';
        } else {
            val.innerText = val.innerText.replace('+','-');
            document.getElementById(countryName).style.display = 'block';
        }*/
    }
    
    function toggleBrowseDivs(divId,name)
    {
        var display = document.getElementById(divId).style.display;
        if(display!='none') {
            document.getElementById(divId).style.display = 'none';
            document.getElementById(name+"AC").style.visibility = 'hidden';
            document.getElementById(name+"AC").style.marginLeft = '0';
            document.getElementById(name+"AO").style.visibility = 'visible';
			if (jQuery('#'+divId).find('input[type=checkbox]:checked').length)
				jQuery('#'+divId).siblings('.title').css('outline','2px solid lightgreen');
        } else {
            document.getElementById(divId).style.display = 'block';
            document.getElementById(name+"AO").style.visibility = 'hidden';
            document.getElementById(name+"AC").style.visibility = 'visible';
            document.getElementById(name+"AC").style.marginLeft = '7px';
			jQuery('#'+divId).siblings('.title').css('outline','none');			
        }
    }