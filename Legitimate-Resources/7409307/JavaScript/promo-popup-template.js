
    <div class="promo-popup-content">
        <div class="header">
            <h2><%= title %></h2>
            <a href="#close" class="close-btn"><i class="icon-close"></i></a>
        </div>
        <div class="promo-panes-holder">
            <picture><!--[if IE 9]><video style="display: none;"><![endif]-->
<source srcset="https://static.32red.com//img/promotions-popover/desktop/<%= getImageName() %>" media=" (min-width: 300px)" />
<source srcset="https://static.32red.com//img/promotions-popover/medium/<%= getImageName() %>" media="(orientation: portrait) and (-webkit-min-device-pixel-ratio: 2)" />
<!--[if IE 9]></video><![endif]-->
<img srcset="https://static.32red.com//img/promotions-popover/default/<%= getImageName() %>"  /></picture>            <div class="loader">
                Loading...                <picture>
                   <img src="https://static.32red.com/img/loader-white.svg">
                </picture>
            </div>
        </div>
        <div class="tandc">
            <a class="open-popover" href="<%= promoDetailsLink() %> #tandc"></a>
        </div>
    </div>
