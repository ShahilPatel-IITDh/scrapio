
    <select id="nf-field-{{{ data.id }}}" name="nf-field-{{{ data.id }}}" aria-invalid="false" aria-describedby="nf-error-{{{ data.id }}}" class="{{{ data.renderClasses() }}} nf-element" {{{ data.renderOtherAttributes() }}}
            aria-labelledby="nf-label-field-{{{ data.id }}}"

	    {{{ data.maybeRequired() }}}
    >
        {{{ data.renderOptions() }}}
    </select>
    <div for="nf-field-{{{ data.id }}}"></div>
