import Base from 'simple-auth/authorizers/base';
import Ember from 'ember';

export default Base.extend({

  authorize: function(jqXHR) {

    var cookieName = 'connect.sid';
    var cookie = Cookies.get(cookieName);

    if (this.get('session.isAuthenticated') && !Ember.isEmpty(cookie)) {
      jqXHR.setRequestHeader('Cookie', 'connect.sid=' + cookie);
    }
  }

});
