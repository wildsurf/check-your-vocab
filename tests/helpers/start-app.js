import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';
import '../helpers/test-steps';

export default function startApp(attrs) {

    var App;

    var attributes = Ember.merge({}, config.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    Ember.run(function () {

        App = Application.create(attributes);
        App.setupForTesting();
        App.injectTestHelpers();

        config.testApp = App;
        config.testApp.fakeRequests = attrs ? attrs.fakeRequests : [];
        config.testApp.requestsProcessed = 0;

    });

    return App;
}
