
    <#
    /*
     * Render our input limit section if that setting exists.
     */
    #>
    <div class="nf-input-limit"></div>
    <#
    /*
     * Render our error section if we have an error.
     */
    #>
    <div id="nf-error-{{{ data.id }}}" class="nf-error-wrap nf-error" role="alert"></div>
    <#
    /*
     * Render any custom HTML after our field.
     */
    #>
    {{{ data.afterField }}}
