import Ember from 'ember';

export default Ember.Component.extend({

  timeout: null,

  messageObserver: function() {

    var timeout = this.get('timeout');

    if (timeout) {

      Ember.run.cancel(timeout);

    }

    if (this.get('message')) {

      timeout = Ember.run.later(this, function() {

        this.send('deleteMessage');

      }, 2000);
      console.log(typeof timeout);
      this.set('timeout', timeout);

    }

  }.observes('message'),

  actions: {

    deleteMessage: function() {

      var timeout = this.get('timeout');

      if (timeout) {

        Ember.run.cancel(timeout);

      }

      this.set('message', null);

    }

  }

});
