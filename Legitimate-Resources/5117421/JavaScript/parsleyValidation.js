<!DOCTYPE html>
<html class="js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage no-websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients no-cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg no-smil svgclippaths">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="icon" href="/ltl/TForce_Favicon.png" type="image/png">
    <title> TForce&#x20;Freight</title>


    <link href="/ltl/Content/themes/base/jquery-ui.css" rel="stylesheet"/>
<link href="/ltl/Content/bootstrap.min.css" rel="stylesheet"/>
<link href="/ltl/Content/font-awesome.min.css" rel="stylesheet"/>
<link href="/ltl/Scripts/qTip/jquery.qtip.min.css" rel="stylesheet"/>
<link href="/ltl/Content/twitterTypeAhead.css" rel="stylesheet"/>
<link href="/ltl/Content/parsley.css" rel="stylesheet"/>
<link href="/ltl/Content/ups-freight-min.css" rel="stylesheet"/>

    
    <link href="/ltl/Content/DataTables/css/jquery.dataTables.min.css" rel="stylesheet"/>
<link href="/ltl/Content/DataTables/css/rowReorder.dataTables.min.css" rel="stylesheet"/>
<link href="/ltl/Content/DataTables/css/responsive.dataTables.min.css" rel="stylesheet"/>

    <script src="/ltl/Scripts/modernizr-3.6.0.js"></script>

    <link href="&#x2F;ltl&#x2F;Content&#x2F;Site&#x2E;css" type="text/css" rel="stylesheet" />

    

    <script type="text/javascript" src="&#x2F;ltl&#x2F;Content&#x2F;Javascript&#x2F;MyLTL&#x2E;js"></script>
    <script type="text/javascript" src="&#x2F;ltl&#x2F;Content&#x2F;Javascript&#x2F;Search&#x2E;js"></script>
    <script src="&#x2F;ltl&#x2F;Scripts&#x2F;jquery&#x2D;3&#x2E;6&#x2E;0&#x2E;min&#x2E;js" type="text/javascript"></script>
    <style type="text/css">
        #footer {
            bottom: auto !important;
        }

        .p0 {
            padding: 0px !important;
        }

        #preferences_prompt_submit {
            width: auto;
            height: auto;
        }

        .trackdropdown {
            background: /*#DDD7D0*/ #ffffff;
            border-bottom: none !important;
            top: 73px !important;
        }

        #TextTrack {
            resize: none;
            border: none;
            float: left;
            height: 28px;
            width: 85% !important;
            color: #300;
            font-size: 1em;
            font-weight: 400;
            padding: 5px;
        }

        #TextTrackButton {
            background-color: #0053A1;
            color: white;
            border: 1px solid grey;
            border-left: none;
            cursor: pointer;
            /*background-repeat: no-repeat;
            background-position: center;
            background-image: url(/ltl/img/white-arrow32x32.png);
            height: 27px;
            width: 38px;*/
        }

        textarea[id="TextTrack"]::placeholder {
            font-style: italic;
        }

        textarea[id="TextTrack"]:focus {
            /*outline: 5px auto #C67D30 !important;*/
        }

        @media (min-width: 992px) {
            .trackdropdown {
                min-width: 350px !important;
            }
        }
    </style>
    <script data-cfasync='false' type='text/javascript' defer='' async='' src='https&#x3A;&#x2F;&#x2F;t&#x2E;gatorleads&#x2E;co&#x2E;uk&#x2F;Scripts&#x2F;ssl&#x2F;a3b372f5&#x2D;7517&#x2D;4460&#x2D;80f2&#x2D;9444d850944d&#x2E;js'></script>
</head>

<body class="t3dev">






    <div id="spinnerGIF" style="position:fixed; top:45%; left:45%;z-index:1000;display:none">
        <img src="&#x2F;ltl&#x2F;Images&#x2F;spinner&#x2E;gif" />
    </div>

    
<script src="&#x2F;ltl&#x2F;Scripts&#x2F;LoginPopup&#x2E;js"></script>

<style>
    #divEDRConfirmation p, #showNoOptionNote p,#divuserinfo p {
        text-align: left;
        font-size: 13px;
        line-height: 16px;
    }

    #EdrModal .icon-leaf-active {
        width: 31px;
        height: 31px;
        background-size: 31px 31px;
    }
</style>
<div class="container-fluid gold alert alert-dismissible show" id="gold-section" style="display:none">
    <div class="ups-base-layout" style="padding: 0 !important;">
        <div style="display:flex">
            <div class="col-md-1 centerContents mobcolmd1">
            </div>
            <div id="UPS_alert_carousel_controls" class="carousel slide col-md-10 " data-interval="false">

                <div class="carousel-inner">
                    <div class="carousel-item  active" style="display:flex;">
                        <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;alert&#x2D;lightgrey&#x2E;svg" alt="text" style="/* margin-right: -10px; */height: 27px;width: 27px;">
                        <p style="max-width:90%;padding:0 !important;padding-left:15px !important" id="weatherinfo"><a style="color:#fff" href='&#x2F;ltl&#x2F;apps&#x2F;WeatherAdvisory?p=update'> ...Learn More</a> </p>
                    </div>
                </div>
            </div>

            <div class="col-md-1 mobcolmd1" style="margin-top:-10px">
                <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;close&#x2D;lightgrey&#x2E;svg" alt="text" onclick="hideAlerts()" style="width: 27px;" class="float-right m-3">

            </div>
        </div>
    </div>
</div>


    <div id="LoginBanner-section" style="background-color:#0053a1;color:#fff;">
        <div class="ups-base-layout" style="padding: 0 !important;">
            <div style="display:flex">
                <div class="col-md-1 centerContents mobcolmd1">
                </div>

                <div class="carousel slide col-md-10" data-interval="false">
                    <div class="carousel-inner">
                        <div class="carousel-item  active" style="display:flex;">
                            <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;alert&#x2D;lightgrey&#x2E;svg" alt="text" style="/* margin-right: -10px; */height: 27px;width: 27px;">
                            <p id="LogginInfo" style="max-width:100%;padding:0 !important;padding-left:15px !important"> Please Note: Clicking 'Log In' or 'Sign Up' will send you to UPS.com login page. After login you'll be returned to TForceFreight.com </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-1 mobcolmd1" style="margin-top:-10px">
                    <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;close&#x2D;lightgrey&#x2E;svg" alt="text" onclick="hideLoginBanner()" style="width: 27px;height:27px;" class="float-right m-3">
                </div>

            </div>
        </div>
    </div>
<div class="container-fluid ups-brown" id="main_nav">
    <div class="row" id="divlogsec">
        <input name="&#x5F;&#x5F;RequestVerificationToken" type="hidden" value="9&#x5F;2zVD&#x5F;Hmsv4YbUgTGflbLOQHtF1cfmseu&#x2D;lC78pohD&#x2D;V7oDawrBKiI4NFSzerxsPNVRdeId3iaOEt&#x5F;NM19Z&#x2D;QCSqmUxAyMzMbJV9xOs&#x5F;kw4ui&#x2D;bXFUbZ8TML9ygmW7s7CHVVnFJdExAKjDLNgMEbHSzVJBBb3h&#x2D;M6KahwPM&#x5F;bGWzmHrXrmBBtm48SeukS9ot&#x2D;mqKJSdL8xjZ&#x5F;G0QEvbAA2" />
        <nav id="ups-navItems">
            <input type="hidden" value="" id="checkDates" />
            <ul class="ups-header_utils nav justify-content-end" role="navigation" aria-label="Utilities Menu">
                <li class="nav-item" id="menuAlert"><a href="javascript:void(0)" onclick="showAlerts()" class="nav-link active">Alerts</a></li>
                    <li>&nbsp;&nbsp;</li>
                    <li class="nav-item">
                        <a onclick="javascript:ReadCookie('L')" id="loginLink" style="cursor:pointer" class="nav-link active menulogin">Log in</a>
                        
                    </li>
                    <li class="nav-item Signup" id="signup"><a onclick="javascript:ReadCookie('S')" class="nav-link active" data-target="#LoginModal" data-toggle="modal">Sign Up</a></li>
                    <li class="nav-item" id="tffmsg" style="display:none"><a class="nav-link active" onclick="showBanner()">UPS Login Msg</a></li>
            </ul>
        </nav>
    </div>
    <div class="row" id="main-header-nav">
        <header class="col-md-12 ups-base-layout ups-lg-layout">
            <nav class="navbar navbar-expand-xl">
                    <a id="ups-header_logo"
                       href="&#x2F;ltl&#x2F;apps&#x2F;Home"
                       title="TForce&#x20;Freight Home">
                    </a>

                <button class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#ups_navSupportedContent"
                        aria-controls="ups_navSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="icon-toggle-menu"></span>
                </button>
                <a href="#" class="ups-searchBtn noColorBg">
                    <span class="sr-only">Search</span>
                    <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;search&#x2E;svg" alt="search-white" width="30" style="margin-top: 7px;" />
                </a>
                <div class="input-group search-field-mobile">
                    <form onSubmit="return false;">
                        <input type="text" id="mobkeywordValue" maxlength="30" autocomplete="off"
                               class="form-control" placeholder="Search"
                               aria-label="Search through site content" />
                    </form>
                </div>
                <!--search-field-mobile-->
                <div class="navbar ups-mobile-nav collapse" id="ups_navSupportedContent">
                    <form id="link_form" style="width: 15%;top: -35px;">
                        <div class="input-group search-field">
                            <div class="input-group-append search-icon" id="nav-search-icon1" style="/* right: -56px; */border: 0;">
                                <button class="btn btn-info" type="button" onclick="showSearchTextbox()" style="border: none;background: none; left: 0;">
                                    <i class="icon-search white"></i>
                                </button>
                            </div>
                            <a class="searchlink" href="javascript:void(0)" id="searchlink" onclick="showSearchTextbox()" style="
    font-size: 1.2em;color: #242424; text-decoration: none;">Search</a>
                        </div>
                    </form>
                    <form id="text_form" style="display:none; width:100%" onSubmit="return false;">
                        <div class="input-group search-field">

                            <input type="text" style="max-width:90%" class="form-control" placeholder="Search" aria-label="Search through site content" id="keywordValue" maxlength="30" autocomplete="off">
                            <div class="input-group-append search-icon" id="nav-search-icon">
                                <button class="btn btn-info" type="button" id="btnglobalsearch" style="background-color: #fff;border: 1px solid #242424;" onclick="Search()">
                                    <i class="icon-search white"></i>
                                </button>

                            </div>
                            <div style="margin-left: 15px;margin-top: 7px;">
                                <button class="btn btn-info" style="background-color:#fff" type="button" onclick="showSearchText()">
                                    <i class="icon-close1"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                    <div class="" id="nav-contact-us">
                        <a class="nav-link" href='&#x2F;ltl&#x2F;apps&#x2F;ContactUs'>Customer Service</a>
                    </div>
                    <ul class="navbar-nav" role="navigation">
                        <li class="nav-item dropdown active">
                                    <a class="nav-link" href="javascript:void(0)" onclick="TrackSearch(false);" id="navbartrack" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Tracking</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle"
                               href="#"
                               id="navbarDropdownShipping"
                               role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false">Shipping</a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownShipping">
                                <div >
                                    <div class="row">
                                        <div class="col">
                                            <ul>
                                                <li><a href="&#x2F;ltl&#x2F;apps&#x2F;RateEstimate">Rate Estimate</a></li>
                                                
                                                <li><a href='&#x2F;ltl&#x2F;apps&#x2F;TransitTimes'>Transit Times</a></li>
                                                <li><a href='&#x2F;ltl&#x2F;apps&#x2F;PickupRequest'>Pickup Request</a></li>
                                                
                                                <li><a href='&#x2F;ltl&#x2F;apps&#x2F;Expedited'>Expedited</a></li>
                                                <li><a href='&#x2F;ltl&#x2F;apps&#x2F;VolumePricing'>Volume Pricing</a></li>
                                                    <li><a href='&#x2F;ltl&#x2F;apps&#x2F;Truckload'>Truckload</a></li>
                                                <li><a href='&#x2F;ltl&#x2F;apps&#x2F;RestrictedGoods'>Restricted Goods</a></li>
                                                
                                                
                                                
                                            </ul>
                                        </div>
                                        
                                        <!--col-->
                                    </div>
                                </div>
                            </div>
                            <!--dropdown-menu-->
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle"
                               href="#"
                               id="navbarDropdownServices"
                               role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false">Services</a>
                            <div class="dropdown-menu"
                                 aria-labelledby="navbarDropdownServices">
                                <div class="col">
                                    <ul>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;TForceFreightLTL'>TForce&#x20;Freight&#x20;LTL</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;Canada'>Canada</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;Mexico'>Mexico</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;PuertoRicoUSVirginIslands'>Puerto Rico/U.S. Virgin Islands</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;HawaiiGuam'>Hawaii/Guam</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;Alaska'>Alaska</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;TradeShowServices'>Tradeshow</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;DensityBasedRating'>Density-Based Rating</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;UPSGroundWithFreightPricing'>UPS Ground with Freight Pricing</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;OtherServices'>Other Services</a></li>
                                    </ul>
                                </div>
                                <!--col-->
                            </div>
                            <!--dropdown-menu-->
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle"
                               href="#"
                               id="navbarDropdownToolsForms"
                               role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false">Tools & Forms</a>
                            <div class="dropdown-menu"
                                 aria-labelledby="navbarDropdownToolsForms">
                                <div class="col">
                                    <ul>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;ServiceInformation'>Service Information</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;AdditionalShippingInformation'>Additional Shipping Information</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;RulesTariffs'>Rules Tariff</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;BillofLadingDownloads'>Bill Of Lading Downloads</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;TechnologySolutions'>Technology Solutions</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;DensityCalculator'>Density Calculator</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;FreezableProtectionAdvisory'>Freezable Protection Advisory</a></li>
                                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;Claims'>Claims</a></li>


                                    </ul>
                                </div>
                                <!--col-->
                            </div>
                            <!--dropdown-menu-->
                        </li>
                        <li class='nav&#x2D;item&#x20;dropdown&#x20;menumyltl' id="mobile-myltl">
                            <a class="nav-link dropdown-toggle"
                               href="#"
                               style="padding-right:15px !important;"
                               id="navbarDropdownMyLTL"
                               role="button"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false">MyLTL</a>                            
                                <div class="dropdown-menu" id="megamenultl" aria-labelledby="navbarDropdownMyLTL">
                                    <div class="col">
                                        <div class="row row-megamenu">
                                            <div class="col-lg-12 col-12 ltlDiv">
                                                <div class="col-megamenu">
                                                    <h6 class='title&#x20;lockimg' style="border-bottom: 1px solid #757575;">Less Than Truckload</h6>
                                                        <ul class="list-unstyled">
                                                            <li><a onclick="javascript:ReadCookie('C')">Create Bill of Lading</a></li>
                                                            <li><a onclick="javascript:ReadCookie('D')">Documents</a></li>
                                                            <li><a onclick="javascript:ReadCookie('B')">Billing </a></li>
                                                            <li><a onclick="javascript:ReadCookie('T')">Notify</a></li>
                                                            <li><a onclick="javascript:ReadCookie('R')">Reports</a></li>
                                                            <li><a onclick="javascript:ReadCookie('Z')">Customize</a></li>
                                                        </ul>
                                                </div>
                                            </div>
                                            <div class="col-lg-1" id="gfpDivSpace" style="display:none;"></div>
                                            <div class="col-lg-6 col-12" id="gfpDiv" style="display:none;">
                                                <div class="col-megamenu">
                                                    <h6 class='title&#x20;lockimg' style="border-bottom: 1px solid #757575;">UPS Ground with Freight Pricing</h6>
                                                        <ul class="list-unstyled">
                                                            <li><a  onclick="javascript:ReadCookie('U')">Create a Shipment</a></li>
                                                            <li><a  onclick="javascript:ReadCookie('H')">View Shipment History</a></li>
                                                        </ul>

                                                </div>  <!-- col-megamenu.// -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                        <!--dropdown-menu-->                           
                            </li>
                        <li class="nav-item">
                            <a class="nav-link"
                               href='&#x2F;ltl&#x2F;apps&#x2F;AboutUs'
                               >About Us</a>
                            
                            

                            
                            <!--dropdown-menu-->
                        </li>
                        <li class="nav-item">
                            <a class="nav-link"
                               href='https&#x3A;&#x2F;&#x2F;jobs&#x2E;tfiintl&#x2E;com&#x2F;TForceFreight' rel="noopener noreferrer" target="_blank">Careers</a>
                        </li>
                        <li class="nav-item" id="mobile-contact-us">
                            <a class="nav-link" href='&#x2F;ltl&#x2F;apps&#x2F;ContactUs'>Customer Service</a>
                        </li>

                    </ul>
                    <nav id="ups-navItems-mobile">
                        <ul class="navbar-nav"
                            role="navigation"
                            aria-label="Utilities Menu">
                                <li class="nav-item"><a onclick="javascript:ReadCookie('L')" style="cursor:pointer" class="nav-link" data-toggle="modal">Log In</a></li>
                                <li class="nav-item" id="signup"><a onclick="javascript:ReadCookie('N')" class="nav-link active" href="https://www.ups.com/doapp/signup" data-target="#LoginModal" data-toggle="modal">Sign Up</a></li>

                        </ul>
                    </nav>
                </div>
                <!--ups_navSupportedContent-->
            </nav>

        </header>

    </div>
    <!--row-->
</div>

<!-- Login Modal -->
<div id="loginpartial" style="display:none">

    <!-- Login Modal -->
<div class="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="LoginModalLabelTitle" aria-hidden="true">
    <div class="modal-dialog" role="document" style="border: 6px solid #0053a1;">
        <div class="modal-content" style="text-align:left !important;background-color: #fff;">
            <div class="modal-header">
                <table>
                    <tr>
                        <td>
                            <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;alert&#x2D;red&#x2E;svg" alt="text" style="width: 27px;margin-top:19px;margin-left:-19px;height: 31px;">
                        </td>
                        <td><span> </span></td>
                        <td><span> </span></td>
                        <td>
                            <h5 class="modal-title" style="text-align:left !important;" id="LoginModalLabelTitle">Attention!</h5>
                        </td>
                    </tr>
                </table>

                <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;close&#x2E;svg" aria-hidden="true" alt="text" class="close" data-dismiss="modal" style="width: 57px;height: 58px;" />
            </div>
            <div class="modal-body" id="helpFormModel" style="overflow-y:auto;text-align:left">

                <p style="text-align:left" id="LoginText"></p>

            </div>
            <div>
                <div>
                    <button class="btn btn-primary" style="margin-left:48px;border-radius:10px;width:auto !important" onclick="OkayRequest()" type="submit" aria-label="Close">OK</button>
                </div>
                <div class="custom-control custom-checkbox" style="margin-left:45px;margin-top:-20px;margin-bottom:20px">
                    <input type="checkbox" class="custom-control-input" id="dntshow">
                    <span> </span>
                    <label class="custom-control-label" style="font-weight:normal;padding:4px;" for="dntshow">Do not show again</label>
                </div>


            </div>
        </div>
    </div>
</div>

<div id="actionurl" data-url="/ltl/apps/ReadCookie"
     data-BOL="/ltl/myltl/CreateBillOfLading"
     data-Docu="/ltl/myltl/Imaging"
     data-Bill="/ltl/myltl/Billing"
     data-Noti="/ltl/myltl/Notify"
     data-Repo="/ltl/myltl/Reports"
     data-Cust="/ltl/myltl/Customize"
     data-UPS="\ltl\myltl\UPSGroundwithFreightPricingShipping"
     data-HIS="\ltl\myltl\UPSGroundwithFreightPricingShippingHistory">

</div>


<script>
 

     function OkayRequest() {
        var dontshow = true;
         var LinkType = sessionStorage.getItem("LinkType");

         var sUrl = "https\u003A\u002f\u002fwww\u002Eups\u002Ecom\u002fdoapp\u002fsignup\u003Floc\u003Den\u005FUS\u0026ClientId\u003D24\u0026returnto\u003Dhttps\u003A\u002f\u002fwww\u002Etforcefreight\u002Ecom\u002fmyltl\u002fenroll\u002f";
         var bolURL = $("#actionurl").data("bol");
         var docuURL = $("#actionurl").data("docu");
         var billURL = $("#actionurl").data("bill");
         var notiURL = $("#actionurl").data("noti");
         var repoURL = $("#actionurl").data("repo");
         var custURL = $("#actionurl").data("cust");
         var upsURL = $("#actionurl").data("ups");
         var upshistoryURL = $("#actionurl").data("his");
         if (document.getElementById('dntshow').checked == true) {

            dontshow = "true";
             HandleCookie(LinkType);
             if (LinkType == 'L')
                 loginSite();
             else if (LinkType == 'S')
                 window.location.href = sUrl;
             else if (LinkType == 'N')
                 window.location.href = "https://www.ups.com/doapp/signup";
             else if (LinkType == 'C') {

                 window.location.href = bolURL;
             }
             else if (LinkType == 'D') {

                 window.location.href = docuURL;
             }
             else if (LinkType == 'B') {

                 window.location.href = billURL;
             }
             else if (LinkType == 'T') {

                 window.location.href = notiURL;
             }
             else if (LinkType == 'R') {

                 window.location.href = repoURL;
             }
             else if (LinkType == 'Z') {

                 window.location.href = custURL;
             }
             else if (LinkType == 'U') {

                 window.location.href = upsURL;
             }
             else if (LinkType == 'H') {

                 window.location.href = upshistoryURL;
             }
        }
         else {
             $("#LoginModal").modal("hide");
             if (LinkType == 'L') {
                 loginSite();
             }
             else if (LinkType == 'S')
                 window.location.href = sUrl;
             else if (LinkType == 'N')
                 window.location.href = "https://www.ups.com/doapp/signup";
             else if (LinkType == 'C') {

                 window.location.href = bolURL;
             }
             else if (LinkType == 'D') {

                 window.location.href = docuURL;
             }
             else if (LinkType == 'B') {

                 window.location.href = billURL;
             }
             else if (LinkType == 'T') {

                 window.location.href = notiURL;
             }
             else if (LinkType == 'R') {

                 window.location.href = repoURL;
             }
             else if (LinkType == 'Z') {

                 window.location.href = custURL;
             }
             else if (LinkType == 'U') {

                 window.location.href = upsURL;
             }
             else if (LinkType == 'H') {

                 window.location.href = upshistoryURL;
             }
            
        }
    }

    function HandleCookie(param) {
       
        var baseURL = "/ltl/apps/HandleCookieLogin";
        $.ajax({
            url: baseURL,
            datatype: "json",
            data: { Type: param, Value: "true" },
            //headers: headers,
            //data: {
            //    resultType: function () { return "true" }
            //},
            type: 'Get',
            success: function (data) {
            $("#LoginModal").modal("hide");}
        }).fail(function () {
            console.log('fail');
        });
    }
    function loginSite() {
        var token = $("[name='__RequestVerificationToken']").val();
        var headers = {};

        headers['__RequestVerificationToken'] = token;
        $.ajax({
            type: "POST",
            url: "/ltl/apps/account/Login",
            headers: headers,
            //data: {
            //    returnUrl: function () { return returnurl.trim() }
            //},
            success: function (data) {
                //window.location.href = '/ltl/apps/Home';
                //window.location.href = getRedirectURL();
                window.location.href = data.url;
                console.log('ss');
            },
            error: function (xhr, err) {
                if (xhr.status == 200) {
                    //window.location.href = '/ltl/apps/Home';

                    //window.location.href = getRedirectURL();

                    console.log('error>>' + err)
                }

            }
        })
    }


</script>

</div>
<div class="modal fade" id="EdrModal" tabindex="-1" role="dialog" aria-labelledby="EdrModalLabelTitle" aria-hidden="true">
    <div class="modal-dialog" role="document" style="border: 6px solid #0053a1;">
        <div class="modal-content" style="text-align:left !important;background-color: #fff;">
            <div class="modal-header">
                <table>
                    <tr>
                        <td>
                            <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;alert&#x2D;red&#x2E;svg" alt="text" style="width: 27px;margin-top:19px;margin-left:-19px;height: 31px;">
                        </td>
                        <td><span> </span></td>
                        <td><span> </span></td>
                        <td>
                            <h5 class="modal-title" style="text-align:left !important;" id="EdrModalLabelTitle">Delivery Options</h5>
                        </td>
                    </tr>
                </table>

                <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;close&#x2E;svg" aria-hidden="true" alt="text" class="close CloseEdrpopup" data-dismiss="modal" style="width: 57px;height: 58px;" />
            </div>
            <div class="modal-body" style="overflow-y:auto;text-align:left">

                <p style="text-align:left;font-weight:bold;" class="row">
                    Go Paperless with Electronic Delivery Receipts!&nbsp;
                    <a tabindex="0" style="font-size: xx-small;" class="ups-icon-question-mark edroptin-popup" data-toggle="popover" data-trigger="focus" data-html="true" data-title="Go Paperless Eligibility"
                       data-content="High Value, Hazmat, Residential and C.O.D. shipments are not Eligible for “Go Paperless with Electronic Delivery Receipts”"></a>
                </p>
                
                <div class="row" style="margin-left: 0px">
                    <div class="align-self-center">
                        

                    </div>
                    <div style="margin-left: 10px">
                        <!-- Rounded switch -->
                        <label class="ups-toggle" for="optEditcommonEdr" aria-label="Default checkbox" style="margin: 10px 0 5px 0 !important">
                            <span class="sr-only">Default</span>
                            <input type="checkbox" id="optEditcommonEdr" aria-label="Default checkbox" role="group" onchange="CheckForEDRConfirmationInPopup();">
                            <span class="slider round optinslide"></span>
                        </label>
                    </div>
                    <div class="align-self-center edr-leaf-section"><span class="icon-leaf-active" style="margin-left:-10px;"></span></div>
                </div>
                
                <div class="divEDRConfirmation row" id="divEDRConfirmation" style="display:none;margin-left: 0px;margin-top:10px;">
                    <p>You will no longer receive paper Delivery Receipts at your MyLTL location, shown below:</p>
                    <div class="userproaddress" style="display:none">
                        <span style="width: 100%;font-size:13px" class="edrcompany"></span>
                        <br />
                        <span style="width: 100%;font-size:13px" class="edraddress"></span>
                        <p class="edrcitystate"></p>
                    </div>
                    <p>Your Electronic Delivery Receipts will be available for viewing in MyLTL <b>Documents</b>.</p>
                </div>
                <div class="showNoOptionNote" id="showNoOptionNote" style="display:none;margin-left: 0px;margin-top:10px;">
                    <p>Go Paperless anytime by visiting the Customize option.</p>
                </div>
            </div>
            <div>
                

                <div style="margin: 10px 10px 10px 0px;float:right">
                    <button class="btn btn-primary btnedrokay" style="border-radius:10px;width:auto !important" onclick="OkayEdrRequest('YES')" type="submit" aria-label="Close">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="BillingChangesModal" tabindex="0" role="dialog" aria-labelledby="BillingChangesTitle" aria-hidden="true" style="z-index:1060;background-color: rgba(0,0,0,0.5);">
    <div class="modal-dialog" role="document" style="border: 6px solid #0053a1;">
        <div class="modal-content" style="text-align:left !important;background-color: #fff;">
            <div class="modal-header">
                <table>
                    <tr>
                        <td>
                            <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;alert&#x2D;red&#x2E;svg" alt="text" style="width: 27px;margin-top:-15px;margin-left:-19px;height: 31px;">
                        </td>
                        <td><span> </span></td>
                        <td><span> </span></td>
                        <td>
                            <h5 class="modal-title modal-title-first" style="text-align:left !important;display:none;" id="BillingChangesTitle"> TForce Freight Easy Pay Release Date 1/30</h5>
                            <h5 class="modal-title modal-title-second" style="text-align:left !important;display:none;" id="BillingChangesTitle"></h5>
                        </td>
                    </tr>
                </table>

                <img src="&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;close&#x2E;svg" aria-hidden="true" alt="text" class="close" data-dismiss="modal" style="width: 57px;height: 58px;" />
            </div>
            <div class="modal-body modal-body-first" style="overflow-y:auto;text-align:left;display:none;">
                <div class="row">
                    <div class="col-md-11">
                        <p style="text-align:left">
                            Starting Thursday 1/26, payments for TForce Freight invoices will no longer be accepted in The UPS Billing Center. On Monday 1/30 you'll be able to access TForce Freight Easy Pay to make payments on your invoices.
                        </p>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="col-md-11">
                        <p style="text-align:left">
                            Please note that you will receive information about enrolling in TForce Freight Easy Pay from our partner Bill Trust, and our TForce Freight Accounts Receivable (AR) team.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <button class="btn btn-primary CloseBillingpopup" style="border-radius:10px;width:auto !important" type="submit" aria-label="Close">Ok</button>
                    </div>
                </div>
            </div>
            <div class="modal-body modal-body-second" style="overflow-y:auto;text-align:left;display:none;">
                <div class="row">
                    <div class="col-md-11">
                        <p style="text-align:left" class="bodytext1">

                        </p>
                    </div>
                </div>
                
                    <div class="row">
                        <div class="col-md-11">
                                <a onclick="javascript:ReadCookie('B')" class="buttontext" style="font-weight:bold;font-size:16px;cursor:pointer;color:#426da9 !important;"></a>

                        </div>
                    </div>
                 

                <br />
                <div class="row">
                    <div class="col-md-11">
                        <p style="text-align:left" class="bodytext2">

                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <button class="btn btn-primary CloseBillingpopup" style="border-radius:10px;width:auto !important" type="submit" aria-label="Close">Ok</button>
                    </div>
                </div>
            </div>
            <div>
                <div class="custom-control custom-checkbox col-md-6" style="margin-left:45px;margin-top:-20px;margin-bottom:20px">
                    <input type="checkbox" class="custom-control-input" id="dntshowbilling" onclick="DontshowBillingpopup()" style="position:fixed">
                    <span> </span>
                    <label class="custom-control-label" style="font-weight:normal;padding:4px;margin: 30px 0 5px 0 !important" for="dntshowbilling">Do not show again</label>
                </div>

            </div>
        </div>
    </div>
</div>
<script>
    function DontshowBillingpopup() {
        var baseURL = "/ltl/apps/WriteBillingchangesCookie";
        var cookievalue = $('#dntshowbilling').is(':checked');
        $.ajax({
            url: baseURL,
            datatype: "json",
            data: { Value: cookievalue},
            type: 'Get',
            success: function (data) { }
        })
    }
    $(".CloseBillingpopup").click(function () {
        $("#BillingChangesModal").modal("hide");
    });
</script>
<style>
    .bodytext2 a {
        color: #426da9 !important;
    }
</style>

<style type="text/css">
    .trackdropdown {
        /*background:  #ffffff;*/
        background: #dddddd;
        border-bottom: none !important;
        top: 73px !important;
    }

    .show {
        display: block;
    }

    #TextTrack {
        resize: none;
        border: none;
        float: left;
        height: 28px;
        width: 85% !important;
        color: #300;
        font-size: 1em;
        font-weight: 400;
        padding: 5px;
    }

    #TextTrackButton {
        background-color: #0053A1;
        color: white;
        border: 1px solid grey;
        border-left: none;
        cursor: pointer;
        /*background-repeat: no-repeat;
        background-position: center;
        background-image: url(/ltl/img/white-arrow32x32.png);
        height: 28px;
        width: 25px;*/
    }

    textarea[id="TextTrack"]::placeholder {
        font-style: italic;
    }

    textarea[id="TextTrack"]:focus {
        /*outline: 5px auto #C67D30 !important;*/
    }

    @media (min-width: 992px) {
        .trackdropdown {
            min-width: 350px !important;
        }

        #megamenu {
            width: 650px;
        }

        #megamenultl {
            width: max-content;
        }
    }

    #LoginBanner-section {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .Signup {
        border-right: 0 !important
    }

    @media only screen and (max-width: 768px) {
        .centerContents {
            display: none !important;
        }
        .mobcolmd1 {
            width: auto !important;
        }
        #ups-header_logo-dev, #ups-header_logo-test {
            background-size: 180px 70px;
        }
    }
    .col-megamenu ul li {
        border-bottom: 1px solid #757575;
        position: relative;
        min-height: 60px;
        padding: 20px 0px 0px 0px !important;
    }

    header ul.navbar-nav li .col-megamenu ul li {
        margin: 0px 0 !important;
    }

    .col-megamenu li:after {
        content: '\e936';
        font-size: 14px;
        color: #404040;
        right: 20px;
        font-family: "TFF-Font-Icon" !important;
        float:right;
    }


    #customerMenu1::after {
        border: solid white;
        margin-left: .255em;
        margin-top: 3px;
        border-width: 0 2px 2px 0;
        padding: 5px;
    }

    .ups-toggle input:checked + .optinslide {
        background-color: #05885b !important;
        border: 1px solid #05885b !important;
    }

    .ups-toggle .optinslide {
        background-color: #E6403B !important;
        border: 1px solid #E6403B !important;
    }

        .ups-toggle .optinslide:after {
            color: white !important;
        }

    @media (min-width: 1200px) {
        .navbar-expand-xl .navbar-nav .nav-link {
            padding-right: .2rem !important;
            padding-left: .2rem !important;
        }
    }
</style>
<script type="text/javascript">
     var signupurl = "https\u003A\u002f\u002fwww\u002Eups\u002Ecom\u002fdoapp\u002fsignup\u003Floc\u003Den\u005FUS\u0026ClientId\u003D24\u0026returnto\u003Dhttps\u003A\u002f\u002fwww\u002Etforcefreight\u002Ecom\u002fmyltl\u002fenroll\u002f";
    $(document).keypress(function (e) {
        if ($('#keywordValue:visible').length == 0) {
        } else {
            if (window.location.href.toLowerCase().indexOf("createbilloflading") > -1) {
            }
            else {
                EnterKeyPressSubmitForm(e, "fromglobalsearch");
            }
        }
        if ($('#mobkeywordValue:visible').length == 0) {
        } else {
            if (window.location.href.toLowerCase().indexOf("createbilloflading") > -1) {
            }
            else {
                EnterKeyPressSubmitForm(e, "fromglobalsearch");
            }
        }
    });

    var idleTime = 0;
        //(function () {
        //    doDocReady();
        //});
        //function doDocReady() {
        //    debugger;
        //    var isAlertShow = sessionStorage.getItem("alertShow");
        //    console.log(isAlertShow);
        //    if (isAlertShow) {
        //        document.getElementById('gold-section').style.display = "block";
        //    }
        //}
    function Search() {
        if ('False'=='True' || 'False'=='true') {
            SearchbyKeyWord(true);
        }
        else {
            SearchbyKeyWord(false);
        }
    }


    function logintothesite() {
            var token = $("[name='__RequestVerificationToken']").val();
            var headers = {};

            headers['__RequestVerificationToken'] = token;
            $.ajax({
                type: "POST",
                url: "/ltl/apps/account/Login",
                headers: headers,
                //data: {
                //    returnUrl: function () { return returnurl.trim() }
                //},
                success: function (data) {
                    //window.location.href = '/ltl/apps/Home';
                    //window.location.href = getRedirectURL();

                    window.location.href = data.url;
                    console.log('ss');
                },
                error: function (xhr, err) {
                    if (xhr.status == 200) {
                        //window.location.href = '/ltl/apps/Home';

                        //window.location.href = getRedirectURL();

                        console.log('error>>' + err)
                    }

                }
            })
        }


    $(document).ready(function () {
        //This code is for if page is ideal for more time then need to reload the page
       // checkForPageIdeal();
        //remove the condition based  getWeatherAdvisoryDetails and GetEnrollLink method calling due to Burp suite scan issue
        
            getWeatherAdvisoryDetails();
        GetEnrollLink();
        GetHassenPopup();
        //}

        GetGFPFlag();
        GetHideBannerOnClose();
        var isauthenticate = 'False';
        if (isauthenticate == 'true' || isauthenticate == 'True') {
            $(".row-megamenu").css("width", "500px");
            
                eDRReadCookie();
           // }
        } else {
            $(".row-megamenu").css("width", "534px");
            $(".title.lockimg").css("padding-bottom", "3px");
            $("#gfpDiv").css("padding-left", "0px");
        }
        BillingReadCookie();
    });

    function eDRReadCookie() {
        var baseURL = "/ltl/apps/ReadEDRCookie";
        $.ajax({
            url: baseURL,
            datatype: "json",
           // data: { strCookieName: "DROI" },
            type: 'Get',
            success: function (data) {
               if (data.Result != null && (data.Result == "False" || data.Result == "false")) {
                    $("#EdrModal").modal("show");
                    initializePopover();
                    $("#optEditcommonEdr").prop("checked", data.Value);
                    if (data.Value == true) {
                        $("#divEDRConfirmation").css("display", "");
                        //if (data.optedUsername != "") {
                        //    $(".optedUsername").text(data.optedUsername);
                        //    $("#divuserinfo").css("display", "");
                        //}
                        $(".edr-leaf-section").css("display", "");
                        $("#showNoOptionNote").css("display", "none");
                    } else {
                        $("#divEDRConfirmation").css("display", "none");
                        // $("#divuserinfo").css("display", "none");
                        $(".edr-leaf-section").css("display", "none");
                        $("#showNoOptionNote").css("display", "");
                    }
                    if (data.ZIPCODE != null && (data.ADDR_LINE_1.trim() != null || data.ADDR_LINE_2.trim() != null) && data.CITY_NAME != null && data.STATE != null && data.ZIPCODE != "" && (data.ADDR_LINE_1 != "" || data.ADDR_LINE_2 != "") && data.CITY_NAME != "" && data.STATE != "") {
                        var addr = data.ADDR_LINE_1.trim() == "" || data.ADDR_LINE_1.trim() == null ? data.ADDR_LINE_2.trim() : data.ADDR_LINE_1.trim();
                        $(".edrcompany").text(data.ORG_NAME);
                        $(".edraddress").text(addr);
                        $(".edrcitystate").text(data.CITY_NAME + "," + data.STATE + "," + data.ZIPCODE);
                        $(".userproaddress").show()

                    }
                    else { $(".userproaddress").hide() }
                }
                else if (data.Result != null && (data.Result == "True" || data.Result == "true")) {
                    if (data.ZIPCODE != null && (data.ADDR_LINE_1.trim() != null || data.ADDR_LINE_2.trim() != null) && data.CITY_NAME != null && data.STATE != null && data.ZIPCODE != "" && (data.ADDR_LINE_1 != "" || data.ADDR_LINE_2 != "") && data.CITY_NAME != "" && data.STATE != "") {
                        var addr = data.ADDR_LINE_1.trim() == "" || data.ADDR_LINE_1.trim() == null ? data.ADDR_LINE_2.trim() : data.ADDR_LINE_1.trim();
                        $(".edrcompany").text(data.ORG_NAME);
                        $(".edraddress").text(addr);
                        $(".edrcitystate").text(data.CITY_NAME + ", " + data.STATE + " " + data.ZIPCODE);
                        $(".userproaddress").show()

                    } 
                    else { $(".userproaddress").hide() }
                }
                else if (data.Result != null && (data.Result == "True" || data.Result == "true")) {
                    if (data.ZIPCODE != null && (data.ADDR_LINE_1.trim() != null || data.ADDR_LINE_2.trim() != null) && data.CITY_NAME != null && data.STATE != null && data.ZIPCODE != "" && (data.ADDR_LINE_1 != "" || data.ADDR_LINE_2 != "") && data.CITY_NAME != "" && data.STATE != "") {
                        var addr = data.ADDR_LINE_1.trim() == "" || data.ADDR_LINE_1.trim() == null ? data.ADDR_LINE_2.trim() : data.ADDR_LINE_1.trim();
                        $(".edrcompany").text(data.ORG_NAME);
                        $(".edraddress").text(addr);
                        $(".edrcitystate").text(data.CITY_NAME + ", " + data.STATE + " " + data.ZIPCODE);
                        $(".userproaddress").show()

                    }
                    else { $(".userproaddress").hide() }
                }
            }

        })
    }
    function CheckForEDRConfirmationInPopup() {
        var checkedvalue = $("#optEditcommonEdr").prop('checked');
        if (checkedvalue) {
            $("#divEDRConfirmation").css("display", "");
          //  $("#divuserinfo").css("display", "");
            $(".edr-leaf-section").css("display", "");
            $("#showNoOptionNote").css("display", "none");
        } else {
            $("#divEDRConfirmation").css("display", "none");
          //  $("#divuserinfo").css("display", "none");
            $(".edr-leaf-section").css("display", "none");
            $("#showNoOptionNote").css("display", "");
        }
    }
    function OkayEdrRequest(param) {
        var baseURL = "/ltl/apps/WriteEDRCookie";
        var cookievalue = $('#optEditcommonEdr').is(':checked');
       // var Dontshowvalue = $('#dntshowedr').is(':checked');
       // if (param == "NO") { cookievalue = ""; }
       // else { Dontshowvalue = "";}
        $.ajax({
            url: baseURL,
            datatype: "json",
            data: { strCookieval: cookievalue, Dontshowvalue: ""},
            type: 'Get',
            success: function (data) {
                if (param != "NO") { $("#EdrModal").modal("hide"); }
                window.location.reload();
            }

        })
    }
    function checkForPageIdeal() {

        //Increment the idle time counter every minute.
        idleInterval = setInterval(timerIncrement, 60000); // 1 minute

        //Zero the idle timer on mouse movement.
        $('body').mousemove(function (e) {
            //alert("mouse moved" + idleTime);
            idleTime = 0;
        });

        $('body').keypress(function (e) {
            //alert("keypressed"  + idleTime);
            idleTime = 0;
        });

        $('body').keydown(function (e) {
            //alert("keypressed"  + idleTime);
            idleTime = 0;
        });

        $('body').click(function () {
            //alert("mouse moved" + idleTime);
            idleTime = 0;
        });

    }

    //$('body').keydown(function (e) {
    //    CheckSession();
    //});

    //$('body').click(function () {
    //    CheckSession();
    //});
    //function CheckSession() {
    //    var token = $("[name='__RequestVerificationToken']").val();
    //    var headers = {};

    //    headers['__RequestVerificationToken'] = token;
    //    $.ajax({
    //        type: "POST",
    //        url: "/ltl/Request/IsAuthenticated",
    //        headers: headers,
    //        success: function (data) {
    //            if (Boolean(data) == true) {
    //            }
    //            else {
    //                if (window.location.href.toLowerCase().indexOf("/myltl/") != -1) {
    //                }
    //                else {
    //                    window.location.reload();
    //                }
    //            }
    //        },
    //        error: function (xhr, err) {

    //        }
    //    });
    //}
    function timerIncrement() {
        idleTime = idleTime + 1;
        console.log("calls " + idleTime);
        if (idleTime > 60) { // 60 minutes
            window.location.reload();
        }
    }


    function GetEnrollLink() {
        //var token = $("[name='__RequestVerificationToken']").val();
        //var headers = {};
        //headers['__RequestVerificationToken'] = token;
        var endPoint = "/ltl/apps/GetEnrollLink";
        $.ajax({
            url: endPoint,
            type: 'get',
            //headers: headers,
            success: function (data) {
                if (Boolean(data.Success) == true) {
                    if (data.Result != null && data.Result != "") {
                        $(".add-enroll-link").addClass("add-enroll-link-new");
                        $("#enrollUserLink").html("<a class='nav-link' href='" + data.Result + "'>Enrollment</a>");
                    }
                }
            }
        }).fail(function () {
            console.log('fail');
        });
    }
          function getWeatherAdvisoryDetails() {
              //var token = $("[name='__RequestVerificationToken']").val();
              //var headers = {};
              //headers['__RequestVerificationToken'] = token;
              var endPoint = "/ltl/apps/GetWeatherAdvisoryDetails";
              $.ajax({
                  url: endPoint,
                  type: 'get',
                  //headers: headers,
                  success: function (data) {


                      if (Boolean(data.Success) == true) {
                          if (data.Result != null) {

                              var createDate = new Date(data.Result.CreateDate);
                              createDate.setHours(0, 0, 0, 0);
                              var today = new Date();
                              today.setHours(0, 0, 0, 0);
                              if (Date.parse(today) == Date.parse(createDate)) {
                                  $('#checkDates').val("1");
                                  var text = $('#weatherinfo').text();
                                  var html = $('#weatherinfo').html();
                                  $('#weatherinfo').text(data.Result.HeaderText);
                                  $('#weatherinfo').html(data.Result.HeaderText + html);
                                  var isAlertShow = sessionStorage.getItem("alertShow");
                                  if (isAlertShow == "false") {
                                      document.getElementById('gold-section').style.display = "none";
                                      document.getElementById('menuAlert').style.display = "block";
                                  }
                                  else {
                                      document.getElementById('gold-section').style.display = "block";
                                      document.getElementById('menuAlert').style.display = "none";
                                  }
                              }
                              else {
                                  document.getElementById('gold-section').style.display = "none";
                                  document.getElementById('menuAlert').style.display = "none";
                                  $('#checkDates').val("0");
                              }

                          }
                      }
                      else {
                          console.log('else');
                      }
                  }
                }).fail(function(){
                    console.log('fail');
                });
    }
    function GetHassenPopup() {
        var endPoint = "/ltl/apps/GetHassenPopup";
        $.ajax({
            url: endPoint,
            type: 'get',
            success: function (data) {
                $("#Cookieanalytics").prop("checked", data.Analytics);
                //$("#Cookiedisplayadd").prop("checked", data.DisplayAdd)
                //$("#Cookieemaildescription").prop("checked", data.Email);
                //$("#Cookiepersonalization").prop("checked", data.Personalization)
                //$("#Cookiesocialdesc").prop("checked", data.Social);
                //$("#Cookieresearch").prop("checked", data.Research)
                if (!Boolean(data.Success)) {
                    //$("#ConsentPopupmodel").modal('show');
                    $("#tffconsentImplicitmodal").show();
                    $("#Cookieanalytics").prop("checked", true);
                    //$("#tffcookieconsenttext").html(HtmlDecode(data.CookieConsent));
                    $("#tffcookieconsenttext").html(data.CookieConsent);

                }
            }
        }).fail(function () {
            console.log('fail');
        });
    }

    function showAlerts() {
        var checkDates = $('#checkDates').val();
        if (checkDates == "1") {
            sessionStorage.setItem("alertShow", true);
            document.getElementById('gold-section').style = "disply:block";

            $('#gold-section').show();
            document.getElementById('menuAlert').style.visibility = "visible";

            document.getElementById('menuAlert').style.display = "none";
        }

        }
    function hideAlerts() {
        sessionStorage.setItem("alertShow", false);
        document.getElementById('gold-section').style.display = "none";
        document.getElementById('gold-section').classList.remove('show');
        document.getElementById('menuAlert').style.display = "block";

    }

    /*
    function getRedirectURL() {

        var securepates = ["shipping", "createbilloflading", "imaging", "billing", "notify", "reports", "customize"]

        var redirecturlfinal = "/ltl/apps/home";
        if (window.location.href.toLowerCase().indexOf("/myltl/") != -1) {
            var redirecturl = window.location.pathname.toLocaleLowerCase();
            var redirecturl1 = redirecturl.replace("/ltl/myltl/", "");
            redirecturl1 = redirecturl1.replace("/", "");
            if (securepates.indexOf(redirecturl1) != -1) {
                redirecturlfinal = "/ltl/apps/home";
            }
            else {
                redirecturlfinal = window.location.href.toLowerCase().replace("/myltl/", "/apps/");
            }
        }
        else {
            redirecturlfinal = "/ltl/apps/home";
        }

        return redirecturlfinal;
    }
    */

    function logOut() {

        
        //var returnurl = window.location.pathname + window.location.search;
        

        var token = $("[name='__RequestVerificationToken']").val();
        var headers = {};

        headers['__RequestVerificationToken'] = token;
        $.ajax({
            type: "POST",
            url: "/ltl/apps/account/LogOff",
            //headers: headers,
            //data: {
            //    returnUrl: function () { return returnurl.trim() }
            //},
            success: function (data) {
                //window.location.href = '/ltl/apps/Home';
                //window.location.href = getRedirectURL();
                window.location.href = data.url;
                console.log('ss');
            },
            error: function (xhr, err) {
                if (xhr.status == 200) {
                    //window.location.href = '/ltl/apps/Home';

                    //window.location.href = getRedirectURL();

                    console.log('error>>' + err)
                }

            }
        })
    }
    function showSearchTextbox() {
        $('#link_form').hide();
        $('#text_form').show();
        $('#keywordValue').focus();
    }
    function showSearchText() {
        $('#text_form').hide();
        $('#link_form').show();

    }
    function hideLoginBanner() {
        sessionStorage.setItem("LoginBannerShow", false);
        $("#LoginBanner-section").hide();
        $("#tffmsg").show();
        $("#signup").removeClass("Signup");

    }

    function GetHideBannerOnClose() {
        var IsBannerOnClose = sessionStorage.getItem("LoginBannerShow");
        if (IsBannerOnClose == "false") {
            $("#LoginBanner-section").hide();
            $("#tffmsg").show();
        }
        else
        {
            $("#LoginBanner-section").show();
            $("#tffmsg").hide();
        }
    }

    function showBanner() {

        sessionStorage.setItem("LoginBannerShow", true);
        $("#LoginBanner-section").show();
        $("#tffmsg").hide();
        $("#signup").addClass("Signup");

    }

    $(document).ready(function () {
        var logsec = document.getElementById("divlogsec");
        var i = logsec.offsetTop;
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');

        $(window).scroll(function () {
            ($(window).width() < 768 || window.pageYOffset > i) && $(window).scrollTop() != 0 ? logsec.classList.add("sticky") : logsec.classList.remove("sticky");
            if (trident > 0) {
                if ($("#divlogsec").hasClass("sticky")) {
                    $("#divlogsec").hide();
                }
                else {
                    $("#divlogsec").show();
                }
            }
        })
        $('.list-unstyled li').click(function () {
            event.preventDefault();
            var isauthenticate = 'False';
            if (isauthenticate == 'true' || isauthenticate == 'True') {
                var get = $(this).find('a').attr('href');
                if (get != undefined && get != "undefined")
                    window.location.href = get;
            }
            else {
                var get = $(this).find('a').attr('onclick');
                if (get != undefined && get != "undefined") {
                    var result = get.match(/\('(.*)'\)/);
                    ReadCookie(result[1]);
                }
            }
        });
    });


    function GetGFPFlag() {
        var baseurl = "/ltl/apps/GetGFPFlag";
        var isauthenticate = 'False';
        $.ajax({
            url: baseurl,
            type: "GET",
            success: function (data) {
                if (data.gfp) {
                    $(".ltlDiv").removeClass("col-lg-12").addClass("col-lg-5");
                    $("#gfpDiv").show();
                    $("#gfpDivSpace").show();
                   // var ua = window.navigator.userAgent;
                   // var msie = ua.indexOf('MSIE ');
                   // if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                    if (isauthenticate == 'true' || isauthenticate == 'True') {
                        $(".row-megamenu").css("width", "500px");
                    } else {
                        $(".row-megamenu").css("width", "534px");
                        $(".title.lockimg").css("padding-bottom", "3px");
                    }
                    $("#gfpDiv").css("padding-left", "0px");
                  //  }
                } else {
                    $("#gfpDiv").remove();
                    $("#gfpDivSpace").remove();
                    $(".row-megamenu").css("width", "193px");
                }
            },
            error: function (data) {
                $("#gfpDiv").remove();
                $("#gfpDivSpace").remove();
                $(".row-megamenu").css("width", "193px");
            }
        });
    }
     function BillingReadCookie() {
         var baseURL = "/ltl/apps/ReadBillingCookie";
        $.ajax({
            url: baseURL,
            datatype: "json",
            type: 'Get',
            success: function (data) {
                if (data.Result != null && (data.Result == "False" || data.Result == "false")) {

                    if ("False" == "True") {

                    }
                    else {
                        if (data.BillingData != null) {
                            var obj = JSON.parse(data.BillingData);
                            if (obj != null && obj.headertext != "") {
                                $(".modal-title-second").css("display", "");
                                $(".modal-title-first").css("display", "none");
                                $(".modal-title-second").html(obj.headertext);
                            } else {
                                $(".modal-title-second").css("display", "none");
                                $(".modal-title-first").css("display", "");
                            }
                            $(".bodytext1").html(obj.bodytext1);
                            $(".buttontext").text(obj.buttontext);
                            $(".bodytext2").html(obj.bodytext2);
                            $(".modal-body-second").css("display", "");
                            $(".modal-body-first").css("display", "none");

                        } else {
                            $(".modal-title-second").css("display", "none");
                            $(".modal-title-first").css("display", "");
                            $(".modal-body-second").css("display", "none");
                            $(".modal-body-first").css("display", "");
                        }
                        $("#BillingChangesModal").modal("show");
                    }
                }
                else { $("#BillingChangesModal").modal("hide");}
            }

        })
    }
</script>



    <div id="main-content-block">
        <div class="container-fluid white ups-page-title">
            <br />
            <div class="ups-base-layout">
                <div class="bread-crum-container">Home

    </div><br />
                    <h2><span>TForce&#x20;Freight</span></h2>
            </div>
        </div>
        <div class="container-fluid white p0">
            
    <div class="container-fluid tan hero page content" id="content">
        <div class="ups-base-layout-hero ">
            <div class="placeholder">
                <img src='&#x2F;ltl&#x2F;img&#x2F;Hero&#x2D;Home&#x2E;jpg' alt="Home" />
            </div>
            <div class="homegfpcontent&#x20;ups&#x2D;carousel&#x5F;content">
                    <div class="ups&#x2D;carousel&#x5F;msg&#x20;ups&#x2D;carousel&#x5F;msg&#x5F;tracking&#x20;homebanner&#x5F;tracking" >
                        
                        <div class="row" style="margin: 5px;">
                            <img src="&#x2F;ltl&#x2F;Images&#x2F;icon&#x2D;track&#x2E;svg" style="height:32px;width:32px" />
                            <p style="font-weight: bold;">&nbsp;&nbsp;<span>Track</span></p>
                        </div>
                        <div class="row" style="margin: 5px;">
                            <textarea placeholder="PRO Number" id="TextTrack" onkeypress="return isNumber(event)"></textarea>
                                <button class="searcharrow" type="button" id="TextTrackButton" onclick="TrackSearch(false);">
                                    <img src="/ltl/img/white-arrow.png">
                                </button>
                        </div>
                        
                        <br />
                        <input type="hidden" id="CommonProNumbers" name="ProNumbers" />
                        
                    </div>

            </div>
        </div>
    </div>

            <div class="ups-base-layout">
                <div class="Validation-summary" style="display:none">
                    <h3><i class="fa fa-exclamation"></i>  Please correct the following error: </h3>
                    <div class="Validation-summary-err_message" id="summary-err-message"></div>
                </div>
                <div class="Server-err-summary" style="display:none">
                    <h3><i class="fa fa-exclamation"></i> Error</h3>
                    <div class="summary-err_message" id="server-err-message"></div>
                </div>
                <div class="Server-success-summary" style="display:none">
                    <h3><i class="fa fa-check"></i> Success</h3>
                    <div class="summary-success_message" id="server-success-message"></div>
                </div>
                



<style>
        .GFPBanner {
            display: block;
            width: 203px;
            background-color: #0053A1;
            padding: 0 10px;
            height: 35px;
            border-radius: 17px;
            padding-left: 50px;
            padding-top: 10px;
            color: white !important;
            margin-top: 10px;
            margin-left: 30px;
        }
        .GFPBannerNoAuth{
            margin-top:8px;
        }
        .GFPBannerNoAuth .btn-primary {
            color: white;
            padding: 8px 11px 9px 11px !important;
            float: left;
            font-size: 12px;
        }
        .GFPBannerNoAuth .btn-secondary{
        color:#0053A1 !important;padding:7px !important;float:left;font-size:12px;margin-left:5px;
        }
            .GFPBannerNoAuth .btn-secondary:hover{
                color:white !important;
            }
        .bannerHeader {
            font-size:1.143em; font-weight:bold;color:#333333;
        }
    @media (max-width:1440px) and (min-width:1400px) {
        .homegfp.ups-carousel_msg.carouselforgfphome, .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
            width: 65% !important;
        }
    }
        @media (max-width:768px){
            .homegfp.ups-carousel_msg.carouselforgfphome {
                width: 100% !important;
            }
        }
        @media (max-width: 1024px) and (min-width: 1000px) {
            .homegfp.ups-carousel_msg.carouselforgfphome, .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
                width: 85% !important;
            }
        }
        @media (max-width: 1326px) and (min-width: 1300px) {
            .homegfp.ups-carousel_msg.carouselforgfphome, .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
                width: 62% !important;
            }
        }
        @media (min-width: 1300px) {
            .homegfp.ups-carousel_msg.carouselforgfphome span.bannerbody {
                font-size:12px !important;
            }

            }
        @media (min-width: 1400px) {
            .GFPBannerNoAuth {
                margin-top: 10px;
            }
        }

        @media (min-width: 2000px) {
            .GFPBannerNoAuth {
                margin-top: 4px;
            }
        }

            @media (max-width: 768px) and (min-width: 430px) {
                .homegfp.ups-carousel_msg.carouselforgfphome.loggedout {
                    height: 126px;
                }
            }

            @media (max-width: 428px) and (min-width: 375px) {
                .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth a.btn-primary {
                    max-width: 200px;
                }

                .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth a.btn-secondary {
                    max-width: 120px;
                }
            }

            @media (max-width: 575px) {
                .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth a.btn-primary {
                    max-width: 182px;
                }

                .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth a.btn-secondary {
                    max-width: 90px;
                }
            }

            @media (max-width: 425px) {
                .homegfp.ups-carousel_msg.carouselforgfphome.loggedout {
                    height: 140px;
                }

            }
        @media (max-width: 769px) and (min-width: 426px) {
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
                height: 119px;
            }
        }
        @media (max-width: 425px) and (min-width: 321px) {
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
                height: 140px;
            }
        }
        @media (max-width: 370px) {
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
                height: 139px;
            }
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout {
                height: 159px;
            }
        }
    @media (max-width: 425px) {
        a.unfamiliarlink{
            white-space:nowrap;
            float:left;
        }
    }
        @media (max-width: 1024px) and (min-width: 1000px) {
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout, .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth {
                margin-top: 5px !important;
                /*padding-bottom: 20px !important;*/
            }

                .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth a.btn {
                    font-size: 11px;
                }

            .homegfp.ups-carousel_msg.carouselforgfphome.loggedin .GFPBannerNoAuth {
                margin-top: 2px;
            }

            .ups-carousel_msg.ups-carousel_msg_tracking.expeditedbanner {
                margin-bottom: 4px;
                padding: 10px;
                width: 82%;
            }

                .ups-carousel_msg.ups-carousel_msg_tracking.expeditedbanner.tforceexpeditedbanner {
                    font-size: 12px;
                }
        }

        @media (min-width:1024px) and (max-height: 1000px ) {

            .hero .ups-carousel_content {
                top: 0px !important;
                /*top: 10% !important;*/
            }

            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout, .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
                margin-top: 0px !important;
            }

            .hero .ups-carousel_content .ups-carousel_msg {
                width: 85% !important;
                margin: 5px 5px 5px 5px !important;
                padding: 10px !important;
            }

            .hero .ups-carousel_content .homegfp {
                width: 85% !important;
            }

            .hero .homegfpcontent {
                left: -525px !important;
                top: 10px;
            }
        }


        @media (min-width:769px) and (max-width:1023px) and (min-height: 600px ) {

            .hero .ups-carousel_content {
                top: 0px !important;
                /*top: 10% !important;*/
            }

            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout, .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
                margin-top: 5px !important;
                padding-bottom: 35px !important;
            }

            .hero .ups-carousel_content .ups-carousel_msg {
                width: 100% !important;
                margin: 5px 5px 5px 5px !important;
                padding: 10px !important;
            }

            .hero .ups-carousel_content .homegfp {
                width: 100% !important;
            }

            .hero .homegfpcontent {
                left: -525px !important;
                top: 10px;
            }
        }

        @media (min-width:1200px) and (max-width: 2000px) and (max-height: 1000px ) {

            .hero .ups-carousel_content {
                top: 10% !important;
            }

            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout, .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
                margin-top: 0px !important;
            }

            .hero .ups-carousel_content .ups-carousel_msg {
                width: 85% !important;
                margin: 5px 5px 5px 5px !important;
                padding: 10px !important;
            }

            .hero .ups-carousel_content .homegfp {
                width: 85% !important;
            }

            .hero .homegfpcontent {
                left: -525px !important;
                top: 10px;
            }
        }

        /*@media only screen and (min-width: 1025px) and (max-width: 2000px)  {
        .hero .ups-carousel_content {
            top: 50px !important;
        }

        .hero .ups-carousel_content {
            right: unset !important;
            width: 20% !important;
        }

    }*/

        @media (min-width: 1026px) {
            .ups-carousel_msg.ups-carousel_msg_tracking.expeditedbanner {
                width: 62%;
            }
        }

        @media (max-width: 768px) and (min-width:321px) {
            .ups-carousel_msg.ups-carousel_msg_tracking.expeditedbanner.tforceexpeditedbanner {
                margin-top: 5px;
                height: 118px;
            }
        }

        @media (max-width: 320px) {
            .ups-carousel_msg.ups-carousel_msg_tracking.expeditedbanner.tforceexpeditedbanner {
                margin-top: 5px;
                height: 133px;
            }
        }
        /*.homegfp.ups-carousel_msg.carouselforgfphome {
            width: 68%;
        }*/

        .homegfp.ups-carousel_msg.carouselforgfphome.loggedout, .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
            margin-top: 10px;
        }

        .homegfp.ups-carousel_msg.carouselforgfphome span.bannerbody {
            font-size: 11px;
        }
        /*@supports (-ms-ime-align:auto) {
            @media (max-width: 1024px) and (min-height: 876px) {
                .hero .homegfpcontent{
                    left:-512px !important;
                }
            }
        }*/


        @media (min-width: 1024px) and (max-height: 1000px) {
            .hero .homegfpcontent {
                left: 1% !important;
            }



            .hero .ups-carousel_content {
                right: unset !important;
                width: 32% !important;
            }
        }

        @media (min-width: 1440px) and (max-height: 1024px) {
            .hero .homegfpcontent {
                left: 7% !important;
            }

            .hero .ups-carousel_content {
                right: unset !important;
                width: 25% !important;
            }
        }

        @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
            .hero .homegfpcontent {
                left: -55% !important;
            }
        }

        @media (min-width: 2000px) and (max-height: 1440px) {
            .hero .homegfpcontent {
                left: 110px !important;
            }

            .hero .ups-carousel_content {
                right: unset !important;
                width: 25% !important;
            }
        }

        @media (min-width:1024px) and (min-height: 100px ) {
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .bannerHeader {
                font-size: 14.5px;
            }

            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth a.btn-primary, .homegfp.ups-carousel_msg.carouselforgfphome.loggedout .GFPBannerNoAuth a.btn-secondary {
                padding: 7px 11px 7px 11px !important;
            }
        }

        /*IPAD PRO*/
        @media (max-width: 1024px) and (min-height: 1011px) {
            .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
                padding-bottom: 0px;
                padding-top: 0px;
                margin-bottom: 4px;
            }

            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout, .homegfp.ups-carousel_msg.carouselforgfphome.loggedin, .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
                width: 86% !important;
            }

            .homegfpcontent.ups-carousel_content {
                left: -546px !important;
                top: 15px !important;
            }
        }
        /*IPAD*/
        @media (max-width: 768px) and (max-height: 1024px) {
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedin, .homegfp.ups-carousel_msg.carouselforgfphome.loggedout,
            .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
                width: 100% !important;
            }
        }

        @media (max-width: 539px) and (min-width: 426px) {
            .homegfp.ups-carousel_msg.carouselforgfphome.loggedin {
                height: 128px;
            }
        }
        /*SCREEN ROTATION*/
        @media (max-width: 1080px) and (min-height: 1920px) {
            .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
                padding-bottom: 0px;
                padding-top: 0px;
                margin-bottom: 4px;
            }

            .homegfp.ups-carousel_msg.carouselforgfphome.loggedout, .homegfp.ups-carousel_msg.carouselforgfphome.loggedin, .ups-carousel_msg.ups-carousel_msg_tracking.homebanner_tracking {
                width: 86% !important;
            }

            .homegfpcontent.ups-carousel_content {
                left: -546px !important;
            }
        }

        .GFPBannerNoAuth {
            display: flex;
        }

        .hero .ups-carousel_content .ups-carousel_msg .btn-primary {
            margin: 0px !important;
        }
    @media (max-width: 530px) and (min-width: 430px) {
        .homegfp.ups-carousel_msg.carouselforgfphome.loggedout {
            height: 135px !important;
        }
    }
</style>



<div class="container-fluid white ups-page-content content">
    <div class="col-md-12 ups-base-layout ups-lg-layout">
        <div class="row ups-row">
            <div id="getStartedLTL" class="col-md-8">
                <h2 class="mt-4">Get Started with TForce&#x20;Freight&#x20;LTL</h2>
            </div>

            
        </div>

        <hr>
        <div class="row ups-row">
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="module" style="padding-top: 0;">
                    <h3 class="icon" style="font-weight: bold;font-size: 20px;border-bottom:none"><img src='&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;holding&#x2D;box&#x2E;svg' alt="holding-box" style="height: 40px;width: 40px;" /><strong style="padding-left: 25px;">Rate Estimate</strong></h3>
                    <p>Obtain a rate estimate to begin processing your shipment.</p>
                    <a href='&#x2F;ltl&#x2F;apps&#x2F;RateEstimate' aria-label="Learn more about Shippings">Quote and Ship</a>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="module" style="padding-top: 0;">
                    <h3 class="icon" style="font-weight: bold;font-size: 20px;border-bottom:none"><img src='&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;calendar&#x2D;grey&#x2E;svg' alt="package" style="height: 40px;width: 40px;" /><strong style="padding-left: 25px;">Transit Times</strong></h3>
                    <p>Determine transit times and the estimated date of delivery for your shipment.</p>
                    <a href='&#x2F;ltl&#x2F;apps&#x2F;TransitTimes' aria-label="Learn more about Transit Times">Transit Times</a>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="module" style="padding-top: 0;">
                    <h3 class="icon" style="font-weight: bold;font-size: 20px;border-bottom:none"><img src='&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;forklift&#x2E;svg' alt="truck" style="height: 40px;width: 40px;" /><strong style="padding-left: 25px;">Pickup Request</strong></h3>
                    <p>Request a TForce&#x20;Freight pickup for your shipment(s).</p>
                    <a href='&#x2F;ltl&#x2F;apps&#x2F;PickupRequest' aria-label="Learn more about Our Services">Pickup Request</a>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div class="module" style="padding-top: 0;">
                    <h3 class="icon" style="font-weight: bold;font-size: 20px;border-bottom:none"><img src='&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;clipboard&#x2E;svg' alt="clipboard" style="height: 40px;width: 40px;" /><strong style="padding-left: 25px;">Shipping Information</strong></h3>
                    <p>Additional information including fuel surcharges, holiday schedules and information for processing your <br /> TForce&#x20;Freight shipment.</p>
                    <a href='&#x2F;ltl&#x2F;apps&#x2F;AdditionalShippingInformation' aria-label="Learn more about Shipping Information">Shipping Information</a>
                </div>
            </div>
        </div>
        <div class="module-link mt-5">
            <img src='&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;question&#x2D;mark&#x2D;bubble&#x2E;svg' style="height: 40px;width: 40px; margin-top: -10px; margin-right: 15px; float:left">
            <p class="module-link-p">Unfamiliar with LTL Shipping?</p><a href='&#x2F;ltl&#x2F;apps&#x2F;SmallBusinessResources' style="margin-left:0;" class="unfamiliarlink">Learn More >></a>
        </div>
    </div>
</div>



<style type="text/css">
    .bread-crum-container {
        display: none;
    }

    .ups-page-title {
        display: none;
    }

    /*#pressreleasediv {
        display: none;
        text-align: center;
        top: 10px;
        width: 203px;
        background-color: #00857d;
        padding: 10px;
        height: 35px;
        border-radius: 17px;
        margin-right: 10px;
    }*/
    textarea[id="TextTrack"]:focus {
        outline: 3px auto #0053A1 !important;
    }
</style>

<script type="text/javascript">
    $(document).ready(function () {
        if (('GFPMKT' == 'GFPMKT') && ('False' == 'True' || 'False' == 'true') && '' != '') {
            var homebannerDecodetext = HtmlDecode('');
            const homebannerText = JSON.parse(homebannerDecodetext);

            var homebannerbodytext = homebannerText.bodytext;

            homebannerbodytext = homebannerbodytext.replace("<sup>r</sup>", "<sup>®</sup>")


            $(".gfpbannerheadertext").html(homebannerText.headertext);
            $(".gfpbannerbodytext").html(homebannerbodytext);
        }
    });


    function GetPressReleaseDetail() {
        //var token = $("[name='__RequestVerificationToken']").val();
        //var headers = {};
        //headers['__RequestVerificationToken'] = token;
        var endPoint = "/ltl/apps/GetPressReleaseDetail";
        $.ajax({
        url: endPoint,
        type: 'get',
        //headers: headers,
            success: function (data) {
                if (Boolean(data.Success) == true) {
                    if (data.ButtonTxt != null && data.ButtonTxt != "" && data.ButtonLnk != null && data.ButtonLnk != "") {
                        $("#pressreleasediv").css("display", "block");
                        $("#pressreleasediv").html("<div><a id='pressreleaselink' href='" + data.ButtonLnk + "' rel='noopener noreferrer' target='_blank' style='color:#fff'><b style='color:#fff' id='pressreleasetxt'>" + data.ButtonTxt + "</b></a></div>");
                    }
                    else {
                        $("#getStartedLTL").attr('class', 'col-md-8');
                        $("#pressreleasediv").css("display", "none");
                    }
                }
                else {
                    console.log('Success false else');
                    $("#getStartedLTL").attr('class', 'col-md-8');
                    $("#pressreleasediv").css("display", "none");
                }
            }
        }).fail(function () {
            console.log('fail');
            $("#pressreleasediv").css("display", "none");
            $("#getStartedLTL").attr('class', 'col-md-8');
        });
    }

</script>
            </div>
        </div>
    </div>
    <div id="footer">
        <div class="container-fluid teal banner">
            <div class="ups-base-layout">
                <div class="row customer-service-banner">
                    <img src='&#x2F;ltl&#x2F;img&#x2F;icon&#x2D;customer&#x2D;service&#x2D;white&#x2E;svg' alt="customer-service" style="height: 40px;width: 40px;padding-right:10px;" />
                    <span>Need Help?</span>
                    <p>
                        Can't find what you are looking for? Have additional questions?
                        <a href='&#x2F;ltl&#x2F;apps&#x2F;ContactUs' style="white-space:nowrap;">Contact Us</a>
                    </p>
                </div>
            </div>
        </div>
        <div class="container-fluid mid-grey ">
            <div class="ups-base-layout">
                <footer>
                    <div style="padding-left:10px;">
                        <img src='&#x2F;ltl&#x2F;img&#x2F;TFI&#x2D;International&#x2D;Company&#x2E;svg' alt="TFI International Company" style="width:200px;height:50px" />
                    </div>
                    <ul>
                        <li><a href="https://tfiintl.com/en/terms-of-use/" rel="noopener noreferrer" target="_blank">Website Terms of Use <span class="icon ups-link_newwindow" aria-hidden="true"></span></a></li>
                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;TForceFreightPrivacyNotice'>Privacy Notice </a></li>
                        <li><a href='&#x2F;ltl&#x2F;apps&#x2F;RulesTariffs'>Tariff </a></li>
                            <li><a href="javascript:showCookieConsentManager();window.scrollTo(0,0);">Cookie Settings</a></li>
                    </ul>
                    <p>
                        Copyright &copy;2021&#x2D;2023 TForce&#x20;Freight
                    </p>
                </footer>
            </div>
        </div>
    </div>
    
<div id="serviceCenterModal" class="modal ModalCss fade">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" style="overflow:auto">
            <div class="modal-header" style="padding-top: 10px">
                <div class="container">
                    <div class="row pull-right">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <h1 class="" style="font-weight:bold; margin-top: unset;margin:0px !important;">Service Center Information</h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <h1 style="font-weight:unset; margin-top: unset;margin:0px !important;" id="scCityState"></h1>
                        </div>
                    </div>
                </div>
            </div>
            <div >

                <div class="modal-body" style="padding-bottom: 10px">
                    <div class="row" style="margin-left: unset">
                        <div class="col-md-4 offset-2">
                            <div class="row">
                                
                                <span style="font-weight:bold">Street Address </span>
                            </div>
                            <div class="row">
                                <span id="scStreetAddress"></span>
                            </div>
                            <div class="row">
                                <span id="scStreetCityStateZip"></span> <br><br />
                            </div>
                            <div class="row">
                                <span style="font-weight:bold;margin:0px !important;">Mailing Address</span>
                            </div>
                            <div class="row">
                                <span id="scMailAddress"></span>
                            </div>
                            <div class="row">
                                <span id="scMailCityStateZip"></span><br><br />
                            </div>
                        </div>
                        <div class="col-md-4 offset-2">
                            <div>
                                <div class="row">
                                    <span style="font-weight:bold">Phone</span>
                                </div>
                                <div class="row">
                                    <span id="scTelephone"></span><br><br />
                                </div>
                                <div class="row">
                                    <span style="font-weight:bold">Fax</span>
                                </div>
                                <div class="row">
                                    <span id="scFax"></span><br><br />
                                </div>
                                <div class="row">
                                    <span style="font-weight:bold">Local Time Zone</span>
                                </div>
                                <div class="row">
                                    <span id="scTimeZone"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row" style="margin-top: 15px">
                        <div class="col text-center">
                            <table>
                                <tr>
                                    <td class="td-inbound">
                                        <a id="inboundvalue" href="javascript:void(0)" rel="noopener noreferrer" target="_blank">Inbound Time In Transit Map</a>
                                    </td>
                                    <td class="td-button">
                                        <button type="button" class="btn btn-primary upsBtnSm" style="margin-left: 1rem !important;" data-dismiss="modal">Close</button>
                                    </td>
                                    <td class="td-outbound">
                                        <a id="outboundvalue" href="javascript:void(0)" rel="noopener noreferrer" target="_blank">Outbound Time In Transit Map</a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<style>

    @media (min-width:150px) {
        .tff_cookie_consent {
            position: fixed;
            width: 75%;
            left: 50%;
            text-align: left;
            background-color: #F7F6F5;
            font-size: 1.3rem;
            z-index: 99998;
            font-family: Tahoma,helvetica,arial,sans-serif;
            color: #242424;
            border: 1px solid #757575;
            transform: translate(-50%, 0);
            bottom: 0;
            max-width: 1400px;
            box-shadow: 0 0px 15px #0005;
        }
    }
    @media (max-width:650px) {
        .tff_cookie_consent {
            width: 100%;
        }
            /*#tffconsentImplicitmodal .tff_consent_title {
            font-size: 12px;
        }
        #tffconsentImplicitmodal p#tffcookieconsenttext {
            font-size: 11px;
        }*/
            #ConsentPopupmodel.modal {
            z-index:99999;
        }
    }
        /*.tff_close_btn {
        position: absolute;
        display: block;
        top: 10px;
        right: 10px;
        text-decoration: none;
        text-shadow: none;
        color: #4A4A4A;
        font: 20px/100% arial, sans-serif;
        font-weight: normal;
        cursor: pointer;
        background: none;
        padding: 0 5px;
        border: 0px solid #000000;
        z-index: 99;
    }*/

    .tff_consent_close_button {
        color: #4A4A4A !important;
        padding: 10px !important;
        font-weight: 700 !important;
    }

        .tff-readerTxt {
            position: absolute !important;
            clip: rect(1px, 1px, 1px, 1px);
            padding: 0 !important;
            border: 0 !important;
            height: 1px !important;
            width: 1px !important;
            overflow: hidden;
        }

        .tff_privacy_prompt_content {
            width: 100%;
            max-width: 85%;
            margin: 0 auto;
            padding: 10px;
            font-size: 14px;
            position: relative;
        }

        .tff_consent_title {
            font-family: Tahoma,helvetica,arial,sans-serif;
            font-size: 1.1em;
            font-weight: bold;
            line-height: 1.25;
            color: #242424;
            margin: 0;
        }

        .tff_consent_inner {
            display: table;
            width: 100%;
        }

        .tff_consent__inner-left {
            display: table-cell;
        }

        .tff_consent_inner-left p {
            margin: 0 0 10px;
            font-size: 14px;
            font-family: Tahoma,helvetica,arial,sans-serif;
            line-height: 1.25;
            color: #242424;
        }
</style>


<div id="tffconsentImplicitmodal" style="display:none;">
    <div class="tff_cookie_consent" role="alert">
        
        <button type="button" class="close tff_consent_close_button" onclick="HasseenCloseConfirm()" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
        </button>
        <div class="tff_privacy_prompt_content">
            <h2 class="tff_consent_title">This website uses cookies</h2>
            <div class="tff_consent_inner">
                <div class="tff_consent_inner-left">
                    
                    <p id="tffcookieconsenttext"></p>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container-fluid">
    <div id="ConsentPopupmodel" class="modal fade " role="dialog" aria-modal="true">
        <div class="modal-dialog modeldialogconsent">
            <div class="modal-content" style="border-radius: 4px;">
                <div class="modal-header">
                    <h2 class="modal-title" style="text-align:left"><span id="importAddressModal" style="font-weight: bold">Cookie Settings</span></h2>
                </div>
                <div class="modal-body">
                    <table role="presentation">
                        <tbody>
                            <tr style="border-bottom: 1px solid #0053a1;">
                                <td class="category_header" id="category_header_id">
                                    <h3 class="title" style="border-block-color: white; margin: 0 ">Functional</h3>
                                </td>
                            </tr>
                            <tr class="category_details">
                                
                                <td style="padding-top:10px;" id="functional_details">These&#x20;cookies&#x20;are&#x20;required&#x20;for&#x20;basic&#x20;site&#x20;functionality&#x20;and&#x20;are&#x20;therefore&#x20;always&#x20;enabled&#x2E;&#x20;These&#x20;include&#x20;cookies&#x20;that&#x20;allow&#x20;you&#x20;to&#x20;be&#x20;remembered&#x20;as&#x20;you&#x20;explore&#x20;the&#x20;site&#x20;within&#x20;a&#x20;single&#x20;session&#x20;or&#x2C;&#x20;if&#x20;you&#x20;request&#x2C;&#x20;from&#x20;session&#x20;to&#x20;session&#x2E;&#x20;They&#x20;help&#x20;make&#x20;the&#x20;shopping&#x20;cart&#x20;and&#x20;checkout&#x20;process&#x20;possible&#x20;as&#x20;well&#x20;as&#x20;assist&#x20;in&#x20;security&#x20;issues&#x20;and&#x20;conforming&#x20;to&#x20;regulations&#x2E;</td>
                                <td>
                                    <label class="ups-toggle hazmat hazmatSliderLabel functional" disabled aria-label="Default checkbox" for="Cookiefunctional" style="margin-top: 0px; margin-left: 10px;">
                                        <span class="sr-only">Default</span>
                                        <input id="Cookiefunctional" class="hazmat hazmatSwitch" disabled role="group" aria-label="Default checkbox" type="checkbox" checked="checked">
                                        <span class="slider round disabledslid"></span>
                                    </label>
                                </td>
                            </tr>
                            <tr style="border-bottom: 1px solid #0053a1;">
                                <td class="category_header">
                                    <h3 class="title" style="border-block-color: white; margin: 0; padding-top: 20px; ">Analytics</h3>
                                </td>
                            </tr>
                            <tr class="category_details">
                                
                                <td style="padding-top:10px;" id="analytics_description">Analytics&#x20;solutions&#x20;are&#x20;used&#x20;to&#x20;identify&#x20;visitor&#x20;interaction&#x20;with&#x20;this&#x20;website&#x20;for&#x20;the&#x20;purpose&#x20;of&#x20;improving&#x20;the&#x20;site&#x20;experience&#x20;or&#x20;fixing&#x20;potential&#x20;issues&#x20;with&#x20;the&#x20;site&#x2E;</td>
                                <td style="padding-top:10px;">
                                    <label class="ups-toggle hazmat hazmatSliderLabel analytics" aria-label="Default checkbox" for="Cookieanalytics" style="margin-top: 0px; margin-left: 10px;">
                                        <span class="sr-only">Default</span>
                                        <input id="Cookieanalytics" class="hazmat hazmatSwitch" role="group" aria-label="Default checkbox" type="checkbox" checked="checked">
                                        <span class="slider round "></span>
                                    </label>
                                </td>
                            </tr>

                            

                        </tbody>
                    </table>
                </div>
                <div style="padding: 30px 30px 30px 30px; padding-bottom: 50px;" >
                    <button type="button" style="float:left;" class="btn btn-primary btn-sm upsBtnSm" onclick="HasseenConfirm()">Confirm</button>
                </div>
            </div>

        </div>
    </div>
</div>
<script>
    function HasseenConfirm() {
        var name ="GMFunctional,GMCONSENT"
        var value = '' + $("#Cookiefunctional").prop('checked') + "," + $("#Cookieanalytics").prop('checked') + '';
        var endPoint = "/ltl/apps/HasseenWriteCookies";
        $.ajax({
            url: endPoint,
            type: 'get',
            data: { strCookieName: name, strCookieval: value },
            success: function (data) {
                $("#ConsentPopupmodel").modal('hide');
                $("#tffconsentImplicitmodal").hide();
            }
        }).fail(function () {
            console.log('fail');
        });
    }

        function HasseenCloseConfirm() {
        var name ="GMFunctional,GMCONSENT"
        var value = "True,True";
        var endPoint = "/ltl/apps/HasseenWriteCookies";
        $.ajax({
            url: endPoint,
            type: 'get',
            data: { strCookieName: name, strCookieval: value },
            success: function (data) {
                $("#tffconsentImplicitmodal").hide();
                $("#ConsentPopupmodel").modal('hide');
            }
        }).fail(function () {
            console.log('fail');
        });
    }

    function showCookieConsentManager() {
        $("#ConsentPopupmodel").modal('show');
    }

</script>

<style>
    .category_header {
        text-align: left;
    }

    #ConsentPopupmodel .modal-body {
        padding: 10px 30px 0 30px;
        text-align: left !important;
        color: black;
    }

    @media (min-width: 576px) {
        .modeldialogconsent {
            max-width: 640px !important;
        }
    }

    #ConsentPopupmodel {
        overflow-y: auto !important;
    }

        #ConsentPopupmodel table tr td.category_header .title {
            padding: 0px;
            text-align: left !important;
            font-weight: 600 !important;
            font-family: "BerlinkseSans", Georgia, Times, serif;
            font-size: 24px;
            word-break: break-word;
            color: #000;
        }

    .modeldialogconsent {
        font-size: 0.9em;
    }
    .ups-toggle input:disabled + .disabledslid {
        background: #757575 !important;
    }
    .ups-toggle input:disabled + .disabledslid:after {
        color: #fff;
    }
    @media (max-width:375px) {
        #ConsentPopupmodel h3.title {
            white-space: nowrap
        }
    }
    .tff_cookie_consent  a:hover {
        color: #0098cd !important;
    }
</style>


    

    <script src="/ltl/Scripts/jquery-ui-1.12.1.min.js"></script>
<script src="/ltl/Scripts/umd/popper.min.js"></script>
<script src="/ltl/Scripts/qTip/jquery.qtip.min.js"></script>
<script src="/ltl/Scripts/typeahead.bundle.js"></script>
<script src="/ltl/Scripts/parsley.js"></script>
<script src="/ltl/Scripts/parsleyValidation.js"></script>
<script src="/ltl/Scripts/upsfAddressLookup.js"></script>
<script src="/ltl/Scripts/moment.min.js"></script>
<script src="/ltl/Scripts/bootstrap.js"></script>
<script src="/ltl/Scripts/ups-freight-min.js"></script>

    
    <script src="/ltl/Scripts/DataTables/jquery.dataTables.min.js"></script>
<script src="/ltl/Scripts/DataTables/dataTables.rowReorder.min.js"></script>
<script src="/ltl/Scripts/DataTables/dataTables.responsive.min.js"></script>
<script src="/ltl/Scripts/DataTables/HTML5Buttons/buttons.html5.min.js"></script>
<script src="/ltl/Scripts/DataTables/HTML5Buttons/dataTables.buttons.min.js"></script>
<script src="/ltl/Scripts/DataTables/HTML5Buttons/jszip.min.js"></script>


    
    
    
    

    

    <script type="text/javascript">
            var numberOfError = 0;
        var ADDRESS_LOOKUP_ENDPOINT = "/ltl/apps/CustomerAddresses";

        function showSpinner()
        {
            $("#spinnerGIF").show();
        }

        function hideSpinner()
        {
            $("#spinnerGIF").hide();
        }

        $(document).ready(function () {


            $('#preferences_prompt_submit').removeClass('left');

           
             window.scroll = function (e) {
                 alert(e.offset.height);
             }

             $('div.bread-crum-container').find('a').each(function (e) {
                 console.log("href>>" + $(this).attr('href'));
                 var currenturl = window.location.href;
                 console.log("currenturl>>" + currenturl)
                 if (currenturl.indexOf("/apps") !== -1 && $(this).attr('href').indexOf("/myltl") !== -1) {
                     var newurl = $(this).attr('href').replace("/myltl", "/apps")
                     console.log("newurl>>" + newurl);
                     $(this).attr('href', newurl)
                 }
                 else if (currenturl.indexOf("/myltl") !== -1 && $(this).attr('href').indexOf("/apps") !== -1) {
                     var newurl = $(this).attr('href').replace("/apps", "/myltl")
                     console.log("newurl>>" + newurl);
                     $(this).attr('href', newurl)
                 }
            });
            $('div.bread-crum-container').each(function (e) { console.log(e) })

        });

            function TrackSearch(Authenticated) {
            var proNumbers = '';
            var itemIds = $('#TextTrack').val().split("\n");
            for (var x = 0; x < itemIds.length; x++) {
                if (itemIds[x].trim().length > 0) {
                    proNumbers = proNumbers + itemIds[x].trim() + ";";
                }
            }
            if (proNumbers != "") {
                var reloadURL = "/ltl/apps/Tracking";
                reloadURL = reloadURL + "?proNumbers=" + proNumbers;
                window.location.href = reloadURL.toString();
            }
            else {
                var reloadURL = "/ltl/apps/Tracking";
                window.location.href = reloadURL.toString();
            }
        }

            $("#navbartrack").click(
                function () {
                    $('#TextTrack').val('');
                    $("#CommonProNumbers").val('');
                    $("#CommontrackingByProForm").css("display", "block");
                }
        );

        //window.onscroll = function (e) {
        //    alert(e.scrollTop);
        //    if ($("#maincontent").scrollTop > 10) {
        //        $("#maincontent").addClass("fix-head");
        //    } else {
        //        $("#maincontent").removeClass("fix-head");
        //    }
        //};
    </script>

    



</body>
</html>
