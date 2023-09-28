/**
 * エラーメッセージ
 */
 var errorMessage = {

  /**
   * 「h1」タグの次の行に表示
   * @param h1Id				「h1」タグのID
   * @param errDispNodeId		エラー出力対象タグのID
   */
  h1NextLine: function(h1Id, errDispNodeId) {

    /**
     * 「h1」タグのID
     */
    this.h1Id = h1Id;

    /**
     * エラー出力対象タグのID
     */
    this.errDispNodeId = errDispNodeId;

    /**
     * 消去
     */
    this.clear = function() {
      var errDispNode = document.getElementById(this.errDispNodeId);
      if (errDispNode) {
        errDispNode.parentNode.removeChild(errDispNode);
      }
    };

    /**
     * 表示
     * @param addErrMsg		追加するメッセージ
     */
    this.add = function(addErrMsg) {
      var errDispNode = document.getElementById(this.errDispNodeId);
      if (errDispNode) {
        errDispNode.innerHTML += '<br/>';
      } else {
        errDispNode = document.createElement('div');
        errDispNode.id = this.errDispNodeId;
        var h1Node = document.getElementById(this.h1Id);
        h1Node.parentNode.insertBefore(errDispNode, h1Node.nextSibling);
      }
      errDispNode.innerHTML += addErrMsg;
      window.scroll(0, 0);
    };

  },

  /**
   * 「descriptクラスのdiv」タグの最初の子タグに表示
   * @param errDispNodeId		エラー出力対象タグのID
   */
  descriptDivFirstChild: function(errDispNodeId) {

    /**
     * エラー出力対象タグのID
     */
    this.errDispNodeId = errDispNodeId;

    /**
     * 消去
     */
    this.clear = function() {
      var errDispNode = document.getElementById(this.errDispNodeId);
      if (errDispNode) {
        errDispNode.parentNode.removeChild(errDispNode);
      }
    };

    /**
     * 表示
     * @param addErrMsg		追加するメッセージ
     */
    this.add = function(addErrMsg) {
      var errDispNode = document.getElementById(this.errDispNodeId);
      if (errDispNode) {
        errDispNode.innerHTML += '<br/>';
      } else {
        errDispNode = document.createElement('div');
        errDispNode.id = this.errDispNodeId;
        var divElements = document.getElementsByTagName('div');
        for (var i = 0; i < divElements.length; i++) {
          if ('descript' === divElements[i].className) {
            if (divElements[i].firstChild) {
              divElements[i].insertBefore(errDispNode, divElements[i].firstChild);
            } else {
              divElements[i].appendChild(errDispNode);
            }
            break;
          }
        }
      }
      errDispNode.innerHTML += addErrMsg;
      window.scroll(0, 0);
    };

  }

};

/**
 * latte用値チェック
 */
var latteValidator = {

  /**
   * 値チェックエラーの出力
   */
  addMsg: {

    /**
     * 必須エラーを出力
     * @param errMsg		エラーメッセージ出力オブジェクト
     * @param itemName		項目名（和名）
     */
    requiredError: function(errMsg, itemName) {
      errMsg.add(itemName + 'が設定されていません。');
    },

    /**
     * 不正エラー（必須エラー以外）を出力
     * @param errMsg		エラーメッセージ出力オブジェクト
     * @param itemName		項目名（和名）
     */
    invalidError: function(errMsg, itemName) {
      errMsg.add(itemName + 'に使用できない文字が入力されています。<br />入力内容をお確かめのうえ、再度入力してください。');
    },

    /**
     * 必須エラー（必須エラー以外）を出力
     * @param errMsg		エラーメッセージ出力オブジェクト
     * @param itemName		項目名（和名）
     */
    requiredError2: function(errMsg, itemName) {
      errMsg.add(itemName + 'を設定してください。');
    },

    /**
     * au IDとパスワードが同じエラーを出力
     * @param errMsg		エラーメッセージ出力オブジェクト
     * @param itemName		項目名（和名）
     */
    sameError: function(errMsg, itemName) {
      errMsg.add('au IDとパスワードは同じものを設定できません。異なるau IDとパスワードを入力してください。');
    },

    /**
     * 2つの値が一致しないエラーを出力
     * @param errMsg		エラーメッセージ出力オブジェクト
     * @param itemName1		項目名1（和名）
     * @param itemName2		項目名2（和名）
     */
    mismatchError: function(errMsg, itemName1, itemName2) {
      errMsg.add('入力された' + itemName1 + 'と' + itemName2 + 'が一致しません｡入力内容をご確認ください。');
    },

    emailError: function(errMsg, itemName) {
      errMsg.add('連絡先メールアドレスに使用できない文字が入力されているか、正しいメールアドレスではありません。<br />※携帯電話のメールアドレスは入力することができません。<br />　別のメールアドレスを入力してください。');
    },

    rangeError: function(errMsg, itemName, minLabel, maxLabel) {
      errMsg.add(itemName + 'に、使用できない文字が入力されているか、入力された文字数が不足しています。<br />入力内容をお確かめのうえ、' + minLabel + 'から' + maxLabel + 'の範囲で再度入力してください。');
    },

    fixlengthError: function(errMsg, itemName, fixLabel) {
      errMsg.add(itemName + 'に、使用できない文字が入力されているか、入力された文字数が不足しています。<br />入力内容をお確かめのうえ、' + fixLabel + 'で再度入力してください。');
    },

    spaceError: function(errMsg) {
      errMsg.add('ローマ字氏名の入力に誤りがあります。入力内容をお確かめのうえ、再度入力してください。<br />＜ローマ字氏名入力にあたって＞<br />・「名」・「姓」の順に、「名」と「姓」間に半角スペースを入力してください。<br />・全角文字や数字は入力できません。半角英字大文字で入力し直してください<br />・先頭にスペースや連続したスペースは入力できません。<br />・端末によっては、アルファベット入力後に自動で半角スペースが入るものがあります。');
    },

    pNoError: function(errMsg) {
      errMsg.add('コードは半角英数字16桁で入力してください。');
    },

    noChoiceError: function(errMsg, itemName) {
      errMsg.add(itemName + 'が選択されていません。');
    }
  },

  /**
   * 文字列チェック
   * @return					正常値である事を示すフラグ
   * @param errMsg			エラーメッセージ出力オブジェクト
   * @param itemName			項目名（和名）
   * @param chkStr			チェックする文字列
   * @param required			必須を示すフラグ
   * @param regexList			正規表現（チェックしない場合は「null」を設定）
   * @param unMatchRegexList	不一致の正規表現（チェックしない場合は「null」を設定）
   * @param minLen			最小長（チェックしない場合は「null」を設定）
   * @param maxLen			最大長（チェックしない場合は「null」を設定）
   */
  stringChk: function(errMsg, itemName, chkStr, required, regexList, unMatchRegexList, minLen, maxLen) {
    switch (validator.string.chk(chkStr, required, regexList, unMatchRegexList, minLen, maxLen)) {
      case validator.string.code.OK:
        /* 正常値 */
        return true;
      case validator.string.code.NG_REQUIRED:
        /* 必須エラーを表示 */
        this.addMsg.requiredError(errMsg, itemName);
        return false;
      default:
        /* 不正エラーを表示 */
        this.addMsg.invalidError(errMsg, itemName);
        return false;
    }
  },

  /**
   * 住所必須チェック
   * @return					正常値である事を示すフラグ
   * @param errMsg			エラーメッセージ出力オブジェクト
   * @param itemName			項目名（和名）
   * @param chkStr			チェックする文字列
   */
  stringAddChk: function(errMsg, itemName, chkStr) {
    if (null === chkStr || "" === chkStr) {
      this.addMsg.requiredError(errMsg, itemName);
      return false;
    }
    return true;
  },

  /**
   * 数値（整数）チェック
   * @return				正常値である事を示すフラグ
   * @param errMsg		エラーメッセージ出力オブジェクト
   * @param itemName		項目名（和名）
   * @param chkStr		チェックする文字列
   * @param required		必須を示すフラグ
   * @param zeroPrefixNg	先頭「0」を許容する事を示すフラグ
   * @param minLen		最小長（符号を除いた桁数）（チェックしない場合は「null」を設定）
   * @param maxLen		最大長（符号を除いた桁数）（チェックしない場合は「null」を設定）
   * @param minVal		最小値（チェックしない場合は「null」を設定）
   * @param maxVal		最大値（チェックしない場合は「null」を設定）
   */
  intChk: function(errMsg, itemName, chkStr, required, zeroPrefixNg, minLen, maxLen, minVal, maxVal) {
    switch (validator.int.chk(chkStr, required, zeroPrefixNg, minLen, maxLen, minVal, maxVal)) {
      case validator.int.code.OK:
        /* 正常値 */
        return true;
      case validator.int.code.NG_REQUIRED:
        /* 必須エラーを表示 */
        this.addMsg.requiredError(errMsg, itemName);
        return false;
      default:
        /* 不正エラーを表示 */
        this.addMsg.invalidError(errMsg, itemName);
        return false;
    }
  },

  /**
   * カンマ付き数値（整数）チェック
   * @return				正常値である事を示すフラグ
   * @param errMsg		エラーメッセージ出力オブジェクト
   * @param itemName		項目名（和名）
   * @param chkStr		チェックする文字列
   * @param required		必須を示すフラグ
   * @param minLen		最小長（符号を除いた桁数）（チェックしない場合は「null」を設定）
   * @param maxLen		最大長（符号を除いた桁数）（チェックしない場合は「null」を設定）
   * @param minVal		最小値（チェックしない場合は「null」を設定）
   * @param maxVal		最大値（チェックしない場合は「null」を設定）
   */
  commaIntChk: function(errMsg, itemName, chkStr, required, minLen, maxLen, minVal, maxVal) {
    switch (validator.commaInt.chk(chkStr, required, minLen, maxLen, minVal, maxVal)) {
      case validator.commaInt.code.OK:
        /* 正常値 */
        return true;
      case validator.commaInt.code.NG_REQUIRED:
        /* 必須エラーを表示 */
        this.addMsg.requiredError(errMsg, itemName);
        return false;
      default:
        /* 不正エラーを表示 */
        this.addMsg.invalidError(errMsg, itemName);
        return false;
    }
  },

  /**
   * 日付（yyyymmdd）チェック
   * @return				正常値である事を示すフラグ
   * @param errMsg		エラーメッセージ出力オブジェクト
   * @param itemName		項目名（和名）
   * @param chkStr		チェックする文字列
   * @param required		必須を示すフラグ
   */
  dateChk: function(errMsg, itemName, chkStr, required) {
    switch (validator.date.chk(chkStr, required)) {
      case validator.date.code.OK:
        /* 正常値 */
        return true;
      case validator.date.code.NG_REQUIRED:
        /* 必須エラーを表示 */
        this.addMsg.requiredError(errMsg, itemName);
        return false;
      default:
        /* 不正エラーを表示 */
        this.addMsg.invalidError(errMsg, itemName);
        return false;
    }
  },

  /**
   * Eメールチェック
   * @return				正常値である事を示すフラグ
   * @param errMsg		エラーメッセージ出力オブジェクト
   * @param itemName		項目名（和名）
   * @param chkStr		チェックする文字列
   * @param required		必須を示すフラグ
   */
  emailChk: function(errMsg, itemName, chkStr, required) {
    switch (validator.email.chk(chkStr, required)) {
      case validator.email.code.OK:
        /* 正常値 */
        return true;
      case validator.email.code.NG_REQUIRED:
        /* 必須エラーを表示 */
        this.addMsg.requiredError(errMsg, itemName);
        return false;
      default:
        /* 不正エラーを表示 */
        this.addMsg.emailError(errMsg, itemName);
        return false;
    }
  },

  rangeChk: function(errMsg, itemName, chkStr, required, regexList, unMatchRegexList, minLen, maxLen) {
    switch (validator.string.chk(chkStr, required, regexList, unMatchRegexList, minLen, maxLen)) {
      case validator.string.code.OK:
        /* 正常値 */
        return true;
      case validator.string.code.NG_REQUIRED:
        /* 必須エラーを表示 */
        this.addMsg.requiredError(errMsg, itemName);
        return false;
      default:
        /* エラーを表示 */
        this.addMsg.rangeError(errMsg, itemName, minLen + 'ケタ', maxLen + 'ケタ');
        return false;
    }
  },

  fixlenghtChk: function(errMsg, itemName, chkStr, required, zeroPrefixNg, minLen, maxLen, minVal, maxVal) {
    switch (validator.int.chk(chkStr, required, zeroPrefixNg, minLen, maxLen, minVal, maxVal)) {
      case validator.int.code.OK:
        /* 正常値 */
        return true;
      case validator.int.code.NG_REQUIRED:
        /* 必須エラーを表示 */
        this.addMsg.requiredError(errMsg, itemName);
        return false;
      default:
        /* 不正エラーを表示 */
        this.addMsg.fixlengthError(errMsg, itemName, maxLen + 'ケタ');
        return false;
    }
  }

};

/**
 * 自動入力禁止文字処理
 */
var autoRemoveNgChar = {

  /**
   * 入力禁止文字の削除
   */
  replaceNgChar: function(_ngCharRegex) {
    return function(_this) {
      _this.val(_this.val().replace(_ngCharRegex, ''));
    };
  },

  /**
   * チェックイベントの登録
   */
  addChkEvent: function(_elmId, _ngCharRegex) {
    var rnc = autoRemoveNgChar.replaceNgChar(_ngCharRegex);
    return $('#' + _elmId)
      .keypress(function() {
        rnc($(this));
      })
      .keyup(function() {
        rnc($(this));
      })
      .keydown(function() {
        rnc($(this));
      })
      .change(function() {
        rnc($(this));
      })
      .click(function() {
        rnc($(this));
      })
      .each(function() {
        rnc($(this));
      });
  },

  /**
   * クレジットカードの番号
   */
  creditCardNo: function(_elmId) {
    autoRemoveNgChar
      .addChkEvent(_elmId, /[^0-9]/)
      .css({
        'ime-mode': 'disabled'
      });
  },

  /**
   * クレジットカードの年
   */
  creditCardYear: function(_elmId) {
    autoRemoveNgChar
      .addChkEvent(_elmId, /[^0-9]/)
      .css({
        'ime-mode': 'disabled'
      });
  },

  /**
   * 郵便番号
   */
  zip: function(_elmId) {
    autoRemoveNgChar
      .addChkEvent(_elmId, /[^0-9]/)
      .css({
        'ime-mode': 'disabled'
      });
  },

  /**
   * 連絡先電話番号
   */
  contactTel: function(_elmId) {
    autoRemoveNgChar
      .addChkEvent(_elmId, /[^0-9]/)
      .css({
        'ime-mode': 'disabled'
      });
  }

};

/**
 * パスワード系の入力禁止文字チェック
 */
var inputPwChk = {

  /**
   * チェックイベントの登録
   */
  addChkEvent: function(_elmId, _maxlength, _ngCharRegex) {
    autoRemoveNgChar
      .addChkEvent(_elmId, _ngCharRegex)
      .css({
        'ime-mode': 'disabled'
      })
      .attr({
        'maxlength': _maxlength
      });
  },

  /**
   * パスワード
   */
  pw: function(_elmId) {
    inputPwChk.addChkEvent(_elmId, '32', /[^a-zA-Z0-9`!@#\$%\^&\*\(\)\-_\+=]/);
  },

  /**
   * 暗証番号（セキュリティパスワード）
   */
  secpw: function(_elmId) {
    inputPwChk.addChkEvent(_elmId, '32', /[^a-zA-Z0-9]/);
  },

  /**
   * 顧客暗証番号
   */
  cspw: function(_elmId) {
    inputPwChk.addChkEvent(_elmId, '4', /[^0-9]/);
  }

};

/* 文字列範囲を定義する */
var alpha = "abcdefghijklmnopqrstuvwxyz";
var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var upper_punct = "~`!@#$%^&*()-_+=";
var digits = "1234567890";
var changeBtnFlg = false;

var levels = [
  "パスワードが入力されていません",
  "無効な文字が入力されています",
  "8文字以上入力してください",
  "英数を組み合せてください",
  "日付形式の数字はご利用いただけません",
  "au IDと似たパスワードは設定できません",
  "推測されやすいパスワードは設定できません",
  "中",
  "高"
];

/* NGワード、auID類似、日付型混入チェックをしないパスワード長境界値 */
var ngWords = "/1234|pass|qwer|6969|abc|4321|xxxx|aaaa|6666|zxcv|zzzz|qaz|2222|7777|2323|4444|8765|asdf|9876|3333|5555|6666|8888|9999|0000|wsx|zaq|xsw|0987/";
var len = 12;

var totalChars = 0x7f - 0x20; //９５個、ASCIIコード表
var alphaChars = alpha.length;
var upperChars = upper.length;
var upper_punctChars = upper_punct.length;
var digitChars = digits.length;
var otherChars = totalChars - (alphaChars + upperChars + upper_punctChars + digitChars);

function GEId(sID) {
  return document.getElementById(sID);
}

/* IDと同一判定 */
function isPwSameId(sPW, sID) {
  if (sPW.length < 0 || sID.length < 0) return false;

  //ID == PWの時類似と判定
  if (sPW == sID) return true;
  return false;
}



/* IDと類似判定 */
function isPwLikeId(sPW, sID) {
  if (sPW.length <= 0 || sID.length <= 0) return false;

  //PWが12桁以上の場合、類似判定をしない
  if (sPW.length >= len) return false;

  //IDが含めれる時類似と判定
  if (sPW.indexOf(sID) != -1) return true;

  //IDに含めれる時類似と判定
  if (sID.indexOf(sPW) != -1) return true;

  //文字をソートする
  var sPW2 = str_sort(sPW);
  var sID2 = str_sort(sID);

  //文字順序変えのみ時、類似と判断
  //ID=taro12345 , PW:12345taro, t1a2r3o45  は類似と判断
  if (sPW2 == sID2) return true;

  //IDで利用される文字と１文字の差異のみ時、類似と判断
  //ID=taro12345,
  //PW: 1234taro                1文字足りない
  //PW: 123456taro,12345taro1   1文字多い
  //PW: 1234ataro,12345maro     1文字入れ替え
  if (k_distance(sPW2, sID2) == 1) {
    return true;
  }

  return false;
}

/* 文字列をソースする */
function str_sort(s) {
  var sSort = "";
  var sAry = new Array();
  if (s.length > 0) {
    for (var i = 0; i < s.length; i++) {
      sAry[i] = s.charAt(i);
    }
    sAry.sort();
    sSort = sAry.join("");
  }
  return sSort;
}

/* ２つ文字列の類似性を判断 */
function k_distance(sPW, sID) {
  var iPointPW = new Array();
  var iPointID = new Array();
  var sPWAry = new Array();
  var sIDAry = new Array();

  for (var k = 0; k < sPW.length; k++) {
    sPWAry[k] = sPW.charAt(k);
    iPointPW[k] = 1;
  }
  for (var k = 0; k < sID.length; k++) {
    sIDAry[k] = sID.charAt(k);
    iPointID[k] = 1;
  }

  for (var i = 0; i < sPW.length; i++) {
    for (var j = 0; j < sID.length; j++) {
      if (sPWAry[i] != "" &&
        sPWAry[i] == sIDAry[j] &&
        iPointPW[i] == 1 && iPointID[j] == 1) {
        sPWAry[i] = "";
        sIDAry[j] = "";
        iPointPW[i] = 0;
        iPointID[j] = 0;
      }
    }
  }

  var point1 = 0;
  for (var k = 0; k < sPW.length; k++) {
    point1 = point1 + iPointPW[k];
  }

  var point2 = 0;
  for (var k = 0; k < sID.length; k++) {
    point2 = point2 + iPointID[k];
  }

  return Math.max(point1, point2);

}

/* NGワードがある */
function isNgWord(sPW) {
  //PWが12桁以上の場合、チェックしない
  if (sPW.length < 0 || sPW.length >= len) return false;
  if (ngWords.length > 0 && sPW.match(eval(ngWords))) return true;
  return false;
}

/* 日付形式 */
function isDate(sPW) {
  //PWが12桁以上の場合、チェックしない
  if (sPW.length < 0 || sPW.length >= len) return false;
  var aa = sPW.split(/\D/)

  for (i = 0; i < aa.length; i++) {
    if (aa[i].match(/^((2|02)([0-2][1-9]|10|20))$/)) return true;
    if (aa[i].match(/^(([469]|0[469]|11)([0-2][1-9]|10|20|30))$/)) return true;
    if (aa[i].match(/^(([13578]|0[13578]|10|12)([0-2][1-9]|10|20|30|31))$/)) return true;
  }
  return false;
}

/* 情報量計算 */
function calculateBits(sPW) {
  var fAlpha = false;
  var fUpper = false;
  var fUpperPunct = false;
  var fDigit = false;
  var fOther = false;
  var charset = 0;

  for (var i = 0; i < sPW.length; i++) {
    var char = sPW.charAt(i);

    if (alpha.indexOf(char) != -1)
      fAlpha = true;
    else if (upper.indexOf(char) != -1)
      fUpper = true;
    else if (digits.indexOf(char) != -1)
      fDigit = true;
    else if (upper_punct.indexOf(char) != -1)
      fUpperPunct = true;
    else
      fOther = true;
  }
  if (fAlpha)
    charset += alphaChars; // 26
  if (fUpper)
    charset += upperChars; //26
  if (fDigit)
    charset += digitChars; //10
  if (fUpperPunct)
    charset += upper_punctChars; //16
  //if (fOther)
  //    charset += otherChars;      //17

  var bits = Math.log(charset) * (sPW.length / Math.log(2));
  //console.log(bits);
  return Math.floor(bits);
}

/* 表示 */
function DispPwdStrength(iN) {
  if (iN < 0) iN = 0;
  if (iN > 8) iN = 8;

  GEId("ScoreBar1").className = "pwdChkCon" + iN;
  GEId("ScoreBar1").innerHTML = levels[iN];

  if (iN >= 7) {
    changeBtnFlg = true;
  } else {
    changeBtnFlg = false;
  }

}

/* PW強度計算 */
function CalcuPwdStrength(sPW, sID) {
  if (sID == null) sID = '';
  if (sPW == null) sPW = '';

  //未入力
  if (sPW == '') {
    return 0;

    //許容する文字でない
  } else if (sPW.match(/([^a-zA-Z0-9\~\`\!\@\#\$\%\^\&\*\(\)\-\_\+\=])/)) {
    return 1;

    //8文字以下
  } else if (sPW.length < 8) {
    return 2;

    //英数混在しない
  } else if (!(sPW.match(/([a-zA-Z])/) && sPW.match(/([0-9])/))) {
    return 3;

    //IDと同一
  } else if (sPW.match(/([a-zA-Z])/) && sPW.match(/([0-9])/) && isPwSameId(sPW, sID)) {
    return 5;

    //誕生日混入：以下は12文字以上の場合は判断しない
  } else if (sPW.match(/([a-zA-Z])/) && sPW.match(/([0-9])/) && isDate(sPW)) {
    return 4;

    //IDと類似
  } else if (sPW.match(/([a-zA-Z])/) && sPW.match(/([0-9])/) && isPwLikeId(sPW, sID)) {

    return 5;

    //NGワード
  } else if (sPW.match(/([a-zA-Z])/) && sPW.match(/([0-9])/) && isNgWord(sPW)) {
    return 6;

  } else {
    var bits = calculateBits(sPW);

    //高
    if (bits >= 128) {
      return 8;
      //中
    } else {
      return 7;
    }
  }
}

/* PW強度評価メイン処理 */
function EvalPwdStrength(sPW, sID) {
  DispPwdStrength(CalcuPwdStrength(sPW, sID));
}

/**
 * 値チェック
 */
var validator = {

  /**
   * 文字列
   */
  string: {

    /**
     * コード
     */
    code: {
      OK: 0, // 正常値

      NG_REQUIRED: 1, // 必須エラー
      NG_FORMAT: 2, // フォーマットエラー
      NG_MINLEN: 3, // 最小長エラー
      NG_MAXLEN: 4 // 最大長エラー
    },

    /**
     * チェック
     * @return					応答コード
     * @param chkStr			チェックする文字列
     * @param required			必須を示すフラグ
     * @param regexList			正規表現（チェックしない場合は「null」を設定）
     * @param unMatchRegexList	不一致の正規表現（チェックしない場合は「null」を設定）
     * @param minLen			最小長（チェックしない場合は「null」を設定）
     * @param maxLen			最大長（チェックしない場合は「null」を設定）
     */
    chk: function(chkStr, required, regexList, unMatchRegexList, minLen, maxLen) {
      /* 必須チェック */
      if (null === chkStr || "" === chkStr) {
        return (required ? this.code.NG_REQUIRED : this.code.OK);
      }

      /* フォーマットチェック */
      if (null !== regexList) {
        for (var i = 0; i < regexList.length; i++) {
          var regex = regexList[i];
          if (null !== regex && !chkStr.match(regex)) {
            return this.code.NG_FORMAT;
          }
        }
      }
      if (null !== unMatchRegexList) {
        for (var i = 0; i < unMatchRegexList.length; i++) {
          var regex = unMatchRegexList[i];
          if (null !== regex && chkStr.match(regex)) {
            return this.code.NG_FORMAT;
          }
        }
      }

      /* 最小長チェック */
      if (null !== minLen && chkStr.length < minLen) {
        return this.code.NG_MINLEN;
      }

      /* 最大長チェック */
      if (null !== maxLen && chkStr.length > maxLen) {
        return this.code.NG_MAXLEN;
      }

      /* 正常値 */
      return this.code.OK;
    }

  },

  /**
   * 数値（整数）
   */
  int: {

    /**
     * コード
     */
    code: {
      OK: 0, // 正常値

      NG_REQUIRED: 1, // 必須エラー
      NG_TYPE: 2, // 文字種エラー
      NG_ZEROPREFIX: 3, // 先頭「0」エラー
      NG_MINLEN: 4, // 最小長エラー
      NG_MAXLEN: 5, // 最大長エラー
      NG_MINVALUE: 6, // 最小値エラー
      NG_MAXVALUE: 7 // 最大値エラー
    },

    /**
     * チェック
     * @return				応答コード
     * @param chkStr		チェックする文字列
     * @param required		必須を示すフラグ
     * @param zeroPrefixNg	先頭「0」を許容する事を示すフラグ
     * @param minLen		最小長（符号を除いた桁数）（チェックしない場合は「null」を設定）
     * @param maxLen		最大長（符号を除いた桁数）（チェックしない場合は「null」を設定）
     * @param minVal		最小値（チェックしない場合は「null」を設定）
     * @param maxVal		最大値（チェックしない場合は「null」を設定）
     */
    chk: function(chkStr, required, zeroPrefixNg, minLen, maxLen, minVal, maxVal) {
      /* 必須チェック */
      if (null === chkStr || "" === chkStr) {
        return (required ? this.code.NG_REQUIRED : this.code.OK);
      }

      /* 文字種チェック */
      if (!chkStr.match(/^(-)?[0-9]*$/) || chkStr.match(/^-[0]*$/)) {
        return this.code.NG_TYPE;
      }

      /* 先頭「0」許容チェック */
      if (zeroPrefixNg && chkStr.match(/^(-)?0[0-9]+$/)) {
        return this.code.NG_ZEROPREFIX;
      }

      /* 最小長チェック */
      var chkStrLen = chkStr.replace(/^-/, '').length;
      if (null !== minLen && chkStrLen < minLen) {
        return this.code.NG_MINLEN;
      }

      /* 最大長チェック */
      if (null !== maxLen && chkStrLen > maxLen) {
        return this.code.NG_MAXLEN;
      }

      /* 最小値チェック */
      var chkInt = parseInt(chkStr, 10);
      if (null !== minVal && chkInt < minVal) {
        return this.code.NG_MINVALUE;
      }

      /* 最大値チェック */
      if (null !== maxVal && chkInt > maxVal) {
        return this.code.NG_MAXVALUE;
      }

      /* 正常値 */
      return this.code.OK;
    }

  },

  /**
   * カンマ付き数値（整数）
   */
  commaInt: {

    /**
     * コード
     */
    code: {
      OK: 0, // 正常値

      NG_REQUIRED: 1, // 必須エラー
      NG_TYPE: 2, // 文字種エラー
      NG_MINLEN: 3, // 最小長エラー
      NG_MAXLEN: 4, // 最大長エラー
      NG_MINVALUE: 5, // 最小値エラー
      NG_MAXVALUE: 6 // 最大値エラー
    },

    /**
     * チェック
     * @return				応答コード
     * @param chkStr		チェックする文字列
     * @param required		必須を示すフラグ
     * @param minLen		最小長（符号とカンマを除いた桁数）（チェックしない場合は「null」を設定）
     * @param maxLen		最大長（符号とカンマを除いた桁数）（チェックしない場合は「null」を設定）
     * @param minVal		最小値（チェックしない場合は「null」を設定）
     * @param maxVal		最大値（チェックしない場合は「null」を設定）
     */
    chk: function(chkStr, required, minLen, maxLen, minVal, maxVal) {
      /* 必須チェック */
      if (null === chkStr || "" === chkStr) {
        return (required ? this.code.NG_REQUIRED : this.code.OK);
      }

      /* 文字種チェック */
      if (!chkStr.match(/^(^0$)|(^[-]{0,1}[1-9][0-9]{0,2}(,[0-9]{3,3})*$)$/)) {
        return this.code.NG_TYPE;
      }

      /* 最小長チェック */
      var chkStrLen = chkStr.replace(/[-,]/g, '').length;
      if (null !== minLen && chkStrLen < minLen) {
        return this.code.NG_MINLEN;
      }

      /* 最大長チェック */
      if (null !== maxLen && chkStrLen > maxLen) {
        return this.code.NG_MAXLEN;
      }

      /* 最小値チェック */
      var chkInt = parseInt(chkStr.replace(/[,]/g, ''), 10);
      if (null !== minVal && chkInt < minVal) {
        return this.code.NG_MINVALUE;
      }

      /* 最大値チェック */
      if (null !== maxVal && chkInt > maxVal) {
        return this.code.NG_MAXVALUE;
      }

      /* 正常値 */
      return this.code.OK;
    }

  },

  /**
   * 日付（yyyymmdd）
   */
  date: {

    /**
     * コード
     */
    code: {
      OK: 0, // 正常値
      NG_REQUIRED: 1, // 必須エラー
      NG_FORMAT: 2 // フォーマットエラー
    },

    /**
     * チェック
     * @return				応答コード
     * @param chkStr		チェックする文字列
     * @param required		必須を示すフラグ
     */
    chk: function(chkStr, required) {
      /* 必須チェック */
      if (null === chkStr || "" === chkStr) {
        return (required ? this.code.NG_REQUIRED : this.code.OK);
      }

      /* フォーマットチェック */
      if (!chkStr.match(/^[0-9]{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])/)) {
        return this.code.NG_FORMAT;
      }

      /* 正常値 */
      return this.code.OK;
    }
  },

  /**
   * Eメール
   */
  email: {

    /**
     * コード
     */
    code: {
      OK: 0, // 正常値
      NG_REQUIRED: 1, // 必須エラー
      NG_FORMAT: 2 // フォーマットエラー
    },

    /**
     * チェック
     * @return				応答コード
     * @param chkStr		チェックする文字列
     * @param required		必須を示すフラグ
     */
    chk: function(chkStr, required) {
      /* 必須チェック */
      if (null === chkStr || "" === chkStr) {
        return (required ? this.code.NG_REQUIRED : this.code.OK);
      }

      /* フォーマットチェック */
      if (!chkStr.match(/^[^@]+@([^@\.]+\.)+[^@\.]{2,}$/)) {
        return this.code.NG_FORMAT;
      }

      /* 正常値 */
      return this.code.OK;
    }
  }

};
