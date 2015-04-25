import AbstractModel from '../abstract-model';

var Defaults = {
  language1: '',
  language2: '',
  score: 0,
  translation1: '',
  translation2: ''
};

var WordClass = AbstractModel.extend({

  validations: {
      language1:     {
          presence: {
              message: 'validations.language1.presence'
          }
      },
      language2:     {
          presence: {
              message: 'validations.language2.presence'
          }
      },
      translation1:     {
          presence: {
              message: 'validations.translation1.presence'
          }
      },
      translation2:     {
          presence: {
              message: 'validations.translation2.presence'
          }
      }
  },

  save: function () {

    var word = this;

    if (word.get('isNew')) {

    return WordClass.insert(word)
      .then(function (data) {

        var responseData = data.data;

        return responseData;

      });

    }

    return WordClass.update(word)
      .then(function (data) {

        return data;

      });
  },

  remove: function () {

    return WordClass.remove(this.get('_id'));

  }

});

WordClass.reopenClass({

    Defaults: Defaults,

    resourceUrl: 'words',
    modelName:   'Word'

});

export default WordClass;
