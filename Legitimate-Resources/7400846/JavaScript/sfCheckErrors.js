//@BEGINVERSIONINFO

//@APPVERSION: 5.3001.0.1

//@FILENAME: sfcheckerrors.asp 
	 


//@DESCRIPTION: Checkes sfErrors

//@STARTCOPYRIGHT
//The contents of this file is protected under the United States
//copyright laws as an unpublished work, and is confidential and proprietary to
//LaGarde, Incorporated.  Its use or disclosure in whole or in part without the
//expressed written permission of LaGarde, Incorporated is expressly prohibited.

//(c) Copyright 2000 by LaGarde, Incorporated.  All rights reserved.
//@ENDCOPYRIGHT

//@ENDVERSIONINFO

function specialCase(e, form) {
	if ((e.name == "CardName")||(e.name == "CardNumber")||(e.name == "CardExpiryMonth")||(e.name == "CardExpiryYear")) {
		if (((form.CardName.value.length <= 0)||(form.CardNumber.value.length <= 0)||(form.CardExpiryMonth.value.length <= 0)||(form.CardExpiryYear.value.length <= 0))
		 && ((form.CardName.value.length > 0)||(form.CardNumber.value.length > 0)||(form.CardExpiryMonth.value.length > 0)||(form.CardExpiryYear.value.length > 0))) {
			return "Please enter all Credit Card Information.";
		}
		if ((form.CardName.value.length > 0)&&(form.CardNumber.value.length > 0)&&(form.CardExpiryMonth.value.length > 0)&&(form.CardExpiryYear.value.length > 0)) {
			if (!isCardDateValid(form.CardExpiryYear.value, form.CardExpiryMonth.value)) {
				return "The Credit Card has Expired.";
			}
			if (isCardNumValid(form.CardNumber.value)) {
				return "The Credit Card Number is an invalid format.";
			}
		}
	}
	if ((e.name == "CheckNumber")||(e.name == "BankName")||(e.name == "RoutingNumber")||(e.name == "CheckingAccountNumber")) {
		if (((form.CheckNumber.value.length <= 0)||(form.BankName.value.length <= 0)||(form.RoutingNumber.value.length <= 0)||(form.CheckingAccountNumber.value.length <= 0))
		 && ((form.CheckNumber.value.length > 0)||(form.BankName.value.length > 0)||(form.RoutingNumber.value.length > 0)||(form.CheckingAccountNumber.value.length > 0))) {
			return "Please enter all eCheck Information.";
		}		
	}
	if ((e.name == "POName")||(e.name == "PONumber")) {
		
		if (((form.POName.value.length <= 0)||(form.PONumber.value.length <= 0))
		 && ((form.POName.value.length > 0)||(form.PONumber.value.length > 0))) {
			return "Please enter all Purchase Order Information.";
		}
	}
	if ((form.CardName.value.length <= 0)&&(form.CardNumber.value.length <= 0)&&(form.CardExpiryMonth.value.length <= 0)&&(form.CardExpiryYear.value.length <= 0)
	 && (form.CheckNumber.value.length <= 0)&&(form.BankName.value.length <= 0)&&(form.RoutingNumber.value.length <= 0)&&(form.CheckingAccountNumber.value.length <= 0)
	 && (form.POName.value.length <= 0)&&(form.PONumber.value.length <= 0)) {
		return "Please enter payment method Information.";	
	}
	return "";
}
function stripChar(sValue, sChar) {
	var i, tempChar, buildString;
	buildString = ""
	for (var i=0; i<sValue.length; i++) {
		tempChar = sValue.charAt(i);
		if (tempChar != sChar) {
			buildString = buildString + tempChar;
		}
	}
	return buildString;
}

function isCardDateValid(year, month) {
	var dateCheck, now;
	if (year.length == 2) {
		if (parseInt(year) < 50) {
			year = "20" + year;
		}
	}
	now = new Date();
	dateCheck = new Date(year, month);
	if (now > dateCheck) {
		return false;
	}
	else {
		return true;
	}
}

function isCardNumValid(num) {
	var num1, num2, tempNum;
	if (!isNumber(num)) {
		return true;
	}
	num1 = ""
	if (!(num.length%2==0)) {
		for(var j=0; j < num.length; j++) {
			if ((j+1)%2==0){
				tempNum = 2 * num.charAt(j);
			}
			else {
				tempNum = 1 * num.charAt(j);
			}
			num1 = num1 + tempNum.toString();
		}
	}
	else{
		for(var j=0; j < num.length; j++){
			if ((j+1)%2==0){
				tempNum = 1 * num.charAt(j);
			}
			else{
				tempNum = 2 * num.charAt(j);
			}
			num1 = num1 + tempNum.toString();
		}
	}
	num2 = 0;
	for (var j = 0; j < num1.length; j++) {
		num2 = num2 + parseInt(num1.charAt(j));
	}
	if (num2%10==0) {
		return false;
	}
	else {
		return true;
	}
}

function isNumber(value) {
	for (var i=0; i < value.length; i++) {
		a = parseInt(value.charAt(i));
		if (isNaN(a)) {
			return false;			
			break;
		}
	}
	return true;
}

function sfCheck(form) {
	var e, title, empty_fields, char_check, invalid_card, month, year, invalid_date, eMail, invalid_eMail 
	var iQuantity, quantity_check, checkSpecial, tempError, special_Error, msg, upperLine, lowerLine
	var num, invalid_phoneNumber, passwd_mismatch
	msg = "";
	empty_fields = "";
	char_check = "";
	special_Error = "";
	tempError = "";
	num = form.length
	for (var i = 0; i < form.length; i++) {
		e = form.elements[i]
		if ((e.title == null)||(e.title == "")) {
			title = e.name;
		}
		else {
			title = e.title;
		}
		if (((e.type == "text") || (e.type == "textarea")||(e.type == "password")) && !e.special && !e.disabled) {
			if (e.value.length <= 0 && !e.optional && (e.name.indexOf("Ship") == -1)) {
				empty_fields += "\n            " + title;
				continue;
			}
			if (e.number) {
				num = e.value;
				num = stripChar(num, ".");
				num = stripChar(num, ",");
				if (!isNumber(num)) {
					char_check += "\n             " + title;
				}
			}
			if (e.creditCardNumber) {
				e.value = stripChar(e.value, " "); 
				e.value = stripChar(e.value, "-"); 
				invalid_card = isCardNumValid(e.value);
			}
			
			if ((e.creditCardExpMonth)||(e.creditCardExpYear)) {
				if (e.creditCardExpMonth) {
					month = e.value;
					month = stripChar(month, " ")
					if (!isNumber(month)) {
						invalid_date = true;
						month = null;
					}
				}
				if (e.creditCardExpYear) {
					year = e.value;
					year = stripChar(year, " ")
					if (!isNumber(year)) {
						invalid_date = true;
						year = null;
					}
				}
				if ((month != null) && (year != null)) {
					if(!isCardDateValid(year, month)) {
						invalid_date = true;
					}	
				}
			}
			if (e.eMail) {
				eMail = e.value;
				if ((eMail.indexOf("@") != -1) && (eMail.indexOf(".") != -1)) {
					invalid_eMail = false;
				}
				else {
					invalid_eMail = true;
				}
			}
                        if (e.name == "txtEmail") {
				eMail = e.value;
				if ((eMail.indexOf("@") != -1) && (eMail.indexOf(".") != -1)) {
					invalid_eMail = false;
				}
				else {
				  
					invalid_eMail = true;
				}
			}	
			if (e.name == "txtFriend") {
				eMail = e.value;
				if ((eMail.indexOf("@") != -1) && (eMail.indexOf(".") != -1)) {
					invalid_eMail = false;
				}
				else {
				  
					invalid_eMail = true;
				}
			}	

			if (e.phoneNumber) {
				num = e.value;
				num = stripChar(num, " ");
				num = stripChar(num, "-");
				num = stripChar(num, "+");
				if (num.length < 10) {
					invalid_phoneNumber = true;
				}	
			}
		}
		if (e.quantityBox) {
			iQuantity = e.value;
			if (!isNumber(iQuantity)) {
				quantity_check = true;
			}
			if (parseInt(iQuantity) < 0) {
				quantity_check = true;
			}
			if ((iQuantity) < 1) {
				quantity_check = true;
			}

		}
		if (e.password) {
			if (form.Password.value != form.Password2.value) {
					passwd_mismatch = true;
			}
		}
		if (e.special) {
			checkSpecial = specialCase(e, form);
			if (tempError != checkSpecial) {
				special_Error = special_Error + checkSpecial
			}
			tempError = checkSpecial;
		}
		if (e.type == "select-one" && !e.optional) {
			if (e.value == "") {
				empty_fields += "\n            " + title;
				continue;
			}
		}
	}
	
	if (!empty_fields && !char_check && !special_Error && !invalid_card && !invalid_date && !invalid_eMail && !quantity_check && !invalid_phoneNumber && !passwd_mismatch) {return true}
	
	msg = "The form was not submited due to the following error(s).\n";
	
	upperLine = "\n_________________________________________________________\n\n";
	lowerLine = "_________________________________________________________\n";
	
	if (empty_fields) {
		msg += upperLine;
		msg += "The following field(s) must be filled in:\n";
		msg += lowerLine;
		msg += empty_fields;
	}
	if (char_check) {
		msg += upperLine;
		msg += "The following field(s) need a numeric value:\n";
		msg += lowerLine;
		msg += char_check;
	}
	if (quantity_check) {
		msg += upperLine;
		msg += "Please Enter a Positive Integer.\n"
		msg += lowerLine;
	}
	if (invalid_card) {
		msg += upperLine;
		msg += "The Credit Card Number is an invalid format.\n";
		msg += lowerLine;
	}
	if (invalid_date) {
		msg += upperLine;
		msg += "The Credit Card has Expired.\n";
		msg += lowerLine;
	}
	if (invalid_eMail) {
		msg += upperLine;
		msg += "The Email Address is in an invalid format.\n";
		msg += lowerLine;
	}
	if (invalid_phoneNumber) {
		msg += upperLine;
		msg += "Please enter a valid Phone Number with area code.\n";
		msg += lowerLine;
	}
	if (special_Error) {
		msg += upperLine;
		msg += special_Error + "\n";
		msg += lowerLine;
	}
	if (passwd_mismatch) {
		msg += upperLine;
		msg += "Your passwords did not match. Please enter them again.\n";
		msg += lowerLine;
	}		
	alert(msg);
	return false;
}	
