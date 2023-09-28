
				
				function checkstat(a,v){var set=new Array();if(typeof v=="string")
				
				{set[0]=parseInt(v.substring(0,1))}else{set[0]=(v==3||v==4)?0:1}
				
				var jv,sz,sc,i;js="";var td=new Date();var tm=td.getTime();
				
				var s=screen;var d=document;var l="https://www.checkstat.nl/cgi-bin/";
				
				var lo=d.URL;var n=navigator;var re=typeof(top.document)=="object"?
				
				top.document.referrer:d.referrer;for(i=0;i<=5;i++)
				
				{d.write('<script language="javascript1.'+i+'">js="'+i+'"<\/script>')}
				
				if(js>=1){jv=n.javaEnabled()?"y":"n"}if(js>=2){sz=s.width+"*"+s.height;
				
				sc=n.appName.substring(0,9)=="Microsoft"?s.colorDepth:s.pixelDepth;}
				
				var ar="&location="+escape(lo)+"&screensize="+sz+"&screencolors="+sc+
				
				"&javascript=1."+js+"&java="+jv+"&referrer="+escape(re)+"&time="+tm;
				
				if(set[0]){d.write('<a target=_blank href="'+l+'show.cgi?'+a+
				
				'"><img nosave name=icon width=19 height=19 border=0 alt="CheckStat" '+
				
				'src="'+l+'count.cgi?'+a+ar+'"><\/a>')}else{d.write('<img width=1 '+
				
				'height=1 src="https://www.checkstat.nl/cgi-exe/count.cgi?'+a+ar+'">')}}checkstat('vhhoogveen','110')
				
				