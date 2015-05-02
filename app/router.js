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
    this.route('edit', { path: '/edit/:_id' });
  });

  this.resource('quiz', function() {
    this.route('new');
    this.route('play', { path: '/play/:id' });
  });

});

export default Router;
