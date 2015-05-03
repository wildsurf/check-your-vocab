import startApp from '../helpers/start-app';
import killApp from '../helpers/kill-app';
import mockAdapter from 'check-your-vocab/adapters/mock-adapter';

var App;

module('Integration - Viewing the home page', {
  setup: function() {

    App = startApp();
    mockAdapter.cache = {
      words: [
         {
          language1: 'en',
          language2: 'es',
          score: -2,
          translation1: '3rd worst word',
          translation2: '3rd worst word trans'
        },
        {
          language1: 'en',
          language2: 'es',
          score: -5,
          translation1: '2nd worst word',
          translation2: '2nd worst word trans'
        },
        {
          language1: 'en',
          language2: 'es',
          score: -10,
          translation1: 'worst word',
          translation2: 'worst word trans'
        },
        {
          language1: 'en',
          language2: 'es',
          score: 10,
          translation1: 'best word',
          translation2: 'best word trans'
        },
        {
          language1: 'en',
          language2: 'es',
          score: 5,
          translation1: '2nd best word',
          translation2: '2nd best word trans'
        },
        {
          language1: 'en',
          language2: 'es',
          score: 2,
          translation1: '3rd best word',
          translation2: '3rd best word trans'
        }
      ]
    };

  },
  teardown: function() {

    killApp(App);
    mockAdapter.cache = null;

  }
});

test('you see your top 3 best scoring words', function() {
  expect(5);

  visit('/');

  andThen(function() {
    var firstRow = $('.top-three tbody tr').eq(0).find('td');
    var bestWordTranslation1 = firstRow.eq(1).text();
    var bestWordTranslation2 = firstRow.eq(2).text();
    var score1 = firstRow.eq(3).text();
    var secondRow = $('.top-three tbody tr').eq(1).find('td');
    var score2 = secondRow.eq(3).text();
    var thirdRow = $('.top-three tbody tr').eq(2).find('td');
    var score3 = thirdRow.eq(3).text();
    equal(bestWordTranslation1, 'best word', 'the first row shows the correct word');
    equal(bestWordTranslation2, 'best word trans', '& the correct translation');
    equal(score1, '10', '& the right score');
    equal(score2, '5', 'the second best scoring word is in row 2');
    equal(score3, '2', 'the third best scoring word is in row 3');
  });

});

test('you see your top 3 worst scoring words', function() {
  expect(5);

  visit('/');

  andThen(function() {
    var firstRow = $('.bottom-three tbody tr').eq(0).find('td');
    var bestWordTranslation1 = firstRow.eq(1).text();
    var bestWordTranslation2 = firstRow.eq(2).text();
    var score1 = firstRow.eq(3).text();
    var secondRow = $('.bottom-three tbody tr').eq(1).find('td');
    var score2 = secondRow.eq(3).text();
    var thirdRow = $('.bottom-three tbody tr').eq(2).find('td');
    var score3 = thirdRow.eq(3).text();
    equal(bestWordTranslation1, 'worst word', 'the first row shows the correct word');
    equal(bestWordTranslation2, 'worst word trans', '& the correct translation');
    equal(score1, '-10', '& the right score');
    equal(score2, '-5', 'the second worst scoring word is in row 2');
    equal(score3, '-2', 'the third worst scoring word is in row 3');
  });

});
