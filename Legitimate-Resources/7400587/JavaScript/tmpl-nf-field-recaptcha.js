
	<input id="nf-field-{{{ data.id }}}" name="nf-field-{{{ data.id }}}" class="{{{ data.renderClasses() }}} nf-element" type="hidden" value="{{{ data.value }}}" />

	<div class="g-recaptcha" data-callback="nf_recaptcha_response_{{{ data.id }}}" data-theme="{{{ data.theme }}}" data-sitekey="{{{ data.site_key }}}" data-fieldid="{{{ data.id }}}" {{{ ( "invisible" == data.size ) ? 'data-size="invisible"' : '' }}}></div>
