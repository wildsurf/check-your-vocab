import Ember from 'ember';
import QuizClass from 'check-your-vocab/models/concrete-models/quiz';

export default Ember.Route.extend({

  model: function() {

    return QuizClass.getNewInstance();

  }

});
