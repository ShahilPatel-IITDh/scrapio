//tealium universal tag - utag.loader ut4.0.202307060742, Copyright 2023 Tealium.com Inc. All Rights Reserved.
var utag_condload=false;window.__tealium_twc_switch=false;try{window.utag_data=window.utag_data||{};utag_data.do_not_track="";if(navigator.doNotTrack=="yes"||navigator.doNotTrack=="1"||navigator.msDoNotTrack=="1"||window.doNotTrack=="1"){utag_data.do_not_track="yes";}}catch(e){console.log(e);}
if(!utag_condload){try{try{window.SCS=window.SCS||{};(function(SCS){"use strict";SCS.tealium={setCookieMinutes:function(name,value,minutes,domain,path){if(!name)return;let expires="",domainString=domain?"; domain="+domain:"",pathString=path?"; path="+path:"; path=/",secure=location.protocol==='https:'?'; secure':'';value=value||"";if(minutes){let date=new Date();date.setTime(date.getTime()+(minutes*60*1000));expires="; expires="+date.toUTCString();}
document.cookie=name+"="+value+expires+domainString+pathString+secure;},setCookieHours:function(name,value,hours,domain,path){this.setCookieMinutes(name,value,hours*60,domain,path);},setCookieDays:function(name,value,days,domain,path){this.setCookieHours(name,value,days*24,domain,path);},setCookieYears:function(name,value,years,domain,path){this.setCookieDays(name,value,years*365,domain,path);},setCookie:function(name,value,days,domain,path){this.setCookieDays(name,value,days,domain,path);},getCookie:function(name){if(name&&document.cookie.length>0){let cookieStart=document.cookie.indexOf(name+"=");if(cookieStart>-1){cookieStart=cookieStart+name.length+1;let cookieEnd=document.cookie.indexOf(";",cookieStart);if(cookieEnd===-1){cookieEnd=document.cookie.length;}
return unescape(document.cookie.substring(cookieStart,cookieEnd));}}
return"";},deleteCookie:function(name,domain,path){this.setCookie(name,"",-1,domain,path);},isObject:function(obj){return(typeof obj==='object'&&obj!==null);},isEmptyObject:function(obj){if(!obj||!this.isObject(obj)){return false;}else{if(Object&&Object.keys){return Object.keys(obj).length===0&&obj.constructor===Object;}else{for(let prop in obj){if(obj.hasOwnProperty(prop)){return false;}}
return JSON.stringify(obj)===JSON.stringify({});}}},isArray:function(arr){return Array.isArray(arr);},isEmptyArray:function(arr){return Array.isArray(arr)&&arr.length===0;},isNonEmptyArray:function(arr){return Array.isArray(arr)&&arr.length>0;},isString:function(value){return typeof value==='string'||value instanceof String;},isNumber:function(value){return typeof value==='number'&&isFinite(value);},isFunction:function(value){return typeof value==='function';},isNull:function(value){return value===null;},isDefined:function(value){return typeof value!=='undefined';},isUndefined:function(value){return!this.isDefined(value);},isBoolean:function(value){return typeof value==='boolean';},isRegExp:function(value){return value&&typeof value==='object'&&value.constructor===RegExp;},isDate:function(value){return value instanceof Date;},toArray:function(value){if(typeof value==="undefined"||value===null){return[];}else if(Array.isArray(value)){return value;}else{return[value];}},resolvePath:function(object,path){if(!this.isObject(object))return void 0;if(typeof path!=="string"||path==="")return object;return path.split('.').reduce(function(previous,current){if(typeof current==='string'){current=current.replace(/^\[(.*)\]$/,'$1');}
if(SCS.tl.isArray(previous)&&current==='last'){return SCS.tl.lastItem(previous);}else{return previous?previous[current]:undefined;}},object);},persist:function(key,value,days){days=days||1;if(this.localStorageAvailable()){localStorage.setItem(key,value);}else{this.setCookieDays(key,value,days);}},removePersistedValue:function(key){if(this.localStorageAvailable()){localStorage.removeItem(key);}else{this.deleteCookie(key);}},setSessionValue:function(key,value){try{if(this.sessionStorageAvailable()){sessionStorage.setItem(key,value);}else{this.persist(key,value,1);}}catch(error){SCS.dl.debug('could not persist in session',key,value,error.message);}},getSessionValue:function(key){try{if(this.sessionStorageAvailable()){return sessionStorage.getItem(key);}else{return this.getPersistedValue(key);}}catch(error){SCS.dl.debug('could not get persisted session value',key,error.message);}},removeSessionValue:function(key){try{if(this.sessionStorageAvailable()){sessionStorage.removeItem(key);}else{this.removePersistedValue(key);}}catch(error){SCS.dl.debug('could not delete persisted session value',key,error.message);}},getPersistedValue:function(key){if(this.localStorageAvailable()){return localStorage.getItem(key);}else{return this.getCookie(key);}},localStorageAvailable:function(){try{localStorage.setItem("foo","foo");let item=localStorage.getItem("foo");localStorage.removeItem("foo");return item==="foo";}catch(e){}
return false;},sessionStorageAvailable:function(){try{sessionStorage.setItem("foo","foo");sessionStorage.removeItem("foo");return true;}catch(e){}
return false;},pushToUtagDataArray:function(arrayName,value){if(typeof window.utag_data!=="undefined"&&typeof arrayName==="string"&&arrayName!==""&&typeof value!=="undefined"){window.utag_data[arrayName]=window.utag_data[arrayName]||[];window.utag_data[arrayName].push(value);}},setUtagDataProp:function(property,value){if(typeof window.utag_data!=="undefined"&&typeof property==="string"&&property!==""&&typeof value!=="undefined"){window.utag_data[property]=value;}},isReady:function(){const consentReadyOrIgnored=window.show_consent==='true'?document.cookie.indexOf("CONSENTMGR")>-1:true;return consentReadyOrIgnored&&!!(window.utag&&window.utag.handler&&window.utag.handler.iflag===1);},addLeadingZero:function(value,digits){digits=digits?digits*-1:-2;if(typeof value!=='undefined'&&!isNaN(value)){return('0'+value).slice(digits);}else{return value;}},isNotProduction:function(){let env=SCS.dl.get('platform.environment'),cookie=this.getCookie('utag_env_swisscom_main');if(cookie){SCS.dl.debug('cookie set to',cookie);return this.includes(cookie,'/dev/')||this.includes(cookie,'/qa/');}
return env!=='prod';},isProduction:function(ddoObject){let env=SCS.dl.get('platform.environment',undefined,ddoObject),cookie=this.getCookie('utag_env_swisscom_main');if(cookie){SCS.dl.debug('cookie set to',cookie);return this.includes(cookie,'/prod/');}
return env==='prod';},isDebugMode:function(){return this.includes(document.cookie,"utagdb=true");},isActive:function(startDate,endDate){let validStartDate=startDate?this.isNotProduction()||this.isInThePast(startDate):true,validEndDate=endDate?!this.isInThePast(endDate):true;return validStartDate&&validEndDate;},isInThePast:function(dateString){if(typeof dateString==="string"){if(/\d{2,4}-\d{1,2}-\d{1,2}/.test(dateString)){let date=new Date(dateString);return Date.now()>date;}}
return false;},isLoggedIn:function(){return this.getCookie('IW4Login')==='login';},isEUVisitor:function(){return!!(window.geolocation&&window.geolocation.euvisitor);},clone:function(obj){try{return JSON.parse(JSON.stringify(obj));}catch(e){SCS.dl.debug('warning: unable to clone given object, returning empty object',obj);return{};}},mergeObjects:function(){let extended={},deep=false,i=0;if(typeof(arguments[0])==='boolean'){deep=arguments[0];i++;}
if(deep&&(Array.isArray(arguments[1])||Array.isArray(arguments[2]))){extended=[];}
let merge=function(obj){for(let prop in obj){if(obj.hasOwnProperty(prop)){if(deep&&SCS.tl.isObject(obj[prop])){extended[prop]=SCS.tl.mergeObjects(true,extended[prop],obj[prop]);}else{extended[prop]=obj[prop];}}}};for(;i<arguments.length;i++){merge(arguments[i]);}
return extended;},stripTags:function(input){if(!this.isString(input)){return input;}else{let regex=/(<([^>]+)>)/ig;return input.replace(regex,"");}},pageIsNotBlacklisted:function(){let libMainBlacklistLoadRuleId=13189;return window.utag&&window.utag.cond?!!(window.utag.cond[libMainBlacklistLoadRuleId]):true;},pageIsBlacklisted:function(){return!this.pageIsNotBlacklisted();},cleanArray:function(arr,values){if(Array.isArray(arr)){values=this.toArray(values);arr=arr.filter(function(v){return values.indexOf(v)===-1;});}
return arr;},cleanObject:function(obj,blacklistedItems){if(!this.isObject(obj))return;blacklistedItems=blacklistedItems||["",0,undefined];Object.keys(obj).forEach(function(k){return blacklistedItems.indexOf(obj[k])>=0&&delete obj[k];});},lastItem:function(arr){if(!Array.isArray(arr)||arr.length===0){return void 0;}else{return arr[arr.length-1];}},getIntersectingArrayIndices:function(source,target){let result=[];if(Array.isArray(source)&&Array.isArray(target)){for(let i=0;i<source.length;i++){if(this.includes(target,source[i])){this.pushUnique(result,i);}}}
return result;},arrElemsInString:function(arr,strToCheck,ignoreCase){if(!arr||!strToCheck)return false;return this.toArray(arr).find(function(element){return ignoreCase?strToCheck.toLowerCase().indexOf(element.toLowerCase())>=0:strToCheck.indexOf(element)>=0;})!==undefined;},removeTrailingSlashes:function(str){return this.isString(str)?str.replace(/^(\/)+|(\/)+$/g,''):str;},replaceArray:function(str,find,replace){if(!this.isString(str)||!Array.isArray(find)||!Array.isArray(replace)||find.length!==replace.length){SCS.dl.debug('invalid parameters, nothing replaced',find,replace);}else{for(let i=0;i<find.length;i++){let regex=new RegExp(find[i],"g");str=str.replace(regex,replace[i]);}}
return str;},pushUnique:function(arr,value){if(Array.isArray(arr)){if(/(function|string)/.test(typeof value)){for(const item of arr){if(value.toString()===item.toString()){return;}}
arr.push(value);}else{if(arr.indexOf(value)<0){arr.push(value);}}}},includes:function(arrOrStr,value){if(this.isString(arrOrStr)){if(typeof value==='undefined'||(arrOrStr!==value&&value==='')){return false;}else{return arrOrStr.indexOf(value)>-1;}}else if(Array.isArray(arrOrStr)){return arrOrStr.indexOf(value)>=0;}else{return false;}},getSelectors:function(urlString){urlString=urlString||document.location.href;if(this.isString(urlString)){let result=/.*\/\w+\.([\w.]+)\.html/.exec(urlString);return result?result[1].split('.'):[];}else{return[];}},hasSelector:function(selector,urlString){let selectors=this.getSelectors(urlString);return selectors.indexOf(selector)>-1;},hasAllSelectors:function(searchSelectors,urlString){let selectors=this.getSelectors(urlString);searchSelectors=this.toArray(searchSelectors);if(selectors.length&&searchSelectors.length){let found=true;for(const selector of searchSelectors){found&=selectors.indexOf(selector)>-1;}
return!!found;}else{return false;}},hasAnySelector:function(searchSelectors,urlString){let selectors=this.getSelectors(urlString);searchSelectors=this.toArray(searchSelectors);if(selectors.length&&searchSelectors.length){let found=false;for(const selector of searchSelectors){found|=selectors.indexOf(selector)>-1;}
return!!found;}else{return false;}},getProductCategory:function(product){if(product&&Array.isArray(product.productCategory_list)){for(const category of product.productCategory_list){if(category.name==='ProductCategoryMaster'&&category.value){return category.value.replace('+','').replace(':','');}}}else{return'';}},appendToList:function(list,newValue,delimiter){if(typeof newValue==='undefined'){return list;}
delimiter=delimiter||',';if(!list){return newValue;}else{let arr=list.split(delimiter);this.pushUnique(arr,newValue);arr=this.cleanArray(arr,['']);arr.sort();return arr.join(delimiter);}},containsEmail:function(str){return/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(str);},removeQueryData:function(value){if(!this.isString(value)){return value;}else{let indexes=[];let delimiters=['?','#','&'];for(const delimiter of delimiters){let index=value.indexOf(delimiter);if(index>-1){indexes.push(index);}}
if(indexes.length){indexes.sort();return value.substr(0,indexes[0]);}}
return value;},usesNewConversions:function(){return SCS.dl.get('conversion.category',false);},isValidConversion:function(){let whiteListedConversions={'awareness':/^(accessories|cloud|devices|entertainment|internet|internet_tv_voip|mobile|smartlife|streaming|tv|voip)$/i,'basket':/^(product_added|product_removed|viewed|selected)$/i,'checkout':/^(error|start|step|summary)$/i,'config':/^(error|start|step)$/i,'engagement':/^(comment|rate)$/i,'form':/^(start|step|submitted|summary)$/i,'lead':/^(appointment|call|callback|chat|contact|content|crm|download|newsletter|offer|register|sms|watchlist)$/i,'lead-interest':/^(appointment|call|callback|chat|contact|content|crm|download|newsletter|offer|register|sms|watchlist)$/i,'offer':/^(preselected|recommended|remembered|resumed|selected|viewed)$/i,'order':/^(purchased|pickup-success|voucher)$/i,'poi':/^(app|appstore|contact|demo|download|feedback|kuce|offer|registration|report|others)$/i,'service':/^(selected|interested)$/i,'selfcare':/^(download|\w*-\w*(-\w*)?)$/i},conversion={category:{isSet:SCS.dl.get('conversion.category',false),isValid:false},detail:{isSet:SCS.dl.get('conversion.detail',false),isValid:false}};if(conversion.category.isSet){conversion.category.isValid=!!whiteListedConversions[SCS.dl.get('conversion.category')];}
if(conversion.category.isValid){conversion.detail.isValid=whiteListedConversions[SCS.dl.get('conversion.category')].test(SCS.dl.get('conversion.detail'));}
if(!conversion.category.isValid||!conversion.detail.isValid){SCS.dl.debug("SCS.datalayer.data does not accept invalid values for the conversion object. All values for the conversion object will be discarded for Analytics.");}
return(conversion.category.isValid&&conversion.detail.isValid);},getMarketingID:function(){let persadCid=this.getCookie('persad_cid');return persadCid&&persadCid.length===64?persadCid:this.getCookie('myscb-uid');},isBasketPage:function(category,detail){category=category||SCS.dl.get('conversion.category');detail=detail||SCS.dl.get('conversion.detail');return category==='basket'&&detail==='viewed';},isProductDetailPage:function(path){path=path||SCS.dl.get('page.path','');return path.indexOf('/details/')>-1||path.indexOf('mobile/devices_new/device_new/')>-1;},getConsentState:function(category){if(!utag||!utag.gdpr||!category){return false;}else{let result=false;if(category){let consentState=utag.gdpr.getConsentState();if(typeof consentState==="number"){if(consentState===0){result=utag.gdpr.preferences_prompt.defaultState||false;}else if(consentState===1){result=true;}}else{try{result=consentState.filter(function(item){return item.name===category;})[0].ct==='1';}catch(e){}}}
SCS.dl.debug(result);return result;}},isPurchase:function(data){data=data||SCS.dl.data;const conversionId=SCS.dl.get('conversion.id',undefined,data);const conversionDetail=SCS.dl.get('conversion.detail',undefined,data);return conversionId==='purchased'||conversionDetail==='purchased';},upperCaseFirstCharacter:function(input){if(typeof input!=="string")return undefined;return input.charAt(0).toUpperCase()+input.slice(1);},_isWhitelistedURL:function(){try{const platform=SCS.dl.get("platform.platform");const pagePath=SCS.dl.get("page.path");if(platform==="order"){if(/^order\/(oshop|wireless|wireline)\/.*\/checkout\/confirmation/.test(pagePath))return true;if(/\/store\/checkout\/confirmation/.test(pagePath))return true;if(/^one-to-one\/|^personal-offer\//.test(pagePath))return true;}
return false;}catch(e){SCS.datalayer.debug(">>> error while checking for whitelisted URL",e.message);return false;}},isBlacklistedURL:function(url){try{url=typeof url==='string'?url:window.location.search;const whitelisted=this._isWhitelistedURL(url);if(whitelisted)return false;const regexes=[/\b(title|anrede|gender|fname|first[_-]?name|last[_-]?name|lname|geburtsdatum|email|nl_email|address|strasse|street|housename|city|zip|plz|postal[_-]?code|korrespondenzsprache)(=|%3D).*/i,/\b(account[_-]?number|care[_-]?of|country[_-]?code|externalPhoneNumber|internalPhoneNumber|userId|lead[_-]?[ck]onta[ck]t.*)(=|%3D).*/i,/\b(mobile[_-]?id|mobile[_-]?num[bm]er|mobile.*tele(f|ph)one*|msisdn|nationalit(aet|y)|num[bm]er|ort|phone_?number|personaldata)(=|%3D).*/i,/\b(respermid|respermnum[bm]er|rufnummer|scn|selectedwireless|signaturedate|sim|tele(f|ph)onenum[bm]er|uniqueAddressId|user[_-]?id)(=|%3D).*/i,/(41|423)\d{7,9}.*/];if(regexes.some(regex=>regex.test(document.location.search))){SCS.datalayer.debug(">>> BLOCKED - found blacklisted query params!");return true;}
const paths=['mydata/username','mydata/password','sbcon/online',];if(paths.some(path=>SCS.dl.get("page.path",'').toLowerCase().includes(path))){SCS.datalayer.debug(">>> BLOCKED - found blacklisted page.path");return true;}
return false;}catch(e){SCS.datalayer.debug(">>> error while checking for blacklisted URL",e.message);return false;}}};if(Number.parseInt===undefined){Number.parseInt=window.parseInt;}
if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector;}
if(!Element.prototype.closest){Element.prototype.closest=function(s){let el=this;do{if(Element.prototype.matches.call(el,s))return el;el=el.parentElement||el.parentNode;}while(el!==null&&el.nodeType===1);return null;};}
SCS.tl=SCS.tl||SCS.tealium;}(window.SCS));}catch(e){console.log(e)}}catch(e){console.log(e);}}
if(!utag_condload){try{try{window.SCS=window.SCS||{};(function(SCS){"use strict";SCS.udoSetter={_setterArray:[],push:function(setterFunction){if(typeof setterFunction==="function"){SCS.tealium.pushUnique(this._setterArray,setterFunction);}},runSetters:function(udo){for(var i=0;i<this._setterArray.length;i++){try{this._setterArray[i](udo);}catch(e){SCS.datalayer.debug("52_UDO_Setter.js > runSetters > error",e.message);SCS.datalayer.debug(e);}}}}}(window.SCS));}catch(e){console.log(e)}}catch(e){console.log(e);}}
if(!utag_condload){try{udoSetPageviewCounter=function(udo){udo.sys_pageview_count=udo.sys_pageview_count||1;var cookieValue=parseInt(SCS.tealium.getCookie('pageview_count'));if(!isNaN(cookieValue)){udo.sys_pageview_count=cookieValue+1;}
SCS.tealium.setCookie('pageview_count',udo.sys_pageview_count,1);}
if(SCS.tealium.isObject(SCS.udoSetter)){SCS.udoSetter.push(udoSetPageviewCounter);}}catch(e){console.log(e);}}
if(!utag_condload){try{try{udoSetPageType=function(udo){if(SCS.tealium.isObject(udo)){if((typeof udo.page_path!=='undefined')&&(typeof udo.sys_platform!=='undefined')&&(udo.sys_platform==='scportal')){var pagePath=udo.page_path;switch(pagePath){case"":udo.page_type='home';break;case"find":udo.page_type='search';break;default:break;}
if(typeof udo.page_cfu!=='undefined'&&udo.page_cfu==='ent'){if(typeof udo.page_template!=='undefined'&&udo.page_template==='Enterprise Product Detail Page'){udo.page_type='product';}}
if(udo.page_type&&SCS.datalayer.data&&SCS.datalayer.data.page){SCS.datalayer.data.page.pagetype=udo.page_type;}}}}
if(SCS.tealium.isObject(SCS.udoSetter)){SCS.udoSetter.push(udoSetPageType);}}catch(e){console.log(e)}}catch(e){console.log(e);}}
if(!utag_condload){try{try{if(SCS.tealium.isObject(SCS.udoSetter)&&SCS.tealium.isObject(window.utag_data)){SCS.udoSetter.runSetters(window.utag_data);}}catch(e){console.log(e)}}catch(e){console.log(e);}}
if(!utag_condload){try{if(!document.cookie.includes("consent_poc")){window.utag_cfg_ovrd=window.utag_cfg_ovrd||{};window.utag_cfg_ovrd.consentPeriod=3*30;window.utag_cfg_ovrd.noview=true;window.utag_data=window.utag_data||{};window.SCS=window.SCS||{};window.SCS.tiq=window.SCS.tiq||{};window.SCS.tiq.trackingQueue=window.SCS.tiq.trackingQueue||[];window.logEnabled=window.logEnabled||(document.cookie.indexOf('utagdb=true')>=0&&window.console&&window.console.log);SCS.datalayer={version:"1.0",c3objects:['profile','address'],data:{},xhr:undefined,amErrors:[],executionContext:undefined,resetCallbacks:[],_initialData:undefined,prefixes:{system:"sys",cart:"order"},specialPrefixes:{component:'cust',platform:'sys',device:'sys'},reversePrefixes:{"page":"page","sys":"platform"},callHistory:[],useSendBeacon:false,ddoSchema:{platform:{required:true,type:'platformSchema'},page:{required:true,type:'pageSchema'},product:{required:false,type:'productSchema'},product_list:{required:false,type:'productSchema_list'},cart:{required:false,type:'cartSchema'},event:{required:false,type:'eventSchema'},conversion:{required:false,type:'conversionSchema'},profile:{required:false,type:'profileSchema'},userIdentification_list:{required:false,type:'userIdentificationSchema_list'},device:{required:false,type:'deviceSchema'},entryChannel:{required:false,type:'entryChannelSchema'},version:{required:false,type:'string'},timestamp:{required:false,type:'integer'}},platformSchema:{context:{required:false,type:"string"},environment:{required:true,type:"string",forceNonEmpty:true},platform:{required:true,type:"string",forceNonEmpty:true},module:{required:false,type:"string"},type:{required:false,type:"string"}},pageSchema:{path:{required:true,type:'string'},language:{required:false,type:'string'},cfu:{required:false,type:'string'},charset:{required:false,type:'string'},viewtype:{required:false,type:'string'},pagetype:{required:false,type:'string'},template:{required:false,type:'string'},onsiteSearchTerm:{required:false,type:'string'},onsiteSearchResults:{required:false,type:'number'},destinationURL:{required:false,type:'string'},referringURL:{required:false,type:'string'},type:{required:false,type:'string'},campId:{required:false,type:'string'},topics:{required:false,type:'array'},tags:{required:false,type:'array'},scCamp:{required:false,type:'string'}},productSchema:{id:{required:false,type:"string"},key:{required:false,type:"string"},name:{required:false,type:"string"},brand:{required:false,type:"string"},quantity:{required:false,type:"number"},action:{required:false,type:"string"},priceOtc:{required:false,type:"number","utag_data_name":"price"},priceRecurring:{required:false,type:"number","utag_data_name":"recurring_price"},subscriptionRuntime:{required:false,type:"number","utag_data_name":"subscription_runtime"},masterSystem:{required:false,type:"string"},productCategory_list:{required:false,type:"productCategorySchema_list"},categorymaster:{required:false,type:"string"},category:{required:false,type:"string"},category2:{required:false,type:"string"},categories:{required:false,type:""}},productCategorySchema:{name:{required:false,type:"string"},value:{required:false,type:"string"}},cartSchema:{delivery:{required:false,type:"string"},ordercase:{required:false,type:"string","utag_data_name":"case"},orderid:{required:false,type:"string","utag_data_name":"id"},subscriptionid:{required:false,type:"string",},processid:{required:false,type:"string",},ordertotal:{required:false,type:"number","utag_data_name":"total"},ordertotalrecurring:{required:false,type:"number","utag_data_name":"total_recurring"},product_list:{required:false,type:"productSchema_list"},type:{required:false,type:"string"}},eventSchema:{action:{required:false,type:"string"},location:{required:false,type:"string"},category:{required:false,type:"string"},label:{required:false,type:"string"},linkName:{required:false,type:"string"},rawdata:{required:false,type:""}},conversionSchema:{id:{required:false,type:"string"},subject:{required:false,type:"string"},category:{required:false,type:"string"},detail:{required:false,type:"string"},class:{required:false,type:"string"},},profileSchema:{loggedIn:{required:false,type:"string"},cfu:{required:false,type:"string"},subSegment:{required:false,type:"string"},},userIdentificationSchema:{id:{required:true,type:"string"},system:{required:true,type:"string"}},deviceSchema:{applicationType:{required:false,type:"string"},deviceType:{required:false,type:"string"},os:{required:false,type:"string"}},udoSchema:{uuid:{required:false,type:"string"}},initialize:function(){this.resetCallbacks=[SCS.datalayer._resetSpecificUdoParameters];},get:function(path,defaultReturnValue,ddoObject){ddoObject=ddoObject||this.data;let result=SCS.tealium.resolvePath(ddoObject,path);if(typeof result==='undefined'&&typeof defaultReturnValue!=='undefined'){result=defaultReturnValue;}
return result;},_obfuscateSingleProduct:function(product){if(product&&product.id==='OCI_PHONENUMBER'&&product.name){product.name=this._maskNumber(product.name);}},_obfuscateProductList:function(productList){if(SCS.tealium.isNonEmptyArray(productList)){for(const element of productList){this._obfuscateSingleProduct(element);}}},_obfuscatePersonalData:function(data){if(SCS.tealium.isObject(data)){this._obfuscateSingleProduct(this.get('product',undefined,data));this._obfuscateProductList(this.get('product_list',undefined,data));this._obfuscateProductList(this.get('cart.product_list',undefined,data));}},domReady:function(callback){document.readyState==="interactive"||document.readyState==="complete"?callback():document.addEventListener("DOMContentLoaded",callback);},_performValidityChecks:function(data){let env=this.get('platform.environment',undefined,data);if(!(/^(dev|qa|prod)$/.test(env))){this.trackError('invalid','env:'+env);}
if(!window.utagSyncLoaded&&this.executionContext==='page'){window.utagSyncLoaded=true;this.trackError('warning','utag.sync.js missing');}},_checkMandatoryProperty:function(data,path,url){let value=this.get(path,undefined,data);url=url||document.location.href;if(typeof value==='undefined'){let result=this.get(path);if(!result&&path==='page.cfu'){let cfuRegex=/mode=catalog(RES|SME)/gi,match=cfuRegex.exec(url);if(match&&match.length>=2&&SCS.tealium.isString(match[1])){this.trackError('recovered CFU from URL',result);result=match[1].toLowerCase();}}
if(typeof result==='undefined'){this.trackError('missing',path);}
return result;}else{return value;}},_checkMandatoryODLObjects:function(data){data=data||{};this._performValidityChecks(data);if(!data.page){this.trackError('critical',this.executionContext+': data.page is empty');if(this.data.page){data.page=this.clone(this.data.page);SCS.datalayer.debug('recovered data.page from previous call');}}else{data.page.path=this._checkMandatoryProperty(data,'page.path');data.page.language=this._checkMandatoryProperty(data,'page.language');data.page.cfu=this._checkMandatoryProperty(data,'page.cfu');}
if(!data.platform){this.trackError('critical',this.executionContext+': data.platform is empty');if(this.data.platform){data.platform=this.clone(this.data.platform);SCS.datalayer.debug('recovered data.platform from previous call');}}else{data.platform.platform=this._checkMandatoryProperty(data,'platform.platform');data.platform.environment=this._checkMandatoryProperty(data,'platform.environment');}
let environment=this.get('platform.environment',undefined,data);if(environment!=='prod'&&document.location.hostname==='www.swisscom.ch'){data.platform.environment='prod';this.trackError('warning','platform.environment "'+environment+'" on prod');}},setAdobeOptIn:function(){try{if(!window?.adobe?.OptInCategories||!window?.adobe?.optIn)return;let consent=SCS.tl.getCookie("CONSENTMGR");if(consent&&consent.length>0){consent=decodeURIComponent(consent);for(let key in adobe.OptInCategories){if(consent.indexOf("c1:1")>-1&&key==="ANALYTICS"){adobe.optIn.approve(adobe.OptInCategories[key],true);}else if(key==="ECID"){adobe.optIn.approve(adobe.OptInCategories[key],true);}else if(consent.indexOf("c6:1")>-1&&key==="AAM"){adobe.optIn.approve(adobe.OptInCategories[key],true);}else if(key==="TARGET"){adobe.optIn.approve(adobe.OptInCategories[key],true);}else{adobe.optIn.deny(adobe.OptInCategories[key],true);}}}
adobe.optIn.complete();}catch(e){SCS.datalayer.trackError('critical','adobe optIn failed');SCS.datalayer.debug(e);}},page:function(data){try{SCS.datalayer.amErrors=[];if(!SCS.tl.isReady()){window.SCS.tiq.trackingQueue.unshift({type:'page',data:JSON.parse(JSON.stringify(data))});return;}
if(typeof window._satellite==='undefined'){SCS.datalayer.trackError('critical','Adobe Launch not loaded');}
this.useSendBeacon=false;data=this.applyOverrides(data);this.processTrackingCall(data,'page');}catch(e){this.trackError('critical','dl.page failed');SCS.datalayer.debug(e);}},track:function(data,delay,typeOverride){try{SCS.datalayer.amErrors=[];if(!SCS.tl.isReady()){window.SCS.tiq.trackingQueue.push({type:'track',data:JSON.parse(JSON.stringify(data))});return;}
if(delay){setTimeout(function(){this.track(data);}.bind(this),delay);}else{data=this.applyOverrides(data);this.useSendBeacon=true;this.processTrackingCall(data,'track',typeOverride);}}catch(e){this.trackError('critical','dl.track call failed');SCS.datalayer.debug(e);}},processTrackingCall:function(odlData,type,typeOverride){this.setAdobeOptIn();if(window.utag_data){delete window.utag_data.tealium_event;}
SCS.datalayer.debug('process tracking queue item',odlData,type);let clone=this.clone(odlData);clone.type=type;this.callHistory.push(clone);if(this._containsSensitiveData(clone)){if(!SCS.tl.isProduction(clone)&&window.console&&window.console.error){console.error('>>> Tealium: potential PII detected. Tracking call terminated.');}
return;}
try{SCS.dl=this;this.executionContext=type;this._checkMandatoryODLObjects(odlData);this._obfuscatePersonalData(odlData);this._storeProfileCfu(odlData);this._patchIssues(odlData);let platformData=SCS.tealium.clone(odlData);platformData.version=this.version;platformData.timestamp=platformData.timestamp||this._getTimestamp();SCS.datalayer.debug("process SCS.datalayer."+type,platformData);this.validate(platformData,this.ddoSchema);this.data=this._enhanceDataObject(platformData);let flatData={};this.toUtagData(this.data,flatData,"ddo_","ddo",this.specialPrefixes);this.mergeUtagData(flatData,window.utag_data);SCS.udoSetter.runSetters(window.utag_data);this._generatePipedValues();const blacklistedPagePaths=/produkte\/.*\/details$/;const page_path=SCS.datalayer.get('page.path');if(/(page|track)/gi.test(type)&&utag&&utag.view&&utag.link){if(type==='page'&&!blacklistedPagePaths.test(page_path)){utag.view(window.utag_data);}else if(type==='track'){utag.link(window.utag_data);}}}catch(e){SCS.datalayer.debug("error processing tracking call",e.message);}
try{this.processWebSDKTrackingCall(odlData,typeOverride||type);}catch(e){SCS.datalayer.debug("error processing WebSDK tracking call",e.message);}},processWebSDKTrackingCall:function(odlData,type){window.adobeDataLayer=window.adobeDataLayer||[];const coreProps=['page','platform','profile'];let data={event:type,eventInfo:{}};const acdlClone=this.clone(odlData);if(acdlClone.platform){acdlClone.platform.name=acdlClone.platform.platform;}
for(const property in acdlClone){if(coreProps.indexOf(property)===-1){data.eventInfo[property]=acdlClone[property];}else{data[property]=acdlClone[property];}}
const blacklistedPagePaths=/produkte\/.*\/details$/;const page_path=SCS.datalayer.get('page.path',undefined,acdlClone);if(blacklistedPagePaths.test(page_path)){delete data.event;}
if(data?.eventInfo?.ignore)return;window.adobeDataLayer.push(data);},_patchProductCategory:function(product,category){category=(category||this.getQueryParameterByName('category')||'').replace(/_RES|_SME/gi,'').toLowerCase();if(product&&category){product.productCategory_list=product.productCategory_list||[];let found=false;for(const element of product.productCategory_list){let productCategory=element;if(productCategory.name==='ProductCategoryMaster'){productCategory.value=category;found=true;SCS.datalayer.trackError('patch','overwriting ProductCategoryMaster');}}
if(!found){product.productCategory_list.push({name:'ProductCategoryMaster',value:category});SCS.datalayer.trackError('patch','adding ProductCategoryMaster');}}
return category;},_sanitizePagePath:function(input,forceLowerCase){if(SCS.tl.isString(input)){input=SCS.tl.stripTags(input);input=SCS.tl.removeQueryData(input);input=input.replace(/[^a-zA-Z0-9\/\-_:\s]/g,'');input=input.replace(/\s+/g," ");input=input.replace(/\/+/g,'/');input=SCS.tl.removeTrailingSlashes(input);return forceLowerCase?input.toLowerCase():input;}else{return input;}},_patchPagePath:function(trackObj){if(trackObj.page&&trackObj.page.path&&SCS.tl.isString(trackObj.page.path)){let oldPagePath=trackObj.page.path;trackObj.page.path=this._sanitizePagePath(oldPagePath);if(trackObj.page.path!==oldPagePath){this.trackError('patch','Patching incorrect data in page.path');}}},_patchMissingWirelineBundles:function(trackObj){trackObj=trackObj||SCS.datalayer.data;let products=SCS.tl.products.getList(trackObj);let wirelineBundle;let flavourActions=products
.map(function(productItem){if(SCS.tl.products.isWirelineFlavour(productItem)){return productItem.action||"new";}
return undefined;})
.filter(function(v,i,a){return typeof v!=="undefined"&&a.indexOf(v)===i});let wirelineBundleActions=products
.map(function(productItem){if(SCS.tl.products.isWirelineBundle(productItem)){wirelineBundle=productItem;return productItem.action?productItem.action:"new";}else{return undefined;}})
.filter(function(v,i,a){return typeof v!=="undefined"&&a.indexOf(v)===i});let missingBundleActions=flavourActions.filter(function(flavourAction){return wirelineBundleActions.indexOf(flavourAction)===-1;});missingBundleActions.forEach(function(bundleAction){let clone=SCS.tl.clone(wirelineBundle);clone.action=bundleAction;clone.priceRecurring=0;if(trackObj.cart&&trackObj.cart.product_list){trackObj.cart.product_list.push(clone);}else if(trackObj.product_list){trackObj.product_list.push(clone);}});},_patchMissingProductInformationInCheckoutForCartAbandonment:function(trackObj){let platform=this.get('platform.platform',undefined,trackObj),pageType=this.get('page.type',undefined,trackObj);if(platform==="scportal"&&pageType==='product'&&this.executionContext==='track'&&trackObj.event&&trackObj.event.location==='devicefirstsection'&&trackObj.event.category==='button'){let callHistoryWithProducts=this.callHistory.filter(function(entry){return entry.type==='page'&&SCS.datalayer.getProducts(entry).length>0;});if(callHistoryWithProducts.length>0){trackObj.conversion={id:'selectHardware',category:'offer',detail:'selected'};trackObj.product=SCS.datalayer.getProducts(callHistoryWithProducts[0])[0];this._patchProductCategory(trackObj.product);}}},_patchWrongCfu:function(trackObj){let cfu=this.get('page.cfu',undefined,trackObj);let bizRegEx=/^\/\w{2}\/business.*(\.html)?$/;let entRegEx=/^\/\w{2}\/business\/enterprise.*(\.html)?$/;let smeRegEx=/^\/\w{2}\/business\/(sme|kmu|pme|pmi).*(\.html)?$/;if(bizRegEx.test(document.location.pathname)){let newCfu='biz';if(entRegEx.test(document.location.pathname)){newCfu='ent';}else if(smeRegEx.test(document.location.pathname)){newCfu='sme';}
if(cfu!==newCfu){SCS.datalayer.trackError('patch','overwriting cfu');SCS.datalayer.debug(">>> fixing wrong cfu",cfu,newCfu);trackObj.page.cfu=newCfu;}}},_patchIssues:function(trackObj){try{this._patchPagePath(trackObj);this._patchMissingWirelineBundles(trackObj);this._patchMissingProductInformationInCheckoutForCartAbandonment(trackObj);this._patchWrongCfu(trackObj);this._patchPrices(trackObj);}catch(e){SCS.datalayer.debug("error patching",e.message);}},validate:function(data,obj_schema){let schema,result;if(data===null||typeof data!=="object"){return false;}
for(let k in data){if(typeof obj_schema[k]==='undefined'&&k!=='udo'&&k!=='apps'&&k!=='target'&&k!=='search'&&obj_schema!==this.udoSchema&&typeof data[k]!=='function'){SCS.datalayer.debug(k+" is not defined in schema and should not be used");return false;}}
for(let i in obj_schema){if(data[i]!==null&&data[i]!==undefined){if(obj_schema[i].type==="string"){if(typeof data[i]!=="string"){SCS.datalayer.debug(i+" must be a string");return false;}else if(obj_schema[i].forceNonEmpty&&data[i].length===0){SCS.datalayer.debug(i+" can not be an empty string");return false;}
continue;}
if(obj_schema[i].type==="number"){if(!SCS.tealium.isNumber(data[i])){SCS.datalayer.debug(i+" must be a number");return false;}
continue;}
if(obj_schema[i].type==="boolean"){if(!SCS.tealium.isBoolean(data[i])){SCS.datalayer.debug(i+" must be a boolean");return false;}
continue;}
if(obj_schema[i].type.toLowerCase()==="array"){if(!Array.isArray(data[i])){SCS.datalayer.debug(i+" must be an Array");return false;}
continue;}
if(obj_schema[i].type.includes("_list")){if(!Array.isArray(data[i])){SCS.datalayer.debug(i+" must be an Array");return false;}else{schema=obj_schema[i].type.split("_")[0];for(const element of data[i]){result=this.validate(element,this[schema]);if(!result){return false;}}}}else if(obj_schema[i].type.includes("Schema")){if(data[i]===null||typeof data[i]!=="object"){SCS.datalayer.debug(i+" must be an Object");return false;}else{schema=obj_schema[i].type.split("_")[0];result=this.validate(data[i],this[schema]);if(!result){return false;}}}}else{if(obj_schema[i].required){SCS.datalayer.debug(i+" is required");return false;}}}
return data;},createDeviceObject:function(obj){if(!obj.platform){return;}
obj.device={deviceType:SCS.datalayer.getDeviceType(),os:SCS.datalayer.getOs(),applicationType:"browser"};},getDeviceType:function(){let tablet_regex=/(tablet|ipad|playbook)|(android(?!.*(mobi|opera mini)))/g;let mobile_regex=/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/g;if(navigator.userAgent.toLowerCase().match(tablet_regex)){return"tablet";}else if(navigator.userAgent.match(mobile_regex)){return"mobile";}else{return"classic";}},getOs:function(){let iosRegex=/(iPad|iPhone|iPod)/g,androidRegex=/Android/g,windowsRegex=/Windows/g,macRegex=/Mac/g;if(navigator.userAgent.match(iosRegex)){return"ios";}else if(navigator.userAgent.match(androidRegex)){return"android";}else if(navigator.userAgent.match(windowsRegex)){return"windows";}else if(navigator.userAgent.match(macRegex)){return"mac";}else{return"";}},flattenAllProductCategories:function(data){let products=SCS.tealium.toArray(SCS.datalayer.get('product',null,data))
.concat(SCS.datalayer.get('product_list',[],data))
.concat(SCS.datalayer.get('cart.product_list',[],data));this._createCategoriesArray(products);for(const product of products){if(!product.quantity)product.quantity=1;if(Array.isArray(product.productCategory_list)){let name,value;for(const productCategory of product.productCategory_list){name=productCategory.name.toLowerCase();if(name.startsWith('product')){name=name.substring(7);}
if(!(name in this.productSchema)){SCS.datalayer.debug("unknown product category",name);continue;}
value=productCategory.value;product[name]=value;}}}},_createCategoriesArray:function(products){window.utag_data['product_categories']=[];function getCleanValue(value){return(value||'').replace('+','').replace(':','');}
for(const product of products){let categories=[];if(Array.isArray(product.productCategory_list)){for(const productCategory of product.productCategory_list){categories.push(getCleanValue(productCategory.name)+":"+getCleanValue(productCategory.value));}}
window.utag_data['product_categories'].push(categories.join('+'));}},_generatePipedValues:function(){let propsToPipe=['product_brand','product_id','product_price','product_quantity','product_key','product_name','product_recurring_price','product_subscription_runtime','product_categories'];let blacklist={product_name:["Gratis Postversand"]};let blacklistedIndexes=[],tmpArray;for(let utagPropName in blacklist){if(blacklist.hasOwnProperty(utagPropName)&&window.utag_data.hasOwnProperty(utagPropName)){tmpArray=SCS.tealium.toArray(utag_data[utagPropName]);blacklistedIndexes=SCS.tealium.getIntersectingArrayIndices(tmpArray,blacklist[utagPropName]);}}
for(const prop of propsToPipe){utag_data[prop+'_piped']='';if(typeof utag_data[prop]!=="undefined"){tmpArray=SCS.tealium.toArray(utag_data[prop]);utag_data[prop+'_piped']=tmpArray.join("|");let cleanArr=[];for(let tmpIndex=0;tmpIndex<tmpArray.length;tmpIndex++){if(blacklistedIndexes.indexOf(tmpIndex)===-1){cleanArr.push(tmpArray[tmpIndex]);}}
utag_data[prop+'_piped_MCT']=cleanArr.join("|");}}},_patchPrices:function(trackObj){const propsToPatch=['priceOtc','priceRecurring'];let products=SCS.tl.products.getList(trackObj);for(let product of products){const actionMultiplier=SCS.tl.products._getActionMultiplier(product);for(let prop of propsToPatch){if(typeof product[prop]==='number'&&product[prop]!==0){product[prop]=Math.abs(product[prop])*actionMultiplier;}}}},toUtagData:function(odlObj,utag_data,prefix,key,prefixSchema){let ddoClone=this.clone(odlObj);utag_data=utag_data||{};let schema=this.getSchema(key),obj={};if(!schema){return;}
let parName;if(Array.isArray(ddoClone)){if(ddoClone.length===0){return;}
for(let i in ddoClone){if(ddoClone.hasOwnProperty(i)){for(let j in ddoClone[i]){if(ddoClone[i].hasOwnProperty(j)){obj[j]=[];}}}}
for(const element of ddoClone){for(const n in obj){if(typeof element[n]==='undefined'){obj[n].push(null);}else{obj[n].push(element[n]);}}}
for(let p in obj){if(obj.hasOwnProperty(p)){parName=this.getUtagDataName(prefix,p,schema);utag_data[parName]=obj[p];}}}else{for(let k in ddoClone){if(ddoClone.hasOwnProperty(k)){let prop=ddoClone[k];if(/string|boolean|number/.test(typeof prop)){parName=this.getUtagDataName(prefix,k,schema);utag_data[parName]=prop;}else if(SCS.tealium.isObject(prop)){let newPrefix=k!=='udo'?this.getPrefix(k,prefixSchema)+'_':'';if(this.c3objects.indexOf(newPrefix)<0){this.toUtagData(prop,utag_data,newPrefix,k,prefixSchema);}}}}}},_maskNumber:function(phoneNumber){return SCS.tealium.isString(phoneNumber)?phoneNumber.replace(/\b\d{3}.?\d{3}.?\d{2}.?\d{2}\b/gi,'079 XXX XX XX'):'';},getSchema:function(key){let schemaName=key.split("_")[0]+"Schema";if(this[schemaName]){return this[schemaName];}else{return null;}},getUtagDataName:function(prefix,key,schema){if(schema[key]&&schema[key].utag_data_name){return prefix+schema[key].utag_data_name;}else{return prefix+key.toLowerCase();}},hyphen2camelCase:function(input){if(typeof input!=='string')return input;return input.replace(/-[a-z]/g,function(group){return group.replace('-','').toUpperCase();});},getXMLHttpRequest:function(){let activeXVersions=["Msxml2.DOMDocument.6.0","Msxml2.DOMDocument.3.0","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];try{return new XMLHttpRequest();}catch(e){for(const element of activeXVersions){try{return new ActiveXObject(element);}catch(a){}}}
return null;},handleAjaxResponse:function(){if(SCS.datalayer.xhr&&SCS.datalayer.xhr.readyState&&Number.parseInt(SCS.datalayer.xhr.readyState)===4){if(Number.parseInt(SCS.datalayer.xhr.status)===200){SCS.datalayer.debug(SCS.datalayer.xhr.responseXML);}else{SCS.datalayer.debug(SCS.datalayer.xhr.statusText);}}},getPrefix:function(objectName,prefixSchema){if(prefixSchema&&prefixSchema[objectName]){return prefixSchema[objectName];}
let prefix=objectName.split("_")[0];if(this.prefixes[prefix]){prefix=this.prefixes[prefix];}
return prefix;},clone:function(obj){try{return JSON.parse(JSON.stringify(obj));}catch(e){SCS.datalayer.debug('warning: unable to clone given object, returning empty object',obj);return{};}},debug:function(){if(window.logEnabled){let re=/(\w+)@|at (\w+) \(/g,aRegexResult=re.exec(new Error().stack);let date=new Date(),dateParts=[SCS.tealium.addLeadingZero(date.getHours()),SCS.tealium.addLeadingZero(date.getMinutes()),SCS.tealium.addLeadingZero(date.getSeconds()),SCS.tealium.addLeadingZero(date.getMilliseconds(),3)],callerName=dateParts.join(':');if(aRegexResult&&aRegexResult.length>2){callerName+=" "+(aRegexResult[1]||aRegexResult[2])+' >';}
let args=Array.prototype.slice.call(arguments);if(args){args.unshift('[DEBUG]'+callerName);console.log.apply(console,args);}}},getQueryParameterByName:function(name,url){let result='';if(typeof window.utag_data!=='undefined'&&typeof window.utag_data['qp.'+name]!=='undefined'){result=window.utag_data['qp.'+name];}else{if(!url){url=window.location.href;}
name=name.replace(/[\[\]]/g,"\\$&");let regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url);if(results&&results.length>=3){result=results[2];}}
return decodeURIComponent(result.replace(/\+/g," "));},mergeUtagData:function(source,target){if(!(source&&target)){return;}
for(let i in source){if(source.hasOwnProperty(i)){target[i]=source[i];}}},_enhanceDataObject:function(dataObject){let data=this.clone(dataObject);this.createDeviceObject(data);this.getUserIdentifications(data);this._calculateOrderTotals(data);this.flattenAllProductCategories(data);return data;},_calculateOrderTotals:function(ddoObject){if(ddoObject&&ddoObject.cart){if(ddoObject.cart.ordertotal>0||ddoObject.cart.ordertotalrecurring>0){return ddoObject;}else if(ddoObject.cart.product_list){let orderTotal=0;let orderTotalRecurring=0;for(const element of ddoObject.cart.product_list){let product=element,quantity=product.quantity||1;orderTotal+=(product.priceOtc||0)*quantity;orderTotalRecurring+=(product.priceRecurring||0)*quantity;}
ddoObject.cart.ordertotal=orderTotal;ddoObject.cart.ordertotalrecurring=orderTotalRecurring;}}
return ddoObject;},getUserIdentifications:function(ddoObject){let uiObject=this.getPersistedUiObject(),scSessionId=SCS.tl.getCookie("sc_ses_id"),scSessionIdEmptyOrChanged=scSessionId===''||(scSessionId&&SCS.tealium.isObject(uiObject)&&(!uiObject.sessionId||uiObject.sessionId!==scSessionId));ddoObject.userIdentification_list=(ddoObject.userIdentification_list||[]);if(SCS.tealium.isObject(uiObject)&&!scSessionIdEmptyOrChanged){ddoObject.userIdentification_list=ddoObject.userIdentification_list.concat(uiObject.userIdentification_list||[]);}
if(utag_data&&utag_data.tealium_session_id){ddoObject.userIdentification_list.push({system:"tealium_session",id:utag_data.tealium_session_id});}
if(utag_data&&utag_data.tealium_visitor_id){ddoObject.userIdentification_list.push({system:"tealium_visitor",id:utag_data.tealium_visitor_id});}
if(utag_data&&utag_data['cp.aam_uuid']){ddoObject.userIdentification_list.push({system:"aam_uuid",id:utag_data['cp.aam_uuid']});}
let marketingID=SCS.tl.getCookie('persad_cid');if(marketingID){ddoObject.userIdentification_list.push({system:'persad_cid',id:marketingID});}
let b2bMarketingID=SCS.tl.getCookie('myscb-uid');if(b2bMarketingID){ddoObject.userIdentification_list.push({system:'myscb_uid',id:b2bMarketingID});}
let fmUmidValue=this.getQueryParameterByName('scs_umid');if(fmUmidValue){ddoObject.userIdentification_list.push({system:'scs_umid',id:fmUmidValue});}
let transactionId=this.getQueryParameterByName('transactionId')
if(transactionId){ddoObject.userIdentification_list.push({system:'transaction_id',id:transactionId});}},getPersistedUiObject:function(){try{return JSON.parse(SCS.tealium.getPersistedValue("uiObject"));}catch(e){SCS.datalayer.debug("error",e.message);return undefined;}},isAllowedDomain:function(domain){return domain&&domain.match(/null|[./](swisscom.ch|swisscom.com|bluewin.ch|bwns.ch|wingo.ch|localhost)(:4502|:4503)?$/)!==null;},_getTimestamp:function(){return Math.floor((new Date()).getTime()/1000);},runResetCallbacks:function(){for(let i=0;i<SCS.datalayer.resetCallbacks.length;i++){try{if(typeof this.resetCallbacks[i]==='function'){SCS.datalayer.resetCallbacks[i]();}else{SCS.datalayer.debug('this.resetCallbacks[i] is not a function');}}catch(e){SCS.datalayer.debug("error while executing reset callback",i,e.message);}}},_resetSpecificUdoParameters:function(){let udoRegex=/(event_|info_|conversion_|_firesFloodlight)./;window.utag_data=window.utag_data||{};for(let key in window.utag_data){if(window.utag_data.hasOwnProperty(key)&&typeof utag_data[key]==='string'&&udoRegex.test(key)){delete utag_data[key];}}},getAnalyticsPageName:function(callback){let analytics=window.am||window.s||window.s_one;if(analytics&&analytics.pageName){if(typeof callback==='function'){callback();}
return analytics.pageName;}else if(typeof callback==='function'){SCS.datalayer.debug('Analytics not yet set');window.SCS.tiq.trackingReadyCallbacks.push(callback);}
return undefined;},cloneMandatoryData:function(index){let processData=this.data;if(typeof index==="number"&&this.callHistory.length>index){processData=this.callHistory[index];}else if(!processData||SCS.tealium.isEmptyObject(processData)){if(this._initialData&&!SCS.tealium.isEmptyObject(this._initialData)){processData=this._initialData;SCS.datalayer.debug("cloneMandatoryData: using _initialData",processData);}else if(SCS.tealium.isNonEmptyArray(SCS.tiq.trackingQueue)){for(const element of SCS.tiq.trackingQueue){if(element.type==='page'){processData=element.data;break;}}}}
if(processData&&!SCS.tealium.isEmptyObject(processData)){let clone=this.clone(processData);for(let key in clone){if(clone.hasOwnProperty(key)){if(['page','platform','profile'].indexOf(key)===-1){delete clone[key];}}}
const apps_ux=SCS.datalayer.get('apps.uxTracking',undefined,processData);const apps_perf=SCS.datalayer.get('apps.performance',undefined,processData);if(apps_perf||apps_ux){clone.apps={};if(apps_ux)clone.apps.uxTracking=apps_ux;if(apps_perf)clone.apps.performance=apps_perf;}
if(!clone.page){clone.page={};}
if(!clone.platform){clone.platform={};}
return clone;}else{SCS.datalayer.debug('SCS.datalayer.data not yet set');return{page:{},platform:{}};}},getProducts:function(trackObj){trackObj=trackObj||this.data;let result=[];let product=SCS.datalayer.get('product',undefined,trackObj);if(product){result.push(product);}
let productList=SCS.datalayer.get('product_list',undefined,trackObj);if(productList){result=result.concat(productList);}
let cartProductList=SCS.datalayer.get('cart.product_list',undefined,trackObj);if(cartProductList){result=result.concat(cartProductList);}
return result;},trackError:function(category,label){if(category==='terminate'){this.amErrors=[{category:category,label:label}];}
if(!category||!label){SCS.datalayer.debug('category and label must be set');return;}
for(const element of this.amErrors){let error=element;if(error&&error.category&&error.category===category){if(error.label===label){return;}else{let arr=error.label.split(',');arr.push(label);arr.sort();label=arr.join(',');}}}
this.amErrors.push({category:category,label:label});SCS.datalayer.debug('['+this.executionContext+'] '+category+': '+label);},applyOverrides:function(data,override){override=override||SCS?.tiq?.trackObjOverride||undefined;if(typeof override!=='undefined'&&!SCS.tealium.isEmptyObject(override)){data=SCS.tealium.mergeObjects(true,data,override);}
return data;},_containsSensitiveData:function(trackObj){try{let clone=SCS.datalayer.clone(trackObj);delete clone.rawdata;let str=JSON.stringify(clone);return/"((\+|00)41|07[5-9])[\d -]*"/g.test(str) || SCS.tealium.containsEmail(JSON.stringify(str));

            } catch (e) {
                /*istanbul ignore next*/
                SCS.datalayer.debug('failed to analyze data for PII', trackObj);
                return true;
            }
        },

        /***Check whether invalid data is contained,e.g.trailing slashes,double slashes,undefined*@param{string}path the page.path string to test*@returns{string|boolean}string with error,false if all good*@private*/
        _isInvalidPagePath: function (path) {

            // undefined value
            if (typeof path === 'undefined' || path == null) {
                return 'page.path not defined';
            }

            // contains undefined or null
            if (typeof path === 'string' && path.includes('undefined')) {
                return 'page.path contains undefined';
            }

            return false;
        },

        /***Store the profile CFU in the session in case the user logs out*@since DAC-27106,DAC-28713*@param{object}trackObj the odl object*@private*/
        _storeProfileCfu: function (trackObj) {
            if (SCS.tl.isLoggedIn()) {
                // only execute if not yet set
                let sessionValue = SCS.tl.getSessionValue('profile.cfu');
                if (!sessionValue) {
                    let profileCfu = this.get('profile.cfu', undefined, trackObj),
                        platform = this.get('platform.platform');
                    if (profileCfu) {
                        SCS.tl.setSessionValue('profile.cfu', profileCfu);
                    } else if (platform === 'kundencenter') {
                        SCS.tl.setSessionValue('profile.cfu', this.get('page.cfu'));
                    }
                }
            }
        }
    };


// END function definitions

    /***Register call back that is being fired on DOM load to check whether we still need tracking calls to be fired*/
    /*istanbul ignore next*/
    SCS.datalayer.domReady(function () {
        window.tiq_queue_interval = setInterval(function () {
            if (SCS.tealium.isReady()) {
                window.trackingQueueStarted = true;
                SCS.tiq.trackingQueue = SCS.tiq.trackingQueue || [];

                // sort array items to have 'page' calls at first
                SCS.tiq.trackingQueue = SCS.tiq.trackingQueue.reduce((acc, element) => {
                    if (element.type === 'page') {
                        return [element, ...acc];
                    }
                    return [...acc, element];
                }, []);

                let obj = SCS.tiq.trackingQueue.shift();
                if (SCS.tealium.isObject(obj) && SCS.tealium.isObject(obj.data) && obj.type) {
                    SCS.datalayer.processTrackingCall(obj.data, obj.type);
                }
            }
        }, 1000);
    });

    SCS.datalayer.initialize();
    SCS.dl = SCS.dl || SCS.datalayer;

}
}catch(e){console.log(e);}}

if(!utag_condload){try{(function(a,b,c){if(typeof utag_data=='undefined')utag_data={};a=location.pathname.split('/');b=(a.length>9)?9:a.length;for(c=1;c<b;c++){utag_data['_pathname'+c]=(typeof a[c]!='undefined')?a[c]:''}})();}catch(e){console.log(e);}}

if(!utag_condload){try{
window.utag_cfg_ovrd = window.utag_cfg_ovrd || {}; // Create 'utag_cfg_ovrd' object if not created
// myswisscom kuce does not set documentElement until very late
window.utag_data.gdpr_lang = window.location.href.indexOf('myswisscom/') > 0 ? getCookie('OCE-CARE-LANG'): document.documentElement.lang;
window.utag_cfg_ovrd.gdprDLRef = 'gdpr_lang';
window.utag_cfg_ovrd.load_rules_at_wait = true; // Set load rule to re-evaluate after 'all tags' scoped extensions
// window.utag_cfg_ovrd.dom_complete = true; //  "DOM Ready" from "readyState != 'loading'" to "readyState == 'complete'", tags are only loaded after DOM loaded

// TEST
var urlPath = window.location.pathname;
if (urlPath.indexOf('/products/tablets') >= 0) {
  window.utag_cfg_ovrd.noview = true;
}
// TEST
}catch(e){console.log(e);}}

if(!utag_condload){try{ try{
/*******************************************************************************
 *                                                                             *
 * THIS EXTENSION IS HANDLED VIA GIT. DO NOT MODIFY DIRECTLY!                  *
 * INSTEAD, MAKE YOUR CHANGES IN THE GIT REPOSITORY FIRST:                     *
 * https://git.swisscom.ch/projects/TAGMAN/repos/tealium_extensions            *
 *                                                                             *
 ******************************************************************************/

window.SCS = window.SCS || {};
(function (SCS) {
    "use strict";

    /**
     * Tealium Product helper functions
     * @namespace SCS.tealium.products
     */
    SCS.tl.products = {

        WIRELINE_SEPARATOR: ".",
        NAME_BLACKLIST: ["gratis postversand"],

        CAT_WIRELINE_BUNDLE: "abo.bundle",
        CAT_WIRELINE_FLAVOUR: "abo.flavour",
        CAT_WIRELINE_BUNDLE_GV: "abo.grundversorgung",
        CAT_WIRELESS_BUNDLE: "abo.mobile",
        CAT_MASTER_BLACKLIST: ["abo.flavour"],

        PRICE_OTC: "priceOtc",
        PRICE_RECURRING: "priceRecurring",

        // actions and order state
        ACT_CANCEL: 'cancelled',
        ACT_REMAINING: 'remaining',
        ACT_CURRENT: 'current',
        ACT_EXISTING: 'existing',
        ORDER_STATE_CANCELLED: '(del)',
        ORDER_STATE_CURRENT: '(cur)',

        LIFETIME: {
            "abo.bundle": 24,
            "abo.flavour": 24,
            "abo.mobile": 24,
            "abo.grundversorgung": 24,
            "option.mobile": 12,
            "option.bundle": 12,
            "option.flavour": 12,
            "pack.mobile": 12,
            "tv.options": 12,
            "promo.code": 12,
        },

        INTERNET_PLANS: /inone([-_ ])home/i,
        MOBILE_PLANS: /inone([-_ ])mobile/i,
        MOBILE_OPTIONS: /international([ _])(calls|flatrate)|(premium([ _])(speed))|(travel voice)/i,
        CONNECT_PACKS: /((option_)?connect(pack)?)|intercontinental|north_america/i,

        PRODUCT_CATEGORY_MASTER: "ProductCategoryMaster",
        // W+
        CAT_ABO_BUNDLE: "abo.bundle",
        CAT_ABO_BUNDLE_GV: "abo.grundversorgung",
        CAT_ABO_FLAVOUR: "abo.flavour",
        CAT_BUNDLE_OPTION: "option.bundle",
        CAT_BUNDLE_FLAVOUR: "option.flavour",
        // W-
        CAT_ABO_MOBILE: "abo.mobile",
        CAT_MOBILE_OPTION: "option.mobile",
        CAT_MOBILE_PACK: "pack.mobile",
        // Promo
        CAT_PROMO_CODE: "promo.code",
        CAT_PROMO_BUNDLE: "promo.bundle",
        CAT_PROMO_VOUCHER: "promo.voucher",
        CAT_PROMO_ACTIVATION: "promo.activation",
        // deprecated
        CAT_TV_OPTION: "tv.options",

        /**
         * Get a list/array of the products of the current tracking request
         * @param {Object} [trackObj] optional track object, if left out SCS.datalayer.data will be used
         * @returns {Array} the products or empty array
         */
        getList: function (trackObj) {
            trackObj = trackObj || SCS.dl.data;

            let result = [];

            if (trackObj) {
                let productListProps = ["product", "product_list", "cart.product_list"];
                productListProps.forEach(function (prop) {
                    let attribute = SCS.datalayer.get(prop, undefined, trackObj);
                    if (attribute) {
                        if (SCS.tl.isArray(attribute)) {
                            result = result.concat(attribute);
                        } else if (SCS.tl.isObject(attribute)) {
                            result.push(attribute);
                        }
                    }
                });
            }

            return result;
        },

        /**
         * Gets the first product id found in the list
         * @param {object} [trackObj]
         * @returns {string} the id, empty string if not found
         */
        getFirstId: function (trackObj) {
            let list = this.getList(trackObj);
            return list.length >= 1 ? list[0].id : "";
        },

        /**
         * Pipe the products'first(!)category as pipe-delimited string*@param{object}[trackObj]*@returns{string}*/
        getPipedCategory: function (trackObj) {
            let temp = [],
                list = this.getList(trackObj);

            list.forEach(function (product) {
                if (product.name !== "Gratis Postversand" && product.hasOwnProperty("productCategory_list")) {
                    if (product.productCategory_list.length === 0) {
                        temp.push("");
                    } else {
                        temp.push(product.productCategory_list[0].name + ":" + product.productCategory_list[0].value);
                    }
                }
            });
            return temp.join("|");
        },

        /***Generate a piped string of the attributeName values*@param{string}attributeName*@param{object}[trackObj]*@returns{string}the piped string of the property values*/
        getPipedAttribute: function (attributeName, trackObj) {
            if (!attributeName) return "";

            const attributesWithMultiplier = ["priceOtc", "priceRecurring"];

            let temp = [],
                list = this.getList(trackObj);
            list.forEach(function (product) {
                if (product.name && product.name !== "Gratis Postversand") {
                    if (attributesWithMultiplier.includes(attributeName)) {
                        const multiplier = SCS.tl.products._getActionMultiplier(product);
                        let value = !isNaN(product[attributeName]) ? Number.parseFloat(product[attributeName]) : 0;

                        // edge case: avoid double negation
                        if (multiplier < 0 && value < 0) value = Math.abs(value);
                        temp.push(value * multiplier);
                    } else if (attributeName === 'name' && SCS.tl.products.isCancelled(product)) {
                        // special handling, adding the action if cancelled
                        temp.push(product.name + SCS.tl.products.getOrderState(product));
                    } else {
                        temp.push(product[attributeName] || "");
                    }
                }
            });
            return temp.join("|");
        },

        /***Generate an array if all attribute values for the given attributeName*@param{string}attributeName*@param{boolean}ignoreEmptyValue*@param{Object}[trackObj]optional data object*@returns{Array}the array of the property values*/
        getAttributeList: function (attributeName, ignoreEmptyValue, trackObj) {
            if (!attributeName) return [];
            let temp = [],
                list = this.getList(trackObj);
            list.forEach(function (product) {
                let attr = product[attributeName];
                if (attr || !ignoreEmptyValue) {
                    temp.push(attr);
                }
            });

            return temp;
        },

        /***Get the cart's order id
         * @param {object} [trackObj]
         * @returns {*|number}
         */
        getOrderId: function (trackObj) {
            trackObj = trackObj || SCS.dl.data;
            let orderId = SCS.dl.get("cart.orderid", undefined, trackObj);
            return orderId ? orderId.replace(/\W/g, "") : Math.random() * 10000000000000000;
        },

        /**
         * Get the cart ordercase
         * @param {object} [trackObj]
         * @returns {string|*}
         */
        getOrderCase: function (trackObj) {
            trackObj = trackObj || SCS.dl.data;
            let orderCase = SCS.dl.get("cart.ordercase", undefined, trackObj);
            if (orderCase) {
                return orderCase;
            } else if (utag_data.order_case) {
                utag.DB("GST/FB using manually set order_case");
                return utag_data.order_case;
            } else {
                return "";
            }
        },

        isRecurring: function (product) {
            return !!SCS.dl.get("priceRecurring", false, product);
        },

        _hasExtendedPayments: function (prod) {
            return SCS.dl.get("productCategory_list.0.value", undefined, prod) === "mobilePhones_master";
        },

        isVoucher: function (prod) {
            return SCS.dl.get("id", undefined, prod) === "online_voucher";
        },

        getRecurringProducts: function (products) {
            let result = [];
            products = products || [];

            products.forEach(function (product) {
                if (this.isRecurring(product) && !this._hasExtendedPayments(product) && !this.isVoucher(product)) {
                    result.push(product);
                }
            }, this);

            return result;
        },

        /**
         * Identify bundle products by checking their product categories.
         * Used to identify the delta revenue.
         * @param {object} product
         * @return {boolean|string} false if the given product is not a bundle, the bundle name if it is a bundle
         */
        hasArpu: function (product) {
            if (!this.isProduct(product)) return false;

            // since UBER: abo.flavour does not have ARPU since price is included in bundle
            let relevantCategories = [this.CAT_ABO_BUNDLE, this.CAT_ABO_MOBILE, this.CAT_MOBILE_OPTION,
                this.CAT_BUNDLE_OPTION, this.CAT_BUNDLE_FLAVOUR, this.CAT_MOBILE_PACK, this.CAT_TV_OPTION, this.CAT_ABO_BUNDLE_GV];
            return (relevantCategories).some(function (category) {
                return this.hasCategory(product, this.PRODUCT_CATEGORY_MASTER, category);
            }, this);
        },

        /**
         * Convert the given value into a Number
         * @param value
         * @returns {number} the result or 0 i no number
         */
        getFloatValue: function (value) {
            return !isNaN(Number.parseFloat(value)) ? Number.parseFloat(value) : 0.0;
        },

        /**
         * Determine the lifetime value of a product (i.e. the product has a monthly recurring price.
         * Certain products have a longer lifetime than a single month, in that case the value is multiplied by a factor)
         * @param {object} product the product to check
         * @returns {number} the lifetime value
         * @private
         */
        getProductLifetimeValue: function (product) {

            // lifetime value only applies to ARPU enabled products
            if (!product || !SCS.tl.isObject(product) || !this.hasArpu(product)) return 0;

            let productCategory = SCS.tl.getProductCategory(product),
                lifetimeMultiplier = this.LIFETIME[productCategory.toLowerCase()],
                price = this.getFloatValue(product.priceRecurring),
                actionMultiplier = this._getActionMultiplier(product);

            // edge case: to avoid double negation should the price and action multiplier be negative
            price = Math.abs(price) * actionMultiplier;

            if (lifetimeMultiplier) {
                if(this.hasArpu(product)) {
                    return price * lifetimeMultiplier;
                } else {
                    return 0;
                }
            } else {
                return price;
            }
        },

        /**
         * Check whether the given param is actually a product, i.e. contains the minimum set of properties defined in the ODL
         * @param {object} product
         * @private
         */
        isProduct: function (product) {
            return !!(SCS.tealium.isObject(product) && product.name && SCS.tealium.isArray(product.productCategory_list));
        },

        /**
         * Check whether the given product contains a given category
         * @param {object} product the product
         * @param {String} categoryName the category name to search for
         * @param {String} [categoryValue] - optional search for explicit category value
         * @return {boolean} true if the given name was found resp. name+value matched
         * @private
         */
        hasCategory: function (product, categoryName, categoryValue) {
            if (!product) return false;

            return (product.productCategory_list || []).some(function (category) {
                if (SCS.tealium.isObject(category) && category.name === categoryName) {
                    return typeof categoryValue === "string" ? category.value.toLowerCase() === categoryValue.toLowerCase() : true;
                }
            });
        },

        /**
         * Retrieve the product category (master) of a product
         * @param product the product
         * @returns {string}
         * @private
         */
        getCategory: function (product) {
            if (product && SCS.tealium.isArray(product.productCategory_list)) {
                for (const category of product.productCategory_list) {
                    if (category.name === this.PRODUCT_CATEGORY_MASTER && category.value) {
                        return category.value.replace('+', '').replace(':', '');
                    }
                }
            } else {
                return '';
            }
        },

        /**
         * Convert a number to a number with fixed precision
         * @param {number} n the number to convert
         * @param  {number} fixed the number of decimals
         * @returns {number} the converted number
         */
        toFixed: function (n, fixed) {
            return ~~(Math.pow(10, fixed) * n) / Math.pow(10, fixed);
        },

        /**
         * Calculate the lifetime value for a given list of products
         * @returns {Number}
         */
        getLifetimeValue: function () {
            let products = this.getList();
            let lifetimeValue = 0;
            for (const product of products) {
                lifetimeValue += this.getProductLifetimeValue(product);
            }
            return this.toFixed(lifetimeValue, 2);
        },

        /**
         * Determine whether it is a new product based on the product.action property.
         * @param product
         * @returns {boolean}
         */
        isNew: function (product) {
            return !this.isCancelled(product) && !this.isCurrent(product);
        },

        /**
         * Determine whether it is a cancelled product based on the product.action property.
         * @param product
         * @returns {boolean}
         */
        isCancelled: function (product) {
            // if (!this.isProduct(product)) return false;
            return product?.action === this.ACT_CANCEL;
        },

        /**
         * Determine whether it is an unchanged product based on the product.action property.
         * @param product
         * @returns {boolean}
         */
        isCurrent: function (product) {
            // if (!this.isProduct(product)) return false;
            return [this.ACT_REMAINING, this.ACT_CURRENT, this.ACT_EXISTING].indexOf(product?.action) > -1;
        },

        /**
         * TM-1395 Generate extra information about product order states ('new', 'cancelled', 'remaining', 'current')
         * when an action is set in a product). Only applies to certain platforms.
         * @param {object} product the product action to translate
         * @return {string} the order state of the product e.g. new,
         * @see https://wiki.swisscom.com/display/TAG/Digital+Data+Object+Definition#DigitalDataObjectDefinition-product-action
         */
        getOrderState: function (product) {
            if (this.isProduct(product)) {
                if (this.isCancelled(product)) {
                    return this.ORDER_STATE_CANCELLED;
                } else if (this.isCurrent(product)) {
                    return this.ORDER_STATE_CURRENT;
                }
            }
            // default
            return "";
        },

        /**
         * Get the product quantity
         * @param {object} product
         * @returns {number} defaults to 1
         */
        getQuantity: function (product) {
            return product && product.quantity ? product.quantity : 1;
        },

        /**
         * Get the current product's price*!!!IMPORTANT:as of UBER/May 2022 W+bundles priceRecurring are ignored and the flavours' priceRecurring rule
         * @param {object} product the product
         * @param  {[object]} allProducts the list of all products to determine additional products influencing the name
         * @returns {number}
         */
        getPrice: function (product, allProducts) {

            if (!SCS.tl.products.isProduct(product) || !SCS.tl.isPurchase()) return 0;
            allProducts = allProducts || [];
            const actionMultiplier = this._getActionMultiplier(product);
            const lifeTimeMultiplier = this._getLifetimeMultiplier(product);

            // W+ bundles: use sum of flavour prices
            if (this.isWirelineBundle(product)) {
                let totalRecurring = SCS.tl.products.getWirelineFlavours(product, allProducts)
                    .map(function (flavour) {
                        return flavour.priceRecurring || 0;
                    })
                    .reduce(function (acc, cur) {
                        return acc + cur;
                    }, 0);

                // ARPU applies
                return actionMultiplier * lifeTimeMultiplier * totalRecurring;
            }

            // non-W+ products
            const priceAttributes = [this.PRICE_OTC, this.PRICE_RECURRING];
            for (const attribute of priceAttributes) {
                const price = product[attribute];
                if (price) {
                    // see https://jira.swisscom.com/browse/DAC-38032
                    // ARPU is applied as multiplier on the price
                    return SCS.tl.products.hasArpu(product)
                        ? actionMultiplier * lifeTimeMultiplier * price
                        : price;
                }
            }
            return 0;
        },

        _getActionMultiplier: function (product) {
            if (this.isCancelled(product)) return -1;
            if (this.isCurrent(product)) return 0;
            return 1;
        },

        /**
         * For the lifetime/ARPU calculation we apply a constant value
         * @param product
         * @returns {number}
         * @private
         */
        _getLifetimeMultiplier: function (product) {
            const category = this.getCategory(product);
            return category && this.LIFETIME.hasOwnProperty(category) ? this.LIFETIME[category.toLowerCase()] : 0;
        },

        _productNameIsBlacklisted: function (product) {
            return !product.name || this.NAME_BLACKLIST.indexOf(product.name.toLowerCase()) > -1;
        },

        _productCategoryIsBlacklisted: function (product) {
            const category = SCS.tl.products.getCategory(product);
            return !!(category && this.CAT_MASTER_BLACKLIST.indexOf(category.toLowerCase()) > -1);
        },

        /**
         * Check whether the product fulfils all requirements to be processed in the products string
         * @param {object} product the product
         * @returns {boolean} true if all good
         * @private
         */
        _isProcessable: function (product) {
            return SCS.tl.products.isProduct(product) && !(this._productNameIsBlacklisted(product) || this._productCategoryIsBlacklisted(product));
        },

        /**
         * In order to keep the desired product order inOne-Home_<Internet>_<TV>_<VoIP> we need to insert the flavours in
         * the right order
         * @param flavours
         * @param productName
         * @returns {*}
         * @private
         */
        _insertFlavour: function (flavours, productName) {
            if (!flavours[1]) flavours[1] = "noInternet";
            if (!flavours[2]) flavours[2] = "noTV";
            if (!flavours[3]) flavours[3] = "noTelefonie";

            if (/Service/i.test(productName)) {
                flavours[0] = productName;
            } else if (/Internet/i.test(productName)) {
                flavours[1] = productName;
            } else if (/TV/i.test(productName)) {
                flavours[2] = productName;
            } else if (/VoIP/i.test(productName) || /Telefonie/i.test(productName)) {
                flavours[3] = productName;
            } else {
                SCS.datalayer.debug("unknown flavour name, cannot determine key", productName);
            }
            return flavours;
        },

        isWirelineBundle: function (product) {
            return this.hasCategory(product, this.PRODUCT_CATEGORY_MASTER, this.CAT_WIRELINE_BUNDLE);
        },

        isWirelineFlavour: function (product) {
            return this.hasCategory(product, SCS.tl.products.PRODUCT_CATEGORY_MASTER, this.CAT_WIRELINE_FLAVOUR)
        },

        isWirelessBundle: function (product) {
            return this.hasCategory(product, this.PRODUCT_CATEGORY_MASTER, this.CAT_WIRELESS_BUNDLE);
        },

        /**
         * Get the corresponding W+ flavours for the given bundle
         * @param bundle
         * @param allProducts
         * @returns {*[]}
         */
        getWirelineFlavours(bundle, allProducts) {
            let result = [];
            if (this.isWirelineBundle(bundle)) {
                const bundleOrderState = this.getOrderState(bundle);

                // iterate flavours to find matching ones
                allProducts = SCS.tl.toArray(allProducts);
                allProducts.forEach(function (productItem) {
                    const productItemOrderState = this.getOrderState(productItem);
                    if (this.isWirelineFlavour(productItem) && bundleOrderState === productItemOrderState) {
                        result.push(productItem);
                    }
                }, this);

            }
            return result;
        },

        /**
         * Get the product name
         * @param {object} product the current product
         * @param  {[object]} allProducts the list of all products to determine additional products influencing the name
         * @returns {string}
         * @private
         */
        getName: function (product, allProducts) {

            const exceptionList = ["activation.bundle", "activation.mobile", "activation.vas", "promo.activation",
                "promo.benefit", "promo.bundle", "promo.flavour", "promo.hardware", "promo.mobile", "promo.vas", "promo.voucher"];

            let result = product.key || product.name;

            exceptionList.forEach(function (exc) {
                if (this.hasCategory(product, this.PRODUCT_CATEGORY_MASTER, exc)) {
                    // do not use .name, use .key or as fallback .id
                    result = product.key || product.id || product.name;
                }
            }, this);

            // process W+/internet bundles: requires names from flavours, in the right order
            if (this.isWirelineBundle(product)) {
                let bundleParts = [product.name];

                let flavoursSorted = [];
                this.getWirelineFlavours(product, allProducts).forEach(function (flavour) {
                    flavoursSorted = this._insertFlavour(flavoursSorted, flavour.name);
                }, this);

                // concatenate bundle with flavours (removed empty values)
                if (flavoursSorted.length) {
                    result = bundleParts.concat(flavoursSorted.filter(function (value) {
                        return value;
                    })).join(".");
                } else {
                    // no flavours, no bundle ;)
                    return "";
                }
            }

            const state = this.getOrderState(product);
            return result ? result + state : "";
        },

    };

}(window.SCS));
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if(!utag_condload){try{ try{
/*******************************************************************************
 *                                                                             *
 * THIS EXTENSION IS HANDLED VIA GIT. DO NOT MODIFY DIRECTLY!                  *
 * INSTEAD, MAKE YOUR CHANGES IN THE GIT REPOSITORY FIRST:                     *
 * https://git.swisscom.ch/projects/TAGMAN/repos/tealium_extensions            *
 *                                                                             *
 ******************************************************************************/
(function (SCS) {

    SCS.tiq = SCS.tiq || {};
    SCS.tiq.mkt = SCS.tiq.mkt || {};

    /**
     * Marketing Utils
     */
    SCS.tiq.mkt.floodlight = SCS.tiq.mkt.floodlight || {

        /**
         *
         * @param checkedVal
         * @returns {number|*}
         * @private
         */
        _checkIfNaN: function (checkedVal) {
            return isNaN(checkedVal) ? 0 : checkedVal;
        },

        /**
         * Get the order cases from either existing overrides or directly from the cart
         * @param b Tealium's b object in extension scope*@param utag_data Tealium's utag_data object in extension scope
         * @returns {string[]}
         */
        getOrderCases: function (b, utag_data) {
            let value = "";
            if(typeof utag_data !== "undefined" && utag_data._mco_orderCase) {
                value = utag_data._mco_orderCase;
            } else if (typeof b !== "undefined" && b._mco_orderCase) {
                value = b._mco_orderCase;
            } else if(SCS.dl.get('cart.ordercase')) {
                value = SCS.dl.get('cart.ordercase');
            } else if(utag.data && utag_data.order_case) {
                value = utag_data.order_case;
            }
            return value.split(",");
        },

        /**
         * Generate the floodlight payload
         * @param {string} [orderCase]
         * @returns {object} the payload
         */
        getPayload: function (orderCase) {
            let tagId = typeof u !== "undefined" ? u.id : undefined;
            let result = {
                u1: SCS.dl.get('page.cfu', ''),
                u2: SCS.dl.get('page.language', ''),
                u3: SCS.dl.get('page.path', ''),
                u4: SCS.dl.get('platform.environment', ''),
                u5: SCS.dl.get('platform.platform', ''),
                u6: SCS.tl.products.getFirstId(),
                u7: SCS.dl.get('conversion.id', ''),
                u8: SCS.dl.get('conversion.subject', ''),
                u9: SCS.tl.products.getOrderId(),
                u10: orderCase,
                u11: SCS.tl.products.getPipedAttribute('id'),
                u12: SCS.tl.products.getPipedAttribute('key'),
                u13: SCS.tl.products.getPipedAttribute('name'),
                u14: SCS.tl.products.getPipedAttribute('priceRecurring'),
                u15: SCS.tl.products.getPipedAttribute('subscriptionRuntime'),
                u16: SCS.tl.products.getPipedAttribute('priceOtc'),
                u17: this._checkIfNaN(SCS.dl.get('cart.ordertotal', '')),
                u18: this._checkIfNaN(SCS.dl.get('cart.ordertotalrecurring', '')),
                // This is a debug variable - only works in the context of Tealium
                u19: tagId,
                u20: SCS.tl.products.getPipedCategory(),
                u23: SCS.dl.getQueryParameterByName('campID') ? SCS.dl.getQueryParameterByName('campID') : '',
                u24: SCS.dl.get('conversion.category', ''),
                u25: SCS.dl.get('conversion.detail', ''),
                u26: SCS.dl.get('conversion.class', ''),
                u30: SCS.dl.getAnalyticsPageName(),
                u31: SCS.tl.isEUVisitor(),
                ord: SCS.tl.products.getOrderId(),
                allow_custom_scripts: true,
                anonymize_ip: true,
            };

            SCS.tl.cleanObject(result, ["", 0, undefined])
            return result;
        },

    };

})(window.SCS);
} catch(e){ console.log(e) } }catch(e){console.log(e);}}

if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"swisscom.main",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    db_log : [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      lq: [],
      bq: {},
      bk: {},
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      ready_q : [], 
      sendq :{"pending":0},
      run_ready_q : function(){
        for(var i=0;i<utag.loader.ready_q.length;i++){
          utag.DB("READY_Q:"+i);
          try{utag.loader.ready_q[i]()}catch(e){utag.DB(e)};
        }
      },
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\.|\.edu\.|\.net\.|\.asn\.|\...\.jp$/.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d, g) {
        utag.DB('WQ:' + utag.loader.wq.length);
        try {
          // this picks up a utag_data items added after utag.js was loaded
          // Gotcha: Data layer set after utag.js will not overwrite something already set via an extension.  Only "new" values are copied from utag_data
          // for case where utag_data is set after utag.js is loaded
          if(utag.udoname && utag.udoname.indexOf(".")<0){
            utag.ut.merge(utag.data,window[utag.udoname],0);
          }

          // TBD: utag.handler.RE('view',utag.data,"bwq");
          // process load rules again if this flag is set
          if(utag.cfg.load_rules_at_wait){
            utag.handler.LR(utag.data);
          }
        } catch (e) {utag.DB(e)};
	
	d=0;
        g=[]; 
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load == 4){
            //LOAD the bundled tag set to wait here
            this.f[b.id]=0;
            utag.loader.LOAD(b.id)
          }else if (b.load > 0) {
            g.push(b);
            //utag.loader.AS(b); // moved: defer loading until flags cleared
	    d++;
          }else{
            // clear flag for those set to wait that were not actually loaded
            this.f[b.id]=1;
          }
        }
        for (a = 0; a < g.length; a++) {
          utag.loader.AS(g[a]);
        }

	if(d==0){
	  utag.loader.END();
	}
      },
      AS: function(a, b, c, d) {
        utag.send[a.id] = a;
        if (typeof a.src == 'undefined' || !utag.ut.hasOwn(a,'src')) {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'ut' + 'ag.' + a.id + '.js')
        }
        a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + (a.v?utag.cfg.template+a.v:utag.cfg.v);
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        this.f[a.id]=0;
        if (a.load == 2) {
          utag.DB("Attach sync: "+a.src);
          a.uid=a.id;
          b.write('<script id="utag_' + a.id + '"src="' + a.src + '"></scr' + 'ipt>')
          if(typeof a.cb!='undefined')a.cb();
        } else if(a.load==1 || a.load==3) {
          if (b.createElement) {
            c = 'utag_swisscom.main_'+a.id;
            if (!b.getElementById(c)) {
	      d = {
	        src:a.src,
		id:c,
                uid:a.id,
		loc:a.loc
              }
              if(a.load == 3){d.type="iframe"};
	      if(typeof a.cb!='undefined')d.cb=a.cb;
              utag.ut.loader(d);
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (a.hasOwnProperty(c) && typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      OU: function(tid, tcat, a, b, c, d, f, g) {
        g = {};
        utag.loader.RDcp(g);
        try {
          if (typeof g['cp.OPTOUTMULTI'] != 'undefined') {
            c = utag.loader.cfg;
            a = utag.ut.decode(g['cp.OPTOUTMULTI']).split('|');
            for (d = 0; d < a.length; d++) {
              b = a[d].split(':');
              if (b[1] * 1 !== 0) {
                if (b[0].indexOf('c') == 0) {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tcat == b[0].substring(1)) c[f].load = 0;
                    // if we know the tid but don't know the category and this is a category opt out...
                    if (c[f].tid == tid && c[f].tcat == b[0].substring(1)) return true; 
                  }
                  if (tcat == b[0].substring(1)) return true;
                } else if (b[0] * 1 == 0) {
                  utag.cfg.nocookie = true
                } else {
                  for (f in utag.loader.GV(c)) {
                    if (c[f].tid == b[0]) c[f].load = 0
                  }
                  if (tid == b[0]) return true;
                }
              }
            }
          }
        } catch (e) {utag.DB(e)}
        return false;
      },
      RDdom: function(o){
        var d = document || {}, l = location || {};
        o["dom.referrer"] = d.referrer;
        o["dom.title"] = "" + d.title;
        o["dom.domain"] = "" + l.hostname;
        o["dom.query_string"] = ("" + l.search).substring(1);
        o["dom.hash"] = ("" + l.hash).substring(1);
        o["dom.url"] = "" + d.URL;
        o["dom.pathname"] = "" + l.pathname;
        o["dom.viewport_height"] = window.innerHeight || (d.documentElement?d.documentElement.clientHeight:960);
        o["dom.viewport_width"] = window.innerWidth || (d.documentElement?d.documentElement.clientWidth:960);
      },
      RDcp: function(o, b, c, d){
        b = utag.loader.RC();
        for (d in b) {
          if (d.match(/utag_(.*)/)){for(c in utag.loader.GV(b[d])){o["cp.utag_"+RegExp.$1+"_"+c]=b[d][c];}}}
for(c in utag.loader.GV((utag.cl&&!utag.cl['_all_'])?utag.cl:b)){if(c.indexOf("utag_")<0&&typeof b[c]!="undefined")o["cp."+c]=b[c];}},RDqp:function(o,a,b,c){a=location.search+(location.hash+'').replace("#","&");if(utag.cfg.lowerqp){a=a.toLowerCase()};if(a.length>1){b=a.substring(1).split('&');for(a=0;a<b.length;a++){c=b[a].split("=");if(c.length>1){o["qp."+c[0]]=utag.ut.decode(c[1])}}}},RDmeta:function(o,a,b,h){a=document.getElementsByTagName("meta");for(b=0;b<a.length;b++){try{h=a[b].name||a[b].getAttribute("property")||"";}catch(e){h="";utag.DB(e)};if(utag.cfg.lowermeta){h=h.toLowerCase()};if(h!=""){o["meta."+h]=a[b].content}}},RDva:function(o){var readAttr=function(o,l){var a="",b;a=localStorage.getItem(l);if(!a||a=="{}")return;b=utag.ut.flatten({va:JSON.parse(a)});utag.ut.merge(o,b,1);}
try{readAttr(o,"tealium_va");readAttr(o,"tealium_va_"+o["ut.account"]+"_"+o["ut.profile"]);}catch(e){utag.DB(e)}},RDut:function(o,a){var t={};var d=new Date();var m=(utag.ut.typeOf(d.toISOString)=="function");o["ut.domain"]=utag.cfg.domain;o["ut.version"]=utag.cfg.v;t["tealium_event"]=o["ut.event"]=a||"view";t["tealium_visitor_id"]=o["ut.visitor_id"]=o["cp.utag_main_v_id"];t["tealium_session_id"]=o["ut.session_id"]=o["cp.utag_main_ses_id"];t["tealium_session_number"]=o["cp.utag_main__sn"];t["tealium_session_event_number"]=o["cp.utag_main__se"];try{t["tealium_datasource"]=utag.cfg.datasource;t["tealium_account"]=o["ut.account"]=utag.cfg.utid.split("/")[0];t["tealium_profile"]=o["ut.profile"]=utag.cfg.utid.split("/")[1];t["tealium_environment"]=o["ut.env"]=utag.cfg.path.split("/")[6];}catch(e){utag.DB(e)}
t["tealium_random"]=Math.random().toFixed(16).substring(2);t["tealium_library_name"]="ut"+"ag.js";t["tealium_library_version"]=(utag.cfg.template+"0").substring(2);t["tealium_timestamp_epoch"]=Math.floor(d.getTime()/1000);t["tealium_timestamp_utc"]=(m?d.toISOString():"");d.setHours(d.getHours()-(d.getTimezoneOffset()/60));t["tealium_timestamp_local"]=(m?d.toISOString().replace("Z",""):"");utag.ut.merge(o,t,0);},RDses:function(o,a,c){a=(new Date()).getTime();c=(a+parseInt(utag.cfg.session_timeout))+"";if(!o["cp.utag_main_ses_id"]){o["cp.utag_main_ses_id"]=a+"";o["cp.utag_main__ss"]="1";o["cp.utag_main__se"]="1";o["cp.utag_main__sn"]=(1+parseInt(o["cp.utag_main__sn"]||0))+"";}else{o["cp.utag_main__ss"]="0";o["cp.utag_main__se"]=(1+parseInt(o["cp.utag_main__se"]||0))+"";}
o["cp.utag_main__pn"]=o["cp.utag_main__pn"]||"1";o["cp.utag_main__st"]=c;utag.loader.SC("utag_main",{"_sn":(o["cp.utag_main__sn"]||1),"_se":o["cp.utag_main__se"],"_ss":o["cp.utag_main__ss"],"_st":c,"ses_id":(o["cp.utag_main_ses_id"]||a)+";exp-session","_pn":o["cp.utag_main__pn"]+";exp-session"});},RDpv:function(o){if(typeof utag.pagevars=="function"){utag.DB("Read page variables");utag.pagevars(o);}},RD:function(o,a){utag.DB("utag.loader.RD");utag.DB(o);utag.loader.RDcp(o);if(!utag.loader.rd_flag){utag.loader.rd_flag=1;o["cp.utag_main_v_id"]=o["cp.utag_main_v_id"]||utag.ut.vi((new Date()).getTime());o["cp.utag_main__pn"]=(1+parseInt(o["cp.utag_main__pn"]||0))+"";utag.loader.SC("utag_main",{"v_id":o["cp.utag_main_v_id"]});utag.loader.RDses(o);}
if(a&&!utag.cfg.noview)utag.loader.RDses(o);utag.loader.RDqp(o);utag.loader.RDmeta(o);utag.loader.RDdom(o);utag.loader.RDut(o,a||"view");utag.loader.RDpv(o);utag.loader.RDva(o);},RC:function(a,x,b,c,d,e,f,g,h,i,j,k,l,m,n,o,v,ck,cv,r,s,t){o={};b=(""+document.cookie!="")?(document.cookie).split("; "):[];r=/^(.*?)=(.*)$/;s=/^(.*);exp-(.*)$/;t=(new Date()).getTime();for(c=0;c<b.length;c++){if(b[c].match(r)){ck=RegExp.$1;cv=RegExp.$2;}
e=utag.ut.decode(cv);if(typeof ck!="undefined"){if(ck.indexOf("ulog")==0||ck.indexOf("utag_")==0){e=cv.split("$");g=[];j={};for(f=0;f<e.length;f++){try{g=e[f].split(":");if(g.length>2){g[1]=g.slice(1).join(":");}
v="";if((""+g[1]).indexOf("~")==0){h=g[1].substring(1).split("|");for(i=0;i<h.length;i++)h[i]=utag.ut.decode(h[i]);v=h}else v=utag.ut.decode(g[1]);j[g[0]]=v;}catch(er){utag.DB(er)};}
o[ck]={};for(f in utag.loader.GV(j)){if(utag.ut.typeOf(j[f])=="array"){n=[];for(m=0;m<j[f].length;m++){if(j[f][m].match(s)){k=(RegExp.$2=="session")?(typeof j._st!="undefined"?j._st:t-1):parseInt(RegExp.$2);if(k>t)n[m]=(x==0)?j[f][m]:RegExp.$1;}}
j[f]=n.join("|");}else{j[f]=""+j[f];if(j[f].match(s)){k=(RegExp.$2=="session")?(typeof j._st!="undefined"?j._st:t-1):parseInt(RegExp.$2);j[f]=(k<t)?null:(x==0?j[f]:RegExp.$1);}}
if(j[f])o[ck][f]=j[f];}}else if(utag.cl[ck]||utag.cl['_all_']){o[ck]=e}}}
return(a)?(o[a]?o[a]:{}):o;},SC:function(a,b,c,d,e,f,g,h,i,j,k,x,v){if(!a)return 0;if(a=="utag_main"&&utag.cfg.nocookie)return 0;v="";var date=new Date();var exp=new Date();exp.setTime(date.getTime()+(365*24*60*60*1000));x=exp.toGMTString();if(c&&c=="da"){x="Thu, 31 Dec 2009 00:00:00 GMT";}else if(a.indexOf("utag_")!=0&&a.indexOf("ulog")!=0){if(typeof b!="object"){v=b}}else{d=utag.loader.RC(a,0);for(e in utag.loader.GV(b)){f=""+b[e];if(f.match(/^(.*);exp-(\d+)(\w)$/)){g=date.getTime()+parseInt(RegExp.$2)*((RegExp.$3=="h")?3600000:86400000);if(RegExp.$3=="u")g=parseInt(RegExp.$2);f=RegExp.$1+";exp-"+g;}
if(c=="i"){if(d[e]==null)d[e]=f;}else if(c=="d")delete d[e];else if(c=="a")d[e]=(d[e]!=null)?(f-0)+(d[e]-0):f;else if(c=="ap"||c=="au"){if(d[e]==null)d[e]=f;else{if(d[e].indexOf("|")>0){d[e]=d[e].split("|")}
g=(utag.ut.typeOf(d[e])=="array")?d[e]:[d[e]];g.push(f);if(c=="au"){h={};k={};for(i=0;i<g.length;i++){if(g[i].match(/^(.*);exp-(.*)$/)){j=RegExp.$1;}
if(typeof k[j]=="undefined"){k[j]=1;h[g[i]]=1;}}
g=[];for(i in utag.loader.GV(h)){g.push(i);}}
d[e]=g}}else d[e]=f;}
h=new Array();for(g in utag.loader.GV(d)){if(utag.ut.typeOf(d[g])=="array"){for(c=0;c<d[g].length;c++){d[g][c]=encodeURIComponent(d[g][c])}
h.push(g+":~"+d[g].join("|"))}else h.push((g+":").replace(/[\,\$\;\?]/g,"")+encodeURIComponent(d[g]))}
if(h.length==0){h.push("");x=""}
v=(h.join("$"));}
document.cookie=a+"="+v+";path=/;domain="+utag.cfg.domain+";expires="+x+(utag.cfg.secure_cookie?";secure":"");return 1},LOAD:function(a,b,c,d){if(!utag.loader.cfg){return}
if(this.ol==0){if(utag.loader.cfg[a].block&&utag.loader.cfg[a].cbf){this.f[a]=1;delete utag.loader.bq[a];}
for(b in utag.loader.GV(utag.loader.bq)){if(utag.loader.cfg[a].load==4&&utag.loader.cfg[a].wait==0){utag.loader.bk[a]=1;utag.DB("blocked: "+a);}
utag.DB("blocking: "+b);return;}
utag.loader.INIT();return;}
utag.DB('utag.loader.LOAD:'+a);if(this.f[a]==0){this.f[a]=1;if(utag.cfg.noview!=true){if(utag.loader.cfg[a].send){utag.DB("SENDING: "+a);try{if(utag.loader.sendq.pending>0&&utag.loader.sendq[a]){utag.DB("utag.loader.LOAD:sendq: "+a);while(d=utag.loader.sendq[a].shift()){utag.DB(d);utag.sender[a].send(d.event,utag.handler.C(d.data));utag.loader.sendq.pending--;}}else{utag.sender[a].send('view',utag.handler.C(utag.data));}
utag.rpt['s_'+a]=0;}catch(e){utag.DB(e);utag.rpt['s_'+a]=1;}}}
if(utag.loader.rf==0)return;for(b in utag.loader.GV(this.f)){if(this.f[b]==0||this.f[b]==2)return}
utag.loader.END();}},EV:function(a,b,c,d){if(b=="ready"){if(!utag.data){try{utag.cl={'_all_':1};utag.loader.initdata();utag.loader.RD(utag.data);}catch(e){utag.DB(e)};}
if((document.attachEvent||utag.cfg.dom_complete)?document.readyState==="complete":document.readyState!=="loading")setTimeout(c,1);else{utag.loader.ready_q.push(c);var RH;if(utag.loader.ready_q.length<=1){if(document.addEventListener){RH=function(){document.removeEventListener("DOMContentLoaded",RH,false);utag.loader.run_ready_q()};if(!utag.cfg.dom_complete)document.addEventListener("DOMContentLoaded",RH,false);window.addEventListener("load",utag.loader.run_ready_q,false);}else if(document.attachEvent){RH=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",RH);utag.loader.run_ready_q()}};document.attachEvent("onreadystatechange",RH);window.attachEvent("onload",utag.loader.run_ready_q);}}}}else{if(a.addEventListener){a.addEventListener(b,c,false)}else if(a.attachEvent){a.attachEvent(((d==1)?"":"on")+b,c)}}},END:function(b,c,d,e,v,w){if(this.ended){return};this.ended=1;utag.DB("loader.END");b=utag.data;if(utag.handler.base&&utag.handler.base!='*'){e=utag.handler.base.split(",");for(d=0;d<e.length;d++){if(typeof b[e[d]]!="undefined")utag.handler.df[e[d]]=b[e[d]]}}else if(utag.handler.base=='*'){utag.ut.merge(utag.handler.df,b,1);}
utag.rpt['r_0']="t";for(var r in utag.loader.GV(utag.cond)){utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";}
utag.rpt.ts['s']=new Date();v=utag.cfg.path;w=v.indexOf(".tiqcdn.");if(w>0&&b["cp.utag_main__ss"]==1&&!utag.cfg.no_session_count)utag.ut.loader({src:v.substring(0,v.indexOf("/ut"+"ag/")+6)+"tiqapp/ut"+"ag.v.js?a="+utag.cfg.utid+(utag.cfg.nocookie?"&nocookie=1":"&cb="+(new Date).getTime()),id:"tiqapp"})
if(utag.cfg.noview!=true)utag.handler.RE('view',b,"end");utag.handler.INIT();}},DB:function(a,b){if(utag.cfg.utagdb===false){return;}else if(typeof utag.cfg.utagdb=="undefined"){b=document.cookie+'';utag.cfg.utagdb=((b.indexOf('utagdb=true')>=0)?true:false);}
if(utag.cfg.utagdb===true){var t;if(utag.ut.typeOf(a)=="object"){t=utag.handler.C(a)}else{t=a}
utag.db_log.push(t);try{if(!utag.cfg.noconsole)console.log(t)}catch(e){}}},RP:function(a,b,c){if(typeof a!='undefined'&&typeof a.src!='undefined'&&a.src!=''){b=[];for(c in utag.loader.GV(a)){if(c!='src')b.push(c+'='+escape(a[c]))}
this.dbi.push((new Image()).src=a.src+'?utv='+utag.cfg.v+'&utid='+utag.cfg.utid+'&'+(b.join('&')))}},view:function(a,c,d){return this.track({event:'view',data:a||{},cfg:{cb:c,uids:d}})},link:function(a,c,d){return this.track({event:'link',data:a||{},cfg:{cb:c,uids:d}})},track:function(a,b,c,d,e){a=a||{};if(typeof a=="string"){a={event:a,data:b||{},cfg:{cb:c,uids:d}}}
for(e in utag.loader.GV(utag.o)){utag.o[e].handler.trigger(a.event||"view",a.data||a,a.cfg||{cb:b,uids:c})}
a.cfg=a.cfg||{cb:b};if(typeof a.cfg.cb=="function")a.cfg.cb();return true},handler:{base:"",df:{},o:{},send:{},iflag:0,INIT:function(a,b,c){utag.DB('utag.handler.INIT');if(utag.initcatch){utag.initcatch=0;return}
this.iflag=1;a=utag.loader.q.length;if(a>0){utag.DB("Loader queue");for(b=0;b<a;b++){c=utag.loader.q[b];utag.handler.trigger(c.a,c.b,c.c)}}
},test:function(){return 1},LR:function(b){utag.DB("Load Rules");for(var d in utag.loader.GV(utag.cond)){utag.cond[d]=false;}
utag.DB(b);utag.loader.loadrules(b);utag.DB(utag.cond);utag.loader.initcfg();utag.loader.OU();for(var r in utag.loader.GV(utag.cond)){utag.rpt['r_'+r]=(utag.cond[r])?"t":"f";}},RE:function(a,b,c,d,e,f,g){if(c!="alr"&&!this.cfg_extend){return 0;}
utag.DB("RE: "+c);if(c=="alr")utag.DB("All Tags EXTENSIONS");utag.DB(b);if(typeof this.extend!="undefined"){g=0;for(d=0;d<this.extend.length;d++){try{e=0;if(typeof this.cfg_extend!="undefined"){f=this.cfg_extend[d];if(typeof f.count=="undefined")f.count=0;if(f[a]==0||(f.once==1&&f.count>0)||f[c]==0){e=1}else{if(f[c]==1){g=1};f.count++}}
if(e!=1){this.extend[d](a,b);utag.rpt['ex_'+d]=0}}catch(er){utag.DB(er);utag.rpt['ex_'+d]=1;utag.ut.error({e:er.message,s:utag.cfg.path+'utag.js',l:d,t:'ge'});}}
utag.DB(b);return g;}},trigger:function(a,b,c,d,e,f){utag.DB('trigger:'+a+(c&&c.uids?":"+c.uids.join(","):""));b=b||{};utag.DB(b);if(!this.iflag){utag.DB("trigger:called before tags loaded");for(d in utag.loader.f){if(!(utag.loader.f[d]===1))utag.DB('Tag '+d+' did not LOAD')}
utag.loader.q.push({a:a,b:utag.handler.C(b),c:c});return;}
utag.ut.merge(b,this.df,0);utag.loader.RD(b,a);utag.cfg.noview=false;function sendTag(a,b,d){try{if(typeof utag.sender[d]!="undefined"){utag.DB("SENDING: "+d);utag.sender[d].send(a,utag.handler.C(b));utag.rpt['s_'+d]=0;}else if(utag.loader.cfg[d].load!=2){utag.loader.sendq[d]=utag.loader.sendq[d]||[];utag.loader.sendq[d].push({"event":a,"data":utag.handler.C(b)});utag.loader.sendq.pending++;utag.loader.AS({id:d,load:1});}}catch(e){utag.DB(e)}}
if(c&&c.uids){this.RE(a,b,"alr");for(f=0;f<c.uids.length;f++){d=c.uids[f];if(!utag.loader.OU(utag.loader.cfg[d].tid)){sendTag(a,b,d);}}}else if(utag.cfg.load_rules_ajax){this.RE(a,b,"blr");this.LR(b);this.RE(a,b,"alr");for(f=0;f<utag.loader.cfgsort.length;f++){d=utag.loader.cfgsort[f];if(utag.loader.cfg[d].load&&utag.loader.cfg[d].send){sendTag(a,b,d);}}}else{this.RE(a,b,"alr");for(d in utag.loader.GV(utag.sender)){sendTag(a,b,d);}}
this.RE(a,b,"end");},C:function(a,b,c){b={};for(c in utag.loader.GV(a)){if(utag.ut.typeOf(a[c])=="array"){b[c]=a[c].slice(0)}else{b[c]=a[c]}}
return b}},ut:{pad:function(a,b,c,d){a=""+((a-0).toString(16));d='';if(b>a.length){for(c=0;c<(b-a.length);c++){d+='0'}}return""+d+a},vi:function(t,a,b){if(!utag.v_id){a=this.pad(t,12);b=""+Math.random();a+=this.pad(b.substring(2,b.length),16);try{a+=this.pad((navigator.plugins.length?navigator.plugins.length:0),2);a+=this.pad(navigator.userAgent.length,3);a+=this.pad(document.URL.length,4);a+=this.pad(navigator.appVersion.length,3);a+=this.pad(screen.width+screen.height+parseInt((screen.colorDepth)?screen.colorDepth:screen.pixelDepth),5)}catch(e){utag.DB(e);a+="12345"};utag.v_id=a;}
return utag.v_id},hasOwn:function(o,a){return o!=null&&Object.prototype.hasOwnProperty.call(o,a)},isEmptyObject:function(o,a){for(a in o){if(utag.ut.hasOwn(o,a))return false}
return true},isEmpty:function(o){var t=utag.ut.typeOf(o);if(t=="number"){return isNaN(o)}else if(t=="boolean"){return false}else if(t=="string"){return o.length===0}else return utag.ut.isEmptyObject(o)},typeOf:function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();},flatten:function(o){var a={};function r(c,p){if(Object(c)!==c||utag.ut.typeOf(c)=="array"){a[p]=c;}else{if(utag.ut.isEmptyObject(c)){}else{for(var d in c){r(c[d],p?p+"."+d:d);}}}}
r(o,"");return a;},merge:function(a,b,c,d){if(c){for(d in utag.loader.GV(b)){a[d]=b[d]}}else{for(d in utag.loader.GV(b)){if(typeof a[d]=="undefined")a[d]=b[d]}}},decode:function(a,b){b="";try{b=decodeURIComponent(a)}catch(e){utag.DB(e)};if(b==""){b=unescape(a)};return b},encode:function(a,b){b="";try{b=encodeURIComponent(a)}catch(e){utag.DB(e)};if(b==""){b=escape(a)};return b},error:function(a,b,c){if(typeof utag_err!="undefined"){utag_err.push(a)}},loader:function(o,a,b,c,l,m){utag.DB(o);a=document;if(o.type=="iframe"){m=a.getElementById(o.id);if(m&&m.tagName=="IFRAME"){m.parentNode.removeChild(m);}
b=a.createElement("iframe");o.attrs=o.attrs||{};utag.ut.merge(o.attrs,{"height":"1","width":"1","style":"display:none"},0);}else if(o.type=="img"){utag.DB("Attach img: "+o.src);b=new Image();}else{b=a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8";}
if(o.id){b.id=o.id};for(l in utag.loader.GV(o.attrs)){b.setAttribute(l,o.attrs[l])}
b.setAttribute("src",o.src);if(typeof o.cb=="function"){if(b.addEventListener){b.addEventListener("load",function(){o.cb()},false);}else{b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}};}}
if(typeof o.error=="function"){utag.loader.EV(b,"error",o.error);}
if(o.type!="img"){l=o.loc||"head";c=a.getElementsByTagName(l)[0];if(c){utag.DB("Attach to "+l+": "+o.src);if(l=="script"){c.parentNode.insertBefore(b,c);}else{c.appendChild(b)}}}}}};utag.o['swisscom.main']=utag;utag.cfg={template:"ut4.48.",load_rules_ajax:true,load_rules_at_wait:false,lowerqp:false,noconsole:false,session_timeout:1800000,readywait:0,noload:0,domain:utag.loader.lh(),datasource:"##UTDATASOURCE##".replace("##"+"UTDATASOURCE##",""),secure_cookie:("##UTSECURECOOKIE##".replace("##"+"UTSECURECOOKIE##","")==="true")?true:false,path:"https://tags.tiqcdn.com/utag/swisscom/main/prod/",utid:"swisscom/main/202307060741"};utag.cfg.v=utag.cfg.template+"202307060742";utag.cond={13222:0,13255:0,13272:0,13274:0,13368:0,13378:0,13446:0,13450:0,13454:0,13473:0,13479:0,13495:0,13496:0,13497:0,13500:0,13501:0,13502:0,13503:0,13504:0,13531:0,13535:0,13540:0,13564:0};utag.pagevars=function(ud){ud=ud||utag.data;try{ud['js_page.document.body.dataset.showConsentPopup']=document.body.dataset.showConsentPopup}catch(e){utag.DB(e)};try{ud['js_page.show_consent']=show_consent}catch(e){utag.DB(e)};try{ud['js_page.navigator.userAgent']=navigator.userAgent}catch(e){utag.DB(e)};try{ud['js_page.SCS.dl.executionContext']=SCS.dl.executionContext}catch(e){utag.DB(e)};try{ud['js_page.consent_master']=consent_master}catch(e){utag.DB(e)};try{ud['js_page.window._consent_marketing']=window._consent_marketing}catch(e){utag.DB(e)};};utag.loader.chkCanRunTime=function(s,e,d,t,o,i){try{o={is:[s,e],dt:[],tm:[],hd:0,ms:0};for(i=0;i<2;i++){d=o.is[i].substring(0,8);t=o.is[i].substring(8);o.dt[i]=new Date();if(d!=='--------'){o.dt[i].setFullYear(d.substring(0,4));o.dt[i].setMonth(parseInt(d.substring(4,6))-1);o.dt[i].setDate(d.substring(6,8));}if(t!=='----'){o.dt[i].setHours(t.substring(0,2));o.dt[i].setMinutes(t.substring(2,4));}else{o.dt[i].setHours(o.hd);o.dt[i].setMinutes(o.ms);}o.dt[i].setSeconds(o.ms);o.tm[i]=o.dt[i].getTime();o.hd=23;o.ms=59;}o.n=new Date().getTime();return(o.n>=o.tm[0]&&o.n<=o.tm[1]);}catch(e){return false;}};utag.loader.initdata=function(){try{utag.data=(typeof utag_data!='undefined')?utag_data:{};utag.udoname='utag_data';}catch(e){utag.data={};utag.DB('idf:'+e);}};utag.loader.loadrules=function(_pd,_pc){var d=_pd||utag.data;var c=_pc||utag.cond;for(var l in utag.loader.GV(c)){switch(l){case'13222':try{c[13222]|=(typeof d['sys_context']=='undefined')||(typeof d['sys_context']!='undefined'&&d['sys_context']=='')||(d['sys_context'].toString().toLowerCase()=='selfcare'.toLowerCase())||(d['sys_context'].toString().toLowerCase()=='online'.toLowerCase())}catch(e){utag.DB(e)};break;case'13255':try{c[13255]|=(typeof d['page_language']!='undefined'&&d['page_language'].toString().toLowerCase()=='de'.toLowerCase())||(typeof d['page_language']!='undefined'&&d['page_language'].toString().toLowerCase()=='fr'.toLowerCase())}catch(e){utag.DB(e)};break;case'13272':try{c[13272]|=(typeof d['isBlacklistedURL']=='undefined')||(typeof d['isBlacklistedURL']!='undefined'&&d['isBlacklistedURL'].toString().toLowerCase()=='false'.toLowerCase())}catch(e){utag.DB(e)};break;case'13274':try{c[13274]|=(typeof d['isBlacklistedURL']!='undefined'&&d['isBlacklistedURL'].toString().toLowerCase()=='false'.toLowerCase())||(typeof d['isBlacklistedURL']=='undefined')}catch(e){utag.DB(e)};break;case'13368':try{c[13368]|=(typeof d['tealium_event']!='undefined'&&d['tealium_event'].toString().toLowerCase()=='order'.toLowerCase())||(typeof d['tealium_event']!='undefined'&&d['tealium_event'].toString().toLowerCase()=='purchase'.toLowerCase())}catch(e){utag.DB(e)};break;case'13378':try{c[13378]|=(typeof d['cp.scs_fb_optout']!='undefined'&&d['cp.scs_fb_optout'].toString().toLowerCase()!='true'.toLowerCase())||(typeof d['cp.scs_fb_optout']=='undefined')}catch(e){utag.DB(e)};break;case'13446':try{c[13446]|=(typeof d['cp.utagdb']!='undefined'&&d['cp.utagdb'].toString().toLowerCase()=='true'.toLowerCase()&&d['dom.url'].toString().indexOf('cms.')>-1)||(d['dom.url'].toString().indexOf('cms.')<0)}catch(e){utag.DB(e)};break;case'13450':try{c[13450]|=(typeof d['page_path']!='undefined'&&d['page_path'].toString().toLowerCase()=='confirmation'.toLowerCase()&&typeof d['sys_platform']!='undefined'&&d['sys_platform'].toString().toLowerCase()=='registration'.toLowerCase())}catch(e){utag.DB(e)};break;case'13454':try{c[13454]|=(typeof d['sys_platform']!='undefined'&&d['sys_platform'].toString().toLowerCase()=='blue'.toLowerCase())}catch(e){utag.DB(e)};break;case'13473':try{c[13473]|=(utag.loader.chkCanRunTime("202106152355","------------"))&&((typeof d['js_page.show_consent']!='undefined'&&d['js_page.show_consent'].toString().toLowerCase()=='true'.toLowerCase()&&typeof d['js_page.consent_master']!='undefined'&&d['js_page.consent_master'].toString().toLowerCase()=='tiq'.toLowerCase()))}catch(e){utag.DB(e)};break;case'13479':try{c[13479]|=(typeof d['isCrawler']!='undefined'&&d['isCrawler'].toString().toLowerCase()!='true'.toLowerCase())}catch(e){utag.DB(e)};break;case'13495':try{c[13495]|=(/(Teleclub_Rom_Sport_F|Teleclub_0818_Sport|Elvis_Neo|Elvis_Doku|Teleclub Rom LES\+|Teleclub_Rom_LES_plus|TV_2014_S-VoD_Dokus_F|Teleclub_Rom_Premium)/.test(d['product_id_piped'])&&typeof d['sys_platform']!='undefined'&&d['sys_platform']=='order')}catch(e){utag.DB(e)};break;case'13496':try{c[13496]|=(typeof d['sys_platform']!='undefined'&&d['sys_platform'].toString().toLowerCase()=='blue'.toLowerCase())}catch(e){utag.DB(e)};break;case'13497':try{c[13497]|=(/^blue\/(sport(s)?|(filme-und-serien|movies-and-series|films-et-series|film-e-serie)\/(max|doku))$/i.test(d['page_path']))||(d['page_path'].toString().indexOf('/lp-sport')>-1&&/^blue/.test(d['page_path']))||(d['page_path'].toString().indexOf('/lp-fiction')>-1&&/^blue/.test(d['page_path']))}catch(e){utag.DB(e)};break;case'13500':try{c[13500]|=(typeof d['page_path']!='undefined'&&d['page_path'].toString().toLowerCase()=='order/wireline-tv/subscriptioncenter/checkout/confirmation'.toLowerCase())}catch(e){utag.DB(e)};break;case'13501':try{c[13501]|=(/Elvis_Neo/i.test(d['product_id_piped'])&&typeof d['product_id_piped']!='undefined')}catch(e){utag.DB(e)};break;case'13502':try{c[13502]|=(typeof d['product_id_piped']!='undefined'&&/Elvis_Doku|TV_2014_S-VoD_Dokus_F/i.test(d['product_id_piped']))}catch(e){utag.DB(e)};break;case'13503':try{c[13503]|=(typeof d['product_id_piped']!='undefined'&&/Teleclub_Rom_Sport_F|Teleclub_0818_Sport/i.test(d['product_id_piped']))}catch(e){utag.DB(e)};break;case'13504':try{c[13504]|=(typeof d['product_id_piped']!='undefined'&&/Swisscom Blue TV Air/i.test(d['product_id_piped']))}catch(e){utag.DB(e)};break;case'13531':try{c[13531]|=(typeof d['blueLandingPage']!='undefined'&&typeof d['blueLandingPage']!='undefined'&&d['blueLandingPage']!='')}catch(e){utag.DB(e)};break;case'13535':try{c[13535]|=(typeof d['sys_platform']!='undefined'&&d['sys_platform'].toString().toLowerCase()!='internetguard'.toLowerCase())}catch(e){utag.DB(e)};break;case'13540':try{c[13540]|=(typeof d['sys_platform']!='undefined'&&d['sys_platform'].toString().indexOf('blue')>-1&&d['sys_platform'].toString().toLowerCase()!='bluewin'.toLowerCase())}catch(e){utag.DB(e)};break;case'13564':try{c[13564]|=(typeof d['cp.aepBlue']!='undefined'&&typeof d['cp.aepBlue']!='undefined'&&d['cp.aepBlue']!='')}catch(e){utag.DB(e)};break;}}};utag.pre=function(){utag.loader.initdata();utag.pagevars();try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};utag.loader.loadrules();};utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();utag.handler.extend=[function(a,b){try{if(1){try{b['_isNotEuropeanUnionVisitor']=String(!(window.geolocation&&window.geolocation.euvisitor))}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if(1){try{b['_isNotEuropeanUnionVisitor']=String(!(window.geolocation&&window.geolocation.euvisitor))}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if(1){try{b['_isNotEuropeanUnionVisitor']=String(!(window.geolocation&&window.geolocation.euvisitor))}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if(1){try{b['_isNotBlacklistedChatCountry']=String(!(window.geolocation&&window.geolocation.blacklisted))}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if((typeof b['sys_platform']!='undefined'&&b['sys_platform'].toString().toLowerCase()=='order'.toLowerCase()&&typeof b['page_path']!='undefined'&&/^order\/(oshop|wireless|wireline)\/.*\/checkout\/confirmation/.test(b['page_path']))||(typeof b['sys_platform']!='undefined'&&typeof b['page_path']!='undefined'&&b['sys_platform'].toString().toLowerCase()=='order'.toLowerCase()&&/\/store\/checkout\/confirmation/.test(b['page_path']))||(typeof b['page_path']!='undefined'&&/^one-to-one\/|^personal-offer\//.test(b['page_path']))){b['_isWhitelisted']='true'}}catch(e){utag.DB(e);}},function(a,b){try{if((typeof b['sys_platform']!='undefined'&&b['sys_platform'].toString().toLowerCase()=='order'.toLowerCase()&&typeof b['page_path']!='undefined'&&/^order\/(oshop|wireless|wireline)\/.*\/checkout\/confirmation/.test(b['page_path']))||(typeof b['sys_platform']!='undefined'&&typeof b['page_path']!='undefined'&&b['sys_platform'].toString().toLowerCase()=='order'.toLowerCase()&&/\/store\/checkout\/confirmation/.test(b['page_path']))||(typeof b['page_path']!='undefined'&&/^one-to-one\/|^personal-offer\//.test(b['page_path']))){b['_isWhitelisted']='true'}}catch(e){utag.DB(e);}},function(a,b){try{if(1){var flag=SCS.datalayer.get('apps.uxTracking.active');if(typeof flag!=='undefined'){b._uxTrackingActive=flag.toString();}}}catch(e){utag.DB(e)}},function(a,b,c,d,e,f,g){if(1){d=b['sys_environment'];if(typeof d=='undefined')return;c=[{'prod':'scswebchat.scapp.swisscom.com'}];var m=false;for(e=0;e<c.length;e++){for(f in utag.loader.GV(c[e])){if(d==f){b['genesys_chatcontact_url']=c[e][f];m=true};};if(m)break};if(!m)b['genesys_chatcontact_url']='scswebchat-int.scapp.swisscom.com';}},function(a,b){try{if(1){try{b['_isNotBlacklistedChatCountry']=String(!(window.geolocation&&window.geolocation.blacklisted))}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if(1){try{b['tiktok_auto_page_tracking']=false}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if(1){checkForCrawler=function(){var googleUAs=/Google(bot(-?)(Image|News|Video)?| Favicon|(-?)-Read-Aloud|weblight)|AdsBot-Google(-?)(Mobile)?(-Apps)?|(APIs|DuplexWeb|FeedFetcher|Mediapartners|Storebot)-Google/i,agent=navigator.userAgent;return googleUAs.test(agent);};window.utag_data.isCrawler=checkForCrawler().toString();}}catch(e){utag.DB(e)}},function(a,b){try{if(1){try{b['cart.ordertotal']=SCS.dl.get('cart.ordertotal');}catch(e){};try{b['customer_lifetime_value']=SCS.tl.products.getLifetimeValue();}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if((typeof b['conversion_id']!='undefined'&&b['conversion_id']=='addProductToBasket')||(typeof b['conversion_category']!='undefined'&&b['conversion_category']=='basket'&&typeof b['conversion_detail']!='undefined'&&b['conversion_detail']=='product_added')){b['tealium_event']='cart_add';}}catch(e){utag.DB(e);}try{if(b['event_name']=='cart_empty'){b['tealium_event']='cart_empty';}}catch(e){utag.DB(e);}try{if((typeof b['conversion_id']!='undefined'&&b['conversion_id']=='removeProductFromBasket')||(typeof b['conversion_category']!='undefined'&&b['conversion_category']=='basket'&&typeof b['conversion_detail']!='undefined'&&b['conversion_detail']=='product_removed')){b['tealium_event']='cart_remove';}}catch(e){utag.DB(e);}try{if((typeof b['conversion_category']!='undefined'&&b['conversion_category'].toString().toLowerCase()=='basket'.toLowerCase()&&typeof b['conversion_detail']!='undefined'&&b['conversion_detail'].toString().indexOf('viewed')>-1)){b['tealium_event']='cart_view';}}catch(e){utag.DB(e);}try{if(b['page_type']=='category'){b['tealium_event']='category_view';}}catch(e){utag.DB(e);}try{if((typeof b['conversion_id']!='undefined'&&/basket|checkout|config/.test(b['conversion_id']))||(typeof b['conversion_category']!='undefined'&&/basket|checkout|config/.test(b['conversion_category']))){b['tealium_event']='checkout';}}catch(e){utag.DB(e);}try{if(b['event_name']=='email_signup'){b['tealium_event']='email_signup';}}catch(e){utag.DB(e);}try{if(b['page_type']=='generic'){b['tealium_event']='page_view';}}catch(e){utag.DB(e);}try{if((typeof b['page_type']!='undefined'&&b['page_type']=='product')||(typeof b['conversion_category']!='undefined'&&b['conversion_category']=='offer'&&typeof b['conversion_detail']!='undefined'&&b['conversion_detail']=='viewed')){b['tealium_event']='product_view';}}catch(e){utag.DB(e);}try{if((typeof b['conversion_id']!='undefined'&&b['conversion_id']=='purchased')||(typeof b['conversion_detail']!='undefined'&&b['conversion_detail']=='purchased'&&typeof b['conversion_category']!='undefined'&&b['conversion_category'].toString().toLowerCase()=='order'.toLowerCase())){b['tealium_event']='purchase';}}catch(e){utag.DB(e);}try{if(b['page_type']=='search'){b['tealium_event']='search';}}catch(e){utag.DB(e);}try{if(b['event_name']=='social_share'){b['tealium_event']='social_share';}}catch(e){utag.DB(e);}try{if(b['event_name']=='user_login'){b['tealium_event']='user_login';}}catch(e){utag.DB(e);}try{if(b['event_name']=='user_logout'){b['tealium_event']='user_logout';}}catch(e){utag.DB(e);}try{if(b['event_name']=='user_register'){b['tealium_event']='user_register';}}catch(e){utag.DB(e);}},function(a,b){try{if(1){try{b['number_of_products']=SCS.tl.products.getList().length}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if(1){const pagePath=SCS.dl.get("page.path","");const regex=/^blue\/.*(lp-(sport|fiction))/;const match=pagePath.match(regex);if(match&&match.length>0){utag_data.blueLandingPage=`blue-${match[1]}`;}else{delete utag_data.blueLandingPage;}}}catch(e){utag.DB(e)}},function(a,b){try{if(1){try{if(SCS&&SCS.tl&&SCS.tl.isBlacklistedURL){b.isBlacklistedURL=SCS.tl.isBlacklistedURL()?'true':'false';}}catch(e){b.isBlacklistedURL='false';}}}catch(e){utag.DB(e)}},function(a,b){try{if(1){(()=>{try{window.consent_master=document.cookie.includes("consent_poc")?"launch":"tiq";const consentConfig={tiq:{cookie:"CONSENTMGR",categories:{analytics:"c1:1",personalization:"c6:1",marketing:"c7:1",visitorRecognition:"c15:1"}},launch:{cookie:"OptanonConsent",categories:{analytics:"C0002:1",personalization:"C0003:1",marketing:"C0004:1",visitorRecognition:"C0005:1"}}};const config=consentConfig[window.consent_master];const consentCookie=decodeURIComponent(window.getCookie(config.cookie)||"");for(const[category,value]of Object.entries(config.categories)){window[`_consent_${category}`]=consentCookie.includes(config.categories[category])?"true":"false"}}catch(e){console.error(e);}})();}}catch(e){utag.DB(e)}},function(a,b){try{if(1){window['adrum-config']=window['adrum-config']||{};(function(config){function getUuid(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,c=>(c^crypto.getRandomValues(new Uint8Array(1))[0]&15>>c/4).toString(16));}
try{const _appDynamicsActiveMeta=document.querySelector('meta[name^="appD_active" i]')?.content==='true';if(SCS.dl.executionContext==='page'&&_appDynamicsActiveMeta){if(window.adrum_initialized&&window?.ADRUM?.setVirtualPageName){const path=SCS.dl.get('page.path');const needsBtxId=['mobile/handy-abo','produkte/smartphones/details/'].some((regex)=>new RegExp(regex).test(path));const BTX_SS_ID='businessTxId';let btxId=SCS.tl.getSessionValue(BTX_SS_ID);if(needsBtxId&&!btxId){btxId=getUuid();SCS.dl.debug('ADRUM: updated',BTX_SS_ID,btxId);SCS.tl.setSessionValue(BTX_SS_ID,btxId);}
const userData={scs_businessTxId:needsBtxId?btxId:undefined,scs_sessionChannel:SCS.dl.get('platform.context'),x_client_usecase:SCS.dl.get('cart.ordercase'),x_oce_client:'oce-omni-browsing',scs_isLoggedIn:SCS.tl.isLoggedIn()?'true':'false',};const data={userPageName:path,userData:userData,};config.userEventInfo={...config.userEventInfo,PageView:data,VPageView:data,Ajax:data,};SCS.dl.debug('ADRUM: updated config',config);}}}catch(e){SCS.dl.error('ADRUM: error',e);}})(window['adrum-config']);}}catch(e){utag.DB(e)}},function(a,b){try{if(1){var platform=SCS.dl.get('platform.platform'),path=SCS.dl.get('page.path',''),convID=SCS.dl.get('conversion.id',''),convSubj=SCS.dl.get('conversion.subject',''),overwritten=false;function setConversion(category,detail){SCS.dl.data.conversion.category=category;SCS.dl.data.conversion.detail=detail;SCS.dl.data.conversion.class=SCS.dl.data.conversion.subject;overwritten=true;}
if(platform==='neo'&&path!==''){switch(path){case'confirmation':case'legoConfirmation':case'mobileactivation-confirmation':case'mobileNumberChangeConfirmation':case'retention-confirmation':case'terminationConfirmation':if(convID==='purchased'){setConversion('order','purchased')}
break;case'additional-information':case'billing':case'billingDeliveryAddress':case'bundleSelect':case'cpe':case'deviceDetails':case'initOrder':case'installation':case'internet':case'mobile-summary':case'mobileCustomerIdentification':case'mobileNumber':case'mobileNumberCorrection':case'multiDevice':case'overview':case'summary':case'tv':case'voip':if(convID==='configuration'){setConversion('config','step');}
break;case'init':if(convID==='configuration'){setConversion('config','step');}else if(convID==='startOrder'){setConversion('checkout','start');}
break;case'navigation-error':case'callCuc':case'neoError':if(convID==='leadsToCall'){setConversion('lead','call');}
break;}
if(overwritten){delete SCS.dl.data.conversion.id;delete SCS.dl.data.conversion.subject;SCS.datalayer.debug('NEO conversion values have been overwritten');}}}}catch(e){utag.DB(e)}},function(a,b){try{if(1){b['_order_currency']='CHF'}}catch(e){utag.DB(e);}},function(a,b){try{if(1){try{b['_timestamp']=new Date().getTime();}catch(e){}}}catch(e){utag.DB(e);}},function(a,b){try{if(1){try{b['_referrer_path']=b["dom.referrer"].substr(b["dom.referrer"].indexOf("/",8)).split("?")[0]}catch(e){}}}catch(e){utag.DB(e);}},function(a,b,c,d,e,f,g){if(1){d=b['sys_environment'];if(typeof d=='undefined')return;c=[{'prod':'chatcontact.min.js'}];var m=false;for(e=0;e<c.length;e++){for(f in utag.loader.GV(c[e])){if(d==f){b['genesys_chatcontact_filename']=c[e][f];m=true};};if(m)break};if(!m)b['genesys_chatcontact_filename']='chatcontact.js';}},function(a,b,c,d){b._ccity=(typeof b['']!='undefined')?b['']:'';b._ccountry=(typeof b['']!='undefined')?b['']:'';b._ccurrency=(typeof b['_order_currency']!='undefined')?b['_order_currency']:'';b._ccustid=(typeof b['']!='undefined')?b['']:'';b._corder=(typeof b['order_id']!='undefined')?b['order_id']:'';b._cpromo=(typeof b['']!='undefined')?b['']:'';b._cship=(typeof b['']!='undefined')?b['']:'';b._cstate=(typeof b['']!='undefined')?b['']:'';b._cstore=(typeof b['']!='undefined')?b['']:'web';b._csubtotal=(typeof b['order_total']!='undefined')?b['order_total']:'';b._ctax=(typeof b['']!='undefined')?b['']:'';b._ctotal=(typeof b['cart.ordertotal']!='undefined')?b['cart.ordertotal']:'';b._ctype=(typeof b['']!='undefined')?b['']:'';b._czip=(typeof b['']!='undefined')?b['']:'';b._cprod=(typeof b['product_id_piped_MCT']!='undefined'&&b['product_id_piped_MCT'].length>0)?b['product_id_piped_MCT'].split('|'):[];b._cprodname=(typeof b['product_name_piped_MCT']!='undefined'&&b['product_name_piped_MCT'].length>0)?b['product_name_piped_MCT'].split('|'):[];b._cbrand=(typeof b['product_brand_piped_MCT']!='undefined'&&b['product_brand_piped_MCT'].length>0)?b['product_brand_piped_MCT'].split('|'):[];b._ccat=(typeof b['product_categories_piped_MCT']!='undefined'&&b['product_categories_piped_MCT'].length>0)?b['product_categories_piped_MCT'].split('|'):[];b._ccat2=(typeof b['']!='undefined'&&b[''].length>0)?b[''].split('|'):[];b._cquan=(typeof b['product_quantity_piped_MCT']!='undefined'&&b['product_quantity_piped_MCT'].length>0)?b['product_quantity_piped_MCT'].split('|'):[];b._cprice=(typeof b['product_price_piped_MCT']!='undefined'&&b['product_price_piped_MCT'].length>0)?b['product_price_piped_MCT'].split('|'):[];b._csku=(typeof b['product_key_piped_MCT']!='undefined'&&b['product_key_piped_MCT'].length>0)?b['product_key_piped_MCT'].split('|'):[];b._cpdisc=(typeof b['']!='undefined'&&b[''].length>0)?b[''].split('|'):[];if(b._cprod.length==0){b._cprod=b._csku.slice()};if(b._cprodname.length==0){b._cprodname=b._csku.slice()};function tf(a){if(a==''||isNaN(parseFloat(a))){return a}else{return(parseFloat(a)).toFixed(2)}};b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};},function(a,b){try{if(1){SCS.datalayer.runResetCallbacks();}}catch(e){utag.DB(e)}}];utag.handler.cfg_extend=[{"id":"13307","bwq":0,"alr":0,"end":0,"blr":1},{"id":"13310","bwq":0,"alr":0,"end":0,"blr":1},{"id":"13311","bwq":0,"alr":0,"end":0,"blr":1},{"alr":0,"bwq":0,"id":"13362","blr":1,"end":0},{"blr":1,"end":0,"alr":0,"bwq":0,"id":"13366"},{"end":0,"blr":1,"id":"13367","bwq":0,"alr":0},{"id":"13405","bwq":0,"alr":0,"end":0,"blr":1},{"blr":1,"end":0,"alr":0,"bwq":0,"id":"13424"},{"end":0,"blr":1,"id":"13433","bwq":0,"alr":0},{"end":0,"blr":1,"id":"13614","bwq":0,"alr":0},{"id":"13617","bwq":0,"alr":0,"end":0,"blr":1},{"blr":1,"end":0,"alr":0,"bwq":0,"id":"13623"},{"blr":1,"end":0,"alr":0,"bwq":0,"id":"13434"},{"alr":0,"bwq":0,"id":"13629","blr":1,"end":0},{"end":0,"blr":1,"id":"13647","bwq":0,"alr":0},{"blr":1,"end":0,"alr":0,"bwq":0,"id":"13656"},{"end":0,"blr":1,"id":"13659","bwq":0,"alr":0},{"alr":1,"bwq":0,"id":"13638","blr":0,"end":0},{"end":0,"blr":0,"id":"13516","bwq":0,"alr":1},{"end":0,"blr":0,"id":"12751","bwq":0,"alr":1},{"end":0,"blr":0,"id":"12760","bwq":0,"alr":1},{"end":0,"blr":0,"id":"12857","bwq":0,"alr":1},{"id":"13428","bwq":0,"alr":1,"end":0,"blr":0},{"alr":1,"bwq":0,"id":"13622","blr":0,"end":0},{"id":"13263","bwq":0,"alr":0,"end":1,"blr":0}];utag.loader.initcfg=function(){utag.loader.cfg={"17030":{load:((((utag.cond[13450])&&(utag.cond[13446])&&(utag.cond[13255])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17047":{load:((((utag.cond[13454])&&(utag.cond[13446])&&(utag.cond[13255])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17113":{load:((((utag.cond[13495])&&(utag.cond[13446])&&(utag.cond[13368])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17117":{load:((((utag.cond[13496])&&(utag.cond[13446])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17119":{load:((((utag.cond[13496])&&(utag.cond[13446])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13497]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17124":{load:((((utag.cond[13501])&&(utag.cond[13500])&&(utag.cond[13446])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17127":{load:((((utag.cond[13500])&&(utag.cond[13502])&&(utag.cond[13446])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17128":{load:((((utag.cond[13500])&&(utag.cond[13503])&&(utag.cond[13446])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17129":{load:((((utag.cond[13500])&&(utag.cond[13504])&&(utag.cond[13446])&&(utag.cond[13274])&&(utag.cond[13222])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:7132},"17229":{load:((((utag.cond[13378])&&(utag.cond[13274])&&(utag.cond[13531])&&(utag.cond[13479])&&(utag.cond[13535]))&&!(utag.cond[13564]))),tcat:7,send:1,v:202306201949,wait:1,tid:6037},"17235":{load:(((utag.cond[13272])&&(utag.cond[13540]))),tcat:7,send:1,v:202303212104,wait:1,tid:20119},"17237":{load:(((utag.cond[13540])&&(utag.cond[13272]))),tcat:7,send:1,v:202303212104,wait:1,tid:19129}};utag.loader.cfgsort=["17030","17047","17113","17117","17119","17124","17127","17128","17129","17229","17235","17237"];}
utag.loader.initcfg();try{utag.gdpr.applyConsentState();}catch(e){utag.DB(e)}}
utag.gdpr={trackUIDs:[],consent_prompt:{noShow:false,isEnabled:true,content:{}},preferences_prompt:{single_cookie:true,noShow:false,isEnabled:true,defaultState:true,content:{},categories:{"monitoring":{"id":14,"enabled":"1"},"personalization":{"enabled":"1","id":6},"big_data":{"id":8,"enabled":"1"},"engagement":{"id":13,"enabled":"1"},"analytics":{"id":1,"enabled":"1"},"display_ads":{"id":3,"enabled":"1"},"search":{"id":4,"enabled":"1"},"affiliates":{"id":2,"enabled":"1"},"mobile":{"id":12,"enabled":"1"},"social":{"id":7,"enabled":"1"},"cdp":{"enabled":"1","id":11},"misc":{"enabled":"1","id":9},"cookiematch":{"id":10,"enabled":"1"},"crm":{"enabled":"1","id":15},"email":{"id":5,"enabled":"1"}}},doNotSell:{noShow:false,isEnabled:false},getCategories:function(onlyEnabledCats){if(!(utag.gdpr.preferences_prompt&&utag.gdpr.preferences_prompt.categories)){return[];}
var length=utag.gdpr.keys(utag.gdpr.preferences_prompt.categories).length,cats=new Array(length),gdpr_cats=utag.gdpr.preferences_prompt.categories;for(var cat in gdpr_cats){if(!gdpr_cats.hasOwnProperty(cat)){continue;}
var isCatEnabled=gdpr_cats[cat].enabled===true||gdpr_cats[cat].enabled==1;if(onlyEnabledCats&&!isCatEnabled){continue;}
cats[gdpr_cats[cat].id-1]=cat;}
for(var i=cats.length-1;i>=0;i--){if(cats[i]===undefined){cats.splice(i,1);}}
return cats;},getSelectedCategories:function(){var sc=[],gc=utag.gdpr.getCategories(),cs=utag.gdpr.getConsentState(),i;try{if(typeof cs==="number"){return(parseInt(cs)===1)?gc:sc;}else{for(i in utag.loader.GV(cs)){if("1"===cs[i].ct){sc.push(gc[i]);}}}}
catch(e){utag.DB(e);}
return sc;},getCategoryLanguage:function(category){if(!(utag.gdpr.preferences_prompt&&utag.gdpr.preferences_prompt.categories)){return[];}
var language=utag.gdpr.getLanguage(utag.gdpr.preferences_prompt);return utag.gdpr.preferences_prompt.languages[language].categories[category];},getConsentState:function(){var re=/^c\d+/,cd=utag.gdpr.getCookieValues(),np=1,gc=utag.gdpr.getCategories(),pc=(function(gc){var pc=[];for(var i=0;i<gc.length;i++){pc.push({ct:null,name:gc[i]});}
return pc;}(gc)),filteredCD=(function(cd){var d={};for(var prop in cd){if(!cd.hasOwnProperty(prop)){continue;}
if(re.test(prop)){d[prop]=cd[prop];}}
return d;}(cd));filteredCD=utag.gdpr.sortedObject(filteredCD,function(val1,val2){var idx1=parseInt((val1||"").substring(1),10),idx2=parseInt((val2||"").substring(1),10);if(isNaN(idx1)||isNaN(idx2)){return 0;}
return idx1>idx2?1:-1;});for(var cn in utag.loader.GV(filteredCD)){if(cn.match(re)){var idx=parseInt(cn.substring(1),10)-1,ct=gc[idx];pc[idx].ct=cd[cn];if(cd[cn]*1!==1){np=0;}}}
if(cd.consent){if(cd.consent===true||cd.consent==="true"){return np?np:pc;}else{return-1;}}else if(np===0){return pc;}else{return 0;}},getCookieValues:function(){var values={},rcd=(function(){var value="; "+document.cookie;var parts=value.split("; "+utag.gdpr.cookieNS+"=");if(parts.length==2)return utag.ut.decode(parts.pop().split(";").shift());}()),cd=utag.gdpr.typeOf(rcd)==="string"?rcd:"";if(utag.data&&cd){utag.data["cp."+utag.gdpr.cookieNS]=cd;}
if(cd){var i,optOut,optOutData=decodeURI(cd).split("|");for(i=0;i<optOutData.length;i++){optOut=optOutData[i].split(":");values[optOut[0]]=optOut[1];}}
utag.gdpr.values=values;return values;},getDeTokenizedContent:function(data,_lang){if(utag.gdpr.isEmpty(data))return null;var tokenRegExpPattern=/{{(.*?)}}/gm,token_match=/[{}]/g,two_part=/display_ads|big_data/;var lang=utag.gdpr.getLanguage(data,_lang),langData=utag.gdpr.clone(data.languages[lang]);for(var t1 in utag.gdpr.sortedObject(langData.common_tokens)){if(!langData.common_tokens.hasOwnProperty(t1)){continue;}
langData.common_tokens[t1]=tokenReplace(langData.common_tokens[t1]);}
for(var t2 in utag.gdpr.sortedObject(langData.custom_tokens)){if(!langData.custom_tokens.hasOwnProperty(t2)){continue;}
langData.custom_tokens[t2]=tokenReplace(langData.custom_tokens[t2]);}
function tokenReplace(str){if(!str)return str;var replacements=str.match(tokenRegExpPattern);if(!replacements)return str;for(var i=0;i<replacements.length;i++){var token=replacements[i].replace(token_match,"")||"";var regExpReplaceAll=new RegExp(replacements[i],"g");if(langData.common_tokens[token]){str=str.replace(regExpReplaceAll,langData.common_tokens[token]);}else if(langData.custom_tokens[token]){str=str.replace(regExpReplaceAll,langData.custom_tokens[token]);}else if(langData.categories&&token.indexOf("category_")>-1){var split_token=token.split("_");if(token.match(two_part)){split_token[1]=split_token[1]+"_"+split_token[2];split_token.splice(2,1);}
var category=langData.categories[split_token[1]],key={"title":"name","description":"notes"}[split_token[2]];if(category[key]){str=str.replace(regExpReplaceAll,category[key]);}}}
return str;}
return{language:lang,tokens:langData,js:tokenReplace(data.content.js),html:tokenReplace(data.content.html),css:tokenReplace(data.content.css)};},getLanguage:function(promptData,preferredLang){var udoName=window.utag.udoname||"utag_data";var dataObject=window.utag.data||window[udoName];var langLocale=(preferredLang||dataObject[window.utag.cfg.gdprDLRef]||(navigator.languages&&navigator.languages[0]||navigator.language||navigator.userLanguage)).toLowerCase();var lang=(langLocale||"").split("-")[0];if(!promptData){return langLocale;}
var languages=promptData.languages;return languages[langLocale]?langLocale:languages[lang]?lang:promptData.defaultLang;},getTokenLanguage:function(promptData,token,lang){if(utag.gdpr.isEmpty(promptData))return null;if(utag.gdpr.isEmpty(token))return null;var getDeTokenizedContent=utag.gdpr.getDeTokenizedContent(promptData,lang);var langData=getDeTokenizedContent.tokens;if(lang&&getDeTokenizedContent.language!==lang)return null;if(utag.gdpr.isEmpty(langData))return null;if(langData.common_tokens[token]){return langData.common_tokens[token];}else if(langData.custom_tokens[token]){return langData.custom_tokens[token];}else if(langData.categories&&token.indexOf("category_")>-1){var split_token=token.split("_"),category=langData.categories[split_token[1]];if(category[split_token[2]]){return category[split_token[2]];}}
return null;},refreshCookie:function(){if(utag&&utag.DB){utag.DB("utag.gdpr.refreshCookie has been deprecated");}},setCookie:function(cookieData){utag.DB("Consent Manager: Set Cookie");if(utag.gdpr.typeOf(cookieData)!=="object"){return;}
if(utag.gdpr.keys(cookieData).length===0){return;}
var consentType=utag.gdpr.typeOf(cookieData.consent);if(consentType==="number"){cookieData.consent=cookieData.consent==1;consentType=utag.gdpr.typeOf(cookieData.consent);}
if(consentType!=="boolean"&&!(consentType==="string"&&(cookieData.consent.toLowerCase()==="true"||cookieData.consent.toLowerCase()==="false"))){utag.DB("Invalid option sent to setCookie [consent must be true/false]");return;}
if(utag.gdpr.typeOf(cookieData.ts)!=="number"||(cookieData.ts.toString().length!==13)){cookieData.ts=new Date().getTime();}
utag.gdpr.values=cookieData;var mo2Val=[];for(var i in utag.loader.GV(cookieData)){if(/^(consent|dns|ts|c\d+)$/.test(i)){mo2Val.push(i+":"+cookieData[i]);}else{utag.DB("Invalid option sent to setCookie ["+i+"], is unknown");}}
var daysToSet=utag.gdpr.consentPeriod;if(!daysToSet){var expiryMonths=cookieData.dns==undefined?12:13;var today=new Date();today.setMonth(today.getMonth()+expiryMonths);daysToSet=Math.ceil((today.getTime()-new Date().getTime())/(1000*60*60*24));}
var expiry=new Date(cookieData.ts);expiry.setDate(expiry.getDate()+daysToSet);var cookie_string=[utag.gdpr.cookieNS+"="+encodeURI(mo2Val.join("|")),"path="+utag.gdpr.path,"expires="+expiry.toGMTString()];if(utag.gdpr.domain){cookie_string.push("domain="+utag.gdpr.domain);}
document.cookie=cookie_string.join("; ");utag.data["cp."+utag.gdpr.cookieNS]=mo2Val.join("|");},defaultConsentForDoNotSell:function(key,cookieData){if(key==='dns'){var consentType=utag.gdpr.typeOf(cookieData.consent);if(consentType==="undefined"){utag.DB("Consent Manager: Defaulting missing consent for Do Not Sell.");cookieData.consent="true";}}
return cookieData;},setCookieValue:function(key,value){utag.DB("Consent Manager: Set Cookie Value");if(!key||(utag.gdpr.typeOf(value)==="undefined"||utag.gdpr.typeOf(value)==="null"))return;var cookieData=utag.handler.C(utag.gdpr.getCookieValues());cookieData[key]=value;cookieData=utag.gdpr.defaultConsentForDoNotSell(key,cookieData);utag.gdpr.setCookie(cookieData);},setConsentValue:function(_response){utag.DB("Consent Manager: Set Consent Value: "+_response);var valid={true:1,"true":1,1:1,false:0,"false":0,0:0};if(!valid.hasOwnProperty(_response)){throw new Error("No response supplied");}
var response=valid[_response]===1;utag.gdpr.setCookieValue("ts",new Date().getTime());utag.gdpr.setCookieValue("consent",response);utag.gdpr.processQueue(response);},setPreferencesValues:function(categories,noCollect){utag.DB("Consent Manager: Set Preferences Values");var i,fld,cookie_data=utag.gdpr.getCookieValues(),lookup={},rgx=/\D/,names=utag.gdpr.getCategories(),chosen_list=[],consent_seen=false,decline_seen=false,crgx=/c\d/;if(utag.gdpr.typeOf(categories)!=="object"){utag.DB("Categories is not type object.");return;}
try{for(i=0;i<names.length;i++){lookup[names[i]]="c"+(i+1);}
for(var cat in categories){if(!categories.hasOwnProperty(cat)){continue;}
if(categories[cat]!=="1"&&categories[cat]!=="0"&&categories[cat]!==1&&categories[cat]!==0){continue;}
if(cat.match(rgx)){cookie_data[lookup[cat]]=categories[cat];if(categories[cat]!=0){chosen_list.push(cat);}}else{cookie_data["c"+cat]=categories[cat];if(categories[cat]!=0){chosen_list.push(names[cat-1]);}}}
for(fld in utag.loader.GV(cookie_data)){if(fld.match(crgx)){if(cookie_data[fld]!=0){consent_seen=true;}else{decline_seen=true;}}}
cookie_data["ts"]=new Date().getTime();cookie_data["consent"]=consent_seen;utag.gdpr.setCookie(cookie_data);utag.gdpr.processQueue(consent_seen);}
catch(e){utag.DB(e);}
if(noCollect){return;}},setAllCategories:function(state,noCollect){utag.DB("Consent Manager: Set Preferences All Categories: "+state);if(state===undefined)return;if(utag.gdpr.typeOf(state)!=="boolean")return;var allCats=utag.gdpr.getCategories(),prefs={};for(var i=0;i<allCats.length;i++){prefs[""+(i+1)]=state?"1":"0";}
utag.gdpr.setPreferencesValues(prefs,noCollect);},setPreferencesFromList:function(list){utag.DB("Consent Manager: Set Preferences From List");var prefs={},allCats=utag.gdpr.getCategories();if(utag.gdpr.typeOf(list)!=="array"){utag.DB("List should be of type array");return;}
for(var i=0;i<list.length;i++){prefs[list[i]]="1";}
for(var j=0;j<allCats.length;j++){if(!prefs[allCats[j]]){prefs[allCats[j]]="0";}}
utag.gdpr.setPreferencesValues(prefs);},processQueue:function(consent_seen){utag.DB("Consent Manager: Processing Consent Queue");if(utag.gdpr.noqueue){return;}
if(!consent_seen){utag.gdpr.queue=[];return;}
utag.DB("Consent Manager: Processing Consent Queue Length: "+utag.gdpr.queue.length);var event,data,conds={};utag.gdpr.merge(conds,utag.cond);for(var i=0;i<utag.gdpr.queue.length;i++){event=utag.gdpr.queue[i];if(!(event.cfg&&event.cfg.uids)){data={};utag.loader.RD(data,event.event);utag.gdpr.merge(data,event.data,true);for(var cond in conds){if(!conds.hasOwnProperty(cond)){continue;}
conds[cond]=0;}
utag.handler.RE(event.event,data,"blr");utag.loader.loadrules(data,conds);event.cfg=event.cfg||{};event.cfg.uids=[];event.data=data;utag.cond=conds;utag.loader.initcfg();utag.gdpr.applyConsentState();var consentState=utag.gdpr.getConsentState();var csType=utag.gdpr.typeOf(consentState);for(var id in utag.loader.GV(utag.loader.cfg)){if(utag.gdpr.omittedTags[id])continue;var tag=utag.loader.cfg[id];if(tag.load&&tag.send){if(tag.tcat!==0){if((csType==="array"&&consentState[tag.tcat-1].ct=="1")||(csType==="number"&&consentState==1)){event.cfg.uids.push(id);}}else if(tag.tcat===0){event.cfg.uids.push(id);}}}}
if(event.cfg.uids){for(var indexCfgUID=event.cfg.uids.length-1;indexCfgUID>-1;indexCfgUID--){if(!utag.gdpr.omittedTags[event.cfg.uids[indexCfgUID]])continue;event.cfg.uids.splice(indexCfgUID,1);}
utag.gdpr.trackUIDs=utag.gdpr.trackUIDs.concat(event.cfg.uids);}
utag.track_old.call(this,event);}
utag.gdpr.queue=[];},typeOf:function(e){return({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();},merge:function(a,b,c,d){if(c){for(d in utag.loader.GV(b)){a[d]=b[d];}}else{for(d in utag.loader.GV(b)){if(typeof a[d]=="undefined")
a[d]=b[d];}}},shouldTagFire:function(taguid){if(!taguid&&utag.gdpr.typeOf(utag.gdpr.trackUIDs)!=="array")return true;var lc=utag.loader.cfg,cs=utag.gdpr.getConsentState(),uid=taguid||utag.gdpr.trackUIDs.shift();if(utag.gdpr.typeOf(uid)==="undefined")return true;utag.DB("Consent Manager: Applying consent: "+uid);var csTYpe=utag.gdpr.typeOf(cs);var tag=lc[uid];var blockedTagLookup=utag.gdpr.dns?utag.gdpr.dns.getBlockedDnsTagLookup():{};if(!utag.gdpr.omittedTags[uid]&&tag.send&&tag.tcat!==0){if((csTYpe==="array"&&cs[tag.tcat-1].ct=="1")||(csTYpe==="number"&&cs==1)||parseInt(blockedTagLookup[uid])===1){utag.DB("Consent Manager: Applying consent: "+uid+" allowed to send");return false;}}else if((utag.gdpr.omittedTags[uid]||tag.tcat==0)&&tag.send){utag.DB("Consent Manager: Omitted Tag: "+uid+" allowed to send");return false;}
utag.DB("Consent Manager: Applying consent: "+uid+" not allowed to send");return true;},applyConsentState:function(){utag.DB("Consent Manager: Applying consent");try{var i,lc=utag.loader.cfg,cs=utag.gdpr.getConsentState(),ot=utag.gdpr.omittedTags;if(typeof cs==="number"){if((utag.gdpr.consent_prompt.isEnabled&&parseInt(cs)!==1)||((!utag.gdpr.consent_prompt.isEnabled&&utag.gdpr.preferences_prompt.isEnabled)&&parseInt(cs)===-1)){utag.DB("Consent Manager: Setting all tags to off");for(i in utag.loader.GV(lc)){if(typeof ot[i]==="undefined"){lc[i].load=0;}}}}else if(utag.gdpr.consent_prompt.isEnabled||utag.gdpr.preferences_prompt.isEnabled){utag.DB("Consent Manager: Partial Consent");for(i in utag.loader.GV(lc)){if(typeof ot[i]==="undefined"){if(lc[i].tcat>0&&cs[lc[i].tcat-1].ct!="1"){lc[i].load=0;}}}}
var btl=utag.gdpr.dns?utag.gdpr.dns.getBlockedDnsTagLookup():null;utag.DB("Consent Manager: Do Not Sell Tags");if(btl){for(i in utag.loader.GV(lc)){if(parseInt(btl[i])===1){lc[i].load=0;}}}}
catch(e){utag.DB(e);}},updateConsentCookie:function(consent_categories){utag.DB("Consent Manager: Updating consent cookie");var list,listType=utag.gdpr.typeOf(consent_categories);if(listType==="string"){list=consent_categories.split(/\s*,\s*/);}else if(listType!=="array"){list=[];}else{list=consent_categories.slice();}
if(list.length===0){utag.gdpr.setConsentValue(false);utag.gdpr.setAllCategories(false);return;}
utag.gdpr.setPreferencesFromList(list);},keys:function(obj){if(Object.keys){return Object.keys(obj);}
var array=[];for(var prop in obj){if(!obj.hasOwnProperty(prop)){continue;}
array.push(prop);}
return array;},sortedObject:function(obj,func){var _obj={};if(obj!==undefined){var _k1=utag.gdpr.keys(obj).sort(func);for(var z=0;z<_k1.length;z++){_obj[_k1[z]]=obj[_k1[z]];}}
return _obj;},clone:function(a){var level=0;return cloner(a);function cloner(a){var b={};var c;level++;if(level===5)return a;for(c in utag.loader.GV(a)){if(utag.gdpr.typeOf(a[c])==="array"){b[c]=a[c].slice(0)}else if(utag.gdpr.typeOf(a[c])==="object"){b[c]=cloner(a[c]);}else{b[c]=a[c];}}
level--;return b;}},isEmpty:function(obj){var t=utag.gdpr.typeOf(obj);switch(t){case"string":case"array":return obj.length===0;case"object":for(var p in obj){if(!obj.hasOwnProperty(p)){continue;}
return false;}
default:return true;}},queue:[],domain:window.utag_cfg_ovrd&&window.utag_cfg_ovrd.domain||utag.cfg.domain,path:window.utag_cfg_ovrd&&window.utag_cfg_ovrd.cookie_path||"/",noqueue:window.utag_cfg_ovrd&&window.utag_cfg_ovrd.nogdprqueue||false,noview:window.utag_cfg_ovrd&&window.utag_cfg_ovrd.noview||false,consentPeriod:(window.utag_cfg_ovrd&&window.utag_cfg_ovrd.consentPeriod)||0,cookieNS:window.utag_cfg_ovrd&&window.utag_cfg_ovrd.cmcookiens||"CONSENTMGR",eventProfile:window.utag_cfg_ovrd&&window.utag_cfg_ovrd.cmeventprofile||"main"||"main",omittedTags:{"16987":1,"17147":1,"16977":1,"16475":1,"16974":1,"16931":1,"16774":1,"17154":1}};if(window.utag_cfg_ovrd&&window.utag_cfg_ovrd.domain==""){utag.gdpr.domain="";}
utag.loader.initdataOld=utag.loader.initdata;utag.loader.initdata=function(){utag.loader.initdataOld();if(utag.gdpr.getConsentState()!==0)return;if(utag.gdpr.noview)return;if(!utag.loader.rd_flag&&!utag.gdpr.noqueue){utag.gdpr.queue.push({event:"view",data:utag.handler.C(utag.data)});}};utag.gdpr.promptEnabledSetting=function(){if(!utag.gdpr.dr&&(utag.cfg.readywait||utag.cfg.waittimer)){utag.gdpr.dr=1;return;}
if(utag.gdpr.consent_prompt.isEnabled===true&&!(utag.cond[13473])){utag.gdpr.consent_prompt.isEnabled=false;}
if(utag.gdpr.doNotSell.isEnabled===true&&!(1)){utag.gdpr.doNotSell.isEnabled=false;}}
utag.preOld=utag.pre;utag.pre=function(){utag.preOld();utag.gdpr.promptEnabledSetting();utag.pre=utag.preOld;};utag.gdpr.consent_prompt.languages={"fr":{"custom_tokens":{"company_logo_url":"","desc_option_01":"Avec ce param&egrave;tre, vous nous permettez de d&eacute;terminer le nombre de visiteurs sur le site www.swisscom.ch et d&rsquo;analyser la mani&egrave;re dont ils utilisent notre site Internet. En outre, vous nous aidez &agrave; garantir que le site Internet est stable, fiable et rapide ainsi qu’&agrave; l&rsquo;optimiser en continu.","label_option_01":"Statistiques et analyse","modal_html":"<p>Nous mettons en place des cookies sur www.swisscom.ch pour assurer le bon fonctionnement de notre site Internet. Cliquez sur &laquo;Accepter&raquo; si vous consentez au traitement de vos donn&eacute;es &agrave; des fins statistiques et analytiques, de personnalisation de notre site Internet et de notre publicit&eacute; sur des sites de tiers ainsi que de reconnaissance des clientes et clients Swisscom.</p><p>Si vous n&rsquo;acceptez pas le traitement des donn&eacute;es, cliquez sur &laquo;Param&egrave;tres&raquo; pour enregistrer vos propres pr&eacute;f&eacute;rences en mati&egrave;re de cookies. Vous trouverez de plus amples informations dans notre <a href=\"/fr/clients-prives/precisions-juridiques/protection-des-donnees/protection-donnees-en-ligne.html\"> d&eacute;claration de protection des donn&eacute;es en ligne</a>.</p>","opt_in":"","privacy_policy_url":"","label_option_03":"Publicité Swisscom sur des sites tiers","modal_settings":"Paramètres","additional_info":"Vous trouverez de plus amples informations dans notre <a href=\"/fr/clients-prives/precisions-juridiques/protection-des-donnees/protection-données-en-ligne.html\"> d&eacute;claration de protection des donn&eacute;es en ligne</a>.","opt_out":"","desc_option_04":"Si vous l’acceptez, nous pouvons vous identifier en tant que cliente ou client Swisscom à partir de votre adresse IP, même si vous n’êtes pas connecté(e) à My Swisscom. Vous voyez ainsi des offres adaptées à votre comportement d’utilisation sur tous vos appareils.","modal_accept_all":"Accepter","label_option_04":"Identification des visiteurs","desc_option_02":"Avec ce paramètre, vous nous permettez d’enregistrer votre comportement d’utilisation sur notre site Internet et d’en extraire des informations sur vos centres d’intérêt. Nous pouvons ainsi vous montrer des offres taillées sur mesure pour vous et nous adresser à vous de manière plus personnelle sur le site Internet. Vos données clients sont traitées exclusivement dans le cadre des paramètres définis dans My Swisscom. ","privacy_policy_text":"","desc_option_03":"Avec ce paramètre, vous nous permettez de recourir aux services de prestataires tiers tels que Google ou Facebook afin de vous montrer notre publicité et nos offres sur leurs sites Internet. Cela vaut pour les offres commercialisées directement par Swisscom ou pour nos marques tierces telles que Wingo, M-Budget ou Coop Mobile. Pour ce faire, nous transmettons aux fournisseurs votre comportement d’utilisation sur le site www.sswisscom.ch. D’autres données clients peuvent également être transmises, – en fonction des paramètres définis pour le traitement de vos données dans My Swisscom. Nous mesurons par ailleurs les performances de nos publicités sur les sites Internet des prestataires tiers.","label_option_02":"Personnalisation de notre site Internet","modal_title":"Nous avons besoin de votre consentement","button_save":"Enregistrer"},"common_tokens":{"title":"Nous avons besoin de votre consentement","confirmation_button":"","message":""},"isDefault":"false"},"en":{"custom_tokens":{"button_save":"Save","modal_title":"We need your consent","additional_info":"For further information, please refer to our <a href=\"/en/residential/legal-information/online-privacy/online-privacy-statement.html\"> online privacy policy</a>.","opt_out":"","desc_option_04":"If you allow us to do so, we can identify you as a Swisscom customer using your IP address, even if you are not logged into My Swisscom. This means you see offers that are suitable for you and that correspond to your usage behaviour across all your devices.","privacy_policy_text":"","label_option_04":"Visitor identification","desc_option_02":"With this setting, you allow us to store your usage behaviour on our website and to derive information about your interests from it. We show you offers that are tailored to you and can address you personally on the website. Your customer data will only be used in accordance with your existing privacy settings in My Swisscom. ","modal_accept_all":"Accept","label_option_02":"Personalisation of our website","desc_option_03":"With this setting, you allow us to use services of third-party providers such as Google or Facebook to show you our advertisements and offers on their websites. This relates to offers that are provided by Swisscom directly or via our third-party brands such as Wingo, M-Budget or Coop Mobile. For this purpose, we transfer data about your usage behaviour on www.swisscom.ch to the providers. Depending on your existing privacy settings in My Swisscom, other customer data may also be transferred. We also measure how well our advertising works on the websites of the third-party providers.","label_option_01":"Statistics and analysis","modal_html":"<p>We use cookies on www.swisscom.ch so that you can use our website properly. Click on “Accept” if you agree to the processing of your data for statistical and analytical purposes, for the personalisation of our website and for the personalisation of our advertising on third-party websites as well as to recognise you as a Swisscom customer.</p><p>If you do not agree to this processing, click on “Settings” and save your own cookie preferences. For further information, please refer to our <a href=\"/en/residential/legal-information/online-privacy/online-privacy-statement.html\"> online privacy policy</a>.</p>","label_option_03":"Swisscom advertising with third parties","opt_in":"","privacy_policy_url":"","modal_settings":"Settings","company_logo_url":"","desc_option_01":"With this setting, you allow us to take your data into account when we check the number of visitors to www.swisscom.ch and analyse how visitors use our website. You also help us to ensure that the website runs stably, reliably and quickly and can be optimised constantly."},"common_tokens":{"message":"","confirmation_button":"","title":"We need your consent"},"isDefault":"false"},"it":{"common_tokens":{"title":"Abbiamo bisogno del suo consenso","message":"","confirmation_button":""},"custom_tokens":{"modal_settings":"Impostazioni","label_option_03":"Pubblicità Swisscom presso terzi","opt_in":"","privacy_policy_url":"","label_option_01":"Statistica e analisi","modal_html":"<p>Su www.swisscom.ch facciamo ricorso ai cookie per consentirle di utilizzare al meglio il nostro sito web. Faccia clic su «Accetta» per esprimere il consenso al trattamento dei suoi dati per finalità statistiche e di analisi, di personalizzazione del nostro sito web e della nostra pubblicità su siti web di terzi nonché per l’identificazione dei visitatori come clienti Swisscom.</p><p>Se non è d’accordo con questo trattamento, faccia clic su «Impostazioni» e configuri le sue preferenze personali sui cookie. Maggiori informazioni sono disponibili nella nostra <a href=\"/it/clienti-privati/informazioni-legali/protezione-dei-dati/protezione-dei-dati-online.html\"> dichiarazione di protezione dei dati online</a>.</p>","desc_option_01":"Con questa impostazione ci consente di rilevare il numero di visitatori su www.swisscom.ch e analizzare in che modo utilizzano il nostro sito web. In più ci aiuta a garantire la stabilità, l’affidabilità e la velocità del sito web, oltre a permetterci di ottimizzarlo continuamente.","company_logo_url":"","modal_title":"Abbiamo bisogno del suo consenso","button_save":"Salva","label_option_02":"Personalizzazione del nostro sito web","desc_option_03":"Con questa impostazione ci permette di utilizzare servizi di operatori terzi come ad esempio Google o Facebook per mostrarle le nostre offerte e pubblicità sui loro siti web. Si tratta di offerte distribuite direttamente da Swisscom o tramite i nostri marchi terzi come Wingo, M-Budget o Coop Mobile. A tal fine, trasmettiamo agli operatori i dati sul suo utilizzo di www.swisscom.ch. A seconda delle impostazioni sull’utilizzo dei dati che ha memorizzato in My Swisscom, possono essere trasferiti anche altri dati cliente. Inoltre, misuriamo quanto è efficace la nostra pubblicità sui siti web degli operatori terzi.","privacy_policy_text":"","label_option_04":"Identificazione dei visitatori","desc_option_02":"Con questa impostazione ci permette di archiviare i dati sul suo utilizzo del nostro sito web e trarne informazioni sui suoi interessi. Le mostriamo offerte su misura per lei e personalizziamo la sua esperienza sul sito web. I suoi dati cliente vengono utilizzati soltanto nei limiti delle impostazioni sull’utilizzo dei dati che ha memorizzato in My Swisscom. ","modal_accept_all":"Accetta","desc_option_04":"Se lo consente, in base al suo indirizzo IP, la possiamo identificare come cliente Swisscom anche se non ha effettuato il login a My Swisscom. In questo modo vede offerte su misura per lei e in linea con le sue attività  da qualsiasi apparecchio.","additional_info":"Maggiori informazioni sono disponibili nella nostra <a href=\"/it/clienti-privati/informazioni-legali/protezione-dei-dati/protezione-dei-dati-online.html\"> dichiarazione di protezione dei dati online</a>.","opt_out":""},"isDefault":"false"},"de":{"custom_tokens":{"modal_accept_all":"Akzeptieren","desc_option_01":"Mit dieser Einstellung erlauben Sie uns, die Besucherzahl auf www.swisscom.ch zu ermitteln und zu analysieren, wie Besucherinnen und Besucher unsere Webseite nutzen. Zudem helfen Sie uns damit sicherzustellen, dass die Webseite stabil, zuverlässig und schnell läuft sowie ständig optimiert werden kann.","desc_option_02":"Mit dieser Einstellung erlauben Sie uns, Ihr Nutzungsverhalten auf unserer Webseite zu speichern und daraus Informationen über Ihre Interessen abzuleiten. Wir zeigen Ihnen auf Sie zugeschnittene Angebote an und können Sie auf der Webseite persönlich ansprechen. Ihre Kundendaten werden dabei nur im Rahmen Ihrer bestehenden Einstellungen zur Datenverwendung in My Swisscom  genutzt. ","label_option_04":"Besuchererkennung","desc_option_03":"Mit dieser Einstellung erlauben Sie uns, Dienste von Drittanbietern wie zum Beispiel Google oder Facebook zu nutzen, um Ihnen unsere Werbung und Angebote auf deren Webseiten anzuzeigen. Dies betrifft Angebote, die von Swisscom direkt oder über unsere Drittmarken wie Wingo, M-Budget oder Coop Mobile vertrieben werden. Wir übermitteln den Anbietern hierzu Daten über Ihr Nutzungsverhalten auf www.swisscom.ch. Abhängig von Ihren bestehenden Einstellungen zur Datenverwendung in My Swisscom  können auch weitere Kundendaten übertragen werden. Wir messen ausserdem, wie gut unsere Werbung auf den Webseiten der Drittanbieter funktioniert.","label_option_02":"Personalisierung unserer Webseite","modal_deny":"","additional_info":"Weitere Informationen finden Sie in unserer <a href=\"/de/privatkunden/rechtliches/datenschutz/online-datenschutz.html\">Online-Datenschutzerklärung</a>","desc_option_04":"Sofern Sie dies erlauben, können wir Sie anhand Ihrer IP-Adresse als Kundin oder Kunde von Swisscom erkennen, auch wenn Sie nicht in My Swisscom eingeloggt sind. Sie sehen so für Sie passende Angebote, die Ihrem geräteübergreifenden Nutzungsverhalten entsprechen.","modal_settings":"Einstellungen","button_save":"Speichern","modal_title":"Wir benötigen Ihre Zustimmung","label_option_01":"Statistik und Analyse","modal_html":"<p>Wir setzen auf www.swisscom.ch Cookies ein, damit Sie unsere Webseite einwandfrei nutzen können. Klicken Sie auf «Akzeptieren», wenn Sie der Bearbeitung Ihrer Daten zu Statistik- und Analysezwecken, zur Personalisierung unserer Webseite und zur Personalisierung unserer Werbung auf Webseiten von Dritten sowie der Besuchererkennung von Swisscom Kundinnen und Kunden zustimmen.</p><p>Falls Sie dieser Bearbeitung nicht zustimmen, klicken Sie auf «Einstellungen» und speichern Sie Ihre eigenen Cookie-Präferenzen. Weitere Informationen finden Sie in unserer <a href=\"/de/privatkunden/rechtliches/datenschutz/online-datenschutz.html\">Online-Datenschutzerklärung</a>.</p>","label_option_03":"Swisscom Werbung bei Dritten"},"common_tokens":{"confirmation_button":"","message":"","title":"Wir benötigen Ihre Zustimmung"},"isDefault":"true"}};utag.gdpr.consent_prompt.content.css=".privacy_prompt.consent_preferences {    z-index: 9999999 !important;}.sdx-container .switch [type=checkbox]+label {    min-height: 24px;    height: auto;}.sdx-container .tealium-consent-popup .button:nth-child(3),.sdx-container .tealium-consent-popup .button+.button+.button {    padding-left: 0px !important;    padding-right: 0px !important;    border: none !important;    background: none !important;    border-radius: 0px !important;    color: #086adb !important;    min-width: auto !important;    border-bottom: none !important;    transition: none !important;    margin-right: 8px !important;}@media (min-width: 768px) {    .sdx-container .tealium-consent-popup .button:nth-child(3),    .sdx-container .tealium-consent-popup .button+.button+.button {        margin-right: auto  !important;    }}.sdx-container .tealium-consent-popup .modal__body {	overflow-y: hidden;}.sdx-container .tealium-consent-popup .modal__body > div {	max-height: calc(100vh - 80px - 80px - 64px - 21px - 21px - 24px);	min-height: 48px;	overflow-y: auto;}@media (max-width: 479px) {	.sdx-container .tealium-consent-popup .modal__body > div {		max-height: calc(100vh - 80px - 80px - 128px - 21px - 21px - 24px);	}}";utag.gdpr.consent_prompt.content.html="";utag.gdpr.consent_prompt.content.js="console.info('Explicit Consent Prompt loading');(function(){function waitForCondition(condition,handler){var checkRuns=0;var checker=function(){if(++checkRuns<2000){try{if(condition()){try{handler();}catch(err){if(window.console)console.error(err);throw err;}}else{setTimeout(checker,40);}}catch(error){setTimeout(checker,40);}}};checker();};if(!window.jQuery&&!window.jQueryLoading){window.jQueryLoading=true;console.info('Dynamically loading jQuery dependency');var script=document.createElement('script');script.src='//code.jquery.com/jquery-1.12.4.min.js';script.type='text/javascript';document.getElementsByTagName('head')[0].appendChild(script);delete window.jQueryLoading;};function logger(){if(/ps\\-debug/.test(window.location.hash)){console.info.apply(this,arguments);}};(function(){var sdxModal;console.info('Waiting for jQuery ...');waitForCondition(function(){return window.jQuery;},function(){logger('jQuery found - Polyfill SdxModal wrapper');!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,\"a\",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p=\"\",t(t.s=2)}([function(e,t){e.exports=window._g&&_g.$||window.$CQ||window.$||window.jQuery},function(e,t,n){\"use strict\";function o(e,t){function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}function i(e,t,n,o){function i(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,r){function s(e){try{l(o.next(e))}catch(e){r(e)}}function a(e){try{l(o.throw(e))}catch(e){r(e)}}function l(e){e.done?n(e.value):i(e.value).then(s,a)}l((o=o.apply(e,t||[])).next())})}function r(e,t){function n(e){return function(t){return o([e,t])}}function o(n){if(i)throw new TypeError(\"Generator is already executing.\");for(;l;)try{if(i=1,r&&(s=2&n[0]?r.return:n[0]?r.throw||((s=r.return)&&s.call(r),0):r.next)&&!(s=s.call(r,n[1])).done)return s;switch(r=0,s&&(n=[2&n[0],s.value]),n[0]){case 0:case 1:s=n;break;case 4:return l.label++,{value:n[1],done:!1};case 5:l.label++,r=n[1],n=[0];continue;case 7:n=l.ops.pop(),l.trys.pop();continue;default:if(s=l.trys,!(s=s.length>0&&s[s.length-1])&&(6===n[0]||2===n[0])){l=0;continue}if(3===n[0]&&(!s||n[1]>s[0]&&n[1]<s[3])){l.label=n[1];break}if(6===n[0]&&l.label<s[1]){l.label=s[1],s=n;break}if(s&&l.label<s[2]){l.label=s[2],l.ops.push(n);break}s[2]&&l.ops.pop(),l.trys.pop();continue}n=t.call(e,l)}catch(e){n=[6,e],r=0}finally{i=s=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,r,s,a,l={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:n(0),throw:n(1),return:n(2)},\"function\"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a}function s(e){var t=\"function\"==typeof Symbol&&Symbol.iterator,n=t&&e[t],o=0;if(n)return n.call(e);if(e&&\"number\"==typeof e.length)return{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}};throw new TypeError(t?\"Object is not iterable.\":\"Symbol.iterator is not defined.\")}t.c=o,n.d(t,\"a\",function(){return l}),t.b=i,t.d=r,t.e=s;var a=function(e,t){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(e,t)},l=function(){return l=Object.assign||function(e){for(var t,n=1,o=arguments.length;n<o;n++){t=arguments[n];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},l.apply(this,arguments)}},function(e,t,n){\"use strict\";Object.defineProperty(t,\"__esModule\",{value:!0});var o=n(3);SCS.sdxModal=o.a},function(e,t,n){\"use strict\";(function(e){var o=n(4),i=n(0),r=n.n(i),s=n(6),a=n(7),l=n(9),c=null,d={},u={close:{de:\"Schliessen\",en:\"Close\",fr:\"Fermer\",it:\"Chiudi\"}},h={margin:\"0px\",padding:\"0px\",width:\"auto\"},p={content:\"col-xs-12 col-lg-10 col-xl-8\",prompt:\"col-xs col-md-10 col-lg-8 col-xl-6\"},f=function(){function t(){switch(this.dialog=null,this.spinnerTimer=0,(r()(\"HTML\").attr(\"lang\")||\"de\").toLocaleLowerCase()){case\"en\":this.lang=\"en\";break;case\"fr\":this.lang=\"fr\";break;case\"it\":this.lang=\"it\";break;default:this.lang=\"de\"}this.$wrapper=this.$buttons=this.$header=this.$closer=this.$title=this.$body=this.$spinner=this.$content=this.$text=this.$html=this.$el=r()(\"<div>\")}return t.getInstance=function(){return null!==c?c:c=new t},t.prototype.show=function(e){if(this.on=e.on,this.config=e,this.init(),this.reset(e),e.notification)this.initContentAsNotificationModal(e);else{if(this.setTitle(e.title),e.html||e.text)this.setSimpleText(e.text),this.setHTML(e.html);else if(Object(a.b)(e.url)){var t=r()(\"<img/>\",{src:e.url,alt:\"\"});t.css({height:\"auto\",width:\"100%\"}),this.setHTML(t)}else e.iframe||Object(a.a)(e.url)?this.setIframeContent(e):e.url&&this.setContentFromInternalUrl(e);this.setDimensions(e)}this.addButtons(e),!1!==e.autoOpen&&this.open(),Object(l.a)(this.$body,!1)},t.prototype.open=function(){this.init(),Object(s.a)(),this.dialog.open(),document.body.classList.add(\"js-modal-open\"),this.on&&\"function\"==typeof this.on.open&&this.on.open.call(this)},t.prototype.close=function(){this.init(),Object(s.b)(),this.dialog.close(),document.body.classList.remove(\"js-modal-open\")},t.prototype.initContentAsNotificationModal=function(e){if(e.notification){this.notification=e.notification,this.$header.toggle(!1),this.$outsideHeaderCloser.toggle(!0),this.$body.empty();var t=e.text||\"\",n=\"\",o=\"\";switch(e.notification){case\"general\":n=\"icon-051-message\";break;case\"alert\":n=\"icon-026-exclamation-mark-circle\",o=\"modal--notification--alert\";break;case\"confirmation\":n=\"icon-012-check-mark-circle\",o=\"modal--notification--confirmation\"}var i='<div class=\"notification-message\">\\n\\t\\t\\t\\t<i class=\"icon '+n+'\" aria-hidden=\"true\"></i>\\n\\t\\t\\t\\t'+String(t)+\"\\n\\t\\t\\t</div>\";this.setHTML(i),this.$modalWrapper.addClass(\"modal--notification \"+o)}},t.prototype.initDialogSDX=function(){var e=this,t=r()('<DIV class=\"container sdx-modal-holder\">'),n=r()('<DIV class=\"sdx-container\">'),i=r()('<DIV class=\"modal\" role=\"dialog\" tabindex=\"-1\">'),a=r()('<DIV class=\"modal__content\" data-nosnippet=\"data-nosnippet\">'),l=r()('<DIV class=\"modal__header\">'),c=r()('<DIV class=\"modal__body\">'),d=r()('<I class=\"icon icon-022-close\" aria-hidden=\"true\">'),p=r()('<BUTTON class=\"modal__close modal-cancel\">'),f=r()('<BUTTON class=\"modal__close modal-cancel\">'),m=r()('<DIV class=\"button-group\">'),y=r()(\"<DIV>\"),v=r()('<H2 class=\"sc-gray text-h4\">'),b=r()(\"<DIV>\"),w=r()(\"<P>\");return i.appendTo(n),t.appendTo(i),a.appendTo(t),l.appendTo(a),f.appendTo(a),c.appendTo(a),v.appendTo(l),p.appendTo(l),d.appendTo([p[0],f[0]]),m.addClass(\"button-group--responsive\"),p.attr(\"aria-label\",u.close[this.lang]),y.css(h),y.css(\"float\",\"none\"),m.css(\"clear\",\"both\"),this.$modalWrapper=i,this.$wrapper=a,this.$buttons=m,this.$header=l,this.$closer=p,this.$outsideHeaderCloser=f,this.$title=v,this.$body=c,this.$content=y,this.$text=w,this.$html=b,this.$el=n,r()(i[0]).on(\"cancelled\",function(t){if(Object(s.b)(),document.body.classList.remove(\"js-modal-open\"),e.on&&\"function\"==typeof e.on.cancel)return e.on.cancel.call(e,t)}),r()(i[0]).on(\"closed\",function(t){if(Object(s.b)(),document.body.classList.remove(\"js-modal-open\"),e.on&&\"function\"==typeof e.on.close)return e.on.close.call(e,t)}),this.$spinner=r()(\"<DIV>\").css(\"margin\",\"auto\").addClass(\"loader-spinner\").addClass(\"loader-spinner--large\").addClass(\"loader-spinner--plain\"),new o.a(i[0])},t.prototype.init=function(){null===this.dialog&&(this.dialog=this.initDialogSDX(),r()(\"BODY\").append(this.$el),this.dialog._backdropParent=this.$el[0])},t.prototype.addButtons=function(e){if(e.buttons&&e.buttons.length){var t=e.buttons;this.notification&&this.$buttons.removeClass(\"button-group button-group--responsive\");for(var n=0,o=t;n<o.length;n++){var i=o[n],s=r()(\"<BUTTON>\").addClass(\"button\").addClass(\"button--responsive\").append(i.title).appendTo(this.$buttons);if(i.type){var a=i.type;s.addClass(\"modal-\"+a)}i.primary?s.addClass(\"button--primary\"):s.addClass(\"button--secondary\"),i.thin&&(s.removeClass(\"button--primary button--secondary\"),s.addClass(\"button--thin\")),i.click&&s.click(i.click.bind(this))}this.$buttons.appendTo(this.$body)}},t.prototype.reset=function(e){this.$content.empty().detach(),this.$html.empty().hide(0).detach(),this.$text.empty().hide(0).detach(),this.$title.empty(),this.$buttons.empty().detach(),this.$modalWrapper.removeClass(\"modal--notification modal--notification--confirmation modal--notification--alert\"),this.$closer.toggle(!e.hideCloser),this.$header.toggle(!e.hideHeader),this.$outsideHeaderCloser.toggle(!e.hideCloser),e.hideHeader||this.$outsideHeaderCloser.toggle(!1),this.$wrapper.attr(\"class\",\"modal__content\"),this.$wrapper.addClass(e.class||\"\"),this.$wrapper.attr(\"style\",null)},t.prototype.setContentFromInternalUrl=function(e){var t=this;if(e.url&&!Object(a.a)(e.url)){var n=e.url;if(Object(l.b)()&&(n=n.replace(/(?:\\.mobile)?\\.html([#?.]|$)/,\".mobile.html$1\")),n in d){var o=d[n];return void this.showContent(e,o)}this.xhr&&this.xhr.abort(),this.xhr=r.a.get(n,function(o){t.xhr=void 0,d[n]=o,t.showContent(e,o)}),this.spinnerTimer&&clearTimeout(this.spinnerTimer),this.spinnerTimer=setTimeout(function(){t.$content.append(t.$spinner)},1e3)}},t.prototype.setDimensions=function(e){if(e.minWidth){var t=e.minWidth;Number.isNaN(Number(t))||(t+=\"px\"),this.$wrapper.css(\"min-width\",t)}if(e.minHeight){var n=e.minHeight;Number.isNaN(Number(n))||(n+=\"px\"),this.$wrapper.css(\"min-height\",n)}e.height&&this.$wrapper.css(\"height\",String(e.height)),e.displayMode?this.$wrapper.addClass(p[e.displayMode]):e.fillWidth?this.$wrapper.css(\"width\",\"100%\"):e.width?this.$wrapper.css(\"width\",String(e.width)):this.$wrapper.addClass(p.content)},t.prototype.setIframeContent=function(e){if(e.url){var t={height:\"100%\",width:\"100%\"};this.$content.css(t);var n=r()(\"<IFRAME>\").css(\"margin\",\"0px\").css(\"border\",\"none\").attr(\"src\",e.url).attr(t);this.appendToBody(n)}},t.prototype.setHTML=function(e){e&&(this.$html.appendTo(this.$body),this.$html.append(e),this.$html.show(0))},t.prototype.setSimpleText=function(e){e&&(this.$text.appendTo(this.$body),this.$text.append(e),this.$text.show(0))},t.prototype.setTitle=function(e){e&&this.$title.text(e)},t.prototype.showContent=function(t,n){this.$content.empty(),clearTimeout(this.spinnerTimer);var o=new DOMParser,i=o.parseFromString(n,\"text/html\"),r=t.title;if(!r){var s=i.querySelector(\"h1\");r=s?s.textContent:i.title.substring(0,i.title.lastIndexOf(\"|\"))}this.setTitle(r);var a=Object(l.b)()?\".stageMobile:first-child > .parsys\":\".content > DIV.parsys\",c=t.contentSelector||a,d=i.querySelectorAll(c);if(d.length){var u=e(Array.prototype.slice.call(d));return void this.appendToBody(u,!0)}d=i.querySelectorAll(\".main-wrapper > .page\");var h=e(d[0]);h.removeClass(\"container-fluid\"),this.appendToBody(h)},t.prototype.appendToBody=function(t,n){void 0===n&&(n=!1);for(var o=0;o<t.length;o++)t[o]=document.adoptNode(t[o]);n&&(t=e('<div class=\"content fake\"></div>').css(h).css(\"float\",\"none\").append(t),t=e('<div class=\"middle fake\"></div>').css(h).append(t)),this.$content.append(t),this.$content.prependTo(this.$body),this.$content.show(0),Object(l.a)(t,!1)},t}();t.a=f}).call(t,n(0))},function(e,t,n){\"use strict\";function o(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function i(e,t){if(\"string\"!=typeof t)throw new Error(\"Expected string class name\");e.classList.add(t)}function r(e,t){if(\"string\"!=typeof t)throw new Error(\"Expected string class name\");e.classList.remove(t)}function s(e,t){if(\"string\"!=typeof t)throw new Error(\"Expected string class name\");return e.classList.contains(t)}function a(e,t){if(\"string\"!=typeof t)throw new Error(\"Expected string class name\");e.classList.toggle(t)}function l(e){return e.textContent||e.innerText}function c(e,t){return window.getComputedStyle(e).getPropertyValue(t)}function d(){var e=document.querySelector(\".sdx-container\");return e||(e=document.body),e}function u(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var h=n(1),p=n(5),f=function(){function e(e){this.element=\"string\"==typeof e?document.createElement(e):e}return e.prototype.addClass=function(e){return i(this.element,e),this},e.prototype.removeClass=function(e){return r(this.element,e),this},e.prototype.hasClass=function(e){return s(this.element,e)},e.prototype.toggleClass=function(e){return a(this.element,e),this},Object.defineProperty(e.prototype,\"classes\",{get:function(){return this.element.classList},enumerable:!1,configurable:!0}),e.prototype.setId=function(e){return this.element.setAttribute(\"id\",e),this},Object.defineProperty(e.prototype,\"innerText\",{get:function(){return l(this.element)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,\"innerHtml\",{get:function(){return this.element.innerHTML},enumerable:!1,configurable:!0}),e.prototype.setHtml=function(e){if(\"string\"!=typeof e)throw new Error(\"Expected HTML string\");return this.element.innerHTML=e,this},e.prototype.getAttribute=function(e){return this.element.getAttribute(e)},e.prototype.setAttribute=function(e,t){return this.element.setAttribute(e,t),this},e.prototype.addEventListener=function(e,t){this.element.addEventListener(e,t)},e.prototype.removeEventListener=function(e,t){this.element.removeEventListener(e,t)},e.prototype.appendChild=function(t){if(!(t instanceof e))throw new Error(\"Only other DomElements can be added as children\");return this.element.appendChild(t.element),this},e.prototype.prependChild=function(t){if(!(t instanceof e))throw new Error(\"Only other DomElements can be added as children\");return this.element.insertBefore(t.element,this.element.firstChild),this},e.prototype.insertBefore=function(t){if(!(t instanceof e))throw new Error(\"Only other DomElements can be added as children\");if(!this.element.parentNode)throw new Error(\"Element is not attached\");return this.element.parentNode.insertBefore(t.element,this.element),this},e.prototype.insertAfter=function(t){if(!(t instanceof e))throw new Error(\"Only other DomElements can be added as children\");if(!this.element.parentNode)throw new Error(\"Element is not attached\");return this.element.parentNode.insertBefore(t.element,this.element.nextSibling),this},e.prototype.removeChild=function(t){if(!(t instanceof e))throw new Error(\"Only a DomElements child can be removed\");this.element.removeChild(t.element)},e.prototype.find=function(t){var n=this.element.querySelector(t);if(n)return new e(n)},e.prototype.wrapWithElement=function(e){if(!this.element.parentNode)throw new Error(\"Element is not attached\");return this.element.parentNode.replaceChild(e.element,this.element),e.element.appendChild(this.element),this},e.prototype.dispatchEvent=function(e){var t,n=this.element;document.createEvent?(t=document.createEvent(\"HTMLEvents\"),t.initEvent(e,!0,!0)):document.createEventObject&&(t=document.createEventObject(),t.eventType=e),t.eventName=e,n.dispatchEvent?n.dispatchEvent(t):n.fireEvent&&(void 0)[\"on\"+e]?n.fireEvent(\"on\"+t.eventType,t):n[e]?n[e]():n[\"on\"+e]&&n[\"on\"+e]()},e.prototype.css=function(e){return c(this.element,e)},e.prototype.empty=function(){u(this.element)},e}(),m=f,y=function(e){function t(t){var n=e.call(this,t)||this;return n._okayHandler=n.close.bind(n),n._cancelHandler=n._handleClick.bind(n),n._keydownHandler=n._handleKeydown.bind(n),n._initialize(),n}return Object(h.c)(t,e),t.prototype._initialize=function(){this._backdrop=new m(\"div\").addClass(\"backdrop\"),this._backdropParent=d(),this._subscribeToTrigger()},t.prototype._subscribeToTrigger=function(){var e,t,n=this.element.id;if(n){this._triggerClickHandler=this.open.bind(this);var o=document.querySelectorAll(\".modal-trigger[href=\"+n+\"]\");try{for(var i=Object(h.e)(o),r=i.next();!r.done;r=i.next()){r.value.addEventListener(\"click\",this._triggerClickHandler)}}catch(t){e={error:t}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}}},t.prototype._unsubscribeFromTrigger=function(){var e,t,n=this.element.id;if(n){var o=document.querySelectorAll(\".modal-trigger[href=\"+n+\"]\");try{for(var i=Object(h.e)(o),r=i.next();!r.done;r=i.next()){r.value.removeEventListener(\"click\",this._windowClickHandler)}}catch(t){e={error:t}}finally{try{r&&!r.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}this._triggerClickHandler=void 0}},t.prototype._handleKeydown=function(e){var t=e;if(27===(t.which||t.keyCode))return void this.cancel()},t.prototype._handleClick=function(e){o(e),this.cancel()},t.prototype._close=function(){var e,t,n,o,i=this;Object(p.enableBodyScroll)(this.element),document.removeEventListener(\"keydown\",this._keydownHandler),this._backdrop.element.removeEventListener(\"click\",this._cancelHandler),this._backdrop.removeClass(\"backdrop--open\"),this.removeClass(\"modal--open\");try{for(var r=Object(h.e)(this.element.querySelectorAll(\".modal-cancel\")),s=r.next();!s.done;s=r.next()){s.value.removeEventListener(\"click\",this._cancelHandler)}}catch(t){e={error:t}}finally{try{s&&!s.done&&(t=r.return)&&t.call(r)}finally{if(e)throw e.error}}try{for(var a=Object(h.e)(this.element.querySelectorAll(\".modal-close\")),l=a.next();!l.done;l=a.next()){l.value.removeEventListener(\"click\",this._okayHandler)}}catch(e){n={error:e}}finally{try{l&&!l.done&&(o=a.return)&&o.call(a)}finally{if(n)throw n.error}}setTimeout(function(){i._backdropParent.removeChild(i._backdrop.element)},300)},t.prototype.open=function(){var e=this;Object(p.disableBodyScroll)(this.element,{allowTouchMove:function(e){for(var t=e;t&&t!==document.body;){if(t.classList.contains(\"modal__body\")&&t.scrollHeight>t.clientHeight)return!0;t=t.parentNode}return!1}}),this._backdropParent.appendChild(this._backdrop.element),this.element.style.display=\"flex\",setTimeout(function(){e.element.style.display=\"\"},800),setTimeout(function(){var t,n,o,i;e.addClass(\"modal--open\"),e._backdrop.addClass(\"backdrop--open\"),document.addEventListener(\"keydown\",e._keydownHandler),e._backdrop.element.addEventListener(\"click\",e._cancelHandler);try{for(var r=Object(h.e)(e.element.querySelectorAll(\".modal-cancel\")),s=r.next();!s.done;s=r.next()){s.value.addEventListener(\"click\",e._cancelHandler)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=r.return)&&n.call(r)}finally{if(t)throw t.error}}try{for(var a=Object(h.e)(e.element.querySelectorAll(\".modal-close\")),l=a.next();!l.done;l=a.next()){l.value.addEventListener(\"click\",e._okayHandler)}}catch(e){o={error:e}}finally{try{l&&!l.done&&(i=a.return)&&i.call(a)}finally{if(o)throw o.error}}e.element.addEventListener(\"click\",function(e){return e.stopPropagation()}),e.dispatchEvent(\"opened\")},50)},t.prototype.cancel=function(){this.dispatchEvent(\"cancelled\"),this._close()},t.prototype.close=function(){this._close(),this.dispatchEvent(\"closed\")},t.prototype.destroy=function(){this.cancel(),this._unsubscribeFromTrigger()},t}(m);t.a=y},function(e,t,n){var o,i,r;!function(n,s){i=[t],o=s,void 0!==(r=\"function\"==typeof o?o.apply(t,i):o)&&(e.exports=r)}(0,function(e){\"use strict\";function t(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}Object.defineProperty(e,\"__esModule\",{value:!0});var n=!1;if(\"undefined\"!=typeof window){var o={get passive(){n=!0}};window.addEventListener(\"testPassive\",null,o),window.removeEventListener(\"testPassive\",null,o)}var i=\"undefined\"!=typeof window&&window.navigator&&window.navigator.platform&&/iP(ad|hone|od)/.test(window.navigator.platform),r=[],s=!1,a=-1,l=void 0,c=void 0,d=function(e){return r.some(function(t){return!(!t.options.allowTouchMove||!t.options.allowTouchMove(e))})},u=function(e){var t=e||window.event;return!!d(t.target)||1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1)},h=function(){setTimeout(function(){void 0!==c&&(document.body.style.paddingRight=c,c=void 0),void 0!==l&&(document.body.style.overflow=l,l=void 0)})};e.disableBodyScroll=function(e,o){if(i){if(!e)return void console.error(\"disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.\");if(e&&!r.some(function(t){return t.targetElement===e})){var h={targetElement:e,options:o||{}};r=[].concat(t(r),[h]),e.ontouchstart=function(e){1===e.targetTouches.length&&(a=e.targetTouches[0].clientY)},e.ontouchmove=function(t){var n,o,i,r;1===t.targetTouches.length&&(o=e,r=(n=t).targetTouches[0].clientY-a,!d(n.target)&&(o&&0===o.scrollTop&&0<r?u(n):(i=o)&&i.scrollHeight-i.scrollTop<=i.clientHeight&&r<0?u(n):n.stopPropagation()))},s||(document.addEventListener(\"touchmove\",u,n?{passive:!1}:void 0),s=!0)}}else{f=o,setTimeout(function(){if(void 0===c){var e=!!f&&!0===f.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(c=document.body.style.paddingRight,document.body.style.paddingRight=t+\"px\")}void 0===l&&(l=document.body.style.overflow,document.body.style.overflow=\"hidden\")});var p={targetElement:e,options:o||{}};r=[].concat(t(r),[p])}var f},e.clearAllBodyScrollLocks=function(){i?(r.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),s&&(document.removeEventListener(\"touchmove\",u,n?{passive:!1}:void 0),s=!1),r=[],a=-1):(h(),r=[])},e.enableBodyScroll=function(e){if(i){if(!e)return void console.error(\"enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.\");e.ontouchstart=null,e.ontouchmove=null,r=r.filter(function(t){return t.targetElement!==e}),s&&0===r.length&&(document.removeEventListener(\"touchmove\",u,n?{passive:!1}:void 0),s=!1)}else(r=r.filter(function(t){return t.targetElement!==e})).length||h()}})},function(e,t,n){\"use strict\";function o(){scrollTo(c,l)}function i(){l=window.scrollY,c=window.scrollX,d||(document.addEventListener(\"scroll\",o),d=!0)}function r(){d&&(document.removeEventListener(\"scroll\",o),d=!1)}var s=(n(1),n(0),window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame),a=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelAnimationFrame;s&&a||(s=function(e){return window.setTimeout(function(){e(+new Date)},10)},a=window.clearTimeout),t.a=i,t.b=r;var l=0,c=0,d=!1},function(e,t,n){\"use strict\";function o(e,t){void 0===t&&(t=!0);var n=e.startsWith(\"#\")?e:\"#\"+e;t?window.history&&window.history.replaceState?window.history.replaceState(void 0,\"\",n):window.location.replace(\"#\"+n):window.history&&window.history.pushState?window.history.pushState(void 0,\"\",n):window.location.hash=n}function i(e){return!!e&&/\\.((jpg)|(jpeg)|(gif)|(png)|(bmp))((\\?|#).*)?$/i.test(e)}function r(e){if(!e)return!1;var t=e.match(l);if(!t)return!1;var n=(t[1]||\"\").toLowerCase();if(n&&n!==location.protocol)return!0;var o=t[2]||\"\";return o.length>0&&o.replace(new RegExp(\":(\"+c+\")?$\"),\"\")!==location.host}var s=(n(0),n(8)),a=n.n(s);a.a;t.b=i,t.a=r;var l=(function(e,t){window.scGlobals=window.scGlobals||{},e in window.scGlobals||(window.scGlobals[e]=t),window.scGlobals[e]}(\"hashStateCache\",{}),/^([^:\\/?#]+:)?(?:\\/\\/([^\\/?#]*))?([^?#]+)?(\\?[^#]*)?(#.*)?/),c=\"http\"===location.protocol?80:443,d=function(){function e(){var e=this;this.deeplinks=[],this.callbacks=[],this.update(),window.addEventListener(\"hashchange\",function(){return e.update()})}return e.prototype.get=function(e){for(var t,n=0,o=this.deeplinks;n<o.length;n++){var i=o[n];0===i.indexOf(e+\"=\")&&(t=decodeURIComponent(i.split(\"=\",2)[1]))}return t},e.prototype.set=function(e,t,n,i){void 0===n&&(n=\",\"),void 0===i&&(i=!0);for(var r,s=!1,a=0;a<this.deeplinks.length;a+=1){if(0===this.deeplinks[a].indexOf(e+\"=\")){void 0!==t?(r=this.deeplinks[a].split(\"=\",2),r[1]=encodeURIComponent(t),this.deeplinks[a]=r.join(\"=\")):this.deeplinks.splice(a,1),s=!0;break}this.deeplinks[a]||this.deeplinks.splice(a,1)}s||void 0===t||this.deeplinks.push(e+\"=\"+encodeURIComponent(t));var l=this.deeplinks.join(n||\",\");\"\"===l&&(l=\"!\"),o(l,i),this.notifySubscribers()},e.prototype.subscribe=function(e){this.callbacks.indexOf(e)<0&&this.callbacks.push(e)},e.prototype.notifySubscribers=function(){for(var e=0,t=this.callbacks;e<t.length;e++){(0,t[e])()}},e.prototype.update=function(){var e=window.location.hash?window.location.href.substr(window.location.href.indexOf(\"#\")+1):\"\";e.indexOf(\",\")>-1?this.deeplinks=e.split(\",\"):this.deeplinks=e.split(\"&\"),this.deeplinks.length&&\"!\"===this.deeplinks[0]&&this.deeplinks.shift()},e}();new d},function(e,t,n){!function(t){try{var o=n(0)}catch(e){}e.exports=t(o)}(function(e){var t=function(e,t){var n={},o={true:!0,false:!1,null:null};return e?(e.replace(/\\+/g,\" \").split(\"&\").forEach(function(e){var i,r=e.split(\"=\"),s=decodeURIComponent(r[0]),a=n,l=0,c=s.split(\"][\"),d=c.length-1;if(/\\[/.test(c[0])&&/\\]$/.test(c[d])?(c[d]=c[d].replace(/\\]$/,\"\"),c=c.shift().split(\"[\").concat(c),d=c.length-1):d=0,2===r.length)if(i=decodeURIComponent(r[1]),t&&(i=i&&!isNaN(i)&&+i+\"\"===i?+i:\"undefined\"===i?void 0:void 0!==o[i]?o[i]:i),d)for(;l<=d;l++)s=\"\"===c[l]?a.length:c[l],a=a[s]=l<d?a[s]||(c[l+1]&&isNaN(c[l+1])?{}:[]):i;else\"[object Array]\"===Object.prototype.toString.call(n[s])?n[s].push(i):!{}.hasOwnProperty.call(n,s)?n[s]=i:n[s]=[n[s],i];else s&&(n[s]=t?void 0:\"\")}),n):n};return e&&(e.prototype.deparam=e.deparam=t),t})},function(e,t,n){\"use strict\";function o(e){if(e&&e.length>0)return e.find(d).length>0;if(!document.body){var t=new Error(\"isMobilePage called too early, no body yet\");return setTimeout(function(){throw t},0),!1}return void 0===l&&(l=c(d).length>0),l}function i(e,t){return void 0===t&&(t=window),e.split(\".\").forEach(function(e){e in t||(t[e]={}),t=t[e]}),t}function r(e,t){if(t===r)return[];var n=c(e);\"enhanceWithin\"in c.fn&&n.enhanceWithin(),\"true\"===n.attr(\"data-ignore-descendants\")&&n.removeAttr(\"data-ignore-descendants\").removeData(\"ignore-descendants\");var o=[];return window.application&&window.application.sandbox&&(o=window.application.sandbox.addModules(n)),m(n,t||r),o}function s(e,t){if(e&&\"function\"==typeof e)return void f.push([e,t]);if(t!==s){var n=c(e),o=n.closest(\"body\");if(n[0]!==document.body&&n[0]!==document&&(!o.length||o[0]!==document.body))return!0;var i=!1===t;i&&(t=void 0);for(var r=[],l=0,d=f;l<d.length;l++){var u=d[l],h=u[0],p=u[1];try{(i||!p||p===n[0]||p.length&&n.is(p))&&h(n,c)}catch(e){r.push(e)}}return t!==a&&n.trigger(\"scs-element-add\",t||s),c.each(r,function(e,t){window.setTimeout(function(){throw t},1)}),n}}function a(e,t){if(t!==a){var n=c(e.target||y);p(n,t||a)}}t.b=o,n.d(t,\"a\",function(){return m});var l,c=(n(1),n(0)),d=(n.n(c),\"div.mobile, body.is-mobile\"),u=i(\"SCS\"),h=i(\"utils\",u),p=r;\"initNewModules\"in h?p=h.initNewModules:h.initNewModules=r;var f=[],m=s;\"ensure\"in u?m=u.ensure:u.ensure=s;var y=c(document);y.off(\".helpers\").on(\"ready.helpers\",function(){m(document.body),y.trigger(\"scs-element-add\"),y.on(\"scs-element-add.helpers\",a)})}]);sdxModal=SCS.sdxModal.getInstance();});if(utag.gdpr.openConsentDialog)return;var cancelFn=null;var voidFn=function(){};function tracking(action,label){logger('Wait for tracking layers');waitForCondition(function(){return window.SCS&&SCS.datalayer&&SCS.datalayer.track&&SCS.datalayer.data&&SCS.datalayer.data.page&&SCS.datalayer.data.page.path!==undefined;},function(){var data=SCS.datalayer.cloneMandatoryData();logger('TRACK: ',action,label,data);data.event={label:label,action:action,location:'overlay',category:'consent-manager'};var refSite=window.document.referrer;if(refSite){SCS.tl.setCookie('consentReferrer',refSite,1);}SCS.datalayer.track(data,2000);});}function grabCancelEvent(){if(sdxModal.dialog.cancel!==voidFn){logger('GRABBING CANCEL');cancelFn=sdxModal.dialog.cancel;sdxModal.dialog.cancel=voidFn;}}function givenConsent(){var undecided=utag.ut.isEmptyObject(utag.gdpr.getCookieValues());if(!undecided){var consent=utag.gdpr.getCookieValues();if(consent.c1==='1'){return true;}else{return false;}}}function releaseCancelEvent(){if(sdxModal.dialog.cancel===voidFn){logger('RELEASING CANCEL');sdxModal.dialog.cancel=cancelFn;}}function isCategoryUsed(i){switch(i){case 0:case 5:case 6:case 14:return true;default:return false;}}function initConsentCookieOptions(options,preset){var cats=utag.gdpr.getCategories();for(var i=0;i<cats.length;i+=1){var key='c'+(i+1);if(!isCategoryUsed(i))continue;if(!(key in options)){options[key]=preset?'1':'0';}}}function readConsentCookie(){var cookie=utag.gdpr.getCookieValues();initConsentCookieOptions(cookie,false);return cookie;}var options=readConsentCookie();logger('Initial cookie: ',options);function writeConsentCookie(options,consent){var cookie={};var cats=utag.gdpr.getCategories();for(var i=0;i<cats.length;i+=1){var key='c'+(i+1);if(!isCategoryUsed(i))continue;cookie[key]=options[key]&&options[key]!=='0'?'1':'0';}cookie.consent=consent;utag.gdpr.setCookie(cookie);logger('SET ',cookie);window.adobeDataLayer=window.adobeDataLayer||[];window.adobeDataLayer.push({event:'consentUpdate',});}function acceptConsent(){logger('acceptConsentAll',options);options['c1']=options['c6']=options['c7']=options['c15']='1';writeConsentCookie(options,true);tracking('button','accept-all');sdxModal.close();}function saveConsentSettings(){logger('saveConsentSettings',options);var option01=document.getElementById('consent-01');var option06=document.getElementById('consent-06');var option07=document.getElementById('consent-07');var option15=document.getElementById('consent-15');options['c1']=option01&&option01.checked?'1':'0';options['c6']=option06&&option06.checked?'1':'0';options['c7']=option07&&option07.checked?'1':'0';options['c15']=option15&&option15.checked?'1':'0';var label='accept';label+=',analytics:'+(option01&&option01.checked?'on':'off');label+=',targeting:'+(option01&&option06.checked?'on':'off');label+=',marketing:'+(option01&&option07.checked?'on':'off');label+=',identification:'+(option01&&option15.checked?'on':'off');writeConsentCookie(options,true);if(options['c1']==='1'){tracking('button',label);console.log('Analytics Checked');console.log(label);}sdxModal.close();}function trackExitLink(evt){tracking('link','dsgvo');evt.preventDefault();setTimeout(function(){document.location=evt.target.href;},500);return false;}function hookExitLinks(){jQuery('a',sdxModal.dialog.element).on('click',trackExitLink);}function openedConsentDialog(){logger('openedConsentDialog');grabCancelEvent();hookExitLinks();}function openedConsentSettings(){logger('openedConsentSettings');if(givenConsent){tracking('view','cookie_opt-in_settings');}grabCancelEvent();hookExitLinks();}function closedConsentDialog(){logger('closedConsentDialog');releaseCancelEvent();}function cancelConsentDialog(){logger('cancelConsentDialog');releaseCancelEvent();utag.view();}function openConsentSettings(){logger('openConsentSettings');if(givenConsent){tracking('button','settings');}sdxModal.show({hideCloser:true,title:'{{title}}',html:'<div class=\"switch\">'+'<input type=\"checkbox\" name=\"consent01\" id=\"consent-01\" data-role=\"none\" '+(options['c1']&&options['c1']==='1'?'checked':'')+' />'+'<label for=\"consent-01\">{{label_option_01}}</label>'+'</div><p>'+'{{desc_option_01}}'+'</p><div class=\"switch\">'+'<input type=\"checkbox\" name=\"consent06\" id=\"consent-06\" data-role=\"none\" '+(options['c6']&&options['c6']==='1'?'checked':'')+' />'+'<label for=\"consent-06\">{{label_option_02}}</label>'+'</div><p>'+'{{desc_option_02}}'+'</p><div class=\"switch\">'+'<input type=\"checkbox\" name=\"consent07\" id=\"consent-07\" data-role=\"none\" '+(options['c7']&&options['c7']==='1'?'checked':'')+' />'+'<label for=\"consent-07\">{{label_option_03}}</label>'+'</div><p>'+'{{desc_option_03}}'+'</p><div class=\"switch\">'+'<input type=\"checkbox\" name=\"consent15\" id=\"consent-15\" data-role=\"none\" '+(options['c15']&&options['c15']==='1'?'checked':'')+' />'+'<label for=\"consent-15\">{{label_option_04}}</label>'+'</div><p>'+'{{desc_option_04}}'+'</p><p>'+'{{additional_info}}'+'</p>',buttons:[{title:'{{button_save}}',click:saveConsentSettings,primary:true}],on:{open:openedConsentSettings,close:closedConsentDialog,cancel:cancelConsentDialog}});}function openConsentDialog(){logger('openConsentDialog');sdxModal.show({hideCloser:true,class:'tealium-consent-popup',title:'{{modal_title}}',html:'{{modal_html}}',buttons:[{title:'{{modal_accept_all}}',click:acceptConsent,primary:true},{title:'{{modal_settings}}',click:openConsentSettings}],on:{open:openedConsentDialog,close:closedConsentDialog,cancel:cancelConsentDialog}});}utag.gdpr.openConsentDialog=openConsentDialog;utag.gdpr.openConsentSettings=openConsentSettings;})();(function(){logger('Waiting for SdxModal');waitForCondition(function(){return window.SCS&&SCS.sdxModal;},function(){logger('SdxModal loaded');if(!utag.gdpr.getConsentState()){logger('gdpr.openConsentDialog()');utag.gdpr.openConsentDialog();}else{logger('gdpr.openConsentSettings()');utag.gdpr.openConsentSettings();}});})();})();console.info('Explicit Consent Prompt ready');";utag.gdpr.consent_prompt.defaultLang="de";utag.gdpr.showExplicitConsent=function(_lang){var cn=document.getElementById("__tealiumGDPRecStyle");if(cn){cn.parentNode.removeChild(cn);}var hn=document.getElementById("__tealiumGDPRecModal");if(hn){hn.parentNode.removeChild(hn);}var sn=document.getElementById("__tealiumGDPRecScript");if(sn){sn.parentNode.removeChild(sn);}var dtc=utag.gdpr.getDeTokenizedContent(utag.gdpr.consent_prompt,_lang);var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style"),mDiv=document.createElement("div"),scr=document.createElement("script"),body=document.body||document.getElementsByTagName("body")[0];style.type="text/css";style.id="__tealiumGDPRecStyle";if(style.styleSheet){style.styleSheet.cssText=dtc.css;}else{style.appendChild(document.createTextNode(dtc.css));}head.appendChild(style);mDiv.innerHTML=dtc.html;mDiv.id="__tealiumGDPRecModal";body.appendChild(mDiv);scr.language="javascript";scr.type="text/javascript";scr.text="try{"+dtc.js+"} catch(e){utag.DB(e)}";scr.id="__tealiumGDPRecScript";head.appendChild(scr);};utag.gdpr.preferences_prompt.languages={"de":{"isDefault":"true","categories":{"crm":{"name":"Besuchererkennung","notes":""},"email":{"notes":"","name":"inactive - Email"},"cookiematch":{"name":"inactive - Cookie Match","notes":""},"misc":{"notes":"","name":"inactive - Misc"},"cdp":{"notes":"","name":"inactive - CDP"},"social":{"notes":"NOTE: repurposed category","name":"Swisscom Werbung bei Dritten"},"mobile":{"notes":"","name":"inactive - Mobile"},"affiliates":{"name":"inactive - Affiliates","notes":""},"search":{"name":"inactive - Search","notes":""},"display_ads":{"name":"inactive - Display Ads","notes":""},"engagement":{"name":"inactive - Engagement","notes":""},"analytics":{"notes":"","name":"Statistik und Analyse"},"big_data":{"notes":"","name":"inactive - Big Data"},"personalization":{"notes":"","name":"Personalisierung"},"monitoring":{"name":"inactive - Marketing","notes":"Marketing pixels (uses Monitoring category)"}},"custom_tokens":{"functional_cookies_description_1":"Mit dieser Einstellung erlauben Sie uns, die Besucherzahl auf unserer Webseite zu ermitteln und zu analysieren, wie Besucherinnen und Besucher unsere Webseite nutzen. Zudem helfen Sie uns, die Stabilit&auml;t der Webseite sicherzustellen und zu optimieren.","privacy_policy_description":"Weitere Informationen finden Sie In der","show_less":"Weniger anzeigen","functional_cookies_title":"Statistik und Analyse","necessary_cookies_title":"Erforderliche Cookies","social_cookies_description_1":"Mit dieser Einstellung erlauben Sie uns, Dienste von Drittanbietern wie zum Beispiel Google, Facebook oder Snapchat zu nutzen, um Ihnen unsere Werbung und Angebote anzuzeigen. Dies betrifft Angebote von Swisscom bzw. Produkte und Angebote, welche unter unseren Drittmarken vermarktet werden (z. B. Wingo, M-Budget, Coop Mobile).","marketing_cookies_description_2":"Wir zeigen Ihnen entsprechend auf Sie zugeschnittene Angebote an und k&ouml;nnen Sie pers&ouml;nlich auf der Website ansprechen. Ihre Kundendaten werden hierf&uuml;r nur im Rahmen der bestehenden Einstellungen zur Datenverwendung im My Swisscom Kundencenter verwendet. ","social_cookies_description_2":"Wir &uuml;bermitteln hierzu Daten &uuml;ber Ihr Nutzungsverhalten auf unserer Webseite an diese Drittanbieter. Abh&auml;ngig von Ihren bestehenden Einstellungen zur Datenverwendung im My Swisscom Kundencenter k&ouml;nnen auch weitere Kundendaten &uuml;bertragen werden. Wir messen ausserdem, wie gut unsere Werbung auf den Webseiten der Drittanbieter funktioniert.","necessary_cookies_description":"Wir setzen Cookies ein, damit Sie unsere Webseite einwandfrei nutzen k&ouml;nnen. Erlauben Sie uns, Cookies auch f&uuml;r weitere Zwecke zu verwenden:","user_identification_title":"Besuchererkennung","marketing_cookies_description_1":"Mit dieser Einstellung erlauben Sie uns, Ihr Nutzungsverhalten auf unserer Webseite zu speichern und Informationen &uuml;ber Ihre Interessen abzuleiten.","privacy_policy_url":"https://www.swisscom.ch/de/privatkunden/rechtliches/datenschutz/online-datenschutz.html","show_more":"Mehr anzeigen","social_cookies_title":"Swisscom Werbung bei Dritten","necessary_cookies_description_2":"Mit Ihrer Zustimmung verwenden wir Cookies zudem f&uuml;r statistische Zwecke, um Ihnen auf Sie zugeschnittene Angebote anzuzeigen oder um Sie als Kundin oder Kunde von Swisscom erkennen zu k&ouml;nnen.","necessary_cookies_description_1":"Wir setzen Cookies ein, damit Sie unsere Webseite einwandfrei nutzen k&ouml;nnen. Diese erm&ouml;glichen zum Beispiel, dass Sie sich ins My Swisscom Kundencenter einloggen oder Ihre Bestellungen bearbeiten k&ouml;nnen. Zudem sind die Cookies notwendig, um Ihre Produkte im Warenkorb zu speichern oder um Ihnen unseren Support-Chat anbieten zu k&ouml;nnen.","marketing_cookies_title":"Personalisierung","privacy_policy_title":"Online-Datenschutzerkl&auml;rung","user_identification_description":"Mit dieser Einstellung erlauben Sie uns, Sie anhand Ihrer IP-Adresse als Kundin oder Kunde zu erkennen, auch wenn Sie nicht im My Swisscom Kundencenter eingeloggt sind. Wir zeigen Ihnen so entsprechend Ihrem ger&auml;te&uuml;bergreifenden Nutzungsverhalten auf Sie zugeschnittene Angebote an."},"common_tokens":{"no":"","message":"","category":"","status":"","description":"","title":"Cookie-Einstellungen","yes":"","confirmation_button":"Einstellungen speichern"}},"it":{"common_tokens":{"title":"","confirmation_button":"","message":""},"custom_tokens":{"privacy_policy_text":"","privacy_policy_url":"https://www.swisscom.ch/it/clienti-privati/informazioni-legali/protezione-dei-dati/protezione-dei-dati-online.html","company_logo_url":""},"categories":{"cookiematch":{"name":"","notes":""},"email":{"notes":"","name":""},"crm":{"name":"","notes":""},"misc":{"name":"","notes":""},"affiliates":{"name":"","notes":""},"social":{"notes":"","name":""},"mobile":{"notes":"","name":""},"cdp":{"notes":"","name":""},"monitoring":{"name":"","notes":""},"personalization":{"name":"","notes":""},"engagement":{"name":"","notes":""},"display_ads":{"name":"","notes":""},"analytics":{"name":"","notes":""},"big_data":{"notes":"","name":""},"search":{"name":"","notes":""}},"isDefault":"false"},"en":{"isDefault":"false","categories":{"mobile":{"name":"","notes":""},"social":{"notes":"","name":""},"cdp":{"notes":"","name":""},"affiliates":{"name":"","notes":""},"search":{"notes":"","name":""},"monitoring":{"notes":"","name":""},"personalization":{"notes":"","name":""},"analytics":{"notes":"","name":""},"big_data":{"notes":"","name":""},"display_ads":{"name":"","notes":""},"engagement":{"notes":"","name":""},"crm":{"notes":"","name":""},"email":{"notes":"","name":""},"cookiematch":{"name":"","notes":""},"misc":{"notes":"","name":""}},"custom_tokens":{"privacy_policy_url":"https://www.swisscom.ch/en/residential/legal-information/online-privacy/online-privacy-statement.html","company_logo_url":"","privacy_policy_text":""},"common_tokens":{"title":"","message":"","confirmation_button":""}},"fr":{"isDefault":"false","categories":{"misc":{"notes":"","name":""},"cookiematch":{"notes":"","name":""},"crm":{"name":"","notes":""},"email":{"name":"","notes":""},"personalization":{"notes":"","name":""},"monitoring":{"name":"","notes":""},"engagement":{"name":"","notes":""},"big_data":{"name":"","notes":""},"analytics":{"notes":"","name":""},"display_ads":{"name":"","notes":""},"search":{"notes":"","name":""},"affiliates":{"name":"","notes":""},"mobile":{"notes":"","name":""},"social":{"notes":"","name":""},"cdp":{"notes":"","name":""}},"custom_tokens":{"privacy_policy_url":"https://www.swisscom.ch/fr/clients-prives/precisions-juridiques/protection-des-donnees/protection-donnees-en-ligne.html","company_logo_url":"","privacy_policy_text":""},"common_tokens":{"confirmation_button":"","message":"","title":""}}};utag.gdpr.preferences_prompt.content.css="";utag.gdpr.preferences_prompt.content.html="";utag.gdpr.preferences_prompt.content.js="console.info('Consent Preferences Dialog ready');if(document.body.dataset.showConsentPopup!=='false'){if(!utag.gdpr.getConsentState()){utag.gdpr.showExplicitConsent();}}";utag.gdpr.preferences_prompt.defaultLang="de";utag.gdpr.showConsentPreferences=function(_lang){function cloneObject(source,target,depth){if(depth===undefined){depth=1;}else if(depth===-1){utag.DB("Max Clone depth exceeded, using reference");return source;}if(window.JSON){return JSON.parse(JSON.stringify(source));}target=target||{};for(var prop in source){if(!source.hasOwnProperty(prop)){continue;}switch(utag.gdpr.typeOf(source[prop])){case"array":target[prop]=source[prop].slice(0);break;case"object":target[prop]=cloneObject(source[prop],target[prop],--depth);break;default:target[prop]=source[prop];}}return target;}try{if(utag.gdpr.preferences_prompt.noShow){return;}var cn=document.getElementById("__tealiumGDPRcpStyle");if(cn){cn.parentNode.removeChild(cn);}var hn=document.getElementById("__tealiumGDPRcpPrefs");if(hn){hn.parentNode.removeChild(hn);}var sn=document.getElementById("__tealiumGDPRcpPrefsScript");if(sn){sn.parentNode.removeChild(sn);}var promptData=cloneObject(utag.gdpr.preferences_prompt);var activeCats=utag.gdpr.getCategories(true);var cats='';var id;for(var i=0;i<activeCats.length;i++){id=utag.gdpr.preferences_prompt.categories[activeCats[i]].id;cats+='<tr><td>{{category_'+activeCats[i]+'_title}}</td><td>{{category_'+activeCats[i]+'_description}}</td><td><input type="checkbox" class="toggle" id="toggle_cat'+id+'"/><label for="toggle_cat'+id+'"> <span class="on">{{yes}}</span> <span class="off">{{no}}</span></label></td></tr>';}promptData.content.html=promptData.content.html.replace('<!--CATEGORIES-->',cats);var dtc=utag.gdpr.getDeTokenizedContent(promptData,_lang);var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style"),mDiv=document.createElement("div"),scr=document.createElement("script"),body=document.body||document.getElementsByTagName("body")[0];style.type="text/css";style.id="__tealiumGDPRcpStyle";if(style.styleSheet){style.styleSheet.cssText=dtc.css;}else{style.appendChild(document.createTextNode(dtc.css));}head.appendChild(style);mDiv.innerHTML=dtc.html;mDiv.id="__tealiumGDPRcpPrefs";body.appendChild(mDiv);scr.language="javascript";scr.type="text/javascript";scr.text="try{"+dtc.js+"} catch(e){utag.DB(e)}";scr.id="__tealiumGDPRcpPrefsScript";head.appendChild(scr);}catch(e){utag.DB(e);}};utag.gdpr.dns=null;utag.track_old=utag.track;utag.track=function(a,b,c,d){if(typeof a=="string")a={event:a,data:b,cfg:{cb:c,uids:d}};if(a.event==="update_consent_cookie"&&b.consent_categories){utag.gdpr.updateConsentCookie(b.consent_categories);}else if(a.event==="set_dns_state"&&typeof b.do_not_sell!=='undefined'){utag.gdpr.dns.setDnsState(b.do_not_sell);}else{if(utag.gdpr.getConsentState()===0){if(!utag.gdpr.noqueue)utag.gdpr.queue.push({event:a.event,data:utag.handler.C(a.data),cfg:utag.handler.C(a.cfg)});}
if(a.cfg.uids){var uids=[];for(var i=0;i<a.cfg.uids.length;i++){if(!utag.gdpr.shouldTagFire(a.cfg.uids[i])){uids.push(a.cfg.uids[i]);}}
a.cfg.uids=uids;utag.gdpr.trackUIDs=utag.gdpr.trackUIDs.concat(uids);}
return utag.track_old.apply(this,arguments);}};utag.loader.OU_old=utag.loader.OU;utag.loader.OU=function(tid){try{if(utag.gdpr.typeOf(tid)!=="undefined"){return utag.gdpr.shouldTagFire();}
utag.gdpr.applyConsentState();}
catch(e){utag.DB(e);}};if(utag.gdpr.preferences_prompt.single_cookie){window.utag_cfg_ovrd=window.utag_cfg_ovrd||{};utag.loader.SC("utag_main",null,"da");window.utag_cfg_ovrd.nocookie=true;}
if(!utag.gdpr.consent_prompt.isEnabled&&!utag.gdpr.doNotSell.isEnabled&&utag.gdpr.getConsentState()==0){utag.gdpr.setAllCategories(utag.gdpr.preferences_prompt.defaultState,!0);}
if(typeof utag_cfg_ovrd!='undefined'){for(utag._i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[utag._i]=utag_cfg_ovrd[utag._i]};utag.loader.PINIT=function(a,b,c){utag.DB("Pre-INIT");if(utag.cfg.noload){return;}
try{this.GET();if(utag.handler.RE('view',utag.data,"blr")){utag.handler.LR(utag.data);}}catch(e){utag.DB(e)};a=this.cfg;c=0;for(b in this.GV(a)){if(a[b].block==1||(a[b].load>0&&(typeof a[b].src!='undefined'&&a[b].src!=''))){a[b].block=1;c=1;this.bq[b]=1;}}
if(c==1){for(b in this.GV(a)){if(a[b].block){a[b].id=b;if(a[b].load==4)a[b].load=1;a[b].cb=function(){var d=this.uid;utag.loader.cfg[d].cbf=1;utag.loader.LOAD(d)};this.AS(a[b]);}}}
if(c==0)this.INIT();};utag.loader.INIT=function(a,b,c,d,e){utag.DB('utag.loader.INIT');if(this.ol==1)return-1;else this.ol=1;if(utag.cfg.noview!=true)utag.handler.RE('view',utag.data,"alr");utag.rpt.ts['i']=new Date();d=this.cfgsort;for(a=0;a<d.length;a++){e=d[a];b=this.cfg[e];b.id=e;if(b.block!=1){if(utag.loader.bk[b.id]||((utag.cfg.readywait||utag.cfg.noview)&&b.load==4)){this.f[b.id]=0;utag.loader.LOAD(b.id)}else if(b.wait==1&&utag.loader.rf==0){utag.DB('utag.loader.INIT: waiting '+b.id);this.wq.push(b)
this.f[b.id]=2;}else if(b.load>0){utag.DB('utag.loader.INIT: loading '+b.id);this.lq.push(b);this.AS(b);}}}
if(this.wq.length>0)utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.DB('READY:utag.loader.wq');utag.loader.rf=1;utag.loader.WQ();}});else if(this.lq.length>0)utag.loader.rf=1;else if(this.lq.length==0)utag.loader.END();return 1};utag.loader.EV('','ready',function(a){if(utag.loader.efr!=1){utag.loader.efr=1;try{if(utag.cfg.readywait||utag.cfg.waittimer){utag.loader.EV("","ready",function(){setTimeout(function(){utag.gdpr.promptEnabledSetting();cmExplicitDomReady();cmDNSDomReady();},utag.cfg.waittimer||1);});}else{utag.gdpr.promptEnabledSetting();cmExplicitDomReady();cmDNSDomReady();}function cmExplicitDomReady(){try{if(utag.gdpr.consent_prompt.isEnabled){if(!utag.gdpr.consent_prompt.noShow){if(!utag.gdpr.getConsentState()){utag.gdpr.showExplicitConsent();}}}}catch(e){utag.DB(e);}}function cmDNSDomReady(){try{if(utag.gdpr.doNotSell.isEnabled){if(!utag.gdpr.doNotSell.noShow){if(!utag.gdpr.dns.getDnsState()){utag.gdpr.showDoNotSellBanner();}}}}catch(e){utag.DB(e);}}}catch(e){utag.DB(e);}try{window.SCS=window.SCS||{};SCS.tiq=SCS.tiq||{};SCS.tiq.linkTrackHandlers={processClick:function(e){for(let target=e.target;target&&target!==this;target=target.parentNode){if(target&&target?.matches?.('a,button')){SCS.tiq.linkTrackHandlers.click.call(target,e);break;}}},click:function(event){const outerElement=event.target.closest('[data-track-action]');if(!outerElement){return;}
let outerData=SCS.dl.get('dataset',{},outerElement),action=outerData.trackAction,label=outerData.trackLabel,location=outerData.trackLocation,category=outerData.trackCategory,eventDataSet=action&&label&&location&&category,conversionId=outerData.conversionId||outerData.event,conversionSubject=outerData.conversionSubject||outerData.subject,conversionCategory=outerData.conversionCategory||outerData.event,conversionDetail=outerData.conversionDetail||outerData.detail,conversionClass=outerData.conversionClass||outerData.class,conversionDataSet=conversionId||conversionCategory||conversionDetail;if(eventDataSet||conversionDataSet){let trackObj=SCS.datalayer.cloneMandatoryData();if(eventDataSet){trackObj.event={'action':action,'label':label,'location':location,'category':category};}
if(conversionCategory&&conversionDetail){trackObj.conversion={'category':conversionCategory,'detail':conversionDetail,'class':conversionClass};}else if(conversionId){trackObj.conversion={'id':conversionId,'subject':conversionSubject};}
trackObj.ignore=true;SCS.datalayer.track(trackObj,0,"click");}},initialize:function(){window.linkTrackHandlersAttached=true;document.addEventListener("click",SCS.tiq.linkTrackHandlers.processClick,false);let sdxHeader=document.querySelector('sdx-header');let sdxHeaderShadowDom=sdxHeader?sdxHeader.shadowRoot:undefined;if(sdxHeaderShadowDom){sdxHeaderShadowDom.addEventListener("click",SCS.tiq.linkTrackHandlers.processClick,false);}
document.addEventListener("opened",function(){if(window.modalHandlersAttached)return;window.modalHandlersAttached=true;document.querySelectorAll('.modal').forEach(function(item){item.addEventListener("click",SCS.tiq.linkTrackHandlers.processClick,false);});});}};if(!window.linkTrackHandlersAttached){SCS.tiq.linkTrackHandlers.initialize();}}catch(e){utag.DB(e)};}})
if(utag.cfg.readywait||utag.cfg.waittimer){utag.loader.EV('','ready',function(a){if(utag.loader.rf==0){utag.loader.rf=1;utag.cfg.readywait=1;utag.DB('READY:utag.cfg.readywait');setTimeout(function(){utag.loader.PINIT()},utag.cfg.waittimer||1);}})}else{utag.loader.PINIT()}}