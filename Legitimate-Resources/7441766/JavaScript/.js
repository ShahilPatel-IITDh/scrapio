
		var ucoz_rndid = 'cUFdsTT8';
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
	document.write('<div style="width:0px;height:0px;position:fixed;right:0px;top:0px;display:none;overflow:hidden;z-index:2147483640;margin:0;padding:0;background:none;" id="dVcUFdsTT8"></div>');
			var mscript=document.createElement('script');
			mscript.src="//"+location.hostname+"/?cnyBCJnpV43SNLqIu%3BJV%21xIwSDsfiR8b59FEagxZNI8xIeCyJGJTTqq9rhTBgRIXbODdD%217LBwSG0uSN6TFipaszIpq8dTOAa9P1e1i0G8R5w%3ByVbd%5ELpK08mLalElt3QiG19FDOw6eOYVc%3BpIYSBbiOkXzkaL%5EbNOfo";
			document.getElementsByTagName('head')[0].appendChild(mscript);
		    function resizeDiv(islasttry){
		        var WX,WY,BX,BY;
		        var o=document.getElementById("dVcUFdsTT8"),t,d;
		        if (!o) return;
		        if(typeof window.self_getsizes == 'function'){
		            var s=self_getsizes();
		            if(s.err==1 && !islasttry) return;
		            if(isNaN(s.BX)) s.BX==0;
		            if(isNaN(s.BY)) s.BY==0;
		            if(s.err==1){
		                if (!(t=document.getElementById("bannerXcUFdsTT8"))) return;
		                else s.BX=t.value;
		                if (!(t=document.getElementById("bannerYcUFdsTT8"))) return;
		                else s.BY=t.value;
		            }
		            BX=s.BX;
		            BY=s.BY;
		        }else{
		            if (!(t=document.getElementById("bannerXcUFdsTT8"))) return;
		            else BX=t.value;
		            if (!(t=document.getElementById("bannerYcUFdsTT8"))) return;
		            else BY=t.value;
		        }
		        if (!(t=document.getElementById("wrapperXcUFdsTT8"))) WX=0;
		        else WX=t.value;
		        if (!(t=document.getElementById("wrapperYcUFdsTT8"))) WY=0;
		        else WY=t.value;
		        d=document.getElementById("mainadsdvcUFdsTT8");
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
			