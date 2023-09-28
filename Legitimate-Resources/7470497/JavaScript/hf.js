function imageOn(imgName) {
document[imgName].src = eval(imgName + "2.src");
}

function imageOff(imgName) {
document[imgName].src = eval(imgName + "1.src");
}

function header(){
document.write('<div class=\"header\">');
document.write('<div class=\"wrapper\">');
document.write('<a class=\"logo\" href=\"http://www.jreast.co.jp/\" target=\"_blank\"><img src=\"/img/top_header_jrlogo.png\" alt=\"JR東日本\"></a>');
document.write('</div>');
document.write('</div>');
}

//header作成ファンクション（ボタン無し）
function header2() {

document.write('<div class=\"header\">');
document.write('<div class=\"wrapper\">');
document.write('<a class=\"logo\" href=\"http://www.jreast.co.jp/\" target=\"_blank\"><img src=\"/img/top_header_jrlogo.png\" alt=\"JR東日本\"></a>');
document.write('</div>');
document.write('</div>');

}

function footer(){
document.write('<p class=\"footer sentence2\">Copyright &copy; East Japan Railway Company All Rights Reserved.</p>');

if (document.getElementById('baseVarLogoutBtn') != null) {
    if (document.getElementById('b_close_node') != null) {
        node = document.getElementById('b_close_node');
        node.style.display = 'none';
    }
    if (document.getElementById('btn_mobtop_node') != null) {
        node = document.getElementById('btn_mobtop_node');
        node.style.display = 'none';
    }
}
}
