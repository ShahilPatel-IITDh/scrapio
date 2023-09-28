<div
	class="jet-reviews-stars-input"
>
	<span
		class="jet-new-review-field-label"
		v-html="label"
	></span>
	<div
		class="jet-reviews-field jet-reviews-stars-field"
		:class="ratingClass"
	>
		<div
			class="jet-reviews-field__rating"
		>
			<div
				class="jet-reviews-stars jet-reviews-stars--adjuster"
				@mouseout="ratingMouseOut()"
			>
				<div
					class="jet-reviews-star"
					v-for="index in max"
					:key="index"
					v-html="emptyIcon"
					@click="ratingClick( index )"
					@mouseover="ratingMouseOver( index )"
				></div>
			</div>
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
	</div>
	<span
		class="jet-new-review-field-value"
		v-html="valueLabel"
	></span>
</div>
					