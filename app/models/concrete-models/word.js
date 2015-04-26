import AbstractModel from 'check-your-vocab/models/abstract-model';

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
  }

});

WordClass.reopenClass({

    Defaults: Defaults,

    resourceUrl: 'words',
    modelName:   'Word'

});

export default WordClass;
