import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function() {

    var self = this;

    this.$('input').focus();

    $('body').on('keypress', function(e) {

      var code = e.which;

      if (code === 13) {

        e.preventDefault();

        self.get('controller').send('nextDefaultAction');

        Ember.run.scheduleOnce('afterRender', function() {
          self.$('input').focus();
        });

      }

    });

  },

  willDestroyElement: function() {

    $('body').off('keypress');

  }

});
