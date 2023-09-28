
var requirejs = (function() {
var list = [""];
return {
waitSeconds: 0,
onNodeCreated: function(node, config, id, url) {
for (var i = 0, len = list.length; i < len; i++) {
if (list[i].length && url.indexOf(list[i]) > -1) {
node.setAttribute("crossorigin", "anonymous");
}
}
}
}
})()
