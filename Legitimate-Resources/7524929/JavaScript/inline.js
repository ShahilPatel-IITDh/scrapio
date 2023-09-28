
			// position input focus into first element of form
			function selectFirstFormInput() {
				$(':input[value=""]:visible:not(:button):first').first().focus();
			}

			require(uwr.config.require, ['uwr/initState'], function (initState) {
				initState.addReadyHandler(selectFirstFormInput);
			});
		