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

  }.property('wordList.@each.status'),

  wordsTotal: function() {

    return this.get('wordList').length;

  }.property('wordList.@each.status'),

  wordsCorrect: function() {

    return _.filter(this.get('wordList'), { status: 'correct' }).length;

  }.property('wordList.@each.status'),

  wordsAttempted: function() {

    return this.get('wordsCorrect') + _.filter(this.get('wordList'), { status: 'incorrect' }).length;

  }.property('wordList.@each.status'),

  assignWords: function(words) {

    var wordList = this.get('wordList');

    _.each(wordList, function(word) {

      var fullWord = _.find(words, {_id: word.wordId});

      _.merge(word, fullWord);

    });

  },

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
