/* このファイル内の全ての以下の関数引数、戻り値は同じ   */
/* 引数　： checkOBJ : チェックするオブジェクト名 */
/*          checkLen : 制限バイト数               */
/*          strictFlg: バイト数チェックの厳しさ   */
/*                     0:制限内 1:桁固定          */
/*                特別 2:年号 3:isInteger()の場合、0(ゼロ）を許す  */
/* 戻り値： なし                                  */

/* バイト数のチェック */
function checkByteNum(checkOBJ, checkLen, strictFlg, zkFlg ) {
  var workLen=0;
  var err=false;

  workLen = getStrLen( checkOBJ.value );
  switch( strictFlg ){
  case 0:
    if(workLen>checkLen){
      if( zkFlg==0 )
        nbError( 1, checkLen );
      else
        nbError( 18, checkLen );
      checkOBJ.focus();
      checkOBJ.select();
      err = true;
    }
    break;
  case 1:
    if(workLen!=checkLen){
      nbError( 7, checkLen );
      checkOBJ.focus();
      checkOBJ.select();
      err = true;
    }
    break;
  case 2:
    if(workLen!=checkLen){
      nbError( 13 );
      checkOBJ.focus();
      checkOBJ.select();
      err = true;
    }
    break;
  case 3:
    if(workLen>checkLen){
      if( zkFlg==0 )
        nbError( 1, checkLen );
      else
        nbError( 18, checkLen );
      checkOBJ.focus();
      checkOBJ.select();
      err = true;
    }
    break;
  default:
    nbError( 99 );
  }
  return(err);
}

/* 日本語入力（半角カナ以外はＯＫ）               */
function isJapanese( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var err=false;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceHanKana( checkOBJ.value );
    checkOBJ.value = replaceAlNum(checkOBJ.value,2,1);
    checkOBJ.value = replaceZenDash(checkOBJ.value);
    err = checkByteNum( checkOBJ, checkLen, strictFlg, 1 );
  }
  return(err);
}

/* 半角数字入力（文字列として） */
function isNumStr( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var flg=0;
  var i;
  var err=false;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceAlNum( checkOBJ.value, 1, 0 );
    for(i=0;i<2;i++){
      if(i==0){
        flg = isNumber( checkOBJ.value );
        if( flg!=1 ){
          nbError( 2 );
          checkOBJ.focus();
          checkOBJ.select();
	  err=true;
          break;
        }
      }else if(i==1){
        err=checkByteNum( checkOBJ, checkLen, strictFlg, 0 );
      }
    }
  }
  return(err);
}

/* 半角数値（整数） */
function isInteger( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var flg=0;
  var err=false;
  var i;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceAlNum( checkOBJ.value, 1, 0 );
    for(i=0;i<3;i++){
      if(i==0){
        flg = isNumber( checkOBJ.value );
        if( flg==0 ){
          if( strictFlg!=2 ) nbError( 14 );
          else nbError( 12 );
          checkOBJ.focus();
          checkOBJ.select();
	  err=true;
          break;
        }else if(flg==2){
          if( strictFlg!=2 ) nbError( 15 );
          else nbError( 12 );
          checkOBJ.focus();
          checkOBJ.select();
	  err=true;
          break;
        }
      }else if(i==1){
        checkOBJ.value=LZeroTrim(checkOBJ.value);
        if(strictFlg!=3 && checkOBJ.value=="0") checkOBJ.value="";
      }else if(i==2){
        err=checkByteNum( checkOBJ, checkLen, strictFlg, 0 );
      }
    }
  }
  return(err);
}

/* 半角数値（小数を許す） */
function isDecimal( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var flg=0;
  var i;
  var err=false;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceAlNum( checkOBJ.value, 1, 0 );
    for(i=0;i<3;i++){
      if(i==0){
        flg = isNumber( checkOBJ.value );
        if( flg==0 ){
          nbError( 3 );
          checkOBJ.focus();
          checkOBJ.select();
	  err=true;
          break;
        }
      }else if(i==1){
        checkOBJ.value=LZeroTrim(checkOBJ.value);
      }else if(i==2){
        err=checkByteNum( checkOBJ, checkLen, strictFlg, 0 );
      }
    }
  }
  return(err);
}

/* 半角英数字のみ許す入力域 */
function isNumAlpha( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var flg=0;
  var i;
  var err=false;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceAlNum( checkOBJ.value, 2, 0 );
    for(i=0;i<2;i++){
      if(i==0){
        flg = isNumAndAlpha( checkOBJ.value );
        if( flg==false ){
          nbError( 4 );
          checkOBJ.focus();
          checkOBJ.select();
	  err=true;
          break;
        }
      }else if(i==1){
        err=checkByteNum( checkOBJ, checkLen, strictFlg, 0 );
      }
    }
  }
  return(err);
}

/* 全角カナのみの入力域 */
function isKana( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var flg=0;
  var i;
  var err=false;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceHanKana( checkOBJ.value );
    for(i=0;i<2;i++){
      if(i==0){
        flg = isZenKana( checkOBJ.value );
        if( flg==false ){
          nbError( 5 );
          checkOBJ.focus();
          checkOBJ.select();
	  err=true;
          break;
        }
      }else if(i==1){
        err=checkByteNum( checkOBJ, checkLen, strictFlg, 1 );
      }
    }
  }
  return(err);
}

/* 全銀で許される文字のみの入力域（全角） */
function isZengin( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var flg=0;
  var i;
  var err=false;

  checkOBJ.value = SpaceTrimSuppress( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceHanKana( checkOBJ.value );
    checkOBJ.value = replaceAlNum(checkOBJ.value, 0, 0 )
    checkOBJ.value = replaceUpperCase(checkOBJ.value);
    checkOBJ.value = replaceAlNum( checkOBJ.value, 2, 1 );
    checkOBJ.value = replaceZenginHan( checkOBJ.value );
    checkOBJ.value = replaceZenginZen( checkOBJ.value );
    for(i=0;i<2;i++){
      if(i==0){
        flg = isZenginStr( checkOBJ.value );
        if( flg==false ){
          nbError( 6 );
          checkOBJ.focus();
          checkOBJ.select();
	  err=true;
          break;
        }
      }else if(i==1){
        err=checkByteNum( checkOBJ, checkLen, strictFlg, 1 );
      }
    }
  }
  return(err);
}

/* メールアドレスの入力域 */
function isMailAddress( checkOBJ, checkLen, strictFlg ){
  var workLen=0;
  var flg=0;
  var err=false;
  var cannotuseStr0 = ",";
  var cannotuseStr1 = "<";
  var cannotuseStr2 = ">";
  var thisChar;
  var i = 0;
  var cnt = 0;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceAlNum( checkOBJ.value, 2, 0 );

    for(i=0;i<checkOBJ.value.length;i++) {
      thisChar = checkOBJ.value.substring(i,i+1);
      if ((cannotuseStr0.indexOf(thisChar) != -1) || (cannotuseStr1.indexOf(thisChar) != -1) || (cannotuseStr2.indexOf(thisChar) != -1)){
        cnt=1;
        break;
      }
    }
    if (cnt == 0)
      err=false;
    else{
      alert("メールアドレスに使用できない文字が含まれています。");
      checkOBJ.focus();
      checkOBJ.select();
      err=true;
    }

    if(err==false) err=checkByteNum( checkOBJ, checkLen, strictFlg, 0 );
  }
  return(err);
}

/* メールアドレスの入力域(JavaMail用メールアドレスチェック) */
function isJavaMailAddress( checkOBJ, checkLen, strictFlg ) {
  var err=false;
  var regExp_local = new RegExp("^[a-zA-Z0-9!$%\\*\\+\\-\\./=\\?^_`~\\{\\}]+$");
  var regExp_domain = new RegExp("^[a-zA-Z0-9\\-\\.]+$");
  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if (checkOBJ.value.length > 0) {
    try {
      checkOBJ.value = replaceAlNum( checkOBJ.value, 2, 0 );
      var array = checkOBJ.value.split("@");
      if (array.length != 2) {
        throw new Error();
      }
      if (-1 == checkOBJ.value.indexOf(".")) {
        throw new Error();
      }
      var localMailAdress = array[0];
      var domainMailAdress = array[1];
      if (null == localMailAdress.match(regExp_local)) {
        throw new Error();
      }
      if (null == domainMailAdress.match(regExp_domain)) {
        throw new Error();
      }
      if (0 == domainMailAdress.indexOf("-") || domainMailAdress.lastIndexOf("-") == (domainMailAdress.length - 1)) {
        throw new Error();
      }
      if (0 == domainMailAdress.indexOf(".") || domainMailAdress.lastIndexOf(".") == (domainMailAdress.length - 1)) {
        throw new Error();
      }
      if (-1 != domainMailAdress.indexOf("..")) {
        throw new Error();
      }
      err=checkByteNum( checkOBJ, checkLen, strictFlg, 0 );
    } catch(e) {
      err=true;
      alert("メールアドレスを正しく入力してください。");
      checkOBJ.focus();
      checkOBJ.select();
    }
  }
  return(err);
}

function CommaSuppress(checkOBJ) {
  var i = 0;
  var setchar;
  var convstr = "";

  for(i=0;i<checkOBJ.value.length;i++) {
    chkchar = checkOBJ.value.charAt(i);
    if (chkchar != ",") {
    	convstr = convstr + chkchar;
    }
  }
  checkOBJ.value = convstr;
}

function CommaIn( checkOBJ, checkLen, strictFlg ) {
  var workLen=0;
  var mod;
  var i;
  var dum;
  var NextP;
  var lop;
  var err;

  CommaSuppress(checkOBJ);
  err=isInteger(checkOBJ,checkLen,strictFlg);
  if (err==true) return;
  workLen = checkOBJ.value.length;
  if (workLen > 3) {
	mod = workLen-parseInt(workLen/3)*3;
	if (mod == 0) {
	  mod = 3;
	}
	lop = parseInt(workLen/3);
	if (mod != 3) lop = lop + 1 ;
	for(i=0;i<lop;i++){
		if (i==0) {
			dum = checkOBJ.value.substring(0,mod);
			dum = dum + ",";
			NextP = mod;
		} else {
			dum = dum + checkOBJ.value.substring(NextP,NextP+3);
			if ( i != lop-1) { 
				dum = dum + ",";
				NextP = NextP+3;
			}
		}
		
	}
	checkOBJ.value = dum;
  }
}

/* 半角英数字許す入力域（英字表記対応） */
function isNumAlphaEng( checkOBJ, checkLen, strictFlg ) {
  var flg=0;
  var i;
  var err=false;

  checkOBJ.value = SpaceTrim( checkOBJ.value );
  if(checkOBJ.value.length>0){
    checkOBJ.value = replaceAlNum( checkOBJ.value, 2, 0 );
    checkOBJ.value = replaceEngZen( checkOBJ.value, 0 );
    for(i=0;i<2;i++){
      if(i==0){
        flg = isNumAndAlphaEng( checkOBJ.value );
        if( flg==false ){
          nbError( 4 );
          checkOBJ.focus();
          checkOBJ.select();
          err=true;
          break;
        }
      }else if(i==1){
        err=checkByteNum( checkOBJ, checkLen, strictFlg, 0 );
      }
    }
  }
  return(err);
}
