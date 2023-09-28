
		$(document).ready(function() {
		if ($(".ctn-overdue").find(".advisehead").length) {
			widover = $('.ctn-overdue').width();
			 var dv = document.createElement("div");
			$(dv).addClass("ctn-trasp");
					     $(dv).css('height','100%');
					     $(dv).css('z-index',100000); 
					     $("body").append(dv);        
			$(".ctn-overdue").css('display','block');
			$(".ctn-overdue").css('z-index',100001);
			document.cookie = "trr_s_origem=Terra Mail;domain=.terra.com.br;path=/";
			document.cookie = "trr_s_ad_origem=http://mail.terra.com.br/;domain=.terra.com.br;path=/";
			_gaq.push(['_trackEvent', 'mktdir', 'terramail','porteira_cobavs_pv']);
			
		}else{
			return false;
		}			
		$(".ctn-overdue .fechar").click(function(){
			$(".ctn-overdue").css('display','none');
			$(".ctn-trasp").hide();
			location.href="/";
		});
		
		$(".ctn-overdue .entrar").click(function(){
			_gaq.push(['_trackEvent', 'mktdir', 'terramail','porteira_cobsus_cl']);
		});
		});
     