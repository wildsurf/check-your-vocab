import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';
import windowFunctions from 'check-your-vocab/utils/window-functions';

import de from './languages/de';
import en from './languages/en';

var translations = {

    de:         de,
    en:         en

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

    }
};


export default languageModule;