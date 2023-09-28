
	<# if ( ! data.visible ) { return ''; } #>
	<option value="{{{ data.value }}}" {{{ ( 1 == data.selected ) ? 'selected="selected"' : '' }}} >{{{ data.label }}}</option>
