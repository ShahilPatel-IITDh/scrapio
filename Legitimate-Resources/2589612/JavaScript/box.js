
	<div
		:class="
			typeof options['option_' + (selected_index + 1)].promo !== 'undefined' &&
			typeof options['option_' + (selected_index + 1)].promo['box' + (iterator + 1)] !== 'undefined' ?
			options['option_' + (selected_index + 1)].promo['box' + (iterator + 1)] : ''
		"
		class="box font-avg-sans-1">
		<div class="header-footer-wrap">
			<div
				class="header-wrap"
				:class="typeof options['option_' + (selected_index + 1)].label_texts !== 'undefined' ? 'labelActive' : ''"
			>
				<div
					class="actionbox-title"
					v-bind:class="{ 'hide-mobile-title': hide_mobile_title, 'hide-desktop-title': hide_desktop_title }"
				>
					<span
						v-if="typeof options['option_' + (selected_index + 1)].header_titles !== 'undefined'">
						<% options['option_' + (selected_index + 1)].header_titles[iterator] %>
					</span>
				</div>

				<div
					class="platforms"
					v-if="typeof options['option_' + (selected_index + 1)].platforms !== 'undefined'"
				>
					<img v-for="iconPath in options['option_' + (selected_index + 1)].platforms" :src="'https://static2.avg.com/10003188/web/i/' + iconPath" alt="" />
				</div>
                	<div
						class="label"
                        :data-label-id="set[Object.keys(set)[iterator]].productId"
						v-if="
							typeof options['option_' + (selected_index + 1)].label_texts !== 'undefined' &&
							typeof options['option_' + (selected_index + 1)].label_texts['box' + (iterator + 1)] !== 'undefined'"
                    >
                        <span
                            class="label-text"
                            v-html="renderLabel(options['option_' + (selected_index + 1)].label_texts['box' + (iterator + 1)])"
                        ></span>
					</div>

				<div v-if="typeof options['option_' + (selected_index + 1)].label_placeholder !== 'undefined'">
					<div class="label-placeholder"></div>
				</div>
				
			</div>

			<div class="footer-wrap">

				<installments
					:price="set[Object.keys(set)[iterator]]"
					:installments_placeholder="typeof options['option_' + (selected_index + 1)].installments_placeholder !== 'undefined'"
				/>

				<div class="actionbox-price-main">
					<div class="period-wrap">
						<div
							class="rendered-price"
							data-product-category="Consumer"
							data-role="price"
							:data-product-id="set[Object.keys(set)[iterator]].productId"
							:data-maintenance="(iterator + 1) * 12"
							:data-seats="set[Object.keys(set)[iterator]].seats"
							:data-campaign="typeof options['option_' + (selected_index + 1)].campaign !== 'undefined' ? options['option_' + (selected_index + 1)].campaign : '' "
							:data-campaign-marker="typeof options['option_' + (selected_index + 1)].campaignMarker !== 'undefined' ? options['option_' + (selected_index + 1)].campaignMarker : 'WDG~pt-br~homepage~~~trSrcCookieValue'"
							><price-wrapper
								:price="set[Object.keys(set)[iterator]]"
								:options="{
									show : typeof options['option_' + (selected_index + 1)].period_text !== 'undefined',
									text : options['option_' + (selected_index + 1)].period_text,
									hide : options['option_' + (selected_index + 1)].hide_desktop_period
								}"
                                :period="options['option_' + (selected_index + 1)].period_text"
							/>
						</div>
					</div>


					<div v-if="typeof set[Object.keys(set)[iterator]].discount !== 'undefined' && set[Object.keys(set)[iterator]].discount !== '0' && options['option_' + (selected_index + 1)].show_listPrice && avastGlobals.web.locale !== 'en-gb'">
						<div
							class="old-price"
							data-role="price"
							data-product-category="Consumer"
							v-html="compileOldPrice"
							:data-product-id="set[Object.keys(set)[iterator]].productId"
							:data-maintenance="(iterator + 1) * 12"
							:data-seats="set[Object.keys(set)[iterator]].seats"
							:data-campaign="typeof options['option_' + (selected_index + 1)].campaign !== 'undefined' ? options['option_' + (selected_index + 1)].campaign : '' "
							:data-campaign-marker="typeof options['option_' + (selected_index + 1)].campaignMarker !== 'undefined' ? options['option_' + (selected_index + 1)].campaignMarker : 'WDG~pt-br~homepage~~~trSrcCookieValue' "
							>
						</div>
					</div>


					
					<div
						v-if="avastGlobals.web.locale === 'en-gb' && monthPrice !== false"
						class="month-price"
					>
						It works out as <b>£<% monthPrice %></b>/month.
					</div>


					<div v-if="typeof options['option_' + (selected_index + 1)].discount_placeholder !== 'undefined'">
						<div class="discount-placeholder"></div>
					</div>
					
				</div>
				
				<div 
					v-if="typeof options['option_' + (selected_index + 1)].note_above_cta !== 'undefined'" 
					class="note_above_cta"
					v-html="options['option_' + (selected_index + 1)].note_above_cta"
				></div>

				<a
					class="actionbox-button bi-cart-link"
					v-bind:href="set[Object.keys(set)[iterator]].link"
					data-role="cart-link"
					:data-product-id="set[Object.keys(set)[iterator]].productId"
					data-product-category="Consumer"
					:data-maintenance="(iterator + 1) * 12"
					:data-seats="set[Object.keys(set)[iterator]].seats"
					:data-price="set[Object.keys(set)[iterator]].realPriceRounded"
					:data-campaign="typeof options['option_' + (selected_index + 1)].campaign !== 'undefined' ? options['option_' + (selected_index + 1)].campaign : '' "
					:data-campaign-marker="typeof options['option_' + (selected_index + 1)].campaignMarker !== 'undefined' ? options['option_' + (selected_index + 1)].campaignMarker : 'WDG~pt-br~homepage~~~trSrcCookieValue' "
					data-aswparam-placeholder="">

					<span>Comprar&nbsp;agora</span>
				</a>
				
                <template v-if="'auto_cta_note' in options['option_' + (selected_index + 1)] && options['option_' + (selected_index + 1)].auto_cta_note === 'false'">
                	<div
                        class="bottom-text"
                        v-if="typeof options['option_' + (selected_index + 1)].footer_texts !== 'undefined'"
                        v-html="options['option_' + (selected_index + 1)].footer_texts[iterator]">
                    </div>
                </template>
                <template v-else>
                    <div
                        class="bottom-text"
                        v-if="'footer_texts' in options['option_' + (selected_index + 1)] && typeof options['option_' + (selected_index + 1)].footer_texts !== 'undefined' && options['option_' + (selected_index + 1)].footer_texts !== undefined"
                        v-html="footerText(options['option_' + (selected_index + 1)].footer_texts[iterator])">
                    </div>
                    <div
                        class="bottom-text"
                        v-else
                        v-html="footerTextAlone()">
                    </div>
  				</template>
			</div>
		</div>
	</div>
