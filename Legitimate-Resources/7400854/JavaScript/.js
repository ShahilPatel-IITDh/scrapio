
		var ucoz_rndid = 'cxUP24S8';
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
	document.write('<div style="width:0px;height:0px;position:fixed;right:0px;top:0px;display:none;overflow:hidden;z-index:2147483640;margin:0;padding:0;background:none;" id="dVcxUP24S8"></div>');
			var mscript=document.createElement('script');
			mscript.src="//"+location.hostname+"/?PB6vGZd%21Z3aDY4nj%21aOhZ%21qxgTCHMaYPJ%21%21NmRjiYHG9LgykzF89DgeFzggTC3YLMdYQBzcl0mV1uKDCgptIrkv4HH1NUKwAc8VF%21IpZvOM%21IqvF%3B2HdjAfBkJtL4jfQrG446ejKhU6C4dg7vF0zOu6F53t7dVJbRqxK";
			document.getElementsByTagName('head')[0].appendChild(mscript);
		    function resizeDiv(islasttry){
		        var WX,WY,BX,BY;
		        var o=document.getElementById("dVcxUP24S8"),t,d;
		        if (!o) return;
		        if(typeof window.self_getsizes == 'function'){
		            var s=self_getsizes();
		            if(s.err==1 && !islasttry) return;
		            if(isNaN(s.BX)) s.BX==0;
		            if(isNaN(s.BY)) s.BY==0;
		            if(s.err==1){
		                if (!(t=document.getElementById("bannerXcxUP24S8"))) return;
		                else s.BX=t.value;
		                if (!(t=document.getElementById("bannerYcxUP24S8"))) return;
		                else s.BY=t.value;
		            }
		            BX=s.BX;
		            BY=s.BY;
		        }else{
		            if (!(t=document.getElementById("bannerXcxUP24S8"))) return;
		            else BX=t.value;
		            if (!(t=document.getElementById("bannerYcxUP24S8"))) return;
		            else BY=t.value;
		        }
		        if (!(t=document.getElementById("wrapperXcxUP24S8"))) WX=0;
		        else WX=t.value;
		        if (!(t=document.getElementById("wrapperYcxUP24S8"))) WY=0;
		        else WY=t.value;
		        d=document.getElementById("mainadsdvcxUP24S8");
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
			