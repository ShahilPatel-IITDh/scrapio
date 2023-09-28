let intervalDuration = 500; //milliseconds

	let getActiveGroups = function() {
		return	window.OptanonActiveGroups ? [...window.OptanonActiveGroups.split(',')].filter(activeGroup=> activeGroup.indexOf('C')> -1): new Array();
	}

	let checkOptanonActiveGroups = function(counter){
		counter = counter +1;

		//we are checking for the window.OptanonActiveGroups and it takes time for the groups value to populate
		if (getActiveGroups().length>0) {
			//raise event on document so we can trigger chatbot display
			document.dispatchEvent(new CustomEvent('optanonLoaded',{detail:{wrapper:getActiveGroups()}}));
			
			//This event is triggerd when the cookie consent is changed and sends the new cookie values to the "optanonLoaded" event of chatBot Component
			window.Optanon.OnConsentChanged(function(event) {
				document.dispatchEvent(new CustomEvent('optanonLoaded',{detail:{wrapper:getActiveGroups()}}));
			});
			return;
		}
		else{// call again
			if(counter>10){
				return;
			}
		
			window.setTimeout(()=>{
				checkOptanonActiveGroups(counter);
			}, 	intervalDuration);
		}
		
	}
	// this event will be called from the chatbot component
	document.addEventListener('chatbotActivePage',()=>{
		checkOptanonActiveGroups(0);
	});