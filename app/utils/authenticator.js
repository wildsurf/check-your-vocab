import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';

export default Base.extend({

  getLoginRequest: function(credentials) {

    var type = credentials.type;

    if (!type) {

      return {
        url: 'http://' + ENV.APP.server.url + '/login',
        method: 'POST',
        data: JSON.stringify({ email: credentials.identification, password: credentials.password }),
        contentType: 'application/json'
      };

    } else if (type === 'facebook') {

      return {
        url: 'http://' + ENV.APP.server.url + '/auth/facebook',
        method: 'GET'
      };

    }

  },

  restore: function(data) {

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data)) {
        resolve(data);
      } else {
        reject();
      }
    });

  },

  authenticate: function(credentials) {

    var loginRequest = this.getLoginRequest(credentials);
    _.merge(loginRequest, {contentType: 'application/json'});

    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax(loginRequest).then(function(data) {
        localStorage.setItem('token', 'Bearer ' + data.session.token);
        Ember.run(function() {
          resolve(data);
        });
      }, function(xhr) {
        var response = JSON.parse(xhr.responseText);
        Ember.run(function() {
          reject(response.error);
        });
      });
    });
  },

  invalidate: function() {

    localStorage.setItem('token', null);

    return new Ember.RSVP.Promise(function(resolve) {

      resolve();

    });


  }
});
