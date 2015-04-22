/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();


app.import('bower_components/xdate/src/xdate.js');
app.import('bower_components/lodash/dist/lodash.min.js');
app.import('bower_components/ember-i18n/lib/i18n.js');
app.import('vendor/foundation/foundation.js');
app.import('vendor/foundation/start.js');

if(process.env.EMBER_ENV !== 'production') {
  app.import('vendor/sinon/sinon.js', { type: 'test' } );
}

module.exports = app.toTree();


module.exports = app.toTree();
