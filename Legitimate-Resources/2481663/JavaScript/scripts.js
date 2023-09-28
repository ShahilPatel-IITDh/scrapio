$(document).ready(()=> {
	const current = window.location;
	document.cookie = `WPS_LGURI=${current.href};domain=.wallpapers.com;path=/`;
	var btn = $('#scrollBtn'),
		navbar = $('nav.navgation .navbar'),
		search = $('#searchArea'),
		searchm = $('#msearchbtn'),
		searchInput = $('.header-search'),
		searchInputm = $('.msearch'),
		searchImages = $('.search-images'),
		menu = $('header .navbar-switch'),
		loginButton = $('.front-login-button'),// login button desktop, mobile menu share with this
		signupButton = $('.front-signup-button'), // sign up button desktop, mobile menu share wtih this
		resetButton = $('.front-reset-password'),
		closeButton = $('.close-modal'),
		loginSubmitButton = $('.front-login-submit-button'),
		logoutSubmitButton = $('.front-logout-submit-button'),
		signupSubmitButton = $('.front-signup-submit-button'),
		resetSubmitButton = $('.front-reset-submit-button'),
		nextStep = $('.next-step-button'),
		showPasswordButton = $('.show-pass-button'),
		inputFile = $('input[type=file]'),
		cancelSubmitButton = $('.cancel-submit-button'),
		submitphotosButton = $('.submit-photos-button'),
		uploadActionArea = $('.upload-action'),
		searchResultsButton = $('.search-results-button'),
		bigSearchInput = $('#big-search'),
		smallSearchBtn = $('#small-search'),
		files = [],
		searchAutocomplete = [],
		 topKeywords = [
			"Animal",
			"Anime",
			"Background",
			"Brand",
			"Car",
			"Cartoon",
			"Color",
			"Device",
			"Disney",
			"Fantasy",
			"Flower",
			"Gaming",
			"Holiday",
			"Horror",
			"Movie",
			"Music",
			"Nature",
			"Religious",
			"Space",
			"Sports",
			"Superhero",
			"Travel",
			"Tv Shows",
			"Others",
			"Celebrities"
		];
	var isEnableLoginAndDownloadFeature = true;

	function preventDefaults(e) {
		e.preventDefault()
		e.stopPropagation()
	}


	if(isEnableLoginAndDownloadFeature){
		function createCookie(name, value, days) {
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				var expires = "; expires=" + date.toGMTString();
			}
			else {
				var expires = "";
			}
			var parts = location.hostname.split('.');
			var sndleveldomain = parts.slice(-2).join('.');
			document.cookie = name + "=" + value + expires + "; domain=." + sndleveldomain + "; path=/";
		}
		function readCookie(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
			}
			return null;
		}
		function eraseCookie(name) {
			createCookie(name, "", -1);
		}
		function parseJwt (token) {
			var base64Url = token.split('.')[1];
			var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join(''));

			return JSON.parse(jsonPayload);
		}


		function downloadByDownloadId(refElement,downloadId){
			if(refElement.attr("href")){
				var downloadAnchor = $(document.createElement('a'));
				let href = refElement.attr("href");
// 				if(downloadId) {
// 					document.cookie = `download_id=${downloadId};domain=.wallpapers.com;path=/`;
// 					href += ("?downloadId=" + downloadId);
// 				}
				downloadAnchor.attr("href",href);
				downloadAnchor.attr("download",refElement.attr("download"));
				downloadAnchor.get(0).click();
				downloadAnchor.remove();
			}else{
				console.debug("download link not found.")
			}
		}

		var token = readCookie('user_token')
		if (token) {
			menu.css('padding', '0 0.5rem 0 0');
			var folderContent = []
			var folderModal = $('<div class="modal fade" id="collectionModal" tabindex="-1" role="dialog" aria-labelledby="collectionModal" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-body"><strong>Add to Folder</strong><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button><div><form class="collection-create-form input-group"><input name="collectionName" class="form-control collectionName" placeholder="Create a new folder"><input type="submit" class="form-control" value="Add Folder"></form></div><div><ul class="collection-items-gp"></ul></div></div></div></div></div>')

			function setFolderCheckboxChange(url, checkedOptions) {
				if (!checkedOptions) checkedOptions = [];
				if (checkedOptions.length && checkedOptions.indexOf($(this).prop('name')) > -1) {
					$(this).prop('checked', true)
				}
				var anchorId = url.split('.html')[0].split('-').pop()
				$(this).change(function(e) {
					$(this).prop('disabled', true)
					var self = this
					if(e.target.checked) {
						$.ajax({
							type: 'POST',
							url: 'https://login.wallpapers.com/v1/customer/collectionItem',
							xhrFields: {
								withCredentials: true
							},
							data :{
								collectionSlug : $(self).prop('name'),
								url: url
							},
							success: function(res) {
								fetchAndSetCollection()
							},
							complete: function() {
								$(self).removeAttr("disabled");
							}
						});
					} else {
						$.ajax({
							type: 'DELETE',
							url: 'https://login.wallpapers.com/v1/customer/collectionItem/' + $(self).prop('name') + '/' + anchorId,
							xhrFields: {
								withCredentials: true
							},
							success: function(res) {
								fetchAndSetCollection()
							},
							complete: function() {
								$(self).removeAttr("disabled");
							}
						});
					}
				});
			}
			var getModal = function (url, checkedOptions) {
				if (!checkedOptions) checkedOptions = [];
				var modal = folderModal.clone()
				modal.find('.collection-items-gp input[type=checkbox]').each(function() {
					setFolderCheckboxChange.call(this, url, checkedOptions)
				})

				modal.find('form.collection-create-form').submit(function(e) {
					e.preventDefault()
					var self = this
					$(self).find('input[type=submit]').attr('disabled', true)
					var name = $(this).find('input[name=collectionName]').val()
					$.ajax({
						type: 'POST',
						url: 'https://login.wallpapers.com/v1/customer/collection',
						xhrFields: {
							withCredentials: true
						},
						data :{
							name: name
						},
						success: function (response) {
							$(self).find('input[name=collectionName]').val('')
							var slug = response.payload.slug
							var collectionEle = $('<li><label for="collection-' + slug + '">' + name + '</label><input type="checkbox" name="' + slug + '" id="collection-' + slug + '"></li>')
							setFolderCheckboxChange.call(collectionEle.find('input[type=checkbox]'), url)
							$(self).closest('.modal-body').find('.collection-items-gp').append(collectionEle)
							fetchAndSetCollection()
						},
						error: function (xhr, status, error) {
							console.debug(error);
						},
						complete: function() {
							$(self).find('input[type=submit]').removeAttr("disabled");
						}
					});
				})
				modal.modal({
					show: false
				}).on('hidden.bs.modal', function (e) {
					$(this).modal('dispose')
					$(this).remove()
				})
				return modal
			}
			var folderCallback = function (folderContent, force) {
				if (!folderContent) folderContent = {};
				var contentList = $(".content-card:not(.endpoint):not(.ad-unit)");
				contentList.each(function(){
					$(this).css("position","relative")
					var currentLink = $(this).find("a").attr("href");
					if (!currentLink) {
						return
					}
					var anchorId = currentLink.split('.html')[0].split('-').pop()
					var folderButton = $(`<a class="folder-icon folder-btn"><svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'><style type='text/css'>.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#fff;}</style><path class='st1' d='M16.3,19H3.7c-1.8,0-3.2-1.5-3.2-3.3V5.8c0,0,0,0,0,0v-4C0.5,1.4,0.8,1,1.2,1h5.7c0.2,0,0.4,0.1,0.5,0.3L10.7,5 h5.6c1.8,0,3.2,1.5,3.2,3.3v7.4C19.5,17.5,18.1,19,16.3,19z M6.5,3h-4v2l0,0h5.3L6.5,3z M17.5,8c0-0.9-0.1-1-1-1h-5.7c0,0,0,0,0,0 H2.5v9c0,0.9,0.1,1,1,1h13c0.9,0,1-0.1,1-1V8z'/></svg></a>`)
					var collectionItems = folderContent[anchorId]
					if (collectionItems) {
						folderButton.data('collectionItems', collectionItems.map(function(item) {
							return item.collectionSlug
						}))
					}
					folderButton.click(function(e){
						e.preventDefault();
						getModal($(this).closest('.content-card').find('figure a').attr('href'), $(this).data('collectionItems')).modal('show');
					})
					if (force) {
						$(this).find(".folder-btn").remove()
					}
					if ( (!$(this).find(".folder-btn").length) && ($(this).find("a").attr("href") && $(this).find("a").attr("href").includes('.html')) ) {
						$(this).append(folderButton);
					}
				})
				if ($('button.folder-btn').length) {
					var anchorId = window.location.href.split('.html')[0].split('-').pop();
					var collectionItems = folderContent[anchorId];
					if (collectionItems) {
						$('button.folder-btn').addClass("disabled");
					} else {
						$('button.folder-btn').removeClass("disabled");
					}
				}

				if ($('button.folder-btn').length && !$('button.folder-btn').data('hasSetCollectionModal') || force) {
					var currentLink = window.location.href;
					var anchorId = currentLink.split('.html')[0].split('-').pop()
					var collectionItems = folderContent[anchorId] || []
					if (force) {
						$('button.folder-btn').off('click')
					}
					$('button.folder-btn').click(function (e) {
						e.preventDefault();
						getModal(currentLink, collectionItems.map(function(item) {
							return item.collectionSlug
						})).modal('show');
					})
					$('button.folder-btn').data('hasSetCollectionModal', true)
				}
			};
			function fetchAndSetCollection() {
				var hasRunCallback = false;
				$.ajax({
					type : 'GET',
					url : 'https://login.wallpapers.com/v1/customer/collectionByUrl',
					xhrFields: {
						withCredentials: true
					},
					success:function (res){
						folderModal.find('.collection-items-gp').empty()
						res.payload.collections.forEach(function(collection) {
							var slug = collection.slug
							var name = collection.name
							var collectionEle = $('<li><label for="collection-' + slug + '">' + name + '</label><input type="checkbox" name="' + slug + '" id="collection-' + slug + '"></li>')
							folderModal.find('.collection-items-gp').append(collectionEle)
						});
						folderCallback(res.payload.data, true);
						hasRunCallback = true;
					},
					error : function (xhr, status, error) {
						console.debug(error);
					},
					complete: function () {
						if (!hasRunCallback) {
							folderCallback({});
						}
					}
				})
			}
			fetchAndSetCollection()

			var favoriteCallback = function (favImg) {
				var contentList = $(".content-card:not(.endpoint):not(.ad-unit)");
				contentList.each(function(){
					var currentLink = $(this).find("a").attr("href");
					if (!currentLink) {
						return
					}
					var anchorId = currentLink.split('.html')[0].split('-').pop()
					var isNotFav = favImg.indexOf(anchorId) == -1;
					var heartButton = $(`<span class="fav-btn${isNotFav?"":" is-fav"}">
												<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="enable-background:new 0 0 20 17" viewBox="0 0 20 17"><path d="M10 16c-.2 0-.3-.1-.4-.2L3.3 9.9c-.1 0-.2-.1-.3-.2-.1-.1-.3-.3-.5-.6-.3-.3-.5-.7-.7-1l-.6-1.2C1.1 6.5 1 6 1 5.6c-.1-1.3.4-2.5 1.3-3.4C3.3 1.3 4.5.9 5.8 1c.4 0 .9.1 1.3.2s.8.3 1.2.6c.4.2.7.4.9.6.3.2.6.5.8.7.2-.2.5-.5.8-.7.3-.2.6-.4 1-.7l1.2-.6c.3 0 .8-.1 1.2-.1 1.3-.1 2.6.4 3.5 1.2.9.9 1.3 2.1 1.3 3.4 0 1.4-.8 2.9-2.3 4.4l-6.3 5.9c-.1.1-.2.1-.4.1z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#fff"/></svg>
											</span>`)
					heartButton.click(function(e){
						e.preventDefault();
						if($(this).attr("disabled")){
							return;
						}
						$(this).attr("disabled",true);
						try{
							if(!$(this).hasClass('disabled')){
								$.ajax({
									type: 'POST',
									url: 'https://login.wallpapers.com/v1/customer/favorite',
									xhrFields: {
										withCredentials: true
									},
									data :{
										url : currentLink
									},
									success: function (response) {
										$(e.currentTarget).addClass("disabled").addClass("is-fav");
										$(e.currentTarget).removeAttr("disabled");
									},
									error: function (xhr, status, error) {
										$(e.currentTarget).removeAttr("disabled");
										console.debug(error);
									}
								});
							}else{
								$.ajax({
									type: 'DELETE',
									url: 'https://login.wallpapers.com/v1/customer/favorite/' + currentLink.split("/").pop(),
									xhrFields: {
										withCredentials: true
									},
									success: function (response) {
										$(e.currentTarget).removeClass("disabled").removeClass("is-fav");
										$(e.currentTarget).removeAttr("disabled");
									},
									error: function (xhr, status, error) {
										$(e.currentTarget).removeAttr("disabled");
										console.debug(error);
									}
								});
							}
						}catch(err){
							$(this).removeAttr("disabled");
						}
					})
					if ( (!$(this).find(".fav-btn").length) && ($(this).find("a").attr("href") && $(this).find("a").attr("href").includes('.html')) ) {
						$(this).append(heartButton);
					}
					if (!isNotFav) {
						$(this).find("span.fav-btn").addClass("disabled");
					}
				})
			};
			var hasRunCallback = false
			$.ajax({
				type : 'GET',
				url : 'https://login.wallpapers.com/v1/customer/favorite',
				xhrFields: {
					withCredentials: true
				},
				success:function (res){
					var userFav = res.payload.data.map((dat)=>dat.slug);
					userFavImg = userFav;
					favoriteCallback(userFavImg);
					hasRunCallback = true;
				},
				error : function (xhr, status, error) {
					console.debug(error);
				},
				complete: function () {
					if (!hasRunCallback) {
						favoriteCallback([]);
					}
				}
			})
			function refreshToken() {
				$.ajax({
					type: 'POST',
					url: 'https://login.wallpapers.com/v1/token/refresh',
					xhrFields: {
						withCredentials: true
					},
					error: function (xhr, status, error) {
						if (xhr.status == 401) {
							$.ajax({
								type : "GET",
								url : "https://login.wallpapers.com/customer/logout",
								xhrFields: {
									withCredentials: true
								},
								headers:{
									'x-requested-with': "XMLHttpRequest"
								},
								success : function(e){
									window.location.reload();
								},
								error : function(e){
									console.debug(e);
								}
							})
						}
					}
				});
			}

			var refresh = setInterval(refreshToken, 15 * 60 * 1000);

			var userData = parseJwt(token)
			window.username = userData.username;
			var contributor = $('.contributor')
			var loginBtns = $('#navbarMainContent .front-signup-button, #navbarMainContent .front-login-button')
			var loginLink = $('#navbarMainContent .front-login-button')
			var menuDivider = $('.menu-divider');
			var userBtn = $('.user-profile');
			var userDisplayName = $('.user-display-name');
			var userDisplayId = $('.user-display-id');

			userDisplayName.text(userData.name);
			userDisplayId.text('@' + userData.username);

			var mobileUserBtn = userBtn.clone();

			mobileUserBtn.addClass('d-sm-block d-md-none');
			mobileUserBtn.removeClass('d-none');
			$("main.wallpaper .content-row .container .content-container .kw-contents .content-card, main.background .content-row .container .content-container .kw-contents .content-card, main.pictures .content-row .container .content-container .kw-contents .content-card").each(function(){
				$(this).css("position","relative");
			})

			$(".sticky-top .search-block").after(mobileUserBtn);

			$('.sticky-top .dropdown-toggle').on('click', function(e) {
				const _window = $(window);
				if (_window.width() < 750) {
					e.preventDefault();
					$('.sticky-top .dropdown-menu').attr('style','width:100vw !important');
					$('.sticky-top .dropdown-item').attr('style','padding:0.5rem 1.5rem !important');

					if ($('nav.navgation .navbar').hasClass('show')){
						navbar.removeClass('show');
					}
				}
			});

			userBtn.addClass('d-md-block');
			contributor.addClass('d-md-block');
			loginBtns.addClass('d-none');
			loginBtns.removeClass('d-sm-block d-md-block')
			menuDivider.addClass('d-none');
			loginLink.removeClass('d-sm-block d-md-block')


			$("body").addClass("member");

			//content page like button
			if ($( "body" ).hasClass("single") || $( "body" ).hasClass("single-background") || $( "body" ).hasClass("single-picture") || $('.download-block').length) {
				var userSegmentButton = $('<button type="button" class="btn follow-btn d-none">Follow</button><button type="button" class="btn like-btn"><i class="icon icon-like"></i><span class="d-none d-xl-block">Like</span></button><button type="button" class="btn folder-btn"><i class="icon icon-folder"></i><span class="d-none d-xl-block">Folder</span></button>')
				var folderBtn = $(userSegmentButton).find('.folder-btn')
				folderBtn.click(function (e) {
					getModal($(this).closest('.content-card').find('figure a').attr('href'), $(this).data('collectionItems')).modal('show');
				})
				$( ".segmented-user-button" ).append(userSegmentButton );
				var userFavImg = []
				var contentPageFavoriteCallback = function (userFavImg) {
					var match = window.location.href.match(/https:\/\/.*\/.*-([a-zA-Z0-9]+)\.html/)
					if (!match || !match.length) {
						return
					}
					var imgSlug = match[1];
					var FavContent = userFavImg.indexOf(imgSlug) !== -1;
					if (FavContent) {
						$('.btn.like-btn').addClass("disabled");
						$('.btn.like-btn span').html('Liked');
					}
					$(".like-btn").click(function(e){
						e.preventDefault();
						// call api for favorite
						try {
							if(!$('.btn.like-btn').hasClass("disabled")){
								$.ajax({
									type: 'POST',
									url: 'https://login.wallpapers.com/v1/customer/favorite',
									xhrFields: {
										withCredentials: true
									},
									data :{
										url : window.location.href,
									},
									success: function (response) {
										$(e.currentTarget).addClass("disabled");
										$('.btn.like-btn span').html('Liked');
									},
									error: function (xhr, status, error) {
										console.debug(error);
									}
								});
							} else {
								$.ajax({
									type: 'DELETE',
									url: 'https://login.wallpapers.com/v1/customer/favorite/' + window.location.pathname.split("/").pop(),
									xhrFields: {
										withCredentials: true
									},
									success: function (response) {
										$(e.currentTarget).removeClass("disabled");
										$('.btn.like-btn span').html('Like');
									},
									error: function (xhr, status, error) {
										console.debug(error);
									}
								});
							}
						} catch(err){
							console.debug(err);
							$(this).removeClass("disabled");
						}
					});
				}
				$.ajax({
					type : 'GET',
					url : 'https://login.wallpapers.com/v1/customer/favorite',
					xhrFields: {
						withCredentials: true
					},
					success:function (res){
						var userFav = res.payload.data.map((dat)=>dat.slug);
						userFavImg = userFav;
						contentPageFavoriteCallback(userFavImg);
					},
					error : function (xhr, status, error) {
						console.debug(error);
					},
					complete: function () {
						contentPageFavoriteCallback([]);
					}
				});
			}
			setTimeout(refreshToken, 10000);
		}		

		else{
			var displayDesktopLoginModal = function(){
				$(".menu-item .front-login-button").click()
			}

			var contentList = $(".content-card:not(.endpoint)");
			contentList.each(function(){
				var currentLink = $(this).find("a").attr("href");
				var heartButton = $(`<span style="width:34px;height:34px" class="fav-btn">
												<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="enable-background:new 0 0 20 17" viewBox="0 0 20 17"><path d="M10 16c-.2 0-.3-.1-.4-.2L3.3 9.9c-.1 0-.2-.1-.3-.2-.1-.1-.3-.3-.5-.6-.3-.3-.5-.7-.7-1l-.6-1.2C1.1 6.5 1 6 1 5.6c-.1-1.3.4-2.5 1.3-3.4C3.3 1.3 4.5.9 5.8 1c.4 0 .9.1 1.3.2s.8.3 1.2.6c.4.2.7.4.9.6.3.2.6.5.8.7.2-.2.5-.5.8-.7.3-.2.6-.4 1-.7l1.2-.6c.3 0 .8-.1 1.2-.1 1.3-.1 2.6.4 3.5 1.2.9.9 1.3 2.1 1.3 3.4 0 1.4-.8 2.9-2.3 4.4l-6.3 5.9c-.1.1-.2.1-.4.1z" style="fill-rule:evenodd;clip-rule:evenodd;fill:#fff"/></svg>
											</span>`)
				var folderButton = $(`<span style="width:34px;height:34px" class="folder-icon folder-btn"><svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 20 20' style='enable-background:new 0 0 20 20;' xml:space='preserve'><style type='text/css'>.st0{fill-rule:evenodd;clip-rule:evenodd;fill:#fff;}</style><path class='st1' d='M16.3,19H3.7c-1.8,0-3.2-1.5-3.2-3.3V5.8c0,0,0,0,0,0v-4C0.5,1.4,0.8,1,1.2,1h5.7c0.2,0,0.4,0.1,0.5,0.3L10.7,5 h5.6c1.8,0,3.2,1.5,3.2,3.3v7.4C19.5,17.5,18.1,19,16.3,19z M6.5,3h-4v2l0,0h5.3L6.5,3z M17.5,8c0-0.9-0.1-1-1-1h-5.7c0,0,0,0,0,0 H2.5v9c0,0.9,0.1,1,1,1h13c0.9,0,1-0.1,1-1V8z'/></svg></span>`)
				folderButton.click(function(e){
					e.preventDefault();
					location.href = 'https://login.wallpapers.com/premium/login'
				})
				heartButton.click(function(e){
					e.preventDefault();
					createCookie('WPS_FVURI', currentLink)
					location.href = 'https://login.wallpapers.com/premium/login'
				})
				if ( (!$(this).find(".fav-btn").length) && ($(this).find("a").attr("href") && $(this).find("a").attr("href").includes('.html')) ) {
					if($(this).find("figure").length){
						// $(this).find("figure").css("width","auto");
						$(this).find("figure").append(heartButton)
					}else{
						$(this).append(heartButton);
					}
				}

				if ( (!$(this).find(".folder-btn").length) && ($(this).find("a").attr("href") && $(this).find("a").attr("href").includes('.html')) ) {
					if($(this).find("figure").length){
						// $(this).find("figure").css("width","auto");
						$(this).find("figure").append(folderButton);
					}else{
						$(this).append(folderButton)
					}
				}
			})
			//content page like button
			if ($( "body" ).hasClass("single") || $( "body" ).hasClass("single-background") || $( "body" ).hasClass("single-picture") || $('.download-block').length) {
				var userSegmentButton = $('<button type="button" class="btn follow-btn d-none">Follow</button><button type="button" class="btn like-btn"><i class="icon icon-like"></i><span class="d-none d-xl-block">Like</span></button><button type="button" class="btn folder-btn"><i class="icon icon-folder"></i><span class="d-none d-xl-block">Folder</span></button>')
				$( ".segmented-user-button" ).append(userSegmentButton );
				$(".folder-btn").click(function(e){
					e.preventDefault();
					location.href = 'https://login.wallpapers.com/premium/login'
				});
				$(".like-btn").click(function(e){
					e.preventDefault();
					createCookie('WPS_FVURI', window.location.href)
					location.href = 'https://login.wallpapers.com/premium/login'
				});
			}
		}
		
		$('div.download-block.dropdown a.download-item').click(function (event) {
			event.preventDefault();
			// member flow
			if(token){
				try {
					var bodyClassList = $("body").attr("class")
					var postId = /postid-(\d+)/.exec(bodyClassList)
					if(postId && postId.length > 0){
						postId = postId[1]
					}
					var title = $(".container h1").text() || "";
					var author = ''
					if($(".user-block > div:nth-child(2)")){
						author = $(".user-block > div:nth-child(2)")[0].childNodes[0].nodeValue.trim()
					};
					var author_nickname = $(".nickname").text().trim() || "";
					var license = ""
					if($(".op-panel div:contains(License type)") && $(".op-panel div:contains(License type)").next()){
						license = $(".op-panel div:contains(License type)").next().text()
					};
					$.ajax({
						type: 'POST',
						url: 'https://login.wallpapers.com/validate',
						xhrFields: {
							withCredentials: true
						},
						data :{
							title,
							author,
							author_nickname,
							license,
							url: window.location.href
						},
						success: function (response) {
							var targetDownloadId = response.timestamp + "~hmac=" + response.token;
							downloadByDownloadId($(event.currentTarget),targetDownloadId);
						},
						error: function (xhr, status, error) {
							// Handle error situations, such as incorrect username or password
							console.debug(error);
							downloadByDownloadId($(event.currentTarget),window.downloadId);
						}
					});
				} catch (err) {
					// trigger when $.ajax cannot be execute, such as $ is not defined
					downloadByDownloadId($(this),window.downloadId);
					console.debug(err)
				}
			}
			// guest flow

			else{
					downloadByDownloadId($(this),window.downloadId);
			}
		});
		
		$('.single.download #download-resized-image').click(function (event) {
			// member flow
			if(token){
				try {
					$.ajax({
						type: 'POST',
						url: 'https://login.wallpapers.com/validate',
						xhrFields: {
							withCredentials: true
						},
						data :{
							title: $(this).data('title'),
							author: $(this).data('author'),
							author_nickname: $(this).data('nickname'),
							license: $(this).data('license'),
							url: window.location.href
						}
					});
				} catch (err) {
				}
			}
		});

	}

	$(window).scroll(function() {
	  if ($(window).scrollTop() > 300) {
		btn.removeClass('d-none');
	  } else {
		btn.addClass('d-none');
	  }
	});

	btn.on('click', function(e) {
	  e.preventDefault();
	  $('html, body').animate({scrollTop:0}, '300');
	});

	smallSearchBtn.on("click", function (e) {
		e.preventDefault();
		const searchEle = document.getElementById("big-search")
		const query = searchEle.value;
		if(searchEle.dataset.kw){
			window.location.href = searchEle.dataset.kw;
		}else if (query && query.length > 0) {
			window.location = "/search/" + query;
		}

	});

	search.on('click', function(e) {
		 e.stopPropagation()
		 if(!search.hasClass("is-active")){
			search.addClass("is-active")
			searchInput.focus();
			return
		}
		if(search.hasClass("is-active")){
			searchInput.focus();
			const query = $(".search-input-box").val();
			if(query && query.length > 0) {
				window.location = "/search/" + query;
			}
			return
		}
	})

	searchm.on('click', function(e){
		e.stopPropagation()
		const query = searchInputm.val();
		if(query && query.length > 0) {
			window.location = "/search/" + query;
		}
		//searchInputm.toggleClass('show');

// 		if(!searchm.hasClass('is-active')) {
// 			searchInputm.addClass("show")
// 			searchm.addClass("is-active")
// 			searchInputm.focus();
// 			return
// 		}
// 		if(searchm.hasClass("is-active")){
// 			searchInputm.focus();
// 			window.location = "/search/" + searchInputm.val()
// 			return
// 		}
	})

// 	searchInput.on("click",function(e){
// 		searchImages.removeClass('active');
// 	})

	$(document).on("click", function(e){
		if (!searchInputm.is(e.target) && !searchInputm.has(e.target).length) {
			document.getElementById("headerSearch").value = ""
// 			searchImages.addClass('active');
		}
	})

	function sendToSearchPage(e) {
		if(e.keyCode === 13) {
			const query = e.target.value;
			if(e.target.dataset.kw){
				window.location.href = e.target.dataset.kw;
			}else if(query && query.length>0) {
				window.location = '/search/' + query;
			}
		}
	}

	bigSearchInput.on('keypress', sendToSearchPage);
	searchInput.on('keypress', sendToSearchPage)

	$(document).on("click", function(e) {
		if ((!searchInput.is(e.target) && !searchInput.has(e.target).length) ) {
			searchInput.val("");
			search.removeClass("is-active")
			searchm.removeClass("is-active")
			return
	}
	});

	function getSoruce(q, result) {
		let query = q.term;
		$.ajax({
			url: epas.endpointUrl,
			type: 'POST',
			dataType: 'json',
			contentType: "application/json",
			crossDomain: true,
			data: JSON.stringify({
				"_source": ["name", "slug"],
				"suggest":{
					"words": {
						"prefix": query,
						"completion": {
							"field": "name.suggest",
							"skip_duplicates": true
						}
					}
				}
			})
		}).then(function (data) {
			var searchAutocompleteList = [];
			var suggestions = data.suggest.words[0].options;
			$.each(suggestions, function (i, item) {
				searchAutocompleteList.push({label: item.text, url: '/' + item._source.slug});
			});
			result($.map(searchAutocompleteList, function (item) {
				return item;
			}));
		});
	}

	const autoCompleteParams = {
		source: getSoruce,
		select: function(e, ui) {
			window.location = ui.item.url;
		}
	}

	function renderItem(ul, item) {
		return $("<li></li>")
			.data("item.autocomplete", item)
			.append($("<a href='#'>" + item.label + "</a>").html(item.label))
			.appendTo(ul);
	}

	$(".search-autocomplete").each(function(){
		let searchTimer;
		const autoCompleteField = $(this).get(0);

		const awesomplete = new Awesomplete(autoCompleteField, {
			list: [],
			minChars: 3,
			replace: function (suggestion) {
				this.input.value = suggestion.label
			}
		})
		autoCompleteField.addEventListener("input", (event) => {
			clearTimeout(searchTimer);
			const inputText = event.target.value;
			if(inputText.length >= 3){
				searchTimer = setTimeout(() => {
					$.ajax({
						url: epas.endpointUrl,
						type: 'POST',
						dataType: 'json',
						contentType: "application/json",
						crossDomain: true,
						data: JSON.stringify({
							"_source": ["name", "slug"],
							"suggest": {
								"words": {
									"prefix": inputText,
									"completion": {
										"field": "name.suggest",
										"skip_duplicates": true
									}
								}
							}
						}),
						success : function(data){
							var suggestions = data.suggest.words[0].options;
							const testlist = suggestions.map((sug) => ({ label: sug.text, value: '/' + sug._source.slug }))

							const matchPattern = '^' + inputText + '\s*$';
							const regExpPattern =new RegExp(matchPattern , 'i');
							const exactMatchWording = testlist.some( data => regExpPattern.test(data.label));

							awesomplete.list = testlist;
							const isMatchedSuggest = testlist.find((sug)=>sug.label.toLowerCase() === inputText.toLowerCase())
							if(isMatchedSuggest){
								event.target.dataset.kw = isMatchedSuggest.value
							}else{
								event.target.dataset.kw = "";
							}
							awesomplete.evaluate();
						}
					});
				}, 300);
			}else{
				event.target.dataset.kw = "";
			}
			if(inputText.length === 0){
				awesomplete.list=[];
			}
		})
		autoCompleteField.addEventListener('awesomplete-selectcomplete',function(e){
			window.location.href = e.text.value;
		});
	})


	/* END SEARCH BOX */

	/* SUB MENU */

	menu.on('click', function(e) {
		const _window = $(window);
		if (_window.width() < 750) {
			e.preventDefault();
			const _wrapper = $('.sub-menu-mobile');
// 			_wrapper.css('height', _window.height() - 112);
// 			_wrapper.css('display', 'block');
// 			 const content = $(".sub-menu-wrapper").html();
// 			$('.sub-menu-mobile-wrap .submenu-wrap').css('height', '100%');
// 			$('.sub-menu-mobile-wrap .submenu-wrap .submenu-content').html(content);
			if (navbar.hasClass('show')){
				navbar.removeClass('show');
			} else {
				navbar.addClass('show');
			}
			$('.sub-menu-mobile').removeClass('show');
		}
	});
	
		$(".title-cat").click(function (){
		const content = $(".sub-menu-wrapper .sub-menu-unit > ul.navbar-mobile").clone();
		$(".close-submenu > #sub-menu-title").html("Wallpapers Catergories")
		$(".sub-menu-mobile-wrap .submenu-wrap .submenu-content").html($("<div />").append(content[0]).html())
		$('.sub-menu-mobile-wrap').toggleClass('show');
	})
	$(".title-trend").click(function (){
		const content = $(".sub-menu-wrapper .sub-menu-unit > ul.navbar-mobile").clone();
		$(".close-submenu > #sub-menu-title").html("Trending Now")
		$(".sub-menu-mobile-wrap .submenu-wrap .submenu-content").html($("<div />").append(content[1]).html())
		$('.sub-menu-mobile-wrap').toggleClass('show');
	})
	$(".title-res").click(function (){
		const content = $(".sub-menu-wrapper .sub-menu-unit > ul.navbar-mobile").clone();
		$(".close-submenu > #sub-menu-title").html("Resolution")
		$(".sub-menu-mobile-wrap .submenu-wrap .submenu-content").html($("<div />").append(content[2]).html())
		$('.sub-menu-mobile-wrap').toggleClass('show');
	})

	$(".menu-item.menu-item-link.menu-item-has-children.sub-item.align-items-start").click(function(e){
		e.preventDefault();
		if ($(this).find(".menu-item-link").hasClass('show')){
			// $(this).css("padding","0 1em");
			$(this).find(".menu-item-link").removeClass('show');
		} else {
			// $(this).css("padding","0!important");
			$(this).find(".menu-item-link").addClass('show');
		}
	})


	let activeSubmenu = '.sub-menu-cat';

// 	$(document).on('mouseover', '.sub-menu-wrapper .navbar-title', function (e) {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		if (activeSubmenu !== '') {
// 			$(activeSubmenu  + '.navbar-title').removeClass('active');
// 			$(activeSubmenu  + '.sub-menu-unit').removeClass('active');
// 			$(activeSubmenu + '.sub-menu-unit').addClass('d-none');
// 		}
// 		activeSubmenu = '.' + $(this).attr('class').split(' ')[1];
// 		$(activeSubmenu  + '.navbar-title').addClass('active');
// 		$(activeSubmenu  + '.sub-menu-unit').addClass('active');
// 		$(activeSubmenu + '.sub-menu-unit').removeClass('d-none');
// 	});

	$(document).on('click', '.navbar-nav .menu-item-link .subcategory-list-mobile .subcategory-title', function(e) {
		e.preventDefault();
		e.stopPropagation();

		const category = $(this).attr('data-category');
		$('.submenu-title').html(category);

		const content = $(category === 'Wallpaper Categories' ? ".navbar-cat" : category === 'Trending Now' ? ".navbar-trend" : ".navbar-res").html();
		$('.sub-menu-mobile-wrap .submenu-wrap .submenu-content').html(content);

		$('.sub-menu-mobile-wrap').toggleClass('show');
		navbar.removeClass('show');
	});

	$(document).on('click', '.close-submenu', function (e) {
		e.preventDefault();
		$('.sub-menu-mobile-wrap').toggleClass('show');
		navbar.addClass('show');
	});


// 	loginButton.on('click', function(e) {
// 		e.preventDefault();
// 		$('.password-modal').removeClass('show');
// 		$('.signup-modal').removeClass('show');
// 		$('.login-modal').addClass('show');
// 		$('body').addClass('modal-open');
// 	});

	 loginSubmitButton.on('click', function (e) {
		e.preventDefault();
		var form = $('.login-modal').find('form');
		if (form[0].checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			form.addClass('was-validated');
		} else {
			var username = $('.login-modal').find('#username').val();
			var password = $('.login-modal').find('#login-password').val();
			grecaptcha.enterprise.ready(function() {
			grecaptcha.enterprise
				.execute('6LdyuSkgAAAAANZP-g4cGcnoY9Qq47SDnEOCb4PG', {action: 'login'})
				.then(function(token) {
							login_post(username, password, token, form);
						});
					});
		}
	});

	 var login_post = isEnableLoginAndDownloadFeature ? function(username, password, token, form) {
			 $.ajax({
				 url: "https://login.wallpapers.com/customer/login",
				 type: 'POST',
				 data: {
					 username: username,
					 password: password,
					 token: token
				 },
				 xhrFields: {
					 withCredentials: true
				 }
			 }).then(function (data) {
				 if(data.success){
					 $("body").trigger("add-fav");
					 window.location.reload();
				 }
			 }).catch(function(err){
				 if(err && err.responseJSON && err.responseJSON.message){
					 form.children('.invalid-feedback').html(err.responseJSON.message);
				 }else if(err.message){
					 form.children('.invalid-feedback').html(err.message);
				 }
				 form.children('.invalid-feedback').addClass('d-block');
			 });
			 ;
		 } : 	function (username, password, token, form) {
		 $.post(ajax_url,
			 {
				 action: 'login_user',
				 data: {
					 username: username,
					 password: password,
					 token: token
				 }
			 }).then(function (data) {
			 var response = JSON.parse(data);
			 if (response.success) {
				 setTimeout(function () {
					 window.location.reload();
				 });
			 } else {
				 form.children('.invalid-feedback').addClass('d-block');
			 }
		 });
	 }




	// logoutSubmitButton.on('click', function (e) {
	// 	e.preventDefault();
	// 	$.post(ajax_url, {action: 'logout_user'}).then(function () {
	// 		setTimeout(function () {
	// 			window.location = '/';
	// 		});
	// 	});
	// });

// 	signupButton.on('click', function(e) {
// 		  e.preventDefault();
// 		$('.password-modal').removeClass('show');
// 		$('.login-modal').removeClass('show');
// 		$('.signup-modal').addClass('show');
// 		$('body').addClass('modal-open');
// 	});

	signupSubmitButton.on('click', function (e) {
		var form = $('.signup-modal').find('form');
		if (form[0].checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			form.addClass('was-validated');
		} else {
			var email = $('.signup-modal').find('#email').val();
			var password = $('.signup-modal').find('#password').val();
			var username = email.substring(0, email.indexOf('@'));
			e.preventDefault();
			grecaptcha.enterprise.ready(function() {
				if(isEnableLoginAndDownloadFeature){
					// new flow
					grecaptcha.enterprise
						.execute('6LdyuSkgAAAAANZP-g4cGcnoY9Qq47SDnEOCb4PG', {action: 'signup'})
						.then(function(token) {
							return $.ajax({
								url: "https://login.wallpapers.com/customer/create",
								type: 'post',
								data: {
									username: username,
									password: password,
									email: email,
									token: token
								},
								xhrFields: {
									withCredentials: true
								}})
								.then(function(data) {
									if (data.success) {
										$("body").trigger("add-fav");
										window.location.reload();
									}
								})
								.catch(function(err){
									if(err && err.responseJSON && err.responseJSON.message){
										form.children('.invalid-feedback').html(err.responseJSON.message);
									}else if(err.message){
										form.children('.invalid-feedback').html(err.message);
									}
									form.children('.invalid-feedback').addClass('d-block');
								});
						})
				}else{
					// original flow
					grecaptcha.enterprise
						.execute('6LdyuSkgAAAAANZP-g4cGcnoY9Qq47SDnEOCb4PG', {action: 'signup'})
						.then(function(token) {
							return $.post(ajax_url,
								{
									action: 'create_user',
									data: {
										username: username,
										password: password,
										email: email,
										token: token
									}
								});})
						.then(function(data) {
							var response = JSON.parse(data);
							if (response.success) {
								setTimeout(function () {
									window.location.reload();
								});
							} else if (response.data.errors.existing_user_login) {
								form.children('.invalid-feedback').addClass('d-block');
// 								console.log(data);
							}
						});
				}
			});
		}
	});

	resetButton.on('click', function(e) {
		  e.preventDefault();
		$('.login-modal').removeClass('show');
		$('.signup-modal').removeClass('show');
		$('.password-modal').addClass('show');
		$('body').addClass('modal-open');
	});

	resetSubmitButton.on('click', function (e) {
		var form = $('.password-modal').find('form');
		if (form[0].checkValidity() === false) {
			e.preventDefault();
			e.stopPropagation();
			form.addClass('was-validated');
		} else {
			var email = $('.password-modal').find('#email').val();
			e.preventDefault();
			$.post(ajax_url,
				{
					action: 'reset_password',
					data: {
						email: email
					}
				}).then(function (data) {
				var response = JSON.parse(data);
// 				console.log(response);
			});
		}
	});

	closeButton.on('click', function(e) {
		  e.preventDefault();
		$('.password-modal').removeClass('show');
		$('.signup-modal').removeClass('show');
		$('.login-modal').removeClass('show');
		$('body').removeClass('modal-open');
	});

	showPasswordButton.on('click', function (e) {
		var useTag = showPasswordButton.closest('.wallpapers-modal').find('svg.show-pass-button use'),
			passwordBlock = useTag.closest('.password-block');
		if (useTag.attr('xlink:href') == '#pw_hide') {
			useTag.attr('xlink:href', '#pw_show');
			passwordBlock.find('input').attr('type', 'password');
		} else {
			passwordBlock.find('input').attr('type', 'text');
			useTag.attr('xlink:href', '#pw_hide');
		}

	});

	nextStep.on('click', function(e) {
		  e.preventDefault();
	});
	cancelSubmitButton.on('click', function(e) {
		$('.step1').addClass('show');
		$('.step2').removeClass('show');
		$('.files-for-upload').html('');
		files = [];
	});

	$.each(['dragenter', 'dragover', 'dragleave', 'drop'], function(ind, item) {
		uploadActionArea.on(item, function(e){
			preventDefaults(e);
		});
	});

	$.each(['dragenter', 'dragover'], function(ind, item) {
		uploadActionArea.on(item, function(e){
			highlight(e);
		});
	});

	$.each(['dragleave', 'drop'], function(ind, item) {
	  uploadActionArea.on(item, function(e){
		  unhighlight(e);
	  });
	});

	function highlight(e) {
	  uploadActionArea.addClass('highlight');
	}

	function unhighlight(e) {
	  uploadActionArea.removeClass('highlight');
	}

	uploadActionArea.on('drop', function(e){
		var dt = e.originalEvent.dataTransfer;
		  var files = dt.files;
		renderFiles(files);
	});

	function renderFiles(files){
		if (files.length && files.length <= 10) {
			var i = 0;
			while (files[i]) {
				const reader = new FileReader();
				  reader.addEventListener("load", function () {
					var block = $("<div class='co mb-4' style='height: 390px;'><li class='card' style='max-height: 280px;'><div><div class='remove-img'><svg height='16' width='16' style='margin: 8px 7px;'><use xlink:href='#close-icon-white'></use></svg></div><img class='lozad' src='" + reader.result + "' class='lozad card-img-top post' alt='' height='260'/><div class='tag-manager center'><button class='btn btn-primary add-keyword-button' style='border-radius: 10px;'>Add Keywords</button><div class='ui-menu hide'><input id='keywords' class='keywords-autocomplete' name='keyword'></div></div></div><div class='card-body mt-3' style='position: inherit;'><form class='image-details-form needs-validation' novalidate><input type='hidden' name='file' value='" + reader.result + "'><input type='text'name='title' placeholder='Enter Title' class='submit-input' required/><div class='invalid-feedback'>Title and Keywords are required fields</div><textarea name='description' type='text' placeholder='Enter Description (Optional)' class='submit-input'></textarea></form></div></li></div>");
					$('.files-for-upload').append(block);
				  }, {once: true});
				reader.readAsDataURL(files[i]);
				i++;
			}
			$('.step1').removeClass('show');
			$('.step2').addClass('show');
		}
	}

	submitphotosButton.on('click', function(e) {
		if(!submitphotosButton.hasClass('disabled')) {
			submitphotosButton.addClass('disabled');
			var forms = $('.files-for-upload').find('form');
			var i = 0;
			var filesToSubmit = [];
			var formsAreReady = true;
			$.each(forms, function(ind, item){
				var keyword = $(item).closest('.card').find('.keywords-autocomplete').val();
				if(item.checkValidity() === false || keyword === '') {
					event.preventDefault();
					event.stopPropagation();
					formsAreReady = false;
					$(item).addClass('was-validated');
				} else {
					var formObj = {
						keyword: keyword
					};
					$.each($(item).serializeArray(), function(_, obj){
						formObj[obj.name] = obj.value;
					});
					filesToSubmit.push(formObj);
				}
			});
			if(formsAreReady && filesToSubmit.length) {
				$('.progress').removeClass('hide');
				grecaptcha.enterprise.ready(function() {
					grecaptcha.enterprise
					.execute('6LdyuSkgAAAAANZP-g4cGcnoY9Qq47SDnEOCb4PG', {action: 'signup'})
					.then(function(token) {
						return $.post(ajax_url, {
							action: 'post_create',
							data: {files: filesToSubmit, token},
						})})
					.then(function(data){
						var response = JSON.parse(data);
						if (response.data.length == filesToSubmit.length) {
							submitphotosButton.removeClass('disabled');
							$('.step2').removeClass('show');
							$('.step3').addClass('show');
							$('.progress').addClass('hide');
							$.each($('.files-for-upload').find('img'), function(i, img){
								var li = $('<li class="card mr-e" ><div class="pending-icon"><svg height="20" width="20"><use xlink:href="#pending-icon" class="mr-3"></use></svg>Pending...</div></li>');
								li.append(img);
								$('.files-for-pending').append(li);
							});
							$('.files-for-upload').html('');
							files = [];
						}
					});
				})} else {
// 				console.log('not ok');
			}
		}
	});

	inputFile.on('change', function(e) {
		  e.preventDefault();
		renderFiles(e.target.files);
	});

// 	$(document).on('click', '.close-submenu', function(e){
// 		e.preventDefault();
// 		$('.sub-menu-mobile-wrap').css('display', 'none');
// 	});

	$(document).on('click', '.add-keyword-button', function(e){
		e.preventDefault();
		$(e.target).addClass('hide');
		$(e.target).siblings('.ui-menu').removeClass('hide');
	});

	$(document).on('click', '.remove-img', function(e){
		e.preventDefault();
		var div = $(e.target).closest('div.co');
		if($(div).siblings().length == 0) {
			$('.step2').removeClass('show');
			$('.step1').addClass('show');
		}
		div.remove();

	});
	$(document).on('keydown.autocomplete', '.keywords-autocomplete', function() {
		$(this).autocomplete({
			source: topKeywords
		});
	});

	$(document).on('change', '.keywords-autocomplete', function(e) {
		var newValue = $(e.target).val();
		if(topKeywords.includes(newValue)) {
			var menu = $(e.target).closest('.ui-menu'),
				button = $(menu).siblings('button');
			button.html(newValue);
			button.removeClass('hide');
			menu.addClass('hide');
		}
	});

// 	$(document).on('click', '.download-item', function(event){
// 		const itemKey = event.currentTarget.dataset.itemKey;
// 		const itemUrl = `https://wallpapers.com/images${itemKey}.jpg`;
// 		const itemName = event.currentTarget.dataset.itemName;
// 		const a = document.createElement('a');
// 		a.href = itemUrl;
// 		a.download = itemName + '.jpg';
// // 		a.target = '_blank';
// 		document.body.appendChild(a);
// 		a.click();
// 		document.body.removeChild(a);
// 	})
})

$(document).ready(function(){
	$("header nav ul.navbar-nav li.menu-item.menu-item-has-children")
	.hover(function(){
		$('#backdrop').show();
	}, function(){
		$('#backdrop').hide();
	})

})

window.custom_resize = function(cwidth, cheight, screenSize=false,noResize  = false) {
	var token = readCookie('user_token');
	var cwidthValue;
	var cheightValue;
	if(screenSize){
		cwidthValue = window.screen.width;
		cheightValue =  window.screen.height;
	}
	if(!screenSize && !noResize){
		cwidthValue = document.getElementById(cwidth).value;
		cheightValue = document.getElementById(cheight).value;
	}
	if(noResize){
		location.href = location.href.split('.html')[0] + '/download'
		return;
	}
	if (cwidthValue > 0 && cheightValue > 0) {
		location.href = location.href.split('.html')[0] + '/download/' + Math.round(cwidthValue) + 'x' + Math.round(cheightValue)
		return;
	}
}



function sendContactUs(){
	var forms = $('.contact-us-container').find('form');
	forms.children('.invalid-feedback').removeClass('d-block');
	var formObj = {};
	$.each(forms, function(ind, item){
// 		console.log($(this).find(".form-group > textarea").val());
// 		console.log($(this).find(".form-group > textarea").val().trim() === "");
		if(item.checkValidity() === false) {
					event.preventDefault();
					event.stopPropagation();
					$(item).addClass('was-validated');
				}
		else if($(this).find(".form-group > textarea").val() && $(this).find(".form-group > textarea").val().trim() === ""){
					event.preventDefault();
					event.stopPropagation();
					$(this).find(".form-group > textarea").val("");
    				$(this).find(".form-group > textarea").get(0).reportValidity()
		}else if($(this).find("input[name='email']").val() && !(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test($(this).find("input[name='email']").val()))){
				 	event.preventDefault();
					event.stopPropagation();
					$(this).find("input[name='email']").val("");
    				$(this).find("input[name='email']").get(0).reportValidity();
				 }
					else {
						$.each($(item).serializeArray(), function(_, obj){
						formObj[obj.name] = obj.value;
					})
							grecaptcha.enterprise.ready(function() {
			grecaptcha.enterprise
				.execute('6LdyuSkgAAAAANZP-g4cGcnoY9Qq47SDnEOCb4PG', {action: 'send_contact_us'})
				.then(function(token) {
							send_contact_us(token, formObj, forms);
						});
	});
					}
			});
}

function send_contact_us(token, formObj, forms) {
		$(".contact-btn").prepend(`<div class="spinner-border" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" role="status">
  <span class="visually-hidden"></span>
</div>`);
		$.post(ajax_url,
			{
				action: 'send_contact_us',
				data: {
					name: formObj.name,
					email: formObj.email,
					subject: formObj.subject,
					message: formObj.message,
					token: token
				}
			})
			.then(function (data) {
			if (Number(data) == true) {
				forms.children('.invalid-feedback').text("Submit success");
				forms.children('.invalid-feedback').addClass('success-email-message');
				forms.children('.invalid-feedback').addClass('d-block');
				$(".contact-btn > .spinner-border").remove();
			} else {
				forms.children('.invalid-feedback').text("Submit fail");
				forms.children('.invalid-feedback').removeClass("success-email-message");
				forms.children('.invalid-feedback').addClass('d-block');
				$(".contact-btn > .spinner-border").remove();
			}
		})
		.catch((err)=>{
			console.debug(err);
			$(".contact-btn > .spinner-border").remove();
		});
	}

$(document).ready(function () {
  let $grid = $(".card-columns");
  let option = {
	initLayout: false,
	itemSelector: ".content",
	masonry: {
	  gutter: 10,
	},
	getSortData: {
	  download: "[data-download] parseInt",
	},
	sortAscending: {
	  download: false,
	},
  };

  let filters = {};

  function addName() {
	$grid.isotope(option);
	let elems = $grid.isotope("getFilteredItemElements");
	$(elems).each(function () {
	  if (!$(this).hasClass("isotope-fix")) {
		$(this).find("img").removeAttr("height");
		$(this).addClass("isotope-fix");
		$(this).removeClass("card");
	  }
	});
  }

  function concatValues(obj) {
	var value = "";
	for (var prop in obj) {
	  value += obj[prop];
	}
	return value;
  }

  $(".orientation").on("click", function () {
	filters["orientation"] = $(this).attr("data-filter");
	$grid.isotope(option);
	let filterGroup = concatValues(filters);
	addName({ filter: filterGroup });
	$grid.isotope({ filter: filterGroup });
  });

//   $(".data-size-filter").on("click", function () {
//     filters["size"] = $(this).attr("data-filter");
//     $grid.isotope(option);
//     let filterGroup = concatValues(filters);
//     addName();
//     $grid.isotope({ filter: filterGroup });
//   });

//   $(".data-color-filter").on("click", function () {
//     filters["colour"] = $(this).attr("data-filter");
//     $grid.isotope(option);
//     let filterGroup = concatValues(filters);
//     addName();
//     $grid.isotope({ filter: filterGroup });
//   });

//   $(".download-btn").on("click", function () {
//     let sortValue = $(this).attr("data-sort-value");
//     $grid.isotope(option);
//     addName();
//     $grid.isotope({ sortBy: sortValue });
//   });

//   $(".original-order").on("click", function () {
//     let sortValue = $(this).attr("data-sort-value");
//     $grid.isotope(option);
//     addName();
//     $grid.isotope({ sortBy: sortValue });
//   });

  $(".reset-btn").on("click", function () {
	filters = {};
	$grid.isotope(option);
	addName();
	$grid.isotope({ filter: "*" });
  });
// 	$('.front-login-button, .front-signup-button').click(function(e) {
// 		const parents = document.querySelectorAll('.g_id_signin');
// 		parents.forEach(function(parent) {
// 			google.accounts.id.renderButton(parent, {theme: "outline", width: 300, type: "standard", shape: "rectangular", text: "signin_with", size: "large", logo_alignment: "left"});
// 		})
// 	})
});
function post(path, params, method) {
	method = method || "post";

	const form = document.createElement("form");
	form.setAttribute("method", method);
	form.setAttribute("action", path);

	for (const key in params) {
		if (params.hasOwnProperty(key)) {
			if (typeof params[key] === 'object') {
				for (const subKey in params[key]) {
					const hiddenField = document.createElement("input");
					hiddenField.setAttribute("type", "hidden");
					hiddenField.setAttribute("name", key + '.' + subKey);
					hiddenField.setAttribute("value", params[key][subKey]);

					form.appendChild(hiddenField);
				}
			} else {
				const hiddenField = document.createElement("input");
				hiddenField.setAttribute("type", "hidden");
				hiddenField.setAttribute("name", key);
				hiddenField.setAttribute("value", params[key]);

				form.appendChild(hiddenField);
			}
		}
	}

	document.body.appendChild(form);
	form.submit();
}
$(document).ready(function () {
	const sliderElement = $('.tag-slider');
	const listElement = sliderElement.find('.related-tag');
	const prevElement = sliderElement.find('.nav-prev');
	const nextElement = sliderElement.find('.nav-next');
	const scrollSize = (sliderElement.width()/2);
	let listSize = listElement.get(0).scrollWidth;
	if(!listSize) {
		listSize = 0;
		listElement.find('li').each((idx, ele)=>{
			listSize += $(ele).outerWidth(true);
			if(idx > 0) listSize += 14;
		});
	}

	if(listSize > sliderElement.width()) {
		sliderElement.addClass('has-next');
	} else {
		sliderElement.removeClass('has-next');
	}
	function scrollTo(offset) {
		listElement.scrollLeft(listElement.scrollLeft() + offset);
	}
	function classControl() {
		if(listElement.scrollLeft() <= 0) {
			sliderElement.removeClass('has-prev');
		} else {
			sliderElement.addClass('has-prev');
		}
		if(listElement.scrollLeft() + sliderElement.width() >= listSize - 2) {
			sliderElement.removeClass('has-next');
		} else {
			sliderElement.addClass('has-next');
		}
	}
	classControl();
	listElement.scroll(classControl);
	prevElement.click(()=>scrollTo(-scrollSize));
	nextElement.click(()=>scrollTo(scrollSize));
});

$(document).ready(function () {
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1, c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
		}
		return null;
	}
	function retrieveMemberDownloadId(){
		var title = $("#download-resized-image").data('title');
		var author = $("#download-resized-image").data('author');
		var author_nickname = $("#download-resized-image").data('nickname');
		var license = $("#download-resized-image").data('license');
		return new Promise(function(resolve,reject){
			$.ajax({
				type: 'POST',
				url: 'https://login.wallpapers.com/validate',
				xhrFields: {
					withCredentials: true
				},
				data :{
					title,
					author,
					author_nickname,
					license,
					url: window.location.href
				},
				success : function(response){
					if (response.ok) {
						var targetDownloadId = response.timestamp + "~hmac=" + response.token;
						resolve(targetDownloadId);
					}
				},
				error : function(request,status,error){
// 					console.log(request.status);
					if(request.status === 429){
						openDlLimitModal();
					}
					reject(request);
				}
			})
		})
	}

	function getDownloadImage(isResized,downloadId){
		var resizeImageDownloadBtn = $('#download-resized-image');
		var resizeImageSpinner = $('#resize-image-spinner');
		var resizedImage = $("#resized-image");
		let imgSrc = resizedImage.attr("src");
// 		document.cookie = `download_id=${downloadId};domain=.wallpapers.com;path=/`;
// 		if(downloadId){
// 			imgSrc += "?downloadId=" + downloadId
// 		}
		if(!isResized){
			// /download flow
			fetch(imgSrc,{
				method : "POST",
				redirect: 'follow'
			})
				.then((res)=>{
					if(res.status >= 200 && res.status < 400){
						return res.blob()
					}else if(res.status == 429){
						openDlLimitModal();
						return;
					}
					else{
						throw new Error(res);
					}
				})
				.then(function(res){
					if(!res){
						return;
					}
					var url = URL.createObjectURL(res);
					resizeImageDownloadBtn.attr('href', url);
					resizedImage.removeClass('d-none');
					resizeImageDownloadBtn.removeClass('d-none');
					resizeImageSpinner.addClass('d-none');
				})
				.catch(function(err){
					console.debug(err);
					$("#dlMsgModal").modal("show");
				})
		}else{
			// resize flow
			//console.log("resized Image exist.");
			fetch(imgSrc,{
				method : "POST",
				redirect: 'follow'
			}).then((res)=>{
				if(res.status >= 200 && res.status < 400){
					return res.blob()
				}else if(res.status == 429){
					openDlLimitModal();
					return;
				}
				else{
					throw new Error(res);
				}
			})
				.then(function(res){
					if(!res){
						return;
					}
					var img = new Image();
					img.src = URL.createObjectURL(res);
					img.crossOrigin = 'anonymous';
					img.onload = function() {
						//	console.log("Start image onload.");

						var original = [img.naturalWidth, img.naturalHeight];
						var originalRatio = original[0] / original[1];

						var resizedDimension = [resizedImage.data('width') || img.naturalWidth, resizedImage.data('height') || img.naturalHeight]
						var resizedRatio = resizedDimension[0] / resizedDimension[1]

						var cwidth = resizedDimension[0]
						var cheight = resizedDimension[1]

						var canvas = document.createElement('canvas');
						canvas.width = cwidth
						canvas.height = cheight
						var ctx = canvas.getContext('2d');

						function attachBlob(blob) {
							var url = URL.createObjectURL(blob)
// 						console.log('url', url)
							resizedImage.attr('src', url);
							resizedImage.removeClass('d-none');
							resizeImageDownloadBtn.attr('href', url);
							resizeImageDownloadBtn.removeClass('d-none');
							resizeImageSpinner.addClass('d-none');
						}

						if (resizedRatio === originalRatio) {
							//		console.log('same ratio')
							ctx.drawImage(img, 0, 0, original[0], original[1], 0, 0, resizedDimension[0], resizedDimension[1]);
							canvas.toBlob(attachBlob, "image/jpeg")

						} else if (resizedRatio < originalRatio) {
							//	console.log('resizedRatio < originalRatio')
							SmartCrop.crop(img, {
								width: resizedDimension[0],
								height: resizedDimension[1],
								minScale: 1,
								debug: true
							}, function(result) {
								ctx.drawImage(img, result.topCrop.x, result.topCrop.y, resizedDimension[0] * original[1] / resizedDimension[1], original[1], 0, 0, resizedDimension[0], resizedDimension[1]);
								canvas.toBlob(attachBlob, "image/jpeg")
							})
						} else if (resizedRatio > originalRatio) {
							//	console.log('resizedRatio > originalRatio')
							SmartCrop.crop(img, {
								width: resizedDimension[0],
								height: resizedDimension[1],
								minScale: 1
							}, function(result) {
								//		console.log('result', result)
								ctx.drawImage(img, result.topCrop.x, result.topCrop.y, original[0], resizedDimension[1] * original[0] / resizedDimension[0], 0, 0, resizedDimension[0], resizedDimension[1]);
								canvas.toBlob(attachBlob, "image/jpeg")
							})
						}

					}
				})
				.catch(function(err){
					console.debug(err);
					$("#dlMsgModal").modal("show");
				})
		}
	}
	var token = readCookie('user_token');
	$(".front-logout-submit-button").click(function(e){
		$.ajax({
			url: "https://login.wallpapers.com/customer/logout",
			type: 'GET',
			xhrFields: {
				withCredentials: true
			},
			headers:{
				'x-requested-with': "XMLHttpRequest"
			},
			success: function(res) {
				window.location.reload();
			},
			error : function(err){
				console.error(err);
			}
		});
	})

	var ww = window.screen.width;
	var gdprHeight = 152;
	if (ww>=768 && ww<992) {
		gdprHeight = 61;
	}
	if (ww>=992) {
		gdprHeight = 34;
	}
// 	const changeDLBtnPos = function() {
// 		console.log('changeDLBtnPos');
// 		const unit = $("#stickyunit");
// 		const height = unit.height();
// 		const bottom = unit.css('bottom');
// 		const down = parseInt(bottom.slice(0,-2));
// 		const gdpr = $("#moove_gdpr_cookie_info_bar");
// 		const downloadBlock = $('#dl-screen-size');
// 		if (downloadBlock.hasClass('closedGdpr')) {
// 			if(down > 5) {
// 				downloadBlock.css('bottom', height + 'px');
// 			} else {
// 				downloadBlock.css('bottom', '5px');
// 			}
// 			downloadBlock.removeClass('closedGdpr');
// 		} else {
// 			//ad open
// 			if(down > 5) {
// 				if (gdpr && gdpr.css('display')!=='none') {
// 					downloadBlock.css('bottom', gdprHeight + 5 + 'px');
// 				}
// 				else {
// 					downloadBlock.css('bottom', '5px');
// 				}
// 			} else {
// 				//ad close
// 				if (gdpr && gdpr.css('display')!=='none') {
// 					downloadBlock.css('bottom', height + gdprHeight + 'px');
// 				}
// 				else {
// 					downloadBlock.css('bottom',  height + 'px');
// 				}
// 			}
// 		}
// 	}
	
// 	const media = window.matchMedia('(max-width: 1199px)');
// 	if(media.matches) {
// 		const observer = new IntersectionObserver((entries, observer)=>{
// 			if(entries[0].intersectionRatio === 0) {
// 				changeDLBtnPos();
// 				observer.disconnect();
// 			}
// 		});
// 	observer.observe(document.querySelector("#stickyunit"));
// 	}

// 	var gdprSelector  = document.querySelector('#moove_gdpr_cookie_info_bar');
// 	if(gdprSelector){
// 				var gdprDisplay = gdprSelector.style.display;

// 	var gdprObserver = new MutationObserver( function(mutations){
// 		mutations.forEach( function(mutation) {
// 			if (mutation.attributeName !== 'style') return;
// 			var currentDisplay = mutation.target.style.display;
// 			if (currentDisplay !== gdprDisplay) {
// 			if (gdprDisplay === "none" && currentDisplay !== "none") {
// 				console.log("display none has just been removed!");
// 				const currentBottom = $('#dl-screen-size').css("bottom");
// 				console.log("Test", $("#moove_gdpr_cookie_info_bar").height());
// 				console.log('currentBottom', parseInt(currentBottom.slice(0,-2)));
// 				$('#dl-screen-size').css("bottom",parseInt(currentBottom.slice(0,-2)) + gdprHeight + "px");
// 				gdprObserver.disconnect();
// 			}

// 			previousValue = mutation.target.style.display;
// 			}
// 		});
// 	});

// 	gdprObserver.observe(gdprSelector, { attributes: true });
// 	}

// 	if(media.matches) {
// 		$("#stickyunit .ads-btn").bind('click', changeDLBtnPos);
// 		$("#moove_gdpr_cookie_info_bar button").on('click', function(){
// 			$('#dl-screen-size').addClass('closedGdpr');
// 			changeDLBtnPos();
// 		})
// 	}

	
	// Resize image on wallpapers / background / picture download page
	if (location.pathname.indexOf('/download') === -1) {
// 		console.log('not download path');
		return;
	}
	
	var resizedImage = $("#resized-image");
	
	const isResized = !(/\/download\/?$/.test(location.pathname)) && resizedImage.length
	if(token){
		retrieveMemberDownloadId().then(function(res){
// 				console.log(res);
				getDownloadImage(isResized,res)
			}).catch(function(err){
				if(err.status === 429){
					openDlLimitModal();
				}else{
					$("#dlMsgModal").modal("show");
				}
		})
	}else{
		function setIdentifierToAnchor(){
			// init the promise
			var fpPromise = window.FingerprintJS.load();
			fpPromise
				.then(function(fp){
					// get the result
					return fp.get()
				})
				.then(function(result){
					window.downloadId = result.visitorId
					document.cookie = `download_id=${result.visitorId};domain=.wallpapers.com;path=/`;
					getDownloadImage(isResized,result.visitorId);
				})
			// window.setIdentifierToAnchor = undefined;
		}
		var el = document.createElement("script");
		el.src = "https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3.4.0/dist/fp.min.js";
		el.onload = setIdentifierToAnchor;
		el.async = true;
		el.onerror = function(){
			console.log("Test Error");
			var newEl = document.createElement("script");
			newEl.src = '/wp-content/themes/wallpapers.com/js/fp.min.js';
			newEl.onload = function(){
// 				console.log(el);
				el.remove();
				setIdentifierToAnchor();
			}
			document.body.appendChild(newEl);
		}
		document.body.appendChild(el);
	}


});
















