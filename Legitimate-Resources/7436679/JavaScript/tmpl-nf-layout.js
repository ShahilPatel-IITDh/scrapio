
	<span id="nf-form-title-{{{ data.id }}}" class="nf-form-title">
		{{{ ( 1 == data.settings.show_title ) ? '<h' + data.settings.form_title_heading_level + '>' + data.settings.title + '</h' + data.settings.form_title_heading_level + '>' : '' }}}
	</span>
	<div class="nf-form-wrap ninja-forms-form-wrap">
		<div class="nf-response-msg"></div>
		<div class="nf-debug-msg"></div>
		<div class="nf-before-form"></div>
		<div class="nf-form-layout"></div>
		<div class="nf-after-form"></div>
	</div>
