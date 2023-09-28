/* eslint-disable */
function getFilteredOptanonActiveGroups() {
	return getActiveGroups(OptanonActiveGroups)
}

function getActiveGroups(groups) {
	if (typeof groups === 'undefined' || !groups) {
		return []
	}

	return groups.split(',').filter(function (s) {
		return typeof s !== 'undefined' && s.toString().trim() !== ''
	})
}

function OptanonWrapper() {
	var body = document.querySelector('body')
	var bodyHeight = body.getBoundingClientRect().height
	var banner = document.querySelector('#onetrust-banner-sdk')
	var button = document.querySelector('#onetrust-pc-btn-handler')
	var container = document.querySelector('#ot-pc-content')
	var closeButton = document.querySelector('#close-pc-btn-handler')
	var cookieSettingsButtons = document.querySelectorAll('a[href="#manage-cookies"]')

	if (banner) {
		button.addEventListener('click', function () {
			banner.classList.add('is-hidden')
			container.classList.remove('ot-pc-scrollbar')
		})

		closeButton.addEventListener('click', function () {
			banner.classList.remove('is-hidden')
		})

		document.addEventListener('keydown', function (e) {
			if (banner.classList.contains('is-hidden')) {
				if (e.keyCode === 27) {
					closeButton.click()
				}
			}
		})

		banner.classList.add('is-active')
	}

	;[].forEach.call(cookieSettingsButtons, function (button) {
		button.addEventListener('click', function (e) {
			e.preventDefault()

			if (typeof Optanon !== 'undefined') {
				Optanon.ToggleInfoDisplay()
			}
		})
	})

	Optanon.OnConsentChanged(function () {
		if (window.location.pathname.indexOf('distributed2021') > -1) {
			body.style.height = bodyHeight + 'px'
		}

		if (typeof analytics !== 'undefined') {
			analytics.track('user_consent_changed', {
				activeGroups: getFilteredOptanonActiveGroups(),
			})
		}
	})
}
