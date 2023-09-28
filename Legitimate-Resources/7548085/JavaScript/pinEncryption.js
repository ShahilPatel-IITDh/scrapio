/*************************************************************************************

    Copyright (C) SafeNet, Inc 2013
    All Rights Reserved - Proprietary Information of SafeNet, Inc.
    Not to be Construed as a Published Work.

**************************************************************************************

    Project Name : Online Banking Support Module JavaScript
    Module Name : pinEncryption.js
    Scope : This module includes main OBM Javascript file to perform RSA-OAEP encoding.
    Purpose : To provide the JavaScript Password Encryption methods.
    Original Author : Teenu Gulati
    Date Created : 25/11/2013
    Notes : The following functions are defined in this module :

    OBM_EncryptPassword() - method called by Javascript/ any web page to encrypt a user password using SHA1 Hash.
    OBM_EncryptPassword_Ex() - method called by Javascript/ any web page to encrypt a user password using SHA1 or SHA2 Hash.
	OBM_GetEncryptedPassword() - accessor method to return encrypted user password message(ie. C_String).
	OBM_GetEncodingParameter() - accessor method to return Encoding Parameter (ie. P_String).
	OBM_EncryptChangePassword() - method encodes and encrypts an old and new user password in a form that can be sent to the 
								SafeNet HSM to effect a password change using SHA1 Hash.
	OBM_EncryptChangePassword_Ex() - method encodes and encrypts an old and new user password in a form that can be sent to the 
								SafeNet HSM to effect a password change using SHA1 or SHA2 Hash.
	                                                         
    Version History :

    Version No    Date        		Author             Details
       1.0	 	25/11/2013     Teenu Gulati       Initial Creation
       1.1	 	16/07/2014     Teenu Gulati       JIRA ID : HSMPS-37 fixed
	   1.2	 	05/11/2014     Teenu Gulati       JIRA ID : HSMPS-69 1) Added support for OBM_EncryptChangePassword and OBM_EncryptChangePassword_Ex
																	 2) Add support for PIN with special characters
/***************************************************************************************/

/********************************* SHA-1/SHA-2 HASH SUPPORT ***********************************/

var SUPPORTED_ALGS = 4 | 2 | 1;
var missingBytes = 0;

(function (window)
{
	"use strict";
	/**
	 * Int_64 is a object for 2 32-bit numbers emulating a 64-bit number
	 *
	 * @private
	 * @constructor
	 * @this {Int_64}
	 * @param {number} msint_32 The most significant 32-bits of a 64-bit number
	 * @param {number} lsint_32 The least significant 32-bits of a 64-bit number
	 */
	function Int_64(msint_32, lsint_32)
	{
		this.highOrder = msint_32;
		this.lowOrder = lsint_32;
	}

	/**
	 * Convert a string to an array of big-endian words
	 * If charSize is 8, characters >255 have their hi-byte silently
	 * ignored.
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @param {number} charSize The length, in bits, of a character (typically
	 *   8 or 16)
	 * @return {{value : Array.<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function str2binb(str, charSize)
	{
		var bin = [], mask = (1 << charSize) - 1,
			length = str.length * charSize, i;

		for (i = 0; i < length; i += charSize)
		{
			bin[i >>> 5] |= (str.charCodeAt(i / charSize) & mask) <<
				(32 - charSize - (i % 32));
		}

		return {"value" : bin, "binLen" : length};
	}

	/**
	 * Convert a hex string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @return {{value : Array.<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function hex2binb(str)
	{
		var bin = [], length = str.length, i, num;

		if (0 !== (length % 2))
		{
			throw "String of HEX type must be in byte increments";
		}

		for (i = 0; i < length; i += 2)
		{
			num = parseInt(str.substr(i, 2), 16);
			if (!isNaN(num))
			{
				bin[i >>> 3] |= num << (24 - (4 * (i % 8)));
			}
			else
			{
				throw "String of HEX type contains invalid characters";
			}
		}

		return {"value" : bin, "binLen" : length * 4};
	}

	/**
	 * Convert a base-64 string to an array of big-endian words
	 *
	 * @private
	 * @param {string} str String to be converted to binary representation
	 * @return {{value : Array.<number>, binLen : number}} Hash list where
	 *   "value" contains the output number array and "binLen" is the binary
	 *   length of "value"
	 */
	function b642binb(str)
	{
		var retVal = [], byteCnt = 0, index, i, j, tmpInt, strPart, firstEqual,
			b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

		if (-1 === str.search(/^[a-zA-Z0-9=+\/]+$/))
		{
			throw "Invalid character in base-64 string";
		}
		firstEqual = str.indexOf('=');
		str = str.replace(/\=/g, '');
		if ((-1 !== firstEqual) && (firstEqual < str.length))
		{
			throw "Invalid '=' found in base-64 string";
		}

		for (i = 0; i < str.length; i += 4)
		{
			strPart = str.substr(i, 4);
			tmpInt = 0;

			for (j = 0; j < strPart.length; j += 1)
			{
				index = b64Tab.indexOf(strPart[j]);
				tmpInt |= index << (18 - (6 * j));
			}

			for (j = 0; j < strPart.length - 1; j += 1)
			{
				retVal[byteCnt >> 2] |= ((tmpInt >>> (16 - (j * 8))) & 0xFF) << (24 - (8 * (byteCnt % 4)));
				byteCnt += 1;
			}
		}

		return {"value" : retVal, "binLen" : byteCnt * 8};
	}

	/**
	 * Convert an array of big-endian words to a hex string.
	 *
	 * @private
	 * @param {Array.<number>} binarray Array of integers to be converted to
	 *   hexidecimal representation
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Hexidecimal representation of the parameter in String
	 *   form
	 */
	function binb2hex(binarray, formatOpts)
	{
		var hex_tab = "0123456789abcdef", str = "",
			length = binarray.length * 4, i, srcByte;

		for (i = 0; i < length; i += 1)
		{
			srcByte = binarray[i >>> 2] >>> ((3 - (i % 4)) * 8);
			str += hex_tab.charAt((srcByte >>> 4) & 0xF) +
				hex_tab.charAt(srcByte & 0xF);
		}

		return (formatOpts["outputUpper"]) ? str.toUpperCase() : str;
	}

	/**
	 * Convert an array of big-endian words to a base-64 string
	 *
	 * @private
	 * @param {Array.<number>} binarray Array of integers to be converted to
	 *   base-64 representation
	 * @param {{outputUpper : boolean, b64Pad : string}} formatOpts Hash list
	 *   containing validated output formatting options
	 * @return {string} Base-64 encoded representation of the parameter in
	 *   String form
	 */
	function binb2b64(binarray, formatOpts)
	{
		var str = "", length = binarray.length * 4, i, j, triplet,
			b64Tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

		for (i = 0; i < length; i += 3)
		{
			triplet = (((binarray[i >>> 2] >>> 8 * (3 - i % 4)) & 0xFF) << 16) |
				(((binarray[i + 1 >>> 2] >>> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) |
				((binarray[i + 2 >>> 2] >>> 8 * (3 - (i + 2) % 4)) & 0xFF);
			for (j = 0; j < 4; j += 1)
			{
				if (i * 8 + j * 6 <= binarray.length * 32)
				{
					str += b64Tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
				}
				else
				{
					str += formatOpts["b64Pad"];
				}
			}
		}
		return str;
	}

	/**
	 * Validate hash list containing output formatting options, ensuring
	 * presence of every option or adding the default value
	 *
	 * @private
	 * @param {{outputUpper : boolean, b64Pad : string}|undefined} outputOpts
	 *   Hash list of output formatting options
	 * @return {{outputUpper : boolean, b64Pad : string}} Validated hash list
	 *   containing output formatting options
	 */
	function getOutputOpts(outputOpts)
	{
		var retVal = {"outputUpper" : false, "b64Pad" : "="};

		try
		{
			if (outputOpts.hasOwnProperty("outputUpper"))
			{
				retVal["outputUpper"] = outputOpts["outputUpper"];
			}

			if (outputOpts.hasOwnProperty("b64Pad"))
			{
				retVal["b64Pad"] = outputOpts["b64Pad"];
			}
		}
		catch(e)
		{}

		if ("boolean" !== typeof(retVal["outputUpper"]))
		{
			throw "Invalid outputUpper formatting option";
		}

		if ("string" !== typeof(retVal["b64Pad"]))
		{
			throw "Invalid b64Pad formatting option";
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of circular rotate left
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
	function rotl_32(x, n)
	{
		return (x << n) | (x >>> (32 - n));
	}

	/**
	 * The 32-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted circularly by n bits
	 */
	function rotr_32(x, n)
	{
		return (x >>> n) | (x << (32 - n));
	}

	/**
	 * The 64-bit implementation of circular rotate right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted circularly by n bits
	 */
	function rotr_64(x, n)
	{
		var retVal = null, tmp = new Int_64(x.highOrder, x.lowOrder);

		if (32 >= n)
		{
			retVal = new Int_64(
					(tmp.highOrder >>> n) | ((tmp.lowOrder << (32 - n)) & 0xFFFFFFFF),
					(tmp.lowOrder >>> n) | ((tmp.highOrder << (32 - n)) & 0xFFFFFFFF)
				);
		}
		else
		{
			retVal = new Int_64(
					(tmp.lowOrder >>> (n - 32)) | ((tmp.highOrder << (64 - n)) & 0xFFFFFFFF),
					(tmp.highOrder >>> (n - 32)) | ((tmp.lowOrder << (64 - n)) & 0xFFFFFFFF)
				);
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of shift right
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {number} The x shifted by n bits
	 */
	function shr_32(x, n)
	{
		return x >>> n;
	}

	/**
	 * The 64-bit implementation of shift right
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @param {number} n The number of bits to shift
	 * @return {Int_64} The x shifted by n bits
	 */
	function shr_64(x, n)
	{
		var retVal = null;

		if (32 >= n)
		{
			retVal = new Int_64(
					x.highOrder >>> n,
					x.lowOrder >>> n | ((x.highOrder << (32 - n)) & 0xFFFFFFFF)
				);
		}
		else
		{
			retVal = new Int_64(
					0,
					x.highOrder >>> (n - 32)
				);
		}

		return retVal;
	}

	/**
	 * The 32-bit implementation of the NIST specified Parity function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function parity_32(x, y, z)
	{
		return x ^ y ^ z;
	}

	/**
	 * The 32-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function ch_32(x, y, z)
	{
		return (x & y) ^ (~x & z);
	}

	/**
	 * The 64-bit implementation of the NIST specified Ch function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function ch_64(x, y, z)
	{
		return new Int_64(
				(x.highOrder & y.highOrder) ^ (~x.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^ (~x.lowOrder & z.lowOrder)
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {number} x The first 32-bit integer argument
	 * @param {number} y The second 32-bit integer argument
	 * @param {number} z The third 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function maj_32(x, y, z)
	{
		return (x & y) ^ (x & z) ^ (y & z);
	}

	/**
	 * The 64-bit implementation of the NIST specified Maj function
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument
	 * @param {Int_64} y The second 64-bit integer argument
	 * @param {Int_64} z The third 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function maj_64(x, y, z)
	{
		return new Int_64(
				(x.highOrder & y.highOrder) ^
				(x.highOrder & z.highOrder) ^
				(y.highOrder & z.highOrder),
				(x.lowOrder & y.lowOrder) ^
				(x.lowOrder & z.lowOrder) ^
				(y.lowOrder & z.lowOrder)
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function sigma0_32(x)
	{
		return rotr_32(x, 2) ^ rotr_32(x, 13) ^ rotr_32(x, 22);
	}

	/**
	 * The 64-bit implementation of the NIST specified Sigma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function sigma0_64(x)
	{
		var rotr28 = rotr_64(x, 28), rotr34 = rotr_64(x, 34),
			rotr39 = rotr_64(x, 39);

		return new Int_64(
				rotr28.highOrder ^ rotr34.highOrder ^ rotr39.highOrder,
				rotr28.lowOrder ^ rotr34.lowOrder ^ rotr39.lowOrder);
	}

	/**
	 * The 32-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function sigma1_32(x)
	{
		return rotr_32(x, 6) ^ rotr_32(x, 11) ^ rotr_32(x, 25);
	}

	/**
	 * The 64-bit implementation of the NIST specified Sigma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function sigma1_64(x)
	{
		var rotr14 = rotr_64(x, 14), rotr18 = rotr_64(x, 18),
			rotr41 = rotr_64(x, 41);

		return new Int_64(
				rotr14.highOrder ^ rotr18.highOrder ^ rotr41.highOrder,
				rotr14.lowOrder ^ rotr18.lowOrder ^ rotr41.lowOrder);
	}

	/**
	 * The 32-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function gamma0_32(x)
	{
		return rotr_32(x, 7) ^ rotr_32(x, 18) ^ shr_32(x, 3);
	}

	/**
	 * The 64-bit implementation of the NIST specified Gamma0 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function gamma0_64(x)
	{
		var rotr1 = rotr_64(x, 1), rotr8 = rotr_64(x, 8), shr7 = shr_64(x, 7);

		return new Int_64(
				rotr1.highOrder ^ rotr8.highOrder ^ shr7.highOrder,
				rotr1.lowOrder ^ rotr8.lowOrder ^ shr7.lowOrder
			);
	}

	/**
	 * The 32-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {number} x The 32-bit integer argument
	 * @return {number} The NIST specified output of the function
	 */
	function gamma1_32(x)
	{
		return rotr_32(x, 17) ^ rotr_32(x, 19) ^ shr_32(x, 10);
	}

	/**
	 * The 64-bit implementation of the NIST specified Gamma1 function
	 *
	 * @private
	 * @param {Int_64} x The 64-bit integer argument
	 * @return {Int_64} The NIST specified output of the function
	 */
	function gamma1_64(x)
	{
		var rotr19 = rotr_64(x, 19), rotr61 = rotr_64(x, 61),
			shr6 = shr_64(x, 6);

		return new Int_64(
				rotr19.highOrder ^ rotr61.highOrder ^ shr6.highOrder,
				rotr19.lowOrder ^ rotr61.lowOrder ^ shr6.lowOrder
			);
	}

	/**
	 * Add two 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @return {number} The sum of a + b
	 */
	function safeAdd_32_2(a, b)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add four 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d
	 */
	function safeAdd_32_4(a, b, c, d)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
				(lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add five 32-bit integers, wrapping at 2^32. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {number} a The first 32-bit integer argument to be added
	 * @param {number} b The second 32-bit integer argument to be added
	 * @param {number} c The third 32-bit integer argument to be added
	 * @param {number} d The fourth 32-bit integer argument to be added
	 * @param {number} e The fifth 32-bit integer argument to be added
	 * @return {number} The sum of a + b + c + d + e
	 */
	function safeAdd_32_5(a, b, c, d, e)
	{
		var lsw = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) +
				(e & 0xFFFF),
			msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) +
				(e >>> 16) + (lsw >>> 16);

		return ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);
	}

	/**
	 * Add two 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} x The first 64-bit integer argument to be added
	 * @param {Int_64} y The second 64-bit integer argument to be added
	 * @return {Int_64} The sum of x + y
	 */
	function safeAdd_64_2(x, y)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (x.lowOrder & 0xFFFF) + (y.lowOrder & 0xFFFF);
		msw = (x.lowOrder >>> 16) + (y.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (x.highOrder & 0xFFFF) + (y.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (x.highOrder >>> 16) + (y.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Add four 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d
	 */
	function safeAdd_64_4(a, b, c, d)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
			(c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
			(c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
			(c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
			(c.highOrder >>> 16) + (d.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Add five 64-bit integers, wrapping at 2^64. This uses 16-bit operations
	 * internally to work around bugs in some JS interpreters.
	 *
	 * @private
	 * @param {Int_64} a The first 64-bit integer argument to be added
	 * @param {Int_64} b The second 64-bit integer argument to be added
	 * @param {Int_64} c The third 64-bit integer argument to be added
	 * @param {Int_64} d The fouth 64-bit integer argument to be added
	 * @param {Int_64} e The fouth 64-bit integer argument to be added
	 * @return {Int_64} The sum of a + b + c + d + e
	 */
	function safeAdd_64_5(a, b, c, d, e)
	{
		var lsw, msw, lowOrder, highOrder;

		lsw = (a.lowOrder & 0xFFFF) + (b.lowOrder & 0xFFFF) +
			(c.lowOrder & 0xFFFF) + (d.lowOrder & 0xFFFF) +
			(e.lowOrder & 0xFFFF);
		msw = (a.lowOrder >>> 16) + (b.lowOrder >>> 16) +
			(c.lowOrder >>> 16) + (d.lowOrder >>> 16) + (e.lowOrder >>> 16) +
			(lsw >>> 16);
		lowOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		lsw = (a.highOrder & 0xFFFF) + (b.highOrder & 0xFFFF) +
			(c.highOrder & 0xFFFF) + (d.highOrder & 0xFFFF) +
			(e.highOrder & 0xFFFF) + (msw >>> 16);
		msw = (a.highOrder >>> 16) + (b.highOrder >>> 16) +
			(c.highOrder >>> 16) + (d.highOrder >>> 16) +
			(e.highOrder >>> 16) + (lsw >>> 16);
		highOrder = ((msw & 0xFFFF) << 16) | (lsw & 0xFFFF);

		return new Int_64(highOrder, lowOrder);
	}

	/**
	 * Calculates the SHA-1 hash of the string set at instantiation
	 *
	 * @private
	 * @param {Array.<number>} message The binary array representation of the
	 *   string to hash
	 * @param {number} messageLen The number of bits in the message
	 * @return {Array.<number>} The array of integers representing the SHA-1
	 *   hash of message
	 */
	function coreSHA1(message, messageLen)
	{
		var W = [], a, b, c, d, e, T, ch = ch_32, parity = parity_32,
			maj = maj_32, rotl = rotl_32, safeAdd_2 = safeAdd_32_2, i, t,
			safeAdd_5 = safeAdd_32_5, appendedMessageLength,
			H = [
				0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0
			],
			K = [
				0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
				0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
				0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
				0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
				0x5a827999, 0x5a827999, 0x5a827999, 0x5a827999,
				0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
				0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
				0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
				0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
				0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1, 0x6ed9eba1,
				0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
				0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
				0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
				0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
				0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc, 0x8f1bbcdc,
				0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
				0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
				0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
				0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6,
				0xca62c1d6, 0xca62c1d6, 0xca62c1d6, 0xca62c1d6
			];

		/* Append '1' at the end of the binary string */
		message[messageLen >>> 5] |= 0x80 << (24 - (messageLen % 32));
		/* Append length of binary string in the position such that the new
		length is a multiple of 512.  Logic does not work for even multiples
		of 512 but there can never be even multiples of 512 */
		message[(((messageLen + 65) >>> 9) << 4) + 15] = messageLen;

		appendedMessageLength = message.length;

		for (i = 0; i < appendedMessageLength; i += 16)
		{
			a = H[0];
			b = H[1];
			c = H[2];
			d = H[3];
			e = H[4];

			for (t = 0; t < 80; t += 1)
			{
				if (t < 16)
				{
					W[t] = message[t + i];
				}
				else
				{
					W[t] = rotl(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
				}

				if (t < 20)
				{
					T = safeAdd_5(rotl(a, 5), ch(b, c, d), e, K[t], W[t]);
				}
				else if (t < 40)
				{
					T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, K[t], W[t]);
				}
				else if (t < 60)
				{
					T = safeAdd_5(rotl(a, 5), maj(b, c, d), e, K[t], W[t]);
				} else {
					T = safeAdd_5(rotl(a, 5), parity(b, c, d), e, K[t], W[t]);
				}

				e = d;
				d = c;
				c = rotl(b, 30);
				b = a;
				a = T;
			}

			H[0] = safeAdd_2(a, H[0]);
			H[1] = safeAdd_2(b, H[1]);
			H[2] = safeAdd_2(c, H[2]);
			H[3] = safeAdd_2(d, H[3]);
			H[4] = safeAdd_2(e, H[4]);
		}

		return H;
	}

	/**
	 * Calculates the desired SHA-2 hash of the string set at instantiation
	 *
	 * @private
	 * @param {Array.<number>} message The binary array representation of the
	 *   string to hash
	 * @param {number} messageLen The number of bits in message
	 * @param {string} variant The desired SHA-2 variant
	 * @return {Array.<number>} The array of integers representing the SHA-2
	 *   hash of message
	 */
	function coreSHA2(message, messageLen, variant)
	{
		var a, b, c, d, e, f, g, h, T1, T2, H, numRounds, lengthPosition, i, t,
			binaryStringInc, binaryStringMult, safeAdd_2, safeAdd_4, safeAdd_5,
			gamma0, gamma1, sigma0, sigma1, ch, maj, Int, K, W = [],
			appendedMessageLength, retVal;

		/* Set up the various function handles and variable for the specific
		 * variant */
		if ((variant === "SHA-224" || variant === "SHA-256") &&
			(2 & SUPPORTED_ALGS))
		{
			/* 32-bit variant */
			numRounds = 64;
			lengthPosition = (((messageLen + 65) >>> 9) << 4) + 15;
			binaryStringInc = 16;
			binaryStringMult = 1;
			Int = Number;
			safeAdd_2 = safeAdd_32_2;
			safeAdd_4 = safeAdd_32_4;
			safeAdd_5 = safeAdd_32_5;
			gamma0 = gamma0_32;
			gamma1 = gamma1_32;
			sigma0 = sigma0_32;
			sigma1 = sigma1_32;
			maj = maj_32;
			ch = ch_32;
			K = [
					0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
					0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
					0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
					0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
					0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
					0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
					0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
					0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
					0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
					0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
					0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
					0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
					0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
					0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
					0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
					0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
				];

			if ("SHA-224" === variant)
			{
				H = [
						0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
						0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4
					];
			}
			else /* "SHA-256" === variant */
			{
				H = [
						0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A,
						0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
					];
			}
		}
		else if ((variant === "SHA-384" || variant === "SHA-512") &&
			(4 & SUPPORTED_ALGS))
		{
			/* 64-bit variant */
			numRounds = 80;
			lengthPosition = (((messageLen + 128) >>> 10) << 5) + 31;
			binaryStringInc = 32;
			binaryStringMult = 2;
			Int = Int_64;
			safeAdd_2 = safeAdd_64_2;
			safeAdd_4 = safeAdd_64_4;
			safeAdd_5 = safeAdd_64_5;
			gamma0 = gamma0_64;
			gamma1 = gamma1_64;
			sigma0 = sigma0_64;
			sigma1 = sigma1_64;
			maj = maj_64;
			ch = ch_64;

			K = [
				new Int(0x428a2f98, 0xd728ae22), new Int(0x71374491, 0x23ef65cd),
				new Int(0xb5c0fbcf, 0xec4d3b2f), new Int(0xe9b5dba5, 0x8189dbbc),
				new Int(0x3956c25b, 0xf348b538), new Int(0x59f111f1, 0xb605d019),
				new Int(0x923f82a4, 0xaf194f9b), new Int(0xab1c5ed5, 0xda6d8118),
				new Int(0xd807aa98, 0xa3030242), new Int(0x12835b01, 0x45706fbe),
				new Int(0x243185be, 0x4ee4b28c), new Int(0x550c7dc3, 0xd5ffb4e2),
				new Int(0x72be5d74, 0xf27b896f), new Int(0x80deb1fe, 0x3b1696b1),
				new Int(0x9bdc06a7, 0x25c71235), new Int(0xc19bf174, 0xcf692694),
				new Int(0xe49b69c1, 0x9ef14ad2), new Int(0xefbe4786, 0x384f25e3),
				new Int(0x0fc19dc6, 0x8b8cd5b5), new Int(0x240ca1cc, 0x77ac9c65),
				new Int(0x2de92c6f, 0x592b0275), new Int(0x4a7484aa, 0x6ea6e483),
				new Int(0x5cb0a9dc, 0xbd41fbd4), new Int(0x76f988da, 0x831153b5),
				new Int(0x983e5152, 0xee66dfab), new Int(0xa831c66d, 0x2db43210),
				new Int(0xb00327c8, 0x98fb213f), new Int(0xbf597fc7, 0xbeef0ee4),
				new Int(0xc6e00bf3, 0x3da88fc2), new Int(0xd5a79147, 0x930aa725),
				new Int(0x06ca6351, 0xe003826f), new Int(0x14292967, 0x0a0e6e70),
				new Int(0x27b70a85, 0x46d22ffc), new Int(0x2e1b2138, 0x5c26c926),
				new Int(0x4d2c6dfc, 0x5ac42aed), new Int(0x53380d13, 0x9d95b3df),
				new Int(0x650a7354, 0x8baf63de), new Int(0x766a0abb, 0x3c77b2a8),
				new Int(0x81c2c92e, 0x47edaee6), new Int(0x92722c85, 0x1482353b),
				new Int(0xa2bfe8a1, 0x4cf10364), new Int(0xa81a664b, 0xbc423001),
				new Int(0xc24b8b70, 0xd0f89791), new Int(0xc76c51a3, 0x0654be30),
				new Int(0xd192e819, 0xd6ef5218), new Int(0xd6990624, 0x5565a910),
				new Int(0xf40e3585, 0x5771202a), new Int(0x106aa070, 0x32bbd1b8),
				new Int(0x19a4c116, 0xb8d2d0c8), new Int(0x1e376c08, 0x5141ab53),
				new Int(0x2748774c, 0xdf8eeb99), new Int(0x34b0bcb5, 0xe19b48a8),
				new Int(0x391c0cb3, 0xc5c95a63), new Int(0x4ed8aa4a, 0xe3418acb),
				new Int(0x5b9cca4f, 0x7763e373), new Int(0x682e6ff3, 0xd6b2b8a3),
				new Int(0x748f82ee, 0x5defb2fc), new Int(0x78a5636f, 0x43172f60),
				new Int(0x84c87814, 0xa1f0ab72), new Int(0x8cc70208, 0x1a6439ec),
				new Int(0x90befffa, 0x23631e28), new Int(0xa4506ceb, 0xde82bde9),
				new Int(0xbef9a3f7, 0xb2c67915), new Int(0xc67178f2, 0xe372532b),
				new Int(0xca273ece, 0xea26619c), new Int(0xd186b8c7, 0x21c0c207),
				new Int(0xeada7dd6, 0xcde0eb1e), new Int(0xf57d4f7f, 0xee6ed178),
				new Int(0x06f067aa, 0x72176fba), new Int(0x0a637dc5, 0xa2c898a6),
				new Int(0x113f9804, 0xbef90dae), new Int(0x1b710b35, 0x131c471b),
				new Int(0x28db77f5, 0x23047d84), new Int(0x32caab7b, 0x40c72493),
				new Int(0x3c9ebe0a, 0x15c9bebc), new Int(0x431d67c4, 0x9c100d4c),
				new Int(0x4cc5d4be, 0xcb3e42b6), new Int(0x597f299c, 0xfc657e2a),
				new Int(0x5fcb6fab, 0x3ad6faec), new Int(0x6c44198c, 0x4a475817)
			];

			if ("SHA-384" === variant)
			{
				H = [
					new Int(0xcbbb9d5d, 0xc1059ed8), new Int(0x0629a292a, 0x367cd507),
					new Int(0x9159015a, 0x3070dd17), new Int(0x0152fecd8, 0xf70e5939),
					new Int(0x67332667, 0xffc00b31), new Int(0x98eb44a87, 0x68581511),
					new Int(0xdb0c2e0d, 0x64f98fa7), new Int(0x047b5481d, 0xbefa4fa4)
				];
			}
			else /* "SHA-512" === variant */
			{
				H = [
					new Int(0x6a09e667, 0xf3bcc908), new Int(0xbb67ae85, 0x84caa73b),
					new Int(0x3c6ef372, 0xfe94f82b), new Int(0xa54ff53a, 0x5f1d36f1),
					new Int(0x510e527f, 0xade682d1), new Int(0x9b05688c, 0x2b3e6c1f),
					new Int(0x1f83d9ab, 0xfb41bd6b), new Int(0x5be0cd19, 0x137e2179)
				];
			}
		}
		else
		{
			throw "Unexpected error in SHA-2 implementation";
		}

		/* Append '1' at the end of the binary string */
		message[messageLen >>> 5] |= 0x80 << (24 - messageLen % 32);
		/* Append length of binary string in the position such that the new
		 * length is correct */
		message[lengthPosition] = messageLen;

		appendedMessageLength = message.length;

		for (i = 0; i < appendedMessageLength; i += binaryStringInc)
		{
			a = H[0];
			b = H[1];
			c = H[2];
			d = H[3];
			e = H[4];
			f = H[5];
			g = H[6];
			h = H[7];

			for (t = 0; t < numRounds; t += 1)
			{
				if (t < 16)
				{
					/* Bit of a hack - for 32-bit, the second term is ignored */
					W[t] = new Int(message[t * binaryStringMult + i],
							message[t * binaryStringMult + i + 1]);
				}
				else
				{
					W[t] = safeAdd_4(
							gamma1(W[t - 2]), W[t - 7],
							gamma0(W[t - 15]), W[t - 16]
						);
				}

				T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]);
				T2 = safeAdd_2(sigma0(a), maj(a, b, c));
				h = g;
				g = f;
				f = e;
				e = safeAdd_2(d, T1);
				d = c;
				c = b;
				b = a;
				a = safeAdd_2(T1, T2);

			}

			H[0] = safeAdd_2(a, H[0]);
			H[1] = safeAdd_2(b, H[1]);
			H[2] = safeAdd_2(c, H[2]);
			H[3] = safeAdd_2(d, H[3]);
			H[4] = safeAdd_2(e, H[4]);
			H[5] = safeAdd_2(f, H[5]);
			H[6] = safeAdd_2(g, H[6]);
			H[7] = safeAdd_2(h, H[7]);
		}

		if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0], H[1], H[2], H[3],
				H[4], H[5], H[6]
			];
		}
		else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
		{
			retVal = H;
		}
		else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder
			];
		}
		else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
		{
			retVal = [
				H[0].highOrder, H[0].lowOrder,
				H[1].highOrder, H[1].lowOrder,
				H[2].highOrder, H[2].lowOrder,
				H[3].highOrder, H[3].lowOrder,
				H[4].highOrder, H[4].lowOrder,
				H[5].highOrder, H[5].lowOrder,
				H[6].highOrder, H[6].lowOrder,
				H[7].highOrder, H[7].lowOrder
			];
		}
		else /* This should never be reached */
		{
			throw "Unexpected error in SHA-2 implementation";
		}

		return retVal;
	}

	/**
	 * jsSHA is the workhorse of the library.  Instantiate it with the string to
	 * be hashed as the parameter
	 *
	 * @constructor
	 * @this {jsSHA}
	 * @param {string} srcString The string to be hashed
	 * @param {string} inputFormat The format of srcString, HEX, TEXT, or ASCII
	 * @param {number=} charSize The size, in bits, of each text character
	 */
	var jsSHA = function(srcString, inputFormat, charSize)
	{
		var sha1 = null, sha224 = null, sha256 = null, sha384 = null,
			sha512 = null, strBinLen = 0, strToHash = [0], charWidth = 0,
			convertRet = null;

		/* Need to get charWidth before validating inputFormat since its used
		 * in that validation */
		charWidth = ("undefined" !== typeof(charSize)) ? charSize : 8;

		if (!((8 === charWidth) || (16 === charWidth)))
		{
			throw "charSize must be 8 or 16";
		}

		/* Convert the input string into the correct type */
		if ("HEX" === inputFormat)
		{
			if (0 !== (srcString.length % 2))
			{
				throw "srcString of HEX type must be in byte increments";
			}
			convertRet = hex2binb(srcString);
			strBinLen = convertRet["binLen"];
			strToHash = convertRet["value"];
		}
		else if (("ASCII" === inputFormat) || ("TEXT" === inputFormat))
		{
			convertRet = str2binb(srcString, charWidth);
			strBinLen = convertRet["binLen"];
			strToHash = convertRet["value"];
		}
		else if ("B64" === inputFormat)
		{
			convertRet = b642binb(srcString);
			strBinLen = convertRet["binLen"];
			strToHash = convertRet["value"];
		}
		else
		{
			throw "inputFormat must be HEX, TEXT, ASCII, or B64";
		}

		/**
		 * Returns the desired SHA hash of the string specified at instantiation
		 * using the specified parameters
		 *
		 * @expose
		 * @param {string} variant The desired SHA variant (SHA-1, SHA-224,
		 *	 SHA-256, SHA-384, or SHA-512)
		 * @param {string} format The desired output formatting (B64 or HEX)
		 * @param {{outputUpper : boolean, b64Pad : string}=} outputFormatOpts
		 *   Hash list of output formatting options
		 * @return {string} The string representation of the hash in the format
		 *   specified
		 */
		this.getHash = function (variant, format, outputFormatOpts)
		{
			var formatFunc = null, message = strToHash.slice(), retVal = "";

			switch (format)
			{
			case "HEX":
				formatFunc = binb2hex;
				break;
			case "B64":
				formatFunc = binb2b64;
				break;
			default:
				throw "format must be HEX or B64";
			}

			if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
			{
				if (null === sha1)
				{
					sha1 = coreSHA1(message, strBinLen);
				}
				retVal = formatFunc(sha1, getOutputOpts(outputFormatOpts));
			}
			else if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
			{
				if (null === sha224)
				{
					sha224 = coreSHA2(message, strBinLen, variant);
				}
				retVal = formatFunc(sha224, getOutputOpts(outputFormatOpts));
			}
			else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
			{
				if (null === sha256)
				{
					sha256 = coreSHA2(message, strBinLen, variant);
				}
				retVal = formatFunc(sha256, getOutputOpts(outputFormatOpts));
			}
			else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
			{
				if (null === sha384)
				{
					sha384 = coreSHA2(message, strBinLen, variant);
				}
				retVal = formatFunc(sha384, getOutputOpts(outputFormatOpts));
			}
			else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
			{
				if (null === sha512)
				{
					sha512 = coreSHA2(message, strBinLen, variant);
				}
				retVal = formatFunc(sha512, getOutputOpts(outputFormatOpts));
			}
			else
			{
				throw "Chosen SHA variant is not supported";
			}

			return retVal;
		};

		/**
		 * Returns the desired HMAC of the string specified at instantiation
		 * using the key and variant parameter
		 *
		 * @expose
		 * @param {string} key The key used to calculate the HMAC
		 * @param {string} inputFormat The format of key, HEX or TEXT or ASCII
		 * @param {string} variant The desired SHA variant (SHA-1, SHA-224,
		 *	 SHA-256, SHA-384, or SHA-512)
		 * @param {string} outputFormat The desired output formatting
		 *   (B64 or HEX)
		 * @param {{outputUpper : boolean, b64Pad : string}=} outputFormatOpts
		 *   associative array of output formatting options
		 * @return {string} The string representation of the hash in the format
		 *   specified
		 */
		this.getHMAC = function(key, inputFormat, variant, outputFormat,
			outputFormatOpts)
		{
			var formatFunc, keyToUse, blockByteSize, blockBitSize, i,
				retVal, lastArrayIndex, keyBinLen, hashBitSize,
				keyWithIPad = [], keyWithOPad = [], convertRet = null;

			/* Validate the output format selection */
			switch (outputFormat)
			{
			case "HEX":
				formatFunc = binb2hex;
				break;
			case "B64":
				formatFunc = binb2b64;
				break;
			default:
				throw "outputFormat must be HEX or B64";
			}

			/* Validate the hash variant selection and set needed variables */
			if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
			{
				blockByteSize = 64;
				hashBitSize = 160;
			}
			else if (("SHA-224" === variant) && (2 & SUPPORTED_ALGS))
			{
				blockByteSize = 64;
				hashBitSize = 224;
			}
			else if (("SHA-256" === variant) && (2 & SUPPORTED_ALGS))
			{
				blockByteSize = 64;
				hashBitSize = 256;
			}
			else if (("SHA-384" === variant) && (4 & SUPPORTED_ALGS))
			{
				blockByteSize = 128;
				hashBitSize = 384;
			}
			else if (("SHA-512" === variant) && (4 & SUPPORTED_ALGS))
			{
				blockByteSize = 128;
				hashBitSize = 512;
			}
			else
			{
				throw "Chosen SHA variant is not supported";
			}

			/* Validate input format selection */
			if ("HEX" === inputFormat)
			{
				convertRet = hex2binb(key);
				keyBinLen = convertRet["binLen"];
				keyToUse = convertRet["value"];
			}
			else if (("ASCII" === inputFormat) || ("TEXT" === inputFormat))
			{
				convertRet = str2binb(key, charWidth);
				keyBinLen = convertRet["binLen"];
				keyToUse = convertRet["value"];
			}
			else if ("B64" === inputFormat)
			{
				convertRet = b642binb(key);
				keyBinLen = convertRet["binLen"];
				keyToUse = convertRet["value"];
			}
			else
			{
				throw "inputFormat must be HEX, TEXT, ASCII, or B64";
			}

			/* These are used multiple times, calculate and store them */
			blockBitSize = blockByteSize * 8;
			lastArrayIndex = (blockByteSize / 4) - 1;

			/* Figure out what to do with the key based on its size relative to
			 * the hash's block size */
			if (blockByteSize < (keyBinLen / 8))
			{
				if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
				{
					keyToUse = coreSHA1(keyToUse, keyBinLen);
				}
				else if (6 & SUPPORTED_ALGS)
				{
					keyToUse = coreSHA2(keyToUse, keyBinLen, variant);
				}
				else
				{
					throw "Unexpected error in HMAC implementation";
				}
				/* For all variants, the block size is bigger than the output
				 * size so there will never be a useful byte at the end of the
				 * string */
				keyToUse[lastArrayIndex] &= 0xFFFFFF00;
			}
			else if (blockByteSize > (keyBinLen / 8))
			{
				/* If the blockByteSize is greater than the key length, there
				 * will always be at LEAST one "useless" byte at the end of the
				 * string */
				keyToUse[lastArrayIndex] &= 0xFFFFFF00;
			}

			/* Create ipad and opad */
			for (i = 0; i <= lastArrayIndex; i += 1)
			{
				keyWithIPad[i] = keyToUse[i] ^ 0x36363636;
				keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C;
			}

			/* Calculate the HMAC */
			if (("SHA-1" === variant) && (1 & SUPPORTED_ALGS))
			{
				retVal = coreSHA1(
					keyWithOPad.concat(
						coreSHA1(
							keyWithIPad.concat(strToHash),
							blockBitSize + strBinLen
						)
					),
					blockBitSize + hashBitSize);
			}
			else if (6 & SUPPORTED_ALGS)
			{
				retVal = coreSHA2(
					keyWithOPad.concat(
						coreSHA2(
							keyWithIPad.concat(strToHash),
							blockBitSize + strBinLen,
							variant
						)
					),
					blockBitSize + hashBitSize, variant);
			}
			else
			{
				throw "Unexpected error in HMAC implementation";
			}

			return formatFunc(retVal, getOutputOpts(outputFormatOpts));
		};
	};

	window['jsSHA'] = jsSHA;
}(window));

/******************************* BIG NUMBERS SUPPORT ********************************************/

// Bits per digit
var dbits;

// JavaScript engine analysis
var canary = 0xdeadbeefcafe;
var j_lm = ((canary&0xffffff)==0xefcafe);

// (public) Constructor
function BigInteger(a,b,c) {
  if(a != null)
    if("number" == typeof a) this.fromNumber(a,b,c);
    else if(b == null && "string" != typeof a) this.fromString(a,256);
    else this.fromString(a,b);
}

// return new, unset BigInteger
function nbi() { return new BigInteger(null); }

// am: Compute w_j += (x*this_i), propagate carries,
// c is initial carry, returns final carry.
// c < 3*dvalue, x < 2*dvalue, this_i < dvalue
// We need to select the fastest one that works in this environment.

// am1: use a single mult and divide to get the high bits,
// max digit bits should be 26 because
// max internal value = 2*dvalue^2-2*dvalue (< 2^53)
function am1(i,x,w,j,c,n) {
  while(--n >= 0) {
    var v = x*this[i++]+w[j]+c;
    c = Math.floor(v/0x4000000);
    w[j++] = v&0x3ffffff;
  }
  return c;
}
// am2 avoids a big mult-and-extract completely.
// Max digit bits should be <= 30 because we do bitwise ops
// on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
function am2(i,x,w,j,c,n) {
  var xl = x&0x7fff, xh = x>>15;
  while(--n >= 0) {
    var l = this[i]&0x7fff;
    var h = this[i++]>>15;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
    w[j++] = l&0x3fffffff;
  }
  return c;
}
// Alternately, set max digit bits to 28 since some
// browsers slow down when dealing with 32-bit numbers.
function am3(i,x,w,j,c,n) {
  var xl = x&0x3fff, xh = x>>14;
  while(--n >= 0) {
    var l = this[i]&0x3fff;
    var h = this[i++]>>14;
    var m = xh*l+h*xl;
    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
    c = (l>>28)+(m>>14)+xh*h;
    w[j++] = l&0xfffffff;
  }
  return c;
}
if(j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
  BigInteger.prototype.am = am2;
  dbits = 30;
}
else if(j_lm && (navigator.appName != "Netscape")) {
  BigInteger.prototype.am = am1;
  dbits = 26;
}
else { // Mozilla/Netscape seems to prefer am3
  BigInteger.prototype.am = am3;
  dbits = 28;
}

BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = ((1<<dbits)-1);
BigInteger.prototype.DV = (1<<dbits);

var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2,BI_FP);
BigInteger.prototype.F1 = BI_FP-dbits;
BigInteger.prototype.F2 = 2*dbits-BI_FP;

// Digit conversions
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr,vv;
rr = "0".charCodeAt(0);
for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;

function int2char(n) { return BI_RM.charAt(n); }
function intAt(s,i) {
  var c = BI_RC[s.charCodeAt(i)];
  return (c==null)?-1:c;
}

// (protected) copy this to r
function bnpCopyTo(r) {
  for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
  r.t = this.t;
  r.s = this.s;
}

// (protected) set from integer value x, -DV <= x < DV
function bnpFromInt(x) {
  this.t = 1;
  this.s = (x<0)?-1:0;
  if(x > 0) this[0] = x;
  else if(x < -1) this[0] = x+DV;
  else this.t = 0;
}

// return bigint initialized to value
function nbv(i) { var r = nbi(); r.fromInt(i); return r; }

// (protected) set from string and radix
function bnpFromString(s,b) {
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 256) k = 8; // byte array
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else { this.fromRadix(s,b); return; }
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while(--i >= 0) {
    var x = (k==8)?s[i]&0xff:intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-") mi = true;
      continue;
    }
    mi = false;
    if(sh == 0)
      this[this.t++] = x;
    else if(sh+k > this.DB) {
      this[this.t-1] |= (x&((1<<(this.DB-sh))-1))<<sh;
      this[this.t++] = (x>>(this.DB-sh));
    }
    else
      this[this.t-1] |= x<<sh;
    sh += k;
    if(sh >= this.DB) sh -= this.DB;
  }
  if(k == 8 && (s[0]&0x80) != 0) {
    this.s = -1;
    if(sh > 0) this[this.t-1] |= ((1<<(this.DB-sh))-1)<<sh;
  }
  this.clamp();
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) clamp off excess high words
function bnpClamp() {
  var c = this.s&this.DM;
  while(this.t > 0 && this[this.t-1] == c) --this.t;
}

// (public) return string representation in given radix
function bnToString(b) {
  if(this.s < 0) return "-"+this.negate().toString(b);
  var k;
  if(b == 16) k = 4;
  else if(b == 8) k = 3;
  else if(b == 2) k = 1;
  else if(b == 32) k = 5;
  else if(b == 4) k = 2;
  else return this.toRadix(b);
  var km = (1<<k)-1, d, m = false, r = "", i = this.t;
  var p = this.DB-(i*this.DB)%k;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) > 0) { m = true; r = int2char(d); }
    while(i >= 0) {
      if(p < k) {
        d = (this[i]&((1<<p)-1))<<(k-p);
        d |= this[--i]>>(p+=this.DB-k);
      }
      else {
        d = (this[i]>>(p-=k))&km;
        if(p <= 0) { p += this.DB; --i; }
      }
      if(d > 0) m = true;
      if(m) r += int2char(d);
    }
  }
  return m?r:"0";
}

// (public) -this
function bnNegate() { var r = nbi(); BigInteger.ZERO.subTo(this,r); return r; }

// (public) |this|
function bnAbs() { return (this.s<0)?this.negate():this; }

// (public) return + if this > a, - if this < a, 0 if equal
function bnCompareTo(a) {
  var r = this.s-a.s;
  if(r != 0) return r;
  var i = this.t;
  r = i-a.t;
  if(r != 0) return r;
  while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
  return 0;
}

// returns bit length of the integer x
function nbits(x) {
  var r = 1, t;
  if((t=x>>>16) != 0) { x = t; r += 16; }
  if((t=x>>8) != 0) { x = t; r += 8; }
  if((t=x>>4) != 0) { x = t; r += 4; }
  if((t=x>>2) != 0) { x = t; r += 2; }
  if((t=x>>1) != 0) { x = t; r += 1; }
  return r;
}

// (public) return the number of bits in "this"
function bnBitLength() {
  if(this.t <= 0) return 0;
  return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM));
}

// (protected) r = this << n*DB
function bnpDLShiftTo(n,r) {
  var i;
  for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
  for(i = n-1; i >= 0; --i) r[i] = 0;
  r.t = this.t+n;
  r.s = this.s;
}

// (protected) r = this >> n*DB
function bnpDRShiftTo(n,r) {
  for(var i = n; i < this.t; ++i) r[i-n] = this[i];
  r.t = Math.max(this.t-n,0);
  r.s = this.s;
}

// (protected) r = this << n
function bnpLShiftTo(n,r) {
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<cbs)-1;
  var ds = Math.floor(n/this.DB), c = (this.s<<bs)&this.DM, i;
  for(i = this.t-1; i >= 0; --i) {
    r[i+ds+1] = (this[i]>>cbs)|c;
    c = (this[i]&bm)<<bs;
  }
  for(i = ds-1; i >= 0; --i) r[i] = 0;
  r[ds] = c;
  r.t = this.t+ds+1;
  r.s = this.s;
  r.clamp();
}

// (protected) r = this >> n
function bnpRShiftTo(n,r) {
  r.s = this.s;
  var ds = Math.floor(n/this.DB);
  if(ds >= this.t) { r.t = 0; return; }
  var bs = n%this.DB;
  var cbs = this.DB-bs;
  var bm = (1<<bs)-1;
  r[0] = this[ds]>>bs;
  for(var i = ds+1; i < this.t; ++i) {
    r[i-ds-1] |= (this[i]&bm)<<cbs;
    r[i-ds] = this[i]>>bs;
  }
  if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
  r.t = this.t-ds;
  r.clamp();
}

// (protected) r = this - a
function bnpSubTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]-a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c -= a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c -= a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = (c<0)?-1:0;
  if(c < -1) r[i++] = this.DV+c;
  else if(c > 0) r[i++] = c;
  r.t = i;
  r.clamp();
}

// (protected) r = this * a, r != this,a (HAC 14.12)
// "this" should be the larger one if appropriate.
function bnpMultiplyTo(a,r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i+y.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
  r.s = 0;
  r.clamp();
  if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
}

// (protected) r = this^2, r != this (HAC 14.16)
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2*x.t;
  while(--i >= 0) r[i] = 0;
  for(i = 0; i < x.t-1; ++i) {
    var c = x.am(i,x[i],r,2*i,0,1);
    if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= x.DV) {
      r[i+x.t] -= x.DV;
      r[i+x.t+1] = 1;
    }
  }
  if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
  r.s = 0;
  r.clamp();
}

// (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
// r != q, this != m.  q or r may be null.
function bnpDivRemTo(m,q,r) {
  var pm = m.abs();
  if(pm.t <= 0) return;
  var pt = this.abs();
  if(pt.t < pm.t) {
    if(q != null) q.fromInt(0);
    if(r != null) this.copyTo(r);
    return;
  }
  if(r == null) r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB-nbits(pm[pm.t-1]);	// normalize modulus
  if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
  else { pm.copyTo(y); pt.copyTo(r); }
  var ys = y.t;
  var y0 = y[ys-1];
  if(y0 == 0) return;
  var yt = y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
  var d1 = this.FV/yt, d2 = (1<<this.F1)/yt, e = 1<<this.F2;
  var i = r.t, j = i-ys, t = (q==null)?nbi():q;
  y.dlShiftTo(j,t);
  if(r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t,r);
  }
  BigInteger.ONE.dlShiftTo(ys,t);
  t.subTo(y,y);	// "negative" y so we can replace sub with am later
  while(y.t < ys) y[y.t++] = 0;
  while(--j >= 0) {
    // Estimate quotient digit
    var qd = (r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
    if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
      y.dlShiftTo(j,t);
      r.subTo(t,r);
      while(r[i] < --qd) r.subTo(t,r);
    }
  }
  if(q != null) {
    r.drShiftTo(ys,q);
    if(ts != ms) BigInteger.ZERO.subTo(q,q);
  }
  r.t = ys;
  r.clamp();
  if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
  if(ts < 0) BigInteger.ZERO.subTo(r,r);
}

// (public) this mod a
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a,null,r);
  if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
  return r;
}

// Modular reduction using "classic" algorithm
function Classic(m) { this.m = m; }
function cConvert(x) {
  if(x.s < 0 || x.compareTo(this.m) >= 0) return x.mod(this.m);
  else return x;
}
function cRevert(x) { return x; }
function cReduce(x) { x.divRemTo(this.m,null,x); }
function cMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }
function cSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;

// (protected) return "-1/this % 2^DB"; useful for Mont. reduction
// justification:
//         xy == 1 (mod m)
//         xy =  1+km
//   xy(2-xy) = (1+km)(1-km)
// x[y(2-xy)] = 1-k^2m^2
// x[y(2-xy)] == 1 (mod m^2)
// if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
// should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
// JS multiply "overflows" differently from C/C++, so care is needed here.
function bnpInvDigit() {
  if(this.t < 1) return 0;
  var x = this[0];
  if((x&1) == 0) return 0;
  var y = x&3;		// y == 1/x mod 2^2
  y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
  y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
  y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
  // last step - calculate inverse mod DV directly;
  // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
  y = (y*(2-x*y%this.DV))%this.DV;		// y == 1/x mod 2^dbits
  // we really want the negative inverse, and -DV < y < DV
  return (y>0)?this.DV-y:-y;
}

// Montgomery reduction
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp&0x7fff;
  this.mph = this.mp>>15;
  this.um = (1<<(m.DB-15))-1;
  this.mt2 = 2*m.t;
}

// xR mod m
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t,r);
  r.divRemTo(this.m,null,r);
  if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
  return r;
}

// x/R mod m
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}

// x = x/R mod m (HAC 14.32)
function montReduce(x) {
  while(x.t <= this.mt2)	// pad x so am has enough room later
    x[x.t++] = 0;
  for(var i = 0; i < this.m.t; ++i) {
    // faster way of calculating u0 = x[i]*mp mod DV
    var j = x[i]&0x7fff;
    var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
    // use am to combine the multiply-shift-add into one call
    j = i+this.m.t;
    x[j] += this.m.am(0,u0,x,i,0,this.m.t);
    // propagate carry
    while(x[j] >= x.DV) { x[j] -= x.DV; x[++j]++; }
  }
  x.clamp();
  x.drShiftTo(this.m.t,x);
  if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = "x^2/R mod m"; x != r
function montSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = "xy/R mod m"; x,y != r
function montMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;

// (protected) true iff this is even
function bnpIsEven() { return ((this.t>0)?(this[0]&1):this.s) == 0; }

// (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
function bnpExp(e,z) {
  if(e > 0xffffffff || e < 1) return BigInteger.ONE;
  var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e)-1;
  g.copyTo(r);
  while(--i >= 0) {
    z.sqrTo(r,r2);
    if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
    else { var t = r; r = r2; r2 = t; }
  }
  return z.revert(r);
}

// (public) this^e % m, 0 <= e < 2^32
function bnModPowInt(e,m) {
  var z;
  if(e < 256 || m.isEven()) z = new Classic(m); else z = new Montgomery(m);
  return this.exp(e,z);
}

// protected
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;

// public
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;

// "constants"
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

/***************************************************************************************/
// (public)
function bnClone() { var r = nbi(); this.copyTo(r); return r; }

// (public) return value as integer
function bnIntValue() {
  if(this.s < 0) {
    if(this.t == 1) return this[0]-this.DV;
    else if(this.t == 0) return -1;
  }
  else if(this.t == 1) return this[0];
  else if(this.t == 0) return 0;
  // assumes 16 < DB < 32
  return ((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0];
}

// (public) return value as byte
function bnByteValue() { return (this.t==0)?this.s:(this[0]<<24)>>24; }

// (public) return value as short (assumes DB>=16)
function bnShortValue() { return (this.t==0)?this.s:(this[0]<<16)>>16; }

// (protected) return x s.t. r^x < DV
function bnpChunkSize(r) { return Math.floor(Math.LN2*this.DB/Math.log(r)); }

// (public) 0 if this == 0, 1 if this > 0
function bnSigNum() {
  if(this.s < 0) return -1;
  else if(this.t <= 0 || (this.t == 1 && this[0] <= 0)) return 0;
  else return 1;
}

// (protected) convert to radix string
function bnpToRadix(b) {
  if(b == null) b = 10;
  if(this.signum() == 0 || b < 2 || b > 36) return "0";
  var cs = this.chunkSize(b);
  var a = Math.pow(b,cs);
  var d = nbv(a), y = nbi(), z = nbi(), r = "";
  this.divRemTo(d,y,z);
  while(y.signum() > 0) {
    r = (a+z.intValue()).toString(b).substr(1) + r;
    y.divRemTo(d,y,z);
  }
  return z.intValue().toString(b) + r;
}

// (protected) convert from radix string
function bnpFromRadix(s,b) {
  this.fromInt(0);
  if(b == null) b = 10;
  var cs = this.chunkSize(b);
  var d = Math.pow(b,cs), mi = false, j = 0, w = 0;
  for(var i = 0; i < s.length; ++i) {
    var x = intAt(s,i);
    if(x < 0) {
      if(s.charAt(i) == "-" && this.signum() == 0) mi = true;
      continue;
    }
    w = b*w+x;
    if(++j >= cs) {
      this.dMultiply(d);
      this.dAddOffset(w,0);
      j = 0;
      w = 0;
    }
  }
  if(j > 0) {
    this.dMultiply(Math.pow(b,j));
    this.dAddOffset(w,0);
  }
  if(mi) BigInteger.ZERO.subTo(this,this);
}

// (protected) alternate constructor
function bnpFromNumber(a,b,c) {
  if("number" == typeof b) {
    // new BigInteger(int,int,RNG)
    if(a < 2) this.fromInt(1);
    else {
      this.fromNumber(a,c);
      if(!this.testBit(a-1))	// force MSB set
        this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);
      if(this.isEven()) this.dAddOffset(1,0); // force odd
      while(!this.isProbablePrime(b)) {
        this.dAddOffset(2,0);
        if(this.bitLength() > a) this.subTo(BigInteger.ONE.shiftLeft(a-1),this);
      }
    }
  }
  else {
    // new BigInteger(int,RNG)
    var x = new Array(), t = a&7;
    x.length = (a>>3)+1;
    b.nextBytes(x);
    if(t > 0) x[0] &= ((1<<t)-1); else x[0] = 0;
    this.fromString(x,256);
  }
}

// (public) convert to bigendian byte array
function bnToByteArray() {
  var i = this.t, r = new Array();
  r[0] = this.s;
  var p = this.DB-(i*this.DB)%8, d, k = 0;
  if(i-- > 0) {
    if(p < this.DB && (d = this[i]>>p) != (this.s&this.DM)>>p)
      r[k++] = d|(this.s<<(this.DB-p));
    while(i >= 0) {
      if(p < 8) {
        d = (this[i]&((1<<p)-1))<<(8-p);
        d |= this[--i]>>(p+=this.DB-8);
      }
      else {
        d = (this[i]>>(p-=8))&0xff;
        if(p <= 0) { p += this.DB; --i; }
      }
      if((d&0x80) != 0) d |= -256;
      if(k == 0 && (this.s&0x80) != (d&0x80)) ++k;
      if(k > 0 || d != this.s) r[k++] = d;
    }
  }
  return r;
}

function bnEquals(a) { return(this.compareTo(a)==0); }
function bnMin(a) { return(this.compareTo(a)<0)?this:a; }
function bnMax(a) { return(this.compareTo(a)>0)?this:a; }

// (protected) r = this op a (bitwise)
function bnpBitwiseTo(a,op,r) {
  var i, f, m = Math.min(a.t,this.t);
  for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
  if(a.t < this.t) {
    f = a.s&this.DM;
    for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
    r.t = this.t;
  }
  else {
    f = this.s&this.DM;
    for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
    r.t = a.t;
  }
  r.s = op(this.s,a.s);
  r.clamp();
}

// (public) this & a
function op_and(x,y) { return x&y; }
function bnAnd(a) { var r = nbi(); this.bitwiseTo(a,op_and,r); return r; }

// (public) this | a
function op_or(x,y) { return x|y; }
function bnOr(a) { var r = nbi(); this.bitwiseTo(a,op_or,r); return r; }

// (public) this ^ a
function op_xor(x,y) { return x^y; }
function bnXor(a) { var r = nbi(); this.bitwiseTo(a,op_xor,r); return r; }

// (public) this & ~a
function op_andnot(x,y) { return x&~y; }
function bnAndNot(a) { var r = nbi(); this.bitwiseTo(a,op_andnot,r); return r; }

// (public) ~this
function bnNot() {
  var r = nbi();
  for(var i = 0; i < this.t; ++i) r[i] = this.DM&~this[i];
  r.t = this.t;
  r.s = ~this.s;
  return r;
}

// (public) this << n
function bnShiftLeft(n) {
  var r = nbi();
  if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
  return r;
}

// (public) this >> n
function bnShiftRight(n) {
  var r = nbi();
  if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
  return r;
}

// return index of lowest 1-bit in x, x < 2^31
function lbit(x) {
  if(x == 0) return -1;
  var r = 0;
  if((x&0xffff) == 0) { x >>= 16; r += 16; }
  if((x&0xff) == 0) { x >>= 8; r += 8; }
  if((x&0xf) == 0) { x >>= 4; r += 4; }
  if((x&3) == 0) { x >>= 2; r += 2; }
  if((x&1) == 0) ++r;
  return r;
}

// (public) returns index of lowest 1-bit (or -1 if none)
function bnGetLowestSetBit() {
  for(var i = 0; i < this.t; ++i)
    if(this[i] != 0) return i*this.DB+lbit(this[i]);
  if(this.s < 0) return this.t*this.DB;
  return -1;
}

// return number of 1 bits in x
function cbit(x) {
  var r = 0;
  while(x != 0) { x &= x-1; ++r; }
  return r;
}

// (public) return number of set bits
function bnBitCount() {
  var r = 0, x = this.s&this.DM;
  for(var i = 0; i < this.t; ++i) r += cbit(this[i]^x);
  return r;
}

// (public) true iff nth bit is set
function bnTestBit(n) {
  var j = Math.floor(n/this.DB);
  if(j >= this.t) return(this.s!=0);
  return((this[j]&(1<<(n%this.DB)))!=0);
}

// (protected) this op (1<<n)
function bnpChangeBit(n,op) {
  var r = BigInteger.ONE.shiftLeft(n);
  this.bitwiseTo(r,op,r);
  return r;
}

// (public) this | (1<<n)
function bnSetBit(n) { return this.changeBit(n,op_or); }

// (public) this & ~(1<<n)
function bnClearBit(n) { return this.changeBit(n,op_andnot); }

// (public) this ^ (1<<n)
function bnFlipBit(n) { return this.changeBit(n,op_xor); }

// (protected) r = this + a
function bnpAddTo(a,r) {
  var i = 0, c = 0, m = Math.min(a.t,this.t);
  while(i < m) {
    c += this[i]+a[i];
    r[i++] = c&this.DM;
    c >>= this.DB;
  }
  if(a.t < this.t) {
    c += a.s;
    while(i < this.t) {
      c += this[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += this.s;
  }
  else {
    c += this.s;
    while(i < a.t) {
      c += a[i];
      r[i++] = c&this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = (c<0)?-1:0;
  if(c > 0) r[i++] = c;
  else if(c < -1) r[i++] = this.DV+c;
  r.t = i;
  r.clamp();
}

// (public) this + a
function bnAdd(a) { var r = nbi(); this.addTo(a,r); return r; }

// (public) this - a
function bnSubtract(a) { var r = nbi(); this.subTo(a,r); return r; }

// (public) this * a
function bnMultiply(a) { var r = nbi(); this.multiplyTo(a,r); return r; }

// (public) this / a
function bnDivide(a) { var r = nbi(); this.divRemTo(a,r,null); return r; }

// (public) this % a
function bnRemainder(a) { var r = nbi(); this.divRemTo(a,null,r); return r; }

// (public) [this/a,this%a]
function bnDivideAndRemainder(a) {
  var q = nbi(), r = nbi();
  this.divRemTo(a,q,r);
  return new Array(q,r);
}

// (protected) this *= n, this >= 0, 1 < n < DV
function bnpDMultiply(n) {
  this[this.t] = this.am(0,n-1,this,0,0,this.t);
  ++this.t;
  this.clamp();
}

// (protected) this += n << w words, this >= 0
function bnpDAddOffset(n,w) {
  if(n == 0) return;
  while(this.t <= w) this[this.t++] = 0;
  this[w] += n;
  while(this[w] >= this.DV) {
    this[w] -= this.DV;
    if(++w >= this.t) this[this.t++] = 0;
    ++this[w];
  }
}

// A "null" reducer
function NullExp() {}
function nNop(x) { return x; }
function nMulTo(x,y,r) { x.multiplyTo(y,r); }
function nSqrTo(x,r) { x.squareTo(r); }

NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;

// (public) this^e
function bnPow(e) { return this.exp(e,new NullExp()); }

// (protected) r = lower n words of "this * a", a.t <= n
// "this" should be the larger one if appropriate.
function bnpMultiplyLowerTo(a,n,r) {
  var i = Math.min(this.t+a.t,n);
  r.s = 0; // assumes a,this >= 0
  r.t = i;
  while(i > 0) r[--i] = 0;
  var j;
  for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
  for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
  r.clamp();
}

// (protected) r = "this * a" without lower n words, n > 0
// "this" should be the larger one if appropriate.
function bnpMultiplyUpperTo(a,n,r) {
  --n;
  var i = r.t = this.t+a.t-n;
  r.s = 0; // assumes a,this >= 0
  while(--i >= 0) r[i] = 0;
  for(i = Math.max(n-this.t,0); i < a.t; ++i)
    r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
  r.clamp();
  r.drShiftTo(1,r);
}

// Barrett modular reduction
function Barrett(m) {
  // setup Barrett
  this.r2 = nbi();
  this.q3 = nbi();
  BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
  this.mu = this.r2.divide(m);
  this.m = m;
}

function barrettConvert(x) {
  if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
  else if(x.compareTo(this.m) < 0) return x;
  else { var r = nbi(); x.copyTo(r); this.reduce(r); return r; }
}

function barrettRevert(x) { return x; }

// x = x mod m (HAC 14.42)
function barrettReduce(x) {
  x.drShiftTo(this.m.t-1,this.r2);
  if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
  this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
  this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
  while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
  x.subTo(this.r2,x);
  while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
}

// r = x^2 mod m; x != r
function barrettSqrTo(x,r) { x.squareTo(r); this.reduce(r); }

// r = x*y mod m; x,y != r
function barrettMulTo(x,y,r) { x.multiplyTo(y,r); this.reduce(r); }

Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;

// (public) this^e % m (HAC 14.85)
function bnModPow(e,m) {
  var i = e.bitLength(), k, r = nbv(1), z;
  if(i <= 0) return r;
  else if(i < 18) k = 1;
  else if(i < 48) k = 3;
  else if(i < 144) k = 4;
  else if(i < 768) k = 5;
  else k = 6;
  if(i < 8)
    z = new Classic(m);
  else if(m.isEven())
    z = new Barrett(m);
  else
    z = new Montgomery(m);

  // precomputation
  var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
  g[1] = z.convert(this);
  if(k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1],g2);
    while(n <= km) {
      g[n] = nbi();
      z.mulTo(g2,g[n-2],g[n]);
      n += 2;
    }
  }

  var j = e.t-1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j])-1;
  while(j >= 0) {
    if(i >= k1) w = (e[j]>>(i-k1))&km;
    else {
      w = (e[j]&((1<<(i+1))-1))<<(k1-i);
      if(j > 0) w |= e[j-1]>>(this.DB+i-k1);
    }

    n = k;
    while((w&1) == 0) { w >>= 1; --n; }
    if((i -= n) < 0) { i += this.DB; --j; }
    if(is1) {	// ret == 1, don't bother squaring or multiplying it
      g[w].copyTo(r);
      is1 = false;
    }
    else {
      while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
      if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
      z.mulTo(r2,g[w],r);
    }

    while(j >= 0 && (e[j]&(1<<i)) == 0) {
      z.sqrTo(r,r2); t = r; r = r2; r2 = t;
      if(--i < 0) { i = this.DB-1; --j; }
    }
  }
  return z.revert(r);
}

// (public) gcd(this,a) (HAC 14.54)
function bnGCD(a) {
  var x = (this.s<0)?this.negate():this.clone();
  var y = (a.s<0)?a.negate():a.clone();
  if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
  var i = x.getLowestSetBit(), g = y.getLowestSetBit();
  if(g < 0) return x;
  if(i < g) g = i;
  if(g > 0) {
    x.rShiftTo(g,x);
    y.rShiftTo(g,y);
  }
  while(x.signum() > 0) {
    if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
    if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
    if(x.compareTo(y) >= 0) {
      x.subTo(y,x);
      x.rShiftTo(1,x);
    }
    else {
      y.subTo(x,y);
      y.rShiftTo(1,y);
    }
  }
  if(g > 0) y.lShiftTo(g,y);
  return y;
}

// (protected) this % n, n < 2^26
function bnpModInt(n) {
  if(n <= 0) return 0;
  var d = this.DV%n, r = (this.s<0)?n-1:0;
  if(this.t > 0)
    if(d == 0) r = this[0]%n;
    else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
  return r;
}

// (public) 1/this % m (HAC 14.61)
function bnModInverse(m) {
  var ac = m.isEven();
  if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
  var u = m.clone(), v = this.clone();
  var a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1);
  while(u.signum() != 0) {
    while(u.isEven()) {
      u.rShiftTo(1,u);
      if(ac) {
        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
        a.rShiftTo(1,a);
      }
      else if(!b.isEven()) b.subTo(m,b);
      b.rShiftTo(1,b);
    }
    while(v.isEven()) {
      v.rShiftTo(1,v);
      if(ac) {
        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
        c.rShiftTo(1,c);
      }
      else if(!d.isEven()) d.subTo(m,d);
      d.rShiftTo(1,d);
    }
    if(u.compareTo(v) >= 0) {
      u.subTo(v,u);
      if(ac) a.subTo(c,a);
      b.subTo(d,b);
    }
    else {
      v.subTo(u,v);
      if(ac) c.subTo(a,c);
      d.subTo(b,d);
    }
  }
  if(v.compareTo(BigInteger.ONE) != 0) return BigInteger.ZERO;
  if(d.compareTo(m) >= 0) return d.subtract(m);
  if(d.signum() < 0) d.addTo(m,d); else return d;
  if(d.signum() < 0) return d.add(m); else return d;
}

var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
var lplim = (1<<26)/lowprimes[lowprimes.length-1];

// (public) test primality with certainty >= 1-.5^t
function bnIsProbablePrime(t) {
  var i, x = this.abs();
  if(x.t == 1 && x[0] <= lowprimes[lowprimes.length-1]) {
    for(i = 0; i < lowprimes.length; ++i)
      if(x[0] == lowprimes[i]) return true;
    return false;
  }
  if(x.isEven()) return false;
  i = 1;
  while(i < lowprimes.length) {
    var m = lowprimes[i], j = i+1;
    while(j < lowprimes.length && m < lplim) m *= lowprimes[j++];
    m = x.modInt(m);
    while(i < j) if(m%lowprimes[i++] == 0) return false;
  }
  return x.millerRabin(t);
}

// (protected) true if probably prime (HAC 4.24, Miller-Rabin)
function bnpMillerRabin(t) {
  var n1 = this.subtract(BigInteger.ONE);
  var k = n1.getLowestSetBit();
  if(k <= 0) return false;
  var r = n1.shiftRight(k);
  t = (t+1)>>1;
  if(t > lowprimes.length) t = lowprimes.length;
  var a = nbi();
  for(var i = 0; i < t; ++i) {
    a.fromInt(lowprimes[i]);
    var y = a.modPow(r,this);
    if(y.compareTo(BigInteger.ONE) != 0 && y.compareTo(n1) != 0) {
      var j = 1;
      while(j++ < k && y.compareTo(n1) != 0) {
        y = y.modPowInt(2,this);
        if(y.compareTo(BigInteger.ONE) == 0) return false;
      }
      if(y.compareTo(n1) != 0) return false;
    }
  }
  return true;
}

// protected
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;

// public
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;

/**************************************CONSTANTS & ERROR CODES ******************************************/

/* Constants used for displaying error messages */
var ERR_NO_ERROR = 0;
var ERR_INVALID_PIN_LENGTH = 10;
var ERR_INVALID_PIN = 11;

var ERR_INVALID_PIN_BLOCK = 20;
var ERR_INVALID_RANDOM_NUMBER_LENGTH = 21;
var ERR_INVALID_RANDOM_NUMBER = 22;
var ERR_INVALID_HASH = 27;
var ERR_INVALID_OPERATION = 29;
var ERR_RSA_ENCRYPTION = 26;

var ERR_INVALID_PIN_MESSAGE_LENGTH = 31;

var ERR_INVALID_RSA_KEY_LENGTH = 41;
var ERR_INVALID_RSA_KEY = 42;

/* Other Constants or Global Variables */
var MAX_PIN_STRING_SIZE = 30;
var MIN_PIN_STRING_SIZE = 4;
var PIN_BLOCK_FILL_CHARACTER = 0xFF;
var FMT_2_CONTROL_BYTE = 0x02;
var FMT_12_CONTROL_BYTE = 0xC1;
var ISO_FORMAT_2_TYPE = 1;
var ISO_FORMAT_12_TYPE = 2;

var MAX_NUMERIC_PIN_STRING_SIZE = 12;
var MAX_NUMERIC_PIN_BYTE_SIZE = 6;
var DECIMAL_RADIX = 10;
var NUM_OF_BYTES_IN_FMT2_PIN_BLOCK = 8;
var NUM_OF_BYTES_PER_CNTRL_AND_PIN_LENGTH = 2;
var NUM_OF_BYTES_PER_WORD = 4;

var RSA_MODULUS_SIZE_IN_BYTES = 0;

var SHA1_HASH_SIZE_IN_BYTES = 20;
var SHA2_256_HASH_SIZE_IN_BYTES = 32;
var SHA2_384_HASH_SIZE_IN_BYTES = 48;
var SHA2_512_HASH_SIZE_IN_BYTES = 64;

var OAEP_SHA1_OFFSET_IN_BYTES = 42; //(2hlen+2)
var OAEP_SHA2_256_OFFSET_IN_BYTES = 66;
var OAEP_SHA2_384_OFFSET_IN_BYTES = 98;
var OAEP_SHA2_512_OFFSET_IN_BYTES = 130;

var MIN_PIN_MESSAGE_SIZE_IN_BYTES = 17; // 1 + PINBlock size (8) + Min Random No size (8)
var MAX_PIN_MESSAGE_SIZE_IN_BYTES = 0; // Will be initialized depending on Hash Algorithm
var ENCODED_MESSAGE_SIZE_IN_BYTES = 0;
var DATA_BLOCK_SIZE_IN_BYTES = 0;
var HASH_ALGO_SIZE_IN_BYTES = 0;

var ONE_PIN_BLOCK_IN_MESSAGE = 1;
var NUM_OF_NIBBLES_PER_BYTE = 2;
var MIN_PIN_BLOCK_SIZE = 8;
var MIN_RANDOM_NUMBER_STRING_LENGTH = MIN_PIN_BLOCK_SIZE * NUM_OF_NIBBLES_PER_BYTE;
var ENCODING_PARAMETER_SIZE_IN_BYTES = 16;


var C_String = "";
var P_String = "";
var MODULUS_STRING;
var EXPONENT_STRING;
var isPublicKeyDataValid = false;

/**************************************** RSA ENCRYPTION **************************************************/

var encryptedMsg = "";
var MOD = "";
var EXP = "";

function EncryptedMessage() {
    this.n = null;
    this.e = 0;
}

/* set Modulus and Exponent */
EncryptedMessage.prototype.setPublic = function(N, E) {
    if (N != null && E != null && N.length > 0 && E.length > 0) {
		
        this.n = parseBigInt(N, 16);
        this.e = parseInt(E, 16);

	} else
        throw ERR_INVALID_RSA_KEY_LENGTH;
}

// Perform raw public operation on "x": return x^e (mod n)
EncryptedMessage.prototype.doRSAEncryption = function(x, N, E) {

	var c = x.modPowInt(this.e, this.n);
	var modulusLength = RSA_MODULUS_SIZE_IN_BYTES*2;

    if (c == null) {
        throw ERR_RSA_ENCRYPTION;
    }

    var h = c.toString(16);

	missingBytes = modulusLength - h.length;
	encryptedMsg="";
	if(missingBytes != 0)
	{
		//if length is not equal to RSA MODULUS SIZE append 0 in the begging for missing bytes
		var i = 0;
		for(; i < missingBytes; i++ )
		{
			encryptedMsg += "0";
		}
		encryptedMsg += h.toUpperCase();		
	}
	else
	{
		encryptedMsg = h.toUpperCase();
	}

}

/* Return Encrypted Message */
EncryptedMessage.prototype.getBytes = function() {
    return encryptedMsg;
}

/****************************************** FORM PIN BLOCK ***************************************************/
var PinString;

//Creates Format 12 PIN block from clear Input PIN in ASCII form
function PINBlock(pinString) {
    PinString = pinString;
	this.PINBlockByteArray = new Array();
	this.PINBlockLength = 0;

}

PINBlock.prototype.getBytes = function() {
    return this.PINBlockByteArray;
}

function aCopy(src, sstart, dst, dstart, length) {
    for (var index = 0; index < length; index++) {
        dst[dstart] = (src[sstart]);
        sstart++;
        dstart++;
    }

}

function fillByteArray(byteArray, fillCharacter) {
    var index, byteArrayLength;

    byteArrayLength = byteArray.length;

    for (index = 0; index < byteArrayLength; index++) {
        byteArray[index] = 'F';
    }

    return;
}

/*
Format 12 PIN Block: 
Alpha-numeric PIN of 4 to 30 characters will be placed in a Format 12 PIN block.
A format 12 PIN block consists of a number of 8-byte blocks in order to
accommodate the clear password. The PIN block accommodates an alpha-numeric
password of 4 or more characters.

block 1 					block 2 --------   block 4
C S L P P P P P/F P/F 		8 x P / F 			8 x P / F

C = Control nibble, value = X'C' (decimal 12)
S = Secondary control nibble, value = X'1'
L = password length in range 4 to 30, i.e. X'04' . L . X'1E'
P = password character, any character X'00' . P . X'FF'
P / F = password or filler characters. The filler character is X'FF'

The PIN block consists of the minimum number of blocks that will accommodate the
alpha-numeric PIN. A single block accommodates a PIN from 4 to 6 characters,
whereas 4 blocks would be required to accommodate a PIN of 23 to 30 characters.

*/
PINBlock.prototype.createFormat12PINBlock = function(pinString) {
    var PINBlockType = ISO_FORMAT_12_TYPE;
    var numberOfPINBlocks = 0;
    var PINLength = pinString.length;

    if (PINLength <= 6) {
        numberOfPINBlocks = 1;
    } else {
        numberOfPINBlocks = Math.floor(2 + (PINLength - 7) / NUM_OF_BYTES_IN_FMT2_PIN_BLOCK);
    }
   
    this.PINBlockLength = numberOfPINBlocks * NUM_OF_BYTES_IN_FMT2_PIN_BLOCK * 2;
   
    this.PINBlockByteArray = new Array(this.PINBlockLength);

    fillByteArray(this.PINBlockByteArray, PIN_BLOCK_FILL_CHARACTER);

    this.PINBlockByteArray[0] = 'C';
    this.PINBlockByteArray[1] = '1';

    if (PINLength <= 15) //F = 15
    {
        this.PINBlockByteArray[2] = '0';
        this.PINBlockByteArray[3] = PINLength.toString(16);
    } else if (PINLength >= 16 && PINLength <= 30) {
        //TO HEX
        var abc = PINLength.toString(16);
        this.PINBlockByteArray[2] = abc.charAt(0);
        this.PINBlockByteArray[3] = abc.charAt(1);

    }

    var HexPIN = s2hex(pinString); //Hex value
  
    var PINArray = new Array();
    for (var i = 0; i < HexPIN.length; i++) {
        PINArray.push(HexPIN.charAt(i));
    }

    aCopy(PINArray, 0, this.PINBlockByteArray, 4, (HexPIN.length));
   
}
//SpecialChar ( isbetween( '!', c, '/' ) || isbetween( ':', c, '@' )  || isbetween( '[', c, '`' ) || isbetween( '{', c, '~' ) )
function IsLetterOrDigitOrSpecial(c) {
    var cc = c.charCodeAt(0);
    if ((cc >= 0x21 && cc <= 0x7E))
    {
        return true;
    }
    return false;
}

function IsLetterOrDigit(c) {
    var cc = c.charCodeAt(0);
    if ((cc >= 0x30 && cc <= 0x39) ||
        (cc >= 0x41 && cc <= 0x5A) ||
        (cc >= 0x61 && cc <= 0x7A)) {
        return true;
    }
    return false;
}

PINBlock.prototype.ValidateAndCreatePINBlockByteArray = function(pinString) {

    if (pinString == null)
        return ERR_INVALID_PIN;

    var PINLength = pinString.length;
  
    if (PINLength > MAX_PIN_STRING_SIZE ||
        PINLength < MIN_PIN_STRING_SIZE) {
        return ERR_INVALID_PIN_LENGTH;
    }


    var PinStringByteArray = new Array(MAX_PIN_STRING_SIZE);

    var isInvalidCharFound = false;

    for (var index = 0; index < PINLength; index++) {
        var pinChar = pinString.charAt(index);
        if (!IsLetterOrDigitOrSpecial(pinChar)) {
            isInvalidCharFound = true;
            break;
        }
        PinStringByteArray[index] = pinChar;
    }

    if (isInvalidCharFound) {
        return ERR_INVALID_PIN;
    } else {
        this.createFormat12PINBlock(pinString);
    }
	

    return ERR_NO_ERROR;
}

/***************************************** FORM PIN MESSAGE ********************************************************/

var PINLengthInBytes = 0;
var pinMessageArray = new Array();
var pinMessageLength = 0;
var MAX_MESSAGE_SIZE_IN_BYTES = 0;

//M = 1 || PB || RN
//Concatenate 01 || PIN Block || Random Number to form PIN Message
// This PIN Message  is actually encoded and then encrypted by RSA Keys

function PINMessage(PINBlock, RandomString, Hash_String) {

	if (Hash_String.toLowerCase() == "SHA1".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA1_OFFSET_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-256".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_256_OFFSET_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-384".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_384_OFFSET_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-512".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_512_OFFSET_IN_BYTES;

    } else {
        throw ERR_INVALID_HASH;
    }

     if (MAX_MESSAGE_SIZE_IN_BYTES < 1)
        throw ERR_INVALID_PIN_LENGTH;

     var MAX_MESSAGE_SIZE_IN_NIBBLES = MAX_MESSAGE_SIZE_IN_BYTES * 2;

    pinMessageArray = new Array(MAX_MESSAGE_SIZE_IN_NIBBLES);

	pinMessageArray[0] = '0';
    pinMessageArray[1] = '1';
    pinMessageLength = 2;

    PINLengthInBytes = PINBlock.length / 2;
    addPinBlockToMessageArray(PINBlock);
    addRandomStringToMessageArray(RandomString);
    
}

//M = 2 || PB1 || PB2 || RN
//Concatenate 02 || PIN Block-1 || PIN Block-2 || Random Number to form PIN Message
// This PIN Message  is actually encoded and then encrypted by RSA Keys

function PINMessage2(PINBlock1, PINBlock2, RandomString, Hash_String) {

	if (Hash_String.toLowerCase() == "SHA1".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA1_OFFSET_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-256".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_256_OFFSET_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-384".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_384_OFFSET_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-512".toLowerCase()) {
        MAX_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_512_OFFSET_IN_BYTES;

    } else {
        throw ERR_INVALID_HASH;
    }

     if (MAX_MESSAGE_SIZE_IN_BYTES < 1)
        throw ERR_INVALID_PIN_LENGTH;

     var MAX_MESSAGE_SIZE_IN_NIBBLES = MAX_MESSAGE_SIZE_IN_BYTES * 2;

    pinMessageArray = new Array(MAX_MESSAGE_SIZE_IN_NIBBLES);

	pinMessageArray[0] = '0';
    pinMessageArray[1] = '2';
    pinMessageLength = 2;

    PINLengthInBytes = PINBlock1.length / 2;//Not used anywhere
    addPinBlockToMessageArray(PINBlock1);
	addPinBlockToMessageArray(PINBlock2);
    addRandomStringToMessageArray(RandomString);
    
}

//only pinMessageLength bytes need to be returned 
PINMessage.prototype.getBytes = function() {
    var tmp = new Array(pinMessageLength);
    aCopy(pinMessageArray, 0, tmp, 0, pinMessageLength);

    return tmp;
}

//only pinMessageLength bytes need to be returned 
PINMessage2.prototype.getBytes = function() {
    var tmp = new Array(pinMessageLength);
    aCopy(pinMessageArray, 0, tmp, 0, pinMessageLength);

    return tmp;
}

function addPinBlockToMessageArray(pinBlock) {

    if (pinBlock == null) {
        throw ERR_INVALID_PIN_BLOCK;
    }

    aCopy(pinBlock, 0, pinMessageArray, pinMessageLength, pinBlock.length);
    pinMessageLength += pinBlock.length;
   
}

function addRandomStringToMessageArray(RandomString) {

    if (RandomString == null) {
        throw ERR_INVALID_RANDOM_NUMBER;
    }

	//Random Number should be in Hex form Nibbles
    var res = ifValidHex(RandomString);
    if (!res)
        throw ERR_INVALID_RANDOM_NUMBER;

    var RNMultipleOf8bits = 0;
    var RNStringLength = RandomString.length;

    RNMultipleOf8bits = RNStringLength % 2;

	if (RNMultipleOf8bits) {
        throw ERR_INVALID_RANDOM_NUMBER_LENGTH;
    }
	
	//pinMessageLength is divided by 2, as its count is in nibbles
    var maxRandomNumberStringSize = (MAX_MESSAGE_SIZE_IN_BYTES - (pinMessageLength/2)) * NUM_OF_NIBBLES_PER_BYTE;
 

    if (RNStringLength < MIN_RANDOM_NUMBER_STRING_LENGTH ||
        RNStringLength > maxRandomNumberStringSize) {
         throw ERR_INVALID_RANDOM_NUMBER_LENGTH;
    }

	aCopyStr(RandomString, 0, pinMessageArray, pinMessageLength, RNStringLength);
    pinMessageLength += RNStringLength;

}

/******************************************** OAEP ENCODING ******************************************************/
var encodedMsg = "";
var P = "";

function OAEPEncodedMessage(pinMessage, RN_String, Hash_String) {


    ENCODED_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - 1;
	
	//Initialize the variables depending on Hash Algorithm and Modulus size
    if (Hash_String.toLowerCase() == "SHA1".toLowerCase()) {
        HASH_ALGO_SIZE_IN_BYTES = SHA1_HASH_SIZE_IN_BYTES;
        MAX_PIN_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA1_OFFSET_IN_BYTES;
        DATA_BLOCK_SIZE_IN_BYTES = ENCODED_MESSAGE_SIZE_IN_BYTES - SHA1_HASH_SIZE_IN_BYTES;
        
    } else if (Hash_String.toLowerCase() == "SHA2-256".toLowerCase()) {
      
        HASH_ALGO_SIZE_IN_BYTES = SHA2_256_HASH_SIZE_IN_BYTES;
        MAX_PIN_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_256_OFFSET_IN_BYTES;
        DATA_BLOCK_SIZE_IN_BYTES = ENCODED_MESSAGE_SIZE_IN_BYTES - SHA2_256_HASH_SIZE_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-384".toLowerCase()) {
       
        HASH_ALGO_SIZE_IN_BYTES = SHA2_384_HASH_SIZE_IN_BYTES;
        MAX_PIN_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_384_OFFSET_IN_BYTES;
        DATA_BLOCK_SIZE_IN_BYTES = ENCODED_MESSAGE_SIZE_IN_BYTES - SHA2_384_HASH_SIZE_IN_BYTES;
    } else if (Hash_String.toLowerCase() == "SHA2-512".toLowerCase()) {
        
        HASH_ALGO_SIZE_IN_BYTES = SHA2_512_HASH_SIZE_IN_BYTES;
        MAX_PIN_MESSAGE_SIZE_IN_BYTES = RSA_MODULUS_SIZE_IN_BYTES - OAEP_SHA2_512_OFFSET_IN_BYTES;
        DATA_BLOCK_SIZE_IN_BYTES = ENCODED_MESSAGE_SIZE_IN_BYTES - SHA2_512_HASH_SIZE_IN_BYTES;
    } else {
        
        throw ERR_INVALID_HASH;
    }
	
    doOAEPEncoding(pinMessage, RN_String, Hash_String);

}

OAEPEncodedMessage.prototype.getBytes = function() {
    return encodedMsg;
}

//Generate a random Hexadecimal number of desired length
function randomString(len) {
    var chars = "0123456789ABCDEF";
    var string_length = len;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
}

//Return Randomly generated encoding parameter
OAEPEncodedMessage.prototype.getEncodingParameter  = function() {
    return P;
}

function parseBigInt(str, r) {
    return new BigInteger(str, r);
}

// Copies String data to Array
function aCopyStr(src, sstart, dst, dstart, length) {

	//Copy src string to tmpArray
    var tmpArray = new Array();
    for (var i = 0; i < src.length; i++) {
        tmpArray.push(src.charAt(i));
    }

	//Copy tmpArray to dst Array
    for (var index = 0; index < length; index++) {

        dst[dstart] = (tmpArray[sstart]);
        sstart++;
        dstart++;
    }
}

function xorByteArrays(byteArray1, byteArray2) {

    var xorData = [];
    var result = [];
    var str1 = toString(byteArray1);
    var str2 = toString(byteArray2);
 
    var hexStr1 = new Array();
    var hexStr2 = new Array();
    for (var i = 0; i < str1.length; i++) {
        hexStr1[i] = parseInt(str1.charAt(i), 16);
    }
    for (var i = 0; i < str2.length; i++) {
        hexStr2[i] = parseInt(str2.charAt(i), 16);
    }

    for (var i = 0; i < hexStr1.length; i++) {
        xorData.push(hexStr1[i] ^ hexStr2[i]);
    }


    for (var i = 0; i < xorData.length; i++) {
        result[i] = xorData[i].toString(16);
    }


    return result;
}

// Perform  RSA-OAEP Encoding acc. to PKCS#1 v2.1
function doOAEPEncoding(Z, RN_String, Hash) {

    var DB = new Array(DATA_BLOCK_SIZE_IN_BYTES * 2);
    var dbMask = new Array(DATA_BLOCK_SIZE_IN_BYTES * 2);
    var maskedDB = new Array(DATA_BLOCK_SIZE_IN_BYTES * 2);

    var pHash = new Array(HASH_ALGO_SIZE_IN_BYTES * 2);
    var seed = new Array(HASH_ALGO_SIZE_IN_BYTES * 2);
    var seedMask = new Array(HASH_ALGO_SIZE_IN_BYTES * 2);
    var maskedSeed = new Array(HASH_ALGO_SIZE_IN_BYTES * 2);

    var encodedMsgByteArray = new Array(2 + ENCODED_MESSAGE_SIZE_IN_BYTES * 2);
    var pinMsgLength;
    var offset;
    var numberOfPaddingBytes;
    var lHash = new Array();
    var pinMsgLength = Z.length / 2;

	if (pinMsgLength < MIN_PIN_MESSAGE_SIZE_IN_BYTES || pinMsgLength > MAX_PIN_MESSAGE_SIZE_IN_BYTES) {
         throw ERR_INVALID_PIN_MESSAGE_LENGTH;
    }


    //	If the label L is not provided, let L be the empty string. Let lHash = Hash(L), an octet string of length hLen
    // 	If the length of L is greater than the input limitation for the hash function (2^61 - 1 octets for SHA-1), output "label too long" and stop
    //    Therefore, L ( P here) is assumed to be of 16 bytes
    P = randomString(ENCODING_PARAMETER_SIZE_IN_BYTES * 2);
    
    // calculate lHash = Hash(L)
    var shaObj = new jsSHA(P, "HEX");

    if (Hash.toLowerCase() == "SHA1".toLowerCase()) {
        lHash = shaObj.getHash("SHA-1", "HEX");
    } else if (Hash.toLowerCase() == "SHA2-256".toLowerCase()) {
        lHash = shaObj.getHash("SHA-256", "HEX");
    } else if (Hash.toLowerCase() == "SHA2-384".toLowerCase()) {
        lHash = shaObj.getHash("SHA-384", "HEX");
    } else if (Hash.toLowerCase() == "SHA2-512".toLowerCase()) {
        lHash = shaObj.getHash("SHA-512", "HEX");
    } else {
        throw ERR_INVALID_HASH;
    }

    // form DB by concatenating pHash, zero Padding string PS, padding byte 01 and M
    var byteArrayLength;
    byteArrayLength = DB.length;

    for (var index = 0; index < byteArrayLength; index++) {
        DB[index] = 0;
    }

	//	DB = lHash || PS || 0x01 || M
    aCopyStr(lHash, 0, DB, 0, HASH_ALGO_SIZE_IN_BYTES * 2);
  ;
    offset = 2 * HASH_ALGO_SIZE_IN_BYTES;
    numberOfPaddingBytes = 2 * (DATA_BLOCK_SIZE_IN_BYTES - HASH_ALGO_SIZE_IN_BYTES - pinMsgLength - 1);

    offset += numberOfPaddingBytes;
    DB[offset] = '0';
    offset++;
    DB[offset] = '1';
    offset++;

    aCopy(Z, 0, DB, offset, Z.length);
   
    // generate a random octet string seed of length hLen (HASH_ALGO_SIZE_IN_BYTES*2)
    seed = randomString(seed.length);
   
    var SeedArray = new Array();
    for (var i = 0; i < seed.length; i++) {
         SeedArray.push(seed.charAt(i));

    }
	
    //  dbMask = MGF (seed, k  hLen  1)
    MGF(SeedArray, dbMask, 2 * DATA_BLOCK_SIZE_IN_BYTES, Hash);

    // maskedDB = DB XOR dbMask
    maskedDB = xorByteArrays(DB, dbMask);

    // seedMask = MGF (maskedDB, hLen).
    MGF(maskedDB, seedMask, 2 * HASH_ALGO_SIZE_IN_BYTES, Hash);
 
    // maskedSeed = seed XOR seedMask.
    maskedSeed = xorByteArrays(seed, seedMask);
  
    // EM = 0x00 || maskedSeed || maskedDB.
    encodedMsgByteArray[0] = '0';
    encodedMsgByteArray[1] = '0';
    aCopy(maskedSeed, 0, encodedMsgByteArray, 2, HASH_ALGO_SIZE_IN_BYTES * 2);
    aCopy(maskedDB, 0, encodedMsgByteArray, 2 + HASH_ALGO_SIZE_IN_BYTES * 2, DATA_BLOCK_SIZE_IN_BYTES * 2);

    str1 = toString(encodedMsgByteArray);
  
    encodedMsg = new BigInteger(str1, 16);
  
}

function I2OSP(inputWord, arrayOffset) {
    var ba = new Array(NUM_OF_BYTES_PER_WORD * 2);
    var i;
    for (i = 0; i < (NUM_OF_BYTES_PER_WORD * 2); i++) {

        ba[i] = 0;
    }

    ba[arrayOffset] = inputWord.toString(16);
    return ba;

}

function MGF(Z, T, l, Hash) {
    var tempArray = new Array(ENCODED_MESSAGE_SIZE_IN_BYTES * 2);
    var hashArray = new Array(HASH_ALGO_SIZE_IN_BYTES * 2);
    var C = new Array(NUM_OF_BYTES_PER_WORD * 2);

    var counter;
    var inputString = "";

    var maxCount;
    var seedLength;
    var offset;
    var remainingBytes;
    var numberOfBytesToCopy;
    var i;

    seedLength = Z.length;
    var tempArray2 = new Array(seedLength + (NUM_OF_BYTES_PER_WORD * 2));
    maxCount = Math.floor(l / (HASH_ALGO_SIZE_IN_BYTES * 2));

    remainingBytes = l - maxCount * HASH_ALGO_SIZE_IN_BYTES * 2;
 
    // set limit to allow for extra calculation which can then be truncated
    if (remainingBytes > 0) {
        maxCount++;
    }
    numberOfBytesToCopy = 2 * HASH_ALGO_SIZE_IN_BYTES;

    // initialize the array: Let T be the empty octet string
    for (i = 0; i < (ENCODED_MESSAGE_SIZE_IN_BYTES * 2); i++) {
        tempArray[i] = 0;
    }

   	//   counter from 0 to [ maskLen / hLen ]  1,
    for (counter = 0; counter < maxCount; counter++) {
	
        C = I2OSP(counter, 7);
			
		//Concatenate Z and C
        aCopy(Z, 0, tempArray, 0, seedLength);

        aCopy(C, 0, tempArray, seedLength, NUM_OF_BYTES_PER_WORD * 2);

		//So 4 bytes of C and seedLength bytes of Z are actually concatenated
        aCopy(tempArray, 0, tempArray2, 0, seedLength + NUM_OF_BYTES_PER_WORD * 2);

		// calculate hash(Z||C)
        var str = tempArray2.toString();

        inputString = str.split(",").join("");

		//T = T || Hash (mgfSeed || C)
        var shaObj = new jsSHA(inputString, "HEX");

        if (Hash.toLowerCase() == "SHA1".toLowerCase()) {
            hashArray = shaObj.getHash("SHA-1", "HEX");
        } else if (Hash.toLowerCase() == "SHA2-256".toLowerCase()) {
            hashArray = shaObj.getHash("SHA-256", "HEX");
        } else if (Hash.toLowerCase() == "SHA2-384".toLowerCase()) {
            hashArray = shaObj.getHash("SHA-384", "HEX");
        } else if (Hash.toLowerCase() == "SHA2-512".toLowerCase()) {
            hashArray = shaObj.getHash("SHA-512", "HEX");
        } else {
            throw ERR_INVALID_HASH;
        }
        offset = counter * (2 * HASH_ALGO_SIZE_IN_BYTES);

        // on last count only transfer remaining bytes
        if (counter == (maxCount - 1) && remainingBytes > 0) {
            numberOfBytesToCopy = remainingBytes;
        }

        aCopyStr(hashArray, 0, T, offset, numberOfBytesToCopy);

    }

    return;
}

/**********************************************************************************************************************/

/* Check if Input is in valid hexadeimal form or not */
function ifValidHex(Modulus) {
    var i;
    for (i = 0; i < Modulus.length; i++) {
        if (isNaN(parseInt(Modulus.charAt(i), 16))) {
            return false;
        }
    }
    return true;
}

/* Validate Public Key Modulus and Public Key Exponent*/
function validate_Mod_Exp(Modulus, Exponent) {

    var ModMultipleOf8bits = 0, ExpMultipleOf8bits = 0;

    ModMultipleOf8bits = Modulus.length % 2;
    ExpMultipleOf8bits = Exponent.length % 2;

    if (ModMultipleOf8bits || ExpMultipleOf8bits) {
        return ERR_INVALID_RSA_KEY_LENGTH;
    }

    var modSizeInBytes = Modulus.length / 2, expSizeInBytes = Exponent.length / 2;

    //LunaEFT Key Length allowed is between 512(64 bytes) and 2048 bits (in increment fo 8 bits)
    if (modSizeInBytes < 64 || modSizeInBytes > 256) {
        return ERR_INVALID_RSA_KEY_LENGTH;
    }

	//Exponent length should be less than modulus length
    if (expSizeInBytes > modSizeInBytes) {
        return ERR_INVALID_RSA_KEY_LENGTH;
    }

    var res = ifValidHex(Modulus);
    if (!res)
        return ERR_INVALID_RSA_KEY;

    res = ifValidHex(Exponent);
    if (!res)
        return ERR_INVALID_RSA_KEY;

    return ERR_NO_ERROR;

}

/* Clean up sensitive data */
function clearData() 
{
      PinString = "";
      PINLengthInBytes = 0;
      pinMessageArray = new Array();
      pinMessageLength = 0;
	  encodedMsg = "";
	  P = "";
	  encryptedMsg = "";
}


/* Initializes Modulus Size (In bytes) , Modulus String, Exponent String
*
*  This function should be called before calling OBM_EncryptPassword
*  This is important as MODULUS_STRING, EXPONENT_STRING and RSA_MODULUS_SIZE_IN_BYTES
*  is required by different functions.
*
*/

function initialisePublicKeyData(Mod_String, Exp_String) {

    var res = validate_Mod_Exp(Mod_String, Exp_String);
	if (res)
        return res;

    RSA_MODULUS_SIZE_IN_BYTES = Mod_String.length / 2;
    MODULUS_STRING = Mod_String;
    EXPONENT_STRING = Exp_String;

    isPublicKeyDataValid = true;
	return ERR_NO_ERROR;

}

 /**
  * @brief OBM_GetEncodingParameter
  *
  * This is an accessor method to return a previously generated encoding parameter.
  *
  * @param None
  *                            
  * @return P_String    Encoding Parameter generated by Javascript (OAEPEncodeMessage.js) and returned to client.
  *					It is a String of 32 hex digits (ie. 16 bytes).
  */

function OBM_GetEncodingParameter() {
    return P_String;
}

  /**
  * @brief OBM_GetEncryptedPassword
  *
  * This is an accessor method to return a previously encrypted password by OBM_EncryptPassword or OBM_EncryptPassword_Ex
  *
  * @param None
  *
  * @return C_String    Encrypted message as string of hex digits calculated
  *                     in OBM_EncryptPassword and OBM_EncryptPassword_Ex methods.
  *
  */  
function OBM_GetEncryptedPassword() {
    return C_String;
}


/**
   * @brief OBM_EncryptPassword_Ex
   *
   * This method encodes and encrypts a user password in a form that can
   * be sent to the HSM to set a password. 
   *
   * @param [in]  PIN_String     Password to be encrypted. Passed as ASCII 
   *                            characters. The password will be formatted
   *                            as a Format 12 PIN block.
   * @param [in]  RN_String     Random number as a string of hex digits as
   *                            generated in HSM.
   * @param [in]  Hash_String   Hash Algorithm to be used for encryption
   *                            Allowed values: SHA1, SHA2-256, 
   *                            SHA2-384, SHA2-512.                           
   *                            
   * @note The encoded and encrypted password is stored in a private
   *       variable and can be retrieved via the accessor method
   *       OBM_Get_EncryptedPassword.
   *
   * @return ERR_NO_ERROR       Success
   * @return ERR_INVALID_PIN    Invalid password ...
   */
function OBM_EncryptPassword_Ex(PIN_String, RN_String, Hash_String) { 

    try {
	 //   alert("PIN_String" + PIN_String);  
	//	alert("RN_String" + RN_String);
	//	alert("Hash_String" + Hash_String);
	 //alert("isPublicKeyDataValid:::"+isPublicKeyDataValid);
        if (!isPublicKeyDataValid)
            throw ERR_INVALID_RSA_KEY;

        var encMessage = new EncryptedMessage();
        encMessage.setPublic(MODULUS_STRING, EXPONENT_STRING);

        var pinBlock = new PINBlock(PIN_String);
        res = pinBlock.ValidateAndCreatePINBlockByteArray(PIN_String);

        if (res != ERR_NO_ERROR)
            throw res;
		
		
		
        var pinMessage = new PINMessage(pinBlock.getBytes(), RN_String, Hash_String);
		
        var oaepEncMessage = new OAEPEncodedMessage(pinMessage.getBytes(), RN_String, Hash_String);

        P_String = oaepEncMessage.getEncodingParameter();
        encMessage.doRSAEncryption(oaepEncMessage.getBytes(), MODULUS_STRING, EXPONENT_STRING);

     	C_String = encMessage.getBytes();
      
        return ERR_NO_ERROR;
    } catch (res) {
        return res;
    }


}


/**
   * @brief OBM_EncryptPassword
   *
   * This method encodes and encrypts a user password in a form that can
  * be sent to the HSM to set a password. 
  *
  * @param [in]  PIN_String     Password to be encrypted. Passed as ASCII 
  *                            characters. The password will be formatted
  *                            as a Format 12 PIN block.
  * @param [in]  RN_String     Random number as a string of hex digits as
  *                            generated in ESM and sent to Javascript.
  *                            
  * @note The encoded and encrypted password is stored in a private
  *       variable and can be retrieved via the accessor method
  *       OBM_Get_EncryptedPassword.
  *
  * @return ERR_NO_ERROR       Success
  * @return ERR_INVALID_PIN    Invalid password ...
  */
   
function OBM_EncryptPassword(PIN_String, RN_String) {

    try {
		
        if (!isPublicKeyDataValid)
            throw ERR_INVALID_RSA_KEY;

        var encMessage = new EncryptedMessage();
        encMessage.setPublic(MODULUS_STRING, EXPONENT_STRING);

        var pinBlock = new PINBlock(PIN_String);
        res = pinBlock.ValidateAndCreatePINBlockByteArray(PIN_String);

        if (res != ERR_NO_ERROR)
            throw res;

        var pinMessage = new PINMessage(pinBlock.getBytes(), RN_String, "SHA1");

        var oaepEncMessage = new OAEPEncodedMessage(pinMessage.getBytes(), RN_String, "SHA1");

        P_String = oaepEncMessage.getEncodingParameter();
       
        encMessage.doRSAEncryption(oaepEncMessage.getBytes(), MODULUS_STRING, EXPONENT_STRING);

        C_String = encMessage.getBytes();
        
        return ERR_NO_ERROR;
    } catch (res) {
        return res;
    }


}

/**
   * @brief OBM_EncryptChangePassword
  *
  * This method encodes and encrypts an old and new user password in a form
  * that can be sent to the HSM to effect a password change. 
  *
  * @param [in]  oldPinString  Original password as a string of ASCII
  *                            characters.
  * @param [in]  newPinString  New password as a string of ASCII characters.
  * @param [in]  RN_String     Random number as a string of hex digits as
  *                            generated in HSM and sent to Javascript.
  *                            
  * @note The encoded and encrypted password message is stored in a private
  *       variable and can be retrieved via the accessor method
  *       OBM_Get_EncryptedPassword.
  *
  * @return ERR_NO_ERROR       Success
  * @return ERR_INVALID_PIN    Invalid password ...
  */
  
function OBM_EncryptChangePassword(old_PIN_String, new_PIN_String, RN_String) {

    try {
		
        if (!isPublicKeyDataValid)
            throw ERR_INVALID_RSA_KEY;

        var encMessage = new EncryptedMessage();
        encMessage.setPublic(MODULUS_STRING, EXPONENT_STRING);
    
		var OldPinBlock = new PINBlock(old_PIN_String);
        res = OldPinBlock.ValidateAndCreatePINBlockByteArray(old_PIN_String);

        if (res != ERR_NO_ERROR)
            throw res;
		
		var NewPinBlock = new PINBlock(new_PIN_String);
        res = NewPinBlock.ValidateAndCreatePINBlockByteArray(new_PIN_String);
		
        if (res != ERR_NO_ERROR)
            throw res;

        var pinMessage = new PINMessage2(OldPinBlock.getBytes(), NewPinBlock.getBytes(), RN_String, "SHA1");
	
        var oaepEncMessage = new OAEPEncodedMessage(pinMessage.getBytes(), RN_String, "SHA1");

        P_String = oaepEncMessage.getEncodingParameter();
       
        encMessage.doRSAEncryption(oaepEncMessage.getBytes(), MODULUS_STRING, EXPONENT_STRING);

        C_String = encMessage.getBytes();
        
        return ERR_NO_ERROR;
    } catch (res) {
        return res;
    }
}
/**
   * @brief OBM_EncryptChangePassword_Ex
  *
  * This method encodes and encrypts an old and new user password in a form
  * that can be sent to the HSM to effect a password change. 
  *
  * @param [in]  oldPinString  Original password as a string of ASCII
  *                            characters.
  * @param [in]  newPinString  New password as a string of ASCII characters.
  * @param [in]  RN_String     Random number as a string of hex digits as
  *                            generated in HSM and sent to Javascript.
  * @param [in]  Hash_String   Hash Algorithm to be used for encryption
   *                            Allowed values: SHA1, SHA2-256, 
   *                            SHA2-384, SHA2-512.        
  *                            
  * @note The encoded and encrypted password message is stored in a private
  *       variable and can be retrieved via the accessor method
  *       OBM_Get_EncryptedPassword.
  *
  * @return ERR_NO_ERROR       Success
  * @return ERR_INVALID_PIN    Invalid password ...
  */
  
function OBM_EncryptChangePassword_Ex(old_PIN_String, new_PIN_String, RN_String,Hash_String ) {

    try {
		
        if (!isPublicKeyDataValid)
            throw ERR_INVALID_RSA_KEY;

        var encMessage = new EncryptedMessage();
        encMessage.setPublic(MODULUS_STRING, EXPONENT_STRING);
    
		var OldPinBlock = new PINBlock(old_PIN_String);
        res = OldPinBlock.ValidateAndCreatePINBlockByteArray(old_PIN_String);

        if (res != ERR_NO_ERROR)
            throw res;
		
		var NewPinBlock = new PINBlock(new_PIN_String);
        res = NewPinBlock.ValidateAndCreatePINBlockByteArray(new_PIN_String);
		
        if (res != ERR_NO_ERROR)
            throw res;

        var pinMessage = new PINMessage2(OldPinBlock.getBytes(), NewPinBlock.getBytes(), RN_String, Hash_String);

        var oaepEncMessage = new OAEPEncodedMessage(pinMessage.getBytes(), RN_String, Hash_String);

        P_String = oaepEncMessage.getEncodingParameter();
       
        encMessage.doRSAEncryption(oaepEncMessage.getBytes(), MODULUS_STRING, EXPONENT_STRING);

        C_String = encMessage.getBytes();
        
        return ERR_NO_ERROR;
    } catch (res) {
        return res;
    }
}
// Convert Input Array to String
function toString(d) {

    var inputString;
    var str = d.toString();

    inputString = str.split(",").join("");
    return inputString;
}


//Convert string to Hexadecimal representation
function s2hex(s) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        c = s.charCodeAt(i);
        result += ((c < 16) ? "0" : "") + c.toString(16);
    }
    return result;
}
