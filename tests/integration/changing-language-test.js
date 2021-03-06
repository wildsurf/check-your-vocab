import startApp from '../helpers/start-app';
import killApp from '../helpers/kill-app';

var App;

module('Integration - Changing Language', {
  setup: function() {

    App = startApp();

  },
  teardown: function() {

    killApp(App);

  }
});

var elements = {
  currentLanguageName: '.language-selector .current-language-name',
  homeLink: '.navigation .menu .home',
  dropdownToggle: '.current-language-name',
  englishOption: 'a[name="gb"]'
};

test('on first arriving at the page, the language defaults to DE', function() {
  expect(2);

  visit('/auth/');

  andThen(function() {
    var languageName = $(elements.currentLanguageName).text();
    var homeLinkText = $(elements.homeLink).text();
    equal(languageName, 'Deutsch', 'the language toggle shows the correct language');
    equal(homeLinkText, 'Startseite', 'the text on the page is the right language');
  });

});

test('when choosing another language, it displays the other language', function() {
  expect(1);

  visit('/auth/');

  click(elements.dropdownToggle);
  click(elements.englishOption);

  andThen(function() {
    var languageName = $(elements.currentLanguageName).text();
    equal(languageName, 'English', 'the language toggle shows the correct language');
  });

});
