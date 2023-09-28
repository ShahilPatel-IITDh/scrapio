
	//<![CDATA[
	    function vote(p_nID)
	    {
			if (!g_oRequest)
				return true;
			var url = "/vote_comment.php?param=" + escape(p_nID) + '&amp;t=' + Math.floor(Math.random()*1000);
			g_oRequest.open("POST", url, true);
			g_oRequest.onreadystatechange = updatePage;
			g_oRequest.send(null);
	    }
		function updatePage() {
			if (g_oRequest && g_oRequest.readyState == 4) {
				if (g_oRequest.status == 200) {
					try {
					 	eval(g_oRequest.responseText);
					} catch (exc) {
					}
				}
			}
		
		}
		//]]>
    