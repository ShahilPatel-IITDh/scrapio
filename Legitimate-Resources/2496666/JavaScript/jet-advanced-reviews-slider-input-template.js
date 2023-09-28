<div
	class="jet-reviews-slider-input jet-reviews-range-input"
>
	<span
		class="jet-new-review-field-label"
		v-html="label"
	></span>
	<input
		tabindex="0"
		type="range"
		min="0"
		:step="step"
		:max="max"
		:value="value"
		@input="handleInput"
		@change="handleChange"
	>
	<span
		class="jet-new-review-field-value"
		v-html="valueLabel"
	></span>
</div>
					