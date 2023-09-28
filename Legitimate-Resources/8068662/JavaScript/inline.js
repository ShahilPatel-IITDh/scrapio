
	window.onload = function GetIDADataIfEnabled() {
        // If TruValidate enabled we need to collect the TUSessionID
        

        //If FraudNet enabled we need to geather browser data
         
	}

	$("#eCreditCardNumber").keypress(function (e) {
		let charCode = (e.which) ? e.which : e.keyCode;
		if ((charCode >= 48 && charCode <= 57) || charCode == 45) {
			return true;
		}
		return false;
	});
	$("#eCreditCardNumber").keyup(function () {
		unMaskedCreditCardNumber = this.value;
	});
	$("#eCreditCardNumber").hover(function () {
		if ((typeof unMaskedCreditCardNumber == "undefined" || unMaskedCreditCardNumber =="") && (typeof $("#eCreditCardNumber").val() != "undefined" && $("#eCreditCardNumber").val().length > 0))
			unMaskedCreditCardNumber = $("#eCreditCardNumber").val();
		$("#eCreditCardNumber").val(unMaskedCreditCardNumber);
		});
	$("#eCreditCardNumber").mouseout(function () {
		if (typeof unMaskedCreditCardNumber != "undefined" && (unMaskedCreditCardNumber.length == 16 || unMaskedCreditCardNumber.length == 19)) {
			$("#eCreditCardNumber").val(maskCCNumber()).trigger("blur");
	}
	});

	//progress bar
	
