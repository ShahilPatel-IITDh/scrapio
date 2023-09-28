
	function openModal(e){
		var target = e.dataset.target;
		var i;
		var modals = document.getElementsByClassName('customModal');
		for(i=0; i<modals.length; i++){
			if(modals[i].dataset.modalid == target){
				modals[i].style.display = 'flex';
				modals[i].focus();
				break;
			}
		}
		document.querySelector('html').style.overflow = 'hidden';
	}
	function closeModal(){
		var modals = document.querySelectorAll('.customModal');
		for (i=0; i < modals.length; i++) {
			modals[i].style.display = 'none';
		}
		document.querySelector('html').style.removeProperty('overflow');
	}

	var modalBtns = document.querySelectorAll(".openModal");
	var i = 0, length = modalBtns.length;
	for (i; i < length; i++) {
	    if (document.addEventListener) {
	        modalBtns[i].addEventListener("click", function() {
	            // use keyword this to target clicked button
	            var targetObj = this;
	            openModal(targetObj);
	        });

	        modalBtns[i].addEventListener("keyup", function(event) {
			  	if (event.keyCode === 13) {
			    	event.preventDefault();
			    	var targetObj = this;
			    	targetObj.click();
			  	}
			});

	    } else {
	        modalBtns[i].attachEvent("onclick", function() {
	            // use buttons[i] to target clicked button
	            targetObj = modalBtns[i];
	            openModal(targetObj);
	        });

	        modalBtns[i].attachEvent("keyup", function(event) {
			  	if (event.keyCode === 13) {
			    	event.preventDefault();
			    	var targetObj = this;
			    	targetObj.click();
			  	}
			});
	    };
	};

	var modalCloseBtns = document.querySelectorAll(".modal-close");
	var i = 0, length = modalCloseBtns.length;
	for (i; i < length; i++) {
	    if (document.addEventListener) {
	        modalCloseBtns[i].addEventListener("click", function() {
	            closeModal();
	        });
	        modalCloseBtns[i].addEventListener("keyup", function(event) {
			  	if (event.keyCode === 13) {
			    	event.preventDefault();
			    	var targetObj = this;
			    	targetObj.click();
			  	}
			});
	    } else {
	        modalCloseBtns[i].attachEvent("onclick", function() {
	        	closeModal();
	        });
	        modalCloseBtns[i].attachEvent("keyup", function(event) {
			  	if (event.keyCode === 13) {
			    	event.preventDefault();
			    	var targetObj = this;
			    	targetObj.click();
			  	}
			});
	    };
	};

	var modalOverlays = document.querySelectorAll(".customModal");
	var i = 0, length = modalOverlays.length;
	for (i; i < length; i++) {
	    if (document.addEventListener) {
	        modalOverlays[i].addEventListener("click", function() {
	            if(event.target === event.currentTarget){
        			closeModal();
    			}
	        });
	        modalOverlays[i].addEventListener('keyup', function(event){
			    if(event.key === 'Escape' || event.key === 'Esc'){
			        closeModal();
			    };
			});
	        
	    } else {
	        modalOverlays[i].attachEvent("onclick", function() {
	        	if(event.target === event.currentTarget){
        			closeModal();
    			}
	        });
	        modalOverlays[i].attachEvent('onkeyup', function(event){
			    if(event.key === 'Escape' || event.key === 'Esc'){
			        closeModal();
			    };
			});
	    };
	};

