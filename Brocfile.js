/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();


app.import('bower_components/xdate/src/xdate.js');
app.import('bower_components/lodash/dist/lodash.min.js');
app.import('bower_components/ember-i18n/lib/i18n.js');
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');

if(process.env.EMBER_ENV !== 'production') {
  app.import('vendor/sinon/sinon.js', { type: 'test' } );
}

module.exports = app.toTree();


module.exports = app.toTree();
