<div
    :id="`jet-reviews-comment-item-${commentData.id}`"
	class="jet-reviews-advanced__review-comment"
	:class="commentClass"
>
	<div
		class="jet-reviews-comment-user-avatar"
		v-html="commentData.author.avatar"
        v-if="$root.options.commentAuthorAvatarVisible"
	></div>
	<div class="jet-reviews-comment-container">
		<div class="jet-reviews-comment-user-details">
			<div class="jet-reviews-comment-user-name"><span>{{ commentData.author.name }}</span><time class="jet-reviews-published-date" :datetime="commentData.date.raw" :title="commentData.date.raw"><span>{{ commentData.date.human_diff }}</span></time></div>
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
		<p class="jet-reviews-comment-content" v-html="commentData.content"></p>
		<div
			class="jet-reviews-comment-actions"
			v-if="formControlsVisible"
		>
			<div
				class="jet-reviews-button jet-reviews-button--primary"
				tabindex="0"
				@click="showReplyForm"
				@keyup.enter="showReplyForm"
			>
				<span class="jet-reviews-button__icon" v-if="replyIcon" v-html="replyIcon"></span>
				<span class="jet-reviews-button__text">{{ $root.options.labels.replyButton }}</span>
			</div>
		</div>

		<div
			class="jet-reviews-comment-reply-form"
			:class="{ 'jet-progress-state': replySubmiting }"
			v-if="replyFormVisible"
		>
			<html-textarea
				class="jet-reviews-input jet-reviews-input--textarea"
				:data-placeholder="$root.options.labels.replyPlaceholder"
				v-model="replyText"
				ref="commentText"
			></html-textarea>
			<html-textarea
				class="jet-reviews-input"
				:is-valid="isValidAuthorName"
				:placeholder="$root.options.labels.authorNamePlaceholder"
				:not-valid-label="$root.options.labels.notValidFieldMessage"
				v-model="replyAuthorName"
				v-if="$root.guestNameFieldVisible"
			></html-textarea>
			<html-textarea
				class="jet-reviews-input"
				:is-valid="isValidAuthorEmail"
				:placeholder="$root.options.labels.authorMailPlaceholder"
				:not-valid-label="$root.options.labels.notValidFieldMessage"
				v-model="replyAuthorMail"
				v-if="$root.guestNameFieldVisible"
			></html-textarea>

			<div
				class="jet-reviews-comment-reply-controls"
			>
				<div
					class="jet-reviews-button jet-reviews-button--secondary"
					tabindex="0"
					@click="cancelNewReply"
					@keyup.enter="cancelNewReply"
				>
					<div class="jet-reviews-button__text">{{ $root.options.labels.cancelButtonLabel }}</div>
				</div>
				<div
					v-if="submitVisible"
					class="jet-reviews-button jet-reviews-button--primary"
					tabindex="0"
					@click="submitNewReply"
					@keyup.enter="submitNewReply"
				>
					<div class="jet-reviews-button__text">{{ $root.options.labels.submitReplyButton }}</div>
				</div>
			</div>

			<div
				v-if="responseMessage"
				class="jet-reviews-comment-reply-message"
			>
				<span>{{ responseMessage }}</span>
			</div>
		</div>

		<div
			v-if="0 !== commentsList.length"
			class="jet-reviews-comment-reply-list"
		>
			<jet-advanced-reviews-comment
				v-for="comment in commentsList"
				:key="comment.id"
				:comment-data="comment"
				:parent-id="+commentData.id"
				:parent-comments="commentData.children"
				:depth="1"
			>
			</jet-advanced-reviews-comment>
		</div>

	</div>

</div>
					