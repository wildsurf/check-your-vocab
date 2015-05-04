import Ember from 'ember';

Ember.Test.registerAsyncHelper('goHome', function () {

  visit('/auth/');

});
