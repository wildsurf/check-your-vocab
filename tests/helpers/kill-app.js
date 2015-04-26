import Ember from 'ember';

export default function killApp(app) {
  Ember.run(app, 'destroy');
}
