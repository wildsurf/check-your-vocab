import Ember from 'ember';
import Language from 'check-your-vocab/utils/language';

export default Ember.Controller.extend({

  languages: function() {

    return Language.getListOfLanguages();

  }.property('model')

});
