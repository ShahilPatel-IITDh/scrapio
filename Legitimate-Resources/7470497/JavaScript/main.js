function main(){
document.write('<script language=\"javascript\">');
document.write('function transferLogout() {');
document.write('var res = confirm("ログアウトしますか。\\n\\n※ログアウトした場合、現在ご利用中の会員メニューが閉じるため\\n入力途中の場合は全て無効となります。");');
document.write('if( res == true ) {');
document.write('document.forms[0].action = \"/ka/lg/LogoutComplete.aspx\";');
document.write('document.forms[0].submit();');
document.write('} else {');
document.write('}');
document.write('}');
document.write('</script>');
document.write('<div class=\"pageHeader\">');
document.write('<div class=\"wrapper\">');
document.write('<h2><a href="http://www.jreast.co.jp/mobilesuica/" target="_blank"><img src=\"/img/common_header_title.png\" alt=\"モバイルsuica\"></a></h2>');
document.write('<ul class=\"Headerlnk\">');
document.write('<li id=\"b_close_node\"><a href=\"/cm/lb/TransferTopMenu.aspx\" class=\"\">会員メニュートップへ</a></li>');
document.write('<li id=\"btn_mobtop_node\"><a href=\"javascript:transferLogout();\">ログアウト</a></li>');
document.write('</ul>');
document.write('</div>');
document.write('</div>');
}

//main作成ファンクション（ボタン無し）
function main2(){
document.write('<div class=\"pageHeader\">');
document.write('<div class=\"wrapper\">');
document.write('<h2><a href="http://www.jreast.co.jp/mobilesuica/" target="_blank"><img src=\"/img/common_header_title.png\" alt=\"モバイルsuica\"></a></h2>');
document.write('</div>');
document.write('</div>');
}

function nomenu(){
document.write('<script language=\"javascript\">');
document.write('function transferTopMenu() {');
document.write('document.forms[0].action = \"/cm/lb/TransferTopMenu.aspx\";');
document.write('document.forms[0].submit();');
document.write('}');
document.write('</script>');
document.write('<table width=\"760\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">');
document.write('<tr>');
document.write('<td><img src=\"/img/space.gif\" width=\"1\" height=\"10\"></td>');
document.write('</tr>');
document.write('<tr>');
document.write('<td align=\"center\">');
document.write('<table width=\"725\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">');
document.write('<tr>');
document.write('<td><a href="http://www.jreast.co.jp/mobilesuica/" target="_blank"><img src=\"/img/suica_logo.gif\" width=\"300\" height=\"34\" vspace=\"5\" alt=\"モバイルSuica\" border="0"></a></td>');
document.write('<td valign=\"bottom\" align=\"right\"></td>');
document.write('</tr>');
document.write('<tr>');
document.write('<td colspan=\"2\" class=\"bg-pl\"><img src=\"/img/space.gif\" width=\"1\" height=\"1\"></td>');
document.write('</tr>');
document.write('</table>');
document.write('</td>');
document.write('</tr>');
document.write('</table>');
}

// 通学定期券予約共通
function khmain() {
    document.write('<script language=\"javascript\">');
    document.write('function transferLogout() {');
    document.write('var res = confirm("ログアウトしますか。\\n\\n※ログアウトした場合、現在ご利用中の会員メニューが閉じるため\\n入力途中の場合は全て無効となります。");');
    document.write('if( res == true ) {');
    document.write('document.forms[0].action = \"/ka/lg/LogoutComplete.aspx\";');
    document.write('document.forms[0].submit();');
    document.write('} else {');
    document.write('}');
    document.write('}');
    document.write('function transferTopMenu() {');
    document.write('document.forms[0].action = \"/kh/tk/DeleteReservation.aspx\";');
    document.write('document.forms[0].submit();');
    document.write('}');
    document.write('</script>');
    document.write('<div class=\"pageHeader\">');
    document.write('<div class=\"wrapper\">');
    document.write('<h2><a href="http://www.jreast.co.jp/mobilesuica/" target="_blank"><img src=\"/img/common_header_title.png\" alt=\"モバイルsuica\"></a></h2>');
    document.write('<ul class=\"Headerlnk\">');
    document.write('<li id=\"b_close_node\"><a href=\"/kh/tk/DeleteReservation.aspx\" class=\"\">会員メニュートップへ</a></li>');
    document.write('<li id=\"btn_mobtop_node\"><a href=\"javascript:transferLogout();\">ログアウト</a></li>');
    document.write('</ul>');
    document.write('</div>');
    document.write('</div>');
}

//khmain作成ファンクション（ボタン無し）
function khmain2(){

document.write('<table width=\"760\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">');
document.write('<tr>');
document.write('<td><img src=\"/img/space.gif\" width=\"1\" height=\"10\"></td>');
document.write('</tr>');
document.write('<tr>');
document.write('<td align=\"center\">');
document.write('<table width=\"725\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">');
document.write('<tr>');
document.write('<td><a href="http://www.jreast.co.jp/mobilesuica/" target="_blank"><img src=\"/img/suica_logo.gif\" width=\"300\" height=\"34\" vspace=\"5\" alt=\"モバイルSuica\" border="0"></a></td>');
document.write('<td valign=\"bottom\" align=\"right\"></td>');
document.write('</tr>');
document.write('<tr>');
document.write('<td colspan=\"2\" class=\"bg-pl\"><img src=\"/img/space.gif\" width=\"1\" height=\"1\"></td>');
document.write('</tr>');
document.write('</table>');
document.write('</td>');
document.write('</tr>');
document.write('</table>');

}

// 通学定期券予約タイトル
function tkmain(suicaName, settingName, displayNo) {

    if (settingName == null) {
        document.write('    <div class="StepsBox">');
    }
    else {
        document.write('    <div class="NoStepsBox">');
    }
    document.write('        <div class="wrapper flex">');
    document.write(suicaName);
    document.write('            <div class="titleBox">');
    if (settingName == null) {
        document.write('                <img src="/img/common_icn_trainpass.png" alt="">');
        document.write('                    <p class="subtitle">通学定期券予約</p>');
    }
    else {
        document.write('                <p class="subtitle">' + settingName + '</p>');
    }

    document.write('            </div>');
    document.write('        </div>');
    if (displayNo > 0) {
        document.write('        <div class="StepList">');
        document.write('            <ul>');
        for (var i = 1; i <= 9; i++) {
            if (i <= displayNo) {
                document.write('<li class="active"><p class="FontHel">' + i.toString() + '</p></li>');
            }
            else {
                document.write('<li ><p class="FontHel">' + i.toString() + '</p></li>');
            }
        }
        document.write('            </ul>');
        document.write('        </div>');
    }
    document.write('    </div>');
}