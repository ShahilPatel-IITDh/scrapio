
var x = document.getElementById("demo");
let d = new Date();
let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
let mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(d);
let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
x.innerHTML = (`${mo} ${da}, ${ye}`);
