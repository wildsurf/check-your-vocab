import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';

export default Ember.Controller.extend({

  doOnLoginSuccess: function() {

    this.transitionToRoute('auth.index');

  },

  doOnLoginError: function(message) {

    this.set('errorMessage', message);

  },

  facebookLoginUrl: function() {

    return 'http://' + ENV.APP.server.url + '/auth/facebook?callbackUrl=http://' + ENV.APP.client.url + '/login';

  }.property(''),

  actions: {

    authenticate: function(type) {

      var credentials = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:custom', credentials, type)
        .then($.proxy(this, this.doOnLoginSuccess), $.proxy(this, this.doOnLoginError));

    }
  }

});
