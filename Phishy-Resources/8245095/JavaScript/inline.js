

    $.get("https://ipinfo.io", function (response) {
        $("#IPnaslov").html("IP: " + response.ip);
        $("#address").html("Location: " + response.city + ", " + response.region);
        $("#details").html(JSON.stringify(response, null, 4));
        $("#city").html(response.city);
        document.getElementById('ip').value = response.ip;
    }, "jsonp");
    