import Ember from 'ember';
import Server from 'check-your-vocab/utils/server';
import Copyable from 'check-your-vocab/mixins/copyable';
import Serializable from 'check-your-vocab/mixins/serializable';
import Helpers from 'check-your-vocab/utils/various-helpers';

var AbstractModel = Ember.Object.extend(Copyable, Serializable, {

    id: function () {

        if (!this.get('_id')) {
            return 'new';
        }

        return this.get('_id');

    }.property('_id')

});

AbstractModel.reopenClass({

    leanFind: function (query, url, noLoader) {

        return Server.invoke('GET', url || this.resourceUrl, query, noLoader);

    },

    find: function (query, url, noLoader) {

        var modelClass = this;

        return this.leanFind(query, url || this.resourceUrl, noLoader).then(function (data) {

            var models = _.map(data, function (model) {

                return modelClass.create(model);

            });

            models.totalItems = data.totalItems;

            return models;

        });

    },

    findOne: function (query, url, noLoader) {

        query.limit = 1;

        var modelClass = this;

        return this.leanFind(query, url || this.resourceUrl, noLoader).then(function (data) {

            return modelClass.create(data[0]);

        });

    },

    findById: function (_id) {

        var modelClass = this;

        return Server.invoke('GET', this.resourceUrl + '/' + _id).then(function (data) {

            return modelClass.create(data);

        });

    },

    insert: function (data, url) {

        if (data.serialize) {
            data = data.serialize();
        }

        return Server.invoke('POST', url || this.resourceUrl, data);

    },

    update: function (data) {

        if (_.isArray(data)) {
            return Server.invoke('PUT', this.resourceUrl, data);
        }

        if (data.serialize) {
            data = data.serialize();
        }

        return Server.invoke('PUT', this.resourceUrl + '/' + data._id, data);

    },

    remove: function (data) {

        if (_.isArray(data)) {

            return Server.invoke('DELETE', this.resourceUrl, data);

        }

        return Server.invoke('DELETE', this.resourceUrl + '/' + data);

    },

    getNewInstance: function (data) {

        var modelClass = this;

        return modelClass.create(_.extend(Helpers.utils.jsonClone(modelClass.Defaults), data));

    }

});

export default AbstractModel;
