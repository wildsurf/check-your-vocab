import Ember from 'ember';
import WordClass from 'check-your-vocab/models/concrete-models/word';

export default Ember.Route.extend({

  model: function() {

    return WordClass.getNewInstance();

  }

});
