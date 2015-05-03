import startApp from '../helpers/start-app';
import killApp from '../helpers/kill-app';
import mockAdapter from 'check-your-vocab/adapters/mock-adapter';

var App;

module('Integration - Adding a new vocabulary', {
  setup: function() {

    App = startApp();
    mockAdapter.cache = {
      words: [
      ]
    };

  },
  teardown: function() {

    killApp(App);

  }
});


test('adding new vocabulary adds the word to the index page', function() {

  expect(7);

  visit('/words');

  andThen(function() {
    equal($('.words tbody tr').length, 0, 'when we first get to the vocab index page, it is empty');
  });

  click('.add-word');

  andThen(function() {
    fillIn('[name="language1"]', 'es');
    fillIn('[name="translation1"]', 'mi palabra nueva');
    fillIn('[name="language2"]', 'gb');
    fillIn('[name="translation2"]', 'my new word');
    fillIn('[name="category"]', 'test category');
    click('[name="save-word"]');
  });

  andThen(function() {
    var firstRow = $('.words tbody tr').eq(0).find('td');
    var flags = firstRow.eq(0);
    var firstFlag = flags.find('span.flag-icon').eq(0);
    var secondFlag = flags.find('span.flag-icon').eq(1);
    var wordInOriginal = firstRow.eq(1).text();
    var wordTranslated = firstRow.eq(2).text();
    var category = firstRow.eq(3).text();
    equal($('.words tbody tr').length, 1, 'after adding a word, the word shows up on the index page.');
    equal(mockAdapter.cache.words.length, 1, 'a call has been made to add it on the server');
    equal(firstFlag.hasClass('flag-icon-es') && secondFlag.hasClass('flag-icon-gb'), true, 'the language combo is shown');
    equal(wordInOriginal, 'mi palabra nueva', 'it shows the word in the first language');
    equal(wordTranslated, 'my new word', 'and then in the second language');
    equal(category, 'test category', 'and the category');
  });

});
