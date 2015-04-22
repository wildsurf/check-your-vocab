import Ember from 'ember';
import Language from 'check-your-vocab/utils/language';

export default Ember.View.extend({

  didInsertElement: function() {

    this.set('currentLanguage', Language.getLanguageFullName());

  },

  actions: {

    changeLanguage: function(languageCode) {

      Language.setLanguage(languageCode);
      this.rerender();

    }

  }
});
