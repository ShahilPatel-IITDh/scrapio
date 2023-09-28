/**
 * ログイン画面入力チェックスクリプト
 */
/* 文字種チェック用正規表現 */
//半角アルファベット
var HA = '\u0041-\u005a\u0061-\u007a';
//全角アルファベット
var ZA = '\uFF21-\uFF3A\uFF41-\uFF5A';
//半角数値
var HN = '\u0030-\u0039';
//全角数値
var ZN = '\uFF10-\uFF19';
//半角記号（#、$、+、.、/、:、=)
var HS = '\u0023\u0024\u002B\u002E\u002F\u003A\u003D';

var ERROR = 'ERROR';
var COMPLETE = 'COMPLETE';
var INPUT = 'INPUT';
var myjId = '';
var password = '';
var myjIdState = '';
var passwordState = '';
var myjIdErrMsg = '　';
var passwordErrMsg = '　';
var loginButtonState = '';
var submitted_form1 = false;

/* 初期化処理 */
function onLoad(){
    passwordState = '';
    loginButtonState = '';
    $('#loginButtonAD').css("pointer-events","none");
    initValidate();
}

//初期化処理で行う入力欄チェック
function initValidate(){
	myjId = document.getElementById("userId").value;
    // 文字種チェック
    if (!isType([HA, ZA, HN, ZN, HS], myjId)) {
        myjIdState = ERROR;
        myjIdErrMsg = '6〜20桁の半角英数字・所定の記号でご入力ください';
    }
    // 文字長チェック
    else if (isLength(6, 20, myjId)) {
        myjIdState = COMPLETE;
        myjIdErrMsg = '　';
    }
    updateMyJId();
}

//MyJCBID入力チェック
function validateMyJId(event,overhantei){
    myjId = document.getElementById("userId").value;
    if (event.type == 'blur' && myjId.length == 0) {
        myjIdState = ERROR;
        myjIdErrMsg = 'ご入力ください';
    }
    else if (event.type == 'keyup' && myjId.length == 0) {
        document.getElementById("userIdclass").className = 'login-input';
        myjIdState = 'INPUT';
        myjIdErrMsg = '　';
    }
    // 文字種チェック
    else if (!isType([HA, ZA, HN, ZN, HS], myjId)) {
        myjIdState = ERROR;
        myjIdErrMsg = '6〜20桁の半角英数字・所定の記号でご入力ください';
    }
    // 文字長チェック
    else if ((myjId.length < 6 && (event.type == 'blur' || event.type =='select'))) {
        myjIdState = ERROR;
        myjIdErrMsg = '6〜20桁の半角英数字・記号でご入力ください';
    }
    else if (myjId.length > 20 && (event.type == 'blur' || event.type =='select' || event.type == 'keyup')) {
        myjIdState = ERROR;
        myjIdErrMsg = 'IDの上限は20桁です。上限値を超えた入力がされています';
    }
    else if (isLength(6, 20, myjId)) {
        myjIdState = COMPLETE;
        myjIdErrMsg = '　';
    }
    else if (overhantei == 0 && event.type != 'mouseover'){
        myjIdState = 'INPUT';
        myjIdErrMsg = '　';
    }
    updateMyJId();
}

//MyJCBID入力欄更新処理
function updateMyJId(){

    myjId = document.getElementById("userId").value;
    if (myjIdState == ERROR) {
        document.getElementById("userIdclass").className = 'login-input-error';
    }
    else if (myjIdState != ''){
        document.getElementById("userIdclass").className = 'login-input';
    }
    password = document.getElementById("password").value;
    // PW自動入力に対応
    if (isLength(1, 20, password)) {
        passwordState = COMPLETE;
        passwordErrMsg = '　';
        document.getElementById("passwordclass").className = 'password-input';
    }
    loginButtonUpdate();
    document.getElementById("myjIdErrMsg").innerHTML = myjIdErrMsg;
    document.getElementById("passwordErrMsg").innerHTML = passwordErrMsg;
}

//パスワード入力チェック
function validatePassword(event){
    password = document.getElementById("password").value;
    if (event.type == 'blur' && password.length == 0) {
        passwordState = ERROR;
        passwordErrMsg = 'ご入力ください';
    }
    else if (event.type == 'keyup' && password.length == 0) {
        document.getElementById("passwordclass").className = 'password-input';
        passwordState = '';
        passwordErrMsg = '　';
    }
    else if ((!isLength(1, 20, password) && (event.type == 'blur' || event.type =='select')) || (event.type == 'keyup' && password.length > 20)) {
        passwordState = ERROR;
        passwordErrMsg = 'パスワードの上限は20桁です。上限値を超えた入力がされています';
    }
    else if (password.length > 0){
        passwordState = COMPLETE;
        passwordErrMsg = '　';
    }
    updatePassword();
}

//パスワード欄更新処理
function updatePassword(){
    if (passwordState == ERROR) {
        document.getElementById("passwordclass").className = 'password-input-error';
    }
    else {
        document.getElementById("passwordclass").className = 'password-input';
    }
    loginButtonUpdate();
    document.getElementById("passwordErrMsg").innerHTML = passwordErrMsg;
}

//ログインボタン表示切替
function loginButtonUpdate(){
    if (myjIdState == COMPLETE && passwordState == COMPLETE && loginButtonState != COMPLETE) {
	$('#loginButtonAD').css("pointer-events","auto");
        document.getElementById("loginButtonAD").setAttribute("href", "#");
        loginButtonState = COMPLETE;
    }
    else if((myjIdState != COMPLETE || passwordState != COMPLETE) && loginButtonState != ERROR) {
	$('#loginButtonAD').css("pointer-events","none");
	document.getElementById("loginButtonAD").removeAttribute("href");
        loginButtonState = ERROR;
    }
}

/* 文字列長が所与の範囲内であれば真を返す. */
function isLength(min, max, s){
    var len = s.length;
    return len >= min && len <= max;
}

/* 指定した文字種パターンに該当する文字のみであれば真を返す. */
function isType(ptns, s){
    var p = '^[';
    for (var i = 0; i < ptns.length; i++) {
        p += ptns[i];
    }
    p += ']*$';
    var reg = new RegExp(p, '');
    return s.match(reg);
}

function isSubmitted_form1() {
  return submitted_form1;
}

function setSubmitted_form1(flag) {
  submitted_form1 = flag;
}

/* ボタン非活性時にEnter押下時のsubmitを抑止する */
function invalidEnter(evt) {
  evt = (evt) ? evt : event; 
  var charCode=(evt.charCode) ? evt.charCode : ((evt.which) ? evt.which : evt.keyCode);
  if(loginButtonState != COMPLETE){
    if ( Number(charCode) == 13 || Number(charCode) == 3) {
      return false;
    } else {
      return true;
    }
  }
}

/* 引数で受け取ったフォームのenter押下時のsubmit処理を抑止する */
function invalidEnterForm(formid) {
    var elements = document.forms[formid].elements;
    for (var j=0; j < elements.length; j++) {
    var e = elements[j];  
    if (e.type == "text" || e.type == "password"){
        e.onkeypress=invalidEnter;
    }
  }
}

function mouseOverForm(event) {
    validateMyJId(event,0);
}

function mouseOverButton(event) {
    validateMyJId(event,1);
    if(loginButtonState == ERROR) {
      document.getElementById("loginButtonAD").innerHTML="<p class='error-icon'><span><img src='/apl/renew/login/images/error-icon.png' alt=''></span><span class='error-message'>未入力かエラーの<br />項目があります</span></p>";
      document.getElementById("loginButtonAD").className='btn-grey btn btn-login_01';

    }
}
function mouseOutButton() {
    document.getElementById("loginButtonAD").innerHTML="ログイン";
    document.getElementById("loginButtonAD").className='btn-blue btn btn-login_01';
}

function getDevicePrint() {
  // devicePrintの設定
  document.forms.loginForm.devicePrint.value = encode_deviceprint();
}