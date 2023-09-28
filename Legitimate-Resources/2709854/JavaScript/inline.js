if (mr.hasClass(document.body, 'status__user_hasNoAuth') && __PH.activeUser() && __PH.activeUser().match(/@(mail|inbox|list|bk|internet)\.ru$/)) {
					var host = window.location.host.replace(/\./g, '-')

					window.createRadar().one({
						name: 'auth-mismatch',
						time: 1,
						timers: host + ':1',
						log: window.location.host + ': ' + __PH.activeUser()
					})
				}