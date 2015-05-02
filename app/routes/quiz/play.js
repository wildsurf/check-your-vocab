import Ember from 'ember';
import QuizClass from 'check-your-vocab/models/concrete-models/quiz';
import WordClass from 'check-your-vocab/models/concrete-models/word';

export default Ember.Route.extend({

  model: function(params) {

    var models = {};

    return QuizClass.findById(params.id).then(function(data) {

      models.quiz = data;

      return WordClass.find({

        _id: {$in: _.pluck(data.wordList, 'wordId')}

      }).then(function(data) {

        models.words = data;

        return models;

      });

    });

  },

  setupController: function(controller, models) {

    models.quiz.assignWords(models.words);
    controller.set('model', models.quiz);

  }

});
