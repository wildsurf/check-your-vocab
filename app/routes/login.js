import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function(transition) {

    if (transition.queryParams.access_token) {

      localStorage.setItem('token', 'Bearer ' + transition.queryParams.access_token);
      this.get('session').authenticate('authenticator:custom', null, 'facebook');
      this.transitionTo('auth.index');

    }

  }

});
