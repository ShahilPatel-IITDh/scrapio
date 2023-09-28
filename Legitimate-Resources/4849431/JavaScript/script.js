
	function setTabsWidth(rows, mod_prefix){
		
		if(isIE() && isIE()<=8)
			return;
		
		if (!mod_prefix)
			mod_prefix = '';
			
		if (!rows)
			rows = 1;
		
		var tab = document.id(mod_prefix+'djtab1');
		var tabs = document.id(mod_prefix+'djtabs');
		var titlesArray = $$('.'+mod_prefix+'djtabs_help_class');
		var t_count = titlesArray.length;
	
	
		if (tab && window.getSize().x > 480 && t_count > rows)
		{
		
		
			var margins = parseInt(tab.getStyle('margin-left')) + parseInt(tab.getStyle('margin-right'));
			var paddings = parseInt(tab.getStyle('padding-left')) + parseInt(tab.getStyle('padding-right'));
			var borders = parseInt(tab.getStyle('border-left')) + parseInt(tab.getStyle('border-right'));
			var offset = margins + paddings + borders;
			
			
			var tabsSummedWidth = 0;
			
			for (k=0; k < t_count; k++)
			{
					tabsSummedWidth = tabsSummedWidth + parseInt(titlesArray[k].getStyle('width'));		
			}
			
			tabsSummedWidth = tabsSummedWidth + (offset * t_count);
		
			
			var available_space = 
				parseInt(tabs.getStyle('width')) + 
				parseInt(tabs.getStyle('padding-left')) + 
				parseInt(tabs.getStyle('padding-right'))
				- 2;
				
		
			if (tabsSummedWidth > available_space)
			{
				
				r = t_count % rows;
				l = parseInt(t_count / rows);
		
				var rows_array = new Array();
				
				for (i=0; i < rows; i++)
				{
					rows_array.push(l);
				}
				
				for (i=0; i < r; i++)
				{
					rows_array[i] = rows_array[i] + 1;
				}
				
				var rows_array_copy = rows_array.slice(0);
	
				var row_t_count;
				var tabNewWidth;
				var tab_class;
				
		  		for (i=0; i < t_count; i++)
				{	
					for (j=0; j < rows; j++)
					{
						if (rows_array_copy[j]>0){
							row_t_count = rows_array[j];
							rows_array_copy[j] = rows_array_copy[j] - 1;
							
							if(j==0)
								tab_class = 'first-row';
							else if(j==rows-1)
								tab_class = 'last-row';
							else
								tab_class = 'n-row';
							
							break;
						}
							
					}
	
					tabNewWidth = parseInt(((available_space - (row_t_count * offset)) / row_t_count) - 1);
					
					var n_tab = document.id(mod_prefix+'djtab'+(i+1));
					
					n_tab.addClass(tab_class);
					n_tab.removeClass('tabsBlock');
					n_tab.style.width=tabNewWidth+'px';
					document.id(mod_prefix+'djtabs_title_img_right'+(i+1)).setStyle('left',tabNewWidth + paddings - 2);	
				}
				
			if(rows>1)
				document.id(mod_prefix+'djtabs').addClass('rows');
				
			}
		
		}
		else if (tab && (window.getSize().x <= 480 || t_count <= rows)){
			for (i=1; i<=t_count; i++)
			{
				document.id(mod_prefix+'djtab'+i).addClass('tabsBlock');
			}
		}
	
	}
	
	 
	function resetTabsWidth(mod_prefix){
		if(isIE() && isIE()<=8)
			return;

		if (!mod_prefix)
			mod_prefix = '';
		
	 		var tab = document.id(mod_prefix+'djtab1');
	 	  	if (tab)
	  		{
	  			var titlesArray = $$('.'+mod_prefix+'djtabs_help_class');
	  			var paddings = parseInt(tab.getStyle('padding-left')) + parseInt(tab.getStyle('padding-right'));

	  				var tabWidth;
	  				for (l=1; l<=titlesArray.length; l++) //reseting width
					{	
						document.id(mod_prefix+'djtab'+l).removeClass('tabsBlock');
						tabWidth = document.id(mod_prefix+'djtab'+l).getStyle('width');
						document.id(mod_prefix+'djtab'+l).removeAttribute('style');
						document.id(mod_prefix+'djtabs_title_img_right'+(l)).setStyle('left',tabWidth + paddings - 2);	
					}
	  		}
	}
	 
	
	function setPanelsText(mod_prefix){
		if(isIE() && isIE()<=8)
			return;
	
		if (!mod_prefix)
			mod_prefix = '';
				
		var panelArray = $$('#'+mod_prefix+'djtabs .djtabs-panel');

		for (var j=0; j<panelArray.length; j++){
				
			var panelWidth = parseInt(panelArray[j].getStyle('width')); //panel width

			var spanTitle = null; 
			var spanDate = null; 
			var spanDateWidth = 0;
			var spanTogglerWidth = 0;
			var spanTitleMargins = 0;
			var spanTitleWidth = 0;
			for (var i = 0; i < panelArray[j].children.length; i++){
				if (panelArray[j].children[i].className == "djtabs-panel-title"){
					spanTitle = panelArray[j].children[i];
					spanTitleWidth = getFullWidth(panelArray[j].children[i]);
					spanTitleMargins = getMargins(panelArray[j].children[i]);
			    }
			    else if (panelArray[j].children[i].className == "djtabs-panel-date"){
					spanDate = panelArray[j].children[i];
					spanDateWidth = getFullWidth(panelArray[j].children[i]);
			    }
			    else if (panelArray[j].children[i].className == "djtabs-panel-toggler"){
					spanTogglerWidth = getFullWidth(panelArray[j].children[i]);
			    }      
			}
			
			if(spanTitle){
				if(panelWidth < spanTitleWidth+spanDateWidth+spanTogglerWidth)
					spanTitle.setStyle('width',panelWidth-spanDateWidth-spanTogglerWidth-spanTitleMargins);
			}			
			
		}
	}
	
	
	function resetPanelsText(mod_prefix){
		if(isIE() && isIE()<=8)
			return;
	
		if (!mod_prefix)
			mod_prefix = '';
				
		var panelArray = $$('#'+mod_prefix+'djtabs .djtabs-panel-title');

		for (var j=0; j<panelArray.length; j++){			
			panelArray[j].removeAttribute('style');
		}
	}
	
	
	function getFullWidth(el){	
		return el ? el.offsetWidth + getMargins(el) : 0;	
	}

	function getMargins(el){
		return el ? parseInt(el.getStyle('margin-left')) + parseInt(el.getStyle('margin-right')) : 0;
	}
	
	function isIE () {
		var myNav = navigator.userAgent.toLowerCase();
		return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
	}
	

	function toggleVideo(el, task){
		if(isIE() && isIE()<=8)
			return;

		var post_msg;
		var iframe;
		var djVideoWrapper = el.getElementsByClassName("djVideoWrapper")[0];
		
		if (djVideoWrapper){
			
			iframe = djVideoWrapper.getElementsByTagName("iframe")[0];
			
			if (iframe){
				
				if(iframe.src.contains('vimeo'))
					post_msg = task ? '"method":"play"' : '"method":"pause"';
				else if(iframe.src.contains('youtube'))
					post_msg = task ? '"func":"playVideo"' : '"func":"pauseVideo"';

				if(post_msg)
					iframe.contentWindow.postMessage('{"event":"command",'+post_msg+'}', '*');
			}
		}
	}
