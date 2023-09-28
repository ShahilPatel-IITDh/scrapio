<div :id="`jet-reviews-item-${itemData.id}`" class="jet-reviews-advanced__review">
	<div class="jet-reviews-advanced__review-header">
		<div class="jet-reviews-advanced__review-author">
			<div class="jet-reviews-user-data">
				<div
					class="jet-reviews-user-data__avatar"
					v-html="itemData.author.avatar"
                    v-if="$root.options.reviewAuthorAvatarVisible"
				></div>
				<div class="jet-reviews-user-data__info">
					<div class="jet-reviews-user-data__info-row">
						<div class="jet-reviews-user-data__name">
							<span v-html="itemData.author.name"></span>
							<time class="jet-reviews-published-date" :datetime="itemData.date.raw" :title="itemData.date.raw"><span>{{ itemData.date.human_diff }}</span></time>
						</div>
						<div
							class="jet-reviews-user-data__verifications"

							v-if="authorVerificationData"
						>
							<div
								class="jet-reviews-user-data__verification"
								:class="[ item.slug ]"
								v-for="(item, index) in authorVerificationData"
							>
								<span class="verification-icon" v-html="item.icon" v-if="item.icon"></span>
								<span class="verification-label" v-html="item.message"></span>
							</div>

						</div>
					</div>

					<div
						class="jet-reviews-user-data__summary-rating"
						v-if="averageRatingVisible"
					>
						<component
							:is="$root.options.ratingLayout"
							:before="false"
							:rating="+itemData.rating"
							:after="'points-field' === $root.options.ratingLayout ? averageRatingData.value : false"
						></component>
					</div>
					<div
						class="jet-reviews-user-data__details-rating"
						v-if="detailsRatingVisible"
					>
						<component
							v-for="(item, index) in itemData.rating_data"
							:is="$root.options.ratingLayout"
							:key="index"
							:before="item.field_label"
							:rating="Math.round( +item.field_value * 100 / +item.field_max )"
							:after="'points-field' === $root.options.ratingLayout ? +item.field_value : false"
						></component>
					</div>
				</div>
			</div>
		</div>
		<div class="jet-reviews-advanced__review-misc">
			<div
				class="jet-reviews-advanced__review-pin"
				v-html="pinnedIcon"
				v-if="pinnedVisible"
			>
			</div>
		</div>
	</div>
	<div
		class="jet-reviews-advanced__review-container"
	>
		<h3
            class="jet-reviews-advanced__review-title"
            v-html="itemData.title"
            v-if="$root.options.reviewTitleVisible"
        ></h3>
		<p class="jet-reviews-advanced__review-content" v-html="itemData.content"></p>
	</div>
	<div
		class="jet-reviews-advanced__review-footer"
	>
		<div class="jet-reviews-advanced__review-controls">
			<div
				class="jet-reviews-advanced__review-control-group"
				v-if="userCanRate"
			>
				<div
					class="jet-reviews-button jet-reviews-button--secondary"
					:class="{ 'jet-progress-state': approvalSubmiting }"
					tabindex="0"
					@click="updateApprovalHandler( 'like' )"
					@keyup.enter="updateApprovalHandler( 'like' )"
				>
					<span class="jet-reviews-button__icon" v-html="likeIcon"></span>
					<span class="jet-reviews-button__text">{{ itemData.like }}</span>
				</div>

				<div
					class="jet-reviews-button jet-reviews-button--secondary"
					:class="{ 'jet-progress-state': approvalSubmiting }"
					tabindex="0"
					@click="updateApprovalHandler( 'dislike' )"
					@keyup.enter="updateApprovalHandler( 'dislike' )"
				>
					<span class="jet-reviews-button__icon" v-html="dislikeIcon"></span>
					<span class="jet-reviews-button__text">{{ itemData.dislike }}</span>
				</div>
			</div>

			<div class="jet-reviews-advanced__review-control-group">
				<div
					v-if="!isCommentsEmpty"
					class="jet-reviews-button jet-reviews-button--primary"
					tabindex="0"
					@click="toggleCommentsVisible"
					@keyup.enter="toggleCommentsVisible"
				>
					<span class="jet-reviews-button__icon" v-if="showCommentsIcon" v-html="showCommentsIcon"></span>
					<span class="jet-reviews-button__text" v-if="!commentsVisible">{{ `${ $root.options.labels.showCommentsButton }(${ itemCommentsCount })` }}</span>
					<span class="jet-reviews-button__text" v-if="commentsVisible">{{ `${ $root.options.labels.hideCommentsButton }(${ itemCommentsCount })` }}</span>
				</div>

				<div
					v-if="userCanComment"
					class="jet-reviews-button jet-reviews-button--primary"
					tabindex="0"
					@click="showCommentForm"
					@keyup.enter="showCommentForm"
				>
					<span class="jet-reviews-button__icon" v-if="addCommentIcon" v-html="addCommentIcon"></span>
					<span class="jet-reviews-button__text">{{ $root.options.labels.newCommentButton }}</span>
				</div>
			</div>
		</div>
		<div
			class="jet-review-new-comment"
			:class="{ 'jet-progress-state': commentSubmiting }"
			v-if="commentFormVisible"
		>
			<div
				class="jet-review-new-comment-form"
			>
				<html-textarea
					class="jet-reviews-input jet-reviews-input--textarea"
					:data-placeholder="$root.options.labels.commentPlaceholder"
					ref="commentContent"
					v-model="commentText"
				></html-textarea>
				<html-textarea
					class="jet-reviews-input"
					:is-valid="isValidAuthorName"
					:placeholder="$root.options.labels.authorNamePlaceholder"
					:not-valid-label="$root.options.labels.notValidFieldMessage"
					v-model="commentAuthorName"
					v-if="$root.guestNameFieldVisible"
				></html-textarea>
				<html-textarea
					class="jet-reviews-input"
					:is-valid="isValidAuthorEmail"
					:placeholder="$root.options.labels.authorMailPlaceholder"
					:not-valid-label="$root.options.labels.notValidFieldMessage"
					v-model="commentAuthorMail"
					v-if="$root.guestNameFieldVisible"
				></html-textarea>
				<div
					class="jet-review-new-comment-controls"
				>
					<div
						class="jet-reviews-button jet-reviews-button--secondary"
						tabindex="0"
						@click="cancelNewComment"
						@keyup.enter="cancelNewComment"
					>
						<div class="jet-reviews-button__text">{{ $root.options.labels.cancelButtonLabel }}</div>
					</div>
					<div
						v-if="commentControlsVisible"
						class="jet-reviews-button jet-reviews-button--primary"
						tabindex="0"
						@click="submitNewComment"
						@keyup.enter="submitNewComment"
					>
						<div class="jet-reviews-button__text">{{ $root.options.labels.submitCommentButton }}</div>
					</div>
				</div>
				<div
					class="jet-review-new-comment-message"
					v-if="responseMessage"
				>
					<span>{{ responseMessage }}</span>
				</div>
			</div>
		</div>
		<div
			class="jet-reviews-advanced__review-comments"
			v-if="isCommentsVisible"
		>
			<h4 class="jet-reviews-advanced__comments-title">{{ $root.options.labels.сommentsTitle }}</h4>
			<jet-advanced-reviews-comment
				v-for="comment in itemData.comments"
				:key="comment.id"
				:comment-data="comment"
				:parent-id="0"
				:parent-comments="[]"
				:depth="0"
			>
			</jet-advanced-reviews-comment>
		</div>
	</div>
</div>
					