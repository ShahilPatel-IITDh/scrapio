
	<div
		class="installments-wrapper"
		v-if="(price.installments && price.installments !== '' && price.installments !== 'undefined') || installments_placeholder">
		
		<div
			class="installments-value"
			v-if="price.installments && price.installments !== '' && price.installments !== 'undefined' && !installments_placeholder">
			<span
				v-html="price.installmentsFormatted"
			></span>
		</div>

		<div
			class="installments-placeholder"
			v-if="installments_placeholder">&nbsp;
		</div>
	</div>
