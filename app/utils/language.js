import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';
import windowFunctions from 'check-your-vocab/utils/window-functions';

import de from './languages/de';
import gb from './languages/gb';

var translations = {

    de:         de,
    gb:         gb

};

var languageModule = {

    getLanguage: function() {

      return ENV.APP.currentLocale || ENV.APP.defaultLocale;

    },

    setLanguage: function(languageCode) {

      var languageToSet = languageCode;

      if(!translations[languageCode]) {
          languageToSet = languageModule.getLanguage();
      }

      ENV.APP.currentLocale = languageToSet;
      windowFunctions.localStorage.setItem('language', languageToSet);

      Ember.I18n.translations = translations[languageToSet].translation;

    },

    getLanguageFullName: function() {

      return translations[languageModule.getLanguage()].fullName;

    },

    getListOfLanguages: function() {

      var list = [];

      for (var languageCode in translations) {

        list.push({
          code: languageCode,
          label: translations[languageCode].fullName
        });

      }

      return list;

    }
};


export default languageModule;
