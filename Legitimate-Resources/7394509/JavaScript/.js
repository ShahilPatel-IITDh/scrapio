
		var ucoz_rndid = 'cYE8AW';
		function uOnDomOrLater(f){
			if(document.readyState == 'loading') {
				if(document.addEventListener) {
					document.addEventListener('DOMContentLoaded',f);
				} else {
					window.attachEvent('onload',f);
				}
			} else {
				setTimeout(f,0);
			}
		}
	document.write('<div style="width:0px;height:0px;position:fixed;right:0px;top:0px;display:none;overflow:hidden;z-index:2147483640;margin:0;padding:0;background:none;" id="dVcYE8AW"></div>');
			var mscript=document.createElement('script');
			mscript.src="//"+location.hostname+"/?5GwvkAIPNJ2aJZ%3Bravfrip6FuJLnxk%217iCBcTkNl%21tRB8krJWNKgyFVu6V%5E71N4PbDPfh62pQfaeLbxKPVMlV%21idqmYJw%3Bft8FlBLSW%21vwreHl9z7PaqX1XUKTtXy3SOBbZBZ1e3J%3B%214OZ1kK18E3jY9D3tqDsttb%21TDqjHo";
			document.getElementsByTagName('head')[0].appendChild(mscript);
		    function resizeDiv(islasttry){
		        var WX,WY,BX,BY;
		        var o=document.getElementById("dVcYE8AW"),t,d;
		        if (!o) return;
		        if(typeof window.self_getsizes == 'function'){
		            var s=self_getsizes();
		            if(s.err==1 && !islasttry) return;
		            if(isNaN(s.BX)) s.BX==0;
		            if(isNaN(s.BY)) s.BY==0;
		            if(s.err==1){
		                if (!(t=document.getElementById("bannerXcYE8AW"))) return;
		                else s.BX=t.value;
		                if (!(t=document.getElementById("bannerYcYE8AW"))) return;
		                else s.BY=t.value;
		            }
		            BX=s.BX;
		            BY=s.BY;
		        }else{
		            if (!(t=document.getElementById("bannerXcYE8AW"))) return;
		            else BX=t.value;
		            if (!(t=document.getElementById("bannerYcYE8AW"))) return;
		            else BY=t.value;
		        }
		        if (!(t=document.getElementById("wrapperXcYE8AW"))) WX=0;
		        else WX=t.value;
		        if (!(t=document.getElementById("wrapperYcYE8AW"))) WY=0;
		        else WY=t.value;
		        d=document.getElementById("mainadsdvcYE8AW");
		        if(d){
		            if (BX<0) d.style.width="100%";
		            else if (BX>0) d.style.width=BX+"px";
		            if (BY<0) d.style.height="100%";
		            else if (BY>0) d.style.height=BY+"px";
		        }
		        BX=parseInt(BX)+parseInt(WX);
		        BY=parseInt(BY)+parseInt(WY);
		        if (BX<0) o.style.width="100%";
		        else if (BX>0) o.style.width=BX+"px";
		        if (BY<0) o.style.height="100%";
		        else if (BY>0) o.style.height=BY+"px";
		        o.style.display='';
		        return true;
		    }
		
				uOnDomOrLater(function(){
					window.uShowAdBanner && window.uShowAdBanner();
				});
			