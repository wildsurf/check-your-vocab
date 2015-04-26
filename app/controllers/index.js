import Ember from 'ember';

export default Ember.Controller.extend({

  bestWords: function() {

    return _.sortBy(this.get('model'), 'score').reverse().splice(0,3);

  }.property('model'),

  worstWords: function() {

    return _.sortBy(this.get('model'), 'score').splice(0,3);

  }.property('model')

});
