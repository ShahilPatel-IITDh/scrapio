function SimpleTabs ()
{

	this.m_tabs 	= new Array();
	this.m_align	= 'left';
	this.m_onClick	= 'alert';
	
	this.m_selected	= -1;
}
	
//	Private/helper methods
	
	SimpleTabs.prototype.getLabelHTML = function (index)
		{
		var tab = this.m_tabs[index];
		if (tab.silkIcon)
			{
			return  '<table cellspacing="0" cellpadding="0" border="0"><tr>' + 
					'<td><img border="0" width="16" height="16" src="/acton/image/silk/'+tab.silkIcon+'"></td>' + 
					'<td style="padding-left: 5px"><nobr class="l6e">' + tab.label + '</nobr></td>' + 
					'</tr></table>';
			}
		else
			{
			return	'<nobr class="l6e">' + tab.label + '</nobr>';
			}
		};
		
//	Methods

	/**
	  *		tabs = 	[ { silkIcon: 'xxx', label: 'yyy', /acton. }, { } ]
	  *
	  *		onClickFunction = name of callback function
	  *				When the i'th tab is clicked, the callback is <onClickFunction>(i)
	  *
	  */
	SimpleTabs.prototype.setTabs = function (tabs, onClickFunctionName)
		{
		this.m_tabs 	= tabs;
		this.m_onClick	= onClickFunctionName;
		};
		
	SimpleTabs.prototype.getHTML = function ()
		{
		var html = new Array();
		
		html.push ('<table border="0" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>');
		html.push ('<td background="/acton/image/stab/stab-bg.gif" align="'+this.m_align+'">');
		
		html.push ('<table border="0" cellspacing="0" cellpadding="0"><tr>');
		var maxVisibleIndex = -1;
		var firstVisibleIndex = -1;
		var count = this.m_tabs.length;
		for (var c = 0; c < count; c++)
			{
			var tab = this.m_tabs[c];
			if (!tab.display || (tab.display && tab.display == ""))
				{
				maxVisibleIndex = c;
				if(firstVisibleIndex == -1)
					{
					firstVisibleIndex = c;
					}
				}
			}
		for (var i = 0; i < count; i++)
			{
			var tab = this.m_tabs[i];
			if (!tab.display || (tab.display && tab.display == ""))
				{
				// 	Put out left edge of tab
				if (i == firstVisibleIndex)
					{
					var gif = (this.m_selected == 0) ? '/acton/image/stab/stab-bs.gif' : '/acton/image/stab/stab-bu.gif';
					html.push ('<td height="24"><img border="0" src="'+gif+'" width="1" height="24" style="display: block;"></td>');
					}
				else
					{
					var gif = (this.m_selected == i) ? '/acton/image/stab/stab-mus.gif' : ((this.m_selected == i-1) ? '/acton/image/stab/stab-msu.gif' : '/acton/image/stab/stab-muu.gif');
					html.push ('<td height="24"><img border="0" src="'+gif+'" width="14" height="24" style="display: block;"></td>');
					}

				//	Put out tab label
				var bgd = (this.m_selected == i) ? '/acton/image/stab/stab-sb.gif' : '/acton/image/stab/stab-ub.gif';
				var cls = (this.m_selected == i) ? 'sTabTextS' : 'sTabTextU';
				var pad = 'padding-left: 10px; padding-right: 5px';
				html.push (
						'<td height="24" background="'+bgd+'" style="'+pad+'; cursor: pointer" onClick="'+this.m_onClick+'('+i+')">' +
								'<span class="'+cls+'">'+this.getLabelHTML(i)+'</span>' +
								'</td>'
				);

				//	Put out right edge of tab
				if (i == maxVisibleIndex)
					{
					var gif = (this.m_selected == i) ? "/acton/image/stab/stab-es.gif" : "/acton/image/stab/stab-eu.gif";
					html.push ('<td height="24"><img border="0" src="'+gif+'" width="10" height="24" style="display: block;"></td>');
					}
				}
			}
		
		html.push ('</tr></table>');
		
		html.push ('</td>');
		html.push ('</tr></table>');
		
		return html.join(' ');
		};


