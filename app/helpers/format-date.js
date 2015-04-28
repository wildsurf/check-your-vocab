import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(inputDate, formatString) {

    var date = new XDate(inputDate);
    var format = (typeof formatString === 'string') ? formatString : 'dd.MM.yyyy';

  return date.toString(format);

});
