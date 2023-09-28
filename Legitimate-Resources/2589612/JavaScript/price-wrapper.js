
	<div class="price-wrapper"
		:class="priceRowSize"
	>
		<div
			class="price-prefix"
			v-if="symbolShowPrefix">
			<span
				v-html="symbol"
				class="currency">
			</span>
		</div>
	<div
		class="integer"
		v-html="price.realPriceIntegerPart"
	></div>
	<div class="price-suffix">
		<div class="decimal">
			<span
				v-html="decimal"
				v-if="showDecimal">
			</span><span
				class="currency"
				v-if="!symbolShowPrefix"
				v-html="symbol">
			</span>
		</div>
		<div
			class="period"
			v-if="options.show"
			v-html="period"
			:class="{ 'hide-desktop-period': options.hide }"
		>
		</div>
	</div>
