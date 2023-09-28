function HideControls(document) {

    var tbs = document.getElementsByTagName('input');

    for (i = 0; i < tbs.length; i++) {
        var input = tbs[i];
        if (input.type == 'text') {
            input.readOnly = "readonly";
        }
        if (input.type == 'image') {
            input.style.display = 'none';
        }
        if (input.type == 'checkbox') {
            input.disabled = 'true';
        }
        if (input.type == 'radio') {
            input.disabled = 'true';
        }

    }

    var selects = document.getElementsByTagName('select');
    for (i = 0; i < selects.length; i++) {
        var select = selects[i];
        select.disabled = 'true';
    }

    var links = document.getElementsByTagName('a');
    for (var i = 0; i < (links.length); i++) {
        var link = links[i];
        link.removeAttribute("href")
    }

    return true;
}
function CopyHTML(print_area) {

    var p = window.opener;

    var elem = document.getElementById("PrintContent");
    elem.innerHTML = p.document.getElementById(print_area).innerHTML;
    HideControls(document);

}

function getPrint(print_area) {

    var pp = window.open("/Core/PrintPreview.aspx?" + print_area);
    pp.moveTo(0, 0);
    pp.resizeTo(screen.width, screen.height);
}

