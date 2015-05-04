import Ember from 'ember';

export default Ember.ArrayController.extend({

  sortProperties: ['date_created'],
  sortAscending: false,

  onDeleteSuccess: function(word) {

    this.removeObject(word);

  },

  onChangeError: function(response) {

    this.set('error', Ember.I18n.t(response.responseJSON.message));

  },

  actions: {

    deleteWord: function(word) {

      word.remove().then($.proxy(this.onDeleteSuccess, this, word), $.proxy(this.onChangeError, this));

    },

    editWord: function(word) {

      this.transitionToRoute('auth.words.edit', word);

    }

  }

});
