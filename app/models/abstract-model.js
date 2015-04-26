import Ember from 'ember';
import ENV from 'check-your-vocab/config/environment';
import Copyable from 'check-your-vocab/mixins/copyable';
import Serializable from 'check-your-vocab/mixins/serializable';
import Helpers from 'check-your-vocab/utils/various-helpers';
import AjaxAdapter from 'check-your-vocab/adapters/ajax-adapter';
import MockAdapter from 'check-your-vocab/adapters/mock-adapter';

var AbstractModel = Ember.Object.extend(Copyable, Serializable, {

    id: function () {

        if (!this.get('_id')) {
            return 'new';
        }

        return this.get('_id');

    }.property('_id')

});

AbstractModel.reopenClass({

  getAdapter: function() {

    var adapter = AjaxAdapter;

    if (ENV.APP.useMocks) {

      adapter = MockAdapter;

    }

    return adapter;

  },

  leanFind: function (query, url, noLoader) {

    return this.getAdapter().leanFind(query, url || this.resourceUrl, noLoader);

  },

  find: function (query, url, noLoader) {

    return this.getAdapter().find(query, url || this.resourceUrl, this, noLoader);

  },

  findOne: function (query, url, noLoader) {

    return this.getAdapter().fidOne(query, url || this.resourceUrl, this, noLoader);

  },

  findById: function (_id) {

    return this.getAdapter().findById(_id, this);

  },

  insert: function (data, url) {

    return this.getAdapter().insert(data, url);

  },

  update: function (data) {

    return this.getAdapter().update(data, this.resourceUrl);

  },

  remove: function (data) {

    return this.getAdapter().remove(data, this.resourceUrl);

  },

  getNewInstance: function (data) {

      var modelClass = this;

      return modelClass.create(_.extend(Helpers.utils.jsonClone(modelClass.Defaults), data));

  }

});

export default AbstractModel;
