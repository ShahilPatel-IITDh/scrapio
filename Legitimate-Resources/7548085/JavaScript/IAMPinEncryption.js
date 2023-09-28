function RIBLogon(){

	var exponentHexStr = "10001";
    var modulusHexStr;

	this.setKeyValue =function(publickey){
		modulusHexStr = publickey;
	}

	this.encyptPwd = function(pwd,rdmValue) {
		
		if (pwd == null){
			alert("pwd_empty");
			return;
		
		}
		var encBuff ;
		var dataBytes = buildPKCS15BlockForPinVerify(pwd,rdmValue);
		var rsa = null;
		
		 try{
			 rsa = new RSAKey();
		 } catch (e){throw "RSA constructor error when pwd verify";}

		rsa.setPublic(modulusHexStr, exponentHexStr);
		
		try {
			encBuff = rsa.encryptNativeBytes(dataBytes);
		} catch (e) {
			throw "RSA encrypt error when pin verify"; // errorcode"100" = get exception when encrypt data
		}
	
		return encBuff;	
	}

	this.encyptPwdChange = function(oldPwd, newPwd,rdm) {
	
		if (oldPwd == null || newPwd == null){
			return;
		}
			
		var encBuff ;
		
		var dataBytes = buildPKCS15BlockForPinChange(oldPwd, newPwd,rdm);
		var rsa = null;
		
		 try{
			 rsa = new RSAKey();
		 } catch (e){throw "RSA constructor error when pin changing";}

		 rsa.setPublic(modulusHexStr, exponentHexStr);
		
		try {
			encBuff = rsa.encryptNativeBytes(dataBytes);
			
		} catch (e) {
			throw "RSA encrypt error when pin changing"; // errorcode"100" = get exception when encrypt data
		}
	
		return encBuff;
		
	}

/**
    * This builds a byte array that is in accordance with PKCS#1 v1.5 standard
    * according to section 10.1 of Group Internet Banking System (GIB)
    * Communication Message Specification for a PIN Change operation
    * 
    * @param oldPin
    * @param newPin
    * @param random
    * @return
    * @throws UnsupportedEncodingException
    */
   function buildPKCS15BlockForPinChange(oldPin, newPin,random){

      if (random.length != 16) {
		 return;
      }
      if (oldPin.length > 30) {
		 return;
      }
      if (newPin.length > 30) {
		 return;
      }

      // block size is 128 bytes according to spec
      var bytes = new Array();

      // convert the PIN to bytes from string
      var oldPINBytes = Util.getByteArray(oldPin);

      // generate the 30 byte password portion
      var oldPasswordBytes = new Array(30);
      for (var i = 0; i < 30; i++) {
         if (i < oldPINBytes.length)
            oldPasswordBytes[i] = oldPINBytes[i];
         else
            oldPasswordBytes[i] =  0xFF;
      }

      // convert the PIN to bytes from string
      var newPINBytes = Util.getByteArray(newPin);

      // generate the 30 byte password portion
      var newPasswordBytes = new Array(30);
      for (var i = 0; i < 30; i++) {
         if (i < newPINBytes.length)
            newPasswordBytes[i] = newPINBytes[i];
         else
            newPasswordBytes[i] =  0xFF;
      }

      // convert the random number to bytes from string. Random number is
      // expected to be in hes format
      var randomBytes = Util.fromHexString(random);

      var zeros;
	  if(modulusHexStr.length == 256){
	   zeros = 128 - randomBytes.length - newPasswordBytes.length - oldPasswordBytes.length;
	  }
	  if(modulusHexStr.length == 512){
	   zeros = 256 - randomBytes.length - newPasswordBytes.length - oldPasswordBytes.length;
	  }
	  
	  var bytesPad = Util.randomBytes(zeros);  //this is for random bytes 
	  for (var i = 0; i < zeros; i++) {
         if (bytesPad[i] == 0x00) {
            // arbitrarily replace with 0x28 for now
            bytesPad[i] = 0x28;
         }
      }
	  bytesPad[0]=0x00;
	  bytesPad[1]=0x02;
	  bytesPad[10]=0x00;

	  bytes = bytesPad.concat(randomBytes);
	  bytes = bytes.concat(newPasswordBytes);
	  bytes = bytes.concat(oldPasswordBytes);
	 
      return bytes;
   }

	 /**
    * This method builds a byte array that is in accordance with PKCS#1 v1.5
    * standard according to section 10.1 of Group Internet Banking System (GIB)
    * Communication Message Specification for PIN verify operation
    * 
    * @param pin
    *           The users pin
    * @param random
    *           The random number as supplied from the host
    * @return a 128 byte array corresponding to the PKCS block
    * @throws UnsupportedEncodingException
    *            if ISO-8859-1 encoding is not supported
    */
   function buildPKCS15BlockForPinVerify( pin,random){
      
      if (pin.length > 30) {
		return;
      }

      // block size is 128 bytes according to spec
     var bytes = new Array();

      // convert the PIN to bytes from string
      var PINBytes = Util.getByteArray(pin);
	  
      // now generate the 30 byte password portion
      var passwordBytes = new Array(30);
      for (var i = 0; i < 30; i++) {
	  
         if (i < PINBytes.length)
		 {
		    passwordBytes[i] = PINBytes[i];
		 }
         else{
            passwordBytes[i] = 0xFF;
			}
    }
      // convert the random number to bytes from string
	 
      var RandomBytes = Util.fromHexString(random);
	
	  var zeros;
	  if(modulusHexStr.length == 256){
	   zeros = 128 - RandomBytes.length - passwordBytes.length;
	  }
	  if(modulusHexStr.length == 512){
	   zeros = 256 - RandomBytes.length - passwordBytes.length;
	  }
	 
	  var bytesPad = Util.randomBytes(zeros);  //this is for random bytes 
	
	  for (var i = 0; i < zeros; i++) {
         if (bytesPad[i] == 0x00) {
            // arbitrarily replace with 0x27 for now
            bytesPad[i] = 0x27;
         }
      }
	
	  bytesPad[0]=0x00;
	  bytesPad[1]=0x02;
	  bytesPad[10]=0x00;
	
	  bytes = bytesPad.concat(RandomBytes);
	  bytes = bytes.concat(passwordBytes);
	 
      return bytes;
   }
}
