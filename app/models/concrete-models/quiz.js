import AbstractModel from 'check-your-vocab/models/abstract-model';

var Defaults = {
  wordList: [],
  visibleLanguage: 'mixed',
  category: null,
  date_completed: null
};

var QuizClass = AbstractModel.extend({

  open: function() {

    var unansweredWords = _.filter(this.get('wordList'), { status: 'unanswered' });

    return unansweredWords.length > 0;

  }.property('wordList.@each'),

  wordsTotal: function() {

    return this.get('wordList').length;

  }.property('wordList.@each'),

  wordsCorrect: function() {

    return _.filter(this.get('wordList'), { status: 'correct' }).length;

  }.property('wordList.@each'),

  validations: {

  }

});

QuizClass.reopenClass({

    Defaults: Defaults,

    resourceUrl: 'quiz',
    modelName:   'Quiz',

    updateWordInQuiz: function(quizId, data) {

      return this.getAdapter().update(data, this.resourceUrl + '/' + quizId + '/updateWord');

    }

});

export default QuizClass;
