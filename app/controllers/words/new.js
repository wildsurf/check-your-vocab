import Ember from 'ember';
import Session from 'check-your-vocab/utils/session.js';

export default Ember.ObjectController.extend({

  onSaveSuccess: function() {

    this.transitionToRoute('words.index');

  },

  onSaveError: function(response) {

    this.set('error', Ember.I18n.t(response.responseJSON.message));

  },

  saveLanguagePref: function() {

    if (this.get('model.language1') && this.get('model.language2') && this.get('model.category')) {

      Session.languagePref = {
        language1: this.get('model.language1'),
        language2: this.get('model.language2'),
        category: this.get('model.category')
      };

    }

  },

  modelObserver: function() {

    if (!this.get('model')) {
      return;
    }

    if (Session.languagePref && !this.get('model._id')) {

      this.set('model.language1', Session.languagePref.language1);
      this.set('model.language2', Session.languagePref.language2);
      this.set('model.category', Session.languagePref.category);

    }

  }.observes('model'),

  actions: {

    saveWord: function() {

      this.saveLanguagePref();
      this.get('model').save().then($.proxy(this.onSaveSuccess, this), $.proxy(this.onSaveError, this));

    }

  }

});
