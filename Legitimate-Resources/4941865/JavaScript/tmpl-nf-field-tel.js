
	<input
			type="tel"
			value="{{{ _.escape( data.value ) }}}"
			class="{{{ data.renderClasses() }}} nf-element"

			id="nf-field-{{{ data.id }}}"
			<# if( ! data.disable_browser_autocompletes ){ #>
			name="{{ data.custom_name_attribute || 'nf-field-' + data.id + '-' + data.type }}"
			autocomplete="tel"
			<# } else { #>
			name="{{ data.custom_name_attribute || 'nf-field-' + data.id }}"
			{{{ data.maybeDisableAutocomplete() }}}
			<# } #>
			{{{ data.renderPlaceholder() }}}

			aria-invalid="false"
			aria-describedby="nf-error-{{{ data.id }}}"
			aria-labelledby="nf-label-field-{{{ data.id }}}"

			{{{ data.maybeRequired() }}}
	>
