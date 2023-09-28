	String.prototype.trim = function() {
    		var str = this.replace(/^\s*/, "");
    		str = str.replace(/\s*$/, "");
		return str;
	}
	
	function Imprimir( frameToprint ){
		if(document.all){
			frameToprint.window.focus();
			frameToprint.window.print();
		} else {
			frameToprint.print();
		}
	}
	
	function existe_email(value) {
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) 
	   	{ 
    		return false; 
	    } 
		else
			return true;
	}
	
	function abre_janela(url,nome,str)
	{
		var win = window.open(url,nome,str+',status=no,toolbar=no,menubar=no,location=no,resizable=no');
	}
	
	
	// funções para manipulação de arrays
	function CreateArray () {
		this.length = -1;
	}

	function AddArray( array, value ){
		array.length++;
		array[ array.length ] = value;
		return array.length;
	}
	
	function CountArray( array ){
		return ( array.length );
	}
	
	function ClearArray( array ){
		array.length = -1;
	}	

	//funções básicas para consistencia
	var list_erros = new CreateArray();
	
	function FocusControl( index ){
		list_erros[ index ][1].focus();
	}
	
	function ClearListErrors(){
		ClearArray( list_erros );
	}
	
	function AddError( message, object ) {
		var index = AddArray(list_erros, "" );
		list_erros[ index ] = new CreateArray();
		AddArray(list_erros[ index ], message );
		AddArray(list_erros[ index ], object );
	}
	
	function ShowListErrors(){
		var HTML = "";
		var TABLE_BEGIN        = "<table class='erro'>";
		var TABLE_END          = "</table>";
		var TR_BEGIN           = "<tr>";
		var TR_END             = "</tr>";
		var TD_BEGIN           = "<td>";
		var TD_END             = "</td>";
		 
		if( CountArray( list_erros ) > -1 ){
			HTML += TABLE_BEGIN;
		} 

		for(i = 0; i <= CountArray( list_erros ); i++){
			HTML += TR_BEGIN;
			HTML += TD_BEGIN;
			HTML += "	<a href='javascript:FocusControl(" + i +")' onclick='' >" + list_erros[i][0] + " Corrigir?" + "</a> ";
			HTML += TD_END;
			HTML += TR_END;
			
		}

		if( CountArray( list_erros ) > -1 ){
			HTML += TABLE_END;
		} 

		var message = document.getElementById( "message" );
		if( message ){
			message.innerHTML = HTML;
		}
		return ( CountArray( list_erros ) == -1 );
	}

	/********************************************
	INICIO CALENDARIO
	*********************************************/	
	var calendar = null;
	var ma       = [];
	function selected(cal, date) {
		if ( (cal.sel.readOnly == false)  )
			cal.sel.value = date; // just update the date in the input field.
		if (cal.dateClicked )
		    cal.callCloseHandler();
	}

	function closeHandler(cal) {
		cal.hide();                        // hide the calendar
		calendar = null;
	}

	function showCalendar(id) {
		var el = document.getElementById(id.name);
		if (calendar != null) {
		  // we already have some calendar created
		  calendar.hide();                 // so we hide it first.
		} else {
			// first-time call, create the calendar.
			var cal = new Calendar(false, null, selected, closeHandler);
			// uncomment the following line to hide the week numbers
			cal.loc = "geral";
			cal.weekNumbers = false;
	      	cal.showsTime = false;

		    cal.showsOtherMonths = true;
			
			calendar = cal;                  // remember it in the global var
			cal.setRange(1900, 2070);        // min/max year allowed.
			cal.create();
		}
		calendar.setDateFormat("%d/%m/%Y");    // set the specified date format
		calendar.parseDate(el.value);      // try to parse the text in field
		calendar.sel = el;                 // inform it what input field we use
		calendar.showAtElement(el);        // show the calendar below it

		return false;
	}
	

	function specialField(obj) {
		keyPressed = event.keyCode;
		if(obj.value.length > 10 && keyPressed != 9 && keyPressed != 16) findNextFormElement(obj).focus();
		if(!(keyPressed >= 48 && keyPressed <= 57)) { event.returnValue = false; }
		if((obj.value.length == 2 || obj.value.length == 5) && (keyPressed != 8 || keyPressed !=37 || keyPressed != 39)) obj.value += '/';
	}
	
	/********************************************
	FIM CALENDARIO
	*********************************************/
	function ResizeIframeReport(Height){
		var iframe = document.getElementById("id_iframe_report");
		if (iframe) {
			iframe.height = Height;
		}
	}

	function PrintReport(){
		var tempFrame = $('#id_iframe_report')[0];
        var tempFrameWindow = tempFrame.contentWindow? tempFrame.contentWindow : tempFrame.contentDocument.defaultView;
        tempFrameWindow.focus();
        tempFrameWindow.print();
	}
	
	function ShowReport(url_report){
		var container = document.getElementById("container_report");
		if ( container ) {
			//prepare
			container.title = "Visualizar";
			container.innerHTML = 
				"\n<input type=\"button\" id=\"id_printer\" value=\"Imprimir\" alt=\"Imprimir\" title=\"Imprimir\" onclick=\"javascript:PrintReport();\" style=\"float:right;\"><br>" +
				"\n<center><iframe id=\"id_iframe_report\" name=\"iframe_report\" scrolling=\"No\" frameborder=\"0\" style=\"width:170mm;\" src=\"" + url_report + "\"></iframe></center> " +
				"\n<br>";
			
			//show
			$( "#container_report" ).dialog({
				width:690,
				resizable: false,
				modal: true,
				closeText : 'Clique aqui para fechar este relatório',
				open: function(event, ui) {
					$(event.target).parent().css('top', '90px');
				}
			});
			
			//scroll animate
			$('html,body').stop().animate({scrollTop: $("#container_report").offset().top-35}, 1000);
		}
	}