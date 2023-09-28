(function () {
  if (!window.__SHARK_PLUGIN_STATUS__) {
      if (typeof Array.prototype.filter === 'function' &&
          document.cookie.split(';').filter(function (item) {
              return item.indexOf('shark_plugin=1') >= 0
          }).length > 0) {
          window.__SHARK_PLUGIN_STATUS__ = 1;
      } else {
          window.__SHARK_PLUGIN_STATUS__ = 2;
      }
  }
})();
var recentUsedKeyWorker;
try {
  if (location.host.toLowerCase().indexOf('localhost') < 0 &&
      location.host.toLowerCase().indexOf('.dev.') < 0 &&
      window.Worker && window.URL && window.Blob && window.Set && !recentUsedKeyWorker) {
      var pageEle = document.getElementById('page_id');
      var pageid = (pageEle && pageEle.value) || '';
      var tripHost = 'dynamic';
      if (tripHost === 'dynamic') {
          tripHost = (/pro_ctripwireless|ctrip_ctripwireless/.test(navigator.userAgent.toLowerCase()) || /(ctrip|ctripcorp|lvtds)\.com/.test(location.host)) ? 'https://www.ctrip.com' : 'https://www.trip.com';
      }
      function __SHARK_REPORT_WORKER__(tripHost) {
          var xmlHttp = new XMLHttpRequest();
          var xmlHttp2 = new XMLHttpRequest();
          var history_set = new Set();
          var keyinfo_cache = [];
          onmessage = function (e) {
              if (history_set.size < 5000 && !history_set.has(e.data)) {
                  keyinfo_cache.push(e.data);
                  history_set.add(e.data);
              }
          };
          setInterval(function () {
              if (xmlHttp !== null && xmlHttp2 !== null && keyinfo_cache.length > 0) {
                  try {
                      var undefinedKeys = [], recentUsedKeys = [];
                      keyinfo_cache.forEach(function (key) {
                          if (key[0] !== '!') {
                              recentUsedKeys.push(key);
                          } else {
                              undefinedKeys.push(key.substr(1));
                          }
                      });
                      if (recentUsedKeys.length) {
                          xmlHttp.open('POST', tripHost + '/m/i18n/ReportRecentUsedKey.html', true);
                          xmlHttp.setRequestHeader('content-type', 'application/json;charset=utf-8');
                          xmlHttp.send(JSON.stringify(recentUsedKeys));
                      }
                      if (undefinedKeys.length) {
                          xmlHttp2.open('POST', tripHost + '/m/i18n/ReportUndefinedKeys.html', true);
                          xmlHttp2.setRequestHeader('content-type', 'application/json;charset=utf-8');
                          xmlHttp2.send(JSON.stringify(undefinedKeys));
                      }
                      keyinfo_cache = [];
                  } catch (err) {
                  }
              }
          }, 5000);
      }

      recentUsedKeyWorker = new Worker(URL.createObjectURL(new Blob(['(' + __SHARK_REPORT_WORKER__.toString() + ')(' + "'" + tripHost + "'" + ')'])));
  }
} catch (err) {
}
;(function (name, definition) {
  var LANGUAGE = {"key_gotop_social_subtitle":"Telegram: @triptalksSG","Currency_VietnameseDong":"Vietnamese Dong","key.currency.gbp":"British Pound (£)","ButtonText_FollowUs":"Follow Us","LabelText_Home_SearchBox_TTD":"Attractions \u0026 Tickets","ButtonText_CustomerServiceHelp":"Customer Support","LinkButtonText_ListHotelCities":"All Hotels","ButtonText_Recruitment":"Overseas Recruitment","ButtonText_CustomerService":"Service Guarantee","ButtonText_Bundle":"Flight + Hotel","V3_Promo_Code":"Promo Codes","key.currency.mop":"Macau Pataca","ButtonText_Affiliates":"Affiliate Program","ButtonText_CtripRewards":"Trip.com Rewards","ANNOUNCE_MAIN_TEXT_TRIP":"Introducing Trip.com, Ctrip\u0027s new global brand. {0}","ButtonText_CustomTrip":"Trip Planner","PageHead_SiteRecommendTxt":"Recommend Languages","PageHead_CurrencyOtherTxt":"All currencies","Key_Save":"Save","V3_Text_MembInfo":"Profile","key_powered_by":"Powered by","ButtonText_Contactus":"Contact Us","V2_Home_AppDownload_FingerTips":"\u0026lt;h3\u0026gt;Travel at your fingertips\u0026lt;/h3\u0026gt;\u0026lt;ul\u0026gt;\u0026lt;li\u0026gt;\u0026lt;i class\u003d\u0026quot;icon ico_correct_bl\u0026quot;\u0026gt;\u0026lt;/i\u0026gt;Competitive rates and loyalty rewards\u0026lt;/li\u0026gt;\u0026lt;li\u0026gt;\u0026lt;i class\u003d\u0026quot;icon ico_correct_bl\u0026quot;\u0026gt;\u0026lt;/i\u0026gt;Locate nearby hotels\u0026lt;/li\u0026gt;\u0026lt;li\u0026gt;\u0026lt;i class\u003d\u0026quot;icon ico_correct_bl\u0026quot;\u0026gt;\u0026lt;/i\u0026gt;Real time flight tracking\u0026lt;/li\u0026gt;\u0026lt;li\u0026gt;\u0026lt;i class\u003d\u0026quot;icon ico_correct_bl\u0026quot;\u0026gt;\u0026lt;/i\u0026gt;Book train tickets in China\u0026lt;/li\u0026gt;\u0026lt;li\u0026gt;\u0026lt;i class\u003d\u0026quot;icon ico_correct_bl\u0026quot;\u0026gt;\u0026lt;/i\u0026gt;Manage travel bookings on the go\u0026lt;/li\u0026gt;\u0026lt;/ul\u0026gt;","key.currency.aud":"Australian Dollar (AU$)","key.currency.idr":"Indonesian Rupiah","LabelText_Home_SearchBox_Hotel":"Hotels","key.currency.aed":"United Arab Emirates Dirham","key.currency.dkk":"Danish Krone","Currency_MalaysianRinggit":"Malaysian Ringgit","V2_Home_AppDownload_Link":"We\u0027d love to send you an app download link real quick!","ButtonText_License":"Business License","PageHead_LocaleAll":"All Languages","LabelText_Home_SearchBox_Train":"Trains","key_channel_sg_vouchers":"SingapoRediscovers Vouchers","V2_Home_AppDownload_Email_Wrong":"Email send failure. Please check your email address and try again.","LinkButtonText_ListFlightCities":"All Flights","ANNOUNCE_LINK_TEXT_CRTIP":"Learn more here","key.currency.bhd":"Bahraini Dinar","ButtonText_Links":"Links \u0026 Partners","Home_Download":"App","ButtonText_TripRewards":"Trip.com Rewards","key.currency.thb":"Thai Baht","ButtonText_channel_carhire":"Car Rentals","V3_Profile_Gift":"C-Money","Currency_MacauPataca":"Macau Pataca","key.currency.kwd":"Kuwaiti Dinar","ANNOUNCE_MAIN_TEXT_CTRIP":"Introducing Trip.com, Ctrip\u0027s new global brand. {0}","ButtonText_AboutUs":"About Trip.com","Key_CountryRegion":"Country or Region","ButtonText_GuestOrders":"Guest bookings","key.currency.rub":"Russian Ruble","Currency_PhilippinePeso":"Philippine Peso","key.currency.sgd":"Singapore Dollar","ButtonText_GiftCard":"Gift Cards","ButtonText_Mobile":"Mobile","ButtonText_Register":"Register","ButtonText_Account":"Account \u0026 Bookings","SignInRegister_Desc":"Sign in or register to take advantage of exclusive member-only deals!","V3_Profile_MyOrders":"My Bookings","ButtonText_PrivacyPolicy":"Privacy Policy","key.currency.chf":"Swiss Franc","Tip_New":"New","ButtonText_Flights":"Flights","Home_My_Booking":"My Bookings","ButtonText_Hotel":"Hotels","Currency_DanishKroner":"Danish Kroner","key.currency.vnd":"Vietnamese Dong","key_gotop_social_title":"Be in the loop for EXCLUSIVE DEALS","LabelText_Home_CtripMobile":"Download App for Free","ButtonText_Personalinformation":"Do Not Sell My Personal Information","Currency_AustralianDollar":"Australian Dollar","Airport_Transfer":"Airport Transfers","Currency_VND":"VND","ButtonText_Deals":"Deals","Key_Support_Language":"Supported Languages:","LinkButtonText_VBooking":"Become a Supplier","key.currency.twd":"New Taiwan Dollar","ButtonText_TravelGuide":"Destinations","ButtonText_Cars":"Cars","key.currency.myr":"Malaysian Ringgit","ButtonText_ChinaGuide":"China Travel Guide","key.currency.omr":"Omani Rial","Currency_UnitedKingdomPound":"British Pound","key.currency.sek":"Swedish Krona","ButtonText_TripPlus":"Trip.com Rewards","V3_Accounts_Coupon_Label_Coupon":"Promotion code","LabelText_Home_SearchBox_Packages":"Vacation Packages","key.currency.china.cny":"Chinese Yuan","ButtonText_Carhire":"Car Rentals","key.currency.ars":"Argentine Peso (AR$)","key.currency.qar":"Qatari Riyal","ButtonText_SiteMap":"Site Map","key.currency.hk":"Hong Kong Dollar (HK$)","Key_Selected":"Selected:","ANNOUNCE_LINK_TEXT_COOKIE_USAGE":"Use of Cookies","ANNOUNCE_MAIN_TEXT_COOKIE_USAGE":"We use cookies to ensure we can give you the best experience possible on our site. By using this website, you are deemed to consent to our {0}.","key.currency.krw":"Korean Won (₩)","PageHead_CurrencyFavoriteTxt":"Top currencies","ButtonText_NewsRoom":"News","Currency_INR":"Indian Rupee","key.currency.pln":"Polish Zloty","key.currency.jpy":"Japanese Yen","ButtonText_PointPlus":"Rewards Program - PointsPLUS","ButtonText_SigninOrRegister":"Sign in/Register","V2_Home_AppDownload_Get":"Get the FREE Trip.com app now","key_header_entry":"List My Hotel","ButtonText_CtripService":"Trip.com Services","Key_Entrance_Title":"Member Tiers","LinkButtonText_TermsAndCondition":"Terms \u0026 Conditions","LabelText_Logo":"Travel to China with Trip.com","ButtonText_More":"Other Services","key_gotop_social_btn":"Join Now","FooterTitle":"Explore More","Currency_SwissFranc":"Swiss Franc","ButtonText_Company":"About","Home_Chat":"Service Chat","key_sister_brand":"Trip.com is part of Trip.com Group Limited, one of the world\u0027s leading providers of travel services.","key.currency.nzd":"New Zealand Dollar","Currency_KoreanWon":"Korean Won","V3_Profile_Points":"Trip Coins","key_app":"App","key.currency.brl":"Brazilian Real","Currency_ChineseYuan":"Chinese Yuan","PageHead_SiteAllTxt":"Languages","Currency_TRY":"Turkish Lira","key.currency.mxn":"Mexican Peso (Mex$)","ANNOUNCE_LINK_TEXT_CTRIP":"Learn more here","ANNOUNCE_LINK_TEXT_TRIP":"Learn more here","trip_online_header_more":"More","key.currency.ils":"Israeli New Shekel","Help":"Help","ButtonText_Right_Reserved":"Copyright © 2023 Trip.com Travel Singapore Pte. Ltd. All rights reserved\u003cbr\u003eSite Operator: Trip.com Travel Singapore Pte. Ltd. Travel License No. 02943","Currency_CanadianDollar":"Canadian Dollar","key.currency.try":"Turkish Lira","key.currency.hkd":"Hong Kong Dollar (HK$)","key.currency.jod":"Jordanian Dinar","ButtonText_Cruises":"Cruises","Currency_BRL":"Brazilian Real","ButtonText_AirportTransfers":"Airport Transfers","key.currency.eur":"Euro (€)","ButtonText_TTD":"Attractions \u0026 Tours","LabelText_Home_SearchBox_Flight":"Flights","key.currency.cad":"Canadian Dollar","key_gotop_social_hint":"Join group for exclusive deals.","Key_Account_Coins_Tips":"Start earning Trip Coins now!","V2_Home_AppDownload_Email_Send":"Email sent! Check your inbox for a download link.","Currency_JapanesYen":"Japanese Yen","ButtonText_SignInRegister":"Account","key_cusSupport_faq":"More {0} FAQ","ButtonText_TelAndAddress":"Contact Trip.com","Currency_NewTaiwanDollar":"New Taiwan Dollar","ANNOUNCE_MAIN_TEXT_TRIP_02":"Looking for the original Trip.com? You can find it at {0}","LinkButtonText_FeedBack":"Website Feedback","key.currency.sar":"Saudi Riyal","LinkButtonText_Listyourhotel":"List My Hotel","locale_time_tips":"All dates are in local time","Key_Flight_Price_Alerts":"Flight Price Alerts","key_online_footer_payment_methods":"Payment Methods","ButtonText_LoginUser_Signout":"Sign Out","ButtonText_Security":"Security","Currency_IndonesiaRupiahs":"Indonesian Rupiah","ButtonText_Tel_Detail":"Other countries and regions","key.currency.inr":"Indian Rupee","Currency_PLN":"Polish Zloty","key.currency.cny":"Chinese Yuan","key.currency.php":"Philippine Peso","key.currency.usd":"United States Dollar (US$)","ButtonText_BookAsGuest":"Booked as a guest?","Currency_UnitedStatesDollar":"United States Dollar","ButtonText_CopyRight":"Copyright","ButtonText_LoginUser_Reviews":"Reviews","ButtonText_TripGroup":"About Trip.com Group","Car_Hire":"Cars","Home_GoTop":"Back to top","Currency_ThaiBaht":"Thai Baht","Key_Account_Coins_Worth":"approx. {0}","PageHead_CurrencyAllTxt":"Currency","Currency_SwedishKronor":"Swedish Kronor","Currency_SingaporeDollar":"Singapore Dollar","key_online_footer_business_partners":"Our Partners","ButtonText_Career":"Careers","ButtonText_Trains":"Trains","ButtonText_SearchBookings":"Search Bookings","ButtonText_InvestorRelations":"Investor Relations","ButtonText_Signin":"Sign In","Currency_NewZealandDollar":"New Zealand Dollar","Currency_RussianRuble":"Russian Ruble","ButtonText_Affiliate_trip":"Partners","V3_Profile_Moments":"My Posts","ButtonText_AboutCtrip":"About Trip.com","PageHead_LocaleSelected":"Current Language","LinkButtonText_FAQs":"FAQs","key.currency.uah":"Ukrainian Hryvnia","ButtonText_Reserved":"Trip.com. All rights reserved","ButtonText_Hotel_Collection":"Favourites","ButtonText_SearchByEmail":"Search Guest Bookings","Currency_HongKongDollar":"Hong Kong Dollar","ButtonText_CorporateTravel":"Corporate Travel","Currency_Euro":"Euro","V2_Home_AppDownload_Enter_Email":"Enter email address"};
  if (!window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__) {
      window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__ = {};
  }
  if (!window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__['i18n_100009239']) {
      window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__['i18n_100009239'] = LANGUAGE
  } else {
      if (typeof Object.assign !== 'function') {
          for (var key in LANGUAGE) {
              window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__['i18n_100009239'][key] = LANGUAGE[key]
          }
      } else {
          window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__['i18n_100009239'] = Object.assign(
              window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__['i18n_100009239'],
              LANGUAGE
          )
      }
  }
  var hasDefine = typeof define === 'function' && define.amd,
      hasExports = typeof module !== 'undefined' && module.exports;
  if (hasDefine) {
      if (!window.__shark_app_defined) {
          define(definition);
          window.__shark_app_defined = true;
      }
      define('i18n_100009239', definition);
  } else if (hasExports) {
      module.exports = definition();
  } else {
      this[name] = definition();
  }
})('i18n_100009239', function () {
  var LANGUAGE = window.__SHARK_ARES_SDK_INTERNAL_RESOURCE__['i18n_100009239'];
  if (typeof Proxy === 'function') {
      var LANGUAGE_PROXY = new Proxy(LANGUAGE, {
          get: function (target, property) {
              if (typeof property === 'symbol') {
                  return property;
              } else if (property in target) {
                  if (recentUsedKeyWorker) {
                      recentUsedKeyWorker.postMessage("100009239|en-SG|" + property + (pageid ? '|' + pageid : ''));
                  }
                  if (window.__SHARK_PLUGIN_STATUS__ && window.__SHARK_PLUGIN_STATUS__ === 1) {
                      return '<i data-key=\'' + property + '\' data-appid=\'100009239\'>' + target[property] + '</i>';
                  }
                  return target[property];
              } else {
                  
                  if (recentUsedKeyWorker && property !== '__esModule') {
                      recentUsedKeyWorker.postMessage("!100009239|en-SG|" + property + (pageid ? '|' + pageid : ''));
                  }
                  return null;
              }
          },
          set: function (target, property, value) {
              target[property] = value;
              return true;
          }
      });
      return LANGUAGE_PROXY;
  }
  return LANGUAGE;
});


