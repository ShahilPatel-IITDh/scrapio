
	<input id="nf-field-{{{ data.id }}}"
	       name="nf-field-{{{ data.id }}}"
	       aria-describedby="nf-error-{{{ data.id }}}"
	       class="{{{ data.renderClasses() }}} nf-element"
	       type="checkbox"
	       value="1" {{{ data.maybeDisabled() }}}{{{ data.maybeChecked() }}}
	       aria-labelledby="nf-label-field-{{{ data.id }}}"

			{{{ data.maybeRequired() }}}
	>
