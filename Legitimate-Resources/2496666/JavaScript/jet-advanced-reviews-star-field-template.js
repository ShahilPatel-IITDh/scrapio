<div
	class="jet-reviews-field jet-reviews-stars-field"
	:class="ratingClass"
>
	<div
		class="jet-reviews-field__label jet-reviews-field__label-before"
		v-if="!isBeforeEmpty"
	>
		<span>{{ before }}</span>
	</div>
	<div class="jet-reviews-field__rating">
		<div
			class="jet-reviews-stars jet-reviews-stars--adjuster"
			v-html="emptyIcons"
		></div>
		<div
			class="jet-reviews-stars jet-reviews-stars--filled"
			:style="{ width: preparedRating + '%' }"
			v-html="filledIcons"
		>
		</div>
		<div
			class="jet-reviews-stars jet-reviews-stars--empty"
			:style="{ width: ( 100 - preparedRating ) + '%' }"
			v-html="emptyIcons"
		>
		</div>
	</div>
	<div
		class="jet-reviews-field__label jet-reviews-field__label-after"
		v-if="!isAfterEmpty"
	>
		<span>{{ after }}</span>
	</div>
</div>
					