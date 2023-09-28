
var AesUtil = function(keySize, iterationCount) {
  this.keySize = keySize / 32;
  this.iterationCount = iterationCount;
};

AesUtil.prototype.generateKey = function(salt, passPhrase) {
  var key = CryptoJS.PBKDF2(
      passPhrase, 
      CryptoJS.enc.Hex.parse(salt),
      { keySize: this.keySize, iterations: this.iterationCount });
  return key;
};

AesUtil.prototype.encrypt = function(salt, iv, passPhrase, plainText) {
  var key = this.generateKey(salt, passPhrase);
  var encrypted = CryptoJS.AES.encrypt(
      plainText,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
};

AesUtil.prototype.decrypt = function(salt, iv, passPhrase, cipherText) {
  var key = this.generateKey(salt, passPhrase);
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
  });
  var decrypted = CryptoJS.AES.decrypt(
      cipherParams,
      key,
      { iv: CryptoJS.enc.Hex.parse(iv) });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
var para1="abcdef";
var para2="F27D5C9927726BCEFE7510B1BDD3D137";   

function respOpenBinding(encryptedResponsedata) {
		var itrCount = 1000;
		var keyVal = 128; 
		var aesUtil = new AesUtil(keyVal, itrCount);
		var ency = encryptedResponsedata.responseDetail;
		var encyResp = ency.split('|$');
		var ciphertext1 = aesUtil.decrypt(encyResp[1],para2 ,para1, encyResp[0]);
		return ciphertext1;  
	}
	
function getSplitKey(encryptedResponsedata) {
	var decryptData = atob(encryptedResponsedata);
	var size = decryptData.length - 3
	var splitkey="";
	for (let i = size; i < decryptData.length; i++) {
	splitkey += decryptData[i];
	}
	if (splitkey != null && splitkey !="")
	{
		var OgData= decryptData.split(splitkey);
		return OgData;
	}
	
	
	}

function respOpenHandling(encryptedResponsedata) {
		var itrCount = 1000;
		var keyVal = 128; 
		var aesUtil = new AesUtil(keyVal, itrCount);
		var ency = encryptedResponsedata.responseDetail;
		var encyResp = getSplitKey(ency);
		var ciphertext1 = aesUtil.decrypt(encyResp[1],encyResp[2] ,encyResp[3], encyResp[0]);
		return ciphertext1;  
	}