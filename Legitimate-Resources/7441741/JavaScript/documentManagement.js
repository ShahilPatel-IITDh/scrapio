/*
 * http://simplemodal.com
 *
 * Copyright (c) 2013 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */

jQuery(function ($) {
	var doRefresh    = false;
	var clientPrefix = $('#dmjs').get()[0].getAttribute('clientPrefix') || 'hhg';
	console.log(clientPrefix);
	var documentForm = {
		message: null,
		init: function () {
			$('#main-content input.docman, #main-content a.docman').click(function (e) {
				e.preventDefault();
				// load the documentForm using ajax
				$.get("/flexweb/"+ clientPrefix + "/" + clientPrefix + "_documentManager.cfm" + documentForm.generateUrlParams($(this)), function(data){
					// create a modal dialog with the data
					$(data).modal({
						closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
						overlayClose: true,
						position: ["15%",],
						overlayId: 'docman-overlay',
						containerId: 'docman-container',
						onOpen: documentForm.open,
						onShow: documentForm.show,
						onClose: documentForm.close
					});
				});
			});
			
			$('.dataTables_wrapper .docman-download, .table-striped .docman-download, #documents .docman-download').click(function (e) {
				e.preventDefault();
				documentForm.downloadDocument($(this));				
			});
			
			$('#main-content a.docman-add').click(function (e) {
				e.preventDefault();
				// load the documentForm using ajax
				$.get("/flexweb/"+ clientPrefix + "/" + clientPrefix + "_documentManager.cfm" + documentForm.generateUrlParams($(this)), function(data){
					// create a modal dialog with the data
					$(data).modal({
						closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
						overlayClose: true,
						position: ["15%",],
						overlayId: 'docman-overlay',
						containerId: 'docman-container',
						onOpen: documentForm.open,
						onShow: documentForm.show,
						onClose: documentForm.close
					});
				});
			});
		},
		open: function (dialog) {
			// dynamically determine height/width
			var windowWidth    = 0.5 * $( window ).width();
			var windowHeight   = $( window ).height();
			var topNavHeight   = $('#main-menu-admin').height();
			var brandBarHeight = $('#brand').height();
			var navBarHeight   = $('.navbar-default').height();
			var modalHeight    = windowHeight - (topNavHeight + brandBarHeight + navBarHeight);

			$('#docman-container').width(windowWidth.toFixed());
			$('.tab-content').height(0.6 * modalHeight);

			
			var title = $('#docman-container .modal-title').html();
			$('#docman-container .modal-title').html('Loading...');
			dialog.overlay.fadeIn(100, function () {
				dialog.container.fadeIn(100, function () {
					dialog.data.fadeIn(100, function () {
						$('#docman-container .docman-content').animate({
							height:  0.9 * modalHeight 
						}, function () {
							$('#docman-container .modal-title').html(title);
							$('#docman-container form').fadeIn(100, function () {
								$('#docman-container #docman-name').focus();

								$('#docman-container .docman-cc').click(function () {
									var cc = $('#docman-container #docman-cc');
									cc.is(':checked') ? cc.attr('checked', '') : cc.attr('checked', 'checked');
								});
							});
						});
					});
				});
			});
		},
		show: function (dialog) {

			$('#simplemodal-data .docman-download').click(function (e) {
				e.preventDefault();

				documentForm.downloadDocument($(this));

			});

			$('#documents a.docman-add').click(function (e) {
				e.preventDefault();
				// load the documentForm using ajax
				$.get("/flexweb/"+ clientPrefix + "/" + clientPrefix + "_documentManager.cfm" + documentForm.generateUrlParams($(this)), function(data){
					// create a modal dialog with the data
					$(data).modal({
						closeHTML: "<a href='#' title='Close' class='modal-close'>x</a>",
						overlayClose: true,
						position: ["15%",],
						overlayId: 'docman-overlay',
						containerId: 'docman-container',
						onOpen: documentForm.open,
						onShow: documentForm.show,
						onClose: documentForm.close
					});
				});
			});

			$('#docman-container .docman-upload').click(function (e) {
				e.preventDefault();
				// validate form
				if (documentForm.validateDocUpload()) {
					doRefresh = true;
					var msg = $('#docman-container .docman-message');
					msg.fadeOut(function () {
						msg.removeClass('docman-error').empty();
					});
					
					$('#docman-container .modal-title').html('Saving...');
					$('#docman-container form').fadeOut(100);
					documentForm.fadeOutTabs();
					$('#docman-container .docman-content').animate({
						height: '150px'
					}, function () {
						var fd       = new FormData($('#docman-container form')[0]);

						var filename = '';
						//IE does not have formData.get() method, this is to make it compatible with IE
						if (typeof fd !== 'undefined' && fd.get) {
							filename = fd.get('document').name;
							fd.append('doc_name', filename);
							fd.append('doc_type', fd.get('document').type);
							fd.append('doc_size', fd.get('document').size);
							fd.append('doc_format', filename.replace(/^.*\./, '').toUpperCase());
						} else {
							filename = $('#docman-container #docman-document').get(0).files[0].name;
							fd.append('doc_name', filename);
							fd.append('doc_type', $('#docman-container #docman-document').get(0).files[0].type);
							fd.append('doc_size', $('#docman-container #docman-document').get(0).files[0].size);
							fd.append('doc_format', filename.replace(/^.*\./, '').toUpperCase());
						}

						$('#docman-container .docman-loading').fadeIn(100, function () {
							$.ajax({
								url: "/flexweb/"+ clientPrefix + "/" + clientPrefix + "_documentManager_action.cfm",
								data: fd,
								type: 'post',
								cache: false,
								dataType: 'html',
								processData: false,
								contentType: false,
								success: function (data) {
									$('#docman-container .docman-loading').fadeOut(100, function () {
										$('#docman-container .modal-title').html('Thank you!');
										data += '. Please close this message and wait for the screen to refresh.';
										msg.html(data).fadeIn(100);
									});
								},
								error: documentForm.error
							});
						});
					});
				}
				else {
					if ($('#docman-container .docman-message:visible').length > 0) {
						var msg = $('#docman-container .docman-message div');
						msg.fadeOut(100, function () {
							msg.empty();
							documentForm.showError();
							msg.fadeIn(100);
						});
					}
					else {
						$('#docman-container .docman-message').animate({
							height: '30px'
						}, documentForm.showError);
					}
				}
			});

			$('#docman-container .docman-save').click(function (e) {
				e.preventDefault();

				// validate form
				if (documentForm.validateDocText()) {
					doRefresh = true;
					var msg = $('#docman-container .docman-message');
					msg.fadeOut(function () {
						msg.removeClass('docman-error').empty();
					});
					
					$('#docman-container .modal-title').html('Saving...');
					$('#docman-container form').fadeOut(100);
					documentForm.fadeOutTabs();
					$('#docman-container .docman-content').animate({
						height: '150px'
					}, function () {
						$('#docman-container .docman-loading').fadeIn(100, function () {
							$.ajax({
								url: "/flexweb/"+ clientPrefix + "/" + clientPrefix + "_documentManager_action.cfm",
								data: $($('#docman-container form')[2]).serialize(),
								type: 'post',
								cache: false,
								dataType: 'html',
								success: function (data) {
									
									$('#docman-container .docman-loading').fadeOut(100, function () {
										$('#docman-container .modal-title').html('Thank you!');
										data += '. Please close this message and wait for the screen to refresh.';
										msg.html(data).fadeIn(100);
									});
								},
								error: documentForm.error
							});
						});
					});
				}
				else {
					if ($('#docman-container .docman-message:visible').length > 0) {
						var msg = $('#docman-container .docman-message div');
						msg.fadeOut(100, function () {
							msg.empty();
							documentForm.showError();
							msg.fadeIn(100);
						});
					}
					else {
						$('#docman-container .docman-message').animate({
							height: '30px'
						}, documentForm.showError);
					}
				}
			});


			$('#docman-container .docman-remove').click(function (e) {
				e.preventDefault();
				// validate form

				var confirmMessage = 'Are you sure you want to remove your current document?';

				if($(this).data("document-doc-msg")  !== undefined){
					confirmMessage = $(this).data("document-doc-msg");
				}
				if (confirm(confirmMessage)) {
					doRefresh = true;
					var msg = $('#docman-container .docman-message');
					msg.fadeOut(function () {
						msg.removeClass('docman-error').empty();
					});

					$('#docman-container .modal-title').html('Saving...');
					$('#docman-container form').fadeOut(100);
					documentForm.fadeOutTabs();
					$('#docman-container .docman-content').animate({
						height: '150px'
					}, function () {
						$('#docman-container .docman-loading').fadeIn(100, function () {
							$.ajax({
								url: "/flexweb/"+ clientPrefix + "/" + clientPrefix + "_documentManager_action.cfm",
								data: $($('#docman-container form')[1]).serialize(),
								type: 'post',
								cache: false,
								dataType: 'html',
								success: function (data) {
									$('#docman-container .docman-loading').fadeOut(100, function () {
										$('#docman-container .modal-title').html('Thank you!');
										data += '. Please close this message and wait for the screen to refresh.';
										msg.html(data).fadeIn(100);
									});
								},
								error: documentForm.error
							});
						});
					});
				}
			});

		},
		close: function (dialog) {
			$('#docman-container .docman-message').fadeOut();
			//$('#docman-container .modal-title').html('Goodbye...');
			$('#docman-container form').fadeOut(100);
			documentForm.fadeOutTabs();
			$('#docman-container .docman-content').animate({
				height: 40
			}, function () {
				dialog.data.fadeOut(100, function () {
					dialog.container.fadeOut(100, function () {
						dialog.overlay.fadeOut(100, function () {
							$.modal.close();
							if(doRefresh){
								window.location.reload();
							}
						});
					});
				});
			});
		},
		error: function (xhr) {
			alert(xhr.statusText);
		},
		validateDocUpload: function () {
			var fd = new FormData($('#docman-container form')[0]);
			documentForm.message = '';

			//IE does not have formData.get() method, this is to make it compatible with IE
			if (typeof fd !== 'undefined' && fd.get) {
				if (fd.get('doc_caption').length == 0){
					documentForm.message += 'Document name cannot be blank';
				} else if ($('#docman-container #docman-document').get(0).files.length == 0) {
					documentForm.message += 'You have not selected a document';
				} else if (fd.get('document').size <= 0){
					documentForm.message += 'Document is of zero byte';
				} else {
					var filename = fd.get('document').name;
					var extension = filename.replace(/^.*\./, '').toLowerCase();
					//This list of file type should match what in documents.c.. component
					if($.inArray(extension, ['doc','docx','xls','xlsx','pdf','ppt']) == -1) {
					   documentForm.message += 'Invalid document type, only upload files with doc,docx,xls,xlsx,pdf extension';
					}
				}
			} else {
				if ($('#docman-container form')[0].doc_caption.value == '') {
					documentForm.message +=  'Document name cannot be blank';
				} else if ($('#docman-container #docman-document').get(0).files.length == 0) {
					documentForm.message += 'You have not selected a document';
				} else if ($('#docman-container #docman-document').get(0).files[0].size <= 0){
					documentForm.message += 'Document is of zero byte';
				} else {
					var filename = $('#docman-container #docman-document').get(0).files[0].name;
					var extension = filename.replace(/^.*\./, '').toLowerCase();
					//This list of file type should match what in documents.c.. component
					if($.inArray(extension, ['doc','docx','xls','xlsx','pdf']) == -1) {
					   documentForm.message += 'Invalid document type, only upload files with doc,docx,xls,xlsx,pdf extension';
					}
				}
			}

			if (documentForm.message.length > 0) {
				return false;
			}
			else {
				return true;
			}
		},
		validateDocText: function () {
			documentForm.message = '';
			/*
			if (!$('#docman-container #docman-textDoc').val()) {
				documentForm.message += 'Text is required.';
			}
			*/
			if (documentForm.message.length > 0) {
				return false;
			}
			else {
				return true;
			}
		},
		generateUrlParams: function (params) {
			var urlParams = '?1=1';
			urlParams += typeof params.data("new-document")      === 'undefined' ? '' : '&new_document='     + params.data("new-document");
			urlParams += typeof params.data("document-link-id")  === 'undefined' ? '' : '&document_link_Id=' + params.data("document-link-id");
			urlParams += typeof params.data("type-id")           === 'undefined' ? '' : '&type_id='          + params.data("type-id");
			urlParams += typeof params.data("type-name")         === 'undefined' ? '' : '&type_name='        + params.data("type-name");
			urlParams += typeof params.data("plan-id")           === 'undefined' ? '' : '&plan_id='          + params.data("plan-id");
			urlParams += typeof params.data("country-id")        === 'undefined' ? '' : '&country_id='       + params.data("country-id");
			urlParams += typeof params.data("employee-id")       === 'undefined' ? '' : '&employee_id='      + params.data("employee-id");
			urlParams += typeof params.data("source-id")         === 'undefined' ? '' : '&source_id='        + params.data("source-id");
			urlParams += typeof params.data("has-content")       === 'undefined' ? '' : '&hasContent='       + params.data("has-content");
			urlParams += typeof params.data("show-texttab")      === 'undefined' ? '' : '&showTextTab='      + params.data("show-texttab");

			return urlParams;
		},
		fadeOutTabs: function (){
			$('.docman-intro').fadeOut(100);
			$('#docman-container .tabs').fadeOut(100);
			$('#docman-container .tab-content').fadeOut(100);
		},
		downloadDocument: function(params) {
			console.log(params);

			var json_text = JSON.stringify({ document_id: params.data('document-id') }, null, 2);
			var downloadId  = '';
			var downloadMsg = '';

			$.ajax({
				url: "/flexweb/"+ clientPrefix + "/" + clientPrefix + "_document_manager_download.cfm",
				data: JSON.parse(json_text),
				type: 'post',
				cache: false,
				dataType: 'html',
				success: function (data) {
					console.log(data);
					if(data.length == 36){
						downloadId = data;
					} else {
						downloadMsg = data;
					};

					if(downloadMsg.length > 0){
						alert(downloadMsg)
					} else {
						$('body').append(
						    $('<iframe>', {
						        src: "/flexweb/"+ clientPrefix + "/" + clientPrefix + "_document_manager_download.cfm?document_id=" + downloadId
						    }).hide()
						);
					}

				},
				error: documentForm.error
			});
		},
		showError: function () {
			$('#docman-container .docman-message')
				.html($('<div class="docman-error"></div>').append(documentForm.message))
				.fadeIn(100);
		}
	};

	documentForm.init();
	window.__dld = documentForm.downloadDocument;
});
