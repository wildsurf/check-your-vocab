import Base from 'simple-auth/authenticators/base';
import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';

export default Base.extend({

  tokenEndpoint: 'http://' + ENV.APP.server.url + '/login',
  cookieName: 'connect.sid',

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
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.ajax({
        url:         _this.tokenEndpoint,
        type:        'POST',
        data:        JSON.stringify({ email: credentials.identification, password: credentials.password }),
        contentType: 'application/json'
      }).then(function(data) {
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

    var cookieName = this.get('cookieName');

    return new Ember.RSVP.Promise(function(resolve) {

      Cookies.expire(cookieName);
      resolve();

    });


  }
});
