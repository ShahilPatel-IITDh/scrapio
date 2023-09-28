function Entry(key,value){
	
	this.key=key;
	this.vale=value;
}

function EncryptionApplet(){
	
	var  modulus = "";
	var  exponent = "3";	
	var ECB_MODE = 0;
	var CBC_MODE = 1;

	// container to store the key, value pair
	var  data = new Array();
	
	var  desKey = "";
	
	this.EncryptionApplet = function (){
		
		
		if(this.desKey == null){
			try{
				
				this.desKey =create3DESKey();
			}catch(e){throw "300"}
			
			
		}
	//	console.log("this.deskey == "+this.desKey);
	//	console.log("this.deskey length == "+this.desKey.length);
	}
	
	this.destroy=function(){
			
			data=null;
		}	

		
		/**
	 * Encrypts and format the data stored in the Array. This involves the
	 * following steps:
	 * <ol>
	 * 	<li>Retrieve formatted data
	 * 	<li>Pad data with ~ into blocks of 8
	 * 	<li>Generate 3DES key
	 * 	<li>Initialize the RSA public key
	 * 	<li>RSA encrypt the 3DES key in ECB mode
	 * 	<li>3DES encrypt the formatted data
	 * 	<li>Form the encrypted data block
	 * 	<li>Base64 encode the encrypted data block
	 * </ol>
	 *
	 * The encrypted data block consists of:
	 * <ul>
	 * 	<li>5   bytes 	- RSA key length (e.g. 128)
	 * 	<li>1   byte	- 0x00
	 * 	<li>zzz bytes	- RSA encrypted data block
	 * 	<li>xxx bytes	- 3DES encrypted data block
	 * </ul>
	 *
	 * @return encrypted data;
	 */
	this. getEncryptedData=function(modulus) 	{
		// retrieves the formatted data
		 
		var  formatStr = formatData(data);
		 return formatStr; // in IBR, form encryption is disable. Comment out this line if need to enable form encryption
		
		if (formatStr == null) return null;

		// pad data with ~ until blocks of 8 bytes
		var  pads = 0;
		while (((formatStr.length + 1) % 8) != 0) {
			 formatStr +="~";
			 ++pads;
		}
		var pd = String.fromCharCode(pads);
		formatStr=pd+formatStr;
		
		var encKey;

		 var rsa = null;
		 if (modulus == null || exponent == null) throw "101";
		 try{
			 rsa = new RSAKey();
		 } catch (e){throw "102";}
		 //pubKeyCheck();
		
		 rsa.setPublic(modulus, exponent);
		
		try {
							
			var plaintext = new BigInteger(this.desKey,16);
  			encKey = rsa.encrypt(plaintext);
  			
		} catch (e) {
			throw "100"; // errorcode"100" = get exception when encrypt data
			}
				
			
			// 0. construct query string
			var  qryStr ="";
			var encData  ="" ;		
			
			var length = encKey.length;
		
			for (var i=0; i<4; i++) {
			
				var len = Math.floor(length%10)+"";
				
				qryStr=len+qryStr;

				length /= 10;
			}

			qryStr +=String.fromCharCode(0x00);
			
							
			// 2. add RSA encrypted key
			qryStr +=encKey;	
			
			try{
				encData = des3EncryptAsByte(this.desKey, formatStr, ECB_MODE);

				
			}catch(e){alert(e);throw "200"}
			
			// 3. Add 3DES encrypted data	
			var encDataArray = Util.getByteArray(encData);
			
			qryStr +=Util.toHexString(encDataArray);			

			// 4. URL encode query string			
			var encodedData = escape(qryStr);

			return encodedData;
			

		
	}
	
	
	/**
	 * Saves the name value pair into a Hashtable for encryption later.
	 *
	 * @param dataName containing the name
	 * @param dataValue containing the value
	 */
	this.addData=function( dataName, dataValue) {
		// validation check on dataName
		var entry=new Entry( dataName,  dataValue);
		
		// put into array
		entry.key=dataName;
		entry.value=dataValue;
		data.push(entry);
		
	}
	
	/**
	 * Formats the data to be encrypted by passing in the data stored in
	 * a Hashtable. The query string is defined as a key value pair with
	 * the value being URL encoded. Multiple key value pairs are joined
	 * by the '&' character.
	 *
	 * @param data containing the keys and value information.
	 * @return String containing the generated query String.
	 */
	function formatData( data) {

		
		var  result="";
		if (data == null) {
			return null;
		}
	//	console.log("data length == "+data.length);
		// retrieve the keys and values
		for(var i=0; i<data.length; i++) {
			var entryItem = data[i];
			var key =  entryItem.key;
			var value = entryItem.value;
			var item = escape(key) + "=" + escape(value) + "&";
			result+=item;	
		}

		// check if last character is &
	
		if (result.charAt(result.length-1) == '&') {
			// MS JVM does not support substring() on StringBuffer objects.
			var resultStr;
			// strip the last character
			resultStr = result.substring(0, result.length-1);
			return resultStr;
		}
		
		return result;
	}
	
	/**
	 *create 3des key
	 */
		function create3DESKey(){
			
		var key = generateRandomString(24);
		var xarray = Util.getByteArray(key);
		
		return Util.toHexString(xarray);
	
	
	}

	/**
	 * Performs 3DES encryption on the String argument and return the results as
	 * a byte array.
	 *
	 * @param des3Key containing 3DES key
	 * @param data to be encrypted
	 * @param mode whether EBC or CBC
	 * @return 3DES encrypted data
	 * @throws Exception when there is a problem with the encryption
	 */
	function des3EncryptAsByte( des3Key,  data,  mode){
		var initVector =  String.fromCharCode(0,0,0,0,0,0,0,0);//8bytes value
		//console.log("3deskey in HEXstring == "+des3Key);
		var strdeskey = Util.fromHexToString(des3Key);
		
		return des(strdeskey, data,1, mode,initVector ,1);
	}

	/**
	 * Performs RSA encryption on the String argument and return the results as
	 * a byte array.
	 *
	 * @param data to be encrypted
	 * @return RSA encrypted data
	 * @throws Exception when there is a problem with the encryption
	 */
	function rsaEncryptAsByte( data){
		return Util.fromHexString(encryptB(fromHexString(data)));		
	}
	
 function generateRandomString(numOfBytes){
	var x =  "";
	var i = 0;
	
	for (i=0;i<numOfBytes;i++){
		
		x = x + String.fromCharCode( Math.ceil(Math.random()*255) );

	}
	
	return x;
 }

 this.getUserIDHexString = function(useridStr)
{
  var useridByte = Util.getByteArray(useridStr);
  userIDHexString = "";
  for (var i = 0 ; i < useridByte.length; i++){
    var num = "";
    if ( useridByte[i] <= 0xF) num = "0"+useridByte[i].toString(16);
    else num = useridByte[i].toString(16);
    userIDHexString = userIDHexString + num;
  }
  return userIDHexString + "00";
}
		
}

