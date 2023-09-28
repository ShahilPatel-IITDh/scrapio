/* エラーメッセージの表示   */
/* 引数　：エラーフラグ     */
/* 戻り値：なし             */
function nbError(errFlg, errMsg) {
  var workNum=0;
  switch(errFlg){
  case 1:
    alert("文字数が制限を超えています。\n\n"+
          "半角"+errMsg+"文字以内で、もう一度入力してください。");
    break;
  case 2:
    alert("半角数字で入力してください。");
    break;
  case 3:
    alert("整数又は小数で入力してください。");
    break;
  case 4:
    alert("半角英数字で入力してください。");
    break;
  case 5:
    alert("全角カナで入力してください。");
    break;
  case 6:
    alert("使用できない文字が含まれています。\n\n"+
          "ご確認のうえ、もう一度入力してください。");
    break;
  case 7:
    alert("入力文字数が足りません。\n\n"+
          "半角"+errMsg+"文字で、もう一度入力してください。");
    break;
  case 8:
    alert("この項目は変更できません。");
    break;
  case 9:
    alert("入力または選択されていない項目があります。\n\n"+
          "必須項目はすべて入力してください。");
    errMsg.focus();
    break;
  case 10:
    alert("日付の指定が誤っています。\n\n"+
          "カレンダーを確認して、正しい日付を入力してください。");
    errMsg.focus();
    // select項目でない場合
    if (errMsg.type != "select-one") {
      errMsg.select();
    }
    break;
  case 11:
    alert("店番号または口座番号が誤っています。\n\n"+
          "ご確認のうえ、もう一度入力してください。");
    errMsg.focus();
    errMsg.select();
    break;
  case 12:
    alert("西暦4桁で入力してください。");
    break;
  case 13:
    alert("西暦4桁で入力してください。");
    break;
  case 14:
    alert("整数で入力してください。");
    break;
  case 15:
    alert("整数で入力してください。");
    break;
  case 16:
    alert("支店名を検索する前に、銀行名を検索してください。");
    errMsg.focus();
    break;
  case 17:
    alert("メールアドレスにカンマ（,）は使用できません。");
    break;
  case 18:
    workNum = (errMsg-(errMsg%2))/2;
    alert("文字数が制限を超えています。\n\n"+
          "全角"+workNum+"文字以内で、もう一度入力してください。");
    break;
  case 19:
    alert("恐れ入りますが、SOHO ACCOUNT もしくは BUSINESS ACCOUNT で\n\n"+
          "お申し込みされたお客さまの勤務先や電話番号は変更できません");
    break;    
  case 20:
    alert("未来の年月は入力できません。");
    errMsg.focus();
    // select項目でない場合
    if (errMsg.type != "select-one") {
      errMsg.select();
    }
    break;
  case 21:
    alert("15歳未満の年月は入力できません。");
    errMsg.focus();
    // select項目でない場合
    if (errMsg.type != "select-one") {
      errMsg.select();
    }
    break;
  case 22:
    alert("正しい年月をご入力ください。");
    errMsg.focus();
    // select項目でない場合
    if (errMsg.type != "select-one") {
      errMsg.select();
    }
    break;
  case 100:
    alert("生年月日の西暦指定に誤りがあります。");
    break; 
  default:
    alert("なんらかのエラーが発生しました。");
    break;
  }
}
