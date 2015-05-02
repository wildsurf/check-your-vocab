import Ember from 'ember';

export default Ember.Component.extend({

  progress: 0,
  total: 1,

  percent: function() {

    var percent = Math.floor(this.get('progress') / this.get('total') * 100);

    if (this._state === 'inDOM') {

      this.$('.progress-bar').css('width', percent+'%');

    }

    return percent;

  }.property('progress')

});
