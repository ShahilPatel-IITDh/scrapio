angular.module('dating.models.questions', [
])
.service('QuestionsModel', function($http, $q) {
  var model = this,
      URLS = {
        FETCH_QUESTIONS: '/help/index',
        FETCH_ANSWERS: '/help/index?question=:id',
        POST_SEND_FEEDBACK: '/help/log',
        POST_TICKET: '/help/save',
      },
      questions

  function extract(result) {
    return result.data
  }

  function cacheQuestions(result) {
    questions = extract(result)
    return questions
  }

  function cacheAnswer(result) {
    return extract(result)
  }

  model.getQuestions = function() {
    return (questions) ? $q.when(questions) : $http.get(URLS.FETCH_QUESTIONS).then(cacheQuestions)
  }

  model.getAnswer = function(id) {
    var url = URLS.FETCH_ANSWERS.replace(':id', id)
    return $http.get(url).then(cacheAnswer)
  }

  model.sendFeedback = function(id, feedback) {
    return $http.post(URLS.POST_SEND_FEEDBACK, {questionId: id, feedbackType: feedback})
  }

  model.sendTicket = function(data) {
    return $http.post(URLS.POST_TICKET, data)
  }

})

