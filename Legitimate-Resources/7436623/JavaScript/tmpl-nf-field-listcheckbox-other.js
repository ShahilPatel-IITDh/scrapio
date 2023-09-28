<li {{{ ( ! data.visible ) ? 'style="display:none"' : '' }}}><input type="checkbox"
id="nf-field-{{{ data.fieldID }}}-other"
name="nf-field-{{{ data.fieldID }}}" class="{{{ data.classes }}} nf-element" value="nf-other" {{{ ( ! data.valueFound ) ? 'checked="checked"' : '' }}}aria-labelledby="nf-label-field-{{{ data.fieldID }}}-other"
<# if( data.required ) { #>required aria-required="true"
<# } #>><label id="nf-label-field-{{{ data.fieldID }}}-other">Other
{{{ data.renderOtherText() }}}</label></li>