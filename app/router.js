import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  if (config.environment === 'development') {

    this.route('styleguide');

  }

  this.resource('words', function() {
    this.route('new');
    this.route('edit');
  });

  this.resource('quiz', function() {
    this.route('new');
  });

});

export default Router;
