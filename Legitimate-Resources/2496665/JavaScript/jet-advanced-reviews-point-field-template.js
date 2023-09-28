<div
	class="jet-reviews-field jet-reviews-points-field"
	:class="ratingClass"
>
	<div
		class="jet-reviews-field__label jet-reviews-field__label-before"
		v-if="!isBeforeEmpty"
	>
		<span>{{ before }}</span>
	</div>
	<div class="jet-reviews-field__rating">
		<div class="jet-reviews-points-field__adjuster"></div>
		<div class="jet-reviews-points-field__filled" :style="{ width: preparedRating + '%' }"></div>
		<div class="jet-reviews-points-field__empty" :style="{ width: ( 100 - preparedRating ) + '%' }"></div>
	</div>
	<div
		class="jet-reviews-field__label jet-reviews-field__label-after"
		v-if="!isAfterEmpty"
	>
		<span>{{ after }}</span>
	</div>
</div>
					