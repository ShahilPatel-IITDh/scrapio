(function webpackUniversalModuleDefinition(root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if(typeof define === 'function' && define.amd)
        define(factory);
    else if(typeof exports === 'object')
        exports["Namespacer"] = factory();
    else
        root["Namespacer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};

/******/    // The require function
/******/    function __webpack_require__(moduleId) {

/******/        // Check if module is in cache
/******/        if(installedModules[moduleId])
/******/            return installedModules[moduleId].exports;

/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            exports: {},
/******/            id: moduleId,
/******/            loaded: false
/******/        };

/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/        // Flag the module as loaded
/******/        module.loaded = true;

/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }


/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;

/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;

/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";

/******/    // Load entry module and return exports
/******/    return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

    /* WEBPACK VAR INJECTION */(function(global) {/*!
    Namespacer
    https://github.com/sporto/namespacer.js
    */

    module.exports = function (string, obj) {
        var parts = string.split('.');
        var current = null;
        var container = global;

        while(parts.length > 0) {
            current = parts.shift();
            if (parts.length === 0) {
                // last part
                // if object is given then add that object
                // if there is already something there don't do anything
                // otherwise just create an empty object
                container[current] = obj || container[current] || {};
                return container[current];
            } else {
                container[current] = container[current] || {};
            }
            container = container[current];
        }

        return obj;
    }

    /* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
/**
 * Site tracking
 * @requires jQuery
 * @requires namespace.js (size: 3kb)
 * @requires att.lib.js (size: 4kb)
 * @return {Object} att.adobeDataLayer
 */
(function($, window){

    var module = {}; 
    var scrollAction = true;
    /**
     * multiTrack
     * @example
     * att.adobeDataLayer.pushEvent('param')
     */
    var pushEvent = function(param) {
		if (typeof param === 'undefined' || param === '') {
            // adobeDataLayer.pushEvent not received correct parameters'
            return;
        }
        if (typeof window.adobeDataLayer === 'undefined') {
            window.adobeDataLayer = window.adobeDataLayer || [];            
        }        
		 window.adobeDataLayer.push(param);
         console.log('%c'+ param + ' Tracking Event AdobeDataLayer ... ', 'background: #222; color: #bada55');
    };
    /**
     * Get the timeStamp when the page is load, this function is require to set the 
     * _att.webPageDetails.pageUrlPath.timestamp value into the adobeDataLayer
     * @example
     * att.adobeDataLayer.getTimestampOnPageLoad()
     */
    var getTimesTampOnPageLoad = function() {
        var currentTimeStamp = new Date(),
            month = currentTimeStamp.getUTCMonth() + 1,
              day = currentTimeStamp.getUTCDate(),
             year = currentTimeStamp.getUTCFullYear();                
        return month + '/' + day + '/' + year + ' ' + currentTimeStamp.getHours() + ':' + currentTimeStamp.getMinutes();
    }
    /**
     * Get the timeStamp when the page is load, this function is require to set the 
     * _att.webPageDetails.pageUrlPath.timestamp value into the adobeDataLayer
     * @example
     * att.adobeDataLayer.getTimestampOnPageLoad()
     */
     var getpreviousPageTitle = function() {
        var  previousPageInfo = {} 
      if(!$.cookie('previousPageInfo')) {    
            previousPageInfo.currentFriendlyPageName = att.pageProperties.friendlyPageName;
            previousPageInfo.currentUrl = window.location.href;
            $.cookie('previousPageInfo', JSON.stringify(previousPageInfo), { path: '/', expires: 1 })
      }else if($.cookie('previousPageInfo').url !== window.location.href) {  
            previousPageInfo.previousFriendlyPageName = JSON.parse($.cookie('previousPageInfo')).currentFriendlyPageName;
            previousPageInfo.previousUrl = JSON.parse($.cookie('previousPageInfo')).currentFriendlyPageName;
            previousPageInfo.currentFriendlyPageName = att.pageProperties.friendlyPageName;
            previousPageInfo.currentUrl = window.location.href;            
            $.cookie('previousPageInfo', JSON.stringify(previousPageInfo), { path: '/', expires: 1 })
      }
            return JSON.parse($.cookie('previousPageInfo')).previousFriendlyPageName    
    }

    var handleFirtFormElementOnFocus = function($formContainer,formData) {
        $formContainer.find("input[type!='hidden']").each(function(){
            $(this).on('focus', function(e) { 
                if(!$formContainer.attr('data-visited')) {
                    att.adobeDataLayer.pushEvent(att.adobeDataLayerManager.trackingDataForm.startAction(null, formData));
                    $formContainer.attr('data-visited',true);
                }
            });
        });
    }
    var handleScrollDepthAdobeDataLayerTracking = function () {
        if ($(window).scrollTop() > $('body').height() / 2) {
            $(window).unbind('scroll', handleScrollDepthAdobeDataLayerTracking); 
            if(scrollAction) {
                att.adobeDataLayer.pushEvent({
                    event: 'scroll-action'
                });            
                scrollAction = false;
            }
        }
    }
    
    module.adobeDataLayer = {
        pushEvent: pushEvent,
        getTimesTampOnPageLoad:getTimesTampOnPageLoad,
        getpreviousPageTitle:getpreviousPageTitle,
        handleFirtFormElementOnFocus:handleFirtFormElementOnFocus,
        handleScrollTracking:handleScrollDepthAdobeDataLayerTracking,
    }

    Namespacer('att.adobeDataLayer', module.adobeDataLayer);
})(jQuery.noConflict(), window);
 

jQuery(window).on('load', function() {   
    var globalName = att.pageProperties.appCode + '|' + att.pageProperties.siteSection + '|' + att.pageProperties.siteSubSection1 +'|'+ att.pageProperties.siteSubSection2 +'|'+ att.pageProperties?.friendlyPageName;
    att.adobeDataLayerManager = {
        /**
         * Tracking PageViewPushData
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */           
        pushDataPageView : { 
                web: {
                    webPageDetails: {
                        name: globalName,
                        siteSection: att.pageProperties.siteSection,                            
                        pageViews: {
                            value: 1
                        }
                    }//webPageDetails
                },//web
                _att: {
                    webPageDetails: {
                        pageUrlPath: att.pageProperties.url,//validated
                        pageTitle: att.pageProperties.pageTitle,//validated
                        friendlyPageName: att.pageProperties.friendlyPageName || '',
                        siteSubSection2: att.pageProperties.siteSubSection1,//validated
                        siteSubSection3: att.pageProperties.siteSubSection2,//validated
                        previousPage: att.adobeDataLayer.getpreviousPageTitle() || '',
                        pageOwnership: att.pageProperties.pageOwnership,//validated
                        pageGrouping: att.pageProperties.pageGroup,//validated
                        lineOfBusiness: att.pageProperties.lineOfBusiness,//validated
                        pageFunction: att.pageProperties.pageFunction, //validated
                        timestamp: att.adobeDataLayer.getTimesTampOnPageLoad(),//validated
                        siteName: window.location.hostname.replace('www',''),//validated
                        breadCrumbTrail: jQuery('#breadcrumb-component')?.data('items') || '',//validated
                        flowCode: att.pageProperties.flowCode,
                        // language: att.pageProperties.language || "en",
                        /********* 
                        - Note from Email Sent, re : 
                        - The second item on white paper is some new element introduced by this SDRx.
                        - it has nice to have parameter  so was added.   If White paper do not exist , it may not be left blank. 
                        ***********/
                        whitePaperViews: {
                            value: att.pageProperties.type == 'Whitepaper' ? 1 : ''
                        },
                        productAttributes: {
                            primaryPortfolio: att.pageProperties.category || '',
                            vertical: att.pageProperties.vertical || '',
                            segment: att.pageProperties.segment || '', // up to 4 val-ues
                            productName: '' // up to 4 val-ues
                        },                                                                      
                    },//webPageDetails
                    environment: {
                        responsiveExperience: att.pageProperties.responsiveWebDesignFlag == 1 ? 'Responsive': 'Nonresponsive' ,//validated
                        templateSize: att.pageProperties.viewedUIExperience//validated
                    },//environment
                    mediaDetails: {
                        videoType: '',
                        type: att.pageProperties.type,
                        class: att.pageProperties.class,
                        objective: att.pageProperties.objective,
                        category: att.pageProperties.category,
                        vertical: att.pageProperties.vertical,
                        publishDate: att.pageProperties.publishDate,
                        publisher: att.pageProperties.publisher,
                        persona: att.pageProperties.persona,
                        format: '',
                        contentAuthor: att.pageProperties.contentAuthor
                    },
                    beaconEventAction: 'pageLoad',//validated                    
                },//_att
                productListItem: []    
        },//pushDataPageView
        /**
         * Tracking PageViewPushEvents Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */           
        pushEventPageView : {
            event: 'page-view', 
                web: {
                    webPageDetails: {
                        siteSection: att.pageProperties.siteSection,
                        server: window.location.origin.replace(/(^\w+:|^)\/\//, ''),
                        // language: att.pageProperties.language || "en",
                    }//webPageDetails
                },//web 
                _att: {
                    webPageDetails: {
                        siteSubSection2: att.pageProperties.siteSubSection1,
                        siteSubSection3: att.pageProperties.siteSubSection2,
                        pageUrlPath: att.pageProperties.url || window.location.pathname,                        
                        friendlyPageName : att.pageProperties.friendlyPageName || '',
                        language: att.pageProperties.language || "en",
                    },//webPageDetails
                    environment: {
                        responsiveExperience: att.pageProperties.responsiveWebDesignFlag == 1 ? 'Responsive': 'Nonresponsive' ,//validated
                        templateSize: att.pageProperties.viewedUIExperience
                    },//environment
                    user: {                     
                        // ecid: ((typeof(_satellite)=='object' && _satellite.hasOwnProperty('getVar'))? _satellite.getVar( 'xyLocation' ):''),  // this doesn't need to be set in the data layer. Remove it.      
                        authenticationStatus: 'Unauthenticated'
                    }//user
                }//_att 
        },//pushEventPageView       
        /**
         * Tracking Form Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */        
        trackingDataForm : {
            startAction : function (event, clickData) { 
                return {
                    event: 'form-start-action', 
                        _att: { 
                            form: {
                                name: clickData.name || '',
                                type: clickData.type || '',
                            }//form
                        } //att 
                }; //return 
            } ,

            completeAction : function (clickData) {
                return {
                    event: 'form-complete-action', 
                        _att: {
                          form: {
                            name: clickData.name,
                            details: Object.keys(clickData.details).filter(function(j) {
                                return clickData.details[j] !==""}).map(function(k) {
                                    return clickData.details[k]}).join("|"),
                            eventCode: 'MCOM_Contact_Me_Submit',
                            successFlag: 1,
                          }
                        }                                     
                }; //return 
            },

            errorAction : function (dataMessage) {
                return {
                    event: 'error-action', 
                        _att: {
                            error: {
                                type: 'form',
                                message: dataMessage.msg
                            },//form
                            form: {
                                type: 'form',
                                name: dataMessage.name
                            }                            
                        } //att 
                }; //return 
            },
        },
        /**
         * Tracking Video Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */                
        trackingDataVideo : {
            pauseAction : function (event, clickData) {
               return {
                event: 'video-commence-action',
                    _att: {
                        videoID: clickData.videoID,
                        friendlyName: clickData.friendlyName,
                        totalLength: clickData.totalLength
                    }
               }
            },            

            startAction : function (event, clickData) {
                return {
                    event: 'video-start-action', 
                        _att: {
                            video: {
                                videoID: clickData.mediaId || '',
                                friendlyName: clickData.mediaFriendlyName || '',
                                totalLength: {
                                    value: clickData.videoLengthTotal || '',
                                },
                                // networkProvider: '<value> on question',
                                // streamingNetwork: '<value> on question',
                                // videoSource:  clickData.mediaSource || '',
                                // playerName: clickData.mediaPlayerName || '',
                                // seriesName: clickData.mediaSeriesName || '',
                                // type: clickData.videoType || '',
                                // mediaType: clickData.mediaType || '',
                                // mediaClass: clickData.mediaClass || '',
                                // mediaObjective: clickData.mediaObjective || '',
                                // mediaCategory: clickData.mediaCategory || '',
                                // mediaVertical: clickData.mediaVertical || '',
                                // mediaPublishDate: clickData.mediaPublishDate || '',
                                // mediaPublisher: clickData.mediaPublisher || '',
                                // mediaPersona: clickData.mediaPersona || '',
                                // mediaFormat: '<value> on question',                                
                                // loadTime: '<value> on question',
                                // prerollFlag: {
                                //     value: 1
                                // }
                            }//video
                        } //att 
                }; //return 
            } ,

            complete25Action : function () {
                return {
                    event: 'video-25complete-action',
                }; //return 
            },

            complete50Action : function () {
                return {
                    event: 'video-50complete-action',
                }; //return 
            },   

            complete75Action : function () {
                return {
                    event: 'video-75complete-action',
                }; //return 
            }, 

            completeAction : function (data) {
                return {
                    event: 'video-complete-action',                    
                    _att: {
                        video: {
                            videoID: data.videoID,
                            friendlyName: data.friendlyName,
                            totalLength: { 
                                value: data.totalLength
                            },
                            mediaDetails: {
                              videoType: data.mediaDetails.videoType,
                              type: data.mediaDetails.type,
                              class: data.mediaDetails.class,
                              objective: data.mediaDetails.objective,
                              category: data.mediaDetails.category,
                              vertical: data.mediaDetails.vertical,
                              publishDate: data.mediaDetails.publishDate,
                              publisher: data.mediaDetails.publisher,
                              persona: data.mediaDetails.persona,
                              format: data.mediaDetails.format,
                              contentAuthor: data.mediaDetails.contentAuthor
                            },
                        },
                    },                  
                }; //return 
            },  
        },
        /**
         * Tracking Search Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */                 
        trackingDataSearch : {
            pushDataJson : function (clickData) {
                return { 
                    siteKnowledge: {
                        supportSiteSearch: {
                            term: clickData.currentSearchTerm || '',
                            numberOfResults: clickData.currentSearchResultCount || 'ZERO',
                            searchType: clickData.internalSearchType || '',
                        }
                    }, //siteKnowledge
                    _att: {
                        siteKnowledge: {
                            supportSiteSearch: {
                                autoSuggestDisplayed: {
                                    value: 1
                                },
                                autoSuggestClick: {
                                    value: clickData.autoSuggestClicked
                                }
                            } //supportSiteSearch
                        } //siteKnowledge
                    } //_att 
                }; //return 
            },
            pushEventJson : function () {
                return {
                    event: 'search-clickthru-action',
                }; //return 
            },  
            pushDataAutoSuggestDisplayedJson : function () {
                return { 
                        _att: {
                            siteKnowledge: {
                                supportSiteSearch: {
                                    autoSuggestDisplayed: {
                                        value: 1
                                    }
                                } //supportSiteSearch
                            } //siteKnowledge
                        } //_att 
                }; //return 
            },
            pushDataAutoSuggestClickJson : function () {
                return { 
                        _att: {
                            siteKnowledge: {
                                supportSiteSearch: {
                                    autoSuggestClick: {
                                        value: 0
                                    }
                                } //supportSiteSearch
                            } //siteKnowledge
                        } //_att 
                }; //return 
            },                
        }, 
        /**
         * Tracking Alert Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */          
        trackingDataAlert : {
            alertActionMessage: function(message) {
                return {
                    event: 'alert-action', 
                        _att: {
                            alertMessage: message
                        } 
                }
            }  
        },
        /**
         * Tracking DataLead Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */          
        trackingDataLeadGen: {
            raiFormIsSubmitted:function(){
                return {
                    event: 'rai-submit-action',
                }
            },
            gatedFormIsSubmitted:function() {
                return {
                    event: 'gated-submit-action',
                }
            },
            digitalFormIsSubmitted:function(dataForm) {
                return {
                    event: 'digital-lead-form-start-action', 
                        _att: {
                            leadgen: {
                                digitalLeadFormName: dataForm.name,
                            }
                        } 
                }
            },
            digitalFormIsComplete:function(dataForm) {
                return {
                    event: 'digital-lead-form-complete-action', 
                        _att: {
                            leadgen: {
                                digitalLeadFormName: dataForm.name,
                            }
                        } 
                }
            },            
        },
        /**
         * Tracking NewLetterForm Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */  
        trackingDataFeedbackNewsletter: {
            /**
             *
             * @description When the visitor clicks "Helpful" on requested feedback,
             * When the visitor clicks “Helpful” on requested feedback
             * @return Object
             *
             */
            visitorRequestedFeedback : function () {
                return {
                    event: 'feedback-helpful-action',
                }; //return 
            },
            /**
             *
             * @description When the visitor clicks “NOT Helpful” on requested feedback,
             * Set the “event” data layer variable to "feedback-nothelpful-action"
             * @return Object
             *
             */
            visitorNoRequestedFeedback : function () {
                return {
                    event: 'feedback-nothelpful-action',
                }; //return 
            },
            /**
             *
             * @description When the visitor submits their email address for the newsletter,
             * Set the “event” data layer variable to "newsletter-submit-action"
             * @return Object
             *
             */
            visitorSubmitedEmailNewsletter : function () {
                return {
                    event: 'newsletter-subscription-action',
                    _att: {
                        newsletterSubscribeSubmits: {
                            value: 1
                        }
                    }                
                }; //return 
            },
        },        
        /**
         * Tracking User Custom Type Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         * @version    Release: ATT_aa_WebSDK_TechSpec-20211213[1667].pdf
         * @link       Email sent by Greg 12/15/2021 9:05am, Email subject ATT AA working session 
         */
        trackingUserCustomTypeData : {
            /**
             *
             * Will be set before the last push i.e. the data layer with the event: “page-view”.
             * When the visitor lands on a page and have the user related data available
             * @return   Object
             *
             */
            userLaunchObjects:function() {
                return {
                    _att: {
                        user: {
                            customerType: att.pageProperties.customerType, 
                            flowCode: att.pageProperties.flowCode,  
                            connectedCommunity: '',
                            customSegmentation: '',
                            eligibilityType: '',
                            fanAttributes: '',
                            accountGroup: '',
                            serviceSegment: att.pageProperties.segment
                        }
                    }
                }
            },
            /**
             *
             * Set the “event” data layer variable to: 'user-do-not-call-select-action'
             * When the visitor selects “Do not Call”
             * @return   Object
             *
             */
            userDoNotCall:function() {
                return {
                    event: 'user-do-not-call-select-action'
                }
            }, 
            /**
             *
             * Set the “event” data layer variable to: 'user-email-save-action'
             * When the visitor provided their contact email address.
             * @return   Object
             *
             */
            userProvidedTheirContactEmail:function(){
                return {
                    event: 'user-email-save-action'
                }
            },
            /**
             *
             * Set the “event” data layer variable to: 'user-wireless-number-save-action'
             * When the visitor provides their contact wireless number.
             * @return   Object
             *
             */
            UserProvidesTheirContactWirelessNumber:function(){
                return {
                    event: 'user-wireless-number-save-action'
                }
            },
            /**
             *
             * Set the “event” data layer variable to: 'user-text-option-action'
             * When the visitor opted in to be notified via texts for communi-cation alerts.
             * @return   Object
             *
             */
            userNotifiedViaTextsAlert:function(){
                return {
                    event: 'user-text-optin-action'
                }
            },
            /**
             *
             * Set the “event” data layer variable to: 'user-call-option-action'
             * When the visitor in to be noti-fied via phone for communica-tion alerts.
             * @return   Object
             *
             */
            userNotifiedViaPhoneAlert:function(){
                return {
                    event: 'user-call-optin-action'
                }
            },
            /**
             *
             * Set the “event” data layer variable to: 'user-email-option-action'
             * When the visitor opted into email notifications
             * @return   Object
             *
             */
            userNotifiedViaEmailAlert:function() {
                return {
                    event: 'user-email-optin-action'
                }
            },
            /**
             *
             * Set the “event” data layer variable to: 'user-service-availability-check-action'
             * When the visitor checks avail-ability for service.
             * @return   Object
             *
             */
             visitorCheckAvailabilityServices:function() {
                return {
                    event: 'user-service-availability-check-action'
                }
            },            
        },

        /**
         * Tracking Event Code
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         * @version    Release: ATT_aa_WebSDK_TechSpec-20211213[1667].pdf
         * @link       Email sent by Greg 12/15/2021 9:05am, Email subject ATT AA working session 
         */

        trackingEventCodeData: {
            /**
             * When an Invoca submit happens. 
             * Set the “event” data layer variable to “eventcode-action” Set the “eventCode” 
             * variable to “Invoca_Call_Submit
             * @return   Object
             *
             */
            invocaCallSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                        eventCode: 'Invoca_Call_Submit' 
                    } 
                }
            },
            /**
             * When the visitor submits a Chat request
             * Set the “event” data layer variable to “event-code-action” Set the “eventCode” 
             * variable to “Chat_Request_Submit”
             * @return   Object
             *
             */
             ChatRequestSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                        eventCode: 'Chat_Request_Submit' 
                    } 
                }
            },
             /**
             * When the visitor submits an MCOM Search Text
             * Set the “event” data layer variable to “event-code-action” 
             * Set the “eventCode” variable to “MCOM_Search_TextSubmit”
             * @return   Object
             *
             */
            mcomsearchTextSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                        eventCode: 'MCOM_Search_TextSubmit' 
                    } 
                }
            },
            /**
             * When the visitor submits an MCOM Contact me
             * Set the “event” data layer variable to “event-code-action” 
             * Set the “eventCode” variable to “MCOM_contact_Me_Submit”
             * @return   Object
             *
             */
             mcomContactMeSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                        eventCode: 'MCOM_contact_Me_Submit' 
                    } 
                }
            },
            /**
             * When the visitor confirms an MCOM Fleet Complete Order
             * Set the "event" data layer variable to "event-code-action" 
             * Set the "eventCode" variable to "MCOM_FleetComplete_Order_Confirm"
             * @return   Object
             *
             */
             mcomFleetCompleteOrderConfirm:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                     eventCode: 'MCOM_FleetComplete_Order_Confirm' 
                    } 
                }
            },
            /**
             * When the visitor submits an MCOM Fleet Complete Order
             * Set the "event" data layer variable to "event-code-action" 
             * Set the "eventCode" variable to "MCOM_FleetComplete_Order_Subm"
             * @return   Object
             *
             */
             mcomFleetCompleteOrderSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                     eventCode: 'MCOM_FleetComplete_Order_Submit' 
                    } 
                }
            },        
            /**
             *when the visitor submits a Foresee Feedback Invite Accept
             * Set the "event" data layer variable to "event-code-action" 
             * Set the "eventCode" variable to "Foresee_Feedback_Invite_Accept_Submit"
             * @return   Object
             *
             */
             ForeseeFeedbackInviteAcceptSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                     eventCode: 'Foresee_Feedback_Invite_Accept_Submit' 
                    } 
                }
            },   
            /**
             * When the visitor downloads an MCOM Gated file
             * Set the "event" data layer variable to "event-code-action" 
             * Set the "eventCode" variable to "MCOM_Gated_Download"
             * @return   Object
             *
             */
             mcomGatedDownload:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                     eventCode: 'MCOM_Gated_Download' 
                    } 
                }
            },     
            /**
             * When the visitor submits an MCOM AWB Order
             * Set the “event” data layer variable to “event-code-action” 
             * Set the “eventCode” variable to “MCOM_AWB_Order_Submit”
             * @return   Object
             *
             */
             mcomAwbOrderSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                     eventCode: 'MCOM_AWB_Order_Submit' 
                    } 
                }
            },
            /**
             * when the visitor confirms an MCOM AWB Order
             * Set the "event" data layer variable to "event-code-action" 
             * Set the "eventCode" variable to "MCOM_AWB_Order_Confirm"
             * @return   Object
             *
             */
             mcomAwbOrderSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                     eventCode: 'MCOM_AWB_Order_Confirm' 
                    } 
                }
            },    
            /**
             * When the visitor submits an MCOM Newsletter Subscription 
             * Set the "event" data layer variable to "event-code-action" 
             * Set the "eventCode" variable to "MCOM_Newsletter_Subscription_Submit"
             * @return   Object
             *
             */
             mcomNewsletterSubscriptionSubmit:function() {
                return  {
                    event: 'event-code-action', 
                    _att: {
                     eventCode: 'MCOM_Newsletter_Subscription_Submit' 
                    } 
                }
            },                                                                             
        },
        /**
         * Tracking Chat Witget Events Data
         *
         * This Object  provides instructions to set the data layer and Launch 
         * objects for user tracking on the site.
         *
         */  
        trackingChatActionEvents: {
            /**
             *
             * @description When the visitor lands on a page with chat module
             * @return Object
             *
             */
            visitorLandOnPageWithChatModule(data) {
                return {
                    _att: {
                        chat: {
                            chatReason: data.chatReason|| '',
                            chatID: data.chatID|| '',
                            chatButtonStatus: data.chatButtonStatus|| '',
                        }
                    }            
                }
            },
            /**
             *
             * @description When the Need Help Button is clicked
             * @return Object
             *
             */
             visitorClickHelpButton(data) {
                return {
                    event: 'chat-need-help-click-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason || '',
                            chatID: data.chatID || '',
                            chatButtonStatus: data.chatButtonStatus || '',
                        }
                    }
                }                
            },      
            /**
             *
             * @description When the Chat Question Submitted
             * @return Object
             *
             */
             visitorSubmittedAQuestion() {
                return {
                    event: 'chat-question-submit-action',
                    _att: {
                        chat: {
                            chatID: data.chatID || '',
                        }
                    }
                }                             
            },                    
            /**
             *
             * @description When the Chat Dialogue Sub-mitted
             * @return Object
             *
             */
             visitorSubmittedChatDialogue() {
                return {
                    event: 'chat-dialogue-submit-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason || '',
                            chatID: data.chatID || '',
                            chatButtonStatus: data.chatButtonStatus || '',
                        }
                    }
                }                                             
            },         
            /**
             *
             * @description When the visitor initiates the chat (chat initiated)
             * @return Object
             *
             */
             visitorInitiatesChat(data) {
                return {
                    event: 'chat-initiate-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason || '',
                            chatID: data.chatID || '',
                            chatButtonStatus: data.chatButtonStatus || '',
                            chatAction: data.chatAction || '',
                        }
                    }
                }                                                            
            },                                            
            /**
             *
             * @description When users opt to accept a proactive chat 
             * invitation or initiate a reactive chat by clicking on a 'Chat Now' link
             * @return Object
             *
             */
             visitorClickChatNowOpt(data) {
                return{
                    event: 'chat-launch-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason|| '',
                            chatID: data.chatID|| '',
                            chatButtonStatus: data.chatButtonStatus|| '',
                            chatAction: data.chatAction|| '',
                        }
                    }
                }                                                                          
            },                                                        
            /**
             *
             * @description When the visitor begins a conversation with the agent 
             * - aka started typing.
             * @return Object
             *
             */
             visitorBeginsAgentConversation(data) {
                return {
                    event: 'customer-chat-request-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason || '',
                            chatID: data.chatID || '',
                            chatButtonStatus: data.chatButtonStatus || '',
                        }
                    }
                }                                                                                        
            },                                                                    
            /**
             *
             * @description When the Chat Window opens with AT&T 
             * support options for the Customer. Support Options could be Text Chat; Call Back; Video Chat.
             * @return Object
             *
             */
             visitorOpenChatSupportOption(data) {
                return {
                    event: 'chat-support-options-display-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason|| '',
                            chatID: data.chatID || '',
                            chatButtonStatus: data.chatButtonStatus || '',
                        }
                    }
                }                                                                                                                    
            },                                                                                
            /**
             *
             * @description When the users receive an invitation 
             * to chat with a customer service representative.
             * @return Object
             *
             */
             visitorReceiveAnInvitationToChat (data) {
                return {
                    event: 'chat-impression-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason || '',
                            chatID: data.chatID || '',
                            chatButtonStatus: data.chatButtonStatus || '',
                            chatAction: data.chatAction || '',
                        }
                    }
                }
            },
            /**
             *
             * @description When the ‘Need Help' button is displayed to the user.
             * @return Object
             *
             */
             visitorDisplayedNeedHelpButton(data) {
                return {
                    event: 'chat-need-help-display-action',
                    _att: {
                        chat: {
                            chatReason: data.chatReason || '',
                            chatID: data.chatID || '',
                            chatButtonStatus: data.chatButtonStatus || '',
                        }
                    }
                }                
            },            
        },
        /**
         * method that validates if the pages needs to wait for another 
         * push before do the push event: 'page-view'.
         *
         * @return Boolean, 
         * True if the page where is called do need to wait for another 
         * push before the push event: 'page-view'.
         * False if the page where is called do not need to wait for another push.
         */
        isSpecialPageToHoldPushEventPageView : function(){
            var excludedPages = ["/search.html"];
            return excludedPages.indexOf(att.pageProperties.url);
        },
        /**
         * Set the following variables on every link click 
         * @return   Object
         *
         */            
        trackingDataOnClick : function (e, clickData) {
            var downloadFileType = {
                doc:'doc', docx:'docx', eps:'eps', jpg:'jpg', png:'png', svg:'svg', xls:'xls', ppt:'ppt', 
                pptx:'pptx', pdf:'pdf', xlsx:'xlsx', tab:'tab',csv:'csv', zip:'zip', txt:'txt', vsd:'vsd',
                vxd:'vxd', xml:'xml', js:'js', css:'css', rar:'rar', exe:'exe', wma:'wma', mov:'mov', 
                avi:'avi', wmv:'wmv', mp3:'mp3', wav:'wav', m4v:'m4v',
            };            
            var faqQuestionClicked = jQuery(e.currentTarget).parent().attr('itemtype');         
            var currentHref = typeof jQuery(e.currentTarget).attr('href') !== 'undefined'? jQuery(e.currentTarget).attr('href') : typeof jQuery(e.currentTarget).attr('data-url') !== 'undefined'? jQuery(e.currentTarget).attr('data-url'):false;
            if(typeof faqQuestionClicked != "undefined") {
                jQuery(e.currentTarget).toggleClass('faq-clicked');
            }   
            var elementPosition = jQuery(e.currentTarget).offset();
            var isCurrentDomainValid = false;
            /* Validate _att.webInteraction.content.type property value */ 
             //check if the link is relative or it's part of our domain 
            if(currentHref) {       
                if (! /^https?:\/\/./.test(currentHref) || currentHref.includes(window.location.hostname)) {
                    // isCurrentDomainValid = true;
                    isCurrentDomainValid = downloadFileType.hasOwnProperty(currentHref.split(/[#?]/)[0].split('.').pop().trim()) ? false : true;
                }                
                var isCurrentUrlPdfDestination =  currentHref ? downloadFileType.hasOwnProperty(currentHref.split(/[#?]/)[0].split('.').pop().trim())? true : false : false;
            } 
            
            var isCarouselComp = jQuery(e.currentTarget).data('slot') =='Carousel';            
            isCarouselpos = jQuery(e.currentTarget).closest('.swiper-container-initialized').find('.swiper-slide-active').data('position');
            var getCarouselURL =jQuery(e.currentTarget).closest('.swiper-container-initialized').find('.swiper-slide-active').data('url');
            var getCarouselPos = isCarouselComp? jQuery(e.currentTarget).closest('.swiper-container-initialized').find('.swiper-slide-active').data('position'):false;             
            //var geTypeLinkOnClick = 
            

            // const trackingData = {
            //     'linkPosition'               : $(this).data('slot') || '',
            //     'contentFriendlyName'        : ($(this).data('content') && $(this).data('content').trim()) || '',
            //     'linkName'                   : $(this).attr('data-name').trim() || $(this).text().trim(),
            //     'mediaFriendlyName'          : $(this).attr('data-friendlyname') || '',
            //     'slotPosition'               : $(this).attr('sition') || '',
            //     'slotPosition'               : $(this).attr('sition') || '.parent()',
            //     'mediaPersona'               : $(this).attr('data-persona') || att.pageProperties.persona || '',
            //     'mediaContentAuthor'         : $(this).attr('data-contentauthor') || att.pageProperties.contentAuthor || '',
            //     'mediaPublisher'             : $(this).attr('data-publisher') || att.pageProperties.publisher||'',
            //     'mediaSeriesName'            : $(this).attr('data-series') || '',
            //     'mediaObjective'             : $(this).attr('data-objective') || att.pageProperties.objective || '',
            //     'mediaCategory'              : $(this).attr('data-category') || att.pageProperties.category || '',
            //     'mediaVertical'              : $(this).attr('data-vertical') || att.pageProperties.vertical || '',
            //     'mediaType'                  : $(this).attr('data-type') || att.pageProperties.type || '',
            //     'mediaPublishDate'           : $(this).attr('data-publishdate') || att.pageProperties.publishDate || '',
            //     'mediaId'                    : $(this).attr('data-mediaid') || '',
            //     'mediaClass'                 : $(this).attr('data-class') || att.pageProperties.class || '',
            //     'mediaFormat'                : $(this).attr('data-format') || '',
            //     'mediaProductInFocusMedia'   : $(this).attr('data-productinfocusmedia') || att.pageProperties.productInFocusMedia || '',
            //     'mediaProductInFocusLOB'     : $(this).attr('data-productinfocuslob') || att.pageProperties.productInFocusLOB|| '',
            //     'mediaProductInFocusFunction': $(this).attr('data-productinfocusfunction') || att.pageProperties.productInFocusFunction || ''
            // };                 
            var urlWebInteraction = jQuery(e.currentTarget).attr('href') || jQuery(e.currentTarget).attr('data-url') || getCarouselURL || clickData.linkDestinationUrl || '';
            var linpathWebInteraction = jQuery(e.currentTarget).attr('href') || jQuery(e.currentTarget).attr('data-url') || clickData.linkDestinationUrl || '';
            return {
                event: 'click-action', 
                        web: {
                            webPageDetails: { 
                                name: globalName, //att.pageProperties.friendlyPageName
                            },//webPageDetails
                            webInteraction: {
                                linkClicks: { 
                                    value: 1
                                },//linkClicks
                                URL:  urlWebInteraction != '' && urlWebInteraction.includes('/content/attbusiness/en')? urlWebInteraction.split('/content/attbusiness/en')[1]:urlWebInteraction,
                                name: clickData.linkName || jQuery(e.currentTarget).attr('data-name')?.trim() || jQuery(e.currentTarget).text()?.trim() || '',                                
                                type: currentHref ? isCurrentDomainValid ? 'other' : isCurrentUrlPdfDestination ? 'download' : 'exit' :  'other',
                            },//webInteraction                              
                        },         
                        _att: {
                                webInteraction: {
                                    friendlyPageName : att.pageProperties.friendlyPageName || '',
                                    socialShareClicks: {
                                        value:jQuery(e.currentTarget).hasClass('socialShareAnalyticTrack') ? 1 : '',
                                    },
                                    faqViews: { 
                                        value: jQuery(e.currentTarget).hasClass('faq-clicked') ? 1 : '', 
                                    },
                                    newsletterSubscribeSubmits: { 
                                        value: clickData.newsletterSubscribeSubmits || 0
                                    }, 
                                    //Set the x & y coordinates of the link on the page
                                    xyPosition: elementPosition.left + 'x' + elementPosition.top,
                                    
                                    locationName: clickData.slotFriendlyName || jQuery(e.currentTarget).attr('data-slot')|| jQuery(e.currentTarget).attr('data-locationName') || '',
                                    linkPath:  linpathWebInteraction != '' && linpathWebInteraction.includes('/content/attbusiness/en')? linpathWebInteraction.split('/content/attbusiness/en')[1]:linpathWebInteraction,
                                    // Those are for Marquees and Impressions .IF we are not tagging those currently it can be considered OOS for this project,
                                    // but after consulting Ajeet, he confirms that we should leave the value even if the value is blank, here the textual comment "You can create them and if they are left blank that’s okay"
                                    slotOrder: getCarouselPos || clickData.slotPosition || '',
                                    content: {
                                        id: jQuery(e.currentTarget).attr('id') || clickData?.id || '',
                                        friendlyName: clickData.contentFriendlyName || jQuery(e.currentTarget).attr('data-name')?.trim() || jQuery(e.currentTarget).text()?.trim() || '',
                                        type: jQuery(e.currentTarget).attr('data-name')?.trim() || jQuery(e.currentTarget).text()?.trim() || clickData.linkName || '',
                                        category: jQuery(e.currentTarget).attr('data-category') || att.pageProperties.category || '' , //   comes from aem
                                        publisher: jQuery(e.currentTarget).attr('data-publisher') || att.pageProperties.publisher || '', // comes from aem
                                        //pageSectionID: '<value> on question', // Not use it according question answer on the email
                                        // subPosition: '<value> on question' // Not use it according question answer on the email
                                    }//content
                            },//webInteraction
                            mediaDetails: {
                                videoType: '',
                                type: att.pageProperties.type,
                                class: att.pageProperties.class,
                                objective: att.pageProperties.objective,
                                category: att.pageProperties.category,
                                vertical: att.pageProperties.vertical,
                                publishDate: att.pageProperties.publishDate,
                                publisher: att.pageProperties.publisher,
                                persona: att.pageProperties.persona,
                                format: '',
                                contentAuthor: att.pageProperties.contentAuthor
                            },//mediaDetails
                        } //att 
                    }; //return 
        },
        /**
         * When an error occurs any-where on the site.
         * @return   Object
         *
         */    
        trackingDataError : function (errorData) {
            return {
                event: 'error-action', 
                    _att: {
                        error: {
                            type: errorData.errorType,
                            statusCode: errorData.statusCode
                        },//form
                    }, //att 
            }; //return 
        },      
    };//att.adobeDataLayerManager    
});

