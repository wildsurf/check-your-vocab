import Ember from 'ember';
import WordClass from 'check-your-vocab/models/concrete-models/word';

export default Ember.Route.extend({

  model: function(params) {

    return WordClass.findById(params._id);

  },

  setupController: function(controller, model) {

      this.controllerFor('words.new').setProperties({ content: model });

  },

  renderTemplate: function() {

      this.render('words/new');

  }

});
