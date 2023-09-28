<# if ( ! data.visible ) { return '' } #><li><input type="checkbox" id="nf-field-{{{ data.fieldID }}}-{{{ data.index }}}" name="nf-field-{{{ data.fieldID }}}" class="{{{ data.classes }}} nf-element {{{ ( data.isSelected ) ? ' nf-checked' : '' }}}" value="{{{ data.value }}}" {{{ ( data.isSelected ) ? 'checked="checked"' : '' }}}aria-labelledby="nf-label-field-{{{ data.fieldID }}}-{{{ data.index }}}"
<# if( data.required ) { #>required aria-required="true"
<# } #>><label for="nf-field-{{{ data.fieldID }}}-{{{ data.index }}}"
id="nf-label-field-{{{ data.fieldID }}}-{{{ data.index }}}"
class="{{{ ( data.isSelected ) ? 'nf-checked-label' : '' }}}">{{{ data.label }}}</label></li>