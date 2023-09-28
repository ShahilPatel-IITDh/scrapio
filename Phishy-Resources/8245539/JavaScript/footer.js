(_eTf=function(W,D,_,$){
W=window,D=document,_=W._eT
if(!_||_.sent)return
$=_.$=W.$sfr&&$sfr.fn&&$sfr||W.$&&W.$.fn&&W.$||W.jQuery
_.pf=_.pf|0
if(_.pf<5&&!_.pS)return _.to(_eTf,++_.pf*80)
eval("var "+"cms,dom,ckR,ckW,ckD,ckT,par,JS,M,T,ST,SM,ist,med,rbs,cas,im,log,to,ti,wait,hS,IC,eP".replace(/(\w+)/g,'$1=_.$1'))
var b,f,o,r,t,v,Z=W.zvars||[],ccA,cP=!_.app&&(_.cc&3)==3&&!cas,bK='',mP,
dja='export/bloc/django/',dj=ist+dja,
_B=_('body'),
RE='replace',GI='getElementById',IH='innerHTML',LC='toLowerCase',TN='getElementsByTagName',CE='createElement',PM='postMessage',
ECS=T('@/(mon-)?espace-client|espace-client@'),ECR=0,i='/terminer-ma-commande/',CS='@'+i,CR='#'+i,CO='[#@]'+i,
WMN=T('webmail(@|.vmail@:445)|^liamwebmail@|^atelier.pp.messagerie@'),
MKG=(ckR('eTagMKG')+'|||').split('|'),mkg=MKG[0],acn='21cac24e34b1224321a4252e2cab846b',
lh=function(l){l=D.location;return l.host+l.pathname[RE](/\/$/,'')},l=D.location,h=lh(),
X=ckR('eTagXX'),Rf=D.referrer||'',TS=new Date*1,TH=TS/36e5-376944|0,
IM=function(u){new Image(1,1).src=u},
ty=function(v,t){return(t||'function')==typeof v},
F=function(f){return ty(f)?f.apply(0,Array.prototype.slice.call(arguments,1)):!1},
Af=function(A,f,i){for(i=0;i<A.length;i++)if(f(A[i]))return A[i]},
$B=_('body',0),
$hR=function(o,r,s){_(o).E(function(o,v){v=_(o).H();if(r.test(v))_(o).H(v[RE](r,s))});return o},
$op=function(o,b){_(o).S('opacity',b?1:0)},
px=function(n,b){return n>0?n+'px':n?n:b?'100%':0},
TL=_.tl=function(v,o,k){if(o){k=Object.keys(o);s.linkTrackVars=k.join(',');k.forEach(function(i){s[i]=o[i]})};s_tl(this,'o',s.pageName+v)},
f0=function(){},
fsp=_.fsp=function(e){e.stopPropagation()},
ft=function(s){return(s||'')[RE](/<br>/g,' ')[RE](/ ([:?!;])/g,'&thinsp;$1')},
fpc=function(i){ckW("eTpcI=0:"+(TH+24)+"/"+(i?i+":"+(TH+720)+"/"+ckR("eTpcI")[RE](new RegExp("\b(0|"+i+"):[^/]/","g"),""):''))},
r6=Math.random()*1e6|0,
ico=function(v){if(T('[^/]*[#@]')){if(!_(v='link[rel~=icon]')[0])_('head').A('<link rel="icon"/>');_(v).at('href',_.nr?med+'favicon-redbysfr.ico':ist+'favicon.ico')}},
CC='9||501a91513cc7165126000000|509bd06d58799d5222000000|52f281eb7fdf1a8c3d8b4568|526fcc6380df1ad6383c99d8||7|54bf72277fdf1a73788b4567|54d096417fdf1aa2598b4568|550b093a80df1a47348b4568|51af62d980df1aa66d000001|50d077067fdf1a0d76000000|56582d6980df1a213b8b4567|58d9303680df1adc5e8b4567'.split('|'),
eS=ckR('eTagEspaceSFR'),
pTj=T('@/cas/')?f0:function(){if(!_.paJ)JS(_.paJ=ist+'resources/js/panier-transverse'+(_.fut?'-fut':_.IPP?'-ipp':cms?'.cms':'')+'.js')},
wh=function(){return W.innerHeight},ww=function(){return W.innerWidth},wm=_.wm=function(w){return ww()<(w||768)},
dCs=function(o,c,m){
o=_(this);c=o.at('data-catch')[RE](/^datacatch_/,'')
W['cb'+c]=function(r){r=r&&r.code;o.H(
/^201-[12]$/.test(r)?'Merci pour votre inscription ! À bientôt par mail':
/^2/.test(r)?'Vous êtes déjà inscrit à la newsletter':
"Une erreur s'est produite "+r)}
m=o._('[type=email]')[0].value
if(/.+@.+[.].+/.test(m))eP('advC','callback=cb'+c+'&o='+(o._('[type=checkbox]')[0].checked?1:0)+'&m='+m+'&d=datacatch_'+c)
return!1},
dC=_.dC=function(o){if((o=_('[data-catch]')[0])&&!o.dC){o.dC=1;o.onsubmit=dCs}},
ab=_.ab=function(o){if((o=_('[data-eTab]'))[0]){
_.AB=[]
_(o).E(function(o,i,a,b,c,A,v,n,r){
r=_.SS?0:ckR('evar28').split('_')[2]%1e8|0
a=(_(o).at('data-etab')||'').split(':')
if(!/^[a-z0-9]{3}$/i.test(a[0]))return
for(i=v=0;i<3;i++)v=v*13+a[0].charCodeAt(i)
i=r?(r/[1,1e2,1e4,1e6][v%4]+(v>>2))%100|0:0
A=_.AB[a[0]]||[0,0]
c=ckR(n='eTab'+a[0])
v=A[0]+(a[1]|0)
A[1]++
b=c?c==A[1]||c=='0'&&A[1]==1:A[0]<=i&&i<v
if(b){o.removeAttribute('data-eTab');ckW('eTab'+a[0]+'='+(r?A[1]:0),1)}
else _(o).R()
if(v>99)A[1]=v=0
_.AB[a[0]]=[v,A[1]]})}},
sdi=_.sdi=function(o,l){
l=location.pathname
wait(function(){
o=_('#eTc2L,#eTsdi');if(o[0]){
o.C('cd',1);if(CS||T('@/accessoires')||RegExp(_.nbP).test('@'+l))_.fCD(1)
o.C('X',/^.offre.mobile/.test(l)?1:0)
_('#eTc2L').af(1);_('#eTsdi').C('O');return 1}
else if(!_.s22){_.s22=function(d){_('#eThS').A(d.content,2)};JS('*sdi23|s22')}})},
c2c=_.c2c=function(c,b,a,S){
if(W.SHR)return
if(_.r114)return c2cR('5e3aab14626331176f000000')
if(T('espace-client-red@|(communaute)?#')&&c==null)return c2cR()
if(_.app||W.PMU||e24==9803132||e24==9803133)return
if(c==1||c==6)c=2
ST('#baSticky,#c2cD{D0!}#eTc2{position:fixed;height:64px;bottom:8px;right:10px;cursor:pointer;filter:drop-shadow(0 0 4px #2225);z-index:'+(S?99999:59600)+'}')
S=ckR('eTshrS')
c=/^[0-9a-f]{24}$/.test(c)?c:
c==33?'58e7a67d80df1a13688b4567':
c==44?'582c37f97fdf1a2e118b4567':
c==22?'575ea30d7fdf1ad4128b4568':
S?'5a12f6c07fdf1adc4b8b4568':CC[c]||0
ST('#eTc2{right:-107px}');SM(-768,'#eTc2{transition:right .2s}#eTc2:hover{right:0}')
_B.A((S?im+'3-rappel.png':'<img src="//static.s-sfr.fr/eT/SDI/sdi.svg')+'" id="eTc2" alt="Besoin d’aide"/>')
if(T('@'))ti(function(o){o=_('bol-price-bar-block>div>div')[0];_('#eTc2').S('bottom',(o?8-o.offsetTop:_('#eTchF')[0]?88:8)+'px')})
_('#eTc2').cl(function(v){
TL('/pictoC2C')
if(!v&&(S||/change/i.test(par('context'))||/Changer/.test(sE(46))||T('@/sfr-sat'))){_.c2cP(c);if(a)a();return}
_.nr=0;sdi()})},
evt=function(n,e){e=s.events;s.events=(e?e+',':'')+(n>0?'event'+n:n)},
SC=_.scan=function(S,F){if(S){
var L,i,V,R=''
for(i=0;i<S.length;i++)if(L=S[i]){
V=L.split('~'),e=V.shift()[RE](/^A/,'assistance@(/runtime)?/'),c=e.charAt(0),d=e.substring(1)
if(c=='='){R=d;continue}
if(T(c=='>'?e=R+d:e)&&F(V))break}}},
wf=function(v,f){if(W[v]&&W[v][f])W[v][f]();else to(function(){wf(v,f)})},
p,E,Q,eL="//www.sfr.fr/recherche/js/log.js?eTag",pu,pv,
upV=function(){
E=s.events||'';Q=s.products;pu=/\bpurchase\b/i.test(E);pv=/\bprodview\b/i.test(E)
Q=/;.*;.*;/.test(Q)?Q.split(","):[]},
prod=function(Q,s){
if(!Q)return ['','','']
var p='',M=0,N=0,T='',O=''
if(!s)s=','
for(var i=0;i<Q.length;i++){
var R=Q[i].split(';'),m=1*R[3],n=1*R[2],v=R[1]||''
if(!v.match(/^FICTIF/)){
n=n>0?n:m>0?1:0;N+=n;M+=m*n;p+=s+R[1]
if(v.match(/^([0-9]{5,18}|ESHOP[0-9]+)$/)){if(!T)T=R}else{if(!O)O=R}}}
return [p.substring(1),''+N,''+M,T,O]},
dev=_.dev,
lse=function(){return _.lse(1)},
prf=function(p,P){
P=spl('U`mABONNE`MA`mFORFAIT_BLOQUE`MF`mABONNE_RED`MJ`mFORFAIT_BLOQUE_RED`MK`mPREPAYE`ML`mENTREPRISE`ME``mRESILIE`MR`dABONNE`Da`dFORFAIT_BLOQUE`Df`dPREPAYE`Dl`dSECOURS`Ds`iTHD`IT`iADSL`IX`iTHD_RED`IH`iADSL_RED`IN`iBASDEBIT`IB`iSECONDAIRE`IS`iORPHELIN`IO`iRESILIE`IZ`VOIX_FIXE`V')
return P[P.indexOf(p[RE]('MOBILE_','m')[RE]('DATA_','d')[RE]('INTERNET_','i'))+1]||99},
F2=function(d){return(d>9?"":"0")+d},dat=function(d){return d&&(d=new Date(d*1))?F2(d.getDate())+"/"+F2(d.getMonth()+1)+"/"+d.getFullYear():""},
fNo=_.fNo=function(l){return l[RE](/^(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,'$1 $2 $3 $4 $5')},
cS,cSq=function(l){if(_.cc&1){
v='setCustomVariable'
_uxa=W._uxa||[]
_uxa.push([cS?'trackPageview':'setPath',l+location.hash[RE]('#','?__')],
[v,1,'Pagename',s.pageName||W._stats_pagename,3],
[v,2,'Type_Acte',sE(46),3],
[v,3,'authentification',sE(10),3],
[v,4,'Levier_Market',sE(57),3],
[v,5,'Visitor_type',sE(38),3],
[v,6,"Test d’éligibilité",sE(87),3])
if(!cS)JS(cS="//t.contentsquare.net/uxa/92510e16826c8.js")}},
bnk=function(v){if(bK.indexOf(v)<0)JS('//embed.binkies3d.com/integrations/'+v+'/script.js',function(){bK+=v})},
dimelo=function(d,D,N){if(!_.app&&(_.cc&2)&&!ckR('dim0')){
N=W.Notification
D=[ ['redbysfr',ckR('eTc20')?'81e27afb90a4b9ceb304bce2':'fc6e382aacd0cec88799e5fb'],
['sfr','71724c11c886ccd362585dbc'],
['sfr-tlv','1002d908cb3e81376233267f'],
['sfr-tlv','b694622e271fa68a4472a49f'],
['sfr','fee79d18f82b0cbdf8e1b167']][d>1&&par('eTdim')?3:d]
JS('//'+D[0]+'.dimelochat.com/chat/'+D[1]+'/loader.js')
v=[_.nom||'',_.prenom||'',_.conM||'',_.conT||'',(_.lf||'')+(_.lf&&_.lo?' ':'')+(_.lo||'')]
f=function(z){return/^(9.)?$/.test(z)?'':z}
_chatq=[["_setIdentity",{"screenname":v[1]+' '+v[0],"firstname":v[1],"lastname":v[0],"email":v[2],"uuid":e4,
"extra_values":{"mobile_phone":_.LM&&_.LM[0]||'',"home_phone":_.LF&&_.LF[0]||'',"ref_compte":_.ott||f(sE(52)||Z[14]),"offre":v[4],"date_activation":dat(_.dam)+" "+dat(_.daf),"PTA":_.pt||"","id_asc":e4}}],
['_onEvent','chat_shown',function(){TL('/Dimelo/Chat/Ouverture');ST('#eTc2cP{D0!}')}],
['_onEvent','chat_engaged',function(){TL('/Dimelo/Chat/Engage');if(N)N.requestPermission(function(s){N.permission=s})}],
['_onEvent','chat_closed',function(){ST('#eTc2cP{display:block!}')}],
['_onEvent','message_received',N?function(n){n=new Notification("Nouveau message",{icon:med+(d?'logo-3':'chatnot')+".png",body:"Une réponse vous attend dans le Chat. Cliquez-ici."});n.onclick=function(){W.focus();this.close()}}:f0]]
f=function(c,v){_chatq.push(["_fillCustomVariable","custom_"+c,v||v===undefined])}
v=(_.LF&&_.LF[5]||'')+(_.LM&&_.LM[5]||'')
if(d==0){
if(/;RPVM;/.test(v))f("virgin")
if(/;PRSC;/.test(v))f("pro")
if(/;PTML;/.test(v))f("orian")}
if(/purchase/.test(s.events))f("products",s.products)
f("events",s.events)
if(_.mob())f("mobile")
f("device",_.mob()?"mobile":"desktop")
if(d>0){
if(e4)f("authentification")
v=lse()
if(v=_.ott?'OTT':v?(/_RED$/.test(v[1])?'RED_':'')+(v[4]||'MOBILE'):0)f("competence",v)}
if(T(CS+'recap')){f('epropal_panier',0);_('[data-tag=saveCartButton]').cl(function(){f('epropal_panier')})}
f("logue")}},
ERR=function(e){JS('//www.sfr.fr/stats/err.js?'+e)},
sh8=_.sh8=function(a){
function rr(v,a){return(v>>>a)|(v<<(32-a))}
var P=Math.pow,M=P(2,32),L='length',i,j,r='',W=[],b=a[L]*8,C={},c,p=0,h=[],k=[]
for(c=2;p<64;c++){if(!C[c])for(i=0;i<313;i+=c)C[i]=c;h[p]=(P(c,.5)*M)|0;k[p++]=(P(c,1/3)*M)|0}
a+='\x80'
while(a[L]%64-56)a+='\x00'
for(i=0;i<a[L];i++){j=a.charCodeAt(i);if(j>>8)return;W[i>>2]|=j<<((3-i)%4)*8}
W[W[L]]=((b/M)|0);W[W[L]]=(b)
for(j=0;j<W[L];){
var w=W.slice(j,j+=16),o=h
h=h.slice(0,8)
for(i=0;i<64;i++){
var i2=i+j,w15=w[i - 15],w2=w[i-2],a=h[0],e=h[4],t=h[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&h[5])^((~e)&h[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0),
T=(rr(a,2)^rr(a,13)^rr(a,22))+((a&h[1])^(a&h[2])^(h[1]&h[2]))
h=[(t+T)|0].concat(h)
h[4]=(h[4]+t)|0}
for(i=0;i<8;i++)h[i]=(h[i]+o[i])|0}
for(i=0;i<8;i++){for(j=3;j+1;j--){var b=(h[i]>>(j*8))&255;r+=((b<16)?0:'')+b.toString(16)}}
return r},
nbR=function(o,p){if(o=D.querySelector('a.link_MenuUser [alt=Recherche]'))o[p='parentNode'][p].setAttribute('href','/recherche/mixte?o=NB')},
cR="d90d25",
sV=function(i){return s[i]||Z[i]||/^eVar|^prop/.test(i)&&Z[i.substr(4)]||''},
sP=function(i,p){return s[p='prop'+i]||Z[p]||Z[i]||''},
sE=function(i,e){return(s[e='eVar'+i]||'')[RE](/^D=c(.*)/,function(m,i){return sP(i)})||Z[e]||Z[i]||''}
_.mois=function(m){return spl('janvier`février`mars`avril`mai`juin`juillet`août`septembre`octobre`novembre`décembre')[(995+m*1)%12]}
if(T(_.nbP))nbR()
if(o=ckR('eTab821')>1&&!_.h23&&T('(actus|assistance|(boutique.)?home|la-communaute|webmail)?@')&&_('#eThS')[0]){
_.hdr();if((v=o.previousElementSibling)&&v.tagName=="STYLE")_(v).R();_(o).R()
if(W.AMP){o=_eT('style[amp-custom]');o.H(o.H()[RE](/#eTh[^}]+/g,''))}}
_.wS=_.wS*2|9
if(X&&!_.s&&_.wS<999)return to(_eTf,_.wS)
if(!W.s||!s.t)s=_.s||0
upV()
ti(function(){
var l=location,h=l.hash;l=l.pathname,o
if(/#sfrpt/.test(h)&&(o=_('#PT .desc>ul>li:last-child')).T(/^NETFLIX avec publicité et bouquet Famille$/))o.R()
if(l!=_.lL){
_.lL=l
if(v=T('@')?RegExp("^/"+_.nbM+"|^/options/|^/offre-internet/").test(l)&&'fguw1zhd':0)bnk('WXrjW06r/'+v)
}},333)
if(T('espace-client-red@'))_.nr=1
if(T('@/(recherche|portail.html)')&&!W.eTnr)_.nr=0
_.U=function(s){var a=s.split('~'),r=a[0],i;for(i=1;i<a.length;i++)r=r[RE](a[1].charAt(0),a[1].substring(1));return r}
_.popin=function(u,x,y,t,c,b,m,h,f,H,w,S,a,k){
var H=wh(),S=W.scrollY
if(y>0&&y+(t>0?t:0)>H)y=H,t=0
H=x>0?x:m>0?m:0
m=m>0?m+'px':m||'100%'
b=b||'transparent'
ST('body.eTpi{position:fixed!;width:100%!;margin-top:-'+S+'px!;height:initial!}')
f=function(){_B.C('eTpi',1);_('#eTpi').R();W.scrollY=S;_.pi0=0;$op('#eTc2cP',1)}
c=c||(_.rs?'233c82':_.nr?'00e094':cR);if(/^[0-9a-f]{6}/.test(c))c='#'+c
if(!t&&y>0)t=(wh()-y)/2
x=x>0?x+'px':x||'60%'
y=y>0?y+'px':y||'60%'
t=t>0?t+'px':t
h=h>0?h+'px':h
_('#eTpi').R()
w=';max-width:'+m+';width:'+x
a=u.charAt(0)
if(a=='*'){_.pif=function(d){_('#eTpiF').A(d.content)};JS(dj+u.substr(1)+'|pif');a='<';u=''}
_B.C('eTpi');_B.A(
'<div id="eTpi" style="overflow-x:hidden;margin:0;padding:0;z-index:99998;position:fixed;top:0;left:0;border:0;display:block!important;visibility:visible!important;'+(a=='<'?'':'font-size:0;')+
'width:100%;height:100%;text-align:center;background:rgba(0,0,0,.7)"><style>'+
'#eTpiC{cursor:pointer;height:40px;width:40px;margin:'+t+' 0 0 calc('+x[RE](/^(\d+)/,function(m,p){return p/2})+' - 40px);border-radius:0;'+
'background:url('+med+'picto-close-3.png) no-repeat center '+c+';position:absolute;left:50%;z-index:1}'+
'#eTpiF{height:'+y+w+(h?';max-height:'+h:'')+';border:0 solid transparent;background:'+b+';padding:0;margin:'+t+' auto 0}'+
(H?'@media only screen and (max-width:'+H+'px){#eTpiF{margin:0 auto}#eTpiC{margin:0;left:auto;right:0}}':'')+
'</style>'+(c<0?'':'<div id="eTpiC"></div>')+
(a=='<'?'<div id="eTpiF">'+u+'</div>':'<iframe id="eTpiF" scrolling="0" frameborder="0" src="'+u+'" allowTransparency="true"></iframe>')+'</div>')
wait(function(o){o=_('#eTpi')[0];return!(o&&o.style.display!='none')&&(f(),1)})
k=!u.indexOf("//appel.sfr.fr")?1:!u.indexOf("//integ-appel.sd-sfr.fr")?2:0
if(c+1)_('#eTpi,#eTpiC').cl(f)
_('#eTpiF').cl(fsp)
if(!mP)_.msg(mP=function(e,o,l,p,n,h){
e=e.data;n=0
if((h=e&&e.H)>99){o=_('#eTpiF');o.S('height',Math.min(h,W.innerHeight-32-o.S('margin-top')[RE]('px',''))+'px')}
if(e==1||/c2c_popinClose/.test(e))f();else if(k&&/c2c_popinLoaded/.test(e))wait(function(){
p=W.panierTransverse;p=p&&JSON.stringify(p.get());if(!p&&n++<6)return
o=_('#eTpiF')[0];l=lse();if(w=o&&o.contentWindow){
w[PM](l='{"action":"c2c_clientData","data":{"id":"'+e4+'","n":"'+(l&&l[0]||'')+'"},"private":{'+(p?'"cart":'+p:'')+'}}',k<2?"https://appel.sfr.fr":"https://integ-appel.sd-sfr.fr");console.log("data:"+l)}
return 1},333)})
return!1}
_.elg=function(u,p,n,m,c,o,f,x){
if(u&&u[0]=='*')x=-1,u=u.substr(1)
var H='&hideFooter=true',O='&hideIsSFRCustomer=true',U=['SFR','RED','PNC','PVM'],A='ADSL,CBL,THD',e=_.fel(u),F='sfr.fr/offre-internet/box-thd?fromeligibility=true',R=/^POW/.test(u)&&u
f=f||_.elf
ckW('eTbfF='+(R?'1':''),R?1:-1)
if(_.PRO)A='ADSL'
if(W.SHR)A='ADSL,CBL,THD'
p=p?"&selectedPkg="+p:""
u=U.indexOf(u);if(u<0)u=0
if(p&&e.match(/M=[A-Z|]*CBL/)){location='https://'+(u%2?'red.by-':'www.')+F+p;return}
m=m||[A,'ADSL,CBL','CBL',A][u]
c=c||[cR,'00e094','588c01','672D65'][u]
o=o>0?(o&1?H:'')+(o&2?O:''):o||[H,H,H+O,H+O][u]
if(T('@/box-internet/srp.html'))U[u]='SHP'
_.popin('//'+(cms&&!R?'cms':'www')+'.sfr.fr/tester-ma-ligne/eligibility-by-ndi.htm?univers='+U[u]+m[RE](/^|,/g,'&marques=')+o,728,720,0,x)
_.msg(function(e){
ckW('eTelg=1',1)
var d=e.data,g='thd',G='CBL',v,
l=_.elgR||T('@/(startersrp|offre-internet|box-mobile|box-internet/(startersrp|tv-samsung-offerte|config4p).html)')?0:'https://'+(cms?'cms.':'www.')+F
if(d!=7&&d[0]!='{')return
eval('d='+d)
if(d==7||d&&d.eligibility){
if(f)return W[PM]('1','*'),f(d)
if(T('@/mon-espace-client/try-and-buy'))return W[PM]('1','*'),!1
if(T('@/telephonie-mobile\/multi-?packs?-sfr'))l='/telephonie-mobile/multi-packs-sfr-internet-mobile.html'
if(R&&(e=_.fel('SFR').match('M=([A-Z]+)'))){
ckW('eTagMKG='+(v='baa7b67e1e5551fbc54e3981df325541')+'||',2)
e=e[1]
if(e=='ADSL')g='adsl',G='DSL-ZV'
if(e=='CBL')g='thd',G='CBL'
if(e=='THD')g='fibre',G='THD'
l='https://www.sfr.fr/offre-internet/box-'+g+'/?partnerid='+v+'&fromeligibility=true&selectedPkg=CQT-UT-'+G+'-3P-POWER'+(R=='POW+'?'PLUS':'')}
if(l)location.href=l;else location.reload(!0)}})
return!1}
_.c2cRed=c2cR=function(c){
if(W!=top)top[PM]('{"C2CR":"'+c+'"}','*')
else _.popin('//appel.sfr.fr/webcallback_form?CAMPAIGN_ID='+(c&&(c+'').length==24?c:ckR('eTshrR')?'583dbed17fdf1a7d758b4567':T('#/offre-internet')||T(CR)&&/RED\/POST\/Fixe/.test(pn)?'5b97c3ec7fdf1af6128b4567':'56bb59c57fdf1a39558b4567'),320,660,0,-1)}
_.c2cP=function(c,v,u,i,f){
if(top!=W)return top[PM]('{"C2CS":"'+c+'"}','*')
if(/601aba8f3735651299000000|5c7fc62680df1a77458b4567/.test(c)&&ckR('eTfp')=='CCL24')c='612f7fad6263313dc6000000'
if(!c&&T('@/espace-client/offres-et-options/demenagement.htm'))v=lse(),v=v&&v[4],
c=v=='FTTB'?'591bf8d780df1a8d4a8b4567':v=='FTTH'?'591bfdba80df1aae598b4567':'591bfb1b80df1a67528b4567'
if(c==CC[4]&&/withMobileSel=true/.test(location.search))c='59709c6680df1ad32a8b4567'
if(par('c2cD'))v='","',ckW('eTc2cD='+escape('{LM:["'+(_.LM||[]).join(v)+'"],LF:["'+(_.LF||[]).join(v)+'"]}'))
u=(par('eTcd')?'//integ-appel.sd-':'//appel.')+'sfr.fr/webcallback_form?CAMPAIGN_ID='+(c||CC[2])+'&R='+lh()+(e4?'&I='+e4:'')
f=c=='62d575456263311ebb000000'
return i||c=='5771047280df1a3c018b4568'?location=u:_.popin(c==7?dj+'popin.c2c.bolr.html':u,560,f?552:420,0,f?1:0)}
_.xR=function(x,v){return x.charAt(0)=='!'?!v.match(new RegExp(x.substring(1))):v.match(new RegExp(x))}
_.E38=function(e){e=sE(38)||'';return e=='GP.CARRE'?1:e=='GP.RED'?2:0}
_.EV=function(c,p){
upV()
var S=function(t){return(/^D=c/.test(t)?s['prop'+t.substr(3)]:t)||''},
e4=sE(4),e28=sE(28),e38=sE(38),e46=sE(46),e52=sE(52),e61=sE(61),
kw=_.KW||sP(3),pn=S(s.pageName),AE=_.evtA||[],a='['+(e4?e4:'@')+']',AA,A,A0,A1,A2,V,R,v,e,E,ok=1,id,
cb=ty(c)?c:0,C=cb?0:c,i,L=location,
I=_.a2b(ckR('eTiab2')),cc=I.substr(152,10),
sQ=function(v){var i,r=0,e=new RegExp(v);for(i in Q)r=r||Q[i].match(e);return r}
if(v=cP&&_.mfb)v()
o=sE(9)
if(/^1...11.1.1$/.test(cc))eP('stat','S='+encodeURI([e4,e28,pn,e46,cc+'/'+I.substr(140,2),sP(3),
L.host+L.pathname,S(W._stats_univers),(!o?'':/ non /.test(o)?2:1),S((lse()||[])[0]),sP(4),sP(57),
sE(56),sE(57),sE(59),sP(14),sE(10),sP(55),sP(29),
sP(31),sE(68),sP(71),sP(62),sE(87),sP(75),sE(89),
sE(90),S(s.product),sE(54),sE(64),sP(48),
sP(36),S(s.el),S(s.ct),ckR('eTvi')].join('~')[RE](/\s+|&([^;~ ]+;)?/g,' ')))
if(T('#/forfaits-mobiles')&&/change/i.test(par('context')))_('#eTc2cP').af()
if(T('#/telephones')&&/APPLE-iPhone-11-Pro-Max/.test(L)&&!W.videolauncher)_.JS(rbs+'export/bloc/django/test.script.2|')
if(T('[#@]/espace-client/parc')&&_('[data-arw]')[0])wait(function(A,n,o,c){
if(!_.pS)return 0
_('[data-arw]').E(function(o,f,I,E,t){
I=o.id;if(I&&!o.ok){
o.ok=1;E=/SFR/.test(I)
if(/^EC_(SFR|RED)_N1_OFFRE_(MOBILE|FIXE)_2019$/.test(I))_.sT(E?'EC SFR N-1 OFFRE HAUT V2':'RED EC n-1',E?'bandeauSFRv2':'ECred','#'+I,par('eTsT'))}
if(!o.id)c=1});return!c})
if(e=!_.e0&&_.elr){
if(T('(espace-client@/services-web|rmcsport.tv/boutique)/panier'))e([1])
if(/devis formulaire.confirmation$/i.test(p))e([7,p])
if(W.sha&&_.cc==7){
if(v=/Datacatch.Bon Plan$/.test(p)&&_('#eTsNL [name=email]')[0])e([6,sha(v.value)])
if(v=T('appel@')&&/Mise En Relation/.test(pn)&&s.prop71)e([8,sha(v)])}
if(T('@/forfait-mobile/')&&/\/Layer\//.test(pn)||T(RBOL))e([1])}
_.e0=0
if(c<0||!(_.cc&2)||!e28)return!0
for(e=0;e<AE.length;e++){
A=AE[e].split("\t")
if(ok||A0){
ok=0
A0=A[2],A1=A[0],A2=A[1]
R=new RegExp("^("+A2+")$","i")
V=new RegExp("\\b("+A2+")\\b","i")
if(A1=='X'&&pu&&R.test(e46))ok=1
if(A1=='V'&&pv&&_.xR(A2,e46))ok=14
if(A1=='N'&&R.test(pn))ok=2
if(A1=='S'&&V.test(kw))ok=3
if(A1=='U'&&R.test(D.URL))ok=4
if((A1=='P'||A1=='O'&&e46=="SC:Option")&&pu&&sQ(';'+A2+';'))ok=5
if(A1=='C'&&C==A2)ok=6
AA=A1.split('|')
if(!ty(v=sV(A1))&&R.test(v))ok=11
if(ok&&A0){
id=0;if(/#/.test(A0)){v=A0.split('#');A0=v[0];id=v[1]?sV(v[1])||v[2]:v[2]||(Q[0]||'').split(';')[1]}
v=e4||ckR('eTe4');o=lse()
if(!new RegExp('\\b'+A0+'\\b').test(E=ckR('eTevt'))){
eP('sTaE','e='+A0+'&b='+e28+'&a='+v+'&v='+(id||'-')+(o?'&l='+o[0]+'&i='+o[5]:'')+'&t='+TS,cb)
ckW('eTevt='+E+(E?',':'')+A0,1);cb=0}}}
else A0=A[2]}
if(cb)cb()
return!0}
_.vue=function(d,l,H,B,p,n,E,M){
if(!_.ft0)ST(_.ft0='#footer,#eTsF~#eTsF,#eTfS~#eTfS{D0!}');if(!_('#eTsF,#eTfS')[0])_.ftr()
nbR()
ab()
if(!_.iab2&&ccA&&_.cc===''&&(l=D.querySelector('#CkC .A'))){l.click();ccA=0}
l=d.v;if(l=l&&l.prop68)ckW('eTfp='+l,.5)
l=location.pathname
l=l.replace(/^\/(v2|newsfrfr)\b/,'')
H=l=='/'||!l
M=new RegExp('^/'+_.nbM).test(l)
_B.C('eTdev',M?0:1)
s_univers='Web/'+(
/^\/(boxtv|offre-internet)\b/.test(l)?'ADSL/Boutique':
/^\/internet-mobile\b/.test(l)?'Mobile Et ADSL/Boutique':
/^\/tv-sfr\b/.test(l)?'Vos Services':
/^\/(telephones?|offre-mobile)\b/.test(l)||M?'Mobile/Boutique':'NewSfrFr')
stats(d)
dC()
d.ev=='scEpropal'&&(o=_('bol-save-basket form')[0])&&(o.f=dCs)()
if(/^.offre-internet.box-tv-srp/.test(l))ST(H='#eTsF>div>*{D0!}#eTsF .SOC,#eTsF .BAS{display:inline-block!}')
if(/^.offre-internet.fibre-sfr-etre-rappele/.test(l))H=1
o=[];if(/^.offre-mobile/.test(l))o=_('li[id*=mobile_p40],li#mobile_mate_xs,li#mobile_mate_40pro,li#mobile_y6p')
if(!_(v='.eTp40')[0]&&((_.p40=o[0])||/^.huawei-(p40|matexs|mate40pro|y6p)/.test(l))){
_(v).R()
o=_.p40?o:_('bol-price-bar-block .bl_btn')
o.E(function(o){
o=_(o);if(_.p40)o=o._('a[boladdtobasketbtn]')
o.S('position','relative')
o.A('<div class="eTp40" style="position:absolute;top:0;height:100%;width:100%;cursor:help"></div>')
o._('div').cl(function(O){
fsp(O)
_.popin('*popo.in.disclaimer',800,'90vh','5vh')
O=_(this).P()
_(this).R()
wait(function(o){if((o=_('#eTap'))[0])o.cl(function(){
_('#eTpi').R();(_.p40?O:_('bol-price-bar-block .btn'))[0].click()
});return o[0]})})})}
cSq(l)
if(l=_.elr)l([1])
l=H&&sE(4)
if(!_('#eTc2')[0]){if(l)ST('#eTc2{D0}');c2c()}
_('#eTc2').af(l?0:1)
if(l=_.nl)l();if(l=_.AVs)l()}
_.cbEB=function(d){log(d)}
_.chat=function(b,m,o,I,S){
_('meta[name=viewport]').at("content","initial-scale=1,minimum-scale=1,maximum-scale=1")
if(T('#')&&!W._chatq)dimelo(0)
var e=par('eTcd'),v=ckR(b?'eTchS':'eTch'),t=par('eTcbT')||ckR('eTcbT'),r='&R='+lh(),u='https://'+(t?
's.sfr.fr/bot-int-'+(b?'sfr':'red')+'?t':b?
(e?'integ-webcontact'+(e>1?2:'')+'.sd-sfr.fr/messenger/?cid=5bcf20885946c41ea672a1b3':'ctc.sfr.fr/messenger/?cid=5bd0630e1c69883442abc9bb')+'&brand=sfr&theme=sfr'+(b>1?2:'')+r:
'ctc.red-by-sfr.fr/messenger/?cid=54d1cc0e6803faef0a8b4567'+r),
C='#eTchD,#eTchF',R=function(o){if(o){_(C).C('M',1);o.contentWindow[PM]({action:'webchat-restore'},'*')}return o}
if(t)ckW('eTcbT=1',.2)
if(R(_('#eTchF')[0]))return
_(C).R()
$op(I='#eTchat,img#cbot,img#eTc2cP,span#eTc2cP')
if(!_.chI){
ST(_.chI=
'#eTchD,#eTchF,#eTchA{border:none;margin:0;padding:0;position:fixed;display:block!}'+
'#eTchD{height:40px;width:'+(b?280:230)+'px;max-width:calc(100% - 120px);background:transparent;z-index:69998;cursor:move;cursor:-webkit-grab}'+
'#eTchF{height:'+(b?700:540)+'px;width:'+(b?400:350)+'px;max-width:100%;max-height:100%;z-index:69997}'+
'#eTchF.M+#eTchA,#eTchD.M{D0!}#eTchF.M{bottom:0!;right:0!;height:72px!;width:80px!}'+
'#eTchA{background:#0005;z-index:69999;height:682px;width:382px;max-height:calc(100% - 18px);border-radius:9px;bottom:9px;right:9px;overflow:hidden}'+
'#ChatBot{position:relative;z-index:1}#ChatBot h4{D0}'+
'#ChatBot>#eTchF,#ChatBot>#eTchA{position:static;width:100%;height:100%;max-height:100%}'+
'#ChatBot>#eTchA{position:absolute;top:0;bottom:auto;right:0}')
SM(767,'#eTchD{D0!}#eTchF,#eTchA{height:100%;width:100%;max-height:-webkit-fill-available}'+
'#eTchA{bottom:0;right:0}')
_.msg(function(e,a,i,v,m,p){
e=e&&e.data;a=e&&e.action;i=e&&(p=e.params)&&p.pid;m='#eTchM'
if(v=a&&a.match(/^webchat-(.*)$/))v=v[1],TL('/Moss/'+(_.cbot?'Bot/':'Chat/')+v[0].toUpperCase()+v.substring(1))
if(a=='webchat-init'){if(b)ckW('eTchS='+i,2),ckW('eTchSP='+i,168);else ckT('eTch',i,90),ckT('eTchP',i,9999)}
if(a=='webchat-minimize'){if(_('#ChatBot>#eTchF')[0])R(v);else _(C).C('M')}
else if(a=='webchat-restore')_(C).C('M',1)
if(a=='webchat-notify-close')_(m).R()
if(v=a=='contactDimelo'&&p&&p.id)ckW('elr_uidDim='+v,72)
if(v=a=='webchat-notify'&&e.message){
if(!_.cM)ST(_.cM=
m+'{position:fixed;bottom:8px;right:88px;max-width:240px;background:#ddd;padding:8px 12px;border:1px solid #999;border-radius:9px;font:14px Arial}'+
m+':after{position:absolute;content:"";right:-6px;top:calc(50% - 5px);width:9px;height:9px;background:#ddd;transform:rotate(45deg);'+
'display:inline-block;border:0 solid #999;border-width:1px 1px 0 0}')
_B.A('<div id="eTchM">'+v+'</div>')
_(m).cl(_(m).R)}
if(v=a=='webchat-redirection'&&e.params)
ckT('MLS',escape(btoa(v.line.split('').map(function(o){return String.fromCharCode(o.charCodeAt(0)+2)}).join(''))),99,function(){location=v.url})
if(a=='webchat-close'){b?ckD('eTchS'):ckT('eTch',i,-9);_('[id^="eTch"]').R();$op(I,1);_(I).af(1)}})}
if((o=_('#ChatBot'))[0])o.A('<iframe id="eTchF"></iframe>')
else{
_B.A('<iframe id="eTchF" style="bottom:0;right:0"></iframe>')
_B.A('<div id="eTchD" style="bottom:'+(_('#eTchF').S('height')[RE]('px','')-50)+'px;right:60px"></div>')}
if(par("eTchA")||b&&!ckR('eTchA')){
_.chA=function(d){_('#eTchA').A(d.content||'')}
_('#eTchF').A('<div id="eTchA"></div>',2)
JS('*chrgpd|chA')}
_('#eTchF').at('src',u+(v?'&pid='+v:'')+(_.cbot?'&chatbot=true&asc='+e4+(o[0]?'&view=container':'')+(wm()?'&device=mobile':''):''))
m=function(o,x,y){o.S('right',o.S('right')[RE](/px/,'')-x+'px').S('bottom',o.S('bottom')[RE](/px/,'')-y+'px')}
if(o=_('#eTchD')[0]){
o.onmousedown=function(e,o){fsp(e);o=this;o.X=e.pageX;o.Y=e.pageY;o.M=1;_(o).S('cursor','-webkit-grabbing')}
o.onmouseup=function(e){fsp(e);this.M=0;_(this).S('cursor','-webkit-grab')}
o.onmousemove=function(e,o){
o=this;if(o.M){
var x=e.pageX-o.X,y=e.pageY-o.Y
o.X+=x;o.Y+=y;m(_(o),x,y);m(_('#eTchF'),x,y)}
fsp(e)}}}
if(T('appel@/webcallback_form')){
ti(function(h){h=_B.S('height')[RE]('px','');if(h!=_B.H){_B.H=h;parent[PM]({H:h},'*')}},333)
Z['prop62']=par('R')||Rf}
if($&&T('[^/]*cloud@'))JS(ist+'resources/js/cloud'+(W.SYS_CONFIG["static.web.resource.path"]!="static/20170809-1107"?2:'')+'.js'),_.nr=0
if(eS&&T('@/tester-ma-ligne/eligibility-')){
_('.SFR_ModalFooterHelp').af()
v='.SFR_EligibilityResult_';o=_(v+'buttons a');if(o[0]){
o.R()
_(v+'espace').S("font-size","16px").S("text-align","center").S("font-weight",600).H('POUR ALLER PLUS LOIN ADRESSEZ-VOUS À VOTRE CONSEILLER DE VENTE')
_(v+'buttons').A('<a class="SFR_FormButton SFR_FormButton-big SFR_FormButton-violet">Retour</a>')
_(v+'buttons>a').cl(function(){ckD('SFRBOLFEL');location.href='/tester-ma-ligne/eligibility-by-ndi.htm?univers=SFR&marques=ADSL&marques=CBL&marques=THD&hideFooter=true'})}}
ico()
if((v=lse())&&/_RED$/.test(v[1])&&T('espace-client@|@/espace-client/'))_.nr=1
ECR=_.nr&&T('#/(mon-)?espace-client|espace-client-red@')||/red-by-sfr|clientred/.test(cas)
if(T(CR)){
ST('#checkoutNav{width:68%;position:fixed;z-index:49999;top:-8px;right:1%}#checkoutNav .current .label{color:#00e094}'+
'.show-summary{background-image:url('+med+'ecaddy2.png)!;top:0!}')
if(/;RED_3_1Go_PROMO2_/.test(s.products))ST('#eTc2cP{D0}')}
if(T(CR+'recap'))wait(function(o,p){if((o=_('#modifyPnmButton')).T(/Modifier/)){
p=o.P()._('p',0)
if(p.T(/Nouveau numéro de mobile SFR/)){p.H("Vous allez obtenir un nouveau numéro de mobile SFR");o.H("Si vous souhaitez conserver votre numéro de mobile cliquez ici !")}
if(p.T(/Conservation de votre numéro de mobile actuel/))o.H("Si vous souhaitez obtenir un nouveau numéro de mobile cliquez ici.")
return!0}},99)
if(T('@/tester-ma-ligne/')&&W!=top){
ST('head+body{margin-top:0!}header,footer{D0!}')
if(_('#selfinstall')[0])parent[PM]('6','*')
_('.SFR_EligibilityResult a.button').cl(function(){parent[PM]('7','*')})}
if(T('@/tester-ma-ligne/eligibility-resultats.htm')){
o=_('a.button.large');if(v=o.at('href'))o.at('href',v[RE]('http:','https:')[RE]('&selectedPkg=undefined','')).at('target','_top')
if(wm()&&(v=ckR('eTelU')))_('a.button.large[href*=offre-internet]').at('href',v)}
if(!T('@/(tester-ma-ligne|box-mobile|config4p.html)'))ckD('eTelU')
if(ckR('eTbfF')&&T('@/tester-ma-ligne/eligibility-result')&&/M=ADSL.*ATV=false/.test(_.fel('SFR')))_('.SFR_ModalHeader').H(
'<p class="SFR_ModalHeader_leadParagraph">Votre domicile est éligible aux offres Box de SFR,<br>mais votre débit ne vous permet pas de bénéficier de cette promotion</p>')
ckc=function(c,C){if(!_.app&&!_.CC&&!ckR('eTiab2')&&!_stats_zf&&top==W&&!T('[^/]*/(politique-|rgpd/)|authent-services@/cloud')&&!/cloud-[dm]|securite|webapp|\/app\//.test(unescape(cas))){
fpc();evt(53);JS(
_.rs?'*ckcrs2|':
T('[^/]*#')?'*ckcred4|':
'*ckcsfrg|')}}
ckc()
if(_.iab2&&T("sfrpay.(fr|com)"))_('#footer-extra_links').A('<li><a style="cursor:pointer" onclick="_eT.ccP2()">Cookies</a></li>')
if(_.wmPu)wait(function(){if(_.wmPu!=1){
_('.sr-mire-container').cl(function(){W.open(_.wmPi?_.wmPu:"/etag/rebondsa.html#"+_.wmPu[RE](/^.*\?/,''))})
_('.sr-login-search').cl(fsp)
if(v=_.wmPc)IM(v)
_('#block-email>div').A('<br><br><h5>Client Numéricable ou AOL</h5>Plus d’information sur votre messagerie en cliquant '+
'«&nbsp;<a style="display:inline;background:none;padding:0;line-height:1.2" href="https://assistance.sfr.fr/sfrmail-appli/sfrmail/configurer-messagerie-recevoir-email-sfr.html">ici</a>&nbsp;»')
return 1}})
if(T('@/espace-client/avantages-groupe/groupe/affichage/index.html')&&W.Hb)to('Handlebars=Hb',2e3)
ab()
if(o=lse())Z[18]=prf(o[1])
o=_.LL;if(o&&o[0]){v='';for(i=0;o[i];i++)v+=(i?' ':'')+prf(spl(o[i],':')[1]);Z[19]=v}
if(o=W.AMP&&_('[data-stats]').at('data-stats'))for(i in r=['products','eVar38','eVar46','prop38','prop48'])if(v=par(r[i],o))Z[r[i]]=v
if(T('(forumtest|la-communaute)@/t5/forums/searchpage/tab/message'))_stats_sent=1
if(WMN&&ckR('eTagAB')==97){
__tcfapi('getTCData',2,function(d){eP('log','WMTC:'+(d&&d.tcString||'').length+'/'+_.cc)})
_stats_sent=1
ti(function(l){
l=location.hash
if(l!=_.wmS)stats({pn:'Messageries/'+(
/^#agenda/.test(l)?'Agenda':
/^#contacts/.test(l)?'Contacts':'Webmail/'+(
/^#welcome/.test(l)?'Accueil':
/^#write/.test(l)?'Nouveau':
/\bsearch=/.test(l)?'Recherche':
/^#inbox.VF_newsletter/.test(l)?'Infopromos':
/^#inbox.SF_DRAFT/.test(l)?'Brouillons':
/^#inbox.SF_OUTBOX/.test(l)?'Envoyes':
/^#inbox.SF_JUNK/.test(l)?'Indesirables':
/^#inbox.SF_TRASH/.test(l)?'Corbeille':
/^#inbox.UF/.test(l)?'Dossiers':
/^#inbox/.test(l)?'Inbox':
/^#confirmSent/.test(l)?'EmailEnvoye':'Autre'))})
_.wmS=l},444)}
o=_('[data-ab]');if(o[0]&&/^...:[0-9]$/.test(v=o.at('data-ab'))){v=v.split(':');ckW('eTab'+v[0]+'='+v[1],168)}
if(ty(s,'object')&&ty(W.stats)){
v=ckR('ext_ref')
if(v&&v!=Rf){s.referrer=v;ckW('ext_ref=',-1)}
if(W!=top)s.gtfsf=function(w){return this.tfs=w}
if(!(_.ss0=W._stats_sent)&&!eS){_stats_sent=1;stats(_.sA)}}
_.sent=1
if(T('[#@]/mon-espace-client$')&&!ckR('eTarC')&&(o=_.colis)&&o.n&&o.d){
v=(o.d||'').split('/');v=v[0]*1+' '+_.mois(v[1])+' '+v[2]
_.fCol=function(b){W[PM]("1","*");ckW('eTarC=1',1);if(b)$B.A('<iframe style="display:none" src="https://espace-client.sfr.fr/retour-equipement/assigne-equipement"></iframe>')}
_.popin('<style>#eTcolis p{text-align:left;margin:0;padding:18px}#eTcolis b{font-weight:600}#eTcolis button{cursor:pointer;background:#'+(_.nr?'00e094':cR)+';color:#fff;padding:9px;margin:0;border:0}button>b{font-size:14px}</style><div id="eTcolis">'+
'<p style="font-size:18px"><b>Avez vous reçu votre colis&nbsp;?</b></p><p style="background:#eee;height:160px"><b>Nous vous avons envoyé le colis '+o.n+' le '+v+'.</b><br>'+
"Pour nous permettre d'activer votre équipement au plus vite, pouvez-vous nous préciser si vous l'avez reçu&nbsp;?"+
'</p><p style="text-align:center"><button onclick="_eT.fCol()"><b>Non</b><br>Je n\'ai pas le colis</button> &emsp; <button onclick="_eT.fCol(1)"><b>Oui</b><br>J\'ai reçu le colis</button></p>',480,300,0,0,'#fff')
_.pi0=1}
var p38=sP(38)||sE(38),e4=sE(4),e19=sE(19),e24=sE(24),e46=sE(46),e52=sE(52),e62=sE(62),eT=W._eTag||[],
oid=_.cc&1&&(eT.TransactionID||par('orderNumber')||par('order_id')||sP(57))||TH+'-'+r6,
red=p38.match(/red/i)||T('@/.*/forfait-sans-engagement')||par('universe')=='RED',
pn=s.pageName||'',
RBOL='#/(offre-internet/|telephones|forfaits-mobiles|boutique/)',
RM=par('context').match(/change/i)||e46.match(/Changer/),
Eli=e62.match(/.1$/)?'Cable':e62.match(/^1/)?'Fibre':'Adsl',ELI=Eli.toUpperCase()
for(i=0;i<2;i++)red=red||Q[i]&&/(^|-|_)(CS.|LSR)(-|_|$)/.test(Q[i].split(";")[1])
_.brand=red?'RED':'SFR'
if(e4)ckW('eTe4='+e4,168)
if(e52&&W.scDil)scDil.api.aamIdSync({dpid:'1711',dpuuid:e52})
if(T('#/terminer')&&(/^https?:\/\/www\.amazon\.fr\//.test(Rf)||/amazon/i.test(Q[0])))ckW('eTamz=1',1)
if(!T('#/te(rmin|st)er'))ckW('eTamz=',-1)
if(ckR('eTamz')&&T('#/terminer'))ST('#eTrH #eTamz{float:right;margin:6px 14px 0 0}'),SM(768,'#eTrH #eTamz{margin:6px;max-width:80px}#checkoutNav{D0!}'),wait(function(){
return _('#eTrH').A(im+'amazon_frlogo_blanc_750x375.png?w=120" id="eTamz"/>')[0]})
if(_.cbot=!ckR('eTamz')&&!_.app)ST('#eTrF{position:relative!;z-index:40000!}')
o=ckR('eTch')
_.r114=/Change ADSL Vers/.test(e46)&&(T('@/offre-internet/change')||T('@/terminer')&&/^Web.Red.Boutique.Fixe.RED.POST.Fixe.Change.Inter/.test(s.pageName))
_.r214=T('#/boutique/conf')&&par('act')=='CQT'&&par('ptaId')!='CSI'
v=/ee5ffd1ab507664580d413c259164738/.test(ckR('eTmkgR'))||sE(24)==9802909
if(v&&T('#$|#/(offre-internet$|forfaits|telephone)')){v=0;ckD('eTmkgR')}
if(_.r670=T('#/offre-internet/prixtel')&&!_('.notEligible')[0]){if(par('key'))ckW('eTptK='+par('key'),9)}else _.r670=v&&par('prixtel')
if(v)ST('#eTrH>div>a>img{D0!}#eTrH>div>a{max-width:104px!;width:104px!;height:18px;background:url('+med+'REDxPrixtel.svg);background-size:cover}')
if(T(CR+'conf'))eP('log','d=CR:'+ckR('eTptK')+':'+ckR('eTmkgR')[RE](/\|/g,"")+':'+sE(24))
if(v&&T(CR+'conf')&&ckR('eTptK')){eP('ptK','k='+ckR('eTptK'));ckD('eTptK')}
if(_.cbot&&!pu&&!T('#/tester-ma-ligne')&&(
o&&(T('(communaute)?#|espace-client-red@')||T('@/cas/login')&&(/red-by-sfr.fr|-red.sfr.fr/.test(par('service'))||par('theme')=='espaceclientred'))||
(v=_.r114||_.r214||_.nr&&T('@/(espace-client/offres-et-options/parc.htm|offre-internet/changer)')||
T('#$|#/(terminer|offre|forfait|telephone|box|bons-plans|montres-connectees|(mon-)?espace-client)|espace-client-red@|'+
'communaute#(/t5/(Compte-Client-facture/ct-p/mon_espace_client_et_ma_facture|'+
'Je-me-connecte-%C3%A0-mon-Compte/Contacter-un-conseiller-RED/ta-p/296904|'+
'Urgences-d%C3%A9pannage/ct-p/urgences_et_depannage|Offre-options/ct-p/mon_offre_et_mes_options|'+
'Mobile-montre/ct-p/mon_mobile|Box-internet-d%C3%A9codeur-TV/ct-p/ma_box_internet_et_decodeur_tv|Choisir-RED/ct-p/choisir_red))?$')
&&!T('#/espace-client/option')
&&!(T('#/terminer')&&/_CSI_/.test(s.products))
&&!/change/i.test(par('context'))&&!/^Change/.test(e46)))){
_.mos=_.r114||_.r214||_.r670||T('#/terminer')
if(v){
ST((
'@{box-sizing:border-box;z-index:33333;position:fixed;bottom:16px;right:16px;border:0;background:#fff;border-radius:33px;padding:5px 13px 12px;box-shadow:0 0 9px 0 rgba(0,0,0,0.5);white-space:nowrap;width:195px;cursor:pointer}'+
'@>*{margin:0;padding:0;vertical-align:top}@>img{display:inline;width:38px}@>img+img{D0}@>span{display:inline-block;margin:17px 0 0 12px;color:#444;font:15px Montserrat-Regular,Arial}')[RE](/@/g,'#eTc2cP'))
SM(767,'#eTc2cP{width:50px;padding:9px 6px}#eTc2cP>span{D0}#eTc2cP>img{width:32px;margin:-3px 3px}')
$B.A('<span id="eTc2cP">'+(_.mos?'<img style="height:40px;margin-top:6px" src="'+ist+'img/c2c.svg"/>':im+'bot.png"/>')+'<img src="'+ist+'img/c2c.svg"/><span>Besoin d\'aide ?</span></span>')}
if(o)_.chat()
_('#eTc2cP').cl(function(){
$op(this);if(_.r670)_.c2cRed('62b4355362633152c4000000');else if(_.mos)c2c();else
JS('//www.sfr.fr/eTagP/chat.jsp?k=54d1cc0e6803faef0a8b4567',function(v){if((v=_.dispo)&&(v=v.capacity)&&v.chatbots)_.chat();else c2c()})})}
if(T('@/(accessoires|box-8|box-console/playstation-5)$|recyclage-mobile@'))c2c()
if($&&T('#($|/offres?-int)')&&/[HNtx]/.test(e19))ST('#eTc2cP{D0!}')
_.cpid=ckR('s_cmDet').split('|').pop().split(':')[1]||''
if(!ckR('ISTCMS')&&!ckR('eTaI0')&&!T('(communaute|lithium)#|boweb.private.sfr.com'))to(function(v,i,c){
v=_.aImg=location.protocol=='https:'?'[style*="url(http:"],link[rel=stylesheet][href^="http:"],img[src^="http:"],script[src^="http:"],img[data-crop^="http:"]':''
i=v?_(v).length:0
c=0;if(!cms){
_(_.cImg='[style*="cms."],link[rel=stylesheet][href*="cms."],[src*="cms."]').E(function(o){
if(v=_(o).at('src'))c+=/^(https?)?\/\/([^\/]*\.)?cms\./.test(v)?1:0;else c++})}
_('style').E(function(o,h){h=o.innerText;if(/url\(['"]?http:/.test(h))i++;if(!cms&&/(\/\/|[.])cms[.]/.test(h))c++})
if(c+i)JS('//cms.sfr.fr/stats/aImg.js?'+i+'-'+c)},2e3)
if(T("@/box-internet")&&/[?&#]ndi[=?&#]/.test(l.href)&&!par('ndi'))to(_.elg)
if(T('@/((offre|box)-internet|la-box-tres-haut-debit|mon-espace-client/try-and-buy.html|pro(/|$))')&&W==top&&!T('@/(offre-internet/changer-|box-internet/startersrp.html)'))c2c(6)
if(!_.nr&&!pn.match(/Epropal/)&&!MKG[2].match(/TECHDATA|showroom/)&&!ckR('s_cmDet').match(/t9_(red_groupon_td|showroompriveRED122014)/)){
if(RM){if(T('@/forfait-mobile/offres/forfait-mobile$'))c2c(4)}
else if(T('@/telephonie-mobile/rm-fidelite'))c2c(0)
else if(T('@/telephonie-mobile/faq/portabilite.html'))c2c(44)
else if(T(CS+'|@/(shopping-hiver|tablette-cle-internet|(box|forfait|telephonie)-mobile|contenus)')&&!T(CS+'confirmationV2'))c2c(2)}
if(T('@/offresrpsfr.html'))c2c(14)
if(T(CO+'conf')){
if(!pu)ERR("CO/"+s.events+"/"+s.products)
v='//www.sfr.fr/eTagP/chatP.jsp?P='+(s.products||'')+'&p='
if(i=ckR('eTchP'))JS(v+i)
if(i=ckR('eTchSP'))JS(v+i)}
if(T("@/guide/"))_('#wb_container a').E(function(o,h){h=o.at('href');if(!/\//.test(h)||/\/guide\//.test(h))o.at('href',h[LC]())})
_.noArrow=function(){
if(M("@(/sfr-et-moi.html)?$")&&W.affPopin)affPopin()}
if(ckR('eTagPI'))ckW('eTagPI=1',.5); else if(ckR('eTagEC')||M("@/sfr-et-moi.html$")&&!e4)_.noArrow()
if(_.noP||W._stats_zf||l.pathname.match(/^\/adsite-under/))return
var EU=[
'@/offre-internet/.*/personnalisez-votre-box.htm~1',
CO+'|@/tablette-cle-internet/recap/p$|accessoires@/shopping_cart.php$|boutique.home@/commande~2',
RBOL+'~9','leadco@~9','.*'],
euR=ECR||T('[^/]*#'),
euS=!euR&&(_.rs||T("[^/]*@"))&&!T('(sso-client)?@/cas/|[^/]*home@'),
fE=function(){if(!_.ss0)SC(EU,_.elr)}
if(!_.app&&!/\b(..)?script\b/i.test(_.loc)&&!_.SS&&(euR||euS)&&!/^https:\/\/[^\/]*cms\.(red-by-)?sfr\.fr/.test(Rf)){_.elr=function(V){
var d=_.rs?'ert5.rmcsport.tv':euR?'nrg.red-by-sfr.fr':(par('elrD')[RE](/[^a-z]/g,'')||'netc')+'.sfr.fr',c=TS/36e5|0,j='',a=(D.location.host+d)[RE](/[^a-z]/g,''),A=(a+a.toUpperCase()).split(''),i,v=V[0],i,ch=/^Changer|^SC:ADSL:CHANGE/i.test(e46),S37=(s.eVar37||'').split('/'),
da=_.df?new Date(1*_.df):0,mo=da&&da.getMonth()+1,jo=da&&da.getDate(),o,e38=M('@/box-internet|^box@')?'Fixe_Box-SFR':sP(38)||sE(38),E=[],
f=function(c,s){E[c]=''+s},g=function(c){return E[c]||''},F=function(c,s){E[c+'~'+En++]=s},G=function(c,R,e,r){R=[];r=new RegExp('^'+c+'(~[0-9]+)?$');for(e in E)if(r.test(e))R.push(E[e]);return R},n,En=0,P,ott=T('espace-client@/services-web/')
if(v==9&&!W.AMP)return 1
if(euR){
var de,of,om,pr,nb=0,mo=0,p=ckR('eTe19')
e46=e46||sE(46)
if(/[MI]/.test(e19)&&p!=e19)ckT('eTe19',p=e19,129600)
P=function(v,t){if(v){F('prdref',v[1]);F('prdamount',v[3]);F('prdquantity',v[2]);F('prdparam-type',t)}}
if(Q){
for(var i=0;i<Q.length;i++){
var R=Q[i].split(';'),m=1*R[3],n=1*R[2],v=R[1]||''
if(!/^(PR|FICT)/.test(v)){
n=n>0?n:m>0?1:0;nb+=n;mo+=m*n
if(!/^[0-9]{13,18}$|^cqt-|^(sl_)?red[23]?_/i.test(v))pr=(pr?pr+',':'')+R[1]
if(!de&&/^[0-9]{13,18}$/.test(v)&&v*1!=554264)de=R
if(!of&&/^cqt-/i.test(v))of=R
if(!om&&/^(sl_)?red[23]?_/i.test(v))om=R}}}
f('path',v=location.host+location.pathname)
if(v=_.fel('RED','M'))f('eligibilite',/THD/.test(v)?'fibre':/CBL/.test(v)?'cable':/CBL/.test(v)?'adsl':'autre')
f('client_only',p?1:0)
f('client_mobile',/M/.test(p)?1:0)
f('client_fixe',/I/.test(p)?1:0)
f('client_red',v=/[JKHNtx]/.test(p)?1:0)
f('client_autre',v?0:1)
if(v=ckR('eTshrR'))f('from','redbysfr-showroomprive'),f('idsrp',v)
f('uid',e52||'')
f('service',sP(1))
f('sousservice',v=sP(2))
f('pagegroup',v)
f('typeachat',e46)
ckD('eTrOt')
if(par('eTrt')&&/[JKHNtx]/.test(e19)&&ckR('eTrP')!=(v=/[JK]/.test(e19)?1:2)){
ckT('eTrP',v,9e4)
JS('//bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&ActivityID='+(1124862+v))}
if(v=ckR('eTrP'))f('offer_type',v<2?'mobile':'fixe')
if(T(CR+'|#/forfaits-mobiles|#/boutique/config')&&(v=Q.find(function(e){return /[_;]RE1[_;]/.test(e)}))){
om=[0,0,1,v.split(';')[3]];v=Q.join('').match(/[_;](R..A)[_;]/)
om[1]='RED_3_ONE_RE1_ABO_0_ECO'+(v?'_'+v[1]:'')+(/[_;]RF03[_;]/.test(Q)?'_RF03':'')}
if(T(CR+'(recap|conf)|#/boutique/config')){
v=/^Ouvrir/.test(e46)
if(pu){
f('ref',oid)
f('amount',1*mo||1)
f('type',v&&de&&om?'mobile_device':v&&of&&om?'4p':v&&of?'fixe':v&&om?'mobile':de?'device'+(!v&&/RM$/.test(e46)?'_RM':''):'autre')}
else if(v){f('scart',1);f('scartcumul',0)}
if(v||de)P(de,'device mobile')
if(v){P(of,'offre fixe');P(om,'offre mobile');f('options',pr)}}}
if(euS){
P=prod(Q),pr=P[3],of=P[4]
if(pu){
v=3
f('amount',1*P[2]||ckR('eTam')||1)
f('duree_engagement','')
f('montant_mensualite','')
f('currency','EUR')}
if(v==8){
f('estimate',1)
f('ref',TS)
f('msisdn',V[1])}
f('path','/'+(v==7?V[1]:s.pageName))
f('device',dev())
f('rubrique',s.prop21)
if(pu){
f('payment',s.prop52)
f('profile',ch?'rebuyer':'buyer')
f('ref',oid)}
if(v==8)f('type','click2call')
f('asc',e4)
f('uid',e52||'')
if(v==6)f('euid-datacatch-email',V[1])
if(pu)f('newcustomer',ch?0:1)
if(ott)for(i in Q){pr=of=0;o=Q[i].split(';');F('prdref',o[1]);F('prdname',o[1]);F('prdamount',o[3]);F('prdquantity',o[2])}
if(pr){
f('prdref',pr[1]>0?("00000000000000000"+pr[1]).slice(-18):pr[1])
f('prdname',T('@/forfait-mobile/telephone/')&&h.split('/')[3])
if(v>0){
if(i=pr[3])ckW('eTam='+i,1)
f('prdamount',i)
f('prdquantity',pr[2])}
f('prdparam-marque','')
f('reference_telephone','')}
if(of&&v!=2){
o=of[1].match(/(-|_|^)(CS[HIOT]|D[A-Z][EM]|F(6[0-9A-Z]|99|MV|T0)|H(0[01]|68|7[0-9A-Z]|T0)|I([0-9M][0-9A-Z]|NT|T0)|P[67T]0|Q(10|[3-9][EM]|SE|ZN)|S[BCD][0-9A-Z]|LSR|MS[EI])(-|_|$)/)
o=M('box@')?of[1]:o?o[2]:'XXX'
f('prdref',o)
f('prdgroup',o)
f('prdname',of[1])
if(v>0){
f('prdamount',of[3])
f('prdquantity',of[2])}}
if(v==2){
for(i=2;i<Q.length&&(P=Q[i].split(';'));i++)if(P[1].match(/^[0-9]{18}$/)){
f('prdref',P[1])
f('prdname','')
f('prdamount',P[3])
f('prdquantity',P[2])}}
f('pageprecedente',s.prop41)
f('clientauthentifie',sE(10))
f('CSUid',e52)
f('profildetaille',sE(19))
f('pta',_.pta)
f('dfpc',da?''+da.getFullYear()+(mo>9?'':'0')+mo+(jo>9?'':'0')+jo:'')
f('clientmultipack','')
f('segmentjoya',_.sj)
o=(T('box@/bolchange')&&(s.prop53||'').match(/:XDSL Vers ([^:]*)$/)||'')[1]
f('typedachat',o?'Bol : Change DSL Vers '+(o=='CBL'?'Cable':o=='THD'?'Fibre':o):e46)
f('BU',e38)
f('eligibilitefibre',sE(62))
f('eligibiliteADSL',sE(61))
if(pu)f('codepromo',sE(42))
if(T('@/(box-internet|telephonie-mobile|etag/conv)|^box@'))f('idpartenaire',e24)
f('idpanier',sE(15))
if(S37.length>1){
f('optin',S37[0])
f('email',S37[1])
f('typeparcours',S37[2])
f('Numtel',S37[4])
f('authent',S37[5])
f('civi',S37[7])
f('Nom',S37[8])
f('Prenom',S37[9])}
r=0;try{r=eaQ(f,g,s,F,G)}catch(e){};if(!r)return 0}
EA_data=[]
ckD('eTelrCC')
for(o in E)if(!ty(v=E[o])){EA_data.push(o[RE](/~[0-9]+$/,''));EA_data.push((''+v||'')[LC]()[RE](/ /g,'_')[RE](/[^.a-z0-9@_\/]/g,'-'))}
_.fEc=f=function(f,C,o,h,b){if(f=W.EA_epmGet){
for(o in C=f()){h=C[o].hdr;if(b=h=='statistique'?1:h=='personnalisation'?2:h=='advertising'?4:0)C[o].allowed=!!(_.cc&b),C[o].denied=!(_.cc&b)}
EA_epmSet(C);EA_epmEnd();ckW('eTelrCC=1',2)}}
if(_.cc)EA_data.push('onload'),EA_data.push(f)
if(f=W.EA_collector)f(EA_data)
else{
for(i=-1;i<c%7;i++)j+=A[(c+i)%A.length]
JS('//'+d+'/'+j+(c%8760)+'.js')}
return 1}
if(euR)to(fE)
if(euS){
if(par('elr')>1)eP('pv','p='+e24,fE,1);else JS(ist+'stats/elr.js',fE)}}
if(WMN)with(_){
_.NA=par('eTna')
if(NA){_.$sf=function(){return[W.screen,W.screenX,W.screenY]}}
ST((cc==7?'#eTmeteo{text-align:center;border:0!;background:#0000!}#eTmeteo>iframe{max-width:100%;width:304px!;height:171px!;min-height:unset!;overflow:hidden!}':
'#eTmeteo{D0!}.editorial{margin-left:0!}')+
'.editorial{text-align:center}')
SM(-768,'.editorial{min-width:630px!}')
ckW('eTwm='+(ckR('eTwm')*1+1),720)
if(!_('#eThS')[0])JS(ist+'resources/js/'+(par('srr')?'srr':'wmn21')+'.js')
ST('#SFReTagArrow{display:block!}#SFReTagArrow::after{display:table;content:" ";clear:both}div#menu{overflow:hidden auto}#SFReTagLeftMail{margin:0!;top:0!;width:100%}')
_.pub=function(i,f,g,n,x,y,o,I,F,H){
if(_.cc==='')return to(function(){pub(i,f,g,n)},777)
_('#main>#TB').R()
if(g&&W.innerWidth>1399)f=g
x=f%8==1?300:f==g?160:120,y=600,F=[0,0,0,13,0,14,0,15,0,0,0,16,0]
if(W.innerWidth>1599&&F[f]){f=F[f];x=300;SM(-1600,'.ad-banner.extra-banner{width:300px!}#wrapper{right:300px!}')}
if(!(o=_('#SFReTag'+i)[0])||!o.offsetParent)return n>5||to(function(){pub(i,f,g,(n|0)+1)})
if(f==4&&_.nAd&&_.nAf)_.nAf({data:_.nAd})
if(f==4&&!_.nAf)msg(_.nAf=function(e,i,I){if(/^nAd\|/.test(e=e.data)){
var a='Annonces',b='<br/>',o=_('#SFReTagNativeMail')[0],
f=function(T,L){return'<span style="display:inline-block;font-family:sfr'+(L?'light':'bold')+'">'+T+'</span>'}
_.nAd=e;to(function(){_.nAd=0},3e5)
A=e.substr(4).split('|')
if(o&&A[8]+A[9]){
if(I=A[9]){A.pop();o.OC=I}
for(i in I=A[8].split(','))if(/^(https:)?[/][/]/.test(I[i]))_(o).A('<img src="'+I[i]+'" style="display:none"/>')
A.pop();_.nAd='nAd|'+A.join('|')}
if(/^[a-f0_9]+$/i.test(i=A[4]))A[4]='#'+i
_(o)._('td').R()
_(o).C('new').S('cursor','pointer').S('background',A[4]||'#f7ecec').cl(function(c,i,I,u){
if(c=this.OC)for(i in I=c.split(',')){
u=I[i][RE](/^\s+|\s+$/,'');if(/^(https:)?[/][/]/.test(u))_(o).A('<img src="'+u+'" style="display:none"/>')}
W.open(A[2])}).A(
'<td colspan="2"><img style="display:block;max-width:50px" src="'+A[7]+'"/></td><td style="color:#1433d6">'+f(A[5]||a)+(A[5]?b+f(a,1):'')+
'</td><td/><td/><td/><td colspan="3">'+f(A[0])+b+f(A[1],1)+'</td>')}})
if(!_(o)._(v='iframe')[0]&&!(f==4&&_(o)._('td')[0]))_(o).H('<iframe/>')
I=_(o)._(v).S('width',px(x,1)).S('height',px(y,1)).S('border',0),f==4&&I.af()
if(!(f==4&&I.at('src'))){
if(H=W.Hubvisor)H('sfr:refresh')
I.at('src',dj+"pubwm.html?z&f="+f+(NA?'&T=1':''))}}
_.pubT=function(){wait(function(o){
o=_('#SFReTagSent.center-ad-banner')
o.af(1).H('<iframe style="width:100%;height:'+(wm()?par('eTob')?2500:620:500)+'px" src="'+dj+'pubob.html"/>',2)
return o[0]})}
_.wmi='web_mess_info_v2'
_.wmD=['','wmbgv2','wmbcv2']
_.wmB=[]
_.wmA=function(i,b,d,n,o,v,a){
if(!(o=_('#SFReTag'+i))[0])return n>5||to(function(){wmA(i,b,d,(n|0)+1)})
if(v=wmB[b])o.H(v)
else{
o.H('')
_.sT(b!=wmi?'Webmail Bloc central V2':'Webmail Bloc Gauche V2',b!=wmi?'bandeauSFRv2':'wmGauchev2','#mail #SFReTag'+i,par('eTsT'))
wait(function(v){if(v=o.H()){wmB[b]=v;to(function(){wmB[b]=0},9e5)}return v},333)}}
_.logWM=function(i,r){r=i+':';_('[id^=SFR]').E(function(o){r+=' '+_(o).at('id')});log(r)}
_.wmrHP=function(o,v){logWM('Ref HP');pub('Right',1);wmA('Arrow','web_mess_pad_v2','wmbcv2');if(cc==7)_('#eTmeteo').H('<iframe src="'+dj+'meteo.73.html"></iframe>')}
_.wmrDM=function(){logWM('Ref DM');pub('SkyMail',2,3);wmA('LeftMail',wmi,'wmbgv2');pub('NativeMail',4)}
_.wmrAG=function(){logWM('Ref AG');pub('SkyAgenda',5,6);wmA('LeftAgenda',wmi,'wmbgv2')}
_.wmrCO=function(){logWM('Ref CO');pub('SkyContact',7,8);wmA('LeftContact',wmi,'wmbgv2')}
_.wmrMS=function(){logWM('Ref MS');pub('Sent',9);pubT()}
_.wmrPA=function(){logWM('Ref PA');pub('SkyParam',10,11);wmA('LeftParam',wmi,'wmbgv2')}
_.wmrNM=function(n){logWM('Ref NM');ckW('sfrUserUnreadMessages='+1*n,1)}
}
if(ckR('cobrow_token'))JS('//cobrowsing.sfr.fr/lib/loader.js')
if(ECR||T('communaute#|#/contact')||T('#')&&ckR('eTch'))dimelo(0)
if(!_.app&&(v=ckR('eTs33'))<3&&T('#/(offres?-internet|bons-plans|forfaits-mobiles|telephones|terminer-|options-red|suivi-de-commande|boutique/configuration|info-clients|mobile/ma-commande)|communaute#(/t5/Forums/ct-p/Forums)?')&&(_.cc==7)){
if(e4)ckW('eTs33='+(W.cltRED_1=v*1+1),9e3)
JS('//hubtr.adlp-factory.com/tag-redbysfr')}
if(T('#/tester-ma-ligne/eligibility-resultats.htm')){
o=_('.ustep-two .mon-sb');if(v=o.nextElementSibling)_(v).R();o.R()
$hR('.m-auto',/Bénéficiez de.*sur votre forfait mobile/,'')}
if(T('@/tester-ma-ligne/eligibility-resultats.htm')&&/^Changer/.test(sE(46))&&/RED/.test(sP(38))){
_('.ustep-two>h3').R()
_('.ustep-two>div',0).H('<div style="margin-top:50px" class="ft-26 mon-b">'+_('.ft-26:',0)[RE](/[4-9][0-9]{2} M|[0-9]+ G/,'400 M')+
'</div><div class="mon-sb mt-14"><u>Attention</u></div>le changement d’offre entrainera la perte de l’avantage Multi-RED sur votre Forfait Mobile')}
if($&&wm(992)){
if(T('@/sfr-et-moi/vos-services-sfr/sfr-cloud$')||/cloud/.test(cas)&&!/sfrcloud-mobile|\/app\//.test(unescape(cas)))JS('*smartbannercloud|')
if(!ckR('eTsb')&&T('#/mon-espace-client$')){ckW('eTsb=1',72);JS('*smartbannerred|')}
if(!_.nr&&/\.sfr\.fr%2Faccueil/.test(cas))JS('*smartbannersfr|')}
if(T('assistance@/mobile-et-tablette/reseau-sfr/couverture-reseau-sfr.html'))_.msg(function(e,d){if((e||event).data=="ELIG")location='https://www.sfr.fr/offre-internet'})
if(_.cc==7&&T('assistance@'))IM('https://www.facebook.com/tr?id=1680640282189489&ev=PageView&noscript=1')
if(WMN){
JS('//cdn.hubvisor.io/wrapper/01BYK28ENND8X5G8K0AJ2DPK4E/hubvisor-parent.js')
_.msg(function(d){
d=(''+d.data||'').split(':')
if(d[1]=='HAB')$B.at('id','eTpH')
if(d[0]=='H')_('[data-pub='+d[1]+']>iframe').S('height',px(d[2]))})}
if(_.nr&&T('espace-client(-red)?@/novelli/resiliation/accueilResiliation'))
_('#motif').af().A('<span id="motif"><br>Avant de résilier, parlez à un conseiller pour découvrir les<br>offres exceptionnelles que nous vous avons réservées :'+
'<br><a href="#" onclick="_eT.c2cRed(\'5764207c7fdf1afb6b8b4567\')" style="color:#004c9e;font-size:12px" class="mediumLink">cliquer ici</a></span>',2)
if(_.nr&&T('espace-client@/suivi-incidents'))$hR('#scMainContent',/recontacter au 1023/g,'contacter <a href="https://www.red-by-sfr.fr/contact/?nav=RBOX-F-2-4-3/">par chat</a>')
if(T('appel@/webcallback_form')&&par('num'))to(function(v){
v=par('num'),_('.gred-textfield__input').E(function(o,i){o.value=v.substr(i+i,2)}),_('#call-btn').cl()})
if(_.cc==7&&T('appel.sfrbusiness.fr/webcallback_form')&&(_.sbR=Rf.match(/https?:\/\/[^\/]*sfrbusiness(team)?\.fr(.*)/))){
_.S0=stats;stats=function(o){
if(/Mise En Relation/.test(W._stats_pagename)){
JS('//bs.serving-sys.com/Serving/ActivityServer.bs?cn=as&ActivityID=1162308&rnd='+r6+'&page_name='+escape(Rf))
JS('//nxtck.com/act.php?tag=46320&id='+r6+'&mt=1&tvalid=0&s1=rappel')
dataLayer=[{'gtm.start':TS,event:'gtm.js'}]
JS('//www.googletagmanager.com/gtm.js?id=GTM-N7JS87')
parent[PM]('eTc2c','*')}
_.S0(o)}}
if((v=par('eTpc'))>1)ckD('eTpcI')
if(v=!_.pi0&&!_.CC&&W==top&&T('[@#]/(mon-)?espace-client|espace-client(-red)?@')&&!T('@/mon-espace-client/try-and-buy')&&lse()){
o=function(l,d){d=ckR('eTpcI').match(new RegExp("\\b"+l+":([^/]+)/"));return!d||TH>d[1]}
if(o(0)&&o(v[0])){
_.piC=function(D,c,q,t,r){
if(c=D.content){
q=_.pcQ
function B(t){return(t||'')[RE](/\n/g,"<br>")}
_.popin(c[RE](/\[T]/,B(q.title))[RE](/\[P]/,
B(q.header)[RE](/(liste de nos partenaires)/,'<a href="https://www.sfr.fr/partenaires-smartphone-tv.html">$1</a>')[RE](/(politique de confidentialité)/,'<a href="https://www.'+
(T("#|espace-client-red@")?'red-by-sfr.fr/rgpd/red-by-sfr-':'sfr.fr/')+'politique-de-protection-des-donnees-personnelles.html">$1</a>')),640,480,0,-1)
var C='className',P=_('#eTpc')._,uA=function(){
var o=P('li>span'),r=o[1][C],c,i=1,f=1
while(c=o[i++]){if(c[C]=='N')f=0}
P('button[A=V]').C('D',f)
i=2;while(c=o[i++]){if(r!=c[C]){r='N';break}}o[0][C]=r}
t='';q.Q.forEach(function(C){
t+='<li>'+B(C.Q1)+'<span C="'+C.T+'" class="'+(C.X?'N':C.V?'A':'R')+'"></span><div>'+B(C.Q2)+'<p>'+B(C.about)+'</p></div></li>'})
P('ul').A(t);uA()
if(t=lse()){
r=/_RED/.test(t[1])
P('h3>span').H("LIGNE "+(r?"RED":"SFR")+" "+(/^0[0-9]{9}$/.test(t[0])?t[0][RE](/([0-9][0-9])/g,"$1\&nbsp;"):t[0]))}
P('li+li').cl(function(){_(this).C('A',2)})
P('li>span').cl(function(e,o){
fsp(e)
o=this
o[C]=o[C]=='A'||o[C]=='N'&&e.layerX<30?'R':'A'
if(!_(o).at('C')){o=P('li>span');i=1;while(o[i])o[i++][C]=o[0][C]}
uA()})
P('button').cl(function(){
var a=_(this).at('A'),b=a=='P'
if(b||a=='E'){P('div',0).af(b?0:1);P('div',1).af(b?1:0)}
else if(/^[RAV]$/.test(a)){
b='';q.Q.forEach(function(C,o){o=P('span[C='+C.T+']');b+=','+C.T+':'+(a=='R'?0:a=='A'?1:o.C('R',3)?0:o.C('A',3)?1:9)})
if(a!='V'||!P('button.D')[0]){fpc(q.N);JS(_.eCl1+b[RE](/^,/,'/'))}}
else _('#eTpi').R()})
}
else if(D.Q){
D.N=lse()[0]
if(D.Q[0]){
_.pcQ=D
JS("*econsent|piC"+(T('#|espace-client-red@')?'&R':''))}
else fpc(D.N)}}
JS(_.eCl1=(cms?'//cms.':'//www.')+(T('#')?'red-by-':'')+'sfr.fr/eTagP/eCliL.jsp?'+v[6]+'/'+v[7])}}
if(T('[#@]/(mon-)?espace-client|espace-client(-red)?@')||hS&&T('(espace-client|assistance|tv)?@'))wait(function(C,E,g,H,CN,l,N,nn,R,B,i){H=_(hS?'#eThS':'#eTtH,#eTrH',0);if(r=H[0]&&_.LL){
CN=H._(i=H._(i='#eThT>.EC>.NO')[0]?i:hS?'#eThS>.E>.N':'#N>div');if(!CN[0])CN=H._(i='ul.NO')
U='https://'+(cms?cms===1?'www-cms1':'cms':'espace-client')+_.IPP+'.sfr.fr/espace-client-mid/notification/1.0/?platform=portail&callback=_eT.fCN'
R=/@/.test(ckR('eTcnDR'))
ST(('#eTtH @{padding:0}@>div{position:relative;cursor:pointer;border-bottom:1px solid #ccc;padding:8px 8px 8px 48px!;background:#eee}'+
'@>.G{background:#fff}@>div>*{display:block;padding:6px 0;font-size:14px;color:#000}@>.G>b{font:600 14px Arial}'+
'@>div>span{color:#999}@>div>img{position:absolute;top:8px;left:8px;width:32px;margin:0}@>div>div{float:right;height:16px;width:14px;background:url('+med+'puits_corbeille_sfr_red.png);background-size:cover;margin:7px;cursor:pointer}'+
'@>div>div:hover{opacity:0.5}@>div>.I{display:inline-block;margin:2px 0;padding:2px 9px;background:#181818;color:#fff;font:600 11px Arial}'+
'@>div>i{position:absolute;top:0;left:0;width:3px;height:100%}@>.S.G>i{background:#'+cR+'}@>.R.G>i,@>.R>.I{background:#00e094}')[RE](/@/g,i))
E=[];B=[]
for(i=0;l=_.LL[i];i++){
l=l&&l.split(':')
if(l&&l[0]){E[l[0]]=l[2];B[l[0]]=/RED/.test(l[1])}}
_.aCN=function(n,v,l,f){
v=n<0?'@':N[n].id
if(!v)return
if(v&&n>-1)_.fCNr(0,v)
if(n<0&&!R)ckT('eTcnDR',v,13e4)
_('#CN'+n).C('G',1)
l=n<0?'https://'+(_.nr?'communaute.red-by-sfr.fr/t5/Je-me-connecte-%C3%A0-mon-Espace/Utiliser-mon-centre-de-notifications/ta-p/302325':'assistance.sfr.fr/gestion-client/offre-contrat/centre-de-notifications-sfr.html?L=-1'):
X&&!N[n].numeroLigne?'https://espace-client'+(_.nr?'-red':'')+'.sfr.fr/suivre-ma-commande/rechercheCommande/'+N[n].idCommande:N[n].event.actionWeb
l=l[RE](/^www/,'https://www')+'#sfrclicid=EC_notif'
l=/\?/.test(l)?l[RE](/\?/,'?L='+n+'&'):l[RE](/#/,'?L='+n+'#')
f=function(){location=l}
if(v=n>-1&&E[N[n].numeroLigne])_.ckT('MLS',escape(v),99,f);else to(f)}
_.fCN=function(D,Ns,i,j,ok,d,nN,nj,L,n,nL,s,h,t,p,l){
if(D){
if(d=D.notifications)D=d
log(D)
for(j=0,Ns=[];j<D.length;j++)Ns=Ns.concat(D[j].notifications)
Ns.sort(function(a,b,c){c=a.timestamp-b.timestamp;return c>0?-1:c<0?1:0})
log(Ns)
s='';nN=N.length
for(j=0;j<Ns.length;j++){
L=Ns[j];
nL=L.numeroLigne||L.idCommande
N[nj=nN+j]=L
h=L.timestamp
h=(TS-h)/36e5|0
t=h<24?(h||"moins d'une")+' heure'+(h>1?'s':''):h<720?(h/24|0)+' jour'+(h>47?'s':''):(h/720|0)+' mois'
p=L.event.category.picto;p=p?'<img src="'+p[RE]('http:','')[RE](h='_sfr',B[nL]?'_red':h)+'"/>':''
s+='<div id="CN'+nj+'" onclick="_eT.aCN('+nj+')" class="'+(B[nL]?'R':'S')+(L.read?'':' G')+'"><i></i><div onclick="_eT.fCNm(0,'+nj+')"></div><b>'+
(nL==L.idCommande?'Commande N°'+nL:fNo(nL))+'</b>'+p+(L.event.important?'<p class="I">IMPORTANT</p>':'')+
'<p>'+L.event.objectTitle+'</p><span>Il y a '+t+'</span></div>'}
CN.A(s)
_.fCNd()}
else JS(U)}
_.fCNc=function(D,n,s,B){if(D){
_.CN=1
log(D);n=nn+D.totalCount
if(n&&(B=H._('label.EC'))[0])B.at('data-n',n)
if(n&&hS){H._('.hE i').R();H._('.hE label').A('<i>'+n+'</i>')}else
if(n)H._('.iE sup').H(n)
B=H._(hS?'.CN':'.AE span label',0)
s=n>1?'s':''
if(B[0])B.H(n+' nouvelle'+s+' notification'+s)
if(!B[0])B=H._('#R>a[data-id=N]').H((n?'<b>'+n+'</b>':'')+'<i/>').af(2)
B.cl(function(){if(C!=TS){
_.fCN()
ckT('eTcnD',C=TS,13e4)
s.linkTrackVars='prop32,prop73';s.prop32=(_.nr?"RED":"SFR")+'|'+H._('#N>div').length;s_tl(this,'o','Mon compte/Notif Client')}})
}else JS(U[RE]('/?','/count?')+'c')}
_.fCNd=function(D){if(D){log(D)}else JS(U[RE]('/?','/clear?')+'d')}
_.fCNr=function(D,i){if(D){log(D)}else JS(U[RE]('/?','/read/'+i+'?')+'r')}
_.fCNm=function(D,i){if(D){log(D)}else if(N[i])_('#CN'+i).R(),JS(U[RE]('/?','/mask/'+N[i].id+'?')+'m'),N[i].id=0}
C=ckR('eTcnD')
nn=C?0:1
CN.H('<div id="CN-1" onclick="_eT.aCN(-1)"'+(R?'':' class="G"')+'><img src="'+med+'puits_actu_'+(_.nr?'red':'sfr')+'.png"/><b>Bienvenue dans votre centre de notifications&nbsp;!</b><p>Vous trouverez ici toutes vos alertes et informations liées à vos lignes mobiles et box.</p></div>')
N=[];_.fCNc()}return r})
if(T('#/terminer')&&/_SRP_/.test(s.products.split(';')[1]))ST('#eTrH{background:url('+med+'rdc_red.png?h=45) no-repeat 99% 9px!}'),SM(767,'#eTrH{background-position-y:2px!}#checkoutNav{D0!}')
if(T('[@#]'))_.msg(function(e,d){d=(e||event).data;if(/C2CS/.test(d))_.c2cP(d.split('"')[3]);if(/C2CR/.test(d))c2cR(d.split('"')[3])})
if((v=escape(par('eTgo')))&&(o=_(v))[0])W.scrollTo(0,W.scrollY+o.getBoundingClientRect().top)
if(T('appel@')&&(v=par('CAMPAIGN_ID'))&&(v=v=='5a858a957fdf1a5e038b4567'?'c2c-xs':v=='5d75f7247fdf1ab23a8b4567'?'c2c_tlv_2':0)){
ST('body{max-width:381px;padding:30px 9px 0 170px;background:url('+med+v+'.jpg) no-repeat}')
SM(480,'body{min-width:288px;padding:30px 5% 0;background-size:720px;background-position:-240px}')
if($)$hR('#auth-div>span',/ne pour/,'ne<br>pour')
if($&&(v=_.Prenom))$hR('.popin-title',/^P/,'<b>Bonjour '+v+',</b><br/>p')}
if(_.XSD){
i='innerHTML'
o=D[GI]('authMessage');if(o)o[i]=o[i][RE](/<br>/,' ')[RE]('(e)',/F|MME|MLLE/i.test(_.civilite)?'e':'')
o=D[GI]('popin-title');v=_.Prenom;if(o)o[i]=o[i][RE](/Bonjour[^,]*/,'Bonjour'+(v?' '+v:''))[RE](/ !/g,'&nbsp;!')
wait(function(o,f){
o=D[GI]('auth-div-schedul')
if(o&&o.style.display!='none')ST('#auth-div-schedul{position:relative;top:-80px}#telInputs{margin:40px 0 -30px}#auth-div-schedul .date{padding:3px;width:99px;background:#fff}'),f=5
else f=(f||0)+1
return f>4},500)}
if(par('eTckS')){
C=(D.cookie||'').split('; ').sort();v='<tr style="background:#ccc"><th>Cookie<th>Type<th>Description<th>Taille<th>Valeur'
for(i=0;i<C.length;i++)if(o=C[i].split('=')){
o[2]='?';o[3]=''
if(/^eT/.test(o[0]))o[2]='F',o[3]='eTag'
if(/^s_/.test(o[0]))o[2]='S',o[3]='Omniture'
if(/^__utm|^_ga/.test(o[0]))o[2]='S',o[3]='Google'
if(/^JSESS/.test(o[0]))o[2]='F',o[3]='Session'
v+='<tr><th>'+o[0]+'<th>'+o[2]+'<td>'+o[3]+'<td>'+o[1].length+'<td>'+o[1]}
ST('#eTpiF{overflow:auto}#eTpiF tr>*{padding:4px;text-align:left;border:1px solid #ccc}#eTpiF td{max-width:500px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}')
_.popin('<table>'+v+'</table>',800,600,0,0,'#fff')}
_.ccP2=function(d,v,b){
b=wm();if(v=d&&d.content)_.popin(v,b?768:'85%','calc(100vh - '+(b?96:128)+'px)',b?32:64)
else JS(dj+'gdpr2|ccP2'+'&a'+(d>0?'&V':'')+(T('[^/]*#')?'&R':T('rmcsport.tv')?'&S':T('sfrpay.fr')?'&P':T('sfrpay.com')?'&C':''))}
_.ccP=_.iab2?_.ccP2:function(d,v){
if(v=d&&d.content)_.popin(v,wm()?800:'85%',900)
else JS('*ckcgpdr|ccP'+(T('alticefrance.com')?'&A':T('[^/]*#')?'&R':T('rmcsport.tv')?'&S':''))}
if(T('[@#]/(offre-internet|forfaits?-mobiles?|box-mobile|telephones)(/|$)')&&(o=lse())&&(o[8]=='EX7'||o[8]=='QH0'))_.popin(
"<style>#EX7{background:#fff;padding:20px;text-align:center}#EX7>p{margin:0;padding:0;font:16px Arial;text-align:justify}"+
"#EX7>a{font:600 14px Arial;display:inline-block;margin:20px auto 0;padding:9px 20px;color:#fff;text-decoration:none;background:#"+(_.nr?'00e094':cR)+"}</style>"+
"<div id='EX7'><p>L’accès à cette page n’est pas autorisé pour la ligne <b>"+o[0]+"</b> car celle-ci dispose d’un forfait spécifique limitant les modifications ou ajouts d’offre. Connectez-vous avec un autre compte pour continuer votre parcours.</p>"+
'<a href="https://www.sfr.fr/cas/logout?'+(_.nr?'red=true&':'')+'url='+escape(v='https://www.'+(_.nr?'red-by-':'')+'sfr.fr/mon-espace-client/')+
'">Se connecter avec un autre compte</a><a href="'+v+'">Se rendre dans mon espace client</a></div>',400,300,0,-1)
if(T('[@#]/espace-client/options'))ti(function(o){_('.ui-datepicker-calendar span[title]').E(function(o){_(o).H(_(o).at('title').substr(0,1))})})
if(T(CO+'recap'))_('p').E(function(o){if(_(o).T(/Produit fictif pour toper ARO/))_(o).R()})
if(T('@/parcours/procuration/'))wait(function(h){if((h=_('#eTtH')[0])&&ckR('ISTRED')>0)ST('#eTsF{D0}'),$sfr.istFooter();return h})
_.chV=function(v,o){
ST('img#cbot{z-index:33333;height:60px;position:fixed;bottom:9px;right:9px;cursor:pointer}')
_B.A('<img id="cbot" src="'+ist+'img/cbot'+(wm()?'M':'')+'.svg" data-v="'+v+'"/>')
o=_('#cbot');if(_('#eTchF')[0])o.af()
o.cl(function(u,v){
u='//www.sfr.fr/eTagP/chat.jsp?k=5bd0630e1c69883442abc9bb'
v=_(this).at('data-v')
JS(u,function(d){if((d=_.dispo)&&(d=d.capacity)&&d.chatbots)_.chat(v);else _.popin(
'<div style="background:#fff;text-align:justify;padding:20px;font:16px SFR-Regular,Arial">'+
"Désolé, j'ai trop de travail en ce moment.<br>"+
"Pour avoir une réponse à votre demande, n'hésitez pas à contacter notre Service Clients par chat depuis le site sfr ou en composant le 1023.<br>"+
"Sinon, merci de réessayer plus tard.</div>",360,160,0,'#1B2157','#fff',0)})})}
if(!_.app&&!_.nr&&T('(assistance|espace-client|webmail)?@')){
v=T('assistance@')?2:1
if(par('eTcbC'))ckD('eTchS')
if(par('eTcb')||T('assistance@/(gestion-client/(factu-conso|identifiant-mdp|offre-contrat)/|'+
'sfrmail-appli/sfrmail/sfr-mail-acceder-boite-mail.html)|'+
'espace-client@/(facture-mobile/consultation|infospersonnelles/contrat/informations|infoconso-mobile/conso)|'+
'@/espace-client/parc/offer|@/mon-espace-client/mobile.html'))_.chV(v)
if(ckR('eTchS')||T('assistance@/contact')&&_('#ChatBot')[0])_.chat(v)
}
_.fCD=function(m,v){
JS('//'+(par('eTcd')?'integ-':'')+(v='callback-dispatcher')+'.sd-sfr.fr/web/js/'+v+'-v2.min.js',function(CD){
CD=new CallbackDispatcher();CD.dispatch({
auth:!!e4,marque:_.nr?"RED":"SFR",mobile:wm(),histo:ckR('eTagUI'),nav:1,pn:pn,orig:ckR('s_cmCat').split(':')[1],
cpid:_.cpid,client:"",url:location+'',panier:sE(44)},function(r){
if(r&&!r.contactMeans)r=r[0];if(!r)return
var c=r.contactMeans,d=r.display_mode=='proactif',f=r.format,o,i,t=function(r){return r.triggerElement=="timer"&&r.triggerValue*999||1}
if(c&&(o=c.c2call)&&Math.random()*100<o.audience){i=o.campaignId||'';if(d)to(function(){_.c2cP(i)},t(o));else if(m==1)_('#eTc2L,#eTsdi').at('c2c',i)}
if(c&&(o=c.chatbot)&&Math.random()*100<o.audience){if(d)to(function(){_.chat(o.campaignId=='SFR'?1:0)},t(o));else if(m==1)_('#eTc2L').C('cd');else _.chV(2)}})})}
if(ECS||T('assistance@')||par('eTcd')&&T('[^/]*[#@]'))_.fCD()
if(T('boutique(@|_sfr_fr)')){if(hS)_.hdr();else JS('*hdrsl|Ist');_.ftr()}
_.mfb=function(){_Mfb_ud={service:sP(1),sous_service:sP(2),authentification:sP(10),profil_loggue:sP(18),tous_les_profils:sP(19),type_d_acces:sP(38),url_courante:sP(73),
type_d_achat:sE(46),type_de_campagne:sE(56),campagne_detail:sE(58),campagne_stacking:sE(59),product:s.products,event:s.event,pagename:s.pageName,contenu_panier:sE(54),contenu_panier_detail:sE(64),_context:{_page:{url:location.pathname,storageDuration:30}}}
if(v=W.MFB)v.start();else JS('https://actorssl-5637.kxcdn.com/actor/0a48ecae49c2bb384b242cdd3ce8ad97-106'+(_.nr?4:3)+'/action')}
if(cP&&T('[^/]*[#@]'))_.mfb()
if(T('espace-client(-red)?@/facture-mobile/consultation')&&(o=_(v='.facture-indispo'))[0]){
ST('#{padding:9px 20px}# a:hover{font-weight:600}'[RE](/#/g,v))
o._('p').H('Votre service facture sur internet est momentanément indisponible.<br><br>'+
'Si vous souhaitez régler des factures en retard, <a href="/paiement-mobile/facture-mobile/">cliquez ici</a> '+
'ou appelez le serveur vocal interactif au 963 depuis votre ligne mobile.')}
if(T('#/forfaits-mobiles')&&!/change/i.test(par('context')))ti(function(){
_('.js-back,.js-backDirect').E(function(o){
o.A(this.outerHTML[RE](/href="[^"]*"/,'href="/forfaits-mobiles/"')[RE](/js-back(Direct)?/,''),2)
o.R()})})
if(_.rmWV&&par('page')<99)$B.A('<div style="background:#fff;text-align:center"><a style="display:inline-block;margin:9px auto;padding:9px;color:#fff;background:#0d8" href="/telephones?context=change&page=99">Tous les mobiles</a></div>')
_('[data-tl]').cl(function(){TL('/'+_(this).at('data-tl'))})
if(!W._err&&T('#')&&!T('#/(contact|terminer|suivi|(mon-)?espace-client|info-clients|boutique/conf)')){
_.fAV=function(d){wait(function(o){if((o=_(W.AMP?'footer':'#eTrF'))[0]){o.A(d.content,3);JS(ist+'stats/AV.js')}return o[0]})};JS('*avisverifies|fAV')
_.nl=function(d){wait(function(f){(f=_(W.AMP?'footer':'#eTrF')).A(d.content,1);return f[0]})};JS('*nlred|nl')}
if(T(_.nbP+'|@$|@/(accueil/|offre-internet-pro/box|forfait-mobile-pro/(offres|telephones)$|pro(/contenus)?$|accessoires)')){
_.nl=function(d,c,o){if(c=d&&d.content)_.NLF=c;if(c=!_('#eTsNL')[0]&&_.NLF)wait(function(){
if((o=_('#Seo,#seo_block,#bl_notice,#eTfS',0))[0]){ST('#Newsletter{D0}');o.A(c,3);return!0}})}
JS(hS?'*nlsfr|nl':'*newsletter|nl')}
if(T('@/accessoires'))to(_.nl,999)
if(T('[@#]/mon-espace-client$')&&!_('#hec')[0])_('header',0).A(
'<div id="hec"><br><h2>Espace client indisponible</h2><p>Nous vous présentons nos excuses pour la gêne occasionnée.<br>Nous vous invitons à vous reconnecter ultérieurement.<br><br></p></div>')
if(T(CO+'contractV2'))$hR('#contractPaymentSection .togglePaymentBillingMode',/montant de l'assurance/,'montant')
if(T('rmcsport.tv/boutique/paiement/confirmation')){
$B.A('<img src="https://sso-client.sfr.fr/cas/logout?r='+r6+'&url=https://www.sfr.fr/recherche/img/x.gif"/>')
ckD('eTrsP')}
if(T('rmcsport.tv')&&par('initPanier'))ckD('eTrsP')
v=ckR('eTrsP')
if(T('rmcsport.tv/boutique/panier')&&v){
ckW('eTrsP='+escape(v.replace(/~1$/,'')+'~1'),1/4)
wait(function(v,r){if(r=_(v='#connect').T('login '))$hR(v,/.*(login (.*))/,'$2');return r},999)}
if(T('rmcsport.tv')&&v&&v.split('~')[2]==1)_.rsP()
if(T('@/accessoires(-test)?/objets-connectes')&&(_.fiM=par('marque')))wait(function(o,r){
if(r=(o=_('#bot input#'+_.fiM))[0])to(o.click,2e3)
return o[0]})
if(T('#/forfaits-mobiles$'))_('.details[on]').cl(function(o){o=_('.selecteur [data-tl][selected]');if(o[1])stats({pn:'Web/Red/Boutique/Mobile/CONQUETE/Grille Forfait/Layer-'+_(o[0]).at('data-tl')+'-'+_(o[1]).at('data-tl')})})
if(T(CR+'(recap|conf)')){
dataLayer=W.dataLayer||[]
gtag=function(){dataLayer.push(arguments)}
v=(s.prop2||'').split(':')[2]
if(v=='Mobile')i='AW-952764035/'+(pu?'i5gFCPLgpHQQg42oxgM':'9GJtCOGlzpUBEIONqMYD')
if(v=='Fixe')i='AW-798079081/'+(pu?'N5ykCLXF1IgBEOnwxvwC':'gPiLCKiQxJUBEOnwxvwC')
if(i)gtag('event','conversion',pu?{'send_to':i,'value':prod(Q)[2],'currency':'EUR','transaction_id':oid}:{'send_to':i})}
if(T('forumtest@|(la-)?communaute@')){
if(!_('#eTsF,#eTfS')[0])_.ftr()
var J='https://www.sfr.fr/recherche/jsp/',WW={},RR={},EE=[],RA='',RF='',RS='',
q0=function(s){return s?_.ac0(s)[LC]()[RE](/[ -,.'"]+/g,' ')[RE](/^ | $/g,''):''},
sEC=function(q,t,s,E,A){
t=t==2?'<li><a href="$2">$1</a></li>':t==1?'<div><a href="$2">$1</a></div>':'<a class="E" href="$2">$1</a>'
s='';q=q0(q);EE.forEach(function(A){if(A[0].test(q))s+=t[RE]('$1',A[1])[RE]('$2',A[2])})
return s}
EC=function(R,r,A,E){for(r=1;A=R[r++];){
if(E=A[1]){
E=(' '+E+' ')[RE](/\*/g,'@')[RE](/@/g,'[a-z]*')[RE](/ +OU +/g,'\\b|\\b')[RE](/^ +| +$/g,'\\b')[RE](/ +/g,'\\b.*\\b')
EE.push([new RegExp(E),A[2],A[3]])}}}
JS('//static.s-sfr.fr/assistance/runtime/export/bloc/django/rechercheec.html')
ST('#eTpAC.V{display:block!;box-shadow:0 0 4px #7777}'+
'#eTfAC{padding:0;margin:0;background:#fff}#eTfAC+*,.lia-autocomplete-footer{D0!}'+
'#eTfAC a{display:block;font:bold 14px CustomFont;color:#4a4a4a;padding:9px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#eTfAC a+a{border-top:1px solid #bbb}'+
'#eTfAC a:before{display:inline-block;margin:0 9px 0 0;padding:2px 7px;color:#fff;border-radius:4px;font:normal 12px CustomFont}'+
'#eTfAC a.A:before{content:"Assistance";background:#1a5a94}'+
'#eTfAC a.E:before{content:"Espace Client";background:#d56e9d}'+
'#eTfAC a.F:before{content:"Communauté";background:#6a398e}')
ti(function(){
var P='.lia-autocomplete-',I='#eTfAC',
Q=_('input[id*=SearchField],.lia-searchQuery')[0],C=P+'container',
t=function(s){return _.ac0(s)[LC]()[RE](/[ -,.'"]+/g,' ')[RE](/^ | $/g,'')},
f=function(r,s,A,K){
RR[_.qF]=R
if(R&&R.found&&(r||R.q==_.qR)){RA='';r=0;while(i=R.items[r++])
RA+='<a class="A" href="'+i.url+'">'+i.title+'</a>'}}
if(Q&&!Q.ok){
Q.ok=1
Q.onblur=function(){to(function(){_(C,0).C('V',1)},9)}
Q.onfocus=function(){_(C,0).C('V')}}
AC=function(C,Q,q){
if(q=C[0])q=q0(q.title).split(' ')[0]
WW[Q]=q||'-';R=0;if(q&&Q==_.q){
RS=sEC(_.qR=_.qF.split(' ').map(function(q){return WW[q]}).join(' '))
JS(J+'SFR.jsp?u=assistance&q='+escape(_.qR),f)}else f()}
if(!_(I)[0])_(P+'content',0).A('<div id="eTfAC"></div>',1)
var r=0,s='',v,l
_(P+'message-list-item-link').E(function(o){if(r++<5)s+='<a class="F" href="'+o.href+'">'+o.innerText+'</a>'})
s+=RA+RS;if(RF!=s)_(I).H(RF=s)
v=q0(Q&&Q.value)
_(C,0).F('id',v&&s?'eTpAC':'eT0')
if(_.qF!=v){
R=0;_.qF=v
if(!v)_('#eTfAC').H('')
else if(R=RR[v])f(1)
else{_.q=v=v.split(' ').pop();l=v.length;while(--l>0&&WW[v.substr(0,l)]!='-');if(!l)JS(J+'ACF.jsp?q='+escape(v))}}})
if(T('[^/]*/t5/forums/searchpage/tab/')){
resV="<div>Aucun résultat n'a été trouvé</div>"
getQ=function(Q){Q=_('#lia-searchQuery')[0];return unescape(Q&&Q.value||par('q'))}
stats({pn:'Recherche',v:{prop60:getQ(),prop4:_('[data-lia-message-uid]').length,prop49:"Communaute"}})
ST('#eTs{text-align:center;max-width:1300px;padding:15px;margin:0 auto}#eTs>li{display:inline-block;padding:12px 25px;border-radius:25px;color:#999;font:bold 16px CustomFont;cursor:pointer}'+
'#eTs>li.A{color:#fff}#eTs>#L0.A{background:#6a398e}#eTs>#L1.A{background:#1a5a94}#eTs>#L2.A{background:#d56e9d}'+
'#eTs>div{D0}#eTs>div>div{display:block;text-align:left;margin:20px 0;padding:20px 40px;border-radius:8px;box-shadow:0 0 15px 1px #18181826;background:#fff}'+
'#eTs>div>div>a{font:bold 19px CustomFont;margin:0 0 9px}#eTs>div>div>p{font:normal 14px CustomFont}#eTs a{cursor:pointer}')
_('.lia-quilt-row-header',0).A('<ul id="eTs">'+
('<li id="L0" class="A">@la Communauté SFR</li><li id="L1">@l’Assistance SFR</li><li id="L2">@l’Espace Client SFR</li>')[RE](/@/g,'Réponses de ')+
'<div data-et="L1"></div><div data-et="L2"></div></ul>',2)
_('#eTs+div',0).at('data-eT','L0')
addR=function(n,q){if(q=getQ()){
JS(J+'SFR.jsp?u=assistance&s='+n+'&q='+escape(_.ac0(q)),function(s,r,i){
s='';r=0;while(i=R.items[r++])s+='<div><a href="'+i.url+'">'+ft(i.title)+'</a><p>'+ft(i.summary)+'</p></div>'
_('[data-et=L1]>a').af()
if((i=R.count+R.start)<R.found)s+='<a onclick="addR('+i+')">Plus de résultats</a>'
_('[data-et=L1]').A(s||resV)
stats({pn:'Recherche',v:{prop60:q,prop4:i,prop49:"Assistance"}})
})
}}
_('.SearchPageForm')[0].onsubmit=function(o){
_('#eTs>div').H('')
if(o=_('#L2.A')[0])o.click()
if(_('#L1.A')[0])addR(0)}
_('#eTs>li').cl(function(i,O){
i=this.id;O=_('[data-et='+i+']')
if(i=='L1'&&!O.H())addR(0)
if(i=='L2'&&!O.H()){
O.H(sEC(q=getQ(),1)||resV)
stats({pn:'Recherche',v:{prop60:q,prop4:_('[data-et=L2] a').length,prop49:"Espace Client"}})}
_('#eTs>li').C("A",1);_(this).C("A")
_('[data-et]').af();O.af(1)})
}
if(T('[^/]*@/t5/.*/(ct|bd|td|m)-p/')){
_('.custom-content-list',1).af()
if(v=_(T('.*/td-p/')?'.lia-message-subject':'.lia-node-header-title').F('innerText')){
v=_.ac0(v)
JS(J+'SFR.jsp?u=assistance&q='+escape(v),function(s,r,i){
s='';r=0;while(i=r<3&&R.items[r++])s+='<li><a href="'+i.url+'">'+ft(i.title)+'</a></li>'
r=_('.custom-content-list',0)
r[0].querySelector('ul').innerHTML=s
r.af(s?1:0)})
v=sEC(v,2)
o=_('.custom-content-list',1)
o[0].querySelector('ul').innerHTML=v
o.af(v?1:0)}
}
}
if(T('tv@|play-fut@|sfr-tv8@|lettre-r@|(www|m).vosmms.com'))_.ftr()
if(!cms&&!_.CC){
if(e4&&T('(espace-client(-red)?|webmail|assistance)?@|#')&&!ckR(v='eTempr')){
ckT(v,1,9e3);JS('https://www.sfr.fr/export/bloc/django/empreinte.html'+(T('#|espace-client-red@')?'?RED':''))}
if(T('rmcsport.tv/mon-espace-client')&&!ckR('eTempr')){
ckW('eTempr=1',96);JS('https://www.rmcsport.tv/export/bloc/django/empreinte.html')}}
if(T('#/offre-internet/private/'))ST('#eTrF{D0}')
if(T('jeusfretmoi@'))gtag=function(e,t){if(e=='event')_.tl('/'+t)}
if(T('lithium#')){o=_('#eTrF');_(o[0].previousSibling).R();o.R();JS('//cms.red-by-sfr.fr/export/bloc/django/footer.standard.content|')}
if(v=T('#/offres-internet/demenagement')&&par('C2C'))c2cR(v)
if(v=T(CR+'recap')&&!/de\/recap/.test(Rf)&&ckR('eTcP')){
_('#promoCode')[0].value=v;_('.codePromoSubmitButton')[0].click()}
if(_.cc==7&&T('@/sfrplay')){
JS('//www.googletagmanager.com/gtag/js?id=UA-168577201-1')
dataLayer=[['js',TS],['config','UA-168577201-1']]}
if(T(CS+'contract')&&_('#otpPhoneMessage')[0])TL('OTP')
if(T('actus@|staging-sfractus.cleo.media')){
if(X){v='.header_brand';ST(v+'{position:relative}'+v+'>p{cursor:pointer;position:absolute;width:40px;height:40px;top:0;left:0}')
_(v,0).A('<p/>'); _(v)._('p').cl(function(){location='https://www.sfr.fr/'})}
if(/[0-9]{6}/.test(v=par('eTactu')))_('#body_content').A('<article data-eTactu="'+v+'"/>',2)
o=_('[data-eTactu]');if(o[0]){
JS(ist+'eTagP/gab.jsp')
_.acF=function(A,I,i){
var p,S='.eT'+I,P=function(p){return p?p[RE](/[.]00$/,'')+'€':''},D=A.find(function(e){return e[4]==i})||[],F=/^Mob/.test(D[7]),Co='',Ca=''
A.forEach(function(e){if(e[24]==D[24]&&e[26])Co+='<i sap="'+e[4]+'" class="C'+(e[26]==D[26]?' A':'')+'" title="'+e[26]+'" style="background:'+e[25]+'"></i>'})
A.forEach(function(e){if(e[26]==D[26]&&e[26])Ca+='<span sap="'+e[4]+'"'+(e[24]==D[24]?' class="A"':'')+'>'+e[24]+'</span>'})
_.GAB('actuSFR',S,{
U:D[19],Ma:D[1],Mo:D[2],Fo:F?'Sans forfait':'<i class="P">+</i> Forfait '+D[7],
Co:Co,Ca:Ca,Di:D[6]=='true'?'<i class="S"></i> En stock':'<i class="I"></i> Indisponible',
Da:'DAS <i class="D">i</i><span>DAS Tête : '+D[21]+' W/kg<br>DAS Tronc : '+D[22]+' W/kg<br>DAS Membre : '+D[23]+' W/kg</span>',
Pr:P(p=D[14]||D[12]),Pb:D[11]>p?P(D[11]):'',Fp:D[14]?'+ '+P(D[15])+'/mois x '+D[16]+' mois':'',
Pf:F?'Mobile débloqué<br>Sans engagement':'Forfait à '+P(D[10])+' par mois pendant un an,<br>puis '+P(D[9])+' par mois - Engagement '+D[8]+' mois',Im:D[20]})
_(S+' [sap]').cl(function(){_.acF(A,I,_(this).at('sap'))})}
o.E(function(o,i,S,F,d,m){
d=_(o).at('data-eTactu')
if(m=d.match(/sap=([0-9]+)/i))S=m[1]
if(!S)return
if(m=d.match(/for=([0-9a-z ]+)/i))F=m[1]
if(!F)F=i?_.dO:'Mob'
_(o).C('eT'+i)
JS(ist+'eTagP/dev.jsp?B=_eT.acF&F='+F+'&S='+S+'&I='+i)})}}
if(T('assistance.previsu@'))_('[href*=assistance]').E(function(o){
if(h=_(o).at('href'))_(o).at('href',h[RE](/\/\/assistance.sfr.fr/,'//assistance.previsu.sfr.fr'))})
if(T(CR+'contract')&&!par('eTcas')){
_.ssd=_.IPP?'www.pfv':cms?'cms':'www'
_('.authent.bouton_me_connecter').cl(function(e){fsp(e);location='https://'+_.ssd+'.sfr.fr/cas/login?service=https%3A%2F%2F'+_.ssd+'.red-by-sfr.fr%2Fterminer-ma-commande%2Fj_spring_cas_security_check_layer&theme=-espaceclientred-bolred'})
o=_('.logOutLink');o.A('<a href="https://'+_.ssd+'.sfr.fr/cas/logout?red=true&url=https://'+_.ssd+'.red-by-sfr.fr/terminer-ma-commande/contractV2/logout" class="cta cta--next logOutLink">Se déconnecter</a>',2);o.R()}
if(_.H2=W.AMP&&_('#eTsH2'))ti(function(){
var P=_&&(_.prenom||_.nom),H=_.H2._
if(P&&P!=_.HsI){
_.HsI=P
H('[for=HE]',0).af();H('[for=HE]',1).af(2)._('a').at('data-i',P.charAt(0))
P=H('.D>.E>div:first-child')._
P('p',0).H(_.prenom+' '+_.nom)
P('p.D').af();P('p.C').af(1)
ab()}},333)
_.paU='(actus|assistance|boutique|dommages-reseaux|espace-client|home|la-communaute|odr|portailsav|tv|webmail|sfrcloud)?@'
_.paI=function(o){if(!(T(_.paU)))_.go('https://www.sfr.fr/offre-mobile#sfrpt');else if(!_.paL){
ST(_.paL='#eTpaT,#eTpa:checked~.M .hX{D0!}#eThS>.M .P{background-size:32px!}')
pTj()
wait(function(p){
if(p=W.panierTransverse){
p.init()
wait(function(r,l){
if(r=_.pS){
if(l=_.lse(1))p.setLine(l[0])
if(!o)p.open()}
return r})}
return p})}}
if(!(T(_.nbP)||!W.AMP&&T('@/accessoires/detail'))){if(T('@$|@/accessoires|@/recherche')||location.hash=='#sfrpt')_.paI(1);else if(T(_.paU))pTj()}
_.pT=function(n,o,p,h){
if((h=_('#eThS .PT'))[0])h.at('data-n',n||undefined)
p=_('#eThS .P>label');p._('i').R();if(n)p.A('<i>'+n+'</i>');ckW('eTpT='+n,1)
if(o){_('#eThS .A').C('A',1);_B.C('hS',1)}else if((h=_('#eThS')[0])&&h.hi)h.hi();p.C('A',o?0:1)}
wait(function(p){if(p=W.panierTransverse)_('#eThS .P').cl(function(e){fsp(e);p.open()});return p})
if((v=par('jeuDL'))||!_.nr&&TH%91908<840){
if(cas&&_('h2').T(/espace client/i)){
_.casB('//static.s-sfr.fr/img/j6A.webp')
_('.sr-mire-container').cl(function(e){if(e.pageX*2>W.innerWidth)W.open('//jeusfretmoi.sfr.fr/?sfrintid=Mire_Mail_jeu202306')})
_('.sr-login-search').cl(fsp)}
if(T('@/mon-espace-client$')&&(v||!/ESPRIT9|P20B/.test((_.LM||[])[5]+(_.LF||[])[5])))JS(ist+'/stats/jDL.js')}
dC()
if(T('#/telephones/[^/]+/[^/]+/[^/]+$')&&!/econditionn/.test(location))bnk('4teCj2oF/s4kmso1n')
if(T('@/accessoires/details')&&/^BHT:Montres/.test(sE(46)))bnk('WXrjW06r/ebx43srg')
if(T('@/maison/offre-protection$'))bnk('WXrjW06r/fguw1zhd')
if(T(CS))cSq(location.pathname)
if(par('eTdas'))ST('.bl_phone .das{position:absolute!;bottom:16px;right:16px}')
if(T('connexion.numericable.fr'))_('#footerClient ul').A('<li>&nbsp;|&nbsp;<a onclick="_eT.ccP2()">Cookies</a></li>')
if(T('#'))JS(rbs+'resources/js/etag/red.js')
if(hS){
var rS=function(o,v){v=o[0].previousElementSibling;if(v&&v.tagName=='STYLE')_(v).R();o.R()}
if((o=_('body>header:not(#eThS),#headerSre'))[0]){rS(o);_.hdr()}
if((o=_('body>footer:not(#eTfS),#footerSre'))[0]){rS(o);_.ftr()}}
if(T('@/offre-internet/changer-mon-offre-fibre'))ti(function(){_('*').E(function(o){o.childNodes.forEach(
function(n,t){if(n.nodeType==3&&/ŕ|ę|č| puis 25€/.test(t=n.textContent))n.textContent=t[RE](/puis 25€/,'offert')[RE](/ŕ/g,'à')[RE](/ę/g,'ê')[RE](/č/g,'è')})})})
if(T('rmcsport.tv/sports-de-combat/(pass-combat|ufc).html')&&(o=_('a[href*="inscription-pass-combat"]'))[0])o.cl(function(e){e.preventDefault();_.popin('/etag/inscription-pass-combat.html',640,480,0,0,'#fff')})
if(T(CS)&&s.prop60=='LOAN 24X SANS FRAIS')ckW('eTfp=CCL24',.5)
if(T('@$|@/la-meilleure-offre|@/accessoires(?!/detail)|'+_.nbP)&&!T('@/'+_.nbM))JS(ist+'stats/AVs3.js')
if(par('eTimg')){
e=new RegExp("http://www.sfrpay.fr/(var/sfrpay/storage|bundles/sfrpaysite)/images")
v='/img/SP'
if(T('sfrpay.(fr|com)'))JS('//cms.sfr.fr/stats/spImg.js')
if(T('@/sfr-pay')){
_('img').E(function(o){_(o).at('src',_(o).at('src')[RE](e,v))})
_('source').E(function(o){_(o).at('srcset',_(o).at('srcset')[RE](e,v))})}}
if(T('assistance@'))_('.btn-rate-mobile').cl(function(n){
if(n=_('.star.selected').length)eP('notA','u='+location.pathname+'&n='+n+'&m='+(wm()?'m':'d'))})
if(T('(m.)?vosmms.com')){_.hdr();_.ftr();wait(function(o){o=_('#eTfS a[href*="cookie"]');if(o[0])return o.at('href','#').cl(_.ccP2)})}
if(T('kidsjeux-mobile@')){
if(_.cc<7)W.ga=f0
ST('#eTkj{position:fixed;bottom:4px;left:8px}#eTkj>a{cursor:pointer;color:#fff;font:12px Arial;text-shadow:0 0 2px #000}')
_('body').A('<div id="eTkj"><a onclick="_eT.ccP2()">Cookies</a>&emsp;<a href="https://www.sfr.fr/politique-de-protection-des-donnees-personnelles.html">Données personnelles SFR</a></div>')}
if(_.IPP)_.pfv(T('@/mon-espace-client$'))
if(_.bSt){
if(T('boutique@$')){
_('.Services-bannerWrapper')[0].id="bSt"
_.sT('Home_Boutique','bandeauSFRv2','#bSt')}
else{
_.sTvi=function(b){var o=_(b),p=o.P(),t='offsetTop',h='offsetHeight',y=p[0][t]+p[0][h]/2,w=W.scrollY;return o[0][t]>0&&y>w&&y<w+W.innerHeight}
_.sTcb=function(){
var f=1,n=0,o,t='<p>\u23f4'
_('#bSt>li').E(function(o){if(o[IH]){t+='<p>\u23fa';n++}})
if(n>1){
ST('#bSt>.S{top:auto;width:auto;min-width:0;flex-direction:row;height:auto;bottom:0;left:50%;transform:translateX(-50%);box-shadow:none}'+
'#bSt>.S>p{display:inline-block;color:#222;font:16px Arial;padding:0 6px;margin:0;cursor:pointer}'+
'#bSt>.S>p.A,#bSt>.S>p:hover{color:#d0021b}')
_('#bSt').A('<li class="S">'+t+'<p>\u23f5')
ti(function(){if(f)_(o,n+1).cl();f=1},5e3)
o=_('#bSt>.S>p');o.cl(function(){
f=0;var a=_.bSt,b,c,i=Array.prototype.indexOf.call(o,this),l='left',L=_('#bSt>li:not(.S)')
if(a==i)return
if(i==0){c='P';b=a-1;if(b<1)b=n}else if(i>n){c='N';b=a+1;if(b>n)b=1}else{b=i;c=b<a?'P':'N'}
_(L,b-1).C(c).S(l,(c=='P'?'-':'')+'100%')
_(o).C('A',1)
to(function(){_(L,b-1).C('T').S(l,0);_(L,a-1).C('T').S(l,(c=='P'?'':'-')+'100%')},55)
to(function(){_(o,_.bSt=b).C('A');_(L).C('T',1).C('A',1).C('P',1).C('N',1);_(L,b-1).C('A T')},555)})
_(o,_.bSt=1).C('A')}}
ST('#bSt{position:relative;text-align:center;overflow:hidden;width:calc(100% - 40px);max-width:940px;height:180px;margin:40px auto 0}'+
'#bSt>li{position:absolute;margin:4px;max-width:calc(100% - 8px);top:-99%;left:0}#bSt>li.T{top:0;transition:left .5s}#bSt>li.A{left:0}#bSt>li.N{left:100%}#bSt>li.P{left:-100%}')
SM(767.9,'#bSt{height:calc(200px + 30vw);min-height:320px;width:calc(60vw + 8px);min-width:287px;margin:20px auto 0}')
_('.Carousel').A('<ul id="bSt"><li class="A T N0"><li class="N1"><li class="N2"></ul>')
_.sT('N-1_Boutique','bandeauSFRv2','#bSt>li')}}
if((cms||r6<2e4)&&T('[^/]*@')){
v='';_('script[src*="ist/loader"],script[src*="jquery"]').E(function(o){v+=_(o).at('src')[RE](/^https:|\/\/|\.(s-)?sfr\.fr/g,'')+';'})
o=location;if(v)eP('log','r='+o.host+o.pathname[RE](/recapitulatif.[0-9a-f]+/,'RECAP')+'&d=IST/JQ/'+v)}
if(v=e4&&par('eTco')){
if(v&1)ckD('eTco')
if(v&2)_.conT=0
if(v&4)_.conM=0}
v=e4&&lse();if((v=v&&v[3]<3?ECS?1:ECR?2:0:0)&&(o=_.conM?_.conT?0:2:1)&&!ckR('eTco'))wait(function(H){H=_('header',0);if(H[0]){
ST('#eTco{display:block;text-align:center;padding:8px;font:14px/22px SR,Arial;background:#fc0}#eTco>b{font-family:SB,Arial}')
if(ECR){
ST('#eTco{position:relative;margin:20px;font:16px/20px Montserrat-Regular,Arial;border-radius:5px;background:linear-gradient(108deg, #fff 65px,#00e094 66px);'+
'border:3px solid #00e094;color:#fff;padding:12px 20px 12px 80px}#eTco>b{font-family:Montserrat-Bold,Arial}'+
"#eTco:before{content:'';display:block;position:absolute;top:0;left:0;height:100%;width:60px;background:url("+med+"ic-info.png) center no-repeat;background-size:40px}")
SM(-840,'#eTco{margin:20px calc(50vw - 400px)')}
_('header',0).A('<a id="eTco" href="//'+(cms?'cms':'espace-client'+(v>1?'-red':''))+'.sfr.fr/infospersonnelles/'+
(o>1?'moyenscontact/accueil':'email/contact')+
'"><b>Votre '+(o<2?'adresse mail':'n° de mobile')+" de contact n'est pas à jour.</b> Cliquez ici pour l"+' ae'[o]+' renseigner.</a>',2)
ckW('eTco=1',9)
return!0}},444)
if(T('#')&&/^Web.Red.Boutique.C(hang|onquet)e.Fiche Mobile$/.test(s.pageName))JS(rbs+'resources/js/red/popin-reprise.js')
if(T('@/mon-espace-client$|assistance@(/contacter)?$')){
_.sca=function(d,b){b=T('@');_(b?'#eThS':'#Ban,#eTfS',0).A(d?d.content:'',b?2:3)}
if(v=T('@'))SM(767,'#hec{margin-top:8px}');JS('*escda|sca')}
if(T('recyclage-mobile@')){
v='';o=0;_('body>script').E(function(o,t){t=o.innerText.substr(0,32);v+=t;if(/\$sfr/.test(t))o++})
if(o<2)ERR('RM:'+v)}
if(par('eT1793')&&_.nr)_('footer [href*="/contact/"]').cl(function(e){e.preventDefault();_.chat()})
if(_.fut&&T('@/accessoires/details'))_('[data-car] ').E(_.car)
if(T('valid.mire.ipadsl.net')){_.hdr();_.ftr()}
if(cas&&/^#EN/.test(location.hash)&&(f=_('.sr-mire-content')._)){
f('h2',0).H('Customer area')
v='Input>label';f('#username'+v).H('Login');f('#password'+v).H('Password')
v='placeholder';f('#username').at(v,'Mobile number, email or NeufID');f('#password').at(v,'Enter password')
if((v=f('[for=remember-me]')[0])&&(v=v.childNodes[2]))v.replaceWith('Keep me signed in')
f('#identifier').H('Log in')
v='#mire-items li>a';f(v,0).H('Forgotten password');f(v,1).H('Blocked account')}
if(T('webmail@$'))ST('#WM #O>iframe{height:1600px}')
})()
