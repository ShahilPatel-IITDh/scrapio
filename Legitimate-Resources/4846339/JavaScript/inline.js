
_hjUtil = {
loadScript: () => {
var script = document.createElement("script");
script.src = "/de_DE/skins/lottoland/js/hotjar-script.min-c6e966fffacb59a4.js";
document.head.appendChild(script);
},
loadDla: () => {
window.dla.hotjar = {
id : '21185',
sv : '3'
}
}
};
if('true' === 'true'){
window.onload = _hjUtil.loadScript();
_hjUtil.loadDla();
}
