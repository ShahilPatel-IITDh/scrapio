<# if ( ! current_user_id && comment_registration ) { #>
<div class="tcm-error-heading">
	<p><#= ThriveComments.util.render_label('login_submit_comment') #></p>
</div>
<# } #>
<div class="tcm-comment-wrapper">
	<# if ( ! close_comments ) { #>
	<div class="tcm-create-post-container comment-id-<#= id #>" data-position="<#= position #>" data-comment-id="<#= id #>">
		<# if ( gravatarActive ) { #>
		<div class="left">
			<div class="tcm-client-avatar"
			<# if(typeof (ThriveComments.social_user) !== 'undefined'){#>style="background-image: url('<#= ThriveComments.social_user.picture #>')"<#}else{#>style="background-image: url('<#= photo_src #>')"<#}#>>
		</div>
	</div>
	<# } #>
	<div class="right">
		<div class="tcm-post-input-container">
			<div class="tcm-error-message"></div>
			<textarea tabindex="1" <# if ( mainInput ) { #> class='mainInput' <# } #> id='tcm-post-content' name="tcm-post-content" placeholder="<#= ThriveComments.util.render_label('enter_comment') #>"><#= comment_content #></textarea>
		</div>
				<div class="tcm-extra-fields">
					</div>
		<div class="tcm-comment-additional-fields">
			<div class="inner clear-this">
				<# if ( ThriveComments.current_user.ID || typeof (ThriveComments.social_user) !== 'undefined') { #>
				<div class="tcm-comment-as">
					<div class="tcm-comment-as-label">
						<p><#= ThriveComments.util.render_label('commenting_as',ThriveComments.current_user.display_name || ( ThriveComments.social_user && ThriveComments.social_user.name ) ) #></p>
					</div>
					<div class="tcm-logout-label">
						<a <# if(ThriveComments.current_user.ID){#>href="https://adebernard.com/wp-login.php?action=logout&amp;_wpnonce=b8b81c6f2c"<#}#>><#= ThriveComments.util.render_label('logout_change') #></a>
					</div>
				</div>

				<div class="tcm-btn-div">
					<button tabindex="1" class="tcm-save-btn tcm-save-btn-right tcm-truncate tcm-transparent tcm-border-color-ac-h " id="tcm-submit-comment" data-parent="<#= id #>" data-level="<#= level #>" type="submit">
						<#= ThriveComments.util.render_label('submit_comment') #>
					</button>
				</div>

				<# if ( ! ThriveComments.close_comments && ThriveComments.email_services.length !== 0 ) { #>
				<label class="tcm_receive_notif_container">
					<#= ThriveComments.util.render_label('tcm_receive_notifications') #>
					<# if ( ThriveComments.settings.tcm_moderators_notifications && ThriveComments.current_user.is_moderator ) { #>
					<input id="tcm_receive_notifications" class="form-input" type="checkbox" name="tcm_receive_notifications" checked/>
					<# } else { #>
					<input id="tcm_receive_notifications" class="form-input" type="checkbox" name="tcm_receive_notifications"/>
					<# } #>
					<span class="checkmark"></span>
				</label>
				<# } #>

				<# if ( ThriveComments.settings.remember_me === '1' && ! ThriveComments.current_user.ID && ! ThriveComments.social_user ) { #>
				<label class="tcm_remember_me">
					<#= ThriveComments.util.render_label('remember_me') #>
					<input id="tcm_remember_me" class="form-input" type="checkbox" name="tcm_remember_me"/>
					<span class="checkmark"></span>
				</label>
				<# } #>

				<# } else if( ThriveComments.settings.comment_registration && !ThriveComments.current_user.ID) { #>

				<# if ( ! current_user_id ) { #>
				<# if ( ! ThriveComments.close_comments && ThriveComments.email_services.length !== 0 ) { #>
				<label class="tcm_receive_notif_container">
					<#= ThriveComments.util.render_label('tcm_receive_notifications') #>
					<input id="tcm_receive_notifications" class="form-input" type="checkbox" name="tcm_receive_notifications"/>
					<span class="checkmark"></span>
				</label>
				<# } #>
				<button class="tcm-show-login tcm-save-btn-center" id="tcm-login-up" data-parent="<#= id #>" data-level="<#= level #>" type="submit">
					<#= ThriveComments.util.render_label('login_on_website') #>
				</button>
				<# } #>
				<# } else {#>
				<div class="tcm-guest">
					<# if ( !ThriveComments.settings.comment_registration && !ThriveComments.current_user.ID ) {#>
					<p><#= ThriveComments.util.render_label('guest_comment') #></p>
					<div class="tcm-error-message"></div>
					<input tabindex="1" id="tcm-guest-name" class="form-input" type="text" name="name" placeholder="<#= ThriveComments.util.render_label('name') #>"/>
					<div class="tcm-error-message"></div>
					<input tabindex="1" id="tcm-guest-email" class="form-input" type="text" name="email" placeholder="<#= ThriveComments.util.render_label('email') #>"/>
					<# if(ThriveComments.settings.tcm_show_url == 1){#>
					<div class="tcm-error-message"></div>
					<input tabindex="1" id="tcm-author-url" class="form-input" type="text" name="url" placeholder="<#= ThriveComments.util.render_label('website') #>"/>
					<# } #>
					<# } #>


					<# if ( ! ThriveComments.close_comments && ThriveComments.email_services.length !== 0 ) { #>
					<label class="tcm_receive_notif_container">
						<#= ThriveComments.util.render_label('tcm_receive_notifications') #>
						<input id="tcm_receive_notifications" class="form-input" type="checkbox" name="tcm_receive_notifications"/>
						<span class="checkmark"></span>
					</label>
					<# } #>

					<# if ( ThriveComments.settings.remember_me === '1' ) { #>
					<label class="tcm_remember_me">
						<#= ThriveComments.util.render_label('remember_me') #>
						<input id="tcm_remember_me" class="form-input" type="checkbox" name="tcm_remember_me"/>
						<span class="checkmark"></span>
					</label>
					<# } #>

					<# if ( ThriveComments.settings.storing_consent === '1' && !ThriveComments.current_user.ID ) { #>
					<label class="tcm_remember_me tcm_last_label">
						<span class="tcm-consent-text"><#= ThriveComments.util.render_label('storing_consent') #></span>
						<div class="tcm-error-message"></div>
						<input id="tcm_storing_consent" class="form-input" type="checkbox" name="tcm_storing_consent"/>
						<span class="checkmark"></span>
					</label>
					<# } #>

					<button tabindex="1" class="tcm-save-btn tcm-truncate tcm-transparent tcm-border-color-ac-h" id="tcm-submit-comment" data-parent="<#= id #>" data-level="<#= level #>" type="submit">
						<#= ThriveComments.util.render_label('submit_comment') #>
					</button>
				</div>

				<# if ( ( ! current_user_id && ThriveComments.settings.login_activation ) || ( ThriveComments.settings.tcm_enable_social_signin === '1' &&
				( ( ThriveComments.settings.tcm_api_status.google === 1 && ThriveComments.settings.tcm_api_status.google_api === 1 ) ||
				( ThriveComments.settings.tcm_api_status.facebook === 1 && ThriveComments.settings.tcm_api_status.facebook_api === 1 ) ) ) ) { #>
				<div class="tcm-separator">
					<span>or</span>
				</div>
				<# } #>
				<div class="tcm-user-details">
					<# if ( ! current_user_id && ThriveComments.settings.tcm_enable_social_signin === '1' && ( ThriveComments.social_user === undefined &&
					( ThriveComments.settings.tcm_api_status.google === 1 && ThriveComments.settings.tcm_api_status.google_api === 1 ) ||
					( ThriveComments.settings.tcm_api_status.facebook === 1 && ThriveComments.settings.tcm_api_status.facebook_api === 1 ) ) ) { #>
					<div class="tcm-social-accounts">
						<p>
							<#= ThriveComments.util.render_label('social_account') #>
						</p>
						<# if( ThriveComments.settings.tcm_api_status.facebook === 1 && ThriveComments.settings.tcm_api_status.facebook_api === 1 ){#>
						<a href="javascript:void(0)" id="tcm-fb-logo" class="tcm-social-share-logo">
						                                            <span class="tcm-share-info">
							                                            <#= ThriveComments.util.render_label( 'signin_facebook' ) #>
						                                            </span>
						</a>
						<# } #>
						<# if( ThriveComments.settings.tcm_api_status.google === 1 && ThriveComments.settings.tcm_api_status.google_api === 1 ){#>
						<div id="tcm-google-sign-in-<#= id #>" class="tcm-social-share-logo"></div>
						<# } #>
					</div>
					<# } #>
					<# if ( ! current_user_id && ThriveComments.settings.login_activation ) { #>

					<button class="tcm-show-login tcm-truncate" id="tcm-login-down" data-parent="<#= id #>" data-level="<#= level #>" type="submit"
					<# if(ThriveComments.settings.tcm_enable_social_signin == 1){#>style="margin-top: 20px;"<#}#>>
					<#= ThriveComments.util.render_label('login_on_website') #>
					</button>
					<# } #>
				</div>
				<# }#>
			</div>
		</div>
	</div>
	<div class="clear"></div>
</div>

<# } #>
</div>
