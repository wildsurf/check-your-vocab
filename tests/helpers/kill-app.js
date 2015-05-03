import Ember from 'ember';
import mockAdapter from 'check-your-vocab/adapters/mock-adapter';

export default function killApp(app) {
  Ember.run(app, 'destroy');
  mockAdapter.cache = {};
}
