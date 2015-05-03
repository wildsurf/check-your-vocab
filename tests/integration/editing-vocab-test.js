import startApp from '../helpers/start-app';
import killApp from '../helpers/kill-app';
import mockAdapter from 'check-your-vocab/adapters/mock-adapter';

var App;

module('Integration - Editing vocabulary', {
  setup: function() {

    App = startApp();
    mockAdapter.cache = {
      words: [
         {
          _id: '123',
          language1: 'en',
          language2: 'es',
          category: 'test1',
          translation1: 'word 1',
          translation2: 'translation 1',
          date_created: '2015-02-27T19:31:08.076Z'
        }
      ]
    };

  },
  teardown: function() {

    killApp(App);

  }
});


test('editing vocabulary updates the word on the index page', function() {

  expect(10);

  visit('/words');

  andThen(function() {
    var firstRow = $('.words tbody tr').eq(0).find('td');
    var flags = firstRow.eq(0);
    var firstFlag = flags.find('span.flag-icon').eq(0);
    var secondFlag = flags.find('span.flag-icon').eq(1);
    var wordInOriginal = firstRow.eq(1).text();
    var wordTranslated = firstRow.eq(2).text();
    var category = firstRow.eq(3).text();
    equal(firstFlag.hasClass('flag-icon-en') && secondFlag.hasClass('flag-icon-es'), true, 'the language combo is en-es');
    equal(wordInOriginal, 'word 1', 'it shows the word as word 1');
    equal(wordTranslated, 'translation 1', 'and the translation as translation 1');
    equal(category, 'test1', 'and the category as test1');
  });

  click('.words tbody tr:first-child .glyphicon-edit');

  andThen(function() {
    fillIn('[name="language1"]', 'de');
    fillIn('[name="translation1"]', 'hallo leute');
    fillIn('[name="language2"]', 'gb');
    fillIn('[name="translation2"]', 'hello folks');
    fillIn('[name="category"]', 'another test');
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
    equal($('.words tbody tr').length, 1, 'there is still only one word in the list');
    equal(mockAdapter.cache.words[0].translation1, 'hallo leute', 'there was a call to update the word on the server');
    equal(firstFlag.hasClass('flag-icon-de') && secondFlag.hasClass('flag-icon-gb'), true, 'the language combo is now de-uk');
    equal(wordInOriginal, 'hallo leute', 'it shows the word as hallo leute');
    equal(wordTranslated, 'hello folks', 'and the translation as hello folks');
    equal(category, 'another test', 'and the category as another test');
  });

});
