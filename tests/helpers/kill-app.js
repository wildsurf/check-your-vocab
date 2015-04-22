import Ember from 'ember';
import config from '../../config/environment';

export default function killApp(app) {
  config.testApp = null;
  Ember.run(app, 'destroy');
}
