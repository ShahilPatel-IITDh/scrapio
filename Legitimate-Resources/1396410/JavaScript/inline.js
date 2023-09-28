
/*
Simple Blogger Tag Cloud Widget
by Raymond May Jr.
http://www.compender.com
Released to the Public Domain
*/

//Settings / Variables
var max = 150; //max css size (in percent)
var min = 70; //min css size (in percent)
var showCount = false;  // show counts? true for yes, false for no
var minCount = 1;  // what is the minimum count for a tag to be shown? 1 for all


//Begin code:
var range = max - min;

//Build label Array
var labels = new Array();

labels.push("إبداع");

labels.push("أخبار الفنانين");

labels.push("تكنولوجيا");

labels.push("صحة");

labels.push("صور");

labels.push("طرائف");

labels.push("غرائب و عجائب");

labels.push("فيديوهات");


//URLs
var urls = new Array();

urls.push("http://3aja2iib.blogspot.com/search/label/%D8%A5%D8%A8%D8%AF%D8%A7%D8%B9");

urls.push("http://3aja2iib.blogspot.com/search/label/%D8%A3%D8%AE%D8%A8%D8%A7%D8%B1%20%D8%A7%D9%84%D9%81%D9%86%D8%A7%D9%86%D9%8A%D9%86");

urls.push("http://3aja2iib.blogspot.com/search/label/%D8%AA%D9%83%D9%86%D9%88%D9%84%D9%88%D8%AC%D9%8A%D8%A7");

urls.push("http://3aja2iib.blogspot.com/search/label/%D8%B5%D8%AD%D8%A9");

urls.push("http://3aja2iib.blogspot.com/search/label/%D8%B5%D9%88%D8%B1");

urls.push("http://3aja2iib.blogspot.com/search/label/%D8%B7%D8%B1%D8%A7%D8%A6%D9%81");

urls.push("http://3aja2iib.blogspot.com/search/label/%D8%BA%D8%B1%D8%A7%D8%A6%D8%A8%20%D9%88%20%D8%B9%D8%AC%D8%A7%D8%A6%D8%A8");

urls.push("http://3aja2iib.blogspot.com/search/label/%D9%81%D9%8A%D8%AF%D9%8A%D9%88%D9%87%D8%A7%D8%AA");


//Counts
var counts = new Array();

counts.push("5");

counts.push("1");

counts.push("5");

counts.push("9");

counts.push("6");

counts.push("6");

counts.push("20");

counts.push("3");


//Number sort funtion (high to low)
function sortNumber(a, b)
{
return b - a;
}

//Make an independant copy of counts for sorting
var sorted = counts.slice();

//Find the largest tag count
var most = sorted.sort(sortNumber)[0];

//Begin HTML output
for (x in labels)
{
if(x != "peek" && x != "forEach" && counts[x] >= minCount)
{
//Calculate textSize
var textSize = min + Math.floor((counts[x]/most) * range);
//Show counts?
if(showCount)
{
var count = "(" + counts[x] + ")";
}else{
var count = "";
}
//Output
document.write("<span style='font-size:" + textSize + "%'><a href='" + urls[x] + "' style='text-decoration:none;'>" + labels[x] + count + "</a></span> " );
}
}
