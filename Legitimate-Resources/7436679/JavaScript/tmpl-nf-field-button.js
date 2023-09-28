
    <button id="nf-field-{{{ data.id }}}" name="nf-field-{{{ data.id }}}" class="{{{ data.classes }}} nf-element">
        {{{ ( data.maybeFilterHTML() === 'true' ) ? _.escape( data.label ) : data.label }}}
    </button>
