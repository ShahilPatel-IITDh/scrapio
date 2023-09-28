
		jQuery.extend(true, XF.config, {
			// 
			userId: 0,
			enablePush: true,
			pushAppServerKey: 'BMs4uSOjLqK+kub2XVxBffR1xJkZDQZhDGv+dN9zevDOFTsYy7xeOg8U6jkPnpAD7RocOYHXvtGHgQLZAGhFX4I=',
			url: {
				fullBase: 'https://sztar.com/',
				basePath: '/',
				css: '/css.php?css=__SENTINEL__&s=1&l=2&d=1645821464',
				keepAlive: '/bejelentkezes/keep-alive'
			},
			cookie: {
				path: '/',
				domain: '',
				prefix: 'xf_',
				secure: true
			},
			cacheKey: '13c4555e8bcd4575b46a60bffef07197',
			csrf: '1689423839,ed4d22f50345e4cb6c501c01cbb26e0f',
			js: {"\/js\/bs\/lfs\/core-compiled.js?_v=eae00f01":true,"\/js\/xf\/notice.min.js?_v=eae00f01":true},
			css: {"public:node_list.less":true,"public:notices.less":true,"public:share_controls.less":true,"public:structured_list.less":true,"public:widget_live_forum_statistics.less":true,"public:extra.less":true},
			time: {
				now: 1689423839,
				today: 1689368400,
				todayDow: 6,
				tomorrow: 1689454800,
				yesterday: 1689282000,
				week: 1688850000
			},
			borderSizeFeature: '3px',
			fontAwesomeWeight: 'r',
			enableRtnProtect: true,
			
			enableFormSubmitSticky: true,
			uploadMaxFilesize: 104857600,
			allowedVideoExtensions: ["m4v","mov","mp4","mp4v","mpeg","mpg","ogv","webm"],
			allowedAudioExtensions: ["mp3","opus","ogg","wav"],
			shortcodeToEmoji: true,
			visitorCounts: {
				conversations_unread: '0',
				alerts_unviewed: '0',
				total_unread: '0',
				title_count: true,
				icon_indicator: true
			},
			jsState: {},
			publicMetadataLogoUrl: '',
			publicPushBadgeUrl: 'https://sztar.com/styles/default/xenforo/bell.png'
		});

		jQuery.extend(XF.phrases, {
			// 
			date_x_at_time_y: "{date}, {time}",
			day_x_at_time_y:  "{day}, {time}",
			yesterday_at_x:   "Tegnap {time}-kor",
			x_minutes_ago:    "{minutes} perccel ezelőtt",
			one_minute_ago:   "1 perccel ezelőtt",
			a_moment_ago:     "pillanatokkal ezelőtt",
			today_at_x:       "Ma {time} -kor",
			in_a_moment:      "Egy pillanat alatt",
			in_a_minute:      "Egy perc",
			in_x_minutes:     "{minutes} perc múlva",
			later_today_at_x: "Később ma {time}",
			tomorrow_at_x:    "Holnap {time} időpontban",

			day0: "Vasárnap",
			day1: "Hétfő",
			day2: "Kedd",
			day3: "Szerda",
			day4: "Csütörtök",
			day5: "Péntek",
			day6: "Szombat",

			dayShort0: "V",
			dayShort1: "H",
			dayShort2: "K",
			dayShort3: "Sze",
			dayShort4: "Cs",
			dayShort5: "P",
			dayShort6: "Szo",

			month0: "Január",
			month1: "Február",
			month2: "Március",
			month3: "Április",
			month4: "Május",
			month5: "Június",
			month6: "Július",
			month7: "Augusztus",
			month8: "Szeptember",
			month9: "Október",
			month10: "November",
			month11: "December",

			active_user_changed_reload_page: "Az aktív felhasználó megváltozott. Töltse be újra az oldalt a legújabb verzióhoz.",
			server_did_not_respond_in_time_try_again: "A szerver nem válaszolt időben. Kérlek próbáld újra.",
			oops_we_ran_into_some_problems: "Hoppá! Bizonyos problémákba ütköztünk.",
			oops_we_ran_into_some_problems_more_details_console: "Hoppá! Bizonyos problémákba ütköztünk. Kérlek, próbáld újra később. A böngésző konzolban több hiba adható meg.",
			file_too_large_to_upload: "A fájl túl nagy ahhoz, hogy feltölthető legyen.",
			uploaded_file_is_too_large_for_server_to_process: "The uploaded file is too large for the server to process.",
			files_being_uploaded_are_you_sure: "A fájlok még mindig feltöltésre kerülnek. Biztosan be kívánja küldeni ezt az űrlapot?",
			attach: "Fájlok csatolása",
			rich_text_box: "Gazdag szövegdoboz",
			close: "Bezárás",
			link_copied_to_clipboard: "Link a vágólapra másolt.",
			text_copied_to_clipboard: "Text copied to clipboard.",
			loading: "Betöltés…",
			you_have_exceeded_maximum_number_of_selectable_items: "You have exceeded the maximum number of selectable items.",

			processing: "Feldolgozás",
			'processing...': "Feldolgozás…",

			showing_x_of_y_items: "{count} az összesen {total} elemből",
			showing_all_items: "Az összes elem megjelenítése",
			no_items_to_display: "Nincs megjelenítendő elem",

			number_button_up: "Increase",
			number_button_down: "Decrease",

			push_enable_notification_title: "Push notifications enabled successfully at Sztar.com - Magyarország Legnagyobb Sztárfóruma - The Largest Hungarian Celebrity Community",
			push_enable_notification_body: "Thank you for enabling push notifications!"
		,
			"svStandardLib_time.day": "{count} day",
			"svStandardLib_time.days": "{count} days",
			"svStandardLib_time.hour": "{count} hour",
			"svStandardLib_time.hours": "{count} hours",
			"svStandardLib_time.minute": "{count} perc",
			"svStandardLib_time.minutes": "{count} perc",
			"svStandardLib_time.month": "{count} month",
			"svStandardLib_time.months": "{count} hónapja",
			"svStandardLib_time.second": "{count} second",
			"svStandardLib_time.seconds": "{count} másodperc",
			"svStandardLib_time.week": "time.week",
			"svStandardLib_time.weeks": "{count} weeks",
			"svStandardLib_time.year": "{count} year",
			"svStandardLib_time.years": "{count} éve"

		});
	