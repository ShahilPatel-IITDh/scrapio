
	<div class="nf-field-label"><label for="nf-field-{{{ data.id }}}"
	                                   id="nf-label-field-{{{ data.id }}}"
	                                   class="{{{ data.renderLabelClasses() }}}">{{{ data.label }}} {{{ ( 'undefined' != typeof data.required && 1 == data.required ) ? '<span class="ninja-forms-req-symbol">*</span>' : '' }}} {{{ data.maybeRenderHelp() }}}</label></div>
