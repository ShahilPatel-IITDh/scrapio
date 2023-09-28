angular.module('pages.help', [
		'dating.models.pages',
		'dating.models.questions',
		'ui.bootstrap',
		'Dating',
	])
	.config(function($stateProvider) {
		var mobileSlug = (globalParams.isMobile == '1') ? '-mobile' : ''
		$stateProvider
			.state('dating.pages.help', {
				url: 'help/:questionId',
				views: {
					//target the ui-view named 'sections' in ROOT state
					'sections@': {
						controller: 'HelpCtrl as helpCtrl',
						templateUrl: globalParams.templateUrls.pages.help['help' + mobileSlug],
					},
				},
			})
			.state('dating.pages.deletedAccount', {
				url: 'deleted-account',
				views: {
					'sections@': {
						controller: 'DeletedAccountCtrl as deletedAccountCtrl',
						templateUrl: globalParams.templateUrls.pages.help['deleted-account'],
					},
				},
			})
	})
	.controller('HelpCtrl', function($rootScope, $scope, $location, $sce, $stateParams, PagesModel, QuestionsModel, ProfilesModel, $modal, GLOBALS, authService, $state) {
		var helpCtrl = this
		helpCtrl.isLoggedIn = authService.isAuthenticated
		if (helpCtrl.isLoggedIn) {
			helpCtrl.currentUser = authService.currentUser
		}
		helpCtrl.oneAtATime = true
		helpCtrl.showAnswerBox = showAnswerBox
		helpCtrl.showTicketBox = showTicketBox
		helpCtrl.isMobile = parseInt(GLOBALS.isMobile)
		helpCtrl.showHelpFormLink = helpCtrl.isLoggedIn && !(parseInt(GLOBALS.isExternalUpgradeSite))
		helpCtrl.answerHelpful = 1
		helpCtrl.answerNotHelpful = 2

		PagesModel.setCurrentPage('Help')
		$('html, body').animate({scrollTop: 0}, 50)

		QuestionsModel.getQuestions().then(function(result) {
			var questions = result

			for (var i = 0; i < questions.length; i++) {
				questions[i].htmlAnswer = $sce.trustAsHtml(questions[i].answer)
			}
			helpCtrl.questions = questions
		})

		function showAnswerBox(q) {
			$modal.open({
				templateUrl: globalParams.templateUrls.pages.help.answer,
				controller: 'AnswerBoxCtrl as answerBoxCtrl',
				size: 'answerPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					question: function() {
						QuestionsModel.question = q
						return q
					},
				},
			})
		}

		function showTicketBox(alreadySubmitted) {
			$modal.open({
				templateUrl: globalParams.templateUrls.pages.help.ticket,
				controller: 'TicketBoxCtrl as ticketBoxCtrl',
				size: 'ticketPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
				resolve: {
					alreadySubmitted: function() {
						return alreadySubmitted
					},
				},
			})
		}

		if ($stateParams.questionId) {
			if ($stateParams.questionId == 'ticket') {
				showTicketBox()
			} else {
				QuestionsModel.getAnswer($stateParams.questionId).then(function(result) {
					showAnswerBox(result)
				})
			}
		}

		helpCtrl.sendTicketAndFeedback = function(questionId) {
			QuestionsModel.sendTicket(helpCtrl.newTicket)
				.error(function(result) {
					helpCtrl.errors = result
				})
				.then(function() {
					helpCtrl.ticketSubmitted = true
					helpCtrl.showTicket = false
					QuestionsModel.sendFeedback(questionId, helpCtrl.answerNotHelpful).then(function() {
						showTicketBox(true)
					})
				})
		}

		function showSimpleAnswerBox() {
			var modalInstance = $modal.open({
				templateUrl: globalParams.templateUrls.pages.help.answer,
				size: 'answerPopup',
				keyboard: false,
				backdrop: 'static',
				animation: false,
			})
		}

		helpCtrl.toggleSlider = function(questionId) {
			$('#answer' + questionId).slideToggle(500, function() {
				$(this).toggleClass('collapse').toggleClass('in')
			})
		}
		helpCtrl.sendFeedback = function(questionId, feedback) {
			QuestionsModel.sendFeedback(questionId, feedback).then(function() {
				(feedback === helpCtrl.answerNotHelpful) ? showTicketBox() : showSimpleAnswerBox()
			})
		}

		helpCtrl.isQuestionOpen = function(questionId) {
			if ($stateParams.questionId) {
				return $stateParams.questionId === questionId
			}
			return false
		}

		var isSubmiting = false
		$(document).on('submit', 'form.x-form', function(e) {
			if (isSubmiting) {
				$('.x-form #submit').prop('disabled', true)
				e.preventDefault()
				var data = {
					confirm: $('.x-form').find('#submit').val(),
					deleteReason: $('.x-form').find('textarea[name="deleteReason"]').val(),
				}
				ProfilesModel.deleteAccount(data)
				.error(function(result) {
					$('.x-form #submit').prop('disabled', false)
					helpCtrl.errors = result
				})
				.then(function() {
					authService.clearCredentials()
					$rootScope.$broadcast('sign-out:success')
					$state.go('dating.pages.deletedAccount')
				})
			} else {
				isSubmiting = !isSubmiting
			}

			return  false
		})

		helpCtrl.scrollToAnswer = function(id) {
			var offset = $('.questions-list__right').find('li#answer'+id).offset().top - $('#answer0').offset().top - $('.questions-list__left').find('li#question'+id).offset().top + 250
			$('.questions-list__left li.question').removeClass('selected')
			$('#question'+id).addClass('selected')
			$('.questions-list__right ul').animate({'margin-top': -offset }, 2000)
		}

		$scope.$on('sign-out:success', function() {
			helpCtrl.isLoggedIn = false
			helpCtrl.currentUser = null
		})
	})
	.controller('AnswerBoxCtrl', function($state, $scope, $sce, $modalInstance, QuestionsModel, question, GLOBALS, authService) {
		var answerBoxCtrl = this
		answerBoxCtrl.question = question
		answerBoxCtrl.isLoggedIn = authService.isAuthenticated
		answerBoxCtrl.htmlAnswer = $sce.trustAsHtml(question.answer)
		answerBoxCtrl.showHelpFormLink = answerBoxCtrl.isLoggedIn && !(parseInt(GLOBALS.isExternalUpgradeSite))
		answerBoxCtrl.answerHelpful = 1
		answerBoxCtrl.answerNotHelpful = 2
		answerBoxCtrl.sendFeedback = function(questionId, feedback) {
			QuestionsModel.sendFeedback(questionId, feedback).then(function() {
				if (feedback === answerBoxCtrl.answerNotHelpful) {
					return $state.go('dating.pages.help', {
						questionId: 'ticket',
					})
				}
				answerBoxCtrl.ratingSubmitted = true
			})
		}
		$scope.$on('modal.closing', function() {
			$state.go('dating.pages.help', {
				questionId: '',
			})
		})
		answerBoxCtrl.clearQuestion = function() {
			QuestionsModel.question = null
		}
		$scope.$on('$locationChangeStart', function(event) {
			$modalInstance.close()
		})
	})
	.controller('TicketBoxCtrl', function($state, $scope, $sce, $modalInstance, QuestionsModel, authService, alreadySubmitted) {
		var ticketBoxCtrl = this
		ticketBoxCtrl.isLoggedIn = authService.isAuthenticated
		ticketBoxCtrl.ticketSubmitted = alreadySubmitted
		ticketBoxCtrl.targetChecker = QuestionsModel.question ? true : false

		if (ticketBoxCtrl.targetChecker) {
			ticketBoxCtrl.htmlAnswer= $sce.trustAsHtml(QuestionsModel.question.answer)
			ticketBoxCtrl.htmlText= $sce.trustAsHtml(QuestionsModel.question.text)
			QuestionsModel.question = false
		}

		if (ticketBoxCtrl.isLoggedIn) {
			ticketBoxCtrl.currentUser = authService.currentUser
		}
		ticketBoxCtrl.sendTicket = function() {
			QuestionsModel.sendTicket(ticketBoxCtrl.newTicket)
				.error(function(result) {
					ticketBoxCtrl.errors = result
				})
				.then(function() {
					ticketBoxCtrl.ticketSubmitted = true
				})
		}
		$scope.$on('modal.closing', function() {
			$state.go('dating.pages.help', {
				questionId: '',
			})
		})
	})
	.controller('DeletedAccountCtrl', function($rootScope, $window) {
	})
	.directive('scrollOnClick', function() {
		var target = $('#scrollTarget') ? $('#scrollTarget').offset().top : 0
		return {
			restrict: 'A',
			link: function(scope, $elm) {
				$elm.on('click', function() {
					$('body').animate({scrollTop: target}, 'slow')
				})
			},
		}
	})

