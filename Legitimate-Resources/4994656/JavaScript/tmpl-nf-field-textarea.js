
    <textarea id="nf-field-{{{ data.id }}}" name="nf-field-{{{ data.id }}}" aria-invalid="false" aria-describedby="nf-error-{{{ data.id }}}" class="{{{ data.renderClasses() }}} nf-element" {{{ data.renderPlaceholder() }}} {{{ data.maybeDisabled() }}} {{{ data.maybeDisableAutocomplete() }}} {{{ data.maybeInputLimit() }}}
        aria-labelledby="nf-label-field-{{{ data.id }}}"

        {{{ data.maybeRequired() }}}
    >{{{ _.escape( data.value ) }}}</textarea>
