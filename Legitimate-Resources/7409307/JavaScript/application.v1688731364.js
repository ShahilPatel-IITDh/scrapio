var App=new Backbone.Marionette.Application();App.on("start",function(){if(Backbone.history){Backbone.history.stop();Backbone.history.start();}
App.vent.trigger('games:stop_playing');});$(document).ready(function(){App.start();$.cookie('surveyLogin','false');var killEvents=function(){App.vent.trigger('detach-events');App.vent.off('show:popover');App.vent.off('show:gamePlay-popover');App.vent.off('registration:request');App.vent.off('registration:confirm-popover');App.vent.off('registration:post-reg-popover');App.vent.off('registration:post-reg-popover-non-uk');App.vent.off('show:sportsbookoverlay');App.vent.off('show:login-popover');App.vent.off('show:promo-popup');App.vent.off('show:loader');App.vent.off('show:my-account');App.vent.off('show:overlay-message');App.vent.off('get:sessionInfo');App.vent.off('show:loyalty-box');App.vent.off('launch:banking');App.vent.off('launch:accountTransactions');App.vent.off('launch:playcheck');App.vent.off('show:mobile-promotions');App.vent.off('display:sportsbook');App.vent.off('display:exit-banner');App.vent.off('display:achievements-table');App.vent.off('show:bingo-rooms');App.vent.off('display:crack-egg');App.vent.off('show:document-verification');App.vent.off('show:deposit-limit');App.vent.off('show:subscription-centre');App.vent.off('games:start_playing');App.vent.off('update:session-time');App.vent.off('show:player-actvity');};App.vent.on('login:success',function(loginModel){_.each(App.submodules,function(module){module.stop();});killEvents();App._initCallbacks.reset();Backbone.history.stop();App.start();});App.vent.on('logout:success',function(loginModel){_.each(App.submodules,function(module){module.stop();});killEvents();App._initCallbacks.reset();Backbone.history.stop();App.start();});App.reqres.setHandler('getGameImage',function(id,name){if(name){name=name.toLowerCase().replace(/[^0-9a-z]/g,'_').replace(/__+/g,'_').replace(/_$/,'').replace(/^_/,'');return id+'-'+name;}});});var AppController=Backbone.Marionette.Controller.extend({index:function(){},showGame:function(gameId){var view=this;if(!view.isUserLoggedIn()){view.showGameLoginPopover(gameId);return;}
if(Red.FirstStatusCallReceived){if(view.isUserAllowedToPlay(gameId)){view.playGame(gameId);return;}}
App.vent.on('FirstStatusCall:received',function(){if(view.isUserAllowedToPlay(gameId)){view.playGame(gameId);return;}});},showGameFree:function(id){if(Red.PlayerStatus=="provisional"){App.vent.trigger('display:interruptive-popup:status-provisional');return;}
if(Red.DisplayRestrictedByLossMessage){App.vent.trigger('display:interruptive-popup:rg-message','/rg-messaging-restricted #rg-message');return;}
var view=this,gameId=id;if($.cookie('Auth')){setTimeout(function(){view.launchGame(gameId,true);},250);}else{App.vent.trigger('display:in-game-banner',id);App.vent.on('ping:sending',function(data){data.notifications=data.notifications||[];data.notifications.push('inGameBanner');data.notifications.push('exitBanner');});if(!$('.login-popover')[0]){App.vent.trigger('show:login-popover',gameId);}}},isUserLoggedIn:function(){if($.cookie('Auth')){return true;}
return false;},playGame:function(gameId){var view=this;setTimeout(function(){view.launchGame(gameId,false);},250);},showGameLoginPopover:function(gameId){if(!$('.login-popover')[0]){App.vent.trigger('show:login-popover',gameId);}},isUserAllowedToPlay:function(gameId){var view=this;if(Red.PlayerStatus==="provisional"){App.vent.trigger('display:interruptive-popup:status-provisional');return false;}
if(Red.GameInterruptivePopovers!==undefined&&Red.GameInterruptivePopovers['key']!==undefined&&!Red.allowGameLaunch){if(typeof $.cookie('display_times-ip-'+Red.GameInterruptivePopovers['key'].replace(/\s+/g,''))==='undefined'){Red.GameInterruptivePopovers['launchedGameID']=gameId;App.appRouter.navigate('',{trigger:true});App.vent.trigger('display:interruptive-popup',Red.GameInterruptivePopovers);return;}}
if(Red.GameInterruptivePopovers){Red.allowGameLaunch=false;}
if(Red.hasBonusBalance&&$.inArray(gameId,Red.ExcludedGamesForBonus)>0){App.vent.trigger('display:interruptive-popup:block-game','/game-excluded-bonus #excluded-message',false);return false;}
if(Red.hasBonusNdb&&$.inArray(gameId,Red.ExcludedGamesForNDB)>0){App.vent.trigger('display:interruptive-popup:block-game','/game-excluded-bonus #excluded-message-ndb',false);return false;}
if(Red.DisplayRestrictedByLossMessage){App.vent.trigger('display:interruptive-popup:rg-message','/rg-messaging-restricted #rg-message');return false;}
App.vent.on('ping:received',function(data){if(Red.DeviceType==="desktop"&&App.CheckGameLaunchedModule.numberOfGamesPlaying()>1&&$('#game-wrapper')[0]){view.forceQuitGame();App.vent.trigger('display:interruptive-popup:block-game','/second-game-message #game-opened',true);return false;}});if($.cookie('gameOn')>0&&Red.DeviceType==="desktop"){var timeNow=(0+Math.floor(Date.now()/ 1000)),gameOnTS=parseInt($.cookie('gameOn'))+5;if(!$('#game-wrapper')[0]&&gameOnTS>timeNow){App.vent.trigger('display:interruptive-popup:block-game','/second-game-message #game-opened',true);return false;}}
return true;},forceQuitGame:function(){App.vent.trigger('close-modal');App.vent.trigger('close-popover');App.appRouter.navigate("",{trigger:true});if(Util.manageStorage('get','showExitBanner')){Util.manageStorage('remove','showExitBanner');Util.manageStorage('remove','launchedGame');}},lauchGameDirect:function(id){var view=this,gameId=$('.header-banner .banner').attr('data-game');App.appRouter.navigate("gameplay/"+gameId,{trigger:true});},launchGame:function(gameId,gameType){var view=this,url="/gamesApi/game/"+gameId;App.vent.trigger('display:in-game-banner',gameId);App.vent.on('ping:sending',function(data){data.notifications=data.notifications||[];data.notifications.push('inGameBanner');data.notifications.push('exitBanner');});App.vent.trigger('show:loader');$.ajax({type:"GET",url:url,dataType:"json",data:{}}).done(function(data){if(Red.DeviceType!=="desktop"){Util.manageStorage('set','playGame',true);Util.manageStorage('set','showExitBanner',true);Util.manageStorage('set','launchedGame',gameId);}
var openGame=data.game;openGame.freePlay=gameType;if((data['game']['provider_id']===2||data['game']['provider_id']===9)&&Red.DeviceType!=="desktop"){App.vent.trigger('game:update-latest',data['game']);App.vent.trigger('games:play:livecasino:mobile',openGame);return;}
App.vent.trigger('hide:loader');App.vent.trigger('game:update-latest',data['game']);App.vent.trigger('games:play',data['game']);$('html').addClass('no-scroll');}).fail(function(){});},launchRegistration:function(){if(!$.cookie('Auth')){App.Translations.loadTranslation('registration',function(){App.vent.trigger('registration:request');});}},launchRegistrationB:function(){if(!$.cookie('Auth')){App.Translations.loadTranslation('registration',function(){App.vent.trigger('registration:request:b');});}},launchRegistrationNew:function(){if(!$.cookie('Auth')){App.Translations.loadTranslation('registration',function(){App.vent.trigger('registrationNew:request');});}},launchBanking:function(){if($.cookie('Auth')){$(window).load(function(){setTimeout(function(){launchBanking()},1000);});}},launchBankingFromGame:function(){if($.cookie('Auth')){setTimeout(function(){launchBanking()},1000);}},launchBankingLiveCasino:function(){if($.cookie('Auth')){$(window).load(function(){setTimeout(function(){launchBanking()},1000);});}},launchSubscription:function(){var options={'directLink':false};App.vent.trigger('show:subscription-centre',options);},launchSubscriptionDirect:function(username,serverId,shacode){var options={'username':username,'serverId':serverId,'shacode':shacode,'directLink':true};App.vent.trigger('show:subscription-centre',options);},launchDepositLimit:function(){App.vent.trigger('show:deposit-limit');},launchDocumentVerification:function(){App.vent.trigger('show:document-verification','document');},launchAddressVerification:function(){App.vent.trigger('show:document-verification','address');},launchLogin:function(){App.vent.trigger('LoginRequested');},launchUserAccount:function(){App.vent.trigger('show:my-account');},launchPlaycheck:function(){App.vent.trigger('launch:playcheck',null,null,null);},launchTransactionHistory:function(){App.vent.trigger('launch:accountTransactions');},launchDOTD:function(){this.getPromoData('BonusDOTD');},launchDOTDStatic:function(){this.getPromoData('BonusDOTDStatic');},launchNDB:function(){this.getPromoData('BonusNDB');},launchWB:function(){this.getPromoData('BonusWB');},launchWBGeneral:function(id){this.getPromoData(id);},launchWBTop10:function(){this.getPromoData('BonusWBTop10');},launchWB30spins:function(){this.getPromoData('BonusWB30spins');},launchWB200p25spins:function(){this.getPromoData('BonusWB200p25spins');},launchWB200p:function(){this.getPromoData('BonusWB200p');},launchWB150p32spins:function(){this.getPromoData('BonusWB150p32spins');},launchBonusWB25spinsBGT:function(){this.getPromoData('BonusWB25spinsBGT');},launchBonusWB25spinsHyperGold:function(){this.getPromoData('BonusWB25spinsHyperGold');},launchBonusWB25spins9PotsOfGold:function(){this.getPromoData('BonusWB25spins9PotsOfGold');},launchBonusWB25spinsFishingFloats:function(){this.getPromoData('BonusWB25spinsFishingFloats');},launchBonusWB25spinsIAC:function(){this.getPromoData('BonusWB25spinsIAC');},launchBonusWB25spinsJurassicWorld:function(){this.getPromoData('BonusWB25spinsJurassicWorld');},launchBonusWB25spinsGoldBlitz:function(){this.getPromoData('BonusWB25spinsGoldBlitz');},launchBonusWB25spinsBisonMoon:function(){this.getPromoData('BonusWB25spinsBisonMoon');},launchBonusWB25spinsCatClans2:function(){this.getPromoData('BonusWB25spinsCatClans2');},launchRedRewards:function(){this.getPromoData('RedRewards');},launchRedRewardsSecond:function(){this.getPromoData('RedRewardsSecond');},forgottenPasswordStep1:function(){var verifyUrl='/forgotten-password #forgot-password-form';App.vent.trigger('show:resetPassword',verifyUrl);},forgottenPasswordStep2:function(code){var verifyUrl='/forgotten-password/verify/'+code+' #forgot-password-form';App.vent.trigger('show:resetPassword',verifyUrl);},getPromoData:function(promoType){var pingData={notifications:['alerts']};App.vent.trigger('ping:sending',pingData);App.vent.trigger('show:loader');$.ajax({type:"POST",url:'/api/status',dataType:"json",data:pingData}).done(function(data){var promoData=_.find(data.notifications.alerts,function(alert){return alert.key.toLowerCase().trim()===promoType.toLowerCase().trim();});if(promoData){promoData['data']['image']=promoData['image'];promoData['data']['banner-link']=promoData['banner-link'];App.vent.trigger('show:promo-popup',{key:promoData['key'],data:promoData['data']});App.vent.trigger('hide:loader');}else{App.vent.trigger('hide:loader');}}).fail(function(){});},displayTandc:function(){$(window).load(function(){if($('.accordion-item')[0]){var href=window.location.href.split('#')[1];if($('#'+href+'.accordion-item')[0]){$('#'+href+'.accordion-item').addClass('active');$('#'+href+'.accordion-item').prev('h3').addClass('active');$("html, body").animate({scrollTop:$('#'+href).offset().top-260},1000);}}})},launchMyAccount:function(){if($('.main-nav .menu-wrapper.active').length){$('a[href$="#closeMenu"]').trigger('click');}
if(!$('.account-area-general')[0]){$('html').addClass('no-scroll');App.vent.trigger('show:user-account');}else{$('.my-account-area').addClass('active');$('html').addClass('no-scroll');App.UserAccountModule.userAccountView.backToGeneral();}},showReasons:function(){App.vent.trigger('show:reasons');},uploadDocuments:function(){App.vent.trigger('show:upload-docs-popover');},launchEasterEgg:function(){if(App.CrackTheEgg.crackTheEggModel.get('eggists','true')){App.vent.trigger('display:crack-egg');}},launchSearch:function(){App.vent.trigger('show:search');}});App.appRouter=new Marionette.AppRouter({controller:new AppController(),appRoutes:{'gameplay/:id':'showGame','gameplay/:id/free':'showGameFree','sign-up':'launchRegistration','register':'launchRegistration','registrymcregistrationface':'launchRegistrationB','playcheck':'launchPlaycheck','transaction-history':'launchTransactionHistory','banking':'launchBanking','banking/game':'launchBankingFromGame','login':'launchLogin','banking-live':'launchBankingLiveCasino','tandc':'displayTandc','terms':'displayTandc','launch-game':'lauchGameDirect','promo-dotd':'launchDOTD','promo-ndb':'launchNDB','promo-wb':'launchWB','promo-wb-10':'launchWBTop10','promo-wb-30-spins':'launchWB30spins','promo-wb-200p-25-spins':'launchWB200p25spins','promo-wb-200p':'launchWB200p','promo-wb-150p-32-spins':'launchWB150p32spins','promo-wb-25-spins-BGT':'launchBonusWB25spinsBGT','promo-wb-25-spins-HyperGold':'launchBonusWB25spinsHyperGold','promo-wb-25-spins-9PotsOfGold':'launchBonusWB25spins9PotsOfGold','promo-wb-25-spins-FishingFloats':'launchBonusWB25spinsFishingFloats','promo-wb-25-spins-IAC':'launchBonusWB25spinsIAC','promo-wb-25-spins-JurassicWorld':'launchBonusWB25spinsJurassicWorld','promo-wb-25-spins-GoldBlitz':'launchBonusWB25spinsGoldBlitz','promo-wb-25-spins-BisonMoon':'launchBonusWB25spinsBisonMoon','promo-wb-25-spins-CatClans2':'launchBonusWB25spinsCatClans2','promo-dotd-static':'launchDOTDStatic','promo-red-rewards':'launchRedRewards','promo-red-rewards-second':'launchRedRewardsSecond','easter-egg':'launchEasterEgg','subscription-centre':'launchSubscription','subscription-centre/:user/:sid/:shacode':'launchSubscriptionDirect','set-deposit-limit':'launchDepositLimit','document-verification':'launchDocumentVerification','address-verification':'launchAddressVerification','forgotten-password':'forgottenPasswordStep1','forgotten-password/verify/:code':'forgottenPasswordStep2','account':'launchMyAccount','reasons':'showReasons','upload-documents':'uploadDocuments','promo-wba/:id':'launchWBGeneral','search':'launchSearch'}});Backbone.history.on('route',_.bind(function(router,route){if(route=="index"){App.vent.trigger('show:indexPage');}},this));var countriesAndState={"Afghanistan":"Badakhshan|Badghis|Baghlan|Balkh|Bamian|Farah|Faryab|Ghazni|Ghowr|Helmand|Herat|Jowzjan|Kabol|Kandahar|Kapisa|Konar|Kondoz|Laghman|Lowgar|Nangarhar|Nimruz|Oruzgan|Paktia|Paktika|Parvan|Samangan|Sar-e Pol|Takhar|Vardak|Zabol","Albania":"Berat|Bulqize|Delvine|Devoll (Bilisht)|Diber (Peshkopi)|Durres|Elbasan|Fier|Gjirokaster|Gramsh|Has (Krume)|Kavaje|Kolonje (Erseke)|Korce|Kruje|Kucove|Kukes|Kurbin|Lezhe|Librazhd|Lushnje|Malesi e Madhe (Koplik)|Mallakaster (Ballsh)|Mat (Burrel)|Mirdite (Rreshen)|Peqin|Permet|Pogradec|Puke|Sarande|Shkoder|Skrapar (Corovode)|Tepelene|Tirane (Tirana)|Tirane (Tirana)|Tropoje (Bajram Curri)|Vlore","Algeria":"Adrar|Ain Defla|Ain Temouchent|Alger|Annaba|Batna|Bechar|Bejaia|Biskra|Blida|Bordj Bou Arreridj|Bouira|Boumerdes|Chlef|Constantine|Djelfa|El Bayadh|El Oued|El Tarf|Ghardaia|Guelma|Illizi|Jijel|Khenchela|Laghouat|M'Sila|Mascara|Medea|Mila|Mostaganem|Naama|Oran|Ouargla|Oum el Bouaghi|Relizane|Saida|Setif|Sidi Bel Abbes|Skikda|Souk Ahras|Tamanghasset|Tebessa|Tiaret|Tindouf|Tipaza|Tissemsilt|Tizi Ouzou|Tlemcen","American Samoa":"Eastern|Manu'a|Rose Island|Swains Island|Western","Angola":"Andorra la Vella|Bengo|Benguela|Bie|Cabinda|Canillo|Cuando Cubango|Cuanza Norte|Cuanza Sul|Cunene|Encamp|Escaldes-Engordany|Huambo|Huila|La Massana|Luanda|Lunda Norte|Lunda Sul|Malanje|Moxico|Namibe|Ordino|Sant Julia de Loria|Uige|Zaire","Anguilla":"Anguilla","Antartica":"Antartica","Antigua and Barbuda":"Barbuda|Redonda|Saint George|Saint John|Saint Mary|Saint Paul|Saint Peter|Saint Philip","Argentina":"Antartica e Islas del Atlantico Sur|Buenos Aires|Buenos Aires Capital Federal|Catamarca|Chaco|Chubut|Cordoba|Corrientes|Entre Rios|Formosa|Jujuy|La Pampa|La Rioja|Mendoza|Misiones|Neuquen|Rio Negro|Salta|San Juan|San Luis|Santa Cruz|Santa Fe|Santiago del Estero|Tierra del Fuego|Tucuman","Armenia":"Aragatsotn|Ararat|Armavir|Geghark'unik'|Kotayk'|Lorri|Shirak|Syunik'|Tavush|Vayots' Dzor|Yerevan","Aruba":"Aruba","Ashmore and Cartier Island":"Ashmore and Cartier Island","Australia":"Australian Capital Territory|New South Wales|Northern Territory|Queensland|South Australia|Tasmania|Victoria|Western Australia","Austria":"Burgenland|Kaernten|Niederoesterreich|Oberoesterreich|Salzburg|Steiermark|Tirol|Vorarlberg|Wien","Azerbaijan":"Abseron Rayonu|Agcabadi Rayonu|Agdam Rayonu|Agdas Rayonu|Agstafa Rayonu|Agsu Rayonu|Ali Bayramli Sahari|Astara Rayonu|Baki Sahari|Balakan Rayonu|Barda Rayonu|Beylaqan Rayonu|Bilasuvar Rayonu|Cabrayil Rayonu|Calilabad Rayonu|Daskasan Rayonu|Davaci Rayonu|Fuzuli Rayonu|Gadabay Rayonu|Ganca Sahari|Goranboy Rayonu|Goycay Rayonu|Haciqabul Rayonu|Imisli Rayonu|Ismayilli Rayonu|Kalbacar Rayonu|Kurdamir Rayonu|Lacin Rayonu|Lankaran Rayonu|Lankaran Sahari|Lerik Rayonu|Masalli Rayonu|Mingacevir Sahari|Naftalan Sahari|Naxcivan Muxtar Respublikasi|Neftcala Rayonu|Oguz Rayonu|Qabala Rayonu|Qax Rayonu|Qazax Rayonu|Qobustan Rayonu|Quba Rayonu|Qubadli Rayonu|Qusar Rayonu|Saatli Rayonu|Sabirabad Rayonu|Saki Rayonu|Saki Sahari|Salyan Rayonu|Samaxi Rayonu|Samkir Rayonu|Samux Rayonu|Siyazan Rayonu|Sumqayit Sahari|Susa Rayonu|Susa Sahari|Tartar Rayonu|Tovuz Rayonu|Ucar Rayonu|Xacmaz Rayonu|Xankandi Sahari|Xanlar Rayonu|Xizi Rayonu|Xocali Rayonu|Xocavand Rayonu|Yardimli Rayonu|Yevlax Rayonu|Yevlax Sahari|Zangilan Rayonu|Zaqatala Rayonu|Zardab Rayonu","Bahamas":"Acklins and Crooked Islands|Bimini|Cat Island|Exuma|Freeport|Fresh Creek|Governor's Harbour|Green Turtle Cay|Harbour Island|High Rock|Inagua|Kemps Bay|Long Island|Marsh Harbour|Mayaguana|New Providence|Nicholls Town and Berry Islands|Ragged Island|Rock Sound|San Salvador and Rum Cay|Sandy Point","Bahrain":"Al Hadd|Al Manamah|Al Mintaqah al Gharbiyah|Al Mintaqah al Wusta|Al Mintaqah ash Shamaliyah|Al Muharraq|Ar Rifa' wa al Mintaqah al Janubiyah|Jidd Hafs|Juzur Hawar|Madinat 'Isa|Madinat Hamad|Sitrah","Bangladesh":"Barguna|Barisal|Bhola|Jhalokati|Patuakhali|Pirojpur|Bandarban|Brahmanbaria|Chandpur|Chittagong|Comilla|Cox's Bazar|Feni|Khagrachari|Lakshmipur|Noakhali|Rangamati|Dhaka|Faridpur|Gazipur|Gopalganj|Jamalpur|Kishoreganj|Madaripur|Manikganj|Munshiganj|Mymensingh|Narayanganj|Narsingdi|Netrokona|Rajbari|Shariatpur|Sherpur|Tangail|Bagerhat|Chuadanga|Jessore|Jhenaidah|Khulna|Kushtia|Magura|Meherpur|Narail|Satkhira|Bogra|Dinajpur|Gaibandha|Jaipurhat|Kurigram|Lalmonirhat|Naogaon|Natore|Nawabganj|Nilphamari|Pabna|Panchagarh|Rajshahi|Rangpur|Sirajganj|Thakurgaon|Habiganj|Maulvi bazar|Sunamganj|Sylhet","Barbados":"Bridgetown|Christ Church|Saint Andrew|Saint George|Saint James|Saint John|Saint Joseph|Saint Lucy|Saint Michael|Saint Peter|Saint Philip|Saint Thomas","Belarus":"Brestskaya (Brest)|Homyel'skaya (Homyel')|Horad Minsk|Hrodzyenskaya (Hrodna)|Mahilyowskaya (Mahilyow)|Minskaya|Vitsyebskaya (Vitsyebsk)","Belgium":"Antwerpen|Brabant Wallon|Brussels Capitol Region|Hainaut|Liege|Limburg|Luxembourg|Namur|Oost-Vlaanderen|Vlaams Brabant|West-Vlaanderen","Belize":"Belize|Cayo|Corozal|Orange Walk|Stann Creek|Toledo","Benin":"Alibori|Atakora|Atlantique|Borgou|Collines|Couffo|Donga|Littoral|Mono|Oueme|Plateau|Zou","Bermuda":"Devonshire|Hamilton|Hamilton|Paget|Pembroke|Saint George|Saint Georges|Sandys|Smiths|Southampton|Warwick","Bhutan":"Bumthang|Chhukha|Chirang|Daga|Geylegphug|Ha|Lhuntshi|Mongar|Paro|Pemagatsel|Punakha|Samchi|Samdrup Jongkhar|Shemgang|Tashigang|Thimphu|Tongsa|Wangdi Phodrang","Bolivia":"Beni|Chuquisaca|Cochabamba|La Paz|Oruro|Pando|Potosi|Santa Cruz|Tarija","Bosnia and Herzegovina":"Federation of Bosnia and Herzegovina|Republika Srpska","Botswana":"Central|Chobe|Francistown|Gaborone|Ghanzi|Kgalagadi|Kgatleng|Kweneng|Lobatse|Ngamiland|North-East|Selebi-Pikwe|South-East|Southern","Brazil":"Acre|Alagoas|Amapa|Amazonas|Bahia|Ceara|Distrito Federal|Espirito Santo|Goias|Maranhao|Mato Grosso|Mato Grosso do Sul|Minas Gerais|Para|Paraiba|Parana|Pernambuco|Piaui|Rio de Janeiro|Rio Grande do Norte|Rio Grande do Sul|Rondonia|Roraima|Santa Catarina|Sao Paulo|Sergipe|Tocantins","British Virgin Islands":"Anegada|Jost Van Dyke|Tortola|Virgin Gorda","Brunei":"Belait|Brunei and Muara|Temburong|Tutong","Bulgaria":"Blagoevgrad|Burgas|Dobrich|Gabrovo|Khaskovo|Kurdzhali|Kyustendil|Lovech|Montana|Pazardzhik|Pernik|Pleven|Plovdiv|Razgrad|Ruse|Shumen|Silistra|Sliven|Smolyan|Sofiya|Sofiya-Grad|Stara Zagora|Turgovishte|Varna|Veliko Turnovo|Vidin|Vratsa|Yambol","Burkina Faso":"Bale|Bam|Banwa|Bazega|Bougouriba|Boulgou|Boulkiemde|Comoe|Ganzourgou|Gnagna|Gourma|Houet|Ioba|Kadiogo|Kenedougou|Komandjari|Kompienga|Kossi|Koupelogo|Kouritenga|Kourweogo|Leraba|Loroum|Mouhoun|Nahouri|Namentenga|Naumbiel|Nayala|Oubritenga|Oudalan|Passore|Poni|Samentenga|Sanguie|Seno|Sissili|Soum|Sourou|Tapoa|Tuy|Yagha|Yatenga|Ziro|Zondomo|Zoundweogo","Burma":"Ayeyarwady|Bago|Chin State|Kachin State|Kayah State|Kayin State|Magway|Mandalay|Mon State|Rakhine State|Sagaing|Shan State|Tanintharyi|Yangon","Burundi":"Bubanza|Bujumbura|Bururi|Cankuzo|Cibitoke|Gitega|Karuzi|Kayanza|Kirundo|Makamba|Muramvya|Muyinga|Mwaro|Ngozi|Rutana|Ruyigi","Cambodia":"Banteay Mean Cheay|Batdambang|Kampong Cham|Kampong Chhnang|Kampong Spoe|Kampong Thum|Kampot|Kandal|Kaoh Kong|Keb|Kracheh|Mondol Kiri|Otdar Mean Cheay|Pailin|Phnum Penh|Pouthisat|Preah Seihanu (Sihanoukville)|Preah Vihear|Prey Veng|Rotanah Kiri|Siem Reab|Stoeng Treng|Svay Rieng|Takev","Cameroon":"Adamaoua|Centre|Est|Extreme-Nord|Littoral|Nord|Nord-Ouest|Ouest|Sud|Sud-Ouest","Canada":"Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon Territory","Cape Verde":"Boa Vista|Brava|Maio|Mosteiros|Paul|Porto Novo|Praia|Ribeira Grande|Sal|Santa Catarina|Santa Cruz|Sao Domingos|Sao Filipe|Sao Nicolau|Sao Vicente|Tarrafal","Cayman Islands":"Creek|Eastern|Midland|South Town|Spot Bay|Stake Bay|West End|Western","Central African Republic":"Bamingui-Bangoran|Bangui|Basse-Kotto|Gribingui|Haut-Mbomou|Haute-Kotto|Haute-Sangha|Kemo-Gribingui|Lobaye|Mbomou|Nana-Mambere|Ombella-Mpoko|Ouaka|Ouham|Ouham-Pende|Sangha|Vakaga","Chad":"Batha|Biltine|Borkou-Ennedi-Tibesti|Chari-Baguirmi|Guera|Kanem|Lac|Logone Occidental|Logone Oriental|Mayo-Kebbi|Moyen-Chari|Ouaddai|Salamat|Tandjile","Chile":"Aisen del General Carlos Ibanez del Campo|Antofagasta|Araucania|Atacama|Bio-Bio|Coquimbo|Libertador General Bernardo O'Higgins|Los Lagos|Magallanes y de la Antartica Chilena|Maule|Region Metropolitana (Santiago)|Tarapaca|Valparaiso","China":"Anhui|Beijing|Chongqing|Fujian|Gansu|Guangdong|Guangxi|Guizhou|Hainan|Hebei|Heilongjiang|Henan|Hubei|Hunan|Jiangsu|Jiangxi|Jilin|Liaoning|Nei Mongol|Ningxia|Qinghai|Shaanxi|Shandong|Shanghai|Shanxi|Sichuan|Tianjin|Xinjiang|Xizang (Tibet)|Yunnan|Zhejiang","Christmas Island":"Christmas Island","Clipperton Island":"Clipperton Island","Cocos (Keeling) Islands":"Direction Island|Home Island|Horsburgh Island|North Keeling Island|South Island|West Island","Colombia":"Amazonas|Antioquia|Arauca|Atlantico|Bolivar|Boyaca|Caldas|Caqueta|Casanare|Cauca|Cesar|Choco|Cordoba|Cundinamarca|Distrito Capital de Santa Fe de Bogota|Guainia|Guaviare|Huila|La Guajira|Magdalena|Meta|Narino|Norte de Santander|Putumayo|Quindio|Risaralda|San Andres y Providencia|Santander|Sucre|Tolima|Valle del Cauca|Vaupes|Vichada","Comoros":"Anjouan (Nzwani)|Domoni|Fomboni|Grande Comore (Njazidja)|Moheli (Mwali)|Moroni|Moutsamoudou","Congo, The Democratic ...":"Bandundu|Bas-Congo|Equateur|Kasai-Occidental|Kasai-Oriental|Katanga|Kinshasa|Maniema|Nord-Kivu|Orientale|Sud-Kivu","Congo":"Bouenza|Brazzaville|Cuvette|Kouilou|Lekoumou|Likouala|Niari|Plateaux|Pool|Sangha","Cook Islands":"Aitutaki|Atiu|Avarua|Mangaia|Manihiki|Manuae|Mauke|Mitiaro|Nassau Island|Palmerston|Penrhyn|Pukapuka|Rakahanga|Rarotonga|Suwarrow|Takutea","Costa Rica":"Alajuela|Cartago|Guanacaste|Heredia|Limon|Puntarenas|San Jose","Cote d'Ivoire":"Abengourou|Abidjan|Aboisso|Adiake'|Adzope|Agboville|Agnibilekrou|Ale'pe'|Bangolo|Beoumi|Biankouma|Bocanda|Bondoukou|Bongouanou|Bouafle|Bouake|Bouna|Boundiali|Dabakala|Dabon|Daloa|Danane|Daoukro|Dimbokro|Divo|Duekoue|Ferkessedougou|Gagnoa|Grand Bassam|Grand-Lahou|Guiglo|Issia|Jacqueville|Katiola|Korhogo|Lakota|Man|Mankono|Mbahiakro|Odienne|Oume|Sakassou|San-Pedro|Sassandra|Seguela|Sinfra|Soubre|Tabou|Tanda|Tiassale|Tiebissou|Tingrela|Touba|Toulepleu|Toumodi|Vavoua|Yamoussoukro|Zuenoula","Croatia":"Bjelovarsko-Bilogorska Zupanija|Brodsko-Posavska Zupanija|Dubrovacko-Neretvanska Zupanija|Istarska Zupanija|Karlovacka Zupanija|Koprivnicko-Krizevacka Zupanija|Krapinsko-Zagorska Zupanija|Licko-Senjska Zupanija|Medimurska Zupanija|Osjecko-Baranjska Zupanija|Pozesko-Slavonska Zupanija|Primorsko-Goranska Zupanija|Sibensko-Kninska Zupanija|Sisacko-Moslavacka Zupanija|Splitsko-Dalmatinska Zupanija|Varazdinska Zupanija|Viroviticko-Podravska Zupanija|Vukovarsko-Srijemska Zupanija|Zadarska Zupanija|Zagreb|Zagrebacka Zupanija","Cuba":"Camaguey|Ciego de Avila|Cienfuegos|Ciudad de La Habana|Granma|Guantanamo|Holguin|Isla de la Juventud|La Habana|Las Tunas|Matanzas|Pinar del Rio|Sancti Spiritus|Santiago de Cuba|Villa Clara","Cyprus":"Famagusta|Kyrenia|Larnaca|Limassol|Nicosia|Paphos","Czeck Republic":"Brnensky|Budejovicky|Jihlavsky|Karlovarsky|Kralovehradecky|Liberecky|Olomoucky|Ostravsky|Pardubicky|Plzensky|Praha|Stredocesky|Ustecky|Zlinsky","Denmark":"Arhus|Bornholm|Fredericksberg|Frederiksborg|Fyn|Kobenhavn|Kobenhavns|Nordjylland|Ribe|Ringkobing|Roskilde|Sonderjylland|Storstrom|Vejle|Vestsjalland|Viborg","Djibouti":"'Ali Sabih|Dikhil|Djibouti|Obock|Tadjoura","Dominica":"Saint Andrew|Saint David|Saint George|Saint John|Saint Joseph|Saint Luke|Saint Mark|Saint Patrick|Saint Paul|Saint Peter","Dominican Republic":"Azua|Baoruco|Barahona|Dajabon|Distrito Nacional|Duarte|El Seibo|Elias Pina|Espaillat|Hato Mayor|Independencia|La Altagracia|La Romana|La Vega|Maria Trinidad Sanchez|Monsenor Nouel|Monte Cristi|Monte Plata|Pedernales|Peravia|Puerto Plata|Salcedo|Samana|San Cristobal|San Juan|San Pedro de Macoris|Sanchez Ramirez|Santiago|Santiago Rodriguez|Valverde","Ecuador":"Azuay|Bolivar|Canar|Carchi|Chimborazo|Cotopaxi|El Oro|Esmeraldas|Galapagos|Guayas|Imbabura|Loja|Los Rios|Manabi|Morona-Santiago|Napo|Orellana|Pastaza|Pichincha|Sucumbios|Tungurahua|Zamora-Chinchipe","Egypt":"Ad Daqahliyah|Al Bahr al Ahmar|Al Buhayrah|Al Fayyum|Al Gharbiyah|Al Iskandariyah|Al Isma'iliyah|Al Jizah|Al Minufiyah|Al Minya|Al Qahirah|Al Qalyubiyah|Al Wadi al Jadid|As Suways|Ash Sharqiyah|Aswan|Asyut|Bani Suwayf|Bur Sa'id|Dumyat|Janub Sina'|Kafr ash Shaykh|Matruh|Qina|Shamal Sina'|Suhaj","El Salvador":"Ahuachapan|Cabanas|Chalatenango|Cuscatlan|La Libertad|La Paz|La Union|Morazan|San Miguel|San Salvador|San Vicente|Santa Ana|Sonsonate|Usulutan","Equatorial Guinea":"Annobon|Bioko Norte|Bioko Sur|Centro Sur|Kie-Ntem|Litoral|Wele-Nzas","Eritrea":"Akale Guzay|Barka|Denkel|Hamasen|Sahil|Semhar|Senhit|Seraye","Estonia":"Harjumaa (Tallinn)|Hiiumaa (Kardla)|Ida-Virumaa (Johvi)|Jarvamaa (Paide)|Jogevamaa (Jogeva)|Laane-Virumaa (Rakvere)|Laanemaa (Haapsalu)|Parnumaa (Parnu)|Polvamaa (Polva)|Raplamaa (Rapla)|Saaremaa (Kuessaare)|Tartumaa (Tartu)|Valgamaa (Valga)|Viljandimaa (Viljandi)|Vorumaa (Voru)","Ethiopia":"Adis Abeba (Addis Ababa)|Afar|Amara|Dire Dawa|Gambela Hizboch|Hareri Hizb|Oromiya|Sumale|Tigray|YeDebub Biheroch Bihereseboch na Hizboch","Europa Island":"Europa Island","Falkland Islands (Islas Malvinas)":"Falkland Islands (Islas Malvinas)","Faroe Islands":"Bordoy|Eysturoy|Mykines|Sandoy|Skuvoy|Streymoy|Suduroy|Tvoroyri|Vagar","Fiji":"Central|Eastern|Northern|Rotuma|Western","Finland":"Aland|Etela-Suomen Laani|Ita-Suomen Laani|Lansi-Suomen Laani|Lappi|Oulun Laani","France":"Alsace|Aquitaine|Auvergne|Basse-Normandie|Bourgogne|Bretagne|Centre|Champagne-Ardenne|Corse|Franche-Comte|Haute-Normandie|Ile-de-France|Languedoc-Roussillon|Limousin|Lorraine|Midi-Pyrenees|Nord-Pas-de-Calais|Pays de la Loire|Picardie|Poitou-Charentes|Provence-Alpes-Cote d'Azur|Rhone-Alpes","French Guiana":"French Guiana","French Polynesia":"Archipel des Marquises|Archipel des Tuamotu|Archipel des Tubuai|Iles du Vent|Iles Sous-le-Vent","French Southern and Antarctic Lands":"Adelie Land|Ile Crozet|Iles Kerguelen|Iles Saint-Paul et Amsterdam","Gabon":"Estuaire|Haut-Ogooue|Moyen-Ogooue|Ngounie|Nyanga|Ogooue-Ivindo|Ogooue-Lolo|Ogooue-Maritime|Woleu-Ntem","Gambia, The":"Banjul|Central River|Lower River|North Bank|Upper River|Western","Gaza Strip":"Gaza Strip","Georgia":"Abashis|Abkhazia or Ap'khazet'is Avtonomiuri Respublika (Sokhumi)|Adigenis|Ajaria or Acharis Avtonomiuri Respublika (Bat'umi)|Akhalgoris|Akhalk'alak'is|Akhalts'ikhis|Akhmetis|Ambrolauris|Aspindzis|Baghdat'is|Bolnisis|Borjomis|Ch'khorotsqus|Ch'okhatauris|Chiat'ura|Dedop'listsqaros|Dmanisis|Dushet'is|Gardabanis|Gori|Goris|Gurjaanis|Javis|K'arelis|K'ut'aisi|Kaspis|Kharagaulis|Khashuris|Khobis|Khonis|Lagodekhis|Lanch'khut'is|Lentekhis|Marneulis|Martvilis|Mestiis|Mts'khet'is|Ninotsmindis|Onis|Ozurget'is|P'ot'i|Qazbegis|Qvarlis|Rust'avi|Sach'kheris|Sagarejos|Samtrediis|Senakis|Sighnaghis|T'bilisi|T'elavis|T'erjolis|T'et'ritsqaros|T'ianet'is|Tqibuli|Ts'ageris|Tsalenjikhis|Tsalkis|Tsqaltubo|Vanis|Zestap'onis|Zugdidi|Zugdidis","Germany":"Baden-Wuerttemberg|Bayern|Berlin|Brandenburg|Bremen|Hamburg|Hessen|Mecklenburg-Vorpommern|Niedersachsen|Nordrhein-Westfalen|Rheinland-Pfalz|Saarland|Sachsen|Sachsen-Anhalt|Schleswig-Holstein|Thueringen","Ghana":"Ashanti|Brong-Ahafo|Central|Eastern|Greater Accra|Northern|Upper East|Upper West|Volta|Western","Gibraltar":"Gibraltar","Glorioso Islands":"Ile du Lys|Ile Glorieuse","Greece":"Aitolia kai Akarnania|Akhaia|Argolis|Arkadhia|Arta|Attiki|Ayion Oros (Mt. Athos)|Dhodhekanisos|Drama|Evritania|Evros|Evvoia|Florina|Fokis|Fthiotis|Grevena|Ilia|Imathia|Ioannina|Irakleion|Kardhitsa|Kastoria|Kavala|Kefallinia|Kerkyra|Khalkidhiki|Khania|Khios|Kikladhes|Kilkis|Korinthia|Kozani|Lakonia|Larisa|Lasithi|Lesvos|Levkas|Magnisia|Messinia|Pella|Pieria|Preveza|Rethimni|Rodhopi|Samos|Serrai|Thesprotia|Thessaloniki|Trikala|Voiotia|Xanthi|Zakinthos","Greenland":"Avannaa (Nordgronland)|Kitaa (Vestgronland)|Tunu (Ostgronland)","Grenada":"Carriacou and Petit Martinique|Saint Andrew|Saint David|Saint George|Saint John|Saint Mark|Saint Patrick","Guadeloupe":"Basse-Terre|Grande-Terre|Iles de la Petite Terre|Iles des Saintes|Marie-Galante","Guam":"Guam","Guatemala":"Alta Verapaz|Baja Verapaz|Chimaltenango|Chiquimula|El Progreso|Escuintla|Guatemala|Huehuetenango|Izabal|Jalapa|Jutiapa|Peten|Quetzaltenango|Quiche|Retalhuleu|Sacatepequez|San Marcos|Santa Rosa|Solola|Suchitepequez|Totonicapan|Zacapa","Guernsey":"Castel|Forest|St. Andrew|St. Martin|St. Peter Port|St. Pierre du Bois|St. Sampson|St. Saviour|Torteval|Vale","Guinea":"Beyla|Boffa|Boke|Conakry|Coyah|Dabola|Dalaba|Dinguiraye|Dubreka|Faranah|Forecariah|Fria|Gaoual|Gueckedou|Kankan|Kerouane|Kindia|Kissidougou|Koubia|Koundara|Kouroussa|Labe|Lelouma|Lola|Macenta|Mali|Mamou|Mandiana|Nzerekore|Pita|Siguiri|Telimele|Tougue|Yomou","Guinea-Bissau":"Bafata|Biombo|Bissau|Bolama-Bijagos|Cacheu|Gabu|Oio|Quinara|Tombali","Guyana":"Barima-Waini|Cuyuni-Mazaruni|Demerara-Mahaica|East Berbice-Corentyne|Essequibo Islands-West Demerara|Mahaica-Berbice|Pomeroon-Supenaam|Potaro-Siparuni|Upper Demerara-Berbice|Upper Takutu-Upper Essequibo","Haiti":"Artibonite|Centre|Grand'Anse|Nord|Nord-Est|Nord-Ouest|Ouest|Sud|Sud-Est","Heard Island and McDonald Islands":"Heard Island and McDonald Islands","Holy See (Vatican City)":"Holy See (Vatican City)","Honduras":"Atlantida|Choluteca|Colon|Comayagua|Copan|Cortes|El Paraiso|Francisco Morazan|Gracias a Dios|Intibuca|Islas de la Bahia|La Paz|Lempira|Ocotepeque|Olancho|Santa Barbara|Valle|Yoro","Hong Kong":"Hong Kong","Howland Island":"Howland Island","Hungary":"Bacs-Kiskun|Baranya|Bekes|Bekescsaba|Borsod-Abauj-Zemplen|Budapest|Csongrad|Debrecen|Dunaujvaros|Eger|Fejer|Gyor|Gyor-Moson-Sopron|Hajdu-Bihar|Heves|Hodmezovasarhely|Jasz-Nagykun-Szolnok|Kaposvar|Kecskemet|Komarom-Esztergom|Miskolc|Nagykanizsa|Nograd|Nyiregyhaza|Pecs|Pest|Somogy|Sopron|Szabolcs-Szatmar-Bereg|Szeged|Szekesfehervar|Szolnok|Szombathely|Tatabanya|Tolna|Vas|Veszprem|Veszprem|Zala|Zalaegerszeg","Iceland":"Akranes|Akureyri|Arnessysla|Austur-Bardhastrandarsysla|Austur-Hunavatnssysla|Austur-Skaftafellssysla|Borgarfjardharsysla|Dalasysla|Eyjafjardharsysla|Gullbringusysla|Hafnarfjordhur|Husavik|Isafjordhur|Keflavik|Kjosarsysla|Kopavogur|Myrasysla|Neskaupstadhur|Nordhur-Isafjardharsysla|Nordhur-Mulasys-la|Nordhur-Thingeyjarsysla|Olafsfjordhur|Rangarvallasysla|Reykjavik|Saudharkrokur|Seydhisfjordhur|Siglufjordhur|Skagafjardharsysla|Snaefellsnes-og Hnappadalssysla|Strandasysla|Sudhur-Mulasysla|Sudhur-Thingeyjarsysla|Vesttmannaeyjar|Vestur-Bardhastrandarsysla|Vestur-Hunavatnssysla|Vestur-Isafjardharsysla|Vestur-Skaftafellssysla","India":"Andaman and Nicobar Islands|Andhra Pradesh|Arunachal Pradesh|Assam|Bihar|Chandigarh|Chhattisgarh|Dadra and Nagar Haveli|Daman and Diu|Delhi|Goa|Gujarat|Haryana|Himachal Pradesh|Jammu and Kashmir|Jharkhand|Karnataka|Kerala|Lakshadweep|Madhya Pradesh|Maharashtra|Manipur|Meghalaya|Mizoram|Nagaland|Orissa|Pondicherry|Punjab|Rajasthan|Sikkim|Tamil Nadu|Tripura|Uttar Pradesh|Uttaranchal|West Bengal","Indonesia":"Aceh|Bali|Banten|Bengkulu|East Timor|Gorontalo|Irian Jaya|Jakarta Raya|Jambi|Jawa Barat|Jawa Tengah|Jawa Timur|Kalimantan Barat|Kalimantan Selatan|Kalimantan Tengah|Kalimantan Timur|Kepulauan Bangka Belitung|Lampung|Maluku|Maluku Utara|Nusa Tenggara Barat|Nusa Tenggara Timur|Riau|Sulawesi Selatan|Sulawesi Tengah|Sulawesi Tenggara|Sulawesi Utara|Sumatera Barat|Sumatera Selatan|Sumatera Utara|Yogyakarta","Iran":"Ardabil|Azarbayjan-e Gharbi|Azarbayjan-e Sharqi|Bushehr|Chahar Mahall va Bakhtiari|Esfahan|Fars|Gilan|Golestan|Hamadan|Hormozgan|Ilam|Kerman|Kermanshah|Khorasan|Khuzestan|Kohgiluyeh va Buyer Ahmad|Kordestan|Lorestan|Markazi|Mazandaran|Qazvin|Qom|Semnan|Sistan va Baluchestan|Tehran|Yazd|Zanjan","Iraq":"Al Anbar|Al Basrah|Al Muthanna|Al Qadisiyah|An Najaf|Arbil|As Sulaymaniyah|At Ta'mim|Babil|Baghdad|Dahuk|Dhi Qar|Diyala|Karbala'|Maysan|Ninawa|Salah ad Din|Wasit","Ireland":"Carlow|Cavan|Clare|Cork|Donegal|Dublin|Galway|Kerry|Kildare|Kilkenny|Laois|Leitrim|Limerick|Longford|Louth|Mayo|Meath|Monaghan|Offaly|Roscommon|Sligo|Tipperary|Waterford|Westmeath|Wexford|Wicklow","Ireland, Northern":"Antrim|Ards|Armagh|Ballymena|Ballymoney|Banbridge|Belfast|Carrickfergus|Castlereagh|Coleraine|Cookstown|Craigavon|Derry|Down|Dungannon|Fermanagh|Larne|Limavady|Lisburn|Magherafelt|Moyle|Newry and Mourne|Newtownabbey|North Down|Omagh|Strabane","Israel":"Central|Haifa|Jerusalem|Northern|Southern|Tel Aviv","Italy":"Abruzzo|Basilicata|Calabria|Campania|Emilia-Romagna|Friuli-Venezia Giulia|Lazio|Liguria|Lombardia|Marche|Molise|Piemonte|Puglia|Sardegna|Sicilia|Toscana|Trentino-Alto Adige|Umbria|Valle d'Aosta|Veneto","Jamaica":"Clarendon|Hanover|Kingston|Manchester|Portland|Saint Andrew|Saint Ann|Saint Catherine|Saint Elizabeth|Saint James|Saint Mary|Saint Thomas|Trelawny|Westmoreland","Jan Mayen":"Jan Mayen","Japan":"Aichi|Akita|Aomori|Chiba|Ehime|Fukui|Fukuoka|Fukushima|Gifu|Gumma|Hiroshima|Hokkaido|Hyogo|Ibaraki|Ishikawa|Iwate|Kagawa|Kagoshima|Kanagawa|Kochi|Kumamoto|Kyoto|Mie|Miyagi|Miyazaki|Nagano|Nagasaki|Nara|Niigata|Oita|Okayama|Okinawa|Osaka|Saga|Saitama|Shiga|Shimane|Shizuoka|Tochigi|Tokushima|Tokyo|Tottori|Toyama|Wakayama|Yamagata|Yamaguchi|Yamanashi","Jarvis Island":"Jarvis Island","Jersey":"Jersey","Johnston Atoll":"Johnston Atoll","Jordan":"'Amman|Ajlun|Al 'Aqabah|Al Balqa'|Al Karak|Al Mafraq|At Tafilah|Az Zarqa'|Irbid|Jarash|Ma'an|Madaba","Juan de Nova Island":"Juan de Nova Island","Kazakhstan":"Almaty|Aqmola|Aqtobe|Astana|Atyrau|Batys Qazaqstan|Bayqongyr|Mangghystau|Ongtustik Qazaqstan|Pavlodar|Qaraghandy|Qostanay|Qyzylorda|Shyghys Qazaqstan|Soltustik Qazaqstan|Zhambyl","Kenya":"Central|Coast|Eastern|Nairobi Area|North Eastern|Nyanza|Rift Valley|Western","Kiribati":"Abaiang|Abemama|Aranuka|Arorae|Banaba|Banaba|Beru|Butaritari|Central Gilberts|Gilbert Islands|Kanton|Kiritimati|Kuria|Line Islands|Line Islands|Maiana|Makin|Marakei|Nikunau|Nonouti|Northern Gilberts|Onotoa|Phoenix Islands|Southern Gilberts|Tabiteuea|Tabuaeran|Tamana|Tarawa|Tarawa|Teraina","Korea, North":"Chagang-do (Chagang Province)|Hamgyong-bukto (North Hamgyong Province)|Hamgyong-namdo (South Hamgyong Province)|Hwanghae-bukto (North Hwanghae Province)|Hwanghae-namdo (South Hwanghae Province)|Kaesong-si (Kaesong City)|Kangwon-do (Kangwon Province)|Namp'o-si (Namp'o City)|P'yongan-bukto (North P'yongan Province)|P'yongan-namdo (South P'yongan Province)|P'yongyang-si (P'yongyang City)|Yanggang-do (Yanggang Province)","Korea, South":"Ch'ungch'ong-bukto|Ch'ungch'ong-namdo|Cheju-do|Cholla-bukto|Cholla-namdo|Inch'on-gwangyoksi|Kangwon-do|Kwangju-gwangyoksi|Kyonggi-do|Kyongsang-bukto|Kyongsang-namdo|Pusan-gwangyoksi|Soul-t'ukpyolsi|Taegu-gwangyoksi|Taejon-gwangyoksi|Ulsan-gwangyoksi","Kuwait":"Al 'Asimah|Al Ahmadi|Al Farwaniyah|Al Jahra'|Hawalli","Kyrgyzstan":"Batken Oblasty|Bishkek Shaary|Chuy Oblasty (Bishkek)|Jalal-Abad Oblasty|Naryn Oblasty|Osh Oblasty|Talas Oblasty|Ysyk-Kol Oblasty (Karakol)","Laos":"Attapu|Bokeo|Bolikhamxai|Champasak|Houaphan|Khammouan|Louangnamtha|Louangphabang|Oudomxai|Phongsali|Salavan|Savannakhet|Viangchan|Viangchan|Xaignabouli|Xaisomboun|Xekong|Xiangkhoang","Latvia":"Aizkraukles Rajons|Aluksnes Rajons|Balvu Rajons|Bauskas Rajons|Cesu Rajons|Daugavpils|Daugavpils Rajons|Dobeles Rajons|Gulbenes Rajons|Jekabpils Rajons|Jelgava|Jelgavas Rajons|Jurmala|Kraslavas Rajons|Kuldigas Rajons|Leipaja|Liepajas Rajons|Limbazu Rajons|Ludzas Rajons|Madonas Rajons|Ogres Rajons|Preilu Rajons|Rezekne|Rezeknes Rajons|Riga|Rigas Rajons|Saldus Rajons|Talsu Rajons|Tukuma Rajons|Valkas Rajons|Valmieras Rajons|Ventspils|Ventspils Rajons","Lebanon":"Beyrouth|Ech Chimal|Ej Jnoub|El Bekaa|Jabal Loubnane","Lesotho":"Berea|Butha-Buthe|Leribe|Mafeteng|Maseru|Mohales Hoek|Mokhotlong|Qacha's Nek|Quthing|Thaba-Tseka","Liberia":"Bomi|Bong|Grand Bassa|Grand Cape Mount|Grand Gedeh|Grand Kru|Lofa|Margibi|Maryland|Montserrado|Nimba|River Cess|Sinoe","Libya":"Ajdabiya|Al 'Aziziyah|Al Fatih|Al Jabal al Akhdar|Al Jufrah|Al Khums|Al Kufrah|An Nuqat al Khams|Ash Shati'|Awbari|Az Zawiyah|Banghazi|Darnah|Ghadamis|Gharyan|Misratah|Murzuq|Sabha|Sawfajjin|Surt|Tarabulus|Tarhunah|Tubruq|Yafran|Zlitan","Liechtenstein":"Balzers|Eschen|Gamprin|Mauren|Planken|Ruggell|Schaan|Schellenberg|Triesen|Triesenberg|Vaduz","Lithuania":"Akmenes Rajonas|Alytaus Rajonas|Alytus|Anyksciu Rajonas|Birstonas|Birzu Rajonas|Druskininkai|Ignalinos Rajonas|Jonavos Rajonas|Joniskio Rajonas|Jurbarko Rajonas|Kaisiadoriu Rajonas|Kaunas|Kauno Rajonas|Kedainiu Rajonas|Kelmes Rajonas|Klaipeda|Klaipedos Rajonas|Kretingos Rajonas|Kupiskio Rajonas|Lazdiju Rajonas|Marijampole|Marijampoles Rajonas|Mazeikiu Rajonas|Moletu Rajonas|Neringa Pakruojo Rajonas|Palanga|Panevezio Rajonas|Panevezys|Pasvalio Rajonas|Plunges Rajonas|Prienu Rajonas|Radviliskio Rajonas|Raseiniu Rajonas|Rokiskio Rajonas|Sakiu Rajonas|Salcininku Rajonas|Siauliai|Siauliu Rajonas|Silales Rajonas|Silutes Rajonas|Sirvintu Rajonas|Skuodo Rajonas|Svencioniu Rajonas|Taurages Rajonas|Telsiu Rajonas|Traku Rajonas|Ukmerges Rajonas|Utenos Rajonas|Varenos Rajonas|Vilkaviskio Rajonas|Vilniaus Rajonas|Vilnius|Zarasu Rajonas","Luxembourg":"Diekirch|Grevenmacher|Luxembourg","Macau":"Macau","Macedonia, Former Yugoslav Republic of":"Aracinovo|Bac|Belcista|Berovo|Bistrica|Bitola|Blatec|Bogdanci|Bogomila|Bogovinje|Bosilovo|Brvenica|Cair (Skopje)|Capari|Caska|Cegrane|Centar (Skopje)|Centar Zupa|Cesinovo|Cucer-Sandevo|Debar|Delcevo|Delogozdi|Demir Hisar|Demir Kapija|Dobrusevo|Dolna Banjica|Dolneni|Dorce Petrov (Skopje)|Drugovo|Dzepciste|Gazi Baba (Skopje)|Gevgelija|Gostivar|Gradsko|Ilinden|Izvor|Jegunovce|Kamenjane|Karbinci|Karpos (Skopje)|Kavadarci|Kicevo|Kisela Voda (Skopje)|Klecevce|Kocani|Konce|Kondovo|Konopiste|Kosel|Kratovo|Kriva Palanka|Krivogastani|Krusevo|Kuklis|Kukurecani|Kumanovo|Labunista|Lipkovo|Lozovo|Lukovo|Makedonska Kamenica|Makedonski Brod|Mavrovi Anovi|Meseista|Miravci|Mogila|Murtino|Negotino|Negotino-Poloska|Novaci|Novo Selo|Oblesevo|Ohrid|Orasac|Orizari|Oslomej|Pehcevo|Petrovec|Plasnia|Podares|Prilep|Probistip|Radovis|Rankovce|Resen|Rosoman|Rostusa|Samokov|Saraj|Sipkovica|Sopiste|Sopotnika|Srbinovo|Star Dojran|Staravina|Staro Nagoricane|Stip|Struga|Strumica|Studenicani|Suto Orizari (Skopje)|Sveti Nikole|Tearce|Tetovo|Topolcani|Valandovo|Vasilevo|Veles|Velesta|Vevcani|Vinica|Vitoliste|Vranestica|Vrapciste|Vratnica|Vrutok|Zajas|Zelenikovo|Zileno|Zitose|Zletovo|Zrnovci","Madagascar":"Antananarivo|Antsiranana|Fianarantsoa|Mahajanga|Toamasina|Toliara","Malawi":"Balaka|Blantyre|Chikwawa|Chiradzulu|Chitipa|Dedza|Dowa|Karonga|Kasungu|Likoma|Lilongwe|Machinga (Kasupe)|Mangochi|Mchinji|Mulanje|Mwanza|Mzimba|Nkhata Bay|Nkhotakota|Nsanje|Ntcheu|Ntchisi|Phalombe|Rumphi|Salima|Thyolo|Zomba","Malaysia":"Johor|Kedah|Kelantan|Labuan|Melaka|Negeri Sembilan|Pahang|Perak|Perlis|Pulau Pinang|Sabah|Sarawak|Selangor|Terengganu|Wilayah Persekutuan","Maldives":"Alifu|Baa|Dhaalu|Faafu|Gaafu Alifu|Gaafu Dhaalu|Gnaviyani|Haa Alifu|Haa Dhaalu|Kaafu|Laamu|Lhaviyani|Maale|Meemu|Noonu|Raa|Seenu|Shaviyani|Thaa|Vaavu","Mali":"Gao|Kayes|Kidal|Koulikoro|Mopti|Segou|Sikasso|Tombouctou","Malta":"Valletta","Man, Isle of":"Man, Isle of","Marshall Islands":"Ailinginae|Ailinglaplap|Ailuk|Arno|Aur|Bikar|Bikini|Bokak|Ebon|Enewetak|Erikub|Jabat|Jaluit|Jemo|Kili|Kwajalein|Lae|Lib|Likiep|Majuro|Maloelap|Mejit|Mili|Namorik|Namu|Rongelap|Rongrik|Toke|Ujae|Ujelang|Utirik|Wotho|Wotje","Martinique":"Martinique","Mauritania":"Adrar|Assaba|Brakna|Dakhlet Nouadhibou|Gorgol|Guidimaka|Hodh Ech Chargui|Hodh El Gharbi|Inchiri|Nouakchott|Tagant|Tiris Zemmour|Trarza","Mauritius":"Agalega Islands|Black River|Cargados Carajos Shoals|Flacq|Grand Port|Moka|Pamplemousses|Plaines Wilhems|Port Louis|Riviere du Rempart|Rodrigues|Savanne","Mayotte":"Mayotte","Mexico":"Aguascalientes|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Coahuila de Zaragoza|Colima|Distrito Federal|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Mexico|Michoacan de Ocampo|Morelos|Nayarit|Nuevo Leon|Oaxaca|Puebla|Queretaro de Arteaga|Quintana Roo|San Luis Potosi|Sinaloa|Sonora|Tabasco|Tamaulipas|Tlaxcala|Veracruz-Llave|Yucatan|Zacatecas","Micronesia, Federated States of":"Chuuk (Truk)|Kosrae|Pohnpei|Yap","Midway Islands":"Midway Islands","Moldova":"Balti|Cahul|Chisinau|Chisinau|Dubasari|Edinet|Gagauzia|Lapusna|Orhei|Soroca|Tighina|Ungheni","Monaco":"Fontvieille|La Condamine|Monaco-Ville|Monte-Carlo","Mongolia":"Arhangay|Bayan-Olgiy|Bayanhongor|Bulgan|Darhan|Dornod|Dornogovi|Dundgovi|Dzavhan|Erdenet|Govi-Altay|Hentiy|Hovd|Hovsgol|Omnogovi|Ovorhangay|Selenge|Suhbaatar|Tov|Ulaanbaatar|Uvs","Montserrat":"Saint Anthony|Saint Georges|Saint Peter's","Morocco":"Agadir|Al Hoceima|Azilal|Ben Slimane|Beni Mellal|Boulemane|Casablanca|Chaouen|El Jadida|El Kelaa des Srarhna|Er Rachidia|Essaouira|Fes|Figuig|Guelmim|Ifrane|Kenitra|Khemisset|Khenifra|Khouribga|Laayoune|Larache|Marrakech|Meknes|Nador|Ouarzazate|Oujda|Rabat-Sale|Safi|Settat|Sidi Kacem|Tan-Tan|Tanger|Taounate|Taroudannt|Tata|Taza|Tetouan|Tiznit","Mozambique":"Cabo Delgado|Gaza|Inhambane|Manica|Maputo|Nampula|Niassa|Sofala|Tete|Zambezia","Namibia":"Caprivi|Erongo|Hardap|Karas|Khomas|Kunene|Ohangwena|Okavango|Omaheke|Omusati|Oshana|Oshikoto|Otjozondjupa","Nauru":"Aiwo|Anabar|Anetan|Anibare|Baiti|Boe|Buada|Denigomodu|Ewa|Ijuw|Meneng|Nibok|Uaboe|Yaren","Nepal":"Bagmati|Bheri|Dhawalagiri|Gandaki|Janakpur|Karnali|Kosi|Lumbini|Mahakali|Mechi|Narayani|Rapti|Sagarmatha|Seti","Netherlands":"Drenthe|Flevoland|Friesland|Gelderland|Groningen|Limburg|Noord-Brabant|Noord-Holland|Overijssel|Utrecht|Zeeland|Zuid-Holland","Netherlands Antilles":"Netherlands Antilles","New Caledonia":"Iles Loyaute|Nord|Sud","New Zealand":"Akaroa|Amuri|Ashburton|Bay of Islands|Bruce|Buller|Chatham Islands|Cheviot|Clifton|Clutha|Cook|Dannevirke|Egmont|Eketahuna|Ellesmere|Eltham|Eyre|Featherston|Franklin|Golden Bay|Great Barrier Island|Grey|Hauraki Plains|Hawera|Hawke's Bay|Heathcote|Hikurangi|Hobson|Hokianga|Horowhenua|Hurunui|Hutt|Inangahua|Inglewood|Kaikoura|Kairanga|Kiwitea|Lake|Mackenzie|Malvern|Manaia|Manawatu|Mangonui|Maniototo|Marlborough|Masterton|Matamata|Mount Herbert|Ohinemuri|Opotiki|Oroua|Otamatea|Otorohanga|Oxford|Pahiatua|Paparua|Patea|Piako|Pohangina|Raglan|Rangiora|Rangitikei|Rodney|Rotorua|Runanga|Saint Kilda|Silverpeaks|Southland|Stewart Island|Stratford|Strathallan|Taranaki|Taumarunui|Taupo|Tauranga|Thames-Coromandel|Tuapeka|Vincent|Waiapu|Waiheke|Waihemo|Waikato|Waikohu|Waimairi|Waimarino|Waimate|Waimate West|Waimea|Waipa|Waipawa|Waipukurau|Wairarapa South|Wairewa|Wairoa|Waitaki|Waitomo|Waitotara|Wallace|Wanganui|Waverley|Westland|Whakatane|Whangarei|Whangaroa|Woodville","Nicaragua":"Atlantico Norte|Atlantico Sur|Boaco|Carazo|Chinandega|Chontales|Esteli|Granada|Jinotega|Leon|Madriz|Managua|Masaya|Matagalpa|Nueva Segovia|Rio San Juan|Rivas","Niger":"Agadez|Diffa|Dosso|Maradi|Niamey|Tahoua|Tillaberi|Zinder","Nigeria":"Abia|Abuja Federal Capital Territory|Adamawa|Akwa Ibom|Anambra|Bauchi|Bayelsa|Benue|Borno|Cross River|Delta|Ebonyi|Edo|Ekiti|Enugu|Gombe|Imo|Jigawa|Kaduna|Kano|Katsina|Kebbi|Kogi|Kwara|Lagos|Nassarawa|Niger|Ogun|Ondo|Osun|Oyo|Plateau|Rivers|Sokoto|Taraba|Yobe|Zamfara","Niue":"Niue","Norfolk Island":"Norfolk Island","Northern Mariana Islands":"Northern Islands|Rota|Saipan|Tinian","Norway":"Akershus|Aust-Agder|Buskerud|Finnmark|Hedmark|Hordaland|More og Romsdal|Nord-Trondelag|Nordland|Oppland|Oslo|Ostfold|Rogaland|Sogn og Fjordane|Sor-Trondelag|Telemark|Troms|Vest-Agder|Vestfold","Oman":"Ad Dakhiliyah|Al Batinah|Al Wusta|Ash Sharqiyah|Az Zahirah|Masqat|Musandam|Zufar","Pakistan":"Balochistan|Federally Administered Tribal Areas|Islamabad Capital Territory|North-West Frontier Province|Punjab|Sindh","Palau":"Aimeliik|Airai|Angaur|Hatobohei|Kayangel|Koror|Melekeok|Ngaraard|Ngarchelong|Ngardmau|Ngatpang|Ngchesar|Ngeremlengui|Ngiwal|Palau Island|Peleliu|Sonsoral|Tobi","Panama":"Bocas del Toro|Chiriqui|Cocle|Colon|Darien|Herrera|Los Santos|Panama|San Blas|Veraguas","Papua New Guinea":"Bougainville|Central|Chimbu|East New Britain|East Sepik|Eastern Highlands|Enga|Gulf|Madang|Manus|Milne Bay|Morobe|National Capital|New Ireland|Northern|Sandaun|Southern Highlands|West New Britain|Western|Western Highlands","Paraguay":"Alto Paraguay|Alto Parana|Amambay|Asuncion (city)|Boqueron|Caaguazu|Caazapa|Canindeyu|Central|Concepcion|Cordillera|Guaira|Itapua|Misiones|Neembucu|Paraguari|Presidente Hayes|San Pedro","Peru":"Amazonas|Ancash|Apurimac|Arequipa|Ayacucho|Cajamarca|Callao|Cusco|Huancavelica|Huanuco|Ica|Junin|La Libertad|Lambayeque|Lima|Loreto|Madre de Dios|Moquegua|Pasco|Piura|Puno|San Martin|Tacna|Tumbes|Ucayali","Philippines":"Abra|Agusan del Norte|Agusan del Sur|Aklan|Albay|Angeles|Antique|Aurora|Bacolod|Bago|Baguio|Bais|Basilan|Basilan City|Bataan|Batanes|Batangas|Batangas City|Benguet|Bohol|Bukidnon|Bulacan|Butuan|Cabanatuan|Cadiz|Cagayan|Cagayan de Oro|Calbayog|Caloocan|Camarines Norte|Camarines Sur|Camiguin|Canlaon|Capiz|Catanduanes|Cavite|Cavite City|Cebu|Cebu City|Cotabato|Dagupan|Danao|Dapitan|Davao City Davao|Davao del Sur|Davao Oriental|Dipolog|Dumaguete|Eastern Samar|General Santos|Gingoog|Ifugao|Iligan|Ilocos Norte|Ilocos Sur|Iloilo|Iloilo City|Iriga|Isabela|Kalinga-Apayao|La Carlota|La Union|Laguna|Lanao del Norte|Lanao del Sur|Laoag|Lapu-Lapu|Legaspi|Leyte|Lipa|Lucena|Maguindanao|Mandaue|Manila|Marawi|Marinduque|Masbate|Mindoro Occidental|Mindoro Oriental|Misamis Occidental|Misamis Oriental|Mountain|Naga|Negros Occidental|Negros Oriental|North Cotabato|Northern Samar|Nueva Ecija|Nueva Vizcaya|Olongapo|Ormoc|Oroquieta|Ozamis|Pagadian|Palawan|Palayan|Pampanga|Pangasinan|Pasay|Puerto Princesa|Quezon|Quezon City|Quirino|Rizal|Romblon|Roxas|Samar|San Carlos (in Negros Occidental)|San Carlos (in Pangasinan)|San Jose|San Pablo|Silay|Siquijor|Sorsogon|South Cotabato|Southern Leyte|Sultan Kudarat|Sulu|Surigao|Surigao del Norte|Surigao del Sur|Tacloban|Tagaytay|Tagbilaran|Tangub|Tarlac|Tawitawi|Toledo|Trece Martires|Zambales|Zamboanga|Zamboanga del Norte|Zamboanga del Sur","Pitcaim Islands":"Pitcaim Islands","Poland":"Dolnoslaskie|Kujawsko-Pomorskie|Lodzkie|Lubelskie|Lubuskie|Malopolskie|Mazowieckie|Opolskie|Podkarpackie|Podlaskie|Pomorskie|Slaskie|Swietokrzyskie|Warminsko-Mazurskie|Wielkopolskie|Zachodniopomorskie","Portugal":"Acores (Azores)|Aveiro|Beja|Braga|Braganca|Castelo Branco|Coimbra|Evora|Faro|Guarda|Leiria|Lisboa|Madeira|Portalegre|Porto|Santarem|Setubal|Viana do Castelo|Vila Real|Viseu","Puerto Rico":"Adjuntas|Aguada|Aguadilla|Aguas Buenas|Aibonito|Anasco|Arecibo|Arroyo|Barceloneta|Barranquitas|Bayamon|Cabo Rojo|Caguas|Camuy|Canovanas|Carolina|Catano|Cayey|Ceiba|Ciales|Cidra|Coamo|Comerio|Corozal|Culebra|Dorado|Fajardo|Florida|Guanica|Guayama|Guayanilla|Guaynabo|Gurabo|Hatillo|Hormigueros|Humacao|Isabela|Jayuya|Juana Diaz|Juncos|Lajas|Lares|Las Marias|Las Piedras|Loiza|Luquillo|Manati|Maricao|Maunabo|Mayaguez|Moca|Morovis|Naguabo|Naranjito|Orocovis|Patillas|Penuelas|Ponce|Quebradillas|Rincon|Rio Grande|Sabana Grande|Salinas|San German|San Juan|San Lorenzo|San Sebastian|Santa Isabel|Toa Alta|Toa Baja|Trujillo Alto|Utuado|Vega Alta|Vega Baja|Vieques|Villalba|Yabucoa|Yauco","Qatar":"Ad Dawhah|Al Ghuwayriyah|Al Jumayliyah|Al Khawr|Al Wakrah|Ar Rayyan|Jarayan al Batinah|Madinat ash Shamal|Umm Salal","Reunion":"Reunion","Romania":"Alba|Arad|Arges|Bacau|Bihor|Bistrita-Nasaud|Botosani|Braila|Brasov|Bucuresti|Buzau|Calarasi|Caras-Severin|Cluj|Constanta|Covasna|Dimbovita|Dolj|Galati|Giurgiu|Gorj|Harghita|Hunedoara|Ialomita|Iasi|Maramures|Mehedinti|Mures|Neamt|Olt|Prahova|Salaj|Satu Mare|Sibiu|Suceava|Teleorman|Timis|Tulcea|Vaslui|Vilcea|Vrancea","Russia":"Adygeya (Maykop)|Aginskiy Buryatskiy (Aginskoye)|Altay (Gorno-Altaysk)|Altayskiy (Barnaul)|Amurskaya (Blagoveshchensk)|Arkhangel'skaya|Astrakhanskaya|Bashkortostan (Ufa)|Belgorodskaya|Bryanskaya|Buryatiya (Ulan-Ude)|Chechnya (Groznyy)|Chelyabinskaya|Chitinskaya|Chukotskiy (Anadyr')|Chuvashiya (Cheboksary)|Dagestan (Makhachkala)|Evenkiyskiy (Tura)|Ingushetiya (Nazran')|Irkutskaya|Ivanovskaya|Kabardino-Balkariya (Nal'chik)|Kaliningradskaya|Kalmykiya (Elista)|Kaluzhskaya|Kamchatskaya (Petropavlovsk-Kamchatskiy)|Karachayevo-Cherkesiya (Cherkessk)|Kareliya (Petrozavodsk)|Kemerovskaya|Khabarovskiy|Khakasiya (Abakan)|Khanty-Mansiyskiy (Khanty-Mansiysk)|Kirovskaya|Komi (Syktyvkar)|Komi-Permyatskiy (Kudymkar)|Koryakskiy (Palana)|Kostromskaya|Krasnodarskiy|Krasnoyarskiy|Kurganskaya|Kurskaya|Leningradskaya|Lipetskaya|Magadanskaya|Mariy-El (Yoshkar-Ola)|Mordoviya (Saransk)|Moskovskaya|Moskva (Moscow)|Murmanskaya|Nenetskiy (Nar'yan-Mar)|Nizhegorodskaya|Novgorodskaya|Novosibirskaya|Omskaya|Orenburgskaya|Orlovskaya (Orel)|Penzenskaya|Permskaya|Primorskiy (Vladivostok)|Pskovskaya|Rostovskaya|Ryazanskaya|Sakha (Yakutsk)|Sakhalinskaya (Yuzhno-Sakhalinsk)|Samarskaya|Sankt-Peterburg (Saint Petersburg)|Saratovskaya|Severnaya Osetiya-Alaniya [North Ossetia] (Vladikavkaz)|Smolenskaya|Stavropol'skiy|Sverdlovskaya (Yekaterinburg)|Tambovskaya|Tatarstan (Kazan')|Taymyrskiy (Dudinka)|Tomskaya|Tul'skaya|Tverskaya|Tyumenskaya|Tyva (Kyzyl)|Udmurtiya (Izhevsk)|Ul'yanovskaya|Ust'-Ordynskiy Buryatskiy (Ust'-Ordynskiy)|Vladimirskaya|Volgogradskaya|Vologodskaya|Voronezhskaya|Yamalo-Nenetskiy (Salekhard)|Yaroslavskaya|Yevreyskaya","Rwanda":"Butare|Byumba|Cyangugu|Gikongoro|Gisenyi|Gitarama|Kibungo|Kibuye|Kigali Rurale|Kigali-ville|Ruhengeri|Umutara","Saint Helena":"Ascension|Saint Helena|Tristan da Cunha","Saint Kitts and Nevis":"Christ Church Nichola Town|Saint Anne Sandy Point|Saint George Basseterre|Saint George Gingerland|Saint James Windward|Saint John Capisterre|Saint John Figtree|Saint Mary Cayon|Saint Paul Capisterre|Saint Paul Charlestown|Saint Peter Basseterre|Saint Thomas Lowland|Saint Thomas Middle Island|Trinity Palmetto Point","Saint Lucia":"Anse-la-Raye|Castries|Choiseul|Dauphin|Dennery|Gros Islet|Laborie|Micoud|Praslin|Soufriere|Vieux Fort","Saint Pierre and Miquelon":"Miquelon|Saint Pierre","Saint Vincent and the Grenadines":"Charlotte|Grenadines|Saint Andrew|Saint David|Saint George|Saint Patrick","Samoa":"A'ana|Aiga-i-le-Tai|Atua|Fa'asaleleaga|Gaga'emauga|Gagaifomauga|Palauli|Satupa'itea|Tuamasaga|Va'a-o-Fonoti|Vaisigano","San Marino":"Acquaviva|Borgo Maggiore|Chiesanuova|Domagnano|Faetano|Fiorentino|Monte Giardino|San Marino|Serravalle","Sao Tome and Principe":"Principe|Sao Tome","Saudi Arabia":"'Asir|Al Bahah|Al Hudud ash Shamaliyah|Al Jawf|Al Madinah|Al Qasim|Ar Riyad|Ash Sharqiyah (Eastern Province)|Ha'il|Jizan|Makkah|Najran|Tabuk","Scotland":"Aberdeen City|Aberdeenshire|Angus|Argyll and Bute|City of Edinburgh|Clackmannanshire|Dumfries and Galloway|Dundee City|East Ayrshire|East Dunbartonshire|East Lothian|East Renfrewshire|Eilean Siar (Western Isles)|Falkirk|Fife|Glasgow City|Highland|Inverclyde|Midlothian|Moray|North Ayrshire|North Lanarkshire|Orkney Islands|Perth and Kinross|Renfrewshire|Shetland Islands|South Ayrshire|South Lanarkshire|Stirling|The Scottish Borders|West Dunbartonshire|West Lothian","Senegal":"Dakar|Diourbel|Fatick|Kaolack|Kolda|Louga|Saint-Louis|Tambacounda|Thies|Ziguinchor","Seychelles":"Anse aux Pins|Anse Boileau|Anse Etoile|Anse Louis|Anse Royale|Baie Lazare|Baie Sainte Anne|Beau Vallon|Bel Air|Bel Ombre|Cascade|Glacis|Grand' Anse (on Mahe)|Grand' Anse (on Praslin)|La Digue|La Riviere Anglaise|Mont Buxton|Mont Fleuri|Plaisance|Pointe La Rue|Port Glaud|Saint Louis|Takamaka","Sierra Leone":"Eastern|Northern|Southern|Western","Singapore":"Singapore","Slovakia":"Banskobystricky|Bratislavsky|Kosicky|Nitriansky|Presovsky|Trenciansky|Trnavsky|Zilinsky","Slovenia":"Ajdovscina|Beltinci|Bled|Bohinj|Borovnica|Bovec|Brda|Brezice|Brezovica|Cankova-Tisina|Celje|Cerklje na Gorenjskem|Cerknica|Cerkno|Crensovci|Crna na Koroskem|Crnomelj|Destrnik-Trnovska Vas|Divaca|Dobrepolje|Dobrova-Horjul-Polhov Gradec|Dol pri Ljubljani|Domzale|Dornava|Dravograd|Duplek|Gorenja Vas-Poljane|Gorisnica|Gornja Radgona|Gornji Grad|Gornji Petrovci|Grosuplje|Hodos Salovci|Hrastnik|Hrpelje-Kozina|Idrija|Ig|Ilirska Bistrica|Ivancna Gorica|Izola|Jesenice|Jursinci|Kamnik|Kanal|Kidricevo|Kobarid|Kobilje|Kocevje|Komen|Koper|Kozje|Kranj|Kranjska Gora|Krsko|Kungota|Kuzma|Lasko|Lenart|Lendava|Litija|Ljubljana|Ljubno|Ljutomer|Logatec|Loska Dolina|Loski Potok|Luce|Lukovica|Majsperk|Maribor|Medvode|Menges|Metlika|Mezica|Miren-Kostanjevica|Mislinja|Moravce|Moravske Toplice|Mozirje|Murska Sobota|Muta|Naklo|Nazarje|Nova Gorica|Novo Mesto|Odranci|Ormoz|Osilnica|Pesnica|Piran|Pivka|Podcetrtek|Podvelka-Ribnica|Postojna|Preddvor|Ptuj|Puconci|Race-Fram|Radece|Radenci|Radlje ob Dravi|Radovljica|Ravne-Prevalje|Ribnica|Rogasevci|Rogaska Slatina|Rogatec|Ruse|Semic|Sencur|Sentilj|Sentjernej|Sentjur pri Celju|Sevnica|Sezana|Skocjan|Skofja Loka|Skofljica|Slovenj Gradec|Slovenska Bistrica|Slovenske Konjice|Smarje pri Jelsah|Smartno ob Paki|Sostanj|Starse|Store|Sveti Jurij|Tolmin|Trbovlje|Trebnje|Trzic|Turnisce|Velenje|Velike Lasce|Videm|Vipava|Vitanje|Vodice|Vojnik|Vrhnika|Vuzenica|Zagorje ob Savi|Zalec|Zavrc|Zelezniki|Ziri|Zrece","Solomon Islands":"Bellona|Central|Choiseul (Lauru)|Guadalcanal|Honiara|Isabel|Makira|Malaita|Rennell|Temotu|Western","Somalia":"Awdal|Bakool|Banaadir|Bari|Bay|Galguduud|Gedo|Hiiraan|Jubbada Dhexe|Jubbada Hoose|Mudug|Nugaal|Sanaag|Shabeellaha Dhexe|Shabeellaha Hoose|Sool|Togdheer|Woqooyi Galbeed","South Africa":"Eastern Cape|Free State|Gauteng|KwaZulu-Natal|Mpumalanga|North-West|Northern Cape|Northern Province|Western Cape","South Georgia and South Sandwich Islands":"Bird Island|Bristol Island|Clerke Rocks|Montagu Island|Saunders Island|South Georgia|Southern Thule|Traversay Islands","Spain":"Andalucia|Aragon|Asturias|Baleares (Balearic Islands)|Canarias (Canary Islands)|Cantabria|Castilla y Leon|Castilla-La Mancha|Cataluna|Ceuta|Communidad Valencian|Extremadura|Galicia|Islas Chafarinas|La Rioja|Madrid|Melilla|Murcia|Navarra|Pais Vasco (Basque Country)|Penon de Alhucemas|Penon de Velez de la Gomera","Spratly Islands":"Spratly Islands","Sri Lanka":"Central|Eastern|North Central|North Eastern|North Western|Northern|Sabaragamuwa|Southern|Uva|Western","Sudan":"A'ali an Nil|Al Bahr al Ahmar|Al Buhayrat|Al Jazirah|Al Khartum|Al Qadarif|Al Wahdah|An Nil al Abyad|An Nil al Azraq|Ash Shamaliyah|Bahr al Jabal|Gharb al Istiwa'iyah|Gharb Bahr al Ghazal|Gharb Darfur|Gharb Kurdufan|Janub Darfur|Janub Kurdufan|Junqali|Kassala|Nahr an Nil|Shamal Bahr al Ghazal|Shamal Darfur|Shamal Kurdufan|Sharq al Istiwa'iyah|Sinnar|Warab","Suriname":"Brokopondo|Commewijne|Coronie|Marowijne|Nickerie|Para|Paramaribo|Saramacca|Sipaliwini|Wanica","Svalbard":"Barentsoya|Bjornoya|Edgeoya|Hopen|Kvitoya|Nordaustandet|Prins Karls Forland|Spitsbergen","Swaziland":"Hhohho|Lubombo|Manzini|Shiselweni","Sweden":"Blekinge|Dalarnas|Gavleborgs|Gotlands|Hallands|Jamtlands|Jonkopings|Kalmar|Kronobergs|Norrbottens|Orebro|Ostergotlands|Skane|Sodermanlands|Stockholms|Uppsala|Varmlands|Vasterbottens|Vasternorrlands|Vastmanlands|Vastra Gotalands","Switzerland":"Aargau|Ausser-Rhoden|Basel-Landschaft|Basel-Stadt|Bern|Fribourg|Geneve|Glarus|Graubunden|Inner-Rhoden|Jura|Luzern|Neuchatel|Nidwalden|Obwalden|Sankt Gallen|Schaffhausen|Schwyz|Solothurn|Thurgau|Ticino|Uri|Valais|Vaud|Zug|Zurich","Syria":"Al Hasakah|Al Ladhiqiyah|Al Qunaytirah|Ar Raqqah|As Suwayda'|Dar'a|Dayr az Zawr|Dimashq|Halab|Hamah|Hims|Idlib|Rif Dimashq|Tartus","Taiwan":"Chang-hua|Chi-lung|Chia-i|Chia-i|Chung-hsing-hsin-ts'un|Hsin-chu|Hsin-chu|Hua-lien|I-lan|Kao-hsiung|Kao-hsiung|Miao-li|Nan-t'ou|P'eng-hu|P'ing-tung|T'ai-chung|T'ai-chung|T'ai-nan|T'ai-nan|T'ai-pei|T'ai-pei|T'ai-tung|T'ao-yuan|Yun-lin","Tajikistan":"Viloyati Khatlon|Viloyati Leninobod|Viloyati Mukhtori Kuhistoni Badakhshon","Tanzania":"Arusha|Dar es Salaam|Dodoma|Iringa|Kagera|Kigoma|Kilimanjaro|Lindi|Mara|Mbeya|Morogoro|Mtwara|Mwanza|Pemba North|Pemba South|Pwani|Rukwa|Ruvuma|Shinyanga|Singida|Tabora|Tanga|Zanzibar Central/South|Zanzibar North|Zanzibar Urban/West","Thailand":"Amnat Charoen|Ang Thong|Buriram|Chachoengsao|Chai Nat|Chaiyaphum|Chanthaburi|Chiang Mai|Chiang Rai|Chon Buri|Chumphon|Kalasin|Kamphaeng Phet|Kanchanaburi|Khon Kaen|Krabi|Krung Thep Mahanakhon (Bangkok)|Lampang|Lamphun|Loei|Lop Buri|Mae Hong Son|Maha Sarakham|Mukdahan|Nakhon Nayok|Nakhon Pathom|Nakhon Phanom|Nakhon Ratchasima|Nakhon Sawan|Nakhon Si Thammarat|Nan|Narathiwat|Nong Bua Lamphu|Nong Khai|Nonthaburi|Pathum Thani|Pattani|Phangnga|Phatthalung|Phayao|Phetchabun|Phetchaburi|Phichit|Phitsanulok|Phra Nakhon Si Ayutthaya|Phrae|Phuket|Prachin Buri|Prachuap Khiri Khan|Ranong|Ratchaburi|Rayong|Roi Et|Sa Kaeo|Sakon Nakhon|Samut Prakan|Samut Sakhon|Samut Songkhram|Sara Buri|Satun|Sing Buri|Sisaket|Songkhla|Sukhothai|Suphan Buri|Surat Thani|Surin|Tak|Trang|Trat|Ubon Ratchathani|Udon Thani|Uthai Thani|Uttaradit|Yala|Yasothon","Tobago":"Tobago","Toga":"De La Kara|Des Plateaux|Des Savanes|Du Centre|Maritime","Tokelau":"Atafu|Fakaofo|Nukunonu","Tonga":"Ha'apai|Tongatapu|Vava'u","Trinidad":"Arima|Caroni|Mayaro|Nariva|Port-of-Spain|Saint Andrew|Saint David|Saint George|Saint Patrick|San Fernando|Victoria","Tunisia":"Ariana|Beja|Ben Arous|Bizerte|El Kef|Gabes|Gafsa|Jendouba|Kairouan|Kasserine|Kebili|Mahdia|Medenine|Monastir|Nabeul|Sfax|Sidi Bou Zid|Siliana|Sousse|Tataouine|Tozeur|Tunis|Zaghouan","Turkey":"Adana|Adiyaman|Afyon|Agri|Aksaray|Amasya|Ankara|Antalya|Ardahan|Artvin|Aydin|Balikesir|Bartin|Batman|Bayburt|Bilecik|Bingol|Bitlis|Bolu|Burdur|Bursa|Canakkale|Cankiri|Corum|Denizli|Diyarbakir|Duzce|Edirne|Elazig|Erzincan|Erzurum|Eskisehir|Gaziantep|Giresun|Gumushane|Hakkari|Hatay|Icel|Igdir|Isparta|Istanbul|Izmir|Kahramanmaras|Karabuk|Karaman|Kars|Kastamonu|Kayseri|Kilis|Kirikkale|Kirklareli|Kirsehir|Kocaeli|Konya|Kutahya|Malatya|Manisa|Mardin|Mugla|Mus|Nevsehir|Nigde|Ordu|Osmaniye|Rize|Sakarya|Samsun|Sanliurfa|Siirt|Sinop|Sirnak|Sivas|Tekirdag|Tokat|Trabzon|Tunceli|Usak|Van|Yalova|Yozgat|Zonguldak","Turkmenistan":"Ahal Welayaty|Balkan Welayaty|Dashhowuz Welayaty|Lebap Welayaty|Mary Welayaty","Tuvalu":"Tuvalu","USA":"Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming","Uganda":"Adjumani|Apac|Arua|Bugiri|Bundibugyo|Bushenyi|Busia|Gulu|Hoima|Iganga|Jinja|Kabale|Kabarole|Kalangala|Kampala|Kamuli|Kapchorwa|Kasese|Katakwi|Kibale|Kiboga|Kisoro|Kitgum|Kotido|Kumi|Lira|Luwero|Masaka|Masindi|Mbale|Mbarara|Moroto|Moyo|Mpigi|Mubende|Mukono|Nakasongola|Nebbi|Ntungamo|Pallisa|Rakai|Rukungiri|Sembabule|Soroti|Tororo","Ukraine":"Avtonomna Respublika Krym (Simferopol')|Cherkas'ka (Cherkasy)|Chernihivs'ka (Chernihiv)|Chernivets'ka (Chernivtsi)|Dnipropetrovs'ka (Dnipropetrovs'k)|Donets'ka (Donets'k)|Ivano-Frankivs'ka (Ivano-Frankivs'k)|Kharkivs'ka (Kharkiv)|Khersons'ka (Kherson)|Khmel'nyts'ka (Khmel'nyts'kyy)|Kirovohrads'ka (Kirovohrad)|Kyyiv|Kyyivs'ka (Kiev)|L'vivs'ka (L'viv)|Luhans'ka (Luhans'k)|Mykolayivs'ka (Mykolayiv)|Odes'ka (Odesa)|Poltavs'ka (Poltava)|Rivnens'ka (Rivne)|Sevastopol'|Sums'ka (Sumy)|Ternopil's'ka (Ternopil')|Vinnyts'ka (Vinnytsya)|Volyns'ka (Luts'k)|Zakarpats'ka (Uzhhorod)|Zaporiz'ka (Zaporizhzhya)|Zhytomyrs'ka (Zhytomyr)","United Arab Emirates":"'Ajman|Abu Zaby (Abu Dhabi)|Al Fujayrah|Ash Shariqah (Sharjah)|Dubayy (Dubai)|Ra's al Khaymah|Umm al Qaywayn","United Kingdom":"Barking and Dagenham|Barnet|Barnsley|Bath and North East Somerset|Bedfordshire|Bexley|Birmingham|Blackburn with Darwen|Blackpool|Bolton|Bournemouth|Bracknell Forest|Bradford|Brent|Brighton and Hove|Bromley|Buckinghamshire|Bury|Calderdale|Cambridgeshire|Camden|Cheshire|City of Bristol|City of Kingston upon Hull|City of London|Cornwall|Coventry|Croydon|Cumbria|Darlington|Derby|Derbyshire|Devon|Doncaster|Dorset|Dudley|Durham|Ealing|East Riding of Yorkshire|East Sussex|Enfield|Essex|Gateshead|Gloucestershire|Greenwich|Hackney|Halton|Hammersmith and Fulham|Hampshire|Haringey|Harrow|Hartlepool|Havering|Herefordshire|Hertfordshire|Hillingdon|Hounslow|Isle of Wight|Islington|Kensington and Chelsea|Kent|Kingston upon Thames|Kirklees|Knowsley|Lambeth|Lancashire|Leeds|Leicester|Leicestershire|Lewisham|Lincolnshire|Liverpool|Luton|Manchester|Medway|Merton|Middlesbrough|Milton Keynes|Newcastle upon Tyne|Newham|Norfolk|North East Lincolnshire|North Lincolnshire|North Somerset|North Tyneside|North Yorkshire|Northamptonshire|Northumberland|Nottingham|Nottinghamshire|Oldham|Oxfordshire|Peterborough|Plymouth|Poole|Portsmouth|Reading|Redbridge|Redcar and Cleveland|Richmond upon Thames|Rochdale|Rotherham|Rutland|Salford|Sandwell|Sefton|Sheffield|Shropshire|Slough|Solihull|Somerset|South Gloucestershire|South Tyneside|Southampton|Southend-on-Sea|Southwark|St. Helens|Staffordshire|Stockport|Stockton-on-Tees|Stoke-on-Trent|Suffolk|Sunderland|Surrey|Sutton|Swindon|Tameside|Telford and Wrekin|Thurrock|Torbay|Tower Hamlets|Trafford|Wakefield|Walsall|Waltham Forest|Wandsworth|Warrington|Warwickshire|West Berkshire|West Sussex|Westminster|Wigan|Wiltshire|Windsor and Maidenhead|Wirral|Wokingham|Wolverhampton|Worcestershire|York","Uruguay":"Artigas|Canelones|Cerro Largo|Colonia|Durazno|Flores|Florida|Lavalleja|Maldonado|Montevideo|Paysandu|Rio Negro|Rivera|Rocha|Salto|San Jose|Soriano|Tacuarembo|Treinta y Tres","Uzbekistan":"Andijon Wiloyati|Bukhoro Wiloyati|Farghona Wiloyati|Jizzakh Wiloyati|Khorazm Wiloyati (Urganch)|Namangan Wiloyati|Nawoiy Wiloyati|Qashqadaryo Wiloyati (Qarshi)|Qoraqalpoghiston (Nukus)|Samarqand Wiloyati|Sirdaryo Wiloyati (Guliston)|Surkhondaryo Wiloyati (Termiz)|Toshkent Shahri|Toshkent Wiloyati","Vanuatu":"Malampa|Penama|Sanma|Shefa|Tafea|Torba","Venezuela":"Amazonas|Anzoategui|Apure|Aragua|Barinas|Bolivar|Carabobo|Cojedes|Delta Amacuro|Dependencias Federales|Distrito Federal|Falcon|Guarico|Lara|Merida|Miranda|Monagas|Nueva Esparta|Portuguesa|Sucre|Tachira|Trujillo|Vargas|Yaracuy|Zulia","Vietnam":"An Giang|Ba Ria-Vung Tau|Bac Giang|Bac Kan|Bac Lieu|Bac Ninh|Ben Tre|Binh Dinh|Binh Duong|Binh Phuoc|Binh Thuan|Ca Mau|Can Tho|Cao Bang|Da Nang|Dac Lak|Dong Nai|Dong Thap|Gia Lai|Ha Giang|Ha Nam|Ha Noi|Ha Tay|Ha Tinh|Hai Duong|Hai Phong|Ho Chi Minh|Hoa Binh|Hung Yen|Khanh Hoa|Kien Giang|Kon Tum|Lai Chau|Lam Dong|Lang Son|Lao Cai|Long An|Nam Dinh|Nghe An|Ninh Binh|Ninh Thuan|Phu Tho|Phu Yen|Quang Binh|Quang Nam|Quang Ngai|Quang Ninh|Quang Tri|Soc Trang|Son La|Tay Ninh|Thai Binh|Thai Nguyen|Thanh Hoa|Thua Thien-Hue|Tien Giang|Tra Vinh|Tuyen Quang|Vinh Long|Vinh Phuc|Yen Bai","Virgin Islands":"Saint Croix|Saint John|Saint Thomas","Wales":"Blaenau Gwent|Bridgend|Caerphilly|Cardiff|Carmarthenshire|Ceredigion|Conwy|Denbighshire|Flintshire|Gwynedd|Isle of Anglesey|Merthyr Tydfil|Monmouthshire|Neath Port Talbot|Newport|Pembrokeshire|Powys|Rhondda Cynon Taff|Swansea|The Vale of Glamorgan|Torfaen|Wrexham","Wallis and Futuna":"Alo|Sigave|Wallis","West Bank":"West Bank","Western Sahara":"Western Sahara","Yemen":"'Adan|'Ataq|Abyan|Al Bayda'|Al Hudaydah|Al Jawf|Al Mahrah|Al Mahwit|Dhamar|Hadhramawt|Hajjah|Ibb|Lahij|Ma'rib|Sa'dah|San'a'|Ta'izz","Yugoslavia":"Kosovo|Montenegro|Serbia|Vojvodina","Zambia":"Central|Copperbelt|Eastern|Luapula|Lusaka|North-Western|Northern|Southern|Western","Zimbabwe":"Bulawayo|Harare|ManicalandMashonaland Central|Mashonaland East|Mashonaland West|Masvingo|Matabeleland North|Matabeleland South|Midlands",}
var Util={loadImages:function(images,onSuccess,onError){var promises=[];for(var i=0;i<images.length;i++){(function(url,promise){var img=new Image();img.onload=function(){promise.resolve();};img.onerror=function(){if(onError)onError();};img.src=url;})(images[i],promises[i]=$.Deferred());}
$.when.apply($,promises).done(function(){onSuccess();});},manageStorageSessionStorage:function(type,name,value){switch(type){case'get':return sessionStorage.getItem(name);case'set':sessionStorage.setItem(name,value);return;case'remove':sessionStorage.removeItem(name);return;}},manageStorageCookie:function(type,name,value){switch(type){case'get':return $.cookie(name);case'set':$.cookie(name,value);return;case'remove':this.removeItem(name);return;}},removeItem:function(sKey,sPath,sDomain){document.cookie=encodeURIComponent(sKey)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+
(sDomain?"; domain="+sDomain:"")+
(sPath?"; path="+sPath:"");}};if(localStorage.length>0){Util.manageStorage=Util.manageStorageSessionStorage;}else{Util.manageStorage=Util.manageStorageCookie;}
var ResponsivePopoverView=Backbone.Marionette.ItemView.extend({template:'#responsive-popover-template',tagName:'div',className:'responsive-popover-wrapper',defaults:{showCloseButton:false,closeClickOutside:true,maxWidth:640,maxHeight:480,content:"Please specify some content! ",cloneContent:false,extraClass:"",mobileFullScreen:true,showCta:false,advancedCta:false,ctaText:null,noScroll:false,confirmClose:false,fullScreenButton:false,ctaCallback:null,closeCallback:null,showCallback:null,hideCallback:null,},events:{"click .confirmExit":"confirmExit","click .close-btn":"closePopover","click .cta":"clickCTA"},initialize:function(options){var view=this;view.options=_.defaults(options.options,view.defaults);view.mobileClass=(view.options.mobileFullScreen)?"full-screen":"";view.ctaText=(view.options.ctaText)?view.options.ctaText:"";Backbone.Marionette.ItemView.prototype.initialize.apply(this,arguments);App.vent.on('close-popover',function(options){view.hidePopover();});},onRender:function(){var view=this,content;if(typeof view.options.content==='object'){if(view.options.cloneContent){content=view.options.content.clone(true);}else{content=view.options.content;}}else{content=view.options.content;}
if(view.options.closeClickOutside){view.$el.on('click',function(ev){var closest=$(ev.target).closest('.popover-content');if(!closest||closest.length===0){view.closePopover(ev);}});}
if(view.options.noScroll){if(!view.options.showCloseButton&&(view.options.extraClass=="play-area")){$('html').addClass('extra-scroll');$('html, body').animate({scrollTop:40000});}else{$('html').addClass('no-scroll');}}
if(view.options.data){var gameInfo=JSON.stringify(view.options.data);view.$el.find('.popover-content').attr('data-game',gameInfo)}
if(view.options.extraClass){view.$el.addClass(view.options.extraClass);}
view.$el.find('.popover-content').prepend(content);$('#container-inner').append(view.$el);view.$el.addClass('visible');if(view.options.showCallback){view.options.showCallback(view.$el);}
App.vent.on('show:indexPage',function(){view.hidePopover();});},hidePopover:function(ev){var view=this;this.undelegateEvents();this.$el.removeData().unbind();view.remove();Backbone.View.prototype.remove.call(this);view.$el.remove();view.$el.hide().remove();if(ev!==undefined){if(!ev.target.classList.contains('noHidePopover')){$('html').removeClass('no-scroll');$('html').removeClass('extra-scroll');}}else{$('html').removeClass('no-scroll');$('html').removeClass('extra-scroll');}
if(this.options.hideCallback){this.options.hideCallback.call(this);this.options.hideCallback=null;}},closePopover:function(ev){var close=true;ev.preventDefault();if(this.options.closeCallback){var ret=this.options.closeCallback.call();if(ret===true||ret===false){close=ret;}}
if(!close){return;}
var view=this;if(view.options.confirmClose){App.vent.trigger('display:exit-banner');}else{this.hidePopover();}
App.vent.trigger('hide-game-info');},clickCTA:function(ev){var close=true;ev.preventDefault();if(this.options.ctaCallback){var ret=this.options.ctaCallback.call(this,ev);if(ret===true||ret===false){close=ret;}}
if(close){this.hidePopover(ev);}},confirmExit:function(ev){ev.preventDefault();this.hidePopover();$('.responsive-popover-wrapper').hide().remove();App.vent.trigger('confirm-exit');App.appRouter.navigate("",{trigger:true});},serializeData:function(){var view=this,width;if(/*@cc_on!@*/ false||!!document.documentMode){width=view.options.maxWidth;}else{width='auto';}
return{options:{maxWidth:view.options.maxWidth,maxHeight:view.options.maxHeight,width:width,showCloseButton:view.options.showCloseButton,mobileClass:view.mobileClass,showCta:view.options.showCta,ctaText:view.ctaText,confirmClose:view.options.confirmClose,fullScreenButton:view.options.fullScreenButton,advancedCta:view.options.advancedCta,}}}});App.module("ShowResponsivePopover",function(ShowResponsivePopover,App,Backbone,Marionette,$){ShowResponsivePopover.addInitializer(function(options){App.vent.on('display:exitBanner',function(){App.vent.on('ping:sending',function(data){data.notifications=data.notifications||[];if(data.notifications.indexOf('exitBanner')==-1){data.notifications.push('exitBanner');}});});App.vent.on('ping:received',function(data){if((data.notifications!=undefined)&&(data.notifications.exitBanner!=undefined)){}else{Util.manageStorage('remove','exitBanner');}});App.vent.on('show:popover',function(options){ShowResponsivePopover.popoverView=new ResponsivePopoverView({options:options}).render();});App.vent.on('show:gamePlay-popover',function(options){ShowResponsivePopover.popoverView=new GameplayAreaView({options:options}).render();});App.vent.on('show:login-popover',function(gameId,mpTourID){App.vent.trigger('show:popover',{content:$('#game-player-unknown'),cloneContent:true,extraClass:"login-popover",maxWidth:660,maxHeight:360,showCloseButton:true,closeClickOutside:false,closeCallback:function(){App.appRouter.navigate("",{trigger:true});App.LoginModule.loginModel.set({state:'Not Authenticated'});},showCallback:function(){App.vent.trigger('show:second-login');}});});App.vent.on('show:overlay-message',function(options){var extraClass=options.extraClass?options.extraClass+" overlay-message":"overlay-message";App.vent.trigger('show:popover',{content:options.content,extraClass:extraClass,maxWidth:options.width,maxHeight:options.height,showCloseButton:true,closeClickOutside:true,noScroll:true,showCallback:function(el){if(!options.iframe){$(el).find('.overlay-content').load(options.src);}},ctaCallback:function(ev){return false;}});});});});var ResetPasswordConfirmationView=Backbone.Marionette.ItemView.extend({template:'#reset-password-confirmation',events:{'click #gotologin':'openLogin'},onRender:function(){var view=this;},openLogin:function(e){e.preventDefault();App.appRouter.navigate('/login',true);}});App.vent.on('show:loadPasswordConfirmation',function(element){App.ResetPasswordConfirmationView=new ResetPasswordConfirmationView().render().el;$(element).html(App.ResetPasswordConfirmationView);});$(document).on('click','#forgot-password-form button',function(e){e.preventDefault();var form=$(this).parents('form');var url=form.attr('action');$.ajax({type:"POST",url:url,data:form.serialize(),beforeSend:function(){App.vent.trigger('show:preloader','#forgot-password-form');},success:function(data){var src=$(data),content=src.find('#forgot-password-form').html();if(content!==undefined){$('#forgot-password-form').html(content);}else{App.vent.trigger('show:loadPasswordConfirmation','#forgot-password-form');}}});});App.module("resetPaswordModule",function(resetPaswordModule,App,Backbone,Marionette,$){App.vent.on('show:resetPassword',function(verifyUrl){var content='<h1 class="popover-header">Reset Password</h1><div class="overlay-content"></div>';var options={iframe:false,content:content,src:verifyUrl,maxWidth:300,showCloseButton:true,noScroll:true,extraClass:"forgotten-password",showCallback:function(el){if(!options.iframe){var overlayContent=$(el).find('.overlay-content');App.vent.trigger('show:preloader',overlayContent);overlayContent.load(verifyUrl);}},closeCallback:function(){App.appRouter.navigate('',true);}}
App.vent.trigger('show:popover',options);});});var CountDownTimerViewIntervalCount=0;var CountDownTimerViewIdCount=0;var CountDownTimerView=Backbone.Marionette.CollectionView.extend({tagName:'div',className:'clockDiv',uniqueRef:null,initialize:function(options){var timeLeft;if(options.timeLeft)
timeLeft=options.timeLeft;if(options.endTime)
timeLeft=this.calculateTimeLeft(options.endTime);var view=this;CountDownTimerViewIdCount++;this.uniqueRef=timeLeft+CountDownTimerViewIdCount;view.displayClock(timeLeft,options);App.vent.on('TabFocus',function(){view.timeleft=view.calculateTimeLeft(options.endTime);view.updateDurationLeft(view.timeleft);});},calculateTimeLeft:function(endTime){var now=moment.utc();var diff=moment.duration(moment.utc(endTime).diff(now));var remaining_d=Math.abs(diff.days());var remaining_h=Math.abs(diff.hours());var remaining_m=Math.abs(diff.minutes());var remaining_s=Math.abs(diff.seconds());return remaining_d+'-'+remaining_h+'-'+remaining_m+'-'+remaining_s;},displayClock:function(timeLeft,options){var view=this;var interval=400;view.clearClock();view.updateDurationLeft(timeLeft);view.clockTimerId=setInterval(function(){view.updateTimer(interval,options);},interval);view.updateTimer(0,options);CountDownTimerViewIntervalCount++;},updateDurationLeft:function(timeLeft){var view=this;view.timeleft=timeLeft.split('-');if(view.timeleft.length===2){view.duration=moment.duration({minutes:view.timeleft[0],seconds:view.timeleft[1],});}else{view.duration=moment.duration({days:view.timeleft[0],hours:view.timeleft[1],minutes:view.timeleft[2],seconds:view.timeleft[3],});}},updateTimer:function(interval,options){var view=this;var duration=view.duration;var triggerDoneEvent=duration.asSeconds()<=0;view.duration=moment.duration(duration-interval,'milliseconds');var countDown;if(view.timeleft.length===2){countDown=("<span>"+view.padValue(duration.minutes())+":</span>"+"<span>"+view.padValue(duration.seconds())+"</span>");}else{var text="";if(duration.days()>0)
text+="<span>"+duration.days()+":</span>";if(duration.hours()>0)
text+="<span>"+duration.hours()+":</span>";countDown=(text+"<span>"+view.padValue(duration.minutes())+":</span>"+"<span>"+view.padValue(duration.seconds())+"</span>");}
if(view.$el[0]){view.$el.html(countDown);}
if(triggerDoneEvent){view.clearClock();if(options.callback)
options.callback();setTimeout(function(){App.vent.trigger('time:done:'+options.view);},1);view.$el.addClass('timer-done');}},padValue:function(value){return value<=9?'0'+value:value;},clearClock:function(){if(this.clockTimerId){CountDownTimerViewIntervalCount--;clearInterval(this.clockTimerId);this.clockTimerId=null;}},onDestroy:function(){this.clearClock();}});var ResponsiveModalModel=Backbone.Model.extend({defaults:{image:"",showCloseButton:true,size:"large",effect:"scaled",headerImageType:"icon",content:"",extraClass:"",hasHeader:true},initialize:function(){var model=this;model.setImage(model.get('headerImageType'));},setImage:function(imageType){var model=this,imageSrc=model.get('image');switch(imageType){case'icon':model.set('image','<i class="'+imageSrc+'" />');break;case'game-icon':model.set('image','<img src="'+Red.CDNImages+'game-icon/default/'+imageSrc+'.jpg" />');break;case'basic-image':model.set('image','<img src="'+imageSrc+'" />');break;case'none':model.set('image','')
break;default:model.set('image','<img src="'+Red.CDNImages.replace('games/','')+'img/notification-icon/desktop/'+imageSrc+'.jpg" />');}}});App.module("ResponsiveModal",function(ResponsiveModal,App,Backbone,Marionette,$){ResponsiveModal.addInitializer(function(options){});App.vent.on('show:modal',function(options){ResponsiveModal.modalModel=new ResponsiveModalModel(options.model);ResponsiveModal.modalView=new ResponsiveModalView({model:ResponsiveModal.modalModel,showCallback:options.showCallback,hideCallback:options.hideCallback,}).render();});});var ResponsiveModalView=Backbone.Marionette.ItemView.extend({template:'#responsive-modal-template',tagName:'div',className:'responsive-modal-wrapper',events:{'click .close-btn':'closeModal','click .bonus-optin form .cta':'claimBonus','click .cta.popup-button':'buttonAction','click a[data-action="pgmove"]':'buttonAction'},initialize:function(options){var view=this;view.options=options;},onRender:function(){var view=this,content=view.model.get('content');$('#container-inner').append(view.$el);setTimeout(function(){view.$el.addClass('modal-show');},100);$('html').addClass('no-scroll');view.$el.find('.modal-content').prepend(content);if(view.options.showCallback){view.options.showCallback(view.$el);}
App.vent.on('close-modal',function(options){view.closeModal();});},buttonAction:function(ev){ev.stopPropagation();ev.preventDefault();var view=this,target=$(ev.target),action=target.attr('data-action');switch(action){case'pgmove':var groupKey=target.attr('data-pg'),doNav=target.attr('data-nav');view.addToGroup(groupKey);if(typeof doNav!==typeof undefined&&doNav!==false){window.location.href=target.attr('href');}
view.closeModal();break;case'close':view.closeModal();view.navigateToRoute(target.attr('href'));break;}},addToGroup:function(groupKey){var key="OptinGroups."+groupKey;$.ajax({type:"GET",url:"/api/addToPlayergroup",dataType:"json",data:{groupKey:key}}).done(function(){});},removeFromGroup:function(groupKey){var key="OptinGroups."+groupKey;$.ajax({type:"GET",url:"/api/removeFromGroup",dataType:"json",data:{groupKey:key}}).done(function(){});},closeModal:function(){var view=this;if(view.options.hideCallback){view.options.hideCallback.call(view);view.options.hideCallback=null;}
view.$el.removeClass('modal-show');$('html').removeClass('no-scroll');setTimeout(function(){view.undelegateEvents();view.$el.removeData().unbind();view.remove();view.$el.remove();},300);},navigateToRoute:function(url){App.appRouter.navigate(url,{trigger:true});},claimBonus:function(e){var view=this;e.preventDefault();e.stopImmediatePropagation();var tmpData=$('.bonus-optin form').serializeArray().reduce(function(obj,item){if(item.name=="bonus"){obj["bonus"]=item.value;}
return obj;},{});var url="/api/bkbonus";if($('.bonus-optin').hasClass('claim')){url="/api/bkclaimBonus";}
tmpData['ajax']=true;view.$el.find('.modal-wrapper').addClass('show-loader');$.ajax({type:"POST",url:url,data:tmpData}).done(function(data){App.vent.trigger('claimed:'+tmpData['bonus']);view.$el.find('.modal-wrapper').removeClass('show-loader');view.$el.find('.bonus-optin').remove();view.$el.find('.congrats-claim').show();var optInText='promotion:optin';if($('.bonus-optin').hasClass('claim')){optInText='bonus:optin';}
App.vent.trigger(optInText,tmpData['bonus'],'popover');})},});var PreloaderView=Backbone.Marionette.ItemView.extend({template:'#preloader-template',className:'preloader-wrapper',initialize:function(options){var view=this;this.options=options;},onRender:function(){var view=this,model=view.model;},templateHelpers:function(){var view=this;return{isTransparent:function(){if(view.options.transparent===true){return true;}}};},hideLoader:function(){var view=this;view.$el.remove();},});App.vent.on('show:preloader',function(element){App.PreloaderView=new PreloaderView({transparent:false}).render().el;$(element).html(App.PreloaderView);});App.vent.on('show:appended-preloader',function(element,isTransparent){isTransparent=typeof isTransparent!=='undefined'?isTransparent:true;App.PreloaderView=new PreloaderView({transparent:isTransparent}).render().el;$(element).append(App.PreloaderView);});var HeaderBannerModel=Backbone.Model.extend({default:{key:'',title:'',text:'',link:'',image:'',termsLink:'',link_text:'',image_extension:'',delay:10,}});var HeaderBannerCollection=Backbone.Collection.extend({model:HeaderBannerModel,});var HeaderBannerItem=Backbone.Marionette.ItemView.extend({tagName:'div',template:'#header-banner-item',events:{},className:function(){return'slide-item';},attributes:function(){return{'data-delay':this.model.get('duration')}},initialize:function(options){},onRender:function(){}});var HeaderBanner=Backbone.Marionette.CollectionView.extend({tagName:'div',className:'.banner',childView:HeaderBannerItem,onRender:function(){var col=this;col.slidesNumber=col.collection.length;col.fadeOutTiming=400;col.fadeInTiming=col.fadeOutTiming / 4;col.isSliding=false;col.isFirstTimeSlide=true;col.goToSlideTimer=null;col.navHolder=$('.slides-nav ul');if(col.slidesNumber>0){col.goToSlide(1);col.renderNavigation();col.doNavigation();col.updateNavigation(0);col.removeDefaultSlide();var hammerElement=col.$el.hammer();hammerElement.on("swipeleft",function(){if(col.slidesNumber>1){$('.header-banner .icon-arrow-right').click();}});hammerElement.on("swiperight",function(){if(col.slidesNumber>1){$('.header-banner .icon-arrow-left').click();}});$(window).resize(function(){col.updateNavigation(-1);});}},removeDefaultSlide:function(){$('.slide-item.default').fadeOut(400);setTimeout(function(){$('.slide-item.default').remove();},400);},renderNavigation:function(){var col=this;if(col.slidesNumber<2){return;}
col.navHolder.html();for(var i=0;i<col.slidesNumber;i++){col.navHolder.append('<li><a href="" data-slide ='+i+'></a></li>');}},goToSlide:function(slideNo){var col=this;col.isSliding=true;col.$el.find('.slide-item.active').fadeOut(col.fadeOutTiming).removeClass('active');col.$el.find('.slide-item').eq(slideNo).fadeIn(col.fadeInTiming,function(){col.isSliding=false;}).addClass('active');if(col.slidesNumber>1){col.rotate();col.updateNavigation(slideNo);}},rotate:function(){var col=this,currentSlide=$('.header-banner .slide-item.active'),currentSlideIdx=currentSlide.index(),delay=currentSlide.attr('data-delay')*1000;if(col.isFirstTimeSlide){var nextSlide=currentSlideIdx;col.isFirstTimeSlide=false;}else{var nextSlide=currentSlideIdx+1;}
if(col.slidesNumber<2)return;if(nextSlide>=$('.header-banner .slide-item').length){nextSlide=0;}
if($('.slide-button').hasClass('hidden')){$('.slide-button').removeClass('hidden');col.isSliding=false;}
if(col.goToSlideTimer!==null){clearTimeout(col.goToSlideTimer);}
col.goToSlideTimer=setTimeout(function(){col.goToSlide(nextSlide,true);},delay);},updateNavigation:function(idx){var ww=$(window).width(),col=this;if(idx>=0){$('.slides-nav li a').removeClass('active');$('.slides-nav li').eq(idx).find('a').addClass('active');}
var textSlideHeight=ww<1024?col.$el.find('.slide-item.active .slideshow-text-box').height()+'px':'10px';$('.slides-nav').css('bottom',textSlideHeight);},doNavigation:function(){var col=this;$(document).on('click','.header-banner .icon-arrow-right',function(ev){ev.preventDefault();if(col.isSliding){return;}
var idx=$('.header-banner .slide-item.active').next().index(),nextSlide=idx<0?0:idx;col.goToSlide(nextSlide);});$(document).on('click','.header-banner .icon-arrow-left',function(ev){ev.preventDefault();if(col.isSliding){return;}
var idx=$('.header-banner .slide-item.active').prev().index(),nextSlide=idx<0?$('.header-banner .slide-item').length-1:idx;col.goToSlide(nextSlide);});$(document).on('click','.slides-nav li a',function(ev){ev.preventDefault();if(col.isSliding){return;}
var slide=$(this).attr('data-slide');col.goToSlide(slide);});}});App.module("HeaderBannerModule",function(HeaderBannerModule,App,Backbone,Marionette,$){App.vent.on('display:banner',function(key,type,maxBanners){HeaderBannerModule.getBanners(key,type,maxBanners);});HeaderBannerModule.getBanners=function(key,type,maxBanners){var data={'keys':key,'type':type,'maxBanners':maxBanners};$.ajax({type:"POST",url:'/api/getBanners',data:data}).done(function(returnData){if(returnData.ok&&returnData.banners){HeaderBannerModule.renderBanners(returnData.banners);}});};HeaderBannerModule.renderBanners=function(data){HeaderBannerModule.HeaderBannerCollection=new HeaderBannerCollection(data);HeaderBannerModule.HeaderBanner=new HeaderBanner({collection:HeaderBannerModule.HeaderBannerCollection,el:$('.header-banner .slides')}).render().el;};});App.module("SeonModule",function(SeonModule,App,Backbone,Marionette,$){SeonModule.addInitializer(function(){if(Util.manageStorage('get','userEmail')){return;}
App.vent.on('seon:get_device_data',function(){if(typeof seon==="undefined"){return;}
seon.config({host:'seondf.com',session_id:Red.SessionId,audio_fingerprint:true,canvas_fingerprint:true,webgl_fingerprint:true,onSuccess:function(message){Red.SEON.hasError=false;Red.SEON.errorMsg=message;SeonModule.getBase64Session();},onError:function(message){Red.SEON.errorMsg=message;}});});});SeonModule.getBase64Session=function(){seon.getBase64Session(function(data){Red.SEON.hasError=!(data);Red.SEON.success=!Red.SEON.hasError;Red.SEON.data=(data)?data:false;App.vent.trigger('seon:data_received',Red.SEON);});};});var LoginModel=Backbone.Model.extend({defaults:{username:'',password:'',state:'Unknown Auth State',stateDetails:''},unknownAuthState:'Unknown Auth State',notAuthState:'Not Authenticated',pendingAuthState:'Pending Authentication',pendingLogout:'Pending Logout',authSuccessState:'Authentication Success',authFailState:'Authentication Failure',authUnknownState:'Authentication Unknown',autoLoggedAuto:'Authentication Unknown',tandcState:'TandC Overlay',knownUser:'Known User'});var LoginView=Backbone.Marionette.ItemView.extend({template:'#login-template',tagName:'div',className:'login-area',ui:{loginForm:'form',usernameField:'input[name=username]',passwordField:'input[name=password]',recapchaField:'input[name=g-ver]',successMessage:'.msg-success',authErrorMessage:'.error-bad-auth',generalErrorMessage:'.error-unknown',mainError:'.main-error',loader:'.loader'},modelEvents:{'change:state':'render','change:stateDetails':'render'},events:{'submit form':'formSubmitted'},formSubmitted:function(event){event.stopPropagation();event.preventDefault();this.model.set({username:this.ui.usernameField.val(),recapcha:this.ui.recapchaField.val(),password:this.ui.passwordField.val()});if($(event.target).closest('form').find('#select-app-date')[0]){var dateHolder=$(event.target).closest('form').find('#select-app-date'),selectedDate=new Date(dateHolder.val());userYear=selectedDate.getFullYear(),userMonth=selectedDate.getMonth(),userDay=selectedDate.getDate(),tempDate=new Date(userYear+18,userMonth,userDay);if((selectedDate=="Invalid Date")||(selectedDate.length==0)){$('.mobile-app-date .error-msg').show();return;}
if(tempDate>=new Date()){$('.mobile-app-date .error-msg').show().html('You must be over 18 years of age.');return;}else{$('.mobile-app-date .error-msg').hide();}}
App.vent.trigger('login:submit',this.model);},initialize:function(){var view=this;if($.cookie('User')){var userData=JSON.parse($.cookie('User')),username=userData['username'],firstName=userData['name'];this.model.set('username',username);this.model.set('firstname',firstName);}
if(!Red.SEON.data&&Red.SeonOnLogin){App.vent.trigger('seon:get_device_data');App.vent.on('seon:data_received',function(response){view.model.set('seon',response);});}},onRender:function(){var view=this;switch(this.model.get('state')){case this.model.notAuthState:this.ui.usernameField.focus();break;case this.model.pendingAuthState:this.ui.loginForm.hide();this.ui.loader.show();break;case this.model.pendingLogout:this.ui.loginForm.hide();this.ui.loader.show();break;case this.model.authSuccessState:$('#login').hide();this.ui.successMessage.show();this.ui.loginForm.hide();setTimeout(_.bind(this.hidePopup,this),1000);break;case this.model.authFailState:this.ui.authErrorMessage.show();this.ui.mainError.show();this.ui.loginForm.addClass('has-error');this.ui.passwordField.focus();if(Util.manageStorage('get','showRegistrationConfirm')){App.vent.trigger('login:submit',App.LoginModule.loginModel);}
break;case this.model.unknownAuthState:this.ui.loginForm.hide();this.ui.loader.show();break;case this.model.tandcState:this.ui.loginForm.hide();break;case this.model.authUnknownState:this.ui.generalErrorMessage.show();this.ui.mainError.show();this.ui.loginForm.addClass('has-error');break;case this.model.autoLoggedAuto:this.ui.generalErrorMessage.show();this.ui.mainError.show();this.ui.loginForm.addClass('has-error');break;}
App.vent.trigger('hide-game-info');},onShow:function(){if(this.model.get('state')===this.model.notAuthState){this.ui.usernameField.focus();}},showAsPopup:function(){var view=this;App.Translations.loadTranslation('common',function(translations){var parentDiv=view.$el.parent();html=$('html');parentDiv.addClass('visible');html.addClass('no-scroll');parentDiv.click(function(e){if($(e.target).is('#login *')){if($(e.target).closest('.close-btn')[0]){e.stopPropagation();e.preventDefault();view.hidePopup();view.clearSessionOnClose();}}
else{e.stopPropagation();e.preventDefault();}});});},hidePopup:function(){var html=$('html');this.$el.parent().removeClass('visible');html.removeClass('no-scroll');App.vent.trigger('hide-game-info');},clearSessionOnClose:function(){Util.manageStorage('remove','launchAccount');Util.manageStorage('remove','showPromoPopup');Util.manageStorage('remove','ShowPromoPopUpInfo');}});var LoginStatusView=Backbone.Marionette.ItemView.extend({tagName:'div',className:'login-status',template:'#login-status-template',ui:{'loggedIn':'.logged-in','notLoggedIn':'.not-logged-in','loadingState':'.loading-state','loginButton':'a[href$="#login"]','logoutButton':'a[href$="#logout"]'},modelEvents:{'change:username':'render','change:state':'render','change:stateDetails':'render'},events:{'click @ui.loginButton':'loginButtonClicked','click @ui.logoutButton':'logoutButtonClicked','click .deposit':'launchBanking'},onRender:function(){switch(this.model.get('state')){case this.model.authSuccessState:this.ui.loggedIn.show();this.ui.notLoggedIn.hide();break;case this.model.pendingAuthState:this.ui.loggedIn.hide();this.ui.notLoggedIn.hide();this.ui.loadingState.show();break;case this.model.pendingLogout:this.ui.loadingState.show();break;case this.model.unknownAuthState:this.ui.loggedIn.hide();this.ui.notLoggedIn.hide();this.ui.loadingState.show();break;case this.model.tandcState:this.ui.loadingState.show();break;default:this.ui.loggedIn.hide();break;}},loginButtonClicked:function(e){e.stopPropagation();e.preventDefault();App.vent.trigger('LoginRequested');},logoutButtonClicked:function(e){e.stopPropagation();e.preventDefault();$('html').removeClass('popup-active');App.vent.trigger('logout:submit',this.model);},launchBanking:function(e){e.stopPropagation();e.preventDefault();launchBanking();}});App.addInitializer(function(options){if($('#login')[0]){App.addRegions({loginRegion:'#login'});App.addRegions({headerBarRegion:'#headerbar'});}});App.module("LoginModule",function(LoginModule,App,Backbone,Marionette,$){LoginModule.addInitializer(function(options){if($('#login-template').length==0){return false;}
LoginModule.loginModel=new LoginModel();if($.cookie('Auth')){var pingData={};if($('.slideshow-text-box .slide-text')[0]){pingData={notifications:['banner']};}else{pingData={notifications:[]};}
pingData.notifications.push('exitBanner');if(Red.isViper=='isviper'){pingData.viper=1;}
App.vent.trigger('ping:sending',pingData);$.ajax({type:"POST",url:'/api/status',dataType:"json",data:pingData}).done(LoginModule.gotStatus).fail(LoginModule.errorStatus);}else{LoginModule.loginModel.set('state',LoginModule.loginModel.notAuthState);if($.cookie('User')){var pingData={};if($('.slideshow-text-box .slide-text')[0]){pingData={notifications:['banner']};}else{pingData={notifications:[]};}
pingData.notifications.push('exitBanner');if(Red.isViper=='isviper'){pingData.viper=1;}
App.vent.trigger('ping:sending',pingData);$.ajax({type:"POST",url:'/api/status',dataType:"json",data:pingData}).done(function(response){LoginModule.gotStatusKnownUser(response);}).fail(function(){});}}
LoginModule.loginView=new LoginView({model:LoginModule.loginModel});LoginModule.loginStatusView=new LoginStatusView({model:LoginModule.loginModel});if($('#login')[0]){App.loginRegion.show(LoginModule.loginView);App.headerBarRegion.show(LoginModule.loginStatusView);}
App.vent.on('LoginRequested',function(){$('.responsive-popover-wrapper').remove();LoginModule.loginView.showAsPopup();});});App.vent.on('show:second-login',function(loginModel){App.LoginModule.loginModel.set({state:'Not Authenticated'});App.LoginModule.extraLoginView=new LoginView({model:App.LoginModule.loginModel});setTimeout(function(){$('.responsive-popover-wrapper .login-box').html(App.LoginModule.extraLoginView.render().$el);},100);});App.vent.on('login:submit',function(loginModel){loginModel.set('state',loginModel.pendingAuthState);$.ajax({type:"POST",url:'/account/login',data:loginModel.toJSON(),dataType:"json"}).done(function(data){LoginModule.loginSuccess(loginModel.toJSON(),data);var currentEvent={'event':'Login','regCasinoId':JSON.parse($.cookie('User'))['RegisteredCasinoId'],'playerId':JSON.parse($.cookie('User'))['userId'],'id4ga':JSON.parse($.cookie('User'))['id4ga'],'tier':JSON.parse($.cookie('User'))['loyaltyTier']};updateAppEvents(currentEvent);}).fail(function(response){LoginModule.loginFail(response);App.vent.trigger('login:fail',response);});});App.vent.on('logout:submit',function(loginModel){loginModel.set('state',loginModel.pendingLogout);$.ajax({type:"POST",url:'/account/logout',dataType:"json",data:{}}).done(LoginModule.logoutSuccess).fail(LoginModule.logoutFail);});LoginModule.loginSuccess=function(data,loginData){$.removeCookie('mute');$.removeCookie('squish-bug-clicked');var cookieNames=document.cookie.split(/=[^;]*(?:;\s*|$)/);for(var i=0;i<cookieNames.length;i++){if(/^show-/.test(cookieNames[i])){$.removeCookie(cookieNames[i],{path:'/'});}}
if(loginData.onCa){window.location.replace('/ontario-closing');}
var contentLoad=window.location.href+' #container-inner';$('#container').load(contentLoad,function(response,status,xhr){xhr.success(function(){$(document).trigger('reload:ajax');App.vent.trigger('login:success',data);App.vent.trigger('login:sportsbook-success');LoginModule.loginModel.set('state',LoginModule.loginModel.authSuccessState);$('<div class="login-tracking-holder hidden"></login-tracking-holder">').appendTo($('#container'));window.adalyserTracker("trackEvent","lce4",{uuid:JSON.parse($.cookie('User'))['userId']});$('#container').find('.login-tracking-holder').load('/api/tracking/Login');if(Util.manageStorage('get','showPromoPopup')||Util.manageStorage('get','showSportPostReg')||Util.manageStorage('get','showSportPostRegNonUK')){App.vent.trigger('show:loader');}
if(Util.manageStorage('get','launchAccount')){App.vent.trigger('show:loader');}
if(Util.manageStorage('get','launchAccount')){App.vent.trigger('show:loader');}
if(Util.manageStorage('get','userFirstLogin')){App.vent.trigger('show:loader');}
if(Util.manageStorage('get','subscribeInfo')){App.vent.trigger('show:subscription-centre',Util.manageStorage('get','subscribeInfo'));Util.manageStorage('remove','subscribeInfo');}
if(typeof QSI!=='undefined'){QSI.API.unload();$.cookie('surveyLogin','true');QSI.API.load();QSI.API.run();}
if(Red.DeviceType==="desktop"){Util.manageStorage('set','showAllNotifications',1);}else{Util.manageStorage('set','showAllNotifications',0);}
Util.manageStorage('remove','notificationsClosed');Util.manageStorage('remove','redeemErrorCount');});App.vent.trigger('login:success:age:restriction',loginData);xhr.fail(function(){document.location.reload(true);});xhr.error(function(){document.location.reload(true);});});};LoginModule.loginFail=function(response){Util.manageStorage('remove','showRegistrationConfirm');$('.responsive-popover-wrapper.registration').remove();if(response&&response.responseJSON&&response.responseJSON.error){App.Translations.loadTranslation('self-exclusion',function(translations){if(response.responseJSON.error=='Account status : Self Excluded'){App.vent.trigger('show:popover',{content:"<div id='self-excluded-popover'><h1 class='popover-header'></h1><i class='fa fa-lock fa-9x'></i><div class='sef-title'>"+translations.popoverTitle+"</div>"+" <div class='sef-descr'>"+translations.popoverDescription+"</div> <a href='/support' class='gameplay'>"+translations.ctaText+"</a></div>",maxWidth:900,maxHeight:686,extraClass:"self-excluded",showCloseButton:true,mobileFullScreen:true,closeClickOutside:false,noScroll:true,closeCallback:function(){App.appRouter.navigate("/",{trigger:true});},});}
if(response.responseJSON.error=='Account status : Take a Break'){App.vent.trigger('show:popover',{content:"<div id='self-excluded-popover'><h1 class='popover-header'></h1><i class='fa fa-lock fa-9x'></i><div class='sef-title'>"+translations.popoverTitle+"</div>"+" <div class='sef-descr'>"+translations.popoverDescriptionTab+"</div> <a href='/support' class='gameplay'>"+translations.ctaText+"</a></div>",maxWidth:900,maxHeight:686,extraClass:"self-excluded",showCloseButton:true,mobileFullScreen:true,closeClickOutside:false,noScroll:true,closeCallback:function(){App.appRouter.navigate("/",{trigger:true});},});}});LoginModule.loginModel.set('stateDetails',response.responseJSON.error);}
LoginModule.loginModel.set('state',LoginModule.loginModel.authFailState);};LoginModule.logoutSuccess=function(data){$.removeCookie('Auth');var contentLoad=window.location.href+' #container-inner';$('#container').load(contentLoad,function(response,status,xhr){xhr.success(function(){$(document).trigger('reload:ajax');App.vent.trigger('logout:success',response);App.vent.trigger('logout:sportsbook-success');if(Util.manageStorage('get','autoLogout')||Util.manageStorage('get','redeemErrorCount')>=3){App.Translations.loadTranslation('common',function(translations){LoginModule.loginModel.set('state',LoginModule.loginModel.autoLoggedAuto);LoginModule.loginModel.set('stateDetails',translations['security-logged-out']);Util.manageStorage('remove','autoLogout');});}else{LoginModule.loginModel.set('state',LoginModule.loginModel.notAuthState);}
if(Red.DeviceType==="desktop"){Util.manageStorage('set','showAllNotifications',1);}else{Util.manageStorage('set','showAllNotifications',0);}
if(Util.manageStorage('get','subscribeInfo')){App.vent.trigger('show:subscription-centre',JSON.parse(Util.manageStorage('get','subscribeInfo')));Util.manageStorage('remove','subscribeInfo');}
Util.manageStorage('remove','notificationsClosed');App.loginRegion.show(LoginModule.loginView);App.headerBarRegion.show(LoginModule.loginStatusView);});xhr.fail(function(){document.location.reload(true);});xhr.error(function(){document.location.reload(true);});});};LoginModule.logoutFail=function(response){LoginModule.loginModel.set('state',LoginModule.loginModel.notAuthState);$.removeCookie('Auth');};LoginModule.triggerCompliancePopover=function(rule){let url=Red.ComplianceSettings[rule].url;var data={};data['accept-'+rule]=1;App.Translations.loadTranslation('common',function(translations){App.vent.trigger('show:popover',{content:"<h2 class='popover-header'>"+translations[rule+'-changes']+"</h2><h1>"+translations[rule+'-changes-text']+"</h1><div class=\"tandc-container\"><div class='loader'><picture><img src='/img/loader.svg'></picture></div></div>",maxWidth:750,maxHeight:600,extraClass:"warning tandc",showCloseButton:false,mobileFullScreen:true,closeClickOutside:false,showCta:true,ctaText:translations[rule+'-cta-text'],noScroll:true,ctaCallback:function(){$.ajax({type:"POST",url:'/api/status',dataType:"json",data:data}).done(function(response){LoginModule.gotStatus(response);}).fail(LoginModule.errorStatus);},closeCallback:function(){LoginModule.loginModel.set('state',LoginModule.loginModel.notAuthState);},showCallback:function(el){$(el).find('.tandc-container').load(url);}});});};LoginModule.gotStatus=function(response){if(!response.ok){LoginModule.errorStatus();return;}
if(response.tandc){LoginModule.loginModel.set('state',LoginModule.loginModel.tandcState);LoginModule.triggerCompliancePopover('tandc');return;}
if(response.pp){LoginModule.loginModel.set('state',LoginModule.loginModel.tandcState);LoginModule.triggerCompliancePopover('privacy-policy');return;}
if(response.knownUser){LoginModule.loginModel.set('state',LoginModule.loginModel.notAuthState);LoginModule.loginModel.set('username',response.username);LoginModule.loginModel.set('password',response.password);App.vent.trigger('get:sessionInfo',response);return;}
LoginModule.loginModel.set('username',response.username);LoginModule.loginModel.set('password',response.password);LoginModule.loginModel.set('state',LoginModule.loginModel.authSuccessState);App.vent.trigger('get:sessionInfo',response);Red.hasBonusBalance=response['hasBonus'];if(Util.manageStorage('get','realGame')){var gameId=Util.manageStorage('get','realGame'),mpTourID=Util.manageStorage('get','mpTourID');if(Util.manageStorage('get','mpTourID')){App.appRouter.navigate("gameplay/"+gameId+'/tournament/'+mpTourID,{trigger:true});}else{App.appRouter.navigate("gameplay/"+gameId,{trigger:true});}
Util.manageStorage('remove','realGame');Util.manageStorage('remove','mpTourID');}};LoginModule.gotStatusKnownUser=function(response){App.vent.trigger('get:sessionInfo',response);};LoginModule.errorStatus=function(response){LoginModule.loginModel.set('state',LoginModule.loginModel.notAuthState);App.Translations.loadTranslation('self-exclusion',function(translations){var jsonData=response.responseJSON;if(jsonData===undefined){return;}
if(jsonData.error==='Account status : Self Excluded'){App.vent.trigger('show:popover',{content:"<div id='self-excluded-popover'><h1 class='popover-header'></h1><i class='fa fa-lock fa-9x'></i><div class='sef-title'>"+translations.popoverTitle+"</div>"+" <div class='sef-descr'>"+translations.popoverDescription+"</div> <a href='/support' class='gameplay'>"+translations.ctaText+"</a></div>",maxWidth:900,maxHeight:686,extraClass:"self-excluded",showCloseButton:true,mobileFullScreen:true,closeClickOutside:false,noScroll:true,closeCallback:function(){App.appRouter.navigate("/",{trigger:true});},});}
if(jsonData.error==='Account status : Take a Break'){App.vent.trigger('show:popover',{content:"<div id='self-excluded-popover'><h1 class='popover-header'></h1><i class='fa fa-lock fa-9x'></i><div class='sef-title'>"+translations.popoverTitle+"</div>"+" <div class='sef-descr'>"+translations.popoverDescriptionTab+"</div> <a href='/support' class='gameplay'>"+translations.ctaText+"</a></div>",maxWidth:900,maxHeight:686,extraClass:"self-excluded",showCloseButton:true,mobileFullScreen:true,closeClickOutside:false,noScroll:true,closeCallback:function(){App.appRouter.navigate("/",{trigger:true});},});}});$.removeCookie('Auth');};});var PostRegisterPromoModel=Backbone.Model.extend({defaults:{'noBonus':false}});var createRegistrationModel=function(translations){var currencyOptions=[{val:0,label:'USD($) - US Dollar'},{val:6,label:'CAD($) - Canadian Dollar'},{val:9,label:'GBP(£) - British Pound'},{val:26,label:'EUR(€) - Euro'},{val:14,label:'SEK(kr) - Swedish Krona'},{val:11,label:'NOK(kr) - Norwegian Krone'},{val:4,label:'JPY (¥) - Japanese Yen'},{val:13,label:'CHF (Fr.) - Swiss Franc'}];if(Red.Section=="sport"){currencyOptions=[{val:0,label:'USD($) - US Dollar'},{val:6,label:'CAD($) - Canadian Dollar'},{val:9,label:'GBP(£) - British Pound'},{val:26,label:'EUR(€) - Euro'},{val:14,label:'SEK(kr) - Swedish Krona'},{val:11,label:'NOK(kr) - Norwegian Krone'},{val:13,label:'CHF (Fr.) - Swiss Franc'}];}
var usernameValidators=[{type:'required',message:translations['required']},{type:'regexp',regexp:/^[-_a-z0-9]+$/i,message:translations['only-letters-under']},{type:'regexp',regexp:/^.{1,15}$/,message:translations['max-15']},{type:'regexp',regexp:/^.{6,}$/,message:translations['min-6']},]
if(Red.Section=="bingo"){var usernameValidators=[{type:'required',message:translations['required']},{type:'regexp',regexp:/^[-_a-z0-9]+$/i,message:translations['only-letters-under']},{type:'regexp',regexp:/^.{1,12}$/,message:translations['max-12']},{type:'regexp',regexp:/^.{6,}$/,message:translations['min-6']},]}
var confirm_promo_template=_.template('<div class="altField" data-editor><label>'+translations['promo-text']+'</label></div>'),tandc_template=_.template('<div class="altField" data-editor><label>'+translations['tandc']+'</label></div>');return Backbone.DeepModel.extend({defaults:{address_1:"",address_2:"",city:"",confirm_password:"",confirm_promo:false,county:"",currency:"",dob:"",email:"",firstname:"",lastname:"",mobile:"",mobile_prefix:"",password:"",sex:"",state:"",tandc:false,username_register:"",zip:"",brand:"32red",locale:"",seon:""},schema:{firstname:{title:translations['first-name']+'*',fieldClass:"first-name",validators:[{type:"required",message:translations['required']},{type:'regexp',regexp:/^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z\s''\-]+$/i,message:translations['letters-only']},{type:'regexp',regexp:/^.{1,20}$/,message:translations['max-20']},{type:'regexp',regexp:/^.{2,}$/,message:translations['min-2']}]},lastname:{title:translations['last-name']+'*',fieldClass:"last-name",validators:[{type:'required',message:translations['required']},{type:'regexp',regexp:/^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z\s''\-]+$/i,message:translations['letters-only']},{type:'regexp',regexp:/^.{1,20}$/,message:translations['max-20']},{type:'regexp',regexp:/^.{2,}$/,message:translations['min-2']}]},email:{title:translations['email']+'*',fieldClass:"email validate-email",validators:[{type:'required',message:translations['required']},{type:'email',message:translations['valid-email']},{type:'regexp',regexp:/^.{1,40}$/,message:translations['max-40']},{type:'regexp',regexp:/^.{6,}$/,message:translations['min-6']}]},mobile_prefix:{type:'Select',title:translations['mobile'],fieldClass:"mobile-prefix",options:['+44','+40']},mobile:{dataType:'Tel',title:translations['mobile']+'*',fieldClass:"mobile-number",validators:[{type:['required'],message:translations['required']},{type:'regexp',regexp:/^.{4,14}$/,message:translations['correct-phone']},]},dob:{type:"DateNew",title:translations['dob']+'*',fieldClass:"dob",yearStart:new Date().getFullYear()-18,yearEnd:1915,validators:['dob']},sex:{type:'Radio',title:translations['gender'],fieldClass:"gender radio",options:{"Male":translations['gender-male'],"Female":translations['gender-female']}},country:{title:translations['country']+'*',fieldClass:"country",options:['Gibraltar','UK'],validators:[{type:'required',message:translations['required']}]},address_1:{title:translations['address-1']+'*',fieldClass:"address1",validators:[{type:'required',message:translations['required']},{type:'regexp',regexp:/^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº.,&¡¿A-Za-z0-9\s''\-\/]+$/i,message:translations['digit-letter-possible']},{type:'regexp',regexp:/.{2,}/,message:translations['correct-address']},{type:'regexp',regexp:/^.{1,150}$/,message:translations['max-150']},]},address_2:{fieldClass:"address2",title:translations['address-2'],validators:[{type:'regexp',regexp:/^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº.,&¡¿A-Za-z0-9\s''\-\/]+$/i,message:translations['digit-letter-possible']},{type:'regexp',regexp:/^.{1,150}$/,message:translations['max-150']},]},city:{title:translations['town']+'*',validators:[{type:'required',message:translations['required']},{type:'regexp',regexp:/.{2,}/,message:translations['correct-city']},{type:'regexp',regexp:/^([a-z0-9 _@.,&-]+)([\sa-z0-9\-]*)$/i,message:translations['only-letters']},{type:'regexp',regexp:/^.{1,150}$/,message:translations['max-150']},]},state:{type:'Select',fieldClass:"county",options:[],title:translations['county'],validators:[{type:'regexp',regexp:/^([a-z0-9 _@.,&-]+)([\sa-z0-9\-]*)$/i,message:translations['digit-letter-possible']},{type:'regexp',regexp:/^.{1,150}$/,message:translations['max-150']},]},zip:{title:translations['address-postalcode']+'*',fieldClass:"post-code",editorAttrs:{"placeholder":translations['postcode-placeholder']},validators:[{type:'required',message:translations['required']},{type:'regexp',regexp:/.{2,}/,message:translations['correct-zip']},{type:'regexp',regexp:/^.{1,40}$/,message:translations['max-40']},]},username_register:{title:translations['username']+'*',fieldClass:"username validate-username",validators:usernameValidators},password:{type:"Password",title:translations['password']+'*',fieldClass:"password-field",validators:[{type:'required',message:translations['required']},{type:'regexp',regexp:/^.{1,40}$/,message:translations['max-40']},{type:'regexp',regexp:/^.{8,}$/,message:translations['min-8']},{type:'regexp',regexp:/^((?!\s).)*$/,message:translations['no-contain-spaces']},{type:'regexp',regexp:/[\u0020-\u007e\u00a0-\u00ff\u0152\u0153\u0178]/,message:translations['no-contain-emoji']},{type:'fieldIncludes',field:'username',message:translations['no-contain-username']},{type:'fieldIncludes',field:'first-name',message:translations['no-contain-firstname']},{type:'fieldIncludes',field:'last-name',message:translations['no-contain-lastname']},{type:'fieldIncludes',field:'dob',message:translations['no-contain-dateofbirth']},{type:'regexp',regexp:/^(?=.*?[a-z])(?=.*?[A-Z0-9#!@$£|%^&*(){}'\-\[\]—.,"“/-_+=:;‘~<>/`])/ , message: translations['digit-letter--special-required'] },
                ]
            },
            confirm_password: {
                type : "Password",
                title : translations['confirm-password']+'*',
                fieldClass : 'confirm-password-field',
                validators: [
                    { type: 'required', field: 'password', message: translations['required'] },
                    { type: 'match', field: 'password', message: translations['password-match'] },
                ]
            },
            currency: {
                type: 'Select',
                title : translations['currency'],
                fieldClass : 'currency',
                options: currencyOptions
            },
            confirm_promo : {
                type: 'Checkbox',
                fieldClass : 'checkbox promo',
                // label: translations['promo-text'],
                template: confirm_promo_template
            },
            tandc : {
                type: 'Checkbox',
                fieldClass : 'checkbox tandc',
                validators: [
                    { type: 'required', message:translations['required'] }
                ],
                template: tandc_template,
            }

        },
    });
};


var ProfitBoostModel = Backbone.Model.extend({
    defaults: {
        username:'',
        bonus:'',
        percent:''
    }
});


 var currencyCountries = {
    "EUR":  {
        "selectOption" : "26",
        "countries" : ["Austria (Österreich)","Andorra","Bulgaria (България)","Croatia (Hrvatska)","Denmark (Danmark)","Spain (España)","Portugal", "Romania (România)", "Italy (Italia)", "Germany (Deutschland)", "Ireland"]
    },
    "GBP" : {
        "selectOption" : "9",
        "countries" : ["United Kingdom","Gibraltar"]
    },
    "USD" :  {
        "selectOption" : "0",
        "countries" : ["United States"]
    },
    "CAD" :  {
        "selectOption" : "6",
        "countries" : ["Canada"]
    },
    "SEK" :  {
        "selectOption" : "14",
        "countries" : ["Sweden (Sverige)"]
    },
    "NOK" :  {
        "selectOption" : "11",
        "countries" : ["Norway (Norge)"]
    },
};

var RegistrationView = Backbone.Marionette.ItemView.extend({
    template: '#registration-template',

    tagName: 'div',
    className: 'registration-area',
    regions: {},
    emailValid:null,
    emailInUse:null,

    events : {
        'click  .submit-registration'      : 'submitForm',
        'click  .next-section'        : 'validateSection',
        'keyup  .fields-holder input'     : 'validationInput',
        'change .mobile-number'          : 'setCountydropdown',
        'change .mobile-number input'      : 'setDefaultCountry',
        'click  .show-password'        : 'revealPassword',
        'change .gender input '       : 'selectGender',
        'change .country input'       : 'onSelectCountry',
        'change .password-field input'      : 'setPasswordStrenght',
        'keyup  .password-field input'            : 'passwordCheck',
        'paste  .password-field input'            : 'passwordCheck',
        'blur  .username input'                 : 'validateUsername',
        'focus  .username input'                 : 'disableSubmitButton',
        'blur  .email input'                     : 'validateEmail',
        'click  .tandc a'        : 'showTandCPopover',
        'click  .promo a'                         : 'showTandCPopover',
        'change .dob select'       : 'updateDateSelector',
        'click  #manual-data-entry'               : 'disablePostcodeLookup',
        'change input[name="country"]'            : 'checkCountry',
        'click  #try-again'                       : 'reloadPostCodeField'
    },

    initialize: function(options){
        var view = this;
        this.control = null;
        view.translations = options.translations;

        if(!Red.SEON.data){
            App.vent.trigger('seon:get_device_data');
            App.vent.on('seon:data_received', function (response) {
                view.model.set('seon', response);
            });
        }

        this.model.set('dob','');
        this.model.set('mobile','');

        if (Red.Locale == 'ja-jp') {
            Backbone.Form.editors.Date.monthNames = ['1月', '2月', '3月', '4月','5月', '6月', '7月', '8月','9月', '10月', '11月', '12月'];
        }
    },

    onRender : function() {                 
        var view  = this;
        view.updateGTM('/sign-up/step-1','Sign Up: Step 1', '', '', '');
        App.vent.trigger('registration:step', 'step 1 - personal');
        $.cookie('jwPlayed',true);
        view.registrationForm = new Backbone.Form({
            template: _.template($('#registration-form-template').html()),
            model : this.model
        });
        view.$el.find('.form-holder').append(view.registrationForm.render({}).$el);
        view.setCurrency();

        /**
        * formatting telephone input
        */
        setTimeout(function(){
            //set the country code selector
            var country = Red.GeoLocation;
            if(!Red.MGCountries[Red.GeoLocation.toUpperCase()]) {
                country = 'GB'
            }
            var telInput = $('.mobile-number input');

            telInput.intlTelInput({
                defaultCountry: country,
                onlyCountries: view.populateCountriesSelector(Red.PhoneRestrictedCountries),
                utilsScript: "/js/utils.js",
            });

            $('.dob select[data-type="year"]').val($(".dob select[data-type='year'] option:first").val());
            setTimeout(function(){
                if($(".mobile-number .selected-flag").attr('title')) {
                    var countryCode = $(".mobile-number .selected-flag").attr('title').split(':')[1];
                    $('.mobile-number').find('.selected-flag .iti-flag').html(countryCode);
                    $('.mobile-number').find('.selected-flag .iti-flag.nl').html('+');

                    view.updatePlaceholder();
                }
            },500);
            $('.country input').countrySelect({
                defaultCountry : ['GB'],
                preferredCountries : [],
                onlyCountries: view.populateCountriesSelector(Red.RegRestrictedCountries),
            });

            $('li.country[data-country-code="nl"] .flag.nl').removeClass('nl').addClass('eu');
            $('li.country[data-country-code="nl"] .iti-flag').removeClass('nl').addClass('eu');
   $('li.country[data-country-code="nl"] .country-name').text('Netherlands');
            $('li.country[data-country-code="nl"] .dial-code').text('');

            // sorting countries in step 2 of registration (Address)
            view.sortCountries();

            setTimeout(function(){
                $('.iti-mobile-select option[data-dial-code="31"]').html('Netherlands');
            },500);

            $("input[name=mobile]").trigger('change');

            var inputExt = $('input[name="firstname"]').attr('id').split("_")[0];
            view.loadAutocomplete(inputExt);
            // set the default date of birth
        },1);
        
        view.$el.find('.dob select[data-type="date"]').prepend('<option value="default">'+view.translations["dob-day"]+'</option>');
        view.$el.find('.dob select[data-type="month"]').prepend('<option value="default">'+view.translations["dob-month"]+'</option>');
        view.$el.find('.dob select[data-type="year"]').prepend('<option value="default">'+view.translations["dob-year"]+'</option>');
        view.$el.find('.dob select').find('option[value=default]').prop('selected','selected');
        view.$el.find('.country input').attr('readonly','readonly');
        view.userValid = true;


    },

    showPasswordMeter : function(ev) {
        var view = this,
            target = $(ev.target);
        if(!view.$el.find('.password-field').hasClass('error')){
            if($('.password-strength')[0]) {
                $('.password-strength').show();
            } else {
                target.strength({
                    showToggle : false,
                    toggleMask : false,
                    inputTemplate: '{toggle}\n' + '{input}\n',
                    mainTemplate : '{input}\n' + '<span class="password-strength"><span class="password-hint"></span><span class="strength-indicator"><span class="default-text">'+view.translations["strength"]+': </span> {meter}</span></span>',
                    verdictTitles : {
                        0: view.translations['very-weak'],//'Very Weak',
                        1: view.translations['very-weak'],//'Very Weak',
                        2: view.translations['weak'],//'Weak',
                        3: view.translations['good'],//'Good',
                        4: view.translations['good'],//'Good',
                        5: view.translations['strong'],//'Strong',
                    }
                });
            }
            //only show errors on blur
            $('.password-field').find('div[data-error]').hide();
            $('.password-field').removeClass('error');
        }
    },

    //add text to give user a hint for password strength
    checkPasswordStrength: function(ev) {
        var view = this,
            passwordInput = $(ev.target),
            passwordHintSpan = view.$el.find('.password-hint'); 
                 
        switch(passwordInput.strength('verdict')) {
            case 1:
                passwordHintSpan.html(view.translations['password-strength-hint-1']);
            break;
            case 2:
                passwordHintSpan.html(view.translations['password-strength-hint-2']);
            break;
            case 3:
                passwordHintSpan.html(view.translations['password-strength-hint-3']);
            break;
            case 4:
                passwordHintSpan.html(view.translations['password-strength-hint-4']);
            break;
            case 5:
                passwordHintSpan.html(view.translations['password-strength-hint-4']);
            break;
            default:
                passwordHintSpan.html(view.translations['password-strength-hint-0']);
        }               
    },
    
    hidePasswordMeter : function() {
        $('.password-strength').hide();
        $('.password-field').find('div[data-error]').show();
    },

    passwordCheck : function(e) {
      var view = this,
          passwordField = view.$el.find('.password-field input'),
          confirmPasswordField = view.$el.find('.confirm-password-field input');
      $('.password-field').find('div[data-error]').show();
      confirmPasswordField.val("");
      if(passwordField.val().length > 1) {
          view.showPasswordMeter(e);
          passwordField.focus();
      }
    },

    revealPassword : function(ev) {
        var view = this,
            target = $(ev.target),
            passwordField = view.$el.find('.password-field input[type="password"], .password-field input[type="text"]'),
            confirmPasswordField = view.$el.find('.confirm-password-field input'),
            inputRadio  = target.find('#show-password');

        if(target.hasClass('visible')) {
            target.removeClass('visible');
            passwordField.attr('type','password');
            confirmPasswordField.attr('type','password');
        } else {
            target.addClass('visible');
            passwordField.attr('type','text');
            confirmPasswordField.attr('type','text');
        }
    },

    //validate each part of the registration form
    validateSection :function(ev) {
        ev.preventDefault();
        if($('.fields-holder div input').is(':disabled')){
            return;
        }
        var view = this,
            target = $(ev.target),
            currentSection = target.closest('fieldset').attr('class'),
            nextSection = target.closest('fieldset').next().attr('class'),
            nextSectionNumber = target.attr('data-next'),
            validationFields = target.attr('data-valfields').split(','),
            emailErrMessage = $('.fields-holder .email div[data-error]').html() ? $('.fields-holder .email div[data-error]').html() : null,
            errs, errors = [];

        _.each(validationFields,function(field){
            if(field==='email' && !view.emailValid && emailErrMessage != null){
                errs = {
                    type: 'email',
                    message: "email not valid"
                };
            } else {
                errs  = view.registrationForm.fields[field].validate();
            }
            if(errs === null || errs === undefined) {
            } else {
                errors.push(errs);
            }
        });

        if (errors.length <1) {
            view.updateUserName();
            view.deactivateSection(currentSection);
            view.activateSection(nextSection);
            //update GTM
            view.updateGTM('/sign-up/step-'+nextSectionNumber,'Sign Up: Step '+nextSectionNumber, '', '', '');
            // this is for adobe analytics
            var tealiumStep = 'step '+target[0].dataset.next+' - '+nextSection;
            App.vent.trigger('registration:step', tealiumStep);
            if(nextSection === 'account') {
                view.checkOntarioRegion();
            }
        } else {
            var errorText = $('.general-error').html();
            view.$el.find('fieldset.personal .legend').addClass('error').html(errorText);
        }
    },

    //activate a section of the registration form
    activateSection : function(section) {
        var view = this;
        view.$el.find('fieldset.'+section).show();
        view.$el.find('.top-sections .'+section).addClass('active');
        if(section==='address' && $('.selected-flag').attr('title').split(":")[0]!=='United Kingdom'){
            view.control.destroy();
            view.displayManualEntryFields();
            $('#try-again').addClass('hidden');
            view.$el.find('div.post-code>label').html(view.translations['postal-code']);
            view.resetAllFields();
            this.control.destroy();
        }
    },

    //deactivate a section of the registration form
    deactivateSection : function(section) {
        var view = this;
        view.$el.find('fieldset.'+section).hide();

        view.$el.find('.top-sections .'+section).addClass('animate-right');
        setTimeout(function(){
            view.$el.find('.top-sections .'+section).removeClass('active');
            view.$el.find('.top-sections .'+section).removeClass('animate-bar');
        },600)
    },

    checkOntarioRegion : function() {
        let country  = $('.country-select input').val(),
            region  = $('.county select').val();
        if(country === 'Canada' && region === 'CA-ON') {
            window.location.replace('/ontario-closing');
        }
    },

    //update the username on the second step of registration
    updateUserName : function() {
        var view = this,
            nameHolder = $('.user-first-name');
        nameHolder.html(view.registrationForm.getValue()['firstname']);
    },

    selectGender : function(ev) {
        var view = this,
            target = $(ev.target);
        view.$el.find('.gender li').removeClass('checked');
        target.closest('li').addClass('checked');
    },
    displayLookupFields : function(){
        $('.secondary-data-fields').addClass('hidden');
        $('#manual-data-entry').removeClass('hidden');
        $('.buttons-holder').addClass('hidden');
        $('.post-code').parent().addClass('postal-code-holder');
        this.changePostCodeText(false);
    },
    displayManualEntryFields: function(resetFields = false){
        $('.secondary-data-fields').removeClass('hidden');
        $('#manual-data-entry').addClass('hidden');
        $('.buttons-holder').removeClass('hidden');
        $('.postal-code-holder').removeClass('postal-code-holder');
        if(resetFields){
            this.resetAllFields();
        }
        this.changePostCodeText(true);
        this.control.destroy();
    },
    changePostCodeText: function(isManualEntry = false){
        var postCodeLabel = this.$el.find('.post-code label');
        var postCodeInput = this.$el.find('.post-code input');

        if(isManualEntry){
            postCodeLabel.text(this.translations['address-postalcode-2']);
            postCodeInput.attr('placeholder', '');
        } else {
            postCodeLabel.text(this.translations['address-postalcode']);
            postCodeInput.attr('placeholder', this.translations['postcode-placeholder']);
        }
    },
    resetAllFields: function(){
        $('input[name="address_1"], input[name="address_2"], input[name="city"], input[name="zip"]').val('');
        this.control.load();
        $('.pca').show();
    },
    disablePostcodeLookup: function(){
        this.displayManualEntryFields(true);
        this.control.destroy();
        $('.pca').hide();
    },
    prepFormForSending: function() {
        var view = this;
        //var errs = this.registrationForm.commit();
        var month = parseInt($('.dob select[data-type="month"]').val()) + 1;
        var date = month +'/' + $('.dob select[data-type="date"]').val() +'/' +
                   $('.dob select[data-type="year"]').val();
        var phoneNumber = $('.mobile-number input').val();

        if (view.model.get('country') != 'undefined') {
            if (view.model.get('country') && view.model.get('country').split(' ')[0] == 'Netherlands') {
                if (phoneNumber.substr(0, 4) != "0031" && phoneNumber.substr(0, 2) != '31' && phoneNumber.substr(0, 5) != "00 31" && phoneNumber.substr(0, 6) != "00 31 ") {
                    if (phoneNumber.substr(0, 1) === "0") {
                        phoneNumber = phoneNumber.substr(1);
                    }
                    var mobilePhone = '31' + phoneNumber;
                } else {
                    if (phoneNumber.substr(0, 5) === "00310") {
                        phoneNumber = phoneNumber.substr(5);
                    } else if (phoneNumber.substr(0, 3) === "310") {
                        phoneNumber = phoneNumber.substr(3);
                    } else if (phoneNumber.substr(0, 6) === "00 310") {
                        phoneNumber = phoneNumber.substr(6);
                    } else if (phoneNumber.substr(0, 7) === "00 31 0") {
                        phoneNumber = phoneNumber.substr(7);
                    } else if (phoneNumber.substr(0, 4) === "0031") {
                        phoneNumber = phoneNumber.substr(4);
                    } else if (phoneNumber.substr(0, 2) === "31") {
                        phoneNumber = phoneNumber.substr(2);
                    } else if (phoneNumber.substr(0, 5) === "00 31") {
                        phoneNumber = phoneNumber.substr(5);
                    } else if (phoneNumber.substr(0, 6) === "00 31 ") {
                        phoneNumber = phoneNumber.substr(6);
                    }

                    var mobilePhone = '31' + phoneNumber;
                }
            } else {
                if (phoneNumber.substr(0, 1) === "0") {
                    phoneNumber = phoneNumber.substr(1);
                }
                var mobilePhone = $('.mobile-number .selected-flag .iti-flag').text() + " " + phoneNumber;
            }
        }

        this.model.set(this.registrationForm.model.attributes);

        //set user dob
        this.model.set('dob',date);

        //set user mobile phone
        this.model.set('mobile',mobilePhone);

        //set user sex
        if(!this.model.get('sex')) {
            this.model.set('sex',"");
        }

        //set the currency if is null
        if(!this.model.get('currency')) {
            this.model.set('currency',"0");
        }

        //map the country name to MG's country name
        if($('.country input').countrySelect("getSelectedCountryData")) {
            var countryIso = $('.country input').countrySelect("getSelectedCountryData")['iso2'];

            var iso3 = countryIso.toUpperCase();
            switch (countryIso.toUpperCase()){
                case 'UK':
                    iso3 = Red.MGCountriesISO_3['GB'];
                    break;
                default:
                    iso3 = Red.MGCountriesISO_3[countryIso.toUpperCase()];
            }

            if(iso3){
                this.model.set('country_iso3',iso3);
            }

            if (Red.MGCountries[countryIso.toUpperCase()]) {
                MGCountry = Red.MGCountries[countryIso.toUpperCase()];
                this.model.set('country',MGCountry);
            }
        }
        // "special" treatment for NL
        var countryName = $('.country-select').find('.selected-flag').attr('title');
        if(countryName.split(' ')[0] == 'Netherlands' ) {
            countryIso = 'nl';
            iso3 = Red.MGCountriesISO_3[countryIso.toUpperCase()];
            this.model.set('country_iso3',iso3);
        }
    },

    loadAutocomplete : function(ext) {
        var view = this;
        var fields = [
            { element: ext+"_address_1", field: "Line1", mode: pca.fieldMode.SEARCH | pca.fieldMode.POPULATE  },
            { element: ext+"_address_2", field: "Line2", mode: pca.fieldMode.POPULATE },
            { element: ext+"_city", field: "City", mode: pca.fieldMode.POPULATE },
            { element: ext+"_state", field: "Province", mode: pca.fieldMode.POPULATE},
            { element: ext+"_zip", field: "PostalCode", mode: pca.fieldMode.SEARCH | pca.fieldMode.POPULATE},
        ];
        var options = { key: "CK27-JD28-NF48-KE96",  search: { countries: "GBR" } };
        view.control = new pca.Address(fields, options);
        view.control.listen("populate", function(data) {
                var county = view.foundCounty(data.AdminAreaName),
                    address1 = data.FormattedLine1.replace(/\,/g, ''),
                    address2 = data.FormattedLine2.replace(/\,/g, '');

                $('#'+ext+'_address_1').val(address1);
                $('#'+ext+'_address_2').val(address2);
                $('select[name="state"]').val(county);
                view.displayManualEntryFields();
            });

        if($('input[name="country"]').val() !== 'United Kingdom'){
            this.control.destroy();
            view.resetAllFields();
            view.displayManualEntryFields();
            $('#try-again').addClass('hidden');
        }
    },
    reloadPostCodeField : function(ev){
        var view = this;
        view.displayLookupFields();
        view.resetAllFields();
    },
    checkCountry : function(ev) {
        var view = this,
            target = $(ev.target);
        if(target.val() !== 'United Kingdom'){
            view.control.destroy();
            view.displayManualEntryFields();
            $('#try-again').addClass('hidden');
            view.$el.find('div.post-code>label').html(view.translations['postal-code']);
            view.resetAllFields();
            this.control.destroy();
        } else {
            view.control.load();
            $('#try-again').removeClass('hidden');
            view.displayLookupFields();
            view.$el.find('div.post-code>label').html(view.translations['address-postalcode']);
            view.resetAllFields();
        }
    },
    foundCounty : function (adminAreaName){
        var scotland = /^(Clackmannanshire|Dumfries\s&\sGalloway|East\sAyrshire|East\sLothian|East\sRenfrewshire|Comhairle\sNan\sEilean\sSiar|Falkirk|Highland|Inverclyde|Midlothian|Moray|North\sAyrshire|Orkney\sIslands|Scottish\sBorders|Shetland\sIslands|South\sAyrshire|South\sLanarkshire|Stirling|Aberdeen\sCity|Aberdeenshire|Argyll\s&\sBute|City\sof\sEdinburgh|Renfrewshire|West\sDunbartonshire|West\sLothian|Angus|Dundee\sCity|East\sDunbartonshire|Fife|Perth\s&\sKinross|Glasgow\sCity|North\sLanarkshire)/gi;
        var wales = /^(Isle\sof\sAnglesey|Gwynedd|Conwy|Denbighshire|Flintshire|Wrexham|Ceredigion|Pembrokeshire|Carmarthenshire|Swansea|Neath\sPort\sTalbot|Bridgend|Vale\sof\sGlamorgan|Cardiff|Rhondda\sCynon\sTaf|Caerphilly|Blaenau\sGwent|Torfaen|Monmouthshire|Newport|Powys|Merthyr\sTydfil)/gi;
        var northernIreland = /^(Northern\sIreland)/gi;

        if (adminAreaName === null || adminAreaName.length < 1) {
            return 'GB-ENG';
        }

        if (adminAreaName.match(scotland) !== null) {
            return 'GB-SCT';
        }
        if (adminAreaName.match(wales) !== null) {
            return 'GB-EAW';
        }
        if (adminAreaName.match(northernIreland) !== null) {
            return 'GB-NIR';
        }

        return 'GB-ENG';
    },
    submitForm : function(ev) {
        var view = this;
        var errs = this.registrationForm.commit();

        this.prepFormForSending();
        if (!errs && view.userValid) {

            this.$el.find('.loading-step').addClass('visible');
            $.ajax({
                type: "POST",
                url: '/registration/register',
                data: this.model.toJSON(),
                dataType: "json"
            }).done(function(data) {
                if(data.ok) {
                    setTimeout(function(){
                        App.LoginModule.loginModel.set({
                            username: data.data.user.username,
                            password: data.data.user.password,
                            state   : App.LoginModule.loginModel.pendingAuthState
                        });

                        if(!!Red.Section && Red.Section == 'sport'){
                            if(data.showSportPostReg){
                                Util.manageStorage('set', 'showSportPostReg', true);
                            } else {
                                Util.manageStorage('set', 'showSportPostRegNonUK', true);
                            }
                        }else {
                            Util.manageStorage('set', 'showRegistrationConfirm', true);
                        }
                        setTimeout(function(){
                            App.vent.trigger('login:submit',App.LoginModule.loginModel);
                        },100);

                        Util.manageStorage('set', 'userFirstLogin', true);
                        view.addTracking(data);
                    },300);
                } else {
                    view.$el.find('.loading-step').removeClass('visible');
                    if(data.generalError || data.userExist) {
                        view.deactivateSection('account');
                        view.activateSection('personal');
                        $('#select-mobile-date').val("").removeAttr('data-dob');
                    }

                    if(data.generalError) {
                        var errorText = $('.general-error').html();
                        if(data.data.excluded === "1"){
                            //load translation
                            errorText = view.translations['self-excluded-error'];
                        } else if(data.data.errorMessage) {
                            errorText = data.data.errorMessage;
                        }

                        $('fieldset.personal').find('.legend').addClass('error')[0].innerHTML = errorText;


                    }

                    if(data.userExist) {
                        $('fieldset.personal').find('.legend').addClass('error').html(data.errorMessage);
                    }
     
     if(data.possibleDuplicate) {      
      App.ShowResponsivePopover.popoverView.hidePopover();
      setTimeout(function() {
       App.vent.trigger('show:popover', {
        content: view.translations['registration-unsuccessful-content'],
        showCloseButton: true,
        closeClickOutside: true
       });
      }, 50);
      return;
     }
                }
            }).fail(function(){
                // console.log('Post failed');
            });
        } else {
            if(!view.userValid) {
                view.$el.find('.username').addClass('error');
                view.$el.find('.username').find('div[data-error]').html(view.translations['already-signed-up']);
            }
        }
    },

    addTracking : function(data) {
        var view = this;

        // check to see if the email is a test email
        var emailAvailable = $('fieldset.personal input[name="email"]').val() ? $('fieldset.personal input[name="email"]').val() : '';
        if(emailAvailable.indexOf('@kindredgroup.com')<1){
            //adalyser tracking
            window.adalyserTracker("trackEvent", "lce2",
                {a1: "Registration", uuid: data.data.user.userId}
            );
            //tealium tracking
            var trackingData = {
                userId : data.data.user.userId,
                com_optin : view.model.get('confirm_promo')
            };
            
            //Tealium Tracking
            App.vent.trigger('registration:success',trackingData);

            //update GTM
            view.updateGTM('/sign-up/success','Sign Up: Success', data.data.user.userIdentifier, data.data.user.userId, data.data.sha_user_id);

            //flashtalking
            view.$el.find('.tracking-holder').load('/api/tracking/Registration?userId='+data.data.user.userId);
        }
    },

    lastData: null,

    validationInput : function(e){
        var view = this,
            $el = $(e.target);

        if($el.attr('name')==='email'){
            return;
        }
        this.registrationForm.fields[$el.attr('name')].validate();

        // Post update to capture api
        // view.prepFormForSending();

        var tmpData = $('.form-holder form').serializeArray();
        var data = {};
        _.each(tmpData, function(element) {
            data[element.name] = element.value;
        });
        var month = parseInt($('.dob select[data-type="month"]').val()) + 1;
        var date = month +'/' + $('.dob select[data-type="date"]').val() +'/' +
                   $('.dob select[data-type="year"]').val();
        var phoneNumber = $('.mobile-number input').val();

        if(phoneNumber.substr(0, 1) === "0") {
            phoneNumber = phoneNumber.substr(1);
        }

        var mobilePhone = $('.mobile-number .selected-flag .iti-flag').text()+" "+ phoneNumber;

        data.dob = date;

        data.mobile = mobilePhone;
        var passwordLength = '',
            confirmPasswordLength = '';


        if((data.confirm_password != '') && (data.password === data.confirm_password)) {
            data.password_match = 1;
        } else {
            data.password_match = 0;
        }

        if (data.password != '') {
            data.password = data.password.length;
        }

        if (data.confirm_password != '') {
            data.confirm_password = data.confirm_password.length;
        }

        if(data.dob && data.dob.split('/')[1]=="default") {
            data.dob = 'incomplete'
        }

        data.locale = Red.Locale;

        if(Red.Theme != null || Red.Theme != undefined) {
            data.brand = Red.Theme;
        } else {
            data.brand = "32Red";
        }
    },

    //when focus on username field, we shouldn't be able to click on submit
    disableSubmitButton : function() {
        var view = this;
        view.$el.find('.submit-registration').addClass('disabled');
    },

    //validate the usermane
    validateUsername : function(ev){
        var view = this,
            target = ev ? $(ev.target) : $(ev),
            usernameValue = target.val(),
            usernameField = target.attr('name'),
            fieldHolder = target.closest('.validate-username'),
            currentSection = target.closest('fieldset');

        if((Red.Theme === null || Red.Theme === undefined) && usernameField == "email") {
            //we don't have to check the email for 32red
            return;
        }

        view.$el.find('.submit-registration').removeClass('disabled');
        //if it's the same username, don;t check it again
        if(usernameValue === view.model.get('username_register')) {
            return;
        }

        var errs = this.registrationForm.fields[usernameField].validate();
        if(usernameValue.length > 1 && !errs) {
            view.$el.find('fieldset.account').addClass('show-loader');
            target.prop("disabled", true);
            $.ajax({
                type: "POST",
                url: '/registration/validateUsername?username=' + encodeURIComponent(usernameValue),
                dataType: 'json'
            }).done(function(data) {
                view.$el.find('fieldset.account').removeClass('show-loader');
                target.prop("disabled", false);
                if(data.userExist) {
                    fieldHolder.addClass('error');
                    fieldHolder.find('div[data-error]').html(view.translations['already-signup']);
                    view.userValid = false;
                } else {
                    fieldHolder.removeClass('error');
                    fieldHolder.find('div[data-error]').html('');
                    $('.password-field input.form-control').focus();
                    view.userValid = true;
                    view.model.set('username_register', usernameValue);
                }
            }).fail(function(){
                // console.log('Post failed');
            });
        }
    },

    //validate the email
    validateEmail : function(ev){
        var view = this,
            target = ev ? $(ev.target) : $(ev),
            fieldHolder = target.closest('.validate-email'),
            emailValue = target.val(),
            emailField = target.attr('name');

        if (emailValue !== view.model.get('email') || emailValue===''){
            var errs = this.registrationForm.fields[emailField].validate();
        }
        if(emailValue !== view.model.get('email') && emailValue.length > 1 && !errs){
            view.$el.find('fieldset.personal').addClass('show-loader');
            target.prop("disabled", true);

            view.emailValid = false;
            view.validateEmailAPI(emailValue, function(data){
                view.$el.find('fieldset.personal').removeClass('show-loader');
                target.prop("disabled", false);
                if(data.ok === true && data.can_use === true){
                    fieldHolder.removeClass('error');
                    fieldHolder.find('div[data-error]').html('');
                    view.emailValid = true;
                    view.emailInUse = false;
                    view.model.set('email', emailValue);

                    var legend = view.$el.find('fieldset.personal .legend');
                    legend.removeClass('error').html(view.$el.find('fieldset.personal .default-legend').html());
                }else{
                    fieldHolder.addClass('error');
                    fieldHolder.find('div[data-error]').html(view.translations['email-in-use']);
                    view.emailInUse = true;
                    view.emailValid = false;
                    view.model.set('email', emailValue);

                    var errorText = view.translations['email-exists'];
                    view.$el.find('fieldset.personal .legend').addClass('error').html(errorText);
                }
            }, function (wait) {
                fieldHolder.addClass('error');
                if(wait <= 0)
                    fieldHolder.find('div[data-error]').html(view.translations['request-queued']);
                else
                    fieldHolder.find('div[data-error]').html(view.translations['request-queued'] + ' ' + wait + ' ' + view.translations['seconds']);
            }, function () {
                fieldHolder.addClass('error');
                fieldHolder.find('div[data-error]').html(view.translations['error-verifying-email']);
            });
        }
    },

    validateEmailAPI: function (email, onSuccess, onWait, onError) {
        var view =this;
        var token = $('#emailToken').val();
        var waitFunc = function(time){
            if(time < 1)
                return;
            time--;
            setTimeout(function () {
                waitFunc(time)
            }, 1000);
            onWait(time);
        };
        $.ajax({
            type: "GET",
            url: '/registration/validateEmail?token=' + token + '&email=' + encodeURIComponent(email),
            cache: false
        }).done(function(data) {
            if(data.wait){
                setTimeout(function () {
                    view.validateEmailAPI(email,onSuccess,onError);
                }, data.wait * 1000);
                if(data.wait > 20)
                    waitFunc(data.wait);
            }else{
                onSuccess(data);
            }
        }).error(function () {
            onError();
        });
    },


    //set the country depending on the phone prefix
    setDefaultCountry : function(ev) {
        var view  = this,
            target = $(ev.target),
            countrySelector = $('.country select'),
            countryData = target.intlTelInput("getSelectedCountryData");

        //view.setCountydropdown();

        $('.country input').countrySelect("selectCountry", countryData.iso2);
        $('.country-select').find('.selected-flag .flag.nl').removeClass('nl').addClass('eu');
        view.setCurrency(countryData.name);
        if(countryData.name.split(' ')[0] == 'Netherlands' ) {
            $('.mobile-number').find('.selected-flag .iti-flag').html('+');
            $('.country-select > input').val('Netherlands');
        } else {
            $('.mobile-number').find('.selected-flag .iti-flag').html('+'+countryData.dialCode);
        }
        view.updatePlaceholder();
    },

    //set the currency depending on the country
    onSelectCountry : function(ev) {
        var view = this,
            target = $(ev.target),
            countryName = target.val();
        view.setCurrency(countryName);
        if(countryName.split(' ')[0] == 'Netherlands' ) {
            $('.flag.nl').removeClass('nl').addClass('eu');
            $('.country-select > input').val('Netherlands');
        }

        setTimeout(function(){
            $('.iti-mobile-select option[data-dial-code="31"]').html('Netherlands');
        },500)
        view.setCountydropdown();
    },

    setCurrency : function(selectedCountry){
        var view = this, currencyCode;
        _.each(currencyCountries,function(countryList){
            _.each(countryList.countries,function(country){
                if($.trim(country) === $.trim(selectedCountry)) {
                     currencyCode = countryList.selectOption;
                     $('.currency select').find('option').removeAttr('selected');
                     $('.currency select').find('option[value='+ currencyCode +']').prop('selected','selected');
                }
            });
        });
    },

    setCountydropdown : function(selectedCountry) {
        var countryData = $('.country input').countrySelect("getSelectedCountryData"),
            countryName = $('.country-select').find('.selected-flag').attr('title');

        if(countryData) {
            var countryIso = countryData['iso2'];
        }

        if(countryName.split(' ')[0] == 'Netherlands' ) {
            countryIso = 'nl';
        }

        var iso3 = countryIso.toUpperCase();
        switch (countryIso.toUpperCase()){
            case 'UK':
                iso3 = Red.MGCountriesISO_3['GB'];
                break;
            default:
                iso3 = Red.MGCountriesISO_3[countryIso.toUpperCase()];
        }

        var view = this;
        if (iso3 in view.regions) {
            view.populateRegionsDropdown(view.regions[iso3]);
            return;
        }

        $.ajax({
             async: false,
             url: '/api/getCountryRegions/' + iso3,
             dataType: 'json',
             error: function (data) {
                 ok = false;
             },
             success: function (data) {
                 if (data.data !== null && data.data.length > 0){
                     view.regions[iso3] = data.data;
                 }
                 view.populateRegionsDropdown(data.data);
             }
         });
    },

    populateRegionsDropdown:function(data){
        var selector = $('.county select');
        selector.html('');



        if(data.length === 0){
            selector.append('<option value="">N/A</option>');
        } else {
            _.each(data,function(item, key){
                if(item['translatedName'] !=='ON-Ontario') {
                    selector.append('<option value=' + item['stateIsoCode'] + '>' + item['translatedName'] + '</option>');
                }
            });
        }
    },

    updatePlaceholder : function() {
        var view = this;
        var placeholder = view.$el.find('.intl-tel-input input').attr('placeholder');
        if(typeof placeholder != 'undefined') {
            if(placeholder.substr(0, 1) === "0") {
                placeholder = placeholder.substr(1);
                view.$el.find('.intl-tel-input input').attr('placeholder',placeholder);
            }
        }
    },

    updateDateSelector : function(ev) {
        var view = this,
            target = $(ev.target);
        target.find('option[value=default]').remove();
    },

    populateCountriesSelector : function(extraExclusions) {
        var key, countries = _.keys(Red.MGCountries),
            exlusions = _.keys(extraExclusions),
            leftcountries = _.difference(countries, exlusions);
        return _.map(leftcountries, function(item){
            return item.toLowerCase()
        });
    },

    sortCountries : function(){
        var countryList = $('.country .country-select .country-list li');
        $('.country .country-select .country-list').empty();
        countryList.sort((a,b)=>a.getElementsByClassName('country-name')[0].innerHTML>b.getElementsByClassName('country-name')[0].innerHTML?1:-1).appendTo('.country .country-select .country-list');
    },

    updateGTM : function(pageUrl,PageTitle, regId, userId, sha_user_id) {
        //update the google tag manager data layer
        var locale;
        if(Red.Locale === "en-gb") {
            locale = "";
        } else {
            locale = '/'+Red.Locale;
        }

        var dataLayerItem = {
            'event':'VirtualPageview',
            'virtualPageURL':locale+pageUrl,
            'virtualPageTitle':PageTitle,
            'id4ga': sha_user_id
        };

        updateDataLayer(dataLayerItem);

        var currentEvent = {
            'virtualPageURL':locale+pageUrl,
            'virtualPageTitle':PageTitle,
            'regCasinoId' : regId,
            'playerId' :  userId
        };

        updateAppEvents(currentEvent);
    },

    showTandCPopover : function(ev) {
        ev.preventDefault();
        var options = {
            iframe : false,
            width: 1024,
            height: 660,
            content : "<h1 class='popover-header'>"+Red.ThemeTitle+"</h1><div class='overlay-content'><div class='loader'><picture><img src='/img/loader.svg'></picture></div></div>",
            src: $(ev.target).attr('href')+ ' .container',
        }
        App.vent.trigger('show:overlay-message',options);
    }
 });

/**
* backbone forms extra validators
*/

(function () {
    Backbone.Form.validators.usernameAvailable = function (options) {
        options = _.extend({type: 'text', message: 'It looks like you’ve already signed up!'}, options);

        return function usernameAvailable(value) {
            options.value = value;
            var ok = false;
            $.ajax({
                async: false,
                url: 'registration/validateUsername?username=' + encodeURIComponent(value),
                dataType: 'json',
                error: function (data) {
                    ok = false;
                },
                success: function (data) {
                    if(data.userExist) {
                        ok = true;
                        $('.password-field input').focus();
                    } else {
                        ok = false;
                    }
                }
            });
            var err = {
                type: options.type,
                message: 'It looks like you’ve already signed up!'
            };
            return ok ? err : null;
        };
    };

    /**
     * extend the date
     */

    Backbone.Form.editors.DateNew = Backbone.Form.editors.Date.extend({
      updateHidden: function() {
        var val = this.getValue();
        if (val == "Invalid Date" ) {} else {
            if (_.isDate(val)) val = val.toISOString();
            this.$hidden.val(val);
        }
      }
    });

    Backbone.Form.validators.fieldIncludes = function (options) {
        return function fieldIncludes(value) {
            options.value = value;
            let compareValue = $('.'+options.field+' input').val();
            //only do the check if the other fields are populated
            if(compareValue) {
                if(options.field === "dob") {
                    let dobDFirst = moment(compareValue).format('DDMMYY');

                    if(value.includes(dobDFirst)) {
                        return {
                            type: options.type,
                            message: options.message
                        };
                    }
                } else {
                    if (value.toLowerCase().includes(compareValue.toLowerCase())) {
                        return {
                            type: options.type,
                            message: options.message
                        };
                    }
                }
            }

        };
    };

    Backbone.Form.validators.dob = function (options) {
        options = _.extend({type: 'date', message: 'You must be at least 18 years old!'}, options);
        return function dob(value) {
            if(value == "Invalid Date"){
                var err = {
                    type: options.type,
                    message: 'Please select your date of birth'
                };
                return err;
            }else{
                options.value = value;
                var ok = false,
                    selectedDate = new Date(value),
                    userYear = selectedDate.getFullYear(),
                    userMonth = selectedDate.getMonth(),
                    userDay = selectedDate.getDate();
                    dobValue = $('.form-holder .dob input[type=hidden]').val();
                    tempDate = new Date(userYear + 18, userMonth, userDay);

                if(tempDate >= new Date() ) {
                    ok = true;
                    
                }
                var err = {
                    type: options.type,
                    message: 'You must be at least 18 years old!'
                };
            }
            
            return ok ? err : null;
        };
    };
})();
App.module("RegistrationModule", function(RegistrationModule, App, Backbone, Marionette, $) {
    RegistrationModule.addInitializer(function(options) {
        if(App.Translations && App.Translations.loadTranslation) {
            App.Translations.loadTranslation('registration', function(translations) {
                window.RegistrationModel = createRegistrationModel(translations);
                RegistrationModule.registrationModel = new RegistrationModel();

                App.vent.on('registration:request',function(){
                    $('.responsive-popover-wrapper').remove();
                    RegistrationModule.showPopover();
                    App.addRegions({ registratioRegion: '#registration-holder' });
                    App.registratioRegion.show(new RegistrationView({
                        model: RegistrationModule.registrationModel,
                        translations : translations
                    }));
                });

                App.vent.on('registration:confirm-popover',function(){
                    RegistrationModule.showPopover();
                    App.addRegions({ registratioRegion: '#registration-holder' });
                    App.registratioRegion.show(new RegistrationConfirmView({
                        model: RegistrationModule.PostRegisterPromoModel
                    }));

                });


                App.vent.on('registration:post-reg-popover',function(){
                    window.location.hash = '#home';
                    setTimeout(function () {
                        RegistrationModule.showSportRegPopover();
                        App.addRegions({ registratioRegion: '#registration-bonus-holder' });
                        App.registratioRegion.show(new RegistrationPostSportRegView());
                    },500);
                });

                App.vent.on('registration:post-reg-popover-non-uk',function(){
                    window.location.hash = '#home';
                    setTimeout(function () {
                        RegistrationModule.showSportRegSuccessNonUK();
                        App.addRegions({ registratioRegion: '#registration-bonus-holder' });
                        App.registratioRegion.show(new RegistrationPostSportRegViewNonUK());
                    },500);

                });
            });
        }
    });

    App.vent.on('ping:received',function(data){
        //this is an extra check, in case the post registration popover is not shown
        RegistrationModule.setPostRegistrationModel(data);
    });

    App.vent.on('get:sessionInfo', function(data) {
        setTimeout(function(){
            RegistrationModule.setPostRegistrationModel(data);
        },100);
    });

    RegistrationModule.setPostRegistrationModel = function(data) {
        //if user is in provisional, don't display the promo popover
        if(data.userState == 'provisional') {
            Util.manageStorage('remove', 'showRegistrationConfirm');
            Util.manageStorage('remove', 'showSportPostReg');
            Util.manageStorage('remove', 'showSportPostRegNonUK');
            return;
        }

        //post registration offer
        if( Util.manageStorage('get', 'showRegistrationConfirm')) {
            Util.manageStorage('remove', 'showRegistrationConfirm');
            var bonusZB = _.filter(data['notifications']['alerts'],function(item){
                return ( item['key'].indexOf('BonusWB') >= 0 || item['key']==="BonusNDB");
            });
            RegistrationModule.PostRegisterPromoModel = new PostRegisterPromoModel({promodata:bonusZB});
            App.vent.trigger('registration:confirm-popover');
        } else if( Util.manageStorage('get', 'showSportPostReg')) {

            Util.manageStorage('remove', 'showSportPostReg');
            if (!$('.responsive-popover-wrapper.registration')[0]) {
                App.vent.trigger('registration:post-reg-popover');
            }
        }
        if( Util.manageStorage('get', 'showSportPostRegNonUK')) {
            Util.manageStorage('remove', 'showSportPostRegNonUK');
            if (!$('.responsive-popover-wrapper.registration')[0]) {
                App.vent.trigger('registration:post-reg-popover-non-uk');
            }
        }
    };


    RegistrationModule.showPopover = function() {
        App.vent.trigger('show:popover',{
            content : "<div id='registration-holder'><h1>"+Red.ThemeTitle+"</h1></div>",
            maxWidth : 1024,
            maxHeight : 705,
            extraClass : "registration",
            showCloseButton : true,
            mobileFullScreen : true,
            closeClickOutside : false,
            noScroll: true,
            closeCallback: function() {
                var dataForTealium = {};
                var inputsFilled = [];
                if($('.registration-confirm-area').length<1) {
                    var sectionClosed = $('.responsive-popover-wrapper .registration-area .top-sections .active').attr('class').split(/\s+/)[0];
                    var indexSectionClosed = $('.responsive-popover-wrapper .registration-area .top-sections .active').index()+1;
                    var formValues = $('.responsive-popover-wrapper .'+sectionClosed+' a.next-section,a.submit-registration').attr('data-valfields').split(',');
                    for(i=0; i < formValues.length; i++){
                        var inputField = $('.responsive-popover-wrapper form .'+sectionClosed+' input[name="'+formValues[i]+'"]').serialize().split('=')[1];
                        if (inputField){
                            inputsFilled.push(formValues[i]);
                        }
                    }
                    dataForTealium.inputsFilled = inputsFilled;
                    dataForTealium.sectionClosed = "step " + indexSectionClosed + " - " + sectionClosed;
                }
                
                App.vent.trigger('registration:close', dataForTealium);
                dataForTealium = {};
                //if the user closes the login popover, remove the session game
                Util.manageStorage('remove', 'realGame');
                Util.manageStorage('remove', 'mpTourID');

                //when the registration is closed, we want to navigate back.
                App.appRouter.navigate("/",{trigger:true});

                $('html').removeClass('show-registration');
            },

            showCallback : function() {
                $('html').addClass('show-registration');
            }
        });
    };

    RegistrationModule.showSportRegPopover = function() {
        App.vent.trigger('show:popover',{
            content : "<div id='registration-bonus-holder'><h1>32Red sport</h1></div>",
            maxWidth : 750,
            maxHeight : 550,
            extraClass : "registration",
            showCloseButton : true,
            mobileFullScreen : true,
            closeClickOutside : false,
            noScroll: true,
            closeCallback: function() {
                //if the user closes the login popover, remove the session game
                Util.manageStorage('remove', 'realGame');
                Util.manageStorage('remove', 'mpTourID');

                //when the registration is closed, we want to navigate back.
                App.appRouter.navigate("/sport",{trigger:true});
            }
        });
    };

    RegistrationModule.showSportRegSuccessNonUK = function() {
        App.vent.trigger('show:popover',{
            content : "<div id='registration-bonus-holder'></div>",
            maxWidth : 1024,
            maxHeight : 300,
            extraClass : "boost-success",
            showCloseButton : true,
            mobileFullScreen : true,
            closeClickOutside : false,
            noScroll: true,
            closeCallback: function() {
                //if the user closes the login popover, remove the session game
                Util.manageStorage('remove', 'realGame');
                Util.manageStorage('remove', 'mpTourID');
                //when the registration is closed, we want to navigate back.
                App.appRouter.navigate("/sport",{trigger:true});
            },
        });
    }
});

//TODO - REFACTOR
var RegistrationConfirmView = Backbone.Marionette.ItemView.extend({
 template: '#registration-confirm-template',

 tagName: 'div',
 className: 'registration-confirm-area',

 events : {
  'click .confirm-promo'    : 'confirmPromo',
  'click input[type="radio"]'  : 'changeUserOption',
        'click .show-banking'    : 'closeRegistrationOverlay',
        'click .optin-and-deposit'   : 'optInAndDeposit',
 },

 initialize : function() {
  var view = this,
   model = view.model,
   bonusNDB = false, textBonusNDB, textBonusWB, textBonusWBSecond, WBKey, NDBKey;
  if(model.get('promodata').length > 0) {
   _.each(model.get('promodata'), function(item){
    //if we have any NDB
    if (item['key'].indexOf('BonusNDB') >= 0 || item['key'].indexOf('BonusBingoNDB') >= 0) {
     bonusNDB = true;
     view.dataBonusNDB = item['data'];
     view.dataBonusNDBImage = item['image'];
     view.dataBonusNDBBanner = item['banner-link'];
     textBonusNDB = item['data']['flow']['states']['default']['title'];
     NDBKey = item['key'];
    }
    //if we have any WB
             if (item['key'].indexOf('BonusWB') >= 0 || item['key'].indexOf('BonusBingoWB') >= 0) {
                 view.dataBonusWB = item['data'];
                 view.dataBonusWBImage = item['image'];
                 view.dataBonusWBBanner = item['banner-link'];
                 textBonusWB = item['data']['flow']['states']['default']['line1'];
                 textBonusWBSecond = item['data']['flow']['states']['default']['registration-confirm-text'];
     WBKey = item['key'];
             }
         });

         view.WBKey = WBKey;
         view.NDBKey = NDBKey;
         view.bonusNDB = bonusNDB;
         view.textBonusNDB = textBonusNDB;
         view.textBonusWB = textBonusWB;
         view.textBonusWBSecond = textBonusWBSecond;
   view.noBonus = false;
  } else {
   view.noBonus = true;
  }
 },

    onRender : function() {
  var view  = this;
  //the model is created in session info module
  App.vent.trigger('hide:loader');
  view.updateUserName(JSON.parse($.cookie('User'))['name'],JSON.parse($.cookie('User'))['username']);
  view.updateUserCountry();
 },

    updateUserCountry: function() {
  if (Red.GeoLocation == 'GB') {
           this.$el.find('.uk-players').show();
  } else {
   this.$el.find('.non-uk-players').show();
  }
 },

 updateUserName : function(name,userName) {
  var view = this,
   nameHolder = view.$el.find('.player-name'),
   userNameHolder = view.$el.find('.player-username');
  nameHolder.html(name);
  userNameHolder.html(userName);
 },

 changeUserOption : function(ev) {
  var view = this,
            target = $(ev.target),
            newOptions = target.attr('data-promoKey'),
            confirmButton = view.$el.find('.confirm-promo');
        confirmButton.attr('data-promo',newOptions);
 },

 confirmPromo : function(ev) {
  ev.preventDefault();
  var view = this,
   target = $(ev.target),
   userOption = target.attr('data-promo');
  App.appRouter.navigate("",{trigger:true});

  if(userOption === "launchBanking") {
   if (Red.DeviceType !== "desktop") {
    $('.responsive-popover-wrapper.registration').remove();
   }
   launchBanking();
   view.$el.find('.confirm-content').hide();
   view.$el.find('.banking-launched').show();
  } else {
   view.displayPopover(userOption);
  }
 },

 serializeData: function(){
  var view = this;
       return {
         bonusNDB     : view.bonusNDB,
         textBonusWB    : view.textBonusWB,
         textBonusNDB   : view.textBonusNDB,
         textBonusWBSecond: view.textBonusWBSecond,
   WBKey    : view.WBKey,
   NDBKey    : view.NDBKey,
   noBonus    : view.noBonus
       };
    },

 displayPopover : function(key) {
  var view = this;
  if(key === "BonusNDB" || key ==="BonusBingoNDB") {
   var data = view.dataBonusNDB;
   data['image'] = view.dataBonusNDBImage;
   data['banner-link'] = view.dataBonusNDBBanner;
  } else {
   data = view.dataBonusWB;
   data['image'] = view.dataBonusWBImage;
   data['banner-link'] = view.dataBonusWBBanner;
  }

  $('.responsive-popover-wrapper.registration').remove();
  App.vent.trigger('show:promo-popup', { key: key, data: data});
 },

    optInAndDeposit: function(ev) {
  ev.preventDefault();
        $.ajax({
            type: "GET",
            url: "/api/optinWelcomeBonus",
            dataType: "json",
        }).done(function (data) {
        }).fail(function () {
        });
        $('.show-banking').click();
    },
    closeRegistrationOverlay: function(ev){
  ev.stopPropagation();
     ev.preventDefault();
     $('body, html').removeClass('no-scroll');
  Util.manageStorage('remove', 'RegistrationConfirmView');
     $('.responsive-popover-wrapper.registration').remove();
  launchBanking();
    }
 });

var RegistrationPostSportRegView = Backbone.Marionette.ItemView.extend({
    template: '#sport-post-reg-template',

    tagName: 'div',
    className: 'registration-confirm-area',

    events : {
        'click #process-profit-boost': 'confirmPromo',
        "click .open-popover" : 'showTandPopover',
        "click .goToPlay" : 'closePopover'
    },

    initialize : function() {

    },

    onRender : function() {
        var view = this;
        var userData = JSON.parse($.cookie('User'));
        view.$el.find('.username').html(userData.username);
        App.vent.trigger('hide:loader');


    },

    onDomRefresh: function() {

        var userData = JSON.parse($.cookie('User'));
        $('.username').html(userData.username);

        var initialValue = 100;
        var stepSlider = document.getElementById('slider-step');


        noUiSlider.create(stepSlider, {
            start: [ initialValue,initialValue ],
            step: 10,
            behaviour: 'drag-fixed',
            connect: true,
            tooltips: true,
            range: {
                'min': [  10 ],
                'max': [ 100 ]
            },
            format: wNumb({
                decimals: 0,
                prefix: '<div class=sliderVallls>',
                postfix: '</div>',
            }),
            pips: {
                mode: 'steps',
                density: 3
            },

        });

        stepSlider.noUiSlider.on('update', function(){

            if($.cookie('User')){
                var userData = JSON.parse($.cookie('User'));
                $('.username').html(userData.username)
            }

            var actualValue = $(".sliderVallls").text();
            $('#profitboostopt').val(actualValue);

            var bonusBet = "&pound;" + ProfitBoostConfig[actualValue];

            $('.noUi-horizontal .noUi-handle-lower .noUi-tooltip').html('<span style="font-size:10px">Profit&nbsp;Boost</span><br/><strong>'+actualValue+'%</strong>');
            $('.noUi-horizontal .noUi-handle-upper .noUi-tooltip').html('<span style="font-size:10px">Max.</span> <strong>'+bonusBet+'</strong><br/><span style="font-size:10px">In-Play Bet</span>');

            $('#profitPercent').html("<strong>"+actualValue+"%</strong>");
            $('#promoBet').html("<strong><span style='font-size:10px'>Max.</span> "+bonusBet+"</strong>");
        });
    },

    confirmPromo: function (ev) {
        var view = this;
        ev.preventDefault();
        var userData = JSON.parse($.cookie('User'));
        var actualValue = $("#profitboostopt").val();

        $.ajax({
            type: "POST",
            url: '/api/bonus',
           /* dataType: "json",*/
            data: {
                bonus: '100profitboost',
                username: userData.username,
                option: actualValue,
                ajax: 1
            }
        }).complete(function(data){
            $('.sport-claim-bonus').removeClass('visible').addClass('hidden');
            $('.sport-claim-success').removeClass('hidden').addClass('visible');
            $('.username').html(userData.username);
            $('.bonus').html(ProfitBoostConfig[actualValue]);
            $('.responseText').html(data.responseText);
            $('.percent').html(actualValue);
            $('.innerModalContent').hide();
        }).fail(function(data) {

            $('.responseText').html(data.responseText);
            $('.not-interested').hide()
            $('.innerModalContent').hide();
        });
    },

    showTandPopover : function(e) {
        e.preventDefault();
        var options = {
            iframe : false,
            content : "<h1 class='popover-header'>32Red</h1><div class='overlay-content'></div>",
            src: $(e.target).attr('href')
        }
        App.vent.trigger('show:overlay-message',options);
    },
    

    closePopover : function(ev) {
        // ev.preventDefault();
        $('.responsive-popover-wrapper.registration').remove();
    }

});
var RegistrationPostSportRegViewNonUK = Backbone.Marionette.ItemView.extend({
 template: '#sport-post-reg-template-non-uk',
 tagName: 'div',
 className: 'registration-confirm-area',

 events : {
  'click .deposit' : 'closePopover'
 },

 initialize : function() {

 },

 onRender : function() {
  var view  = this;
  App.vent.trigger('hide:loader');
  view.updateUserName(JSON.parse($.cookie('User'))['name'],JSON.parse($.cookie('User'))['username']);
 },

 updateUserName : function(name,userName) {
  var view = this,
   nameHolder = view.$el.find('.player-name'),
   userNameHolder = view.$el.find('.player-username');
  nameHolder.html(name);
  userNameHolder.html(userName);
 },

 closePopover : function(e) {
  var view = this;
  e.preventDefault();
  launchBanking();
        $('.responsive-popover-wrapper.boost-success').remove();
  view.$el.remove();
 }

 }); 
var createUserAccountModel = function(translations) {
    return Backbone.DeepModel.extend({
        defaults: {
            'username'           : '',
            'firstname'          : '',
            'surname'            : '',
            'email'              : '',
            'mobile'             : '',
            'addressLine1'       : '',
            'addressLine2'       : '',
            'city'               : '',
            'state'              : '',
            'zip'                : '',
            'country'            : '',
            'totalBalance'       : '',
            'cashBalance'        : '',
            'bonusBalance'       : '',
            'formattedCash'      : '',
            'formattedBonus'     : '',
            'formattedTotal'     : '',
            'sex'                : '',
            'loyaltyTier'        : '',
            'loyaltyBalance'     : '',
            'casino'             : '32Red',
            'bingoAlias'         : '',
            'avatarImgUrl'       : 'https://static.32red.com/avatars/myAccount_avatar_1.svg'
        },
        initialize : function(options) {
            var model = this;
            //set the model for my account
            if(options.ok) {

                var personalDetails = options.playerInfo.personal.personal2,
                    coreDetails = options.playerInfo.core,
                    balances = options.playerInfo.balance.balance,
                    formattedBalance = options.playerInfo.balance.formattedBalance,
                    avatarImgUrl = options.playerInfo.avatar,
                    loyaltyInfo = options.playerInfo.loyaltyInfo;                                     

                if(personalDetails.dateOfBirth === '') {
                    personalDetails.dateOfBirth = false;
                }

                var username = (coreDetails.username) ? coreDetails.username : '';
                var firstname = (personalDetails.firstName) ? personalDetails.firstName : '';
                var lastname = (personalDetails.lastName) ? personalDetails.lastName : '';
                var email = (personalDetails.contact.email) ? personalDetails.contact.email : '';
                var mobile = (personalDetails.contact.homePhoneNumber) ? personalDetails.contact.homePhoneNumber : '';
                var address_1 = (personalDetails.address.addressLine1) ? personalDetails.address.addressLine1 : '';
                var address_2 = (personalDetails.address.addressLine2) ? personalDetails.address.addressLine2 : '';
                var city = (personalDetails.address.city) ? personalDetails.address.city : '';
                var state = (personalDetails.Province) ? personalDetails.Province : '';
                var zip = (personalDetails.address.postalCode) ? personalDetails.address.postalCode : '';
                var country = (personalDetails.address.countryName) ? personalDetails.address.countryName : '';
                var totalBalance = (balances.totalInAccountCurrency) ? balances.totalInAccountCurrency : '';
                var cashBalance = (balances.balances[0].amountInAccountCurrency) ? balances.balances[0].amountInAccountCurrency : '';
                var bonusBalance = (balances.balances[1].amountInAccountCurrency) ? balances.balances[1].amountInAccountCurrency : '';
                var formattedCash = (formattedBalance.cash_balance) ? formattedBalance.cash_balance : '';
                var formattedBonus = (formattedBalance.bonus_balance) ? formattedBalance.bonus_balance : '';
                var formattedTotal = (formattedBalance.total_balance) ? formattedBalance.total_balance : '';
                var sex = (personalDetails.gender) ? personalDetails.gender : '';
                var loyaltyTier = loyaltyInfo.tierName;
                var loyaltyBalance = loyaltyInfo.loyaltyBalance;
                var bingoAlias = coreDetails.alias;
                var playerRegulations = (options.playerInfo.personal.regulated.accountStatusId === 4);
                var isFromUK = (options.playerInfo.personal.regulated.marketType === 'URM');
                            
               

                model.set({
                    'username'           : username,
                    'firstname'          : firstname,
                    'lastname'           : lastname,
                    'email'              : email,
                    'homePhoneNumber'    : mobile,
                    'addressLine1'       : address_1,
                    'addressLine2'       : address_2,
                    'city'               : city,
                    'state'              : state,
                    'postalCode'         : zip,
                    'country'            : country,
                    'totalBalance'       : totalBalance,
                    'cashBalance'        : cashBalance,
                    'bonusBalance'       : bonusBalance,
                    'formattedCash'      : formattedCash,
                    'formattedBonus'     : formattedBonus,
                    'formattedTotal'     : formattedTotal,
                    'sex'                : sex,
                    'loyaltyTier'        : loyaltyTier,
                    'loyaltyBalance'     : loyaltyBalance,
                    'casino'             : Red.Theme,
                    'bingoNickname'      : bingoAlias,
                    'avatarImgUrl'       : avatarImgUrl,
                    'playerRegulations'  : playerRegulations,
                    'isFromUK'           : isFromUK,
                });
            }
        },

        schema: {
            addressLine1: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    { type: 'regexp', regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i, message: translations['digit-letter-possible']  } ,
                    { type: 'regexp', regexp: /.{2,}/, message: translations['correct-address']},
                    { type: 'regexp', regexp: /^.{1,40}$/, message: translations['max-40']}
                ]
            },

            addressLine2: {
                validators: [
                    { type: 'regexp', regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i, message: translations['digit-letter-possible'], required: false  } ,
                ]
            },

            city: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    { type: 'regexp', regexp: /.{2,}/, message: translations['correct-city'] },
                    { type: 'regexp', regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i, message: translations['digit-letter-possible']  } ,
                    { type: 'regexp', regexp: /^.{1,40}$/, message: translations['max-40']}
                ]
            },

            postalCode: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    { type: 'regexp', regexp: /.{2,}/, message: translations['correct-zip'] },
                    { type: 'regexp', regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i, message: translations['digit-letter-possible']  } ,
                    { type: 'regexp', regexp: /^.{1,15}$/, message: translations['max-15']}
                ]
            },

            homePhoneNumber: {
                validators: [
                    { type: 'string', message: translations['required'], required: true },
                    { type: 'regexp', regexp: /^.{8,}$/, message: translations['correct-phone'] },
                    { type: 'regexp', regexp: /^.{1,15}$/, message: translations['max-15']}
                ]
            },

            email: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    { type: 'regexp', regexp: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, message: translations['valid-email']  },
                    { type: 'regexp', regexp: /^.{1,40}$/, message: translations['max-40']},
                    { type: 'regexp', regexp: /^.{6,}$/, message: translations['min-6']}
    ]
   },

            bingoNickname: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    { type: 'regexp', regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i, message: translations['digit-letter-possible']  } ,
                ]
            },

            oldPassword: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                ]
            },

            newPassword: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    { type: 'regexp', regexp: /^.{6,}$/, message: translations['min-6']},
                    { type: 'regexp', regexp: /^(?=.*\d)(?=.*[a-zA-Z]).*$/ , message: translations['digit-letter-required'] }
                ]
            },

            repeatNewPassword: {
                validators: [
                    { type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    { type: 'match', field: 'newPassword', message: translations['password-match'] },
                    { type: 'regexp', regexp: /^.{6,}$/, message: translations['min-6']}
                ]
            }
        },
    });
};
App.module("UserAccountModule", function(UserAccountModule, App, Backbone, Marionette, $) {

    var handleShowUserAccount = function(e) {
        if($('#user-account-dashboard')[0]) {
            if ($.cookie('Auth')) {
                UserAccountModule.renderAccount();
            } else {
                Util.manageStorage('set', 'launchAccount',  1);
                App.vent.trigger('LoginRequested');
            }
        }
    };

    UserAccountModule.addInitializer(function(options) {
        if(App.Translations && App.Translations.loadTranslation) {
            App.Translations.loadTranslation('registration', function(translations) {
                window.UserAccountModel = createUserAccountModel(translations);
                App.vent.on('show:user-account', handleShowUserAccount);
            });
        }
    });

    UserAccountModule.addFinalizer(function() {
        App.vent.off('show:user-account', handleShowUserAccount);
    });

    UserAccountModule.renderAccount = function() {
        App.Translations.loadTranslation('common', function(translations) {
            if ($('#user-account-dashboard .my-account-area')){
                $('#user-account-dashboard .my-account-area').addClass('active');
                App.vent.trigger('show:preloader', '#user-account-dashboard .my-account-area');
            }
            $.ajax({
                type: "GET",
                url: '/account/getPlayerAccountDetails',
                dataType: "json",
                data: {
                }
            }).done(function(response) {                
                UserAccountModule.userAccountModel = new UserAccountModel(response);
                UserAccountModule.userAccountView = new UserAccountView({
                    model: UserAccountModule.userAccountModel,
                    el : $('#user-account-dashboard .my-account-area')
                }).render();
            }).fail();
        });
    };
    
});
var UserAccountView = Backbone.Marionette.ItemView.extend({
    template: '#user-account-template',
    tagName: '<div>',
    className: 'my-account-area',

    events: {
        'click .close-btn'                  : 'closeAccountArea',
        'click .load-section'               : 'loadSection',
        'click .back-button'                : 'backToGeneral',
        'click .balance-button'             : 'showBalanceSection',
        'keyup .name-user-input'            : 'inputLettersOnly',
        'change #show-user-password'        : 'revealPasswords',
        'click .avatar-image'               : 'launchAvatarGallery',
        'click .avatar-item'                : 'selectAvatar',
        'click .save-form'                  : 'saveForm',
        'click #transaction-history'        : 'showTransactionHistory',
        'click #gaming-history'             : 'showGamingHistory',
        'change input'                      : 'validateInput',
        'keydown input.new-password-field'  : 'showPasswordStrength'
    },
    onRender : function() {
        var view = this;
        var loyaltyBoxEl = view.$el.find('.loyalty-details');

        view.formSubmitting = false;
        view.applyIntlInput();
        view.loadAutocomplete();
        view.cashUpdateListener();
        view.passwordStrength();
        if(view.model.get('loyaltyBalance') == 0) { $('#user-account-dashboard .loyalty-details').remove(); return; }
        App.vent.trigger('show:my-account-loyalty', loyaltyBoxEl);

        if(view.model.get('playerInfo.withdrawals').length > 0) {
            App.vent.trigger('show:user-withdrawals', view.model.get('playerInfo.withdrawals'), view.$el.find('.pending-withdrawals'));
        }
    },
    cashUpdateListener : function(){
        var view = this;
        App.vent.on('ping:received', function(balances) {
            var formattedCash  = balances['playerCashBalance'];
            var formattedBonus = balances['playerBonusBalance'];
            var formattedTotal = balances['playerTotalBalance'];
            var totalBalance   = balances['playerInfo']['balance']['TotalBalance'];
            var cashBalance    = balances['playerInfo']['balance']['Real Balance'];
            var bonusBalance   = balances['playerInfo']['balance']['Bonus Balance'];

            view.model.set({
                'formattedCash'  : formattedCash,
                'formattedBonus' : formattedBonus,
                'formattedTotal' : formattedTotal,
                'totalBalance'   : totalBalance,
                'cashBalance'    : cashBalance,
                'bonusBalance'   : bonusBalance
            });

            var cashPercent = '('+view.calculateCashPercentage(cashBalance) + '%)';
            var bonusPercent = '('+view.calculateCashPercentage(bonusBalance) + '%)';

            view.$el.find('#cash-total').html(formattedTotal);
            view.$el.find('#real-money .formatted-cash').html(formattedCash);
            view.$el.find('#bonus-money .formatted-cash').html(formattedBonus);
            view.$el.find('.cashPercent').html(cashPercent);
            view.$el.find('.bonusPercent').html(bonusPercent);
        });
    },
    calculateCashPercentage : function(cash){
        var view = this;
        var totalBalance = parseInt(view.model.get('totalBalance'));
        var bonusBalance = parseInt(cash); //view.model.get('bonusBalance') //view.model.get('cashBalance')
        var percent = (bonusBalance * 100) / totalBalance;
        percent = (isNaN(percent)) ? 0 : percent;

        return percent.toFixed();
    },

    templateHelpers: function() {
        var view = this,
            model = this.model;

        return {
            getAvatars : function(){
                var avatars = [];
                for (i=1; i <= 16; i++){
                    avatars.push('https://static.32red.com/avatars/myAccount_avatar_'+i+'.svg');
                }
                return avatars;
            },
            getBonusPercent : function () {
                return view.calculateCashPercentage(view.model.get('bonusBalance'));
            },
            getCashPercent  : function () {
                return view.calculateCashPercentage(view.model.get('cashBalance'));
            },
            isVerified : function () {
                if(view.model.get('playerRegulations') === false) {
                    return false;
                }
                return true;
            },
            isBingoNicknameSet: function () {
                if(model.get('bingoAlias').length > 1) {
                    return true;
                }
                return false;
            }
        };
    },
    passwordStrength : function(){
        var view = this;

        view.$el.find('input[name="new-password"]').strength({
            showToggle : false,
            toggleMask : false,
            inputTemplate: '{toggle}\n' + '{input}\n',
            mainTemplate : '{input}\n' + '<span class="password-strength hidden"><span class="default-text">Strength: </span> {meter}</span>',
            verdictTitles : {
                0: 'Very Weak',
                1: 'Very Weak',
                2: 'Weak',
                3: 'Good',
                4: 'Good',
                5: 'Strong',
            }
        });
    },
    showPasswordStrength : function(e){
        var view = this;
        if($(e.target).val().length > 3){
            view.$el.find('.password-strength').removeClass('hidden');
        }
        if($(e.target).val().length < 2){
            view.$el.find('.password-strength').addClass('hidden');
        }
    },
    launchAvatarGallery : function(ev) {
        var view = this,
            gallery = view.$el.find('#avatar-gallery');
        if(gallery.hasClass('hidden')){
            gallery.removeClass('hidden');
            return;
        }
        gallery.addClass('hidden');
    },
    selectAvatar : function(ev){
        var view = this,
            gallery = view.$el.find('#avatar-gallery'),
            target = $(ev.target),
            targetImgUrl = target.attr('src'),
            avatarId = target.attr('data-avatarid');

        gallery.addClass('hidden');
        view.$el.find('.avatar-item').removeClass('selected');
        target.parent().addClass('selected');
        view.$el.find('.avatar-image img').attr('src', targetImgUrl);
        view.setAvatar(avatarId);

    },
    setAvatar : function(avatarId){
        $.ajax({
            method: 'post',
            url   : '/account/setProfileAvatar',
            data  : {avatarId: avatarId}
        });
    },    
    showBalanceSection: function(ev) {
        var view = this,
            showBanking = $(ev.target).closest('.balance-button').attr('data-section');

        $(ev.target).closest('.balance-button').find('.material-icons').toggleClass('down');
        $(ev.target).closest('.balance-button').find('.material-icons').toggleClass('up');
        view.$el.find('.'+showBanking).toggleClass('hidden');
    },
    loadAutocomplete : function() {
        var view = this;
        var fields = [
            { element: "acc_addressLine1", field: "Line1", mode: pca.fieldMode.SEARCH | pca.fieldMode.POPULATE  },
            { element: "acc_addressLine2", field: "Line2", mode: pca.fieldMode.POPULATE },
            { element: "acc_city", field: "City", mode: pca.fieldMode.POPULATE },
            { element: "acc_postal_code", field: "PostalCode", mode: pca.fieldMode.SEARCH | pca.fieldMode.POPULATE},
        ];
        var options = { key: "CK27-JD28-NF48-KE96",  search: { countries: "GBR" } };
        view.control = new pca.Address(fields, options);
        view.control.listen("populate", function(data) {
            var address1 = data.FormattedLine1.replace(/\,/g, ''),
                address2 = data.FormattedLine2.replace(/\,/g, '');

            view.$el.find('#acc_addressLine1').val(address1);
            view.$el.find('#acc_addressLine2').val(address2);
        });
        if($('#acc_country').val() !== 'United Kingdom'){
            view.control.destroy();
        }
    },
    loadSection: function(ev) {
        ev.preventDefault();
        var view = this,
            sectionToShow = $(ev.target).closest('.load-section').attr('data-section');
        switch (sectionToShow){
            case 'verification-status':
                if(!view.$el.find('.account-verification-wrapper #container')[0]) {
                    App.vent.trigger('show:appended-preloader', view.$el.find('.account-verification-wrapper'));
                    view.$el.find('.account-verification-wrapper').load('/api/content/account-verification #container' ,function(response,status,xhr){
                        xhr.success(function(){
                            setTimeout(function(){
                                view.$el.find('.preloader-holder').remove();
                            });
                        });
                    });
                }
                break;
            case 'preferences-center':
                //launch subscription
                var options = {
                    directLink    : false,
                    elementHolder : preferencesWrapper
                };
                var preferencesWrapper = $('#preferences-center-wrapper');
                App.vent.trigger('show:subscription-centre', options);
                return;
                break;
            case 'user-tools':
                //launch subscription
                App.vent.trigger('show:user-tools');
                break;
        }
        $('#user-account-dashboard').find('.active-section').removeClass('active-section');
        
        view.$el.find('.'+sectionToShow+'-section').addClass('active-section');
    },
    revealPasswords : function(ev){
        var view = this,
            targetInput = view.$el.find('.password-element');

        if(targetInput.hasClass('visible')) {
            targetInput.removeClass('visible');
            targetInput.attr('type','password');
        } else {
            targetInput.addClass('visible');
            targetInput.attr('type','text');
        }
    },
    showTransactionHistory : function(ev){
        ev.preventDefault();
        launchTransactionHistory();
    },
    showGamingHistory : function(ev){
        ev.preventDefault();
        var view = this;
        view.$el.find('#gaming-history-holder').addClass('visible');
        App.vent.trigger('show:preloader', view.$el.find('#gaming-history-holder .preloader-holder'));
        setTimeout(function(){
            view.$el.find('.preloader-holder').remove();
        }, 3000);
        App.vent.trigger('launch:playcheck', null, null, view.$el.find('#gaming-history-holder'));
    },

    //navigate back to main page in My account
    backToGeneral : function(){
        $('#gaming-history-holder').removeClass('visible');
        $('#user-account-dashboard').find('.active-section').removeClass('active-section');
        $('.account-area-general').addClass('active-section');
    },

    //close My account area
    closeAccountArea : function() {
        var view = this;
        view.hideFormErrors();
        view.resetFields();

        $('#user-account-dashboard').find('.my-account-area').removeClass('active');
        $('html').removeClass('popup-active');
        $('html').removeClass('no-scroll');

    },

    //when user closes the account we want the values in the fields to be set to the values from the model.
    resetFields : function() {
        var view = this,
            fieldsToReplace = ['addressLine1','addressLine2', 'city', 'postalCode', 'email', 'homePhoneNumber', 'bingoNickname'],
            passwordFields = ['oldPassword', 'newPassword', 'repeatNewPassword'];

        _.each(passwordFields, function (field) {
            view.$el.find('input[name="'+field+'"]').val('');
        });

        _.each(fieldsToReplace, function (field) {
            view.$el.find('input[name="'+field+'"]').val(view.model.get(field));
        });
    },

    applyIntlInput : function(){
        var view = this,
            selector = $('input[name="homePhoneNumber"]');
        setTimeout(function(){
            selector.intlTelInput({
                utilsScript: "../js/utils.js",
            });
            setTimeout(function(){
                $('.country-list').find('country[data-country-code="nl"] .country-name').text('Netherlands');
                $('.iti-flag.nl').removeClass('nl').addClass('eu');
                $('li.country[data-country-code="nl"] .country-name').text('Netherlands');

                setTimeout(function(){
                    $('.iti-mobile-select option[data-dial-code="31"]').html('Netherlands +31');
                },500);
            },100);
            selector.intlTelInput("setNumber", '+'+view.model.get('homePhoneNumber').replace(/[^0-9]/g, ''));
        },100);
    },
    saveForm : function (ev) {
        var view = this,
            target = $(ev.target),
            form   = target.parents('form');

        if(view.formSubmitting){
            return;
        }
        view.formSubmitting = true;

        if(form.length < 1){
            form = view.$el.find('form[data-name="'+target.attr('data-form')+'"]');
        }

        var data = $(form).serializeArray().reduce(function(obj, item) {
            if(item.name === 'homePhoneNumber'){
                item.value = view.$el.find('input[name="homePhoneNumber"]').intlTelInput("getNumber");
            }
            obj[item.name] = item.value;
            return obj;
        }, {});

        view.hideFormErrors();
        var validationMsg = view.processValidation(data);

        if(!validationMsg){
            //Check if any updates where made in the form
            var checkUpdates = _.find(data, function (a, b) {
                return view.model.get(b) !== a;
            });
            if(checkUpdates === undefined){ return; } //No value changed

            App.vent.trigger('show:appended-preloader', $(form).parent());
            view.sendForm(data, form);
            view.hideFormErrors();
        } else {
            view.displayValidationMsg(validationMsg);
            view.formSubmitting = false;
        }
        ev.stopPropagation();
    },

    sendForm: function(data, form){
        var view = this;
        data.oldEmail = view.model.get('email');
        view.hideFormErrors();
        $.ajax({
            method: 'post',
            url   : '/account/updatePlayerAccount',
            data  : data
        }).done(function(response){
            $('.preloader-wrapper').remove();
            view.formSubmitting = false;
            if(response.ok === false){
                view.displayGeneralErrorMsg(form, response.response);
                return;
            }
            //values are set, update the model with the new values
            view.model.set(data);

            //Reset all fields to data in model to reset password fields
            view.resetFields();

            //show success message
            view.showSuccessSaveMsg(form, response.response);

            //Remove error messages
            form.find('.error').removeClass('error').find('.error-msg').remove();

        }).fail(function(){
            $('.preloader-wrapper').remove();
            view.resetFields();
        });
    },

    showSuccessSaveMsg: function(form, msg){
        var view = this,
            formBtn = form.attr('data-name'),
            targetBtn = view.$el.find('a[data-form="'+formBtn+'"]');

        var html = '<p class="success-save"><i class="icon-my-account-tick"></i><span>'+msg+'</span></p>';

        targetBtn.before(html);

        setTimeout(function(){
            view.$el.find('.success-save').remove();
        }, 3000);
    },

    hideFormErrors: function(){
        var view = this,
            errorWrappers = view.$el.find('.input-wrapper.error'),
            errorMsg = errorWrappers.find('.error-msg');
        _.each(errorMsg, function (error) {
            error.remove();
        });
        errorWrappers.removeClass('error');
        view.$el.find('.form-error-block').remove();
    },

    displayValidationMsg : function(errors){
        var view = this;

        _.each(errors, function (msg, name) {
            var element = view.$el.find('input[name="'+name+'"]'),
                form = element.parents('form');
            element.parent().addClass('error');
            if(element.parent().find('.error-msg')[0]) {
                element.parent().find('.error-msg').text(msg);
            } else {
                element.after('<p class="error-msg">'+msg+'</p>');
            }
        });
    },

    displayGeneralErrorMsg: function(form, msg) {
        var view = this,
            formBtn = form.attr('data-name'),
            targetBtn = view.$el.find('a[data-form="'+formBtn+'"]');

        targetBtn.before('<p class="form-error-block"><i class="icon-error"></i><span>'+msg+'</span></p>');

        setTimeout(function(){
            form.find('.form-error-block').remove();
        }, 15000);
    },

    processValidation : function(fields){
        var view = this,
            validators = view.model.schema,
            errors = {};

        //check all the fields that are passed
        _.each(fields, function(fieldData, fieldName) {
            //if we have any validation in place for current field
            if (fieldName in validators) {

                //check all the rules for current field
                _.each(validators[fieldName]['validators'], function (rule) {
                    //check general regex
                    if(rule['type'] === 'regexp' && !errors[fieldName]) {
                        if(rule.required === false && fieldData === ''){

                        } else if(!rule['regexp'].test(fieldData.trim())) {
                            errors[fieldName] = rule['message'];
                        }
                    }

                    //check password match
                    if(rule['type'] === 'match' && !errors[fieldName]) {
                        var fieldToMatch =  rule['field'];
                        if(fieldData.trim() !== view.$el.find('input[name='+fieldToMatch+']').val().trim()) {
                            errors[fieldName] = rule['message'];
                        }
                    }

                    //Check empty fields
                    if(rule['required'] === true && !errors[fieldName]) {
                        if(view.$el.find('input[name='+fieldName+']').val() === '') {
                            errors[fieldName] = rule['message'];
                        }
                    }
                });
            }
        });

        return _.size(errors) > 0 ? errors : false;
    },
    checkPhoneNumber : function(){
        var number = view.$el.find('input[name="homePhoneNumber"]').intlTelInput("getNumber");

        if(number.length < 5) {
            return false;
        }
        return number;
    }

});

var UserWidthdrawalsModel = Backbone.Model.extend({
    defaults: {
        'amount' : 0
    },

    initialize: function() {
        var model = this;
        model.setText();
        model.setShowReversible();
    },

    setText : function () {
        var model = this;
        if(App.Translations && App.Translations.loadTranslation) {
            App.Translations.loadTranslation('my-account', function(translations) {
                var withdrawalText = translations['pending-withdrawal-text'];
                model.set('withdrawalText',withdrawalText);
            });
        }
    },

    setShowReversible  :function () {
        var model = this;
        model.set('showReversible',model.get('status') === 'Pending Processing' && model.get('nonuk'));
    }
});

var UserWidthdrawalCollection = Backbone.Collection.extend({
    model: UserWidthdrawalsModel,
});
App.module("UserWithdrawals", function(UserWithdrawals, App, Backbone, Marionette, $) {

    App.vent.on('show:user-withdrawals',function (withdrawals, element) {
        UserWithdrawals.WithdrawalsCollection = new UserWidthdrawalCollection(withdrawals);
        UserWithdrawals.WithdrawalsView = new UserWithdrawalsCollection({
            el: element,
            collection: UserWithdrawals.WithdrawalsCollection,
        }).render();
    });

});
var UserWithdrawal = Backbone.Marionette.ItemView.extend({
    template: '#user-withdrawal',
    tagName: 'li',

    events: {
        'click .toggle' : 'toggleWithdrawalInfo'
    },

    initialize : function(options) {
    },

    onRender: function() {
        var view = this;
        view.$el.find('.amount').html(view.model.get('displayAmount'));
        view.$el.find('.status').html(view.model.get('status'));
        if(!view.model.get('showReversible')) {
            view.$el.find('.revert-withdrawal').remove();
        }
    },

    toggleWithdrawalInfo : function () {
        var view = this;
        view.$el.find('.request-content').toggle();
        view.$el.find('.toggle').toggleClass('opened');
    }
});

var UserWithdrawalsCollection = Backbone.Marionette.CompositeView.extend({
    childView : UserWithdrawal,
    template : "#user-withdrawals-wrapper",
    childViewContainer: ".carousel",

    events: {
        'click .next' : 'navigate',
        'click .previous' : 'navigate',
        'click .carousel-indicator' : 'navigateUsingDots'
    },

    onRender: function() {
        var view = this,
            collection = view.collection;

        if(collection.length <= 1 ) {
            view.hideNavigation();
        } else {
            view.addNavigationDots(collection.length);
        }        
        this.setCurrentItems(0);
    },

    addNavigationDots : function(dotsNo) {
        var view = this;
        for(var i = 0; i < dotsNo; i++) {
            view.$el.find('.navigation-dots').append('<li index="' + i + '" class="carousel-indicator"></li>');
        }
    },

    navigate : function (ev) {
        var view = this,
            target = $(ev.target).closest('span'),
            slideItems = view.$el.find('ul.carousel > li'),
            currentSlide =  view.$el.find('ul.carousel  li.current').index(),
            gotoSlide = 0,
            slideCount = slideItems.length - 1; 

        if(target.hasClass('next')) {
            currentSlide >= slideCount ? gotoSlide = 0 : gotoSlide = currentSlide + 1;
        } else if(target.hasClass('previous')){
            currentSlide <= 0 ?  gotoSlide = slideCount : gotoSlide = currentSlide - 1; 
        }

        this.setCurrentItems(gotoSlide);        
    },

    navigateUsingDots: function(ev) {  
        var target = $(ev.target);
        this.setCurrentItems(target.index());     
    },

    hideNavigation: function() {
        var view = this; 
        view.$el.find('.previous').hide();
        view.$el.find('.next').hide();        
    },

    setCurrentItems:  function(slide) {
        var view = this,           
            slideItems = view.$el.find('ul.carousel > li'),
            navDots = view.$el.find('ul.navigation-dots li');

        slideItems.hide();         
        view.$el.find('.current').removeClass('current');
        slideItems.eq(slide).addClass('current').show();
        navDots.removeClass('active');
        navDots.eq(slide).addClass('active');
    },
});
var CreateYearlyVerificationModel = function(translations) {
    return Backbone.DeepModel.extend({
        defaults: {
            'formIsEditable'      : false,
            'headicon'            : '',
            'headline'            : '',
            'subheadline'         : '',
            'email'               : '',
            'homePhoneNumber'     : '',
            'addressLine1'        : '',
            'addressLine2'        : '',
            'city'                : '',
            'state'               : '',
            'postalCode'          : '',
            'country'             : ''
        },
        initialize: function (userData) {
            var model = this;

            if(userData.ok){
                var personalDetails = userData.playerInfo.personal.personal2;

                var email = (personalDetails.contact.email) ? personalDetails.contact.email : '';
                var homePhoneNumber = (personalDetails.contact.homePhoneNumber) ? personalDetails.contact.homePhoneNumber : '';
                var address_1 = (personalDetails.address.addressLine1) ? personalDetails.address.addressLine1 : '';
                var address_2 = (personalDetails.address.addressLine2) ? personalDetails.address.addressLine2 : '';
                var city = (personalDetails.address.city) ? personalDetails.address.city : '';
                var state = (personalDetails.Province) ? personalDetails.Province : '';
                var postalCode = (personalDetails.address.postalCode) ? personalDetails.address.postalCode : '';
                var country = (personalDetails.address.countryName) ? personalDetails.address.countryName : '';

                model.set({
                    'email': email,
                    'homePhoneNumber': homePhoneNumber,
                    'addressLine1': address_1,
                    'addressLine2': address_2,
                    'city': city,
                    'state': state,
                    'postalCode': postalCode,
                    'country': country
                });
            }
        },

        schema: {
            addressLine1: {
                validators: [
                    {type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    {
                        type: 'regexp',
                        regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i,
                        message: translations['digit-letter-possible']
                    },
                    {type: 'regexp', regexp: /.{2,}/, message: translations['correct-address']},
                    {type: 'regexp', regexp: /^.{1,40}$/, message: translations['max-40']}
                ]
            },

            addressLine2: {
                validators: [
                    {
                        type: 'regexp',
                        regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i,
                        message: translations['digit-letter-possible'],
                        required: false
                    },
                ]
            },

            city: {
                validators: [
                    {type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    {type: 'regexp', regexp: /.{2,}/, message: translations['correct-city']},
                    {
                        type: 'regexp',
                        regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i,
                        message: translations['digit-letter-possible']
                    },
                    {type: 'regexp', regexp: /^.{1,40}$/, message: translations['max-40']}
                ]
            },

            postalCode: {
                validators: [
                    {type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    {type: 'regexp', regexp: /.{2,}/, message: translations['correct-zip']},
                    {
                        type: 'regexp',
                        regexp: /^[ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŒœŠŽšžŸµƒªº¡¿A-Za-z0-9\s''\-]+$/i,
                        message: translations['digit-letter-possible']
                    },
                    {type: 'regexp', regexp: /^.{1,15}$/, message: translations['max-15']}
                ]
            },

            homePhoneNumber: {
                validators: [
                    {type: 'string', message: translations['required'], required: true},
                    {type: 'regexp', regexp: /^.{8,}$/, message: translations['correct-phone']},
                    {type: 'regexp', regexp: /^.{1,15}$/, message: translations['max-15']}
                ]
            },

            email: {
                validators: [
                    {type: 'regexp', regexp: /^(?!\s*$).+/, message: translations['required']},
                    {
                        type: 'regexp',
                        regexp: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                        message: translations['valid-email']
                    },
                    {type: 'regexp', regexp: /^.{1,40}$/, message: translations['max-40']},
                    {type: 'regexp', regexp: /^.{6,}$/, message: translations['min-6']}
                ]
            }
        }
    });
};
App.module("YearlyVerificationModule", function(YearlyVerificationModule, App, Backbone, Marionette, $){
    App.vent.on('rendered:InterruptivePopup', function (model) {
        if(model.get('key') === 'kyc-yearly-check'){
            YearlyVerificationModule.getPlayerDetails();
        }
    });

    YearlyVerificationModule.addInitializer(function(options) {
        if(App.Translations && App.Translations.loadTranslation) {
            App.Translations.loadTranslation('registration', function(translations) {
                window.YearlyVerificationModel = CreateYearlyVerificationModel(translations);
            });
        }
    });

    YearlyVerificationModule.createWrapper = function(){
        $('#yearly-verification-template-wrapper').html('<div id="yearly-verification-template" class="verification-template"></div>');
    };

    YearlyVerificationModule.applyIntlInput = function(view){
        var selector = view.$el.find('input[name="homePhoneNumber"]');
        setTimeout(function(){
            selector.intlTelInput({
                utilsScript: "../js/utils.js",
            });
            setTimeout(function(){
                $('.country-list').find('country[data-country-code="nl"] .country-name').text('Netherlands');
                $('.iti-flag.nl').removeClass('nl').addClass('eu');
                $('li.country[data-country-code="nl"] .country-name').text('Netherlands');

                setTimeout(function(){
                    $('.iti-mobile-select option[data-dial-code="31"]').html('Netherlands +31');
                },500);
            },100);
            selector.intlTelInput("setNumber", '+'+view.model.get('homePhoneNumber').replace(/[^0-9]/g, ''));
        },100);

        return selector;
    };

    YearlyVerificationModule.getPlayerDetails = function(){
        YearlyVerificationModule.createWrapper();

        var container = $('#yearly-verification-template');
        App.vent.trigger('show:preloader', container);
        App.Translations.loadTranslation('common', function(translations) {
            $.ajax({
                type    : "POST",
                url     : "/account/getPlayerAccountDetails",
                dataType: "json"
            }).done(function (userData) {
                YearlyVerificationModule.model = new YearlyVerificationModel(userData);
                YearlyVerificationModule.originalModel = YearlyVerificationModule.model.clone();
                YearlyVerificationModule.view = new YearlyVerificationView({
                    model: YearlyVerificationModule.model,
                    el: container
                }).render();
            });
        });
    };

    YearlyVerificationModule.getFormFields = function(form, view){
        var obj   = {},
            sendAllData = false,
            tmpObj = {};

        var formFields = form.serializeArray();
        var kycFields = ['city', 'state', 'addressLine1', 'addressLine2', 'postalCode', 'country'];

        for(var i = 0; i< formFields.length; i++){
            if(formFields[i].name === 'homePhoneNumber'){
                formFields[i].value = view.intlInputSelector.intlTelInput("getNumber").replace(/[^0-9]+/g, '');
            }
            if(YearlyVerificationModule.originalModel.get(formFields[i].name) !== formFields[i].value){
                //If any of the fields updated is kyc related
                if($.inArray(formFields[i].name, kycFields) !== -1){
                    sendAllData = true;
                }
                obj[formFields[i].name] = formFields[i].value;
            } else {
                tmpObj[formFields[i].name] = formFields[i].value;
            }
        }
        if(sendAllData) {
            obj = $.extend({}, obj, tmpObj);
        }

        return obj;
    };

    App.YearlyVerificationModule.removeErrorMsgs = function(form){
        var errorWrappers = form.find('.error'),
            errorMsg = errorWrappers.find('.error-msg');

        _.each(errorMsg, function (error) {
            error.remove();
        });
        errorWrappers.removeClass('error');
    };

    App.YearlyVerificationModule.processValidation = function(fields, view){
        var validators = view.model.schema,
            errors = {};

        //check all the fields that are passed
        _.each(fields, function(fieldData, fieldName) {
            //if we have any validation in place for current field
            if (fieldName in validators) {

                //check all the rules for current field
                _.each(validators[fieldName]['validators'], function (rule) {
                    //check general regex
                    if(rule['type'] === 'regexp' && !errors[fieldName]) {
                        if(!rule.required && fieldData !== '' && !rule['regexp'].test(fieldData.trim())) {
                            errors[fieldName] = rule['message'];
                        }
                    }

                    //check password match
                    if(rule['type'] === 'match' && !errors[fieldName]) {
                        var fieldToMatch =  rule['field'];
                        if(fieldData.trim() !== view.$el.find('input[name='+fieldToMatch+']').val().trim()) {
                            errors[fieldName] = rule['message'];
                        }
                    }

                    //Check empty fields
                    if(rule['required'] === true && !errors[fieldName]) {
                        if(view.$el.find('input[name='+fieldName+']').val() === '') {
                            errors[fieldName] = rule['message'];
                        }
                    }
                });
            }
        });

        return _.size(errors) > 0 ? errors : false;
    };

    App.YearlyVerificationModule.displayValidationMsg = function(errors, view){

        _.each(errors, function (msg, name) {
            var element = view.$el.find('input[name="'+name+'"]'),
                form = element.parents('form');
            element.parent().addClass('error');
            if(element.parent().find('.error-msg')[0]) {
                element.parent().find('.error-msg').text(msg);
            } else {
                element.after('<p class="error-msg">'+msg+'</p>');
            }
        });
    };
});
var YearlyVerificationView = Backbone.Marionette.ItemView.extend({
    template: '#yearly-verification-form-template',
    events: {
        'click #detailsCorrect'       : 'detailsMarkCorrect',
        'click #editDetails'          : 'editDetails',
        'click #validateFields'       : 'validateFields',
        'mouseenter #countryEditInfo' : 'countryTooltip',
        'click #countryEditInfo'      : 'countryTooltip'
    },
    initialize: function(){
         var view = this,
             model = this.model;

         view.formSubmitting = false;

         model.set({
             'headicon'    : 'icon-warning',
             'headline'    : 'Important Reminder',
             'subheadline' : 'To ensure the details we have for you are correct, please review the details below and update if necessary',
         });
    },
    onRender: function(){
        var view = this;

        view.intlInputSelector = App.YearlyVerificationModule.applyIntlInput(view);
    },
    templateHelpers: function() {
        var view = this,
            model = view.model;

        return {
            isEditable: function () {
                if(model.get('formIsEditable')){
                    return 'required="required"';
                }
                return 'disabled="disabled"';
            },
            inputIsLocked: function () {
                if(model.get('formIsEditable')){
                    return '';
                }
                return 'input-locked';
            }
        };
    },
    countryTooltip: function(ev){
        $(ev.target).parent().append('<span class="tooltip">You\'re not able to change country. please contact us to update it</span>');
        $(ev.target).on('mouseleave', function(){
            $(ev.target).parent().find('.tooltip').remove();
        });
    },
    editDetails: function () {
        var view = this;

        App.YearlyVerificationModule.createWrapper();
        var yearlyVerificationEditView = new YearlyVerificationEdit({
            el: $('#yearly-verification-template'),
            model: view.model
        }).render();

        view.destroy();

    },
    detailsMarkCorrect: function(){
        var view = this;
        if(view.formSubmitting) { return; }
        App.vent.trigger('show:appended-preloader', view.$el.find('.verification-form-wrapper'), false);
        view.formSubmitting = true;
        $.post('/account/playerRemoveYearlyCheck', function(response){
            view.formSubmitting = false;
            if(response.ok){
                return view.loadSuccessView();
            }
            return view.loadFailView();
        });
    },
    loadSuccessView: function () {
        var view = this;

        App.YearlyVerificationModule.createWrapper();
        var successView = new YearlyVerificationSuccessView({
            el   : $('#yearly-verification-template'),
            model: view.model
        }).render();

        view.destroy();
    },
    loadFailView: function(){
        var view = this;

        App.YearlyVerificationModule.createWrapper();
        var failView = new YearlyVerificationFail({
             el   : $('#yearly-verification-template'),
             model: view.model
        }).render();

        view.destroy();
    },
    validateFields: function(){
        var view = this,
            form = view.$el.find('form.verification-form-wrapper.step1');

        if(view.formSubmitting){
            return;
        }

        var fields = App.YearlyVerificationModule.getFormFields(form, view);
        var errors = App.YearlyVerificationModule.processValidation(fields,view);

        if(Object.keys(fields).length === 0) {
            return view.detailsMarkCorrect();
        }
        if(!errors){
            App.YearlyVerificationModule.removeErrorMsgs(form);
            view.sendForm(fields);
        } else {
            view.formSubmitting = false;
            App.YearlyVerificationModule.displayValidationMsg(errors, view);
        }
    },
    sendForm : function(data){
        var view = this;
        App.vent.trigger('show:appended-preloader', view.$el.find('.verification-form-wrapper'), false);

        $.ajax({
            url : '/account/playerYearlyCheck',
            type: 'POST',
            data: data
        }).done(function(response) {
            view.formSubmitting = false;

            if(response.ok === true){
                view.model.set(data);
                view.loadSuccessView();
                return;
            }
            view.loadFailView();
        });
    }
});

var YearlyVerificationSuccessView = Backbone.Marionette.ItemView.extend({
    template: '#yearly-verification-form-success',
    events: {
        'click #goToLobby' : 'goToLobby'
    },
    initialize: function(){
        var model = this.model;

        model.set({
            'headicon'    : 'icon-tick',
            'headline'    : 'Your details have been successfully verified',
            'subheadline' : 'Thank you for confirming / validating your details',
        });
    },
    goToLobby: function () {
        App.vent.trigger('close-modal');
    }
});

var YearlyVerificationFail = Backbone.Marionette.ItemView.extend({
    template: '#yearly-verification-form-fail',
    events: {
        'click #closePopover' : 'closePopover'
    },
    initialize: function(){
        var model = this.model;

        model.set({
            'headicon'    : 'icon-close',
            'headline'    : 'Something went wrong and we can\'t validate your details.',
            'subheadline' : 'Click the Help button below to see what could have gone wrong.',
        });
    },
    closePopover: function () {
        App.vent.trigger('close-modal');
    }
});

var YearlyVerificationEdit = Backbone.Marionette.ItemView.extend({
    template: '#yearly-verification-form-edit',
    events: {
        'click #enterAddressManually' : 'goToEditFormView',
        'mouseenter #countryEditInfo' : 'countryTooltip',
        'click #countryEditInfo'      : 'countryTooltip',
        'click #goToReview'           : 'goToEditFormView'
    },
    onRender: function(){
        var view = this,
            model = view.model;

        model.set({
            'headicon'    : 'icon-warning',
            'headline'    : 'Important Reminder',
            'subheadline' : 'Start by filling in the details below.'
        });
        view.intlInputSelector = App.YearlyVerificationModule.applyIntlInput(view);
        view.loadAutocomplete();
    },
    loadAutocomplete : function() {
        var view = this,
            model = view.model;
        var fields = [
            { element: "postalCodeZip", field: "PostalCode", mode: pca.fieldMode.SEARCH | pca.fieldMode.POPULATE},
        ];
        var options = { key: "CK27-JD28-NF48-KE96",  search: { countries: "GBR" } };
        var control = new pca.Address(fields, options);

        control.listen("populate", function(data) {
            var address1   = (data.FormattedLine1.length > 0) ? data.FormattedLine1.replace(/\,/g, '') : data.Line1.replace(/\,/g, ''),
                address2   = (data.FormattedLine2.length > 0) ? data.FormattedLine2.replace(/\,/g, '') : data.Line2.replace(/\,/g, ''),
                postalCode = data.PostalCode,
                city       = data.City,
                state      = data.Province;

            model.set({
               'addressLine1' : address1,
               'addressLine2' : address2,
               'postalCode'   : postalCode,
               'city'         : city,
               'state'        : state
            });

            view.goToEditFormView();
        });

        if(view.$el.find('input[name="country"]').val() !== 'United Kingdom'){
            control.destroy();
        }
    },
    countryTooltip: function(ev){
        $(ev.target).parent().append('<span class="tooltip">You\'re not able to change country. please contact us to update it</span>');
        $(ev.target).on('mouseleave', function(){
            $(ev.target).parent().find('.tooltip').remove();
        });
    },
    goToEditFormView: function () {
        var view  = this,
            model = view.model,
            form  = view.$el.find('form.verification-form-wrapper.step2');

        var fields = App.YearlyVerificationModule.getFormFields(form, view);
        var errors = App.YearlyVerificationModule.processValidation(fields,view);

        if(errors){
            App.YearlyVerificationModule.displayValidationMsg(errors, view);
            return;
        }

        App.YearlyVerificationModule.removeErrorMsgs(form);
        fields.formIsEditable = true;

        model.set(fields);

        App.YearlyVerificationModule.createWrapper();
        var YearlyVerificationModule = new YearlyVerificationView({
            model: model,
            el: $('#yearly-verification-template')
        }).render();

        view.destroy();
    }
});
App.module("CheckGameLaunchedModule", function(CheckGameLaunchedModule, App, Backbone, Marionette, $) {

    var timerId = null;

    var stopTimer = function() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
            //whe user closed the games, we update the local session storage
            $.cookie('gameOn',0);
        }
    };

    var startTimer = function() {
        CheckGameLaunchedModule.updateTimer;
        timerId = setInterval(CheckGameLaunchedModule.updateTimer, 1000);
    };

    CheckGameLaunchedModule.updateTimer = function() {
        var thisTime = 0 + Math.floor(Date.now() / 1000);
        $.cookie('gameOn',thisTime);
    };

    CheckGameLaunchedModule.numberOfGamesPlaying = function(){
        var gamesOn = 0;
        if($.cookie('gso') !== undefined){
            gamesOn = parseInt($.cookie('gso'));
        }

        return gamesOn;
    };

    CheckGameLaunchedModule.addInitializer(function() {
        App.vent.on('games:start_playing', function() {
            var numberOfGamesPlaying = CheckGameLaunchedModule.numberOfGamesPlaying() + 1;
            $.cookie('gso', numberOfGamesPlaying);
            startTimer();
        });
        App.vent.on('games:stop_playing', function() {
            var numberOfGamesPlaying = CheckGameLaunchedModule.numberOfGamesPlaying();
            if(numberOfGamesPlaying !== 0){
                $.cookie('gso', (numberOfGamesPlaying - 1));
            }
            stopTimer();
        });
        App.vent.on('logout:success', function() {
            stopTimer();
            $.cookie('gso', 0);
        });
        App.vent.on('login:success', function () {
            stopTimer();
            $.cookie('gso', 0);
        });

        App.vent.on('game:launch-from-recommended', function () {
            stopTimer();
            $.cookie('gso', 0);
        });
    });
});
App.module("SearchOverlayModule", function(SearchOverlayModule, App, Backbone, Marionette, $){

    App.vent.on('show:search',function () {
        SearchOverlayModule.SearchOverlayView = new SearchOverlayView({
            el : $('#search-overlay-container')
        }).render();

    });
    SearchOverlayModule.gamesRendered = false;
    //if SearchOverlayModule.SearchOverlayGames is undefined or doesnt contain games get all the games with ajax
    App.vent.on('get:allGames', function() {

        if(!SearchOverlayModule.allGames || SearchOverlayModule.allGames.length < 1) {
            var url =  '/gamesApi/allGames/'   + (Red.DeviceType === 'desktop' ? 'desktop' : 'mobile') + '/' + (Red.showRestrictedGames ? '0' : '1') + '/false';

            var getAllGames = $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                data: {}
            });

            getAllGames.done(function(data){
                //setting all the initial games in a collection so we have them to do the search
                //the search will be done on the first item from collection
                SearchOverlayModule.gameSearchResultsCollection = new GameCategoryCollection(data['games']);
                SearchOverlayModule.allGames = SearchOverlayModule.gameSearchResultsCollection.at(0).get('category_games');
                App.vent.trigger('display:searchWrapper');
            });
        } else  {
            App.vent.trigger('display:searchWrapper');
        }
    });


    // filter results of search filter
    App.vent.on('display:filteredGames', function(searchTerm){
        $.get('/api/searchGames', {query: searchTerm, device: (Red.DeviceType === 'desktop' ? 'desktop' : 'mobile'), srg: (Red.showRestrictedGames ? '0' : '1')}).done(function(gameResults){
            var filteredGames = {};
            filteredGames.name = 'Your search for "' + _.escape(searchTerm) + '" has returned';
            filteredGames.renderedFrom = "search";
            filteredGames.category_games = gameResults;
            SearchOverlayModule.gameSearchResultsCollection.at(0).set(filteredGames);
            App.vent.trigger('set:filteredResults');
        });
    });
    App.vent.on('set:filteredResults', function() {

            //rendering the games using the games collection
            SearchOverlayModule.FilteredGamesView = new GamesCategoryCollection({
                collection:  SearchOverlayModule.gameSearchResultsCollection,
            }).render().el;
            $('.game-search-results').html(SearchOverlayModule.FilteredGamesView);

    });

});
var SearchOverlayModel = Backbone.Model.extend({
    initialize: function() {
        var model = this;
    },

});

var SearchOverlayCollection = Backbone.Collection.extend({
    model: SearchOverlayModel,
});
var SearchOverlayView = Backbone.Marionette.ItemView.extend({
    template: '#search-overlay',
    tagName: 'div',
    events: {
        'keyup .game-search-box' : 'searchProcess',
        'click .icon.close-btn'  : 'closeSearchOverlay'
    },


    initialize : function() {
        this.searchTimeout = null;
    },

    onRender: function() {

        var view = this;
        var searchOverlay = view.$el.find('.search-overlay');
        var searchWrapper = view.$el.find('.search-overlay-wrapper');
        var loading = view.$el.find('.loading');
        var htmlElement = $('html');
        htmlElement.addClass('no-scroll');
        searchOverlay.addClass('active');
        searchWrapper.removeClass('active');
        loading.addClass('active');

        App.vent.on('display:searchWrapper', function() {
            var loading = view.$el.find('.loading');
            var searchWrapper = view.$el.find('.search-overlay-wrapper');
            loading.removeClass('active');
            searchWrapper.addClass('active');
            view.$el.find('.game-search-box').focus();

        });

        App.vent.on('games:start_playing', function() {
            view.closeSearchOverlay();
        });
        App.vent.trigger('get:allGames');
    },

    closeSearchOverlay: function () {
        var view = this;
        var element = view.$el.find('.search-overlay');
        var htmlElement = $('html');
        element.removeClass('active');
        htmlElement.removeClass('no-scroll');
        App.SearchOverlayModule.gamesRendered = false;
    },

    getSearchresults: function() {
        var view = this;
        var searchBox = view.$el.find('.game-search-box');
        var gameSearchResults = view.$el.find('.game-search-results');
        var gameCategoryResults = view.$el.find('.other-categories');
        if(searchBox.val().length < 1) {
            gameSearchResults.removeClass('active');
            gameCategoryResults.removeClass('active');
        } else  {
            var searchTerms = this.getSearchTerms();
            App.vent.trigger('display:filteredGames',searchTerms);
            gameSearchResults.addClass('active');
            gameCategoryResults.addClass('active');
        }
    },
    searchProcess: function(){
        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(function() {
            this.getSearchresults();
        }.bind(this), 200);
    },
    getSearchTerms: function () {
        var view = this;
        var searchBox = view.$el.find('.game-search-box');
        return searchBox.val();
    }
});
App.addInitializer(function(options) {
    App.addRegions({ gameCategoryRegion: '.games-category-wrapper' });
    App.addRegions({ gameBrowserRegion: '#games-browser' });
    App.addRegions({ sportsMobileRegion: '#casino-tab .games-section' });

});

App.module("GamesModule", function(GamesModule, App, Backbone, Marionette, $) {

    //get the desktop games with ajax
    /**
     * categoryId - id of the category we want to display
     * useOldCategoryId - use old category id to fetch the games.
     */
    App.vent.on('get:games', function(categoryId, useOldCategoryId){
        var searchType = useOldCategoryId ? 'oid':'newid';
        var url = '/gamesApi/games/' + encodeURIComponent(categoryId)+'/'+searchType;

        var callGames = $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            data: {}
        });

        callGames.done(function(games){
            App.vent.trigger('games:received',games);
        });
    });

    //use the games for what we need
    App.vent.on('games:received', function(data){

        //set up the collection for latest played games in game player area
        var renderedCollection = 1;
        data['games'][0]['category_games'] = _.filter(data['games'][0]['category_games'], function(element){ return element.provider_id !== undefined; });
        GamesModule.gameCategoriesCollection = new GameCategoryCollection(data['games'][0]);
        GamesModule.gameCategoriesCollection.add(data['games'][renderedCollection]);
        GamesModule.SportbookMobileGames.set(GamesModule.gameCategoriesCollection.get('games'));

        // GamesModule.warnRace(data['games']);

        //display games on homepage
        App.vent.on('display:games', function(){ 
            var categoryId = data.categoryId,
                gamesHolder = $('.games-category-wrapper'),
                buffer = 800;
            gamesHolder.removeClass('before-load');

            //lazy loading for vertical scroll
            $(window).on('scroll', function () {
                if($(window).scrollTop() >= gamesHolder.offset().top + gamesHolder.outerHeight() - buffer) {
                    renderedCollection++;
                    if(data['games'][renderedCollection]) {
                        GamesModule.gameCategoriesCollection.add(data['games'][renderedCollection]);
                    }
                }
            });

            //render the games categories
            App.gameCategoryRegion.show( new GamesCategoryCollection({
                collection : GamesModule.gameCategoriesCollection,
                categoryId : categoryId
            }));
        });

        // display latest games in game player
        App.vent.on('display:latest-games', function(data){
            GamesModule.latestSelectedGames = new GamesCategoryModel({
                'games' : GamesModule.gameCategoriesCollection.at(0).get('games').slice(1,7),
                'grid_layout' : 'AllSmall',
                'gameplayAreaGames'  : true
            });

            GamesModule.latestGamesView = new GamesCategoryView({
                model:  GamesModule.latestSelectedGames
            });

            $('.otherGames .more-games').html(GamesModule.latestGamesView.render().el);
        });

    });

    //display free games
    App.vent.on('display:free-games', function(data, holder){
        GamesModule.freeGames = new GameModelCollection(data);
        GamesModule.freeGamesView = new FreeGamesView({
            collection:  GamesModule.freeGames
        });
        holder.append(GamesModule.freeGamesView.render().el);
    });

    //if we don't get the games
    App.vent.on('games:failed', function(){
        $('.games-category-wrapper').addClass('has-error');
    });
});
/*
* This module handles all the bits related to latest played games for a user
 */
App.module("LatestGamesModule", function(LatestGamesModule, App, Backbone, Marionette, $) {
    //update latest played games category
    App.vent.on('game:update-latest', function(game){
        //check if we have recommended games on the page
        if(App.GamesModule.gameCategoriesCollection && App.GamesModule.gameCategoriesCollection.at(0).get('type') && App.GamesModule.gameCategoriesCollection.at(0).get('type') === "recommended") {
            var latestPlayed = game,
                navigatorProviders = [3,4,5,6,7];
            //if the games is non MG and we are on an MG tab, don't add the game to latest
            if($.inArray(latestPlayed['provider_id'], navigatorProviders) > 0 && !App.GamesModule.gameCategoriesCollection.at(0).get('navigatorTab')) {
                return;
            }

            //set latest played flag to true
            latestPlayed['latest_played'] = true;

            //remove the game from recommended if already exist
            var newRecommended = _.filter(App.GamesModule.gameCategoriesCollection.at(0).get('category_games'),function (game) {
                return game['id'] !== latestPlayed['id'];
            });
            //add the new games in the first posistion
            newRecommended.unshift(game);

            //if we are on navigator tabs, split the games
            if (App.GamesModule.gameCategoriesCollection.at(0).get('navigatorTab')) {
                var splitGames = _.partition(newRecommended, function (game) {
                    return ($.inArray(game['provider_id'], navigatorProviders) >= 0);
                });
                var len = splitGames[0].length >= splitGames[1].length ?  splitGames[1].length : splitGames[0].length,
                    merged = [];

                for (i=0; i< len; i++) {
                    merged.push(splitGames[1][i]);
                    merged.push(splitGames[0][i]);
                }
                newRecommended = merged;
            }
            //update the games in the model
            App.GamesModule.gameCategoriesCollection.at(0).set('category_games', newRecommended);
            App.GamesModule.gameCategoriesCollection.at(0).set('latestPlayed',latestPlayed['id']);
        } else {
            var isSlotsOrHomePage = (window.location.pathname === '/' || window.location.pathname === '/casino/slots');
            App.vent.on('game:end_tracking', function(){
                if($.cookie('loadedCategory') !== undefined && isSlotsOrHomePage){
                    App.vent.trigger('get:games', $.cookie('loadedCategory'), false);
                }
            });
        }
    });
});

var GameModel = Backbone.Model.extend({
 defaults: {
        'id': null,
        'name': '',
        'instant_code': '',
        'category_id': null,
        'category_name': '',
        'image': '',
        'res_width': null,
        'res_height': null,
        'activeGame' : false,
        'video_link'  : "",
        'muted'  : "",
        'extraClass' : "",
        'hasDemoPlay'   : false,
        'gamesStep' : 52,
        'jackpot_counter' : false,
        'ndb_block' : false,
        'hasRibbon' : false,
        'ribbonClass' : 'recomnended-game',
        'ribbonText' : 'Recently Played',
        'slug' : "",
        'exclusive_game'    : 0,
        'responsible_gambling' : false,
        "slug_jp" : "",
        'launchInIFrame': false,
        'hasNetPosition': false,
        'scrollingIframe': 'no',
        'isLiveDealer' : false
 },

    idAttribute: "_id",

    initialize: function() {
        var model = this;
        if (model.get('slug') === "")  {
            model.set('slug',false);
        }

        if(!model.get('latest_played') || model.get('latest_played') === false) {
            model.set('latest_played',false);
        }

        if(!model.get('activeGame') || model.get('activeGame') === false) {
            model.set('activeGame',false);
        }  

        if (model.get('slug_jp') === '')  {
            model.set('slug_jp',false);
        }

        if (model.get('provider_id') === 2 || model.get('provider_id') === 9 )  {
            model.set('extraClass','live-casino');
        }

        App.Translations.loadTranslation('common', function(translations) {
            model.setRibbon(translations);
        })
        model.checkDemoPlay();
        model.setSlug();
        model.setExclusiveGames();
        model.launchInIFrame();
        model.hasNetPosition();
        model.scrollingIframe();
        model.checkLiveDealerGame();
    },

    checkDemoPlay : function() {
     var model = this;
     if(Red.Providers[model.get('provider_id')]) {
            model.set('hasDemoPlay',Red.Providers[model.get('provider_id')]['has_demo_play']);
        }
    },

    //decide which ribbon we should display
    setRibbon : function(translations) {
     var model = this;
        model.set('hasRibbon',model.get('latest_played')||model.get('activeGame')||model.get('jackpot_counter')||model.get('ndb_block')||model.get('favorite'));
        if(model.get('activeGame')) {
            model.set('ribbonText','Active Game');
        }

        if(model.get('jackpot_counter')) {
            model.set('ribbonClass','jackpot-counter-ribbon');
            model.set('ribbonText',model.get('jackpot_counter')['startAtValue']);
        }

        if(model.get('ndb_block')) {
            model.set('ribbonClass','blocked-game');
            model.set('ribbonText',translations['blocked-game']);
        }
    },

    setSlug : function () {
        var model = this;
        if(!model.get('slug')) {
            model.set('slug',model.get('slug_32red'));
        }
    },

    setExclusiveGames : function() {
        var model = this;
        if(model.get('exclusive_game')) {
            model.set('exclusive_game',moment.utc() > moment.utc(model.get('exclusive_game_end')) ? 0 : 1);
        }
    },

    launchInIFrame : function() {
        var model = this,
            launchInIframe = Red.Providers[model.get('provider_id')];

        if(launchInIframe && launchInIframe.launch_in_iframe == true) {
            model.set('launchInIFrame', true);
        }
    },

    hasNetPosition : function() {
        var model = this,
            hasNetPosition = Red.Providers[model.get('provider_id')];
        model.set('hasNetPosition', (hasNetPosition && hasNetPosition.has_net_position == true) || model.get('provider_id') === 3);
    },

    scrollingIframe : function() {
        var model = this;
        if(model.get('provider_id') === 1) {
            model.set('scrollingIframe', 'yes');
        }
    },
    
    checkLiveDealerGame : function () {
        var model = this,
            liveGamesProviders = [2,9,37,90];

        model.set('isLiveGame',$.inArray(model.get('provider_id'), liveGamesProviders) >= 0);
    }
});

var GameModelCollection = Backbone.Collection.extend({
    model: GameModel,   
});

var GamesCategoryModel = Backbone.Model.extend({
    defaults: {
        'id'                : null,
        'name'              : '',
        'subtitle'          : '',
        'image'             : '',
        'showAll'           : false,
        'sorted'            : 'popular',
        'gameStep'          : 13,
        'grid'              : 'BNNWNNNTNNNNN',
        'gameSize'          : '',
        'image_folder'      : 'game-icon',
        'gridHeight'        : 'two-rows',
        'gameIndexStart'    : 0,
        'gameIndexEnd'      : 0,
        'totalGames'        : 0,
        'gamesStep'         : 26,
        'gamesRendered'     : 0,
        'allGamesRendered'  : false,
        'viewAllSlug'       : "",
        'displayViewAllLink': false,
        'gameplayAreaGames' : false,
        'categoryNameSuffix': ''
    },

    initialize: function() {
        var model = this;

        model.setGridLayout();
        model.setGridCount();
        model.set('games',model.setGamesSizes());

        if(model.get('renderedFrom') === 'search') {
            model.setCategoryNameSuffix();
        }
        model.setCategoryHeight();
        model.setCategoryName();
        model.setViewAllLink();
        model.setGamesToShow();

        $(window).resize(function () {
            model.setGamesToShow();
        });

    },

    setViewAllLink : function() {
        var links = Red.CategorySlugs,
            model = this,
            categoryName = model.get('name').toLowerCase();

        if(links[categoryName]) {
            model.set('viewAllSlug',links[categoryName]);
            model.set('displayViewAllLink',true);
        }
    },

    /**
     * change grid layout based on number of games
     */
    setGridLayout : function() {
        var model = this,
            totalGames = model.get('category_games').length;

        //we don't apply this rule if we render latest games in gameplay area
        if(!model.get('gameplayAreaGames')) {
            if ((totalGames < 11)) {
                model.set('grid','W');
            }
            //fix for results of search less than 11
            if (model.get('renderedFrom') === 'search') {
                model.set('grid',totalGames < 11 ? 'N': 'BNNWNNNTNNNNN');
            }
        }

        // for the directory section where all tiles need to be normal sized
        if($('section.games-directory-page').length){
            model.set('grid','N');
        }
    },

    setGridCount : function() {
        var model = this,
            gridTemplate = model.get('grid').split('');
        model.set('gameStep',gridTemplate.length);
    },

    //calculate how many games we should show based on window size
    setGamesToShow : function() {
        var model = this,
            minGameWidth = Red.DeviceType !== "desktop"? 100 : 200,
            multiplier =  4,
            WW = $(window).width();
        if(model.get('renderedFrom') === "search") {
            multiplier =  25;
        }
        var maxGames = (Math.floor(WW/minGameWidth))*multiplier;
        model.set('gamesToShow', maxGames);
    },

    /**
     * setup the game size based on the template from config
     */
    setGamesSizes : function() {
        var model = this,
            gridTemplate = model.get('grid').split(''),
            gamesSizesMap = {
                "B": {"size":"width2height2","image_folder":"game-icon-big"},
                "N": {"size":"normalsize","image_folder":"game-icon"},
                "W": {"size":"width2","image_folder":"game-icon-wide"},
                "T": {"size":"height2","image_folder":"game-icon-tall"}
            };

        return _.map(model.get('category_games'),function(game,index){
            var indexToChange = index%model.get('gameStep');
            game['gameSize'] = gamesSizesMap[gridTemplate[indexToChange]].size;
            game['image_folder'] = gamesSizesMap[gridTemplate[indexToChange]].image_folder;
            return game;
        });
    },

    /**
     * Decide on the category height based on what type of icons we want to display
     * -if all are normal size or wide, we only have one row
     */
    setCategoryHeight : function() {
        var model = this,
            gridTemplate = model.get('grid'),
            gridTemplateLength = gridTemplate.length;
        if(gridTemplateLength === 1 && (gridTemplate === "N" || gridTemplate === "W")) {
            model.set('gridHeight','one-row');
        } else {
            model.set('gridHeight','two-rows');
        }
    },

    setCategoryName : function() {
        var model = this;
        if (model.get('localeName')) {
            model.set('name',model.get('localeName'));
        }
    },

    setCategoryNameSuffix : function() {
        var model = this;
        var res = model.get('totalGames') == 1 ? 'result' : 'results';
        model.set('categoryNameSuffix',res);
    },

    setNavigationIndex : function(gameIndexStart,gameIndexEnd) {
        var model = this;
        model.set('gameIndexStart',gameIndexStart);
        model.set('gameIndexEnd',gameIndexEnd);
    }
});

var GameCategoryCollection = Backbone.Collection.extend({
    model: GamesCategoryModel,
});
var GameView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    template: '#game-category-item',
    events : {
        'click a.real-play'             : 'onGameClick',
        'click a.free-play'             : 'freeGamePlay',
        'click .close'                  : 'closeGameInfo'
    },

    className : function(){
        var blockedGameClass = this.model.get('ndb_block') ? " blocked" : ""
        return 'game-item '+this.model.get('extraClass')+" "+this.model.get('gameSize')+blockedGameClass;
    },

    templateHelpers: function() {
        var self = this;
        return {
            'isRace': function() {
                return self.model.has('race');
            }
        };
    },

    initialize : function(options) {
        var view = this;

        if(view.model.has('race')) {
            this.updateRaceDuration();
        }
    },

    onRender: function() {
        var view = this;

        //check if game is in view and update the image
        _.delay(_.bind(this.checkGameInView, this), 50);
        _.delay(_.bind(this.updateImage, this), 300);

        if(view.model.has('race')) {
            var raceOverlay = new RaceOverlayView({
                el: view.$el.find('.race_overlay'),
                ongoing: $('#mobile').length <= 0, // if we are on desktop show the user info(if available) here
                model: new RaceModel(view.model.get('race'))
            }).render();
        }
        //if we have jackpot, display the jackpot ribbon
        if(view.model.get('jackpot_counter')) {
            var newGame  = new JackpotCounterView({
                model: new JackpotModel(view.model.get('jackpot_counter')),
                el: view.$el.find('.jackpot-counter-ribbon'),
            });
            view.$el.find('.grid').append(newGame.render().el);
        }
        view.delegateEvents();

        //event triggered when user uses te arrow to navigate
        App.vent.on('games-in-view',function(){
            view.updateImage();
        });

    },

    checkGameInView : function() {
        var view = this,
            containerWidth = view.$el.closest('.grid-wrapper').width();
        if((view.$el.position().left+view.$el.width()) < containerWidth) {
            view.$el.addClass('inView');
        }
    },

    onGameClick: function(e) {
        //when user launches a game from left side recommendations from gameplay area
        if($(e.target).parents('.otherGames').length || $(e.target).parents('.from-game').length) {
            App.vent.trigger('game:launch-from-recommended');
        }
        Util.manageStorage('remove', 'playGame');
    },

    freeGamePlay : function(ev) {
        Util.manageStorage('remove', 'playGame');
    },

    // will show game description and buttons in an overlay
    onGameClickMobile: function(e) {
        var view = this;
        var target = e.target;
        e.preventDefault();

        App.vent.trigger('show:modal',{
            model : {
                extraClass                  : 'mobile-game-popover',
                size                        : 'large',
                showCloseButton             : true,
                headerImageType             : 'none'
            }, showCallback : function() {
                $(target).parents(".game-item").addClass('game-chosen');
                var content = view.$el.find('.game-description').html();
                $('.mobile-game-popover .modal-content').html(content);
            }, hideCallback : function() {
                $('.game-item.game-chosen').removeClass('game-chosen');
            }
        });

        var elem = view.$el.find('.game-description.show-full')[0];
        var ver = this.iOSversion();
        if (ver && ver[0] == 11) {
            if (elem) {
                setTimeout(function () {
                    window.scrollBy(0, 1);
                }, 100);
            }
        }

        if (Util.manageStorage('get', 'launchedGame')) {
            Util.manageStorage('remove', 'playGame');
        }
    },
    // get the IOS version
    iOSversion: function() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    },

    closeGameInfo : function() {
        var view = this;
        $('#games-mini-menu,#content').removeClass('game-opened');
        view.$el.find('.game-description').removeClass('show-full');
        $('html').removeClass('no-scroll');
        App.vent.trigger('hide:loader');
    },

    updateImage: function() {
        var view  = this;

        if(view.model.get('responsible_gambling')) {
            var new_image = view.$el.find('img').attr('src');
            view.$el.find('img').css('opacity','1');
            view.model.set('new_image', new_image);
            return;
        }

        if(view.model.get('tvc')) {
            var newImage = view.model.get('img');
            view.$el.find('img').css('opacity','1');
            view.model.set('new_image', newImage);
            view.$el.find('img').attr('data-src', newImage);
            view.$el.find('img').unveil(200, function() {
                $(view).load(function() {
                    view.style.opacity = 1;
                });
            });
            return;
        }

        var imageFileName = view.model.get('img_name'),
            host = view.$el.find('img').attr('data-host');

        // Adjust to the correct resolution
        var imageFolder = view.model.get('image_folder');
        if(!imageFolder) {
            imageFolder = "game-icon";
        }

        imageFileName = 'default/' + imageFileName;
        imageFileName = imageFolder+'/'+ imageFileName+'.'+view.model.get('img_type');
        view.model.set('new_image', host + imageFileName);

        view.$el.find('img').attr('data-src', host + imageFileName);
        view.$el.find('img').unveil(400, function() {
            view.$el.find('img').addClass('visible');
            $(view).load(function() {
                view.style.opacity = 1;
            });
        });
    },

    updateRaceDuration: function(){
        var view= this;
        var race = view.model.get('race');
        var start_time = Date.parse(race.start)/1000;
        var end_time = Date.parse(race.end)/1000;
        var duration_m = Math.floor((end_time-start_time)/60);

        view.model.set('race_duration', duration_m);
    },
});
var GamesCategoryView = Backbone.Marionette.ItemView.extend({
    template: '#games-category-section',
    tagName: 'div',

    events : {
        'click a.arrow'             : 'gamesNavigation',
        'click a.less-games'        : 'showLessGames',
        'click .game-description a' : 'onGameClick'
    },

    templateHelpers: function() {
        var view = this;
        return {
            'getHref': function() {
                return view.model.get('name').replace(/\s+/g, '-').toLowerCase();
            }
        };
    },

    modelEvents: {
        'change:latestPlayed': 'refreshCategory',
        'change:name': 'refreshSearchGames',
    },

    initialize : function() {
        var view = this;
            
        view.model.set('totalGames',this.model.get('category_games').length);
        view.model.set('gamesRendered',0);
        view.model.set('allGamesRendered',false);
        setTimeout(function(){
            view.$el.find('.games-list').addClass('visible');
        },1);
    },

    refreshSearchGames : function() {
        var view = this;
        view.model.initialize();
        view.model.setGridLayout();
        view.refreshCategory();
        //update search title
        view.$el.find('.games-header h2').html(view.model.get('name')+'<span class="total-games">'+view.model.get('totalGames')+'</span> '+view.model.get('categoryNameSuffix'));

        view.$el.find('.grid-wrapper').removeClass('no-games two-rows one-row');
        view.$el.find('.grid-wrapper').addClass(view.model.get('gridHeight'));
        if(view.model.get('totalGames') === 0) {
            view.$el.find('.grid-wrapper').addClass('no-games');
        }
    },

    //update the recommended section
    refreshCategory : function() {
        var view = this;
        view.$el.removeClass('hidden');
        view.$el.find('.grid').html("");
        view.model.set('totalGames',this.model.get('category_games').length);
        view.model.set('gamesRendered',0);
        view.model.set('allGamesRendered',false);
        view.model.set('category_games',view.model.setGamesSizes());

        view.onRender();
    },
    
    onRender : function() {
        var view = this,
            gamesToShow = view.model.get('gamesToShow');

        //hide if there are no games in category
        if(view.model.get('totalGames') < 1 && view.model.get('renderedFrom') !== 'search') {
            view.$el.addClass('hidden');
            return;
        }

        //render initial batch of games for each category
        view.renderGames(view.model.get('gamesRendered'),gamesToShow);
        view.$el.find('.grid').animate({scrollLeft: 0});
        view.animationOn = false;
        setTimeout(function(){
            var scrollStep = view.$el.find('.grid').scrollLeft();
            if(view.$el.find('.inView')[0]) {
                if (view.$el.find('.game-item.inView').last().next()[0]) {
                    view.$el.find('.games-section').addClass('has-navigation');
                    scrollStep = view.$el.find('.game-item.inView').last().position().left-5;
                }

                //hack to fix when last tile in single row is outside the grid on search results
                //please fix when rewriting this module
                //.game-search-results element outside of scope of this view so jQuery Dom selector used
                if($('.game-search-results').hasClass('active')) {
                    var gridWrapperWidth = view.$el.find('.grid-wrapper').width();
                    var lastGameTileRight = view.$el.find('.game-item.inView').last().offset().left + view.$el.find('.game-item.inView').last().width();
                    if(lastGameTileRight > gridWrapperWidth){
                        view.$el.find('.games-section').addClass('has-navigation');
                        scrollStep = view.$el.find('.game-item.inView').last().position().left-5;
                    } else {
                        view.$el.find('.games-section').removeClass('has-navigation');
                    }
                }
                view.model.set('scrollStep',scrollStep);
                view.$el.find('.inView').last().nextAll().slice(0, 2).addClass('midView');
            }

            //for mobile since we have a free scrool navigation,
            //we check how close is the last games to viewport and we display next 15 games
            view.$el.find('.grid').scroll(function() {
                var lastGamePosition = view.$el.find('.grid').find('.game-item').last().position().left;
                if(lastGamePosition < 400) {
                   view.renderGames(view.model.get('gamesRendered'),view.model.get('gamesRendered')+gamesToShow);
                }
            });

            //check window resize and if needed, load more games
            $(window).resize(function () {
                if(view.model.get('gamesToShow') > gamesToShow) {
                    view.renderGames(view.model.get('gamesRendered'),view.model.get('gamesRendered')+view.model.get('gamesToShow'));
                }
            });
        },200);
    },

    renderGames : function(startIndex,endIndex) {
        var view = this,
            currentGames = this.model.get('category_games').slice(startIndex,endIndex);
        //check if all the games were rendered
        if(view.model.get('allGamesRendered')) {
            return;
        }

        view.model.set('gamesRendered', endIndex);

        if(endIndex >= view.model.get('totalGames')) {
            view.model.set('allGamesRendered',true);
        }

        //render each game and append to existing games category
        _.each(currentGames, function(game){
            var newGame  = new GameView({
                model: new GameModel(game)
            });
            view.$el.find('.grid').append(newGame.render().el);
        });

        _.each(view.$el.find('.grid .game-item'),function (gameItem) {
            $(gameItem).find('.number').html($(gameItem).index());
        });
    },
    
    gamesNavigation : function(ev) {
        ev.preventDefault();

        //if animation is not complete, don't do anything
        if (this.animationOn) {
            return;
        }

        var view = this,
            leftPos = view.$el.find('.grid').scrollLeft(),
            scrollStep = view.model.get('scrollStep'),
            direction = $(ev.target).closest('a').attr('data-action');
            scrollLeft = direction === "next" ? leftPos + scrollStep : leftPos - scrollStep;

        view.animationOn = true;
        view.$el.find('.grid').animate({scrollLeft: scrollLeft}, 400, 'linear',  function(){
            view.checkGameInView();
            if (view.$el.find('.game-item.inView').last().next()[0]) {
                scrollStep = view.$el.find('.game-item.inView').last().position().left-5;
            }
            view.model.set('scrollStep',scrollStep);
            App.vent.trigger('games-in-view');
            view.animationOn = false;

            //show/hide navigation arrows
            if(scrollLeft<=0) {
                view.$el.find('.games-section').attr('data-nav','right');
            } else if(view.$el.find('.game-item').last().hasClass('inView')){
                view.$el.find('.games-section').attr('data-nav','left');
            } else {
                view.$el.find('.games-section').attr('data-nav','');
            }

            //add more games to the category
            if(direction === "next") {
                var endIndex = view.model.get('gamesRendered')+view.model.get('gamesStep');
                if(endIndex >= view.model.get('totalGames')) {
                    endIndex = view.model.get('totalGames');
                }
                view.renderGames(view.model.get('gamesRendered'), endIndex);
            }
        });
    },

    checkGameInView : function() {
        var view = this,
            WW = $(window).width();
        if($('.game-search-results').hasClass('active')) {
            WW = view.$el.find('.grid-wrapper').width();
        }
        view.$el.find('.game-item').removeClass('inView');
        _.each(view.$el.find('.game-item'),function(item){
            if(($(item).position().left+$(item).width()-5) < WW) {
                $(item).addClass('inView');
                //midview is used to display blurred out games
                $(item).nextAll().slice(0, 2).addClass('midView');
            }
        })
    }
});

var GamesCategoryCollection = Backbone.Marionette.CollectionView.extend({
    childView: GamesCategoryView,
    tagName: 'div',
    className: 'games-categories',

    onRender: function() {
        var view= this;
        setTimeout(function(){
            $('.games-category-wrapper').removeClass('not-loaded');
        },500)
    },
});

var FreeGamesView = Backbone.Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'games grid games-list free-games hidden centrate',
    childView: GameView,

    onRender : function() {
        var view = this;
        gameNo = view.$el.find('.game-item').length,
            slickMinGames = 6;
        if (Red.DeviceType != "desktop") {
            slickMinGames = 3;
        }
        setTimeout(function(){
             if(gameNo > slickMinGames) {
                 view.$el.slick({
                     slidesToShow: 3,
                     slidesToScroll: 3,
                     infinite: true,
                     arrows: false,
                     dots: true,
                 });
             }
        },300);
        view.$el.removeClass('hidden');

    }
});

var FreeSpinsHeader = Backbone.Marionette.CollectionView.extend({
    el: '.free-games-pop-up',
    events: {
      'click .close-btn': 'closePopUp'
    },
    onRender: function() {
            this.$el.prepend('<div class="responsive-popover-wrapper free-spins-holder">' +
                '<div class="content"><div class="title">'+this.options.title+' </div>' +
                '<div class="message">'+this.options.message+'</div><div class="icon close-btn"><i class="icon-close"></i></div>' +
                '</div>' +
                '</div>');
    },
    closePopUp: function() {
        $('.free-games-pop-up .responsive-popover-wrapper').remove();
        $('.peekaboo-inner').removeClass('display-none');
        $('.peekaboo-inner').remove();
    }

});
var CountDownTimerViewIntervalCount = 0;
var CountDownTimerViewIdCount = 0;

var JackpotCounterView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'jackpot-counter',
    template: '#jackpot-counter',
    onRender : function () {
        var view = this;
        view.updateJackpot();
    },

    updateJackpot : function() {
        var view = this;

        setInterval(function () {
            var currentVal = parseFloat(view.model.get('startAtValue')),
                increase = parseFloat(view.model.get('centsPerSecond'))/100,
                newValue = (currentVal+increase).toFixed(2);
            view.model.set('startAtValue',newValue);
            view.model.setValueInCurrency();
            view.$el.find('.jackpot-value').text(view.model.get('friendlyValue'));
        }, view.model.get('intervalSeconds'));
    }
});

var JackpotModel = Backbone.Model.extend({
 defaults: {
  'jackpotIdentifier': '',
 },

 initialize : function () {
  var model = this;
  model.set({
   'intervalSeconds' : (model.get('jackpotIdentifier') === 'MUST_BE_WON_MEGA') ? 5000 : 1000,
  });
  model.setValueInCurrency();
 },

 setValueInCurrency: function () {
  var model = this;
  model.set('friendlyValue',model.get('startAtValue').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
 }
});
var GamesDirectory = Backbone.Marionette.ItemView.extend({
    template: '#games-directory',
    events : {
     'click .list-options a'     : 'switchDisplay',
     'click .sorting-options a'  : 'sortGames',
        'click .open-search'        : 'openSearch'
        
    },
    initialize: function() {
        $('#container').addClass('games-directory-page');
    },
    onRender : function() {
        var view = this;

        App.vent.on('get:categoryGames', function(games){
            view.$el.find('.sorting-options a').removeClass('active');
            view.$el.find('.sorting-options li:first-child a').addClass('active');
            view.games = games;
        });

    },

    switchDisplay : function(ev) {
     var view = this,
            target = $(ev.target).closest('a');
     ev.preventDefault();
        target.closest('.list-options').find('.active').removeClass('active');
        target.addClass('active');
        if(target.hasClass('list')) {
            view.$el.find('#games-browser').addClass('list');
        } else {
            view.$el.find('#games-browser').removeClass('list');
        }
    },

    sortGames : function(ev) {
     var view = this;
      target = $(ev.target);
      sortType = target.attr('data-sort');
     ev.preventDefault();
        
        target.closest('.sorting-options').find('a').removeClass('active');
        target.addClass('active');

        if(view.games) {
            switch (sortType) {
                case 'alphabetical':
                    sortGames = _.sortBy(view.games, 'name');
                    break;
                case 'popular':
                    sortGames = view.games;
                    break;
                case 'newest':
                    sortGames = _.sortBy(view.games, 'created');
                    sortGames.reverse();
                    break;
            }
            App.GamesDirectoryModule.selectedGames.set(sortGames);
        }
    },

    openSearch : function(ev) {
        var view = this;
            target = $(ev.target);
        ev.preventDefault();
        target.closest('.games-options-inner').toggleClass('active');
    }
});

//this is used for games directory - displays all the games from a subcategory
var GamesDirectoryCategory = Backbone.Marionette.CollectionView.extend({
    tagName: 'div',
    className: 'games grid games-list clearfix',
    childView: GameView
});



App.module("GamesDirectoryModule", function(GamesDirectoryModule, App, Backbone, Marionette, $) {
    GamesDirectoryModule.addInitializer(function(options) {
        GamesDirectoryModule.gameCategories = new GameCategoryCollection();
        GamesDirectoryModule.selectedGames = new GameModelCollection();
    });
    App.vent.on('games:received', function(data) {
        //display games directory
        App.vent.on('show:games-directory', function (category) {
            GamesDirectoryModule.loadGamesDirectory(data, category);
        });
    });

    GamesDirectoryModule.loadGamesDirectory = function(data,category) {
        //move allgames category at the begining of the array
        var allGames = _.union(_.last(data['games']), _.initial(data['games']));
        if(GamesDirectoryModule.gameCategories.length > 0) {
            GamesDirectoryModule.selectedGames.set(category.get('games'));
        } else {
            var gamesDirectoryView = new GamesDirectory({
                el :$('.games-directory')
            });
            $('.games-directory').append(gamesDirectoryView.render().el);

            GamesDirectoryModule.gameCategories.set(allGames);
            GamesDirectoryModule.selectedGames.set(GamesDirectoryModule.gameCategories.at(0).get('games'));

            App.vent.trigger('get:categoryGames', GamesDirectoryModule.gameCategories.at(0).get('games'));

            GamesDirectoryModule.gameBrowserView = new GamesDirectoryCategory({collection: GamesDirectoryModule.selectedGames});
            App.gameBrowserRegion.show(GamesDirectoryModule.gameBrowserView);

            GamesDirectoryModule.loadCategoriesMenu(GamesDirectoryModule.gameCategories,20);
        }
    };

    GamesDirectoryModule.loadCategoriesMenu = function(category,maxCat) {
        if($('#game-categories-menu')[0]) {
            GamesDirectoryModule.gameCategoryMenuView = new GamesDirectoryMenuView({
                collection: category,
                maxCat : maxCat, //maximum number of menu items(categories) shown in the menu on desktop
                el : $('#game-categories-menu')
            }).render();
        }
    };
});
var GameMenuItemView = Backbone.Marionette.ItemView.extend({
 tagName: 'li',
    template: '#game-menu-item-view',
    
    events: {
        'click a': 'onCategoryClick'
    },
    
    templateHelpers: function() {
        var view = this;
        return {
            'getHref': function() {
                var name = view.model.get('name').replace(/\s+/g, '-').toLowerCase();
                return name;
            },
            'getDisplayName': function() {
    if (view.model.get('localeName')) {
     return view.model.get('localeName');
    }
                return view.model.get('name');
            }
        }
    },

    initialize : function() {
        var view = this;
        if(view.model.get('name') === "Recommendations For You") {
            view.model.set('name','Recommended');
        }

    },

    onShow: function() {
        var view = this;
        this.listenTo(App.vent, 'show:games-directory', this.onCategorySelected);
        if(view.model.get('games').length == 0) {
            view.$el.remove();
        }
    },

    onCategoryClick: function(e) {
        var view = this;

        view.menuCategoryNavigation(e);
        if($('#games-browser')[0]){
            App.vent.trigger('show:games-directory', this.model);
        }
        //get the games for sorting the games directory
        App.vent.trigger('get:categoryGames', this.model.get('games'));
    },

    onCategorySelected: function(model) {
        if (model === this.model) {
            this.$el.addClass('active');
        }
        else {
            this.$el.removeClass('active');
        }
    },

    menuCategoryNavigation : function(e){
        var view = this,
            target = $(e.target).closest('a'),
            scrollElem = '#'+target.attr('data-category-id'),
            gamesMenu = view.$el.closest('.games-menu');
        // e.preventDefault();
        gamesMenu.find('a').removeClass('active');
        target.addClass('active');

        // scroll to game section
        if($(scrollElem)[0]) {
            $('html, body').animate({
                scrollTop: $(scrollElem).offset().top-160
            }, 1000);
        }
    }
});

var GamesDirectoryMenuView = Backbone.Marionette.CollectionView.extend({
 tagName: 'ul',
    childView: GameMenuItemView,

    initialize : function(options) {
        var view = this;
        view.maxCat = options.maxCat;
        // hide the menus on init
        view.$el.css('display','none');
    },

    onDomRefresh: function(){
        var view = this;

        setTimeout(function(){
            // set the active one
            view.$el.find('li:first-child').addClass('active');

            // if we need to add some to the more
            if(view.$el.find('li').length > view.maxCat) {

                // add not-visible to all
                view.$el.find('li').addClass('not-visible');

                // remove not-visible and add visible to the first visible
                for (var i = 0; i < view.maxCat; i++) {
                    view.$el.find('li:eq('+i+')').removeClass('not-visible').addClass('visible');
                }

                // load the More Games
                App.Translations.loadTranslation('game-category-names', function(translations) {
                    // append the more games element
                    view.$el.find('li.visible:last').after('<li class="visible more-games-wrapper"><a>'+translations["more_games"]+'</a><ul></ul></li>');
                    // move all the not-visible elements to the more
                    view.$el.find('li.not-visible').appendTo('.more-games-wrapper ul');//('<li class="more-games-wrapper"><ul></ul></li>')

                    // re-show the menus after we actually decided what to do with them after we loaded the translations
                    view.$el.css('display','inherit');
                });

            } else {
                view.$el.find('li').addClass('visible');
            }

            App.vent.trigger('start:jw');
        },10);
    }
});

var responsivePopover = ResponsivePopoverView.prototype;

var GameplayAreaView = ResponsivePopoverView.extend({
    events : _.extend({}, responsivePopover.events, {
      'click .game-deposit' : 'openBanking',
      'click .game-item .game-description a' : 'openRelatedGame',
      'click .disable-full-screen' : 'disableFullScreen',
      'click .enable-full-screen' : 'enableFullScreen',
      'click .full-screen-option .real-money-button' : 'displayLoginBox',
      'fullscreenchange' : 'fullscreenchange',
    }),

    onRender : function () {
        responsivePopover.onRender.apply(this, arguments);
        var view = this;
        //show real-play overlay after 5 min
        if(view.options.freePlay) {
            App.vent.on('show:realPlayOverlay',function(gameId){
                view.realPlayOverlay(gameId);
            });
        }
        
        App.vent.on('session-reminder:display', function() {
            view.disableFullScreen();
        });

        App.vent.on('hide:gamePlay-popover', function() {
            view.closeGame();
        });

        $("img").unveil(200, function() {
          $(this).load(function() {
            this.style.opacity = 1;
          });
        });

        $('.otherGames .game-item .game-description a').removeClass('cta');
    },

    displayLoginBox : function(ev) {
        var view = this;
        view.disableFullScreen();
    },

    openRelatedGame : function(ev) {
        var view= this,
            target = $(ev.target);
            gameId = JSON.parse(target.attr('data-game-id'));
        ev.preventDefault();
        if(this.options.freePlay) { 
            App.appRouter.navigate("gameplay/" + gameId+"/free",{trigger:true});
        }else {
            App.appRouter.navigate("gameplay/" + gameId,{trigger:true});
        }
    },

    enableFullScreen : function(ev) {
        var view = this, element;
        var gameProviderId = App.GamesPlayerModule.LauchedGameModel.attributes.provider_id;
        ev.preventDefault();

        if($('#game-wrapper')[0]) {
            $('#game-wrapper').addClass('full-screen');
            element = document.getElementById('game-wrapper');

            //fix net-position-bar
            var netPositionBar = $('#net-position-bar');
            if(netPositionBar[0]) {
                netPositionBar.hide();
                setTimeout(function(){
                    $('#net-position-bar').css({'top' : ($('#gameFrame').offset().top - netPositionBar.height()) + 'px'});
                    netPositionBar.show();
                }, 500);
            }
        } else {
            element = document.documentElement;
        }

        // TODO: General method in helper
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

        //if is live casino game
        if(view.options['data'] && (Red.Providers[gameProviderId].third_party == 'Evolution')) {
            // TODO: Check for divide by zero
            var gameRatio = view.options['data']['desktop_height']/view.options['data']['desktop_width'];
            if(view.options['data']['res_height'] <780) { 
                //for 1920x1080 games
                var maxWidth = screen.width-400,
                    maxHeight = maxWidth*gameRatio;
            } else {
                //for 800x680 games
                var maxHeight = screen.height-60,
                    maxWidth = maxHeight/gameRatio;
            }

            $('#game-wrapper').find('iframe').css({
                'width' : maxWidth +'px',
                'height' : maxHeight +'px',
            });
        }
    },

    disableFullScreen : function(ev) {
        if($('#net-position-bar')[0]) {
            $('#net-position-bar').css({'top' : 0});
        }
        // ev.preventDefault();
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if(document.msExitFullscreen) {
          document.msExitFullscreen();
        }
    },

    openBanking : function(ev) {
        var view = this,
            target = $(ev.target),
            bankingHolder = view.$el.find('#banking-container');

        view.$el.toggleClass('slide-left');
        bankingHolder.toggleClass('opened');
    },

    realPlayOverlay : function(gameId) {
        var view = this;
        var newGameId = gameId;
        if((!$('.play-real')[0]) && ($('.full-screen-option')[0])) {
            App.vent.trigger('show:popover',{
                content : $('.play-real-money'),
                maxWidth : 600,
                maxHeight : 350,
                extraClass : "play-real",
                showCloseButton : false,
                mobileFullScreen : true,
                closeClickOutside : false,
                showCta : false,
                noScroll: true,
                data : view.options.data,
                cloneContent : true,
                showCallback : function(el){
                    if ($.cookie('Auth')) {
                    } else {
                        $(el).find('.popover-content').addClass('not-logged-in');
                    }
                },
                ctaCallback: function() {
                    if (App.LoginModule.loginModel.get('state') === "Authentication Success") { 
                        var gameId = view.options.data['id'];
                        App.appRouter.navigate("gameplay/" + newGameId,{trigger:true});
                    } else {
                        /*
                        * if the user is not logged-in, display the log-in/register popover
                        * "show:login-popover" event is handled in responsive popover module
                        */
                        var gameAttributes = newGameId;//view.options.data['id'];
                        App.vent.trigger('show:login-popover',gameAttributes);
                    }
                    return false;
                }
            });
        }
    },

    closeGame : function(ev) {
        if (ev && ev.preventDefault) {
            ev.preventDefault();
        }
        this.hidePopover();
        $('.responsive-popover-wrapper').hide().remove();
        App.appRouter.navigate("",{trigger:true});
    },

    fullscreenchange : function (e) {
        var view = this;
        if (!document.fullscreenElement) {
            view.disableFullScreen();
        }
    }
 });

//set timeout for display the real play popover
jQuery(function($) {
    // TODO: use setTimeout (or underscore functions)
    // TODO: Use a config constant for timing
    var showrealPlayOverlay = null;
    App.vent.on('games:play', function(game) {
        clearInterval(showrealPlayOverlay);
        showrealPlayOverlay = setInterval(function(){
            App.vent.trigger('show:realPlayOverlay', game['id']);
        },300000);
    })
    if(showrealPlayOverlay) {
        clearInterval(showrealPlayOverlay);
        App.vent.off('show:realPlayOverlay');
        showrealPlayOverlay = null;
    }
    showrealPlayOverlay = setInterval(function(){
        App.vent.trigger('show:realPlayOverlay');
    },300000);
});
var GamePlayerViewLive = Backbone.Marionette.ItemView.extend({
    template: '#game-player-template-live',
    events : {
        'click .search-input-image' : 'launchSearch',
        'click a.real-play': 'onGameClick',
        'click a.free-play': 'onGameClick',
    },

    launchSearch: function() {
        App.appRouter.navigate("search", {trigger:true});
        $('.search-overlay').addClass('from-game');
    },

    onShow: function() {
        $('.otherGames').addClass('load');
        setTimeout(function(){
            if(!Red.LoadSpecialExtraGames) {
                //if we don't have a special category to display on the left side, we load the latest played games
                App.vent.trigger('display:latest-games');
            }
            $('.otherGames').removeClass('load');
        },500);
    },

    onGameClick: function(e) {
        //when user launches a game from left side recommendations from gameplay area
        if($(e.target).parents('.otherGames').length) {
            App.vent.trigger('game:launch-from-recommended');
        }
        Util.manageStorage('remove', 'playGame');
    },

    onRender: function() {
        if ($('.InGameBanner-inner')[0] && $(window).width() > 1024) {
            $('#game-wrapper').css({
                'right':'280px',
            });
        }
        var view = this;
        this.$el.find('.background').css('background-image', 'url(' + this.$el.find('.background').attr('data-image-host') + this.getBgImage() + ')');
        view.removePlayedGame();
        view.setMobileGameSize();
        $(window).resize(function(){
            setTimeout(function() {
                view.$el.find('.background').css('background-image', 'url(' + view.$el.find('.background').attr('data-image-host') + view.getBgImage() + ')');
            }, 200);
        });

        var gameWidth = view.model.get('desktop_width'),
            gameHeight = view.model.get('desktop_height'),
            gameWrapper = view.$el.find('#game-wrapper'),
            gameRatio = gameHeight/gameWidth;

        if((Red.DeviceType === "desktop") && (gameHeight<730)) {
            view.$el.addClass('wide-game');
        }

        setTimeout(function() {
            view.setGameSize(gameWrapper,gameHeight, gameWidth, gameRatio);
            view.setMobileGameSize();
        }, 100);
        $(window).resize(function(){
            view.setGameSize(gameWrapper,gameHeight, gameWidth, gameRatio);
            view.setMobileGameSize();
        });

        if (this.$('form')[0]) {
            var form = this.$('form').get(0);
            _.defer(function() {
                form.submit();
            });
        }
        
        try {
            picturefill();
        }
        catch (e) {
            
        }
    },

    setMobileGameSize: function() {

        var view = this;
        //set default portrait
        var isPortait = true;
        var windowH = $(window).innerHeight();
        var windowW = $(window).innerWidth();
        var gameNav = $('footer.mobile-nav').height();
        var netPositionBar = view.model.get('hasNetPosition') ? 22 : 0;
        var bankingButton = $('footer.mobile-nav div.deposit-mobile');
        
        //if landscape        
        if( windowW > windowH ) {
            isPortait = false;
            gameNav = $('footer.mobile-nav').width();
        }

        //reset banking button bottom to 0
        bankingButton.css('bottom',  0);

        //set height/width minus nav bar depending on isPortrait
        var ww = isPortait ? windowW : windowW - (gameNav+netPositionBar);
        var wh = isPortait ? windowH - (gameNav+netPositionBar) : windowH;
        $('#mobile-game-launch-frame').css({'width':ww});
        $('#mobile-game-launch-frame').css({'height':wh, 'top': netPositionBar});

        //if iphone device and landscape check if addressbar is open    
        if(!!navigator.platform.match(/iPhone/) && !isPortait) {
            view.checkIPhoneAddressBar(windowH,bankingButton);  
        }                    
    },
 
    checkIPhoneAddressBar : function (innerHeight,bankingButton){
        setTimeout(function() {  
            $(window).scrollTop(0);   
            // if window height has reduced(address bar/tabs open) reset play area and reposition banking button 
            if(window.innerHeight < innerHeight) { 
                $('#mobile-game-launch-frame').css('height',window.innerHeight); 
                var bankingBtnBottom = innerHeight - window.innerHeight;    
                bankingButton.css('bottom',bankingBtnBottom);
            }            
        },500);  
    },

    setGameSize : function(gameWrapper,gameHeight, gameWidth, gameRatio) {
        var view = this,
            gameInitWidth = gameWrapper.innerWidth(),
            gameInitHeight = gameWrapper.innerHeight(),
            promoBox = view.$el.find('.new-player-box');
            if ($('.InGameBanner-inner')[0] && $(window).width() > 991 && !$('.hideInGame')[0]) {

                gameplayWidth = $('.popover-content #game-player').innerWidth()-60;
                $('#game-wrapper').css({
                    'right':'280px',
                });
            } else {
                if ($('.InGameBanner-inner')[0] && $('.showInGame')[0]) {
                    gameplayWidth = $('.popover-content #game-player').innerWidth()-60;
                    $('#game-wrapper').css({
                        'right':'280px',
                    });
                } else {
                    gameplayWidth = $('.popover-content #game-player').innerWidth() - 320;
                    $('#game-wrapper').css({
                        'right': '80px',
                    });
                }
            }

        if(gameplayWidth < gameWidth) {

            gameResizeHeight = gameplayWidth*gameRatio;
            gameWrapper.css({
                'height':gameResizeHeight,
            });
        } else {
            gameWrapper.css({
                'height':gameHeight,
            });
        }

        gameWrapper.css('max-height',$(window).innerHeight()-80);
        if(view.$el.innerHeight() < gameInitHeight+100) {
            gameWrapper.css({
                'bottom':'auto',
                'padding-bottom': '10px'
            });
        } else {
            gameWrapper.css({
                'bottom':'0',
                'padding-bottom': '0px'
            });
        }

        //set the dimensions for "other games" section
        var otherGameHeight = (view.$el.find('.otherGames').innerHeight()-60)/6 -15;
        view.$el.find('.otherGames').css({'width':otherGameHeight+30});
        view.$el.find('.otherGames .game-item').css({
            'height': otherGameHeight,
            'width' : otherGameHeight
        });
    },

    removePlayedGame : function() {
        var view = this,
            gameId = view.model.get('id'),
            moreGames = view.$el.find('.more-games');

        if (moreGames.find('.id'+gameId)[0]) {
            moreGames.find('.id'+gameId).remove();
        } else {
            view.$el.find('.more-games .game-item').last().remove();
        }
    },
    
    getBgImage: function() {
        var view = this;
        var pageWidth = $(window).width();
        var pageHeight = $(window).height();
        
        var imageFolder = 'game-bg';
        
        if (pageWidth > pageHeight) {
            imageFolder += '-landscape/';
            if (pageWidth > 1440) {
                imageFolder += 'large/';
            }
            else if (pageWidth > 1280) {
                imageFolder += 'medium/';
            }
            else {
                imageFolder += 'small/';
            }
        }
        else {
            imageFolder += '-portrait/';
            if (pageHeight > 2720) {
                imageFolder += 'xlarge/';
            }
            else if (pageHeight > 1360) {
                imageFolder += 'large/';
            }
            else if (pageHeight > 680) {
                imageFolder += 'medium/';
            }
            else {
                imageFolder += 'small/';
            }
        }
        
        return imageFolder + view.model.get('img_name') + '.jpg';
    }
});
//extends the gameplay area live. It has the same functionality,
//but it uses a different template and we add some template helpers
var GamePlayerView = GamePlayerViewLive.extend({
    template: '#game-player-template',
    events : {
        'click a.real-money-button': 'freeToReal',
        'click .search-input-image' : 'launchSearch',
        'click .otherGamesLaunch ' : 'otherGamesLaunch'
    },
    templateHelpers: function() {
        return {
            getLoginName: function() {
                if(App.LoginModule.loginModel.get('username')) {
                    return App.LoginModule.loginModel.get('username');
                } else {
                    return "demo";
                }
            },
            getPassword: function() {
                if(App.LoginModule.loginModel.get('password')) {
                    return App.LoginModule.loginModel.get('password');
                } else {
                    return "demo";
                }
            },

            isLoggedIn: function() {
                return App.LoginModule.loginModel.get('state') === "Authentication Success";
            },

            getBaseUrl: function() {
                var getUrl = window.location;
                return baseUrl = getUrl.protocol + "//" + getUrl.host + "/gameplay-area-extra-games";
            }
        };
    },

    freeToReal: function(ev){
        ev.preventDefault();
        var realCashUrl = ev.target.hash;
        $.cookie('gso', parseInt($.cookie('gso'))-1);
        App.appRouter.navigate(realCashUrl,{trigger:true});
    },

    launchSearch: function() {
        App.appRouter.navigate("search", {trigger:true});
        $('.search-overlay').addClass('from-game');
    },

    otherGamesLaunch: function() {
        App.vent.trigger('games:stop_playing');
        App.vent.trigger('games:gameOff');
    }
});

App.module("GamesPlayerModule", function(GamesPlayerModule, App, Backbone, Marionette, $) {
    App.addInitializer(function(options) {
        // launch mobile options or options for screen sizes <1024 px
        $('body').off('click',".game-item .mobile-overlay").on('click',".game-item .mobile-overlay",function(ev){
            App.vent.trigger('show:modal',{
                model : {
                    extraClass                  : 'mobile-game-popover',
                    size                        : 'large',
                    showCloseButton             : true,
                    headerImageType             : 'none'
                }, showCallback : function() {
                    $(ev.target).parents(".game-item").addClass('game-chosen');                    
                    var content = $(ev.target).parents(".game-item").find('.game-description').html();
                    $('.mobile-game-popover .modal-content').html(content);
                }, hideCallback : function() {
                    $('.game-item.game-chosen').removeClass('game-chosen');
                }
            });

            var ver = GamesPlayerModule.iOSversion();
            if (ver && ver[0] == 11) {
                if (elem) {
                    setTimeout(function () {
                        window.scrollBy(0, 1);
                    }, 100);
                }
            }

            if (Util.manageStorage('get', 'launchedGame')) {
                Util.manageStorage('remove', 'playGame');
            }
        });
    });
    /**
    * open the gameplay area
    */
    GamesPlayerModule.gamePlayerView = null;

    GamesPlayerModule.iOSversion = function() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
    }

    //launch mobile live casino games
    App.vent.on('games:play:livecasino:mobile', function(game) {
        $.ajax({
            type: "POST",
            url: '/game-launch/'+game.id
        }).done(function(data) {
            data = JSON.parse(data);
            if(data.isBonusReminder){
                const $iframe = $('<iframe>', {
                    id: 'bonus-reminder-message',
                    src: data.bonusReminderLink
                });
                $iframe.css({
                    'position': 'absolute',
                    'top': '0px',
                    'width': '100%',
                    'height': '100vh',
                    'z-index': '100000'
                });

                $('body').append($iframe);
                window.addEventListener('message', function(event) {
                    if(event.data === 'bonus_reminder_confirmed'){
                            EvolutionGaming.loadGame({
                                url: data.url
                            });
                            App.vent.trigger('hide:loader');
                            App.vent.trigger('games:start_playing');
                            App.vent.trigger('games:gameOn');

                            $('html').addClass('no-scroll');
                            GamesPlayerModule.fixIosSwipeToPlay();
                            GamesPlayerModule.trackGame(game);
                    }
                });
            } else {
                EvolutionGaming.loadGame({
                    url: data.url
                });
                App.vent.trigger('hide:loader');
                App.vent.trigger('games:start_playing');
                App.vent.trigger('games:gameOn');

                $('html').addClass('no-scroll');
                GamesPlayerModule.fixIosSwipeToPlay();
                GamesPlayerModule.trackGame(game);
            }
        });
    });

    GamesPlayerModule.fixIosSwipeToPlay = function(){
        var isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

        if(!isIos) { return false; }

        setTimeout(function () {
            $('html#mobile.no-scroll #iframe').css('height', '100vh');
        }, 2000);
    };

    GamesPlayerModule.tealiumSendData = function(game){
        //Tealium Stuff here
        if(!Red.tealiumData){
            Red.tealiumData = {};
            Red.tealiumData.fail = "1";
        } else {
            Red.tealiumData.fail = "0";
        }
        Red.tealiumData.id = game.id;
        Red.tealiumData.name = game.name;
        Red.tealiumData.freePlay = game.freePlay;
        Red.tealiumData.providerId = game.provider_id;
        App.vent.trigger('track:games:general', Red.tealiumData);
        Red.tealiumData = {};
    };

    GamesPlayerModule.trackGame = function (game) {
        window.adalyserTracker("trackEvent", "lce5",
            {uuid: JSON.parse($.cookie('User'))['userId'], a1: "Casino"}
        );
        $.ajax({
            type: "POST",
            url: '/gamesApi/trackGame/'+game.id,
            data: {
                game: game.id
            },
            dataType: "json"
        }).done(function(){
            App.vent.trigger('game:end_tracking');
        });

        GamesPlayerModule.tealiumSendData(game);
    };

    App.vent.on('games:play', function(game) {
        if(!$('.responsive-popover-wrapper.registration')[0]) {
            $('.responsive-popover-wrapper').remove();
        }
        // add the region where the game will be rendered
        $('#container-inner').append('<div id="game-player"/>');
        App.addRegions({ gamePlayerRegion: '#game-player' });

        /**
         * Launch Live Casino games
         */
        var freePlay, prepPingFn;
        var gamePlayerView = GamePlayerView;
        _.each(Red.Providers,function(provider, key){
            if(provider.third_party !== 'Evolution') {
                var freePlay  = game.freePlay,
                    prepPingFn = function(data) { },
                    gamePlayerView = GamePlayerViewLive;
            }
        });

        GamesPlayerModule.LauchedGameModel = new GameModel(game);
        App.gamePlayerRegion.show(GamesPlayerModule.gamePlayerView = new gamePlayerView({
            model: GamesPlayerModule.LauchedGameModel
        }));
        GamesPlayerModule.trackGame(game);

        /**
         * Show game popoover
         */
        App.vent.trigger('show:gamePlay-popover',{
            content : $('#game-player'),
            maxWidth : "100%",
            maxHeight : "100%",
            extraClass : "play-area gamePlay",
            showCloseButton : !((game.provider_id === 2 || game.provider_id === 9) && Red.DeviceType !== "desktop"),
            closeClickOutside : false,
            noScroll: true,
            confirmClose: true,
            fullScreenButton : false,
            freePlay : freePlay,
            ctaCallback: function(ev) {
                 if (App.LoginModule.loginModel.get('state') !== "Authentication Success") {
                     /**
                    * if the user is not logged-in, display the log-in/register popover
                    * "show:login-popover" event is handled in responsive popover module
                    */
                     var gameId = game['id'];
                     App.vent.trigger('show:login-popover',gameId);
                 }
                return false;
            },
            showCallback: function() {
                App.vent.on('ping:sending', prepPingFn);
                App.vent.trigger('games:start_playing');
                App.vent.trigger('games:gameOn');
            },
            hideCallback: function() {
                if (GamesPlayerModule.gamePlayerView) {
                    GamesPlayerModule.gamePlayerView.destroy();
                }
                App.vent.off('game:kill');
                App.vent.off('ping:sending', prepPingFn);
                App.vent.trigger('games:stop_playing');
                App.vent.trigger('games:gameOff');
            }
        });
    });
});

var GiveAwayGamesModel = Backbone.Model.extend({
    defaults: {
        title         : 'title',
        imgsrc        : 'https://static.32red.com/img/basic-image/32red-white.svg',
        date          : 'date',
        content       : '...',
        terms         : '',
        termsUrl      : '#',
        ctaText       : '',
        isReleased    : true,
        offerImg      : '',
        isOffer       : false,
        hasOffer      : false,
        offer         : false,
        ctaUrl        : '#',
        isLoggedIn    : false
    },
    initialize: function(data) {

        var model = this;
        var isReleased = model.isDateInTheFuture(data.params.releaseDate);
        var ctaUrlMobile = (isReleased) ? data.params.gameMobileId : '#';
        var ctaUrlDesktop = (isReleased) ? data.params.gameDesktopId : '#';
        var ctaText = (isReleased) ? data.params.buttonText : 'Coming Soon';
        var releaseDate = moment.utc(data.params.releaseDate,"MM-DD-YYYY").format('MMMM Do YYYY');
        var offerImg = (data.params.slashImgUrl !== undefined) ? data.params.slashImgUrl : '';
        var isOffer = (data.params.slashImgUrl !== undefined && data.params.slashImgUrl !== '');
        var hasOffer = (data.params.hasOffer !== undefined && data.params.hasOffer === 'true');
        var ctaUrl = (Red.DeviceType === 'mobile') ? ctaUrlMobile : ctaUrlDesktop;
        var isLoggedIn = App.LoginModule.loginModel.get('state') === 'Authentication Success';

            model.set({
                'content'                  : data.content,
                'imgsrc'          : data.params.imgsrc,
                'title'              : data.params.title,
                'date'                     : releaseDate,
                'terms'                    : data.params.termsText,
                'termsUrl'                 : data.params.termsUrl,
                'ctaText'                  : ctaText,
                'isReleased'               : isReleased,
                'isOffer'                  : isOffer,
                'hasOffer'                 : hasOffer,
                'offerImg'                 : offerImg,
                'ctaUrl'                   : ctaUrl,
                'isLoggedIn'               : isLoggedIn
            });
    },
    isDateInTheFuture: function(releaseDate){
        var now = moment.utc();
        var releaseDate = moment.utc(releaseDate,"MM-DD-YYYY");

        return (now >= releaseDate);
    }

});

var GiveAwayGamesCollection = Backbone.Collection.extend({
    model: GiveAwayGamesModel
});
var GiveAwayGameChildView = Backbone.Marionette.ItemView.extend({
    template: '#give-away-game-template',
    className: 'game-wrapper'
});
var GiveAwayGamesCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: GiveAwayGameChildView,
    events: {
        'click a.giveAwayGameBtn'    : 'showContent',
        'click .game-content .close' : 'hideContent'
    },
    initialize: function(){
      var view = this;
      $(view.el).off('click', 'a.giveAwayGameBtn');
      $(view.el).off('click', '.game-content .close');
    },
    onRender: function(){
        var view = this,
            gameWrapper = view.$el.find('.game-wrapper');

        gameWrapper.find('.optin').parents('.has-offer').removeClass('has-offer');
    },
    hideContent: function(){
        var view = this,
            gameWrapper = view.$el.find('.game-wrapper');

            gameWrapper.removeAttr('style');
            gameWrapper.removeClass('active');
    },
    showContent: function(e){
        e.preventDefault();

        var view    = this,
            target  = $(e.target).parents('.game-wrapper'),
            gameWrapper = view.$el.find('.game-wrapper'),
            content = target.find('.game-content'),
            arrow = gameWrapper.find('.arrow-up');
        if(target.hasClass('active')){
            target.removeClass('active');
            this.hideContent();
            return;
        }

        this.hideContent();
        target.addClass('active');
        var elementHeights = [];
        var level = 0;
        gameWrapper.each(function(i, el){
            var elementTopPosition = $(el).position().top;
            if(!elementHeights.includes(elementTopPosition)){
                level++;
                elementHeights.push(elementTopPosition);
            }
            $(el).attr('data-level', level);
        });

        content.removeClass('hidden');
        arrow.removeClass('hidden');
        var newHeight = content.height() + 22;

        var currentElementTopPosition = target.position().top;
        var levelOfCurrentElement = elementHeights.indexOf(currentElementTopPosition) + 1;
        var elementLevelsToMove = levelOfCurrentElement + 1;

        var elementsToMove = view.$el.find('.game-wrapper[data-level="'+elementLevelsToMove+'"]');
        elementsToMove.css('marginTop', newHeight);
        if(elementsToMove.length < 1){
            elementsToMove = view.$el.find('.game-wrapper[data-level="'+(elementLevelsToMove - 1)+'"]');
            elementsToMove.css('marginBottom', newHeight);
        }
    },
    refreshButtons : function(){
        var view = this;
        view.$el.find('.game-wrapper.active .has-offer').removeClass('has-offer');
    }
});

App.module('GiveAwayGames', function(GiveAwayGames, App, Backbone, Marionette, $) {
    App.vent.on('show:giveAwayGameTemplate',function(data, id){
        var gamesCollection = new GiveAwayGamesCollection(),
            mainClass = $('#giveAwayGames-'+id).find('.giveAwayGamesInnerWrapper');

        $.each(data, function(i, obj){
            if(obj.content === undefined) return;
            gamesCollection.add(new GiveAwayGamesModel(obj));
        });

        App.GiveAwayGamesCollectionView = new GiveAwayGamesCollectionView({
            collection: gamesCollection,
            el : mainClass
        });

        App.vent.on('user:opted-in',function () {
            App.GiveAwayGamesCollectionView.refreshButtons();
        });
        $('#giveAwayGames-'+id).find('.giveAwayGamesInnerWrapper').empty();
        App.GiveAwayGamesCollectionView.render();
    });
});
var JackpotsWidgetModel = Backbone.Model.extend({
    defaults: {
        title         : 'title',
        imgsrc        : 'https://static.32red.com/img/basic-image/32red-white.svg',
        jackpotId     : 123,
        jackpot       : '',
        startAtValue  : '',
        jackpotIdentifier: '',
    },
    initialize: function(data) {
        var model = this;

        model.set({
            'title'                    : data.params.title,
            'imgsrc'          : data.params.imgsrc,
            'jackpotId'             : data.params.jackpotId,
            'startAtValue'             : data.params.jackpot,
            'centsPerSecond'           : data.params.centsPerSecond,
            'jackpotIdentifier'        : data.params.jackpotIdentifier
        });
        model.setValueInCurrency();
    },
    setValueInCurrency: function () {
        var model = this;
        var friendlyValue = model.get('startAtValue').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        model.set('friendlyValue', friendlyValue);
    }
});

var JackpotsWidgetCollection = Backbone.Collection.extend({
    model: JackpotsWidgetModel
});
var JackpotsWidgetChildView = Backbone.Marionette.ItemView.extend({
    template: "#jackpots-widget-single-item",
    tagName: "div",
    className: "single-jackpot-item",
    initialize: function(){
        var view = this;
        view.updateJackpot();
    },
    updateJackpot : function() {
        var view = this;
        setInterval(function () {
            var currentVal = parseFloat(view.model.get('startAtValue')),
                increase = 1,
                newValue = (currentVal+increase).toFixed(2);

            view.model.set('startAtValue',newValue);
            view.model.setValueInCurrency();
            view.$el.find('.jackpot-value').text(view.model.get('friendlyValue'));
        },1000);
    }
});
var JackpotsWidgetCollectionView = Backbone.Marionette.CollectionView.extend({
    childView: JackpotsWidgetChildView,
    initialize: function() {
        var view = this;
    },
    onRender: function() {
        var view = this;
        view.makeCarousel();
        view.$el.find('.slick-dots').removeAttr('style'); //remove the style:"display:block" so it can be overriden as usual by CSS       
    },
    makeCarousel: function() {
        var view = this;

        view.$el.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: true,
            variableWidth: true,
            mobileFirst: true
        });
    }
});
App.module("JackpotsWidgetModule", function(JackpotsWidgetModule, App, Backbone, Marionette, $){
    App.vent.on('show:showJackpotsWidget',function(data, id, displayLoader){
        if(displayLoader == "true"){
            App.vent.trigger('show:appended-preloader', $('#jackpot-widget-'+id));
        }
        JackpotsWidgetModule.getJackpotValues(data,id ); //This gets the Jackpot Values
    });
    JackpotsWidgetModule.renderAll = function(data,id,jackpots){
        var jackpotsWidgetCollection = new JackpotsWidgetCollection(),
            mainClass = $('#jackpot-widget-'+id);

        $.each(data, function(i, obj){
            if(obj.params === undefined || jackpots[obj.params.moduleId] === undefined) return;

            var moduleId = obj.params.moduleId;
            obj.params.jackpot = jackpots[moduleId]['startAtValue'];
            obj.params.centsPerSecond = jackpots[moduleId]['centsPerSecond'];
            jackpotsWidgetCollection.add(new JackpotsWidgetModel(obj));
        });

        App.JackpotsWidgetCollectionView = new JackpotsWidgetCollectionView({
            collection: jackpotsWidgetCollection,
            el : mainClass
        });
        mainClass.empty();
        App.JackpotsWidgetCollectionView.render();
    };
    JackpotsWidgetModule.getJackpotValues = function(data, id){
        var requestData = [];
        $.each(data, function(i, obj) {
            if(obj.params === undefined) return;
            var package = {moduleId: obj.params.moduleId, jackpotNumber: obj.params.jackpotNumber};
            requestData.push(package);
        });
        $.ajax({
            method: 'get',
            url: '/api/getWidgetJackpots',
            data: {requestData: requestData}
        }).done(function(ret){
            if(!ret.jackpots) {
                $('.toggle-jackpots-'+id).remove();
                return;
            }
            JackpotsWidgetModule.renderAll(data, id, ret.jackpots);
            $('#jackpot-widget-'+id).find('.preloader-wrapper').remove();
        });
    };


});
var ReasonsView = Backbone.Marionette.ItemView.extend({
    template: '#reasons-template',
    
    tagName: 'div',
    className: 'reasons-wrapper',

    events : {
        "click .close-btn" : "hideReasons",
        "click .slider-pagination li a" : "navigateToSlide",
        'click .next' : 'navLeft',
        'click .prev' : 'navRight',
        'click .show-registration' : 'displayRegistration'

    },
    initialize : function() {
        var view = this;

        var hammerElement = new Hammer( view.el);
        hammerElement.on("swipeleft", function(ev) {
            var swipeTarget = $(ev.target).closest('.slider-wrapper');
            view.onSwipeLeft(swipeTarget);
        });

        hammerElement.on("swiperight", function(ev) {
            var swipeTarget = $(ev.target).closest('.slider-wrapper');
            view.onSwipeRight(swipeTarget);
        });
    },

    onRender: function() {
        var view = this;
        view.initSlider();
    },
    
    displayRegistration : function(ev) {
        this.hideReasons();
    },

    showReasons: function() {
        var view = this,
            viewParent = view.$el.parent();
        viewParent.addClass('visible');
        viewParent.click(function(e) {
            if ($(e.target).is('#reasons *')) {
                //close the login when click on close button
                if($(e.target).closest('.close-btn')[0]) {
                    e.stopPropagation();
                    e.preventDefault();
                    view.hideReasons();
                }
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                view.hideReasons();
            }
        });

    },

    hideReasons : function() {
        var view = this,
            viewParent = view.$el.parent();
        viewParent.removeClass('visible');
    },

    initSlider : function() {
        var view = this,
            sliderWrapper = view.$el.find('.slider-wrapper'),
            slidesNo = sliderWrapper.children().length,
            paginationHolder = view.$el.find('.slider-pagination');

        view.generatePagination(slidesNo);

        sliderWrapper.css('width',100*slidesNo+'%');
        sliderWrapper.children().css('width',100/slidesNo+"%");

        sliderWrapper.attr('data-slide',0);
        paginationHolder.children(':eq(0)').addClass('active');
    },

    navigateToSlide : function(ev) {
        var view = this,
            target = $(ev.target),
            currentIdx = $(ev.target).closest('li').index(),
            sliderWrapper = view.$el.find('.slider-wrapper');

        ev.preventDefault();

        target.closest('li').addClass('active');
        target.closest('li').siblings().removeClass('active');

        sliderWrapper.attr('data-slide',currentIdx).css('left',-currentIdx*100+"%");
    },

    generatePagination : function(slidesNo) {
        var view = this,
            paginationHolder = view.$el.find('.slider-pagination');
        for ( i = 0; i < slidesNo; i++) {
            slideNo = i+1
            paginationHolder.append('<li><a href="#">'+slideNo+'</a></li>');
        }
    },

    navRight : function(ev) {
        var view = this,
            swipeTarget = $(ev.target).closest('.slider-wrapper');
        view.onSwipeRight(swipeTarget);

    },

    navLeft : function(ev) {
        var view = this,
            swipeTarget = $(ev.target).closest('.slider-wrapper');
        view.onSwipeLeft(swipeTarget);
    },

    onSwipeLeft : function(swipeTarget) {
        var view = this,
            currentPos = parseInt(swipeTarget.attr('data-slide')),
            nextPos = currentPos+ 1,
            paginationHolder = view.$el.find('.slider-pagination');
        if(currentPos === 4) {
            nextPos =4;
        }
        view.generalSwipe(swipeTarget, paginationHolder, nextPos);
    },

    onSwipeRight : function(swipeTarget) {
        var view = this,
            currentPos = parseInt(swipeTarget.attr('data-slide')),
            nextPos = currentPos- 1,
            paginationHolder = view.$el.find('.slider-pagination');
        if(currentPos === 0) {
            nextPos =0;
        }
        view.generalSwipe(swipeTarget, paginationHolder, nextPos);
    },

    generalSwipe: function(target, pagHolder, nextPos) {
        target.attr('data-slide',nextPos);
        target.css('left',-nextPos*100+"%");
        pagHolder.find('li').removeClass('active');
        pagHolder.find('li:eq('+nextPos+')').addClass('active');
    }
});


App.addInitializer(function(options) {
    App.addRegions({ reasonsRegion: '#reasons' });
});

App.module("ShowReasons", function(ShowReasons, App, Backbone, Marionette, $) {
    ShowReasons.addInitializer(function() {
        App.vent.on('show:reasons', function() {
            ShowReasons.reasonsView = new ReasonsView({});
            App.reasonsRegion.show(ShowReasons.reasonsView);
            ShowReasons.reasonsView.showReasons();
        });
    });
});
App.addInitializer(function(options) {

});

App.module("SportPromoSliderModule", function(SportPromoSliderModule, App, Backbone, Marionette, $) {
    SportPromoSliderModule.addInitializer(function() {
        var el  = $('#sports-banner');
        if($('.homepage-slideshow').length > 0) {
            if(Red && Red.Section == 'sport' && Red.DeviceType == 'desktop'){ // && el.length > 0)
                App.addRegions({ gamePlayerRegion: '.homepage-slideshow' });
                App.gamePlayerRegion.show(new SportsPromoSliderView());
            }
        }
    });
});
var SportsPromoSliderView = Backbone.Marionette.ItemView.extend({
    currentActiveSlide : 0,
    allSlides : 0,
    template: '#sportsbook-promo-slider-template',
 events : {
     'click .slider-pagination li a' : "clickNavigation",
     'click .slider-pagination li a.prev-slide' : "clickNavigationPrev",
     'click .slider-pagination li a.next-slide' : "clickNavigationNext"
 },
 initialize : function() {
  var view = this;
 },
    onRender : function () {

        var view = this;
        var slides = view.$el.find('.slide');
        view.allSlides = slides.length;
        var windoqWidth = $(document).width()
        var totalWidth = windoqWidth * slides.length;
        $('.slides').css('width',totalWidth);
        $.each(slides, function (index, slide) {
            var slide = $(slide);
            slide.css('background','url("' + slide.data('image-src') + '") no-repeat');
            slide.css('width',windoqWidth);
            var slidePos = (windoqWidth * index);
            slide.css('left',slidePos + 'px');

        });

        var pagination = view.$el.find('.slider-pagination li a[data-slide-id=0]');
        pagination = pagination[0];
        $(pagination).parent().addClass('active');

    },

    clickNavigation: function (ev) {
        var view = this;
        var link = $(ev.currentTarget);
        var targetSlide = link.data('slideId');
        var bannerWidth = $('#sports-banner').width();
        var offset = targetSlide * bannerWidth * -1;


        $('.slides').css('left',offset + 'px');

        var pagination = view.$el.find('.slider-pagination li');
        $.each(pagination,function(index, element){
            $(element).removeClass('active');
        });

        var paginationEl = view.$el.find('.slider-pagination li a[data-slide-id=' + targetSlide + ']');
        $.each(paginationEl,function(index, element){
            view.currentActiveSlide = targetSlide;
            $(element).parent().addClass('active');
        });

    },
    clickNavigationNext: function (ev) {
        ev.preventDefault();
        var view = this;
        var newTarget = view.currentActiveSlide + 1;
        if(view.allSlides <= newTarget){
            newTarget = 0;
        }
        var paginationEl = view.$el.find('.slider-pagination li a[data-slide-id=' + newTarget + ']');
        if(paginationEl.length > 0){
            paginationEl = paginationEl[0];
            $(paginationEl).trigger('click');
        }
    },
    clickNavigationPrev: function (ev) {
        ev.preventDefault();
        var view = this;
        var newTarget = view.currentActiveSlide - 1;

        if(newTarget < 0){
            newTarget = view.allSlides - 1;
        }

        var paginationEl = view.$el.find('.slider-pagination li a[data-slide-id=' + newTarget + ']');
        if(paginationEl.length > 0){
            paginationEl = paginationEl[0];
            $(paginationEl).trigger('click');
        }
    }
});



var SideGamesView = Backbone.Marionette.ItemView.extend({
    template: '#side-games-template',
    events: {
        'click .gamesSliderContainer' : 'gameSlider',
        'click .openSide': 'openCasinoGame',
        'click .ghostExpandButton': 'expandCasinoGame',
        'click .ghostCloseButton': 'closeCasinoGame',
    },
    
    initialize: function () {
        var view = this;
        view.menuExpanded= false;
        view.slideSizeValue= $('#side-games-container').height() - 140;
        view.numberOfItems = 0;
        view.scroller = 0;

        view.sideGamesContainer = $('#side-games-container');
    },

    onRender: function () {
        var view = this;
        App.vent.on('show:casinoSideGamesLoaded',function () {
            view.displayCarouselGames();
        });
    },

    displayCarouselGames : function() {
        var view = this;
        $.each(view.collection.models , function (index, item) {
            if(index>0){
                var imgContainer = $('<div class="gamesSquare"></div>');
            }
            else{
                var imgContainer = $('<div class="gamesSquare firstGame"></div>');
            }
            view.numberOfItems += 1;
            var img = $('<img>');
            var imgUrl = Red.CDNImages+'/game-icon/default/'+ item.attributes.img_name +'.'+item.attributes.img_type;
            var bgImgUrl = Red.CDNImages+'/game-bg-landscape/large'+ item.attributes.img_name +'.'+item.attributes.img_type;
            img.attr('src', imgUrl);
            img.attr('class','openSide');
            img.attr('data-game',item.attributes.id);
            img.attr('data-bg', bgImgUrl);
            imgContainer.append(img)
            imgContainer.attr('id', imgUrl);
            $('.sideGamesGames').append(imgContainer);
        });
    },

    gameSlider : function(ev){
        var view = this;
        var hello = ev;
        var heightCalculation;
        var endPositionDisplay;
        if(hello.currentTarget.classList[1]=="top"){
            $("#inlineDrawer").animate({scrollTop : document.getElementById("inlineDrawer").scrollTop- 90 + 'px'}, 50);
        }
        else{
            heightCalculation = view.numberOfItems*90;
            endPositionDisplay = view.slideSizeValue + view.scroller;
            $("#inlineDrawer").animate({scrollTop : document.getElementById("inlineDrawer").scrollTop + 90 +'px'}, 50);
        }
        
    },



    generateImage: function (id, name, extension, cdn, folder) {

  var fileName = App.request("getGameImage", id, name);

        if (extension) {
            fileName += (extension === true) ? '.jpg' : extension;
        }

        if (folder.length > 0) {
            fileName = cdn + folder  +  '/' + fileName;
        }
        return fileName;
    },

    openCasinoGame: function (ev) {
        var view = this;
        $('body').addClass('openMenu');
        if($(document).width()>=1200){
            $(".ghostExpandButton").css("display", "block"); 
        }

        if ($.cookie('Auth')) {
            var game = ev.currentTarget.getAttribute('data-game');
            var gameBg = $(ev.currentTarget).attr('data-bg');
            $('#side-games-container .gamePlayArea .enlargedGameContainer').css('background-image', 'url('+ gameBg+')');
            var url = '/game-launch/' + game,
                form = $("#launchSideCasinoForm");
            form.attr('action', url).submit();
            view.sideGamesContainer.attr('data-activeGame',"920");
        } 
    },

    expandCasinoGame: function(){
        var view=this;
        if (view.menuExpanded){
            $('.openMenu').removeClass('expandedCasinoView');
            $(".ghostExpandButton").html("Expand");
            view.menuExpanded=false;
        }
        else{
            $('.openMenu').addClass('expandedCasinoView');
            $(".ghostExpandButton").html("Collapse");
            view.menuExpanded=true;
        }
        
    },

    closeCasinoGame: function () {
        $('body').removeClass('openMenu');
        $('body').removeClass('expandedCasinoView');
        $('#gameSideCasinoFrame').remove();
        $('#side-games-container .game').append('<iframe id="gameSideCasinoFrame" name="gameSideCasinoFrame" src="about:blank" frameborder="0" scrolling="no"></iframe>');
    }
});
App.addInitializer(function(options) {

});

App.module("SideGamesModule", function(SideGamesModule, App, Backbone, Marionette, $) {
    SideGamesModule.addInitializer(function() {
        var sideGamesContainer = $('#side-games-container');


        App.vent.on('display:casinosidegames', function(categoryId, showAll){
            var url = '/gamesApi/games/' + encodeURIComponent(categoryId)+'/nid/false';

            var callGames = $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                data: {}
            }).done(function(data) {
                if(!$.cookie('Auth')){
                    sideGamesContainer.hide();
                    return;
                }else{
                    sideGamesContainer.show();
                }
                //TODO - change the categoryGames
                SideGamesModule.gameCategoriesCollection = new SideGamesModelCollection(data['games']['category_games']);
                if(Red.Section == 'sport' && sideGamesContainer.length > 0 && $('body.sportsbook-frame.sportsbook-loggedin').length > 0){
                    var view = new SideGamesView({
                        el : sideGamesContainer,
                        collection: SideGamesModule.gameCategoriesCollection
                    });
                    view.render()
                }
                
                App.vent.trigger('show:casinoSideGamesLoaded');
            }).fail(function() {
            });
        });
    });
});
var SideGameModel = Backbone.Model.extend({
 defaults: {

 }
});

var SideGamesModelCollection = Backbone.Collection.extend({
    model: SideGameModel
});
// *******************
// THIS SHOULD BE DEPRECATED
// *******************
var LaunchBankingDesktop = Backbone.Marionette.ItemView.extend({
 template: '#launch-Banking',

 tagName: 'div',
 templateHelpers: function() {
        return {
           getLoginName: function() {
                return App.LoginModule.loginModel.get('username');
            },
            getPassword: function() {
                return App.LoginModule.loginModel.get('password');
            },
        };
    },

 onRender: function() {
        /**
         * Commented due to popup blocking issues
         */

        /*var view = this;
        var newWindow = window.open("/launch/banking/","32RedBanking","width=980,height=650,scrollbars=yes,location=no,menubar=no,directories=no,resizable=no,status=no,toolbar=no", "");
        if(!newWindow){

            var content = 'It seems your browser blocked the window. Please follow ';
            content += '<a href="/launch/banking/" target="_blank">this</a> link to open it in new tab. <br > or allow ';
            content += 'the window to open';

            var options = {
                showCloseButton : true,
                closeClickOutside : true,
                maxWidth : 400,
                maxHeight: 200,
                content : content,
                noScroll : true,
                confirmClose : false,
                fullScreenButton : false
            };

            new ResponsivePopoverView({
                options: options
            }).render();
        }*/
    }

});

App.addInitializer(function(options) {
});

// *******************
// THIS SHOULD BE DEPRECATED
// *******************

App.module("LaunchBankingModule", function(LaunchBankingModule, App, Backbone, Marionette, $) {
    LaunchBankingModule.addInitializer(function() {

        if ($('#launch-banking').length == 0) {
            $('<div id="launch-banking" style="display:none"></div>').appendTo($('body'));
            //App.addRegions({ LaunchBankingRegion: '#launch-banking' });
        }

        // LaunchBankingModule.LaunchBankingModel = new LoginModel();

        LaunchBankingModule.listenToOnce(App.vent,'launch:game-banking',function(category,showAll){
            LaunchBankingFormService(false,"Close");
        });

        if(App.Translations && App.Translations.loadTranslation) {
            App.Translations.loadTranslation('my-account', function(translations) {
            });
        }

        App.vent.on('launch:accountTransactions', function(category, showAll) {
            LaunchBankingModule.launchTransactionHistory();
        });

        App.vent.on('launch:playcheck', function(category, showAll, element) {
            $.ajax({
                    type: "GET",
                    url: '/api/getLaunchToken',
                    async: true,
                    dataType: "json"
                }).done( function(data){
                var token = data['token'];
                if(App.Translations && App.Translations.loadTranslation) {
                    App.Translations.loadTranslation('my-account', function(translations) {
                        var content = "<div id='playcheck-container'><h1 class='popover-header'>"+translations['playcheck']+"</h1><iframe width='100%' height='100%' scrolling='auto' name='32RedPaycheck' /></div>";

                        if(!element) {
                            App.vent.trigger('show:popover', {
                                content: content,
                                maxWidth: 900,
                                maxHeight: 686,
                                extraClass: "playcheck",
                                showCloseButton: true,
                                mobileFullScreen: true,
                                closeClickOutside: false,
                                noScroll: true,
                                closeCallback: function () {
                                    //we want to navigate back on close
                                    App.appRouter.navigate("/", {trigger: true});
                                },
                            });
                        }
                        if (LaunchBankingModule.launchPlaycheckView) LaunchBankingModule.launchPlaycheckView.destroy();
                        LaunchBankingModule.launchPlaycheckView = new LaunchPlaycheck({token:token}).render();

                    });
                }
            });
        });
    });

    LaunchBankingModule.showPopover = function() {
        App.vent.trigger('show:popover',{
            content : "<div id='banking-container'></div>",
            maxWidth : 1024,
            maxHeight : 686,
            extraClass : "deposit-popover",
            showCloseButton : true,
            mobileFullScreen : true,
            closeClickOutside : false,
            noScroll: true,
            closeCallback: function() {
                App.vent.trigger('close:bankingwindow');
            },
        });
    }

    LaunchBankingModule.launchTransactionHistory = _.throttle(function() {
    }, 150);
});

function closeBanking() {
    $('.responsive-popover-wrapper.deposit-popover').remove();
    $('html').removeClass('no-scroll');
    $('html').removeClass('extra-scroll');
    App.vent.trigger('close:bankingwindow');
}



function closeGameplayerBanking() {
    $('.responsive-popover-wrapper.play-area').removeClass('slide-left');
    $('#banking-container').removeClass('opened');
    App.vent.trigger('close:bankingwindow');
}

window.LaunchBankingFormService = function(forMobile,buttonText) {
    var callbackBag = [];
    callbackBag.push({
        event: 'getFormCallback',
        callBack: function (result) {
            if (true || $('#chkgetFormCallback').attr('checked') == 'checked') {
            }
            $('#banking-container[data-form="PurchaseMethods"] article > section .button').html('Close Banking');
        }
    });
    callbackBag.push({
        event: 'backToGamesCallback',
        callBack: function () {
            if(forMobile) {
                closeBanking();
            } else {
                closeGameplayerBanking();
            }
        }
      }
    );
    callbackBag.push({
        event: 'formRenderedCallback',
        callBack: function() {
            $('span.button[value=games]').text('Close');
        }
    });

    if($.cookie('User')) {
        Red.LoggedInCasinoId = JSON.parse($.cookie('User'))['LoggedinCasinoId'];
    }
    localeCode = Red.Locale;
    languageCode = localeCode.split('-');
    if (languageCode[0]) {
        languageCode = languageCode[0];
    } else {
        languageCode = 'EN';
    }
}

//the template is in launch-banking.ctp
var LaunchTransactionHistory = Backbone.Marionette.ItemView.extend({
 template: '#transaction-history',

 tagName: 'div',
 templateHelpers: function() {
        return {
           getLoginName: function() {
                return App.LoginModule.loginModel.get('username');
            },
        };
    },

 onRender: function() {
  var view = this;
        view.$el.find('form').submit();
        if(!$('body').find('transactionHistoryForm')[0]) {
            $(view.$el.find('form').addClass('transactionHistoryForm')).appendTo('body');
            $('.transactionHistoryForm').submit();
        }
    }
});

//the template is in launch-banking.ctp
var LaunchPlaycheck = Backbone.Marionette.ItemView.extend({
 template: '#playcheck',

 tagName: 'div',
    initialize: function (options) {
        this.token = options.token;
    },
 templateHelpers: function() {
        var view = this;
        return {
           getLoginName: function() {
                return App.LoginModule.loginModel.get('username');
            },
            getLaunchToken: function() {
                return view.token
            }
        };
    },

 onRender: function() {
  var view = this;
        if(!$('body').find('playcheckForm')[0]) {
            $(view.$el.find('form').addClass('playcheckForm')).appendTo('body');
            $('.playcheckForm').submit();
        }
    }
});

App.module("LeaderboardModule", function (LeaderboardModule, App, Backbone, Marionette, $) {
    LeaderboardModule.addInitializer(function (module_options) {
        App.vent.on('show:leaderboard', function (options) {
            $(document).on('reload:ajax', function () {
                LeaderboardModule.init(options);
            });

            if (options.collapsed === true) {
                LeaderboardModule.setupCollapsed(options);
            } else {
                LeaderboardModule.init(options);
            }
        });
    });

    LeaderboardModule.init = function (options) {
        var url = null;
        if (options.url)
            url = '/feeds/leaderboardFeed/' + encodeURIComponent(options.url);
        else if (options.race)
            url = '/feeds/raceFeed?raceId=' + encodeURIComponent(options.race) + '&t=' + moment.utc().valueOf();

        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            data: {}
        }).done(function (data) {
            LeaderboardModule.display(data, options);
        }).fail(function () {
            $('#' + options.uniqID).html('<div class="error">Failed to load leaderboard!</div> ');
        });
    };

    LeaderboardModule.setupCollapsed = function (options) {
        var el = $('#' + options.uniqID);
        var header = el.find('.header');
        header.click(function(){
            el.find('.loading').removeClass('hidden');
            header.addClass('hidden');
            el.removeClass('collapsed');
            LeaderboardModule.init(options);
        });
    };

    LeaderboardModule.display = function (data, options) {
        var leaderboardPlayers = [],
            // default displayed fields
            keysList = ['Player', 'Postion', 'Position', 'Class'],
            fields = [
                {caption: 'Position', key: ['Posn', 'Position']},
                {caption: 'Name', key: ['Name', 'Alias']},
                {caption: 'Prize', key: ['PrizeAmount', 'Prize', 'PrizeAmt']},
                {caption: 'Points', key: ['Points']}
            ],
            displayedData;

        if (!(data['feedData'] != null)) {
            $('#' + options.uniqID).html('<div class="error" style="background: #fff;">This leaderboard is currently empty.</div> ');
            return;
        }

        displayedData = _.flatten(_.map(data['feedData'], _.values));
        if (displayedData.length === 0) {
            $('#' + options.uniqID).html('<div class="error">This leaderboard is currently empty.</div> ');
            return;
        }

        // check if we have custom fields, and display those fields instead of defaults
        if (options.customFields.length > 0) {
            var customFields = options.customFields.split(','),
                newfields = [];

            _.each(customFields, function (customField) {
                if (customField.split(':')[1]) {
                    var caption = customField.split(':')[1],
                        key = customField.split(':')[0];
                    newfields.push({
                        "caption": caption,
                        "key": [key],
                        "overwriteCaption": false,
                    });
                } else {
                    newfields.push({
                        "caption": customField,
                        "key": [customField],
                        "overwriteCaption": true,
                    });
                }

            });

            _.each(newfields, function (newfield) {
                _.each(fields, function (field) {
                    _.each(field.key, function (key) {
                        if ((newfield.key[0] === key) && (newfield.overwriteCaption)) {
                            newfield.caption = field.caption;
                        }
                    });
                });
            });
            fields = newfields;
        }

        var currentUserPosition = 0;
        _.each(displayedData, function (playerData) {
            BooLCurrentUser = false;
            playerFields = {};
            playerPosition = null;
            _.each(fields, function (field) {
                _.each(field.key, function (key) {
                    //if column is postion and grand national leaderboard set the playerPosition
                    if(key === 'Position' && ($('.grand-national').length || $('#grand-national').length )) {
                        playerPosition = playerData.Position;
                    }
                    if (playerData.hasOwnProperty(key)) {
                        playerFields[field.caption] = playerData[key];
                    }
                    if (playerData['isQualified']) {
                        isQualified = playerData['isQualified'];
                    } else {
                        isQualified = 0;
                    }


                });


            });
            if (playerData['playerid'] === "true") {
                BooLCurrentUser = true;
                currentUserPosition = playerData['Position'];

            }
            leaderboardPlayers.push({
                fields: playerFields,
                isQualified: isQualified,
                playerPosition: playerPosition,
                currentUser: BooLCurrentUser,
            });

        });
        if (options.show > 0) {
            leaderboardPlayers = leaderboardPlayers.slice(0, options.show);
        }

        LeaderboardModule.leaderboardCollection = new LeaderboardCollection(leaderboardPlayers);
        LeaderboardModule.leaderboardCompositeView = new LeaderboardCompositeView({
            el: $('#' + options.uniqID + ' .table-wrapper'),
            collection: LeaderboardModule.leaderboardCollection,
            fields: fields,
            currentUserPosition: currentUserPosition
        }).render();
    };

});
var LeaderboardItemView = Backbone.Marionette.ItemView.extend({
 template: '#leaderboard-item-template',
 tagName: 'tr',

 className: function(){
  var view = this;
  var leaderBoardClass = 'leaderboard-line';

  //if grand national leaderboard
  if(typeof view.model.get('playerPosition') !== 'undefined' && view.model.get('playerPosition')) {
   var playerPosition = view.model.get('playerPosition');
   //only use 30 shirt numbers
   if(view.model.get('playerPosition') > 29 ) playerPosition = (playerPosition % 30) +1;   
   //add class to set alternate bg colours for rows
   if(playerPosition % 2 == 0 ) playerPosition += ' even';
   //add class for shirt
   leaderBoardClass = "leaderboard-line shirt-"+ playerPosition;
  }

        if (view.model.get('isQualified') == "1") {
         return leaderBoardClass + " qualified"
  } else {   
   if (view.model.get('currentUser') == true) {
    return leaderBoardClass + " currentUser"
   } else {
    return leaderBoardClass;
   }
        }

    },

 onRender: function() {

 },
});

var LeaderboardCompositeView = Backbone.Marionette.CompositeView.extend({
 childView : LeaderboardItemView,
 childViewContainer: "tbody",
 template : "#leaderboard-wrapper-template",
 tagName: 'table',
 className: 'leaderboard-inner',
 events : {
  'click .view-leaderboard' : 'showLeaderboard',
  'click .hide-leaderboard' : 'hideLeaderboard',
  'click .goToPosition'   : 'goToPosition'
 },

    templateHelpers: function() {
        var view = this;
        return {
            'displayPosition': function() {
                return view.options.currentUserPosition != 0;
            },
        }
    },

 onRender: function() {
  var view = this;
  view.scrollToCurrent();

  view.$el.find('.leaderboard-table-wrapper').on('scroll',function(){
   view.stickTableHeader();
  })
 },

 goToPosition:function(ev){
  ev.preventDefault();
  var view = this;
  if (window.screen.width < 601){
   view.$el.addClass('full-screen');
  }
  view.scrollToCurrent();
 },

 scrollToCurrent: function() {
  var view = this,
   s = view.$el.find(".currentUser").position();
  if (s != undefined) {
   view.$el.find('.leaderboard-table-wrapper').animate({scrollTop: s.top-200});
  }
 },

 showLeaderboard : function(ev) {
  var view = this,
   target = $(ev.target);
  ev.preventDefault();

  view.$el.addClass('full-screen');
 },

 hideLeaderboard : function(ev)  {
  var view = this,
   target = $(ev.target);
  ev.preventDefault();

  view.$el.removeClass('full-screen');
 },

 serializeData: function(){

      return {
          fields: this.options.fields,
    currentUser: this.options.currentUser,
    currentUserPosition: this.options.currentUserPosition,
      }
    },

    stickTableHeader: function(){
     var view = this,
      el = view.$el.find('.leaderboard-table-wrapper'),
      isMobile = el.hasClass('full-screen'),
      table = el.find('table'),
      scrollClass = (isMobile) ? 'scrollFixed' : 'scroll';
          pos = (isMobile && el.scrollTop() != 0) ? 1 : el.scrollTop();
      
      table.find('th,td').each(function(){
         $(this).attr('data-width', $(this).width());
      });
      if(isMobile) {
       $('.leaderboard-head').addClass('leaderboard-head-fixed');
       $('.hide-leaderboard').addClass('hide-leaderboard-fixed');
      }
        if (pos != 0) {
            table.find("thead tr").css("top", pos).addClass(scrollClass);
            this.resetWidthOfTableElements(table);
        } else {
            table.find("thead tr").removeClass(scrollClass);
            table.find('th,td').each(function(){
                $(this).removeAttr('style');
            });
            $('.leaderboard-head').removeClass('leaderboard-head-fixed');
       $('.hide-leaderboard').removeClass('hide-leaderboard-fixed');
        }
    },

    resetWidthOfTableElements: function(){
     var table = $(this.$el[0]).find('table');
     table.find('th,td').each(function(){
            var width = $(this).attr('data-width');
            $(this).width(width);
        });
    }
});

var LeaderboardModel = Backbone.Model.extend({
});

var LeaderboardCollection = Backbone.Collection.extend({
    model: LeaderboardModel
});
App.module("RacesModule", function (RacesModule, App, Backbone, Marionette, $) {
    RacesModule.addInitializer(function (options) {
        RacesModule.loadOptions();
        $(document).on('reload:ajax', function () {
            RacesModule.loadOptions()
        });
    });

    RacesModule.loadOptions = function () {
        var options = window.RacesWidgetOptions;
        if(!(options === null || options === undefined))
            RacesModule.init(options);
    };

    RacesModule.init = function (options) {
        var url = '/api/getTodayRaces';

        $.ajax({
            type: "GET",
            url: url,
            async: true,
            dataType: "json"
        }).done(function (data) {
            RacesModule.raceCollection = new RaceCollection(data.races);
            RacesModule.racesView = new RacesView({
                el: $('#' + options.uniqueID),
                collection: RacesModule.raceCollection
            }).render();
        });
    };
});

var RaceItemView = Backbone.Marionette.ItemView.extend({
    template: '#race-item-template',
    tagName: 'div',
    className: 'race',
    events: {
        'click .race_header': 'toggleExpand'
    },

    initialize: function () {
        var view = this;
        var model = view.model;

        var start = moment.utc(model.get('start')).local();
        model.set('start_time', start.format('HH:mm'));

        var index = model.get('index');
        var summary = this.getFromTemplate('summary', index, 'Summary of the race');
        var description = this.getFromTemplate('description', index, 'Description of the race');
        var picture = this.getFromTemplate('picture', index, '');

        model.set('summary', summary);
        model.set('description', description);
        model.set('picture', picture);

        /**
         * Keep the button up to date
         */
        App.vent.on('get:sessionInfo', function(data) {
            view.updateCTA()
        });
    },

    getFromTemplate: function (type, index, def) {
        var sel = $('#races_view_' + type + '_template_' + index);
        if (!(sel.length)) {
            return def;
        }

        return sel.html();
    },

    onRender: function () {
        var view = this;
        var model = view.model;
        var overlay = new RaceOverlayView({
            el: view.$el.find('.race_overlay'),
            model: model
        }).render();

        this.updateWarning();
        this.updateCTA();
    },

    updateWarning: function () {
        var view = this;
        var model = view.model;

        var now = moment.utc();
        var start = moment.utc(model.get('start'));
        var optin = moment.utc(model.get('start')).subtract(1, 'hours');
        var ongoing = moment.utc(model.get('start')).add(30, 'minutes');
        var end = moment.utc(model.get('end'));

        if (now > end) {
            view.$el.find('.race_summary_warning').text('Finished');
            return;
        }

        if (now > ongoing || (now > start && model.get('opted_in') === true)) {
            view.$el.find('.race_summary_warning').text('Ongoing');
            return;
        }

        if (now > optin) {
            if(model.get('opted_in') === true)
                view.$el.find('.race_summary_warning').text('Get Ready');
            else
                view.$el.find('.race_summary_warning').text('Opt in');
            return;
        }

        view.$el.find('.race_summary_warning').text('Soon');
    },

    toggleExpand: function () {
        var view = this;
        view.$el.find('.race_body').toggleClass('visible');
        view.$el.find('.race_expand').toggleClass('open');
    },

    /**
     * Check if it's the right time window to opt in
     * @returns {boolean}
     */
    canOptIn: function () {
        var view = this;
        var model = view.model;

        var now = moment.utc();
        var optin = moment.utc(model.get('start')).subtract(1, 'hours');
        var ongoing = moment.utc(model.get('start')).add(30, 'minutes');
        return now > optin && now < ongoing;
    },

    /**
     * Check if it's the right time window to play
     * @returns {boolean}
     */
    canPlay: function () {
        var view = this;
        var model = view.model;

        var now = moment.utc();
        var start = moment.utc(model.get('start'));
        var end = moment.utc(model.get('end'));
        return now > start && now < end;
    },

    /**
     * update the cta button to make sure it show the right play/optin or it's hidden if neither is available
     */
    updateCTA: function () {
        var view = this;
        var model = view.model;

        var now = moment.utc();
        var start = moment.utc(model.get('start'));

        var cta = view.$el.find('.race_cta');

        var isLoggedIn = App.LoginModule.loginModel.get('state') === 'Authentication Success';
        
        var optedIn = view.model.get('opted_in');
        if (optedIn && this.canPlay()) {
            cta.text('Choose Game');
            cta.off('click').click(function () {
                window.location.href = '/';
            });
            view.$el.find('.race_expand').addClass('open');
            view.$el.find('.race_body').addClass('visible');
        } else if (optedIn && !this.canPlay()) {
            cta.text('Opted in');
            cta.addClass('disabled');
        } else if(this.canOptIn() && !isLoggedIn){
            cta.text('Login');
            cta.addClass('login-btn');
            cta.off('click').click(function(event) {
                App.vent.trigger('LoginRequested');
            });
        }else if (!optedIn && this.canOptIn()) {
            view.$el.find('.race_expand').addClass('open');
            view.$el.find('.race_body').addClass('visible');
            cta.text('Opt In');
            cta.off('click').click(function () {
                view.optIn();
            });
        }else if(now < start){
            var optin = moment.utc(model.get('start')).subtract(1, 'hours');
            cta.text('Opt in at ' + optin.local().format('HH:mm'));
            cta.addClass('disabled');
        }else{
            cta.hide();
        }
    },

    optIn: function () {
        var view = this;
        $.ajax({
            type: "GET",
            url: '/api/optInRace?raceAlias=' + view.model.get('race_alias'),
            async: true,
            dataType: "json"
        }).done(function (data) {
            if (data.ok === true){
                view.model.set('opted_in', true);
            }else{
                view.showMessage(data.message);
            }
            view.updateCTA();
            view.updateWarning();
        }).fail(function (data) {
            // console.log(data);
        });
    },

    showMessage:function(message){
        var messageView = $(".race_optin_message");
        messageView.addClass('visible');
        messageView.text(message);
    }
});

var RacesView = Backbone.Marionette.CompositeView.extend({
    template: '#races-template',
    tagName: 'div',
    childView: RaceItemView,
    childViewContainer: ".races_inner",

    initialize: function () {
        var view = this;
        if (!view.collection)
            return;

        _.map(view.collection.models, function (r, i) {
            r.set('index', i + 1);
            return r;
        });
    },
});

var CurrencyView = Backbone.Marionette.CompositeView.extend({
    tagName: 'span',

    initialize: function () {
        this.currency = this.options.currency;
        this.value = this.options.value;
    },

    render: function () {
        var currency = Currencies[this.currency];

        if (currency === null || currency === undefined)
            currency = Currencies['GBP'];

        var value = Number.parseFloat(this.value);
        value = value * currency.multiplier;

        if (value % 1 !== 0)
            value = value.toPrecision(2);
        if (this.options.showSymbol === false)
            this.$el.text(value);
        else
            this.$el.text(currency.symbol + value);
    }
});


var RaceModel = Backbone.Model.extend({
    defaults: {
        optin_message: ''
    }
});

var RaceCollection = Backbone.Collection.extend({
    model: RaceModel
});

var RaceOverlayView = Backbone.Marionette.CompositeView.extend({
    template: '#race-overlay-template',

    initialize: function () {
        var view = this;
        var model = view.model;

        /**
         * This list decides what attributes are shown in the overlay,
         * Each of this needs to have a respective div in the races.ctp with classes .race_attr.race_ATTRIBUTE
         * the attribute then needs to be in the model at onRender time, you can add it in here like I do with the  duration and prize
         */
        this.attributes = ['max_bets', 'duration', 'prize', 'min_bet'];

        var start_time = moment.utc(model.get('start')) / 1000;
        var end_time = moment.utc(model.get('end')) / 1000;
        var duration_m = Math.floor((end_time - start_time) / 60);

        view.model.set('duration', duration_m);


        var userData = view.model.get('userData');
        if (userData) {
            view.model.set('position', userData.position);
            view.model.set('spins_left', view.model.get('max_bets') - userData.spins);
            // if we have the userData for this race(which means the user is opted in an participating)
            // and the options of the widget is ongoing == true we change the displayed attributes
            if (this.options.ongoing === true) {
                this.attributes = ['position', 'spins_left', 'duration', 'min_bet'];
            }
        } else {
            view.model.set('position', 0);
            view.model.set('spins_left', 0);
        }

        this.countDownViewId = 'race_' + model.get('race_id') + '_countdown' + Math.random();

        this.timerView = null;

    },

    onRender: function () {
        var view = this;
        this.updateTime();

        _.each(this.attributes, function (attr) {
            view.$el.find('.race_attr.race_' + attr).addClass('visible');
        });

        this.minBetView = new CurrencyView({
            el: this.$el.find('.race_min_bet .value'),
            currency: Red.Currency,
            value: this.model.get('min_bet'),
        }).render();

        var prizes = this.model.get('prizes').split(',');
        // TODO races support other type of prize
        this.prizeView = new CurrencyView({
            el: this.$el.find('.race_prize .value'),
            currency: Red.Currency,
            value: prizes[0],
        }).render();
    },

    /**
     * We use this function to control what to show in the countdown.
     * The actual countdown is done with it's own widget, once that is done this function is called again if we chage
     * from "being in" to "time left"
     */
    updateTime: function () {
        var view = this;
        var model = this.model;

        var now = moment.utc();
        var start_time = moment.utc(model.get('start'));
        var end_time = moment.utc(model.get('end'));

        var time_calc = start_time;
        var time_text = 'Begins in:';

        if (now > start_time && now < end_time) {
            time_calc = end_time;
            time_text = 'Time left:';
        } else if (now > end_time) {
            view.endTime();
            return;
        }

        view.$el.find('.countdown-text').text(time_text);

        this.timerView = new CountDownTimerView({
            endTime: time_calc,
            el: view.$el.find('.countdown-time'),
            view: this.countDownViewId,
            callback: function () {
                // this is weird but it makes sure that we haven't hit the end time
                if (moment.utc() + 1000 < end_time)
                    view.updateTime();
                else
                    view.endTime();
            }
        }).render();
    },

    endTime: function () {
        var view = this;
        var model = this.model;
        view.$el.find('.countdown-text').text('Finished');
        view.$el.find('.countdown-time').hide();
    }
});


/**
 * This is used to display on mobile ONLY(for now) while a race is ongoing below the categories bar
 */
var OngoingRaceView = Backbone.Marionette.CompositeView.extend({
    template: '#race-ongoing-template',

    initialize: function () {
        var view = this;
        var model = view.model;

        var data = model.get('userData');

        model.set('spins_left', this.model.get('max_bets') - data.spins);
        model.set('points', data.points);
        model.set('position', data.position);

        var prizes = model.get('prizes').split(',');
        // TODO parse prize types
        var prize = 0;
        if (data.position <= prizes.length)
            prize = prizes[data.position - 1];

        model.set('prize', prize);
    },

    onRender: function () {
        var view = this;
        var model = view.model;

        this.countdown = new CountDownTimerView({
            el: this.$el.find('.race_countdown'),
            endTime: model.get('end'),
            callback: function () {
                view.$el.hide();
            }
        });

        // TODO races support other type of prize
        this.prizeView = new CurrencyView({
            el: this.$el.find('.race_prize .value'),
            currency: Red.Currency,
            value: model.get('prize')
        }).render();

    }
});


App.module("RacesLeaderboardModule", function (RacesLeaderboardModule, App, Backbone, Marionette, $) {
    RacesLeaderboardModule.addInitializer(function (module_options) {
        App.vent.on('show:race-leaderboard', function (options) {
            RacesLeaderboardModule.init(options);

            $(document).on('reload:ajax', function () {
                RacesLeaderboardModule.init(options);
            });
        });
    });

    RacesLeaderboardModule.init = function (options) {
        $('.InGameBanner-inner .content').addClass('large');

        RacesLeaderboardModule.updateTimer = null;
        RacesLeaderboardModule.view = null;
        RacesLeaderboardModule.update(options);
    };

    RacesLeaderboardModule.update = function (options) {
        RacesLeaderboardModule.getData(options.race.id, function (data) {
            if (RacesLeaderboardModule.view === null) {
                RacesLeaderboardModule.view = new RaceLeaderboardView({
                    el: $('#' + options.boardId + ' .race_leaderboard'),
                    collection: new RaceLeaderboardCollection()
                }).render();
            }

            var players = data.feedData.player;
            RacesLeaderboardModule.view.collection.set(players);
            var moreUpdate = RacesLeaderboardModule.view.update();

            if (moreUpdate) {
                RacesLeaderboardModule.scheduleUpdate(options);
            }
        }, function () {
            $('#' + options.boardId + ' .race_leaderboard').empty();
            RacesLeaderboardModule.view = null;
        });
    };

    RacesLeaderboardModule.scheduleUpdate = function (options) {
        if (RacesLeaderboardModule.updateTimer !== null) {
            clearTimeout(RacesLeaderboardModule.updateTimer);
        }
        RacesLeaderboardModule.updateTimer = setTimeout(function () {
            RacesLeaderboardModule.update(options);
        }, 30000);
    };

    RacesLeaderboardModule.getData = function (raceId, callback, fail) {
        var url = '/feeds/raceFeed?raceId=' + raceId + '&t=' + moment.utc().valueOf();
        $.ajax({
            type: "GET",
            url: url,
            async: true,
            dataType: "json"
        }).done(function (data) {
            callback(data)
        }).fail(function (data) {
            fail(data);
        });
        // callback();
    };
});

var RaceLeaderboardModel = Backbone.Model.extend({
});

var RaceLeaderboardCollection = Backbone.Collection.extend({
    model: RaceLeaderboardModel
});

var RaceLeaderboardItemView = Backbone.Marionette.LayoutView.extend({
    template: '#race-leaderboard-item-template',
    tagName: 'tr',
    className: function () {
        return this.model.get('playerid') === "true" ? 'player' : '';
    },
    onRender:function(){
        // TODO races support other type of prize
       new CurrencyView({
           el:this.$el.find('.race_lb_prize'),
           value:this.model.get('Prize'),
           currency:Red.Currency
       }).render();
    }
});

var RaceLeaderboardView = Backbone.Marionette.CompositeView.extend({
    template: '#race-leaderboard-template',
    childView: RaceLeaderboardItemView,
    childViewContainer: "tbody",
    events: {
        'click .race_scroll': 'scrollToPlayer'
    },

    update: function () {
        // var now = moment.utc();
        // this.end = moment.utc(model.get('end'));

        return true;
    },

    scrollToPosition: function (position) {
        var player = this.$el.find('tr:nth-child(' + position + ')');
        if (player.length) {
            this.$el.find('.race_table_wrapper').animate({scrollTop: player[0].offsetTop});
        }
    },

    scrollToPlayer: function () {
        var player = this.$el.find('.player');
        if (player.length) {
            this.$el.find('.race_table_wrapper').animate({scrollTop: player[0].offsetTop });
        }
    },
});

var RaceStatusView = Backbone.Marionette.CompositeView.extend({
        template: '#race-status-template',

        initialize: function () {
            this.countdown = null;
            this.savedModel = null;
            this.fadeTimer = null;
        },

        onRender: function () {
            // TODO races support other type of prize
            this.currentPrizeView = new CurrencyView({
                el: this.$el.find('.race_current_prize'),
                currency: Red.Currency,
                value: 0
            });

            // TODO races support other type of prize
            this.topPrizeView = new CurrencyView({
                el: this.$el.find('.race_prize .race_top_prize'),
                currency: Red.Currency,
                value: 0
            });

            this.minBetView = new CurrencyView({
                el: this.$el.find('.race_prize .race_min_bet'),
                currency: Red.Currency,
                value: 0
            });
        },

        update: function () {
            var model = this.model;

            this.start = moment.utc(model.get('start'));
            this.end = moment.utc(model.get('end'));

            var data = this.model.get('userData');

            this.$el.find('.race_spins').text(this.model.get('max_bets') - data.spins);
            this.$el.find('.race_points').text(data.points);
            this.$el.find('.race_position').text(data.position);

            var prizes = model.get('prizes').split(',');
            var prize = 0;
            if (data.position <= prizes.length)
                prize = prizes[data.position - 1];

            // TODO races support other type of prize

            // this.$el.find('.race_prize span').text(prizes[0]);
            // this.$el.find('.race_current_prize').text(prize);

            this.currentPrizeView.value = prize;
            this.currentPrizeView.render();

            this.topPrizeView.value = prizes[0];
            this.topPrizeView.render();

            this.minBetView.value = this.model.get('min_bet');
            this.minBetView.render();

            // this needs to be after the render
            if (this.countdown === null)
                this.startCountdown();

            if (this.savedModel !== null)
                this.showNotification(data, this.savedModel);

            this.savedModel = data;

            // if the race is not finished return true
            return moment.utc() < this.end;
        },

        showNotification: function (data, old_data) {
            if (data.big_win_streaks > old_data.big_win_streaks) {
                this.setLogIcon('big_win_streak');
            } else if (data.mega_wins > old_data.mega_wins) {
                this.setLogIcon('mega_win');
            } else if (data.big_wins > old_data.big_wins) {
                this.setLogIcon('big_win');
            } else if (data.win_streaks > old_data.win_streaks) {
                this.setLogIcon('win_streak');
            } else if (data.wins > old_data.wins) {
                this.setLogIcon('win');
            } else if (data.spins > old_data.spins) {
                // if no win do nothing
                // this.setLogIcon('no_win');
            }
        },

        setLogIcon: function (type) {
            var url = 'https://static.32red.com/img/races/' + type + '.svg';
            var img = this.$el.find('.race_log img');
            img.show();
            img.attr('src', url);

            // animate by adding class
            img.addClass('animated');
            setTimeout(function () {
                img.removeClass('animated');
            }, 400);

            // clear previous fade timer
            if (this.fadeTimer != null)
                clearTimeout(this.fadeTimer);

            // after showing it for 2 seconds, fade it out
            this.fadeTimer = setTimeout(function () {
                img.fadeOut(400,'swing',function(){img.hide()});
            },2400)
        },

        startCountdown: function () {
            console.log('start countdown');
            this.countdown = new CountDownTimerView({
                el: this.$el.find('.race_countdown'),
                endTime: this.end
            });
        }
        ,
    })
;

App.module("RaceStatusModule", function (RaceStatusModule, App, Backbone, Marionette, $) {
    RaceStatusModule.addInitializer(function (module_options) {
        App.vent.on('show:race-leaderboard', function (options) {
            RaceStatusModule.init(options);

            $(document).on('reload-ajax', function () {
                RaceStatusModule.init(options);
            });
        });
    });
    RaceStatusModule.init=function(options){
        App.vent.trigger('in-game-banner:pause', {state: true});

        // init and trigger the first update
        RaceStatusModule.view = null;
        RaceStatusModule.updateTimer = null;
        RaceStatusModule.update(options);
    };

    RaceStatusModule.update = function (options) {
        RaceStatusModule.getData(options.race.id, function (data) {
            if (RaceStatusModule.view === null) {
                RaceStatusModule.view = new RaceStatusView({
                    el: $('#' + options.boardId + ' .race_status'),
                    model: new RaceModel()
                }).render();
            }


            RaceStatusModule.view.model.set(data.race);
            var moreUpdate = RaceStatusModule.view.update();

            if (moreUpdate){
                RaceStatusModule.scheduleUpdate(options);
            }else{
                App.vent.trigger('in-game-banner:pause', {state: false});
            }
        },function(data){
            $('#' + options.boardId + ' .race_status').empty();
            RaceStatusModule.view = null;
            App.vent.trigger('in-game-banner:pause', {state: false});
        });
    };

    RaceStatusModule.scheduleUpdate = function (options) {
        if(RaceStatusModule.updateTimer !== null){
            clearTimeout(RaceStatusModule.updateTimer);
        }
        RaceStatusModule.updateTimer = setTimeout(function () {
            RaceStatusModule.update(options);
        }, 2000);
    };

    RaceStatusModule.getData = function (raceId, callback, fail) {
        var url = '/feeds/userRace?raceId=' + raceId + '&t=' + moment.utc().valueOf();
        $.ajax({
            type: "GET",
            url: url,
            async: true,
            dataType: "json"
        }).done(function (data) {
            if(data.ok !== true){
                fail(data);
            }else
                 callback(data);
        }).fail(function(data){
            fail(data);
        });
    }
});

App.module("EgghuntModule", function (EgghuntModule, App, Backbone, Marionette, $) {
    var isAnimating = false,
        introInit = false,
        carImg,
        isTablet = false,
        eggsContent = [],
        currentActiveEgg = 0,
        currentEggIndex,
        mapTransitionSpeed = 0.1,
        eggWidth = 100,
        eggHeight = 100,
        mapHeight = 1500,
        mapWidth = 1500,
        mapScale = 0.5,
        sliderValue = 0.5,
        scaleMax = 2.5,
        scaleMin = 0.5,
        scaleStep = 0.5,
        currentMapCenter = {x: 750, y: 750},
        carCoords = [
            {initial: {x: 250, y: 1138, x2: 430, y2: 992}},
            {egg1: {x: 430, y: 992, x2: 550, y2: 1035}},
            {egg2: {x: 550, y: 1035, x2: 769, y2: 993}},
            {egg3: {x: 769, y: 993, x2: 990, y2: 1002}}
        ],
        currentProgress,
        eggs;
    EgghuntModule.addInitializer(function (module_options) {
        App.vent.on('show:mission:promo', function (promoName) {
            var url = '/api/getMissionInfo?promoKey=' + promoName;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                data: {}
            }).done(function (data) {
                if (data.ok) {
                    carImg = data.carImg;
                    currentEggIndex = data.playerStep;
                    currentProgress = data.percentage;
                    $('.loaderBg').remove();
                    eggs = data.steps;
                    // EgghuntModule.activateEgg();
                    EgghuntModule.init();
                    EgghuntModule.addCar();
                    EgghuntModule.unhatchEgg(function () {
                        EgghuntModule.moveCar(currentActiveEgg);
                        if(!currentActiveEgg) {
                            EgghuntModule.intro(19, function(){
                                EgghuntModule.scrollToPoint(330,1100);
                            });
                            if($.cookie('introLaunched')) {
                                EgghuntModule.scrollToPoint(330,1100);
                            }
                        } else {
                            EgghuntModule.intro(19,function(){
                                EgghuntModule.scrollToPoint(currentActiveEgg.x, currentActiveEgg.y);
                            });
                            if($.cookie('introLaunched')) {
                                EgghuntModule.scrollToPoint(currentActiveEgg.coords.x, currentActiveEgg.coords.y);
                            }

                        }
                    });
                }
            });
        });
    });

    EgghuntModule.init = function () {
        carCoords = eggs.map(function(egg, index, arr){
            var level = index+1;
            if(arr[level] !== undefined){
                return { x: egg.coords.x, y:egg.coords.y, x2: arr[level].coords.x, y2: arr[level].coords.y };
            }
        });
        
        if (Red.DeviceType === 'mobile') {
            EgghuntModule.loadMobileEvents();
        }

        EgghuntModule.updateProgressBlocks();
        EgghuntModule.add(eggs);
        EgghuntModule.addProgressToEgg();
        EgghuntModule.addFireWorks($('.easterEgg[data-index="19"]'));
        // EgghuntModule.scrollToPoint(currentMapCenter.x, currentMapCenter.y, function () {
        //     // EgghuntModule.intro(19);
        // });
        EgghuntModule.loadEvents();
    };
    EgghuntModule.intro = function (index, cb) {
        if($.cookie('introLaunched')) {
            return;
        }
        EgghuntModule.transitionSpeed(0.700);
        if (index == 19 && !introInit) {
            var egg = eggs[index];
            EgghuntModule.scrollToPoint(egg.coords.x, egg.coords.y, function () {
                EgghuntModule.scale(1);
                EgghuntModule.addFireWorks($('#Egg_20'));
                setTimeout(function () {
                    index = 0;
                    EgghuntModule.intro(index);
                }, 1000);
            });
            introInit = true;
        } else if (index < eggs.length - 1 && introInit) {
            var egg = eggs[index];
            EgghuntModule.scrollToPoint(egg.coords.x, egg.coords.y, function () {
                index++;
                EgghuntModule.intro(index);
            });
        } else if (index === 19 && introInit) {
            var egg = eggs[index];
            EgghuntModule.scrollToPoint(egg.coords.x, egg.coords.y, function () {
                setTimeout(function () {
                    index = 21;
                    EgghuntModule.intro(index);
                }, 600);
            });
        } else {

            $.cookie('introLaunched',true);
            EgghuntModule.scrollToPoint(currentActiveEgg.coords.x, currentActiveEgg.coords.y, function () {
                EgghuntModule.transitionSpeed(0.1);
            });
        }
        if(cb) {
            cb();
        }

    };
    EgghuntModule.transitionSpeed = function (mapTransitionSpeed) {
        var map = $('#eggHuntMap');
        map.css('transition', 'all ' + mapTransitionSpeed + 's linear');
    };
    EgghuntModule.activateEgg = function (cb) {
        for (i = 0; i < eggs.length; i++) {
            if (eggs[i].status === 'Claimed') {
                var el = $('#Egg_' + eggs[i].level);
                el.append('<div class="confetti"><div class="before"></div><div class="after"></div></div>');
                el.addClass('hatched');
            }
        }
        if (cb !== undefined) {
            cb();
        }
    };
    EgghuntModule.unhatchEgg = function (cb) {
        $('.egg_claimed, .egg_active').each(function (el, i) {
            var el = $(this);
            $('.confetti').remove();
            var img = el.find('img');
            var level = el.attr('data-level');
            img.remove();
            el.append('<img src="https://static.32red.com/img/Easter/' + level + '_Active.png" alt="">');
        });
        if (cb !== undefined) {
            cb();
        }
    };
    EgghuntModule.changeStatus = function (egg, status) {
        egg.status = status;
    };
    EgghuntModule.addCar = function () {
        //get index of current active egg
        // var currentActiveEggIndex = parseInt($('.egg_current').attr('data-index'));
        if(currentEggIndex === -1 || !carCoords[currentEggIndex]){
            var html = '<span data-left="330" data-top="1100" id="easterCar" style="left: 330px; top: 1100px;"><img src="https://static.32red.com/img/Easter/'+carImg+'" alt=""></span>';
            return $('#eggHuntMap').append(html);
        }
        var carPosition = carCoords[currentEggIndex];
        var html = '<span data-left="' + carPosition.x + '" data-top="' + carPosition.y + '" id="easterCar" style="left: ' + carPosition.x + 'px; top: ' + carPosition.y + 'px;"><img src="https://static.32red.com/img/Easter/'+carImg+'" alt=""></span>';
        if(!$('#easterCar').length){
            $('#eggHuntMap').append(html);
            EgghuntModule.rotateCar(carPosition);
        }
    };
    EgghuntModule.addProgressToEgg = function(){
      //current progress
          eggProgressIndex = parseInt($('.egg_current').attr('data-index')) + 1;
          $('#Egg_'+eggProgressIndex).append('<div class="progress-egg" style="height:'+currentProgress+'%;"><img src="https://static.32red.com/img/Easter/'+eggProgressIndex+'_Active.png" alt=""></div>');
    };
    EgghuntModule.rotateCar = function (carPosition) {
        var deltaX = carPosition.x2 - carPosition.x;
        var deltaY = carPosition.y2 - carPosition.y;
        var rad = Math.atan2(deltaY, deltaX); // In radians
        var deg = rad * (180 / Math.PI);
        
        if (deg < -90) {
            var deg = -(deg);
            var rotation = 'scaleX(-1)';
        } else {
            var rotation = 'scaleX(1)';
        }
        $('#easterCar img').css('transform', rotation);
    };
    EgghuntModule.moveCar = function (egg, cb) {
        var car = $('#easterCar');

        if(!egg) {
            return;
        }

        car.css({
            left: egg.coords.x,
            top: (egg.coords.y + 50)
        });
        if (cb !== undefined) {
            cb();
        }
    };
    /**
     * Sort the eggs on the map
     * @param eggs
     */
    EgghuntModule.add = function (eggs) {
        var html = '',
            level = 1;
        for (var i = 0; i < eggs.length; i++) {
            actualPrize = eggsContent[i].actualPrize,
            html += '<a data-left="' + eggs[i].coords.x + '" data-level="' + level + '" data-top="' + eggs[i].coords.y + '" id="Egg_' + level + '" data-index="' + i + '" class="easterEgg egg_' + eggs[i].status + '" style="left: ' + eggs[i].coords.x + 'px; top: ' + eggs[i].coords.y + 'px;"><img src="https://static.32red.com/img/Easter/' + level + '_Inactive.png" alt=""><span class="inEggPrize">' + actualPrize + '</span><span class="eggHuntLevel">' + level + '</span></a>';
            level++;
        }
        if(!$('#Egg_1').length){
            $('#eggHuntMap').append(html);
            $('.easterEgg[data-index='+currentEggIndex+']').addClass('currentEgg');
            currentActiveEgg = (eggs[currentEggIndex]) ? eggs[currentEggIndex] : eggs[0];
        }
    };

    /**
     * Go to coordinates
     * @param coordinates
     */
    EgghuntModule.animateTo = function (coordinates) {
        var viewHeight = $('#eggHuntOverlay').height(),
            viewWidth = $('#eggHuntOverlay').width(),
            mapHeight = $('#eggHuntMap').height(),
            mapWidth = $('#eggHuntMap').width(),
            maxMapX = mapWidth - viewWidth,
            maxMapY = mapHeight - viewHeight;

        var x = coordinates.x - (viewWidth / 2),
            y = coordinates.y - (viewHeight / 2);

        x = Math.min(x, maxMapX);
        y = Math.min(y, maxMapY);
        x = Math.max(x, 0);
        y = Math.max(y, 0);
        $('#eggHuntMap').css('transform', 'translate(' + (-x) + 'px, ' + (-y) + 'px)');
        $('#eggHuntMap').attr({'data-top': (-x), 'data-left': (-y)});
    };

    /**
     * display infobox
     * @param egg (obj)
     * @param element (obj)
     */
    EgghuntModule.displayInfo = function (element) {
        $('.eggInfo').remove();
        $('.openedInfo').removeClass('openedInfo');
        var eggIndex = parseInt(element.attr('data-index')),
            egg = eggs[eggIndex],
            level = element.attr('data-level'),
            x = -73,
            y = -191,
            content = eggsContent[eggIndex].content,
            title = eggsContent[eggIndex].title;
        element.addClass('openedInfo');
        if(Red.DeviceType === 'mobile'){
            html = '<div class="eggInfo fullwidth-eggInfo"><img src="https://static.32red.com/img/Easter/' + level + '_Active.png" alt=""><div class="eggInfo-description"><h3>' + title + '</h3><p>' + content + '</p><a data-level="' + level + '" class="cta big breakTheEgg">Claim it!</a></div><a href="#" id="closeEggInfo"><i class="icon-arrow-right"></i></a></div>';
            $('#eggHuntOverlay').append(html);
            $('#scaling-holder').css('bottom', $('.fullwidth-eggInfo').outerHeight());
        } else {
            var html = '<div class="eggInfo" style="top: ' + y + 'px;left:' + x + 'px;"><img src="https://static.32red.com/img/Easter/' + level + '_Active.png" alt=""><div class="eggInfo-description"><h3>' + title + '</h3><p>' + content + '</p><a data-level="' + level + '" class="cta big breakTheEgg">Claim it!</a></div><a href="#" id="closeEggInfo"><i class="icon-arrow-right"></i></a></div>';
            element.append(html);
        }
    };
    EgghuntModule.closeInfoWindow = function(){
        $('.openedInfo').removeClass('openedInfo');
        $('.eggInfo').remove();
        $('#scaling-holder').removeAttr('style')
    };
    /**
     * Recalculate the position of the eggs after scaling the map
     * @param eggs
     * @returns {Array}
     */
    EgghuntModule.recalculatePositions = function (eggs) {
        var eggsObj = [];
        var originalWidth = 1500,
            originalHeight = 1500;
        var currentWidth = $('#baseMap').width(),
            currentHeight = $('#baseMap').height();

        for (var i = 0; i < eggs.length; i++) {
            var xDiff = (currentWidth * eggs[i].x) / originalWidth;
            var yDiff = (currentHeight * eggs[i].y) / originalHeight;
            eggsObj.push({x: xDiff, y: yDiff});
        }

        return eggsObj;
    };

    /**
     * Centerize the map to coordinates
     * @param x
     * @param y
     * @param scale
     * @returns {*|jQuery}
     */
    EgghuntModule.scrollToPoint = function (x, y, cb) {
        if (isAnimating) {
            return;
        }
        isAnimating = true;
        var def = $.Deferred();

        var viewportWidth = $('#eggHuntOverlay').width(),
            viewportHeight = $('#eggHuntOverlay').height(),
            cX = 0,
            cY = 0;

        // Te center
        cX = ((viewportWidth * 1 / mapScale) - mapWidth) / 2;
        cY = ((viewportHeight * 1 / mapScale) - mapHeight) / 2;

        // uncomment to focus egg
        cX += (mapWidth / 2 - x) - eggWidth / 2;
        cY += (mapHeight / 2 - y) - eggHeight / 2;

        currentMapCenter = {x: x, y: y};

        $('#eggHuntMap').css('transform', 'scale(' + mapScale + ') translate(' + (cX) + 'px, ' + (cY) + 'px)');

        $('#eggHuntMap').attr('data-cx', cX);
        $('#eggHuntMap').attr('data-cy', cY);
        setTimeout(function () {
            isAnimating = false;
            def.resolve(true);
            if (cb !== undefined) {
                cb();
            }
        }, 500);

        return def.promise();
    };

    EgghuntModule.addFireWorks = function (el) {
        $('.pyro').remove();
        el.append('<div class="pyro"><div class="before"></div><div class="after"></div></div>');
    };
    /**
     * Zoom in
     * @param scale
     */
    EgghuntModule.scale = function (scale) {
        mapScale = scale;
        EgghuntModule.scrollToPoint(currentMapCenter.x, currentMapCenter.y);
    };
    EgghuntModule.updateProgressBlocks = function () {
        $('.progress-block').each(function (i, el) {
            var level = parseInt($(el).attr('data-level')),
                index = level - 1,
                egg = eggs[index],
                content = {
                    content: $(el).find('p').text(), 
                    index: index, 
                    title: $(el).find('h3').text(),
                    actualPrize : $(el).find('.actual-prize').text()
                };
            eggsContent.push(content);
            $(el).addClass(egg.status);
            if (egg.status === 'active') {
                $(el).append('<a href="#" class="crackTheEgg cta big" data-index="' + index + '">Crack The Egg</a>');
            } else if (egg.status === 'inactive' || egg.status === 'current') {
                $(el).append('<a href="#" class="locked cta big">Stage locked</a>');
                $(el).removeClass('current');
                $(el).addClass('inactive');
            } 
        });

    };
    EgghuntModule.loadEvents = function () {

        // this event is triggered from the model after the user claims 
        // we add the user to the daily claimed player group
        var bonusWidgetKeys = ['Egg1', 'Egg2', 'Egg3', 'Egg4', 'Egg5', 'Egg6','Egg7', 'Egg8', 'Egg9', 'Egg10', 'Egg11', 'Egg12','Egg13', 'Egg14', 'Egg15', 'Egg16','Egg17', 'Egg18', 'Egg19', 'Egg20','Egg1rp', 'Egg2rp', 'Egg3rp', 'Egg4rp', 'Egg5rp', 'Egg6rp','Egg7rp', 'Egg8rp', 'Egg9rp', 'Egg10rp', 'Egg11rp', 'Egg12rp','Egg13rp', 'Egg14rp', 'Egg15rp', 'Egg16rp','Egg17rp', 'Egg18rp', 'Egg19rp', 'Egg20rp'];
        _.each(bonusWidgetKeys, function(item){
            App.vent.on('claimed:'+item, function(){
                $('.opened-egg').removeClass('egg_active').addClass('egg_claimed');
            });
        });
        /**
         * Go to egg
         */
        $('body').on('click', '.easterEgg.egg_active, .crackTheEgg', function (e) {
            var x = parseInt($(this).attr('data-left')),
                y = parseInt($(this).attr('data-top')),
                el = $(this);
            EgghuntModule.scrollToPoint(x, y, function () {
                // EgghuntModule.displayInfo(el);
            });

            var currentLevel = $(this).attr('data-level'),
                url = '/christmas-decoration-'+currentLevel+ ' #christmas-tree';
            $(this).addClass('opened-egg');
            App.vent.trigger('show:modal',{
                model : {
                    extraClass                  : 'christmas-tree-popover show-loader',
                    image                       : 'https://static.32red.com/img/Easter/'+currentLevel+ '_Active.png',
                    headerImageType             : 'none',//'basic-image',
                    size                        : 'large',
                    showCloseButton             : true,
                    content                     : "<div class='advent-calendar-modal overlay-content'><div class='loader'><picture><img src='https://static.32red.com/img/loader.svg'/></picture></div></div>"
                },

                showCallback : function(el) {
                    $(el).find('.overlay-content').load(url,function(response,status,xhr){
                        xhr.success(function(){
                            $(el).find('.modal-wrapper').removeClass('show-loader');
                        });

                        xhr.fail(function(){
                            $(el).find('.modal-wrapper').removeClass('show-loader');
                        });

                        xhr.error(function(){
                            $(el).find('.modal-wrapper').removeClass('show-loader');
                        });
                    });
                },
            });
        })
        $('body').on('click', '#closeEggInfo',function(e){
            e.preventDefault();
            EgghuntModule.closeInfoWindow();
            e.stopPropagation();
        });

        
        $(document).on('click', '.breakTheEgg', function (e) {
            e.preventDefault();
            
        });
        /**
         * Sidebar
         */
        $('#eggHuntWrapper #openSidebar').on('click', function (e) {
            e.preventDefault();
            $('#eggHuntSidebar').toggleClass('active');
            var arrow = ($(this).text() === '>') ? '<' : '>';
            $(this).text(arrow);
            if (arrow === '<') {
                $(this).css({left: $('#eggHuntSidebar').width()});

            } else {
                $(this).css({left: 0});
            }
        });
        $('.eggHuntHeaderTab').on('click', function (e) {
            e.preventDefault();
            $('.eggHuntHeaderTab').parent().removeClass('active');
            $(this).parent().addClass('active');
            var tab = $(this).attr('data-expand');
            $('.eggHuntTab').removeClass('active');
            $('#' + tab).addClass('active');
        });

        $('.crackTheEgg').on('click', function (e) {
            var index = parseInt($(this).attr('data-index'));
            $('.easterEgg[data-index=' + index + ']').trigger('click');
            if(Red.DeviceType === 'mobile'){
                $('#mapTab').trigger('click');
            }
        });
        /**
         * Scaling
         */
        var slider = $('#scaler');
        $('#scale-in').on('click', function () {
            if (isAnimating) {
                return;
            }
            sliderValue = Math.min(sliderValue + scaleStep, scaleMax);
            slider.val(sliderValue);
            EgghuntModule.scale(sliderValue);
        });
        $('#scale-out').on('click', function () {
            if (isAnimating) {
                return;
            }
            sliderValue = Math.max(sliderValue - scaleStep, scaleMin);
            slider.val(sliderValue);
            EgghuntModule.scale(sliderValue);
        });
        slider.on('change', function (e) {
            sliderValue = $(this).val();
            EgghuntModule.scale(sliderValue);
        });
        var dragging = false;
        var iX, iY;
        $("#baseMap").on('mousedown', function (e) {
            var map = $(this).parent();
            dragging = true;
            map.offsetLeft = parseFloat($(map).attr('data-cx'));
            map.offsetTop = parseFloat($(map).attr('data-cy'));
            iX = e.clientX - map.offsetLeft;
            iY = e.clientY - map.offsetTop;
            map.setCapture && map.setCapture();
            return false;
        });
        $(document).on('mousemove', function (e) {
            if (dragging) {
                var e = e || window.event;
                var oX = e.clientX - iX;
                var oY = e.clientY - iY;
                $('#eggHuntMap').css('transform', 'scale(' + mapScale + ') translate(' + (oX) + 'px, ' + (oY) + 'px)');
                $('#baseMap').parent().attr('data-cx', oX);
                $('#baseMap').parent().attr('data-cy', oY);
                return false;
            }
        });
        $(document).on('mouseup', function (e) {
            dragging = false;
            e.cancelBubble = true;
        });
        if(Red.DeviceType === 'mobile' || Red.DeviceType === 'tablet'){
            $("#baseMap").on('touchstart', function (e) {
                if (!dragging) {
                    var map = $(this).parent();
                    dragging = true;
                    map.offsetLeft = parseFloat($(map).attr('data-cx'));
                    map.offsetTop = parseFloat($(map).attr('data-cy'));
                    iX = e.originalEvent.touches[0].clientX - map.offsetLeft;
                    iY = e.originalEvent.touches[0].clientY - map.offsetTop;
                    map.setCapture && map.setCapture();
                }
                return false;
            });
            $(document).on('touchmove', function (e) {
                if (dragging) {
                    var e = e || window.event;
                    var oX = e.originalEvent.touches[0].clientX - iX;
                    var oY = e.originalEvent.touches[0].clientY - iY;

                    $('#eggHuntMap').css('transform', 'scale(' + mapScale + ') translate(' + (oX) + 'px, ' + (oY) + 'px)');
                    $('#baseMap').parent().attr('data-cx', oX);
                    $('#baseMap').parent().attr('data-cy', oY);
                    return false;
                }
            });
            $(document).on('touchend', function (e) {
                dragging = false;
                e.cancelBubble = true;
            });
        }
    };
    EgghuntModule.loadMobileEvents = function () {
        $('#eggHuntSidebar').addClass('active');
        $('#mapTab').show();
        setTimeout(function(){
            $('#mapTab').trigger('click');
        },100);
        $('#eggHuntSidebar').height(40);
        $('.map-tab').remove();
    };

});
App.module("Translations", function(Translations, App, Backbone, Marionette, $) {
    Translations.addInitializer(function() {
    });
    var view = this;
    try {
        localStorageSupported = 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
        localStorageSupported = false;
    }
    var storageTestKey = 'sTest',
        storage = window.sessionStorage;

    try {
        storage.setItem(storageTestKey, 'test');
        storage.removeItem(storageTestKey);
    } catch (e) {
        if (e.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
            localStorageSupported = false;
        } else {
            localStorageSupported = true;
        }
    }
    var duration = 1000 * 60 * 60 * 24;
 
 var loadingList = {};
    
    Translations.loadTranslation = function(key, callback) {
  var cacheKey = Red.Locale + ':' + key;
        // First check local storage
        if (localStorageSupported ) {
            if (cacheKey in localStorage) {
    try {
     var savedData = JSON.parse(localStorage[cacheKey]);

     var lastModified = savedData['.timestamp'];
     var thisTimestamp = new Date().valueOf();
     if (thisTimestamp - lastModified < duration) {
      callback(savedData);
      return;
     }
    }
    catch (e) {
     // Data is corrupt... ignore it, will be replaced later
    }
            }
        }
  
  // Check if this key is already being loaded
  if (key in loadingList) {
   loadingList[key].push(callback);
   return;
  }
  
        // Need to AJAX it...
  
  // First store in loading list
  loadingList[key] = [callback];
  // Perform the ajax call itself
        $.ajax({
            type: "GET",
            url: '/api/translations/',
            dataType: "json",
            data: {
                key: key
            }
        }).done(function(data) {
   // Save to local storage
            if (localStorageSupported ) {
                var dataToStore = data.translations[key];
                if (dataToStore != undefined) {

                    dataToStore['.timestamp'] = (new Date().valueOf());
                    localStorage[cacheKey] = JSON.stringify(dataToStore);
                }
            }


   // Call all the callbacks
   _.each(loadingList[key], function(callbackEntry) {
    callbackEntry(data.translations[key]);
   });
   // Remove callback list
   delete loadingList[key];
        });
    };


});
App.addInitializer(function(options) {
 App.addRegions({ balanceInfo: '.balance' });
});

App.module("SessionInfoModule", function(SessionInfoModule, App, Backbone, Marionette, $) {

    var timerId = null;
    var windowHidden = false;

 var lastSessionInfo = {};
    App.stopStatusCall = false;

 SessionInfoModule.addInitializer(function(options) {

  App.vent.on('get:sessionInfo', function(data) {
            if ($.cookie('Auth')) {
       SessionInfoModule.getSessionInfo();
       startTimer();
            }
            App.vent.trigger('hide:loader');
            Util.manageStorage('remove', 'userFirstLogin');
     });

        App.vent.on('trigger:sessionInfo', function() {
            if ($.cookie('Auth')) {
                SessionInfoModule.getSessionInfo();
            }
        });

  App.reqres.setHandler("sessionInfo", function(){
   return lastSessionInfo;
  });

        App.vent.on('login:success', function(data) {
            SessionInfoModule.getSessionInfo();

            startTimer();
        });

        App.vent.on('games:play', function(openGame) {
            SessionInfoModule.getSessionInfo();
            App.vent.on('ping:sending', function (data) {
                if(data.notifications.indexOf('exitBanner') == -1) {
                    data.notifications.push('exitBanner');
                    data.notifications.push('gameID#'+openGame['id']);
                }
            });
        });

        $(document).on("visibilitychange", function() {
            if (document.hidden) {
                windowHidden = true;
            }
            else {
                windowHidden = false;
            }
        });

        //display general loader
        App.vent.on('show:loader',function(){
            App.LoaderView = new GeneralLoaderView().render().el;
            $('#container-inner').append(App.LoaderView);
        });
        App.vent.on('hide:loader',function(){
            $('.loading-overlay').remove();
        });


 });

    var stopTimer = function() {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    };

    var startTimer = function() {
        stopTimer();
        timerId = setInterval(SessionInfoModule.getSessionInfo, 10000);
    };

    var sending = false;

 SessionInfoModule.getSessionInfo = function(data) {
        if (sending) {
            return;
        }

        if ($.cookie('Auth')) {
            var pingData = {};
            if(Red.isViper === 'isviper') {
                pingData.viper = 1;
            }

            sending = true;
            App.vent.trigger('ping:sending', pingData);
   $.ajax({
             type: "GET",
             url: '/api/status',
             dataType: "json",
             data: pingData
         }).done(function(data) {
                // Received the status response
                if(data.autoLoggedOut) {
                    Util.manageStorage('set', 'autoLogout', true);
                    App.vent.trigger('logout:submit', App.LoginModule.loginModel);
                    return;
                }
                if (!data.ok) {
                    // Error - session expired?
                    // Time to log them out
                    App.vent.trigger('logout:submit', App.LoginModule.loginModel);
                    return;
                }

                if(data.knownUser) {
                    //user is no longer logged in
                    App.vent.trigger('logout:submit', App.LoginModule.loginModel);
                    return;
                }

                if(data.deposits) {
                    App.vent.trigger('deposit:success', data.deposits);
                }
          // All is well, update everything
                App.vent.trigger('ping:received', data);
                App.vent.trigger('update:session-time', data);

                //update user Balance in Relax Games if a game is launched
                if(App.SessionReminderModule.model.get('gameLaunched')) {
                    App.BridgeModule.postCustomMessage({rgMessage: 'oprg_UpdateBalance' });
                }

                //update user Regulated state
                Red.PlayerStatus = data['userState'];
                //update display RG message var
                Red.DisplayRGMessage = data['displayRGMessage'];
                Red.DisplayRestrictedByLossMessage = data['displayRestrictedByLossMessage'];
                //check is user has bonus balance
                Red.hasBonusBalance = data['hasBonus'];
                //check is user has NDB bonus
                Red.hasBonusNdb = data['hasBonusNdb'];
                //check if we need to show net position
                Red.showNetPosition = data['showNetPosition'];

    lastSessionInfo = data;

                if(!Red.FirstStatusCallReceived){
                    //Event on first status call received
                    App.vent.trigger('FirstStatusCall:received');
                    Red.FirstStatusCallReceived = true;
                }
                if(data.seg){
                    Red.blockFromGameplay = data.seg;
                    if(window.location.href.indexOf('sport#home') > -1){
                        window.location.replace('/');
                    }
                }
         }).fail(function(data) {
             if(data.responseJSON === undefined){
                 return;
                }

                if(data.responseJSON.playerRegulatedSettings !== undefined && data.responseJSON.playerRegulatedSettings['Account Status']!== undefined &&
                    data.responseJSON['playerRegulatedSettings']['Account Status'] === "7" ) {
                    App.Translations.loadTranslation('self-exclusion', function(translations) {
                        App.vent.trigger('show:popover',{
                            content : "<div id='self-excluded-popover'><h1 class='popover-header'></h1><i class='fa fa-lock fa-9x'></i><div class='sef-title'>" + translations.popoverTitle + "</div>" +
                            " <div class='sef-descr'>" + translations.popoverDescription +
                            "</div> <a href='/support' class='gameplay'>" + translations.ctaText + "</a></div>",
                            maxWidth : 900,
                            maxHeight : 686,
                            extraClass : "self-excluded",
                            showCloseButton : true,
                            mobileFullScreen : true,
                            closeClickOutside : false,
                            noScroll: true,
                            closeCallback: function() {
                                Util.manageStorage('set', 'autoLogout', true);
                                App.vent.trigger('logout:submit', App.LoginModule.loginModel);
                            },
                        });
                    });
                    $.removeCookie('Auth');

                }

         }).always(function() {
                sending = false;
            });
  } else {
            stopTimer();
            if (document.hidden || windowHidden) {
                App.vent.trigger('logout:submit', App.LoginModule.loginModel);
            }
        }
 };


});


App.module("SportsbookModule", function(SportsbookModule, App, Backbone, Marionette, $) {
 SportsbookModule.addInitializer(function(options) {
  
  if ($.cookie('ShowSportsbookBlock')) {
   $(document).ready(function() {
    if ($.cookie('ShowSportsbookBlock')) {
     $.removeCookie('ShowSportsbookBlock');
     
     App.vent.trigger('show:popover',{
      content : '<h2 class="popover-header">Country Blocked</h2><p><br/></p><p>Sorry, the country you are connecting from is blocked from accessing 32Red Sportsbook.</p>',
      maxWidth : "320",
      maxHeight : "180",
      extraClass : "",
      showCloseButton : true,
      closeClickOutside : true,
      noScroll: true,
     });
    }
   });
  };
  
        App.vent.on('display:sportsbook', function() {
         
      SportsbookModule.SportsbookOverlayModule = new SportsbookOverlayModel();
   App.vent.on('get:sessionInfo', function(data) {
    if(SportsbookModule.SportsbookOverlayModule.get('displayOverlay')) {
              if(!$('.sportsbook-overlay')[0]) {
               App.vent.trigger('show:sportsbookoverlay');

                        $('.warning-bonus-balance').show();

                  new SportsbookOverlayView({
                      model: SportsbookModule.SportsbookOverlayModule,
                            el: $('.sportsbook-overlay-content-bonus')
                        }).render();
              }
    }
         });

   if (!$.cookie('User') && (Red.GeoLocation.toUpperCase() == "GB" || Red.GeoLocation.toUpperCase() == "IE" ) ) {
                SportsbookModule.sportsbookNewAccountOverlayModel = new SportsbookNewAccountOverlayModel();
   }

            App.vent.on('ping:received', function(data) {
                if (Red.DeviceType == "desktop") {
                    if(typeof data.knownUser == 'undefined' ) {
                        $('#sportsbook-frame').addClass('sportsbook-frame-padding');
                        $('side-games-container').show();
                    }else{

                        $('#sportsbook-frame').removeClass('sportsbook-frame-padding');

                        //remove side games
                        $('side-games-container').hide();

                    }
                }else{
                    $('#sportsbook-frame').removeClass('sportsbook-frame-padding');
                    $('side-games-container').hide();
                }

         });
        });

        App.vent.on('show:sportsbookoverlay',function(options){
            App.vent.trigger('show:popover',{
                content : "<div class='sportsbook-overlay-content-bonus'><h1>32Red</h1></div>",
                extraClass : "sportsbook-overlay",
                maxWidth : 640,
                maxHeight : 440,
                showCloseButton : true,
                closeClickOutside :true,
                noScroll: true,
                showCallback : function(el){
                }
            });
        });
 });

});

var SportsbookOverlayView = Backbone.Marionette.ItemView.extend({
 template: '#sportsbook-overlay',

 tagName: 'div',

 events : {
  'click .remove-bonus'   : 'displayConfirmOverlay',
  'click .confirm-no'   : 'closeConfirmOverlay',
  'click .confirm-yes'  : 'confirmBonusDelete'

 },

 templateHelpers: function() {
        var view = this;
        return {
            'hasbingoBonus': function() {
                return view.model.get('hasBingoBonus');
            },
        }
    },

 initialize : function() {
 },

 onRender : function() {
  var view  = this;
  this.model.set('displayOverlay',false);
        view.$el.on("contextmenu",function(){
        return false;
     });
 },

 displayConfirmOverlay : function(ev) {
  var view = this;
   ev.preventDefault();
  view.$el.find('.confirm-remove').removeClass('hidden').addClass('visible');

 },

 closeConfirmOverlay : function(ev) {
  var view = this;
   ev.preventDefault();
  view.$el.find('.confirm-remove').removeClass('visible').addClass('hidden');
 },

 confirmBonusDelete : function(ev) {
  var view = this;
  ev.preventDefault();
  var data = {
      'username'   : view.model.get('username'),
   'bonus'   : 1000
  };

  $.ajax({
            type: "POST",
            url: '/api/change_player_bonus',
            data: data,
            dataType: "json"
        }).done(function(data) {
        }).fail(function(){
        });
 }
});
var SportsbookOverlayModel = Backbone.Model.extend({
 defaults: {
        'username'                      : '',
        'bonusBalance'                  : 0,
        'bingoBonusBalance'             : 0,
        'previousBonusBalance'          : 0,
        'displayOverlay'                : false,
        'realBalance'                   : 0
 },

 initialize : function() {
  var model = this;
        //set the model for my account
        App.vent.on('get:sessionInfo',function(response){
            if(response.ok && response['playerInfo'] && response['playerInfo']['balance']) {
             var playerBalance = response['playerInfo']['balance'],
                    bonusBalance = playerBalance['Bonus Balance'],
                    sportsBonusBalanceLimit = response['sportsBonusBalanceLimit'];
             if(bonusBalance > sportsBonusBalanceLimit) {
     model.set({
                     'displayOverlay' : true
                 });
             } 

                model.set({
                    'username'                  : response['username'],
                    'bonusBalance'       : playerBalance['Bonus Balance'],
                    'realBalance'       : response['playerBonusBalance'],
                    'sportsBonusBalanceLimit'   : sportsBonusBalanceLimit
                });
            }
        });
 },
});

var SportsBookNewAccountOverlayView = Backbone.Marionette.ItemView.extend({
 template: '#sportsbook-new-account-overlay',

 tagName: 'div',
    events : {
        'click .close-btn'   : 'closePopup',
        "click .open-popover"       : 'showTandPopover'

    },
 initialize : function() {
 },

 onRender : function() {
  var view  = this;
 },

    closePopup : function (e) {
  e.preventDefault();
     var view = this;
        view.$el.find('.popover-content').closest('.sportsbook-overlay-content').removeClass('visible').addClass('hidden');
    },

});
var SportsbookNewAccountOverlayModel  = Backbone.Model.extend({

 initialize : function() {
  var model = this;

        if(!$.cookie('displayNewAccountOverlay')){
             $.cookie('displayNewAccountOverlay', true);
        }
 },
    show: function () {
        $('.sportsbook-overlay-content').removeClass('hidden');
    }
});
App.module("PushModule", function(PushModule, App, Backbone, Marionette, $){
    var pathname = window.location.pathname;
    PushModule.addInitializer(function(){
        PushModule.resetReadPush();
        PushModule.resetPush();
        PushModule.process();
    });
    /**
     * Process checks if there are any push notifications
     */
    PushModule.process = function(){
        App.vent.on("ping:received", function (data) {
            var push = PushModule.getPush();
            if(_.isEmpty(push) || PushModule.wasPushSeen(push.key)) { return; }

            //Mark as read
            PushModule.markAsRead(push.key);

            //Based on type launch the popover with the url or with the content
            if(push.type === 'url'){
                PushModule.showPopover(true, push.url);
            } else if(push.type === 'message') {
                PushModule.showPopover(false, push.message);
            } else if(push.type === 'action'){
                PushModule.applyAction(push);
            }
            PushModule.resetPush();
        });
    };
    /**
     * Get the push notification
     * @returns {{}|any}
     */
    PushModule.getPush = function(){
        if($.cookie('push') === undefined){ return {}; }

        return JSON.parse($.cookie('push'));
    };
    /**
     * Mark the notification as read
     * @param key
     */
    PushModule.markAsRead = function (key) {
        var stored = PushModule.getReadPush();

        stored.push(key);
        $.cookie('push_read', JSON.stringify(stored), {path: pathname});
    };
    /**
     * Get the push keys that were already seen
     * @returns {Array|any}
     */
    PushModule.getReadPush = function(){
        if($.cookie('push_read') === undefined){ return []; }

        return JSON.parse($.cookie('push_read'));
    };
    /**
     * Check if push notification was seen
     * @param key
     * @returns {boolean}
     */
    PushModule.wasPushSeen = function (key) {
        var read = PushModule.getReadPush();
        return $.inArray(key, read) > -1;
    };
    /**
     * Show the content for the popover
     * @param isUrl
     * @param data
     */
    PushModule.showPopover = function (isUrl, data) {
        var content = '<h1 class="popover-header">'+Red.ThemeTitle+'</h1>';
        var options = {
            iframe: !isUrl,
            extraClass: 'push-popover',
        };
        if(isUrl) {
            content += '<div class="overlay-content" id="push-popover-content"></div>';
            options.src = data;
        } else {
            content += '<div class="overlay-content" id="push-popover-content">'+data+'</div>';
        }
        options.content = content;
        App.vent.trigger('show:overlay-message',options);
    };
    /**
     * Delete the push notification
     */
    PushModule.resetPush = function(){
        $.removeCookie('push', {path: pathname});
    };
    /**
     * Delete the seen push notifications
     */
    PushModule.resetReadPush = function(){
        $.removeCookie('push_read', {path: pathname});
    };
    /**
     * Check if the blocked game matches the currently playing one
     * and close the game
     *
     * @param gameId
     */
    PushModule.verifyAndCloseGame = function(data){
        var currentHash = window.location.hash;
        if(currentHash.indexOf('#gameplay') === -1) { return; }
        var currentlyPlayingGameId = currentHash.replace('#gameplay/', '');
        if(currentlyPlayingGameId == data.gameId) {
            PushModule.forceQuitGame();
            $.post('api/game_exit');
        }
    };
    /**
     * Force quit the currently playing game
     */
    PushModule.forceQuitGame = function() {
        App.vent.trigger('close-modal');
        App.vent.trigger('close-popover');
        App.appRouter.navigate("",{trigger:true});
        if( Util.manageStorage('get', 'showExitBanner')) {
            Util.manageStorage('remove', 'showExitBanner');
            Util.manageStorage('remove', 'launchedGame');
        }
    };
    /**
     * Apply action by string name of method
     * @param push
     */
    PushModule.applyAction = function (push) {
        var data = push.data;
        PushModule[data.action](data);

        if(data.popover !== undefined){
            PushModule.showPopover(data.popover.isUrl, data.popover.message);
        }

    };

});
App.module("BridgeModule", function(BridgeModule, App, Backbone, Marionette, $){
    var message = {
        Body     : null,
        Type     : "REQUEST",
        Origin   : "SpinSportApplication",
        SenderId : "gameFrame",
    };
    /**
     * Api event listener
     *
     */
    BridgeModule.listen = function(){
        window.addEventListener("message", function (event) {
            App.vent.trigger("bridge_message:received", event);
        }, false);
    };

    /**
     * deal with the events received from games
     */
    App.vent.on('bridge_message:received', function (event) {
        if(('data' in event)) {
            var data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            var eventName = ('rgMessage' in data)  ? data.rgMessage : data.Name;

            if((event.data.gcmevent) == 'redirect') {
                $('.responsive-popover-wrapper').remove();
                $('.responsive-modal-wrapper').remove();
            }

            if(eventName) {
                switch (eventName.toLowerCase()) {
                    case 'close_game':
                        App.vent.trigger('hide:gamePlay-popover');
                        $('html').removeClass('no-scroll');
                        break;
                    case 'close_application':
                        App.vent.trigger('hide:gamePlay-popover');
                        $('html').removeClass('no-scroll');
                        break;
                    case 'launch_game_history':
                        App.appRouter.navigate("playcheck",{trigger:true});
                        break;
                    case 'launch_banking':
                        launchBanking(true);
                        break;
                    case 'gprg_listening':
                        BridgeModule.sendMessage({rgMessage: 'oprg_Ready'}, false);
                        break;
                    case 'launch_game':
                        BridgeModule.sendMessage({Type : 'REQUEST', Origin: 'EMBEDDED_GAME', Name: 'launch_game', Body: {'game_id': data.Body.game_id}}, true);
                        //force launch the new game - because MG reasons
                        var internalGameId = Red.ProviderIdGames[data.Body.game_id].id;
                        App.vent.trigger('game:launch-from-recommended');
                        App.appRouter.navigate('/gameplay/'+internalGameId, true);
                        break;
     case 'logout':
                        App.vent.trigger('hide:gamePlay-popover');
                        $('html').removeClass('no-scroll');
      App.vent.trigger('logout:submit',App.LoginModule.loginModel);
                        break;
     
                }
            }
        }
    });

    BridgeModule.postCustomMessage = function(message, asString) {
        BridgeModule.sendMessage(message, asString);
    };

    BridgeModule.pauseGame = function(){
        message.Name = "PAUSE_GAMEPLAY";
        BridgeModule.sendMessage(message, true);
    };
    BridgeModule.resumeGame = function(){
        message.Name = "RESUME_GAMEPLAY";

        BridgeModule.sendMessage(message,true);
    };
    BridgeModule.launchBanking = function(){
        message.Name = "LAUNCH_BANKING";

        BridgeModule.sendMessage(message,true);
    };
    BridgeModule.launchResponsibleGaming = function(){
        message.Name = "LAUNCH_RESPONSIBLE_GAMING";

        BridgeModule.sendMessage(message,true);
    };
    BridgeModule.launchGameHistory = function(){
        message.Name = "LAUNCH_GAME_HISTORY";

        BridgeModule.sendMessage(message,true);
    };
    BridgeModule.playerActivity = function(){
        message.Name = "PLAYER_ACTIVITY";

        BridgeModule.sendMessage(message,true);
    };
    BridgeModule.closeGame = function(){
        message.Name = "CLOSE_GAME";

        BridgeModule.sendMessage(message, true);
    };
    BridgeModule.sendMessage = function(message, asString){
        if($('#gameFrame')[0] || $('#mobile-game-launch-frame')[0]) {
            message.Id = BridgeModule.createGuid();
            var elementId = Red.DeviceType === 'desktop' ? 'gameFrame' : 'mobile-game-launch-frame';
            if(asString) {
                document.getElementById(elementId).contentWindow.postMessage(JSON.stringify(message), '*');
            } else {
                document.getElementById(elementId).contentWindow.postMessage(message, '*');
            }
        }
    };
    BridgeModule.createGuid = function() {
        return "xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx".replace(/[x8]/g, BridgeModule.GenerateHex);
    };
    BridgeModule.GenerateHex = function(placeholder) {
        if (placeholder === "8") {
            return BridgeModule.GenerateRandomInteger(8, 11).toString(16);
        }
        else {
            return BridgeModule.GenerateRandomInteger(0, 15).toString(16);
        }
    };
    BridgeModule.GenerateRandomInteger = function(min, max) {
        return Math.trunc(min + Math.random() * (1 + max - min));
    };
});
var NotificationModel = Backbone.Model.extend({
 defaults: {
        title: 'Important Info',
        text: '',
        image: 'zero-balance-warning',
        link: '#',
        link_text: 'Would you like to know more?',
        termsLink : "",
  type: 'system'
 }
});

var NotificationModelCollection = Backbone.Collection.extend({
    model: NotificationModel
});

App.module("Notifications", function(Notifications, App, Backbone, Marionette, $) {    
    var notificationsView;
    var notifications = null;
    var notificationsHash = null;
    
    var initView = function() {
        notifications = new NotificationModelCollection();
        notificationsView = new NotificationsView({collection:notifications});
    };
    
    var listenToModel = _.once(function() {
        App.LoginModule.loginModel.on('change:state', loginStateChanged);
    });
    
    var loginStateChanged = function() {
        if (App.LoginModule.loginModel.get('state') != LoginModel.authSuccessState) {
            if(notificationsView) {
                notificationsView.remove();
            }
            notificationsView = null;
        }
    };
    
    Notifications.addInitializer(function() {
        App.vent.on('ping:sending', function(data) {
            //data['messages'] = 1;
            listenToModel();
        });

        App.vent.on('ping:received', function(data) {
            if(localStorage.getItem('debug_stop_notifications_reload')==='yes' && notifications !== null)
                return;

            var newHash = '';

            if($('.responsive-popover-wrapper.play-area.visible').length){
                var ifPromosVisible = $('.responsive-popover-wrapper .notifications div div.notifications-list').length;
            } else {
                var ifPromosVisible = $('.notifications div div.notifications-list').length;                
            }

            if (data["notifications"] && data["notifications"]["alerts"]) {
                _.each(data.notifications.alerts, function(item){
                    newHash += item.hash;
                    if(item.key.search(/bonusWB/i) >=0 ) {
                        item.rank = 0;
                    }
                });
                data["notifications"]["alerts"].sort((a,b) => a.rank - b.rank);
            }

            if(newHash === notificationsHash && ifPromosVisible!==0){
                return;
            }else{
                notificationsHash = newHash;
            }

            initView();
            if(Util.manageStorage('get', 'notifications')) {
                //if there are notifications in session, don't show those notifications
                var not =  Util.manageStorage('get', 'notifications');
                var closedNotifications  = JSON.parse(not);

                _.each(data.notifications.alerts,function(item){
                    if(_.contains(closedNotifications,item.key))
                        item.closed = true;
                });
            }
            // testing: only one notification
            // data.notifications.alerts.splice(1);

            if ((data.notifications != undefined) && (data.notifications.alerts != undefined)) { 
                notifications.reset(data.notifications.alerts || []);
                // testing: no notifications
                // notifications.reset([]);
            }
            
            var notificationsElement = notificationsView.render().$el;
            $('.notifications').each(function(){
    if (window.Red && window.Red.PageFlags && window.Red.PageFlags.responsible) {
     $(this).html('');
    }
    else {
     $(this).html(notificationsElement);
    }
            });
        });
    });
});
var NotificationItemView = Backbone.Marionette.ItemView.extend({
    template: '#notification-item-template',
    tagName: 'li',

    className: function() {
        return this.model.get('closed') ? 'closed': '';
    },

    templateHelpers: function() {
        var self = this;
        return {
            isLoggedIn: function() {
                if(App.LoginModule && App.LoginModule.loginModel) {
                    return App.LoginModule.loginModel.get('state') === "Authentication Success";
                }
                if(Red.isViper == "isviper") {
                    return true;
                }
                return false;
            },

            isMinibonus: function() {
                if(self.model.get('minibonus') || self.model.get('multibonus')) {
                    return true;
                }
            }
        };
    },

    events: {
        'click .close-notification '                                   : 'closeNotification',
        'click a.open-promo'                                           : 'showPromo',
        'click .notification-info a.login-btn'                         : 'showLogin',
        'click .notification-info a[href$="banking"]'                  : 'launchBanking',
        'click .notification-info a[href$="/api/claim_free_games"]'    : 'claimBonus',
        'click .notification-info a[href$="#open-free-games"]'         : 'openFreeGamesPopover',
        'click .close-jumio-notification'                              : 'addToPlayergroup'
    },

    onRender: function () {
        var view = this;
        view.$el.find('.tandc-link.remove-notification').on('click', function (ev) {
            var model = ev.target.id;
            view.addPlayerToGroup(model);
        });

        var imageLink = view.$el.find('figure a').first();
        var link = this.getImageLink();
        if(imageLink.length && link){
            imageLink.attr('href',link);
        }

        if(!this.templateHelpers().isMinibonus()) {
            imageLink.addClass('open-promo');
        }
    },

    claimBonus: function(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        if( !Util.manageStorage('get', 'claimButtonClicked')) {
            var claimButtonClicked = 'false';
        } else {
            var claimButtonClicked =  Util.manageStorage('get', 'claimButtonClicked');
        }
        if (claimButtonClicked == 'false') {
            Util.manageStorage('set', 'claimButtonClicked',  true);
            this.$el.addClass('disableClick');
            var view = this;
            var userData = JSON.parse($.cookie('User'));
            var tmpData = {};
            tmpData['offerID'] = view.model.get('offerID');
            tmpData['key'] = view.model.get('key');
            tmpData['username'] = userData.username;
            tmpData['type'] = view.model.get('type');
            tmpData['amount'] = view.model.get('amount');
            tmpData['hasClaimed'] = view.model.get('hasClaimed');
            tmpData['description'] = view.model.get('description');
            tmpData['notification'] = true;
            $(ev.currentTarget).removeAttr("href");
            $(ev.currentTarget).remove();
            $.ajax({
                type: "POST",
                url: "/api/claim_free_games",
                dataType: "json",
                data: tmpData,
                async: false
            }).done(function (data) {
                Util.manageStorage('set', 'claimButtonClicked',  false);
                if (data.existingGroup == false) {
                    PeekabooView.FreeSpinsHeader = new FreeSpinsHeader({
                        message: data.message,
                        title: data.title
                    });
                    $('.free-games-pop-up').append(PeekabooView.FreeSpinsHeader.render().el);
                    $('.peekaboo-inner').addClass('display-none');
                    if (view.model.get('type') != 'bonus') {
                        App.vent.trigger('display:free-games', data.returnFreeGames['games'], $('.free-games-pop-up .content'));
                    }
                }
            });
            view.$el.removeClass('show-loader');
            App.vent.trigger('bonus:optin',view.model.get('key'),'notifications');

        }
    },

    addToPlayergroup : function(ev) {
        // this will add the user to a player group on click
        // the group will be read from config
        // key will be specified in the link using "data-group" attribute
        var view = this,
            target = $(ev.target),
            groupKey = target.attr('data-group');

        view.$el.remove();

        $.ajax({
            type: "GET",
            url: "/api/addToPlayergroup",
            dataType: "json",
            data: {groupKey: groupKey}
        }).done(function (data) {

        });
    },

    addPlayerToGroup: function(model) {

            $.ajax({
                type: "GET",
                url: "/api/AddPlayerToGroups",
                dataType: "json",
                data: {model: model, group: 'simpleNotification'},
                async: false
            }).done(function (data) {
            }).fail(function () {
                // console.log('Failed loading game');
            });
    },

    closeNotification: function(ev){
        var view = this,
            notificationKey = view.model.attributes['key'],
            notifications = [],
            target = $(ev.target),
            notificationsWrapper = target.closest('.notifications-list'),
            notificationsNumber = target.closest('.notifications-list').find('li').length - 1,
            closedNotificationsNumber = target.closest('.notifications-list').find('li.closed').length +1;

        ev.preventDefault();
        //when click on close button, store the notification in session
        if( Util.manageStorage('get', 'notifications')) {
            var not = JSON.parse(Util.manageStorage('get', 'notifications'));
            notifications.push(not);
            notifications.push(notificationKey);
            notifications = _.unique(_.flatten(notifications));
            Util.manageStorage('set', 'notifications',   JSON.stringify(notifications));

        } else {
            notifications.push(notificationKey);
            Util.manageStorage('set', 'notifications',   JSON.stringify(notifications));
        }

        //hide the notification
        view.$el.addClass('read');
        setTimeout(function(){
            view.$el.addClass('closed');
        },500);
        if(notificationsNumber == closedNotificationsNumber) {
            notificationsWrapper.removeClass('show-all');
            notificationsWrapper.css('display', 'none');
            Util.manageStorage('set', 'showAllNotifications', 0);
        }
    },

    showPromo: function(e) {
        if (this.model.get('type') === 'promotion') {
            e.preventDefault();
            var data = this.model.get('data');
                data['image'] = this.model.get('image');
                data['banner-link'] = this.model.get('banner-link');
            App.vent.trigger('show:promo-popup', { key: this.model.get('key'), data: data });
        }
    },

    showLogin: function(e) {
        App.vent.trigger('LoginRequested');
        Util.manageStorage('set', JSON.parse(Util.manageStorage('get', 'notifications')), JSON.stringify({ key: this.model.get('key'), data: this.model.get('data')}));
    },

    launchBanking: function(e) {
        e.preventDefault();
        launchBanking();
    },

    openFreeGamesPopover : function() {
        var view = this;
        PeekabooView.FreeSpinsHeader = new FreeSpinsHeader({
            title : view.model.get('overlayTitle'),
            message: view.model.get('overlayText'),
        });

        $('.free-games-pop-up').append(PeekabooView.FreeSpinsHeader.render().el);
        App.vent.trigger('display:free-games', view.model.get('games'), $('.free-games-pop-up .content'));
    },

    showTandPopover : function(e) {
        e.preventDefault();
        var options = {
            iframe : false,
            content : "<h1 class='popover-header'>"+Red.ThemeTitle+"</h1><div class='overlay-content'></div>",
            src: $(e.target).attr('href')
        }
        App.vent.trigger('show:overlay-message',options);
    },

    /**
     * Get the best link to use for the image
     * We first try to get the actual link from the model
     * or the first link in the text that is not a TnC link
     *
     * @return String URL
     */
    getImageLink: function() {
        var result = null;
        var link = this.model.get('link');
        if(link && link.indexOf('#tandc') < 0 &&  link !== '#'){
            return link;
        }

        var content = $('<div />').html(this.model.get('text')+this.model.get('link_text'));
        link = content.find('a:not([class]):not([href*="#tandc"])').attr('href');
        if(link){
            return link;
        }

        link = content.find('a:not([href*="#tandc"])').attr('href');
        if(link){
            return link;
        }

        return result;
    }
});

var NotificationsView = Backbone.Marionette.CompositeView.extend({
    template: '#notifications-template',
    childView : NotificationItemView,
    childViewContainer: '.notifications-list ul',

    templateHelpers: function() {
        var self = this;
        return { count: function() { return self.collection.length; } };
    },

    events: {
        'click .show-notifications': 'toggleList',
        'click .close-notifications' : 'hideList'
    },


    initialize : function() {
        var self = this;
    },

    onRender: function() {
        var self = this;

        if(!$('#mobile-footer .promo-counter')[0] || !$('#sport-footer .promo-counter')[0]) {
            $('#mobile-footer a.show-promotions.icon-promos').append('<span class="promo-counter"></span>');
            $('#sport-footer a.show-promotions.icon-promos').append('<span class="promo-counter"></span>');
        }
        var mobileNumberHolder = $('footer .promo-counter'),
            notificationsNumber = self.collection.length;

        //if we have a notification in storage, display promo popover
        if( Util.manageStorage('get', 'ShowPromoPopUpInfo')) {
            setTimeout(function(){
                App.vent.trigger('show:promo-popup', Util.manageStorage('get', 'ShowPromoPopUpInfo'));
                Util.manageStorage('remove', 'ShowPromoPopUpInfo');
            },200)
        }

        //populate footer notification number
        if(mobileNumberHolder[0]) {
            mobileNumberHolder.html(notificationsNumber);
        }

        App.vent.off('show:mobile-promotions');
        App.vent.on('show:mobile-promotions', function(){
            self.toggleList();
        });
       
        this.$el.find('.notifications-empty a').attr('href', '/casino/promotions');       

        if (notificationsNumber == 0) {
            this.$el.find('.notifications-number').css('display', 'none');
            this.$el.find('.notifications-list').css('display', 'none');
            mobileNumberHolder.css('display','none');
            return;
        } else {
            this.$el.find('.notifications-number').css('display', '');
            this.$el.find('.notifications-list').css('display', '');
            mobileNumberHolder.css('display','');
        }


        /**
         * Notifications removed due to FRAN-986 - Check the mobile notifications - should only appear after click on the icon
         */
        // this.hideList();

        /**
         * On render hide/display the notification balloon
         */

        if( Util.manageStorage('get', 'showAllNotifications') == 1) {
            this.showList();
        } else {
            this.hideList();
        }

        //if we have a new notification, display the notifications balloon
        if( Util.manageStorage('get', 'sessionNotificationsNumber')) {
            if (notificationsNumber > Util.manageStorage('get', 'sessionNotificationsNumber')) {
                if( Red.DeviceType == "desktop") {
                    this.showList();
                } else {
                    this.hideList();
                }
            }
        }

        this.$el.find('.notifications-header-count').text(notificationsNumber);

        Util.manageStorage('set', 'sessionNotificationsNumber',  notificationsNumber);

        //hide notifications balloon after 1 min.

        if (!Util.manageStorage('get', 'notificationsClosed')) {
            clearTimeout(self.hidingNotifications);
            self.hidingNotifications = setTimeout(function(){
                self.hideList();
                Util.manageStorage('set', 'notificationsClosed',  'true');
            }, 60000);
        }
    },

    // limit the height of the notifications container depeneding on screen size
    // if the screen is too short we will try to limit the ul(scrollable) to the size
    // of the screen minus the other elements that don't scroll
    limitMobileListHeight:function(){
        var currentHeight = window.innerHeight;
        var currentWidth = window.innerWidth;

        // maxium possible height of the total notifications-list
        var listMax = 470;

        var self =this;
        if($('#mobile').length > 0){

            // run in a timeout because if you trigger the opening of the notifications
            // automatically it will have a race condition and not have the height of other elements
            setTimeout(function(){
                // combined height of notifications header and footer
                var offsets=$('.notifications-header').outerHeight()+$('.notifications-footer').outerHeight();

                // if there is the cookie notification we need to account for that
                var cookieHeight = 0;
                var cookie = $('#cookieNotification.visible');
                if(cookie.length)
                    cookieHeight = cookie.outerHeight();

                // determin if we should use the max height of the screen or the fixed listMax
                var footerHeight = $('footer').outerHeight();
                var headerHeight = $('header').outerHeight();

                // grace is a space we want to always keep between the top of the notificatinos and the header
                // It's 5% of the screen but between 5 and 64 px
                var grace = Math.max(5,Math.min(currentHeight * .05, 64));
                var total= (currentHeight - cookieHeight - footerHeight - headerHeight - offsets - grace);
                // max is the maximum size of the list. But because it's not controller by .notifications
                // we want to apply the size of that minus the headers to the ul
                var max= (listMax - offsets);
                var result = Math.min(total, max);

                self.$el.find('.notifications-list ul').css('max-height', result+'px');
            }, 50);
        }
    },

    hideList: function(ev) {
        var self =this;

        if($('#mobile').length > 0){
            $('#mobile .notifications-overlay').css('display','none');
            $('#mobile .notifications-list').removeClass('show-all');
            $('#mobile .notifications-list').css('display', 'none');
        } else {
            self.$el.find('.notifications-list').removeClass('show-all');
            self.$el.find('.notifications-list').css('display', 'none');
        }

        $('#mobile .notifications').css('display','none');
        Util.manageStorage('set', 'showAllNotifications',  0);
    },

    showList: function() {
        var self =this;
        this.limitMobileListHeight();

        if($('#mobile').length>0){
            $('#mobile .notifications-overlay').css('display','block');
        }

        if (this.collection.length > 0) {
            this.$el.find('.notifications-empty').css('display','none');
        }else{
            this.$el.find('.notifications-empty').css('display','block');
        }
        self.$el.find('.notifications-list').addClass('show-all');
        self.$el.find('.notifications-list').css('display', 'block');
        $('#mobile .notifications').css('display','block');
        self.$el.find('.notifications-list li').removeClass('closed').removeClass('read');
        Util.manageStorage('set', 'showAllNotifications',  1);
    },

    toggleList: function() {
        var self = this;
        if ($('#mobile .notifications-list').hasClass('show-all') || this.$el.find('.notifications-list').hasClass('show-all')) {
            self.hideList();
        } else {
            self.showList();
            clearTimeout(self.hidingNotifications);
            self.hidingNotifications = setTimeout(function(){
                self.hideList();
            }, 60000);
        }
    }
});


var PromoCategoryModel = Backbone.Model.extend({
 defaults: {
        'title': null,
 }
});

var PromoCategoryCollection = Backbone.Collection.extend({
    model: PromoCategoryModel
});

var PromoModel = Backbone.Model.extend({
 defaults: {
        'title': '',
        'description':''
 }
});

var PromoModelCollection = Backbone.Collection.extend({
    model: PromoModel
});

var UploadDocumentModel = Backbone.Model.extend({
 defaults: {
  'state' : 'default'
 },
});
App.module("UploadDocuments", function(UploadDocuments, App, Backbone, Marionette, $) {
    UploadDocuments.addInitializer(function () {

    });

    App.vent.on('show:upload-docs-popover', function () {
        if($.cookie('Auth')) {
            UploadDocuments.displayPopover();
        } else {
            App.vent.trigger('show:login-popover');
        }
    });

    UploadDocuments.displayPopover = function () {
        //if the upload docs popover is already displayed, don't show it again
        if($('.responsive-modal-wrapper .upload-documents-view')[0]) {
            return;
        }
        //if we already have a popover, render the upload form in the same popover
        if($('.responsive-modal-wrapper .interruptive-popup')[0]) {
            UploadDocuments.renderForm($('.interruptive-popup .modal-content'));
            return;
        }

        App.vent.trigger('show:modal',{
            model : {
                extraClass                  : 'interruptive-popup upload-documents-view',
                size                        : 'large',
                showCloseButton             : true,
                headerImageType             : 'none'
            },

            showCallback : function() {
                //render the content
                UploadDocuments.renderForm($('.interruptive-popup.upload-documents-view .modal-content'));
                App.appRouter.navigate(" ", {trigger: true});
            },

            //do whatever action is required on close
            hideCallback: function() {
            },
        });
    };

    UploadDocuments.renderForm = function (el) {
        UploadDocuments.UploadDocumentModel = new UploadDocumentModel();
        UploadDocuments.UploadDocumentsView = new UploadDocumentsView({
            el: el,
            model: UploadDocuments.UploadDocumentModel
        }).render();
    };
});
var UploadDocumentsView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'upload-documents',
    template: '#upload-documents-view',

    events : {
        'dragenter #ImageDropTarget' : 'dragEnter',
        'dragover #ImageDropTarget' : 'dragEnter',
        'dragleave #ImageDropTarget' : 'dragLeave',
        'drop #ImageDropTarget' : 'dropFiles',
        'change #upload' : 'dropFiles',
        'click .go-back' : 'goBack'
    },

    initialize : function() {
        var view = this;
        view.acceptedTypes = ["image/jpeg", "image/jpg", "application/pdf"];
    },

    onRender : function () {
        var view = this;
        view.dropTarget = view.$el.find('#ImageDropTarget');
    },

    dropFiles : function(e){
        var view = this,
            files;
        e.preventDefault();
        view.dropTarget.removeClass('highlight');
        var dt = e.originalEvent.dataTransfer;
        if(dt === undefined) {
            files = $(e.target).prop('files');
        } else {
            files = dt.files;
        }
        var formData = new FormData();
        var fileChecked = true;
        for (var i = 0; i < files.length; i++) {
            if(!fileChecked) {
                return;
            }
            (function(file) {
                if ($.inArray(file.type, view.acceptedTypes) >= 0) {
                    var fileSize = file.size / 1024 / 1024; //in MB
                    if(parseFloat(fileSize).toFixed(2) > parseFloat(4).toFixed(2)) {
                        view.goToError('File too big, please use a smaller file. Maximum file size: 4MB.');
                        fileChecked = false;
                    }
                    formData.append('file[]', file);
                } else {
                    view.goToError('We only accept images(jpeg, jpeg) or pdf files');
                    fileChecked = false;
                }
            })(files[i]);
        }
        if(fileChecked) {
            view.handleFilesUpload(formData);
        }
    },

    /**
     * uploads multiple files
     * @param files
     */
    handleFilesUpload : function (files) {
        var view = this;
        if (files) {
            view.dropTarget.attr('data-state','uploading');
            $.ajax({
                type: "POST",
                url: '/api/uploadDocuments',
                cache: false,
                contentType: false,
                processData: false,
                enctype: 'multipart/form-data',
                data: files
            }).done(function(data) {
                if(data.ok) {
                    view.dropTarget.attr('data-state','upload-ok');
                    // view.dropTarget.find('.upload-ok p').after('Uploaded Files: '+data['successfulFiles'].join());
                } else {
                    view.dropTarget.attr('data-state','upload-failed');
                    view.dropTarget.find('.error-message').text(data['error']);
                }
            });
        }
    },

    goToError : function(errorMessage) {
        var view = this;
        view.dropTarget.attr('data-state','upload-failed');
        view.dropTarget.find('.error-message').text(errorMessage);
    },

    goBack : function(ev) {
        var view = this;
        ev.preventDefault();
        view.dropTarget.attr('data-state','default');
    },

    dragEnter : function(e) {
        var view = this;
        e.preventDefault();
        view.dropTarget.addClass('highlight');
    },

    dragLeave : function(e) {
        var view = this;
        e.preventDefault();
        view.dropTarget.removeClass('highlight');
    }
});

App.module("PromoPopup", function(PromoPopup, App, Backbone, Marionette, $) {

    PromoPopup.addInitializer(function(options) {

        App.vent.on('show:promo-popup', function(options) {

            var showPromoPopup = function(key, promoData, options) {

                var extraPromoData = _.omit(promoData, 'flow'), title;

                title = promoData.flow.title;

                var promoPopup = new PromotionModel({
                    key: key,
                    title: title,
                    tandc: promoData.flow.tandc,
                    currentPane: promoData.flow.start,
                    panes: promoData.flow.states,
                    data: extraPromoData
                });

                if (key === 'BonusNDB') {
                    PromoPopup.popoverView = new PromoPopupViewNDB({
                        model: promoPopup,
                        options : options
                    }).render();
                }
                else {
                    PromoPopup.popoverView = new PromoPopupView({
                        model: promoPopup,
                        options : options
                    }).render();
                }
            };

            if (options.hasOwnProperty('key') && options.hasOwnProperty('data')) {
                var newOptions = _.omit(options, 'key', 'data');
                showPromoPopup(options.key, options.data, newOptions);
            }

        });

    });

});

var PromoPopupPaneView = Backbone.Marionette.ItemView.extend({
});

var PromoPopupView = Backbone.Marionette.ItemView.extend({
    template: '#promo-popup-template',
    className: 'promo-popup-wrapper',
    childView: PromoPopupPaneView,
    childViewContainer: '.promo-panes-holder',
    
    events: {
        "click .cta": 'handleClickCTA',
        "click .close-btn": "handleClickClose",
    },
    
    modelEvents: {
        "change:currentPane": "onPaneChanged"
    },
    
    templateHelpers: function() {
        var self = this;
        return {
            'getImageName': function() {
                return self.model.get('data')['image'] + '.jpg';
            },
            'promoDetailsLink' : function() {
                if(self.model.get('key').indexOf('BonusWB') >= 0){
                    self.model.get('data')['banner-link'] = '/casino/promotions/first-deposit-bonus';
                }
                return '/' + Red.Locale +self.model.get('data')['banner-link'];
            }
        }
    },
    initialize: function(){
    },
    onRender: function() {
        $('html').addClass('no-scroll');
        var self = this;

        self.$el.addClass(this.model.get('key'));
        
        self.$el.find('.header > h2').html(this.model.get('title'));
        self.$el.find('.tandc > a').html(this.model.get('tandc')+' [+]');
        
        var activePane = this.model.get('currentPane');
        
        _.each(this.model.get('panes'), function(pane, paneKey) {
            var paneEl = $('<div></div>').addClass('pane').attr('data-key', paneKey);
            
            if (activePane == paneKey) {
                paneEl.addClass('active');
            }
            
            var leftPane = $('<div></div>').addClass('first').appendTo(paneEl);
            var rightPane = $('<div></div>').addClass('second').appendTo(paneEl);
 
            if ((paneKey == "default") || (paneKey == "reminder")) {
            } else {
                rightPane.append($('<h2></h2>').text(pane.title));
            }

            //line1 goes in left pane
            if (paneKey != "error") { 
                if (pane.line1) {
                    if (pane.line1.indexOf('</p>') > -1) {
                        rightPane.append($(pane.line1).addClass('special-text'));
                    }
                    else {
                        rightPane.append($('<p class="special-text"></p>').html(pane.line1));
                    }
                }
            } 

            //line2 goes in right pane. If line2 doesn't exist, then we will add the title in right pane
            if (pane.line2) {
                if (pane.line2.indexOf('</p>') > -1) {
                    rightPane.append($(pane.line2));
                }
                else {
                    rightPane.append($('<p></p>').html(pane.line2));
                }
            } else {
                if (paneKey !== "confirm") {
                    if (paneKey == "error") {
                        rightPane.append($('<p></p>').text("What would you like to do next?"));
                    } else {
                        rightPane.append($('<p></p>').text(pane.title));
                    }
                }
            }
            var ctaBtnsWrapper = $('<div class="ctaWrapper"></div>');
            if(Red.hasBonusBalance) {
                ctaBtnsWrapper.append($('<p></p>')).text(pane.hasBonusMessage);
            } else {
                _.each(pane.options, function(optionData, optionKey) {
                    var attrs = {};
                    if (optionData.hasOwnProperty('action')) { attrs['data-action'] = optionData.action; }
                    if (optionData.hasOwnProperty('state')) { attrs['data-state'] = optionData.state; }
                    if (optionData.hasOwnProperty('data')) {
                        attrs['data-data'] = JSON.stringify(optionData['data']);
                    }
                    ctaBtnsWrapper.append($('<a href="#' + optionKey + '">').addClass('cta big').addClass(optionKey).attr(attrs).text(optionData.text));
                });
            }
            rightPane.append(ctaBtnsWrapper);
            
            self.$el.find(self.childViewContainer).append(paneEl);
        });
        
        $('#container-inner').append(this.$el);
        this.$el.addClass('visible');
        
        try {
            picturefill();
        }
        catch (e) {
            
        }
    },
    
    onDestroy: function() {
        $('html').removeClass('no-scroll');
        $('html').removeClass('extra-scroll');
    },
    handleClickCTA: function(e) {
        e.preventDefault();
        
        var view = this, model = this.model,
            $loader = view.$el.find('.loader'),
            url = '/api/bkwbonus';

        if((model.get('key') == "RedRewards")||(model.get('key') == "RedRewardsSecond")) {
            url = '/api/bkdotd';
        }

        var nextState = $(e.target).attr('data-state');
        if ($(e.target).attr('data-action')) {
            switch($(e.target).attr('data-action')) {
                case 'optin':
                    var postData = view.getFormData();
                    if ($(e.target).attr('data-data')) {
                        postData = _.extend(postData, JSON.parse($(e.target).attr('data-data')));
                    }
                    $loader.show();
                    $(e.target).addClass('disabled');
                    $.ajax({
                        type: "POST",
                        url: url,
                        dataType: "json",
                        data: {
                            action: 'optin',
                            promotion: model.get('key'),
                            data: postData
                        }
                    }).done(function(data) {
                        if (data.ok) {
                            App.vent.trigger('promotion:optin',model.get('key'),'popover');
                            view.setState(nextState);
                        }
                        else {
                            view.setState('error');
                            if (data.error) {
                                view.$el.find('div.pane[data-key="error"] p').html(data.error);
                            }
                        }
                        $loader.hide();
                        $(e.target).removeClass('disabled');
                    }).fail(function() {
                        view.setState('error');
                        $loader.hide();
                    });
                    return;
                    
                case 'optout':
                    view._updatePromo('optout',nextState, $(e.target), url);
                    return;

                case 'cancel':
                    view._updatePromo('cancel',nextState, $(e.target), url);
                    return;

                case 'back':
                    view._updatePromo('cancel',nextState, $(e.target), url);
                    return;

                case 'help':     
                    var win = window.open('https://www.32red.com/help', '_blank');
                    win.focus();     
                    return;
            }
        }
        
        if (nextState) {
            this.setState(nextState);
        }
    },

    _updatePromo : function(action,nextState,target, url) {
        var view = this, model = this.model,
        $loader = view.$el.find('.loader');
        $loader.show();
        target.addClass('disabled');
        $.ajax({
            type: "POST",
            url: url,
            dataType: "json",
            data: {
                action: action,
                promotion: model.get('key'),
                data : []
            }
        }).done(function(data) {
            view.setState(nextState);
            $loader.hide();
            target.removeClass('disabled');
        }).fail(function() {
            view.setState('error');
            $loader.hide();
            target.removeClass('disabled');
        });
    },
    
    handleClickClose: function(e) {
        e.preventDefault();
        this.destroy();
        App.appRouter.navigate("/",{trigger:true});
    },

    showTandPopover : function(e) {
        e.preventDefault();
        var options = {
            iframe : false,
            content : "<h1 class='popover-header'>"+Red.ThemeTitle+"</h1><div class='overlay-content'></div>",
            src: $(e.target).attr('href')
        }
        App.vent.trigger('show:overlay-message',options);
    },
    
    onPaneChanged: function() {
        var activePane = this.model.get('currentPane');
        this.$el.find('.pane.active').removeClass('active');
        
        if (activePane == 'close') {
            this.destroy();
            return;
        }
        
        this.$el.find('.pane[data-key=' + activePane + ']').addClass('active');
    },
    
    setState: function(state) {
        this.model.set('currentPane', state);
    },
    
    getFormData: function() {
        var paramObj = {};
        $.each(this.$el.find('form').serializeArray(), function(_, kv) {
          if (paramObj.hasOwnProperty(kv.name)) {
            paramObj[kv.name] = $.makeArray(paramObj[kv.name]);
            paramObj[kv.name].push(kv.value);
          }
          else {
            paramObj[kv.name] = kv.value;
          }
        });
        return paramObj;
    }
});
var PromoPopupViewNDB = PromoPopupView.extend({
   
    getLang: function(key) {
        return this.model.get('data').lang[key];
    },

    onRender: function() {
        // 
        PromoPopupView.prototype.onRender.apply(this, arguments);
        
        // Add the fields to the input pane
        var inputPane = this.$el.find('.pane[data-key=input]');
        
        var targetPane = $(inputPane).find('.second');
        
        // Add phone entry point
        var newView = new Backbone.Marionette.ItemView({
            template: '#promo-popup-ndb-sms-template',
        });
        
        $(targetPane).html(newView.render().$el);
        
        var view = this;
        
        $(targetPane).find('#BonusMobileAgain').click(function(e) {
            e.preventDefault();
            view.prepareToInputPhoneNumber();
        });
        $(targetPane).find('#BonusMobileAlready').click(function(e) {
            e.preventDefault();
            view.prepareToInputCode();
        });
        
        this.prepareToInputPhoneNumber();
  
  try {
   picturefill();
  }
  catch (e) {
   
  }
        $('body').append("<script id='recaptcha' src='https://www.google.com/recaptcha/api.js?render=6Le44b0ZAAAAAEIYgFs-gcfxDwtTtXL7hAUJNnuI'></script>");
    },
    
    handleClickCTA: function(e) {
        if ($(e.target).attr('id') == 'BonusMobileInputSend') {
            e.preventDefault();
            this.sendVerificationSMS();
            return;
        }
        if ($(e.target).attr('id') == 'BonusMobileClaim') {
            e.preventDefault();
            this.checkVerifyCode();
            return;
        }

        if ($(e.target).attr('data-action') == 'back') {
            PromoPopupView.prototype._updatePromo.apply(this, ['cancel',$(e.target).attr('data-state'), $(e.target), '/api/bonusNDB']);
            return;
        }

        if ($(e.target).attr('data-action') == 'optout') {
            PromoPopupView.prototype._updatePromo.apply(this, ['optOut',$(e.target).attr('data-state'), $(e.target), '/api/bonusNDB']);
            return;
        }

        PromoPopupView.prototype.handleClickCTA.apply(this, arguments);
    },

    sendVerificationSMS: function(validationId) {
        var view = this,
            model = this.model,
            number = $("#BonusMobileNumber").intlTelInput("getNumber").replace(/[^0-9]+/g, ''), data = { phone_number: number };

        view.$el.find('.promo-popup-content').addClass('busy');

        data['forceSms'] = true;
        if (validationId) {
            data['validation_id'] = validationId;
        }

        $.ajax({
            type: "POST",
            url : '/api/bonusNDB',
            dataType: "json",
            data: {
                action: 'sendSMS',
                promotion: model.get('key'),
                data: data
            }
        }).done(function(response) {
            view.$el.find('.promo-popup-content').removeClass('busy');
            if (response.ok) {
                if (response.result.sms == 'hlr') {
                    //console.log("HLR Sent, checking that now...");
                    var validationId = response.result.id;                    
                    view.verifyHLR(validationId);
                    return;
                }
                else if (response.result.sms == 'sending') {
                    //console.log("SMS Sent, checking that now...");
                    var sendId = response.result.id;
                    view.verifySMS(sendId);
                    return;
                }
    
    var error = response.result.error || 'Unknown Error';
                view.$el.find('.promo-popup-content').removeClass('busy');
                view.$el.find('div.pane[data-key="error"] p').html(error);
                view.setState('error');
            }
            else {
                if (response.error) {
                    view.$el.find('.promo-popup-content').removeClass('busy');
                    view.$el.find('div.pane[data-key="error"] p').html(response.error);
                }
                else {
                    view.$el.find('div.pane[data-key="error"] p').html('Unknown Error');
                }
                view.setState('error');
            }
        }).fail(function() {
            view.$el.find('.promo-popup-content').removeClass('busy');
            view.$el.find('div.pane[data-key="error"] p').html('Unknown Error');
            view.setState('error');
        });
    },
    
    verifyHLR: function(id) {
        var view = this, model = this.model;
        
        var data = {
            id: id
        };
        
        var attempts = 0;
        
        var tryAgain = function() {
            attempts++;
            if (attempts <= 10) {
                //console.log("Checking HLR status, attempt " + attempts);
                setTimeout(attemptCheck, 1000);
                return true;
            }
            else {
                //console.log("Giving up HLR status check on attempt " + attempts);
                //handlePossiblyInvalidNumber();

                // HLR did not return; assume the best and send the SMS
                //LoadingButtonUpdater.stop();
                view.sendVerificationSMS(id);
            }
        };
        
        var handleInvalidNumber = function() {
            //console.log("Invalid number detected");
            view.$el.find('.promo-popup-content').removeClass('busy');
            if (response.error) {
                view.$el.find('div.pane[data-key="error"] p').html(view.getLang('Common.Error.invalid-phone-number'));
            }
            else {
                view.$el.find('div.pane[data-key="error"] p').html(view.getLang('Common.Error.unknown-error'));
            }
            view.setState('error');
        };

        var attemptCheck = function() {
            $.ajax({
                type: "POST",
                url: '/api/bonusNDB',
                dataType: "json",
                data: {
                    action: 'check-hlr',
                    promotion: model.get('key'),
                    data: data
                }
            }).done(function(response) {
                if (response.status == 'valid') {
                    view.sendVerificationSMS(id);
                    return;
                }
                if (response.status == 'invalid') {
                    handleInvalidNumber();
                    return;
                }
                tryAgain();
            }).fail(function() {
                tryAgain();
            });
        };
        
        attemptCheck();
    },
    
    verifySMS: function(id) {
        var view = this, model = this.model;
        
        var data = {
            id: id
        };
        
        data['forcesms'] = true;
        
        var attempts = 0;
        
        var tryAgain = function() {
            attempts++;
            if (attempts <= 5) {
                //console.log("Checking HLR status, attempt " + attempts);
                setTimeout(attemptCheck, 1000);
                return true;
            }
            else {
                // Assume the SMS was sent - be optimistic!
                handleSentSMS();
            }
        };
        
        var handleUnsentSMS = function() {
            //console.log("Invalid number detected");
            view.$el.find('.promo-popup-content').removeClass('busy');
            view.$el.find('div.pane[data-key="error"] p').html(view.getLang('Common.Error.sms-error'));
            view.setState('error');
        };
        
        var handleInvalidNumber = function() {
            view.$el.find('.promo-popup-content').removeClass('busy');
            view.$el.find('#BonusMobileInputSend').html(view.getLang('Common.Error.invalid-phone-number'));
        };
        
        var handleSentSMS = function() {
            view.$el.find('.promo-popup-content').removeClass('busy');
            view.prepareToInputCode();
            view.$el.find('#BonusMobileInputSend').html('SMS Sent');
        };
        
        var attemptCheck = function() {
            $.ajax({
                type: "POST",
                url: '/api/bonusNDB',
                dataType: "json",
                data: {
                    action: 'check-sms',
                    promotion: model.get('key'),
                    data: data
                }
            }).done(function(response) {
                // Definitely sent - all good
                if (response.status == 'sent') {
                    handleSentSMS();
                    return;
                }
                
                // Try again...
                if (response.status == 'unknown') {
                    tryAgain();
                    return;
                }
                
                // Anything else means failed
                handleUnsentSMS();
                
            }).fail(function() {
                tryAgain();
            });
        };
        
        attemptCheck();
    },
    
    checkVerifyCode: function() {
        var view = this, model = this.model;
        
        var data = {
            verify_code: view.$el.find('#BonusMobileVerifyCode').val()
        };
        
        data['forcesms'] = true;
        view.$el.find('.promo-popup-content').addClass('busy');

        grecaptcha.ready(function() {
            grecaptcha.execute('6Le44b0ZAAAAAEIYgFs-gcfxDwtTtXL7hAUJNnuI').then(function(token) {
                $.ajax({
                    type: "POST",
                    url: '/api/bonusNDB',
                    dataType: "json",
                    data: {
                        action: 'checkSMSCode',
                        promotion: model.get('key'),
                        g_recaptcha_response : token,
                        data: data
                    }
                }).done(function(response) {
                    view.$el.find('.promo-popup-content').removeClass('busy');

                    if (response && response.result) {
                        var result = response.result;

                        if (result.ok) {
                            view.setState('confirm');
                            return;
                        }
                        else {
                            view.$el.find('div.pane[data-key="error"] p').html(result.error);
                            view.setState('error');
                        }
                    }
                    else if (response.ok) {
                        view.setState('confirm');
                        return;
                    }
                    else {
                        view.$el.find('div.pane[data-key="error"] p').html(response.error ? response.error : view.getLang('Common.Error.unknown-error'));
                        view.setState('error');
                    }
                }).fail(function() {
                    view.$el.find('.promo-popup-content').removeClass('busy');
                    view.$el.find('div.pane[data-key="error"] p').html(view.getLang('Common.Error.unknown-error'));
                    view.setState('error');
                });
            });
        });
    },
    
    prepareToInputPhoneNumber: function() {
        // Collapse the other fieldset
        $('#BonusMobileConfirm').addClass('collapsed');
        // Expand this fieldset
        $('#BonusMobileVerify').removeClass('collapsed');
        // Focus the input
        $('#BonusMobileNumber').focus();

        setTimeout(function(){
            $('#BonusMobileNumber').intlTelInput({
                utilsScript: "../js/utils.js",
            });
   
   var userInfo = App.request("sessionInfo");
            $('#BonusMobileNumber').intlTelInput("setNumber", '+'+userInfo['playerInfo']['personal2']['contact']['homePhoneNumber'].replace(/[^0-9]/g, ''));
        },100);
    },
   
    prepareToInputCode: function() {
        // Collapse the other fieldset
        $('#BonusMobileVerify').addClass('collapsed');
        // Expand this fieldset
        $('#BonusMobileConfirm').removeClass('collapsed');
        // Focus the input
        $('#BonusMobileVerifyCode').focus();
    },
    
    prepareForLudicrousSpeed: function() {
    }
});
var PromoPopupViewNDB_Card = PromoPopupView.extend({
 
 events: _.extend(PromoPopupView.prototype.events, {
  'click input[name=auto_address]': 'updateAddressSelection',
  'change input[name=auto_address]': 'updateAddressSelection',
 }),
 
 templateHelpers: function() {
  var view = this;
  var parentTemplateHelpers = PromoPopupView.prototype.templateHelpers.call(view);
  return _.extend(parentTemplateHelpers, {
   'getUserInfo': function(key, defaultValue) {
    var userInfo = App.request("sessionInfo");
    userInfo = userInfo.playerInfo;
    var bits = key.split('.');
    for (var i=0; i<bits.length; i++) {
     if (userInfo.hasOwnProperty(bits[i])) {
      userInfo = userInfo[bits[i]];
     }
     else {
      return defaultValue || null;
     }
    }
    return userInfo;
   }
  });
 },
   
    getLang: function(key) {
        return this.model.get('data').lang[key];
    },
    
    handleClickCTA: function(e) {
        if ($(e.target).attr('id') == 'BonusCardClaim') {
            e.preventDefault();
            this.submitCardDetails();
            return;
        }
        PromoPopupView.prototype.handleClickCTA.apply(this, arguments);
    },

    onRender: function() {
        // 
        PromoPopupView.prototype.onRender.apply(this, arguments);
        
        // Add the fields to the input pane
        var inputPane = this.$el.find('.pane[data-key=input]');
        
        var targetPane = $(inputPane).find('.second');
        
        // Add phone entry point
        var newView = new Backbone.Marionette.ItemView({
            template: '#promo-popup-ndb-card-template',
   templateHelpers: function() {
    return {
     'getUserInfo': function(key, defaultValue) {
      var userInfo = App.request("sessionInfo");
      userInfo = userInfo.playerInfo;
      var bits = key.split('.');
      for (var i=0; i<bits.length; i++) {
       if (userInfo.hasOwnProperty(bits[i])) {
        userInfo = userInfo[bits[i]];
       }
       else {
        return defaultValue || null;
       }
      }
      return userInfo;
     }
    }
   }
        });
        
        $(targetPane).addClass('card-input').html(newView.render().$el);
        
        var view = this;
        /*
        $(targetPane).find('#BonusMobileAgain').click(function(e) {
            e.preventDefault();
            view.prepareToInputPhoneNumber();
        });
        $(targetPane).find('#BonusMobileAlready').click(function(e) {
            e.preventDefault();
            view.prepareToInputCode();
        });
  */
        
        this.updateAddressSelection();
  
  try {
   picturefill();
  }
  catch (e) {
   
  }

    },
 
 updateAddressSelection: function() {
  if (this.$el.find('input[name=auto_address]').prop('checked')) {
   this.$el.find('.address-details-auto').removeClass('hidden');
   this.$el.find('.address-details-manual').addClass('hidden');
  }
  else {
   this.$el.find('.address-details-auto').addClass('hidden');
   this.$el.find('.address-details-manual').removeClass('hidden');
  }
 },
 
 submitCardDetails: function() {
  var view = this;
  
        view.$el.find('.promo-popup-content').addClass('busy');
        
  var postData = view.getFormData();
  
  postData.forcecard = 1;

  $.ajax({
   type: "POST",
   url: '/api/bonusNDB',
   dataType: "json",
   data: {
    action: 'optin',
    promotion: view.model.get('key'),
    data: postData
   }
  }).done(function(data) {
            view.$el.find('.promo-popup-content').removeClass('busy');
   if (data.ok && !(data.result && data.result.error)) {
    view.setState('confirm');
   }
   else {
    view.setState('error');
    if (data.error) {
     view.$el.find('div.pane[data-key="error"] p').html(data.error);
    }
   }
  }).fail(function() {
            view.$el.find('.promo-popup-content').removeClass('busy');
   view.setState('error');
  });
  return;
 }
    
});
var PromotionModel = Backbone.Model.extend({
    defaults: {
        key: 'some-promotion',
        title: 'Some Promotion',
        currentPane: null,
        panes: {}
    }
});
var LoyaltyBoxModel = Backbone.Model.extend({
 defaults: {
  currentStep : 'default',
  redeemErrorCount : 0,
  sliderLength  : 260,
  pointsToRedeem : 0
 },

 initialize: function(options) {
  var model = this,
   showRedeem = model.get('loyaltyBalance') >= 1000,
   isBasePlayer = model.get('tierName') === "base tier",
   isLoggedIn = App.LoginModule.loginModel.get('state') === "Authentication Success",
   isDesktop = Red.DeviceType === "desktop";

  model.set({
   'showRedeemButton' :showRedeem,
   'isBasePlayer' : isBasePlayer,
   'isLoggedIn' : isLoggedIn,
   'isDesktop'  : isDesktop,
   'pointsToRedeem' : model.get('maxPointsToRedeem')
  });
 },

 updateSliderLength : function(sliderLength) {
  var model = this;
  view.model.set('sliderLength',sliderLength);
 }
});
var LoyaltyBoxView = Backbone.Marionette.ItemView.extend({
 template: '#loyalty-box-template',

 events: {
  'click .cta'    : 'setStepAction',
  'mousedown .sliding'    : 'updateSlidingPositionClick',
  'click a[href$="#login"]'   : 'loginButtonClicked',
 },

 modelEvents: {
  'change:loyaltyBalance': 'render'
 },

 onRender : function() {
  var view  = this;
  view.loyaltyInMoney = view.model.get('loyaltyInMoney');
  view.$el.attr('data-step',view.model.get('currentStep'));

  view.handleSliderDrag();

  view.clicking = false;
  $(document).on('mouseup',function(){
   view.clicking = false;
  });
 },

 setStepAction : function(ev) {
  ev.preventDefault();
  var view = this,
   step = $(ev.target).attr('data-step');

  //if user click on submit password, update loyalty points
  if(view.$el.attr('data-step') === "submit") {
   view.updateBonus();
  }

  view.model.set('currentStep',step);
  view.$el.attr('data-step',step);

  if($(ev.target).hasClass('account')) {
   App.appRouter.navigate('account', { trigger: true });
  }
 },

 updateBonus : function() {
  var view = this,
   password = view.$el.find('.confirm-password-input').val();

  if(password.length === 0) {
   view.$el.addClass('has-error');
  } else {
   view.$el.removeClass('has-error');
   view.$el.addClass('show-loader');
   $.ajax({
    type: "POST",
    url: '/api/redeem_points',
    data: {
     'password'   : password,
     'redeemedPoints': view.model.get('pointsToRedeem')
    },
    dataType: "json"
   }).done(function(data) {
    App.Translations.loadTranslation('loyalty-box', function(translations) {
     view.$el.removeClass('show-loader');

     if(data.ok) {
      var redeemResponse = data['redeemResponse'],
       loyaltyBalance = redeemResponse['loyaltyBalance'];

      view.$el.removeClass('has-error');
      view.$el.find('.error').html(data.error);

      view.model.set({
       'currentStep'     : 'default',
       'showRedeemButton' : loyaltyBalance > 1000 ? true:false,
       'redeemErrorCount' : 0,
       'progressBarValue' : (loyaltyBalance*100)/(loyaltyBalance+view.model.get('PointsToNextTier'))
      })

      view.model.set(redeemResponse);
     } else {
      view.$el.addClass('has-error');
      view.$el.find('.error').html(data.error);
      var redeemErrorCount = view.model.get('redeemErrorCount')+1;

      if(redeemErrorCount == 2) {
       view.$el.find('.error').html(translations['check-password']);
      } else if (redeemErrorCount >= 3) {
       view.$el.find('.error').html(translations['logged-out']);
       App.vent.trigger('logout:submit',App.LoginModule.loginModel);
      }

      view.model.set('redeemErrorCount',  redeemErrorCount);
     }
    });
   }).fail(function(){
    view.$el.addClass('has-error');
   });
  }
 },

 handleSliderDrag : function() {
  var view  = this,
   isDragging = false, lastPosX = 0;

  var hammerElem = view.$el.find('.sliding-button').hammer();

  hammerElem.on("panright panleft", function(ev) {
   var target = $(ev.target);
   if (!isDragging) {
    isDragging = true;
    lastPosX = target.position().left;
   }
   coordX = ev.gesture.deltaX+lastPosX;
   view.updateSliderPosition(coordX);
  });

  hammerElem.on("panend", function(ev) {
   isDragging = false;
  });
 },

 updateSlidingPositionClick : function(ev) {
  var view = this,
   target = $(ev.target).closest('.sliding'),
   targetLeftPos = target.offset().left,
   pointerCoordX = ev.clientX,
   coordX = pointerCoordX - targetLeftPos;

  view.clicking = true;
  view.updateSliderPosition(coordX);
 },

 updateSliderPosition : function(coordX) {
  var view = this,
   target = view.$el.find('.sliding-button'),
   sliderLength = view.$el.find('.sliding').width(),
   coordX = coordX < 0 ? 0 : coordX,
   coordX = coordX > sliderLength ? sliderLength-10 : coordX;

  target.css('left',coordX);
  view.$el.find('.red-bar').css('width',coordX);

  //update the amount of money
  var percent = (coordX*100)/sliderLength,
   redeemAmount = Math.ceil((percent/100)*view.loyaltyInMoney/10)*10,
   redeemedPointsAmount = redeemAmount*100;
  if(redeemAmount>view.loyaltyInMoney) {
   redeemAmount = Math.floor(view.loyaltyInMoney/10)*10;
  }

  view.model.set('pointsToRedeem',redeemedPointsAmount);
  view.$el.find('.amount-redeem').html(redeemAmount);
  view.$el.find('.amount-points').html(redeemedPointsAmount)
 },

 loginButtonClicked: function(e) {
  e.stopPropagation();
  e.preventDefault();
  App.vent.trigger('LoginRequested');
 },

});
App.module("LoyaltyBox", function(LoyaltyBox, App, Backbone, Marionette, $) {
    LoyaltyBox.addInitializer(function() {
        //if user is looged in and loyalty box container exist
        if ($.cookie('Auth') && $('.loyalty-box')[0]) {
            $.ajax({
                type: "GET",
                url: "/api/get_loyalty_info",
                dataType: "json",

            }).done(function(response) {

                if (response.ok) {
                    //for desktop
                    LoyaltyBox.loyaltyBoxModel = new LoyaltyBoxModel(response.playerLoyaltyInfo);
                    if($('.homepage-slideshow .loyalty-box')[0]) {
                        LoyaltyBox.renderLoyaltyBox('homepage-slideshow .loyalty-box');
                    }

                    //for mobile
                    if($('.menu-content .loyalty-box')[0]) {
                        LoyaltyBox.renderLoyaltyBox('menu-content .loyalty-box');
                    }
                }
            })
        }

        //desktop loyalty box - dispalyed when user clicks on diamond icon in top menu
        App.vent.on('show:top-loyalty-box',function(container){
            LoyaltyBox.renderLoyaltyBox(container)
        });

        LoyaltyBox.renderLoyaltyBox = function(container) {
            LoyaltyBox.loyaltyBoxView = new LoyaltyBoxView({
                el : $('.'+container),
                model: LoyaltyBox.loyaltyBoxModel
            }).render();
        }
    });
});
/**
 * Created by alexandra.zlatea on 22/10/2016.
 */
var PeekabooModel = Backbone.Model.extend({
    defaults: {
        image: '',
        game_id: '',
        content: '',
        mute: false,
        offerID:'',
        type : '' ,
        amount : '' ,
        hasClaimed : 0,
        description: '',
        sound: false,
        color: '#000'
    },

    initialize: function() {
        var model = this,
            userData = JSON.parse($.cookie('User'));
        model.set('username', userData.username);

        if ($.cookie('mute')) {
            model.set('mute', true);
        }
    },
});

/**
 * Created by alexandra.zlatea on 21/10/2016.
 */
var PeekabooView = Backbone.Marionette.ItemView.extend({
    template: '#peekaboo-template',

    events: {
        'click .close-peekaboo'                     : 'closePeekaboo',
        'click  button.cta'                         : 'claim',
        'click .simple'                             : 'claim',
        'click .cta.remove-player-group'            : 'removePlayerGroup',
        'click .cta a[href$="#login"]'              : 'loginButtonClicked',
        'click .mute'                               : 'mute',
        'click .unmute '                            : 'unmute',
        'click .close-btn'                          : 'closeFreeGames'
    },

    modelEvents: {
        'change:content': 'render',
    },

    initialize: function () {
        var view = this;
        model = view.model;

        if (model.get('sound') == true) {
            sound = new Howl({
                src: ['/AntAndDec/sounds/' + model.get('key') + '.mp3']
            });
        }

        if (model.get('color') != '' ) {
            $('.peekaboo-inner').css({'color': model.get('color')});
            $('.peekaboo-inner .open-popover').css({'color': model.get('color')});
        }

        this.model.on('change', this.render, this);
    },

    onRender: function () {
        var view = this,
            model = this.model;

        $('.peekaboo-inner').animate({
            right: '0'
        }, 1000);

        $.cookie(model.get('key')+'-displayed',1);
        if (model.get('sound') == true) {
            if (!$.cookie('mute')) {
                sound.play();
            }
        }
    },

    loginButtonClicked: function (e) {
        e.stopPropagation();
        e.preventDefault();
        App.vent.trigger('LoginRequested');
    },

    closePeekaboo: function (e) {
        $('.peekaboo-inner').animate({
            right: '-323px'
        }, 1000);

        e.preventDefault();
        e.stopImmediatePropagation();

        var options = {'path': '/'};

        if (!$.cookie('show-' + model.get('key'))) {
            $.cookie('show-' + model.get('key'), 1, options);
            $.cookie('peekaboo-date', Math.floor(Date.now() / 1000), options);
        } else {
            var nrOfclicks = $.cookie('show-' + model.get('key'));
            nrOfclicks++;
            $.cookie('show-' + model.get('key'), nrOfclicks, options);
            $.cookie('peekaboo-date', Math.floor(Date.now() / 1000), options);
        }

        $('.peekaboo-inner').remove();

        setTimeout(function(){
            $.cookie(model.get('key')+'-displayed',0);
        },10000);
    },

    removePlayerGroup: function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var view = this;
        var key = model.get('key');
        view.$el.addClass('show-loader');
        $('.peekaboo-inner').animate({
            right: '-323px'
        }, 1000);
        $.ajax({
            type: "GET",
            url: "/api/removePlayerGroup",
            dataType: "json",
            data: {model: model.get('key'), group: 'PeekBoo'},
            async: false
        }).done(function (data) {
            if (data) {
            }
        }).fail(function () {
            // console.log('Failed loading game');
        });
        var href = $('.remove-player-group').attr('href');
        $('.peekaboo-inner').remove();
        view.$el.removeClass('show-loader');
        window.location.href = href;
    },

    claim: function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var view = this,
            key = model.get('key');

        if (model.get('offerID') != '') {
            this.optin();
        } else {
            view.$el.addClass('show-loader');

            $('.peekaboo-inner').animate({
                right: '-323px'
            }, 1000);

            $.ajax({
                type: "GET",
                url: "/api/AddPlayerToGroups",
                dataType: "json",
                data: {model: model.get('key'), group: 'PeekBoo'},
                async: false
            }).done(function (data) {}).fail(function () {});

            var href = $('.peekaboo-box .cta').attr('href');
            if (href != undefined) {
                window.location.href = href;
            }

            $('.peekaboo-inner').remove();
            view.$el.removeClass('show-loader');
        }
    },

    optin: function (e) {
        var view = this,
            claimButtonClicked = 'false';

        if (Util.manageStorage('get', 'claimButtonClicked')) {
            claimButtonClicked = Util.manageStorage('get', 'claimButtonClicked');
        }

        if (claimButtonClicked == 'false') {
            Util.manageStorage('set', 'claimButtonClicked', 'true');
            view.$el.addClass('show-loader');

            $.ajax({
                type: "POST",
                url: "/api/claim_free_games",
                dataType: "json",
                data: model.toJSON()
            }).done(function (data) {
                Util.manageStorage('set', 'claimButtonClicked',  false);
                if (data.existingGroup == false) {
                    PeekabooView.FreeSpinsHeader = new FreeSpinsHeader({
                        nrGamesLeft: data.nrGamesLeft,
                        message: data.message,
                        title: data.title
                    });

                    $('.free-games-pop-up').append(PeekabooView.FreeSpinsHeader.render().el);

                    if (model.get('type') != 'bonus') {
                        App.vent.trigger('display:free-games', data.returnFreeGames['games'], $('.free-games-pop-up .content'));
                    }
                }
                view.$el.removeClass('show-loader');
                $('.peekaboo-inner').addClass('display-none');
                App.vent.trigger('promotion:optin',view.model.get('key'),'peek-a-boo');
            });

        }
    },

    mute: function () {
        $('.mute').addClass('display-none');
        $('.unmute').removeClass('display-none');
        sound.pause();
        $.cookie('mute', true);
    },

    unmute: function () {
        $('.unmute').addClass('display-none');
        $('.mute').removeClass('display-none');
        $.removeCookie('mute');
    },


});

/**
 * Created by alexandra.zlatea on 21/10/2016.
 */

App.module("Peekaboo", function(Peekaboo, App, Backbone, Marionette, $) {
    Peekaboo.addInitializer(function() {
        App.vent.on('get:sessionInfo', function(data) {
            var loggedin = Peekaboo.isLoggedIn();
            if (loggedin == false)
            {
                Peekaboo.renderPeekaboo(data);
            }
        });
        App.vent.on('ping:received',function(data){
            Peekaboo.renderPeekaboo(data);
        });
    });

    Peekaboo.isLoggedIn = function() {
        return App.LoginModule.loginModel.get('state') === "Authentication Success";
    },

    Peekaboo.renderPeekaboo = function(data) {
        if (window.Red && window.Red.PageFlags && window.Red.PageFlags.responsible) { 
            return;
        }
        if (data['notifications'] && data['notifications']['peekaboo'] != undefined) {
            Peekaboo.peekabooModel = new PeekabooModel(data['notifications']['peekaboo'][0]);
            //for desktop
            if ($('.peekaboo-box')[0] && (data['notifications']['peekaboo'][0] != undefined)) {
                if  (!$('.peekaboo-inner')[0]) {
                    var imgFiles = [
                        data['notifications']['peekaboo'][0]['path']+'/img/peekaboo/desktop/'+data['notifications']['peekaboo'][0]['image']+'.png'
                    ];

                    Util.loadImages(imgFiles, function() {
                        Peekaboo.peekabooView = new PeekabooView({
                            el: $('.peekaboo-box'),
                            model: Peekaboo.peekabooModel,
                    }).render();}, function(){console.log('error in loading the images');});

                }
            }
        }
    }
});

/**
 * Created by alexandra.zlatea on 22/10/2016.
 */
var InGameModel = Backbone.Model.extend({
    defaults: {
        display_to: '',
        key : '',
        content: '',
        side_text: ''
    },

    initialize : function() {
        var model = this;
        if (model.get('opted_in')) {
            var content = model.get('contentCongrats');
            model.set('content', content);
        }
    }
});




/**
 * Created by alexandra.zlatea on 21/10/2016.
 * TODO Refactor
 */
var InGameView = Backbone.Marionette.ItemView.extend({
    template: '#inGameBanner-template',

    events: {
        // 'click .InGameBanner-inner .cta'        : 'optin',
        'click .doNotShow span'                 : 'doNotShow',
        'click .icon-arrow-left'                : 'showInGameBanner',
        'click .icon-arrow-right'               : 'hideInGameBanner',
        'click .bonus-optin .cta'               : 'optin',
    },

    initialize : function() {
        var view= this,
            model = view.model,
            inGameHeight = $('.inGameBanner').innerHeight(),
            deadline = model.get('active_to');

        model.set('inGame', model.get('game_id') === model.get('current_game_id'));
        model.set('liveGame', inGameHeight > 760);

        view.initializeClock('clockdiv', deadline);
    },

    onRender: function(){
        var view = this;

        $('.inGameBanner').animate({ right: '0px' }, 1000);

        var background = view.model.get('path')+'/img/in-game-banner/desktop/'+view.model.get('img')+'.jpg';

        $('.inGameBanner-box').css({ 'background-image':'url(' + background + ')' });
        setTimeout(function(){
            $('.inGameBanner-box').css({'background':background});
        },1200);

        //display the wins boost -- commented out for now as CRM changed their mind
        // App.vent.trigger('display:win-boost');
    },

    showInGameBanner: function () {
        $('.small-box').hide();
        $('.InGameBanner-inner').show();
        $('.inGameBanner').css({"width":"280px"});
        $('.inGameBanner-box').addClass("showInGame");
        $('.inGameBanner-box').removeClass("hideInGame");
        $('#game-wrapper').css({"right":"280px"});

    },

    hideInGameBanner: function () {
        $('.small-box').show();
        $('.InGameBanner-inner').hide();
        $('.inGameBanner').css({"width":"40px"});
        $('.inGameBanner-box').addClass("hideInGame");
        $('.inGameBanner-box').removeClass("showInGame");
    },


    initializeClock: function(id, endtime, setInter) {
        var view = this;
        var clock = document.getElementById(id);

        var intervalListener=  setInterval(function(){
            var t = view.getTimeRemaining(endtime);

            daysSpan = $('.days');
            hoursSpan = $('.hours');
            minutesSpan =  $('.minutes');
            secondsSpan =  $('.seconds');
                daysSpan.text(('0' + t.days).slice(-2));
                hoursSpan.text(('0' + t.hours).slice(-2));
                minutesSpan.text(('0' + t.minutes).slice(-2));
                secondsSpan.text(('0' + t.seconds).slice(-2));

            if (t.total <= 0) {
                clearInterval(intervalListener);
            }
        }, 1000);

    },

    getTimeRemaining: function(endtime) {

        var t = Date.parse(endtime) - Date.now();
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        var days = Math.floor(t / (1000 * 60 * 60 * 24));
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    },

    optin: function(e) {
        var view = this;
        e.preventDefault();
        e.stopImmediatePropagation();

        var tmpData = $('.bonus-optin form').serializeArray().reduce(function(obj, item) {
            if(item.name == "bonus") {
                obj["bonus"] = item.value;
            }
            return obj;
        }, {});

        var userData = JSON.parse($.cookie('User'));
        tmpData['username'] = userData.username;
        tmpData['ajax'] = true;
        tmpData['getGames'] = true;
        tmpData['offerID'] = "";
        tmpData['description'] = "";


        view.$el.addClass('show-loader');
            
        $.ajax({
            type: "POST",
            url: "/api/exit_banner_optin",
            dataType: "json",
            data: tmpData
        }).done(function(data) {
            var newContent = view.model.get('contentCongrats');
            view.$el.find('.content').html(newContent);
            view.$el.removeClass('show-loader');
            view.$el.addClass('congrats');
            //check for 'claim' class in div set optInText accordingly
            var optInText = 'promotion:optin';
            
            if($('.bonus-optin').hasClass('claim')) { 
                optInText = 'bonus:optin'; 
            }
            App.vent.trigger(optInText,item.value,'in-game-banner');
        });
    },

    doNotShow: function(e) {
        $.ajax({
            type: "GET",
            url: "/api/AddPlayerToGroups",
            dataType: "json",
            data: {key: 'do-not-show-game-banner'}
        }).done(function (data) {
              $('.inGameBanner').hide();

        }).fail(function () {
             // console.log('Failed');
        });
    }

});
/**
 * Created by alexandra.zlatea on 21/10/2016.
 */

App.module("InGameBanner", function(InGameBanner, App, Backbone, Marionette, $) {
    InGameBanner.addInitializer(function() {
        App.vent.on('display:in-game-banner', function(data) {
            id = data;
            var loggedin = InGameBanner.isLoggedIn();
            InGameBanner.pauseReload = false;

            if ( loggedin === false ) {
                pingData = {notifications: ['inGameBanner','exitBanner']};
                $.ajax({
                    type: "GET",
                    url: "/api/status",
                    dataType: "json",
                    data: pingData
                }).done(function (data) {
                    if (data['ok'] !== false) {
                        App.vent.trigger('ping:received',data);
                    } else {
                        $('.inGameBanner-box').hide();
                    }

                }).fail(function () {
                    // console.log('Failed loading game');
                });
            }
            App.vent.on('reload:in-game-banner', function(data) {
                $.ajax({
                    type: "GET",
                    url: "/api/status?notifications[]=inGameBanner",
                    dataType: "json",
                    data: {}
                }).done(function (data) {
                    if (data['ok'] !== false) {
                        InGameBanner.verifyData(data, id, true);
                    } else {
                        $('.inGameBanner-box').hide();
                    }

                }).fail(function () {
                    // console.log('Failed loading game');
                });
            });
            App.vent.on('get:sessionInfo', function (data) {
                InGameBanner.verifyData(data, id, false);
            });

            App.vent.on('ping:received', function (data) {
                if(InGameBanner.pauseReload !== true)
                    InGameBanner.verifyData(data, id, true);
            });

            App.vent.on('in-game-banner:pause', function (data) {
                InGameBanner.pauseReload = data.state;
            });

            App.vent.on('change:model', function(data) {
                InGameBanner.renderGameBanner(data.toJSON(), true);
            });
        });
    });


    InGameBanner.renderGameBanner = function(data, ping) {

        InGameBanner.inGameModel = new InGameModel(data);
        //for desktop
        if ($('.inGameBanner-box')[0] ) {
            if  (!$('.InGameBanner-inner')[0] || ping == true) {
                if (InGameBanner.inGameModel.get('showOnallGames') || InGameBanner.inGameModel.get('current_game_id') == InGameBanner.inGameModel.get('game_id')) {
                    InGameBanner.inGameView = new InGameView({
                        el: $('.inGameBanner-box'),
                        model: InGameBanner.inGameModel
                    }).render();
                }
            }
        }
    };
    InGameBanner.isLoggedIn= function() {
        return App.LoginModule.loginModel.get('state') === "Authentication Success";
    };

    InGameBanner.verifyData = function(data, id, ping) {
        if (data['notifications'] && data['notifications']['inGameBanner'] != undefined && data['notifications']['inGameBanner'] != '') {
            data['notifications']['inGameBanner'][0]['current_game_id'] = id;
            InGameBanner.renderGameBanner(data['notifications']['inGameBanner'][0], ping);
        }
    }
});
var InterruptivePopupModel = Backbone.Model.extend({
    defaults: {
        'launchedGameID' : 0
    },

    initialize: function() {
        
    },
});

/**
example of how buttons can be used in cms pages
<div class="buttons">
<a class="cta big" href="#document-verification" data-action="close"> - close popover and opens another one
<a class="cta big popup-button" href="#" data-action="claim">- add user to claim group
<a class="cta big popup-button" href="#" data-action="close"> - close the popover
<a class="cta big popup-button" href="#" data-action="log-out"> - log-out the user
<a class="cta big deposit popup-button" href="#deposit"  data-action="go-to-banking"> - force launch banking
<a class="cta big deposit popup-button" href="#deposit"  data-action="launch-opened-game"> - force launch game
</div>

there are 5 types of popovers that can be displayed:
'block_game'            - every time when a user launch a game - this is also done in backend - GamesLaunchController.php
'block_bank'            - every time when a user launch banking - this is also done in backend - SwiftController.php
'display_on_game'       - when a user launch a game,
                        - displayed based on what option is chosen in bikini CMS(1/day|| 1/week || 1/month)
'display_on_bank'       - when a user launch banking,
                        - displayed based on what option is chosen in bikini CMS(1/day|| 1/week || 1/month)
'display_after_login'   - displayed after login or on the first status call
*/

App.module("InterruptivePopup", function(InterruptivePopup, App, Backbone, Marionette, $) {
    InterruptivePopup.addInitializer(function() {
        //on first status call after login, we check if we have any popovers to show
        App.vent.on('get:sessionInfo', function(data) {
            if(InterruptivePopup.isLoggedIn() && data['notifications'] && data['notifications']['interruptivePopup'] && data['notifications']['interruptivePopup'][0]) {
                Red.BankingInterruptivePopovers = _.where(data['notifications']['interruptivePopup'], {display_on_bank : true})[0] || [];
                Red.GameInterruptivePopovers = _.where(data['notifications']['interruptivePopup'], {display_on_game : true})[0] || [];
                var afterRefreshPopover = _.where(data['notifications']['interruptivePopup'], {display_after_login : true})[0] || [];
                App.vent.trigger('display:interruptive-popup',afterRefreshPopover);
            }
        });
        App.vent.on('ping:received', function(data) {
            if(data['notifications']['interruptivePopup'].length){
                var psedsData =_.find(data['notifications']['interruptivePopup'], function(a,b){ if(a['key'] === 'PSEDS'){ return a; } });
                if(psedsData === undefined) { return; }

                App.vent.trigger('display:interruptive-popup', psedsData);
            }
        });
    });

    InterruptivePopup.isLoggedIn = function() {
        return App.LoginModule.loginModel.get('state') === "Authentication Success";
    };


    App.vent.on('display:interruptive-popup:block-game', function(url,refreshOnClose) {
        var site = '32Red';
        if(!$('.responsive-popover-wrapper.interruptive-popup')[0]) { 
            App.vent.trigger('show:popover',{
                content : "<div class='sportsbook-overlay-content-bonus'><h1 class='popover-header'>"+site+"</h1><div></div></div>",
                extraClass : "sportsbook-overlay excluded-games",
                maxWidth : 640,
                maxHeight : 300,
                showCloseButton : true,
                closeClickOutside :true,
                noScroll: true,
                showCallback : function() {
                    var overlayContent = $('.sportsbook-overlay-content-bonus > div');
                    App.vent.trigger('show:preloader', '.sportsbook-overlay-content-bonus > div');
                    overlayContent.load(url);
                },
                closeCallback : function () {
                    if(refreshOnClose) {
                        App.appRouter.navigate("/", {trigger: true});
                        window.location.reload();
                    }
                }
            });
        }
    });

    App.vent.on('display:interruptive-popup:status-provisional', function() {
        if(!$('.responsive-popover-wrapper.interruptive-popup')[0]) { 
            App.vent.trigger('show:modal',{
                model : {
                    extraClass                  : 'interruptive-popup',
                    size                        : 'large',
                    showCloseButton             : true,
                    headerImageType             : 'none'            
                }, showCallback : function() {
                    $('.interruptive-popup .modal-content').load("/game-launch/kycfailed #container");
                },
            });
        }
    });

    App.vent.on('display:interruptive-popup:rg-message', function(url) {
        if(!$('.responsive-popover-wrapper.interruptive-popup')[0]) {
            App.vent.trigger('show:modal',{
                model : {
                    extraClass                  : 'interruptive-popup',
                    size                        : 'large',
                    showCloseButton             : true,
                    headerImageType             : 'none'
                },
                showCallback : function() {
                    $('.interruptive-popup .modal-content').load(url);
                },
            });
        }
    });

    //display interruptive message
    App.vent.on('display:interruptive-popup', function(popoupData) {
        if(!popoupData['key'] || $('.interruptive-popup')[0]) {
            return;
        }
        InterruptivePopup.interruptivePopupModel = new InterruptivePopupModel(popoupData);
        var cookieKey = 'display_times-ip-'+InterruptivePopup.interruptivePopupModel.get('key').replace(/\s+/g, '');
        if(typeof $.cookie(cookieKey) === 'undefined') {
            App.vent.trigger('show:modal',{
                model : {
                    extraClass                  : 'interruptive-popup',
                    size                        : 'large',
                    showCloseButton             : true,
                    headerImageType             : 'none'
                },

                showCallback : function() {

                },

                //do whatever action is required on close
                hideCallback: function() {
                    switch(InterruptivePopup.interruptivePopupModel.get('close_button_action')) {
                        case 'log-out':
                            App.LoginModule.loginModel.set('state', App.LoginModule.loginModel.notAuthState);
                            $.removeCookie('Auth');
                            break;
                        case 'add-to-claim':
                            InterruptivePopup.InterruptivePopupView.addToGroup();
                            break;
                        case 'remove-from-group':
                            InterruptivePopup.InterruptivePopupView.removeFromGroup();
                            break;
                        case 'continue':
                            //do something
                            break;
                    }
                },
            });

            //render the content
            InterruptivePopup.InterruptivePopupView = new InterruptivePopupView({
                el: $('.interruptive-popup .modal-content'),
                model : InterruptivePopup.interruptivePopupModel,
            }).render();

            //Triggered when interruptive popup finished rendering
            App.vent.trigger('rendered:InterruptivePopup', InterruptivePopup.interruptivePopupModel);

        }
    });
});

var InterruptivePopupView = Backbone.Marionette.ItemView.extend({
    template: '#interruptive-popup',

    events: {
        'click .cta.popup-button'                          : 'buttonAction',
        'click a[data-action="close"]'                     : 'buttonAction',
        'click .remove-from-group'                          : 'removeFromGroup'
        
    },

    initialize: function () {
        var view = this;
        model = view.model;
    },

    onRender: function () {
        var view = this,
            model = this.model;
        // when we display the popover, we setup a cookie, so we don't show
        // the modal until next login or until the cookie is expiring
        if(model.get('display_times') === 0) {
            if(model.get('display_after_login')) {
                view.setCookie('show-ip-',30);
            }
        } else {
            view.setCookie('display_times-ip-',model.get('display_times'));
        }
        if(model.get('close_button_action') == 0) {
            $('a.icon.close-btn').addClass('hide');
        }
    },

    buttonAction : function(ev) {
        ev.stopPropagation();
        ev.preventDefault();

        var view = this,
            target = $(ev.target);
            action = target.attr('data-action');

        switch(action) {
            case 'log-out':
                App.LoginModule.loginModel.set('state', App.LoginModule.loginModel.notAuthState);
                $.removeCookie('Auth');
                view.closePopup();
                break;
            case 'claim':
                view.addToGroup();
                break;
            case 'close':
                view.closePopup();
                var navTo = target.attr('href');
                App.appRouter.navigate(navTo,{trigger:true});
                break;
            case 'go-to-banking':
                view.closePopup();
                launchBanking(true);
                break;
            case 'pgmove':
                var groupKey = target.attr('data-pg'),
                    doNav = target.attr('data-nav');
                //add player to group
                view.addToStaticGroup(groupKey);
                //check if link should go somewhere else and redirect
                if (typeof doNav !== typeof undefined && doNav !== false) {
                    window.location.href = target.attr('href');
                } else {
                    window.location.reload();
                }
                break;
            case 'launch-opened-game':
                if(view.model.get('launchedGameID') > 0) {
                    view.closePopup();
                    var navTo = '#gameplay/'+view.model.get('launchedGameID');
                    Red.allowGameLaunch = true;
                    App.appRouter.navigate(navTo,{trigger:true});
                }
                break;
        }
    },

    addToStaticGroup : function(groupKey) {
        var view = this;
        // this will add the user to a player group on click
        // the group will be read from config (UserGroup.groupKey)
        // key will be specified in the link using "data-pg" attribute
        var key = "OptinGroups."+groupKey;
        view.$el.find('.loader').show();
        $.ajax({
            type: "GET",
            url: "/api/addToPlayergroup",
            dataType: "json",
            data: {groupKey: key}
        }).done(function () {
            view.$el.find('.loader').hide();
        });
    },

    addToGroup : function() {
        var view = this,
            bonusKey = view.model.get('key');
        view.$el.find('.loader').show();
        $.ajax({
            type: "POST",
            url: "/api/interruptivePopupClaim",
            dataType: "json",
            data: {bonusKey: bonusKey}
        }).done(function (data) {
            view.$el.find('.loader').hide();
            view.closePopup();
        });
    },
    removeFromGroup : function() {
        var view = this,
            bonusKey = view.model.get('key');
        view.$el.find('.loader').show();
        $.ajax({
            type: "POST",
            url: "/api/interruptivePopupRemoveFromGroup",
            dataType: "json",
            data: {bonusKey: bonusKey}
        }).done(function (data) {
            view.$el.find('.loader').hide();
            view.closePopup();
        });
    },

    setCookie : function(cookiePrefix,cookieExpireDate) {
        var view = this,
            model = this.model,
            expireDate = ""+cookieExpireDate,
            cookieExpire = new Date();

        if (expireDate.search('min') >= 0){
            expireDate = expireDate.replace('min','');
            cookieExpire.setMinutes(cookieExpire.getMinutes() + parseInt(expireDate));
        }else{
            cookieExpire = cookieExpireDate;
        }
        $.cookie(cookiePrefix+model.get('key').replace(/\s+/g, ''),'true', { expires: cookieExpire });

    },

    closePopup : function(event) {
        App.ResponsiveModal.modalView.closeModal();
        this.bind("reset", this.updateView());
    },

    updateView: function() {
        var view = this;
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.remove();
    },
});

var AchievementsPromoItem = Backbone.Model.extend({
    defaults: {
        'game_name': '',
        'game_slug': '',
        'id': '',
        'stepsStatus' : {
            '0' : false,
            '1' : false,
            '1' : false
        }
    },
    idAttribute: "_id",
});

var AchievementsPromoCollection = Backbone.Collection.extend({
    model: AchievementsPromoItem,
    initialize: function() {
        var collection = this;
    }
});
App.module("AchievementsPromoModule", function(AchievementsPromoModule, App, Backbone, Marionette, $) {
    AchievementsPromoModule.addInitializer(function() {
        App.vent.on('display:achievements-table',function(promoKey, categoryId){
            var sendData = {};
                sendData['promoKey'] = promoKey;
                sendData['categoryId'] = categoryId;
            $.ajax({
                type: "POST",
                url: '/api/achievements_config',
                dataType: "json",
                data: sendData,
            }).done(function (data) {
                var promoConfig = data['promoConfig'],
                    achievementsPerStep = data['achievementsPerStep'],
                    timeLeft = data['timeLeft'],
                    fullContent = data['fullContent'];
                AchievementsPromoModule.AchievementsPromoModel = new AchievementsPromoCollection(promoConfig);
                AchievementsPromoModule.renderAchievementsTable(promoConfig, timeLeft, achievementsPerStep, fullContent);
            }).fail(function () {
            });

        });
    });

    AchievementsPromoModule.renderAchievementsTable = function(promoConfig, timeLeft, achievementsPerStep, fullContent) {
        if($('.achievements-table')[0]) {
            var $el = $('.achievements-table');
            AchievementsPromoModule.AchievementsPromoModel = new AchievementsPromoCollection(promoConfig);
            App.addRegions({ achievementsTable: $el });
            
            AchievementsPromoModule.achievementsPromoView = new AchievementsPromoView({
                collection : AchievementsPromoModule.AchievementsPromoModel,
                timeLeft : timeLeft,
                achievementsPerStep : achievementsPerStep,
                fullContent : fullContent
            });

            App.achievementsTable.show(AchievementsPromoModule.achievementsPromoView);
        }
    }
});
var AchievementsPromoViewItem = Backbone.Marionette.ItemView.extend({
    template: '#achievements-promo-table',
    tagName: 'div',
    className: 'game-row clearfix',

        templateHelpers: function() {
        var view = this;
        return {
            'isFullContent': function() {
                return view.model.get('fullContent');
            },
        }
    },

    onRender: function() {
        var view = this;
        var gameAchievementStatus = view.model.get('stepsStatus');  

        $('.achievements-promo-wrapper').removeClass('show-loader');

        this.$el.find('img').unveil(200, function() {
          $(this).load(function() {
            this.style.opacity = 1;
          });
        });
        view.setAchievements(gameAchievementStatus);
    },

    setAchievements : function(gameAchievementStatus) {
        var view = this;
        view.$el.find('li.star').each(function(index){
            var currentStatus = gameAchievementStatus[index],
                elem = $(this);
            elem.addClass(currentStatus);
            
            setTimeout(function(){
                elem.addClass('transformed');
            },Math.floor((Math.random() * 2500) + 500));

            elem.hover(
              function() {
                $(this).addClass('hover');
              }, function() {
                $(this).removeClass('hover');
              }
            );
        });
    }
});

var AchievementsPromoView = Backbone.Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: AchievementsPromoViewItem,

    initialize : function(options) {
        var view = this;
        view.timeLeft = options['timeLeft'];
        view.achievementsPerStep = options['achievementsPerStep'];
        view.fullContent = options['fullContent'];
    },

    onRender: function() { 
        var view = this;
        view.setTimer(view.timeLeft);
        view.displayStepsStatus(view.achievementsPerStep)
    },

    displayStepsStatus : function(stepsStatus) {
        var view = this;
        var achievemntsCountHolder = $('.achievements-count');

        achievemntsCountHolder.find('li').each(function(index){
            var elem = $(this);
            var doneAchievements = stepsStatus['status'][index],
                maxSteps = stepsStatus['totalGames'];

            elem.find('.completed-no').html(doneAchievements);
            elem.find('.max-step-no').html(maxSteps);
        });
    },
    
    setTimer: function(timeleft) {
        if(timeleft == "expired") {
            $('.expired-text').show();
            $('.user-timer').addClass('expired');
            return;
        }

        if(timeleft != "-1") {
            timeleft = timeleft.split('-');
            var interval = 1000,
                duration = moment.duration({
                    days: timeleft[0],
                    hours: timeleft[1],
                    minutes: timeleft[2],
                    seconds: timeleft[3],
                });
            var $holder = $('.user-timer');
            var clockTimerId = setInterval(function(){
                duration = moment.duration(duration - interval, 'milliseconds');
                if(duration['_milliseconds'] >= 0) {
                    $holder.find('.days-count, .hours-count, .minutes-count, .seconds-count').html('');
                    $holder.find('.days-count').append(duration.days());
                    $holder.find('.hours-count').append(duration.hours());
                    $holder.find('.minutes-count').append(duration.minutes());
                    $holder.find('.seconds-count').append(duration.seconds());
                    $holder.removeClass('hidden');
                }
            }, interval);
        }
    },
});

var BoostWinsModel = Backbone.Model.extend({
    defaults: {
        'currentPercentage' : 0,
        'buttonIcon' : 'icon-lock'
    },

    initialize : function (options) {
        var model = this;
        model.set('buttonIcon', model.getButtonIcon(options['currentPercentage']));
        model.set('buttonText', model.getButtonText());
    },

    /*
    * decide what text to display in the button based
    * on the amount that the user can claim and the status of the promotion
    */
    getButtonText : function() {
        var model = this,
            text = 'Claim </br>';

        //if eligbile but not oped in
        if(model.get('status') === 'eligible') {
            return "Please Opt In";
        }
        if(model.get('canClaim')>0) {
            text += model.get('currency')+model.get('canClaimValue');
        } else {
            text = "No </br> Boost";
        }

        return text;
    },
    /*
    * decide which icon to display in the claim button depending on user status;
    */
    getButtonIcon : function (currentPercentage) {
        return currentPercentage < 25 ? 'icon-exclamation-triangle':'icon-bolt';
    }
});
App.module("BoostWins", function(BoostWins, App, Backbone, Marionette, $) {
    App.vent.on('ping:received',function(data){
        //don;t update the view if status call was stopped.
        if(App.stopStatusCall) {
            return;
        }

        if(data['boostWinsInfo']) {
            //set the model
            if(BoostWins.BoostWinsModel) {
                BoostWins.BoostWinsModel.set(data['boostWinsInfo']);
            } else {
                BoostWins.BoostWinsModel = new BoostWinsModel(data['boostWinsInfo']);
                BoostWins.renderBoost();
            }

            //if user can claim and widget is not already rendered
            //we only display this in game play area.
            if(data['boostWinsInfo']['canClaim'] > 0 && $('#game-player #game-wrapper').length !== 0) {
                //display the popover only if the user can claim something
                if(BoostWins.BoostWinsModel && (BoostWins.BoostWinsModel.get('renderedLevel') !== data['boostWinsInfo']['currentLevel'])) {
                    App.vent.trigger('show:modal',{
                        model : {
                            extraClass                  : 'boost-wins-wrapper',
                            size                        : 'small',
                            showCloseButton             : true,
                            hasHeader                   : true,
                            headerImageType             : 'none'
                        },

                        showCallback : function () {
                            setTimeout(function () {
                                BoostWins.renderBoost();
                                BoostWins.BoostWinsModel.set('renderedLevel',data['boostWinsInfo']['currentLevel']);
                                App.vent.trigger('winBoost:displayed');
                            },100);
                        },

                        hideCallback:function () {
                            App.vent.trigger('winBoost:closed');
                        }
                    });
                }
            }
        }
    });

    App.vent.on('display:win-boost',function () {
        App.InGameBanner.pauseReload = true;
        BoostWins.renderBoost();
    });

    BoostWins.renderBoost = function() {
        var el =  $('.boost-wins-wrapper .modal-content')[0] ? '.boost-wins-wrapper .modal-content': '.boost-wins-wrapper';
        BoostWins.BoostWinsView = new BoostWinsView({
            el : $(el),
            model : BoostWins.BoostWinsModel
        }).render();
    };
});
var BoostWinsView = Backbone.Marionette.ItemView.extend({
    template: '#boost-wins-widget',

    tagName: 'div',

    events: {
        'click .boost-optin' : 'creditUser'
    },

    modelEvents: {
        'change:currentPercentage': 'updateView',
        'change:status': 'updateView',
        'change:claimed': 'updateView',
    },

    onRender : function() {
        var view = this;
    },

    /*
    * update view when model is changing
     */
    updateView: function() {
        var view = this,
            model = view.model;
        model.set('buttonIcon', model.getButtonIcon(model.get('currentPercentage')));
        model.set('buttonText', model.getButtonText());

        view.render();
    },

    /*
    *  credit user
     */
    creditUser : function (ev) {
        ev.preventDefault();
        var view = this;

        //if there's nothing to claim do nothing
        if(view.model.get('canClaim') === 0) {
            return;
        }
        view.$el.closest('.boost-wins-wrapper').addClass('show-loader');
        App.stopStatusCall = true;
        $.ajax({
            type: "POST",
            url: '/boost-winnings/do-boost',
            dataType: "json",
        }).done(function(data) {
            view.$el.closest('.boost-wins-wrapper').removeClass('show-loader');
            if(data.ok) {
                if(data['boostInfo']) {
                    //update model
                    view.model.set(data['boostInfo']);
                } else {
                    //just in case the modal is still opened, close it.
                    App.vent.trigger('close-modal');
                }
                setTimeout(function () {
                    App.stopStatusCall = false;
                },10000);

            }
        });
    }
});

    App.module("GamesModule", function(GamesModule, App, Backbone, Marionette, $) {

    GamesModule.addInitializer(function(options) {
        GamesModule.latestSelectedGames = new GameModelCollection();
        GamesModule.SportbookMobileGames = new GameModelCollection();
    });

    //get the desktop games with ajax
    App.vent.on('get:viper_games', function(){

        var url = '/gamesApi/games/'+109;

        var callGames = $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            data: {}
        });
        var callRecommendationsGames = $.ajax({
            type: "GET",
            url: '/gamesApi/gamesApi/'+756,
            dataType: "json",
        });
        $.when(callGames, callRecommendationsGames).done(function(games,callRecommendationsGames){
            App.vent.trigger('games_viper:received',games,callRecommendationsGames);
        });
    });

    //use the games for what we need
    App.vent.on('games_viper:received', function(data, callRecommendationsGames){
        //set up the collection for latest played games in game player area
        //GamesModule.gameCategoriesCollection = new GameCategoryCollection(data['game']);
        GamesModule.latestGames = new GameModelCollection(data[0]['categoryGames']);
        GamesModule.latestGamesView = new LatestGamesViperView({
            collection: GamesModule.latestGames
        });
        $('.recommended-games').append( GamesModule.latestGamesView.render().el);
        var  rightGames = callRecommendationsGames[0]['categoryGames'].slice(0,4);
        var rightGames1220= callRecommendationsGames[0]['categoryGames'].slice(4, 11);
        var rightGames1470= callRecommendationsGames[0]['categoryGames'].slice(11, 20);
        if( rightGames1220.length > 0) {
            $('.viper').addClass('games1220');
        }

        if( rightGames1470.length > 0) {
            $('.viper').addClass('games1470');
        }
        GamesModule.rightGames = new GameModelCollection(rightGames);
        GamesModule.rightGames1220 = new GameModelCollection(rightGames1220);
        GamesModule.rightGames1470 = new GameModelCollection(rightGames1470);


        GamesModule.rightGamesView = new LatestGamesViperView({
            collection: GamesModule.rightGames
        });
        GamesModule.rightGamesView1220 = new LatestGamesViperView({
            collection: GamesModule.rightGames1220
        });

        GamesModule.rightGamesView1470 = new LatestGamesViperView({
            collection: GamesModule.rightGames1470
        });
        $('.most-played-games').append( GamesModule.rightGamesView.render().el);
        $('.most-played-games1220').append( GamesModule.rightGamesView1220.render().el);
        $('.most-played-games1470').append( GamesModule.rightGamesView1470.render().el);
    });

});
var GameTemplateViper = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    template: '#game-category-item-viper',
    events : {
        'click a.real-play'     : 'onGameClick',
        'click a.free-play'     : 'freeGamePlay',
        'click .mobile-overlay' : 'onGameClickMobile',
        'click .close'          : 'closeGameInfo'
    },
    className : 'game-item',
    
    templateHelpers: function() {
        var self = this;
        return {
            'getImageName': function() {
                return App.request("getGameImage", this.id, this.name);
            },

            'isTournament': function() {
                if(self.model.get('isTournament') != null ) {
                    isTournament = self.model.get('isTournament');
                } else {
                    isTournament = false;
                }
                return isTournament
            }
        };
    },
    
    initialize : function() {
        var view = this;
        if(!this.model.get('activeGame')) {
            this.model.set('activeGame',false);
        }

        if(!this.model.get('fromFeatured') || this.model.get('fromFeatured') === false) {
            this.model.set('fromFeatured',false);
        }

        //setting the slugs from name
        if (view.model.get('slug') === "")  {
            view.model.set('slug',false);
        }

        if (view.model.get('provider_id') == 6)  {
            view.$el.addClass('live-casino');
        }
    },

    onRender: function() {
        var view = this;
        _.delay(_.bind(this.updateImage, this), 50);
        $(window).resize(function(){
            setTimeout(function() {
                view.updateImage(); 
            }, 300);
        });
        setTimeout(function(){
            view.setGamesSize();
        },500);

        view.delegateEvents();

        App.vent.on('hide-game-info', function(){
            $('body').removeClass('game-opened');
            view.$el.removeClass('display-info');
            view.$el.find('.game-description').removeClass('show-full');
        });
    },


    onGameClick: function(ev) {
        Util.manageStorage('remove', 'playGame');
    },


    setGamesSize : function() {
        var view = this,
            gameWidth = view.$el.innerWidth(),
            gameHeight = view.$el.innerHeight();
            if(gameWidth>200 && gameHeight>200) {
                view.$el.removeClass('width2 height2 width2height2');
                view.$el.addClass('width2height2');
            } else if  (gameWidth>200 && gameHeight<200){
                view.$el.removeClass('width2 height2 width2height2');
                view.$el.addClass('width2');
            } else if (gameWidth<200 && gameHeight>200) {
                view.$el.removeClass('width2 height2 width2height2');
                view.$el.addClass('height2');
            } else {
                view.$el.removeClass('width2 height2 width2height2');
            }
    },
    
    updateImage: function() {
        this.setGamesSize();
        var imageFileName = App.request("getGameImage", this.model.get('id'), this.model.get('name'));
        
        // Use desktop image for now
        imageFileName = 'default/' + imageFileName;
        
        // Adjust to the correct resolution
        if (this.$el.hasClass('width2height2')) {
            imageFileName = 'game-icon-big/' + imageFileName;
        }
        else if (this.$el.hasClass('width2')) {
            imageFileName = 'game-icon-wide/' + imageFileName;
        }
        else if (this.$el.hasClass('height2')) {
            imageFileName = 'game-icon-tall/' + imageFileName;
        }
        else {
            imageFileName = 'game-icon/' + imageFileName;
        }

        imageFileName += '.jpg';
        
        var host = this.$el.find('img').attr('data-host');
        this.model.set('new_image', host + imageFileName);
        
        this.$el.find('img').attr('data-src', host + imageFileName);
        
        this.$el.find('img').unveil(200, function() {
          $(this).load(function() {
            this.style.opacity = 1;
          });
        });
    },
});


var LatestGamesViperView = Backbone.Marionette.CollectionView.extend({
    tagName: 'div',
    childView: GameTemplateViper,

});

var GeneralLoaderView = Backbone.Marionette.ItemView.extend({
 template: '#general-loader-template',

 tagName: 'div',
 className: 'loading-overlay',

 defaults : {
        // loadingText : "Loading..."
 },

 onRender : function() {
  var view  = this;
 },

 hideLoader : function() {
  var view = this;
  view.$el.remove();
 },
 });
var PlayerActivityView = Backbone.Marionette.ItemView.extend({
    template: '#player-activity-template',

    tagName: 'div',
    className: 'player-activity',

    events : {
    },
 
 templateHelpers: function () {
  return {
   timeInWords: function(totalSeconds){
    var hours   = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    var seconds = totalSeconds % 60;
    var out = [];
    if (hours) {
     out.push(hours + ' hour' + ((hours > 1) ? 's' : ''));
    }
    if (minutes) {
     out.push(minutes + ' minute' + ((minutes > 1) ? 's' : ''));
    }
    if (seconds) {
     out.push(seconds + ' second' + ((seconds > 1) ? 's' : ''));
    }
    if (out.length == 1) {
     return out[0];
    }
    var last = out.pop();
    return out.join(', ') + ' and ' + last;
   }
  };
 },
    
    initialize : function() {
    },

    onRender : function() {
    },
 
    serializeModel: function(model){
  return model;
    }
    
});


App.module("PlayerActivityModule", function(PlayerActivityModule, App, Backbone, Marionette, $) {
 
 PlayerActivityModule.addInitializer(function(options) {
        App.vent.on('show:player-actvity', function(data) {
            // PlayerActivityView
   App.vent.trigger('show:popover',{
    content : "<div class='activity-holder'><div class='loader'>Loading...<picture><img src='/img/loader.svg'/></picture></div></div>",
    maxWidth : "500",
    maxHeight : "650",
    extraClass : "activity-dialog",
    showCloseButton : true,
    closeClickOutside : true,
    noScroll: true,
    showCta: false,
    
    showCallback : function(el) {
     $.getJSON("/api/activity", function(data) {
      PlayerActivityModule.PlayerActivityView = new PlayerActivityView({model:data.activity});
      el.find('.popover-content .activity-holder').html(PlayerActivityModule.PlayerActivityView.render().$el);
     });
    },

    hideCallback : function(el) {
     //if the game is active, don't display the scrollbar
     if($('.play-area')[0]) {
      $('html').addClass('no-scroll');
     }
    }
   });
        });
 });
 
});
var SessionReminderModel = Backbone.Model.extend({
    defaults: {
        'totalTimePlayedInSeconds' : 0,
        'totalSessionTimePlayed'   : 0,
        'timeStartedGame'          : null,
        'timeStoppedGame'          : null,
        'reminderInterval'         : 0,
        'reminderFired'            : false,
        'lastRemindedTime'         : 0,
        'gameLaunched'             : false
    },

    setReminderInterval: function(sessionInfo){
        var reminderInterval = 0;
        if (sessionInfo.playerRegulatedSettings.reminderIntervalInSeconds) {
            reminderInterval = sessionInfo.playerRegulatedSettings.reminderIntervalInSeconds;
        }
        Util.manageStorage('set', 'reminderInterval',  reminderInterval);
        this.set('reminderInterval', reminderInterval);
    },

    storeInSession : function() {
        var totalTimePlayedInSeconds = this.get('totalTimePlayedInSeconds');
        var totalSessionTimePlayed = this.get('totalSessionTimePlayed');
        Util.manageStorage('set', 'totalTimePlayedInSeconds',  totalTimePlayedInSeconds);
        Util.manageStorage('set', 'totalSessionTimePlayed',  totalSessionTimePlayed);
    },

    resetSession: function() {
        Util.manageStorage('set', 'totalTimePlayedInSeconds', 0);
        sessionStorage.setItem('totalTimePlayedInSeconds', "0");

        this.set('totalTimePlayedInSeconds', this.get('totalSessionTimePlayed')%this.get('reminderInterval') );
        this.set('reminderFired', false);
    },

    resetTotalSessionTime : function () {
        Util.manageStorage('remove', 'totalSessionTimePlayed');
        sessionStorage.removeItem('totalSessionTimePlayed');
    }
});
var SessionReminderView = Backbone.Marionette.ItemView.extend({
    template: '#session-reminder-template',

    tagName: 'div',
    className: 'session-reminder',

    events : {
        'click [data-action=play]': 'continuePlaying',
        'click [data-action=quit]': 'quitPlaying',
        'click [data-action=activity]': 'showPlayerActivity'
    },

    templateHelpers: function(){
        var view = this;
        return {
            getTotalTimePlayed : function () {

                var timestamp = view.model.get('totalSessionTimePlayed');
                var hours = Math.floor(timestamp / 60 / 60);
                var minutes = Math.floor(timestamp / 60) - (hours * 60);

                return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
            }
        };
    },

    continuePlaying: function(e){
        e.preventDefault();
        var view = this;
        view.model.set('reminderFired', false);
        App.BridgeModule.postCustomMessage({rgMessage: 'oprg_GameResume' });
    },

    quitPlaying : function(e) {
        e.preventDefault();
        var view = this;
        view.model.set('reminderFired', false);
        App.appRouter.navigate("", {trigger:true});
        App.vent.trigger('close-popover');
        App.vent.trigger('logout:submit', App.LoginModule.loginModel);
    },

    showPlayerActivity : function(e) {
        e.preventDefault();
        App.vent.trigger('show:player-actvity');
    }
});
App.module("SessionReminderModule", function(SessionReminderModule, App, Backbone, Marionette, $){
    SessionReminderModule.addInitializer(function(options) {
        SessionReminderModule.model = new SessionReminderModel();
        App.BridgeModule.listen();
        App.vent.on('update:session-time', function(data) {
            Util.manageStorage('set', 'totalSessionTimePlayed', data.sessionDuration);
            SessionReminderModule.model.set('totalSessionTimePlayed', data.sessionDuration);
            SessionReminderModule.model.setReminderInterval(data);
            if(SessionReminderModule.model.get('reminderInterval') === 0){
                return;
            }
            if(SessionReminderModule.isShowReminder(data.sessionDuration) && data.showSessionReminder){
                SessionReminderModule.showReminder(data.sessionDuration);
            }
        });

        App.vent.on('games:start_playing', function(data) {
            SessionReminderModule.model.set('gameLaunched', true);
        });

        App.vent.on('games:stop_playing', function(data) {
            SessionReminderModule.model.set('gameLaunched', false);
        });

        App.vent.on('logout:submit', function() {
            Util.manageStorage('set', 'lastRemindedTime', 0);
            SessionReminderModule.model.resetSession();
            SessionReminderModule.model.resetTotalSessionTime();
        });
    });
    SessionReminderModule.isShowReminder = function(durationNow){
        var lastTimeShown = SessionReminderModule.getLastTimeReminded();
        var diff = parseInt(durationNow) - parseInt(lastTimeShown);
        return diff >= Util.manageStorage('get', 'reminderInterval') && $('.play-area').length > 0 && !SessionReminderModule.model.get('reminderFired');
    };
    SessionReminderModule.saveTimeReminded = function(lastRemindedTime){
        Util.manageStorage('set', 'lastRemindedTime', lastRemindedTime);
        SessionReminderModule.model.set('lastRemindedTime', lastRemindedTime);
    };
    SessionReminderModule.getLastTimeReminded = function(){
        var time = Util.manageStorage('get', 'lastRemindedTime');
        time = parseInt(time);

        if(time < 1 || time === undefined || isNaN(time)){
            return 0;
        }

        return time;
    };
    SessionReminderModule.showReminder = function(lastRemindedTime){
        App.BridgeModule.pauseGame();
        //trigger game pause for Relax Games
        App.BridgeModule.postCustomMessage({rgMessage: 'oprg_GamePause' }, false);
        //this is only when we get a messaged from a slot game
        App.vent.on('bridge_message:received', function (event) {
            var evData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
            if((evData.rgMessage === 'gprg_GamePaused' || evData.Name === 'PAUSE_GAMEPLAY') && SessionReminderModule.model.get('reminderFired') === false) {
                SessionReminderModule.triggerPopover();
            }
        });

        //if we have a live casino game, we trigger the session reminder at any time because the games can't be stopped.
        if(App.GamesPlayerModule.LauchedGameModel.get('isLiveGame')) {
            SessionReminderModule.triggerPopover();
        }
    };

    SessionReminderModule.triggerPopover = function () {
        App.vent.trigger('show:popover', {
            content: "<div id='reminder-holder' class='reminder-holder'><div class='loader'>Loading...<picture><img src='/img/loader.svg'/></picture></div></div>",
            maxWidth: "320",
            maxHeight: "320",
            extraClass: "reminder-dialog",
            showCloseButton: false,
            closeClickOutside: false,
            noScroll: true,
            showCta: false,

            showCallback: function (el) {
                App.vent.trigger('session-reminder:display');
                SessionReminderModule.model.set('reminderFired', true);
                SessionReminderModule.saveTimeReminded(parseInt(Util.manageStorage('get', 'totalSessionTimePlayed')));
                SessionReminderModule.view = new SessionReminderView({
                    model: SessionReminderModule.model,
                    el: $(el).find('#reminder-holder')
                }).render();
            },

            hideCallback : function () {
                //trigger game resume for Relax Games
                App.BridgeModule.postCustomMessage({rgMessage: 'oprg_GameResume' }, false);
                App.BridgeModule.postCustomMessage({Name: 'RESUME_GAMEPLAY'}, true);
                App.BridgeModule.resumeGame();

            }

        });
    };
});
var ExitBannerModel = Backbone.Model.extend({
    defaults: {
        'text'      : '',
        'link'      : '',
        'link_text' : '',
        'image'     : 'generic-exit',
        'content'   : "",
        'default'   : true,
        'key'       : 'default',
        'template'  : 'default'
    },
});
App.module("ExitBanner", function(ExitBanner, App, Backbone, Marionette, $) {
    ExitBanner.addInitializer(function() {
        //on status call undate the exit banner model or create a new one
        App.vent.on('ping:received', function(data) {
            if(data['notifications'] !== undefined && data['notifications']['exitBanner'].length > 0) {
                var exitBanner = data['notifications']['exitBanner'][0];
                if((ExitBanner.exitBannerModel) && ExitBanner.exitBannerModel !== 'undefined') {
                    ExitBanner.exitBannerModel.set(exitBanner);
                } else {
                    ExitBanner.exitBannerModel = new ExitBannerModel(exitBanner);
                }
            }
        });

        //display exit banner
        App.vent.on('display:exit-banner', function() {
            if((ExitBanner.exitBannerModel) && ExitBanner.exitBannerModel !== 'undefined') {
            } else {
                ExitBanner.exitBannerModel = new ExitBannerModel();
            }
            var size = 'large',
                extraClass = "quit-dialog",
                headerImage = ExitBanner.exitBannerModel.get('image'),
                headerImageType = 'none';
            //if we have the default exit banner
            if(ExitBanner.exitBannerModel.get('default')) {
                var gameData = App.GamesPlayerModule.LauchedGameModel;
                size = 'small';
                extraClass = "quit-dialog default";
                headerImage = gameData.get('img_name');
                headerImageType = 'game-icon';
                ExitBanner.exitBannerModel.set('content', gameData['name']);
            }

            if(!$('.responsive-popover-wrapper.quit-dialog')[0]) {
                App.vent.trigger('show:modal',{
                    model : {
                        extraClass                  : extraClass,
                        image                       : headerImage,
                        headerImageType             : headerImageType,
                        size                        : size,
                        showCloseButton             : false,               
                    },
                });

                ExitBanner.exitBannerView = new ExitBannerView({
                    el: $('.quit-dialog .modal-content'),
                    model : ExitBanner.exitBannerModel,
                }).render();

            }
        });
    });
});
var ExitBannerView = Backbone.Marionette.ItemView.extend({
    clockTimerId: null,

    events: {
        'click .close-button' : 'closeExitBanner',
        'click .confirmExit' : 'confirmExit',
        'click .bonus-optin' : 'optin',
        'click .open-links' : 'displayExtraLinks',
    },

    templateHelpers: function() {
        var view = this;
        return {
            'isDefault': function() {
                return view.model.get('default');
            },
        }
    },

    initialize : function() {
        var view = this;
        view.$el.closest('.responsive-popover-wrapper').addClass('default');
        if (view.model.get('default')) {
             this.template = '#exit-banner-default';
         } else {
             this.template = '#exit-banner';
         }
    },

    onRender: function() {        
        var view = this;
        if (Red.DeviceType !== "desktop") {
            view.$el.find('.close-btn').addClass('close-button').removeClass('close-btn');
            if(view.$el.find('.antanddec').length == 0){
                $('#exit-banner-holder').addClass('withoutBanner');
            }
        }
        if(view.$el.find('.time-left-wrapper')[0]) {
            var timeLeft = view.$el.find('.time-left').attr('data-time');
                timePassed = view.$el.find('.time-left').attr('data-passed');
            view.displayClock(timeLeft, timePassed);
        }

         $('html').click(function(ev) {
            if(!$(ev.target).closest('.extra-links')[0]) {
                $('.links-list').removeClass('displayed');
            }
        });


        try {
            picturefill();
        }
        catch (e) {
        }
    },

    clearClock: function() {
       if (this.clockTimerId) {
            clearInterval(this.clockTimerId);
            this.clockTimerId = null;
        }
    },

    displayClock: function(timeLeft, timePassed) {
        var view = this,
            clockHolder = view.$el.find('.time-left-wrapper'),
            timeleft = timeLeft.split('-'),
            interval = 1000,
            duration = moment.duration({
                days: timeleft[0],
                hours: timeleft[1],
                minutes: timeleft[2],
                seconds: timeleft[3],
            });

        view.clearClock();
        
        var clockTimerId = setInterval(function(){
            duration = moment.duration(duration - interval, 'milliseconds');
            clockHolder.find('.days-count, .hours-count, .minutes-count, .seconds-count').html('');
            clockHolder.find('.days-count').append(duration.days());
            clockHolder.find('.hours-count').append(duration.hours());
            clockHolder.find('.minutes-count').append(duration.minutes());
            clockHolder.find('.seconds-count').append(duration.seconds());
            clockHolder.removeClass('hidden');
        }, interval);   

        setTimeout(function(){
            clockHolder.find('.time-passed').css('width',timePassed+"%");
            clockHolder.find('.time-left').removeClass('hidden');
        },1000)
    },

    displayExtraLinks : function(ev) {
        var view = this;
        ev.preventDefault;
        view.$el.find('.links-list').toggleClass('displayed');
    },

    optin: function(e) {
        var view = this;
        e.preventDefault();
        e.stopImmediatePropagation();

        var tmpData = $('.bonus-optin form').serializeArray().reduce(function(obj, item) {
            if(item.name == "bonus") {
                obj["bonus"] = item.value;
            }
            return obj;
        }, {});
        var userData = JSON.parse($.cookie('User'));
        tmpData['username'] = userData.username;
        tmpData['ajax'] = true;
        tmpData['getGames'] = true;
        tmpData['offerID'] = view.model.get('offerID');
        tmpData['description'] = view.model.get('description');
        tmpData['amount'] = view.model.get('amount');
        tmpData['type'] = view.model.get('type');
        tmpData['hasClaimed'] = view.model.get('hasClaimed');
        tmpData['key'] = view.model.get('key');
        tmpData['specialEB'] = true;
        view.$el.addClass('show-loader');
        if (view.model.get('offerID')) {
            var property = 'claim_free_games'
        } else  {
            var property = 'exit_banner_optin'
        }
        $.ajax({
            type: "POST",
            url: "/api/"+property,
            dataType: "json",
            data: tmpData
        }).done(function(data) {
            if(data.claimed) {
                var newContent = 'You have already claimed this bonus';
                view.model.set('content',newContent);
                view.$el.find('.content').html(newContent);
                view.$el.removeClass('show-loader');

            } else {
                var newContent = view.model.get('contentCongrats');
                if(newContent<5) {
                    view.$el.find('.content').addClass('hidden');
                } else {
                    view.model.set('content',newContent);
                    view.$el.find('.content').html(newContent);
                }

                if (data.existingGroup == false) {
                    $('#exit-banner-holder').append('<div class="free-games-pop-up"/>');
                    ExitBannerView.FreeSpinsHeader = new FreeSpinsHeader({
                        nrGamesLeft: data.nrGamesLeft,
                        message: data.message,
                        title: data.title
                    });
                    $('.free-games-pop-up').append(ExitBannerView.FreeSpinsHeader.render().el);
                    App.vent.trigger('reload:in-game-banner');
                    if (tmpData['type'] != 'bonus') {
                        App.vent.trigger('display:free-games', data.returnFreeGames['games'], $('.free-games-pop-up .content'));
                    }
                    view.$el.removeClass('show-loader');
                    view.$el.addClass('congrats');                    
                }
            }
            view.$el.removeClass('show-loader');
            view.$el.addClass('congrats');
            //check for 'claim' class in div set optInText accordingly
            var optInText = 'promotion:optin';
            if($('.exit-banner-elements .bonus-optin').hasClass('claim')) { 
                optInText = 'bonus:optin'; 
            }
            App.vent.trigger(optInText,view.model.get('key'),'exit-banner');
        });
    },

    confirmExit: function () {
        var view = this;
        view.updateCookie();
        App.vent.trigger('close-modal');
        App.vent.trigger('close-popover');
        App.appRouter.navigate("",{trigger:true});
        if( Util.manageStorage('get', 'showExitBanner')){
            Util.manageStorage('remove', 'showExitBanner');
            Util.manageStorage('remove', 'launchedGame');
        }
    },

    updateCookie : function() {
        var view = this;
        // set the cookie for number of displays - set per session
        // it will be deleted when user logout 
        var cookieCountKey = 'show-'+view.model.get('key'),
            timesNo;
        if (!$.cookie(cookieCountKey)) {
            $.cookie(cookieCountKey, 1);
        } else {
           timesNo = parseInt( $.cookie(cookieCountKey))+1;
           $.cookie(cookieCountKey, timesNo);
        }
    },

    closeExitBanner : function(event) {
        event.preventDefault();
        if( Util.manageStorage('get', 'showExitBanner') && Util.manageStorage('get', 'launchedGame')) {
            Util.manageStorage('remove', 'playGame');
            App.appRouter.navigate("gameplay/" + Util.manageStorage('get', 'launchedGame'), {trigger: true});
        }
        this.bind("reset", this.updateView());
    },

    updateView: function() {
        var view = this;
        this.undelegateEvents();
        this.$el.removeData().unbind();
        this.remove();
        $('.responsive-modal-wrapper.modal-show').remove();
    },
});

var ChristmasMarketModel = Backbone.Model.extend({
    defaults: {
        btns: []
    },
    initialize: function (data) {
        var data = $.parseJSON(data);

        this.set({
            data: data
        });
    }
});
App.module("ChristmasMarket", function(ChristmasMarket, App, Backbone, Marionette, $) {
    ChristmasMarket.addInitializer(function() {        
        App.vent.on('display:christmasMarket', function(data) {                 
            $.ajax({
                type: "GET",
                url: '/api/getEasterEggPromoStatus',
                dataType: "json", 
                asynch: true,                              
            }).done(function (response) {
                var jsonData = JSON.parse(data);                            
                var day=0;
                var claimedEggs = 0;                
                // loop data and add promo status to each one
                for(var i=0; i < jsonData.length; i++) {
                    day++;
                    var index = "day"+day;                    
                    jsonData[i][index]['params']['claimed'] = response['eggs']['egg-'+day]['claimed'];
                    jsonData[i][index]['params']['eligible'] = response['eggs']['egg-'+day]['eligible'];
                    jsonData[i][index]['params']['isHidden'] = ''; 
                    jsonData[i][index]['params']['lastPromo'] = ''; 
                    if(response['eggs']['egg-'+day]['claimed']) {  
                        jsonData[i][index]['params']['img-src'] = 'claimed/'+jsonData[i][index]['params']['img-src'];
                        jsonData[i][index]['content'] = "Egg "+day+" - Claimed";
                        claimedEggs++;
                    }
                    if(i === (jsonData.length -1)) {//last egg overrides
                        jsonData[i][index]['params']['isHidden'] = 'hidden';  //hide button if unclaimed  
                        jsonData[i][index]['params']['lastPromo'] = 'lastPromo';                     
                        if(claimedEggs === 8) { //all eggs have been claimed
                            jsonData[i][index]['params']['img-src'] = 'claimed/'+jsonData[i][index]['params']['img-src']; 
                            jsonData[i][index]['params']['isHidden'] = '';
                            jsonData[i][index]['params']['eligible'] = 'eligible';
                        }  
                    }                
                }                   
                data = JSON.stringify(jsonData);                                         
                ChristmasMarket.ChristmasMarketModel = new ChristmasMarketModel(data);
                ChristmasMarket.ChristmasMarketView = new ChristmasMarketView({
                    el: $('#christmas-market-slider'),
                    model: ChristmasMarket.ChristmasMarketModel
                }, data).render();
            });            
        });
    });
});
var ChristmasMarketView = Backbone.Marionette.ItemView.extend({
    template: '#christmas-market',
    events: {
        'click #prev-market' : 'slidePrev',
        'click #next-market' : 'slideNext',
        'click .market-cta'  : 'openModal',
    },
    initialize: function(btns){
        var view = this;
    },
    templateHelpers: function() {
        var view = this;
       
        return {
            dayStatus: function(params) {
                if(params['claimed']) {
                    return 'claimed'
                }
                if(params['eligible']) {
                    return 'eligible'
                }
                return 'non-qualified';
            }
        };
    },
    onRender: function() {        
        var view = this;
        view.isAnimating = false;
        $('.loader').hide();
        window.addEventListener("orientationchange", function() {
            view.render();
        });
        setTimeout(function(){
            view.viewPortWidth    = view.$el.find('.parallax').width();
            view.mobile           = $(window).width() <= 768;
            view.desktop          = $(window).width() > 768;
            view.group3Speed      = 300;
            view.steps            = 0;
            view.leftPos          = 0;
            view.eggWidth         = 336;
            view.offset           = $(window).width() <= 768 ? ((view.viewPortWidth - 280) / 2) : 0;
            view.currentPos       = 0;
            view.totalEggs        = 9;
            view.sliderWidth      = 3304;

            //find first eligible egg
            first = $( ".one-cta-wrapper.eligible:first" );
            if(first.length > 0) {
                //get current egg number
                view.currentPos = $(first).attr('class').substring($(first).attr('class').lastIndexOf(' ')+1);
            }
            
            //slide to first eligible egg
            view.moveSlider(true);
            view.handleSliderDrag();

            $(document).on('click', '.christmas-market-live .open-popover', function(ev) {
                view.openModal(ev);
            });
        }, 1000);
    },
    slideNext : function(ev) {
        ev.preventDefault();
        var view = this;
        if(view.isAnimating){ return; }
        //if end of promos return 
        if((view.mobile && view.currentPos == 9) || (view.desktop && view.currentPos >=7)) {  return;  }

        view.currentPos++;
        view.moveSlider();
    },
    slidePrev : function(ev) {
        ev.preventDefault();
        var view = this;
        if(view.isAnimating) return;
        //if first slide return
        if(view.currentPos == 0) { return;}
        if(view.desktop && view.currentPos > 7) { view.currentPos = 7 } //override to slide prev if on last egg desktop
        view.currentPos--;
        view.moveSlider();
    },
    moveSlider : function(fadeIn = false) {
        var view = this;
        view.isAnimating = true;
        
        if(fadeIn) { $('#christmas-market-slider').animate({opacity: 1}, 400); }
        //set left position of the slider
        if(view.currentPos === 0) {
            view.leftPos = 0;
        } else if((view.mobile && view.currentPos == 9) || (view.desktop && view.currentPos >= 7)) {     
            view.leftPos = -((view.sliderWidth - (view.viewPortWidth +(view.currentPos * 2))));        
        } else if (view.mobile ) {
            view.leftPos = -((view.currentPos * view.eggWidth) - view.offset);
        } else {
            view.leftPos = -((view.currentPos * view.eggWidth)-(view.currentPos * 2));
        }
        
        //move all three layers
        view.$el.find('#group1').animate({left: view.leftPos/3}, view.group3Speed, function() {
            view.isAnimating = false;
        });
        view.$el.find('#group2').animate({left: view.leftPos/2},{ duration: view.group3Speed, queue: false });
        view.$el.find('.markets-wrapper').animate({left: view.leftPos},{ duration: view.group3Speed, queue: false });
    },
    openModal: function(ev){
        ev.preventDefault();
        if(!$(ev.target).hasClass('tandc-link')){
            if(!$(ev.target).parent().hasClass('eligible')){ return; }
            if($(ev.target).parent().hasClass('lastPromo')){ return; }
            var url = $(ev.target).attr('data-page');
            var isPopup = ($(ev.target).attr('data-popup') == 'true') ? true : false;
            if(!isPopup) { window.open(url, "_blank"); return;}
        } else {
            var url = $(ev.target).attr('href');
        }
        App.vent.trigger('show:modal', {
            model : {
                extraClass                  : 'christmas-tree-popover show-loader christmas-market-live',
                image                       : 'https://static.32red.com/img/loader.svg',
                headerImageType             : 'none',//'basic-image',
                size                        : 'large',
                showCloseButton             : true,
                content                     : "<div class='advent-calendar-modal overlay-content'><div class='loader'><picture><img src='https://static.32red.com/img/loader.svg'/></picture></div></div>"
            },

            showCallback : function(el) {
                $(el).find('.overlay-content').load(url,function(response,status,xhr){
                    xhr.success(function(){
                        $(el).find('.modal-wrapper').removeClass('show-loader');
                    });

                    xhr.fail(function(){
                        $(el).find('.modal-wrapper').removeClass('show-loader');
                    });

                    xhr.error(function(){
                        $(el).find('.modal-wrapper').removeClass('show-loader');
                    });
                });
            },
        });
    },
    handleSliderDrag : function() {
        var view  = this;

        var hammerElem = view.$el.find('.parallax, .markets-wrapper').hammer();

        hammerElem.on('swipe', function(ev) {
            var target = $(ev.target);
            if(ev.gesture.deltaX < 0){
                //move forward
                $('#next-market').trigger('click');
                return;
            }
            $('#prev-market').trigger('click');

        });
    },
});
App.module("SubscriptionCentreModule", function(SubscriptionCentreModule, App, Backbone, Marionette, $) {
    SubscriptionCentreModule.addInitializer(function() {
        SubscriptionCentreModule.showSubscriptionPopover = function() {
            App.vent.trigger('show:popover',{
                content : "<div id='subscription-centre-holder'><div class='loader'><picture><img src='/img/loader.svg'/></picture></div></div>",
                maxWidth : 900,
                maxHeight : 686,
                extraClass : "subscription-centre",
                showCloseButton : true,
                closeClickOutside : true,
                noScroll: true,
                mobileFullScreen : true,
                showCallback : function() {
                    App.appRouter.navigate("",{trigger:true});
                },
                closeCallback: function() {
                    App.appRouter.navigate("",{trigger:true});
                },
                ctaCallback : function(ev) {
                    return false;
                }
            });
        };

        App.vent.on('show:subscription-centre',function(options){
            //if we need to launch subscption directly from link
            if($('.responsive-popover-wrapper.subscription-centre')[0] ) {
                return;
            }

            if(options.directLink) {
                SubscriptionCentreModule.showSubscriptionPopover();
                $.ajax({
                    type: "POST",
                    url: "/subscription/subscribeCentre",
                    dataType: "json",
                    data: options
                }).done(function(response) {
                    if(!response.ok) {
                        
                        if(response.logout) {
                            //loggedin user is different then the one who accessed the link
                            //we log out the user
                            Util.manageStorage('set', 'subscribeInfo', JSON.stringify(options));
                            App.vent.trigger('logout:submit', App.LoginModule.loginModel);
                        } else {
                            //probably mail is not correct
                            Util.manageStorage('set', 'subscribeInfo', JSON.stringify(options));
                            $('#subscription-centre-holder').find('.loader').html('<p>'+response.error+'</p>');
                            
                        }

                        return;
                    }
                    SubscriptionCentreModule.SubscriptionCentreModel = new SubscriptionCentreModel(response);
                    SubscriptionCentreModule.SubscriptionCentreView = new SubscriptionCentreViewItem({
                        el: $('#subscription-centre-holder'),
                        model : SubscriptionCentreModule.SubscriptionCentreModel,
                    }).render();
                })
                return;
            }

            if ($.cookie('Auth')) { 
                // if user is logged-in display the subscription form
                if($('.responsive-popover-wrapper.my-account')[0]) {
                    //if we launch preference centre from user account
                    $('.responsive-popover-wrapper.my-account').removeClass('my-account').addClass('subscription-centre');
                    $('.responsive-popover-wrapper .popover-content').html('<div id="subscription-centre-holder"><div class="loader"><picture><img src="/img/loader.svg"/></picture></div></div><a href="#close" class="icon close-btn"><i class="icon-close"></i></a>');
                } else {
                    SubscriptionCentreModule.showSubscriptionPopover();
                }
                var data = {};
                data.getSubscribeInfo = true;
                $.ajax({
                    type: "POST",
                    url: "/subscription/subscribeCentre",
                    dataType: "json",
                    data: data
                }).done(function(response) {
                    // var options = response['subscribeOptions'];
                    SubscriptionCentreModule.SubscriptionCentreModel = new SubscriptionCentreModel(response);
                    SubscriptionCentreModule.SubscriptionCentreView = new SubscriptionCentreViewItem({
                        el: $('#subscription-centre-holder'),
                        model : SubscriptionCentreModule.SubscriptionCentreModel,
                    }).render();

                })
            } else {
                //if user is not logged-in display login popover
                App.vent.trigger('show:popover',{
                    content : '<p class="popover-header">Login</p><div class="login-box"></div>',
                    maxWidth : 320,
                    maxHeight : 320,
                    extraClass : "login-popover base",
                    showCloseButton : true,
                    closeClickOutside : true,
                    noScroll: true,
                    mobileFullScreen : true,
                    closeCallback: function() {
                        App.appRouter.navigate("",{trigger:true});
                        //reset the login state if user closes the popover
                        App.LoginModule.loginModel.set({
                            state : 'Not Authenticated'
                        });
                    },
                    showCallback : function() {
                        //render the login view in popover - listened in login module
                        App.vent.trigger('show:second-login');
                    },

                    ctaCallback : function(ev) {
                        return false;
                    }
                });
            }
        })
    });
});
var SubscriptionCentreViewItem = Backbone.Marionette.ItemView.extend({
    template: '#subscriptioncentre',
    tagName: 'div',
    className: '',

    events: {
         'change fieldset input'                : 'selectOption',
         'click .confirm-selection button'      : 'submitForm',
         'click .open-account'                  : 'openAccount',
         'click .display-subscription'          : 'subscribeAll'
    },

    templateHelpers: function() {
        return {
            isLoggedIn: function() {
                return App.LoginModule.loginModel.get('state') === "Authentication Success";
            },
        };
    },
    
    initialize : function(options) {
        this.seenPreferenceCenter();

    },

    onRender: function() {
        var view = this;
        view.$el.find('.loader').hide();

        if(view.model.get('hasPromo')) {
            view.$el.find('.subscription-form').addClass('displayed');
        } else {
            view.$el.find('.subscription-landing').addClass('displayed');
        }
    },
    seenPreferenceCenter: function() {
        // remove and add user in the seen player group
        $.ajax({
            type: "POST",
            url: "/subscription/visitedSubscribeCentre",
            dataType: "json",

        }).done(function(response) {

        }).fail(function() {
        });
    },

    selectOption : function(ev) {
        var view = this,
            target = $(ev.target);
        var methodOfSubscription = target.context.defaultValue;
        view.$el.find('.input-wrapper').removeClass('display-none');
        target.closest('li').toggleClass('checked');
        var modifyTooltip = view.$el.find('div[data-value="' + methodOfSubscription + '"]');
        if(target.closest('li').hasClass('checked')) {
            view.model.set(target.attr('name'),'checked');
            modifyTooltip.removeClass('displayed').removeClass('goneVisible');
        } else {
            view.model.set(target.attr('name'),'');
            modifyTooltip.addClass('displayed');
            setTimeout(function(){
                modifyTooltip.addClass('goneVisible');
            },100);
            setTimeout(function(){
                modifyTooltip.removeClass('displayed');
            },5700);
            setTimeout(function(){
                modifyTooltip.removeClass('goneVisible');
            },5000);
        }
        view.$el.find('.confirm-selection').removeClass('success');
    },

    openAccount : function() {
        $('.responsive-popover-wrapper.subscription-centre').remove()
    },

    subscribeAll : function(ev) {
        var view = this, data = [];
        ev.preventDefault();
        view.$el.find('.landing-content').hide();
        view.$el.find('.loader').show();
        $.ajax({
            type: "POST",
            url: "/subscription/subscribeCentre",
            dataType: "json",
            data: {
                updateSubscribe : true,
                subscribeAll : true,
                unsubscribeAll : false
            }
        }).done(function(response) {
            view.$el.find('.subscription-form').addClass('displayed');
            view.$el.find('.subscription-landing').removeClass('displayed');
            view.$el.find('.loader').hide();
            view.$el.find('fieldset li').addClass('checked');
            view.$el.find('fieldset input').attr('checked');
        }).fail(function() {
        });
    },

    submitForm : function(ev) {
        ev.preventDefault();
        var view  = this;

        if(!view.$el.find('.confirm-selection input').val()){
            view.$el.find('.confirm-selection').addClass('error');
        } else {
            view.$el.find('.loader').show();
            view.$el.find('.confirm-selection').removeClass('error');
            totalChecked = 0;
            var data = view.$el.find('form').serializeArray().reduce(function(obj, item) {
                if(item.value == "on") {
                    totalChecked++;
                }
                obj[item.name] = item.value;
                return obj;
            }, {});

            view.model.set('unsubscribeAll',false);
            if( totalChecked == 0 ) {
                view.model.set('unsubscribeAll',true);
            } 

            data['updateSubscribe'] = true;
            data['subscribeAll'] = false;
            view.model.set(data);
            $.ajax({
                type: "POST",
                url: "/subscription/subscribeCentre",
                dataType: "json",
                data: view.model.toJSON(),
            }).done(function(response) {
                view.$el.find('.loader').hide();
                if(response.wrongEmail) {
                    view.$el.find('.confirm-selection').addClass('error');
                    view.$el.find('.error-msg').html(response.error);
                }
                if(response.ok) { 
                    view.$el.find('.confirm-selection').addClass('success');
                    view.$el.find('.success-msg span .text').html(response.returnMsg);
                }
                totalChecked = 0;
                view.model.set('unsubscribeAll',false);
            }).fail(function() {
            });
        }
    },

    displayform : function(ev) {
       
    }
});
var SubscriptionCentreModel = Backbone.Model.extend({
    defaults: {
        'email'         : '',
        'sms'           : '',
        'phone'         : '',
        'post'          : '',
        'social'        : '',
        'redcasino'     : '',
        'redsport'      : '',
        'redpoker'      : '',
        'redbingo'      : '',
    },
    
    initialize: function(options){
        this.set(options['subscribeOptions']);
        this.set(options['subscribeOptionsBrands']);
        this.set('hasPromo',options['hasPromo']);
    }
});
App.module("DepositLimitModule", function(DepositLimitModule, App, Backbone, Marionette, $) {
    DepositLimitModule.addInitializer(function() {
        DepositLimitModule.showDepositLimitPopover = function() {
            App.vent.trigger('show:popover',{
                content : "<div id='subscription-centre-holder'><div class='loader'><picture><img src='/img/loader.svg'/></picture></div></div>",
                maxWidth : 900,
                maxHeight : 686,
                extraClass : "deposit-limit-centre ",
                showCloseButton : true,
                closeClickOutside : true,
                noScroll: true,
                mobileFullScreen : true,
                showCallback : function() {
                    App.appRouter.navigate("",{trigger:true});
                },
                closeCallback: function() {
                    App.appRouter.navigate("",{trigger:true});
                },
                ctaCallback : function(ev) {
                    return false;
                }
            });
        };

        App.vent.on('show:deposit-limit',function(options){

            //if we need to launch subscption directly from link
            if($('.responsive-popover-wrapper.deposit-limit-centre')[0] && $.cookie('Auth')) {
                return;
            }

            if ($.cookie('Auth')) {
                // if user is logged-in display the subscription form
                if($('.responsive-popover-wrapper.my-account')[0]) {
                    //if we launch preference centre from user account
                    $('.responsive-popover-wrapper.my-account').removeClass('my-account').addClass('deposit-limit-centre');
                    $('.responsive-popover-wrapper .popover-content').html('<div id="subscription-centre-holder"><div class="loader"><picture><img src="/img/loader.svg"/></picture></div></div><a href="#close" class="icon close-btn"><i class="icon-close"></i></a>');
                } else {
                    DepositLimitModule.showDepositLimitPopover();
                }

                $.ajax({
                    type: "POST",
                    url: "/depositLimits/getDepositLimitInfo",
                    dataType: "json",
                    tryCount : 0,
                    retryLimit : 1, //retry ajax times if fail
                    success: function(response) {
                        // var options = response['subscribeOptions'];
                        DepositLimitModule.DepositLimitModel = new DepositLimitModel(response);
                        DepositLimitModule.DepositLimitView = new DepositLimitViewItem({
                            el: $('#subscription-centre-holder'),
                            model: DepositLimitModule.DepositLimitModel,
                        }).render();
                    },
                    error: function(xhr, status, error) {
                        // if we get Forbidden this may be because of the token miss match, and we make another call (Fix for TTRUXD-2136)
                        if (error == 'Forbidden') {
                            this.tryCount++;
                            if (this.tryCount <= this.retryLimit) {
                                $.ajax(this);
                                return;
                            }
                            return;
                        }
                    }
                });
            } else {
                //if user is not logged-in display login popover
                App.vent.trigger('show:popover',{
                    content : '<p class="popover-header">Login</p><div class="login-box"></div>',
                    maxWidth : 320,
                    maxHeight : 320,
                    extraClass : "login-popover base",
                    showCloseButton : true,
                    closeClickOutside : true,
                    noScroll: true,
                    mobileFullScreen : true,
                    closeCallback: function() {
                        App.appRouter.navigate("",{trigger:true});
                        //reset the login state if user closes the popover
                        App.LoginModule.loginModel.set({
                            state : 'Not Authenticated'
                        });
                    },
                    showCallback : function() {
                        //render the login view in popover - listened in login module
                        App.vent.trigger('show:second-login');
                    },

                    ctaCallback : function(ev) {
                        return false;
                    }
                });
            }
        })
    });
});
var DepositLimitViewItem = Backbone.Marionette.ItemView.extend({
    template: '#depositLimit',
    tagName: 'div',

    events: {
        'change fieldset input'                : 'selectOption',
        'click .confirm-selection button'      : 'submitForm',
        'click .open-account'                  : 'openAccount',
        'change .period-options'               : 'onPeriodChange',
        'change .depositLimit-form select'     : 'onAmountChange',
        'click .action-btn'                    : 'buttonAction'
    },

    templateHelpers: function() {
        var view = this;
        return {
            isLoggedIn: function() {
                return App.LoginModule.loginModel.get('state') === "Authentication Success";
            },

            canAddLimit : function() {
                return view.model.get('canAddLimit');
            },

            canEditLimit : function() {
                return view.model.get('hasDepositLimit');
            },

            hasActivePendingDepositLimits : function() {
                return view.model.get('hasPendingLimits') && view.model.get('coolingPeriodMinutes') > 0;
            },

            hasExpiredPendingDepositLimits : function() {
                return view.model.get('hasPendingLimits') && view.model.get('coolingPeriodMinutes') === 0;
            }
        };
    },

    buttonAction : function(ev) {
        ev.preventDefault();
        var view  = this,
            action = $(ev.target).attr('data-action');

        view.model.setExistingLimits();
        //decide which page to show depending on the button action
        switch (action) {
            case "intro":
                view.renderLimitsOptions('intro');
                break;
            case "add":
                view.renderLimitsOptions('add');
                break;
            case "edit":
                view.renderLimitsOptions('edit');
                break;
            case "cancel":
                view.renderLimitsOptions('render');
                //if there are no limits, we go back to intro page
                if(!view.model.get('hasDepositLimit')) {
                    action = "intro";
                }
                break;
            case "delete":
                view.renderLimitsOptions('delete');
                break;
        }

        view.$el.find('.success-msg').removeClass('display');
        view.$el.find('.values-check').hide();
    },

    onRender: function() {
        var view = this;
        view.$el.find('.loader').hide();
        //display the selected limits, if any
        view.renderLimitsOptions('render');
    },

    openAccount : function() {
        $('.responsive-popover-wrapper.deposit-limit-centre ').remove();
    },

    renderLimitsOptions : function(action) {
        var view = this,
            availableLimits = view.model.get('availableLimits');

        view.$el.find('.deposit-limit-content').attr('data-step',action);
        view.$el.find('.deposit-limit-list li.limits').remove();
        view.model.set('currentStep',action);

        switch(action) {
            case "intro":
                break;
            case "render":
                if(view.model.get('hasDepositLimit')) {
                    view.$el.find('.deposit-limit-exist').addClass('displayed');
                    view.$el.find('.no-deposit-limit').removeClass('displayed');
                } else {
                    view.$el.find('.no-deposit-limit').addClass('displayed');
                    view.$el.find('.deposit-limit-exist').removeClass('displayed');
                }

                if(!view.model.get('hasPendingLimits')) {
                    view.$el.find('.pending-limits-message').hide();
                }
                //on "render" we only display only existing limits without option to edit
                _.each(availableLimits,function(item,key){
                    if(key != "none") {
                        if(item['status'] === "exist" ) {
                            if(view.model.get('hasPendingLimits')) {
                                view.$el.find('.deposit-limit-list .initial-limits')
                                    .append('<li class="limits"><span class="period-column">'+key+'</span><span span class="amount-column">'+item['selectedValue']+' (pending: '+item['pendingLimit']+')</span></li>');
                            } else {
                                view.$el.find('.deposit-limit-list .initial-limits')
                                    .append('<li class="limits"><span class="period-column">'+key+'</span><span span class="amount-column">'+item['selectedValue']+'</span></li>');
                            }
                        }
                    }
                });
                break;
            case "add":
                _.each(availableLimits,function(item,key){
                    if(key != "none") {
                        if(item['status'] === "new" ) {
                            //only render one select                                    
                            if(!view.$el.find('.deposit-limit-list .change-limits select')[0]) {
                                view.$el.find('.deposit-limit-list .change-limits')
                                    .append('<li class="limits"><span><select class="period-options"></select></span><span><select class="amount-options" data-period="'+key+'"></select></span></li>');
                                //populate amounts for edit
                                view.generateSelectPeriod(view.$el.find('.period-options'),key);
                                view.generateSelectAmount('choose', view.$el.find('select[data-period="'+key+'"]'));
                            }
                        } else {
                            view.$el.find('.deposit-limit-list .change-limits')
                                .append('<li class="limits"><span class="period-column">'+key+'</span><span span class="amount-column">'+item['selectedValue']+'</span></li>');
                        }
                    }
                });
                break;
            case "edit":
                _.each(availableLimits,function(item,key){
                    if(key != "none") {
                        if(item['status'] === "exist" ) {
                            view.$el.find('.deposit-limit-list .change-limits')
                                .append('<li class="limits"><span><select value="'+key+'"><option value="'+key+'">'+key+'</option></select></span><span><select class="amount-select" data-period="'+key+'"></select></span></li>');
                        }
                        //populate amounts for edit
                        view.generateSelectAmount(key, view.$el.find('select[data-period="'+key+'"]'));
                    }
                });
                break;

            case "delete":
                view.model.setExistingLimits();
                _.each(availableLimits,function(item,key){
                    if(key != "none") {
                        if(item['status'] === "exist" ) {
                            view.$el.find('.deposit-limit-list .change-limits')
                                .append('<li class="limits"><span class="period-column">'+key+'</span><span span class="amount-column">'+item['selectedValue']+'</span></li>');
                        }
                    }
                });
                break;
        }
    },

    generateSelectPeriod : function(el, selected) {
        var view = this,
            periodSelector = $(el),
            availableLimits = _.keys(view.model.get('availableLimits')),
            existingLimits = _.keys(view.model.get('existingDepositLimit')),
            options = _.difference(availableLimits, existingLimits);

        periodSelector.append('<option>Please choose...</option>');
        _.each(options, function(val){
            periodSelector.append("<option value="+val+">"+val+"</option>");
        });
    },

    generateSelectAmount : function(selectedPeriod, el) {
        var view = this,
            amountSelector = $(el);
        options = view.model.get('limitsValues')[selectedPeriod],
            existingLimits = view.model.get('existingDepositLimit');

        amountSelector.html("");

        _.each(options, function(val,key){
            val = val.replace('##CURR##',view.model.get('currencySymbol'));
            if(existingLimits[selectedPeriod] && existingLimits[selectedPeriod]['realValue'] == key) {
                amountSelector.append("<option value="+key+" selected='true'>"+val+"</option>");
            } else {
                amountSelector.append("<option value="+key+">"+val+"</option>");
            }
        });

        //add default option if user has a different limit than the ones we have defined
        if(existingLimits[selectedPeriod] && !options[existingLimits[selectedPeriod]['realValue']]) {
            amountSelector.prepend("<option value='' selected='true'>Please Select</option>");
        }

        amountSelector.attr('data-period',selectedPeriod);
    },

    onPeriodChange : function(ev) {
        var view = this,
            val = $(ev.target).val(),
            target = view.$el.find('.amount-options');

        view.generateSelectAmount(val, target);

        view.model.set('deposit_limit_period',val);
        view.model.set(val+'_limit',parseInt(view.model.get(val+'_limit_min')));

        view.$el.find('.confirm-selection').removeClass('success');
        view.$el.find('.select-line.deposit-limit-amount').show();
        view.$el.find('.max-limit-warning').hide();
    },

    onAmountChange : function(ev) {
        var view = this,
            target = $(ev.target),
            val = target.val(),
            selectedPeriod = target.attr('data-period');
        view.$el.find('.confirm-selection').removeClass('success');
        view.model.set(selectedPeriod+'_limit',parseInt(val));
        view.model.set('deposit_limit_amount',val);
    },

    submitForm : function(ev) {
        ev.preventDefault();
        var view  = this;

        //validate limits
        if(!view.validateLimit('day','week') || !view.validateLimit('day','month') || !view.validateLimit('week','month')) {
            return;
        }

        if(!view.$el.find('.confirm-selection input').val()){
            //if no password is added
            view.$el.find('.confirm-selection').addClass('error');
        } else {
            var url = "setDepositLimit";

            //check if the user wants to delete the limits
            if( view.model.get('currentStep') === "delete") {
                url = "removeDepositLimit";
            }

            view.$el.find('.loader').show();
            view.$el.find('.values-check').hide();
            view.$el.find('.confirm-selection').removeClass('error');

            view.model.set('user-password', view.$el.find('.confirm-selection input').val());

            $.ajax({
                type: "POST",
                url: "/depositLimits/"+url,
                dataType: "json",
                data: view.model.toJSON(),
            }).done(function(response) {

                if(response.wrongEmail) {
                    view.$el.find('.loader').hide();
                    view.$el.find('.confirm-selection').addClass('error');
                    view.$el.find('.error-msg').html(response.error);
                }

                if(response.ok) {
                    //limits were not updated immediately so an extra call is nedded for confirmation
                    setTimeout(function(){
                        view.confirmLimits();
                    },5000)
                }

            }).fail(function() {});
        }
    },

    validateLimit : function(period1,period2) {
        var view = this;

        if(view.model.get(period2+'_limit') > 0){
            if(view.model.get(period1+'_limit') > view.model.get(period2+'_limit')) {
                view.$el.find('.values-check').show().html('<span style="text-transform: capitalize;">'+period1+'</span> limit cannot be greater than '+period2+' limit');
                return false;
            }
        }
        return true
    },

    confirmLimits : function() {
        var view = this,
            data = {};
        $.ajaxSetup({
            headers : {
                'X-CSRF-Token': Red.Csrf
            }
        });
        $.ajax({
            type: "POST",
            url: "/depositLimits/getDepositLimitInfo",
            dataType: "json",
            data: data
        }).done(function(response) {
            view.$el.find('.loader').hide();
            var status = "updated";
            if(response['hasPendingLimits']) {
                status = "pending";
            }
            view.$el.find('.pending-limits-message').hide();
            view.$el.find('.success-msg').removeClass('pending updated');
            view.$el.find('.success-msg').addClass(status);

            //display initial step and update model with new values
            view.model.set('existingDepositLimit' , response['existingDepositLimit'])
            view.model.set('availableLimits' , view.model.getAvailableLimits());
            view.model.set('hasDepositLimit',true);
            view.model.set('hasPendingLimits',response['hasPendingLimits']);

            view.renderLimitsOptions('render');
        })
    }
});
var DepositLimitModel = Backbone.Model.extend({
    defaults: {
        'deposit_limit_period' : '',
        'deposit_limit_amount' : '',
        'dayMaxLimit' : '',
        'weekMaxLimit' : '',
        'day_limit' : '-1',
        'week_limit' : '-1',
        'month_limit' : '-1',
        'day_limit_min' : '1000',
        'week_limit_min' : '1000',
        'month_limit_min' : '5000'
    },

    initialize: function(options){
        var model = this;


        model.set({
            'hasDepositLimit'               : options['hasDepositLimit'],
            'existingDepositLimit'          : options['existingDepositLimit'],
            'limitsValues'                  : options['depositLimitsOptions'],
            'canAddLimit'                   : options['limitsCount'] > 2 ? false:true
        });

        model.set('availableLimits', model.getAvailableLimits());
        model.setExistingLimits();

    },

    setExistingLimits : function() {
        var model = this;
        _.each(model.get('availableLimits'),function(item, key){
            model.set(key+'_limit',item['selectedRealValue']);
        });
    },

    getAvailableLimits: function() {
        var model = this,
            availableLimits = {};

        _.map(model.get('limitsValues'),function(item, key){
            if(!model.get('existingDepositLimit')[key] || key === "none") {
                return availableLimits[key] = {
                    'values'                : item,
                    'status'                : 'new',
                    'selectedValue'         : 0,
                    'selectedRealValue'     : -1,
                    'pendingLimit'          : 0
                }
            } else {
                var existingLimit = model.get('existingDepositLimit')[key];
                return availableLimits[key] = {
                    'values'                : item,
                    'status'                : 'exist',
                    'selectedValue'         : existingLimit['value'],
                    'selectedRealValue'     : existingLimit['realValue'],
                    'pendingLimit'          : existingLimit['pendingLimitValue']
                }
            }
        });

        return availableLimits;
    },
});
App.module("DocumentVerificationModule", function(DocumentVerificationModule, App, Backbone, Marionette, $) {
    DocumentVerificationModule.addInitializer(function() {
        DocumentVerificationModule.showDocumentVerificationPopover = function() {
            App.vent.trigger('show:popover',{
                content : "<div id='document-verification-holder'><div class='loader'><picture><img src='/img/loader.svg'/></picture></div></div>",
                maxWidth : 900,
                maxHeight : 686,
                extraClass : "document-verification",
                showCloseButton : true,
                closeClickOutside : true,
                noScroll: true,
                mobileFullScreen : true,
                showCallback: function(el) {
                    App.appRouter.navigate("",{trigger:true});
                },
                closeCallback: function() {
                    App.appRouter.navigate("",{trigger:true});
                },
                ctaCallback : function(ev) {
                    return false;
                }
            });
        };

        DocumentVerificationModule.showLoginPopover = function() {
            App.vent.trigger('show:popover',{
                content : '<p class="popover-header">Login</p><div class="login-box"></div>',
                maxWidth : 320,
                maxHeight : 320,
                extraClass : "login-popover base",
                showCloseButton : true,
                closeClickOutside : true,
                noScroll: true,
                mobileFullScreen : true,
                closeCallback: function() {
                    App.appRouter.navigate("",{trigger:true});
                    //reset the login state if user closes the popover
                    App.LoginModule.loginModel.set({
                        state : 'Not Authenticated'
                    });
                },
                showCallback : function() {
                    //render the login view in popover - listened in login module
                    App.vent.trigger('show:second-login');
                },

                ctaCallback : function(ev) {
                    return false;
                }
            });
        };


        App.vent.on('show:document-verification',function(verificationType){
            if($('.responsive-popover-wrapper.document-verification')[0] ) {
                return;
            }

            if ($.cookie('Auth')) { 
                // if user is logged-in display the popover
                DocumentVerificationModule.showDocumentVerificationPopover();

                //base on what type of document we want to check, render the specific view
                // can be address or document
                switch (verificationType) {
                    case 'document':
                        DocumentVerificationModule.DocumentVerificationModel = new DocumentVerificationModel({'verificationType':verificationType});
                        DocumentVerificationModule.DocumentVerificationView = new DocumentVerificationViewItem({
                            el: $('#document-verification-holder'),
                            model : DocumentVerificationModule.DocumentVerificationModel,
                        }).render();
                    break;
                    case 'address':
                        DocumentVerificationModule.AddressVerificationModel = new DocumentVerificationModel({'verificationType':verificationType});
                        DocumentVerificationModule.AddressVerificationView = new DocumentVerificationViewItem({
                            el: $('#document-verification-holder'),
                            model : DocumentVerificationModule.AddressVerificationModel,
                        }).render();
                    break;
                }
            } else {
                //if user is not logged-in display login popover
                DocumentVerificationModule.showLoginPopover();
            }
        })
    });
});
var DocumentVerificationViewItem = Backbone.Marionette.ItemView.extend({
    template: '#document-verify',
    tagName: 'div',
    className: '',

    events: {
         'click .submit-document'      : 'submitForm',
         'change .country-select'      : 'onSelectCountry'
    },

    templateHelpers: function() {
        return {
            isLoggedIn: function() {
                return App.LoginModule.loginModel.get('state') === "Authentication Success";
            },
        };
    },
    
    initialize : function(options) {
        var view = this;
        view.template = "#document-verify";
        if (view.model.get('verificationType') === "address") {
            view.template = "#address-verify";
        }
    },

    onRender: function() {
        var view = this;
        view.$el.find('.loader').hide();

        view.generateDocTypes(view.model.get('docTypes'));

        $('.country-select').countrySelect({
            defaultCountry : view.model.get('country'),
            preferredCountries : []
        });

        $('.country-select').countrySelect("selectCountry", view.model.get('country'));
    },

    populateCountriesSelector : function(extraExclusions) {
        var key, countries = _.keys(Red.MGCountries),
            exlusions = _.keys(extraExclusions),
            leftcountries = _.difference(countries, exlusions);
        return _.map(leftcountries, function(item){
            return item.toLowerCase()
        });
    },

    onSelectCountry : function() {
        var view = this,
            selectedCountry = $('.country-select').countrySelect("getSelectedCountryData")['iso2'].toUpperCase();
        view.model.setDocumentOptions(view.model.get('verificationType'), selectedCountry);

        view.generateDocTypes(view.model.get('docTypes'));
    },
        
    generateDocTypes : function(docTypes) {
        $('ul.document-type').html("");

        _.each(docTypes,function(docType){
            $('ul.document-type').append('<li><input type="radio" name="doc_type" value="'+docType['doc-type']+'" id="'+docType['doc-type']+'"><label for="'+docType['doc-type']+'">'+docType['label']+'</label></li>');
        })  
    },

    submitForm : function(ev) {
        ev.preventDefault();
        var view  = this,
            data =  view.$el.find('form').serializeArray().reduce(function(obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {}),
            selectedCountry = $('.country-select').countrySelect("getSelectedCountryData")['iso2'].toUpperCase(),
            iso3Country = Red.MGCountriesISO_3_full[selectedCountry];

        data['country'] = iso3Country;
        $('.loader').show();

        $.ajax({
            type: "POST",
            url: view.model.get('url'),
            data: data,
            dataType: "json"
        }).done(function (data) {
            if(data.ok) {
                view.$el.find('form').remove();
                $('#net-verify-iframe').show().attr('src',data.redirect);

                setTimeout(function(){
                    $('.loader').hide();
                },1000)
            } else {
                $('.error-msg').html(data.error);
            }
            $('.loader').hide();
        });
    }
});
var DocumentVerificationModel = Backbone.Model.extend({
    defaults: {
     'country' : "",
     'url' : '/document-verification/netverify'
    },

    initialize : function(options) {
     var model = this;
     model.set('verificationType',options['verificationType']);
        model.set('country',Red.GeoLocation);
     model.setDocumentOptions(options['verificationType'], Red.GeoLocation);
    },

    setDocumentOptions : function(verificationType, country) {
        var model = this,
      docTypes = Red.DocTypes['ROTW'];

        switch (verificationType) {
            case 'document':
             if(country == "GB") {
              docTypes = Red.DocTypes['UK'];
          }
                model.set('docTypes',docTypes);
            break;
            case 'address':
                model.set('docTypes',Red.AddressDocTypes['ROTW']);
                model.set('url','/document-verification/docverify');
            break;
        }
    }
});
App.module("BalanceModule", function(BalanceModule, App, Backbone, Marionette, $) {
    App.vent.on('ping:received', function(data) {
        if (data['playerCashBalance']) {
            var balanceInfo = ({
                'cashBalance' : data['playerCashBalance'],
                'bonusBalance' : data['playerBonusBalance'],
                'totalBalance' : data['playerTotalBalance'],
                'totalBalanceExcBingo' : data['playerTotalBalanceExcBingo'],
                'externalBalance' : data['playerExternalBalance'],
                'BonusBalanceTotal' : data['playerBonusBalanceTotal']
            });
            App.vent.trigger('display:balance', balanceInfo);
        }
    });
    App.vent.on('display:balance',function(balanceInfo){
        if (BalanceModule.BalanceModel) {
            BalanceModule.BalanceModel.set(balanceInfo);
        } else {
            BalanceModule.BalanceModel = new BalanceModel(balanceInfo);
        }
            //render balance in top menu on desktop
            renderBalance($('.login-status .balance'), "topMenu");
                       
            //render balance in hamburger menu on mobile
            renderBalance($('.tabs-item.balance-widget'), "hamburger");          
        });

        function renderBalance(elValue, balanceTypeValue) {
            BalanceModule.balanceView = new BalanceView({
                el : elValue,
                model :  BalanceModule.BalanceModel,
                balanceType : balanceTypeValue
            }).render();
        }
    });
var BalanceModel = Backbone.Model.extend({
    defaults: {
        "cashBalance": "£0",
        "bonusBalance": "£0",
        "externalBalance": "£0",
        "totalBalance": "£0",
        "totalBalanceExcBingo" : "£0",
        "cashBalancePercent": 0,
        "bonusBalancePercent": 0,
        "bonusBalanceIncBingoPercent" : 0,
        "cashBalanceExcBingoPercent" : 0,
        "externalBalancePercent": 0,
        "totalBalancePercent": 100,
    },
    initialize: function() {
        var cashBalanceFirstDigit = this.getFirstDigitIndex(this.get("cashBalance")),
            bonusBalanceFirstDigit = this.getFirstDigitIndex(this.get("bonusBalance")),
            externalBalanceFirstDigit = this.getFirstDigitIndex(this.get("externalBalance")),
            totalBalanceFirstDigit = this.getFirstDigitIndex(this.get("totalBalance")),
            totalBalanceExcBingoFirstDigit = this.getFirstDigitIndex(this.get("totalBalanceExcBingo"));

     var cashBalanceNumber = Number(this.get("cashBalance").substring(cashBalanceFirstDigit).split(',').join('')),
      bonusBalanceNumber = Number(this.get("bonusBalance").substring(bonusBalanceFirstDigit).split(',').join('')),
            externalBalanceNumber = Number(this.get("externalBalance").substring(externalBalanceFirstDigit).split(',').join('')),
            totalBalanceNumber = Number(this.get("totalBalance").substring(totalBalanceFirstDigit).split(',').join('')),
            totalBalanceExcBingoNumber = Number(this.get("totalBalanceExcBingo").substring(totalBalanceExcBingoFirstDigit).split(',').join('')),
      cashPercent = (totalBalanceNumber === 0) ? 0 : (cashBalanceNumber/totalBalanceNumber)*100,
            cashPercentExcBingo = (totalBalanceExcBingoNumber === 0) ? 0 : (cashBalanceNumber/totalBalanceExcBingoNumber)*100,
      bonusPercent = (totalBalanceNumber === 0) ? 0 : (bonusBalanceNumber/totalBalanceNumber)*100,
      externalPercent= (totalBalanceNumber === 0) ? 0 : (externalBalanceNumber/totalBalanceNumber)*100,
         externalIncBingoPercent = (totalBalanceNumber === 0) ? 0 : (externalBalanceNumber/totalBalanceNumber)*100;


     this.set({"cashBalancePercent": cashPercent.toFixed() + "%"});
     this.set({"cashBalanceExcBingoPercent" : cashPercentExcBingo.toFixed() + "%"});
     this.set({"bonusBalancePercent": bonusPercent.toFixed() + "%"});
        this.set({"bonusBalanceIncBingoPercent": externalIncBingoPercent.toFixed() + "%"});
        this.set({"externalBalanceNumber": externalPercent.toFixed() + "%"});
    },
    getFirstDigitIndex: function(term){
        var firstDigit = term.match(/\d/);
        return term.indexOf(firstDigit);
    },
});

var BalanceView = Backbone.Marionette.ItemView.extend({
    template: '#balance-widget',
    
    tagName: 'div',

    events: {
        'click .refresh-balance'    : 'refreshBalance'
    },

    modelEvents: {
        'change:totalBalance': 'render',
    },

    initialize : function(options) {
        var view = this;
        view.template = "#balance-widget";
        if (view.options.balanceType === "hamburger") {
            view.template = "#balance-widget-hamburger";
        }
    },

    onRender: function() {
        var view = this;
        view.$el.addClass('balance-widget');
    },

    refreshBalance : function() {
        App.vent.trigger('trigger:sessionInfo');
    }
});

App.module("NetPositionModule", function(NetPositionModule, App, Backbone, Marionette, $) {
    var getGameSession = null;
    App.vent.on('games:gameOff', function() {
        $.ajax({
            type: "POST",
            url: '/api/stopGameSession'
        }).done();
        if(getGameSession) {
            clearInterval(getGameSession);
        }
        if(NetPositionModule.NetPositionModel) {
            NetPositionModule.NetPositionModel.set({'h':'0','m':'0','s':'0','totalNetPosition':'0'});
            NetPositionModule.NetPositionModel.set('exist',true);
            /* reset net position bar to close */
            NetPositionModule.NetPositionModel.set('openNetPositionClass', '');
        }
    });


    App.vent.on('games:gameOn', function() {
        if (!Red.showNetPosition) {
            return;
        }
        $.ajax({
            type: "POST",
            url: '/api/stopGameSession'
        }).done(getGameSession);

        getGameSession =
            setInterval(function () {
                if ($.cookie('gsid')) {
                    $.ajax({
                        type: "GET",
                        url: '/api/getGameSession'
                    }).done(function (data) {
                        if(data.ok) {
                            App.vent.trigger('display:netPosition', data.response);
                        }
                    });
                }
            }, 5000);
    });

    App.vent.on('display:netPosition',function(netPositionInfo){
        if (NetPositionModule.NetPositionModel) {
            NetPositionModule.NetPositionModel.set(netPositionInfo);
            if(NetPositionModule.NetPositionModel.get('exist')) {
                renderNetPosition($('#net-position-bar'));
            }
        } else {
            NetPositionModule.NetPositionModel = new NetPositionModel(netPositionInfo);
            //render net positionInfo in top menu on desktop
            renderNetPosition($('#net-position-bar'));
        }

        function renderNetPosition(elValue) {
            NetPositionModule.netPositionView = new NetPositionView({
                el : elValue,
                model :  NetPositionModule.NetPositionModel,
            }).render();
        }
    });

    App.vent.on('ping:received', function(data) {
        if(NetPositionModule.NetPositionModel) {
            if (data['playerCashBalance']) {
                NetPositionModule.NetPositionModel.set({
                    'totalBalance': data['playerTotalBalance'],
                    'totalBalanceExcBingo': data['playerTotalBalanceExcBingo'],
                    'bonusBalance': data['playerBonusBalance'],
                    'externalBalance':  data['playerExternalBalance'],
                    'cashBalance': data['playerCashBalance'],
                });
            }
        }
    });
});
var NetPositionModel = Backbone.Model.extend({
    defaults: {
        "timeNetPosition": "",
        "totalNetPosition": "£0",
        "openNetPositionClass ": "",
        "s ": 0,
    },
    initialize: function(options) {
        var model = this;
        model.set({
            'totalBalance': App.BalanceModule.BalanceModel.get('totalBalance'),
            'totalBalanceExcBingo': App.BalanceModule.BalanceModel.get('totalBalanceExcBingo'),
            'bonusBalance': App.BalanceModule.BalanceModel.get('bonusBalance'),
            'externalBalance': App.BalanceModule.BalanceModel.get('externalBalance'),
            'cashBalance': App.BalanceModule.BalanceModel.get('cashBalance'),
            'cashBalancePercent': App.BalanceModule.BalanceModel.get('cashBalancePercent'),
            'cashBalanceExcBingoPercent': App.BalanceModule.BalanceModel.get('cashBalanceExcBingoPercent'),
            'bonusBalanceIncBingoPercent': App.BalanceModule.BalanceModel.get('bonusBalanceIncBingoPercent'),
            'bonusBalancePercent': App.BalanceModule.BalanceModel.get('bonusBalancePercent'),
            'externalBalancePercent': App.BalanceModule.BalanceModel.get('externalBalancePercent'),
        });
    }
});

var NetPositionView = Backbone.Marionette.ItemView.extend({
    template: '#netPosition-widget',
    
    tagName: 'div',

    ui: {
        netPositionButton: '.open-netPosition',
        refreshBalanceButton:  '.refresh-balance'
    },

    events: {
        'click @ui.netPositionButton': 'openNetPosition',
        'click @ui.refreshBalanceButton': 'refreshBalance'
    },

    modelEvents: {
        'change:totalNetPosition': 'render',
        'change:totalBalance': 'render',
    },

    onRender: function() {
        var view = this;
        view.$el.addClass('netPosition-widget');
        if(view.model.get('s')) {
            view.startTimer(view.model.get('h'), view.model.get('m'), view.model.get('s'));
        }
    },

    openNetPosition : function(ev) {
        ev.preventDefault();
        var view = this;

        /* Check if bar was open, and keep it open at balance refresh */
        var opennetPosition = view.$el.find(".open-netPosition");
        var opennetPositionValue = (opennetPosition.hasClass('open') ? '' : 'open');
        view.model.set('openNetPositionClass', opennetPositionValue);

        /* Open close menu with net info */
        opennetPosition.toggleClass("open");
        view.$el.find(".net-balance-wrapper").toggle();

        /* fix multiple trigger */
        ev.stopImmediatePropagation();
    },

    startTimer: function(h, m, s) {
        var view = this;
        var startTimestamp = moment().hours(h).minutes(m).seconds(s);

        if(view.clockTimerId) {
            clearInterval(view.clockTimerId);
        }
        view.clockTimerId = setInterval(function () {
            startTimestamp.add(1, 'second');
            view.$el.find('.timeInterval').text(startTimestamp.format('HH:mm:ss'));
        }, 1000);
    },

    refreshBalance : function(ev) {
        ev.preventDefault();
        this.$el.find('.icon-reload').addClass('rotate');
        setTimeout(function () {
            $('.icon-reload').removeClass('rotate');
        }, 3000);
        App.vent.trigger('trigger:sessionInfo');
        ev.stopImmediatePropagation();
    },

});