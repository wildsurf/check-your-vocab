import Ember from 'ember';
import config from '../../config/environment';

export default function killApp(app) {
  console.log(config);
  config.testApp = null;
  Ember.run(app, 'destroy');
}
