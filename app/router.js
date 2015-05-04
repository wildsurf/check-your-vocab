import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  if (config.environment === 'development') {

    this.route('styleguide');

  }

  this.route('login');

  this.resource('auth', function() {

    this.resource('auth.words', { path: '/words' }, function() {
      this.route('new');
      this.route('edit', { path: '/edit/:_id' });
    });

    this.resource('auth.quiz', { path: '/quiz' }, function() {
      this.route('new');
      this.resource('auth.quiz.play', { path: '/play/:id' }, function() {
        this.route('word');
      });
    });

  });


});

export default Router;
