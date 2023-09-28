

   {{^ cart.hasAtLeastOneItem }}

      <div class="cart-has-no-items-message">
         {{ lang.section_header_cart_has_no_items }}
      </div><!--cart-has-no-items-message-->

   {{/ cart.hasAtLeastOneItem }}

   {{# cart.hasAtLeastOneItem }}

      <div class="cart-items-wrapper js-cart-items-wrapper">

         {{# cart.items }}

            <div class="cart-item js-cart-item" data-product-key="{{ key }}">
               <div class="cart-item-inner">
                  <div class="
                     cart-item-column
                     cart-item-column-image
                     ">
                     {{# hasThumbnail }}
                        <img src="{{ thumbnailResizedImage.300w.src }}" />
                     {{/ hasThumbnail }}
                     {{^ hasThumbnail }}
                        <img src="/images/themes/_core/media-not-provided-dark.svg" class="media-not-provided-thumbnail">
                     {{/ hasThumbnail }}
                  </div><!--cart-item-column-image-->
                  <div class="
                     cart-item-column
                     cart-item-column-details
                     ">
                     <span class="cart-item-title">
                        <a href="{{ canonicalUrl }}">
                           {{ name }}
                        </a>
                     </span>
                     {{# hasVariant }}
                        <span class="cart-item-variant">{{ variantName }}</span>
                     {{/ hasVariant }}
                     {{# hasQuantity }}
                        <span class="cart-item-quantity">

                           <div class="quantity-input-block js-quantity-input-block"
                              data-css-variables-color-scheme-id="whitePrimary"
                              >

                              <div class="quantity">
                                 <button class="quantity-button no-js-hidden js-quantity-button" data-type="minus" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-minus" fill="none" viewBox="0 0 10 2">
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path>
                                    </svg>
                                 </button>
                                 <input class="quantity-input js-quantity-input" type="number" name="quantity" min="1" value="{{ quantityValue }}" />
                                 <button class="quantity-button no-js-hidden js-quantity-button" data-type="plus" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" fill="none" viewBox="0 0 10 10">
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path>
                                    </svg>
                                 </button>
                              </div>

                           </div><!--quantity-input-block-->

                        </span><!--cart-item-quantity-->
                     {{/ hasQuantity }}
                     <div class="cart-item-details-footer">
                        <div class="cart-item-prices-wrapper">
                           <span class="cart-item-final-price js-cart-item-final-price cart-item-price">{{# formatCurrency }}{{ priceTimesQuantity }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span><!--cart-item-final-price-->
                           <div class="spinner-border js-cart-item-final-price-loading-spinner"></div><!--spinner-border-->
                        </div><!--cart-item-prices-wrapper-->
                        <div class="cart-item-remove js-cart-item-remove" tabindex="0">
                           {{ lang.section_header_cart_remove_item }}
                        </div><!--cart-item-remove-->
                     </div><!--cart-item-details-footer-->
                  </div><!--cart-item-column-details-->
               </div><!--cart-item-inner-->
            </div><!--cart-item-->

         {{/ cart.items }}

         <div class="scroll-for-more-items-indicator js-scroll-for-more-items-indicator">
            {{ lang.section_header_cart_scroll_to_see_all_items }} <span class="scroll-indicator-icon dripicons-arrow-thin-down"></span>
         </div><!--scroll-for-more-items-indicator-->

      </div><!--cart-items-wrapper-->
      <div class="cart-footer">

         {{# cart.meta.showCouponDiscount }}
            <div class="cart-meta">
               <span class="cart-meta-heading">{{ lang.section_header_cart_coupon_discount }}</span>
               <span class="cart-meta-value">{{# formatCurrency }}{{ cart.meta.couponDiscountTotal }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span>
            </div><!--cart-meta-->
         {{/ cart.meta.showCouponDiscount }}

         {{# cart.meta.showShareDiscount }}
            <div class="cart-meta">
               <span class="cart-meta-heading">{{ lang.section_header_cart_share_discount }}</span>
               <span class="cart-meta-value">{{# formatCurrency }}{{ cart.meta.shareDiscountTotal }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span>
            </div><!--cart-meta-->
         {{/ cart.meta.showShareDiscount }}

         {{# cart.meta.showCrossSellDiscount }}
            <div class="cart-meta">
               <span class="cart-meta-heading">{{ lang.section_header_cart_special_discount }}</span>
               <span class="cart-meta-value">{{# formatCurrency }}{{ cart.meta.crossSellDiscountTotal }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span>
            </div><!--cart-meta-->
         {{/ cart.meta.showCrossSellDiscount }}

         {{# cart.meta.showUpgradeDiscount }}
            <div class="cart-meta">
               <span class="cart-meta-heading">{{ lang.section_header_cart_upgrade_discount }}</span>
               <span class="cart-meta-value">{{# formatCurrency }}{{ cart.meta.upgradeDiscountTotal }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span>
            </div><!--cart-meta-->
         {{/ cart.meta.showUpgradeDiscount }}

         {{# cart.meta.showVat }}
            <div class="cart-meta">
               <span class="cart-meta-heading">{{ lang.section_header_cart_tax }}</span>
               <span class="cart-meta-value">{{# formatCurrency }}{{ cart.meta.vatTotal }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span>
            </div><!--cart-meta-->
         {{/ cart.meta.showVat }}

         {{# cart.meta.showShipping }}
            <div class="cart-meta">
               <span class="cart-meta-heading">{{ lang.section_header_cart_shipping }}</span>
               <span class="cart-meta-value">{{# formatCurrency }}{{ cart.meta.shippingTotal }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span>
            </div><!--cart-meta-->
         {{/ cart.meta.showShipping }}

         <div class="cart-total">
            <span class="cart-total-heading">{{ lang.section_header_cart_total }}</span>
            <span class="cart-total-value">{{# formatCurrency }}{{ cart.total }}{{/ formatCurrency }} {{# page.pageData.shouldUseExplicitCurrencyFormat }}{{ user.currency }}{{/ page.pageData.shouldUseExplicitCurrencyFormat }}</span>
         </div><!--cart-total-->

         <div class="cart-button-wrapper">
            <button type="button" class="cart-checkout-button js-cart-checkout-button">
               <span>{{ lang.section_header_cart_checkout }}</span>
            </button>
         </div><!--cart-button-wrapper-->

      </div><!--cart-footer-->

      {{# crossSellPromotion }}

         {{# shouldDisplay }}

            <div class="cross-sell-message-wrapper-outer

            {{^ hasSinglePromotedProduct }}
               set-max-height
            {{/ hasSinglePromotedProduct }}

            ">

               {{# hasSinglePromotedProduct }}

                  <div class="cross-sell-message-single">

                     {{# promotedProduct }}
                        {{# translateComplex }}
                           section_header_cart_cross_sell_single_message
                        {{/ translateComplex }}
                     {{/ promotedProduct }}

                  </div><!--cross-sell-message-single-->

                  <div class="cross-sell-message-single-button-wrapper">

                     <a href="#!" class="btn btn-light js-add-to-cart-button" data-product="{{ promotedProduct.productKey }}">{{ lang.section_header_cart_cross_sell_add_to_cart }}</a>

                  </div><!--cross-sell-message-single-button-wrapper-->

               {{/ hasSinglePromotedProduct }}

               {{^ hasSinglePromotedProduct }}

                  <div class="cross-sell-message-multi-header js-cross-sell-message-multi-header">
                     {{# translateComplex }}
                        section_header_cart_cross_sell_multi_header
                     {{/ translateComplex }}
                  </div><!--cross-sell-message-multi-header-->

                  <div class="cross-sell-message-multi-contents js-cross-sell-message-multi-contents" style="display: none;">

                     <ul>
                        {{# promotedProducts }}
                           <li><a href="{{ user.url.product }}/{{ productKey }}">{{ productName }}</a> ({{ percentageDiscount }}% {{ lang.section_header_cart_cross_sell_multi_contents_off }}) <a href="#!" class="btn btn-sm btn-light js-add-to-cart-button" data-product="{{ productKey }}">{{ lang.section_header_cart_cross_sell_add_to_cart }}</a></li>
                        {{/ promotedProducts }}
                     </ul>

                  </div><!--cross-sell-message-multi-contents-->

               {{/ hasSinglePromotedProduct }}

            </div><!--cross-sell-message-wrapper-outer-->

         {{/ shouldDisplay }}

      {{/ crossSellPromotion }}

   {{/ cart.hasAtLeastOneItem }}

