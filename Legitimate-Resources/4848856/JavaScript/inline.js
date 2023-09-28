				 

<!--

var tags_before_clock = "<font face='geneva, arial, helvetica, sans-seif' size='2' color='#oooooo'>It is now "

var tags_middle_clock = "on"

var tags_after_clock  = "</font>"

if(navigator.appName == "Netscape") {

document.write('<layer id="clock"></layer><br>');

}

if (navigator.appVersion.indexOf("MSIE") != -1){

document.write('<span id="clock"></span>');

}



DaysofWeek = new Array()

  DaysofWeek[0]="Sunday"

  DaysofWeek[1]="Monday"

  DaysofWeek[2]="Tuesday"

  DaysofWeek[3]="Wednesday"

  DaysofWeek[4]="Thursday"

  DaysofWeek[5]="Friday"

  DaysofWeek[6]="Saturday"



Months = new Array()

  Months[0]="January"

  Months[1]="February"

  Months[2]="March"

  Months[3]="April"

  Months[4]="May"

  Months[5]="June"

  Months[6]="July"

  Months[7]="August"

  Months[8]="September"

  Months[9]="October"

  Months[10]="November"

  Months[11]="December"



function upclock(){

var dte = new Date();

var hrs = dte.getHours();

var min = dte.getMinutes();

var sec = dte.getSeconds();

var day = DaysofWeek[dte.getDay()]

var date = dte.getDate()

var month = Months[dte.getMonth()]

var year = dte.getFullYear()



var col = ":";

var spc = " ";

var com = ",";

var apm;



if (date == 1 || date == 21 || date == 31)

  {ender = "<sup>st</sup>"}

else

if (date == 2 || date == 22)

  {ender = "<sup>nd</sup>"}

else

if (date == 3 || date == 23)

  {ender = "<sup>rd</sup>"}



else

  {ender = "<sup>th</sup>"}



if (12 < hrs) {

apm="<font size='-1'>pm</font>";

hrs-=12;

}



else {

apm="<font size='-1'>am</font>";

}



if (hrs == 0) hrs=12;

if (hrs<=9) hrs="0"+hrs;

if (min<=9) min="0"+min;

if (sec<=9) sec="0"+sec;



if(navigator.appName == "Netscape") {

document.clock.document.write(tags_before_clock+hrs+col+min+col+sec+apm+spc+tags_middle_clock+spc+day+com+spc+date+ender+spc+month+com+spc+year+tags_after_clock);

document.clock.document.close();

}



if (navigator.appVersion.indexOf("MSIE") != -1){

clock.innerHTML = tags_before_clock+hrs+col+min+col+sec+apm+spc+tags_middle_clock+spc+day+com+spc+date+ender+spc+month+com+spc+year+tags_after_clock;

}

}



setInterval("upclock()",1000);

//-->

