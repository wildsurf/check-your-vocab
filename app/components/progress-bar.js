import Ember from 'ember';

export default Ember.Component.extend({

  progress: 0,
  total: 1,

  percent: function() {

    var percent = this.get('progress') / this.get('total');

    if (this._state === 'inDOM') {

      this.$('progress-bar').width(percent);

    }

    return percent;

  }.property('progress', 'total')

});
