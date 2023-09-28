;
"use strict";
var funnelstep, funneldetails;
var logRegFunnel = MatchCore.CPX.Logging.logRegFunnel;
var indexObj = (function($){
    function genderGenderSeekConverter(genderSeek) {
        var parameters = {
            gc : 2, // Female (Gender)
            tr : 1  // Male   (GenderSeek)
        };

        if (genderSeek > 0 && genderSeek < 5) {
            // heterosexual
            if (genderSeek % 2 == 0) {
                if (genderSeek / 2 == 1) {
                    parameters.gc = 1;
                    parameters.tr = 2;
                }
                else {
                    parameters.gc = 2;
                    parameters.tr = 1;
                }
            } else {
                // Same gender    
                if (genderSeek / 3 == 1) {
                    parameters.gc = 2;
                    parameters.tr = 2;
                }
                else {
                    parameters.gc = 1;
                    parameters.tr = 1;
                }
            }
        }
        return parameters;
    }

    function switchPanels() {

        if ($jq("SELECT[name='countryCode']").val() > 2 && !(($jq("SELECT[name='countryCode']").val() == 209) || ($jq("SELECT[name='countryCode']").val() == 187) || ($jq("SELECT[name='countryCode']").val() == 96))) {
            $jq(".geoPanel").show();
            $jq(".postalCodePanel").hide();
        }
        else if (($jq("SELECT[name='countryCode']").val() == 209) || ($jq("SELECT[name='countryCode']").val() == 187) || ($jq("SELECT[name='countryCode']").val() == 96)) {
            $jq(".geoPanel").hide();
            $jq(".postalCodePanel").hide();
        }
        else {
            $jq(".geoPanel").hide();
            $jq(".postalCodePanel").show();
        }
    }

     function QuickSearch(pageName) {
        var _gc = $jq("SELECT[name='gc']").val();
        var _tr = $jq("SELECT[name='tr']").val();
        var _lage = $jq("SELECT[name='lage']").val();
        var _uage = $jq("SELECT[name='uage']").val();
        var _stateCode = $jq("SELECT[name='stateCode']").val();
        var _cityCode = $jq("SELECT[name='cityCode']").val();
        var _postalCode = $jq("INPUT[name='postalCode']").val();
        var _cc = $jq("SELECT[name='countryCode']").val();
        var _selectedCountryCode = $jq("SELECT[name='countryCode']").val();
        if (_cc == "96" || _cc == "209" || _cc == "187")
            searchVar = '/search/search.aspx?dls=1&st=Q&CLR=true&cl=' + _cc + '&po=1&r2s=1&ip2c=false&cpp=cppp/floatingreg/intl/index/' + pageName + '.html' + '&selectedCountryCode=' + countryCode + '&gc=' + _gc + '&tr=' + _tr + '&lage=' + _lage + '&uage=' + _uage + '&countryCode=' + countryCode + '&postalCode=' + _postalCode + '&scc=' + _selectedCountryCode;
        else if (_cc == "1" || _cc == "2") {
            if (MatchCore.CPX.Validation.isValidPostalCode(_postalCode))
                searchVar = '/search/search.aspx?dls=1&st=Q&CLR=true&cl=' + _cc + '&po=1&r2s=1&ip2c=false&cpp=cppp/floatingreg/intl/index/' + pageName + '.html' + '&selectedCountryCode=' + countryCode + '&gc=' + _gc + '&tr=' + _tr + '&lage=' + _lage + '&uage=' + _uage + '&countryCode=' + countryCode + '&stateCode=' + _stateCode + '&cityCode=' + _cityCode + '&postalCode=' + _postalCode + '&scc=' + _selectedCountryCode;
            else
                searchVar = '/search/search.aspx?dls=1&st=Q&CLR=true&cl=' + _cc + '&po=1&r2s=1&ip2c=false&cpp=cppp/floatingreg/intl/index/' + pageName + '.html' + '&selectedCountryCode=' + countryCode + '&gc=' + _gc + '&tr=' + _tr + '&lage=' + _lage + '&uage=' + _uage + '&countryCode=' + countryCode + '&stateCode=' + _stateCode + '&cityCode=' + _cityCode + '&postalCode=&scc=' + _selectedCountryCode;
        }
        else
            searchVar = '/search/search.aspx?dls=1&st=Q&CLR=true&cl=' + _cc + '&po=1&r2s=1&ip2c=false&cpp=cppp/floatingreg/intl/index/' + pageName + '.html' + '&selectedCountryCode=' + countryCode + '&gc=' + _gc + '&tr=' + _tr + '&lage=' + _lage + '&uage=' + _uage + '&countryCode=' + countryCode + '&stateCode=' + _stateCode + '&cityCode=' + _cityCode + '&postalCode=' + _postalCode + '&scc=' + _selectedCountryCode + '&sl=' + _stateCode;
        if ($jq('.countryList').val() < 0) {
            searchVar = '/search/search.aspx?dls=1&st=Q&CLR=true&cl=109&po=1&r2s=1&ip2c=false&cpp=cppp/floatingreg/intl/index/' + pageName + '.html' + '&selectedCountryCode=' + countryCode + '&gc=' + _gc + '&tr=' + _tr + '&lage=' + _lage + '&uage=' + _uage + '&countryCode=' + countryCode + '&stateCode=' + _stateCode + '&cityCode=' + _cityCode + '&postalCode=' + _postalCode + '&scc=' + _selectedCountryCode + '&sl=' + _stateCode;
         }
         funnelstep = 1; funneldetails = '{Redirect to Reg Flow}';
         logRegFunnel(funnelstep, funneldetails);
        location.href = searchVar;
    }

    $(document).ready(function () {
        var form = $("#form");
        var body = $("body");
        var ggs  = "";
        var genderCodes = {};
        funnelstep = 0; funneldetails = '{Page Loads}';
        logRegFunnel(funnelstep, funneldetails);
        // if ($jq('.AjaxGeo').length != 0) {
        //     Cortado.Bootloader.require(MatchCore.Application.CpServer + "scripts/cp/ajaxGeo.js", function () {
        //         $jq('.AjaxGeo').each(function () {
        //             var countryList = $jq('.countryPane SELECT', this);
        //             var stateList = $jq('.statePane SELECT', this);
        //             var cityList = $jq('.cityPane SELECT', this);
        //             var postalField = $jq('.postalPane INPUT', this);
        //             //trying to preselect the country based on the siteURL
        //             var selectedCountryCode = $jq('#selectedCountryCode').val();

        //             //trying to preselect the city and state based on hiddenfield
        //             var preselectedStateCode = $jq('#preselectedStateCode').val();
        //             var preselectedCityCode = $jq('#preselectedCityCode').val();
        //             var geo = new MatchCore.AjaxGeo();
        //             geo.init({
        //                 container: this,
        //                 meta: {
        //                     "countryList": (countryList.length > 0) ? countryList[0] : null,
        //                     "stateList": (stateList.length > 0) ? stateList[0] : null,
        //                     "cityList": (cityList.length > 0) ? cityList[0] : null,
        //                     "postalField": (postalField.length > 0) ? postalField[0] : null,
        //                     "selectedCountryCode": (selectedCountryCode > 0) ? selectedCountryCode : null,
        //                     "preselectedStateCode": (preselectedStateCode > 0) ? preselectedStateCode : null,
        //                     "preselectedCityCode": (preselectedCityCode > 0) ? preselectedCityCode : null
        //                 }
        //             });
        //         });
        //     });
        // }
        $jq(document).keypress(function (e) {
            if (e.which === 13) {
                $jq(".btnQuickSearch").click();
                return false;
            }
        });

        if (countryCode > 2 && !((countryCode == 209) || (countryCode == 187) || (countryCode == 96))) {
            $jq(".geoPanel").show();
            $jq(".postalCodePanel").hide();
        }
        else if ((countryCode == 209) || (countryCode == 187) || (countryCode == 96)) {
            $jq(".geoPanel").hide();
            $jq(".postalCodePanel").hide();
        }
        else {
            $jq(".geoPanel").hide();
            $jq(".postalCodePanel").show();
        }

        if (!(body.is('.ie6, .ie7, .ie8'))) {
            $('.cs').customSelect();
        }

        form.on("submit", function () {
            ggs = this.ggs;

            if (ggs) {
                genderCodes = genderGenderSeekConverter(ggs.value);

                this.gc.value = genderCodes.gc;
                this.tr.value = genderCodes.tr;
            }

            var triggit = (this.tr.value == 1) ? "men" : "women";
            body.append("<img height=\"1\" width=\"1\" src=\"http://a.triggit.com/px?u=Dg&rtv=match,seeking" + triggit + "\">");
        });
    });

    return {
        QuickSearch: QuickSearch,
        switchPanels: switchPanels
    }
})(jQuery);
