/* 指定文字列からの左側半角 0（ゼロ）除去 */
/* 小数の場合は０をひとつ残す             */
/* 引数　：対象文字列（整数又は小数限定） */
/* 戻り値：左側半角 0（ゼロ）が除去された文字列 */
function LZeroTrim(nowstr) {
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var setFlg = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar;
  var convstr = "";

  for(i=0;i<nowstr.length;i++) {
    chkchar = nowstr.charAt(i);
    EscapeChar = escape(nowstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      setFlg = 1;
      convstr = convstr + chkchar;
      continue;
    }
    if (EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U") {
      if (nowstr.charAt(i) >= "｡" && nowstr.charAt(i) <= "ﾟ") {
        setFlg = 1;
      }
    } else {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(nowstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    if (setFlg == 0 && setchar != "0") {
      setFlg = 1;
    }
    if (setFlg == 1) {
      convstr = convstr + setchar;
    }
  }
  if(convstr.charAt(0)==".") convstr="0"+convstr;
  if(convstr=="") convstr="0";
  return(convstr);
}

/* 指定文字列から前後の空白文字列除去         */
/* 引数　：対象文字列                         */
/* 戻り値：前後の空白文字列が除去された文字列 */
function SpaceTrim(nowstr) {
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var setFlg = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var workstr = "";
  var setchar;
  var convstr = "";

  for(i=0;i<nowstr.length;i++) {
    chkchar = nowstr.charAt(i);
    EscapeChar = escape(nowstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      setFlg = 2;
      convstr = convstr + chkchar;
      workstr = workstr + chkchar;
      continue;
    }
    if (EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U") {
      if (nowstr.charAt(i) >= "｡" && nowstr.charAt(i) <= "ﾟ") {
        setFlg = 1;
      }
    } else {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(nowstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    if (setFlg == 0) {
      if (!(setchar == " " || setchar == "　")) {
        setFlg = 2;
      }
    } else {
      if (setchar == " " || setchar == "　") {
        setFlg = 1;
      } else {
        setFlg = 2;
      }
    }
    if (setFlg > 0) {
      if (setFlg == 2) {
        workstr = workstr + setchar;
        convstr = workstr;
      } else {
        workstr = workstr + setchar;
      }
    }
  }
  return(convstr);
}

/* 指定文字列中の全角英数字文字を半角英数字文字に変換、または、         */
/*               半角英数字文字を全角英数字文字に変換                   */
/* 引数　：変換対象文字列,変換対象フラグ,変換種類                       */
/*         変換対象フラグ 0：英字のみ変換                               */
/*                        1：数字のみ変換                               */
/*                        2：英数字両方変換                             */
/*         変換種類 0：全角を半角へ変換                                 */
/*                  1：半角を全角へ変換                                 */
/* 戻り値：変換された文字列                                             */
/* ※ ・変換される文字は、次の文字とする。                              */
/*      abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@_-0123456789. */
function replaceAlNum(orgstr,convtarget,convsw) {
  var alphatbl1 = new Array("ａ","ｂ","ｃ","ｄ","ｅ","ｆ","ｇ","ｈ","ｉ","ｊ","ｋ","ｌ","ｍ",
                            "ｎ","ｏ","ｐ","ｑ","ｒ","ｓ","ｔ","ｕ","ｖ","ｗ","ｘ","ｙ","ｚ",
                            "Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ","Ｋ","Ｌ","Ｍ",
                            "Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ","Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ",
                            "＠","＿","−");
  var alphatbl2 = new Array("a","b","c","d","e","f","g","h","i","j","k","l","m",
                            "n","o","p","q","r","s","t","u","v","w","x","y","z",
                            "A","B","C","D","E","F","G","H","I","J","K","L","M",
                            "N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
                            "@","_","-");
  var numtbl1   = new Array("０","１","２","３","４","５","６","７","８","９","．");
  var numtbl2   = new Array("0","1","2","3","4","5","6","7","8","9",".");
  var tblnum1 = 55;
  var tblnum2 = 11;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";
  var setPos = -1;

  if (convtarget < 0 || convtarget > 2) {
    return(orgstr);
  }
  if (convsw < 0 || convsw > 1) {
    return(orgstr);
  }

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    setPos = -1;
    if (convsw == 1) {
      if (convtarget == 0 || convtarget == 2) {
        for(j=0;j<tblnum1;j++) {
          if (alphatbl2[j] == setchar) {
            setPos = j;
            setchar = alphatbl1[j];
            break;
          }
        }
      }
      if (setPos == -1) {
        if (convtarget == 1 || convtarget == 2) {
          for(j=0;j<tblnum2;j++) {
            if (numtbl2[j] == setchar) {
              setPos = j;
              setchar = numtbl1[j];
              break;
            }
          }
        }
      }
    } else {
      if (convtarget == 0 || convtarget == 2) {
        for(j=0;j<tblnum1;j++) {
          if (alphatbl1[j] == setchar) {
            setPos = j;
            setchar = alphatbl2[j];
            break;
          }
        }
      }
      if (setPos == -1) {
        if (convtarget == 1 || convtarget == 2) {
          for(j=0;j<tblnum2;j++) {
            if (numtbl1[j] == setchar) {
              setPos = j;
              setchar = numtbl2[j];
              break;
            }
          }
        }
      }
    }
    convstr = convstr + setchar;
  }

  return(convstr);
}

/* 指定文字列中の半角英小文字を半角英大文字に変換 */
/* 引数　：変換対象文字列                         */
/* 戻り値：変換された文字列                       */
/* ※ ・変換される文字は、次の半角文字とする。    */
/*      abcdefghijklmnopqrstuvwxyz                */
function replaceUpperCase(orgstr) {
  var fromtbl1 = new Array("a","b","c","d","e","f","g","h","i","j",
                           "k","l","m","n","o","p","q","r","s","t",
                           "u","v","w","x","y","z");
  var totbl1 = new Array("A","B","C","D","E","F","G","H","I","J",
                         "K","L","M","N","O","P","Q","R","S","T",
                         "U","V","W","X","Y","Z");
  var tblnum1 = 26;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    for(j=0;j<tblnum1;j++) {
      if (fromtbl1[j] == setchar) {
        setchar = totbl1[j];
        break;
      }
    }
    convstr = convstr + setchar;
  }

  return(convstr);
}

/* 指定文字列中の特定の半角英数字文字を全角英数字文字に変換 */
/* 引数　：変換対象文字列                                   */
/* 戻り値：変換された文字列                                 */
/* ※ ・変換される文字は、次の半角文字とする。              */
/*      ()\,/-(半角スペース)                                */
function replaceZenginHan(orgstr) {
  var fromtbl1 = new Array("(",")","\\",",","/","-"," ");
  var totbl1 = new Array("（","）","￥","，","／","−","　");
  var tblnum1 = 7;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    for(j=0;j<tblnum1;j++) {
      if (fromtbl1[j] == setchar) {
        setchar = totbl1[j];
        break;
      }
    }
    convstr = convstr + setchar;
  }

  return(convstr);
}

/* 指定文字列中の特定の全角文字を全銀使用可能全角文字に変換 */
/* 引数　：変換対象文字列                                   */
/* 戻り値：変換された文字列                                 */
/* ※ ・変換される文字は、次の半角文字とする。              */
/*      ー―。、ァィゥェォヵヶッャュョヮ                    */
function replaceZenginZen(orgstr) {
  var fromtbl1 = new Array("‐","ー","―","。","、","ァ","ィ","ゥ","ェ","ォ",
                           "ヵ","ヶ","ッ","ャ","ュ","ョ","ヮ","°");
  var totbl1 = new Array("−","−","−","．","，","ア","イ","ウ","エ","オ",
                         "カ","ケ","ツ","ヤ","ユ","ヨ","ワ","゜");
  var tblnum1 = 18;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    for(j=0;j<tblnum1;j++) {
      if (fromtbl1[j] == setchar) {
        setchar = totbl1[j];
        break;
      }
    }
    convstr = convstr + setchar;
  }

  return(convstr);
}

/* 指定文字列中の半角カナ文字を全角カナ文字に変換                       */
/* 引数　：変換対象文字列                                               */
/* 戻り値：変換された文字列                                             */
/* ※ ・変換される文字は、シフトJISの0xA1〜0xDFコードと半角空白0x0020   */
/*      ｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ */
function replaceHanKana(nowstr) {
  var dchktbl =     new Array("ハ","ヒ","フ","ヘ","ホ");
  var zendtbl1 =    new Array("ヴ","ガ","ギ","グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ",
                              "ダ","ヂ","ヅ","デ","ド","バ","ビ","ブ","ベ","ボ");
  var zendtbl2 =    new Array("パ","ピ","プ","ペ","ポ");
  var kanatbl1 =    new Array("ｦ","ｧ","ｨ","ｩ","ｪ","ｫ","ｬ","ｭ","ｮ","ｯ",
                              "ｱ","ｲ","ｴ","ｵ","ﾅ","ﾆ","ﾇ","ﾈ","ﾉ",
                              "ﾏ","ﾐ","ﾑ","ﾒ","ﾓ","ﾔ","ﾕ","ﾖ","ﾗ","ﾘ",
                              "ﾙ","ﾚ","ﾛ","ﾜ","ﾝ","｡","｢","｣","､","･","ｰ"," ");
  var kanatbl2 =    new Array("ｳ","ｶ","ｷ","ｸ","ｹ","ｺ","ｻ","ｼ","ｽ","ｾ","ｿ",
                              "ﾀ","ﾁ","ﾂ","ﾃ","ﾄ","ﾊ","ﾋ","ﾌ","ﾍ","ﾎ");
  var zenkanatbl1 = new Array("ヲ","ァ","ィ","ゥ","ェ","ォ","ャ","ュ","ョ","ッ",
                              "ア","イ","エ","オ","ナ","ニ","ヌ","ネ","ノ",
                              "マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ",
                              "ル","レ","ロ","ワ","ン","。","「","」","、","・","ー","　");
  var zenkanatbl2 = new Array("ウ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ",
                              "タ","チ","ツ","テ","ト","ハ","ヒ","フ","ヘ","ホ");
  var kanatblnum1 = 41;
  var kanatblnum2 = 21;
  var dchktblnum1 = 21;
  var dchktblnum2 = 5;
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var setFlg = 0;
  var setPos = -1;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar;
  var wrkchar;
  var presetchar = "";
  var convstr = "";

  for(i=0;i<nowstr.length;i++) {
    chkchar = nowstr.charAt(i);
    EscapeChar = escape(nowstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      if (presetchar != "") {
        convstr = convstr + presetchar;
        presetchar = "";
      }
      convstr = convstr + chkchar;
      presetchar = "";
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(nowstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    setPos = -1;
    for(j=0;j<kanatblnum1;j++) {
      if (kanatbl1[j] == setchar) {
        setPos = j;
        setchar = presetchar + zenkanatbl1[j];
        setFlg = 0;
        break;
      }
    }
    if (setPos == -1) {
      for(j=0;j<kanatblnum2;j++) {
        if (kanatbl2[j] == setchar) {
          setPos = j;
          if (presetchar != "") {
            convstr = convstr + presetchar
          }
          presetchar = zenkanatbl2[j];
          setFlg = 1;
          break;
        }
      }
    }
    if (setPos == -1) {
      if (setchar == "ﾞ") {
        for(j=0;j<dchktblnum1;j++) {
          if (presetchar == zenkanatbl2[j]) {
            setPos = j;
            setchar = zendtbl1[j];
            setFlg = 0;
            break;
          }
        }
        if (setPos == -1) {
          setchar = presetchar + "゛";
          setFlg = 0;
        }
      } else if (setchar == "ﾟ") {
        for(j=0;j<dchktblnum2;j++) {
          if (presetchar == dchktbl[j]) {
            setPos = j;
            setchar = zendtbl2[j];
            setFlg = 0;
            break;
          }
        }
        if (setPos == -1) {
          setchar = presetchar + "゜";
          setFlg = 0;
        }
      } else {
        setFlg = 0;
        wrkchar = presetchar + setchar;
        setchar = wrkchar;
      }
    }
    if (setFlg == 0) {
      convstr = convstr + setchar;
      presetchar = "";
    }
  }
  if (presetchar != "") {
    convstr = convstr + presetchar;
  }
  return(convstr);
}

/* 指定文字列の空チェック(空白文字のみも空とみなす) */
/* 引数　：確認文字列                               */
/* 戻り値：空 or 空白文字列 = true                  */
/*         文字列あり       = false                 */
function isEmpty(data) {
  var i = 0;
  var wrkstr = "";
  wrkstr = SpaceTrim(data);
  for(i=0;i<wrkstr.length;i++) {
    if (wrkstr.substring(i,i+1) != " ") {
         return(false);
    }
  }
  return(true);
}

/* 指定文字列全ての半角英字チェック         */
/* 引数　：確認文字列                       */
/* 戻り値：半角英字文字列           = true  */
/*         半角英字以外の文字を含む = false */
/* ※ 半角英字はa〜z,A〜Zのみを確認する     */
function isAlpha(data) {
  var alphaStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var thisChar;
  var i = 0;
  var cnt = 0;
  for(i=0;i<data.length;i++) {
    thisChar = data.substring(i,i+1);
    if (alphaStr.indexOf(thisChar) != -1)
      cnt++;
  }
  if (cnt == 0)
    return(false);
  else if (cnt == data.length)
    return(true);
  else
    return(false);
}

/* 指定文字列全ての半角英数字チェック         */
/* 引数　：確認文字列                         */
/* 戻り値：半角英数字文字列           = true  */
/*         半角英数字以外の文字を含む = false */
/* ※ 半角数英字はa〜z,A〜Z,0〜9を確認する    */
function isNumAndAlpha(data) {
  var numalphaStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var thisChar;
  var i = 0;
  var cnt = 0;
  for(i=0;i<data.length;i++) {
    thisChar = data.substring(i,i+1);
    if (numalphaStr.indexOf(thisChar) != -1)
      cnt++;
  }
  if (cnt == 0)
    return(false);
  else if (cnt == data.length)
    return(true);
  else
    return(false);
}

/* 指定文字列全ての全角カナチェック         */
/* 引数　：確認文字列                       */
/* 戻り値：全角カナ文字列           = true  */
/*         全角カナ以外の文字を含む = false */
function isZenKana(orgstr) {
  var tbl1 = new Array("ア","ァ","イ","ィ","ウ","ゥ","エ","ェ","オ","ォ",
                       "カ","ヵ","キ","ク","ケ","ヶ","コ","サ","シ","ス",
                       "セ","ソ","タ","チ","ツ","ッ","テ","ト","ナ","ニ",
                       "ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ",
                       "ム","メ","モ","ヤ","ャ","ユ","ュ","ヨ","ョ","ラ",
                       "リ","ル","レ","ロ","ワ","ヮ","ヲ","ン","ガ","ギ",
                       "グ","ゲ","ゴ","ザ","ジ","ズ","ゼ","ゾ","ダ","ヂ",
                       "ヅ","デ","ド","バ","ビ","ブ","ベ","ボ","ヴ","パ",
                       "ピ","プ","ペ","ポ","ヰ","ヱ","ー");
  var tblnum1 = 87;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";
  var existFlg = 0;

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    for(j=0;j<tblnum1;j++) {
      if (setchar == tbl1[j]) break;
    }
    if( j==tblnum1 ){
      existFlg = 1;
      break;
    }
    convstr = convstr + setchar;
  }
  if (existFlg == 1)
    return(false);
  else
    return(true);
}

/* 指定文字列全ての全銀文字チェック（全角） */
/* 引数　：確認文字列                       */
/* 戻り値：全銀使用可能文字列       = true  */
/*         全銀使用不可文字列を含む = false */
function isZenginStr(orgstr) {
  var tbl1 = new Array("　","，","．","−","／","（","）","「","」","￥",
                       "０","１","２","３","４","５","６","７","８","９",
                       "Ａ","Ｂ","Ｃ","Ｄ","Ｅ","Ｆ","Ｇ","Ｈ","Ｉ","Ｊ",
                       "Ｋ","Ｌ","Ｍ","Ｎ","Ｏ","Ｐ","Ｑ","Ｒ","Ｓ","Ｔ",
                       "Ｕ","Ｖ","Ｗ","Ｘ","Ｙ","Ｚ","ア","イ","ウ","エ",
                       "オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ",
                       "ソ","タ","チ","ツ","テ","ト","ナ","ニ","ヌ","ネ",
                       "ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ",
                       "モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ",
                       "ヲ","ン","ヴ","ガ","ギ","グ","ゲ","ゴ","ザ","ジ",
                       "ズ","ゼ","ゾ","ダ","ヂ","ヅ","デ","ド","バ","ビ",
                       "ブ","ベ","ボ","パ","ピ","プ","ペ","ポ","゜","゛");
  var tblnum1 = 120;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";
  var existFlg = 0;

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    for(j=0;j<tblnum1;j++) {
      if (setchar == tbl1[j]) break;
    }
    if( j==tblnum1 ){
      existFlg = 1;
      break;
    }
    convstr = convstr + setchar;
  }
  if (existFlg == 1)
    return(false);
  else
    return(true);
}

/* 指定文字列の数値利用可能チェック           */
/* 引数　：確認文字列                         */
/* 戻り値：数値利用不可               = 0     */
/*         数値利用可(整数)           = 1     */
/*         数値利用可(小数点以下あり) = 2     */
/* ※ ・半角数値のみを扱う。                  */
/*    ・".01"は"0.01"、"124."は"124.0"とする。*/
function isNumber(data) {
  var numStr = ".0123456789";
  var thisChar;
  var decimalpos = -1;
  var decimalcnt = 0;
  var ret = 0;
  var i = 0;
  var cnt = 0;
  for(i=0;i<data.length;i++) {
    thisChar = data.substring(i,i+1);
    if (numStr.indexOf(thisChar) != -1) {
      cnt++;
      if (thisChar == ".") {
        decimalcnt++;
        decimalpos = i;
      }
    }
  }
  if (cnt == 0) {
    cnt == -1;
  } else if (cnt == data.length) {
    ret = 1;
    if (decimalcnt >= 1) {
      if (decimalcnt == 1 && (decimalpos >= 0 && decimalpos < cnt)) {
        ret = 2;
      } else {
        ret = 0;
      }
    }
  }
  return(ret);
}

/* 指定文字列中に半角カナ文字を含むかどうかを確認 */
/* 引数　：確認文字列                             */
/* 戻り値：半角カナ文字を含む     = true          */
/*         半角カナ文字を含まない = false         */
function isContainKana(orgstr) {
  var tbl1 = new Array("ｦ","ｧ","ｨ","ｩ","ｪ","ｫ","ｬ","ｭ","ｮ","ｯ",
                       "ｱ","ｲ","ｴ","ｵ","ﾅ","ﾆ","ﾇ","ﾈ","ﾉ","ﾏ",
                       "ﾐ","ﾑ","ﾒ","ﾓ","ﾔ","ﾕ","ﾖ","ﾗ","ﾘ","ﾙ",
                       "ﾚ","ﾛ","ﾜ","ﾝ","｡","｢","｣","､","･","ｰ",
                       "ｳ","ｶ","ｷ","ｸ","ｹ","ｺ","ｻ","ｼ","ｽ","ｾ",
                       "ｿ","ﾀ","ﾁ","ﾂ","ﾃ","ﾄ","ﾊ","ﾋ","ﾌ","ﾍ",
                       "ﾎ","ﾞ","ﾟ");
  var tblnum1 = 63;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";
  var existFlg = 0;

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    for(j=0;j<tblnum1;j++) {
      if (setchar == tbl1[j]) break;
    }
    if( j!=tblnum1 ){
      existFlg = 1;
      break;
    }
    convstr = convstr + setchar;
  }
  if (existFlg == 1)
    return(true);
  else
    return(false);
}

/* 指定文字列長検査                                    */
/* 引数　：検査対象文字列                              */
/* 戻り値：文字列長                                    */
/* ※ ・全角は2文字として判断。                        */
/*    ・半角カナ文字は1文字として判断。                */
/*    ・改行(OD),復帰(0A)はそれぞれ1文字としてカウント */
function getStrLen(checkstr) {
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var len = 0;
  var EscapeChar;
  var Code16Char;

  len = 0;
  for(i=0;i<checkstr.length;i++) {
    EscapeChar = escape(checkstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      len++;
      continue;
    }
    if (EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U") {
      if (checkstr.charAt(i) >= "｡" && checkstr.charAt(i) <= "ﾟ") {
        len++;
      } else {
        len += 2;
      }
    } else {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(checkstr.charAt(i+1));
          i++;
        }
        len += 2;
      } else {
        len++;
      }
    }
  }
  return(len);
}

/* 指定年月の末日を取得            */
/* 引数　：年(数値),月(数値:1〜12) */
/* 戻り値：末日(エラー時:-1)       */
function getLastDate(year,month) {
  var datetable = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
  var lastdate = -1;
  if (year > 0) {
    if (month >= 1 && month <= 12) {
      lastdate = datetable[month-1];
      if (month == 2) {
        if ((year % 4) == 0) {
          lastdate = 29;
        }
        if ((year % 100) == 0) {
          lastdate = 28;
        }
        if ((year % 400) == 0) {
          lastdate = 29;
        }
      }
    }
  }
  return(lastdate);
}

/* 指定年月日のチェック               */
/* 引数　：年(数値),月(数値),日(数値) */
/* 戻り値：年月日は正しい = true      */
/*         年月日は誤り   = false     */
function isDate(year,month,day) {
  var checkflg = 0;
  var lastdate = 0;
  if ((year <= 0) || (month < 1 || month > 12)) {
    checkflg = 1;
  } else {
    lastdate = getLastDate(year,month);
    if (day < 1 || day > lastdate)
      checkflg = 1;
  }
  if (checkflg == 1)
    return(false);
  else
    return(true);
}


/* Radioボタン,checkboxのチェック             */
/* 引数　：オブジェクト(NAMEまで指定)  　　　 */
/* 戻り値：チェックなし 　= true              */
/*         チェック済　   = false             */
function isNonChecked(ChkObj) {
  var checkflg = 0;

  ObjLength = ChkObj.length;

  //オブジェクトの要素が１つの場合、ChkObj.length はundifinedになる
  if (ObjLength > 0){
    for(i=0;i<ObjLength;i++) {
      if (ChkObj[i].checked == true) {
        checkflg = 1
      }
    }
  }
  else{
    if (ChkObj.checked == true) {
      checkflg = 1
    }
  }

  if (checkflg == 1)
    return(false);
  else
    return(true);
}

/* selectのチェック                           */
/* 引数　：オブジェクト(NAMEまで指定)  　　　 */
/* 戻り値：選択項目は有効 = true              */
/*         選択項目はNULL = false             */
function isNonSelected(ChkObj) {

  if (ChkObj[ChkObj.selectedIndex].value == "")
    return(true);
  else
    return(false);
}


/* 指定文字列から前後の空白文字列除去         */
/* 指定文字列中の連続する空白文字列をひとつにまとめる         */
/* 引数　：対象文字列                         */
/* 戻り値：前後の空白文字列が除去された文字列 */
function SpaceTrimSuppress(nowstr) {
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var setFlg = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var workstr = "";
  var setchar;
  var convstr = "";

  for(i=0;i<nowstr.length;i++) {
    chkchar = nowstr.charAt(i);
    EscapeChar = escape(nowstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      setFlg = 2;
      convstr = convstr + chkchar;
      workstr = workstr + chkchar;
      continue;
    }
    if (EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U") {
      if (nowstr.charAt(i) >= "｡" && nowstr.charAt(i) <= "ﾟ") {
        setFlg = 1;
      }
    } else {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(nowstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    if (setFlg == 0) {
      if (!(setchar == " " || setchar == "　")) {
        setFlg = 2;
      }
    } else {
      if (setchar == " " || setchar == "　") {
        setFlg = 3;
      } else {
        setFlg = 2;
      }
    }
    if (setFlg > 0) {
      if (setFlg == 2) {
        workstr = workstr + setchar;
        convstr = workstr;
      } else {
	if (setFlg == 3) {
		if (!(workstr.charAt(workstr.length-1) == " " || workstr.charAt(workstr.length-1) == "　")) {
		        workstr = workstr + setchar;
		}
	}
      }
    }
  }
  return(convstr);
}

/* 指定文字列中の変換対象文字を「−」（全角マイナス、Shift_JISコード：0x817c）に変換 */
/* 変換対象文字                                                                      */
/* 「―」（ダッシュ、Shift_JISコード：0x815c）                                       */
/* 「‐」（全角ハイフン、Shift_JISコード：0x815d）                                   */
/* 引数　：変換対象文字列                                                            */
/* 戻り値：変換された文字列                                                          */
function replaceZenDash(orgstr) {
  var fromtbl1 = new Array("‐","―");
  var totbl1 = new Array("−","−");
  var tblnum1 = 2;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    for(j=0;j<tblnum1;j++) {
      if (fromtbl1[j] == setchar) {
        setchar = totbl1[j];
        break;
      }
    }
    convstr = convstr + setchar;
  }

  return(convstr);
}

/* 指定文字列中の特定の全角英数字文字を半角英数字文字に変換 */
/* 引数　：変換対象文字列                                   */
/*         変換種類 0：全角を半角へ変換                     */
/*                  1：半角を全角へ変換                     */
/* 戻り値：変換された文字列                                 */
/* ※ 変換される文字は、次の全角文字とする。                */
/*      ！＃＄％＆’＊＋−／＝？＾＿‘｛｜｝〜＠。「」、・ー．（），(全角スペース)  */
/*      !#$%&'*+-/=?^_`{|}~@｡｢｣､･ｰ.(),(半角スペース)        */
function replaceEngZen(orgstr, convsw) {
  var zentbl = new Array("！","＃","＄","％","＆","’","＊","＋","−","／","＝","？","＾","＿","‘","｛","｜","｝",
		  "〜","＠","。","「","」","、","・","ー","．","（","）","，","　");
  var hantbl = new Array("!","#","$","%","&","'","*","+","-","/","=","?","^","_","`","{","|","}",
		  "~","@","｡","｢","｣","､","･","ｰ",".","(",")",","," ");
  var tblnum1 = 31;
  var convstr = "";
  var i = 0;
  var j = 0;
  var checkFlg = 0;
  var codecnt = 0;
  var EscapeChar;
  var Code16Char;
  var chkchar;
  var setchar = "";

  if (convsw < 0 || convsw > 1) {
    return(orgstr);
  }

  for(i=0;i<orgstr.length;i++) {
    chkchar = orgstr.charAt(i);
    EscapeChar = escape(orgstr.charAt(i));
    if (EscapeChar=="%0D" || EscapeChar=="%0A") {
      convstr = convstr + chkchar;
      continue;
    }
    if (!(EscapeChar.charAt(1) == "u" || EscapeChar.charAt(1) == "U")) {
      Code16Char = parseInt(EscapeChar.charAt(1),16);
      if ((Code16Char == 8) || (Code16Char == 9) || (Code16Char == 14) || (Code16Char == 15)) {
        checkFlg = 0;
        codecnt = 0;
        for(j=0;j<EscapeChar.length;j++) {
          if (EscapeChar.charAt(j) == "%") {
            codecnt = 0;
            checkFlg++;
          } else {
            codecnt++;
          }
        }
        if (checkFlg == 1 && codecnt <= 2) {
          EscapeChar = EscapeChar + escape(orgstr.charAt(i+1));
          i++;
        }
      }
    }
    if (chkchar != "?" && unescape(EscapeChar) == "?") {
      setchar = chkchar;
    } else {
      setchar = unescape(EscapeChar);
    }
    if (convsw == 0) {
      for(j=0;j<tblnum1;j++) {
        if (zentbl[j] == setchar) {
           setchar = hantbl[j];
           break;
        }
      }
    } else {
        for(j=0;j<tblnum1;j++) {
          if (hantbl[j] == setchar) {
            setchar = zentbl[j];
            break;
          }
        }
    }
    convstr = convstr + setchar;
  }

  return(convstr);
}

/* 指定文字列英数字、記号チェック（半角） */
/* 引数　：確認文字列                     */
/* 戻り値：使用可能文字列       = true    */
/*       使用不可文字列を含む = false */
function isNumAndAlphaEng(orgstr) {
  var numalphaStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~ ";
  var thisChar;
  var i = 0;
  var cnt = 0;
  for(i=0;i<orgstr.length;i++) {
    thisChar = orgstr.substring(i,i+1);
    if (numalphaStr.indexOf(thisChar) != -1)
      cnt++;
  }
  if (cnt == 0)
    return(false);
  else if (cnt == orgstr.length)
    return(true);
  else
    return(false);
}
