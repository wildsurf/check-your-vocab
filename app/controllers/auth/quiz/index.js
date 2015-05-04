import Ember from 'ember';

export default Ember.ArrayController.extend({

  sortProperties: ['open', 'date_created'],
  sortAscending: false,

  onDeleteSuccess: function(quiz) {

    this.removeObject(quiz);

  },

  onChangeError: function(response) {

    this.set('error', Ember.I18n.t(response.responseJSON.message));

  },

  actions: {

    deleteQuiz: function(quiz) {

      quiz.remove().then($.proxy(this.onDeleteSuccess, this, quiz), $.proxy(this.onChangeError, this));

    }

  }

});
