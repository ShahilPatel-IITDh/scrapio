<button class="tcm-loader">
	<div style="display: inline-block" class="tcm-dot-loader done">
		<span class="inner1"></span>
		<span class="inner2"></span>
		<span class="inner3"></span>
	</div>
	<p>
		<#= ThriveComments.util.render_label('load_comments') #>
	</p>
</button>
<# if ( comments_rendered > 2 && ! ThriveComments.close_comments ) { #>
<div class="add-comment tcm-background-color-ac">
	<p>
			<span class="add-comment-icon">
				<svg class="add-comment-svg"><use xlink:href="#tcm-add-comment"></use></svg>			</span>
		<#= ThriveComments.util.render_label('add_comment') #></#></p>
</div>
<# } #>
<# if ( showPoweredBy ) { #>
<div class="tcm-powered-by">
		<a href="https://thrivethemes.com/comments/" title="Powered by Thrive Comments" target="_blank">
			<span class="tcm-footer-logo">
				<svg class="logo-footer-svg"><use xlink:href="#tcm-logo-footer"></use></svg>			</span>

		<span>
			Powered by 		</span>
		<span>
			Thrive Comments		</span>
	</a>
</div>
<# } #>

<# if ( ! ThriveComments.close_comments && ThriveComments.email_services.length !== 0 ) { #>
<div class="tcm-align-right">

	<a href="javascript:void(0)" class="tcm-link-unsubscribe" title="<#= ThriveComments.util.render_label('unsubscribe') #>"
	<# if ( - 1 === ThriveComments.util.get_cookie( 'subscribed_posts' ).indexOf( ThriveComments.post.ID ) || ( typeof ThriveComments.current_user.ID === 'undefined' ) ) { #> hidden <# } #> >
	<#= ThriveComments.util.render_label('unsubscribe') #></a>

	<a href="javascript:void(0)" class="tcm-link-subscribe" title="<#= ThriveComments.util.render_label('subscribe') #>"
	<# if ( - 1 !== ThriveComments.util.get_cookie( 'subscribed_posts' ).indexOf( ThriveComments.post.ID ) ) { #> hidden <# } #> >
	<#= ThriveComments.util.render_label('subscribe') #></a>

	<div id="tcm-subscribe-form" class="tcm-subscribe-form" hidden>
		<div class="tcm-error-message"></div>
		<input class="form-input tcm-subscriber-email" type="text" name="Email" placeholder="<#= ThriveComments.util.render_label('email') #>"/>
		<button class="submit-subscribe-post"><#= ThriveComments.util.render_label('subscribe') #></a></button>
	</div>

	<# if ( typeof ThriveComments.current_user.ID === 'undefined' ) { #>
	<div id="tcm-unsubscribe-form" class="tcm-subscribe-form"
	<# if ( - 1 === ThriveComments.util.get_cookie( 'subscribed_posts' ).indexOf( ThriveComments.post.ID ) ) { #> hidden <# } #> >
	<div class="tcm-error-message"></div>
	<input class="form-input tcm-unsubscriber-email" type="text" name="Email" placeholder="<#= ThriveComments.util.render_label('email') #>"/>
	<button class="submit-unsubscribe-post"><#= ThriveComments.util.render_label('unsubscribe') #></a></button>
</div>
<# } #>
<p class="tcm-already-subscribed" hidden> Already subscribed! </p>

</div>
<# } #>
<div class="clear"></div>
