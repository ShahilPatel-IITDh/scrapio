//Post to the site that they clicked and redirect
function ClickAd(visitorAdID, navigateUrl, groupName, adName, variationID) {
    var errorList = [];
    var params = {
        "visitorAdID": visitorAdID,
        "variationID": variationID
    };
    $.ajax({
        type: "POST",
        url: GetMxWebsite() + "Public/Lookup.aspx/AdClick",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            if (ga) {
                /*TODO: GA4 For the time being ga should still exist, leaving this only becaue of the navigate url*/
                window.location.href = navigateUrl;
            } else {
                errorList.push("ga Error (Supertool2.js=>ClickAd()): " + adName);
                errorList.push("ClickAd: " + adName);
                errorList.push("groupName: " + groupName);
                errorList.push("navigateUrl: " + navigateUrl);
                errorList.push("variationID: " + variationID);
                errorList.push("visitorAdID: " + visitorAdID);
                MxErrorHandler("", errorList.join('|'));
            }
        },      // Error!
        error: function () {
            MxErrorHandler("", "ClickAd: ");
            console.log(arguments);
        }
    });
}

// Build the InlineAd (fyi, adgroupID is really the VisitorAdID, we borrowed it to return here)
function BuildAd(adPerc, divAd) {
    var outHtml = "";
    outHtml += "<a class='mx-inline-ad-link' href='#' onclick=\"ClickAd(" + adPerc.AdGroupID + ", '" + adPerc.AdNavigateUrl + "', '" + adPerc.AdGroupName + "', '" + adPerc.CampaignName + "', '" + adPerc.AdVariationID + "');\">";
    if (adPerc.AdHtml !== null && adPerc.AdHtml !== '') {
        outHtml += adPerc.AdHtml;
    } else {
        outHtml += "<img class='mx-inline-ad-img' src='" + adPerc.ImageURL + "' alt='" + adPerc.AdGroupName + " advertisement image' />";
    }
    outHtml += "</a>";


    if (adPerc.AdDelayMS !== 0) {
        divAd.hide();
        divAd.append(outHtml);
        var str = "<script>setTimeout(function(){ $('#" + divAd.attr('id') + "').slideToggle('slow');}, " + adPerc.AdDelayMS.toString() + ");";
        str += "<";
        str += "/script>";
        divAd.append(str);
    } else {
        divAd.html(outHtml);
    }
}

// if adID is in QueryString, then just get that one.  Otherwise, call to the server and determine which ad to get, then build it
function ShowAd(divAd, adId, command) {
    // AB-569 - Turn off Inline Ads
    // If installing this, then remove this and go to LookupResultHtmlView.vb and remove the "inline ad" section in the function CreateBody() (around lines 178 to 183)
    if (MXT.DisableInlineAds) {
        return false;
    }

    if (arguments.length > 3) {
        return false;
    }

    var variationId = getParameterByName("variation") || adId;
    var params;
    if (variationId) {
        params = {
            "adVariationID": variationId
        };
        $.ajax({
            type: "POST",
            url: GetMxWebsite() + "Public/Lookup.aspx/GetInlineAd",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (adPerc) {
                BuildAd(adPerc.d, divAd);                
            },      // Error!
            error: function () {
                MxErrorHandler("Show ad: " + adId.toString(), "ShowAd Variation: ");
                console.log(arguments);
            }
        });
    } else {
        params = {
            "command": command
        };
        $.ajax({
            type: "POST",
            url: GetMxWebsite() + "Public/Lookup.aspx/GetNextInlineAd",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (adPerc) {
                if (adPerc.d !== null) {
                    BuildAd(adPerc.d, divAd);                    
                }
            },      // Error!
            error: function () {
                MxErrorHandler("Show next ad", "ShowAd No Variation: ");
                console.log(arguments);
            }
        });
    }
}
