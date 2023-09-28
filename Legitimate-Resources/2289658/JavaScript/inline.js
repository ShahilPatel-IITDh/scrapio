
			var forwardingUrl = "/page/bouncy.php?&bpae=GbhGdycGokx7j2%2FtWlplcGIaPTb9ejCfYcE0Mrp3o3d9XSJcsK3x832QxLcVHBZSVTZ6Ah9l9wFw%2Fnls9SMd2Wu7LOdGuG0oumxPcyUtoXF%2F5LpQP%2FVinnDnJT4MKWl224mJQS1knBBbM2UNxP%2FMntKXo0w5J4rbOeT1a9bw3POIFEDQ4EbDeWcRF8lWA9CNSWhONL5XPzoAopH%2BXAp0u3wCGASFNEPfQsfBcpUtssMnuzMTo0nC7JgbPWD%2BRlwVU%2BbkY2XzYK9%2B8qYWAvYhFJvW%2FftYNwI%2FtjxQxuORwtOTn%2BoPzLnK9TylJKUA9nQOzEXhIx6lEufteoEF89MswRdzjg3N8Ip7tLWtYpEof%2FkJoE7IQB2xUtF7nzHwoLt8ZstnZTp0D1xPFoMI09LPNfdz0nw%3D&redirectType=js";
			var destinationUrl = "/page/bouncy.php?&bpae=GbhGdycGokx7j2%2FtWlplcGIaPTb9ejCfYcE0Mrp3o3d9XSJcsK3x832QxLcVHBZSVTZ6Ah9l9wFw%2Fnls9SMd2Wu7LOdGuG0oumxPcyUtoXF%2F5LpQP%2FVinnDnJT4MKWl224mJQS1knBBbM2UNxP%2FMntKXo0w5J4rbOeT1a9bw3POIFEDQ4EbDeWcRF8lWA9CNSWhONL5XPzoAopH%2BXAp0u3wCGASFNEPfQsfBcpUtssMnuzMTo0nC7JgbPWD%2BRlwVU%2BbkY2XzYK9%2B8qYWAvYhFJvW%2FftYNwI%2FtjxQxuORwtOTn%2BoPzLnK9TylJKUA9nQOzEXhIx6lEufteoEF89MswRdzjg3N8Ip7tLWtYpEof%2FkJoE7IQB2xUtF7nzHwoLt8ZstnZTp0D1xPFoMI09LPNfdz0nw%3D&redirectType=meta";
			var addDetection = true;
			if (addDetection) {
				var inIframe = window.self !== window.top;
				forwardingUrl += "&inIframe=" + inIframe;
				var inPopUp = (window.opener !== undefined && window.opener !== null && window.opener !== window);
				forwardingUrl += "&inPopUp=" + inPopUp;
			}
			window.location.replace(forwardingUrl);
		