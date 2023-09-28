
if(!window._eT)(function(W,D){
if(!W._eTag)_eTag=[]
var	_=_eT=function(S,i,O){
var Q='querySelectorAll',P='parentNode',u=undefined,A=tS(S)?(O||D)[Q](S):S instanceof NodeList?S:S?[S]:[]
if(i*1||i===0)A=(A=A[i<0?i+A.length:i])?[A]:[]
A._=function(S,i){return A[0]?_(S,i,A[0]):A}
A.E=function(f,i,o){for(i=0;o=A[i];i++)f(o,i);return A}
A.F=function(c,v){return v!==u?A.E(function(o){o[c]=v}):A[0]&&A[0][c]}
A.H=function(v){return A.F('innerHTML',v)}
A.C=function(v,b){var c='className',e=new RegExp(' *\\b'+v+'\\b *','g');return b==3?A[0]&&e.test(A[0][c]):A.E(function(o,C,f){
C=o[c]||'';f=e.test(C);if(b==2)b=f?1:0
o[c]=f?(b?C[RE](e,' ')[RE](/^ | $/g,''):C):b?C:C?C+' '+v:v})}
A.A=function(h,b){h=h[RE](/(<script)\b/ig,'$1 x');return A.E(function(o,p){
o.insertAdjacentHTML(['beforeend','afterbegin','afterend','beforebegin'][b|0],h)
_((b&2)?o[P]:o)._('script[x]').E(function(b){b.removeAttribute('x');eval(b.innerText)})})}
A.P=function(t,o){o=A[0][P];while(t&&o&&o.matches&&!o.matches(t))o=o[P];return _(o)}
A.R=function(){A.E(function(o,p){if(p=o[P])p.removeChild(o)})}
A.S=function(a,v){return v!==u?A.E(function(o){o.style[a]=v}):A[0]&&W.getComputedStyle(A[0])[a]||''}
A.T=function(v,t){t=A[0]&&A[0].textContent||'';return v&&v.test?v.test(t):t}
A.ev=function(e,f){return A.E(function(o){o.addEventListener(e,f)})}
A.cl=function(f){return f?A.E(function(o){_(o).ev('click',f)}):A[0]&&A[0].click()&&0||A}
A.af=function(b){return A.S('display',['none','block','inline-block'][b||0]||b)}
A.at=function(c,v){return v!==u?A.E(function(o){o[(v===0?'remove':'set')+'Attribute'](c,v)}):A[0]&&A[0].getAttribute(c)||''}
A.re=function(e,t){return A.E(function(o,v){if(RegExp(e).test(v=_(o).H()))_(o).H(v[RE](e,t))})}
return A},
tS=function(o){return typeof o=='string'},
a,b,s,u,v,o,z=zvars=W.zvars||[],i,nF=0,DP='eTgdpr',
L=W.location,h=L.host,n=h,pn=L.pathname,N=W.navigator&&navigator.userAgent||'',RE='replace',NDI,
IPP=_.IPP=/(casepp|pfv)\.(red-by-)?sfr\.fr$/.test(h)?'.pfv':'',
fut=_.fut=/futpsw/.test(h),
TV='tv@|(play|tv)-fut@',
pfv=_.pfv=function(b){
_((b?'':'[id^="eT"] ')+'a[href*="sfr.fr"]').E(function(o,h){if(!/pfv.(red-by-)?sfr.fr/.test(h=_(o).at('href')))_(o).at('href',h[RE](/[.](red-by-)?sfr[.]fr/g,'.pfv.$1sfr.fr'))})},
H=_.H=h[RE](/\.(casepp|ipp2)\.sfr\.fr|\bpfv\.|-cms1/,'')[RE](/(^www|^cms|^futpsw(-red)?|\.cms)?\.sfr\.fr/,'@')[RE](/(^www|^cms|)\.red-by-sfr\.fr/,'#')[RE](/(^(cms|www)\b\.?)/g,'')[RE](/^(valid.sfr-)?messagerie(.services|-beta(-2)?|-1.)?/,'WM')+pn[RE](/(\/|;JSESS.*)$/,''),
$=_.$=W.$sfr&&$sfr.fn&&$sfr||W.$&&W.$.fn&&W.$||W.jQuery,
f0=_.ab=function(){},
ckR=_.ckR=function(s){var c=" "+D.cookie+";",i=c.indexOf(" "+s+"=");return !s||i<0?"":unescape(c.substring(i+s.length+2,c.indexOf(";",i)))[RE](/<[^>]+>/g,'')},
ckW=_.ckW=function(s,h,H,p,d){
s=s[RE](/[\x80-\xFF]/g,escape)
if(h){d=new Date;d.setMinutes(d.getMinutes()+h*60);s+="; expires="+d.toGMTString()}
if(!H)H=L.hostname[RE](/^.*?([^.]+[.][^.]+)$/,'$1')
H+="; SameSite="+(/^MLS=/.test(s)?"None; Secure":"Lax")+(/^eTiab2=/.test(s)?"; priority=high":"")
D.cookie=s+"; path=/"+(p||'')+"; domain="+H},
ckD=_.ckD=function(s,h,p){ckW(s+"=",-1,h,p)},
ckT=_.ckT=function(c,v,m,f){if(T('.*[#@]')){ckW(c+'='+v,m/60);JS('https://www.'+(T('.*@')?'red-by-':'')+'sfr.fr/eTagP/ck.jsp?'+c+'~'+v+'~'+m,f)}},
ckA=[],ckG=_.ckG=function(s,h){if(_.cc<1)ckA.push([s,h]);else{if(s)ckW(s,h);else ckA.forEach(function(c){ckW(c[0],c[1])})}},
ckI=function(s){var c='eTagSU',v=ckR(c),i=v.indexOf(s),n;if(i<0)v+=s+'0';else if((n=1*v.charAt(i+1))<9)v=v[RE](s+n,s+(n+1));ckW(c+'='+v,4)},
ckN=function(s){var v=ckR('eTagSU'),i=v.indexOf(s);return i<0?0:1+1*v.charAt(i+1)},
par=_.par=function(s,h){var m=(h||L.href).match("[?&#]"+s+"=([^?&#]*)");return m?m[1]:''},
cr=function(s){var i=0,r='';while(i<s.length)r+=String.fromCharCode(s.charCodeAt(i++)^3);return r},
X=ckR('eTagXX'),O,eT=W._eTag||[],R=D.referrer||'',
M=_.M=function(e,h,r){try{r=(h||H).match(new RegExp('^'+e))}catch(e){};return r},
T=_.T=function(e,h,r){try{r=new RegExp('^('+e[RE](/\.([^*])/g,'\\.$1')+')').test(h||H)}catch(e){};return r},
cms=_.cms=/-cms1\./.test(h)?1:/(^|\.)cms\./.test(h)||T('-admin@'),
ssd=cms===1?'www-cms1':cms?'cms':'www',
dom=_.dom='https://'+ssd+'.sfr.fr/',
iC=par(v='ISTCMS')&&ckW(v+'=1')||ckR(v),
ist=_.ist=(cms===1?'//www-cms1.':iC||cms?'//cms.':'//static.s-')+'sfr.fr/',
dja=_.dja='export/bloc/django/',dj=ist+dja,DJ=dom+dja,
med=_.med=ist+'media/',im=_.im='<i'+'mg src="'+med,
rbs=_.rbs=iC||cms?'//cms.red-by-sfr.fr/':'//static.s-sfr.fr/redbysfr/',
IC=_.IC=ist+'eTagP/IC/',
mkg=T('#')?'eTmkgR':'eTagMKG',
cas=_.cas=T('@/cas/login$')&&par('service')+par('domain')||'',
ww=W.innerWidth,
log=_.log=function(t,u,c){if(c=X&&W.console)u?c.log(t,u):c.log(t)},
to=_.to=function(f,t){return W.setTimeout(f,t||300)},
ti=_.ti=function(f,t){return W.setInterval(f,t||200)},
wait=_.wait=function(f,t,i){if(f&&!f())i=ti(function(){if(f())W.clearInterval(i)},t)},
DW=function(s){D.writeln(s)},
HA=function(e){_("head")[0].appendChild(e)},
ST=_.ST=function(s,S,h,i){
s=s[RE](/!([;}])/g,'!important$1')[RE](/D0/g,'display:none')
S=_('#eTcss')[0];if(!S)S=D.createElement("style"),S.id='eTcss',HA(S)
if(h=S.styleSheet)h.cssText+=s;else S.innerHTML+=s},
SM=_.SM=function(w,S){ST('@media screen and (m'+(w>0?'ax':'in')+'-width: '+(w>0?w:-w)+'px){'+S+'}')},
JS=_.JS=stat_js=function(u,l,e,f){
var S=D.createElement("script"),A='setAttribute'
S[A]("type","text/javascript")
if(!(f&1))S[A]("async",!0)
if(f&2)S[A]("defer",!0)
if(l)S.onload=l
if(e)S.onerror=e
S[A]("src",u[RE](/^\*/,dj)[RE](/\|(&|$)/,'|IstF$1')[RE](/^([^?#]*)\|/,'$1.json?'+(par('eTr22')?'eTr22&':'')+'callback=_eT.'))
HA(S)},
jQ=_.jQ=function(){if(!$||!$.fn)JS(ist+'resources/js/frameworks/jquery/sfr.jquery.js',function(){_eT.$=$=$sfr=W.$})},
Pro=T('@/(forfait-mobile-|offre-internet-)?pro(/|$)')?'&pro':'',
hS=0,hC=0,srr=T('(espace-client)?@/.*-sre(/|$)'),yt=_('meta[content*=CLISMR]')[0]?'&yt':'',
hdr=_.hdr=function(t){hC||JS(hC=
srr?'*hdrre|Ist'+yt:
_.nr?rbs+'fragments/header/header.standard'+(t?'.tunnel':'')+'|Ist':t?'*ettun|Ist':'*hdr21|Ist'+(
T('(@/)?(mon-)?espace-client@?|@/odr/')||W._stats_univers=='espace_client'?'&U=E':
T('assistance@|portailsav@')?'&U=A':
T('webmail@|atelier.pp.messagerie@')?'&U=M':
T(TV)?'&U=T&b':
T('(boutique.)?home@')?'&U=H':'')+Pro)},
fSc=0,ftr=_.ftr=function(b){fSc||JS(fSc=
srr?'*ftrre|IstF'+yt:
_.nr?rbs+'fragments/footer/footer.'+(b?'light':'standard')+'|':
'*ftr21|'+Pro+(b?'&vue=L':''))},
go=_.go=function(u,t,f){if(f=W.stop)f();ST('*{D0!}');_.sent=_stats_sent=1;(t?top:W).location[RE](u)},
ab=function(t,v,d){t='eTab'+(1e3+t+'')[RE](/.*(...)$/,'$1');ckW(t+'='+(ckR(t)||(_.SS||IPP?1:v)),d||2)},
mob=_.mob=function(){return N.match(/Android.*Mobile|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|Bada|Palm|webOS|Symbian/i)},
isM=W.screen.width<768,
pro='603B24290AECE79C8888559645D7CAD7',
elD=function(){ckD('SFRBOLFEL');ckD('SfrBolfEligibility')},
bf0=function(){ckW('eTagMKG=df1152073178e5e08e74fcd3b5b3c4c7');ckW('eTmkgR=78AD1EEAD2DB0128EBE616FE2B6DB207');elD();_.PRO=0;ckD('eTmkgMS');ckD('eTncB');ckD('eTshrS')},
r9=Math.random()*1e9|0,
da=new Date(),TS=da*1,s6=function(i){return(i*1).toString(36)},
eP=_.eP=function(j,p,f,b){JS((b?ist:dom)+'hljr/'+j+(p?'?'+p:''),f)},
tc=function(){
var m=T('tv@')||_('body.Media').length?'#181818':'#fff',v='name="theme-color"',o=_('meta['+v+']')
if(m!=o.at('content')){o.R();_('head').A('<meta '+v+' content="'+m+'"/>')}},
spl=_.spl=function(c,s){return c&&c.split?c.split(s||'`'):''}
_.err=function(d){if(d=d&&d.content)_('#eTer>div').H(d);else{
_.SS=1
if(T('[^/]*@'))JS('*ersfr|err')
if(T('[^/]*#'))JS('*erred|err')
ftr()
W._stats_pagename+='/'+W._err}}
_.zf=_stats_zf=0
_.SS=par('sonde')||ckR('eTSelr')
_.lse=f0
_.hbs=function(f){wait(function(){if(_.pS){f(/:HOME_SECURITE:/.test(_.LL));return!0}})}
_.tr=function(s){return s?(s+'')[RE](/(^\\s+|\\s+$)/g,''):''}
_.iid=par("[RrSs][ef][dr]intid")
_.cN=0;_.car=function(O,c){
var o=_(O),a=(o.at('data-car')||c).split(';'),d=a[0]||'div',D=o._(d)[0],s=a[1]||'div',i=a[2],x=i&&(i*1==i)?i:0,b=a[3],S=o._(s),n=S.length,m=n-1,L=n&&S[m],N=++_.cN,B,
P=function(){D.scrollLeft=S[D.n].offsetLeft}
if(n<1)return
ti(function(){var j=0,l=D.scrollLeft,w=L.offsetLeft+L.offsetWidth;if(l!=D.l||w!=D.w){
while(j<m&&Math.abs(S[j].offsetLeft-l)*2>S[j].offsetWidth)j++
D.l=l;D.w=w;D.n=j;o._(i,0).af(D.n>0?2:0);o._(i,1).af(D.n<m&&l+D.offsetWidth<w?2:0)
if(!o._(b,D.n).C('A',3)){o._(b).C('A',1);o._(b,D.n).C('A')}}})
N=O.id||(O.id='eTcar'+N);N='#'+N+' ';B=
ST(N+'{position:relative}'+N+d+'{overflow:overlay hidden;scroll-behavior:smooth;scroll-snap-type:x mandatory}'+N+d+'::-webkit-scrollbar{D0}'+N+s+'{scroll-snap-align:center}'+
(i&&!x?'':N+'i{display:none;user-select:none;-webkit-user-select:none;cursor:pointer;position:absolute;z-index:9;left:'+x+'px;width:20px;text-align:center;top:calc(50% - 16px);font:32px/1 SR;color:#000}'+N+'i+i{left:auto;right:'+x+'px}')+
'')
SM(-768,N+d+'{overflow:hidden!}')
if(!i||x){i='i';o.A('<i>&lt;</i><i>&gt;</i>')}
o._(i)[1].b=1;D.n=0
o._(i).cl(function(i){i=D.n+(this.b?1:-1);D.n=i<1?0:i<m?i:m;P()})
if(b)o._(b).cl(function(i){i=this.n;D.n=i<1?0:i<m?i:m;P()}).E(function(o,n){o.n=n})
to(P,9)}
_.rs=T('rmcsport.tv')
if(!_.rs)tc()
_.rsP=function(p,l,v){
v=spl(ckR('eTrsP'),'~');if(p&&l&&!v[2])ckW('eTrsP='+escape(p+'~'+l),1/4)
if(v[2]&&T('rmcsport.tv$')){
ST('div#eTrsP{text-align:center;padding:20px;color:#223986;background:#fff;font:20px RMC-Bold}'+
'div#eTrsP>a{color:#fff;background:#223986;padding:8px;display:block;text-decoration:none;text-transform:uppercase}'+
'div#eTrsP>a:hover{background:#081a3e}div#eTrsP>p{font:18px RMC-Regular;text-align:left;padding:9px 0}')
_.popin('<div id="eTrsP">Vous y êtes presque !<p>Pour terminer votre inscription, cliquez sur ce bouton :</p>'+
'<a href="'+v[1]+'">Je finalise ma commande</a></div>',320,240)}
_('header>nav#classic a.bp').at('href',(l||v[1])[RE]('_mea','_header')).at('onclick',0).at('target',0).at('rel',0).C(v[2]?'f':'').H(v[2]?"Je finalise ma commande":"Je m'abonne")}
v=W._is_authenticated&&!_.rs;i=ckR('eTcnx');if(v||/cas.login/.test(R))ckW('eTcnx='+(i=i||Math.random()),.2);if(v===false||/cas.logout/.test(R))ckD('eTcnx'),i=0
i=_.co=ckR('CASLOGINHASH')||ckR('rme')||ckR('rmeh')||ckR('KEYCLOAK_SESSION')||i
if((v=par('eT')||par('eTag'))&&v<9)ckW('eTagXX='+(X=v),2)
if(v=par('app'))ckW('eTapp='+v,2)
if(_.app=sfrIst0=ckR('eTapp'))ST('#eTsH,#eTsH2,#eThS,#eTfS,#eTsF,#eTrH,#eTrF,#eTsA,#navN-2,#eTc2cP{D0!}html>body{margin:0!}')
_.dO="210 Go 5G"

_.LS=function(k,v,L){if(L=W.localStorage){if(v!==undefined&&k)L.setItem(k,v);v=L.getItem(k)}else v=null;return v}
_.loc=L.href
_.url=function(u){return u[RE](/^(https?:)?\/\/|\b(cms|www)\.|[#?].*/g,'')[RE](/\.?sfr\.fr/,'@')[RE](/\.?red-by-@/,'#')[RE](/\/$/,'')}
_.nr=W.eTnr||/^futpsw-red/.test(h)||T('[^/]*#')||!/^(0|false)?$/.test(par('red'))||T('(espace-client-)?red@')||
T('@/auth/realms/')&&/red/i.test(W.theme)||cas&&(/(\.red-by-|-red\.)sfr\.fr\//.test(R)||
/red-by-sfr|espace-?client-?red|chg(mobile|forfait)red|redlab/.test(cas+par('theme')))||_('html.RED')[0]
_.fel=function(u,c,E){
if(E=ckR('SFRBOLFEL')){E=spl(E,'#');while(E[0]&&!E[0].match('\\bU='+u+'\\b'))E=E.slice(1)}
E=E&&E[0]||''
return c?(E.match('\\b'+c+'=([^:#"]+)\\b')||[])[1]||'':E}
_.font=function(F,i,f,U){
F=spl(F,',')
for(i=0;i<F.length;i++){
f=spl(F[i],':');U=f[1];f=f[0]
U='url("//static.s-sfr.fr/'+(/ClearSans/.test(f)?'resources/font/':'media/')+(U||f.toLowerCase()[RE](/^sfr/,'sfr-1.0')+'-webfont')
ST('@font-face{font-family:"'+f+'";src:'+U+'.eot");src:'+U+'.eot?#iefix") format("embedded-opentype"),'+U+'.woff") format("woff"),'+U+'.ttf") format("truetype"),'+U+'.svg#'+f+'") format("svg");font-weight:400;font-style:normal}')}}
_.msg=function(f,n){W[n='addEventListener']?W[n]("message",f,!1):W.attachEvent("onmessage",f)}
_.dev=function(w){w=screen.width;return w<768?"m":w<1025?"t":"d"}
_.ac=f0
_.GA=f0
_.TL=function(o,l){o.attr('onclick',"return s_tl(this,'e',s.pageName+'/"+l+"',null,'navigate')")}
_.Ist=function(d,b){wait(function(B,r){B=_('body');if(r=B[0])B.A(d.content||'',b?0:1,d=[]);return r})}
_.IstF=function(d){_.Ist(d,1)}
_.ac0=function(s){return(s+'')[RE](/[\300-\377]/g,function(a){return"AAAAAAACEEEEIIIIDNOOOOO 0UUUUY  aaaaaaaceeeeiiiidnooooo 0uuuuy "[a.charCodeAt(0)%64]})}
_.Nn=function(s){s=(s||'')[RE](/^ +/,'');return s.toLowerCase()[RE](/(^|[ '-])./g,function(c){return c.toUpperCase()})[RE](/\bD(e?)\b/g,'d$1')[RE](/\bV([ao]n)\b/g,'v$1')}
_.chFp=function(d){_('#PT>#eTsT').R();_('#PT').A(d&&d.content||'',1)}
_.chF=function(v){log('chF',_.chFv=v);if(cms&&_('#PT')[0])JS('*ettun|chFp')}
_.X=function(u,f,T,X){
X=new XMLHttpRequest
X.onreadystatechange=function(){if(X.readyState===4)f(X.response)}
X.open('GET',u)
if(T)X.setRequestHeader('authorization','Bearer '+T)
X.send()}
_.casB=function(i,c){SM(-1024,(
'@>h1,@>picture,@>div>div+div,#block-numericable,#block-aol{D0!}#block-email>div{line-height:1.1}'+
'@{cursor:pointer;background:'+(c||'#D90D25')+' url("'+i[RE](/^http:/,'')+'") no-repeat;background-size:100%;align-items:start}'+
'@:before{content:none!}.sr-login-search{cursor:default}.sr-mire-wrapper{max-width:1536px}')[RE](/@/g,'.sr-mire-container'))}
if(T(v='altice.net')){
if(_.anD=T(v+'/altice-international'))ST('#disclaimerModal{D0!}')
ckD('disclaimer',v);wait(function(o){
o=_('#disclaimerModal')
if(o[0]){if(_.anD)to(function(){o._('button').cl()},777);o._('.modal-body').S('color','#555');o._('.modal-footer').S('text-align','right')._('a').S('background','none').S('padding','0 0 8px');return!0}})}
if(X<0||T('123parametrez.services@/ota/lbo|altice(france.com|.net)|geodesia.net'))_.sent=1
else{
if(T('rmcsport.tv$')&&L.hash=='#combat')go('/sports-de-combat/')
_.mls=v=function(v){if((v=ckR('MLS'))&&/^".+"$|=/.test(v))ckW('MLS='+escape(unescape(v)[RE](/"/g,'')),1)};v()
_.iab2=1
_.cc=ckR(DP)
if((_.cc&&5)!=5&&W.$sfr)$sfr.istSocialPlugins=f0
ckD('eTiab');ckD('s_cpid');ckD('s_cmpgn');ckD('s_cmpgntp')
if(v=par('eTol'))ckW('eTol='+v[0],1)
if(par('eTarw'))ckW('eTarw=1',1)
if(ckR('eTarw'))ST('bol-mea-slider{D0!}')
if(v=par('eTh'))location='#'+v
if(T('[@#]/espace-client/options$')&&/^#\//.test(L.hash))go(L.href[RE]('/#/','/'))
if(!_.$&&T('[^/]*#')&&!T('#$'))DW('<script src="'+ist+'resources/js/frameworks/jquery/sfr.jquery.js"></script><script>_eT.$=$sfr=$</script>')
if(T('5g-finger-games#')){ST('.cookie-bar{D0!}');JS(ist+'resources/js/frameworks/jquery/sfr.jquery.js')}
if(!/^\|.*\|$/.test(v=par("[Pp]artner[Ii]d")+'|'+(par('memberid')||par('tduid'))+'|'+par('partnername')))ckG(mkg+'='+v,720)
if(v=par("m[Pp]artner[Ii]d"))ckG('eTmkgM'+(T('[^/]*#')?'R':'S')+'='+v,720)
if(T('@/terminer-ma-commande')&&ckR('partnerVAD')=='6ca2a5abd7e65ec27999d997814017f5')ST(
'#checkoutNav,#eTc2{D0!}#eTtun>div{background:url(//static.s-sfr.fr/media/showroom.jpg) no-repeat 60px center}')
if(T('#/forfaits-mobiles$')&&par('redcpid')=='t3')ST('.modalRed--autoOpen{D0!}')
if(T('@/tester-ma-ligne/eligibility-by-address'))ST('body{overflow-y:auto!}')
if(par('sfr')>0)ckD('ISTRED')
if(ckR('ISTRED')>0)ckW('eTred=1',1);else ckD('eTred')
if(T('mes-contacts.services@'))ST('.contacts{height:621px!;overflow-y:auto!}')
ST('iframe[name=google_conversion_frame],iframe#google_conversion_frame,#header .bandeau_cookie,.lia-cookie-banner-alert,html>img{D0}')
if(R&&!R.match(/^https?:\/\/[^\/]*\.sfr\.fr/))ckW('ext_ref='+escape(R),1)
if(N.indexOf('F-Secure CUIF')>-1)_.noP=1
if(W!=W.top&&T('appel@'))sfrIst0=1,ST('body{background:#fff}')
if(W!=W.top&&M('@/parcours/premiere-authent/'))W.top.location[RE](location.href)
if(W!=W.top&&T('@/tester-ma-ligne'))ST('html,body{height:100%;overflow-y:auto!;overflow-x:hidden!}.SFR_M8PrvfFE{background:transparent!;padding:0!}')
if(!T('[^/]*(#|@|\\b(sfrpay.(fr|com)|sfr.com|s-sfr.fr|altice((france|usa).com|.net)|rmcsport.tv|mire.neuf.fr|sfrbusiness.fr|vosmms.com|numericable.fr|sfr.re|mire.ipadsl.net))(/|$)')&&
!W.eTsrc&&!/^Jail/.test(_('title').H()))JS(DJ+'listes.html?D='+L.host)
if(_.nr){
v='eTist0'
if(par('ist')=='0')ckT(v,1,90)
if(ckR(v))ST('#eTrH,#eTrF{D0!}html>body{margin:0!}')}
_.PRO=ckR(mkg).match(pro)
if(T('@/(offre-sfr-pro|box-internet/pro(/|$))')){ckW(mkg+'='+pro+'||',9);if(!_.PRO)elD();_.PRO=1}
else if(_.PRO&&T('@(/box-internet|/offre-internet/(box-fibre|fibre-optique)|/telephonie-mobile/multi-?pack)'))bf0()
if(W.$sfr&&T('@/assistance/telephone-mobile/mode-emploi')){
$sfr.istHeaderSBT=function(){
MktoForms2=eTevt=f0
ST('#eTpi>IFRAME{background:#fff!}footer .logo{float:none!}#chatreactif,.chat_dbl{D0!}')
JS("//www.sfrbusiness.fr/fragments/header/header.standard|Ist")}
$sfr.istFooterSBT=function(){JS("//www.sfrbusiness.fr/fragments/footer/footer.standard|")}}
if(T('appel@')&&par('R'))ST('body{margin:0}#popin-form{background-size:100%}.popin-ctc{max-width:100%;position:static!;margin:0}#telFrance input{width:29px;margin:0 2px}'),SM(539,'#popin-form{margin:0!}.popin-ctc{background:none!}#telInputs>label{width:99%;display:block;margin: 0 0 6px}')
if(T('appel.sfrbusiness.fr')&&par('elg'))ST(
'body{margin:0!}.header,.logo{D0}body>div,.main{background:transparent!}.popin-container{padding:4px 0!}[type=tel]{width:126px!;padding:0 6px!}.img-callLoading{filter:invert(1);opacity:.4}'+
'.cgu{text-align:justify;color:#ccc!;padding:0!;font-size:10px!}.main .form-block span{max-width:none!;color:#fff!;text-align:left}'),SM(414,'[type=tel]{width:108px!}')
if(T('appel.sfrbusiness.fr')&&/eTcc/.test(R))ST('.header{D0!}')
if(T('appel@')&&/5bacecaa7fdf1a67448b4567/.test(par('CAMPAIGN_ID')))ST(
"#popin-content a.redBtn,#popin-content a.redBtn:hover{background:#223986;border:0;padding:10px 40px;height:40px;font:19px 'RMC-Bold',Arial;text-transform:uppercase}"+
"div#telInputs input{border:2px solid #223986;border-radius:0;margin:0 9px 9px 0}")
if(T('(family)?@/web(view|app)/'))ST('#CkC{D0}')
if(cas){if(par('domain')=='sfrcloud-mobile')sfrIst0=1;ST('.page>div[style*="984px"]{D0!}')}
if(W.innerWidth>1024&&((o=T('WM@/webmail/authentication.html'))||!_.nr&&cas&&W._cfCas)){
v='#editoTitle,#editoImage{D0}'
_.msgpub=function(A){
var i=A.creativeurl,u=A.clickUrl,c=A.tracking_url
if(_.wmPu=i&&u){
_.wmPi=/^https?:\/\/[^\/]+sfr\.fr\//.test(A.oryginalClickUrl||u)
_.wmPc=A.creativecountpixel
_.casB(i)}}
if(o||/(webmail|messagerie[^.]*)\.sfr\.fr/.test(par('service'))||par('theme')=='mire-sfrmail'){_.wmPu=1;ST(v);eP('msg',par('U'))}
if(/playpleinepage/.test(par('service')))ST('#editoImage{D0}'),wait(function(o){o=_('#colL');o.A('<a href="https://assistance.sfr.fr/service-et-accessoire/sfr-play/application-sfr-play.html"><img src="'+med+'mea-sfrplay.jpg"/></a>');return o[0]})}
_.sT=function(E,G,I,t,w){wait(function(){if(_.pS){
var c='campaignId',A=[E],B=[],L=_.lse(1),C=/^N-1_Boutique$|ZONE_INFO$/.test(E)
if(E.join){E=(A=E).join('|');A.forEach(function(e,i){B[e]=I[i]||I})}
t=t||par('eTsT')
_.X('https://'+(t?'cms':'www')+IPP+'.sfr.fr/starget/ads-service?blockId='+escape(E)+'&'+
(t&&t!=1?'campaignId='+t:'browserId='+_.vi+'&ascId='+(z.eVar4||'')+(L?'&line='+L[0]:'')+(C?'&slider=true&all=true':'')),function(R,d,i){
if(R&&tS(R))eval('R='+R)
A.forEach(function(E){
var b=B[E]||I,e,r=R[e=E],i,n,so
for(n=0;n<(C?_(b).length:1);n++){
if(C)r=R[n]
if(!r||!r[c])r=R
so=r&&r.idSollicitation
if(i=r&&r[c]){
d=r.html;if(tS(G)){if(d)_.GAB(G,b+(C?'.N'+n:''),d,i,0,e,w,so)}else G(b,d,i,so)}
else if(!tS(G))G(b)}})
if(i=_.sTcb)i(E,R)})
return 1}})}
arrow=pontis={rq:[],GAB:{},request:f0,reqV:f0,
P:function(t){
if(/eTiq/.test(t))ST(".eTiq{display:inline-block;background:#fc0;color:#222;text-transform:uppercase;letter-spacing:-0.5px;font:10px sfrbold,'SFR-Bold';height:18px;line-height:18px;padding: 0 6px}")
return t[RE](/http:\/\/static/g,'//static')[RE](/(<eTag[^>]*>)\s*,?\s*(<\/eTag>)/i,'$1$2')[RE](/#eT:[^#]+#/gi,
function(s,v){s=spl(s.slice(4,-1),'|');v=s[0].match(/[0-9a-z]+/i);return _[v=v&&v[0]]?s[0][RE](v,_[v]):s[1]||''})}}
_.gab=function(g,I,h,b,S,E){_.GAB(g,'#'+b,h,I)}
_.GAB=function(g,b,h,I,S,E,w,so,d,f,i,v,G,st,s,il,ir,e,da,j,k,l,vi,o){
G=arrow.GAB;if(!G[g])return to(function(){_.GAB(g,b,h,I,S,E,w,so)})
e=E||/^#/.test(b)&&b.substr(1)||''
if(h.length)try{eval('d='+h)}catch(e){}else d=h
if(!d)return
if(/v2$/i.test(d.gabarit))g=/^(homeSFR|bandeauSFR)$/.test(g)?g+'v2':g=='ECsfr'?'bandeauSFRv2':g=='homeOTT'?'homeSFRv2':g
o=_.lse(1);s=W.s||_.s;if(I){
st='e=display&r=1&b='+_.vi+'&a='+(z.eVar4||'')+'&E='+e+'&I='+I+(o?'&l='+o[0]+'&i='+o[5]:'')+(so?'&s='+so:'')
if(vi=_.sTvi)wait(function(){if(vi(b)){eP('sTaE',st);return 1}});else eP('sTaE',st)}
f=function(s){
if(w)s=s[RE](/(@media[^{]*width: *)([0-9]+)([^{]*)/g,function(a,b,c,d){return b+(c*1+w)+d})
return s[RE](/\[(<.*?>)?([^\]:<]+)(<.*?>)?:?([^\]]+)?\]/g,function(a,b,c,f,v,j){return G[c]||(
/^(button(Format|Color)|CTA(Style|Position))$/.test(c)&&d[c]?d[c][RE](/ /g,'').toLowerCase():
"DAS"==c?(d[c]||(j=d.das)&&j.labelDevice&&j.bodyD&&j.headD&&j.memberD?'<p class="DAS">DAS <i>🛈</i><span i="'+(da=d[c]||1)+'"></span></p>':''):
"ML"==c?(d[c]?'<p class="ML">'+(d.MLLabel||'Mentions légales')+' <i>©</i><span>'+d[c]+'</span></p>':''):
d[c]&&(b||'')+d[c]+(f||'')||v||'')})[RE](/\[\]/g,S||b)}
i=function(s,b){return s?'<img src="'+s+(b?'" class="S':'')+'"/>':''}
d.FF=d.FONT||d.font||'SFR'
d.B=((v=d.backgroundColor)?v:'#d1d3d4')+(!(v=d.Background||d.background)?'':/(https?:)?\/\//.test(v)?' url('+v+')no-repeat center;background-size:cover':' '+v)
d.I=i(d.keyvisualWeb||d.keyvisual);il=d.ImgLeft||d.leftImageUrl;ir=d.ImgRight||d.rightImageUrl;v=il&&ir;d.IG=i(il,!v);d.ID=i(ir,!v)
ST(f(G[g].style)[RE](/url\(\)/g,'none '))
if(v=_(b).H(arrow.P(f(G[g].html)))[0]){
v.cl=(d.CTAUrl||d.action||'')[RE](/\u200b/g,'')+(d.intId?'#sfrintid='+e[RE](/ /g,'-')+'_'+d.intId:'');v.st=st;if(!v.fc)_(b).cl(v.fc=function(v){v=this;if(v.cl){
if(v.st)eP('sTaE',v.st[RE](/display/,'click'),function(){location=v.cl})
else if(v.cl)location=v.cl}})}
if(d.DAS||da==1){
j=d.das
v='fDa'+nF++
_[v]=function(d,w){if(d){
var h,a=d[0],w=w?'':' W/kg'
if(d[1]){
h='<table><tr><td>DAS<td>Tête<td>Tronc<td>Membre'
d.forEach(function(a){h+='<tr><td>'+a[0]+'<td>'+a[1]+w+'<td>'+a[2]+w+'<td>'+a[3]+w})
h+='</table>'}
else h='<b>'+a[0]+'</b><br>DAS Tête : '+a[1]+w+'<br>DAS Tronc : '+a[2]+w+'<br>DAS Membre : '+a[3]+w
_(b+' .DAS>span').H(h)}else _('b+' .DAS).af()}
if(da==1){da=[];l=spl(j.labelDevice,'|');for(k in l)da[k]=[l[k],spl(j.headD,'|')[k],spl(j.bodyD,'|')[k],spl(j.memberD,'|')[k]];_[v](da,1)}
else eP('das','S='+d.DAS+'&cb=_eT.'+v)}}
if(T('#/offre-internet$'))_stats_univers='Red_Fixe_Bout'
if(T('[@#]/terminer-ma-commande/'))_.font('fontawesome')
_.INC=T('intranet.numericable.com')
if((o=D.currentScript)&&/(www.s-|mist.m.)sfr.fr/.test(o.src)){_stats_zf=1;i=0;if(!ckR('s_vi'))_stats_sent=1}
if(!W.AMP){
if(i){
v='https://'+ssd+(IPP?'.pfv':'')+'.sfr.fr/fragments/profile-stats.js?u='+(i+'')[RE](/["=;]/g,'')
if(_('body')[0])JS(v);else DW('<script type="text/javascript" charset="iso-8859-1" src="'+v+'#"></script>')}
else{
ckW('sfrUserUnreadMessages=',-1,h)
_.pS=1;z[6]='';z[8]=z[13]=z[14]=z[18]=z[19]=z[20]='99';z[10]='1';zvars=z}}
_eTagEnd=0
_.nr=_.nr||W.eTnr
if(T('@/recherche')&&!W.$sfr)$sfr=$||{}
if(W.$sfr){
var naE=0
if(_('link[href*=SFR-PASS\\/red\\.css]')[0])_.nr=1
v=function(f,t){if(_.app)t=7;$sfr['ist'+f]=[
function(){_.nr=1;JS(rbs+'fragments/header/header.standard|Ist')},
function(){_.IR=_.nr=_.hTR=1;_.hEC=0;JS(rbs+'fragments/header/header.standard.tunnel|Ist')},
hdr,
function(){_.IR=_.nr=1;JS(rbs+'fragments/footer/footer.light|')},
function(b,R){
_.IR=_.nr;R=cms&&_.nr;b=!_.nr&&T('123[^.]+.services@|@/espace-client/|@/parcours/')
JS((_.nr?rbs+'fragments/header/header.standard|Ist':
(b?DJ:dj)+(_.hdrP=hS?'hdr21|Ist&U=E':'hdrec|Ist'))+(b?'&D='+r9:''))},
function(o){if(!hS&&naE++<3&&(!o||!o.light))_.ecS(),JS(DJ+'navect|Ist&r='+r9,function(){naE=9},$sfr.istRemote)},
function(){_.rF||JS(_.rF=rbs+'fragments/footer/footer.standard|')},
f0,
function(){JS('//www.rmcsport.tv/fragments/footer/rmc.classic|')},
function(){hdr(1)}][t||0]}
v('HeaderRed')
v('HeaderTunnelRed',1)
v('HeaderEC',_.nr?0:4)
v('HeaderService',2)
v('FooterRed',6)
v('FooterLightRed',3)
v('Remote',_.nr?7:5);v('MyLines',_.nr?7:5)
if(T('#/offre-internet/red-|#/forfaits-mobiles/red/orienteur')){ST("body{margin-left:0!}.app--header--zIndex{z-index:66666}");v('HeaderRed',1);v('HeaderEC',1)}
if(cms)v('HeaderTunnel',9)
if(T('rmcsport.tv/boutique')){
v('HeaderTunnel',7)
_.hdr=function(){if(!hC){
ST(hC='#eThT{height:70px;background:#081a3e url('+med+'rmc-logo-desktop.png) no-repeat 50%;background-size:130px}footer#fclassic *{margin:0;padding:0}')
_.Ist({content:'<header id="eThT"></header>'})}}
_.hdr()
v('Footer',8);_.ftr=$sfr.istFooter}
_.ecS=function(){ST('.sfrDomGlobalWidth,div#scContentWrapper{width:100%!;max-width:984px!}div#scLeftContent,#secondLayoutSideColumnZone{width:0!}div#scMainContent,#secondLayoutMainZone{width:99%!;max-width:99%!}.breadcrumbRN{D0!}')}
if(_.nr){
ST('#eTrH~#eTrH{D0}')
if(T('#/telephones'))ST('.filters-form[style*=fixed]{top:0!}')
v('HeaderService',1);v('HeaderSlim',1);v('HeaderTunnel',1)
v('Header');v('HeaderHome');v('HeaderPro');v('HeaderRN')
v('Footer',6);v('FooterRN',6);v('FooterLight',6)}
if(_.eTp=par('eTpass')||T('#/forfaits-mobiles')&&/change/i.test(par('context'))||
T('[@#]/((mon-)?espace-client|offre-internet/change)|espace-client(-red)?@|sfco#|123[^.]+.services@|@/(tester-ma-ligne|pdrv-pdv|infos?personnelles|facture-(fixe|mobile)|infoconso-mobile|parcours(-securite)?|securite|acteslegaux|gestion(-login|sim)|desimlockage|paiement-(facture|tiers)|pret-mobile|declaration-annuaire|sfr-family|novelli|gestion-empreintes)(/|$)|box@/bolchange')){
v('Header',4);v('HeaderRed',4);v('HeaderHome',4);v('HeaderEC',4);v('HeaderService',4);v('Breadcrumb',7)
if(_.nr)v('Footer',6),v('FooterLight',6);else{ckD('ISTRED');if(v=W.sfrIstConfig)v.isRED=0}
if(T('espace-client-red@/paiement-(mobile|tiers)'))v('Footer',7)
}}
if(Pro&&W.$sfr)$sfr.istHeaderHome=hdr,$sfr.istFooter=ftr
if(/t(9|10)_srp_/.test(par('redcpid')))ckW('eTshrR='+(par('clientId')||1),2)
if(T('#/(offres?-internet|terminer-ma-commande)/')&&ckR('eTshrR')){
if(T('#/offre-internet/'))ST('.js-backDirect{D0!}'),SM(-1025,'html,.flexible__header{margin-top:70px!}')
v('HeaderRed',1)
v('HeaderEC',1)}
ckW('eTagAB='+(b=_.SS?0:ckR('eTagAB')||Math.random()*100|0),720)
if(!/^[-_0-9]{10,}/.test(v=ckR("evar28")))v=(T('[^/]*#')?"9_":"2_")+(TS/1e3-14e8|0)+"_"+r9
_.vi=0;if(_.cc&3)ckW("evar28="+(_.vi=v),9504)
if(!(v=ckR("eTvi")))v=s6(r9+1e9)+s6(TS-1e12);if(_.cc&3)ckW("eTvi="+v,.5)
if(T('#/contact'))ckD('eTnrc')
ST('[data-eTab]{D0}')
if(v=L.search.match(/eTab.{3}=[0-9]/))ckW(v[0],2)
ab(808,b%2+1)
ab(749,2)
ab(787,2)
ab(757,2)
ab(774,2)
ab(686,b<50?1:2)
ab(389,3)
v=ckR('eTab389')
_.hS=hS=T('@/sfr-pay')||_.nr?0:
T(TV+'|(([-a-z]+.|sfr)cloud|assistance|boutique|espace-client|odr|portailsav|recyclage-mobile|actus|(boutique.)?home|webmail|atelier.pp.messagerie)?@')&&!T('@/(terminer|sfrplay|gtm)')
if(hS){
ST('body>header:not(#eThS),body>footer:not(#eTfS){D0!}')
if(o=W.$sfr){o[v='istHeader']=o[v+'RN']=o[v+'Home']=hdr;o[v='istFooter']=o[v+'RN']=ftr;o[v+'Light']=function(){ftr(1)}}
if(T('([-a-z]+.|sfr)cloud')){ST('footer{D0}#eTfS{padding:0!;margin:0!}footer#eTfS>div{padding:4px 1% 2px}#eThS a,#eTfS a{color:inherit!}spc-root{max-height:calc(100vh - 144px)!}');hdr();ftr(1)}
if(T(TV)){_('body').C('Media');ST('');hdr()}}
if(T('#'))ab(465,T('#/telephones/')?0:b>49?2:1)
if(T('#/mon-espace-client$'))ab('TsT',2)
if(v=par('eTabTsT'))ckW('eTagAB='+(v>1?99:1))
if(T('[@#]/tester-ma-ligne/eligibility-by-ndi'))ti(function(o){
if((o=_('#ndi-temp:focus')[0])&&/(\d\d ?){5}/.test(o.value))o.dispatchEvent(new Event("keyup"))},80)
if((_.cc&1)&&T('@/tester-ma-ligne/eligibility-by-ndi'))ti(function(o,v,b){
if((o=_('#ndi-temp')[0])&&/^(\d\d ?){5}$/.test(v=o.value)&&(v=v[RE](/ /g,''))!=_.tel)
_.tel=v,stats({pn:(_stats_pagename||'Eligibilite')+'/ndi',v:{prop29:v}})},80)
if(T('#/tester-ma-ligne/eligibility')){
if(/net.seloger/.test(R))ST('#form-element-client-sfr,.tab__icon{D0!}')
if(par('showAlreadyCustomer')=='false')ST('[for=alreadyCustomer]{D0!}')}
if(T('#/offre-internet/red-'))ST('#chaine .js-tab+.js-tab{D0}')
if(T('WM'))ST((v='.borntobe')+','+v+'be{D0!}')
if(M('#/telephones'))ST('.fleche-top{D0!}')
if(T('#/tester-ma-ligne/')&&/gammeId=[^&]+-SL-/.test(R))ckW('eTelR=1',1)
if(ckR(v='eTelR')){
if(!T('#/tester-ma-ligne/'))ckD(v)
if(T('#/tester-ma-ligne/eligibility-resultats.htm'))ST('#eTag_SL_hide{D0}#eTag_SL_show{display:block!}')}
if(T(v='jeux-tv@')){
ST('#pass-bloc .essentiel,[href*=pass\\+essentiel]{D0!}')
if(T(v+'/pass(\\+|%20)integral$'))ST('#content_header{D0!}')
if(T(v+'/(pass|tout)'))ST('.filtre_selection>div+div+div,.filtre_game>div+div+div{D0!}')}
if(/play.sfr.fr.*layer$/.test(cas))go('?service=https://www.sfr.fr/playpleinepage/',1)
var VL=[205,16760832,"d7ff5fffdbdffbfeffbffffedd1e6357fdffbffffb4ce385f76dfbc3777ff5ff2fc5ffd8ceef177eadaf82ae47892eddb04851db473e7713566c7aa2556bccfb1b93672becd289fcf9269ec6ded9d6061fdfe7f7fcff64a67bffffdffffeffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffbffffffff8",3072],
D2B=function(v,l,r){r=Math.round(v).toString(2);while(r.length<l)r="0"+r;return r},
KLS=function(C){_.LS(DP,_.cc+'`'+C)}
_.a2b=function(k,s,i,r){s=atob(k[RE](/[-]/g,'+')[RE](/_/g,'/'));i=-1;r='';while(++i<s.length)r+=D2B(s.charCodeAt(i),8);return r}
_.b2a=function(b,R){R='';while(b)R+=String.fromCharCode(parseInt((b+"0000000").substr(0,8),2)),b=b.substr(8);return btoa(R)[RE](/=+$/,'')[RE](/\+/g,'-')[RE](/\//g,'_')}
v=ckR('eTiab2')
if(u=(o=parseInt(_.a2b(v).substr(6,36),2))%864000){
KLS(v=_.b2a(D2B(2,6)+D2B(o-u,36)+D2B(o-u,36)+_.a2b(v).substr(78)))
ckW('eTiab2='+v,o/36e3+9432-TS/36e5)}
u=v&&_.cc;if(u&&!_.LS(DP))KLS(v)
if(!u){
o=spl(_.LS(DP)||'');v=o[1];
u=v?(parseInt(_.a2b(v).substr(6,36),2)/36e3+9432-TS/36e5)|0:0
if(u>0){ckW('eTiab2='+v,u);ckW(DP+'='+o[0],u)}else _.LS(DP,'')}
if(_.cc=='0'&&TS/100-o>1564e5&&(T('webmail@')||/webmail/.test(_.cas))){ckD('eTiab2');_.LS(DP,_.cc=v="")}
_.k0=v
_.kL=[]
_.TC=function(P,V,S,M,Z,N){
var B=D2B,E=/^[01]*$/,d=new Date()/100,D=B(d-d%864000,36),R,b,C,f,s=W.s
P=P=='*'?B(VL[1],24):E.test(P)?P:'';while(P.length<24)P+="0"
if(V=='*'){V="";VL[2].split('').forEach(function(c){V+=("000"+parseInt(c,16).toString(2)).substr(-4)});while(V.charAt(b=V.length-1)<1)V=V.substr(0,b)}
N=B(N||V.length,16)
V=E.test(V)?B(V.length,16)+"0"+V:B(0,17)
S=S=='*'?B(VL[3],12):E.test(S)?S:'';while(S.length<12)S+="0"
b=B(2,6)+D+D+B(79,12)+B(2,12)+B(M|0,6)+B(337,12)+B(Z||VL[0],12)+B(2,6)+"10"+S+P+"0"+P.substr(1)+"0"+B(337,12)+V+V+B(0,12)
R='';while(b)R+=String.fromCharCode(parseInt((b+"0000000").substr(0,8),2)),b=b.substr(8)
C=btoa(R)[RE](/=+$/,'')[RE](/\+/g,'-')[RE](/\//g,'_')
KLS(C);ckW('eTiab2='+C,9432);postMessage('1','*');if(f=_.fEc)f()
_('body').S('margin-bottom',0);_('#CkC').R();_.kV=0;if(f=_.kF)f()
if(_.S_t&&(_.cc&3)==3){s.t=_.S_t;_.S_t=0;s.tl=_.S_tl;_.e0=1;stats()}
return C}
__tcfapi=function(c,v,f,p){
log(['IAB2',c,v,f,p])
if(v&&v!=2)if(f)f(null,!1);else return
var O=Object.assign,
T={gdprApplies:!0,cmpStatus:'loaded',tcfPolicyVersion:2,cmpId:79,cmpVersion:1},
L=function(i){return{listenerId:i}},
E=function(p){
var k=ckR('eTiab2'),K=_.a2b(k),
C=function(V,W){return{consents:V,legitimateInterests:W||V}},
A=function(B,n,R,v){R={},n=0;while(v=B[n++])R[n]=v=='1';return R},
V=function(p){
var R={},v=K.substr(213),b=v.charAt(16)>0,n=parseInt(v.substr(0,16),2),i=0
while(i++<n)if((b||v.charAt(16+i)>0)&&(!p||p.indexOf&&p.indexOf(i)>-1))R[i]=!0;return R}
return{
tcString:k,
eventStatus:_.k0?'tcloaded':k?'useractioncomplete':'cmpuishown',
isServiceSpecific:!0,
useNonStandardStacks:!1,
publisherCC:'FR',
purposeOneTreatment:!1,
purpose:C(A(K.substr(152,24)),A(K.substr(176,24))),
vendor:C(V(p)),
specialFeatureOptins:A(K.substr(140,12)),
publisher:O({},C({}),{customPurpose:C({}),restrictions:{}})}}
_.kF=function(){_.kL.forEach(function(f,i){if(f)f(O({},T,E(),L(i+888)),!0)})}
if(c=='ping')f(O({},T,{cmpLoaded:!0,displayStatus:_.kV?'visible':'hidden',apiVersion:"2.0",gvlVersion:VL[0]}))
if(c=='getTCData')f(O({},T,E(p)),!0)
if(c=='addEventListener')f(O({},T,E(),L(887+_.kL.push(f))),!0)
if(c=='removeEventListener'){if(p>887)_.kL[p-888]=0;f(p>887)}
}
_.msg(function(e,d,c,j,i){
try{d=e.data;c=tS(d);j=c?JSON.parse(d):d}catch(e){j=0}
if(i=j&&j.__tcfapiCall)W.__tcfapi(i.command,i.version,function(r,s,m){
m={"__tcfapiReturn":{"returnValue":r,"success":s,"callId":i.callId}}
e.source.postMessage(c?JSON.stringify(m):m,'*')},i.parameter)})
wait(function(N){
if(W.frames[N='__tcfapiLocator'])return 1
B=_('body');if(!B[0])return 0
B.A('<iframe name="'+N+'" style="display:none"></iframe>')},99)
if(_.XSD=T('appel@')&&/5b8567a780df1a45328b4568|5b856be47fdf1aec348b4567/.test(par('CAMPAIGN_ID'))){ST(
'body{max-width:381px;margin:0;padding:30px 9px 0 170px;background:url('+med+'c2c-xs.png) no-repeat;background-size-x:100%}'+
'#popin-header{height:160px}#popin-wrapper{background:transparent}#popin-subtitle{font-size:24px;color:#fff;text-align:left}'+
'#popin-form br{D0}#popin-form fieldset>div{color:#fff;text-align:left}#call-btn{margin-left:5px!;line-height:36px!}#telFrance input{width:27px;margin:0 4px 0 0;border-radius:0}p.credits{text-align:left;margin-top:40px}')
SM(480,'body{min-width:288px;padding:30px 5% 0;background-size:720px;background-position:-240px}')}
if(T('espace-client@')&&_('link[href*=skin-rmc]')[0]||T('rmcsport.tv/boutique')){
ST('#eTtun>div{D0!}#eTtun{height:160px;background:#081a3e url('+med+'rmc-logo-desktop.png) no-repeat center!}#eTsF>div{background:#081a3e!}')
SM(767,'#eTtun{height:80px;background-size:120px!}')}
if(ckR('eTab816')>1&&T('#/offre-internet(/red-(adsl-vdsl|thd|fibre))?$')){
ST('[data-etbot]{visibility:hidden}#decodeur-descriptions .gred-button{z-index:9}')
to(function(){ST('[data-etbot]{visibility:visible}')},3e3)}
if(T('@/forfait-mobile/telephones/forfait-mobile'))ST('#device-group-b_033879_NEUF img[alt*=FLASH],#device-group-b_033880_NEUF img[alt*=FLASH]{height:0;width:60px;padding-bottom:18px;background:url('+med+'picto-lm-nouveau.png);}')
if(T('#/recherche'))ST('.dispo{D0}')
if(T('[#@]/(mon-)?espace-client|espace-client(-red)?@'))_('head').A('<meta name="format-detection" content="telephone=no"/>')
if(_.rmWV=_.app&&T('#/telephones$')&&/AppSFR_RED/.test(navigator.userAgent))ST('.app,.pageNav{margin:0!}.wrap>.filter,.filter__handle{D0}')
if((_.cc&1)&&_.rs){JS('//www.googletagmanager.com/gtag/js?id=UA-143838822-1');dataLayer=[];function gtag(){dataLayer.push(arguments)}gtag('js',da);gtag('config','UA-143838822-1')}
if(_.app&&T('#/forfaits-mobiles/impacts'))_('link[href*=css\\/popin\\.css]').at('href',rbs+'resources/css/popin.css')
if(T('@/parcours-securite/password/oubliMotDePasse')&&par('mobileMode')=='true')
ST('footer.sfrRN{D0!}'+(par('red')=='true'?'.wrapper-captcha a,.help-handler{color:#00e094!}#resetPwdForm button{border:none!;background:#00e094!}':'')+(W!=top?'header,footer{D0!}':''))
if(!W.AMP){_.onL=W.onload;W.onload=function(){if(!W._eTf)JS(ist+'hlfr.js');_.onL&&_.onL()}}
if(!_.nr&&T('@')&&W.$sfr)$sfr.istHeaderHome=hdr
_.nbF=1
_.nbM=v="(altice|apple|blackberry|crosscall|doro|fairphone|google|honor|huawei|mobiwire|oppo|samsung|sony|vivo(mobile)?|xiaomi|(iphone|samsung)reconditionne)-"
_.nbP=v=(hS?'':'@/?$|')+'@(/newsfrfr)?/(offre-internet|(offre|internet)-mobile|boxtv|tv-sfr|options|box-console(?!/playstation-5))(/|$)|@/'+v
if(T(v)){ti(tc,333);ST('bol-search-form{D0}')}
if(!cms&&!W.AMP&&T('@')&&!T(v))jQ()
if(_.sent)return
v=par('eTsTb')
if(v&&T('boutique@$'))ST(_.bSt='div.Services-container{text-align:center}div.Services-bannerWrapper{D0;margin:24px auto 0}')
if(v&&T('boutique@/.*/.*/'))ST(_.bSt='.Carousel>div{D0}')
if(T('webmail@|[#@]/((mon-)?espace-client|recherche/mixte)|(espace-client)?@/services-web$|rmcsport.tv$')||_.bSt)JS(ist+'eTagP/gab.jsp')
if(T('(alticefrance|(www.)?sfr).com'))ST('#Sdisclaimer{display:none!}')
if(T('#/telephones'))ST('.flexible__wrap{margin:0!}.flexible__header{width:100%!;margin:0!;left:0!}.currentPage{margin-top:0!}')
if(T('#/options-red/'))_('link[href*=surcharge]').at('href',rbs+'resources/css/boutique-red/surcharge.css')
if(T('#/[^$]+/private/index$'))ST('div.bloc22{display:inline-block;vertical-align:top;min-width:300px;float:none}')
v=TS/36e5|0
if((ckR('eTch')||v%24%20<7||(v/24%7|0)==3)&&T('communaute#|#/contact$'))ST('[data-id=chat],.dimelo_chat_button{D0!}')
if(par('eTc20'))ckW('eTc20=1',1)
if(T('#/contact')&&ckR('eTc20')+par('eTdim'))ST('#container .chat[style*=block]{display:block!}')
if(v=T('#')&&par('codeP'))ckW('eTcP='+v,48)
_.sTf=function(S){
if(S)ST(S[2]+'{D0}')
_.sTa=function(d){
var nC=0,nR=0,aC=[],tC=[],mS=[],O=_(S[2]),P=_.popin,R=[],s=W.s,To=0,D=d&&d.now||TS,i=par('eTsT'),pv,e4=z.eVar4
if(!_.toS)_.toS=to(function(){To=1},3000)
if(!To&&(S[2]&&!O[0]||!S[2]&&!P||S[3]&&!e4))return to(function(){_.sTa(d)},333)
_.sTr=function(m,r){mS[m]=r;nR++}
log(d)
C=d&&d.content
if(pv=i&&C.find(function(c){return c.id==i})){pv.P=999;R.push(pv)}
C.forEach(function(c,d,ok){
if(c.dzones.find(function(z){return z.label==S[0]})){
if((d=c.startDate)&&new Date(d)>D||(d=c.endDate)&&new Date(d)<D)return
aC.push(c)
c.targets.forEach(function(t,r,m,i){
r=t.semanticRule||''
m=r.match(/CSV\(([^,)]*)/);m=m&&m[1]
if(i=m&&!mS[m]&&e4){
nC++;mS[m]=1;eP('sTaF','id='+i+'&fn='+m)}
m=r.match(/HAR\(/)&&_.lse(1)
if(m&&m[5]!='null-null'&&!mS.HAR){
nC++;mS.HAR=1;eP('sTaH','p='+m[6]+'&id='+m[5])}
})
}})
wait(function(){
if(!To&&nR<nC)return
if(!pv)aC.forEach(function(c){
log(c)
c.targets.forEach(function(t){
var r=t.semanticRule||'',p=c.P=c.P|0,o=0
r='('+r[RE](/\bSAUF\b/i,')&&!(')+')'
r=r[RE](/\bOU\b/ig,'||')[RE](/\bET\b/ig,'&&')
r=r[RE](/DEFAUT\((.*?)\)/g,function(a,b){
p=Math.max(b||1,p);return!0})
r=r[RE](/CSV\(([^,)]*),?(.*?)\)/g,function(a,b,c){
if(b=!!mS[b])p=Math.max(c||20,p);return b})
r=r[RE](/HAR\(([^,)]*),?(.*?)\)/g,function(a,b,c){
if(b=new RegExp(b[RE](/[^0-9]/g,'')).test(mS.HAR))p=Math.max(c||50,p);return b})
log(r)
try{o=eval(r)}catch(e){o=0}
if(o&&p>c.P)c.P=p})
if(p=c.P&&c.tags.find(function(o){return /^POIDS/.test(o)})){o=p.charAt(5);p=p.substr(6)*1;c.P=o=='='?p:o=='+'?c.P+p:o=='-'?c.P-p:c.P}
if(c.P){c.P=Math.sqrt(c.P)*Math.random();R.push(c)}
})
R.sort(function(a,b){return a.P<b.P?1:-1})
R.forEach(function(r,n){
if(!S[2]){P('<div></div>',960,540,0);O=_(S[2]='#eTpiF>div');if(S[4])to(_('#eTpiC').cl,S[4]*999)}
if(O&&O[n]){
_(O[n]).C('eTsT'+n).at('style',0).at('onclick',0)
_.GAB(S[1],'.eTsT'+n,JSON.stringify(r.data),r.id,S[2]+'.eTsT'+n,S[0])}})
if(O)O.af(2)
return 1})}
if(v)eP('sTa',v&&'a');else JS(ist+'eTagP/sTa.jsp')}
if(T('(espace-client)?@/services-web$'))_.sT("HOME_EC_OTT","homeOTT",'hec div#hec-push')
if(T('@/recherche/mixte'))_.sT("SearchSFR","searchSFR","#RS .sTa")
o=0
if(T('rmcsport.tv$')&&!ckR('eTarw')){ckW('eTarw=1',168);o=["Splash_Screen_RMC","imageSimple",0,0,20]}
if((_.cc&2)&&o)_.sTf(o)
if(_.gtmR=T('(communaute)?#|espace-client-red')){
dataLayer=[{'gtm.start':TS,event:'gtm.js'},{event:"consent_change",consent:_.cc}]
JS('//www.googletagmanager.com/gtm.js?id=GTM-KQTX65W')}
if(T('(espace-client)?@/services-web'))ST(
'@font-face{font-family:RMC-Bold;src:url('+IC+'RMC-Bold.woff2);font-weight:400;font-style:normal}'+
'@font-face{font-family:RMC-Regular;src:url('+med+'altice-regular-webfont.woff);font-weight:400;font-style:normal}')
if(T('#/terminer-ma-commande/recap'))ckW('eTsrp=1',par('redcpid')=='t9_srp_partenaire'?1:-9)
if(ckR('eTsrp'))ST('#eTc2cP{D0!}')
if(T('#/bons-plans/showroomprive/forfaits-mobiles'))ckW('partnerId=ee5ffd1ab507664580d413c259164738',.5)
if(hS&&T(_.nbP)){
ST('bol-bol-header{height:0}bol-bol-header>header,#main_menu{top:-800px;max-height:800px}div.bloc_panier{top:864px}.body_panier{padding-bottom:64px}#title_menu_block .bloc_bot{D0}')
SM(-768,'html>body{overflow-x:unset}.bl_photo,.bl_proposition{top:20px!;margin-bottom:40px}div.bloc_panier{top:912px}')}
else if(hS)ST('html>body{margin:0!;width:100%!;padding:0!}#eTsF{margin-left:0!}#eTtN,#eTob{D0!}'+
(T('boutique@')?'html>body.Text{padding:0!}':''))
if(hS&&T('@$|@/accueil/')&&(o=_((v='#Acc3>.ttr')+'>.l'))[1]){
_(v).ev('mouseover',function(){_.nSo=1}).ev('mouseout',function(){_.nSo=0})
ti(function(n){if(!_.nSo){n=_.nS|0;_(o[_.nS=++n%o.length]).cl()}},5e3)}
if(T('@($|.*/acc5.)'))ti(function(){
var c='.capsules>div',l=_(c).length||1,o=_(c+'.s')[0],n=o?Array.from(o.parentNode.children).indexOf(o):0,N=_.nC||0;_.nC=N==n?_('.capsules>div',N=++n%l).cl()&&N:n},5e3)
if(hS&&W.AMP)JS(ist+'resources/js/hdr21.js')
if(T('@$'))ST('#Acc3{z-index:59900;background:#fff}')
if(T('#/terminer-ma-commande/contractV2'))ST('.checkoutHeader__action{height:20px!;top:20px!}')
if(T('sfrcloud@'))ckW('eTcld=1',2184)
if(T('@/espace-client/options')){v='div.sr-hubo-sticky-b';SM(-768,v+":not(.simple-footer){padding:0 200px 0 0;width:100%}"+v+"-2[class]{padding:5px 32px 0 64px}");SM(-1200,v+"-2[class]{padding-left:calc(50vw - 480px)}")}
if(/red-by-sfr/.test(cas)&&par('ecr'))wait(function(o){if((o=_('#eTrH'))[0]){_.rcas=function(d){o.A(d.content,2)};JS('*redcas|rcas');return!0}})
if(T('espace-client@/gestion'))ST('#eTfS{pointer-events:all;filter:none}#eTfS:before{content:none}}')
v=cms||ckR('eTab757')>1
if(T('webmail@')){
o=0
if(v&&T('webmail@/mailbox.html')&&/^#(home|sfr|welcome$)|^$/.test(L.hash))o="/"
if(W!=top&&(T('webmail@$')||par('cnx')))o="/accueil/vide.html"
if(o)return go(o)}
if(v&&W!=top&&/webmail/.test(cas))go(L.href,1)
}})(window,document)
_uM={
"*":"Autres Sites",
"ADSL_Bout":"ADSL/Boutique`sfrunvboutprod",
"ADSL_Bout_pro":"Web/Pro/ADSL/Boutique`sfrunvboutprod",
"ADSL_Epropal":"ADSL/Epropal`sfrunvboutprod",
"assistance":"Assistance",
"auquotidien":"Infos Loisirs```1",
"auQuotidien":"Infos Loisirs```1",
"boutique_ligne":"Boutique`sfrunvboutprod``1",
"cloud":"Cloud",
"communiquer":"Communiquer",
"corporate":"Site Corporate`sfrunvcorpprod",
"espace_client":"Mon Compte",
"Ezy_Offline":"EZY`sfrezyoffline`1",
"forum":"Forum SFR",
"forum_espace-communautaire":"Forum SFR/Espace Communautaire",
"Home_Bout":"HomePages`sfrunvboutprod",
"homebySFR":"Web/Home By SFR/`sfrunvtransprod",
"homepages":"HomePages",
"IntMob_Bout":"Internet Mob/Boutique`sfrunvboutprod``1",
"jeux":"Musique Jeux Images/Jeux```1",
"jeux-argent":"Musique Jeux Images```1",
"jeux_argent":"Musique Jeux Images```1",
"jeux_ec":"Web/SFR/jeux`sfrunvglobprod``1",
"Mob_Bout":"Web/Mobile/Boutique`sfrunvboutprod",
"Mob_Bout_pro":"Web/Pro/Mobile/Boutique`sfrunvboutprod",
"Mob_Epropal":"Web/Mobile/Epropal`sfrunvboutprod",
"MobADSL_Bout":"Mobile Et ADSL/Boutique`sfrunvboutprod",
"MobADSL_Epropal":"Mobile Et ADSL/Epropal`sfrunvboutprod",
"Mon_Compte_NC":"Numericable/Mon Compte`sfrsfrunvncprod",
"monCompte":"Mon Compte`sfrunvmcprod",
"musique":"Musique Jeux Images```1",
"MySFRv2":"Mobile/MySFRv2`sfrmysfr`1",
"Numericable":"Numericable`sfrsfrunvncprod",
"portail":"Portail SFR",
"pwp":"Web`sfrunvmobprod``1",
"pwp_ADSL_Epropal":"Web/Fixe/Epropal`sfrunvmobprod,sfrboutmobprod``1",
"pwp_authent":"Web/Authentification`sfrunvmobprod``1",
"pwp_boutique":"Web/Boutique`sfrunvmobprod,sfrboutmobprod``1",
"pwp_boutique_fixe":"Web/ADSL/Boutique`sfrunvmobprod,sfrboutmobprod``1",
"pwp_boutique_ligne":"Web/Boutique`sfrunvboutprod``1",
"pwp_epropal":"Web/Epropal`sfrunvmobprod,sfrboutmobprod``1",
"pwp_infosloisirs":"Web/Infos Loisirs`sfrunvmobprod``1",
"pwp_Mob_Epropal":"Web/Epropal`sfrunvmobprod,sfrboutmobprod``1",
"pwp_mobadsl":"Web/Mobile Et ADSL`sfrunvmobprod,sfrboutmobprod``1",
"pwp_MobADSL_Bout":"Web/Boutique/4P`sfrunvmobprod,sfrboutmobprod``1",
"pwp_MobADSL_Epropal":"Web/4P/Epropal`sfrunvmobprod,sfrboutmobprod``1",
"pwp_services":"Web/Vos Services```1",
"pwp_storelocator":"Web/Storelocator`sfrunvboutprod``1",
"pwp_trans":"Web/Transverse`sfrunvtransprod`1`1",
"pwp_transverse":"Web/Transverse`sfrunvmobprod``1",
"pwpcorporate":"Web/Portail Corporate`sfrmobcorpprod,sfrunvcorpprod`1`1",
"Red_AIDE":"Red/Aide`sfrunvredassistprod,sfrunvredcommuprod,sfrunvredglobprod``1",
"Red_Bout":"Red/Boutique`sfrredunvboutprod,sfrunvredglobprod``1",
"Red_COMM":"Red/Communaute`sfrunvredcommuprod,sfrunvredglobprod``1",
"Red_Espace_Client":"Red/Mon Compte`sfrredunvmcprod,sfrunvredglobprod``1",
"Red_Fixe_Bout":"Red/Boutique/Fixe`sfrredunvboutprod,sfrunvredglobprod``1",
"Red_Fixe_Epropal":"Red/Boutique/Fixe/Epropal`sfrredunvboutprod,sfrunvredglobprod``1",
"Red_Mob_Bout":"Red/Boutique/Mobile`sfrredunvboutprod,sfrunvredglobprod``1",
"Red_Mob_Epropal":"Red/Boutique/Mobile/Epropal`sfrredunvboutprod,sfrunvredglobprod``1",
"Red_MobADSL_Bout":"Red/Boutique/4P`sfrredunvboutprod,sfrunvredglobprod``1",
"Red_MobADSL_Epropal":"Red/Boutique/4P/Epropal`sfrredunvboutprod,sfrunvredglobprod``1",
"Red_Transverse":"Red/Transverse`sfrunvredglobprod``1",
"RM_Bout":"RM/Boutique`sfrunvboutprod``1",
"rmc_sport":"RMC Sport`sfrrmcsport",
"services":"Vos Services",
"SFR_ACTUS":"Web/Sfr_actus`sfrunvglobprod",
"SFR_BHT":"sfr_bht/`sfrunvglobprod",
"storelocator":"Storelocator`sfrunvboutprod",
"transverse":"Transverse",
"Transverse_mob":"Mobile```1",
"Rse":"Web/rse"}
var s_account="sfrunvglobprod",_sS=[
'1`@``rmc_sport`1',
'2`sc/v5/secure`sc/secure`Mobile/Parametrage/123 Parametrez`1',
'3`/mobile-adsl`/mobile-adsl``1',
'4```Bestof`1',
'4`service/fiche `service/fiche`Bestof/Application`1',
'4`selection/date`selection/date`Bestof/Categorie`1',
'5`/``/Blog Securite/`1',
'6```Neufblog`1',
'7```Boursier`1',
'7`articles/show`.*`Boursier/Articles`1',
'8`/``/Mini Site/Jeux/Jeu Cadeaux`1',
'9`/GCRV5`/GCRV5`Avantage Fidelite/Garantie Carre Rouge`1',
'10```Mini Site/Carte wifi`1',
'11`/``Mini Site/Moments Technos`1',
'12```/TV et Club Video/Club video/`1',
'13```/TV et Club Video/Club video/`1',
'14`/``/Mini Site/Jeux/Jeu Couleur`1',
'14`/ig`.*`/Mini Site/Jeux/Jeu Couleur/Instant Gagnant`1',
'14`/theend`.*`/Mini Site/Jeux/Jeu Couleur/Page Fin`1',
'14`/closed`.*`/Mini Site/Jeux/Jeu Couleur/Fermeture`1',
'15```Emploi`1',
'16`moncompte-webapp/moncompte/avantages/listeCadeaux#`.*`Le Pacte SFR/ADSL/Pactefid/Listecadeaux`1',
'16`moncompte-webapp/moncompte/avantages/cadeauChoisi#`.*`Le Pacte SFR/ADSL/Pactefid/Descripcadeau`1',
'16`moncompte-webapp/moncompte/avantages/commanderCad#`.*`Le Pacte SFR/ADSL/Pactefid/Choixcadeaux/Confirm`1',
'16`pdrv-pdv/`=0`/Espace Sfr/RDV`1',
'16`pdrv-pdv/mail`<4`/Espace Sfr/RDV`1',
'16`moncompte-webapp/sfcu/mobile/infoconso`.*`Conso Facture/Info Conso`1',
'16`sfc-infoconso-ihm/web/deblocage`<2`Conso Facture/Info Conso Data`1',
'17```Enquete`1',
'18```/Conquete Fibre/`1',
'19`profil/`.*`profil/`1',
'20`@``global_test`1',
'21`/infoconso`/infoconso`Conso Facture/LCA/Info Consommation`1',
'22```/TV et Club Video/TV/Guide TV/`1',
'23```/TV Et Club Video/TV/Mode emploi/`1',
'24`/``Home Commande`1',
'25`/``/Sfr Homescope/`1',
'26`/``/Sfr Hubster/`1',
'27``.*`Sauvegarde Sim/Accueil`1',
'28```/Info`1',
'29`/``/Info/`1',
'30```Mini Site/Jeux/SFR International`1',
'31`@#``IntranetNC`1',
'31`/xwiki/bin/view/`/xwiki/bin/view/``1',
'32```Promoslives`1',
'33`@``jeux_ec`1',
'34```/Jeux en Ligne/`1',
'35`/`=0`Jeux/Iphone`1',
'35`/web/fr_sfr_gamifive/category`<2`Jeux/Iphone`1',
'35`/group/fr_sfr_gamifive/game`<2`Jeux/Iphone`1',
'35`/categories``Jeux/Iphone`1',
'35`/settings``Jeux/Iphone`1',
'35`/tos``Jeux/Iphone`1',
'35`/error``Jeux/Iphone`1',
'35`/save``Jeux/Iphone`1',
'35`/infos``Jeux/Iphone`1',
'35`/group/fr_sfr_gamifive/category`<2`Jeux/Iphone`1',
'35`/web/fr_sfr_gamifive/game`<2`Jeux/Iphone`1',
'35`/group/fr_sfr_gamifive/`<3`Jeux/Iphone`1',
'35`/web/fr_sfr_gamifive/`<3`Jeux/Iphone`1',
'36```/Jeux PC/`1',
'37```Jeux A La Demande/`1',
'38```/TV Et Club Video/Club Video/Jeux Concours/`1',
'39`jeu/`jeu/`jeux/`1',
'39`nf/`nf/`Jeux/`1',
'39`/S2.cgi`/S2.cgi`/Jeux/Home`1',
'39`/s2.cgi`/s2.cgi`/Jeux/s2.cgi`1',
'40```/Conquete Fibre Pro Immo/`1',
'42`perso`( perso|perso )``1',
'42`home/u/news`news`Info`1',
'42`home/u/news/cgu`.*`Perso/CGU/Commentaires Info`1',
'42`home/u/news/c/filinfo/s/`>4<2`Info`1',
'42`home/u/musique/home-musique`.*`Musique/Home`1',
'42`home/u/news/home-news`.*`Info/Home`1',
'42`home/u/news/c/alaune`>3<2`Info/A La Une`1',
'42`home/u/musique/c/news/a/pwp-musique-news-home`>4=3<2`Musique/A La Une`1',
'42`home/u/musique/c/`>3``1',
'42`home/u/tv/home-tv`.*`TV/Home`1',
'42`home/u/tv/c/news`>3<2`TV/Actu TV`1',
'42`home/u/tv/c/news/a/pwp`>4=3<2`TV`1',
'42`home/u/tv/o/`>1<1`TV/Offre TV Mobile`1',
'42`home/u/tv/promo-tv`.*`TV/Offre TV ADSL`1',
'42`home/u/mon-compte/home-mon-compte`.*`Mon Compte/Home`1',
'42`home/home-espaces-sfr`.*`Mon Compte/Espaces SFR/Home`1',
'42`home/espaces-sfr-carte`.*`Mon Compte/Espaces SFR/Carte`1',
'42`home/espaces-sfr-detail`.*`Mon Compte/Espaces SFR/Fiche`1',
'42`home/home-assistance`.*`Mon Compte/Mon Assistance`1',
'42`home/home-assistance-adsl`.*`Mon Compte/Mon Assistance/Assistance ADSL`1',
'42`home/home-assistance-mobile`.*`Mon Compte/Mon Assistance/Assistance Mobile`1',
'42`home/assistance`<1`Mon Compte/Mon Assistance`1',
'43```Message visio`1',
'44```Meteo`1',
'45```/Meteo/`1',
'46```TV Et Club Video/TV/`1',
'47```Boursier/Alerte`1',
'47`Sfr Elle`.*`Boursier/Alerte`1',
'47`SfrLive`.*`Boursier/Alerte`1',
'48`/moncompte-webapp/moncompte/`/moncompte-webapp/moncompte/`/ADSL/`1',
'48``/moncompte-webapp/`/ADSL/`1',
'49`@#``MySFRv2`1',
'50`/s3pWeb`/s3pWeb`Infos Perso/LCA`1',
'51`/monprofilWEBV5/`/monprofilWEBV5/`Infos Perso`1',
'52`@#``MySFRv2`1',
'53```/Mini Site/Netgem V5`1',
'54`/ipad#`.*`/Mini Site/Neufbox Evolution/$`1',
'55```/Conquete Fixe/Neuf Talk/`1',
'56```/Neuf Wifi/`1',
'58`/``/Pages Perso ADSL/`1',
'59```Mini Site/Club Palm`1',
'60```Jeux Argent/PMU`1',
'61``fr`Jeux Argent/Paris Hippiques`1',
'62```Jeux Argent/Paris Sportifs`1',
'63```/TV et Club Video/Club video/`1',
'64```Sonneries`1',
'64`/logos_nb/`/logos_nb/`Images/Noir Blanc`1',
'65```Jeux Argent/Poker`1',
'66`/``Preferer SFR4G`1',
'67```TV et Club Video/TV`1',
'68```Avantage Fidelite/Promoslive Sfr`1',
'69```PromosLive`1',
'70`News-People`.*`Public/News`1',
'70`Photos-people`.*`Public/Photos`1',
'70`Videos-people`.*`Public/Videos`1',
'70```Public`1',
'71```People`1',
'72```Recrutement`1',
'73```Recuperation Pages Perso`1',
'74``fr/`Love2recycle`1',
'75```Rencontre Affinite`1',
'76```Rencontres`1',
'77```Mini Site/Evenementiel/Retrocolor/`1',
'78`/``/Sfr Sauvegardes SIM/`1',
'79`/``/Sfr Sauvegardes/`1',
'80`/``/Securite Mobile/`1',
'80`/default`.*`/Securite Mobile/Home`1',
'81```/Conquete Fixe/Securite/Site/`1',
'82```Conquete Fixe/Securite/Site`1',
'83```Bourse`1',
'83`articles/show`.*`Bourse/Articles/Show`1',
'84```Bestof`1',
'84`selection/date`selection/date`Bestof/Categorie`1',
'84`service/fiche`service/fiche`Bestof/Application`1',
'85`webmail``visio mms texto voix`1',
'86```People`1',
'87```Jeunes Talents`1',
'88```Musique/`1',
'89`/``Shopping`1',
'90```Professionnels/Simulateur Pro/`1',
'91`football/article`.*`Sport/Football/Article`1',
'91`rugby/article`.*`Sport/Rugby/Article`1',
'91`auto-moto/article`.*`Sport/Auto Moto/Article`1',
'91`basket/article`.*`Sport/Basket/Article`1',
'91`autres-sport/article`.*`Sport/Autres Sports/Article`1',
'91`tennis/article`.*`Sport/Tennis/Article`1',
'91`golf/article`.*`Sport/Golf/Article`1',
'91`f1/article`.*`Sport/F1/Article`1',
'91`handball/article`.*`Sport/Handball/Article`1',
'91`autres-sports/article`.*`Sport/Autres Sports/Article`1',
'91```Sport`1',
'91`ski/article`.*`Sport/Ski/Article`1',
'91`sports-us/article`.*`Sport/Sports US/Article`1',
'92```Sport`1',
'92`HTML`HTML`Mini Site/Thematique/SFR Foot`1',
'92`direct_foot``Mini Site/Thematique/SFR Foot`1',
'93```Sport`1',
'94```TV Et Club Video/TV`1',
'95```/Conquete Fixe/Telephone Fixe/`1',
'96```Tonalites`1',
'97```Toolbar`1',
'98```/Trafic/`1',
'99```TV et Club Video/TV`1',
'99`/hitview``TV et Club Video/TV/Guide Tv`1',
'99`guide-tv`>2`TV Et Club Video/TV`1',
'100`/`.*`/Mon Compte/Mosaique TV`1',
'101```Femme/Videos`1',
'102```/TV et Club Video/Club video/Club Video PC/`1',
'103```/Conquete Fixe/VOD`1',
'104```/Mini Site/Thematique/SFR Golf`1',
'105``/p/getSubscriptions`Offre Mobile/Abonnement Multimedia`1',
'106`@``communiquer`1',
'106`/main`.*`Messageries/Webmail/Nouveau`1',
'107`/``Mini Site/Moments Technos`1',
'108```/TV Et Club Video/TV/Mode emploi/`1',
'109```Mini Site/Jeux/SFR International`1',
'110```/Conquete Fibre Pro Immo/`1',
'111`/``/Live Concert/`1',
'112```/Mini Site/Netgem V5/`1',
'113`@tester-ma-ligne#``Red_Fixe_Bout`1',
'114```/Conquete Fixe/Securite/Site/`1',
'115```SFR com`1',
'116`Vos services`Vos services``1',
'116`Utiliser Mobile Box`Utiliser Mobile Box``1',
'116`/vos-services/`/vos-services/``1',
'116`/mobile/espace-sfr`/mobile/espace-sfr`/Mobile/Espace Sfr/Store locator/Home`1',
'116`vos-services/services-mobiles/`<2``1',
'116`iphone-4/`iphone-4/`Iphone 3g/`1',
'116`@telephonie-mobile/services-options/``Mob_Util`1',
'116`@adsl-fibre/services-options/``ADSL_Util`1',
'116`@television/services-options/``TV_Util`1',
'116`@cle3g-tablettes/services-options/``Netmob_Util`1',
'116`television/services-options/`<2``1',
'116`@television/``TV_Bout`1',
'116`@multi-packs/``Multipack_Bout`1',
'116`@telephonie-mobile/``Mob_Bout`1',
'116`@cle3g-tablettes/``IntMob_Bout`1',
'116`adsl-fibre/services-options/`<2``1',
'116`cle3g-tablettes/services-options/`<2``1',
'116`telephonie-mobile/services-options/`<2``1',
'116`@mon-espace-client/``espace_client`1',
'116`@vos-services/services-fixes-adsl/``ADSL_Util`1',
'116`/vos-services/services-fixes-adsl/`<2``1',
'116`@vos-services/services-mobiles/``Mob_Util`1',
'116`@vos-services/internet-partout/``Netmob_Util`1',
'116`/vos-services/internet-partout/`<2``1',
'116`/mon-espace-client/`<1``1',
'116`/espace-client/diagnostic-conseil`<1``1',
'116`concours-video/`=0`/Mini Site/Eyeka`1',
'116`/do/profile`/do/profile`Infos Perso/Profil`1',
'116`/info_nouveautes/actus_promos/astuces_du_mois```1',
'116`/mc-mobile`Mc Mobile/[^/]*``1',
'116`/mc-mobile/espace-client/mieux-utiliser-mon-mobile`Mc Mobile/[^/]*/[^/]*`Texto Mms Photo`1',
'116`/sfr_entreprises`/sfr_entreprises``1',
'116`Sfrtv`Sfrtv`Tv Video/Home`1',
'116`/sfrtv/products`Products/\(List\)*`Infos Mobile/Tv Mobile`1',
'116`/utiliser/services/jeux`/utiliser/services/jeux``1',
'116`/communiquer/messagerie`communiquer/messagerie`Communiquer/Messageries`1',
'116`webmessagerie``Texto Mms Photo`1',
'116`/espace-client/`/espace-client/``1',
'116`/evenements/``/Mini Site/Thematique/`1',
'116`jeux/`jeux``1',
'116`/mobile-adsl/sfr-sur-mesure/`Mobile Adsl/Sfr Sur Mesure/`Offre sur Mesure/Accueil-OSM`1',
'116`/index-sso-sfr-sur-mesure.jsp`Espace Client/Offre Mobile/Index Sso Sfr Sur Mesure`Mon Compte/Offre Mobile/Offre Sur Mesure/Accueil-OSM`1',
'116`/espace-client/mobile/repertoire-SIM/`/Espace Client/Mobile/Repertoire SIM/`Mon Compte/Mobile/Repertoire Sim`1',
'116`/mobile-adsl`/mobile-adsl``1',
'116`/mobile/`/mobile/`Conquete`1',
'116`acces/generique`.*`Authentification/Generique Clients Neuf Partenaire`1',
'116`/innovation/``/Mini Site/Thematique/`1',
'116`/mobile/espace-sfr/`/mobile/espace-sfr/`/Mobile/Espace Sfr/Store locator/`1',
'116`@telephonie-mobile-pro/``Mob_Bout`1',
'116`@multi-packs-pro/``Multipack_Bout`1',
'116`/espace-client/diagnostic-conseil-scdc`<1``1',
'116`espace-client/consulter-factures-mobile/consultation/getbilanconso#`.*`Conso Facture/Facture Sur Internet/Bilan Conso/Detail$`1',
'116`espace-client/consulter-factures-mobile/consultation/getsynthesebilanconso#`.*`Conso Facture/Facture Sur Internet/Bilan Conso/Synthese$`1',
'116`@parcours-securite/``espace_client`1',
'117`@``bt_transverse`1',
'118`@``cloud`1',
'118``.*`Mon activite`1',
'119```Jeunes Talents`1',
'120```En`1',
'121```Fr`1',
'122``/cgi-bin/sfrwifi.storefront/<ID>``1',
'123```SHD`1',
'124``sfr-blender`Sport/SFR Glisse/Zapping`1',
'125```/Vos MMS/`1']
var _sD='.*[.]rmcsport[.]tv|123parametrez.services$|adsite-under$|bestof.m$|blog-securite$|blog$|boursier.m$|cadeaux$|carrerouge$|cartewifi$|choix.jeu-sfr.com|club-video$|clubvideo$|couleurs$|emploi$|espace-client$|etude.contact-sfr.com|fibre-optique$|forum$|futpsw$|gcppinf$|guide-tv$|guidestv-sfr.fr|hc$|homescope$|hubster$|import-contacts$|info.m$|info$|international.jeu-sfr.com|intranet.numericable.com|iphone-dev.promoslive.com|jeusfretmoi$|jeux-en-ligne$|jeux-iphone.m$|jeux-pc$|jeux-tv$|jeux.club-video$|jeux.m$|lafibresfr.fr|m.sfr.com|m$|message-visio$|meteo.m$|meteo$|mic-tv$|mobiles.boursier.com|moncompte-neufbox$|monintranet.mysfr.com|monprofil-lacarte$|monprofil$|mysfrv2|nb2$|neufboxevolution$|neuftalk$|neufwifi$|numericable.fr|pages-perso$|palm$|paris-hippiques-pmu$|paris-hippiques$|paris-sportifs$|passvodillimites$|persodumobile.services$|poker$|preferer4g$|preview-tv$|promoslive-sfr.services$|promoslive.m$|public.m$|public$|recrutement.sfr.com|recuperation-pagesperso$|recyclage-mobile$|rencontre-affinite$|rencontres$|retrocolor$|sauvegarde-sim$|sauvegardes$|securite-mobile$|securite-neufbox$|securite$|sfr-bourse.dev2.bkt.mobi|sfr-bow-v2.dev.bkt.mobi|sfr-messagerie.services$|sfr.public.fr|sfrjeunestalents.fr|sfrmusic.oxalide-test.com|shopping$|simulation.sfr.pro|sport.m$|sport$|sports$|static-tv$|telephone-fixe$|tonalites.services$|toolbar$|trafic$|tv$|video.wapsvp$|videos.elle$|vod-pc$|vod$|web.golfsfr.com|webcare$|webmail$|www.choix.jeu-sfr.com|www.guidestv-sfr.fr|www.international.jeu-sfr.com|www.lafibresfr.fr|www.live-concert$|www.nb2$|www.red-by-sfr.fr|www.securite-neufbox$|www.sfr.com|www$|www.sfrbusinessteam.fr|www.sfrcloud$|www.sfrjeunestalents.fr|www.sfrpay.com|www.sfrpay.fr|www.sfrwifiservice.com|www.shdnet.fr|www.u-koncept.com|www.vosmms.com'.replace(/\$/g,'.sfr.fr').split('|')
var _blackList='((portailsfr[.](espacesfr|distrib)|distrib-kara[.]espacesfr|kara)[.]sfr[.]fr|intra-(portailsfr|kara-direct)[.]sfr[.]com)`.*[.]0pb[.]org`localhost.*`moncompte-adsl.sfr.re`www.free.fr'
var _sR=[
'*`^adsite-under/(.*)$`$1',
'*`^(c\\d{1,3})-[^/]*((/f\\d{1,3})-[^/]*)*((/t\\d+)-.*\\.htm|/?)$`$1$3$5',
'*`^(.*)\.(php[345]?|jspe?|html?|dml|aspx?|exe|do|action)$`$1',
'*`^(.*/)?(index)?$`$1Home',
'*`^(.*/)?(do/|servlet/|private/|v5/|cgi-bin/)(.*)$`$1$3',
'*`(-|,|_|%5F|%20|%2D)` ']
_eT.gR=function(L){
var W=window,_=W._eT,D=_.gtmR&&W.dataLayer,s=W.s||_.s,e=s.events,pu=/purchase/i.test(e),P=(s.products||'').split(','),I=[]
if(D){
D.push({
event:L?'tracklink':'update_path'+(_eT.gtmR++>1?'_spa':''),
page_name:s.pageName,
authentification:s.prop10,
page_name_is_rewritted:s.prop17,
client_type:s.prop18,
order_id_2:s.prop57,
purchase_type:s.evar46})
P.forEach(function(e,i){i=e.split(";");I.push({
item_name:i[1],
item_id:i[1],
price:i[3],
item_category:i[0],
quantity:i[2]})})
if(e=pu?'purchase':/scAdd/i.test(e)?'add_to_cart':/scCheckout/i.test(e)?'begin_checkout':/prodView/i.test(e)?'view_item':0)D.push({
event:e,ecommerce:pu?{purchase:{transaction_id:s.purchaseID|s.transactionID|s.prop57,currency:'EUR',items:I}}:{items:I}})}}
function trm(s){return(s!=null)?(""+s).replace(/(^\s+|\s+$)/g,""):""}
function mef(s){
var m=1,t=""
if(typeof _stats_accent!='undefined'){try{s=decodeURIComponent(s)}catch(e){}}
s=s.replace(/%20/g," ").replace(/[\s_\+]+/g," ").replace(/ ?(\/)+ ?/g,"/").replace(/[ \/]+$/,"")
for(var i=0;i<s.length;i++){
var c=s.charAt(i)
if(m)c=c.toUpperCase()
t+=c
m=c==" "||c=="/"}
return t}
function spl(c,s){return c.split&&c.split(s||'`')||''}
function stat_get_product(c,l,q,p){var t=function(s){return trm(s).replace(/[,;]/g,'.')};return t(c)+";"+t(l)+";"+t(q)+";"+t(p)}
function stat_evt_purchase(i,p,e){s.purchaseID=trm(i);s.products=p.join(",");s.events="purchase"+(e?","+e:"")}
function stat_evt(e,p){s.events=trm(e);if(p)s.products=typeof p=="object"?p.join(","):p}
function stat_link(){stats({pn:s.pageName})}
function wt_link(l){var s=s_gi(s_account);s_tl(this,'o',l)}
function s_t(){s_p();s_c();s.t()}
function s_tl(t,o,l,v,f,a){l=_eT.ac0(l);s_p(0,l);s_c();s.tl(t,o,l,v,f);_eT.gR(1);return!1}
function s_v(v){var t=typeof s[v];return t=='undefined'?'':t=='object'?s[v][0]:s[v]}
function s_p(c,p){return _eT.EV&&_eT.EV(c,p)||!0}
function s_c(i){for(i=1;i<80;i++){
if(/^([5689]|1[13-7]|2[089]|3[0-46]|4[2678]|5[1389]|6[14579]|7[012])$/.test(i))delete s['prop'+i]
if(/^([14-68]|1[345]|2[0-36-8]|3[2-469]|4[0148]|5[0-39]|6[038]|7[0-36])$/.test(i))delete s['eVar'+i]}}
function stat_dom(h){
var b=spl(_blackList),d=_sD,k
if(h=='cms.sfr.fr')h='www.sfr.fr'
for(k=0;k<b.length;k++)if(RegExp('^'+b[k]+'$').test(h))return 0
for(k in d)if(RegExp('^'+d[k|0]+'$').test(h))return 1*k+1
if(!_uM['*'])return 0
return d.length+1}
function stat_uni(u,uni){
var e=spl(u.replace(/^https?:\/\/([^\/]+)\/?(adsite-under\/)?(.*)$/,"$1`$3")),d=stat_dom(e[0]),t='@'+e[1],l=-1,f,v=!uni||!_uM[uni],m=_sS
for(i in m){
var A=spl(m[i]),p=A[1]
if(!A||A[0]!=d||p.charAt(0)!='@')continue
if(f=p.match(/#$/))p=p.replace(/#$/,"")
if((f||v)&&p.length>l&&!t.indexOf(p)){l=p.length;uni=A[3]}}
return uni&&_uM[uni]?uni:"transverse"}
function stat_rep(t,o){
var q=o.charAt(0),n=1*(o+"0").charAt(1)
if(q=='=')t=stat_sup(t,n,n)
if(q=='<')t=stat_sup(t,0,n-1)
if(q=='>')t=stat_sup(t,n+1,99)
if(o=o.substring(2))t=stat_rep(t,o)
return t}
function stat_sup(t,d,f){
var R=spl(t,'/'),s='',i
for(i=0;i<R.length;i++)if(i<d||i>f)s+=R[i]+'/'
return s.replace(/.$/,'')}
function stats(o){
var	W=window,D=document,_=_eT,pn=trm(W._stats_pagename),m=_sS,Z=W.zvars||[],ckR=_.ckR,ckW=_.ckW,par=_.par,
A,i,r,v,hi,did=0,sid=0,l=-1,u=(W._stats_url||D.URL).replace(/\/adsite-under/,''),
a=u.indexOf("://")+3;if(a<3)return
var d=(u+"#").indexOf("#"),b=u.indexOf("/",a);if(b<0)b=d
var c=u.indexOf("?",b);if(c<0)c=d
var h=u.substring(a,b),t=u.substring(b+1,c<d?c:d);if(!h)return
if(!W.s||!s.t)s=_.s
if(typeof o=='object'){
if(o.pn)pn=trm(o.pn)
if(i=o.ev||o.e)Z["events"]=s.events=i==9?'':trm(i)
if(o.p)s.products=o.p
if(o.v)_stats_vars=o.v}
pn=pn.replace(/[#?].*/,'')
did=stat_dom(h);if(!did)return
for(i in W._stats_vars)Z[i]=_stats_vars[i]
for(i in W.stat_pvars)if(29<i&&i<76)Z["prop"+i]=stat_pvars[i];else if(i=="pageName")pn=stat_pvars[i]
for(i in W.stat_evars)if(29<i&&i<76)Z["eVar"+i]=stat_evars[i]
t=t.replace(/(;|%3b)jsessionid=(.*)/i,'')
for(i in m){
A=spl(m[i])
if(A[0]!=did)continue
v=A[1].replace(/#$/,"")
if(v.charAt(0)=='/')v=v.substring(1)
if(v.length>l&&t.indexOf(v)==0){l=v.length;sid=1*i+1}}
for(i in _sR){
A=spl(_sR[i])
if(A[0]=="*"||A[0]==sid){
t=t.replace(new RegExp(A[1],"g"),A[2])
if(r=A[3])t.replace(new RegExp(r,"g"),"")}}
t=t.replace(/^\//,"")
if(sid){
A=spl(m[sid-1])
if(A[2]){
A[2]=A[2].replace(/<ID>/,"[a-zA-Z0-9]{0,32}")
v=A[2].charAt(0)
if(v==">"||v=="<"||v=="=")t=stat_rep(t,A[2])
else{
if(v=="/")A[2]=A[2].substring(1)
A[2]=A[2].replace(new RegExp("(-|_)")," ")
t=t.replace(new RegExp(A[2],"g"),"")}}
if(A[3])t=A[3].charAt(A[3].length-1)=='$'?A[3].substring(0,A[3].length-1)+pn+t:A[3]+"/"+t
if(A[1].match(/#$/))pn=0}
t=t.replace(/^\//,"")
i=t.indexOf("/")
if(i>0&&t.substring(0,i).toUpperCase()==s_univers.toUpperCase())t=t.substring(i+1)
v=s_univers+"/"
if(!/^(Web|Mobile)\//.test(v))v="Web/"+v
t=/^Web\//.test(t)?t:v+t
if(pn)t=!pn.indexOf("Web/")||!v.indexOf("Mobile/")&&!pn.indexOf("Mobile/")?pn:v+pn
if(D.URL.match(/\/adsite-under/))t=t.replace(/^(Web|Mobile)(.*)$/,"$1/Site Under$2")
if(/Authentification/.test(t)&&D.getElementsByClassName('g-recaptcha')[0])t+='/CAPTCHA'
t=mef(t)
if(_.pro)t=t.replace(/^([^\/]+\/[^\/]+\/[^\/]+\/)/,"$1Pro/")
Z["server"]=h
Z['pageName']=t
Z["eVar29"]="D=pageName"
Z["hier1"]=t.substring(0,t.lastIndexOf("/"))
if(/\bA_Reengager\b/.test(ckR('eTc2ol')))Z[15]='C2OL'
Z['prop17']=pn?2:1
if(/^Zive$/.test(W._stats_univers))Z['prop25']=_.mob()?'mobile':'desktop'
Z["prop27"]=u.match(/^https/i)?"HTTPS":"HTTP"
v='sfrclicid';Z["prop12"]=par('[Rrs][ef][dr]clicid')||ckR(v);_.ckD(v)
A=spl(t,'/')
Z['channel']=A[1]
Z['prop1']=v=A[1]+":"+A[2]
Z['eVar11']="D=c1"
if(A[3]){Z['prop2']=A[1]+":"+A[2]+":"+A[3];Z['eVar12']="D=c2"}
if(A[4])Z[53]=A[1]+":"+A[2]+":"+A[3]+":"+A[4]
Z["eVar7"]=''
if(!v.match(/Survey|Authent/)){
c=ckR('eTagUI')||'>#'
if(A[1]=='Mon Compte')v=A[1]
if(A[1]=='HomePages')v=A[1]+":"+A[3]
if(A[2]=='Boutique'||v=='HomePages:Accueil')v='BOL'
if(A[3]=='Espace SFR')v='Store Locator'
v=v.replace(/[#>]/,'')
c=c.replace('>'+v+'>','>').replace(/#$/,v+'>#')
while(c.replace(/[^>]/g,'').length>5)c=c.substring(c.indexOf('>',1))
if(c!=ckR('eTagUI'))ckW('eTagUI='+(Z["eVar7"]=c),4)}
Z["eVar28"]=(c=ckR('evar28'))?c:"refus_cookie"
v="|";if(!_.SS){
A=D.cookie.match(/eTab(RE|CC|W|[A-Za-z0-9]{3})=./g)
for(i=0;A&&i<A.length;i++)v+=A[i].replace('=','-').replace(/^eTab/,'')+"|"}
Z[55]=v
Z[63]=ckR("bonsPlansSFR")
Z[70]=ckR("sfrHome")
Z[71]=ckR("sfrBox")
Z["prop73"]=u.replace(/[?#].*/,'')
if(typeof _eTag=='object'){v="";for(i in _eTag)if(typeof _eTag[i]=='string')v+=i+" ";Z["prop65"]=v}
if((v=W._eTag)&&(v=v["ProspectMsisdn"]))Z["prop71"]=v
if(v=W._stats_xnokiagid)Z["prop30"]=v
Z["prop33"]=navigator.userAgent.replace(/[ :;\/]+/g,'_')
if(v=W._stats_famillepwp)Z["prop34"]=v
v=Z["eVar4"]||""
if(typeof _stats_lignes=="object"){
c=_stats_lignes[unescape(ckR('MLS'))]
if(c&&c[1])v=c[0]}
Z[20]=v
for(i in Z){v=Z[i];if(i>0){s["prop"+i]=v;s["eVar"+i]=v.length>5?"D=c"+i:v}else if(v)s[i]=v}
v=['prop18','eVar18','prop19','eVar19']
for(i=0;i<v.length;i++)if(s[v[i]])s[v[i]]=s[v[i]].replace("t","H").replace("x","N")
if(typeof s.zip=='function')s.zip=null
i=s.events
if(v=W._stats_events)i=i?i+","+v:v
if(/prodView/.test(i)&&!/event14/.test(i))i+=",event14"
s.events=i
i=s.products;if(v=W._stats_products)s.products=i?i+","+v:v
if(ckR("authent")!=(c=s.prop10+"_"+s.eVar4)&&s.prop10=="2"){
s.events=(s.events?s.events+",":"")+"event16"
s.eVar9="Authentification reussie : RememberMe "+(ckR("rmeh")||ckR("rme")?"":"non ")+"demande"}
ckW("authent="+c)
s.purchaseID=s.purchaseID||s.prop57
s.campaign=par("[RrSs][ef][dr]cpid")
s.eVar3=o&&o.si||_.iid
s.eVar37=''
s.eVar80=_.cc||0
_.cc&2||(s.prop36='')
if(_.T('appel@')){s.prop45=par('CAMPAIGN_ID');s.prop46=par('R')}
if((i=s.pageName.match(/Layer Detail Offre.Poffer.GP.CARRE.(.*)/))&&(W.sP||(sP=s.products)))s.products=sP.match(new RegExp('(;'+i[1].replace(/ /g,'_')+'[^,]*)'))[1]||''
s_c();if(t=(!_.SS||W._err)&&s.t())_('body,head',0).A(t)
s_p();_.gR()
t=_.elr;if(t&&_.T('@/forfait-mobile/(offres/detail|telephone)/')&&_.sent)t([1])
}
function sVideoPlay(n,o){if(n){
if(!sVideos[n]){
stats({ev:"event60",v:{66:n}})
sVideos[n]={obj:o,dur:-1,vis:0}}
sVideos[n].to=setTimeout("sVideoHit('"+n+"')",999)}}
function sVideoStop(n){if(n&&sVideos[n]&&sVideos[n].to)clearTimeout(sVideos[n].to)}
function sVideoHit(n){
var sV=sVideos[n]
if(sV.dur<0){sV.dur=Math.floor(sV.obj.getDuration());sV.p1=Math.round(sV.dur/2);}
if(++sV.vis==sV.p1)stats({ev:"event61",v:{66:n}})
if(sV.vis==sV.dur)stats({ev:"event62",v:{66:n}})
else sV.to=setTimeout("sVideoHit('"+n+"')",999)}
(function(W,a,u,l){
sVideos=[]
a=trm(W._stats_account)
u=trm(W._stats_univers)
l=trm(W._stats_url)||document.URL
if(!u||!_uM[u])u=trm(W.univers)
u=spl(_uM[stat_uni(l,u)])
l=u[1];s_account=a?a:u[2]?l:s_account+(l?","+l:"")
s_univers=u[0]})(window)
var s_cpType=""
function s_getChannel(u){
var	cpT="|SEA marque generique|Epub Acquisition|Affiliation|Comparateur|Email conquete|Email client mobile|Kit connexion|Email client Trigger|Partenaire|Mini Boutique|Email autre client|Email client ADSL|Email client cross sell|Communautaire|Referencement payant contenus|Email base business Team|Innovation yahoo|Email prospect Trigger|Reseaux sociaux|Email gestion|Alerte SMS|Epub retargeting|Epub mobile|Video|Email Retargeting|Portail Mobile|Appli SFR|SEO Redirect MSFR|SMS client|SMS alerte contenu|SMS gestion|Rebond Appli|Affiliation site under|SEA marque|SEA hors marque|Epub trade|Epub brand|Partenaire ACN|Email ePropal|Numericable|Google My Business|Virgin Mobile|Appli RED|Epub CRM|SMS acquisition|Epub Local|SEA Local",
cpS="abdbif=abandon biz|abdbol=prospect bol|abdrela=abandon rela|access+oire|acc+ueil|accueil=Page accueil|adsl^|adslb=ADSL Branding|adslr=ADSL ROI|amf^|app+le|appli=Appli SFR|as=alerte stock|ass=portail assistance|atel+ier SFR|atelb<ier branding|appec=Appli Mon Compte|autres=Autres Moteurs|bol<utique en ligne|bolmd=BOL en MD|chain+e|cler< ROI|cm=community management|comkt=comarket|corp+orate|data+ entreprise|dm=dailymotion|ec=Portail Espace Client|espsfr=Espace Sfr|event<ementiel|fb=facebook|fbk=facebook|fbmobr=facebook Mobile ROI|fc=Flashcode|genmob=Generique mobile|gest+ion|gestedatis=gestion|glf=Galerie Lafayette|hbs=Home by SFR|htc^|inter=International|jeu+x|jeunestal=Jeunes talents|jeuntal=Jeunes talents|jt=Jeunes talents|key+worder|live+concert|marq+ue|md^|meteo=Portail meteo|minbz=MinuteBuzz|micro+soft|mob+ile|mobguide=mobile|mobr<ile ROI|nat+urel|netperf=Netperf|nl^|nlamf=NL AMF|nlinfo=NL SFR info|nlinnov=NL innovation|nlmag=NL minimag SFR|nlminimag=NL minimag SFR|nlstudio=NL Le studio SFR|nsj=sur Mobile|pacte=Le Pacte SFR|parcn< neuf|partner=partenaire|pe=plateforme Externe|pj=pages Jaunes|portail+ SFR|print+|prosp+ection|rbd=Rebond|regie+ SFR|rela+tionnel|rev+eil|rex=Experience client|secu+rite|sfrbt=SFR BT|shzm=Shazam|sitemtv=site MTV|tele2< 2|testao=test appel offre|tgr=trigger|tgrjeu=trigger jeux|TouchClarity=Touch Clarity|trans+verse|tv^|twit+ter|umpc^|umpcb=UMPC branding|upload=Telechargement|vadsl=video sur ADSL|vir+al|vod^|xadsl=cross sell ADSL vers Mobile|xbi=cross sell bi equipe vers Mobile|xmob=cross sell Mobile vers ADSL|yt=youtube|zic=musique"
var	m=u.match(/[?#&](sfr|red)cpid=([^#&]*)/i),
v=t=m?m[2]:"",
e=t.replace(/^t([0-9]+)_?([^_]*).*$/,"$1|$2").split("|"),
c=cpT.split("|")
s_cpid=v
if(e[0]>0&&c[e[0]]){
v=e[1].toLowerCase()
var d=cpS.split("|"),l=v.length
for(var n=0;n<d.length;n++) if(d[n].substring(0,l)==v){
var a=d[n].charAt(l),r=d[n].substring(l+1)
if("=+<^".indexOf(a)<0) continue
v=a=='='?r:a=='+'?v+r:a=='<'?v.substring(0,l-1)+r:a=='^'?v.toUpperCase():v
v=v.charAt(0).toUpperCase()+v.substring(1)
break}
v=c[e[0]]+" "+v
s_cpType=c[e[0]]}
return t?v+"|"+t:""}
/* SiteCatalyst code version: H.25.4 (avr13)
Copyright 1996-2013 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */
var s=s_gi(s_account)
s.charSet="UTF-8"
s.currencyCode="EUR"
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,dmg"
s.linkInternalFilters="sfr.fr,red-by-sfr.fr,vosmms.com,sips-atos.com,slimpay.net,rmcsport.tv,cb4x.fr,sdkweb.idcheck.io,contract.floabank.fr,alticemedia-adsconnect.fr"
s.useLinkTrackSessionStorage=s.trackDownloadLinks=s.trackInlineStats=s.ActionDepthTest=s.usePlugins=s.writeSecureCookies=!0
s.trackExternalLinks=s.linkLeaveQueryString=!1
s.linkTrackVars=s.linkTrackEvents="None"
s.forcedLinkTrackingTimeout=500
s.cookieLifetime=34e6
s._extraSearchEngines=s._channelDomain=s._channelParameter=""
s._channelPattern=s_getChannel(document.URL)
if(v=_eT.ckR('eTol')){s.trackOffline=!0;s.offlineHitLimit=100;s.offlineThrottleDelay=300;v=v>0?'ff':'n';s['forceO'+v+'line']()}
function s_doPlugins(s,u){
u=location.href
s.pageURL=u.replace(/#/g,'&').replace('&',/\?/.test(u)?'&':'?')
if(s.getQueryParam(u='s_kwcid'))s.pageURL=s.manageQueryParam(u,1,1)
if(s.ActionDepthTest){
s.pdvalue=s.getActionDepth("s_depth")
if(s.pdvalue==1){
s.events=s.apl(s.events,'event45',',',2)
if(!s.eVar45&&!s.prop40) s.eVar45=s.prop40="D=pageName"}
if(s.pdvalue==2) s.events=s.apl(s.events,'event46',',',2)
s.ActionDepthTest=!1}
s.events=s.apl(s.events,'event47',',',2)
s.prop41=s.getPreviousValue(s.pageName,'gpv_p41','')
if(s.prop41)s.eVar47="D=c41"
if(!s.campaign)s.campaign=s.getQueryParam('sfrcpid')
s.campaign=s.getValOnce(s.campaign,'sfrcpid',0)
if(!s.eVar3)s.eVar3=s.getQueryParam('sfrintid')
s.eVar3=s.getValOnce(s.eVar3,'sfrintid',0)
if(s.eVar3)s.prop50="D=v3"
if(s.prop3){
s.prop3=s.prop3.toLowerCase()
s.eVar2="D=c3"
if(s.getValOnce(s.eVar2,'ev2',0))s.events=s.apl(s.events,'event1',',',1)}
if((s.events.indexOf('purchase',0)>-1)&&s.eVar46){
if((s.eVar46.indexOf('Bol:',0)>-1)&&(s.eVar46.indexOf('Migration',0)>-1)) s.events=s.apl(s.events,"event51",",",2)
else{
if(s.eVar46=='Bol:RM') s.events=s.apl(s.events,"event48",",",2)
if((s.eVar46=='Bol:Conquete')||(s.eVar46=='Bol:MID PC')||(s.eVar46=='Bol:CLE 3G')) s.events=s.apl(s.events,"event49",",",2)
if((s.eVar46=='Bol:Signup ADSL')||(s.eVar46=='BOL:SHD')||(s.eVar46=='Bol:Signup FIBRE')) s.events=s.apl(s.events,"event50",",",2)}}
if(u=s.linkHandler('betclic.fr|membres.fdj.fr|zeturf.fr|pagesjaunes.fr|keljob.com|facebook.com|youtube.com|dailymotion.com|twitter.com|leguide.com|cetelem.fr|boursorama.com|priceminister.com|lesoffrescanal.fr|fortuneo.fr|ebay.fr','e')){
s.prop49=u
s.linkTrackVars='prop49'}
var	r=(s.referrer||document.referrer||'').toLowerCase(),
m=r.match(/\/\/(([^\/]*\.)?([^\/.]+\.[^\/.]+))\//),
h=m?m[1]:'',d=m?m[3]:'',
v=',',di=v+s.linkInternalFilters+v
m=0
if(s_cpid||r&&d&&di.indexOf(v+h+v)<0&&di.indexOf(v+d+v)<0){
var se={'q':'aol|bing|google','p':'yahoo'},seo=0
for(var p in se){
if(r.match(new RegExp('[^/]*//([^/]+\\.)?('+se[p]+')\\.[^?]*/'))) m=r.match(new RegExp('[?&]'+p+'=([^&#]*)'))}
if(m!=0)seo="SEO Inconnu"
if(m&&m[1])seo=unescape(m[1]).match(/sfr|neuf|cegetel|\bcarr(e\b|\xe9)|\b(9\D?(gigas?|online)|club\W?internet|red)\b/)?"SEO Marque":"SEO Hors Marque"
var a=h.match(/messagerie|mail/)?"Webmail":r?"Autres sites":"",c=s._channelPattern
s.eVar57=s_cpType||(s_cpid?"Non reconnue":seo?"SEO":a)
s.eVar56=(c?c.substring(0,(c+'|').indexOf('|')):s_cpid.replace(/^([^_]+_[^_]+).*/,"$1"))||seo||a
s.eVar58=s_cpid||seo||a}
if(window._eT){
_eT.ckD('ext_ref')
if(m)_eT.KW=m[1]
var lv=_eT.ckR('eTagLV')*6e4,ts=new Date().getTime(),n=ts/864e5|0,m=n-30,j=(ts-lv)/864e5|0,cvp=function(k,e){
var vo=_eT.ckR(k),A,r='',v='',l='',j=0
if(e)vo=(vo?vo+'|':'')+n+':'+e.replace(/ /g,'+')
A=vo.split('|')
if(vo)for(var i=A.length-1;i>-1;i--){
var I=(A[i]+':').split(':')
if(I[0]<m||I[1]==l||j>9) e=1
else{
j++
v='|'+I[0]+':'+I[1]+v
r='>'+I[1].replace(/\+/g,' ')+r}
l=I[1]}
if(e){
_eT.ckW(k+"="+v.substring(1),720)
return r?r.substring(1):'N/A'}
return ''}
if(j>0)s['eVar1'+(/red-by-sfr.fr$/.test(location.host)?7:6)]=lv?j:'X'
s.eVar59=cvp('s_cmCat',s.eVar57)
s.eVar60=cvp('s_cmDet',s.eVar58)
if(s.eVar56)s.eVar39=s.eVar40=s.eVar56
else if(r==''){
if(lv<ts-36e5)s.eVar39="Tape/Marque"
if(lv<ts-288e5)s.eVar40="Tape/Marque"}
s.eVar50=cvp('s_cmCT',s.prop64=s.eVar58||(ts<lv+18e5?'':r&&ts<lv+864e5?_eT.ckR('s_cmCT').replace(/^.*:/,''):"Tape/Marque"))
_eT.ckW('eTagLV='+(ts/6e4|0),9504)}
s.plugins=""}
s.doPlugins=s_doPlugins
s.repl=new Function("x","o","n","var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x.substring(i+o.length);i=x.indexOf(o,i+l)}return x");
s.getQueryParam=s.Util.getQueryParam;
s.p_gpv=new Function("k","u","h","var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.substring(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k","if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'True':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s.epa(v)}return''");
s.getValOnce=new Function("v","c","e","var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return v==k?'':v");
s.split=new Function("l","d","var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
s.apl=new Function("L","v","d","u","var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a.length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCase()));}}if(!m)L=L?L+d+v:v;return L");
s.getAndPersistValue=new Function("v","c","e","var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if(v)s.c_w(c,v,e?a:0);return s.c_r(c);");
s.crossVisitParticipation=new Function("v","cn","ex","ct","dl","ev","dv","var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.length;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}if(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape(v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array();if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=arry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,'\\'','');arry[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.length-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date().getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td.getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',front:'[',back:']',wrap:'\\''});s.c_w(cn,data,e);var r=s.join(h,{delim:dl});if(ce)s.c_w(cn,'');return r;");
s.join = new Function("v","p","var s = this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back:'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0;x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);else str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");
s.manageQueryParam=new Function("p","w","e","u","var s=this,x,y,i,qs,qp,qv,f,b;u=u?u:(s.pageURL?s.pageURL:''+s.wd.location);u=u=='f'?''+s.gtfs().location:u+'';x=u.indexOf('?');qs=x>-1?u.substring(x,u.length):'';u=x>-1?u.substring(0,x):u;x=qs.indexOf('?'+p+'=');if(x>-1){y=qs.indexOf('&');f='';if(y>-1){qp=qs.substring(x+1,y);b=qs.substring(y+1,qs.length);}else{qp=qs.substring(1,qs.length);b='';}}else{x=qs.indexOf('&'+p+'=');if(x>-1){f=qs.substring(1,x);b=qs.substring(x+1,qs.length);y=b.indexOf('&');if(y>-1){qp=b.substring(0,y);b=b.substring(y,b.length);}else{qp=b;b='';}}}if(e&&qp){y=qp.indexOf('=');qv=y>-1?qp.substring(y+1,qp.length):'';var eui=0;while(qv.indexOf('%25')>-1){qv=unescape(qv);eui++;if(eui==10)break;}qv=s.rep(qv,'+',' ');qv=escape(qv);qv=s.rep(qv,'%25','%');qv=s.rep(qv,'%7C','|');qv=s.rep(qv,'%7c','|');qp=qp.substring(0,y+1)+qv;}if(w&&qp){if(f)qs='?'+qp+'&'+f+b;else if(b)qs='?'+qp+'&'+b;else qs='?'+qp}else if(f)qs='?'+f+'&'+qp+b;else if(b)qs='?'+qp+'&'+b;else if(qp)qs='?'+qp;return u+qs;");
s.getActionDepth=new Function("c","var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(!s.c_r(c)){v=1}if(s.c_r(c)){v=s.c_r(c);v++}if(!s.c_w(c,v,t)){s.c_w(c,v,0)}return v;");
s.getPreviousValue=new Function("v","c","el","var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
s.linkHandler=new Function("p","t","e","var s=this,o=s.p_gh(),h=o.href,i,l;t=t?t:'o';if(!h||(s.linkType&&(h||s.linkName)))return'';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.pt(p,'|','p_gn',h.toLowerCase());if(l){s.linkName=l=='[['?'':l;s.linkType=t;return e?o:h;}return'';");
s.p_gh=new Function("","var s=this;if(!s.eo&&!s.lnk)return'';var o=s.eo?s.eo:s.lnk,y=s.ot(o),n=s.oid(o),x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&&y!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)return'';y=s.ot(o);n=s.oid(o);x=o.s_oidt;}}return o?o:'';");
s.p_gn=new Function("t","h","var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x=t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}return 0;");
s.visitorNamespace="sfr"
s.trackingServer="metrics"+(window._stats_zf||_eT.ckR('eTabZFA')>1?"zf":"")+".sfr.fr"
s.trackingServerSecure="s"+s.trackingServer
s.visitorMigrationKey="4CCBEF5D"
s.visitorMigrationServer="sfr.122.2o7.net"
function AppMeasurement_Module_ActivityMap(f){function g(a,d){var b,c,m;if(a&&d&&(b=e.c[d]||(e.c[d]=d.split(","))))for(m=0;m<b.length&&(c=b[m++]);)if(-1<a.indexOf(c))return null;n=1;return a}function p(a,d,b,c,e){var g,k;if(a.dataset&&(k=a.dataset[d]))g=k;else if(a.getAttribute)if(k=a.getAttribute("data-"+b))g=k;else if(k=a.getAttribute(b))g=k;if(!g&&f.useForcedLinkTracking&&e){var h;a=a.onclick?""+a.onclick:"";varValue="";if(c&&a&&(d=a.indexOf(c),0<=d)){for(d+=c.length;d<a.length;)if(b=a.charAt(d++),
0<="'\"".indexOf(b)){h=b;break}for(k=!1;d<a.length&&h;){b=a.charAt(d);if(!k&&b===h)break;"\\"===b?k=!0:(varValue+=b,k=!1);d++}}(h=varValue)&&(f.w[c]=h)}return g||e&&f.w[c]}function q(a,d,b){var c;return(c=e[d](a,b))&&(n?(n=0,c):g(h(c),e[d+"Exclusions"]))}function r(a,d,b){var c;if(a&&!(1===(c=a.nodeType)&&(c=a.nodeName)&&(c=c.toUpperCase())&&s[c])&&(1===a.nodeType&&(c=a.nodeValue)&&(d[d.length]=c),b.a||b.t||b.s||!a.getAttribute||((c=a.getAttribute("alt"))?b.a=c:(c=a.getAttribute("title"))?b.t=c:"IMG"==
(""+a.nodeName).toUpperCase()&&(c=a.getAttribute("src")||a.src)&&(b.s=c)),(c=a.childNodes)&&c.length))for(a=0;a<c.length;a++)r(c[a],d,b)}function h(a){if(null==a||void 0==a)return a;try{return a.replace(RegExp("^[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]+$","mg"),"").replace(RegExp("[\\s\\n\\f\\r\\t\t-\r \u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u205f\u3000\ufeff]{1,}",
"mg")," ").substring(0,254)}catch(d){}}var e=this;e.s=f;var l=window;l.s_c_in||(l.s_c_il=[],l.s_c_in=0);e._il=l.s_c_il;e._in=l.s_c_in;e._il[e._in]=e;l.s_c_in++;e._c="s_m";e.c={};var n=0,s={SCRIPT:1,STYLE:1,LINK:1,CANVAS:1};e._g=function(){var a,d,b,c=f.contextData,e=f.linkObject;(a=f.pageName||f.pageURL)&&(d=q(e,"link",f.linkName))&&(b=q(e,"region"))&&(c["a.activitymap.page"]=a.substring(0,255),c["a.activitymap.link"]=128<d.length?d.substring(0,128):d,c["a.activitymap.region"]=127<b.length?b.substring(0,
127):b,c["a.activitymap.pageIDType"]=f.pageName?1:0)};e.link=function(a,d){var b;if(d)b=g(h(d),e.linkExclusions);else if((b=a)&&!(b=p(a,"sObjectId","s-object-id","s_objectID",1))){var c,f;(f=g(h(a.innerText||a.textContent),e.linkExclusions))||(r(a,c=[],b={a:void 0,t:void 0,s:void 0}),(f=g(h(c.join(""))))||(f=g(h(b.a?b.a:b.t?b.t:b.s?b.s:void 0)))||!(c=(c=a.tagName)&&c.toUpperCase?c.toUpperCase():"")||("INPUT"==c||"SUBMIT"==c&&a.value?f=g(h(a.value)):"IMAGE"==c&&a.src&&(f=g(h(a.src)))));b=f}return b};
e.region=function(a){for(var d,b=e.regionIDAttribute||"id";a&&(a=a.parentNode);){if(d=p(a,b,b,b))return d;if("BODY"==a.nodeName)return"BODY"}}}
function AppMeasurement(r){var a=this;a.version="2.12.0";var k=window;k.s_c_in||(k.s_c_il=[],k.s_c_in=0);a._il=k.s_c_il;a._in=k.s_c_in;a._il[a._in]=a;k.s_c_in++;a._c="s_c";var q=k.AppMeasurement.ac;q||(q=null);var p=k,m,s;try{for(m=p.parent,s=p.location;m&&m.location&&s&&""+m.location!=""+s&&p.location&&""+m.location!=""+p.location&&m.location.host==s.host;)p=m,m=p.parent}catch(u){}a.D=function(a){try{console.log(a)}catch(b){}};a.Pa=function(a){return""+parseInt(a)==""+a};a.replace=function(a,b,d){return!a||
0>a.indexOf(b)?a:a.split(b).join(d)};a.escape=function(c){var b,d;if(!c)return c;c=encodeURIComponent(c);for(b=0;7>b;b++)d="+~!*()'".substring(b,b+1),0<=c.indexOf(d)&&(c=a.replace(c,d,"%"+d.charCodeAt(0).toString(16).toUpperCase()));return c};a.unescape=function(c){if(!c)return c;c=0<=c.indexOf("+")?a.replace(c,"+"," "):c;try{return decodeURIComponent(c)}catch(b){}return unescape(c)};a.Ib=function(){var c=k.location.hostname,b=a.fpCookieDomainPeriods,d;b||(b=a.cookieDomainPeriods);if(c&&!a.Ha&&!/^[0-9.]+$/.test(c)&&
(b=b?parseInt(b):2,b=2<b?b:2,d=c.lastIndexOf("."),0<=d)){for(;0<=d&&1<b;)d=c.lastIndexOf(".",d-1),b--;a.Ha=0<d?c.substring(d):c}return a.Ha};a.c_r=a.cookieRead=function(c){c=a.escape(c);var b=" "+a.d.cookie,d=b.indexOf(" "+c+"="),f=0>d?d:b.indexOf(";",d);c=0>d?"":a.unescape(b.substring(d+2+c.length,0>f?b.length:f));return"[[B]]"!=c?c:""};a.c_w=a.cookieWrite=function(c,b,d){var f=a.Ib(),e=a.cookieLifetime,g;b=""+b;e=e?(""+e).toUpperCase():"";d&&"SESSION"!=e&&"NONE"!=e&&((g=""!=b?parseInt(e?e:0):-60)?
(d=new Date,d.setTime(d.getTime()+1E3*g)):1===d&&(d=new Date,g=d.getYear(),d.setYear(g+2+(1900>g?1900:0))));return c&&"NONE"!=e?(a.d.cookie=a.escape(c)+"="+a.escape(""!=b?b:"[[B]]")+"; path=/;"+(d&&"SESSION"!=e?" expires="+d.toUTCString()+";":"")+(f?" domain="+f+";":""),a.cookieRead(c)==b):0};a.Fb=function(){var c=a.Util.getIeVersion();"number"===typeof c&&10>c&&(a.unsupportedBrowser=!0,a.tb(a,function(){}))};a.tb=function(a,b){for(var d in a)a.hasOwnProperty(d)&&"function"===typeof a[d]&&(a[d]=b)};
a.M=[];a.fa=function(c,b,d){if(a.Ia)return 0;a.maxDelay||(a.maxDelay=250);var f=0,e=(new Date).getTime()+a.maxDelay,g=a.d.visibilityState,h=["webkitvisibilitychange","visibilitychange"];g||(g=a.d.webkitVisibilityState);if(g&&"prerender"==g){if(!a.ga)for(a.ga=1,d=0;d<h.length;d++)a.d.addEventListener(h[d],function(){var c=a.d.visibilityState;c||(c=a.d.webkitVisibilityState);"visible"==c&&(a.ga=0,a.delayReady())});f=1;e=0}else d||a.o("_d")&&(f=1);f&&(a.M.push({m:c,a:b,t:e}),a.ga||setTimeout(a.delayReady,
a.maxDelay));return f};a.delayReady=function(){var c=(new Date).getTime(),b=0,d;for(a.o("_d")?b=1:a.za();0<a.M.length;){d=a.M.shift();if(b&&!d.t&&d.t>c){a.M.unshift(d);setTimeout(a.delayReady,parseInt(a.maxDelay/2));break}a.Ia=1;a[d.m].apply(a,d.a);a.Ia=0}};a.setAccount=a.sa=function(c){var b,d;if(!a.fa("setAccount",arguments))if(a.account=c,a.allAccounts)for(b=a.allAccounts.concat(c.split(",")),a.allAccounts=[],b.sort(),d=0;d<b.length;d++)0!=d&&b[d-1]==b[d]||a.allAccounts.push(b[d]);else a.allAccounts=
c.split(",")};a.foreachVar=function(c,b){var d,f,e,g,h="";e=f="";if(a.lightProfileID)d=a.Q,(h=a.lightTrackVars)&&(h=","+h+","+a.ka.join(",")+",");else{d=a.g;if(a.pe||a.linkType)h=a.linkTrackVars,f=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(h=a[e].Zb,f=a[e].Yb));h&&(h=","+h+","+a.G.join(",")+",");f&&h&&(h+=",events,")}b&&(b=","+b+",");for(f=0;f<d.length;f++)e=d[f],(g=a[e])&&(!h||0<=h.indexOf(","+e+","))&&(!b||0<=b.indexOf(","+e+","))&&c(e,g)};a.q=function(c,
b,d,f,e){var g="",h,l,k,n,m=0;"contextData"==c&&(c="c");if(b){for(h in b)if(!(Object.prototype[h]||e&&h.substring(0,e.length)!=e)&&b[h]&&(!d||0<=d.indexOf(","+(f?f+".":"")+h+","))){k=!1;if(m)for(l=0;l<m.length;l++)h.substring(0,m[l].length)==m[l]&&(k=!0);if(!k&&(""==g&&(g+="&"+c+"."),l=b[h],e&&(h=h.substring(e.length)),0<h.length))if(k=h.indexOf("."),0<k)l=h.substring(0,k),k=(e?e:"")+l+".",m||(m=[]),m.push(k),g+=a.q(l,b,d,f,k);else if("boolean"==typeof l&&(l=l?"true":"false"),l){if("retrieveLightData"==
f&&0>e.indexOf(".contextData."))switch(k=h.substring(0,4),n=h.substring(4),h){case "transactionID":h="xact";break;case "channel":h="ch";break;case "campaign":h="v0";break;default:a.Pa(n)&&("prop"==k?h="c"+n:"eVar"==k?h="v"+n:"list"==k?h="l"+n:"hier"==k&&(h="h"+n,l=l.substring(0,255)))}g+="&"+a.escape(h)+"="+a.escape(l)}}""!=g&&(g+="&."+c)}return g};a.usePostbacks=0;a.Lb=function(){var c="",b,d,f,e,g,h,l,k,n="",m="",p=e="",r=a.V();if(a.lightProfileID)b=a.Q,(n=a.lightTrackVars)&&(n=","+n+","+a.ka.join(",")+
",");else{b=a.g;if(a.pe||a.linkType)n=a.linkTrackVars,m=a.linkTrackEvents,a.pe&&(e=a.pe.substring(0,1).toUpperCase()+a.pe.substring(1),a[e]&&(n=a[e].Zb,m=a[e].Yb));n&&(n=","+n+","+a.G.join(",")+",");m&&(m=","+m+",",n&&(n+=",events,"));a.events2&&(p+=(""!=p?",":"")+a.events2)}if(r&&a.xa()&&r.getCustomerIDs){e=q;if(g=r.getCustomerIDs())for(d in g)Object.prototype[d]||(f=g[d],"object"==typeof f&&(e||(e={}),f.id&&(e[d+".id"]=f.id),f.authState&&(e[d+".as"]=f.authState)));e&&(c+=a.q("cid",e))}a.AudienceManagement&&
a.AudienceManagement.isReady()&&(c+=a.q("d",a.AudienceManagement.getEventCallConfigParams()));for(d=0;d<b.length;d++){e=b[d];g=a[e];f=e.substring(0,4);h=e.substring(4);g||("events"==e&&p?(g=p,p=""):"marketingCloudOrgID"==e&&r&&a.X("ECID")&&(g=r.marketingCloudOrgID));if(g&&(!n||0<=n.indexOf(","+e+","))){switch(e){case "customerPerspective":e="cp";break;case "marketingCloudOrgID":e="mcorgid";break;case "supplementalDataID":e="sdid";break;case "timestamp":e="ts";break;case "dynamicVariablePrefix":e=
"D";break;case "visitorID":e="vid";break;case "marketingCloudVisitorID":e="mid";break;case "analyticsVisitorID":e="aid";break;case "audienceManagerLocationHint":e="aamlh";break;case "audienceManagerBlob":e="aamb";break;case "authState":e="as";break;case "pageURL":e="g";255<g.length&&(a.pageURLRest=g.substring(255),g=g.substring(0,255));break;case "pageURLRest":e="-g";break;case "referrer":e="r";break;case "vmk":case "visitorMigrationKey":e="vmt";break;case "visitorMigrationServer":e="vmf";a.ssl&&
a.visitorMigrationServerSecure&&(g="");break;case "visitorMigrationServerSecure":e="vmf";!a.ssl&&a.visitorMigrationServer&&(g="");break;case "charSet":e="ce";break;case "visitorNamespace":e="ns";break;case "cookieDomainPeriods":e="cdp";break;case "cookieLifetime":e="cl";break;case "variableProvider":e="vvp";break;case "currencyCode":e="cc";break;case "channel":e="ch";break;case "transactionID":e="xact";break;case "campaign":e="v0";break;case "latitude":e="lat";break;case "longitude":e="lon";break;
case "resolution":e="s";break;case "colorDepth":e="c";break;case "javascriptVersion":e="j";break;case "javaEnabled":e="v";break;case "cookiesEnabled":e="k";break;case "browserWidth":e="bw";break;case "browserHeight":e="bh";break;case "connectionType":e="ct";break;case "homepage":e="hp";break;case "events":p&&(g+=(""!=g?",":"")+p);if(m)for(h=g.split(","),g="",f=0;f<h.length;f++)l=h[f],k=l.indexOf("="),0<=k&&(l=l.substring(0,k)),k=l.indexOf(":"),0<=k&&(l=l.substring(0,k)),0<=m.indexOf(","+l+",")&&(g+=
(g?",":"")+h[f]);break;case "events2":g="";break;case "contextData":c+=a.q("c",a[e],n,e);g="";break;case "lightProfileID":e="mtp";break;case "lightStoreForSeconds":e="mtss";a.lightProfileID||(g="");break;case "lightIncrementBy":e="mti";a.lightProfileID||(g="");break;case "retrieveLightProfiles":e="mtsr";break;case "deleteLightProfiles":e="mtsd";break;case "retrieveLightData":a.retrieveLightProfiles&&(c+=a.q("mts",a[e],n,e));g="";break;default:a.Pa(h)&&("prop"==f?e="c"+h:"eVar"==f?e="v"+h:"list"==
f?e="l"+h:"hier"==f&&(e="h"+h,g=g.substring(0,255)))}g&&(c+="&"+e+"="+("pev"!=e.substring(0,3)?a.escape(g):g))}"pev3"==e&&a.e&&(c+=a.e)}a.ja&&(c+="&lrt="+a.ja,a.ja=null);return c};a.C=function(a){var b=a.tagName;if("undefined"!=""+a.ec||"undefined"!=""+a.Ub&&"HTML"!=(""+a.Ub).toUpperCase())return"";b=b&&b.toUpperCase?b.toUpperCase():"";"SHAPE"==b&&(b="");b&&(("INPUT"==b||"BUTTON"==b)&&a.type&&a.type.toUpperCase?b=a.type.toUpperCase():!b&&a.href&&(b="A"));return b};a.La=function(a){var b=k.location,
d=a.href?a.href:"",f,e,g;f=d.indexOf(":");e=d.indexOf("?");g=d.indexOf("/");d&&(0>f||0<=e&&f>e||0<=g&&f>g)&&(e=a.protocol&&1<a.protocol.length?a.protocol:b.protocol?b.protocol:"",f=b.pathname.lastIndexOf("/"),d=(e?e+"//":"")+(a.host?a.host:b.host?b.host:"")+("/"!=d.substring(0,1)?b.pathname.substring(0,0>f?0:f)+"/":"")+d);return d};a.N=function(c){var b=a.C(c),d,f,e="",g=0;return b&&(d=c.protocol,f=c.onclick,!c.href||"A"!=b&&"AREA"!=b||f&&d&&!(0>d.toLowerCase().indexOf("javascript"))?f?(e=a.replace(a.replace(a.replace(a.replace(""+
f,"\r",""),"\n",""),"\t","")," ",""),g=2):"INPUT"==b||"SUBMIT"==b?(c.value?e=c.value:c.innerText?e=c.innerText:c.textContent&&(e=c.textContent),g=3):"IMAGE"==b&&c.src&&(e=c.src):e=a.La(c),e)?{id:e.substring(0,100),type:g}:0};a.bc=function(c){for(var b=a.C(c),d=a.N(c);c&&!d&&"BODY"!=b;)if(c=c.parentElement?c.parentElement:c.parentNode)b=a.C(c),d=a.N(c);d&&"BODY"!=b||(c=0);c&&(b=c.onclick?""+c.onclick:"",0<=b.indexOf(".tl(")||0<=b.indexOf(".trackLink("))&&(c=0);return c};a.Tb=function(){var c,b,d=a.linkObject,
f=a.linkType,e=a.linkURL,g,h;a.la=1;d||(a.la=0,d=a.clickObject);if(d){c=a.C(d);for(b=a.N(d);d&&!b&&"BODY"!=c;)if(d=d.parentElement?d.parentElement:d.parentNode)c=a.C(d),b=a.N(d);b&&"BODY"!=c||(d=0);if(d&&!a.linkObject){var l=d.onclick?""+d.onclick:"";if(0<=l.indexOf(".tl(")||0<=l.indexOf(".trackLink("))d=0}}else a.la=1;!e&&d&&(e=a.La(d));e&&!a.linkLeaveQueryString&&(g=e.indexOf("?"),0<=g&&(e=e.substring(0,g)));if(!f&&e){var m=0,n=0,p;if(a.trackDownloadLinks&&a.linkDownloadFileTypes)for(l=e.toLowerCase(),
g=l.indexOf("?"),h=l.indexOf("#"),0<=g?0<=h&&h<g&&(g=h):g=h,0<=g&&(l=l.substring(0,g)),g=a.linkDownloadFileTypes.toLowerCase().split(","),h=0;h<g.length;h++)(p=g[h])&&l.substring(l.length-(p.length+1))=="."+p&&(f="d");if(a.trackExternalLinks&&!f&&(l=e.toLowerCase(),a.Oa(l)&&(a.linkInternalFilters||(a.linkInternalFilters=k.location.hostname),g=0,a.linkExternalFilters?(g=a.linkExternalFilters.toLowerCase().split(","),m=1):a.linkInternalFilters&&(g=a.linkInternalFilters.toLowerCase().split(",")),g))){for(h=
0;h<g.length;h++)p=g[h],0<=l.indexOf(p)&&(n=1);n?m&&(f="e"):m||(f="e")}}a.linkObject=d;a.linkURL=e;a.linkType=f;if(a.trackClickMap||a.trackInlineStats)a.e="",d&&(f=a.pageName,e=1,d=d.sourceIndex,f||(f=a.pageURL,e=0),k.s_objectID&&(b.id=k.s_objectID,d=b.type=1),f&&b&&b.id&&c&&(a.e="&pid="+a.escape(f.substring(0,255))+(e?"&pidt="+e:"")+"&oid="+a.escape(b.id.substring(0,100))+(b.type?"&oidt="+b.type:"")+"&ot="+c+(d?"&oi="+d:"")))};a.Mb=function(){var c=a.la,b=a.linkType,d=a.linkURL,f=a.linkName;b&&(d||
f)&&(b=b.toLowerCase(),"d"!=b&&"e"!=b&&(b="o"),a.pe="lnk_"+b,a.pev1=d?a.escape(d):"",a.pev2=f?a.escape(f):"",c=1);a.abort&&(c=0);if(a.trackClickMap||a.trackInlineStats||a.Pb()){var b={},d=0,e=a.ob(),g=e?e.split("&"):0,h,l,k,e=0;if(g)for(h=0;h<g.length;h++)l=g[h].split("="),f=a.unescape(l[0]).split(","),l=a.unescape(l[1]),b[l]=f;f=a.account.split(",");h={};for(k in a.contextData)k&&!Object.prototype[k]&&"a.activitymap."==k.substring(0,14)&&(h[k]=a.contextData[k],a.contextData[k]="");a.e=a.q("c",h)+
(a.e?a.e:"");if(c||a.e){c&&!a.e&&(e=1);for(l in b)if(!Object.prototype[l])for(k=0;k<f.length;k++)for(e&&(g=b[l].join(","),g==a.account&&(a.e+=("&"!=l.charAt(0)?"&":"")+l,b[l]=[],d=1)),h=0;h<b[l].length;h++)g=b[l][h],g==f[k]&&(e&&(a.e+="&u="+a.escape(g)+("&"!=l.charAt(0)?"&":"")+l+"&u=0"),b[l].splice(h,1),d=1);c||(d=1);if(d){e="";h=2;!c&&a.e&&(e=a.escape(f.join(","))+"="+a.escape(a.e),h=1);for(l in b)!Object.prototype[l]&&0<h&&0<b[l].length&&(e+=(e?"&":"")+a.escape(b[l].join(","))+"="+a.escape(l),
h--);a.ub(e)}}}return c};a.ob=function(){if(a.useLinkTrackSessionStorage){if(a.Ca())return k.sessionStorage.getItem(a.R)}else return a.cookieRead(a.R)};a.Ca=function(){return k.sessionStorage?!0:!1};a.ub=function(c){a.useLinkTrackSessionStorage?a.Ca()&&k.sessionStorage.setItem(a.R,c):a.cookieWrite(a.R,c)};a.Nb=function(){if(!a.Xb){var c=new Date,b=p.location,d,f,e=f=d="",g="",h="",l="1.2",k=a.cookieWrite("s_cc","true",0)?"Y":"N",m="",q="";if(c.setUTCDate&&(l="1.3",(0).toPrecision&&(l="1.5",c=[],c.forEach))){l=
"1.6";f=0;d={};try{f=new Iterator(d),f.next&&(l="1.7",c.reduce&&(l="1.8",l.trim&&(l="1.8.1",Date.parse&&(l="1.8.2",Object.create&&(l="1.8.5")))))}catch(r){}}d=screen.width+"x"+screen.height;e=navigator.javaEnabled()?"Y":"N";f=screen.pixelDepth?screen.pixelDepth:screen.colorDepth;g=a.w.innerWidth?a.w.innerWidth:a.d.documentElement.offsetWidth;h=a.w.innerHeight?a.w.innerHeight:a.d.documentElement.offsetHeight;try{a.b.addBehavior("#default#homePage"),m=a.b.cc(b)?"Y":"N"}catch(s){}try{a.b.addBehavior("#default#clientCaps"),
q=a.b.connectionType}catch(t){}a.resolution=d;a.colorDepth=f;a.javascriptVersion=l;a.javaEnabled=e;a.cookiesEnabled=k;a.browserWidth=g;a.browserHeight=h;a.connectionType=q;a.homepage=m;a.Xb=1}};a.S={};a.loadModule=function(c,b){var d=a.S[c];if(!d){d=k["AppMeasurement_Module_"+c]?new k["AppMeasurement_Module_"+c](a):{};a.S[c]=a[c]=d;d.jb=function(){return d.rb};d.vb=function(b){if(d.rb=b)a[c+"_onLoad"]=b,a.fa(c+"_onLoad",[a,d],1)||b(a,d)};try{Object.defineProperty?Object.defineProperty(d,"onLoad",
{get:d.jb,set:d.vb}):d._olc=1}catch(f){d._olc=1}}b&&(a[c+"_onLoad"]=b,a.fa(c+"_onLoad",[a,d],1)||b(a,d))};a.o=function(c){var b,d;for(b in a.S)if(!Object.prototype[b]&&(d=a.S[b])&&(d._olc&&d.onLoad&&(d._olc=0,d.onLoad(a,d)),d[c]&&d[c]()))return 1;return 0};a.Pb=function(){return a.ActivityMap&&a.ActivityMap._c?!0:!1};a.Qb=function(){var c=Math.floor(1E13*Math.random()),b=a.visitorSampling,d=a.visitorSamplingGroup,d="s_vsn_"+(a.visitorNamespace?a.visitorNamespace:a.account)+(d?"_"+d:""),f=a.cookieRead(d);
if(b){b*=100;f&&(f=parseInt(f));if(!f){if(!a.cookieWrite(d,c))return 0;f=c}if(f%1E4>b)return 0}return 1};a.T=function(c,b){var d,f,e,g,h,k;for(d=0;2>d;d++)for(f=0<d?a.Da:a.g,e=0;e<f.length;e++)if(g=f[e],(h=c[g])||c["!"+g]){if(!b&&("contextData"==g||"retrieveLightData"==g)&&a[g])for(k in a[g])h[k]||(h[k]=a[g][k]);a[g]=h}};a.Za=function(c,b){var d,f,e,g;for(d=0;2>d;d++)for(f=0<d?a.Da:a.g,e=0;e<f.length;e++)g=f[e],c[g]=a[g],b||c[g]||(c["!"+g]=1)};a.Hb=function(a){var b,d,f,e,g,h=0,k,m="",n="";if(a&&
255<a.length&&(b=""+a,d=b.indexOf("?"),0<d&&(k=b.substring(d+1),b=b.substring(0,d),e=b.toLowerCase(),f=0,"http://"==e.substring(0,7)?f+=7:"https://"==e.substring(0,8)&&(f+=8),d=e.indexOf("/",f),0<d&&(e=e.substring(f,d),g=b.substring(d),b=b.substring(0,d),0<=e.indexOf("google")?h=",q,ie,start,search_key,word,kw,cd,":0<=e.indexOf("yahoo.co")&&(h=",p,ei,"),h&&k)))){if((a=k.split("&"))&&1<a.length){for(f=0;f<a.length;f++)e=a[f],d=e.indexOf("="),0<d&&0<=h.indexOf(","+e.substring(0,d)+",")?m+=(m?"&":"")+
e:n+=(n?"&":"")+e;m&&n?k=m+"&"+n:n=""}d=253-(k.length-n.length)-b.length;a=b+(0<d?g.substring(0,d):"")+"?"+k}return a};a.cb=function(c){var b=a.d.visibilityState,d=["webkitvisibilitychange","visibilitychange"];b||(b=a.d.webkitVisibilityState);if(b&&"prerender"==b){if(c)for(b=0;b<d.length;b++)a.d.addEventListener(d[b],function(){var b=a.d.visibilityState;b||(b=a.d.webkitVisibilityState);"visible"==b&&c()});return!1}return!0};a.ca=!1;a.J=!1;a.xb=function(){a.J=!0;a.H()};a.K=!1;a.U=!1;a.yb=function(c){a.marketingCloudVisitorID=
c.MCMID;a.visitorOptedOut=c.MCOPTOUT;a.analyticsVisitorID=c.MCAID;a.audienceManagerLocationHint=c.MCAAMLH;a.audienceManagerBlob=c.MCAAMB;a.K=!1;a.U=!0;a.H()};a.bb=function(c){a.maxDelay||(a.maxDelay=250);return a.o("_d")?(c&&setTimeout(function(){c()},a.maxDelay),!1):!0};a.aa=!1;a.I=!1;a.za=function(){a.I=!0;a.H()};a.isReadyToTrack=function(){var c=!0;if(!a.nb()||!a.mb())return!1;a.xa()||(c=!1);a.qb()||(c=!1);return c};a.nb=function(){a.ca||a.J||(a.cb(a.xb)?a.J=!0:a.ca=!0);return a.ca&&!a.J?!1:!0};
a.mb=function(){var c=a.va();if(c)if(a.ta||a.ba)if(a.ta){if(!c.isApproved(c.Categories.ANALYTICS))return!1}else return!1;else return c.fetchPermissions(a.sb,!0),a.ba=!0,!1;return!0};a.X=function(c){var b=a.va();return b&&!b.isApproved(b.Categories[c])?!1:!0};a.va=function(){return k.adobe&&k.adobe.optIn?k.adobe.optIn:null};a.xa=function(){var c=a.V();return c&&c.getVisitorValues&&(a.K||a.U||(a.K=!0,c.getVisitorValues(a.yb)),a.K&&!a.U)?!1:!0};a.V=function(){var c=a.visitor;c&&!c.isAllowed()&&(c=null);
return c};a.qb=function(){a.aa||a.I||(a.bb(a.za)?a.I=!0:a.aa=!0);return a.aa&&!a.I?!1:!0};a.ba=!1;a.sb=function(){a.ba=!1;a.ta=!0};a.l=q;a.r=0;a.callbackWhenReadyToTrack=function(c,b,d){var f;f={};f.Cb=c;f.Bb=b;f.zb=d;a.l==q&&(a.l=[]);a.l.push(f);0==a.r&&(a.r=setInterval(a.H,100))};a.H=function(){var c;if(a.isReadyToTrack()&&(a.wb(),a.l!=q))for(;0<a.l.length;)c=a.l.shift(),c.Bb.apply(c.Cb,c.zb)};a.wb=function(){a.r&&(clearInterval(a.r),a.r=0)};a.lb=function(c){var b,d,f=q,e=q;if(!a.isReadyToTrack()){b=
[];if(c!=q)for(d in f={},c)f[d]=c[d];e={};a.Za(e,!0);b.push(f);b.push(e);a.callbackWhenReadyToTrack(a,a.track,b);return!0}return!1};a.Jb=function(){var c=a.cookieRead("s_fid"),b="",d="",f;f=8;var e=4;if(!c||0>c.indexOf("-")){for(c=0;16>c;c++)f=Math.floor(Math.random()*f),b+="0123456789ABCDEF".substring(f,f+1),f=Math.floor(Math.random()*e),d+="0123456789ABCDEF".substring(f,f+1),f=e=16;c=b+"-"+d}a.cookieWrite("s_fid",c,1)||(c=0);return c};a.t=a.track=function(c,b){var d,f=new Date,e="s"+Math.floor(f.getTime()/
108E5)%10+Math.floor(1E13*Math.random()),g=f.getYear(),g="t="+a.escape(f.getDate()+"/"+f.getMonth()+"/"+(1900>g?g+1900:g)+" "+f.getHours()+":"+f.getMinutes()+":"+f.getSeconds()+" "+f.getDay()+" "+f.getTimezoneOffset()),h=a.V();a.o("_s");a.lb(c)||(b&&a.T(b),c&&(d={},a.Za(d,0),a.T(c)),a.Qb()&&!a.visitorOptedOut&&(a.wa()||(a.fid=a.Jb()),a.Tb(),a.usePlugins&&a.doPlugins&&a.doPlugins(a),a.account&&(a.abort||(a.trackOffline&&!a.timestamp&&(a.timestamp=Math.floor(f.getTime()/1E3)),f=k.location,a.pageURL||
(a.pageURL=f.href?f.href:f),a.referrer||a.$a||(f=a.Util.getQueryParam("adobe_mc_ref",null,null,!0),a.referrer=f||void 0===f?void 0===f?"":f:p.document.referrer),a.$a=1,a.referrer=a.Hb(a.referrer),a.o("_g")),a.Mb()&&!a.abort&&(h&&a.X("TARGET")&&!a.supplementalDataID&&h.getSupplementalDataID&&(a.supplementalDataID=h.getSupplementalDataID("AppMeasurement:"+a._in,a.expectSupplementalData?!1:!0)),a.X("AAM")||(a.contextData["cm.ssf"]=1),a.Nb(),g+=a.Lb(),a.pb(e,g),a.o("_t"),a.referrer=""))),c&&a.T(d,1));
a.abort=a.supplementalDataID=a.timestamp=a.pageURLRest=a.linkObject=a.clickObject=a.linkURL=a.linkName=a.linkType=k.s_objectID=a.pe=a.pev1=a.pev2=a.pev3=a.e=a.lightProfileID=0};a.Ba=[];a.registerPreTrackCallback=function(c){for(var b=[],d=1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Ba.push([c,b]):a.debugTracking&&a.D("DEBUG: Non function type passed to registerPreTrackCallback")};a.gb=function(c){a.ua(a.Ba,c)};a.Aa=[];a.registerPostTrackCallback=function(c){for(var b=[],d=
1;d<arguments.length;d++)b.push(arguments[d]);"function"==typeof c?a.Aa.push([c,b]):a.debugTracking&&a.D("DEBUG: Non function type passed to registerPostTrackCallback")};a.fb=function(c){a.ua(a.Aa,c)};a.ua=function(c,b){if("object"==typeof c)for(var d=0;d<c.length;d++){var f=c[d][0],e=c[d][1].slice();e.unshift(b);if("function"==typeof f)try{f.apply(null,e)}catch(g){a.debugTracking&&a.D(g.message)}}};a.tl=a.trackLink=function(c,b,d,f,e){a.linkObject=c;a.linkType=b;a.linkName=d;e&&(a.k=c,a.v=e);return a.track(f)};
a.trackLight=function(c,b,d,f){a.lightProfileID=c;a.lightStoreForSeconds=b;a.lightIncrementBy=d;return a.track(f)};a.clearVars=function(){var c,b;for(c=0;c<a.g.length;c++)if(b=a.g[c],"prop"==b.substring(0,4)||"eVar"==b.substring(0,4)||"hier"==b.substring(0,4)||"list"==b.substring(0,4)||"channel"==b||"events"==b||"eventList"==b||"products"==b||"productList"==b||"purchaseID"==b||"transactionID"==b||"state"==b||"zip"==b||"campaign"==b)a[b]=void 0};a.tagContainerMarker="";a.pb=function(c,b){var d=a.hb()+
"/"+c+"?AQB=1&ndh=1&pf=1&"+(a.ya()?"callback=s_c_il["+a._in+"].doPostbacks&et=1&":"")+b+"&AQE=1";a.gb(d);a.eb(d);a.W()};a.hb=function(){var c=a.ib();return"http"+(a.ssl?"s":"")+"://"+c+"/b/ss/"+a.account+"/"+(a.mobile?"5.":"")+(a.ya()?"10":"1")+"/JS-"+a.version+(a.Wb?"T":"")+(a.tagContainerMarker?"-"+a.tagContainerMarker:"")};a.ya=function(){return a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks};a.ib=function(){var c=a.dc,b=a.trackingServer;b?a.trackingServerSecure&&a.ssl&&
(b=a.trackingServerSecure):(c=c?(""+c).toLowerCase():"d1","d1"==c?c="112":"d2"==c&&(c="122"),b=a.kb()+"."+c+".2o7.net");return b};a.kb=function(){var c=a.visitorNamespace;c||(c=a.account.split(",")[0],c=c.replace(/[^0-9a-z]/gi,""));return c};a.Ya=/{(%?)(.*?)(%?)}/;a.$b=RegExp(a.Ya.source,"g");a.Gb=function(c){if("object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];if("string"==typeof d.c&&"aa."==d.id.substr(0,3))for(var f=d.c.match(a.$b),e=0;e<f.length;++e){var g=f[e],h=g.match(a.Ya),
k="";"%"==h[1]&&"timezone_offset"==h[2]?k=(new Date).getTimezoneOffset():"%"==h[1]&&"timestampz"==h[2]&&(k=a.Kb());d.c=d.c.replace(g,a.escape(k))}}};a.Kb=function(){var c=new Date,b=new Date(6E4*Math.abs(c.getTimezoneOffset()));return a.j(4,c.getFullYear())+"-"+a.j(2,c.getMonth()+1)+"-"+a.j(2,c.getDate())+"T"+a.j(2,c.getHours())+":"+a.j(2,c.getMinutes())+":"+a.j(2,c.getSeconds())+(0<c.getTimezoneOffset()?"-":"+")+a.j(2,b.getUTCHours())+":"+a.j(2,b.getUTCMinutes())};a.j=function(a,b){return(Array(a+
1).join(0)+b).slice(-a)};a.pa={};a.doPostbacks=function(c){if("object"==typeof c)if(a.Gb(c),"object"==typeof a.AudienceManagement&&"function"==typeof a.AudienceManagement.isReady&&a.AudienceManagement.isReady()&&"function"==typeof a.AudienceManagement.passData)a.AudienceManagement.passData(c);else if("object"==typeof c&&"object"==typeof c.dests)for(var b=0;b<c.dests.length;++b){var d=c.dests[b];"object"==typeof d&&"string"==typeof d.c&&"string"==typeof d.id&&"aa."==d.id.substr(0,3)&&(a.pa[d.id]=new Image,
a.pa[d.id].alt="",a.pa[d.id].src=d.c)}};a.eb=function(c){a.i||a.Ob();a.i.push(c);a.ia=a.B();a.Wa()};a.Ob=function(){a.i=a.Rb();a.i||(a.i=[])};a.Rb=function(){var c,b;if(a.oa()){try{(b=k.localStorage.getItem(a.ma()))&&(c=k.JSON.parse(b))}catch(d){}return c}};a.oa=function(){var c=!0;a.trackOffline&&a.offlineFilename&&k.localStorage&&k.JSON||(c=!1);return c};a.Ma=function(){var c=0;a.i&&(c=a.i.length);a.p&&c++;return c};a.W=function(){if(a.p&&(a.A&&a.A.complete&&a.A.F&&a.A.ra(),a.p))return;a.Na=q;if(a.na)a.ia>
a.P&&a.Ua(a.i),a.qa(500);else{var c=a.Ab();if(0<c)a.qa(c);else if(c=a.Ja())a.p=1,a.Sb(c),a.Vb(c)}};a.qa=function(c){a.Na||(c||(c=0),a.Na=setTimeout(a.W,c))};a.Ab=function(){var c;if(!a.trackOffline||0>=a.offlineThrottleDelay)return 0;c=a.B()-a.Sa;return a.offlineThrottleDelay<c?0:a.offlineThrottleDelay-c};a.Ja=function(){if(0<a.i.length)return a.i.shift()};a.Sb=function(c){if(a.debugTracking){var b="AppMeasurement Debug: "+c;c=c.split("&");var d;for(d=0;d<c.length;d++)b+="\n\t"+a.unescape(c[d]);a.D(b)}};
a.wa=function(){return a.marketingCloudVisitorID||a.analyticsVisitorID};a.Z=!1;var t;try{t=JSON.parse('{"x":"y"}')}catch(w){t=null}t&&"y"==t.x?(a.Z=!0,a.Y=function(a){return JSON.parse(a)}):k.$&&k.$.parseJSON?(a.Y=function(a){return k.$.parseJSON(a)},a.Z=!0):a.Y=function(){return null};a.Vb=function(c){var b,d,f;a.wa()&&2047<c.length&&(a.ab()&&(d=1,b=new XMLHttpRequest),b&&(a.AudienceManagement&&a.AudienceManagement.isReady()||0!=a.usePostbacks)&&(a.Z?b.Ea=!0:b=0));!b&&a.Xa&&(c=c.substring(0,2047));
!b&&a.d.createElement&&(0!=a.usePostbacks||a.AudienceManagement&&a.AudienceManagement.isReady())&&(b=a.d.createElement("SCRIPT"))&&"async"in b&&((f=(f=a.d.getElementsByTagName("HEAD"))&&f[0]?f[0]:a.d.body)?(b.type="text/javascript",b.setAttribute("async","async"),d=2):b=0);b||(b=new Image,b.alt="",b.abort||"undefined"===typeof k.InstallTrigger||(b.abort=function(){b.src=q}));b.Ta=Date.now();b.Ga=function(){try{b.F&&(clearTimeout(b.F),b.F=0)}catch(a){}};b.onload=b.ra=function(){b.Ta&&(a.ja=Date.now()-
b.Ta);a.fb(c);b.Ga();a.Eb();a.da();a.p=0;a.W();if(b.Ea){b.Ea=!1;try{a.doPostbacks(a.Y(b.responseText))}catch(d){}}};b.onabort=b.onerror=b.Ka=function(){b.Ga();(a.trackOffline||a.na)&&a.p&&a.i.unshift(a.Db);a.p=0;a.ia>a.P&&a.Ua(a.i);a.da();a.qa(500)};b.onreadystatechange=function(){4==b.readyState&&(200==b.status?b.ra():b.Ka())};a.Sa=a.B();if(1==d)f=c.indexOf("?"),d=c.substring(0,f),f=c.substring(f+1),f=f.replace(/&callback=[a-zA-Z0-9_.\[\]]+/,""),b.open("POST",d,!0),b.withCredentials=!0,b.send(f);
else if(b.src=c,2==d){if(a.Qa)try{f.removeChild(a.Qa)}catch(e){}f.firstChild?f.insertBefore(b,f.firstChild):f.appendChild(b);a.Qa=a.A}b.F=setTimeout(function(){b.F&&(b.complete?b.ra():(a.trackOffline&&b.abort&&b.abort(),b.Ka()))},5E3);a.Db=c;a.A=k["s_i_"+a.replace(a.account,",","_")]=b;if(a.useForcedLinkTracking&&a.L||a.v)a.forcedLinkTrackingTimeout||(a.forcedLinkTrackingTimeout=250),a.ea=setTimeout(a.da,a.forcedLinkTrackingTimeout)};a.ab=function(){return"undefined"!==typeof XMLHttpRequest&&"withCredentials"in
new XMLHttpRequest?!0:!1};a.Eb=function(){if(a.oa()&&!(a.Ra>a.P))try{k.localStorage.removeItem(a.ma()),a.Ra=a.B()}catch(c){}};a.Ua=function(c){if(a.oa()){a.Wa();try{k.localStorage.setItem(a.ma(),k.JSON.stringify(c)),a.P=a.B()}catch(b){}}};a.Wa=function(){if(a.trackOffline){if(!a.offlineLimit||0>=a.offlineLimit)a.offlineLimit=10;for(;a.i.length>a.offlineLimit;)a.Ja()}};a.forceOffline=function(){a.na=!0};a.forceOnline=function(){a.na=!1};a.ma=function(){return a.offlineFilename+"-"+a.visitorNamespace+
a.account};a.B=function(){return(new Date).getTime()};a.Oa=function(a){a=a.toLowerCase();return 0!=a.indexOf("#")&&0!=a.indexOf("about:")&&0!=a.indexOf("opera:")&&0!=a.indexOf("javascript:")?!0:!1};a.setTagContainer=function(c){var b,d,f;a.Wb=c;for(b=0;b<a._il.length;b++)if((d=a._il[b])&&"s_l"==d._c&&d.tagContainerName==c){a.T(d);if(d.lmq)for(b=0;b<d.lmq.length;b++)f=d.lmq[b],a.loadModule(f.n);if(d.ml)for(f in d.ml)if(a[f])for(b in c=a[f],f=d.ml[f],f)!Object.prototype[b]&&("function"!=typeof f[b]||
0>(""+f[b]).indexOf("s_c_il"))&&(c[b]=f[b]);if(d.mmq)for(b=0;b<d.mmq.length;b++)f=d.mmq[b],a[f.m]&&(c=a[f.m],c[f.f]&&"function"==typeof c[f.f]&&(f.a?c[f.f].apply(c,f.a):c[f.f].apply(c)));if(d.tq)for(b=0;b<d.tq.length;b++)a.track(d.tq[b]);d.s=a;break}};a.Util={urlEncode:a.escape,urlDecode:a.unescape,cookieRead:a.cookieRead,cookieWrite:a.cookieWrite,getQueryParam:function(c,b,d,f){var e,g="";b||(b=a.pageURL?a.pageURL:k.location);d=d?d:"&";if(!c||!b)return g;b=""+b;e=b.indexOf("?");if(0>e)return g;b=
d+b.substring(e+1)+d;if(!f||!(0<=b.indexOf(d+c+d)||0<=b.indexOf(d+c+"="+d))){e=b.indexOf("#");0<=e&&(b=b.substr(0,e)+d);e=b.indexOf(d+c+"=");if(0>e)return g;b=b.substring(e+d.length+c.length+1);e=b.indexOf(d);0<=e&&(b=b.substring(0,e));0<b.length&&(g=a.unescape(b));return g}},getIeVersion:function(){if(document.documentMode)return document.documentMode;for(var a=7;4<a;a--){var b=document.createElement("div");b.innerHTML="\x3c!--[if IE "+a+"]><span></span><![endif]--\x3e";if(b.getElementsByTagName("span").length)return a}return null}};
a.G="supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL customerPerspective referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData".split(" ");
a.g=a.G.concat("purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt".split(" "));a.ka="timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy".split(" ");a.Q=a.ka.slice(0);a.Da="account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout useLinkTrackSessionStorage trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement".split(" ");
for(m=0;250>=m;m++)76>m&&(a.g.push("prop"+m),a.Q.push("prop"+m)),a.g.push("eVar"+m),a.Q.push("eVar"+m),6>m&&a.g.push("hier"+m),4>m&&a.g.push("list"+m);m="pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest marketingCloudOrgID ms_a".split(" ");a.g=a.g.concat(m);a.G=a.G.concat(m);a.ssl=0<=k.location.protocol.toLowerCase().indexOf("https");a.charSet="UTF-8";a.contextData={};a.offlineThrottleDelay=
0;a.offlineFilename="AppMeasurement.offline";a.R="s_sq";a.Sa=0;a.ia=0;a.P=0;a.Ra=0;a.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx";a.w=k;a.d=k.document;try{if(a.Xa=!1,navigator){var v=navigator.userAgent;if("Microsoft Internet Explorer"==navigator.appName||0<=v.indexOf("MSIE ")||0<=v.indexOf("Trident/")&&0<=v.indexOf("Windows NT 6"))a.Xa=!0}}catch(x){}a.da=function(){a.ea&&(k.clearTimeout(a.ea),a.ea=q);a.k&&a.L&&a.k.dispatchEvent(a.L);a.v&&("function"==typeof a.v?
a.v():a.k&&a.k.href&&(a.d.location=a.k.href));a.k=a.L=a.v=0};a.Va=function(){a.b=a.d.body;a.b?(a.u=function(c){var b,d,f,e,g;if(!(a.d&&a.d.getElementById("cppXYctnr")||c&&c["s_fe_"+a._in])){if(a.Fa)if(a.useForcedLinkTracking)a.b.removeEventListener("click",a.u,!1);else{a.b.removeEventListener("click",a.u,!0);a.Fa=a.useForcedLinkTracking=0;return}else a.useForcedLinkTracking=0;a.clickObject=c.srcElement?c.srcElement:c.target;try{if(!a.clickObject||a.O&&a.O==a.clickObject||!(a.clickObject.tagName||
a.clickObject.parentElement||a.clickObject.parentNode))a.clickObject=0;else{var h=a.O=a.clickObject;a.ha&&(clearTimeout(a.ha),a.ha=0);a.ha=setTimeout(function(){a.O==h&&(a.O=0)},1E4);f=a.Ma();a.track();if(f<a.Ma()&&a.useForcedLinkTracking&&c.target){for(e=c.target;e&&e!=a.b&&"A"!=e.tagName.toUpperCase()&&"AREA"!=e.tagName.toUpperCase();)e=e.parentNode;if(e&&(g=e.href,a.Oa(g)||(g=0),d=e.target,c.target.dispatchEvent&&g&&(!d||"_self"==d||"_top"==d||"_parent"==d||k.name&&d==k.name))){try{b=a.d.createEvent("MouseEvents")}catch(l){b=
new k.MouseEvent}if(b){try{b.initMouseEvent("click",c.bubbles,c.cancelable,c.view,c.detail,c.screenX,c.screenY,c.clientX,c.clientY,c.ctrlKey,c.altKey,c.shiftKey,c.metaKey,c.button,c.relatedTarget)}catch(m){b=0}b&&(b["s_fe_"+a._in]=b.s_fe=1,c.stopPropagation(),c.stopImmediatePropagation&&c.stopImmediatePropagation(),c.preventDefault(),a.k=c.target,a.L=b)}}}}}catch(n){a.clickObject=0}}},a.b&&a.b.attachEvent?a.b.attachEvent("onclick",a.u):a.b&&a.b.addEventListener&&(navigator&&(0<=navigator.userAgent.indexOf("WebKit")&&
a.d.createEvent||0<=navigator.userAgent.indexOf("Firefox/2")&&k.MouseEvent)&&(a.Fa=1,a.useForcedLinkTracking=1,a.b.addEventListener("click",a.u,!0)),a.b.addEventListener("click",a.u,!1))):setTimeout(a.Va,30)};a.Fb();a.fc||(r?a.setAccount(r):a.D("Error, missing Report Suite ID in AppMeasurement initialization"),a.Va(),a.loadModule("ActivityMap"))}
function s_gi(r){var a,k=window.s_c_il,q,p,m=r.split(","),s,u,t=0;if(k)for(q=0;!t&&q<k.length;){a=k[q];if("s_c"==a._c&&(a.account||a.oun))if(a.account&&a.account==r)t=1;else for(p=a.account?a.account:a.oun,p=a.allAccounts?a.allAccounts:p.split(","),s=0;s<m.length;s++)for(u=0;u<p.length;u++)m[s]==p[u]&&(t=1);q++}t?a.setAccount&&a.setAccount(r):a=new AppMeasurement(r);return a}AppMeasurement.getInstance=s_gi;window.s_objectID||(window.s_objectID=0);
function s_pgicq(){var r=window,a=r.s_giq,k,q,p;if(a)for(k=0;k<a.length;k++)q=a[k],p=s_gi(q.oun),p.setAccount(q.un),p.setTagContainer(q.tagContainerName);r.s_giq=0}s_pgicq();
_eT.s=s
if((_eT.cc&3)!=3){
_eT.S_t=s.t;s.t=function(){}
_eT.S_tl=s.tl;s.tl=function(t){if(t=t&&t.href)location=t;return!0}}
_eT.evtA=[
"N	Web/Assistance/Support/Mobile/Reseau/Confirmation	QuestReseau",
"N	(Mobile/Portail Mobile|Web)/Mon Compte/Simulateur Resiliation.*	CalculResil",
"P	.*_RED.*|LS.*|CS.*	AchatRED",
"O	S(85[DEF]|77I).*	Maghreb",
"X	.*SC:Option.*	Option",
"X	.*Bol:(Conquete|VLA)	Conquete",
"X	(Mobile:)?SC:Rechargement	Rechargement",
"X	Ouvrir.Bol:Device	AchatAccessoire#",
"prop60	.*RED.*	RedForum",
"prop60	.*(pnm|pnf|portabilite.*numero|change.*operateur|RIO|(quitter|arret|resil|partir).*sfr).*	ChurnForum",
"S	femto	InteretFemto",
"S	reseau	AssistReseau",
"N	.*Home by SFR.*	InteretHome",
"S	home SFR|alarme|domotique|videosurveillance|sfr home|cambriolage|intrusion|(video|camera) surveill.*|intervention site|(surveill|securis|prote).* (habitation|maison|domicile|propriete|appartement)	InteretHome",
"V	Ouvrir.Bol:Device	DebParcoursAccessoire#",
"X	.*Bol:(Conquete|VLA)|.*BOL_Conquete",
"eVar38	.*RED.*	CqtRed",
"eVar18	MJ.*|MK.*",
"X	Changer.(Bol:Mig IG|SC:Migration)",
"eVar38	.*CARRE.*	MRC",
"eVar18	MA.*|MF.*",
"X	Changer.Bol:Mig IG|Changer.SC:Migration",
"eVar38	.*CARRE.*	MigCarre",
"eVar18	MJ.*|MK.*",
"X	Changer.(Bol:Mig IG|SC:Migration)",
"eVar38	.*RED.*	MigRed",
"eVar18	MA.*|MF.*",
"X	Changer.(Bol:Mig IG|SC:Migration)",
"eVar38	.*RED.*	MCR",
"S	(stock|enregistre|sauvegarde|partage).* (donn.*|document|photo|vid|image|film)|cloud	IntCloud",
"eVar18	99",
"eVar38	.*RED.*",
"X	Changer.(Bol:Mig IG|SC:Migration)	MigNARed",
"eVar18	99",
"eVar38	.*CARRE.*",
"X	Changer.(Bol:Mig IG|SC:Migration)	MigNACarre",
"X	Changer.(Bol:Mig IG|SC:Migration)",
"eVar38	.*RED.*	MigversRed",
"X	Changer.(Bol:Mig IG|SC:Migration)",
"eVar38	.*CARRE.*	MigversCarre",
"N	(Web/ADSL|Mobile/Portail Mobile)/Boutique/Conquete/Catalogue Offre/Post-eligibilite/(ADSL|THD|ADSL/V2|THD/V2)	NonEligiblewholesale",
"N	.*Layer Ineligibilite.*	NonEligiblewholesale",
"N	(Web|Mobile/Portail Mobile)/Mon Compte/(InfosLigne|InfosLigne.*)	Infoligne",
"X	.*Bol:Change Intra ADSL	MigADSL",
"eVar38	Fixe_Box-RED",
"X	Ouvrir.Bol:Signup CABLE	conqueteFTTBRed",
"N	.*Assistance/Mobile-et-tablette.*	AssistanceMobile",
"N	.*Mon Compte/Conso Facture.*	ConsoFactMobilePaiement",
"N	.*Authentification/(Mon Compte|Autres Services|Layer)	Authentification",
"N	.*Mon Compte/Home	HomeMonCompte",
"N	.*securite.*	Securite",
"N	Web/Red/Boutique/Mobile/Conquete/Recapitulatif	DebParcoursRED",
"N	Web/Assistance/(Accueil|Home).*	AssistanceAccueil",
"N	.*/Mon Compte/Mes Avantages.*	MonCompteAvantages",
"N	Web/Forum SFR/Espace Communautaire.*	ForumSFR",
"U	https://espace-client.sfr.fr/novelli/rioFixe/consultation.*	FragileFixeWeb",
"eVar10	2|3",
"N	Web/(Transverse|Assistance|Forum SFR/Espace Communautaire)/Recherche.*	Recherche",
"O	SPM(1|2)|SECUR	achatSecurite",
"P	SPM(1|2)|SECUR	achatSecurite",
"O	SZ05|PZ05|BT019|CLO100	achatCloud",
"P	SZ05|PZ05|BT019|CLO100	achatCloud",
"eVar38	.*RED.*",
"X	Ouvrir.Bol:Signup ADSL	conqueteADSLRed",
"eVar38	.*RED",
"X	.*Bol:Conquete Migration Inter Segment LCA_ABO|.*Bol:Migration Inter Segment LCA_ABO	LCAABORed",
"eVar38	.*CARRE",
"X	.*Bol:Conquete Migration Inter Segment LCA_ABO|.*Bol:Migration Inter Segment LCA_ABO	LCAABOSfr",
"X	.*Bol:Change Intra FIBRE	MigFTTHintra",
"U	https://espace-client.sfr.fr/novelli/fraisResiliation/accueilNovelli	DemNovMob",
"U	https://espace-client.sfr.fr/novelli/resiliationFixe/accueil	DemNovFix",
"P	SSG_LCA_SSMOB_BIOS_PZ0_LCA_0_ECO	AchatKitLCA",
"N	.*resili(ation|e).*	ResilPnmPnf",
"S	pnm|pnf|portabilite numero|change.* operateur|(quitter|arreter|resilier|partir.*) sfr|resil.*	ResilPnmPnf",
"N	Web/Assistance/Contacter/.*	AssistanceContacter",
"N	.*/Mon Compte/Prise RDV/.*	AssistanceContacter",
"event8	SC:Desimlocage|PWP:Desimlockage	Desimlocage",
"N	.*Desimloc.*	intDesimlocage#prop18",
"S	desimloc	intDesimlocage",
"N	Web/Mon Compte/Desimlocage/Etape 3/Desimlocage (Classique| Iphone)	Desimlocage",
"eVar38	.*RED.*",
"X	.*Bol:Change Intra (CABLE|FIBRE|ADSL)	ChangeIGRedFixe",
"S	rio|releve (d.)?identite	IntPnmWeb",
"N	(Web|Mobile/Portail Mobile)/Assistance/Mobile-et-tablette/Offres-mobile/Comment-changer-(operateur-tout-savoir-sur-rio|ou-conserver-numero-sfr)	IntPnmWeb",
"N	Web/Assistance/Multimedia/Infographie-changer-operateur-mobile	IntPnmWeb",
"N	(Web|Mobile/Portail Mobile)/Assistance/Internet-et-box/Offres-box/Comment-changer-operateur-rio-fixe	InteretFragileFixe",
"N	(Web|Mobile/Portail Mobile)(/Assistance)?/Multimedia/Infographie-changer-operateur-fixe	InteretFragileFixe",
"S	rio.*fixe	InteretFragileFixe",
"N	Web/Assistance/Internet-et-box/Offres-box/Calculer-frais-resiliation-anticipee-fixe-tv	IntNovFix",
"eVar18	I.*",
"N	Web/Mon Compte/Frais De Resiliation/Client Non Engage	IntNovFix",
"N	Web/Red/Aide/FAQ/Offre Options/Offre/Gerer/Resilier.*	RedFAQResilMob",
"N	Web/Red/Boutique/Mobile/RED/POST/Mobile/Conquete/Recapitulatif	DebParcoursRED",
"eVar38	.*RED.*",
"X	Ouvrir.Bol:Signup FIBRE	conqueteFTTHRed",
"eVar38	.*RED.*",
"X	Ouvrir.Bol:VLA ADSL	vlaADSLRed",
"eVar38	.*RED.*",
"X	Ouvrir.Bol:VLA CABLE	vlaFTTBRed",
"eVar38	.*RED.*",
"X	Ouvrir.Bol:VLA FIBRE	vlaFTTHRed",
"N	Web/Red/Aide/FAQ/Choisir RED/Veux Souscrire/Garder/Choisir RED Et Conserver Son Numero Mobile",
"prop18	M[JK]	IntPNMRed",
"N	Web/Red/Aide/FAQ/Offre Options/Offre/Gerer/Resilier Ma RED Box	RedFAQResilFixe",
"N	Web/Transverse/Webcallback Form",
"eVar68	.*RED SC RESIL.*	RedFAQResilFixe",
"N	Web/Red/Aide/FAQ/Offre Options/Offre/Gerer/Renvoyer Mes Equipements RED Box	RedFAQRenvoiEquip",
"N	Web/Red/Aide/FAQ/Choisir RED/Veux Souscrire/Garder/Choisir RED Et Conserver Son Numero Fixe",
"prop18	I[HN]	IntPNFRed",
"X	Ouvrir.Bol:Device	AchatMobileNu",
"N	.*Web/Transverse/Facture Mobile/Consultation.*	InfoFactureMob",
"N	.*Web/Mon Compte/Paiement Mobile/Facture Mobile.*	InfoFactureMob",
"N	.*Web/Mon Compte/Facture Fixe/.*	InfoFactureFix",
"N	.*Web/Transverse/Facture Fixe/.*	InfoFactureFix",
"N	.*Web/Mon Compte/Pass/Facture Fixe.*	InfoFactureFix",
"N	(Web|Mobile/Portail Mobile)/Mon Compte/Pass/Mobile/En Cours Conso Mobile.*	InfoConsoMob",
"N	Web/Red/Aide/FAQ/Rejoindre-RED/Je-veux-commander-une-offre-RED/La-portabilite-du-numero/Portabilite-du-numero-mobile",
"prop18	M[JK]	IntPNMRed",
"N	Web/Red/Aide/FAQ/Rejoindre-RED/Je-veux-commander-une-offre-RED/La-portabilite-du-numero/Portabilite.*",
"prop18	I[HN]	IntPNFRed",
"X	.*Bol:Change Option.*	OptionFixe",
"N	.*Web/Assistance/Support/Mobile/Reseau/Formulaire.*	AssistReseau",
"N	Web/Assistance/Gestion-client/Offre-contrat/Portabilite-numero-mobile	IntPnmWeb",
"N	Web/Assistance/Gestion-client/Offre-contrat/Portabilite-numero-telephonie-fixe	InteretFragileFixe",
"N	Web/Mon Compte/Parcours/Espace Client/Resiliation Fixe Engage/Erreur	IntNovFix",
"eVar46	.*(VLA|Conquete|Mig IG|Mig|Carte PP|Migration Inter Segment LCA_ABO|International).*	WEB_MOB",
"eVar46	.*(VLA|Conquete|Mig IG|Mig|Carte PP|Migration Inter Segment LCA_ABO|International).*",
"N	.*(Fiche Offre|Fiche Mobile|N1 Mobile|Liste Mobile|Fiche Offre|Bons Plans|LP 5G|Reprise Mobile).*	WEB_MOB_VIZ",
"eVar46	.*(VLA|Conquete|Mig IG|Mig|Carte PP|Migration Inter Segment LCA_ABO|International).*",
"N	.*Web/Mobile/Boutique/Conquete/Panier.*	WEB_MOB_CART#eVar64",
"eVar46	.*(VLA|Conquete|Mig IG|Mig|Carte PP|Migration Inter Segment LCA_ABO|International).*",
"U	.*/terminer-ma-commande.*	WEB_MOB_RECAP#eVar64",
"eVar46	.*(VLA|Conquete|Mig IG|Mig|Carte PP|Migration Inter Segment LCA_ABO|International).*",
"N	.*Recapitulatif.*	WEB_MOB_RECAP#eVar64",
"eVar46	.*(VLA|Conquete|Mig IG|Mig|Carte PP|Migration Inter Segment LCA_ABO|International).*",
"N	.*Layer Plus Tard.*	WEB_MOB_EPROPAL#eVar64",
"eVar46	.*(VLA|Conquete|Mig IG|Mig|Carte PP|Migration Inter Segment LCA_ABO|International).*",
"N	.*confirmation.*	WEB_MOB_ACHAT#eVar64",
"eVar46	.*(ADSL|CABLE|FIBRE|Signup Box 4G).*	WEB_FIXE",
"eVar46	.*(ADSL|CABLE|FIBRE|Signup Box 4G).*",
"N	.*(Fiche Offre|N2 OptionTelCo Option|Fiche Mobile|N1 Média Bouquet tv|Post-eligibilite|N1 Fixe).*	WEB_FIXE_VIZ",
"eVar46	.*(ADSL|CABLE|FIBRE|Signup Box 4G).*",
"N	.*Web/Mobile/Boutique/Conquete/Panier.*	WEB_FIXE_CART",
"eVar46	.*(ADSL|CABLE|FIBRE|Signup Box 4G).*",
"U	.*/terminer-ma-commande.*	WEB_FIXE_RECAP",
"eVar46	.*(ADSL|CABLE|FIBRE|Signup Box 4G).*",
"N	.*Recapitulatif.*	WEB_FIXE_RECAP",
"eVar46	.*(ADSL|CABLE|FIBRE|Signup Box 4G).*",
"N	.*Layer Plus Tard.*	WEB_FIXE_EPROPAL",
"eVar46	.*(ADSL|CABLE|FIBRE|Signup Box 4G).*",
"N	.*confirmation.*	WEB_FIXE_ACHAT",
"eVar46	.*(RM|Device|RMUP).*	WEB_DEVICE",
"eVar46	.*(RM|Device|RMUP).*",
"N	.*(Fiche Offre|Fiche Mobile|N1 Mobile|Liste Mobile|Bons Plans|LP 5G|Reprise Mobile).*	WEB_DEVICE_VIZ",
"eVar46	.*(RM|Device|RMUP).*",
"N	.*Web/Mobile/Boutique/(Conquete|Change)/Panier.*	WEB_DEVICE_CART#eVar64",
"eVar46	.*(RM|Device|RMUP).*",
"U	.*/terminer-ma-commande.*	WEB_DEVICE_RECAP#eVar64",
"eVar46	.*(RM|Device|RMUP).*",
"N	.*Recapitulatif.*	WEB_DEVICE_RECAP#eVar64",
"eVar46	.*(RM|Device|RMUP).*",
"N	.*Layer Plus Tard.*	WEB_DEVICE_EPROPAL#eVar64",
"eVar46	.*(RM|Device|RMUP).*",
"N	.*confirmation.*	WEB_DEVICE_ACHAT#eVar64",
"eVar46	.*(Changer|Bol:Change Option).*	WEB_OPT",
"eVar46	.*(Changer|Bol:Change Option).*",
"N	.*(Fiche Offre|N2 OptionTelCo Option|Fiche Mobile|N1 Média Bouquet tv|Post-eligibilite|N1 Fixe).*	WEB_OPT_VIZ",
"eVar46	.*(Changer|Bol:Change Option).*",
"N	.*Web/Mobile/Boutique/Conquete/Panier.*	WEB_OPT_CART",
"eVar46	.*(Changer|Bol:Change Option).*",
"U	.*/terminer-ma-commande.*	WEB_OPT_RECAP",
"eVar46	.*(Changer|Bol:Change Option).*",
"N	.*Recapitulatif.*	WEB_OPT_RECAP",
"eVar46	.*(Changer|Bol:Change Option).*",
"N	.*Layer Plus Tard.*	WEB_OPT_EPROPAL",
"eVar46	.*(Changer|Bol:Change Option).*",
"N	.*confirmation.*	WEB_OPT_ACHAT",
"U	.*https://www.sfr.fr/espace-client/options/.*	WEB_OPT",
"U	.*https://www.sfr.fr/espace-client/options/.*",
"N	.*(Fiche Offre|N2 OptionTelCo Option|Fiche Mobile|N1 Média Bouquet tv|Post-eligibilite|N1 Fixe).*	WEB_OPT_VIZ",
"U	.*https://www.sfr.fr/espace-client/options/.*",
"N	.*Web/Mobile/Boutique/Conquete/Panier.*	WEB_OPT_CART",
"U	.*https://www.sfr.fr/espace-client/options/.*",
"U	.*/terminer-ma-commande.*	WEB_OPT_RECAP",
"U	.*https://www.sfr.fr/espace-client/options/.*",
"N	.*Recapitulatif.*	WEB_OPT_RECAP",
"U	.*https://www.sfr.fr/espace-client/options/.*",
"N	.*Layer Plus Tard.*	WEB_OPT_EPROPAL",
"U	.*https://www.sfr.fr/espace-client/options/.*",
"N	.*confirmation.*	WEB_OPT_ACHAT",
"U	https://www.red-by-sfr.fr/telephones	WEB_RED_DEVICE",
"U	https://www.red-by-sfr.fr/telephones.+	WEB_RED_DEVICE_VIZ",
"N	Web/Red/Boutique/Fixe/Offre Internet/Home	WEB_RED_FIXE",
"N	Web/Red/Boutique/Fixe/Tester Ma Ligne/Home	WEB_RED_FIXE_VIZ",
"N	Web/Red/Boutique/Fixe/Configurateur	WEB_RED_FIXE_CART",
"N	Web/Red/Boutique/Fixe/Epropal/RED/POST/Fixe/Conquete/Recapitulatif	WEB_RED_FIXE_RECAP",
"N	.*Web/Red/Boutique/Fixe/Epropal/RED/POST/Fixe/Conquete/Contrat/Layer.*	WEB_RED_FIXE_EPROPAL",
"N	.*Web/Red/Boutique/Fixe/.*",
"N	.*Confirmation.*	WEB_RED_FIXE_ACHAT",
"U	https://www.red-by-sfr.fr/forfaits-mobiles/	WEB_RED_MOB",
"U	https://www.red-by-sfr.fr/forfaits-mobiles/.+	WEB_RED_MOB_VIZ",
"U	https://www.red-by-sfr.fr/(options-red|espace-client/options)	WEB_RED_OPT",
"U	https://www.red-by-sfr.fr/(options-red|espace-client/options).+	WEB_RED_OPT_VIZ",
"N	.*Resiliation_adress_view|Web/Transverse/Mon Espace Client/Resiliation/Resiliation Courrier Red Box.*	RESIL_ADRESSE",
"N	Web/Assistance/Gestion-client/Offre-contrat/Changer-titulaire-ligne-sfr-fixe-mobile	WEB_TITU",
"N	Web/Mon Compte/Changement De Titulaire/Questionnaire	WEB_TITU_VIZ",
"N	(Mobile/Portail Mobile|Web)/Mon Compte/Changement De Titulaire/Synthese Formulaire	WEB_TITU_ACHAT",
"eVar18	ML	AUTH_PP#eVar18",
"N	Web/Mon Compte/Resiliation/Start	ResilWebStart",
"N	Web/Mon Compte/Resiliation/End	ResilWebEnd",
"N	Web/Mon Compte/Resiliation/Recap	ResilWebRecap",
"U	.*CAMPAIGN_ID=(6441534537356510d9000000|58e7a67d80df1a13688b4567).*",
"N	Web/Transverse/Layer ClicToCall/Mise En Relation	ResilWebC2C",
"N	.*Demenag.*	RedFAQDmgt",
"N	Web/Assistance/(Box Internet/Demenagement.*|Internet-et-box/Offres-box/(Sfr-fibre-demenagement|Demenagement-sfr|Telephonie-fixe-demenagement)|Multimedia/Video-preparer-demenagement)	DemenagementWeb",
"N	Web/Assistance/Gestion-client/Offre-contrat/Sfr-box-demenagement	DemenagementWeb",
"N	Web/Assistance/Gestion-client/Offre-contrat/Infographie-cles-demenagement-sfr-reussi	DemenagementWeb",
"U	https://www.sfr.fr/espace-client/parc/gestion/refPTO	infoPTO",
""]
