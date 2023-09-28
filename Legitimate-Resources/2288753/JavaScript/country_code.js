(function(){'use strict';var site_locale=window.site_locale;var user_locale=window.user_locale;var site_location=typeof site_locale!=='undefined'&&site_locale!==''?site_locale.toLowerCase():'au';var geo_ip=checkCountryExist(user_locale)?user_locale.toLowerCase():site_location;if(geo_ip==='uk'){geo_ip='gb';}
var options={nationalMode:false,formatOnInit:false,preferredCountries:[geo_ip],initialCountry:geo_ip};if(typeof framework_location!=='undefined'){options.utilsScript=framework_location+'country_code/intlTelInput/js/utils.js?id=1571210915';}
function setCountryCode(target){if(typeof target==='undefined'){target=$('[data-phone-flags]');}
if(!target.length){return;}
var value=target.data('phoneFlags');if(value!==true&&typeof value==='string'){options.initialCountry=value;}
if(target.closest('form').data('hideDialCode')!==true){options.autoHideDialCode=false;}
target.intlTelInput('destroy');target.intlTelInput(options);target.off('countrychange').on('countrychange',function(e,countryData){var id=$('[name="phone_country_code"]');if(id.length){id.val(countryData.dialCode);}});target.trigger('countrychange',{dialCode:target.intlTelInput('getSelectedCountryData').dialCode});}
function checkCountryExist(country){var countryData=$.fn.intlTelInput.getCountryData();if(!countryData||!country){return false;}
country=country.toLowerCase();var list=countryData.filter(function(e){return e.iso2===country;}).length;return Boolean(list);}
setCountryCode();window.Public.init_country_flags_for_phones=setCountryCode;})();