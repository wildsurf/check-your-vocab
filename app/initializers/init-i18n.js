import Language from 'check-your-vocab/utils/language';
import ENV from 'check-your-vocab/config/environment';
import windowFunctions from 'check-your-vocab/utils/window-functions';

export function initialize(/*container, application*/) {

    var languageCode = windowFunctions.localStorage.getItem('language');

    if(!languageCode) {
        languageCode = ENV.APP.defaultLocale;
    }

    Language.setLanguage(languageCode);

}

export default {
  name: 'init-i18n',
  initialize: initialize
};
