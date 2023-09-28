// CLOSE WINDOW ++++++++++++++++++++++++++++++++//
function MM_close() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.indexOf("msie") != -1 || ua.indexOf("trident") != -1) {
        window.close();
    } else {
        if (confirm('ウィンドウは、表示中のwebページにより閉じられようとしています。\n\nこのウィンドウを閉じますか？')) {
            window.close();
        }
    }

}

//SUBMIT  ++++++++++++++++++++++++++++++++//
var activeH01=0;
function invalidateSubmitH01() {
    if(activeH01==0){
        activeH01=1;
        return true;
    }else{
        return false
    }
}

// 子ウインドウ制御  +++++++++++++++++++++++//
var childWindow;
function openChildM01() {
    if(childWindow!=null&& !childWindow.closed){
        childWindow.setShowDialog(false);
    }
    childWindow = window.open("about:blank","newWindow","");
    document._m01Form.target="newWindow";
    return true;
}

function closeChildM01() {
    if(childWindow!=null && !childWindow.closed){
        childWindow.setShowDialog(false);
        childWindow.close();
    }
    document._m01Form.target="_self";
    return true;
}

function openChildH01() {
    if(childWindow!=null&& !childWindow.closed){
        childWindow.setShowDialog(false);
    }
    childWindow = window.open("about:blank","newWindow","");
    document._h01Form.target="newWindow";
    return true;
}


function closeChildH01() {
    if(childWindow!=null && !childWindow.closed){
       childWindow.setShowDialog(false);
       childWindow.close();
    }
       document._h01Form.target="_self";
       return true;
}

function closeChildH01_01() {
    if(invalidateSubmitH01()){
        if(childWindow!=null && !childWindow.closed){
            childWindow.setShowDialog(false);
            childWindow.close();
        }
            document._h01Form.target="_self";
            return true;
    } else {
       return false;
    }
}

function closeChildH01_02() {
    if((window.confirm('アカウントロックを解除しますか？'))){
        if(childWindow!=null&& !childWindow.closed){
             childWindow.setShowDialog(false);
             childWindow.close();
        }
        document._h01Form.target="_self";
        return true;
    } else {
       return false;
    }
}

function closeChildH01_03() {
    if((window.confirm('サービス利用を停止しますか？')&&invalidateSubmitH01())){
        if(childWindow!=null&& !childWindow.closed){
            childWindow.setShowDialog(false);
            childWindow.close();
        }
        document._h01Form.target="_self";
        return true;
    } else {
       return false;
    }
}

function openChildAT05() {
    if(childWindow!=null&& !childWindow.closed){
        childWindow.setShowDialog(false);
    }
    childWindow = window.open("about:blank","newWindow","");
    document._at05Form.target="newWindow";
    return true;
}

function closeChildAT05() {
    if(childWindow!=null && !childWindow.closed){
        childWindow.setShowDialog(false);
        childWindow.close();
    }
    document._at05Form.target="_self";
    return true;
}

//F5抑止 ++++++++++++++++++++++++++++++++//
document.onkeydown = onloadKeys;
function onloadKeys(){
    switch (event.keyCode ){
        case 116:
        event.keyCode = 0;
        return false;
        break;
    }
}
