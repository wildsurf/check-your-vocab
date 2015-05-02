import Ember from 'ember';

export default Ember.Controller.extend({

  needs: ['quiz/play'],
  words: Ember.computed.alias('controllers.quiz/play.model.wordList'),
  currentWordPair: null,
  visibleWord: null,
  hiddenWord: null,
  translation: null,

  getVisibleLanguage: function() {

    var quiz = this.get('controllers.quiz/play');
    var visibleLanguage = quiz.get('visibleLanguage');
    var randomLanguage = (Math.floor(Math.random() * 2) === 0) ? 'language1' : 'language2';

    return visibleLanguage === 'mixed' ? randomLanguage : visibleLanguage;

  },

  setNextWord: function() {

    var word = _.find(this.get('words'), { status: 'unanswered' });
    var visibleLanguage = this.getVisibleLanguage();
    var visibleWord = visibleLanguage === 'language1' ? word.translation1 : word.translation2;
    var hiddenWord = visibleLanguage === 'language1' ? word.translation2 : word.translation1;

    this.set('solved', null);
    this.set('isCorrect', null);
    this.set('translation', null);

    this.set('visibleWord', visibleWord);
    this.set('hiddenWord', hiddenWord);
    this.set('currentWordPair', word);

  },

  markWordAsCorrect: function() {

    this.set('currentWordPair.status', 'correct');
    this.set('isCorrect', true);

  },

  markWordAsIncorrect: function() {

    this.set('currentWordPair.status', 'incorrect');

  },

  init: function() {

    this.setNextWord();

  },

  actions: {

    solve: function() {

      this.set('solved', true);

      if (this.get('hiddenWord') === this.get('translation')) {

        this.markWordAsCorrect();

      } else {

        this.markWordAsIncorrect();

      }

    },

    next: function() {

      this.setNextWord();

    }

  }

});
