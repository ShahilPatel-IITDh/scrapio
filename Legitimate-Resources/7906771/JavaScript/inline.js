
InitFoundation();	// sajat Foundation kiegeszitesek, zentk_foundation.js
Zentk.setGlobalParam('zentk-mobilapp-safe-area-inset-top', 0);
Zentk.setGlobalParam('zentk-mobilapp-safe-area-inset-bottom', 0);

$(document).zentkBefore();
$(document).foundation();

	$(document).ready(function(){
		Zentk.setGlobalParam('zentk-request-done', function(){
			//Zentk.getZentkContentHandler().setContent(this.getResult(),this.getTarget(),this.getContentParams());
			var resultcode = this.getResultCode();
			if (resultcode == 'interror')
			{
				$('#content').zentkHtml(this.getResult());
			}
			else if (resultcode == 'error')
			{
				this.keepOriginalLoaderTarget().keepOriginalOverlayTarget().setTarget('_closablepopup');
				Zentk.getZentkContentHandler().setContentFromRequest(this);
			}
			else if (resultcode == 'warning')
			{
				(Zentk.getZentkContentHandler().getResultBodyFromRequest(this)).addToMessageBoard(5000);
			}
			else if (resultcode == 'canceled')
			{
				this.keepOriginalLoaderTarget().keepOriginalOverlayTarget().setTarget('_popup');
				Zentk.getZentkContentHandler().setContentFromRequest(this);
			}
			else if (resultcode == 'tresholded')
			{
				reEnablePage();
				chooseLoginMode();
				$('#tresholded').css("display", "block").shake();
			}
			else
			{
				Zentk.getZentkContentHandler().setContentFromRequest(this);
			}
		});
		
	    $(document).zentk();
	    setExtMsg();
	    setBrowserFingerprint();
	    $('#lang-radio-hu').prop('checked', 'checked');
	    $('#lang-menuitem-hu').addClass('active');
	    
		new ZentkAJAXRequest().setAction('/eibpublic_ib_S5/LPExt/logininfo.hu.html?version=1684847475').done(function(request){
			$('#logininfo').zentkHtml(request.getResult());
			if(and(Zentk.getZentkMobilappHandler().isMobilapp(), !Zentk.getZentkMobilappHandler().isVersionAbove(1,0,0))){
				$('#logininfo').find('a').each(
					function(){
						var link = $(this);
						var content = link.contents();
						link.after(content);
						link.remove();
					}
				);
			}
		}).send();
		new ZentkAJAXRequest().setAction('/eibpublic_ib_S5/LPExt/usefullinks.hu.html').done(function(request){
			$('#usefullinks').zentkReplaceWith(request.getResult());
		}).send();
		/*new ZentkAJAXRequest().setAction('/eibpublic_ib_S5/LPExt/headerbanner.hu.html').done(function(request){
			$('#headerbanner').zentkHtml(request.getResult());
		}).send();*/
		
        var stateObj = { foo: "clearSearchParams" };
        history.replaceState(stateObj, "MBH Netbank (korábban Takarék)", window.location.href.split('?')[0]);
        //Zentk.setGlobalParam('zentk-form-fixparams', { pageid : $('#pageid').zentkval()});	// elrontja a ViCA logint
 
		Zentk.getZentkContentHandler().setDefaultTarget('#ans');
		Zentk.getZentkMobilappHandler().setAppversion('').setStoredLang('hu');

		if(Zentk.getZentkMobilappHandler().isMobilapp()){
			//$('#loginfooter').remove();
			//alert('APP');
		}
		
		if(and(Zentk.getZentkMobilappHandler().isMobilapp(), Zentk.getZentkMobilappHandler().isVersionAbove(3,0,0,true))){
			var saev = 'getSafeAreaInset.'+ Zentk.createUniqueId();
			Zentk.getZentkMobilappHandler().addListener(saev,
				function(sender,data){
					Zentk.getZentkMobilappHandler().removeListeners(saev);
					setSafeAreaInset(data.top, data.bottom);
				}
			);
			Zentk.getZentkMobilappHandler().getSafeAreaInset();
		}

		if (loginMode != "")
		{
			//$('#modechooser').addClass('hide');
	   		//$('#'+mode).show();
	   		$('#signinbutton').removeClass('hide');
	   		if (loginMode=='vicalogin') {
	   			$('#loginform').getZentkForm().setAction('/eib_ib_S5/loginvica');
	   			$('#loginform').attr('action','/eib_ib_S5/loginvica');
	   			$('#vicauid').focus();
	   		}
	   		else if (loginMode=='tokenlogin') {
	   			$('#loginform').getZentkForm().setAction('/eib_ib_S5/login');
	   			$('#loginform').attr('action','/eib_ib_S5/login');
	   			$('#tokenuid').focus();
	   		}
	   		else {
	   			$('#loginform').getZentkForm().setAction('/eib_ib_S5/login');
	   			$('#loginform').attr('action','/eib_ib_S5/login');
	   			$('#uid').focus();
	   		}
			Zentk.getZentkContentHandler().addDefaultButton('signinbutton');
		}
		
       });

		/*
		function do_help(url){
			if(and(Zentk.getZentkMobilappHandler().isMobilapp(), !Zentk.getZentkMobilappHandler().isVersionAbove(1,0,0))){
				var frame = $('<iframe style="height: 100%; width: 100%" frameborder="0" allowTransparency="yes" scrolling="auto"></iframe>');
				frame.attr('src',url);
				
				
				var reveal = $('#mainpanel').createReveal(true);
				reveal.append(frame);
				reveal.foundation('open');
			}
			else{
				new ZentkRequest()
					.setAction(url)
					.setTarget('_blank')
					.send();
			}
		}
		*/

	function setExtMsg() {
		var loact = '';
		location.search.substr(1).split('&').forEach(function(item){
			tmp = item.split('='); 
			if (tmp[0] === 'logoutaction') loact = tmp[1];
		});
		
		var ext = /[a-z]+/.exec(loact);
		if (ext != null && ext.length > 0) {
			$('#'+ext).show();
			if (ext = 'logout') $('#'+ext).fadeOut(3500);
		}
	}
   	
