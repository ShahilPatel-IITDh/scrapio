function skillcastLogin(def) {
	var config = {};
	var tabsObj = {
		"id": "loginTabs",
		"tabs": [],
		"useCurrentTab": false
	};

	if(def.hasOwnProperty("bgImage")) {
		$("body").css("background-image","url(" + def.bgImage + ")").css("background-position","center").css("background-repeat","no-repeat").css("background-size","cover");
	}

	loadData();

	function loadData(){
		SKILLCASTHTMLJS.skillcastAPI("login","getLoginFormJSON",{"updateMyLanguage":def.lang,"resetId":def.resetId},function(resp) {
			config = resp.data;
			renderView();
		});
	}

	function createLoginTab() {
		var loginContainer = SKILLCASTHTMLJS.createElem({"id":"login"});
		var login = renderLogin();
		tabsObj.tabs.push({"id":"login", "name":config.labels.login_login});
		loginContainer.appendChild(login);
		return loginContainer;
	}

	function createRegisterTab() {
		var registerContainer = SKILLCASTHTMLJS.createElem({"id":"register"});
		var register = renderRegistration();
		tabsObj.tabs.push({"id":"register", "name":config.labels.register_register});
		registerContainer.appendChild(register);
		return registerContainer;
	}

	function createResetTab() {
		var resetContainer = SKILLCASTHTMLJS.createElem({"id":"reset"});
		var reset = renderReset();
		tabsObj.tabs.push({"id":"reset", "name":config.labels.resetPassword_reset});
		resetContainer.appendChild(reset);
		return resetContainer;
	}

	function renderView() {
		var containerView = document.getElementById(def.containerId);
		var viewer = SKILLCASTHTMLJS.createElem({});
		var tabs = SKILLCASTHTMLJS.createElem({});
		tabs.appendChild(SKILLCASTHTMLJS.createElem({
			"element":"h1",
			"text":config.labels.login_welcome,
			"padding":"7px",
			"paddingBottom":"14px",
		}));
		viewer.appendChild(createLoginTab());
		viewer.appendChild(createResetTab());
		if(config.hasOwnProperty("registration")) {
			viewer.appendChild(createRegisterTab());
		}
		containerView.innerHTML = "";
		if(tabsObj.tabs.length > 1) {
			tabs.appendChild(SKILLCASTHTMLJS.createTabs(tabsObj));
			containerView.appendChild(tabs);
		}
		containerView.appendChild(viewer);
		if(tabsObj.tabs.length > 1) {
			SKILLCASTHTMLJS.toggleDefaultTab(tabsObj);
		}
	}

	function renderReset() {
		var container = SKILLCASTHTMLJS.createElem({});
		if(config.resetAttempt) {
			tabsObj.defaultIndex = 1;
			if(config.resetIsValid) {
				container.appendChild(renderPasswordReset());
			} else {
				container.appendChild(renderForgottenPassword(config.labels.resetPassword_expired));
			}
		} else {
			container.appendChild(renderForgottenPassword(""));
		}
		return container;
	}

	function renderPasswordReset() {
		var container = SKILLCASTHTMLJS.createElem({});
		var messageCont = SKILLCASTHTMLJS.createElem({"class":"alert-text"});
		var instructions = SKILLCASTHTMLJS.createElem({"class":"instruction-text", "html":config.labels.setpassword_instructions});
		container.appendChild(SKILLCASTHTMLJS.createElem({
			"element":"h2",
			"text":config.labels.resetPassword_resetPW,
			"padding":"7px"
		}));
		container.appendChild(instructions);
		container.appendChild(messageCont);
		var formArray = [];
		var gridCols = [{"width":"30%"},{"width":"70%"}];
		formArray.push([
			{"text":config.labels.setpassword_new},
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"input",
				"type":"password",
				"width":"100%",
				"id":"sp_password"
			})}
		]);
		formArray.push([
			{"text":config.labels.setpassword_confirm},
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"input",
				"type":"password",
				"width":"100%",
				"id":"sp_confirm"
			})}
		]);
		formArray.push([
			{"text":""},
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"input",
				"type":"button",
				"value":config.labels.resetPassword_continue,
				"onclick":function(){
					var args = {
						"sp_confirm":$("#sp_confirm").val(),
						"sp_password":$("#sp_password").val(),
						"resetId":def.resetId
					};
					SKILLCASTHTMLJS.skillcastAPI("login","processPasswordResetJSON",args,function(resp) {
						messageCont.innerHTML = "";
						if(resp.data.resetIsValid) {
							if(resp.status == 'SUCCESS') {
								container.innerHTML = "";
								container.appendChild(SKILLCASTHTMLJS.createElem({"class":"alert-text", "html":resp.message}));
							} else {
								messageCont.innerHTML = resp.message;
							}
						} else {
							config.resetIsValid = resp.data.resetIsValid;
							renderView();
						}
					});
				}
			})}
		]);
		container.appendChild(SKILLCASTHTMLJS.createInlineBlockGrid({
			"data":formArray,
			"cols":gridCols
		}));
		return container;
	}

	function renderLogin() {
		var containerLogin = SKILLCASTHTMLJS.createElem({});
		var messageCont = SKILLCASTHTMLJS.createElem({"class":"alert-text"});
		var instructions = SKILLCASTHTMLJS.createElem({"class":"instruction-text", "html":config.labels.login_message});
		var containerButton = SKILLCASTHTMLJS.createElem({"textAlign":"right"});
		containerLogin.appendChild(SKILLCASTHTMLJS.createElem({
			"element":"h2",
			"text":config.labels.login_login,
			"padding":"7px"
		}));
		containerLogin.appendChild(instructions);
		containerLogin.appendChild(messageCont);
		var loginFormArray = [];
		var gridCols = [{"width":"30%"},{"width":"70%"}];
		loginFormArray.push([{
			"element":SKILLCASTHTMLJS.createElem({
				"element":"label",
				"text":config.labels.login_username,
				"labelFor":"username"
			})},
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"input",
				"type":"text",
				"id":"username"
			})}
		]);
		loginFormArray.push([{
			"element":SKILLCASTHTMLJS.createElem({
				"element":"label",
				"text":config.labels.login_password,
				"labelFor":"password"
			})},
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"input",
				"type":"password",
				"id":"password"
			})}
		]);
		containerLogin.appendChild(SKILLCASTHTMLJS.createInlineBlockGrid({
			"data":loginFormArray,
			"cols":gridCols
		}));
		containerButton.appendChild(SKILLCASTHTMLJS.createElem({
			"element":"input",
			"type":"button",
			"value":"Login",
			"onclick":function(){
				var args = {
					"sp_username":$("#username").val(),
					"sp_password":$("#password").val()
				}
				if(def.hasOwnProperty("linkType") && def.hasOwnProperty("linkId")) {
					args.linkType = def.linkType;
					args.linkId = def.linkId;
				}
				SKILLCASTHTMLJS.skillcastAPI("login","processLoginJSON",args,function(resp) {
					if( resp.status === 'ERROR' ){
						$(".instruction-text").remove();
						messageCont.innerHTML = resp.message;
					} else {
						self.location = resp.data.redirect;
					}
				});
			}
		}));
		containerLogin.appendChild(containerButton);
		return containerLogin;
	}

	function renderForgottenPassword(message){
		var containerForgottenPassw = SKILLCASTHTMLJS.createElem({});
		var messageCont = SKILLCASTHTMLJS.createElem({
			"id":"message",
			"class":"alert-text",
			"text":message
		});
		var containerButton = SKILLCASTHTMLJS.createElem({"textAlign":"right"});
		containerForgottenPassw.appendChild(SKILLCASTHTMLJS.createElem({
			"element":"h2",
			"text":config.labels.resetPassword_resetPW,
			"padding":"7px"
		}));
		containerForgottenPassw.appendChild(messageCont);
		var gridCols = [{"width":"30%"},{"width":"70%"}];
		var forgottenPasswFormArray = [];
		forgottenPasswFormArray.push([
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"label",
				"text":config.labels.loginReminder_enterEmail,
				"labelFor":"forgottenPassword"
			})},
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"input",
				"type":"text",
				"id": "forgottenPassword"
			})}
		]);
		containerForgottenPassw.appendChild(SKILLCASTHTMLJS.createInlineBlockGrid({
			"data":forgottenPasswFormArray,
			"cols":gridCols
		}));
		containerButton.appendChild(SKILLCASTHTMLJS.createElem({
			"element":"input",
			"type":"button",
			"value":config.labels.resetPassword_continue,
			"onclick":function(){
				var email =  $("#forgottenPassword").val();
				SKILLCASTHTMLJS.skillcastAPI("login","requestPasswordResetJSON", {"email": email},function(resp) {
					messageCont.innerHTML = resp.message;
				});
			}
		}));
		containerForgottenPassw.appendChild(containerButton);
		return containerForgottenPassw;
	}

	function renderRegistration(){
		var formArray = [];
		var gridCols = [{"width":"30%"},{"width":"70%"}];
		var i;
		var data = config.registration;
		var messageCont = SKILLCASTHTMLJS.createElem({"id":"message", "class":"alert-text"});
		var inputType;

		var containerRegister = SKILLCASTHTMLJS.createElem({
			children: [
				{"element": "h2", "text": config.labels.register_register, "padding": "7px"},
				{"class": "instruction-text", "text": config.labels.registration_message},
				messageCont
			]
		});

		for (i = 0; i < data.length; i++) {
			inputType = data[i].inputType;
			if (inputType === "text"){
				formArray.push([
					{"element":SKILLCASTHTMLJS.createElem({
						"element":"label",
						"text":data[i].label,
						"labelFor":data[i].id
					})},
					{"element":SKILLCASTHTMLJS.createElem({
						"element":"input",
						"id":data[i].id,
						"type":"text",
						"name":data[i].id,
						"width":"100%"
					})}
				]);
			} else if (inputType === "select"){
				formArray.push([
					{"element":SKILLCASTHTMLJS.createElem({
						"element":"label",
						"text":data[i].label,
						"labelFor":data[i].id
					})},
					{"element":SKILLCASTHTMLJS.createSelect({
						"id":data[i].id,
						"name":data[i].id,
						"options": data[i].optionArray,
						"selectedValue": ""
					})}
				]);
			}
		}

		if(config.useTerms) {
			formArray.push([
				{"text":""},
				{"element":createTerms("registerButton")}
			]);
		}

		formArray.push([
			{"text":""},
			{"element":SKILLCASTHTMLJS.createElem({
				"element":"input",
				"type":"button",
				"disabled":config.useTerms,
				"value":config.labels.register_continue,
				"id":"registerButton",
				"onclick":function(){
					var i;
					var id;
					var args = {};
					for (i = 0; i < data.length; i++) {
						id = data[i].id;
						args[id] = $("#" + id).val();
					}
					SKILLCASTHTMLJS.skillcastAPI("registration","processRegistrationJSON",args,function(resp) {
						if(resp.status == 'SUCCESS') {
							containerRegister.innerHTML = "";
							containerRegister.appendChild(SKILLCASTHTMLJS.createElem({"class":"alert-text", "text":resp.message}));
						} else {
							messageCont.innerHTML = resp.message;
						}
					});
				}
			})}
		]);

		containerRegister.appendChild(SKILLCASTHTMLJS.createInlineBlockGrid({
			"data":formArray,
			"cols":gridCols
		}));

		return containerRegister;
	}

	function createTerms(buttonId) {
		var container = SKILLCASTHTMLJS.createElem({});
		var checkContainer = SKILLCASTHTMLJS.createElem({});
		var terms = SKILLCASTHTMLJS.createElem({
			"html":config.labels.login_terms_text,
			"padding":"7px",
			"border":"1px solid #cccccc",
			"overflow":"auto",
			"maxHeight":"100px"
		});
		var check = SKILLCASTHTMLJS.createElem({
			"element":"input",
			"type":"checkbox",
			"value":"1",
			"id":"sp_terms",
			"margin":"7px",
			"verticalAlign":"middle",
			"onclick":function() {
				var buttonElem = document.getElementById(buttonId);
				buttonElem.disabled = ( this.checked ? false : true );
			}
		});
		var statement = SKILLCASTHTMLJS.createElem({
			"element":"label",
			"text":config.labels.login_terms_statement,
			"verticalAlign":"middle",
			"labelFor":"sp_terms"
		});
		checkContainer.appendChild(check);
		checkContainer.appendChild(statement);
		container.appendChild(terms);
		container.appendChild(checkContainer);
		return container;
	}

}