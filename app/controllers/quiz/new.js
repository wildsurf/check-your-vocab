import Ember from 'ember';

export default Ember.ObjectController.extend({

  onSaveSuccess: function() {

    this.transitionToRoute('quiz.index');

  },

  onSaveError: function(response) {

    this.set('error', Ember.I18n.t(response.responseJSON.message));

  },

  actions: {

    saveQuiz: function() {

      this.get('model').save().then($.proxy(this.onSaveSuccess, this), $.proxy(this.onSaveError, this));

    }

  }

});
