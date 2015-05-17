import Ember from 'ember';

export default Ember.Controller.extend({

  doOnLoginSuccess: function() {

    this.transitionToRoute('auth.index');

  },

  doOnLoginError: function(message) {

    this.set('errorMessage', message);

  },

  actions: {

    authenticate: function() {

      var credentials = this.getProperties('identification', 'password');

      this.get('session').authenticate('authenticator:custom', credentials)
        .then($.proxy(this, this.doOnLoginSuccess), $.proxy(this, this.doOnLoginError));

    }
  }

});
