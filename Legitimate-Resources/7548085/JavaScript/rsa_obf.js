/*
 * Copyright (c) 2003-2005  Tom Wu
 * http://www-cs-students.stanford.edu/~tjw/jsbn/
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY 
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.  
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */
function parseBigInt(B,A){return new BigInteger(B,A)}function pkcs1pad2B(C,H){var G=C.length;if(G>H-11-4){throw"104"}var A=[0,2,255,255,255,255];var B=H-G-3-4;var F=randomBytes(B);var D=A.concat(F,[0],C);var E=new BigInteger(D);return E}function randomBytes(C){var A=[];var B=0;for(B=0;B<C;B++){A[B]=Math.ceil(Math.random()*255)}return A}function pkcs1pad2(F,A){var I=Math.ceil(F.bitLength()/8);if(A<I+11+4){alert("Message too long for RSA");return null}var E=[0,2,255,255,255,255];var B;B=A-I-7;var G=0;var D=6;while(D<B+6){G=0;while(G==0){G=Math.floor(Math.random()*255)}E[D++]=G}var H=new BigInteger(E);var C=H.toString(16)+"00"+F.toString(16);return new BigInteger(C,16)}function RSAKey(){this.n=null;this.e=0;this.d=null}RSAKey.prototype.setPublic=function(B,A){if(B!=null&&A!=null&&B.length>0&&A.length>0){this.n=parseBigInt(B,16);this.e=parseInt(A,16)}else{alert("Invalid RSA public key")}};RSAKey.prototype.doPublic=function(A){return A.modPowInt(this.e,this.n)};RSAKey.prototype.encryptNativeHexStr=function(C){var F=C.length/2;var E=(this.n.bitLength()+7)>>3;if(F>E){throw"104"}var A=new BigInteger(C,16);var D=this.doPublic(A);if(D==null){return null}var B=D.toString(16);if((B.length&1)==0){return B}else{return"0"+B}};RSAKey.prototype.encryptNativeBytes=function(B){var H=B.length;var G=(this.n.bitLength()+7)>>3;if(H>G){throw"104"}var A=new BigInteger(B);var F=this.doPublic(A);if(F==null){return null}var D=F.toString(16);if(D.length<=(G*2)){var E=(G*2)-D.length;for(var C=0;C<E;C++){D="0"+D}return D}};RSAKey.prototype.encrypt=function(B){var A=pkcs1pad2(B,(this.n.bitLength()+7)>>3);if(A==null){return null}var D=this.doPublic(A);if(D==null){return null}var C=D.toString(16);if((C.length&1)==0){return C}else{return"0"+C}};RSAKey.prototype.encryptB=function(B){var A=pkcs1pad2B(B,(this.n.bitLength()+7)>>3);if(A==null){return null}var D=this.doPublic(A);if(D==null){return null}var C=D.toString(16);if((C.length&1)==0){return C}else{return"0"+C}};