//<!--
//1@@m4

function Pop(path,ficenter,price,isMotorcycle)
{var popWinHt="";if((isMotorcycle!="")&&(ficenter!=""))
{path=path+"?isMotorcycle="+isMotorcycle+"&ficenter=1";popWinHt="400";}
if((isMotorcycle!="")&&(ficenter==""))
{path=path+"?isMotorcycle="+isMotorcycle+"&ficenter=";popWinHt="400";}
if((isMotorcycle=="")&&(ficenter!=""))
{path=path+"?isMotorcycle=&ficenter=1";popWinHt="400";}
if((isMotorcycle=="")&&(ficenter==""))
{path=path+"?isMotorcycle=&ficenter=";popWinHt="290";}
if(price!=""){path=path+"&price="+price;}else{path=path+"&price=0";}
hw=window.open(path,"MonthlyPaymentCalc","height="+popWinHt+",width=375,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=no,titlebar=no");hw.focus();return false;}
function roundAmount(n){var s=""+Math.round(n*100)/100
var i=s.indexOf('.')
if(i<0)return s+".00"
var t=s.substring(0,i+1)+s.substring(i+1,i+3)
if(i+2==s.length)t+="0"
return t;}
function stripComma(target){if(null!=target)
{splitstring=target.split(",");if(null!=splitstring)
{target=splitstring[0];for(j=1;j<splitstring.length;j++)
{target+=splitstring[j];}}}
return target;}
function stripNonNumeric(pPrice)
{var tmp="",chr;for(var i=0;i<pPrice.length;i++)
{chr=pPrice.charAt(i);if((chr=='.')||!isNaN(parseInt(chr)))
tmp+=chr;}
return tmp;}
function GetYears(months){return months/12;}
function MonthlyPaymentCalc(){price=document.MonthlyPayment.price.value;price=stripComma(price);APR=stripNonNumeric(document.MonthlyPayment.APR.value);payment=document.MonthlyPayment.payment.value;payment=stripComma(payment);for(var i=0;i<document.MonthlyPayment.months.length;i++){if(document.MonthlyPayment.months[i].selected==true){months=document.MonthlyPayment.months[i].value;}}
APR=APR/100;temp1=(1+(APR/12));temp2=GetYears(months);temp3=Math.pow((temp1),-(temp2*12));if(price.indexOf(".")!=-1){_alert("Decimals should not be entered in the total price box");return false;}else if(payment.indexOf(".")!=-1){_alert("Decimals should not be entered in the down payment box");return false;}else{RemainingPayment=price-payment;if(RemainingPayment>0){EstMonthlyPayment=(RemainingPayment*APR)/(12*(1-temp3));EstMonthlyPayment=roundAmount(EstMonthlyPayment);if(isNaN(EstMonthlyPayment))
EstMonthlyPayment="0.00";}else{EstMonthlyPayment="0.00";}
document.MonthlyPayment.EstMonthlyPayment.value=EstMonthlyPayment;return false;}}
function _alert(str)
{if(typeof(ebay)!="undefined")
ebay.oDocument.messageBox(str);else
alert(str);}
// b=6037610 -->