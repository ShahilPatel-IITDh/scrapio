
	<div class="nf-field-label">
		<# if ( data.type === "listcheckbox" || data.type === "listradio" ) { #>
			<span id="nf-label-field-{{{ data.id }}}"
				class="nf-label-span {{{ data.renderLabelClasses() }}}">
					{{{ ( data.maybeFilterHTML() === 'true' ) ? _.escape( data.label ) : data.label }}} {{{ ( 'undefined' != typeof data.required && 1 == data.required ) ? '<span class="ninja-forms-req-symbol">*</span>' : '' }}} 
					{{{ data.maybeRenderHelp() }}}
			</span>
		<# } else { #>
			<label for="nf-field-{{{ data.id }}}"
					id="nf-label-field-{{{ data.id }}}"
					class="{{{ data.renderLabelClasses() }}}">
						{{{ ( data.maybeFilterHTML() === 'true' ) ? _.escape( data.label ) : data.label }}} {{{ ( 'undefined' != typeof data.required && 1 == data.required ) ? '<span class="ninja-forms-req-symbol">*</span>' : '' }}} 
						{{{ data.maybeRenderHelp() }}}
			</label>
		<# } #>
	</div>
