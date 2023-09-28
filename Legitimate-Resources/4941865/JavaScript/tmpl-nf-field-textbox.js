
	<input
			type="text"
			value="{{{ _.escape( data.value ) }}}"
			class="{{{ data.renderClasses() }}} nf-element"
			{{{ data.renderPlaceholder() }}}
			{{{ data.maybeDisabled() }}}
			{{{ data.maybeInputLimit() }}}

			id="nf-field-{{{ data.id }}}"
			<# if( ! data.disable_browser_autocomplete && -1 < [ 'city', 'zip' ].indexOf( data.type ) ){ #>
				name="{{ data.custom_name_attribute || 'nf-field-' + data.id + '-' + data.type }}"
				autocomplete="on"
			<# } else { #>
				name="{{ data.custom_name_attribute || 'nf-field-' + data.id }}"
				{{{ data.maybeDisableAutocomplete() }}}
			<# } #>

			aria-invalid="false"
			aria-describedby="nf-error-{{{ data.id }}}"
			aria-labelledby="nf-label-field-{{{ data.id }}}"

			{{{ data.maybeRequired() }}}
	>
