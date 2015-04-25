import Ember from 'ember';
import Language from 'check-your-vocab/utils/language';

export default Ember.Controller.extend({

  init: function() {

    this.set('languages', Language.getListOfLanguages());
    this.set('currentLanguage', Language.getLanguageFullName());

  },

  actions: {

    changeLanguage: function(languageCode) {

      Language.setLanguage(languageCode);
      this.set('currentLanguage', Language.getLanguageFullName());
      this.window.locationReload();

    }

  }

});
