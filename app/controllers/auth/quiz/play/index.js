import Ember from 'ember';
import QuizClass from 'check-your-vocab/models/concrete-models/quiz';

export default Ember.Controller.extend({

  needs: ['auth/quiz/play'],
  words: Ember.computed.alias('controllers.auth/quiz/play.model.wordList'),
  currentWordPair: null,
  visibleWord: null,
  hiddenWord: null,
  translation: null,

  quizObserver: function() {

    this.setNextWord();

  }.observes('words').on('init'),

  isFinished: function() {

    var quiz = this.get('controllers.auth/quiz/play');

    return quiz.get('wordsTotal') === quiz.get('wordsAttempted');

  }.property('controllers.auth/quiz/play.wordsAttempted'),

  getVisibleLanguage: function() {

    var quiz = this.get('controllers.auth/quiz/play');
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
    this.set('isCorrect', false);

  },

  updateWordInQuiz: function() {

    QuizClass.updateWordInQuiz(this.get('controllers.auth/quiz/play.model.id'), this.get('currentWordPair'));

  },

  actions: {

    solve: function() {

      this.set('solved', true);

      if (this.get('hiddenWord') === this.get('translation')) {

        this.markWordAsCorrect();

      } else {

        this.markWordAsIncorrect();

      }

      this.updateWordInQuiz();

    },

    next: function() {

      this.setNextWord();

    },

    finish: function() {

      var self = this;
      var quizData = this.get('controllers.auth/quiz/play.model');
      var quiz = QuizClass.create({
        _id: quizData._id,
        date_completed: new Date()
      });

      quiz.save().then(function() {

        self.transitionToRoute('auth.quiz.index');

      });

    },

    nextDefaultAction: function() {

      if (this.get('solved')) {

        if (this.get('isFinished')) {

          this.send('finish');

        } else {

          this.send('next');

        }

      } else {

        this.send('solve');

      }

    }

  }

});
