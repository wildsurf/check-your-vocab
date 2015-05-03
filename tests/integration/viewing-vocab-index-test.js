import startApp from '../helpers/start-app';
import killApp from '../helpers/kill-app';
import mockAdapter from 'check-your-vocab/adapters/mock-adapter';

var App;

module('Integration - Viewing the vocab index page', {
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
        },
        {
          _id: '456',
          language1: 'en',
          language2: 'es',
          category: 'test2',
          translation1: 'word 2',
          translation2: 'translation 2',
          date_created: '2015-04-27T19:31:08.076Z'
        }
      ]
    };

  },
  teardown: function() {

    killApp(App);
    mockAdapter.cache = null;

  }
});


test('you see a list of vocabulary, newest words first', function() {

  expect(4);

  visit('/words');

  andThen(function() {
    var firstRow = $('.words tbody tr').eq(0).find('td');
    var flags = firstRow.eq(0);
    var firstFlag = flags.find('span.flag-icon').eq(0);
    var secondFlag = flags.find('span.flag-icon').eq(1);
    var wordInOriginal = firstRow.eq(1).text();
    var wordTranslated = firstRow.eq(2).text();
    var category = firstRow.eq(3).text();
    equal(firstFlag.hasClass('flag-icon-en') && secondFlag.hasClass('flag-icon-es'), true, 'the language combo is shown');
    equal(wordInOriginal, 'word 2', 'it shows the word in the first language');
    equal(wordTranslated, 'translation 2', 'and then in the second language');
    equal(category, 'test2', 'and the category');
  });

});

test('clicking on the new button brings you to the new vocab page', function() {

  expect(1);

  visit('/words');
  click('.add-word');

  andThen(function() {
    equal(currentURL(), '/words/new', 'brings you to /words/new');
  });

});

test('clicking on the edit button brings you to the edit page', function() {

  expect(1);

  visit('/words');
  click('.words tbody tr:first-child .glyphicon-edit');

  andThen(function() {
    equal(currentURL(), '/words/edit/456', 'brings you to /words/edit/456');
  });

});

test('clicking on the delete button removes the word from the list', function() {

  expect(3);

  visit('/words');
  click('.words tbody tr:first-child .glyphicon-trash');

  andThen(function() {
    equal($('.words tbody tr').length, 1, 'only one word remains in the list');
    equal($('.words tbody tr:first-child td').eq(1).text(), 'word 1', 'and that is the other word');
    equal(_.find(mockAdapter.cache, {_id: '456'}), null, 'a request was sent to delete the word from the server too');
  });

});
