
	<input id="nf-field-{{{ data.id }}}" class="{{{ data.renderClasses() }}} nf-element " type="{{{data.type}}}" value="{{{ ( data.maybeFilterHTML() === 'true' ) ? _.escape( data.label ) : data.label }}}" {{{ ( data.disabled ) ? 'aria-disabled="true" disabled="true"' : '' }}}>
