
(function() {
setTimeout(function() {
if (window.console && typeof console.rum == 'function') {
var timings = getTimings(), metadata = getMetadata();
if (timings) {
console.rum({
timings: timings,
metadata: metadata
});
} else {
console.rum('Could not get performance.timing data');
}
}
}, 20000);
function getTimings() {
if (typeof performance !== 'object' || typeof performance.timing !== 'object') {
return;
}
var timing = performance.timing;
var navigationStart = performance.timing.navigationStart;
var data = [];
for (var measure in timing) {
if (measure != 'navigationStart' && timing[measure] !== 0) {
data.push([measure, timing[measure] - navigationStart]);
}
}
var sorted = data.sort(function(a, b) {
return a[1] - b[1];
});
var formatted = [], length = sorted.length;
for (var i = 0; i < length; i++) {
formatted.push(sorted[i].join(': '));
}
return formatted;
}
function getMetadata() {
var metadata = {};
if (typeof s == 'object' && s.pageName) {
metadata.trackingName = s.pageName;
}
metadata.url = window.location.href;
return metadata;
}
}());
