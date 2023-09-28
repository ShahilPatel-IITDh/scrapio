
	<p class="popover-header">Address Verification</p>
	<div class="document-verification-wrapper">
		<form id="document-verification-form" action="/document-verification/docverify" method="post">
			<h2>Which type of document would you like to add?</h2>
			<fieldset>
				<div class="form-line">
					<label>Choose country</label>
					<input class="country-select" type="text" name="country">
				</div>
			</fieldset>
			<fieldset>
				<div class="form-line">
					<label>Document Type:</label>
					<ul class="document-type">
					</ul>
				</div>
			</fieldset>
			<div class="error-msg"></div>
			<button class="cta big submit-document" type="submit">Submit</button>
		</form>

		<iframe allow="camera" id="net-verify-iframe" name="netverify" src=""></iframe>

		<div class="loader">
	        <picture>
	            <img src="https://static.32red.com/img/loader.svg">
	        </picture>
	    </div>
	</div>
