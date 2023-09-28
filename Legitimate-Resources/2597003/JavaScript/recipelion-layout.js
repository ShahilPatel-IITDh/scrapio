/* Start Teaching Aids, LLC Header Bidder Code for recipelion.com  */

/*  Prebid Variable Area   */

var kPrebidTimeout = 1200;                  // milliseconds
var kRefreshPollTime = 1300;                // milliseconds

var gRefreshCount = 1000;
var gOXRefreshCount = 20;
var gRefreshDebug = false;
var gPrebidDebug = false;
var gTrackVisibility = true;                // Turns visibility refresh when true
var gLazyLoad = false;                       // LazyLoad enabled when true
var gTrackPageVisibility = true;           // Active Tab enabled when true

var k30SecondRefreshInterval = 30000;       // milliseconds
var k60SecondRefreshInterval = 60000;       // milliseconds
var k90SecondRefreshInterval = 90000;       // milliseconds
var k120SecondRefreshInterval = 120000;     // milliseconds
var k180SecondRefreshInterval = 180000;     // milliseconds
var k999SecondRefreshInterval = 9999999;    // milliseconds
var kDoNotRefresh = 0;

var kDefaultRefreshInterval = k30SecondRefreshInterval;

// Prebid Supply Chain nodes passed to pbjs
// sid: must match the value for this site
// contained in the AdmetricsPro sellers.json

var gSChainNodes = [{ "asi": "admetricspro.com", "sid": "443", "hp": 1 },];

// Set the locale below to test CMP geographies, otherwise set to undefined
// to use visitor's locale set by OS and browser.

var gGDPR_forceLocale = undefined;   // set this 'fr-fr' and it will force the CMP to fire
// leave at undefined to work normal

// if the next two variables are set to false the CMP will operate normal
var gGDPR_silentNoConsent = false;    // if set to true a consent window will NOT show and consent will be set to No Consent
var gGDPR_forceNoConsent = false;    // if set to true a consent will show and consent window but will inform the user
// that no cookies are collected by this site
var gGDPR_NonTCFVendors = [];
var gGDPR_publisherCountryCode = "US";      // See https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 if you need something else
var gGDPR_logoURL = "https://qd.admetricspro.com/js/prime-publishing/recipelion/recipelion.PNG";
var gGDPR_privacyPolicyURL = "https://www.recipelion.com/index.php/hct/privacy_policy";
var gAMPidentityLinkID = '1336';      //  this is for ATS LiveRamp identity mapping

// Set the publisher ID below to enable Amazon, otherwise set to undefined.

var kAmazonPublisherID = 'cb8cfc89-e83e-44aa-a3a2-ff78eda781ef';

//
//      'cb8cfc89-e83e-44aa-a3a2-ff78eda781ef';
// or    undefined;
// Ad slot definitions and configurations. Each of the ad units also
// needs to appear in the gAllSlotData array variable at the end of
// this section (if you create a new ad, make sure it is in gAllSlotData
// and if you remove an ad, make sure you remove it from gAllSlotData).
//

var ad300x250ATF = {
    slot_adUnitPath: '/22404337467,1049349/recipelion.com-300x250-ATF',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]
        }
    },
    code: 'div-gpt-ad-1570172647137-0',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'recipelion.com-300x250-ATF', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-ATF@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859683' } },
        { bidder: 'ix', params: { siteId: '428978', id: '3', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191072', sizes: '15', position: 'atf'} },
        {bidder: 'nativo', params: { placementId: '1191575' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x250ATF2 = {
    slot_adUnitPath: '/22404337467,1049349/recipelion.com-300x250-ATF2',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]
        }
    },
    code: 'div-gpt-ad-1570172763476-0',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'recipelion.com-300x250-ATF2', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-ATF2@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859684' } },
        { bidder: 'ix', params: { siteId: '428979', id: '4', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191074', sizes: '15', position: 'atf'} },
        {bidder: 'nativo', params: { placementId: '1191576' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x250BTF = {
    slot_adUnitPath: '/22404337467,1049349/recipelion.com-300x250-BTF',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]
        }
    },
    code: 'div-gpt-ad-1570172817708-0',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'recipelion.com-300x250-BTF', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-BTF@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859685' } },
        { bidder: 'ix', params: { siteId: '428980', id: '5', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191076', sizes: '15', position: 'btf'} },
        {bidder: 'nativo', params: { placementId: '1191577' } },
    ],
    slot_options: { refreshInterval: 45000, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x250BTF2 = {
    slot_adUnitPath: '/22404337467,1049349/recipelion.com-300x250-BTF2',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]
        }
    },
    code: 'div-gpt-ad-1570172862342-0',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'recipelion.com-300x250-BTF2', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-BTF2@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859686' } },
        { bidder: 'ix', params: { siteId: '428982', id: '6', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191078', sizes: '15', position: 'btf'} },
        {bidder: 'nativo', params: { placementId: '1191578' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x600ATF = {
    slot_adUnitPath: '/22404337467,1049349/RecipeLion-com_right-rail-C_300-600',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 600],
            ]
        }
    },
    code: 'div-gpt-ad-1627441125473-0',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'RecipeLion-com_right-rail-C_300-600', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: 'omDiPTQm99Fveh8ExQIBsEDp' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x600-ATF@300x600' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859691' } },
        { bidder: 'ix', params: { siteId: '428984', id: '7', size: [300, 600] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6798', unitName: 'cnsmbl-audio-300x600', zoneIds: [2002275] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        {bidder: 'nativo', params: { placementId: '1191579' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad728x90ATF = {
    slot_adUnitPath: '/22404337467,1049349/RecipeLion-com_header-int-A_728-90',
    mediaTypes: {
        banner: {
            sizes: [
                [728, 90],
            ]
        }
    },
    code: 'div-gpt-ad-92846-0',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'RecipeLion-com_header-int-A_728-90', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [728, 90], pkey: 'elt97OZAJZZiZBJfDED51uJc' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-728x90-ATF@728x90' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859687' } },
        { bidder: 'ix', params: { siteId: '428986', id: '8', size: [728, 90] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6796', unitName: 'cnsmbl-audio-728x90-slider', zoneIds: [2002273] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191072', sizes: '2', position: 'atf'} },
        {bidder: 'nativo', params: { placementId: '1221328' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad728x90Sticky = {
    slot_adUnitPath: '/22404337467,1049349/RecipeLion-728x90-Sticky',
    mediaTypes: {
        banner: {
            sizes: [
                [728, 90],
            ]
        }
    },
    code: 'div-gpt-ad-1627439195901-0',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'RecipeLion-728x90-Sticky', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [728, 90], pkey: 'HACePnrD3xaTEs2nsFA9Kg9F' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-728x90-BTF@728x90' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859688' } },
        { bidder: 'ix', params: { siteId: '428988', id: '9', size: [728, 90] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6796', unitName: 'cnsmbl-audio-728x90-slider', zoneIds: [2002273] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191082', sizes: '2', position: 'atf'} },
        {bidder: 'nativo', params: { placementId: '1221328' } },
    ],
    slot_options: { refreshInterval: 30000, reportButton: false, ampLinkButton: false, floating: true, floatingXOffset: 92 }
};

var ad160x600BTF = {
    slot_adUnitPath: '/22404337467,1049349/RecipeLion-com_left-rail-A_120-600',

    mediaTypes: {
        banner: {
            sizes: [
                [160, 600], [120, 600],
            ]
        }
    },
    code: 'div-gpt-ad-92846-1',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'RecipeLion-com_left-rail-A_120-600', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [160, 600], pkey: '5ZIJn77DrwRaToIMjphE4Pc1' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-160x600-BTF@160x600' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859690' } },
        { bidder: 'ix', params: { siteId: '428977', id: '2', size: [160, 600] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6797', unitName: 'cnsmbl-audio-160x600-slider', zoneIds: [2002274] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191072', sizes: '9', position: 'btf'} },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x250_MOBILE_B = {
    slot_adUnitPath: '/22404337467,1049349/RecipeLion-com_MOBILE_center-B',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]
        }
    },
    code: 'div-gpt-ad-92846-9',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'RecipeLion-com_MOBILE_center-B', useAdUnitCodeAsAdUnitElementId: true, environment: 'mobile' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-ATF@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859683' } },
        { bidder: 'ix', params: { siteId: '428978', id: '3', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        {bidder: 'nativo', params: { placementId: '1191580' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x250_MOBILE_C = {
    slot_adUnitPath: '/22404337467,1049349/RecipeLion-com_MOBILE_center-C',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]
        }
    },
    code: 'div-gpt-ad-92846-10',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'RecipeLion-com_MOBILE_center-C', useAdUnitCodeAsAdUnitElementId: true, environment: 'mobile' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-BTF@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859685' } },
        { bidder: 'ix', params: { siteId: '428980', id: '5', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        {bidder: 'nativo', params: { placementId: '1191581' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var adAdhesive_Mobile = {
    slot_adUnitPath: '/22404337467,1049349/Adhesive_Mobile',
    mediaTypes: {
        banner: {
            sizes: [
                [320, 100], [320, 50],
            ]
        }
    },
    code: 'div-gpt-ad-92846-1',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'Adhesive_Mobile', useAdUnitCodeAsAdUnitElementId: true, environment: 'mobile' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [320, 100], pkey: 'IuI4cJrnQpA1U19UCuNK8eXP' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-320x100-ATF@320x100' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-320x50-ATF@320x50' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859692' } },
        { bidder: 'ix', params: { siteId: '428991', id: '10', size: [320, 50] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '9223', unitName: 'cnsmbl-audio-320x50-slider', zoneIds: [2004310] } },
        { bidder: 'rubicon', params: {accountId: '19254', siteId: '392516', zoneId: '2191072', sizes: '43', position: 'atf'} },
        { bidder: 'gumgum', params: {zone: 'ic0dt99e' }},
        {bidder: 'nativo', params: { placementId: '1221328' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x250BTFMobile = {
    slot_adUnitPath: '/22404337467,1049349/recipelion.com-300x250-BTF',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]
        }
    },
    code: 'div-gpt-ad-1570172817708-2',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'recipelion.com-300x250-BTF', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-BTF@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859685' } },
        { bidder: 'ix', params: { siteId: '428980', id: '5', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        {bidder: 'nativo', params: { placementId: '1191582' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var ad300x250BTF2Mobile = {
    slot_adUnitPath: '/22404337467,1049349/recipelion.com-300x250-BTF2',
    mediaTypes: {
        banner: {
            sizes: [
                [300, 250],
            ]    
        }
    },
    code: 'div-gpt-ad-1570172862342-2',
    bids: [
        {bidder: 'sonobi', params: { placement_id: '7d986712c77c2b01c15a' }},
        {bidder: 'adyoulike', params: {placement: '67f80eb12c06ee437ac1fbad02a74cf7'}},
        { bidder: 'adagio', params: { organizationId: '1094', site: 'recipelion', placement: 'recipelion.com-300x250-BTF2', useAdUnitCodeAsAdUnitElementId: true, environment: 'desktop' } },
        { bidder: 'sharethrough', params: { iframe: true, iframeSize: [300, 250], pkey: '8XilGmuX0DF6llWmnDGhILLx' } },
        { bidder: 'pubmatic', params: { publisherId: '156858', adSlot: 'recipelion-300x250-BTF2@300x250' } },
        { bidder: 'openx', params: { delDomain: 'teachingaids-d.openx.net', unit: '540859686' } },
        { bidder: 'ix', params: { siteId: '428982', id: '6', size: [300, 250] } },
        { bidder: 'appnexus', params: { placementId: '17073940' } },
        { bidder: 'rise', params: { org: '5f50fcb1316b330001e7d227' } },
        { bidder: 'unruly', params: { siteId: '83962' } },
        { bidder: 'conversant', params: { site_id: '125949', secure: 1 } },
        { bidder: 'consumable', params: { siteId: '2000891', networkId: '9969', unitId: '6799', unitName: 'cnsmbl-audio-300x250-slider', zoneIds: [2002276] } },
        { bidder: 'triplelift', params: { inventoryCode: 'Recipelion_ROS_HDX' } },
        { bidder: "nobid", params: { siteId: 22023621549 } },
        { bidder: "amx", params: {} },
        {bidder: 'nativo', params: { placementId: '1191583' } },
    ],
    slot_options: { refreshInterval: kDefaultRefreshInterval, reportButton: false, ampLinkButton: false, minBrowserWidth: 0 }
};

var gBrowserWidth = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;


var desktopAdUnits = [ ad300x250ATF, ad300x250ATF2, ad300x250BTF, ad300x250BTF2, ad728x90ATF, ad300x600ATF, ];
var mobileAdUnits = [ ad300x250_MOBILE_B, ad300x250_MOBILE_C, adAdhesive_Mobile, ad300x250BTFMobile, ad300x250BTF2Mobile  ];

var gAllSlotData = ((window.gMobileEnabled == undefined) || (window.gMobileEnabled != true)) ? desktopAdUnits : mobileAdUnits;


var gAllSlotCount = gAllSlotData.length;


/* End Teaching Aids, LLC Header Bidder Code for recipelion.com  */
