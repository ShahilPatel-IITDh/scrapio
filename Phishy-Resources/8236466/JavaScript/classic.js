(function(f){if(typeof exports==="object"&&typeof module!=="undefined"&&false){module.exports=f()}else if(typeof define==="function"&&define.amd&&false){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ejs=f()}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){"use strict";var fs=require("fs");var path=require("path");var utils=require("./utils");var scopeOptionWarned=false;var _VERSION_STRING=require("../package.json").version;var _DEFAULT_OPEN_DELIMITER="<";var _DEFAULT_CLOSE_DELIMITER=">";var _DEFAULT_DELIMITER="%";var _DEFAULT_LOCALS_NAME="locals";var _NAME="ejs";var _REGEX_STRING="(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)";var _OPTS_PASSABLE_WITH_DATA=["delimiter","scope","context","debug","compileDebug","client","_with","rmWhitespace","strict","filename","async"];var _OPTS_PASSABLE_WITH_DATA_EXPRESS=_OPTS_PASSABLE_WITH_DATA.concat("cache");var _BOM=/^\uFEFF/;exports.cache=utils.cache;exports.fileLoader=fs.readFileSync;exports.localsName=_DEFAULT_LOCALS_NAME;exports.promiseImpl=new Function("return this;")().Promise;exports.resolveInclude=function(name,filename,isDir){var dirname=path.dirname;var extname=path.extname;var resolve=path.resolve;var includePath=resolve(isDir?filename:dirname(filename),name);var ext=extname(name);if(!ext){includePath+=".ejs"}return includePath};function resolvePaths(name,paths){var filePath;if(paths.some(function(v){filePath=exports.resolveInclude(name,v,true);return fs.existsSync(filePath)})){return filePath}}function getIncludePath(path,options){var includePath;var filePath;var views=options.views;var match=/^[A-Za-z]+:\\|^\//.exec(path);if(match&&match.length){path=path.replace(/^\/*/,"");if(Array.isArray(options.root)){includePath=resolvePaths(path,options.root)}else{includePath=exports.resolveInclude(path,options.root||"/",true)}}else{if(options.filename){filePath=exports.resolveInclude(path,options.filename);if(fs.existsSync(filePath)){includePath=filePath}}if(!includePath&&Array.isArray(views)){includePath=resolvePaths(path,views)}if(!includePath&&typeof options.includer!=="function"){throw new Error('Could not find the include file "'+options.escapeFunction(path)+'"')}}return includePath}function handleCache(options,template){var func;var filename=options.filename;var hasTemplate=arguments.length>1;if(options.cache){if(!filename){throw new Error("cache option requires a filename")}func=exports.cache.get(filename);if(func){return func}if(!hasTemplate){template=fileLoader(filename).toString().replace(_BOM,"")}}else if(!hasTemplate){if(!filename){throw new Error("Internal EJS error: no file name or template "+"provided")}template=fileLoader(filename).toString().replace(_BOM,"")}func=exports.compile(template,options);if(options.cache){exports.cache.set(filename,func)}return func}function tryHandleCache(options,data,cb){var result;if(!cb){if(typeof exports.promiseImpl=="function"){return new exports.promiseImpl(function(resolve,reject){try{result=handleCache(options)(data);resolve(result)}catch(err){reject(err)}})}else{throw new Error("Please provide a callback function")}}else{try{result=handleCache(options)(data)}catch(err){return cb(err)}cb(null,result)}}function fileLoader(filePath){return exports.fileLoader(filePath)}function includeFile(path,options){var opts=utils.shallowCopy({},options);opts.filename=getIncludePath(path,opts);if(typeof options.includer==="function"){var includerResult=options.includer(path,opts.filename);if(includerResult){if(includerResult.filename){opts.filename=includerResult.filename}if(includerResult.template){return handleCache(opts,includerResult.template)}}}return handleCache(opts)}function rethrow(err,str,flnm,lineno,esc){var lines=str.split("\n");var start=Math.max(lineno-3,0);var end=Math.min(lines.length,lineno+3);var filename=esc(flnm);var context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?" >> ":"    ")+curr+"| "+line}).join("\n");err.path=filename;err.message=(filename||"ejs")+":"+lineno+"\n"+context+"\n\n"+err.message;throw err}function stripSemi(str){return str.replace(/;(\s*$)/,"$1")}exports.compile=function compile(template,opts){var templ;if(opts&&opts.scope){if(!scopeOptionWarned){console.warn("`scope` option is deprecated and will be removed in EJS 3");scopeOptionWarned=true}if(!opts.context){opts.context=opts.scope}delete opts.scope}templ=new Template(template,opts);return templ.compile()};exports.render=function(template,d,o){var data=d||{};var opts=o||{};if(arguments.length==2){utils.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA)}return handleCache(opts,template)(data)};exports.renderFile=function(){var args=Array.prototype.slice.call(arguments);var filename=args.shift();var cb;var opts={filename:filename};var data;var viewOpts;if(typeof arguments[arguments.length-1]=="function"){cb=args.pop()}if(args.length){data=args.shift();if(args.length){utils.shallowCopy(opts,args.pop())}else{if(data.settings){if(data.settings.views){opts.views=data.settings.views}if(data.settings["view cache"]){opts.cache=true}viewOpts=data.settings["view options"];if(viewOpts){utils.shallowCopy(opts,viewOpts)}}utils.shallowCopyFromList(opts,data,_OPTS_PASSABLE_WITH_DATA_EXPRESS)}opts.filename=filename}else{data={}}return tryHandleCache(opts,data,cb)};exports.Template=Template;exports.clearCache=function(){exports.cache.reset()};function Template(text,opts){opts=opts||{};var options={};this.templateText=text;this.mode=null;this.truncate=false;this.currentLine=1;this.source="";options.client=opts.client||false;options.escapeFunction=opts.escape||opts.escapeFunction||utils.escapeXML;options.compileDebug=opts.compileDebug!==false;options.debug=!!opts.debug;options.filename=opts.filename;options.openDelimiter=opts.openDelimiter||exports.openDelimiter||_DEFAULT_OPEN_DELIMITER;options.closeDelimiter=opts.closeDelimiter||exports.closeDelimiter||_DEFAULT_CLOSE_DELIMITER;options.delimiter=opts.delimiter||exports.delimiter||_DEFAULT_DELIMITER;options.strict=opts.strict||false;options.context=opts.context;options.cache=opts.cache||false;options.rmWhitespace=opts.rmWhitespace;options.root=opts.root;options.includer=opts.includer;options.outputFunctionName=opts.outputFunctionName;options.localsName=opts.localsName||exports.localsName||_DEFAULT_LOCALS_NAME;options.views=opts.views;options.async=opts.async;options.destructuredLocals=opts.destructuredLocals;options.legacyInclude=typeof opts.legacyInclude!="undefined"?!!opts.legacyInclude:true;if(options.strict){options._with=false}else{options._with=typeof opts._with!="undefined"?opts._with:true}this.opts=options;this.regex=this.createRegex()}Template.modes={EVAL:"eval",ESCAPED:"escaped",RAW:"raw",COMMENT:"comment",LITERAL:"literal"};Template.prototype={createRegex:function(){var str=_REGEX_STRING;var delim=utils.escapeRegExpChars(this.opts.delimiter);var open=utils.escapeRegExpChars(this.opts.openDelimiter);var close=utils.escapeRegExpChars(this.opts.closeDelimiter);str=str.replace(/%/g,delim).replace(/</g,open).replace(/>/g,close);return new RegExp(str)},compile:function(){var src;var fn;var opts=this.opts;var prepended="";var appended="";var escapeFn=opts.escapeFunction;var ctor;var sanitizedFilename=opts.filename?JSON.stringify(opts.filename):"undefined";if(!this.source){this.generateSource();prepended+='  var __output = "";\n'+"  function __append(s) { if (s !== undefined && s !== null) __output += s }\n";if(opts.outputFunctionName){prepended+="  var "+opts.outputFunctionName+" = __append;"+"\n"}if(opts.destructuredLocals&&opts.destructuredLocals.length){var destructuring="  var __locals = ("+opts.localsName+" || {}),\n";for(var i=0;i<opts.destructuredLocals.length;i++){var name=opts.destructuredLocals[i];if(i>0){destructuring+=",\n  "}destructuring+=name+" = __locals."+name}prepended+=destructuring+";\n"}if(opts._with!==false){prepended+="  with ("+opts.localsName+" || {}) {"+"\n";appended+="  }"+"\n"}appended+="  return __output;"+"\n";this.source=prepended+this.source+appended}if(opts.compileDebug){src="var __line = 1"+"\n"+"  , __lines = "+JSON.stringify(this.templateText)+"\n"+"  , __filename = "+sanitizedFilename+";"+"\n"+"try {"+"\n"+this.source+"} catch (e) {"+"\n"+"  rethrow(e, __lines, __filename, __line, escapeFn);"+"\n"+"}"+"\n"}else{src=this.source}if(opts.client){src="escapeFn = escapeFn || "+escapeFn.toString()+";"+"\n"+src;if(opts.compileDebug){src="rethrow = rethrow || "+rethrow.toString()+";"+"\n"+src}}if(opts.strict){src='"use strict";\n'+src}if(opts.debug){console.log(src)}if(opts.compileDebug&&opts.filename){src=src+"\n"+"//# sourceURL="+sanitizedFilename+"\n"}try{if(opts.async){try{ctor=new Function("return (async function(){}).constructor;")()}catch(e){if(e instanceof SyntaxError){throw new Error("This environment does not support async/await")}else{throw e}}}else{ctor=Function}fn=new ctor(opts.localsName+", escapeFn, include, rethrow",src)}catch(e){if(e instanceof SyntaxError){if(opts.filename){e.message+=" in "+opts.filename}e.message+=" while compiling ejs\n\n";e.message+="If the above error is not helpful, you may want to try EJS-Lint:\n";e.message+="https://github.com/RyanZim/EJS-Lint";if(!opts.async){e.message+="\n";e.message+="Or, if you meant to create an async function, pass `async: true` as an option."}}throw e}var returnedFn=opts.client?fn:function anonymous(data){var include=function(path,includeData){var d=utils.shallowCopy({},data);if(includeData){d=utils.shallowCopy(d,includeData)}return includeFile(path,opts)(d)};return fn.apply(opts.context,[data||{},escapeFn,include,rethrow])};if(opts.filename&&typeof Object.defineProperty==="function"){var filename=opts.filename;var basename=path.basename(filename,path.extname(filename));try{Object.defineProperty(returnedFn,"name",{value:basename,writable:false,enumerable:false,configurable:true})}catch(e){}}return returnedFn},generateSource:function(){var opts=this.opts;if(opts.rmWhitespace){this.templateText=this.templateText.replace(/[\r\n]+/g,"\n").replace(/^\s+|\s+$/gm,"")}this.templateText=this.templateText.replace(/[ \t]*<%_/gm,"<%_").replace(/_%>[ \t]*/gm,"_%>");var self=this;var matches=this.parseTemplateText();var d=this.opts.delimiter;var o=this.opts.openDelimiter;var c=this.opts.closeDelimiter;if(matches&&matches.length){matches.forEach(function(line,index){var closing;if(line.indexOf(o+d)===0&&line.indexOf(o+d+d)!==0){closing=matches[index+2];if(!(closing==d+c||closing=="-"+d+c||closing=="_"+d+c)){throw new Error('Could not find matching close tag for "'+line+'".')}}self.scanLine(line)})}},parseTemplateText:function(){var str=this.templateText;var pat=this.regex;var result=pat.exec(str);var arr=[];var firstPos;while(result){firstPos=result.index;if(firstPos!==0){arr.push(str.substring(0,firstPos));str=str.slice(firstPos)}arr.push(result[0]);str=str.slice(result[0].length);result=pat.exec(str)}if(str){arr.push(str)}return arr},_addOutput:function(line){if(this.truncate){line=line.replace(/^(?:\r\n|\r|\n)/,"");this.truncate=false}if(!line){return line}line=line.replace(/\\/g,"\\\\");line=line.replace(/\n/g,"\\n");line=line.replace(/\r/g,"\\r");line=line.replace(/"/g,'\\"');this.source+='    ; __append("'+line+'")'+"\n"},scanLine:function(line){var self=this;var d=this.opts.delimiter;var o=this.opts.openDelimiter;var c=this.opts.closeDelimiter;var newLineCount=0;newLineCount=line.split("\n").length-1;switch(line){case o+d:case o+d+"_":this.mode=Template.modes.EVAL;break;case o+d+"=":this.mode=Template.modes.ESCAPED;break;case o+d+"-":this.mode=Template.modes.RAW;break;case o+d+"#":this.mode=Template.modes.COMMENT;break;case o+d+d:this.mode=Template.modes.LITERAL;this.source+='    ; __append("'+line.replace(o+d+d,o+d)+'")'+"\n";break;case d+d+c:this.mode=Template.modes.LITERAL;this.source+='    ; __append("'+line.replace(d+d+c,d+c)+'")'+"\n";break;case d+c:case"-"+d+c:case"_"+d+c:if(this.mode==Template.modes.LITERAL){this._addOutput(line)}this.mode=null;this.truncate=line.indexOf("-")===0||line.indexOf("_")===0;break;default:if(this.mode){switch(this.mode){case Template.modes.EVAL:case Template.modes.ESCAPED:case Template.modes.RAW:if(line.lastIndexOf("//")>line.lastIndexOf("\n")){line+="\n"}}switch(this.mode){case Template.modes.EVAL:this.source+="    ; "+line+"\n";break;case Template.modes.ESCAPED:this.source+="    ; __append(escapeFn("+stripSemi(line)+"))"+"\n";break;case Template.modes.RAW:this.source+="    ; __append("+stripSemi(line)+")"+"\n";break;case Template.modes.COMMENT:break;case Template.modes.LITERAL:this._addOutput(line);break}}else{this._addOutput(line)}}if(self.opts.compileDebug&&newLineCount){this.currentLine+=newLineCount;this.source+="    ; __line = "+this.currentLine+"\n"}}};exports.escapeXML=utils.escapeXML;exports.__express=exports.renderFile;exports.VERSION=_VERSION_STRING;exports.name=_NAME;if(typeof window!="undefined"){window.ejs=exports}},{"../package.json":6,"./utils":2,fs:3,path:4}],2:[function(require,module,exports){"use strict";var regExpChars=/[|\\{}()[\]^$+*?.]/g;exports.escapeRegExpChars=function(string){if(!string){return""}return String(string).replace(regExpChars,"\\$&")};var _ENCODE_HTML_RULES={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&#34;","'":"&#39;"};var _MATCH_HTML=/[&<>'"]/g;function encode_char(c){return _ENCODE_HTML_RULES[c]||c}var escapeFuncStr="var _ENCODE_HTML_RULES = {\n"+'      "&": "&amp;"\n'+'    , "<": "&lt;"\n'+'    , ">": "&gt;"\n'+'    , \'"\': "&#34;"\n'+'    , "\'": "&#39;"\n'+"    }\n"+"  , _MATCH_HTML = /[&<>'\"]/g;\n"+"function encode_char(c) {\n"+"  return _ENCODE_HTML_RULES[c] || c;\n"+"};\n";exports.escapeXML=function(markup){return markup==undefined?"":String(markup).replace(_MATCH_HTML,encode_char)};exports.escapeXML.toString=function(){return Function.prototype.toString.call(this)+";\n"+escapeFuncStr};exports.shallowCopy=function(to,from){from=from||{};for(var p in from){to[p]=from[p]}return to};exports.shallowCopyFromList=function(to,from,list){for(var i=0;i<list.length;i++){var p=list[i];if(typeof from[p]!="undefined"){to[p]=from[p]}}return to};exports.cache={_data:{},set:function(key,val){this._data[key]=val},get:function(key){return this._data[key]},remove:function(key){delete this._data[key]},reset:function(){this._data={}}};exports.hyphenToCamel=function(str){return str.replace(/-[a-z]/g,function(match){return match[1].toUpperCase()})}},{}],3:[function(require,module,exports){},{}],4:[function(require,module,exports){(function(process){function normalizeArray(parts,allowAboveRoot){var up=0;for(var i=parts.length-1;i>=0;i--){var last=parts[i];if(last==="."){parts.splice(i,1)}else if(last===".."){parts.splice(i,1);up++}else if(up){parts.splice(i,1);up--}}if(allowAboveRoot){for(;up--;up){parts.unshift("..")}}return parts}exports.resolve=function(){var resolvedPath="",resolvedAbsolute=false;for(var i=arguments.length-1;i>=-1&&!resolvedAbsolute;i--){var path=i>=0?arguments[i]:process.cwd();if(typeof path!=="string"){throw new TypeError("Arguments to path.resolve must be strings")}else if(!path){continue}resolvedPath=path+"/"+resolvedPath;resolvedAbsolute=path.charAt(0)==="/"}resolvedPath=normalizeArray(filter(resolvedPath.split("/"),function(p){return!!p}),!resolvedAbsolute).join("/");return(resolvedAbsolute?"/":"")+resolvedPath||"."};exports.normalize=function(path){var isAbsolute=exports.isAbsolute(path),trailingSlash=substr(path,-1)==="/";path=normalizeArray(filter(path.split("/"),function(p){return!!p}),!isAbsolute).join("/");if(!path&&!isAbsolute){path="."}if(path&&trailingSlash){path+="/"}return(isAbsolute?"/":"")+path};exports.isAbsolute=function(path){return path.charAt(0)==="/"};exports.join=function(){var paths=Array.prototype.slice.call(arguments,0);return exports.normalize(filter(paths,function(p,index){if(typeof p!=="string"){throw new TypeError("Arguments to path.join must be strings")}return p}).join("/"))};exports.relative=function(from,to){from=exports.resolve(from).substr(1);to=exports.resolve(to).substr(1);function trim(arr){var start=0;for(;start<arr.length;start++){if(arr[start]!=="")break}var end=arr.length-1;for(;end>=0;end--){if(arr[end]!=="")break}if(start>end)return[];return arr.slice(start,end-start+1)}var fromParts=trim(from.split("/"));var toParts=trim(to.split("/"));var length=Math.min(fromParts.length,toParts.length);var samePartsLength=length;for(var i=0;i<length;i++){if(fromParts[i]!==toParts[i]){samePartsLength=i;break}}var outputParts=[];for(var i=samePartsLength;i<fromParts.length;i++){outputParts.push("..")}outputParts=outputParts.concat(toParts.slice(samePartsLength));return outputParts.join("/")};exports.sep="/";exports.delimiter=":";exports.dirname=function(path){if(typeof path!=="string")path=path+"";if(path.length===0)return".";var code=path.charCodeAt(0);var hasRoot=code===47;var end=-1;var matchedSlash=true;for(var i=path.length-1;i>=1;--i){code=path.charCodeAt(i);if(code===47){if(!matchedSlash){end=i;break}}else{matchedSlash=false}}if(end===-1)return hasRoot?"/":".";if(hasRoot&&end===1){return"/"}return path.slice(0,end)};function basename(path){if(typeof path!=="string")path=path+"";var start=0;var end=-1;var matchedSlash=true;var i;for(i=path.length-1;i>=0;--i){if(path.charCodeAt(i)===47){if(!matchedSlash){start=i+1;break}}else if(end===-1){matchedSlash=false;end=i+1}}if(end===-1)return"";return path.slice(start,end)}exports.basename=function(path,ext){var f=basename(path);if(ext&&f.substr(-1*ext.length)===ext){f=f.substr(0,f.length-ext.length)}return f};exports.extname=function(path){if(typeof path!=="string")path=path+"";var startDot=-1;var startPart=0;var end=-1;var matchedSlash=true;var preDotState=0;for(var i=path.length-1;i>=0;--i){var code=path.charCodeAt(i);if(code===47){if(!matchedSlash){startPart=i+1;break}continue}if(end===-1){matchedSlash=false;end=i+1}if(code===46){if(startDot===-1)startDot=i;else if(preDotState!==1)preDotState=1}else if(startDot!==-1){preDotState=-1}}if(startDot===-1||end===-1||preDotState===0||preDotState===1&&startDot===end-1&&startDot===startPart+1){return""}return path.slice(startDot,end)};function filter(xs,f){if(xs.filter)return xs.filter(f);var res=[];for(var i=0;i<xs.length;i++){if(f(xs[i],i,xs))res.push(xs[i])}return res}var substr="ab".substr(-1)==="b"?function(str,start,len){return str.substr(start,len)}:function(str,start,len){if(start<0)start=str.length+start;return str.substr(start,len)}}).call(this,require("_process"))},{_process:5}],5:[function(require,module,exports){var process=module.exports={};var cachedSetTimeout;var cachedClearTimeout;function defaultSetTimout(){throw new Error("setTimeout has not been defined")}function defaultClearTimeout(){throw new Error("clearTimeout has not been defined")}(function(){try{if(typeof setTimeout==="function"){cachedSetTimeout=setTimeout}else{cachedSetTimeout=defaultSetTimout}}catch(e){cachedSetTimeout=defaultSetTimout}try{if(typeof clearTimeout==="function"){cachedClearTimeout=clearTimeout}else{cachedClearTimeout=defaultClearTimeout}}catch(e){cachedClearTimeout=defaultClearTimeout}})();function runTimeout(fun){if(cachedSetTimeout===setTimeout){return setTimeout(fun,0)}if((cachedSetTimeout===defaultSetTimout||!cachedSetTimeout)&&setTimeout){cachedSetTimeout=setTimeout;return setTimeout(fun,0)}try{return cachedSetTimeout(fun,0)}catch(e){try{return cachedSetTimeout.call(null,fun,0)}catch(e){return cachedSetTimeout.call(this,fun,0)}}}function runClearTimeout(marker){if(cachedClearTimeout===clearTimeout){return clearTimeout(marker)}if((cachedClearTimeout===defaultClearTimeout||!cachedClearTimeout)&&clearTimeout){cachedClearTimeout=clearTimeout;return clearTimeout(marker)}try{return cachedClearTimeout(marker)}catch(e){try{return cachedClearTimeout.call(null,marker)}catch(e){return cachedClearTimeout.call(this,marker)}}}var queue=[];var draining=false;var currentQueue;var queueIndex=-1;function cleanUpNextTick(){if(!draining||!currentQueue){return}draining=false;if(currentQueue.length){queue=currentQueue.concat(queue)}else{queueIndex=-1}if(queue.length){drainQueue()}}function drainQueue(){if(draining){return}var timeout=runTimeout(cleanUpNextTick);draining=true;var len=queue.length;while(len){currentQueue=queue;queue=[];while(++queueIndex<len){if(currentQueue){currentQueue[queueIndex].run()}}queueIndex=-1;len=queue.length}currentQueue=null;draining=false;runClearTimeout(timeout)}process.nextTick=function(fun){var args=new Array(arguments.length-1);if(arguments.length>1){for(var i=1;i<arguments.length;i++){args[i-1]=arguments[i]}}queue.push(new Item(fun,args));if(queue.length===1&&!draining){runTimeout(drainQueue)}};function Item(fun,array){this.fun=fun;this.array=array}Item.prototype.run=function(){this.fun.apply(null,this.array)};process.title="browser";process.browser=true;process.env={};process.argv=[];process.version="";process.versions={};function noop(){}process.on=noop;process.addListener=noop;process.once=noop;process.off=noop;process.removeListener=noop;process.removeAllListeners=noop;process.emit=noop;process.prependListener=noop;process.prependOnceListener=noop;process.listeners=function(name){return[]};process.binding=function(name){throw new Error("process.binding is not supported")};process.cwd=function(){return"/"};process.chdir=function(dir){throw new Error("process.chdir is not supported")};process.umask=function(){return 0}},{}],6:[function(require,module,exports){module.exports={name:"ejs",description:"Embedded JavaScript templates",keywords:["template","engine","ejs"],version:"3.1.6",author:"Matthew Eernisse <mde@fleegix.org> (http://fleegix.org)",license:"Apache-2.0",bin:{ejs:"./bin/cli.js"},main:"./lib/ejs.js",jsdelivr:"ejs.min.js",unpkg:"ejs.min.js",repository:{type:"git",url:"git://github.com/mde/ejs.git"},bugs:"https://github.com/mde/ejs/issues",homepage:"https://github.com/mde/ejs",dependencies:{jake:"^10.6.1"},devDependencies:{browserify:"^16.5.1",eslint:"^6.8.0","git-directory-deploy":"^1.5.1",jsdoc:"^3.6.4","lru-cache":"^4.0.1",mocha:"^7.1.1","uglify-js":"^3.3.16"},engines:{node:">=0.10.0"},scripts:{test:"mocha"}}},{}]},{},[1])(1)});


function FormFacade(data)
{
    this.data = data;
    this.draft = null;
    this.result = null;
    this.template = {};
    this.showago = true;
    this.__sections = null;
    this.paymentIntent = null;
    this.debounceTimer = null;
    this.signaturePad = {}

    this.prefill = function()
    {
        var curr = this;
        this.draft = {};
        if(!this.draft.entry) this.draft.entry = {};
        if(!this.draft.pageHistory) this.draft.pageHistory = [];
        if(!this.draft.activePage) this.draft.activePage = 'root';
        var items = this.data.scraped.items||{};
        var qprefill = this.data.request.query.prefill;
        if(qprefill && window[qprefill])
        {
            var rslt = window[qprefill](this);
            for(var itemId in items)
            {
                var item = items[itemId];
                var preval = rslt['entry.'+item.entry];
                if(preval) this.draft.entry[item.entry] = preval;
            }
        }
        else
        {
            var urlparams = new URLSearchParams(window.location.search);
            var eml = urlparams.get('emailAddress');
            if(eml) this.draft.emailAddress = eml;
            for(var itemId in items)
            {
                var item = items[itemId];
                var urlval = urlparams.get('entry.'+item.entry);
                if(item.type=='CHECKBOX' && urlval)
                {
                    urlval = urlparams.getAll('entry.'+item.entry);
                    curr.draft.entry[item.entry] = urlval;
                }
                else if(item.type=='GRID' && item.rows)
                {
                    item.rows.forEach(function(rw){
                        if(rw.multiple)
                            urlval = urlparams.getAll('entry.'+rw.entry);
                        else
                            urlval = urlparams.get('entry.'+rw.entry);
                        if(urlval)
                            curr.draft.entry[rw.entry] = urlval;
                    });
                }
                else if(urlval)
                {
                    curr.draft.entry[item.entry] = urlval;
                }
                var urlothr = urlparams.get('entry.'+item.entry+'.other_option_response');
                if(urlothr) curr.draft.entry[item.entry+'-other_option_response'] = urlothr;
            }
        }
        return this.draft;
    }

    this.computeField = function(tmpl, citm)
    {
        if(!citm && tmpl.indexOf('${')<0) return tmpl;
        return this.calculateEngine(tmpl, {calcfield:citm});
    }

    this.compute = function()
    {
        var curr = this;
        var items = this.data.scraped.items||{};
        var oitems = this.data.facade.items||{};
        var sitems = [];
        for(var sid in items)
        {
            var sitm = items[sid];
            sitm.id = sid;
            sitm.logic = oitems[sid];
            sitems.push(sitm);
        }
        sitems.sort(function(a,b){ return a.index-b.index; });
        sitems.forEach(function(item, i){
            var itemId = item.id;
            var oitem = oitems[itemId];
            if(oitem)
            {
                if(oitem.calculated)
                {
                    var calcval = curr.computeField(oitem.calculated, item);
                    if(curr.draft && curr.draft.entry)
                        curr.draft.entry[item.entry] = calcval;
                    var widg = document.getElementById('Widget'+itemId);
                    if(widg) widg.value = calcval;
                    var disp = document.getElementById('Display'+itemId);
                    if(disp)
                    {
                        if(calcval && item.type=='DATE')
                        {
                            var b = calcval.split(/\D/);
                            var calcdt = new Date(0, 0, 0);
                            if(b.length==3)
                                calcdt = new Date(b[0], b[1]-1, b[2]);
                            else if(b.length==6)
                                calcdt = new Date(b[0], b[1]-1, b[2], b[3], b[4], b[5]);
                            if(item.time==1)
                                disp.value = calcdt.toLocaleString();
                            else
                                disp.value = calcdt.toLocaleDateString();
                        }
                        else
                            disp.value = item.format?item.format(calcval):calcval;
                    }
                }
                else if(oitem.prefill && !curr.draft.entry[item.entry])
                {
                    var preval = curr.computeField(oitem.prefill, item);
                    if(preval)
                    {
                        curr.draft.entry[item.entry] = preval;
                        var widg = document.getElementById('Widget'+itemId);
                        if(widg) widg.value = preval;
                        var disp = document.getElementById('Display'+itemId);
                        if(disp) disp.value = preval;
                    }
                }
                else if(oitem.type=='FILE_UPLOAD' && oitem.subtype != 'SIGNATURE')
                {
                    var files = curr.draft.entry[item.entry];
                    var widg = document.getElementById('Widget'+itemId);
                    if(widg && files) widg.value = files;
                    var filearr = [];
                    if(files) filearr = files.split(',');
                    filearr = filearr.map(function(fl){ 
                        var fnm = decodeURIComponent(fl.split('/').pop().trim());
                        return '<a class="addedfile" href="javascript:void(0)">'+fnm+'</a>'; 
                    });
                    var disp = document.getElementById('Display'+itemId);
                    if(disp)
                    {
                        if(filearr.length>0)
                            disp.innerHTML = filearr.join(' ');
                        else
                        {
                            var plchdr = oitem.placeholder?oitem.placeholder:'Add file';
                            disp.innerHTML = '<a class="addfile" href="javascript:void(0)">'+plchdr+'</a>';
                        }
                    }
                }
            }
        });
        sitems.forEach(function(item, i){
            var itemId = item.id;
            var oitem = oitems[itemId];
            var widg = document.getElementById('Help'+itemId);
            if(oitem && oitem.helpMark && widg)
            {
                var preval = curr.computeField(oitem.helpMark, item);
                widg.innerHTML = preval;
            }
        });
        var doc = this.getDocument();
        var ttls = this.data.facade&&this.data.facade.titles?this.data.facade.titles:{};
        for(var titleId in ttls)
        {
            var ttl = ttls[titleId];
            var ttldiv = doc.getElementById('ff-desc-'+titleId);
            if(ttl.messageMark && ttldiv)
            {
                var deschtm = curr.computeField(ttl.messageMark);
                ttldiv.innerHTML = curr.switchAllCDN(deschtm);
            }
        }
        doc.querySelectorAll(
            '.ff-title a, .ff-section-header a, .ff-description a, .ff-item label a, .ff-item .ff-help a'
        ).forEach(lnk=>{
            if(lnk.classList.length==0) lnk.target = '_blank';
        });
    }

    this.toRGB = function(hex, opacity) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        if(result)
        {
            var rgb = [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)
            ];
            if(opacity) rgb.push(opacity);
            return 'rgb('+rgb.join(', ')+')';
        }
        return hex;

    }

    this.getEnhancement = function()
    {
        var enhance = this.data.request.query.enhance;
        if(enhance == 'yes')
        {
            return {
                layout:'1column', color:'theme', font:'space',
                input:'flat', button:'flat'
            };
        }
        return null;
    }

    this.shuffle = function(array)
    {
        if(this.isEditMode()) return array;
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) 
        {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    this.filter = function(chs=[])
    {
        var valids = [];
        var empties = [];
        var invalids = [];
        chs.forEach(function(ch){
          if(ch.value=='__other_option__')
            invalids.push(ch);
          else if(ch.value=='')
            empties.push(ch);
          else
            valids.push(ch);
        });
        return valids.concat(empties);
    }

    this.loadScript = function(jssrc, callback)
    {
        var script = document.createElement("script")
        script.type = "text/javascript";
        if (script.readyState){  //IE
            script.onreadystatechange = function(e){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback(e);
                }
            };
        } else {
            script.onload = script.onerror = function(e){
                callback(e);
            };
        }
        script.src = jssrc;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    this.loadScripts = function(srcs)
    {
        var curr = this;
        if(this.data.devEnv)
        {
            srcs = srcs.map(function(src){
                var srclst = src.split('https://formfacade.com');
                return srclst.length==2?(srclst.pop()+'?_='+new Date().getTime()):src;
            });
        }
        var prms = srcs.map(function(src){
            return new Promise(function(resolve, reject){
                curr.loadScript(src, resolve);
            });
        });
        return Promise.all(prms);
    }

    this.fetchScrape = function(publishId)
    {
        if(this.data.request.query.template == 'cloud')
            return fetch(`/uploaded/templates/${publishId}`).then(req=>req.json()).then(res=>res.scrape||{});
        else if(this.data.request.query.template == 'draft')
            return fetch(`https://formfacade-template-default-rtdb.firebaseio.com/scrape/${publishId}-${this.data.request.query.uid}.json`).then(req=>req.json()).then(jso=>jso||{})
            ;
        else
            return fetch('https://formfacade.firebaseio.com/scrape/'+publishId+'.json').then(req=>req.json()).then(jso=>jso||{})
            ;
    }

    this.fetchPublish = function(publishId)
    {
        var {template, uid} = this.data.request.query;
        if(template == 'cloud')
            return fetch(`/uploaded/templates/${publishId}`).then(req=>req.json()).then(res=>res.publish||{});
        else if(template == 'draft')
            return fetch(`https://formfacade-template-default-rtdb.firebaseio.com/publish/${publishId}-${uid}.json`).then(req=>req.json()).then(jso=>jso||{})
            ;
        else
            return fetch('https://formfacade.firebaseio.com/publish/'+publishId+'.json').then(req=>req.json()).then(jso=>jso||{})
            ;
    }

    this.fetchFacade = function(publishId)
    {
        var {template, uid} = this.data.request.query;
        if(template == 'cloud')
            return Promise.resolve({});
        else if(template == 'draft')
            return fetch(`https://formfacade-template-default-rtdb.firebaseio.com/facade/${publishId}-${uid}.json`).then(req=>req.json()).then(jso=>jso||{})
            ;
        else 
            return fetch('https://formfacade.firebaseio.com/facade/'+publishId+'-editable.json').then(req=>req.json()).then(jso=>jso||{})
            ;
    }

    this.fetchInfo = function(userId)
    {
        return fetch('https://formfacade.firebaseio.com/team/'+userId+'/info.json').then(req=>req.json()).then(jso=>jso||{})
        ;
    }

    this.fetchPaid = function(userId)
    {
        return fetch('https://formfacade.firebaseio.com/user/'+userId+'/paid.json').then(req=>req.json()).then(jso=>jso)
        ;
    }

    this.fetchPrefill = function(publishId, prefillId)
    {
        return fetch('https://formfacade.firebaseio.com/prefill/'+publishId+'/link/'+prefillId+'.json').then(req=>req.json()).then(jso=>jso||{})
        ;
    }

    this.fetchResponse = function(publishId, savedId)
    {
        var baseurl = this.data.devEnv?'http://localhost:5000':'https://formfacade.com';
        return fetch(baseurl+'/draft/'+publishId+'/read/'+savedId).then(req=>req.json()).then(jso=>jso||{})
        ;
    }

    this.init = function(savedId)
    {
        this.result = null;
        this.__sections = null;
        var {userId, publishId} = this.data.request.params;
        var prms = [
            this.fetchScrape(publishId), this.fetchPublish(publishId), this.fetchFacade(publishId),
            this.fetchInfo(userId), this.fetchPaid(userId)
        ];
        savedId = savedId||this.readCookie('ff-'+publishId);
        var {flush, restoreId, copyId, prefillId, lang} = this.data.request.query;
        var urlparams = new URLSearchParams(window.location.search);
        flush = flush||urlparams.get('ff-flush');
        restoreId = restoreId||urlparams.get('restoreId');
        if(restoreId)
        {
            this.data.restoreId = restoreId;
            savedId = restoreId;
            flush = false;
        }
        copyId = copyId||urlparams.get('copyId');
        prefillId = prefillId||urlparams.get('prefillId');
        if(prefillId)
        {
            var prefillprm = this.fetchPrefill(publishId, prefillId).then(jso=>jso.entry?{entry:jso.entry}:{});
            prms.push(prefillprm);
        }
        else if(copyId)
        {
            var copyprm = this.fetchResponse(publishId, copyId).then(jso=>jso.entry?{entry:jso.entry}:{});
            prms.push(copyprm);
        }
        else if(savedId && !flush)
        {
            var savedprm = this.fetchResponse(publishId, savedId);
            prms.push(savedprm);
        }
        else
        {
            var savedprm = Promise.resolve({});
            prms.push(savedprm);
        }
        var curr = this;
        return Promise.all(prms).then(function(rs){
            var [scraped, form, facade, info, paid, drft] = rs;
            curr.data.scraped = curr.data.ban?{error:'Not public', errorMessage:curr.data.ban}:scraped;
            curr.data.form = form;
            curr.data.facade = facade;
            curr.config = Object.assign(curr.config, info);
            curr.config.payment = paid||{};
            if(curr.isPaid(userId, {paid}))
            {
                curr.config.branded = paid.branded;
                curr.config.plan = 'paid';
            }
            if(drft.entry)
            {
                curr.draft = drft;
                if(!curr.draft.pageHistory) curr.draft.pageHistory = [];
                if(!curr.draft.activePage) curr.draft.activePage = 'root';
                if(restoreId) curr.draft.activePage = 'root';
            }
            else
                curr.draft = curr.prefill();
            var setting = curr.data.facade.setting||{};
            var ln = setting.language||info.language||lang;
            return curr.loadLanguage(ln);
        });
    }

    this.loadLanguage = function(ln)
    {
        if(ln && this.langtext && ln!=this.langtext.language)
        {
            var baseurl = this.data.devEnv?'http://localhost:5000':'https://formfacade.com';
            return fetch(baseurl+'/include/language/'+ln+'.json').then(req=>req.json()).then(langtext=>{
                this.langtext = langtext;
            });
        }
        else
        {
            return Promise.resolve();
        }
    }

    this.load = function(divId)
    {
        var curr = this;
        curr.divId = divId;
        if(this.data.request.params.target=='classic')
        {
            if(window.wp)
                this.data.request.params.target = 'wordpress';
        }
        var cfgstg = curr.config.setting||{};
        var trg = curr.data.request.params.target;
        if(trg=='tailwind')
        {
            curr.addLinkTag('/css/tailwind/output.css');
        }
        else
        {
            curr.addLinkTag('/css/open-props.min.css');
            curr.addLinkTag('/css/formfacade.css');
            if(trg=='bootstrap' || trg=='gsuite' || trg=='clean')
                curr.addLinkTag('/css/formfacade.boot.css');
            else
                curr.addLinkTag('/css/formfacade.rest.css');
            if(cfgstg.currency)
                curr.addLinkTag('/css/neartail.css');
        }
        var celm = curr.getContentElement();
        if(celm) celm.innerHTML = curr.template.preview;
        this.init().then(function(){
            var fac = curr.data.facade||{};
            var facstg = fac.setting||{};
            if(!cfgstg.currency && facstg.currency)
                curr.addLinkTag('/css/neartail.css');
            if(curr.isEditMode())
            {
                if(curr.data.scraped.items)
                    curr.render();
                else if(curr.hasCreator())
                    curr.getContentElement().innerHTML = curr.template.preview;
                else
                    curr.render();
                curr.addLinkTag('/css/formfacade.editor.css');
                curr.addLinkTag('/css/neartail.editor.css');
            }
            else
            {
                curr.render();
            }
            var urlparams = new URLSearchParams(window.location.search);
            var addtocart = urlparams.get('addtocart');
            if(addtocart)
            {
                var cartitm = curr.data.scraped.items[addtocart]||{};
                var cartsec = cartitm.section||{};
                if(cartsec.id!='root') curr.directtoSection(cartsec.id);
                curr.showProduct(addtocart);
                var cartelm = document.getElementById('ff-id-'+addtocart);
                curr.scrollIntoView(cartelm);
            }
            var callback = curr.data.request.query.callback;
            if(callback && window[callback])
                window[callback](curr);
            curr.scrapeSection();
            if(!window.Stripe && curr.getPaymentButtons().length>0)
                curr.loadScript('https://js.stripe.com/v3/', function(){ });
        });
    }

    this.addLinkTag = function(lnkurl)
    {
        var exlnk = document.getElementById(lnkurl);
        if(exlnk) return;
        var host = this.data.devEnv?'':'https://formfacade.com';
        var version = this.data.devEnv?new Date().getTime():34;
        var lnkfull = host+lnkurl+'?nocache='+version;
        var relm = document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0];
        var link = document.createElement('link');
        link.id = lnkurl;
        link.rel = 'stylesheet';
        link.href = lnkfull;
        relm.appendChild(link);
    }

    this.createCookie = function(name, value, days) 
    {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }

    this.readCookie = function(k)
    {
        var val = (document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2];
        return val&&val.trim()==""?null:val;
    }

    this.hasCreator = function()
    {
        var fac = this.data.facade||{};
        var setting = fac.setting||{};
        var form = this.data.form||{};
        var editors = form.editors||[];
        return editors.indexOf('creator@neartail.com')>=0 || setting.creator=='neartail' 
        || (setting.currencyCode && editors.indexOf('editor@formfacade.com')>=0);
    }

    this.hasEditor = function()
    {
        var editors = this.data && this.data.form && this.data.form.editors;
        return editors && editors.indexOf('editor@formfacade.com')>=0;
    }

    this.hasCreatorOrEditor = function() {
        return this.hasCreator() || this.hasEditor();
    }

    this.isEditMode = function()
    {
        return location.href.indexOf('/editor/form/')>=0;
    }

    this.isPreviewMode = function()
    {
        if(window.editFacade)
            return true;
        else if(location.href.indexOf('https://formfacade.com/edit/')==0)
            return true;
        else if(location.href.indexOf('https://formfacade.com/embed/')==0)
            return true;
        else if(location.href.indexOf('https://formfacade.com/share/')==0)
            return true;
        return false
    }

    this.launchPreview = function()
    {
        var msg = 'You are in edit mode. Do you want to test this form in preview mode?';
        if(confirm(msg)) window.open(location.href.replace('/editor/','/preview/'));
    }

    this.html = function(txt)
    {
        if(txt)
        {
            txt = txt.trim().replace(/(?:\r\n|\r|\n)/g, '<br>');

            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            txt = txt.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            txt = txt.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

            replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            txt = txt.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
        }
        return txt;
    }

    this.val = function(title)
    {
        var items = this.data.scraped.items||{};
        for(var i in items)
        {
            var item = items[i];
            if(this.draft && item.title==title)
                return this.draft.entry[item.entry];
        }
    }

    this.entry = function(entryId)
    {
        if(this.draft.entry)
        {
            var entryval = this.draft.entry[entryId];
            if(entryval)
                return entryval;
            else
                this.draft.entry[entryId.toString()];
        }
    }

    this.getContentElement = function()
    {
        var elm = document.querySelector(this.divId);
        return elm;
    }

    this.getPhone = function(pg='root')
    {
        if(this.data.facade && this.data.facade.whatsapp)
        {
            var itms = this.data.scraped.items||{};
            var entrs = this.draft.entry||{};
            var ph = this.data.facade.whatsapp.phone;
            var sbmts = this.data.facade.submit||{};
            if(sbmts[pg])
            {
                var sbmt = sbmts[pg];
                var itm = itms[sbmt.router]||{};
                if(sbmt.submitto)
                {
                    if(sbmt.submitto=='whatsapp')
                    {
                        ph = sbmt.waphone||ph;
                        return entrs[itm.entry]||ph;
                    }
                    else
                        return null;
                }
                else
                {
                    return entrs[itm.entry]||ph;
                }
            }
            return ph;
        }
    }

    this.showMessage = function(secid)
    {
        var curr = this;
        var doc = this.getDocument();
        if(this.getPhone(secid))
        {
            var elms = doc.querySelectorAll('#ff-submit-'+secid);
            elms.forEach(function(elm){
                elm.innerHTML = curr.lang('Launching WhatsApp...');
            });
        }
        else
        {
            var elms = doc.querySelectorAll('#ff-submit-'+secid+' img');
            elms.forEach(function(elm){ 
                elm.src = 'https://formfacade.com/img/loading.svg'; 
            });
        }
    }

    this.clearSignature = function(itemId, entryId) {
        this.signaturePad[itemId].clear();
        var input = document.getElementById(`Widget${itemId}`);
        if(input) input.value = "";
        this.draft.entry[entryId] = "";
        this.saveDraft();
    }

    this.renderSignature = function()
    {
        var curr = this;
        if(typeof(SignaturePad)!='function') return;
        var signatures = document.querySelectorAll('.ff-signature');
        var params = curr.data.request.params;
        var publishId = params.publishId;

        signatures.forEach(function(signature){
            var ds = signature.dataset;
            var itemId = ds.id;
            var entryId = ds.entry;
            var canvas =  signature.querySelector('canvas')
            var imageUrl;

            if(curr.draft && curr.draft.entry && curr.draft.entry[entryId])
                imageUrl = curr.draft.entry[entryId]

            if(!signature.dataset.esignAdded){
                canvas.width = signature.clientWidth;
                curr.signaturePad[itemId] = new SignaturePad(canvas, {backgroundColor: "rgba(255,255,255,.1)", itemId: itemId});
                var signaturePad = curr.signaturePad[itemId];
                
                signaturePad.addEventListener("endStroke", (event) => {
                    var savedId = curr.draft.savedId;
                    var signUrl = `https://formfacade.com/uploaded/${publishId}/${savedId}/${entryId}/esign.png`
                    var input = document.getElementById(`Widget${itemId}`);
                    input.value = signUrl;
                    curr.draft.entry[entryId] = signUrl;

                    curr.saveSignImage(itemId, entryId);

                    if(!params.publishId) {
                        var data = {publishId: publishId, currParams: curr.data.request.params, params: params, userAgent: navigator.userAgent}
                        curr.showWarning('Signature undefined issue', data, null, {ignorePopup: true});
                    }
                });

                if(signaturePad && signaturePad.isEmpty() && imageUrl) {
                    if(curr.data.devEnv)
                        imageUrl = imageUrl.replace("https://formfacade.com", "http://localhost:5000");
                    signaturePad.fromDataURL(imageUrl, { width: canvas.clientWidth, height: canvas.clientHeight })
                }
                signature.dataset.esignAdded = true;
            }
        });
    }


    this.saveSignImage = function(itemId, entryId) {
        var curr = this;
        var baseurl = 'https://formfacade.com';
        if(curr.data.devEnv)
            baseurl = 'http://localhost:5000';
        var publishId = curr.data.request.params.publishId;

        var savedId = curr.draft.savedId;
        if(!savedId) savedId = curr.readCookie('ff-'+publishId);
        var prm = Promise.resolve(savedId);
        if(!savedId) prm = curr.saveDraft().then(_=>curr.draft.savedId);
        curr.saving = prm.then(function(svid){
            if(!svid) throw Error('Save failed! Try again.');
            return fetch(baseurl+'/signature/'+publishId+'/'+svid+'/'+entryId, {
                method: 'post',
                headers: { accept: 'application/json', 'content-type': 'application/json' },
                body: JSON.stringify({image: curr.signaturePad[itemId].toDataURL()}),
            }).then(function(response){
                return response.json(); 
            }).then(function(response){
                var input = document.getElementById(`Widget${itemId}`);
                if(response && response.url && input) {
                    curr.draft.entry[entryId] = response.url;
                    input.value = response.url;
                }

                return curr.saveDraft();
            })
        });

        return curr.saving;

    }

    this.debounce = function(func, delay) {
        var curr = this;      
        
        return function() {
          const context = this;
          const args = arguments;
          clearTimeout(curr.debounceTimer);

          curr.debounceTimer = setTimeout(() => {
            func.apply(context, args);
          }, delay || 500);
        };
    }

    this.renderUpload = function(locale)
    {
        if(!window.Uppy) return;
        var curr = this;
        if(!this.data.locale) this.data.locale = locale;
        var uploads = this.getDocument().querySelectorAll('.ff-file-upload');
        uploads.forEach(function(upload){
            if(!upload.dataset.uppied)
            {
                var ds = upload.dataset;
                var filearr = [];
                if(ds.files) filearr = ds.files.split(',');
                filearr = filearr.map(function(fl){ return fl.trim() });
                curr.renderUploadField(ds.id, ds.entry, filearr);
                upload.dataset.uppied = true;
            }
        });
    }

    this.extensions = 'pdf, doc, docx, xls, xlsx, ppt, pptx, csv, txt, rtf, html, zip, mp3, wma, mpg, flv, avi, 3gp, m4v, mov, mp4, wmv, jpg, jpeg, png, gif';

    this.renderUploadField = function(id, entry, files)
    {
        var curr = this;
        var baseurl = 'https://formfacade.com';
        if(curr.data.devEnv)
            baseurl = 'http://localhost:5000';
        var publishId = curr.data.request.params.publishId;
        var itm;
        if(curr.data.scraped.items)
            itm = curr.data.scraped.items[id];
        if(!itm) itm = {};
        var fcitm;
        if(curr.data.facade.items)
            fcitm = curr.data.facade.items[id];
        if(!fcitm) fcitm = {};
        var maxnum = fcitm.maxnum?fcitm.maxnum:1;
        var minnum = itm.required?1:0;
        var filemb = curr.config.filemb||10;
        var mbtxt = filemb<1000?(filemb+' MB max'):(filemb/1000+' GB max');
        var ph = (minnum==maxnum?maxnum:(minnum+'-'+maxnum))+' file'+(maxnum==1?'':'s')+', '+mbtxt;
        var uppyopts = {
            debug:true, autoProceed:true,
            restrictions: {maxFileSize:filemb*1024*1024, maxNumberOfFiles:maxnum, minNumberOfFiles:minnum},
            onBeforeFileAdded: function (currentFile, files) {
                if(curr.isIos()) {
                    if(files) {
                        var uploadedFileNames = [];
                        for(let uploadedFile in files) {
                            uploadedFileNames.push(files[uploadedFile].name)
                        }
                        if(uploadedFileNames.indexOf(currentFile.name) > -1) {
                            var fileName = currentFile.name.split('.');
                            var extension = fileName.pop();
                            fileName = fileName.join('.')
                            currentFile.name = `${fileName}_${Date.now()}.${extension}`
                        }
                    }
                }
                return currentFile;
            }
        };
        if(this.data.locale)
            uppyopts.locale = Uppy.locales[this.data.locale]||Uppy.locales.en_US;
        var exts = fcitm.extension?fcitm.extension:this.extensions;
        if(exts!='all')
            uppyopts.restrictions.allowedFileTypes = exts.split(',').map(function(ext){ return '.'+ext.trim(); });
        var uppy = new Uppy.Uppy(uppyopts).use(Uppy.Dashboard, {
            trigger:'#Display'+id, note:ph,
            showProgressDetails:true, showRemoveButtonAfterComplete:true,
            browserBackButtonClose:true, proudlyDisplayPoweredByUppy:false, doneButtonHandler: null,
        })
        .use(Uppy.AwsS3, {
            limit:1, timeout:1000*60*60,
            getUploadParameters(file) {
                var savedId = curr.draft.savedId;
                if(!savedId) savedId = curr.readCookie('ff-'+publishId);
                var prm = Promise.resolve(savedId);
                if(!savedId) prm = curr.saveDraft().then(_=>curr.draft.savedId);
                return prm.then(function(svid){
                    if(!svid) throw Error('Save failed! Try again.');
                    return fetch(baseurl+'/signedurl/'+publishId+'/'+svid+'/'+entry, {
                        method: 'post',
                        headers: {accept: 'application/json', 'content-type': 'application/json',},
                        body: JSON.stringify({filename: file.name, contentType: file.type}),
                    }).then(function(response){
                        return response.json(); 
                    });
                });
            }
        });
        var updateFiles = function()
        {
            var uploads = uppy.getFiles().map(function(up){
                var savedId = curr.draft.savedId;
                if(!savedId) savedId = curr.readCookie('ff-'+publishId);
                var flname = up.uploadURL.split('%2F').pop();
                var flurl = 'https://formfacade.com/uploaded/'+publishId+'/'+savedId+'/'+entry+'/'+flname;
                return flurl;
            });
            var wdg = curr.getDocument().getElementById('Widget'+id);
            if(wdg) wdg.value = uploads.join(', ');
            curr.draft.entry[entry] = uploads.join(', ');
            curr.saveDraft();
        }
        uppy.on('complete', function(result){
            if(result.successful) updateFiles();
            var donebtns = curr.getDocument().querySelectorAll('.uppy-StatusBar-content[title="Complete"] .uppy-StatusBar-statusPrimary');
            donebtns.forEach(function(donebtn){
                donebtn.addEventListener('click', function(){ uppy.getPlugin('Dashboard').closeModal(); });
            });
        });
        uppy.on('file-removed', function(file, reason){
            updateFiles();
        });
    }

    this.saveDraft = function(evt)
    {
        var curr = this;
        if(curr.saving && !curr.draft.savedId) return curr.compute();
        curr.saving = new Promise(function(resolve, reject){
            var elm = curr.getContentElement();
            if(!elm) return;
            var frm = elm.querySelector('form');
            if(!frm) return;
            var formData = new FormData(frm);
            if(!formData.entries) return;
            var entries = formData.entries();
            var variants = {};
            var pairs = {};
            var next, entry;
            while ((next = entries.next()) && next.done === false) 
            {
                entry = next.value;
                var [ename, evalue] = entry;
                if(ename=='emailAddress' && evalue)
                {
                    if(!formFacade.draft) formFacade.draft = {};
                    formFacade.draft.emailAddress = evalue;
                }
                else if(ename=='responseId' && evalue)
                {
                    if(!formFacade.draft) formFacade.draft = {};
                    formFacade.draft.responseId = evalue;
                }
                else if(ename.indexOf('variant.')==0 && evalue)
                {
                    var [vprefix, ventry] = ename.split('.');
                    var vrn = variants[ventry]||[];
                    vrn.push(evalue);
                    variants[ventry] = vrn;
                }
                else if(ename.indexOf('entry.')==0)
                {
                    var nms = ename.split('entry.');
                    var nm = nms.pop();
                    nm = nm.replace('.','-');
                    var val = pairs[nm];
                    if(!nm)
                    {
                        console.warn('Invalid parameter', next, val);
                    }
                    else if(val)
                    {
                        var valarr = Array.isArray(val)?val:[val];
                        valarr.push(evalue);
                        pairs[nm] = valarr;
                    }
                    else if(evalue)
                    {
                        pairs[nm] = evalue;
                    }
                }
            }
            var fac = curr.data.facade||{};
            var enhance = fac.enhance||{};
            if(!enhance.layout || enhance.layout=='default')
            {
                var txtareas = elm.querySelectorAll('.ff-item-prd textarea');
                txtareas.forEach(txtarea=>{
                    var txtname = txtarea.name||'';
                    var [txtprefix, txtentry] = txtname.split('.');
                    if(txtprefix=='entry')
                    {
                        var vrnlist = variants[txtentry];
                        var vrntxt = vrnlist?vrnlist.join('\n'):'';
                        txtarea.value = vrntxt;
                        pairs[txtentry] = vrntxt;
                    }
                });
            }
            formFacade.draft.entry = pairs;
            var http = new XMLHttpRequest();
            var baseurl = 'https://formfacade.com';
            if(curr.data.devEnv)
                baseurl = 'http://localhost:5000';
            var publishId = curr.data.request.params.publishId;
            var httpurl = baseurl+'/draft/'+publishId+'/save';
            var userId = curr.data.request.params.userId;
            if(userId)
                httpurl = baseurl+'/draft/'+userId+'/form/'+publishId+'/save';
            http.open('POST', httpurl, true);
            http.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
            http.responseType = 'json';
            http.onload = function()
            {
                var jso = http.response;
                if(jso.savedId)
                {
                    curr.draft.savedId = jso.savedId;
                    if(jso.draftSeq)
                        curr.draft.draftSeq = jso.draftSeq;
                    curr.createCookie('ff-'+publishId, jso.savedId, 3/24);
                    var evtname = evt&&evt.target&&evt.target.name?evt.target.name:'visit';
                    curr.stat(evtname);
                }
                resolve(jso);
            }
            http.onerror = err=>reject(http.response||"Couldn't connect to server");
            http.send(JSON.stringify(formFacade.draft));
            if(evt && evt.target && evt.target.name)
            {
                var entrg = evt.target.name.split('entry.').pop();
                var scr = curr.data.scraped;
                var fcd = curr.data.facade;
                for(var iid in scr.items)
                {
                    var itm = scr.items[iid];
                    var fitm = fcd&&fcd.items?fcd.items[iid]:null;
                    if(itm.entry==entrg && fitm && fitm.js)
                    {
                        try{
                            eval(fitm.js);
                        }
                        catch(err){
                            console.error(fitm.js+' failed with '+err);
                        }
                    }
                }
            }
            curr.compute();
            if(window.cartSidebar) cartSidebar.fetch();
            if(window.facadeListener) facadeListener.update(curr);
        }).then(function(){
            curr.saving = null;
            return;
        }).catch(function(err){
            console.warn('Save failed: '+err);
            curr.saving = null;
            return;
        });
        return curr.saving;
    }

    this.render = function()
    {
        var curr = this;
        var styelm = this.getDocument().getElementById('ff-style-header');
        if(this.isEditMode())
        {
            if(styelm) styelm.parentNode.removeChild(styelm);
            styelm = null;
        }
        if(!styelm)
        {
            styelm = document.createElement('div')
            styelm.id = 'ff-style-header';
            var bodyelm = document.getElementsByTagName('body')[0];
            if(bodyelm) bodyelm.appendChild(styelm);
            styelm.innerHTML = ejs.render(this.template.style, this);
        }
        var elm = this.getContentElement();
    	if(!elm) return;
        if(!this.__compiledtext) this.__compiledtext = ejs.compile(this.template.text);
        elm.innerHTML = this.__compiledtext(this);
        this.renderUpload();
        this.renderSignature();
        
        var pypanes = elm.querySelectorAll('.walletpane');
        if(pypanes.length>0)
        {
            var peerhost = curr.data.devEnv?'//localhost:3000':'//pay.peergateway.com';
            window.loadingScripts = window.loadingScripts||curr.loadScripts([peerhost+'/js/pay/google-forms.js?_=v7']);
            var fac = curr.data.facade||{};
            var stg = fac.setting||{};
            window.loadingScripts.then(_=>{
                pypanes.forEach(pyp=>{
                    var {wallet, to, amount} = pyp.dataset||{};
                    var note = (curr.draft.savedId||'Neartail').replace(/[^A-Z0-9]/ig, '');
                    if(curr.draft.submitSeq)
                    {
                        var number = curr.draft.submitSeq;
                        var ttl = curr.data.scraped.form||curr.data.scraped.title||'Order';
                        ttl = ttl.replace(/[^A-Z0-9]/ig, '').toUpperCase();
                        ttl = ttl.length>3?ttl.substring(0,3):'ORD';
                        if (number.toString().length > 5) note = number;
                        let s = '000000' + number;
                        note = ttl + s.substr(s.length - 5);
                    }
                    var opts = {
                        app:'neartail', userId:curr.data.request.params.userId, wallet:wallet, 
                        orderId:curr.draft.savedId, amount:amount, currency:stg.currency, currencyCode:stg.currencyCode,
                        to:to, toname:curr.config.title||curr.data.scraped.title, note:note
                    };
                    pyp.payment = new GoogleFormsPayment(opts);
                    pyp.payment.load('#'+pyp.id);
                });
            });
        }

        var frm = elm.querySelector('form');
        if(!frm) return console.warn('Form not found in Formfacade');
        frm.addEventListener('change', function(evt){
            curr.saveDraft(evt);
        });

        curr.compute();
        var config = this.config||{};
        if(config.plan=='warned' || config.plan=='blocked')
        {
            var fac = this.data.facade||{};
            var facstg = fac.setting||{};
            var params = this.data.request.params||{};
            var pricingpage = 'https://formfacade.com/website/pricing.html';
            if(facstg.currency) pricingpage = 'https://neartail.com/order-form/pricing.html';
            this.showPopup(
                `${config.plan=='blocked'?'âš¡':'âš '} Free limit exceeded`,
                'This form has exceeded its free limit. If you are the owner of this form, please upgrade to a paid plan. If not, contact the owner.',
                `<a class="btn btn-lg btn-primary" href="${pricingpage}?userId=${params.userId}" target="_blank">Upgrade</a>`,
                {render:config.plan=='blocked'}
            );
        }
        var onload = curr.data.request.query.onload;
        if(onload && window[onload])
            window[onload](curr);
        var fc = curr.data.facade;
        var jsrender = fc&&fc.enhance?fc.enhance.js:null;
        if(jsrender) eval(jsrender);
    }

    this.stat = function(evtname)
    {
    }

    this.showAll = function()
    {
        var doc = this.getDocument();
        doc.querySelectorAll('.ff-section').forEach(function(sec){ sec.style.display = 'block'; });
    }
    
    this.submit = function(frm, secid, callback)
    {
        var invalids = secid=='-3'?0:this.validate(frm, secid);
        if(invalids > 0) return;
        if(this.submitting) return;
        this.showMessage(secid);
        var curr = this;
        curr.submitting = Promise.resolve(curr.saving).then(function(){
            var pairs = {};
            var formData = new FormData(frm);
            var next, entry;
            var entries = formData.entries();
            while ((next = entries.next()) && next.done === false) 
            {
                entry = next.value;
                var val = pairs[entry[0]];
                if(val)
                    val.push(entry[1]);
                else if(entry[1])
                    pairs[entry[0]] = [entry[1]];
            }
            var forTask = {draftSeq:true, submitSeq:true, paymentId:true, consumerId:true,
                products:true, quantity:true, amount:false, email:false, phone:false};
            for(var tnm in forTask)
            {
                var tval = forTask[tnm];
                if(pairs[tnm])
                    pairs[tnm] = pairs[tnm];
                else if(tval==true)
                    pairs[tnm] = curr.draft[tnm];
                else if(tnm && tval)
                {
                    if(tnm=='phone')
                        pairs[tnm] = tval;
                    else if(tval=='emailAddress')
                        pairs[tnm] = curr.draft.emailAddress;
                    else
                    {
                        var tent = curr.data.scraped.items[tval];
                        pairs[tnm] = tent?curr.draft.entry[tent.entry]:null;
                    }
                }
            }
            pairs.pageHistory = curr.getPageHistory();
            if(curr.draft.responseId)
                pairs.responseId = curr.draft.responseId;
            if(curr.config.plan=='blocked')
                pairs.plan = 'blocked';
            curr.stat('submitting');
            if(window.gtag) window.gtag('event', 'submit', {
                event_category:'formfacade',
                event_label:curr.data.request.params.publishId,
                value:curr.draft.pageHistory.length
            });
            return curr.sendData(pairs);
        }).then(rs=>{
            return Promise.resolve(callback?callback(rs):null)
            .then(pass=>rs).catch(fail=>rs);
        }).then(rs=>{
            var publishId = curr.data.request.params.publishId;
            curr.stat('goal');
            curr.result = rs;
            if(rs && rs.code==200)
            {
                curr.createCookie('ff-'+publishId, '', -1);
                if(rs.submitSeq)
                {
                    curr.draft.submitSeq = rs.submitSeq;
                    curr.draft.submitted = new Date().getTime();
                }
                var smtxt;
                var submitto = 'default';
                var fc = curr.data.facade;
                if(fc && fc.submit && fc.submit[secid])
                {
                    var itmsubmit = fc.submit[secid];
                    if(itmsubmit.js)
                    {
                        try{
                            eval(itmsubmit.js);
                        }
                        catch(err){
                            console.error(itmsubmit.js+' failed due to '+err);
                        }
                    }
                    if(itmsubmit.submitto)
                        submitto = itmsubmit.submitto;
                    else if(fc.whatsapp && fc.whatsapp.phone)
                        submitto = 'whatsapp';
                    else if(itmsubmit.onsubmit)
                        submitto = itmsubmit.onsubmit;
                    if(submitto=='custom')
                    {
                        if(itmsubmit.messageMark)
                            curr.result.messageMark = itmsubmit.messageMark;
                        else
                            curr.result.messagePlain = itmsubmit.message;
                    }
                    if(submitto=='ifmsg')
                    {
                        var iftmpl = '${computeCondition("'+secid+'")}';
                        curr.result.messageMark = curr.calculateEngine(iftmpl);
                        if(!curr.result.messageMark) curr.result.messageMark = '(No message)';
                    }
                    else if(submitto=='redirect' && itmsubmit.redirect)
                    {
                        var reurl = curr.computeField(itmsubmit.redirect);
                        if(reurl)
                            window.top.location.href = reurl.trim();
                        else
                            console.error(itmsubmit.redirect+' is not a redirection url');
                        return;
                    }
                    else if(submitto=='whatsapp' && itmsubmit.wamsg)
                    {
                        smtxt = curr.computeField(itmsubmit.wamsg);
                    }
                }
                var phn = curr.getPhone(secid);
                if(phn)
                {
                    curr.draft.waphone = phn;
                    var ph = phn.match(/\d+/g).join('');
                    curr.render();
                    if(!smtxt)
                    {
                        var sfrm = curr.data.scraped||{};
                        var spref = sfrm.title||sfrm.form||'Untitled';
                        spref = '*'+spref+'* #'+curr.draft.submitSeq+'\n\n';
                        smtxt = spref+curr.computeField('${TEXTSUMMARY(true, true, "*")}');
                        smtxt = smtxt+'\n\n(Press send to confirm)';
                    }
                    var phurl = 'https://wa.me/'+ph+'?text='+encodeURIComponent(smtxt);
                    if(curr.isMobile())
                    {
                        setTimeout(function(){
                            window.top.location.href = phurl;
                        }, 500);
                    }
                    else
                    {
                        //var wawin = window.open(phurl, '_blank');
                        var qrhtml = `
                            <div class="ff-wa-qrcode form-group ff-item ff-section_header ff-full-width ff-item-noprd">
                                <h4 class="ff-section-header">Scan this QR code to confirm your order!</h4>
                                <img src="https://neartail.com/payment/qrcode/generate?url=${encodeURIComponent(phurl)}"><br>
                                <div class="ff-description">
                                    Once you scan this QR code, you will prompted to submit this order on WhatsApp.
                                    If WhatsApp is already installed on this computer, 
                                    <a href="${phurl}">click here to continue</a>. 
                                </div>
                            </div>
                        `;
                        var su = document.getElementById('ff-success');
                        if(su) su.innerHTML = qrhtml;
                    }
                    setTimeout(function(){
                        var su = document.getElementById('ff-success');
                        var suhide = document.getElementById('ff-success-hide');
                        if(su && suhide) su.innerHTML = suhide.innerHTML;
                    }, (curr.isMobile()?10:1000)*1000);
                }
                else
                {
                    curr.render();
                }
                curr.scrollIntoView();
                curr.getDocument().querySelectorAll('.ff-payment-form')
                .forEach(elm=>elm.style.display='none');
            }
            else if(rs && rs.code)
            {
                curr.getDocument().querySelectorAll('#ff-submit-'+secid+' img').forEach(function(elm){ 
                    elm.src = 'https://neartail.com/img/send.svg'; 
                });
                throw new Error('Not able to update this response in Google Forms');
                frm.action = 'https://docs.google.com/forms/d/e/'+publishId+'/viewform';
                frm.method = 'GET';
                frm.submit();
            }
            else
            {
                formFacade.render();
            }
            var onsubmit = curr.data.request.query.onsubmit;
            if(onsubmit && window[onsubmit])
            {
                window[onsubmit](curr);
            }
        }).catch(function(err){
            curr.showError('Submit failed', err);
            curr.submitting = null;
        });
        return false;
    }

    this.confirmwa = function(wa)
    {
        var curr = this;
        var baseurl = 'https://formfacade.com';
        if(curr.data.devEnv)
            baseurl = 'http://localhost:5000';
        var params = curr.data.request.params;
        if(curr.draft.savedId)
        {
            var url = baseurl+'/draft/'+params.publishId+'/whatsapp/'+curr.draft.savedId;
            var http = new XMLHttpRequest();
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send('phone='+encodeURIComponent(wa));
        }
        delete curr.data.facade.whatsapp.askwa;
        curr.render();
        return false;
    }

    this.savePayment = function()
    {
        var curr = this;
        var baseurl = 'https://formfacade.com';
        if(curr.data.devEnv)
            baseurl = 'http://localhost:5000';
        var params = curr.data.request.params;
        if(curr.draft.savedId)
        {
            var url = baseurl+'/draft/'+params.publishId+'/payment/'+curr.draft.savedId;
            var http = new XMLHttpRequest();
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.send('status=paid not verified');
        }
    }

    this.submitData = function(nmval)
    {
        var pairs = {id:this.data.request.params.publishId};
        var frm = this.data.scraped;
        var items = frm.items;
        for(var itemId in items)
        {
            var item = items[itemId];
            var val = nmval[item.title];
            if(val && item.entry) 
                pairs['entry.'+item.entry] = val;
        }
        return this.sendData(pairs);
    }

    this.sendData = function(pairs, trgurl)
    {
        var curr = this;
        return new Promise(function(resolve, reject){
            var baseurl = 'https://formfacade.com';
            if(curr.data.devEnv)
                baseurl = 'http://localhost:5000';
            var url = baseurl+(trgurl?trgurl:'/submitForm');
            var params = curr.data.request.params;
            var savedId = curr.draft.savedId;
            if(!savedId) savedId = curr.readCookie('ff-'+params.publishId);
            if(!trgurl && params.userId && params.publishId)
            {
                if(savedId)
                    url = url+'/'+params.userId+'/form/'+params.publishId+'/draft/'+savedId;
                else
                    url = url+'/'+params.userId+'/form/'+params.publishId+'/draft';
            }
            var params = 'callback=callbackFormFacade';
            for(var nm in pairs)
            {
                var val = pairs[nm];
                if(val && Array.isArray(val))
                {
                    val.forEach(function(ival){
                        params += '&'+nm+'='+encodeURIComponent(ival);
                    });
                }
                else if(val)
                    params += '&'+nm+'='+encodeURIComponent(val);
            }
            var http = new XMLHttpRequest();
            http.open('POST', url, true);
            http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            http.onload = function()
            {
                try
                {
                    var jso = JSON.parse(http.response);
                    if(http.status==200)
                        resolve(jso);
                    if(http.status==201)
                        resolve(jso);
                    else if(http.status>=400)
                        reject(jso);
                }
                catch(err)
                {
                    reject(err);
                }
            }
            http.onerror = err=>reject(http.response||"Couldn't connect to server");
            http.send(params);
        });
    }

    this.getHistory = function(eml)
    {
        if(!eml) return;
        var curr = this;
        eml = eml.toLowerCase();
        var {userId, publishId} = this.data.request.params;
        var baseurl = this.data.devEnv?'http://localhost:5000':'https://formfacade.com';
        var fetchurl = `${baseurl}/draft/${userId}/history/${publishId}?email=${encodeURIComponent(eml)}`;
        fetch(fetchurl).then(req=>req.json()).then(history=>{ 
            curr.draft.history = history||null;
            curr.saveDraft();
        });
    }

    this.getPrice = function(item, crncy='$')
    {
        if(item.price) return item.price;
        var oitems = this.data.facade.items?this.data.facade.items:{};
        var oitem = oitems[item.id];
        var prc = {min:0};
        if(oitem && oitem.price)
            prc.min = oitem.price;
        else if(item.help && item.help.indexOf('${')<0 && item.help.indexOf(crncy)>=0)
            prc.min = formFacade.computeField('${price("'+item.help+'","'+crncy+'")}');
        if(prc.min==0)
        {
            if(item.type=='LIST' || item.type=='MULTIPLE_CHOICE' || item.type=='SCALE' || item.type=='CHECKBOX')
            {
                if(item.choices)
                {
                    var chs = item.choices.map(ch=>{
                        if(ch.value.indexOf(crncy)>=0)
                            return formFacade.computeField('${price("'+ch.value+'","'+crncy+'")}');
                        else
                            return 0;
                    });
                    chs.sort((a,b)=>a-b);
                    prc.min = chs[0];
                    prc.max = chs.pop();
                }
            }
            else if(oitem && oitem.measure=='Configurable')
            {
                var vrns = oitem.variants||{};
                var chs = Object.values(vrns).filter(vrn=>!vrn.remain||vrn.remain>0)
                    .map(vrn=>Number(vrn.price));
                chs.sort((a,b)=>a-b);
                prc.min = chs[0];
                prc.max = chs.pop();
            }
            else if(item.type=='GRID')
            {
                if(item.rows)
                {
                    var chs = item.rows.map(ch=>{
                        if(ch.value.indexOf(crncy)>=0)
                            return formFacade.computeField('${price("'+ch.value+'","'+crncy+'")}');
                        else
                            return 0;
                    });
                    chs.sort((a,b)=>a-b);
                    prc.min = chs[0];
                    prc.max = chs.pop();
                }
            }
        }
        if(prc.min>0) prc.minformat = formFacade.computeField('${format('+prc.min+',"'+crncy+'")}');
        if(prc.max>0) prc.maxformat = formFacade.computeField('${format('+prc.max+',"'+crncy+'")}');
        if(oitem && oitem.fullprice>0) prc.fullformat = formFacade.computeField('${format('+oitem.fullprice+',"'+crncy+'")}');
        item.price = prc;
        return prc;
    }

    this.formatWeight = function(val)
    {
        if(isNaN(val)) return val;
        var nval = new Number(val);
        var unit = 'kg';
        var fac = this.data.facade;
        if(fac.setting&&fac.setting.currencyCode=='USD')
            unit = 'lb';
        if(unit=='kg')
        {
            if(nval<1)
                return (nval*1000)+' gm';
            else
                return nval+' kg';
        }
        else
        {
            if(nval<1)
                return (nval*16)+' oz';
            else
                return nval+' lb';
        }
    }

    this.hasProducts = function(sec)
    {
        var oitems = this.data.facade.items?this.data.facade.items:{};
        var prds = sec.items.filter(function(item, itmi){
            var oitem = oitems[item.id]?oitems[item.id]:{};
            if(oitem.widget=='product') return item;
        });
        return prds.length;
    }

    this.getSections = function(flush)
    {
        if(this.__sections && !flush) return this.__sections;
        var frm = this.data.scraped;
        var itmlen = 0;
        if(frm && frm.items)
            itmlen = Object.keys(frm.items).length;
        if(itmlen > 0)
        {
            var curr = this;
            var fac = this.data.facade;
            if(!fac) fac = {};
            if(!fac.setting) fac.setting = {};
            var oitems = fac.items?fac.items:{};
            var unit = fac.setting.currencyCode=='USD'?'lb':'kg';
            this.__sections = this.asSections(frm);
            this.__sections.forEach((sec, s)=>{
                sec.items.filter(itm=>{
                    var excludes = ['SECTION_HEADER','PAGE_BREAK','DATE','TIME','IMAGE','VIDEO'];
                    return excludes.indexOf(itm.type)<0;
                }).forEach(function(item, itmi){
                    var oitem = oitems[item.id]?oitems[item.id]:{};
                    if(oitem.deleted) item.deleted = oitem.deleted;
                    item.price = fac.setting.currency?curr.getPrice(item, fac.setting.currency):{};
                    item.product = (item.price.min>0||item.price.max>0)&&item.titleImage?{i:itmi}:null;
                    if(oitem.widget=='product' || oitem.prdimage) item.product = {i:itmi, noun:fac.setting.noun};
                    if(item.product)
                    {
                        if((item.type=='TEXT' && oitem.choices) || item.basetype=='TEXT')
                        {
                          item.type = 'LIST';
                          item.basetype = 'TEXT';
                          var discnum = oitem.discounted?oitem.discounted.filter(d=>d).length:0;
                          if(discnum==0) delete oitem.discounted;
                          item.choices = oitem.choices.map((och,c)=>{
                            var ch = {value:och};
                            if(oitem.measure=='Weight')
                              ch.display = curr.formatWeight(ch.value);
                            if(oitem.discounted)
                            {
                              ch.discounted = oitem.discounted[c];
                              if(ch.discounted)
                              {
                                var dsp = ch.display?ch.display:ch.value;
                                ch.display = dsp+' <small>'+curr.computeField('${format('+ch.discounted+',"'+fac.setting.currency+'")}')+'</small>';
                              }
                            }
                            return ch;
                          });
                          if(oitem.inventory=='yes' && oitem.measure && isNaN(oitem.remain)==false)
                          {
                            item.choices = item.choices.filter(ch=>{
                                if(isNaN(ch.value)==false)
                                {
                                    var chval = parseFloat(ch.value);
                                    if(chval>oitem.remain) return false;
                                }
                                return true;
                            });
                          }
                        }
                        else if(item.type=='PARAGRAPH_TEXT' && oitem.variants)
                        {
                            for(var vid in oitem.variants)
                            {
                                var vrn = oitem.variants[vid];
                                if(vrn.price) vrn.display = vrn.name+' <small>'+curr.computeField('${format('+vrn.price+',"'+fac.setting.currency+'")}')+'</small>';
                            }
                            if(oitem.inventory=='yes')
                            {
                                var outs = Object.values(oitem.variants).filter(vrn=>vrn.remain<=0);
                                if(Object.keys(oitem.variants).length==Object.keys(outs).length)
                                    oitem.remain = 0;
                            }
                        }
                        if(oitem.measure)
                        {
                          oitem.placeholder = 'Select '+oitem.measure;
                          if(oitem.measure=='Weight') oitem.placeholder += ' ('+unit+')';
                        }
                    }
                });
                sec.allItems = sec.items;
                sec.items = sec.items.filter(itm=>!itm.deleted);
            });
            return this.__sections;
        }
        return [];
    }

    this.splitHeaders = function(headers)
    {
        var curr = this;
        var splits = [];
        var fac = this.data.facade||{};
        var oitems = fac.items||{};
        headers.forEach(header=>{
            var inItems = [];
            var outItems = [];
            header.items.forEach(function(itm, itmi){
                var oitem = oitems[itm.id]||{};
                if(oitem.inventory=='yes' && oitem.remain<=0)
                    outItems.push(itm);
                else
                    inItems.push(itm);
            });
            var inHeader = Object.assign({}, header, {items:inItems});
            splits.push(inHeader);
            if(outItems.length>0)
            {
                var outItem = outItems[0]||{};
                var outHead = {
                    outstock:'out-'+outItem.id, title:curr.lang('Sold out!'),
                    help:curr.lang('Order early to avoid missing out next time')
                };
                var outHeader = {outstock:true, head:outHead, items:outItems};
                splits.push(outHeader);
            }
        });
        return splits;
    }

    this.validate = function(frm, secid)
    {
        var curr = this;
        var invalids = [];
        var doc = this.getDocument();
        var frmdata = new FormData(frm);
        var sections = this.getSections();
        var section = sections[0];
        sections.forEach(function(sec, s){
            if(sec.id==secid)
                section = sec;
        });
        doc.querySelectorAll('#ff-sec-'+section.id+' .ff-widget-error').forEach(function(widerr){
            widerr.style.display = 'none';
        });
        var emlwid = doc.getElementById('WidgetemailAddress');
        if(emlwid && emlwid.checkValidity()==false)
        {
            var widerr = doc.getElementById('ErroremailAddress');
            if(emlwid.value)
                widerr.innerHTML = '<b>!</b>'+curr.lang('Must be a valid email address');
            else
                widerr.innerHTML = '<b>!</b>'+curr.lang('This is a required question');
            widerr.style.display = 'block';
            invalids.push(emlwid);
        }
        section.items.forEach(function(itm, i){
            var widinp = doc.querySelector('#ff-id-'+itm.id+' input');
            if(itm.type=='PARAGRAPH_TEXT')
                widinp = doc.querySelector('#ff-id-'+itm.id+' textarea');
            else if(itm.type=='LIST')
            {
                widinp = doc.querySelector('#ff-id-'+itm.id+' select');
                if(!widinp)
                    widinp = doc.querySelector('#ff-id-'+itm.id+' input');
            }
            var reportError = function(msg)
            {
                invalids.push(widinp);
                var widerr = doc.getElementById('Error'+itm.id);
                if(widerr)
                {
                    widerr.innerHTML = '<b>!</b>'+msg;
                    widerr.style.display = 'block';
                }
            }
            var envalue;
            var valid = true;
            if(widinp)
            {
                if(widinp.readOnly)
                {
                    widinp.readOnly = false;
                    valid = widinp.checkValidity();
                    widinp.readOnly = true;
                }
                else
                    valid = widinp.checkValidity();
                envalue = frmdata.get(widinp.name);
            }
            if(valid==false)
            {
                if(itm.required && !envalue)
                {
                    reportError(curr.lang('This is a required question'));
                }
                else if(envalue)
                {
                    if(widinp.type=='email')
                        reportError(curr.lang('Must be a valid email address'));
                    else if(widinp.type=='date')
                        reportError(curr.lang('Invalid date'));
                    else if(widinp.type=='datetime-local')
                        reportError(curr.lang('Invalid date'));
                    else
                        reportError(curr.lang('Invalid input'));
                }
                else
                {
                    reportError(curr.lang('Invalid input'));
                }
            }
            else if(widinp && widinp.list && envalue && itm.choices)
            {
                var matches = itm.choices.filter(ch=>ch.value==envalue.trim());
                if(matches.length==0) reportError(curr.lang('Invalid answer. Clear & select a valid answer from the list'));
            }
            else
            {
                if(curr.data.facade && curr.data.facade.items)
                    itm.overwrite = curr.data.facade.items[itm.id];
                curr.validateEngine(itm, frmdata, reportError);
            }
        });
        if(invalids.length>0)
        {
            invalids[0].focus();
            this.scrollIntoView(invalids[0]);
        }
        return invalids.length;
    }

    this.getPairs = function(frm)
    {
        var pairs = {};
        var next, entry;
        var formData = frm?new FormData(frm):new FormData();
        var entries = formData.entries();
        while ((next = entries.next()) && next.done === false) 
        {
            entry = next.value;
            var val = pairs[entry[0]];
            if(val)
                val.push(entry[1]);
            else if(entry[1])
                pairs[entry[0]] = [entry[1]];
        }
        return pairs;
    }

    this.getNextSectionId = function(secid)
    {
        var sections = this.getSections();
        var fac = this.data.facade||{};
        var fcitms = fac.items||{};
        var valids = sections.filter(sec=>{
            var prds = sec.items.filter(itm=>itm.product);
            if(prds.length>0)
            {
                var stocked = prds.filter(prd=>{
                    var fitm = fcitms[prd.id]||{};
                    return fitm.mode=='hide'||(fitm.inventory=='yes'&&fitm.remain<=0)?false:true;
                });
                return stocked.length>0;
            }
            return true;
        });
        var idx = valids.findIndex(sec=>sec.id==secid);
        var nxt = valids[idx+1];
        if(nxt) return nxt.id;
        idx = sections.findIndex(sec=>sec.id==secid);
        nxt = sections[idx+1];
        if(nxt) return nxt.id;
        return secid;
    }

    this.gotoSection = function(frm={}, secid, deftrg)
    {
        var doc = this.getDocument();
        var trg;
        if(deftrg == 'back')
        {
            trg = this.draft.pageHistory.pop();
            var fac = this.data.facade||{};
            if(fac.neartail || fac.whatsapp)
            {
                this.draft.pageHistory.unshift(trg);
                this.draft.pageHistory.unshift(secid);
            }
        }
        else
        {
            this.saveDraft();
            var invalids = this.validate(frm, secid);
            if(invalids > 0) return;
            trg = deftrg?deftrg:this.getNextSectionId(secid);
            var items = this.data.scraped.items||{};
            doc.querySelectorAll('#ff-sec-'+secid+' .ff-nav-dyn').forEach(function(wid={},w){
                var navs = [];
                var fid = wid.id?wid.id.split('-').pop():null;
                var itm = items[fid]||{};
                var enval = frm['entry.'+itm.entry]||{};
                if(itm.choices) navs = itm.choices.filter(ch=>ch.value==enval.value);
                if(navs.length>0) trg = navs[0].navigateTo;
            });
            if(trg == -1)
                trg = secid;
            else if(trg == -2)
                trg = this.getNextSectionId(secid);
            else if(trg == -3)
                trg = 'ending';
        }
        this.jumptoSection(frm, secid, deftrg, trg);
    }

    this.directtoSection =function(trg, wid)
    {
        var frm = this.getContentElement().querySelector('form');
        var secid = this.draft.activePage||'root';
        this.jumptoSection(frm, secid, secid, trg, wid);
    }

    this.login = function(loggedin={})
    {
        var curr = this;
        if(!loggedin.sub) return;
        this.draft.consumerId = loggedin.sub;
        var {mapping} = this.data.facade||{};
        if(!mapping) mapping = {};
        var {items} = this.data.scraped||{};
        if(!items) items = {};
        var entries = this.draft.entry||{};
        var publishId = this.data.request.params.publishId;
        return fetch('/consumer/'+publishId+'/google/'+loggedin.sub, {
            method:'post', body:JSON.stringify(loggedin),
            headers:{accept:'application/json', 'content-type':'application/json'}
        }).then(response=>response.json()).then(function(consumer){
            for(var nm in consumer)
            {
                var val = consumer[nm];
                var iid = mapping[nm];
                var item = items[iid]||{};
                if(item.entry && val)
                {
                    var exval = entries[item.entry];
                    if(!exval) entries[item.entry] = val;
                }
            }
            curr.draft.entry = entries;
            curr.render();
            return curr.saveDraft();
        }).catch(err=>err);
    }

    this.jumptoSection = function(frm, secid, deftrg, trg, wid)
    {
        var curr = this;
        this.scrapeSection(this.getPageHistory());
        this.draft.activePage = trg;
        var {setting} = this.data.facade||{};
        var {loginpage} = setting||{};
        if(loginpage==trg && window.loadOneTap && !this.draft.consumerId)
            loadOneTap().then(loggedin=>curr.login(loggedin)).catch(err=>err);
        this.render();
        if(wid)
        {
            var elm = document.getElementById('ff-id-'+wid)||{};
            if(elm.scrollIntoView)
            {
                elm.scrollIntoView(true);
                var scrolledY = window.scrollY;
                window.scroll(0, scrolledY-80);
            }
        }
        else
        {
            this.scrollIntoView();
        }
        if(deftrg=='back') return;
        this.draft.pageHistory.push(secid);
        if(window.gtag) window.gtag('event', 'goto', {
            event_category:'formfacade',
            event_label:this.data.request.params.publishId+'-'+secid,
            value:this.draft.pageHistory.length
        });
    }

    this.scrollIntoView = function(elm)
    {
        if(!elm) elm = this.getContentElement()||{};
        if(elm.scrollIntoView)
        {
            elm.scrollIntoView(true);
            var scrolledY = window.scrollY;
            window.scroll(0, scrolledY-80);
        }
    }

    this.scrapeSection = function(pghistory)
    {
        var curr = this;
        //if(!curr.data.devEnv) return false;
        var elm = this.getContentElement();
        if(!elm) return Promise.resolve();
        var frm = elm.querySelector('form');
        var pairs = curr.getPairs(frm);
        var publishId = this.data.request.params.publishId;
        if(pghistory)
        {
            pairs.pageHistory = pghistory;
            pairs.continue = 1;
        }
        return this.sendData(pairs, '/nextSection/'+publishId).then(function(rs={}){
            if(!rs.images) return;
            if(!curr.data.form) curr.data.form = {};
            var imgs = curr.data.form.images;
            curr.data.form.images = Object.assign(imgs||{}, rs.images);
        }).catch(function(err){
            console.warn('nextSection failed with '+err);
        });
    }

    this.getPageHistory = function()
    {
        var curr = this;
        var secarr = [];
        var doc = this.getDocument();
        var secs = doc.querySelectorAll('.ff-section');
        secs.forEach(function(sec, s){
            var secid = sec.id.split('-').pop();
            var secjso = curr.data.scraped.items[secid];
            if(curr.draft.pageHistory.indexOf(secid)>=0 || curr.draft.activePage==secid)
                 secarr.push(secid=='ending'?'-3':s);
        });
        return secarr.join(',');
    }

    this.getDocument = function()
    {
        return document;
    }

    this.lang = function(txt, opt)
    {
        if(this.langtext && this.langtext[txt])
        {
            txt = this.langtext[txt];
        }
        if(txt && opt)
        {
            for(var nm in opt)
            {
                var vl = opt[nm];
                txt = txt.split('$'+nm).join(vl);
            }
        }
        return txt;
    }

    this.isMobile = function()
    {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    this.isIos = function()
    {
        return (/iphone|ipad|ipod/gi.test(navigator.userAgent)) || (navigator.userAgent.match(/iPad|Macintosh/i) !== null && 'ontouchend' in document);
    }

    this.isTestUser = function(userId)
    {
		return ['115950622256526421100','114565391771428289104','105242287939464144485', '111716875395075072856', '110010512446331946668'].indexOf(userId) > -1
	}

    this.uploadFile = function(fld, entry, widg)
    {
        var curr = this;
        var doc = curr.getDocument();
        var stf = doc.getElementById('Status'+fld);
        if(stf) stf.innerHTML = 'Uploading...';
        return new Promise(function(resolve, reject){
            var publishId = curr.data.request.params.publishId;
            var savedId = curr.draft&&curr.draft.savedId?curr.draft.savedId:'none';
            var url = 'https://formfacade.com/upload/'+publishId+'/'+savedId+'/'+entry;
            var formData = new FormData();
            formData.append('file', widg.files[0]);
            var http = new XMLHttpRequest();
            http.open('POST', url, true);
            http.onload = function()
            {
                try
                {
                    var jso = JSON.parse(http.response);
                    if(http.status==200)
                        resolve(jso);
                    if(http.status==201)
                        resolve(jso);
                    else if(http.status>=400)
                        reject(jso);
                }
                catch(err)
                {
                    reject(err);
                }
            }
            http.onerror = err=>reject(http.response||"Couldn't connect to server");
            http.send(formData);
        }).then(function(jso){
            curr.draft.savedId = jso.savedId;
            var hdn = doc.getElementById('Widget'+fld);
            if(hdn)
            {
                hdn.value = jso.file;
                hdn.dispatchEvent(new Event('change', {bubbles:true}));
            }
            if(stf) stf.innerHTML = jso.file.split('/').pop();
        });
    }

    this.getPaymentButtons = function()
    {
        var paybtns = [];
        if(!this.data.scraped.items)
            return paybtns;
        var fac = this.data.facade||{};
        var enh = fac.enhance||{};
        if(enh.closed=='on')
            return paybtns;
        var sbmt = fac.submit||{};
        for(var secid in sbmt)
        {
            var secbtn = sbmt[secid]||{};
            if(secbtn.payConfig=='peergateway')
            {
                secbtn.id = secid;
                paybtns.push(secbtn);
            }
            else if(secbtn.payConfig=='disabled')
            {
            }
            else if(secbtn.amountFrom)
            {
                secbtn.id = secid;
                paybtns.push(secbtn);
            }
        }
        return paybtns;
    }

    this.showPayment = function(frm, secid)
    {
        var invalids = this.validate(frm, secid);
        if(invalids > 0) return;
        this.draft.pageHistory.push(secid);
        var doc = this.getDocument();
        var elms = doc.querySelectorAll('#ff-submit-'+secid+' img');
        elms.forEach(elm=>elm.src = 'https://formfacade.com/img/loading.svg');
        var fac = this.data.facade?this.data.facade:{};
        var itms = this.data.scraped.items||{};
        var mapping = fac.mapping||{};
        var sbmt = fac.submit?fac.submit:{};
        var btn = sbmt[secid]||{};
        var itm;
        if(btn.amountFrom)
            itm = itms[btn.amountFrom];
        else if(mapping['net-amount'])
            itm = itms[mapping['net-amount']];
        else if(mapping.amount)
            itm = itms[mapping.amount];
        var amt = this.draft.entry[itm.entry];
        if(amt) this.draft.amount = amt;
        if(btn.payConfig=='peergateway' && btn.configId)
            this.showPeerPayment(secid, amt);
        else
            this.showCardPayment(secid, amt);
    }

    this.showPeerPayment = function(secid, amt)
    {
        var curr = this;
        this.draft.paymentStatus = 'initiated';
        this.saveDraft();
        this.draft.activePage = secid+'-pay';
        this.render();
        var doc = this.getDocument();
        var elm = doc.getElementById('ff-payment-form-'+secid);
        elm.innerHTML = '<h3>Loading...</h3>';
        var userId = this.data.request.params.userId;
        var peerhost = this.data.devEnv?'//localhost:3000': '//pay.peergateway.com';
        var scripts = [peerhost+'/js/pay/payment-forms.js?_=v8'];
        if(this.isTestUser(userId))
            scripts = [peerhost+'/js/pay_v1/payment-forms.js?_=v8'];
        Promise.resolve(window.PaymentForm||this.loadScripts(scripts)).then(_=>{
            var keyfields = {};
            ['name', 'email', 'phone', 'address'].forEach(attr=>{
                var iid = curr.data.facade.mapping[attr];
                var itm = iid?curr.data.scraped.items[iid]:null;
                keyfields[attr] = itm?curr.draft.entry[itm.entry]:null;
            });
            var {name, email, phone, address} = keyfields;
            var orderId = curr.draft.savedId;
            var trackingNumber = curr.draft.savedId+'*'+curr.draft.draftSeq;
            var billingDetails = {name, email, phone, orderId, address, trackingNumber};
            var stg = curr.data.facade.setting||{};
            var {currency, currencyCode} = stg;
            var sbmts = curr.data.facade.submit||{};
            var sbmt = sbmts[secid]||{};
            var params = {
                app:'neartail', userId:userId, configId:sbmt.configId,
                currency:currency, currencyCode:currencyCode, publishId: curr.data.request.params.publishId
            };
            window.paymentForm = new PaymentForm(params, {
                includeEJS: false,
                translate: curr.lang.bind(curr),
                walletSelectCallback: function(rs) {
                    var doc = curr.getDocument();
                    var publishId = curr.data.request.params.publishId;
                    var paydtelm = doc.getElementById('PaymentData'+publishId);
                    if(paydtelm) paydtelm.value = JSON.stringify(rs);
                    var rfrm = doc.getElementById('Publish'+publishId);
                    var note;
                    curr.draft.paymentStatus = (rs&&rs.status)||null;
                    var callback = function(rs){
                        curr.createCookie('ff-'+publishId, '', -1);
                        if(rs.submitSeq) note = curr.paddingWithZero(rs.submitSeq);
                        window.paymentForm.loadPeerGatewayWallets({note: note, orderId: curr.draft.savedId});
                        return new Promise(function(resolve, reject){
                            window.paymentConfirmPromise = resolve;
                        });
                    }
                    curr.submit(rfrm, secid, callback);
                },
                markAsPaidCallback: function(rs){
                    curr.draft.paymentStatus = 'paid not verified';
                    curr.savePayment();
                    window.paymentConfirmPromise && window.paymentConfirmPromise();
                },
                paymentCallback: function(rs){
                    var doc = curr.getDocument();
                    var publishId = curr.data.request.params.publishId;
                    var paydtelm = doc.getElementById('PaymentData'+publishId);
                    if(paydtelm) paydtelm.value = JSON.stringify(rs);
                    var payelm = doc.getElementById('Payment'+publishId);
                    if(payelm && rs.tid) payelm.value = rs.tid;
                    var rfrm = doc.getElementById('Publish'+publishId);
                    curr.draft.paymentStatus = rs.status||null;
                    curr.submit(rfrm, secid);
                }
            });
            window.paymentForm.init('#ff-payment-form-'+secid, amt, billingDetails);
        });
    }

    this.showCardPayment = function(secid, amt)
    {
        var curr = this;
        var baseurl = 'https://neartail.com';
        if(this.data.devEnv)
            baseurl = 'http://localhost:5000';
        var userId = this.data.request.params.userId;
        fetch(
            baseurl+"/payment/"+userId+"/intent/"+amt, 
            {method:"GET", headers:{"Content-Type":"application/json"}}
        ).then(function(result) {
            return result.json();
        }).then(function(data) {
            curr.paymentIntent = data;
            if(data.payment_method_types)
            {
                if(data.payment_method_types.length>1)
                {
                    curr.draft.activePage = secid+'-paylist';
                    curr.render();
                    //curr.showPaymentMethod(2, secid);
                }
                else
                {
                    curr.showPaymentMethod(0, secid);
                }
            }
            else
            {
                const cardDisplay = doc.getElementById('ff-card-element-'+secid);
                cardDisplay.innerHTML = '<b style="color:red">Payment not configured correctly</b>';
                const displayError = doc.getElementById('ff-card-errors-'+secid);
                displayError.innerHTML = data.error?data.error:'Unknown error';
            }
        });
    }

    this.showPaymentMethod = function(idx, secid)
    {
        var curr = this;
        var doc = this.getDocument();
        this.draft.activePage = secid+'-pay';
        this.render();
        var data = this.paymentIntent;
        var meth = data.payment_method_types[idx];
        paymentIntentClientSecret = data.clientSecret;
        var displayError = doc.getElementById('ff-card-errors-'+secid);
        var stripe = Stripe(data.publishableKey, {stripeAccount:data.accountID});
        var methopts = {payment_method:{billing_details:{}}};
        if(curr.data.facade.mapping)
        {
            var keyfields = {};
            ['name', 'email', 'phone', 'address'].forEach(attr=>{
                var iid = curr.data.facade.mapping[attr];
                var itm = iid?curr.data.scraped.items[iid]:null;
                keyfields[attr] = itm?curr.draft.entry[itm.entry]:null;
            });
            var {name, email, phone, address} = keyfields;
            //methopts.receipt_email = email;
            methopts.payment_method.billing_details = {name, email, phone};
            var track = curr.draft.savedId+'*'+curr.draft.draftSeq;
            methopts.shipping = {tracking_number:track, name:name||'-', address:{line1:address||'-'}};
        }
        var card;
        if(meth.mount)
        {
            var elements = stripe.elements();
            var style = {base:{color: "#32325d"}};
            card = elements.create(meth.mount, {style:style});
            card.mount("#ff-card-element-"+secid);
            card.on('change', ({error}) => {
              if(error) {
                displayError.textContent = error.message;
              } else {
                displayError.textContent = '';
              }
            });
            methopts.payment_method[meth.id] = card;
        }
        else
        {
            if(!methopts.payment_method.billing_details.name)
                methopts.payment_method.billing_details.name = 'neartail';
            var cardelm = doc.getElementById('ff-card-element-'+secid);
            if(cardelm) cardelm.style.display = 'none';
        }
        var payform = doc.getElementById('ff-payment-form-'+secid);
        payform.addEventListener('submit', function(ev) {
          ev.preventDefault();
          displayError.textContent = '';
          doc.querySelectorAll('#ff-pay-'+secid+' img').forEach(function(elm){
            elm.src = 'https://formfacade.com/img/loading.svg';
          });
          if(meth.flow=='redirect')
          {
            methopts.return_url = location.href.split('?')[0];
            curr.createCookie('ff-payment-section', secid, 1/24);
            curr.createCookie('ff-payment_intent_client_secret', paymentIntentClientSecret, 1/24);
            curr.draft.activePage = secid;
            curr.saveDraft();
          }
          stripe[meth.invoke](data.clientSecret, methopts).then(function(result){
            if(result.error)
            {
              displayError.innerHTML = result.error.message;
              doc.querySelectorAll('#ff-pay-'+secid+' img').forEach(function(elm){
                elm.src = 'https://formfacade.com/img/send.svg'; 
              });
            }
            else
            {
              if(result.paymentIntent && result.paymentIntent.status==='succeeded') 
              {
                var payelm = doc.getElementById('Payment'+curr.data.request.params.publishId);
                if(payelm) payelm.value = result.paymentIntent.id;
                var rfrm = doc.getElementById('Publish'+curr.data.request.params.publishId);
                curr.draft.activePage = null;
                doc.querySelectorAll('#ff-pay-'+secid+' img').forEach(function(elm){
                    elm.src = 'https://formfacade.com/img/loading.svg'; 
                });
                curr.submit(rfrm, secid);
              }
            }
          });
        });
    }
    
    this.showNavigation = function()
    {
        var overlay = document.getElementById('ff-addprd-overlay');
        overlay.classList.add('active');
        var popup = document.getElementById('ff-addprd-popup');
        popup.classList.add('active');
        popup.innerHTML = ejs.render(this.template.navigation, this);
        //document.body.style.overflowY = 'hidden';
    }

    this.closeNavigation = function()
    {
        //document.body.style.overflowY = 'auto';
        var overlay = document.getElementById('ff-addprd-overlay');
        overlay.classList.remove('active');
        var popup = document.getElementById('ff-addprd-popup');
        popup.classList.remove('active');
    }

    this.checkInventory = function(iid)
    {
        var curr = this;
        var fac = this.data.facade||{};
        var facitms = fac.items||{};
        var facitm = facitms[iid]||{};
        if(facitm.inventory=='yes')
        {
            var {publishId} = curr.data.request.params;
            return fetch('https://formfacade.firebaseio.com/facade/'+publishId+'-editable.json')
            .then(req=>req.json()).then(chfac=>{
                var chitm = chfac.items[iid]||{};
                curr.data.facade = chfac;
                curr.getSections(true);
                if(facitm.measure=='Configurable' && facitm.variants)
                {
                    var vrns = facitm.variants||{};
                    for(var vid in vrns)
                    {
                        var vrn = vrns[vid];
                        var chvrn = chitm.variants[vid];
                        if(chvrn.remain<vrn.remain) return true;
                    }
                }
                else if(facitm.measure=='Quantity' || facitm.measure=='Weight')
                {
                    return chitm.remain<facitm.remain;
                }
            });
        }
        else
        {
            return Promise.resolve(false);
        }
    }

    this.showProduct = function(iid)
    {
        var curr = this;
        this.product = {id:iid};
        var item = this.data.scraped.items[iid];
        if(item && item.type=='PARAGRAPH_TEXT')
        {
            var val = this.draft.entry?this.draft.entry[item.entry]:null;
            this.product.configurable = this.toConfigurable(val);
        }
        var overlay = document.getElementById('ff-addprd-overlay');
        overlay.classList.add('active');
        var popup = document.getElementById('ff-addprd-popup');
        popup.classList.add('active');
        popup.innerHTML = ejs.render(this.template.product, this);
        document.body.style.overflowY = 'hidden';
        this.checkInventory(iid).then(changed=>{
            if(changed) curr.showProduct(iid);
        });
    }

    this.addProduct = function(enid, val, close)
    {
        var vals = this.draft.entry[enid];
        vals = vals?(Array.isArray(vals)?vals:[vals]):[];
        vals = vals.concat(val);
        this.updateProduct(enid, vals, close);
    }

    this.removeProduct = function(enid, val, close)
    {
        var vals = this.draft.entry[enid];
        vals = vals?(Array.isArray(vals)?vals:[vals]):[];
        const idx = vals.indexOf(val);
        if(idx > -1) vals.splice(idx, 1);
        this.updateProduct(enid, vals, close);
    }

    this.updateProduct = function(enid, val, close)
    {
        if(enid)
        {
            if(val)
                this.draft.entry[enid] = val;
            else
                delete this.draft.entry[enid];
        }
        if(close)
            this.closePopup();
        else
            this.renderProduct();
    }

    this.renderProduct = function(vid)
    {
        var popup = document.getElementById('ff-addprd-popup');
        popup.innerHTML = ejs.render(this.template.product, this);
    }

    this.toConfigurable = function(val)
    {
        var configurable = {lineItem:{}, selected:null, page:'variant'};
        configurable.toValue = function(fcitm){
            var lns = [];
            var vmap = fcitm.variants;
            for(var vid in this.lineItem)
            {
                var qty = this.lineItem[vid];
                var vmeta = vmap?vmap[vid]:null;
                var nm = vmeta?vmeta.name:null;
                lns.push(nm+' | '+vid+' * '+qty);
            }
            return lns.join('\n');
        }
        var rws = val?val.split('\n'):[];
        rws.forEach(rw=>{
            var ln = rw.trim().split(' | ').pop();
            var [vid, qstr] = ln.trim().split(' * ');
            var qty = isNaN(qstr)?0:parseFloat(qstr);
            if(qty>0) configurable.lineItem[vid] = qty;
        });
        return configurable;
    }

    this.selectVariant = function(vid)
    {
        var cfg = this.product.configurable;
        cfg.selected = vid;
        cfg.page = 'quantity';
        this.renderProduct();
    }

    this.updateQuantity = function(vid, qty, close)
    {
        var item = this.data.scraped.items[this.product.id];
        var fcitm = this.data.facade.items[this.product.id];
        var cfg = this.product.configurable;
        if(qty)
            cfg.lineItem[vid] = qty;
        else
            delete cfg.lineItem[vid];
        if(close)
            this.updateProduct(item.entry, cfg.toValue(fcitm), close);
        else
            this.updateProduct(item.entry, cfg.toValue(fcitm), fcitm.multiselect!='yes');
    }

    this.showPopup = function(header, content, footer, opts={})
    {
        var overlay = document.getElementById('ff-addprd-overlay');
        overlay.classList.add('active');
        var popup = document.getElementById('ff-addprd-popup');
        popup.classList.add('active');
        popup.innerHTML = `
            <div class="ff-popup-header">
                <span class="ff-popup-title">${header}</span>
                <span class="material-icons" onclick="formFacade.closePopup(${opts.render?true:false})">close</span>
            </div>
            <div>
                <div class="ff-popup-content">
                    ${content}
                </div>
                <div class="ff-popup-footer">
                    ${footer||''}
                </div>
            </div>
        `;
        document.body.style.overflowY = 'hidden';
    }


    this.showWarning = function(title, err, footer, opts={})
    {
        var message = title;
        if(err)
        {
            if(typeof err==='string'||err instanceof String)
                message = err;
            else if(err instanceof Error)
                message = err.message;
            else
                message = JSON.stringify(err);
        }
        if(opts.ignorePopup != true){
            this.showPopup(
                `${title}`, 
                `<span style="color:red">âš  ${message}</span>`
            );
        }
        
        var {userId, publishId} = this.data.request.params;
        var {savedId} = this.draft||{};
        if(publishId && savedId)
        {
            var {form, title:formtitle} = this.data.scraped||{};
            const payload = new URLSearchParams();
            payload.append('title', title);
            payload.append('message', message);
            payload.append('form', form||formtitle);
            payload.append('critical', opts.critical);
            var baseurl = this.data.devEnv?'http://localhost:5000':'https://formfacade.com';
            var fetchurl = `${baseurl}/draft/${userId}/form/${publishId}/error/${savedId}`;
            fetch(fetchurl, {method:'POST', body:payload}).then(req=>req.json());
        }
    }

    this.showError = function(title, err, footer, opts={})
    {
        opts.critical = 1;
        this.showWarning(title, err, footer, opts);
    }

    this.closePopup = function(render=true)
    {
        document.body.style.overflowY = 'auto';
        var overlay = document.getElementById('ff-addprd-overlay');
        overlay.classList.remove('active');
        var popup = document.getElementById('ff-addprd-popup');
        popup.classList.remove('active');
        setTimeout(function(){
            if(render) formFacade.render();
            formFacade.saveDraft();
        }, 10);
    }

    this.slugify = function(string) 
    {
        if(!string) return '';
        return string.toString().trim().toLowerCase()
        .replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
    }

    this.paddingWithZero = function(number, size = 5) {
        number = parseInt(number)
        if (number.toString().length > size) return number;
        let s = "0000000" + number;
        return "ORD" + s.substr(s.length - size);
    }

    this.encode = function(text) {
        if(!text) return '';
        if(typeof window !== 'undefined')
            return window.btoa(text);
        else
            return Buffer.from(text).toString('base64');
    }

    this.getMinMaxDate = function(item, fitem) {
        var minDate = "1900-01-01";
        var maxDate = "2200-01-01";
        var date = new Date();
        var curDate = this.formatDate(new Date(), 'yyyy-MM-dd')
        var validation = fitem.validation
        if(validation && validation.validType == 'Date') {
            if(validation.validOperator == "Past")
                maxDate = curDate;
            else if(validation.validOperator == "Future")
                minDate = curDate;
            else if(validation.validOperator == "FutureLead") {
                var leadDate = this.addDays(new Date(), parseInt(validation.validValue||0));
                leadDate = this.formatDate(leadDate, 'yyyy-MM-dd')
                minDate = leadDate;
            } else if(validation.validOperator == "Between") {
                if(validation.validValue && validation.validValue.length == 10)
                    minDate = this.formatDate(new Date(validation.validValue), 'yyyy-MM-dd')
                if(validation.validValue2 && validation.validValue2.length == 10)
                    maxDate = this.formatDate(new Date(validation.validValue2), 'yyyy-MM-dd')
            }
        }
        if(item.time==1) {
            minDate += "T01:01";
            maxDate += "T23:59";
        }
        return [minDate, maxDate];
    }

    this.formatDate = function (x, y) {
        var z = { M: x.getMonth() + 1, d: x.getDate(), h: x.getHours(), m: x.getMinutes(), s: x.getSeconds() };
        y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
            return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
        });
        return y.replace(/(y+)/g, function(v) {
            return x.getFullYear().toString().slice(-v.length)
        });
    }

    this.addDays = function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    this.switchCDN = function(url)
    {
        if(url && url.indexOf('https://cdn.neartail.com/')==0)
            return 'https://cdn.formfacade.com/'+url.split('https://cdn.neartail.com/').pop();
        else if(url && url.indexOf('https://neartail.com/')==0)
            return 'https://formfacade.com/'+url.split('https://neartail.com/').pop();
        else
            return url;
    }

    this.switchAllCDN = function(text)
    {
        if(text && text.indexOf('https://cdn.neartail.com/') > -1) {
            return text.replaceAll('https://cdn.neartail.com/', 'https://cdn.formfacade.com/');
        } else {
            return text;
        }
    }
}



FormFacade.prototype.getExpiry = function(yyyymmdd)
	{
		if(yyyymmdd)
		{
			var yyyy = Math.floor(yyyymmdd/10000);
			var mmdd = yyyymmdd - yyyy*10000;
			var mm = Math.floor(mmdd/100);
			var dd = mmdd - mm*100;
			var expdt = new Date(yyyy, mm-1, dd);
			return expdt;
		}
		return null;
	}



FormFacade.prototype.isPaid = function(userId, usr)
	{
		if(usr && usr.paid)
		{
			if(usr.paid.expires)
			{
				var expdt = this.getExpiry(usr.paid.expires);
				if(new Date().getTime() > expdt.getTime())
					return false;
			}
			return true;
		}
		else
			return false;
	}



FormFacade.prototype.asSections = function(frm)
{
    var sitems = [];
    frm = frm?frm:{};
    var itms = frm.items?frm.items:{};
    for(var sid in itms)
    {
        var sitm = itms[sid];
        sitm.id = sid;
        sitems.push(sitm);
    }
    sitems.sort(function(a,b){ return a.index-b.index; });
    var section = {
        id:'root', items:[], headers:[],
        title:frm.title, description:frm.description,
        titleMark:frm.titleMark, helpMark:frm.helpMark
    };
    var sections = [section];
    sitems.forEach(function(sitem){
        if(sitem.type=='PAGE_BREAK')
        {
            sections[sections.length-1].next = sitem.navigateTo;
            section = {
                title:sitem.title, id:sitem.id, headers:[], items:[],
                titleMark:sitem.titleMark, helpMark:sitem.helpMark
            };
            if(sitem.help) section.description = sitem.help;
            sections.push(section);
        }
        else
        {
            sitem.section = section;
            section.items.push(sitem);
        }
    });
    sections.forEach((sec, s)=>{
        var header = {items:[]};
        sec.headers.push(header);
        sec.items.forEach(function(item, itmi){
            if(item.deleted) {

            }
            else if(item.type=='SECTION_HEADER')
            {
                header = {head:item, items:[]};
                sec.headers.push(header);
            }
            else
            {
                if(item.choices)
                {
                    var shortchs = item.choices.filter(ch=>String(ch.value||'').length<40);
                    item.wrap = item.choices.length>=8&&item.choices.length==shortchs.length;
                }
                header.items.push(item);
            }
        });
    });
    return sections;
}



FormFacade.prototype.validateEngine = function(itm, frmdata, reportError)
{
    var curr = this;
    var txtval = frmdata.get('entry.'+itm.entry);
    if(!itm.validType && itm.overwrite && itm.overwrite.validation && itm.overwrite.validation.validType) {
        Object.assign(itm, itm.overwrite.validation);
    }
	if(itm.type=='CHECKBOX')
    {
        var valarr = frmdata.getAll('entry.'+itm.entry);
        var valothr = frmdata.get('entry.'+itm.entry+'.other_option_response');
        var validothr = valothr?!valothr.trim():true;
        var validop = itm.validOperator;
        var validval = itm.validValue;
        if(isNaN(validval)==false)
            validval = parseInt(validval);
        var validmsg = itm.validMessage;
        if(itm.required && valarr.length==0)
        {
            reportError(curr.lang('This is a required question'));
        }
        else if(itm.required && valarr.length==1 && valarr[0]=='__other_option__' && validothr)
        {
            reportError(curr.lang('This is a required question'));
        }
        else if(validop=='Atmost' && valarr.length>validval)
        {
            if(!validmsg) validmsg = 'Must select at most '+validval+' options';
            reportError(validmsg);
        }
        else if(validop=='Atleast' && valarr.length<validval)
        {
            if(!validmsg) validmsg = 'Must select at least '+validval+' options';
            reportError(validmsg);
        }
        else if(validop=='Exactly' && valarr.length!=validval)
        {
            if(!validmsg) validmsg = 'Must select exactly '+validval+' options';
            reportError(validmsg);
        }
    }
    else if(itm.type=='MULTIPLE_CHOICE')
    {
        var valothr = frmdata.get('entry.'+itm.entry+'.other_option_response');
        var validothr = valothr?!valothr.trim():true;
        if(itm.required && txtval=='__other_option__' && validothr)
        {
            reportError(curr.lang('This is a required question'));
        }
    }
    else if(itm.type=='GRID')
    {
        if(itm.required)
        {
            itm.rows.forEach(function(rw, r){
                var valarr = frmdata.getAll('entry.'+rw.entry);
                if(valarr.length==0)
                {
                    validmsg = 'This question requires one response per row';
                    if(rw.multiple==1)
                        validmsg = 'This question requires at least one response per row';
                    validmsg = curr.lang(validmsg);
                    reportError(validmsg);
                }
            });
        }
        if(itm.onepercol)
        {
            var rwvals = {};
            itm.rows.forEach(function(rw, r){
                frmdata.getAll('entry.'+rw.entry).forEach(function(rwval){
                    if(rwvals[rwval])
                    {
                        validmsg = 'Please don\'t select more than one response per column';
                        validmsg = curr.lang(validmsg);
                        reportError(validmsg);
                    }
                    rwvals[rwval] = rw.entry;
                });
            });
        }
    }
    else if(itm.overwrite && itm.overwrite.type=='FILE_UPLOAD')
    {
        var fileval = frmdata.get('entry.'+itm.entry);
        var validmsg = itm.validMessage;
        if(itm.required && !fileval)
        {
            if(!validmsg) validmsg = curr.lang('This is a required question');
            reportError(validmsg);
        }
    }
    else if(txtval && (itm.type=='TEXT' ||  itm.type=='PARAGRAPH_TEXT'))
    {
        var validtyp = itm.validType;
        var validop = itm.validOperator;
        var validmsg = itm.validMessage;
        if(itm.validDynamic && itm.validEntryId)
        {
            var compTxtVal = frmdata.get('entry.'+itm.validEntryId);
            if(validtyp=='Number') {
                var compFltval; var fltval;
                if(isNaN(compTxtVal)==false)
                    compFltval = parseFloat(compTxtVal);
                if(isNaN(txtval)==false)
                    fltval = parseFloat(txtval);
                if(isNaN(txtval))
                    enmsg = 'Must be a number';
                else if(!compTxtVal || isNaN(compTxtVal))
                    enmsg = 'Comparison field must be a number';
                else if(validop=='GreaterThan' && fltval>compFltval==false)
                    enmsg = 'Must be a number greater than '+compFltval;
                else if(validop=='GreaterEqual' && fltval>=compFltval==false)
                    enmsg = 'Must be a number greater than or equal to '+compFltval;
                else if(validop=='LessThan' && fltval<compFltval==false)
                    enmsg = 'Must be a number less than '+compFltval;
                else if(validop=='LessEqual' && fltval<=compFltval==false)
                    enmsg = 'Must be a number less than or equal to '+compFltval;
                else if(validop=='EqualTo' && fltval!=compFltval)
                    enmsg = 'Must be a number equal to '+compFltval;
                else if(validop=='NotEqualTo' && fltval==compFltval)
                    enmsg = 'Must be a number not equal to '+compFltval;
                if(enmsg)
                {
                    reportError(validmsg?validmsg:enmsg);
                }
            } else if(validtyp=='Text') {
                var enmsg;
                var compTxtVal = frmdata.get('entry.'+itm.validEntryId);
                if(validop=='EqualTo' && txtval != compTxtVal)
                    enmsg = 'Must equal to '+itm.validValue;
                else if(validop=='NotEqualTo' && txtval == compTxtVal)
                    enmsg = 'Must not equal to '+itm.validValue;
                if(enmsg)
                {
                    reportError(validmsg?validmsg:enmsg);
                }

            }
        } else if(validtyp=='Number')
        {
            var enmsg;
            if(!itm.validValue)
                itm.validValue = 0;
            var fltval;
            if(isNaN(txtval)==false)
                fltval = parseFloat(txtval);
            var validval = itm.validValue;
            if(isNaN(validval)==false)
                validval = parseFloat(validval);
            if(isNaN(txtval))
                enmsg = 'Must be a number';
            else if(validop=='IsNumber' && isNaN(txtval))
                enmsg = 'Must be a number';
            else if(validop=='WholeNumber' && (isNaN(txtval) || txtval.indexOf('.')>=0))
                enmsg = 'Must be a whole number';
            else if(validop=='GreaterThan' && fltval>validval==false)
                enmsg = 'Must be a number greater than '+validval;
            else if(validop=='GreaterEqual' && fltval>=validval==false)
                enmsg = 'Must be a number greater than or equal to '+validval;
            else if(validop=='LessThan' && fltval<validval==false)
                enmsg = 'Must be a number less than '+validval;
            else if(validop=='LessEqual' && fltval<=validval==false)
                enmsg = 'Must be a number less than or equal to '+validval;
            else if(validop=='EqualTo' && fltval!=validval)
                enmsg = 'Must be a number equal to '+validval;
            else if(validop=='NotEqualTo' && fltval==validval)
                enmsg = 'Must be a number not equal to '+validval;
            else if(validop=='Between' && itm.validValue2 && (fltval<validval || fltval>parseFloat(itm.validValue2)))
                enmsg = 'Must be a number between '+itm.validValue+' and '+itm.validValue2;
            else if(validop=='NotBetween' && itm.validValue2 && (fltval>=validval && fltval<=parseFloat(itm.validValue2)))
                enmsg = 'Must be a number less than '+itm.validValue+' or greater than '+itm.validValue2;

            if(enmsg)
            {
                reportError(validmsg?validmsg:enmsg);
            }
        }
        else if(validtyp=='Text')
        {
            var enmsg;
            if(validop=='EqualTo' && txtval != itm.validValue)
                enmsg = 'Must equal to '+itm.validValue;
            else if(validop=='NotEqualTo' && txtval == itm.validValue)
                enmsg = 'Must not equal to '+itm.validValue;
            else if(validop=='Contains' && itm.validValue && (txtval.indexOf(itm.validValue)>=0)==false)
                enmsg = 'Must contain '+itm.validValue;
            else if(validop=='NotContains' && itm.validValue && (txtval.indexOf(itm.validValue)>=0))
                enmsg = 'Must not contain '+itm.validValue;
            else if(validop=='Email' && /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/.test(txtval)==false)
                enmsg = 'Must be an email';
            else if(validop=='URL' && /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(txtval)==false)
                enmsg = 'Must be a URL';
            if(enmsg)
            {
                reportError(validmsg?validmsg:enmsg);
            }
        }
        else if(itm.validValue && validtyp=='Regex')
        {
            var enmsg;
            if(!txtval) txtval = '';
            var regx = new RegExp(itm.validValue, 'g');
            if(validop=='Contains' && regx.test(txtval)==false)
                enmsg = 'Must contain '+itm.validValue;
            else if(validop=='NotContains' && regx.test(txtval))
                enmsg = 'Must not contain '+itm.validValue;
            else if(validop=='Matches')
            {
            	var mtrs = txtval.match(regx);
            	var validmt = mtrs&&mtrs.length==1&&mtrs[0]==txtval;
            	if(!validmt) enmsg = 'Must match '+itm.validValue;
            }
            else if(validop=='NotMatches' && txtval.match(regx))
            {
            	var mtrs = txtval.match(regx);
            	var validmt = mtrs&&mtrs.length==1&&mtrs[0]==txtval;
            	if(validmt) enmsg = 'Must not match '+itm.validValue;
            }
            if(enmsg)
            {
                reportError(validmsg?validmsg:enmsg);
            }
        }
        else if(validtyp=='Length')
        {
            var enmsg;
            if(!itm.validValue)
                itm.validValue = 0;
            if(validop=='MaxChar' && txtval.length>parseInt(itm.validValue))
                enmsg = 'Must be fewer than '+itm.validValue+' characters';
            else if(validop=='MinChar' && txtval.length<parseInt(itm.validValue))
                enmsg = 'Must be at least '+itm.validValue+' characters';
            if(enmsg)
            {
                reportError(validmsg?validmsg:enmsg);
            }
        }
    }
}



FormFacade.prototype.calculateEngine = function(tmpl, opts={})
{
	var curr = this;
    var citm = opts.calcfield;
    var config = this.config||{};
    var request = this.data.request||{};
    var scraped = this.data.scraped||{};
    var items = scraped.items||{};
    var draft = this.draft||{};
    var entr = draft.entry||{};
    var fac = this.data.facade||{};
    var fcitms = fac.items||{};
    var setting = fac.setting||{};
    var defcurrency = setting.currency||'$';
    var params = {
        ALL:'__all__', VISIBLE:'__all__', FULL:'__full__', 
        SECTION:'__section__', CATEGORY:'__category__', SYMBOL:defcurrency
    };
    var asNumber = function(itm, val)
    {
        var vl = new Number(isNaN(val)?0:parseFloat(val));
        vl.getMetadata = function(){ return itm; }
        return vl;
    }
    var asString = function(itm, val)
    {
        var vl = new String(val||'');
        vl.getMetadata = function(){ return itm; }
        vl.valueOf = function()
        {
            var cformat = citm?citm.format:null;
            if((itm.format || cformat) && isNaN(val)==false)
                return Number(val);
            else
                return val;
        }
        return vl;
    }
    var asArray = function(itm, val)
    {
        var vl = val||[];
        vl.getMetadata = function(){ return itm; }
        return vl;
    }
    var toDate = function(dt)
    {
        var fill = function(nm){ return nm<10?('0'+nm):nm; }
        var val = function(vl){
            if(vl.getMetadata && vl.getMetadata().time==1)
                return vl.getFullYear()+'-'+fill(vl.getMonth()+1)+'-'+fill(vl.getDate())+'T'+fill(vl.getHours())+':'+fill(vl.getMinutes())+':'+fill(vl.getSeconds());
            else
                return vl.getFullYear()+'-'+fill(vl.getMonth()+1)+'-'+fill(vl.getDate());
        }
        if(citm) dt.getMetadata = function(){ return citm; };
        dt.valueOf = function(){ return this.getTime(); }
        dt.toString = function(){ return val(this); }
        dt.format = function(){ return params.formatDate(this); }
        dt.add = function(vl, dur){ 
            var tm = this.getTime();
            if(!dur || dur=='days')
                return toDate(new Date(tm+vl*24*60*60*1000));
            else if(dur=='months')
                return toDate(new Date(this.getFullYear(), this.getMonth()+vl, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()));
            else if(dur=='years')
                return toDate(new Date(this.getFullYear()+vl, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()));
            else if(dur=='hours')
                return toDate(new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours()+vl, this.getMinutes(), this.getSeconds()));
            else if(dur=='minutes')
                return toDate(new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes()+vl, this.getSeconds()));
            else if(dur=='seconds')
                return toDate(new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()+vl));
            return vl;
        }
        dt.subtract = function(vl, dur){ 
            var tm = this.getTime();
            if(!dur || dur=='days')
                return toDate(new Date(tm-vl*24*60*60*1000));
            else if(dur=='months')
                return toDate(new Date(this.getFullYear(), this.getMonth()-vl, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()));
            else if(dur=='years')
                return toDate(new Date(this.getFullYear()-vl, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()));
            else if(dur=='hours')
                return toDate(new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours()-vl, this.getMinutes(), this.getSeconds()));
            else if(dur=='minutes')
                return toDate(new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes()-vl, this.getSeconds()));
            else if(dur=='seconds')
                return toDate(new Date(this.getFullYear(), this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds()-vl));
            return vl;
        }
        dt.diff = function(vl, dur){
            if(!dur || dur=='days')
                return params.DATEDIF(vl, dt, 'D');
            else if(dur=='months')
                return params.DATEDIF(vl, dt, 'M');
            else if(dur=='years')
                return params.DATEDIF(vl, dt, 'Y');
            else if(dur=='hours')
                return params.DATEDIF(vl, dt, 'h');
            else if(dur=='minutes')
                return params.DATEDIF(vl, dt, 'm');
            else if(dur=='seconds')
                return params.DATEDIF(vl, dt, 's');
        }
        dt.year = function(){ return this.getFullYear(); }
        dt.month = function(){ return this.getMonth()+1; }
        dt.date = function(){ return this.getDate(); }
        dt.day = function(){ return this.getDay()+1; }
        return dt;
    }
    var asDate = function(itm, date)
    {
        if(date.add)
            return date;
        else
        {
            var vl;
            if(date instanceof Date)
                vl = toDate(date);
            else
            {
                vl = new String(date?date:'');
                var b = vl.split(/\D/);
                var dt = new Date();
                if(b.length>=3)
                {
                    b[1] = b[1]-1;
                    dt = new Date(...b);
                }
                vl = toDate(dt);
            }
            vl.getMetadata = function(){ return itm; }
            return vl;
        }
    }
    var encode = function(text) {
        if(!text) return '';
        if(typeof window !== 'undefined')
            return window.btoa(text);
        else
            return Buffer.from(text).toString('base64');
    }
    var secs =  curr.getSections();
    secs.forEach(function(sec, s){
        sec.items.forEach(function(pitem, i){
            var pval = entr[pitem.entry];
            if(pitem.entry)
            {
                if(pitem.type=='CHECKBOX')
                {
                    if(!pval) pval = [];
                    pval = Array.isArray(pval)?pval:[pval];
                    pval = pval.map(function(pv){
                        if(pv=='__other_option__')
                            return entr[pitem.entry+'-other_option_response'];
                        else
                            return pv;
                    });
                    params['entry'+pitem.entry] = asArray(pitem, pval);
                }
                else if(pitem.type=='MULTIPLE_CHOICE')
                {
                    if(pval=='__other_option__')
                        pval = entr[pitem.entry+'-other_option_response'];
                    params['entry'+pitem.entry] = asString(pitem, pval?pval:'');
                }
                else if(pitem.type=='GRID')
                {
                    var gval = [];
                    var rws = pitem.rows?pitem.rows:[];
                    rws.forEach(function(rw, rwi){
                        var val = entr[rw.entry];
                        if(rw.multiple)
                        {
                            val = val?(Array.isArray(val)?val:[val]):[];
                        }
                        else
                        {
                            val = val?val:null;
                        }
                        gval.push(val);
                    });
                    params['entry'+pitem.entry] = asArray(pitem, gval);
                }
                else if(pitem.validType=='Number' || pitem.type=='SCALE')
                {
                    if(!pval) pval = 0;
                    params['entry'+pitem.entry] = asNumber(pitem, pval);
                }
                else if(pitem.type=='DATE')
                {
                    if(!pval) pval = new Date(0);
                    params['entry'+pitem.entry] = asDate(pitem, pval);
                }
                else
                {
                    params['entry'+pitem.entry] = asString(pitem, pval?pval:'');
                }
            }
        });
    });
    var mapping = fac.mapping||{};
    for(var attr in mapping)
    {
        var iid = mapping[attr];
        var itm = items[iid]||{};
        var varname = attr.split('-').join('');
        if(attr=='score') varname = 'totalscore';
        params[varname] = params['entry'+itm.entry]||'';
    }
    params.setContext = function(ctx)
    {
        curr = ctx;
        items = ctx.data.scraped?ctx.data.scraped.items:{};
        fac = ctx.data.facade?ctx.data.facade:{};
        fcitms = fac&&fac.items?fac.items:{};
        defcurrency = fac.setting&&fac.setting.currency?fac.setting.currency:'$';
        entr = ctx.draft&&ctx.draft.entry?ctx.draft.entry:{};
    }
    params.grid = params.GRID = function(val, x, y)
    {
        var selval = val;
        if(x)
        {
            selval = val[x-1];
            if(y)
                selval = selval[y-1];
        }
        return selval;
    }
    params.num = params.NUM = function(val)
    {
        if(val)
        {
            if(isNaN(val)==false)
                return Number(val);
        }
        return 0;
    }
    params.sum = params.SUM = function()
    {
        var total = 0;
        var args = Array.prototype.slice.call(arguments);
        args.map(arg=>{
            total = total + params.NUM(arg);
        });
        return total;
    }
    params.round = params.ROUND = function(val, deci=2)
    {
        val = val + Number.EPSILON;
        var base = 10**deci;
        return Math.round(val * base) / base;
    }
    params.rounddown = params.ROUNDDOWN = num=>Math.floor(num);
    params.roundup = params.ROUNDUP = num=>Math.ceil(num);
    params.remainder = params.REMAINDER = (a,b)=>Math.round(a%b*1000000)/1000000;
    params.max = params.MAX = function(){ return Math.max.apply(null, arguments); }
    params.min = params.MIN = function(){ return Math.min.apply(null, arguments); }
    params.pretty = params.PRETTY = function()
    {
        var args = Array.prototype.slice.call(arguments);
        var fargs = args.filter(function(ar){ return ar; });
        return fargs.join('<br>');
    }
    params.ifs = params.IFS = function()
    {
        var args = Array.prototype.slice.call(arguments);
        var lst;
        if(args.length%2==1)
            lst = args.pop();
        for(var i=0; i <args.length; i+=2) 
        {
            if(args[i]) return args[i+1];
        }
        if(lst==0)
            return lst;
        else
            return lst?lst:'';
    }
    var getOrderItems = function(currency, all=true)
    {
        var itms = [];
        var secs =  curr.getSections();
        secs.map(function(sec){
            var match = false;
            if(all==true)
            {
                match = true;
            }
            else if(citm)
            {
                sec.items.forEach(function(item, itmi){
                    if(citm.id==item.id) match = true;
                });
            }
            if(match) itms = itms.concat(sec.items);
        });
        var selitms = [];
        itms.forEach(function(item, itmi){
            if(currency==true)
            {
                selitms.push(item);
            }
            else if(item.type=='TEXT' || item.type=='LIST' || item.type=='MULTIPLE_CHOICE' || item.type=='SCALE' || item.type=='GRID')
            {
                if(item.help && item.help.indexOf(currency)>=0)
                    selitms.push(item);
            }
        });
        return selitms;
    }
    params.price = params.PRICE = function(val, currency)
    {
        if(!currency) currency = defcurrency;
        if(val)
        {
            val = Array.isArray(val)?val:[val];
            if(val.length==0) return 0;
            return val.map(function(txt){
                if(!txt || !txt.split) return 0;
                var txts = txt.split(currency);
                if(txts.length>1)
                {
                    var amtstr = txts[txts.length-1];
                    amtstr = amtstr.trim();
                    if(isNaN(amtstr.charAt(0)))
                    {
                        amtstr = txts[txts.length-2];
                        var amtlastchar = amtstr.charAt(amtstr.length-1);
                        if(isNaN(amtlastchar))
                            amtstr = txts.join('');
                        else
                        {
                            var amtarr = amtstr.trim().split(/[^0-9.,]/g);
                            amtstr = amtarr[amtarr.length-1];
                        }
                    }
                    if(currency=='â‚¬' || currency=='Rp')
                        amtstr = amtstr.split(',').map(prt=>prt.split('.').join('')).join('.');
                    else if(currency=='R')
                        amtstr = amtstr.split(',').join('.').split(' ').join('');
                    else
                        amtstr = amtstr.split(',').join('');
                    amtstr = amtstr.trim().split(/[^0-9.]/g)[0];
                    if(amtstr && isNaN(amtstr)==false)
                    {
                        return Number(amtstr);
                    }
                    else
                    {
                        amtstr = txts[0];
                        amtstr = amtstr.trim().split(' ').pop();
                        if(currency=='â‚¬' || currency=='Rp')
                            amtstr = amtstr.split(',').map(prt=>prt.split('.').join('')).join('.');
                        else
                            amtstr = amtstr.split(',').join('');
                        if(amtstr && isNaN(amtstr)==false)
                            return Number(amtstr);
                    }
                }
                return 0;
            }).reduce(function(a,b){
                return a+b; 
            });
        }
        return 0;
    }
    params.amount = params.AMOUNT = function(currency, all=true)
    {
        if(!currency) currency = defcurrency;
        var tot = 0;
        var itms = getOrderItems(currency, all);
        itms.forEach(function(item, itmi){
            var amt = 0;
            if(item.help && item.help.indexOf(currency)>=0)
            {
                var amtstr = item.help.split(currency).pop();
                if(currency=='â‚¬')
                    amtstr = amtstr.split(',').join('.');
                amtstr = amtstr.trim().split(/[^0-9.]/g)[0];
                if(isNaN(amtstr)==false)
                    amt = Number(amtstr);
            }
            var qnt = 0;
            if(item.type=='GRID' || item.type=='CHECKBOX')
            {
                var mval = params['entry'+item.entry];
                //qnt = params.score(mval);
            }
            else
            {
                var qntstr = entr[item.entry];
                if(qntstr && isNaN(qntstr)==false)
                    qnt = Number(qntstr);
            }
            if(amt && qnt) tot += amt*qnt;
        });
        return tot.toFixed(2);
    }
    params.quantityin = params.QUANTITYIN = ctg=>params.QUANTITY(null, ctg)
    params.quantity = params.QUANTITY = function(currency, ctg)
    {
        if(!currency) currency = defcurrency;
        var totqnt = 0;
        var secs =  curr.getSections();
        if(ctg) secs = secs.filter(sec=>sec.title==ctg);
        secs.forEach(function(sec, s){
            sec.items.forEach(function(item, i){
                var fitm = fcitms[item.id]||{};
                var amt = params.PRICE(item.help, currency);
                if(item.id==mapping.service)
                {
                    var srvstr = entr[item.entry];
                    var srv = srvstr&&isNaN(srvstr)==false?Number(srvstr):0;
                    if(srv) totqnt += 1;
                }
                else if(item.type=='TEXT')
                {
                    var qntstr = entr[item.entry];
                    var qnt = qntstr&&isNaN(qntstr)==false?Number(qntstr):0;
                    if(amt && qnt) totqnt += qnt;
                }
                else if(item.type=='LIST' || item.type=='MULTIPLE_CHOICE' || item.type=='SCALE')
                {
                    if(amt>0)
                    {
                        var qntstr = entr[item.entry];
                        var qnt = qntstr?(isNaN(qntstr)==false?Number(qntstr):1):0;
                        if(amt && qnt) totqnt += qnt;
                    }
                    else
                    {
                        var amtstr = entr[item.entry];
                        amt = params.PRICE(amtstr, currency);
                        if(amt>0) totqnt += 1;
                    }
                }
                else if(item.type=='CHECKBOX')
                {
                    if(amt>0)
                    {
                        var qntstrs = entr[item.entry];
                        qntstrs = Array.isArray(qntstrs)?qntstrs:[qntstrs];
                        qntstrs.forEach(function(qntstr){
                            var qnt = qntstr?(isNaN(qntstr)==false?Number(qntstr):1):0;
                            if(amt && qnt) totqnt += qnt;
                        });
                    }
                    else
                    {
                        var val = entr[item.entry];
                        var vlamt = params.PRICE(val, currency);
                        if(vlamt && vlamt>0)
                        {
                            var qntstrs = Array.isArray(val)?val:[val];
                            totqnt += qntstrs.length;
                        }
                    }
                }
                else if(item.type=='PARAGRAPH_TEXT' && fitm.measure=='Configurable')
                {
                    var val = entr[item.entry];
                    var rws = val?val.split('\n'):[];
                    rws.forEach(rw=>{
                        var splt = rw.trim().split(' | ');
                        var ln = splt.pop();
                        var [vid, qstr] = ln.trim().split(' * ');
                        var qnt = isNaN(qstr)?0:parseFloat(qstr);
                        totqnt += qnt;
                    });
                }
                else if(item.type=='GRID')
                {
                    var rws = item.rows?item.rows:[];
                    rws.forEach(function(rw, rwi){
                        var valmap = {};
                        var val = entr[rw.entry];
                        val = Array.isArray(val)?val:[val];
                        val.forEach(function(vl){ valmap[vl] = vl; });
                        item.choices.forEach(function(ch, chi){
                            if(ch && valmap[ch.value])
                            {
                                if(amt>0)
                                {
                                    var qnt = ch.value?(isNaN(ch.value)==false?Number(ch.value):1):0;
                                    totqnt += qnt;
                                }
                                else
                                {
                                    var rwamt = params.PRICE(rw.value, currency);
                                    if(rwamt>0)
                                    {
                                        var qnt = ch.value?(isNaN(ch.value)==false?Number(ch.value):1):0;
                                        totqnt += qnt;
                                    }
                                } 
                            }
                        });
                    });
                }
            });
        });
        return totqnt;
    }
    params.total = params.TOTAL = params.amt = params.AMT = function(currency)
    {
        if(!currency) currency = defcurrency;
        var tot = 0;
        for(var itemId in items)
        {
            var item = items[itemId];
            var fitm = fcitms[itemId];
            var amt = params.PRICE(item.help, currency);
            if(item.id==mapping.service)
            {
                var srvstr = entr[item.entry];
                var srv = srvstr&&isNaN(srvstr)==false?Number(srvstr):0;
                if(srv) tot += srv;
            }
            else if(item.type=='TEXT')
            {
                var qntstr = entr[item.entry];
                var qnt = qntstr&&isNaN(qntstr)==false?Number(qntstr):0;
                if(amt && qnt) tot += amt*qnt;
            }
            else if(item.type=='LIST' || item.type=='MULTIPLE_CHOICE' || item.type=='SCALE')
            {
                if(fitm && fitm.discounted)
                {
                    var selstr = entr[item.entry];
                    fitm.choices.forEach((ch,c)=>{
                        if(ch==selstr)
                        {
                            var disc = fitm.discounted[c];
                            tot += disc?Number(disc):amt*ch;
                        }
                    })
                }
                else if(amt>0)
                {
                    var qntstr = entr[item.entry];
                    var qnt = qntstr?(isNaN(qntstr)==false?Number(qntstr):1):0;
                    if(amt && qnt) tot += amt*qnt;
                }
                else
                {
                    var amtstr = entr[item.entry];
                    amt = params.PRICE(amtstr, currency);
                    if(amt>0) tot += amt;
                }
            }
            else if(item.type=='PARAGRAPH_TEXT')
            {
                var cfgstr = entr[item.entry];
                if(fitm && fitm.measure=='Configurable' && cfgstr)
                {
                    var rws = cfgstr?cfgstr.split('\n'):[];
                    rws.forEach(rw=>{
                        var ln = rw.trim().split(' | ').pop();
                        var [vid, qstr] = ln.trim().split(' * ');
                        var vrn = fitm.variants?fitm.variants[vid]:null;
                        if(vrn&&vrn.price) amt = parseFloat(vrn.price);
                        var qnt = isNaN(qstr)?0:parseFloat(qstr);
                        if(qnt>0) tot += amt*qnt;
                    });
                }
            }
            else if(item.type=='CHECKBOX')
            {
                if(amt>0)
                {
                    var qntstrs = entr[item.entry];
                    qntstrs = Array.isArray(qntstrs)?qntstrs:[qntstrs];
                    qntstrs.forEach(function(qntstr){
                        var qnt = qntstr?(isNaN(qntstr)==false?Number(qntstr):1):0;
                        if(amt && qnt) tot += amt*qnt;
                    });
                }
                else
                {
                    var val = entr[item.entry];
                    var vlamt = params.PRICE(val, currency);
                    tot += vlamt;
                }
            }
            else if(item.type=='GRID')
            {
                var rws = item.rows?item.rows:[];
                rws.forEach(function(rw, rwi){
                    var valmap = {};
                    var val = entr[rw.entry];
                    val = Array.isArray(val)?val:[val];
                    val.forEach(function(vl){ valmap[vl] = vl; });
                    item.choices.forEach(function(ch, chi){
                        if(ch && valmap[ch.value])
                        {
                            if(amt>0)
                            {
                                var qnt = ch.value?(isNaN(ch.value)==false?Number(ch.value):1):0;
                                tot += amt*qnt;
                            }
                            else
                            {
                                var rwamt = params.PRICE(rw.value, currency);
                                if(rwamt>0)
                                {
                                    var qnt = ch.value?(isNaN(ch.value)==false?Number(ch.value):1):0;
                                    tot += rwamt*qnt;
                                }
                            } 
                        }
                    });
                });
            }
        }
        if(citm)
        {
            citm.format = function(txtamt){
                return params.FORMAT(txtamt, currency);
            }
        }
        tot = Math.round((tot + Number.EPSILON) * 100) / 100;
        return tot;
    }
    params.totalin = params.TOTALIN = function(sectitle)
    {
        var tot = 0;
        if(setting.currency)
        {
            var lines = params.getBill();
            lines.forEach(line=>{
                var [title, price, quantity, id, entry, amount, section] = line;
                if(sectitle && sectitle==section)
                    tot = tot + price*quantity;
                else if(citm && citm.section && citm.section.title==section)
                    tot = tot + price*quantity;
            });
            if(citm)
            {
                citm.format = function(txtamt){
                    return params.FORMAT(txtamt, setting.currency);
                }
            }
            tot = Math.round((tot + Number.EPSILON) * 100) / 100;
        }
        return tot;
    }
    params.html = params.HTML = val=>val?val.split('\n').join('<br>'):'';
    params.format = params.FORMAT = function(txtamt, currency)
    {
        if(!currency) currency = defcurrency;
        if(txtamt && txtamt instanceof Date)
        {
            var dt = toDate(txtamt);
            return params.formatDate(dt);
        }
        else if(isNaN(txtamt)==false)
        {
            var numamt = Number(txtamt);
            var neg = '';
            if(numamt<0)
            {
                neg = '-';
                numamt = numamt*-1;
            }
            var options = {minimumFractionDigits:2, maximumFractionDigits:2};
            if(numamt-Math.floor(numamt)==0 && numamt>=1000) options = {};
            if(currency=='\uD83D\uDCB0') options = {};
            var amtstr = Number(numamt).toLocaleString('en', options);
            if(currency.trim()=='â‚¬' || currency.trim()=='Rp')
            {
                amtstr = amtstr.split('.').map(prt=>prt.split(',').join('.')).join(',');
                if(currency.trim()=='â‚¬')
                    return neg+amtstr+currency;
                else
                    return neg+currency+amtstr;
            }
            else if(currency.trim()=='R')
            {
                amtstr = amtstr.split(',').join(' ').split('.').join(',');
                return neg+currency+amtstr;
            }
            else if(currency.trim()=='kn')
            {
                return neg+amtstr+' '+currency.trim();
            }
            else if(currency.trim()=='\uD83D\uDCB0')
            {
                return neg+amtstr+' '+currency.trim();
            }
            else if(currency.trim()=='CHF')
            {
                return neg+currency+' '+amtstr;
            }
            else
            {
                return neg+currency+amtstr;
            }
        }
        return txtamt;
    }
    params.currency = params.CURRENCY = function(currency, txtamt)
    {
        if(!currency) currency = defcurrency;
        if(citm)
        {
            citm.format = function(txtamt){
                return params.format(txtamt, currency);
            }
            return txtamt;
        }
        else
        {
            return params.format(txtamt, currency);
        }
    }
    var findText = function(val, pattern='$')
    {
        if(val)
        {
            val = Array.isArray(val)?val:[val];
            var matches = 0;
            val.map(function(txt){
                if(isNaN(txt)==true && txt.indexOf && txt.indexOf(pattern)>=0)
                {
                    matches = matches + 1;
                }
            });
            return matches>0;
        }
        return false;
    }
    var filterItems = function(pattern='$', scope=true)
    {
        var itms = [];
        secs.forEach(function(sec, s){
            sec.items.forEach(function(pitem, i){
                var pval = params['entry'+pitem.entry];
                var scoped = false;
                if(citm && citm.id==pitem.id)
                {
                    scoped = false;
                }
                else if(scope==true || scope==params.VISIBLE || scope==params.FULL)
                {
                    scoped = true;
                }
                else if(scope==params.SECTION)
                {
                    if(citm && citm.section && citm.section.id==sec.id)
                        scoped = true;
                }
                else if(scope.getMetadata)
                {
                    var ameta = scope.getMetadata();
                    if(ameta && ameta.id==pitem.id)
                        scoped = true;
                }
                var matched = false;
                if(scoped)
                {
                    var exclude = false;
                    if(pitem.logic)
                    {
                        if(pitem.logic.mode=='hide')
                        {
                            if(scope==params.FULL)
                                exclude = false;
                            else
                                exclude = true;
                        }
                        else if(pitem.logic.calculated)
                        {
                            var funcname = pitem.logic.calculated.split('(')[0];
                            funcname = funcname.toLowerCase().trim();
                            if(funcname=='${textsummary') exclude = true;
                        }
                    }
                    if(exclude==true)
                    {
                        matched = false;
                    }
                    else if(pattern==true)
                    {
                        matched = true;
                    }
                    else
                    {
                        var nval = findText(pitem.help, pattern);
                        if(nval>0)
                        {
                            matched = true;
                        }
                        else
                        {
                            nval = findText(pval, pattern);
                            if(nval>0)
                                matched = true;
                            else if(pitem.type=='GRID' && pitem.rows)
                            {
                                var prcrows = pitem.rows.filter(function(rw){
                                    return findText(rw.value, pattern)>0;
                                });
                                if(prcrows.length==pitem.rows.length)
                                    matched = true;
                            }
                        }
                    }
                }
                if(matched) itms.push(pitem);
            });
        });
        return itms;
    }
    params.textsummary = params.TEXTSUMMARY = function(pattern, all=true, wa='')
    {
        if(!pattern) pattern = '$';
        var itms = filterItems(pattern, all);
        var valitms = [];
        if(entr.emailAddress)
        {
            var ln = wa+'Email:'+wa+' '+entr.emailAddress;
            valitms.push(ln);
        }
        itms.forEach(function(item, itmi){
            var fitm = fcitms[item.id]||{};
            var enval = params['entry'+item.entry];
            var val = enval;
            if(val && val==0) val = null;
            if(val && val.length==0) val = null;
            if(item.type=='DATE' && val=='1970-01-01') val = null;
            if(item.type=='DATE' && val=='1970-01-01T01:00:00') val = null;
            if(fitm.encrypt && val) val = '******';
            if(citm && citm.id==item.id){}
            else if(item.type=='GRID' && val)
            {
                var valids = val?val.filter(function(vl){ return vl&&vl.length>0; }):[];
                if(valids.length>0)
                {
                    if(item.title)
                        valitms.push(item.title);
                    item.rows.forEach(function(rw, r){
                        var rvals = val[r];
                        if(rvals && rvals.length==0) rvals = null;
                        if(rvals)
                        {
                            rvals = Array.isArray(rvals)?rvals:[rvals];
                            var ln = wa+rw.value+':'+wa+' '+rvals.join(', ');
                            valitms.push(ln);
                        }
                    });
                }
            }
            else if(item.type=='PARAGRAPH_TEXT' && fitm.measure=='Configurable' && val)
            {
                if(item.title) valitms.push(wa+item.title+wa);
                var rws = val?val.split('\n'):[];
                rws.forEach(rw=>{
                    var splt = rw.trim().split(' | ');
                    var ln = splt.pop();
                    var [vid, qnt] = ln.trim().split(' * ');
                    if(vid && qnt) valitms.push(wa+splt.join(' | ')+':'+wa+' '+qnt);
                });
            }
            else if(!item.product && item.type=='LIST' && enval=='0')
            {
                var ln = wa+item.title+':'+wa+' '+enval;
                valitms.push(ln);
            }
            else if(val && val instanceof Date)
            {
                var ln = wa+item.title+':'+wa+' '+params.formatDate(val);
                valitms.push(ln);
            }
            else if(val)
            {
                var ln = wa+item.title+':'+wa+' ';
                if(fitm.measure=='Weight')
                {
                    var unit = setting.currencyCode=='USD'?'lbs':'kg';
                    ln = wa+item.title+' ('+unit+'):'+wa+' ';
                }
                if(item.format)
                    ln += item.format(val);
                else
                    ln += Array.isArray(val)?val.join(', '):val;
                valitms.push(ln);
            }
        });
        return valitms.join('\r\n');
    }
    params.getSummaryRows = function(pattern, all=true)
    {
        if(!pattern) pattern = '$';
        var itms = filterItems(pattern, all);
        var valitms = [];
        if(entr.emailAddress)
        {
            var ln = '<tr><td>Email:</td><td>'+entr.emailAddress+'</td></tr>';
            valitms.push(ln);
        }
        itms.forEach(function(item, itmi){
            var fitm = fcitms[item.id]||{};
            var val = params['entry'+item.entry];
            if(val && val.length==0) val = null;
            if(val && val==0) val = null;
            if(item.type=='DATE' && val=='1970-01-01') val = null;
            if(item.type=='DATE' && val=='1970-01-01T01:00:00') val = null;
            if(fitm.encrypt && val) val = '******';
            if(item.type=='GRID' && val)
            {
                var valids = val?val.filter(function(vl){ return vl&&vl.length>0; }):[];
                if(valids.length>0)
                {
                    if(item.title)
                        valitms.push('<tr><td colspan="2">'+item.title+'</td></tr>');
                    item.rows.forEach(function(rw, r){
                        var rvals = val[r]
                        if(rvals && rvals.length==0) rvals = null;
                        if(rvals)
                        {
                            rvals = Array.isArray(rvals)?rvals:[rvals];
                            valitms.push('<tr><td>'+rw.value+':</td><td>'+rvals.join(', ')+'</td></tr>');
                        }
                    });
                }
            }
            else if(item.type=='PARAGRAPH_TEXT' && val)
            {
                if(fitm.measure=='Configurable')
                {
                    valitms.push('<tr><td colspan="2">'+item.title+'</td></tr>');
                    var rws = val?val.split('\n'):[];
                    rws.forEach(rw=>{
                        var splt = rw.trim().split(' | ');
                        var ln = splt.pop();
                        var [vid, qnt] = ln.trim().split(' * ');
                        if(vid && qnt) valitms.push('<tr><td>'+splt.join(' | ')+':</td><td>'+qnt+'</td></tr>');
                    });
                }
                else
                {
                    var ln = '<tr><td>'+item.title+':</td>';
                    ln += '<td>'+val.split('\n').join('<br>')+'</td></tr>';
                    valitms.push(ln);
                }
            }
            else if(val && val instanceof Date)
            {
                var ln = '<tr><td>'+item.title+':</td>';
                ln += '<td>'+params.formatDate(val)+'</td></tr>';
                valitms.push(ln);
            }
            else if(val && fitm.subtype == 'SIGNATURE')
            {
                var ln = '<tr><td>'+item.title+':</td>';
                ln += '<td><img src="'+val+'"/></td></tr>';
                valitms.push(ln);
            }
            else if(val)
            {
                var ln = '<tr><td>'+item.title+':</td> ';
                if(fitm.measure=='Weight')
                {
                    var unit = setting.currencyCode=='USD'?'lbs':'kg';
                    ln = '<tr><td>'+item.title+' ('+unit+'):</td> ';
                }
                if(item.format)
                    ln += '<td>'+item.format(val)+'</td></tr>';
                else
                    ln += '<td>'+(Array.isArray(val)?val.join(', '):val)+'</td></tr>';
                valitms.push(ln);
            }
        });
        return valitms;
    }
    params.summary = params.SUMMARY = function(pattern, all=true)
    {
        var valitms = params.getSummaryRows(pattern, all);
        var tbl = '<table class="ff-summary ff-email">'
        +'<colgroup><col class="ff-col-name"/><col class="ff-col-value"/></colgroup>'
        +valitms.join('\n')+'</table>';
        if(curr.isEditMode && curr.isEditMode())
            tbl += '<p class="pt-1 pb-1"><a class="card-link" href="javascript:void(0)" onclick="editFacade.showMapping()">Configure</a></p>';
        return tbl;
    }
    params.healthsummary = params.HEALTHSUMMARY = function()
    {
        var valitms = params.getSummaryRows(true, true);
        ['customer-id', 'score', 'diagnosis'].forEach(attr=>{
            var map = fac.mapping||{};
            var iid = map[attr];
            var item = items[iid]||{};
            var fcitm = fcitms[iid]||{};
            var val = params['entry'+item.entry]||'';
            if(val && fcitm.mode=='hide')
            {
                valitms.push('<tr><td>'+item.title+':</td> '+
                '<td>'+(Array.isArray(val)?val.join(', '):val)+'</td></tr>');
            }
        });
        var tbl = '<table class="ff-summary ff-email">'+valitms.join('\n')+'</table>';
        tbl += '<colgroup><col class="ff-col-name"/><col class="ff-col-value"/></colgroup>';
        if(curr.isEditMode && curr.isEditMode())
            tbl += '<p class="pt-1 pb-1"><a class="card-link" href="javascript:void(0)" onclick="editFacade.showMapping()">Configure</a></p>';
        return tbl;
    }
    params.computeCondition = function(secid)
    {
        var itmsubmits = fac.submit||{};
        var itmsubmit = itmsubmits[secid]||{};
        var cond = itmsubmit.ifmsg;
        if(cond && cond.source)
        {
            var srcitm = items[cond.source];
            if(!srcitm) return;
            var srcval = entr[srcitm.entry];
            if(srcval)
                srcval = isNaN(srcval)?0:Number(srcval);
            else
                srcval = 0;
            var ifs = cond.ifs?cond.ifs:[];
            for(var i=0; i<ifs.length; i++)
            {
                var ifitm = ifs[i];
                var estr = srcval;
                if(!ifitm.val) ifitm.val = 0;
                if(!ifitm.altval) ifitm.altval = 0;
                if(ifitm.op=='><')
                    estr += ' >= '+ifitm.val+' && '+srcval+' <= '+ifitm.altval;
                else
                    estr += ' '+ifitm.op+' '+ifitm.val;
                var rslt = eval(estr);
                if(rslt)
                {
                    var ifrslt = curr.computeField(ifitm.re);
                    return ifrslt;
                }
            }
            if(cond.els)
            {
                var elsrslt = curr.computeField(cond.els.re);
                return elsrslt;
            }
        }
        return;
    }
    params.scoresummary = params.SCORESUMMARY = function(secid)
    {
        var itmsubmits = fac.submit||{};
        var secids = Object.entries(itmsubmits).filter(en=>{
            var [sid, itmsubmit] = en;
            return (secid&&sid==secid) || (itmsubmit.submitto=='ifmsg'&&itmsubmit.ifmsg);
        }).map(en=>en[0]);
        if(secids.length>0)
            return params.computeCondition(secids.at(-1))||'(No message)';
        else
            return '(No message)';
    }
    params.formatDate = function(val)
    {
        var lang = setting.locale||setting.language;
        var vlmeta = val.getMetadata?val.getMetadata():null;
        if(vlmeta && vlmeta.time==1 && val.toLocaleString)
            return lang?val.toLocaleString(lang):val.toLocaleString();
        else if(val.toLocaleDateString)
            return lang?val.toLocaleDateString(lang):val.toLocaleDateString();
        else
            return val;
    }
    params.getBillFooter = function()
    {
        var mp = fac.mapping||{};
        return ['amount', 'delivery-fee', 'taxes', 'tip', 'discount', 'net-amount'].map(attr=>{
            var iid = mp[attr];
            var itm = items[iid];
            if(itm)
            {
                itm.mapped = attr;
                itm.format = txtamt=>params.format(txtamt, defcurrency);
                var val = params['entry'+itm.entry];
                return attr=='discount'?asNumber(itm, val*-1):val;
            }
        }).filter(val=>val);
    }
    params.bill = params.BILL = function()
    {
        var currency = defcurrency;
        var args = [].slice.call(arguments);
        if(args.length>0)
            currency = args.shift();
        else
            args = params.getBillFooter();
        var lines = params.getBill(currency);
        var tbl = curr.lang('- Your cart is empty -');
        if(lines.length>0)
        {
            var header = [curr.lang('Item'), curr.lang('Unit price'), curr.lang('Qty'), curr.lang('Amount')];
            var thead = '<tr><td>'+header.join('</td><td>')+'</td></tr>';
            var estamt = 0;
            var rows = lines.map(function(oline, l){
                var [ttl, prc, qty, iid, entry, discamt, sec] = oline;
                ttl = ttl.split('\n').join('<br/>');
                var line = [ttl, prc, qty];
                var lamt = prc*qty;
                estamt += lamt;
                if(discamt && discamt<lamt)
                    line.push(params.format(discamt, currency)+'<s>'+params.format(lamt, currency)+'</s>');
                else if(discamt && discamt>lamt)
                    line.push(params.format(discamt, currency));
                else
                    line.push(params.format(lamt, currency));
                line[1] = params.format(prc, currency);
                return '<tr><td>'+line.join('</td><td>')+'</td></tr>';
            }).join('\n');
            var tfoot = args.map(function(foot, l){
                var ttl = '';
                if(foot.getMetadata && foot.getMetadata())
                {
                    var meta = foot.getMetadata();
                    if(meta.title) ttl = meta.title;
                    if(meta.mapped=='amount' && estamt>foot)
                    {
                        var saved = estamt - foot;
                        saved = meta.format?meta.format(saved):saved;
                        ttl += '<br/><span class="ff-bill-saved">('+curr.lang('You saved $amount', {amount:saved})+')</span>';
                    }
                    foot = meta.format?meta.format(foot):foot;
                }
                return '<tr><td colspan="3">'+ttl+'</td><td>'+foot+'</td></tr>';
            }).join('\n');
            var tbl = '<table class="ff-bill ff-email"><colgroup><col/><col/><col/><col/></colgroup><thead>'+thead+'</thead><tbody>'+rows+'</tbody><tfoot>'+tfoot+'</tfoot></table>';
            tbl = params.inlineCSS(tbl);
        }
        if(curr.isEditMode && curr.isEditMode())
            tbl += '<p class="pt-1 pb-1"><a class="card-link" href="javascript:void(0)" onclick="editFacade.showMapping()">Configure</a></p>';
        return tbl;
    }
    params.textbill = params.TEXTBILL = function()
    {
        var currency = defcurrency;
        var args = [].slice.call(arguments);
        if(args.length>0)
            currency = args.shift();
        else
            args = params.getBillFooter();
        var lines = params.getBill(currency);
        if(lines.length==0) return '';
        var rows = lines.map(function(line){
            var [ttl, prc, qty, iid, entry, discamt, sec] = line;
            var lamt = discamt?discamt:prc*qty;
            lamt = params.format(lamt, currency);
            prc = params.format(prc, currency);
            return ttl+': '+prc+' * '+qty+' = '+lamt;
        });
        var foots = args.map(function(foot){
            var ttl = '';
            if(foot.getMetadata)
            {
                var meta = foot.getMetadata();
                if(meta && meta.title) ttl = meta.title+': ';
                foot = meta&&meta.format?meta.format(foot):foot;
            }
            return ttl+foot;
        });
        return rows.join('\n')+'\n'+foots.join('\n');
    }
    params.getBill = function(currency)
    {
        if(!currency) currency = defcurrency;
        var lines = new Array();
        var secs =  curr.getSections();
        secs.forEach(function(sec, s){
            sec.items.forEach(function(item, i){
                var fitm = fcitms[item.id]||{};
                var amt = params.price(item.help, currency);
                var fullprc = fitm.fullprice||amt;
                fullprc = isNaN(fullprc)?0:Number(fullprc);
                if(item.id==mapping.service)
                {
                    var srvstr = entr[item.entry];
                    var srv = srvstr&&isNaN(srvstr)==false?Number(srvstr):0;
                    if(srv) lines.push([item.title||'', srv, 1, item.id, item.entry, srv, sec.title]);
                }
                else if(item.type=='TEXT')
                {
                    var qntstr = entr[item.entry];
                    var qnt = qntstr&&isNaN(qntstr)==false?Number(qntstr):0;
                    if(amt && qnt) lines.push([item.title||'', fullprc, qnt, item.id, item.entry, amt*qnt, sec.title]);
                }
                else if(item.type=='LIST' || item.type=='MULTIPLE_CHOICE' || item.type=='SCALE')
                {
                    if(fitm.discounted)
                    {
                        var selstr = entr[item.entry];
                        fitm.choices.forEach((ch,c)=>{
                            if(ch==selstr)
                            {
                                var disc = fitm.discounted[c];
                                if(!disc) disc = amt*ch;
                                lines.push([item.title||'', fullprc, ch, item.id, item.entry, disc, sec.title]);
                            }
                        })
                    }
                    else if(amt>0 || fitm.widget=='product')
                    {
                        var qntstr = entr[item.entry];
                        var qnt = qntstr?(isNaN(qntstr)==false?Number(qntstr):1):0;
                        if(qnt) lines.push([qnt>0||qntstr.toString()=='1'?(item.title||''):(item.title+' | '+qntstr), fullprc, qnt, item.id, item.entry, amt*qnt, sec.title]);
                    }
                    else
                    {
                        var amtstr = entr[item.entry];
                        amt = params.price(amtstr, currency);
                        fullprc = fullprc||amt;
                        if(amt>0) lines.push([item.title+' | '+amtstr, fullprc, 1, item.id, item.entry, amt, sec.title]);
                    }
                }
                else if(item.type=='PARAGRAPH_TEXT')
                {
                    var cfgstr = entr[item.entry];
                    if(fitm.measure=='Configurable' && cfgstr)
                    {
                        var rws = cfgstr?cfgstr.split('\n'):[];
                        rws.forEach(rw=>{
                            var ttl = item.title;
                            var prc = fitm.price;
                            var ln = rw.trim().split(' | ').pop();
                            var [vid, qnt] = ln.trim().split(' * ');
                            var vrn = fitm.variants?fitm.variants[vid]:null;
                            if(vrn&&vrn.name) ttl = ttl+' | '+vrn.name;
                            if(vrn&&vrn.price) prc = vrn.price;
                            lines.push([ttl, prc, qnt, item.id, item.entry, 0, sec.title, vid]);
                        });
                    }
                }
                else if(item.type=='CHECKBOX')
                {
                    if(amt>0)
                    {
                        var qntstrs = entr[item.entry];
                        qntstrs = Array.isArray(qntstrs)?qntstrs:[qntstrs];
                        qntstrs.forEach(function(qntstr){
                            var qnt = qntstr?(isNaN(qntstr)==false?Number(qntstr):1):0;
                            if(amt && qnt) lines.push([qnt>1||qntstr.toString()=='1'?item.title:(item.title+' | '+qntstr), fullprc, qnt, item.id, item.entry, 0, sec.title]);
                        });
                    }
                    else
                    {
                        var vals = entr[item.entry];
                        var vals = Array.isArray(vals)?vals:[vals];
                        vals.forEach(function(val){
                            var vlamt = params.price(val, currency);
                            if(vlamt>0) lines.push([item.title+' | '+val, vlamt, 1, item.id, item.entry, 0, sec.title]);
                        });
                    }
                }
                else if(item.type=='GRID')
                {
                    var rws = item.rows?item.rows:[];
                    rws.forEach(function(rw, rwi){
                        var valmap = {};
                        var val = entr[rw.entry];
                        val = Array.isArray(val)?val:[val];
                        val.forEach(function(vl){ valmap[vl] = vl; });
                        item.choices.forEach(function(ch, chi){
                            if(ch && ch.value && valmap[ch.value])
                            {
                                var ttls = [];
                                if(item.title)
                                    ttls.push(item.title);
                                if(isNaN(rw.value))
                                    ttls.push(rw.value);
                                if(isNaN(ch.value))
                                    ttls.push(ch.value);
                                var ttl = ttls.join(' | ');
                                if(amt>0)
                                {
                                    var qnt = ch.value?(isNaN(ch.value)==false?Number(ch.value):1):0;
                                    if(amt && qnt) lines.push([ttl, amt, qnt, item.id, item.entry, 0, sec.title]);
                                }
                                else
                                {
                                    var rwamt = params.price(rw.value, currency);
                                    if(rwamt>0)
                                    {
                                        var qnt = ch.value?(isNaN(ch.value)==false?Number(ch.value):1):0;
                                        if(rwamt && qnt) lines.push([ttl, rwamt, qnt, item.id, item.entry, 0, sec.title]);
                                    }
                                } 
                            }
                        });
                    });
                }
            });
        });
        lines.toString = function(){ return JSON.stringify(lines); }
        return lines;
    }
    params.menu = params.MENU = function(currency, secttl=true)
    {
        if(!currency) currency = defcurrency;
        var lines = '';
        var secs =  curr.getSections();
        secs.forEach(function(sec, s){
            var prds = [];
            sec.items.forEach(function(item, i){
                var amt = params.price(item.help, currency);
                if(amt)
                {
                    var prd = '<div class="ff-menu-prd">'+item.title+'</div>';
                    var prc = '<div class="ff-menu-prc">'+params.format(amt, currency)+'</div>';
                    var row = '<div class="ff-menu" onclick="formFacade.directtoSection(\''+sec.id+'\', \''+item.id+'\')">'+prd+prc+'</div>';
                    prds.push(row);
                }
            });
            if(prds.length>0)
            {
                lines += '<div class="ff-menu-sec">\n';
                if(secttl)
                    lines += '<div class="ff-menu-ttl" onclick="formFacade.directtoSection(\''+sec.id+'\')">'+sec.title+'</div>\n';
                lines += prds.join('\n')+'</div>';
            }
        });
        return lines;
    }
    params.categories = params.CATEGORIES = function()
    {
        var lines = [];
        var next = fac&&fac.next?fac.next:{};
        var publishId = curr.data.request.params.publishId;
        var secs =  curr.getSections();
        secs.forEach(function(sec, s){
            var prds = sec.items.filter(itm=>{
                if(!curr.getPrice) return false;
                var prc = curr.getPrice(itm, defcurrency);
                var visible = true;
                var fitm = fcitms[itm.id]||{};
                if(fitm.mode=='hide') visible = false;
                if(fitm.inventory=='yes'&&fitm.remain<=0) visible = false;
                return (prc.min>0||prc.max>0) && visible;
            });
            var nav = next[sec.id];
            if(nav && nav.navigation=='added' && prds.length>0)
            {
                var img = 'https://neartail.com/img/collections.svg';
                var imgs = sec.items.filter(itm => itm.type=='IMAGE' && (itm.image || itm.blob));
                var imgttls = sec.items.filter(itm => itm.titleImage && (itm.titleImage.image || itm.titleImage.blob));
                var fcimgs = sec.items.map(itm=>fcitms[itm.id]).filter(fcitm=>fcitm&&fcitm.prdimage);
                if(imgs.length>0){
                    if(imgs[0].image)
                        img = 'https://formfacade.com/itemload/item/'+encode(imgs[0].image);
                    else
                        img = 'https://formfacade.com/itemembed/'+publishId+'/item/'+imgs[0].id+'/image/'+imgs[0].blob;
                } else if(fcimgs.length>0) {
                    img = fcimgs[0].prdimage;
                } else if(imgttls.length>0) {
                    if(imgttls[0].image)
                        img = 'https://formfacade.com/itemload/item/'+encode(imgttls[0].image);
                    else
                        img = 'https://formfacade.com/itemimg/'+publishId+'/item/'+imgttls[0].id+'/title/'+imgttls[0].titleImage.blob;
                }
                var ivk = curr.isEditMode&&curr.isEditMode()?"formFacade.scrollIntoView(document.getElementById('ff-sec-"+sec.id+"'))":"formFacade.directtoSection('"+sec.id+"')";
                var line = '<li class="ff-image-list__item" onclick="'+ivk+'">';
                if(img)
                    line = line + '<img class="ff-image-list__image" src="'+img.replace('neartail.com/', 'formfacade.com/')+'">';
                line = line + '<div class="ff-image-list__supporting"><span class="ff-image-list__label">'+sec.title+'</span></div></li>'
                lines.push(line);
            }
        });
        if(curr.isEditMode && curr.isEditMode())
        {
            var line = '<li class="ff-image-list__item" onclick="editFacade.showNavigation(); formFacade.closeNavigation();">';
            line = line + '<img class="ff-image-list__image" src="/img/edit_pencil.svg" title="Show or hide product categories in navigation">';
            line = line + '<div class="ff-image-list__supporting"><span class="ff-image-list__label">&nbsp;</span></div></li>'
            lines.push(line);
        }
        return '<ul class="ff-image-list nt-image-list ff-image-list__supporting">'+lines.join('\n')+'</ul>';
    }
    params.inlineCSS = table=>curr.juice?curr.juice(`
        <style>
            .ff-email{ min-width:400px; max-width:100%; table-layout:fixed; border-collapse:collapse; border:1px solid #eee; }
            .ff-email tr{ height:36px; }
            .ff-email tr:nth-child(odd){ background-color:#f5f5f5; }
            .ff-email td{ padding:6px; }
            .ff-summary col{ width:50%; }
            .ff-bill col{ width:25%; }
            .ff-bill thead tr{ font-weight:600; background-color:#111; color:#fff; }
        </style>
        ${table}
    `):table;
    params.response = params.RESPONSE = function(scope)
    {
        var table = fac.hipaache?params.healthsummary():params.SUMMARY(true, scope||true);
        table = params.inlineCSS(table);
        return table;
    }
    params.getFields = function(args)
    {
        var itms = [];
        args = Array.prototype.slice.call(args);
        if(args.length>1)
        {
            var [scope, ctgnm] = args;
            if(scope==params.CATEGORY && ctgnm)
            {
                curr.getSections().forEach(function(sec, s){
                    sec.items.forEach(function(itm, i){
                        var fcitm = fcitms[itm.id]||{};
                        if(fcitm.tag==ctgnm) itms = itms.concat(itm);
                    });
                });
            }
            else
                itms = args.filter(arg=>arg.getMetadata).map(arg=>arg.getMetadata());
        }
        else
        {
            var scope = args[0];
            if(!scope) scope = params.ALL;
            if(scope.getMetadata)
                itms = [scope.getMetadata()];
            else
            {
                var secs =  curr.getSections();
                var secid = citm&&citm.section?citm.section.id:null;
                secs.forEach(function(sec, s){
                    if(scope==params.SECTION && secid==sec.id)
                        itms = itms.concat(sec.items);
                    else if(scope==params.ALL)
                        itms = itms.concat(sec.items);
                });
            }
        }
        return itms.filter(itm=>itm.type=='GRID'||itm.entry);
    }
    params.getScorable = function(args)
    {
        return params.getFields(args).filter(item=>{
            var fitm = fcitms[item.id];
            return fitm && fitm.score;
        });
    }
    params.viewscore = params.VIEWSCORE = function()
    {
        return ejs.render(curr.template.viewscore, curr);
    }
    params.points = params.POINTS = function()
    {
        var acc = 0;
        var itms = params.getScorable(arguments);
        itms.forEach(function(item, itmi){
            var fitm = fcitms[item.id]||{};
            if(item.type=='GRID')
            {
                var rws = item.rows?item.rows:[];
                rws.forEach(function(rw, rwi){
                    var valmap = {};
                    var val = entr[rw.entry];
                    val = Array.isArray(val)?val:[val];
                    val.forEach(function(vl){ valmap[vl] = vl; });
                    item.choices.forEach(function(ch, chi){
                        if(ch && valmap[ch.value])
                        {
                            var point = fitm.score[chi];
                            if(point) acc = acc + point;
                        }
                    });
                });
            }
            else if(item.choices)
            {
                var itmacc = 0;
                var valmap = {};
                var val = entr[item.entry];
                val = Array.isArray(val)?val:[val];
                val.forEach(function(vl){ valmap[vl] = vl; });
                item.choices.forEach(function(ch, chi){
                    if(ch && valmap[ch.value])
                    {
                        var point = fitm.score[chi];
                        if(point) itmacc = itmacc + point;
                    }
                });
                if(fitm.maxscore>0)
                    acc = acc + (itmacc>fitm.maxscore?Number(fitm.maxscore):itmacc);
                else
                    acc = acc + itmacc;
            }
        });
        return acc;
    }
    params.answered = params.ANSWERED = function()
    {
        var acc = 0;
        var itms = params.getScorable(arguments);
        itms.forEach(function(item){
            var fitm = fcitms[item.id]||{};
            var fscore = fitm.score||[];
            var val = entr[item.entry];
            if(item.type=='GRID')
            {
                acc = acc + item.rows.filter(rw=>{
                    var rval = entr[rw.entry];
                    var rarr = Array.isArray(rval)?rval:[rval];
                    return item.choices.filter(function(ch, chi){
                        if(rarr.indexOf(ch.value)>=0)
                            return fscore[chi]>0||fscore[chi]<0||fscore[chi]==0;
                    }).length>0;
                }).length;
            }
            else if(item.choices && val)
            {
                var valarr = Array.isArray(val)?val:[val];
                var validscore = item.choices.filter(function(ch, chi){
                    if(valarr.indexOf(ch.value)>=0)
                        return fscore[chi]>0||fscore[chi]<0||fscore[chi]==0;
                });
                if(validscore.length>0) acc = acc + 1;
            }
        });
        return acc;
    }
    params.averagepoints = params.AVERAGEPOINTS = function()
    {
        var pns = params.POINTS.apply(params, arguments);
        var ans = params.ANSWERED.apply(params, arguments);
        if(pns==0 || ans==0) return 0;
        return Math.round((pns/ans + Number.EPSILON) * 100) / 100;
    }
    params.score = params.SCORE = function()
    {
        var args = Array.prototype.slice.call(arguments);
        var scope = args.shift();
        if(!scope) scope = true;
        var itms;
        if(scope.getMetadata)
            itms = [scope.getMetadata()];
        else if(scope==true || scope==params.ALL || scope==params.SECTION)
            itms = filterItems(true, scope);
        else
            itms = filterItems(scope, params.ALL);
        var acc = 0;
        itms.forEach(function(item, itmi){
            if(item.type=='MULTIPLE_CHOICE' || item.type=='CHECKBOX' || (scope.getMetadata && item.type=='LIST'))
            {
                var valmap = {};
                var val = entr[item.entry];
                val = Array.isArray(val)?val:[val];
                val.forEach(function(vl){ valmap[vl] = vl; });
                item.choices.forEach(function(ch, chi){
                    if(ch && valmap[ch.value])
                    {
                        var point = args[chi];
                        if(point) acc = acc + point;
                    }
                });
            }
            else if(item.type=='GRID')
            {
                var rws = item.rows?item.rows:[];
                rws.forEach(function(rw, rwi){
                    var valmap = {};
                    var val = entr[rw.entry];
                    val = Array.isArray(val)?val:[val];
                    val.forEach(function(vl){ valmap[vl] = vl; });
                    item.choices.forEach(function(ch, chi){
                        if(ch && valmap[ch.value])
                        {
                            var point = args[chi];
                            if(point) acc = acc + point;
                        }
                    });
                });
            }
        });
        return acc;
    }
    params.diff = params.DIFF = function(val=0)
    {
        if(!val.getMetadata) return;
        var num = isNaN(val)?0:Number(val);
        var {entry} = val.getMetadata()||{};
        var history = draft.history||{};
        var prev = history.entry||{};
        var preval = prev[entry]||0;
        var prenum = isNaN(preval)?0:Number(preval);
        return num - prenum;
    }
    params.mostly = params.MOSTLY = function()
    {
        var args = Array.prototype.slice.call(arguments);
        var scope = args[0];
        if(!scope) scope = true;
        var itms;
        if(scope.getMetadata)
            itms = [scope.getMetadata()];
        else if(scope==true || scope==params.ALL || scope==params.SECTION)
            itms = filterItems(true, scope);
        else
            itms = filterItems(scope, params.ALL);
        var occs = {};
        itms.forEach(function(item, itmi){
            if(item.type=='MULTIPLE_CHOICE' || item.type=='CHECKBOX')
            {
                var valmap = {};
                var val = entr[item.entry];
                val = Array.isArray(val)?val:[val];
                val.forEach(function(vl){ valmap[vl] = vl; });
                item.choices.forEach(function(ch, chi){
                    if(ch && valmap[ch.value])
                    {
                        var occ = occs[chi];
                        occs[chi] = occ?(occ+1):1;
                    }
                });
            }
            else if(item.type=='GRID')
            {
                var rws = item.rows?item.rows:[];
                rws.forEach(function(rw, rwi){
                    var valmap = {};
                    var val = entr[rw.entry];
                    val = Array.isArray(val)?val:[val];
                    val.forEach(function(vl){ valmap[vl] = vl; });
                    item.choices.forEach(function(ch, chi){
                        if(ch && valmap[ch.value])
                        {
                            var occ = occs[chi];
                            occs[chi] = occ?(occ+1):1;
                        }
                    });
                });
            }
        });
        var occlst = [];
        for(var chi in occs)
            occlst.push({index:chi, value:occs[chi]});
        occlst.sort((a,b)=>b.value-a.value);
        var rank = args[1]?args[1]:1;
        if(occlst.length>=rank)
            return parseInt(occlst[rank-1].index)+1;
        else
            return 0;
    }
    params.weight = params.WEIGHT = function()
    {
        var weightfn = 0;
        var lines = params.getBill(defcurrency);
        lines.forEach(function(oline){
            var [ttl, prc, qty, iid, entry, discamt, sec, vid] = oline;
            var fcitm = fcitms[iid]||{};
            if(fcitm.shipped)
            {
                if(fcitm.variants)
                {
                    var vrn = fcitm.variants[vid]||{};
                    var weightrw = Number(vrn.ship||0)*qty;
                    weightfn = weightfn + weightrw;
                }
                else if(fcitm.ship)
                {
                    var weightrw = Number(fcitm.ship)*qty;
                    weightfn = weightfn + weightrw;
                }
            }
        });
        return weightfn;
    }
    params.tax = params.TAX = function()
    {
        var taxfn = 0;
        var lines = params.getBill(defcurrency);
        lines.forEach(function(oline){
            var [ttl, prc, qty, iid, entry, discamt, sec] = oline;
            var fcitm = fcitms[iid]||{};
            var taxpc = Number(fcitm.tax||0);
            var amtrw = discamt||prc*qty;
            var taxrw = amtrw*(taxpc/100);
            taxfn = taxfn + taxrw;
        });
        return taxfn;
    }
    params.fee = params.FEE = function()
    {
        var args = Array.prototype.slice.call(arguments);
        var currency = args.shift();
        if(citm)
        {
            citm.format = function(txtamt){
                return params.format(txtamt, currency);
            }
        }
        return params.score.apply(params, args);
    }
    params.charge = params.CHARGE = function()
    {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(defcurrency);
        return params.fee.apply(params, args);
    }
    params.nettotal = params.NETTOTAL = function()
    {
        var tot = params.total(defcurrency);
        var mp = fac.mapping?fac.mapping:{};
        ['delivery-fee', 'taxes', 'tip', 'discount'].forEach(attr=>{
            var iid = mp[attr];
            if(iid)
            {
                var itm = items[iid];
                if(itm)
                {
                    var val = params['entry'+itm.entry];
                    if(val)
                    {
                        var mval = attr=='discount'?val*-1:val;
                        tot = tot + mval;
                    }
                }
            }
        });
        return tot;
    }
    params.products = params.PRODUCTS = function()
    {
        var products = [];
        if(setting.currency)
        {
            var lines = params.getBill();
            products = lines.map(line=>{
                var [title, price, quantity, id, entry, amount, section] = line;
                return {title, price, quantity, id, entry, amount, section};
            })
            var getAmount = prd=>prd.amount||(Number(prd.price||0)*Number(prd.quantity||0));
            products.sort((a,b)=>getAmount(b)-getAmount(a));
        }
        return products;
    }
    params.topproduct = params.TOPPRODUCT = function()
    {
        var prds = params.products();
        return prds.length==0?'':prds[0].title;
    }
    params.gridscore = params.GRIDSCORE = function()
    {
        var args = Array.prototype.slice.call(arguments);
        var grdval = args.shift();
        var sel = args.shift();
        sel = Array.isArray(sel)?sel:[sel];
        var acc = 0;
        if(grdval && grdval.getMetadata)
        {
            var item = grdval.getMetadata();
            if(item && item.type=='GRID')
            {
                var rws = item.rows?item.rows:[];
                rws.forEach(function(rw, rwi){
                    if(sel.indexOf(rwi+1)>=0)
                    {
                        var valmap = {};
                        var val = entr[rw.entry];
                        val = Array.isArray(val)?val:[val];
                        val.forEach(function(vl){ valmap[vl] = vl; });
                        item.choices.forEach(function(ch, chi){
                            if(ch && valmap[ch.value])
                            {
                                var point = args[chi];
                                if(point) acc = acc + point;
                            }
                        });
                    }
                });
            }
        }
        return acc;
    }
    params.date = params.DATE = function(yy, mm, dd)
    {
        return toDate(new Date(yy, mm-1, dd));
    }
    params.datevalue = params.DATEVALUE = function(date)
    {
        if(date instanceof Date)
            return toDate(date);
        var vl = new String(date?date:'');
        var parsed = Date.parse(vl);
        if(isNaN(parsed)==false)
            return toDate(new Date(parsed));
    }
    params.today = params.TODAY = function()
    {
        var vl = new Date();
        return params.date(vl.getFullYear(), vl.getMonth()+1, vl.getDate());
    }
    params.now = params.NOW = function()
    {
        var vl = new Date();
        return toDate(vl);
    }
    params.datedif = params.DATEDIF = function(date1, date2, metric)
    {
        var start = new Date(date1.getTime());
        start.setHours(0);
        start.setMinutes(0, 0, 0);
        var end = new Date(date2.getTime());
        end.setHours(0);
        end.setMinutes(0, 0, 0);
        if(metric=='Y')
        {
            var years = end.getFullYear()-start.getFullYear();
            if(end.getMonth()<start.getMonth()||(end.getMonth()==start.getMonth()&&end.getDate()<start.getDate())) years = years-1;
            return years;
        }
        else if(metric=='M')
        {
            var months = (end.getFullYear()*12+end.getMonth())-(start.getFullYear()*12+start.getMonth());
            if(end.getDate()<start.getDate()) months = months-1;
            return months;
        }
        if(metric=='D')
        {
            return Math.round((end.getTime()-start.getTime())/(1000*60*60*24));
        }
        else if(metric=='h')
        {
            return Math.round((date2.getTime()-date1.getTime())/(1000*60*60));
        }
        else if(metric=='m')
        {
            return Math.round((date2.getTime()-date1.getTime())/(1000*60));
        }
        else if(metric=='s')
        {
            return Math.round((date2.getTime()-date1.getTime())/1000);
        }
    }
    params.WEEKDAY = params.weekday = function(dt, type=1)
    {
        return toDate(dt).day() - (type-1);
    }
    params.duplicate = params.DUPLICATE = function(url='')
    {
        var pairs = [];
        var en = entr?entr:{};
        for(var enid in en)
        {
            if(isNaN(enid)==false)
            {
                var enval = en[enid];
                enval = Array.isArray(enval)?enval:[enval];
                enval.forEach(function(enitm){
                    if(enitm=='__other_option__')
                        enitm = entr[enid+'-other_option_response'];
                    if(enitm)
                        pairs.push('entry.'+enid+'='+encodeURIComponent(enitm));
                });
            }
        }
        return url+'?'+pairs.join('&');
    }
    params.editurl = params.EDITURL = function()
    {
        var {userId, publishId} = request.params||{};
        var {savedId, owner} = draft;
        var {currency} = setting;
        var {shortId} = config;
        if(savedId)
        {
            var host = currency?'neartail.com':'formfacade.com';
            var url = `https://${host}/public/${userId||owner}/home/form/${publishId}?restoreId=${savedId}`;
            if(shortId) url = `${currency?'neartail.com':'formfacade.com'}/rs/${shortId}/${savedId}`;
            return url;
        }
    }
    params.prefilllink = params.PREFILLLINK = function()
    {
        var {userId, publishId} = request.params||{};
        var {savedId, owner, name} = draft;
        var {currency} = setting;
        var {shortId} = config;
        if(savedId && name)
        {
            var host = currency?'neartail.com':'formfacade.com';
            var url = `https://${host}/public/${userId||owner}/home/form/${publishId}?prefillId=${name}`;
            if(shortId) {
                var domain;
                if(fac && fac.hipaache)
                    domain = 'hipaache.com';
                else if(currency)
                    domain = 'neartail.com';
                else
                    domain = 'formfacade.com';
                url = `${domain}/sm/${shortId}/${name}`;
            }
            return url;
        }
    }
    params.edit = params.EDIT = function(label)
    {
        var editurl = params.editurl();
        if(editurl)
        {
            var caption = setting.currency?'Edit Order':'Edit Response';
            return `
                <a class="card-link" href='${editurl}'>
                    ${label||caption}
                </a>
            `;
        }
        return '';
    }
    params.row = params.ROW = function()
    {
        var args = Array.prototype.slice.call(arguments);
        var width = Math.round(100/args.length);
        var htm = '<table class="ff-html-row" cellspacing="0" style="width:100%; border-spacing:0; border-collapse:collapse;"><tr>';
        args.forEach(function(cell, c){
            var align = c==0?'left':(c+1==args.length?'right':'center');
            if(args.length==1) align = 'center';
            var cells = Array.isArray(cell)?cell:[cell];
            htm += '<td style="width:'+width+'%; text-align:'+align+';">'+cells.join('<br/>')+'</td>';
        });
        htm += '</tr></table>';
        return htm;
    }
    params.tag = params.TAG = function(nm, attr)
    {
        attr = typeof attr==='string'||attr instanceof String?{content:attr}:attr;
        var vl = attr.content; delete attr.content;
        var attrs = Object.keys(attr).map(function(anm){ return anm+'="'+attr[anm]+'"'; }).join(' ');
        return '<'+nm+' '+attrs+'>'+(vl?vl:'')+'</'+nm+'>';
    }
    Array('img','h1','h2','h3','h4','h5','h6','p','b','em','i','small','a','hr','s').forEach(function(tg){
        params[tg] = params[tg.toUpperCase()] = function(attr){ return params.tag(tg, attr); };
    });
    Array('ol','ul').forEach(function(tg){ 
        params[tg] = params[tg.toUpperCase()] = function(){
            var itms = Array.prototype.slice.call(arguments);
            var lst = itms.map(function(itm){ return '<li>'+itm+'</li>'; }).join('\n');
            return params.tag(tg, lst);
        }; 
    });
    params.hyperlink = params.HYPERLINK = function(url, label)
    {
        return '<a href="'+url+'" target="_blank">'+label+'</a>';
    }
    params.cta = params.CTA = function(url, label, newwindow)
    {
        var ctaclick = newwindow?`window.open(${JSON.stringify(url)})`:`location.href="${url}"`;
        return `<p class="ctabutton">
            <button type="button" class="btn btn-lg btn-primary ff-next" onclick='${ctaclick}'>
                ${label||'Proceed'}
            </button>
        </p>`;
    }
    params.jsa = params.JSA = function(js, label)
    {
        Object.entries(params).forEach(en=>{
            var [nm, vl] = en;
            if(nm.startsWith('entry') && js.indexOf(nm)>=0)
                js = js.split(nm).join(JSON.stringify(vl));
            else if(js.indexOf(nm+'()')>=0)
                js = js.split(nm+'()').join(JSON.stringify(vl()));
        });
        return `<p class="ctabutton">
            <button type="button" class="btn btn-lg btn-primary ff-next" onclick='eval(${JSON.stringify(js)})'>
                ${label||'Proceed'}
            </button>
        </p>`;
    }
    params.field = params.FIELD = function(attr)
    {
        var map = fac.mapping||{};
        var iid = map[attr];
        var itm = items[iid]||{};
        return params['entry'+itm.entry];
    }
    params.getAmount = function(amt)
    {
        if(!amt) amt = params.field('net-amount');
        if(!amt) amt = params.field('amount');
        if(amt && isNaN(amt)==false) return params.round(Number(amt));
    }
    params.getTitle = _=>scraped.title
    params.getBrand = _=>config.title||scraped.title
    params.getTxNumber = _=>params.orderId()||'000000'
    params.getTxNote = _=>'Order'+params.getTxNumber()
    params.renderWallet = function(wallet, rcp, amt)
    {
        var amflt = params.getAmount(amt);
        return `<div id="walletpane-${wallet}" class="walletpane" data-wallet="${wallet}" data-to="${rcp}" data-amount="${amflt}">
                  <h3>Loading...</h3>
                </div>`;
    }
    params.upi = params.UPI = (rcp, amt)=>params.renderWallet('upi', rcp, amt);
    params.venmo = params.VENMO = (rcp, amt)=>params.renderWallet('venmo', rcp, amt);
    params.cashapp = params.CASHAPP = (rcp, amt)=>params.renderWallet('cashapp', rcp, amt);
    params.paypal = params.PAYPAL = (rcp, amt)=>params.renderWallet('paypal', rcp, amt);
    params.paynow = params.PAYNOW = (rcp, amt)=>params.renderWallet('paynow', rcp, amt);
    params.code = params.CODE = function(nm)
    {
        return params[nm].toString();
    }
    params.sequence = params.SEQUENCE = function(nm)
    {
        if(curr.draft)
        {
            var seq = nm=='submitted'?curr.draft.submitSeq:curr.draft.draftSeq;
            if(seq && isNaN(seq)==false) return parseInt(seq);
        }
        return 0;
    }
    params.orderId = params.ORDERID = _=>params.sequence('submitted');
    params.center = params.CENTER = html=>`<div class="ff-cta-center">${html}</div>`;
    params.showlocation = params.SHOWLOCATION = function()
    {
        var fld = citm||{};
        if(fld.type=="PARAGRAPH_TEXT" || fld.type=="TEXT")
        {
            return `
                <a class="card-link" href="javascript:void(0)"
                    onclick="formFacade.getLocation(document.getElementById('Widget${fld.id}'))">
                    Show current location
                </a>
            `;
        }
        return 'Works only with Text field';
    }
    params.addtocalendar = params.ADDTOCALENDAR = function(start, end, subject, body, location)
    {
        var startdt = toDate(start||new Date());
        var enddt = end?toDate(end):startdt.add(1, 'hours');
        if(!subject) subject = params.getTitle();
        formatOffset = offsetInMins=>{
            var negative=offsetInMins<0?"-":"";
            var positiveMins= Math.abs(offsetInMins);
          
            var hours   = Math.floor(positiveMins/ 60);
            var mins = Math.floor((positiveMins- ((hours * 3600)) / 60));
            if (hours   < 10) {hours   = "0"+hours;}
            if (mins < 10) {mins = "0"+mins;}
         
            return negative+hours+':'+mins;
        };
        var caldef = {
            google:{
                action:'TEMPLATE', text:subject, details:body, location:location,
                dates:startdt.toISOString().replace(/[^\w\s]/gi, '')+'/'+enddt.toISOString().replace(/[^\w\s]/gi, '') 
            },
            outlook:{
                rru:'addevent', subject:subject, body:body, location:location,
                startdt:startdt.toISOString().split('.')[0]+formatOffset(startdt.getTimezoneOffset()), 
                enddt:enddt.toISOString().split('.')[0]+formatOffset(enddt.getTimezoneOffset())
            },
            ics:{
                BEGIN:"VCALENDAR",
                CALSCALE:"GREGORIAN",
                METHOD:"PUBLISH",
                PRODID:"-//Neartail-Formfacade//Forms",
                VERSION:"2.0",
                "BEGIN ":"VEVENT",
                UID:"Formfacade-"+draft.savedId,
                "DTSTAMP;VALUE=DATE":new Date().toISOString().split('.')[0].replace(/[^\w\s]/gi, ''),
                "DTSTART;VALUE=DATE":startdt.toISOString().split('.')[0].replace(/[^\w\s]/gi, ''),
                "DTEND;VALUE=DATE":enddt.toISOString().split('.')[0].replace(/[^\w\s]/gi, ''),
                SUMMARY:subject,
                DESCRIPTION:body,
                LOCATION:location,
                END:"VEVENT",
                "END ":"VCALENDAR"
            }
        };
        var calqry = Object.fromEntries(Object.entries(caldef).map(calen=>{
            var [calnm, calvl] = calen;
            var SEPARATOR = '&';
            if(calnm=='ics') SEPARATOR = (navigator.appVersion.indexOf('Win') !== -1) ? '\r\n' : '\n';
            caljoin = Object.entries(calvl).map(cal=>{
                var [nm, vl] = cal;
                if(vl)
                {
                    if(calnm=='ics')
                        return nm.trim()+':'+vl;
                    else
                        return nm+'='+encodeURIComponent(vl);
                }
            }).filter(cal=>cal).join(SEPARATOR);
            return [calnm, caljoin];
        }));
        return `<p class="ff-cta-calendar">
                    <button type="button" class="btn btn-lg btn-primary ff-next"
                        onclick='window.open(window.URL.createObjectURL(new Blob([${JSON.stringify(calqry.ics)}], {type:"text/calendar"})));'>
                        Add to your calendar
                    </button>
                </p>
                <p>
                    <a class="card-link" target="_blank"
                        href="https://calendar.google.com/calendar/render?${calqry.google}">
                        Google
                    </a>
                    <a class="card-link" target="_blank"
                        href="https://outlook.office.com/calendar/0/deeplink/compose?${calqry.outlook}">
                        Outlook
                    </a>
                    <a class="card-link" target="_blank"
                        href="https://outlook.office.com/calendar/0/deeplink/compose?${calqry.outlook}">
                        Office 365
                    </a>
                </p>`;
    }
    params.def = _=>params;
    const names = Object.keys(params);
    const vals = Object.values(params);
    if(opts.returntype)
    {
        try
        {
            if(tmpl.startsWith('${') && tmpl.endsWith('}')) tmpl = tmpl.substring(2, tmpl.length-1);
            var calcrs = new Function(...names, 'return '+tmpl)(...vals);
            return calcrs;
        }
        catch(err)
        {
            console.trace(err, 'Computation failed for '+tmpl);
            return err;
        }
    }
    else
    {
        try
        {
            var calcrs = new Function(...names, `return \`${tmpl}\`;`)(...vals);
            return calcrs;
        }
        catch(err)
        {
            console.trace(err, 'Computation failed for '+tmpl);
            return 'Computation failed for '+tmpl+' due to '+err;
        }
    }
}



window.formFacade = new FormFacade({"setting":{"creator":"neartail","currency":"Â£","currencyCode":"GBP","language":"en","locale":"","parent":"1FAIpQLSdWixzh_ePGwrgE_rHTZLpT4UjNW1Lb1VLC_3TgQGAtDPFIkg"},"request":{"params":{"publishId":"1FAIpQLSeCONlY8_49qQlxtlFTFluGYJ48Un0hpZqVb4X87kAOFDcRPg","target":"classic","userId":"110523908108472816351"},"query":{"div":"ff-compose"}}});

formFacade.template = {"style":"<%\r\n  var {userId, publishId, target} = data.request.params||{};\r\n  var {form, scraped, facade} = data||{};\r\n  var fac = facade||{};\r\n\r\n  var themecolor = config.themecolor;\r\n  if(!themecolor)\r\n  {\r\n    if(fac.neartail)\r\n      themecolor = 'minimal-77cde3';\r\n    else\r\n      themecolor = 'colorful-5d33fb';\r\n  }\r\n  var [themed, thmcolor] = themecolor.split('-');\r\n  var primary = '#'+thmcolor;\r\n  if(fac.setting && fac.setting.primary=='#000000')\r\n    delete fac.setting.primary;\r\n  if(fac.setting && fac.setting.primary)\r\n    primary = fac.setting.primary;\r\n  else if(config && config.theme)\r\n    primary = config[config.theme+'pri'];\r\n  var headfont;\r\n  if(config.theme)\r\n    headfont = config[config.theme+'head'];\r\n  else if(themed=='colorful')\r\n    headfont = 'Poppins';\r\n  else if(themed=='minimal')\r\n    headfont = 'Work Sans';\r\n  var parafont;\r\n  if(config.theme)\r\n    parafont = config[config.theme+'para'];\r\n  else if(themed=='colorful')\r\n    parafont = 'Roboto';\r\n  else if(themed=='minimal')\r\n    parafont = 'Work Sans';\r\n  var fontSize = 14;\r\n  if(config.theme)\r\n  {\r\n    var strsize = config[config.theme+'size'];\r\n    if(isNaN(strsize)==false) fontSize = parseInt(strsize);\r\n  }\r\n  if(fac.enhance)\r\n  {\r\n    var strsize = fac.enhance.fontSize;\r\n    if(strsize && isNaN(strsize)==false) fontSize = parseInt(strsize);\r\n  }\r\n  var bgcolor = '#fff';\r\n  var fontColor = '#202124';\r\n  var field = '#f5f7f8';\r\n  if(fac.enhance)\r\n  {\r\n    if(fac.enhance.transparent=='on')\r\n      bgcolor = 'transparent';\r\n    else if(fac.enhance.background)\r\n      bgcolor = fac.enhance.background;\r\n    if(fac.enhance.fontColor)\r\n      fontColor = fac.enhance.fontColor;\r\n    if(fac.enhance.field)\r\n      field = fac.enhance.field;\r\n  }\r\n%>\r\n<% if(headfont){ %>\r\n  <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=<%=headfont%>:300,400,500,600,700,800\">\r\n<% } %>\r\n<% if(parafont){ %>\r\n  <link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css?family=<%=parafont%>:300,400,500,600,700,800\">\r\n<% } %>\r\n<link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\" media=\"screen\">\r\n<style>\r\n  :root {\r\n    <% \r\n      var fontDiff = (fontSize - 16) * 0.05;\r\n      var fontScale = 1 + fontDiff;\r\n    %>\r\n    --ff-scale:<%-fontScale%>;\r\n    <% if(target=='wordpress' && false){ %>\r\n    --ff-primary-color: var(--wp--preset--color--primary, <%-primary%>);\r\n    <% } else{ %>\r\n    --ff-primary-color: <%-primary%>;\r\n    <% } %>\r\n    <%\r\n      var shades = config&&config.shades||{};\r\n      for(var skey in shades){\r\n    %>\r\n    <%-skey%>: <%-shades[skey]%>;\r\n    <% } %>\r\n    --ff-primary-light: <%-toRGB(primary, 0.4)%>;\r\n    --ff-bgcolor:<%-bgcolor%>;\r\n    --ff-font-color:<%-fontColor%>;\r\n    <% \r\n      var minFontSizes = {'00':.8, 0:.9, 1:1, 2:1.1, 3:1.25, 4:1.5, 5:2, 6:2.5, 7:3, 8:3.5};\r\n      for(var s in minFontSizes){\r\n        var fontSize = Math.round(14*minFontSizes[s]*10)/10;\r\n    %>\r\n      --ff-font-size-<%-s%>:max(calc(var(--font-size-<%-s%>)*var(--ff-scale)), <%-fontSize%>px);\r\n    <% } %>\r\n    <% \r\n      var minSizes = {'000':-.5, '00':-.25, 1:.25, 2:.5, 3:1, 4:1.25, 5:1.5, \r\n        6:1.75, 7:2, 8:3, 9:4, 10:5, 11:7.5, 12:10, 13:15, 14:20, 15:30};\r\n      for(var s in minSizes){\r\n        var size = Math.round(14*minSizes[s]*10)/10;\r\n    %>\r\n      --ff-size-<%-s%>:max(calc(var(--size-<%-s%>)*var(--ff-scale)), <%-size%>px);\r\n    <% } %>\r\n    --ff-font-size:var(--ff-font-size-1);\r\n    --ff-head-size:var(--ff-font-size-5);\r\n    --ff-font-small:var(--ff-font-size-0);\r\n    --ff-field-bgcolor:<%-field%>;\r\n    --ff-heading-font:<%-headfont?JSON.stringify(headfont):'inherit'%>;\r\n    --ff-paragraph-font:<%-parafont?JSON.stringify(parafont):'inherit'%>;\r\n  }\r\n  <% if(fac.enhance && fac.enhance.css){ %>\r\n    <%-fac.enhance.css%>\r\n  <% } %>\r\n  .ff-public-mode .ff-editwidget{ display:none !important; }\r\n  .ff-public-mode .ff-edittheme{ display:none !important; }\r\n  .ff-public-mode .ff-editsection{ display:none !important; }\r\n</style>\r\n\r\n<%\r\n  var fcitms = fac.items?Object.values(fac.items):[];\r\n  var fcfiles = fcitms.filter(function(itm){ return itm.type=='FILE_UPLOAD'; });\r\n  if(fcfiles.length>0){\r\n    var lng;\r\n    if(config && config.language) lng = config.language;\r\n    if(fac.setting && fac.setting.language) lng = fac.setting.language;\r\n    var loc = lng&&langtext?langtext.locale:null;\r\n    if(lng && loc)\r\n    {\r\n      loc = loc.indexOf('_')>0?loc:(lng+'_'+loc);\r\n      loadScript('https://releases.transloadit.com/uppy/v3.7.0/uppy.min.js', function(){\r\n        loadScript('https://releases.transloadit.com/uppy/locales/v3.0.7/'+loc+'.min.js', function(){ formFacade.renderUpload(loc); });\r\n      });\r\n    }\r\n    else\r\n    {\r\n      loadScript('https://releases.transloadit.com/uppy/v3.7.0/uppy.min.js', function(){ formFacade.renderUpload(loc); });\r\n    }\r\n%>\r\n    <link href=\"https://releases.transloadit.com/uppy/v3.7.0/uppy.min.css\" rel=\"stylesheet\">\r\n<% } %>\r\n\r\n<%\r\n  var hasFormEsign = fac && fac.formesign;\r\n  if(hasFormEsign) {\r\n    loadScript(\"https://cdn.jsdelivr.net/npm/signature_pad@4.0.5/dist/signature_pad.umd.min.js\", function(){ formFacade && formFacade.renderSignature(); });\r\n  }\r\n%>\r\n","text":"<%\r\n  var params = data.request.params;\r\n  var id = params.publishId;\r\n  var pubfrm = data.form||{};\r\n  var frm = data.scraped||{};\r\n  var fac = data.facade||{};\r\n  if(!fac.info) fac.info = {};\r\n  if(!fac.setting) fac.setting = {};\r\n  if(!fac.gpt) fac.gpt = {};\r\n  var frmitms = frm.items||{};\r\n  var fcitms = fac.items||{};\r\n  var unit = 'kg';\r\n  if(fac.setting.currencyCode=='USD')\r\n    unit = 'lb';\r\n  var enhance = fac.enhance||{};\r\n  var layout = enhance.layout||'default';\r\n  draft = draft||{};\r\n  if(!draft.entry) draft.entry = {};\r\n\r\n  var sections = getSections();\r\n  var reurl = 'https://formfacade.com/website/customize-google-forms.html?product=website';\r\n  if(fac.formesign)\r\n  {\r\n    if(fac.setting.parent)\r\n      reurl = 'https://hipaache.com/intake/create-intake-form.html?product=intake';\r\n    else\r\n      reurl = 'https://hipaache.com/esign/esignature-google-forms.html?product=esign';\r\n  }\r\n  else if(fac.formprefill)\r\n    reurl = 'https://hipaache.com/prefill/mail-merge-google-forms.html?product=prefill';\r\n  else if(fac.hipaache)\r\n    reurl = 'https://hipaache.com/care-assessment/create-assessment-form.html?product=care-assessment';\r\n  else if(fac.neartail || fac.whatsapp)\r\n    reurl = 'https://neartail.com/order-form/create-order-form.html?product=order-form';\r\n  else if(fac.scorecery)\r\n    reurl = 'https://formfacade.com/calculate/calculation-in-google-forms.html?product=calculate';\r\n  else if(fac.petaform)\r\n    reurl = 'https://formfacade.com/file-upload/upload-files-in-google-forms.html?product=file-upload';\r\n  reurl += '&utm_source=madewith&utm_medium='+params.userId+'&utm_campaign='+params.publishId;\r\n  reurl += '&plan='+(config.plan||'free')+'&userId='+params.userId;\r\n  if(frm.title) reurl += '&by='+encodeURIComponent(frm.title);\r\n\r\n  var trg = params.target;\r\n  var prepend = clnm=>trg=='bootstrap'||trg=='gsuite'||trg=='clean'?clnm:('rest-'+clnm);\r\n  var backlst = ['btn', 'btn-lg', 'btn-secondary'].map(cls=>prepend(cls));\r\n  var submitlst = ['btn', 'btn-lg', 'btn-primary'].map(cls=>prepend(cls));\r\n  if(isEditMode())\r\n  {\r\n    backlst.push('creator-blur');\r\n    submitlst.push('creator-blur');\r\n  }\r\n  var backcss = backlst.join(' ');\r\n  var submitcss = submitlst.join(' ');\r\n  var embeds = pubfrm.embeds||{};\r\n%>\r\n\r\n<%\r\n  var faclosed = enhance.closed=='on';\r\n  if(faclosed)\r\n  {\r\n    var urlparams = new URLSearchParams(window.location.search);\r\n    if(urlparams.get('ff-mode')=='preview') faclosed = false;\r\n  }\r\n  if(isEditMode()==false && faclosed)\r\n  {\r\n    frm = {title:frm.title, errorMessage: enhance.closedmsg||'This form is temporarily closed.'};\r\n    result = {code:-1};\r\n  }\r\n  if(frm.errorMessage){\r\n%>\r\n  <div class=\"ff-form ff-layout-default ff-form-error\">\r\n    <div class=\"ff-section\">\r\n      <% if(frm.title){ %>\r\n      <h3 class=\"ff-title\"><%-frm.title%></h3>\r\n      <% } %>\r\n      <div class=\"ff-description\">\r\n        <p><%-frm.errorMessage%></p>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <br/>\r\n<%\r\n  } else if(!frm.items){\r\n%>\r\n  <div class=\"ff-alert ff-message\">\r\n    This form is not publicly visible. It requires Google signin to submit form (or to upload files).\r\n    <a href=\"https://formfacade.com/faq/form-not-publicly-visible-fix.html\" target=\"_blank\">\r\n    Learn how to disable login to get it working</a>.\r\n    Or, write to formfacade@guesswork.co if you need help.\r\n  </div>\r\n  <br/>\r\n<% } else if(data.scraped.needsLogin==1){ %>\r\n  <div class=\"ff-alert ff-message\">\r\n    This form requires Google signin to submit form. So, it will show Google Form's page on submission.\r\n    Disable login for seamless user experience.\r\n    <a href=\"https://formfacade.com/faq/formfacade-redirects-to-google-forms-onsubmit-fix.html\" target=\"_blank\">Read more</a>.\r\n  </div>\r\n  <br/>\r\n<% } else if((data.scraped.emailAddress==1&&data.scraped.appendEmail>0) || (data.scraped.emailAddress==3&&data.scraped.appendEmail>0)){ %>\r\n  <div class=\"ff-alert ff-message\">\r\n    You have enabled <b>Response receipts</b>. Go to <b>Settings</b> > <b>General</b> > <b>Collect email addresses</b> > Disable <b>Response receipts</b>\r\n    (<a href=\"https://formfacade.com/faq/formfacade-redirects-to-google-forms-onsubmit-fix.html\" target=\"_blank\">Read more</a>).\r\n    Install \r\n    <a href=\"https://gsuite.google.com/marketplace/app/mailrecipe/496255709512\" target=\"_blank\">this addon</a>\r\n    instead.\r\n  </div>\r\n  <br/>\r\n<% } else if(data.scraped.verifiedEmail==2){ %>\r\n  <div class=\"ff-alert ff-message\">\r\n    This form requires Google  Sign-In to submit form. So, it will show error on submission.\r\n    Disable collect email addresses for seamless user experience.\r\n  </div>\r\n  <br/>\r\n<% } else if(fac.gpt.flag=='phishing'){ %>\r\n  <div class=\"ff-alert ff-message\">\r\n    This form has been flagged as malicious due to phishing attempt. \r\n    If you believe this is a mistake, please contact us at\r\n    <% if(fac.hipaache){ %>\r\n      support@hipaache.com\r\n    <% } else if(fac.neartail||fac.whatsapp){ %>\r\n      support@neartail.com\r\n    <% } else{ %>\r\n      support@formfacade.com\r\n    <% } %>.\r\n  </div>\r\n  <br/>\r\n<% } else if(result && result.code==200){ %>\r\n  <div class=\"ff-form ff-layout-<%-layout%> ff-<%-isEditMode()?'edit':'public'%>-mode\">\r\n    <div class=\"ff-section\">\r\n      <div class=\"ff-description\">\r\n      <% if(draft.waphone){ %>\r\n        <div id=\"ff-success\" class=\"ff-success\">\r\n          <%-lang('Press send on WhatsApp to confirm your response.')%>\r\n        </div>\r\n        <div id=\"ff-success-hide\" class=\"ff-success\" style=\"display:none;\">\r\n          <% if(result.messageMark){ %>\r\n            <%-computeField(result.messageMark)%>\r\n          <% } else if(result.messagePlain){ %>\r\n            <%-html(computeField(result.messagePlain))%>\r\n          <% } else{ %>\r\n            <%-html(data.scraped.message?computeField(data.scraped.message):lang('Your response has been recorded'))%>\r\n          <% } %>\r\n        </div>\r\n      <% } else if(result.messageMark){ %>\r\n        <div class=\"ff-success\">\r\n          <%-computeField(result.messageMark)%>\r\n        </div>\r\n      <% } else if(result.messagePlain){ %>\r\n        <div id=\"ff-success\" class=\"ff-success\">\r\n          <%-html(computeField(result.messagePlain))%>\r\n        </div>\r\n      <% } else{ %>\r\n        <div id=\"ff-success\" class=\"ff-success\">\r\n          <%-html(data.scraped.message?computeField(data.scraped.message):lang('Your response has been recorded'))%>\r\n        </div>\r\n      <% } %>\r\n      <% if(!config.plan){ %>\r\n        <div style=\"text-align:center; padding:10px 0px 20px 0px;\">\r\n          <button class=\"<%-submitcss%>\" onclick=\"location.href='<%-reurl%>';\">\r\n            Create your own form\r\n          </button>\r\n        </div>\r\n      <% } %>\r\n      </div>\r\n    </div>\r\n  </div>\r\n<% } else if(result){ %>\r\n  <div class=\"ff-alert ff-message\">\r\n    <%\r\n      var msg;\r\n      if(result.code==401)\r\n          msg = result.message+'. This form requires Google login. Please make it available to anonymous users.';\r\n      else\r\n          msg = result.message+'. Please fill the details correctly.';\r\n    %>\r\n    <%-msg%>\r\n  </div>\r\n  <br/>\r\n<% \r\n  } else if(draft.submitSeq>0){ \r\n    var mins = (new Date().getTime()-draft.submittedAt)/(1000*60);\r\n    mins = Math.round(mins);\r\n    var hrs = Math.round(mins/60);\r\n    var days = Math.round(hrs/24);\r\n    var ago = days>1?days:(hrs>1?hrs:mins);\r\n    var duration = days>1?'days':(hrs>1?'hours':'minutes');\r\n%>\r\n  <div class=\"ff-partial ff-message\">\r\n    <span><%-lang('This was submitted $ago $duration ago. You are editing #$id.', {ago, duration, id:draft.submitSeq})%></span>\r\n  </div>\r\n<% } else if(enhance.closed=='on'){ %>\r\n  <div class=\"ff-partial ff-message\">\r\n    <span><%-lang('This form is closed and is visible only in <b>PREVIEW</b> tab.')%></span>\r\n  </div>\r\n<% } else if(draft.ago && showago){ %>\r\n  <div class=\"ff-partial ff-message\">\r\n    <span><%-lang('You partially filled this form $ago minutes ago', {ago:draft.ago})%></span>\r\n    <span>\r\n      <a href=\"javascript:void(0)\" \r\n        onclick=\"formFacade.showago=false; formFacade.render();\"><%-lang('Continue')%></a>\r\n      <a href=\"javascript:void(0)\"\r\n        onclick=\"formFacade.showago=false; formFacade.prefill(); formFacade.render();\"><%-lang('Start over')%></a>\r\n    </span>\r\n  </div>\r\n<% } %>\r\n\r\n<%\r\n  var uploaditms = [];\r\n  if(fac.mapping)\r\n  {\r\n    var autocmpls = {name:'name', email:'email', address:'street-address', phone:'tel'};\r\n    for(var attr in fac.mapping)\r\n    {\r\n      var iid = fac.mapping[attr];\r\n      var itm = frmitms[iid];\r\n      var autonm = autocmpls[attr];\r\n      if(autonm && itm)\r\n        itm.autocomplete = autonm;\r\n    }\r\n  }\r\n  for(var fcitmid in fcitms)\r\n  {\r\n    var fcitm = fcitms[fcitmid];\r\n    if(fcitm.type=='FILE_UPLOAD' && frmitms[fcitmid])\r\n      uploaditms.push(fcitm);\r\n  }\r\n  var isFB = window.navigator?navigator.userAgent.match(/FB/):false;\r\n  var isIG = window.navigator?navigator.userAgent.match(/Instagram/):false;\r\n  var isAndroid = window.navigator?navigator.userAgent.match(/Android/i):false;\r\n  var isiPhone = window.navigator?navigator.userAgent.match(/iPhone/i):false;\r\n  if(uploaditms.length>0 && (isFB||isIG) && (isAndroid||isiPhone)){\r\n%>\r\n  <div class=\"ff-partial ff-message\">\r\n    This form will not work in <%-isIG?'Instagram':'Facebook'%> browser. Click on the three dots in the top-right corner > Open in Chrome/Safari.\r\n  </div>\r\n  <img src=\"https://formfacade.com/img/fb-upload-warn.png\" style=\"width:100%; height:auto;\">\r\n  <br/>\r\n<%\r\n  } else if(!result || result.code>200){\r\n%>\r\n  <form id=\"Publish<%-params.publishId%>\" \r\n  class=\"ff-form ff-layout-<%-layout%> ff-<%-isEditMode()?'edit':'public'%>-mode\" method=\"POST\" \r\n  action=\"https://docs.google.com/forms/u/1/d/e/<%-data.request.params.publishId%>/formResponse\">\r\n    <input type=\"hidden\" name=\"id\" value=\"<%-id%>\">\r\n    <input type=\"hidden\" name=\"pageHistory\" value=\"\">\r\n    <% if(draft.responseId){ %>\r\n    <input type=\"hidden\" name=\"responseId\" value=\"<%-draft.responseId%>\">\r\n    <% } %>\r\n    <% if(draft.consumerId){ %>\r\n    <input type=\"hidden\" name=\"consumerId\" value=\"<%-draft.consumerId%>\">\r\n    <% } %>\r\n    <% if(frm.form=='native'){ %>\r\n    <input type=\"hidden\" name=\"form\" value=\"native\">\r\n    <% } %>\r\n    <input type=\"hidden\" id=\"Payment<%-params.publishId%>\" name=\"paymentId\" value=\"\">\r\n    <input type=\"hidden\" id=\"PaymentData<%-params.publishId%>\" name=\"paymentData\" value=\"\">\r\n    <% \r\n      var item;\r\n      sections.forEach(function(sec,s){\r\n    %>\r\n    <div class=\"ff-section\" id=\"ff-sec-<%=sec.id%>\" \r\n      style=\"<%-isEditMode()?'display:block':(sec.id==draft.activePage?'display:block':'display:none')%>;\">\r\n      <%\r\n        var ttls = fac.titles?fac.titles:{};\r\n        var ttl = ttls[sec.id]?ttls[sec.id]:{};\r\n        var itmnxt = fac.next?fac.next[sec.id]:null;\r\n        var pgbrk = frm.items?frm.items[sec.id]:null;\r\n        var bannerimg = sec.id=='root'?frm.bgimage:null;\r\n        if(ttl.banner) bannerimg = ttl.banner;\r\n      %>\r\n      <% if(bannerimg){ %>\r\n        <img src=\"<%-switchCDN(bannerimg)%>\" class=\"ff-banner-image ff-image\"/>\r\n      <% } %>\r\n      <h3 class=\"ff-title\" id=\"ff-title-<%-sec.id%>\">\r\n        <%-ttl.title?html(computeField(ttl.title)):(sec.titleMark||html(sec.title))%>\r\n        <% if(isEditMode()){ %>\r\n          <% if(s==0){ %>\r\n            <i class=\"ff-customize material-icons\" onclick=\"editFacade.afterLoad('showCustomize')\">settings</i>\r\n          <% } else if(pgbrk && pgbrk.duplicate){ %>\r\n            <img src=\"/img/loading_gear.svg\" class=\"ff-editsection ff-waiting\"/>\r\n          <% } else{ %>\r\n            <i class=\"ff-editsection material-icons\" onclick=\"editFacade.afterLoad('showTitle', '<%-sec.id%>')\">settings</i>\r\n          <% } %>\r\n        <% } %>\r\n      </h3>\r\n      <%\r\n        var desc = sec.description?sec.description:(isEditMode()?'(No description)':null);\r\n        if(ttl.messageMark)\r\n        {\r\n      %>\r\n        <div class=\"ff-description mdViewer\" id=\"ff-desc-<%-sec.id%>\">\r\n          <%-switchAllCDN(computeField(ttl.messageMark))%>\r\n        </div>\r\n      <%\r\n        } else if(desc){ \r\n      %>\r\n      <div class=\"ff-description mdViewer\">\r\n        <p>\r\n          <%-switchAllCDN(sec.helpMark||html(desc))%>\r\n        </p>\r\n      </div>\r\n      <% } %>\r\n    <div class=\"ff-secfields\">\r\n    <% if(s==0 && data.scraped.appendEmail==1){%>\r\n      <div class=\"<%-prepend('form-group')%> ff-item ff-emailAddress\">\r\n          <label class=\"ff-item-qs\" for=\"WidgetemailAddress\"><%-lang('Email address')%> <span class=\"ff-required\">*</span></label>\r\n          <input type=\"email\" pattern=\"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}$\"\r\n            class=\"<%-prepend('form-control')%> ff-email-widget\" id=\"WidgetemailAddress\" name=\"emailAddress\" \r\n            value=\"<%=draft.emailAddress%>\" required>\r\n          <div id=\"ErroremailAddress\" class=\"ff-widget-error\"></div>\r\n      </div>\r\n    <% } %>\r\n    <%\r\n      var oitems = fac.items?fac.items:{};\r\n      splitHeaders(sec.headers).forEach(function(header, hdi){\r\n    %>\r\n      <% \r\n        if(header.head){ \r\n          item = header.head;\r\n          var ttls = fac.titles?fac.titles:{};\r\n          var ttl = ttls[item.id]?ttls[item.id]:{};\r\n          var oitem = oitems[item.id]?oitems[item.id]:{};\r\n      %>\r\n        <div class=\"<%-prepend('form-group')%> ff-item <%-oitem.mode=='hide'?(isEditMode()?'ff-edit-hide':'ff-hide'):''%> <%-item.outstock?'ff-head-outstock':''%> ff-section_header ff-full-width <%-item.hasNavigation?('ff-nav-dyn'):''%> <%-item.product?'ff-item-prd':'ff-item-noprd'%>\" id=\"ff-id-<%-item.id||item.outstock%>\">\r\n          <h4 class=\"ff-section-header\" id=\"ff-title-<%-item.id||item.outstock%>\">\r\n            <%-ttl.title?ttl.title:(item.titleMark||item.title)%>\r\n            <% if(isEditMode()){ %>\r\n              <% if(item.duplicate){ %>\r\n                <img src=\"/img/loading_gear.svg\" class=\"ff-editsection ff-waiting\"/>\r\n              <% } else if(item.id){ %>\r\n                <i class=\"ff-editsection material-icons\" onclick=\"editFacade.afterLoad('showTitle', '<%-item.id%>')\">settings</i>\r\n              <% } %>\r\n            <% } %>\r\n          </h4>\r\n          <%\r\n            var desc = item.help?item.help:(isEditMode()?'(No description)':null);\r\n            if(ttl.messageMark)\r\n            {\r\n          %>\r\n            <div class=\"ff-description mdViewer\" id=\"ff-desc-<%-item.id%>\">\r\n              <%-switchAllCDN(computeField(ttl.messageMark))%>\r\n            </div>\r\n          <%\r\n            } else if(desc){ \r\n          %>\r\n            <div class=\"ff-description mdViewer\">\r\n              <p>\r\n                <%-switchAllCDN(item.helpMark||html(desc))%>\r\n              </p>\r\n            </div>\r\n          <% } %>\r\n        </div>\r\n      <% } %>\r\n      <%\r\n        if(frm.shuffle)\r\n        {\r\n          var shufitms = header.items.filter(sh=>sh.type=='SECTION_HEADER');\r\n          var subshuf = header.items.filter(sh=>sh.type!='SECTION_HEADER');\r\n          header.items = shufitms.concat(shuffle(subshuf));\r\n        }\r\n        header.items.forEach(function(itm, itmi){\r\n          item = itm;\r\n          var itmval = draft.entry[item.entry];\r\n          var oitem = oitems[item.id]||{};\r\n          var getScoreHint = function(chi)\r\n          {\r\n            var scorelst = oitem.score||[];\r\n            var scoreval = scorelst[chi];\r\n            if(isEditMode() && isNaN(scoreval)==false)\r\n            {\r\n              var emojiscore = scoreval>=0?'+':'';\r\n              if(item.type=='LIST')\r\n              {\r\n                return ` (${emojiscore}${scoreval})`;\r\n              }\r\n              else\r\n              {\r\n                return `<span onclick=\"editFacade.afterLoad('showWidget', '${item.id}', 'pills-answer-tab')\"\r\n                class=\"ff-emoji-score\" title=\"Edit points\">${emojiscore}${scoreval}</span>`;\r\n              }\r\n            }\r\n            return '';\r\n          }\r\n          var outstock = oitem.inventory=='yes' && oitem.remain<=0;\r\n          var fftype = item.type?item.type.toLowerCase():'unknown';\r\n          if(oitem.type=='FILE_UPLOAD') fftype = 'file';\r\n          var fullwidgets = ['section_header', 'paragraph_text', 'multiple_choice', 'checkbox', 'grid', 'scale', 'file', 'image', 'video'];\r\n          var ffdisplay = fullwidgets.indexOf(fftype)>=0?'ff-full-width':'ff-part-width';\r\n          var onclick;\r\n          if(isEditMode())\r\n          {\r\n            if(item.product && hasCreator())\r\n              onclick = `onclick=\"editFacade.afterLoad('showProduct', '${item.id}')\"`;\r\n            else if(item.type == 'IMAGE')\r\n              onclick = `onclick=\"editFacade.afterLoad('showImage', '${item.id}')\"`;\r\n            else\r\n              onclick = `onclick=\"editFacade.afterLoad('showWidget', '${item.id}')\"`;\r\n          }\r\n          else\r\n          {\r\n            if(item.product && layout!='default')\r\n              onclick = 'onclick=\"formFacade.showProduct('+item.id+')\"';\r\n          }\r\n      %>\r\n        <div class=\"<%-prepend('form-group')%> ff-item <%-oitem.mode=='hide'?(isEditMode()?'ff-edit-hide':'ff-hide'):''%> <%-outstock?(isEditMode()?'ff-edit-outstock':'ff-outstock'):''%> ff-<%-fftype%> <%-ffdisplay%> <%-item.hasNavigation?('ff-nav-dyn'):''%> <%-item.product?'ff-item-prd':'ff-item-noprd'%>\" id=\"ff-id-<%-item.id%>\">\r\n          <% \r\n            if(!oitem.mode || oitem.mode=='edit' || oitem.mode=='read' || isEditMode()){ \r\n              var qsttl = oitem.title?html(computeField(oitem.title)):(item.titleMark||html(item.title));\r\n              var isqshtml = /<\\/?[a-z][\\s\\S]*>/i.test(qsttl);\r\n          %>\r\n            <label class=\"ff-item-qs <%-qsttl?(isqshtml?'ff-qs-html':''):'ff-qs-empty'%>\" for=\"Widget<%-item.id%>\">\r\n                <% if(isqshtml){ %>\r\n                  <div class=\"ff-qs-html-text\">\r\n                    <%-qsttl%>\r\n                  </div>\r\n                <% } else{ %>\r\n                  <%-qsttl%>\r\n                <% } %>\r\n                <% if(item.required){ %><span class=\"ff-required\">*</span> <% } %>\r\n                <% if(oitem.tag && isEditMode()){ %>\r\n                  <span onclick=\"editFacade.afterLoad('showWidget', '<%-item.id%>', 'pills-answer-tab')\"\r\n                  class=\"ff-emoji-score\" title=\"Edit category\">ğŸ�·ï¸� <%-oitem.tag%></span>\r\n                <% } %>\r\n                <% if(oitem.encrypt=='PHI' && isEditMode()){ %>\r\n                  ğŸ”’\r\n                <% } %>\r\n                <% if(item.duplicate && hasCreatorOrEditor()){ %>\r\n                  <img src=\"/img/loading_gear.svg\" class=\"ff-editwidget ff-waiting\"/>\r\n                <% } else if(item.product && hasCreator()){ %>\r\n                  <i <%-onclick%> class=\"ff-editwidget material-icons\">\r\n                    settings\r\n                  </i>\r\n                <% } else{ %>\r\n                  <i <%-onclick%> class=\"ff-editwidget material-icons\">\r\n                    settings\r\n                  </i>\r\n                <% } %>\r\n            </label>\r\n            <% if(oitem.price>=0){ %>\r\n              <small <%-onclick%> id=\"Price<%-item.id%>\" class=\"ff-price ff-help form-text\">\r\n                <% if(item.price && item.price.fullformat){ %>\r\n                  <s><%-item.price.fullformat%></s>\r\n                <% } %>\r\n                <% if(oitem.price==0 && item.price && item.price.minformat){ %>\r\n                  <%-lang('From $minprice', {minprice:item.price.minformat})%>\r\n                <% } else{ %>\r\n                  <%-oitem.helpMark%>\r\n                <% } %>\r\n                <% if(oitem.measure=='Weight'){ %>\r\n                  <%-lang('per')%> <%-unit%>\r\n                <% } %>\r\n              </small>\r\n            <% } else if(oitem.helpMark){ %>\r\n              <% if(oitem.helpMark.indexOf('${')>=0){ %>\r\n                <small <%-onclick%> id=\"Help<%-item.id%>\" class=\"ff-help form-text mdViewer\">\r\n                  <%-switchAllCDN(computeField(oitem.helpMark, item))%>\r\n                </small>\r\n              <% } else{ %>\r\n                <small <%-onclick%> id=\"Static<%-item.id%>\" class=\"ff-help form-text mdViewer\">\r\n                  <%-switchAllCDN(oitem.helpMark)%>\r\n                </small>\r\n              <% } %>\r\n            <% } else if(item.help){ %>\r\n              <small <%-onclick%> id=\"Static<%-item.id%>\" class=\"ff-help form-text mdViewer\"><%-switchAllCDN(item.helpMark||item.help)%></small>\r\n            <% } else{ %>\r\n              <small <%-onclick%> id=\"Static<%-item.id%>\" class=\"ff-help-empty ff-help form-text mdViewer\"></small>\r\n            <% } %>\r\n            <% if(oitem.prddetailMark){ %>\r\n              <div <%-onclick%> id=\"Detail<%-item.id%>\" class=\"ff-detail form-text mdViewer\">\r\n                <%-switchAllCDN(oitem.prddetailMark)%>\r\n              </div>\r\n            <% } %>\r\n            <% \r\n              var ttlimg;\r\n              if(oitem.prdimage)\r\n                ttlimg = switchCDN(oitem.prdimage);\r\n              else if(item.titleImage){\r\n                ttlimg = 'https://formfacade.com/itemimg/'+params.publishId+'/item/'+item.id+'/title/'+item.titleImage.blob;\r\n                if(item.titleImage.image) {\r\n                  ttlimg = `https://formfacade.com/itemload/item/${encode(item.titleImage.image)}`;\r\n                }\r\n              } else if(item.product)\r\n                ttlimg = item.duplicate?'/img/waiting.svg':'https://formfacade.com/img/image-not-found.png';\r\n              if(ttlimg){ \r\n            %>\r\n              <img src=\"<%-ttlimg%>\" alt=\"<%=s>0&&isEditMode()?'Use preview to see this image':item.title%>\"\r\n                <% if(item.product){ %>\r\n                  <%-onclick%>\r\n                <% } else if(item.titleImage && item.titleImage.size){ %>\r\n                  style=\"width:<%-item.titleImage.size.width%>px;  \r\n                  <% if(item.titleImage.size.align){ %> \r\n                    margin-left:<%-item.titleImage.size.align==0?'0px':'auto'%>; margin-right:<%-item.titleImage.size.align==2?'0px':'auto'%>;\r\n                  <% } %>\r\n                  max-width:100%; height:auto;\"\r\n                <% } %>\r\n                class=\"ff-title-image ff-image <%-oitem.prdimage||item.titleImage?'ff-image-found':'ff-image-not-found'%>\"/>\r\n            <% } %>\r\n          <% } %>\r\n          <% if(oitem.mode=='hide' && item.entry && isEditMode()==false){ %>\r\n            <input type=\"hidden\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\" value=\"<%=itmval%>\">\r\n          <% } else if(oitem.mode=='read' || oitem.calculated){ %>\r\n            <% if(item.type=='PARAGRAPH_TEXT'){ %>\r\n              <textarea class=\"ff-widget-control ff-readonly <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\"\r\n                rows=\"3\" readonly><%-itmval%></textarea>\r\n            <% } else if(item.type=='DATE'){ %>\r\n              <input type=\"text\" class=\"ff-widget-control ff-readonly <%-prepend('form-control')%>\" id=\"Display<%-item.id%>\" value=\"<%=itmval%>\" readonly <%-item.required?'required':''%>>\r\n              <input type=\"hidden\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\" value=\"<%=itmval%>\">\r\n            <% } else{ %>\r\n              <input type=\"text\" class=\"ff-widget-control ff-readonly <%-prepend('form-control')%>\" id=\"Display<%-item.id%>\" value=\"<%=itmval%>\" readonly <%-item.required?'required':''%>>\r\n              <input type=\"hidden\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\" value=\"<%=itmval%>\">\r\n            <% } %>\r\n          <% } else if(oitem.type=='FILE_UPLOAD' && oitem.subtype=='SIGNATURE'){ %>\r\n            <input type=\"hidden\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\" value=\"<%=itmval%>\">\r\n            <div id=\"Display<%-item.id%>\" class=\"ff-widget-control ff-signature\" data-entry=\"<%-item.entry%>\" data-id=\"<%-item.id%>\">\r\n              <canvas id=\"esign_<%-item.id%>\" class=\"esign_canvas\" width=\"450\" height=\"200\"></canvas>\r\n              <hr>\r\n              <span class=\"sign_clear\" onclick=\"formFacade.clearSignature('<%-item.id%>','<%-item.entry%>')\">Clear</span>\r\n            </div>\r\n          <% } else if(oitem.type=='FILE_UPLOAD'){ %>\r\n            <input type=\"hidden\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\" value=\"<%=itmval%>\">\r\n            <div id=\"Display<%-item.id%>\" class=\"ff-widget-control ff-file-upload\" \r\n              data-files=\"<%=itmval%>\" data-entry=\"<%-item.entry%>\" data-id=\"<%-item.id%>\">\r\n            </div>\r\n          <% } else if(item.type=='TEXT'){ %>\r\n            <% if(item.validOperator=='Email'){ %>\r\n              <input type=\"email\" pattern=\"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}$\"\r\n                class=\"ff-widget-control <%-prepend('form-control')%> ff-email-widget\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\"\r\n                <% if(item.autocomplete=='email'){ %> \r\n                  autocomplete=\"<%-item.autocomplete%>\" autocorrect=\"off\" spellcheck=\"false\"\r\n                <% } %>\r\n            <% } else{ %>\r\n              <input type=\"text\" class=\"ff-widget-control <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\"\r\n                <% if(item.autocomplete){ %> \r\n                  autocomplete=\"<%-item.autocomplete%>\" autocorrect=\"off\" spellcheck=\"false\"\r\n                <% } %>\r\n            <% } %>\r\n            <% if(item.autocomplete=='email' && fac.hipaache && fac.mapping && fac.mapping.score){ %>\r\n              onchange=\"formFacade.getHistory(this.value)\"\r\n            <% } %>\r\n            value=\"<%=itmval%>\" placeholder=\"<%=oitem.placeholder%>\" <%-item.required?'required':''%>>\r\n          <% } else if(item.type=='PARAGRAPH_TEXT'){ %>\r\n            <textarea class=\"ff-widget-control <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\"\r\n              <% if(item.autocomplete){ %> \r\n                autocomplete=\"<%-item.autocomplete%>\" autocorrect=\"off\" spellcheck=\"false\"\r\n              <% } %>\r\n              placeholder=\"<%=oitem.placeholder%>\" <%-item.required?'required':''%> rows=\"3\"><%-itmval%></textarea>\r\n          <% } else if(item.type=='LIST'){ %>\r\n            <% var chs = item.choices?item.choices:[] %>\r\n            <% if(chs.length<=200){ %>\r\n              <select class=\"ff-widget-control <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" \r\n                name=\"entry.<%-item.entry%>\" <%-item.required?'required':''%>>\r\n              <option value=\"\">- <%-oitem.placeholder?oitem.placeholder:lang('Choose')%> -</option>\r\n              <% chs.forEach(function(ch, chi){ %>\r\n                <option <%-itmval==ch.value?'selected':''%> value=\"<%=ch.value%>\"><%-ch.value%><%-getScoreHint(chi)%></option>\r\n              <% }) %>\r\n              </select>\r\n            <% } else { %>\r\n              <input type=\"text\" class=\"ff-widget-control <%-prepend('form-control')%> ff-long-list\" id=\"Widget<%-item.id%>\" name=\"entry.<%-item.entry%>\"\r\n                value=\"<%=itmval%>\" <%-item.required?'required':''%> list=\"List<%-item.id%>\" autocomplete=\"off\"\r\n                onkeypress=\"return event.keyCode!=13;\">\r\n              <datalist id=\"List<%-item.id%>\" class=\"ff-datalist\">\r\n              <% chs.forEach(function(ch){ %>\r\n                <option><%-ch.value%></option>\r\n              <% }) %>\r\n              </datalist>\r\n            <% } %>\r\n          <% } else if(item.type=='CHECKBOX'){ %>\r\n            <% \r\n              var chs = filter(item.choices);\r\n              if(item.shuffle)\r\n              {\r\n                var lst = chs[chs.length-1].value?null:chs.pop();\r\n                chs = shuffle(chs);\r\n                if(lst) chs.push(lst);\r\n              }\r\n              var chsels = itmval?(Array.isArray(itmval)?itmval:[itmval]):[];\r\n              var chimgblobs = chs.filter(function(ch){ return ch.blob });\r\n              var chimgs = chs.filter(function(ch){ return ch.image });\r\n            %>\r\n            <% if(chimgblobs.length>0 || chimgs.length > 0){ %> \r\n              <div class=\"ff-widget-control ff-check-table\">\r\n                <% chs.forEach(function(ch, chi){ %>\r\n                  <% \r\n                      if(ch.value)\r\n                      {\r\n                        var imgSrc; var imgTempStyle;\r\n                        if(ch.image) {\r\n                          imgSrc = `https://formfacade.com/itemload/item/${encode(ch.image+'=w260')}`; // load google image\r\n                          if(ch.image.indexOf('neartail.com')>0){\r\n                            imgSrc = ch.image;\r\n                            imgTempStyle = 'max-width: 260px;'\r\n                          }\r\n                        } else if(chimgblobs[chi]) {\r\n                          imgSrc = `https://formfacade.com/itemimg/${params.publishId}/item/${item.id}/choice/${chimgblobs[chi].blob}`;\r\n                        }\r\n                    %>\r\n                    <div class=\"ff-form-check ff-check-cell\">\r\n                      <% if(imgSrc){ %>\r\n                      <img class=\"ff-check-cell-image\" \r\n                        onclick=\"formFacade.getDocument().getElementById('entry.<%-item.entry%>.<%=ch.value%>').click()\"\r\n                        alt=\"<%-s>0&&isEditMode()?'Use preview to see this image':''%>\"\r\n                        style=\"<%-imgTempStyle?imgTempStyle:''%>\"\r\n                        src=\"<%-imgSrc%>\"/>\r\n                      <% } %>\r\n                      <input class=\"ff-form-check-input\" type=\"checkbox\" name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.<%=ch.value%>\" \r\n                        <%-chsels.indexOf(ch.value)>=0?'checked':''%> value=\"<%=ch.value%>\">\r\n                      <label class=\"ff-form-check-label\" for=\"entry.<%-item.entry%>.<%=ch.value%>\">\r\n                        <%-ch.value%><%-getScoreHint(chi)%>\r\n                      </label>\r\n                    </div>\r\n                  <% } else{ %>\r\n                    <div class=\"ff-form-check ff-form-check-other\">\r\n                      <input class=\"ff-form-check-input\" type=\"checkbox\" <%=draft.entry[item.entry+'-other_option_response']?'checked':''%>\r\n                        name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.other_option_response\" value=\"__other_option__\">\r\n                      <input class=\"<%-prepend('form-control')%>\" type=\"text\" name=\"entry.<%-item.entry%>.other_option_response\"\r\n                        value=\"<%=draft.entry[item.entry+'-other_option_response']%>\" placeholder=\"<%=oitem.placeholder?oitem.placeholder:'Other'%>\"\r\n                        onchange=\"document.getElementById(this.name).checked=true\"/>\r\n                    </div>\r\n                  <% } %>\r\n                <% }) %>\r\n              </div>\r\n            <% } else{ %>\r\n              <div class=\"ff-widget-control ff-check-table <%-item.wrap?'ff-wrap-choices':''%>\">\r\n              <% chs.forEach(function(ch, chi){ %>\r\n                <% if(ch.value){%>\r\n                <div class=\"ff-form-check\">\r\n                  <input class=\"ff-form-check-input\" type=\"checkbox\" name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.<%=ch.value%>\" \r\n                    <%-chsels.indexOf(ch.value)>=0?'checked':''%> value=\"<%=ch.value%>\">\r\n                  <label class=\"ff-form-check-label\" for=\"entry.<%-item.entry%>.<%=ch.value%>\">\r\n                    <%-ch.value%><%-getScoreHint(chi)%>\r\n                  </label>\r\n                </div>\r\n                <% } else{ %>\r\n                  <div class=\"ff-form-check ff-form-check-other\">\r\n                    <input class=\"ff-form-check-input\" type=\"checkbox\" <%=draft.entry[item.entry+'-other_option_response']?'checked':''%>\r\n                      name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.other_option_response\" value=\"__other_option__\">\r\n                    <input class=\"<%-prepend('form-control')%>\" type=\"text\" name=\"entry.<%-item.entry%>.other_option_response\"\r\n                      value=\"<%=draft.entry[item.entry+'-other_option_response']%>\" placeholder=\"<%=oitem.placeholder?oitem.placeholder:'Other'%>\"\r\n                      onchange=\"document.getElementById(this.name).checked=true\"/>\r\n                  </div>\r\n                <% } %>\r\n              <% }) %>\r\n              </div>\r\n            <% } %>\r\n            <input type=\"hidden\" name=\"entry.<%-item.entry%>_sentinel\" title=\"<%=item.title%>\" class=\"<%-item.required?'ff-check-required':''%>\"/>\r\n          <% } else if(item.type=='MULTIPLE_CHOICE'){ %>\r\n            <% \r\n              var chs = filter(item.choices);\r\n              if(item.shuffle)\r\n              {\r\n                var lst = chs[chs.length-1].value?null:chs.pop();\r\n                chs = shuffle(chs);\r\n                if(lst) chs.push(lst);\r\n              }\r\n              var chsels = itmval?(Array.isArray(itmval)?itmval:[itmval]):[];\r\n              var chimgblobs = chs.filter(function(ch){ return ch.blob });\r\n              var chimgs = chs.filter(function(ch){ return ch.image });\r\n            %>\r\n            <% if(chimgblobs.length>0 || chimgs.length > 0){ %> \r\n              <div class=\"ff-widget-control ff-check-table\">\r\n                <% chs.forEach(function(ch, chi){ %>\r\n                  <% \r\n                    if(ch.value)\r\n                    {\r\n                      var imgSrc;\r\n                      if(ch.image) {\r\n                        imgSrc = `https://formfacade.com/itemload/item/${encode(ch.image+'=w260')}`; // load google image\r\n                        if(ch.image.indexOf('neartail.com')>0)\r\n                          imgSrc = ch.image;\r\n                      } else if(chimgblobs[chi]) {\r\n                        imgSrc = `https://formfacade.com/itemimg/${params.publishId}/item/${item.id}/choice/${chimgblobs[chi].blob}`;\r\n                      }\r\n                  %>\r\n                    <div class=\"ff-form-check ff-check-cell\">\r\n                      <% if(imgSrc){ %>\r\n                        <img class=\"ff-check-cell-image\" \r\n                          onclick=\"formFacade.getDocument().getElementById('entry.<%-item.entry%>.<%=ch.value%>').click();\"\r\n                          alt=\"<%-s>0&&isEditMode()?'Use preview to see this image':''%>\"\r\n                          src=\"<%-imgSrc%>\"\r\n                        />\r\n                      <% } %>\r\n                      <input class=\"ff-form-check-input\" type=\"radio\" name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.<%=ch.value%>\" \r\n                        onclick=\"entr=<%-item.entry%>; if(formFacade.draft.entry[entr]==this.value){ delete formFacade.draft.entry[entr]; this.checked=false; formFacade.saveDraft(); }\"\r\n                        <%-chsels.indexOf(ch.value)>=0?'checked':''%> value=\"<%=ch.value%>\" <%-item.required?'required':''%>>\r\n                      <label class=\"ff-form-check-label\" for=\"entry.<%-item.entry%>.<%=ch.value%>\">\r\n                        <%-ch.value%><%-getScoreHint(chi)%>\r\n                      </label>\r\n                    </div>\r\n                  <% } else{ %>\r\n                    <div class=\"ff-form-check ff-form-check-other\">\r\n                      <input class=\"ff-form-check-input\" type=\"radio\" <%=draft.entry[item.entry+'-other_option_response']?'checked':''%>\r\n                        onclick=\"entr=<%-item.entry%>; if(formFacade.draft.entry[entr]==this.value){ delete formFacade.draft.entry[entr]; this.checked=false; formFacade.saveDraft(); }\"\r\n                        name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.other_option_response\" value=\"__other_option__\">\r\n                      <input class=\"<%-prepend('form-control')%>\" type=\"text\" name=\"entry.<%-item.entry%>.other_option_response\"\r\n                        value=\"<%=draft.entry[item.entry+'-other_option_response']%>\" placeholder=\"<%=oitem.placeholder?oitem.placeholder:'Other'%>\"\r\n                        onchange=\"document.getElementById(this.name).checked=true\"/>\r\n                    </div>\r\n                  <% } %>\r\n                <% }) %>\r\n              </div>\r\n            <% } else{ %>\r\n              <div class=\"ff-widget-control ff-check-table <%-item.wrap?'ff-wrap-choices':''%>\">\r\n              <% chs.forEach(function(ch, chi){ %>\r\n                <% if(ch.value){ %>\r\n                  <div class=\"ff-form-check\">\r\n                    <input class=\"ff-form-check-input\" type=\"radio\" name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.<%=ch.value%>\" \r\n                      onclick=\"entr=<%-item.entry%>; if(formFacade.draft.entry[entr]==this.value){ delete formFacade.draft.entry[entr]; this.checked=false; formFacade.saveDraft(); }\"\r\n                      <%-chsels.indexOf(ch.value)>=0?'checked':''%> value=\"<%=ch.value%>\" <%-item.required?'required':''%>>\r\n                    <label class=\"ff-form-check-label\" for=\"entry.<%-item.entry%>.<%=ch.value%>\">\r\n                      <%-ch.value%><%-getScoreHint(chi)%>\r\n                    </label>\r\n                  </div>\r\n                <% } else{ %>\r\n                  <div class=\"ff-form-check ff-form-check-other\">\r\n                    <input class=\"ff-form-check-input\" type=\"radio\" <%=draft.entry[item.entry+'-other_option_response']?'checked':''%>\r\n                        onclick=\"entr=<%-item.entry%>; if(formFacade.draft.entry[entr]==this.value){ delete formFacade.draft.entry[entr]; this.checked=false; formFacade.saveDraft(); }\"\r\n                        name=\"entry.<%-item.entry%>\" id=\"entry.<%-item.entry%>.other_option_response\" value=\"__other_option__\">\r\n                    <input class=\"<%-prepend('form-control')%>\" type=\"text\" name=\"entry.<%-item.entry%>.other_option_response\"\r\n                      value=\"<%=draft.entry[item.entry+'-other_option_response']%>\" placeholder=\"<%=oitem.placeholder?oitem.placeholder:'Other'%>\"\r\n                      onchange=\"document.getElementById(this.name).checked=true\"/>\r\n                  </div>\r\n                <% } %>\r\n              <% }) %>\r\n              </div>\r\n            <% } %>\r\n          <% } else if(item.type=='SCALE'){ %>\r\n            <% var chs = filter(item.choices) %>\r\n            <table class=\"ff-widget-control\">\r\n              <col width=\"<%-Math.round(100/(chs.length+2))%>%\">\r\n              <% chs.forEach(function(ch){ %>\r\n                <col width=\"<%-Math.round(100/(chs.length+2))%>%\">\r\n              <% }) %>\r\n              <col width=\"*\">\r\n            <tr>\r\n              <td></td>\r\n              <% chs.forEach(function(ch, chi){ %>\r\n                <td class=\"text-center\"><%-ch.value%><%-getScoreHint(chi)%></td>\r\n              <% }) %>\r\n              <td></td>\r\n            </tr>\r\n            <tr>\r\n              <td class=\"text-center\">\r\n                <%-item.scaleMin?item.scaleMin:''%>\r\n              </td>\r\n              <% chs.forEach(function(ch){ %>\r\n                <td class=\"text-center\">\r\n                  <input class=\"ff-scale\" type=\"radio\" name=\"entry.<%-item.entry%>\" \r\n                    <%-item.required?'required':''%> <%-itmval==ch.value?'checked':''%> id=\"entry.<%-item.entry%>.<%=ch.value%>\" value=\"<%=ch.value%>\">\r\n                </td>\r\n              <% }) %>\r\n              <td class=\"text-center\">\r\n                <%-item.scaleMax?item.scaleMax:''%>\r\n              </td>\r\n            </tr>\r\n            </table>\r\n          <% } else if(item.type=='GRID'){ %>\r\n            <% var chs = filter(item.choices) %>\r\n            <table class=\"ff-widget-control\">\r\n              <col width=\"*\">\r\n            <% chs.forEach(function(ch, chi){ %>\r\n              <col width=\"<%-Math.round(70/chs.length)%>%\">\r\n            <% }) %>\r\n            <tr>\r\n            <td></td>\r\n            <% chs.forEach(function(ch, chi){ %>\r\n              <td class=\"text-center\"><%-ch.value%><%-getScoreHint(chi)%></td>\r\n            <% }) %>\r\n            </tr>\r\n            <% item.rows.forEach(function(rw){ if(rw.multiple==1){ %>\r\n              <input type=\"hidden\" name=\"entry.<%-rw.entry%>_sentinel\"/>\r\n            <% } }) %>\r\n            <% \r\n              item.rows.forEach(function(rw, rwi){ \r\n                var rvals = draft.entry[rw.entry];\r\n                rvals = Array.isArray(rvals)?rvals:[rvals];\r\n            %>\r\n              <tr>\r\n              <td class=\"ff-grid-label\"><%-rw.value%></td>\r\n              <% chs.forEach(function(ch, chi){ %>\r\n              <td class=\"text-center\"><input class=\"ff-grid-<%-rw.multiple==1?'checkbox':'radio'%> ff-grid-<%-item.entry%> ff-grid-<%-item.entry%>-row-<%-rwi%> ff-grid-<%-item.entry%>-col-<%-chi%> <%-item.onepercol?'ff-grid-onepercol':''%>\" type=\"<%-rw.multiple==1?'checkbox':'radio'%>\" name=\"entry.<%-rw.entry%>\" \r\n                    <%=rvals.indexOf(ch.value)>=0?'checked':''%> id=\"entry.<%-rw.entry%>.<%=ch.value%>\" value=\"<%=ch.value%>\" \r\n                    <% if(!rw.multiple){ %>\r\n                    onclick=\"entr=<%-rw.entry%>; if(formFacade.draft.entry[entr]==this.value){ delete formFacade.draft.entry[entr]; this.checked=false; formFacade.saveDraft(); }\"\r\n                    <% } %>\r\n                    <%-rw.multiple==0&&item.required?'required':''%>\r\n                    ></td>\r\n              <% }) %>\r\n              </tr>\r\n            <% }) %>\r\n            </table>\r\n          <% } else if(item.type=='IMAGE'){ %>\r\n            <% \r\n              var imageSrc;\r\n              if(!item.blob && item.image)\r\n                imageSrc = `https://formfacade.com/itemload/item/${encode(item.image)}`;\r\n              else\r\n                imageSrc =  `https://formfacade.com/itemembed/${params.publishId}/item/${item.id}/image/${item.blob}`;\r\n            %>\r\n            <img\r\n            <% if(data.util && data.util.getPlaceholder){ %>\r\n              src=\"<%-data.util.getPlaceholder(item.size)%>\" data-src=\"<%-imageSrc%>\"\r\n            <% } else{ %>\r\n              src=\"<%-imageSrc%>\" \r\n            <% } %>\r\n            alt=\"<%=itm.title?itm.title:(header.title?header.title:sec.title)%>\"\r\n            <% if(item.size){ %>\r\n              style=\"width:<%-item.size.width%>px;\r\n              <% if(item.size.align){ %> \r\n                margin-left:<%-item.size.align==0?'0px':'auto'%>; margin-right:<%-item.size.align==2?'0px':'auto'%>;\r\n              <% } %>\r\n              max-width:100%; height:auto;\"\r\n            <% } %>\r\n            class=\"lazyload ff-widget-control ff-full-image ff-image\" id=\"Widget<%-item.id%>\"/>\r\n          <% } else if(item.type=='VIDEO'){ %>\r\n            <div class=\"ff-widget-control ff-embed-responsive\">\r\n              <iframe class=\"ff-embed-responsive-item ff-video\" allowfullscreen\r\n                src=\"https://formfacade.com/itemembed/<%-params.publishId%>/item/<%-item.id%>/video/<%-item.blob?item.blob:'unknown'%>\"></iframe>\r\n            </div>\r\n          <% } else if(item.type=='DATE'){ %>\r\n            <% \r\n              var dates = getMinMaxDate(item, oitem);\r\n              var minDate = dates[0];\r\n              var maxDate = dates[1];\r\n            %>\r\n            <% if(item.time==1){ %>\r\n              <input type=\"datetime-local\" class=\"ff-widget-control <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" \r\n                name=\"entry.<%-item.entry%>\" <%-item.required?'required':''%> value=\"<%=itmval%>\"\r\n                onBlur=\"if(event.target.value) event.target.value=event.target.value.substr(0, 16)\"\r\n                placeholder=\"yyyy-mm-ddTHH:mm\" pattern=\"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}\" min=\"<%-minDate%>\" max=\"<%-maxDate%>\">\r\n            <% } else{ %>\r\n              <input type=\"date\" class=\"ff-widget-control <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" \r\n                name=\"entry.<%-item.entry%>\" <%-item.required?'required':''%> value=\"<%=itmval%>\"\r\n                placeholder=\"yyyy-mm-dd\" pattern=\"[0-9]{4}-[0-9]{2}-[0-9]{2}\" min=\"<%-minDate%>\" max=\"<%-maxDate%>\">\r\n            <% }  %>\r\n          <% } else if(item.type=='TIME'){ %>\r\n            <input type=\"time\" class=\"ff-widget-control <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" \r\n              name=\"entry.<%-item.entry%>\" <%-item.required?'required':''%> value=\"<%=itmval%>\">\r\n          <% } else if(item.type=='SECTION_HEADER'){ %>\r\n          <% } else { %>\r\n            <input type=\"text\" class=\"ff-widget-control <%-prepend('form-control')%>\" id=\"Widget<%-item.id%>\" \r\n              name=\"entry.<%-item.entry%>\" <%-item.required?'required':''%> value=\"<%=itmval%>\">\r\n          <% } %>\r\n          <% \r\n            if(item.product){ \r\n              var cartsm;\r\n              if(item.type=='GRID')\r\n              {\r\n                var rws = item.rows?item.rows:[];\r\n                var rwvals = rws.map(function(rw, rwi){\r\n                    var rwval = draft.entry[rw.entry];\r\n                    if(!rwval) return;\r\n                    if(Array.isArray(rwval))\r\n                      return rw.value+' : '+rwval.join(', ');\r\n                    else if(isNaN(rwval))\r\n                      return rw.value+' : '+rwval;\r\n                    else\r\n                      return rw.value+' x <b>'+rwval+'</b>';\r\n                }).filter(rwval=>rwval);\r\n                if(rwvals.length>0)\r\n                  cartsm = rwvals.map(ln=>'<div class=\"ff-sm-line\">'+ln+'</div>').join('\\n');\r\n              }\r\n              else if(itmval && item.type=='PARAGRAPH_TEXT')\r\n              {\r\n                var rws = [];\r\n                var cfg = toConfigurable(itmval);\r\n                for(var vid in cfg.lineItem)\r\n                {\r\n                  var qty = cfg.lineItem[vid];\r\n                  var vrn = oitem.variants?oitem.variants[vid]:null;\r\n                  var vrnm = vrn?vrn.name:vid;\r\n                  rws.push(vrnm+' x <b>'+qty+'</b>');\r\n                }\r\n                if(rws.length>0)\r\n                  cartsm = rws.map(ln=>'<div class=\"ff-sm-line\">'+ln+'</div>').join('\\n');\r\n              }\r\n              else if(itmval)\r\n              {\r\n                if(Array.isArray(itmval))\r\n                {\r\n                  cartsm = itmval.filter(vl=>vl).join(' | ');\r\n                }\r\n                else if(isNaN(itmval))\r\n                {\r\n                  cartsm = itmval;\r\n                }\r\n                else\r\n                {\r\n                  var frmtval = oitem&&oitem.measure=='Weight'?formatWeight(itmval):itmval;\r\n                  cartsm = 'x <b>'+frmtval+'</b>';\r\n                }\r\n              }\r\n          %>\r\n            <% if(cartsm){ %>\r\n              <div <%-onclick%> class=\"ff-add-cart\">\r\n                <span class=\"material-icons\">add_shopping_cart</span>\r\n              </div>\r\n              <div <%-onclick%> class=\"ff-sel-cart\">\r\n                <div class=\"ff-sel-cart-sm\"><%-cartsm%></div>\r\n              </div>\r\n            <% } else if(oitem.inventory=='yes' && oitem.remain<=0){ %>\r\n              <div <%-onclick%> class=\"ff-add-cart\">\r\n                <span class=\"material-icons\">add_shopping_cart</span>\r\n              </div>\r\n              <div <%-onclick%> class=\"ff-sel-cart\">\r\n                <div class=\"ff-sel-cart-sm\"><%-lang('Out of stock')%></div>\r\n              </div>\r\n            <% } else{ %>\r\n              <div <%-onclick%> class=\"ff-add-cart\">\r\n                <span class=\"material-icons\">add_shopping_cart</span>\r\n              </div>\r\n            <% } %>\r\n            <%\r\n              if(layout=='default' && item.type=='PARAGRAPH_TEXT'){\r\n                var cfg = toConfigurable(itmval);\r\n                var multisel = oitem.multiselect=='yes';\r\n                var vrns = oitem.variants||{};\r\n                var ochs = oitem.choices||[];\r\n                if(ochs.length==1){\r\n                  var isradio = !multisel&&Object.keys(vrns).length>1;\r\n            %>\r\n                <div class=\"ff-widget-control ff-check-table\">\r\n                <%\r\n                  var och = ochs[0];\r\n                  for(var vid in vrns){ \r\n                    var ovrn = vrns[vid]||{};\r\n                    var vsel = cfg.lineItem[vid];\r\n                %>\r\n                  <div class=\"ff-form-check\">\r\n                    <input class=\"ff-form-check-input\" type=\"<%-isradio?'radio':'checkbox'%>\" name=\"variant.<%-item.entry%>\" id=\"variant.<%-item.entry%>.<%-vid%>\" \r\n                      <% if(isradio){ %>\r\n                      onclick=\"var cfg = formFacade.toConfigurable(document.getElementById('Widget<%-item.id%>').value); if(cfg.lineItem[<%-vid%>]){ this.checked=false; formFacade.saveDraft(event); }\"\r\n                      <% }%>\r\n                      <%-vsel?'checked':''%> value=\"<%=ovrn.name%> | <%-vid%> * <%-och%>\">\r\n                    <label class=\"ff-form-check-label\" for=\"variant.<%-item.entry%>.<%-vid%>\">\r\n                      <%-ovrn.display||ovrn.name%>\r\n                    </label>\r\n                  </div>\r\n                <% } %>\r\n                </div>\r\n            <% \r\n                }\r\n                else\r\n                {\r\n            %>\r\n                <table class=\"ff-widget-control\">\r\n                  <col width=\"*\">\r\n                <% ochs.forEach(function(ch){ %>\r\n                  <col width=\"<%-Math.round(70/ochs.length)%>%\">\r\n                <% }) %>\r\n                <tr>\r\n                <td></td>\r\n                <% ochs.forEach(function(ch){ %>\r\n                  <td class=\"text-center\"><%-ch%></td>\r\n                <% }) %>\r\n                </tr>\r\n                <% \r\n                  for(var vid in vrns){ \r\n                    var ovrn = vrns[vid]||{};\r\n                    var vsel = cfg.lineItem[vid];\r\n                %>\r\n                  <tr>\r\n                  <td class=\"ff-grid-label\"><%-ovrn.display||ovrn.name%></td>\r\n                  <% ochs.forEach(function(ch, chi){ %>\r\n                  <td class=\"text-center\"><input class=\"ff-grid-<%-multisel?'checkbox':'radio'%> ff-grid-<%-item.entry%> ff-grid-<%-item.entry%>-row-<%-vid%> ff-grid-<%-item.entry%>-col-<%-chi%>\" type=\"radio\" name=\"variant.<%-item.entry%><%-multisel?('.'+vid):''%>\"\r\n                      onclick=\"var cfg = formFacade.toConfigurable(document.getElementById('Widget<%-item.id%>').value); if(cfg.lineItem[<%-vid%>]=='<%-ch%>'){ this.checked=false; formFacade.saveDraft(event); }\" \r\n                        <%=vsel==ch?'checked':''%> id=\"entry.<%-vid%>.<%=ch%>\" value=\"<%=ovrn.name%> | <%=vid%> * <%=ch%>\" \r\n                        ></td>\r\n                  <% }) %>\r\n                  </tr>\r\n                <% } %>\r\n                </table>\r\n            <% \r\n                }\r\n              } \r\n            %>\r\n          <% } %>\r\n          <div id=\"Error<%-item.id%>\" class=\"ff-widget-error\"></div>\r\n        </div>\r\n      <% }) %>\r\n      <% \r\n        if(isEditMode() && hasCreatorOrEditor() && !header.outstock){ \r\n          var aftr;\r\n          if(header.items.length==0)\r\n            aftr = header.head?header.head.id:sec.id;\r\n          else\r\n            aftr = item?item.id:'root';\r\n          var hdprds = header.items.filter(itm=>itm.product);\r\n          var isprd = hdprds.length>=(header.items.length-hdprds.length);\r\n          var productNoun = fac.product ? fac.product.type : 'product';\r\n          if(hdprds.length==0 && (s==0||s+1==sections.length)) isprd = false;\r\n          var hdamt = header.items.filter(itm=>itm.id==(fac.mapping||{}).amount);\r\n      %>\r\n          <div class=\"ff-create\" id=\"ff-append-<%-aftr%>\">\r\n            <div class=\"btn-group\">\r\n              <% if(isprd && hasCreator()) { %>\r\n                <button type=\"button\" class=\"btn ff-next\" onclick=\"editFacade.afterLoad('createProduct', {insertAfter:'<%-aftr%>', type:'product'})\">Add product</button>\r\n              <% } else if(hdamt.length>0 && hasCreator()) { %>\r\n                <button type=\"button\" class=\"btn ff-next\" onclick=\"editFacade.afterLoad('createPrice', null, {insertAfter:'<%-aftr%>', type:'service'})\">Add price field</button>\r\n              <% } else { %>\r\n                <button type=\"button\" class=\"btn ff-next\" onclick=\"editFacade.afterLoad('create', null, {insertAfter:'<%-aftr%>', type:'field'})\">Add field</button>\r\n              <% } %>\r\n              <button type=\"button\" class=\"btn ff-next dropdown-toggle dropdown-toggle-split\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\r\n                <span class=\"sr-only\">Toggle Dropdown</span>\r\n              </button>\r\n              <div class=\"dropdown-menu\">\r\n                <% if(hasCreator()){ %>\r\n                  <a class=\"dropdown-item\" href=\"javascript:void(0)\" onclick=\"editFacade.afterLoad('createProduct', {insertAfter:'<%-aftr%>', type:'product'})\">Add product</a>\r\n                  <a class=\"dropdown-item\" href=\"javascript:void(0)\" onclick=\"editFacade.afterLoad('createPrice', null, {insertAfter:'<%-aftr%>', type:'service'})\">Add price field</a>\r\n                <% } %>\r\n                <a class=\"dropdown-item\" href=\"javascript:void(0)\" onclick=\"editFacade.afterLoad('create', null, {insertAfter:'<%-aftr%>', type:'field'})\">Add field</a>\r\n                <a class=\"dropdown-item\" href=\"javascript:void(0)\" onclick=\"editFacade.afterLoad('confirmCreate', null, {insertAfter:'<%-aftr%>', type:'field', widget:'SectionHeaderItem'})\">Add header</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n      <% } %>\r\n    <% }) %>\r\n    </div>\r\n\r\n    <div class=\"ff-button-bar\">\r\n    <% if(s>=1){ %>\r\n      <button type=\"button\" class=\"<%-backcss%> ff-back\" id=\"ff-back-<%-sec.id%>\"\r\n        onclick=\"formFacade.gotoSection(this.form, '<%-sec.id%>', 'back')\">\r\n        <span class=\"material-icons\">arrow_back</span>\r\n        <span><%-lang('Back')%></span>\r\n      </button>\r\n    <% } %>\r\n    <% \r\n      if(frm.errorMessage){\r\n      } else if(s+1==sections.length || sec.next==-3){ \r\n        data.ending = sec.id;\r\n        var waphone = getPhone(sec.id);\r\n        var itmsubmit = fac.submit?fac.submit[sec.id]:null;\r\n        var onclick = 'formFacade.submit(this.form, \\''+sec.id+'\\')';\r\n        if(isEditMode() && s>=1)\r\n          onclick = 'formFacade.launchPreview()';\r\n        else if(itmsubmit && itmsubmit.payConfig=='peergateway' && !draft.responseId)\r\n          onclick = 'formFacade.showPayment(this.form, \\''+sec.id+'\\')';\r\n        else if(itmsubmit && itmsubmit.amountFrom && !draft.responseId)\r\n          onclick = 'formFacade.showPayment(this.form, \\''+sec.id+'\\')';\r\n      %>\r\n        <button type=\"button\" class=\"<%-submitcss%> ff-submit\" id=\"ff-submit-<%-sec.id%>\" onclick=\"<%-onclick%>\">\r\n          <% if(waphone){ %>\r\n            <img src=\"https://formfacade.com/img/wa.svg\" class=\"ff-submit-icon\"/>\r\n          <% } else{ %>\r\n            <img src=\"https://formfacade.com/img/send.svg\" class=\"ff-submit-icon\"/>\r\n          <% } %>\r\n          <span>\r\n            <%-itmsubmit&&itmsubmit.displayName?itmsubmit.displayName:lang(waphone?'Send message':'Submit')%>\r\n          </span>\r\n        </button>\r\n      <% if(isEditMode()){ %>\r\n        <i class=\"ff-customize material-icons\" onclick=\"editFacade.afterLoad('confirmSubmit', '<%-sec.id%>')\">settings</i>\r\n      <% } %>\r\n    <% } else { %>\r\n        <button type=\"button\" class=\"<%-submitcss%> ff-next\" id=\"ff-next-<%-sec.id%>\"\r\n          onclick=\"formFacade.gotoSection(this.form, '<%-sec.id%>', '<%-sec.next%>')\">\r\n          <% \r\n            var nxtsec = sec.next==-2?sections[s+1]:null;\r\n            if(nxtsec && nxtsec.id==fac.setting.loginpage){ \r\n          %>\r\n            <span class=\"material-icons\">lock</span>\r\n            <span><%-lang('Next')%></span>\r\n          <% } else{ %>\r\n            <span><%-lang('Next')%></span>\r\n            <span class=\"right-icon material-icons\">arrow_forward</span>\r\n          <% } %>\r\n        </button>\r\n        <% if(isEditMode() && hasCreatorOrEditor()){ %>\r\n          <i class=\"ff-customize material-icons\" onclick=\"editFacade.afterLoad('showNext', '<%-sec.id%>')\">settings</i>\r\n        <% } %>\r\n    <% } %>\r\n\r\n    <% \r\n      var inlinecss = {display:'inline-block', position:'relative', opacity:1, visibility:'visible',\r\n        'font-size':'13px', 'font-weight':600, 'line-height':'22px', 'letter-spacing':'.8px', 'text-indent':'0em', 'z-index':1};\r\n      var inlinestyle = Object.keys(inlinecss).map(function(ky){ return ky+':'+inlinecss[ky]+' !important'; }).join('; ');\r\n    %>\r\n    <% if(!params.userId){ %>\r\n      <a href=\"https://formfacade.com/verify-google-forms-ownership.html\" target=\"_blank\"\r\n      class=\"ff-powered\" style=\"color:#0074D9 !important; border-bottom:1px solid #0074D9 !important; <%-inlinestyle%>\">\r\n        Ownership not verified\r\n      </a>\r\n    <% } else if(isEditMode()){ %>\r\n      <% if(hasCreator() && (fac.neartail || fac.whatsapp)){ %>\r\n          <span class=\"material-icons ff-jump-nav\" onclick=\"formFacade.showNavigation()\">apps</span>\r\n      <% } %>\r\n    <% } else{ %>\r\n      <% \r\n        if(!config.plan || config.branded){ \r\n          var prd = fac.hipaache?'Hipaache':(fac.neartail||fac.whatsapp)?'Neartail':'Formfacade';\r\n      %>\r\n        <% if(!config.plan && prd=='Formfacade' && config.usage>=100 && config.trial>7){ %>\r\n          <a href=\"<%-reurl%>\" \r\n            <% if(config.usage>=120){ %>\r\n              class=\"ff-blocked\" style=\"color:#fff !important; <%-inlinestyle%>\"\r\n            <% } else{ %>\r\n              class=\"ff-warned\" style=\"color:#000 !important; border:1px solid #f5c6cb !important; <%-inlinestyle%>\"\r\n            <% } %>\r\n            target=\"_blank\">\r\n            <b>âš </b> Form responses limit reached. Upgrade now.\r\n          </a>\r\n        <% } else if(!config.plan && ['Neartail','Hipaache'].indexOf(prd)>=0 && config.usage>=20 && config.trial>7){ %>\r\n          <a href=\"<%-reurl%>\"\r\n            <% if(config.usage>=30){ %>\r\n              class=\"ff-blocked\" style=\"color:#fff !important; <%-inlinestyle%>\"\r\n            <% } else{ %>\r\n              class=\"ff-warned\" style=\"color:#000 !important; border:1px solid #f5c6cb !important; <%-inlinestyle%>\"\r\n            <% } %>\r\n            target=\"_blank\">\r\n            <b>âš </b> Form responses limit reached. Upgrade now.\r\n          </a>\r\n        <% } else{ %>\r\n          <a href=\"<%-reurl%>\" target=\"_blank\" \r\n            class=\"ff-powered-img\" style=\"display:inline-block !important;\"\r\n            title=\"<%-config.plan?('Powered by '+prd):'Try it for Free'%>\">\r\n            <% if(fac.hipaache){ %>\r\n              <img src=\"https://formfacade.com/logo/madewith/hipaache.svg\" loading=\"lazy\"/>\r\n            <% } else if(fac.neartail||fac.whatsapp){ %>\r\n              <img src=\"https://formfacade.com/logo/madewith/neartail.svg\" loading=\"lazy\"/>\r\n            <% } else{ %>\r\n              <img src=\"https://formfacade.com/logo/madewith/formfacade.svg\" loading=\"lazy\"/>\r\n            <% } %>\r\n          </a>\r\n        <% } %>\r\n      <% } else if(config.plan=='paid'){ %>\r\n        <%\r\n          var nxtsec;\r\n          var ctgs = sections.map(function(ctgsec,c){\r\n            if(ctgsec.id==sec.id) nxtsec = sections[c+1];\r\n            var itmnext = fac.next?fac.next[ctgsec.id]:null;\r\n            if(!itmnext) itmnext = fac.submit?fac.submit[ctgsec.id]:null;\r\n            if(itmnext && itmnext.navigation=='added')\r\n              return ctgsec;\r\n          }).filter(ctgsec=>ctgsec);\r\n        %>\r\n        <% if(hasCreator() && ctgs.length>1 && itmnxt && itmnxt.navigation=='added'){ %>\r\n          <span class=\"material-icons ff-jump-nav\" onclick=\"formFacade.showNavigation()\">apps</span>\r\n        <% } %>\r\n      <% } else if(config.plan=='warned'){ %>\r\n        <a href=\"<%-reurl%>\" target=\"_blank\" \r\n          class=\"ff-warned\" style=\"color:#000 !important; border:1px solid #f5c6cb !important; <%-inlinestyle%>\">\r\n          <b>âš¡</b> Form responses limit reaching soon\r\n        </a>\r\n      <% } else if(config.plan=='blocked'){ %>\r\n        <a href=\"<%-reurl%>\" target=\"_blank\" \r\n          class=\"ff-blocked\" style=\"color:#fff !important; <%-inlinestyle%>\">\r\n          <b>âš </b> Form responses limit reached. Upgrade now.\r\n        </a>\r\n      <% } %>\r\n    <% } %>\r\n    </div>\r\n    </div>\r\n\r\n    <% if(isEditMode() && hasCreatorOrEditor()){ %>\r\n      <div class=\"ff-add-page\">\r\n        <button class=\"btn btn-lg ff-back\" onclick=\"editFacade.afterLoad('confirmCreate', null, {insertAfter:'<%-item?item.id:'root'%>', type:'field', widget:'PageBreakItem'})\" title=\"Insert new page\">\r\n          <span class=\"material-icons\">\r\n            add_circle_outline\r\n          </span>\r\n          Add page\r\n        </button>\r\n      </div>\r\n    <% } %>\r\n\r\n    <% }) %>\r\n\r\n    <% \r\n      var waphone = getPhone();\r\n      var firstsec = sections[0]||{};\r\n    %>\r\n    <div class=\"ff-section\" id=\"ff-sec-ending\" style=\"<%-draft.activePage=='ending'?'display:block':'display:none'%>\">\r\n    <div class=\"ff-secfields\">\r\n      <h3 class=\"ff-title\"><%-html(firstsec.title||frm.title)%></h3>\r\n      <p style=\"padding-bottom:80px;\">Click <%-lang(waphone?'Send message':'Submit')%> to finish.</p>\r\n    </div>\r\n    <div class=\"ff-button-bar\">\r\n      <button type=\"button\" class=\"<%-backcss%> ff-back\" \r\n        onclick=\"formFacade.gotoSection(this.form, '<%-data.ending%>', 'back')\">\r\n        <span class=\"material-icons\">arrow_back</span>\r\n        <span><%-lang('Back')%></span>\r\n      </button>\r\n      <button type=\"button\" class=\"<%-submitcss%> ff-submit\"\r\n        onclick=\"formFacade.submit(this.form, '-3')\">\r\n        <span class=\"material-icons\">send</span>\r\n        <span><%-lang(waphone?'Send message':'Submit')%></span>\r\n      </button>\r\n    </div>\r\n    </div>\r\n\r\n  </form>\r\n<% } %>\r\n\r\n<%\r\n  var paybtns = getPaymentButtons();\r\n  paybtns.forEach(paybtn=>{\r\n    var itm = frmitms[paybtn.amountFrom]||{};\r\n    var amt = draft.entry[itm.entry]||0;\r\n    var txtamt = itm.format?itm.format(amt):amt;\r\n%>\r\n  <div id=\"ff-payment-list-<%-paybtn.id%>\" class=\"ff-payment-form ff-form ff-layout-<%-layout%>\"\r\n    style=\"<%-draft.activePage==(paybtn.id+'-paylist')?'display:block':'display:none'%>\">\r\n    <div class=\"ff-section\">\r\n      <div class=\"ff-title\">\r\n        <%-lang('Pay using')%>\r\n      </div>\r\n      <div><%-txtamt%></div>\r\n      <div class=\"ff-paylist\">\r\n      <% if(paymentIntent){ %>\r\n        <% paymentIntent.payment_method_types.forEach((typ,t)=>{ %>\r\n          <div class=\"ff-payoption\" onclick=\"formFacade.showPaymentMethod(<%-t%>, '<%-paybtn.id%>')\">\r\n            <div class=\"ff-paylogo\"><img src=\"/img/payment/<%-typ.logo?typ.logo:'money.png'%>\"/></div>\r\n            <div class=\"ff-payname\"><%-typ.name%></div>\r\n            <div class=\"material-icons\">delete</div>\r\n          </div>\r\n        <% }) %>\r\n      <% } %>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <form id=\"ff-payment-form-<%-paybtn.id%>\" class=\"ff-payment-form ff-form ff-layout-<%-layout%>\"\r\n    style=\"<%-draft.activePage==(paybtn.id+'-pay')?'display:block':'display:none'%>\">\r\n    <div class=\"ff-section\">\r\n      <div class=\"ff-title\">\r\n        <%-lang('Secure checkout')%>\r\n        <span style=\"float:right;\"><%-txtamt%></span>\r\n      </div>\r\n      <div id=\"ff-card-element-<%-paybtn.id%>\" class=\"<%-prepend('form-control')%>\" style=\"padding:12px; height:48px;\">\r\n        Loading...\r\n      </div>\r\n      <label for=\"ff-card-element-<%-paybtn.id%>\" style=\"padding-top:12px; padding-bottom:4px;\">\r\n        All transactions are safe and secure. \r\n        Credit card details are not stored.\r\n      </label>\r\n      <div id=\"ff-card-errors-<%-paybtn.id%>\" role=\"alert\" style=\"color:red; padding-bottom:4px;\"></div>\r\n      <button type=\"submit\" class=\"<%-submitcss%> ff-submit\" id=\"ff-pay-<%-paybtn.id%>\" onclick=\"\">\r\n        <span class=\"material-icons\">send</span>\r\n        <span><%-lang('Pay Now')%></span>\r\n      </button>\r\n    </div>\r\n  </form>\r\n  <div id=\"ff-payment-confirm-<%-paybtn.id%>\" class=\"ff-payment-form ff-form ff-layout-<%-layout%>\"\r\n    style=\"<%-draft.activePage==(paybtn.id+'-payconfirm')?'display:block':'display:none'%>\">\r\n    <div class=\"ff-section\">\r\n      <div class=\"ff-title\">\r\n        <%-lang('Payment successful')%>\r\n      </div>\r\n      <div><%-lang('Placing your order...')%></div>\r\n    </div>\r\n  </div>\r\n<% }) %>\r\n\r\n<div id=\"ff-addprd-overlay\" onclick=\"formFacade.closePopup()\"></div>\r\n<div id=\"ff-addprd-popup\"></div>\r\n","summary":"<%\r\n\tvar form = data.scraped;\r\n%>*<%-form.title?form.title:form.form%> #<%-formFacade.draft.submitSeq%>*\r\n<%\r\n\tvar vals = {};\r\n\tif(formFacade.draft && formFacade.draft.entry)\r\n\t\tvals = formFacade.draft.entry;\r\n\tvar items = Object.values(form.items).sort((a,b)=>a.index-b.index);\r\n    var oitems = data.facade&&data.facade.items?data.facade.items:{};\r\n\titems.forEach(item=>{\r\n\t\tvar oitem = oitems[item.id];\r\n\t\tif(!oitem) oitem = {};\r\n\t\tvar val = vals[item.entry];\r\n        if(val && val.length==0) val = null;\r\n        if(item.type=='GRID')\r\n        {\r\n                item.rows.forEach(function(rw, r){\r\n                \tvar rvals = vals[rw.entry];\r\n                    if(rvals)\r\n                    {\r\n\t\t\t\t\t\trvals = Array.isArray(rvals)?rvals:[rvals];\r\n%>\r\n*<%-rw.value%> :* <%-rvals.join(', ')%><%\r\n                    }\r\n                });\r\n        }\r\n\t\telse if(item.title && val)\r\n\t\t{\r\n\t\t\tif(oitem.mode=='hide'){}\r\n\t\t\telse if(oitem.calculated && oitem.calculated.indexOf('${textsummary')==0){}\r\n\t\t\telse{\r\n\t\t\t\tif(Array.isArray(val) || val=='__other_option__')\r\n\t\t\t\t{\r\n\t\t\t\t\tval = Array.isArray(val)?val:[val];\r\n\t\t\t\t\tval = val.map(function(vl){\r\n\t\t\t\t\t\tif(vl=='__other_option__')\r\n\t\t\t\t\t\t\tvl = vals[item.entry+'-other_option_response'];\r\n\t\t\t\t\t\treturn vl;\r\n\t\t\t\t\t});\r\n\t\t\t\t}\r\n\t\t\t\telse if(item.format)\r\n\t\t\t\t{\r\n\t\t\t\t\tval = item.format(val);\r\n\t\t\t\t}\r\n%>\r\n*<%-item.title%> :* <%-Array.isArray(val)?val.join(', '):val%><% \r\n\t\t\t}\r\n\t\t}\r\n\t})\r\n%>\r\n<% if(!config.plan){ %>-\r\nMade with WhatsTarget.com\r\n-<% } %>\r\n(Press send to confirm)","preview":"\n\t<style>\n\t\t:root{\n\t\t\t--ff-bgcolor: #fff;\n\t\t\t--ff-font-color: #202124;\n\t\t\t--ff-font-size: 14px;\n\t\t\t--ff-head-size: 28px;\n\t\t\t--ff-font-small: 12.6px;\n\t\t\t--ff-field-bgcolor: #f5f7f8;\n\t\t\t--ff-size-1: 3.5px;\n\t\t\t--ff-size-1: 7px;\n\t\t\t--ff-size-3: 14px;\n\t\t}\n\t\t.ff-public-mode{ line-height:1.75; }\n\t\t.ff-partial, .ff-add-cart, .ff-editwidget, .ff-edittheme, \n\t\t.ff-editsection, .ff-button-bar{ display:none !important; }\n\t</style>\n\t\r\n\r\n\r\n\r\n\r\n  <form id=\"Publish1FAIpQLSeCONlY8_49qQlxtlFTFluGYJ48Un0hpZqVb4X87kAOFDcRPg\" \r\n  class=\"ff-form ff-layout-default ff-public-mode\" method=\"POST\" \r\n  action=\"https://docs.google.com/forms/u/1/d/e/1FAIpQLSeCONlY8_49qQlxtlFTFluGYJ48Un0hpZqVb4X87kAOFDcRPg/formResponse\">\r\n    <input type=\"hidden\" name=\"id\" value=\"1FAIpQLSeCONlY8_49qQlxtlFTFluGYJ48Un0hpZqVb4X87kAOFDcRPg\">\r\n    <input type=\"hidden\" name=\"pageHistory\" value=\"\">\r\n    \r\n    \r\n    \r\n    <input type=\"hidden\" id=\"Payment1FAIpQLSeCONlY8_49qQlxtlFTFluGYJ48Un0hpZqVb4X87kAOFDcRPg\" name=\"paymentId\" value=\"\">\r\n    <input type=\"hidden\" id=\"PaymentData1FAIpQLSeCONlY8_49qQlxtlFTFluGYJ48Un0hpZqVb4X87kAOFDcRPg\" name=\"paymentData\" value=\"\">\r\n    \r\n    <div class=\"ff-section\" id=\"ff-sec-root\" \r\n      style=\"display:block;\">\r\n      \r\n      \r\n      <h3 class=\"ff-title\" id=\"ff-title-root\">\r\n        BT\r\n        \r\n      </h3>\r\n      \r\n        <div class=\"ff-description mdViewer\" id=\"ff-desc-root\">\r\n          <p>Sign in your account </p>\r\n        </div>\r\n      \r\n    <div class=\"ff-secfields\">\r\n    \r\n    \r\n      \r\n      \r\n        <div class=\"rest-form-group ff-item   ff-text ff-part-width  ff-item-noprd\" id=\"ff-id-230800262\">\r\n          \r\n            <label class=\"ff-item-qs \" for=\"Widget230800262\">\r\n                \r\n                  Email\r\n                \r\n                \r\n                \r\n                \r\n                \r\n                  <i  class=\"ff-editwidget material-icons\">\r\n                    settings\r\n                  </i>\r\n                \r\n            </label>\r\n            \r\n              <small  id=\"Static230800262\" class=\"ff-help-empty ff-help form-text mdViewer\"></small>\r\n            \r\n            \r\n            \r\n          \r\n          \r\n            \r\n              <input type=\"email\" pattern=\"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,63}$\"\r\n                class=\"ff-widget-control rest-form-control ff-email-widget\" id=\"Widget230800262\" name=\"entry.1214904697\"\r\n                 \r\n                  autocomplete=\"email\" autocorrect=\"off\" spellcheck=\"false\"\r\n                \r\n            \r\n            \r\n            value=\"\" placeholder=\"\" >\r\n          \r\n          \r\n          <div id=\"Error230800262\" class=\"ff-widget-error\"></div>\r\n        </div>\r\n      \r\n        <div class=\"rest-form-group ff-item   ff-text ff-part-width  ff-item-noprd\" id=\"ff-id-1864704959\">\r\n          \r\n            <label class=\"ff-item-qs \" for=\"Widget1864704959\">\r\n                \r\n                  Password\r\n                \r\n                \r\n                \r\n                \r\n                \r\n                  <i  class=\"ff-editwidget material-icons\">\r\n                    settings\r\n                  </i>\r\n                \r\n            </label>\r\n            \r\n              <small  id=\"Static1864704959\" class=\"ff-help-empty ff-help form-text mdViewer\"></small>\r\n            \r\n            \r\n            \r\n          \r\n          \r\n            \r\n              <input type=\"text\" class=\"ff-widget-control rest-form-control\" id=\"Widget1864704959\" name=\"entry.1829607803\"\r\n                \r\n            \r\n            \r\n            value=\"\" placeholder=\"\" >\r\n          \r\n          \r\n          <div id=\"Error1864704959\" class=\"ff-widget-error\"></div>\r\n        </div>\r\n      \r\n      \r\n    \r\n    </div>\r\n\r\n    <div class=\"ff-button-bar\">\r\n    \r\n    \r\n        <button type=\"button\" class=\"rest-btn rest-btn-lg rest-btn-primary ff-submit\" id=\"ff-submit-root\" onclick=\"formFacade.submit(this.form, 'root')\">\r\n          \r\n            <img src=\"https://neartail.com/img/send.svg\" class=\"ff-submit-icon\"/>\r\n          \r\n          <span>\r\n            Submit\r\n          </span>\r\n        </button>\r\n      \r\n    \r\n\r\n    \r\n    \r\n      \r\n        <a href=\"https://neartail.com/order-form/create-order-form.html?product=order-form&utm_source=madewith&utm_medium=110523908108472816351&utm_campaign=1FAIpQLSeCONlY8_49qQlxtlFTFluGYJ48Un0hpZqVb4X87kAOFDcRPg&plan=free&userId=110523908108472816351&by=BT\" target=\"_blank\" \r\n          class=\"ff-powered-img\" style=\"display:inline-block !important;\"\r\n          title=\"Try it for Free\">\r\n          \r\n            <img src=\"https://neartail.com/logo/madewith/neartail.svg\" loading=\"lazy\"/>\r\n          \r\n        </a>\r\n      \r\n    \r\n    </div>\r\n    </div>\r\n\r\n    \r\n\r\n    \r\n\r\n    \r\n    <div class=\"ff-section\" id=\"ff-sec-ending\" style=\"display:none\">\r\n    <div class=\"ff-secfields\">\r\n      <h3 class=\"ff-title\">BT</h3>\r\n      <p style=\"padding-bottom:80px;\">Click Submit to finish.</p>\r\n    </div>\r\n    <div class=\"ff-button-bar\">\r\n      <button type=\"button\" class=\"rest-btn rest-btn-lg rest-btn-secondary ff-back\" \r\n        onclick=\"formFacade.gotoSection(this.form, 'root', 'back')\">\r\n        <span class=\"material-icons\">arrow_back</span>\r\n        <span>Back</span>\r\n      </button>\r\n      <button type=\"button\" class=\"rest-btn rest-btn-lg rest-btn-primary ff-submit\"\r\n        onclick=\"formFacade.submit(this.form, '-3')\">\r\n        <span class=\"material-icons\">send</span>\r\n        <span>Submit</span>\r\n      </button>\r\n    </div>\r\n    </div>\r\n\r\n  </form>\r\n\r\n\r\n\r\n\r\n<div id=\"ff-addprd-overlay\" onclick=\"formFacade.closePopup()\"></div>\r\n<div id=\"ff-addprd-popup\"></div>\r\n"}

formFacade.config = {"shortId":"qdAAi14o7","usage":0,"colorfulhead":"Poppins","colorfulpara":"Roboto","colorfulpri":"#5d33fb","colorfulsec":"#b161fc","colorfulsize":"14","language":"en","minimalhead":"Work Sans","minimalpara":"Work Sans","minimalpri":"#77cde3","minimalsec":"#f5f5f5","minimalsize":"14","theme":"colorful","themePrimary":"#000000","themeSecondary":"#000000","title":"BT","trial":1,"setting":{"creator":"neartail","currency":"Â£","currencyCode":"GBP","language":"en","locale":"","parent":"1FAIpQLSdWixzh_ePGwrgE_rHTZLpT4UjNW1Lb1VLC_3TgQGAtDPFIkg"},"themecolor":"minimal-77cde3","themecss":"font=%22Work%20Sans%22%2CHelvetica%2CArial%2Csans-serif&primary=%2377cde3&secondary=%23f5f5f5","shades":{"--ff-primary-50":"#d3ecf4","--ff-primary-100":"#c7e7f1","--ff-primary-200":"#bae2ef","--ff-primary-300":"#acddec","--ff-primary-400":"#9cd8e9","--ff-primary-500":"#8bd3e6","--ff-primary-600":"#77cde3","--ff-primary-700":"#71c2d7","--ff-primary-800":"#6ab7cb","--ff-primary-900":"#64acbe","--ff-primary-950":"#5c9fb0"}}

formFacade.langtext = {"locale":"US","language":"en"}
formFacade.template.product = "<%\r\n\tvar item = data.scraped.items[product.id];\r\n\tvar fcitms = data.facade.items;\r\n\tvar fcitm = fcitms?fcitms[product.id]:{};\r\n\tif(!fcitm) fcitm = {};\r\n\tvar val = draft.entry?draft.entry[item.entry]:null;\r\n\tvar unit = data.facade.setting.currencyCode=='USD'?'lbs':'kg';\r\n%>\r\n<div class=\"prdheader\">\r\n\t<div class=\"prdtitle\"><%-fcitm.title?fcitm.title:item.title%></div>\r\n\t<div class=\"prdhelp\">\r\n\t\t<% if(fcitm.price>0){ %>\r\n\t\t\t<%-fcitm.helpMark%>\r\n\t\t\t<% if(fcitm.measure=='Weight'){ %>\r\n\t\t\t\t<%-lang('per')%> <%-unit%>\r\n\t\t\t<% } %>\r\n\t\t<% } else if(fcitm.price==0 && item.price && item.price.minformat){ %>\r\n\t\t\t<%\r\n\t\t\t\tvar vrnsel = {};\r\n\t\t\t\tif(item.type=='PARAGRAPH_TEXT')\r\n\t\t\t\t{\r\n\t\t\t\t\tvar cfg = product.configurable||{};\r\n\t\t\t\t\tvar variants = fcitm.variants||{};\r\n\t\t\t\t\tvrnsel = variants[cfg.selected]||{};\r\n\t\t\t\t}\r\n\t\t\t%>\r\n\t\t\t<% if(vrnsel.price>0){ %>\r\n\t\t\t\t<%-computeField('${format('+vrnsel.price+',\"'+data.facade.setting.currency+'\")}')%>\r\n\t\t\t<% } else{ %>\r\n\t\t\t\t<%-lang('From $minprice', {minprice:item.price.minformat})%>\r\n\t\t\t<% } %>\r\n\t\t<% } else{ %>\r\n\t\t\t<%-fcitm.help?fcitm.help:item.help%>\r\n\t\t<% } %>\r\n\t</div>\r\n\t<div class=\"prdclose\" onclick=\"formFacade.closePopup(<%-fcitm.inventory=='yes'%>)\">\r\n\t\t<span class=\"material-icons\">close</span>\r\n\t</div>\r\n</div>\r\n<div>\r\n\t<% if(item.type=='TEXT'){ %>\r\n\t<div class=\"prdwdg\">\r\n\t\t<div class=\"number\">\r\n\t\t    <% if(fcitm.placeholder){ %>\r\n\t\t    \t<label><%-fcitm.placeholder%></label>\r\n\t\t    <% } %>\r\n\t\t\t<div class=\"minus\" \r\n\t\t\tonclick=\"var nval=document.getElementById('prdtext').value; nval=nval?isNaN(nval)?0:Number(nval):0; if(nval>0)document.getElementById('prdtext').value=nval-1;\">\r\n\t\t\t-\r\n\t\t\t</div>\r\n\t\t\t<input type=\"text\" id=\"prdtext\" value=\"<%-val%>\">\r\n\t\t\t<div class=\"plus\" \r\n\t\t\tonclick=\"var nval=document.getElementById('prdtext').value; nval=nval?isNaN(nval)?0:Number(nval):0; document.getElementById('prdtext').value=nval+1;\">\r\n\t\t\t+\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n\t<div class=\"prdfooter\">\r\n\t\t<% if(val){ %>\r\n\t\t\t<a class=\"prddel\" href=\"#!\" onclick=\"formFacade.updateProduct(<%-item.entry%>, null, true)\"><%-lang('Delete')%></a>\r\n\t\t<% } %>\r\n\t\t<a href=\"#!\" \r\n\t\t\tonclick=\"formFacade.updateProduct(<%-item.entry%>, document.getElementById('prdtext').value=='0'?null:document.getElementById('prdtext').value, true)\">\r\n\t\t\t<%-lang('Confirm')%>\r\n\t\t</a>\r\n\t</div>\r\n\t<% \r\n\t\t} else if(item.type=='LIST' || item.type=='MULTIPLE_CHOICE'){ \r\n\t\t\tvar bgchs = item.choices.filter(ch=>ch.display||ch.value.length>4);\r\n\t%>\r\n\t<div class=\"prdwdg\">\r\n\t\t    <div class=\"<%-bgchs.length>0?'list-qty':'col-qty'%>\">\r\n\t\t\t<% if(item.choices.length==0){ %>\r\n\t\t\t\t<label><%-lang('Out of stock')%></label>\r\n\t\t\t<% } else if(fcitm.measure=='Weight'){ %>\r\n\t\t\t\t<label><%-lang('Select Weight')%> (<%-unit%>)</label>\r\n\t\t\t<% } else if(fcitm.measure=='Quantity'){ %>\r\n\t\t\t\t<label><%-lang('Select Quantity')%></label>\r\n\t\t\t<% } else if(fcitm.placeholder){ %>\r\n\t\t    \t<label><%-fcitm.placeholder%></label>\r\n\t\t    <% } %>\r\n\t      \t<ul>\r\n\t    \t<% item.choices.forEach(function(ch){ %>\r\n\t        \t<li \r\n\t        \t<% if(val==ch.value){ %>\r\n\t        \t\tclass=\"<%-bgchs.length>0?'list-qty-active':'col-qty-active'%> <%-fcitm.discounted?'col-discounted':''%>\"\r\n\t        \t\tonclick=\"formFacade.updateProduct(<%-item.entry%>, null, true)\"\r\n\t        \t<% } else { %>\r\n\t        \t\tonclick=\"formFacade.updateProduct(<%-item.entry%>, this.title, true)\"\r\n\t        \t<% } %>\r\n\t        \ttitle=\"<%=ch.value%>\" id=\"prdentry.<%-item.entry%>\">\r\n\t        \t\t<%-ch.display?ch.display:ch.value%>\r\n\t        \t</li>\r\n\t        <% }) %>\r\n\t      \t</ul>\r\n\t    </div>\r\n\t</div>\r\n\t<% if(val){ %>\r\n\t\t<div class=\"prdfooter\">\r\n\t\t\t<a class=\"prddel\" href=\"#!\" onclick=\"formFacade.updateProduct(<%-item.entry%>, null, true)\"><%-lang('Delete')%></a>\r\n\t\t</div>\r\n\t<% } %>\r\n\t<% \r\n\t\t} else if(item.type=='CHECKBOX'){ \r\n\t\t\tvar vals = val?(Array.isArray(val)?val:[val]):[];\r\n\t%>\r\n\t<div class=\"prdwdg\">\r\n\t    <div class=\"list-qty\">\r\n\t\t    <% if(fcitm.placeholder){ %>\r\n\t\t      <label><%-fcitm.placeholder%></label>\r\n\t\t    <% } %>\r\n\t      \t<ul>\r\n\t    \t<% item.choices.forEach(function(ch){ %>\r\n\t        \t<li \r\n\t        \t<% if(vals.indexOf(ch.value)>=0){ %>\r\n\t        \t\tclass=\"list-qty-active\"\r\n\t        \t\tonclick=\"formFacade.removeProduct(<%-item.entry%>, this.innerHTML.trim())\"\r\n\t        \t<% } else { %>\r\n\t        \t\tonclick=\"formFacade.addProduct(<%-item.entry%>, this.innerHTML.trim())\"\r\n\t        \t<% } %>\r\n\t        \tid=\"prdentry.<%-item.entry%>\">\r\n\t        \t\t<%-ch.value%>\r\n\t        \t</li>\r\n\t        <% }) %>\r\n\t      \t</ul>\r\n\t    </div>\r\n\t</div>\r\n\t<div class=\"prdfooter\">\r\n\t\t<% if(vals.length>0){ %>\r\n\t\t\t<a class=\"prddel\" href=\"#!\" onclick=\"formFacade.updateProduct(<%-item.entry%>, null, true)\"><%-lang('Delete')%></a>\r\n\t\t<% } %>\r\n\t\t<a href=\"#!\" onclick=\"formFacade.closePopup()\"><%-lang('Confirm')%></a>\r\n\t</div>\r\n\t<% \r\n\t\t} else if(item.type=='PARAGRAPH_TEXT'){ \r\n\t\t\tvar cfg = product.configurable;\r\n\t\t\tvar len = Object.keys(cfg.lineItem).length;\r\n        \tvar chs = fcitm?fcitm.choices:null;\r\n        \tvar chbox = chs&&chs.length==1;\r\n\t%>\r\n      \t<% if(cfg.page=='variant'){ %>\r\n\t\t\t<div class=\"prdwdg\">\r\n\t\t\t    <div class=\"list-qty\">\r\n\t\t\t\t    <label><%-lang('Select Variant')%></label>\r\n\t\t\t      \t<ul>\r\n\t\t    \t<%\r\n\t\t    \t\tfor(var vid in fcitm.variants){\r\n\t\t    \t\t\tvar vrn = fcitm.variants[vid];\r\n\t                    if(fcitm.inventory=='yes' && vrn.remain<=0){\r\n\t                    }\r\n\t                    else{\r\n\t                    \tvar vqty = cfg.lineItem[vid];\r\n\t\t    \t%>\r\n\t\t\t        \t<li \r\n\t\t\t        \t<% if(chbox && fcitm.multiselect=='yes'){ %>\r\n\t\t\t\t        \t<% if(vqty){ %>\r\n\t\t\t\t        \t\tclass=\"list-qty-active col-discount\"\r\n\t\t\t\t        \t\tonclick=\"formFacade.updateQuantity(<%-vid%>, null)\"\r\n\t\t\t\t        \t<% } else{ %>\r\n\t\t\t\t        \t\tonclick=\"formFacade.updateQuantity(<%-vid%>, <%-chs[0]%>)\"\r\n\t\t\t\t        \t<% } %>\r\n\t\t\t        \t<% } else if(chbox){ %>\r\n\t\t\t\t        \t<% if(vqty){ %>\r\n\t\t\t\t        \t\tclass=\"list-qty-active col-discount\"\r\n\t\t\t\t        \t\tonclick=\"formFacade.product.configurable.lineItem={}; formFacade.updateQuantity(<%-vid%>, null)\"\r\n\t\t\t\t        \t<% } else{ %>\r\n\t\t\t\t        \t\tonclick=\"formFacade.product.configurable.lineItem={}; formFacade.updateQuantity(<%-vid%>, <%-chs[0]%>)\"\r\n\t\t\t\t        \t<% } %>\r\n\t\t\t        \t<% } else if(fcitm.multiselect=='yes'){ %>\r\n\t\t\t\t        \t<% if(vqty){ %>\r\n\t\t\t\t        \t\tclass=\"list-qty-active col-editable\"\r\n\t\t\t\t        \t\tonclick=\"formFacade.selectVariant(<%-vid%>)\"\r\n\t\t\t\t        \t<% } else{ %>\r\n\t\t\t\t        \t\tonclick=\"formFacade.selectVariant(<%-vid%>)\"\r\n\t\t\t\t        \t<% } %>\r\n\t\t\t        \t<% } else{ %>\r\n\t\t\t\t        \t<% if(vqty){ %>\r\n\t\t\t\t        \t\tclass=\"list-qty-active col-editable\"\r\n\t\t\t\t        \t\tonclick=\"formFacade.selectVariant(<%-vid%>)\"\r\n\t\t\t\t        \t<% } else{ %>\r\n\t\t\t\t        \t\tonclick=\"formFacade.product.configurable.lineItem={}; formFacade.selectVariant(<%-vid%>)\"\r\n\t\t\t\t        \t<% } %>\r\n\t\t\t        \t<% } %>\r\n\t\t\t        \t\tid=\"li.<%-vid%>\">\r\n\t\t\t        \t\t<%-vrn.display?vrn.display:vrn.name%>\r\n\t\t\t        \t</li>\r\n\t\t        <% \r\n\t\t        \t\t}\r\n\t\t        \t} \r\n\t\t        %>\r\n\t\t\t      \t</ul>\r\n\t\t\t    </div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"prdfooter\">\r\n\t\t\t\t<% if(len>0){ %>\r\n\t\t\t\t\t<a class=\"prddel\" href=\"#!\" onclick=\"formFacade.updateProduct(<%-item.entry%>, null, true)\"><%-len>1?lang('Delete All'):lang('Delete')%></a>\r\n\t\t\t    <% } %>\r\n\t\t\t\t<% if(chbox && fcitm.multiselect=='yes'){ %>\r\n\t\t\t\t\t<a href=\"#!\" onclick=\"formFacade.closePopup()\"><%-lang('Confirm')%></a>\r\n\t\t\t    <% } %>\r\n\t\t\t</div>\r\n      \t<% \r\n      \t\t} else if(cfg.page=='quantity'){\r\n\t\t\t\tvar qty = cfg.lineItem[cfg.selected];\r\n\t\t\t\tvar li = fcitm.variants[cfg.selected];\r\n      \t%>\r\n\t\t\t<div class=\"prdwdg\">\r\n\t\t\t    <div class=\"list-qty\">\r\n\t\t\t\t    <label><%-li.name%> <b>/</b> <%-lang('Select Quantity')%></label>\r\n\t\t\t      \t<ul>\r\n\t\t    \t<%\r\n\t\t    \t\tvar vrn = fcitm.variants[cfg.selected];\r\n\t                var chs = fcitm.choices.filter(ch=>{\r\n\t                    if(vrn && isNaN(ch)==false)\r\n\t                    {\r\n\t                        var chval = parseFloat(ch);\r\n\t                        if(chval>vrn.remain) return false;\r\n\t                    }\r\n\t                    return true;\r\n\t                });\r\n\t\t    \t\tchs.forEach(function(ch){ \r\n\t\t    \t%>\r\n\t\t        \t<li \r\n\t\t        \t<% if(qty==ch){ %>\r\n\t\t        \t\tclass=\"list-qty-active\"\r\n\t\t        \t<% } %>\r\n\t\t        \tonclick=\"formFacade.updateQuantity(<%-cfg.selected%>, <%-ch%>, true)\">\r\n\t\t        \t\t<%-ch%>\r\n\t\t        \t</li>\r\n\t\t        <% }) %>\r\n\t\t\t      \t</ul>\r\n\t\t\t    </div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"prdfooter\">\r\n\t\t\t\t<% if(len>0){ %>\r\n\t\t\t\t\t<a class=\"prddel\" href=\"#!\" onclick=\"formFacade.updateQuantity(<%-cfg.selected%>, null, true)\"><%-lang('Delete')%></a>\r\n\t\t\t    <% } %>\r\n\t\t\t</div>\r\n\t    <% } %>\r\n\t<% } else if(item.type=='GRID'){ %>\r\n\t<div class=\"prdwdg\">\r\n\t  <% \r\n\t  \tvar sels = 0;\r\n\t    item.rows.forEach(function(rw, rwi){ \r\n\t      var rvals = draft.entry[rw.entry];\r\n\t      rvals = rvals?(Array.isArray(rvals)?rvals:[rvals]):[];\r\n\t      sels = sels + rvals.length;\r\n\t  %>\r\n\t\t<div class=\"col-qty\">\r\n\t      \t<label><%-rw.value%></label>\r\n\t      \t<ul>\r\n\t\t    <% item.choices.forEach(function(ch, c){ %>\r\n\t\t        <li\r\n\t\t        <% if(rvals.indexOf(ch.value)>=0){ %>\r\n\t\t        \tclass=\"col-qty-active\" \r\n\t\t        \tonclick=\"formFacade.updateProduct(<%-rw.entry%>);\"\r\n\t\t        <% } else{ %>\r\n\t\t        \tonclick=\"formFacade.updateProduct(<%-rw.entry%>, this.innerHTML.trim());\"\r\n\t\t        <% } %>\r\n\t\t        id=\"prdentry.<%-rw.entry%>.prdvalue.<%=c%>\">\r\n\t\t        \t<%-ch.value%>\r\n\t\t        </li>\r\n\t\t    <% }) %>\r\n\t      \t</ul>\r\n\t    </div>\r\n\t  <% }) %>\r\n\t</div>\r\n\t<div class=\"prdfooter\">\r\n\t\t<% if(sels>0){ %>\r\n\t\t\t<a class=\"prddel\" href=\"#!\" onclick=\"<% item.rows.forEach(rw=>{ %>formFacade.updateProduct(<%-rw.entry%>);<% }) %> formFacade.closePopup();\">\r\n\t\t\t\t<%-sels>1?lang('Delete All'):lang('Delete')%>\r\n\t\t\t</a>\r\n\t\t<% } %>\r\n\t\t<a href=\"#!\" onclick=\"formFacade.closePopup()\"><%-lang('Confirm')%></a>\r\n\t</div>\r\n\t<% } %>\r\n</div>"
formFacade.template.navigation = "<%\r\n    var secid = draft.activePage?draft.activePage:'root';\r\n\tvar fac = data.facade;\r\n\tif(!fac) fac = {};\r\n\tvar sections = getSections();\r\n    var ctgs = sections.map(function(ctgsec,c){\r\n      var itmnext = fac.next?fac.next[ctgsec.id]:null;\r\n      if(!itmnext) itmnext = fac.submit?fac.submit[ctgsec.id]:null;\r\n      if(itmnext && itmnext.navigation=='added')\r\n        return ctgsec;\r\n    }).filter(ctgsec=>ctgsec);\r\n%>\r\n<div class=\"prdheader\">\r\n\t<div class=\"prdtitle\"><%-lang('Jump to')%></div>\r\n\t<div class=\"prdclose\" onclick=\"formFacade.closeNavigation()\">\r\n\t\t<span class=\"material-icons\">close</span>\r\n\t</div>\r\n</div>\r\n<div>\r\n\t<%-computeField('${categories()}')%>\r\n</div>"

formFacade.load("#ff-compose");