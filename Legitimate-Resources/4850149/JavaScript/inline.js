

    	// First header h1
    	var tc_vars = tc_vars || {};
        tc_vars.page_entete_H1 = '';
        for(var i=0;i<jQuery('h1').length;i++) {
			tc_vars.page_entete_H1 = jQuery('h1').get(i).textContent.trim();
            if(tc_vars.page_entete_H1 !== '') {break;}
        }
        
        if(ContextHub != null) {
    		var deviceStore = ContextHub.getStore("surferinfo");
    		deviceStore.eventing.on(ContextHub.Constants.EVENT_STORE_READY, function() {
    			var categoryDevice = deviceStore.getItem("/device").category;
    			if (categoryDevice === 'Desktop')
    				categoryDevice = 'Ordinateur';
    			else if (categoryDevice === 'Tablet')
    				categoryDevice = 'Tablette';
    			tc_vars.utilisateur_device = categoryDevice;
    	    });
    	}

