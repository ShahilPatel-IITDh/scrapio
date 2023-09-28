

	<div class="comment js-comment" data-blog-post-comment-id-encrypted="{{ blogPostCommentIdEncrypted }}">

		<div class="comment-core js-comment-core">

			<div class="comment-header">

				<div class="comment-user-info">

					<span class="comment-author custom-style-color-text-heading font-section-blog-post-commentAuthorName">{{ name }}</span>
					<span class="comment-date custom-style-color-text-regular font-section-blog-post-commentDate">({{ timeElapsed }})</span>

				</div><!--comment-user-info-->

				<div class="comment-actions">
					{{# page.loggedInSellerOwnsThisPage }}
						<button class="comment-delete-button js-comment-delete-button comment-action-button" data-toggle="tooltip" data-placement="top" title="{{ lang.section_blog_post_comment_action_delete }}"></button>
					{{/ page.loggedInSellerOwnsThisPage }}
					<button class="comment-report-button js-comment-report-button comment-action-button" data-toggle="tooltip" data-placement="top" title="{{ lang.section_blog_post_comment_action_report }}"></button>
					<button class="comment-reply-button js-comment-reply-button comment-action-button" data-toggle="tooltip" data-placement="top" title="{{ lang.section_blog_post_comment_action_reply }}"></button>
				</div><!--comment-actions-->

			</div><!--comment-header-->

			<div class="comment-content js-comment-content custom-style-color-text-regular font-section-blog-post-commentContent">
				<!--Don't escape below so br tags appear -->
				{{{ commentContent }}}
			</div><!--comment-content-->

			<div class="comment-content-read-more-link-wrapper js-comment-content-read-more-link-wrapper" style="display: none;">
				<a href="#!" class="link-underline js-comment-content-read-more-link">{{ lang.section_blog_post_comment_read_more }}</a>
			</div><!--comment-content-read-more-link-wrapper-->

		</div><!--comment-core-->

		<div class="reply-to-comment-form-wrapper js-reply-to-comment-form-wrapper" style="display: none;">

			<div class="form-group">
				<textarea class="form-control js-comment-textarea" rows="3"></textarea>
				<div class="invalid-feedback">
		          {{ lang.section_blog_post_comments_empty_comment }}
		        </div><!--invalid-feedback-->
			</div><!--form-group-->

			<button type="button" class="btn btn-primary btn-lg js-first-submit-comment-button" data-reply-mode="1">
				{{ lang.section_blog_post_comments_post_reply_button }}
			</button>

		</div><!--reply-to-comment-form-wrapper-->

		<div class="comment-replies-wrapper js-comment-replies-wrapper" style="display: none;">

		</div><!--comment-replies-wrapper-->

	</div><!--comment-->

