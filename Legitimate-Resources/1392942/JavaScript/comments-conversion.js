<# if ( html_switch === 'tcm_live_update' ) { #>
<div class="tcm-thank-you-submited tcm-border-color-ac">
	<#= custom_message #>
</div>
<# } #>
<# if ( html_switch === 'tcm_related_posts' ) { #>
<div class="tcm-posts tcm-border-color-ac">
	<#= custom_message #>
	<div class="tcm-posts-list <# if ( ! show_featured_image ) { #> no-featured-image <# } #> clear-this posts-length-<#= ThriveComments.related_posts.length #>">
		<# ThriveComments.related_posts.forEach( function ( value ) { #>
		<div class="tcm-post tcm-color-ac <# if ( ! show_featured_image ) { #> tcm-border-bottom-color-ac <# } #>">
			<# if ( show_featured_image ) { #>
			<div>
				<a href="<#= value.guid #>" style="background-image: url(<#= value.featured_image #>)" class="tcm-related-thumbnail <# if ( ! value.featured_image ) { #>tcm-no-featured-image<# } #>">
				</a>
			</div>
			<# } #>
			<h3><a href="<#= value.guid #>">

								<span>
									<svg class="related-posts-arrow tcm-svg-fill-ac"><use xlink:href="#tcm-related-posts-arrow"></use></svg>								</span>


					<#= value.post_title #>

				</#></a></h3>
		</div>
		<# } ) #>
	</div>
</div>
<# } #>
<# if ( html_switch === 'tcm_social_share' ) { #>
<div class="tcm-share-post tcm-border-color-ac">
	<#= custom_message #>
	<div class="share-buttons">
		<# if ( share_btns.fb_share ) { #>
		<div class="fb-button" data-href="http://www.facebook.com/share.php"></div>
		<# } #>
		<# if ( share_btns.tw_share ) { #>
		<div class="tw-button" data-href="https://twitter.com/intent/tweet"></div>
		<# } #>
		<# if ( share_btns.lk_share ) { #>
		<div class="in-button" data-href="https://www.linkedin.com/cws/share"></div>
		<# } #>
		<# if ( share_btns.pt_share ) { #>
		<div class="pt-button" data-href="http://pinterest.com/pin/create/button"></div>
		<# } #>
		<# if ( share_btns.xi_share ) { #>
		<div class="xi-button" data-href="https://www.xing.com/spi/shares/new"></div>
		<# } #>
	</div>
</div>
<# } #>
