<div class="deleted-state"></div>
<div class="tcm-comment-content <# if ( parseInt( comment.get('tcm_featured') ) === 1 ) { #> tcm-featured <# } #><# if ( comment.get('comment_approved') == 0 )  { #> tcm-comment-awaiting-moderation <# } #> level-<#= comment.get('level') #>"
	 data-comment-id="<#= comment.get('comment_ID') #>">
	<div id="tcm-moderate-front" class="tcm-moderate-front"></div>

	<# if ( comment.isPostAuthor() ) { #>
	<svg class="author-icon-svg"><use xlink:href="#tcm-author-icon"></use></svg>	<# } #>
	<div class="tcm-comment-header">
		<# if ( gravatarActive ) { #>
		<div class="tcm-comment-author-img no-image" title="Comment Author Image" data-social-avatar="<#= comment.get('social_avatar') #>" data-email-hash="<#= comment.get('email_hash') #>" data-comment-id="<#= comment.get('comment_ID') #>" data-src="<#= comment.get('photo_src') #>"
			 style="background-image: url(<#= comment.get('photo_src') #>)"></div>
		<# } #>
		<div class="tcm-author-content">
			<div class="tcm-user-info">
				<div class="tcm-comment-author-name">
					<strong>
						<#= comment.get('display_name') #>
					</strong>
					<# if ( comment.get('show_badge') ) { #>
					<# var badges_object = comment.get('user_achieved_badges');#>
					<# if(badges_object != undefined && badges_object.length === undefined && ThriveComments.settings.tcm_badges_option == '1'){#>
					<div class="tcm-author-badges">
						<# _.each(badges_object,function(badge,key){
						if(badge.image_url.indexOf('all_badges.svg') !== -1){#>
						<span class="tcm-badge svg-badge">
															<span class="text"><#= badge.name #></span>
															<svg><use xlink:href="<#= badge.image_url #>"/></svg>
														</span>
						<#}else{#>
						<span class="tcm-badge" style="background-image: url('<#= badge.image_url #>')">
															<span class="text"><#= badge.name #></span>
														</span>
						<#}#>
						<# });#>
					</div>
					<# } #>
					<# } #>
				</div>

				<# if ( ThriveComments.settings['comment_date'] != 0) { #>
				<div class="tcm-date-container">
											<span>
												<#= comment.get('formatted_date') #>
											</span>
				</div>
				<# } #>
			</div>
		</div>
	</div>

	
	<div class="tcm-comment-text">
		<p class="tcm-moderation tcm-color-ac">This comment is awaiting moderation</p>
		<div class="tcm-comment-text-content">
			<#= comment.get('comment_content') #>
		</div>
	</div>

	<div class="clearfix" style="position: relative;">
		<div class="tcm-left">
			<# var can_vote = true;
			if(ThriveComments.current_user.display_name == undefined && ThriveComments.settings.tcm_voting_only_register == 1){
			can_vote = false;
			}
			if(ThriveComments.settings.tcm_vote_type != 'no_vote' && (comment.get('comment_approved') == 1) && can_vote){#>
			<div class="tcm-voting-container">
                <span>
                    <#= ThriveComments.util.render_label('vote') #>
                </span>
				<button class="tcm-voting-input tcm-upvote <# if(last_vote == 'upvote'){#> active <# } #>" data-type="upvote">
					<div class="tcm-thumb_up">
						<svg class=""><use xlink:href="#tcm-icon-thumb_up"></use></svg>					</div>
					<span class="tcm-votes-count"><#= comment.get('upvote') #></span>
				</button>
				<# if(ThriveComments.settings.tcm_vote_type != 'up_only'){#>
				<button class="tcm-voting-input tcm-downvote <# if(last_vote == 'downvote'){#> active <# } #>" data-type="downvote">
					<div class="tcm-thumb_down">
						<svg class=""><use xlink:href="#tcm-icon-thumb_down"></use></svg>					</div>
					<span class="tcm-votes-count"><#= comment.get('downvote') #> </span>
				</button>
				<# } #>
			</div>
			<# } #>
			<# if ( share_individual_comments && (comment.get('comment_approved') == 1 ) ) { #>
			<div class="tcm-dropdown tcm-share-dropdown">
                    <span class="tcm-toggle-button">
                        <#= ThriveComments.util.render_label('share') #>

						<svg class="bulk-action-arrow-svg"><use xlink:href="#tcm-bulk-action-arrow"></use></svg>
                    </span>
				<div class="tcm-dropdown-content">
					<div class="tcm-dropdown-element">
						<a href="http://www.facebook.com/share.php" class="tcm-fb-icon tcm-share-facebook"
						   data-url="https://adebernard.com/#comments/<#= comment.get('comment_ID') #>">
							Facebook						</a>
					</div>
					<div class="tcm-dropdown-element">
						<a href="https://twitter.com/intent/tweet" class="tcm-tw-icon tcm-share-twitter"
						   data-url="https://adebernard.com/#comments/<#= comment.get('comment_ID') #>">
							Twitter						</a>
					</div>
					<div class="tcm-dropdown-element tcm-copy-input-content">
						<a id="tcm-click-to-copy"
						   class="tcm-left  tcm-copy-url tcm-cu-icon"
						   href="javascript:void(0)" data-clipboard-text="https://adebernard.com/#comments/<#= comment.get('comment_ID') #>">
							<#= ThriveComments.util.render_label('copy_url') #>
						</a>
					</div>
				</div>
			</div>
			<# } #>
		</div>
		<# if ( ! close_comments ) { #>
		<# if ( comment.get('comment_approved') == 1 || ( ThriveComments.current_user.is_moderator && comment.get('comment_approved') !== 1 ) ) { #>
		<div class="tcm-reply-container">
			<button class='tcm-reply-btn tcm-right tcm-truncate tcm-border-color-ac' data-id="<#= comment.get('comment_ID') #>"
					data-level="<#= comment.get('level') #>" type="submit"><span class="reply-icon-container">
						<svg class="tcm-svg-fill-ac"><use xlink:href="#tcm-reply"></use></svg>					</span>
				<#= ThriveComments.util.render_label('reply_to_user', comment.get('comment_author')) #>
			</button>
			<div class="clear"></div>
			<div class="tcm-create-comment-fields"></div>
		</div>
		<# } #>
		<# } #>
	</div>

	<div class="clear"></div>

</div>
