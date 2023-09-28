
	<div class="toggler">
		<div v-if ="!horizontal_toggler" class="form-select-container">
			<div class="form-select-arrow" :class="getTogglerCssClasses()">
				<select
					class="form-select actionbox-buy-filter"
					aria-label="Select"
					:disabled="singleOption"
					@change="handleClick($event, $event.target.selectedIndex)"
					v-model="selected_value">

					<option
						v-for="(option, index) in options"
						v-bind:class="{'active':(Number(index.substring(7)) - 1 == selected_index)}"
						v-bind:value="option.toggler_text"
						selected="<% option.toggler_text == selected_value %>">
						<% option.toggler_text %>
					</option>

				</select>
			</div>
		</div>

		<div v-if="horizontal_toggler" class="js-horizontal-toggler horizontal-toggler">
			<div class="horizontal-toggler-container">
				<div
					v-for="(option, index) in options"
					class="js-toggler toggler-option"
					:class="getTogglerCssClasses(index)"
					@click="handleClick(null, Number(index.substring(7)) - 1)">
					<% option.toggler_text %>
				</div>
			</div>
		</div>
	</div>
