//----------------------------------------------------------------------------
// DCRM: Dynamic CRM
//----------------------------------------------------------------------------
//
// Dynamic Customer Relationship Management
//
//  $Id: $
//
//----------------------------------------------------------------------------

var dcrm                  = {

    csaName               : "BNLCSA",

    /*
       Placement class
           define the web element to be replaced by customized content

       Input:
          - el:   the webElement to be replaced
          - type: the type of the webElement: banner, layer, ...
          - args: the arguments of the placement: size, langage, ...
    */
    Placement             : function  Placement       (  el,  type,  args   ) {
        "use strict"
        if (!  el                                  ) {
            throw "DCRM Placement does not allow undefined element";
        }
        if ( el.selector !== undefined             ) {
            throw "DCRM Placement does support jquery object, give us the DOM Element please: obj.get(0)";
        }
        if (! el.parentNode                        ) {
            throw "DCRM Placement must have an element from the page";
        }

        if (! type                                 ) {
            throw "DCRM Placement must have a type";
        }

        var _el           =  el ;
        var _type         = type;
        var _args         = args;

        return  {
            type          : function    () {
                return _type;
            },
            args          : function    () {
                return (_args === undefined)?{}:_args;
            },
            replaceWith   : function    ( content ) {
                return _el.parentNode.replaceChild(content, _el);
            }
        };
    },

    /*
       Response Handler class
           Object specific to an offer, and used to send event to the D-CRM about
           this offer.
           Out of the box the displayed (extended status) status is already send
           the D-CRM.

       Input:
          - offerId:     D-CRM offerId
          - collabackId: D-CRM uniq callbackId
    */
    ResponseHandler       : function  ResponseHandler ( offerId, callbackId ) {
        "use strict"

        var _offerId      = offerId;
        var _callbackId   = callbackId;

        return {
            extended      : function    () {
                window    [dcrm.csaName + 'SendJsonData']({
                    "events": [{
                        "eventType"     : "RTIMresponse",
                        "eventGroup"    : "Scenario",
                        "bannerID"      : offerId,
                        "messagePathID" : callbackId,
                        "responseLevel" : "extended"
                    }]
                });
            },
            accepted      : function    () {
                window    [dcrm.csaName + 'SendJsonData']({
                    "events": [{
                        "eventType"     : "RTIMresponse",
                        "eventGroup"    : "Scenario",
                        "bannerID"      : offerId,
                        "messagePathID" : callbackId,
                        "responseLevel" : "accepted"
                    }]
                });
            },
            refused       : function    () {
                window    [dcrm.csaName + 'SendJsonData']({
                    "events": [{
                        "eventType"     : "RTIMresponse",
                        "eventGroup"    : "Scenario",
                        "bannerID"      : offerId,
                        "messagePathID" : callbackId,
                        "responseLevel" : "refused"
                    }]
                });
            },
            custom        : function    ( custom ) {
                window    [dcrm.csaName + 'SendJsonData']({
                    "events": [{
                        "eventType"     : "RTIMresponse",
                        "eventGroup"    : "Scenario",
                        "bannerID"      : offerId,
                        "messagePathID" : callbackId,
                        "responseLevel" : custom
                    }]
                });
            }
        };
    },

    manager               : new      (function        () {
        "use strict"

        var _finder       = null;
        var _builders     = {};

        return {
            registerFinder : function       ( finder ) {
                if (!        finder                ) {
                    finder       = null;
                }
                if (! typeof finder === 'function' ) {
                    throw "DCRM Finder should be a function";
                }
                _finder          = finder;
            },
            registerBuilder: function       ( type, builder ) {
                if (! type                          ) {
                    throw "DCRM Builder should have a type";
                }
                if (!        builder                ) {
                    _builders[type] = null;
                }
                if (! typeof builder === 'function' ) {
                    throw "DCRM builder should be a function";
                }
                _builders[type]     = builder;
            },
            updateContent : function        ( offerId, callbackId, offerArgs ) {
                try {
                    if ( ! _finder                            ) {
                        return false;
                    }

                    var placement      = _finder ( offerArgs );
                    if ( ! placement                           ) {
                        return false;
                    }
                    if ( ! placement instanceof dcrm.Placement ) {
                        throw "DCRM Invalid finder, does not return Placement: ";
                    }
                    if ( ! _builders[placement.type()]         ) {
                        return false;
                    }

                    var handler        = new dcrm.ResponseHandler ( offerId, callbackId );
                    var content        = _builders[placement.type()](offerArgs, placement.args(), handler);
                    if ( ! content                             ) {
                        return false;
                    }

                    placement.replaceWith (content);
                    handler.extended      ();

                    return true;
                } catch(ex) {
                    console.log(ex)
                }
            }
        };
    })
};
