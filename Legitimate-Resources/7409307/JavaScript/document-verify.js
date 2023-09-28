
	<p class="popover-header">Document Verification</p>
<div class="document-verification-wrapper">
	<form id="document-verification-form" action="/document-verification/netverify" method="post">
		<h2>Document Verification</h2>
		<p>It needs to be an official government ID.</p>
		<fieldset>
			<div class="form-line">
				<label>Issuing country</label>
				<input class="country-select" type="text" name="country" readonly>
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
